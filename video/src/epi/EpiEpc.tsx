import {AbsoluteFill, Audio, interpolate, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Chapter} from '../charte/ui';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {Camera, Cue, SfxTrack, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {Outro} from '../scenes/Outro';
import {s} from '../theme';
import {captions} from './captions';
import {EpcScene, EpiScene, Intro} from './Scenes1';
import {Cible, Plans, Reflexion, RegleOr, Tableau} from './Scenes2';

const LOGO = 'promo/logo.png';
const OUTRO_AT = 265.4;
export const EPI_FRAMES = s(268.6);

/** Cartons de chapitre : [début, fin, n°, titre, sous-titre, icônes]. */
const CHAPTERS: [number, number, number, string, string, string[]][] = [
  [33.6, 39.6, 1, "L'EPI", 'Protection individuelle', ['casque', 'gants', 'lunettes']],
  [85.0, 93.4, 2, "L'EPC", 'Protection collective', ['barriere', 'equipe', 'usine']],
  [141.3, 150.6, 3, 'EPI vs EPC', 'Le face-à-face', ['homme-bureau', 'balance', 'equipe']],
  [195.4, 201.3, 4, "La règle d'or", 'Le principe fondamental', ['trophee', 'juge', 'bouclier']],
];

const WIPES = [...CHAPTERS.flatMap(([a, b]) => [a, b]), 168.9, 226.8, 242.5];

const CUES: Cue[] = [
  ...WIPES.map((at) => ({at: at - 0.35, sfx: 'whoosh', volume: 0.4})),
  ...CHAPTERS.map(([a]) => ({at: a + 0.1, sfx: 'thud', volume: 0.4})),
  ...CHAPTERS.flatMap(([a]) => [0, 1, 2].map((i) => ({at: a + 0.6 + i * 0.18, sfx: 'pop', volume: 0.22}))),
  {at: 0.2, sfx: 'whoosh', volume: 0.3},
  {at: 4.6, sfx: 'pop', volume: 0.3},
  {at: 5.4, sfx: 'pop', volume: 0.3},
  {at: 9.35, sfx: 'swish', volume: 0.35},
  {at: 9.6, sfx: 'thud', volume: 0.45},
  {at: 20.0, sfx: 'pop', volume: 0.3},
  {at: 24.85, sfx: 'swish', volume: 0.3},
  {at: 26.85, sfx: 'whoosh', volume: 0.3},
  {at: 31.25, sfx: 'pop', volume: 0.3},
  {at: 45.65, sfx: 'whoosh', volume: 0.3},
  {at: 47.0, sfx: 'pop', volume: 0.3},
  {at: 47.6, sfx: 'pop', volume: 0.3},
  {at: 54.9, sfx: 'thud', volume: 0.45},
  ...[60.9, 64.6, 66.1, 67.0, 68.1, 69.5, 70.4].map((at) => ({at, sfx: 'click', volume: 0.35})),
  {at: 72.6, sfx: 'ding', volume: 0.3},
  {at: 79.8, sfx: 'rise', volume: 0.3},
  {at: 81.4, sfx: 'click', volume: 0.3},
  {at: 94.4, sfx: 'swish', volume: 0.35},
  {at: 101.6, sfx: 'rise', volume: 0.3},
  {at: 106.8, sfx: 'thud', volume: 0.45},
  {at: 112.0, sfx: 'ding', volume: 0.3},
  {at: 117.3, sfx: 'whoosh', volume: 0.3},
  {at: 120.6, sfx: 'swish', volume: 0.3},
  {at: 125.25, sfx: 'whoosh', volume: 0.3},
  {at: 133.4, sfx: 'swish', volume: 0.3},
  {at: 136.1, sfx: 'swish', volume: 0.3},
  {at: 139.9, sfx: 'ding', volume: 0.3},
  {at: 155.55, sfx: 'whoosh', volume: 0.3},
  {at: 158.2, sfx: 'rise', volume: 0.25},
  {at: 159.55, sfx: 'whoosh', volume: 0.3},
  {at: 162.8, sfx: 'swish', volume: 0.35},
  {at: 165.5, sfx: 'thud', volume: 0.4},
  ...[170.2, 173.8, 180.4, 185.1, 192.5].map((at) => ({at, sfx: 'swish', volume: 0.3})),
  ...[170.2, 173.8, 180.4, 185.1, 192.5].map((at) => ({at: at + 0.9, sfx: 'ding', volume: 0.22})),
  {at: 205.4, sfx: 'pop', volume: 0.3},
  {at: 211.0, sfx: 'ding', volume: 0.35},
  {at: 214.4, sfx: 'thud', volume: 0.4},
  {at: 218.3, sfx: 'whoosh', volume: 0.3},
  {at: 222.7, sfx: 'thud', volume: 0.55},
  ...[230.6, 231.2, 232.6].map((at) => ({at, sfx: 'swish', volume: 0.3})),
  {at: 233.4, sfx: 'thud', volume: 0.4},
  {at: 234.0, sfx: 'thud', volume: 0.35},
  {at: 239.6, sfx: 'thud', volume: 0.35},
  {at: 249.6, sfx: 'pop', volume: 0.3},
  {at: 255.4, sfx: 'pop', volume: 0.3},
  {at: 261.25, sfx: 'whoosh', volume: 0.3},
  {at: 262.6, sfx: 'ding', volume: 0.35},
  {at: OUTRO_AT - 0.35, sfx: 'whoosh', volume: 0.45},
  {at: OUTRO_AT + 0.4, sfx: 'rise', volume: 0.3},
  {at: OUTRO_AT + 1.4, sfx: 'pop', volume: 0.35},
];

export const EpiEpc: React.FC = () => {
  const end = EPI_FRAMES / 30;
  const music = (f: number) => interpolate(f / 30, [0, 0.3, OUTRO_AT - 0.2, OUTRO_AT + 0.4, end - 1, end], [0.26, 0.07, 0.07, 0.32, 0.32, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <Camera shakes={[9.6, 54.9, 106.8, 222.7]}>
        <Background />
        <Gate from={0} to={33.6}><Intro /></Gate>
        <Gate from={39.6} to={85.0}><EpiScene /></Gate>
        <Gate from={93.4} to={141.3}><EpcScene /></Gate>
        <Gate from={150.6} to={168.9}><Cible /></Gate>
        <Gate from={168.9} to={195.4}><Tableau /></Gate>
        <Gate from={201.3} to={226.8}><RegleOr /></Gate>
        <Gate from={226.8} to={242.5}><Plans /></Gate>
        <Gate from={242.5} to={OUTRO_AT}><Reflexion /></Gate>
        {CHAPTERS.map(([a, b, n, title, sub, icons]) => (
          <Gate key={n} from={a} to={b}><Chapter at={a} until={b} n={n} title={title} sub={sub} icons={icons} total={4} /></Gate>
        ))}
        <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
      </Camera>
      <Header hideAt={OUTRO_AT} logo={LOGO} />
      <Footer hideAt={OUTRO_AT} />
      {WIPES.map((at) => (
        <Wipe key={at} at={at} />
      ))}
      <Wipe at={OUTRO_AT} />
      <Captions captions={captions} />
      <Audio src={staticFile('voix-off-epi-epc.m4a')} />
      <Audio src={staticFile('musique-charte.m4a')} volume={music} />
      <SfxTrack cues={CUES} />
    </AbsoluteFill>
  );
};
