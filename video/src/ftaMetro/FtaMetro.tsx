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
 * « FTA — analyse par arbre des défaillances » (voix d'origine, seconde prise, 62 s) — capsule « condensé + effet
 * wahou + ultra premium » présentée en métro (7 stations). Tube de verre à six guichets : définition → méthode →
 * principe → portes logiques → exemple → objectif ; la capsule file d'un guichet à l'autre. Gyrophare, loupe, capsule
 * pneumatique, store vénitien, éclairs de gyrophare ; barre de recherche « FTA » qui ouvre le sigle. Techniques :
 * cartes qui se retournent en 3D (Fault → Défaillances, Tree → Arbre, Analysis → Analyse), causes « ? » balayées à la
 * loupe qui convergent vers l'événement redouté (ondes d'alarme), arbre qui pousse du sommet vers les causes (traits
 * qui se tracent, événements de base en cercles), portes ET / OU en circuits où le courant circule (lampe qui ne
 * s'allume qu'avec les deux entrées pour ET, avec une seule pour OU), local électrique en SVG qui s'embrase puis se
 * réduit en nœud sommet de l'arbre (transition d'élément partagé), 4 causes dessinées (court-circuit, isolant abîmé,
 * multiprise surchargée, protection hors service), cadenas à combinaison dont les molettes alignent les défaillances
 * puis s'ouvre sur l'incendie. Kits capsule-ui-neo-brutal et capsule-recit-illustre ; images de la session réutilisées.
 */
const IMG = {
  cover: 'apr-gen/consignation-apr.jpg',
  c1: 'permisfeu/soudeur-etincelles.jpg',
  c2: 'ident/electrique.jpg',
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
const OUTRO_AT = 62.6;
export const FTA_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.6, n: '1', title: 'FTA', s: 'fault tree analysis', c: RED, g: 'définition', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 6.3, n: '2', title: 'La méthode', s: 'causes → événement', c: ORANGE, g: 'méthode', k: 'gyro', lab: 'GUICHET 2 / 6'},
  {at: 12.3, n: '3', title: 'Le principe', s: 'du sommet aux causes', c: BLUE, g: 'principe', k: 'loupe', lab: 'GUICHET 3 / 6'},
  {at: 21.2, n: '4', title: 'Portes logiques', s: 'ET · OU', c: VIO, g: 'portes', k: 'tube', lab: 'GUICHET 4 / 6'},
  {at: 38.55, n: '5', title: 'Exemple', s: 'incendie · local électrique', c: NAVY, g: 'exemple', k: 'store', lab: 'GUICHET 5 / 6'},
  {at: 57.0, n: '6', title: "L'objectif", s: 'combinaisons', c: GREEN, g: 'objectif', k: 'none', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 61.5;
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
  {n: 1, l: 'FTA', s: 'fta', at: 2.9},
  {n: 2, l: 'Événement redouté', s: 'événement', at: 11.3},
  {n: 3, l: 'Sommet', s: 'sommet', at: 16.1},
  {n: 4, l: 'Porte ET', s: 'porte et', at: 27.3},
  {n: 5, l: 'Porte OU', s: 'porte ou', at: 33.8},
  {n: 6, l: 'Local électrique', s: 'local élec.', at: 45.6},
  {n: 7, l: 'Combinaisons', s: 'combinaisons', at: 59.0},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE FTA · STATION {r.n} / 7</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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
/* ═════════════ Outils communs ═════════════ */
type HD = [number, string[], number[]];
const headAt = (h: HD[], t: number) => h.reduce((a, x) => (t >= x[0] - 0.2 ? x : a), h[0]);
const Heads: React.FC<{h: HD[]}> = ({h}) => {
  const t = useT();
  const x = headAt(h, t);
  const len = x[1].join(' ').length;
  return <HiLine words={x[1]} mark={x[2]} at={x[0]} y={330} size={len > 26 ? 50 : len > 20 ? 56 : 62} />;
};
const fmt = (v: number) => Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const arcP = (r: number, a0: number, a1: number) => { const p = (a: number) => [r * Math.cos((a * Math.PI) / 180), r * Math.sin((a * Math.PI) / 180)]; const [x0, y0] = p(a0); const [x1, y1] = p(a1); return `M 0 0 L ${x0} ${y0} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1} Z`; };
const Strk: React.FC<{at: number; c?: string}> = ({at, c = RED}) => {
  const t = useT();
  return <div style={{position: 'absolute', left: 8, right: 8, top: '50%', height: 7, background: c, borderRadius: 4, transform: `scaleX(${prog(t, at, at + 0.4)}) rotate(-3deg)`, transformOrigin: '0 50%'}} />;
};
const Row: React.FC<{at: number; ic: string; l: string; c: string; fs?: number; w?: number}> = ({at, ic, l, c, fs = 30, w}) => {
  const t = useT();
  const on = t > at;
  return <div style={{...nb('#fff', 5), boxShadow: `5px 5px 0 ${c}`, width: w, display: 'flex', alignItems: 'center', gap: 14, padding: '10px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: fs, lineHeight: 1.1, opacity: on ? 1 : 0, transform: `translateX(${on ? (1 - Math.min(1, spring(t, at))) * -160 : 0}px)`}}><F n={ic} size={58} /><span style={{flex: 1}}>{l}</span><span style={{color: ACC}}>{t > at + 0.4 ? '✓' : ''}</span></div>;
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="danger" w={1080} h={820} pos="52% 30%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 24%, ${PAPER}CC 32%, ${PAPER} 37%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={590} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="ANALYSE PAR" src={IMG.c2} size={92} ls={2} seed={2} /></Abs>
      <Abs x={0} y={700} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="ARBRE DES" src={IMG.c2} size={92} ls={2} seed={4} /></Abs>
      <Abs x={0} y={810} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="DÉFAILLANCES :" src={IMG.c2} size={82} ls={1} seed={5} /></Abs>
      <Abs x={0} y={925} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="FTA" src={IMG.c1} size={220} ls={6} /></Abs>
      <Abs x={40} y={1200} w={1000} style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10}}>{[['ÉVÉNEMENT', RED], ['CAUSES', ORANGE], ['PORTE ET', BLUE], ['PORTE OU', VIO]].map(([n, c], k) => <div key={n} style={{...nb(c, 4), padding: '6px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', transform: `translateY(${(1 - Math.min(1, spring(t, 0.3 + k * 0.08))) * 60}px)`}}>{n}</div>)}</Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={NAVY} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

const Barred: React.FC<{at: number; strk: number; text: string; fs?: number}> = ({at, strk, text, fs = 30}) => {
  const t = useT();
  if (t < at) return null;
  return <div style={{position: 'relative', display: 'inline-block', ...nb('#fff', 5), padding: '10px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: fs, color: DIM, transform: `scale(${pop(t, at)})`}}>{text}<Strk at={strk} /></div>;
};


/* ═════════════ Les 15 normes ═════════════ */
const Flap: React.FC<{text: string; at: number; size: number; c: string}> = ({text, at, size, c}) => {
  const t = useT();
  return (
    <div style={{display: 'flex', gap: size * 0.08}}>
      {text.split('').map((ch, i) => {
        const land = at + 0.25 + i * 0.12;
        const done = t >= land;
        const roll = Math.floor((t - at) * 22 + i * 3);
        const shown = done ? ch : /[0-9]/.test(ch) ? String((roll % 10 + 10) % 10) : ch === ' ' ? ' ' : String.fromCharCode(65 + ((roll % 26) + 26) % 26);
        const flip = done ? Math.max(0, 1 - (t - land) * 6) : (t * 22) % 1;
        if (t < at) return <div key={i} style={{width: size * 0.66, height: size}} />;
        return (
          <div key={i} style={{position: 'relative', width: size * 0.66, height: size, borderRadius: size * 0.08, background: ch === ' ' ? 'transparent' : NIGHT, border: ch === ' ' ? 'none' : `3px solid ${NBK}`, boxShadow: ch === ' ' ? 'none' : `0 ${size * 0.06}px 0 #00000055`, overflow: 'hidden', perspective: 400}}>
            <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontWeight: 700, fontSize: size * 0.7, color: done ? (ch === ' ' ? 'transparent' : '#fff') : '#9CC6FF', transform: `rotateX(${flip * 70}deg)`, textShadow: done ? `0 0 12px ${c}` : 'none'}}>{shown}</div>
            {ch !== ' ' && <div style={{position: 'absolute', left: 0, right: 0, top: '50%', height: 3, background: '#000', opacity: 0.6}} />}
          </div>
        );
      })}
    </div>
  );
};
/** Mini tableau périodique (5 × 3) qui se remplit au fil des normes. */






/* ═════════════ Éclair de gyrophare (non bloquant) ═════════════ */
const GyroFlash: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  const q = (t - at) / 0.9;
  if (q < 0 || q > 1) return null;
  const a = Math.sin(q * Math.PI);
  return <AbsoluteFill style={{zIndex: 70, pointerEvents: 'none', opacity: a * 0.6, background: `radial-gradient(circle at ${50 + 45 * Math.cos(q * 12)}% 10%, rgba(224,56,62,0.85), transparent 45%), radial-gradient(circle at ${50 - 45 * Math.cos(q * 12)}% 10%, rgba(31,111,209,0.85), transparent 45%)`}} />;
};

/* ═════════════ Pictogrammes des 4 causes (SVG maison) ═════════════ */
const CauseIco: React.FC<{k: number; size?: number; t?: number}> = ({k, size = 120, t = 0}) => (
  <svg width={size} height={size} viewBox="0 0 120 120">
    {k === 0 && <>
      <path d="M 6 70 L 46 70 L 54 58" fill="none" stroke={NBK} strokeWidth={9} strokeLinecap="round" />
      <path d="M 114 50 L 74 50 L 66 62" fill="none" stroke={NBK} strokeWidth={9} strokeLinecap="round" />
      <path d={`M 60 ${36 + Math.sin(t * 30) * 3} L 66 52 L 82 46 L 70 60 L 86 72 L 66 68 L 62 86 L 56 68 L 38 74 L 52 60 L 36 46 L 54 52 Z`} fill={YEL} stroke={ORANGE} strokeWidth={3} />
    </>}
    {k === 1 && <>
      <rect x={4} y={50} width={44} height={22} rx={10} fill={NBK} />
      <rect x={72} y={50} width={44} height={22} rx={10} fill={NBK} />
      {[0, 1, 2, 3].map((j) => <path key={j} d={`M 46 ${54 + j * 4.5} Q 60 ${48 + j * 7} 74 ${54 + j * 4.5}`} fill="none" stroke="#D9822B" strokeWidth={3} />)}
      <path d="M 52 26 L 58 40 L 50 40 L 60 56" fill="none" stroke={YEL} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" opacity={0.6 + 0.4 * Math.sin(t * 20)} />
    </>}
    {k === 2 && <>
      <rect x={8} y={62} width={104} height={34} rx={8} fill="#fff" stroke={NBK} strokeWidth={5} />
      {[0, 1, 2, 3].map((j) => <g key={j}><rect x={18 + j * 24} y={44} width={14} height={20} rx={3} fill={NBK} /><line x1={25 + j * 24} y1={44} x2={25 + j * 24} y2={24 - j * 3} stroke={NBK} strokeWidth={4} /></g>)}
      {[0, 1, 2].map((j) => <path key={`h${j}`} d={`M ${30 + j * 30} 110 q 6 -6 0 -12 q -6 -6 0 -12`} fill="none" stroke={RED} strokeWidth={4} opacity={0.5 + 0.5 * Math.sin(t * 8 + j)} />)}
    </>}
    {k === 3 && <>
      <rect x={24} y={14} width={72} height={92} rx={10} fill="#E6EAF0" stroke={NBK} strokeWidth={5} />
      <rect x={46} y={30} width={28} height={44} rx={6} fill={NBK} />
      <rect x={50} y={34} width={20} height={18} rx={3} fill="#9AA3B2" />
      <path d="M 18 18 L 102 102 M 102 18 L 18 102" stroke={RED} strokeWidth={9} strokeLinecap="round" />
    </>}
  </svg>
);
const CAUSES: [string, number, string][] = [['Courts-circuits', 50.72, ORANGE], ["Défauts d'isolation", 52.04, RED], ['Surcharges électriques', 53.72, VIO], ['Défaillances de protection', 55.28, BLUE]];

/* ═════════════ Guichet 1 : FTA ? → recherche → cartes qui se retournent (anglais → français) ═════════════ */
const FLIPS: [string, string, number, string][] = [['Fault', 'Défaillances', 5.84, RED], ['Tree', 'Arbre', 5.4, GREEN], ['Analysis', 'Analyse', 4.64, BLUE]];
const Intro: React.FC = () => {
  const t = useT();
  return (
    <Out end={6.45}>
      <Heads h={[[2.85, ['FTA', '?'], [0]], [3.76, ['Analyse', 'par arbre', 'des défaillances'], [1, 2]]]} />
      <SearchOpen x={60} y={440} w={960} h={900} at={2.6} query="FTA" results={['FTA · Fault Tree Analysis', 'AMDEC · modes de défaillance', 'JSA · analyse des tâches']} found={0} foundAt={3.0} clickAt={3.3} c={RED}>
        {FLIPS.map(([en, fr, at, c], k) => {
          const f = prog(t, at - 0.15, at + 0.35, easeInOut);
          const ang = f * 180;
          const front = ang < 90;
          return (
            <div key={en} style={{position: 'absolute', left: 60, right: 60, top: 70 + k * 200, height: 170, perspective: 1400, opacity: pop(t, 3.6 + k * 0.12), transform: `translateY(${(1 - Math.min(1, spring(t, 3.6 + k * 0.12))) * 60}px)`}}>
              <div style={{position: 'absolute', inset: 0, ...nb(front ? '#fff' : c, 7), borderColor: NBK, transform: `rotateX(${front ? ang : ang - 180}deg)`, display: 'flex', alignItems: 'center', padding: '0 34px', gap: 24}}>
                {front ? <>
                  <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 96, color: c, lineHeight: 1}}>{en[0]}</span>
                  <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 72, color: INK, marginLeft: -24}}>{en.slice(1)}</span>
                  <span style={{marginLeft: 'auto', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>EN</span>
                </> : <>
                  <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: '#fff'}}>{fr}</span>
                  <span style={{marginLeft: 'auto', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#ffffffcc'}}>FR</span>
                </>}
              </div>
            </div>
          );
        })}
        <div style={{position: 'absolute', left: 0, right: 0, top: 690, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18, opacity: pop(t, 6.0)}}><F n="arbre" size={110} /><div style={{...nb(YEL, 6), padding: '10px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 38}}>arbre des défaillances</div></div>
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ Guichet 2 : la méthode — les causes convergent vers l'événement redouté ═════════════ */
const QPOS: [number, number][] = [[150, 1150], [330, 1060], [520, 1170], [700, 1070], [880, 1160], [430, 960], [640, 950]];
const Methode: React.FC = () => {
  const t = useT();
  const conv = prog(t, 11.0, 11.5, easeIn);
  const lx = lerp(120, 940, prog(t, 9.95, 10.9, easeInOut));
  return (
    <Out end={12.55}>
      <Heads h={[[9.9, ['Rechercher', 'les', 'causes'], [2]], [11.28, ['Événement', 'redouté'], [0, 1]]]} />
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        {QPOS.map(([x, y], k) => conv > 0 && <line key={k} x1={x} y1={y} x2={lerp(x, 540, conv)} y2={lerp(y, 640, conv)} stroke={RED} strokeWidth={6} strokeDasharray="14 10" strokeDashoffset={-t * 60} opacity={0.8} />)}
      </svg>
      {QPOS.map(([x, y], k) => {
        const at = 9.95 + k * 0.1;
        return t > at && <Abs key={k} x={x - 60} y={y - 60} w={120} h={120} style={{...nb('#fff', 5), borderRadius: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1, spring(t, at)) * (1 - 0.25 * conv)})`, borderColor: Math.abs(lx - x) < 90 ? ORANGE : NBK}}><F n="question" size={70} /></Abs>;
      })}
      {t < 11.0 && <Abs x={lx - 90} y={1000} w={180} h={180} style={{opacity: pop(t, 9.95)}}><F n="loupe" size={170} /></Abs>}
      <Abs x={240} y={470} w={600} h={190} style={{...nb(t > 11.3 ? RED : '#fff', 9), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, transform: `scale(${t > 11.25 ? 1 + Math.max(0, 1 - (t - 11.25) * 3) * 0.12 : 0.9})`, opacity: t > 9.95 ? 1 : 0, color: t > 11.3 ? '#fff' : DIM}}>
        <F n="sirene" size={110} />
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, lineHeight: 1.05}}>ÉVÉNEMENT<br />REDOUTÉ</div>
      </Abs>
      {t > 11.3 && [0, 1, 2].map((k) => { const q = ((t - 11.3) * 1.2 + k / 3) % 1; return <Abs key={k} x={540 - 300 - q * 160} y={565 - 95 - q * 80} w={600 + q * 320} h={190 + q * 160} style={{border: `5px solid ${RED}`, borderRadius: 30, opacity: (1 - q) * 0.7}} />; })}
    </Out>
  );
};

/* ═════════════ Guichet 3 : le principe — l'arbre pousse du sommet vers les causes ═════════════ */
const L1X = [310, 770], L2X = [190, 430, 650, 890];
const Principe: React.FC = () => {
  const t = useT();
  const d1 = prog(t, 17.75, 18.3), d2 = prog(t, 18.75, 19.3), d3 = prog(t, 19.85, 20.25);
  const seg = (x1: number, y1: number, x2: number, y2: number, p: number, c: string, key: string) => p > 0 && <path key={key} d={`M ${x1} ${y1} L ${x1} ${(y1 + y2) / 2} L ${x2} ${(y1 + y2) / 2} L ${x2} ${y2}`} fill="none" stroke={c} strokeWidth={6} pathLength={1} strokeDasharray={`${p} 1`} />;
  const camY = lerp(0, -40, prog(t, 17.7, 20.6, easeInOut));
  return (
    <Out end={21.35}>
      <Heads h={[[16.0, ['Au', 'sommet', "de l'arbre"], [1, 2]], [17.72, ['Remonter', 'vers', 'les causes'], [0, 2]]]} />
      <AbsoluteFill style={{transform: `translateY(${camY}px)`}}>
        <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
          {L1X.map((x, k) => seg(540, 610, x, 760, d1, NBK, `a${k}`))}
          {L2X.map((x, k) => seg(L1X[k < 2 ? 0 : 1], 860, x, 1010, d2, NBK, `b${k}`))}
          {L2X.map((x, k) => d3 > 0 && <line key={`c${k}`} x1={x} y1={1100} x2={x} y2={1100 + 90 * d3} stroke={NBK} strokeWidth={6} />)}
        </svg>
        <Abs x={240} y={470} w={600} h={140} style={{...nb(RED, 8), color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: pop(t, 16.0)}}>
          <F n="sirene" size={84} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, lineHeight: 1.05}}>ÉVÉNEMENT<br />INDÉSIRABLE</div>
        </Abs>
        <Abs x={850} y={430} w={180} style={{opacity: pop(t, 16.1)}}><NBadge at={16.1} text="SOMMET" bg={NBK} rot={6} size={26} /></Abs>
        {L1X.map((x, k) => t > 18.3 && <Abs key={k} x={x - 150} y={760} w={300} h={100} style={{...nb('#fff', 6), borderColor: ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transform: `scale(${Math.min(1, spring(t, 18.3 + k * 0.08))})`}}><F n="question" size={56} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: ORANGE}}>cause</span></Abs>)}
        {L2X.map((x, k) => t > 19.3 && <Abs key={k} x={x - 110} y={1010} w={220} h={90} style={{...nb('#fff', 5), borderColor: VIO, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transform: `scale(${Math.min(1, spring(t, 19.3 + k * 0.08))})`}}><F n="question" size={44} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: VIO}}>cause</span></Abs>)}
        {L2X.map((x, k) => t > 20.25 && <Abs key={`e${k}`} x={x - 45} y={1190} w={90} h={90} style={{borderRadius: 45, background: '#fff', border: `5px solid ${NBK}`, boxShadow: `4px 4px 0 ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1, spring(t, 20.25 + k * 0.06))})`}}><span style={{fontSize: 40, fontWeight: 900, color: BLUE}}>?</span></Abs>)}
        <Abs x={10} y={640} w={50} h={lerp(0, 620, prog(t, 17.72, 20.5, easeInOut))} style={{overflow: 'hidden'}}><div style={{width: 14, height: 2000, margin: '0 auto', background: `repeating-linear-gradient(180deg, ${BLUE} 0 26px, transparent 26px 40px)`}} /></Abs>
        {t > 17.72 && <Abs x={-5} y={640 + lerp(0, 620, prog(t, 17.72, 20.5, easeInOut)) - 20} w={80} style={{fontSize: 56, color: BLUE, textAlign: 'center', lineHeight: 1}}>▼</Abs>}
      </AbsoluteFill>
    </Out>
  );
};

/* ═════════════ Guichet 4 : les portes logiques ET / OU — circuits avec courant qui circule ═════════════ */
const andPath = 'M -80 70 L -80 0 A 80 80 0 0 1 80 0 L 80 70 Z';
const orPath = 'M -80 75 Q -70 -10 0 -85 Q 70 -10 80 75 Q 0 40 -80 75 Z';
const Wire: React.FC<{d: string; on: boolean; t: number}> = ({d, on, t}) => (
  <g>
    <path d={d} fill="none" stroke={on ? YEL : '#C0C8D4'} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} fill="none" stroke={NBK} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" opacity={0.35} />
    {on && <path d={d} fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" strokeDasharray="6 26" strokeDashoffset={t * 160} />}
  </g>
);
const GateDemo: React.FC<{t: number; kind: 'et' | 'ou'; a: boolean; b: boolean}> = ({t, kind, a, b}) => {
  const out = kind === 'et' ? a && b : a || b;
  const c = kind === 'et' ? BLUE : VIO;
  return (
    <svg width={960} height={820} viewBox="0 0 960 820">
      <Wire d="M 480 290 L 480 150" on={out} t={t} />
      <Wire d="M 260 680 L 260 520 L 440 520 L 440 450" on={a} t={t} />
      <Wire d="M 700 680 L 700 520 L 520 520 L 520 450" on={b} t={t} />
      <g transform="translate(480 380)"><path d={kind === 'et' ? andPath : orPath} fill={out ? c : '#fff'} stroke={NBK} strokeWidth={7} /><text y={kind === 'et' ? 45 : 40} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={46} fill={out ? '#fff' : c}>{kind === 'et' ? 'ET' : 'OU'}</text></g>
      <g transform="translate(480 90)">
        {out && <circle r={95 + Math.sin(t * 10) * 6} fill={YEL} opacity={0.35} />}
        <circle r={64} fill={out ? YEL : '#E6EAF0'} stroke={NBK} strokeWidth={7} />
        <rect x={-24} y={58} width={48} height={30} rx={6} fill="#9AA3B2" stroke={NBK} strokeWidth={5} />
        <text y={16} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={46} fill={out ? RED : '#A9B1BE'}>!</text>
      </g>
      {[[260, a, 'A'], [700, b, 'B']].map(([x, on, l]) => (
        <g key={l as string} transform={`translate(${x} 730)`}>
          <rect x={-140} y={-50} width={280} height={100} rx={18} fill={on ? ORANGE : '#fff'} stroke={NBK} strokeWidth={6} />
          <text y={12} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={32} fill={on ? '#fff' : DIM}>événement {l as string}</text>
        </g>
      ))}
    </svg>
  );
};
const Portes: React.FC = () => {
  const t = useT();
  const phase = t < 27.1 ? 0 : t < 33.7 ? 1 : 2;
  return (
    <Out end={38.7}>
      <Heads h={[[24.28, ['Porte', 'ET', 'et', 'porte', 'OU'], [1, 4]], [27.24, ['La', 'porte', 'ET'], [2]], [30.16, ['Simultanément'], [0]], [31.28, ['Conjointement'], [0]], [33.8, ['La', 'porte', 'OU'], [2]], [37.04, ['Indépendamment'], [0]]]} />
      {phase === 0 && [['et', 24.96, BLUE, 300], ['ou', 26.24, VIO, 780]].map(([k, at, c, x]) => t > (at as number) - 0.1 && (
        <Abs key={k as string} x={(x as number) - 210} y={560} w={420} h={560} style={{...nb('#fff', 8), borderColor: c as string, transform: `scale(${Math.min(1, spring(t, (at as number) - 0.1))})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24}}>
          <svg width={240} height={240} viewBox="-120 -120 240 240"><path d={k === 'et' ? andPath : orPath} fill={c as string} stroke={NBK} strokeWidth={7} /><line x1={0} y1={-80} x2={0} y2={-118} stroke={NBK} strokeWidth={7} /><line x1={-40} y1={70} x2={-40} y2={118} stroke={NBK} strokeWidth={7} /><line x1={40} y1={70} x2={40} y2={118} stroke={NBK} strokeWidth={7} /></svg>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: c as string}}>PORTE {k === 'et' ? 'ET' : 'OU'}</div>
        </Abs>
      ))}
      {phase === 1 && <Abs x={60} y={440} w={960} h={820} style={{opacity: pop(t, 27.1)}}><GateDemo t={t} kind="et" a={t > 29.4} b={t > 30.16} /></Abs>}
      {phase === 2 && <Abs x={60} y={440} w={960} h={820} style={{opacity: pop(t, 33.7)}}><GateDemo t={t} kind="ou" a={t > 36.28 && t < 36.95} b={t > 37.1} /></Abs>}
      {phase === 1 && t > 29.4 && t < 30.16 && <Abs x={60} y={1270} w={960} style={{textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 30, color: DIM}}>un seul événement… rien ne se passe</Abs>}
      {phase === 1 && t > 30.3 && <Abs x={60} y={1265} w={960} style={{display: 'flex', justifyContent: 'center', gap: 20}}><NBadge at={30.3} text="SIMULTANÉMENT" bg={BLUE} rot={-3} size={34} />{t > 31.35 && <NBadge at={31.35} text="CONJOINTEMENT" bg={NAVY} rot={3} size={34} />}</Abs>}
      {phase === 2 && t > 37.2 && <Abs x={60} y={1265} w={960} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={37.2} text="INDÉPENDAMMENT" bg={VIO} rot={-3} size={38} /></Abs>}
    </Out>
  );
};

/* ═════════════ Guichet 5 : exemple — local électrique qui s'embrase, puis l'arbre des 4 causes ═════════════ */
const Room: React.FC<{t: number}> = ({t}) => {
  const fire = prog(t, 44.85, 45.6, easeOut);
  return (
    <svg width="100%" height="100%" viewBox="0 0 960 700" preserveAspectRatio="xMidYMid slice">
      <rect width={960} height={700} fill="#DCE3EC" />
      <rect y={600} width={960} height={100} fill="#9AA3B2" />
      {[0, 1, 2].map((k) => <path key={k} d={`M ${380 + k * 50} 90 L ${380 + k * 50} 20 L ${380 + k * 50 + 200} 0`} fill="none" stroke="#5B6472" strokeWidth={10} />)}
      <rect x={280} y={90} width={400} height={510} rx={14} fill="#C9D2DF" stroke={NBK} strokeWidth={7} />
      <rect x={300} y={110} width={360} height={470} rx={8} fill="#E6EAF0" stroke={NBK} strokeWidth={4} />
      {[0, 1, 2].map((r) => Array.from({length: 6}, (_, c) => <g key={`${r}${c}`}><rect x={320 + c * 55} y={150 + r * 120} width={40} height={80} rx={5} fill="#fff" stroke={NBK} strokeWidth={3} /><rect x={332} y={170 + r * 120} width={16} height={24} rx={3} fill={fire > 0.3 && (r + c) % 3 === 0 ? RED : NBK} transform={`translate(${c * 55} 0)`} /></g>))}
      <g transform="translate(760 220)"><path d="M 0 -60 L 56 40 L -56 40 Z" fill={YEL} stroke={NBK} strokeWidth={6} /><path d="M 6 -26 L -10 6 L 4 6 L -6 30 L 14 -4 L 0 -4 Z" fill={NBK} /></g>
      <circle cx={130} cy={60} r={26} fill={fire > 0 ? RED : '#FFF6C9'} stroke={NBK} strokeWidth={4} opacity={fire > 0 ? 0.6 + 0.4 * Math.sin(t * 14) : 1} />
      {fire > 0 && <>
        <rect width={960} height={700} fill={RED} opacity={0.12 + 0.08 * Math.sin(t * 10)} />
        {Array.from({length: 9}, (_, k) => { const p = ((t * 0.45 + k / 9) % 1); return <circle key={k} cx={480 + Math.sin(k * 2.1) * 120 + p * 60} cy={90 - p * 260 + 200} r={(40 + p * 70) * fire} fill="#4B5260" opacity={(1 - p) * 0.55} />; })}
        {Array.from({length: 9}, (_, k) => { const h = (150 + Math.sin(t * 11 + k * 1.3) * 40) * fire * (1 - Math.abs(k - 4) * 0.1); const x = 300 + k * 42; return <path key={`f${k}`} d={`M ${x} 100 Q ${x - 18} ${100 - h * 0.6} ${x + 22} ${100 - h} Q ${x + 60} ${100 - h * 0.6} ${x + 44} 100 Z`} fill={[RED, ORANGE, YEL][k % 3]} stroke={NBK} strokeWidth={2} />; })}
        {Array.from({length: 14}, (_, k) => { const p = ((t * 1.6 + k / 14) % 1); return <circle key={`s${k}`} cx={480 + Math.cos(k * 2.4) * p * 300} cy={300 + Math.sin(k * 2.4) * p * 200 - p * 80} r={5} fill={YEL} opacity={1 - p} />; })}
      </>}
    </svg>
  );
};
const NODE = {x: 240, y: 460, w: 600, h: 150};
const CARD = (k: number) => ({x: 60 + (k % 2) * 495, y: 760 + Math.floor(k / 2) * 300, w: 465, h: 260});
const Exemple: React.FC = () => {
  const t = useT();
  const m = prog(t, 47.15, 47.85, easeInOut);
  const box = {x: lerp(60, NODE.x, m), y: lerp(450, NODE.y, m), w: lerp(960, NODE.w, m), h: lerp(760, NODE.h, m)};
  return (
    <Out end={57.1}>
      <Heads h={[[42.1, ["L'équipe", 'QHSE', 'analyse'], [1]], [44.64, ['Incendie', 'local électrique'], [0, 1]], [47.36, ['Arbre', 'des', 'défaillances'], [0, 2]], [50.72, ['Courts-circuits'], [0]], [52.04, ['Défauts', "d'isolation"], [0, 1]], [53.72, ['Surcharges', 'électriques'], [0, 1]], [55.28, ['Défaillances', 'de protection'], [0, 1]]]} />
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        {CAUSES.map(([, at, c], k) => { const cd = CARD(k); const p = prog(t, at - 0.4, at); return p > 0 && <path key={k} d={`M 540 610 L 540 690 L ${cd.x + cd.w / 2} 690 L ${cd.x + cd.w / 2} ${cd.y}`} fill="none" stroke={c} strokeWidth={7} pathLength={1} strokeDasharray={`${p} 1`} />; })}
        {t > 49.6 && <circle cx={540} cy={690} r={16} fill={NBK} />}
      </svg>
      <Abs x={box.x} y={box.y} w={box.w} h={box.h} style={{overflow: 'hidden', borderRadius: lerp(30, 20, m), border: `${lerp(5, 8, m)}px solid ${NBK}`, boxShadow: `8px 8px 0 ${m > 0.5 ? RED : NAVY}`, opacity: pop(t, 42.1, 0.3), boxSizing: 'border-box'}}>
        <Room t={t} />
        {m > 0.4 && <div style={{position: 'absolute', inset: 0, background: RED, opacity: prog(m, 0.4, 0.9), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, color: '#fff'}}><F n="feu" size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, lineHeight: 1.05}}>INCENDIE<br />LOCAL ÉLECTRIQUE</div></div>}
      </Abs>
      {t > 44.9 && t < 47.2 && <Abs x={60} y={1240} w={960} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={44.9} text="🔥 INCENDIE" bg={RED} rot={-3} size={44} /></Abs>}
      {CAUSES.map(([l, at, c], k) => { const cd = CARD(k); return t > at && (
        <Abs key={l} x={cd.x} y={cd.y} w={cd.w} h={cd.h} style={{...nb('#fff', 7), borderColor: c, display: 'flex', alignItems: 'center', gap: 14, padding: '0 20px', transform: `scale(${Math.min(1, spring(t, at, 9, 15))})`}}>
          <CauseIco k={k} size={150} t={t} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, lineHeight: 1.05, color: c}}>{l}</div>
        </Abs>
      ); })}
    </Out>
  );
};

/* ═════════════ Guichet 6 : l'objectif — cadenas à combinaison : les défaillances s'alignent → incendie ═════════════ */
const STOPS = [59.0, 59.3, 59.6, 59.9];
const Objectif: React.FC = () => {
  const t = useT();
  const open = prog(t, 60.3, 60.7, easeOut);
  const burst = prog(t, 60.6, 61.4, easeOut);
  return (
    <Out end={OUTRO_AT}>
      <Heads h={[[57.28, ["L'objectif", ':', 'comprendre'], [2]], [59.04, ['Les', 'combinaisons'], [1]], [60.9, ['Conduire', 'à', "l'incendie"], [2]]]} />
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        <g transform={`translate(0 ${-open * 55})`}>
          <path d="M 360 860 L 360 680 A 180 180 0 0 1 720 680 L 720 860" fill="none" stroke="#9AA3B2" strokeWidth={46} />
          <path d="M 360 860 L 360 680 A 180 180 0 0 1 720 680 L 720 860" fill="none" stroke={NBK} strokeWidth={5} opacity={0.5} />
        </g>
      </svg>
      <Abs x={90} y={820} w={900} h={380} style={{...nb(t > 60.3 ? RED : '#2A3346', 10), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, transform: `rotate(${t > 60.3 && t < 60.8 ? Math.sin(t * 60) * 2 : 0}deg)`}}>
        {STOPS.map((st, k) => {
          const spinning = t < st;
          const off = spinning ? ((t - 57.2) * 6 + k * 0.7) % 4 : k;
          const base = Math.floor(off), frac = off - base;
          return (
            <div key={k} style={{width: 180, height: 300, borderRadius: 18, background: '#fff', border: `5px solid ${NBK}`, overflow: 'hidden', position: 'relative', boxShadow: t >= st ? `0 0 0 6px ${CAUSES[k][2]}` : 'none'}}>
              {[-1, 0, 1, 2].map((j) => <div key={j} style={{position: 'absolute', left: 15, top: 75 + (j - frac) * 150, opacity: 1 - Math.abs(j - frac) * 0.55, filter: spinning ? 'blur(2px)' : 'none'}}><CauseIco k={(((base + j) % 4) + 4) % 4} size={150} t={t} /></div>)}
              <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 70, background: 'linear-gradient(#fff, #fff0)'}} />
              <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 70, background: 'linear-gradient(#fff0, #fff)'}} />
            </div>
          );
        })}
      </Abs>
      {t > 59.0 && <Abs x={90} y={1220} w={900} style={{display: 'flex', justifyContent: 'center', gap: 10}}>{CAUSES.map(([l, , c], k) => t > STOPS[k] && <div key={l} style={{...nb(c, 4), color: '#fff', padding: '6px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 19, transform: `scale(${Math.min(1, spring(t, STOPS[k]))})`}}>{l}</div>)}</Abs>}
      {burst > 0 && <>
        {Array.from({length: 18}, (_, k) => { const a = (k / 18) * Math.PI * 2; return <Abs key={k} x={540 + Math.cos(a) * burst * 420 - 30} y={1010 + Math.sin(a) * burst * 300 - 30} w={60} h={60} style={{opacity: 1 - burst}}><F n="feu" size={60} /></Abs>; })}
        <Abs x={340} y={890} w={400} h={260} style={{display: 'flex', justifyContent: 'center', zIndex: 5, transform: `scale(${Math.min(1, spring(t, 60.6)) * 1.3})`}}><F n="feu" size={250} /></Abs>
      </>}
      {t > 61.1 && <Abs x={60} y={1300} w={960} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={61.1} text="COMBINAISONS DE DÉFAILLANCES → INCENDIE" bg={NBK} rot={-2} size={32} /></Abs>}
    </Out>
  );
};

/* ═════════════ Bruitage ═════════════ */
const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at, s: 'sfx/bell', v: 0.2})),
  ...searchCues(2.6, 3, 3.0, 3.3), ...rep(3.6, 3, 0.12, 'sfx/pop', 0.25), ...FLIPS.map(([, , at]) => ({at: at - 0.1, s: 'sfx/swish', v: 0.35})), {at: 6.0, s: 'sfx/pop', v: 0.3},
  ...rep(9.95, 7, 0.1, 'sfx/pop', 0.2), {at: 11.0, s: 'riser', v: 0.3, dur: 0.4}, {at: 11.3, s: 'alarme', v: 0.22, dur: 0.9}, {at: 11.3, s: 'deep-hit', v: 0.45},
  {at: 16.0, s: 'sfx/thud', v: 0.35}, {at: 17.75, s: 'sfx/swish', v: 0.25}, {at: 18.3, s: 'sfx/pop', v: 0.3}, {at: 18.75, s: 'sfx/swish', v: 0.25}, ...rep(19.3, 4, 0.08, 'sfx/pop', 0.22), ...rep(20.25, 4, 0.06, 'tick', 0.25),
  {at: 24.86, s: 'sfx/thud', v: 0.35}, {at: 26.14, s: 'sfx/thud', v: 0.35}, {at: 27.1, s: 'sfx/whoosh', v: 0.3}, {at: 29.4, s: 'sfx/click', v: 0.5}, {at: 30.16, s: 'sfx/click', v: 0.5}, {at: 30.2, s: 'bass-hit', v: 0.4}, {at: 30.3, s: 'tampon', v: 0.3}, {at: 31.35, s: 'tampon', v: 0.3},
  {at: 33.7, s: 'sfx/whoosh', v: 0.3}, {at: 36.28, s: 'sfx/click', v: 0.5}, {at: 36.32, s: 'sfx/ding', v: 0.35}, {at: 36.95, s: 'sfx/click', v: 0.35}, {at: 37.1, s: 'sfx/click', v: 0.5}, {at: 37.14, s: 'sfx/ding', v: 0.35}, {at: 37.2, s: 'tampon', v: 0.3},
  {at: 42.1, s: 'sfx/whoosh', v: 0.3}, {at: 44.85, s: 'deep-hit', v: 0.5}, {at: 44.9, s: 'alarme', v: 0.25, dur: 2.0}, {at: 47.15, s: 'soft-whoosh', v: 0.4, dur: 0.8}, ...CAUSES.map(([, at]) => ({at, s: 'sfx/pop', v: 0.35})), ...CAUSES.map(([, at]) => ({at: at - 0.4, s: 'sfx/swish', v: 0.2})),
  {at: 57.2, s: 'tick', v: 0.25}, ...rep(57.3, 16, 0.1, 'tick', 0.12), ...STOPS.map((at) => ({at, s: 'sfx/click', v: 0.5})), {at: 60.3, s: 'cadenas', v: 0.6}, {at: 60.6, s: 'bass-hit', v: 0.45}, {at: 60.65, s: 'sfx/whoosh', v: 0.4}, {at: 61.1, s: 'sfx/pop', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SCN: [React.FC, number, number][] = [[Intro, 2.5, 6.5], [Methode, 9.9, 12.6], [Principe, 15.95, 21.4], [Portes, 24.8, 38.75], [Exemple, 42.05, 57.15], [Objectif, 56.95, OUTRO_AT]];
const VOICE_FROM = 50.4;
export const FtaMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    {SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    {[27.1, 33.7, 57.0].map((a) => <Gate key={a} from={a} to={a + 0.9}><GyroFlash at={a} /></Gate>)}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    {/* Voix : seule la seconde prise (complète) est gardée ; la première s'interrompt à 49,8 s. */}
    <Audio src={staticFile('voix-fta-metro-origine.m4a')} trimBefore={s(VOICE_FROM)} trimAfter={s(VOICE_FROM + OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn, Barred, Flap];
