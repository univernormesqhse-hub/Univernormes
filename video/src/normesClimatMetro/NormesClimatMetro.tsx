import React from 'react';
import {loadFont} from '@remotion/fonts';
import {Apple, Truck, Building2, BedDouble, Plane, Wind, Droplet, Atom, TrainFront, Fuel, Dna, Printer, Mountain, Server, Cpu, Package, Pill as PillIcon, Wheat, ConciergeBell, Link2} from 'lucide-react';
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
 * « Les 31 normes ISO de systèmes de management et l'amendement A1:2024 (changement climatique) » (voix d'origine,
 * 4 min 20) — capsule « condensé de toutes les techniques + effet wahou + ultra premium » en métro. Tube de verre à
 * dix guichets (introduction → huit domaines → bilan), capsule qui file d'un guichet à l'autre, gyrophare resserré par
 * TimeWarp, barre de recherche qui ouvre un classeur d'archives aux huit intercalaires. Police Cambria (repli
 * Caladea). Numéros des 31 normes vérifiés sur les tableaux de la vidéo source. Couverture : globe des 31 numéros
 * qui tourne + titre en lettres-photos animées. Techniques nouvelles : bandes de réchauffement climatique, globe de
 * numéros, gravure laser sur plaque de métal brossé, vortex des 31 normes qui se range en tableau, classeur dont
 * le tiroir s'ouvre et les intercalaires se lèvent, livre pop-up par domaine, éventail de cartes qui se
 * retournent, scan de code-barres qui révèle le numéro, anneau de progression segmenté en 31, ticket thermique
 * récapitulatif, pluie de code binaire, carrousel orbital des huit domaines, et une signature animée par
 * secteur (atome, rails et train, pompe à balancier, feu tricolore, hélice d'ADN, goutte et ondes, éolienne,
 * lignes de flux d'air, toque lancée, avion en papier, guilloché de sécurité, pousse de cacaoyer, ruban infini,
 * maillons, hologramme). Sous-titres NeoCaptions sur la voix d'origine, sans musique.
 */
const IMG = {
  cover: 'normesiso/sphere-iso.jpg',
  c1: 'iso9001-gen/qualiticien-tablette.jpg',
  c2: 'swotmetro-gen/orage-menaces.jpg',
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
const OUTRO_AT = 260.4;
export const NORMES_CLIMAT_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '0', title: '31 normes ISO', s: 'Amendement A1:2024', c: NAVY, g: 'intro', k: 'none', lab: 'GUICHET 1 / 10'},
  {at: 32.3, n: '1', title: 'Qualité', s: '5 normes', c: '#1F6FD1', g: 'qualité', k: 'gyro', lab: 'GUICHET 2 / 10 · DOMAINE 1'},
  {at: 70.3, n: '2', title: 'Santé et sécurité', s: '4 normes', c: '#E2483B', g: 'SST', k: 'gyro', lab: 'GUICHET 3 / 10 · DOMAINE 2'},
  {at: 98.25, n: '3', title: 'Gouvernance', s: '4 normes', c: '#6D4BD8', g: 'gouvern.', k: 'gyro', lab: 'GUICHET 4 / 10 · DOMAINE 3'},
  {at: 124.92, n: '4', title: 'Environnement, énergie', s: '4 normes', c: '#1E9E5A', g: 'environ.', k: 'gyro', lab: 'GUICHET 5 / 10 · DOMAINE 4'},
  {at: 151.6, n: '5', title: 'Normes sectorielles', s: '4 normes', c: '#E8912D', g: 'secteurs', k: 'gyro', lab: 'GUICHET 6 / 10 · DOMAINE 5'},
  {at: 179.0, n: '6', title: "Sécurité de l'info", s: '3 normes', c: '#0F9D8F', g: 'info', k: 'gyro', lab: 'GUICHET 7 / 10 · DOMAINE 6'},
  {at: 202.3, n: '7', title: 'Autres systèmes', s: '4 normes', c: '#C0398B', g: 'autres', k: 'gyro', lab: 'GUICHET 8 / 10 · DOMAINE 7'},
  {at: 231.3, n: '8', title: 'Normes spécifiques', s: '3 normes', c: '#B8860B', g: 'spécif.', k: 'gyro', lab: 'GUICHET 9 / 10 · DOMAINE 8'},
  {at: 252.02, n: '✓', title: 'En résumé', s: '31 normes · 8 domaines', c: BURG, g: 'bilan', k: 'gyro', lab: 'GUICHET 10 / 10'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 259.8;
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
                <div style={{position: 'absolute', left: -46, width: 92, top: 50, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 11.5, color: here ? x.c : passed ? GREEN : '#A9B1BE'}}>{x.g}</div>
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
  {n: 1, l: 'Amendement A1:2024', s: 'A1:2024', at: 7.1},
  {n: 2, l: 'Qualité', s: 'Qualité', at: 40.3},
  {n: 3, l: 'Santé et sécurité', s: 'SST', at: 77.2},
  {n: 4, l: 'Gouvernance', s: 'Gouvern.', at: 105.1},
  {n: 5, l: 'Environnement et énergie', s: 'Environ.', at: 133.1},
  {n: 6, l: 'Normes sectorielles', s: 'Secteurs', at: 158.4},
  {n: 7, l: "Sécurité de l'information", s: 'Info', at: 186.2},
  {n: 8, l: 'Autres systèmes de management', s: 'Autres', at: 209.4},
  {n: 9, l: 'Normes spécifiques', s: 'Spécif.', at: 238.5},
  {n: 10, l: 'Bilan', s: 'Bilan', at: 253.8},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE ISO · STATION {r.n} / 10</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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

/* ═════════════ Icônes supplémentaires (lucide) ═════════════ */
Object.assign(LUC, {Apple, Truck, Building2, BedDouble, Plane, Wind, Droplet, Atom, TrainFront, Fuel, Dna, Printer, Mountain, Server, Cpu, Package, Pill: PillIcon, Wheat, ConciergeBell, Link2});

/* ═════════════ Les 31 normes (vérifiées sur les tableaux de la vidéo source) ═════════════ */
type STD = {num: string; name: string; at: number; desc: string; ic: string; sig?: string};
type DOM = {n: number; name: string; short: string; c: string; img: string; ic: string; gyro: number; a: number; b: number; cntAt: number; cnt: string; stds: STD[]};
const DOMS: DOM[] = [
  {n: 1, name: 'Qualité', short: 'qualité', c: '#1F6FD1', img: 'iso9001-gen/qualiticien-tablette.jpg', ic: 'BadgeCheck', gyro: 32.3, a: 34.1, b: 70.35, cntAt: 38.3, cnt: '5 normes ISO', stds: [
    {num: '9001', name: 'Management de la qualité', at: 40.3, desc: 'Système de management de la qualité', ic: 'BadgeCheck'},
    {num: '15378', name: 'Emballages pharmaceutiques', at: 45.0, desc: 'Qualité des emballages pharmaceutiques', ic: 'Pill'},
    {num: '19443', name: 'Secteur nucléaire', at: 51.0, desc: 'Qualité dans le secteur nucléaire', ic: 'Atom', sig: 'atom'},
    {num: '22163', name: 'Secteur ferroviaire', at: 57.0, desc: 'Qualité dans le secteur ferroviaire', ic: 'TrainFront', sig: 'rails'},
    {num: '29001', name: 'Pétrole et gaz', at: 64.9, desc: 'Qualité dans le secteur du pétrole et du gaz', ic: 'Fuel', sig: 'pump'}]},
  {n: 2, name: 'Santé et sécurité', short: 'SST', c: '#E2483B', img: 'metroiso-gen/sst.jpg', ic: 'HardHat', gyro: 70.3, a: 72.1, b: 98.3, cntAt: 75.7, cnt: '4 normes', stds: [
    {num: '45001', name: 'Santé et sécurité au travail', at: 77.2, desc: 'Santé et sécurité au travail', ic: 'HardHat'},
    {num: '39001', name: 'Sécurité routière', at: 83.0, desc: 'Sécurité routière', ic: 'Route', sig: 'light'},
    {num: '18788', name: 'Opérations de sécurité', at: 88.4, desc: 'Opérations de sécurité', ic: 'ShieldCheck'},
    {num: '35001', name: 'Biorisques', at: 93.6, desc: 'Biorisques', ic: 'Dna', sig: 'dna'}]},
  {n: 3, name: 'Gouvernance', short: 'gouvern.', c: '#6D4BD8', img: 'climat-gen/gouvernance.jpg', ic: 'Landmark', gyro: 98.25, a: 100.0, b: 124.95, cntAt: 103.5, cnt: '4 normes', stds: [
    {num: '37301', name: 'Conformité', at: 105.1, desc: 'Management de la conformité', ic: 'ClipboardCheck'},
    {num: '37001', name: 'Anti-corruption', at: 109.8, desc: 'Management anti-corruption', ic: 'Ban'},
    {num: '30401', name: 'Gestion des connaissances', at: 115.4, desc: 'Management des connaissances', ic: 'Lightbulb'},
    {num: '30301', name: 'Information documentée', at: 120.2, desc: "Management de l'information documentée", ic: 'FileText'}]},
  {n: 4, name: 'Environnement et énergie', short: 'environ.', c: '#1E9E5A', img: 'siglesqse-gen/energie.jpg', ic: 'Leaf', gyro: 124.92, a: 126.7, b: 151.65, cntAt: 131.4, cnt: '4 normes', stds: [
    {num: '14001', name: 'Management environnemental', at: 133.1, desc: 'Management environnemental', ic: 'Leaf'},
    {num: '46001', name: "Utilisation de l'eau", at: 137.4, desc: "Management de l'utilisation de l'eau", ic: 'Droplet', sig: 'drop'},
    {num: '50001', name: "Management de l'énergie", at: 142.9, desc: "Management de l'énergie", ic: 'Zap', sig: 'wind'},
    {num: '37101', name: 'Développement durable', at: 146.95, desc: 'Management du développement durable', ic: 'Sprout'}]},
  {n: 5, name: 'Normes sectorielles', short: 'secteurs', c: '#E8912D', img: 'siglesqse-gen/agroalimentaire.jpg', ic: 'Factory', gyro: 151.6, a: 153.4, b: 179.05, cntAt: 156.7, cnt: '4 normes ISO', stds: [
    {num: '22000', name: 'Sécurité alimentaire', at: 158.4, desc: 'Management de la sécurité alimentaire', ic: 'Wheat'},
    {num: '28000', name: 'Sécurité logistique', at: 163.5, desc: 'Management de la sécurité logistique', ic: 'Truck'},
    {num: '41001', name: 'Facility management', at: 168.6, desc: 'Facility management', ic: 'Building2'},
    {num: '21401', name: 'Hôtellerie durable', at: 173.9, desc: 'Management hôtelier durable', ic: 'BedDouble'}]},
  {n: 6, name: "Sécurité de l'information", short: 'info', c: '#0F9D8F', img: 'climat-gen/cybersecurite.jpg', ic: 'Lock', gyro: 179.0, a: 180.8, b: 202.35, cntAt: 183.8, cnt: '3 normes', stds: [
    {num: '27001', name: "Sécurité de l'information", at: 186.2, desc: "Management de la sécurité de l'information", ic: 'Lock', sig: 'holo'},
    {num: '20000-1', name: 'Services IT', at: 191.2, desc: 'Management des services IT', ic: 'Server'},
    {num: '19770-1', name: 'Actifs logiciels', at: 196.7, desc: 'Management des actifs logiciels', ic: 'Cpu'}]},
  {n: 7, name: 'Autres systèmes de management', short: 'autres', c: '#C0398B', img: 'climat-gen/formation.jpg', ic: 'Layers', gyro: 202.3, a: 204.1, b: 231.35, cntAt: 208.2, cnt: '4 normes', stds: [
    {num: '21001', name: 'Organismes de formation', at: 209.4, desc: 'Management des organismes de formation', ic: 'GraduationCap', sig: 'cap'},
    {num: '21101', name: "Tourisme d'aventure", at: 214.6, desc: "Management du tourisme d'aventure", ic: 'Mountain', sig: 'plane'},
    {num: '14298', name: 'Impression sécurisée', at: 220.0, desc: "Management de l'impression sécurisée", ic: 'Printer', sig: 'guilloche'},
    {num: '16000-40', name: "Qualité de l'air intérieur", at: 226.4, desc: "Management de la qualité de l'air intérieur", ic: 'Wind', sig: 'air'}]},
  {n: 8, name: 'Normes spécifiques', short: 'spécif.', c: '#B8860B', img: 'durab/planete-odd.jpg', ic: 'Sparkles', gyro: 231.3, a: 233.1, b: 252.05, cntAt: 237.3, cnt: '3 normes', stds: [
    {num: '22301', name: "Continuité d'activité", at: 238.5, desc: "Management de la continuité d'activité", ic: 'RefreshCw', sig: 'infinity'},
    {num: '34101', name: 'Cacao durable', at: 243.3, desc: 'Management du cacao durable', ic: 'Sprout', sig: 'sprout'},
    {num: '44001', name: 'Management collaboratif', at: 248.2, desc: 'Management collaboratif', ic: 'Handshake', sig: 'chain'}]},
];
const ALLSTD = DOMS.flatMap((d) => d.stds.map((s0) => ({...s0, d})));
const stdCount = (t: number) => ALLSTD.filter((s0) => t >= s0.at).length;

/* ═════════════ 1. Bandes de réchauffement climatique qui déferlent ═════════════ */
const KStripes: React.FC<{x: number; y: number; w: number; h: number; at: number; n?: number}> = ({x, y, w, h, at, n = 40}) => {
  const t = useT();
  const col = (k: number) => { const u = k / (n - 1); const v = u + (random(`st${k}`) - 0.5) * 0.25; return v < 0.5 ? hexMix('#08306B', '#F7F7F7', v * 2) : hexMix('#F7F7F7', '#99000D', (v - 0.5) * 2); };
  return (
    <Abs x={x} y={y} w={w} h={h} style={{overflow: 'hidden', borderRadius: 22, border: `6px solid ${NBK}`, boxShadow: `8px 8px 0 ${NBK}`}}>
      {Array.from({length: n}, (_, k) => { const q = prog(t, at + k * 0.035, at + k * 0.035 + 0.4, easeOut); return <div key={k} style={{position: 'absolute', left: (k * w) / n, top: 0, width: w / n + 1, height: h, background: col(k), transform: `scaleY(${q})`, transformOrigin: k % 2 ? '50% 0' : '50% 100%'}} />; })}
    </Abs>
  );
};

/* ═════════════ 2. Globe des 31 normes : les numéros posés sur une sphère qui tourne ═════════════ */
const KGlobe: React.FC<{cx: number; cy: number; R: number; a?: number; fs?: number}> = ({cx, cy, R, a = -5, fs = 30}) => {
  const t = useT();
  const rot = (t - a) * 0.35;
  const N = ALLSTD.length;
  const items = ALLSTD.map((s0, i) => { const yv = 1 - (2 * (i + 0.5)) / N; const r = Math.sqrt(1 - yv * yv); const th = i * 2.39996 + rot; return {s0, x: Math.cos(th) * r, y: yv, z: Math.sin(th) * r}; }).sort((u, v) => u.z - v.z);
  return (
    <>
      <div style={{position: 'absolute', left: cx - R, top: cy - R, width: 2 * R, height: 2 * R, borderRadius: R, background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), rgba(190,215,234,0.35) 55%, rgba(31,111,209,0.18))', border: `4px solid ${NAVY}22`}} />
      {[0, 1, 2].map((k) => { const f = Math.abs(Math.cos(rot + (k * Math.PI) / 3)); return <div key={k} style={{position: 'absolute', left: cx - R * f, top: cy - R, width: 2 * R * f, height: 2 * R, borderRadius: '50%', border: `2px dashed ${NAVY}33`, boxSizing: 'border-box'}} />; })}
      <div style={{position: 'absolute', left: cx - R, top: cy - R * 0.32, width: 2 * R, height: R * 0.64, borderRadius: '50%', border: `2px dashed ${NAVY}33`, boxSizing: 'border-box'}} />
      {items.map(({s0, x, y, z}) => { const sc = 0.62 + 0.38 * ((z + 1) / 2); return <div key={s0.num + s0.d.n} style={{position: 'absolute', left: cx + x * R, top: cy - y * R, transform: `translate(-50%, -50%) scale(${sc})`, padding: '4px 10px', borderRadius: 10, background: z > 0 ? s0.d.c : '#fff', color: z > 0 ? '#fff' : s0.d.c, border: `3px solid ${z > 0 ? NBK : s0.d.c}`, fontFamily: sansFont, fontWeight: 900, fontSize: fs, whiteSpace: 'nowrap', opacity: 0.35 + 0.65 * ((z + 1) / 2), boxShadow: z > 0.3 ? `3px 3px 0 ${NBK}` : 'none'}}>{s0.num}</div>; })}
    </>
  );
};

/* ═════════════ 3. Gravure laser : le point lumineux grave le texte sur une plaque de métal brossé ═════════════ */
const KLaser: React.FC<{x: number; y: number; w: number; h: number; at: number; text: string; sub?: string; dur?: number}> = ({x, y, w, h, at, text, sub, dur = 1.8}) => {
  const t = useT();
  const p = prog(t, at, at + dur, lin);
  const app = pop(t, at - 0.4, 0.5);
  const lx = 40 + (w - 80) * p;
  return (
    <Abs x={x} y={y} w={w} h={h} style={{opacity: app, borderRadius: 20, border: `6px solid ${NBK}`, boxShadow: `8px 8px 0 ${NBK}`, overflow: 'hidden', background: 'repeating-linear-gradient(90deg, #B9C0C8 0 2px, #D3D8DE 2px 5px, #C4CAD1 5px 7px)'}}>
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.45), rgba(0,0,0,0.12))'}} />
      {[[16, 16], [w - 34, 16], [16, h - 34], [w - 34, h - 34]].map(([a0, b0], k) => <div key={k} style={{position: 'absolute', left: a0, top: b0, width: 18, height: 18, borderRadius: 9, background: 'radial-gradient(circle at 35% 35%, #fff, #6B7480)', border: '2px solid #4A525C'}} />)}
      <div style={{position: 'absolute', left: 0, right: 0, top: sub ? h * 0.18 : h * 0.3, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: h * 0.3, color: '#2B3038', letterSpacing: 4, textShadow: '1px 1px 0 rgba(255,255,255,0.7), -1px -1px 0 rgba(0,0,0,0.35)', clipPath: `inset(0 ${(1 - p) * 100}% 0 0)`, whiteSpace: 'nowrap'}}>{text}</div>
      {sub && <div style={{position: 'absolute', left: 0, right: 0, top: h * 0.62, textAlign: 'center', ...CAP, fontSize: h * 0.11, color: '#3B424C', opacity: pop(t, at + dur)}}>{sub}</div>}
      {p > 0 && p < 1 && <><div style={{position: 'absolute', left: lx - 8, top: h * 0.3, width: 16, height: h * 0.32, borderRadius: 8, background: '#fff', boxShadow: '0 0 20px 8px #FF5A1F, 0 0 50px 16px rgba(255,120,40,0.6)'}} />{Array.from({length: 8}, (_, k) => <div key={k} style={{position: 'absolute', left: lx + (random(`sp${k}${Math.floor(t * 30)}`) - 0.5) * 70, top: h * 0.45 + (random(`sq${k}${Math.floor(t * 30)}`) - 0.5) * 60, width: 5, height: 5, borderRadius: 3, background: '#FFD27A'}} />)}</>}
    </Abs>
  );
};

/* ═════════════ 4. Vortex : les 31 normes tourbillonnent puis se rangent dans le tableau ═════════════ */
const KVortex: React.FC<{x: number; y: number; at: number; land: number; cols?: number}> = ({x, y, at, land, cols = 4}) => {
  const t = useT();
  const cw = 228, ch = 56, g = 12;
  const rows = Math.ceil(ALLSTD.length / cols);
  const cx = x + (cols * (cw + g)) / 2, cy = y + (rows * (ch + g)) / 2;
  return (
    <>
      {ALLSTD.map((s0, i) => {
        const tx = x + (i % cols) * (cw + g), ty = y + Math.floor(i / cols) * (ch + g);
        const ap = prog(t, at + i * 0.03, at + i * 0.03 + 0.4);
        const q = prog(t, land - 0.6 + i * 0.025, land + 0.5 + i * 0.025, easeInOut);
        const ang = (t - at) * 4 + i * 0.6;
        const r = 380 * (1 - q) * (0.4 + 0.6 * ((i * 37) % 31) / 31);
        const sx = cx + Math.cos(ang) * r - cw / 2, sy = cy + Math.sin(ang) * r * 0.75 - ch / 2;
        return <div key={i} style={{position: 'absolute', left: lerp(sx, tx, q), top: lerp(sy, ty, q), width: cw, height: ch, borderRadius: 12, background: NBK, border: `3px solid ${s0.d.c}`, display: 'flex', alignItems: 'center', gap: 8, padding: '0 10px', boxSizing: 'border-box', opacity: ap, transform: `rotate(${(1 - q) * ((ang * 57) % 360) * 0.2}deg)`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 22, whiteSpace: 'nowrap', overflow: 'hidden'}}><span style={{width: 10, height: 10, borderRadius: 5, background: s0.d.c, flexShrink: 0}} />ISO {s0.num}</div>;
      })}
    </>
  );
};

/* ═════════════ 5. Classeur d'archives : le tiroir s'ouvre, les huit intercalaires se lèvent ═════════════ */
const KCabinet: React.FC<{x: number; y: number; w: number; at: number; tabs: number[]}> = ({x, y, w, at, tabs}) => {
  const t = useT();
  const op = prog(t, at, at + 0.8, easeOut);
  const H = 640;
  return (
    <Abs x={x} y={y} w={w} h={H + 60}>
      <div style={{position: 'absolute', left: 30, top: 0, width: w - 60, height: H * 0.3, borderRadius: '18px 18px 0 0', background: 'linear-gradient(180deg, #8A96A8, #6B7686)', border: `6px solid ${NBK}`, boxSizing: 'border-box'}} />
      <div style={{position: 'absolute', left: 0, top: H * 0.3 - 20 + op * 120, width: w, height: H * 0.7, transform: `perspective(1000px) rotateX(${(1 - op) * 30}deg)`, transformOrigin: '50% 0'}}>
        {DOMS.map((d, k) => { const a = tabs[k]; const q = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0; const lift = q * 70; return (
          <div key={d.n} style={{position: 'absolute', left: 40 + (k % 4) * ((w - 80) / 4), top: 90 + Math.floor(k / 4) * 60 - lift - Math.floor(k / 4) * 0, width: (w - 80) / 4 - 10, height: 300, borderRadius: '14px 14px 6px 6px', background: q > 0 ? d.c : '#E7DCC4', border: `5px solid ${NBK}`, boxSizing: 'border-box', zIndex: k, boxShadow: q > 0.5 ? `0 0 20px ${d.c}` : 'none'}}>
            <div style={{position: 'absolute', left: 10, right: 10, top: 10, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 20, color: q > 0 ? '#fff' : '#8C7F64', lineHeight: 1.05}}>{d.n}. {d.name}</div>
            {q > 0 && <div style={{position: 'absolute', left: '50%', top: 92, transform: `translateX(-50%) scale(${q})`}}><Ico n={d.ic} size={48} c="#fff" /></div>}
          </div>
        ); })}
        <div style={{position: 'absolute', left: 0, top: 260, width: w, height: H * 0.7 - 240, borderRadius: 18, background: 'linear-gradient(180deg, #9AA6B8, #7A8698)', border: `6px solid ${NBK}`, boxSizing: 'border-box', zIndex: 20}}>
          <div style={{position: 'absolute', left: w / 2 - 80, top: 40, width: 160, height: 34, borderRadius: 17, background: '#3C4452', border: `4px solid ${NBK}`}} />
          <div style={{position: 'absolute', left: 0, right: 0, top: 100, textAlign: 'center', ...CAP, fontSize: 24, color: '#fff'}}>8 domaines · 31 normes</div>
        </div>
      </div>
    </Abs>
  );
};

/* ═════════════ 6. Livre pop-up : le livre s'ouvre, le domaine se dresse en relief ═════════════ */
const KBook: React.FC<{d: DOM; at: number; cntAt: number}> = ({d, at, cntAt}) => {
  const t = useT();
  const op = prog(t, at, at + 0.9, easeInOut);
  const up = prog(t, at + 0.5, at + 1.3, easeOut);
  const W = 420, H = 520;
  return (
    <Abs x={540 - W} y={560} w={2 * W} h={H + 120} style={{perspective: 1600}}>
      <div style={{position: 'absolute', left: W, top: 0, width: W, height: H, background: '#FBF7EE', border: `6px solid ${NBK}`, borderRadius: '0 18px 18px 0', boxSizing: 'border-box', backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 38px, rgba(0,0,0,0.05) 38px 40px)'}} />
      <div style={{position: 'absolute', left: W, top: 0, width: W, height: H, transformOrigin: '0 50%', transform: `rotateY(${-180 * op}deg)`, transformStyle: 'preserve-3d'}}>
        <div style={{position: 'absolute', inset: 0, background: d.c, border: `6px solid ${NBK}`, borderRadius: '0 18px 18px 0', backfaceVisibility: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#fff'}}><Ico n={d.ic} size={90} c="#fff" /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40}}>Domaine {d.n}</span></div>
        <div style={{position: 'absolute', inset: 0, background: '#FBF7EE', border: `6px solid ${NBK}`, borderRadius: '18px 0 0 18px', transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', overflow: 'hidden'}}><Img src={PH(d.img)} style={{width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85}} /></div>
      </div>
      <div style={{position: 'absolute', left: W - 230, top: H * 0.5 - 150, width: 460, height: 240, transformOrigin: '50% 100%', transform: `rotateX(${(1 - up) * 88}deg)`, ...nb('#fff', 8), borderColor: NBK, boxShadow: `8px 8px 0 ${d.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: up > 0 ? 1 : 0}}>
        <div style={{...CAP, fontSize: 22, color: d.c}}>Domaine {d.n} / 8</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: d.name.length > 20 ? 40 : 52, color: INK, textAlign: 'center', lineHeight: 1.05, padding: '0 16px'}}>{d.name}</div>
      </div>
      {t > cntAt && <div style={{position: 'absolute', left: W - 150, top: H + 30, width: 300, display: 'flex', justifyContent: 'center'}}><SlamTag at={cntAt} text={d.cnt} c={d.c} size={40} rot={-3} /></div>}
    </Abs>
  );
};

/* ═════════════ 7. Éventail de cartes : le jeu se déploie, chaque carte se retourne quand sa norme est citée ═════════════ */
const KFan: React.FC<{d: DOM; at: number}> = ({d, at}) => {
  const t = useT();
  const n = d.stds.length;
  const open = prog(t, at, at + 0.8, easeOut);
  const cur = d.stds.reduce((acc, s0, k) => (t >= s0.at - 0.2 ? k : acc), -1);
  return (
    <>
      {d.stds.map((s0, k) => {
        const ang = (k - (n - 1) / 2) * 13 * open;
        const flip = prog(t, s0.at - 0.2, s0.at + 0.3, easeInOut);
        const here = k === cur;
        return (
          <div key={s0.num} style={{position: 'absolute', left: 540 - 85, top: 500 - (here ? 26 : 0), width: 170, height: 240, transformOrigin: '50% 190%', transform: `rotate(${ang}deg)`, perspective: 900, zIndex: here ? 9 : k}}>
            <div style={{position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: `rotateY(${180 - 180 * flip}deg)`}}>
              <div style={{position: 'absolute', inset: 0, borderRadius: 16, background: `repeating-linear-gradient(45deg, ${d.c} 0 12px, ${hexMix(d.c, '#000000', 0.15)} 12px 24px)`, border: `5px solid ${NBK}`, transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div style={{width: 110, height: 110, borderRadius: 55, background: '#fff', border: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: d.c}}>ISO</div></div>
              <div style={{position: 'absolute', inset: 0, borderRadius: 16, background: '#fff', border: `5px solid ${here ? d.c : NBK}`, boxShadow: here ? `0 0 26px ${d.c}` : 'none', backfaceVisibility: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 10, boxSizing: 'border-box'}}>
                <Ico n={s0.ic} size={50} c={d.c} />
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: s0.num.length > 5 ? 30 : 36, color: INK}}>{s0.num}</div>
                <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 18, color: DIM, textAlign: 'center', lineHeight: 1.1}}>{s0.name}</div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

/* ═════════════ 8. Scan de code-barres : le laser balaie, le numéro ISO apparaît ═════════════ */
const KBarcode: React.FC<{x: number; y: number; at: number; num: string; c: string}> = ({x, y, at, num, c}) => {
  const t = useT();
  const sc = prog(t, at, at + 0.6, easeInOut);
  const rv = prog(t, at + 0.45, at + 0.8, easeOut);
  const bars = Array.from({length: 46}, (_, i) => ({w: 2 + Math.floor(random(`bc${num}${i}`) * 4), on: random(`bo${num}${i}`) > 0.35}));
  let acc = 0;
  return (
    <Abs x={x} y={y} w={600} h={130}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 600, height: 130, opacity: 1 - rv}}>
        {bars.map((b, i) => { const l = acc; acc += b.w + 4; return b.on ? <div key={i} style={{position: 'absolute', left: l, top: 6, width: b.w * 2, height: 110, background: NBK}} /> : null; })}
        <div style={{position: 'absolute', left: 0, top: 6 + 110 * sc - 3, width: 600, height: 6, background: RED, boxShadow: `0 0 18px 4px ${RED}`, opacity: sc > 0 && sc < 1 ? 1 : 0}} />
      </div>
      <div style={{position: 'absolute', left: 0, top: -6, fontFamily: sansFont, fontWeight: 900, fontSize: num.length > 5 ? 84 : 104, color: INK, lineHeight: 1, opacity: rv, transform: `translateY(${(1 - rv) * 24}px)`, whiteSpace: 'nowrap'}}><span style={{color: c}}>ISO</span> {num}</div>
    </Abs>
  );
};

/* ═════════════ 9. Anneau de progression segmenté en 31 ═════════════ */
const KRing31: React.FC<{cx: number; cy: number; R?: number; total?: boolean}> = ({cx, cy, R = 70}) => {
  const t = useT();
  const n = stdCount(t);
  return (
    <div style={{position: 'absolute', left: cx - R - 14, top: cy - R - 14, width: 2 * R + 28, height: 2 * R + 28}}>
      <svg width={2 * R + 28} height={2 * R + 28}>
        {ALLSTD.map((s0, i) => { const a0 = (i / 31) * Math.PI * 2 - Math.PI / 2 + 0.03, a1 = ((i + 1) / 31) * Math.PI * 2 - Math.PI / 2 - 0.03; const on = i < n; const rr = R + 4; const p = (a: number, r: number) => `${R + 14 + Math.cos(a) * r},${R + 14 + Math.sin(a) * r}`; return <path key={i} d={`M ${p(a0, rr)} A ${rr} ${rr} 0 0 1 ${p(a1, rr)} L ${p(a1, rr - 16)} A ${rr - 16} ${rr - 16} 0 0 0 ${p(a0, rr - 16)} Z`} fill={on ? s0.d.c : '#E3E7EE'} stroke={NBK} strokeWidth={1.5} />; })}
      </svg>
      <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: R * 0.55, color: INK, lineHeight: 1}}>{n}</span><span style={{...CAP, fontSize: R * 0.2, color: DIM}}>/ 31</span></div>
    </div>
  );
};

/* ═════════════ 10. Ticket thermique qui s'imprime : le récapitulatif par domaine ═════════════ */
const KTicket: React.FC<{x: number; y: number; at: number; dur: number}> = ({x, y, at, dur}) => {
  const t = useT();
  const lines: [string, string, string][] = [...DOMS.map((d) => [`${d.n}. ${d.name}`, String(d.stds.length), d.c] as [string, string, string]), ['TOTAL', '31', NBK]];
  const p = prog(t, at, at + dur, lin);
  const H = 70 + lines.length * 52 + 60;
  const shown = H * p;
  return (
    <Abs x={x} y={y} w={460} h={H + 90}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 460, height: 70, borderRadius: 16, background: '#2B3038', border: `6px solid ${NBK}`, boxSizing: 'border-box'}}><div style={{position: 'absolute', left: 40, right: 40, top: 46, height: 10, borderRadius: 5, background: '#0B0E12'}} /></div>
      <div style={{position: 'absolute', left: 30, top: 56, width: 400, height: shown, overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 400, height: H, background: '#FFFEF8', boxShadow: '0 10px 20px rgba(0,0,0,0.15)', fontFamily: MONO, clipPath: 'polygon(0 0, 100% 0, 100% 97%, 95% 100%, 90% 97%, 85% 100%, 80% 97%, 75% 100%, 70% 97%, 65% 100%, 60% 97%, 55% 100%, 50% 97%, 45% 100%, 40% 97%, 35% 100%, 30% 97%, 25% 100%, 20% 97%, 15% 100%, 10% 97%, 5% 100%, 0 97%)'}}>
          <div style={{textAlign: 'center', paddingTop: 20, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: NBK}}>AMENDEMENT A1:2024</div>
          {lines.map(([l, v, c], k) => <div key={l} style={{display: 'flex', justifyContent: 'space-between', padding: '12px 24px', borderTop: k === lines.length - 1 ? `3px dashed ${NBK}` : 'none', fontFamily: MONO, fontWeight: 700, fontSize: k === lines.length - 1 ? 30 : 22, color: c}}><span>{l}</span><span>{v}</span></div>)}
        </div>
      </div>
    </Abs>
  );
};

/* ═════════════ 11. Pluie de code binaire (sécurité de l'information) ═════════════ */
const KCodeRain: React.FC<{x: number; y: number; w: number; h: number; at: number; c: string}> = ({x, y, w, h, at, c}) => {
  const t = useT();
  const cols = Math.floor(w / 28);
  return (
    <Abs x={x} y={y} w={w} h={h} style={{overflow: 'hidden', borderRadius: 22, background: '#03130F', border: `6px solid ${NBK}`, opacity: pop(t, at, 0.5)}}>
      {Array.from({length: cols}, (_, i) => { const sp0 = 120 + random(`cr${i}`) * 220; const off = random(`co${i}`) * h; const head = ((t - at) * sp0 + off) % (h + 300); return Array.from({length: 14}, (_, j) => { const yy = head - j * 26; if (yy < -26 || yy > h) return null; return <div key={`${i}-${j}`} style={{position: 'absolute', left: i * 28 + 6, top: yy, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: j === 0 ? '#E8FFF6' : c, opacity: j === 0 ? 1 : Math.max(0.1, 1 - j / 14)}}>{random(`cb${i}${j}${Math.floor(t * 6)}`) > 0.5 ? '1' : '0'}</div>; }); })}
    </Abs>
  );
};

/* ═════════════ 12. Carrousel orbital des huit domaines ═════════════ */
const KDomRing: React.FC<{cx: number; cy: number; at: number; R?: number}> = ({cx, cy, at, R = 260}) => {
  const t = useT();
  const app = Math.min(1, sp(t, at, 7, 12));
  const NM = ['Qualité', 'Santé & sécurité', 'Gouvernance', 'Environnement & énergie', 'Sectorielles', "Sécurité de l'information", 'Autres systèmes', 'Spécifiques'];
  const items = DOMS.map((d, i) => { const th = (i / 8) * Math.PI * 2 + (t - at) * 0.6; return {d, x: Math.cos(th) * R * app, z: Math.sin(th)}; }).sort((u, v) => u.z - v.z);
  return <>{items.map(({d, x, z}) => { const sc = 0.7 + 0.3 * ((z + 1) / 2); return <div key={d.n} style={{position: 'absolute', left: cx + x, top: cy + z * 55, transform: `translate(-50%, -50%) scale(${sc * app})`, display: 'flex', alignItems: 'center', gap: 8, ...nb(d.c, 5), borderColor: NBK, padding: '8px 14px', opacity: 0.45 + 0.55 * ((z + 1) / 2), whiteSpace: 'nowrap', zIndex: Math.round(z * 10) + 10}}><Ico n={d.ic} size={30} c="#fff" /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 21, color: '#fff'}}>{NM[d.n - 1]}</span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 21, color: '#fff', background: 'rgba(0,0,0,0.25)', borderRadius: 8, padding: '0 8px'}}>{d.stds.length}</span></div>; })}</>;
};

/* ═════════════ Signatures animées des normes (une mini-animation par secteur) ═════════════ */
type SG = React.FC<{a: number; c: string}>;
const SZ = 260;
const SigAtom: SG = ({a, c}) => { const t = useT(); const k = Math.max(0, t - a); return <svg width={SZ} height={SZ}>{[0, 60, 120].map((r, i) => <g key={i} transform={`rotate(${r} 130 130)`}><ellipse cx={130} cy={130} rx={105} ry={38} fill="none" stroke={c} strokeWidth={6} opacity={0.8} /><circle cx={130 + 105 * Math.cos(k * 3 + i * 2)} cy={130 + 38 * Math.sin(k * 3 + i * 2)} r={10} fill={YEL} stroke={NBK} strokeWidth={3} /></g>)}<circle cx={130} cy={130} r={24} fill={c} stroke={NBK} strokeWidth={5} /></svg>; };
const SigRails: SG = ({a, c}) => { const t = useT(); const p = prog(t, a, a + 1.6, lin); const tr = prog(t, a + 1.0, a + 2.6, easeInOut); return <svg width={SZ} height={SZ}>{Array.from({length: 9}, (_, i) => <rect key={i} x={12 + i * 28} y={140} width={16} height={60} rx={3} fill="#8A6A44" stroke={NBK} strokeWidth={2} opacity={p * 9 > i ? 1 : 0} />)}<rect x={0} y={152} width={SZ * p} height={8} fill="#5B6472" /><rect x={0} y={182} width={SZ * p} height={8} fill="#5B6472" /><g transform={`translate(${-130 + tr * 230} 0)`}><rect x={20} y={88} width={110} height={56} rx={14} fill={c} stroke={NBK} strokeWidth={5} /><rect x={34} y={98} width={30} height={20} rx={4} fill="#DDEBFF" /><rect x={74} y={98} width={30} height={20} rx={4} fill="#DDEBFF" /><circle cx={45} cy={148} r={9} fill={NBK} /><circle cx={105} cy={148} r={9} fill={NBK} /></g></svg>; };
const SigPump: SG = ({a, c}) => { const t = useT(); const k = Math.max(0, t - a); const ang = Math.sin(k * 3) * 18; return <svg width={SZ} height={SZ}><rect x={20} y={210} width={220} height={14} fill={NBK} /><polygon points="110,210 130,110 150,210" fill="none" stroke={NBK} strokeWidth={8} /><g transform={`rotate(${ang} 130 110)`}><rect x={40} y={100} width={180} height={18} rx={6} fill={c} stroke={NBK} strokeWidth={4} /><path d="M 210 92 Q 236 109 210 126 Z" fill={c} stroke={NBK} strokeWidth={4} /></g><line x1={222} y1={118 + Math.sin(k * 3) * 30} x2={222} y2={210} stroke={NBK} strokeWidth={5} /><rect x={40} y={170} width={46} height={40} rx={6} fill="#8A96A8" stroke={NBK} strokeWidth={4} /></svg>; };
const SigLight: SG = ({a}) => { const t = useT(); const ph = Math.floor(Math.max(0, t - a) / 0.8) % 3; return <svg width={SZ} height={SZ}><rect x={92} y={14} width={76} height={200} rx={20} fill="#2B3038" stroke={NBK} strokeWidth={6} /><rect x={124} y={214} width={12} height={40} fill={NBK} />{[['#E2483B', 0], ['#F5C400', 1], ['#1E9E5A', 2]].map(([col, i]) => <circle key={i as number} cx={130} cy={52 + (i as number) * 62} r={24} fill={ph === (i as number) ? (col as string) : '#4A525C'} style={{filter: ph === (i as number) ? `drop-shadow(0 0 14px ${col})` : undefined}} />)}</svg>; };
const SigDna: SG = ({a, c}) => { const t = useT(); const k = Math.max(0, t - a); return <svg width={SZ} height={SZ}>{Array.from({length: 14}, (_, i) => { const y = 20 + i * 16; const ph = i * 0.55 + k * 3; const x1 = 130 + Math.sin(ph) * 70, x2 = 130 - Math.sin(ph) * 70; const front = Math.cos(ph) > 0; return <g key={i}><line x1={x1} y1={y} x2={x2} y2={y} stroke="#B9C0C8" strokeWidth={4} /><circle cx={x1} cy={y} r={9} fill={front ? c : hexMix(c, '#ffffff', 0.5)} stroke={NBK} strokeWidth={2} /><circle cx={x2} cy={y} r={9} fill={front ? hexMix(c, '#ffffff', 0.5) : c} stroke={NBK} strokeWidth={2} /></g>; })}</svg>; };
const SigDrop: SG = ({a, c}) => { const t = useT(); const k = Math.max(0, t - a); const cyc = k % 1.6; const fall = Math.min(1, cyc / 0.6); return <svg width={SZ} height={SZ}><ellipse cx={130} cy={200} rx={120} ry={34} fill={hexMix(c, '#ffffff', 0.7)} />{cyc < 0.6 && <path d={`M 130 ${20 + fall * 150} c -16 22 -24 34 -24 46 a 24 24 0 0 0 48 0 c 0 -12 -8 -24 -24 -46 z`} fill={c} stroke={NBK} strokeWidth={4} />}{cyc >= 0.6 && [0, 1, 2].map((i) => { const r = ((cyc - 0.6) * 140 + i * 30); return <ellipse key={i} cx={130} cy={200} rx={r} ry={r * 0.28} fill="none" stroke={c} strokeWidth={5} opacity={Math.max(0, 1 - r / 130)} />; })}</svg>; };
const SigWind: SG = ({a, c}) => { const t = useT(); const k = Math.max(0, t - a); return <svg width={SZ} height={SZ}><polygon points="124,250 136,250 132,120 128,120" fill="#C9D2DF" stroke={NBK} strokeWidth={4} /><g transform={`rotate(${k * 200} 130 110)`}>{[0, 120, 240].map((r) => <path key={r} transform={`rotate(${r} 130 110)`} d="M 130 110 C 120 70 124 30 130 14 C 138 30 140 70 130 110 Z" fill="#fff" stroke={NBK} strokeWidth={4} />)}</g><circle cx={130} cy={110} r={12} fill={c} stroke={NBK} strokeWidth={4} /></svg>; };
const SigAir: SG = ({a, c}) => { const t = useT(); const k = Math.max(0, t - a); return <svg width={SZ} height={SZ}>{[0, 1, 2, 3, 4].map((i) => { const y = 40 + i * 44; const d = `M 0 ${y} C 60 ${y - 26}, 120 ${y + 26}, 180 ${y} S 240 ${y - 20}, 260 ${y}`; return <path key={i} d={d} fill="none" stroke={i % 2 ? c : hexMix(c, '#ffffff', 0.4)} strokeWidth={8} strokeLinecap="round" strokeDasharray="40 30" strokeDashoffset={-k * 120 - i * 20} />; })}</svg>; };
const SigCap: SG = ({a, c}) => { const t = useT(); const k = Math.max(0, t - a); const cyc = k % 2; const y = 170 - Math.sin(Math.min(1, cyc / 1.2) * Math.PI) * 130; return <svg width={SZ} height={SZ}><g transform={`translate(0 ${y - 170}) rotate(${cyc * 360} 130 160)`}><polygon points="130,130 220,160 130,190 40,160" fill={c} stroke={NBK} strokeWidth={5} /><rect x={92} y={170} width={76} height={30} rx={6} fill={hexMix(c, '#000000', 0.2)} stroke={NBK} strokeWidth={4} /><line x1={200} y1={164} x2={206} y2={210} stroke={YEL} strokeWidth={5} /></g><rect x={60} y={232} width={140} height={12} rx={6} fill="#C9D2DF" /></svg>; };
const SigPlane: SG = ({a, c}) => { const t = useT(); const k = Math.max(0, t - a); const u = (k * 0.45) % 1; const th = u * Math.PI * 2; const x = 130 + Math.sin(th) * 90, y = 130 + Math.sin(th * 2) * 50; const ang = Math.atan2(Math.cos(th * 2) * 100, Math.cos(th) * 90) * 57; return <svg width={SZ} height={SZ}><path d="M 130 130 m -90 0 c 0 -60 180 60 180 0 c 0 -60 -180 60 -180 0" fill="none" stroke={hexMix(c, '#ffffff', 0.5)} strokeWidth={4} strokeDasharray="8 10" /><polygon points="-30,0 30,-12 10,0 30,12" transform={`translate(${x} ${y}) rotate(${ang})`} fill="#fff" stroke={NBK} strokeWidth={4} /><polygon points="40,230 80,170 120,230" fill={c} stroke={NBK} strokeWidth={4} /><polygon points="100,230 150,150 200,230" fill={hexMix(c, '#000000', 0.2)} stroke={NBK} strokeWidth={4} /></svg>; };
const SigGuilloche: SG = ({a, c}) => { const t = useT(); const p = prog(t, a, a + 2.5, lin); const pts: string[] = []; const M = Math.floor(720 * p); for (let i = 0; i <= M; i++) { const th = (i / 720) * Math.PI * 2 * 7; const R = 70, r = 31, d = 52; const x = (R - r) * Math.cos(th) + d * Math.cos(((R - r) / r) * th); const y = (R - r) * Math.sin(th) - d * Math.sin(((R - r) / r) * th); pts.push(`${(130 + x * 0.95).toFixed(1)},${(130 + y * 0.95).toFixed(1)}`); } return <svg width={SZ} height={SZ}><circle cx={130} cy={130} r={122} fill="#FBF7EE" stroke={NBK} strokeWidth={5} />{pts.length > 1 && <polyline points={pts.join(' ')} fill="none" stroke={c} strokeWidth={2} />}</svg>; };
const SigInfinity: SG = ({a, c}) => { const t = useT(); const k = Math.max(0, t - a); const u = (k * 0.5) % 1; const th = u * Math.PI * 2; const x = 130 + 100 * Math.cos(th) / (1 + Math.sin(th) ** 2), y = 130 + 100 * Math.sin(th) * Math.cos(th) / (1 + Math.sin(th) ** 2); const d = Array.from({length: 61}, (_, i) => { const a2 = (i / 60) * Math.PI * 2; const den = 1 + Math.sin(a2) ** 2; return `${(130 + 100 * Math.cos(a2) / den).toFixed(1)},${(130 + 100 * Math.sin(a2) * Math.cos(a2) / den).toFixed(1)}`; }).join(' '); return <svg width={SZ} height={SZ}><polyline points={d} fill="none" stroke={hexMix(c, '#ffffff', 0.4)} strokeWidth={14} strokeLinejoin="round" /><circle cx={x} cy={y} r={16} fill={YEL} stroke={NBK} strokeWidth={4} style={{filter: `drop-shadow(0 0 12px ${YEL})`}} /></svg>; };
const SigSprout: SG = ({a, c}) => { const t = useT(); const g = prog(t, a, a + 2.0, easeOut); const l1 = prog(t, a + 0.8, a + 1.6, easeOut), l2 = prog(t, a + 1.2, a + 2.0, easeOut), pod = prog(t, a + 1.8, a + 2.6, easeOut); return <svg width={SZ} height={SZ}><ellipse cx={130} cy={232} rx={100} ry={18} fill="#8A6A44" /><path d={`M 130 232 C 128 200, 136 170, 130 ${232 - 170 * g}`} fill="none" stroke="#3F7D2C" strokeWidth={8} strokeLinecap="round" /><path d="M 130 170 C 90 150 80 120 70 110 C 100 110 124 130 130 170 Z" fill={c} stroke={NBK} strokeWidth={3} transform={`translate(130 170) scale(${l1}) translate(-130 -170)`} /><path d="M 131 130 C 170 110 180 84 196 74 C 166 72 140 92 131 130 Z" fill={hexMix(c, '#ffffff', 0.15)} stroke={NBK} strokeWidth={3} transform={`translate(131 130) scale(${l2}) translate(-131 -130)`} /><ellipse cx={150} cy={185} rx={20 * pod} ry={34 * pod} fill="#A0522D" stroke={NBK} strokeWidth={3} /></svg>; };
const SigChain: SG = ({a, c}) => { const t = useT(); return <svg width={SZ} height={SZ}>{[0, 1, 2, 3].map((i) => { const q = prog(t, a + i * 0.35, a + i * 0.35 + 0.5, easeOut); return <rect key={i} x={20 + i * 52 - (1 - q) * 80} y={i % 2 ? 106 : 96} width={86} height={i % 2 ? 48 : 68} rx={30} fill="none" stroke={i % 2 ? hexMix(c, '#000000', 0.2) : c} strokeWidth={12} opacity={q} />; })}</svg>; };
const SigHolo: SG = ({a, c}) => { const t = useT(); const k = Math.max(0, t - a); const fl = 0.75 + 0.25 * Math.sin(k * 40) * (random(`hl${Math.floor(t * 12)}`) > 0.8 ? 1 : 0.1); return <svg width={SZ} height={SZ}><ellipse cx={130} cy={230} rx={90} ry={18} fill="#1A2233" stroke={NBK} strokeWidth={4} /><polygon points="50,226 210,226 170,40 90,40" fill={`${c}22`} />{Array.from({length: 18}, (_, i) => <line key={i} x1={80} y1={50 + i * 10} x2={180} y2={50 + i * 10} stroke={c} strokeWidth={1.5} opacity={0.35} />)}<g opacity={fl} transform={`translate(130 120) rotate(${Math.sin(k) * 8}) translate(-130 -120)`}><rect x={96} y={104} width={68} height={56} rx={8} fill="none" stroke="#7CFFE4" strokeWidth={6} /><path d="M 108 104 V 86 a 22 22 0 0 1 44 0 V 104" fill="none" stroke="#7CFFE4" strokeWidth={6} /><circle cx={130} cy={128} r={7} fill="#7CFFE4" /></g></svg>; };
const SigIcon: React.FC<{a: number; c: string; ic: string}> = ({a, c, ic}) => { const t = useT(); const k = Math.max(0, t - a); const q = Math.min(1, sp(t, a, 8, 12)); return <div style={{position: 'relative', width: SZ, height: SZ}}>{[0, 1, 2].map((i) => { const r = ((k * 0.8 + i / 3) % 1); return <div key={i} style={{position: 'absolute', left: SZ / 2 - 60 - r * 60, top: SZ / 2 - 60 - r * 60, width: 120 + r * 120, height: 120 + r * 120, borderRadius: '50%', border: `5px solid ${c}`, opacity: 1 - r}} />; })}<div style={{position: 'absolute', left: SZ / 2 - 70, top: SZ / 2 - 70, width: 140, height: 140, borderRadius: 70, background: '#fff', border: `6px solid ${NBK}`, boxShadow: `6px 6px 0 ${c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${q})`}}><Ico n={ic} size={78} c={c} /></div></div>; };
const SIGS: Record<string, SG> = {atom: SigAtom, rails: SigRails, pump: SigPump, light: SigLight, dna: SigDna, drop: SigDrop, wind: SigWind, air: SigAir, cap: SigCap, plane: SigPlane, guilloche: SigGuilloche, infinity: SigInfinity, sprout: SigSprout, chain: SigChain, holo: SigHolo};

/* ═════════════ Panneau d'une norme : signature, scan du numéro, nom, définition, anneau 31 ═════════════ */
const KStd: React.FC<{d: DOM; s0: STD; end: number}> = ({d, s0, end}) => {
  const t = useT();
  const S0 = s0.sig ? SIGS[s0.sig] : null;
  return (
    <Ph a={s0.at - 0.15} b={end}>
      <Abs x={60} y={840} w={960} h={500} style={{...nb('#fff', 8), borderColor: NBK, boxShadow: `8px 8px 0 ${d.c}`}} />
      <Abs x={80} y={900} w={SZ} h={SZ}>{S0 ? <S0 a={s0.at} c={d.c} /> : <SigIcon a={s0.at} c={d.c} ic={s0.ic} />}</Abs>
      <KBarcode x={380} y={880} at={s0.at} num={s0.num} c={d.c} />
      <Abs x={380} y={1015} w={600}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: s0.name.length > 24 ? 38 : 46, color: d.c, lineHeight: 1.05, opacity: pop(t, s0.at + 0.7), transform: `translateX(${(1 - pop(t, s0.at + 0.7)) * 40}px)`}}>{s0.name}</div></Abs>
      <ZDef text={`Système de management · ${s0.desc}`} a={s0.at + 0.9} e={s0.at + 2.4} x={380} y={1120} w={460} fs={28} c={DIM} />
      <KRing31 cx={930} cy={1250} R={62} />
    </Ph>
  );
};

/* ═════════════ Scène d'un domaine : livre pop-up, éventail, normes ═════════════ */
const domScene = (d: DOM): React.FC => () => {
  const first = d.stds[0].at;
  const isInfo = d.n === 6;
  return (
    <Out end={d.b}>
      <Heads h={[[d.a + 0.1, [`${d.n}. ${d.name}`], [0]], [first - 0.2, [d.name, `· ${d.cnt}`], [0]]]} />
      <Ph a={d.a} b={first - 0.25}><KBook d={d} at={d.a + 0.1} cntAt={d.cntAt} /></Ph>
      <Ph a={first - 0.3} b={d.b}>
        {isInfo && <KCodeRain x={60} y={460} w={960} h={360} at={first - 0.3} c={d.c} />}
        <KFan d={d} at={first - 0.3} />
      </Ph>
      {d.stds.map((s0, k) => <KStd key={s0.num} d={d} s0={s0} end={k + 1 < d.stds.length ? d.stds[k + 1].at - 0.15 : d.b} />)}
    </Out>
  );
};
const D1 = domScene(DOMS[0]), D2 = domScene(DOMS[1]), D3 = domScene(DOMS[2]), D4 = domScene(DOMS[3]), D5 = domScene(DOMS[4]), D6 = domScene(DOMS[5]), D7 = domScene(DOMS[6]), D8 = domScene(DOMS[7]);

/* ═════════════ Guichet 1 : introduction ═════════════ */
const TABS = [20.1, 21.3, 23.0, 23.6, 26.2, 27.5, 29.4, 31.2];
const Intro: React.FC = () => {
  const t = useT();
  return (
    <Out end={32.3}>
      <Heads h={[[2.9, ['31 normes ISO', 'et le climat'], [1]], [6.0, ["L'amendement", 'A1:2024'], [1]], [12.1, ['Les 31 normes', 'du tableau'], [0]], [14.6, ['Parcourir', 'par domaine'], [1]]]} />
      <Ph a={2.65} b={6.0}>
        <KStripes x={60} y={470} w={960} h={420} at={2.7} />
        <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb('#fff', 8), borderColor: NBK, padding: '10px 40px', display: 'flex', alignItems: 'baseline', gap: 16}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 150, color: NAVY, lineHeight: 1}}><Count n={31} a={2.8} b={3.8} /></span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: INK}}>normes ISO</span></div></Abs>
        <Row3 y={960} gap={14}><TChip at={3.6} l="Systèmes de management" c={NAVY} ic="Workflow" fs={32} /><TChip at={4.9} l="Changement climatique" c="#99000D" ic="Thermometer" fs={32} fill /></Row3>
      </Ph>
      <Ph a={6.0} b={14.55}>
        <KLaser x={90} y={470} w={900} h={230} at={7.0} text="AMENDEMENT A1:2024" sub="Action climatique" dur={1.4} />
        <KVortex x={75} y={740} at={9.4} land={12.2} />
        {t > 13.3 && <Abs x={0} y={1290} w={1080} style={{display: 'flex', justifyContent: 'center', zIndex: 5}}><NBadge at={13.3} text="QUEL QUE SOIT LEUR ÉTAT" bg={RED} rot={-2} size={28} /></Abs>}
      </Ph>
      <Ph a={14.55} b={32.3}>
        <SearchOpen x={60} y={450} w={960} h={900} at={14.7} query="normes ISO climat A1:2024" results={['Amendement A1:2024 : les 31 normes', 'Normes par domaine', 'Action climatique']} found={0} foundAt={16.6} clickAt={17.1} c={NAVY}>
          <div style={{position: 'absolute', inset: 0, background: '#F4F6FA'}}><KCabinet x={20} y={20} w={910} at={17.9} tabs={TABS} /></div>
        </SearchOpen>
      </Ph>
    </Out>
  );
};

/* ═════════════ Guichet 10 : bilan ═════════════ */
const GBilan: React.FC = () => (
  <Out end={OUTRO_AT}>
    <Heads h={[[253.8, ['31 normes', 'parcourues'], [0]], [256.6, ['Amendement A1:2024', 'action climatique'], [0]]]} />
    <Ph a={253.7} b={OUTRO_AT}>
      <KTicket x={60} y={470} at={253.9} dur={3.4} />
      <KRing31 cx={790} cy={740} R={130} />
      <KDomRing cx={540} cy={1235} at={254.4} R={300} />
      <Row3 y={1300}><TChip at={258.4} l="Changement climatique" c="#99000D" ic="Thermometer" fs={30} fill /></Row3>
    </Ph>
  </Out>
);

/* ═════════════ Police de la vidéo : Cambria (repli Caladea embarqué) ═════════════ */
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-Regular.ttf'), weight: '400'});
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-Bold.ttf'), weight: '700'});
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-Italic.ttf'), weight: '400', style: 'italic'});
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-BoldItalic.ttf'), weight: '700', style: 'italic'});
const CAMBRIA_CSS = ".cambria, .cambria * { font-family: Cambria, 'Caladea', Georgia, serif !important; }";

/* ═════════════ Couverture : globe des 31 numéros + titre en lettres-photos animées ═════════════ */
const KCover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Bg />
      <Abs x={0} y={40} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.14)'}}><Img src={staticFile(LOGO)} style={{height: 76, display: 'block'}} /></div></Abs>
      <Abs x={0} y={175} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb(NAVY, 6), borderColor: NBK, padding: '8px 22px', ...CAP, fontSize: 26, color: '#fff'}}>Amendement A1:2024 · action climatique</div></Abs>
      <KGlobe cx={540} cy={570} R={290} a={-5} fs={30} />
      <Abs x={0} y={905} w={1080} style={{display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap'}}><PhotoLetterAnim ch="LES 31 NORMES ISO" src="iso9001-gen/qualiticien-tablette.jpg" size={104} ls={2} seed={2} /></Abs>
      <Abs x={0} y={1025} w={1080} style={{display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap'}}><PhotoLetterAnim ch="ET LE CLIMAT" src="climat-gen/auditeur-climat.jpg" size={130} ls={3} seed={5} /></Abs>
      <Abs x={40} y={1200} w={1000} style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10}}>{DOMS.map((d) => <div key={d.n} style={{...nb(d.c, 4), borderColor: NBK, padding: '5px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: '#fff'}}>{d.n}. {d.name}</div>)}</Abs>
      <Abs x={60} y={1400} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 60 + k * 93 - 18, top: 28, width: 36, height: 36, borderRadius: 9, background: x.c, border: '4px solid #fff', boxSizing: 'border-box'}} />)}
        <div style={{position: 'absolute', left: 60 + 0.5 * 93 - 28, top: 36}}><Capsule w={56} c={NAVY} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 60 + k * 93 - 46, width: 92, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 14, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Montage, bruitage ═════════════ */
const TK = 1.8;
const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1 / TK, 4, 0.18 / TK, 'sfx/ding', 0.12), {at: x.at + 0.45 / TK, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95 / TK, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6 / TK, s: 'sfx/pop', v: 0.2}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len / 2), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at + 0.15, s: 'sfx/bell', v: 0.14})),
  {at: 2.7, s: 'sfx/rise', v: 0.2, dur: 1.6}, {at: 3.8, s: 'bass-hit', v: 0.3}, {at: 3.6, s: 'sfx/pop', v: 0.18}, {at: 4.9, s: 'sfx/pop', v: 0.18},
  ...rep(7.0, 12, 0.12, 'tick', 0.12), {at: 9.4, s: 'soft-whoosh', v: 0.4, dur: 1.5}, {at: 12.4, s: 'validation', v: 0.28}, {at: 13.3, s: 'tampon', v: 0.35},
  ...searchCues(14.7, 25, 16.6, 17.1), {at: 17.9, s: 'sfx/thud', v: 0.3}, ...TABS.map((at) => ({at, s: 'sfx/pop', v: 0.2})),
  ...DOMS.flatMap((d) => [{at: d.a + 0.1, s: 'soft-whoosh', v: 0.32, dur: 1}, {at: d.a + 0.6, s: 'sfx/rise', v: 0.15, dur: 0.8}, {at: d.cntAt, s: 'tampon', v: 0.35}, {at: d.stds[0].at - 0.3, s: 'sfx/swish', v: 0.25}]),
  ...ALLSTD.flatMap((s0) => [{at: s0.at - 0.2, s: 'sfx/swish', v: 0.18}, {at: s0.at + 0.05, s: 'sfx/click', v: 0.2}, {at: s0.at + 0.5, s: 'sfx/ding', v: 0.2}]),
  ...rep(253.9, 22, 0.15, 'sfx/click', 0.12), {at: 257.4, s: 'validation', v: 0.3}, {at: 258.4, s: 'sfx/pop', v: 0.2},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];
const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SCN: [React.FC, number, number][] = [[Intro, 2.6, 32.35], [D1, 34.1, 70.35], [D2, 72.1, 98.3], [D3, 100.0, 124.95], [D4, 126.7, 151.65], [D5, 153.4, 179.05], [D6, 180.8, 202.35], [D7, 204.1, 231.35], [D8, 233.1, 252.05], [GBilan, 253.7, OUTRO_AT]];
export const NormesClimatMetro: React.FC = () => (
  <AbsoluteFill className="cambria" style={{background: PAPER}}>
    <style>{CAMBRIA_CSS}</style>
    <Bg />
    {SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7 / TK}><TimeWarp.Provider value={{at: x.at, k: TK}}><C i={i} /></TimeWarp.Provider></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><KCover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-normes-climat-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u2 = [wn, Avatar, Ring3D, SlamTag, Arrow, slamK, CAP, STAGE, SCAN, RING_ISO, Drum, Marked, Announce, MBadge, RailSteps, StairSteps, ZigSteps, QBubble, Grid15, RameWipe, Forklift, ICO, MC, ACR, lin, hexMix, cl, GyroFlash, Hot, Photo, Pill2, Ph, TChip, Row3, SlamCard, ZInk, ZTicker, ZAxis, ZDef, KCodeRain];

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn, Barred, Flap];
