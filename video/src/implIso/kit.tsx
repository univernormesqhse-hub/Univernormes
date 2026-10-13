import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, prog, useT} from '../anim';
import {handFont, sansFont} from '../theme';

/* Palette : papier clair + jaune de la vidéo source, bleu « plan d'architecte » pour les transitions. */
export const LOGO = 'promo/logo.png';
export const PAPER = '#F8F5EC';
export const INK = '#14213D';
export const DIM = '#5B6577';
export const YEL = '#F5B700';
export const BLUE = '#2F6FDB';
export const BP = '#1C4C9C';
export const GREEN = '#1FA67A';
export const RED = '#E5484D';
export const VIO = '#7B5CD6';
export const PH = (p: string) => staticFile(p);

export type Pt = {n: number; l: string; sub: string; at: number; end: number; c: string};
export const PT: Pt[] = [
  {n: 1, l: "L'implémentation vraie", sub: 'Au-delà du manuel', at: 47.9, end: 62.5, c: YEL},
  {n: 2, l: 'La question fondamentale', sub: 'Révéler la motivation', at: 62.5, end: 134.1, c: BLUE},
  {n: 3, l: 'Le diagnostic honnête', sub: "L'analyse des écarts", at: 134.1, end: 193.1, c: GREEN},
  {n: 4, l: 'Bâtir un plan réaliste', sub: 'Quoi, qui et quand', at: 193.1, end: 258.5, c: VIO},
  {n: 5, l: 'Contrainte ou opportunité ?', sub: 'Le choix stratégique', at: 258.5, end: 311.6, c: RED},
];
export const WIPE = 2.4;
export const OUTRO_AT = 311.8;

export const pop = (t: number, at: number, d = 0.4) => prog(t, at, at + d, easeOut);
export const spring = (t: number, at: number, k = 7, w = 15) => {
  const x = t - at;
  return x <= 0 ? 0 : 1 - Math.exp(-x * k) * Math.cos(x * w);
};
export const win = (t: number, a: number, b: number, f = 0.4) => prog(t, a, a + f) * (1 - prog(t, b - f, b));
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
export {easeIn, easeInOut, easeOut, prog, useT};

export const T: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 40, color = INK, style}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, letterSpacing: -0.5, lineHeight: 1.08, ...style}}>{children}</div>
);
export const Hand: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 48, color = INK, style}) => (
  <div style={{fontFamily: handFont, fontSize: size, color, lineHeight: 1.1, ...style}}>{children}</div>
);
export const Abs: React.FC<{x: number; y: number; w?: number; h?: number; children?: React.ReactNode; style?: React.CSSProperties}> = ({x, y, w, h, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, ...style}}>{children}</div>
);
export const Chip: React.FC<{children: React.ReactNode; c?: string; q?: number; size?: number; light?: boolean; style?: React.CSSProperties}> = ({children, c = YEL, q = 1, size = 34, light = false, style}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 26px', borderRadius: 50, background: c, color: light ? '#fff' : INK, fontFamily: sansFont, fontWeight: 900, fontSize: size, transform: `scale(${q})`, boxShadow: `0 12px 28px ${c}55`, whiteSpace: 'nowrap', ...style}}>{children}</div>
);
export const Row: React.FC<{y: number; children: React.ReactNode; gap?: number}> = ({y, children, gap = 14}) => (
  <Abs x={0} y={y} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap, flexWrap: 'wrap', padding: '0 40px', boxSizing: 'border-box'}}>{children}</Abs>
);
export const Title: React.FC<{children: React.ReactNode; y?: number; size?: number; o?: number}> = ({children, y = 330, size = 58, o = 1}) => (
  <Abs x={50} y={y} w={980} style={{textAlign: 'center', opacity: o}}><T size={size}>{children}</T></Abs>
);
export const Mark: React.FC<{children: React.ReactNode; c?: string; p?: number}> = ({children, c = YEL, p = 1}) => (
  <span style={{backgroundImage: `linear-gradient(${c}AA, ${c}AA)`, backgroundRepeat: 'no-repeat', backgroundSize: `${p * 100}% 42%`, backgroundPosition: '0 88%', padding: '0 4px'}}>{children}</span>
);
export const Cite: React.FC<{y: number; children?: React.ReactNode; o?: number}> = ({y, children = 'Chiffres cités par la vidéo d’origine', o = 1}) => (
  <Row y={y}><div style={{opacity: o, fontFamily: sansFont, fontWeight: 700, fontSize: 24, color: DIM, background: '#fff', borderRadius: 30, padding: '6px 18px', border: `2px dashed ${DIM}66`}}>{children}</div></Row>
);
export const Photo: React.FC<{src: string; x: number; y: number; w: number; h: number; q?: number; r?: number; pos?: string; children?: React.ReactNode; filter?: string; o?: number; style?: React.CSSProperties}> = ({src, x, y, w, h, q = 1, r = 0, pos = 'center', children, filter, o = 1, style}) => {
  const t = useT();
  return (
    <Abs x={x} y={y} w={w} h={h} style={{borderRadius: 28, overflow: 'hidden', border: '8px solid #fff', boxShadow: '0 26px 50px rgba(20,33,61,0.28)', transform: `scale(${q}) rotate(${r}deg)`, opacity: o, ...style}}>
      <Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${1.04 + (t % 40) * 0.003})`, filter}} />
      {children}
    </Abs>
  );
};
/** Fenêtre d'apparition d'une scène : fondu + légère montée. */
export const Sc: React.FC<{a: number; b: number; children: React.ReactNode; f?: number}> = ({a, b, children, f = 0.35}) => {
  const t = useT();
  if (t < a - 0.02 || t > b + 0.02) return null;
  return <AbsoluteFill style={{opacity: win(t, a, b, f), transform: `translateY(${(1 - prog(t, a, a + 0.5, easeOut)) * 40}px)`}}>{children}</AbsoluteFill>;
};

/**
 * Fil rouge : l'immeuble « Système qualité » qui gagne un étage par partie.
 * floors ∈ [0, 5] (fractionnaire = étage en cours de pose par la grue), line = version trait (plan d'architecte).
 */
const FLOOR_C = [YEL, BLUE, GREEN, VIO, RED];
const FLOOR_L = ['Implémenter', 'Pourquoi', 'Diagnostic', 'Plan', 'Choix'];
export const Tower: React.FC<{w: number; floors: number; line?: boolean; crane?: boolean; labels?: boolean; flag?: number}> = ({w, floors, line = false, crane = false, labels = false, flag = 0}) => {
  const fh = w * 0.3;
  const slab = fh * 0.32;
  const H = slab + fh * 5 + fh * 1.6;
  const full = Math.floor(floors + 1e-6);
  const part = floors - full;
  const stroke = Math.max(2, w * 0.014);
  const fl = (k: number, y: number, o = 1, dashed = false) => {
    const c = FLOOR_C[k];
    return (
      <div key={k} style={{position: 'absolute', left: w * 0.08, width: w * 0.84, bottom: y, height: fh - stroke, opacity: o, borderRadius: w * 0.02, background: line ? 'transparent' : c, border: line ? `${stroke}px ${dashed ? 'dashed' : 'solid'} #fff` : `${stroke}px solid ${INK}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
        {Array.from({length: 4}, (_, i) => <div key={i} style={{width: w * 0.11, height: fh * 0.42, borderRadius: w * 0.012, background: line ? 'transparent' : '#FFFFFFCC', border: line ? `${stroke * 0.7}px solid #ffffffAA` : `${stroke * 0.6}px solid ${INK}55`}} />)}
        {labels && <div style={{position: 'absolute', left: '104%', top: '50%', transform: 'translateY(-50%)', fontFamily: sansFont, fontWeight: 800, fontSize: w * 0.065, color: line ? '#fff' : INK, whiteSpace: 'nowrap'}}>{k + 1}. {FLOOR_L[k]}</div>}
      </div>
    );
  };
  const nextY = slab + full * fh;
  const drop = (1 - easeOut(Math.min(1, part / 0.85))) * fh * 1.4;
  return (
    <div style={{position: 'relative', width: w, height: H}}>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: slab, background: line ? 'transparent' : INK, border: line ? `${stroke}px solid #fff` : 'none', borderRadius: w * 0.015, boxSizing: 'border-box'}} />
      {Array.from({length: Math.min(5, full)}, (_, k) => fl(k, slab + k * fh))}
      {full < 5 && part > 0.001 && fl(full, nextY + drop, Math.min(1, part * 3), true)}
      {crane && full < 5 && (
        <>
          <div style={{position: 'absolute', right: -w * 0.18, bottom: 0, width: stroke * 2.2, height: H, background: line ? '#fff' : INK}} />
          <div style={{position: 'absolute', right: -w * 0.18, top: 0, width: w * 0.9, height: stroke * 2.2, background: line ? '#fff' : INK}} />
          <div style={{position: 'absolute', left: w * 0.5, top: 0, width: stroke, height: H - (nextY + drop + fh), background: line ? '#fff' : INK, opacity: part > 0.001 ? 1 : 0.4}} />
        </>
      )}
      {flag > 0 && (
        <div style={{position: 'absolute', left: w * 0.5, bottom: slab + 5 * fh, transformOrigin: '0 100%', transform: `scaleY(${flag})`}}>
          <div style={{width: stroke * 1.6, height: fh * 1.3, background: INK}} />
          <div style={{position: 'absolute', left: stroke * 1.6, top: 0, width: w * 0.3, height: fh * 0.5, background: GREEN, clipPath: 'polygon(0 0, 100% 50%, 0 100%)', transform: `skewY(${Math.sin(flag * 20) * 4}deg)`}} />
        </div>
      )}
    </div>
  );
};

/* ─────────── Couverture ─────────── */
export const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('promo/terrain-controle.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1000, objectFit: 'cover', objectPosition: '60% 30%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 32%, ${PAPER}DD 47%, ${PAPER} 53%)`}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={60} y={930} w={960} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>DIAGNOSTIC · STRATÉGIE DE DÉPLOIEMENT</div>
        <T size={110} style={{marginTop: 24, textTransform: 'uppercase', letterSpacing: -3}}>Implémenter</T>
        <T size={130} style={{textTransform: 'uppercase', letterSpacing: -4}}><span style={{background: YEL, padding: '0 22px', borderRadius: 18}}>l'ISO 9001</span></T>
        <T size={62} color={DIM} style={{marginTop: 14, textTransform: 'uppercase'}}>dans le monde réel</T>
        <Hand size={54} color={GREEN} style={{marginTop: 16}}>Au-delà du manuel : la réalité du terrain</Hand>
      </Abs>
      <Abs x={440} y={1500}><Tower w={200} floors={5} flag={1} /></Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Transition : le plan d'architecte qui se déroule ─────────── */
export const Blueprint: React.FC<{p: Pt}> = ({p}) => {
  const t = useT();
  const a = p.at, b = p.at + WIPE;
  if (t < a || t > b) return null;
  const down = prog(t, a, a + 0.55, easeOut);
  const up = prog(t, b - 0.5, b, easeIn);
  const hgt = 1920 * (down - up);
  const draw = prog(t, a + 0.35, a + 1.3, easeInOut);
  return (
    <AbsoluteFill style={{zIndex: 55, pointerEvents: 'none'}}>
      <AbsoluteFill style={{background: INK, opacity: 0.35 * (down - up)}} />
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: hgt, overflow: 'hidden', background: BP, boxShadow: '0 30px 60px rgba(0,0,0,0.45)'}}>
        <div style={{position: 'absolute', inset: 0, height: 1920, backgroundImage: 'linear-gradient(rgba(255,255,255,0.12) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.12) 2px, transparent 2px), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '120px 120px, 120px 120px, 24px 24px, 24px 24px'}} />
        <div style={{position: 'absolute', left: 50, top: 50, right: 50, height: 1820, border: '3px solid rgba(255,255,255,0.6)'}} />
        <svg width={1080} height={700} style={{position: 'absolute', left: 0, top: 260}}>
          <text x={540} y={520} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={560} fill="none" stroke="#fff" strokeWidth={6} strokeDasharray={3000} strokeDashoffset={3000 * (1 - draw)}>{p.n}</text>
          <line x1={200} y1={600} x2={200 + 680 * draw} y2={600} stroke="#fff" strokeWidth={3} />
          <text x={540} y={650} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={700} fontSize={30} fill="#ffffffcc" letterSpacing={8}>PARTIE {p.n}/5 · ÉTAGE {p.n}</text>
        </svg>
        <div style={{position: 'absolute', left: 60, right: 60, top: 980, textAlign: 'center', opacity: prog(t, a + 0.6, a + 1.0)}}>
          <T size={80} color="#fff">{p.l}</T>
          <Hand size={56} color={p.c === BLUE ? '#9CC1FF' : p.c} style={{marginTop: 14}}>{p.sub}</Hand>
        </div>
        <div style={{position: 'absolute', left: 440, top: 1220, opacity: prog(t, a + 0.7, a + 1.1)}}>
          <Tower w={200} floors={p.n - 1 + prog(t, a + 0.9, a + 1.8)} line crane />
        </div>
        <div style={{position: 'absolute', right: 70, top: 1760, fontFamily: 'monospace', color: '#ffffffaa', fontSize: 24, textAlign: 'right'}}>PLAN N° 9001-{p.n} · ÉCH. 1:100</div>
      </div>
      <div style={{position: 'absolute', left: -20, top: hgt - 34, width: 1120, height: 68, borderRadius: 34, background: 'linear-gradient(180deg, #5C8BD8, #163C80 60%, #0E2A5C)', boxShadow: '0 16px 30px rgba(0,0,0,0.4)', opacity: hgt > 2 && hgt < 1915 ? 1 : 0}} />
    </AbsoluteFill>
  );
};

/* ─────────── En-tête, fond ─────────── */
export const Header: React.FC = () => {
  const t = useT();
  const p = PT.find((x) => t >= x.at + WIPE - 0.3 && t < x.end);
  const intro = t > 2.6 && t < 47.6;
  const floors = p ? p.n - 1 + prog(t, p.at + WIPE, p.end - 0.5) : t >= 300 ? 5 : 0;
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 80, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {(intro || p) && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 214, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 16, opacity: intro ? pop(t, 2.6) * (1 - prog(t, 47.2, 47.6)) : p ? pop(t, p.at + WIPE - 0.3) * (1 - prog(t, p.end - 0.3, p.end)) : 1}}>
          <Tower w={60} floors={floors} />
          <div style={{padding: '6px 20px', borderRadius: 40, background: '#fff', border: `3px solid ${p ? p.c : INK}`, marginBottom: 4}}><T size={30}>{p ? `${p.n}. ${p.l}` : 'Implémenter l’ISO 9001'}</T></div>
        </div>
      )}
    </AbsoluteFill>
  );
};
export const Bg: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill style={{background: PAPER}}>
      <AbsoluteFill style={{backgroundImage: 'linear-gradient(rgba(20,33,61,0.045) 2px, transparent 2px), linear-gradient(90deg, rgba(20,33,61,0.045) 2px, transparent 2px)', backgroundSize: '60px 60px', backgroundPosition: `0 ${(t * 5) % 60}px`}} />
      <div style={{position: 'absolute', right: -170, top: 320 + Math.sin(t * 0.3) * 40, width: 440, height: 440, borderRadius: 220, background: `${YEL}22`}} />
      <div style={{position: 'absolute', left: -150, top: 1250 + Math.cos(t * 0.25) * 40, width: 380, height: 380, borderRadius: 190, background: `${BLUE}10`}} />
    </AbsoluteFill>
  );
};
