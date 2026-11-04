import React from 'react';
import type {LucideIcon} from 'lucide-react';
import {Activity, ArrowRight, Award, BadgeCheck, Ban, Bell, BellRing, BookOpen, Briefcase, BriefcaseMedical, CalendarClock, CalendarDays, ChartColumn, ChartNoAxesCombined, Check as LCheck, CircleCheckBig, CircleX, ClipboardCheck, ClipboardList, Clock, DoorOpen, Droplets, Ear, Eye, Factory, Fan, FileText, FireExtinguisher, Flag, FlaskConical, FolderOpen, Footprints, Gauge, Gavel, Glasses, Globe, GraduationCap, Hand, HandHeart, HardHat, IdCard, Image as ImageIcon, Infinity as InfinityIcon, TrendingUp, TrendingDown, Dumbbell, CalendarSync, Cog, MessageCircle, Send, Phone, MousePointerClick, FileCheck, Stamp as StampIcon, Mic, History as HistoryIcon, Timer, RotateCcw, Brain, Hourglass, Repeat2, Sparkles, Calendar, Quote, Signpost, Heart, House, Video, Shield, Flame, Landmark, Scissors, Handshake, Thermometer, ChartGantt, CloudSun, ScanSearch, Unlink, Layers, Leaf, Lightbulb, Link, ListChecks, Lock, LockOpen, Mail, MapPin, Megaphone, MessageCircleOff, MessageSquareText, Network, Newspaper, OctagonAlert, PenLine, Power, Presentation, Puzzle, Recycle, RefreshCw, Repeat, Route, Scale, ScrollText, Search, Settings2, ShieldAlert, ShieldCheck, Siren, Split, Sprout, Target, ThumbsUp, TriangleAlert, User, UserCheck, UserPlus, Users, VolumeX, Workflow, Wrench, Zap} from 'lucide-react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {Gate, TimeWarp} from '../anim';
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
 * « Les outils de l'amélioration continue » (voix d'origine, 4 min 20) — capsule « condensé de toutes les techniques +
 * effet wahou + ultra premium » en métro (19 stations = 19 outils). Tube de verre à six guichets (introduction →
 * organiser et améliorer → cartographier et fluidifier → résoudre les problèmes → piloter les flux → sur le terrain),
 * la capsule du dossier file d'un guichet à l'autre, transition gyrophare resserrée par TimeWarp. Les 19 outils ont
 * chacun un pictogramme rond qui se dessine en direct (moteur des pictogrammes SGH et des 7 principes) ; couverture
 * en grille + titre en lettres-photos ; carrousel rotatif convergent ; recherche qui ouvre la grille des 19 ; pour
 * chaque outil : nom, définition écrite mot à mot au rythme de la voix (technique du cylindre des sigles) et une
 * signature animée (5S en cinq tuiles, courbes Kaizen / Kaikaku / Kakushin, colonnes SIPOC, barres SMED avant /
 * après, balance du benchmarking, barres nivelées Heijunka, cascade Hoshin Kanri, photo terrain QRQC, disciplines
 * D1 → D8, Pareto et courbe cumulée, arête d'Ishikawa en 5M, escalier des 5 pourquoi, VSM flux matière et
 * information, tableau Kanban, fraction PPM, Lean + Six Sigma puis DMAIC, 5G japonais → français) ; conclusion en
 * carrousel des 19 outils. Sous-titres NeoCaptions sur la voix d'origine, sans musique.
 */
const IMG = {
  cover: 'kaizen-gen/gemba.jpg',
  c1: 'kaizen-gen/tableau.jpg',
  c2: 'isoperf-gen/amelioration.jpg',
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
const OUTRO_AT = 260.5;
export const OUTILS_AMELIORATION_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '1', title: "L'amélioration continue", s: 'les principaux outils', c: NAVY, g: 'intro', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 17.6, n: '2', title: 'Organiser et améliorer', s: '5S · Kaizen · Kaikaku · Kakushin', c: '#1E9E5A', g: 'améliorer', k: 'gyro', lab: 'GUICHET 2 / 6'},
  {at: 62.4, n: '3', title: 'Cartographier et fluidifier', s: 'SIPOC · SMED · benchmarking · Heijunka · Hoshin', c: BLUE, g: 'fluidifier', k: 'gyro', lab: 'GUICHET 3 / 6'},
  {at: 118.6, n: '4', title: 'Résoudre les problèmes', s: 'QRQC · 8D · Pareto · Ishikawa · 5 pourquoi', c: '#E2483B', g: 'résoudre', k: 'gyro', lab: 'GUICHET 4 / 6'},
  {at: 174.8, n: '5', title: 'Piloter les flux', s: 'VSM · Kanban · PPM · Lean Six Sigma', c: VIO, g: 'piloter', k: 'gyro', lab: 'GUICHET 5 / 6'},
  {at: 224.5, n: '6', title: 'Sur le terrain', s: '5G · une culture', c: ORANGE, g: 'terrain', k: 'gyro', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 260.0;
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
  const beam = S0.n === '!' || S0.c === RED ? '224,74,63' : '31,111,209';
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
  {n: 1, l: '5S', s: '5S', at: 19.0},
  {n: 2, l: 'Kaizen', s: 'Kaizen', at: 32.9},
  {n: 3, l: 'Kaikaku', s: 'Kaikaku', at: 45.7},
  {n: 4, l: 'Kakushin', s: 'Kakushin', at: 53.5},
  {n: 5, l: 'SIPOC', s: 'SIPOC', at: 64.2},
  {n: 6, l: 'SMED', s: 'SMED', at: 75.7},
  {n: 7, l: 'Benchmarking', s: 'Bench.', at: 87.6},
  {n: 8, l: 'Heijunka', s: 'Heijunka', at: 100.9},
  {n: 9, l: 'Hoshin Kanri', s: 'Hoshin', at: 111.3},
  {n: 10, l: 'QRQC', s: 'QRQC', at: 120.0},
  {n: 11, l: '8D', s: '8D', at: 129.4},
  {n: 12, l: 'Pareto', s: 'Pareto', at: 140.3},
  {n: 13, l: 'Ishikawa', s: 'Ishikawa', at: 149.2},
  {n: 14, l: '5 Pourquoi', s: '5 Pourq.', at: 165.7},
  {n: 15, l: 'VSM', s: 'VSM', at: 176.7},
  {n: 16, l: 'Kanban', s: 'Kanban', at: 187.7},
  {n: 17, l: 'PPM', s: 'PPM', at: 198.6},
  {n: 18, l: 'Lean Six Sigma', s: 'Lean 6σ', at: 210.7},
  {n: 19, l: '5G', s: '5G', at: 225.6},
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
      {STATIONS.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: sx(k) - 26, width: 52, top: 62, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 10, color: k === cur ? BURG : DIM}}>{x.s}</div>)}
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE AMÉLIORATION · STATION {r.n} / 19</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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
      <Abs x={0} y={590} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="TECHNIQUE" src={IMG.c2} size={96} ls={2} seed={2} /></Abs>
      <Abs x={0} y={700} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="STRUCTURÉE" src={IMG.c2} size={96} ls={2} seed={4} /></Abs>
      <Abs x={0} y={810} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="D'ANALYSE :" src={IMG.c2} size={96} ls={2} seed={5} /></Abs>
      <Abs x={0} y={925} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="SWIFT" src={IMG.c1} size={210} ls={4} /></Abs>
      <Abs x={40} y={1200} w={1000} style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10}}>{[['PÉRIMÈTRE', BLUE], ['QUESTIONS', VIO], ['SCÉNARIOS', ORANGE], ['ÉVALUATION', RED], ['MESURES', GREEN]].map(([n, c], k) => <div key={n} style={{...nb(c, 4), padding: '6px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', transform: `translateY(${(1 - Math.min(1, spring(t, 0.3 + k * 0.08))) * 60}px)`}}>{n}</div>)}</Abs>
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
const LUC: Record<string, LucideIcon> = {Heart, House, Video, Shield, Flame, Landmark, Scissors, Handshake, Thermometer, ChartGantt, CloudSun, ScanSearch, Unlink, Quote, Signpost, TrendingUp, TrendingDown, Dumbbell, CalendarSync, Cog, MessageCircle, Send, Phone, MousePointerClick, FileCheck, Stamp: StampIcon, Mic, History: HistoryIcon, Timer, RotateCcw, Brain, Hourglass, Repeat2, Sparkles, Calendar, DoorOpen, UserPlus, IdCard, Route, BriefcaseMedical, Newspaper, Presentation, Image: ImageIcon, Mail, Clock, Eye, Bell, BellRing, Sprout, ThumbsUp, HandHeart, Infinity: InfinityIcon, Flag, MapPin, Link, Puzzle, Split, User, Droplets, Lightbulb, Activity, Ear, Siren, MessageSquareText, MessageCircleOff, VolumeX, Power, OctagonAlert, Fan, Megaphone, FlaskConical, LockOpen, Ban, Repeat, Zap, UserCheck, Network, BookOpen, Workflow, Search, FileText, CircleX, ChartColumn, FolderOpen, HardHat, TriangleAlert, Target, ClipboardList, ScrollText, Lock, ShieldAlert, FireExtinguisher, Wrench, Leaf, Factory, Scale, Recycle, Gavel, ShieldCheck, Globe, Layers, BadgeCheck, CalendarDays, PenLine, Gauge, RefreshCw, CalendarClock, ListChecks, Settings2, Award, GraduationCap, Briefcase, Users, ClipboardCheck, ChartNoAxesCombined, Glasses, Hand, Footprints, Check: LCheck, CircleCheckBig,
  'agent-hse': UserCheck, danger: TriangleAlert, graphique: ChartNoAxesCombined, check: BadgeCheck, loupe: Search, chantier: HardHat, auditeur: ClipboardCheck, engrenage: Settings2, livres: BookOpen, outils: Wrench, dossier: FolderOpen};
const Ico: React.FC<{n: string; size: number; c?: string}> = ({n, size, c = INK}) => { const L = LUC[n]; return L ? <L size={size} color={c} strokeWidth={1.9} /> : <F n={n} size={size} />; };

/* ═════════════ Outils hérités des capsules « 15 méthodes » et « programme QHSE » ═════════════ */
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

/* ═════════════ Outils repris du film ISO 45001 (carrousel cylindrique, tampon, flèche, avatar) ═════════════ */
const wn = (t: number, a: number, b: number, f = 0.3) => prog(t, a, a + f) * (1 - prog(t, b - f, b));
const CAP: React.CSSProperties = {fontFamily: MONO, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase'};
const STAGE: React.CSSProperties = {background: 'radial-gradient(120% 90% at 50% 30%, #2A251E 0%, #16130F 60%, #0B0A08 100%)', border: `5px solid ${NBK}`, borderRadius: 30, boxShadow: `10px 10px 0 ${NBK}`, overflow: 'hidden'};
const SCAN: React.CSSProperties = {position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.035) 0 2px, transparent 2px 6px)', pointerEvents: 'none'};
const RING_ISO = ['promo/audit-reunion.jpg', 'promo/hse-machine.jpg', 'rhse-gen/prevention.jpg', 'promo/terrain-controle.jpg', 'sysqsse-gen/sante.jpg', 'promo/participants.jpg', 'rhse-gen/responsable.jpg', 'principes-gen/chef-projet.jpg'];

/**
 * Carrousel cylindrique 3D — l'« effet rotatif » de la capture : cartes-photos posées à l'intérieur d'un cylindre et
 * vues depuis son centre. Les deux cartes de face sont grandes, celles des bords fuient en perspective ; reflet au sol,
 * ombrage selon l'angle, entrée en vrille puis rotation lente continue.
 */
const Ring3D: React.FC<{imgs: string[]; at: number; w: number; h: number; cw?: number; ch?: number; R?: number; zr?: number; speed?: number; persp?: number; cy?: number; frame?: string}> = ({imgs, at, w, h, cw = 380, ch = 270, R = 560, zr = 300, speed = 16, persp = 1000, cy = 0.42, frame = '#fff'}) => {
  const t = useT();
  const N = imgs.length;
  const step = 360 / N;
  const app = Math.min(1, sp(t, at, 7, 14));
  const k = Math.max(0, t - at);
  const rot = step / 2 - k * speed - (1 - app) * 70;
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: w, height: h, perspective: persp, perspectiveOrigin: `50% ${cy * 100}%`, overflow: 'hidden', opacity: cl(app * 1.6)}}>
      <div style={{position: 'absolute', left: w / 2, top: h * cy, transformStyle: 'preserve-3d', transform: `translateZ(${zr * app}px) rotateY(${rot}deg)`}}>
        {imgs.map((src, i) => {
          const a = ((((i * step + rot) % 360) + 540) % 360) - 180;
          const dark = cl((Math.abs(a) - 25) / 70) * 0.7;
          return (
            <div key={i} style={{position: 'absolute', left: -cw / 2, top: -ch / 2, width: cw, height: ch, transform: `rotateY(${i * step}deg) translateZ(${-R}px)`, backfaceVisibility: 'hidden'}}>
              <div style={{position: 'absolute', inset: 0, borderRadius: 22, overflow: 'hidden', border: `6px solid ${frame}`, boxShadow: '0 24px 50px rgba(0,0,0,0.55)', background: '#222'}}>
                <Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                <div style={{position: 'absolute', inset: 0, background: `rgba(10,8,6,${dark})`}} />
                <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(115deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 35%)'}} />
              </div>
              <div style={{position: 'absolute', left: 0, top: ch + 16, width: cw, height: ch, borderRadius: 22, overflow: 'hidden', transform: 'scaleY(-1)', opacity: 0.3 * (1 - dark), WebkitMaskImage: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 55%)', maskImage: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 55%)'}}>
                <Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** Avatar rond à pictogramme (direction, opérateur, travailleurs). */
const Avatar: React.FC<{ic: string; c: string; size?: number; label?: string; shake?: number; mute?: number}> = ({ic, c, size = 150, label, shake = 0, mute = 0}) => {
  const t = useT();
  const dx = shake * Math.sin(t * 70) * 6;
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, transform: `translateX(${dx}px)`}}>
      <div style={{position: 'relative', width: size, height: size, borderRadius: size / 2, background: '#fff', border: `5px solid ${NBK}`, boxShadow: `6px 6px 0 ${c}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Ico n={ic} size={size * 0.52} c={c} />
        {mute > 0 && <div style={{position: 'absolute', right: -size * 0.12, top: -size * 0.12, width: size * 0.46, height: size * 0.46, borderRadius: '50%', background: RED, border: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${mute})`}}><Ico n="MessageCircleOff" size={size * 0.26} c="#fff" /></div>}
      </div>
      {label && <div style={{...CAP, fontSize: Math.max(15, size * 0.12), color: INK, whiteSpace: 'nowrap'}}>{label}</div>}
    </div>
  );
};

/** Tampon qui s'abat (échelle 2,4 → 1, rebond) ; renvoie aussi l'intensité de secousse pour l'écran. */
const slamK = (t: number, at: number) => (t < at ? 0 : Math.max(0, 1 - (t - at) / 0.45));
const SlamTag: React.FC<{at: number; text: string; c: string; rot?: number; size?: number; ic?: string}> = ({at, text, c, rot = -8, size = 54, ic}) => {
  const t = useT();
  if (t < at - 0.12) return null;
  const q = prog(t, at - 0.12, at, easeIn);
  const bounce = t > at ? Math.sin(Math.min(1, (t - at) / 0.3) * Math.PI) * 0.06 : 0;
  return (
    <div style={{display: 'inline-flex', alignItems: 'center', gap: 14, background: c, color: '#fff', border: `6px solid ${NBK}`, borderRadius: 14, padding: '10px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: size, letterSpacing: 3, boxShadow: `8px 8px 0 ${NBK}`, transform: `rotate(${rot}deg) scale(${lerp(2.4, 1, q) + bounce})`, opacity: cl(q * 2), whiteSpace: 'nowrap'}}>{ic && <Ico n={ic} size={size} c="#fff" />}{text}</div>
  );
};

/** Flèche SVG qui se trace (stroke-dasharray). */
const Arrow: React.FC<{x1: number; y1: number; x2: number; y2: number; at: number; c: string; dur?: number; dash?: boolean; w?: number}> = ({x1, y1, x2, y2, at, c, dur = 0.6, dash, w = 10}) => {
  const t = useT();
  const p = prog(t, at, at + dur, easeOut);
  if (p <= 0) return null;
  const L = Math.hypot(x2 - x1, y2 - y1);
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const hx = x1 + (x2 - x1) * p, hy = y1 + (y2 - y1) * p;
  const hs = w * 3.2;
  const pts = [[hx, hy], [hx - hs * Math.cos(ang - 0.45), hy - hs * Math.sin(ang - 0.45)], [hx - hs * Math.cos(ang + 0.45), hy - hs * Math.sin(ang + 0.45)]].map((q) => q.join(',')).join(' ');
  return (
    <svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}} width={1} height={1}>
      <line x1={x1} y1={y1} x2={hx} y2={hy} stroke={c} strokeWidth={w} strokeLinecap="round" strokeDasharray={dash ? `${w * 1.6} ${w * 1.8}` : `${L} ${L}`} />
      <polygon points={pts} fill={c} />
    </svg>
  );
};


/** Carte « puce » à icône (apparition à ressort). */
const Pill2: React.FC<{at: number; ic: string; l: string; c: string; fs?: number; w?: number}> = ({at, ic, l, c, fs = 30, w}) => {
  const t = useT();
  if (t < at - 0.05) return null;
  const q = Math.min(1, sp(t, at));
  return (
    <div style={{...nb('#fff', 6), borderColor: NBK, display: 'flex', alignItems: 'center', gap: 14, padding: '12px 18px', width: w, opacity: cl(q * 1.5), transform: `translateY(${(1 - q) * 40}px) scale(${0.85 + 0.15 * q})`}}>
      <div style={{width: 62, height: 62, borderRadius: 14, background: `${c}1A`, border: `3px solid ${c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}><Ico n={ic} size={38} c={c} /></div>
      <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: fs, color: INK, lineHeight: 1.08}}>{l}</span>
    </div>
  );
};


/* ═════════════ Les 19 outils de l'amélioration continue — pictogrammes ronds dessinés en direct ═════════════ */
const F2 = '#1E9E5A', F3 = '#1F6FD1', F4 = '#E2483B', F5 = '#6D4BD8', F6 = '#F07A12', TINK = '#14213D';
type TE = {k: string; d?: string; cx?: number; cy?: number; r?: number; rx?: number; ry?: number; x?: number; y?: number; w2?: number; h?: number; x1?: number; y1?: number; x2?: number; y2?: number; f?: string; s?: string; w?: number; tr?: string; tx?: string; fs?: number};
const sq5 = [44, 70, 96, 122, 148].map((x, k) => ({k: 'r', x, y: 124, w2: 18, h: 18, rx: 3, f: k % 2 ? TINK : F2}));
const TP: Record<string, {c: string; els: TE[]}> = {
  T5S: {c: F2, els: [{k: 't', x: 100, y: 108, tx: '5S', fs: 66, f: TINK}, ...sq5]},
  KAI: {c: F2, els: [{k: 'p', d: 'M 40 150 L 60 150 L 60 138 L 80 138 L 80 126 L 100 126 L 100 114 L 120 114 L 120 102 L 140 102 L 140 90 L 160 90', s: F2, w: 7}, {k: 'l', x1: 50, y1: 128, x2: 148, y2: 62, s: TINK, w: 5}, {k: 'p', d: 'M 132 60 L 150 60 L 148 78', s: TINK, w: 5}]},
  KAK: {c: F2, els: [{k: 'p', d: 'M 38 150 L 96 150 L 96 68 L 162 68', s: F2, w: 10}, {k: 'l', x1: 72, y1: 140, x2: 72, y2: 86, s: TINK, w: 6}, {k: 'p', d: 'M 61 98 L 72 84 L 83 98', s: TINK, w: 6}]},
  KSH: {c: F2, els: [{k: 'c', cx: 100, cy: 88, r: 32, s: F2, w: 7}, {k: 'p', d: 'M 90 92 L 96 80 L 104 94 L 110 82', s: TINK, w: 4}, {k: 'l', x1: 88, y1: 128, x2: 112, y2: 128, s: TINK, w: 7}, {k: 'l', x1: 91, y1: 141, x2: 109, y2: 141, s: TINK, w: 7}, {k: 'l', x1: 100, y1: 44, x2: 100, y2: 32, s: F6, w: 5}, {k: 'l', x1: 64, y1: 60, x2: 54, y2: 50, s: F6, w: 5}, {k: 'l', x1: 136, y1: 60, x2: 146, y2: 50, s: F6, w: 5}]},
  SIP: {c: F3, els: [...[30, 58, 86, 114, 142].map((x) => ({k: 'r', x, y: 76, w2: 24, h: 24, rx: 4, s: F3, w: 5})), {k: 't', x: 100, y: 142, tx: 'SIPOC', fs: 30, f: TINK}]},
  SMD: {c: F3, els: [{k: 'c', cx: 100, cy: 110, r: 44, s: F3, w: 8}, {k: 'r', x: 91, y: 52, w2: 18, h: 11, rx: 3, f: TINK}, {k: 'l', x1: 100, y1: 110, x2: 124, y2: 88, s: TINK, w: 6}, {k: 'c', cx: 100, cy: 110, r: 6, f: TINK}]},
  BEN: {c: F3, els: [{k: 'l', x1: 100, y1: 64, x2: 100, y2: 150, s: TINK, w: 6}, {k: 'l', x1: 74, y1: 152, x2: 126, y2: 152, s: TINK, w: 6}, {k: 'l', x1: 50, y1: 72, x2: 150, y2: 72, s: F3, w: 6}, {k: 'p', d: 'M 50 72 L 38 108 M 50 72 L 62 108', s: TINK, w: 3}, {k: 'p', d: 'M 34 108 Q 50 124 66 108 Z', f: F3}, {k: 'p', d: 'M 150 72 L 138 116 M 150 72 L 162 116', s: TINK, w: 3}, {k: 'p', d: 'M 134 116 Q 150 132 166 116 Z', f: F3}]},
  HEI: {c: F3, els: [{k: 'l', x1: 36, y1: 90, x2: 164, y2: 90, s: TINK, w: 5}, ...[44, 72, 100, 128].map((x) => ({k: 'r', x, y: 98, w2: 22, h: 52, rx: 3, f: F3}))]},
  HOS: {c: F3, els: [{k: 'r', x: 82, y: 42, w2: 36, h: 26, rx: 4, f: F3}, {k: 'p', d: 'M 100 68 L 100 84 M 56 84 L 144 84 M 56 84 L 56 98 M 100 84 L 100 98 M 144 84 L 144 98', s: TINK, w: 4}, ...[40, 84, 128].map((x) => ({k: 'r', x, y: 98, w2: 32, h: 24, rx: 4, s: F3, w: 5})), {k: 'p', d: 'M 100 130 L 100 156 M 90 146 L 100 158 L 110 146', s: TINK, w: 5}]},
  QRQ: {c: F4, els: [{k: 'p', d: 'M 110 38 L 68 108 L 98 108 L 88 162 L 134 84 L 104 84 Z', f: F4}]},
  D8: {c: F4, els: [{k: 't', x: 100, y: 120, tx: '8D', fs: 64, f: TINK}, ...Array.from({length: 8}, (_, k) => ({k: 'c', cx: 100 + 64 * Math.cos((k * Math.PI) / 4), cy: 100 + 64 * Math.sin((k * Math.PI) / 4), r: 6, f: F4}))]},
  PAR: {c: F4, els: [...[[44, 70], [66, 50], [88, 34], [110, 22], [132, 14]].map(([x, h]) => ({k: 'r', x, y: 150 - h, w2: 18, h, f: F4})), {k: 'p', d: 'M 53 78 Q 92 52 150 48', s: TINK, w: 5}]},
  ISH: {c: F4, els: [{k: 'l', x1: 40, y1: 100, x2: 140, y2: 100, s: TINK, w: 6}, {k: 'p', d: 'M 140 82 L 166 100 L 140 118 Z', f: F4}, {k: 'p', d: 'M 60 70 L 80 100 M 96 70 L 116 100 M 60 130 L 80 100 M 96 130 L 116 100 M 40 100 L 30 86 M 40 100 L 30 114', s: TINK, w: 5}]},
  WHY: {c: F4, els: [{k: 't', x: 98, y: 132, tx: '?', fs: 104, f: F4}, {k: 't', x: 150, y: 152, tx: '×5', fs: 30, f: TINK}]},
  VSM: {c: F5, els: [...[30, 83, 136].map((x) => ({k: 'r', x, y: 76, w2: 34, h: 30, rx: 4, s: F5, w: 5})), {k: 'p', d: 'M 66 120 L 74 106 L 82 120 Z M 119 120 L 127 106 L 135 120 Z', f: TINK}, {k: 'p', d: 'M 40 140 L 160 140 M 148 132 L 160 140 L 148 148', s: TINK, w: 5}]},
  KAN: {c: F5, els: [{k: 'r', x: 40, y: 52, w2: 120, h: 96, rx: 6, s: TINK, w: 5}, {k: 'p', d: 'M 80 52 L 80 148 M 120 52 L 120 148', s: TINK, w: 3}, ...[[48, 62], [48, 86], [88, 62], [128, 62]].map(([x, y]) => ({k: 'r', x, y, w2: 24, h: 16, rx: 3, f: F5}))]},
  PPM: {c: F5, els: [{k: 'p', d: 'M 50 128 A 50 50 0 0 1 150 128', s: F5, w: 9}, {k: 'l', x1: 100, y1: 128, x2: 124, y2: 94, s: TINK, w: 6}, {k: 'c', cx: 100, cy: 128, r: 7, f: TINK}, {k: 't', x: 100, y: 162, tx: 'ppm', fs: 26, f: TINK}]},
  LSS: {c: F5, els: [{k: 't', x: 100, y: 128, tx: '6σ', fs: 86, f: F5}]},
  G5: {c: F6, els: [{k: 'p', d: 'M 44 96 Q 100 48 156 96 Q 100 144 44 96 Z', s: F6, w: 7}, {k: 'c', cx: 100, cy: 96, r: 17, f: TINK}, {k: 't', x: 100, y: 164, tx: '5G', fs: 32, f: TINK}]},
};
const T_IDS = ['T5S', 'KAI', 'KAK', 'KSH', 'SIP', 'SMD', 'BEN', 'HEI', 'HOS', 'QRQ', 'D8', 'PAR', 'ISH', 'WHY', 'VSM', 'KAN', 'PPM', 'LSS', 'G5'];
const TEl: React.FC<{e: TE; p: number; fill: number}> = ({e, p, fill}) => {
  if (p <= 0) return null;
  if (e.k === 't') return <text x={e.x} y={e.y} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={e.fs} fill={e.f} opacity={Math.min(1, p * 1.2)}>{e.tx}</text>;
  const filled = !!e.f && e.f !== 'none';
  const common = {pathLength: 1, strokeDasharray: '1 1', strokeDashoffset: 1 - p, stroke: e.s || e.f, strokeWidth: e.s ? e.w : 2.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: filled ? e.f : 'none', fillOpacity: filled ? fill : 0, transform: e.tr};
  if (e.k === 'p') return <path d={e.d} {...common} />;
  if (e.k === 'c') return <circle cx={e.cx} cy={e.cy} r={e.r} {...common} />;
  if (e.k === 'r') return <rect x={e.x} y={e.y} width={e.w2} height={e.h} rx={e.rx || 0} {...common} />;
  if (e.k === 'l') return <line x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} {...common} fill="none" />;
  return null;
};
/** Pictogramme rond d'un outil : anneau tracé, symbole élément par élément, remplissage. */
const TPicto: React.FC<{id: string; size: number; draw?: number; glow?: number}> = ({id, size, draw = 1, glow = 0}) => {
  const P = TP[id];
  const pb = Math.min(1, draw / 0.3);
  const ps = Math.max(0, Math.min(1, (draw - 0.3) / 0.55));
  const pf = Math.max(0, Math.min(1, (draw - 0.7) / 0.3));
  const n = P.els.length;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{overflow: 'visible', filter: glow > 0 ? `drop-shadow(0 0 ${18 * glow}px ${P.c})` : 'drop-shadow(0 8px 14px rgba(20,33,61,0.18))'}}>
      <circle cx={100} cy={100} r={90} fill="#fff" fillOpacity={Math.min(1, pb * 1.4)} stroke={P.c} strokeWidth={10} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - pb} transform="rotate(-90 100 100)" />
      <circle cx={100} cy={100} r={78} fill="none" stroke={P.c} strokeOpacity={0.25} strokeWidth={3} strokeDasharray="4 6" opacity={pb} />
      {P.els.map((e, i) => { const g = Math.max(1, n * 0.45); return <TEl key={i} e={e} p={Math.max(0, Math.min(1, (ps * (n + g) - i) / g))} fill={pf} />; })}
    </svg>
  );
};
/** Carrousel rotatif des 19 outils ; conv : l'orbite se referme et tout converge (éclair). */
const TRing: React.FC<{a: number; b: number; cy: number; conv?: boolean; size?: number; R0?: number}> = ({a, b, cy, conv = true, size = 150, R0 = 420}) => {
  const t = useT();
  const k = Math.max(0, t - a);
  const cv = conv ? prog(t, a + (b - a) * 0.5, b - 0.15, easeIn) : 0;
  const app = Math.min(1, sp(t, a, 7, 13));
  const R = R0 * app * (1 - cv);
  const rot = k * 40 + cv * 260;
  const P = 1500;
  const items = T_IDS.map((id, i) => { const th = ((i * (360 / T_IDS.length) + rot) * Math.PI) / 180; const x = R * Math.sin(th), z = R * Math.cos(th); return {id, x, z, sc: P / (P - z)}; }).sort((u, v) => u.z - v.z);
  const flash = conv && t > b - 0.2 ? Math.max(0, 1 - (t - b + 0.2) / 0.5) : 0;
  return (
    <>
      {items.map(({id, x, z, sc}) => { const sz = size * sc * (0.75 + 0.25 * app); const dim = Math.max(0, Math.min(0.5, (-z / (R0 + 1)) * 0.5)); return <div key={id} style={{position: 'absolute', left: 540 + x - sz / 2, top: cy - z * 0.34 - sz / 2, filter: `brightness(${1 - dim})`, opacity: app}}><TPicto id={id} size={sz} /></div>; })}
      {flash > 0 && <AbsoluteFill style={{background: `radial-gradient(circle at 540px ${cy}px, #fff 0%, rgba(255,255,255,${flash}) 40%, rgba(255,255,255,0) 75%)`, opacity: flash, zIndex: 9}} />}
    </>
  );
};

/* ═════════════ Outils de scène ═════════════ */
const Ph: React.FC<{a: number; b: number; children: React.ReactNode}> = ({a, b, children}) => {
  const t = useT();
  if (t < a - 0.02 || t > b) return null;
  const o = pop(t, a, 0.35) * (1 - prog(t, b - 0.3, b, easeIn));
  return <AbsoluteFill style={{opacity: o}}>{children}</AbsoluteFill>;
};
const TChip: React.FC<{at: number; l: string; c: string; fs?: number; ic?: string; fill?: boolean}> = ({at, l, c, fs = 32, ic, fill}) => {
  const t = useT();
  const q = t > at ? Math.min(1, sp(t, at, 9, 13)) : 0;
  return <div style={{...nb(fill ? c : '#fff', 6), borderColor: NBK, boxShadow: `6px 6px 0 ${fill ? NBK : c}`, display: 'inline-flex', alignItems: 'center', gap: 12, padding: '10px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: fs, color: fill ? '#fff' : INK, transform: `scale(${q})`, opacity: t > at ? 1 : 0, whiteSpace: 'nowrap'}}>{ic && <Ico n={ic} size={fs * 1.3} c={fill ? '#fff' : c} />}{l}</div>;
};
const Row3: React.FC<{y: number; children: React.ReactNode; gap?: number}> = ({y, children, gap = 20}) => <Abs x={60} y={y} w={960} style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap}}>{children}</Abs>;
const SlamCard: React.FC<{at: number; lines: string[]; c: string; rot?: number; size?: number}> = ({at, lines, c, rot = -4, size = 60}) => {
  const t = useT();
  if (t < at - 0.12) return null;
  const q = prog(t, at - 0.12, at, easeIn);
  const bounce = t > at ? Math.sin(Math.min(1, (t - at) / 0.3) * Math.PI) * 0.05 : 0;
  return <div style={{display: 'inline-block', background: c, color: '#fff', border: `7px solid ${NBK}`, borderRadius: 18, padding: '18px 34px', boxShadow: `10px 10px 0 ${NBK}`, transform: `rotate(${rot}deg) scale(${lerp(2.4, 1, q) + bounce})`, opacity: cl(q * 2), fontFamily: sansFont, fontWeight: 900, fontSize: size, lineHeight: 1.05, letterSpacing: 2, textAlign: 'center'}}>{lines.map((l, k) => <div key={k}>{l}</div>)}</div>;
};

/* ═════════════ Séquence générique d'un outil : pictogramme dessiné, nom, définition écrite au rythme de la voix, signature ═════════════ */
type TS = {id: string; name: string; tag: string; fam: string; c: string; a: number; b: number; da: number; de: number; def: string; Sig?: React.FC};
const ToolSeq: React.FC<{d: TS; n: number}> = ({d, n}) => {
  const t = useT();
  const words = d.def.split(' ');
  const tot = words.reduce((s0, w) => s0 + w.length + 1, 0);
  let acc = 0;
  const fs = d.def.length > 95 ? 36 : d.def.length > 65 ? 40 : 44;
  return (
    <Ph a={d.a} b={d.b}>
      <div style={{position: 'absolute', left: 60, top: 480}}><TPicto id={d.id} size={290} draw={prog(t, d.a + 0.05, d.a + 1.6, (v: number) => v)} glow={t > d.a + 1.6 ? 0.35 + 0.25 * Math.sin((t - d.a) * 3) : 0} /></div>
      <Abs x={380} y={505} w={650}>
        <div style={{...CAP, fontSize: 22, color: d.c, opacity: pop(t, d.a + 0.2)}}>Outil {n} / 19 · {d.fam}</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: d.name.length > 12 ? 62 : 82, color: INK, lineHeight: 1.0, marginTop: 8, opacity: pop(t, d.a + 0.3), transform: `translateX(${(1 - pop(t, d.a + 0.3)) * 60}px)`}}>{d.name}</div>
        <div style={{marginTop: 14, height: 10, borderRadius: 5, background: d.c, width: 420 * prog(t, d.a + 0.4, d.a + 1.2)}} />
        <div style={{marginTop: 14, fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: DIM, opacity: pop(t, d.a + 0.7)}}>{d.tag}</div>
      </Abs>
      <Abs x={60} y={812} w={960} style={{display: 'flex', flexWrap: 'wrap', columnGap: fs * 0.28, rowGap: 4}}>
        {words.map((w, k) => { const at = d.da + ((d.de - d.da) * acc) / tot - 0.1; acc += w.length + 1; const p = Math.min(1, spring(t, at, 11, 16)); return <span key={k} style={{fontFamily: sansFont, fontWeight: 900, fontSize: fs, lineHeight: 1.15, color: INK, opacity: t >= at ? 1 : 0, transform: `translateY(${(1 - p) * 30}px)`, display: 'inline-block'}}>{w}</span>; })}
      </Abs>
      {d.Sig && <d.Sig />}
    </Ph>
  );
};

/* ═════════════ Signatures des outils (zone y ≈ 1000 → 1330) ═════════════ */
const Sig5S: React.FC = () => {
  const t = useT();
  const W5: [string, number][] = [['Débarrasser', 23.3], ['Ranger', 24.5], ['Nettoyer', 25.2], ['Standardiser', 25.9], ['Maintenir', 26.9]];
  return (
    <>
      <Abs x={60} y={1000} w={960} style={{display: 'flex', justifyContent: 'space-between', opacity: 1 - prog(t, 28.0, 28.4)}}>
        {W5.map(([l, a], k) => { const q = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0; return (
          <div key={l} style={{width: 180, height: 130, ...nb('#fff', 6), borderColor: NBK, boxShadow: `6px 6px 0 ${F2}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, transform: `translateY(${(1 - q) * 60}px)`, opacity: t > a ? 1 : 0}}>
            <div style={{width: 46, height: 46, borderRadius: 12, background: F2, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{k + 1}</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK}}>{l}</div>
          </div>
        ); })}
      </Abs>
      {t > 28.1 && <Photo src="amelioration-gen/atelier-5s.jpg" x={60} y={995} w={960} h={215} at={28.2} c={F2} pos="55% 30%" tag="5S AU POSTE" />}
      <Row3 y={1228}><TChip at={30.4} l="Efficacité" c={F2} ic="Zap" /><TChip at={31.6} l="Propreté" c={F2} ic="Sparkles" /><TChip at={32.3} l="Sécurité" c={F2} ic="ShieldCheck" /></Row3>
    </>
  );
};
const SigK3 = (h: number, a: number): React.FC => () => {
  const t = useT();
  const pr = prog(t, a + 0.9, a + 3.6, easeInOut);
  const kz = 'M 40 300 ' + Array.from({length: 14}, (_, i) => `L ${100 + i * 60} ${300 - i * 12} L ${100 + i * 60} ${288 - i * 12}`).join(' ');
  const P3 = [kz, 'M 40 300 L 430 300 L 430 120 L 900 120', 'M 40 300 C 250 300 330 240 460 225 M 500 170 C 640 160 760 80 900 40'];
  const C3 = [F2, '#0F6B3C', F6];
  const L3 = ['Kaizen · petits pas', 'Kaikaku · transformation radicale', 'Kakushin · rupture'];
  return (
    <Abs x={60} y={995} w={960} h={340} style={{...nb('#fff', 6), borderColor: NBK}}>
      <svg width={960} height={340} style={{position: 'absolute', left: 0, top: 0}}>
        <line x1={40} y1={310} x2={920} y2={310} stroke={NBK} strokeWidth={4} /><line x1={40} y1={310} x2={40} y2={20} stroke={NBK} strokeWidth={4} />
        {P3.map((d, k) => <path key={k} d={d} fill="none" stroke={k === h ? C3[k] : '#C9D2DF'} strokeWidth={k === h ? 9 : 5} strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={k === h ? 1 - pr : 0} />)}
        {h === 2 && pr > 0.55 && <line x1={460} y1={225} x2={500} y2={170} stroke={F6} strokeWidth={5} strokeDasharray="8 8" />}
      </svg>
      <div style={{position: 'absolute', left: 60, top: 18, display: 'flex', flexDirection: 'column', gap: 6}}>{L3.map((l, k) => <div key={l} style={{...CAP, fontSize: 18, color: k === h ? C3[k] : '#9AA3B2'}}>{k === h ? '● ' : '○ '}{l}</div>)}</div>
      {h === 0 && t > 41.4 && <div style={{position: 'absolute', right: 20, top: 120}}><TChip at={41.5} l="Des processus plus performants" c={F2} fs={24} ic="TrendingUp" /></div>}
      {h === 1 && t > 50.6 && <div style={{position: 'absolute', right: 20, top: 200}}><TChip at={50.7} l="Gains significatifs, rapides" c="#0F6B3C" fs={24} ic="Zap" /></div>}
      {h === 2 && t > 60.0 && <div style={{position: 'absolute', right: 20, top: 200}}><TChip at={60.1} l="Nouvelles technologies" c={F6} fs={24} ic="Lightbulb" /></div>}
    </Abs>
  );
};
const SigSipoc: React.FC = () => {
  const t = useT();
  const L5: [string, string, number][] = [['S', 'Fournisseurs', 67.9], ['I', 'Entrées', 69.1], ['P', 'Processus', 69.6], ['O', 'Sorties', 70.7], ['C', 'Clients', 71.4]];
  return (
    <>
      <Abs x={60} y={1000} w={960} style={{display: 'flex', justifyContent: 'space-between'}}>
        {L5.map(([ch, l, a], k) => { const q = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0; return (
          <div key={ch} style={{width: 176, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: t > a - 0.4 ? 1 : 0.25}}>
            <div style={{width: 150, height: 150, borderRadius: 24, ...nb(t > a ? F3 : '#fff', 7), borderColor: NBK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 100, color: t > a ? '#fff' : F3, transform: `scale(${0.85 + 0.15 * q})`}}>{ch}</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 25, color: INK, opacity: q}}>{l}</div>
          </div>
        ); })}
      </Abs>
      <Row3 y={1240}><TChip at={73.2} l="Une vision globale du processus" c={F3} ic="Eye" fs={28} /></Row3>
    </>
  );
};
const SigSmed: React.FC = () => {
  const t = useT();
  const w = lerp(780, 290, prog(t, 79.0, 80.5, easeInOut));
  return (
    <>
      <Abs x={60} y={1005} w={960}>
        {[['Avant', 780, '#9AA3B2'], ['Après', w, F3]].map(([l, ww, c], k) => (
          <div key={l as string} style={{display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18}}>
            <div style={{width: 130, ...CAP, fontSize: 22, color: INK}}>{l as string}</div>
            <div style={{height: 64, width: ww as number, borderRadius: 14, background: c as string, border: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', paddingLeft: 16, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 24, overflow: 'hidden', whiteSpace: 'nowrap'}}>{k ? '' : 'Changement de série'}</div>
            {k === 1 && t > 79.0 && <div style={{transform: `rotate(${(t - 79) * 200}deg)`}}><Ico n="Timer" size={54} c={F3} /></div>}
          </div>
        ))}
      </Abs>
      <Row3 y={1215}><TChip at={83.7} l="Moins d'arrêts de production" c={F3} fs={26} ic="TrendingDown" /><TChip at={86.4} l="Plus de flexibilité" c={F3} fs={26} ic="RefreshCw" /></Row3>
    </>
  );
};
const SigBench: React.FC = () => {
  const t = useT();
  const h1 = 150 * prog(t, 91.6, 92.4, easeOut), h2 = 270 * prog(t, 95.8, 96.6, easeOut);
  return (
    <Abs x={60} y={995} w={960} h={340}>
      <div style={{position: 'absolute', left: 230, bottom: 40, width: 170, height: h1, background: '#9AA3B2', border: `5px solid ${NBK}`, borderRadius: '10px 10px 0 0'}} />
      <div style={{position: 'absolute', left: 560, bottom: 40, width: 170, height: h2, background: F3, border: `5px solid ${NBK}`, borderRadius: '10px 10px 0 0'}} />
      <div style={{position: 'absolute', left: 160, bottom: 0, width: 310, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 24, opacity: pop(t, 93.8)}}>Notre organisation</div>
      <div style={{position: 'absolute', left: 490, bottom: 0, width: 310, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 24, opacity: pop(t, 96.0)}}>Références reconnues</div>
      {t > 98.5 && <><div style={{position: 'absolute', left: 420, bottom: 40 + h1, width: 120, height: h2 - h1, borderTop: `5px dashed ${F4}`, borderRight: `5px solid ${F4}`, opacity: pop(t, 98.6)}} /><div style={{position: 'absolute', right: 0, top: 0}}><TChip at={98.6} l="Axes de progrès" c={F4} fs={28} ic="TrendingUp" fill /></div></>}
    </Abs>
  );
};
const SigHeij: React.FC = () => {
  const t = useT();
  const lv = prog(t, 104.6, 105.7, easeInOut);
  const H0 = [210, 80, 240, 110, 190, 60, 170];
  return (
    <>
      <Abs x={60} y={995} w={960} h={215}>
        {H0.map((h, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 120, bottom: 0, width: 84, height: lerp(h, 145, lv), background: F3, border: `4px solid ${NBK}`, borderRadius: '8px 8px 0 0'}} />)}
        <div style={{position: 'absolute', left: 40, right: 40, bottom: 145, borderTop: `5px dashed ${F2}`, opacity: lv}} />
      </Abs>
      <Row3 y={1228} gap={14}><TChip at={108.8} l="Moins de fluctuations" c={F3} fs={24} /><TChip at={109.5} l="Moins de stocks" c={F3} fs={24} /><TChip at={110.1} l="Moins de surcharges" c={F3} fs={24} /></Row3>
    </>
  );
};
const SigHoshin: React.FC = () => {
  const t = useT();
  return (
    <Abs x={60} y={995} w={960} h={340}>
      <div style={{position: 'absolute', left: 280, top: 0, width: 400, height: 84, ...nb(F3, 6), borderColor: NBK, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1, sp(t, 114.8))})`}}>Objectifs de la direction</div>
      <svg width={960} height={340} style={{position: 'absolute', left: 0, top: 0}}>{[160, 480, 800].map((x, k) => <line key={x} x1={480} y1={90} x2={x} y2={180} stroke={NBK} strokeWidth={6} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(t, 115.4 + k * 0.1, 116.0 + k * 0.1)} />)}</svg>
      {[160, 480, 800].map((x, k) => { const a = 117.0 + k * 0.15; const q = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0; return (
        <div key={x} style={{position: 'absolute', left: x - 140, top: 185, width: 280, height: 140, ...nb('#fff', 6), borderColor: NBK, boxShadow: `6px 6px 0 ${F3}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, transform: `scale(${q})`, opacity: t > a ? 1 : 0}}>
          <div style={{...CAP, fontSize: 20, color: DIM}}>Service</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 27, color: INK}}>Actions concrètes</div>
        </div>
      ); })}
    </Abs>
  );
};
const SigQrqc: React.FC = () => (
  <>
    <Photo src="amelioration-gen/qrqc-reunion.jpg" x={60} y={1000} w={960} h={205} at={121.6} c={F4} pos="50% 25%" tag="SUR LE TERRAIN" />
    <Row3 y={1225} gap={14}><TChip at={125.3} l="Réactivité" c={F4} fs={25} ic="Zap" /><TChip at={125.9} l="Analyse des faits" c={F4} fs={25} ic="Search" /><TChip at={127.1} l="Actions correctives immédiates" c={F4} fs={25} ic="Wrench" /></Row3>
  </>
);
const Sig8D: React.FC = () => {
  const t = useT();
  return (
    <>
      <Abs x={60} y={1005} w={960} style={{display: 'flex', justifyContent: 'space-between'}}>
        {Array.from({length: 8}, (_, k) => { const a = 132.3 + k * 0.16; const on = t > a; return <div key={k} style={{width: 100, height: 100, borderRadius: '50%', ...nb(on ? F4 : '#fff', 5), borderColor: NBK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: on ? '#fff' : '#9AA3B2', transform: `scale(${on ? 1 + 0.15 * Math.max(0, 1 - (t - a) / 0.3) : 0.9})`}}>D{k + 1}</div>; })}
      </Abs>
      <Row3 y={1150} gap={14}><TChip at={133.6} l="Problèmes complexes ou récurrents" c={F4} fs={25} /><TChip at={137.2} l="Cause racine" c={F4} fs={25} ic="Target" fill /><TChip at={137.9} l="Éviter la réapparition" c={F4} fs={25} ic="ShieldCheck" /></Row3>
    </>
  );
};
const SigPareto: React.FC = () => {
  const t = useT();
  const H = [250, 180, 120, 85, 60, 40, 26, 16];
  const tot = H.reduce((a, b) => a + b, 0);
  let cum = 0;
  const pts = H.map((h, k) => { cum += h; return `${70 + k * 110 + 40},${300 - (cum / tot) * 270}`; });
  const cv = prog(t, 143.6, 144.9);
  return (
    <Abs x={60} y={995} w={960} h={340} style={{...nb('#fff', 6), borderColor: NBK}}>
      {H.map((h, k) => { const a = 142.7 + k * 0.1; return <div key={k} style={{position: 'absolute', left: 70 + k * 110, bottom: 30, width: 80, height: h * prog(t, a, a + 0.4, easeOut), background: k < 2 && t > 145.8 ? F4 : '#E9A39E', border: `3px solid ${NBK}`, borderRadius: '6px 6px 0 0'}} />; })}
      <svg width={960} height={340} style={{position: 'absolute', left: 0, top: 0}}><polyline points={`70,${300} ` + pts.join(' ')} fill="none" stroke={NBK} strokeWidth={5} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - cv} /></svg>
      {t > 145.8 && <div style={{position: 'absolute', left: 300, top: 20}}><TChip at={145.9} l="Concentrer les efforts ici" c={F4} fs={26} ic="Target" fill /></div>}
    </Abs>
  );
};
const SigFish: React.FC = () => {
  const t = useT();
  const B: [number, number, number, number, string, number][] = [[200, 40, 300, 165, "Main d'œuvre", 154.8], [420, 40, 520, 165, 'Méthode', 156.1], [640, 40, 740, 165, 'Matière', 156.6], [260, 290, 360, 165, 'Matériel', 157.3], [520, 290, 620, 165, 'Milieu', 158.2]];
  return (
    <Abs x={60} y={995} w={960} h={340}>
      <svg width={960} height={340} style={{position: 'absolute', left: 0, top: 0}}>
        <line x1={60} y1={165} x2={790} y2={165} stroke={NBK} strokeWidth={9} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(t, 151.2, 152.4)} />
        {B.map(([x1, y1, x2, y2, l, a]) => <line key={l} x1={x1} y1={y1} x2={x2} y2={y2} stroke={F4} strokeWidth={7} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(t, a - 0.3, a + 0.2)} />)}
      </svg>
      <div style={{position: 'absolute', left: 790, top: 120, width: 170, height: 90, ...nb(F4, 6), borderColor: NBK, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: t > 162.0 ? 22 : 26, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', opacity: pop(t, 151.6)}}>{t > 162.0 ? 'Non-conformité' : 'Problème'}</div>
      {B.map(([x1, y1, , , l, a]) => t > a - 0.1 ? <div key={`l${l}`} style={{position: 'absolute', left: x1 - 90, top: y1 < 100 ? y1 - 40 : y1 + 2, width: 180, textAlign: 'center'}}><TChip at={a} l={l} c={F4} fs={22} /></div> : null)}
    </Abs>
  );
};
const SigWhy: React.FC = () => {
  const t = useT();
  return (
    <Abs x={60} y={990} w={960} h={350}>
      {Array.from({length: 5}, (_, k) => { const a = 167.9 + k * 0.28; return t > a - 0.05 ? <div key={k} style={{position: 'absolute', left: k * 120, top: k * 50}}><TChip at={a} l={`Pourquoi ? ${k + 1}`} c={F4} fs={24} /></div> : null; })}
      {t > 170.7 && <div style={{position: 'absolute', left: 640, top: 230}}><TChip at={170.8} l="Cause racine" c={F4} fs={32} ic="Target" fill /></div>}
      {t > 173.7 && <div style={{position: 'absolute', left: 620, top: 10}}><TChip at={173.8} l="Pas seulement les symptômes" c={NAVY} fs={22} /></div>}
    </Abs>
  );
};
const SigVsm: React.FC = () => {
  const t = useT();
  return (
    <Abs x={60} y={990} w={960} h={350}>
      {[0, 1, 2, 3].map((k) => <div key={k} style={{position: 'absolute', left: 20 + k * 250, top: 120, width: 170, height: 96, ...nb('#fff', 6), borderColor: NBK, boxShadow: `6px 6px 0 ${F5}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, opacity: pop(t, 177.2 + k * 0.15)}}>Étape</div>)}
      <svg width={960} height={350} style={{position: 'absolute', left: 0, top: 0}}>
        {[0, 1, 2].map((k) => <line key={k} x1={195 + k * 250} y1={168} x2={265 + k * 250} y2={168} stroke={F5} strokeWidth={12} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(t, 182.4 + k * 0.1, 182.8 + k * 0.1)} />)}
        <path d="M 105 60 L 855 60" stroke={NBK} strokeWidth={4} strokeDasharray="12 10" opacity={prog(t, 182.8, 183.2)} />
        {[0, 1, 2, 3].map((k) => <line key={`i${k}`} x1={105 + k * 250} y1={60} x2={105 + k * 250} y2={115} stroke={NBK} strokeWidth={4} strokeDasharray="8 8" opacity={prog(t, 182.9, 183.3)} />)}
      </svg>
      <div style={{position: 'absolute', left: 300, top: 18, ...CAP, fontSize: 18, color: INK, opacity: pop(t, 182.8)}}>Flux d'information</div>
      <div style={{position: 'absolute', left: 20, top: 232, ...CAP, fontSize: 18, color: F5, opacity: pop(t, 182.4)}}>Flux de matière</div>
      {[0, 1, 2].map((k) => t > 185.3 ? <div key={`w${k}`} style={{position: 'absolute', left: 205 + k * 250, top: 230, width: 0, height: 0, borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderBottom: `38px solid ${F4}`, transform: `scale(${Math.min(1, sp(t, 185.4 + k * 0.1))})`}} /> : null)}
      {t > 186.2 && <div style={{position: 'absolute', left: 560, top: 280}}><TChip at={186.3} l="Gaspillages · sans valeur ajoutée" c={F4} fs={22} fill /></div>}
    </Abs>
  );
};
const SigKanban: React.FC = () => {
  const t = useT();
  const col = t < 191.5 ? 0 : t < 192.8 ? lerp(0, 1, prog(t, 191.5, 192.1, easeInOut)) : lerp(1, 2, prog(t, 192.8, 193.4, easeInOut));
  return (
    <>
      <Abs x={60} y={995} w={960} h={215} style={{...nb('#fff', 6), borderColor: NBK}}>
        {['À produire', 'En cours', 'Livré'].map((l, k) => <div key={l} style={{position: 'absolute', left: k * 320, top: 0, width: 320, height: 215, borderLeft: k ? `3px solid ${NBK}` : 'none'}}><div style={{...CAP, fontSize: 18, color: DIM, padding: '10px 14px'}}>{l}</div></div>)}
        {[[0, 60], [0, 130], [1, 130], [2, 130]].map(([c0, y], k) => <div key={k} style={{position: 'absolute', left: 30 + c0 * 320, top: y, width: 250, height: 54, borderRadius: 10, background: '#E4DDF7', border: `3px solid ${NBK}`}} />)}
        <div style={{position: 'absolute', left: 30 + col * 320, top: 60, width: 250, height: 54, borderRadius: 10, background: F5, border: `3px solid ${NBK}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 ${t > 191.4 ? 18 : 0}px ${F5}`}}>Besoin réel</div>
      </Abs>
      <Row3 y={1228}><TChip at={195.9} l="Limiter les stocks" c={F5} fs={26} ic="TrendingDown" /><TChip at={196.8} l="Éviter les ruptures" c={F5} fs={26} ic="ShieldCheck" /></Row3>
    </>
  );
};
const SigPpm: React.FC = () => {
  const t = useT();
  return (
    <>
      <Abs x={60} y={995} w={960} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
        <div style={{...nb('#fff', 6), borderColor: NBK, boxShadow: `6px 6px 0 ${F4}`, padding: '10px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 34, opacity: pop(t, 201.4)}}>Pièces non conformes</div>
        <div style={{width: 700 * prog(t, 202.0, 202.5), height: 10, borderRadius: 5, background: NBK}} />
        <div style={{...nb('#fff', 6), borderColor: NBK, boxShadow: `6px 6px 0 ${F5}`, padding: '10px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, opacity: pop(t, 202.4)}}>Un million de pièces produites ou contrôlées</div>
      </Abs>
      <Row3 y={1228} gap={14}><TChip at={205.4} l="Selon le périmètre défini" c={F5} fs={24} /><TChip at={207.6} l="Suivre la performance qualité" c={F5} fs={24} ic="TrendingUp" fill /></Row3>
    </>
  );
};
const SigDmaic: React.FC = () => {
  const t = useT();
  const mg = prog(t, 216.9, 217.6, easeInOut);
  const DM: [string, string, number][] = [['D', 'Définir', 220.9], ['M', 'Mesurer', 221.7], ['A', 'Analyser', 222.6], ['I', 'Améliorer', 223.5], ['C', 'Contrôler', 224.2]];
  return (
    <>
      <Abs x={60} y={995} w={960} h={110}>
        <div style={{position: 'absolute', left: lerp(0, 40, mg), top: 0, width: 440, height: 100, ...nb('#fff', 6), borderColor: NBK, boxShadow: `6px 6px 0 ${F2}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 213.2)}}><div style={{...CAP, fontSize: 22, color: F2}}>Lean</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26}}>Élimination des gaspillages</div></div>
        <div style={{position: 'absolute', right: lerp(0, 40, mg), top: 0, width: 440, height: 100, ...nb('#fff', 6), borderColor: NBK, boxShadow: `6px 6px 0 ${F5}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 215.2)}}><div style={{...CAP, fontSize: 22, color: F5}}>Six Sigma</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26}}>Moins de variabilité</div></div>
      </Abs>
      <Abs x={60} y={1130} w={960} style={{display: 'flex', justifyContent: 'space-between'}}>
        {DM.map(([ch, l, a]) => { const q = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0; return <div key={ch} style={{width: 180, height: 170, ...nb(t > a ? F5 : '#fff', 6), borderColor: NBK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, transform: `scale(${0.85 + 0.15 * q})`, opacity: t > a - 1.5 ? 1 : 0.3}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: t > a ? '#fff' : F5, lineHeight: 1}}>{ch}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: t > a ? '#fff' : INK}}>{l}</div></div>; })}
      </Abs>
    </>
  );
};
const Sig5G: React.FC = () => {
  const t = useT();
  const G: [string, number, string, number][] = [['Genba', 229.9, 'Lieu réel', 236.1], ['Genbutsu', 230.3, 'Produit réel', 237.0], ['Genjitsu', 231.3, 'Les faits', 237.8], ['Genri', 232.3, 'Les principes', 239.2], ['Gensoku', 233.2, 'Les standards', 240.0]];
  return (
    <>
      <Abs x={60} y={995} w={960} style={{display: 'flex', justifyContent: 'space-between'}}>
        {G.map(([j, a, f, b]) => (
          <div key={j} style={{width: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
            <div style={{width: 180, height: 84, ...nb(t > a ? F6 : '#fff', 6), borderColor: NBK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: t > a ? '#fff' : '#9AA3B2', transform: `scale(${t > a ? Math.min(1, sp(t, a)) : 0.9})`}}>{j}</div>
            <div style={{width: 6, height: 40 * prog(t, b - 0.3, b), background: NBK}} />
            <div style={{width: 180, height: 84, ...nb('#fff', 6), borderColor: NBK, boxShadow: `6px 6px 0 ${F6}`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK, opacity: t > b ? 1 : 0, transform: `translateY(${t > b ? (1 - Math.min(1, sp(t, b))) * 30 : 30}px)`}}>{f}</div>
          </div>
        ))}
      </Abs>
      <Row3 y={1262}><TChip at={242.7} l="Des éléments concrets" c={F6} fs={26} ic="BadgeCheck" fill /></Row3>
    </>
  );
};

/* ═════════════ Données des 19 outils (temps de la voix d'origine) ═════════════ */
const TOOLS: TS[] = [
  {id: 'T5S', name: '5S', tag: 'Organiser le poste de travail', fam: 'Organiser et améliorer', c: F2, a: 19.4, b: 32.85, da: 19.3, de: 22.9, def: "Méthode d'organisation du poste de travail reposant sur 5 principes", Sig: Sig5S},
  {id: 'KAI', name: 'Kaizen', tag: 'Les petits pas réguliers', fam: 'Organiser et améliorer', c: F2, a: 32.85, b: 45.6, da: 35.1, de: 39.7, def: "Démarche d'amélioration continue fondée sur de petites améliorations régulières impliquant tous les collaborateurs", Sig: SigK3(0, 32.85)},
  {id: 'KAK', name: 'Kaikaku', tag: 'La transformation radicale', fam: 'Organiser et améliorer', c: F2, a: 45.6, b: 53.4, da: 46.9, de: 52.4, def: "Méthode de transformation radicale d'un processus, pour des améliorations significatives en un temps relativement court", Sig: SigK3(1, 45.6)},
  {id: 'KSH', name: 'Kakushin', tag: "L'innovation de rupture", fam: 'Organiser et améliorer', c: F2, a: 53.4, b: 62.45, da: 54.0, de: 61.9, def: "Approche axée sur l'innovation et la rupture avec les pratiques existantes : nouvelles technologies, nouveaux procédés", Sig: SigK3(2, 53.4)},
  {id: 'SIP', name: 'SIPOC', tag: 'Cartographier le processus', fam: 'Cartographier et fluidifier', c: F3, a: 64.2, b: 75.6, da: 64.5, de: 71.4, def: "Outil de cartographie qui identifie fournisseurs, entrées, étapes du processus, sorties et clients", Sig: SigSipoc},
  {id: 'SMD', name: 'SMED', tag: 'Changer de série plus vite', fam: 'Cartographier et fluidifier', c: F3, a: 75.6, b: 87.5, da: 76.0, de: 81.6, def: "Méthode visant à réduire le temps de changement de série ou de format sur une machine", Sig: SigSmed},
  {id: 'BEN', name: 'Benchmarking', tag: 'Se comparer aux références', fam: 'Cartographier et fluidifier', c: F3, a: 87.5, b: 100.7, da: 90.6, de: 96.7, def: "Démarche consistant à comparer performances et pratiques avec celles d'autres entreprises ou de références reconnues", Sig: SigBench},
  {id: 'HEI', name: 'Heijunka', tag: 'Niveler la production', fam: 'Cartographier et fluidifier', c: F3, a: 100.7, b: 111.2, da: 102.4, de: 106.2, def: "Méthode de nivellement de la production pour répartir la charge de travail de manière régulière", Sig: SigHeij},
  {id: 'HOS', name: 'Hoshin Kanri', tag: 'Déployer la stratégie', fam: 'Cartographier et fluidifier', c: F3, a: 111.2, b: 118.65, da: 112.7, de: 118.0, def: "Méthode de déploiement stratégique qui traduit les objectifs de la direction en actions concrètes pour les services", Sig: SigHoshin},
  {id: 'QRQ', name: 'QRQC', tag: 'Réagir vite, sur le terrain', fam: 'Résoudre les problèmes', c: F4, a: 120.3, b: 129.3, da: 120.4, de: 124.2, def: "Méthode de résolution rapide des problèmes qualité, directement sur le terrain", Sig: SigQrqc},
  {id: 'D8', name: '8D', tag: 'Résoudre en 8 disciplines', fam: 'Résoudre les problèmes', c: F4, a: 129.3, b: 140.2, da: 130.7, de: 135.5, def: "Démarche structurée en 8 disciplines pour résoudre les problèmes complexes ou récurrents", Sig: Sig8D},
  {id: 'PAR', name: 'Pareto', tag: 'Hiérarchiser les problèmes', fam: 'Résoudre les problèmes', c: F4, a: 140.2, b: 149.0, da: 141.4, de: 145.1, def: "Outil d'analyse qui hiérarchise les problèmes selon leur fréquence ou leur impact", Sig: SigPareto},
  {id: 'ISH', name: 'Ishikawa', tag: 'Les causes en 5M', fam: 'Résoudre les problèmes', c: F4, a: 149.0, b: 165.6, da: 151.0, de: 154.7, def: "Outil d'analyse des causes d'un problème, souvent structuré autour des 5M", Sig: SigFish},
  {id: 'WHY', name: '5 Pourquoi', tag: 'Remonter à la cause racine', fam: 'Résoudre les problèmes', c: F4, a: 165.6, b: 174.85, da: 166.6, de: 171.6, def: "Poser successivement la question « Pourquoi ? » pour remonter à la cause racine d'un problème", Sig: SigWhy},
  {id: 'VSM', name: 'VSM', tag: 'Cartographier la valeur', fam: 'Piloter les flux', c: F5, a: 176.6, b: 187.6, da: 176.9, de: 183.6, def: "Value Stream Mapping : cartographie de la chaîne de valeur, des flux de matière et d'information", Sig: SigVsm},
  {id: 'KAN', name: 'Kanban', tag: 'Produire selon le besoin', fam: 'Piloter les flux', c: F5, a: 187.6, b: 198.5, da: 189.3, de: 194.7, def: "Système de gestion visuel des flux qui déclenche production ou réapprovisionnement selon les besoins réels", Sig: SigKanban},
  {id: 'PPM', name: 'PPM', tag: 'Mesurer la non-qualité', fam: 'Piloter les flux', c: F5, a: 198.5, b: 210.6, da: 199.6, de: 204.0, def: "Indicateur : nombre de pièces non conformes par million de pièces produites ou contrôlées", Sig: SigPpm},
  {id: 'LSS', name: 'Lean Six Sigma', tag: 'Gaspillages et variabilité', fam: 'Piloter les flux', c: F5, a: 210.6, b: 224.55, da: 212.2, de: 216.9, def: "Méthodologie qui combine l'élimination des gaspillages et la réduction de la variabilité des processus", Sig: SigDmaic},
  {id: 'G5', name: '5G', tag: 'Le terrain avant tout', fam: 'Sur le terrain', c: F6, a: 226.4, b: 244.4, da: 226.7, de: 229.0, def: "Méthodes d'analyse basées sur le terrain", Sig: Sig5G},
];
const famScene = (ids: string[], end: number): React.FC => () => {
  const list = TOOLS.filter((d) => ids.includes(d.id));
  return (
    <Out end={end}>
      <Heads h={list.map((d) => [d.a, [d.name, d.tag], [1]] as HD)} />
      {list.map((d) => <ToolSeq key={d.id} d={d} n={TOOLS.indexOf(d) + 1} />)}
    </Out>
  );
};
const Fam2 = famScene(['T5S', 'KAI', 'KAK', 'KSH'], 62.5);
const Fam3 = famScene(['SIP', 'SMD', 'BEN', 'HEI', 'HOS'], 118.7);
const Fam4 = famScene(['QRQ', 'D8', 'PAR', 'ISH', 'WHY'], 174.9);
const Fam5 = famScene(['VSM', 'KAN', 'PPM', 'LSS'], 224.6);

/* ═════════════ Guichet 1 : introduction — carrousel convergent, bénéfices, recherche ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const B4: [string, number, string][] = [['Optimiser les processus', 7.9, 'Workflow'], ['Réduire les gaspillages', 9.1, 'TrendingDown'], ['Améliorer la qualité', 10.3, 'BadgeCheck'], ['Accroître la productivité', 12.1, 'TrendingUp']];
  return (
    <Out end={17.7}>
      <Heads h={[[2.9, ['Un pilier de la', 'performance industrielle'], [1]], [7.2, ['Des outils pour', 'progresser'], [1]], [12.7, ['Les principaux', 'outils'], [1]]]} />
      <Ph a={2.65} b={7.0}><TRing a={2.7} b={6.95} cy={880} /></Ph>
      <Ph a={7.0} b={12.65}>
        <Abs x={60} y={620} w={960} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28}}>
          {B4.map(([l, a, ic], k) => { const q = t > a ? Math.min(1, sp(t, a, 8, 12)) : 0; return (
            <div key={l} style={{height: 290, ...nb('#fff', 7), borderColor: NBK, boxShadow: `7px 7px 0 ${[F3, F4, F2, F5][k]}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, transform: `translateY(${(1 - q) * 80}px) scale(${0.85 + 0.15 * q})`, opacity: t > a ? 1 : 0.15}}>
              <Ico n={ic} size={110} c={[F3, F4, F2, F5][k]} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK, textAlign: 'center', lineHeight: 1.1, padding: '0 20px'}}>{l}</div>
            </div>
          ); })}
        </Abs>
      </Ph>
      <Ph a={12.65} b={17.7}>
        <SearchOpen x={60} y={450} w={960} h={880} at={12.7} query="outils amélioration continue" results={["Les 19 outils de l'amélioration continue", 'Lean · Kaizen · 5S']} found={0} foundAt={13.6} clickAt={14.2} c={F2}>
          <div style={{position: 'absolute', inset: 0, background: '#FAFAF7'}}>
            {T_IDS.map((id, k) => <div key={id} style={{position: 'absolute', left: 25 + (k % 5) * 185, top: 30 + Math.floor(k / 5) * 170}}><TPicto id={id} size={150} draw={prog(t, 14.7 + k * 0.08, 15.6 + k * 0.08, (v: number) => v)} /></div>)}
          </div>
        </SearchOpen>
      </Ph>
    </Out>
  );
};

/* ═════════════ Guichet 6 : 5G + conclusion ═════════════ */
const Fam6: React.FC = () => {
  const t = useT();
  const g5 = TOOLS[18];
  return (
    <Out end={OUTRO_AT}>
      <Heads h={[[g5.a, [g5.name, g5.tag], [1]], [244.4, ['Un véritable atout', 'pour les professionnels'], [0]], [252.8, ["L'amélioration continue :", 'une culture'], [1]]]} />
      <ToolSeq d={g5} n={19} />
      <Ph a={244.4} b={252.75}>
        <Photo src="vingt-gen/final.jpg" x={60} y={470} w={960} h={500} at={244.6} c={F6} pos="50% 45%" tag="UN VÉRITABLE ATOUT" />
        <Row3 y={1020} gap={16}><TChip at={249.6} l="Qualité" c={F2} fs={34} /><TChip at={250.1} l="QHSE" c={F3} fs={34} /><TChip at={251.0} l="Production" c={F4} fs={34} /><TChip at={251.9} l="Maintenance" c={F5} fs={34} /></Row3>
      </Ph>
      <Ph a={252.75} b={OUTRO_AT}>
        <TRing a={252.8} b={OUTRO_AT + 2} cy={810} conv={false} size={135} R0={400} />
        {t > 254.6 && <Abs x={0} y={1060} w={1080} style={{display: 'flex', justifyContent: 'center', zIndex: 8}}><SlamCard at={254.8} lines={['UNE CULTURE']} c={F2} size={66} /></Abs>}
        <Row3 y={1220} gap={14}><TChip at={255.9} l="Problèmes" c={F4} fs={30} /><TChip at={256.6} l="→ opportunités de progrès" c={F2} fs={30} fill /></Row3>
        {t > 259.0 && <Abs x={0} y={470} w={1080} style={{display: 'flex', justifyContent: 'center', zIndex: 8}}><NBadge at={259.1} text="Performance industrielle" bg={NAVY} rot={-2} size={34} /></Abs>}
      </Ph>
    </Out>
  );
};

/** Couverture : les 19 pictogrammes d'outils qui se dessinent + titre en lettres-photos animées. */
const ICover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Bg />
      <Abs x={0} y={40} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.14)'}}><Img src={staticFile(LOGO)} style={{height: 76, display: 'block'}} /></div></Abs>
      {T_IDS.map((id, k) => { const x = 140 + (k % 5) * 200, y = 250 + Math.floor(k / 5) * 182 + (k >= 15 ? 0 : 0); const xx = k >= 15 ? 240 + (k - 15) * 200 : x; return <div key={id} style={{position: 'absolute', left: xx - 80, top: y - 80 + Math.sin(t * 2 + k) * 4}}><TPicto id={id} size={160} draw={prog(t, 0.05 + k * 0.05, 0.95 + k * 0.05, (v: number) => v)} /></div>; })}
      <Abs x={0} y={1010} w={1080} style={{display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap'}}><PhotoLetterAnim ch="LES OUTILS DE" src={IMG.c1} size={100} ls={3} seed={3} /></Abs>
      <Abs x={0} y={1125} w={1080} style={{display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap'}}><PhotoLetterAnim ch="L'AMÉLIORATION CONTINUE" src={IMG.c2} size={66} ls={2} seed={6} /></Abs>
      <Abs x={0} y={1225} w={1080} style={{textAlign: 'center'}}><span style={{fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: DIM}}>19 OUTILS · PERFORMANCE INDUSTRIELLE</span></Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Montage, bruitage ═════════════ */
const TK = 1.8;
const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1 / TK, 4, 0.18 / TK, 'sfx/ding', 0.12), {at: x.at + 0.45 / TK, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95 / TK, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6 / TK, s: 'sfx/pop', v: 0.2}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len / 2), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const POPS = [7.9, 9.1, 10.3, 12.1, 23.3, 24.5, 25.2, 25.9, 26.9, 30.4, 31.6, 32.3, 41.5, 50.7, 60.1, 67.9, 69.1, 69.6, 70.7, 71.4, 73.2, 83.7, 86.4, 91.6, 96.0, 98.6, 108.8, 109.5, 110.1, 114.8, 117.0, 117.15, 117.3, 125.3, 125.9, 127.1, 133.6, 137.2, 137.9, 145.9, 154.8, 156.1, 156.6, 157.3, 158.2, 162.1, 170.8, 173.8, 185.4, 186.3, 194.4, 195.9, 196.8, 201.4, 202.4, 205.4, 207.6, 213.2, 215.2, 220.9, 221.7, 222.6, 223.5, 224.2, 229.9, 230.3, 231.3, 232.3, 233.2, 236.1, 237.0, 237.8, 239.2, 240.0, 242.7, 249.6, 250.1, 251.0, 251.9, 255.9, 256.6, 259.1];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at + 0.15, s: 'sfx/bell', v: 0.14})),
  ...TOOLS.map((d) => ({at: d.a + 0.05, s: 'stylo', v: 0.26, dur: 1.2})), ...TOOLS.map((d) => ({at: d.a + 1.6, s: 'sfx/ding', v: 0.16})),
  ...POPS.map((at) => ({at, s: 'sfx/pop', v: 0.18})),
  {at: 2.7, s: 'riser', v: 0.18, dur: 3.6}, {at: 6.8, s: 'bass-hit', v: 0.35}, ...searchCues(12.7, 28, 13.6, 14.2),
  {at: 79.0, s: 'tick', v: 0.1, dur: 1.4}, {at: 104.6, s: 'sfx/swish', v: 0.25}, ...rep(132.3, 8, 0.16, 'sfx/click', 0.2), {at: 143.6, s: 'sfx/swish', v: 0.22}, {at: 151.2, s: 'sfx/swish', v: 0.22},
  ...rep(167.9, 5, 0.28, 'sfx/click', 0.2), {at: 182.4, s: 'sfx/swish', v: 0.22}, {at: 191.5, s: 'sfx/swish', v: 0.22}, {at: 192.8, s: 'sfx/swish', v: 0.22}, {at: 216.9, s: 'bass-hit', v: 0.3},
  {at: 252.8, s: 'riser', v: 0.16, dur: 2}, {at: 254.8, s: 'tampon', v: 0.42},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];
const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SCN: [React.FC, number, number][] = [[Intro, 2.6, 17.75], [Fam2, 19.3, 62.55], [Fam3, 64.1, 118.75], [Fam4, 120.2, 174.95], [Fam5, 176.5, 224.65], [Fam6, 226.3, OUTRO_AT]];
export const OutilsAmeliorationMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    {SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7 / TK}><TimeWarp.Provider value={{at: x.at, k: TK}}><C i={i} /></TimeWarp.Provider></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><ICover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-outils-amelioration-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u2 = [wn, Avatar, Ring3D, SlamTag, Arrow, slamK, CAP, STAGE, SCAN, RING_ISO, Drum, Marked, Announce, MBadge, RailSteps, StairSteps, ZigSteps, QBubble, Grid15, RameWipe, Forklift, ICO, MC, ACR, lin, hexMix, cl, GyroFlash, Hot, Photo, Pill2, F2, F3, F4, F5, F6, TINK, TP, T_IDS, TEl, TPicto, TRing, Ph, TChip, Row3, SlamCard, ToolSeq, TOOLS, sq5];

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn, Barred, Flap];
