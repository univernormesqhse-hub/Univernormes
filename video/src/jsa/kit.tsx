import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, prog, useT} from '../anim';
import {handFont, sansFont} from '../theme';

/* Palette « papier quadrillé » de la série (comme la capsule ISO 9001) ; WHITE = encre du texte, PANEL = carte blanche. */
export const LOGO = 'promo/logo.png';
export const PAPER = '#F8F5EC';
export const NIGHT = '#14213D';
export const PANEL = '#FFFFFF';
export const LINE = '#D5DBE6';
export const WHITE = '#14213D';
export const DIM = '#5B6577';
export const BLUE = '#2F6FDB';
export const CYAN = '#1E9BD7';
export const GREEN = '#1FA67A';
export const ORANGE = '#F28C1E';
export const YEL = '#F5B700';
export const RED = '#E5484D';
export const VIO = '#7B5CD6';
export const BP = '#1C4C9C';
export const PH = (p: string) => staticFile(p);

export type Pt = {n: number; l: string; sub: string; at: number; end: number; c: string};
export const PT: Pt[] = [
  {n: 1, l: 'Les fondements', sub: 'L’outil de référence QHSE', at: 53.4, end: 92.5, c: BLUE},
  {n: 2, l: 'La méthode en 4 étapes', sub: 'Choisir · Décomposer · Identifier · Contrôler', at: 92.5, end: 144.6, c: GREEN},
  {n: 3, l: 'Applications pratiques', sub: 'Exemples sur le terrain', at: 144.6, end: 252.9, c: ORANGE},
  {n: 4, l: 'Les critères', sub: 'Quand déclencher la JSA ?', at: 252.9, end: 284.5, c: YEL},
  {n: 5, l: 'JSA ou évaluation ?', sub: 'Macro contre micro', at: 284.5, end: 314.6, c: VIO},
  {n: 6, l: 'L’atout entretien', sub: 'Valoriser son expertise', at: 314.6, end: 366.5, c: RED},
];
export const WIPE = 2.4;
export const OUTRO_AT = 392.8;

export const pop = (t: number, at: number, d = 0.4) => prog(t, at, at + d, easeOut);
export const spring = (t: number, at: number, k = 7, w = 15) => {
  const x = t - at;
  return x <= 0 ? 0 : 1 - Math.exp(-x * k) * Math.cos(x * w);
};
export const win = (t: number, a: number, b: number, f = 0.4) => prog(t, a, a + f) * (1 - prog(t, b - f, b));
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
export {easeIn, easeInOut, easeOut, prog, useT};

export const T: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 40, color = WHITE, style}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, letterSpacing: -0.5, lineHeight: 1.08, ...style}}>{children}</div>
);
export const Hand: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 48, color = WHITE, style}) => (
  <div style={{fontFamily: handFont, fontSize: size, color, lineHeight: 1.1, ...style}}>{children}</div>
);
export const Mono: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 26, color = CYAN, style}) => (
  <div style={{fontFamily: 'monospace', fontWeight: 700, fontSize: size, color, letterSpacing: 2, ...style}}>{children}</div>
);
export const Abs: React.FC<{x: number; y: number; w?: number; h?: number; children?: React.ReactNode; style?: React.CSSProperties}> = ({x, y, w, h, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, ...style}}>{children}</div>
);
export const Chip: React.FC<{children: React.ReactNode; c?: string; q?: number; size?: number; dark?: boolean; style?: React.CSSProperties}> = ({children, c = BLUE, q = 1, size = 34, dark = false, style}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 26px', borderRadius: 50, background: c, color: dark ? NIGHT : '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: size, transform: `scale(${q})`, boxShadow: `0 12px 28px ${c}55`, whiteSpace: 'nowrap', ...style}}>{children}</div>
);
export const Row: React.FC<{y: number; children: React.ReactNode; gap?: number}> = ({y, children, gap = 14}) => (
  <Abs x={0} y={y} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap, flexWrap: 'wrap', padding: '0 40px', boxSizing: 'border-box'}}>{children}</Abs>
);
export const Title: React.FC<{children: React.ReactNode; y?: number; size?: number; o?: number}> = ({children, y = 330, size = 56, o = 1}) => (
  <Abs x={50} y={y} w={980} style={{textAlign: 'center', opacity: o}}><T size={size}>{children}</T></Abs>
);
/** Surligneur : texte encre, trait de couleur sous les mots. */
export const Glow: React.FC<{children: React.ReactNode; c?: string}> = ({children, c = CYAN}) => <span style={{backgroundImage: `linear-gradient(${c}77, ${c}77)`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 42%', backgroundPosition: '0 88%', padding: '0 4px'}}>{children}</span>;
/** Panneau HUD : fond translucide, coins en équerre lumineux. */
export const Hud: React.FC<{x: number; y: number; w: number; h: number; c?: string; children?: React.ReactNode; style?: React.CSSProperties}> = ({x, y, w, h, c = CYAN, children, style}) => {
  const k = 34;
  const cor = (s: React.CSSProperties) => <div style={{position: 'absolute', width: k, height: k, borderColor: c, borderStyle: 'solid', borderWidth: 0, ...s}} />;
  return (
    <Abs x={x} y={y} w={w} h={h} style={{background: PANEL, borderRadius: 18, boxShadow: `0 0 0 2px ${c}44, 0 24px 50px rgba(20,33,61,0.16)`, ...style}}>
      {cor({left: -6, top: -6, borderLeftWidth: 5, borderTopWidth: 5})}
      {cor({right: -6, top: -6, borderRightWidth: 5, borderTopWidth: 5})}
      {cor({left: -6, bottom: -6, borderLeftWidth: 5, borderBottomWidth: 5})}
      {cor({right: -6, bottom: -6, borderRightWidth: 5, borderBottomWidth: 5})}
      {children}
    </Abs>
  );
};
export const Cite: React.FC<{y: number; children: React.ReactNode; o?: number}> = ({y, children, o = 1}) => (
  <Row y={y}><div style={{opacity: o, fontFamily: sansFont, fontWeight: 700, fontSize: 24, color: DIM, border: `2px dashed ${DIM}66`, borderRadius: 30, padding: '6px 18px'}}>{children}</div></Row>
);
export const Photo: React.FC<{src: string; x: number; y: number; w: number; h: number; q?: number; r?: number; pos?: string; children?: React.ReactNode; filter?: string; o?: number; c?: string}> = ({src, x, y, w, h, q = 1, r = 0, pos = 'center', children, filter, o = 1, c = CYAN}) => {
  const t = useT();
  return (
    <Abs x={x} y={y} w={w} h={h} style={{borderRadius: 24, overflow: 'hidden', border: '8px solid #fff', boxShadow: `0 0 0 3px ${c}, 0 26px 50px rgba(20,33,61,0.28)`, transform: `scale(${q}) rotate(${r}deg)`, opacity: o}}>
      <Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${1.04 + (t % 40) * 0.003})`, filter}} />
      {children}
    </Abs>
  );
};
export const Sc: React.FC<{a: number; b: number; children: React.ReactNode; f?: number}> = ({a, b, children, f = 0.35}) => {
  const t = useT();
  if (t < a - 0.02 || t > b + 0.02) return null;
  return <AbsoluteFill style={{opacity: win(t, a, b, f), transform: `scale(${1.03 - prog(t, a, a + 0.5, easeOut) * 0.03})`}}>{children}</AbsoluteFill>;
};

/** Cadenas de consignation : closed 0 = anse levée, 1 = verrouillé. */
export const Padlock: React.FC<{size: number; c: string; closed: number; n?: number}> = ({size, c, closed, n}) => {
  const lift = (1 - closed) * size * 0.28;
  return (
    <div style={{position: 'relative', width: size, height: size * 1.3}}>
      <svg width={size} height={size * 0.75} style={{position: 'absolute', left: 0, top: -lift, transform: `rotate(${(1 - closed) * -18}deg)`, transformOrigin: '78% 100%'}}>
        <path d={`M ${size * 0.24} ${size * 0.75} L ${size * 0.24} ${size * 0.4} A ${size * 0.26} ${size * 0.26} 0 0 1 ${size * 0.76} ${size * 0.4} L ${size * 0.76} ${size * 0.75}`} fill="none" stroke="#8C9AB8" strokeWidth={size * 0.11} />
      </svg>
      <div style={{position: 'absolute', left: 0, top: size * 0.55, width: size, height: size * 0.75, borderRadius: size * 0.14, background: `linear-gradient(160deg, ${c}, ${c}AA)`, boxShadow: closed > 0.95 ? `0 0 ${size * 0.4}px ${c}AA` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.34, color: '#fff'}}>
        {n ?? <div style={{width: size * 0.14, height: size * 0.28, borderRadius: size * 0.07, background: NIGHT}} />}
      </div>
    </div>
  );
};
/** Fil rouge : le tableau de consignation à 6 cadenas. locked ∈ [0, 6]. */
export const LotoBoard: React.FC<{size: number; locked: number; nums?: boolean}> = ({size, locked, nums = false}) => (
  <div style={{display: 'flex', gap: size * 0.22, padding: `${size * 0.2}px ${size * 0.3}px ${size * 0.15}px`, background: `${PANEL}`, borderRadius: size * 0.2, border: `${Math.max(2, size * 0.04)}px solid ${LINE}`}}>
    {PT.map((p, i) => <Padlock key={i} size={size} c={locked > i ? p.c : '#46557A'} closed={Math.max(0, Math.min(1, locked - i))} n={nums ? i + 1 : undefined} />)}
  </div>
);

/* ─────────── Couverture ─────────── */
export const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('soudage/soudeur-etincelles.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1040, objectFit: 'cover', objectPosition: '55% 50%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 32%, ${PAPER}DD 47%, ${PAPER} 53%)`}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.4)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={60} y={900} w={960} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: NIGHT, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>JOB SAFETY ANALYSIS · JSA / JHA</div>
        <T size={96} style={{marginTop: 26, textTransform: 'uppercase', letterSpacing: -2}}>Maîtrise de la</T>
        <T size={240} style={{letterSpacing: 6, lineHeight: 1}}><span style={{background: YEL, padding: '0 34px', borderRadius: 24}}>JSA</span></T>
        <T size={50} color={DIM} style={{marginTop: 10}}>Analyser chaque étape. Neutraliser le danger <span style={{color: GREEN}}>avant</span>.</T>
      </Abs>
      <Row y={1500}><LotoBoard size={78} locked={6} /></Row>
    </AbsoluteFill>
  );
};

/* ─────────── Transition : balayage laser du scanner ─────────── */
export const ScanWipe: React.FC<{p: Pt}> = ({p}) => {
  const t = useT();
  const a = p.at, b = p.at + WIPE;
  if (t < a || t > b) return null;
  const down = prog(t, a, a + 0.55, easeInOut);
  const up = prog(t, b - 0.5, b, easeInOut);
  const top = up * 1920, bot = down * 1920;
  const ly = up > 0 ? top : bot;
  const roll = prog(t, a + 0.4, a + 1.0, (x) => x);
  const dig = roll < 1 ? Math.floor(roll * 30) % 10 : p.n;
  const lock = prog(t, a + 1.15, a + 1.35, easeIn);
  return (
    <AbsoluteFill style={{zIndex: 55, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: 0, right: 0, top, height: Math.max(0, bot - top), overflow: 'hidden', background: BP}}>
        <div style={{position: 'absolute', left: 0, top: -top, width: 1080, height: 1920}}>
          <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.12) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.12) 2px, transparent 2px)', backgroundSize: '90px 90px'}} />
          <div style={{position: 'absolute', left: 540 - 420, top: 520, width: 840, height: 840, borderRadius: 420, border: '3px dashed rgba(255,255,255,0.35)', transform: `rotate(${t * 40}deg)`}} />
          <Abs x={0} y={470} w={1080} style={{textAlign: 'center'}}>
            <Mono size={34} color="#ffffffcc">// MODULE {String(p.n).padStart(2, '0')} / 06</Mono>
            <T size={300} color="#fff" style={{marginTop: 10, textShadow: `0 0 50px ${p.c}`}}>0{dig}</T>
          </Abs>
          <Abs x={60} y={1010} w={960} style={{textAlign: 'center', opacity: prog(t, a + 0.6, a + 1.0)}}>
            <T size={78} color="#fff">{p.l}</T>
            <Hand size={50} color={p.c === BLUE || p.c === VIO ? '#BFD4FF' : p.c} style={{marginTop: 14}}>{p.sub}</Hand>
          </Abs>
          <Abs x={540 - 70} y={1260} style={{opacity: prog(t, a + 0.7, a + 1.0), transform: `scale(${1 + Math.max(0, 1 - Math.abs(t - a - 1.35) * 5) * 0.15})`}}>
            <Padlock size={140} c={p.c} closed={lock} />
          </Abs>
        </div>
      </div>
      {ly > 2 && ly < 1918 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: ly - 3, height: 6, background: '#fff', boxShadow: `0 0 30px 10px ${p.c}, 0 0 80px 30px ${p.c}66`}} />
      )}
    </AbsoluteFill>
  );
};

/* ─────────── En-tête, fond ─────────── */
export const Header: React.FC = () => {
  const t = useT();
  const p = PT.find((x) => t >= x.at + WIPE - 0.3 && t < x.end);
  const intro = t > 2.6 && t < 53.1;
  const fin = t > 366.5;
  const locked = p ? p.n - 1 + prog(t, p.at + 1.15, p.at + 1.35) : fin ? 6 : 0;
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 80, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {(intro || p || fin) && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 214, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: intro ? pop(t, 2.6) * (1 - prog(t, 52.8, 53.1)) : p ? pop(t, p.at + WIPE - 0.3) * (1 - prog(t, p.end - 0.3, p.end)) : pop(t, 366.5)}}>
          <LotoBoard size={22} locked={locked} />
          <div style={{padding: '6px 20px', borderRadius: 40, background: `${PANEL}`, border: `3px solid ${p ? p.c : CYAN}`}}><T size={28}>{p ? `${p.n}. ${p.l}` : fin ? 'Le mot de la fin' : 'Maîtrise de la JSA'}</T></div>
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
      <div style={{position: 'absolute', right: -170, top: 320 + Math.sin(t * 0.3) * 40, width: 440, height: 440, borderRadius: 220, background: `${CYAN}18`}} />
      <div style={{position: 'absolute', left: -150, top: 1250 + Math.cos(t * 0.25) * 40, width: 380, height: 380, borderRadius: 190, background: `${YEL}22`}} />
    </AbsoluteFill>
  );
};
