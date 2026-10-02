import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Gate} from '../anim';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {AlertVignette, Camera, Cue, Flash, SfxTrack, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {Outro} from '../scenes/Outro';
import {s} from '../theme';
import {PlaceholderCtx} from './assets';
import {captions} from './captions';
import {Accident, Cotisations, Decor, Hook, Tresorerie} from './Scenes1';
import {Balance, Chaine, Replay} from './Scenes2';

const OUTRO_AT = 58.75;
export const PREVENTION_FRAMES = s(61.6);
const WIPES = [11.1, 34.8, 50.3];

const CUES: Cue[] = [
  {at: 0.15, sfx: 'whoosh', volume: 0.3},
  {at: 0.6, sfx: 'rise', volume: 0.3},
  {at: 1.0, sfx: 'pop', volume: 0.3},
  {at: 4.3, sfx: 'ding', volume: 0.3},
  {at: 5.5, sfx: 'swish', volume: 0.3},
  {at: 5.85, sfx: 'whoosh', volume: 0.3},
  {at: 7.1, sfx: 'thud', volume: 0.3},
  {at: 7.8, sfx: 'thud', volume: 0.3},
  {at: 8.6, sfx: 'thud', volume: 0.6},
  ...WIPES.map((at) => ({at: at - 0.35, sfx: 'whoosh', volume: 0.45})),
  {at: 11.3, sfx: 'swish', volume: 0.3},
  {at: 12.3, sfx: 'thud', volume: 0.6},
  {at: 12.45, sfx: 'bell', volume: 0.3},
  {at: 15.1, sfx: 'pop', volume: 0.35},
  {at: 17.0, sfx: 'bell', volume: 0.25},
  {at: 17.15, sfx: 'pop', volume: 0.3},
  {at: 17.75, sfx: 'pop', volume: 0.3},
  ...[18.6, 18.9, 19.2, 19.5, 19.8, 20.1].map((at) => ({at, sfx: 'click', volume: 0.25})),
  {at: 19.4, sfx: 'thud', volume: 0.45},
  {at: 22.5, sfx: 'whoosh', volume: 0.3},
  {at: 23.9, sfx: 'pop', volume: 0.3},
  {at: 25.1, sfx: 'swish', volume: 0.3},
  ...[25.9, 26.3, 26.7, 27.1].map((at) => ({at, sfx: 'click', volume: 0.25})),
  {at: 26.3, sfx: 'thud', volume: 0.45},
  {at: 28.0, sfx: 'rise', volume: 0.25},
  {at: 32.3, sfx: 'rise', volume: 0.35},
  {at: 33.3, sfx: 'thud', volume: 0.5},
  {at: 32.8, sfx: 'pop', volume: 0.3},
  ...[0, 1, 2, 3, 4].map((i) => ({at: 35.35 + i * 0.28, sfx: 'thud', volume: 0.22})),
  {at: 37.3, sfx: 'pop', volume: 0.35},
  {at: 39.75, sfx: 'whoosh', volume: 0.35},
  {at: 40.05, sfx: 'thud', volume: 0.5},
  {at: 40.2, sfx: 'ding', volume: 0.35},
  {at: 41.1, sfx: 'pop', volume: 0.3},
  {at: 43.9, sfx: 'ding', volume: 0.4},
  {at: 44.6, sfx: 'swish', volume: 0.3},
  {at: 45.8, sfx: 'thud', volume: 0.5},
  ...[0, 1, 2, 3, 4].map((i) => ({at: 47.55 + i * 0.35, sfx: 'ding', volume: 0.18})),
  {at: 51.5, sfx: 'thud', volume: 0.4},
  {at: 54.0, sfx: 'thud', volume: 0.5},
  {at: 55.6, sfx: 'pop', volume: 0.35},
  {at: 55.75, sfx: 'ding', volume: 0.35},
  {at: 56.9, sfx: 'swish', volume: 0.3},
  {at: 57.6, sfx: 'whoosh', volume: 0.3},
  {at: OUTRO_AT - 0.35, sfx: 'whoosh', volume: 0.45},
  {at: OUTRO_AT + 0.4, sfx: 'rise', volume: 0.3},
  {at: OUTRO_AT + 1.4, sfx: 'pop', volume: 0.35},
];

export const Prevention: React.FC<{placeholders?: boolean}> = ({placeholders = false}) => {
  const frame = useCurrentFrame();
  const fadeAudio = interpolate(frame, [PREVENTION_FRAMES - s(0.8), PREVENTION_FRAMES], [1, 0], {extrapolateLeft: 'clamp'});
  return (
    <PlaceholderCtx.Provider value={placeholders}>
      <AbsoluteFill>
        <Camera shakes={[8.6, 12.3, 19.4, 26.3, 33.3, 40.05, 45.8, 54.0]}>
          <Background />
          <Decor from={11.1} to={15.05} tint={0} />
          <Decor from={50.3} to={58.8} />
          <Gate from={0} to={11.1}><Hook /></Gate>
          <Gate from={11.1} to={15.05}><Accident /></Gate>
          <Gate from={15.0} to={27.95}><Tresorerie /></Gate>
          <Gate from={27.9} to={34.85}><Cotisations /></Gate>
          <Gate from={34.8} to={42.95}><Balance /></Gate>
          <Gate from={42.9} to={50.3}><Chaine /></Gate>
          <Gate from={50.3} to={OUTRO_AT}><Replay /></Gate>
          <Gate from={OUTRO_AT} to={99}><Outro at={OUTRO_AT} /></Gate>
          <AlertVignette from={12.3} to={15.0} />
          <AlertVignette from={18.6} to={20.8} />
          <AlertVignette from={32.3} to={34.6} />
        </Camera>
        <Flash at={12.3} />
        <Flash at={8.6} />
        <Header hideAt={OUTRO_AT} />
        <Footer hideAt={OUTRO_AT} />
        {WIPES.map((at) => (
          <Wipe key={at} at={at} />
        ))}
        <Wipe at={OUTRO_AT} />
        <Captions captions={captions} />
        <Audio src={staticFile('voix-off-prevention.m4a')} volume={fadeAudio} />
        <SfxTrack cues={CUES} />
      </AbsoluteFill>
    </PlaceholderCtx.Provider>
  );
};
