import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Chapter} from '../charte/ui';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {Camera, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {Outro} from '../scenes/Outro';
import {s} from '../theme';
import {captions} from './captions';
import {Ambience, Sfx, SoundDesign} from './Cine';
import {Intro, Organisation, Piliers} from './Scenes1';
import {Conseil, Implicite, Indicateurs, Relation} from './Scenes2';

const LOGO = 'promo/logo.png';
const OUTRO_AT = 278.2;
export const PLAN_FRAMES = s(281.6);

/** Cartons de chapitre : [début, fin, n°, titre, sous-titre, icônes]. */
const CHAPTERS: [number, number, number, string, string, string[]][] = [
  [43.9, 47.0, 1, "L'organisation", 'Maîtriser le changement', ['engrenage', 'equipe', 'carte']],
  [82.1, 85.6, 2, 'La relation', 'Contrôle ou partenariat', ['poignee', 'balance', 'cadenas']],
  [169.8, 175.4, 3, "L'implicite", 'Rendre le non-dit visible', ['bulle', 'ampoule', 'memo']],
  [234.9, 239.7, 4, 'Le conseil final', 'Le prérequis ultime', ['cle', 'loupe', 'maison']],
];

/**
 * Sound design (sans musique de fond) : ambiance d'usine très faible et permanente,
 * bruitages réalistes sur les actions, impacts sur les révélations, silences avant les moments clés,
 * signature sonore sur le logo.
 */
const CUES: Sfx[] = [
  {at: 0.3, s: 'bass-hit', v: 0.22},
  {at: 2.5, s: 'soft-whoosh', v: 0.25},
  {at: 3.6, s: 'soft-whoosh', v: 0.25},
  {at: 7.0, s: 'stylo', v: 0.3, dur: 2},
  {at: 9.9, s: 'signature', v: 0.35},
  {at: 10.6, s: 'tampon', v: 0.4},
  {at: 10.95, s: 'page', v: 0.3},
  {at: 22.8, s: 'validation', v: 0.25},
  {at: 26.5, s: 'soft-whoosh', v: 0.22},
  {at: 34.7, s: 'page', v: 0.3},
  ...[38.4, 40.4, 42.3].map((at) => ({at, s: 'bass-hit', v: 0.16})),
  ...CHAPTERS.flatMap(([a]) => [{at: a - 0.45, s: 'soft-whoosh', v: 0.3}, {at: a + 0.05, s: 'deep-hit', v: 0.32}]),
  {at: 47.1, s: 'soft-whoosh', v: 0.2},
  {at: 51.6, s: 'tension', v: 0.14, dur: 4},
  ...[62.1, 65.9, 69.4, 71.7, 76.5].map((at) => ({at, s: 'tick', v: 0.3})),
  {at: 80.6, s: 'sfx/swish', v: 0.2},
  {at: 86.2, s: 'tension', v: 0.12, dur: 4},
  {at: 90.0, s: 'validation', v: 0.22},
  {at: 98.8, s: 'cadenas', v: 0.3},
  {at: 104.3, s: 'validation', v: 0.22},
  ...[116.5, 118.82, 122.42].map((at) => ({at, s: 'soft-whoosh', v: 0.22})),
  ...[117.6, 119.9, 123.5].map((at) => ({at, s: 'tick', v: 0.25})),
  {at: 125.5, s: 'sfx/swish', v: 0.2},
  {at: 131.4, s: 'notification', v: 0.2},
  {at: 141.4, s: 'riser', v: 0.22, dur: 2.2},
  {at: 143.55, s: 'deep-hit', v: 0.4},
  {at: 146.2, s: 'alarme', v: 0.1, dur: 2},
  {at: 152.1, s: 'soft-whoosh', v: 0.22},
  {at: 160.6, s: 'notification', v: 0.2},
  {at: 162.6, s: 'notification', v: 0.2},
  {at: 165.5, s: 'validation', v: 0.25},
  {at: 184.2, s: 'tension', v: 0.12, dur: 4},
  {at: 192.2, s: 'soft-whoosh', v: 0.22},
  {at: 194.8, s: 'alarme', v: 0.12, dur: 2},
  {at: 199.2, s: 'page', v: 0.3},
  ...[203.3, 205.8, 208.5, 210.5].map((at) => ({at, s: 'tick', v: 0.28})),
  {at: 216.7, s: 'page', v: 0.3},
  {at: 221.0, s: 'sfx/swish', v: 0.2},
  {at: 223.0, s: 'stylo', v: 0.3, dur: 2},
  {at: 229.8, s: 'tampon', v: 0.4},
  {at: 253.2, s: 'tension', v: 0.14, dur: 4},
  {at: 256.4, s: 'tick', v: 0.22},
  {at: 263.5, s: 'deep-hit', v: 0.42},
  {at: 266.3, s: 'tampon', v: 0.45},
  {at: 273.7, s: 'validation', v: 0.25},
  {at: OUTRO_AT - 0.4, s: 'soft-whoosh', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.45, dur: 3.2},
];

const WIPES = [...CHAPTERS.flatMap(([a, b]) => [a, b]), 29.5, 130.8, 216.6];

export const PlanPrevention: React.FC = () => (
  <AbsoluteFill>
    <Camera shakes={[143.55, 263.5]}>
      <Background />
      <Gate from={0} to={29.5}><Intro /></Gate>
      <Gate from={29.5} to={43.9}><Piliers /></Gate>
      <Gate from={47.0} to={82.1}><Organisation /></Gate>
      <Gate from={85.6} to={130.8}><Relation /></Gate>
      <Gate from={130.8} to={169.8}><Indicateurs /></Gate>
      <Gate from={175.4} to={234.9}><Implicite /></Gate>
      <Gate from={239.7} to={OUTRO_AT}><Conseil /></Gate>
      {CHAPTERS.map(([a, b, n, title, sub, icons]) => (
        <Gate key={n} from={a} to={b}><Chapter at={a} until={b} n={n} title={title} sub={sub} icons={icons} total={4} /></Gate>
      ))}
      <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    </Camera>
    <Header hideAt={OUTRO_AT} logo={LOGO} />
    <Footer hideAt={OUTRO_AT} />
    {WIPES.map((at) => <Wipe key={at} at={at} />)}
    <Wipe at={OUTRO_AT} />
    <Captions captions={captions} />
    <Audio src={staticFile('voix-off-plan-prevention.m4a')} />
    <Ambience total={PLAN_FRAMES / 30} silences={[[143.1, 144.6], [262.9, 264.4]]} level={0.045} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
