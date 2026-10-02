import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Gate} from '../anim';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {Camera, Cue, SfxTrack, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {Outro} from '../scenes/Outro';
import {s} from '../theme';
import {captions} from './captions';
import {Definition, Distinction, Intro, Menu, Pourquoi, Promesse} from './Scenes1';
import {Atouts, Conclusion, Dix, Methode, Regles, Visible, Vivante} from './Scenes2';
import {Chapter} from './ui';

const LOGO = 'promo/logo.png';
const OUTRO_AT = 305.3;
export const CHARTE_FRAMES = s(311.0);

/** Cartons de chapitre : [début, fin, n°, titre, sous-titre, icônes]. */
const CHAPTERS: [number, number, number, string, string, string[]][] = [
  [36.5, 42.5, 1, 'Définir la charte', 'Fondation des standards', ['loupe', 'memo', 'balance']],
  [92.6, 96.5, 2, 'Pourquoi stratégique', 'Valeur organisationnelle', ['engrenage', 'boussole', 'graphique']],
  [138.4, 144.3, 3, 'Les atouts majeurs', 'Impacts de la charte', ['trophee', 'poignee', 'fusee']],
  [194.2, 201.0, 4, 'Méthodologie', 'Construire le cadre', ['equerre', 'equipe', 'clipboard']],
  [237.3, 243.6, 5, 'Critères de réussite', 'Impact durable', ['cible', 'check', 'pousse']],
];

const WIPES = [20.7, ...CHAPTERS.flatMap(([a, b]) => [a, b]), 116.9, 172.0, 228.8, 264.5, 286.5];

const CUES: Cue[] = [
  ...WIPES.map((at) => ({at: at - 0.35, sfx: 'whoosh', volume: 0.4})),
  ...CHAPTERS.map(([a]) => ({at: a + 0.1, sfx: 'thud', volume: 0.4})),
  ...CHAPTERS.flatMap(([a]) => [0, 1, 2].map((i) => ({at: a + 0.6 + i * 0.18, sfx: 'pop', volume: 0.22}))),
  {at: 0.3, sfx: 'swish', volume: 0.3},
  {at: 0.8, sfx: 'pop', volume: 0.3},
  {at: 3.3, sfx: 'whoosh', volume: 0.3},
  {at: 9.6, sfx: 'thud', volume: 0.45},
  {at: 10.2, sfx: 'ding', volume: 0.3},
  {at: 19.75, sfx: 'rise', volume: 0.3},
  ...[22.6, 26.8, 28.6, 32.6, 35.0].map((at) => ({at, sfx: 'swish', volume: 0.3})),
  {at: 46.6, sfx: 'swish', volume: 0.35},
  {at: 50.5, sfx: 'thud', volume: 0.5},
  {at: 54.6, sfx: 'ding', volume: 0.3},
  {at: 57.6, sfx: 'swish', volume: 0.3},
  {at: 60.6, sfx: 'whoosh', volume: 0.3},
  {at: 62.8, sfx: 'whoosh', volume: 0.3},
  {at: 64.85, sfx: 'bell', volume: 0.25},
  {at: 68.7, sfx: 'bell', volume: 0.3},
  {at: 72.2, sfx: 'ding', volume: 0.3},
  ...[79.5, 81.3, 84.1].map((at) => ({at: at + 0.5, sfx: 'click', volume: 0.4})),
  {at: 86.6, sfx: 'thud', volume: 0.45},
  {at: 88.4, sfx: 'ding', volume: 0.3},
  {at: 100.9, sfx: 'swish', volume: 0.3},
  {at: 106.2, sfx: 'rise', volume: 0.3},
  {at: 111.3, sfx: 'click', volume: 0.35},
  {at: 118.9, sfx: 'swish', volume: 0.35},
  {at: 119.6, sfx: 'ding', volume: 0.3},
  {at: 127.8, sfx: 'thud', volume: 0.45},
  {at: 132.4, sfx: 'rise', volume: 0.3},
  {at: 151.7, sfx: 'pop', volume: 0.3},
  {at: 153.1, sfx: 'pop', volume: 0.3},
  {at: 155.6, sfx: 'pop', volume: 0.3},
  {at: 162.4, sfx: 'swish', volume: 0.3},
  {at: 164.6, sfx: 'ding', volume: 0.35},
  {at: 177.0, sfx: 'rise', volume: 0.3},
  ...[179.4, 180.0, 181.7].map((at) => ({at, sfx: 'pop', volume: 0.3})),
  {at: 183.6, sfx: 'whoosh', volume: 0.4},
  {at: 189.4, sfx: 'thud', volume: 0.35},
  ...[203.7, 211.0, 213.6, 215.9].map((at) => ({at, sfx: 'swish', volume: 0.3})),
  {at: 224.6, sfx: 'whoosh', volume: 0.3},
  {at: 225.0, sfx: 'thud', volume: 0.4},
  {at: 231.6, sfx: 'ding', volume: 0.3},
  ...[234.3, 235.0, 235.8].map((at) => ({at, sfx: 'pop', volume: 0.3})),
  {at: 251.6, sfx: 'rise', volume: 0.3},
  {at: 255.6, sfx: 'bell', volume: 0.3},
  {at: 259.2, sfx: 'swish', volume: 0.3},
  {at: 263.6, sfx: 'thud', volume: 0.4},
  ...[267.9, 268.9, 270.5, 272.6].map((at) => ({at: at + 0.4, sfx: 'ding', volume: 0.25})),
  {at: 282.0, sfx: 'click', volume: 0.35},
  {at: 284.6, sfx: 'ding', volume: 0.35},
  {at: 300.0, sfx: 'swish', volume: 0.3},
  {at: 302.5, sfx: 'thud', volume: 0.5},
  {at: OUTRO_AT - 0.35, sfx: 'whoosh', volume: 0.45},
  {at: OUTRO_AT + 0.4, sfx: 'rise', volume: 0.3},
  {at: OUTRO_AT + 1.4, sfx: 'pop', volume: 0.35},
];

export const CharteQualite: React.FC = () => {
  const frame = useCurrentFrame();
  const end = CHARTE_FRAMES / 30;
  const music = (f: number) => interpolate(f / 30, [0, 0.3, OUTRO_AT - 0.2, OUTRO_AT + 0.4, end - 1, end], [0.26, 0.07, 0.07, 0.32, 0.32, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <Camera shakes={[9.6, 50.5, 127.8, 302.5]}>
        <Background />
        <Gate from={0} to={20.7}><Intro /></Gate>
        <Gate from={20.7} to={36.5}><Menu /></Gate>
        <Gate from={42.5} to={68.6}><Definition /></Gate>
        <Gate from={68.6} to={92.6}><Distinction /></Gate>
        <Gate from={96.5} to={116.9}><Pourquoi /></Gate>
        <Gate from={116.9} to={138.4}><Promesse /></Gate>
        <Gate from={144.3} to={172.0}><Atouts /></Gate>
        <Gate from={172.0} to={194.2}><Visible /></Gate>
        <Gate from={201.0} to={228.8}><Methode /></Gate>
        <Gate from={228.8} to={237.3}><Vivante /></Gate>
        <Gate from={243.6} to={264.5}><Dix /></Gate>
        <Gate from={264.5} to={286.5}><Regles /></Gate>
        <Gate from={286.5} to={OUTRO_AT}><Conclusion /></Gate>
        {CHAPTERS.map(([a, b, n, title, sub, icons]) => (
          <Gate key={n} from={a} to={b}><Chapter at={a} until={b} n={n} title={title} sub={sub} icons={icons} /></Gate>
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
      <Audio src={staticFile('voix-off-charte.m4a')} />
      <Audio src={staticFile('musique-charte.m4a')} volume={music} />
      <SfxTrack cues={CUES} />
    </AbsoluteFill>
  );
};
