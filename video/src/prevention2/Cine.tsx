import {Audio, Img, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {easeIn, easeInOut, easeOut, prog, useT} from '../anim';
import {colors, s, sansFont} from '../theme';

/**
 * Outils « cinéma » pour le modèle UNIVERSNORMES :
 * plans photo plein cadre avec mouvement de caméra (travelling, push, pull, panoramique),
 * caméra à l'épaule très légère, balayage de lumière, cercle de mise en évidence,
 * et piste de sound design (bibliothèque public/sfx2).
 */
export type Move = 'push' | 'pull' | 'left' | 'right' | 'up' | 'down';

export const CineShot: React.FC<{
  src: string;
  at: number;
  until: number;
  move?: Move;
  pos?: string;
  y?: number;
  h?: number;
  label?: string;
  grade?: 'cold' | 'warm' | 'alert' | 'none';
  children?: React.ReactNode;
}> = ({src, at, until, move = 'push', pos = '50% 50%', y = 1050, h = 1000, label, grade = 'cold', children}) => {
  const t = useT();
  const f = useCurrentFrame();
  if (t < at - 0.1 || t > until + 0.1) return null;
  const p = prog(t, at, until, (v) => v);
  const inP = prog(t, at, at + 0.5, easeOut);
  const outP = prog(t, until - 0.35, until, easeIn);
  const zoom = move === 'push' ? 1.08 + 0.14 * p : move === 'pull' ? 1.24 - 0.14 * p : 1.16;
  const dx = move === 'left' ? 50 - 100 * p : move === 'right' ? -50 + 100 * p : 0;
  const dy = move === 'up' ? 40 - 80 * p : move === 'down' ? -40 + 80 * p : 0;
  // caméra à l'épaule : micro-oscillations lentes
  const hx = Math.sin(f / 23) * 3 + Math.sin(f / 9.7) * 1.2;
  const hy = Math.cos(f / 19) * 2.5 + Math.sin(f / 7.3) * 1;
  const tint = grade === 'cold' ? 'rgba(14,42,92,0.18)' : grade === 'warm' ? 'rgba(217,162,58,0.14)' : grade === 'alert' ? 'rgba(200,64,47,0.22)' : 'transparent';
  return (
    <div style={{position: 'absolute', left: 40, right: 40, top: y - h / 2, height: h, borderRadius: 36, overflow: 'hidden', opacity: inP * (1 - outP), transform: `scale(${0.96 + 0.04 * inP})`, boxShadow: '0 30px 60px rgba(14,30,60,0.35)', border: '8px solid #fff'}}>
      <Img src={staticFile(src)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `translate(${dx + hx}px, ${dy + hy}px) scale(${zoom})`, filter: 'contrast(1.06) saturate(0.92)'}} />
      <div style={{position: 'absolute', inset: 0, background: tint, mixBlendMode: 'multiply'}} />
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(10,18,35,0.55) 100%)'}} />
      <LightSweep at={at + 0.2} />
      {label && (
        <div style={{position: 'absolute', left: 30, bottom: 30, display: 'flex', alignItems: 'center', gap: 12, fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: '#fff', letterSpacing: 1, textShadow: '0 2px 10px rgba(0,0,0,0.5)', opacity: prog(t, at + 0.6, at + 1.0)}}>
          <div style={{width: 12, height: 12, borderRadius: 6, background: colors.green}} />
          {label}
        </div>
      )}
      {children}
    </div>
  );
};

/** Reflet lumineux qui traverse l'image une fois. */
export const LightSweep: React.FC<{at: number; dur?: number}> = ({at, dur = 1.4}) => {
  const t = useT();
  if (t < at || t > at + dur) return null;
  const p = prog(t, at, at + dur, easeInOut);
  return <div style={{position: 'absolute', top: -200, bottom: -200, left: `${-60 + p * 160}%`, width: '30%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)', transform: 'rotate(18deg)'}} />;
};

/** Cercle de mise en évidence (surbrillance d'une zone) qui se dessine puis pulse. */
export const Highlight: React.FC<{at: number; until?: number; x: number; y: number; r?: number; color?: string; label?: string}> = ({at, until = Infinity, x, y, r = 110, color = '#F2C230', label}) => {
  const t = useT();
  if (t < at || t > until) return null;
  const p = prog(t, at, at + 0.6, easeOut);
  const o = until === Infinity ? 1 : 1 - prog(t, until - 0.3, until, easeIn);
  const pulse = 1 + Math.sin((t - at) * 5) * 0.04;
  return (
    <div style={{position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, opacity: o}}>
      <svg width={r * 2} height={r * 2} style={{overflow: 'visible', transform: `scale(${pulse})`}}>
        <circle cx={r} cy={r} r={r - 6} fill="none" stroke={color} strokeWidth={9} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} transform={`rotate(-90 ${r} ${r})`} />
        <circle cx={r} cy={r} r={r - 6} fill={color} opacity={0.12 * p} />
      </svg>
      {label && (
        <div style={{position: 'absolute', left: r * 2 + 10, top: r - 26, whiteSpace: 'nowrap', background: color, color: colors.ink, fontFamily: sansFont, fontWeight: 900, fontSize: 30, padding: '6px 16px', borderRadius: 10, opacity: prog(t, at + 0.4, at + 0.8)}}>{label}</div>
      )}
    </div>
  );
};

export type Sfx = {at: number; s: string; v?: number; dur?: number};

/** Piste de sound design (bibliothèque synthétisée public/sfx2 + bruitages public/sfx). */
export const SoundDesign: React.FC<{cues: Sfx[]}> = ({cues}) => (
  <>
    {cues.map((c, i) => {
      const lib = c.s.startsWith('sfx/') ? c.s : `sfx2/${c.s}`;
      return (
        <Sequence key={i} from={s(c.at)} durationInFrames={s(c.dur ?? 3)} layout="none">
          <Audio src={staticFile(`${lib}.wav`)} volume={c.v ?? 0.3} />
        </Sequence>
      );
    })}
  </>
);

/** Ambiance d'usine permanente très faible, coupée net dans les fenêtres de silence. */
export const Ambience: React.FC<{total: number; silences: [number, number][]; level?: number}> = ({total, silences, level = 0.05}) => {
  const vol = (f: number) => {
    const t = f / 30;
    let v = level * Math.min(1, t / 1.5) * Math.min(1, Math.max(0, (total - t) / 1.5));
    for (const [a, b] of silences) {
      if (t >= a - 0.05 && t <= b) v *= interpolate(t, [a - 0.05, a, b - 0.4, b], [1, 0, 0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    }
    return v;
  };
  return <Audio src={staticFile('sfx2/ambiance-usine.wav')} volume={vol} loop />;
};
