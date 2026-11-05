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
 * « Quelle différence entre QSE, QSSTE, QHSE, HSE et RSE ? » (voix d'origine, 5 min 28) — capsule « condensé de toutes
 * les techniques + effet wahou + ultra premium » en métro (17 stations). Tube de verre à sept guichets (introduction →
 * QSE → QSSTE → QHSE → HSE → RSE → bilan), la capsule du dossier file d'un guichet à l'autre, transition gyrophare
 * resserrée par TimeWarp, barre de recherche qui ouvre le sommaire des cinq sigles. Couverture : carrousel 3D des cinq
 * sigles en lettres-photos + titre « QUELLE DIFFÉRENCE ? » en lettres-photos animées. Nouvelles techniques : carrousel
 * de sigles qui converge dans un éclair, cubes en bois qui chutent et rebondissent, glitch RGB d'« interchangeabilité »
 * puis verrouillage, télescopage des initiales (lettre → mot), révélation de photo par tache d'encre, sceau de norme à
 * texte en orbite + odomètre à rouleaux (ISO 9001, 14001, 45001), champ de force hexagonal, Venn vivant Q·S·E,
 * morphing FLIP d'un sigle à l'autre (lettres qui glissent, tombent ou éclatent), « git diff » des sigles façon
 * terminal Claude Code, électrocardiogramme de la santé au travail, bandeau de chantier défilant, projecteur de
 * théâtre qui trouve le H, prismes pivotants (trivision), raclette qui nettoie l'écran, cubes-mots 3D français →
 * anglais, réticule de visée, écran en trois bandes diagonales, curseur de comparaison avant / après, temple RSE qui
 * se bâtit (fronton ISO 26000), dézoom concentrique vers les parties prenantes, planète en orbite 3D, terminal
 * Claude Code + matrice de comparaison remplie en vague. Sous-titres NeoCaptions sur la voix d'origine, sans musique.
 */
const IMG = {
  cover: 'sysqsse-gen/couverture.jpg',
  c1: 'sysqsse-gen/qualite.jpg',
  c2: 'sysqsse-gen/environnement.jpg',
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
const OUTRO_AT = 327.6;
export const SIGLES_QHSE_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '0', title: 'Les sigles', s: 'QSE · QSSTE · QHSE · HSE · RSE', c: NAVY, g: 'intro', k: 'none', lab: 'GUICHET 1 / 7'},
  {at: 40.6, n: '1', title: 'QSE', s: 'Qualité · Sécurité · Environnement', c: '#1F6FD1', g: 'QSE', k: 'gyro', lab: 'GUICHET 2 / 7 · SIGLE 1'},
  {at: 95.8, n: '2', title: 'QSSTE', s: 'Qualité · Santé · Sécurité · Environnement', c: '#D9480F', g: 'QSSTE', k: 'gyro', lab: 'GUICHET 3 / 7 · SIGLE 2'},
  {at: 145.75, n: '3', title: 'QHSE', s: 'Qualité · Hygiène · Sécurité · Environnement', c: '#6D4BD8', g: 'QHSE', k: 'gyro', lab: 'GUICHET 4 / 7 · SIGLE 3'},
  {at: 181.4, n: '4', title: 'HSE', s: 'Hygiène · Sécurité · Environnement', c: '#0F9D8F', g: 'HSE', k: 'gyro', lab: 'GUICHET 5 / 7 · SIGLE 4'},
  {at: 225.75, n: '5', title: 'RSE', s: 'Responsabilité sociétale des entreprises', c: '#1E9E5A', g: 'RSE', k: 'gyro', lab: 'GUICHET 6 / 7 · SIGLE 5'},
  {at: 285.0, n: '✓', title: 'En résumé', s: 'Cinq sigles · cinq approches', c: BURG, g: 'bilan', k: 'gyro', lab: 'GUICHET 7 / 7'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 327.0;
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
  {n: 1, l: 'Les sigles', s: 'Sigles', at: 13.7},
  {n: 2, l: 'Qualité', s: 'Qualité', at: 52.3},
  {n: 3, l: 'Sécurité', s: 'Sécurité', at: 63.4},
  {n: 4, l: 'Environnement', s: 'Environ.', at: 72.5},
  {n: 5, l: 'Intégration', s: 'Intégr.', at: 81.0},
  {n: 6, l: 'Santé', s: 'Santé', at: 107.0},
  {n: 7, l: 'Sécurité au travail', s: 'Sécu. trav.', at: 119.2},
  {n: 8, l: 'ISO 45001', s: '45001', at: 139.3},
  {n: 9, l: 'Hygiène', s: 'Hygiène', at: 152.6},
  {n: 10, l: 'Risques sanitaires', s: 'Sanitaire', at: 164.9},
  {n: 11, l: 'Trois axes', s: '3 axes', at: 190.4},
  {n: 12, l: 'Industries à risques', s: 'Secteurs', at: 210.6},
  {n: 13, l: 'Enjeux sociaux', s: 'Social', at: 242.9},
  {n: 14, l: 'Enjeux environnementaux', s: 'Écologie', at: 252.5},
  {n: 15, l: 'Enjeux économiques', s: 'Économie', at: 260.0},
  {n: 16, l: 'ISO 26000', s: '26000', at: 268.6},
  {n: 17, l: 'Bilan', s: 'Bilan', at: 286.9},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE SIGLES · STATION {r.n} / 17</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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


/* ═════════════ Palette des dimensions et des sigles ═════════════ */
const CQ = '#1F6FD1', CSA = '#E0457B', CSE = '#E2483B', CT = '#F07A12', CH = '#6D4BD8', CE = '#1E9E5A', CSO = '#E0A100', CEC = '#0F9D8F';
const S_QSE = '#1F6FD1', S_QSSTE = '#D9480F', S_QHSE = '#6D4BD8', S_HSE = '#0F9D8F', S_RSE = '#1E9E5A';
type LT = [string, string, string];
type SG = {k: string; full: string; c: string; L: LT[]; img: string};
const SIGS: SG[] = [
  {k: 'QSE', full: 'Qualité · Sécurité · Environnement', c: S_QSE, img: 'sysqsse-gen/qualite.jpg', L: [['Q', 'Qualité', CQ], ['S', 'Sécurité', CSE], ['E', 'Environnement', CE]]},
  {k: 'QSSTE', full: 'Qualité · Santé · Sécurité au travail · Environnement', c: S_QSSTE, img: 'sysqsse-gen/sante.jpg', L: [['Q', 'Qualité', CQ], ['S', 'Santé', CSA], ['S', 'Sécurité', CSE], ['T', 'au Travail', CT], ['E', 'Environnement', CE]]},
  {k: 'QHSE', full: 'Qualité · Hygiène · Sécurité · Environnement', c: S_QHSE, img: 'sgh-gen/lecture-etiquette.jpg', L: [['Q', 'Qualité', CQ], ['H', 'Hygiène', CH], ['S', 'Sécurité', CSE], ['E', 'Environnement', CE]]},
  {k: 'HSE', full: 'Hygiène · Sécurité · Environnement', c: S_HSE, img: 'integration/cubes-hse.jpg', L: [['H', 'Hygiène', CH], ['S', 'Sécurité', CSE], ['E', 'Environnement', CE]]},
  {k: 'RSE', full: 'Responsabilité sociétale des entreprises', c: S_RSE, img: 'durab/planete-odd.jpg', L: [['R', 'Responsabilité', S_RSE], ['S', 'Sociétale', CSO], ['E', 'des Entreprises', CEC]]},
];
const sigLetters = (k: string) => SIGS.find((x) => x.k === k)!.L;

/** Sigle en lettres colorées (une couleur par dimension). */
const SigWord: React.FC<{k: string; size: number; mono?: string}> = ({k, size, mono}) => (
  <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, letterSpacing: size * 0.02, lineHeight: 1, whiteSpace: 'nowrap'}}>
    {sigLetters(k).map(([l, , c], i) => <span key={i} style={{color: mono ?? c}}>{l}</span>)}
  </span>
);

/* ═════════════ 1. Carrousel 3D des sigles (lettres-photos ou tuiles) — orbite qui peut converger dans un éclair ═════════════ */
const ZSigRing: React.FC<{a: number; cy: number; R?: number; cw?: number; photo?: boolean; conv?: [number, number]; speed?: number; tilt?: number; fs?: number}> = ({a, cy, R = 360, cw = 330, photo, conv, speed = 34, tilt = 0.3, fs = 96}) => {
  const t = useT();
  const k = Math.max(0, t - a);
  const app = Math.min(1, sp(t, a, 7, 13));
  const cv = conv ? prog(t, conv[0], conv[1], easeIn) : 0;
  const RR = R * app * (1 - cv);
  const rot = k * speed + cv * 300;
  const P = 1600;
  const items = SIGS.map((g, i) => { const th = ((i * 72 + rot) * Math.PI) / 180; const x = RR * Math.sin(th), z = RR * Math.cos(th); return {g, x, z, sc: P / (P - z)}; }).sort((u, v) => u.z - v.z);
  const flash = conv && t > conv[1] - 0.15 ? Math.max(0, 1 - (t - conv[1] + 0.15) / 0.5) : 0;
  return (
    <>
      {items.map(({g, x, z, sc}) => {
        const w = cw * sc * (0.7 + 0.3 * app);
        const dim = cl((-z / (R + 1)) * 0.55);
        return (
          <div key={g.k} style={{position: 'absolute', left: 540 + x - w / 2, top: cy - z * tilt - w * 0.32, width: w, height: w * 0.64, ...nb('#fff', 7 * sc), borderColor: NBK, boxShadow: `${7 * sc}px ${7 * sc}px 0 ${g.c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', filter: `brightness(${1 - dim})`, opacity: app, overflow: 'hidden'}}>
            <div style={{transform: `scale(${sc * (0.7 + 0.3 * app)})`}}>{photo ? <PhotoLetterAnim ch={g.k} src={g.img} size={fs} ls={2} seed={SIGS.indexOf(g) * 1.7} /> : <SigWord k={g.k} size={fs} />}</div>
          </div>
        );
      })}
      {flash > 0 && <AbsoluteFill style={{background: `radial-gradient(circle at 540px ${cy}px, #fff 0%, rgba(255,255,255,${flash}) 40%, rgba(255,255,255,0) 75%)`, opacity: flash, zIndex: 9}} />}
    </>
  );
};

/* ═════════════ 2. Cubes en bois qui chutent, rebondissent et s'alignent (physique) ═════════════ */
type BK = [string, string, string, number, string?];
const ZBlocks: React.FC<{items: BK[]; y: number; size?: number}> = ({items, y, size = 168}) => {
  const t = useT();
  const gap = (960 - items.length * size) / Math.max(1, items.length - 1);
  return (
    <>
      {items.map(([l, w, c, at, ic], i) => {
        const k = t - at;
        if (k < -0.02) return null;
        const fall = k < 0.38 ? -760 * (1 - Math.pow(k / 0.38, 2)) : -70 * Math.abs(Math.sin((k - 0.38) * 11)) * Math.exp(-(k - 0.38) * 6.5);
        const imp = k > 0.38 ? Math.exp(-(k - 0.38) * 14) : 0;
        const x = 60 + i * (size + gap);
        const lab = pop(t, at + 0.45);
        return (
          <React.Fragment key={i}>
            <div style={{position: 'absolute', left: x, top: y + fall, width: size, height: size, transform: `scaleY(${1 - imp * 0.14}) scaleX(${1 + imp * 0.08}) rotate(${(1 - cl(k / 0.38)) * (i % 2 ? 12 : -12)}deg)`, transformOrigin: '50% 100%'}}>
              <div style={{position: 'absolute', left: 14, top: -14, width: size, height: 14, background: '#D9B27A', transform: 'skewX(-45deg)', transformOrigin: '0 100%', border: '3px solid #6B4A22', borderBottom: 'none', boxSizing: 'border-box'}} />
              <div style={{position: 'absolute', right: -14, top: -7, width: 14, height: size, background: '#B98B4E', transform: 'skewY(-45deg)', transformOrigin: '0 0', border: '3px solid #6B4A22', borderLeft: 'none', boxSizing: 'border-box'}} />
              <div style={{position: 'absolute', inset: 0, borderRadius: 10, background: 'repeating-linear-gradient(8deg, #E8C99A 0 9px, #E1BE8A 9px 13px, #EBCFA4 13px 22px)', border: '4px solid #6B4A22', boxShadow: 'inset 0 0 18px rgba(107,74,34,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.62, color: c, textShadow: '2px 2px 0 rgba(0,0,0,0.25)'}}>{l}</span>
                {ic && <div style={{position: 'absolute', right: 8, bottom: 6, opacity: 0.85}}><Ico n={ic} size={size * 0.2} c="#6B4A22" /></div>}
              </div>
            </div>
            <div style={{position: 'absolute', left: x - 20, width: size + 40, top: y + size + 22, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: w.length > 12 ? 24 : 28, color: INK, opacity: lab, transform: `translateY(${(1 - lab) * 16}px)`, lineHeight: 1.05}}>{w}</div>
            {imp > 0.05 && <div style={{position: 'absolute', left: x - 30, top: y + size - 10, width: size + 60, height: 30, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(140,110,70,0.5), transparent)', opacity: imp, transform: `scaleX(${1 + (1 - imp) * 0.8})`}} />}
          </React.Fragment>
        );
      })}
    </>
  );
};

/* ═════════════ 3. Glitch RGB d'« interchangeabilité » puis verrouillage ═════════════ */
const PERMS = [[0, 1, 2, 3, 4], [2, 0, 4, 1, 3], [4, 3, 1, 0, 2], [1, 4, 0, 2, 3], [3, 2, 4, 0, 1], [0, 3, 1, 4, 2], [0, 1, 2, 3, 4]];
const ZGlitchSwap: React.FC<{a: number; lock: number; y: number; neq?: number; aim?: number}> = ({a, lock, y, neq = 1e9, aim = 1e9}) => {
  const t = useT();
  const seg = (lock - a) / (PERMS.length - 1);
  const u = cl((t - a) / (lock - a)) * (PERMS.length - 1);
  const p0 = Math.min(PERMS.length - 1, Math.floor(u));
  const p1 = Math.min(PERMS.length - 1, p0 + 1);
  const f = easeInOut(cl((u - p0 - 0.55) / 0.45));
  const W = 176, gap = (960 - 5 * W) / 4;
  const slot = (s0: number) => 60 + s0 * (W + gap);
  const moving = t < lock && t > a ? 1 : 0;
  return (
    <>
      {SIGS.map((g, i) => {
        const x = lerp(slot(PERMS[p0].indexOf(i)), slot(PERMS[p1].indexOf(i)), f);
        const v = moving * Math.sin(f * Math.PI) * (seg > 0 ? 1 : 0);
        const jit = moving ? (random(`g${i}-${Math.floor(t * 20)}`) - 0.5) * 10 : 0;
        const locked = t >= lock ? Math.min(1, sp(t, lock, 9, 14)) : 0;
        return (
          <div key={g.k} style={{position: 'absolute', left: x + jit, top: y, width: W, height: 150, ...nb('#fff', 6), borderColor: NBK, boxShadow: `6px 6px 0 ${g.c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `skewX(${v * -14}deg) scale(${1 + locked * 0.04 * Math.sin(locked * Math.PI)})`}}>
            <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: g.k.length > 4 ? 44 : 56, color: NBK, textShadow: v > 0.05 || moving ? `${-6 * (v + 0.3)}px 0 rgba(255,0,60,0.75), ${6 * (v + 0.3)}px 0 rgba(0,200,255,0.75)` : 'none'}}>{g.k}</span>
            {t > aim + i * 0.12 && <div style={{position: 'absolute', top: -30, left: W / 2 - 26, width: 52, height: 52, borderRadius: 26, background: g.c, border: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1, sp(t, aim + i * 0.12, 9, 13))})`}}><Ico n="Target" size={30} c="#fff" /></div>}
          </div>
        );
      })}
      {[0, 1, 2, 3].map((k) => t > neq + k * 0.1 && <div key={k} style={{position: 'absolute', left: slot(k) + W + gap / 2 - 22, top: y + 48, width: 44, height: 54, fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: RED, textAlign: 'center', lineHeight: '54px', transform: `scale(${Math.min(1, sp(t, neq + k * 0.1, 9, 12))})`}}>≠</div>)}
      {moving > 0 && <AbsoluteFill style={{pointerEvents: 'none', backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0 2px, transparent 2px 5px)', opacity: 0.4 + 0.3 * random(`sc${Math.floor(t * 15)}`)}} />}
    </>
  );
};

/* ═════════════ 4. Télescopage des initiales : le sigle en ligne → chaque lettre déroule son mot ═════════════ */
type TL = [string, string, string, number];
const ZTelescope: React.FC<{items: TL[]; y: number; rowH?: number; size?: number; start: number; x0?: number; fsw?: number}> = ({items, y, rowH = 150, size = 200, start, x0 = 110, fsw = 74}) => {
  const t = useT();
  const n = items.length;
  const W = size * 0.78;
  const rowX = (i: number) => 540 - (n * W) / 2 + i * W;
  return (
    <>
      {items.map(([l, rest, c, at], i) => {
        const mv = prog(t, at - 0.35, at + 0.1, easeInOut);
        const app = pop(t, start + i * 0.08, 0.35);
        const sz = lerp(size, size * 0.62, mv);
        const x = lerp(rowX(i), x0, mv);
        const yy = lerp(y + rowH * (n - 1) * 0.5 - size * 0.5, y + i * rowH, mv);
        const un = prog(t, at, at + 0.55, easeOut);
        return (
          <div key={i} style={{position: 'absolute', left: x, top: yy, display: 'flex', alignItems: 'baseline', opacity: app, transform: `translateY(${(1 - app) * 40}px)`}}>
            <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: sz, color: c, lineHeight: 1, display: 'inline-block', textShadow: `4px 4px 0 ${NBK}22`}}>{l}</span>
            <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: fsw, color: INK, lineHeight: 1, clipPath: `inset(0 ${(1 - un) * 100}% 0 0)`, whiteSpace: 'nowrap', marginLeft: 3}}>{rest}</span>
            {un > 0 && <div style={{position: 'absolute', left: sz * 0.72, bottom: -10, height: 8, borderRadius: 4, width: un * (rest.length * fsw * 0.55), background: c, opacity: 0.85}} />}
          </div>
        );
      })}
    </>
  );
};

/* ═════════════ 5. Révélation d'une photo par tache d'encre organique ═════════════ */
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

/* ═════════════ 6. Odomètre à rouleaux + sceau de norme à texte en orbite ═════════════ */
const ZOdo: React.FC<{value: string; at: number; size: number; c: string}> = ({value, at, size, c}) => {
  const t = useT();
  const H = size * 1.08;
  return (
    <div style={{display: 'inline-flex', gap: size * 0.04}}>
      {value.split('').map((d, i) => {
        const n = parseInt(d, 10);
        const turns = 2 + i;
        const q = prog(t, at + i * 0.08, at + 0.9 + i * 0.12, easeOut);
        const pos = (turns * 10 + n) * q;
        return (
          <div key={i} style={{width: size * 0.62, height: H, overflow: 'hidden', position: 'relative', background: '#fff', borderRadius: size * 0.1, border: `3px solid ${NBK}`, boxShadow: 'inset 0 10px 12px rgba(0,0,0,0.18), inset 0 -10px 12px rgba(0,0,0,0.18)'}}>
            <div style={{position: 'absolute', left: 0, right: 0, top: -(pos % 10) * H}}>
              {Array.from({length: 11}, (_, k) => <div key={k} style={{height: H, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontWeight: 700, fontSize: size, color: c}}>{k % 10}</div>)}
            </div>
          </div>
        );
      })}
    </div>
  );
};
const ZSeal: React.FC<{x: number; y: number; at: number; num: string; c: string; ring: string; size?: number}> = ({x, y, at, num, c, ring, size = 330}) => {
  const t = useT();
  if (t < at - 0.15) return null;
  const q = prog(t, at - 0.15, at, easeIn);
  const bounce = t > at ? Math.sin(Math.min(1, (t - at) / 0.3) * Math.PI) * 0.05 : 0;
  const id = `seal${num}${Math.round(at)}`;
  const r = size / 2 - 26;
  return (
    <Abs x={x - size / 2} y={y - size / 2} w={size} h={size} style={{transform: `rotate(${-12 + (1 - q) * 30}deg) scale(${lerp(2.3, 1, q) + bounce})`, opacity: cl(q * 2)}}>
      <svg width={size} height={size} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
        <defs><path id={id} d={`M ${size / 2} ${size / 2} m ${-r} 0 a ${r} ${r} 0 1 1 ${2 * r} 0 a ${r} ${r} 0 1 1 ${-2 * r} 0`} /></defs>
        <circle cx={size / 2} cy={size / 2} r={size / 2 - 4} fill="#fff" stroke={c} strokeWidth={8} />
        <circle cx={size / 2} cy={size / 2} r={size / 2 - 48} fill="none" stroke={c} strokeWidth={4} strokeDasharray="6 8" />
        <g transform={`rotate(${(t - at) * 22} ${size / 2} ${size / 2})`}><text fontFamily={MONO} fontWeight={700} fontSize={size * 0.075} fill={c} letterSpacing={3}><textPath href={`#${id}`}>{`${ring} · ${ring} · `}</textPath></text></g>
      </svg>
      <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4}}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.17, color: NBK, letterSpacing: 4}}>ISO</div>
        <ZOdo value={num} at={at + 0.05} size={size * (num.length > 4 ? 0.105 : 0.13)} c={c} />
      </div>
    </Abs>
  );
};

/* ═════════════ 7. Champ de force hexagonal : le bouclier se construit cellule par cellule ═════════════ */
const ZHexShield: React.FC<{cx: number; cy: number; at: number; c: string; R?: number; ic?: string}> = ({cx, cy, at, c, R = 230, ic = 'Users'}) => {
  const t = useT();
  if (t < at) return null;
  const s0 = 34;
  const cells: {x: number; y: number; d: number; ox: number; oy: number}[] = [];
  for (let q = -8; q <= 8; q++) for (let r = -8; r <= 8; r++) {
    const x = s0 * 1.5 * q, y = s0 * Math.sqrt(3) * (r + q / 2);
    const inShield = y < 0 ? Math.hypot(x, y * 0.95) < R : Math.abs(x) < R * (1 - Math.pow(y / (R * 1.25), 2)) && y < R * 1.2;
    if (!inShield) continue;
    const dist = Math.hypot(x, y);
    const ang = random(`hx${q}${r}`) * Math.PI * 2;
    cells.push({x, y, d: dist / R * 0.7 + random(`hd${q}${r}`) * 0.15, ox: Math.cos(ang) * 500, oy: Math.sin(ang) * 500});
  }
  const hex = (x: number, y: number, s: number) => Array.from({length: 6}, (_, k) => `${x + s * Math.cos((k * Math.PI) / 3)},${y + s * Math.sin((k * Math.PI) / 3)}`).join(' ');
  const done = prog(t, at + 1.0, at + 1.3);
  const pulse = done > 0 ? 0.5 + 0.5 * Math.sin((t - at) * 4) : 0;
  return (
    <Abs x={cx - R - 40} y={cy - R - 40} w={2 * R + 80} h={2.4 * R + 80}>
      <svg width={2 * R + 80} height={2.4 * R + 80} style={{overflow: 'visible'}}>
        <g transform={`translate(${R + 40} ${R + 40})`}>
          {cells.map((h, k) => { const p = prog(t, at + h.d, at + h.d + 0.45, easeOut); return <polygon key={k} points={hex(h.x + h.ox * (1 - p), h.y + h.oy * (1 - p), s0 * 0.92)} fill={c} fillOpacity={0.14 + 0.18 * pulse * (k % 3 === 0 ? 1 : 0.5)} stroke={c} strokeWidth={3} opacity={p} />; })}
        </g>
      </svg>
      <div style={{position: 'absolute', left: R + 40 - 80, top: R + 40 - 70, width: 160, height: 160, borderRadius: 80, background: '#fff', border: `5px solid ${NBK}`, boxShadow: `0 0 ${20 + 30 * pulse}px ${c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1, sp(t, at + 0.2))})`}}><Ico n={ic} size={90} c={c} /></div>
    </Abs>
  );
};

/* ═════════════ 8. Venn vivant : trois cercles qui convergent, cœur « QSE » qui s'allume ═════════════ */
type VC = [string, string, string, number];
const ZVenn: React.FC<{items: VC[]; cx: number; cy: number; join: number; center: string; r?: number; pulses?: number[]}> = ({items, cx, cy, join, center, r = 190, pulses = []}) => {
  const t = useT();
  const j = prog(t, join, join + 1.0, easeInOut);
  const d = lerp(330, 118, j);
  return (
    <>
      {items.map(([l, w, c, at], i) => {
        const a = (-90 + i * 120) * (Math.PI / 180);
        const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
        const app = Math.min(1, sp(t, at, 8, 12));
        const pu = pulses[i] && t > pulses[i] ? Math.max(0, 1 - (t - pulses[i]) / 0.8) : 0;
        return (
          <div key={i} style={{position: 'absolute', left: x - r, top: y - r, width: 2 * r, height: 2 * r, borderRadius: r, background: `${c}38`, border: `6px solid ${c}`, mixBlendMode: 'multiply', transform: `scale(${app * (1 + pu * 0.12)})`, boxShadow: pu > 0 ? `0 0 ${50 * pu}px ${c}` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{transform: `translate(${Math.cos(a) * r * 0.42}px, ${Math.sin(a) * r * 0.42}px)`, textAlign: 'center'}}>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 84, color: c, lineHeight: 0.9}}>{l}</div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK}}>{w}</div>
            </div>
          </div>
        );
      })}
      {j > 0.6 && <div style={{position: 'absolute', left: cx - 90, top: cy - 50, width: 180, height: 100, borderRadius: 22, background: NBK, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 52, boxShadow: `0 0 ${30 + 20 * Math.sin(t * 5)}px ${YEL}`, transform: `scale(${Math.min(1, sp(t, join + 0.75, 9, 12))})`}}>{center}</div>}
    </>
  );
};

/* ═════════════ 9. Morphing FLIP d'un sigle à l'autre : lettres communes qui glissent, nouvelles qui tombent, retirées qui éclatent ═════════════ */
const ZMorph: React.FC<{from: LT[]; to: LT[]; map: (number | null)[]; at: number; y: number; size?: number; dur?: number; labels?: number}> = ({from, to, map, at, y, size = 200, dur = 0.9, labels}) => {
  const t = useT();
  const W = size * 0.8;
  const px = (n: number, i: number) => 540 - (n * W) / 2 + i * W;
  const q = prog(t, at, at + dur, easeInOut);
  const used = new Set(map.filter((m) => m !== null) as number[]);
  const lab = labels ?? 1e9;
  const out: React.ReactNode[] = [];
  from.forEach(([l, , c], i) => {
    const m = map[i];
    if (m !== null) {
      const x = lerp(px(from.length, i), px(to.length, m), q);
      out.push(<div key={`f${i}`} style={{position: 'absolute', left: x, top: y, width: W, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: size, lineHeight: 1, color: lerp(0, 1, q) > 0.5 ? to[m][2] : c, textShadow: `5px 5px 0 ${NBK}22`}}>{l}</div>);
    } else {
      const e = prog(t, at, at + 0.7, easeOut);
      if (e < 1) [0, 1, 2, 3].forEach((s) => { const ang = (s * 90 + 45) * (Math.PI / 180); const poly = ['0 0, 50% 0, 50% 50%, 0 50%', '50% 0, 100% 0, 100% 50%, 50% 50%', '50% 50%, 100% 50%, 100% 100%, 50% 100%', '0 50%, 50% 50%, 50% 100%, 0 100%'][s]; out.push(<div key={`x${i}${s}`} style={{position: 'absolute', left: px(from.length, i) + Math.cos(ang) * e * 260, top: y + Math.sin(ang) * e * 260 + e * e * 200, width: W, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: size, lineHeight: 1, color: c, clipPath: `polygon(${poly})`, opacity: 1 - e, transform: `rotate(${(s % 2 ? 1 : -1) * e * 120}deg)`}}>{l}</div>); });
    }
  });
  to.forEach(([l, w, c], j) => {
    if (!used.has(j)) {
      const d = prog(t, at + dur * 0.45, at + dur + 0.25, easeOut);
      const bounce = d >= 1 ? 0 : Math.sin(d * Math.PI) * 0.0;
      out.push(<div key={`n${j}`} style={{position: 'absolute', left: px(to.length, j), top: y - (1 - d) * 520, width: W, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: size, lineHeight: 1, color: c, opacity: d > 0 ? 1 : 0, transform: `scale(${1 + bounce})`, textShadow: `5px 5px 0 ${NBK}22`}}>{l}<div style={{position: 'absolute', left: W / 2 - 22, top: -46, width: 44, height: 44, borderRadius: 22, background: GREEN, border: `4px solid ${NBK}`, color: '#fff', fontSize: 30, lineHeight: '36px', opacity: pop(t, at + dur + 0.2)}}>+</div></div>);
    }
    if (t > lab) out.push(<div key={`w${j}`} style={{position: 'absolute', left: px(to.length, j) - 40, width: W + 80, top: y + size * 1.02 + (to.some((x) => x[1].length > 9) && j % 2 ? 40 : 0), textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: to.length > 4 ? 25 : 27, color: c, opacity: pop(t, lab + j * 0.15), lineHeight: 1.05}}>{w}</div>);
  });
  return <>{out}</>;
};

/* ═════════════ 10. « git diff » des sigles, façon terminal Claude Code ═════════════ */
type DL = [string, ' ' | '+' | '-', number];
const ZDiff: React.FC<{x: number; y: number; w: number; at: number; title: string; lines: DL[]; fs?: number}> = ({x, y, w, at, title, lines, fs = 34}) => {
  const t = useT();
  const app = Math.min(1, sp(t, at, 8, 13));
  return (
    <Abs x={x} y={y} w={w} style={{background: '#0F1420', border: `5px solid ${NBK}`, borderRadius: 20, boxShadow: `10px 10px 0 ${CT}`, overflow: 'hidden', opacity: t > at ? 1 : 0, transform: `translateY(${(1 - app) * 60}px)`}}>
      <div style={{height: 52, background: '#1A2233', display: 'flex', alignItems: 'center', gap: 10, padding: '0 18px', borderBottom: '3px solid #000'}}>
        {[RED, YEL, GREEN].map((q) => <div key={q} style={{width: 14, height: 14, borderRadius: 7, background: q}} />)}
        <span style={{marginLeft: 12, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#C9D2DF'}}><span style={{color: CT}}>✻ claude</span> › {title}</span>
      </div>
      <div style={{padding: '14px 0 18px'}}>
        {lines.map(([l, k, la], i) => {
          const on = t >= la;
          const n = Math.floor(l.length * prog(t, la, la + 0.03 * l.length + 0.1, lin));
          const bg = k === '+' ? 'rgba(46,204,113,0.18)' : k === '-' ? 'rgba(231,76,60,0.2)' : 'transparent';
          const col = k === '+' ? '#5BE38F' : k === '-' ? '#FF7B72' : '#C9D2DF';
          return (
            <div key={i} style={{display: 'flex', gap: 18, padding: '4px 24px', background: on ? bg : 'transparent', opacity: on ? 1 : 0, fontFamily: MONO, fontWeight: 700, fontSize: fs, color: col, whiteSpace: 'nowrap'}}>
              <span style={{width: fs * 0.7, opacity: 0.9}}>{k === ' ' ? '' : k}</span>
              <span style={{textDecoration: k === '-' && n >= l.length ? 'line-through' : 'none'}}>{l.slice(0, n)}{n < l.length && on && <span style={{color: '#fff'}}>▌</span>}</span>
            </div>
          );
        })}
      </div>
    </Abs>
  );
};

/* ═════════════ 11. Électrocardiogramme : la trace avance et chaque pic fait naître un élément ═════════════ */
type EK = [string, number, string];
const ZEcg: React.FC<{x: number; y: number; w: number; h: number; a: number; items: EK[]; c: string; end: number}> = ({x, y, w, h, a, items, c, end}) => {
  const t = useT();
  const n = items.length;
  const pkx = items.map((_, k) => w * ((k + 0.7) / (n + 0.4)));
  const base = h * 0.66;
  const ecgY = (xx: number) => pkx.reduce((v, px) => { const d = xx - px; if (d >= -60 && d < -36) return v - 14 * Math.sin((Math.PI * (d + 60)) / 24); if (d >= -10 && d < -4) return v + 12 * ((d + 10) / 6); if (d >= -4 && d < 0) return v + 12 - 152 * ((d + 4) / 4); if (d >= 0 && d < 6) return v - 140 + 175 * (d / 6); if (d >= 6 && d < 12) return v + 35 - 35 * ((d - 6) / 6); if (d >= 30 && d < 70) return v - 26 * Math.sin((Math.PI * (d - 30)) / 40); return v; }, base) + Math.sin(xx * 0.05) * 2;
  const times = [a, ...items.map((it) => it[1]), end];
  const xs = [0, ...pkx, w];
  let xh = w;
  for (let k = 0; k < times.length - 1; k++) if (t < times[k + 1]) { xh = lerp(xs[k], xs[k + 1], cl((t - times[k]) / (times[k + 1] - times[k]))); break; }
  if (t < a) xh = 0;
  const pts: string[] = [];
  for (let xx = 0; xx <= xh; xx += 3) pts.push(`${xx.toFixed(1)},${ecgY(xx).toFixed(1)}`);
  return (
    <Abs x={x} y={y} w={w} h={h} style={{background: '#07140F', border: `5px solid ${NBK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${c}`, overflow: 'hidden', opacity: pop(t, a - 0.3)}}>
      <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(60,255,150,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(60,255,150,0.08) 1px, transparent 1px)', backgroundSize: '30px 30px'}} />
      <svg width={w} height={h} style={{position: 'absolute', inset: 0}}>
        {pts.length > 1 && <polyline points={pts.join(' ')} fill="none" stroke="#3CFF96" strokeWidth={5} strokeLinejoin="round" style={{filter: 'drop-shadow(0 0 6px #3CFF96)'}} />}
        {xh > 0 && xh < w && <circle cx={xh} cy={ecgY(xh)} r={9} fill="#fff" style={{filter: 'drop-shadow(0 0 10px #3CFF96)'}} />}
      </svg>
      <div style={{position: 'absolute', right: 20, bottom: 14, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#3CFF96', opacity: 0.8}}>♥ SANTÉ AU TRAVAIL</div>
      {items.map(([l, at, ic], k) => { const q = t > at ? Math.min(1, sp(t, at, 9, 13)) : 0; return (
        <div key={k} style={{position: 'absolute', left: pkx[k] - 130, width: 260, top: base - 300, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: t > at ? 1 : 0, transform: `translateY(${(1 - q) * 30}px) scale(${0.7 + 0.3 * q})`}}>
          <div style={{width: 74, height: 74, borderRadius: 37, background: '#fff', border: `4px solid #3CFF96`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n={ic} size={44} c={c} /></div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 25, color: '#fff', textAlign: 'center', lineHeight: 1.08}}>{l}</div>
        </div>
      ); })}
    </Abs>
  );
};

/* ═════════════ 12. Bandeau de chantier défilant en diagonale ═════════════ */
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

/* ═════════════ 13. Projecteur de théâtre : le faisceau balaie le sigle et se pose sur la lettre nouvelle ═════════════ */
const ZSpot: React.FC<{a: number; b: number; xs: number[]; cy: number; land: number; r?: number; out?: number}> = ({a, b, xs, cy, land, r = 150, out = 1e9}) => {
  const t = useT();
  if (t < a || t > out) return null;
  const o = prog(t, a, a + 0.4) * (1 - prog(t, out - 0.4, out));
  const u = cl((t - a) / (b - a));
  const path = [...xs, xs[land]];
  const seg = u * (path.length - 1);
  const k = Math.min(path.length - 2, Math.floor(seg));
  const sx = lerp(path[k], path[k + 1], easeInOut(seg - k));
  const rr = r * (t > b ? 1 + 0.06 * Math.sin((t - b) * 6) : 1);
  return (
    <AbsoluteFill style={{zIndex: 7, pointerEvents: 'none', opacity: o}}>
      <AbsoluteFill style={{background: `radial-gradient(circle at ${sx}px ${cy}px, rgba(255,250,225,0.0) ${rr * 0.85}px, rgba(8,10,18,0.82) ${rr * 1.15}px)`}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><polygon points={`${540 - 40},300 ${540 + 40},300 ${sx + rr * 0.9},${cy} ${sx - rr * 0.9},${cy}`} fill="rgba(255,248,210,0.10)" /></svg>
      <div style={{position: 'absolute', left: 500, top: 270, width: 80, height: 50, borderRadius: 12, background: '#333', border: '4px solid #000', boxShadow: '0 0 30px rgba(255,248,210,0.8)'}} />
    </AbsoluteFill>
  );
};

/* ═════════════ 14. Prismes pivotants (trivision) : les lamelles tournent pour changer de photo ═════════════ */
const ZPrism: React.FC<{x: number; y: number; w: number; h: number; imgs: string[]; times: number[]; labels: string[]; c: string; at: number; n?: number}> = ({x, y, w, h, imgs, times, labels, c, at, n = 9}) => {
  const t = useT();
  const sw = w / n;
  const ih = w / 1.5;
  const cur = times.reduce((acc, tt, k) => (t >= tt ? k : acc), 0);
  const app = pop(t, at, 0.5);
  return (
    <Abs x={x} y={y} w={w} h={h + 90} style={{opacity: app}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: w, height: h, perspective: 1400, ...nb('#111', 8), borderColor: NBK, boxShadow: `8px 8px 0 ${c}`, overflow: 'hidden'}}>
        {Array.from({length: n}, (_, i) => {
          const rot = times.reduce((acc, tt) => acc + 90 * prog(t, tt + i * 0.05, tt + 0.55 + i * 0.05, easeInOut), 0) - 90;
          return (
            <div key={i} style={{position: 'absolute', left: i * sw, top: 0, width: sw, height: h, transformStyle: 'preserve-3d', transform: `translateZ(${-sw / 2}px) rotateY(${-rot}deg)`}}>
              {imgs.map((src, k) => <div key={k} style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: `rotateY(${k * 90}deg) translateZ(${sw / 2}px)`, backgroundImage: `url(${PH(src)})`, backgroundSize: `${w}px ${ih}px`, backgroundPosition: `${-i * sw}px ${-(ih - h) / 2}px`, boxShadow: 'inset -2px 0 0 rgba(0,0,0,0.35)'}} />)}
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: 0, top: h + 22, width: w, display: 'flex', justifyContent: 'center', gap: 14}}>
        {labels.map((l, k) => <div key={l} style={{...nb(k === cur && t >= times[0] ? c : '#fff', 5), borderColor: NBK, padding: '6px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: k === cur && t >= times[0] ? '#fff' : INK, opacity: t >= times[k] ? 1 : 0.25, transform: `scale(${k === cur && t >= times[0] ? 1.06 : 1})`}}>{l}</div>)}
      </div>
    </Abs>
  );
};

/* ═════════════ 15. Raclette qui nettoie l'écran : la saleté s'efface sous la lame ═════════════ */
const ZSqueegee: React.FC<{x: number; y: number; w: number; h: number; at: number; dur?: number; children: React.ReactNode}> = ({x, y, w, h, at, dur = 1.1, children}) => {
  const t = useT();
  const p = prog(t, at, at + dur, easeInOut);
  const bx = lerp(-60, w + 60, p);
  const spots = Array.from({length: 26}, (_, k) => ({x: random(`sq${k}`) * w, y: random(`sqy${k}`) * h, r: 18 + random(`sqr${k}`) * 46}));
  return (
    <Abs x={x} y={y} w={w} h={h}>
      {children}
      <div style={{position: 'absolute', inset: 0, clipPath: `inset(0 0 0 ${Math.max(0, bx)}px)`, background: 'rgba(222,214,196,0.92)', borderRadius: 18}}>
        {spots.map((s, k) => <div key={k} style={{position: 'absolute', left: s.x - s.r, top: s.y - s.r, width: s.r * 2, height: s.r * 2, borderRadius: '50%', background: `radial-gradient(circle, rgba(120,98,60,${0.35 + 0.3 * random(`sqa${k}`)}), rgba(120,98,60,0))`}} />)}
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 30, color: 'rgba(90,70,40,0.55)', letterSpacing: 4}}>PROPRETÉ ?</div>
      </div>
      {p > 0 && p < 1 && (
        <div style={{position: 'absolute', left: bx - 16, top: -30, width: 32, height: h + 60}}>
          <div style={{position: 'absolute', left: 8, top: 0, width: 16, height: h + 60, borderRadius: 8, background: 'linear-gradient(90deg, #222, #555)', border: `3px solid ${NBK}`}} />
          <div style={{position: 'absolute', left: -60, top: (h + 60) / 2 - 12, width: 76, height: 24, borderRadius: 12, background: CH, border: `3px solid ${NBK}`}} />
          {Array.from({length: 6}, (_, k) => <div key={k} style={{position: 'absolute', left: 30 + random(`dr${k}${Math.floor(t * 8)}`) * 20, top: 40 + k * (h / 6), width: 10, height: 10, borderRadius: 5, background: 'rgba(120,180,255,0.7)'}} />)}
        </div>
      )}
    </Abs>
  );
};

/* ═════════════ 16. Cubes-mots 3D bilingues : chaque mot bascule du français à l'anglais ═════════════ */
type WC = [string, string, string, number];
const ZWordCubes: React.FC<{y: number; items: WC[]; at: number; h?: number}> = ({y, items, at, h = 118}) => {
  const t = useT();
  return (
    <Abs x={80} y={y} w={920}>
      {items.map(([fr, en, c, ft], i) => {
        const p = prog(t, ft, ft + 0.6, easeInOut);
        const app = pop(t, at + i * 0.1, 0.4);
        const face = (txt: string, tr: string, bg: string, col: string): React.ReactNode => <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: tr, background: bg, border: `5px solid ${NBK}`, borderRadius: 16, display: 'flex', alignItems: 'baseline', gap: 2, padding: '0 28px', boxSizing: 'border-box'}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 74, color: bg === '#fff' ? c : '#fff', lineHeight: `${h - 10}px`}}>{txt[0]}</span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 58, color: col}}>{txt.slice(1)}</span></div>;
        return (
          <div key={i} style={{position: 'absolute', left: 0, top: i * (h + 26), width: 920, height: h, perspective: 900, opacity: app, transform: `translateX(${(1 - app) * -80}px)`}}>
            <div style={{position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: `translateZ(${-h / 2}px) rotateX(${90 * p}deg)`}}>
              {face(fr, `translateZ(${h / 2}px)`, '#fff', INK)}
              {face(en, `rotateX(-90deg) translateZ(${h / 2}px)`, c, '#fff')}
            </div>
            <div style={{position: 'absolute', right: -6, top: -18, ...CAP, fontSize: 18, color: '#fff', background: p > 0.5 ? NBK : DIM, padding: '3px 10px', borderRadius: 6}}>{p > 0.5 ? 'EN' : 'FR'}</div>
          </div>
        );
      })}
    </Abs>
  );
};

/* ═════════════ 17. Réticule de visée qui se resserre (« version plus ciblée ») ═════════════ */
const ZReticle: React.FC<{cx: number; cy: number; w: number; h: number; at: number; c: string; label: string}> = ({cx, cy, w, h, at, c, label}) => {
  const t = useT();
  if (t < at) return null;
  const q = prog(t, at, at + 0.8, easeOut);
  const ww = lerp(w * 2.4, w, q), hh = lerp(h * 2.4, h, q);
  const L = 54;
  const corner = (sx: number, sy: number) => <div style={{position: 'absolute', left: cx + (sx * ww) / 2 - (sx > 0 ? L : 0), top: cy + (sy * hh) / 2 - (sy > 0 ? L : 0), width: L, height: L, borderTop: sy < 0 ? `9px solid ${c}` : 'none', borderBottom: sy > 0 ? `9px solid ${c}` : 'none', borderLeft: sx < 0 ? `9px solid ${c}` : 'none', borderRight: sx > 0 ? `9px solid ${c}` : 'none'}} />;
  return (
    <>
      {corner(-1, -1)}{corner(1, -1)}{corner(-1, 1)}{corner(1, 1)}
      <div style={{position: 'absolute', left: cx - 2, top: cy - hh / 2 - 40, width: 4, height: 30, background: c, opacity: q}} />
      <div style={{position: 'absolute', left: cx - 2, top: cy + hh / 2 + 10, width: 4, height: 30, background: c, opacity: q}} />
      {q > 0.95 && <div style={{position: 'absolute', left: cx + ww / 2 - 10, top: cy - hh / 2 - 66, ...CAP, fontSize: 24, color: '#fff', background: c, padding: '6px 14px', borderRadius: 8, transform: `scale(${Math.min(1, sp(t, at + 0.8, 9, 12))})`, transformOrigin: '0 100%'}}>{label}</div>}
    </>
  );
};

/* ═════════════ 18. Écran en trois bandes diagonales qui glissent ═════════════ */
type TB = [string, string, string, number, string?];
const ZTri: React.FC<{x: number; y: number; w: number; h: number; items: TB[]; c: string}> = ({x, y, w, h, items, c}) => {
  const t = useT();
  const n = items.length;
  const sk = 90;
  return (
    <Abs x={x} y={y} w={w} h={h}>
      {items.map(([src, l, ic, at, pos], i) => {
        const q = prog(t, at, at + 0.6, easeOut);
        const x0 = (i * w) / n, x1 = ((i + 1) * w) / n;
        const poly = `${x0 + (i === 0 ? -sk : sk / 2)}px 0, ${x1 + (i === n - 1 ? sk : sk / 2)}px 0, ${x1 - (i === n - 1 ? -sk : sk / 2)}px ${h}px, ${x0 - (i === 0 ? sk : sk / 2)}px ${h}px`;
        const dy = (i % 2 ? 1 : -1) * (1 - q) * h;
        return (
          <div key={i} style={{position: 'absolute', inset: 0, clipPath: `polygon(${poly})`, transform: `translateY(${dy}px)`, opacity: q > 0 ? 1 : 0}}>
            <Img src={PH(src)} style={{position: 'absolute', left: x0 - sk, top: 0, width: x1 - x0 + 2 * sk, height: h, objectFit: 'cover', objectPosition: pos ?? 'center', transform: `scale(${1.08 + (t - at) * 0.01})`}} />
            <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.55))'}} />
            <div style={{position: 'absolute', left: x0 + 14, width: x1 - x0 - 28, bottom: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: pop(t, at + 0.4)}}>
              <div style={{width: 64, height: 64, borderRadius: 32, background: c, border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n={ic} size={38} c="#fff" /></div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.8)'}}>{l}</div>
            </div>
          </div>
        );
      })}
      <svg width={w} height={h} style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>{Array.from({length: n - 1}, (_, i) => { const xx = ((i + 1) * w) / n; return <line key={i} x1={xx + sk / 2} y1={0} x2={xx - sk / 2} y2={h} stroke="#fff" strokeWidth={10} opacity={pop(t, items[i + 1][3])} />; })}</svg>
      <div style={{position: 'absolute', inset: 0, border: `6px solid ${NBK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${c}`, pointerEvents: 'none'}} />
    </Abs>
  );
};

/* ═════════════ 19. Curseur de comparaison avant / après ═════════════ */
const ZSlider: React.FC<{x: number; y: number; w: number; h: number; at: number; dur?: number; left: React.ReactNode; right: React.ReactNode; c: string}> = ({x, y, w, h, at, dur = 1.6, left, right, c}) => {
  const t = useT();
  const p = prog(t, at, at + dur, easeInOut);
  const dx = lerp(w - 4, 4, p) + Math.sin(Math.min(1, Math.max(0, (t - at - dur) / 0.6)) * Math.PI) * 18;
  return (
    <Abs x={x} y={y} w={w} h={h} style={{...nb('#fff', 8), borderColor: NBK, boxShadow: `8px 8px 0 ${c}`, overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0}}>{left}</div>
      <div style={{position: 'absolute', inset: 0, clipPath: `inset(0 0 0 ${dx}px)`}}>{right}</div>
      <div style={{position: 'absolute', left: dx - 4, top: 0, width: 8, height: h, background: NBK}} />
      <div style={{position: 'absolute', left: dx - 40, top: h / 2 - 40, width: 80, height: 80, borderRadius: 40, background: '#fff', border: `6px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: NBK}}>⇆</div>
    </Abs>
  );
};

/* ═════════════ 20. Temple qui se bâtit : socle, piliers qui montent, fronton qui s'abat ═════════════ */
type PL = [string, string, string, number];
const ZTemple: React.FC<{x: number; y: number; w: number; h: number; at: number; pillars: PL[]; roofAt: number; roof: string; ghost?: number}> = ({x, y, w, h, at, pillars, roofAt, roof, ghost = 1e9}) => {
  const t = useT();
  const baseH = 46, roofH = 150;
  const colW = 150;
  const gap = (w - 80 - pillars.length * colW) / (pillars.length + 1);
  const ph = h - baseH - roofH - 30;
  const rq = prog(t, roofAt - 0.25, roofAt, easeIn);
  const rb = t > roofAt ? Math.sin(Math.min(1, (t - roofAt) / 0.3) * Math.PI) * 10 : 0;
  const shake = slamK(t, roofAt) * Math.sin(t * 80) * 6;
  return (
    <Abs x={x + shake} y={y} w={w} h={h}>
      <div style={{position: 'absolute', left: 0, bottom: 0, width: w, height: baseH, ...nb('#E9E4D8', 6), borderColor: NBK, transform: `scaleX(${prog(t, at, at + 0.5, easeOut)})`}} />
      <div style={{position: 'absolute', left: 30, bottom: baseH - 4, width: w - 60, height: 22, background: '#D7D0C0', border: `4px solid ${NBK}`, transform: `scaleX(${prog(t, at + 0.2, at + 0.7, easeOut)})`}} />
      {pillars.map(([l, ic, c, pa], i) => {
        const left = 40 + gap + i * (colW + gap);
        const q = prog(t, pa, pa + 0.7, easeOut);
        const gh = t > ghost ? pop(t, ghost + i * 0.1) : 0;
        const dust = t > pa && t < pa + 1.0 ? 1 - (t - pa) : 0;
        return (
          <React.Fragment key={i}>
            <div style={{position: 'absolute', left, bottom: baseH + 18, width: colW, height: ph, border: `4px dashed ${c}`, borderRadius: 10, opacity: gh * (1 - q) * 0.8, boxSizing: 'border-box'}} />
            <div style={{position: 'absolute', left, bottom: baseH + 18, width: colW, height: ph * q, overflow: 'hidden', background: `repeating-linear-gradient(90deg, ${c} 0 18px, ${hexMix(c, '#ffffff', 0.25)} 18px 30px)`, border: q > 0 ? `5px solid ${NBK}` : 'none', borderRadius: '8px 8px 0 0', boxSizing: 'border-box'}}>
              <div style={{position: 'absolute', left: 0, right: 0, top: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
                <div style={{width: 84, height: 84, borderRadius: 42, background: '#fff', border: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n={ic} size={50} c={c} /></div>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 25, color: '#fff', textAlign: 'center', lineHeight: 1.05, textShadow: '0 2px 0 rgba(0,0,0,0.35)', writingMode: 'horizontal-tb'}}>{l}</div>
              </div>
            </div>
            {dust > 0 && Array.from({length: 8}, (_, k) => <div key={k} style={{position: 'absolute', left: left + colW / 2 + (k - 3.5) * 22 * (1 + (1 - dust) * 2), bottom: baseH + 10 + (1 - dust) * 40 * random(`du${i}${k}`), width: 26, height: 26, borderRadius: 13, background: 'rgba(170,150,120,0.6)', opacity: dust}} />)}
          </React.Fragment>
        );
      })}
      {t > roofAt - 0.25 && (
        <div style={{position: 'absolute', left: -10, top: lerp(-700, 0, rq) - rb, width: w + 20, height: roofH}}>
          <svg width={w + 20} height={roofH} style={{position: 'absolute', inset: 0}}><polygon points={`10,${roofH - 8} ${(w + 20) / 2},8 ${w + 10},${roofH - 8}`} fill="#F5F1E6" stroke={NBK} strokeWidth={7} strokeLinejoin="round" /></svg>
          <div style={{position: 'absolute', left: 0, right: 0, top: roofH * 0.42, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: S_RSE, letterSpacing: 2}}>{roof}</div>
        </div>
      )}
    </Abs>
  );
};

/* ═════════════ 21. Dézoom concentrique : du cœur Q·S·E à la RSE et à ses parties prenantes ═════════════ */
const ZDezoom: React.FC<{cx: number; cy: number; at: number; ring: number; orbit: number; c: string}> = ({cx, cy, at, ring, orbit, c}) => {
  const t = useT();
  const zq = prog(t, ring, ring + 1.2, easeInOut);
  const inner = lerp(2.0, 0.62, zq) * pop(t, at, 0.5);
  const rr = 250;
  const ringP = prog(t, ring + 0.2, ring + 1.3, easeOut);
  const oq = prog(t, orbit, orbit + 0.8, easeOut);
  const ics = ['Users', 'User', 'Handshake', 'Factory', 'House', 'Briefcase', 'GraduationCap', 'Landmark'];
  return (
    <>
      <div style={{position: 'absolute', left: cx - 200, top: cy - 200, width: 400, height: 400, transform: `scale(${inner})`}}>
        {[[CQ, 'Q', -90], [CSE, 'S', 30], [CE, 'E', 150]].map(([col, l, a], i) => { const an = ((a as number) * Math.PI) / 180; return <div key={i} style={{position: 'absolute', left: 200 + Math.cos(an) * 60 - 95, top: 200 + Math.sin(an) * 60 - 95, width: 190, height: 190, borderRadius: 95, background: `${col}40`, border: `6px solid ${col}`, mixBlendMode: 'multiply', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: col as string, transform: `translate(${Math.cos(an) * 40}px, ${Math.sin(an) * 40}px)`}}>{l}</span></div>; })}
      </div>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, pointerEvents: 'none'}}>
        <circle cx={cx} cy={cy} r={rr} fill={`${c}14`} stroke={c} strokeWidth={10} pathLength={1} strokeDasharray={`${ringP} 1`} transform={`rotate(-90 ${cx} ${cy})`} />
      </svg>
      {ringP > 0.9 && <div style={{position: 'absolute', left: cx - 70, top: cy - rr - 34, width: 140, height: 60, borderRadius: 14, background: c, border: `4px solid ${NBK}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1, sp(t, ring + 1.2, 9, 12))})`}}>RSE</div>}
      {oq > 0 && ics.map((ic, k) => { const a = (k / ics.length) * Math.PI * 2 + (t - orbit) * 0.35; const R2 = 380; return <div key={k} style={{position: 'absolute', left: cx + Math.cos(a) * R2 * oq - 46, top: cy + Math.sin(a) * R2 * 0.78 * oq - 46, width: 92, height: 92, borderRadius: 46, background: '#fff', border: `4px solid ${NBK}`, boxShadow: `4px 4px 0 ${c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: oq}}><Ico n={ic} size={50} c={c} /></div>; })}
    </>
  );
};

/* ═════════════ 22. Terminal Claude Code + matrice de comparaison remplie en vague ═════════════ */
const MCOL: [string, string][] = [['Qualité', CQ], ['Santé', CSA], ['Sécurité', CSE], ['Hygiène', CH], ['Environ.', CE], ['Social', CSO], ['Écono.', CEC]];
const MROW: [string, number[]][] = [['QSE', [0, 2, 4]], ['QSSTE', [0, 1, 2, 4]], ['QHSE', [0, 3, 2, 4]], ['HSE', [3, 2, 4]], ['RSE', [5, 4, 6]]];
const ZTerm: React.FC<{x: number; y: number; w: number; at: number; cmd: string}> = ({x, y, w, at, cmd}) => {
  const t = useT();
  const n = Math.floor(cmd.length * prog(t, at + 0.2, at + 0.2 + cmd.length * 0.035, lin));
  const done = t > at + 0.3 + cmd.length * 0.035;
  return (
    <Abs x={x} y={y} w={w} style={{background: '#0F1420', border: `5px solid ${NBK}`, borderRadius: 18, boxShadow: `8px 8px 0 ${CT}`, overflow: 'hidden', opacity: pop(t, at)}}>
      <div style={{height: 44, background: '#1A2233', display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px'}}>{[RED, YEL, GREEN].map((q) => <div key={q} style={{width: 12, height: 12, borderRadius: 6, background: q}} />)}<span style={{marginLeft: 10, fontFamily: MONO, fontWeight: 700, fontSize: 20, color: '#8A96AA'}}>terminal — claude</span></div>
      <div style={{padding: '14px 22px', fontFamily: MONO, fontWeight: 700, fontSize: 28, color: '#E6EDF3', whiteSpace: 'nowrap'}}>
        <span style={{color: CT}}>✻ </span><span style={{color: '#5BE38F'}}>›</span> {cmd.slice(0, n)}<span style={{opacity: Math.sin(t * 12) > 0 ? 1 : 0}}>▌</span>
        {done && <div style={{color: '#8A96AA', fontSize: 22, marginTop: 6}}>⏺ Comparaison générée · 5 sigles × 7 dimensions</div>}
      </div>
    </Abs>
  );
};
const ZMatrix: React.FC<{x: number; y: number; at: number; rowHi?: (r: number, t: number) => number; colHi?: (c: number, t: number) => number; dimRow?: (r: number, t: number) => number}> = ({x, y, at, rowHi, colHi, dimRow}) => {
  const t = useT();
  const cw = 112, rh = 96, lw = 176;
  return (
    <Abs x={x} y={y} w={lw + cw * 7} h={rh * 6} style={{...nb('#fff', 8), borderColor: NBK, overflow: 'hidden', opacity: pop(t, at)}}>
      {MCOL.map(([l, c], j) => { const ch = colHi ? colHi(j, t) : 0; return <div key={j} style={{position: 'absolute', left: lw + j * cw, top: 0, width: cw, height: rh * 6, background: ch > 0 ? `${c}${Math.round(ch * 40).toString(16).padStart(2, '0')}` : j % 2 ? '#F7F8FA' : '#fff'}}><div style={{height: rh, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 10, fontFamily: sansFont, fontWeight: 900, fontSize: 20, color: c, borderBottom: `4px solid ${NBK}`, boxSizing: 'border-box', transform: `scale(${1 + ch * 0.12})`}}>{l}</div></div>; })}
      {MROW.map(([k, cols], i) => {
        const g = SIGS.find((s0) => s0.k === k)!;
        const rhv = rowHi ? rowHi(i, t) : 0;
        const dm = dimRow ? dimRow(i, t) : 0;
        return (
          <div key={k} style={{position: 'absolute', left: 0, top: rh * (i + 1), width: lw + cw * 7, height: rh, borderBottom: i < 4 ? '2px solid #E3E7EE' : 'none', background: rhv > 0 ? `${g.c}22` : 'transparent', opacity: 1 - dm * 0.7}}>
            <div style={{position: 'absolute', left: 0, top: 0, width: lw, height: rh, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: `4px solid ${NBK}`, boxSizing: 'border-box', background: rhv > 0.5 ? g.c : '#fff'}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: k.length > 4 ? 36 : 42, color: rhv > 0.5 ? '#fff' : g.c}}>{k}</span></div>
            {cols.map((j) => { const d = at + 0.5 + (i + j) * 0.07; const q = t > d ? Math.min(1, sp(t, d, 10, 13)) : 0; return <div key={j} style={{position: 'absolute', left: lw + j * cw + cw / 2 - 30, top: rh / 2 - 30, width: 60, height: 60, borderRadius: 30, background: MCOL[j][1], border: `4px solid ${NBK}`, color: '#fff', fontWeight: 900, fontSize: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${q})`}}>✓</div>; })}
            {rhv > 0 && <div style={{position: 'absolute', inset: 0, border: `5px solid ${g.c}`, borderRadius: 6, opacity: rhv}} />}
          </div>
        );
      })}
    </Abs>
  );
};

/* ═════════════ 23. Planète et orbite 3D des trois impacts ═════════════ */
type OB = [string, string, string, number];
const ZOrbit: React.FC<{cx: number; cy: number; at: number; src: string; items: OB[]; r?: number}> = ({cx, cy, at, src, items, r = 200}) => {
  const t = useT();
  const app = Math.min(1, sp(t, at, 7, 13));
  const R = 390, ry = 120;
  const els = items.map(([l, ic, c, a0], i) => { const a = (i / items.length) * Math.PI * 2 + (t - at) * 0.55; return {l, ic, c, a0, x: Math.cos(a) * R, z: Math.sin(a), y: Math.sin(a) * ry}; });
  const card = (e: (typeof els)[number], k: number) => { const q = t > e.a0 ? Math.min(1, sp(t, e.a0, 9, 13)) : 0; const sc = 0.78 + 0.22 * (e.z + 1) / 2; return <div key={k} style={{position: 'absolute', left: cx + e.x - 120, top: cy + e.y - 40, width: 240, display: 'flex', alignItems: 'center', gap: 10, ...nb('#fff', 5), borderColor: NBK, boxShadow: `5px 5px 0 ${e.c}`, padding: '8px 14px', transform: `scale(${sc * q})`, opacity: q * (0.55 + 0.45 * (e.z + 1) / 2)}}><Ico n={e.ic} size={40} c={e.c} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK}}>{e.l}</span></div>; };
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, pointerEvents: 'none'}}><ellipse cx={cx} cy={cy} rx={R} ry={ry} fill="none" stroke={S_RSE} strokeWidth={4} strokeDasharray="10 12" opacity={app} /></svg>
      {els.filter((e) => e.z < 0).map((e, k) => card(e, k))}
      <div style={{position: 'absolute', left: cx - r, top: cy - r, width: 2 * r, height: 2 * r, borderRadius: r, overflow: 'hidden', border: `7px solid ${NBK}`, boxShadow: `0 0 50px ${S_RSE}88`, transform: `scale(${app}) rotate(${(t - at) * 4}deg)`}}><Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
      {els.filter((e) => e.z >= 0).map((e, k) => card(e, k + 10))}
    </>
  );
};

/* ═════════════ Outils de mise en page ═════════════ */
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

/* ═════════════ Guichet 1 : introduction ═════════════ */
const RING_SECT = ['smi/raffinerie.jpg', 'epi/chantier.jpg', 'sysqsse-gen/reunion.jpg', 'iso26/usine-porte.jpg', 'sysqsse-gen/qualite.jpg', 'sysqsse-gen/environnement.jpg', 'metroiso-gen/sst.jpg', 'integration/agent-terrain.jpg'];
const Intro: React.FC = () => {
  const t = useT();
  return (
    <Out end={40.6}>
      <Heads h={[[2.9, ['Quelle différence', 'entre ces sigles ?'], [1]], [4.2, ['Dans le monde', 'professionnel'], [1]], [13.7, ['Plusieurs sigles', 'reviennent souvent'], [1]], [21.1, ['Des termes', 'interchangeables ?'], [1]], [24.9, ['Chacun a un', 'sens précis'], [1]], [29.8, ['Un éclairage', 'détaillé'], [1]]]} />
      <Ph a={2.65} b={4.25}><ZSigRing a={2.7} cy={860} conv={[3.45, 4.15]} R={330} cw={300} fs={84} /></Ph>
      <Ph a={4.2} b={13.6}>
        <Abs x={0} y={460} w={1080} h={660}><Ring3D imgs={RING_SECT} at={4.25} w={1080} h={660} cw={500} ch={350} R={600} zr={330} speed={13} cy={0.45} /></Abs>
        <Row3 y={1170} gap={18}><TChip at={10.3} l="Industrie" c={S_QSE} ic="Factory" fs={36} /><TChip at={11.4} l="Construction" c={CT} ic="HardHat" fs={36} /><TChip at={12.6} l="Services" c={S_RSE} ic="Briefcase" fs={36} /></Row3>
      </Ph>
      <Ph a={13.6} b={21.0}>
        <Row3 y={500}><TChip at={16.1} l="Management de…" c={NAVY} ic="Layers" fs={36} fill /></Row3>
        <ZBlocks y={760} items={[['Q', 'Qualité', CQ, 17.0, 'BadgeCheck'], ['S', 'Sécurité', CSE, 17.7, 'ShieldCheck'], ['S', 'Santé', CSA, 18.4, 'Heart'], ['E', 'Environnement', CE, 18.8, 'Leaf'], ['R', 'Responsabilité sociétale', S_RSE, 19.9, 'Handshake']]} />
      </Ph>
      <Ph a={21.0} b={29.7}>
        {t > 22.6 && t < 25.2 && <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={22.7} text="INTERCHANGEABLES ?" bg={RED} rot={-3} size={40} /></Abs>}
        <ZGlitchSwap a={21.2} lock={24.6} y={780} neq={25.4} aim={27.3} />
        <Row3 y={1040} gap={16}><TChip at={25.4} l="Une signification précise" c={NAVY} ic="Search" fs={32} /><TChip at={27.5} l="Des objectifs spécifiques" c={RED} ic="Target" fs={32} fill /></Row3>
      </Ph>
      <Ph a={29.7} b={40.6}>
        <SearchOpen x={60} y={450} w={960} h={900} at={29.9} query="différences QSE QSSTE QHSE HSE RSE" results={['QSE · QSSTE · QHSE · HSE · RSE : les différences', 'Systèmes de management QHSE', 'Normes ISO de management']} found={0} foundAt={32.2} clickAt={32.7} c={NAVY}>
          <div style={{position: 'absolute', inset: 0, background: '#FAFAF7'}}>
            {SIGS.map((g, k) => { const at = [33.8, 34.1, 34.5, 34.8, 35.2][k]; const on = t > at; const q = on ? Math.min(1, sp(t, at, 9, 13)) : 0; return (
              <div key={g.k} style={{position: 'absolute', left: 30, top: 24 + k * 128, width: 840, height: 110, display: 'flex', alignItems: 'center', gap: 22, ...nb(on ? '#fff' : '#F3F4F6', on ? 6 : 3), borderColor: on ? g.c : '#C9D2DF', boxShadow: on ? `6px 6px 0 ${g.c}` : 'none', padding: '0 22px', transform: `translateX(${(1 - q) * 30}px) scale(${0.96 + 0.04 * q})`}}>
                <div style={{width: 64, height: 64, borderRadius: 32, background: on ? g.c : '#C9D2DF', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{k + 1}</div>
                <div style={{width: 200}}><SigWord k={g.k} size={54} mono={on ? undefined : '#A9B1BE'} /></div>
                <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: on ? INK : '#A9B1BE', lineHeight: 1.15}}>{g.full}</div>
              </div>
            ); })}
            <div style={{position: 'absolute', left: 30, top: 680, width: 840, display: 'flex', gap: 18, justifyContent: 'center'}}><TChip at={37.6} l="Leur impact" c={NAVY} ic="TrendingUp" fs={32} /><TChip at={38.5} l="Leur application" c={S_RSE} ic="Factory" fs={32} fill /></div>
          </div>
        </SearchOpen>
      </Ph>
    </Out>
  );
};

/* ═════════════ Guichet 2 : QSE ═════════════ */
const GQse: React.FC = () => {
  const t = useT();
  return (
    <Out end={95.75}>
      <Heads h={[[42.5, ['1. QSE', 'le sigle'], [0]], [47.5, ['Trois dimensions', 'essentielles'], [0]], [52.3, ['A. Qualité', 'la conformité'], [0]], [63.4, ['B. Sécurité', 'protéger les employés'], [0]], [72.5, ['C. Environnement', "réduire l'impact"], [0]], [81.0, ['Une intégration', 'harmonieuse'], [1]], [87.8, ['Des enjeux', 'majeurs'], [1]]]} />
      <Ph a={42.4} b={52.1}>
        <ZTelescope start={42.5} y={520} rowH={170} size={230} items={[['Q', 'ualité', CQ, 44.3], ['S', 'écurité', CSE, 45.0], ['E', 'nvironnement', CE, 45.6]]} />
        <Row3 y={1060} gap={16}><TChip at={48.5} l="3 dimensions du management" c={S_QSE} ic="Layers" fs={34} fill /></Row3>
      </Ph>
      <Ph a={52.1} b={63.3}>
        <ZAxis l="A" name="Qualité" c={CQ} at={52.3} />
        <ZInk src="sysqsse-gen/qualite.jpg" x={60} y={570} w={600} h={380} at={52.5} c={CQ} pos="40% 30%" tag="QUALITÉ" />
        <ZDef text="Garantir la conformité des produits et services aux exigences réglementaires et aux attentes des clients" a={53.7} e={58.4} y={985} fs={38} />
        {t < 59.6 && <Abs x={690} y={600} w={330} style={{display: 'flex', flexDirection: 'column', gap: 14}}><TChip at={54.9} l="Produits" c={CQ} ic="BadgeCheck" fs={28} /><TChip at={56.0} l="Exigences" c={NAVY} ic="ScrollText" fs={28} /><TChip at={57.5} l="Clients" c={S_RSE} ic="Users" fs={28} /></Abs>}
        <ZSeal x={855} y={770} at={59.8} num="9001" c={CQ} ring="NORME DE RÉFÉRENCE QUALITÉ" size={310} />
      </Ph>
      <Ph a={63.3} b={72.4}>
        <ZAxis l="B" name="Sécurité" c={CSE} at={63.4} />
        <ZHexShield cx={300} cy={800} at={65.7} c={CSE} R={190} ic="Users" />
        <ZInk src="rhse-gen/prevention.jpg" x={560} y={570} w={460} h={430} at={64.4} c={CSE} pos="50% 30%" tag="PRÉVENTION" />
        <ZDef text="Protéger les employés grâce à des dispositifs de prévention" a={65.7} e={68.6} y={1080} fs={36} />
        <Row3 y={1215} gap={14}><TChip at={69.1} l="Accidents du travail" c={CSE} ic="TriangleAlert" fs={30} /><TChip at={70.3} l="Maladies professionnelles" c={CSA} ic="Activity" fs={30} /></Row3>
      </Ph>
      <Ph a={72.4} b={80.9}>
        <ZAxis l="C" name="Environnement" c={CE} at={72.5} />
        <ZInk src="sysqsse-gen/environnement.jpg" x={60} y={570} w={960} h={400} at={72.9} c={CE} pos="50% 35%" tag="ENVIRONNEMENT" />
        <ZDef text="Réduire l'impact des activités de l'entreprise sur l'environnement" a={74.6} e={77.3} y={1005} fs={38} />
        <Row3 y={1150}><TChip at={76.9} l="Impact ↓" c={CE} ic="TrendingDown" fs={34} fill /></Row3>
        <ZSeal x={870} y={1205} at={79.7} num="14001" c={CE} ring="MANAGEMENT ENVIRONNEMENTAL" size={290} />
      </Ph>
      <Ph a={80.9} b={95.75}>
        <ZVenn cx={540} cy={830} join={81.9} center="QSE" r={185} items={[['Q', 'Qualité', CQ, 81.0], ['S', 'Sécurité', CSE, 81.15], ['E', 'Environnement', CE, 81.3]]} pulses={[90.3, 91.5, 92.9]} />
        <Row3 y={1230} gap={14}><TChip at={85.4} l="Performance globale" c={S_QSE} ic="TrendingUp" fs={32} />{t > 88.0 && <TChip at={88.2} l="Couramment adoptée" c={NAVY} ic="Factory" fs={32} />}</Row3>
        {t > 94.8 && <Abs x={0} y={1080} w={1080} style={{display: 'flex', justifyContent: 'center', zIndex: 8}}><SlamCard at={95.0} lines={['ENJEUX MAJEURS']} c={S_QSE} size={58} /></Abs>}
      </Ph>
    </Out>
  );
};

/* ═════════════ Guichet 3 : QSSTE ═════════════ */
const GQsste: React.FC = () => {
  const t = useT();
  return (
    <Out end={145.7}>
      <Heads h={[[97.6, ['2. QSSTE', 'une extension du QSE'], [0]], [107.0, ['A. Santé', 'au travail'], [0]], [119.2, ['B. Sécurité', 'au travail'], [0]], [125.0, ['Des environnements', 'à haut risque'], [1]], [136.7, ['Une base :', "l'ISO 45001"], [1]]]} />
      <Ph a={97.4} b={106.9}>
        <ZMorph from={sigLetters('QSE')} to={sigLetters('QSSTE')} map={[0, 2, 4]} at={97.6} y={480} size={170} labels={98.0} />
        <ZDiff x={90} y={790} w={900} at={100.6} title="git diff QSE → QSSTE" fs={36} lines={[['Qualité', ' ', 101.0], ['Santé', '+', 105.3], ['Sécurité', ' ', 101.3], ['au Travail', '+', 106.2], ['Environnement', ' ', 101.6]]} />
        <Row3 y={1220}><TChip at={102.0} l="Extension du QSE" c={S_QSSTE} ic="Layers" fs={32} fill /></Row3>
      </Ph>
      <Ph a={106.9} b={119.1}>
        <ZAxis l="A" name="Santé" c={CSA} at={107.0} />
        <ZEcg x={60} y={575} w={960} h={470} a={107.4} end={118.8} c={CSA} items={[['Maladies professionnelles', 111.1, 'Activity'], ['Risques psychosociaux', 114.1, 'Brain'], ['Bien-être au travail', 116.6, 'Heart']]} />
        <ZInk src="siglesqse-gen/bien-etre.jpg" x={60} y={1070} w={960} h={290} at={114.2} c={CSA} pos="50% 30%" tag="BIEN-ÊTRE AU TRAVAIL" />
      </Ph>
      <Ph a={119.1} b={124.95}>
        <ZAxis l="B" name="Sécurité au travail" c={CSE} at={119.2} />
        <ZInk src="metroiso-gen/sst.jpg" x={60} y={570} w={960} h={420} at={119.4} c={CSE} pos="50% 30%" tag="SÉCURITÉ AU TRAVAIL" />
        <ZDef text="Approfondit les mesures de protection spécifiques aux risques professionnels" a={120.7} e={123.3} y={1030} fs={40} />
      </Ph>
      <Ph a={124.95} b={136.6}>
        <ZTicker y={500} at={125.0} text="HAUT RISQUE" />
        <Photo src="sgh-gen/lecture-etiquette.jpg" x={60} y={660} w={460} h={400} at={126.5} c={CH} pos="50% 30%" tag="INDUSTRIE CHIMIQUE" />
        <Photo src="epi/chantier.jpg" x={560} y={660} w={460} h={400} at={127.6} c={CT} pos="50% 50%" tag="BTP" />
        <Row3 y={1110} gap={14}><TChip at={129.4} l="Particulièrement adaptée" c={S_QSSTE} ic="BadgeCheck" fs={30} /><TChip at={133.3} l="Risques importants" c={RED} ic="Siren" fs={30} fill /></Row3>
        <Row3 y={1215}><TChip at={135.0} l="Santé des salariés" c={CSA} ic="Heart" fs={30} /></Row3>
      </Ph>
      <Ph a={136.6} b={145.7}>
        <ZSeal x={540} y={790} at={139.6} num="45001" c={S_QSSTE} ring="SANTÉ ET SÉCURITÉ AU TRAVAIL" size={400} />
        <Row3 y={1060} gap={14}><TChip at={141.2} l="Systèmes de management" c={NAVY} ic="Workflow" fs={32} /><TChip at={142.4} l="Santé & sécurité au travail" c={S_QSSTE} ic="ShieldCheck" fs={32} fill /></Row3>
      </Ph>
    </Out>
  );
};

/* ═════════════ Guichet 4 : QHSE ═════════════ */
const GQhse: React.FC = () => {
  const t = useT();
  const W4 = 170 * 0.8;
  const hx = (i: number) => 540 - (4 * W4) / 2 + i * W4 + W4 / 2;
  return (
    <Out end={181.35}>
      <Heads h={[[147.8, ['3. QHSE', '+ un volet'], [0]], [152.6, ["L'hygiène,", 'la santé de tous'], [1]], [159.3, ['Des secteurs', 'sensibles'], [1]], [164.9, ['Des mesures', 'strictes'], [1]], [178.4, ['En anglais :', 'QHSE'], [1]]]} />
      <Ph a={147.6} b={152.5}>
        <ZMorph from={sigLetters('QSE')} to={sigLetters('QHSE')} map={[0, 2, 3]} at={149.6} y={640} size={170} />
        <ZSpot a={150.6} b={151.9} xs={[hx(0), hx(1), hx(2), hx(3)]} cy={730} land={1} r={120} out={152.5} />
        {t > 151.9 && <Abs x={0} y={900} w={1080} style={{display: 'flex', justifyContent: 'center', zIndex: 8}}><SlamTag at={152.0} text="+ HYGIÈNE" c={CH} size={50} rot={-4} /></Abs>}
      </Ph>
      <Ph a={152.5} b={159.2}>
        <ZAxis l="H" name="Hygiène" c={CH} at={152.6} />
        <ZDef text="L'ensemble des bonnes pratiques permettant de préserver la santé" a={152.9} e={157.1} y={580} fs={46} />
        <Abs x={60} y={830} w={960} style={{display: 'flex', justifyContent: 'center', gap: 120}}>
          {[['HardHat', 'Travailleurs', 157.3], ['Users', 'Consommateurs', 158.2]].map(([ic, l, a]) => { const q = t > (a as number) ? Math.min(1, sp(t, a as number, 9, 13)) : 0; return <div key={l as string} style={{transform: `scale(${q})`}}><Avatar ic={ic as string} c={CH} size={200} label={l as string} /></div>; })}
        </Abs>
      </Ph>
      <Ph a={159.2} b={164.8}>
        <ZPrism x={60} y={480} w={960} h={600} at={159.3} c={CH} imgs={['siglesqse-gen/agroalimentaire.jpg', 'siglesqse-gen/sante-hopital.jpg', 'sgh-gen/lecture-etiquette.jpg']} times={[161.4, 162.6, 163.6]} labels={['Agroalimentaire', 'Santé', 'Chimie']} />
      </Ph>
      <Ph a={164.8} b={178.3}>
        {t < 171.4 && <Abs x={0} y={600} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Avatar ic="FlaskConical" c={CH} size={220} label="Industries" /></Abs>}
        {t > 168.2 && t < 171.4 && <Abs x={0} y={950} w={1080} style={{display: 'flex', justifyContent: 'center', zIndex: 8}}><SlamTag at={168.4} text="RISQUES SANITAIRES ÉLEVÉS" c={RED} size={40} rot={-3} /></Abs>}
        {t > 171.2 && (
          <ZSqueegee x={60} y={520} w={960} h={600} at={171.4} dur={1.0}>
            <div style={{position: 'absolute', inset: 0, ...nb('#fff', 7), borderColor: NBK, boxShadow: `7px 7px 0 ${CH}`, padding: 34, display: 'flex', flexDirection: 'column', gap: 26, justifyContent: 'center'}}>
              <Check at={172.4} label="Propreté" c={CH} size={40} />
              <Check at={173.4} label="Substances dangereuses manipulées" c={CH} size={36} />
              <Check at={176.1} label="Normes d'hygiène respectées" c={CH} size={38} />
            </div>
          </ZSqueegee>
        )}
      </Ph>
      <Ph a={178.3} b={181.35}>
        <ZWordCubes y={500} at={178.4} items={[['Qualité', 'Quality', CQ, 179.9], ['Hygiène', 'Health', CH, 180.3], ['Sécurité', 'Safety', CSE, 180.6], ['Environnement', 'Environment', CE, 180.9]]} />
      </Ph>
    </Out>
  );
};

/* ═════════════ Guichet 5 : HSE ═════════════ */
const AXHSE: [string, string, string, number, number, string, number, number][] = [
  ['A', 'Hygiène', CH, 191.0, 197.9, 'Prévention des risques sanitaires pour les travailleurs et leur environnement', 191.6, 196.4],
  ['B', 'Sécurité', CSE, 197.9, 205.4, 'Protection contre les accidents du travail et les dangers liés aux machines et aux conditions de travail', 199.9, 204.6],
  ['C', 'Environnement', CE, 205.4, 210.5, 'Gestion durable des ressources et réduction des impacts environnementaux', 207.1, 209.4],
];
const GHse: React.FC = () => {
  const t = useT();
  const qhse = (show: boolean): React.ReactNode => (
    <div style={{position: 'absolute', inset: 0, background: show ? '#F7F4FF' : '#EFFAF7', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24}}>
      <div style={{...CAP, fontSize: 26, color: show ? S_QHSE : S_HSE}}>{show ? 'Avec la qualité' : 'Sans la qualité'}</div>
      <div style={{display: 'flex', gap: 16}}>{sigLetters(show ? 'QHSE' : 'HSE').map(([l, w, c]) => <div key={w} style={{width: 190, height: 220, ...nb('#fff', 6), borderColor: NBK, boxShadow: `6px 6px 0 ${c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 100, color: c, lineHeight: 1}}>{l}</span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: INK}}>{w}</span></div>)}</div>
      <SigWord k={show ? 'QHSE' : 'HSE'} size={90} />
    </div>
  );
  return (
    <Out end={225.7}>
      <Heads h={[[183.3, ['4. HSE', 'plus ciblé'], [0]], [190.4, ['Trois axes', 'H · S · E'], [0]], [210.6, ['Les industries', 'à risques'], [1]], [219.8, ['Sécurité', 'et environnement'], [0]]]} />
      <Ph a={183.2} b={190.9}>
        <ZMorph from={sigLetters('QHSE')} to={sigLetters('HSE')} map={[null, 0, 1, 2]} at={187.3} y={620} size={200} labels={188.6} />
        <ZReticle cx={540} cy={720} w={560} h={250} at={188.0} c={S_HSE} label="PLUS CIBLÉ" />
        <ZDiff x={190} y={1010} w={700} at={185.9} title="git diff QHSE → HSE" fs={34} lines={[['Qualité', '-', 187.4], ['Hygiène · Sécurité · Env.', ' ', 186.3]]} />
      </Ph>
      <Ph a={190.9} b={210.5}>
        <Photo src="integration/cubes-hse.jpg" x={60} y={470} w={960} h={360} at={191.0} c={S_HSE} pos="50% 55%" tag="HSE">
          {AXHSE.map(([, , c, a, b], i) => t > a && t < b + 0.2 ? <Hot key={i} x={[235, 480, 725][i]} y={200} at={a + 0.2} l={['Hygiène', 'Sécurité', 'Environnement'][i]} c={c} dx={i === 2 ? -70 : 70} dy={-120} /> : null)}
        </Photo>
        {AXHSE.map(([l, n, c, a, b, d, da, de]) => (
          <Ph key={l} a={a} b={b}>
            <Abs x={60} y={880} w={960} h={440} style={{...nb('#fff', 8), borderColor: NBK, boxShadow: `8px 8px 0 ${c}`}}>
              <div style={{position: 'absolute', left: 30, top: 30, width: 150, height: 150, borderRadius: 24, background: c, border: `5px solid ${NBK}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${(1 - Math.min(1, sp(t, a, 8, 12))) * -90}deg)`}}>{n[0]}</div>
              <div style={{position: 'absolute', left: 210, top: 40, ...CAP, fontSize: 26, color: c}}>Axe {l}</div>
              <div style={{position: 'absolute', left: 210, top: 80, fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: INK}}>{n}</div>
            </Abs>
            <ZDef text={d} a={da} e={de} x={100} y={1100} w={880} fs={36} />
          </Ph>
        ))}
      </Ph>
      <Ph a={210.5} b={219.7}>
        <ZTicker y={740} at={210.6} text="INDUSTRIES À RISQUES" out={213.7} c={YEL} />
        <ZTri x={60} y={480} w={960} h={620} c={S_HSE} items={[['smi/raffinerie.jpg', 'Pétrochimie', 'Factory', 213.6, '50% 40%'], ['siglesqse-gen/energie.jpg', 'Énergie', 'Zap', 214.3, '45% 35%'], ['siglesqse-gen/transport.jpg', 'Transport', 'Route', 215.0, '35% 35%']]} />
        {t > 218.3 && <Abs x={0} y={1140} w={1080} style={{display: 'flex', justifyContent: 'center', zIndex: 8}}><SlamCard at={218.5} lines={['PRIORITÉ ABSOLUE']} c={RED} size={56} /></Abs>}
      </Ph>
      <Ph a={219.7} b={225.7}>
        <ZSlider x={60} y={480} w={960} h={620} at={222.4} dur={1.4} c={S_HSE} left={qhse(true)} right={qhse(false)} />
        <Row3 y={1150} gap={14}><TChip at={224.2} l="Sécurité" c={CSE} ic="ShieldCheck" fs={32} /><TChip at={224.9} l="Environnement" c={CE} ic="Leaf" fs={32} /></Row3>
      </Ph>
    </Out>
  );
};

/* ═════════════ Guichet 6 : RSE ═════════════ */
const RSE_ITEMS: [number, number, [string, string, number][]][] = [
  [242.9, 252.5, [['Droits des travailleurs', 'Gavel', 246.0], ['Égalité professionnelle', 'Scale', 247.7], ['Conditions de travail', 'HardHat', 249.3]]],
  [252.5, 260.0, [['Empreinte écologique ↓', 'Footprints', 254.6], ['Gestion des déchets', 'Recycle', 256.6], ['Transition énergétique', 'Zap', 258.0]]],
  [260.0, 268.0, [['Transparence financière', 'Eye', 261.8], ['Lutte contre la corruption', 'Ban', 263.2], ['Relation éthique', 'Handshake', 264.8]]],
];
const GRse: React.FC = () => {
  const t = useT();
  return (
    <Out end={284.95}>
      <Heads h={[[227.7, ['5. RSE', 'responsabilité sociétale'], [0]], [234.4, ['Un concept', 'plus large'], [1]], [240.2, ['Trois piliers', 'fondamentaux'], [1]], [242.9, ['A. Enjeux', 'sociaux'], [1]], [252.5, ['B. Enjeux', 'environnementaux'], [1]], [260.0, ['C. Enjeux', 'économiques'], [1]], [268.1, ['Une norme :', "l'ISO 26000"], [1]], [273.7, ['Une approche', 'plus globale'], [1]]]} />
      <Ph a={227.6} b={234.5}>
        <ZTelescope start={227.7} y={540} rowH={180} size={230} fsw={62} items={[['R', 'esponsabilité', S_RSE, 232.4], ['S', 'ociétale', CSO, 233.1], ['E', 'ntreprises', CEC, 233.7]]} />
      </Ph>
      <Ph a={234.5} b={240.1}>
        <ZOrbit cx={540} cy={830} at={234.6} src="durab/planete-odd.jpg" r={210} items={[['Sociaux', 'Users', CSO, 237.1], ['Économiques', 'ChartColumn', CEC, 237.6], ['Environnementaux', 'Leaf', CE, 238.2]]} />
      </Ph>
      <Ph a={240.1} b={273.6}>
        <ZTemple x={60} y={470} w={960} h={600} at={240.3} ghost={241.7} roofAt={269.2} roof="ISO 26000" pillars={[['Social', 'Users', CSO, 243.0], ['Environ-nement', 'Leaf', CE, 252.7], ['Écono-mique', 'ChartColumn', CEC, 260.2]]} />
        {RSE_ITEMS.map(([a, b, its], k) => (
          <Ph key={k} a={a} b={b}>
            <Abs x={60} y={1095} w={960} style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12}}>{its.map(([l, ic, at]) => <TChip key={l} at={at} l={l} c={[CSO, CE, CEC][k]} ic={ic} fs={29} />)}</Abs>
          </Ph>
        ))}
        <Ph a={268.0} b={273.6}><Row3 y={1110}><TChip at={271.3} l="Pratiques responsables" c={S_RSE} ic="BadgeCheck" fs={34} fill /></Row3></Ph>
      </Ph>
      <Ph a={273.6} b={284.95}>
        <Row3 y={480} gap={12}><TChip at={275.9} l="Qualité" c={CQ} fs={28} /><TChip at={276.6} l="Sécurité" c={CSE} fs={28} /><TChip at={277.2} l="Environnement" c={CE} fs={28} /></Row3>
        <ZDezoom cx={540} cy={880} at={274.0} ring={278.4} orbit={282.4} c={S_RSE} />
        <Row3 y={1270}><TChip at={284.0} l="Parties prenantes" c={S_RSE} ic="Users" fs={32} fill /></Row3>
      </Ph>
    </Out>
  );
};

/* ═════════════ Guichet 7 : bilan ═════════════ */
const GBilan: React.FC = () => {
  const t = useT();
  const rowHi = (r: number, tt: number) => {
    const names = [288.5, 288.7, 289.3, 289.6, 290.4];
    let v = tt > names[r] && tt < names[r] + 0.7 ? 1 : 0;
    if (tt > 299.2 && tt < 302.8) v = Math.floor((tt - 299.2) * 3) % 5 === r ? 1 : 0;
    if (tt > 303.7 && tt < 306.2 && r < 3 && tt > [303.7, 304.4, 304.0][r]) v = 1;
    if (tt > 306.2 && tt < 310.3 && r === 3) v = 1;
    if (tt > 310.5 && tt < 318.0 && r === 4) v = 1;
    return v;
  };
  const colHi = (c: number, tt: number) => {
    if (tt > 305.2 && tt < 306.4 && c === 0) return prog(tt, 305.2, 305.6);
    if (tt > 308.0 && tt < 310.3 && (c === 2 || c === 4)) return prog(tt, 308.0, 308.4);
    if (tt > 313.0 && tt < 318.0 && (c === 5 || c === 6)) return prog(tt, 313.0, 313.4);
    return 0;
  };
  const dimRow = (r: number, tt: number) => (tt > 306.2 && tt < 310.3 && r !== 3 ? prog(tt, 306.2, 306.6) : tt > 310.5 && tt < 318.0 && r !== 4 ? prog(tt, 310.5, 310.9) : 0);
  return (
    <Out end={OUTRO_AT}>
      <Heads h={[[286.9, ['Pour conclure :', 'le comparatif'], [1]], [295.4, ['Selon le secteur', 'et les priorités'], [1]], [303.6, ['La qualité,', 'intégrée ou non'], [0]], [310.5, ['La RSE :', 'un engagement global'], [1]], [318.1, ['Comprendre', 'pour mieux agir'], [1]]]} />
      <Ph a={286.8} b={318.0}>
        <ZTerm x={60} y={450} w={960} at={286.9} cmd={'compare QSE QSSTE QHSE HSE RSE'} />
        <ZMatrix x={60} y={640} at={288.4} rowHi={rowHi} colHi={colHi} dimRow={dimRow} />
        <Ph a={291.4} b={295.3}><Row3 y={1250}><TChip at={291.5} l="Systèmes de management adaptés" c={NAVY} ic="Workflow" fs={32} /></Row3></Ph>
        <Ph a={295.3} b={303.5}><Row3 y={1250} gap={12}><TChip at={296.2} l="Secteur d'activité" c={S_QSE} ic="Factory" fs={30} /><TChip at={297.9} l="Priorités" c={S_QSSTE} ic="Target" fs={30} /><TChip at={302.9} l="Enjeux" c={S_RSE} ic="Scale" fs={30} fill /></Row3></Ph>
        <Ph a={303.5} b={310.4}><Row3 y={1250} gap={12}>{t < 306.3 ? <TChip at={305.3} l="+ dimension qualité" c={CQ} ic="BadgeCheck" fs={30} fill /> : <TChip at={306.4} l="HSE : sécurité + environnement" c={S_HSE} ic="ShieldCheck" fs={30} fill />}</Row3></Ph>
        <Ph a={310.4} b={318.0}>{t > 314.4 && <Abs x={0} y={1225} w={1080} style={{display: 'flex', justifyContent: 'center', zIndex: 8}}><SlamCard at={314.6} lines={['ENGAGEMENT GLOBAL']} c={S_RSE} size={52} /></Abs>}</Ph>
      </Ph>
      <Ph a={318.0} b={OUTRO_AT}>
        <ZSigRing a={318.1} cy={800} R={330} cw={300} photo fs={84} speed={26} />
        <Row3 y={1150} gap={12}><TChip at={322.4} l="Gestion des risques" c={NAVY} ic="ShieldAlert" fs={30} /><TChip at={323.6} l="Efficacité" c={S_QSE} ic="Gauge" fs={30} /></Row3>
        <Row3 y={1250}><TChip at={325.2} l="Un travail plus sûr et durable" c={S_RSE} ic="Leaf" fs={32} fill /></Row3>
      </Ph>
    </Out>
  );
};

/* ═════════════ Police de la vidéo : Cambria (repli Caladea, équivalent libre aux métriques identiques, embarqué) ═════════════ */
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-Regular.ttf'), weight: '400'});
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-Bold.ttf'), weight: '700'});
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-Italic.ttf'), weight: '400', style: 'italic'});
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-BoldItalic.ttf'), weight: '700', style: 'italic'});
const CAMBRIA_CSS = ".cambria, .cambria * { font-family: Cambria, 'Caladea', Georgia, serif !important; }";

/* ═════════════ Couverture : les cinq sigles en carrousel 3D de lettres-photos + titre en lettres-photos animées ═════════════ */
const SCover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Bg />
      <Abs x={0} y={40} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.14)'}}><Img src={staticFile(LOGO)} style={{height: 76, display: 'block'}} /></div></Abs>
      <Abs x={0} y={178} w={1080} style={{textAlign: 'center'}}><span style={{...CAP, fontSize: 28, color: DIM, letterSpacing: 6}}>Les sigles du management</span></Abs>
      <ZSigRing a={-1.2} cy={560} R={340} cw={330} photo fs={92} speed={30} tilt={0.32} />
      <Abs x={0} y={880} w={1080} style={{display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap'}}><PhotoLetterAnim ch="QUELLE" src="sysqsse-gen/couverture.jpg" size={170} ls={6} seed={2} /></Abs>
      <Abs x={0} y={1045} w={1080} style={{display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap'}}><PhotoLetterAnim ch="DIFFÉRENCE ?" src="sysqsse-gen/environnement.jpg" size={124} ls={3} seed={5} /></Abs>
      <Abs x={40} y={1215} w={1000} style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12}}>{SIGS.map((g) => <div key={g.k} style={{...nb('#fff', 5), borderColor: NBK, boxShadow: `5px 5px 0 ${g.c}`, padding: '6px 16px'}}><SigWord k={g.k} size={46} /></div>)}</Abs>
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
const POPS = [10.3, 11.4, 12.6, 16.1, 25.4, 27.5, 37.6, 38.5, 48.5, 54.9, 56.0, 57.5, 69.1, 70.3, 76.9, 85.4, 88.2, 102.0, 129.4, 133.3, 135.0, 141.2, 142.4, 157.3, 158.2, 172.6, 173.6, 176.3, 191.2, 198.6, 205.8, 224.2, 224.9, 246.0, 247.7, 249.3, 254.6, 256.6, 258.0, 261.8, 263.2, 264.8, 271.3, 275.9, 276.6, 277.2, 284.0, 291.5, 296.2, 297.9, 302.9, 305.3, 306.4, 322.4, 323.6, 325.2];
const SW = [44.3, 45.0, 45.6, 97.6, 149.6, 161.4, 162.6, 163.6, 213.6, 214.3, 215.0, 232.4, 233.1, 233.7, 282.4];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at + 0.15, s: 'sfx/bell', v: 0.14})),
  ...POPS.map((at) => ({at, s: 'sfx/pop', v: 0.18})), ...SW.map((at) => ({at, s: 'sfx/swish', v: 0.22})),
  {at: 3.45, s: 'riser', v: 0.16, dur: 0.8}, {at: 4.1, s: 'bass-hit', v: 0.3},
  ...[17.38, 18.08, 18.78, 19.18, 20.28].map((at) => ({at, s: 'sfx/thud', v: 0.32})),
  ...rep(21.2, 10, 0.34, 'sfx/click', 0.14), {at: 24.6, s: 'validation', v: 0.25}, ...rep(27.3, 5, 0.12, 'sfx/pop', 0.12),
  ...searchCues(29.9, 34, 32.2, 32.7),
  ...[52.5, 64.4, 72.9, 119.4].map((at) => ({at, s: 'soft-whoosh', v: 0.32, dur: 1})),
  ...[59.8, 79.7, 139.6].flatMap((at) => [{at, s: 'tampon', v: 0.42}, {at: at + 0.1, s: 'tick', v: 0.12, dur: 1.0}]),
  ...rep(65.7, 6, 0.15, 'sfx/pop', 0.1), {at: 81.9, s: 'sfx/whoosh', v: 0.3}, {at: 82.7, s: 'sfx/ding', v: 0.22},
  ...[95.0, 218.5, 314.6].map((at) => ({at, s: 'bass-hit', v: 0.32})), {at: 152.0, s: 'tampon', v: 0.4}, {at: 168.4, s: 'tampon', v: 0.4},
  {at: 98.5, s: 'sfx/thud', v: 0.3}, {at: 150.5, s: 'sfx/thud', v: 0.3}, {at: 187.3, s: 'sfx/thud', v: 0.35},
  ...rep(101.0, 12, 0.08, 'sfx/click', 0.08), {at: 105.3, s: 'sfx/ding', v: 0.2}, {at: 106.2, s: 'sfx/ding', v: 0.2}, ...rep(186.3, 8, 0.08, 'sfx/click', 0.08),
  ...[111.1, 114.1, 116.6].map((at) => ({at, s: 'sfx/ding', v: 0.22})),
  {at: 125.0, s: 'sfx/whoosh', v: 0.3}, {at: 150.6, s: 'riser', v: 0.16, dur: 1.3},
  {at: 171.4, s: 'soft-whoosh', v: 0.35, dur: 1}, ...[179.9, 180.3, 180.6, 180.9].map((at) => ({at, s: 'sfx/click', v: 0.22})), {at: 188.8, s: 'sfx/ding', v: 0.22},
  {at: 222.4, s: 'soft-whoosh', v: 0.35, dur: 1}, {at: 234.6, s: 'sfx/rise', v: 0.2, dur: 1.5},
  {at: 240.3, s: 'sfx/thud', v: 0.3}, ...[243.0, 252.7, 260.2].map((at) => ({at, s: 'riser', v: 0.12, dur: 0.8})), {at: 269.2, s: 'tampon', v: 0.45}, {at: 269.25, s: 'bass-hit', v: 0.3},
  {at: 278.4, s: 'soft-whoosh', v: 0.35, dur: 1}, ...rep(287.1, 16, 0.07, 'sfx/click', 0.1), ...rep(288.9, 10, 0.08, 'sfx/pop', 0.1),
  {at: 318.1, s: 'sfx/rise', v: 0.18, dur: 1.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];
const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SCN: [React.FC, number, number][] = [[Intro, 2.6, 40.65], [GQse, 42.4, 95.8], [GQsste, 97.4, 145.75], [GQhse, 147.6, 181.4], [GHse, 183.2, 225.75], [GRse, 227.6, 285.0], [GBilan, 286.8, OUTRO_AT]];
export const SiglesQhseMetro: React.FC = () => (
  <AbsoluteFill className="cambria" style={{background: PAPER}}>
    <style>{CAMBRIA_CSS}</style>
    <Bg />
    {SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7 / TK}><TimeWarp.Provider value={{at: x.at, k: TK}}><C i={i} /></TimeWarp.Provider></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><SCover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-sigles-qse-rse-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u2 = [wn, Avatar, Ring3D, SlamTag, Arrow, slamK, CAP, STAGE, SCAN, RING_ISO, Drum, Marked, Announce, MBadge, RailSteps, StairSteps, ZigSteps, QBubble, Grid15, RameWipe, Forklift, ICO, MC, ACR, lin, hexMix, cl, GyroFlash, Hot, Photo, Pill2, Ph, TChip, Row3, SlamCard, CSO, CEC, SigWord, ZBlocks, ZDef, ZAxis];

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn, Barred, Flap];
