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
 * « Les 4 normes ISO fondamentales du QHSE » (voix d'origine, 6 min 10) — capsule « condensé + effet wahou + ultra
 * premium » présentée en métro (6 stations). Tube de verre à six guichets : fondamentaux → 9001 → 14001 → 45001 →
 * 19011 → pratique ; la capsule file d'un guichet à l'autre. Gyrophare (principal), loupe, capsule pneumatique, store
 * vénitien ; barre de recherche qui trouve et ouvre « les 4 normes fondamentales » (le programme). Fil rouge wahou :
 * l'ÉDIFICE QHSE — socle, trois piliers (9001, 14001, 45001) qui sortent de terre à leur partie, toit « système de
 * management » et clé de voûte 19011 qui tombe et verrouille l'ensemble ; si on retire une pièce, tout s'effondre.
 * Chaque partie : numéro géant en lettres-photos, puis fil de cartes qui défile au rythme de la voix. Finale : le pont
 * théorie → pratique, le cadre poussiéreux contre le moteur de performance. Kits capsule-ui-neo-brutal et
 * capsule-recit-illustre. Couverture : photo + « 4 NORMES / ISO QHSE » en lettres-photos animées.
 */
const IMG = {
  cover: 'sysqsse-gen/conception.jpg',
  c1: 'sysqsse-gen/qualite.jpg',
  c2: 'sysqsse-gen/environnement.jpg',
  q: 'sysqsse-gen/qualite.jpg',
  env: 'sysqsse-gen/environnement.jpg',
  sst: 'sysqsse-gen/sante.jpg',
  audit: 'isoperf-gen/auditeur.jpg',
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
const OUTRO_AT = 370.6;
export const EDIFICE_ISO_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '4', title: 'Les fondamentaux', s: 'pourquoi ces normes sont vitales', c: NAVY, g: 'fondamentaux', k: 'none', lab: 'PARTIE 1 / 6'},
  {at: 70.6, n: '1', title: 'ISO 9001', s: 'la qualité · 1er pilier', c: BLUE, g: 'ISO 9001', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 136.0, n: '2', title: 'ISO 14001', s: 'l’environnement · 2e pilier', c: GREEN, g: 'ISO 14001', k: 'loupe', lab: 'PARTIE 3 / 6'},
  {at: 191.6, n: '3', title: 'ISO 45001', s: 'santé & sécurité · 3e pilier', c: RED, g: 'ISO 45001', k: 'tube', lab: 'PARTIE 4 / 6'},
  {at: 246.6, n: '4', title: 'ISO 19011', s: 'l’audit · la clé de voûte', c: GOLD, g: 'ISO 19011', k: 'store', lab: 'PARTIE 5 / 6'},
  {at: 297.6, n: '⇢', title: 'De la théorie à la pratique', s: 'là où ça se joue', c: VIO, g: 'pratique', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 343.3;
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
  const S0 = SECTX[i];
  return (
    <>
      <Abs x={60} y={y} w={960} style={{textAlign: 'center'}}><Kin text={S0.title} at={at} size={S0.title.length > 20 ? 66 : 80} color={dark ? '#fff' : INK} /></Abs>
      <Abs x={0} y={y + (S0.title.length > 20 ? 190 : 120)} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-block', background: S0.c, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 2, padding: '6px 16px', borderRadius: 6, opacity: pop(t, at + 0.5)}}>{S0.s.toUpperCase()}</div></Abs>
    </>
  );
};
const Pneumatique: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const S0 = SECTX[i];
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
  const S0 = SECTX[i];
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
  const S0 = SECTX[i];
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
  const S0 = SECTX[i];
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
const STATIONS = [
  {n: 1, l: 'Fondamentaux', s: 'fondamentaux', at: 42.6},
  {n: 2, l: 'ISO 9001 · qualité', s: '9001', at: 73.6},
  {n: 3, l: 'ISO 14001 · environnement', s: '14001', at: 139.0},
  {n: 4, l: 'ISO 45001 · santé-sécurité', s: '45001', at: 194.6},
  {n: 5, l: 'ISO 19011 · audit', s: '19011', at: 249.0},
  {n: 6, l: 'Théorie → pratique', s: 'pratique', at: 300.6},
];
const Metro: React.FC = () => {
  const t = useT();
  const cur = STATIONS.reduce((a, x, k) => (t >= x.at ? k : a), -1);
  const sx = (k: number) => 80 + k * (800 / (STATIONS.length - 1));
  const mv = cur <= 0 ? 1 : prog(t, STATIONS[cur].at - 0.8, STATIONS[cur].at, easeInOut);
  const tx = cur < 0 ? sx(0) - 50 : cur === 0 ? sx(0) : lerp(sx(cur - 1), sx(cur), mv);
  return (
    <Abs x={60} y={1400} w={960} h={104} style={{zIndex: 30, background: 'rgba(255,255,255,0.95)', border: `4px solid ${INK}`, borderRadius: 20, boxShadow: `5px 5px 0 ${NAVY}`}}>
      <div style={{position: 'absolute', left: 80, right: 80, top: 30, height: 12, borderRadius: 6, background: `linear-gradient(90deg, ${GREEN}, ${BLUE}, ${RED}, ${ORANGE}, ${VIO}, ${TEAL})`}} />
      {STATIONS.map((x, k) => { const on = k <= cur; return <div key={x.n} style={{position: 'absolute', left: sx(k) - 18, top: 18, width: 36, height: 36, borderRadius: 18, background: on ? `radial-gradient(circle at 35% 30%, #DDEBFF, ${BLUE})` : '#fff', border: `4px solid ${on ? INK : '#9FB3CC'}`, boxSizing: 'border-box', color: on ? '#fff' : INK, fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: k === cur ? `0 0 18px ${BLUE}` : 'none'}}>{x.n}</div>; })}
      {STATIONS.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: sx(k) - 66, width: 132, top: 62, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 15, color: k === cur ? BURG : DIM}}>{x.s}</div>)}
      {cur >= 0 && <Img src={staticFile('metroiso-gen/metro/rame-dessus.png')} style={{position: 'absolute', left: tx - 50, top: 18, width: 100, height: 34, filter: 'drop-shadow(0 0 8px rgba(120,180,255,0.9))'}} />}
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE ISO · STATION {r.n} / 6</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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

/* ═════════════ L'ÉDIFICE QHSE (fil rouge) ═════════════ */
const PIL = [
  {x: 170, l: 'ISO 9001 · qualité', c: BLUE, at: 76.9},
  {x: 420, l: 'ISO 14001 · environnement', c: GREEN, at: 142.2},
  {x: 670, l: 'ISO 45001 · santé-sécurité', c: RED, at: 198.0},
];
const KEY_AT = 254.5;
const Edifice: React.FC = () => {
  const t = useT();
  const fond = t >= 41.4 && t < 70.6;
  /* fondamentaux : tout s'assemble (52,4), se relie (56,0), tient (64,8) puis une pièce sort (66,3) et tout s'effondre (68,5) */
  const pull = fond ? prog(t, 66.3, 67.2, easeIn) : 0;
  const fall = fond ? prog(t, 68.5, 69.8, easeIn) : 0;
  const pilOn = (k: number) => (fond ? prog(t, 52.4 + k * 0.2, 53.0 + k * 0.2, easeOut) : prog(t, PIL[k].at, PIL[k].at + 0.9, easeOut));
  const roofOn = fond ? prog(t, 64.6, 65.2) : Math.max(0.3 * prog(t, 76.9, 77.5), prog(t, KEY_AT, KEY_AT + 0.3));
  const keyY = fond ? lerp(-300, 0, prog(t, 53.4, 54.0, easeIn)) : lerp(-500, 0, prog(t, KEY_AT - 0.5, KEY_AT, easeIn));
  const keyOn = fond ? t > 53.4 : t > KEY_AT - 0.5;
  const locked = !fond && t > KEY_AT;
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: 960, height: 930}}>
      <div style={{position: 'absolute', left: 60, top: 800, width: 840, height: 80, ...nb(locked ? YEL : '#fff', 6), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, boxShadow: locked ? `0 0 40px ${GOLD}` : `6px 6px 0 ${NBK}`}}>SOCLE QHSE</div>
      {PIL.map((p, k) => { const h = 420 * pilOn(k); const out = k === 1 ? pull : 0; return <div key={k} style={{position: 'absolute', left: p.x + out * 600, top: 800 - h + fall * (k === 1 ? 0 : 60), width: 120, height: h, background: `linear-gradient(90deg, ${p.c}, ${p.c}CC 60%, ${p.c})`, border: h > 0 ? `5px solid ${NBK}` : 'none', boxSizing: 'border-box', overflow: 'hidden', transform: `rotate(${fall * (k === 0 ? -14 : 12)}deg)`, transformOrigin: '50% 100%', opacity: 1 - out}}><div style={{position: 'absolute', left: -200, right: -200, top: 190, transform: 'rotate(-90deg)', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', whiteSpace: 'nowrap'}}>{p.l}</div></div>; })}
      <div style={{position: 'absolute', left: 60, top: 240 + fall * 460, width: 840, height: 140, opacity: roofOn, transform: `rotate(${fall * 22}deg)`, transformOrigin: '20% 100%'}}>
        <svg width={840} height={140}><path d="M 0 140 L 70 20 L 770 20 L 840 140 Z" fill={NAVY} stroke={NBK} strokeWidth={8} /><path d="M 360 20 L 480 20 L 460 110 L 380 110 Z" fill={locked ? GOLD : '#2A3E66'} stroke={NBK} strokeWidth={6} /></svg>
        <div style={{position: 'absolute', left: 0, right: 0, top: 108, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 20, color: '#fff'}}>SYSTÈME DE MANAGEMENT</div>
      </div>
      {keyOn && <div style={{position: 'absolute', left: 420, top: 260 + keyY + fall * 600, width: 120, height: 90, transform: `rotate(${fall * 90}deg)`}}><svg width={120} height={90}><path d="M 0 0 L 120 0 L 100 90 L 20 90 Z" fill={GOLD} stroke={NBK} strokeWidth={6} /></svg><div style={{position: 'absolute', left: 0, right: 0, top: 24, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: NBK}}>19011</div></div>}
      {locked && t < KEY_AT + 0.8 && <div style={{position: 'absolute', left: 480 - (t - KEY_AT) * 600, top: 300 - (t - KEY_AT) * 600, width: (t - KEY_AT) * 1200, height: (t - KEY_AT) * 1200, borderRadius: '50%', border: `12px solid ${GOLD}`, opacity: 1 - (t - KEY_AT) / 0.8}} />}
      {fond && t > 56.0 && t < 66.3 && <svg style={{position: 'absolute', left: 0, top: 0}} width={960} height={930}>{[[230, 480], [480, 730]].map(([a, b], k) => <line key={k} x1={a} y1={560} x2={b} y2={560} stroke={GOLD} strokeWidth={8} strokeDasharray="16 10" strokeDashoffset={-t * 60} opacity={prog(t, 56.0, 56.6)} />)}</svg>}
    </div>
  );
};

/* ═════════════ Fil de cartes (beats synchronisés sur la voix) ═════════════ */
type Beat = {at: number; l: string; ic?: string; k?: 'chip' | 'strike' | 'badge' | 'def'; c?: string};
const Feed: React.FC<{beats: Beat[]; c: string; max?: number}> = ({beats, c, max = 4}) => {
  const t = useT();
  const shown = beats.filter((b) => t >= b.at);
  const start = Math.max(0, shown.length - max);
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: 960, height: 480, overflow: 'hidden'}}>
      {shown.map((b, i) => { const slot = i - start; const enter = Math.min(1, spring(t, b.at)); const y = 6 + slot * 116; const vis = slot >= 0; const col = b.c || c; return (
        <div key={i} style={{position: 'absolute', left: 0, right: 0, top: vis ? y : -120, display: 'flex', justifyContent: b.k === 'badge' ? 'center' : 'flex-start', opacity: vis ? 1 : 0, transform: `translateX(${(1 - enter) * -220}px)`, transition: undefined}}>
          {b.k === 'badge' ? <div style={{...nb(col, 6), padding: '14px 28px', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: '#fff', transform: `rotate(-2deg) scale(${enter})`}}>{b.l}</div>
            : b.k === 'strike' ? <div style={{position: 'relative', ...nb('#fff', 5), padding: '14px 22px', display: 'flex', alignItems: 'center', gap: 14, fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: DIM}}>{b.ic && <F n={b.ic} size={56} />}{b.l}<div style={{position: 'absolute', left: 10, right: 10, top: '50%', height: 7, background: RED, transform: `scaleX(${prog(t, b.at + 0.3, b.at + 0.7)})`, transformOrigin: '0 50%'}} /></div>
            : <div style={{...nb('#fff', 6), boxShadow: `6px 6px 0 ${col}`, padding: '12px 22px', display: 'flex', alignItems: 'center', gap: 14, maxWidth: 940, fontFamily: sansFont, fontWeight: 900, fontSize: b.k === 'def' ? 30 : 34, lineHeight: 1.1}}>{b.ic && <F n={b.ic} size={64} />}<span>{b.l}</span><span style={{color: ACC, fontSize: 32}}>✓</span></div>}
        </div>
      ); })}
    </div>
  );
};

/* ═════════════ Partie norme : numéro géant puis fil ; édifice en miniature dessous ═════════════ */
type Part = {from: number; to: number; num: string; numA: number; numB: number; img: string; c: string; sub: string; beats: Beat[]; heads: [number, string[], number[]][]};
const PARTS: Part[] = [
  {from: 74.0, to: 136.1, num: '9001', numA: 77.6, numB: 85.4, img: IMG.q, c: BLUE, sub: 'L’ÉTALON-OR DE LA QUALITÉ', heads: [[74.0, ['Le', 'premier', 'pilier'], [1, 2]], [85.5, ['L’étalon-or'], [0]], [93.6, ['Management', 'de', 'la', 'qualité'], [0, 3]], [101.0, ['Une', 'boîte', 'à', 'outils'], [1, 3]], [109.8, ['Taillé', 'pour', 'l’excellence'], [0, 2]], [114.6, ['4', 'actions', 'clés'], [0, 1]], [127.3, ['Mesurer', 'pour', 'améliorer'], [0, 2]], [132.2, ['Une', 'boucle', 'perpétuelle'], [1, 2]]], beats: [
    {at: 86.6, l: 'l’étalon-or de l’organisation', ic: 'medaille'},
    {at: 93.8, l: 'le management de la qualité', ic: 'batiment', k: 'def'},
    {at: 101.2, l: 'boîte à outils méthodologique', ic: 'boite-outils'},
    {at: 102.5, l: 'booster les résultats en continu', ic: 'hausse'},
    {at: 106.9, l: 'un simple contrôle en fin de chaîne', ic: 'loupe', k: 'strike'},
    {at: 116.6, l: '1 · structurer les processus', ic: 'engrenage'},
    {at: 119.4, l: '2 · maîtriser les non-conformités', ic: 'danger'},
    {at: 125.0, l: '3 · suivre les indicateurs', ic: 'graphique'},
    {at: 130.9, l: '4 · actions correctives', ic: 'cle'},
    {at: 133.2, l: '↻ BOUCLE PERPÉTUELLE', k: 'badge', c: BLUE},
  ]},
  {from: 139.4, to: 191.7, num: '14001', numA: 143.0, numB: 148.4, img: IMG.env, c: GREEN, sub: 'LE MANAGEMENT ENVIRONNEMENTAL', heads: [[139.4, ['Le', 'deuxième', 'pilier'], [1, 2]], [148.4, ['Pas', 'de', 'poudre', 'aux', 'yeux'], [2, 4]], [156.8, ['Management', 'environnemental'], [0, 1]], [163.4, ['Réduire', 'l’empreinte'], [0, 1]], [172.6, ['Une', 'logique', 'en', '3', 'étapes'], [3, 4]], [187.4, ['On', 'anticipe'], [1]]], beats: [
    {at: 148.6, l: 'du blabla, de la poudre aux yeux', ic: 'vent', k: 'strike'},
    {at: 151.2, l: 'une norme universelle', ic: 'globe'},
    {at: 157.0, l: 'le management environnemental', ic: 'arbre', k: 'def'},
    {at: 164.7, l: 'empreinte et performance écologique', ic: 'pas'},
    {at: 169.3, l: 'au quotidien et dans la stratégie', ic: 'cible'},
    {at: 175.6, l: '1 · diagnostic : aspects et impacts', ic: 'loupe'},
    {at: 181.5, l: '2 · maîtriser les déchets', ic: 'recyclage'},
    {at: 185.1, l: '3 · prévenir les pollutions', ic: 'bouclier'},
    {at: 190.4, l: 'UN VRAI CHANGEMENT DE POSTURE', k: 'badge', c: GREEN},
  ]},
  {from: 195.0, to: 246.7, num: '45001', numA: 199.4, numB: 206.0, img: IMG.sst, c: RED, sub: 'SANTÉ & SÉCURITÉ AU TRAVAIL', heads: [[195.0, ['Le', 'troisième', 'pilier'], [1, 2]], [206.6, ['Unifier', 'la', 'prévention'], [0, 2]], [215.2, ['Protéger', 'les', 'travailleurs'], [0, 2]], [221.4, ['Rentrer', 'en', 'santé'], [0, 2]], [226.8, ['Une', 'méthode', 'implacable'], [1, 2]], [238.4, ['Sauver', 'des', 'vies'], [0, 2]]], beats: [
    {at: 207.2, l: 'des pratiques unifiées sur tout le globe', ic: 'globe'},
    {at: 210.9, l: '100 % dédiée à la protection des équipes', ic: 'equipe'},
    {at: 217.0, l: 'des protocoles de prévention rigoureux', ic: 'clipboard'},
    {at: 221.5, l: 'rentrer chez soi en parfaite santé', ic: 'maison'},
    {at: 224.6, l: 'NON NÉGOCIABLE', k: 'badge', c: RED},
    {at: 228.9, l: '1 · identifier les dangers', ic: 'danger'},
    {at: 231.3, l: '2 · évaluer les risques professionnels', ic: 'balance'},
    {at: 233.6, l: '3 · imposer des mesures concrètes', ic: 'bouclier'},
    {at: 238.6, l: 'accidents et maladies pro en chute', ic: 'baisse'},
    {at: 243.7, l: 'SAUVER DES VIES', k: 'badge', c: RED},
  ]},
  {from: 250.0, to: 297.7, num: '19011', numA: 252.8, numB: 254.3, img: IMG.audit, c: GOLD, sub: 'LA CLÉ DE VOÛTE : L’AUDIT', heads: [[250.0, ['Le', 'dernier', 'pilier'], [1, 2]], [254.4, ['La', 'clé', 'de', 'voûte'], [1, 3]], [263.6, ['Les', 'règles', 'du', 'jeu'], [1, 3]], [270.2, ['Papier', 'ou', 'réalité', '?'], [0, 2]], [279.6, ['Un', 'audit', 'ne', 's’improvise', 'pas'], [1, 3]], [290.6, ['Une', 'investigation', 'impartiale'], [1, 2]]], beats: [
    {at: 256.6, l: 'la référence méthodique pour auditer', ic: 'livres'},
    {at: 264.1, l: 'lignes directrices pour l’audit des systèmes', ic: 'clipboard', k: 'def'},
    {at: 267.7, l: 'elle fixe les règles du jeu', ic: 'arbitre'},
    {at: 272.1, l: 'vérifier qualité · environnement · sécurité', ic: 'loupe'},
    {at: 275.3, l: 'de belles promesses sur le papier', ic: 'feuille', k: 'strike'},
    {at: 281.4, l: '1 · préparer le programme', ic: 'calendrier'},
    {at: 285.0, l: '2 · entretiens + preuves objectives', ic: 'megaphone'},
    {at: 291.3, l: '3 · formuler des constats clairs', ic: 'ecrit'},
    {at: 293.4, l: '4 · valider les actions correctives', ic: 'check'},
    {at: 295.9, l: 'INVESTIGATION IMPARTIALE', k: 'badge', c: GOLD},
  ]},
];
const NormPart: React.FC<{k: number}> = ({k}) => {
  const t = useT();
  const P = PARTS[k];
  const h = P.heads.reduce((a, x) => (t >= x[0] - 0.2 ? x : a), P.heads[0]);
  const big = t >= P.numA - 0.3 && t < P.numB;
  return (
    <Out end={P.to}>
      <HiLine words={h[1]} mark={h[2]} at={h[0]} y={330} size={58} />
      <Abs x={60} y={440} w={960} h={930}>
        {big ? <div style={{position: 'absolute', left: 0, top: 30, width: 960, height: 440, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, transform: `scale(${Math.min(1, spring(t, P.numA - 0.3))})`}}><PhotoLetterAnim ch={P.num} src={P.img} size={P.num.length > 4 ? 220 : 250} ls={6} /><div style={{...nb(P.c, 5), padding: '8px 22px', fontFamily: MONO, fontWeight: 700, fontSize: 26, color: '#fff', letterSpacing: 2}}>{P.sub}</div></div> : <Feed beats={P.beats} c={P.c} />}
        <div style={{position: 'absolute', left: 0, top: 480, width: 960, height: 930, transformOrigin: '50% 0', transform: 'scale(0.48)'}}><Edifice /></div>
      </Abs>
    </Out>
  );
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="batiment" w={1080} h={820} pos="50% 40%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 24%, ${PAPER}CC 32%, ${PAPER} 37%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 18}}><div style={{...nb(NBK, 5), color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3, padding: '8px 22px'}}>LES FONDATIONS DE L’EXCELLENCE</div></Abs>
      <Abs x={0} y={650} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="4 NORMES" src={IMG.c1} size={170} ls={5} /></Abs>
      <Abs x={0} y={830} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="ISO QHSE" src={IMG.c2} size={160} ls={5} seed={3} /></Abs>
      <Abs x={60} y={1020} w={960} style={{display: 'flex', justifyContent: 'center', gap: 12}}>{[['9001', BLUE], ['14001', GREEN], ['45001', RED], ['19011', GOLD]].map(([n, c], k) => <div key={n} style={{...nb(c, 5), padding: '8px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff', transform: `translateY(${(1 - Math.min(1, spring(t, 0.3 + k * 0.1))) * 60}px)`}}>ISO {n}</div>)}</Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Intro : fondations → recherche → programme ═════════════ */
const AGENDA: [string, string, string, number][] = [['fondamentaux QHSE', 'puzzle', NAVY, 25.4], ['ISO 9001 · qualité', 'medaille', BLUE, 28.4], ['ISO 14001 · environnement', 'arbre', GREEN, 30.4], ['ISO 45001 · santé-sécurité', 'casque', RED, 32.7], ['ISO 19011 · audit', 'loupe', GOLD, 36.0], ['théorie → pratique', 'outils', VIO, 38.8]];
const Intro: React.FC = () => {
  const t = useT();
  if (t < 19.5) return (
    <Out end={19.55}>
      <HiLine words={t < 11.6 ? ['Les', 'fondations', 'de', 'l’excellence'] : ['Le', 'socle', 'absolu']} mark={t < 11.6 ? [1, 3] : [1, 2]} at={t < 11.6 ? 3.0 : 16.4} y={330} size={58} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{...nb(t > 16.6 ? YEL : '#fff', 7), position: 'absolute', left: 60, top: 560, width: 840, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, transform: `scaleX(${prog(t, 5.0, 5.8, easeOut)})`, boxShadow: t > 16.6 ? `0 0 40px ${GOLD}` : `7px 7px 0 ${NBK}`}}>{t > 16.6 ? 'LE SOCLE ABSOLU' : 'fondations'}</div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 120, display: 'flex', justifyContent: 'center', gap: 16}}>{[['9001', BLUE], ['14001', GREEN], ['45001', RED], ['19011', GOLD]].map(([n, c], k) => <div key={n} style={{...nb(c, 6), width: 210, height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, color: '#fff', transform: `translateY(${(1 - Math.min(1, t > 9.0 + k * 0.12 ? spring(t, 9.0 + k * 0.12) : 0)) * -500}px)`, opacity: t > 9.0 + k * 0.12 ? 1 : 0}}><span style={{fontSize: 30}}>ISO</span><span style={{fontSize: 52}}>{n}</span></div>)}</div>
        {t > 12.5 && t < 16.4 && <div style={{position: 'absolute', left: 0, right: 0, top: 460, display: 'flex', justifyContent: 'center'}}><div style={{position: 'relative', ...nb('#fff', 5), padding: '8px 20px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM}}>de simples recommandations<div style={{position: 'absolute', left: 10, right: 10, top: '50%', height: 6, background: RED, transform: `scaleX(${prog(t, 13.1, 13.5)})`, transformOrigin: '0 50%'}} /></div></div>}
      </Abs>
    </Out>
  );
  return (
    <Out end={41.45}>
      <HiLine words={['Au', 'programme']} mark={[1]} at={22.2} y={330} size={64} />
      <SearchOpen x={60} y={440} w={960} h={930} at={19.6} query="normes ISO QHSE" results={['Une pile de recommandations', 'Les 4 normes fondamentales', 'Des certificats à encadrer']} found={1} foundAt={21.5} clickAt={21.8} c={NAVY}>
        <div style={{position: 'absolute', inset: 0, padding: 24, display: 'flex', flexDirection: 'column', gap: 16}}>{AGENDA.map(([l, ic, c, a], i) => { const on = t > a; return <div key={l} style={{...nb(on ? '#fff' : '#F1F1EA', 6), boxShadow: on ? `6px 6px 0 ${c}` : 'none', height: 110, display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px', opacity: on ? 1 : 0.35, transform: `translateX(${on ? (1 - Math.min(1, spring(t, a))) * -160 : 0}px)`}}><div style={{width: 60, height: 60, borderRadius: 30, background: on ? c : '#DDD', border: `4px solid ${NBK}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i + 1}</div><F n={ic} size={64} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36}}>{l}</span></div>; })}</div>
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ Partie 1 : les fondamentaux (l'édifice se monte… et s'effondre) ═════════════ */
const Fondamentaux: React.FC = () => {
  const t = useT();
  const head = t < 47.8 ? {w: ['Pourquoi', 'vitales', '?'], m: [1], a: 45.0} : t < 56.9 ? {w: ['Quatre', 'piliers', 'connectés'], m: [1, 2], a: 52.4} : t < 63.8 ? {w: ['Une', 'compréhension', 'globale'], m: [1, 2], a: 61.2} : t < 66.2 ? {w: ['Toute', 'la', 'baraque'], m: [2], a: 64.8} : {w: ['Une', 'pièce', 'en', 'moins…'], m: [1, 3], a: 66.3};
  return (
    <Out end={70.65}>
      <HiLine words={head.w} mark={head.m} at={head.a} y={330} size={60} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{position: 'absolute', inset: 0, opacity: pop(t, 41.6)}}><Edifice /></div>
        {t > 58.9 && t < 61.3 && <div style={{position: 'absolute', left: 30, top: 30, transform: `scale(${Math.min(1, spring(t, 58.9))})`}}><div style={{position: 'relative', ...nb('#fff', 5), padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 10, fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: DIM}}><F n="salarie" size={50} />expert dans son petit coin<div style={{position: 'absolute', left: 10, right: 10, top: '50%', height: 6, background: RED, transform: `scaleX(${prog(t, 60.2, 60.6)})`, transformOrigin: '0 50%'}} /></div></div>}
        {t > 68.6 && <div style={{position: 'absolute', left: 0, right: 0, top: 30, display: 'flex', justifyContent: 'center'}}><NBadge at={68.6} text="TOUT S’EFFONDRE" bg={RED} rot={-4} size={44} /></div>}
      </Abs>
    </Out>
  );
};

/* ═════════════ Partie 6 : de la théorie à la pratique (le pont) ═════════════ */
const Pratique: React.FC = () => {
  const t = useT();
  const bridge = prog(t, 338.6, 341.6, easeInOut);
  const head = t < 311.1 ? {w: ['La', 'ligne', 'de', 'départ'], m: [1, 3], a: 305.8} : t < 316.3 ? {w: ['Des', 'outils', 'opérationnels'], m: [1, 2], a: 312.6} : t < 326.2 ? {w: ['Faire', 'vivre', 'le', 'terrain'], m: [1, 3], a: 319.8} : t < 336.7 ? {w: ['Le', 'catalyseur'], m: [1], a: 331.8} : {w: ['Créer', 'un', 'pont'], m: [0, 2], a: 338.4};
  return (
    <Out end={344.35}>
      <HiLine words={head.w} mark={head.m} at={head.a} y={330} size={60} />
      <Abs x={60} y={440} w={960} h={930}>
        {t < 326.2 ? <>
          <div style={{position: 'absolute', left: 0, top: 40, width: 960, height: 14, background: `repeating-linear-gradient(90deg, ${NBK} 0 40px, #fff 40px 80px)`, border: `4px solid ${NBK}`, opacity: pop(t, 306.3)}} />
          <div style={{position: 'absolute', left: 30, top: 80, fontFamily: MONO, fontWeight: 700, fontSize: 24, opacity: pop(t, 306.4)}}>LIGNE DE DÉPART</div>
          {t > 309.0 && <div style={{position: 'absolute', left: 30, top: 140}}><div style={{position: 'relative', ...nb('#fff', 5), padding: '10px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM}}>la théorie par cœur<div style={{position: 'absolute', left: 10, right: 10, top: '50%', height: 6, background: RED, transform: `scaleX(${prog(t, 310.4, 310.9)})`, transformOrigin: '0 50%'}} /></div></div>}
          <div style={{position: 'absolute', left: 120, top: 260, opacity: 1 - prog(t, 313.6, 314.4), transform: `scale(${pop(t, 312.6) * (1 - 0.4 * prog(t, 313.6, 314.4))}) rotate(${prog(t, 313.6, 314.4) * 30}deg)`}}><F n="livres" size={220} /></div>
          <div style={{position: 'absolute', left: 120, top: 260, opacity: prog(t, 314.0, 314.6), transform: `scale(${lerp(0.5, 1, prog(t, 314.0, 314.6))})`}}><F n="boite-outils" size={220} /></div>
          <div style={{position: 'absolute', left: 420, top: 300, display: 'flex', flexDirection: 'column', gap: 12}}><Chip at={315.1} ic="outils" l="outils opérationnels" c={VIO} /><Chip at={320.0} ic="chantier" l="vivre sur le terrain" c={VIO} /><Chip at={324.0} ic="graphique" l="résultats tangibles et mesurables" c={VIO} /></div>
          {t > 321.4 && t < 323.0 && <div style={{position: 'absolute', left: 30, top: 140}}><NBadge at={321.4} text="THÉORIE PASSIVE ✗" bg={RED} rot={-3} size={28} /></div>}
        </> : <>
          <div style={{position: 'absolute', left: 0, right: 0, top: 20, display: 'flex', justifyContent: 'center', transform: `scale(${Math.min(1, spring(t, 328.6))})`}}><div style={{...nb('#fff', 8), padding: '18px 34px'}}><Img src={staticFile(LOGO)} style={{height: 110, display: 'block'}} /></div></div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 230, display: 'flex', justifyContent: 'center', gap: 12}}><Chip at={332.1} ic="eclair" l="catalyseur" c={VIO} /><Chip at={333.2} ic="cerveau" l="développement des compétences" c={VIO} /></div>
          <div style={{...nb('#fff', 6), position: 'absolute', left: 0, top: 520, width: 230, height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: pop(t, 338.2)}}><F n="livres" size={110} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26}}>théorie</span></div>
          <div style={{...nb('#fff', 6), position: 'absolute', right: 0, top: 520, width: 230, height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: pop(t, 341.4), boxShadow: `6px 6px 0 ${GREEN}`}}><F n="trophee" size={110} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, textAlign: 'center'}}>succès<br />opérationnel</span></div>
          <svg style={{position: 'absolute', left: 230, top: 440}} width={500} height={240}><path d="M 0 140 Q 250 -40 500 140" fill="none" stroke={VIO} strokeWidth={18} strokeLinecap="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - bridge}} /><line x1={0} y1={140} x2={500 * bridge} y2={140} stroke={NBK} strokeWidth={10} />{Array.from({length: 9}, (_, i) => { const x = 50 + i * 50; const y0 = 140 - (1 - Math.pow((x - 250) / 250, 2)) * 92; return x / 500 < bridge ? <line key={i} x1={x} y1={y0} x2={x} y2={140} stroke={VIO} strokeWidth={6} /> : null; })}</svg>
          {bridge >= 1 && <Dust n={20} c={GOLD} />}
        </>}
      </Abs>
    </Out>
  );
};

/* ═════════════ Question finale : cadre poussiéreux ou moteur de performance ═════════════ */
const Question: React.FC = () => {
  const t = useT();
  const head = t < 348.5 ? {w: ['Une', 'question', 'provocatrice'], m: [1, 2], a: 346.8} : t < 357.0 ? {w: ['Poussière', 'ou', 'moteur', '?'], m: [0, 2], a: 351.6} : t < 361.6 ? {w: ['L’impact', 'réel'], m: [0, 1], a: 359.4} : {w: ['Subir', 'ou', 's’en', 'servir', '?'], m: [0, 3], a: 365.8};
  return (
    <>
      <HiLine words={head.w} mark={head.m} at={head.a} y={330} size={60} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{position: 'absolute', left: 0, top: 40, width: 440, height: 520, opacity: pop(t, 349.4), filter: t > 351.7 ? 'sepia(0.7) brightness(0.85)' : undefined}}>
          <div style={{position: 'absolute', inset: 0, border: '22px solid #8B6A3E', borderRadius: 6, background: '#FFF8E5', boxShadow: 'inset 0 0 0 6px #5C4524', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12}}><F n="diplome" size={150} /><span style={{fontFamily: MONO, fontWeight: 700, fontSize: 24}}>CERTIFICAT ISO</span></div>
          {t > 351.7 && Array.from({length: 22}, (_, i) => { const p = ((t - 351.7) * 0.5 + i / 22) % 1; return <div key={i} style={{position: 'absolute', left: (i * 41) % 420, top: p * 520, width: 6, height: 6, borderRadius: 3, background: '#9C8A6A', opacity: 0.8 * (1 - p)}} />; })}
          <div style={{position: 'absolute', left: 0, right: 0, bottom: -60, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: DIM}}>au fond d’un couloir…</div>
        </div>
        <div style={{...nb('#fff', 8), position: 'absolute', right: 0, top: 40, width: 440, height: 520, boxShadow: `8px 8px 0 ${GREEN}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, transform: `scale(${t > 354.9 ? Math.min(1, spring(t, 354.9)) : 0})`}}><div style={{transform: `rotate(${(t - 355) * 160}deg)`}}><F n="engrenage" size={170} /></div><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, textAlign: 'center', color: GREEN}}>moteur de<br />performance</span></div>
        {t > 359.4 && <div style={{position: 'absolute', left: 0, right: 0, top: 620, display: 'flex', justifyContent: 'center'}}><NBadge at={359.4} text="LA CONFORMITÉ = L’IMPACT RÉEL" bg={NAVY} rot={-2} size={30} /></div>}
        {t > 366.1 && <div style={{position: 'absolute', left: 0, right: 0, top: 720, display: 'flex', justifyContent: 'center', gap: 20, alignItems: 'center'}}><div style={{position: 'relative', ...nb('#fff', 5), padding: '10px 20px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM}}>subir les règles<div style={{position: 'absolute', left: 10, right: 10, top: '50%', height: 6, background: RED, transform: `scaleX(${prog(t, 368.6, 369.0)})`, transformOrigin: '0 50%'}} /></div>{t > 369.0 && <div style={{transform: `scale(${Math.min(1, spring(t, 369.0))})`}}><NBadge at={369.0} text="UNE ARME STRATÉGIQUE" bg={GREEN} rot={-3} size={30} /></div>}</div>}
        {t > 369.4 && <Dust n={24} c={GOLD} />}
      </Abs>
    </>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at, s: 'sfx/bell', v: 0.22})),
  {at: 5.0, s: 'soft-whoosh', v: 0.3, dur: 0.8}, ...rep(9.0, 4, 0.12, 'sfx/thud', 0.25), {at: 13.1, s: 'sfx/swish', v: 0.35}, {at: 16.6, s: 'tampon', v: 0.4},
  ...searchCues(19.6, 15, 21.5, 21.8), ...AGENDA.map((a) => ({at: a[3], s: 'sfx/pop', v: 0.2})),
  ...rep(52.4, 4, 0.2, 'sfx/thud', 0.35), {at: 56.0, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 60.2, s: 'sfx/swish', v: 0.3}, {at: 64.8, s: 'tampon', v: 0.35}, {at: 66.3, s: 'sfx/swish', v: 0.45}, {at: 68.5, s: 'deep-hit', v: 0.5}, {at: 68.9, s: 'sfx/thud', v: 0.5}, {at: 69.3, s: 'sfx/thud', v: 0.4},
  ...PIL.map((p) => ({at: p.at, s: 'sfx/rise', v: 0.3, dur: 0.9})), ...PIL.map((p) => ({at: p.at + 0.9, s: 'sfx/thud', v: 0.4})),
  ...PARTS.flatMap((P) => [{at: P.numA - 0.3, s: 'bass-hit', v: 0.4}, ...P.beats.map((b) => ({at: b.at, s: b.k === 'badge' ? 'tampon' : b.k === 'strike' ? 'sfx/swish' : 'sfx/pop', v: b.k === 'badge' ? 0.35 : 0.2}))]),
  {at: KEY_AT - 0.5, s: 'sfx/whoosh', v: 0.4}, {at: KEY_AT, s: 'bass-hit', v: 0.5}, {at: KEY_AT + 0.05, s: 'tampon', v: 0.45},
  {at: 306.3, s: 'sfx/pop', v: 0.25}, {at: 310.4, s: 'sfx/swish', v: 0.35}, {at: 313.6, s: 'soft-whoosh', v: 0.35, dur: 1}, {at: 328.6, s: 'bass-hit', v: 0.35}, {at: 338.6, s: 'sfx/rise', v: 0.3, dur: 3}, {at: 341.6, s: 'validation', v: 0.35},
  {at: 349.4, s: 'sfx/pop', v: 0.25}, {at: 351.7, s: 'soft-whoosh', v: 0.25, dur: 1.4}, {at: 354.9, s: 'bass-hit', v: 0.35}, {at: 359.4, s: 'tampon', v: 0.35}, {at: 368.6, s: 'sfx/swish', v: 0.35}, {at: 369.0, s: 'tampon', v: 0.45},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
export const EdificeIsoMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.8} to={41.5}><Intro /></Gate>
    <Gate from={41.4} to={70.7}><Fondamentaux /></Gate>
    {PARTS.map((P, k) => <Gate key={k} from={P.from - 0.2} to={P.to + 0.1}><NormPart k={k} /></Gate>)}
    <Gate from={300.9} to={344.4}><Pratique /></Gate>
    <Gate from={344.2} to={OUTRO_AT}><Question /></Gate>
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={370.5}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-edifice-iso-metro-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, ORANGE];
