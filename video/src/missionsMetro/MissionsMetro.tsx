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
 * « Les 7 missions du responsable QHSE » (voix d'origine, 2 min 53) — capsule « condensé + effet wahou + ultra premium »
 * présentée en métro : une ligne à 7 stations (une par mission). Tube de verre à six guichets : les 7 missions →
 * diagnostiquer & planifier → formaliser & réaliser → mesurer & piloter → communiquer → le cycle ; la capsule file
 * d'un guichet à l'autre. Gyrophare, loupe, capsule pneumatique, store vénitien ; barre de recherche
 * « responsable QHSE » qui ouvre l'anneau des 7 missions. Chaque mission « slamme » son numéro (tuile géante + ondes
 * de choc), puis sa photo et ses actions en puces ; effets dédiés : loupe sur les non-conformités, pyramide
 * documentaire qui se construit, jauges d'indicateurs, boussole « sous contrôle » + escalier d'amélioration continue,
 * cercle de l'engagement de tous. Final wahou : les 7 segments volent se souder en une roue qui tourne, puis sondage
 * « laquelle est la plus difficile ? » et bouton « S'abonner » cliqué. Illustrations générées par l'utilisateur
 * (public/missions-gen/). Kits capsule-ui-neo-brutal et capsule-recit-illustre.
 */
const IMG = {
  cover: 'missions-gen/couverture.jpg',
  c1: 'missions-gen/realisation.jpg',
  c2: 'missions-gen/pilotage.jpg',
  diag: 'missions-gen/diagnostic.jpg',
  plan: 'missions-gen/planification.jpg',
  form: 'missions-gen/formalisation.jpg',
  real: 'missions-gen/realisation.jpg',
  mes: 'missions-gen/mesure.jpg',
  pil: 'missions-gen/pilotage.jpg',
  com: 'missions-gen/communication.jpg',
  cycle: 'missions-gen/cycle.jpg',
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
const OUTRO_AT = 173.8;
export const MISSIONS_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '1', title: 'Les 7 missions', s: 'du responsable QHSE', c: NAVY, g: '7 missions', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 15.6, n: '2', title: 'Diagnostiquer & planifier', s: 'missions 1 et 2', c: TEAL, g: 'diagnostic · plan', k: 'gyro', lab: 'GUICHET 2 / 6'},
  {at: 43.9, n: '3', title: 'Formaliser & réaliser', s: 'missions 3 et 4', c: VIO, g: 'formaliser · réaliser', k: 'loupe', lab: 'GUICHET 3 / 6'},
  {at: 74.6, n: '4', title: 'Mesurer & piloter', s: 'missions 5 et 6', c: RED, g: 'mesurer · piloter', k: 'tube', lab: 'GUICHET 4 / 6'},
  {at: 110.5, n: '5', title: 'Communiquer & animer', s: 'mission 7', c: ORANGE, g: 'communiquer', k: 'store', lab: 'GUICHET 5 / 6'},
  {at: 131.7, n: '★', title: 'Retenez bien ceci', s: 'un cycle continu', c: GREEN, g: 'le cycle', k: 'gyro', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 156.5;
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
  {n: 1, l: 'Le diagnostic', s: 'diagnostic', at: 17.3},
  {n: 2, l: 'La planification', s: 'planifier', at: 32.1},
  {n: 3, l: 'La formalisation', s: 'formaliser', at: 45.6},
  {n: 4, l: 'La réalisation', s: 'réaliser', at: 62.6},
  {n: 5, l: 'La mesure et le contrôle', s: 'mesurer', at: 76.2},
  {n: 6, l: 'Le pilotage', s: 'piloter', at: 94.1},
  {n: 7, l: 'La communication', s: 'communiquer', at: 112.4},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE QHSE · STATION {r.n} / 7</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="agent-hse" w={1080} h={820} pos="50% 22%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 24%, ${PAPER}CC 32%, ${PAPER} 37%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb(NBK, 5), color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3, padding: '8px 22px'}}>DU RESPONSABLE QHSE</div></Abs>
      <Abs x={0} y={650} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="LES 7" src={IMG.c1} size={190} ls={8} /></Abs>
      <Abs x={0} y={850} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="MISSIONS" src={IMG.c2} size={150} ls={4} seed={3} /></Abs>
      <Abs x={40} y={1040} w={1000} style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10}}>{MIS.map(([n, , c], k) => <div key={n} style={{...nb(c, 4), padding: '6px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: '#fff', transform: `translateY(${(1 - Math.min(1, spring(t, 0.3 + k * 0.07))) * 60}px)`}}>{k + 1} · {n}</div>)}</Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={NAVY} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Les 7 missions (données partagées) ═════════════ */
const MIS: [string, string, string, number][] = [['diagnostiquer', 'loupe', TEAL, 139.0], ['planifier', 'calendrier', BLUE, 140.2], ['formaliser', 'classeur', VIO, 141.3], ['réaliser', 'casque', ORANGE, 142.4], ['mesurer', 'graphique', RED, 143.4], ['piloter', 'boussole', NAVY, 144.2], ['communiquer', 'megaphone', GREEN, 145.2]];
const sector = (cx: number, cy: number, r0: number, r1: number, a0: number, a1: number) => {
  const P = (r: number, a: number) => `${cx + r * Math.cos((a * Math.PI) / 180)} ${cy + r * Math.sin((a * Math.PI) / 180)}`;
  return `M ${P(r1, a0)} A ${r1} ${r1} 0 0 1 ${P(r1, a1)} L ${P(r0, a1)} A ${r0} ${r0} 0 0 0 ${P(r0, a0)} Z`;
};

/* ═════════════ Fil wahou : la roue des 7 missions ═════════════ */
const Wheel: React.FC<{R: number; cx: number; cy: number; ats: number[]; spinAt: number; center: string; label?: boolean}> = ({R, cx, cy, ats, spinAt, center, label = true}) => {
  const t = useT();
  const spin = t > spinAt ? (t - spinAt) * 35 * Math.min(1, (t - spinAt) / 1.2) : 0;
  const r0 = R * 0.36;
  const st = 360 / 7;
  return (
    <div style={{position: 'absolute', left: cx - R, top: cy - R, width: R * 2, height: R * 2}}>
      <div style={{position: 'absolute', inset: 0, transform: `rotate(${spin}deg)`}}>
        <svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}} width={R * 2} height={R * 2}>
          {MIS.map(([, , c], k) => {
            const a = -90 - st / 2 + k * st;
            const p = Math.max(0, Math.min(1.06, spring(t, ats[k], 8, 13)));
            const mid = ((a + st / 2) * Math.PI) / 180;
            const off = (1 - Math.min(1, p)) * R * 1.6;
            return <path key={k} d={sector(R, R, r0, R, a + 1.2, a + st - 1.2)} fill={c} stroke={NBK} strokeWidth={6} strokeLinejoin="round" opacity={t > ats[k] ? 1 : 0} transform={`translate(${Math.cos(mid) * off} ${Math.sin(mid) * off})`} />;
          })}
        </svg>
        {label && MIS.map(([n, ic], k) => {
          const mid = ((-90 + k * st) * Math.PI) / 180;
          const rr = (R + r0) / 2;
          const p = Math.max(0, Math.min(1, spring(t, ats[k], 8, 13)));
          return <div key={n} style={{position: 'absolute', left: R + Math.cos(mid) * rr - 70, top: R + Math.sin(mid) * rr - 54, width: 140, textAlign: 'center', transform: `rotate(${-spin}deg) scale(${p})`, opacity: t > ats[k] ? 1 : 0}}><F n={ic} size={R > 300 ? 64 : 44} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: R > 300 ? 22 : 16, color: '#fff', textShadow: `0 2px 0 ${NBK}`}}>{n}</div></div>;
        })}
      </div>
      <div style={{position: 'absolute', left: R - r0 + 10, top: R - r0 + 10, width: (r0 - 10) * 2, height: (r0 - 10) * 2, borderRadius: '50%', background: '#fff', border: `6px solid ${NBK}`, boxShadow: `0 0 ${20 + 20 * Math.abs(Math.sin(t * 2))}px ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: R > 300 ? 34 : 24, lineHeight: 1.05, color: NAVY, boxSizing: 'border-box', padding: 10}}>{center}</div>
    </div>
  );
};

/* ═════════════ Slam du numéro de mission ═════════════ */
const Slam: React.FC<{at: number; n: number; title: string; c: string}> = ({at, n, title, c}) => {
  const t = useT();
  const k = t - at;
  if (k < 0 || k > 2.1) return null;
  const inn = Math.min(1, spring(t, at, 9, 12));
  const out = prog(t, at + 1.7, at + 2.1, easeIn);
  return (
    <Abs x={60} y={440} w={960} h={900} style={{opacity: 1 - out, zIndex: 12, transform: `scale(${1 + out * 0.15})`}}>
      {[0, 1, 2].map((j) => { const r = prog(t, at + 0.1 + j * 0.15, at + 1.0 + j * 0.15); return <div key={j} style={{position: 'absolute', left: 480 - r * 420, top: 300 - r * 420, width: r * 840, height: r * 840, borderRadius: '50%', border: `${10 - j * 3}px solid ${c}`, opacity: (1 - r) * 0.8}} />; })}
      {Array.from({length: 16}, (_, j) => { const a = (j / 16) * Math.PI * 2; const r = prog(t, at + 0.08, at + 0.5, easeOut); return <div key={`s${j}`} style={{position: 'absolute', left: 480 + Math.cos(a) * (150 + r * 260), top: 300 + Math.sin(a) * (150 + r * 260), width: 60, height: 8, borderRadius: 4, background: j % 2 ? c : YEL, transform: `rotate(${(a * 180) / Math.PI}deg)`, opacity: 1 - prog(t, at + 0.4, at + 0.8)}} />; })}
      <div style={{position: 'absolute', left: 0, right: 0, top: 300 - 130, display: 'flex', justifyContent: 'center', transform: `scale(${lerp(3, 1, inn)}) rotate(${(1 - inn) * -25}deg)`}}><Tile ch={String(n)} size={260} c={c} /></div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 540, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 38, letterSpacing: 8, color: DIM, opacity: pop(t, at + 0.3)}}>MISSION N° {n}</div>
      <div style={{position: 'absolute', left: 40, right: 40, top: 610, textAlign: 'center'}}><Kin text={title} at={at + 0.45} size={title.length > 18 ? 70 : 88} color={c} /></div>
    </Abs>
  );
};

/* ═════════════ Scène type d'une mission ═════════════ */
type CH = [string, string, number];
const MS: React.FC<{n: number; at: number; end: number; title: string; c: string; img: string; pos?: string; slam?: boolean; chips: CH[]; ih?: number; h: HD[]; over?: React.ReactNode; children?: React.ReactNode}> = ({n, at, end, title, c, img, pos = '50% 40%', slam, chips, ih = 460, h, over, children}) => {
  const t = useT();
  const s0 = slam ? at + 1.9 : at;
  return (
    <Out end={end}>
      <Heads h={h} />
      {slam && <Slam at={at} n={n} title={title} c={c} />}
      {t > s0 && (
        <>
          <Shot src={img} ic="agent-hse" x={60} y={440} w={960} h={ih} at={s0} pos={pos} c={c}>
            <div style={{position: 'absolute', left: 20, top: 20, zIndex: 6}}><NBadge at={s0 + 0.2} text={`MISSION ${n} · ${title.toUpperCase()}`} bg={c} rot={-2} size={28} /></div>
            {over}
          </Shot>
          <Abs x={60} y={440 + ih + 34} w={960} style={{display: 'flex', flexWrap: 'wrap', gap: 12}}>{chips.map(([l, ic, a]) => (t > a ? <Chip key={l} at={a} ic={ic} l={l} c={c} /> : null))}</Abs>
          {children}
        </>
      )}
    </Out>
  );
};

/* ═════════════ Guichet 1 : recherche « responsable QHSE » → anneau des 7 missions ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  return (
    <Out end={15.65}>
      <Heads h={[[3.2, ['Responsable', 'QHSE', '?'], [1]], [6.6, ['7', 'missions', 'essentielles'], [0, 1]], [10.2, ['Un', 'rôle', 'déterminant'], [2]], [13.2, ['La', 'performance', 'du', 'système'], [1, 3]]]} />
      <SearchOpen x={60} y={440} w={960} h={900} at={3.0} query="responsable QHSE" results={['les 7 missions du responsable QHSE', 'fiche de poste QHSE', 'devenir responsable QHSE']} found={0} foundAt={6.4} clickAt={6.8} c={NAVY}>
        <div style={{position: 'absolute', left: 480 - 170, top: 300 - 170, width: 340, height: 340, borderRadius: '50%', overflow: 'hidden', border: `6px solid ${NBK}`, opacity: pop(t, 7.6)}}><Img src={PH(IMG.cover)} style={{width: 340, height: 340, objectFit: 'cover', objectPosition: '50% 25%'}} /></div>
        {MIS.map(([nm, ic, c], k) => {
          const a = ((-90 + k * (360 / 7) + (t - 8.3) * 8) * Math.PI) / 180;
          const at = 8.3 + k * 0.14;
          const p = Math.max(0, Math.min(1.05, spring(t, at, 8, 12)));
          const r = Math.min(1, p);
          return t > at ? <div key={nm} style={{position: 'absolute', left: 480 + Math.cos(a) * r * 350 - 62, top: 300 + Math.sin(a) * r * 238 - 62, width: 124, height: 124, borderRadius: 62, background: c, border: `5px solid ${NBK}`, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 20px ${c}`}}><F n={ic} size={56} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: '#fff'}}>{k + 1}</div></div> : null;
        })}
        {t > 10.4 && <div style={{position: 'absolute', left: 0, right: 0, top: 640, display: 'flex', justifyContent: 'center'}}><NBadge at={10.4} text="UN RÔLE DÉTERMINANT" bg={NAVY} rot={-2} size={32} /></div>}
        {t > 13.3 && <div style={{position: 'absolute', left: 0, right: 0, top: 730, display: 'flex', justifyContent: 'center', gap: 12}}><Chip at={13.4} ic="hausse" l="performance" c={GREEN} /><Chip at={14.2} ic="engrenage" l="système de management" c={BLUE} /></div>}
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ Effets dédiés ═════════════ */
const Gauges: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  return (
    <div style={{position: 'absolute', right: 20, bottom: 20, ...nb('#fff', 5), padding: '10px 14px', display: 'flex', gap: 14, opacity: pop(t, at), zIndex: 6}}>
      {[[RED, 0.75, 'sécurité'], [GOLD, 0.45, 'qualité'], [GREEN, 0.62, 'environnement']].map(([c, v, l], k) => {
        const p = prog(t, at + 0.2 + k * 0.2, at + 1.4 + k * 0.2, easeOut) * (v as number);
        const ang = -180 + p * 180 + Math.sin(t * 5 + k) * 2;
        return (
          <div key={l as string} style={{textAlign: 'center'}}>
            <svg width={110} height={64}><path d="M 10 58 A 45 45 0 0 1 100 58" fill="none" stroke="#E3E8EF" strokeWidth={12} /><path d="M 10 58 A 45 45 0 0 1 100 58" fill="none" stroke={c as string} strokeWidth={12} pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - p}} /><line x1={55} y1={58} x2={55 + Math.cos((ang * Math.PI) / 180) * 38} y2={58 + Math.sin((ang * Math.PI) / 180) * 38} stroke={NBK} strokeWidth={5} strokeLinecap="round" /><circle cx={55} cy={58} r={6} fill={NBK} /></svg>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 16}}>{l}</div>
          </div>
        );
      })}
    </div>
  );
};
const DOCS: [string, number, string][] = [['politique', 52.5, NAVY], ['procédures', 53.1, BLUE], ['instructions', 53.8, VIO], ['consignes', 54.7, ORANGE], ['plan d’action', 55.4, GREEN]];
const Pyramid: React.FC = () => {
  const t = useT();
  return (
    <Abs x={60} y={914} w={960} h={330}>
      {DOCS.map(([l, a, c], k) => {
        const w = 300 + k * 150;
        const p = Math.max(0, Math.min(1.06, spring(t, a, 9, 13)));
        return t > a ? <div key={l} style={{...nb(c, 5), position: 'absolute', left: 480 - w / 2, top: k * 64 - (1 - Math.min(1, p)) * 260, width: w, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 28}}><F n={['parchemin', 'clipboard', 'memo', 'danger', 'calendrier'][k]} size={40} />{l}</div> : null;
      })}
    </Abs>
  );
};
const Compass: React.FC<{at: number; up: number}> = ({at, up}) => {
  const t = useT();
  const settle = prog(t, at, at + 1.4, easeOut);
  const ang = lerp(-160, 0, settle) + Math.sin(t * 9) * 25 * (1 - settle);
  const draw = prog(t, up, up + 1.2, easeOut);
  return (
    <Abs x={60} y={1080} w={960} h={280} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 16, opacity: pop(t, at)}}>
        <svg width={200} height={200}><circle cx={100} cy={100} r={90} fill="#fff" stroke={NBK} strokeWidth={7} />{[0, 90, 180, 270].map((d) => <line key={d} x1={100 + 70 * Math.cos((d * Math.PI) / 180)} y1={100 + 70 * Math.sin((d * Math.PI) / 180)} x2={100 + 84 * Math.cos((d * Math.PI) / 180)} y2={100 + 84 * Math.sin((d * Math.PI) / 180)} stroke={NBK} strokeWidth={5} />)}<g transform={`rotate(${ang} 100 100)`}><polygon points="100,22 114,100 86,100" fill={RED} stroke={NBK} strokeWidth={3} /><polygon points="100,178 114,100 86,100" fill="#C9D2DF" stroke={NBK} strokeWidth={3} /></g><circle cx={100} cy={100} r={9} fill={NBK} /></svg>
        {t > at + 1.0 && <NBadge at={at + 1.0} text="SOUS CONTRÔLE" bg={NAVY} rot={-3} size={28} />}
      </div>
      {t > up && <div style={{position: 'relative', width: 300, height: 200}}>
        <svg width={300} height={200}><path d="M 10 180 L 70 180 L 70 140 L 130 140 L 130 100 L 190 100 L 190 60 L 250 60 L 250 20 L 290 20" fill="none" stroke={GREEN} strokeWidth={12} strokeLinejoin="round" strokeLinecap="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - draw}} /></svg>
        <div style={{position: 'absolute', left: 0, top: 190, width: 300, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: GREEN, opacity: pop(t, up + 0.8)}}>amélioration continue</div>
      </div>}
    </Abs>
  );
};
const Circle: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  return (
    <Abs x={60} y={1095} w={960} h={290}>
      {Array.from({length: 10}, (_, k) => {
        const a = ((k / 10) * 360 - 90 + (t - at) * 6) * (Math.PI / 180);
        const p = prog(t, at + k * 0.12, at + 0.6 + k * 0.12, easeOut);
        const r = lerp(520, 128, p);
        return <div key={k} style={{position: 'absolute', left: 480 + Math.cos(a) * r * 1.6 - 34, top: 140 + Math.sin(a) * r * 0.85 - 34, opacity: p, transform: `scale(${0.6 + 0.4 * p})`}}><div style={{width: 68, height: 68, borderRadius: 34, background: '#fff', border: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={k % 2 ? 'salariee' : 'salarie'} size={50} /></div></div>;
      })}
      {t > at + 1.6 && <div style={{position: 'absolute', left: 0, right: 0, top: 108, display: 'flex', justifyContent: 'center'}}><NBadge at={at + 1.6} text="TOUS ENGAGÉS" bg={ORANGE} rot={-2} size={34} /></div>}
    </Abs>
  );
};

/* ═════════════ Les 7 scènes de mission ═════════════ */
const M1: React.FC = () => <MS n={1} at={19.0} end={30.65} title="Le diagnostic" c={TEAL} img={IMG.diag} pos="40% 45%" chips={[['évaluer la situation', 'loupe', 22.6], ['identifier les risques', 'danger', 24.6], ['détecter les non-conformités', 'croix', 25.9], ['axes d’amélioration', 'hausse', 27.8]]} h={[[19.1, ['Réaliser', 'un', 'diagnostic'], [2]], [22.4, ['Évaluer', 'la', 'situation'], [0, 2]], [24.6, ['Identifier', 'les', 'risques'], [0, 2]], [25.9, ['Détecter', 'les', 'non-conformités'], [0, 2]], [27.8, ['Les', 'axes', 'prioritaires'], [1, 2]]]} over={<LoupeSweep x0={40} y0={60} x1={180} y1={250} a={24.7} b={27.0} size={170} />}>
  <Stamp at={26.5} text="NON-CONFORME" c={RED} x={560} y={600} rot={-6} size={44} />
</MS>;
const M2: React.FC = () => <MS n={2} at={30.6} end={43.95} slam title="La planification" c={BLUE} img={IMG.plan} pos="50% 40%" chips={[['définir les objectifs', 'cible', 35.0], ['programmes d’action', 'clipboard', 37.1], ['fixer les échéances', 'calendrier', 38.8], ['identifier les ressources', 'boite-outils', 40.3]]} h={[[30.7, ['Mission', '2', ':', 'planifier'], [3]], [33.8, ['Définir', 'les', 'objectifs'], [0, 2]], [37.1, ['Les', 'programmes', 'd’action'], [1, 2]], [38.8, ['Fixer', 'les', 'échéances'], [0, 2]], [40.3, ['Les', 'ressources'], [1]], [42.2, ['Les', 'résultats', 'attendus'], [1, 2]]]}>
  <Abs x={60} y={1110} w={960} h={120}><TimelineBar at={41.6} /></Abs>
</MS>;
const TimelineBar: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  if (t < at) return null;
  const p = prog(t, at, at + 1.6, easeInOut);
  return (
    <div style={{position: 'absolute', left: 40, right: 40, top: 50, height: 22, borderRadius: 11, background: '#E3E8EF', border: `4px solid ${NBK}`}}>
      <div style={{width: `${p * 100}%`, height: '100%', borderRadius: 8, background: `linear-gradient(90deg, ${BLUE}, ${GREEN})`}} />
      {[0, 0.33, 0.66, 1].map((x, k) => <div key={k} style={{position: 'absolute', left: `calc(${x * 100}% - 20px)`, top: -14, width: 40, height: 40, borderRadius: 20, background: p >= x ? GREEN : '#fff', border: `4px solid ${NBK}`, boxSizing: 'border-box', color: '#fff', fontWeight: 900, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{p >= x ? '✓' : ''}</div>)}
      <div style={{position: 'absolute', right: -10, top: 30, fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: GREEN, opacity: pop(t, at + 1.5)}}>résultats attendus</div>
    </div>
  );
};
const M3: React.FC = () => {
  const t = useT();
  return <MS n={3} at={47.3} end={60.95} title="La formalisation" c={VIO} img={IMG.form} pos="50% 40%" ih={440} chips={[]} h={[[47.4, ['Traduire', 'les', 'exigences'], [0, 2]], [50.6, ['En', 'documents', 'opérationnels'], [1, 2]], [52.5, ['Politique', '·', 'procédures', '·', 'consignes'], [0, 2, 4]], [56.4, ['Efficacement', 'et', 'en', 'sécurité'], [0, 3]]]}>
    <Pyramid />
    {t > 58.3 && <Abs x={60} y={1262} w={960} style={{display: 'flex', justifyContent: 'center', gap: 12}}><Chip at={58.4} ic="fusee" l="efficacement" c={VIO} /><Chip at={59.6} ic="bouclier" l="en toute sécurité" c={GREEN} /></Abs>}
  </MS>;
};
const M4: React.FC = () => <MS n={4} at={60.9} end={74.65} slam title="La réalisation" c={ORANGE} img={IMG.real} pos="50% 35%" chips={[['déployer les actions', 'fusee', 65.6], ['accompagner sur le terrain', 'equipe', 67.6], ['mesures de prévention', 'bouclier', 69.5], ['appliquer les exigences', 'check', 71.7]]} h={[[61.0, ['Mission', '4', ':', 'réaliser'], [3]], [64.4, ['Déployer', 'concrètement'], [0, 1]], [67.6, ['Sur', 'le', 'terrain'], [2]], [69.5, ['Les', 'mesures', 'de', 'prévention'], [1, 3]], [71.7, ['Les', 'exigences', 'QHSE'], [1, 2]]]}>
  <Stamp at={73.0} text="SUR LE TERRAIN" c={ORANGE} x={560} y={1160} rot={-5} size={40} />
</MS>;
const M5: React.FC = () => {
  const t = useT();
  return <MS n={5} at={78.0} end={92.45} title="Mesure et contrôle" c={RED} img={IMG.mes} pos="50% 35%" ih={440} chips={[['indicateurs', 'graphique', 79.6], ['inspections', 'loupe', 81.8], ['audits', 'auditeur', 83.0], ['conformité', 'check', 84.0], ['efficacité', 'cible', 85.4]]} h={[[78.4, ['Suivre', 'les', 'indicateurs'], [0, 2]], [81.8, ['Inspections', 'et', 'audits'], [0, 2]], [84.0, ['Vérifier', 'la', 'conformité'], [0, 2]], [88.0, ['Résultats', '=', 'objectifs', '?'], [0, 2]]]} over={<Gauges at={80.2} />}>
    {t > 88.0 && <Abs x={60} y={1110} w={960} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 22}}>
      <div style={{...nb('#fff', 6), boxShadow: `6px 6px 0 ${BLUE}`, padding: '14px 24px', fontFamily: sansFont, fontWeight: 900, fontSize: 34, transform: `scale(${pop(t, 88.6)})`}}>résultats</div>
      <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: t > 90.6 ? GREEN : DIM, transform: `scale(${t > 90.6 ? Math.min(1.2, spring(t, 90.6)) : 1})`}}>{t > 90.6 ? '=' : '?'}</div>
      <div style={{...nb('#fff', 6), boxShadow: `6px 6px 0 ${GREEN}`, padding: '14px 24px', fontFamily: sansFont, fontWeight: 900, fontSize: 34, transform: `scale(${pop(t, 90.8)})`}}>objectifs fixés</div>
    </Abs>}
  </MS>;
};
const M6: React.FC = () => <MS n={6} at={92.4} end={110.55} slam title="Le pilotage" c={NAVY} img={IMG.pil} pos="50% 35%" ih={440} chips={[['analyser les résultats', 'graphique', 96.8], ['suivre les plans d’action', 'clipboard', 98.3], ['traiter les écarts', 'cle', 99.6], ['préparer la décision', 'cible', 100.8]]} h={[[92.5, ['Mission', '6', ':', 'piloter'], [3]], [95.7, ['Analyser', 'les', 'résultats'], [0, 2]], [99.6, ['Traiter', 'les', 'écarts'], [0, 2]], [100.8, ['Préparer', 'la', 'décision'], [0, 2]], [104.0, ['Le', 'système', 'sous', 'contrôle'], [1, 3]], [107.4, ['Vers', 'l’amélioration', 'continue'], [1, 2]]]}>
  <Compass at={105.4} up={108.4} />
</MS>;
const M7: React.FC = () => <MS n={7} at={113.3} end={131.75} title="Communication et animation" c={ORANGE} img={IMG.com} pos="50% 30%" ih={440} chips={[['sensibiliser', 'megaphone', 116.6], ['former', 'diplome', 118.4], ['animer les réunions', 'causerie', 119.8], ['communiquer les résultats', 'haut-parleur', 122.0], ['bonnes pratiques', 'pouce', 123.9]]} h={[[115.2, ['Sensibiliser', 'le', 'personnel'], [0, 2]], [118.4, ['Former', 'les', 'équipes'], [0, 2]], [119.8, ['Animer', 'les', 'réunions'], [0, 2]], [122.0, ['Communiquer', 'les', 'résultats'], [0, 2]], [125.8, ['L’engagement', 'de', 'tous'], [0, 2]]]}>
  <Circle at={128.6} />
</MS>;

/* ═════════════ Guichet 6 : la roue → documents → sondage → s'abonner ═════════════ */
const Final: React.FC = () => {
  const t = useT();
  const a1 = prog(t, 146.4, 147.0);
  const a2 = prog(t, 157.6, 158.2);
  return (
    <>
      <Heads h={[[135.0, ['Un', 'cycle', 'continu'], [1, 2]], [139.0, ['Diagnostiquer', '·', 'planifier'], [0, 2]], [141.3, ['Formaliser', '·', 'réaliser'], [0, 2]], [143.4, ['Mesurer', '·', 'piloter'], [0, 2]], [145.2, ['Communiquer'], [0]], [146.9, ['Pas', 'seulement', 'des', 'documents'], [3]], [150.9, ['Faire', 'vivre', 'le', 'système'], [1, 3]], [153.3, ['Mobiliser', 'les', 'équipes'], [0, 2]], [154.8, ['La', 'performance', 'globale'], [1, 2]], [158.3, ['Dites-le', 'en', 'commentaire'], [2]], [160.7, ['La', 'plus', 'difficile', '?'], [2]], [165.4, ['Abonnez-vous'], [0]], [169.1, ['Faire', 'la', 'différence'], [2]]]} />
      {a1 < 1 && <AbsoluteFill style={{opacity: 1 - a1, transform: `scale(${1 - a1 * 0.2})`}}>
        <Wheel R={420} cx={540} cy={900} ats={MIS.map((m) => m[3])} spinAt={145.6} center="CYCLE CONTINU" />
        {t > 145.9 && <Dust n={24} c={GOLD} />}
      </AbsoluteFill>}
      {a1 > 0 && a2 < 1 && <AbsoluteFill style={{opacity: a1 * (1 - a2)}}>
        <Shot src={IMG.cycle} ic="engrenage" x={60} y={440} w={960} h={640} at={146.5} pos="50% 50%" c={GREEN} />
        <Abs x={60} y={1110} w={960} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
          <div style={{position: 'relative', ...nb('#fff', 5), padding: '8px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM, opacity: pop(t, 148.6)}}>se contenter de produire des documents<Strk at={150.2} /></div>
          <div style={{display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center'}}>{t > 151.0 && <Chip at={151.1} ic="coeur" l="fait vivre le système" c={GREEN} />}{t > 153.2 && <Chip at={153.3} ic="equipe" l="mobilise les équipes" c={BLUE} />}{t > 154.7 && <Chip at={154.8} ic="hausse" l="performance globale" c={GOLD} />}</div>
        </Abs>
      </AbsoluteFill>}
      {a2 > 0 && <AbsoluteFill style={{opacity: a2}}><Cta /></AbsoluteFill>}
    </>
  );
};
const Cta: React.FC = () => {
  const t = useT();
  const sh = prog(t, 165.0, 165.6, easeInOut);
  const hov = Math.floor(prog(t, 161.6, 164.6, (x: number) => x) * 6.99);
  const clickAt = 166.6;
  const cur = prog(t, 165.8, clickAt, easeInOut);
  const on = t > clickAt + 0.1;
  return (
    <>
      <Abs x={60} y={440} w={960} h={lerp(760, 470, sh)} style={{...nb('#fff', 8), boxShadow: `8px 8px 0 ${ORANGE}`, overflow: 'hidden'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '18px 24px', borderBottom: `4px solid ${NBK}`, background: `${ORANGE}22`}}><F n="bulle" size={56} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, lineHeight: 1.1}}>Laquelle vous semble la plus difficile à maîtriser ?</div></div>
        <div style={{padding: '12px 24px', transform: `scale(${lerp(1, 0.6, sh)})`, transformOrigin: '0 0'}}>{MIS.map(([n, ic, c], k) => <div key={n} style={{display: 'flex', alignItems: 'center', gap: 14, height: 80, opacity: t > 160.8 + k * 0.1 ? 1 : 0, transform: `translateX(${(1 - Math.min(1, spring(t, 160.8 + k * 0.1))) * 200}px)`, background: hov === k && t > 161.6 && t < 164.8 ? `${c}22` : 'transparent', borderRadius: 12}}><div style={{width: 34, height: 34, borderRadius: 17, border: `4px solid ${NBK}`, background: hov === k && t > 161.6 && t < 164.8 ? c : '#fff', boxSizing: 'border-box'}} /><F n={ic} size={46} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30}}>{k + 1}. {n}</span></div>)}</div>
      </Abs>
      {t > 165.2 && <Abs x={0} y={lerp(1280, 990, sh)} w={1080} style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{...nb(on ? GREEN : RED, 8), padding: '22px 48px', display: 'flex', alignItems: 'center', gap: 16, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 50, transform: `scale(${t > clickAt && t < clickAt + 0.15 ? 0.92 : Math.min(1, spring(t, 165.2))})`}}><F n="cloche" size={60} />{on ? 'ABONNÉ ✓' : 'S’ABONNER'}</div>
      </Abs>}
      {t > 165.6 && t < clickAt + 0.6 && <div style={{position: 'absolute', left: lerp(900, 600, cur), top: lerp(1300, 1060, cur), zIndex: 20}}><svg width={60} height={72} viewBox="0 0 24 30"><path d="M2 2 L2 24 L8 18 L12 28 L16 26 L12 17 L20 17 Z" fill="#fff" stroke={INK} strokeWidth={2} strokeLinejoin="round" /></svg></div>}
      {t > clickAt && t < clickAt + 0.7 && <div style={{position: 'absolute', left: 600 - (t - clickAt) * 200, top: 1060 - (t - clickAt) * 200, width: (t - clickAt) * 400, height: (t - clickAt) * 400, borderRadius: '50%', border: `6px solid ${GREEN}`, opacity: 1 - (t - clickAt) / 0.7, zIndex: 19}} />}
      {t > 169.1 && <Abs x={0} y={1180} w={1080} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={169.2} text="FAIRE LA DIFFÉRENCE SUR LE TERRAIN" bg={NAVY} rot={-2} size={32} /></Abs>}
      {t > 170.5 && <Dust n={24} c={GOLD} />}
    </>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const slamCues = (at: number): Sfx[] => [{at, s: 'deep-hit', v: 0.5}, {at: at + 0.05, s: 'bass-hit', v: 0.4}, {at: at + 0.45, s: 'sfx/swish', v: 0.3}, {at: at + 1.75, s: 'sfx/whoosh', v: 0.3}];
const chipCues = (xs: number[]): Sfx[] => xs.map((at) => ({at, s: 'sfx/pop', v: 0.24}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at, s: 'sfx/bell', v: 0.22})),
  ...searchCues(3.0, 16, 6.4, 6.8), ...rep(8.3, 7, 0.14, 'sfx/pop', 0.2), {at: 10.4, s: 'tampon', v: 0.35}, ...chipCues([13.4, 14.2]),
  {at: 19.2, s: 'tampon', v: 0.3}, ...chipCues([22.6, 24.6, 25.9, 27.8]), {at: 24.7, s: 'soft-whoosh', v: 0.3, dur: 1.4}, {at: 26.5, s: 'tampon', v: 0.45},
  ...slamCues(30.6), ...chipCues([35.0, 37.1, 38.8, 40.3]), {at: 41.6, s: 'sfx/rise', v: 0.3, dur: 1.4}, {at: 43.1, s: 'validation', v: 0.3},
  {at: 47.5, s: 'tampon', v: 0.3}, ...DOCS.map((d) => ({at: d[1] + 0.2, s: 'sfx/thud', v: 0.38})), ...chipCues([58.4, 59.6]),
  ...slamCues(60.9), ...chipCues([65.6, 67.6, 69.5, 71.7]), {at: 73.0, s: 'tampon', v: 0.45},
  {at: 78.2, s: 'tampon', v: 0.3}, ...chipCues([79.6, 81.8, 83.0, 84.0, 85.4]), {at: 80.4, s: 'sfx/rise', v: 0.3, dur: 1.2}, {at: 88.6, s: 'sfx/pop', v: 0.3}, {at: 90.6, s: 'validation', v: 0.35},
  ...slamCues(92.4), ...chipCues([96.8, 98.3, 99.6, 100.8]), {at: 105.4, s: 'soft-whoosh', v: 0.35, dur: 1.4}, {at: 106.4, s: 'tampon', v: 0.35}, {at: 108.4, s: 'stylo', v: 0.3, dur: 1.2}, {at: 109.2, s: 'validation', v: 0.3},
  {at: 113.5, s: 'tampon', v: 0.3}, ...chipCues([116.6, 118.4, 119.8, 122.0, 123.9]), ...rep(128.6, 10, 0.12, 'sfx/pop', 0.16), {at: 130.2, s: 'tampon', v: 0.4},
  ...MIS.map((m) => ({at: m[3], s: 'sfx/thud', v: 0.45})), {at: 145.6, s: 'sfx/rise', v: 0.35, dur: 1.2}, {at: 146.0, s: 'bass-hit', v: 0.4},
  {at: 146.5, s: 'soft-whoosh', v: 0.35, dur: 1}, {at: 150.2, s: 'sfx/swish', v: 0.4}, ...chipCues([151.1, 153.3, 154.8]),
  {at: 157.8, s: 'soft-whoosh', v: 0.35, dur: 1}, ...rep(160.8, 7, 0.1, 'sfx/pop', 0.16), ...rep(161.6, 7, 0.43, 'sfx/click', 0.12), {at: 165.2, s: 'sfx/pop', v: 0.35}, {at: 166.6, s: 'sfx/click', v: 0.55}, {at: 166.7, s: 'validation', v: 0.4}, {at: 169.2, s: 'tampon', v: 0.35}, {at: 170.5, s: 'bass-hit', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
export const MissionsMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.8} to={15.7}><Intro /></Gate>
    <Gate from={18.9} to={30.7}><M1 /></Gate>
    <Gate from={30.5} to={44.0}><M2 /></Gate>
    <Gate from={47.2} to={61.0}><M3 /></Gate>
    <Gate from={60.8} to={74.7}><M4 /></Gate>
    <Gate from={77.9} to={92.5}><M5 /></Gate>
    <Gate from={92.3} to={110.6}><M6 /></Gate>
    <Gate from={113.2} to={131.8}><M7 /></Gate>
    <Gate from={135.0} to={OUTRO_AT}><Final /></Gate>
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-missions-metro-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn];
