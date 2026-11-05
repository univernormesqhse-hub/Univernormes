import React from 'react';
import {loadFont} from '@remotion/fonts';
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
 * « L'analyse et la matrice SWOT » (voix d'origine, 3 min 05) — capsule « condensé de toutes les techniques + effet
 * wahou + ultra premium » en métro (18 stations). Tube de verre à sept guichets (introduction → étape 1 analyse →
 * étape 2 matrice → forces et faiblesses → opportunités et menaces → quatre stratégies → bilan), capsule qui file d'un
 * guichet à l'autre, gyrophare resserré par TimeWarp, barre de recherche qui ouvre les deux étapes en néon. Police
 * Cambria (repli Caladea). Couverture : « SWOT » en relief 3D à face lettres-photos + titre en lettres-photos animées.
 * Vingt-cinq techniques nouvelles : particules en matrice de points qui forment SWOT, relief 3D qui suit la lumière,
 * enseignes néon qui grésillent, scanner à rayons X, cellule à membrane vivante (interne / externe), puzzle qui
 * s'emboîte, origami qui se déplie en quadrants, tissage des fils internes × externes, carte au trésor vers la
 * décision, écran éclaté en quatre quadrants, jauge de puissance liquide, fissures qui se propagent puis réparation
 * en or (kintsugi), longue-vue qui balaie l'horizon, orage et éclairs, effet domino, rideau de théâtre, remplissage
 * liquide des cases, échiquier stratégique, fusée offensive, remparts et flèches qui ricochent, morphing de forme
 * SVG, bouée de sauvetage sur les vagues, zoom infini (effet Droste), carrousel rotatif des lettres SWOT, boussole
 * stratégique, fuites de lumière. Sous-titres NeoCaptions sur la voix d'origine, sans musique.
 */
const IMG = {
  cover: 'swot/postits.jpg',
  c1: 'iso26/courbe-strategie.jpg',
  c2: 'sysqsse-gen/reunion.jpg',
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
const OUTRO_AT = 184.6;
export const SWOT_MATRICE_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '0', title: 'La méthode SWOT', s: 'Analyse · matrice', c: NAVY, g: 'intro', k: 'none', lab: 'GUICHET 1 / 7'},
  {at: 14.8, n: '1', title: 'Analyse SWOT', s: 'Étape 1 · facteurs internes et externes', c: '#1F5FAF', g: 'analyse', k: 'gyro', lab: 'GUICHET 2 / 7 · ÉTAPE 1'},
  {at: 38.75, n: '2', title: 'Matrice SWOT', s: 'Étape 2 · croiser pour décider', c: '#6C4BD8', g: 'matrice', k: 'gyro', lab: 'GUICHET 3 / 7 · ÉTAPE 2'},
  {at: 67.65, n: '3', title: 'Forces, faiblesses', s: 'Facteurs internes · S et W', c: '#E8912D', g: 'interne', k: 'gyro', lab: 'GUICHET 4 / 7'},
  {at: 92.6, n: '4', title: 'Opportunités, menaces', s: 'Facteurs externes · O et T', c: '#1E9E5A', g: 'externe', k: 'gyro', lab: 'GUICHET 5 / 7'},
  {at: 114.65, n: '5', title: 'Quatre stratégies', s: 'Offensives · défensives · adaptatives · survie', c: '#2E86DE', g: 'stratégies', k: 'gyro', lab: 'GUICHET 6 / 7'},
  {at: 171.3, n: '✓', title: 'En résumé', s: 'Une méthode structurée', c: BURG, g: 'bilan', k: 'gyro', lab: 'GUICHET 7 / 7'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 184.0;
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
  const sx = (k: number) => 70 + k * (870 / (SECT.length - 1));
  const a = si >= 0 ? SECT[si].at : 0;
  const pr = si < 0 ? 0 : prog(t, a, a + 1.4, easeInOut);
  const from = si <= 0 ? -0.45 : si - 1;
  const to = si < 0 ? -0.45 : si;
  const pos = lerp(from, to, pr);
  const x0 = Math.floor(pos);
  const cx = pos < 0 ? lerp(20, sx(0), pos + 1) : lerp(sx(x0), sx(Math.min(SECT.length - 1, x0 + 1)), pos - x0);
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
                <div style={{position: 'absolute', left: -50, width: 144, top: 50, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 14, color: here ? x.c : passed ? GREEN : '#A9B1BE'}}>{x.g}</div>
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
  {n: 1, l: 'Deux étapes', s: '2 étapes', at: 9.2},
  {n: 2, l: 'Facteurs internes', s: 'Internes', at: 21.2},
  {n: 3, l: 'Facteurs externes', s: 'Externes', at: 22.3},
  {n: 4, l: "Vision d'ensemble", s: 'Ensemble', at: 35.2},
  {n: 5, l: 'Croiser', s: 'Croiser', at: 44.6},
  {n: 6, l: 'Capitaliser', s: 'Capital.', at: 51.4},
  {n: 7, l: 'Transformer', s: 'Transf.', at: 57.0},
  {n: 8, l: 'Décision', s: 'Décision', at: 66.2},
  {n: 9, l: 'Forces', s: 'Forces', at: 71.4},
  {n: 10, l: 'Faiblesses', s: 'Faibl.', at: 83.8},
  {n: 11, l: 'Opportunités', s: 'Opport.', at: 94.5},
  {n: 12, l: 'Menaces', s: 'Menaces', at: 104.2},
  {n: 13, l: 'Croisement', s: 'Croisem.', at: 122.4},
  {n: 14, l: 'Stratégies offensives', s: 'Offens.', at: 134.0},
  {n: 15, l: 'Stratégies défensives', s: 'Défens.', at: 144.6},
  {n: 16, l: 'Stratégies adaptatives', s: 'Adapt.', at: 152.2},
  {n: 17, l: 'Stratégies de survie', s: 'Survie', at: 161.5},
  {n: 18, l: 'Bilan', s: 'Bilan', at: 173.1},
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
      {STATIONS.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: sx(k) - 26, width: 52, top: 62, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 10.5, color: k === cur ? BURG : DIM}}>{x.s}</div>)}
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE SWOT · STATION {r.n} / 18</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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


/* ═════════════ Repris du film des sigles : révélation à l'encre, définition mot à mot, pastille d'axe, bandeau ═════════════ */
const par = (pos: string) => { const v = pos.split(' ').map((x) => (x === 'center' ? 50 : parseFloat(x))); const f = (n: number) => (n < 34 ? 'Min' : n > 66 ? 'Max' : 'Mid'); return `x${f(v[0] ?? 50)}Y${f(v[1] ?? v[0] ?? 50)} slice`; };
const ZInk: React.FC<{src: string; x: number; y: number; w: number; h: number; at: number; c: string; pos?: string; tag?: string; dur?: number}> = ({src, x, y, w, h, at, c, pos = 'center', tag, dur = 1.1}) => {
  const t = useT();
  if (t < at) return null;
  const id = `ink${Math.round(x)}${Math.round(y)}${Math.round(at * 10)}`;
  const blobs = Array.from({length: 11}, (_, k) => ({cx: w * (0.15 + 0.7 * random(`${id}x${k}`)), cy: h * (0.15 + 0.7 * random(`${id}y${k}`)), r: Math.max(w, h) * (0.25 + 0.35 * random(`${id}r${k}`)), d: k * 0.06}));
  const z = 1.06 + (t - at) * 0.01;
  return (
    <Abs x={x} y={y} w={w} h={h} style={{...nb('#fff', 8), borderColor: NBK, boxShadow: `8px 8px 0 ${c}`, overflow: 'hidden'}}>
      <svg width={w} height={h} style={{position: 'absolute', left: 0, top: 0}}>
        <defs><clipPath id={id}>{blobs.map((b, k) => <circle key={k} cx={b.cx} cy={b.cy} r={b.r * prog(t, at + b.d, at + b.d + dur, easeOut)} />)}</clipPath></defs>
        <image href={PH(src)} x={-w * (z - 1) / 2} y={-h * (z - 1) / 2} width={w * z} height={h * z} preserveAspectRatio={par(pos)} clipPath={`url(#${id})`} />
        {blobs.slice(0, 5).map((b, k) => { const q = prog(t, at + b.d, at + b.d + dur, easeOut); return q < 1 ? <circle key={k} cx={b.cx} cy={b.cy} r={b.r * q} fill="none" stroke={c} strokeWidth={10 * (1 - q)} opacity={0.6 * (1 - q)} /> : null; })}
      </svg>
      {tag && <div style={{position: 'absolute', left: 18, top: 18}}><NBadge at={at + 0.4} text={tag} bg={c} rot={-2} size={26} /></div>}
    </Abs>
  );
};

const ZTicker: React.FC<{y: number; at: number; text: string; rot?: number; c?: string; out?: number}> = ({y, at, text, rot = -6, c = YEL, out = 1e9}) => {
  const t = useT();
  if (t < at) return null;
  const q = prog(t, at, at + 0.5, easeOut) * (1 - prog(t, out - 0.4, out, easeIn));
  const shift = ((t - at) * 260) % 700;
  return (
    <div style={{position: 'absolute', left: -200, top: y, width: 1480, height: 96, transform: `rotate(${rot}deg) translateX(${(1 - q) * -1500}px)`, background: c, borderTop: `10px solid ${NBK}`, borderBottom: `10px solid ${NBK}`, overflow: 'hidden', boxShadow: '0 14px 30px rgba(0,0,0,0.25)', zIndex: 6}}>
      <div style={{position: 'absolute', inset: 0, background: `repeating-linear-gradient(45deg, ${NBK} 0 18px, transparent 18px 46px)`, opacity: 0.12}} />
      <div style={{position: 'absolute', left: -shift, top: 0, height: 76, display: 'flex', alignItems: 'center', gap: 40, whiteSpace: 'nowrap', fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: NBK, letterSpacing: 4}}>
        {Array.from({length: 8}, (_, k) => <span key={k}>⚠ {text}</span>)}
      </div>
    </div>
  );
};

const ZAxis: React.FC<{l: string; name: string; c: string; at: number; x?: number; y?: number}> = ({l, name, c, at, x = 60, y = 470}) => {
  const t = useT();
  const q = Math.min(1, sp(t, at, 9, 13));
  return (
    <Abs x={x} y={y} style={{display: 'flex', alignItems: 'center', gap: 14, transform: `scale(${q})`, transformOrigin: '0 50%', opacity: t > at ? 1 : 0}}>
      <div style={{width: 70, height: 70, borderRadius: 16, background: c, border: `4px solid ${NBK}`, boxShadow: `4px 4px 0 ${NBK}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 42, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{l}</div>
      <div style={{...nb('#fff', 5), borderColor: NBK, boxShadow: `5px 5px 0 ${c}`, padding: '8px 20px', fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK}}>{name}</div>
    </Abs>
  );
};
/** Définition écrite mot à mot au rythme de la voix. */
const ZDef: React.FC<{text: string; a: number; e: number; x?: number; y: number; w?: number; fs?: number; c?: string}> = ({text, a, e, x = 60, y, w = 960, fs = 40, c = INK}) => {
  const t = useT();
  const words = text.split(' ');
  const tot = words.reduce((s0, ww) => s0 + ww.length + 1, 0);
  let acc = 0;
  return (
    <Abs x={x} y={y} w={w} style={{display: 'flex', flexWrap: 'wrap', columnGap: fs * 0.28, rowGap: 2}}>
      {words.map((ww, k) => { const at = a + ((e - a) * acc) / tot - 0.1; acc += ww.length + 1; const p = Math.min(1, spring(t, at, 11, 16)); return <span key={k} style={{fontFamily: sansFont, fontWeight: 900, fontSize: fs, lineHeight: 1.15, color: c, opacity: t >= at ? 1 : 0, transform: `translateY(${(1 - p) * 26}px)`, display: 'inline-block'}}>{ww}</span>; })}
    </Abs>
  );
};

/* ═════════════ Palette SWOT ═════════════ */
const CF = '#1F5FAF', CW = '#E8912D', CO = '#1E9E5A', CM = '#C0392B';
const C_OFF = '#2E86DE', C_DEF = '#6C4BD8', C_ADA = '#16A085', C_SUR = '#B03A2E';
type S4 = [string, string, string, string, string];
const SW4: S4[] = [['S', 'Forces', 'Strengths', CF, 'Dumbbell'], ['W', 'Faiblesses', 'Weaknesses', CW, 'Unlink'], ['O', 'Opportunités', 'Opportunities', CO, 'TrendingUp'], ['T', 'Menaces', 'Threats', CM, 'TriangleAlert']];
const SW_IMG = ['isoperf-gen/trophee.jpg', 'isoperf-gen/fracture.jpg', 'iso26/courbe-strategie.jpg', 'isoperf-gen/panique.jpg'];

/* ═════════════ 1. Particules qui s'assemblent en lettres (matrice de points) ═════════════ */
const DOTF: Record<string, string[]> = {
  S: [' ####', '#    ', '#    ', ' ### ', '    #', '    #', '#### '],
  W: ['#   #', '#   #', '#   #', '# # #', '# # #', '## ##', '#   #'],
  O: [' ### ', '#   #', '#   #', '#   #', '#   #', '#   #', ' ### '],
  T: ['#####', '  #  ', '  #  ', '  #  ', '  #  ', '  #  ', '  #  '],
};
const WParticles: React.FC<{text: string; cols: string[]; at: number; cy: number; cell?: number}> = ({text, cols, at, cy, cell = 26}) => {
  const t = useT();
  const lw = 5 * cell, gap = cell * 1.6;
  const x0 = 540 - (text.length * lw + (text.length - 1) * gap) / 2;
  const dots: React.ReactNode[] = [];
  text.split('').forEach((ch, li) => {
    DOTF[ch].forEach((row, r) => row.split('').forEach((v, c) => {
      if (v !== '#') return;
      for (let sy = 0; sy < 2; sy++) for (let sx = 0; sx < 2; sx++) {
        const id = `${li}-${r}-${c}-${sx}${sy}`;
        const tx = x0 + li * (lw + gap) + c * cell + sx * cell / 2, ty = cy - 3.5 * cell + r * cell + sy * cell / 2;
        const fx = random(`px${id}`) * 1080, fy = random(`py${id}`) * 1900;
        const d = random(`pd${id}`) * 0.5;
        const q = prog(t, at + d, at + d + 0.9, easeInOut);
        const tw = q >= 1 ? 0.75 + 0.25 * Math.sin(t * 6 + random(`pt${id}`) * 6) : 1;
        dots.push(<div key={id} style={{position: 'absolute', left: lerp(fx, tx, q), top: lerp(fy, ty, q), width: cell / 2 - 2, height: cell / 2 - 2, borderRadius: '50%', background: cols[li], opacity: (0.3 + 0.7 * q) * tw, boxShadow: q > 0.9 ? `0 0 8px ${cols[li]}` : 'none'}} />);
      }
    }));
  });
  return <>{dots}</>;
};

/* ═════════════ 2. Lettres extrudées en 3D (relief qui suit la lumière) + face en lettres-photos ═════════════ */
const WExtrude: React.FC<{text: string; src: string; size: number; depth?: number; c?: string; seed?: number}> = ({text, src, size, depth = 16, c = NAVY, seed = 0}) => {
  const t = useT();
  const ang = Math.sin(t * 0.8 + seed) * 0.6 + 0.8;
  const sh = Array.from({length: depth}, (_, i) => `${(Math.cos(ang) * (i + 1)).toFixed(1)}px ${(Math.sin(ang) * (i + 1)).toFixed(1)}px 0 ${hexMix(c, '#000000', 0.15 + (i / depth) * 0.45)}`).join(', ');
  return (
    <div style={{position: 'relative', transform: `perspective(1200px) rotateY(${Math.sin(t * 0.7 + seed) * 8}deg) rotateX(${6 + Math.cos(t * 0.5) * 4}deg)`}}>
      <span style={{position: 'absolute', left: 0, top: 0, fontFamily: sansFont, fontWeight: 900, fontSize: size, lineHeight: 0.92, letterSpacing: 4, color: c, textShadow: sh, whiteSpace: 'nowrap'}}>{text}</span>
      <PhotoLetterAnim ch={text} src={src} size={size} ls={4} seed={seed} />
    </div>
  );
};

/* ═════════════ 3. Enseigne néon qui grésille puis s'allume ═════════════ */
const WNeon: React.FC<{text: string; sub?: string; at: number; c: string; size?: number}> = ({text, sub, at, c, size = 64}) => {
  const t = useT();
  const k = t - at;
  const on = k < 0 ? 0 : k < 0.6 ? (random(`ne${text}${Math.floor(t * 18)}`) > 0.45 ? 1 : 0.15) : 1;
  const glow = on > 0.5 ? `0 0 6px #fff, 0 0 14px ${c}, 0 0 28px ${c}, 0 0 50px ${c}` : 'none';
  return (
    <div style={{display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '22px 40px', borderRadius: 26, background: 'radial-gradient(120% 120% at 50% 40%, #1C2333, #0B0F18)', border: `5px solid ${NBK}`, boxShadow: on > 0.5 ? `0 0 40px ${c}66, 8px 8px 0 ${NBK}` : `8px 8px 0 ${NBK}`}}>
      <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color: on > 0.5 ? '#fff' : '#3A4252', textShadow: glow, letterSpacing: 3, whiteSpace: 'nowrap'}}>{text}</div>
      {sub && <div style={{...CAP, fontSize: size * 0.36, color: on > 0.5 ? c : '#3A4252', textShadow: on > 0.5 ? `0 0 10px ${c}` : 'none'}}>{sub}</div>}
    </div>
  );
};

/* ═════════════ 4. Cellule à membrane vivante : l'interne dedans, l'externe dehors ═════════════ */
const WCell: React.FC<{cx: number; cy: number; at: number; R?: number; inT: [number, number]; outT: [number, number]}> = ({cx, cy, at, R = 250, inT, outT}) => {
  const t = useT();
  const app = Math.min(1, sp(t, at, 7, 12));
  const pts = Array.from({length: 73}, (_, i) => { const th = (i / 72) * Math.PI * 2; const r = R * app + 9 * Math.sin(5 * th + t * 2.2) + 6 * Math.sin(3 * th - t * 1.6); return `${(cx + r * Math.cos(th)).toFixed(1)},${(cy + r * Math.sin(th)).toFixed(1)}`; }).join(' ');
  const nuc = (l: string, c: string, ic: string, a: number, dx: number): React.ReactNode => { const q = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0; return <div key={l} style={{position: 'absolute', left: cx + dx - 105, top: cy - 20 + Math.sin(t * 1.5 + dx) * 8, width: 210, ...nb('#fff', 5), borderColor: NBK, boxShadow: `5px 5px 0 ${c}`, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', transform: `scale(${q})`}}><Ico n={ic} size={38} c={c} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK}}>{l}</span></div>; };
  const orb = (l: string, c: string, ic: string, a: number, a0: number, inward: boolean): React.ReactNode => {
    if (t < a) return null;
    const q = Math.min(1, sp(t, a, 7, 12));
    const th = a0 + (t - a) * (inward ? 0.25 : 0.45);
    const bounce = inward ? Math.abs(Math.sin((t - a) * 2.4)) * 50 : 0;
    const rr = R + 110 + (1 - q) * 300 + bounce;
    return <div key={l} style={{position: 'absolute', left: cx + Math.cos(th) * rr - 118, top: cy + Math.sin(th) * rr * 0.8 - 34, width: 236, display: 'flex', alignItems: 'center', gap: 10, ...nb(c, 5), borderColor: NBK, padding: '8px 14px', opacity: q}}><Ico n={ic} size={34} c="#fff" /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff'}}>{l}</span></div>;
  };
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        <defs><radialGradient id="cellg" cx="50%" cy="45%" r="60%"><stop offset="0%" stopColor="#FFFFFF" /><stop offset="100%" stopColor="#DCE8F7" /></radialGradient></defs>
        <polygon points={pts} fill="url(#cellg)" stroke={NAVY} strokeWidth={10} opacity={app} />
        <polygon points={pts} fill="none" stroke={NAVY} strokeWidth={3} strokeDasharray="4 14" opacity={app * 0.6} transform={`translate(${cx} ${cy}) scale(0.9) translate(${-cx} ${-cy})`} />
      </svg>
      <div style={{position: 'absolute', left: cx - 120, top: cy - R * 0.62, width: 240, textAlign: 'center', ...CAP, fontSize: 24, color: NAVY, opacity: app}}>Organisation · interne</div>
      {nuc('Forces', CF, 'Dumbbell', inT[0], -115)}{nuc('Faiblesses', CW, 'Unlink', inT[1], 115)}
      {orb('Opportunités', CO, 'TrendingUp', outT[0], -2.4, false)}{orb('Menaces', CM, 'TriangleAlert', outT[1], 0.6, true)}
      {t > outT[0] && <div style={{position: 'absolute', left: cx - 150, top: cy + R + 150, width: 300, textAlign: 'center', ...CAP, fontSize: 24, color: '#3A4A63', opacity: pop(t, outT[0])}}>Environnement · externe</div>}
    </>
  );
};

/* ═════════════ 5. Scanner à rayons X : la ligne de balayage révèle l'intérieur de l'organisation ═════════════ */
const WXray: React.FC<{x: number; y: number; w: number; h: number; at: number; scan: number; ext: number}> = ({x, y, w, h, at, scan, ext}) => {
  const t = useT();
  const p = prog(t, scan, scan + 1.5, easeInOut);
  const app = pop(t, at, 0.5);
  const bw = w * 0.56, bx = (w - bw) / 2, by = h * 0.18, bh = h * 0.72;
  const building = (xr: boolean): React.ReactNode => (
    <svg width={w} height={h} style={{position: 'absolute', inset: 0}}>
      <rect x={bx} y={by} width={bw} height={bh} rx={10} fill={xr ? '#06213A' : '#F4F1EA'} stroke={xr ? '#5FE1FF' : NBK} strokeWidth={6} />
      <polygon points={`${bx - 20},${by} ${bx + bw / 2},${by - 70} ${bx + bw + 20},${by}`} fill={xr ? '#06213A' : '#C9D2DF'} stroke={xr ? '#5FE1FF' : NBK} strokeWidth={6} strokeLinejoin="round" />
      {Array.from({length: 12}, (_, k) => <rect key={k} x={bx + 30 + (k % 3) * (bw - 60) / 3 + 10} y={by + 30 + Math.floor(k / 3) * (bh - 60) / 4} width={(bw - 60) / 3 - 20} height={(bh - 60) / 4 - 24} rx={6} fill={xr ? 'none' : '#9CC6FF'} stroke={xr ? '#5FE1FF' : NBK} strokeWidth={xr ? 2 : 4} opacity={xr ? 0.5 : 1} />)}
    </svg>
  );
  return (
    <Abs x={x} y={y} w={w} h={h} style={{opacity: app}}>
      {building(false)}
      <div style={{position: 'absolute', inset: 0, clipPath: `inset(0 0 ${(1 - p) * 100}% 0)`}}>
        {building(true)}
        {[['Settings2', 0.32, 0.38], ['Users', 0.62, 0.36], ['Dumbbell', 0.34, 0.64], ['Unlink', 0.64, 0.66]].map(([ic, px, py], k) => <div key={k} style={{position: 'absolute', left: w * (px as number) - 40, top: h * (py as number) - 40, width: 80, height: 80, borderRadius: 40, border: '4px solid #5FE1FF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 18px #5FE1FF'}}><Ico n={ic as string} size={44} c="#5FE1FF" /></div>)}
      </div>
      {p > 0 && p < 1 && <div style={{position: 'absolute', left: bx - 60, top: h * p - 4, width: bw + 120, height: 8, background: '#5FE1FF', boxShadow: '0 0 30px 10px rgba(95,225,255,0.6)'}} />}
      {t > scan + 1.4 && <div style={{position: 'absolute', left: bx, top: by + bh + 18, width: bw, textAlign: 'center', ...CAP, fontSize: 26, color: '#0B6E8C', opacity: pop(t, scan + 1.4)}}>Facteurs internes</div>}
      {t > ext && [['Globe', 0.08, 0.2], ['TrendingUp', 0.9, 0.22], ['Scale', 0.06, 0.72], ['TriangleAlert', 0.92, 0.7]].map(([ic, px, py], k) => { const q = Math.min(1, sp(t, ext + k * 0.12, 8, 12)); return <div key={k} style={{position: 'absolute', left: w * (px as number) - 50, top: h * (py as number) - 50, width: 100, height: 100, borderRadius: 50, background: '#fff', border: `5px solid ${NBK}`, boxShadow: `5px 5px 0 ${k % 2 ? CM : CO}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${q})`}}><Ico n={ic as string} size={56} c={k % 2 ? CM : CO} /></div>; })}
      {t > ext && <div style={{position: 'absolute', left: 0, top: -10, width: w, textAlign: 'center', ...CAP, fontSize: 26, color: '#3A4A63', opacity: pop(t, ext + 0.4)}}>Facteurs externes</div>}
    </Abs>
  );
};

/* ═════════════ 6. Puzzle qui s'emboîte : les quatre pièces forment la vision d'ensemble ═════════════ */
const pzPath = (P: number, k: number, top: number, right: number, bottom: number, left: number) => {
  const e = (x1: number, y1: number, x2: number, y2: number, m: number) => { if (!m) return `L ${x2} ${y2}`; const mx = (x1 + x2) / 2, my = (y1 + y2) / 2; const dx = (x2 - x1) / P, dy = (y2 - y1) / P; return `L ${mx - dx * k} ${my - dy * k} A ${k} ${k} 0 0 ${m > 0 ? 1 : 0} ${mx + dx * k} ${my + dy * k} L ${x2} ${y2}`; };
  return `M 0 0 ${e(0, 0, P, 0, top)} ${e(P, 0, P, P, right)} ${e(P, P, 0, P, bottom)} ${e(0, P, 0, 0, left)} Z`;
};
const WPuzzle: React.FC<{cx: number; cy: number; times: number[]; done: number; P?: number}> = ({cx, cy, times, done, P = 270}) => {
  const t = useT();
  const k = P * 0.15;
  const edges = [[0, 1, 1, 0], [0, 0, 1, -1], [-1, 1, 0, 0], [-1, 0, 0, -1]];
  const from = [[-700, -500], [700, -500], [-700, 600], [700, 600]];
  const glow = t > done ? 0.5 + 0.5 * Math.sin((t - done) * 5) : 0;
  return (
    <>
      {SW4.map(([l, n, , c, ic], i) => {
        const q = prog(t, times[i], times[i] + 0.7, easeOut);
        const snap = t > times[i] + 0.7 ? Math.max(0, 1 - (t - times[i] - 0.7) / 0.3) : 0;
        const r = Math.floor(i / 2), col = i % 2;
        const x = cx - P + col * P + from[i][0] * (1 - q), y = cy - P + r * P + from[i][1] * (1 - q);
        return (
          <div key={l} style={{position: 'absolute', left: x - k, top: y - k, width: P + 2 * k, height: P + 2 * k, opacity: q > 0 ? 1 : 0, transform: `rotate(${(1 - q) * (i % 2 ? 40 : -40)}deg) scale(${1 + snap * 0.05})`}}>
            <svg width={P + 2 * k} height={P + 2 * k} style={{position: 'absolute', inset: 0, overflow: 'visible'}}><g transform={`translate(${k} ${k})`}><path d={pzPath(P, k, edges[i][0], edges[i][1], edges[i][2], edges[i][3])} fill={c} stroke={NBK} strokeWidth={6} style={{filter: glow > 0 ? `drop-shadow(0 0 ${12 * glow}px ${YEL})` : undefined}} /></g></svg>
            <div style={{position: 'absolute', left: k, top: k, width: P, height: P, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#fff'}}>
              <Ico n={ic} size={60} c="#fff" />
              <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 92, lineHeight: 1}}>{l}</span>
              <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>{n}</span>
            </div>
          </div>
        );
      })}
    </>
  );
};

/* ═════════════ 7. Tissage : les fils internes et externes se croisent pour tisser la matrice ═════════════ */
const WWeave: React.FC<{x: number; y: number; w: number; h: number; vAt: number[]; hAt: number[]; knot: number}> = ({x, y, w, h, vAt, hAt, knot}) => {
  const t = useT();
  const vx = [w * 0.38, w * 0.74], hy = [h * 0.36, h * 0.74];
  const vc = [CF, CW], hc = [CO, CM], vl = ['Forces', 'Faiblesses'], hl = ['Opportunités', 'Menaces'];
  const T = 64;
  const vThread = (i: number, under: boolean): React.ReactNode => { const p = prog(t, vAt[i], vAt[i] + 1.0, easeInOut); if (p <= 0) return null; return <div key={`v${i}${under}`} style={{position: 'absolute', left: vx[i] - T / 2, top: 0, width: T, height: h * p, background: `repeating-linear-gradient(0deg, ${vc[i]} 0 14px, ${hexMix(vc[i], '#ffffff', 0.25)} 14px 22px)`, border: `4px solid ${NBK}`, borderRadius: 12, boxSizing: 'border-box', clipPath: under ? `polygon(0 0, 100% 0, 100% ${hy[0] - T / 2}px, 0 ${hy[0] - T / 2}px, 0 ${hy[0] + T / 2}px, 100% ${hy[0] + T / 2}px, 100% 100%, 0 100%)` : undefined}} />; };
  const hThread = (j: number): React.ReactNode => { const p = prog(t, hAt[j], hAt[j] + 1.0, easeInOut); if (p <= 0) return null; return <div key={`h${j}`} style={{position: 'absolute', left: 0, top: hy[j] - T / 2, width: w * p, height: T, background: `repeating-linear-gradient(90deg, ${hc[j]} 0 14px, ${hexMix(hc[j], '#ffffff', 0.25)} 14px 22px)`, border: `4px solid ${NBK}`, borderRadius: 12, boxSizing: 'border-box'}} />; };
  return (
    <Abs x={x} y={y} w={w} h={h}>
      {hThread(1)}
      {vThread(0, false)}{vThread(1, false)}
      {hThread(0)}
      {[0, 1].map((i) => t > vAt[i] + 0.2 && <div key={`vl${i}`} style={{position: 'absolute', left: vx[i] - 110, top: -58, width: 220, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: vc[i], opacity: pop(t, vAt[i] + 0.2)}}>{vl[i]}</div>)}
      {[0, 1].map((j) => t > hAt[j] + 0.2 && <div key={`hl${j}`} style={{position: 'absolute', left: -10, top: hy[j] - 94, width: 230, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: hc[j], opacity: pop(t, hAt[j] + 0.2)}}>{hl[j]}</div>)}
      {t > knot && vx.flatMap((xx, i) => hy.map((yy, j) => { const d = knot + (i + j) * 0.15; const q = t > d ? Math.min(1, sp(t, d, 10, 12)) : 0; return <div key={`k${i}${j}`} style={{position: 'absolute', left: xx - 26, top: yy - 26, width: 52, height: 52, borderRadius: 26, background: YEL, border: `5px solid ${NBK}`, transform: `scale(${q})`, boxShadow: `0 0 ${20 * q}px ${YEL}`}} />; }))}
    </Abs>
  );
};

/* ═════════════ 8. Origami : la feuille se déplie en quatre quadrants ═════════════ */
const WOrigami: React.FC<{cx: number; cy: number; at: number; S?: number}> = ({cx, cy, at, S = 300}) => {
  const t = useT();
  const app = Math.min(1, sp(t, at, 8, 12));
  const u1 = prog(t, at + 0.5, at + 1.2, easeInOut), u2 = prog(t, at + 1.3, at + 2.0, easeInOut);
  const quad = (i: number): React.ReactNode => { const [l, n, , c] = SW4[i]; return <div style={{width: S, height: S, background: `linear-gradient(135deg, ${hexMix(c, '#ffffff', 0.12)}, ${c})`, border: `5px solid ${NBK}`, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', backfaceVisibility: 'hidden'}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 120, lineHeight: 1}}>{l}</span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30}}>{n}</span></div>; };
  return (
    <div style={{position: 'absolute', left: cx - S, top: cy - S, width: 2 * S, height: 2 * S, perspective: 1600, transform: `scale(${app})`}}>
      <div style={{position: 'absolute', left: 0, top: 0}}>{quad(0)}</div>
      <div style={{position: 'absolute', left: S, top: 0, transformOrigin: '0 50%', transform: `rotateY(${(1 - u1) * -180}deg)`, transformStyle: 'preserve-3d'}}>{quad(1)}</div>
      <div style={{position: 'absolute', left: 0, top: S, width: 2 * S, height: S, transformOrigin: '50% 0', transform: `rotateX(${(1 - u2) * 180}deg)`, transformStyle: 'preserve-3d', display: 'flex'}}>{quad(2)}{quad(3)}</div>
      {u2 > 0.98 && <><div style={{position: 'absolute', left: S - 3, top: 0, width: 6, height: 2 * S, background: 'rgba(0,0,0,0.25)'}} /><div style={{position: 'absolute', left: 0, top: S - 3, width: 2 * S, height: 6, background: 'rgba(0,0,0,0.25)'}} /></>}
    </div>
  );
};

/* ═════════════ 9. Carte au trésor : chemin pointillé et empreintes jusqu'à la décision ═════════════ */
const WTreasure: React.FC<{x: number; y: number; w: number; h: number; at: number; end: number; marks: [string, number][]}> = ({x, y, w, h, at, end, marks}) => {
  const t = useT();
  const p = prog(t, at, end, lin);
  const pts: [number, number][] = [[70, h - 80], [w * 0.3, h * 0.55], [w * 0.5, h * 0.78], [w * 0.68, h * 0.35], [w - 110, 110]];
  const d = `M ${pts[0][0]} ${pts[0][1]} C ${pts[1][0]} ${pts[1][1] - 160}, ${pts[2][0] - 120} ${pts[2][1] + 120}, ${pts[2][0]} ${pts[2][1]} S ${pts[3][0] + 40} ${pts[3][1] + 220}, ${pts[3][0]} ${pts[3][1]} S ${pts[4][0] - 120} ${pts[4][1] + 20}, ${pts[4][0]} ${pts[4][1]}`;
  const xq = t > end ? Math.min(1, sp(t, end, 9, 12)) : 0;
  return (
    <Abs x={x} y={y} w={w} h={h} style={{...nb('#F3E7C9', 8), borderColor: NBK, overflow: 'hidden', opacity: pop(t, at - 0.3)}}>
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4), transparent 60%), repeating-linear-gradient(17deg, rgba(120,90,40,0.06) 0 3px, transparent 3px 11px)'}} />
      <svg width={w} height={h} style={{position: 'absolute', inset: 0}}>
        <path d={d} fill="none" stroke="#8A5A1F" strokeWidth={8} strokeDasharray="18 16" pathLength={1000} strokeDashoffset={0} style={{clipPath: `inset(0 ${(1 - p) * 100}% 0 0)`}} />
      </svg>
      {Array.from({length: 14}, (_, k) => { const f = (k + 1) / 15; if (p < f) return null; const xx = 70 + (w - 180) * f; const yy = h - 80 - (h - 190) * f + Math.sin(f * 9) * 60; return <div key={k} style={{position: 'absolute', left: xx + (k % 2 ? 10 : -10), top: yy + (k % 2 ? 8 : -8), width: 16, height: 26, borderRadius: '50%', background: 'rgba(90,60,20,0.45)', transform: `rotate(${-40}deg)`}} />; })}
      {marks.map(([l, a], k) => t > a && <div key={l} style={{position: 'absolute', left: [w * 0.18, w * 0.46][k % 2], top: [h * 0.32, h * 0.62][k % 2], ...nb('#fff', 5), borderColor: NBK, padding: '6px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, transform: `scale(${Math.min(1, sp(t, a, 9, 12))}) rotate(-3deg)`}}>{l}</div>)}
      <div style={{position: 'absolute', left: pts[4][0] - 45, top: pts[4][1] - 45, width: 90, height: 90, transform: `scale(${xq}) rotate(${(1 - xq) * 90}deg)`}}><div style={{position: 'absolute', left: 36, top: -6, width: 18, height: 102, background: RED, borderRadius: 9, transform: 'rotate(45deg)'}} /><div style={{position: 'absolute', left: 36, top: -6, width: 18, height: 102, background: RED, borderRadius: 9, transform: 'rotate(-45deg)'}} /></div>
      {xq > 0 && <div style={{position: 'absolute', left: pts[4][0] - 260, top: pts[4][1] + 50, ...nb(NAVY, 5), borderColor: NBK, padding: '8px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff', transform: `scale(${xq})`, whiteSpace: 'nowrap'}}>Décision stratégique</div>}
    </Abs>
  );
};

/* ═════════════ 10. Boussole stratégique : l'aiguille hésite puis indique le cap ═════════════ */
const WCompass: React.FC<{cx: number; cy: number; at: number; settle: number; R?: number; labels: [string, string][]}> = ({cx, cy, at, settle, R = 250, labels}) => {
  const t = useT();
  const app = Math.min(1, sp(t, at, 7, 12));
  const k = Math.max(0, t - settle);
  const ang = t < settle ? (t - at) * 540 : 360 * Math.ceil(((settle - at) * 540) / 360) - Math.exp(-k * 3) * Math.cos(k * 9) * 40;
  return (
    <div style={{position: 'absolute', left: cx - R, top: cy - R, width: 2 * R, height: 2 * R, transform: `scale(${app})`}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: R, background: 'radial-gradient(circle at 40% 35%, #FFFDF5, #EADFC4)', border: `10px solid ${NBK}`, boxShadow: `10px 10px 0 ${CO}`}} />
      {Array.from({length: 36}, (_, i) => <div key={i} style={{position: 'absolute', left: R - 2, top: 18, width: 4, height: i % 9 === 0 ? 34 : 16, background: NBK, transformOrigin: `2px ${R - 18}px`, transform: `rotate(${i * 10}deg)`}} />)}
      {labels.map(([l, c], i) => { const a = (i * 90 - 90) * (Math.PI / 180); return <div key={l} style={{position: 'absolute', left: R + Math.cos(a) * (R * 0.66) - 90, top: R + Math.sin(a) * (R * 0.66) - 18, width: 180, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: c}}>{l}</div>; })}
      <div style={{position: 'absolute', left: R - 22, top: 50, width: 44, height: 2 * R - 100, transformOrigin: '50% 50%', transform: `rotate(${ang}deg)`}}>
        <svg width={44} height={2 * R - 100}><polygon points={`22,0 40,${R - 50} 4,${R - 50}`} fill={RED} stroke={NBK} strokeWidth={4} /><polygon points={`22,${2 * R - 100} 40,${R - 50} 4,${R - 50}`} fill="#DDE3EA" stroke={NBK} strokeWidth={4} /></svg>
      </div>
      <div style={{position: 'absolute', left: R - 20, top: R - 20, width: 40, height: 40, borderRadius: 20, background: YEL, border: `5px solid ${NBK}`}} />
    </div>
  );
};

/* ═════════════ 11. Jauge de puissance qui se charge (forces) ═════════════ */
const WGauge: React.FC<{x: number; y: number; h: number; at: number; items: [string, number, string][]; c: string; perf: number}> = ({x, y, h, at, items, c, perf}) => {
  const t = useT();
  const n = items.length;
  const lvl = items.reduce((s0, [, a]) => s0 + prog(t, a, a + 0.6, easeOut), 0) / n;
  const W = 190;
  const wave = (yy: number) => Array.from({length: 21}, (_, i) => `${(i / 20) * W},${(yy + Math.sin(i * 0.8 + t * 6) * 6).toFixed(1)}`).join(' ');
  const top = h - h * lvl;
  return (
    <Abs x={x} y={y} w={W + 520} h={h + 60} style={{opacity: pop(t, at)}}>
      <div style={{position: 'absolute', left: W / 2 - 40, top: -30, width: 80, height: 34, background: NBK, borderRadius: '10px 10px 0 0'}} />
      <div style={{position: 'absolute', left: 0, top: 0, width: W, height: h, borderRadius: 30, border: `8px solid ${NBK}`, background: '#fff', overflow: 'hidden', boxSizing: 'border-box'}}>
        <svg width={W} height={h} style={{position: 'absolute', left: -8, top: -8}}><polygon points={`${wave(top)} ${W},${h} 0,${h}`} fill={c} opacity={0.92} /></svg>
        {[1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 0, right: 0, top: (h * k) / 3 - 8, height: 4, background: 'rgba(0,0,0,0.15)'}} />)}
      </div>
      {items.map(([l, a, ic], k) => { const q = t > a ? Math.min(1, sp(t, a, 9, 13)) : 0; return <div key={l} style={{position: 'absolute', left: W + 40, top: h - (h * (k + 0.5)) / n - 40, display: 'flex', alignItems: 'center', gap: 14, ...nb('#fff', 6), borderColor: NBK, boxShadow: `6px 6px 0 ${c}`, padding: '10px 18px', transform: `translateX(${(1 - q) * 80}px)`, opacity: q}}><Ico n={ic} size={44} c={c} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK}}>{l}</span></div>; })}
      {t > perf && <div style={{position: 'absolute', left: W + 40, top: -70, ...nb(c, 6), borderColor: NBK, padding: '8px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: '#fff', transform: `scale(${Math.min(1, sp(t, perf, 9, 12))})`, transformOrigin: '0 50%'}}>Performance ↑</div>}
    </Abs>
  );
};

/* ═════════════ 12. Fissures qui se propagent — et réparation en or (kintsugi) ═════════════ */
const crackPts = (seed: string, x0: number, y0: number, ang: number, n: number, step: number) => { const pts: [number, number][] = [[x0, y0]]; let a = ang, x = x0, y = y0; for (let i = 0; i < n; i++) { a += (random(`${seed}a${i}`) - 0.5) * 1.1; x += Math.cos(a) * step; y += Math.sin(a) * step; pts.push([x, y]); } return pts; };
const WCracks: React.FC<{w: number; h: number; hits: [number, number, number][]; gold?: number; c?: string}> = ({w, h, hits, gold = 1e9, c = '#2B2B2B'}) => {
  const t = useT();
  const g = prog(t, gold, gold + 1.2, easeOut);
  return (
    <svg width={w} height={h} style={{position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none'}}>
      {hits.flatMap(([x, y, a], hi) => Array.from({length: 4}, (_, k) => {
        const pts = crackPts(`ck${hi}${k}`, x * w, y * h, (k / 4) * Math.PI * 2 + hi, 9, 26);
        const p = prog(t, a + k * 0.05, a + 0.7 + k * 0.05, easeOut);
        if (p <= 0) return null;
        const m = Math.max(2, Math.ceil(pts.length * p));
        const s = pts.slice(0, m).map((q) => q.join(',')).join(' ');
        return <g key={`${hi}${k}`}><polyline points={s} fill="none" stroke={g > 0 ? hexMix(c, '#E0A100', g) : c} strokeWidth={g > 0 ? 6 + 3 * g : 6 - k * 0.6} strokeLinejoin="round" strokeLinecap="round" style={{filter: g > 0 ? `drop-shadow(0 0 ${10 * g}px #FFD34D)` : undefined}} /></g>;
      }))}
      {hits.map(([x, y, a], hi) => t > a && <circle key={`i${hi}`} cx={x * w} cy={y * h} r={10} fill={g > 0 ? '#E0A100' : c} />)}
    </svg>
  );
};

/* ═════════════ 13. Longue-vue : le cercle de visée balaie l'horizon et trouve les opportunités ═════════════ */
const WScope: React.FC<{x: number; y: number; w: number; h: number; at: number; src: string; finds: [string, number, number, number, string][]; c: string}> = ({x, y, w, h, at, src, finds, c}) => {
  const t = useT();
  const app = pop(t, at, 0.5);
  const cur = finds.reduce((acc, f, k) => (t >= f[1] - 0.6 ? k : acc), -1);
  const tgt = cur < 0 ? [0.15, 0.5] : [finds[cur][2], finds[cur][3]];
  const prev = cur <= 0 ? [0.15, 0.5] : [finds[cur - 1][2], finds[cur - 1][3]];
  const mv = cur < 0 ? 0 : prog(t, finds[cur][1] - 0.6, finds[cur][1], easeInOut);
  const sx = lerp(prev[0], tgt[0], mv) * w, sy = lerp(prev[1], tgt[1], mv) * h;
  const R = 170;
  return (
    <Abs x={x} y={y} w={w} h={h} style={{...nb('#000', 8), borderColor: NBK, boxShadow: `8px 8px 0 ${c}`, overflow: 'hidden', opacity: app}}>
      <Img src={PH(src)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(1.15) saturate(1.1)'}} />
      <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at ${sx}px ${sy}px, transparent ${R - 4}px, rgba(4,8,16,0.88) ${R + 4}px)`}} />
      <div style={{position: 'absolute', left: sx - R, top: sy - R, width: 2 * R, height: 2 * R, borderRadius: R, border: `8px solid ${NBK}`, boxShadow: `0 0 0 4px ${c}`}}>
        <div style={{position: 'absolute', left: R - 2, top: 20, width: 4, height: 2 * R - 40, background: 'rgba(255,255,255,0.6)'}} /><div style={{position: 'absolute', top: R - 2, left: 20, height: 4, width: 2 * R - 40, background: 'rgba(255,255,255,0.6)'}} />
      </div>
      {finds.map(([l, a, fx, fy, ic], k) => { if (t < a) return null; const q = Math.min(1, sp(t, a, 9, 12)); const tw = 0.7 + 0.3 * Math.sin((t - a) * 8); return <div key={l} style={{position: 'absolute', left: fx * w - 120, top: fy * h - 110, width: 240, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, transform: `scale(${q})`}}><div style={{fontSize: 60, lineHeight: 1, color: YEL, textShadow: `0 0 ${20 * tw}px ${YEL}`}}>✦</div><div style={{display: 'flex', alignItems: 'center', gap: 8, ...nb(c, 5), borderColor: NBK, padding: '6px 14px'}}><Ico n={ic} size={30} c="#fff" /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff'}}>{l}</span></div></div>; })}
    </Abs>
  );
};

/* ═════════════ 14. Orage des menaces : nuages, pluie et éclairs ═════════════ */
const WStorm: React.FC<{at: number; bolts: [number, number, string][]; y?: number; h?: number}> = ({at, bolts, y = 450, h = 900}) => {
  const t = useT();
  const app = prog(t, at, at + 1.0, easeOut);
  const flash = bolts.reduce((m, [a]) => Math.max(m, t > a && t < a + 0.35 ? 1 - (t - a) / 0.35 : 0), 0);
  return (
    <Abs x={0} y={y} w={1080} h={h} style={{overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(40,48,66,${0.75 * app}), rgba(40,48,66,0))`}} />
      {Array.from({length: 9}, (_, k) => <div key={k} style={{position: 'absolute', left: -200 + k * 150 + Math.sin(t * 0.6 + k) * 20, top: -60 + (k % 3) * 40 - (1 - app) * 300, width: 340, height: 170, borderRadius: '50%', background: k % 2 ? '#4A5368' : '#5C667C', filter: 'blur(6px)', opacity: 0.95}} />)}
      {app > 0.3 && Array.from({length: 46}, (_, k) => { const yy = ((t * 900 + random(`rn${k}`) * h) % h); return <div key={`r${k}`} style={{position: 'absolute', left: random(`rx${k}`) * 1080, top: yy, width: 3, height: 34, background: 'rgba(170,190,220,0.55)', transform: 'rotate(12deg)'}} />; })}
      {bolts.map(([a, bx, l], k) => { if (t < a || t > a + 2.2) return null; const q = prog(t, a, a + 0.12); const pts = Array.from({length: 8}, (_, i) => `${bx * 1080 + (i % 2 ? 30 : -20) + random(`bl${k}${i}`) * 20},${120 + i * 70 * q}`).join(' '); return <React.Fragment key={k}><polyline points={pts} fill="none" stroke="#FFF7C2" strokeWidth={10} strokeLinejoin="round" opacity={1 - prog(t, a + 0.3, a + 0.6)} style={{filter: 'drop-shadow(0 0 16px #FFE45C)'}} /><div style={{position: 'absolute', left: bx * 1080 - 110, top: h * 0.62, width: 220, textAlign: 'center', transform: `scale(${Math.min(1, sp(t, a + 0.1, 9, 12))})`}}><SlamTag at={a + 0.1} text={l} c={CM} size={40} rot={k % 2 ? 4 : -4} /></div></React.Fragment>; })}
      {flash > 0 && <AbsoluteFill style={{background: '#fff', opacity: flash * 0.6}} />}
    </Abs>
  );
};

/* ═════════════ 15. Effet domino : un obstacle extérieur fait tomber toute la chaîne ═════════════ */
const WDomino: React.FC<{x: number; y: number; at: number; fall: number; labels: string[]; c: string}> = ({x, y, at, fall, labels, c}) => {
  const t = useT();
  const n = labels.length;
  const W = 92, H = 250, gap = 70;
  return (
    <Abs x={x} y={y} w={n * (W + gap)} h={H + 80} style={{opacity: pop(t, at)}}>
      <div style={{position: 'absolute', left: -30, top: H, width: n * (W + gap) + 30, height: 12, background: NBK, borderRadius: 6}} />
      {labels.map((l, i) => {
        const a = fall + i * 0.16;
        const r = prog(t, a, a + 0.32, easeIn) * (i === n - 1 ? 90 : 62);
        return (
          <div key={i} style={{position: 'absolute', left: i * (W + gap), top: 0, width: W, height: H, transformOrigin: '100% 100%', transform: `rotate(${r}deg)`, background: i === 0 ? c : '#fff', border: `6px solid ${NBK}`, borderRadius: 14, boxShadow: `6px 6px 0 ${i === 0 ? NBK : c}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{transform: 'rotate(-90deg)', whiteSpace: 'nowrap', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: i === 0 ? '#fff' : INK}}>{l}</div>
          </div>
        );
      })}
    </Abs>
  );
};

/* ═════════════ 16. Rideau de théâtre qui s'ouvre sur la matrice ═════════════ */
const WCurtain: React.FC<{at: number; dur?: number; y?: number; h?: number}> = ({at, dur = 1.4, y = 440, h = 940}) => {
  const t = useT();
  const p = prog(t, at, at + dur, easeInOut);
  if (p >= 1) return null;
  const half = (s: number): React.ReactNode => <div style={{position: 'absolute', top: 0, [s < 0 ? 'left' : 'right']: 0, width: 560, height: h, transform: `translateX(${s * p * 560}px) scaleX(${1 - p * 0.35})`, transformOrigin: s < 0 ? '0 50%' : '100% 50%', background: 'repeating-linear-gradient(90deg, #7A0F1A 0 30px, #A81E2C 30px 56px, #8E1622 56px 80px)', boxShadow: 'inset 0 -40px 60px rgba(0,0,0,0.4)', borderRadius: s < 0 ? '0 0 40px 0' : '0 0 0 40px'}} />;
  return (
    <Abs x={0} y={y} w={1080} h={h} style={{zIndex: 6, overflow: 'hidden'}}>
      {half(-1)}{half(1)}
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 70, background: 'repeating-linear-gradient(90deg, #6A0C16 0 40px, #8E1622 40px 80px)', borderBottom: `8px solid ${GOLD}`, borderRadius: '0 0 30px 30px'}} />
    </Abs>
  );
};

/* ═════════════ Matrice SWOT (2 × 2, en-têtes internes en haut, externes à gauche) ═════════════ */
type MC4 = [string, string, string, string];
const MCELL: MC4[] = [['Stratégies offensives', 'Forces × Opportunités', C_OFF, '♞'], ['Stratégies adaptatives', 'Faiblesses × Opportunités', C_ADA, '♛'], ['Stratégies défensives', 'Forces × Menaces', C_DEF, '♜'], ['Stratégies de survie', 'Faiblesses × Menaces', C_SUR, '♚']];
const MX = 190, MY = 560, MW = 400, MH = 230, MG = 14;
const cellXY = (i: number) => [MX + (i % 2) * (MW + MG), MY + Math.floor(i / 2) * (MH + MG)];
const WMatrix: React.FC<{at: number; hd: [number, number, number, number]; show?: (i: number, t: number) => number; hi?: (i: number, t: number) => number; dim?: (i: number, t: number) => number}> = ({at, hd, show, hi, dim}) => {
  const t = useT();
  const head = (l: string, c: string, a: number, x: number, y: number, w: number, h: number, vert?: boolean): React.ReactNode => { const q = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0; return <div key={l} style={{position: 'absolute', left: x, top: y, width: w, height: h, ...nb(c, 5), borderColor: NBK, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${q})`}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff', transform: vert ? 'rotate(-90deg)' : undefined, whiteSpace: 'nowrap'}}>{l}</span></div>; };
  return (
    <>
      {t > hd[0] - 0.3 && <div style={{position: 'absolute', left: MX, top: MY - 110, width: 2 * MW + MG, textAlign: 'center', ...CAP, fontSize: 22, color: NAVY, opacity: pop(t, hd[0] - 0.3)}}>Facteurs internes</div>}
      {t > hd[2] - 0.3 && <div style={{position: 'absolute', left: 20, top: MY + MH + MG / 2 - 14, width: 60, ...CAP, fontSize: 22, color: '#3A4A63', transform: 'rotate(-90deg)', whiteSpace: 'nowrap', opacity: pop(t, hd[2] - 0.3)}}>Facteurs externes</div>}
      {head('Forces', CF, hd[0], MX, MY - 76, MW, 62)}{head('Faiblesses', CW, hd[1], MX + MW + MG, MY - 76, MW, 62)}
      {head('Opportunités', CO, hd[2], MX - 86, MY, 72, MH, true)}{head('Menaces', CM, hd[3], MX - 86, MY + MH + MG, 72, MH, true)}
      {MCELL.map(([n, s0, c], i) => {
        const [x, y] = cellXY(i);
        const sh = show ? show(i, t) : 0, h = hi ? hi(i, t) : 0, dm = dim ? dim(i, t) : 0;
        return (
          <div key={i} style={{position: 'absolute', left: x, top: y, width: MW, height: MH, ...nb(h > 0.5 ? c : '#fff', h > 0.5 ? 8 : 5), borderColor: NBK, boxShadow: h > 0.5 ? `0 0 30px ${c}, 8px 8px 0 ${NBK}` : `5px 5px 0 ${NBK}`, opacity: pop(t, at) * (1 - dm * 0.65), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 16, boxSizing: 'border-box', transform: `scale(${1 + h * 0.03})`}}>
            {sh > 0 && <><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: h > 0.5 ? '#fff' : c, textAlign: 'center', lineHeight: 1.05, opacity: sh}}>{n}</div><div style={{...CAP, fontSize: 17, color: h > 0.5 ? '#fff' : DIM, opacity: sh}}>{s0}</div></>}
          </div>
        );
      })}
    </>
  );
};

/* ═════════════ 17. Échiquier stratégique : une pièce d'échecs se pose dans chaque case ═════════════ */
const WChess: React.FC<{at: number; park?: number}> = ({at, park = 1e9}) => {
  const t = useT();
  return (
    <>
      {MCELL.map(([, , c, g], i) => {
        const [x, y] = cellXY(i);
        const a = at + i * 0.35;
        if (t < a - 0.05) return null;
        const q = prog(t, a, a + 0.35, easeIn);
        const b = t > a + 0.35 ? Math.sin(Math.min(1, (t - a - 0.35) / 0.3) * Math.PI) * 14 : 0;
        return (
          <React.Fragment key={i}>
            <div style={{position: 'absolute', left: x + 6, top: y + 6, width: MW - 12, height: MH - 12, borderRadius: 12, backgroundImage: `repeating-conic-gradient(${c}22 0 25%, transparent 0 50%)`, backgroundSize: '60px 60px', opacity: pop(t, a) * (1 - prog(t, park, park + 0.5))}} />
            <div style={{position: 'absolute', left: lerp(x + MW / 2 - 70, x + MW - 120, prog(t, park, park + 0.5, easeInOut)), top: lerp(y + MH / 2 - 92, y + 8, prog(t, park, park + 0.5, easeInOut)) - (1 - q) * 500 - b, width: 140, textAlign: 'center', fontSize: lerp(150, 70, prog(t, park, park + 0.5, easeInOut)), lineHeight: 1, color: c, textShadow: `4px 6px 0 ${NBK}, 0 0 20px ${c}88`, zIndex: 3}}>{g}</div>
          </React.Fragment>
        );
      })}
    </>
  );
};

/* ═════════════ 18. Fusée offensive : décollage, flamme et fumée ═════════════ */
const WRocket: React.FC<{x: number; y: number; at: number; launch: number; c: string}> = ({x, y, at, launch, c}) => {
  const t = useT();
  const k = Math.max(0, t - launch);
  const up = k * k * 260;
  const shake = t > launch - 0.6 && t < launch ? Math.sin(t * 90) * 3 : 0;
  return (
    <Abs x={x} y={y} w={300} h={330} style={{opacity: pop(t, at), overflow: 'visible'}}>
      {t > launch - 0.4 && Array.from({length: 14}, (_, i) => { const age = (t - launch + 0.4 - i * 0.07); if (age < 0) return null; return <div key={i} style={{position: 'absolute', left: 150 - 30 - age * 40 * (i % 2 ? 1 : -1) * 2, top: 290 - Math.min(up, 600) * 0.15 + age * 30, width: 60 + age * 80, height: 60 + age * 80, marginLeft: -age * 40, borderRadius: '50%', background: 'rgba(200,200,205,0.6)', opacity: Math.max(0, 1 - age / 1.6)}} />; })}
      <div style={{position: 'absolute', left: 100 + shake, top: 30 - up, width: 100, height: 260}}>
        <svg width={100} height={260} style={{overflow: 'visible'}}>
          {t > launch - 0.4 && <polygon points={`32,210 68,210 50,${260 + 40 + Math.sin(t * 40) * 14}`} fill="#FFB020" stroke="#FF5A1F" strokeWidth={5} />}
          <path d="M 50 0 C 90 40 90 120 80 210 L 20 210 C 10 120 10 40 50 0 Z" fill="#fff" stroke={NBK} strokeWidth={6} />
          <circle cx={50} cy={90} r={18} fill={c} stroke={NBK} strokeWidth={5} />
          <polygon points="20,150 0,215 22,205" fill={c} stroke={NBK} strokeWidth={5} /><polygon points="80,150 100,215 78,205" fill={c} stroke={NBK} strokeWidth={5} />
        </svg>
      </div>
    </Abs>
  );
};

/* ═════════════ 19. Remparts défensifs : la muraille se dresse, les flèches ricochent ═════════════ */
const WRampart: React.FC<{x: number; y: number; w: number; at: number; rise: number; c: string}> = ({x, y, w, at, rise, c}) => {
  const t = useT();
  const q = prog(t, rise, rise + 0.7, easeOut);
  const H = 200;
  return (
    <Abs x={x} y={y} w={w} h={H + 60} style={{opacity: pop(t, at), overflow: 'visible'}}>
      <div style={{position: 'absolute', left: 0, bottom: 0, width: w, height: H * q, overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 0, bottom: 0, width: w, height: H - 40, background: `repeating-linear-gradient(0deg, #8A8F99 0 4px, #B6BBC4 4px 40px), repeating-linear-gradient(90deg, transparent 0 76px, #8A8F99 76px 80px)`, border: `6px solid ${NBK}`, boxSizing: 'border-box'}} />
        {Array.from({length: Math.floor(w / 80)}, (_, k) => <div key={k} style={{position: 'absolute', left: k * 80 + 6, bottom: H - 46, width: 52, height: 46, background: '#B6BBC4', border: `6px solid ${NBK}`, borderBottom: 'none', boxSizing: 'border-box'}} />)}
        <div style={{position: 'absolute', left: w / 2 - 50, bottom: 30, width: 100, height: 120, borderRadius: '10px 10px 50px 50px', background: c, border: `6px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="ShieldCheck" size={60} c="#fff" /></div>
      </div>
      {t > rise + 0.6 && Array.from({length: 3}, (_, k) => { const a = rise + 0.7 + k * 0.45; const p = prog(t, a, a + 0.6, lin); if (p <= 0 || p >= 1) return null; const hx = w / 2 + 40, hy = H - 150 + k * 20; const sx0 = w + 260, sy0 = -160 - k * 40, ex = w + 200, ey = -260; const hit = p > 0.55; const f = hit ? (p - 0.55) / 0.45 : p / 0.55; const xx = hit ? lerp(hx, ex, f) : lerp(sx0, hx, f); const yy = hit ? lerp(hy, ey, f) : lerp(sy0, hy, f); const ang = hit ? Math.atan2(ey - hy, ex - hx) : Math.atan2(hy - sy0, hx - sx0); return <div key={k} style={{position: 'absolute', left: xx - 45, top: yy - 4, width: 90, height: 8, background: CM, borderRadius: 4, transform: `rotate(${(ang * 180) / Math.PI}deg)`, opacity: hit ? 1 - f : 1}} />; })}
    </Abs>
  );
};

/* ═════════════ 20. Morphing de forme SVG : la faiblesse se transforme (cercle → étoile → carré, orange → vert) ═════════════ */
const WBlob: React.FC<{cx: number; cy: number; at: number; times: number[]; R?: number}> = ({cx, cy, at, times, R = 120}) => {
  const t = useT();
  const shapes: ((th: number) => number)[] = [() => 1, (th) => 0.72 + 0.28 * Math.cos(5 * th), (th) => (1 / Math.max(Math.abs(Math.cos(th)), Math.abs(Math.sin(th)))) * 0.82];
  const u = times.reduce((s0, a) => s0 + prog(t, a, a + 0.8, easeInOut), 0);
  const i0 = Math.min(2, Math.floor(u)), i1 = Math.min(2, i0 + 1), f = u - i0;
  const pts = Array.from({length: 121}, (_, i) => { const th = (i / 120) * Math.PI * 2 - Math.PI / 2; const r = R * lerp(shapes[i0](th), shapes[i1](th), f) * (1 + 0.03 * Math.sin(t * 4 + th * 3)); return `${(cx + r * Math.cos(th)).toFixed(1)},${(cy + r * Math.sin(th)).toFixed(1)}`; }).join(' ');
  return <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}><polygon points={pts} fill={hexMix(CW, CO, u / 2)} stroke={NBK} strokeWidth={8} strokeLinejoin="round" style={{filter: `drop-shadow(8px 8px 0 ${NBK})`}} /></svg>;
};

/* ═════════════ 21. Bouée de sauvetage : lancée en arc, elle flotte sur les vagues ═════════════ */
const WBuoy: React.FC<{x: number; y: number; w: number; at: number; toss: number}> = ({x, y, w, at, toss}) => {
  const t = useT();
  const H = 260;
  const p = prog(t, toss, toss + 0.9, easeOut);
  const bx = lerp(w * 0.85, w * 0.42, p), by = lerp(-40, H * 0.52, p) - Math.sin(p * Math.PI) * 140 + (p >= 1 ? Math.sin(t * 3) * 10 : 0);
  const wave = (yy: number, ph: number) => `M 0 ${H} L 0 ${yy} ` + Array.from({length: 25}, (_, i) => `L ${(i / 24) * w} ${(yy + Math.sin(i * 0.7 + t * 3 + ph) * 12).toFixed(1)}`).join(' ') + ` L ${w} ${H} Z`;
  return (
    <Abs x={x} y={y} w={w} h={H} style={{opacity: pop(t, at), ...nb('#DDF1FA', 7), borderColor: NBK, overflow: 'hidden'}}>
      <svg width={w} height={H} style={{position: 'absolute', inset: 0}}><path d={wave(H * 0.62, 0)} fill="#4FA3D1" /><path d={wave(H * 0.72, 2)} fill="#2C7FB8" /></svg>
      {t > toss && <svg width={w} height={H} style={{position: 'absolute', inset: 0}}><path d={`M ${w - 10} 20 Q ${(w + bx) / 2} ${by - 60}, ${bx} ${by}`} fill="none" stroke="#D9C49A" strokeWidth={5} strokeDasharray="10 6" /></svg>}
      {t > toss && <div style={{position: 'absolute', left: bx - 70, top: by - 70, width: 140, height: 140, borderRadius: 70, background: 'conic-gradient(#E74C3C 0 25%, #fff 0 50%, #E74C3C 0 75%, #fff 0)', border: `6px solid ${NBK}`, transform: `rotate(${p * 540}deg)`, boxSizing: 'border-box'}}><div style={{position: 'absolute', left: 33, top: 33, width: 62, height: 62, borderRadius: 31, background: '#DDF1FA', border: `6px solid ${NBK}`}} /></div>}
    </Abs>
  );
};

/* ═════════════ 22. Écran éclaté en quatre quadrants qui glissent des coins ═════════════ */
const WQuad: React.FC<{at: number; y?: number; S?: number}> = ({at, y = 470, S = 440}) => {
  const t = useT();
  const from = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
  return (
    <>
      {SW4.map(([l, n, en, c, ic], i) => {
        const q = prog(t, at + i * 0.12, at + i * 0.12 + 0.6, easeOut);
        const x = 540 - S - 8 + (i % 2) * (S + 16), yy = y + Math.floor(i / 2) * (S + 16);
        return (
          <div key={l} style={{position: 'absolute', left: x + from[i][0] * (1 - q) * 700, top: yy + from[i][1] * (1 - q) * 700, width: S, height: S, ...nb(c, 8), borderColor: NBK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#fff', overflow: 'hidden'}}>
            <Img src={PH(SW_IMG[i])} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25, mixBlendMode: 'luminosity'}} />
            <Ico n={ic} size={64} c="#fff" />
            <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 150, lineHeight: 0.95, textShadow: `5px 5px 0 ${NBK}`}}>{l}</span>
            <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40}}>{n}</span>
            <span style={{...CAP, fontSize: 18, opacity: 0.85}}>{en}</span>
          </div>
        );
      })}
    </>
  );
};

/* ═════════════ 23. Remplissage liquide d'une case (surface ondulante) ═════════════ */
const WLiquid: React.FC<{x: number; y: number; w: number; h: number; a: number; b: number; c: string}> = ({x, y, w, h, a, b, c}) => {
  const t = useT();
  const lv = prog(t, a, b, easeInOut);
  if (lv <= 0) return null;
  const top = h - h * lv;
  const pts = Array.from({length: 25}, (_, i) => `${(i / 24) * w},${(top + Math.sin(i * 0.6 + t * 5) * (8 * (1 - lv) + 3)).toFixed(1)}`).join(' ');
  return <svg width={w} height={h} style={{position: 'absolute', left: x, top: y, borderRadius: 14, overflow: 'hidden'}}><polygon points={`${pts} ${w},${h} 0,${h}`} fill={c} opacity={0.32} /></svg>;
};

/* ═════════════ 24. Zoom infini (effet Droste) : la matrice contient la matrice ═════════════ */
const WDroste: React.FC<{cx: number; cy: number; at: number; lit: number[]; S?: number}> = ({cx, cy, at, lit, S = 820}) => {
  const t = useT();
  const u = ((t - at) * 0.45) % 1;
  const K = 2.6;
  const app = pop(t, at, 0.5);
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, opacity: app, overflow: 'hidden'}}>
      {[0, 1, 2, 3, 4, 5].map((k) => {
        const s = S * Math.pow(1 / K, k - u);
        if (s > 2600 || s < 8) return null;
        return (
          <div key={k} style={{position: 'absolute', left: cx - s / 2, top: cy - s / 2, width: s, height: s, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: s * 0.02, padding: s * 0.02, boxSizing: 'border-box', background: '#fff', border: `${Math.max(2, s * 0.008)}px solid ${NBK}`, borderRadius: s * 0.03}}>
            {SW4.map(([l, n, , c], i) => { const on = k === 0 && t > lit[i]; return <div key={l} style={{background: on ? c : hexMix(c, '#ffffff', 0.55), borderRadius: s * 0.02, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: on ? `0 0 ${s * 0.04}px ${c}` : 'none'}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: s * 0.16, lineHeight: 1}}>{l}</span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: s * 0.04}}>{n}</span></div>; })}
            <div style={{position: 'absolute', left: s * 0.34, top: s * 0.34, width: s * 0.32, height: s * 0.32, background: PAPER, borderRadius: s * 0.03, border: `${Math.max(2, s * 0.006)}px solid ${NBK}`}} />
          </div>
        );
      })}
    </div>
  );
};

/* ═════════════ 25. Fuite de lumière (light leak) entre deux idées ═════════════ */
const WLeak: React.FC<{times: number[]}> = ({times}) => {
  const t = useT();
  const a = times.find((x) => t >= x && t < x + 0.9);
  if (a === undefined) return null;
  const q = (t - a) / 0.9;
  const o = Math.sin(q * Math.PI);
  return <AbsoluteFill style={{zIndex: 34, pointerEvents: 'none', mixBlendMode: 'screen', opacity: o * 0.7, background: `radial-gradient(60% 40% at ${-20 + q * 140}% ${30 + q * 20}%, rgba(255,170,60,0.9), transparent 70%), radial-gradient(40% 30% at ${120 - q * 120}% ${70 - q * 30}%, rgba(255,90,120,0.6), transparent 70%)`}} />;
};

/* ═════════════ Carrousel rotatif des quatre lettres SWOT (lettres-photos) ═════════════ */
const WSwotRing: React.FC<{a: number; cy: number; lit?: number[]; R?: number; cw?: number}> = ({a, cy, lit = [], R = 330, cw = 330}) => {
  const t = useT();
  const app = Math.min(1, sp(t, a, 7, 13));
  const rot = Math.max(0, t - a) * 30;
  const P = 1600;
  const items = SW4.map((s4, i) => { const th = ((i * 90 + rot) * Math.PI) / 180; const x = R * app * Math.sin(th), z = R * app * Math.cos(th); return {s4, i, x, z, sc: P / (P - z)}; }).sort((u, v) => u.z - v.z);
  return (
    <>
      {items.map(({s4, i, x, z, sc}) => {
        const [l, n, , c] = s4;
        const w = cw * sc;
        const on = lit[i] !== undefined && t > lit[i];
        return (
          <div key={l} style={{position: 'absolute', left: 540 + x - w / 2, top: cy - z * 0.3 - w * 0.5, width: w, height: w, ...nb(on ? c : '#fff', 8 * sc), borderColor: NBK, boxShadow: on ? `0 0 40px ${c}, ${8 * sc}px ${8 * sc}px 0 ${NBK}` : `${8 * sc}px ${8 * sc}px 0 ${c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', filter: `brightness(${1 - cl((-z / (R + 1)) * 0.5)})`, opacity: app, overflow: 'hidden'}}>
            <div style={{transform: `scale(${sc})`}}><PhotoLetterAnim ch={l} src={SW_IMG[i]} size={170} seed={i * 1.3} /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34 * sc, color: on ? '#fff' : c}}>{n}</div>
          </div>
        );
      })}
    </>
  );
};

/* ═════════════ Guichet 1 : introduction ═════════════ */
const RING_STRAT = ['principes-gen/reunions.jpg', 'sysqsse-gen/reunion.jpg', 'iso9001-gen/reunion-plan-transition.jpg', 'iso26/direction-equipe.jpg', 'iso26/tablette-matrice.jpg', 'iso26/analyste-kpi.jpg', 'iso26/courbe-strategie.jpg', 'sysqsse-gen/architecte.jpg'];
const Intro: React.FC = () => {
  const t = useT();
  return (
  <Out end={14.8}>
    <Heads h={[[2.9, ["L'analyse SWOT", 'une méthode stratégique'], [0]], [7.4, ['Deux étapes', 'essentielles'], [1]]]} />
    <Ph a={2.65} b={4.55}><WParticles text="SWOT" cols={[CF, CW, CO, CM]} at={2.7} cy={840} cell={30} /></Ph>
    <Ph a={4.5} b={7.35}>
      <Abs x={0} y={460} w={1080} h={660}><Ring3D imgs={RING_STRAT} at={4.5} w={1080} h={660} cw={500} ch={350} R={600} zr={330} speed={14} cy={0.45} /></Abs>
      <Row3 y={1170} gap={16}><TChip at={4.6} l="Entreprise" c={CF} ic="Factory" fs={36} /><TChip at={5.8} l="Projet" c={CO} ic="Route" fs={36} /><TChip at={6.8} l="Organisation" c={CW} ic="Users" fs={36} /></Row3>
    </Ph>
    <Ph a={7.35} b={14.8}>
      <SearchOpen x={60} y={450} w={960} h={900} at={7.5} query="méthode SWOT" results={['Analyse SWOT : deux étapes', 'Matrice SWOT', 'Stratégies SWOT']} found={0} foundAt={8.7} clickAt={9.2} c={NAVY}>
        <div style={{position: 'absolute', inset: 0, background: '#F4F6FA'}}>
          <div style={{position: 'absolute', left: 0, top: 80, width: 840, display: 'flex', justifyContent: 'center'}}><WNeon text="ÉTAPE 1" sub="L'analyse SWOT" at={10.8} c="#4FC3FF" size={80} /></div>
          <div style={{position: 'absolute', left: 0, top: 370, width: 840, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: NAVY, opacity: pop(t, 12.6)}}>↓</div>
          <div style={{position: 'absolute', left: 0, top: 500, width: 840, display: 'flex', justifyContent: 'center'}}><WNeon text="ÉTAPE 2" sub="La matrice SWOT" at={13.0} c="#FF6FB5" size={80} /></div>
        </div>
      </SearchOpen>
    </Ph>
  </Out>
  );
};

/* ═════════════ Guichet 2 : étape 1, l'analyse ═════════════ */
const GAnalyse: React.FC = () => (
  <Out end={38.75}>
    <Heads h={[[16.7, ['Étape 1 :', "l'analyse SWOT"], [1]], [18.5, ['Identifier', 'les facteurs'], [0]], [24.4, ['Interne', 'ou externe ?'], [0]], [32.8, ['Comprendre', "l'ensemble"], [1]]]} />
    <Ph a={16.6} b={24.35}><WXray x={90} y={470} w={900} h={820} at={16.7} scan={20.1} ext={22.3} /></Ph>
    <Ph a={24.35} b={32.7}><WCell cx={540} cy={860} at={24.4} R={240} inT={[27.3, 27.9]} outT={[30.9, 31.7]} /></Ph>
    <Ph a={32.7} b={38.75}>
      <WPuzzle cx={540} cy={830} times={[33.0, 33.35, 33.7, 34.05]} done={35.2} P={250} />
      <Row3 y={1215}><TChip at={36.5} l="Orienter la réflexion stratégique" c={NAVY} ic="Signpost" fs={32} fill /></Row3>
    </Ph>
  </Out>
);

/* ═════════════ Guichet 3 : étape 2, la matrice ═════════════ */
const GMatrice: React.FC = () => {
  const t = useT();
  const card = (i: number, x: number, y: number): React.ReactNode => {
    const [l, n, , c, ic] = SW4[i];
    let bg = c, sc = 1;
    if (i === 1) { bg = hexMix(CW, CO, prog(t, 57.0, 57.7)); sc = 1 - 0.12 * prog(t, 57.9, 58.4, easeOut); }
    const pulse = i === 3 && t > 60.9 ? 1 + 0.05 * Math.sin((t - 60.9) * 9) * Math.exp(-(t - 60.9)) : 1;
    return <div key={l} style={{position: 'absolute', left: x, top: y, width: 420, height: 280, ...nb(bg, 8), borderColor: NBK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#fff', transform: `scale(${sc * pulse})`}}><Ico n={ic} size={56} c="#fff" /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 90, lineHeight: 1}}>{l}</span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34}}>{i === 1 && t > 57.4 ? 'Faiblesses → leviers' : n}</span></div>;
  };
  return (
    <Out end={67.65}>
      <Heads h={[[40.7, ['Étape 2 :', 'la matrice SWOT'], [1]], [43.8, ['Croiser', 'les éléments'], [0]], [50.3, ['Capitaliser', 'sur les forces'], [0]], [55.5, ['Transformer', 'les faiblesses'], [0]], [61.7, ['Vers la', 'décision'], [1]]]} />
      <Ph a={40.6} b={43.75}><WOrigami cx={540} cy={850} at={40.7} S={270} /></Ph>
      <Ph a={43.75} b={50.25}>
        <WWeave x={150} y={580} w={820} h={600} vAt={[44.5, 44.8]} hAt={[45.2, 45.5]} knot={46.6} />
        <Row3 y={1240}><TChip at={48.6} l="Orientations stratégiques" c={NAVY} ic="Signpost" fs={32} fill /></Row3>
      </Ph>
      <Ph a={50.25} b={61.65}>
        {card(0, 80, 480)}{card(1, 580, 480)}{card(2, 80, 900)}{card(3, 580, 900)}
        <Arrow x1={290} y1={765} x2={290} y2={890} at={53.0} c={CO} w={14} />
        <Arrow x1={380} y1={760} x2={640} y2={890} at={54.4} c={CM} w={14} />
        {t > 53.2 && <Abs x={60} y={785} w={220} style={{display: 'flex', justifyContent: 'flex-end'}}><NBadge at={53.3} text="MAXIMISER ↑" bg={CO} rot={-4} size={26} /></Abs>}
        {t > 54.6 && <Abs x={470} y={790} w={300} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={54.7} text="RÉDUIRE ↓" bg={CM} rot={3} size={26} /></Abs>}
        {t > 57.0 && <Abs x={720} y={430} w={300} style={{display: 'flex', justifyContent: 'flex-end', zIndex: 5}}><NBadge at={57.1} text={t > 57.9 ? 'TRANSFORMER · LIMITER' : 'TRANSFORMER'} bg={NAVY} rot={-3} size={24} /></Abs>}
        <Row3 y={1220}>{t > 60.8 && <TChip at={60.9} l="Risques externes pris en compte" c={CM} ic="TriangleAlert" fs={30} />}</Row3>
      </Ph>
      <Ph a={61.65} b={67.65}><WTreasure x={60} y={470} w={960} h={780} at={61.8} end={66.2} marks={[['Vision globale', 63.9], ['Structurée', 64.7]]} /></Ph>
    </Out>
  );
};

/* ═════════════ Guichet 4 : facteurs internes — forces et faiblesses ═════════════ */
const GInterne: React.FC = () => (
  <Out end={92.6}>
    <Heads h={[[69.6, ['Les quatre', 'éléments'], [1]], [71.4, ['S · Forces', 'ce qui fonctionne bien'], [0]], [83.8, ['W · Faiblesses', 'les points à améliorer'], [0]]]} />
    <Ph a={69.5} b={71.35}><WQuad at={69.6} y={470} S={420} /></Ph>
    <Ph a={71.35} b={83.75}>
      <ZAxis l="S" name="Forces" c={CF} at={71.4} />
      <ZDef text="Ce qui fonctionne bien au sein de l'organisation" a={74.8} e={77.1} y={565} fs={46} />
      <WGauge x={90} y={790} h={470} at={77.3} c={CF} perf={82.4} items={[['Avantages', 79.2, 'Award'], ['Atouts', 80.1, 'Sparkles'], ['Contribution positive', 80.8, 'ThumbsUp']]} />
    </Ph>
    <Ph a={83.75} b={92.6}>
      <ZAxis l="W" name="Faiblesses" c={CW} at={83.8} />
      <Photo src="isoperf-gen/fracture.jpg" x={60} y={565} w={960} h={470} at={84.2} c={CW} pos="50% 40%" tag="FAIBLESSES"><WCracks w={960} h={470} hits={[[0.28, 0.35, 87.0], [0.72, 0.55, 88.6], [0.5, 0.8, 89.1]]} /></Photo>
      <Row3 y={1075} gap={14}><TChip at={87.0} l="Points à améliorer" c={CW} ic="Wrench" fs={30} /><TChip at={88.6} l="Lacunes" c={CW} ic="Unlink" fs={30} /><TChip at={89.3} l="Insuffisances" c={CW} ic="TrendingDown" fs={30} /></Row3>
      <Row3 y={1185}><TChip at={90.9} l="Frein à la performance" c={RED} ic="OctagonAlert" fs={30} fill /></Row3>
    </Ph>
  </Out>
);

/* ═════════════ Guichet 5 : facteurs externes — opportunités et menaces ═════════════ */
const GExterne: React.FC = () => (
  <Out end={114.65}>
    <Heads h={[[94.5, ['O · Opportunités', 'des facteurs positifs'], [0]], [104.2, ['T · Menaces', 'risques et obstacles'], [0]]]} />
    <Ph a={94.4} b={104.15}>
      <ZAxis l="O" name="Opportunités" c={CO} at={94.5} />
      <WScope x={60} y={565} w={960} h={560} at={94.8} src="principes-gen/base.jpg" c={CO} finds={[['Croissance', 100.5, 0.25, 0.42, 'TrendingUp'], ['Développement', 101.5, 0.55, 0.66, 'Sprout'], ['Succès', 102.4, 0.8, 0.36, 'Award']]} />
      <ZDef text="Des facteurs externes positifs, à exploiter" a={96.6} e={99.3} y={1160} fs={40} />
    </Ph>
    <Ph a={104.15} b={114.65}>
      <ZAxis l="T" name="Menaces" c={CM} at={104.2} />
      <WStorm at={104.4} y={540} h={470} bolts={[[107.5, 0.28, 'RISQUES'], [108.2, 0.72, 'OBSTACLES']]} />
      <WDomino x={216} y={1040} at={109.0} fall={111.6} c={CM} labels={['Menace', 'Objectifs', 'Fonctionnement', 'Organisation']} />
    </Ph>
  </Out>
);

/* ═════════════ Guichet 6 : la matrice et les quatre stratégies ═════════════ */
const STRAT: [number, number, number][] = [[0, 134.0, 144.55], [2, 144.6, 152.15], [1, 152.2, 161.45], [3, 161.5, 171.3]];
const GStrat: React.FC = () => {
  const show = (i: number, tt: number) => { const s0 = STRAT.find((x) => x[0] === i)!; return tt > s0[1] ? 1 : 0; };
  const hi = (i: number, tt: number) => { const s0 = STRAT.find((x) => x[0] === i)!; return tt > s0[1] && tt < s0[2] ? 1 : 0; };
  const dim = (i: number, tt: number) => (tt > 134.0 && tt < 171.3 && !hi(i, tt) ? 1 : 0);
  return (
    <Out end={171.3}>
      <Heads h={[[116.5, ['Construire', 'la matrice SWOT'], [1]], [121.0, ['Le croisement', 'interne × externe'], [0]], [130.2, ['Quatre catégories', 'de stratégies'], [0]], [134.0, ['1. Offensives', 'forces × opportunités'], [0]], [144.6, ['2. Défensives', 'forces × menaces'], [0]], [152.2, ['3. Adaptatives', 'faiblesses × opportunités'], [0]], [161.5, ['4. Survie', 'faiblesses × menaces'], [0]]]} />
      <WMatrix at={116.6} hd={[124.7, 125.3, 128.8, 129.8]} show={show} hi={hi} dim={dim} />
      {MCELL.map(([, , c], i) => { const [x, y] = cellXY(i); const a = 126.8 + i * 0.3; return <WLiquid key={i} x={x + 5} y={y + 5} w={MW - 10} h={MH - 10} a={a} b={a + 1.6} c={c} />; })}
      <WChess at={130.4} park={133.6} />
      <WCurtain at={117.6} dur={1.6} />
      <Ph a={134.0} b={144.55}>
        <WRocket x={40} y={1050} at={134.1} launch={141.1} c={C_OFF} />
        <ZDef text="Exploiter les forces internes pour saisir les opportunités externes" a={137.6} e={143.6} x={380} y={1080} w={640} fs={36} />
      </Ph>
      <Ph a={144.6} b={152.15}>
        <WRampart x={60} y={1080} w={400} at={144.7} rise={149.6} c={C_DEF} />
        <ZDef text="Utiliser les forces internes pour contrer ou limiter les menaces externes" a={147.6} e={151.7} x={500} y={1080} w={520} fs={34} />
      </Ph>
      <Ph a={152.2} b={161.45}>
        <Photo src="isoperf-gen/fracture.jpg" x={60} y={1070} w={300} h={270} at={152.3} c={C_ADA} pos="50% 40%"><WCracks w={300} h={270} hits={[[0.3, 0.4, 152.5], [0.7, 0.65, 152.8]]} gold={157.3} /></Photo>
        <WBlob cx={470} cy={1205} at={152.4} times={[157.3, 158.1]} R={70} />
        <ZDef text="Combler ou transformer les faiblesses en s'appuyant sur les opportunités" a={155.9} e={161.1} x={580} y={1075} w={440} fs={32} />
      </Ph>
      <Ph a={161.5} b={171.3}>
        <WBuoy x={60} y={1075} w={480} at={161.6} toss={166.6} />
        <ZDef text="Minimiser les faiblesses et éviter les menaces pour limiter leurs impacts négatifs" a={165.5} e={170.9} x={580} y={1075} w={440} fs={32} />
      </Ph>
    </Out>
  );
};

/* ═════════════ Guichet 7 : bilan ═════════════ */
const GBilan: React.FC = () => (
  <Out end={OUTRO_AT}>
    <Heads h={[[173.1, ['Une méthode', 'structurée'], [1]], [177.6, ['Identifier', 'les quatre éléments'], [0]], [181.2, ['Des orientations', 'stratégiques adaptées'], [0]]]} />
    <Ph a={173.0} b={177.55}><Abs x={60} y={470} w={960} h={860} style={{...nb('#fff', 8), borderColor: NBK, boxShadow: `8px 8px 0 ${NAVY}`, overflow: 'hidden'}}><WDroste cx={480} cy={430} at={173.1} lit={[1e9, 1e9, 1e9, 1e9]} S={640} /></Abs></Ph>
    <Ph a={177.5} b={181.15}><WSwotRing a={177.55} cy={840} lit={[177.8, 178.4, 179.8, 180.8]} R={320} cw={320} /></Ph>
    <Ph a={181.15} b={OUTRO_AT}>
      <WCompass cx={540} cy={850} at={181.2} settle={182.6} R={260} labels={[['Offensives', C_OFF], ['Défensives', C_DEF], ['Survie', C_SUR], ['Adaptatives', C_ADA]]} />
      <Row3 y={1170}><TChip at={182.7} l="Orientations stratégiques adaptées" c={CO} ic="Signpost" fs={32} fill /></Row3>
    </Ph>
  </Out>
);

/* ═════════════ Police de la vidéo : Cambria (repli Caladea embarqué, équivalent libre aux métriques identiques) ═════════════ */
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-Regular.ttf'), weight: '400'});
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-Bold.ttf'), weight: '700'});
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-Italic.ttf'), weight: '400', style: 'italic'});
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-BoldItalic.ttf'), weight: '700', style: 'italic'});
const CAMBRIA_CSS = ".cambria, .cambria * { font-family: Cambria, 'Caladea', Georgia, serif !important; }";

/* ═════════════ Couverture : SWOT en relief 3D à face lettres-photos, titre en lettres-photos animées ═════════════ */
const WCover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Bg />
      <Abs x={0} y={40} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.14)'}}><Img src={staticFile(LOGO)} style={{height: 76, display: 'block'}} /></div></Abs>
      <Abs x={0} y={190} w={1080} style={{display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap'}}><PhotoLetterAnim ch="L'ANALYSE ET" src="iso26/courbe-strategie.jpg" size={104} ls={3} seed={2} /></Abs>
      <Abs x={0} y={300} w={1080} style={{display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap'}}><PhotoLetterAnim ch="LA MATRICE" src="sysqsse-gen/reunion.jpg" size={104} ls={3} seed={4} /></Abs>
      <Abs x={0} y={450} w={1080} style={{display: 'flex', justifyContent: 'center'}}><WExtrude text="SWOT" src="swot/postits.jpg" size={300} depth={18} c={NAVY} /></Abs>
      <Abs x={50} y={840} w={980} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18}}>
        {SW4.map(([l, n, en, c, ic]) => (
          <div key={l} style={{height: 150, ...nb('#fff', 7), borderColor: NBK, boxShadow: `7px 7px 0 ${c}`, display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px'}}>
            <div style={{width: 96, height: 96, borderRadius: 20, background: c, border: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: '#fff', flexShrink: 0}}>{l}</div>
            <div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK, lineHeight: 1}}>{n}</div><div style={{display: 'flex', alignItems: 'center', gap: 6, marginTop: 6}}><Ico n={ic} size={24} c={c} /><span style={{...CAP, fontSize: 18, color: DIM}}>{en}</span></div></div>
          </div>
        ))}
      </Abs>
      <Abs x={0} y={1205} w={1080} style={{textAlign: 'center'}}><span style={{...CAP, fontSize: 28, color: DIM, letterSpacing: 6}}>Deux étapes · quatre stratégies</span></Abs>
      <Abs x={60} y={1400} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 64 + k * 138 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box'}} />)}
        <div style={{position: 'absolute', left: 64 + 0.5 * 138 - 28, top: 36}}><Capsule w={56} c={NAVY} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 64 + k * 138 - 69, width: 138, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 16, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Montage, bruitage ═════════════ */
const TK = 1.8;
const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1 / TK, 4, 0.18 / TK, 'sfx/ding', 0.12), {at: x.at + 0.45 / TK, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95 / TK, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6 / TK, s: 'sfx/pop', v: 0.2}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len / 2), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const POPS = [4.6, 5.8, 6.8, 27.3, 27.9, 30.9, 31.7, 36.5, 48.6, 53.3, 54.7, 57.1, 60.9, 71.4, 79.2, 80.1, 80.8, 83.8, 87.0, 88.6, 89.3, 90.9, 94.5, 100.5, 101.5, 102.4, 104.2, 124.7, 125.3, 128.8, 129.8, 182.7];
const LEAKS = [24.4, 32.8, 43.8, 50.3, 61.7, 130.2, 177.5];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at + 0.15, s: 'sfx/bell', v: 0.14})),
  ...POPS.map((at) => ({at, s: 'sfx/pop', v: 0.18})), ...LEAKS.map((at) => ({at, s: 'soft-whoosh', v: 0.18, dur: 1})),
  {at: 2.7, s: 'riser', v: 0.18, dur: 1.4}, {at: 4.0, s: 'bass-hit', v: 0.28},
  ...searchCues(7.5, 12, 8.7, 9.2), ...rep(10.8, 5, 0.1, 'tick', 0.12), ...rep(13.0, 5, 0.1, 'tick', 0.12), {at: 11.4, s: 'sfx/ding', v: 0.2}, {at: 13.6, s: 'sfx/ding', v: 0.2},
  {at: 20.1, s: 'riser', v: 0.16, dur: 1.6}, {at: 22.3, s: 'sfx/pop', v: 0.2},
  ...[33.7, 34.05, 34.4, 34.75].map((at) => ({at, s: 'sfx/thud', v: 0.28})), {at: 35.2, s: 'validation', v: 0.25},
  {at: 41.2, s: 'sfx/swish', v: 0.25}, {at: 42.0, s: 'sfx/swish', v: 0.25},
  ...[44.5, 44.8, 45.2, 45.5].map((at) => ({at, s: 'sfx/swish', v: 0.18})), ...rep(46.6, 4, 0.15, 'sfx/ding', 0.12),
  {at: 53.0, s: 'sfx/whoosh', v: 0.25}, {at: 54.4, s: 'sfx/whoosh', v: 0.25}, {at: 66.2, s: 'tampon', v: 0.4},
  ...rep(69.6, 4, 0.12, 'sfx/swish', 0.2), ...rep(79.2, 3, 0.9, 'sfx/ding', 0.14), {at: 82.4, s: 'validation', v: 0.25},
  ...[87.0, 88.6, 89.1].map((at) => ({at, s: 'sfx/thud', v: 0.3})),
  {at: 100.5, s: 'sfx/ding', v: 0.2}, {at: 101.5, s: 'sfx/ding', v: 0.2}, {at: 102.4, s: 'sfx/ding', v: 0.2},
  {at: 104.4, s: 'riser', v: 0.15, dur: 1.5}, {at: 107.5, s: 'bass-hit', v: 0.35}, {at: 108.2, s: 'bass-hit', v: 0.35}, ...rep(111.6, 4, 0.16, 'sfx/click', 0.25),
  {at: 117.6, s: 'soft-whoosh', v: 0.4, dur: 1.5}, {at: 126.8, s: 'tick', v: 0.1, dur: 2.5}, ...rep(130.4, 4, 0.35, 'sfx/thud', 0.3),
  {at: 141.1, s: 'riser', v: 0.2, dur: 1.5}, {at: 149.6, s: 'sfx/thud', v: 0.35}, ...rep(150.3, 3, 0.45, 'sfx/click', 0.2), {at: 157.3, s: 'sfx/rise', v: 0.2, dur: 1.2}, {at: 158.1, s: 'sfx/swish', v: 0.2}, {at: 166.6, s: 'sfx/whoosh', v: 0.3}, {at: 167.5, s: 'sfx/swish', v: 0.2},
  {at: 173.1, s: 'sfx/rise', v: 0.18, dur: 2}, ...[177.8, 178.4, 179.8, 180.8].map((at) => ({at, s: 'sfx/pop', v: 0.2})), {at: 181.2, s: 'sfx/swish', v: 0.25}, {at: 182.6, s: 'tampon', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];
const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SCN: [React.FC, number, number][] = [[Intro, 2.6, 14.85], [GAnalyse, 16.6, 38.8], [GMatrice, 40.6, 67.7], [GInterne, 69.5, 92.65], [GExterne, 94.4, 114.7], [GStrat, 116.5, 171.35], [GBilan, 173.0, OUTRO_AT]];
export const SwotMatriceMetro: React.FC = () => (
  <AbsoluteFill className="cambria" style={{background: PAPER}}>
    <style>{CAMBRIA_CSS}</style>
    <Bg />
    {SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    <WLeak times={LEAKS} />
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7 / TK}><TimeWarp.Provider value={{at: x.at, k: TK}}><C i={i} /></TimeWarp.Provider></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><WCover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-swot-matrice-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u2 = [wn, Avatar, Ring3D, SlamTag, Arrow, slamK, CAP, STAGE, SCAN, RING_ISO, Drum, Marked, Announce, MBadge, RailSteps, StairSteps, ZigSteps, QBubble, Grid15, RameWipe, Forklift, ICO, MC, ACR, lin, hexMix, cl, GyroFlash, Hot, Photo, Pill2, Ph, TChip, Row3, SlamCard, ZInk, ZTicker, ZAxis, ZDef, WLiquid, C_OFF];

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn, Barred, Flap];
