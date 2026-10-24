#!/usr/bin/env node
// Voix d'origine pleine qualité + transcript au mot.
// usage : node transcribe.mjs <rush.mp4> --episode <slug> [--lang fr]
// Moteurs (le premier disponible) :
//   1. CLI `whisper` (openai-whisper) → horodatage réel de chaque mot
//   2. sherpa-onnx (Python) avec WHISPER_MODEL_DIR=<dossier sherpa-onnx-whisper-*> → segments, mots répartis (approx: true)
import {execFileSync, spawnSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const rush = args.find((a, i) => !a.startsWith('--') && !['--episode', '--lang'].includes(args[i - 1]));
const episode = opt('--episode');
const lang = opt('--lang', 'fr');
if (!rush || !episode) { console.error('usage: node transcribe.mjs <rush.mp4> --episode <slug> [--lang fr]'); process.exit(1); }

const dir = path.resolve('public', episode);
fs.mkdirSync(dir, {recursive: true});
const run = (cmd, a) => execFileSync(cmd, a, {stdio: ['ignore', 'pipe', 'inherit']}).toString();

// 1. voix d'origine : copie sans réencodage si AAC, sinon AAC 192k
const codec = run('ffprobe', ['-v', 'error', '-select_streams', 'a:0', '-show_entries', 'stream=codec_name', '-of', 'csv=p=0', rush]).trim();
const voix = path.join(dir, 'voix.m4a');
run('ffmpeg', ['-v', 'error', '-y', '-i', rush, '-vn', '-map', '0:a:0', ...(codec === 'aac' ? ['-c:a', 'copy'] : ['-c:a', 'aac', '-b:a', '192k']), voix]);
console.log(`voix d'origine → ${path.relative(process.cwd(), voix)} (${codec === 'aac' ? 'copie' : 'AAC 192k'})`);

// 2. WAV 16 kHz mono, uniquement pour la transcription (jamais dans le montage)
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'tr-'));
const wav = path.join(tmp, 'a16.wav');
run('ffmpeg', ['-v', 'error', '-y', '-i', rush, '-vn', '-ac', '1', '-ar', '16000', wav]);

let words = null, engine = null, approx = false;
const has = (c) => spawnSync('sh', ['-c', `command -v ${c}`]).status === 0;
if (has('whisper')) {
  engine = 'openai-whisper';
  run('whisper', [wav, '--language', lang, '--word_timestamps', 'True', '--output_format', 'json', '--output_dir', tmp]);
  const j = JSON.parse(fs.readFileSync(path.join(tmp, 'a16.json'), 'utf8'));
  words = j.segments.flatMap((s) => (s.words || []).map((w) => ({w: w.word.trim(), s: +w.start.toFixed(2), e: +w.end.toFixed(2)})));
} else if (process.env.WHISPER_MODEL_DIR && spawnSync('python3', ['-c', 'import sherpa_onnx, soundfile']).status === 0) {
  engine = 'sherpa-onnx';
  approx = true;
  const py = path.join(path.dirname(new URL(import.meta.url).pathname), 'sherpa_segments.py');
  const out = run('python3', [py, wav, process.env.WHISPER_MODEL_DIR, lang]);
  const segs = JSON.parse(out);
  words = segs.flatMap((g) => {
    const ws = g.t.split(/\s+/).filter(Boolean);
    const tot = ws.reduce((n, w) => n + w.length, 0) || 1;
    let t = g.s;
    return ws.map((w) => { const d = ((g.e - g.s) * w.length) / tot; const r = {w, s: +t.toFixed(2), e: +(t + d).toFixed(2)}; t += d; return r; });
  });
} else {
  console.error('Aucun moteur de transcription : installer openai-whisper (`pip install openai-whisper`) ou définir WHISPER_MODEL_DIR vers un modèle sherpa-onnx-whisper.');
  process.exit(2);
}

const tr = path.join(dir, 'transcript.json');
fs.writeFileSync(tr, JSON.stringify({engine, lang, approx, words, text: words.map((w) => w.w).join(' ')}, null, 1));
fs.rmSync(tmp, {recursive: true, force: true});
console.log(`transcript (${engine}${approx ? ', mots répartis : à recaler' : ''}) → ${path.relative(process.cwd(), tr)} · ${words.length} mots`);
