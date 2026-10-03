import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {Camera, Flash, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {s} from '../theme';
import {captions} from './captions';
import {Clarification, Conclusion, Culture, Intro, Risques, Transition} from './Scenes';

const LOGO = 'promo/logo.png';
const OUTRO_AT = 77.9;
export const ISO26_FRAMES = s(81.3);

/**
 * Sound design (sans musique ni son de fond, à la demande du client) : uniquement des bruitages,
 * bien audibles, calés sur les actions visibles.
 */
const CUES: Sfx[] = [
  {at: 0.2, s: 'bass-hit', v: 0.55},
  ...Array.from({length: 11}, (_, i) => ({at: 0.4 + i * 0.16, s: 'tick', v: 0.45})),
  {at: 3.6, s: 'soft-whoosh', v: 0.5},
  {at: 4.2, s: 'sfx/pop', v: 0.5},
  {at: 5.9, s: 'tampon', v: 0.7},
  {at: 6.85, s: 'soft-whoosh', v: 0.45},
  {at: 7.5, s: 'sfx/pop', v: 0.45},
  {at: 9.7, s: 'sfx/swish', v: 0.55},
  {at: 10.5, s: 'soft-whoosh', v: 0.45},
  ...[11.1, 11.42, 11.74, 12.06].map((at) => ({at, s: 'sfx/pop', v: 0.5})),
  // évolution 1
  {at: 13.4, s: 'deep-hit', v: 0.55},
  {at: 15.6, s: 'sfx/ding', v: 0.42},
  {at: 17.1, s: 'soft-whoosh', v: 0.45},
  {at: 18.9, s: 'sfx/swish', v: 0.55},
  {at: 20.8, s: 'bass-hit', v: 0.5},
  ...Array.from({length: 6}, (_, i) => ({at: 21.6 + i * 0.18, s: 'tick', v: 0.5})),
  {at: 24.9, s: 'validation', v: 0.55},
  // évolution 2
  {at: 26.15, s: 'deep-hit', v: 0.55},
  {at: 29.0, s: 'sfx/pop', v: 0.45},
  {at: 30.4, s: 'sfx/swish', v: 0.55},
  {at: 31.5, s: 'soft-whoosh', v: 0.45},
  {at: 32.1, s: 'soft-whoosh', v: 0.42},
  {at: 32.7, s: 'soft-whoosh', v: 0.42},
  {at: 34.4, s: 'notification', v: 0.5},
  {at: 36.6, s: 'riser', v: 0.4, dur: 1.8},
  {at: 37.0, s: 'sfx/ding', v: 0.45},
  // évolution 3
  {at: 38.8, s: 'deep-hit', v: 0.55},
  {at: 41.85, s: 'page', v: 0.55},
  {at: 42.4, s: 'stylo', v: 0.5, dur: 2.6},
  {at: 45.1, s: 'tampon', v: 0.65},
  {at: 46.3, s: 'sfx/pop', v: 0.5},
  {at: 46.65, s: 'sfx/pop', v: 0.5},
  {at: 47.0, s: 'sfx/pop', v: 0.5},
  {at: 47.6, s: 'soft-whoosh', v: 0.45},
  {at: 48.55, s: 'cadenas', v: 0.55},
  {at: 49.6, s: 'validation', v: 0.55},
  // évolution 4
  {at: 52.05, s: 'deep-hit', v: 0.55},
  {at: 55.6, s: 'sfx/pop', v: 0.45},
  {at: 56.9, s: 'sfx/swish', v: 0.55},
  {at: 57.7, s: 'sfx/thud', v: 0.55},
  {at: 59.2, s: 'tampon', v: 0.7},
  {at: 60.1, s: 'soft-whoosh', v: 0.45},
  ...[61.3, 62.1, 62.9].map((at) => ({at, s: 'validation', v: 0.5})),
  // conclusion
  {at: 64.4, s: 'soft-whoosh', v: 0.45},
  {at: 68.6, s: 'sfx/swish', v: 0.55},
  {at: 69.5, s: 'bass-hit', v: 0.55},
  ...[71.5, 72.2, 72.9].map((at) => ({at, s: 'tick', v: 0.55})),
  {at: 73.3, s: 'validation', v: 0.5},
  {at: 74.1, s: 'riser', v: 0.4, dur: 1.4},
  {at: 75.4, s: 'sfx/whoosh', v: 0.45},
  ...Array.from({length: 8}, (_, i) => ({at: 75.7 + i * 0.125, s: 'sfx/click', v: 0.45})),
  {at: 76.9, s: 'notification', v: 0.55},
  {at: OUTRO_AT - 0.4, s: 'soft-whoosh', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const WIPES = [13.42, 26.18, 38.84, 52.08, 64.44];

export const Iso2026: React.FC = () => (
  <AbsoluteFill>
    <Camera shakes={[5.9, 45.1, 59.2, 69.5]}>
      <Background />
      <Gate from={0} to={13.42}><Intro /></Gate>
      <Gate from={13.42} to={26.18}><Culture /></Gate>
      <Gate from={26.18} to={38.84}><Risques /></Gate>
      <Gate from={38.84} to={52.08}><Clarification /></Gate>
      <Gate from={52.08} to={64.44}><Transition /></Gate>
      <Gate from={64.44} to={OUTRO_AT}><Conclusion end={OUTRO_AT} /></Gate>
      <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    </Camera>
    <Header hideAt={OUTRO_AT} logo={LOGO} />
    <Footer hideAt={OUTRO_AT} />
    {WIPES.map((at) => <Wipe key={at} at={at} />)}
    <Wipe at={OUTRO_AT} />
    <Flash at={5.9} />
    <Captions captions={captions} />
    <Audio src={staticFile('voix-off-editorial-v4.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
