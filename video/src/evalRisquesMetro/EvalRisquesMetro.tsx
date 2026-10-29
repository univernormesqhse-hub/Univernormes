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
 * « Le guide d'évaluation des risques en entreprise » (voix d'origine, 9 min 07, décryptage façon podcast) — capsule
 * « condensé + effet wahou + ultra premium » présentée en métro (7 stations). Tube de verre à six guichets : danger ·
 * risque → 5 étapes → identifier → évaluer → prévenir → demain ; la capsule file d'un guichet à l'autre. Gyrophare,
 * loupe, capsule pneumatique, store vénitien ; barre de recherche « évaluation des risques » qui ouvre le guide.
 * Effets dédiés : feuille de route à 5 arrêts, nuage de jargon flou puis « danger = risque » qui se fissure en « ≠ »,
 * comparateur à volet verglas → chute, la ligne des 5 étapes qui se replie en cycle, l'arête de poisson des 5M,
 * le triangle de triangulation, l'équation R = P × G (+ exposition, Fine-Kinney), la matrice 5 × 5 qui se colore et
 * dont la cible file vers la zone rouge (sirène), la pyramide inversée de la hiérarchie des mesures, le suivi
 * (tiroir barré, organisme vivant, J+30 / J+90) et la boucle ∞ du « mouvement perpétuel ». Illustrations générées par
 * l'utilisateur (public/evalrisques-gen/). Kits capsule-ui-neo-brutal et capsule-recit-illustre.
 */
const IMG = {
  cover: 'evalrisques-gen/couverture.jpg',
  c1: 'evalrisques-gen/zone-rouge.jpg',
  c2: 'evalrisques-gen/danger.jpg',
  danger: 'evalrisques-gen/danger.jpg',
  risque: 'evalrisques-gen/risque.jpg',
  duerp: 'evalrisques-gen/duerp.jpg',
  operateur: 'evalrisques-gen/operateur.jpg',
  detective: 'evalrisques-gen/detective.jpg',
  tache: 'evalrisques-gen/tache.jpg',
  hawthorne: 'evalrisques-gen/hawthorne.jpg',
  pg: 'evalrisques-gen/proba-gravite.jpg',
  expo: 'evalrisques-gen/exposition.jpg',
  rouge: 'evalrisques-gen/zone-rouge.jpg',
  epi: 'evalrisques-gen/epi.jpg',
  rex: 'evalrisques-gen/rex.jpg',
  demain: 'evalrisques-gen/demain.jpg',
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
const OUTRO_AT = 548.6;
export const EVAL_RISQUES_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 58.2, n: '1', title: 'Danger ou risque ?', s: 'comprendre les fondations', c: RED, g: 'danger · risque', k: 'gyro', lab: 'GUICHET 1 / 6'},
  {at: 145.4, n: '2', title: 'Les 5 étapes', s: 'la méthodologie universelle', c: TEAL, g: '5 étapes', k: 'loupe', lab: 'GUICHET 2 / 6'},
  {at: 234.4, n: '3', title: 'Identifier', s: 'le travail de détective', c: VIO, g: 'identifier', k: 'tube', lab: 'GUICHET 3 / 6'},
  {at: 318.9, n: '4', title: 'Évaluer et hiérarchiser', s: 'le calcul du risque', c: BLUE, g: 'évaluer', k: 'store', lab: 'GUICHET 4 / 6'},
  {at: 426.6, n: '5', title: 'Prévenir et améliorer', s: 'le plan d’action', c: GREEN, g: 'prévenir', k: 'gyro', lab: 'GUICHET 5 / 6'},
  {at: 514.9, n: '★', title: 'Et demain ?', s: 'un mouvement perpétuel', c: GOLD, g: 'demain', k: 'loupe', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 546.9;
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
  {n: 1, l: 'Danger ≠ risque', s: 'danger', at: 87.0},
  {n: 2, l: 'Le document unique', s: 'DUERP', at: 118.4},
  {n: 3, l: 'Le cycle en 5 étapes', s: 'cycle', at: 186.0},
  {n: 4, l: 'La méthode des 5M', s: '5M', at: 257.4},
  {n: 5, l: 'Risque = P × G', s: 'P × G', at: 336.8},
  {n: 6, l: 'La matrice des risques', s: 'matrice', at: 395.1},
  {n: 7, l: 'Le retour d’expérience', s: 'REX', at: 495.2},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE RISQUES · STATION {r.n} / 7</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="loupe" w={1080} h={820} pos="50% 28%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 24%, ${PAPER}CC 32%, ${PAPER} 37%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb(NBK, 5), color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3, padding: '8px 22px'}}>LE GUIDE EN ENTREPRISE</div></Abs>
      <Abs x={0} y={650} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="ÉVALUER" src={IMG.c1} size={170} ls={6} /></Abs>
      <Abs x={0} y={840} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="LES RISQUES" src={IMG.c2} size={130} ls={4} seed={3} /></Abs>
      <Abs x={40} y={1030} w={1000} style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10}}>{[['danger ≠ risque', RED], ['5 étapes', TEAL], ['R = P × G', BLUE], ['matrice', ORANGE], ['prévention', GREEN]].map(([n, c], k) => <div key={n} style={{...nb(c, 4), padding: '6px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', transform: `translateY(${(1 - Math.min(1, spring(t, 0.3 + k * 0.08))) * 60}px)`}}>{n}</div>)}</Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={NAVY} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Scène type : photo ou mini-scène + puces synchronisées ═════════════ */
type CH = [string, string, number];
const hd = (l: string, a: number): HD => { const w = l.split(' '); return [a, w, [w.length - 1]]; };
const SC: React.FC<{at: number; end: number; c: string; badge: string; img?: string; pos?: string; ih?: number; chips?: CH[]; h?: HD[]; hx?: HD[]; vis?: React.ReactNode; over?: React.ReactNode; children?: React.ReactNode}> = ({at, end, c, badge, img, pos = '50% 40%', ih = 560, chips = [], h, hx = [], vis, over, children}) => {
  const t = useT();
  const hh: HD[] = (h ?? [...chips.map(([l, , a]) => hd(l, a)), ...hx]).sort((x, y) => x[0] - y[0]);
  const bd = <div style={{position: 'absolute', left: 20, top: 20, zIndex: 6}}><NBadge at={at + 0.2} text={badge} bg={c} rot={-2} size={badge.length > 34 ? 22 : 26} /></div>;
  return (
    <Out end={end}>
      {hh.length > 0 && <Heads h={hh} />}
      {img ? <Shot src={img} ic="agent-hse" x={60} y={440} w={960} h={ih} at={at} pos={pos} c={c}>{bd}{over}</Shot> : (
        <Abs x={60} y={440} w={960} h={ih} style={{...nb('#fff', 8), boxShadow: `8px 8px 0 ${c}`, overflow: 'hidden', opacity: pop(t, at), transform: `translateY(${(1 - pop(t, at)) * 40}px)`, backgroundImage: 'radial-gradient(#0001 2px, transparent 2px)', backgroundSize: '22px 22px'}}>{bd}{vis}{over}</Abs>
      )}
      <Abs x={60} y={440 + ih + 34} w={960} style={{display: 'flex', flexWrap: 'wrap', gap: 12}}>{chips.map(([l, ic, a]) => (t > a ? <Chip key={l} at={a} ic={ic} l={l} c={c} /> : null))}</Abs>
      {children}
    </Out>
  );
};
const Barred: React.FC<{at: number; strk: number; text: string; fs?: number}> = ({at, strk, text, fs = 30}) => {
  const t = useT();
  if (t < at) return null;
  return <div style={{position: 'relative', display: 'inline-block', ...nb('#fff', 5), padding: '10px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: fs, color: DIM, transform: `scale(${pop(t, at)})`}}>{text}<Strk at={strk} /></div>;
};

/* ═════════════ Introduction ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  return (
    <Out end={21.5}>
      <Heads h={[[3.0, ['Le', 'guide', 'd’évaluation', 'des', 'risques'], [4]], [7.6, ['Démystifier', 'la', 'sécurité'], [0]], [13.0, ['Pas', 'une', 'contrainte'], [2]], [17.6, ['Une', 'opportunité'], [1]]]} />
      <SearchOpen x={60} y={440} w={960} h={900} at={3.0} query="évaluation des risques" results={['le guide d’évaluation des risques', 'modèle de document unique', 'liste des EPI']} found={0} foundAt={6.0} clickAt={6.4} c={NAVY}>
        <div style={{position: 'absolute', left: 30, top: 24, width: 420, height: 620, borderRadius: 22, overflow: 'hidden', border: `4px solid ${NBK}`}}><Img src={PH(IMG.cover)} style={{width: 420, height: 620, objectFit: 'cover', objectPosition: '30% 40%', transform: `scale(${1.1 - prog(t, 7.2, 21, (x: number) => x) * 0.08})`}} /><Shine at={7.4} /></div>
        <div style={{position: 'absolute', left: 480, top: 30, width: 450, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 18}}>
          {t > 7.7 && <Chip at={7.8} ic="loupe" l="démystifier les protocoles" c={NAVY} />}
          <Barred at={13.2} strk={15.0} text="une contrainte administrative" fs={26} />
          {t > 17.6 && <div style={{...nb(GREEN, 7), padding: '14px 18px', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 34, transform: `scale(${Math.min(1, spring(t, 17.6))})`}}>une opportunité incroyable</div>}
          {t > 19.4 && <Chip at={19.5} ic="bouclier" l="plus sûr et plus sain" c={GREEN} />}
        </div>
        {t > 8.5 && <div style={{position: 'absolute', left: 0, right: 0, top: 690, display: 'flex', justifyContent: 'center'}}><NBadge at={8.6} text="LA SÉCURITÉ AU TRAVAIL, DÉCRYPTÉE" bg={NAVY} rot={-2} size={30} /></div>}
      </SearchOpen>
    </Out>
  );
};
const Enjeux: React.FC = () => {
  const t = useT();
  const m = prog(t, 36.5, 38.2, easeInOut);
  const CARDS: [string, string, number, string][] = [['protéger des vies humaines', 'coeur', 24.0, RED], ['préserver l’intégrité physique', 'casque', 26.0, ORANGE], ['la résilience des organisations', 'batiment', 29.4, BLUE]];
  return (
    <Out end={40.3}>
      <Heads h={[[21.8, ['Des', 'enjeux', 'colossaux'], [2]], [24.0, ['Protéger', 'des', 'vies'], [2]], [29.2, ['La', 'résilience'], [1]], [32.0, ['Direct', 'et', 'structuré'], [0, 2]], [35.0, ['De', 'la', 'théorie…'], [2]], [38.0, ['…aux', 'actions', 'terrain'], [1, 2]]]} />
      <Abs x={60} y={440} w={960} h={600}>
        {CARDS.map(([l, ic, a, c], k) => (t > a ? <div key={l} style={{...nb('#fff', 7), boxShadow: `7px 7px 0 ${c}`, position: 'absolute', left: k * 330, top: 0, width: 300, height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 14, padding: 16, transform: `translateY(${(1 - Math.min(1, spring(t, a))) * 200}px) rotate(${(k - 1) * 2}deg)`, opacity: lerp(1, 0.35, prog(t, 31.8, 32.4))}}><F n={ic} size={110} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, lineHeight: 1.1}}>{l}</div></div> : null))}
        {t > 22.5 && <div style={{position: 'absolute', left: 0, right: 0, top: 336, display: 'flex', justifyContent: 'center'}}><NBadge at={22.6} text="DES ENJEUX COLOSSAUX" bg={RED} rot={-2} size={34} /></div>}
        {t > 34.6 && <div style={{position: 'absolute', left: 0, right: 0, top: 440, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 22}}>
          <div style={{...nb('#fff', 6), padding: '14px 22px', fontFamily: MONO, fontWeight: 700, fontSize: 34, opacity: lerp(1, 0.4, m), transform: `scale(${pop(t, 34.6)})`}}>THÉORIE</div>
          <svg width={130} height={40}><path d="M 5 20 L 115 20 M 95 5 L 120 20 L 95 35" fill="none" stroke={GREEN} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - m}} /></svg>
          <div style={{...nb(GREEN, 7), padding: '14px 22px', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 38, transform: `scale(${t > 37.9 ? Math.min(1.05, spring(t, 37.9)) : 0})`}}>ACTIONS TERRAIN</div>
        </div>}
      </Abs>
    </Out>
  );
};
const ROUTE: [string, string, number, string][] = [['danger ou risque', 'danger', 44.1, RED], ['les 5 étapes', 'engrenage', 47.7, TEAL], ['les méthodes d’identification', 'loupe', 50.4, VIO], ['évaluer et hiérarchiser', 'graphique', 53.5, BLUE], ['prévention et amélioration', 'bouclier', 56.0, GREEN]];
const Route: React.FC = () => {
  const t = useT();
  const cur = ROUTE.reduce((a, x, k) => (t >= x[2] ? k : a), -1);
  const ty = cur < 0 ? 0 : lerp(Math.max(0, cur - 1), cur, prog(t, ROUTE[cur][2] - 0.4, ROUTE[cur][2] + 0.3, easeInOut));
  return (
    <Out end={58.3}>
      <Heads h={[[40.5, ['La', 'feuille', 'de', 'route'], [1, 3]], ...ROUTE.map(([l, , a]) => hd(l, a))]} />
      <Abs x={60} y={440} w={960} h={880} style={{...nb('#fff', 8), boxShadow: `8px 8px 0 ${NAVY}`, opacity: pop(t, 40.4)}}>
        <div style={{position: 'absolute', left: 30, top: 24, fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3}}>AU PROGRAMME · 5 PARTIES</div>
        <div style={{position: 'absolute', left: 96, top: 122, width: 12, height: 4 * 160, borderRadius: 6, background: '#E3E8EF'}} />
        <div style={{position: 'absolute', left: 96, top: 122, width: 12, height: ty * 160, borderRadius: 6, background: `linear-gradient(180deg, ${RED}, ${GREEN})`}} />
        {ROUTE.map(([l, ic, a, c], k) => { const on = t > a; return (
          <div key={l} style={{position: 'absolute', left: 60, top: 80 + k * 160, display: 'flex', alignItems: 'center', gap: 24}}>
            <div style={{width: 84, height: 84, borderRadius: 42, background: on ? c : '#fff', border: `5px solid ${NBK}`, boxSizing: 'border-box', color: on ? '#fff' : DIM, fontFamily: sansFont, fontWeight: 900, fontSize: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${on ? Math.min(1.12, spring(t, a)) : 1})`, boxShadow: on ? `0 0 22px ${c}` : 'none'}}>{k + 1}</div>
            <div style={{...nb(on ? '#fff' : '#F1F1EA', 5), boxShadow: `5px 5px 0 ${on ? c : NBK}`, display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px', opacity: on ? 1 : 0.4, transform: `translateX(${on ? (1 - Math.min(1, spring(t, a))) * 120 : 0}px)`}}><F n={ic} size={54} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32}}>{l}</span></div>
          </div>
        ); })}
        {cur >= 0 && <div style={{position: 'absolute', left: 84, top: 122 + ty * 160 - 18, width: 36, height: 36, borderRadius: 18, background: YEL, border: `4px solid ${NBK}`, boxShadow: `0 0 16px ${YEL}`, boxSizing: 'border-box'}} />}
      </Abs>
    </Out>
  );
};

/* ═════════════ Partie 1 : danger ou risque ═════════════ */
const Jargon: React.FC = () => {
  const t = useT();
  const crack = prog(t, 76.2, 76.6, easeOut);
  return (
    <Out end={84.6}>
      <Heads h={[[62.0, ['Des', 'bases', 'solides'], [2]], [66.0, ['Un', 'jargon', 'flou'], [2]], [72.0, ['Danger', '=', 'risque', '?'], [0, 2]], [76.4, ['Un', 'mythe', 'à', 'détruire'], [1, 3]], [80.6, ['Un', 'trottoir', 'en', 'hiver'], [1, 3]]]} />
      <Abs x={60} y={440} w={960} h={560} style={{...nb('#fff', 8), boxShadow: `8px 8px 0 ${RED}`, overflow: 'hidden', opacity: pop(t, 61.9)}}>
        {t < 71.0 && <div style={{position: 'absolute', inset: 0, display: 'flex', flexWrap: 'wrap', gap: 14, padding: 50, alignContent: 'center', justifyContent: 'center', filter: `blur(${prog(t, 66.0, 67.6) * 5}px)`}}>{['aléa', 'danger', 'risque', 'menace', 'exposition', 'péril', 'situation dangereuse', 'événement', 'dommage'].map((w, k) => <div key={w} style={{...nb('#F3F5F8', 4), padding: '8px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM, transform: `rotate(${((k * 37) % 11) - 5}deg) scale(${pop(t, 63.2 + k * 0.12)})`}}>{w}</div>)}</div>}
        {t >= 71.0 && <div style={{position: 'absolute', left: 0, right: 0, top: 150, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 26}}>
          <div style={{...nb(ORANGE, 7), padding: '18px 28px', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 60, transform: `translateX(${-crack * 40}px) scale(${pop(t, 71.2)})`}}>DANGER</div>
          <div style={{width: 110, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 110, color: crack > 0.5 ? RED : NBK, transform: `scale(${t > 76.2 ? Math.min(1.25, spring(t, 76.2)) : pop(t, 73.8)})`}}>{crack > 0.5 ? '≠' : '='}</div>
          <div style={{...nb(RED, 7), padding: '18px 28px', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 60, transform: `translateX(${crack * 40}px) scale(${pop(t, 74.4)})`}}>RISQUE</div>
        </div>}
        <Stamp at={76.5} text="MYTHE" c={RED} x={360} y={320} rot={-8} size={60} />
        {t > 80.6 && <div style={{position: 'absolute', left: 0, right: 0, top: 450, display: 'flex', justifyContent: 'center'}}><Chip at={80.7} ic="froid" l="un trottoir en plein hiver" c={BLUE} /></div>}
      </Abs>
    </Out>
  );
};
const Verglas: React.FC = () => {
  const t = useT();
  const w1 = prog(t, 92.0, 93.2, easeInOut);
  const w2 = prog(t, 99.4, 100.4, easeInOut);
  const X = lerp(100, 0, w1) + w2 * 50;
  const st: React.CSSProperties = {position: 'absolute', left: 0, top: 0, width: 950, height: 890, objectFit: 'cover'};
  const shake = Math.sin(t * 40) * 8 * Math.max(0, 1 - Math.abs(t - 92.8) * 2.5);
  const bar = (w1 > 0 && w1 < 1) || w2 > 0;
  return (
    <Out end={102.05}>
      <Heads h={[[84.8, ['Le', 'verglas', '=', 'le', 'danger'], [1, 4]], [88.5, ['Le', 'potentiel', 'de', 'faire', 'mal'], [1, 4]], [92.3, ['La', 'chute', '=', 'le', 'risque'], [1, 4]], [99.6, ['Le', 'résultat', 'potentiel'], [1, 2]]]} />
      <Abs x={60} y={440} w={960} h={900} style={{borderRadius: 30, overflow: 'hidden', border: `5px solid ${NBK}`, boxShadow: `10px 10px 0 ${ORANGE}`, opacity: pop(t, 84.6), boxSizing: 'border-box'}}>
        <Img src={PH(IMG.danger)} style={{...st, objectPosition: '50% 30%', transform: `scale(${1.08 - prog(t, 84.6, 92, (x: number) => x) * 0.06})`}} />
        <div style={{position: 'absolute', inset: 0, clipPath: `inset(0 0 0 ${X}%)`}}><Img src={PH(IMG.risque)} style={{...st, objectPosition: '50% 35%', transform: `translateX(${shake}px) scale(1.04)`}} /></div>
        {bar && <div style={{position: 'absolute', top: 0, bottom: 0, left: `${X}%`, width: 10, marginLeft: -5, background: '#fff', boxShadow: '0 0 20px #fff'}}>{w2 > 0 && <div style={{position: 'absolute', top: 410, left: -26, width: 62, height: 62, borderRadius: 31, background: '#fff', border: `5px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 30, boxSizing: 'border-box'}}>⇆</div>}</div>}
        {(t < 93.2 || t > 99.6) && <div style={{position: 'absolute', left: 20, bottom: 30}}>{t > 85.9 && <NBadge at={86.0} text="DANGER = LA SITUATION" bg={ORANGE} rot={-3} size={28} />}</div>}
        <div style={{position: 'absolute', right: 20, bottom: w2 > 0 ? 30 : 110}}>{t > 92.5 && <NBadge at={92.6} text="RISQUE = L’ÉVÉNEMENT" bg={RED} rot={3} size={28} />}</div>
        <div style={{position: 'absolute', inset: 0, background: '#fff', opacity: Math.max(0, 1 - Math.abs(t - 92.1) * 5) * 0.6}} />
      </Abs>
    </Out>
  );
};
const Nuance: React.FC = () => {
  const t = useT();
  const card = (at: number, ic: string, l: string, sub: string, bg: string, c: string) => <div style={{...nb(bg, 6), boxShadow: `6px 6px 0 ${c}`, width: 400, height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, textAlign: 'center', transform: `scale(${pop(t, at)})`}}><F n={ic} size={120} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30}}>{l}</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: c}}>{sub}</div></div>;
  return <SC at={102.0} end={115.85} c={RED} badge="SAISIR LA NUANCE" chips={[['pas qu’une bonne volonté', 'pouce', 110.8], ['un cadre légal très strict', 'juge', 113.5]]} h={[[102.2, ['Saisir', 'la', 'nuance'], [2]], [104.5, ['Le', 'bloc', 'de', 'glace'], [3]], [106.9, ['La', 'probabilité', 'de', 'tomber'], [1]], [110.8, ['Pas', 'qu’une', 'bonne', 'volonté'], [3]], [113.5, ['Un', 'cadre', 'légal', 'strict'], [2]]]}
    vis={<div style={{position: 'absolute', left: 30, right: 30, top: 110, display: 'flex', gap: 40, justifyContent: 'center'}}>{card(104.5, 'froid', 'gérer le bloc de glace', 'LE DANGER', '#EAF4FF', BLUE)}{card(106.9, 'graphique', 'gérer la probabilité de chute', 'LE RISQUE', '#FFF1EE', RED)}</div>}>
    <Stamp at={114.7} text="CADRE LÉGAL" c={NAVY} x={600} y={850} rot={-6} size={44} />
  </SC>;
};
const Duerp: React.FC = () => <SC at={115.8} end={145.5} c={RED} badge="LE DOCUMENT UNIQUE · DUERP" img={IMG.duerp} pos="50% 50%" ih={600} chips={[['document unique · DUERP', 'classeur', 118.4], ['mémoire vivante', 'cerveau', 127.2], ['démarche proactive', 'fusee', 129.5], ['trace écrite', 'memo', 135.2], ['responsabilité juridique', 'juge', 141.0]]} hx={[[122.4, ['Pas', 'une', 'corvée'], [2]], [132.9, ['En', 'cas', 'd’incident'], [2]], [139.2, ['Protéger', 'les', 'équipes'], [2]]]}
  over={<div style={{position: 'absolute', right: 24, top: 90, zIndex: 6}}><Barred at={122.4} strk={124.0} text="une corvée de paperasse" fs={26} /></div>} />;

/* ═════════════ Partie 2 : les 5 étapes ═════════════ */
const STEPS: [string, string, number][] = [['identifier', 'loupe', 163.9], ['évaluer', 'balance', 167.7], ['classer les priorités', 'graphique', 170.4], ['déployer la prévention', 'bouclier', 175.1], ['vérifier', 'check', 178.6]];
const Cycle: React.FC = () => {
  const t = useT();
  const morph = prog(t, 185.0, 187.0, easeInOut);
  const ring = prog(t, 188.6, 190.4, easeInOut);
  const spin = t > 190.3 ? (t - 190.3) * 70 : 0;
  const CX = 480, CY = 470, R = 290;
  const P = (k: number) => {
    const lx = 110 + k * 185, ly = 330;
    const a = ((-90 + k * 72) * Math.PI) / 180;
    return {x: lerp(lx, CX + Math.cos(a) * R, morph), y: lerp(ly, CY + Math.sin(a) * R, morph)};
  };
  return (
    <Out end={193.05}>
      <Heads h={[[149.2, ['Les', '5', 'étapes'], [1, 2]], [152.4, ['Le', 'squelette', 'du', 'processus'], [1, 3]], [156.0, ['Le', 'mode', 'd’emploi'], [1, 2]], [160.5, ['Très', 'séquentiel'], [1]], ...STEPS.map(([l, , a], k) => [a, [`Étape ${k + 1}`, ':', ...l.split(' ')], [0]] as HD), [182.8, ['Pas', 'linéaire'], [1]], [185.8, ['Un', 'cycle'], [1]], [190.2, ['Amélioration', 'continue'], [0, 1]]]} />
      <Abs x={60} y={440} w={960} h={880} style={{...nb('#fff', 8), boxShadow: `8px 8px 0 ${TEAL}`, overflow: 'hidden', opacity: pop(t, 149.0)}}>
        <div style={{position: 'absolute', left: 20, top: 20}}><NBadge at={149.4} text="LA MÉTHODOLOGIE UNIVERSELLE" bg={TEAL} rot={-2} size={26} /></div>
        <svg style={{position: 'absolute', left: 0, top: 0}} width={960} height={880}>
          {morph < 1 && STEPS.slice(0, 4).map((x, k) => { const a = P(k), b = P(k + 1); const p = prog(t, STEPS[k + 1][2] - 0.6, STEPS[k + 1][2]); return <line key={k} x1={a.x + 66} y1={a.y} x2={b.x - 66} y2={b.y} stroke={TEAL} strokeWidth={8} strokeLinecap="round" opacity={1 - morph} pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - p}} />; })}
          {ring > 0 && <circle cx={CX} cy={CY} r={R} fill="none" stroke={TEAL} strokeWidth={10} pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - ring}} transform={`rotate(-90 ${CX} ${CY})`} />}
          {spin > 0 && [0, 1, 2].map((j) => { const a = ((spin + j * 120 - 90) * Math.PI) / 180; return <circle key={j} cx={CX + Math.cos(a) * R} cy={CY + Math.sin(a) * R} r={14} fill={YEL} stroke={NBK} strokeWidth={4} />; })}
        </svg>
        {t > 152.6 && t < 163.9 && STEPS.map((x, k) => { const p = P(k); return <div key={`g${k}`} style={{position: 'absolute', left: p.x - 66, top: p.y - 66, width: 132, height: 132, borderRadius: 66, border: `5px dashed ${DIM}`, opacity: pop(t, 152.6 + k * 0.15) * 0.6, boxSizing: 'border-box'}} />; })}
        {STEPS.map(([l, ic, a], k) => { if (t < a) return null; const p = P(k); return (
          <div key={l} style={{position: 'absolute', left: p.x - 90, top: p.y - 66, width: 180, textAlign: 'center', transform: `scale(${Math.min(1.08, spring(t, a, 9, 12))})`}}>
            <div style={{margin: '0 auto', width: 132, height: 132, borderRadius: 66, background: TEAL, border: `6px solid ${NBK}`, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 18px ${TEAL}`}}><F n={ic} size={62} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: '#fff'}}>{k + 1}</div></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, lineHeight: 1.05, marginTop: 6}}>{l}</div>
          </div>
        ); })}
        {t > 182.8 && t < 185.4 && <div style={{position: 'absolute', left: 0, right: 0, top: 560, display: 'flex', justifyContent: 'center'}}><Barred at={182.9} strk={184.0} text="un parcours linéaire" fs={34} /></div>}
        {t > 189.0 && <div style={{position: 'absolute', left: CX - 120, top: CY - 50, width: 240, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, lineHeight: 1.05, color: TEAL, transform: `scale(${Math.min(1, spring(t, 189.0))})`}}>amélioration continue</div>}
      </Abs>
    </Out>
  );
};
const Qui: React.FC = () => {
  const t = useT();
  const team = prog(t, 200.0, 200.8, easeInOut);
  const ROLES: [string, string, number][] = [['surintendants', 'directeur', 205.8], ['superviseurs', 'superviseur', 206.8], ['experts RH', 'femme-bureau', 208.3], ['employés de terrain', 'ouvrier', 209.6]];
  return <SC at={192.9} end={210.9} c={TEAL} badge="QUI S’EN OCCUPE ?" ih={700} h={[[193.3, ['Qui', 's’en', 'occupe', '?'], [2]], [195.2, ['Le', 'piège', 'classique'], [1]], [198.0, ['Une', 'seule', 'personne'], [1, 2]], [200.0, ['Tous', 'les', 'niveaux'], [2]], [205.8, ['Surintendants', '·', 'superviseurs'], [0, 2]], [208.3, ['RH', '·', 'terrain'], [0, 2]]]}
    vis={<>
      <div style={{position: 'absolute', left: lerp(330, 40, team), top: lerp(150, 110, team), textAlign: 'center', opacity: lerp(1, 0, team), transform: `scale(${lerp(1, 0.6, team)})`, transformOrigin: '0 0'}}><div style={{...nb('#F3F5F8', 6), width: 300, height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><F n="homme-bureau" size={150} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>seul derrière son bureau</div></div></div>
      {t > 195.2 && t < 200.6 && <Stamp at={195.3} text="LE PIÈGE" c={RED} x={420} y={420} rot={-8} size={56} />}
      {t > 200.4 && <div style={{position: 'absolute', left: 0, right: 0, top: 120, display: 'flex', justifyContent: 'center'}}><NBadge at={200.5} text="TOUS LES NIVEAUX HIÉRARCHIQUES" bg={TEAL} rot={-2} size={30} /></div>}
      <div style={{position: 'absolute', left: 60, top: 220, display: 'grid', gridTemplateColumns: '400px 400px', gap: 30}}>{ROLES.map(([l, ic, a]) => <div key={l} style={{...nb(t > a ? '#fff' : '#F1F1EA', 6), boxShadow: `6px 6px 0 ${t > a ? TEAL : NBK}`, height: 190, display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px', opacity: t > a ? 1 : team * 0.3, transform: `scale(${t > a ? Math.min(1.05, spring(t, a)) : 0.95})`}}><F n={ic} size={110} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, lineHeight: 1.05}}>{l}</span></div>)}</div>
    </>} />;
};
const Operateur: React.FC = () => <SC at={210.5} end={234.45} c={TEAL} badge="CELUI QUI SAIT VRAIMENT" img={IMG.operateur} pos="50% 40%" chips={[['l’ingénieur connaît la fiche technique', 'equerre', 212.5], ['une vibration agaçante', 'vibration', 218.8], ['arrêt d’urgence mal placé', 'stop', 222.4], ['les mauvaises postures', 'courbe-dos', 229.5], ['les habitudes officieuses', 'memo', 231.2]]} hx={[[225.4, ['C’est', 'l’opérateur', 'qui', 'sait'], [1, 3]], [226.6, ['L’expérience', 'terrain'], [1]]]}
  over={<Stamp at={227.6} text="VAUT DE L’OR" c={GOLD} x={430} y={430} rot={-6} size={44} />} />;

/* ═════════════ Partie 3 : identifier ═════════════ */
const Detective: React.FC = () => <SC at={237.9} end={254.1} c={VIO} badge="LE TRAVAIL DE DÉTECTIVE" img={IMG.detective} pos="50% 40%" chips={[['l’observation', 'yeux', 247.0], ['l’analyse documentaire', 'classeur', 249.5], ['les entretiens', 'bulle', 251.9]]} hx={[[238.2, ['Le', 'travail', 'de', 'détective'], [3]], [240.0, ['Un', 'arsenal', 'méthodologique'], [1, 2]], [244.3, ['L’enquête', 'commence'], [0]]]}>
  <LoupeSweep x0={120} y0={520} x1={520} y1={720} a={244.5} b={247.2} size={180} />
</SC>;
const FISH: [string, number, number, number][] = [['milieu', 260.9, 200, -1], ['méthode', 261.6, 400, -1], ['matériel', 262.4, 600, -1], ['main-d’œuvre', 263.2, 260, 1], ['matière', 264.2, 520, 1]];
const Fishbone: React.FC = () => {
  const t = useT();
  const sp = prog(t, 257.4, 258.6, easeOut);
  return <SC at={254.0} end={269.1} c={VIO} badge="LA MÉTHODE DES 5M" chips={[['les causes profondes', 'loupe', 265.2], ['pas juste les symptômes', 'pansement', 267.0]]} h={[[254.2, ['Des', 'outils', 'sophistiqués'], [2]], [257.0, ['La', 'méthode', 'des', '5M'], [3]], [260.8, ['Milieu', '·', 'méthode', '·', 'matériel'], [0, 2, 4]], [263.0, ['Main-d’œuvre', '·', 'matière'], [0, 2]], [265.0, ['Les', 'causes', 'profondes'], [1, 2]]]}
    vis={<>
      <svg style={{position: 'absolute', left: 0, top: 0}} width={960} height={560}>
        <line x1={60} y1={300} x2={60 + 700 * sp} y2={300} stroke={NBK} strokeWidth={10} strokeLinecap="round" />
        {FISH.map(([, a, x, d], k) => { const p = prog(t, a - 0.1, a + 0.5, easeOut); return <line key={k} x1={x + 140} y1={300} x2={x + 140 - 120 * p} y2={300 + d * 170 * p} stroke={VIO} strokeWidth={8} strokeLinecap="round" />; })}
      </svg>
      {t > 259.0 && <div style={{...nb(RED, 6), position: 'absolute', left: 760, top: 240, width: 170, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 28, lineHeight: 1.05, transform: `scale(${Math.min(1.05, spring(t, 259.0))})`}}>le problème</div>}
      {FISH.map(([l, a, x, d]) => (t > a + 0.3 ? <div key={l} style={{...nb('#fff', 5), boxShadow: `5px 5px 0 ${VIO}`, position: 'absolute', left: x - 60, top: d < 0 ? 70 : 480, padding: '8px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, transform: `scale(${Math.min(1.05, spring(t, a + 0.3))})`}}>{l}</div> : null))}
    </>} />;
};
const Tache: React.FC = () => <SC at={269.0} end={281.1} c={VIO} badge="ART · ANALYSE DES RISQUES DE LA TÂCHE" img={IMG.tache} pos="50% 45%" chips={[['ART · l’analyse de la tâche', 'clipboard', 271.2], ['geste par geste', 'main-levee', 275.5], ['la seconde exacte du danger', 'chrono', 277.8], ['précision chirurgicale', 'cible', 279.4]]} />;
const Hawthorne: React.FC = () => <SC at={281.0} end={308.1} c={VIO} badge="LE FACTEUR HUMAIN" img={IMG.hawthorne} pos="50% 35%" chips={[['le facteur humain et ses biais', 'cerveau', 282.0], ['un observateur seul', 'yeux', 290.0], ['l’effet Hawthorne', 'loupe', 293.0], ['un comportement modifié', 'pensif', 296.0], ['la sous-déclaration des incidents', 'memo', 303.6]]} hx={[[284.6, ['Pourquoi', 'tant', 'de', 'méthodes', '?'], [2]], [287.5, ['La', 'psychologie'], [1]]]}
  over={<Stamp at={293.4} text="EFFET HAWTHORNE" c={VIO} x={320} y={440} rot={-5} size={40} />} />;
const Triangle: React.FC = () => {
  const t = useT();
  const V: [string, string, number, number, number][] = [['ce qui est observé', 'yeux', 310.5, 480, 150], ['ce qui est écrit', 'memo', 312.7, 170, 560], ['ce qui se dit', 'bulle', 314.4, 790, 560]];
  return <SC at={308.0} end={319.0} c={VIO} badge="TRIANGULER LES INDICES" ih={720} h={[[308.3, ['Trianguler', 'les', 'indices'], [0, 2]], [310.5, ['Ce', 'qui', 'est', 'observé'], [3]], [312.7, ['Ce', 'qui', 'est', 'écrit'], [3]], [314.4, ['Ce', 'qui', 'se', 'dit'], [3]], [316.0, ['Une', 'image', 'fidèle'], [1, 2]]]}
    vis={<>
      <svg style={{position: 'absolute', left: 0, top: 0}} width={960} height={720}>{V.map((v, k) => { const w = V[(k + 1) % 3]; const p = prog(t, Math.max(v[2], w[2]), Math.max(v[2], w[2]) + 0.7); return <line key={k} x1={v[3]} y1={v[4]} x2={v[3] + (w[3] - v[3]) * p} y2={v[4] + (w[4] - v[4]) * p} stroke={VIO} strokeWidth={8} strokeDasharray="2 16" strokeLinecap="round" />; })}</svg>
      {V.map(([l, ic, a, x, y]) => (t > a ? <div key={l} style={{position: 'absolute', left: x - 110, top: y - 70, width: 220, textAlign: 'center', transform: `scale(${Math.min(1.08, spring(t, a))})`}}><div style={{margin: '0 auto', width: 110, height: 110, borderRadius: 55, background: '#fff', border: `5px solid ${NBK}`, boxShadow: `0 0 18px ${VIO}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={ic} size={66} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, marginTop: 6}}>{l}</div></div> : null))}
      {t > 316.0 && <div style={{...nb(VIO, 7), position: 'absolute', left: 480 - 150, top: 400, width: 300, padding: '14px 0', textAlign: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 32, boxShadow: `0 0 ${20 + 15 * Math.abs(Math.sin(t * 3))}px ${VIO}, 7px 7px 0 ${NBK}`, transform: `scale(${Math.min(1.05, spring(t, 316.0))})`}}>image fidèle</div>}
    </>} />;
};

/* ═════════════ Partie 4 : évaluer et hiérarchiser ═════════════ */
const Eq: React.FC<{times: number[]; expoAt?: number; top?: number}> = ({times, expoAt, top = 0}) => {
  const t = useT();
  const items: [string, string, number][] = [['RISQUE', NAVY, times[0]], ['=', NBK, times[1]], ['PROBABILITÉ', BLUE, times[2]], ['×', NBK, times[3]], ['GRAVITÉ', RED, times[4]]];
  if (expoAt !== undefined) items.push(['×', NBK, expoAt], ['EXPOSITION', ORANGE, expoAt + 0.15]);
  return (
    <div style={{position: 'absolute', left: 20, right: 20, top, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 14, rowGap: 24}}>
      {items.map(([sym, c, a], k) => { const p = t > a ? Math.min(1.08, spring(t, a, 9, 12)) : 0; return sym.length === 1
        ? <div key={k} style={{fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: c, transform: `scale(${p})`}}>{sym}</div>
        : <div key={k} style={{...nb(c, 7), padding: '16px 22px', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 46, transform: `scale(${p}) rotate(${(1 - Math.min(1, p)) * -20}deg)`, boxShadow: sym === 'EXPOSITION' ? `0 0 ${20 + 14 * Math.abs(Math.sin(t * 3))}px ${ORANGE}, 7px 7px 0 ${NBK}` : `7px 7px 0 ${NBK}`}}>{sym}</div>; })}
    </div>
  );
};
const Equation: React.FC = () => {
  const t = useT();
  const pile = Math.floor(prog(t, 324.6, 331.0, (x: number) => x) * 14);
  const fade = prog(t, 333.0, 333.8);
  return <SC at={322.5} end={339.5} c={BLUE} badge="LE CALCUL DU RISQUE" ih={720} h={[[322.8, ['Évaluer', 'et', 'hiérarchiser'], [0, 2]], [326.2, ['Une', 'montagne', 'de', 'données'], [1, 3]], [330.0, ['Hiérarchiser', 'les', 'priorités'], [0, 2]], [334.0, ['Une', 'équation', 'simple'], [1, 2]], [336.3, ['Risque', '=', 'P', '×', 'G'], [0, 2, 4]]]}
    vis={<>
      {fade < 1 && <div style={{position: 'absolute', left: 0, right: 0, bottom: 40, height: 600, opacity: 1 - fade}}>{Array.from({length: pile}, (_, k) => <div key={k} style={{position: 'absolute', left: 180 + ((k * 97) % 460), bottom: Math.floor(k / 3) * 70, width: 180, height: 70, ...nb(k % 3 === 0 ? '#F3E5C8' : '#fff', 4), display: 'flex', alignItems: 'center', gap: 8, padding: '0 10px', transform: `rotate(${((k * 53) % 13) - 6}deg)`}}><F n={['memo', 'graphique', 'clipboard', 'classeur'][k % 4]} size={40} /><div style={{flex: 1, height: 10, borderRadius: 5, background: '#0002'}} /></div>)}</div>}
      {t > 330.0 && t < 333.8 && <div style={{position: 'absolute', left: 0, right: 0, top: 100, display: 'flex', justifyContent: 'center', opacity: 1 - fade}}><NBadge at={330.1} text="ON NE PEUT PAS TOUT RÉSOUDRE D’UN COUP" bg={NBK} rot={-2} size={28} /></div>}
      {t > 333.8 && <Eq times={[336.3, 336.8, 337.3, 338.1, 338.9]} top={250} />}
    </>} />;
};
const PGBar: React.FC<{at: number; p: number; g: number; x: number}> = ({at, p, g, x}) => {
  const t = useT();
  if (t < at) return null;
  const k = prog(t, at, at + 0.9, easeOut);
  const row = (l: string, v: number, c: string) => <div style={{display: 'flex', alignItems: 'center', gap: 10}}><div style={{width: 150, fontFamily: sansFont, fontWeight: 900, fontSize: 22}}>{l}</div><div style={{width: 200, height: 22, borderRadius: 11, background: '#E3E8EF', border: `3px solid ${NBK}`, overflow: 'hidden'}}><div style={{width: `${v * k * 100}%`, height: '100%', background: c}} /></div></div>;
  return <div style={{...nb('#fff', 5), position: 'absolute', left: x, bottom: 20, padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 8, zIndex: 6, transform: `scale(${pop(t, at)})`}}>{row('probabilité', p, BLUE)}{row('gravité', g, RED)}</div>;
};
const ProbaGrav: React.FC = () => <SC at={339.4} end={360.1} c={BLUE} badge="PROBABILITÉ × GRAVITÉ" img={IMG.pg} pos="50% 45%" chips={[['la coupure de papier', 'ciseaux', 341.6], ['la fuite du réacteur', 'danger', 346.5], ['la boussole des décisions', 'boussole', 352.5]]} hx={[[343.1, ['Probabilité', 'forte'], [1]], [345.0, ['Gravité', 'quasi', 'nulle'], [2]], [349.0, ['Très', 'peu', 'probable'], [2]], [350.5, ['Gravité', 'catastrophique'], [1]]]}
  over={<><PGBar at={343.1} p={0.9} g={0.12} x={20} /><PGBar at={348.6} p={0.1} g={1} x={520} /></>} />;
const Kinney: React.FC = () => {
  const t = useT();
  const sw = t > 369.2;
  const CHX: CH[] = [['la fréquence', 'calendrier', 370.8], ['la durée', 'chrono', 371.8], ['une fois par an, l’été', 'soleil', 377.5], ['8 h par jour · 50 personnes', 'equipe', 386.0]];
  return (
    <Out end={392.1}>
      <Heads h={[[360.2, ['Encore', 'plus', 'de', 'détail'], [3]], [363.8, ['La', 'méthode', 'Fine-Kinney'], [2]], [365.6, ['Une', 'variable', 'qui', 'change', 'tout'], [4]], [367.6, ['L’exposition'], [0]], [370.6, ['Fréquence', 'et', 'durée'], [0, 2]], [375.5, ['Une', 'fois', 'par', 'an'], [1, 3]], [384.5, ['8 h', 'par', 'jour'], [0]], [388.0, ['La', 'réalité', 'du', 'travail'], [3]]]} />
      {!sw ? (
        <Abs x={60} y={440} w={960} h={720} style={{...nb('#fff', 8), boxShadow: `8px 8px 0 ${ORANGE}`, overflow: 'hidden', backgroundImage: 'radial-gradient(#0001 2px, transparent 2px)', backgroundSize: '22px 22px'}}>
          <div style={{position: 'absolute', left: 20, top: 20}}><NBadge at={363.9} text="MÉTHODE FINE-KINNEY" bg={ORANGE} rot={-2} size={28} /></div>
          <Eq times={[360.2, 360.3, 360.4, 360.5, 360.6]} expoAt={367.7} top={200} />
        </Abs>
      ) : (
        <Shot src={IMG.expo} ic="chrono" x={60} y={440} w={960} h={560} at={369.2} pos="50% 40%" c={ORANGE}><div style={{position: 'absolute', left: 20, top: 20, zIndex: 6}}><NBadge at={369.4} text="L’EXPOSITION CHANGE TOUT" bg={ORANGE} rot={-2} size={26} /></div></Shot>
      )}
      {sw && <Abs x={60} y={1034} w={960} style={{display: 'flex', flexWrap: 'wrap', gap: 12}}>{CHX.map(([l, ic, a]) => (t > a ? <Chip key={l} at={a} ic={ic} l={l} c={ORANGE} /> : null))}</Abs>}
    </Out>
  );
};
const scoreC = (s0: number) => (s0 <= 4 ? GREEN : s0 <= 9 ? YEL : s0 <= 14 ? ORANGE : RED);
const Matrice: React.FC = () => {
  const t = useT();
  const CELL = 116, OX = 230, OY = 110;
  const mvx = prog(t, 405.4, 407.0, easeInOut), mvy = prog(t, 407.4, 408.6, easeInOut);
  const cx = OX + lerp(0, 4, mvx) * CELL + CELL / 2, cy = OY + (4 - lerp(0, 4, mvy)) * CELL + CELL / 2;
  const red = t > 410.4;
  const sw = prog(t, 414.6, 415.4);
  return (
    <Out end={426.65}>
      <Heads h={[[392.3, ['La', 'matrice', 'des', 'risques'], [1, 3]], [397.0, ['Probabilité', '×', 'gravité'], [0, 2]], [399.2, ['L’urgence', 'saute', 'aux', 'yeux'], [0, 3]], [403.2, ['Un', 'code', 'couleur'], [1, 2]], [405.2, ['Forte', 'probabilité…'], [1]], [408.0, ['…gravité', 'extrême'], [1]], [410.4, ['Zone', 'rouge'], [0, 1]], [413.3, ['Une', 'sirène', 'd’alarme'], [1, 2]], [417.0, ['Stopper', 'net'], [0, 1]], [420.6, ['Les', 'ressources', 'là', 'où', 'c’est', 'vital'], [1, 5]]]} />
      <Abs x={60} y={440} w={960} h={880} style={{...nb('#fff', 8), boxShadow: `8px 8px 0 ${red ? RED : BLUE}`, overflow: 'hidden', opacity: pop(t, 392.0)}}>
        {sw < 1 && <div style={{position: 'absolute', inset: 0, opacity: 1 - sw}}>
          <div style={{position: 'absolute', left: 20, top: 20}}><NBadge at={392.4} text="LA MATRICE DES RISQUES" bg={BLUE} rot={-2} size={26} /></div>
          {Array.from({length: 25}, (_, k) => { const i = k % 5, j = Math.floor(k / 5); const a = 396.0 + (i + j) * 0.35; const on = t > a; const c = scoreC((i + 1) * (j + 1)); const hot = red && i === 4 && j === 4;
            return <div key={k} style={{position: 'absolute', left: OX + i * CELL + 4, top: OY + (4 - j) * CELL + 4, width: CELL - 8, height: CELL - 8, borderRadius: 12, background: on ? c : '#EEF1F5', border: `4px solid ${NBK}`, boxSizing: 'border-box', transform: `scale(${on ? Math.min(1, spring(t, a, 9, 12)) * (hot ? 1 + 0.08 * Math.abs(Math.sin(t * 8)) : 1) : 0.85})`, boxShadow: hot ? `0 0 ${30 + 20 * Math.abs(Math.sin(t * 8))}px ${RED}` : 'none'}} />; })}
          <div style={{position: 'absolute', left: OX, top: OY + 5 * CELL + 14, width: 5 * CELL, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3}}>PROBABILITÉ →</div>
          <div style={{position: 'absolute', left: OX - 70, top: OY + 5 * CELL, transform: 'rotate(-90deg)', transformOrigin: '0 0', width: 5 * CELL, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3}}>GRAVITÉ →</div>
          {t > 403.0 && <div style={{position: 'absolute', right: 20, top: 24}}><NBadge at={403.2} text="CODE COULEUR UNIVERSEL" bg={NBK} rot={2} size={24} /></div>}
          {t > 405.2 && <div style={{position: 'absolute', left: cx - 50, top: cy - 50, width: 100, height: 100, borderRadius: 50, border: `8px solid ${NBK}`, boxShadow: `0 0 0 6px #fff`, boxSizing: 'border-box'}}><div style={{position: 'absolute', left: 36, top: 36, width: 12, height: 12, borderRadius: 6, background: NBK}} /></div>}
          {red && <AbsoluteFill style={{background: `conic-gradient(from ${t * 400}deg at 50% 0%, rgba(224,74,63,0.35) 0deg, transparent 30deg, transparent 180deg, rgba(224,74,63,0.35) 180deg, transparent 210deg)`, opacity: prog(t, 413.2, 413.6)}} />}
          <Stamp at={410.6} text="ZONE ROUGE" c={RED} x={560} y={770} rot={-6} size={48} />
        </div>}
        {sw > 0 && <div style={{position: 'absolute', inset: 0, opacity: sw}}>
          <Img src={PH(IMG.rouge)} style={{position: 'absolute', left: 0, top: 0, width: 950, height: 870, objectFit: 'cover', objectPosition: '35% 50%', transform: `scale(${1.1 - prog(t, 414.6, 426, (x: number) => x) * 0.08})`}} />
          <div style={{position: 'absolute', left: 20, top: 20}}><NBadge at={415.0} text="ON STOPPE NET" bg={RED} rot={-2} size={30} /></div>
          <div style={{position: 'absolute', left: 20, right: 20, bottom: 24, display: 'flex', flexWrap: 'wrap', gap: 12}}>{([['ressources financières', 'argent', 421.8], ['ressources humaines', 'equipe', 422.6], ['là où elles sont vitales', 'cible', 424.0]] as CH[]).map(([l, ic, a]) => (t > a ? <Chip key={l} at={a} ic={ic} l={l} c={RED} /> : null))}</div>
        </div>}
      </Abs>
    </Out>
  );
};

/* ═════════════ Partie 5 : prévenir et améliorer ═════════════ */
const LEVELS: [string, string, number, string][] = [['1 · éliminer le danger', 'croix', 443.5, GREEN], ['2 · remplacer (substitution)', 'repeter', 447.5, TEAL], ['3 · ingénierie : barrières, ventilation', 'barriere', 451.8, BLUE], ['4 · administratif : formations', 'diplome', 455.7, ORANGE], ['5 · EPI', 'casque', 461.6, RED]];
const Hierarchie: React.FC = () => {
  const t = useT();
  return <SC at={430.1} end={465.4} c={GREEN} badge="LA HIÉRARCHIE DES MESURES" ih={880} h={[[432.0, ['Des', 'actions', 'concrètes'], [1, 2]], [436.5, ['La', 'hiérarchie', 'des', 'mesures'], [1, 3]], [440.3, ['Le', 'graal', 'absolu'], [1, 2]], [443.2, ['1.', 'Éliminer', 'le', 'danger'], [1, 3]], [446.8, ['2.', 'Remplacer'], [1]], [451.4, ['3.', 'L’ingénierie'], [1]], [455.4, ['4.', 'L’administratif'], [1]], [461.4, ['5.', 'Les', 'EPI'], [2]], [463.4, ['Tout', 'en', 'bas', '!'], [2]]]}
    vis={<>
      {t > 440.4 && <div style={{position: 'absolute', right: 20, top: 24}}><NBadge at={440.5} text="+ EFFICACE EN HAUT" bg={GREEN} rot={2} size={24} /></div>}
      {LEVELS.map(([l, ic, a, c], k) => { if (t < a) return null; const w = 900 - k * 120; const p = Math.min(1, spring(t, a, 9, 13)); const shake = k === 4 ? Math.sin(t * 30) * 6 * Math.max(0, 1 - Math.abs(t - 463.6) * 2) : 0;
        return <div key={l} style={{...nb(c, 6), position: 'absolute', left: 480 - w / 2 + shake, top: 110 + k * 140, width: w, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: k === 4 ? 40 : 32, transform: `translateX(${(1 - p) * (k % 2 ? 700 : -700)}px)`}}><F n={ic} size={64} />{l}</div>; })}
      {t > 441.3 && <div style={{position: 'absolute', left: 440, top: 44, transform: `scale(${Math.min(1.1, spring(t, 441.4))}) rotate(-8deg)`}}><F n="couronne" size={80} /></div>}
      {t > 463.2 && <div style={{position: 'absolute', left: 0, right: 0, top: 800, display: 'flex', justifyContent: 'center'}}><NBadge at={463.3} text="DERNIER RECOURS" bg={RED} rot={-2} size={30} /></div>}
    </>} />;
};
const Epi: React.FC = () => <SC at={465.3} end={479.1} c={GREEN} badge="LES EPI · DERNIÈRE LIGNE DE DÉFENSE" img={IMG.epi} pos="50% 40%" chips={[['qu’au moment de l’impact', 'eclair', 467.5], ['masque mal mis = c’est fini', 'croix', 470.4], ['dernière ligne de défense', 'bouclier', 473.6], ['réactive ≠ proactive', 'fusee', 476.5]]} hx={[[465.5, ['Pourquoi', '?'], [0]]]} />;
const Suivi: React.FC = () => {
  const t = useT();
  const slide = prog(t, 485.2, 486.6, easeInOut);
  const beat = 1 + 0.12 * Math.max(0, Math.sin(t * 7));
  return <SC at={479.0} end={494.1} c={GREEN} badge="LE SUIVI DANS LE TEMPS" ih={720} h={[[479.3, ['Le', 'suivi'], [1]], [481.5, ['Ancrer', 'dans', 'le', 'temps'], [0, 3]], [485.0, ['Pas', 'un', 'papier', 'oublié'], [3]], [488.0, ['Un', 'organisme', 'vivant'], [1, 2]], [490.4, ['Mise', 'à', 'jour', 'annuelle'], [3]], [492.4, ['À', 'chaque', 'changement'], [2]]]}
    vis={<>
      <div style={{position: 'absolute', left: 60, top: 120, width: 360, height: 420}}>
        <div style={{position: 'absolute', left: 0, top: 120, width: 360, height: 300, background: '#C9D2DF', border: `6px solid ${NBK}`, borderRadius: 14}} />
        <div style={{position: 'absolute', left: 30, top: 150, width: 300, height: 110, background: '#E3E8EF', border: `5px solid ${NBK}`, borderRadius: 10, transform: `translateX(${lerp(120, 0, slide)}px)`}}><div style={{position: 'absolute', left: 120, top: 40, width: 60, height: 14, borderRadius: 7, background: NBK}} /></div>
        <div style={{position: 'absolute', left: 90, top: lerp(-20, 150, slide), width: 180, height: 120, background: '#fff', border: `4px solid ${NBK}`, borderRadius: 6, opacity: 1 - prog(t, 486.4, 486.8), transform: `rotate(${lerp(-10, 0, slide)}deg)`}}><div style={{margin: '18px 16px', height: 12, borderRadius: 6, background: '#0002'}} /><div style={{margin: '0 16px', height: 12, width: 100, borderRadius: 6, background: '#0002'}} /></div>
        <Stamp at={487.0} text="PAS AU TIROIR" c={RED} x={20} y={250} rot={-10} size={40} />
      </div>
      {t > 488.0 && <div style={{position: 'absolute', left: 500, top: 110, textAlign: 'center', width: 380}}><div style={{transform: `scale(${Math.min(1, spring(t, 488.0)) * beat})`}}><F n="coeur" size={150} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34}}>un organisme vivant</div></div>}
      <div style={{position: 'absolute', left: 470, top: 420, display: 'flex', flexDirection: 'column', gap: 16}}>{t > 490.4 && <Chip at={490.5} ic="calendrier" l="mise à jour chaque année" c={GREEN} />}{t > 492.3 && <Chip at={492.4} ic="engrenage" l="à chaque changement" c={GREEN} />}</div>
    </>} />;
};
const J: [string, number][] = [['J0', 506.8], ['J+30', 509.2], ['J+90', 509.9]];
const Rex: React.FC = () => {
  const t = useT();
  const p = prog(t, 506.8, 510.2, easeInOut);
  return <SC at={494.0} end={514.95} c={GREEN} badge="LE RETOUR D’EXPÉRIENCE" img={IMG.rex} pos="50% 30%" ih={500} chips={[['REX · retours d’expérience', 'loupe', 495.2], ['presque-accident = leçon gratuite', 'diplome', 500.3], ['éviter le drame de demain', 'bouclier', 503.5]]} hx={[[506.8, ['Vérifier', 'l’efficacité'], [1]], [509.2, ['À', '30', 'ou', '90', 'jours'], [1, 3]], [511.0, ['Pas', 'de', 'nouveau', 'problème'], [2, 3]]]}>
    {t > 506.6 && <Abs x={100} y={1296} w={880} h={100} style={{opacity: pop(t, 506.6)}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 40, height: 20, borderRadius: 10, background: '#E3E8EF', border: `4px solid ${NBK}`}}><div style={{width: `${p * 100}%`, height: '100%', borderRadius: 8, background: GREEN}} /></div>
      {J.map(([l, a], k) => { const on = t > a; return <div key={l} style={{position: 'absolute', left: k * 430 - 30, top: 0, width: 100, textAlign: 'center'}}><div style={{margin: '0 auto', width: 64, height: 64, borderRadius: 32, background: on ? GREEN : '#fff', border: `5px solid ${NBK}`, boxSizing: 'border-box', color: '#fff', fontWeight: 900, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${on ? Math.min(1.1, spring(t, a)) : 1})`}}>{on ? '✓' : ''}</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22}}>{l}</div></div>; })}
    </Abs>}
  </SC>;
};

/* ═════════════ Conclusion : et demain ? ═════════════ */
const QUOTE = '« Vos mesures de prévention d’aujourd’hui résisteront-elles au risque de demain ? »';
const Demain: React.FC = () => {
  const t = useT();
  const sw = prog(t, 523.8, 524.6);
  const n = Math.floor(prog(t, 520.0, 523.4, (x: number) => x) * QUOTE.length);
  const inf = prog(t, 543.8, 546.4, easeInOut);
  const CHD: CH[] = [['nouvelles technologies', 'fusee', 526.3], ['nouveaux procédés', 'eprouvette', 528.2], ['une vitesse folle', 'chrono', 531.2], ['rester vigilant', 'yeux', 538.5], ['une culture résiliente', 'bouclier', 541.0]];
  return (
    <>
      <Heads h={[[515.4, ['Pour', 'conclure'], [1]], [517.0, ['Une', 'réflexion', 'provocatrice'], [2]], [520.4, ['Résisteront-elles', '?'], [0]], [524.2, ['Le', 'monde', 'du', 'travail', 'change'], [4]], [526.3, ['Nouvelles', 'technologies'], [1]], [528.2, ['Nouveaux', 'procédés'], [1]], [531.0, ['Une', 'vitesse', 'folle'], [2]], [532.6, ['La', 'sécurité', 'acquise', '?'], [2]], [535.6, ['Le', 'plus', 'grand', 'risque'], [3]], [538.4, ['Rester', 'vigilant'], [1]], [541.0, ['Une', 'culture', 'résiliente'], [2]], [543.6, ['Pas', 'une', 'destination'], [2]], [546.0, ['Un', 'mouvement', 'perpétuel'], [1, 2]]]} />
      <Abs x={60} y={440} w={960} h={560} style={{borderRadius: 30, overflow: 'hidden', border: `5px solid ${NBK}`, boxShadow: `10px 10px 0 ${GOLD}`, background: '#fff', boxSizing: 'border-box', opacity: pop(t, 518.4)}}>
        {sw < 1 && <div style={{position: 'absolute', inset: 0, opacity: 1 - sw, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60, backgroundImage: 'radial-gradient(#0001 2px, transparent 2px)', backgroundSize: '22px 22px'}}>
          <div style={{position: 'absolute', left: 20, top: 20}}><NBadge at={518.6} text="UNE RÉFLEXION PROVOCATRICE" bg={GOLD} rot={-2} size={26} /></div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, lineHeight: 1.15, color: NAVY, textAlign: 'center'}}>{QUOTE.slice(0, n)}<span style={{opacity: Math.sin(t * 12) > 0 ? 1 : 0, color: GOLD}}>|</span></div>
        </div>}
        {sw > 0 && <div style={{position: 'absolute', inset: 0, opacity: sw}}>
          <Img src={PH(IMG.demain)} style={{position: 'absolute', left: 0, top: 0, width: 950, height: 550, objectFit: 'cover', objectPosition: '50% 25%', transform: `scale(${1.1 - prog(t, 524, 548, (x: number) => x) * 0.08})`, filter: `brightness(${lerp(1, 0.55, inf)})`}} />
          <div style={{position: 'absolute', left: 20, top: 20}}><NBadge at={524.2} text="LE TRAVAIL CHANGE SANS CESSE" bg={GOLD} rot={-2} size={26} /></div>
          {t > 532.4 && t < 543.6 && <div style={{position: 'absolute', left: 0, right: 0, top: 230, display: 'flex', justifyContent: 'center'}}><Barred at={532.6} strk={534.4} text="la sécurité acquise pour toujours" fs={32} /></div>}
          {t > 535.6 && t < 543.6 && <Stamp at={535.8} text="LE PLUS GRAND RISQUE" c={RED} x={200} y={340} rot={-6} size={46} />}
          {inf > 0 && <svg style={{position: 'absolute', left: 0, top: 0}} width={950} height={550}><path d="M 475 275 C 575 140, 760 140, 760 275 C 760 410, 575 410, 475 275 C 375 140, 190 140, 190 275 C 190 410, 375 410, 475 275 Z" fill="none" stroke={GOLD} strokeWidth={18} strokeLinecap="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - inf, filter: `drop-shadow(0 0 14px ${GOLD})`}} /></svg>}
          {t > 546.5 && <div style={{position: 'absolute', left: 0, right: 0, bottom: 40, display: 'flex', justifyContent: 'center'}}><NBadge at={546.6} text="UN MOUVEMENT PERPÉTUEL" bg={NAVY} rot={-2} size={36} /></div>}
        </div>}
      </Abs>
      <Abs x={60} y={1034} w={960} style={{display: 'flex', flexWrap: 'wrap', gap: 12}}>{CHD.map(([l, ic, a]) => (t > a ? <Chip key={l} at={a} ic={ic} l={l} c={GOLD} /> : null))}</Abs>
      {t > 546.0 && <Dust n={26} c={GOLD} />}
    </>
  );
};

/* ═════════════ Son ═════════════ */
const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const pops = (xs: number[]): Sfx[] => xs.map((at) => ({at, s: 'sfx/pop', v: 0.22}));
const stamps = (xs: number[]): Sfx[] => xs.map((at) => ({at, s: 'tampon', v: 0.42}));
const swish = (xs: number[]): Sfx[] => xs.map((at) => ({at, s: 'sfx/swish', v: 0.38}));
const thuds = (xs: number[]): Sfx[] => xs.map((at) => ({at, s: 'sfx/thud', v: 0.36}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at, s: 'sfx/bell', v: 0.22})),
  ...searchCues(3.0, 22, 6.0, 6.4), ...pops([7.8, 13.2, 19.5]), {at: 8.6, s: 'tampon', v: 0.3}, {at: 15.0, s: 'sfx/swish', v: 0.4}, {at: 17.6, s: 'bass-hit', v: 0.35},
  ...thuds([24.0, 26.0, 29.4]), {at: 22.6, s: 'tampon', v: 0.35}, {at: 36.5, s: 'stylo', v: 0.25, dur: 1.4}, {at: 37.9, s: 'validation', v: 0.3},
  ...ROUTE.map((r) => ({at: r[2], s: 'sfx/bell', v: 0.2})), ...pops(ROUTE.map((r) => r[2] + 0.05)),
  ...rep(63.2, 9, 0.12, 'sfx/pop', 0.14), {at: 66.0, s: 'soft-whoosh', v: 0.25, dur: 1.4}, ...pops([71.2, 73.8, 74.4]), {at: 76.2, s: 'deep-hit', v: 0.5}, ...stamps([76.5]), ...pops([80.7]),
  {at: 86.0, s: 'tampon', v: 0.3}, {at: 92.0, s: 'soft-whoosh', v: 0.45, dur: 1.2}, {at: 92.7, s: 'deep-hit', v: 0.5}, {at: 92.8, s: 'tampon', v: 0.3}, {at: 99.4, s: 'soft-whoosh', v: 0.35, dur: 1},
  ...pops([104.5, 106.9, 110.8, 113.5]), ...stamps([114.7]),
  ...pops([118.4, 127.2, 129.5, 135.2, 141.0, 122.4]), {at: 124.0, s: 'sfx/swish', v: 0.4},
  ...rep(152.6, 5, 0.15, 'sfx/click', 0.12), ...STEPS.map((x) => ({at: x[2], s: 'bass-hit', v: 0.32})), ...swish([184.0]), {at: 185.0, s: 'soft-whoosh', v: 0.45, dur: 2}, {at: 188.6, s: 'stylo', v: 0.3, dur: 1.8}, {at: 190.3, s: 'validation', v: 0.35},
  ...stamps([195.3]), {at: 200.0, s: 'soft-whoosh', v: 0.35, dur: 1}, {at: 200.5, s: 'tampon', v: 0.3}, ...thuds([205.8, 206.8, 208.3, 209.6]),
  ...pops([212.5, 218.8, 222.4, 229.5, 231.2]), ...stamps([227.6]),
  {at: 244.5, s: 'soft-whoosh', v: 0.3, dur: 2.5}, ...pops([247.0, 249.5, 251.9]),
  {at: 257.4, s: 'stylo', v: 0.3, dur: 1.2}, ...swish(FISH.map((f) => f[1])), {at: 259.0, s: 'tampon', v: 0.35}, ...pops([265.2, 267.0]),
  ...pops([271.2, 275.5, 277.8, 279.4]),
  ...pops([282.0, 290.0, 293.0, 296.0, 303.6]), ...stamps([293.4]),
  ...pops([310.5, 312.7, 314.4]), {at: 311.0, s: 'stylo', v: 0.25, dur: 4}, {at: 316.0, s: 'bass-hit', v: 0.4},
  ...rep(324.6, 14, 0.46, 'sfx/pop', 0.12), {at: 330.1, s: 'tampon', v: 0.3}, ...thuds([336.3, 337.3, 338.9]), ...pops([336.8, 338.1]),
  {at: 343.1, s: 'sfx/rise', v: 0.25, dur: 0.9}, {at: 348.6, s: 'sfx/rise', v: 0.25, dur: 0.9}, ...pops([341.6, 346.5, 352.5]),
  {at: 363.9, s: 'tampon', v: 0.3}, {at: 367.7, s: 'deep-hit', v: 0.5}, {at: 367.85, s: 'bass-hit', v: 0.4}, {at: 369.2, s: 'soft-whoosh', v: 0.35, dur: 1}, ...pops([370.8, 371.8, 377.5, 386.0]),
  ...rep(396.0, 9, 0.35, 'sfx/pop', 0.14), {at: 403.2, s: 'tampon', v: 0.3}, {at: 405.4, s: 'soft-whoosh', v: 0.3, dur: 1.6}, {at: 407.4, s: 'soft-whoosh', v: 0.3, dur: 1.2}, {at: 410.4, s: 'deep-hit', v: 0.5}, ...stamps([410.6]), {at: 413.3, s: 'sfx/rise', v: 0.35, dur: 1.4}, {at: 414.6, s: 'soft-whoosh', v: 0.4, dur: 1}, {at: 415.0, s: 'tampon', v: 0.35}, ...pops([421.8, 422.6, 424.0]),
  {at: 440.5, s: 'tampon', v: 0.3}, ...LEVELS.map((x) => ({at: x[2], s: 'sfx/whoosh', v: 0.3})), ...thuds(LEVELS.map((x) => x[2] + 0.35)), {at: 441.4, s: 'validation', v: 0.3}, {at: 463.3, s: 'tampon', v: 0.4},
  ...pops([467.5, 470.4, 473.6, 476.5]),
  {at: 485.2, s: 'soft-whoosh', v: 0.3, dur: 1.4}, {at: 486.6, s: 'sfx/thud', v: 0.4}, ...stamps([487.0]), {at: 488.0, s: 'bass-hit', v: 0.35}, ...pops([490.5, 492.4]),
  ...pops([495.2, 500.3, 503.5]), ...J.map((x) => ({at: x[1], s: 'validation', v: 0.25})),
  {at: 520.0, s: 'soft-whoosh', v: 0.25, dur: 1}, ...rep(520.0, 30, 0.11, 'sfx/click', 0.08), {at: 523.8, s: 'soft-whoosh', v: 0.35, dur: 1}, ...pops([526.3, 528.2, 531.2, 538.5, 541.0]), {at: 534.4, s: 'sfx/swish', v: 0.4}, ...stamps([535.8]), {at: 543.8, s: 'stylo', v: 0.3, dur: 2.6}, {at: 546.6, s: 'bass-hit', v: 0.4},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SCN: [React.FC, number, number][] = [[Intro, 2.8, 21.5], [Enjeux, 21.4, 40.3], [Route, 40.2, 58.3], [Jargon, 61.8, 84.6], [Verglas, 84.5, 102.05], [Nuance, 101.9, 115.85], [Duerp, 115.7, 145.5], [Cycle, 149.0, 193.05], [Qui, 192.8, 210.9], [Operateur, 210.4, 234.45], [Detective, 237.8, 254.1], [Fishbone, 253.9, 269.1], [Tache, 268.9, 281.1], [Hawthorne, 280.9, 308.1], [Triangle, 307.9, 319.0], [Equation, 322.4, 339.5], [ProbaGrav, 339.3, 360.1], [Kinney, 359.9, 392.1], [Matrice, 391.9, 426.65], [Hierarchie, 430.0, 465.4], [Epi, 465.2, 479.1], [Suivi, 478.9, 494.1], [Rex, 493.9, 514.95], [Demain, 518.3, OUTRO_AT]];
export const EvalRisquesMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    {SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-evalrisques-metro-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn];
