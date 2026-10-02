import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Gate} from './anim';
import {Background} from './components/Background';
import {Captions} from './components/Captions';
import {Footer} from './components/Footer';
import {AlertVignette, Camera, Cue, Drain, Flash, SfxTrack, Wipe} from './components/Fx';
import {Header} from './components/Header';
import {Action, RULE_TIMES} from './scenes/Action';
import {Bouclier, SHIELD_AT} from './scenes/Bouclier';
import {Hook} from './scenes/Hook';
import {BOOK_TIMES, Manuels, TOPPLE_AT} from './scenes/Manuels';
import {OUTRO_AT, Outro} from './scenes/Outro';
import {LOCK_TIMES, Permis, STAMP_AT, UNLOCK_TIMES} from './scenes/Permis';
import {Terrain} from './scenes/Terrain';
import {BIN_TIMES, Urgence} from './scenes/Urgence';
import {VS_AT, Versus} from './scenes/Versus';
import {s} from './theme';

export const TOTAL_FRAMES = s(54.6);

// Changements d'acte couverts par la transition de marque.
const WIPES = [16.3, 30.1, 37.7, 46.7];

const SHAKES = [LOCK_TIMES[0], STAMP_AT, BIN_TIMES[0] + 0.28, VS_AT, BOOK_TIMES[2] + 0.25];

const CUES: Cue[] = [
  {at: 0.05, sfx: 'whoosh', volume: 0.3},
  {at: 0.25, sfx: 'rise', volume: 0.2},
  {at: 0.6, sfx: 'swish', volume: 0.25},
  {at: 2.1, sfx: 'pop'},
  {at: 5.3, sfx: 'pop'},
  {at: 6.0, sfx: 'whoosh', volume: 0.3},
  {at: 6.35, sfx: 'ding', volume: 0.3},
  {at: 7.85, sfx: 'swish', volume: 0.3},
  {at: 8.8, sfx: 'pop'},
  {at: 9.3, sfx: 'thud', volume: 0.25},
  {at: 10.2, sfx: 'swish', volume: 0.25},
  ...[10.4, 10.6, 10.8, 11.0].map((at) => ({at, sfx: 'pop', volume: 0.2})),
  ...[12.45, 12.55, 12.65].map((at) => ({at, sfx: 'pop', volume: 0.25})),
  {at: 12.8, sfx: 'click', volume: 0.3},
  {at: 13.2, sfx: 'click', volume: 0.3},
  {at: 13.55, sfx: 'swish', volume: 0.3},
  ...[0, 1, 2].map((i) => ({at: 14.25 + i * 0.18, sfx: 'ding', volume: 0.18})),
  ...WIPES.map((at) => ({at: at - 0.35, sfx: 'whoosh', volume: 0.45})),
  {at: 16.5, sfx: 'whoosh', volume: 0.3},
  {at: 18.35, sfx: 'swish', volume: 0.3},
  ...[19.5, 20.1, 20.8].map((at) => ({at, sfx: 'pop', volume: 0.3})),
  ...LOCK_TIMES.map((at) => ({at, sfx: 'click', volume: 0.45})),
  {at: 22.7, sfx: 'swish', volume: 0.3},
  {at: STAMP_AT, sfx: 'thud', volume: 0.6},
  ...UNLOCK_TIMES.map((at) => ({at, sfx: 'click', volume: 0.4})),
  {at: 24.6, sfx: 'ding', volume: 0.35},
  {at: 25.6, sfx: 'pop', volume: 0.3},
  {at: 25.9, sfx: 'bell', volume: 0.25},
  ...BIN_TIMES.map((at) => ({at: at + 0.28, sfx: 'thud', volume: 0.3})),
  {at: 28.5, sfx: 'pop', volume: 0.3},
  {at: 30.3, sfx: 'swish', volume: 0.3},
  {at: 30.45, sfx: 'swish', volume: 0.3},
  {at: VS_AT, sfx: 'thud', volume: 0.55},
  {at: 33.2, sfx: 'whoosh', volume: 0.3},
  ...[33.6, 35.1, 35.9].map((at) => ({at, sfx: 'swish', volume: 0.28})),
  {at: 38.85, sfx: 'whoosh', volume: 0.4},
  {at: 40.3, sfx: 'pop', volume: 0.3},
  {at: 41.0, sfx: 'bell', volume: 0.3},
  ...RULE_TIMES.map((at) => ({at, sfx: 'ding', volume: 0.2})),
  ...BOOK_TIMES.map((at) => ({at: at + 0.25, sfx: 'thud', volume: 0.3})),
  {at: 45.6, sfx: 'swish', volume: 0.35},
  {at: TOPPLE_AT, sfx: 'whoosh', volume: 0.3},
  {at: 48.45, sfx: 'rise', volume: 0.3},
  {at: SHIELD_AT, sfx: 'whoosh', volume: 0.35},
  {at: SHIELD_AT + 0.85, sfx: 'ding', volume: 0.4},
  {at: 51.35, sfx: 'whoosh', volume: 0.4},
  {at: OUTRO_AT + 0.4, sfx: 'rise', volume: 0.3},
  {at: OUTRO_AT + 1.4, sfx: 'pop', volume: 0.35},
];

export const SuperviseurHSE: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeAudio = interpolate(frame, [TOTAL_FRAMES - s(0.8), TOTAL_FRAMES], [1, 0], {extrapolateLeft: 'clamp'});
  return (
    <AbsoluteFill>
      <Camera shakes={SHAKES}>
        <Background />
        <Gate from={0} to={7.9}><Hook /></Gate>
        <Gate from={7.9} to={16.3}><Terrain /></Gate>
        <Gate from={16.3} to={25.15}><Permis /></Gate>
        <Gate from={25.1} to={30.1}><Urgence /></Gate>
        <Gate from={30.1} to={37.7}><Versus /></Gate>
        <Gate from={37.7} to={43.7}><Action /></Gate>
        <Gate from={43.7} to={46.7}><Manuels /></Gate>
        <Gate from={46.7} to={51.8}><Bouclier /></Gate>
        <Gate from={OUTRO_AT} to={99}><Outro /></Gate>
        <AlertVignette from={25.85} to={27.9} />
        <Drain from={43.75} to={46.65} />
      </Camera>
      <Flash at={STAMP_AT} />
      <Header hideAt={OUTRO_AT} />
      <Footer hideAt={OUTRO_AT} />
      {WIPES.map((at) => (
        <Wipe key={at} at={at} />
      ))}
      <Captions />
      <Audio src={staticFile('voix-off.m4a')} volume={fadeAudio} />
      <SfxTrack cues={CUES} />
    </AbsoluteFill>
  );
};
