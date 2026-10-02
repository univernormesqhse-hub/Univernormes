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
import {Evolution, Hook, Levier, Maison, Plan, Structure} from './Scenes';

const OUTRO_AT = 62.75;
export const ISO_FRAMES = s(65.6);
const WIPES = [9.0, 32.8, 43.3];

const CUES: Cue[] = [
  {at: 0.2, sfx: 'whoosh', volume: 0.3},
  {at: 0.3, sfx: 'pop', volume: 0.3},
  ...[1.3, 1.5, 1.7, 1.9, 2.1, 2.3].map((at) => ({at, sfx: 'click', volume: 0.2})),
  {at: 2.5, sfx: 'ding', volume: 0.35},
  ...[3.3, 3.55, 3.8, 4.0].map((at) => ({at, sfx: 'pop', volume: 0.25})),
  {at: 4.75, sfx: 'swish', volume: 0.3},
  {at: 5.6, sfx: 'whoosh', volume: 0.3},
  {at: 7.3, sfx: 'whoosh', volume: 0.3},
  {at: 7.5, sfx: 'rise', volume: 0.25},
  ...WIPES.map((at) => ({at: at - 0.35, sfx: 'whoosh', volume: 0.45})),
  {at: 10.6, sfx: 'pop', volume: 0.35},
  {at: 11.3, sfx: 'pop', volume: 0.3},
  {at: 11.6, sfx: 'swish', volume: 0.35},
  {at: 12.9, sfx: 'pop', volume: 0.3},
  ...[15.6, 15.95, 16.3].map((at) => ({at, sfx: 'thud', volume: 0.3})),
  {at: 16.4, sfx: 'ding', volume: 0.3},
  {at: 18.75, sfx: 'whoosh', volume: 0.3},
  {at: 19.5, sfx: 'click', volume: 0.35},
  {at: 23.3, sfx: 'rise', volume: 0.3},
  {at: 24.2, sfx: 'pop', volume: 0.25},
  {at: 26.8, sfx: 'pop', volume: 0.35},
  {at: 27.7, sfx: 'pop', volume: 0.35},
  {at: 28.8, sfx: 'pop', volume: 0.35},
  ...[30.9, 31.15, 31.4].map((at) => ({at, sfx: 'ding', volume: 0.22})),
  {at: 34.6, sfx: 'pop', volume: 0.25},
  {at: 35.0, sfx: 'pop', volume: 0.25},
  {at: 35.4, sfx: 'whoosh', volume: 0.3},
  {at: 36.7, sfx: 'ding', volume: 0.25},
  {at: 38.15, sfx: 'pop', volume: 0.35},
  {at: 40.1, sfx: 'swish', volume: 0.4},
  {at: 40.45, sfx: 'click', volume: 0.45},
  {at: 41.9, sfx: 'ding', volume: 0.3},
  {at: 43.6, sfx: 'pop', volume: 0.35},
  ...[45.7, 49.1, 50.9, 52.5].map((at) => ({at, sfx: 'whoosh', volume: 0.25})),
  ...[54.2, 54.4, 54.6, 54.8].map((at) => ({at, sfx: 'ding', volume: 0.2})),
  {at: 55.9, sfx: 'swish', volume: 0.3},
  {at: 56.9, sfx: 'pop', volume: 0.3},
  {at: 58.55, sfx: 'rise', volume: 0.3},
  {at: 60.7, sfx: 'whoosh', volume: 0.45},
  {at: 61.0, sfx: 'ding', volume: 0.35},
  {at: OUTRO_AT - 0.35, sfx: 'whoosh', volume: 0.45},
  {at: OUTRO_AT + 0.4, sfx: 'rise', volume: 0.3},
  {at: OUTRO_AT + 1.4, sfx: 'pop', volume: 0.35},
];

export const Iso: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeAudio = interpolate(frame, [ISO_FRAMES - s(0.8), ISO_FRAMES], [1, 0], {extrapolateLeft: 'clamp'});
  return (
    <AbsoluteFill>
      <Camera shakes={[15.95, 40.45]}>
        <Background />
        <Gate from={0} to={9.0}><Hook /></Gate>
        <Gate from={9.0} to={14.1}><Evolution /></Gate>
        <Gate from={14.1} to={32.8}><Maison /></Gate>
        <Gate from={32.8} to={43.3}><Structure /></Gate>
        <Gate from={43.3} to={55.7}><Plan /></Gate>
        <Gate from={55.7} to={OUTRO_AT}><Levier /></Gate>
        <Gate from={OUTRO_AT} to={99}><Outro at={OUTRO_AT} /></Gate>
      </Camera>
      <Header hideAt={OUTRO_AT} />
      <Footer hideAt={OUTRO_AT} />
      {WIPES.map((at) => (
        <Wipe key={at} at={at} />
      ))}
      <Wipe at={OUTRO_AT} />
      <Captions captions={captions} />
      <Audio src={staticFile('voix-off-iso.m4a')} volume={fadeAudio} />
      <SfxTrack cues={CUES} />
    </AbsoluteFill>
  );
};
