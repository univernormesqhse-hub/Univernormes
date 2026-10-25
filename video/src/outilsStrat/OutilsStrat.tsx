import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Captions} from '../components/Captions';
import {Blinds, Board, Deep, Dust, Kin, Out, Pill, Stamp, Tile} from '../durab/Durab';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {handFont, s, sansFont} from '../theme';
import {Abs, Bg, DIM, easeIn, easeInOut, easeOut, GREEN, INK, lerp, LOGO, PAPER, PH, pop, prog, RED, spring, T, useT} from '../implIso/kit';
import {Brut, HiLine, Mono, Strike} from '../tdbPilot/TdbPilot';
import {captions} from './captions';
import {NeoCaptions} from '../components/NeoCaptions';

/**
 * « 14 outils d'analyse stratégique que tout manager devrait connaître » (voix d'origine, 2 min 31) — capsule
 * « condensé + effet wahou + ultra premium » présentée en métro : une ligne à 14 stations = 14 outils. Tube de verre à
 * six guichets = six familles (vision → environnement → marché → ressources → organisation → décider), la capsule file
 * d'un guichet à l'autre. Chaque outil se construit sous les yeux du spectateur (SWOT, PESTEL, Porter, Ansoff, 7S,
 * McKinsey, BCG…). Gyrophare (principal), loupe, capsule pneumatique, store vénitien ; barre de recherche qui trouve et
 * ouvre « les 14 outils du manager ». Kits capsule-ui-neo-brutal et capsule-recit-illustre. Couverture : photo +
 * « 14 OUTILS / STRATÉGIQUES » en lettres-photos animées.
 */
const IMG = {
  cover: 'sysqsse-gen/reunion.jpg',
  c14: 'sysqsse-gen/reunion.jpg',
  cStrat: 'influence-gen/bureau.jpg',
  vision: 'sysqsse-gen/architecte.jpg',
};
const BLUE = '#1F6FD1';
const NAVY = '#0E2A5C';
const ORANGE = '#F07A12';
const YEL = '#F5C400';
const BURG = '#7A1F2B';
const NIGHT = '#151A26';
const TEAL = '#0F9D8F';
const VIO = '#6D4BD8';
const GOLD = '#E0A100';
const GLASS = '#BFD7EA';
const MONO = '"JetBrains Mono", "IBM Plex Mono", "DejaVu Sans Mono", monospace';
const OUTRO_AT = 151.6;
export const OUTILS_STRAT_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 13.9, n: '1', title: 'Fixer le cap', s: 'outils 1 · 2', c: NAVY, g: 'vision', k: 'gyro', lab: 'FAMILLE 1 / 6'},
  {at: 28.0, n: '2', title: 'Lire l’environnement', s: 'outils 3 · 4 · 5', c: GREEN, g: 'environnement', k: 'loupe', lab: 'FAMILLE 2 / 6'},
  {at: 49.3, n: '3', title: 'Marché & croissance', s: 'outils 6 · 7 · 8', c: ORANGE, g: 'marché', k: 'tube', lab: 'FAMILLE 3 / 6'},
  {at: 75.5, n: '4', title: 'Ressources & valeur', s: 'outils 9 · 10 · 11', c: TEAL, g: 'ressources', k: 'store', lab: 'FAMILLE 4 / 6'},
  {at: 96.5, n: '5', title: 'Organisation', s: '7S · McKinsey · BCG', c: VIO, g: 'organisation', k: 'gyro', lab: 'FAMILLE 5 / 6'},
  {at: 130.1, n: '6', title: 'Retenez ceci', s: 'choisir · croiser · décider', c: RED, g: 'décider', k: 'gyro', lab: 'FAMILLE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 141.0;
const Count: React.FC<{n: number; a: number; b: number; from?: number; dec?: number; suf?: string}> = ({n, a, b, from = 0, dec = 0, suf = ''}) => {
  const t = useT();
  const v = lerp(from, n, prog(t, a, b, easeOut));
  return <>{v.toFixed(dec).replace('.', ',')}{suf}</>;
};
const Capsule: React.FC<{w: number; c: string; open?: number}> = ({w, c, open = 0}) => {
  const h = w * 0.36;
  return (
    <div style={{position: 'relative', width: w, height: h}}>
      <div style={{position: 'absolute', left: h * 0.3, right: h * 0.3, top: 0, bottom: 0, background: `linear-gradient(180deg, #fff, ${c} 35%, ${c} 70%, #0003)`, borderRadius: 6}} />
      <div style={{position: 'absolute', left: 0, top: 0, width: h * 0.6, height: h, borderRadius: '50%', background: 'linear-gradient(180deg, #EEE, #888)', transform: `translateX(${-open * h * 0.4}px)`}} />
      <div style={{position: 'absolute', right: 0, top: 0, width: h * 0.6, height: h, borderRadius: '50%', background: 'linear-gradient(180deg, #EEE, #888)', transform: `translateX(${open * h * 0.4}px)`}} />
      <div style={{position: 'absolute', left: '30%', right: '30%', top: '42%', height: '16%', background: 'rgba(255,255,255,0.55)', borderRadius: 4}} />
    </div>
  );
};
const Tube: React.FC<{x: number; y: number; w: number; h: number}> = ({x, y, w, h}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: h / 2, background: `linear-gradient(180deg, rgba(255,255,255,0.9), ${GLASS}88 40%, ${GLASS}CC 75%, rgba(255,255,255,0.7))`, border: `3px solid ${GLASS}`, boxShadow: 'inset 0 6px 10px rgba(255,255,255,0.8), 0 10px 20px rgba(20,33,61,0.1)'}} />
);
/** Fenêtre d'interface (barre à pastilles). */
const Win: React.FC<{x: number; y: number; w: number; h: number; at: number; title: string; c?: string; dark?: boolean; style?: React.CSSProperties; children: React.ReactNode}> = ({x, y, w, h, at, title, c = INK, dark, style, children}) => {
  const t = useT();
  const p = Math.max(0, Math.min(1, spring(t, at, 8, 13)));
  return (
    <Abs x={x} y={y} w={w} h={h} style={{background: dark ? NIGHT : '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `8px 8px 0 ${c}`, overflow: 'hidden', opacity: t >= at ? 1 : 0, transform: `translateY(${(1 - p) * 60}px) scale(${0.92 + 0.08 * p})`, ...style}}>
      <div style={{height: 44, background: dark ? '#0E1320' : '#EEF1F5', display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 14, borderBottom: `3px solid ${INK}`}}>{[RED, YEL, GREEN].map((q) => <div key={q} style={{width: 13, height: 13, borderRadius: 7, background: q}} />)}<span style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: dark ? '#8B95A8' : DIM, marginLeft: 10}}>{title}</span></div>
      <div style={{position: 'relative', height: h - 49}}>{children}</div>
    </Abs>
  );
};
/** Ligne de case cochée (brique « William »). */
const Check: React.FC<{at: number; label: string; c?: string; size?: number}> = ({at, label, c = GREEN, size = 32}) => {
  const t = useT();
  const p = pop(t, at);
  const k = prog(t, at + 0.25, at + 0.55, easeOut);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 18, background: '#fff', border: `4px solid ${INK}`, borderRadius: 14, padding: '14px 18px', boxShadow: `6px 6px 0 ${k > 0.5 ? c : '#C9D2DF'}`, opacity: p, transform: `translateX(${(1 - p) * 60}px)`}}>
      <div style={{width: 48, height: 48, borderRadius: 10, border: `4px solid ${INK}`, background: k > 0 ? c : '#fff', color: '#fff', fontWeight: 900, fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: `scale(${1 + 0.2 * Math.sin(k * Math.PI)})`}}>{k > 0.3 ? '✓' : ''}</div>
      <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color: INK}}>{label}</div>
    </div>
  );
};

/* ═════════════ Fil rouge : le tube à six guichets ═════════════ */
const Header: React.FC = () => {
  const t = useT();
  const si = sectIdx(t);
  const sx = (k: number) => 86 + k * 167;
  const a = si >= 0 ? SECT[si].at : 0;
  const pr = si < 0 ? 0 : prog(t, a, a + 1.4, easeInOut);
  const from = si <= 0 ? -0.45 : si - 1;
  const to = si < 0 ? -0.45 : si;
  const pos = lerp(from, to, pr);
  const x0 = Math.floor(pos);
  const cx = pos < 0 ? lerp(20, sx(0), pos + 1) : lerp(sx(x0), sx(Math.min(5, x0 + 1)), pos - x0);
  const c = si < 0 ? INK : SECT[si].c;
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 56, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 76, display: 'block'}} /></div>
      {t > 2.6 && t < OUTRO_AT && (
        <div style={{position: 'absolute', left: 36, right: 36, top: 178, height: 108, borderRadius: 20, background: '#fff', border: `5px solid ${INK}`, boxShadow: `7px 7px 0 ${BURG}`, opacity: pop(t, 2.6), overflow: 'hidden'}}>
          <Tube x={30} y={26} w={940} h={26} />
          {SECT.map((x, k) => {
            const passed = k < si || t >= ALLDONE;
            const here = k === si && t < ALLDONE;
            return (
              <div key={k} style={{position: 'absolute', left: sx(k) - 22, top: 16}}>
                <div style={{width: 44, height: 44, borderRadius: 10, background: passed ? GREEN : here ? x.c : '#fff', border: `4px solid ${passed || here ? '#fff' : '#C9D2DF'}`, boxShadow: here ? `0 0 0 3px ${x.c}66` : passed ? `0 0 0 3px ${GREEN}55` : 'none', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 20}}>{passed ? '✓' : here ? x.n : ''}</div>
                <div style={{position: 'absolute', left: -52, width: 148, top: 50, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 14, color: here ? x.c : passed ? GREEN : '#A9B1BE'}}>{x.g}</div>
              </div>
            );
          })}
          <div style={{position: 'absolute', left: cx - 30, top: 29, filter: pr > 0 && pr < 1 ? 'blur(1.5px)' : undefined}}><Capsule w={60} c={c} /></div>
        </div>
      )}
    </AbsoluteFill>
  );
};

/* ═════════════ Transitions ═════════════ */
const TitleBlock: React.FC<{i: number; y: number; at: number; dark?: boolean}> = ({i, y, at, dark}) => {
  const t = useT();
  const S0 = SECT[i];
  return (
    <>
      <Abs x={60} y={y} w={960} style={{textAlign: 'center'}}><Kin text={S0.title} at={at} size={S0.title.length > 20 ? 66 : 80} color={dark ? '#fff' : INK} /></Abs>
      <Abs x={0} y={y + (S0.title.length > 20 ? 190 : 120)} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-block', background: S0.c, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 2, padding: '6px 16px', borderRadius: 6, opacity: pop(t, at + 0.5)}}>{S0.s.toUpperCase()}</div></Abs>
    </>
  );
};
const Pneumatique: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const S0 = SECT[i];
  const k = t - S0.at;
  if (k < 0 || k > 3.6) return null;
  const bg = prog(t, S0.at, S0.at + 0.3, easeOut) * (1 - prog(t, S0.at + 3.25, S0.at + 3.6, easeIn));
  const arrive = prog(t, S0.at + 0.15, S0.at + 0.75, easeOut);
  const leave = prog(t, S0.at + 2.9, S0.at + 3.4, easeIn);
  const cx = leave > 0 ? lerp(540, 1500, leave) : lerp(-300, 540, arrive);
  const bump = Math.max(0, 1 - Math.abs(k - 0.78) * 8);
  const open = prog(t, S0.at + 0.8, S0.at + 1.0, easeOut) * (1 - prog(t, S0.at + 2.65, S0.at + 2.85, easeIn));
  const unroll = prog(t, S0.at + 0.95, S0.at + 1.6, easeOut) * (1 - prog(t, S0.at + 2.4, S0.at + 2.85, easeInOut));
  const H = 760;
  const word = S0.g.toUpperCase().slice(0, 7);
  return (
    <AbsoluteFill style={{zIndex: 35, opacity: bg}}>
      <AbsoluteFill style={{background: '#F3F7FB'}} />
      <AbsoluteFill style={{backgroundImage: 'linear-gradient(#DDE7F1 2px, transparent 2px), linear-gradient(90deg, #DDE7F1 2px, transparent 2px)', backgroundSize: '60px 60px', opacity: 0.8}} />
      <Tube x={-40} y={560} w={1160} h={120} />
      {unroll > 0 && (
        <div style={{position: 'absolute', left: 140, top: 650, width: 800, height: H * unroll, overflow: 'hidden', background: 'linear-gradient(90deg, #EFE3C2, #FBF4DF 12%, #FBF4DF 88%, #EFE3C2)', boxShadow: '0 30px 60px rgba(20,33,61,0.25)'}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 60, textAlign: 'center'}}><div style={{display: 'inline-block', padding: '8px 24px', border: `6px solid ${S0.c}`, borderRadius: 12, color: S0.c, fontFamily: sansFont, fontWeight: 900, fontSize: 38, letterSpacing: 3, transform: 'rotate(-4deg)', opacity: prog(t, S0.at + 1.3, S0.at + 1.45)}}>{S0.lab}</div></div>
          <div style={{position: 'absolute', left: 40, right: 40, top: 190, textAlign: 'center'}}><Kin text={S0.title} at={S0.at + 1.35} size={S0.title.length > 20 ? 60 : 76} /></div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 470, display: 'flex', justifyContent: 'center', gap: 10}}>{word.split('').map((ch, j) => <div key={j} style={{transform: `scale(${Math.max(0, Math.min(1, spring(t, S0.at + 1.6 + j * 0.06, 8, 12)))})`}}><Tile ch={ch} size={word.length > 6 ? 72 : 82} c={S0.c} /></div>)}</div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 600, textAlign: 'center'}}><div style={{display: 'inline-block', background: S0.c, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, padding: '6px 14px', borderRadius: 6}}>{S0.s.toUpperCase()}</div></div>
        </div>
      )}
      {unroll > 0 && <div style={{position: 'absolute', left: 120, top: 650 + H * unroll - 22, width: 840, height: 44, borderRadius: 22, background: 'linear-gradient(180deg, #E6D3A0, #B9995A)', boxShadow: '0 10px 20px rgba(0,0,0,0.25)'}} />}
      <div style={{position: 'absolute', left: cx - 160, top: 564, transform: `scaleX(${1 + bump * 0.08}) scaleY(${1 - bump * 0.06})`}}><Capsule w={320} c={S0.c} open={open} /></div>
    </AbsoluteFill>
  );
};
const Gyro: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const S0 = SECT[i];
  const k = t - S0.at;
  if (k < 0 || k > 3.4) return null;
  const inn = prog(t, S0.at, S0.at + 0.25, easeOut) * (1 - prog(t, S0.at + 3.0, S0.at + 3.4, easeIn));
  const band = prog(t, S0.at + 0.3, S0.at + 1.0, easeOut);
  const beam = S0.n === '!' ? '224,74,63' : '31,111,209';
  return (
    <AbsoluteFill style={{zIndex: 35, opacity: inn, overflow: 'hidden'}}>
      <AbsoluteFill style={{background: PAPER}} />
      <Bg />
      <AbsoluteFill style={{background: `conic-gradient(from ${k * 520}deg at 540px 300px, rgba(${beam},0.38) 0deg, transparent 26deg, transparent 180deg, rgba(${beam},0.38) 180deg, transparent 206deg)`, opacity: 1 - prog(t, S0.at + 1.6, S0.at + 2.4)}} />
      <div style={{position: 'absolute', left: 470, top: 250, width: 140, height: 90, borderRadius: '70px 70px 12px 12px', background: `radial-gradient(circle at 50% 40%, #fff, rgb(${beam}) 60%)`, border: `5px solid ${INK}`, boxShadow: `0 0 ${40 + 30 * Math.abs(Math.sin(k * 9))}px rgb(${beam})`}} />
      <div style={{position: 'absolute', left: -400, top: 760, width: 1900, height: 260, transform: `translateX(${lerp(-1900, 0, band)}px) rotate(-8deg)`, background: `repeating-conic-gradient(${NAVY} 0 25%, ${YEL} 0 50%) 0 0 / 130px 130px`, border: `8px solid ${INK}`}} />
      <div style={{position: 'absolute', left: 110, top: 740, width: 860, height: 300, transform: `rotate(-8deg) scale(${Math.max(0, Math.min(1, spring(t, S0.at + 0.9, 8, 12)))})`, background: '#fff', border: `7px solid ${INK}`, borderRadius: 24, boxShadow: `12px 12px 0 ${S0.c}`, display: 'flex', alignItems: 'center', gap: 26, padding: '0 30px', boxSizing: 'border-box'}}>
        <div style={{width: 150, height: 150, borderRadius: 75, background: S0.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 96, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{S0.n}</div>
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM, letterSpacing: 3}}>{S0.lab}</div><Kin text={S0.title} at={S0.at + 1.1} size={S0.title.length > 18 ? 50 : 62} /></div>
      </div>
      <Abs x={0} y={1140} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-block', background: S0.c, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 2, padding: '6px 16px', borderRadius: 6, opacity: pop(t, S0.at + 1.6)}}>{S0.s.toUpperCase()}</div></Abs>
    </AbsoluteFill>
  );
};
const Loupe: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const S0 = SECT[i];
  const k = t - S0.at;
  if (k < 0 || k > 3.5) return null;
  const slide = prog(t, S0.at, S0.at + 0.75, easeOut);
  const iris = prog(t, S0.at + 1.1, S0.at + 1.7, easeInOut);
  const out = prog(t, S0.at + 3.1, S0.at + 3.5, easeIn);
  const cx = lerp(1350, 540, slide);
  const cy = 860;
  const r = lerp(250, 1500, iris);
  return (
    <AbsoluteFill style={{zIndex: 35, opacity: 1 - out}}>
      <AbsoluteFill style={{background: `rgba(248,245,236,${0.6 * slide * (1 - iris) + iris})`}} />
      <AbsoluteFill style={{clipPath: `circle(${r}px at ${cx}px ${cy}px)`}}>
        <AbsoluteFill style={{background: PAPER}} />
        <Bg />
        <AbsoluteFill style={{background: `radial-gradient(circle at ${cx}px ${cy}px, ${S0.c}22, transparent 60%)`}} />
        <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center', transform: `scale(${lerp(1.5, 1, iris)})`}}><Tile ch={S0.n} size={170} c={S0.c} /></Abs>
        <TitleBlock i={i} y={790} at={S0.at + 0.4} />
      </AbsoluteFill>
      {iris < 1 && (
        <>
          <div style={{position: 'absolute', left: cx - r, top: cy - r, width: r * 2, height: r * 2, borderRadius: '50%', border: `${lerp(26, 6, iris)}px solid ${INK}`, boxShadow: 'inset 0 0 40px rgba(255,255,255,0.6), 0 30px 60px rgba(20,33,61,0.3)', opacity: 1 - iris}} />
          <div style={{position: 'absolute', left: cx + r * 0.68, top: cy + r * 0.68, width: 60, height: 300, background: `linear-gradient(90deg, ${NIGHT}, #4A5468, ${NIGHT})`, borderRadius: 30, transform: 'rotate(-45deg)', transformOrigin: '50% 0', opacity: 1 - iris}} />
        </>
      )}
    </AbsoluteFill>
  );
};
/** Le store vénitien : les lamelles se ferment, portent le titre, puis se rouvrent sur la scène suivante. */
const Store: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const S0 = SECT[i];
  const k = t - S0.at;
  if (k < 0 || k > 3.5) return null;
  const n = 12;
  const lh = 1920 / n;
  const show = prog(t, S0.at + 0.55, S0.at + 0.8) * (1 - prog(t, S0.at + 2.7, S0.at + 2.9));
  return (
    <AbsoluteFill style={{zIndex: 35}}>
      {Array.from({length: n}, (_, j) => {
        const close = prog(t, S0.at + j * 0.035, S0.at + 0.4 + j * 0.035, easeOut);
        const open = prog(t, S0.at + 2.85 + j * 0.035, S0.at + 3.2 + j * 0.035, easeIn);
        const p = close * (1 - open);
        return (
          <div key={j} style={{position: 'absolute', left: 0, right: 0, top: j * lh, height: lh + 1, perspective: 1200}}>
            <div style={{width: '100%', height: '100%', transform: `rotateX(${(1 - p) * 88}deg)`, background: `linear-gradient(180deg, ${j % 2 ? '#FBF4E4' : '#F4EAD2'}, ${j % 2 ? '#EADCB9' : '#E3D2AA'})`, boxShadow: 'inset 0 -6px 10px rgba(0,0,0,0.12), 0 2px 0 rgba(0,0,0,0.08)', opacity: p > 0.01 ? 1 : 0}} />
          </div>
        );
      })}
      <div style={{position: 'absolute', left: 520, top: 0, width: 8, height: 1920 * prog(t, S0.at + 0.3, S0.at + 0.7) * (1 - prog(t, S0.at + 2.85, S0.at + 3.2)), background: '#B39A6A'}} />
      <AbsoluteFill style={{opacity: show}}>
        <Abs x={0} y={520} w={1080} style={{textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 40, letterSpacing: 6, color: DIM}}>{S0.lab}</Abs>
        <Abs x={0} y={610} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Tile ch={S0.n} size={150} c={S0.c} /></Abs>
        <TitleBlock i={i} y={830} at={S0.at + 0.7} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};


/* ═════════════ Barre de recherche qui trouve et OUVRE l'élément ═════════════ */
const SearchOpen: React.FC<{x: number; y: number; w: number; h: number; at: number; query: string; results: string[]; found: number; foundAt: number; clickAt: number; c: string; children: React.ReactNode}> = ({x, y, w, h, at, query, results, found, foundAt, clickAt, c, children}) => {
  const t = useT();
  const typeEnd = at + 0.3 + query.length * 0.05;
  const typed = Math.floor(prog(t, at + 0.3, typeEnd) * query.length);
  const drop = prog(t, typeEnd + 0.1, typeEnd + 0.5, easeOut);
  const hit = prog(t, foundAt, foundAt + 0.3, easeOut);
  const cur = prog(t, foundAt + 0.1, clickAt, easeInOut);
  const open = prog(t, clickAt + 0.15, clickAt + 0.85, easeInOut);
  const rowH = 86;
  const ry = y + 130 + found * rowH;
  const rowRect = {l: x + 30, t: ry, w: w - 60, h: rowH};
  const box = {l: lerp(rowRect.l, x, open), t: lerp(rowRect.t, y, open), w: lerp(rowRect.w, w, open), h: lerp(rowRect.h, h, open)};
  const ring = (t - clickAt) / 0.6;
  return (
    <>
      <Abs x={x} y={y} w={w} style={{opacity: pop(t, at) * (1 - open), transform: `translateY(${(1 - pop(t, at)) * 30}px)`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, height: 104, background: '#fff', border: `5px solid ${INK}`, borderRadius: 52, boxShadow: `8px 8px 0 ${c}`, padding: '0 30px'}}>
          <F n="loupe" size={62} />
          <div style={{flex: 1, fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: INK, whiteSpace: 'nowrap', overflow: 'hidden'}}>{query.slice(0, typed)}<span style={{opacity: Math.sin(t * 12) > 0 ? 1 : 0, color: c}}>|</span></div>
          <div style={{width: 64, height: 64, borderRadius: 32, background: c, color: '#fff', fontWeight: 900, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + 0.25 * Math.max(0, 1 - Math.abs(t - typeEnd) * 6)})`}}>↵</div>
        </div>
        <div style={{margin: '22px 30px 0', background: '#fff', border: `4px solid ${INK}`, borderRadius: 22, overflow: 'hidden', height: drop * results.length * rowH, boxShadow: '0 20px 40px rgba(20,33,61,0.15)'}}>
          {results.map((r, k) => {
            const isF = k === found && hit > 0;
            const scanning = hit === 0 && Math.floor((t * 3) % results.length) === k;
            return (
              <div key={k} style={{display: 'flex', alignItems: 'center', gap: 14, height: rowH, boxSizing: 'border-box', padding: '0 24px', borderBottom: '2px solid #EEF1F5', background: isF ? `${c}22` : scanning ? '#F2F6FC' : '#fff', opacity: pop(t, typeEnd + 0.4 + k * 0.12)}}>
                <div style={{width: 14, height: 14, borderRadius: 7, background: isF ? c : '#C9D2DF'}} />
                <div style={{flex: 1, fontFamily: sansFont, fontWeight: isF ? 900 : 700, fontSize: 27, color: isF ? INK : DIM}}>{r}</div>
                {isF && <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: '#fff', background: c, padding: '4px 12px', borderRadius: 6, transform: `scale(${hit})`}}>TROUVÉ ✓</div>}
              </div>
            );
          })}
        </div>
      </Abs>
      {t > foundAt && open < 1 && (
        <div style={{position: 'absolute', left: lerp(x + w - 120, rowRect.l + rowRect.w * 0.55, cur), top: lerp(y + 40, ry + 40, cur), zIndex: 20, transform: `scale(${t > clickAt && t < clickAt + 0.15 ? 0.85 : 1})`}}>
          <svg width={54} height={66} viewBox="0 0 24 30"><path d="M2 2 L2 24 L8 18 L12 28 L16 26 L12 17 L20 17 Z" fill="#fff" stroke={INK} strokeWidth={2} strokeLinejoin="round" /></svg>
        </div>
      )}
      {ring > 0 && ring < 1 && <div style={{position: 'absolute', left: rowRect.l + rowRect.w * 0.55 - ring * 90, top: ry + 40 - ring * 90, width: ring * 180, height: ring * 180, borderRadius: '50%', border: `6px solid ${c}`, opacity: 1 - ring, zIndex: 19}} />}
      {open > 0 && (
        <div style={{position: 'absolute', left: box.l, top: box.t, width: box.w, height: box.h, background: '#fff', border: `5px solid ${INK}`, borderRadius: lerp(14, 26, open), boxShadow: `10px 10px 0 ${c}`, overflow: 'hidden', zIndex: 10}}>
          <div style={{height: 50, background: `${c}22`, borderBottom: `3px solid ${INK}`, display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 18, fontFamily: MONO, fontWeight: 700, fontSize: 20, color: INK}}><span style={{color: c}}>●</span>{results[found]}</div>
          <div style={{position: 'relative', height: h - 55, opacity: prog(t, clickAt + 0.7, clickAt + 1.0)}}>{children}</div>
        </div>
      )}
    </>
  );
};

/* ═════════════ Couverture ═════════════ */
const Card: React.FC<{x: number; y: number; w: number; h: number; at: number; c: string; children: React.ReactNode; style?: React.CSSProperties}> = ({x, y, w, h, at, c, children, style}) => {
  const t = useT();
  const p = Math.max(0, Math.min(1, spring(t, at, 8, 13)));
  return <Abs x={x} y={y} w={w} h={h} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${c}`, overflow: 'hidden', opacity: t >= at ? 1 : 0, transform: `translateY(${(1 - p) * 50}px) scale(${0.9 + 0.1 * p})`, ...style}}>{children}</Abs>;
};
const IcoLab: React.FC<{ic: string; l: string; size?: number; fs?: number; c?: string}> = ({ic, l, size = 100, fs = 28, c = INK}) => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 10, textAlign: 'center', padding: '0 10px'}}><F n={ic} size={size} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: fs, color: c, lineHeight: 1.1}}>{l}</div></div>
);
/* ═════════════ Briques « ultra premium » ═════════════ */
/** Reflet lumineux qui balaie une surface (à placer dans un parent overflow: hidden). */
const Shine: React.FC<{at: number; dur?: number; every?: number}> = ({at, dur = 0.9, every = 0}) => {
  const t = useT();
  const k = every > 0 && t > at ? ((t - at) % every) : t - at;
  if (k < 0 || k > dur) return null;
  const p = k / dur;
  return <div style={{position: 'absolute', top: -40, bottom: -40, left: `${lerp(-60, 140, p)}%`, width: '35%', background: 'linear-gradient(100deg, transparent, rgba(255,255,255,0.75), transparent)', transform: 'skewX(-18deg)', pointerEvents: 'none', zIndex: 5}} />;
};
/** Carte en verre dépoli à ombre colorée et reflet. */
const GlassCard: React.FC<{x: number; y: number; w: number; h: number; at: number; c: string; children: React.ReactNode; tilt?: number}> = ({x, y, w, h, at, c, children, tilt = 0}) => {
  const t = useT();
  const p = Math.max(0, Math.min(1, spring(t, at, 8, 13)));
  return (
    <Abs x={x} y={y} w={w} h={h} style={{opacity: t >= at ? 1 : 0, transform: `perspective(1400px) rotateY(${(1 - p) * 35 + tilt}deg) translateY(${(1 - p) * 60}px)`, borderRadius: 26, background: 'linear-gradient(145deg, rgba(255,255,255,0.92), rgba(255,255,255,0.62))', border: `4px solid ${INK}`, boxShadow: `0 24px 50px ${c}44, 8px 8px 0 ${c}`, overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 20% 0%, ${c}22, transparent 60%)`}} />
      {children}
      <Shine at={at + 0.3} />
    </Abs>
  );
};
const Num: React.FC<{n: number | string; c: string; size?: number}> = ({n, c, size = 90}) => (
  <div style={{width: size, height: size, borderRadius: size / 2, background: `radial-gradient(circle at 35% 30%, #fff8, ${c} 55%)`, border: `5px solid ${INK}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.55, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 0 18px ${c}88`}}>{n}</div>
);


/* ═════════════ Briques communes ═════════════ */
const Pic: React.FC<{src: string; ic: string; w: number; h: number; zoom?: number; pos?: string; filter?: string}> = ({src, ic, w, h, zoom = 1, pos = 'center', filter}) => (src ? <Img src={PH(src)} style={{width: w, height: h, objectFit: 'cover', objectPosition: pos, transform: `scale(${zoom})`, display: 'block', filter}} /> : <div style={{width: w, height: h, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F4F6FA', filter}}><F n={ic} size={Math.min(w, h) * 0.5} /></div>);
const Shot: React.FC<{src: string; ic: string; x: number; y: number; w: number; h: number; at: number; pos?: string; blinds?: boolean; c?: string; children?: React.ReactNode; filter?: string}> = ({src, ic, x, y, w, h, at, pos = '50% 40%', blinds, c = INK, children, filter}) => {
  const t = useT();
  if (src) return blinds ? (t > at ? <Blinds src={src} x={x} y={y} w={w} h={h} at={at} pos={pos} filter={filter}>{children}</Blinds> : null) : <Deep src={src} x={x} y={y} w={w} h={h} at={at} pos={pos} filter={filter}>{children}</Deep>;
  return <Abs x={x} y={y} w={w} h={h} style={{background: '#F4F6FA', border: `5px solid ${INK}`, borderRadius: 30, boxShadow: `8px 8px 0 ${c}`, overflow: 'hidden', opacity: pop(t, at), display: 'flex', alignItems: 'center', justifyContent: 'center', filter}}><F n={ic} size={Math.min(w, h) * 0.5} />{children}</Abs>;
};
const PneuDeliver: React.FC<{x: number; y: number; w: number; at: number; c: string}> = ({x, y, w, at, c}) => {
  const t = useT();
  const p = prog(t, at, at + 0.7, easeInOut);
  if (t < at - 0.2) return null;
  return (
    <Abs x={x} y={y} w={w} h={60} style={{opacity: 1 - prog(t, at + 0.9, at + 1.3)}}>
      <Tube x={0} y={14} w={w} h={30} />
      <div style={{position: 'absolute', left: lerp(-40, w - 60, p), top: 16, filter: p > 0 && p < 1 ? 'blur(2px)' : undefined}}><Capsule w={70} c={c} /></div>
    </Abs>
  );
};
const LoupeSweep: React.FC<{x0: number; y0: number; x1: number; y1: number; a: number; b: number; size?: number}> = ({x0, y0, x1, y1, a, b, size = 200}) => {
  const t = useT();
  const p = prog(t, a, b, easeInOut);
  if (t < a || t > b + 0.4) return null;
  return (
    <div style={{position: 'absolute', left: lerp(x0, x1, p), top: lerp(y0, y1, p), width: size, height: size, borderRadius: '50%', border: `${size * 0.05}px solid ${INK}`, background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.65), rgba(191,215,234,0.3) 60%)', boxShadow: '0 12px 30px rgba(0,0,0,0.25)', zIndex: 8, opacity: 1 - prog(t, b, b + 0.4)}}>
      <div style={{position: 'absolute', right: -size * 0.3, bottom: -size * 0.2, width: size * 0.5, height: size * 0.14, background: INK, borderRadius: size * 0.07, transform: 'rotate(40deg)'}} />
    </div>
  );
};

/* ═════════════ La ligne de métro (6 stations = 6 maillons) ═════════════ */
/* ═════════════ La ligne de métro : 14 stations = 14 outils ═════════════ */
const TOOLS: {n: number; at: number; nameAt: number; l: string; w: string[]; m: number[]; f: number}[] = [
  {n: 1, at: 14.1, nameAt: 14.9, l: 'Plan stratégique', w: ['Le', 'plan', 'stratégique'], m: [1, 2], f: 0},
  {n: 2, at: 19.6, nameAt: 20.9, l: 'Business Model Canvas', w: ['Business', 'Model', 'Canvas'], m: [0, 2], f: 0},
  {n: 3, at: 28.1, nameAt: 29.3, l: 'Matrice SWOT', w: ['La', 'matrice', 'SWOT'], m: [2], f: 1},
  {n: 4, at: 34.2, nameAt: 35.4, l: 'Analyse PESTEL', w: ['L’analyse', 'PESTEL'], m: [1], f: 1},
  {n: 5, at: 43.6, nameAt: 44.8, l: '5 forces de Porter', w: ['Les', '5', 'forces', 'de', 'Porter'], m: [1, 2], f: 1},
  {n: 6, at: 49.4, nameAt: 50.5, l: 'Marketing mix', w: ['Le', 'marketing', 'mix'], m: [1, 2], f: 2},
  {n: 7, at: 58.1, nameAt: 59.2, l: 'Matrice d’Ansoff', w: ['La', 'matrice', 'd’Ansoff'], m: [2], f: 2},
  {n: 8, at: 68.6, nameAt: 69.8, l: 'Groupes stratégiques', w: ['Les', 'groupes', 'stratégiques'], m: [1], f: 2},
  {n: 9, at: 75.7, nameAt: 76.7, l: 'Chaîne de valeur', w: ['La', 'chaîne', 'de', 'valeur'], m: [1, 3], f: 3},
  {n: 10, at: 81.8, nameAt: 82.9, l: 'Facteurs clés de succès', w: ['Facteurs', 'clés', 'de', 'succès'], m: [1, 3], f: 3},
  {n: 11, at: 88.6, nameAt: 89.7, l: 'Modèle VRIO', w: ['Le', 'modèle', 'VRIO'], m: [2], f: 3},
  {n: 12, at: 96.7, nameAt: 97.9, l: '7S de McKinsey', w: ['Les', '7S', 'de', 'McKinsey'], m: [1], f: 4},
  {n: 13, at: 111.0, nameAt: 112.0, l: 'Matrice McKinsey', w: ['La', 'matrice', 'McKinsey'], m: [2], f: 4},
  {n: 14, at: 121.2, nameAt: 122.2, l: 'Matrice BCG', w: ['La', 'matrice', 'BCG'], m: [2], f: 4},
];
const STATIONS = TOOLS.map((x) => ({n: x.n, l: x.l, s: x.l, at: x.nameAt}));
const Metro: React.FC = () => {
  const t = useT();
  const cur = STATIONS.reduce((a, x, k) => (t >= x.at ? k : a), -1);
  const sx = (k: number) => 60 + k * (840 / (STATIONS.length - 1));
  const mv = cur <= 0 ? 1 : prog(t, STATIONS[cur].at - 0.8, STATIONS[cur].at, easeInOut);
  const tx = cur < 0 ? sx(0) - 40 : cur === 0 ? sx(0) : lerp(sx(cur - 1), sx(cur), mv);
  const done = t >= ALLDONE;
  return (
    <Abs x={60} y={1400} w={960} h={104} style={{zIndex: 30, background: 'rgba(255,255,255,0.95)', border: `4px solid ${INK}`, borderRadius: 20, boxShadow: `5px 5px 0 ${NAVY}`}}>
      <div style={{position: 'absolute', left: 60, right: 60, top: 26, height: 10, borderRadius: 5, background: `linear-gradient(90deg, ${NAVY}, ${GREEN}, ${ORANGE}, ${TEAL}, ${VIO})`}} />
      {STATIONS.map((x, k) => { const on = k <= cur || done; const c = SECT[TOOLS[k].f].c; return <div key={x.n} style={{position: 'absolute', left: sx(k) - 16, top: 15, width: 32, height: 32, borderRadius: 16, background: on ? c : '#fff', border: `3px solid ${on ? INK : '#9FB3CC'}`, boxSizing: 'border-box', color: on ? '#fff' : INK, fontFamily: sansFont, fontWeight: 900, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: k === cur ? `0 0 16px ${c}` : 'none', transform: `scale(${k === cur && !done ? 1.18 : 1})`}}>{x.n}</div>; })}
      <div style={{position: 'absolute', left: 0, right: 0, top: 58, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: BURG}}>{done ? '14 outils · 1 décision' : cur >= 0 ? `station ${STATIONS[cur].n} · ${STATIONS[cur].l}` : 'ligne stratégie · 14 stations'}</div>
      {cur >= 0 && <Img src={staticFile('metroiso-gen/metro/rame-dessus.png')} style={{position: 'absolute', left: tx - 40, top: 14, width: 80, height: 28, filter: 'drop-shadow(0 0 8px rgba(120,180,255,0.9))'}} />}
    </Abs>
  );
};
const StationBanner: React.FC = () => {
  const t = useT();
  const r = STATIONS.find((x) => t >= x.at - 0.1 && t < x.at + 3.0);
  if (!r) return null;
  const q = prog(t, r.at - 0.1, r.at + 0.3, easeOut);
  const out = prog(t, r.at + 2.6, r.at + 3.0, easeIn);
  return (
    <Abs x={40} y={1230} w={1000} h={150} style={{zIndex: 32, opacity: 1 - out, transform: `translateY(${(1 - q) * 110}px) scale(${0.8 + 0.2 * q})`}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: 30, background: `linear-gradient(110deg, #0B2147, ${NIGHT})`, border: `5px solid ${BLUE}`, boxShadow: `0 0 40px ${BLUE}AA`, display: 'flex', alignItems: 'center', gap: 22, padding: '0 26px', overflow: 'hidden'}}>
        <div style={{width: 100, height: 100, borderRadius: 50, background: `radial-gradient(circle at 35% 30%, #DDEBFF, ${BLUE} 60%, #0B2147)`, border: '5px solid #fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: `rotateY(${(1 - q) * 360}deg)`}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 12, color: '#fff'}}>STATION</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: '#fff', lineHeight: 0.9}}>{r.n}</div></div>
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE QHSE · STATION {r.n} / 6</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
        <div style={{position: 'absolute', top: 0, bottom: 0, width: 120, left: lerp(-160, 1100, prog(t, r.at + 0.2, r.at + 1.1)), background: 'linear-gradient(90deg, transparent, rgba(200,225,255,0.5), transparent)', transform: 'skewX(-20deg)'}} />
      </div>
    </Abs>
  );
};

/** Lettre-photo : la photo n'apparaît qu'à l'intérieur du glyphe, contour marine (charte « L'INDUCTION HSE »). */
const PhotoLetter: React.FC<{ch: string; src: string; size: number; pos?: string; ls?: number}> = ({ch, src, size, pos = 'center', ls = -4}) => (
  <div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: size, lineHeight: 0.92, letterSpacing: ls}}>
    <span style={{position: 'absolute', left: 0, top: 0, color: 'transparent', WebkitTextStroke: `${size * 0.03}px ${NAVY}`}}>{ch}</span>
    <span style={{position: 'relative', color: 'transparent', backgroundImage: `url(${PH(src)})`, backgroundSize: 'cover', backgroundPosition: pos, WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>{ch}</span>
  </div>
);
const Watermark: React.FC<{o?: number}> = ({o = 0.05}) => (
  <AbsoluteFill style={{overflow: 'hidden'}}>{Array.from({length: 13}, (_, k) => <div key={k} style={{position: 'absolute', left: -20, top: 300 + k * 140, fontFamily: 'Arial, sans-serif', fontWeight: 500, fontSize: 150, color: `rgba(20,33,61,${o})`, whiteSpace: 'nowrap', letterSpacing: -2}}>UNIVERSNORMES</div>)}</AbsoluteFill>
);

/** Lettres-photos ANIMÉES : la photo dérive lentement à l'intérieur des glyphes + reflet qui balaie. */
const PhotoLetterAnim: React.FC<{ch: string; src: string; size: number; ls?: number; seed?: number}> = ({ch, src, size, ls = -2, seed = 0}) => {
  const t = useT();
  const px = 50 + Math.sin(t * 1.3 + seed) * 22;
  const py = 45 + Math.cos(t * 0.9 + seed) * 14;
  const sweep = ((t * 0.55 + seed * 0.3) % 1.6) - 0.3;
  return (
    <div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: size, lineHeight: 0.92, letterSpacing: ls}}>
      <span style={{position: 'absolute', left: 0, top: 0, color: 'transparent', WebkitTextStroke: `${size * 0.03}px ${NAVY}`}}>{ch}</span>
      <span style={{position: 'relative', color: 'transparent', backgroundImage: `url(${PH(src)})`, backgroundSize: '170% auto', backgroundPosition: `${px}% ${py}%`, WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>{ch}</span>
      <span style={{position: 'absolute', left: 0, top: 0, color: 'transparent', backgroundImage: `linear-gradient(105deg, transparent ${sweep * 100 - 12}%, rgba(255,255,255,0.75) ${sweep * 100}%, transparent ${sweep * 100 + 12}%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>{ch}</span>
    </div>
  );
};

/* ═════════════ Kit néo-brutaliste (skill capsule-ui-neo-brutal) ═════════════ */
const NBK = '#111';
const ACC = '#22B573';
const nb = (bg = '#fff', sh = 8): React.CSSProperties => ({background: bg, border: `4px solid ${NBK}`, borderRadius: 18, boxShadow: `${sh}px ${sh}px 0 ${NBK}`, boxSizing: 'border-box'});
const NBadge: React.FC<{at: number; text: string; bg?: string; rot?: number; size?: number}> = ({at, text, bg = ACC, rot = -10, size = 30}) => {
  const t = useT();
  if (t < at) return null;
  const sc = spring(t, at);
  return <div style={{display: 'inline-block', background: bg, color: '#fff', border: `4px solid ${NBK}`, borderRadius: 10, padding: '4px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: size, letterSpacing: 1, transform: `rotate(${rot}deg) scale(${lerp(1.5, 1, Math.min(1, sc))})`, boxShadow: `4px 4px 0 ${NBK}`, whiteSpace: 'nowrap'}}>{text}</div>;
};
const Chip: React.FC<{at: number; ic: string; l: string; c: string}> = ({at, ic, l, c}) => {
  const t = useT();
  const on = t > at;
  return <div style={{...nb(on ? '#fff' : '#F1F1EA', 5), display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px 8px 8px', opacity: on ? 1 : 0.35, transform: `scale(${on ? Math.min(1.04, spring(t, at)) : 0.94})`}}><div style={{width: 54, height: 54, borderRadius: 12, background: on ? c : '#DDD', border: `3px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={ic} size={38} /></div><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: NBK, whiteSpace: 'nowrap'}}>{l}</span>{on && <span style={{fontSize: 26, fontWeight: 900, color: ACC}}>✓</span>}</div>;
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="graphique" w={1080} h={820} pos="50% 35%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 24%, ${PAPER}CC 32%, ${PAPER} 37%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 18}}><div style={{...nb(NBK, 5), color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3, padding: '8px 22px'}}>CE QUE TOUT MANAGER DOIT CONNAÎTRE</div></Abs>
      <Abs x={0} y={650} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="14 OUTILS" src={IMG.c14} size={170} ls={4} /></Abs>
      <Abs x={0} y={830} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="STRATÉGIQUES" src={IMG.cStrat} size={118} ls={1} seed={3} /></Abs>
      <Abs x={60} y={1010} w={960} style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10}}>{TOOLS.map((x) => <div key={x.n} style={{...nb('#fff', 4), padding: '4px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 20, color: SECT[x.f].c}}>{x.n}. {x.l}</div>)}</Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* Mini tuile d'outil (grille des 14) */
const ToolTile: React.FC<{k: number; at: number; w?: number}> = ({k, at, w = 200}) => {
  const t = useT();
  const x = TOOLS[k];
  const c = SECT[x.f].c;
  const on = t > at;
  return <div style={{...nb('#fff', 5), width: w, height: w * 0.62, padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, transform: `scale(${on ? Math.min(1, spring(t, at)) : 0})`, boxShadow: `5px 5px 0 ${c}`}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: w * 0.2, color: c, lineHeight: 1}}>{x.n}</div><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: w * 0.085, color: NBK, textAlign: 'center', lineHeight: 1.05}}>{x.l}</div></div>;
};

/* ═════════════ Intro : une vision ne suffit pas → boîte à outils → recherche → 14 outils ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  if (t < 7.3) return (
    <Out end={7.35}>
      <HiLine words={['Une', 'vision', 'ne', 'suffit', 'pas']} mark={[1, 3]} at={4.1} y={330} size={60} />
      <Abs x={60} y={440} w={960} h={930}>
        <Shot src={IMG.vision} ic="telescope" x={180} y={20} w={600} h={600} at={3.0} pos="50% 30%" c={NAVY} />
        <div style={{position: 'absolute', left: 120, top: 660, ...nb('#fff', 6), padding: '14px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: DIM, opacity: pop(t, 6.0)}}>une vision seule<div style={{position: 'absolute', left: 14, right: 14, top: '50%', height: 7, background: RED, transform: `scaleX(${prog(t, 6.9, 7.2)})`, transformOrigin: '0 50%'}} /></div>
        <div style={{position: 'absolute', left: 640, top: 640, transform: `scale(${pop(t, 6.9)}) rotate(-8deg)`}}><F n="telescope" size={150} /></div>
      </Abs>
    </Out>
  );
  if (t < 11.3) {
    const open = prog(t, 8.4, 9.0, easeOut);
    return (
      <Out end={11.35}>
        <HiLine words={['Les', 'bons', 'outils']} mark={[1, 2]} at={7.6} y={330} size={64} />
        <Abs x={60} y={440} w={960} h={930}>
          <div style={{position: 'absolute', left: 330, top: 40, transform: `scale(${pop(t, 7.5)}) rotate(${(1 - open) * -10}deg)`}}><F n="boite-outils" size={300} /></div>
          {[['loupe', 'analyser', 9.2, BLUE], ['balance', 'décider', 10.0, ORANGE], ['fusee', 'agir', 10.6, GREEN]].map(([ic, l, a, c], k) => <div key={k} style={{position: 'absolute', left: 30 + k * 310, top: lerp(220, 440, prog(t, a as number, (a as number) + 0.4, easeOut)), opacity: t > (a as number) ? 1 : 0, transform: `scale(${t > (a as number) ? Math.min(1, spring(t, a as number)) : 0})`}}><div style={{...nb('#fff', 8), boxShadow: `8px 8px 0 ${c}`, width: 280, height: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14}}><F n={ic as string} size={140} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: c as string}}>{l}</div></div></div>)}
        </Abs>
      </Out>
    );
  }
  return (
    <Out end={13.95}>
      <HiLine words={['Voici', '14', 'outils']} mark={[1, 2]} at={11.5} y={330} size={64} />
      <SearchOpen x={60} y={440} w={960} h={930} at={11.0} query="outils d’analyse stratégique" results={['Une intuition géniale', 'Les 14 outils du manager', 'Un seul tableau Excel']} found={1} foundAt={11.95} clickAt={12.3} c={NAVY}>
        <div style={{position: 'absolute', inset: 0, display: 'flex', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center', gap: 14, padding: 14}}>{TOOLS.map((x, k) => <ToolTile key={x.n} k={k} at={12.9 + k * 0.05} w={210} />)}</div>
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ Les 14 visuels d'outils ═════════════ */
const Q: React.FC<{x: number; y: number; w: number; h: number; at: number; c: string; big?: string; l: string; ic?: string; fs?: number}> = ({x, y, w, h, at, c, big, l, ic, fs = 30}) => {
  const t = useT();
  const on = t > at;
  return <div style={{...nb(on ? '#fff' : '#F1F1EA', on ? 7 : 3), position: 'absolute', left: x, top: y, width: w, height: h, boxShadow: on ? `7px 7px 0 ${c}` : 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: on ? 1 : 0.35, transform: `scale(${on ? Math.min(1.03, spring(t, at)) : 0.92})`, overflow: 'hidden'}}>{big && <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: h * 0.42, color: c, lineHeight: 0.9}}>{big}</div>}{ic && <F n={ic} size={Math.min(w, h) * 0.38} />}<div style={{fontFamily: sansFont, fontWeight: 900, fontSize: fs, color: NBK, textAlign: 'center', lineHeight: 1.05, padding: '0 10px'}}>{l}</div></div>;
};
const Axis: React.FC<{x: number; y: number; w: number; h: number; vx: string; hx: string; at: number; atH: number}> = ({x, y, w, h, vx, hx, at, atH}) => {
  const t = useT();
  return (
    <>
      <div style={{position: 'absolute', left: x, top: y, width: 8, height: h * prog(t, at - 0.6, at), background: NBK, borderRadius: 4}} />
      <div style={{position: 'absolute', left: x, top: y + h, width: w * prog(t, atH - 0.6, atH), height: 8, background: NBK, borderRadius: 4}} />
      <div style={{position: 'absolute', left: x - 60 - h / 2, top: y + h / 2 - 20, width: h, textAlign: 'center', transform: 'rotate(-90deg)', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: NBK, opacity: pop(t, at)}}>{vx} ↑</div>
      <div style={{position: 'absolute', left: x, top: y + h + 18, width: w, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: NBK, opacity: pop(t, atH)}}>{hx} →</div>
    </>
  );
};
const ToolViz: React.FC<{k: number}> = ({k}) => {
  const t = useT();
  const c = SECT[TOOLS[k].f].c;
  switch (k) {
    case 0: { // plan stratégique : escalier de drapeaux vers l'horizon
      return (<>
        {[0, 1, 2, 3].map((j) => <div key={j} style={{position: 'absolute', left: 60 + j * 200, top: 520 - j * 120, width: 200, height: 40 + j * 120, background: [`${NAVY}33`, `${NAVY}55`, `${NAVY}88`, NAVY][j], border: `4px solid ${NBK}`, transform: `scaleY(${prog(t, 16.0 + j * 0.2, 16.5 + j * 0.2, easeOut)})`, transformOrigin: '50% 100%'}}><div style={{position: 'absolute', left: 80, top: -90, transform: `scale(${pop(t, 16.4 + j * 0.2)})`}}><F n="epingle" size={70} /></div></div>)}
        <div style={{position: 'absolute', left: 820, top: 60, transform: `scale(${pop(t, 18.2)}) rotate(${t * 20}deg)`}}><F n="etoile" size={90} /></div>
        <div style={{position: 'absolute', left: 30, top: 610, display: 'flex', gap: 14, flexWrap: 'wrap'}}><Chip at={17.0} ic="boussole" l="orientations" c={c} /><Chip at={17.6} ic="cible" l="objectifs à long terme" c={c} /></div>
      </>);
    }
    case 1: { // BMC : 9 cases + valeur au centre
      const cells = Array.from({length: 9}, (_, j) => j);
      return (<>
        {cells.map((j) => { const cx = j % 3, cy = Math.floor(j / 3); const mid = j === 4; const a = 23.0 + j * 0.12; return <div key={j} style={{...nb(mid ? YEL : '#fff', 5), position: 'absolute', left: 90 + cx * 260, top: 20 + cy * 170, width: 240, height: 150, transform: `scale(${t > a ? Math.min(1, spring(t, a)) : 0})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: NBK}}>{mid ? 'valeur' : <div style={{width: 120, height: 10, borderRadius: 5, background: '#D9DEE6', boxShadow: '0 22px 0 #D9DEE6'}} />}</div>; })}
        <div style={{position: 'absolute', left: 30, top: 560, display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', width: 840}}><Chip at={26.0} ic="ampoule" l="crée" c={c} /><Chip at={26.4} ic="camion" l="délivre" c={c} /><Chip at={26.8} ic="argent" l="capture" c={c} /></div>
      </>);
    }
    case 2: // SWOT
      return (<>
        <Q x={40} y={20} w={400} h={300} at={31.4} c={GREEN} big="S" l="forces" />
        <Q x={460} y={20} w={400} h={300} at={31.8} c={RED} big="W" l="faiblesses" />
        <Q x={40} y={340} w={400} h={300} at={32.5} c={BLUE} big="O" l="opportunités" />
        <Q x={460} y={340} w={400} h={300} at={33.3} c={ORANGE} big="T" l="menaces" />
      </>);
    case 3: { // PESTEL
      const P = [['P', 'politiques', 'temple', 37.9], ['E', 'économiques', 'argent', 38.4], ['S', 'socioculturels', 'equipe', 39.0], ['T', 'technologiques', 'ordinateur', 40.0], ['E', 'environnementaux', 'arbre', 40.7], ['L', 'légaux', 'juge', 41.6]];
      return (<>{P.map(([L, l, ic, a], j) => <Q key={j} x={40 + (j % 3) * 280} y={20 + Math.floor(j / 3) * 320} w={260} h={300} at={a as number} c={[RED, GREEN, BLUE, VIO, TEAL, ORANGE][j]} big={L as string} l={l as string} fs={(l as string).length > 12 ? 22 : 26} />)}</>);
    }
    case 4: { // 5 forces de Porter
      const pul = 1 + 0.05 * Math.sin(t * 6);
      const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]];
      return (<>
        {dirs.map(([dx, dy], j) => { const a = 45.0 + j * 0.15; const p = prog(t, a, a + 0.5, easeOut); return <div key={j} style={{position: 'absolute', left: 450 + dx * lerp(420, 230, p) - 50, top: 320 + dy * lerp(420, 230, p) - 50, width: 100, height: 100, borderRadius: 50, background: c, border: `5px solid ${NBK}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: p, boxShadow: `5px 5px 0 ${NBK}`}}>{j + 1}</div>; })}
        {dirs.map(([dx, dy], j) => <div key={`a${j}`} style={{position: 'absolute', left: 450 + dx * 150 - (dx ? 40 : 5), top: 320 + dy * 150 - (dy ? 40 : 5), width: dx ? 80 : 10, height: dy ? 80 : 10, background: NBK, opacity: prog(t, 45.6 + j * 0.15, 46.0 + j * 0.15)}} />)}
        <div style={{position: 'absolute', left: 330, top: 200, width: 240, height: 240, borderRadius: 120, background: `radial-gradient(circle at 40% 35%, #fff, ${c}55)`, border: `6px solid ${NBK}`, boxShadow: t > 47.3 ? `0 0 ${30 + 30 * Math.abs(Math.sin(t * 4))}px ${RED}` : `6px 6px 0 ${NBK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop(t, 44.8) * (t > 47.3 ? pul : 1)})`}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 96, color: c, lineHeight: 0.9}}>5</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: NBK}}>forces</div></div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 620, display: 'flex', justifyContent: 'center'}}><NBadge at={47.3} text="intensité concurrentielle" bg={RED} rot={-3} size={34} /></div>
      </>);
    }
    case 5: // marketing mix
      return (<>
        <Q x={40} y={20} w={400} h={300} at={54.8} c={c} ic="colis" l="produit" />
        <Q x={460} y={20} w={400} h={300} at={55.6} c={c} ic="argent" l="prix" />
        <Q x={40} y={340} w={400} h={300} at={56.1} c={c} ic="camion" l="distribution" />
        <Q x={460} y={340} w={400} h={300} at={57.0} c={c} ic="megaphone" l="communication" />
        <div style={{position: 'absolute', left: 390, top: 270, width: 120, height: 120, borderRadius: 60, ...nb(YEL, 5), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 56, transform: `scale(${pop(t, 52.6)})`}}>mix</div>
      </>);
    case 6: // Ansoff
      return (<>
        <Axis x={110} y={20} w={760} h={600} vx="marchés" hx="produits" at={61.2} atH={61.8} />
        <Q x={140} y={330} w={350} h={270} at={63.4} c={GREEN} ic="cible" l="pénétration du marché" fs={26} />
        <Q x={140} y={40} w={350} h={270} at={64.8} c={BLUE} ic="globe" l="développement de marché" fs={26} />
        <Q x={510} y={330} w={350} h={270} at={66.0} c={ORANGE} ic="ampoule" l="développement de produits" fs={26} />
        <Q x={510} y={40} w={350} h={270} at={67.2} c={VIO} ic="fusee" l="diversification" fs={26} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 690, display: 'flex', justifyContent: 'center'}}><NBadge at={62.4} text="options de croissance" bg={c} rot={-2} size={30} /></div>
      </>);
    case 7: { // groupes stratégiques : nuage → 3 groupes
      const G = [[230, 200, GREEN], [650, 180, BLUE], [450, 470, ORANGE]];
      const mv = prog(t, 72.0, 73.2, easeInOut);
      return (<>
        {G.map(([gx, gy, gc], g) => <div key={`h${g}`} style={{position: 'absolute', left: (gx as number) - 150, top: (gy as number) - 110, width: 300, height: 220, borderRadius: '50%', border: `6px dashed ${gc}`, background: `${gc}18`, opacity: prog(t, 73.4, 73.9)}} />)}
        {Array.from({length: 18}, (_, j) => { const g = j % 3; const rx = 80 + random(`gx${j}`) * 740, ry = 40 + random(`gy${j}`) * 560; const [gx, gy, gc] = G[g]; const an = Math.floor(j / 3) * 1.05 + g; const tx = (gx as number) + Math.cos(an) * 85, ty = (gy as number) + Math.sin(an) * 55; return <div key={j} style={{position: 'absolute', left: lerp(rx, tx, mv) - 26, top: lerp(ry, ty, mv) - 26, width: 52, height: 52, borderRadius: 26, background: mv > 0.5 ? (gc as string) : '#9FB3CC', border: `4px solid ${NBK}`, transform: `scale(${pop(t, 70.4 + j * 0.03)})`}}><div style={{position: 'absolute', inset: 8}}><F n="batiment" size={28} /></div></div>; })}
        <div style={{position: 'absolute', left: 30, top: 640, display: 'flex', gap: 14, flexWrap: 'wrap'}}><Chip at={72.0} ic="aimant" l="regrouper les concurrents" c={c} /><Chip at={73.6} ic="epingle" l="positionnements similaires" c={c} /></div>
      </>);
    }
    case 8: { // chaîne de valeur
      const ics = ['camion', 'engrenage', 'colis', 'megaphone', 'poignee'];
      return (<>
        {ics.map((ic, j) => { const a = 78.8 + j * 0.18; return <div key={j} style={{position: 'absolute', left: 30 + j * 150, top: 140, width: 170, height: 220, background: j % 2 ? `${TEAL}CC` : TEAL, clipPath: 'polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%, 20% 50%)', transform: `translateX(${(1 - prog(t, a, a + 0.4, easeOut)) * -200}px)`, opacity: prog(t, a, a + 0.3), display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={ic} size={70} /></div>; })}
        <div style={{position: 'absolute', left: 790, top: 150, transform: `scale(${pop(t, 80.3)})`}}><div style={{...nb(YEL, 7), width: 100, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="coeur" size={70} /></div></div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 440, display: 'flex', justifyContent: 'center'}}><NBadge at={80.0} text="créer de la valeur pour le client" bg={c} rot={-2} size={32} /></div>
        {t > 80.3 && <Dust n={18} c={GOLD} />}
      </>);
    }
    case 9: { // facteurs clés de succès : la clé tourne, le cadenas s'ouvre
      const turn = prog(t, 85.2, 86.0, easeInOut);
      const op = prog(t, 86.2, 86.6);
      return (<>
        <div style={{position: 'absolute', left: 120, top: 100, transform: `translateX(${lerp(-200, 120, prog(t, 84.2, 85.2, easeOut))}px) rotate(${turn * 90}deg)`}}><F n="cle" size={220} /></div>
        <div style={{position: 'absolute', left: 560, top: 80, opacity: 1 - op}}><F n="cadenas" size={240} /></div>
        <div style={{position: 'absolute', left: 560, top: 80, opacity: op, transform: `scale(${op ? Math.min(1.1, spring(t, 86.2)) : 0})`}}><F n="trophee" size={240} /></div>
        <div style={{position: 'absolute', left: 30, top: 440, display: 'flex', gap: 14, flexWrap: 'wrap'}}><Chip at={85.0} ic="check" l="éléments essentiels" c={c} /><Chip at={86.5} ic="poing" l="à maîtriser" c={c} /><Chip at={87.0} ic="trophee" l="réussir dans son secteur" c={c} /></div>
      </>);
    }
    case 10: // VRIO
      return (<>
        {['V', 'R', 'I', 'O'].map((L, j) => { const a = 90.0 + j * 0.15; return <div key={j} style={{...nb('#fff', 8), position: 'absolute', left: 60 + j * 210, top: 40, width: 180, height: 220, boxShadow: `8px 8px 0 ${c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 150, color: c, transform: `translateY(${(1 - Math.min(1, spring(t, a))) * -300}px)`, opacity: t > a ? 1 : 0}}>{L}</div>; })}
        <div style={{position: 'absolute', left: 30, top: 320, display: 'flex', gap: 14, flexWrap: 'wrap'}}><Chip at={92.5} ic="boite-outils" l="ressources" c={c} /><Chip at={93.0} ic="cerveau" l="compétences" c={c} /></div>
        {t > 94.8 && <div style={{position: 'absolute', left: 0, right: 0, top: 460, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, transform: `scale(${Math.min(1, spring(t, 94.8))})`}}><F n="couronne" size={120} /><div style={{...nb(GOLD, 7), padding: '12px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff'}}>avantage concurrentiel durable</div></div>}
        {t > 95.4 && <Dust n={20} c={GOLD} />}
      </>);
    case 11: { // 7S : heptagone
      const L7 = [['stratégie', 103.8], ['structure', 104.7], ['systèmes', 105.7], ['style de management', 106.6], ['personnel', 108.0], ['compétences', 108.9]];
      const cx = 450, cy = 330, R = 270;
      const pts = L7.map((_, j) => [cx + R * Math.cos(-Math.PI / 2 + j * Math.PI / 3), cy + R * Math.sin(-Math.PI / 2 + j * Math.PI / 3)]);
      const coh = prog(t, 101.0, 101.8);
      return (<>
        <svg style={{position: 'absolute', left: 0, top: 0}} width={900} height={700}>{pts.flatMap((a, i) => pts.slice(i + 1).map((b, j) => <line key={`${i}-${j}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={c} strokeWidth={3} strokeDasharray="10 8" strokeDashoffset={-t * 40} opacity={coh * 0.6} />))}{pts.map((a, i) => <line key={`c${i}`} x1={cx} y1={cy} x2={a[0]} y2={a[1]} stroke={NBK} strokeWidth={4} opacity={coh} />)}</svg>
        {L7.map(([l, a], j) => { const on = t > (a as number); return <div key={j} style={{position: 'absolute', left: pts[j][0] - 95, top: pts[j][1] - 45, width: 190, height: 90, ...nb(on ? '#fff' : '#F1F1EA', 5), boxShadow: on ? `5px 5px 0 ${c}` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: (l as string).length > 12 ? 20 : 25, color: on ? NBK : '#AAB', transform: `scale(${on ? Math.min(1.05, spring(t, a as number)) : 0.85})`, lineHeight: 1.05}}>{l}</div>; })}
        <div style={{position: 'absolute', left: cx - 100, top: cy - 100, width: 200, height: 200, borderRadius: 100, background: t > 109.6 ? YEL : '#fff', border: `6px solid ${NBK}`, boxShadow: t > 109.6 ? `0 0 40px ${GOLD}` : `6px 6px 0 ${NBK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: NBK, transform: `scale(${pop(t, 100.6)})`, lineHeight: 1.05}}>{t > 109.6 ? <>valeurs<br />partagées</> : <>cohérence<br /><span style={{fontSize: 40, color: c}}>7S</span></>}</div>
      </>);
    }
    case 12: { // McKinsey 3×3
      const bx = lerp(150, 690, prog(t, 117.4, 118.6, easeInOut)), by = lerp(500, 120, prog(t, 115.0, 116.2, easeInOut));
      return (<>
        <Axis x={110} y={20} w={760} h={600} vx="attractivité" hx="position concurrentielle" at={114.9} atH={117.2} />
        {Array.from({length: 9}, (_, j) => { const gx = j % 3, gy = Math.floor(j / 3); const sc = gx + (2 - gy); return <div key={j} style={{position: 'absolute', left: 130 + gx * 245, top: 30 + gy * 195, width: 235, height: 185, borderRadius: 12, background: sc >= 3 ? `${GREEN}55` : sc === 2 ? `${YEL}66` : `${RED}44`, border: `3px solid ${NBK}`, opacity: pop(t, 113.8 + j * 0.06)}} />; })}
        <div style={{position: 'absolute', left: bx - 50, top: by - 50, width: 100, height: 100, borderRadius: 50, background: c, border: `5px solid ${NBK}`, boxShadow: `5px 5px 0 ${NBK}`, opacity: pop(t, 114.4)}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 680, display: 'flex', justifyContent: 'center'}}><NBadge at={119.6} text="décision d’investissement" bg={GREEN} rot={-2} size={32} /></div>
      </>);
    }
    case 13: { // BCG
      const B = [[300, 170, 120, 'etoile'], [640, 170, 90, 'question'], [300, 460, 140, 'argent'], [640, 460, 70, 'baisse']];
      return (<>
        <Axis x={110} y={20} w={760} h={600} vx="croissance du marché" hx="part de marché relative" at={125.4} atH={126.8} />
        {[0, 1, 2, 3].map((j) => <div key={`q${j}`} style={{position: 'absolute', left: 130 + (j % 2) * 370, top: 30 + Math.floor(j / 2) * 290, width: 360, height: 280, borderRadius: 14, border: `3px dashed ${NBK}55`, opacity: pop(t, 123.6)}} />)}
        {B.map(([x, y, r, ic], j) => <div key={j} style={{position: 'absolute', left: (x as number) - (r as number) / 2, top: (y as number) - (r as number) / 2, width: r as number, height: r as number, borderRadius: '50%', background: [GOLD, BLUE, GREEN, '#9FB3CC'][j], border: `5px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${t > 124.5 + j * 0.2 ? Math.min(1, spring(t, 124.5 + j * 0.2)) : 0})`}}><F n={ic as string} size={(r as number) * 0.6} /></div>)}
        <div style={{position: 'absolute', left: 0, right: 0, top: 680, display: 'flex', justifyContent: 'center'}}><NBadge at={128.9} text="décisions de portefeuille" bg={c} rot={-2} size={32} /></div>
      </>);
    }
    default: return null;
  }
};

const TEND = [17.3, 19.6, 31.4, 34.2, 43.6, 52.7, 58.1, 68.6, 78.9, 81.8, 88.6, 99.9, 111.0, 121.2];
const ToolScene: React.FC<{k: number}> = ({k}) => {
  const t = useT();
  const x = TOOLS[k];
  const c = SECT[x.f].c;
  const end = k < 13 ? TOOLS[k + 1].at : 130.1;
  return (
    <Out end={end + 0.05}>
      <HiLine words={x.w} mark={x.m} at={Math.max(x.nameAt, TEND[k] - 0.2)} y={330} size={x.w.join(' ').length > 22 ? 54 : 64} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{position: 'absolute', left: 0, top: 0, display: 'flex', alignItems: 'center', gap: 16, opacity: pop(t, TEND[k])}}>
          <div style={{...nb(c, 5), width: 92, height: 92, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: '#fff', transform: `rotate(${(1 - Math.min(1, spring(t, TEND[k]))) * -180}deg)`}}>{x.n}</div>
          <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM, letterSpacing: 2}}>OUTIL {String(x.n).padStart(2, '0')} / 14 · {SECT[x.f].g.toUpperCase()}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: NBK}}>{x.l}</div></div>
        </div>
        <div style={{position: 'absolute', left: 30, top: 130, width: 900, height: 760}}><ToolViz k={k} /></div>
      </Abs>
    </Out>
  );
};

/* ═════════════ Retenez ceci : aucun outil seul → choisir, croiser, décider → diagnostic ⇒ action ═════════════ */
const Retenir: React.FC = () => {
  const t = useT();
  const ph = t < 142.1 ? 0 : 1;
  return (
    <Out end={147.5}>
      <HiLine words={ph === 0 ? ['Aucun', 'outil', 'seul'] : ['Diagnostic', '⇒', 'action']} mark={ph === 0 ? [0] : [0, 2]} at={ph === 0 ? 133.4 : 142.3} y={330} size={64} />
      <Abs x={60} y={440} w={960} h={930}>
        {ph === 0 ? <>
          {TOOLS.map((x, k) => { const a = (k / 14) * Math.PI * 2 + t * 0.4; const r = lerp(0, 330, prog(t, 134.0, 135.0, easeOut)); const cross = prog(t, 138.6, 139.4, easeInOut); return <div key={x.n} style={{position: 'absolute', left: 480 + Math.cos(a) * r * (1 - cross * 0.55) - 30, top: 330 + Math.sin(a) * r * (1 - cross * 0.55) - 30, width: 60, height: 60, borderRadius: 30, background: SECT[x.f].c, border: `4px solid ${NBK}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: prog(t, 134.0, 134.4)}}>{x.n}</div>; })}
          <div style={{position: 'absolute', left: 380, top: 230, width: 200, height: 200, borderRadius: 100, ...nb(t > 141.0 ? GREEN : '#fff', 7), display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop(t, 133.5)})`}}>{t > 141.0 ? <F n="check" size={120} /> : <F n="boite-outils" size={120} />}</div>
          {t > 133.3 && t < 134.4 && <div style={{position: 'absolute', left: 380, top: 230, transform: `scale(${spring(t, 133.3)})`}}><F n="croix" size={200} /></div>}
          <div style={{position: 'absolute', left: 0, right: 0, top: 700, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap'}}><Chip at={136.1} ic="cible" l="choisir" c={NAVY} /><Chip at={138.6} ic="puzzle" l="croiser" c={ORANGE} /><Chip at={141.0} ic="check" l="décider" c={GREEN} /></div>
        </> : <>
          <div style={{...nb('#fff', 8), position: 'absolute', left: 20, top: 120, width: 380, height: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: pop(t, 143.8), boxShadow: `8px 8px 0 ${BLUE}`}}><F n="loupe" size={180} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, textAlign: 'center'}}>diagnostic<br />rigoureux</div></div>
          <svg style={{position: 'absolute', left: 400, top: 280}} width={160} height={100}><path d="M 10 50 L 130 50" stroke={NBK} strokeWidth={14} strokeLinecap="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - prog(t, 145.4, 146.0)}} /><path d="M 110 22 L 145 50 L 110 78" fill="none" stroke={NBK} strokeWidth={14} strokeLinejoin="round" opacity={prog(t, 145.9, 146.1)} /></svg>
          <div style={{...nb('#fff', 8), position: 'absolute', left: 560, top: 120, width: 380, height: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: pop(t, 146.3), boxShadow: `8px 8px 0 ${GREEN}`}}><div style={{transform: `translateY(${-Math.max(0, t - 146.4) * 30}px)`}}><F n="fusee" size={180} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, textAlign: 'center'}}>action<br />cohérente</div></div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 620, display: 'flex', justifyContent: 'center'}}><NBadge at={143.0} text="stratégie performante" bg={NAVY} rot={-3} size={34} /></div>
        </>}
      </Abs>
    </Out>
  );
};

/* ═════════════ Fin : ressources (bouton cliqué) ═════════════ */
const Fin: React.FC = () => {
  const t = useT();
  const click = 148.6;
  const cur = prog(t, 147.6, click, easeInOut);
  const done = t > click;
  return (
    <>
      <HiLine words={['Découvrez', 'davantage']} mark={[0]} at={147.7} y={330} size={64} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 30, display: 'flex', justifyContent: 'center'}}><div style={{...nb('#fff', 8), padding: '14px 34px', transform: `scale(${spring(t, 147.5)})`}}><Img src={staticFile(LOGO)} style={{height: 110, display: 'block'}} /></div></div>
        <div style={{position: 'absolute', left: 210, top: 260, width: 540, height: 120, ...nb(done ? NBK : RED, done ? 4 : 10), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 42, color: '#fff', transform: `translate(${done && t < click + 0.15 ? 6 : 0}px, ${done && t < click + 0.15 ? 6 : 0}px) scale(${pop(t, 147.6)})`}}>{done ? '✓ Ressources ouvertes' : 'Découvrir les ressources'}</div>
        {t > 147.7 && t < click + 0.8 && <div style={{position: 'absolute', left: lerp(860, 560, cur), top: lerp(600, 330, cur), zIndex: 5}}><svg width={60} height={74} viewBox="0 0 24 30"><path d="M2 2 L2 24 L8 18 L12 28 L16 26 L12 17 L20 17 Z" fill="#fff" stroke={INK} strokeWidth={2} strokeLinejoin="round" /></svg></div>}
        <div style={{position: 'absolute', left: 0, right: 0, top: 460, display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap'}}><Chip at={149.4} ic="graphique" l="management" c={NAVY} /><Chip at={150.1} ic="repeter" l="amélioration continue" c={GREEN} /></div>
        {t > 149.0 && <Dust n={24} c={ACC} />}
      </Abs>
    </>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const POPS: number[] = [16.4, 16.6, 16.8, 17.0, 17.6, 26.0, 26.4, 26.8, 31.4, 31.8, 32.5, 33.3, 37.9, 38.4, 39.0, 40.0, 40.7, 41.6, 45.0, 45.15, 45.3, 45.45, 54.8, 55.6, 56.1, 57.0, 63.4, 64.8, 66.0, 67.2, 72.0, 73.6, 85.0, 86.5, 87.0, 92.5, 93.0, 103.8, 104.7, 105.7, 106.6, 108.0, 108.9, 124.5, 124.7, 124.9, 125.1, 136.1, 138.6, 141.0, 149.4, 150.1];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...TEND.map((a) => ({at: a, s: 'bass-hit', v: 0.28})), ...TOOLS.map((x) => ({at: Math.max(x.nameAt, TEND[x.n - 1]), s: 'sfx/bell', v: 0.22})),
  ...POPS.map((a) => ({at: a, s: 'validation', v: 0.14})),
  {at: 6.9, s: 'sfx/swish', v: 0.35}, {at: 8.4, s: 'deep-hit', v: 0.3}, {at: 9.2, s: 'sfx/pop', v: 0.25}, {at: 10.0, s: 'sfx/pop', v: 0.25}, {at: 10.6, s: 'sfx/pop', v: 0.25},
  ...searchCues(11.0, 28, 11.95, 12.3), ...rep(12.9, 14, 0.05, 'sfx/pop', 0.1),
  ...rep(23.0, 9, 0.12, 'sfx/thud', 0.14), {at: 47.3, s: 'tension', v: 0.25, dur: 1.6}, {at: 72.0, s: 'soft-whoosh', v: 0.35, dur: 1.2},
  ...rep(78.8, 5, 0.18, 'sfx/swish', 0.18), {at: 80.3, s: 'tampon', v: 0.35}, {at: 85.4, s: 'sfx/click', v: 0.4}, {at: 86.2, s: 'deep-hit', v: 0.3},
  ...rep(90.0, 4, 0.15, 'sfx/thud', 0.3), {at: 94.8, s: 'bass-hit', v: 0.35}, {at: 101.0, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 109.6, s: 'tampon', v: 0.35},
  {at: 115.0, s: 'sfx/swish', v: 0.25}, {at: 117.4, s: 'sfx/swish', v: 0.25}, {at: 119.6, s: 'tampon', v: 0.35}, {at: 128.9, s: 'tampon', v: 0.35},
  {at: 133.3, s: 'deep-hit', v: 0.35}, {at: 134.0, s: 'soft-whoosh', v: 0.35, dur: 1}, {at: 138.6, s: 'sfx/swish', v: 0.3}, {at: 143.0, s: 'tampon', v: 0.35}, {at: 146.3, s: 'sfx/rise', v: 0.3, dur: 1.2},
  {at: 148.6, s: 'sfx/click', v: 0.55}, {at: 148.65, s: 'validation', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
export const OutilsStrat: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.8} to={14.0}><Intro /></Gate>
    {TOOLS.map((x, k) => <Gate key={x.n} from={TEND[k] - 0.3} to={(k < 13 ? TOOLS[k + 1].at : 130.1) + 0.1}><ToolScene k={k} /></Gate>)}
    <Gate from={133.3} to={147.6}><Retenir /></Gate>
    <Gate from={147.4} to={OUTRO_AT}><Fin /></Gate>
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={151.5}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-outils-strategiques-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT];
