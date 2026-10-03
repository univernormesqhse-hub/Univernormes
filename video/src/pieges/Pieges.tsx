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
import {Intro, Structure} from './Scenes1';
import {Climat, Culture} from './Scenes2';
import {Conclusion, IA, Transition} from './Scenes3';

const LOGO = 'promo/logo.png';
const OUTRO_AT = 914.7;
export const PIEGES_FRAMES = s(918.1);

/** Cartons de chapitre : [début, fin, n°, titre, sous-titre, icônes]. */
const CHAPTERS: [number, number, number, string, string, string[]][] = [
  [98.52, 101.48, 1, 'Le piège de la structure', 'Sous le capot', ['engrenage', 'clipboard', 'puzzle']],
  [346.08, 351.08, 2, 'Culture & éthique', 'Le virage humain', ['equipe', 'balance', 'cerveau']],
  [480.48, 485.06, 3, 'Climat & résilience', 'Les pressions externes', ['globe', 'bouclier', 'fusee']],
  [606.8, 612.28, 4, "L'IA fantôme", 'Le numérique sans le nommer', ['ordinateur', 'question', 'cerveau']],
  [746.74, 753.14, 5, 'Réussir la transition', 'Pas de panique', ['calendrier', 'check', 'medaille']],
];

const pops = (ats: number[], s0 = 'sfx/pop', v = 0.5): Sfx[] => ats.map((at) => ({at, s: s0, v}));
const duo = (ats: number[], s0 = 'soft-whoosh', s1 = 'tick'): Sfx[] => ats.flatMap((at) => [{at, s: s0, v: 0.45}, {at: at + 0.3, s: s1, v: 0.5}]);

/**
 * Sound design (sans musique ni son de fond, à la demande du client) : uniquement des bruitages,
 * bien audibles et calés sur les actions visibles, avec des respirations silencieuses.
 */
const CUES: Sfx[] = [
  // intro
  {at: 0.2, s: 'bass-hit', v: 0.55},
  {at: 2.2, s: 'sfx/pop', v: 0.5},
  {at: 5.0, s: 'page', v: 0.5},
  {at: 9.3, s: 'tension', v: 0.35, dur: 2.8},
  {at: 12.1, s: 'tampon', v: 0.7},
  {at: 12.15, s: 'deep-hit', v: 0.5},
  {at: 16.9, s: 'sfx/pop', v: 0.45},
  {at: 22.6, s: 'sfx/pop', v: 0.5},
  {at: 23.2, s: 'alarme', v: 0.25, dur: 1.4},
  {at: 26.0, s: 'soft-whoosh', v: 0.42},
  {at: 29.5, s: 'bass-hit', v: 0.55},
  {at: 34.7, s: 'notification', v: 0.5},
  {at: 41.4, s: 'sfx/pop', v: 0.5},
  {at: 43.6, s: 'stylo', v: 0.4, dur: 2.2},
  {at: 44.3, s: 'riser', v: 0.35, dur: 1.6},
  {at: 45.8, s: 'sfx/pop', v: 0.5},
  {at: 49.4, s: 'soft-whoosh', v: 0.42},
  ...Array.from({length: 9}, (_, i) => ({at: 51.5 + i * 0.2, s: 'tick', v: 0.42})),
  {at: 59.6, s: 'sfx/thud', v: 0.5},
  {at: 65.0, s: 'notification', v: 0.42},
  {at: 68.0, s: 'soft-whoosh', v: 0.45},
  {at: 68.9, s: 'soft-whoosh', v: 0.45},
  ...pops([74.0, 74.35, 74.7, 75.05, 75.4], 'page', 0.4),
  ...pops([76.7, 79.7, 85.2, 89.0, 92.7, 93.4], 'sfx/pop', 0.45),
  // chapitres
  ...CHAPTERS.flatMap(([a]) => [{at: a - 0.45, s: 'soft-whoosh', v: 0.5}, {at: a + 0.05, s: 'deep-hit', v: 0.5}]),
  // structure
  {at: 104.6, s: 'sfx/pop', v: 0.5},
  {at: 110.4, s: 'notification', v: 0.4},
  {at: 113.3, s: 'riser', v: 0.4, dur: 1.2},
  {at: 114.3, s: 'bass-hit', v: 0.5},
  {at: 123.9, s: 'sfx/pop', v: 0.45},
  {at: 129.6, s: 'tick', v: 0.5},
  {at: 137.0, s: 'notification', v: 0.42},
  {at: 146.0, s: 'soft-whoosh', v: 0.42},
  {at: 147.2, s: 'soft-whoosh', v: 0.42},
  {at: 153.3, s: 'cadenas', v: 0.6},
  {at: 163.6, s: 'validation', v: 0.5},
  {at: 166.9, s: 'tension', v: 0.35, dur: 3},
  {at: 176.6, s: 'sfx/pop', v: 0.45},
  ...pops([184.4, 184.8, 185.2], 'tick', 0.5),
  {at: 193.2, s: 'sfx/swish', v: 0.55},
  {at: 195.3, s: 'sfx/whoosh', v: 0.5},
  {at: 197.4, s: 'sfx/thud', v: 0.55},
  {at: 198.0, s: 'sfx/pop', v: 0.45},
  {at: 203.4, s: 'sfx/pop', v: 0.45},
  {at: 204.8, s: 'page', v: 0.5},
  {at: 208.3, s: 'tampon', v: 0.7},
  ...pops([212.6, 212.85, 213.1], 'page', 0.42),
  {at: 214.7, s: 'alarme', v: 0.22, dur: 1.4},
  {at: 222.3, s: 'page', v: 0.5},
  {at: 228.4, s: 'tension', v: 0.32, dur: 2.6},
  {at: 231.3, s: 'tampon', v: 0.7},
  ...Array.from({length: 12}, (_, i) => ({at: 243.0 + i * 0.5, s: 'tick', v: 0.45})),
  {at: 245.3, s: 'alarme', v: 0.2, dur: 1.4},
  {at: 250.3, s: 'validation', v: 0.5},
  {at: 254.0, s: 'sfx/pop', v: 0.45},
  ...pops([261.6, 262.1, 262.6], 'sfx/swish', 0.42),
  {at: 267.8, s: 'sfx/pop', v: 0.5},
  {at: 271.5, s: 'notification', v: 0.45},
  {at: 277.8, s: 'sfx/swish', v: 0.55},
  {at: 278.4, s: 'sfx/thud', v: 0.45},
  {at: 279.8, s: 'riser', v: 0.35, dur: 1.2},
  {at: 289.4, s: 'cadenas', v: 0.55},
  {at: 290.6, s: 'tampon', v: 0.55},
  {at: 300.9, s: 'sfx/pop', v: 0.45},
  {at: 304.3, s: 'soft-whoosh', v: 0.42},
  {at: 311.0, s: 'soft-whoosh', v: 0.45},
  {at: 321.9, s: 'tick', v: 0.5},
  {at: 328.2, s: 'soft-whoosh', v: 0.45},
  {at: 334.4, s: 'sfx/click', v: 0.5},
  {at: 342.3, s: 'tampon', v: 0.65},
  // culture
  {at: 355.3, s: 'sfx/pop', v: 0.5},
  ...pops([361.6, 363.8], 'sfx/pop', 0.45),
  ...pops([366.2, 367.4], 'tick', 0.5),
  {at: 373.9, s: 'page', v: 0.5},
  {at: 380.2, s: 'sfx/pop', v: 0.5},
  {at: 384.8, s: 'tampon', v: 0.65},
  {at: 387.0, s: 'sfx/pop', v: 0.45},
  {at: 400.3, s: 'sfx/thud', v: 0.45},
  {at: 408.2, s: 'sfx/swish', v: 0.55},
  {at: 410.5, s: 'notification', v: 0.42},
  ...duo([419.4, 441.0, 451.2]),
  {at: 422.4, s: 'tension', v: 0.32, dur: 3},
  {at: 432.6, s: 'tampon', v: 0.7},
  {at: 458.7, s: 'sfx/pop', v: 0.45},
  ...pops([466.0, 468.1, 469.0], 'sfx/pop', 0.5),
  {at: 472.8, s: 'sfx/swish', v: 0.55},
  {at: 477.3, s: 'tampon', v: 0.65},
  // climat
  {at: 486.0, s: 'bass-hit', v: 0.5},
  ...pops([490.6, 491.2], 'sfx/whoosh', 0.42),
  {at: 498.6, s: 'notification', v: 0.42},
  ...pops([502.3, 503.4], 'tick', 0.5),
  {at: 511.0, s: 'sfx/whoosh', v: 0.42},
  {at: 512.0, s: 'tension', v: 0.32, dur: 2.4},
  {at: 514.3, s: 'tampon', v: 0.65},
  ...pops([523.6, 523.9, 524.2, 524.5], 'sfx/thud', 0.45),
  ...Array.from({length: 8}, (_, i) => ({at: 527.0 + i * 0.25, s: 'tick', v: 0.42})),
  {at: 530.4, s: 'tampon', v: 0.75},
  {at: 530.45, s: 'deep-hit', v: 0.5},
  {at: 535.5, s: 'validation', v: 0.5},
  {at: 547.1, s: 'sfx/pop', v: 0.42},
  {at: 552.2, s: 'sfx/ding', v: 0.45},
  {at: 556.4, s: 'sfx/pop', v: 0.45},
  {at: 571.8, s: 'soft-whoosh', v: 0.45},
  {at: 579.3, s: 'soft-whoosh', v: 0.45},
  {at: 590.0, s: 'notification', v: 0.42},
  {at: 592.7, s: 'stylo', v: 0.4, dur: 3},
  {at: 594.4, s: 'alarme', v: 0.2, dur: 1.4},
  {at: 602.2, s: 'tampon', v: 0.65},
  // IA
  {at: 616.3, s: 'sfx/pop', v: 0.5},
  {at: 622.8, s: 'soft-whoosh', v: 0.42},
  ...pops([623.6, 623.85], 'sfx/click', 0.5),
  {at: 625.5, s: 'deep-hit', v: 0.5},
  {at: 631.0, s: 'sfx/pop', v: 0.45},
  {at: 643.0, s: 'soft-whoosh', v: 0.45},
  {at: 647.7, s: 'soft-whoosh', v: 0.45},
  {at: 650.1, s: 'validation', v: 0.5},
  {at: 654.7, s: 'soft-whoosh', v: 0.45},
  {at: 655.6, s: 'soft-whoosh', v: 0.45},
  {at: 669.0, s: 'soft-whoosh', v: 0.42},
  ...pops([671.2, 673.5], 'sfx/pop', 0.45),
  {at: 676.9, s: 'tampon', v: 0.65},
  {at: 679.3, s: 'page', v: 0.45},
  {at: 681.3, s: 'alarme', v: 0.22, dur: 1.4},
  {at: 685.2, s: 'deep-hit', v: 0.45},
  ...pops([691.6, 695.6], 'sfx/pop', 0.45),
  {at: 704.8, s: 'sfx/pop', v: 0.45},
  ...pops([707.3, 707.8, 708.3], 'tick', 0.55),
  ...pops([709.5, 711.0], 'sfx/pop', 0.45),
  {at: 724.3, s: 'soft-whoosh', v: 0.45},
  {at: 725.8, s: 'soft-whoosh', v: 0.45},
  {at: 745.2, s: 'tampon', v: 0.6},
  // transition
  {at: 758.9, s: 'sfx/pop', v: 0.45},
  {at: 762.0, s: 'sfx/swish', v: 0.55},
  {at: 765.2, s: 'riser', v: 0.35, dur: 1.2},
  {at: 767.4, s: 'validation', v: 0.55},
  {at: 773.9, s: 'notification', v: 0.42},
  {at: 778.0, s: 'stylo', v: 0.4, dur: 1.4},
  ...pops([778.5, 781.9, 793.1], 'sfx/pop', 0.55),
  {at: 780.2, s: 'tick', v: 0.5},
  {at: 785.3, s: 'sfx/thud', v: 0.5},
  {at: 799.3, s: 'alarme', v: 0.22, dur: 1.4},
  ...duo([807.3, 809.2, 812.6, 815.9, 824.2]),
  {at: 816.5, s: 'sfx/ding', v: 0.45},
  // conclusion
  ...duo([834.9, 838.3, 841.6, 844.9, 851.5]),
  {at: 859.4, s: 'sfx/pop', v: 0.45},
  ...pops([867.7, 869.1, 871.3], 'bass-hit', 0.42),
  {at: 864.7, s: 'deep-hit', v: 0.45},
  {at: 880.2, s: 'sfx/pop', v: 0.45},
  {at: 893.0, s: 'tension', v: 0.3, dur: 3},
  {at: 906.5, s: 'sfx/ding', v: 0.5},
  {at: 906.55, s: 'validation', v: 0.45},
  {at: OUTRO_AT - 0.4, s: 'soft-whoosh', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const WIPES = [...CHAPTERS.flatMap(([a, b]) => [a, b]), 831.0];

export const Pieges: React.FC = () => (
  <AbsoluteFill>
    <Camera shakes={[12.1, 208.3, 231.3, 432.6, 530.4]}>
      <Background />
      <Gate from={0} to={98.52}><Intro /></Gate>
      <Gate from={101.48} to={346.08}><Structure /></Gate>
      <Gate from={351.08} to={480.48}><Culture /></Gate>
      <Gate from={485.06} to={606.8}><Climat /></Gate>
      <Gate from={612.28} to={746.74}><IA /></Gate>
      <Gate from={753.14} to={831.0}><Transition /></Gate>
      <Gate from={831.0} to={OUTRO_AT}><Conclusion end={OUTRO_AT} /></Gate>
      {CHAPTERS.map(([a, b, n, title, sub, icons]) => (
        <Gate key={n} from={a} to={b}><Chapter at={a} until={b} n={n} title={title} sub={sub} icons={icons} total={5} /></Gate>
      ))}
      <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    </Camera>
    <Header hideAt={OUTRO_AT} logo={LOGO} />
    <Footer hideAt={OUTRO_AT} />
    {WIPES.map((at) => <Wipe key={at} at={at} />)}
    <Wipe at={OUTRO_AT} />
    <Flash at={12.1} />
    <Captions captions={captions} />
    <Audio src={staticFile('voix-off-pieges-iso.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
