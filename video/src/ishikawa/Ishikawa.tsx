import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Chapter} from '../charte/ui';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {Camera, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {s} from '../theme';
import {captions} from './captions';
import {Causes, Intro, Outil} from './Scenes1';
import {AuDela, CinqM, FIVE_M} from './Scenes2';
import {Conclusion, Lean} from './Scenes3';

const LOGO = 'promo/logo.png';
const OUTRO_AT = 434.7;
export const ISHIKAWA_FRAMES = s(438.1);

/** Cartons de chapitre : [début, fin, n°, titre, sous-titre, icônes]. */
const CHAPTERS: [number, number, number, string, string, string[]][] = [
  [56.2, 59.5, 1, 'Multiples causes', "La cause n'est qu'un symptôme", ['toile', 'question', 'herbe']],
  [74.46, 77.9, 2, "L'outil Ishikawa", 'La solution visuelle', ['poisson', 'yeux', 'equipe']],
  [143.74, 147.26, 3, "L'enquête des 5M", 'Trouver la cause racine', ['detective', 'loupe2', 'stock']],
  [248.08, 252.3, 4, 'Au-delà des 5M', "L'évolution d'un outil", ['puzzle', 'hopital', 'argent']],
  [301.9, 307.46, 5, 'La vision lean', "L'outil et la philosophie", ['balance', 'poubelle', 'graphique']],
];

const pops = (ats: number[], s0 = 'sfx/pop', v = 0.5): Sfx[] => ats.map((at) => ({at, s: s0, v}));

/**
 * Sound design (sans musique ni son de fond, à la demande du client) : uniquement des bruitages,
 * bien audibles et calés sur les actions visibles, avec des respirations silencieuses.
 */
const CUES: Sfx[] = [
  // intro
  {at: 0.2, s: 'bass-hit', v: 0.55},
  {at: 0.6, s: 'sfx/pop', v: 0.5},
  {at: 4.6, s: 'notification', v: 0.45},
  {at: 9.6, s: 'sfx/swish', v: 0.5},
  {at: 12.2, s: 'stylo', v: 0.45, dur: 1.4},
  ...pops([13.15, 13.4, 13.65, 13.9], 'tick', 0.5),
  ...pops([17.9, 19.1, 20.9], 'sfx/pop', 0.5),
  {at: 23.2, s: 'tension', v: 0.35, dur: 3},
  {at: 25.4, s: 'sfx/pop', v: 0.45},
  {at: 27.6, s: 'alarme', v: 0.25, dur: 1.6},
  {at: 32.5, s: 'sfx/pop', v: 0.45},
  {at: 33.6, s: 'riser', v: 0.4, dur: 1.2},
  {at: 34.6, s: 'deep-hit', v: 0.55},
  ...[39.1, 43.3, 46.6, 49.1, 51.6].flatMap((at) => [{at, s: 'soft-whoosh', v: 0.45}, {at: at + 0.3, s: 'tick', v: 0.5}]),
  {at: 55.2, s: 'validation', v: 0.55},
  // chapitres
  ...CHAPTERS.flatMap(([a]) => [{at: a - 0.45, s: 'soft-whoosh', v: 0.5}, {at: a + 0.05, s: 'deep-hit', v: 0.5}]),
  // partie 1
  {at: 59.8, s: 'bass-hit', v: 0.5},
  ...pops([62.2, 62.8, 63.4], 'sfx/swish', 0.35),
  ...pops([64.7, 65.15, 65.6, 66.05, 66.5], 'tick', 0.5),
  {at: 69.6, s: 'sfx/whoosh', v: 0.5},
  {at: 71.0, s: 'sfx/thud', v: 0.5},
  {at: 71.2, s: 'notification', v: 0.4},
  {at: 72.7, s: 'sfx/pop', v: 0.5},
  // partie 2
  {at: 78.2, s: 'sfx/pop', v: 0.5},
  {at: 82.3, s: 'soft-whoosh', v: 0.42},
  {at: 84.9, s: 'soft-whoosh', v: 0.42},
  {at: 89.1, s: 'soft-whoosh', v: 0.45},
  {at: 94.8, s: 'stylo', v: 0.45, dur: 1.2},
  {at: 95.4, s: 'bass-hit', v: 0.5},
  {at: 96.3, s: 'sfx/ding', v: 0.42},
  ...pops([99.2, 99.7, 100.2, 100.7, 101.2], 'tick', 0.5),
  {at: 107.0, s: 'sfx/pop', v: 0.45},
  {at: 110.6, s: 'notification', v: 0.42},
  {at: 113.0, s: 'page', v: 0.5},
  {at: 116.9, s: 'bass-hit', v: 0.5},
  {at: 119.0, s: 'sfx/pop', v: 0.5},
  {at: 124.6, s: 'sfx/swish', v: 0.55},
  ...Array.from({length: 8}, (_, i) => ({at: 127.0 + i * 0.2, s: 'tick', v: 0.45})),
  {at: 128.8, s: 'tampon', v: 0.65},
  {at: 130.4, s: 'sfx/pop', v: 0.5},
  ...pops([134.2, 135.5, 136.9, 138.6], 'sfx/pop', 0.48),
  {at: 139.9, s: 'validation', v: 0.5},
  // partie 3
  {at: 147.5, s: 'soft-whoosh', v: 0.45},
  {at: 152.3, s: 'page', v: 0.5},
  ...FIVE_M.flatMap((m) => [{at: m.at - 0.05, s: 'sfx/whoosh', v: 0.45}, {at: m.at + 0.3, s: 'bass-hit', v: 0.45}]),
  ...pops([162.6, 164.3, 178.5, 180.6, 192.9], 'sfx/pop', 0.45),
  {at: 167.2, s: 'notification', v: 0.42},
  ...pops([183.7, 185.1, 186.4], 'tick', 0.55),
  {at: 198.7, s: 'page', v: 0.45},
  {at: 202.6, s: 'sfx/click', v: 0.5},
  {at: 204.6, s: 'sfx/thud', v: 0.6},
  {at: 208.1, s: 'tampon', v: 0.65},
  {at: 216.8, s: 'sfx/pop', v: 0.42},
  {at: 218.2, s: 'sfx/swish', v: 0.55},
  ...pops([219.7, 221.0, 222.6], 'tick', 0.5),
  {at: 224.2, s: 'validation', v: 0.5},
  {at: 235.6, s: 'sfx/pop', v: 0.45},
  ...Array.from({length: 10}, (_, i) => ({at: 238.0 + i * 0.2, s: 'tick', v: 0.45})),
  {at: 240.2, s: 'alarme', v: 0.25, dur: 1.4},
  {at: 244.1, s: 'stylo', v: 0.45, dur: 1.2},
  ...pops([244.5, 244.8, 245.1, 245.4, 245.7], 'tick', 0.5),
  // partie 4
  {at: 252.4, s: 'soft-whoosh', v: 0.45},
  {at: 253.4, s: 'soft-whoosh', v: 0.45},
  {at: 257.5, s: 'stylo', v: 0.4, dur: 1.2},
  ...[264.9, 268.0, 272.4].flatMap((at) => [{at, s: 'sfx/pop', v: 0.55}, {at: at + 0.4, s: 'sfx/ding', v: 0.4}]),
  {at: 279.2, s: 'sfx/pop', v: 0.5},
  {at: 283.9, s: 'alarme', v: 0.22, dur: 1.4},
  ...[290.8, 291.8, 292.9, 293.6].map((at) => ({at, s: 'soft-whoosh', v: 0.42})),
  {at: 296.4, s: 'validation', v: 0.5},
  // partie 5
  {at: 307.8, s: 'sfx/pop', v: 0.5},
  {at: 311.0, s: 'sfx/swish', v: 0.5},
  {at: 312.6, s: 'sfx/pop', v: 0.5},
  {at: 316.6, s: 'bass-hit', v: 0.55},
  {at: 318.5, s: 'page', v: 0.5},
  {at: 328.2, s: 'sfx/swish', v: 0.55},
  {at: 331.5, s: 'sfx/click', v: 0.5},
  {at: 333.3, s: 'sfx/click', v: 0.5},
  {at: 338.6, s: 'tampon', v: 0.65},
  {at: 341.0, s: 'notification', v: 0.42},
  ...[348.6, 355.0, 360.4].flatMap((at) => [{at, s: 'soft-whoosh', v: 0.45}, {at: at + 0.3, s: 'bass-hit', v: 0.42}]),
  ...pops([365.4, 365.65, 365.9], 'sfx/swish', 0.5),
  ...pops([371.3, 372.3, 375.0], 'sfx/pop', 0.5),
  {at: 378.8, s: 'soft-whoosh', v: 0.45},
  {at: 380.5, s: 'deep-hit', v: 0.5},
  ...KEY_ATS().flatMap((at) => [{at, s: 'soft-whoosh', v: 0.42}, {at: at + 0.3, s: 'tick', v: 0.5}]),
  // conclusion
  {at: 401.3, s: 'sfx/pop', v: 0.5},
  {at: 403.4, s: 'sfx/swish', v: 0.5},
  {at: 410.9, s: 'notification', v: 0.45},
  {at: 414.2, s: 'riser', v: 0.4, dur: 1.4},
  {at: 415.4, s: 'validation', v: 0.55},
  {at: 416.0, s: 'soft-whoosh', v: 0.45},
  {at: 420.6, s: 'sfx/swish', v: 0.5},
  {at: 423.4, s: 'sfx/pop', v: 0.45},
  {at: 425.0, s: 'stylo', v: 0.5, dur: 1.4},
  ...pops([426.7, 426.98, 427.26, 427.54, 427.82], 'tick', 0.5),
  {at: 428.9, s: 'validation', v: 0.5},
  {at: 429.9, s: 'sfx/pop', v: 0.5},
  {at: 431.6, s: 'sfx/swish', v: 0.45},
  {at: OUTRO_AT - 0.4, s: 'soft-whoosh', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

function KEY_ATS() {
  return [387.1, 390.6, 393.2, 395.5];
}

const WIPES = [...CHAPTERS.flatMap(([a, b]) => [a, b]), 398.9];

export const Ishikawa: React.FC = () => (
  <AbsoluteFill>
    <Camera shakes={[34.6, 128.8, 208.1, 338.6, 380.5]}>
      <Background />
      <Gate from={0} to={56.2}><Intro /></Gate>
      <Gate from={59.5} to={74.46}><Causes /></Gate>
      <Gate from={77.9} to={143.74}><Outil /></Gate>
      <Gate from={147.26} to={248.08}><CinqM /></Gate>
      <Gate from={252.3} to={301.9}><AuDela /></Gate>
      <Gate from={307.46} to={398.9}><Lean /></Gate>
      <Gate from={398.9} to={OUTRO_AT}><Conclusion end={OUTRO_AT} /></Gate>
      {CHAPTERS.map(([a, b, n, title, sub, icons]) => (
        <Gate key={n} from={a} to={b}><Chapter at={a} until={b} n={n} title={title} sub={sub} icons={icons} total={5} /></Gate>
      ))}
      <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    </Camera>
    <Header hideAt={OUTRO_AT} logo={LOGO} />
    <Footer hideAt={OUTRO_AT} />
    {WIPES.map((at) => <Wipe key={at} at={at} />)}
    <Wipe at={OUTRO_AT} />
    <Captions captions={captions} />
    <Audio src={staticFile('voix-off-ishikawa.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
