import {Easing, interpolate, spring, useCurrentFrame} from 'remotion';
import {FPS, s} from './theme';

/** Interpolation entre images clés (temps en secondes). */
export const kf = (t: number, times: number[], values: number[]) =>
  interpolate(t, times, values, {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Apparition « pop » à `at` puis fondu de sortie avant `until`. */
export const usePop = (at: number, until = Infinity, fadeOut = 0.3) => {
  const frame = useCurrentFrame();
  const sp = spring({frame: frame - s(at), fps: FPS, config: {damping: 11, stiffness: 170, mass: 0.7}});
  const out = until === Infinity ? 1 : interpolate(frame, [s(until - fadeOut), s(until)], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const visible = frame >= s(at) && frame < s(until);
  return {scale: sp * (0.85 + 0.15 * out), opacity: Math.min(1, sp * 1.6) * out, visible};
};

/** Positionne un élément centré en (x, y) avec une animation pop. */
export const Pop: React.FC<{
  at: number;
  until?: number;
  x: number;
  y: number;
  fadeOut?: number;
  rotate?: number;
  children: React.ReactNode;
}> = ({at, until, x, y, fadeOut, rotate = 0, children}) => {
  const {scale, opacity, visible} = usePop(at, until, fadeOut);
  if (!visible) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`,
        opacity,
      }}
    >
      {children}
    </div>
  );
};

/** Progression linéaire 0 → 1 entre deux instants (secondes). */
export const useProgress = (from: number, to: number) => {
  const frame = useCurrentFrame();
  return interpolate(frame / FPS, [from, to], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};
