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
import {Contenu, Definition, Intro, Objectifs} from './Scenes1';
import {Exemple, Final, Idees, Impact} from './Scenes2';

const LOGO = 'promo/logo.png';
const OUTRO_AT = 280.0;
export const INDUCTION_FRAMES = s(283.2);

/** Cartons de chapitre : [début, fin, n°, titre, sous-titre, icônes]. */
const CHAPTERS: [number, number, number, string, string, string[]][] = [
  [30.3, 36.9, 1, "L'étape essentielle", 'Définition', ['porte', 'clipboard', 'bouclier']],
  [75.7, 82.9, 2, 'Cinq objectifs clés', "De l'info à l'action", ['cible', 'livres', 'main-levee']],
  [109.0, 115.6, 3, 'Au cœur de la formation', 'Le contenu', ['casque', 'extincteur', 'feuille']],
  [193.6, 198.4, 4, "Plus qu'une règle", 'Le véritable impact', ['temple', 'graphique', 'trophee']],
];

const WIPES = [...CHAPTERS.flatMap(([a, b]) => [a, b]), 163.1, 240.8, 257.8];

const CUES: Cue[] = [
  ...WIPES.map((at) => ({at: at - 0.35, sfx: 'whoosh', volume: 0.4})),
  ...CHAPTERS.map(([a]) => ({at: a + 0.1, sfx: 'thud', volume: 0.4})),
  ...CHAPTERS.flatMap(([a]) => [0, 1, 2].map((i) => ({at: a + 0.6 + i * 0.18, sfx: 'pop', volume: 0.22}))),
  {at: 0.2, sfx: 'whoosh', volume: 0.3},
  ...[1.1, 1.8, 2.5].map((at) => ({at, sfx: 'pop', volume: 0.28})),
  {at: 7.3, sfx: 'ding', volume: 0.3},
  {at: 10.9, sfx: 'whoosh', volume: 0.3},
  {at: 12.6, sfx: 'swish', volume: 0.3},
  {at: 21.3, sfx: 'thud', volume: 0.5},
  {at: 23.0, sfx: 'bell', volume: 0.3},
  {at: 25.75, sfx: 'pop', volume: 0.3},
  {at: 41.15, sfx: 'whoosh', volume: 0.3},
  {at: 45.2, sfx: 'pop', volume: 0.3},
  {at: 46.7, sfx: 'pop', volume: 0.3},
  {at: 49.4, sfx: 'rise', volume: 0.3},
  ...[51.8, 53.4, 56.0].map((at) => ({at, sfx: 'pop', volume: 0.3})),
  ...[63.9, 66.5, 69.1, 70.1].map((at) => ({at, sfx: 'swish', volume: 0.3})),
  {at: 71.5, sfx: 'ding', volume: 0.3},
  {at: 72.55, sfx: 'whoosh', volume: 0.3},
  {at: 83.0, sfx: 'thud', volume: 0.45},
  ...[91.6, 94.0, 97.2, 98.3, 103.7].map((at) => ({at, sfx: 'swish', volume: 0.3})),
  {at: 105.25, sfx: 'whoosh', volume: 0.3},
  ...[118.5, 124.3, 126.4].map((at) => ({at, sfx: 'swish', volume: 0.3})),
  {at: 128.75, sfx: 'whoosh', volume: 0.3},
  ...[135.4, 140.1, 141.6, 143.8].map((at) => ({at, sfx: 'pop', volume: 0.3})),
  {at: 140.3, sfx: 'bell', volume: 0.25},
  {at: 149.1, sfx: 'thud', volume: 0.4},
  {at: 154.2, sfx: 'pop', volume: 0.3},
  {at: 156.9, sfx: 'pop', volume: 0.3},
  {at: 159.9, sfx: 'rise', volume: 0.3},
  {at: 167.35, sfx: 'whoosh', volume: 0.3},
  {at: 171.8, sfx: 'swish', volume: 0.35},
  {at: 175.4, sfx: 'bell', volume: 0.3},
  ...[184.1, 186.5, 188.6].map((at) => ({at, sfx: 'swish', volume: 0.3})),
  {at: 189.0, sfx: 'thud', volume: 0.5},
  {at: 190.3, sfx: 'ding', volume: 0.35},
  {at: 201.3, sfx: 'swish', volume: 0.35},
  {at: 202.45, sfx: 'thud', volume: 0.4},
  ...[210.2, 213.9, 220.3].map((at) => ({at, sfx: 'whoosh', volume: 0.3})),
  {at: 231.7, sfx: 'thud', volume: 0.4},
  {at: 234.8, sfx: 'thud', volume: 0.4},
  {at: 237.9, sfx: 'ding', volume: 0.3},
  ...[244.4, 249.9].map((at) => ({at, sfx: 'swish', volume: 0.3})),
  ...[247.1, 251.4].map((at) => ({at, sfx: 'ding', volume: 0.3})),
  {at: 258.0, sfx: 'whoosh', volume: 0.3},
  ...[270.2, 271.4, 272.0].map((at) => ({at, sfx: 'pop', volume: 0.3})),
  {at: 273.95, sfx: 'rise', volume: 0.3},
  {at: OUTRO_AT - 0.35, sfx: 'whoosh', volume: 0.45},
  {at: OUTRO_AT + 0.4, sfx: 'rise', volume: 0.3},
  {at: OUTRO_AT + 1.4, sfx: 'pop', volume: 0.35},
];

export const InductionHSE: React.FC = () => {
  const end = INDUCTION_FRAMES / 30;
  const music = (f: number) => interpolate(f / 30, [0, 0.3, OUTRO_AT - 0.2, OUTRO_AT + 0.4, end - 1, end], [0.26, 0.07, 0.07, 0.32, 0.32, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <Camera shakes={[21.3, 83.0, 189.0]}>
        <Background />
        <Gate from={0} to={30.3}><Intro /></Gate>
        <Gate from={36.9} to={75.7}><Definition /></Gate>
        <Gate from={82.9} to={109.0}><Objectifs /></Gate>
        <Gate from={115.6} to={163.1}><Contenu /></Gate>
        <Gate from={163.1} to={193.6}><Exemple /></Gate>
        <Gate from={198.4} to={240.8}><Impact /></Gate>
        <Gate from={240.8} to={257.8}><Idees /></Gate>
        <Gate from={257.8} to={OUTRO_AT}><Final /></Gate>
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
      <Audio src={staticFile('voix-off-induction.m4a')} />
      <Audio src={staticFile('musique-charte.m4a')} volume={music} />
      <SfxTrack cues={CUES} />
    </AbsoluteFill>
  );
};
