import React from 'react';
import type {LucideIcon} from 'lucide-react';
import {ArrowRight, Award, BadgeCheck, BookOpen, Briefcase, CalendarClock, CalendarDays, ChartColumn, ChartNoAxesCombined, Check as LCheck, CircleCheckBig, CircleX, ClipboardCheck, ClipboardList, Factory, FileText, FireExtinguisher, FolderOpen, Footprints, Gauge, Gavel, Glasses, Globe, GraduationCap, Hand, HardHat, Layers, Leaf, ListChecks, Lock, Network, PenLine, Recycle, RefreshCw, Scale, ScrollText, Search, Settings2, ShieldAlert, ShieldCheck, Target, TriangleAlert, UserCheck, Users, Workflow, Wrench} from 'lucide-react';
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
import {captions} from '../programmeQhse/captions';
import {NeoCaptions} from '../components/NeoCaptions';

/**
 * « Formation responsable QHSE — programme en 8 semaines » (voix d'origine, 4 min 46) — capsule « condensé + effet
 * wahou + ultra premium » présentée en métro : les 8 semaines sont les 8 stations. Tube de verre à six guichets adapté
 * au contenu : enjeux → qualité → sécurité → environnement → audit → inscription ; la capsule file d'un guichet à
 * l'autre (gyrophare ×3, loupe, store vénitien, capsule pneumatique). Intro papier : piliers Q-S-S-E qui montent,
 * compétences attendues, normes barrées « pas simplement connaître », ligne de métro des savoir-faire. Programme
 * détaillé dans le motion design de la vidéo de référence (calendrier sombre « 28-Day Course ») : barre de recherche
 * qui ouvre le programme, vue d'ensemble du tableau puis plongée dans la semaine 1, cartes-modules numérotées, la
 * surbrillance voyage de module en module au rythme de la voix et remplit chaque carte de la couleur de la semaine,
 * défilement caméra avec flou de bougé, volets « SEMAINE N » en palettes, cartes-loupes (FLIP) : trio ISO, 5 pourquoi
 * / Ishikawa / Pareto, rouleaux-prismes APR · AMDEC · HAZOP (reprise du film « 15 méthodes »), cadenas LOTO + EPI,
 * scopes 1-2-3, roue PDCA, diplôme ; recul final sur le tableau complet, publics visés, bouton d'appel jaune.
 * Sous-titres NeoCaptions sur la voix d'origine (transcription locale corrigée), sans musique, bruitage discret.
 */
const IMG = {
  cover: 'sysqsse-gen/couverture.jpg',
  c1: 'sysqsse-gen/couverture.jpg',
  c2: 'principes-gen/piliers.jpg',
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
const OUTRO_AT = 286.3;
export const PROGRAMME_QHSE_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '1', title: 'Enjeux du métier', s: 'risques · performance · conformité', c: ORANGE, g: 'enjeux', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 33.0, n: '2', title: 'Fondamentaux & qualité', s: 'semaines 1 · 2', c: '#21A69A', g: 'qualité', k: 'gyro', lab: 'GUICHET 2 / 6'},
  {at: 95.74, n: '3', title: 'Santé-sécurité & terrain', s: 'semaines 3 · 4', c: '#E2574C', g: 'sécurité', k: 'loupe', lab: 'GUICHET 3 / 6'},
  {at: 149.42, n: '4', title: 'Environnement & conformité', s: 'semaines 5 · 6', c: '#3BAF5C', g: 'environnement', k: 'store', lab: 'GUICHET 4 / 6'},
  {at: 200.48, n: '5', title: 'Audit & leadership', s: 'semaines 7 · 8', c: VIO, g: 'audit', k: 'tube', lab: 'GUICHET 5 / 6'},
  {at: 250.17, n: '6', title: 'Inscription', s: 'publics · contact', c: GOLD, g: 'inscription', k: 'gyro', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 283.5;
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
  {n: 1, l: 'Semaine 1 — Fondamentaux du management QHSE', s: 'fondamentaux', at: 41.72},
  {n: 2, l: 'Semaine 2 — Management de la qualité', s: 'qualité', at: 67.0},
  {n: 3, l: 'Semaine 3 — Santé et sécurité au travail', s: 'santé-sécurité', at: 95.74},
  {n: 4, l: 'Semaine 4 — Maîtrise opérationnelle & urgences', s: 'terrain', at: 120.13},
  {n: 5, l: 'Semaine 5 — Management environnemental', s: 'environnement', at: 149.42},
  {n: 6, l: 'Semaine 6 — Conformité réglementaire & risques', s: 'conformité', at: 172.34},
  {n: 7, l: 'Semaine 7 — Audit & pilotage de la performance', s: 'audit', at: 200.48},
  {n: 8, l: 'Semaine 8 — Leadership QHSE & mise en situation', s: 'leadership', at: 226.99},
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
      {STATIONS.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: sx(k) - 56, width: 112, top: 62, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 14, color: k === cur ? BURG : DIM}}>{x.s}</div>)}
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE FORMATION QHSE · STATION {r.n} / 8</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 820, overflow: 'hidden', clipPath: 'polygon(0 0, 60% 0, 40% 100%, 0 100%)', transform: `scale(${1 + t * 0.02})`}}><Pic src={IMG.c1} ic="danger" w={1080} h={820} pos="30% 50%" /></div>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 820, overflow: 'hidden', clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 40% 100%)', transform: `scale(${1 + t * 0.02})`}}><Pic src={IMG.c2} ic="usine" w={1080} h={820} pos="70% 40%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 24%, ${PAPER}CC 32%, ${PAPER} 37%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 24}}><PhotoLetterAnim ch="8" src={IMG.c2} size={320} ls={2} seed={3} /><div style={{paddingBottom: 40}}><PhotoLetterAnim ch="SEMAINES" src={IMG.c1} size={118} ls={2} seed={6} /></div></Abs>
      <Abs x={0} y={900} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb(NBK, 6), color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 52, padding: '6px 26px', transform: `rotate(-3deg) scale(${1 + 0.02 * Math.sin(t * 4)})`}}>formation <span style={{color: YEL}}>responsable QHSE</span></div></Abs>
      <Abs x={0} y={1030} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 4, color: DIM}}>MANAGEMENT INTÉGRÉ · PROGRAMME DÉTAILLÉ</div></Abs>
      <Abs x={40} y={1200} w={1000} style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10}}>{[['QUALITÉ', TEAL], ['SANTÉ-SÉCURITÉ', RED], ['ENVIRONNEMENT', GREEN], ['AUDIT', VIO]].map(([n, c], k) => <div key={n} style={{...nb(c, 4), padding: '6px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', transform: `translateY(${(1 - Math.min(1, spring(t, 0.3 + k * 0.08))) * 60}px)`}}>{n}</div>)}</Abs>
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






/* Icônes au trait (lucide, esprit iconoir) pour une écriture « cabinet international » ; repli sur Fluent si absent. */
const LUC: Record<string, LucideIcon> = {UserCheck, Network, BookOpen, Workflow, Search, FileText, CircleX, ChartColumn, FolderOpen, HardHat, TriangleAlert, Target, ClipboardList, ScrollText, Lock, ShieldAlert, FireExtinguisher, Wrench, Leaf, Factory, Scale, Recycle, Gavel, ShieldCheck, Globe, Layers, BadgeCheck, CalendarDays, PenLine, Gauge, RefreshCw, CalendarClock, ListChecks, Settings2, Award, GraduationCap, Briefcase, Users, ClipboardCheck, ChartNoAxesCombined, Glasses, Hand, Footprints, Check: LCheck, CircleCheckBig,
  'agent-hse': UserCheck, danger: TriangleAlert, graphique: ChartNoAxesCombined, check: BadgeCheck, loupe: Search, chantier: HardHat, auditeur: ClipboardCheck, engrenage: Settings2, livres: BookOpen, outils: Wrench, dossier: FolderOpen};
const Ico: React.FC<{n: string; size: number; c?: string}> = ({n, size, c = INK}) => { const L = LUC[n]; return L ? <L size={size} color={c} strokeWidth={1.9} /> : <F n={n} size={size} />; };

/* ═════════════ Outils propres à la capsule « 15 méthodes » ═════════════ */
const cl = (v: number) => Math.max(0, Math.min(1, v));
const sp = (t: number, a: number, k = 8, w = 13) => (t < a ? 0 : Math.max(0, spring(t, a, k, w)));
const hexMix = (a: string, b: string, k: number) => {
  const pa = [1, 3, 5].map((j) => parseInt(a.slice(j, j + 2), 16)), pb = [1, 3, 5].map((j) => parseInt(b.slice(j, j + 2), 16));
  return `rgb(${pa.map((v, j) => Math.round(v + (pb[j] - v) * Math.max(0, Math.min(1, k)))).join(',')})`;
};
const lin = (v: number) => v;
const ACR = ['HAZID', 'APR', 'HAZOP', 'AMDEC', 'WHAT IF', 'SWIFT', 'JSA · AST', 'FTA', 'ETA', 'BOW-TIE', 'MOSAR', 'HACCP', 'LOPA', 'QRA', 'HRA'];
const MC = [ORANGE, ORANGE, BLUE, BLUE, VIO, VIO, VIO, TEAL, TEAL, TEAL, NAVY, NAVY, NAVY, GREEN, GREEN];
const ICO = ['loupe', 'clipboard', 'engrenage', 'outils', 'question', 'classeur', 'casque', 'arbre', 'feu', 'ruban', 'usine', 'pasteque', 'bouclier', 'graphique', 'cerveau'];

/** Rouleau-prisme des 15 sigles : il défile en flou de bougé puis s'arrête net sur la méthode annoncée (cadre noir, triangles jaunes). */
const Drum: React.FC<{n: number; at: number; y?: number}> = ({n, at, y = 430}) => {
  const t = useT();
  const N = ACR.length;
  const target = n - 1;
  const start = target - 24;
  const D = 1.7;
  const q = prog(t, at, at + D, lin);
  const e = 1 - Math.pow(1 - q, 3);
  const k = (t - at - D) / 0.45;
  const over = q >= 1 && k < 1 ? Math.sin(k * Math.PI) * 0.1 : 0;
  const pos = start + (target - start) * e - over;
  const speed = q < 1 ? ((target - start) * 3 * Math.pow(1 - q, 2)) / D : 0;
  const blur = Math.min(7, speed * 0.22);
  const W = 860, H = 300, IH = 118;
  const app = sp(t, at - 0.35);
  const land = q >= 1 ? Math.max(0, 1 - (t - at - D) * 2.2) : 0;
  const items: React.ReactNode[] = [];
  for (let i = Math.floor(pos) - 2; i <= Math.floor(pos) + 3; i++) {
    const rel = i - pos;
    const ang = rel * 0.62;
    if (Math.abs(ang) > 1.5) continue;
    const yy = Math.sin(ang) * H * 0.56;
    const sc = Math.max(0.02, Math.cos(ang));
    const idx = ((i % N) + N) % N;
    const on = idx === target && Math.abs(rel) < 0.5 && q > 0.9;
    items.push(
      <div key={i} style={{position: 'absolute', left: 0, right: 0, top: H / 2 - IH / 2 + yy, height: IH, transform: `scaleY(${sc})`, opacity: 0.25 + 0.75 * sc, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, background: on ? '#FFFDF3' : 'linear-gradient(180deg, #FFFFFF, #EEF0F4)', borderTop: '3px solid #D5D9E0', borderBottom: '3px solid #D5D9E0', filter: blur > 0.3 ? `blur(${blur}px)` : undefined}}>
        <span style={{fontFamily: MONO, fontWeight: 700, fontSize: 34, color: on ? MC[idx] : '#9AA3B2'}}>{String(idx + 1).padStart(2, '0')}</span>
        <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: ACR[idx].length > 7 ? 80 : 96, color: on ? MC[idx] : NBK, letterSpacing: 2}}>{ACR[idx]}</span>
      </div>,
    );
  }
  return (
    <Abs x={(1080 - W) / 2} y={y} w={W} h={H} style={{transform: `scale(${app * (1 + land * 0.04)})`}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: 26, background: '#fff', border: `12px solid ${NBK}`, boxShadow: `10px 12px 0 ${MC[target]}`, overflow: 'hidden'}}>
        {items}
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,12,20,0.55) 0%, rgba(10,12,20,0) 30%, rgba(10,12,20,0) 70%, rgba(10,12,20,0.55) 100%)'}} />
        {land > 0 && <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle, ${MC[target]}55, transparent 70%)`, opacity: land}} />}
      </div>
      {[0, 1].map((s) => <div key={s} style={{position: 'absolute', top: H / 2 - 34, [s ? 'right' : 'left']: -58, width: 0, height: 0, borderTop: '34px solid transparent', borderBottom: '34px solid transparent', [s ? 'borderRight' : 'borderLeft']: `52px solid ${YEL}`, filter: `drop-shadow(0 0 0 ${NBK}) drop-shadow(3px 3px 0 ${NBK})`}} />)}
    </Abs>
  );
};

/** Mot à initiales repérées : « [Haz]ard » → « Haz » en couleur et souligné. */
const Marked: React.FC<{w: string; c: string}> = ({w, c}) => {
  const parts = w.split(/(\[[^\]]+\])/).filter(Boolean);
  return <>{parts.map((p, k) => (p.startsWith('[') ? <span key={k} style={{color: c, textDecoration: 'underline', textDecorationThickness: 6, textUnderlineOffset: 6}}>{p.slice(1, -1)}</span> : <span key={k}>{p}</span>))}</>;
};

/** Annonce d'une méthode : rouleau → « MÉTHODE n / 15 » → sigle déployé mot à mot → traduction manuscrite. Se replie ensuite en badge. */
const Announce: React.FC<{n: number; at: number; end: number; en: [string, number][]; fr?: string; frAt?: number}> = ({n, at, end, en, fr, frAt = 0}) => {
  const t = useT();
  const c = MC[n - 1];
  const fold = prog(t, end - 0.45, end, easeInOut);
  if (fold >= 1) return null;
  return (
    <AbsoluteFill style={{transformOrigin: '90px 390px', transform: `scale(${1 - fold * 0.85})`, opacity: 1 - fold}}>
      <Drum n={n} at={at} />
      <Abs x={0} y={760} w={1080} style={{display: 'flex', justifyContent: 'center', opacity: pop(t, at + 1.5)}}>
        <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 6, color: '#fff', background: NBK, padding: '8px 22px', borderRadius: 10}}>MÉTHODE {String(n).padStart(2, '0')} / 15</div>
      </Abs>
      <Abs x={50} y={840} w={980} style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: 16, rowGap: 4, fontFamily: sansFont, fontWeight: 900, fontSize: en.length > 6 ? 46 : 58, lineHeight: 1.2, color: INK}}>
        {en.map(([w, wa], k) => <span key={k} style={{opacity: t > wa ? 1 : 0.08, transform: `translateY(${(1 - cl((t - wa) / 0.25)) * 16}px)`, display: 'inline-block'}}><Marked w={w} c={c} /></span>)}
      </Abs>
      {fr && t > frAt && (
        <Abs x={60} y={en.length > 6 ? 1040 : 1000} w={960} style={{textAlign: 'center'}}>
          <div style={{display: 'inline-block', position: 'relative', fontFamily: handFont, fontSize: fr.length > 40 ? 50 : 62, color: c, clipPath: `inset(0 ${(1 - prog(t, frAt, frAt + 0.9, easeOut)) * 100}% 0 0)`}}>
            {fr}
            <div style={{position: 'absolute', left: 0, right: 0, bottom: -6, height: 8, borderRadius: 4, background: YEL, opacity: 0.7, transform: `scaleX(${prog(t, frAt + 0.6, frAt + 1.2, easeOut)})`, transformOrigin: '0 50%'}} />
          </div>
        </Abs>
      )}
    </AbsoluteFill>
  );
};

/** Badge permanent de la méthode en cours (coin haut gauche). */
const MBadge: React.FC<{n: number; from: number}> = ({n, from}) => {
  const t = useT();
  if (t < from) return null;
  const c = MC[n - 1];
  const q = sp(t, from);
  return (
    <Abs x={36} y={398} w={420} h={62} style={{transform: `scale(${q})`, transformOrigin: '0 50%', display: 'flex', alignItems: 'center', gap: 10, zIndex: 20}}>
      <div style={{height: 56, minWidth: 56, borderRadius: 14, background: c, border: `4px solid ${NBK}`, boxShadow: `4px 4px 0 ${NBK}`, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box'}}>{String(n).padStart(2, '0')}</div>
      <div style={{height: 56, borderRadius: 14, background: '#fff', border: `4px solid ${NBK}`, boxShadow: `4px 4px 0 ${c}`, padding: '0 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: NBK, display: 'flex', alignItems: 'center', boxSizing: 'border-box', letterSpacing: 1}}>{ACR[n - 1]}</div>
    </Abs>
  );
};

type ST = [string, number, string?];
/** Schéma en ligne de métro verticale : chaque étape est une station, la capsule descend au rythme de la voix. */
const RailSteps: React.FC<{items: ST[]; c: string; y: number; h: number; at: number; fs?: number}> = ({items, c, y, h, at, fs = 42}) => {
  const t = useT();
  const n = items.length;
  const gap = h / n;
  const cur = items.reduce((a, x, k) => (t >= x[1] - 0.1 ? k : a), -1);
  const prev = Math.max(0, cur - 1);
  const mv = cur < 0 ? 0 : prog(t, items[cur][1] - 0.1, items[cur][1] + 0.4, easeInOut);
  const cy = cur < 0 ? 0 : lerp(prev * gap, cur * gap, cur === 0 ? 1 : mv) + gap / 2;
  const line = prog(t, at, at + 0.6, easeOut);
  return (
    <Abs x={60} y={y} w={960} h={h}>
      <div style={{position: 'absolute', left: 64, top: gap / 2, width: 14, height: (h - gap) * line, borderRadius: 7, background: `linear-gradient(180deg, ${c}, ${hexMix(c, '#ffffff', 0.45)})`, border: `3px solid ${NBK}`}} />
      {items.map(([l, a, ic], k) => {
        const on = t >= a - 0.1;
        const here = k === cur;
        const q = sp(t, a - 0.1);
        return (
          <div key={k} style={{position: 'absolute', left: 0, top: k * gap, height: gap, width: 960, display: 'flex', alignItems: 'center'}}>
            <div style={{position: 'absolute', left: 48, width: 46, height: 46, borderRadius: 23, background: on ? (here ? c : GREEN) : '#fff', border: `5px solid ${NBK}`, boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: here ? `0 0 0 8px ${c}44` : 'none'}}>{on && !here ? '✓' : k + 1}</div>
            <div style={{position: 'absolute', left: 130, right: 10, height: Math.min(gap - 18, 110), ...nb(here ? '#fff' : on ? '#F7FAF7' : '#fff', here ? 7 : 4), borderColor: here ? c : NBK, display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px', opacity: q, transform: `translateX(${(1 - q) * 120}px) scale(${here ? 1.03 : 1})`, transformOrigin: '0 50%'}}>
              {ic && <Ico n={ic} c={here ? c : INK} size={Math.min(64, gap - 46)} />}
              <span style={{fontFamily: sansFont, fontWeight: 800, fontSize: l.length > 34 ? fs - 6 : fs, color: here ? c : INK, lineHeight: 1.1, letterSpacing: -0.3}}>{l}</span>
            </div>
          </div>
        );
      })}
      {cur >= 0 && <div style={{position: 'absolute', left: 71 - 18, top: cy - 30, transform: 'rotate(90deg)'}}><Capsule w={60} c={c} /></div>}
    </Abs>
  );
};

/** Schéma en escalier : chaque marche s'empile en décalé, un casque saute de marche en marche. */
const StairSteps: React.FC<{items: ST[]; c: string; y: number; h: number; fs?: number}> = ({items, c, y, h, fs = 32}) => {
  const t = useT();
  const n = items.length;
  const gh = h / n;
  const step = (960 - 560) / Math.max(1, n - 1);
  const cur = items.reduce((a, x, k) => (t >= x[1] - 0.1 ? k : a), -1);
  const hop = cur < 0 ? 0 : prog(t, items[cur][1] - 0.1, items[cur][1] + 0.35, lin);
  const px = (k: number) => 60 + k * step + 40;
  const py = (k: number) => y + k * gh - 64;
  const hx = cur <= 0 ? px(Math.max(0, cur)) : lerp(px(cur - 1), px(cur), hop);
  const hy = cur <= 0 ? py(0) : lerp(py(cur - 1), py(cur), hop) - Math.sin(hop * Math.PI) * 70;
  return (
    <>
      {items.map(([l, a, ic], k) => {
        const q = sp(t, a - 0.1);
        const on = k <= cur;
        return (
          <Abs key={k} x={60 + k * step} y={y + k * gh} w={560} h={gh - 14} style={{...nb(on ? (k === cur ? c : '#fff') : '#fff', 6), borderColor: NBK, display: 'flex', alignItems: 'center', gap: 14, padding: '0 18px', opacity: q, transform: `translateY(${(1 - q) * -80}px)`}}>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 28, color: k === cur ? '#fff' : c}}>{String(k + 1).padStart(2, '0')}</div>
            {ic && <Ico n={ic} c={k === cur ? '#fff' : c} size={Math.min(56, gh - 40)} />}
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: l.length > 26 ? fs - 5 : fs, color: k === cur ? '#fff' : INK, lineHeight: 1.05}}>{l}</div>
          </Abs>
        );
      })}
      {cur >= 0 && <Abs x={hx + 380} y={hy} w={90} h={90}><F n="casque" size={84} /></Abs>}
    </>
  );
};

/** Schéma en zigzag : cartes alternées gauche / droite reliées par des flèches qui se tracent. */
const ZigSteps: React.FC<{items: ST[]; c: string; y: number; h: number; fs?: number}> = ({items, c, y, h, fs = 38}) => {
  const t = useT();
  const n = items.length;
  const gh = h / n;
  return (
    <>
      <svg width={1080} height={h + 40} style={{position: 'absolute', left: 0, top: y}}>
        {items.slice(1).map(([, a], k) => { const L = k % 2 === 0; const y0 = k * gh + gh * 0.5; const y1 = (k + 1) * gh + gh * 0.5; const p = prog(t, a - 0.5, a - 0.05, easeOut); return <path key={k} d={L ? `M 470 ${y0} C 600 ${y0}, 640 ${y1}, 610 ${y1}` : `M 610 ${y0} C 480 ${y0}, 440 ${y1}, 470 ${y1}`} fill="none" stroke={c} strokeWidth={9} strokeLinecap="round" pathLength={1} strokeDasharray={`${p} 1`} opacity={p > 0.01 ? 1 : 0} />; })}
      </svg>
      {items.map(([l, a, ic], k) => {
        const L = k % 2 === 0;
        const q = sp(t, a - 0.1);
        return (
          <Abs key={k} x={L ? 60 : 520} y={y + k * gh + 6} w={500} h={gh - 12} style={{...nb('#fff', 7), borderColor: c, display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px', opacity: q, transform: `translateX(${(1 - q) * (L ? -200 : 200)}px) rotate(${(1 - q) * (L ? -8 : 8)}deg)`}}>
            {ic && <Ico n={ic} c={c} size={Math.min(66, gh - 46)} />}
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: l.length > 22 ? fs - 6 : fs, color: INK, lineHeight: 1.05}}>{l}</div>
          </Abs>
        );
      })}
    </>
  );
};

/** Point chaud sur photo : onde qui pulse + étiquette reliée par un trait. */
const Hot: React.FC<{x: number; y: number; at: number; l: string; c: string; dx?: number; dy?: number; ic?: string}> = ({x, y, at, l, c, dx = 60, dy = -70, ic}) => {
  const t = useT();
  if (t < at) return null;
  const q = sp(t, at);
  const ring = ((t - at) * 1.2) % 1;
  return (
    <>
      <div style={{position: 'absolute', left: x - 18, top: y - 18, width: 36, height: 36, borderRadius: 18, background: c, border: '5px solid #fff', boxShadow: `0 0 0 4px ${NBK}`, transform: `scale(${q})`}} />
      <div style={{position: 'absolute', left: x - 18 - ring * 40, top: y - 18 - ring * 40, width: 36 + ring * 80, height: 36 + ring * 80, borderRadius: '50%', border: `5px solid ${c}`, opacity: 1 - ring}} />
      <svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}} width={1} height={1}><line x1={x} y1={y} x2={x + dx * q} y2={y + dy * q} stroke={NBK} strokeWidth={5} /></svg>
      <div style={{position: 'absolute', left: x + dx + (dx < 0 ? -10 : 0), top: y + dy - 28, transform: `translateX(${dx < 0 ? '-100%' : '0'}) scale(${q})`, transformOrigin: dx < 0 ? '100% 50%' : '0 50%', ...nb('#fff', 5), borderColor: c, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK}}>{ic && <F n={ic} size={36} />}{l}</div>
    </>
  );
};

/** Bulle de question tapée lettre à lettre (« Que se passerait-il si… »). */
const QBubble: React.FC<{at: number; text: string; x: number; y: number; w: number; c: string; side?: 'l' | 'r'; dur?: number; fs?: number}> = ({at, text, x, y, w, c, side = 'l', dur = 1.4, fs = 34}) => {
  const t = useT();
  if (t < at) return null;
  const q = sp(t, at);
  const nch = Math.floor(text.length * prog(t, at + 0.1, at + dur, lin));
  return (
    <Abs x={x} y={y} w={w} style={{transform: `scale(${q})`, transformOrigin: side === 'l' ? '0 100%' : '100% 100%'}}>
      <div style={{position: 'relative', ...nb('#fff', 6), borderColor: c, borderRadius: 28, padding: '18px 24px', fontFamily: sansFont, fontWeight: 800, fontSize: fs, lineHeight: 1.2, color: INK}}>
        {text.slice(0, nch)}<span style={{opacity: nch < text.length && Math.floor(t * 4) % 2 ? 1 : 0, color: c}}>▌</span>
        <div style={{position: 'absolute', bottom: -26, [side === 'l' ? 'left' : 'right']: 40, width: 0, height: 0, borderLeft: '18px solid transparent', borderRight: '18px solid transparent', borderTop: `26px solid ${c}`}} />
      </div>
    </Abs>
  );
};

/** Grille des 15 méthodes : tuiles qui se retournent en cascade ; `hi` met certaines tuiles en avant. */
const Grid15: React.FC<{at: number; y: number; x?: number; hi?: (k: number, t: number) => number; dim?: number; check?: (k: number, t: number) => boolean}> = ({at, y, x = 60, hi, dim = 0, check}) => {
  const t = useT();
  return (
    <Abs x={x} y={y} w={960} h={600}>
      {ACR.map((a, k) => {
        const col = k % 5, row = Math.floor(k / 5);
        const d = at + (col + row) * 0.07;
        const f = prog(t, d, d + 0.45, easeOut);
        const h = hi ? hi(k, t) : 0;
        const ok = check ? check(k, t) : false;
        return (
          <div key={k} style={{position: 'absolute', left: col * 192, top: row * 196, width: 178, height: 180, perspective: 900}}>
            <div style={{width: '100%', height: '100%', transform: `rotateY(${(1 - f) * 180}deg) scale(${1 + h * 0.08})`, opacity: f > 0.5 ? 1 - dim * (1 - h) : 0, ...nb(h > 0.5 ? MC[k] : '#fff', 5), borderColor: NBK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: h > 0.5 ? `0 0 26px ${MC[k]}, 5px 5px 0 ${NBK}` : `5px 5px 0 ${NBK}`}}>
              <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: h > 0.5 ? '#fff' : MC[k]}}>{String(k + 1).padStart(2, '0')}</div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: a.length > 7 ? 26 : a.length > 5 ? 32 : 38, color: h > 0.5 ? '#fff' : NBK, textAlign: 'center', lineHeight: 1}}>{a}</div>
              {ok && <div style={{position: 'absolute', right: -12, top: -12, width: 48, height: 48, borderRadius: 24, background: GREEN, border: `4px solid ${NBK}`, color: '#fff', fontWeight: 900, fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>✓</div>}
            </div>
          </div>
        );
      })}
    </Abs>
  );
};

/** Transition « rame plein cadre » : la rame surgit du tunnel, fonce vers la caméra et ouvre la méthode suivante. */
const RameWipe: React.FC<{at: number; n: number}> = ({at, n}) => {
  const t = useT();
  const k = t - at;
  if (k < 0 || k > 1.5) return null;
  const z = prog(t, at, at + 1.0, easeIn);
  const fl = Math.max(0, 1 - Math.abs(k - 1.0) * 4);
  const bg = prog(t, at, at + 0.2) * (1 - prog(t, at + 1.05, at + 1.45, easeOut));
  return (
    <AbsoluteFill style={{zIndex: 36, pointerEvents: 'none'}}>
      <AbsoluteFill style={{opacity: bg, background: `radial-gradient(circle at 540px 860px, #1B2A4A 0%, ${NIGHT} 55%, #05070C 100%)`}} />
      <AbsoluteFill style={{opacity: bg}}>{Array.from({length: 28}, (_, j) => { const a = (j / 28) * Math.PI * 2 + j; const r0 = 80 + ((k * 900 + j * 97) % 700); return <div key={j} style={{position: 'absolute', left: 540 + Math.cos(a) * r0, top: 860 + Math.sin(a) * r0, width: 4 + (r0 / 700) * 10, height: 60 + r0 * 0.4, background: j % 3 ? '#7FB2FF' : '#fff', opacity: 0.55, borderRadius: 4, transform: `rotate(${(a * 180) / Math.PI + 90}deg)`, transformOrigin: '50% 0'}} />; })}</AbsoluteFill>
      <div style={{position: 'absolute', left: 540, top: 860, width: 700, height: 707, marginLeft: -350, marginTop: -353, transform: `scale(${lerp(0.08, 4.2, z)})`, opacity: bg}}><Img src={staticFile('metroiso-gen/metro/rame-face.png')} style={{width: 700, height: 707}} /></div>
      <Abs x={0} y={1180} w={1080} style={{textAlign: 'center', opacity: bg * (1 - z), fontFamily: MONO, fontWeight: 700, fontSize: 34, letterSpacing: 6, color: '#9CC6FF'}}>PROCHAINE STATION · {String(n).padStart(2, '0')}</Abs>
      <AbsoluteFill style={{background: '#fff', opacity: fl}} />
    </AbsoluteFill>
  );
};

/** Carte photo encadrée néo-brutale avec zoom lent (Ken Burns) et étiquette. */
const Photo: React.FC<{src: string; x: number; y: number; w: number; h: number; at: number; c: string; pos?: string; tag?: string; children?: React.ReactNode; z0?: number}> = ({src, x, y, w, h, at, c, pos = 'center', tag, children, z0 = 1.04}) => {
  const t = useT();
  const q = sp(t, at);
  return (
    <Abs x={x} y={y} w={w} h={h} style={{...nb('#fff', 8), borderColor: NBK, overflow: 'hidden', transform: `scale(${0.85 + 0.15 * q}) rotate(${(1 - q) * -4}deg)`, opacity: cl(q * 1.5)}}>
      <Img src={PH(src)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${z0 + (t - at) * 0.012})`}} />
      {children}
      {tag && <div style={{position: 'absolute', left: 18, top: 18}}><NBadge at={at + 0.3} text={tag} bg={c} rot={-2} size={26} /></div>}
    </Abs>
  );
};

/** Chariot élévateur dessiné (l'icône « chariot » du jeu Fluent est un caddie). */
const Forklift: React.FC<{s?: number}> = ({s = 1}) => (
  <svg width={150 * s} height={110 * s} viewBox="0 0 150 110">
    <rect x={18} y={42} width={74} height={44} rx={8} fill={YEL} stroke={NBK} strokeWidth={5} />
    <path d="M 34 42 L 40 14 L 76 14 L 80 42" fill="none" stroke={NBK} strokeWidth={5} />
    <rect x={96} y={4} width={10} height={86} fill="#5B6472" stroke={NBK} strokeWidth={3} />
    <rect x={104} y={78} width={44} height={8} fill="#5B6472" stroke={NBK} strokeWidth={3} />
    <circle cx={38} cy={92} r={13} fill={NBK} /><circle cx={80} cy={92} r={13} fill={NBK} />
    <circle cx={38} cy={92} r={5} fill="#C9D2DF" /><circle cx={80} cy={92} r={5} fill="#C9D2DF" />
  </svg>
);

/** Éclair de gyrophare rouge / bleu sur tout l'écran (0,9 s). */
const GyroFlash: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  const q = (t - at) / 0.9;
  if (q < 0 || q > 1) return null;
  const a = Math.sin(q * Math.PI);
  return <AbsoluteFill style={{zIndex: 70, pointerEvents: 'none', opacity: a * 0.6, background: `radial-gradient(circle at ${50 + 45 * Math.cos(q * 12)}% 10%, rgba(224,56,62,0.85), transparent 45%), radial-gradient(circle at ${50 - 45 * Math.cos(q * 12)}% 10%, rgba(31,111,209,0.85), transparent 45%)`}} />;
};

const wn = (t: number, a: number, b: number, f = 0.35) => prog(t, a, a + f) * (1 - prog(t, b - f, b));
/* Typographie « cabinet » : titres Montserrat 800, corps 600-700, étiquettes en petites capitales espacées. */
const CAP: React.CSSProperties = {fontFamily: MONO, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase'};
const GH = (props: {x: number; y: number; w: number; h: number; at: number; ic: string; l: string; c: string; fs?: number; sub?: string}) => {
  const t = useT();
  const {x, y, w, h, at, ic, l, c, fs = 32, sub} = props;
  if (t < at - 0.05) return null;
  const q = sp(t, at);
  return (
    <Abs x={x} y={y} w={w} h={h} style={{...nb('#fff', 6), borderColor: NBK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, transform: `scale(${0.7 + 0.3 * q}) translateY(${(1 - q) * 30}px)`, opacity: cl(q * 1.4), textAlign: 'center', padding: 14, boxSizing: 'border-box'}}>
      <div style={{width: Math.min(110, h * 0.36), height: Math.min(110, h * 0.36), borderRadius: 18, background: `${c}18`, border: `2px solid ${c}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n={ic} size={Math.min(64, h * 0.22)} c={c} /></div>
      <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: fs, color: INK, lineHeight: 1.08, letterSpacing: -0.3}}>{l}</div>
      {sub && <div style={{fontFamily: sansFont, fontWeight: 600, fontSize: fs * 0.66, color: DIM, lineHeight: 1.2}}>{sub}</div>}
    </Abs>
  );
};

/* ═════════════ Tableau du programme — motion design de la vidéo de référence (calendrier : surbrillance qui voyage et remplit), décliné dans le thème clair des premières pages ═════════════ */
type MOD = [string, number, string];
type WK = {n: number; at: number; th: string; c: string; obj: string; img: string; m: MOD[]};
const WEEKS: WK[] = [
  {n: 1, at: 41.72, th: 'Fondamentaux du management QHSE', c: '#C8930A', obj: 'Comprendre la fonction et les systèmes de management', img: 'sysqsse-gen/couverture.jpg', m: [['Métier de responsable QHSE', 50.37, 'UserCheck'], ['Fondamentaux du management intégré', 55.29, 'Network'], ['Normes ISO 9001 · 14001 · 45001', 58.62, 'BookOpen'], ['Approche processus et cartographie', 62.21, 'Workflow']]},
  {n: 2, at: 67.0, th: 'Management de la qualité', c: '#138A80', obj: 'Déployer et améliorer un système de management de la qualité', img: 'sysqsse-gen/qualite.jpg', m: [['ISO 9001 : interprétation des exigences', 76.45, 'Search'], ['Gestion documentaire', 78.42, 'FileText'], ['Non-conformités et actions correctives', 83.55, 'CircleX'], ['5 pourquoi, Ishikawa, Pareto', 87.24, 'ChartColumn'], ['Étude de cas : système qualité', 91.66, 'FolderOpen']]},
  {n: 3, at: 95.74, th: 'Santé et sécurité au travail', c: '#C9543B', obj: 'Prévenir les accidents et maîtriser les risques professionnels', img: 'sysqsse-gen/sante.jpg', m: [['ISO 45001 : interprétation des exigences', 106.42, 'HardHat'], ['Identification des dangers et évaluation des risques', 108.86, 'TriangleAlert'], ['Analyse des risques : APR, AMDEC, HAZOP', 114.01, 'Target'], ["DUERP et plan d'action de prévention", 117.23, 'ClipboardList']]},
  {n: 4, at: 120.13, th: 'Maîtrise opérationnelle et gestion des urgences', c: '#B83A30', obj: 'Déployer les mesures de prévention sur le terrain', img: 'rhse-gen/casque-extincteur.jpg', m: [['Permis de travail', 130.7, 'ScrollText'], ['Consignation LOTO et gestion des EPI', 132.6, 'Lock'], ['Accidents et enquêtes : arbre des causes, ICAM', 135.47, 'ShieldAlert'], ['POI, incendie et organisation des secours', 139.53, 'FireExtinguisher'], ['Exercice pratique : analyse et prévention', 145.45, 'Wrench']]},
  {n: 5, at: 149.42, th: 'Management environnemental', c: '#2E8B4A', obj: 'Identifier et maîtriser les impacts environnementaux', img: 'sysqsse-gen/environnement.jpg', m: [['ISO 14001 : interprétation des exigences', 159.51, 'Leaf'], ['Aspects et impacts environnementaux', 162.6, 'Factory'], ['Aspects environnementaux significatifs', 166.85, 'Scale'], ['Déchets, effluents et rejets industriels', 169.93, 'Recycle']]},
  {n: 6, at: 172.34, th: 'Conformité réglementaire et management des risques', c: '#2C6FD1', obj: 'Maîtriser les obligations réglementaires et anticiper les risques', img: 'principes-gen/conformite.jpg', m: [['Veille réglementaire et évaluation de la conformité', 185.17, 'Gavel'], ['Management des risques selon ISO 31000', 188.7, 'ShieldCheck'], ['Bilan carbone et GHG Protocol', 190.6, 'Globe'], ['Scopes 1, 2 et 3', 194.2, 'Layers'], ['Étude de cas environnemental', 196.74, 'FolderOpen']]},
  {n: 7, at: 200.48, th: 'Audit et pilotage de la performance QHSE', c: '#6A4FD0', obj: "Évaluer l'efficacité des systèmes de management", img: 'audit13-gen/tableau-bord.jpg', m: [["ISO 19011 : principes et méthode d'audit", 211.37, 'BadgeCheck'], ["Préparation et planification de l'audit interne", 213.81, 'CalendarDays'], ['Réalisation et rédaction des constats', 217.94, 'PenLine'], ['Indicateurs QHSE et tableau de bord', 221.3, 'Gauge'], ['Revue de direction et amélioration continue', 223.96, 'RefreshCw']]},
  {n: 8, at: 226.99, th: 'Leadership QHSE et mise en situation', c: '#1F3A68', obj: "Développer les capacités de pilotage d'une fonction QHSE", img: 'premier-gen/certification.jpg', m: [['Programme QHSE annuel', 238.64, 'CalendarClock'], ["Plan d'action et allocation des ressources", 241.1, 'ListChecks'], ["Étude de cas : conception d'un SMI", 244.68, 'Settings2'], ['Évaluation finale', 249.35, 'Award']]},
];
const NUM0 = WEEKS.map((_, k) => WEEKS.slice(0, k).reduce((a, w) => a + w.m.length, 0));
const SEC = 464, CW = 230, CH = 170, GAPC = 13.3, HH = 64;
const cardRect = (k: number, j: number) => ({x: (j % 4) * (CW + GAPC), y: k * SEC + HH + 12 + Math.floor(j / 4) * (CH + 14)});
const wkAt = (t: number) => WEEKS.reduce((a, w, k) => (t >= w.at - 0.05 ? k : a), 0);
const SCROLL: [number, number][] = [[42.0, 0], [69.5, 1], [99.2, 2], [123.0, 3], [152.9, 4], [175.2, 5], [204.0, 6], [229.6, 7]];
const rgba = (hex: string, a: number) => `rgba(${parseInt(hex.slice(1, 3), 16)},${parseInt(hex.slice(3, 5), 16)},${parseInt(hex.slice(5, 7), 16)},${a})`;
/** Caméra : vue d'ensemble → plongée dans la semaine 1 → défilement de semaine en semaine (flou de bougé) → recul final. */
const boardCam = (t: number) => {
  const OV = {x: 420, y: 430, s: 0.25};
  if (t < 41.9) return {...OV, blur: 0};
  const zi = prog(t, 41.9, 43.2, easeInOut);
  if (t < 43.2) return {x: lerp(OV.x, 60, zi), y: lerp(OV.y, 430, zi), s: lerp(OV.s, 1, zi), blur: 0};
  let pos = 0;
  let blur = 0;
  for (const [a, k] of SCROLL) { if (k === 0) continue; const p = prog(t, a, a + 1.1, easeInOut); if (p > 0) { pos = k - 1 + p; blur = Math.sin(p * Math.PI) * 5; } }
  const cur = {x: 60, y: 430 - pos * SEC, s: 1};
  const zo = prog(t, 253.8, 255.4, easeInOut);
  if (zo > 0) return {x: lerp(cur.x, OV.x, zo), y: lerp(cur.y, OV.y, zo), s: lerp(1, OV.s, zo), blur: 0};
  return {...cur, blur};
};
const PBoard: React.FC = () => {
  const t = useT();
  const cam = boardCam(t);
  const ck = wkAt(t);
  const w = WEEKS[ck];
  const mi = w.m.reduce((a, x, j) => (t >= x[1] - 0.05 ? j : a), -1);
  const pj = Math.max(0, mi - 1);
  const mv = mi < 0 ? 0 : prog(t, w.m[mi][1] - 0.05, w.m[mi][1] + 0.3, easeInOut);
  const r0 = cardRect(ck, pj), r1 = cardRect(ck, Math.max(0, mi));
  const hl = {x: lerp(r0.x, r1.x, mi <= 0 ? 1 : mv), y: lerp(r0.y, r1.y, mi <= 0 ? 1 : mv)};
  const done = t >= 253.8;
  return (
    <div style={{position: 'absolute', left: cam.x, top: cam.y, width: 960, height: SEC * 8, transform: `scale(${cam.s})`, transformOrigin: '0 0', filter: cam.blur > 0.3 ? `blur(${cam.blur}px)` : undefined}}>
      {WEEKS.map((wk, k) => {
        const y0 = k * SEC;
        const passedW = t >= (WEEKS[k + 1]?.at ?? 253.8) || done;
        return (
          <React.Fragment key={k}>
            <div style={{position: 'absolute', left: 0, top: y0, width: 960, height: HH, borderRadius: 14, background: '#fff', border: `3px solid ${NBK}`, boxShadow: `5px 5px 0 ${wk.c}`, display: 'flex', alignItems: 'center', gap: 14, padding: '0 18px', boxSizing: 'border-box', overflow: 'hidden'}}>
              <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 10, background: wk.c}} />
              <div style={{marginLeft: 8, width: 38, height: 38, borderRadius: 10, background: passedW ? wk.c : '#fff', border: `2px solid ${wk.c}`, color: passedW ? '#fff' : wk.c, fontFamily: sansFont, fontWeight: 800, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{passedW ? <LCheck size={22} color="#fff" strokeWidth={3} /> : wk.n}</div>
              <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: INK, letterSpacing: -0.3, whiteSpace: 'nowrap'}}>Semaine {wk.n}</div>
              <div style={{width: 2, height: 30, background: '#D5DAE3'}} />
              <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 22, color: wk.c, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1}}>{wk.th}</div>
              <div style={{...CAP, fontSize: 15, color: DIM, background: '#F1F3F7', padding: '4px 10px', borderRadius: 8}}>S{wk.n} / 8</div>
            </div>
            {wk.m.map(([l, a, ic], j) => {
              const r = cardRect(k, j);
              const on = t >= a - 0.05 || done;
              const fill = done ? 1 : prog(t, a, a + 0.6, easeOut);
              const fin = k === 7 && j === wk.m.length - 1;
              const col = fin ? '#2E8B4A' : wk.c;
              const active = k === ck && j === mi && !done && t < (WEEKS[k + 1]?.at ?? 253.8);
              return (
                <div key={j} style={{position: 'absolute', left: r.x, top: r.y, width: CW, height: CH, borderRadius: 14, background: on ? rgba(col, 0.06 + 0.16 * fill) : '#fff', border: `3px solid ${on ? NBK : '#C9CFD9'}`, boxShadow: on ? `4px 4px 0 ${NBK}` : '3px 3px 0 #D5DAE3', boxSizing: 'border-box', padding: '12px 14px 10px', display: 'flex', flexDirection: 'column', gap: 8, overflow: 'hidden', transform: active ? `translateY(${-3 * Math.abs(Math.sin(t * 3))}px)` : undefined}}>
                  <div style={{position: 'absolute', left: 0, top: 0, height: 6, width: `${fill * 100}%`, background: col}} />
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2}}>
                    <div style={{width: 46, height: 46, borderRadius: 12, background: on ? '#fff' : '#F4F6FA', border: `2px solid ${on ? col : '#D5DAE3'}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n={ic} size={26} c={on ? col : '#9AA3B2'} /></div>
                    <span style={{...CAP, letterSpacing: 1, fontSize: 16, color: on ? col : '#A9B1BE'}}>{String(NUM0[k] + j + 1).padStart(2, '0')}</span>
                  </div>
                  <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: l.length > 40 ? 18 : l.length > 30 ? 19.5 : 21, color: on ? INK : '#8A94A6', lineHeight: 1.15, letterSpacing: -0.2}}>{l}</div>
                </div>
              );
            })}
            {(() => {
              const j0 = wk.m.length;
              const span = 8 - j0;
              const r = cardRect(k, j0);
              const wdt = span * CW + (span - 1) * GAPC;
              const show = t > wk.at + 2.6 || done;
              return (
                <div style={{position: 'absolute', left: r.x, top: r.y, width: wdt, height: CH, borderRadius: 14, overflow: 'hidden', border: `3px solid ${NBK}`, boxShadow: `4px 4px 0 ${NBK}`, boxSizing: 'border-box', background: '#fff'}}>
                  <Img src={PH(wk.img)} style={{position: 'absolute', right: 0, top: 0, width: '70%', height: '100%', objectFit: 'cover', transform: `scale(${1.05 + 0.03 * Math.sin(t * 0.3 + k)})`}} />
                  <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #fff 0%, #fff 38%, rgba(255,255,255,0.86) 55%, rgba(255,255,255,0) 82%)'}} />
                  <div style={{position: 'absolute', left: 20, top: 16, ...CAP, fontSize: 14, color: wk.c}}>Objectif · semaine {wk.n}</div>
                  <div style={{position: 'absolute', left: 20, top: 44, width: Math.min(wdt * 0.62, 520), fontFamily: sansFont, fontWeight: 800, fontSize: span > 2 ? 26 : 20, color: INK, lineHeight: 1.15, letterSpacing: -0.3, opacity: show ? 1 : 0.12, clipPath: `inset(0 ${show && !done ? (1 - prog(t, wk.at + 2.6, wk.at + 3.6, easeOut)) * 100 : 0}% 0 0)`}}>{wk.obj}</div>
                  {passedW && <div style={{position: 'absolute', right: 14, bottom: 12, display: 'flex', alignItems: 'center', gap: 6, background: wk.c, color: '#fff', fontFamily: sansFont, fontWeight: 700, fontSize: 18, padding: '4px 12px', borderRadius: 8}}><LCheck size={18} color="#fff" strokeWidth={3} />Semaine {wk.n} validée</div>}
                </div>
              );
            })()}
          </React.Fragment>
        );
      })}
      {!done && mi >= 0 && <div style={{position: 'absolute', left: hl.x - 7, top: hl.y - 7, width: CW + 14, height: CH + 14, borderRadius: 18, border: `5px solid ${w.c}`, boxShadow: `0 0 0 7px ${rgba(w.c, 0.18)}, 0 10px 30px ${rgba(w.c, 0.35)}`, pointerEvents: 'none'}} />}
    </div>
  );
};
/** Carte-loupe : la carte du module grandit depuis sa place dans la grille (FLIP), montre un détail animé, puis y retourne. */
const PopOut: React.FC<{k: number; j: number; a: number; b: number; children: React.ReactNode; w?: number; h?: number}> = ({k, j, a, b, children, w = 860, h = 640}) => {
  const t = useT();
  if (t < a || t > b) return null;
  const cam = boardCam(t);
  const r = cardRect(k, j);
  const src = {x: cam.x + r.x * cam.s, y: cam.y + r.y * cam.s, w: CW * cam.s, h: CH * cam.s};
  const dst = {x: (1080 - w) / 2, y: 520, w, h};
  const p = prog(t, a, a + 0.45, easeOut) * (1 - prog(t, b - 0.4, b, easeIn));
  const col = WEEKS[k].c;
  return (
    <>
      <AbsoluteFill style={{background: `rgba(248,245,236,${0.8 * p})`}} />
      <div style={{position: 'absolute', left: lerp(src.x, dst.x, p), top: lerp(src.y, dst.y, p), width: lerp(src.w, dst.w, p), height: lerp(src.h, dst.h, p), borderRadius: 22, border: `4px solid ${NBK}`, background: '#fff', boxShadow: `${10 * p}px ${10 * p}px 0 ${col}`, overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 0, top: 0, right: 0, height: 8, background: col}} />
        <div style={{position: 'absolute', left: 0, top: 0, width: w, height: h, transform: `scale(${lerp(src.w / w, 1, p)})`, transformOrigin: '0 0', opacity: prog(t, a + 0.25, a + 0.5)}}>{children}</div>
      </div>
    </>
  );
};
const PopTitle: React.FC<{c: string; text: string; num: number}> = ({c, text, num}) => (
  <div style={{position: 'absolute', left: 34, top: 34, right: 34, display: 'flex', alignItems: 'center', gap: 16}}><div style={{...CAP, fontSize: 18, color: '#fff', background: c, padding: '6px 12px', borderRadius: 8}}>Module {String(num).padStart(2, '0')}</div><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: INK, letterSpacing: -0.4}}>{text}</div></div>
);
const IsoPop: React.FC = () => {
  const t = useT();
  return (
    <>
      <PopTitle c={WEEKS[0].c} text="Les référentiels du système intégré" num={3} />
      {[['9001', 'Qualité', 60.3, '#138A80'], ['14001', 'Environnement', 60.9, '#2E8B4A'], ['45001', 'Santé et sécurité', 61.74, '#C9543B']].map(([n, l, a, c], k) => <div key={k} style={{position: 'absolute', left: 40 + k * 265, top: 150, width: 245, height: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, transform: `scale(${Math.min(1, sp(t, a as number))}) rotateY(${(1 - Math.min(1, prog(t, a as number, (a as number) + 0.5, easeOut))) * 90}deg)`}}>
        <div style={{width: 220, height: 220, borderRadius: 110, background: '#fff', border: `6px solid ${c}`, boxShadow: `6px 6px 0 ${NBK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><div style={{...CAP, fontSize: 24, color: c as string}}>ISO</div><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 54, color: INK, lineHeight: 1}}>{n as string}</div></div>
        <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 28, color: c as string}}>{l as string}</div>
      </div>)}
    </>
  );
};
const ToolsPop: React.FC = () => {
  const t = useT();
  const c = WEEKS[1].c;
  return (
    <>
      <PopTitle c={c} text="Outils de résolution de problèmes" num={8} />
      <div style={{position: 'absolute', left: 34, top: 130, width: 250, opacity: pop(t, 89.27)}}>
        <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: INK, marginBottom: 12}}>5 pourquoi</div>
        {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{marginBottom: 10, marginLeft: k * 14, background: rgba(c, 0.08 + k * 0.05), border: `2px solid ${c}`, borderRadius: 10, padding: '6px 12px', fontFamily: sansFont, fontWeight: 700, fontSize: 21, color: INK, opacity: prog(t, 89.3 + k * 0.12, 89.5 + k * 0.12)}}>Pourquoi ?</div>)}
      </div>
      <svg width={300} height={320} style={{position: 'absolute', left: 290, top: 170, opacity: pop(t, 89.76)}}>
        <line x1={10} y1={150} x2={270} y2={150} stroke={INK} strokeWidth={5} /><path d="M 270 124 L 296 150 L 270 176 Z" fill="#C9543B" />
        {[50, 120, 190].map((x, k) => <g key={k}><line x1={x} y1={60} x2={x + 50} y2={150} stroke={c} strokeWidth={4} pathLength={1} strokeDasharray={`${prog(t, 89.8 + k * 0.1, 90.2 + k * 0.1)} 1`} /><line x1={x} y1={240} x2={x + 50} y2={150} stroke={c} strokeWidth={4} pathLength={1} strokeDasharray={`${prog(t, 89.9 + k * 0.1, 90.3 + k * 0.1)} 1`} /></g>)}
        <text x={150} y={300} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={800} fontSize={28} fill={INK}>Ishikawa</text>
      </svg>
      <svg width={250} height={340} style={{position: 'absolute', left: 600, top: 150, opacity: pop(t, 90.31)}}>
        <line x1={6} y1={262} x2={244} y2={262} stroke={INK} strokeWidth={3} />
        {[0.95, 0.6, 0.38, 0.22, 0.12].map((v, k) => <rect key={k} x={12 + k * 46} y={260 - 230 * v * prog(t, 90.35 + k * 0.08, 90.7 + k * 0.08, easeOut)} width={38} height={230 * v * prog(t, 90.35 + k * 0.08, 90.7 + k * 0.08, easeOut)} fill={rgba(c, 0.85 - k * 0.12)} />)}
        <polyline fill="none" stroke="#C9543B" strokeWidth={4} points="31,150 77,90 123,62 169,44 215,34" opacity={prog(t, 90.8, 91.1)} />
        <text x={125} y={318} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={800} fontSize={28} fill={INK}>Pareto</text>
      </svg>
    </>
  );
};
const MethodsPop: React.FC = () => (
  <>
    <PopTitle c={WEEKS[2].c} text="Méthodes d'analyse des risques" num={12} />
    {[[2, 113.96, 0], [4, 114.33, 1], [3, 115.0, 2]].map(([n, a, k]) => <div key={k} style={{position: 'absolute', left: 30 + k * 270, top: 150, width: 1080, height: 400, transform: 'scale(0.29)', transformOrigin: '0 0'}}><Drum n={n} at={a} y={0} /></div>)}
    <div style={{position: 'absolute', left: 0, right: 0, top: 290, textAlign: 'center', ...CAP, fontSize: 18, color: DIM}}>Méthodes détaillées dans la capsule « 15 méthodes d'analyse des risques »</div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 360, display: 'flex', justifyContent: 'center', gap: 18}}>{[['APR', 'analyse préliminaire'], ['AMDEC', 'défaillances et criticité'], ['HAZOP', 'dangers et opérabilité']].map(([l, s0]) => <div key={l} style={{...nb('#fff', 5), padding: '14px 20px', textAlign: 'center', width: 230}}><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 36, color: WEEKS[2].c}}>{l}</div><div style={{fontFamily: sansFont, fontWeight: 600, fontSize: 18, color: DIM}}>{s0}</div></div>)}</div>
  </>
);
const LotoPop: React.FC = () => {
  const t = useT();
  const sh = prog(t, 133.4, 134.0, easeIn);
  const c = WEEKS[3].c;
  return (
    <>
      <PopTitle c={c} text="Consignation LOTO et EPI" num={15} />
      <svg width={360} height={420} style={{position: 'absolute', left: 60, top: 130}}>
        <path d={`M 110 ${200 - 60 * (1 - sh)} L 110 ${120 - 60 * (1 - sh)} A 70 70 0 0 1 250 ${120 - 60 * (1 - sh)} L 250 ${200 - 60 * (1 - sh)}`} fill="none" stroke="#9AA3B2" strokeWidth={24} strokeLinecap="round" />
        <rect x={70} y={180} width={220} height={190} rx={28} fill={c} stroke={NBK} strokeWidth={6} />
        <circle cx={180} cy={262} r={22} fill="#fff" /><rect x={172} y={272} width={16} height={48} rx={6} fill="#fff" />
      </svg>
      {sh >= 1 && <div style={{position: 'absolute', left: 60, top: 560, width: 360, textAlign: 'center', fontFamily: sansFont, fontWeight: 700, fontSize: 26, color: INK}}>Énergie consignée</div>}
      <div style={{position: 'absolute', left: 470, top: 150, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18}}>{[['HardHat', 'Casque'], ['Hand', 'Gants'], ['Glasses', 'Lunettes'], ['Footprints', 'Chaussures']].map(([ic, l], k) => <div key={ic} style={{width: 160, height: 160, ...nb('#fff', 5), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, transform: `scale(${Math.min(1, sp(t, 134.1 + k * 0.12))})`}}><Ico n={ic} size={60} c={c} /><span style={{fontFamily: sansFont, fontWeight: 700, fontSize: 20, color: INK}}>{l}</span></div>)}</div>
      {t > 134.1 && <div style={{position: 'absolute', left: 470, top: 530, width: 340, textAlign: 'center', ...CAP, fontSize: 18, color: c}}>Gestion des EPI</div>}
    </>
  );
};
const ScopesPop: React.FC = () => {
  const t = useT();
  return (
    <>
      <PopTitle c={WEEKS[5].c} text="Bilan carbone : les trois scopes" num={26} />
      <div style={{position: 'absolute', left: 230, top: 120, width: 400, height: 400}}>
        {[3, 2, 1].map((n, k) => { const r = 70 + (n - 1) * 65; const a = [196.5, 196.3, 195.86][k]; const c = ['#2C6FD1', '#138A80', '#2E8B4A'][n - 1]; return <div key={n} style={{position: 'absolute', left: 200 - r, top: 200 - r, width: r * 2, height: r * 2, borderRadius: '50%', border: `5px solid ${c}`, background: rgba(c, 0.08), transform: `scale(${Math.min(1, sp(t, a))})`}}><div style={{position: 'absolute', left: '50%', top: 6, transform: 'translateX(-50%)', fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: c}}>{n === 1 ? '' : `Scope ${n}`}</div></div>; })}
        <div style={{position: 'absolute', left: 140, top: 162, width: 120, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: '#2E8B4A', opacity: pop(t, 195.86)}}>Scope 1</div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 545, textAlign: 'center', ...CAP, fontSize: 20, color: DIM, opacity: pop(t, 194.3)}}>Référentiel GHG Protocol</div>
    </>
  );
};
const PdcaPop: React.FC = () => {
  const t = useT();
  const rot = (t - 224.0) * 50;
  return (
    <>
      <PopTitle c={WEEKS[6].c} text="Amélioration continue" num={32} />
      <div style={{position: 'absolute', left: 250, top: 130, width: 360, height: 360, borderRadius: '50%', transform: `rotate(${rot}deg)`, background: 'conic-gradient(#2C6FD1 0 90deg, #2E8B4A 90deg 180deg, #C8930A 180deg 270deg, #C9543B 270deg 360deg)', border: `5px solid ${NBK}`, boxShadow: `6px 6px 0 ${NBK}`}}>
        {['PLAN', 'DO', 'CHECK', 'ACT'].map((l, k) => <div key={l} style={{position: 'absolute', left: 180, top: 180, transform: `rotate(${k * 90 + 45}deg) translateY(-122px) rotate(${-(k * 90 + 45) - rot}deg)`, transformOrigin: '0 0'}}><div style={{transform: 'translate(-50%, -50%)', fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: '#fff', letterSpacing: 1}}>{l}</div></div>)}
      </div>
      <div style={{position: 'absolute', left: 380, top: 260, width: 100, height: 100, borderRadius: 50, background: '#fff', border: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="RefreshCw" size={48} c={WEEKS[6].c} /></div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 540, textAlign: 'center', ...CAP, fontSize: 20, color: WEEKS[6].c, opacity: pop(t, 225.0)}}>Revue de direction · amélioration continue</div>
    </>
  );
};
const FinalPop: React.FC = () => {
  const t = useT();
  return (
    <>
      <PopTitle c="#2E8B4A" text="Évaluation finale" num={36} />
      <div style={{position: 'absolute', left: 280, top: 150, width: 300, height: 300, borderRadius: 150, background: rgba('#2E8B4A', 0.1), border: '6px solid #2E8B4A', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1, sp(t, 249.5))})`}}><Ico n="GraduationCap" size={170} c="#1F3A68" /></div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 500, textAlign: 'center', ...CAP, fontSize: 20, color: DIM, opacity: pop(t, 249.9)}}>Validation des acquis</div>
    </>
  );
};
/** Volet « SEMAINE N » en palettes (semaines 2, 4, 6, 8, sans changement de guichet). */
const WeekFlap: React.FC<{k: number}> = ({k}) => {
  const t = useT();
  const wk = WEEKS[k];
  const a = wk.at;
  const p = prog(t, a, a + 0.3, easeOut) * (1 - prog(t, a + 2.3, a + 2.6, easeIn));
  if (p <= 0) return null;
  return (
    <AbsoluteFill style={{zIndex: 34, opacity: p}}>
      <AbsoluteFill style={{background: 'rgba(248,245,236,0.92)'}} />
      <Abs x={0} y={610} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Flap text={`SEMAINE ${wk.n}`} at={a + 0.1} size={96} c={wk.c} /></Abs>
      <Abs x={60} y={800} w={960} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 46, color: INK, letterSpacing: -0.5, opacity: pop(t, a + 0.6)}}>{wk.th}</Abs>
      <Abs x={60} y={900} w={960} style={{display: 'flex', justifyContent: 'center', gap: 10, opacity: pop(t, a + 0.9)}}>{WEEKS.map((w, j) => <div key={j} style={{width: 70, height: 10, borderRadius: 5, background: j <= k ? w.c : '#DDE2EA'}} />)}</Abs>
    </AbsoluteFill>
  );
};
/** Titre de section sobre (thème clair). */
const LTitle: React.FC<{a: number; t1: string; t2: string; y?: number}> = ({a, t1, t2, y = 300}) => {
  const t = useT();
  return (
    <Abs x={60} y={y} w={960} style={{textAlign: 'center', opacity: pop(t, a)}}>
      <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 46, color: INK, lineHeight: 1.05, letterSpacing: -0.6}}>{t1}</div>
      <div style={{...CAP, fontSize: 19, color: DIM, marginTop: 10}}>{t2}</div>
    </Abs>
  );
};

/* ═════════════ INTRO (papier clair) ═════════════ */
const Intro1: React.FC = () => {
  const t = useT();
  const grow = prog(t, 7.1, 8.3, easeOut);
  return (
    <Out end={17.4}>
      <Heads h={[[2.9, ['Qualité', '·', 'santé', '·', 'sécurité', '·', 'environnement'], [0, 2, 4, 6]], [7.1, ['De plus en plus', 'importantes'], [1]], [8.3, ['Les entreprises', 'ont besoin'], [1]], [11.4, ['Risques', '·', 'performance', '·', 'conformité'], [0, 2, 4]]]} />
      {t < 11.0 && [['Q', 'Qualité', 3.29, '#21A69A'], ['S', 'Santé', 4.25, '#E07A5F'], ['S', 'Sécurité', 4.67, ORANGE], ['E', 'Environnement', 5.91, '#3BAF5C']].map(([L, l, a, c], k) => { const q = sp(t, a as number); const h = 300 + grow * [80, 140, 200, 260][k]; return t > (a as number) - 0.05 && <Abs key={k} x={60 + k * 245} y={1300 - h} w={225} h={h} style={{...nb(c as string, 7), color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 24, transform: `scaleY(${Math.min(1, q)})`, transformOrigin: '50% 100%', opacity: 1 - prog(t, 10.6, 11.0)}}><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 124, lineHeight: 1}}>{L as string}</div><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: (l as string).length > 10 ? 23 : 28}}>{l as string}</div></Abs>; })}
      {t > 7.1 && t < 11.0 && <Abs x={60} y={480} w={960} style={{display: 'flex', justifyContent: 'center', opacity: wn(t, 7.1, 11.0)}}><NBadge at={7.2} text="Des exigences croissantes" bg={NBK} rot={0} size={32} /></Abs>}
      {t > 10.8 && <>
        <Abs x={60} y={480} w={960} style={{display: 'flex', justifyContent: 'center', opacity: pop(t, 10.8)}}><div style={{...nb('#fff', 7), display: 'flex', alignItems: 'center', gap: 18, padding: '16px 28px'}}><div style={{width: 84, height: 84, borderRadius: 16, background: `${ORANGE}18`, border: `2px solid ${ORANGE}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="UserCheck" size={48} c={ORANGE} /></div><span style={{fontFamily: sansFont, fontWeight: 800, fontSize: 40, letterSpacing: -0.4}}>Des <span style={{color: ORANGE}}>professionnels</span> capables de</span></div></Abs>
        {[['danger', 'Maîtriser les risques', 11.53], ['graphique', 'Piloter la performance', 13.12], ['check', 'Garantir la conformité', 14.75]].map(([ic, l, a], k) => <GH key={k} x={60 + k * 330} y={760} w={300} h={380} at={a as number} ic={ic as string} l={l as string} c={ORANGE} fs={34} />)}
      </>}
    </Out>
  );
};
const Intro2: React.FC = () => {
  const t = useT();
  return (
    <Out end={33.1}>
      <Heads h={[[17.4, ['Devenir', 'responsable QHSE'], [1]], [19.9, ['Pas seulement', 'les normes'], [1]], [21.6, ['Interpréter', '·', 'déployer'], [0, 2]], [25.9, ['Auditer', '·', 'maîtriser', '·', 'piloter'], [0, 2, 4]]]} />
      {t < 21.8 && <Abs x={190} y={520} w={700} h={640} style={{...nb('#fff', 8), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, opacity: pop(t, 17.5) * (1 - prog(t, 21.4, 21.8))}}>
        <div style={{width: 200, height: 200, borderRadius: 30, background: `${ORANGE}14`, border: `3px solid ${ORANGE}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="BookOpen" size={120} c={ORANGE} /></div>
        <div style={{display: 'flex', gap: 10}}>{['ISO 9001', 'ISO 14001', 'ISO 45001'].map((l, k) => <div key={l} style={{...nb(['#21A69A', '#3BAF5C', '#E07A5F'][k], 4), color: '#fff', padding: '6px 14px', fontFamily: sansFont, fontWeight: 800, fontSize: 26, transform: `scale(${Math.min(1, sp(t, 18.6 + k * 0.2))})`}}>{l}</div>)}</div>
        {t > 20.46 && <div style={{position: 'absolute', left: 20, right: 20, top: '48%', height: 16, background: RED, transform: `scaleX(${prog(t, 20.5, 21.0, easeOut)}) rotate(-6deg)`, transformOrigin: '0 50%'}} />}
        {t > 20.46 && <div style={{position: 'absolute', bottom: -26}}><NBadge at={20.5} text="Connaître les normes ne suffit pas" bg={NBK} rot={0} size={30} /></div>}
      </Abs>}
      {t > 21.6 && <RailSteps c={ORANGE} y={470} h={880} at={21.7} items={[['Interpréter les normes', 23.33, 'loupe'], ['Les déployer sur le terrain', 24.13, 'chantier'], ['Conduire des audits', 25.9, 'auditeur'], ['Maîtriser les risques', 27.51, 'danger'], ['Piloter un système de management intégré', 29.27, 'engrenage']]} />}
    </Out>
  );
};

/* ═════════════ PROGRAMME (fond sombre façon vidéo de référence) ═════════════ */
const Prog: React.FC = () => {
  const t = useT();
  const fin = t >= 253.8;
  return (
    <AbsoluteFill style={{opacity: prog(t, 33.0, 33.6)}}>
      {!fin && <LTitle a={36.5} t1="Formation Responsable QHSE" t2="Programme en 8 semaines · management intégré" y={296} />}
      {t > 41.5 && <div style={{position: 'absolute', left: 0, top: 418, width: 1080, height: 975, overflow: 'hidden', opacity: prog(t, 41.5, 41.9), WebkitMaskImage: 'linear-gradient(180deg, transparent 0, #000 22px, #000 calc(100% - 26px), transparent)', maskImage: 'linear-gradient(180deg, transparent 0, #000 22px, #000 calc(100% - 26px), transparent)'}}><div style={{position: 'absolute', left: 0, top: -418, width: 1080, height: 1920}}><PBoard /></div></div>}
      {t < 42.2 && <div style={{opacity: 1 - prog(t, 41.7, 42.2)}}>
        <SearchOpen x={60} y={460} w={960} h={880} at={36.6} query="formation responsable QHSE" results={['Normes ISO · fiches pratiques', 'Programme · 8 semaines · management intégré', 'Audit interne · guide']} found={1} foundAt={39.38} clickAt={39.8} c={'#E8B931'}>
          <div style={{padding: '20px 30px'}}>{WEEKS.map((w, k) => <div key={k} style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12, opacity: pop(t, 40.6 + k * 0.08)}}><div style={{width: 110, height: 62, borderRadius: 10, background: w.c, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>S{w.n}</div><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 27, color: INK}}>{w.th}</div></div>)}</div>
        </SearchOpen>
      </div>}
      {WEEKS.map((w, k) => (k % 2 === 1 ? <WeekFlap key={k} k={k} /> : null))}
      <PopOut k={0} j={2} a={58.8} b={62.1}><IsoPop /></PopOut>
      <PopOut k={1} j={3} a={88.6} b={91.5}><ToolsPop /></PopOut>
      <PopOut k={2} j={2} a={114.1} b={117.1}><MethodsPop /></PopOut>
      <PopOut k={3} j={1} a={132.9} b={135.4}><LotoPop /></PopOut>
      <PopOut k={5} j={3} a={194.3} b={196.7}><ScopesPop /></PopOut>
      <PopOut k={6} j={4} a={224.1} b={226.9}><PdcaPop /></PopOut>
      <PopOut k={7} j={3} a={249.4} b={250.4}><FinalPop /></PopOut>
      {fin && <>
        <Abs x={60} y={560} w={330} style={{textAlign: 'center', opacity: pop(t, 254.3)}}><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 220, color: '#1F3A68', lineHeight: 1}}>8</div><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 40, color: INK}}>semaines</div><div style={{...CAP, fontSize: 18, color: DIM, marginTop: 18, lineHeight: 1.5, opacity: pop(t, 256.4)}}>Les principaux domaines de compétences du pilotage QHSE</div></Abs>
        {[['BookOpen', 'Enseignements techniques', 260.93], ['Wrench', 'Exercices pratiques', 262.64], ['FolderOpen', 'Études de cas', 264.17]].map(([ic, l, a], k) => <GH key={k} x={700} y={560 + k * 230} w={320} h={205} at={a as number} ic={ic as string} l={l as string} c={WEEKS[k * 3].c} fs={26} />)}
      </>}
    </AbsoluteFill>
  );
};
const Concl2: React.FC = () => {
  const t = useT();
  return (
    <Out end={276.9}>
      <LTitle a={265.6} t1="Publics concernés" t2="La formation s'adresse aux" />
      {[['Briefcase', 'Professionnels QHSE', 266.77, '#C8930A', 'Renforcer leurs compétences'], ['HardHat', 'Techniciens', 269.42, '#138A80', 'Évoluer vers des fonctions de responsabilité'], ['GraduationCap', 'Étudiants', 273.66, '#6A4FD0', 'Construire une expertise QHSE']].map(([ic, l, a, c, sub], k) => <GH key={k} x={60 + k * 330} y={560} w={300} h={470} at={a as number} ic={ic as string} l={l as string} c={c as string} fs={30} sub={sub as string} />)}
      {t > 266.77 && <Abs x={60} y={1110} w={960} style={{textAlign: 'center', ...CAP, fontSize: 18, color: DIM, opacity: pop(t, 267.6)}}>Professionnels · techniciens · étudiants</Abs>}
    </Out>
  );
};
const Concl3: React.FC = () => {
  const t = useT();
  const click = t > 284.9 && t < 285.2;
  return (
    <Out end={OUTRO_AT}>
      <LTitle a={276.9} t1="Prochaines sessions" t2="Informations · modalités · inscriptions" />
      {[['CalendarDays', 'Calendrier des prochaines sessions', 279.49], ['ClipboardList', 'Modalités de participation', 281.07], ['PenLine', 'Inscriptions', 282.48]].map(([ic, l, a], k) => t > (a as number) - 0.05 && <Abs key={k} x={120} y={520 + k * 150} w={840} h={122} style={{...nb('#fff', 6), display: 'flex', alignItems: 'center', gap: 22, padding: '0 28px', transform: `translateX(${(1 - Math.min(1, sp(t, a as number))) * -200}px)`}}><div style={{width: 74, height: 74, borderRadius: 16, background: `${WEEKS[k * 3].c}18`, border: `2px solid ${WEEKS[k * 3].c}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n={ic as string} size={40} c={WEEKS[k * 3].c} /></div><span style={{fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: INK, letterSpacing: -0.3}}>{l as string}</span><span style={{marginLeft: 'auto'}}><Ico n="CircleCheckBig" size={40} c="#2E8B4A" /></span></Abs>)}
      {t > 283.4 && <Abs x={100} y={1010} w={880} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}>
        <div style={{...nb('#1F3A68', 8), padding: '24px 40px', fontFamily: sansFont, fontWeight: 800, fontSize: 38, whiteSpace: 'nowrap', color: '#fff', letterSpacing: -0.2, display: 'flex', alignItems: 'center', gap: 16, transform: `scale(${click ? 0.95 : Math.min(1, sp(t, 283.54))})`}}>Contactez UNIVERSNORMES QHSE<ArrowRight size={40} color="#fff" strokeWidth={2.5} /></div>
        <div style={{...CAP, fontSize: 17, color: DIM, opacity: pop(t, 284.0)}}>8 semaines · enseignements · exercices pratiques · études de cas</div>
      </Abs>}
      {t > 283.8 && t < 285.6 && <div style={{position: 'absolute', left: lerp(980, 660, prog(t, 283.9, 284.8, easeInOut)), top: lerp(1400, 1065, prog(t, 283.9, 284.8, easeInOut)), zIndex: 20}}><svg width={60} height={72} viewBox="0 0 24 30"><path d="M2 2 L2 24 L8 18 L12 28 L16 26 L12 17 L20 17 Z" fill="#fff" stroke={INK} strokeWidth={2} strokeLinejoin="round" /></svg></div>}
    </Out>
  );
};

/* ═════════════ Montage, bruitage ═════════════ */
const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.2}];
const POPS: [number, number][] = [[58.8, 62.1], [88.6, 91.5], [114.1, 117.1], [132.9, 135.4], [194.3, 196.7], [224.1, 226.9], [249.4, 250.4]];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at + 0.2, s: 'sfx/bell', v: 0.18})),
  ...[3.29, 4.25, 4.67, 5.91].map((at) => ({at, s: 'sfx/pop', v: 0.26})), {at: 7.1, s: 'sfx/rise', v: 0.25, dur: 1.2}, ...[11.53, 13.12, 14.75].map((at) => ({at, s: 'sfx/pop', v: 0.26})),
  {at: 20.5, s: 'stylo', v: 0.3, dur: 0.6}, {at: 20.9, s: 'tampon', v: 0.35}, ...[23.33, 24.13, 25.9, 27.51, 29.27].map((at) => ({at, s: 'sfx/bell', v: 0.2})),
  ...rep(36.9, 22, 0.05, 'sfx/click', 0.08), {at: 39.38, s: 'validation', v: 0.3}, {at: 39.8, s: 'sfx/click', v: 0.45}, {at: 40.0, s: 'soft-whoosh', v: 0.4, dur: 1}, {at: 41.9, s: 'riser', v: 0.3, dur: 1.3}, {at: 43.1, s: 'deep-hit', v: 0.35},
  ...WEEKS.flatMap((w) => w.m.flatMap(([, a]) => [{at: a - 0.05, s: 'sfx/click', v: 0.16}, {at: a + 0.1, s: 'sfx/pop', v: 0.18}] as Sfx[])),
  ...SCROLL.filter(([, k]) => k > 0).map(([a]) => ({at: a, s: 'soft-whoosh', v: 0.4, dur: 1.2})),
  ...WEEKS.filter((_, k) => k % 2 === 1).flatMap((w) => [...rep(w.at + 0.1, 10, 0.06, 'tick', 0.14), {at: w.at + 0.75, s: 'sfx/thud', v: 0.35}] as Sfx[]),
  ...WEEKS.map((w) => ({at: w.at + 2.6, s: 'stylo', v: 0.18, dur: 1})),
  ...POPS.flatMap(([a, b]) => [{at: a, s: 'sfx/whoosh', v: 0.35}, {at: b - 0.4, s: 'soft-whoosh', v: 0.25, dur: 0.6}] as Sfx[]),
  ...[60.3, 60.9, 61.74].map((at) => ({at, s: 'sfx/ding', v: 0.22})), ...[89.27, 89.76, 90.31].map((at) => ({at, s: 'sfx/pop', v: 0.22})), ...[113.96, 114.33, 115.0].flatMap((a) => [...rep(a, 10, 0.08, 'tick', 0.1), {at: a + 1.7, s: 'sfx/thud', v: 0.3}] as Sfx[]),
  {at: 133.9, s: 'cadenas', v: 0.35}, ...[195.86, 196.3, 196.5].map((at) => ({at, s: 'sfx/pop', v: 0.22})), {at: 225.0, s: 'riser', v: 0.2, dur: 1}, {at: 249.5, s: 'tampon', v: 0.45},
  {at: 253.8, s: 'soft-whoosh', v: 0.4, dur: 1.6}, {at: 255.4, s: 'validation', v: 0.3}, ...[260.93, 262.64, 264.17].map((at) => ({at, s: 'sfx/pop', v: 0.26})),
  ...[266.77, 269.42, 273.66].map((at) => ({at, s: 'sfx/pop', v: 0.26})), ...[279.49, 281.07, 282.48].map((at) => ({at, s: 'sfx/swish', v: 0.26})), {at: 283.54, s: 'sfx/rise', v: 0.25, dur: 1}, {at: 284.9, s: 'sfx/click', v: 0.45}, {at: 285.0, s: 'validation', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];
const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SCN: [React.FC, number, number][] = [[Intro1, 2.5, 17.5], [Intro2, 17.3, 33.2], [Prog, 33.0, 265.7], [Concl2, 265.5, 277.0], [Concl3, 276.8, OUTRO_AT]];
export const ProgrammeQhseMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    {SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={2.8} to={OUTRO_AT}><StationBanner /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-programme-qhse-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn, Barred, Flap];
