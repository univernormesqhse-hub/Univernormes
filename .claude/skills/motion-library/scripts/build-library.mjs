#!/usr/bin/env node
// Fiches library/<section>/<slug>/index.md → aperçus (preview.mp4), library/index.md, index.json, gallery.html.
// usage : node build-library.mjs [--check] [--no-render] [--force]
//   --check      ne génère rien : signale les composants modifiés depuis le dernier build (exit 1 si dérive)
//   --no-render  régénère les index sans rendre les aperçus
//   --force      re-rend tous les aperçus
// Navigateur : REMOTION_BROWSER=<chemin chrome/headless_shell> si Remotion ne trouve pas le sien.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';

const argv = process.argv.slice(2);
const CHECK = argv.includes('--check'), NORENDER = argv.includes('--no-render'), FORCE = argv.includes('--force');
const LIB = path.resolve('library');
const SECTIONS = ['templates', 'assets', 'subtitles', 'sounds'];
const LABEL = {templates: 'Templates', assets: 'Assets', subtitles: 'Sous-titres', sounds: 'Sons'};
if (!fs.existsSync(LIB)) { console.error('library/ introuvable : lancer le setup (steps/01-setup.md) depuis la racine du projet Remotion.'); process.exit(1); }

const parse = (src) => {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return null;
  const meta = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([\w-]+):\s*(.*?)(\s+#.*)?$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (/^\[.*\]$/.test(v)) v = v.slice(1, -1).split(',').map((x) => x.trim()).filter(Boolean);
    meta[kv[1]] = v;
  }
  return {meta, body: m[2].trim()};
};
const sha = (f) => (fs.existsSync(f) ? crypto.createHash('sha1').update(fs.readFileSync(f)).digest('hex').slice(0, 12) : null);

const fiches = [], errors = [];
for (const sec of SECTIONS) {
  const d = path.join(LIB, sec);
  if (!fs.existsSync(d)) continue;
  for (const slug of fs.readdirSync(d).sort()) {
    const f = path.join(d, slug, 'index.md');
    if (!fs.existsSync(f)) continue;
    const p = parse(fs.readFileSync(f, 'utf8'));
    if (!p) { errors.push(`${sec}/${slug} : frontmatter absent`); continue; }
    const m = p.meta;
    for (const k of ['name', 'description', 'quand']) if (!m[k]) errors.push(`${sec}/${slug} : champ « ${k} » manquant`);
    if (m.component && !fs.existsSync(path.resolve(m.component))) errors.push(`${sec}/${slug} : composant introuvable (${m.component})`);
    fiches.push({section: sec, slug, name: m.name || slug, description: m.description || '', quand: m.quand || '', component: m.component || null, demo: m.demo && m.demo !== 'none' ? m.demo : null, audio: m.audio || null, tags: Array.isArray(m.tags) ? m.tags : m.tags ? [m.tags] : [], hash: m.component ? sha(path.resolve(m.component)) : null, dir: path.join(d, slug)});
  }
}
const prevIdx = fs.existsSync(path.join(LIB, 'index.json')) ? JSON.parse(fs.readFileSync(path.join(LIB, 'index.json'), 'utf8')) : {items: []};
const prev = Object.fromEntries(prevIdx.items.map((x) => [`${x.section}/${x.slug}`, x]));

if (CHECK) {
  const drift = fiches.filter((x) => { const o = prev[`${x.section}/${x.slug}`]; return !o || o.hash !== x.hash || (x.demo && !fs.existsSync(path.join(x.dir, 'preview.mp4'))); });
  errors.forEach((e) => console.log('✗', e));
  drift.forEach((x) => console.log('↻', `${x.section}/${x.slug}`, prev[`${x.section}/${x.slug}`] ? `(composant modifié : ${x.component})` : '(jamais buildé)'));
  console.log(drift.length || errors.length ? `${drift.length} fiche(s) à rebuild, ${errors.length} erreur(s)` : `librairie à jour (${fiches.length} fiches)`);
  process.exit(drift.length || errors.length ? 1 : 0);
}
if (errors.length) { errors.forEach((e) => console.error('✗', e)); process.exit(1); }

// Aperçus
const todo = NORENDER ? [] : fiches.filter((x) => x.demo && (FORCE || !fs.existsSync(path.join(x.dir, 'preview.mp4')) || prev[`${x.section}/${x.slug}`]?.hash !== x.hash));
if (todo.length) {
  // résolu depuis le projet (le script vit hors de node_modules)
  const req = createRequire(path.resolve('package.json'));
  const {bundle} = await import(pathToFileURL(req.resolve('@remotion/bundler')).href);
  const {renderMedia, selectComposition, openBrowser} = await import(pathToFileURL(req.resolve('@remotion/renderer')).href);
  console.log(`bundle… (${todo.length} aperçu(s) à rendre)`);
  const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts'), publicDir: path.resolve('public')});
  const browser = await openBrowser('chrome', process.env.REMOTION_BROWSER ? {browserExecutable: process.env.REMOTION_BROWSER} : {});
  try {
    for (const x of todo) {
      const composition = await selectComposition({serveUrl, id: x.demo, puppeteerInstance: browser});
      const out = path.join(x.dir, 'preview.mp4');
      await renderMedia({serveUrl, composition, codec: 'h264', outputLocation: out, scale: 0.5, crf: 28, puppeteerInstance: browser, logLevel: 'error'});
      console.log('✓ aperçu', `${x.section}/${x.slug}`, `(${(fs.statSync(out).size / 1024).toFixed(0)} Ko)`);
    }
  } finally {
    await browser.close({silent: true});
    fs.rmSync(serveUrl, {recursive: true, force: true});
  }
}

// Index
const rel = (x) => path.relative(LIB, x.dir);
const items = fiches.map(({dir, ...x}) => ({...x, path: `${rel({dir})}/index.md`, preview: fs.existsSync(path.join(dir, 'preview.mp4')) ? `${rel({dir})}/preview.mp4` : null}));
fs.writeFileSync(path.join(LIB, 'index.json'), JSON.stringify({generated: 'build-library.mjs — ne pas éditer', count: items.length, items}, null, 1) + '\n');

const esc = (s) => String(s).replace(/\|/g, '\\|');
let md = `# Librairie de motions\n\n> Généré par \`build-library.mjs\` — ne pas éditer à la main. Source de vérité : \`library/<section>/<slug>/index.md\`.\n\n${items.length} motions validés. Galerie visuelle : \`library/gallery.html\`.\n`;
for (const sec of SECTIONS) {
  const L = items.filter((x) => x.section === sec);
  md += `\n## ${LABEL[sec]} (${L.length})\n\n`;
  if (!L.length) { md += '_Aucun pour l’instant._\n'; continue; }
  md += '| Motion | Ce que ça fait | Quand l’utiliser | Code | Aperçu |\n|---|---|---|---|---|\n';
  for (const x of L) md += `| [${esc(x.name)}](${x.path}) | ${esc(x.description)} | ${esc(x.quand)} | ${x.component ? `\`${x.component}\`` : '—'} | ${x.preview ? `[mp4](${x.preview})` : x.audio ? `\`${x.audio}\`` : '—'} |\n`;
}
fs.writeFileSync(path.join(LIB, 'index.md'), md);

const h = (s) => String(s).replace(/[&<>"]/g, (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
const card = (x) => `<article><div class="m">${x.preview ? `<video src="${x.preview}" muted loop autoplay playsinline controls></video>` : x.audio ? `<audio src="../${h(x.audio)}" controls></audio>` : '<div class="no">pas d’aperçu</div>'}</div><h3>${h(x.name)}</h3><p>${h(x.description)}</p><p class="q"><b>Quand :</b> ${h(x.quand)}</p><p class="t">${x.tags.map((t) => `<span>${h(t)}</span>`).join('')}</p><code>${h(x.path)}</code></article>`;
const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Librairie de motions</title><style>
:root{--bg:#F7F4EC;--card:#fff;--ink:#14213D;--dim:#5B6577;--acc:#E0A100}
@media (prefers-color-scheme:dark){:root{--bg:#10141D;--card:#1A2030;--ink:#EEF1F5;--dim:#9AA4B5}}
body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.45 system-ui,sans-serif;padding:24px 16px}h1{margin:0 0 4px}h2{margin:32px 0 12px;border-bottom:3px solid var(--acc);display:inline-block}
.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:16px}article{background:var(--card);border-radius:14px;padding:12px;box-shadow:0 4px 14px rgba(0,0,0,.08)}
.m{aspect-ratio:9/16;background:#000;border-radius:10px;overflow:hidden;display:flex;align-items:center;justify-content:center}video{width:100%;height:100%;object-fit:cover}audio{width:95%}.no{color:#888}
h3{margin:10px 0 4px;font-size:16px}p{margin:4px 0;color:var(--dim)}.q{color:var(--ink)}.t span{display:inline-block;background:var(--acc);color:#14213D;border-radius:6px;padding:0 6px;margin:2px 4px 0 0;font-size:12px}code{font-size:11px;color:var(--dim)}
</style></head><body><h1>Librairie de motions</h1><p>${items.length} motions validés · généré par build-library.mjs</p>
${SECTIONS.map((sec) => { const L = items.filter((x) => x.section === sec); return L.length ? `<h2>${LABEL[sec]}</h2><div class="g">${L.map(card).join('')}</div>` : ''; }).join('\n')}
</body></html>\n`;
fs.writeFileSync(path.join(LIB, 'gallery.html'), html);
console.log(`index.md, index.json, gallery.html → ${items.length} fiches`);
