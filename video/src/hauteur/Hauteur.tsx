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
import {Causes, Danger, Intro} from './Scenes1';
import {Choix, Culture, Pros} from './Scenes2';

const LOGO = 'promo/logo.png';
const OUTRO_AT = 344.0;
export const HAUTEUR_FRAMES = s(347.4);

/** Cartons de chapitre : [début, fin, n°, titre, sous-titre, icônes]. */
const CHAPTERS: [number, number, number, string, string, string[]][] = [
  [38.64, 42.26, 1, 'Le danger invisible', 'Première cause de décès', ['danger', 'echelle', 'crane']],
  [83.6, 88.02, 2, 'Les causes réelles', 'Le comportement humain', ['cerveau', 'chrono', 'maillon']],
  [147.74, 151.1, 3, 'La règle des pros', 'Vérifier. Toujours.', ['casque', 'cadenas', 'check']],
  [204.43, 208.23, 4, 'Culture sécurité', 'Responsabilité partagée', ['equipe', 'bouclier', 'stop']],
  [297.77, 300.71, 5, 'Le choix final', 'La sécurité est un choix', ['main-levee', 'maison', 'check']],
];

const pops = (ats: number[], s0 = 'sfx/pop', v = 0.5): Sfx[] => ats.map((at) => ({at, s: s0, v}));

/**
 * Sound design (sans musique ni son de fond, à la demande du client) : uniquement des bruitages,
 * bien audibles et calés sur les actions visibles.
 */
const CUES: Sfx[] = [
  // intro
  {at: 0.3, s: 'bass-hit', v: 0.55},
  {at: 10.4, s: 'sfx/ding', v: 0.42},
  {at: 13.0, s: 'sfx/pop', v: 0.5},
  ...Array.from({length: 5}, (_, i) => ({at: 14.7 + i * 0.2, s: 'tick', v: 0.55})),
  {at: 15.0, s: 'sfx/whoosh', v: 0.55},
  {at: 16.5, s: 'sfx/thud', v: 0.7},
  {at: 16.52, s: 'deep-hit', v: 0.5},
  {at: 19.7, s: 'sfx/pop', v: 0.45},
  {at: 29.94, s: 'deep-hit', v: 0.6},
  {at: 30.74, s: 'deep-hit', v: 0.6},
  {at: 31.72, s: 'deep-hit', v: 0.65},
  {at: 32.8, s: 'tampon', v: 0.7},
  // chapitres
  ...CHAPTERS.flatMap(([a]) => [{at: a - 0.45, s: 'soft-whoosh', v: 0.5}, {at: a + 0.05, s: 'deep-hit', v: 0.5}]),
  // danger
  {at: 42.4, s: 'tension', v: 0.32, dur: 3},
  ...pops([49.0, 51.2], 'sfx/pop', 0.48),
  {at: 56.8, s: 'sfx/pop', v: 0.45},
  {at: 57.6, s: 'sfx/swish', v: 0.55},
  {at: 58.6, s: 'sfx/pop', v: 0.45},
  {at: 63.0, s: 'sfx/whoosh', v: 0.45},
  {at: 64.6, s: 'alarme', v: 0.22, dur: 1.4},
  ...pops([70.1, 71.2, 71.9, 72.6], 'soft-whoosh', 0.45),
  {at: 76.0, s: 'riser', v: 0.4, dur: 2.4},
  {at: 79.2, s: 'sfx/whoosh', v: 0.55},
  {at: 80.3, s: 'sfx/thud', v: 0.7},
  {at: 80.32, s: 'tampon', v: 0.6},
  // causes
  ...pops([93.2, 93.8, 94.4], 'cadenas', 0.45),
  {at: 95.0, s: 'sfx/thud', v: 0.55},
  {at: 99.9, s: 'soft-whoosh', v: 0.45},
  {at: 103.4, s: 'sfx/swish', v: 0.55},
  {at: 105.2, s: 'bass-hit', v: 0.55},
  ...[108.5, 110.2, 111.4].flatMap((at) => [{at, s: 'soft-whoosh', v: 0.42}, {at: at + 0.3, s: 'tick', v: 0.5}]),
  {at: 114.5, s: 'notification', v: 0.45},
  {at: 122.5, s: 'sfx/pop', v: 0.5},
  ...pops([124.6, 125.5, 126.4], 'tick', 0.5),
  {at: 129.9, s: 'validation', v: 0.5},
  {at: 134.7, s: 'page', v: 0.45},
  {at: 139.1, s: 'alarme', v: 0.3, dur: 2.4},
  {at: 146.8, s: 'tampon', v: 0.75},
  {at: 146.82, s: 'deep-hit', v: 0.55},
  // pros
  {at: 157.8, s: 'soft-whoosh', v: 0.45},
  {at: 158.9, s: 'soft-whoosh', v: 0.45},
  {at: 161.7, s: 'bass-hit', v: 0.5},
  ...pops([166.9, 168.3, 170.0], 'validation', 0.5),
  {at: 172.0, s: 'cadenas', v: 0.5},
  {at: 174.4, s: 'tampon', v: 0.65},
  {at: 176.0, s: 'soft-whoosh', v: 0.42},
  {at: 180.4, s: 'sfx/swish', v: 0.55},
  {at: 181.3, s: 'tampon', v: 0.75},
  {at: 189.0, s: 'notification', v: 0.42},
  ...[194.6, 196.6, 198.7].flatMap((at) => [{at, s: 'soft-whoosh', v: 0.42}, {at: at + 0.3, s: 'validation', v: 0.5}]),
  {at: 202.6, s: 'tampon', v: 0.65},
  // culture
  ...pops([211.4, 213.0, 216.6], 'sfx/thud', 0.5),
  {at: 222.3, s: 'notification', v: 0.42},
  ...pops([226.7, 227.8, 232.1], 'sfx/pop', 0.5),
  {at: 228.5, s: 'soft-whoosh', v: 0.42},
  {at: 234.3, s: 'validation', v: 0.5},
  ...pops([242.3, 243.1, 243.9], 'tick', 0.5),
  {at: 247.6, s: 'deep-hit', v: 0.45},
  ...pops([249.0, 250.5, 251.6], 'sfx/pop', 0.5),
  {at: 254.1, s: 'riser', v: 0.35, dur: 1.8},
  {at: 258.6, s: 'soft-whoosh', v: 0.42},
  {at: 262.9, s: 'tension', v: 0.32, dur: 3},
  {at: 273.7, s: 'deep-hit', v: 0.7},
  {at: 273.72, s: 'bass-hit', v: 0.6},
  ...pops([274.7, 276.2, 277.7], 'tick', 0.55),
  {at: 281.8, s: 'sfx/click', v: 0.6},
  {at: 283.4, s: 'bass-hit', v: 0.5},
  ...pops([286.2, 287.1], 'sfx/pop', 0.5),
  {at: 296.4, s: 'tampon', v: 0.7},
  // choix
  ...pops([300.9, 301.6, 302.4], 'sfx/pop', 0.48),
  {at: 304.0, s: 'sfx/whoosh', v: 0.45},
  {at: 305.0, s: 'deep-hit', v: 0.55},
  ...[316.5, 318.2, 319.8].flatMap((at) => [{at, s: 'soft-whoosh', v: 0.42}, {at: at + 0.3, s: 'tick', v: 0.5}]),
  ...pops([324.6, 325.5, 327.0], 'sfx/pop', 0.45),
  {at: 328.6, s: 'notification', v: 0.45},
  {at: 335.6, s: 'sfx/pop', v: 0.5},
  {at: 337.1, s: 'validation', v: 0.55},
  {at: 342.4, s: 'tampon', v: 0.7},
  {at: OUTRO_AT - 0.4, s: 'soft-whoosh', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const WIPES = CHAPTERS.flatMap(([a, b]) => [a, b]);

export const Hauteur: React.FC = () => (
  <AbsoluteFill>
    <Camera shakes={[16.5, 31.72, 80.3, 146.8, 181.3, 273.7]}>
      <Background />
      <Gate from={0} to={38.64}><Intro /></Gate>
      <Gate from={42.26} to={83.6}><Danger /></Gate>
      <Gate from={88.02} to={147.74}><Causes /></Gate>
      <Gate from={151.1} to={204.43}><Pros /></Gate>
      <Gate from={208.23} to={297.77}><Culture /></Gate>
      <Gate from={300.71} to={OUTRO_AT}><Choix end={OUTRO_AT} /></Gate>
      {CHAPTERS.map(([a, b, n, title, sub, icons]) => (
        <Gate key={n} from={a} to={b}><Chapter at={a} until={b} n={n} title={title} sub={sub} icons={icons} total={5} /></Gate>
      ))}
      <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    </Camera>
    <Header hideAt={OUTRO_AT} logo={LOGO} />
    <Footer hideAt={OUTRO_AT} />
    {WIPES.map((at) => <Wipe key={at} at={at} />)}
    <Wipe at={OUTRO_AT} />
    <Flash at={16.5} />
    <Flash at={273.7} />
    <Captions captions={captions} />
    <Audio src={staticFile('voix-off-hauteur.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
