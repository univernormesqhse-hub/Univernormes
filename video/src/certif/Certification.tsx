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
import {Accreditation, Certification, Intro} from './Scenes1';
import {Agrement, Astuce, Hierarchie} from './Scenes2';

const LOGO = 'promo/logo.png';
const OUTRO_AT = 279.0;
export const CERTIF_FRAMES = s(282.4);

/** Cartons de chapitre : [début, fin, n°, titre, sous-titre, icônes]. */
const CHAPTERS: [number, number, number, string, string, string[]][] = [
  [45.22, 50.46, 1, 'La certification', 'La preuve de conformité', ['check', 'usine', 'diplome']],
  [85.54, 90.34, 2, "L'accréditation", 'Le contrôle des contrôleurs', ['loupe2', 'microscope', 'temple']],
  [129.58, 134.0, 3, 'Hiérarchie de confiance', 'Visualiser le système', ['couronne', 'trinome', 'balance']],
  [207.42, 211.08, 4, "L'agrément", 'Une autre autorité', ['temple', 'parchemin', 'carte-id']],
  [247.26, 251.64, 5, 'Astuce mémoire', 'Pour ne plus se tromper', ['ampoule', 'poignee', 'arbitre']],
];

const pops = (ats: number[], s0 = 'sfx/pop', v = 0.5): Sfx[] => ats.map((at) => ({at, s: s0, v}));

/**
 * Sound design (sans musique ni son de fond, à la demande du client) : uniquement des bruitages,
 * bien audibles et calés sur les actions visibles.
 */
const CUES: Sfx[] = [
  // intro
  {at: 0.6, s: 'bass-hit', v: 0.55},
  {at: 0.96, s: 'soft-whoosh', v: 0.5},
  {at: 1.4, s: 'soft-whoosh', v: 0.5},
  {at: 2.4, s: 'sfx/pop', v: 0.5},
  {at: 6.9, s: 'alarme', v: 0.25, dur: 1.4},
  {at: 9.6, s: 'sfx/pop', v: 0.45},
  {at: 14.9, s: 'tampon', v: 0.65},
  {at: 17.8, s: 'tampon', v: 0.65},
  {at: 19.7, s: 'sfx/pop', v: 0.45},
  {at: 21.8, s: 'deep-hit', v: 0.6},
  {at: 23.5, s: 'notification', v: 0.42},
  ...pops([27.9, 28.25, 28.6], 'sfx/thud', 0.5),
  ...[34.9, 36.1, 37.8, 40.7, 42.2].flatMap((at) => [{at, s: 'soft-whoosh', v: 0.45}, {at: at + 0.3, s: 'tick', v: 0.5}]),
  // chapitres
  ...CHAPTERS.flatMap(([a]) => [{at: a - 0.45, s: 'soft-whoosh', v: 0.5}, {at: a + 0.05, s: 'deep-hit', v: 0.5}]),
  // certification
  {at: 55.3, s: 'soft-whoosh', v: 0.45},
  {at: 57.6, s: 'sfx/swish', v: 0.4},
  ...pops([58.5, 59.5, 60.4], 'sfx/pop', 0.5),
  {at: 62.8, s: 'page', v: 0.5},
  {at: 64.5, s: 'tampon', v: 0.7},
  {at: 66.6, s: 'validation', v: 0.5},
  {at: 69.2, s: 'soft-whoosh', v: 0.45},
  {at: 70.6, s: 'tampon', v: 0.6},
  {at: 75.05, s: 'soft-whoosh', v: 0.45},
  {at: 76.6, s: 'tampon', v: 0.6},
  {at: 79.85, s: 'soft-whoosh', v: 0.45},
  {at: 84.1, s: 'sfx/ding', v: 0.45},
  // accréditation
  {at: 95.1, s: 'sfx/thud', v: 0.5},
  {at: 96.3, s: 'sfx/pop', v: 0.5},
  {at: 97.2, s: 'tick', v: 0.5},
  {at: 99.6, s: 'bass-hit', v: 0.55},
  {at: 100.2, s: 'tick', v: 0.5},
  {at: 106.8, s: 'validation', v: 0.5},
  {at: 114.0, s: 'sfx/pop', v: 0.5},
  {at: 119.2, s: 'bass-hit', v: 0.55},
  {at: 121.1, s: 'soft-whoosh', v: 0.45},
  {at: 124.0, s: 'sfx/pop', v: 0.45},
  {at: 125.8, s: 'sfx/swish', v: 0.55},
  {at: 126.3, s: 'notification', v: 0.45},
  {at: 127.9, s: 'sfx/pop', v: 0.45},
  // hiérarchie
  ...pops([134.3, 134.65, 135.0], 'sfx/thud', 0.5),
  {at: 135.6, s: 'sfx/ding', v: 0.45},
  {at: 138.6, s: 'sfx/pop', v: 0.45},
  {at: 144.2, s: 'soft-whoosh', v: 0.45},
  ...pops([147.9, 152.3, 155.3, 159.5, 163.7, 166.1], 'tick', 0.55),
  {at: 168.2, s: 'deep-hit', v: 0.5},
  {at: 173.6, s: 'bass-hit', v: 0.5},
  {at: 176.2, s: 'sfx/whoosh', v: 0.45},
  {at: 177.6, s: 'sfx/thud', v: 0.5},
  {at: 181.2, s: 'sfx/whoosh', v: 0.45},
  {at: 184.8, s: 'sfx/thud', v: 0.5},
  {at: 187.1, s: 'validation', v: 0.5},
  {at: 192.6, s: 'sfx/pop', v: 0.5},
  ...pops([197.6, 198.8, 199.8], 'sfx/pop', 0.5),
  {at: 201.6, s: 'notification', v: 0.42},
  // agrément
  {at: 213.4, s: 'soft-whoosh', v: 0.42},
  {at: 217.4, s: 'sfx/swish', v: 0.45},
  {at: 218.2, s: 'bass-hit', v: 0.55},
  {at: 219.0, s: 'sfx/pop', v: 0.45},
  {at: 221.6, s: 'page', v: 0.45},
  {at: 222.4, s: 'sfx/click', v: 0.55},
  {at: 225.0, s: 'sfx/click', v: 0.55},
  {at: 225.1, s: 'validation', v: 0.55},
  {at: 228.5, s: 'stylo', v: 0.45, dur: 1.4},
  ...[230.7, 234.6, 239.8].flatMap((at) => [{at, s: 'sfx/pop', v: 0.55}, {at: at + 0.15, s: 'bass-hit', v: 0.4}]),
  {at: 245.5, s: 'sfx/ding', v: 0.42},
  // astuce
  {at: 252.0, s: 'sfx/pop', v: 0.5},
  {at: 258.0, s: 'deep-hit', v: 0.55},
  {at: 260.6, s: 'validation', v: 0.5},
  {at: 263.8, s: 'deep-hit', v: 0.55},
  {at: 266.6, s: 'validation', v: 0.5},
  ...pops([270.0, 270.5, 271.0], 'sfx/thud', 0.5),
  {at: 276.6, s: 'tampon', v: 0.7},
  {at: OUTRO_AT - 0.4, s: 'soft-whoosh', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const WIPES = [...CHAPTERS.flatMap(([a, b]) => [a, b])];

export const Certification2: React.FC = () => (
  <AbsoluteFill>
    <Camera shakes={[21.8, 64.5, 168.2, 276.6]}>
      <Background />
      <Gate from={0} to={45.22}><Intro /></Gate>
      <Gate from={50.46} to={85.54}><Certification /></Gate>
      <Gate from={90.34} to={129.58}><Accreditation /></Gate>
      <Gate from={134.0} to={207.42}><Hierarchie /></Gate>
      <Gate from={211.08} to={247.26}><Agrement /></Gate>
      <Gate from={251.64} to={OUTRO_AT}><Astuce end={OUTRO_AT} /></Gate>
      {CHAPTERS.map(([a, b, n, title, sub, icons]) => (
        <Gate key={n} from={a} to={b}><Chapter at={a} until={b} n={n} title={title} sub={sub} icons={icons} total={5} /></Gate>
      ))}
      <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    </Camera>
    <Header hideAt={OUTRO_AT} logo={LOGO} />
    <Footer hideAt={OUTRO_AT} />
    {WIPES.map((at) => <Wipe key={at} at={at} />)}
    <Wipe at={OUTRO_AT} />
    <Flash at={21.8} />
    <Captions captions={captions} />
    <Audio src={staticFile('voix-off-certification.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
