import {Easing, interpolate, spring, useCurrentFrame} from 'remotion';
import {colors, FPS, s, sansFont} from './theme';

// Courbes « motion design » : sortie expo pour les entrées, in-out marqué pour les déplacements.
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeIn = Easing.bezier(0.7, 0, 0.84, 0);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** Temps absolu en secondes. */
export const useT = () => useCurrentFrame() / FPS;

/** Progression 0 → 1 entre a et b (secondes) avec easing. */
export const prog = (t: number, a: number, b: number, easing = easeOut) =>
  interpolate(t, [a, b], [0, 1], {...clamp, easing});

/** Interpolation entre images clés (secondes) avec easing in-out. */
export const kf = (t: number, times: number[], values: number[], easing = easeInOut) =>
  interpolate(t, times, values, {...clamp, easing});

/** Ressort déclenché à `at` (secondes). */
export const useSpring = (at: number, config: Partial<{damping: number; stiffness: number; mass: number}> = {}) => {
  const frame = useCurrentFrame();
  return spring({frame: frame - s(at), fps: FPS, config: {damping: 12, stiffness: 180, mass: 0.6, ...config}});
};

type Dir = 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';
const offset = (d: Dir, k: number, dist: number) => {
  switch (d) {
    case 'up':
      return [0, dist * k];
    case 'down':
      return [0, -dist * k];
    case 'left':
      return [dist * k, 0];
    case 'right':
      return [-dist * k, 0];
    default:
      return [0, 0];
  }
};

/**
 * Élément centré en (x, y) : entrée en ressort depuis `from`, sortie accélérée vers `to`.
 * C'est la brique de base de toutes les apparitions.
 */
export const Enter: React.FC<{
  at: number;
  until?: number;
  x: number;
  y: number;
  from?: Dir;
  to?: Dir;
  dist?: number;
  rotate?: number;
  spin?: number;
  exit?: number;
  bouncy?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({at, until = Infinity, x, y, from = 'scale', to = 'scale', dist = 140, rotate = 0, spin = 0, exit = 0.28, bouncy, style, children}) => {
  const t = useT();
  const sp = useSpring(at, bouncy ? {damping: 9, stiffness: 200} : {});
  if (t < at || t > until) return null;
  const out = until === Infinity ? 0 : prog(t, until - exit, until, easeIn);
  const [ix, iy] = offset(from, 1 - sp, dist);
  const [ox, oy] = offset(to, -out, dist);
  const scaleIn = from === 'scale' ? sp : 1;
  const scaleOut = to === 'scale' ? 1 - out : 1;
  const opacity = Math.min(1, sp * 2) * (1 - out);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) translate(${ix + ox}px, ${iy + oy}px) scale(${scaleIn * scaleOut}) rotate(${rotate + spin * (1 - sp)}deg)`,
        opacity,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * Typographie cinétique : chaque mot monte depuis un masque, en cascade.
 * Les mots entre *astérisques* passent dans la couleur d'accent.
 */
export const Kinetic: React.FC<{
  text: string;
  at: number;
  until?: number;
  x?: number;
  y: number;
  size?: number;
  color?: string;
  accent?: string;
  weight?: number;
  stagger?: number;
  align?: 'center' | 'left';
  maxWidth?: number;
}> = ({text, at, until = Infinity, x = 540, y, size = 110, color = colors.navy, accent = colors.green, weight = 900, stagger = 0.06, align = 'center', maxWidth = 980}) => {
  const t = useT();
  if (t < at || t > until) return null;
  const words = text.split(' ');
  return (
    <div
      style={{
        position: 'absolute',
        left: align === 'center' ? x - maxWidth / 2 : x,
        top: y,
        width: maxWidth,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        columnGap: size * 0.26,
        transform: 'translateY(-50%)',
        fontFamily: sansFont,
        fontWeight: weight,
        fontSize: size,
        lineHeight: 1.02,
        letterSpacing: -size * 0.025,
        textTransform: 'uppercase',
      }}
    >
      {words.map((w, i) => {
        const hi = w.startsWith('*');
        const clean = w.replace(/\*/g, '');
        const pin = prog(t, at + i * stagger, at + i * stagger + 0.45);
        const pout = until === Infinity ? 0 : prog(t, until - 0.3 + i * 0.03, until + i * 0.03, easeIn);
        return (
          <span key={i} style={{overflow: 'hidden', display: 'inline-block', paddingBottom: size * 0.08}}>
            <span
              style={{
                display: 'inline-block',
                color: hi ? accent : color,
                transform: `translateY(${(1 - pin) * 110 - pout * 110}%) rotate(${(1 - pin) * 6}deg)`,
              }}
            >
              {clean}
            </span>
          </span>
        );
      })}
    </div>
  );
};

/** Trait de soulignement qui se dessine. */
export const Underline: React.FC<{at: number; until?: number; x: number; y: number; width: number; color?: string}> = ({
  at,
  until = Infinity,
  x,
  y,
  width,
  color = colors.green,
}) => {
  const t = useT();
  if (t < at || t > until) return null;
  const p = prog(t, at, at + 0.4);
  const out = until === Infinity ? 0 : prog(t, until - 0.25, until, easeIn);
  return (
    <div
      style={{
        position: 'absolute',
        left: x - width / 2 + out * width,
        top: y,
        width: width * (p - out),
        height: 14,
        borderRadius: 7,
        background: color,
      }}
    />
  );
};

/** N'affiche ses enfants qu'entre `from` et `to` (secondes absolues). */
export const Gate: React.FC<{from: number; to: number; children: React.ReactNode}> = ({from, to, children}) => {
  const t = useT();
  return t >= from && t <= to ? <>{children}</> : null;
};
