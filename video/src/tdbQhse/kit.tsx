import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {sansFont} from '../theme';
import {Abs, BLUE, easeIn, easeInOut, GREEN, Hand, INK, LOGO, PAPER, PH, pop, prog, RED, Row, T, useT, YEL} from '../implIso/kit';

export {Abs, BLUE, Chip, Cite, DIM, easeIn, easeInOut, easeOut, GREEN, Hand, INK, lerp, LOGO, Mark, PAPER, PH, Photo, pop, prog, RED, Row, Sc, spring, T, Title, useT, VIO, YEL, Bg} from '../implIso/kit';

export const ORANGE = '#F28C1E';
export type Pt = {n: number; l: string; sub: string; at: number; end: number; c: string};
export const PT: Pt[] = [
  {n: 1, l: 'Qu’est-ce que c’est ?', sub: 'Un outil de pilotage', at: 7.9, end: 29.9, c: BLUE},
  {n: 2, l: 'Les 5 étapes', sub: 'Le mettre en place', at: 29.9, end: 62.0, c: GREEN},
  {n: 3, l: 'Le piège à éviter', sub: 'Des chiffres… ou des décisions ?', at: 62.0, end: 76.4, c: RED},
];
export const WIPE = 2.0;
export const OUTRO_AT = 77.4;

/** Cadran à aiguille : v ∈ [0, 1] (0 = gauche, 1 = droite), zone verte au-delà de 0,7. */
export const Dial: React.FC<{size: number; v: number; label?: string; c?: string; ticks?: boolean}> = ({size, v, label, c = INK, ticks = true}) => {
  const r = size / 2;
  const a = -120 + v * 240;
  const arc = (a0: number, a1: number, col: string, w: number) => {
    const p = (deg: number) => [r + Math.cos(((deg - 90) * Math.PI) / 180) * (r - w), r + Math.sin(((deg - 90) * Math.PI) / 180) * (r - w)];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    return <path d={`M ${x0} ${y0} A ${r - w} ${r - w} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}`} stroke={col} strokeWidth={w * 1.2} fill="none" />;
  };
  const w = Math.max(3, size * 0.07);
  return (
    <div style={{position: 'relative', width: size, height: size}}>
      <svg width={size} height={size} style={{position: 'absolute', inset: 0}}>
        <circle cx={r} cy={r} r={r - 2} fill="#fff" stroke={INK} strokeWidth={Math.max(2, size * 0.025)} />
        {arc(-120, 24, '#E3E6EC', w)}
        {arc(24, 72, YEL, w)}
        {arc(72, 120, GREEN, w)}
        {ticks && Array.from({length: 9}, (_, i) => {
          const d = ((-120 + i * 30 - 90) * Math.PI) / 180;
          return <line key={i} x1={r + Math.cos(d) * r * 0.62} y1={r + Math.sin(d) * r * 0.62} x2={r + Math.cos(d) * r * 0.72} y2={r + Math.sin(d) * r * 0.72} stroke={INK} strokeWidth={Math.max(1.5, size * 0.015)} />;
        })}
        <g transform={`rotate(${a} ${r} ${r})`}>
          <path d={`M ${r - size * 0.03} ${r} L ${r} ${r * 0.28} L ${r + size * 0.03} ${r} Z`} fill={RED} />
        </g>
        <circle cx={r} cy={r} r={size * 0.07} fill={INK} />
      </svg>
      {label && <div style={{position: 'absolute', left: 0, right: 0, top: r * 1.25, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.2, color: c}}>{label}</div>}
    </div>
  );
};

/** Fil rouge : le combiné d'instruments Q · H · S · E. p ∈ [0, 1] = avancement (les aiguilles montent vers le vert). */
const QHSE = [{l: 'Q', k: 0.0}, {l: 'H', k: 0.08}, {l: 'S', k: 0.16}, {l: 'E', k: 0.24}];
export const Cluster: React.FC<{size: number; p: number; wobble?: boolean}> = ({size, p, wobble = true}) => {
  const t = useT();
  return (
    <div style={{display: 'flex', gap: size * 0.12, padding: `${size * 0.12}px ${size * 0.18}px`, background: INK, borderRadius: size * 0.6}}>
      {QHSE.map((g, i) => {
        const v = Math.max(0, Math.min(1, 0.08 + (p - g.k * (1 - p)) * 0.86)) + (wobble ? Math.sin(t * 3 + i) * 0.012 : 0);
        return <Dial key={g.l} size={size} v={v} label={g.l} ticks={size > 50} />;
      })}
    </div>
  );
};
export const progressAt = (t: number) => Math.max(0, Math.min(1, (t - 3) / 70));

/* ─────────── Couverture ─────────── */
export const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('iso26/analyste-kpi.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1000, objectFit: 'cover', objectPosition: '50% 40%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 32%, ${PAPER}DD 47%, ${PAPER} 53%)`}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={60} y={900} w={960} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>PILOTAGE · INDICATEURS · DÉCISIONS</div>
        <T size={80} style={{marginTop: 24, textTransform: 'uppercase', letterSpacing: -2}}>Construire un</T>
        <T size={112} style={{textTransform: 'uppercase', letterSpacing: -3, lineHeight: 1.05}}><span style={{background: YEL, padding: '0 20px', borderRadius: 18}}>tableau de bord</span></T>
        <T size={112} style={{textTransform: 'uppercase', letterSpacing: -3}}>QHSE <span style={{color: GREEN}}>efficace</span></T>
      </Abs>
      <Row y={1420}><Cluster size={130} p={1} wobble={false} /></Row>
    </AbsoluteFill>
  );
};

/* ─────────── Transition : le compteur géant dont l'aiguille balaie l'écran ─────────── */
export const GaugeWipe: React.FC<{p: Pt}> = ({p}) => {
  const t = useT();
  const a = p.at, b = p.at + WIPE;
  if (t < a || t > b) return null;
  const up = prog(t, a, a + 0.4, easeInOut);
  const down = prog(t, b - 0.4, b, easeIn);
  const y = (1 - up) * 1920 + down * 1920;
  const sweep = prog(t, a + 0.25, a + 1.25, easeInOut);
  const ang = -120 + sweep * 240;
  const cx = 540, cy = 1060, R = 470;
  return (
    <AbsoluteFill style={{zIndex: 55, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: 0, top: y, width: 1080, height: 1920, background: INK, overflow: 'hidden'}}>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          {Array.from({length: 49}, (_, i) => {
            const d = ((-120 + i * 5 - 90) * Math.PI) / 180;
            const big = i % 6 === 0;
            const lit = -120 + i * 5 <= ang;
            return <line key={i} x1={cx + Math.cos(d) * R * (big ? 0.82 : 0.88)} y1={cy + Math.sin(d) * R * (big ? 0.82 : 0.88)} x2={cx + Math.cos(d) * R} y2={cy + Math.sin(d) * R} stroke={lit ? p.c : '#3A4C78'} strokeWidth={big ? 12 : 6} />;
          })}
          <g transform={`rotate(${ang} ${cx} ${cy})`}><path d={`M ${cx - 16} ${cy} L ${cx} ${cy - R * 0.9} L ${cx + 16} ${cy} Z`} fill={RED} /></g>
          <circle cx={cx} cy={cy} r={46} fill="#fff" />
        </svg>
        <Abs x={0} y={330} w={1080} style={{textAlign: 'center'}}>
          <T size={200} color="#fff" style={{opacity: prog(t, a + 0.5, a + 0.9)}}>{p.n}<span style={{fontSize: 70, color: '#ffffff88'}}>/3</span></T>
        </Abs>
        <Abs x={60} y={1260} w={960} style={{textAlign: 'center', opacity: prog(t, a + 0.6, a + 1.0)}}>
          <T size={76} color="#fff">{p.l}</T>
          <Hand size={52} color={p.c === BLUE ? '#9CC1FF' : p.c} style={{marginTop: 12}}>{p.sub}</Hand>
        </Abs>
      </div>
    </AbsoluteFill>
  );
};

/* ─────────── En-tête ─────────── */
export const Header: React.FC = () => {
  const t = useT();
  const p = PT.find((x) => t >= x.at + WIPE - 0.3 && t < x.end);
  const intro = t > 2.6 && t < 7.6;
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 80, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {(intro || p) && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 214, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: intro ? pop(t, 2.6) * (1 - prog(t, 7.3, 7.6)) : p ? pop(t, p.at + WIPE - 0.3) * (1 - prog(t, p.end - 0.3, p.end)) : 1}}>
          <Cluster size={34} p={progressAt(t)} />
          <div style={{padding: '6px 20px', borderRadius: 40, background: '#fff', border: `3px solid ${p ? p.c : INK}`}}><T size={30}>{p ? `${p.n}. ${p.l}` : 'Tableau de bord QHSE'}</T></div>
        </div>
      )}
    </AbsoluteFill>
  );
};

