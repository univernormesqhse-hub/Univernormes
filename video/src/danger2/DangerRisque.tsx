import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Chapter} from '../charte/ui';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {Camera, Flash, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {s} from '../theme';
import {captions} from './captions';
import {Banane, Danger, Intro} from './Scenes1';
import {Comparaison, Falaise, Familles, Risque} from './Scenes2';
import {Conclusion, Matrice, Reduire} from './Scenes3';

const LOGO = 'promo/logo.png';
const OUTRO_AT = 381.5;
export const DANGER2_FRAMES = s(384.9);

/** Cartons de chapitre : [début, fin, n°, titre, sous-titre, icônes]. */
const CHAPTERS: [number, number, number, string, string, string[]][] = [
  [69.2, 73.3, 1, 'Le danger', 'Une propriété intrinsèque', ['danger', 'bombe', 'chaud']],
  [146.2, 152.2, 2, 'Le risque', "L'éventualité d'une rencontre", ['de', 'ouvrier', 'bris']],
  [265.9, 270.9, 3, 'Quantifier', 'Probabilité × gravité', ['balance', 'graphique', 'loupe']],
  [296.2, 301.6, 4, 'Réduire', 'Agir à la source', ['cible', 'casque', 'bouclier']],
];

const at4 = (t0: number, s0: string, v: number, gap = 0.15, n = 4): Sfx[] => Array.from({length: n}, (_, i) => ({at: t0 + i * gap, s: s0, v}));

/**
 * Sound design (sans musique ni son de fond, à la demande du client) : uniquement des bruitages,
 * calés sur les actions visibles, bien présents mais jamais sur chaque phrase.
 */
const CUES: Sfx[] = [
  // intro
  {at: 0.2, s: 'bass-hit', v: 0.55},
  {at: 0.85, s: 'soft-whoosh', v: 0.5},
  {at: 1.55, s: 'soft-whoosh', v: 0.5},
  {at: 3.0, s: 'sfx/pop', v: 0.5},
  {at: 10.4, s: 'deep-hit', v: 0.6},
  {at: 15.3, s: 'sfx/thud', v: 0.5},
  {at: 17.15, s: 'sfx/thud', v: 0.6},
  {at: 19.5, s: 'notification', v: 0.45},
  {at: 23.2, s: 'page', v: 0.55},
  {at: 26.2, s: 'sfx/ding', v: 0.45},
  {at: 28.1, s: 'sfx/pop', v: 0.45},
  {at: 31.0, s: 'tension', v: 0.35, dur: 3.2},
  {at: 34.4, s: 'page', v: 0.55},
  {at: 35.0, s: 'stylo', v: 0.5, dur: 2.8},
  {at: 39.0, s: 'tampon', v: 0.65},
  {at: 40.1, s: 'soft-whoosh', v: 0.45},
  {at: 42.6, s: 'sfx/swish', v: 0.5},
  {at: 44.4, s: 'notification', v: 0.45},
  // la peau de banane
  {at: 50.6, s: 'sfx/pop', v: 0.55},
  {at: 57.5, s: 'tension', v: 0.38, dur: 2.3},
  {at: 59.85, s: 'sfx/whoosh', v: 0.55},
  {at: 61.4, s: 'sfx/thud', v: 0.7},
  {at: 61.42, s: 'bass-hit', v: 0.55},
  {at: 62.2, s: 'sfx/swish', v: 0.45},
  {at: 64.7, s: 'soft-whoosh', v: 0.45},
  {at: 65.4, s: 'sfx/pop', v: 0.45},
  {at: 65.9, s: 'soft-whoosh', v: 0.45},
  {at: 67.0, s: 'validation', v: 0.55},
  // chapitres
  ...CHAPTERS.flatMap(([a]) => [{at: a - 0.45, s: 'soft-whoosh', v: 0.5}, {at: a + 0.05, s: 'deep-hit', v: 0.5}]),
  // partie 1 : le danger
  {at: 73.6, s: 'bass-hit', v: 0.5},
  {at: 77.6, s: 'sfx/click', v: 0.55},
  {at: 81.2, s: 'page', v: 0.55},
  {at: 84.6, s: 'tick', v: 0.55},
  {at: 85.7, s: 'sfx/pop', v: 0.45},
  {at: 86.45, s: 'sfx/pop', v: 0.45},
  {at: 87.1, s: 'sfx/pop', v: 0.45},
  {at: 88.95, s: 'tick', v: 0.55},
  {at: 91.0, s: 'bass-hit', v: 0.5},
  {at: 95.9, s: 'sfx/ding', v: 0.42},
  {at: 98.2, s: 'sfx/pop', v: 0.42},
  {at: 102.2, s: 'sfx/pop', v: 0.45},
  {at: 108.3, s: 'tampon', v: 0.55},
  ...[110.8, 112.2, 113.0].map((at) => ({at, s: 'sfx/pop', v: 0.45})),
  {at: 114.0, s: 'sfx/swish', v: 0.55},
  {at: 115.4, s: 'notification', v: 0.4},
  ...[123.0, 127.5, 133.6].map((at) => ({at, s: 'soft-whoosh', v: 0.45})),
  ...[124.4, 125.5, 128.4, 130.2, 131.9, 134.5, 135.6].map((at) => ({at, s: 'tick', v: 0.5})),
  {at: 137.1, s: 'soft-whoosh', v: 0.4},
  {at: 139.2, s: 'tension', v: 0.3, dur: 3},
  {at: 143.9, s: 'bass-hit', v: 0.5},
  // partie 2 : le risque
  {at: 150.3, s: 'riser', v: 0.4, dur: 2.2},
  {at: 152.5, s: 'bass-hit', v: 0.55},
  {at: 156.98, s: 'deep-hit', v: 0.65},
  {at: 157.1, s: 'page', v: 0.5},
  ...[160.4, 160.9, 162.6].map((at) => ({at, s: 'sfx/pop', v: 0.45})),
  {at: 164.8, s: 'soft-whoosh', v: 0.45},
  {at: 172.3, s: 'sfx/whoosh', v: 0.4},
  {at: 174.3, s: 'bass-hit', v: 0.6},
  {at: 174.35, s: 'alarme', v: 0.28, dur: 1.6},
  {at: 177.3, s: 'sfx/whoosh', v: 0.4},
  {at: 180.6, s: 'validation', v: 0.55},
  {at: 180.62, s: 'sfx/ding', v: 0.45},
  {at: 185.1, s: 'soft-whoosh', v: 0.45},
  ...[187.5, 188.3, 189.2].map((at) => ({at, s: 'tick', v: 0.55})),
  {at: 191.2, s: 'soft-whoosh', v: 0.45},
  ...[195.4, 196.06, 196.8].map((at) => ({at, s: 'sfx/pop', v: 0.5})),
  {at: 198.0, s: 'sfx/click', v: 0.55},
  {at: 199.6, s: 'sfx/click', v: 0.55},
  {at: 202.1, s: 'sfx/pop', v: 0.45},
  {at: 202.6, s: 'sfx/swish', v: 0.45},
  {at: 208.6, s: 'soft-whoosh', v: 0.45},
  {at: 213.0, s: 'sfx/pop', v: 0.45},
  {at: 217.6, s: 'sfx/whoosh', v: 0.55},
  {at: 218.9, s: 'sfx/thud', v: 0.6},
  ...at4(221.3, 'sfx/click', 0.5),
  {at: 222.4, s: 'soft-whoosh', v: 0.4},
  {at: 224.6, s: 'soft-whoosh', v: 0.4},
  {at: 227.6, s: 'validation', v: 0.5},
  {at: 228.3, s: 'tampon', v: 0.7},
  {at: 230.2, s: 'sfx/ding', v: 0.42},
  ...[242.6, 246.3, 249.2, 252.8, 255.5].flatMap((at) => [{at, s: 'soft-whoosh', v: 0.42}, {at: at + 0.3, s: 'tick', v: 0.5}]),
  {at: 261.9, s: 'soft-whoosh', v: 0.45},
  {at: 262.6, s: 'soft-whoosh', v: 0.45},
  {at: 263.6, s: 'sfx/pop', v: 0.45},
  // partie 3 : quantifier
  ...at4(273.2, 'tick', 0.45, 0.07, 7),
  {at: 275.6, s: 'notification', v: 0.45},
  {at: 277.1, s: 'sfx/click', v: 0.5},
  {at: 279.9, s: 'sfx/click', v: 0.5},
  {at: 279.95, s: 'bass-hit', v: 0.45},
  {at: 282.0, s: 'sfx/swish', v: 0.45},
  {at: 286.6, s: 'soft-whoosh', v: 0.45},
  {at: 289.4, s: 'alarme', v: 0.28, dur: 1.4},
  {at: 290.9, s: 'soft-whoosh', v: 0.45},
  {at: 292.6, s: 'validation', v: 0.5},
  {at: 294.0, s: 'sfx/pop', v: 0.45},
  // partie 4 : réduire
  {at: 301.9, s: 'bass-hit', v: 0.5},
  {at: 304.4, s: 'notification', v: 0.45},
  {at: 306.4, s: 'sfx/pop', v: 0.45},
  {at: 311.0, s: 'sfx/swish', v: 0.5},
  {at: 311.4, s: 'soft-whoosh', v: 0.42},
  {at: 312.3, s: 'validation', v: 0.55},
  {at: 313.8, s: 'cadenas', v: 0.55},
  {at: 316.8, s: 'tampon', v: 0.7},
  {at: 319.0, s: 'sfx/pop', v: 0.45},
  {at: 319.4, s: 'sfx/pop', v: 0.45},
  {at: 321.5, s: 'soft-whoosh', v: 0.42},
  {at: 323.6, s: 'tick', v: 0.5},
  ...[329.8, 333.4, 339.2, 342.9].flatMap((at) => [{at, s: 'soft-whoosh', v: 0.45}, {at: at + 0.3, s: 'tick', v: 0.5}]),
  ...[340.9, 341.3, 341.9, 342.3].map((at) => ({at, s: 'sfx/pop', v: 0.5})),
  {at: 346.9, s: 'sfx/thud', v: 0.6},
  {at: 350.9, s: 'deep-hit', v: 0.6},
  {at: 351.3, s: 'page', v: 0.45},
  // conclusion
  {at: 353.8, s: 'sfx/ding', v: 0.45},
  {at: 360.0, s: 'soft-whoosh', v: 0.42},
  {at: 361.6, s: 'soft-whoosh', v: 0.42},
  {at: 362.5, s: 'soft-whoosh', v: 0.45},
  {at: 364.2, s: 'tick', v: 0.55},
  {at: 365.3, s: 'tick', v: 0.55},
  {at: 367.2, s: 'sfx/rise', v: 0.45},
  {at: 371.0, s: 'soft-whoosh', v: 0.45},
  {at: 373.0, s: 'soft-whoosh', v: 0.45},
  ...at4(374.5, 'sfx/thud', 0.45, 0.45),
  {at: 378.4, s: 'validation', v: 0.5},
  {at: OUTRO_AT - 0.4, s: 'soft-whoosh', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const WIPES = [...CHAPTERS.flatMap(([a, b]) => [a, b]), 47.9, 182.0, 208.4, 237.6, 353.46];

export const DangerRisque2: React.FC = () => (
  <AbsoluteFill>
    <Camera shakes={[10.4, 61.4, 156.98, 174.3, 228.3, 316.8, 350.9]}>
      <Background />
      <Gate from={0} to={47.9}><Intro /></Gate>
      <Gate from={47.9} to={69.2}><Banane /></Gate>
      <Gate from={73.3} to={146.2}><Danger /></Gate>
      <Gate from={152.2} to={182.0}><Risque /></Gate>
      <Gate from={182.0} to={208.4}><Comparaison /></Gate>
      <Gate from={208.4} to={237.6}><Falaise /></Gate>
      <Gate from={237.6} to={265.9}><Familles /></Gate>
      <Gate from={270.9} to={296.2}><Matrice /></Gate>
      <Gate from={301.6} to={353.46}><Reduire /></Gate>
      <Gate from={353.46} to={OUTRO_AT}><Conclusion end={OUTRO_AT} /></Gate>
      {CHAPTERS.map(([a, b, n, title, sub, icons]) => (
        <Gate key={n} from={a} to={b}><Chapter at={a} until={b} n={n} title={title} sub={sub} icons={icons} total={4} /></Gate>
      ))}
      <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    </Camera>
    <Header hideAt={OUTRO_AT} logo={LOGO} />
    <Footer hideAt={OUTRO_AT} />
    {WIPES.map((at) => <Wipe key={at} at={at} />)}
    <Wipe at={OUTRO_AT} />
    <Flash at={156.98} />
    <Flash at={61.4} />
    <Captions captions={captions} />
    <Audio src={staticFile('voix-off-danger-risque2.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
