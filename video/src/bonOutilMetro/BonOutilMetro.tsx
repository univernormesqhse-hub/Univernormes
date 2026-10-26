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
 * « Quel outil QHSE choisir ? Le bon outil au bon moment » (voix d'origine, 6 min 16) — capsule « condensé + effet
 * wahou + ultra premium » présentée en métro : une ligne à 8 stations = 8 outils (5S, QQOQCCP, Ishikawa + 5M, Pareto,
 * AMDEC, SWOT, audit interne, PDCA). Tube de verre à six guichets : le bon outil → analyser → prioriser → vérifier →
 * l'art du choix → communauté ; la capsule file d'un guichet à l'autre. Gyrophare (principal), loupe, capsule
 * pneumatique, store vénitien ; barre de recherche « visser une vis » qui écarte le marteau et ouvre le tournevis.
 * Chaque besoin s'affiche en carte « BESOIN », puis la carte se retourne en 3D sur l'outil, qui se construit à l'écran.
 * Finale : antisèche des 8 problématiques, jugement > encyclopédie, sondage communauté. Kits capsule-ui-neo-brutal et
 * capsule-recit-illustre. Couverture : photo + « LE BON OUTIL / AU BON MOMENT » en lettres-photos animées.
 */
const IMG = {
  cover: 'diag-gen/actions.jpg',
  c1: 'diag-gen/couverture.jpg',
  c2: 'ishikawa-gen/equipe-5m.jpg',
  s5: 'vingt-gen/5s.jpg',
  qqoq: 'diag-gen/responsable.jpg',
  ishi: 'ishikawa-gen/equipe-5m.jpg',
  amdec: 'promo/hse-machine.jpg',
  swot: 'sysqsse-gen/reunion.jpg',
  audit: 'isoperf-gen/auditeur.jpg',
  pdca: 'vingt-gen/roue.jpg',
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
const OUTRO_AT = 376.4;
export const BON_OUTIL_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '?', title: 'Le bon outil', s: 'au bon moment', c: NAVY, g: 'bon outil', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 52.4, n: '1', title: 'Analyser & organiser', s: '5S · QQOQCCP · Ishikawa', c: BLUE, g: 'analyser', k: 'gyro', lab: 'SECTION 1 / 4'},
  {at: 152.2, n: '2', title: 'Stratégie & priorités', s: 'Pareto · AMDEC · SWOT', c: ORANGE, g: 'prioriser', k: 'loupe', lab: 'SECTION 2 / 4'},
  {at: 247.2, n: '3', title: 'Vérifier & améliorer', s: 'audit interne · PDCA', c: TEAL, g: 'vérifier', k: 'tube', lab: 'SECTION 3 / 4'},
  {at: 304.2, n: '4', title: 'L’art du choix', s: 'le défi du professionnel', c: VIO, g: 'art du choix', k: 'store', lab: 'SECTION 4 / 4'},
  {at: 352.0, n: '★', title: 'À vous la parole', s: 'quel outil au quotidien ?', c: GREEN, g: 'communauté', k: 'gyro', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 351.2;
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
  {n: 1, l: '5S', s: '5S', at: 70.3},
  {n: 2, l: 'QQOQCCP', s: 'QQOQCCP', at: 102.1},
  {n: 3, l: 'Ishikawa + 5M', s: 'Ishikawa', at: 139.8},
  {n: 4, l: 'Pareto', s: 'Pareto', at: 174.5},
  {n: 5, l: 'AMDEC', s: 'AMDEC', at: 206.3},
  {n: 6, l: 'SWOT', s: 'SWOT', at: 233.0},
  {n: 7, l: 'Audit interne', s: 'audit', at: 268.8},
  {n: 8, l: 'PDCA', s: 'PDCA', at: 289.8},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE QHSE · STATION {r.n} / 8</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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

/* ═════════════ Les 8 outils ═════════════ */
type HD = [number, string[], number[]];
const TL: {n: number; from: number; to: number; need: string; needAt: number; q: string; qAt: number; name: string; tAt: number; c: string; heads: HD[]}[] = [
  {n: 1, from: 55.8, to: 88.5, need: 'un besoin très concret', needAt: 59.6, q: 'Comment organiser un poste de travail ?', qAt: 66.9, name: 'La méthode 5S', tAt: 70.3, c: BLUE, heads: [[59.6, ['Un', 'besoin', 'concret'], [1, 2]], [70.3, ['La', 'méthode', '5S'], [2]], [74.4, ['Pas', 'du', 'rangement'], [2]], [79.0, ['Structurer', 'et', 'éliminer'], [0, 2]], [83.3, ['Clarté', 'et', 'efficacité'], [0, 2]], [85.6, ['Le', 'socle', 'de', 'la', 'discipline'], [1, 4]]]},
  {n: 2, from: 88.5, to: 122.3, need: 'un défi de diagnostic', needAt: 93.4, q: 'Comment analyser une situation sous tous ses angles ?', qAt: 95.4, name: 'QQOQCCP', tAt: 102.1, c: BLUE, heads: [[89.0, ['Des', 'besoins', 'plus', 'complexes'], [3]], [95.4, ['Sous', 'tous', 'ses', 'angles'], [1, 3]], [102.1, ['Le', 'QQOQCCP'], [1]], [108.3, ['Toutes', 'les', 'questions'], [0, 2]], [118.3, ['Aucune', 'place', 'au', 'hasard'], [0, 3]]]},
  {n: 3, from: 122.3, to: 152.2, need: 'le mode investigation', needAt: 124.2, q: 'Comment identifier les causes profondes ?', qAt: 130.8, name: 'Ishikawa + 5M', tAt: 139.8, c: BLUE, heads: [[124.2, ['Mode', 'investigation'], [0, 1]], [129.4, ['À', 'la', 'racine'], [2]], [137.4, ['Une', 'double', 'solution'], [1, 2]], [144.8, ['Disséquer', 'et', 'trier'], [0, 2]], [147.5, ['Remonter', 'à', 'la', 'source'], [0, 3]]]},
  {n: 4, from: 155.6, to: 192.0, need: 'une montagne de problèmes', needAt: 165.9, q: 'Comment prioriser les actions à mener ?', qAt: 169.6, name: 'Pareto 80/20', tAt: 174.5, c: ORANGE, heads: [[156.9, ['Gérer', 'les', 'risques'], [0, 2]], [165.9, ['Une', 'montagne', 'de', 'problèmes'], [1, 3]], [174.4, ['Le', 'diagramme', 'de', 'Pareto'], [3]], [181.3, ['Concentrer', 'l’effort'], [0, 1]], [187.1, ['20 %', '→', '80 %'], [0, 2]]]},
  {n: 5, from: 192.0, to: 219.8, need: 'un coup d’avance', needAt: 197.0, q: 'Comment anticiper les défaillances ?', qAt: 200.4, name: 'AMDEC', tAt: 206.3, c: ORANGE, heads: [[192.3, ['Réagir', 'ne', 'suffit', 'plus'], [0, 3]], [198.2, ['Devenir', 'proactif'], [1]], [206.3, ['L’AMDEC'], [0]], [210.4, ['Cartographier', 'évaluer', 'neutraliser'], [0, 1, 2]], [214.2, ['Agir', 'bien', 'avant'], [0, 2]]]},
  {n: 6, from: 219.8, to: 247.2, need: 'prendre de la hauteur', needAt: 223.6, q: 'Comment analyser le contexte stratégique global ?', qAt: 224.5, name: 'SWOT', tAt: 233.0, c: ORANGE, heads: [[220.1, ['Prendre', 'de', 'la', 'hauteur'], [0, 3]], [232.8, ['Le', 'SWOT'], [1]], [240.2, ['Une', 'vision', 'macroscopique'], [1, 2]], [245.2, ['Les', 'grandes', 'décisions'], [1, 2]]]},
  {n: 7, from: 250.6, to: 278.4, need: 'la question de la preuve', needAt: 259.6, q: 'Comment vérifier l’efficacité d’un système ?', qAt: 262.1, name: 'L’audit interne', tAt: 268.8, c: TEAL, heads: [[252.1, ['Évaluer', 'les', 'systèmes'], [0, 2]], [259.4, ['La', 'preuve'], [1]], [268.6, ['L’audit', 'interne'], [0, 1]], [273.3, ['Comme', 'prévu'], [1]], [275.6, ['Transparence', 'et', 'objectivité'], [0, 2]]]},
  {n: 8, from: 278.4, to: 304.2, need: 'embarquer toute l’organisation', needAt: 279.9, q: 'Comment rendre l’amélioration continue durable ?', qAt: 282.7, name: 'Le cycle PDCA', tAt: 289.8, c: TEAL, heads: [[278.8, ['Embarquer', 'toute', 'l’organisation'], [0, 2]], [287.3, ['Le', 'moteur', 'PDCA'], [1, 2]], [295.2, ['Une', 'boucle', 'vertueuse'], [1, 2]], [298.4, ['Apprendre', 'de', 'chaque', 'action'], [0, 3]]]},
];
const headAt = (h: HD[], t: number) => h.reduce((a, x) => (t >= x[0] - 0.2 ? x : a), h[0]);
const QUADS = [['P', 'planifier', BLUE, 291.2, 180], ['D', 'faire', GREEN, 292.5, -90], ['C', 'vérifier', ORANGE, 293.1, 0], ['A', 'agir', RED, 294.0, 90]];
const arcP = (r: number, a0: number, a1: number) => { const p = (a: number) => [r * Math.cos((a * Math.PI) / 180), r * Math.sin((a * Math.PI) / 180)]; const [x0, y0] = p(a0); const [x1, y1] = p(a1); return `M 0 0 L ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1} Z`; };

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="boite-outils" w={1080} h={820} pos="50% 35%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 24%, ${PAPER}CC 32%, ${PAPER} 37%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 18}}><div style={{...nb(NBK, 5), color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3, padding: '8px 22px'}}>QUEL OUTIL QHSE CHOISIR ?</div><div style={{transform: 'rotate(-8deg)'}}><div style={{...nb(ORANGE, 5), color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 26, padding: '6px 16px'}}>8 OUTILS</div></div></Abs>
      <Abs x={0} y={650} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="LE BON OUTIL" src={IMG.c1} size={130} ls={3} /></Abs>
      <Abs x={0} y={800} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="AU BON MOMENT" src={IMG.c2} size={110} ls={2} seed={3} /></Abs>
      <Abs x={60} y={960} w={960} style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10}}>{TL.map((x, k) => <div key={x.n} style={{...nb('#fff', 4), boxShadow: `4px 4px 0 ${x.c}`, padding: '5px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 21, color: x.c, transform: `translateY(${(1 - Math.min(1, spring(t, 0.3 + k * 0.06))) * 60}px)`}}>{x.n}. {x.name}</div>)}</Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Intro ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  if (t < 16.7) return (
    <Out end={16.75}>
      <HiLine words={t < 10.0 ? ['Un', 'document', 'source'] : ['Le', 'monde', 'QHSE']} mark={t < 10.0 ? [1, 2] : [2]} at={t < 10.0 ? 3.0 : 10.2} y={330} size={64} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{...nb('#fff', 8), position: 'absolute', left: 120, top: 20, width: 720, height: 420, padding: 34, boxSizing: 'border-box', transform: `rotate(-2deg) scale(${pop(t, 2.9)})`}}>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: DIM, marginBottom: 20}}>DOCUMENT SOURCE</div>
          {[0, 1, 2, 3, 4, 5].map((k) => <div key={k} style={{position: 'relative', height: 18, borderRadius: 9, background: '#E3E8EF', marginBottom: 24, width: `${92 - (k % 3) * 12}%`}}>{k === 2 && <div style={{position: 'absolute', left: 0, top: -6, height: 30, width: `${prog(t, 5.3, 6.4) * 100}%`, background: `${YEL}AA`, borderRadius: 6}} />}</div>)}
        </div>
        {t > 8.4 && <div style={{position: 'absolute', left: 740, top: 0, transform: `scale(${Math.min(1, spring(t, 8.4))}) rotate(12deg)`}}><F n="puzzle" size={150} /></div>}
        <div style={{position: 'absolute', left: 0, right: 0, top: 500, display: 'flex', justifyContent: 'center', gap: 18}}>{[['Q', 'qualité', 12.2, BLUE], ['H', 'hygiène', 12.9, TEAL], ['S', 'sécurité', 13.7, RED], ['E', 'environnement', 14.4, GREEN]].map(([L, l, a, c]) => <div key={L as string} style={{...nb(t > (a as number) ? (c as string) : '#fff', 7), width: 210, height: 230, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${t > (a as number) ? Math.min(1, spring(t, a as number)) : 0.0001})`}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 120, color: '#fff', lineHeight: 0.9}}>{L}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: '#fff'}}>{l}</div></div>)}</div>
      </Abs>
    </Out>
  );
  if (t < 31.9) {
    const probs = ['?', '?', '?', '?'];
    const tools = ['boite-outils', 'loupe', 'graphique', 'repeter'];
    return (
      <Out end={31.95}>
        <HiLine words={t < 25.8 ? ['Le', 'bon', 'match'] : ['Une', 'philosophie', 'centrale']} mark={t < 25.8 ? [2] : [1, 2]} at={t < 25.8 ? 21.4 : 29.2} y={330} size={64} />
        <Abs x={60} y={440} w={960} h={930}>
          {t < 25.8 ? <>
            {probs.map((p, k) => <div key={k} style={{...nb('#fff', 6), position: 'absolute', left: 40, top: 20 + k * 150, width: 220, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: RED, opacity: pop(t, 17.0 + k * 0.15)}}>{p}</div>)}
            {tools.map((ic, k) => <div key={k} style={{...nb('#fff', 6), position: 'absolute', left: 700, top: 20 + ((k + 2) % 4) * 150, width: 220, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 17.6 + k * 0.15)}}><F n={ic} size={80} /></div>)}
            <svg style={{position: 'absolute', left: 0, top: 0}} width={960} height={650}>{[0, 1, 2, 3].map((k) => { const p = prog(t, 21.5 + k * 0.25, 21.9 + k * 0.25); const y1 = 80 + k * 150, y2 = 80 + ((k + 2) % 4) * 150; return <line key={k} x1={260} y1={y1} x2={lerp(260, 700, p)} y2={lerp(y1, y2, p)} stroke={[BLUE, ORANGE, TEAL, VIO][k]} strokeWidth={10} strokeLinecap="round" />; })}</svg>
            <div style={{position: 'absolute', left: 0, right: 0, top: 660, display: 'flex', justifyContent: 'center', gap: 14}}><Chip at={23.1} ic="cible" l="la bonne méthodologie" c={NAVY} /><Chip at={24.6} ic="question" l="le bon problème" c={RED} /></div>
          </> : <div style={{...nb('#fff', 8), position: 'absolute', left: 120, top: 40, width: 720, height: 500, padding: 34, boxSizing: 'border-box', opacity: pop(t, 25.9)}}>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: DIM, marginBottom: 24}}>DOCUMENT SOURCE · PHILOSOPHIE</div>
            {[0, 1, 2].map((k) => <div key={k} style={{height: 18, borderRadius: 9, background: '#E3E8EF', marginBottom: 24}} />)}
            <div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: NBK, marginTop: 20}}><span style={{position: 'absolute', left: -8, top: 4, height: 50, width: `${prog(t, 29.3, 30.5) * 100}%`, background: `${YEL}AA`, borderRadius: 8}} /><span style={{position: 'relative'}}>« résumée en une phrase »</span></div>
          </div>}
        </Abs>
      </Out>
    );
  }
  if (t < 43.9) return (
    <Out end={43.95}>
      <HiLine words={t < 37.3 ? ['L’essence', 'même'] : ['Ce', 'choix', 'fait', 'la', 'différence']} mark={t < 37.3 ? [0] : [1, 4]} at={t < 37.3 ? 34.6 : 37.6} y={330} size={60} />
      <Abs x={60} y={440} w={960} h={930}>
        {t < 37.3 ? <div style={{position: 'absolute', left: 0, right: 0, top: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30}}>
          <div style={{...nb(NAVY, 9), padding: '22px 40px', fontFamily: sansFont, fontWeight: 900, fontSize: 84, color: '#fff', transform: `scale(${Math.min(1, spring(t, 32.2))}) rotate(-2deg)`}}>LE BON OUTIL,</div>
          <div style={{...nb(YEL, 9), padding: '22px 40px', fontFamily: sansFont, fontWeight: 900, fontSize: 84, color: NBK, transform: `scale(${t > 33.4 ? Math.min(1, spring(t, 33.4)) : 0}) rotate(2deg)`}}>AU BON MOMENT</div>
          {t > 34.0 && <Dust n={20} c={GOLD} />}
        </div> : <>
          <div style={{...nb('#fff', 8), position: 'absolute', left: 0, top: 60, width: 440, height: 440, boxShadow: `8px 8px 0 ${GREEN}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, transform: `scale(${t > 40.3 ? Math.min(1, spring(t, 40.3)) : 0})`}}><div style={{transform: `translateY(${-Math.max(0, t - 40.6) * 40}px)`}}><F n="fusee" size={200} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, textAlign: 'center', color: GREEN}}>une action qui<br />cartonne</div></div>
          <div style={{...nb('#fff', 8), position: 'absolute', left: 520, top: 60, width: 440, height: 440, boxShadow: `8px 8px 0 ${RED}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, transform: `scale(${t > 42.0 ? Math.min(1, spring(t, 42.0)) : 0})`}}><div style={{transform: `rotate(${(t - 42) * 90}deg)`}}><F n="sablier" size={200} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, textAlign: 'center', color: RED}}>une énorme<br />perte de temps</div></div>
          <div style={{position: 'absolute', left: 420, top: 220, transform: `scale(${pop(t, 41.8)})`}}><div style={{...nb(NBK, 5), width: 120, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff'}}>VS</div></div>
        </>}
      </Abs>
    </Out>
  );
  return (
    <Out end={52.45}>
      <HiLine words={t < 49.9 ? ['Une', 'boîte', 'à', 'outils'] : ['Chaque', 'problème,', 'sa', 'méthode']} mark={t < 49.9 ? [1, 3] : [1, 3]} at={t < 49.9 ? 45.2 : 50.1} y={330} size={58} />
      <SearchOpen x={60} y={440} w={960} h={930} at={45.0} query="visser une vis" results={['Le marteau', 'Le tournevis', 'La clé à molette']} found={1} foundAt={48.6} clickAt={48.9} c={NAVY}>
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40}}><div style={{transform: `rotate(${(t - 49.6) * 200}deg)`}}><F n="tournevis" size={240} /></div><F n="boulon" size={160} /></div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 60, display: 'flex', justifyContent: 'center'}}><NBadge at={50.2} text="CHAQUE PROBLÈME MÉRITE SA MÉTHODE" bg={GREEN} rot={-2} size={30} /></div>
      </SearchOpen>
      {t > 48.0 && t < 48.95 && <div style={{position: 'absolute', left: 120, top: 440 + 130 + 43, width: 700, height: 6, background: RED, transform: `scaleX(${prog(t, 48.1, 48.5)})`, transformOrigin: '0 50%', zIndex: 21}} />}
    </Out>
  );
};

/* ═════════════ Les visuels d'outils ═════════════ */
const Viz: React.FC<{k: number}> = ({k}) => {
  const t = useT();
  const c = TL[k].c;
  switch (k) {
    case 0: return (<>
      <div style={{display: 'flex', gap: 12}}>{[['Seiri', 'trier'], ['Seiton', 'ranger'], ['Seiso', 'nettoyer'], ['Seiketsu', 'standardiser'], ['Shitsuke', 'tenir']].map(([j, f], i) => { const a = 76.4 + i * 0.35; return <div key={j} style={{...nb('#fff', 5), boxShadow: `5px 5px 0 ${c}`, width: 180, height: 150, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `rotateY(${t > a ? (1 - Math.min(1, spring(t, a))) * 90 : 90}deg)`}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: c, lineHeight: 0.9}}>S{i + 1}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22}}>{j}</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 16, color: DIM}}>{f}</div></div>; })}</div>
      <div style={{position: 'absolute', left: 0, top: 180, opacity: pop(t, 74.4)}}><div style={{position: 'relative', ...nb('#fff', 5), padding: '10px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: DIM}}>rangement de printemps<div style={{position: 'absolute', left: 10, right: 10, top: '50%', height: 6, background: RED, transform: `scaleX(${prog(t, 75.0, 75.5)})`, transformOrigin: '0 50%'}} /></div></div>
      <Shot src={IMG.s5} ic="balai" x={500} y={180} w={460} h={300} at={76.0} pos="50% 50%" c={c} />
      <div style={{position: 'absolute', left: 0, top: 280, display: 'flex', flexDirection: 'column', gap: 10}}><Chip at={79.0} ic="batiment" l="structurer l’espace" c={c} /><Chip at={80.5} ic="poubelle" l="éliminer le superflu" c={c} /><Chip at={83.3} ic="ampoule" l="clarté et efficacité" c={c} /></div>
      {t > 85.6 && <div style={{position: 'absolute', left: 520, top: 500}}><NBadge at={85.6} text="SOCLE DE LA DISCIPLINE" bg={NAVY} rot={-3} size={26} /></div>}
    </>);
    case 1: {
      const Q = [['qui', 111.2, 'equipe'], ['quoi', 111.9, 'colis'], ['où', 112.8, 'epingle'], ['quand', 113.4, 'calendrier'], ['comment', 114.0, 'engrenage'], ['combien', 114.6, 'argent'], ['pourquoi', 115.4, 'question']];
      const spin = prog(t, 118.5, 119.8, easeInOut) * 360;
      if (t < 107.8) { const al = prog(t, 105.0, 105.8, easeInOut); return <div style={{position: 'absolute', left: 0, top: 60, width: 960, height: 300}}>{'QQOQCCP'.split('').map((L, i) => <div key={i} style={{...nb('#fff', 6), position: 'absolute', left: lerp(80 + ((i * 271) % 760), 40 + i * 130, al), top: lerp(((i * 97) % 220), 60, al), width: 110, height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: c, transform: `rotate(${(1 - al) * ((i * 47) % 60 - 30)}deg) scale(${pop(t, 102.2 + i * 0.06)})`}}>{L}</div>)}{t > 105.0 && <div style={{position: 'absolute', left: 0, right: 0, top: 260, display: 'flex', justifyContent: 'center'}}><NBadge at={105.0} text="« acronyme barbare » → outil redoutable" bg={NAVY} rot={-2} size={26} /></div>}</div>; }
      return (<div style={{position: 'absolute', left: 0, top: 0, width: 960, height: 560}}>
        <div style={{position: 'absolute', left: 480 - 260, top: 270 - 260, width: 520, height: 520, transform: `rotate(${spin}deg)`}}>
          {Q.map(([l, a, ic], i) => { const ang = -90 + i * (360 / 7); const x = 260 + 210 * Math.cos((ang * Math.PI) / 180), y = 260 + 210 * Math.sin((ang * Math.PI) / 180); const on = t > (a as number); return <div key={l as string} style={{position: 'absolute', left: x - 70, top: y - 55, width: 140, height: 110, ...nb(on ? '#fff' : '#F1F1EA', 5), boxShadow: on ? `5px 5px 0 ${c}` : 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `rotate(${-spin}deg) scale(${on ? Math.min(1, spring(t, a as number)) : 0.7})`, opacity: on ? 1 : 0.3}}><F n={ic as string} size={46} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24}}>{l} ?</span></div>; })}
        </div>
        <div style={{position: 'absolute', left: 400, top: 190, width: 160, height: 160, borderRadius: 80, ...nb(c, 6), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff', textAlign: 'center', lineHeight: 1}}>7<br />questions</div>
        {t > 121.0 && <div style={{position: 'absolute', right: 0, top: 0, transform: `scale(${Math.min(1, spring(t, 121.0))})`}}><div style={{position: 'relative'}}><F n="de" size={110} /><svg style={{position: 'absolute', left: 0, top: 0}} width={110} height={110}><path d="M 10 10 L 100 100 M 100 10 L 10 100" stroke={RED} strokeWidth={10} strokeLinecap="round" /></svg></div></div>}
      </div>);
    }
    case 2: {
      const draw = prog(t, 139.8, 140.6, easeOut);
      const bones = [140, 300, 460, 620, 780];
      const run = prog(t, 147.5, 148.6, easeInOut);
      return (<>
        {t < 139.6 ? <div style={{position: 'absolute', left: 0, right: 0, top: 40, display: 'flex', justifyContent: 'center', gap: 60, alignItems: 'center'}}><div style={{transform: `scale(${pop(t, 124.2)})`}}><F n="detective" size={220} /></div>{t > 129.5 && <div style={{...nb('#fff', 7), padding: '20px 28px', display: 'flex', alignItems: 'center', gap: 14, fontFamily: sansFont, fontWeight: 900, fontSize: 36, transform: `scale(${Math.min(1, spring(t, 129.5))})`}}><F n="herbe" size={70} />à la racine</div>}</div> : <svg style={{position: 'absolute', left: 0, top: 0}} width={960} height={460}>
          <line x1={40} y1={230} x2={lerp(40, 820, draw)} y2={230} stroke={NBK} strokeWidth={12} strokeLinecap="round" />
          {bones.map((x, i) => { const up = i % 2 === 0; const p = prog(t, 140.2 + i * 0.15, 140.6 + i * 0.15); return <g key={i}><line x1={x} y1={230} x2={x - 70 * p} y2={230 + (up ? -150 : 150) * p} stroke={c} strokeWidth={9} strokeLinecap="round" />{t > 142.3 + i * 0.08 && <g><rect x={x - 120} y={up ? 40 : 380} width={90} height={50} rx={10} fill="#fff" stroke={NBK} strokeWidth={4} /><text x={x - 75} y={up ? 75 : 415} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={28} fill={c}>M{i + 1}</text></g>}</g>; })}
          <rect x={820} y={180} width={130} height={100} rx={14} fill={run >= 1 ? GOLD : NBK} stroke={NBK} strokeWidth={5} opacity={draw} />
          <text x={885} y={240} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={24} fill="#fff" opacity={draw}>{run >= 1 ? 'SOURCE' : 'problème'}</text>
          {run > 0 && run < 1 && <circle cx={lerp(40, 820, run)} cy={230} r={18} fill={GOLD} stroke={NBK} strokeWidth={4} />}
        </svg>}
        <div style={{position: 'absolute', left: 0, top: 470, display: 'flex', gap: 12, flexWrap: 'wrap'}}><Chip at={145.0} ic="ciseaux" l="disséquer les événements" c={c} /><Chip at={146.1} ic="classeur" l="trier les informations" c={c} /></div>
        {t > 150.6 && <div style={{position: 'absolute', right: 0, top: 470}}><NBadge at={150.6} text="HYPER STRUCTURÉ" bg={NAVY} rot={-3} size={26} /></div>}
      </>);
    }
    case 3: {
      const B = [0.9, 0.62, 0.44, 0.3, 0.2, 0.13, 0.08, 0.05];
      const grow = prog(t, 175.0, 176.6, easeOut);
      const hi = t > 187.1;
      if (t < 174.3) return (<div style={{position: 'absolute', left: 0, top: 0, width: 960, height: 520}}>
        {Array.from({length: 14}, (_, i) => <div key={i} style={{...nb('#fff', 4), position: 'absolute', left: 200 + (i % 5) * 110 - Math.floor(i / 5) * 0 + (Math.floor(i / 5) % 2) * 55, top: 340 - Math.floor(i / 5) * 110, width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: RED, transform: `translateY(${(1 - Math.min(1, t > 165.9 + i * 0.07 ? spring(t, 165.9 + i * 0.07) : 0)) * -500}px)`, opacity: t > 165.9 + i * 0.07 ? 1 : 0}}>?</div>)}
        {t > 167.5 && <div style={{position: 'absolute', left: 30, top: 60, transform: `scale(${Math.min(1, spring(t, 167.5))})`}}><div style={{...nb('#fff', 5), width: 180, height: 90, padding: 8, display: 'flex', gap: 6}}><div style={{width: '18%', background: RED, borderRadius: 4}} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, marginTop: 6}}>ressources limitées</div></div>}
      </div>);
      return (<>
        <svg style={{position: 'absolute', left: 0, top: 0}} width={960} height={440}>
          {B.map((v, i) => <rect key={i} x={60 + i * 105} y={400 - 360 * v * grow} width={80} height={360 * v * grow} fill={hi && i < 2 ? ORANGE : '#9FB3CC'} stroke={NBK} strokeWidth={4} style={{filter: hi && i < 2 ? `drop-shadow(0 0 14px ${ORANGE})` : undefined}} />)}
          <path d={B.reduce((acc, _, i) => { const cum = B.slice(0, i + 1).reduce((a, b) => a + b, 0) / B.reduce((a, b) => a + b, 0); return acc + `${i ? 'L' : 'M'} ${100 + i * 105} ${400 - 380 * cum} `; }, '')} fill="none" stroke={NAVY} strokeWidth={6} pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - prog(t, 176.6, 177.8)}} />
          <line x1={40} y1={400} x2={920} y2={400} stroke={NBK} strokeWidth={5} />
        </svg>
        {t > 177.5 && <div style={{position: 'absolute', right: 20, top: 0, transform: `scale(${Math.min(1, spring(t, 177.5))}) rotate(-6deg)`}}><div style={{...nb(YEL, 7), padding: '10px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 64}}>80/20</div></div>}
        {hi && <div style={{position: 'absolute', left: 40, top: 440, display: 'flex', gap: 14, alignItems: 'center'}}><NBadge at={187.2} text="20 % des actions" bg={ORANGE} rot={-2} size={28} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40}}>→</span>{t > 189.4 && <NBadge at={189.4} text="80 % des problèmes" bg={NAVY} rot={2} size={28} />}</div>}
        <div style={{position: 'absolute', left: 40, top: 520}}><Chip at={181.3} ic="cible" l="concentrer tout l’effort" c={c} /></div>
        {t > 191.2 && <div style={{position: 'absolute', right: 20, top: 520}}><Chip at={191.2} ic="chrono" l="gain de temps" c={GREEN} /></div>}
      </>);
    }
    case 4: {
      const bolt = prog(t, 213.8, 214.6, easeIn);
      return (<>
        {t < 206.1 ? <>
          <div style={{...nb('#fff', 6), position: 'absolute', left: 0, top: 20, padding: '12px 20px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: DIM, opacity: pop(t, 192.3)}}><div style={{position: 'relative'}}>réagir<div style={{position: 'absolute', left: -6, right: -6, top: '50%', height: 6, background: RED, transform: `scaleX(${prog(t, 195.4, 195.8)})`, transformOrigin: '0 50%'}} /></div></div>
          <div style={{position: 'absolute', left: 360, top: 80, transform: `scale(${pop(t, 197.0)}) translateY(${-Math.max(0, t - 197.2) * 20}px)`}}><F n="fusee" size={220} /></div>
          <div style={{position: 'absolute', left: 0, top: 380}}><Chip at={199.0} ic="telescope" l="devenir proactif" c={c} /></div>
        </> : <>
          <Shot src={IMG.amdec} ic="engrenage" x={480} y={0} w={480} h={330} at={206.3} pos="50% 40%" c={c} />
          <div style={{position: 'absolute', left: 0, top: 0, display: 'flex', flexDirection: 'column', gap: 12}}><Chip at={210.4} ic="carte" l="cartographier" c={c} /><Chip at={211.4} ic="balance" l="évaluer" c={c} /><Chip at={212.2} ic="bouclier" l="neutraliser" c={c} /></div>
          <div style={{position: 'absolute', left: lerp(60, 380, bolt), top: lerp(260, 380, bolt), opacity: t > 213.7 ? (t > 214.6 ? 1 - prog(t, 214.6, 215.0) : 1) : 0, transform: 'rotate(30deg)'}}><F n="eclair" size={120} /></div>
          {t > 214.4 && <div style={{position: 'absolute', left: 480, top: 340, transform: `scale(${Math.min(1, spring(t, 214.4))})`, filter: `drop-shadow(0 0 24px ${GREEN})`}}><F n="bouclier" size={160} /></div>}
          {t > 217.7 && <div style={{position: 'absolute', left: 0, top: 520, display: 'flex', gap: 6}}>{[0, 1, 2, 3, 4].map((i) => <div key={i} style={{width: 150, height: 60, background: TEAL, clipPath: 'polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%, 15% 50%)', opacity: prog(t, 217.7 + i * 0.1, 218.0 + i * 0.1), boxShadow: `0 0 20px ${GOLD}`}} />)}<span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, alignSelf: 'center', marginLeft: 10}}>chaîne de valeur protégée</span></div>}
        </>}
      </>);
    }
    case 5: {
      const zoom = lerp(1, 0.7, prog(t, 240.8, 241.8, easeInOut));
      if (t < 232.8) return (<div style={{position: 'absolute', left: 0, top: 0, width: 960, height: 540, overflow: 'hidden'}}><div style={{position: 'absolute', left: 280, top: 60, transform: `scale(${lerp(1.6, 0.9, prog(t, 220.2, 223.8, easeInOut))})`, transformOrigin: '50% 100%'}}><F n="montagne" size={400} /></div></div>);
      return (<div style={{position: 'absolute', left: 0, top: 0, width: 960, height: 540, transform: `scale(${zoom})`, transformOrigin: '50% 40%'}}>
        {[['S', 'forces', GREEN, 236.6], ['W', 'faiblesses', RED, 237.3], ['O', 'opportunités', BLUE, 238.2], ['T', 'menaces', ORANGE, 239.3]].map(([L, l, cc, a], i) => <div key={l as string} style={{...nb(t > (a as number) ? '#fff' : '#F1F1EA', 7), position: 'absolute', left: 80 + (i % 2) * 420, top: Math.floor(i / 2) * 250, width: 380, height: 220, boxShadow: t > (a as number) ? `7px 7px 0 ${cc}` : 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${t > (a as number) ? Math.min(1, spring(t, a as number)) : 0.9})`, opacity: t > (a as number) ? 1 : 0.35}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 96, color: cc as string, lineHeight: 0.9}}>{(L as string).toUpperCase()}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30}}>{l}</div></div>)}
        {t > 245.4 && <div style={{position: 'absolute', left: 0, right: 0, top: 500, display: 'flex', justifyContent: 'center'}}><NBadge at={245.4} text="ÉCLAIRE LES DÉCISIONS DE LA DIRECTION" bg={NAVY} rot={-2} size={26} /></div>}
      </div>);
    }
    case 6: return (<>
      {t < 268.6 ? <>
        <div style={{position: 'absolute', left: 0, top: 20, display: 'flex', gap: 12}}><Chip at={253.2} ic="engrenage" l="évaluer les systèmes en place" c={c} /></div>
        {t > 259.6 && <Stamp at={259.6} text="PREUVE ?" c={RED} x={300} y={200} rot={-8} size={80} />}
      </> : <>
        <Shot src={IMG.audit} ic="auditeur" x={0} y={0} w={480} h={340} at={268.8} pos="50% 35%" c={c} />
        <div style={{...nb('#fff', 7), position: 'absolute', left: 520, top: 0, width: 440, height: 340, padding: 24, boxSizing: 'border-box', opacity: pop(t, 269.4)}}>{[0, 1, 2, 3, 4].map((i) => <div key={i} style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18}}><div style={{width: 40, height: 40, border: `4px solid ${NBK}`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, color: GREEN, fontWeight: 900}}>{t > 270.6 + i * 0.4 ? '✓' : ''}</div><div style={{flex: 1, height: 14, borderRadius: 7, background: '#E3E8EF'}} /></div>)}</div>
        <LoupeSweep x0={540} y0={0} x1={760} y1={160} a={270.4} b={272.6} size={160} />
        {t > 273.3 && [0, 1].map((j) => <div key={j} style={{position: 'absolute', left: 40 + j * 120, top: 380, transform: `rotate(${(t - 273.3) * (j ? -140 : 140)}deg)`}}><F n="engrenage" size={110} /></div>)}
        {t > 274.2 && <div style={{position: 'absolute', left: 300, top: 400}}><NBadge at={274.2} text="COMME PRÉVU ✓" bg={GREEN} rot={-3} size={28} /></div>}
        <div style={{position: 'absolute', left: 0, top: 500, display: 'flex', gap: 10, flexWrap: 'wrap'}}><Chip at={275.8} ic="lunettes" l="transparence" c={c} /><Chip at={276.8} ic="balance" l="objectivité totale" c={c} /></div>
      </>}
    </>);
    case 7: {
      const spin = t > 295.3 ? (t - 295.3) * 160 : 0;
      const up = prog(t, 301.0, 301.8, easeOut);
      return (<>
        <div style={{position: 'absolute', left: 0, top: 0, display: 'flex', gap: 12, flexWrap: 'wrap'}}><Chip at={284.5} ic="repeter" l="véritable et durable" c={c} /><Chip at={287.3} ic="engrenage" l="le moteur" c={c} /></div>
        <svg style={{position: 'absolute', left: 260, top: lerp(110, 70, up), overflow: 'visible'}} width={440} height={440} viewBox="-220 -220 440 440"><g transform={`rotate(${spin})`}>{QUADS.map(([L, , cc, a, a0]) => { const p = prog(t, a as number, (a as number) + 0.35, easeOut); return <g key={L as string} transform={`scale(${p})`}><path d={arcP(190, a0 as number, (a0 as number) + 90)} fill={cc as string} stroke={NBK} strokeWidth={8} /><text x={105 * Math.cos((((a0 as number) + 45) * Math.PI) / 180)} y={105 * Math.sin((((a0 as number) + 45) * Math.PI) / 180) + 26} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={76} fill="#fff">{L}</text></g>; })}</g><circle r={58} fill="#fff" stroke={NBK} strokeWidth={8} /><text y={12} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={32} fill={NBK}>PDCA</text></svg>
        <div style={{position: 'absolute', left: 0, top: 120, display: 'flex', flexDirection: 'column', gap: 10}}>{QUADS.map(([L, l, cc, a]) => <div key={L as string} style={{...nb('#fff', 4), boxShadow: `4px 4px 0 ${cc}`, padding: '4px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: cc as string, opacity: pop(t, a as number)}}>{l}</div>)}</div>
        {t > 297.4 && <div style={{position: 'absolute', right: 0, top: 160}}><NBadge at={297.4} text="JAMAIS STAGNER" bg={RED} rot={4} size={26} /></div>}
        {t > 301.4 && <div style={{position: 'absolute', right: 20, top: 260, transform: `scale(${Math.min(1, spring(t, 301.4))})`}}><F n="hausse" size={110} /></div>}
        {t > 302.3 && <div style={{position: 'absolute', left: 430, top: 230, transform: `scale(${Math.min(1.2, spring(t, 302.3))})`, zIndex: 3}}><F n="coeur" size={100} /></div>}
      </>);
    }
    default: return null;
  }
};

/* ═════════════ Scène outil : carte BESOIN → retournement 3D sur l'outil → visuel ═════════════ */
const ToolScene: React.FC<{k: number}> = ({k}) => {
  const t = useT();
  const x = TL[k];
  const h = headAt(x.heads, t);
  const flip = prog(t, x.tAt - 0.1, x.tAt + 0.5, easeInOut);
  return (
    <Out end={x.to + 0.05}>
      <HiLine words={h[1]} mark={h[2]} at={h[0]} y={330} size={h[1].join(' ').length > 22 ? 54 : 62} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{...nb('#fff', 6), position: 'absolute', left: 0, top: 0, width: 560, height: 160, padding: '14px 20px', boxSizing: 'border-box', opacity: pop(t, x.from + 0.2)}}>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: RED, letterSpacing: 2}}>BESOIN N°{x.n}</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: t < x.qAt ? 34 : 28, color: NBK, lineHeight: 1.1, marginTop: 6}}>{t < x.needAt ? '…' : t < x.qAt ? x.need : x.q}</div>
        </div>
        <div style={{position: 'absolute', left: 590, top: 0, width: 370, height: 160, perspective: 1200}}>
          <div style={{position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: `rotateY(${flip * 180}deg)`}}>
            <div style={{...nb(NBK, 6), position: 'absolute', inset: 0, backfaceVisibility: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: '#fff'}}>?</div>
            <div style={{...nb(x.c, 6), position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#fffC'}}>OUTIL N°{x.n}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: x.name.length > 13 ? 34 : 44, color: '#fff', textAlign: 'center'}}>{x.name}</div></div>
          </div>
        </div>
        {flip > 0.5 && flip < 1 && <div style={{position: 'absolute', left: 560, top: -30, width: 430, height: 220, background: `radial-gradient(circle, ${YEL}88, transparent 70%)`}} />}
        <div style={{position: 'absolute', left: 0, top: 200, width: 960, height: 730}}><Viz k={k} /></div>
      </Abs>
    </Out>
  );
};

/* ═════════════ L'art du choix : antisèche → jugement ═════════════ */
const ROWS: [string, string, string][] = [['organiser un poste', '5S', BLUE], ['analyser une situation', 'QQOQCCP', BLUE], ['causes profondes', 'Ishikawa + 5M', BLUE], ['prioriser les actions', 'Pareto', ORANGE], ['anticiper les défaillances', 'AMDEC', ORANGE], ['contexte stratégique', 'SWOT', ORANGE], ['vérifier l’efficacité', 'audit interne', TEAL], ['amélioration durable', 'PDCA', TEAL]];
const Choix: React.FC = () => {
  const t = useT();
  if (t < 331.0) return (
    <Out end={331.05}>
      <HiLine words={t < 318.7 ? ['Le', 'professionnel', 'performant'] : ['L’antisèche', 'des', '8']} mark={t < 318.7 ? [1, 2] : [0, 2]} at={t < 318.7 ? 309.4 : 319.0} y={330} size={58} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{...nb('#fff', 8), position: 'absolute', left: 0, top: 0, width: 960, height: 820, boxShadow: `8px 8px 0 ${VIO}`, overflow: 'hidden', opacity: pop(t, 307.7)}}>
          <div style={{display: 'flex', height: 70, background: NAVY, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 22, alignItems: 'center', padding: '0 24px', justifyContent: 'space-between'}}><span>PROBLÉMATIQUE</span><span>SOLUTION DIRECTE</span></div>
          {ROWS.map(([p, s0, c], i) => { const a = 319.7 + i * 0.4; const on = t > a; return <div key={s0} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 90, padding: '0 24px', borderBottom: '3px solid #E3E8EF', opacity: on ? 1 : 0, transform: `translateX(${on ? (1 - Math.min(1, spring(t, a))) * -200 : 0}px)`}}><span style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: DIM}}>{i + 1}. {p}</span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>→</span><span style={{...nb(c, 4), padding: '4px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff'}}>{s0}</span></div>; })}
        </div>
        {t > 326.4 && <Stamp at={326.4} text="ANTISÈCHE" c={VIO} x={560} y={800} rot={-6} />}
      </Abs>
    </Out>
  );
  return (
    <Out end={352.05}>
      <HiLine words={t < 339.0 ? ['Pas', 'par', 'cœur'] : t < 348.4 ? ['Le', 'jugement'] : ['L’art', 'de', 'l’application']} mark={t < 339.0 ? [2] : t < 348.4 ? [1] : [0, 2]} at={t < 339.0 ? 336.6 : t < 348.4 ? 342.0 : 348.6} y={330} size={62} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{position: 'absolute', left: 40, top: 40, transform: `scale(${pop(t, 331.2)})`}}><div style={{position: 'relative'}}><F n="livres" size={260} />{t > 337.4 && <svg style={{position: 'absolute', left: 0, top: 0}} width={260} height={260}><path d="M 20 20 L 240 240 M 240 20 L 20 240" stroke={RED} strokeWidth={16} strokeLinecap="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - prog(t, 337.4, 337.9)}} /></svg>}</div><div style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: DIM}}>la liste par cœur</div></div>
        {t > 342.0 && <div style={{position: 'absolute', left: 520, top: 30, transform: `scale(${Math.min(1, spring(t, 342.0))})`, filter: `drop-shadow(0 0 30px ${VIO})`}}><F n="cerveau" size={260} /><div style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: VIO}}>capacité de jugement</div></div>}
        <div style={{position: 'absolute', left: 0, top: 420, display: 'flex', gap: 12, flexWrap: 'wrap'}}><Chip at={345.4} ic="cible" l="la méthode la plus pertinente" c={VIO} /><Chip at={347.4} ic="chrono" l="au moment parfait" c={VIO} /></div>
        {t > 348.6 && <div style={{position: 'absolute', left: 0, right: 0, top: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, transform: `scale(${Math.min(1, spring(t, 348.6))})`}}><div style={{...nb('#fff', 5), padding: '10px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: DIM}}>encyclopédie</div><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40}}>{'<'}</span><div style={{...nb(VIO, 5), padding: '10px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff'}}>application pratique</div></div>}
      </Abs>
    </Out>
  );
};

/* ═════════════ Communauté : le sondage ═════════════ */
const Communaute: React.FC = () => {
  const t = useT();
  const sel = t > 360.5 ? Math.floor(((t - 360.5) * 2.2) % 8) : -1;
  return (
    <>
      <HiLine words={t < 364.0 ? ['Quel', 'outil', 'au', 'quotidien', '?'] : t < 368.2 ? ['Partagez', 'en', 'commentaire'] : t < 372.2 ? ['L’outil', 'de', 'demain', '?'] : ['Merci', '!']} mark={t < 364.0 ? [1, 3] : t < 368.2 ? [0, 2] : t < 372.2 ? [0, 2] : [0]} at={t < 364.0 ? 357.6 : t < 368.2 ? 364.0 : t < 372.2 ? 368.3 : 372.3} y={330} size={58} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{...nb('#fff', 8), position: 'absolute', left: 0, top: 0, width: 960, height: 620, boxShadow: `8px 8px 0 ${GREEN}`, padding: 26, boxSizing: 'border-box', opacity: pop(t, 355.5)}}>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, marginBottom: 16}}>Quel outil utilisez-vous le plus ? Et pourquoi ?</div>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 12}}>{TL.map((x, i) => <div key={x.n} style={{...nb(sel === i ? x.c : '#fff', 4), width: 430, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: sel === i ? '#fff' : NBK, opacity: pop(t, 357.6 + i * 0.12)}}><div style={{width: 26, height: 26, borderRadius: 13, border: `4px solid ${sel === i ? '#fff' : NBK}`, background: sel === i ? '#fff' : 'transparent'}} />{x.name}</div>)}</div>
        </div>
        {t > 365.0 && <div style={{position: 'absolute', left: 40, top: 660, transform: `scale(${Math.min(1, spring(t, 365.0))})`}}><div style={{...nb('#fff', 6), padding: '14px 22px', display: 'flex', alignItems: 'center', gap: 12, fontFamily: sansFont, fontWeight: 900, fontSize: 30}}><F n="bulle" size={60} />votre expérience en commentaire</div></div>}
        {t > 370.3 && <div style={{position: 'absolute', right: 30, top: 640, transform: `scale(${Math.min(1.1, spring(t, 370.3))})`}}><F n="trophee" size={150} /></div>}
        {t > 372.3 && <Dust n={26} c={GOLD} />}
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
  {at: 5.3, s: 'stylo', v: 0.25, dur: 1.1}, {at: 8.4, s: 'sfx/pop', v: 0.25}, ...[12.2, 12.9, 13.7, 14.4].map((a) => ({at: a, s: 'tampon', v: 0.3})),
  ...rep(21.5, 4, 0.25, 'sfx/swish', 0.2), {at: 29.3, s: 'stylo', v: 0.25, dur: 1.2}, {at: 32.2, s: 'bass-hit', v: 0.4}, {at: 33.4, s: 'tampon', v: 0.4},
  {at: 40.3, s: 'sfx/rise', v: 0.3, dur: 1}, {at: 42.0, s: 'deep-hit', v: 0.3}, ...searchCues(45.0, 14, 48.6, 48.9), {at: 48.1, s: 'sfx/swish', v: 0.35},
  ...TL.flatMap((x) => [{at: x.qAt, s: 'sfx/pop', v: 0.25}, {at: x.tAt - 0.1, s: 'soft-whoosh', v: 0.4, dur: 0.8}, {at: x.tAt + 0.45, s: 'bass-hit', v: 0.35}]),
  ...rep(76.4, 5, 0.35, 'sfx/thud', 0.2), {at: 75.0, s: 'sfx/swish', v: 0.3}, {at: 85.6, s: 'tampon', v: 0.35},
  ...rep(102.2, 7, 0.06, 'sfx/pop', 0.18), {at: 105.0, s: 'soft-whoosh', v: 0.3, dur: 0.8}, ...[111.2, 111.9, 112.8, 113.4, 114.0, 114.6, 115.4].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})), {at: 118.5, s: 'soft-whoosh', v: 0.35, dur: 1.3}, {at: 121.0, s: 'tampon', v: 0.35},
  {at: 139.8, s: 'stylo', v: 0.3, dur: 0.8}, ...rep(142.3, 5, 0.08, 'sfx/pop', 0.18), {at: 147.5, s: 'sfx/rise', v: 0.3, dur: 1.1}, {at: 148.6, s: 'tampon', v: 0.35},
  ...rep(165.9, 14, 0.07, 'sfx/thud', 0.12), {at: 175.0, s: 'sfx/rise', v: 0.3, dur: 1.6}, {at: 177.5, s: 'tampon', v: 0.45}, {at: 187.2, s: 'bass-hit', v: 0.35}, {at: 189.4, s: 'tampon', v: 0.35},
  {at: 195.4, s: 'sfx/swish', v: 0.35}, {at: 197.0, s: 'sfx/rise', v: 0.3, dur: 1}, ...[210.4, 211.4, 212.2].map((a) => ({at: a, s: 'validation', v: 0.16})), {at: 214.5, s: 'deep-hit', v: 0.45}, {at: 217.7, s: 'soft-whoosh', v: 0.3, dur: 1},
  {at: 220.2, s: 'soft-whoosh', v: 0.35, dur: 3}, ...[236.6, 237.3, 238.2, 239.3].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), {at: 240.8, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 245.4, s: 'tampon', v: 0.35},
  {at: 259.6, s: 'tampon', v: 0.45}, ...rep(270.6, 5, 0.4, 'validation', 0.14), {at: 274.2, s: 'tampon', v: 0.35},
  ...QUADS.map((q) => ({at: q[3] as number, s: 'sfx/thud', v: 0.35})), {at: 295.3, s: 'soft-whoosh', v: 0.35, dur: 1.2}, {at: 301.4, s: 'sfx/rise', v: 0.3, dur: 0.8}, {at: 302.3, s: 'validation', v: 0.3},
  ...rep(319.7, 8, 0.4, 'sfx/swish', 0.16), {at: 326.4, s: 'tampon', v: 0.45}, {at: 337.4, s: 'sfx/swish', v: 0.4}, {at: 342.0, s: 'bass-hit', v: 0.35}, {at: 348.6, s: 'tampon', v: 0.35},
  ...rep(357.6, 8, 0.12, 'sfx/pop', 0.15), {at: 365.0, s: 'sfx/pop', v: 0.3}, {at: 370.3, s: 'validation', v: 0.35}, {at: 372.3, s: 'bass-hit', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
export const BonOutilMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.8} to={52.5}><Intro /></Gate>
    {TL.map((x, k) => <Gate key={x.n} from={x.from - 0.2} to={x.to + 0.1}><ToolScene k={k} /></Gate>)}
    <Gate from={307.5} to={352.1}><Choix /></Gate>
    <Gate from={355.3} to={OUTRO_AT}><Communaute /></Gate>
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={376.3}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-bon-outil-metro-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX];
