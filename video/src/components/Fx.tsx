import {AbsoluteFill, Audio, interpolate, Sequence, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, prog, useT} from '../anim';
import {colors, s} from '../theme';

/** Caméra : légère dérive de zoom continue + secousses ponctuelles (impacts). */
export const Camera: React.FC<{shakes: number[]; children: React.ReactNode}> = ({shakes, children}) => {
  const t = useT();
  let dx = 0;
  let dy = 0;
  let rot = 0;
  for (const at of shakes) {
    const d = t - at;
    if (d >= 0 && d < 0.35) {
      const a = 16 * (1 - d / 0.35);
      dx += Math.sin(d * 95) * a;
      dy += Math.cos(d * 80) * a * 0.7;
      rot += Math.sin(d * 70) * a * 0.04;
    }
  }
  const zoom = 1 + 0.025 * Math.sin(t / 3.2);
  return (
    <AbsoluteFill style={{transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(${zoom})`}}>{children}</AbsoluteFill>
  );
};

/**
 * Transition de marque : bande marine + liseré vert en diagonale qui balaie l'écran.
 * L'écran est entièrement couvert à `at` : c'est là que la scène change.
 */
export const Wipe: React.FC<{at: number; dur?: number; color?: string}> = ({at, dur = 0.7, color = colors.navy}) => {
  const t = useT();
  if (t < at - dur / 2 || t > at + dur / 2) return null;
  const x = interpolate(t, [at - dur / 2, at + dur / 2], [-2900, 1500], {easing: easeInOut});
  return (
    <AbsoluteFill style={{overflow: 'hidden', pointerEvents: 'none'}}>
      <div style={{position: 'absolute', top: -400, left: x, width: 2600, height: 2800, transform: 'skewX(-18deg)'}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 140, height: '100%', background: colors.green}} />
        <div style={{position: 'absolute', left: 140, top: 0, width: 2320, height: '100%', background: color}} />
        <div style={{position: 'absolute', left: 2460, top: 0, width: 140, height: '100%', background: colors.greenLight}} />
      </div>
    </AbsoluteFill>
  );
};

/** Flash blanc bref (impact du tampon). */
export const Flash: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  const o = interpolate(t, [at, at + 0.04, at + 0.22], [0, 0.7, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return o > 0 ? <AbsoluteFill style={{background: '#fff', opacity: o}} /> : null;
};

/** Vignette d'alerte qui pulse sur les bords. */
export const AlertVignette: React.FC<{from: number; to: number}> = ({from, to}) => {
  const t = useT();
  if (t < from || t > to) return null;
  const env = prog(t, from, from + 0.3) * (1 - prog(t, to - 0.4, to, easeIn));
  const pulse = 0.5 + 0.5 * Math.sin(t * 9);
  return (
    <AbsoluteFill
      style={{
        boxShadow: `inset 0 0 ${220 + pulse * 120}px ${60 + pulse * 40}px rgba(230,120,30,${0.45 * env})`,
      }}
    />
  );
};

/** Couche de désaturation (le monde « papier » des manuels). */
export const Drain: React.FC<{from: number; to: number}> = ({from, to}) => {
  const t = useT();
  if (t < from || t > to) return null;
  const a = prog(t, from, from + 0.5, easeOut) * (1 - prog(t, to - 0.4, to, easeIn));
  return <AbsoluteFill style={{backdropFilter: `grayscale(${a}) brightness(${1 - 0.06 * a})`}} />;
};

export type Cue = {at: number; sfx: string; volume?: number};

/** Bruitages placés à la frame près. */
export const SfxTrack: React.FC<{cues: Cue[]}> = ({cues}) => (
  <>
    {cues.map((c, i) => (
      <Sequence key={i} from={s(c.at)} durationInFrames={s(1.5)} layout="none">
        <Audio src={staticFile(`sfx/${c.sfx}.wav`)} volume={c.volume ?? 0.35} />
      </Sequence>
    ))}
  </>
);
