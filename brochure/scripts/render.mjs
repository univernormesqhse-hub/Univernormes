// Convertit un HTML de la brochure en PDF avec Chromium (Playwright).
// Usage : node scripts/render.mjs <entrée.html> <sortie.pdf> <print|web>
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
// Playwright est installé avec le projet vidéo voisin ; on le réutilise.
const require = createRequire(path.resolve(here, '../../video/package.json'));
const { chromium } = require('playwright');

const [, , input, output, variant = 'web'] = process.argv;
const bleed = variant === 'print' ? 3 : 0;
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(path.resolve(input)).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
// Contrôle de débordement : tout élément de texte qui sort de sa page est signalé.
const issues = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll('.page').forEach((pg, i) => {
    const r = pg.getBoundingClientRect();
    pg.querySelectorAll('.trim *').forEach((el) => {
      const b = el.getBoundingClientRect();
      if (!b.width || !b.height) return;
      if (b.right > r.right + 0.5 || b.bottom > r.bottom + 0.5 || b.left < r.left - 0.5 || b.top < r.top - 0.5)
        out.push(`page ${i + 1} : <${el.tagName.toLowerCase()} class="${el.className}"> déborde`);
    });
  });
  return out;
});
issues.forEach((s) => console.warn('⚠', s));
await page.pdf({
  path: output,
  width: `${210 + 2 * bleed}mm`,
  height: `${297 + 2 * bleed}mm`,
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});
await browser.close();
console.log(output);
