import React from 'react';
import {loadFont} from '@remotion/fonts';
import type {LucideIcon} from 'lucide-react';
import {Activity, ArrowRight, Package, Store as LStore, Rocket, Compass, Telescope, Snowflake, Shovel, Radiation, Crown, Hammer, KeyRound, Construction, Turtle, ScanEye, Car, Laptop, HeartPulse, Accessibility, Apple, Carrot, Wheat, Fish, Milk, Trash2, CircleHelp, TrainFront, Play, Music, CreditCard, Files, Trophy, Building2, Copy, Ruler, Tag, BrickWall, EyeOff, Shuffle, Swords, Droplet, Spline, Archive, Crosshair, Award, BadgeCheck, Ban, Bell, BellRing, BookOpen, Briefcase, BriefcaseMedical, CalendarClock, CalendarDays, ChartColumn, ChartNoAxesCombined, Check as LCheck, CircleCheckBig, CircleX, ClipboardCheck, ClipboardList, Clock, DoorOpen, Droplets, Ear, Eye, Factory, Fan, FileText, FireExtinguisher, Flag, FlaskConical, FolderOpen, Footprints, Gauge, Gavel, Glasses, Globe, GraduationCap, Hand, HandHeart, HardHat, IdCard, Image as ImageIcon, Infinity as InfinityIcon, TrendingUp, TrendingDown, Dumbbell, CalendarSync, Cog, MessageCircle, Send, Phone, MousePointerClick, FileCheck, Stamp as StampIcon, Mic, History as HistoryIcon, Timer, RotateCcw, Brain, Hourglass, Repeat2, Sparkles, Calendar, Quote, Signpost, Heart, House, Video, Shield, Flame, Landmark, Scissors, Handshake, Thermometer, ChartGantt, CloudSun, ScanSearch, Unlink, Layers, Leaf, Lightbulb, Link, Navigation, ListChecks, Lock, LockOpen, Mail, MapPin, Megaphone, MessageCircleOff, MessageSquareText, Network, Newspaper, OctagonAlert, PenLine, Power, Presentation, Puzzle, Recycle, RefreshCw, Repeat, Route, Scale, ScrollText, Search, Settings2, ShieldAlert, ShieldCheck, Siren, Split, Sprout, Target, ThumbsUp, TriangleAlert, User, UserCheck, UserPlus, Users, VolumeX, Workflow, Wrench, Zap} from 'lucide-react';
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
 * « La Charte Qualité » (voix d'origine complète, 5 min 08) — capsule « condensé de toutes les techniques + effet
 * wahou + ultra premium » en métro. Tube de verre à sept guichets (la charte qualité → définir la charte → le pourquoi
 * stratégique → les atouts majeurs → la méthodologie → les critères de réussite → la clé de voûte), capsule qui file
 * d'un guichet à l'autre, gyrophare resserré par TimeWarp, barre de recherche qui ouvre « concrètement, à
 * l'organisation ? », carrousel 3D et images du dépôt. Couverture : orbite 3D des notions de la charte + titre en
 * lettres-photos animées. Seuls les chiffres cités par la voix sont affichés (2 minutes, 10 engagements). Le document
 * « charte qualité » sert de fil rouge (fondation, échelon du conseil, étagère poussiéreuse, charte vivante, clé de
 * voûte). Techniques nouvelles : douze cent cinquante particules qui s'assemblent en « CHARTE », bulles de concepts
 * qui se figent en jalons d'une route, point d'interrogation en briques, plan de ligne du menu avec rame, dalle coulée
 * et première pierre, classeur qui claque et tampon « NON », document qui gravit l'échelle jusqu'au conseil, cible à
 * trois flèches, diapason qui accorde l'équipe, tamis des engagements forts, exclusions barrées et éjectées,
 * parchemin et cadre de confiance, porte de coffre qui libère la valeur, avalanche de paperasse figée, course des
 * tours et moteur stratégique, contrat barré replié en bulle de parole, mégaphone et promesse signée en direct,
 * immeuble de verre et chaîne de confiance, pièce d'or qui se dédouble, projecteur qui glisse du prix vers la
 * qualité, principes fantômes matérialisés, bond de géant de la marque, levier de croissance, plan d'architecte,
 * table ronde des métiers, flèches alignées sur l'étoile, balance moyens / ambitions, poussière et toile d'araignée,
 * roue PDCA et électrocardiogramme, ciseaux de la concision, dix cases et engagement de trop, lingots des règles
 * d'or, verre d'eau qui devient limpide, flèche qui frappe la cible, arène concurrentielle, haut-parleur barré qui
 * éclate, arche dont la charte est la clé de voûte.
 * Sous-titres NeoCaptions sur la voix d'origine, sans musique.
 */
const IMG = {
  cover: 'principes-gen/valoriser.jpg',
  c1: 'principes-gen/fournisseurs.jpg',
  c2: 'climat-gen/gouvernance.jpg',
  audit: 'climat-gen/gouvernance.jpg',
  pro: 'promo/hse-machine.jpg',
  organisation: 'induction/accueil-groupe.jpg',
  fournisseurs: 'principes-gen/fournisseurs.jpg',
  valoriser: 'principes-gen/valoriser.jpg',
  operatrice: 'verites/operatrice-tablette.jpg',
  rapport: 'iso26/rapport-audit.jpg',
  checklist: 'iso26/audit-checklist.jpg',
  raffinerie: 'promo/raffinerie.jpg',
  bienetre: 'siglesqse-gen/bien-etre.jpg',
  jamaisSeul: 'principes-gen/jamais-seul.jpg',
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
const OUTRO_AT = 308.3;
export const CHARTE_QUALITE_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '0', title: 'La charte qualité', s: 'Élever les standards', c: NAVY, g: 'introduction', k: 'none', lab: 'GUICHET 1 / 7'},
  {at: 36.0, n: '1', title: 'Définir la charte', s: 'La fondation de nos standards', c: '#22B573', g: 'définir', k: 'gyro', lab: 'GUICHET 2 / 7'},
  {at: 92.2, n: '2', title: 'Le pourquoi stratégique', s: 'Libérer la valeur', c: '#1F5BD8', g: 'pourquoi', k: 'gyro', lab: 'GUICHET 3 / 7'},
  {at: 137.8, n: '3', title: 'Les atouts majeurs', s: 'En interne ou en externe', c: '#F28C28', g: 'atouts', k: 'gyro', lab: 'GUICHET 4 / 7'},
  {at: 193.8, n: '4', title: 'La méthodologie', s: 'Les mains dans le cambouis', c: '#14A3A3', g: 'méthode', k: 'gyro', lab: 'GUICHET 5 / 7'},
  {at: 237.0, n: '5', title: 'Les critères de réussite', s: 'La concision', c: '#D6457A', g: 'critères', k: 'gyro', lab: 'GUICHET 6 / 7'},
  {at: 286.0, n: '✓', title: 'La clé de voûte', s: 'De la performance moderne', c: BURG, g: 'clé de voûte', k: 'gyro', lab: 'GUICHET 7 / 7'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 307.6;
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
  const sx = (k: number) => 86 + k * (835 / (SECT.length - 1));
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
                <div style={{position: 'absolute', left: -40, width: 124, top: 50, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 13, color: here ? x.c : passed ? GREEN : '#A9B1BE'}}>{x.g}</div>
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
  {n: 1, l: 'La charte qualité', s: 'Charte', at: 4.6},
  {n: 2, l: 'Définir la charte', s: 'Définir', at: 38.2},
  {n: 3, l: 'Un document officiel', s: 'Officiel', at: 50.3},
  {n: 4, l: 'Des engagements forts', s: 'Engagements', at: 75.0},
  {n: 5, l: 'Le pourquoi stratégique', s: 'Pourquoi', at: 94.8},
  {n: 6, l: 'Une promesse officielle', s: 'Promesse', at: 127.5},
  {n: 7, l: 'Les atouts majeurs', s: 'Atouts', at: 140.6},
  {n: 8, l: "L'image de marque", s: 'Image', at: 183.5},
  {n: 9, l: 'La méthodologie de rédaction', s: 'Méthode', at: 197.0},
  {n: 10, l: 'Une charte vivante', s: 'Vivante', at: 230.2},
  {n: 11, l: 'Un maximum de 10 engagements', s: '10 points', at: 254.0},
  {n: 12, l: 'La clé de voûte', s: 'Voûte', at: 302.0},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE CHARTE · STATION {r.n} / 12</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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
const LUC: Record<string, LucideIcon> = {Heart, House, Video, Shield, Flame, Landmark, Scissors, Handshake, Thermometer, ChartGantt, CloudSun, ScanSearch, Unlink, Quote, Signpost, TrendingUp, TrendingDown, Dumbbell, CalendarSync, Cog, MessageCircle, Send, Phone, MousePointerClick, FileCheck, Stamp: StampIcon, Mic, History: HistoryIcon, Timer, RotateCcw, Brain, Hourglass, Repeat2, Sparkles, Calendar, DoorOpen, UserPlus, IdCard, Route, BriefcaseMedical, Newspaper, Presentation, Image: ImageIcon, Mail, Clock, Eye, Bell, BellRing, Sprout, ThumbsUp, HandHeart, Infinity: InfinityIcon, Flag, MapPin, Link, Puzzle, Split, User, Droplets, Lightbulb, Navigation, Activity, Ear, Siren, MessageSquareText, MessageCircleOff, VolumeX, Power, OctagonAlert, Fan, Megaphone, FlaskConical, LockOpen, Ban, Repeat, Zap, UserCheck, Network, BookOpen, Workflow, Search, FileText, CircleX, ChartColumn, FolderOpen, HardHat, TriangleAlert, Target, ClipboardList, ScrollText, Lock, ShieldAlert, FireExtinguisher, Wrench, Leaf, Factory, Scale, Recycle, Gavel, ShieldCheck, Globe, Layers, BadgeCheck, CalendarDays, PenLine, Gauge, RefreshCw, CalendarClock, ListChecks, Settings2, Award, GraduationCap, Briefcase, Users, ClipboardCheck, ChartNoAxesCombined, Glasses, Hand, Footprints, Check: LCheck, CircleCheckBig, Package, Store: LStore, Rocket, Compass, Telescope, Snowflake, Shovel, Radiation, Crown, Hammer, KeyRound, Construction, Turtle, ScanEye, Car, Laptop, HeartPulse, Accessibility, Apple, Carrot, Wheat, Fish, Milk, Trash2, CircleHelp, TrainFront, Play, Music, CreditCard, Files, Trophy, Building2, Copy, Ruler, Tag, BrickWall, EyeOff, Shuffle, Swords, Droplet, Spline, Archive, Crosshair,
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

/* ═════════════ Palette : inductives (rouge) / déductives (orange) ═════════════ */
Object.assign(LUC, {ArrowRight});
const CI = '#E04E3C', CD = '#E8901E';
const METH: [string, string, number][] = [['APR', 'Analyse préliminaire des risques', 29.3], ['Arbre des conséquences', 'Arbre des conséquences', 31.6], ['AMDE', 'Modes de défaillance et effets', 33.3], ['AMDEC', 'AMDE + criticité', 34.2], ['HAZOP', 'Étude des dangers et de l’opérabilité', 35.4], ['Nœud papillon', 'Causes · événement · conséquences', 37.6], ['MADS-MOSAR', 'Méthode d’analyse des risques', 39.5]];

/* ═════════════ 1. Texte qui court sur une trajectoire circulaire ═════════════ */
const JCirText: React.FC<{cx: number; cy: number; R: number; at: number; text: string; c: string}> = ({cx, cy, R, at, text, c}) => {
  const t = useT();
  const app = pop(t, at, 0.6);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: app}}>
      <defs><path id="cirp" d={`M ${cx} ${cy} m ${-R} 0 a ${R} ${R} 0 1 1 ${2 * R} 0 a ${R} ${R} 0 1 1 ${-2 * R} 0`} /></defs>
      <circle cx={cx} cy={cy} r={R - 40} fill="#fff" stroke={NBK} strokeWidth={8} />
      <circle cx={cx} cy={cy} r={R + 34} fill="none" stroke={c} strokeWidth={4} strokeDasharray="6 12" />
      <g transform={`rotate(${(t - at) * 40} ${cx} ${cy})`}><text fontFamily={sansFont} fontWeight={900} fontSize={46} fill={NBK} letterSpacing={6}><textPath href="#cirp">{text}</textPath></text></g>
    </svg>
  );
};

/* ═════════════ 2. Miroir : l'approche inductive se reflète en approche déductive ═════════════ */
const JMirror: React.FC<{a: number; b: number; y: number}> = ({a, b, y}) => {
  const t = useT();
  const qa = Math.min(1, sp(t, a, 8, 12)), fb = prog(t, b - 0.1, b + 0.5, easeInOut);
  const sweep = prog(t, b - 0.4, b + 0.3, lin);
  const card = (l: string, c: string, dir: number): React.ReactNode => <div style={{width: 440, height: 300, ...nb('#fff', 8), borderColor: NBK, boxShadow: `8px 8px 0 ${c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: c}}>{l}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: NBK}}>{dir > 0 ? 'C → E' : 'E → C'}</div><div style={{...CAP, fontSize: 20, color: DIM}}>{dir > 0 ? 'causes vers effets' : 'effets vers causes'}</div></div>;
  return (
    <>
      <Abs x={60} y={y} w={440} h={300} style={{transform: `scale(${qa})`}}>{card('Inductives', CI, 1)}</Abs>
      <div style={{position: 'absolute', left: 536, top: y - 40, width: 8, height: 380, background: `linear-gradient(180deg, transparent, ${NAVY}, transparent)`}} />
      {sweep > 0 && sweep < 1 && <div style={{position: 'absolute', left: 520, top: y - 40 + 380 * sweep - 40, width: 40, height: 80, background: 'radial-gradient(circle, #fff, transparent 70%)'}} />}
      <Abs x={580} y={y} w={440} h={300} style={{transform: `perspective(1000px) rotateY(${(1 - fb) * -90}deg)`, transformOrigin: '0 50%', opacity: fb > 0 ? 1 : 0}}>{card('Déductives', CD, -1)}</Abs>
    </>
  );
};

/* ═════════════ 3. Pendule de Newton : la cause frappe, l'effet s'envole ═════════════ */
const JNewton: React.FC<{cx: number; y: number; at: number; hit: number; c: string}> = ({cx, y, at, hit, c}) => {
  const t = useT();
  const L = 300, r = 46, n = 5;
  const k = t - hit;
  const amp = 38;
  let a0 = 0, a4 = 0;
  if (t < hit) a0 = -amp * prog(t, at + 0.3, hit - 0.6, easeOut) * (t > hit - 0.6 ? Math.cos(((t - (hit - 0.6)) / 0.6) * Math.PI / 2) : 1);
  else { const ph = (k * 1.6) % 2; const damp = Math.exp(-k * 0.35); if (ph < 1) a4 = amp * Math.sin(ph * Math.PI) * damp; else a0 = -amp * Math.sin((ph - 1) * Math.PI) * damp; }
  const ball = (i: number, ang: number): React.ReactNode => { const px = cx + (i - 2) * 2 * r; const rad = (ang * Math.PI) / 180; const bx = px + Math.sin(rad) * L, by = y + Math.cos(rad) * L; return <g key={i}><line x1={px} y1={y} x2={bx} y2={by} stroke="#5B6472" strokeWidth={4} /><circle cx={bx} cy={by} r={r} fill={`url(#nb${i === 0 ? 'c' : i === 4 ? 'e' : 'm'})`} stroke={NBK} strokeWidth={4} /></g>; };
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <defs>
        <radialGradient id="nbm" cx="35%" cy="35%"><stop offset="0%" stopColor="#fff" /><stop offset="100%" stopColor="#8A96A8" /></radialGradient>
        <radialGradient id="nbc" cx="35%" cy="35%"><stop offset="0%" stopColor="#fff" /><stop offset="100%" stopColor={c} /></radialGradient>
        <radialGradient id="nbe" cx="35%" cy="35%"><stop offset="0%" stopColor="#fff" /><stop offset="100%" stopColor={NAVY} /></radialGradient>
      </defs>
      <rect x={cx - 280} y={y - 26} width={560} height={22} rx={10} fill={NBK} />
      {Array.from({length: n}, (_, i) => ball(i, i === 0 ? a0 : i === 4 ? a4 : 0))}
      {k > 0 && k < 0.25 && <circle cx={cx - r} cy={y + L} r={30 + k * 300} fill="none" stroke={YEL} strokeWidth={6} opacity={1 - k * 4} />}
    </svg>
  );
};

/* ═════════════ 4. Mèche allumée : trois départs possibles, la flamme court jusqu'à l'accident ═════════════ */
const fusePt = (u: number): [number, number] => { const x = 120 + u * 780; const y = 1000 - Math.sin(u * Math.PI * 2.2) * 120 - u * 160; return [x, y]; };
const JFuse: React.FC<{at: number; starts: [string, number][]; burn: [number, number]; c: string}> = ({at, starts, burn, c}) => {
  const t = useT();
  const p = prog(t, burn[0], burn[1], lin);
  const pts = Array.from({length: 81}, (_, i) => fusePt(i / 80));
  const burnt = pts.slice(0, Math.max(1, Math.floor(80 * p) + 1));
  const [hx, hy] = fusePt(p);
  const boom = t > burn[1] ? Math.min(1, (t - burn[1]) / 0.5) : 0;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <polyline points={pts.map((q) => q.join(',')).join(' ')} fill="none" stroke="#C8A86B" strokeWidth={14} strokeLinecap="round" strokeDasharray="2 10" />
        <polyline points={pts.map((q) => q.join(',')).join(' ')} fill="none" stroke="#8A6A44" strokeWidth={8} strokeLinecap="round" />
        {p > 0 && <polyline points={burnt.map((q) => q.join(',')).join(' ')} fill="none" stroke="#2B2B2B" strokeWidth={10} strokeLinecap="round" />}
        {p > 0 && p < 1 && <><circle cx={hx} cy={hy} r={18 + Math.sin(t * 40) * 4} fill="#FFD27A" style={{filter: 'drop-shadow(0 0 16px #FF7A1F)'}} />{Array.from({length: 7}, (_, k) => <circle key={k} cx={hx + (random(`fz${k}${Math.floor(t * 25)}`) - 0.5) * 60} cy={hy + (random(`fy${k}${Math.floor(t * 25)}`) - 0.5) * 60} r={4} fill="#FFB020" />)}</>}
      </svg>
      {starts.map(([l, a], k) => { const [x, y] = fusePt(k * 0.08); const q = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0; return <div key={l} style={{position: 'absolute', left: x - 40 + k * 10, top: y - 160 - k * 70, ...nb('#fff', 5), borderColor: NBK, boxShadow: `5px 5px 0 ${c}`, padding: '8px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK, transform: `scale(${q})`, transformOrigin: '0 100%', whiteSpace: 'nowrap'}}>🔥 {l}</div>; })}
      <div style={{position: 'absolute', left: 860, top: 640, width: 160, height: 160, borderRadius: 80, background: NBK, border: `6px solid ${NBK}`, transform: `scale(${1 - boom})`, opacity: 1 - boom, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="TriangleAlert" size={80} c={YEL} /></div>
      {boom > 0 && <><div style={{position: 'absolute', left: 940 - 260 * boom, top: 720 - 260 * boom, width: 520 * boom, height: 520 * boom, borderRadius: '50%', background: `radial-gradient(circle, #FFF6C2 0%, #FFB020 35%, ${c} 60%, transparent 72%)`, opacity: 1 - boom * 0.6}} /><Abs x={0} y={1160} w={1080} style={{display: 'flex', justifyContent: 'center'}}><SlamTag at={burn[1]} text="ACCIDENT" c={c} size={60} rot={-4} /></Abs></>}
    </>
  );
};

/* ═════════════ 5. Onde de choc à aberration chromatique (+ secousse) ═════════════ */
const JShock: React.FC<{at: number; cx: number; cy: number}> = ({at, cx, cy}) => {
  const t = useT();
  const k = (t - at) / 1.0;
  if (k < 0 || k > 1) return null;
  const r = 40 + k * 900;
  return (
    <AbsoluteFill style={{pointerEvents: 'none', zIndex: 8}}>
      {[['rgba(255,0,60,0.7)', -8], ['rgba(0,220,255,0.7)', 8], ['rgba(255,255,255,0.9)', 0]].map(([col, dx], i) => <div key={i} style={{position: 'absolute', left: cx - r + (dx as number) * (1 - k), top: cy - r, width: 2 * r, height: 2 * r, borderRadius: '50%', border: `${14 * (1 - k)}px solid ${col}`, opacity: 1 - k}} />)}
      <AbsoluteFill style={{background: '#fff', opacity: Math.max(0, 0.6 - k * 3)}} />
    </AbsoluteFill>
  );
};

/* ═════════════ 6. Arbre qui se ramifie (vers le bas : conséquences ; vers le haut : racines des causes) ═════════════ */
type TN = [string, number];
const JTree: React.FC<{cx: number; y: number; at: number; root: string; kids: TN[]; c: string; up?: boolean; h?: number; spread?: number; kw?: number; fs?: number}> = ({cx, y, at, root, kids, c, up, h = 420, spread = 330, kw = 300, fs = 28}) => {
  const t = useT();
  const n = kids.length;
  const dir = up ? -1 : 1;
  const rootQ = Math.min(1, sp(t, at, 8, 12));
  const ky = y + dir * h;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        {kids.map(([, a], i) => { const kx = cx + (i - (n - 1) / 2) * spread; const p = prog(t, a - 0.3, a + 0.4, easeOut); const d = `M ${cx} ${y} C ${cx} ${y + dir * h * 0.5}, ${kx} ${y + dir * h * 0.4}, ${kx} ${ky}`; return <g key={i}>{up && [0, 1].map((s) => <path key={s} d={`M ${kx} ${ky} q ${(s ? 1 : -1) * 60} ${-60} ${(s ? 1 : -1) * 90} ${-130}`} fill="none" stroke="#7A4A22" strokeWidth={8} strokeLinecap="round" pathLength={1} strokeDasharray={`${prog(t, a + 0.3, a + 0.9)} 1`} />)}<path d={d} fill="none" stroke={up ? '#7A4A22' : c} strokeWidth={up ? 16 * (1 - 0.5 * p) + 6 : 8} strokeLinecap="round" pathLength={1} strokeDasharray={`${p} 1`} />{!up && <polygon points={`${kx - 14},${ky - 24} ${kx + 14},${ky - 24} ${kx},${ky - 4}`} fill={c} opacity={p > 0.95 ? 1 : 0} />}</g>; })}
      </svg>
      <div style={{position: 'absolute', left: cx - 160, top: y - 45, width: 320, height: 90, ...nb(up ? CD : YEL, 7), borderColor: NBK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: up ? '#fff' : NBK, transform: `scale(${rootQ})`, textAlign: 'center', lineHeight: 1.05, zIndex: 3}}>{root}</div>
      {kids.map(([l, a], i) => { const kx = cx + (i - (n - 1) / 2) * spread; const q = t > a ? Math.min(1, sp(t, a + 0.2, 9, 12)) : 0; return <div key={l} style={{position: 'absolute', left: kx - kw / 2, top: ky + (up ? -70 : 0), width: kw, minHeight: 70, ...nb('#fff', 6), borderColor: NBK, boxShadow: `6px 6px 0 ${up ? CD : c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 12px', boxSizing: 'border-box', fontFamily: sansFont, fontWeight: 900, fontSize: fs, color: INK, textAlign: 'center', transform: `scale(${q})`, zIndex: 3}}>{l}</div>; })}
    </>
  );
};

/* ═════════════ 7. Accordéon : chaque méthode citée déplie un nouveau panneau ═════════════ */
const JAccordion: React.FC<{x: number; y: number; w: number; rowH: number; items: [string, string, number][]; c: string}> = ({x, y, w, rowH, items, c}) => {
  const t = useT();
  return (
    <Abs x={x} y={y} w={w} h={items.length * rowH} style={{perspective: 1200}}>
      {items.map(([l, s0, a], i) => { const q = prog(t, a - 0.1, a + 0.45, easeOut); const cur = items.reduce((acc, it, k) => (t >= it[2] - 0.1 ? k : acc), -1) === i; return (
        <div key={l} style={{position: 'absolute', left: 0, top: i * rowH, width: w, height: rowH - 8, transformOrigin: i % 2 ? '50% 0' : '50% 100%', transform: `rotateX(${(1 - q) * (i % 2 ? -90 : 90)}deg)`, opacity: q > 0 ? 1 : 0, ...nb(cur ? c : '#fff', 5), borderColor: NBK, display: 'flex', alignItems: 'center', gap: 16, padding: '0 18px', boxSizing: 'border-box', background: cur ? c : `linear-gradient(${i % 2 ? 180 : 0}deg, #fff, #F2F0EA)`}}>
          <div style={{width: 40, height: 40, borderRadius: 20, background: cur ? '#fff' : c, color: cur ? c : '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{i + 1}</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: cur ? '#fff' : INK, whiteSpace: 'nowrap'}}>{l}</div>
          <div style={{marginLeft: 'auto', fontFamily: sansFont, fontWeight: 800, fontSize: 20, color: cur ? '#fff' : DIM, whiteSpace: 'nowrap'}}>{s0}</div>
        </div>
      ); })}
    </Abs>
  );
};

/* ═════════════ 8. Carrousel orbital des méthodes ═════════════ */
const JRing: React.FC<{cx: number; cy: number; at: number; items: string[]; c: string; R?: number}> = ({cx, cy, at, items, c, R = 340}) => {
  const t = useT();
  const app = Math.min(1, sp(t, at, 7, 12));
  const els = items.map((l, i) => { const th = (i / items.length) * Math.PI * 2 + (t - at) * 0.7; return {l, x: Math.cos(th) * R * app, z: Math.sin(th)}; }).sort((u, v) => u.z - v.z);
  return <>{els.map(({l, x, z}) => { const sc = 0.65 + 0.35 * ((z + 1) / 2); return <div key={l} style={{position: 'absolute', left: cx + x, top: cy + z * 190, transform: `translate(-50%, -50%) scale(${sc})`, ...nb(z > 0.2 ? c : '#fff', 6), borderColor: NBK, padding: '12px 24px', fontFamily: sansFont, fontWeight: 900, fontSize: 42, color: z > 0.2 ? '#fff' : INK, whiteSpace: 'nowrap', opacity: 0.4 + 0.6 * ((z + 1) / 2), zIndex: Math.round(z * 10) + 10}}>{l}</div>; })}</>;
};

/* ═════════════ 9. Papillon qui se transforme en nœud papillon (causes · événement · conséquences) ═════════════ */
const JButterfly: React.FC<{cx: number; cy: number; at: number; morph: number; c: string}> = ({cx, cy, at, morph, c}) => {
  const t = useT();
  const m = prog(t, morph, morph + 0.9, easeInOut);
  const flap = (1 - m) * (0.55 + 0.45 * Math.cos((t - at) * 12));
  const wing: [number, number][] = [[0, 0], [-60, -150], [-200, -190], [-300, -120], [-260, 0], [-300, 120], [-200, 190], [-60, 150]];
  const tri: [number, number][] = [[0, 0], [-90, -50], [-200, -120], [-340, -170], [-340, 0], [-340, 170], [-200, 120], [-90, 50]];
  const pts = (s: number) => wing.map(([wx, wy], i) => { const [tx, ty] = tri[i]; const x = lerp(wx * (0.35 + 0.65 * flap), tx, m), y = lerp(wy, ty, m); return `${cx + s * x},${cy + y}`; }).join(' ');
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <polygon points={pts(1)} fill={hexMix(CI, '#ffffff', 0.15)} stroke={NBK} strokeWidth={6} strokeLinejoin="round" />
        <polygon points={pts(-1)} fill={hexMix(c, '#000000', 0.05)} stroke={NBK} strokeWidth={6} strokeLinejoin="round" />
        {m < 0.5 && <><ellipse cx={cx} cy={cy} rx={16} ry={110} fill={NBK} /><path d={`M ${cx - 6} ${cy - 100} q -30 -60 -60 -70 M ${cx + 6} ${cy - 100} q 30 -60 60 -70`} fill="none" stroke={NBK} strokeWidth={5} /></>}
        {m > 0.5 && <circle cx={cx} cy={cy} r={50 * m} fill={YEL} stroke={NBK} strokeWidth={6} />}
      </svg>
      {m > 0.8 && <><div style={{position: 'absolute', left: cx - 235 - 110, top: cy - 18, width: 220, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff', opacity: pop(t, morph + 0.8)}}>Causes</div><div style={{position: 'absolute', left: cx + 235 - 110, top: cy - 18, width: 220, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', opacity: pop(t, morph + 0.9)}}>Conséquences</div><div style={{position: 'absolute', left: cx - 170, top: cy - 160, width: 340, textAlign: 'center', ...CAP, fontSize: 21, color: NBK, opacity: pop(t, morph + 1.0)}}>Événement redouté</div></>}
    </>
  );
};

/* ═════════════ 10. Mini-AMDE / AMDEC : la colonne « criticité » s'ajoute ═════════════ */
const JAmdec: React.FC<{x: number; y: number; at: number; crit: number}> = ({x, y, at, crit}) => {
  const t = useT();
  const cq = prog(t, crit, crit + 0.5, easeOut);
  const heads = ['Mode', 'Effet'];
  const cols = ['#1E9E5A', '#E8912D', '#E2483B'];
  return (
    <Abs x={x} y={y} w={760} h={320} style={{opacity: pop(t, at)}}>
      {heads.map((h0, j) => <div key={h0} style={{position: 'absolute', left: j * 250, top: 0, width: 240, height: 60, ...nb(NAVY, 4), borderColor: NBK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff'}}>{h0}</div>)}
      {[0, 1, 2].map((r) => heads.map((h0, j) => <div key={`${r}${j}`} style={{position: 'absolute', left: j * 250, top: 70 + r * 80, width: 240, height: 70, ...nb('#fff', 3), borderColor: NBK, opacity: pop(t, at + 0.2 + r * 0.15 + j * 0.05)}}><div style={{margin: '24px 20px', height: 14, borderRadius: 7, background: '#D5DAE2', width: 120 + ((r + j) % 3) * 30}} /></div>))}
      <div style={{position: 'absolute', left: 500 + (1 - cq) * 300, top: 0, width: 240, height: 60, ...nb(CI, 4), borderColor: NBK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff', opacity: cq}}>Criticité</div>
      {[0, 1, 2].map((r) => <div key={`c${r}`} style={{position: 'absolute', left: 500 + (1 - cq) * 300, top: 70 + r * 80, width: 240, height: 70, ...nb(cols[r], 3), borderColor: NBK, opacity: cq * pop(t, crit + 0.3 + r * 0.15), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>{['Faible', 'Moyenne', 'Élevée'][r]}</div>)}
    </Abs>
  );
};

/* ═════════════ 11. Mini-HAZOP : la canalisation, le flux, la vanne qui tourne ═════════════ */
const JHazop: React.FC<{x: number; y: number; at: number; c: string}> = ({x, y, at, c}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  return (
    <Abs x={x} y={y} w={900} h={300} style={{opacity: pop(t, at)}}>
      <svg width={900} height={300}>
        <rect x={20} y={130} width={860} height={60} rx={10} fill="#C9D2DF" stroke={NBK} strokeWidth={6} />
        {Array.from({length: 14}, (_, i) => { const xx = ((k * 220 + i * 70) % 860) + 20; return <circle key={i} cx={xx} cy={160} r={10} fill={c} opacity={0.8} />; })}
        <rect x={420} y={70} width={60} height={60} fill="#8A96A8" stroke={NBK} strokeWidth={5} />
        <g transform={`rotate(${k * 120} 450 60)`}><rect x={390} y={52} width={120} height={16} rx={8} fill={RED} stroke={NBK} strokeWidth={4} /></g>
        <circle cx={450} cy={60} r={12} fill={NBK} />
      </svg>
      {[['Plus de débit', 0.15, 120], ['Moins de pression', 0.4, 600]].map(([l, d, xx]) => <div key={l as string} style={{position: 'absolute', left: xx as number, top: 220, ...nb('#fff', 4), borderColor: NBK, boxShadow: `4px 4px 0 ${c}`, padding: '4px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK, opacity: pop(t, at + (d as number))}}>{l}</div>)}
    </Abs>
  );
};

/* ═════════════ 12. Sablier qui se retourne (la logique s'inverse) ═════════════ */
const JHourglass: React.FC<{cx: number; cy: number; at: number; flip: number}> = ({cx, cy, at, flip}) => {
  const t = useT();
  const f = prog(t, flip, flip + 0.7, easeInOut);
  const sand = 1 - prog(t, at, flip, lin);
  const sand2 = prog(t, flip + 0.7, flip + 4, lin);
  const top = f < 0.5 ? sand : 1 - sand2, bot = f < 0.5 ? 1 - sand : sand2;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <defs><clipPath id="hgTop"><polygon points={`${cx - 110},${cy - 170} ${cx + 110},${cy - 170} ${cx + 12},${cy} ${cx - 12},${cy}`} /></clipPath><clipPath id="hgBot"><polygon points={`${cx - 12},${cy} ${cx + 12},${cy} ${cx + 110},${cy + 170} ${cx - 110},${cy + 170}`} /></clipPath></defs>
      <g transform={`rotate(${f * 180} ${cx} ${cy})`}>
        <rect x={cx - 150} y={cy - 200} width={300} height={30} rx={10} fill="#7A4A22" stroke={NBK} strokeWidth={5} />
        <rect x={cx - 150} y={cy + 170} width={300} height={30} rx={10} fill="#7A4A22" stroke={NBK} strokeWidth={5} />
        <rect x={cx - 110} y={cy - 170 + 170 * (1 - top)} width={220} height={170 * top} fill={f < 0.5 ? CI : CD} clipPath="url(#hgTop)" />
        <rect x={cx - 110} y={cy + 170 - 170 * bot} width={220} height={170 * bot} fill={f < 0.5 ? CI : CD} clipPath="url(#hgBot)" />
        {f === 0 && sand > 0 && <rect x={cx - 3} y={cy} width={6} height={170 * (1 - bot)} fill={CI} />}
        <polygon points={`${cx - 110},${cy - 170} ${cx + 110},${cy - 170} ${cx + 12},${cy} ${cx + 110},${cy + 170} ${cx - 110},${cy + 170} ${cx - 12},${cy}`} fill="rgba(200,230,255,0.25)" stroke={NBK} strokeWidth={6} strokeLinejoin="round" />
      </g>
    </svg>
  );
};

/* ═════════════ 13. Rembobinage VHS : bandes, timecode qui recule, « ◀◀ REW » ═════════════ */
const JRewind: React.FC<{a: number; b: number; children: React.ReactNode}> = ({a, b, children}) => {
  const t = useT();
  if (t < a || t > b) return <>{children}</>;
  const k = (t - a) / (b - a);
  const tc = Math.max(0, 21.6 - k * 21.6);
  const jit = (random(`vh${Math.floor(t * 30)}`) - 0.5) * 18;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{transform: `translateX(${jit}px) skewX(${jit * 0.2}deg)`, filter: 'saturate(0.6) contrast(1.15)'}}>{children}</AbsoluteFill>
      <AbsoluteFill style={{background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.10) 0 2px, transparent 2px 5px)'}} />
      {[0, 1, 2].map((i) => { const y = ((t * 900 + i * 520) % 1500) + 380; return <div key={i} style={{position: 'absolute', left: 0, top: y, width: 1080, height: 26 + i * 8, background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(2px)', transform: `translateX(${(random(`vb${i}${Math.floor(t * 15)}`) - 0.5) * 60}px)`}} />; })}
      <div style={{position: 'absolute', left: 70, top: 470, fontFamily: MONO, fontWeight: 700, fontSize: 52, color: '#fff', textShadow: '3px 3px 0 #000, 0 0 12px rgba(0,255,200,0.6)'}}>◀◀ REW</div>
      <div style={{position: 'absolute', right: 70, top: 470, fontFamily: MONO, fontWeight: 700, fontSize: 44, color: '#fff', textShadow: '3px 3px 0 #000'}}>{`00:${String(Math.floor(tc)).padStart(2, '0')}:${String(Math.floor((tc % 1) * 30)).padStart(2, '0')}`}</div>
    </AbsoluteFill>
  );
};

/* ═════════════ 14. Flèche élastique qui se retourne : C → E devient E → C ═════════════ */
const JFlipArrow: React.FC<{y: number; at: number; flip: number}> = ({y, at, flip}) => {
  const t = useT();
  const q = Math.min(1, sp(t, at, 8, 12));
  const f = t < flip ? 0 : Math.min(1.12, sp(t, flip, 7, 9));
  const stretch = 1 + Math.sin(Math.min(1, prog(t, flip, flip + 0.5)) * Math.PI) * 0.25;
  const card = (l: string, c: string, sub: string): React.ReactNode => <div style={{width: 280, height: 200, ...nb('#fff', 7), borderColor: NBK, boxShadow: `7px 7px 0 ${c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 54, color: c}}>{l}</div><div style={{...CAP, fontSize: 18, color: DIM}}>{sub}</div></div>;
  const flipped = f > 0.5;
  return (
    <Abs x={0} y={y} w={1080} h={260} style={{transform: `scale(${q})`}}>
      <div style={{position: 'absolute', left: 60, top: 20, transition: 'none', transform: `translateX(${lerp(0, 680, cl(f))}px)`}}>{card('Causes', CI, 'origine')}</div>
      <div style={{position: 'absolute', left: 740, top: 20, transform: `translateX(${lerp(0, -680, cl(f))}px)`}}>{card('Effets', CD, 'résultat')}</div>
      <svg width={1080} height={260} style={{position: 'absolute', left: 0, top: 0}}>
        <g transform={`translate(540 120) scale(${stretch * Math.max(0.08, Math.abs(Math.cos(cl(f) * Math.PI)))} 1)`}>
          <rect x={-150} y={-16} width={250} height={32} rx={10} fill={flipped ? CD : CI} stroke={NBK} strokeWidth={5} />
          <polygon points="90,-46 160,0 90,46" fill={flipped ? CD : CI} stroke={NBK} strokeWidth={5} strokeLinejoin="round" />
        </g>
      </svg>
    </Abs>
  );
};

/* ═════════════ 15. Tableau d'enquête : punaises et fils rouges vers l'accident ═════════════ */
const JBoard: React.FC<{x: number; y: number; w: number; h: number; at: number; center: [string, string, number]; pins: [string, number, number, number][]}> = ({x, y, w, h, at, center, pins}) => {
  const t = useT();
  const cx = w / 2, cy = h / 2 + 10;
  const cq = Math.min(1, sp(t, center[2], 8, 12));
  return (
    <Abs x={x} y={y} w={w} h={h} style={{opacity: pop(t, at), background: '#B58A5A', border: `10px solid #6E4A26`, borderRadius: 14, boxShadow: '0 20px 40px rgba(0,0,0,0.25)', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(0,0,0,0.12) 1.5px, transparent 1.5px)', backgroundSize: '9px 9px'}} />
      <svg width={w} height={h} style={{position: 'absolute', left: 0, top: 0, zIndex: 2}}>
        {pins.map(([l, px, py, a]) => { const p = prog(t, a + 0.15, a + 0.6, easeOut); const sag = 40; return <path key={l} d={`M ${px} ${py} Q ${(px + cx) / 2} ${(py + cy) / 2 + sag} ${cx} ${cy - 145}`} fill="none" stroke="#D3202E" strokeWidth={5} pathLength={1} strokeDasharray={`${p} 1`} />; })}
      </svg>
      <div style={{position: 'absolute', left: cx - 210, top: cy - 165, width: 420, height: 340, background: '#fff', padding: 14, boxSizing: 'border-box', transform: `rotate(-3deg) scale(${cq})`, boxShadow: '6px 8px 0 rgba(0,0,0,0.3)', zIndex: 1}}>
        <Img src={PH(center[1])} style={{width: '100%', height: 250, objectFit: 'cover'}} />
        <div style={{fontFamily: handFont, fontSize: 40, color: '#D3202E', textAlign: 'center', marginTop: 2}}>{center[0]}</div>
      </div>
      <div style={{position: 'absolute', left: cx - 14, top: cy - 158, width: 28, height: 28, borderRadius: 14, background: '#D3202E', border: '3px solid #7A0D14', zIndex: 3, transform: `scale(${cq})`}} />
      {pins.map(([l, px, py, a], i) => { const q = t > a ? Math.min(1, sp(t, a, 9, 11)) : 0; return <div key={l} style={{position: 'absolute', left: px - 125, top: py - 10, width: 250, minHeight: 90, background: i % 2 ? '#FFF3A8' : '#FFE0E0', padding: '24px 12px 10px', boxSizing: 'border-box', transform: `rotate(${i % 2 ? 4 : -4}deg) scale(${q})`, boxShadow: '4px 6px 0 rgba(0,0,0,0.25)', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK, textAlign: 'center', zIndex: 3}}><div style={{position: 'absolute', left: 111, top: -4, width: 28, height: 28, borderRadius: 14, background: '#D3202E', border: '3px solid #7A0D14'}} />{l}</div>; })}
    </Abs>
  );
};

/* ═════════════ 16. Pelote qui se dévide : on remonte le fil jusqu'aux causes ═════════════ */
const JYarn: React.FC<{y: number; at: number; dur: number; stops: [string, number][]}> = ({y, at, dur, stops}) => {
  const t = useT();
  const p = prog(t, at, at + dur, easeInOut);
  const bx = lerp(900, 880, p), r = 90 * (1 - 0.45 * p);
  const N = 60;
  const pts = Array.from({length: N + 1}, (_, i) => { const u = i / N; const xx = bx - u * 800 * p; const yy = y + Math.sin(u * 9 + t * 2) * 26 * (1 - u * 0.3); return `${xx.toFixed(1)},${yy.toFixed(1)}`; });
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at - 0.3)}}>
        {p > 0 && <polyline points={pts.join(' ')} fill="none" stroke="#D3202E" strokeWidth={8} strokeLinecap="round" />}
        <g transform={`rotate(${-p * 900} ${bx} ${y})`}>
          <circle cx={bx} cy={y} r={r} fill="#E2483B" stroke={NBK} strokeWidth={6} />
          {[0, 1, 2, 3, 4].map((i) => <ellipse key={i} cx={bx} cy={y} rx={r * 0.95} ry={r * (0.25 + i * 0.15)} fill="none" stroke="#9E1F1F" strokeWidth={4} transform={`rotate(${i * 36} ${bx} ${y})`} />)}
        </g>
      </svg>
      <div style={{position: 'absolute', left: bx - 110, top: y + r + 16, width: 220, textAlign: 'center', ...CAP, fontSize: 22, color: NBK, opacity: pop(t, at)}}>Accident</div>
      {stops.map(([l, a], i) => { const q = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0; const xx = 820 - (i + 1) * (640 / stops.length); return <div key={l} style={{position: 'absolute', left: xx - 140, top: y - 170, width: 280, ...nb('#fff', 6), borderColor: NBK, boxShadow: `6px 6px 0 ${CD}`, padding: '14px 10px', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK, textAlign: 'center', transform: `translateY(${(1 - q) * 60}px) scale(${q})`}}>{l}</div>; })}
    </>
  );
};

/* ═════════════ 17. Empreinte digitale révélée à la loupe ═════════════ */
const JPrint: React.FC<{cx: number; cy: number; at: number; c: string}> = ({cx, cy, at, c}) => {
  const t = useT();
  const p = prog(t, at, at + 1.2, easeInOut);
  const lx = cx - 180 + p * 360;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at - 0.2)}}>
      <defs><clipPath id="fpc"><circle cx={lx} cy={cy} r={110} /></clipPath><clipPath id="fpr"><rect x={cx - 140} y={cy - 170} width={(lx - cx + 140)} height={340} /></clipPath></defs>
      <g clipPath="url(#fpr)">{Array.from({length: 11}, (_, i) => <ellipse key={i} cx={cx} cy={cy + 10} rx={20 + i * 11} ry={30 + i * 13} fill="none" stroke={c} strokeWidth={5} strokeDasharray={i % 3 === 1 ? '40 10' : undefined} opacity={0.85} />)}</g>
      <g clipPath="url(#fpc)"><circle cx={lx} cy={cy} r={110} fill="rgba(255,255,255,0.35)" />{Array.from({length: 11}, (_, i) => <ellipse key={i} cx={cx} cy={cy + 10} rx={20 + i * 11} ry={30 + i * 13} fill="none" stroke={NBK} strokeWidth={6} />)}</g>
      <circle cx={lx} cy={cy} r={110} fill="none" stroke={NBK} strokeWidth={12} />
      <line x1={lx + 78} y1={cy + 78} x2={lx + 170} y2={cy + 170} stroke={NBK} strokeWidth={26} strokeLinecap="round" />
    </svg>
  );
};

/* ═════════════ 18. Arbre de défaillances : portes logiques ET / OU qui s'allument ═════════════ */
const Gate2: React.FC<{x: number; y: number; kind: 'ET' | 'OU'; on: number; c: string}> = ({x, y, kind, on, c}) => (
  <g transform={`translate(${x} ${y})`} opacity={on}>
    {kind === 'ET' ? <path d="M -40 40 V 0 A 40 40 0 0 1 40 0 V 40 Z" fill="#fff" stroke={c} strokeWidth={6} /> : <path d="M -42 40 Q 0 20 42 40 Q 36 -10 0 -40 Q -36 -10 -42 40 Z" fill="#fff" stroke={c} strokeWidth={6} />}
    <text x={0} y={30} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={22} fill={c}>{kind}</text>
  </g>
);
const JFault: React.FC<{x: number; y: number; at: number; c: string}> = ({x, y, at, c}) => {
  const t = useT();
  const on = (d: number) => prog(t, at + d, at + d + 0.35, easeOut);
  const ln = (x1: number, y1: number, x2: number, y2: number, d: number) => <path d={`M ${x1} ${y1} V ${(y1 + y2) / 2} H ${x2} V ${y2}`} fill="none" stroke={NBK} strokeWidth={4} pathLength={1} strokeDasharray={`${on(d)} 1`} />;
  return (
    <svg width={460} height={520} style={{position: 'absolute', left: x, top: y}}>
      <rect x={110} y={10} width={240} height={70} rx={12} fill={c} stroke={NBK} strokeWidth={5} opacity={on(0)} />
      <text x={230} y={54} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={24} fill="#fff" opacity={on(0)}>Événement redouté</text>
      {ln(230, 80, 230, 120, 0.2)}
      <Gate2 x={230} y={150} kind="OU" on={on(0.3)} c={c} />
      {ln(230, 190, 110, 250, 0.5)}{ln(230, 190, 350, 250, 0.55)}
      <Gate2 x={110} y={280} kind="ET" on={on(0.7)} c={c} />
      <circle cx={350} cy={290} r={36} fill="#FFF3A8" stroke={NBK} strokeWidth={5} opacity={on(0.75)} />
      {ln(110, 320, 50, 390, 0.9)}{ln(110, 320, 170, 390, 0.95)}
      <circle cx={50} cy={420} r={32} fill="#FFF3A8" stroke={NBK} strokeWidth={5} opacity={on(1.1)} />
      <circle cx={170} cy={420} r={32} fill="#FFF3A8" stroke={NBK} strokeWidth={5} opacity={on(1.15)} />
      <text x={230} y={500} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={18} fill={DIM} opacity={on(1.3)}>ÉVÉNEMENTS DE BASE</text>
    </svg>
  );
};

/* ═════════════ 19. Engrenages réversibles : l'un tourne C → E, l'autre E → C ═════════════ */
const gearPath = (r: number, teeth: number) => { const pts: string[] = []; for (let i = 0; i < teeth * 2; i++) { const a = (i / (teeth * 2)) * Math.PI * 2; const rr = i % 2 ? r : r + 22; const a2 = a + Math.PI / (teeth * 2); pts.push(`${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)}`, `${(Math.cos(a2) * rr).toFixed(1)},${(Math.sin(a2) * rr).toFixed(1)}`); } return `M ${pts.join(' L ')} Z`; };
const JGears: React.FC<{y: number; a: number; b: number}> = ({y, a, b}) => {
  const t = useT();
  const sa = Math.max(0, t - a), sb = Math.max(0, t - b);
  const g = (cx: number, r: number, teeth: number, ang: number, c: string, on: number, l: string, sub: string) => (
    <g opacity={0.35 + 0.65 * on}>
      <g transform={`translate(${cx} ${y}) rotate(${ang})`}><path d={gearPath(r, teeth)} fill={c} stroke={NBK} strokeWidth={6} strokeLinejoin="round" /><circle r={r * 0.42} fill="#fff" stroke={NBK} strokeWidth={6} /></g>
      <text x={cx} y={y + 8} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={34} fill={c}>{sub}</text>
      <text x={cx} y={y + r + 80} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={40} fill={NBK}>{l}</text>
    </g>
  );
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, a - 0.2)}}>
      {g(330, 170, 12, sa * 50 - sb * 0, CI, 1, 'Inductives', 'C → E')}
      {g(330 + 170 + 22 + 150 - 4, 150, 10, -sa * 50 * (170 / 150) + 9, CD, prog(t, b, b + 0.4), 'Déductives', 'E → C')}
    </svg>
  );
};

/* ═════════════ 20. Yin-yang complémentaire qui tourne ═════════════ */
const JYinYang: React.FC<{cx: number; cy: number; R: number; at: number}> = ({cx, cy, R, at}) => {
  const t = useT();
  const q = Math.min(1, sp(t, at, 7, 12));
  const ang = Math.max(0, t - at) * 60;
  const h = R / 2;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
      <g transform={`translate(${cx} ${cy}) scale(${q}) rotate(${ang})`}>
        <circle r={R + 10} fill={NBK} />
        <path d={`M 0 ${-R} A ${R} ${R} 0 0 1 0 ${R} A ${h} ${h} 0 0 1 0 0 A ${h} ${h} 0 0 0 0 ${-R} Z`} fill={CD} />
        <path d={`M 0 ${-R} A ${R} ${R} 0 0 0 0 ${R} A ${h} ${h} 0 0 1 0 0 A ${h} ${h} 0 0 0 0 ${-R} Z`} fill={CI} />
        <circle cy={-h} r={R * 0.14} fill={CD} stroke={NBK} strokeWidth={4} />
        <circle cy={h} r={R * 0.14} fill={CI} stroke={NBK} strokeWidth={4} />
      </g>
      <g opacity={pop(t, at + 0.6)}>
        <text x={cx - R - 30} y={cy + 10} textAnchor="end" fontFamily={sansFont} fontWeight={900} fontSize={34} fill={CI}>Inductives</text>
        <text x={cx + R + 30} y={cy + 10} textAnchor="start" fontFamily={sansFont} fontWeight={900} fontSize={34} fill={CD}>Déductives</text>
      </g>
    </svg>
  );
};

/* ═════════════ 21. Écran cathodique qui s'éteint (fin de démonstration) ═════════════ */
const JCrtOff: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  const k = (t - at) / 0.55;
  if (k < 0 || k > 1.25) return null;
  const sy = k < 0.55 ? 1 - (k / 0.55) * 0.995 : 0.005;
  const sx = k < 0.55 ? 1 : Math.max(0, 1 - (k - 0.55) / 0.45);
  return (
    <AbsoluteFill style={{zIndex: 79, pointerEvents: 'none'}}>
      <AbsoluteFill style={{background: '#000', opacity: Math.min(1, k * 1.6) * 0.92}} />
      <div style={{position: 'absolute', left: 540 - 540 * sx, top: 960 - 960 * sy, width: 1080 * sx, height: Math.max(4, 1920 * sy), background: '#fff', boxShadow: '0 0 40px #fff, 0 0 90px #9DE7FF', opacity: k < 1 ? 1 : 1 - (k - 1) * 4, borderRadius: k > 0.55 ? 4 : 0}} />
    </AbsoluteFill>
  );
};

/* ═════════════ 22. Constellation de sigles (couverture) ═════════════ */
const CONST: [string, number, number, string][] = [['APR', 170, 470, CI], ['AMDE', 410, 400, CI], ['AMDEC', 690, 450, CI], ['HAZOP', 900, 560, CI], ['Nœud papillon', 260, 640, CI], ['MADS-MOSAR', 780, 700, CI], ['Arbre des causes', 300, 820, CD], ['Arbre de défaillances', 720, 860, CD]];
const JConstellation: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  const links: [number, number][] = [[0, 1], [1, 2], [2, 3], [0, 4], [4, 1], [2, 5], [3, 5], [4, 6], [6, 7], [5, 7]];
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        {links.map(([u, v], i) => { const p = prog(t, at + 0.15 + i * 0.06, at + 0.5 + i * 0.06, easeOut); const [, x1, y1] = CONST[u]; const [, x2, y2] = CONST[v]; return <line key={i} x1={x1} y1={y1} x2={lerp(x1, x2, p)} y2={lerp(y1, y2, p)} stroke={NAVY} strokeWidth={3} strokeDasharray="4 8" opacity={0.7} />; })}
      </svg>
      {CONST.map(([l, x, y, c], i) => { const q = Math.min(1, sp(t, at + i * 0.07, 9, 12)); const tw = 0.85 + 0.15 * Math.sin(t * 5 + i * 1.7); return <div key={l} style={{position: 'absolute', left: x, top: y, transform: `translate(-50%, -50%) scale(${q})`, display: 'flex', alignItems: 'center', gap: 10}}><div style={{width: 22, height: 22, borderRadius: 11, background: c, boxShadow: `0 0 ${18 * tw}px ${c}`, border: '3px solid #fff'}} /><div style={{...nb('#fff', 4), borderColor: NBK, padding: '4px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: c, whiteSpace: 'nowrap'}}>{l}</div></div>; })}
    </>
  );
};

/* ═════════════ Palette de l'évacuation ═════════════ */
const CG = '#1E9E5A', CR = '#E2483B', CY = '#F5C400', CO = '#F08A24';
Object.assign(LUC, {ArrowRight});

/* Pictogramme « sortie de secours » (silhouette qui court + porte), dessiné en SVG */
const ExitRunner: React.FC<{size: number; ph?: number; c?: string; bg?: string}> = ({size, ph = 0, c = '#fff', bg = CG}) => {
  const a = Math.sin(ph * 10) * 22;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <rect x={2} y={2} width={96} height={96} rx={10} fill={bg} />
      <rect x={62} y={18} width={28} height={64} fill="none" stroke={c} strokeWidth={5} />
      <circle cx={42} cy={22} r={7} fill={c} />
      <line x1={40} y1={32} x2={34} y2={56} stroke={c} strokeWidth={8} strokeLinecap="round" />
      <line x1={38} y1={38} x2={38 + 14 * Math.cos(((-30 + a) * Math.PI) / 180)} y2={38 + 14 * Math.sin(((-30 + a) * Math.PI) / 180) + 6} stroke={c} strokeWidth={6} strokeLinecap="round" />
      <line x1={38} y1={38} x2={38 - 14 * Math.cos(((30 - a) * Math.PI) / 180)} y2={38 + 14 * Math.sin(((30 - a) * Math.PI) / 180)} stroke={c} strokeWidth={6} strokeLinecap="round" />
      <line x1={34} y1={56} x2={34 + 16 * Math.sin(((40 + a) * Math.PI) / 180)} y2={56 + 16 * Math.cos(((40 + a) * Math.PI) / 180)} stroke={c} strokeWidth={7} strokeLinecap="round" />
      <line x1={34} y1={56} x2={34 - 16 * Math.sin(((40 - a) * Math.PI) / 180)} y2={56 + 16 * Math.cos(((40 - a) * Math.PI) / 180)} stroke={c} strokeWidth={7} strokeLinecap="round" />
    </svg>
  );
};
/* Pictogramme « point de rassemblement » (quatre flèches vers un groupe) */
const AssemblyIcon: React.FC<{size: number; k?: number; bg?: string}> = ({size, k = 0, bg = CG}) => {
  const d = 4 * Math.sin(k * 6);
  const arrow = (r: number) => <g transform={`rotate(${r} 50 50)`}><polygon points={`50,${6 + d} 40,${18 + d} 46,${18 + d} 46,${26 + d} 54,${26 + d} 54,${18 + d} 60,${18 + d}`} fill="#fff" /></g>;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <rect x={2} y={2} width={96} height={96} rx={10} fill={bg} />
      {[0, 90, 180, 270].map((r) => <g key={r}>{arrow(r + 180)}</g>)}
      {[[40, 44], [60, 44], [50, 56]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y - 8} r={4.5} fill="#fff" /><rect x={x - 5} y={y - 3} width={10} height={14} rx={4} fill="#fff" /></g>)}
    </svg>
  );
};

/* ═════════════ 1. Sirène : ondes sonores qui pulsent + stroboscope rouge sur les bords ═════════════ */
const ESiren: React.FC<{cx: number; cy: number; at: number; until?: number}> = ({cx, cy, at, until = 1e9}) => {
  const t = useT();
  const on = t >= at && t < until;
  const k = Math.max(0, t - at);
  const strobe = on ? (Math.floor(k * 4) % 2 === 0 ? 1 : 0.15) : 0;
  return (
    <>
      {on && <AbsoluteFill style={{pointerEvents: 'none', boxShadow: `inset 0 0 ${120 + 60 * strobe}px rgba(226,72,59,${0.55 * strobe})`, zIndex: 6}} />}
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        {[0, 1, 2, 3].map((i) => { const r = ((k * 1.4 + i / 4) % 1); return <g key={i} opacity={(1 - r) * (on ? 1 : 0)}>{[-1, 1].map((sd) => <path key={sd} d={`M ${cx + sd * (90 + r * 230)} ${cy - 70 - r * 160} Q ${cx + sd * (130 + r * 300)} ${cy} ${cx + sd * (90 + r * 230)} ${cy + 70 + r * 160}`} fill="none" stroke={i % 2 ? CO : CR} strokeWidth={16 - r * 8} strokeLinecap="round" />)}</g>; })}
        <rect x={cx - 70} y={cy - 70} width={140} height={140} rx={30} fill="#C9D2DF" stroke={NBK} strokeWidth={7} />
        <circle cx={cx} cy={cy} r={48} fill={`rgba(226,72,59,${0.4 + 0.6 * strobe})`} stroke={NBK} strokeWidth={6} style={{filter: `drop-shadow(0 0 ${30 * strobe}px ${CR})`}} />
        {Array.from({length: 8}, (_, i) => <line key={i} x1={cx - 36 + i * 10} y1={cy - 28} x2={cx - 36 + i * 10} y2={cy + 28} stroke={NBK} strokeWidth={3} opacity={0.35} />)}
      </svg>
    </>
  );
};

/* ═════════════ 2. Boussole : l'aiguille s'affole puis pointe la sortie ═════════════ */
const ECompass: React.FC<{cx: number; cy: number; at: number; lock: number; R?: number}> = ({cx, cy, at, lock, R = 210}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const wild = Math.sin(k * 7) * 140 + Math.sin(k * 13) * 60 + k * 300;
  const L = prog(t, lock, lock + 0.8, easeOut);
  const ang = lerp(wild, 45 + Math.sin(Math.max(0, t - lock - 0.8) * 9) * 6 * Math.exp(-Math.max(0, t - lock - 0.8) * 3), L);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <circle cx={cx} cy={cy} r={R + 24} fill="#7A4A22" stroke={NBK} strokeWidth={8} />
      <circle cx={cx} cy={cy} r={R} fill="#FBF7EE" stroke={NBK} strokeWidth={5} />
      {Array.from({length: 36}, (_, i) => { const a = (i / 36) * Math.PI * 2; const r1 = i % 9 === 0 ? R - 40 : R - 20; return <line key={i} x1={cx + Math.cos(a) * r1} y1={cy + Math.sin(a) * r1} x2={cx + Math.cos(a) * (R - 6)} y2={cy + Math.sin(a) * (R - 6)} stroke={NBK} strokeWidth={i % 9 === 0 ? 5 : 2} />; })}
      {[['N', 0], ['E', 90], ['S', 180], ['O', 270]].map(([l, a]) => <text key={l as string} x={cx + Math.sin(((a as number) * Math.PI) / 180) * (R - 70)} y={cy - Math.cos(((a as number) * Math.PI) / 180) * (R - 70) + 14} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={38} fill={NBK}>{l}</text>)}
      <g transform={`rotate(${ang} ${cx} ${cy})`}><polygon points={`${cx},${cy - R + 50} ${cx + 22},${cy} ${cx},${cy + R - 50} ${cx - 22},${cy}`} fill="#fff" stroke={NBK} strokeWidth={4} /><polygon points={`${cx},${cy - R + 50} ${cx + 22},${cy} ${cx - 22},${cy}`} fill={CG} stroke={NBK} strokeWidth={4} /></g>
      <circle cx={cx} cy={cy} r={16} fill={CY} stroke={NBK} strokeWidth={5} />
      {L > 0.9 && <g transform={`translate(${cx + Math.sin(Math.PI / 4) * (R + 70) - 60} ${cy - Math.cos(Math.PI / 4) * (R + 70) - 60}) scale(${Math.min(1, sp(t, lock + 0.7, 9, 12))})`}><foreignObject width={120} height={120}><ExitRunner size={120} ph={t} /></foreignObject></g>}
    </svg>
  );
};

/* ═════════════ 3. Néon « sortie » qui grésille avant de s'allumer, puis le pictogramme sort du panneau et court ═════════════ */
const ENeonExit: React.FC<{x: number; y: number; at: number; run: number; w?: number}> = ({x, y, at, run, w = 520}) => {
  const t = useT();
  const k = t - at;
  const flick = k < 0 ? 0 : k < 0.9 ? (random(`nx${Math.floor(t * 24)}`) > 0.45 ? 1 : 0.15) : 1;
  const rp = prog(t, run, run + 1.4, easeInOut);
  const h = w * 0.42;
  return (
    <>
      <Abs x={x} y={y} w={w} h={h} style={{background: flick > 0.5 ? CG : '#2B4A3A', border: `8px solid ${NBK}`, borderRadius: 18, boxShadow: flick > 0.5 ? `0 0 60px ${CG}, 0 0 120px rgba(30,158,90,0.6)` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24}}>
        <div style={{opacity: 1 - rp}}><ExitRunner size={h - 40} ph={t} bg="transparent" /></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: h * 0.32, color: flick > 0.5 ? '#fff' : '#6E8F7E', letterSpacing: 4}}>SORTIE</div>
      </Abs>
      {rp > 0 && rp < 1 && <div style={{position: 'absolute', left: x + 20 + rp * 900 - 200, top: y + 20 - Math.sin(rp * Math.PI) * 120, transform: `scale(${1 + Math.sin(rp * Math.PI) * 0.6})`}}><ExitRunner size={h - 40} ph={t * 1.6} bg="transparent" c={CG} /></div>}
    </>
  );
};

/* ═════════════ 4. Plan d'évacuation vu du dessus : « vous êtes ici », foule de points qui suit le chemin jusqu'au rassemblement ═════════════ */
const ROUTE: [number, number][] = [[140, 160], [140, 420], [420, 420], [420, 620], [760, 620], [760, 780], [900, 780]];
const routeAt = (u: number): [number, number] => { const seg = ROUTE.length - 1; const L = ROUTE.slice(1).map((p, i) => Math.hypot(p[0] - ROUTE[i][0], p[1] - ROUTE[i][1])); const tot = L.reduce((a, b) => a + b, 0); let d = Math.max(0, Math.min(1, u)) * tot; for (let i = 0; i < seg; i++) { if (d <= L[i]) { const f = d / L[i]; return [lerp(ROUTE[i][0], ROUTE[i + 1][0], f), lerp(ROUTE[i][1], ROUTE[i + 1][1], f)]; } d -= L[i]; } return ROUTE[seg]; };
const EFloorPlan: React.FC<{x: number; y: number; at: number; pin: number; flow: number; scale?: number}> = ({x, y, at, pin, flow, scale = 1}) => {
  const t = useT();
  const draw = prog(t, at, at + 1.2, easeOut);
  const path = prog(t, flow, flow + 1.4, easeInOut);
  const pq = t > pin ? Math.min(1, sp(t, pin, 9, 10)) : 0;
  const pts = ROUTE.map((p) => p.join(',')).join(' ');
  return (
    <Abs x={x} y={y} w={960} h={900} style={{transform: `scale(${scale})`, transformOrigin: '0 0', opacity: pop(t, at)}}>
      <svg width={960} height={900}>
        <rect x={10} y={10} width={940} height={880} rx={16} fill="#FBF7EE" stroke={NBK} strokeWidth={6} />
        {[[40, 40, 260, 320], [300, 40, 300, 320], [640, 40, 280, 520], [40, 480, 300, 380], [480, 680, 200, 180]].map(([rx, ry, rw, rh], i) => <rect key={i} x={rx} y={ry} width={rw} height={rh} fill="#fff" stroke="#3A4250" strokeWidth={5} pathLength={1} strokeDasharray={`${draw} 1`} />)}
        {[[230, 360], [560, 360], [640, 300], [340, 640]].map(([dx, dy], i) => <path key={i} d={`M ${dx} ${dy} a 40 40 0 0 1 40 -40`} fill="none" stroke="#8A96A8" strokeWidth={3} opacity={draw} />)}
        <polyline points={pts} fill="none" stroke={CG} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${path} 1`} opacity={0.35} />
        <polyline points={pts} fill="none" stroke={CG} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="18 16" strokeDashoffset={-t * 60} opacity={path} />
        {path > 0 && Array.from({length: 14}, (_, i) => { const u = ((t - flow) * 0.28 - i * 0.045); if (u < 0 || u > 1) return null; const [px, py] = routeAt(u); return <circle key={i} cx={px + (i % 3 - 1) * 8} cy={py + ((i + 1) % 3 - 1) * 8} r={10} fill={i % 4 === 0 ? CY : NAVY} stroke="#fff" strokeWidth={2} />; })}
        <g transform="translate(900 780)" opacity={draw}><circle r={46} fill={CG} stroke={NBK} strokeWidth={5} /><foreignObject x={-34} y={-34} width={68} height={68}><AssemblyIcon size={68} k={t} /></foreignObject></g>
        <g transform={`translate(140 ${160 - (1 - pq) * 200})`} opacity={pq}>
          {[0, 1].map((i) => { const r = (((t - pin) * 1.2 + i / 2) % 1); return <circle key={i} r={20 + r * 70} fill="none" stroke={CR} strokeWidth={4} opacity={(1 - r) * pq} />; })}
          <path d="M 0 0 C -30 -40 -30 -80 0 -80 C 30 -80 30 -40 0 0 Z" fill={CR} stroke={NBK} strokeWidth={4} /><circle cy={-56} r={10} fill="#fff" />
        </g>
      </svg>
      <div style={{position: 'absolute', left: 170, top: 60, ...nb('#fff', 4), borderColor: NBK, padding: '4px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: CR, transform: `scale(${pq})`, transformOrigin: '0 50%'}}>Vous êtes ici</div>
    </Abs>
  );
};

/* ═════════════ 5. Balisage lumineux au sol : coupure de courant, les bandes s'allument vers la sortie ═════════════ */
const EBlackout: React.FC<{a: number; b: number}> = ({a, b}) => {
  const t = useT();
  if (t < a || t > b) return null;
  const dark = prog(t, a, a + 0.25) * (1 - prog(t, b - 0.35, b));
  return (
    <AbsoluteFill style={{zIndex: 7, pointerEvents: 'none', opacity: dark}}>
      <AbsoluteFill style={{background: 'rgba(8,12,20,0.88)'}} />
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        {Array.from({length: 12}, (_, i) => { const on = prog(t, a + 0.35 + i * 0.09, a + 0.5 + i * 0.09); const yy = 1460 - i * 80; const sc = 1 - i * 0.055; return <g key={i} opacity={on}><rect x={540 - 330 * sc} y={yy} width={80 * sc} height={16 * sc} rx={6} fill="#7CFFB0" style={{filter: 'drop-shadow(0 0 10px #39FF8E)'}} /><rect x={540 + 250 * sc} y={yy} width={80 * sc} height={16 * sc} rx={6} fill="#7CFFB0" style={{filter: 'drop-shadow(0 0 10px #39FF8E)'}} /></g>; })}
      </svg>
      <div style={{position: 'absolute', left: 390, top: 450, opacity: prog(t, a + 1.3, a + 1.6), filter: 'drop-shadow(0 0 30px #39FF8E)'}}><ExitRunner size={300} ph={t} /></div>
    </AbsoluteFill>
  );
};

/* ═════════════ 6. Gilets qui tombent du ciel et tournent sur eux-mêmes ═════════════ */
const Vest: React.FC<{c: string; label: string; w?: number}> = ({c, label, w = 260}) => (
  <svg width={w} height={w * 1.1} viewBox="0 0 100 110">
    <path d="M 30 6 L 42 6 Q 50 22 58 6 L 70 6 L 92 26 L 84 46 L 78 40 L 78 104 L 22 104 L 22 40 L 16 46 L 8 26 Z" fill={c} stroke={NBK} strokeWidth={3} strokeLinejoin="round" />
    <rect x={22} y={62} width={56} height={8} fill="#E6E9EE" stroke={NBK} strokeWidth={1.5} /><rect x={22} y={80} width={56} height={8} fill="#E6E9EE" stroke={NBK} strokeWidth={1.5} />
    <line x1={50} y1={22} x2={50} y2={104} stroke={NBK} strokeWidth={1.5} />
    <rect x={18} y={42} width={64} height={15} rx={3} fill="#fff" stroke={NBK} strokeWidth={1.5} />
    <text x={50} y={53} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={8} fill={NBK} textLength={label.length > 6 ? 58 : undefined} lengthAdjust="spacingAndGlyphs">{label}</text>
  </svg>
);
const EVestDrop: React.FC<{x: number; y: number; at: number; c: string; label: string; w?: number}> = ({x, y, at, c, label, w = 260}) => {
  const t = useT();
  const k = t - at;
  if (k < 0) return null;
  const fall = Math.min(1, sp(t, at, 7, 9));
  const spin = Math.max(0, 1 - k / 1.2) * 720;
  return <div style={{position: 'absolute', left: x, top: y - (1 - fall) * 900, transform: `perspective(900px) rotateY(${spin}deg) rotate(${(1 - fall) * 25}deg)`, filter: 'drop-shadow(10px 14px 0 rgba(0,0,0,0.18))'}}><Vest c={c} label={label} w={w} /></div>;
};

/* ═════════════ 7. File indienne : le guide en tête, le serre-file en queue ═════════════ */
const Walker: React.FC<{c: string; ph: number; vest?: string; s?: number}> = ({c, ph, vest, s = 1}) => {
  const a = Math.sin(ph) * 26;
  return (
    <svg width={60 * s} height={120 * s} viewBox="0 0 60 120">
      <circle cx={30} cy={14} r={11} fill="#6B4A2E" />
      <rect x={18} y={28} width={24} height={44} rx={10} fill={vest ?? c} stroke={NBK} strokeWidth={2.5} />
      <line x1={24} y1={70} x2={24 + Math.sin((a * Math.PI) / 180) * 22} y2={70 + Math.cos((a * Math.PI) / 180) * 40} stroke="#2B3038" strokeWidth={8} strokeLinecap="round" />
      <line x1={36} y1={70} x2={36 - Math.sin((a * Math.PI) / 180) * 22} y2={70 + Math.cos((a * Math.PI) / 180) * 40} stroke="#2B3038" strokeWidth={8} strokeLinecap="round" />
      <line x1={20} y1={36} x2={20 - Math.sin((a * Math.PI) / 180) * 14} y2={64} stroke={vest ?? c} strokeWidth={7} strokeLinecap="round" />
      <line x1={40} y1={36} x2={40 + Math.sin((a * Math.PI) / 180) * 14} y2={64} stroke={vest ?? c} strokeWidth={7} strokeLinecap="round" />
    </svg>
  );
};
const EQueue: React.FC<{y: number; at: number; n?: number; guideAt?: number; closeAt?: number}> = ({y, at, n = 8, guideAt = 0, closeAt = 0}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const off = (k * 120) % 110;
  return (
    <Abs x={0} y={y} w={1080} h={260} style={{opacity: pop(t, at)}}>
      <div style={{position: 'absolute', left: 0, top: 200, width: 1080, height: 14, background: '#C9D2DF'}} />
      {Array.from({length: n}, (_, i) => { const isG = i === 0, isS = i === n - 1; const xx = 900 - i * 110 + off - 110; return <div key={i} style={{position: 'absolute', left: xx, top: 60 + (isG || isS ? -20 : 0)}}><Walker c={['#4B6CB7', '#8E5BC2', '#2E9C8E', '#C2185B', '#5D6D7E', '#D35400'][i % 6]} ph={k * 9 + i} vest={isG ? CY : isS ? CO : undefined} s={isG || isS ? 1.25 : 1} /></div>; })}
      {guideAt > 0 && <div style={{position: 'absolute', left: 900 + off - 110 - 40, top: -40, ...nb(CY, 4), borderColor: NBK, padding: '4px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: NBK, opacity: pop(t, guideAt), whiteSpace: 'nowrap'}}>Guide-file</div>}
      {closeAt > 0 && <div style={{position: 'absolute', left: 900 - (n - 1) * 110 + off - 110 - 40, top: -40, ...nb(CO, 4), borderColor: NBK, padding: '4px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: '#fff', opacity: pop(t, closeAt), whiteSpace: 'nowrap'}}>Serre-file</div>}
    </Abs>
  );
};

/* ═════════════ 8. Porte 3D qui se referme (le serre-file ferme la marche) ═════════════ */
const EDoor: React.FC<{x: number; y: number; at: number; close: number}> = ({x, y, at, close}) => {
  const t = useT();
  const c = prog(t, close, close + 0.6, easeIn);
  const bounce = t > close + 0.6 ? Math.sin((t - close - 0.6) * 30) * Math.exp(-(t - close - 0.6) * 8) * 4 : 0;
  return (
    <Abs x={x} y={y} w={340} h={560} style={{opacity: pop(t, at), perspective: 1100}}>
      <div style={{position: 'absolute', inset: 0, background: '#2B3038', border: `10px solid ${NBK}`, borderRadius: 8, overflow: 'hidden'}}><div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #FFF6D8, #F5C400)', opacity: 1 - c}} /></div>
      <div style={{position: 'absolute', left: 10, top: 10, width: 320, height: 540, background: 'linear-gradient(90deg, #C98B4F, #A86F3B)', border: `5px solid ${NBK}`, transformOrigin: '0 50%', transform: `rotateY(${-75 * (1 - c) + bounce}deg)`, boxShadow: 'inset 0 0 0 14px rgba(0,0,0,0.08)'}}>
        <div style={{position: 'absolute', right: 26, top: 260, width: 40, height: 14, borderRadius: 7, background: '#D9DEE6', border: `3px solid ${NBK}`}} />
        <div style={{position: 'absolute', left: 60, top: 40, width: 200, height: 86}}><ExitRunner size={86} ph={0} /></div>
      </div>
      {c >= 1 && t < close + 0.9 && <div style={{position: 'absolute', left: -60, top: 230, width: 460, height: 100, border: `6px solid ${CO}`, borderRadius: 50, opacity: 1 - (t - close - 0.6) / 0.3, transform: `scale(${1 + (t - close - 0.6) * 2})`}} />}
    </Abs>
  );
};

/* ═════════════ 9. Sonar du serre-file : les pièces balayées une à une, « personne n'est resté » ═════════════ */
const ESonar: React.FC<{x: number; y: number; at: number; dur: number}> = ({x, y, at, dur}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const ang = (k / dur) * 360 * 1.5;
  const rooms: [number, number][] = [[-170, -150], [150, -170], [190, 120], [-150, 160], [0, -10]];
  const S2 = 420;
  return (
    <Abs x={x} y={y} w={S2} h={S2} style={{opacity: pop(t, at)}}>
      <svg width={S2} height={S2}>
        <circle cx={S2 / 2} cy={S2 / 2} r={S2 / 2 - 6} fill="#0E2A1E" stroke={NBK} strokeWidth={8} />
        {[0.33, 0.66].map((f) => <circle key={f} cx={S2 / 2} cy={S2 / 2} r={(S2 / 2 - 6) * f} fill="none" stroke="#2F7A52" strokeWidth={2} />)}
        <line x1={0} y1={S2 / 2} x2={S2} y2={S2 / 2} stroke="#2F7A52" strokeWidth={2} /><line x1={S2 / 2} y1={0} x2={S2 / 2} y2={S2} stroke="#2F7A52" strokeWidth={2} />
        <g transform={`rotate(${ang} ${S2 / 2} ${S2 / 2})`}><path d={`M ${S2 / 2} ${S2 / 2} L ${S2 / 2} 8 A ${S2 / 2 - 8} ${S2 / 2 - 8} 0 0 1 ${S2 / 2 + (S2 / 2 - 8) * Math.sin(0.6)} ${S2 / 2 - (S2 / 2 - 8) * Math.cos(0.6)} Z`} fill="rgba(124,255,176,0.35)" /></g>
        {rooms.map(([rx, ry], i) => { const ra = (Math.atan2(rx, -ry) * 180) / Math.PI; const seen = ang >= ((ra + 360) % 360) + (i === 4 ? 360 : 0) * 0; return <g key={i}><rect x={S2 / 2 + rx * 0.8 - 26} y={S2 / 2 + ry * 0.8 - 18} width={52} height={36} rx={6} fill={seen ? '#7CFFB0' : 'none'} stroke="#7CFFB0" strokeWidth={3} opacity={seen ? 0.9 : 0.5} />{seen && <path d={`M ${S2 / 2 + rx * 0.8 - 12} ${S2 / 2 + ry * 0.8} l 8 8 l 16 -16`} fill="none" stroke="#0E2A1E" strokeWidth={5} />}</g>; })}
      </svg>
    </Abs>
  );
};

/* ═════════════ 10. Talkie-walkie : antenne, ondes et forme d'onde vocale ═════════════ */
const ERadio: React.FC<{x: number; y: number; at: number; c?: string}> = ({x, y, at, c = CR}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  return (
    <Abs x={x} y={y} w={420} h={520} style={{opacity: pop(t, at)}}>
      <svg width={420} height={520}>
        <rect x={150} y={20} width={22} height={120} rx={8} fill="#2B3038" stroke={NBK} strokeWidth={4} />
        {[0, 1, 2].map((i) => { const r = ((k * 1.3 + i / 3) % 1); return <path key={i} d={`M ${161 + 30 + r * 80} ${40 - r * 30} a ${40 + r * 80} ${40 + r * 80} 0 0 1 0 ${60 + r * 80}`} fill="none" stroke={c} strokeWidth={6} opacity={1 - r} />; })}
        <rect x={110} y={130} width={200} height={360} rx={30} fill="#2B3038" stroke={NBK} strokeWidth={6} />
        <rect x={135} y={160} width={150} height={90} rx={10} fill="#9EE6B8" stroke={NBK} strokeWidth={4} />
        <polyline points={Array.from({length: 30}, (_, i) => `${140 + i * 5},${205 + Math.sin(i * 1.3 + k * 18) * 26 * Math.abs(Math.sin(k * 3 + i * 0.2))}`).join(' ')} fill="none" stroke="#0E2A1E" strokeWidth={3} />
        {Array.from({length: 12}, (_, i) => <circle key={i} cx={150 + (i % 4) * 40} cy={300 + Math.floor(i / 4) * 40} r={12} fill="#4A525C" />)}
        <rect x={130} y={440} width={160} height={24} rx={12} fill={c} opacity={0.6 + 0.4 * Math.sin(k * 10)} />
      </svg>
    </Abs>
  );
};

/* ═════════════ 11. Hub qui centralise : les informations convergent vers le responsable ═════════════ */
const EHub: React.FC<{cx: number; cy: number; at: number; nodes: [string, number][]; center: string; c: string}> = ({cx, cy, at, nodes, center, c}) => {
  const t = useT();
  const n = nodes.length;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        {nodes.map(([, a], i) => { const th = -Math.PI / 2 + (i / n) * Math.PI * 2; const nx = cx + Math.cos(th) * 330, ny = cy + Math.sin(th) * 260; const p = prog(t, a, a + 0.5); const pk = ((t - a) * 0.9) % 1; return <g key={i}><line x1={nx} y1={ny} x2={lerp(nx, cx, p)} y2={lerp(ny, cy, p)} stroke={c} strokeWidth={5} strokeDasharray="10 8" />{t > a + 0.5 && <circle cx={lerp(nx, cx, pk)} cy={lerp(ny, cy, pk)} r={10} fill={CY} stroke={NBK} strokeWidth={3} />}</g>; })}
      </svg>
      <div style={{position: 'absolute', left: cx - 120, top: cy - 120, width: 240, height: 240, borderRadius: 120, background: c, border: `8px solid ${NBK}`, boxShadow: `0 0 0 ${10 + 6 * Math.sin(t * 5)}px ${c}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff', lineHeight: 1.1, padding: 20, boxSizing: 'border-box', transform: `scale(${Math.min(1, sp(t, at, 8, 12))})`, zIndex: 3}}>{center}</div>
      {nodes.map(([l, a], i) => { const th = -Math.PI / 2 + (i / n) * Math.PI * 2; const nx = cx + Math.cos(th) * 330, ny = cy + Math.sin(th) * 260; const q = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0; return <div key={l} style={{position: 'absolute', left: nx - 140, top: ny - 40, width: 280, minHeight: 80, ...nb('#fff', 6), borderColor: NBK, boxShadow: `6px 6px 0 ${c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 27, color: INK, textAlign: 'center', transform: `scale(${q})`, zIndex: 3}}>{l}</div>; })}
    </>
  );
};

/* ═════════════ 12. Confusion : flèches affolées dans toutes les directions, points d'interrogation ═════════════ */
const EConfusion: React.FC<{cx: number; cy: number; at: number}> = ({cx, cy, at}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      {Array.from({length: 14}, (_, i) => { const r0 = 120 + random(`cr${i}`) * 300; const th = random(`ct${i}`) * Math.PI * 2 + Math.sin(k * (1 + random(`cs${i}`) * 2)) * 0.6; const x = cx + Math.cos(th) * r0, y = cy + Math.sin(th) * r0 * 0.8; const rot = k * (random(`cv${i}`) - 0.5) * 900 + i * 40; return <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`}><rect x={-40} y={-9} width={60} height={18} rx={6} fill={i % 3 ? CR : NAVY} stroke={NBK} strokeWidth={3} /><polygon points="18,-24 48,0 18,24" fill={i % 3 ? CR : NAVY} stroke={NBK} strokeWidth={3} /></g>; })}
      {Array.from({length: 5}, (_, i) => { const y = cy - 60 - ((k * 120 + i * 90) % 420); return <text key={`q${i}`} x={cx - 200 + i * 100} y={y} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={90} fill={NBK} opacity={0.25 + 0.5 * Math.abs(Math.sin(k * 2 + i))}>?</text>; })}
    </svg>
  );
};

/* ═════════════ 13. Dé du hasard : il roule, puis il est barré ═════════════ */
const EDice: React.FC<{cx: number; cy: number; at: number; ban: number}> = ({cx, cy, at, ban}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const roll = Math.max(0, 1 - k / 1.4);
  const face = Math.min(6, 1 + Math.floor(random(`dz${Math.floor(Math.min(k, 1.4) * 10)}`) * 6));
  const dots: Record<number, [number, number][]> = {1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]]};
  const b = prog(t, ban, ban + 0.35, easeOut);
  return (
    <>
      <div style={{position: 'absolute', left: cx - 130 - roll * 300, top: cy - 130 - Math.abs(Math.sin(k * 8)) * 120 * roll, width: 260, height: 260, background: '#fff', border: `8px solid ${NBK}`, borderRadius: 40, boxShadow: `10px 10px 0 ${NBK}`, transform: `rotate(${roll * 720}deg)`, opacity: pop(t, at)}}>
        {dots[face].map(([dx, dy], i) => <div key={i} style={{position: 'absolute', left: 110 + dx * 70 - 22, top: 110 + dy * 70 - 22, width: 44, height: 44, borderRadius: 22, background: NBK}} />)}
      </div>
      {b > 0 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}><circle cx={cx} cy={cy} r={210} fill="none" stroke={CR} strokeWidth={26} pathLength={1} strokeDasharray={`${b} 1`} /><line x1={cx - 150} y1={cy + 150} x2={cx - 150 + 300 * b} y2={cy + 150 - 300 * b} stroke={CR} strokeWidth={26} strokeLinecap="round" /></svg>}
    </>
  );
};

/* ═════════════ 14. Mètre ruban qui se déroule du bâtiment jusqu'au point de rassemblement ═════════════ */
const ETape: React.FC<{y: number; at: number; dur: number}> = ({y, at, dur}) => {
  const t = useT();
  const p = prog(t, at + 0.4, at + 0.4 + dur, easeInOut);
  const x0 = 260, x1 = 820;
  const xe = lerp(x0, x1, p);
  const fl = 0.8 + 0.2 * Math.sin(t * 20);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <rect x={60} y={y - 220} width={180} height={260} fill="#C9D2DF" stroke={NBK} strokeWidth={6} />
      {[0, 1, 2].map((r) => [0, 1].map((c) => <rect key={`${r}${c}`} x={85 + c * 75} y={y - 190 + r * 70} width={55} height={45} fill="#7FA7D9" stroke={NBK} strokeWidth={3} />))}
      <path d={`M 150 ${y - 220} c -40 -60 20 -80 0 -140 c 50 40 70 90 30 140 z`} fill={CO} stroke={NBK} strokeWidth={4} transform={`translate(150 ${y - 220}) scale(${fl}) translate(-150 ${-(y - 220)})`} />
      <rect x={x0} y={y - 20} width={xe - x0} height={40} fill={CY} stroke={NBK} strokeWidth={4} />
      {Array.from({length: Math.floor((xe - x0) / 28)}, (_, i) => <line key={i} x1={x0 + i * 28} y1={y - 20} x2={x0 + i * 28} y2={y - 20 + (i % 5 === 0 ? 24 : 12)} stroke={NBK} strokeWidth={i % 5 === 0 ? 3 : 2} />)}
      <rect x={xe - 6} y={y - 34} width={18} height={68} rx={4} fill="#8A96A8" stroke={NBK} strokeWidth={4} />
      <g transform={`translate(${x1 + 40} ${y - 80})`} opacity={prog(t, at + dur * 0.8, at + dur + 0.4)}><foreignObject width={150} height={150}><AssemblyIcon size={150} k={t} /></foreignObject></g>
      <rect x={x0 - 60} y={y + 30} width={130} height={110} rx={20} fill={CY} stroke={NBK} strokeWidth={6} /><circle cx={x0 + 5} cy={y + 85} r={30} fill="#fff" stroke={NBK} strokeWidth={5} />
    </svg>
  );
};

/* ═════════════ 15. Échiquier : le cavalier joue un coup stratégique ═════════════ */
const EChess: React.FC<{x: number; y: number; at: number; move: number}> = ({x, y, at, move}) => {
  const t = useT();
  const m = prog(t, move, move + 0.8, easeInOut);
  const C = 100;
  const fx = lerp(1, 2, m) * C + C / 2, fy = lerp(5, 3, m) * C + C / 2 - Math.sin(m * Math.PI) * 120;
  return (
    <Abs x={x} y={y} w={600} h={600} style={{opacity: pop(t, at), transform: `perspective(1400px) rotateX(${28 - 8 * m}deg)`, transformOrigin: '50% 100%'}}>
      <svg width={600} height={600}>
        {Array.from({length: 36}, (_, i) => <rect key={i} x={(i % 6) * C} y={Math.floor(i / 6) * C} width={C} height={C} fill={(i % 6 + Math.floor(i / 6)) % 2 ? '#7A4A22' : '#F3E3C3'} />)}
        <rect x={0} y={0} width={600} height={600} fill="none" stroke={NBK} strokeWidth={8} />
        <rect x={2 * C} y={3 * C} width={C} height={C} fill="none" stroke={CG} strokeWidth={8} opacity={0.4 + 0.6 * Math.abs(Math.sin(t * 4))} />
        <g transform={`translate(${fx} ${fy})`}>
          <ellipse cx={0} cy={36} rx={34} ry={10} fill="rgba(0,0,0,0.25)" />
          <path d="M -26 34 L 26 34 L 20 18 L 16 -6 Q 30 -14 22 -34 Q 6 -48 -14 -40 L -24 -22 Q -10 -18 -14 -8 L -20 18 Z" fill={NAVY} stroke="#fff" strokeWidth={3} />
          <circle cx={6} cy={-30} r={3} fill="#fff" />
        </g>
      </svg>
    </Abs>
  );
};

/* ═════════════ 16. Entonnoir : un flux désordonné devient une file ordonnée ═════════════ */
const EFunnel: React.FC<{y: number; at: number}> = ({y, at}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <path d={`M 140 ${y} L 940 ${y} L 600 ${y + 330} L 600 ${y + 520} L 480 ${y + 520} L 480 ${y + 330} Z`} fill="rgba(30,158,90,0.10)" stroke={CG} strokeWidth={8} strokeLinejoin="round" />
      {Array.from({length: 40}, (_, i) => { const u = ((k * 0.35 + i / 40) % 1); const sx = 170 + random(`fx${i}`) * 740; const yy = y - 160 + u * 760; let xx: number; if (yy < y) xx = sx + Math.sin(k * 3 + i) * 30; else if (yy < y + 330) { const f = (yy - y) / 330; xx = lerp(sx, 540 + (random(`fo${i}`) - 0.5) * 80, f); } else xx = 540 + (random(`fo${i}`) - 0.5) * 80 * Math.max(0, 1 - (yy - y - 330) / 100); return <circle key={i} cx={xx} cy={yy} r={14} fill={yy < y ? CR : yy < y + 330 ? CO : CG} stroke="#fff" strokeWidth={3} opacity={u < 0.92 ? 1 : (1 - u) * 12} />; })}
    </svg>
  );
};

/* ═════════════ 17. Recensement : les silhouettes cochées une à une, une place reste vide ═════════════ */
const ETally: React.FC<{x: number; y: number; at: number; step: number; missAt: number; cols?: number; rows?: number}> = ({x, y, at, step, missAt, cols = 6, rows = 3}) => {
  const t = useT();
  const n = cols * rows, miss = n - 4;
  return (
    <Abs x={x} y={y} w={cols * 150} h={rows * 170} style={{opacity: pop(t, at)}}>
      {Array.from({length: n}, (_, i) => { const ck = at + 0.3 + i * step; const isMiss = i === miss; const q = Math.min(1, sp(t, at + i * 0.04, 9, 12)); const checked = !isMiss && t > ck; const blink = isMiss && t > missAt ? (Math.floor((t - missAt) * 4) % 2 ? 1 : 0.35) : 1; return (
        <div key={i} style={{position: 'absolute', left: (i % cols) * 150, top: Math.floor(i / cols) * 170, width: 130, height: 150, transform: `scale(${q})`, opacity: blink}}>
          {isMiss ? <div style={{position: 'absolute', inset: 6, border: `5px dashed ${t > missAt ? CR : '#B9C0C8'}`, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: CR}}>{t > missAt ? '?' : ''}</div> : <svg width={130} height={150}><circle cx={65} cy={38} r={24} fill={checked ? CG : '#8A96A8'} /><path d="M 25 140 Q 25 72 65 72 Q 105 72 105 140 Z" fill={checked ? CG : '#8A96A8'} />{checked && <><circle cx={102} cy={30} r={22} fill="#fff" stroke={CG} strokeWidth={5} /><path d="M 91 30 l 8 8 l 14 -16" fill="none" stroke={CG} strokeWidth={6} strokeLinecap="round" /></>}</svg>}
        </div>
      ); })}
    </Abs>
  );
};

/* ═════════════ 18. Marteau du juge qui frappe le Code du travail ═════════════ */
const EGavel: React.FC<{cx: number; cy: number; at: number; hit: number; label?: string}> = ({cx, cy, at, hit, label = 'CODE DU TRAVAIL'}) => {
  const t = useT();
  const up = t < hit ? prog(t, at, hit - 0.15, easeOut) : 0;
  const down = t < hit ? prog(t, hit - 0.15, hit, easeIn) : 1;
  const ang = -50 * up * (1 - down);
  const k = t - hit;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <rect x={cx - 280} y={cy + 60} width={560} height={130} rx={12} fill="#C9A227" stroke={NBK} strokeWidth={7} />
      <rect x={cx - 260} y={cy + 76} width={30} height={100} fill="#9A7A12" />
      <text x={cx + 10} y={cy + 145} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={46} fill={NBK}>{label}</text>
      <ellipse cx={cx + 120} cy={cy + 58} rx={110} ry={20} fill="#6E4A26" stroke={NBK} strokeWidth={5} />
      <g transform={`rotate(${ang} ${cx + 360} ${cy - 40})`}>
        <rect x={cx + 120} y={cy - 54} width={250} height={26} rx={10} fill="#8A5A2B" stroke={NBK} strokeWidth={5} />
        <rect x={cx + 40} y={cy - 110} width={150} height={120} rx={20} fill="#A86F3B" stroke={NBK} strokeWidth={6} />
        <rect x={cx + 40} y={cy - 70} width={150} height={20} fill="#C9A227" stroke={NBK} strokeWidth={3} />
      </g>
      {k > 0 && k < 0.5 && [0, 1, 2].map((i) => <ellipse key={i} cx={cx + 120} cy={cy + 58} rx={110 + k * 500 + i * 30} ry={20 + k * 90 + i * 6} fill="none" stroke={CY} strokeWidth={6 - i * 2} opacity={1 - k * 2} />)}
    </svg>
  );
};

/* ═════════════ 19. Baguette du chef d'orchestre : traînée lumineuse en huit ═════════════ */
const EBaton: React.FC<{cx: number; cy: number; at: number}> = ({cx, cy, at}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const pt = (u: number): [number, number] => { const a = u * Math.PI * 2; return [cx + Math.sin(a) * 230, cy + Math.sin(a * 2) * 110]; };
  const trail = Array.from({length: 26}, (_, i) => pt(k * 0.55 - i * 0.012));
  const [hx, hy] = trail[0];
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      {trail.slice(1).map(([x2, y2], i) => { const [x1, y1] = trail[i]; return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={CY} strokeWidth={18 - i * 0.6} strokeLinecap="round" opacity={1 - i / 26} style={{filter: `drop-shadow(0 0 8px ${CY})`}} />; })}
      <line x1={cx} y1={cy + 330} x2={hx} y2={hy} stroke="#fff" strokeWidth={10} strokeLinecap="round" />
      <line x1={cx} y1={cy + 330} x2={hx} y2={hy} stroke={NBK} strokeWidth={3} strokeLinecap="round" />
      <circle cx={cx} cy={cy + 330} r={24} fill="#6B4A2E" stroke={NBK} strokeWidth={4} />
      {[0, 1, 2].map((i) => { const u = ((k * 0.6 + i / 3) % 1); return <text key={i} x={cx - 300 + i * 260 + Math.sin(u * 6) * 20} y={cy - 160 - u * 160} fontSize={64} fill={i % 2 ? CR : NAVY} opacity={1 - u}>♪</text>; })}
    </svg>
  );
};

/* ═════════════ 20. Camion de pompiers qui arrive, gyrophares allumés ═════════════ */
const EFiretruck: React.FC<{y: number; at: number}> = ({y, at}) => {
  const t = useT();
  const q = Math.min(1, sp(t, at, 6, 13));
  const x = lerp(1200, 300, q);
  const fl = Math.floor(t * 6) % 2;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
      <g transform={`translate(${x} ${y})`}>
        <rect x={0} y={40} width={520} height={150} rx={18} fill={CR} stroke={NBK} strokeWidth={6} />
        <rect x={-150} y={70} width={170} height={120} rx={16} fill={CR} stroke={NBK} strokeWidth={6} />
        <rect x={-130} y={86} width={110} height={56} rx={8} fill="#BFE3FF" stroke={NBK} strokeWidth={4} />
        <rect x={40} y={0} width={420} height={22} rx={8} fill="#C9D2DF" stroke={NBK} strokeWidth={4} />
        {Array.from({length: 9}, (_, i) => <line key={i} x1={60 + i * 45} y1={0} x2={60 + i * 45} y2={22} stroke={NBK} strokeWidth={3} />)}
        <rect x={20} y={110} width={480} height={18} fill="#fff" opacity={0.85} />
        {[-80, 120, 400].map((wx) => <g key={wx}><circle cx={wx} cy={196} r={38} fill="#2B3038" stroke={NBK} strokeWidth={5} /><circle cx={wx} cy={196} r={14} fill="#C9D2DF" /></g>)}
        <rect x={-120} y={48} width={40} height={24} rx={8} fill={fl ? '#4FA3FF' : '#1B3A66'} style={{filter: fl ? 'drop-shadow(0 0 20px #4FA3FF)' : undefined}} />
        <rect x={-60} y={48} width={40} height={24} rx={8} fill={fl ? '#1B3A66' : '#4FA3FF'} style={{filter: fl ? undefined : 'drop-shadow(0 0 20px #4FA3FF)'}} />
      </g>
      {q < 0.98 && Array.from({length: 5}, (_, i) => <line key={i} x1={x + 540} y1={y + 60 + i * 28} x2={x + 640 + i * 20} y2={y + 60 + i * 28} stroke="#8A96A8" strokeWidth={5} strokeLinecap="round" opacity={0.7 * (1 - q)} />)}
    </svg>
  );
};

/* ═════════════ 21. Manomètre : l'aiguille monte dans le rouge (la pression d'une vraie urgence) ═════════════ */
const EGauge: React.FC<{cx: number; cy: number; at: number; R?: number; label?: string}> = ({cx, cy, at, R = 240, label = 'PRESSION'}) => {
  const t = useT();
  const p = prog(t, at, at + 2.2, easeInOut);
  const jit = p > 0.85 ? Math.sin(t * 50) * 3 : 0;
  const ang = -120 + 230 * p + jit;
  const arc = (a0: number, a1: number, c: string) => { const r = R - 30; const p0 = [cx + Math.sin((a0 * Math.PI) / 180) * r, cy - Math.cos((a0 * Math.PI) / 180) * r]; const p1 = [cx + Math.sin((a1 * Math.PI) / 180) * r, cy - Math.cos((a1 * Math.PI) / 180) * r]; return <path d={`M ${p0[0]} ${p0[1]} A ${r} ${r} 0 0 1 ${p1[0]} ${p1[1]}`} fill="none" stroke={c} strokeWidth={34} />; };
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at - 0.3)}}>
      <circle cx={cx} cy={cy} r={R + 20} fill="#C9D2DF" stroke={NBK} strokeWidth={8} />
      <circle cx={cx} cy={cy} r={R} fill="#fff" stroke={NBK} strokeWidth={4} />
      {arc(-120, -20, CG)}{arc(-20, 60, CY)}{arc(60, 120, CR)}
      {Array.from({length: 13}, (_, i) => { const a = ((-120 + i * 20) * Math.PI) / 180; return <line key={i} x1={cx + Math.sin(a) * (R - 60)} y1={cy - Math.cos(a) * (R - 60)} x2={cx + Math.sin(a) * (R - 80)} y2={cy - Math.cos(a) * (R - 80)} stroke={NBK} strokeWidth={4} />; })}
      <g transform={`rotate(${ang} ${cx} ${cy})`}><polygon points={`${cx - 10},${cy} ${cx},${cy - R + 50} ${cx + 10},${cy}`} fill={CR} stroke={NBK} strokeWidth={3} /></g>
      <circle cx={cx} cy={cy} r={26} fill={NBK} />
      <text x={cx} y={cy + 110} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={30} fill={NBK}>{label}</text>
    </svg>
  );
};

/* ═════════════ 22. Dominos : chaque étape fait tomber la suivante ═════════════ */
const EDomino: React.FC<{y: number; at: number; tiles: [string, number][]}> = ({y, at, tiles}) => {
  const t = useT();
  const n = tiles.length; const gap = 960 / n;
  return (
    <Abs x={60} y={y} w={960} h={520} style={{opacity: pop(t, at)}}>
      <div style={{position: 'absolute', left: 0, top: 470, width: 960, height: 14, background: '#C9D2DF', borderRadius: 7}} />
      {tiles.map(([l, a], i) => { const f = prog(t, a, a + 0.45, easeIn); const ang = f * (i === n - 1 ? 0 : 62); const lit = t > a; return (
        <div key={l} style={{position: 'absolute', left: i * gap + gap / 2 - 60, top: 120, width: 120, height: 350, transformOrigin: '100% 100%', transform: `rotate(${ang}deg)`, ...nb(lit ? (i === n - 1 ? CG : CO) : '#fff', 6), borderColor: NBK, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{transform: 'rotate(-90deg)', whiteSpace: 'nowrap', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: lit ? '#fff' : INK}}>{l}</div>
        </div>
      ); })}
    </Abs>
  );
};

/* ═════════════ 23. Cycle des six étapes : un coureur fait le tour et allume chaque étape ═════════════ */
const ECycle: React.FC<{cx: number; cy: number; at: number; steps: [string, string, number][]; R?: number}> = ({cx, cy, at, steps, R = 330}) => {
  const t = useT();
  const n = steps.length;
  const cur = steps.reduce((acc, s0, i) => (t >= s0[2] ? i : acc), -1);
  const runA = cur < 0 ? -90 : -90 + (cur / n) * 360 + prog(t, steps[cur][2], steps[cur][2] + 0.6, easeOut) * 0;
  const [rx, ry] = [cx + Math.cos((runA * Math.PI) / 180) * R, cy + Math.sin((runA * Math.PI) / 180) * R];
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="#D5DAE2" strokeWidth={18} />
        {cur >= 0 && <circle cx={cx} cy={cy} r={R} fill="none" stroke={CG} strokeWidth={18} pathLength={1} strokeDasharray={`${(cur + 1) / n} 1`} transform={`rotate(-90 ${cx} ${cy})`} strokeLinecap="round" />}
        {cur >= 0 && <circle cx={rx} cy={ry} r={20} fill={CY} stroke={NBK} strokeWidth={4} style={{filter: `drop-shadow(0 0 14px ${CY})`}} />}
      </svg>
      {steps.map(([l, ic, a], i) => { const th = ((-90 + (i / n) * 360) * Math.PI) / 180; const x = cx + Math.cos(th) * R, y = cy + Math.sin(th) * R; const on = t >= a; const q = Math.min(1, sp(t, at + i * 0.06, 9, 12)); return <div key={l} style={{position: 'absolute', left: x - 92, top: y - 72, width: 184, height: 144, ...nb(on ? (i === cur ? CG : '#fff') : '#F2F0EA', 6), borderColor: NBK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, transform: `scale(${q * (i === cur ? 1.1 : 1)})`, opacity: on ? 1 : 0.6, zIndex: i === cur ? 3 : 2}}><div style={{display: 'flex', alignItems: 'center', gap: 8}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: i === cur ? '#fff' : CG}}>{i + 1}</span><Ico n={ic} size={40} c={i === cur ? '#fff' : NAVY} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: i === cur ? '#fff' : INK}}>{l}</div></div>; })}
      <div style={{position: 'absolute', left: cx - 140, top: cy - 140, width: 280, height: 280, borderRadius: 140, background: '#fff', border: `6px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, at)}}>{cur >= 0 && <div key={cur} style={{transform: `scale(${Math.min(1, sp(t, steps[cur][2], 9, 12))})`}}><Ico n={steps[cur][1]} size={150} c={CG} /></div>}</div>
    </>
  );
};

/* ═════════════ 24. Anneau des douze mois : deux exercices à six mois d'écart ═════════════ */
const MOIS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const EMonths: React.FC<{cx: number; cy: number; at: number; two: number; six: number}> = ({cx, cy, at, two, six}) => {
  const t = useT();
  const rot = Math.max(0, t - at) * 12;
  const arcP = prog(t, six, six + 1.0, easeInOut);
  const R = 290;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <g transform={`rotate(${rot} ${cx} ${cy})`}>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="#E4DCCB" strokeWidth={70} />
        <path d={`M ${cx} ${cy - R} A ${R} ${R} 0 0 1 ${cx} ${cy + R}`} fill="none" stroke={CY} strokeWidth={70} pathLength={1} strokeDasharray={`${arcP} 1`} opacity={0.85} />
        {MOIS.map((m, i) => { const a = ((i / 12) * 360 * Math.PI) / 180; const x = cx + Math.sin(a) * R, y = cy - Math.cos(a) * R; const ex = (i === 0 || i === 6) && t > two + (i ? 0.4 : 0); return <g key={i} transform={`rotate(${-rot} ${x} ${y})`}><circle cx={x} cy={y} r={ex ? 40 : 30} fill={ex ? CG : '#fff'} stroke={NBK} strokeWidth={4} /><text x={x} y={y + 12} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={32} fill={ex ? '#fff' : NBK}>{m}</text></g>; })}
      </g>
    </svg>
  );
};

/* ═════════════ 25. Fiche d'évaluation : le stylo coche les lignes ═════════════ */
const EChecklist: React.FC<{x: number; y: number; at: number; rows: [string, number, boolean][]}> = ({x, y, at, rows}) => {
  const t = useT();
  const last = rows.reduce((acc, r, i) => (t >= r[1] ? i : acc), -1);
  const pen = last >= 0 ? prog(t, rows[last][1], rows[last][1] + 0.4) : 0;
  const py = 150 + Math.max(0, last) * 120;
  return (
    <Abs x={x} y={y} w={700} h={150 + rows.length * 120 + 40} style={{opacity: pop(t, at), transform: `rotate(-2deg) translateY(${(1 - pop(t, at)) * 80}px)`}}>
      <div style={{position: 'absolute', inset: 0, background: '#fff', border: `6px solid ${NBK}`, borderRadius: 18, boxShadow: `10px 10px 0 ${NAVY}`}} />
      <div style={{position: 'absolute', left: 250, top: -30, width: 200, height: 60, background: '#8A96A8', border: `5px solid ${NBK}`, borderRadius: 14}} />
      <div style={{position: 'absolute', left: 40, top: 50, ...CAP, fontSize: 26, color: NAVY}}>Fiche d'évaluation</div>
      {rows.map(([l, a, ok], i) => { const c = prog(t, a, a + 0.4); return <div key={l} style={{position: 'absolute', left: 40, top: 120 + i * 120, width: 620, height: 90, display: 'flex', alignItems: 'center', gap: 20, borderBottom: '3px solid #EEF1F5'}}><div style={{width: 60, height: 60, border: `5px solid ${NBK}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}><svg width={50} height={50}>{ok ? <path d="M 8 26 L 20 38 L 42 12" fill="none" stroke={CG} strokeWidth={8} strokeLinecap="round" pathLength={1} strokeDasharray={`${c} 1`} /> : <path d="M 25 8 A 17 17 0 1 1 9 30 M 9 30 L 4 20 M 9 30 L 19 28" fill="none" stroke={CO} strokeWidth={6} strokeLinecap="round" pathLength={1} strokeDasharray={`${c} 1`} />}</svg></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: t > a ? INK : '#B9C0C8'}}>{l}</div></div>; })}
      {last >= 0 && <svg width={160} height={160} style={{position: 'absolute', left: 60 + Math.sin(pen * Math.PI * 3) * 20, top: py - 120 + pen * 20}}><g transform="rotate(35 80 80)"><rect x={66} y={0} width={28} height={120} rx={6} fill={NAVY} stroke={NBK} strokeWidth={4} /><polygon points="66,120 94,120 80,150" fill="#F3E3C3" stroke={NBK} strokeWidth={4} /></g></svg>}
    </Abs>
  );
};

/* ═════════════ 26. Spirale de progrès : on monte en continu ═════════════ */
const ESpiral: React.FC<{cx: number; cy: number; at: number}> = ({cx, cy, at}) => {
  const t = useT();
  const p = prog(t, at, at + 1.8, easeInOut);
  const N = 120;
  const pt = (u: number): [number, number] => { const a = u * Math.PI * 2 * 3; return [cx + Math.cos(a) * (60 + u * 230), cy + 220 - u * 460 + Math.sin(a) * 50]; };
  const pts = Array.from({length: Math.max(2, Math.floor(N * p))}, (_, i) => pt(i / N));
  const [hx, hy] = pt(p);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at - 0.2)}}>
      <polyline points={pts.map((q) => q.join(',')).join(' ')} fill="none" stroke={CG} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={hx} cy={hy} r={26} fill={CY} stroke={NBK} strokeWidth={5} style={{filter: `drop-shadow(0 0 16px ${CY})`}} />
      {p > 0.95 && <polygon points={`${hx - 34},${hy - 30} ${hx},${hy - 80} ${hx + 34},${hy - 30}`} fill={CG} stroke={NBK} strokeWidth={4} />}
    </svg>
  );
};

/* ═════════════ 27. Plume qui tombe en se balançant (« prendre à la légère ») ═════════════ */
const EFeather: React.FC<{cx: number; at: number; y0: number; y1: number; dur: number}> = ({cx, at, y0, y1, dur}) => {
  const t = useT();
  const p = prog(t, at, at + dur, lin);
  const x = cx + Math.sin(p * Math.PI * 4) * 160, y = lerp(y0, y1, p);
  const rot = Math.cos(p * Math.PI * 4) * 35;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <g transform={`translate(${x} ${y}) rotate(${rot})`}>
        <path d="M 0 -150 C 70 -110 80 20 0 140 C -80 20 -70 -110 0 -150 Z" fill="#FBF7EE" stroke={NBK} strokeWidth={5} />
        <line x1={0} y1={-150} x2={0} y2={190} stroke={NBK} strokeWidth={5} />
        {Array.from({length: 9}, (_, i) => <g key={i}><line x1={0} y1={-110 + i * 26} x2={-50 + Math.abs(i - 4) * 6} y2={-90 + i * 26} stroke="#B9C0C8" strokeWidth={3} /><line x1={0} y1={-110 + i * 26} x2={50 - Math.abs(i - 4) * 6} y2={-90 + i * 26} stroke="#B9C0C8" strokeWidth={3} /></g>)}
      </g>
    </svg>
  );
};

/* ═════════════ 28. Compteur à rouleaux (machine à sous) : 10 000 € ═════════════ */
const EOdometer: React.FC<{x: number; y: number; at: number; digits: string; size?: number; c?: string}> = ({x, y, at, digits, size = 170, c = CR}) => {
  const t = useT();
  const W2 = size * 0.62, H = size * 1.2;
  let di = 0;
  return (
    <Abs x={x} y={y} w={1000} h={H + 40} style={{display: 'flex', justifyContent: 'center', gap: 10, opacity: pop(t, at - 0.2)}}>
      {digits.split('').map((ch, i) => {
        if (!/[0-9]/.test(ch)) return <div key={i} style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color: c, lineHeight: `${H}px`, width: ch === ' ' ? size * 0.25 : undefined}}>{ch === ' ' ? '' : ch}</div>;
        const d = parseInt(ch, 10); const stop = at + 0.5 + di * 0.25; di++;
        const p = prog(t, at, stop, easeOut); const pos = (1 - p) * 30 + d; const off = pos % 10;
        return (
          <div key={i} style={{position: 'relative', width: W2, height: H, overflow: 'hidden', background: '#fff', border: `6px solid ${NBK}`, borderRadius: 14, boxShadow: `6px 6px 0 ${NBK}`}}>
            <div style={{position: 'absolute', left: 0, top: -off * H, width: W2}}>{Array.from({length: 11}, (_, k) => <div key={k} style={{height: H, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.9, color: NBK, filter: p < 1 ? `blur(${(1 - p) * 4}px)` : undefined}}>{k % 10}</div>)}</div>
            <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.25), transparent 30%, transparent 70%, rgba(0,0,0,0.25))'}} />
          </div>
        );
      })}
    </Abs>
  );
};

/* ═════════════ 29. Écran qui se fissure sous le coup de massue ═════════════ */
const ECrack: React.FC<{cx: number; cy: number; at: number}> = ({cx, cy, at}) => {
  const t = useT();
  const k = t - at;
  if (k < 0) return null;
  const p = Math.min(1, k / 0.25);
  const shake = k < 0.4 ? Math.sin(k * 80) * 14 * (1 - k / 0.4) : 0;
  return (
    <AbsoluteFill style={{zIndex: 9, pointerEvents: 'none', transform: `translateX(${shake}px)`}}>
      <svg width={1080} height={1920}>
        {Array.from({length: 14}, (_, i) => { const a = (i / 14) * Math.PI * 2 + random(`ka${i}`) * 0.3; const L = (300 + random(`kl${i}`) * 500) * p; const mx = cx + Math.cos(a + 0.15) * L * 0.5, my = cy + Math.sin(a + 0.15) * L * 0.5; return <polyline key={i} points={`${cx},${cy} ${mx},${my} ${cx + Math.cos(a) * L},${cy + Math.sin(a) * L}`} fill="none" stroke="#fff" strokeWidth={6} style={{filter: 'drop-shadow(0 0 2px #000)'}} />; })}
        {[90, 180].map((r) => <circle key={r} cx={cx} cy={cy} r={r * p} fill="none" stroke="#fff" strokeWidth={4} strokeDasharray="30 18" style={{filter: 'drop-shadow(0 0 2px #000)'}} />)}
      </svg>
      <AbsoluteFill style={{background: '#fff', opacity: Math.max(0, 0.5 - k * 2.5)}} />
    </AbsoluteFill>
  );
};

/* ═════════════ 30. Clou enfoncé en trois coups de marteau ═════════════ */
const ENail: React.FC<{cx: number; cy: number; at: number; hits: number[]}> = ({cx, cy, at, hits}) => {
  const t = useT();
  const done = hits.filter((h) => t >= h).length;
  const depth = done * 50;
  const next = hits.find((h) => t < h);
  const swing = next ? prog(t, next - 0.35, next - 0.05, easeIn) : 0;
  const raise = next ? 1 - prog(t, next - 0.7, next - 0.35, easeOut) : 1;
  const ang = -60 * (1 - swing) * (1 - raise * 0) ;
  const recent = hits.filter((h) => t >= h && t - h < 0.3).length > 0;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <rect x={cx - 360} y={cy + 100} width={720} height={160} fill="#A86F3B" stroke={NBK} strokeWidth={6} />
      {[0, 1, 2].map((i) => <path key={i} d={`M ${cx - 340} ${cy + 140 + i * 40} q 200 ${-14 + i * 8} 680 0`} fill="none" stroke="#7A4A22" strokeWidth={3} />)}
      <rect x={cx - 9} y={cy - 60 + depth} width={18} height={160} fill="#8A96A8" stroke={NBK} strokeWidth={3} />
      <rect x={cx - 40} y={cy - 74 + depth} width={80} height={16} rx={4} fill="#8A96A8" stroke={NBK} strokeWidth={4} />
      {recent && <circle cx={cx} cy={cy - 74 + depth} r={60} fill="none" stroke={CY} strokeWidth={6} />}
      {done < hits.length || t - hits[hits.length - 1] < 0.6 ? <g transform={`rotate(${next ? ang : 0} ${cx + 300} ${cy - 80 + depth})`}><rect x={cx + 20} y={cy - 96 + depth} width={300} height={28} rx={8} fill="#8A5A2B" stroke={NBK} strokeWidth={5} /><rect x={cx - 40} y={cy - 150 + depth} width={70} height={130} rx={10} fill="#5B6472" stroke={NBK} strokeWidth={6} /></g> : null}
    </svg>
  );
};

/* ═════════════ 31. Cible : la flèche se plante au centre (le résultat) ═════════════ */
const ETarget: React.FC<{cx: number; cy: number; at: number; hit: number}> = ({cx, cy, at, hit}) => {
  const t = useT();
  const f = prog(t, hit - 0.4, hit, easeIn);
  const k = t - hit;
  const wob = k > 0 ? Math.sin(k * 40) * 6 * Math.exp(-k * 6) : 0;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      {[220, 170, 120, 70, 26].map((r, i) => <circle key={r} cx={cx} cy={cy} r={r} fill={i % 2 ? '#fff' : CR} stroke={NBK} strokeWidth={5} />)}
      <g transform={`translate(${lerp(-700, 0, f)} ${lerp(-240, 0, f)}) rotate(${wob} ${cx} ${cy})`}>
        <line x1={cx - 260} y1={cy - 90} x2={cx} y2={cy} stroke={NBK} strokeWidth={10} />
        <polygon points={`${cx - 260},${cy - 90} ${cx - 300},${cy - 130} ${cx - 240},${cy - 120}`} fill={CY} stroke={NBK} strokeWidth={3} />
        <polygon points={`${cx - 260},${cy - 90} ${cx - 310},${cy - 80} ${cx - 270},${cy - 50}`} fill={CY} stroke={NBK} strokeWidth={3} />
      </g>
      {k > 0 && k < 0.5 && <circle cx={cx} cy={cy} r={30 + k * 400} fill="none" stroke={CY} strokeWidth={8} opacity={1 - k * 2} />}
    </svg>
  );
};

/* ═════════════ 32. Ronde de l'unité : la sécurité, l'affaire de toutes et de tous ═════════════ */
const EUnity: React.FC<{cx: number; cy: number; at: number; R?: number}> = ({cx, cy, at, R = 300}) => {
  const t = useT();
  const n = 12;
  const rot = Math.max(0, t - at) * 14;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CG} strokeWidth={10} strokeDasharray="4 18" opacity={pop(t, at + 0.6)} />
      {Array.from({length: n}, (_, i) => { const q = Math.min(1, sp(t, at + i * 0.08, 9, 12)); const a = ((i / n) * 360 + rot) * Math.PI / 180; const x = cx + Math.cos(a) * R * q, y = cy + Math.sin(a) * R * q; const c = ['#4B6CB7', CO, '#2E9C8E', CY, '#C2185B', CG][i % 6]; return <g key={i} transform={`translate(${x} ${y}) rotate(${(a * 180) / Math.PI + 90})`} opacity={q}><circle cy={-34} r={20} fill="#6B4A2E" /><path d="M -26 30 Q -26 -10 0 -10 Q 26 -10 26 30 Z" fill={c} stroke={NBK} strokeWidth={3} /></g>; })}
      <g transform={`translate(${cx} ${cy}) scale(${Math.min(1, sp(t, at + 1.0, 8, 12))})`}><path d="M 0 -120 L 100 -80 L 100 10 Q 100 90 0 130 Q -100 90 -100 10 L -100 -80 Z" fill={CG} stroke={NBK} strokeWidth={8} /><path d="M -45 0 L -10 35 L 50 -30" fill="none" stroke="#fff" strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" /></g>
    </svg>
  );
};

/* ═════════════ Palette des lois invisibles ═════════════ */
const LY = '#F5C400', LN = '#1F3A68', LR = '#E2483B', LG = '#1E9E5A', LB = '#1F6FD1';
Object.assign(LUC, {ArrowRight});

/* ═════════════ 1. Modèle du fromage suisse en 3D : les trous s'alignent, le danger traverse ═════════════ */
const LSwiss: React.FC<{cy: number; at: number; align: number; shoot: number; n?: number}> = ({cy, at, align, shoot, n = 5}) => {
  const t = useT();
  const al = prog(t, align, align + 1.0, easeInOut);
  const sh = prog(t, shoot, shoot + 1.1, easeIn);
  const k = t - shoot - 1.1;
  const gap = Math.min(170, 860 / (n - 1)), x0 = 540 - ((n - 1) * gap) / 2;
  const HY = cy;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <defs><linearGradient id="chz" x1="0" x2="1"><stop offset="0%" stopColor="#FFE07A" /><stop offset="100%" stopColor="#F2B705" /></linearGradient></defs>
      {Array.from({length: n}, (_, i) => {
        const x = x0 + i * gap; const q = Math.min(1, sp(t, at + i * 0.12, 8, 12));
        const off = (random(`sw${i}`) - 0.5) * 300 * (1 - al);
        const holes: [number, number, number][] = [[0, off, 30], [-30, -190 + random(`sh${i}`) * 60, 20], [25, 170 - random(`sk${i}`) * 50, 24], [-20, 110 + random(`sj${i}`) * 30, 14]];
        return (
          <g key={i} transform={`translate(${x} ${HY}) scale(${q})`}>
            <path d="M -40 -300 L 40 -260 L 40 300 L -40 260 Z" fill="url(#chz)" stroke={NBK} strokeWidth={6} strokeLinejoin="round" />
            <path d="M -40 -300 L -62 -290 L -62 270 L -40 260 Z" fill="#D49A00" stroke={NBK} strokeWidth={5} strokeLinejoin="round" />
            {holes.map(([hx, hy, r], j) => <ellipse key={j} cx={hx * 0.5} cy={hy} rx={r * 0.55} ry={r} fill="#8A5A00" opacity={0.85} />)}
            <ellipse cx={0} cy={off} rx={18} ry={32} fill="#3A2500" />
          </g>
        );
      })}
      {sh > 0 && <><line x1={x0 - 160} y1={HY} x2={lerp(x0 - 160, x0 + (n - 1) * gap + 180, sh)} y2={HY} stroke={LR} strokeWidth={14} strokeLinecap="round" style={{filter: `drop-shadow(0 0 12px ${LR})`}} /><polygon points={`${lerp(x0 - 160, x0 + (n - 1) * gap + 180, sh)},${HY - 28} ${lerp(x0 - 160, x0 + (n - 1) * gap + 180, sh) + 48},${HY} ${lerp(x0 - 160, x0 + (n - 1) * gap + 180, sh)},${HY + 28}`} fill={LR} stroke={NBK} strokeWidth={4} /></>}
      {k > 0 && k < 0.6 && <circle cx={x0 + (n - 1) * gap + 230} cy={HY} r={30 + k * 300} fill="none" stroke={LR} strokeWidth={10} opacity={1 - k / 0.6} />}
    </svg>
  );
};

/* ═════════════ 2. Iceberg : la caméra plonge sous la ligne d'eau ═════════════ */
const LIceberg: React.FC<{at: number; dive: number; top: [string, number][]; bottom: [string, number][]}> = ({at, dive, top, bottom}) => {
  const t = useT();
  const d = prog(t, dive, dive + 1.4, easeInOut);
  const wl = 820 - d * 360;
  const k = Math.max(0, t - at);
  return (
    <AbsoluteFill style={{opacity: pop(t, at), overflow: 'hidden', clipPath: 'inset(440px 0 0 0)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        <defs><linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3D8BD9" /><stop offset="100%" stopColor="#0C2E5C" /></linearGradient><linearGradient id="ice" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FFFFFF" /><stop offset="100%" stopColor="#B9DDF7" /></linearGradient></defs>
        <rect x={0} y={wl} width={1080} height={1920 - wl} fill="url(#sea)" />
        <g transform={`translate(0 ${-d * 360})`}>
          <polygon points="540,560 640,660 700,820 380,820 450,650" fill="url(#ice)" stroke={NBK} strokeWidth={6} strokeLinejoin="round" />
          <polygon points="380,820 700,820 860,1000 900,1200 760,1420 420,1460 220,1260 240,1000" fill="#9CCBEF" stroke={NBK} strokeWidth={6} strokeLinejoin="round" opacity={0.92} />
        </g>
        <path d={`M 0 ${wl} ${Array.from({length: 28}, (_, i) => `Q ${i * 40 + 20} ${wl - 10 * Math.sin(k * 3 + i)} ${(i + 1) * 40} ${wl}`).join(' ')}`} fill="none" stroke="#fff" strokeWidth={5} opacity={0.8} />
        {Array.from({length: 10}, (_, i) => { const yy = 1900 - ((k * 120 + i * 170) % (1900 - wl)); return yy > wl ? <circle key={i} cx={120 + i * 90} cy={yy} r={5 + (i % 3) * 3} fill="none" stroke="#BFE3FF" strokeWidth={2} opacity={0.6} /> : null; })}
      </svg>
      {top.map(([l, a], i) => <div key={l} style={{position: 'absolute', left: 140 + i * 520, top: 600 - d * 360, ...nb('#fff', 5), borderColor: NBK, padding: '6px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: LN, transform: `scale(${t > a ? Math.min(1, sp(t, a, 9, 12)) : 0})`, whiteSpace: 'nowrap'}}>{l}</div>)}
      {bottom.map(([l, a], i) => <div key={l} style={{position: 'absolute', left: 260 + (i % 2) * 300, top: 1000 + i * 110 - d * 360, ...nb(LY, 6), borderColor: NBK, padding: '10px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: NBK, transform: `scale(${t > a ? Math.min(1, sp(t, a, 9, 12)) : 0})`, whiteSpace: 'nowrap', boxShadow: `0 0 30px rgba(245,196,0,0.6)`}}>{l}</div>)}
    </AbsoluteFill>
  );
};

/* ═════════════ 3. Tour de blocs : chaque jour sans accident est un succès fragile ═════════════ */
const LJenga: React.FC<{cx: number; base: number; at: number; pull: number}> = ({cx, base, at, pull}) => {
  const t = useT();
  const p = prog(t, pull, pull + 0.9, easeInOut);
  const wob = t > pull + 0.6 ? Math.sin((t - pull - 0.6) * 9) * 3.5 * Math.exp(-(t - pull - 0.6) * 0.8) : 0;
  const L = 14, bh = 46, bw = 300;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <rect x={cx - 260} y={base} width={520} height={22} rx={8} fill="#5B6472" />
      <g transform={`rotate(${wob} ${cx} ${base})`}>
        {Array.from({length: L}, (_, r) => { const y = base - (r + 1) * bh; const q = prog(t, at + r * 0.06, at + r * 0.06 + 0.3, easeOut); return (
          <g key={r} opacity={q} transform={`translate(0 ${(1 - q) * -80})`}>
            {r % 2 === 0 ? [0, 1, 2].map((c) => { const out = r === 5 && c === 1 ? p * 360 : 0; const holeMissing = r === 3 && c === 0; return holeMissing ? null : <rect key={c} x={cx - bw / 2 + c * (bw / 3) + 2 + out} y={y} width={bw / 3 - 4} height={bh - 4} rx={5} fill={r === 5 && c === 1 ? LY : '#E2B47A'} stroke={NBK} strokeWidth={3} />; }) : <rect x={cx - bw / 2} y={y} width={bw} height={bh - 4} rx={5} fill="#D9A566" stroke={NBK} strokeWidth={3} />}
          </g>
        ); })}
      </g>
      {p > 0 && <g transform={`translate(${cx + 30 + p * 360} ${base - 6 * bh + 20})`}><path d="M 0 0 q 40 -30 90 -10 q 30 14 70 10 l 0 30 q -60 10 -100 0 q -40 10 -60 -30 z" fill="#8D5524" stroke={NBK} strokeWidth={4} /></g>}
    </svg>
  );
};

/* ═════════════ 4. Papier déchiré : terrain réel contre procédure écrite ═════════════ */
const LTorn: React.FC<{at: number; tear: number; left: [string, [string, number][]]; right: [string, [string, number][]]; y?: number; h?: number}> = ({at, tear, left, right, y = 470, h = 840}) => {
  const t = useT();
  const s0 = prog(t, tear, tear + 0.8, easeOut);
  const zig = Array.from({length: Math.ceil(h / 40) + 1}, (_, i) => `${540 + (i % 2 ? 18 : -18)},${Math.min(h, i * 40)}`).join(' ');
  const half = (side: 'l' | 'r', title: string, items: [string, number][], c: string) => (
    <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: h, clipPath: side === 'l' ? `polygon(0 0, ${zig.split(' ').map((p) => p.replace(',', 'px ') + 'px').join(', ')}, 0 ${h}px)` : `polygon(1080px 0, ${zig.split(' ').map((p) => p.replace(',', 'px ') + 'px').join(', ')}, 1080px ${h}px)`, transform: `translateX(${(side === 'l' ? -1 : 1) * s0 * 40}px) rotate(${(side === 'l' ? -1 : 1) * s0 * 2}deg)`}}>
      <div style={{position: 'absolute', inset: 0, background: side === 'l' ? '#FFF6D8' : '#EEF2F8', border: `6px solid ${NBK}`}} />
      <div style={{position: 'absolute', left: side === 'l' ? 50 : 600, top: 40, width: 430}}>
        <div style={{...nb(c, 5), borderColor: NBK, padding: '8px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: '#fff', display: 'inline-block'}}>{title}</div>
        {items.map(([it, ia]) => <div key={it} style={{marginTop: 34, fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK, opacity: pop(t, ia), transform: `translateX(${(1 - pop(t, ia)) * (side === 'l' ? -40 : 40)}px)`}}>{side === 'l' ? '≈ ' : '▪ '}{it}</div>)}
      </div>
      <div style={{position: 'absolute', left: side === 'l' ? 130 : 680, top: h - 330, opacity: 0.85 * pop(t, tear + 0.5)}}><Ico n={side === 'l' ? 'Route' : 'ClipboardList'} size={260} c={c} /></div>
    </div>
  );
  return (
    <Abs x={0} y={y} w={1080} h={h} style={{opacity: pop(t, at)}}>
      {half('l', left[0], left[1], LR)}{half('r', right[0], right[1], LN)}
    </Abs>
  );
};

/* ═════════════ 5. Signal faible : un minuscule pic détecté puis amplifié ═════════════ */
const LWeak: React.FC<{cy: number; at: number; amp: number}> = ({cy, at, amp}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const A = prog(t, amp, amp + 0.8, easeOut);
  const pts = Array.from({length: 120}, (_, i) => { const x = 60 + i * 8; const base = Math.sin(i * 0.6 + k * 6) * 8 + (random(`ns${i}${Math.floor(t * 10)}`) - 0.5) * 6; const spike = Math.exp(-((i - 70) ** 2) / 12) * (14 + A * 220) * Math.sin(k * 10 + i) ; return `${x},${cy + base - Math.abs(spike)}`; });
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <rect x={40} y={cy - 300} width={1000} height={420} rx={24} fill="#0E1A2E" stroke={NBK} strokeWidth={8} />
      {Array.from({length: 11}, (_, i) => <line key={i} x1={60 + i * 96} y1={cy - 280} x2={60 + i * 96} y2={cy + 100} stroke="#1E3A5C" strokeWidth={2} />)}
      <polyline points={pts.join(' ')} fill="none" stroke="#7CFFB0" strokeWidth={4} style={{filter: 'drop-shadow(0 0 6px #39FF8E)'}} />
      {A > 0 && <><circle cx={620} cy={cy - 40 - A * 160} r={40 + 20 * Math.sin(t * 8)} fill="none" stroke={LY} strokeWidth={5} /><text x={690} y={cy - 70 - A * 160} fontFamily={MONO} fontWeight={700} fontSize={30} fill={LY}>SIGNAL FAIBLE</text></>}
    </svg>
  );
};

/* ═════════════ 6. Engrenages tolérants : une dent casse, le système continue de tourner ═════════════ */
const LGearsTol: React.FC<{cy: number; at: number; brk: number}> = ({cy, at, brk}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const b = t > brk;
  const sh = b && t - brk < 0.4 ? Math.sin((t - brk) * 60) * 8 : 0;
  const gp = (r: number, n: number, missing = -1) => { const pts: string[] = []; for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * Math.PI * 2; const tooth = i % 2 === 0 && Math.floor(i / 2) !== missing; const rr = tooth ? r + 20 : r; const a2 = a + Math.PI / (n * 2); pts.push(`${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)}`, `${(Math.cos(a2) * rr).toFixed(1)},${(Math.sin(a2) * rr).toFixed(1)}`); } return `M ${pts.join(' L ')} Z`; };
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <g transform={`translate(${sh} 0)`}>
        <g transform={`translate(330 ${cy}) rotate(${k * 40})`}><path d={gp(150, 12, b ? 3 : -1)} fill={LN} stroke={NBK} strokeWidth={6} /><circle r={50} fill="#fff" stroke={NBK} strokeWidth={6} /></g>
        <g transform={`translate(${330 + 150 + 20 + 110 - 2} ${cy - 40}) rotate(${-k * 40 * (150 / 110) + 8})`}><path d={gp(110, 9)} fill={LY} stroke={NBK} strokeWidth={6} /><circle r={36} fill="#fff" stroke={NBK} strokeWidth={6} /></g>
        <g transform={`translate(560 ${cy + 230}) rotate(${-k * 40 * (150 / 100) + 4})`} opacity={b ? 1 : 0.35}><path d={gp(100, 8)} fill={LG} stroke={NBK} strokeWidth={6} /><circle r={30} fill="#fff" stroke={NBK} strokeWidth={6} /></g>
      </g>
      {b && t - brk < 0.8 && <g transform={`translate(${330 + Math.cos(3 * Math.PI / 6 + k * 0.7) * 170} ${cy + 120 + (t - brk) * 400})`}><rect x={-14} y={-10} width={28} height={20} fill={LR} stroke={NBK} strokeWidth={3} transform={`rotate(${(t - brk) * 720})`} /></g>}
      {b && <text x={560} y={cy + 380} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={26} fill={LG} opacity={pop(t, brk + 0.3)}>LE SYSTÈME CONTINUE</text>}
    </svg>
  );
};

/* ═════════════ 7. Ce que les managers DISENT / ce qu'ils FONT : écran partagé qui se désynchronise ═════════════ */
const LSayDo: React.FC<{at: number; say: [string, number]; doIt: [string, number]; y?: number}> = ({at, say, doIt, y = 480}) => {
  const t = useT();
  const sq = Math.min(1, sp(t, say[1], 9, 12)), dq = Math.min(1, sp(t, doIt[1], 9, 12));
  const glitch = t > doIt[1] && t < doIt[1] + 0.5 ? (random(`gl${Math.floor(t * 30)}`) - 0.5) * 30 : 0;
  const k = Math.max(0, t - doIt[1]);
  return (
    <Abs x={40} y={y} w={1000} h={760} style={{opacity: pop(t, at)}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 480, height: 760, ...nb('#FFF6D8', 8), borderColor: NBK, overflow: 'hidden'}}>
        <div style={{...CAP, fontSize: 26, color: LN, margin: 26}}>Ce qu'ils DISENT</div>
        <div style={{position: 'absolute', left: 140, top: 120, transform: `scale(${sq}) rotate(${Math.sin(t * 6) * 4}deg)`}}><Ico n="Megaphone" size={200} c={LN} /></div>
        <div style={{position: 'absolute', left: 30, top: 380, width: 420, ...nb('#fff', 5), borderColor: NBK, padding: '18px 20px', fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK, transform: `scale(${sq})`, transformOrigin: '20% 0'}}>« {say[0]} »</div>
      </div>
      <div style={{position: 'absolute', left: 520, top: 0, width: 480, height: 760, ...nb('#FFE5E2', 8), borderColor: NBK, overflow: 'hidden', transform: `translateX(${glitch}px)`}}>
        <div style={{...CAP, fontSize: 26, color: LR, margin: 26}}>Ce qu'ils FONT</div>
        <svg width={480} height={330} style={{position: 'absolute', left: 0, top: 80, opacity: dq}}>
          <rect x={250} y={190} width={180} height={24} fill={LR} stroke={NBK} strokeWidth={4} /><rect x={250} y={190} width={180} height={24} fill="url(#stp)" />
          <defs><pattern id="stp" width="40" height="24" patternUnits="userSpaceOnUse"><rect width="20" height="24" fill="#fff" /></pattern></defs>
          <rect x={262} y={214} width={14} height={90} fill={NBK} /><rect x={404} y={214} width={14} height={90} fill={NBK} />
          <g transform={`translate(${80 + Math.min(1, k / 1.2) * 300} ${150 - Math.sin(Math.min(1, k / 1.2) * Math.PI) * 120})`}>
            <circle cx={0} cy={-60} r={22} fill="#6B4A2E" /><rect x={-20} y={-36} width={40} height={70} rx={14} fill={LN} />
            <line x1={-10} y1={34} x2={-34 + Math.sin(k * 14) * 18} y2={90} stroke={NBK} strokeWidth={12} strokeLinecap="round" /><line x1={10} y1={34} x2={34 - Math.sin(k * 14) * 18} y2={90} stroke={NBK} strokeWidth={12} strokeLinecap="round" />
            <rect x={22} y={-20} width={40} height={30} rx={4} fill="#8A5A2B" stroke={NBK} strokeWidth={3} />
          </g>
          <g transform="translate(400 70)"><circle r={46} fill="#fff" stroke={NBK} strokeWidth={5} /><line x1={0} y1={0} x2={0} y2={-34} stroke={NBK} strokeWidth={5} transform={`rotate(${t * 360})`} /><line x1={0} y1={0} x2={22} y2={0} stroke={NBK} strokeWidth={5} /></g>
        </svg>
        <div style={{position: 'absolute', left: 30, top: 440, width: 420, ...nb('#fff', 5), borderColor: NBK, padding: '18px 20px', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK, transform: `scale(${dq})`, transformOrigin: '20% 0'}}>{doIt[0]}</div>
      </div>
      {t > doIt[1] + 0.3 && <div style={{position: 'absolute', left: 470, top: 300, width: 60, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 120, color: LR, transform: `scale(${Math.min(1, sp(t, doIt[1] + 0.3, 9, 10))})`, textShadow: `4px 4px 0 ${NBK}`}}>≠</div>}
    </Abs>
  );
};

/* ═════════════ 8. Calendrier qui s'effeuille sur une pellicule : chaque jour ═════════════ */
const LDaily: React.FC<{cy: number; at: number; dur: number}> = ({cy, at, dur}) => {
  const t = useT();
  const p = prog(t, at, at + dur, lin);
  const day = 1 + Math.floor(p * 29);
  const fl = (p * 29) % 1;
  return (
    <>
      <Abs x={0} y={cy + 200} w={1080} h={150} style={{background: NBK, opacity: pop(t, at), overflow: 'hidden'}}>
        {Array.from({length: 30}, (_, i) => <div key={i} style={{position: 'absolute', left: ((i * 60 - t * 240) % 1800 + 1800) % 1800 - 60, top: 10, width: 36, height: 22, borderRadius: 5, background: '#EEE'}} />)}
        {Array.from({length: 30}, (_, i) => <div key={`b${i}`} style={{position: 'absolute', left: ((i * 60 - t * 240) % 1800 + 1800) % 1800 - 60, top: 118, width: 36, height: 22, borderRadius: 5, background: '#EEE'}} />)}
        {Array.from({length: 8}, (_, i) => <div key={`f${i}`} style={{position: 'absolute', left: ((i * 220 - t * 240) % 1760 + 1760) % 1760 - 220, top: 40, width: 200, height: 70, background: i % 2 ? '#2E4A72' : '#5B3A2E', border: '3px solid #EEE', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n={['HardHat', 'ShieldCheck', 'Users', 'Eye'][i % 4]} size={44} c="#fff" /></div>)}
      </Abs>
      <Abs x={340} y={cy - 260} w={400} h={420} style={{opacity: pop(t, at), perspective: 1000}}>
        <div style={{position: 'absolute', inset: 0, ...nb('#fff', 8), borderColor: NBK}}><div style={{height: 100, background: LR, borderBottom: `6px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', ...CAP, fontSize: 40, color: '#fff'}}>JOUR</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 200, color: NBK, textAlign: 'center', lineHeight: '300px'}}>{day}</div></div>
        <div style={{position: 'absolute', left: 0, top: 100, width: 400, height: 320, background: '#fff', border: `6px solid ${NBK}`, transformOrigin: '50% 0', transform: `rotateX(${fl * 160}deg)`, opacity: 1 - fl, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 200, color: '#B9C0C8'}}>{Math.max(1, day - 1)}</div>
      </Abs>
    </>
  );
};

/* ═════════════ 9. Balance : coût de la prévention contre coût d'un accident ═════════════ */
const LBalance: React.FC<{cy: number; at: number; tip: number; l: string; r: string}> = ({cy, at, tip, l, r}) => {
  const t = useT();
  const a = -16 * prog(t, tip, tip + 0.9, easeOut) + (t > tip + 0.9 ? Math.sin((t - tip - 0.9) * 6) * 1.5 * Math.exp(-(t - tip - 0.9)) : 0);
  const rad = (a * Math.PI) / 180;
  const lx = 540 - Math.cos(rad) * 320, ly = cy - Math.sin(rad) * 320 * -1;
  const rx = 540 + Math.cos(rad) * 320, ry = cy + Math.sin(rad) * 320 * -1;
  const pan = (x: number, y: number, label: string, c: string, big: boolean) => <g><line x1={x} y1={y} x2={x - 90} y2={y + 160} stroke={NBK} strokeWidth={4} /><line x1={x} y1={y} x2={x + 90} y2={y + 160} stroke={NBK} strokeWidth={4} /><path d={`M ${x - 120} ${y + 160} Q ${x} ${y + 230} ${x + 120} ${y + 160} Z`} fill={c} stroke={NBK} strokeWidth={6} />{big ? [0, 1, 2, 3, 4].map((i) => <rect key={i} x={x - 70 + (i % 3) * 50} y={y + 110 - Math.floor(i / 3) * 40} width={44} height={34} rx={6} fill={LR} stroke={NBK} strokeWidth={3} />) : <circle cx={x} cy={y + 140} r={22} fill={LG} stroke={NBK} strokeWidth={3} />}<text x={x} y={y + 280} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={36} fill={NBK}>{label}</text></g>;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <polygon points={`540,${cy - 20} 500,${cy + 420} 580,${cy + 420}`} fill="#8A96A8" stroke={NBK} strokeWidth={6} />
      <rect x={420} y={cy + 410} width={240} height={30} rx={10} fill="#5B6472" stroke={NBK} strokeWidth={5} />
      <line x1={lx} y1={ly} x2={rx} y2={ry} stroke={NBK} strokeWidth={16} strokeLinecap="round" />
      <circle cx={540} cy={cy} r={22} fill={LY} stroke={NBK} strokeWidth={5} />
      {pan(lx, ly, l, '#D7F5E3', false)}{pan(rx, ry, r, '#FFE0DC', true)}
    </svg>
  );
};

/* ═════════════ 10. Avion de papier (l'erreur) rattrapé par un filet (le système tolérant) ═════════════ */
const LPlane: React.FC<{cy: number; at: number; net: number}> = ({cy, at, net}) => {
  const t = useT();
  const p = prog(t, at, at + 2.0, easeIn);
  const x = lerp(80, 760, p), y = cy - 200 + Math.sin(p * Math.PI * 1.5) * 60 + p * p * 300;
  const nq = Math.min(1, sp(t, net, 8, 10));
  const caught = t > at + 2.0;
  const sag = caught ? 60 * Math.exp(-(t - at - 2.0) * 3) * Math.cos((t - at - 2.0) * 12) + 40 : 0;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
      <g opacity={nq}><line x1={560} y1={cy + 60} x2={560} y2={cy + 260} stroke={NBK} strokeWidth={8} /><line x1={980} y1={cy + 60} x2={980} y2={cy + 260} stroke={NBK} strokeWidth={8} />
        {Array.from({length: 9}, (_, i) => <path key={i} d={`M 560 ${cy + 80 + i * 18} Q 770 ${cy + 120 + i * 18 + sag} 980 ${cy + 80 + i * 18}`} fill="none" stroke={LG} strokeWidth={3} />)}
        {Array.from({length: 12}, (_, i) => <line key={`v${i}`} x1={560 + i * 38} y1={cy + 80} x2={560 + i * 38} y2={cy + 230 + Math.sin((i / 11) * Math.PI) * sag} stroke={LG} strokeWidth={3} />)}</g>
      <g transform={`translate(${caught ? 770 : x} ${caught ? cy + 140 + sag : y}) rotate(${caught ? 10 : 15 + p * 30})`} opacity={pop(t, at)}>
        <polygon points="-70,0 70,-10 -20,10" fill="#fff" stroke={NBK} strokeWidth={4} /><polygon points="-70,0 70,-10 -30,40" fill="#E6EAF0" stroke={NBK} strokeWidth={4} />
      </g>
      {!caught && <path d={Array.from({length: 20}, (_, i) => { const pp = Math.max(0, p - i * 0.02); return `${i ? 'L' : 'M'} ${lerp(80, 760, pp)} ${cy - 200 + Math.sin(pp * Math.PI * 1.5) * 60 + pp * pp * 300}`; }).join(' ')} fill="none" stroke="#B9C0C8" strokeWidth={4} strokeDasharray="8 10" />}
    </svg>
  );
};

/* ═════════════ 11. Carte de loi : le numéro se retourne comme une plaque de gare ═════════════ */
const LLaw: React.FC<{n: number; title: string; at: number; c?: string; y?: number}> = ({n, title, at, c = LN, y = 470}) => {
  const t = useT();
  const f = prog(t, at, at + 0.7, easeOut);
  const digits = String(n).padStart(2, '0').split('');
  return (
    <Abs x={60} y={y} w={960} h={300} style={{opacity: pop(t, at - 0.1)}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 960, height: 300, ...nb('#fff', 10), borderColor: NBK, boxShadow: `10px 10px 0 ${c}`}} />
      <div style={{position: 'absolute', left: 30, top: 30, ...CAP, fontSize: 26, color: DIM}}>Loi n°</div>
      <div style={{position: 'absolute', left: 30, top: 80, display: 'flex', gap: 10, perspective: 600}}>
        {digits.map((d, i) => { const fi = prog(t, at + i * 0.15, at + i * 0.15 + 0.5, easeOut); return <div key={i} style={{position: 'relative', width: 110, height: 170, background: NBK, borderRadius: 14, overflow: 'hidden'}}><div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 140, color: LY}}>{d}</div><div style={{position: 'absolute', left: 0, top: 0, width: 110, height: 85, background: '#2B3038', transformOrigin: '50% 100%', transform: `rotateX(${fi * 180}deg)`, backfaceVisibility: 'hidden'}} /><div style={{position: 'absolute', left: 0, top: 84, width: 110, height: 3, background: '#000'}} /></div>; })}
      </div>
      <div style={{position: 'absolute', left: 290, top: 60, width: 640, fontFamily: sansFont, fontWeight: 900, fontSize: title.length > 40 ? 40 : 48, lineHeight: 1.15, color: INK, opacity: f, transform: `translateX(${(1 - f) * 40}px)`}}>{title}</div>
    </Abs>
  );
};

/* ═════════════ 12. Le manuel fermé dont la lumière s'échappe : ce qu'on ne trouve pas dans les manuels ═════════════ */
const LBook: React.FC<{cx: number; cy: number; at: number; open: number}> = ({cx, cy, at, open}) => {
  const t = useT();
  const o = prog(t, open, open + 1.0, easeOut);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      {o > 0 && Array.from({length: 9}, (_, i) => { const a = -60 + i * 15; const L = 520 * o; return <polygon key={i} points={`${cx},${cy - 40} ${cx + Math.sin(((a - 4) * Math.PI) / 180) * L},${cy - 40 - Math.cos(((a - 4) * Math.PI) / 180) * L} ${cx + Math.sin(((a + 4) * Math.PI) / 180) * L},${cy - 40 - Math.cos(((a + 4) * Math.PI) / 180) * L}`} fill={LY} opacity={0.25 + 0.15 * Math.sin(t * 4 + i)} />; })}
      <g transform={`translate(${cx} ${cy})`}>
        <rect x={-260} y={-40} width={520} height={200} rx={10} fill="#E6E9EE" stroke={NBK} strokeWidth={6} />
        {Array.from({length: 6}, (_, i) => <line key={i} x1={-250} y1={-20 + i * 30} x2={250} y2={-20 + i * 30} stroke="#B9C0C8" strokeWidth={3} />)}
        <g transform={`translate(0 -40) scale(1 ${1 - 1.75 * o}) translate(0 40)`}><rect x={-262} y={-40} width={524} height={200} rx={10} fill={1 - 1.75 * o > 0 ? LN : "#2B4C80"} stroke={NBK} strokeWidth={6} /><rect x={-200} y={30} width={400} height={60} rx={8} fill="#fff" opacity={1 - 1.75 * o > 0 ? 1 : 0} /><text x={0} y={72} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={30} fill={NBK} opacity={1 - 1.75 * o > 0 ? 1 : 0}>MANUEL QHSE</text></g>
        <rect x={-260} y={150} width={520} height={30} rx={8} fill={LN} stroke={NBK} strokeWidth={6} />
        
      </g>
      {o > 0.5 && Array.from({length: 12}, (_, i) => { const u = ((t * 0.5 + i / 12) % 1); return <circle key={i} cx={cx - 200 + random(`bk${i}`) * 400} cy={cy - 60 - u * 480} r={6 + (i % 3) * 3} fill={LY} opacity={1 - u} />; })}
    </svg>
  );
};

/* ═════════════ 13. Empreintes du leader : les autres marchent dans ses pas ═════════════ */
const LSteps: React.FC<{y: number; at: number; follow: number}> = ({y, at, follow}) => {
  const t = useT();
  const n = 9;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      {Array.from({length: n}, (_, i) => { const x = 120 + i * 105, yy = y + (i % 2 ? 50 : -10); const q = prog(t, at + i * 0.25, at + i * 0.25 + 0.2); const f2 = prog(t, follow + i * 0.25, follow + i * 0.25 + 0.2); return <g key={i} transform={`translate(${x} ${yy}) rotate(90)`}><ellipse rx={20} ry={36} fill={LN} opacity={q} /><ellipse cy={-48} rx={14} ry={12} fill={LN} opacity={q} /><ellipse rx={14} ry={26} fill={LY} opacity={f2 * 0.9} /></g>; })}
      <g transform={`translate(${120 + Math.min(n - 1, Math.max(0, (t - at) / 0.25)) * 105} ${y - 180})`}><circle r={34} fill="#6B4A2E" /><rect x={-30} y={34} width={60} height={110} rx={20} fill={LN} stroke={NBK} strokeWidth={4} /><path d="M -40 -20 Q 0 -70 40 -20 Z" fill={LY} stroke={NBK} strokeWidth={4} /></g>
    </svg>
  );
};

/* ═════════════ 14. Sceau de cire « confidentiel » qui se fend : le secret de Polichinelle ═════════════ */
const LSeal: React.FC<{cx: number; cy: number; at: number; crack: number}> = ({cx, cy, at, crack}) => {
  const t = useT();
  const c = prog(t, crack, crack + 0.5, easeOut);
  const o = prog(t, crack + 0.4, crack + 1.2, easeInOut);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <rect x={cx - 360} y={cy - 220} width={720} height={440} rx={14} fill="#F3E3C3" stroke={NBK} strokeWidth={7} />
      <g transform={`translate(0 ${cy - 220}) scale(1 ${1 - 2 * o}) translate(0 ${-(cy - 220)})`}><polygon points={`${cx - 360},${cy - 220} ${cx + 360},${cy - 220} ${cx},${cy + 40}`} fill="#E8D3A8" stroke={NBK} strokeWidth={7} strokeLinejoin="round" /></g>
      <polyline points={`${cx - 360},${cy + 220} ${cx},${cy - 10} ${cx + 360},${cy + 220}`} fill="none" stroke={NBK} strokeWidth={5} opacity={0.4} />
      {o > 0.3 && <text x={cx} y={cy + 40 - o * 160} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={170} fill={LY} stroke={NBK} strokeWidth={6} opacity={o}>25</text>}
      <g transform={`translate(${cx} ${cy + 30}) scale(${1 - o * 0.3})`} opacity={1 - o}>
        {[-1, 1].map((sd) => <g key={sd} transform={`translate(${sd * c * 30} ${c * 20}) rotate(${sd * c * 20})`}><path d={sd < 0 ? 'M 0 -80 A 80 80 0 0 0 0 80 L 10 30 L -10 0 L 8 -40 Z' : 'M 0 -80 A 80 80 0 0 1 0 80 L 10 30 L -10 0 L 8 -40 Z'} fill="#B3202B" stroke={NBK} strokeWidth={5} /></g>)}
        <text y={14} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={22} fill="#FFD9D9" opacity={1 - c}>SECRET</text>
      </g>
    </svg>
  );
};

/* ═════════════ 15. Gravure au laser dans la tête : l'expérience qui s'imprime ═════════════ */
const LEngrave: React.FC<{cx: number; cy: number; at: number; burn: number; text: string}> = ({cx, cy, at, burn, text}) => {
  const t = useT();
  const p = prog(t, burn, burn + 1.6, lin);
  const n = Math.floor(text.length * p);
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <path d={`M ${cx - 120} ${cy + 300} L ${cx - 120} ${cy + 180} Q ${cx - 260} ${cy + 120} ${cx - 250} ${cy - 40} Q ${cx - 240} ${cy - 260} ${cx} ${cy - 280} Q ${cx + 250} ${cy - 280} ${cx + 270} ${cy - 60} L ${cx + 330} ${cy + 40} L ${cx + 280} ${cy + 60} L ${cx + 290} ${cy + 140} Q ${cx + 280} ${cy + 200} ${cx + 180} ${cy + 190} L ${cx + 170} ${cy + 300} Z`} fill="#E6EAF0" stroke={NBK} strokeWidth={8} strokeLinejoin="round" />
        {p > 0 && p < 1 && <><line x1={cx + 600} y1={cy - 500} x2={cx - 160 + p * 340} y2={cy - 40} stroke={LR} strokeWidth={6} style={{filter: `drop-shadow(0 0 10px ${LR})`}} />{Array.from({length: 8}, (_, i) => <circle key={i} cx={cx - 160 + p * 340 + (random(`eg${i}${Math.floor(t * 30)}`) - 0.5) * 60} cy={cy - 40 + (random(`eh${i}${Math.floor(t * 30)}`) - 0.5) * 60} r={4} fill={LY} />)}</>}
      </svg>
      <div style={{position: 'absolute', left: cx - 200, top: cy - 90, width: 400, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: '#5A2A10', textShadow: '0 0 8px rgba(255,120,0,0.8)', letterSpacing: 2}}>{text.slice(0, n)}</div>
    </>
  );
};

/* ═════════════ 16. Classeurs qui s'empilent, coches d'audit… puis les incidents éclatent quand même ═════════════ */
const LBinders: React.FC<{at: number; audit: number; boom: number}> = ({at, audit, boom}) => {
  const t = useT();
  const sh = t > boom && t < boom + 0.5 ? Math.sin((t - boom) * 70) * 10 : 0;
  return (
    <AbsoluteFill style={{transform: `translateX(${sh}px)`}}>
      {Array.from({length: 7}, (_, i) => { const q = Math.min(1, sp(t, at + i * 0.18, 9, 12)); return <div key={i} style={{position: 'absolute', left: 120 + i * 62, top: 640 - (1 - q) * 300, width: 58, height: 420, background: [LN, LB, LG, LY, LR, '#6D4BD8', '#0F9D8F'][i], border: `5px solid ${NBK}`, borderRadius: 8, opacity: q}}><div style={{margin: '30px 8px', height: 120, background: '#fff', borderRadius: 4}} /><div style={{position: 'absolute', left: 14, bottom: 40, width: 22, height: 22, borderRadius: 11, border: `4px solid ${NBK}`, background: '#fff'}} /></div>; })}
      <Abs x={600} y={640} w={380} h={420} style={{...nb('#fff', 8), borderColor: NBK, opacity: pop(t, audit)}}>
        <div style={{...CAP, fontSize: 22, color: LN, margin: 20}}>Audit</div>
        {[0, 1, 2, 3].map((i) => { const c = prog(t, audit + 0.3 + i * 0.25, audit + 0.5 + i * 0.25); return <div key={i} style={{display: 'flex', alignItems: 'center', gap: 14, margin: '18px 24px'}}><div style={{width: 44, height: 44, border: `4px solid ${NBK}`, borderRadius: 8, background: c > 0.5 ? LG : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 30}}>{c > 0.5 ? '✓' : ''}</div><div style={{height: 14, width: 200, borderRadius: 7, background: '#D5DAE2'}} /></div>; })}
      </Abs>
      {t > boom && [[180, 560], [820, 600], [420, 1120], [760, 1150], [260, 900], [940, 980]].map(([x, y], i) => { const q = Math.min(1, sp(t, boom + i * 0.12, 8, 9)); return <div key={i} style={{position: 'absolute', left: x - 70, top: y - 70, width: 140, height: 140, transform: `scale(${q}) rotate(${(i % 2 ? 1 : -1) * 10}deg)`, filter: `drop-shadow(0 0 16px ${LR})`}}><Ico n="TriangleAlert" size={140} c={LR} /></div>; })}
    </AbsoluteFill>
  );
};

/* ═════════════ 17. Deux rails qui divergent : ce qui est écrit / ce qui se passe vraiment ═════════════ */
const LGap: React.FC<{cy: number; at: number; split: number}> = ({cy, at, split}) => {
  const t = useT();
  const d = prog(t, split, split + 1.8, easeInOut);
  const y1 = (x: number) => cy - 140 * d * Math.max(0, (x - 200) / 760), y2 = (x: number) => cy + 140 * d * Math.max(0, (x - 200) / 760);
  const pts = (f: (x: number) => number) => Array.from({length: 40}, (_, i) => { const x = 80 + i * 24; return `${x},${f(x)}`; }).join(' ');
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <polyline points={pts(y1)} fill="none" stroke={LN} strokeWidth={16} strokeLinecap="round" />
      <polyline points={pts(y2)} fill="none" stroke={LR} strokeWidth={16} strokeLinecap="round" strokeDasharray="1 0" />
      <text x={90} y={cy - 190} fontFamily={sansFont} fontWeight={900} fontSize={46} fill={LN}>▲ Ce qui est écrit</text>
      <text x={90} y={cy + 230} fontFamily={sansFont} fontWeight={900} fontSize={46} fill={LR}>▼ Ce qui se passe vraiment</text>
      {d > 0.3 && <g opacity={d}><line x1={980} y1={y1(980) + 20} x2={980} y2={y2(980) - 20} stroke={NBK} strokeWidth={5} /><polygon points={`968,${y1(980) + 30} 992,${y1(980) + 30} 980,${y1(980) + 10}`} fill={NBK} /><polygon points={`968,${y2(980) - 30} 992,${y2(980) - 30} 980,${y2(980) - 10}`} fill={NBK} /><text x={940} y={cy + 12} textAnchor="end" fontFamily={MONO} fontWeight={700} fontSize={30} fill={NBK}>DÉCALAGE</text></g>}
    </svg>
  );
};

/* ═════════════ 18. Grille des 25 lois : les tuiles se retournent en vague ═════════════ */
const L25: React.FC<{x: number; y: number; at: number; lit?: number[]; w?: number}> = ({x, y, at, lit = [], w = 900}) => {
  const t = useT();
  const c = w / 5;
  return (
    <Abs x={x} y={y} w={w} h={w} style={{perspective: 1400}}>
      {Array.from({length: 25}, (_, i) => { const r = Math.floor(i / 5), col = i % 5; const d = (r + col) * 0.08; const f = prog(t, at + d, at + d + 0.5, easeOut); const on = lit.includes(i + 1); return <div key={i} style={{position: 'absolute', left: col * c + 6, top: r * c + 6, width: c - 12, height: c - 12, borderRadius: 14, border: `5px solid ${NBK}`, background: f > 0.5 ? (on ? LY : '#fff') : LN, transform: `rotateY(${(1 - f) * 180}deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontWeight: 700, fontSize: c * 0.38, color: on ? NBK : LN, boxShadow: on && f > 0.9 ? `0 0 24px ${LY}` : `5px 5px 0 ${NBK}`}}>{f > 0.5 ? i + 1 : ''}</div>; })}
    </Abs>
  );
};

/* ═════════════ 19. Marionnettiste : les lois invisibles tirent les fils de Q, S et E ═════════════ */
const LPuppet: React.FC<{at: number; labels: [string, string, number][]}> = ({at, labels}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const bar = Math.sin(k * 1.8) * 14;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <g transform={`rotate(${bar} 540 520)`}><rect x={240} y={505} width={600} height={30} rx={12} fill="#8A5A2B" stroke={NBK} strokeWidth={5} /><rect x={525} y={440} width={30} height={160} rx={12} fill="#8A5A2B" stroke={NBK} strokeWidth={5} /></g>
      {labels.map(([l, c, a], i) => { const x = 270 + i * 270; const sway = Math.sin(k * 2.2 + i) * 18; const by = 940 + Math.sin(k * 2 + i * 1.3) * 30; const q = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0.25; const sx = 540 + (x - 540) * Math.cos((bar * Math.PI) / 180), sy = 520 + (x - 540) * Math.sin((bar * Math.PI) / 180); return <g key={l}><line x1={sx} y1={sy} x2={x + sway} y2={by - 110} stroke={NBK} strokeWidth={2.5} strokeDasharray="10 6" /><g transform={`translate(${x + sway} ${by}) scale(${q})`}><rect x={-115} y={-110} width={230} height={220} rx={30} fill={c} stroke={NBK} strokeWidth={6} /><text y={30} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={110} fill="#fff">{l[0]}</text><text y={160} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={34} fill={NBK}>{l}</text></g></g>; })}
    </svg>
  );
};

/* ═════════════ 20. Organigramme vivant : les impulsions circulent (la dynamique d'une organisation) ═════════════ */
const LOrg: React.FC<{at: number; cy: number}> = ({at, cy}) => {
  const t = useT();
  const nodes: [number, number][] = [[540, cy - 260], [300, cy - 40], [780, cy - 40], [180, cy + 200], [420, cy + 200], [660, cy + 200], [900, cy + 200]];
  const edges: [number, number][] = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [4, 5]];
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      {edges.map(([a, b], i) => { const [x1, y1] = nodes[a], [x2, y2] = nodes[b]; const u = ((t - at) * 0.8 + i * 0.17) % 1; return <g key={i}><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8A96A8" strokeWidth={5} /><circle cx={lerp(x1, x2, u)} cy={lerp(y1, y2, u)} r={10} fill={LY} stroke={NBK} strokeWidth={3} /></g>; })}
      {nodes.map(([x, y], i) => { const q = Math.min(1, sp(t, at + i * 0.08, 9, 12)); const pulse = 1 + 0.06 * Math.sin(t * 5 + i); return <g key={i} transform={`translate(${x} ${y}) scale(${q * pulse})`}><circle r={i === 0 ? 70 : 52} fill={i === 0 ? LN : '#fff'} stroke={NBK} strokeWidth={6} /><circle cy={-12} r={14} fill={i === 0 ? '#fff' : LN} /><path d="M -24 28 Q -24 6 0 6 Q 24 6 24 28 Z" fill={i === 0 ? '#fff' : LN} /></g>; })}
    </svg>
  );
};

/* ═════════════ 21. Silhouette au centre, orbite des comportements / perceptions / faiblesses ═════════════ */
const LOrbit: React.FC<{cx: number; cy: number; at: number; items: [string, number, string][]}> = ({cx, cy, at, items}) => {
  const t = useT();
  const n = items.length;
  const els = items.map(([l, a, c], i) => { const th = (i / n) * Math.PI * 2 + (t - at) * 0.8; return {l, a, c, x: Math.cos(th) * 360, z: Math.sin(th)}; }).sort((u, v) => u.z - v.z);
  const back = els.filter((e) => e.z < 0), front = els.filter((e) => e.z >= 0);
  const chip = ({l, a, c, x, z}: {l: string; a: number; c: string; x: number; z: number}) => { const q = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0; return <div key={l} style={{position: 'absolute', left: cx + x, top: cy + z * 140, transform: `translate(-50%, -50%) scale(${q * (0.75 + 0.25 * (z + 1) / 2)})`, ...nb(c, 6), borderColor: NBK, padding: '12px 24px', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff', whiteSpace: 'nowrap', opacity: 0.55 + 0.45 * (z + 1) / 2}}>{l}</div>; };
  return (
    <>
      {back.map(chip)}
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <ellipse cx={cx} cy={cy} rx={360} ry={140} fill="none" stroke="#B9C0C8" strokeWidth={4} strokeDasharray="10 12" />
        <circle cx={cx} cy={cy - 150} r={70} fill={LN} /><path d={`M ${cx - 120} ${cy + 180} Q ${cx - 120} ${cy - 60} ${cx} ${cy - 60} Q ${cx + 120} ${cy - 60} ${cx + 120} ${cy + 180} Z`} fill={LN} />
        <circle cx={cx} cy={cy - 150} r={70 + 10 * Math.sin(t * 3)} fill="none" stroke={LY} strokeWidth={6} opacity={0.6} />
      </svg>
      {front.map(chip)}
    </>
  );
};

/* ═════════════ 22. La responsabilité glisse : un jeton qui descend le rail de l'opérateur au concepteur ═════════════ */
const LSlide: React.FC<{cy: number; at: number; slide: number}> = ({cy, at, slide}) => {
  const t = useT();
  const tilt = prog(t, slide - 0.4, slide, easeOut) * 12;
  const p = prog(t, slide, slide + 1.4, easeIn);
  const x = lerp(220, 860, p);
  const rad = (tilt * Math.PI) / 180;
  const y = cy - 40 - Math.tan(rad) * (540 - x);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <g transform={`rotate(${tilt} 540 ${cy})`}><rect x={120} y={cy} width={840} height={24} rx={12} fill="#8A96A8" stroke={NBK} strokeWidth={5} /></g>
      <polygon points={`540,${cy + 24} 500,${cy + 120} 580,${cy + 120}`} fill="#5B6472" stroke={NBK} strokeWidth={5} />
      <g transform={`translate(${x} ${y})`}><rect x={-120} y={-80} width={240} height={80} rx={20} fill={LY} stroke={NBK} strokeWidth={6} /><text y={-30} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={24} fill={NBK}>RESPONSABILITÉ</text></g>
      <text x={160} y={cy + 190} fontFamily={sansFont} fontWeight={900} fontSize={34} fill={DIM}>Opérateur</text>
      <text x={940} y={cy + 190} textAnchor="end" fontFamily={sansFont} fontWeight={900} fontSize={34} fill={p > 0.95 ? LN : DIM}>Concepteur du système</text>
    </svg>
  );
};

/* ═════════════ 23. Batterie qui se vide : la fatigue invisible ═════════════ */
const LBattery: React.FC<{x: number; y: number; at: number; drain: number}> = ({x, y, at, drain}) => {
  const t = useT();
  const lvl = 1 - 0.88 * prog(t, at, at + drain, easeInOut);
  const c = lvl > 0.5 ? LG : lvl > 0.25 ? LY : LR;
  const blink = lvl < 0.2 ? (Math.floor(t * 4) % 2 ? 1 : 0.4) : 1;
  return (
    <Abs x={x} y={y} w={320} h={520} style={{opacity: pop(t, at)}}>
      <div style={{position: 'absolute', left: 110, top: 0, width: 100, height: 40, background: NBK, borderRadius: '10px 10px 0 0'}} />
      <div style={{position: 'absolute', left: 20, top: 36, width: 280, height: 460, border: `10px solid ${NBK}`, borderRadius: 30, background: '#fff', overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 10, right: 10, bottom: 10, height: `${lvl * 420}px`, background: c, borderRadius: 14, opacity: blink}} />
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: NBK}}><Ico n="Zap" size={110} c={NBK} /></div>
      </div>
    </Abs>
  );
};

/* ═════════════ 24. Trois engrenages du système : culture, complexité, coûts ═════════════ */
const LTri: React.FC<{cy: number; at: number; items: [string, number, string][]}> = ({cy, at, items}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const pos: [number, number, number][] = [[300, cy - 120, 170], [720, cy - 60, 150], [470, cy + 240, 140]];
  const gp = (r: number, n: number) => { const pts: string[] = []; for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * Math.PI * 2; const rr = i % 2 ? r : r + 24; const a2 = a + Math.PI / (n * 2); pts.push(`${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)}`, `${(Math.cos(a2) * rr).toFixed(1)},${(Math.sin(a2) * rr).toFixed(1)}`); } return `M ${pts.join(' L ')} Z`; };
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
      {items.map(([l, a, c], i) => { const [x, y, r] = pos[i]; const q = t > a ? Math.min(1, sp(t, a, 8, 11)) : 0; return <g key={l} transform={`translate(${x} ${y}) scale(${q})`}><g transform={`rotate(${(i % 2 ? -1 : 1) * k * 30 * (170 / r)})`}><path d={gp(r, 11)} fill={c} stroke={NBK} strokeWidth={6} /></g><circle r={r * 0.62} fill="#fff" stroke={NBK} strokeWidth={6} /><text y={12} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={r > 150 ? 38 : 32} fill={NBK}>{l}</text></g>; })}
    </svg>
  );
};

/* ═════════════ 25. Boucle de la routine : la vigilance se vide à chaque tour ═════════════ */
const LRoutine: React.FC<{cx: number; cy: number; at: number; danger: number}> = ({cx, cy, at, danger}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const vig = Math.max(0.08, 1 - k / Math.max(0.1, danger - at));
  const R = 230;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#D5DAE2" strokeWidth={40} />
      <g transform={`rotate(${k * 160} ${cx} ${cy})`}><path d={`M ${cx + R} ${cy} A ${R} ${R} 0 1 1 ${cx} ${cy - R}`} fill="none" stroke={LN} strokeWidth={40} strokeLinecap="round" /><polygon points={`${cx - 40},${cy - R - 40} ${cx + 30},${cy - R} ${cx - 40},${cy - R + 40}`} fill={LN} /></g>
      <text x={cx} y={cy - 10} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={56} fill={NBK}>Routine</text>
      <text x={cx} y={cy + 50} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={26} fill={DIM}>TOUR {1 + Math.floor(k * 160 / 360)}</text>
      <rect x={cx + R + 70} y={cy - 220} width={60} height={440} rx={14} fill="#fff" stroke={NBK} strokeWidth={6} />
      <rect x={cx + R + 80} y={cy - 210 + 420 * (1 - vig)} width={40} height={420 * vig} rx={8} fill={vig > 0.5 ? LG : vig > 0.25 ? LY : LR} />
      <text x={cx + R + 100} y={cy + 270} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={22} fill={NBK}>VIGILANCE</text>
      {t > danger && <g transform={`translate(${cx} ${cy}) scale(${Math.min(1, sp(t, danger, 8, 9))})`}><polygon points="0,-110 100,70 -100,70" fill={LR} stroke={NBK} strokeWidth={6} /><text y={50} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={110} fill="#fff">!</text></g>}
    </svg>
  );
};

/* ═════════════ 26. Neuf fois sur dix : jauge de dix points ═════════════ */
const LNine: React.FC<{y: number; at: number}> = ({y, at}) => {
  const t = useT();
  return (
    <Abs x={60} y={y} w={960} h={140} style={{display: 'flex', justifyContent: 'center', gap: 14}}>
      {Array.from({length: 10}, (_, i) => { const q = Math.min(1, sp(t, at + i * 0.08, 9, 12)); const red = i < 9; return <div key={i} style={{width: 80, height: 80, borderRadius: 40, border: `5px solid ${NBK}`, background: red ? LR : LG, transform: `scale(${q})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 40}}>{red ? '✕' : '✓'}</div>; })}
    </Abs>
  );
};

/* ═════════════ 27. Graine qui pousse en arbre à pièces : la prévention, un investissement ═════════════ */
const LPlant: React.FC<{cx: number; base: number; at: number}> = ({cx, base, at}) => {
  const t = useT();
  const g = prog(t, at, at + 1.6, easeOut);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at - 0.2)}}>
      <path d={`M ${cx - 180} ${base} Q ${cx} ${base - 60} ${cx + 180} ${base} Z`} fill="#8A5A2B" stroke={NBK} strokeWidth={5} />
      <path d={`M ${cx} ${base - 20} C ${cx - 20} ${base - 160}, ${cx + 30} ${base - 260}, ${cx} ${base - 20 - 380 * g}`} fill="none" stroke="#3F7D2C" strokeWidth={16} strokeLinecap="round" />
      {[[-110, -220, 0.3], [100, -270, 0.45], [-90, -350, 0.6], [80, -400, 0.75]].map(([dx, dy, d], i) => { const q = prog(t, at + (d as number) * 1.6, at + (d as number) * 1.6 + 0.4, easeOut); return <g key={i} transform={`translate(${cx + (dx as number) * q} ${base + (dy as number)}) scale(${q})`}><path d="M 0 0 C -40 -30 -70 -10 -80 10 C -40 20 -20 10 0 0 Z" fill={LG} stroke={NBK} strokeWidth={3} transform={`scale(${(dx as number) < 0 ? 1 : -1} 1)`} /><circle cx={(dx as number) < 0 ? -60 : 60} cy={-30} r={30} fill={LY} stroke={NBK} strokeWidth={4} /><text x={(dx as number) < 0 ? -60 : 60} y={-20} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={30} fill={NBK}>€</text></g>; })}
    </svg>
  );
};

/* ═════════════ 28. Pyramide qui s'assemble, la pierre du sommet s'illumine (le leadership) ═════════════ */
const LPyramid: React.FC<{cy: number; at: number; levels: [string, string, number][]}> = ({cy, at, levels}) => {
  const t = useT();
  const n = levels.length;
  const H = 520, W0 = 860;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      {levels.map(([l, c, a], i) => { const yb = cy + H / 2 - (i * H) / n, yt = cy + H / 2 - ((i + 1) * H) / n; const wb = W0 * (1 - i / n), wt = W0 * (1 - (i + 1) / n); const q = t > a ? Math.min(1, sp(t, a, 8, 11)) : 0; const top = i === n - 1; return (
        <g key={l} transform={`translate(0 ${(1 - q) * -400})`} opacity={q}>
          <polygon points={`${540 - wb / 2},${yb} ${540 + wb / 2},${yb} ${540 + wt / 2},${yt} ${540 - wt / 2},${yt}`} fill={c} stroke={NBK} strokeWidth={6} strokeLinejoin="round" style={top && q > 0.9 ? {filter: `drop-shadow(0 0 ${24 + 10 * Math.sin(t * 5)}px ${LY})`} : undefined} />
          <text x={540} y={(yb + yt) / 2 + 14} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={top ? 34 : 42} fill={top ? NBK : '#fff'}>{l}</text>
        </g>
      ); })}
    </svg>
  );
};

/* ═════════════ 29. Arche de pierres : la clé de voûte tombe et tout tient ═════════════ */
const LArch: React.FC<{cx: number; cy: number; at: number; key0: number}> = ({cx, cy, at, key0}) => {
  const t = useT();
  const R1 = 300, R2 = 190, n = 9;
  const kq = Math.min(1, sp(t, key0, 7, 9));
  const stones = Array.from({length: n}, (_, i) => { const a0 = Math.PI - (i / n) * Math.PI, a1 = Math.PI - ((i + 1) / n) * Math.PI; return `M ${cx + Math.cos(a0) * R1} ${cy - Math.sin(a0) * R1} A ${R1} ${R1} 0 0 1 ${cx + Math.cos(a1) * R1} ${cy - Math.sin(a1) * R1} L ${cx + Math.cos(a1) * R2} ${cy - Math.sin(a1) * R2} A ${R2} ${R2} 0 0 0 ${cx + Math.cos(a0) * R2} ${cy - Math.sin(a0) * R2} Z`; });
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      {stones.map((d, i) => { const isKey = i === 4; const q = isKey ? kq : Math.min(1, sp(t, at + Math.abs(i - 4) * 0.1, 9, 12)); return <path key={i} d={d} fill={isKey ? LY : '#C9B79C'} stroke={NBK} strokeWidth={5} transform={isKey ? `translate(0 ${(1 - kq) * -500})` : `translate(0 ${(1 - q) * 60})`} opacity={isKey ? (t > key0 ? 1 : 0) : q} style={isKey && kq > 0.95 ? {filter: `drop-shadow(0 0 20px ${LY})`} : undefined} />; })}
      <rect x={cx - R1} y={cy} width={R1 - R2} height={260} fill="#C9B79C" stroke={NBK} strokeWidth={5} /><rect x={cx + R2} y={cy} width={R1 - R2} height={260} fill="#C9B79C" stroke={NBK} strokeWidth={5} />
      {t > key0 + 0.35 && t < key0 + 0.9 && <circle cx={cx} cy={cy - 245} r={40 + (t - key0 - 0.35) * 300} fill="none" stroke={LY} strokeWidth={8} opacity={1 - (t - key0 - 0.35) / 0.55} />}
    </svg>
  );
};

/* ═════════════ 30. Signature qui se trace… puis se barre (« ce n'est pas juste signer un papier ») ═════════════ */
const LSign: React.FC<{cx: number; cy: number; at: number; ban: number}> = ({cx, cy, at, ban}) => {
  const t = useT();
  const p = prog(t, at + 0.2, at + 1.2, lin);
  const b = prog(t, ban, ban + 0.35, easeOut);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <rect x={cx - 300} y={cy - 220} width={600} height={420} rx={10} fill="#fff" stroke={NBK} strokeWidth={6} transform={`rotate(-3 ${cx} ${cy})`} />
      {Array.from({length: 5}, (_, i) => <rect key={i} x={cx - 250} y={cy - 170 + i * 44} width={i === 4 ? 260 : 500} height={14} rx={7} fill="#D5DAE2" transform={`rotate(-3 ${cx} ${cy})`} />)}
      <path d={`M ${cx - 200} ${cy + 130} c 30 -60 50 -60 60 0 s 30 50 50 -10 s 30 -60 50 0 s 40 40 70 -20 s 40 10 90 -10`} fill="none" stroke={LN} strokeWidth={7} strokeLinecap="round" pathLength={1} strokeDasharray={`${p} 1`} />
      {b > 0 && <><line x1={cx - 330} y1={cy + 230} x2={cx - 330 + 660 * b} y2={cy + 230 - 480 * b} stroke={LR} strokeWidth={26} strokeLinecap="round" /></>}
    </svg>
  );
};

/* ═════════════ 31. Tricot : la culture sécurité se tricote rang après rang ═════════════ */
const LKnit: React.FC<{cx: number; top: number; at: number; dur: number; rows?: number}> = ({cx, top, at, dur, rows = 12}) => {
  const t = useT();
  const p = prog(t, at, at + dur, lin);
  const R = Math.floor(p * rows);
  const cols = 9, cw = 60, rh = 38;
  const x0 = cx - (cols * cw) / 2;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      {Array.from({length: Math.min(rows, R + 1)}, (_, r) => Array.from({length: cols}, (_, c) => { const done = r < R || c < Math.floor(((p * rows) % 1) * cols); if (!done) return null; const x = x0 + c * cw, y = top + r * rh; const col = [LR, LY, LN, LG][Math.floor(r / 3) % 4]; return <path key={`${r}-${c}`} d={`M ${x + 4} ${y} Q ${x + cw / 2} ${y + rh + 10} ${x + cw - 4} ${y} Q ${x + cw / 2} ${y + 14} ${x + 4} ${y} Z`} fill={col} stroke={NBK} strokeWidth={2.5} />; }))}
      {[-1, 1].map((sd) => <line key={sd} x1={cx + sd * 40 + Math.sin(t * 12) * 10} y1={top - 140} x2={cx + sd * 200 + Math.sin(t * 12) * 30} y2={top + R * rh + 20} stroke="#8A5A2B" strokeWidth={14} strokeLinecap="round" />)}
      <circle cx={cx + 330} cy={top - 60} r={70} fill={LR} stroke={NBK} strokeWidth={5} />
      {Array.from({length: 5}, (_, i) => <path key={i} d={`M ${cx + 270} ${top - 90 + i * 14} q 60 ${-20 + i * 8} 120 0`} fill="none" stroke="#9E1F1F" strokeWidth={3} />)}
    </svg>
  );
};

/* ═════════════ 32. Ancre qui tombe et se plante : la répétition ancre les choses ═════════════ */
const LAnchor: React.FC<{cx: number; at: number; y1: number}> = ({cx, at, y1}) => {
  const t = useT();
  const q = Math.min(1, sp(t, at, 7, 9));
  const y = lerp(300, y1, q);
  const k = t - at - 0.45;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at - 0.1)}}>
      <line x1={cx} y1={0} x2={cx} y2={y - 160} stroke="#5B6472" strokeWidth={8} strokeDasharray="22 10" />
      <g transform={`translate(${cx} ${y})`}><circle cy={-160} r={26} fill="none" stroke={NBK} strokeWidth={12} /><rect x={-10} y={-136} width={20} height={240} fill={NBK} /><rect x={-70} y={-110} width={140} height={20} rx={8} fill={NBK} /><path d="M -130 40 Q -110 120 0 120 Q 110 120 130 40 L 150 70 L 130 0 L 80 30 L 110 40 Q 90 90 0 90 Q -90 90 -110 40 L -80 30 L -130 0 L -150 70 Z" fill={NBK} /></g>
      {k > 0 && k < 0.6 && [0, 1].map((i) => <ellipse key={i} cx={cx} cy={y1 + 120} rx={60 + k * 500 + i * 40} ry={14 + k * 60} fill="none" stroke={LN} strokeWidth={5} opacity={1 - k / 0.6} />)}
      <rect x={60} y={y1 + 120} width={960} height={12} rx={6} fill="#8A6A44" opacity={0.6} />
    </svg>
  );
};

/* ═════════════ 33. Distillation : des décennies d'expérience condensées en une seule goutte ═════════════ */
const LDistill: React.FC<{cx: number; cy: number; at: number; drop: number}> = ({cx, cy, at, drop}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const d = prog(t, drop, drop + 0.8, easeIn);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <path d={`M ${cx - 300} ${cy - 300} L ${cx + 300} ${cy - 300} L ${cx + 40} ${cy} L ${cx + 40} ${cy + 60} L ${cx - 40} ${cy + 60} L ${cx - 40} ${cy} Z`} fill="rgba(31,111,209,0.08)" stroke={NBK} strokeWidth={6} strokeLinejoin="round" />
      {Array.from({length: 26}, (_, i) => { const u = ((k * 0.5 + i / 26) % 1); const sx = cx - 260 + random(`ds${i}`) * 520; const x = lerp(sx, cx, Math.min(1, u * 1.3)); const y = lerp(cy - 420, cy, u); return <circle key={i} cx={x} cy={y} r={9} fill={['#8A96A8', LB, LN][i % 3]} opacity={u < 0.95 ? 1 : 0} />; })}
      <path d={`M ${cx} ${cy + 80 + d * 280} c -24 34 -36 52 -36 70 a 36 36 0 0 0 72 0 c 0 -18 -12 -36 -36 -70 z`} fill={LY} stroke={NBK} strokeWidth={5} style={{filter: `drop-shadow(0 0 20px ${LY})`}} opacity={prog(t, drop - 0.5, drop)} />
    </svg>
  );
};

/* ═════════════ 34. Jonglage : normes, outils, audits ═════════════ */
const LJuggle: React.FC<{cx: number; cy: number; at: number; balls: [string, string, number][]}> = ({cx, cy, at, balls}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      {[-1, 1].map((sd) => <g key={sd}><ellipse cx={cx + sd * 220} cy={cy + 250 + Math.sin(k * 6 + (sd > 0 ? Math.PI : 0)) * 14} rx={70} ry={30} fill="#8D5524" stroke={NBK} strokeWidth={5} /></g>)}
      {balls.map(([l, c, a], i) => { if (t < a) return null; const ph = (k * 0.7 + i / balls.length) % 1; const x = cx + Math.cos(ph * Math.PI * 2) * 220; const y = cy + 230 - Math.abs(Math.sin(ph * Math.PI)) * 520; return <g key={l}><circle cx={x} cy={y} r={78} fill={c} stroke={NBK} strokeWidth={6} /><text x={x} y={y + 12} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={30} fill="#fff">{l}</text></g>; })}
    </svg>
  );
};

/* ═════════════ 35. Trophée qui se fend : la sécurité ne se gagne pas une fois pour toutes ═════════════ */
const LTrophy: React.FC<{cx: number; cy: number; at: number; crack: number}> = ({cx, cy, at, crack}) => {
  const t = useT();
  const c = prog(t, crack, crack + 0.4, easeOut);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <g style={{filter: c < 0.1 ? `drop-shadow(0 0 30px ${LY})` : undefined}}>
        <path d={`M ${cx - 160} ${cy - 260} L ${cx + 160} ${cy - 260} Q ${cx + 160} ${cy - 20} ${cx} ${cy + 20} Q ${cx - 160} ${cy - 20} ${cx - 160} ${cy - 260} Z`} fill={LY} stroke={NBK} strokeWidth={7} />
        <path d={`M ${cx - 160} ${cy - 220} q -100 0 -90 80 q 10 70 100 70`} fill="none" stroke={NBK} strokeWidth={14} /><path d={`M ${cx + 160} ${cy - 220} q 100 0 90 80 q -10 70 -100 70`} fill="none" stroke={NBK} strokeWidth={14} />
        <rect x={cx - 30} y={cy + 20} width={60} height={100} fill={LY} stroke={NBK} strokeWidth={6} /><rect x={cx - 130} y={cy + 120} width={260} height={60} rx={10} fill="#8A5A2B" stroke={NBK} strokeWidth={6} />
      </g>
      {c > 0 && <polyline points={`${cx - 20},${cy - 260} ${cx + 20},${cy - 200} ${cx - 30},${cy - 140} ${cx + 25},${cy - 80} ${cx - 10},${cy - 20}`} fill="none" stroke={NBK} strokeWidth={6} pathLength={1} strokeDasharray={`${c} 1`} />}
    </svg>
  );
};

/* ═════════════ 36. Interrupteur : connaître → appliquer ═════════════ */
const LToggle: React.FC<{cy: number; at: number; flip: number}> = ({cy, at, flip}) => {
  const t = useT();
  const f = prog(t, flip, flip + 0.45, easeInOut);
  return (
    <Abs x={0} y={cy - 160} w={1080} h={320} style={{opacity: pop(t, at)}}>
      <div style={{position: 'absolute', left: 60, top: 120, width: 300, textAlign: 'right', fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: f < 0.5 ? INK : '#B9C0C8', textDecoration: f > 0.5 ? 'line-through' : 'none'}}>Connaître</div>
      <div style={{position: 'absolute', left: 400, top: 80, width: 280, height: 150, borderRadius: 75, background: f > 0.5 ? LG : '#C9D2DF', border: `8px solid ${NBK}`}}>
        <div style={{position: 'absolute', left: 10 + f * 130, top: 10, width: 114, height: 114, borderRadius: 57, background: '#fff', border: `6px solid ${NBK}`, boxShadow: '0 6px 0 rgba(0,0,0,0.2)'}} />
      </div>
      <div style={{position: 'absolute', left: 720, top: 120, width: 320, fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: f > 0.5 ? LG : '#B9C0C8'}}>Appliquer</div>
    </Abs>
  );
};

/* ═════════════ 37. Oreille et radar : écouter le presque-accident ═════════════ */
const LEar: React.FC<{cx: number; cy: number; at: number}> = ({cx, cy, at}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      {[0, 1, 2, 3].map((i) => { const r = ((k * 0.6 + i / 4) % 1); return <path key={i} d={`M ${cx - 150 - r * 300} ${cy - 90 - r * 200} Q ${cx - 230 - r * 380} ${cy} ${cx - 150 - r * 300} ${cy + 90 + r * 200}`} fill="none" stroke={LY} strokeWidth={10 - r * 6} opacity={1 - r} />; })}
      <path d={`M ${cx - 80} ${cy - 40} C ${cx - 80} ${cy - 200}, ${cx + 160} ${cy - 220}, ${cx + 150} ${cy - 30} C ${cx + 140} ${cy + 80}, ${cx + 40} ${cy + 80}, ${cx + 40} ${cy + 160} C ${cx + 40} ${cy + 230}, ${cx - 60} ${cy + 230}, ${cx - 70} ${cy + 160}`} fill="#C68642" stroke={NBK} strokeWidth={8} strokeLinecap="round" />
      <path d={`M ${cx - 20} ${cy - 40} C ${cx - 20} ${cy - 120}, ${cx + 90} ${cy - 120}, ${cx + 80} ${cy - 30} C ${cx + 74} ${cy + 20}, ${cx + 20} ${cy + 30}, ${cx + 10} ${cy + 70}`} fill="none" stroke={NBK} strokeWidth={6} strokeLinecap="round" />
    </svg>
  );
};

/* ═════════════ Palette du superviseur QHSE (turquoise de la source + accents) ═════════════ */
const VT = '#12A58C', VN = '#1F3A68', VY = '#F5C400', VR = '#E2483B', VB = '#1F6FD1', VG = '#1E9E5A';

/* ═════════════ 1. Champ de force : une bulle invisible protège travailleurs, produits et planète ═════════════ */
const VForce: React.FC<{cx: number; cy: number; at: number; items: [string, string, number][]}> = ({cx, cy, at, items}) => {
  const t = useT();
  const R = 330;
  const q = Math.min(1, sp(t, at, 7, 12));
  const k = Math.max(0, t - at);
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        <defs><radialGradient id="vfg" cx="50%" cy="40%"><stop offset="0%" stopColor="rgba(18,165,140,0.02)" /><stop offset="80%" stopColor="rgba(18,165,140,0.12)" /><stop offset="100%" stopColor="rgba(18,165,140,0.45)" /></radialGradient></defs>
        <circle cx={cx} cy={cy} r={R * q} fill="url(#vfg)" stroke={VT} strokeWidth={4} strokeDasharray="2 10" opacity={0.9} />
        {Array.from({length: 6}, (_, i) => { const a = (i / 6) * Math.PI * 2 + k * 0.6; return <path key={i} d={`M ${cx + Math.cos(a) * R * q} ${cy + Math.sin(a) * R * q} A ${R * q} ${R * q} 0 0 1 ${cx + Math.cos(a + 0.5) * R * q} ${cy + Math.sin(a + 0.5) * R * q}`} fill="none" stroke="#7CFFE4" strokeWidth={8} strokeLinecap="round" opacity={0.35 + 0.35 * Math.sin(k * 3 + i)} />; })}
        {[0, 1, 2].map((i) => { const r = ((k * 0.5 + i / 3) % 1); return <circle key={i} cx={cx} cy={cy} r={R * q * (0.6 + r * 0.5)} fill="none" stroke={VT} strokeWidth={3} opacity={(1 - r) * 0.5} />; })}
      </svg>
      {items.map(([l, ic, a], i) => { const th = -Math.PI / 2 + (i / items.length) * Math.PI * 2; const x = cx + Math.cos(th) * 170, y = cy + Math.sin(th) * 150; const iq = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0; return <div key={l} style={{position: 'absolute', left: x - 110, top: y - 90, width: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, transform: `scale(${iq})`}}><div style={{width: 120, height: 120, borderRadius: 60, background: '#fff', border: `6px solid ${NBK}`, boxShadow: `6px 6px 0 ${VT}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n={ic} size={70} c={VN} /></div><div style={{...nb(VT, 4), borderColor: NBK, padding: '4px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', whiteSpace: 'nowrap'}}>{l}</div></div>; })}
    </>
  );
};

/* ═════════════ 2. Sigle Q·H·S·E : chaque lettre se déplie en son mot ═════════════ */
const VAcro: React.FC<{y: number; at: number; words: [string, string, string, number][]}> = ({y, at, words}) => {
  const t = useT();
  return (
    <Abs x={60} y={y} w={960} h={600} style={{opacity: pop(t, at)}}>
      {words.map(([L, rest, c, a], i) => { const q = Math.min(1, sp(t, at + i * 0.12, 9, 12)); const u = prog(t, a, a + 0.6, easeOut); return (
        <div key={L} style={{position: 'absolute', left: 0, top: i * 145, height: 125, display: 'flex', alignItems: 'center', transform: `translateX(${(1 - q) * -200}px)`, opacity: q}}>
          <div style={{width: 125, height: 125, borderRadius: 24, background: c, border: `6px solid ${NBK}`, boxShadow: `6px 6px 0 ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: '#fff', flexShrink: 0}}>{L}</div>
          <div style={{marginLeft: 22, overflow: 'hidden', width: 780 * u, whiteSpace: 'nowrap', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: INK}}>{rest}</div>
        </div>
      ); })}
    </Abs>
  );
};

/* ═════════════ 3. Quatre cartes-sommaire qui se retournent en mosaïque ═════════════ */
const VFour: React.FC<{y: number; at: number; cards: [string, string, string, number][]}> = ({y, at, cards}) => {
  const t = useT();
  return (
    <Abs x={60} y={y} w={960} h={760} style={{perspective: 1400}}>
      {cards.map(([n, l, ic, a], i) => { const f = prog(t, a, a + 0.6, easeOut); const x = (i % 2) * 490, yy = Math.floor(i / 2) * 390; return (
        <div key={n} style={{position: 'absolute', left: x, top: yy, width: 470, height: 360, transform: `rotateY(${(1 - f) * 180}deg)`, transformStyle: 'preserve-3d'}}>
          <div style={{position: 'absolute', inset: 0, ...nb(f > 0.5 ? '#fff' : VT, 8), borderColor: NBK, boxShadow: `10px 10px 0 ${VN}`, backfaceVisibility: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 30, boxSizing: 'border-box', transform: f > 0.5 ? 'none' : 'rotateY(180deg)'}}>
            {f > 0.5 ? <><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 60, color: VT}}>{n}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK, lineHeight: 1.1, marginTop: 10}}>{l}</div><div style={{position: 'absolute', right: 24, bottom: 20}}><Ico n={ic} size={80} c={VN} /></div></> : <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 90, color: '#fff', textAlign: 'center'}}>?</div>}
          </div>
        </div>
      ); })}
    </Abs>
  );
};

/* ═════════════ 4. Roue des missions : la mission citée vient se placer en face ═════════════ */
const VWheel: React.FC<{cx: number; cy: number; at: number; items: [string, string, number][]}> = ({cx, cy, at, items}) => {
  const t = useT();
  const n = items.length;
  const cur = items.reduce((acc, it, i) => (t >= it[2] ? i : acc), -1);
  const target = cur < 0 ? 0 : -(cur / n) * 360;
  const prevT = cur <= 0 ? at : items[cur][2];
  const rot = cur < 0 ? (t - at) * 20 : lerp(cur === 0 ? 0 : -((cur - 1) / n) * 360, target, prog(t, prevT, prevT + 0.7, easeInOut));
  const R = 300;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <circle cx={cx} cy={cy} r={R + 70} fill="#fff" stroke={NBK} strokeWidth={8} />
        <g transform={`rotate(${rot} ${cx} ${cy})`}>
          {items.map((_, i) => { const a0 = ((i - 0.5) / n) * Math.PI * 2 - Math.PI / 2, a1 = ((i + 0.5) / n) * Math.PI * 2 - Math.PI / 2; return <path key={i} d={`M ${cx} ${cy} L ${cx + Math.cos(a0) * (R + 60)} ${cy + Math.sin(a0) * (R + 60)} A ${R + 60} ${R + 60} 0 0 1 ${cx + Math.cos(a1) * (R + 60)} ${cy + Math.sin(a1) * (R + 60)} Z`} fill={i === cur ? VT : i % 2 ? '#EAF7F4' : '#fff'} stroke={NBK} strokeWidth={4} />; })}
        </g>
        <circle cx={cx} cy={cy} r={90} fill={VN} stroke={NBK} strokeWidth={6} />
        <polygon points={`${cx - 30},${cy - R - 110} ${cx + 30},${cy - R - 110} ${cx},${cy - R - 60}`} fill={VR} stroke={NBK} strokeWidth={5} />
      </svg>
      {items.map(([l, ic], i) => { const th = ((i / n) * 360 + rot - 90) * Math.PI / 180; const x = cx + Math.cos(th) * (R - 40), y = cy + Math.sin(th) * (R - 40); const on = i === cur; return <div key={l} style={{position: 'absolute', left: x - 90, top: y - 60, width: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, opacity: pop(t, at + i * 0.08)}}><Ico n={ic} size={on ? 64 : 48} c={on ? '#fff' : VN} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: on ? 22 : 18, color: on ? '#fff' : INK, textAlign: 'center', lineHeight: 1.05}}>{l}</div></div>; })}
      <div style={{position: 'absolute', left: cx - 70, top: cy - 70, width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, at)}}><Ico n="HardHat" size={90} c="#fff" /></div>
    </>
  );
};

/* ═════════════ 5. Jauge circulaire de pourcentage (valeur citée par la voix) ═════════════ */
const VGauge: React.FC<{cx: number; cy: number; at: number; pct: number; label: string; c?: string}> = ({cx, cy, at, pct, label, c = VT}) => {
  const t = useT();
  const p = prog(t, at, at + 1.6, easeOut) * pct / 100;
  const R = 230;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at - 0.2)}}>
      <circle cx={cx} cy={cy} r={R} fill="#fff" stroke="#E4E8EE" strokeWidth={56} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={c} strokeWidth={56} pathLength={1} strokeDasharray={`${p} 1`} transform={`rotate(-90 ${cx} ${cy})`} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={R + 32} fill="none" stroke={NBK} strokeWidth={5} /><circle cx={cx} cy={cy} r={R - 32} fill="none" stroke={NBK} strokeWidth={5} />
      <text x={cx} y={cy + 40} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={150} fill={NBK}>{Math.round(p * 100)}%</text>
      <text x={cx} y={cy + R + 120} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={40} fill={INK}>{label}</text>
    </svg>
  );
};

/* ═════════════ 6. Trois piliers qui fusionnent dans l'engrenage du système intégré ═════════════ */
const VPillars: React.FC<{cy: number; at: number; merge: number; labels: [string, string][]}> = ({cy, at, merge, labels}) => {
  const t = useT();
  const m = prog(t, merge, merge + 1.2, easeInOut);
  const k = Math.max(0, t - at);
  const gp = (r: number, n: number) => { const pts: string[] = []; for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * Math.PI * 2; const rr = i % 2 ? r : r + 26; const a2 = a + Math.PI / (n * 2); pts.push(`${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)}`, `${(Math.cos(a2) * rr).toFixed(1)},${(Math.sin(a2) * rr).toFixed(1)}`); } return `M ${pts.join(' L ')} Z`; };
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      {labels.map(([l, c], i) => { const x0 = 220 + i * 320; const x = lerp(x0, 540, m), y = lerp(cy - 120, cy + 120, m); const q = Math.min(1, sp(t, at + i * 0.2, 8, 12)); return <g key={l} opacity={1 - m * 0.85} transform={`translate(${x} ${y}) scale(${q * (1 - m * 0.5)})`}><rect x={-80} y={-200} width={160} height={400} rx={14} fill={c} stroke={NBK} strokeWidth={6} /><rect x={-100} y={-230} width={200} height={40} rx={10} fill="#fff" stroke={NBK} strokeWidth={5} /><rect x={-100} y={190} width={200} height={40} rx={10} fill="#fff" stroke={NBK} strokeWidth={5} /><text y={20} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={34} fill="#fff" transform="rotate(-90)">{l}</text></g>; })}
      {m > 0 && labels.map(([, c], i) => { const x0 = 220 + i * 320; return <path key={i} d={`M ${x0} ${cy + 80} C ${x0} ${cy + 260}, 540 ${cy + 140}, 540 ${cy + 230}`} fill="none" stroke={c} strokeWidth={22} strokeLinecap="round" pathLength={1} strokeDasharray={`${m} 1`} />; })}
      <g transform={`translate(540 ${cy + 260}) scale(${m}) rotate(${k * 40})`}><path d={gp(130, 12)} fill={VT} stroke={NBK} strokeWidth={6} /><circle r={80} fill="#fff" stroke={NBK} strokeWidth={6} /></g>
      {m > 0.6 && <text x={540} y={cy + 278} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={54} fill={VN} opacity={(m - 0.6) / 0.4}>SMI</text>}
    </svg>
  );
};

/* ═════════════ 7. Rétroviseur (indicateurs réactifs) et phares (indicateurs proactifs) ═════════════ */
const VMirror: React.FC<{at: number; lead: number}> = ({at, lead}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const L = prog(t, lead, lead + 0.8, easeOut);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <defs><linearGradient id="road" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3A4250" /><stop offset="100%" stopColor="#1A1F28" /></linearGradient><clipPath id="mir"><rect x={190} y={500} width={700} height={250} rx={120} /></clipPath></defs>
      <polygon points="540,820 1080,1380 0,1380" fill="url(#road)" />
      {Array.from({length: 7}, (_, i) => { const u = ((k * 0.7 + i / 7) % 1); const y = 830 + u * u * 560; const w = 6 + u * 30; return <rect key={i} x={540 - w / 2} y={y} width={w} height={20 + u * 60} fill="#fff" opacity={0.8} />; })}
      {L > 0 && <polygon points={`380,1380 540,820 700,1380`} fill={VY} opacity={0.25 * L} />}
      {L > 0 && <polygon points={`150,1380 520,830 560,830 930,1380`} fill={VY} opacity={0.12 * L} />}
      <rect x={170} y={480} width={740} height={290} rx={140} fill="#2B3038" stroke={NBK} strokeWidth={8} />
      <g clipPath="url(#mir)"><rect x={190} y={500} width={700} height={250} fill="#9CC3E6" /><rect x={190} y={650} width={700} height={100} fill="#5B6472" />{Array.from({length: 5}, (_, i) => { const u = ((k * 0.7 + i / 5) % 1); return <rect key={i} x={540 - 3 + (1 - u) * 0} y={650 + u * 100} width={6 + u * 12} height={16} fill="#fff" />; })}<g transform={`translate(${540 + Math.sin(k) * 40} 640)`}><polygon points="-40,-30 40,-30 26,-60 -26,-60" fill={VR} stroke={NBK} strokeWidth={3} /><rect x={-50} y={-32} width={100} height={36} rx={8} fill={VR} stroke={NBK} strokeWidth={3} /></g></g>
      <text x={540} y={460} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={30} fill={VR}>RÉTROVISEUR · RÉACTIFS</text>
      {L > 0 && <text x={540} y={1340} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={32} fill={VY} opacity={L}>PHARES · PROACTIFS</text>}
    </svg>
  );
};

/* ═════════════ 8. Badge qui se transforme : contrôleur → partenaire ═════════════ */
const VMorph: React.FC<{cy: number; at: number; flip: number; from: [string, string]; to: [string, string]}> = ({cy, at, flip, from, to}) => {
  const t = useT();
  const f = prog(t, flip, flip + 0.8, easeInOut);
  const side = f < 0.5 ? from : to;
  const c = f < 0.5 ? VR : VG;
  return (
    <Abs x={290} y={cy - 250} w={500} h={500} style={{opacity: pop(t, at), perspective: 1200}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: 250, background: '#fff', border: `12px solid ${c}`, boxShadow: `12px 12px 0 ${NBK}`, transform: `rotateY(${f * 180}deg)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14}}>
        <div style={{transform: `scaleX(${f < 0.5 ? 1 : -1})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}><Ico n={side[1]} size={170} c={c} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: side[0].length > 12 ? 46 : 56, color: NBK, maxWidth: 400, textAlign: 'center', lineHeight: 1.05}}>{side[0]}</div></div>
      </div>
    </Abs>
  );
};

/* ═════════════ 9. Escalier de carrière : le personnage gravit les marches ═════════════ */
const VStairs: React.FC<{at: number; steps: [string, number][]; base?: number}> = ({at, steps, base = 1250}) => {
  const t = useT();
  const n = steps.length;
  const sw = 820 / n, sh = 120;
  const cur = steps.reduce((acc, s0, i) => (t >= s0[1] ? i : acc), -1);
  const pos = cur < 0 ? -0.6 : cur + prog(t, steps[cur][1], steps[cur][1] + 0.6, easeOut) * 0;
  const px = 130 + Math.max(0, pos) * sw + sw / 2, py = base - (Math.max(0, pos) + 1) * sh;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      {steps.map(([l, a], i) => { const x = 130 + i * sw, y = base - (i + 1) * sh; const on = t >= a; return <g key={l}><rect x={x} y={y} width={sw} height={(i + 1) * sh} fill={on ? (i === n - 1 ? VY : VT) : '#E4E8EE'} stroke={NBK} strokeWidth={5} /><text x={x + sw / 2} y={y + 50} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={24} fill={on ? (i === n - 1 ? NBK : '#fff') : DIM}>{l}</text></g>; })}
      {cur >= 0 && <g transform={`translate(${px} ${py - 10 - Math.abs(Math.sin((t - at) * 6)) * 6})`}><circle cy={-120} r={26} fill="#6B4A2E" /><path d="M -34 -146 Q 0 -190 34 -146 Z" fill={VY} stroke={NBK} strokeWidth={3} /><rect x={-28} y={-94} width={56} height={70} rx={14} fill={VR} stroke={NBK} strokeWidth={3} /><line x1={-14} y1={-26} x2={-24} y2={0} stroke={NBK} strokeWidth={10} strokeLinecap="round" /><line x1={14} y1={-26} x2={24} y2={0} stroke={NBK} strokeWidth={10} strokeLinecap="round" /></g>}
      {cur === n - 1 && <g transform={`translate(${130 + (n - 1) * sw + sw / 2 + 60} ${base - n * sh - 180})`}><polygon points="0,0 0,-80 60,-60 0,-40" fill={VR} stroke={NBK} strokeWidth={3} /><line x1={0} y1={0} x2={0} y2={-90} stroke={NBK} strokeWidth={5} /></g>}
    </svg>
  );
};

/* ═════════════ 10. Anneau des compétences : technique + humaines, en équilibre ═════════════ */
const VSkills: React.FC<{cx: number; cy: number; at: number; tech: [string, number][]; soft: [string, number][]}> = ({cx, cy, at, tech, soft}) => {
  const t = useT();
  const R = 250;
  const p = prog(t, at, at + 1.2, easeOut);
  const seg = (a0: number, a1: number, c: string) => <path d={`M ${cx + Math.cos(a0) * R} ${cy + Math.sin(a0) * R} A ${R} ${R} 0 0 1 ${cx + Math.cos(a1) * R} ${cy + Math.sin(a1) * R}`} fill="none" stroke={c} strokeWidth={70} />;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        {seg(-Math.PI / 2, -Math.PI / 2 + Math.PI * p, VB)}{seg(Math.PI / 2, Math.PI / 2 + Math.PI * p, VY)}
        <circle cx={cx} cy={cy} r={R - 50} fill="#fff" stroke={NBK} strokeWidth={5} />
        <text x={cx} y={cy + 14} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={40} fill={NBK}>Compétences</text>
      </svg>
      <Abs x={60} y={cy - R - 140} w={960} style={{display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap'}}>{tech.map(([l, a]) => <div key={l} style={{...nb('#fff', 4), borderColor: NBK, boxShadow: `4px 4px 0 ${VB}`, padding: '6px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, transform: `scale(${t > a ? Math.min(1, sp(t, a, 9, 12)) : 0})`, whiteSpace: 'nowrap'}}>{l}</div>)}</Abs>
      <Abs x={60} y={cy + R + 60} w={960} style={{display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap'}}>{soft.map(([l, a]) => <div key={l} style={{...nb('#fff', 4), borderColor: NBK, boxShadow: `4px 4px 0 ${VY}`, padding: '6px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, transform: `scale(${t > a ? Math.min(1, sp(t, a, 9, 12)) : 0})`, whiteSpace: 'nowrap'}}>{l}</div>)}</Abs>
    </>
  );
};

/* ═════════════ 11. QHSE 4.0 : capteurs connectés qui remontent vers le cloud et l'IA prédictive ═════════════ */
const VIoT: React.FC<{at: number; nodes: [string, string, number][]}> = ({at, nodes}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const pos: [number, number][] = [[220, 660], [860, 660], [540, 1170]];
  return (
    <AbsoluteFill style={{opacity: pop(t, at)}}>
      <AbsoluteFill style={{clipPath: 'inset(440px 0 520px 0)', background: 'radial-gradient(circle at 50% 50%, #12305A, #071426 70%)'}} />
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        {Array.from({length: 12}, (_, i) => <line key={i} x1={0} y1={460 + i * 80} x2={1080} y2={460 + i * 80} stroke="#123A66" strokeWidth={1} />)}
        {nodes.map(([, , a], i) => { const [x, y] = pos[i % 3]; const p = prog(t, a, a + 0.6); const u = ((k * 0.8 + i * 0.3) % 1); return <g key={i}><line x1={x} y1={y} x2={lerp(x, 540, p)} y2={lerp(y, 880, p)} stroke="#4FC3F7" strokeWidth={4} strokeDasharray="10 8" />{p > 0.99 && <circle cx={lerp(x, 540, u)} cy={lerp(y, 880, u)} r={9} fill="#7CFFE4" style={{filter: 'drop-shadow(0 0 8px #7CFFE4)'}} />}</g>; })}
        {[0, 1, 2].map((i) => { const r = ((k * 0.6 + i / 3) % 1); return <circle key={i} cx={540} cy={880} r={110 + r * 160} fill="none" stroke="#4FC3F7" strokeWidth={3} opacity={1 - r} />; })}
        <circle cx={540} cy={880} r={110} fill="#0E2547" stroke="#4FC3F7" strokeWidth={6} style={{filter: 'drop-shadow(0 0 20px #4FC3F7)'}} />
      </svg>
      <div style={{position: 'absolute', left: 470, top: 810, width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="Brain" size={100} c="#7CFFE4" /></div>
      {nodes.map(([l, ic, a], i) => { const [x, y] = pos[i % 3]; const q = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0; return <div key={l} style={{position: 'absolute', left: x - 110, top: y - 80, width: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, transform: `scale(${q})`}}><div style={{width: 110, height: 110, borderRadius: 55, background: '#0E2547', border: '5px solid #4FC3F7', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px rgba(79,195,247,0.6)'}}><Ico n={ic} size={60} c="#7CFFE4" /></div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#BFE9FF', textAlign: 'center', letterSpacing: 1}}>{l}</div></div>; })}
    </AbsoluteFill>
  );
};

/* ═════════════ 12. Plan d'architecte qui se trace : le superviseur, architecte de l'avenir ═════════════ */
const VBlueprint: React.FC<{at: number; cy: number}> = ({at, cy}) => {
  const t = useT();
  const p = prog(t, at, at + 2.4, easeInOut);
  const lines = [`M 160 ${cy + 260} H 920`, `M 220 ${cy + 260} V ${cy - 40} H 860 V ${cy + 260}`, `M 200 ${cy - 40} L 540 ${cy - 300} L 880 ${cy - 40}`, `M 300 ${cy + 260} V ${cy + 60} H 420 V ${cy + 260}`, `M 520 ${cy + 40} H 760 V ${cy + 160} H 520 Z`, `M 640 ${cy + 40} V ${cy + 160}`, `M 540 ${cy - 300} V ${cy - 380}`];
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <rect x={100} y={cy - 440} width={880} height={780} rx={16} fill="#0F4C81" stroke={NBK} strokeWidth={7} />
      {Array.from({length: 22}, (_, i) => <line key={`h${i}`} x1={100} y1={cy - 440 + i * 36} x2={980} y2={cy - 440 + i * 36} stroke="#3B78B5" strokeWidth={1} />)}
      {Array.from({length: 25}, (_, i) => <line key={`v${i}`} x1={100 + i * 36} y1={cy - 440} x2={100 + i * 36} y2={cy + 340} stroke="#3B78B5" strokeWidth={1} />)}
      {lines.map((d, i) => <path key={i} d={d} fill="none" stroke="#EAF4FF" strokeWidth={6} strokeLinejoin="round" pathLength={1} strokeDasharray={`${cl(p * lines.length - i)} 1`} />)}
      {p > 0.85 && <g transform={`translate(540 ${cy - 400}) scale(${prog(t, at + 2.0, at + 2.5, easeOut)})`}><polygon points="0,-30 9,-9 31,-9 13,4 20,26 0,12 -20,26 -13,4 -31,-9 -9,-9" fill={VY} stroke={NBK} strokeWidth={3} /></g>}
    </svg>
  );
};

/* ═════════════ Palette ISO 9001 ═════════════ */
const YB = '#1F5FBF', YN = '#14284B', YT = '#12A58C', YO = '#F08A24', YR = '#E2483B', YG = '#1E9E5A', YY = '#F5C400';

/* ═════════════ 1. Feuille de route : une route sinueuse se trace, une capsule roule vers chaque jalon ═════════════ */
const YRoad: React.FC<{at: number; cy: number; stops: [string, string, string, number][]}> = ({at, cy, stops}) => {
  const t = useT();
  const N = 120;
  const P = (u: number): [number, number] => [320 + 170 * Math.sin(u * Math.PI * 2.1 - 0.4), cy + 400 - 800 * u];
  const draw = prog(t, at, at + 1.4, easeOut);
  const pts = Array.from({length: N + 1}, (_, i) => P(i / N));
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const fr = stops.map((_, i) => 0.08 + (i / Math.max(1, stops.length - 1)) * 0.84);
  const cur = stops.reduce((acc, s0, i) => (t >= s0[3] ? i : acc), -1);
  const u = cur < 0 ? 0 : lerp(cur === 0 ? 0 : fr[cur - 1], fr[cur], prog(t, stops[cur][3], stops[cur][3] + 0.9, easeInOut));
  const [vx, vy] = P(u);
  const [vx2, vy2] = P(Math.min(1, u + 0.01));
  const ang = (Math.atan2(vy2 - vy, vx2 - vx) * 180) / Math.PI;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <path d={d} fill="none" stroke="#3A4250" strokeWidth={84} strokeLinecap="round" pathLength={1} strokeDasharray={`${draw} 1`} />
        <path d={d} fill="none" stroke="#5B6472" strokeWidth={70} strokeLinecap="round" pathLength={1} strokeDasharray={`${draw} 1`} />
        <path d={d} fill="none" stroke="#fff" strokeWidth={6} strokeDasharray="22 22" opacity={draw > 0.98 ? 0.9 : 0} />
        {cur >= 0 && <path d={pts.filter((_, i) => i / N <= u).map(([x, y], i) => `${i ? 'L' : 'M'} ${x} ${y}`).join(' ')} fill="none" stroke={YY} strokeWidth={12} strokeLinecap="round" style={{filter: `drop-shadow(0 0 10px ${YY})`}} />}
      </svg>
      {stops.map(([l, ic, c, a], i) => { const [x, y] = P(fr[i]); const on = t >= a; const q = Math.min(1, sp(t, at + 0.5 + i * 0.12, 9, 12)); void x; return (
        <React.Fragment key={l}>
          <div style={{position: 'absolute', left: x - 50, top: y - 50, width: 100, height: 100, borderRadius: 50, background: on ? c : '#fff', border: `6px solid ${NBK}`, boxShadow: on ? `0 0 30px ${c}` : `5px 5px 0 ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${q * (on ? 1.08 : 1)})`, zIndex: 3}}><Ico n={ic} size={52} c={on ? '#fff' : NBK} /></div>
          <div style={{position: 'absolute', left: 580, top: y - 40, width: 450, textAlign: 'left', opacity: on ? 1 : 0.3, transform: `translateX(${(1 - prog(t, a, a + 0.4, easeOut)) * 40}px)`, fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: on ? c : DIM, lineHeight: 1.05, zIndex: 3}}>{l}</div>
        </React.Fragment>
      ); })}
      {cur >= 0 && <div style={{position: 'absolute', left: vx - 46, top: vy - 24, width: 92, height: 48, transform: `rotate(${ang}deg)`, zIndex: 4}}><Capsule w={92} c={NAVY} /></div>}
    </>
  );
};

/* ═════════════ 2. Du plan à la maison : le plan se trace sur papier bleu, la maison s'élève ═════════════ */
const YHouse: React.FC<{at: number; build: number; cy: number}> = ({at, build, cy}) => {
  const t = useT();
  const p = prog(t, at + 0.2, at + 1.8, easeInOut);
  const b = prog(t, build, build + 1.2, easeOut);
  const x0 = 200, y0 = cy - 300, W = 680, H = 600;
  const lines: string[] = [`M ${x0} ${y0} H ${x0 + W} V ${y0 + H} H ${x0} Z`, `M ${x0 + 280} ${y0} V ${y0 + 360}`, `M ${x0} ${y0 + 360} H ${x0 + 460}`, `M ${x0 + 460} ${y0 + 360} V ${y0 + H}`, `M ${x0 + 280} ${y0 + 180} H ${x0 + W}`];
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <rect x={120} y={cy - 380} width={840} height={760} rx={18} fill="#1D4E89" stroke={NBK} strokeWidth={6} />
      {Array.from({length: 15}, (_, i) => <line key={`v${i}`} x1={120 + i * 60} y1={cy - 380} x2={120 + i * 60} y2={cy + 380} stroke="#3A6CA8" strokeWidth={2} />)}
      {Array.from({length: 13}, (_, i) => <line key={`h${i}`} x1={120} y1={cy - 380 + i * 60} x2={960} y2={cy - 380 + i * 60} stroke="#3A6CA8" strokeWidth={2} />)}
      {lines.map((d, i) => <path key={i} d={d} fill="none" stroke="#fff" strokeWidth={8} pathLength={1} strokeDasharray={`${Math.max(0, Math.min(1, p * 5 - i))} 1`} strokeLinecap="round" />)}
      <g opacity={b} transform={`translate(540 ${cy + 300}) scale(1 ${Math.max(0.001, b)}) translate(-540 ${-(cy + 300)})`}>
        <rect x={330} y={cy - 40} width={420} height={340} fill="#F6E7CF" stroke={NBK} strokeWidth={7} />
        <polygon points={`${300},${cy - 30} ${540},${cy - 250} ${780},${cy - 30}`} fill={YR} stroke={NBK} strokeWidth={7} strokeLinejoin="round" />
        <rect x={500} y={cy + 140} width={80} height={160} fill={YN} stroke={NBK} strokeWidth={6} />
        <rect x={370} y={cy + 30} width={90} height={80} fill="#9FD3FF" stroke={NBK} strokeWidth={6} /><rect x={620} y={cy + 30} width={90} height={80} fill="#9FD3FF" stroke={NBK} strokeWidth={6} />
      </g>
    </svg>
  );
};

/* ═════════════ 3. Le moteur SMQ : engrenages, piston, carburant des 7 principes qui fait monter le régime ═════════════ */
const yGearPath = (r: number, teeth: number) => { const pts: string[] = []; for (let i = 0; i < teeth * 2; i++) { const a = (i / (teeth * 2)) * Math.PI * 2; const rr = i % 2 ? r : r + r * 0.16; const a2 = a + Math.PI / (teeth * 2); pts.push(`${Math.cos(a) * rr},${Math.sin(a) * rr}`, `${Math.cos(a2) * rr},${Math.sin(a2) * rr}`); } return `M ${pts.join(' L ')} Z`; };
const YEngine: React.FC<{at: number; fuel: number; cy: number; label?: string; fuelLabel?: string}> = ({at, fuel, cy, label = 'SMQ', fuelLabel = '7 principes'}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const f = prog(t, fuel, fuel + 1.6, easeInOut);
  const spd = 30 + f * 140;
  const rot = k * spd;
  const pis = Math.sin((rot * Math.PI) / 90) * 40;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <rect x={130} y={cy - 360 + pis} width={90} height={150} rx={12} fill="#C9D2DF" stroke={NBK} strokeWidth={6} />
        <line x1={175} y1={cy - 210 + pis} x2={470 + Math.cos((rot * Math.PI) / 180) * 120} y2={cy + Math.sin((rot * Math.PI) / 180) * 120} stroke={NBK} strokeWidth={14} strokeLinecap="round" />
        <g transform={`translate(470 ${cy}) rotate(${rot})`}><path d={yGearPath(190, 14)} fill={YB} stroke={NBK} strokeWidth={8} /><circle r={70} fill="#fff" stroke={NBK} strokeWidth={8} /></g>
        <circle cx={470 + Math.cos((rot * Math.PI) / 180) * 120} cy={cy + Math.sin((rot * Math.PI) / 180) * 120} r={16} fill={YY} stroke={NBK} strokeWidth={5} />
        <g transform={`translate(745 ${cy - 210}) rotate(${-rot * 1.6 + 9})`}><path d={yGearPath(110, 9)} fill={YT} stroke={NBK} strokeWidth={7} /><circle r={36} fill="#fff" stroke={NBK} strokeWidth={6} /></g>
        <g transform={`translate(760 ${cy + 190}) rotate(${-rot * 1.9})`}><path d={yGearPath(90, 8)} fill={YO} stroke={NBK} strokeWidth={7} /><circle r={30} fill="#fff" stroke={NBK} strokeWidth={6} /></g>
        <rect x={100} y={cy + 230} width={170} height={210} rx={16} fill="#fff" stroke={NBK} strokeWidth={7} />
        <rect x={110} y={cy + 430 - 190 * f} width={150} height={190 * f} fill={YY} />
        <rect x={100} y={cy + 230} width={170} height={210} rx={16} fill="none" stroke={NBK} strokeWidth={7} />
        <path d={`M 270 ${cy + 300} C 340 ${cy + 300}, 340 ${cy + 120}, 380 ${cy + 90}`} fill="none" stroke={f > 0 ? YY : '#C9D2DF'} strokeWidth={18} strokeLinecap="round" strokeDasharray={f > 0 ? '30 14' : undefined} strokeDashoffset={-k * 120} />
      </svg>
      <div style={{position: 'absolute', left: 470 - 70, top: cy - 70, width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: YN, opacity: pop(t, at)}}>{label}</div>
      <div style={{position: 'absolute', left: 80, top: cy + 450, width: 210, textAlign: 'center', ...CAP, fontSize: 22, color: YN, opacity: pop(t, fuel - 0.3)}}>{fuelLabel}</div>
    </>
  );
};

/* ═════════════ 4. Classeurs qui prennent la poussière… barrés d'un grand X ═════════════ */
const YDust: React.FC<{at: number; cross: number; cy: number}> = ({at, cross, cy}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const x = prog(t, cross, cross + 0.4, easeOut);
  const cols = [YB, YN, YT, '#8A96A8', YO, YB, YN];
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <rect x={140} y={cy + 170} width={800} height={30} fill="#8A5A2B" stroke={NBK} strokeWidth={6} />
      {cols.map((c, i) => { const q = Math.min(1, sp(t, at + i * 0.1, 9, 12)); return <g key={i} transform={`translate(${190 + i * 102} ${cy + 170 - 330 * q})`}><rect width={88} height={330} rx={8} fill={c} stroke={NBK} strokeWidth={6} /><rect x={20} y={40} width={48} height={70} rx={6} fill="#fff" stroke={NBK} strokeWidth={4} /><circle cx={44} cy={270} r={14} fill="#fff" stroke={NBK} strokeWidth={4} /></g>; })}
      {Array.from({length: 40}, (_, i) => { const u = ((k * 0.12 + random(`d${i}`)) % 1); return <circle key={i} cx={160 + random(`dx${i}`) * 760 + Math.sin(k + i) * 10} cy={cy - 260 + u * 440} r={3 + random(`dr${i}`) * 4} fill="#B9A98F" opacity={0.6 * (1 - u)} />; })}
      <rect x={150} y={cy - 180} width={780} height={10} fill="#D8CFC0" opacity={0.8} />
      {x > 0 && <g strokeLinecap="round" stroke={YR} strokeWidth={34}><line x1={180} y1={cy - 230} x2={180 + 720 * x} y2={cy - 230 + 460 * x} /><line x1={900} y1={cy - 230} x2={900 - 720 * x} y2={cy - 230 + 460 * x} /></g>}
    </svg>
  );
};

/* ═════════════ 5. Cubes 3D qui pivotent : du « ? » à la réponse (qui, quoi, comment, pourquoi) ═════════════ */
const YCubes: React.FC<{y: number; at: number; items: [string, string, number][]}> = ({y, at, items}) => {
  const t = useT();
  const S0 = 220;
  return (
    <Abs x={240} y={y} w={600} h={560} style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 50, perspective: 1600}}>
      {items.map(([l, c, a], i) => { const r = prog(t, a, a + 0.7, easeInOut); const q = Math.min(1, sp(t, at + i * 0.1, 9, 12)); return (
        <div key={l} style={{width: S0, height: S0, position: 'relative', transformStyle: 'preserve-3d', transform: `scale(${q}) translateZ(${-S0 / 2}px) rotateX(${r * 90}deg)`}}>
          <div style={{position: 'absolute', inset: 0, background: '#fff', border: `7px solid ${NBK}`, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 130, color: DIM, transform: `translateZ(${S0 / 2}px)`, backfaceVisibility: 'hidden', boxSizing: 'border-box'}}>?</div>
          <div style={{position: 'absolute', inset: 0, background: c, border: `7px solid ${NBK}`, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: l.length > 6 ? 40 : 54, color: '#fff', transform: `rotateX(-90deg) translateZ(${S0 / 2}px)`, backfaceVisibility: 'hidden', boxSizing: 'border-box'}}>{l}</div>
        </div>
      ); })}
    </Abs>
  );
};

/* ═════════════ 6. Boussole : l'aiguille pointe chaque principe cité ═════════════ */
const YCompass: React.FC<{cx: number; cy: number; at: number; items: [string, string, number][]}> = ({cx, cy, at, items}) => {
  const t = useT();
  const R = 300;
  const angs = items.map((_, i) => -90 + i * (360 / items.length) + 45);
  const cur = items.reduce((acc, it, i) => (t >= it[2] ? i : acc), -1);
  const wob = Math.sin(t * 3) * 4;
  const target = cur < 0 ? -90 + Math.sin(t * 1.5) * 60 : angs[cur];
  const prev = cur <= 0 ? -90 : angs[cur - 1];
  const a = cur < 0 ? target : lerp(prev, target, Math.min(1, sp(t, items[cur][2], 7, 7))) + wob;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <circle cx={cx} cy={cy} r={R + 30} fill="#F3EBDD" stroke={NBK} strokeWidth={10} />
        <circle cx={cx} cy={cy} r={R - 20} fill="#fff" stroke="#C8B99E" strokeWidth={4} />
        {Array.from({length: 36}, (_, i) => { const th = (i / 36) * Math.PI * 2; return <line key={i} x1={cx + Math.cos(th) * (R - 20)} y1={cy + Math.sin(th) * (R - 20)} x2={cx + Math.cos(th) * (R - (i % 9 === 0 ? 70 : 40))} y2={cy + Math.sin(th) * (R - (i % 9 === 0 ? 70 : 40))} stroke={NBK} strokeWidth={i % 9 === 0 ? 6 : 3} />; })}
        {['N', 'E', 'S', 'O'].map((l, i) => <text key={l} x={cx + Math.sin((i * Math.PI) / 2) * (R - 110)} y={cy - Math.cos((i * Math.PI) / 2) * (R - 110) + 16} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={44} fill={i === 0 ? YR : NBK}>{l}</text>)}
        <g transform={`rotate(${a + 90} ${cx} ${cy})`}><polygon points={`${cx},${cy - R + 60} ${cx + 30},${cy} ${cx},${cy + 30} ${cx - 30},${cy}`} fill={YR} stroke={NBK} strokeWidth={5} /><polygon points={`${cx},${cy + R - 60} ${cx + 30},${cy} ${cx - 30},${cy}`} fill="#fff" stroke={NBK} strokeWidth={5} /></g>
        <circle cx={cx} cy={cy} r={22} fill={YY} stroke={NBK} strokeWidth={5} />
      </svg>
      {items.map(([l, ic, a0], i) => { const th = (angs[i] * Math.PI) / 180; const x = cx + Math.cos(th) * (R + 150), y = cy + Math.sin(th) * (R + 140); const on = i === cur; const q = t > a0 ? Math.min(1, sp(t, a0, 9, 12)) : 0; return <div key={l} style={{position: 'absolute', left: x - 140, top: y - 50, width: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, transform: `scale(${q * (on ? 1.08 : 0.92)})`}}><div style={{width: 64, height: 64, borderRadius: 32, background: on ? YB : '#fff', border: `5px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n={ic} size={36} c={on ? '#fff' : YB} /></div><div style={{...nb(on ? YY : '#fff', 4), borderColor: NBK, padding: '6px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, textAlign: 'center', lineHeight: 1.05}}>{l}</div></div>; })}
    </>
  );
};

/* ═════════════ 7. Bingo : sept boules tombent dans le rail, s'allument… BINGO ! ═════════════ */
const YBingo: React.FC<{cy: number; at: number; step: number; bingo: number; n?: number}> = ({cy, at, step, bingo, n = 7}) => {
  const t = useT();
  const W = 118;
  const x0 = 540 - ((n - 1) * W) / 2;
  const bq = t > bingo ? Math.min(1, sp(t, bingo, 8, 9)) : 0;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <rect x={x0 - 80} y={cy + 60} width={(n - 1) * W + 160} height={40} rx={20} fill="#C9D2DF" stroke={NBK} strokeWidth={6} />
        {Array.from({length: n}, (_, i) => { const a = at + 0.3 + i * step; const f = prog(t, a, a + 0.45, easeIn); const bounce = t > a + 0.45 ? Math.abs(Math.sin((t - a - 0.45) * 12)) * 20 * Math.exp(-(t - a - 0.45) * 5) : 0; const y = lerp(cy - 520, cy, f) - bounce; const lit = t > bingo; return <g key={i} opacity={t > a ? 1 : 0}><circle cx={x0 + i * W} cy={y} r={50} fill={lit ? YG : YB} stroke={NBK} strokeWidth={6} style={{filter: lit ? `drop-shadow(0 0 ${16 + 8 * Math.sin(t * 10 + i)}px ${YY})` : undefined}} /><circle cx={x0 + i * W} cy={y} r={28} fill="#fff" stroke={NBK} strokeWidth={4} /><path d={`M ${x0 + i * W - 13} ${y} l 9 10 l 18 -20`} fill="none" stroke={lit ? YG : YB} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" /></g>; })}
        {bq > 0 && Array.from({length: 16}, (_, i) => { const th = (i / 16) * Math.PI * 2; const r0 = 120 + 300 * prog(t, bingo, bingo + 0.6, easeOut); return <line key={i} x1={540 + Math.cos(th) * r0 * 0.7} y1={cy - 230 + Math.sin(th) * r0 * 0.5} x2={540 + Math.cos(th) * r0} y2={cy - 230 + Math.sin(th) * r0 * 0.7} stroke={YY} strokeWidth={10} strokeLinecap="round" opacity={1 - prog(t, bingo + 0.3, bingo + 0.9)} />; })}
      </svg>
      {bq > 0 && <div style={{position: 'absolute', left: 0, top: cy - 310, width: 1080, display: 'flex', justifyContent: 'center'}}><div style={{transform: `scale(${bq}) rotate(-6deg)`, ...nb(YY, 10), borderColor: NBK, padding: '14px 46px', fontFamily: sansFont, fontWeight: 900, fontSize: 110, color: NBK}}>BINGO !</div></div>}
    </>
  );
};

/* ═════════════ 8. Le socle : les briques des premières étapes se posent sur la dalle ═════════════ */
const YBricks: React.FC<{base: number; at: number; items: [string, string, number][]}> = ({base, at, items}) => {
  const t = useT();
  const slots: [number, number, number][] = [[120, 0, 410], [550, 0, 410], [120, 1, 270], [410, 1, 260], [690, 1, 270]];
  return (
    <>
      <Abs x={80} y={base} w={920} h={90} style={{...nb('#9AA4B2', 8), borderColor: NBK, opacity: pop(t, at), display: 'flex', alignItems: 'center', justifyContent: 'center', ...CAP, fontSize: 30, color: '#fff'}}>Le socle du projet</Abs>
      {items.map(([l, c, a], i) => { const [x, row, w] = slots[i % slots.length]; const f = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0; const yy = base - 150 - row * 150; return <div key={l} style={{position: 'absolute', left: x, top: lerp(yy - 500, yy, Math.min(1, f)), width: w, height: 140, ...nb(c, 8), borderColor: NBK, opacity: t > a ? 1 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: c === YY ? NBK : '#fff', lineHeight: 1.08}}>{l}</div>; })}
    </>
  );
};

/* ═════════════ 9. Vague d'adhésion : la foule passe du gris à la couleur, en ola ═════════════ */
const YWave: React.FC<{cy: number; at: number; go: number; cols?: number; rows?: number}> = ({cy, at, go, cols = 7, rows = 4}) => {
  const t = useT();
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      {Array.from({length: cols * rows}, (_, i) => { const c = i % cols, r = Math.floor(i / cols); const x = 540 + (c - (cols - 1) / 2) * 130, y = cy - 240 + r * 160; const d = go + c * 0.12 + r * 0.05; const on = prog(t, d, d + 0.25); const jump = t > d && t < d + 0.6 ? Math.sin(((t - d) / 0.6) * Math.PI) * 40 : 0; const col = on > 0.5 ? [YG, YB, YT, YO][(c + r) % 4] : '#C3C9D2'; return <g key={i} transform={`translate(${x} ${y - jump})`}><circle cy={-38} r={26} fill={col} stroke={NBK} strokeWidth={5} /><path d="M -40 40 Q -40 -6 0 -6 Q 40 -6 40 40 Z" fill={col} stroke={NBK} strokeWidth={5} />{on > 0.5 && <path d={`M -40 0 L -58 ${-40 - jump * 0.3}`} stroke={NBK} strokeWidth={8} strokeLinecap="round" />}{on > 0.5 && <path d={`M 40 0 L 58 ${-40 - jump * 0.3}`} stroke={NBK} strokeWidth={8} strokeLinecap="round" />}</g>; })}
    </svg>
  );
};

/* ═════════════ 10. Radar 360° : enjeux internes au centre, externes (PESTEL) d'un côté, parties intéressées de l'autre ═════════════ */
const YRadar: React.FC<{cx: number; cy: number; at: number; ext: number; letters?: number; inn: number; par: number; extL: string[]; innL: [string, number][]; parL: [string, string, number][]}> = ({cx, cy, at, ext, letters, inn, par, extL, innL, parL}) => {
  const t = useT();
  const R = 330;
  const sw = Math.max(0, t - at) * 140;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <circle cx={cx} cy={cy} r={R} fill="#0E2238" stroke={NBK} strokeWidth={8} />
        {[0.33, 0.66, 1].map((k) => <circle key={k} cx={cx} cy={cy} r={R * k} fill="none" stroke="#2F6B5E" strokeWidth={3} />)}
        <line x1={cx - R} y1={cy} x2={cx + R} y2={cy} stroke="#2F6B5E" strokeWidth={3} /><line x1={cx} y1={cy - R} x2={cx} y2={cy + R} stroke="#2F6B5E" strokeWidth={3} />
        {Array.from({length: 18}, (_, i) => { const a0 = ((sw - i * 2.2) * Math.PI) / 180; return <path key={i} d={`M ${cx} ${cy} L ${cx + Math.cos(a0) * R} ${cy + Math.sin(a0) * R} A ${R} ${R} 0 0 0 ${cx + Math.cos(a0 - 0.04) * R} ${cy + Math.sin(a0 - 0.04) * R} Z`} fill="#3CFFB0" opacity={0.28 * (1 - i / 18)} />; })}
        <line x1={cx} y1={cy} x2={cx + Math.cos((sw * Math.PI) / 180) * R} y2={cy + Math.sin((sw * Math.PI) / 180) * R} stroke="#3CFFB0" strokeWidth={6} style={{filter: 'drop-shadow(0 0 8px #3CFFB0)'}} />
        <circle cx={cx} cy={cy} r={R * 0.3} fill={t > inn ? YT : '#1B3A55'} stroke="#fff" strokeWidth={4} opacity={0.95} />
      </svg>
      <div style={{position: 'absolute', left: cx - 95, top: cy - 30, width: 190, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff', opacity: pop(t, inn)}}>Internes</div>
      {innL.map(([l, a], i) => <div key={l} style={{position: 'absolute', left: cx - 120, top: cy + 10 + i * 40, width: 240, textAlign: 'center', fontFamily: sansFont, fontWeight: 700, fontSize: 24, color: '#E5FFF6', opacity: pop(t, a)}}>{l}</div>)}
      <div style={{position: 'absolute', left: 40, top: cy - R - 70, ...CAP, fontSize: 24, color: YB, opacity: pop(t, ext)}}>Enjeux externes</div>
      {extL.map((l, i) => { const ang = Math.PI - (i / Math.max(1, extL.length - 1) - 0.5) * 1.9; const px = cx + Math.cos(ang) * (R * 0.66), py = cy - Math.sin(ang) * (R * 0.66) * 1.0; const la = (letters ?? ext) + 0.12 * i; const q = t > la ? Math.min(1, sp(t, la, 9, 12)) : 0; return <div key={i} style={{position: 'absolute', left: px - 32, top: py - 32, width: 64, height: 64, borderRadius: 32, background: YB, border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff', transform: `scale(${q})`, boxShadow: '0 0 16px rgba(60,255,176,0.6)'}}>{l}</div>; })}
      <div style={{position: 'absolute', right: 40, top: cy - R - 70, textAlign: 'right', ...CAP, fontSize: 24, color: YO, opacity: pop(t, par)}}>Parties intéressées</div>
      {parL.map(([l, ic, a], i) => { const ang = (i / Math.max(1, parL.length - 1) - 0.5) * 1.6; const px = cx + Math.cos(ang) * (R * 0.7), py = cy - Math.sin(ang) * (R * 0.7); const q = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0; return <div key={l} style={{position: 'absolute', left: px - 80, top: py - 46, width: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, transform: `scale(${q})`}}><div style={{width: 60, height: 60, borderRadius: 30, background: YO, border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n={ic} size={34} c="#fff" /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: '#fff', background: 'rgba(14,34,56,0.85)', padding: '2px 8px', borderRadius: 8}}>{l}</div></div>; })}
    </>
  );
};

/* ═════════════ 11. Moniteur médical : le tracé s'aplatit en alerte rouge… puis repart sous le bouclier ═════════════ */
const YFlatline: React.FC<{cy: number; at: number; fail: number; fix: number}> = ({cy, at, fail, fix}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const bad = t > fail && t < fix;
  const fixed = t >= fix;
  const N = 140;
  const beat = (u: number) => { const z = ((u % 0.2) + 0.2) % 0.2 / 0.2; return z < 0.4 ? 0 : z < 0.46 ? -40 : z < 0.52 ? 150 : z < 0.58 ? -60 : 0; };
  const pts = Array.from({length: N}, (_, i) => { const u = i / N; const y = bad ? 0 : beat(u + k * 0.6) * (fixed ? Math.min(1, (t - fix) * 2) : 1); return `${140 + 800 * u},${cy - y * 0.9}`; }).join(' ');
  const blink = bad ? (Math.floor(t * 4) % 2 === 0 ? 1 : 0.35) : 0;
  const c = bad ? YR : '#3CFF8A';
  const sq = fixed ? Math.min(1, sp(t, fix, 8, 10)) : 0;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <rect x={100} y={cy - 300} width={880} height={560} rx={30} fill="#2B3240" stroke={NBK} strokeWidth={8} />
        <rect x={130} y={cy - 270} width={820} height={440} rx={16} fill="#06141F" stroke={bad ? YR : '#1E3A4A'} strokeWidth={bad ? 10 * blink : 4} />
        {Array.from({length: 11}, (_, i) => <line key={`v${i}`} x1={140 + i * 80} y1={cy - 260} x2={140 + i * 80} y2={cy + 160} stroke="#0F2E3D" strokeWidth={2} />)}
        {Array.from({length: 6}, (_, i) => <line key={`h${i}`} x1={140} y1={cy - 250 + i * 80} x2={940} y2={cy - 250 + i * 80} stroke="#0F2E3D" strokeWidth={2} />)}
        <polyline points={pts} fill="none" stroke={c} strokeWidth={8} strokeLinejoin="round" style={{filter: `drop-shadow(0 0 10px ${c})`}} />
        <circle cx={880} cy={cy + 215} r={22} fill={bad ? YR : '#3CFF8A'} opacity={bad ? blink : 0.9} />
        <rect x={160} y={cy + 195} width={260} height={40} rx={10} fill="#3B4454" />
      </svg>
      {bad && <div style={{position: 'absolute', left: 0, top: cy - 240, width: 1080, display: 'flex', justifyContent: 'center', opacity: blink}}><div style={{...nb(YR, 6), borderColor: NBK, padding: '8px 26px', ...CAP, fontSize: 34, color: '#fff', display: 'flex', alignItems: 'center', gap: 12}}><Ico n="TriangleAlert" size={36} c="#fff" />Alerte</div></div>}
      {sq > 0 && <div style={{position: 'absolute', left: 540 - 90, top: cy - 230, width: 180, height: 180, borderRadius: 90, background: '#fff', border: `8px solid ${YG}`, boxShadow: `8px 8px 0 ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${sq})`}}><Ico n="ShieldCheck" size={110} c={YG} /></div>}
    </>
  );
};

/* ═════════════ 12. Le cœur du réacteur : noyau incandescent, satellites qui s'allument et le relient ═════════════ */
const YReactor: React.FC<{cx: number; cy: number; at: number; items: [string, string, number][]; R?: number}> = ({cx, cy, at, items, R = 330}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const n = items.length;
  const lit = items.filter((it) => t >= it[2]).length;
  const pulse = 1 + 0.05 * Math.sin(k * 6) + lit * 0.02;
  const pos = items.map((_, i) => { const a = -Math.PI / 2 + (i / n) * Math.PI * 2; return [cx + Math.cos(a) * R, cy + Math.sin(a) * R * 0.92] as [number, number]; });
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <defs><radialGradient id="yrcore"><stop offset="0%" stopColor="#FFFFFF" /><stop offset="35%" stopColor="#7FE7FF" /><stop offset="100%" stopColor={YB} stopOpacity={0} /></radialGradient></defs>
        {items.map((it, i) => t >= it[2] && <line key={i} x1={cx} y1={cy} x2={pos[i][0]} y2={pos[i][1]} stroke="#7FE7FF" strokeWidth={10} strokeDasharray="24 16" strokeDashoffset={-k * 160} style={{filter: 'drop-shadow(0 0 8px #7FE7FF)'}} />)}
        <circle cx={cx} cy={cy} r={230 * pulse} fill="url(#yrcore)" />
        {[0, 1, 2].map((j) => <ellipse key={j} cx={cx} cy={cy} rx={170} ry={58} fill="none" stroke="#BFF4FF" strokeWidth={4} transform={`rotate(${j * 60 + k * 30} ${cx} ${cy})`} />)}
        {[0, 1, 2].map((j) => { const a = k * 3 + j * 2.1; const ex = Math.cos(a) * 170, ey = Math.sin(a) * 58; const r0 = ((j * 60 + k * 30) * Math.PI) / 180; return <circle key={`e${j}`} cx={cx + ex * Math.cos(r0) - ey * Math.sin(r0)} cy={cy + ex * Math.sin(r0) + ey * Math.cos(r0)} r={12} fill="#fff" style={{filter: 'drop-shadow(0 0 10px #7FE7FF)'}} />; })}
        <circle cx={cx} cy={cy} r={70} fill={YN} stroke="#fff" strokeWidth={6} />
      </svg>
      <div style={{position: 'absolute', left: cx - 70, top: cy - 70, width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, at)}}><Ico n="Zap" size={70} c={YY} /></div>
      {items.map(([l, ic, a], i) => { const on = t >= a; const q = Math.min(1, sp(t, at + 0.2 + i * 0.08, 9, 12)); return <div key={l} style={{position: 'absolute', left: pos[i][0] - 110, top: pos[i][1] - 60, width: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, transform: `scale(${q * (on ? 1.06 : 0.9)})`, opacity: on ? 1 : 0.45}}><div style={{width: 84, height: 84, borderRadius: 42, background: on ? YB : '#fff', border: `5px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: on ? '0 0 26px #7FE7FF' : undefined}}><Ico n={ic} size={46} c={on ? '#fff' : YB} /></div><div style={{...nb('#fff', 4), borderColor: NBK, padding: '4px 10px', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK, textAlign: 'center', lineHeight: 1.05}}>{l}</div></div>; })}
    </>
  );
};

/* ═════════════ 13. Tableau de bord : quatre cadrans dont l'aiguille s'anime (aucune valeur inventée) ═════════════ */
const YDials: React.FC<{y: number; at: number; items: [string, string, number][]}> = ({y, at, items}) => {
  const t = useT();
  return (
    <Abs x={70} y={y} w={940} h={760} style={{display: 'flex', flexWrap: 'wrap', gap: 30, justifyContent: 'center'}}>
      {items.map(([l, ic, a], i) => { const on = t > a; const q = on ? Math.min(1, sp(t, a, 9, 12)) : 0; const ang = -120 + prog(t, a, a + 1.0, easeOut) * (150 + 30 * Math.sin(i * 2.3)) + Math.sin(t * 2.4 + i) * 4; return (
        <div key={l} style={{width: 440, height: 360, ...nb('#fff', 8), borderColor: NBK, transform: `scale(${q})`, position: 'relative'}}>
          <svg width={440} height={250} style={{position: 'absolute', left: 0, top: 10}}>
            {[[-120, -60, YR], [-60, 0, YO], [0, 60, YY], [60, 120, YG]].map(([a0, a1, c], j) => { const p0 = ((Number(a0) - 90) * Math.PI) / 180, p1 = ((Number(a1) - 90) * Math.PI) / 180; return <path key={j} d={`M ${220 + Math.cos(p0) * 150} ${220 + Math.sin(p0) * 150} A 150 150 0 0 1 ${220 + Math.cos(p1) * 150} ${220 + Math.sin(p1) * 150}`} fill="none" stroke={String(c)} strokeWidth={30} />; })}
            <g transform={`rotate(${ang} 220 220)`}><polygon points="214,220 226,220 220,90" fill={NBK} /></g>
            <circle cx={220} cy={220} r={18} fill={YN} stroke={NBK} strokeWidth={4} />
          </svg>
          <div style={{position: 'absolute', left: 0, bottom: 24, width: 440, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}><Ico n={ic} size={34} c={YB} />{l}</div>
        </div>
      ); })}
    </Abs>
  );
};

/* ═════════════ 14. Connaissance / compétence : la notice d'un côté, le meuble qui se monte de l'autre ═════════════ */
const YFlatpack: React.FC<{cy: number; at: number; know: number; skill: number; screws: number; cross: number}> = ({cy, at, know, skill, screws, cross}) => {
  const t = useT();
  const parts: [number, number, number, number, number][] = [[0, 0, 26, 420, 0], [254, 0, 26, 420, 0.25], [0, 0, 280, 26, 0.5], [0, 394, 280, 26, 0.75], [26, 26, 114, 368, 1.0], [140, 26, 114, 368, 1.2]];
  const op = prog(t, know, know + 0.6, easeOut);
  const sc = prog(t, screws, screws + 0.5, easeIn);
  const cr = prog(t, cross, cross + 0.35, easeOut);
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <g transform={`translate(80 ${cy - 220})`} opacity={pop(t, know - 0.3)}>
          <rect x={0} y={0} width={180} height={250} fill="#fff" stroke={NBK} strokeWidth={6} transform={`skewY(${-8 * op})`} />
          <rect x={180} y={0} width={180 * op} height={250} fill="#F7F7F2" stroke={NBK} strokeWidth={6} transform={`skewY(${8 * op})`} />
          {[0, 1, 2, 3].map((i) => <rect key={i} x={24} y={40 + i * 46} width={130} height={18} rx={4} fill="#C9D2DF" transform={`skewY(${-8 * op})`} />)}
          {op > 0.6 && [0, 1, 2].map((i) => <rect key={`r${i}`} x={204} y={50 + i * 60} width={120} height={36} rx={6} fill="none" stroke={YB} strokeWidth={4} transform={`skewY(8)`} />)}
        </g>
        <rect x={560} y={cy + 230} width={440} height={30} rx={10} fill="#B9845A" opacity={0.6} />
        <g transform={`translate(640 ${cy - 200})`}>
          {parts.map(([x, y, w, h, d], i) => { const a = skill + d; const f = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0; return <rect key={i} x={x} y={y - (1 - f) * 260} width={w} height={h} fill={i >= 4 ? '#E9C79A' : '#D7A86E'} stroke={NBK} strokeWidth={5} opacity={t > a ? 1 : 0} />; })}
          {t > skill + 1.4 && <><circle cx={128} cy={210} r={8} fill={NBK} /><circle cx={152} cy={210} r={8} fill={NBK} /></>}
        </g>
        {[0, 1, 2].map((i) => { const x = 700 + i * 70; const y = lerp(cy - 120, cy + 236, sc) + (i % 2) * 6; return <g key={i} opacity={t > screws ? 1 : 0} transform={`translate(${x} ${y}) rotate(${sc * (200 + i * 70)})`}><rect x={-6} y={-30} width={12} height={44} rx={3} fill="#8A96A8" stroke={NBK} strokeWidth={3} /><rect x={-16} y={-36} width={32} height={12} rx={4} fill="#8A96A8" stroke={NBK} strokeWidth={3} /></g>; })}
        {cr > 0 && <g stroke={YR} strokeWidth={16} strokeLinecap="round"><line x1={650} y1={cy + 160} x2={650 + 260 * cr} y2={cy + 160 + 120 * cr} /><line x1={910} y1={cy + 160} x2={910 - 260 * cr} y2={cy + 160 + 120 * cr} /></g>}
      </svg>
      <div style={{position: 'absolute', left: 60, top: cy + 110, width: 400, textAlign: 'center', opacity: pop(t, know)}}><div style={{display: 'inline-block', ...nb(YB, 6), borderColor: NBK, padding: '8px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: '#fff'}}>Connaissance</div><div style={{...CAP, fontSize: 22, color: DIM, marginTop: 12}}>la théorie, la notice</div></div>
      <div style={{position: 'absolute', left: 580, top: cy - 330, width: 440, textAlign: 'center', opacity: pop(t, skill)}}><div style={{display: 'inline-block', ...nb(YG, 6), borderColor: NBK, padding: '8px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: '#fff'}}>Compétence</div></div>
    </>
  );
};

/* ═════════════ 15. Le coffre de confiance : l'immeuble du client sous un dôme, la clé tourne dans la serrure ═════════════ */
const YVault: React.FC<{cx: number; cy: number; at: number; dome: number; key0: number}> = ({cx, cy, at, dome, key0}) => {
  const t = useT();
  const d = prog(t, dome, dome + 0.9, easeOut);
  const kq = prog(t, key0, key0 + 0.8, easeInOut);
  const turn = prog(t, key0 + 0.8, key0 + 1.2, easeOut);
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <rect x={cx - 380} y={cy + 230} width={760} height={30} rx={12} fill="#8A96A8" stroke={NBK} strokeWidth={5} />
        <rect x={cx - 170} y={cy - 160} width={340} height={390} fill="#F2E6D4" stroke={NBK} strokeWidth={7} />
        {Array.from({length: 12}, (_, i) => <rect key={i} x={cx - 140 + (i % 3) * 100} y={cy - 130 + Math.floor(i / 3) * 80} width={70} height={52} fill={(i + Math.floor(t * 2)) % 7 === 0 ? YY : '#9FD3FF'} stroke={NBK} strokeWidth={4} />)}
        <rect x={cx - 40} y={cy + 160} width={80} height={70} fill={YN} stroke={NBK} strokeWidth={5} />
        <path d={`M ${cx - 330} ${cy + 230} A 330 400 0 0 1 ${cx + 330} ${cy + 230}`} fill="rgba(127,231,255,0.18)" stroke="#5BC8F0" strokeWidth={8} pathLength={1} strokeDasharray={`${d} 1`} style={{filter: d > 0.9 ? 'drop-shadow(0 0 18px #7FE7FF)' : undefined}} />
        <g transform={`translate(${cx + 260} ${cy - 250})`} opacity={pop(t, key0 - 0.4)}>
          <rect x={-60} y={-10} width={120} height={110} rx={16} fill={YY} stroke={NBK} strokeWidth={6} /><path d="M -36 -10 V -48 A 36 36 0 0 1 36 -48 V -10" fill="none" stroke={NBK} strokeWidth={12} transform={`translate(0 ${turn * -14})`} /><circle cx={0} cy={36} r={12} fill={NBK} /><rect x={-5} y={36} width={10} height={34} fill={NBK} />
        </g>
        <g transform={`translate(${lerp(cx - 420, cx + 260, kq)} ${lerp(cy - 400, cy - 214, kq)}) rotate(${turn * 90})`} opacity={t > key0 - 0.2 ? 1 - prog(t, key0 + 1.4, key0 + 1.7) : 0}>
          <circle cx={-70} cy={0} r={30} fill="none" stroke={YO} strokeWidth={14} /><rect x={-40} y={-7} width={80} height={14} fill={YO} /><rect x={22} y={0} width={10} height={22} fill={YO} /><rect x={6} y={0} width={10} height={16} fill={YO} />
        </g>
      </svg>
    </>
  );
};

/* ═════════════ 16. Lever de rideau : le rideau rouge s'ouvre sur la scène, poursuite comprise (la répétition générale) ═════════════ */
const YCurtain: React.FC<{x: number; y: number; w: number; h: number; at: number; open: number; children: React.ReactNode}> = ({x, y, w, h, at, open, children}) => {
  const t = useT();
  const o = prog(t, open, open + 1.2, easeInOut);
  const fold = (side: number) => Array.from({length: 6}, (_, i) => <div key={i} style={{position: 'absolute', top: 0, bottom: 0, left: `${(i / 6) * 100}%`, width: `${100 / 6}%`, background: `linear-gradient(90deg, #7A0F17, #C8202D ${40 + side * 10}%, #7A0F17)`}} />);
  return (
    <Abs x={x} y={y} w={w} h={h} style={{opacity: pop(t, at), overflow: 'hidden', border: `8px solid ${NBK}`, borderRadius: 20, boxShadow: `10px 10px 0 ${NBK}`, background: '#120A06'}}>
      <div style={{position: 'absolute', inset: 0}}>{children}</div>
      <div style={{position: 'absolute', inset: 0, background: `radial-gradient(ellipse 40% 60% at 50% 55%, rgba(255,240,200,${0.25 * o}) 0%, rgba(0,0,0,${0.45 * o}) 70%)`}} />
      <div style={{position: 'absolute', top: 0, bottom: 0, left: 0, width: w / 2 + 4, transform: `translateX(${-o * (w / 2 - 50)}px) scaleX(${1 - o * 0.75})`, transformOrigin: '0 50%'}}>{fold(0)}</div>
      <div style={{position: 'absolute', top: 0, bottom: 0, right: 0, width: w / 2 + 4, transform: `translateX(${o * (w / 2 - 50)}px) scaleX(${1 - o * 0.75})`, transformOrigin: '100% 50%'}}>{fold(1)}</div>
      <div style={{position: 'absolute', left: 0, top: 0, width: w, height: 70, background: 'linear-gradient(#A0141F, #6E0D14)', borderBottom: `6px solid ${YY}`}} />
    </Abs>
  );
};

/* ═════════════ 17. Voyants au vert… BOUM ! ═════════════ */
const YLights: React.FC<{cy: number; at: number; step: number; boom: number}> = ({cy, at, step, boom}) => {
  const t = useT();
  const bq = t > boom ? Math.min(1, sp(t, boom, 8, 8)) : 0;
  return (
    <>
      <Abs x={190} y={cy - 130} w={700} h={260} style={{...nb('#2B3240', 10), borderColor: NBK, opacity: pop(t, at), display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
        {[0, 1, 2].map((i) => { const on = t > at + 0.3 + i * step; return <div key={i} style={{width: 150, height: 150, borderRadius: 75, background: on ? '#3CFF8A' : '#4A5363', border: `7px solid ${NBK}`, boxShadow: on ? '0 0 50px #3CFF8A, inset 0 -10px 20px rgba(0,0,0,0.25)' : 'inset 0 -10px 20px rgba(0,0,0,0.35)'}} />; })}
      </Abs>
      {bq > 0 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>{Array.from({length: 20}, (_, i) => { const th = (i / 20) * Math.PI * 2; const r0 = 200 + 380 * prog(t, boom, boom + 0.6, easeOut); return <line key={i} x1={540 + Math.cos(th) * r0 * 0.6} y1={cy + 280 + Math.sin(th) * r0 * 0.4} x2={540 + Math.cos(th) * r0} y2={cy + 280 + Math.sin(th) * r0 * 0.6} stroke={i % 2 ? YY : YO} strokeWidth={12} strokeLinecap="round" opacity={1 - prog(t, boom + 0.3, boom + 0.9)} />; })}</svg>}
      {bq > 0 && <div style={{position: 'absolute', left: 0, top: cy + 210, width: 1080, display: 'flex', justifyContent: 'center'}}><div style={{transform: `scale(${bq}) rotate(-5deg)`, ...nb(YO, 10), borderColor: NBK, padding: '10px 40px', fontFamily: sansFont, fontWeight: 900, fontSize: 96, color: '#fff'}}>BOUM !</div></div>}
    </>
  );
};

/* ═════════════ 18. La loupe de l'auditeur glisse sur la liste et coche chaque critère ═════════════ */
const YMagnify: React.FC<{x: number; y: number; at: number; rows: [string, number][]}> = ({x, y, at, rows}) => {
  const t = useT();
  const cur = rows.reduce((acc, r, i) => (t >= r[1] ? i : acc), -1);
  const ly = cur < 0 ? -40 : lerp(cur === 0 ? -40 : 150 + (cur - 1) * 150, 150 + cur * 150, prog(t, rows[cur][1], rows[cur][1] + 0.5, easeInOut));
  return (
    <Abs x={x} y={y} w={900} h={190 + rows.length * 150} style={{opacity: pop(t, at)}}>
      <div style={{position: 'absolute', inset: 0, ...nb('#fff', 10), borderColor: NBK}} />
      <div style={{position: 'absolute', left: 36, top: 40, ...CAP, fontSize: 28, color: YN}}>Critères de l'audit</div>
      {rows.map(([l, a], i) => { const c = prog(t, a + 0.35, a + 0.6, easeOut); return <div key={l} style={{position: 'absolute', left: 36, top: 110 + i * 150, width: 830, height: 120, display: 'flex', alignItems: 'center', gap: 24, borderBottom: '3px solid #EEF1F5', opacity: t > a - 0.2 ? 1 : 0.35}}><div style={{width: 74, height: 74, borderRadius: 14, border: `6px solid ${NBK}`, background: c > 0 ? YG : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{c > 0 && <div style={{transform: `scale(${c})`}}><Ico n="Check" size={50} c="#fff" /></div>}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK, lineHeight: 1.08}}>{l}</div></div>; })}
      {cur >= 0 && <svg width={260} height={260} style={{position: 'absolute', left: 600, top: ly + 40}}><circle cx={100} cy={100} r={70} fill="rgba(160,215,255,0.25)" stroke={NBK} strokeWidth={12} /><line x1={150} y1={150} x2={230} y2={230} stroke={NBK} strokeWidth={22} strokeLinecap="round" /></svg>}
    </Abs>
  );
};

/* ═════════════ 19. Le certificat se déroule, le sceau d'or tombe, confettis ═════════════ */
const YCert: React.FC<{cy: number; at: number; seal: number; title?: string; sub?: string}> = ({cy, at, seal, title = 'CERTIFICAT', sub = 'ISO 9001'}) => {
  const t = useT();
  const u = prog(t, at, at + 0.9, easeOut);
  const s = t > seal ? Math.min(1, sp(t, seal, 8, 9)) : 0;
  return (
    <>
      <Abs x={170} y={cy - 360} w={740} h={720} style={{transform: `scaleY(${Math.max(0.02, u)})`, transformOrigin: '50% 0%', background: '#FFFCF2', border: `8px solid ${NBK}`, borderRadius: 14, boxShadow: `12px 12px 0 ${YN}`}}>
        <div style={{position: 'absolute', inset: 22, border: `5px double ${YO}`, borderRadius: 8}} />
        <div style={{position: 'absolute', left: 0, top: 90, width: 740, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: YN, letterSpacing: 6}}>{title}</div>
        <div style={{position: 'absolute', left: 0, top: 200, width: 740, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 92, color: YB}}>{sub}</div>
        {[0, 1, 2].map((i) => <div key={i} style={{position: 'absolute', left: 120, top: 360 + i * 50, width: 500 - i * 80, height: 16, borderRadius: 8, background: '#E4DCCB'}} />)}
      </Abs>
      {s > 0 && <div style={{position: 'absolute', left: 640, top: cy + 140, width: 200, height: 200, transform: `scale(${2 - s}) rotate(${(1 - s) * 40}deg)`, opacity: s}}><svg width={200} height={200}>{Array.from({length: 24}, (_, i) => { const a = (i / 24) * Math.PI * 2; return <circle key={i} cx={100 + Math.cos(a) * 86} cy={100 + Math.sin(a) * 86} r={14} fill="#E0A800" />; })}<circle cx={100} cy={100} r={84} fill={YY} stroke={NBK} strokeWidth={6} /><circle cx={100} cy={100} r={60} fill="none" stroke={NBK} strokeWidth={3} /></svg><div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="Award" size={80} c={NBK} /></div></div>}
      {s > 0 && Array.from({length: 40}, (_, i) => { const k = t - seal; const x = 540 + (random(`cfx${i}`) - 0.5) * 1000 * Math.min(1, k * 1.5); const y = cy - 300 + k * (300 + random(`cfy${i}`) * 500) - Math.max(0, 1 - k) * 200; return <div key={i} style={{position: 'absolute', left: x, top: y, width: 16, height: 26, background: [YR, YB, YY, YG, YO][i % 5], transform: `rotate(${k * 400 + i * 30}deg)`, opacity: 1 - prog(t, seal + 2.0, seal + 3.0)}} />; })}
    </>
  );
};

/* ═════════════ 20. Le cycle de trois ans : deux audits de surveillance, puis le renouvellement ═════════════ */
const YTriad: React.FC<{cx: number; cy: number; at: number; marks: [string, string, number][]; center: string}> = ({cx, cy, at, marks, center}) => {
  const t = useT();
  const R = 300;
  const cur = marks.reduce((acc, m, i) => (t >= m[2] ? i : acc), -1);
  const ang = cur < 0 ? -90 : -90 + (cur + prog(t, marks[cur][2], marks[cur][2] + 0.8, easeInOut) * 0) * 120 + 60;
  const sat = cur < 0 ? -90 : lerp(cur === 0 ? -90 : -90 + (cur - 1) * 120 + 60, -90 + cur * 120 + 60, prog(t, marks[cur][2], marks[cur][2] + 0.8, easeInOut));
  void ang;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        {marks.map((m, i) => { const a0 = ((-90 + i * 120 + 4) * Math.PI) / 180, a1 = ((-90 + (i + 1) * 120 - 4) * Math.PI) / 180; return <path key={i} d={`M ${cx + Math.cos(a0) * R} ${cy + Math.sin(a0) * R} A ${R} ${R} 0 0 1 ${cx + Math.cos(a1) * R} ${cy + Math.sin(a1) * R}`} fill="none" stroke={t >= m[2] ? m[1] : '#D5DAE2'} strokeWidth={60} strokeLinecap="butt" />; })}
        {cur >= 0 && <circle cx={cx + Math.cos((sat * Math.PI) / 180) * R} cy={cy + Math.sin((sat * Math.PI) / 180) * R} r={34} fill="#fff" stroke={NBK} strokeWidth={6} style={{filter: 'drop-shadow(0 0 12px rgba(0,0,0,0.3))'}} />}
        <circle cx={cx} cy={cy} r={170} fill="#fff" stroke={NBK} strokeWidth={8} />
      </svg>
      <div style={{position: 'absolute', left: cx - 170, top: cy - 70, width: 340, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 100, color: YN, opacity: pop(t, at), lineHeight: 1}}>{center}</div>
      <div style={{position: 'absolute', left: cx - 170, top: cy + 34, width: 340, textAlign: 'center', ...CAP, fontSize: 22, color: DIM, opacity: pop(t, at)}}>un cycle</div>
      {marks.map(([l, c, a], i) => { const th = ((-90 + i * 120 + 60) * Math.PI) / 180; const x = cx + Math.cos(th) * (R + 120), y = cy + Math.sin(th) * (R + 90); const q = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0; return <div key={i} style={{position: 'absolute', left: x - 150, top: y - 30, width: 300, display: 'flex', justifyContent: 'center', transform: `scale(${q})`}}><div style={{...nb(c, 5), borderColor: NBK, padding: '8px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff', whiteSpace: 'nowrap'}}>{l}</div></div>; })}
    </>
  );
};

/* ═════════════ 21. La boîte à outils : quatre cartes qui jaillissent, chacune avec sa mini-animation ═════════════ */
const ToolArt: React.FC<{k: string; t0: number}> = ({k, t0}) => {
  const t = useT();
  const u = Math.max(0, t - t0);
  if (k === 'why') return <svg width={300} height={170}>{Array.from({length: 5}, (_, i) => { const on = u > i * 0.25; return <g key={i} opacity={on ? 1 : 0.15}><rect x={40 + i * 10} y={10 + i * 30} width={220 - i * 20} height={24} rx={8} fill={i === 4 ? YR : '#C9A77C'} stroke={NBK} strokeWidth={3} /><text x={150} y={28 + i * 30} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={18} fill={i === 4 ? '#fff' : NBK}>Pourquoi ?</text></g>; })}</svg>;
  if (k === 'dmaic') return <div style={{display: 'flex', gap: 8, padding: '40px 10px'}}>{['D', 'M', 'A', 'I', 'C'].map((l, i) => { const on = Math.floor(u * 2.5) % 6 >= i + 1 || u > 2.4; return <div key={i} style={{width: 50, height: 70, borderRadius: 10, background: on ? YT : '#fff', border: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: on ? '#fff' : NBK}}>{l}</div>; })}</div>;
  if (k === 'gantt') return <svg width={300} height={170}>{[[20, 90], [80, 120], [150, 100], [60, 160], [200, 80]].map(([x, w], i) => <rect key={i} x={x} y={14 + i * 30} width={w * prog(t, t0 + i * 0.15, t0 + i * 0.15 + 0.6, easeOut)} height={20} rx={6} fill={[YB, YO, YG, YT, YR][i]} stroke={NBK} strokeWidth={3} />)}<line x1={10} y1={5} x2={10} y2={165} stroke={NBK} strokeWidth={4} /></svg>;
  return <svg width={300} height={170}><g transform={`translate(150 85) rotate(${u * 90})`}>{['P', 'D', 'C', 'A'].map((l, i) => { const a0 = (i * Math.PI) / 2 - Math.PI / 2, a1 = a0 + Math.PI / 2; return <g key={l}><path d={`M 0 0 L ${Math.cos(a0) * 75} ${Math.sin(a0) * 75} A 75 75 0 0 1 ${Math.cos(a1) * 75} ${Math.sin(a1) * 75} Z`} fill={[YB, YG, YO, YR][i]} stroke={NBK} strokeWidth={4} /><text x={Math.cos(a0 + Math.PI / 4) * 44} y={Math.sin(a0 + Math.PI / 4) * 44 + 12} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={34} fill="#fff" transform={`rotate(${-u * 90} ${Math.cos(a0 + Math.PI / 4) * 44} ${Math.sin(a0 + Math.PI / 4) * 44})`}>{l}</text></g>; })}</g></svg>;
};
const YToolbox: React.FC<{y: number; at: number; items: [string, string, number][]}> = ({y, at, items}) => {
  const t = useT();
  const lid = prog(t, at + 0.2, at + 0.7, easeOut);
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <rect x={340} y={y + 700} width={400} height={150} rx={16} fill={YR} stroke={NBK} strokeWidth={7} />
        <g transform={`rotate(${-lid * 35} 340 ${y + 700})`}><rect x={330} y={y + 660} width={420} height={50} rx={12} fill="#B8352B" stroke={NBK} strokeWidth={7} /></g>
        <rect x={480} y={y + 740} width={120} height={30} rx={10} fill="#8A2A22" stroke={NBK} strokeWidth={5} />
      </svg>
      {items.map(([l, k, a], i) => { const f = t > a ? Math.min(1, sp(t, a, 9, 11)) : 0; const tx = (i % 2) * 480, ty = Math.floor(i / 2) * 330; return (
        <div key={l} style={{position: 'absolute', left: lerp(390, 70 + tx, f), top: lerp(y + 720, y + ty, f), width: 460, height: 310, transform: `scale(${0.3 + 0.7 * f}) rotate(${(1 - f) * (i % 2 ? 30 : -30)}deg)`, opacity: t > a ? 1 : 0, ...nb('#fff', 8), borderColor: NBK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6}}>
          <ToolArt k={k} t0={a} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: YN}}>{l}</div>
        </div>
      ); })}
    </>
  );
};

/* ═════════════ 22. La roue de Deming gravit la pente, la cale l'empêche de redescendre ═════════════ */
const YDeming: React.FC<{cy: number; at: number; steps: [string, number][]}> = ({cy, at, steps}) => {
  const t = useT();
  const climb = prog(t, at + 0.3, steps[steps.length - 1][1] + 0.8, easeInOut);
  const slope = -0.42;
  const x0 = 160, y0 = cy + 280;
  const R = 150;
  const wx = lerp(x0 + 140, 760, climb), wy = y0 + (wx - x0) * slope;
  const rot = -((wx - x0 - 140) / R) * (180 / Math.PI);
  const L = Math.sqrt(1 + slope * slope);
  const ps = (x: number): [number, number] => [x, y0 + (x - x0) * slope];
  const [ax, ay] = ps(wx - R * 0.62), [bx, by] = ps(wx - R * 0.62 - 120);
  const [tx, ty] = [ax + (slope / L) * 95, ay - 95 / L];
  const cur = steps.reduce((acc, s0, i) => (t >= s0[1] ? i : acc), -1);
  const cols = [YB, YG, YO, YR];
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <polygon points={`${x0},${y0} ${980},${y0 + (980 - x0) * slope} ${980},${y0 + 60} ${x0},${y0 + 60}`} fill="#E4DCCB" stroke={NBK} strokeWidth={7} />
        <g transform={`translate(${wx + (R * slope) / L} ${wy - R / L})`}>
          <g transform={`rotate(${rot})`}>{['P', 'D', 'C', 'A'].map((l, i) => { const a0 = (i * Math.PI) / 2 - Math.PI, a1 = a0 + Math.PI / 2; const on = cur === i; return <g key={l}><path d={`M 0 0 L ${Math.cos(a0) * R} ${Math.sin(a0) * R} A ${R} ${R} 0 0 1 ${Math.cos(a1) * R} ${Math.sin(a1) * R} Z`} fill={cols[i]} stroke={NBK} strokeWidth={7} opacity={on || cur < 0 ? 1 : 0.75} /><text x={Math.cos(a0 + Math.PI / 4) * 88} y={Math.sin(a0 + Math.PI / 4) * 88 + 22} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={64} fill="#fff" transform={`rotate(${-rot} ${Math.cos(a0 + Math.PI / 4) * 88} ${Math.sin(a0 + Math.PI / 4) * 88})`}>{l}</text></g>; })}</g>
          <circle r={26} fill="#fff" stroke={NBK} strokeWidth={6} />
        </g>
        <polygon points={`${ax},${ay} ${bx},${by} ${tx},${ty}`} fill={YY} stroke={NBK} strokeWidth={6} strokeLinejoin="round" />
      </svg>
      {steps.map(([l, a], i) => { const q = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0; return <div key={l} style={{position: 'absolute', left: 70 + i * 240, top: cy - 420, width: 220, display: 'flex', justifyContent: 'center', transform: `scale(${q})`}}><div style={{...nb(cols[i], 5), borderColor: NBK, padding: '8px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>{l}</div></div>; })}
    </>
  );
};

/* ═════════════ 23. La magie du système : un insigne entouré d'étoiles qui scintillent ═════════════ */
const YMagic: React.FC<{cx: number; cy: number; at: number; label: string}> = ({cx, cy, at, label}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const q = Math.min(1, sp(t, at, 8, 10));
  const star = (r: number) => Array.from({length: 10}, (_, i) => { const a = (i / 10) * Math.PI * 2 - Math.PI / 2; const rr = i % 2 ? r * 0.42 : r; return `${Math.cos(a) * rr},${Math.sin(a) * rr}`; }).join(' ');
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        {Array.from({length: 18}, (_, i) => { const a = (i / 18) * Math.PI * 2 + k * 0.4; const r0 = 260 + 60 * Math.sin(k * 2 + i); const tw = 0.5 + 0.5 * Math.sin(k * 6 + i * 1.7); return <polygon key={i} points={star(16 + 14 * tw)} transform={`translate(${cx + Math.cos(a) * r0} ${cy + Math.sin(a) * r0 * 0.9})`} fill={i % 3 ? YY : '#fff'} stroke={NBK} strokeWidth={3} opacity={0.4 + 0.6 * tw} />; })}
        <circle cx={cx} cy={cy} r={200 * q} fill={YB} stroke={NBK} strokeWidth={10} style={{filter: `drop-shadow(0 0 ${30 + 10 * Math.sin(k * 4)}px ${YY})`}} />
        <circle cx={cx} cy={cy} r={160 * q} fill="none" stroke="#fff" strokeWidth={5} strokeDasharray="14 10" transform={`rotate(${k * 20} ${cx} ${cy})`} />
      </svg>
      <div style={{position: 'absolute', left: cx - 200, top: cy - 50, width: 400, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 96, color: '#fff', transform: `scale(${q})`}}>{label}</div>
    </>
  );
};

/* ═════════════ Palette QSE intégrée ═════════════ */
const IQ = '#1F5FBF', IS = '#E2483B', IE = '#1E9E5A', IN = '#14284B', IO = '#F08A24';
const QSE3: [string, string][] = [['9001', IQ], ['14001', IE], ['45001', IS]];

/* ═════════════ 1. Trois cordons parallèles qui s'emmêlent en nœud (le casse-tête administratif) ═════════════ */
const ITangle: React.FC<{cy: number; at: number; knot: number}> = ({cy, at, knot}) => {
  const t = useT();
  const k = prog(t, knot, knot + 1.4, easeInOut);
  const draw = prog(t, at + 0.2, at + 1.4, easeOut);
  const path = (i: number) => { const N = 60; const y0 = cy - 160 + i * 160; return Array.from({length: N + 1}, (_, j) => { const u = j / N; const x = 220 + 760 * u; const tang = Math.sin(u * Math.PI) ** 2; const y = y0 + k * tang * (Math.sin(u * 14 + i * 2.1 + t * 1.5) * 170 + (cy - y0) * 0.9); return `${j ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)}`; }).join(' '); };
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        {QSE3.map(([, c], i) => <path key={i} d={path(i)} fill="none" stroke={NBK} strokeWidth={30} strokeLinecap="round" pathLength={1} strokeDasharray={`${draw} 1`} />)}
        {QSE3.map(([, c], i) => <path key={`c${i}`} d={path(i)} fill="none" stroke={c} strokeWidth={20} strokeLinecap="round" pathLength={1} strokeDasharray={`${draw} 1`} />)}
      </svg>
      {QSE3.map(([l, c], i) => { const q = Math.min(1, sp(t, at + i * 0.15, 9, 12)); return <div key={l} style={{position: 'absolute', left: 50, top: cy - 160 + i * 160 - 50, width: 170, height: 100, ...nb(c, 6), borderColor: NBK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 42, color: '#fff', transform: `scale(${q})`}}>{l}</div>; })}
    </>
  );
};

/* ═════════════ 2. Le trilemme : la bille choisit un sommet… puis « non » : tout s'allume, la bille au centre ═════════════ */
const ITrilemma: React.FC<{cx: number; cy: number; at: number; verts: [string, string, number][]; choose: number; none: number}> = ({cx, cy, at, verts, choose, none}) => {
  const t = useT();
  const R = 340;
  const P = verts.map((_, i) => { const a = -Math.PI / 2 + (i / 3) * Math.PI * 2; return [cx + Math.cos(a) * R, cy + Math.sin(a) * R * 0.95] as [number, number]; });
  const ch = prog(t, choose, choose + 0.8, easeInOut), nn = prog(t, none, none + 0.7, easeInOut);
  const bx = lerp(lerp(cx, P[0][0], ch), cx, nn), by = lerp(lerp(cy, P[0][1], ch), cy, nn);
  const fill = nn;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <polygon points={P.map((p) => p.join(',')).join(' ')} fill={`rgba(30,158,90,${0.18 * fill})`} stroke={NBK} strokeWidth={8} strokeLinejoin="round" />
        {P.map((p, i) => <line key={i} x1={cx} y1={cy} x2={p[0]} y2={p[1]} stroke="#C9D2DF" strokeWidth={4} strokeDasharray="12 10" />)}
        <circle cx={bx} cy={by} r={38} fill={nn > 0.5 ? IE : IO} stroke={NBK} strokeWidth={6} style={{filter: nn > 0.5 ? `drop-shadow(0 0 20px ${IE})` : undefined}} />
      </svg>
      {verts.map(([l, ic, a], i) => { const q = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0; const dim = ch > 0.5 && nn < 0.5 && i > 0; return <div key={l} style={{position: 'absolute', left: P[i][0] - 110, top: P[i][1] - 80, width: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, transform: `scale(${q})`, opacity: dim ? 0.3 : 1}}><div style={{width: 110, height: 110, borderRadius: 55, background: nn > 0.5 || (i === 0 && ch > 0.5) ? [IQ, IS, IE][i] : '#fff', border: `6px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n={ic} size={60} c={nn > 0.5 || (i === 0 && ch > 0.5) ? '#fff' : NBK} /></div><div style={{...nb('#fff', 4), borderColor: NBK, padding: '4px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>{l}</div></div>; })}
    </>
  );
};

/* ═════════════ 3. Trois cercles qui convergent : leur cœur commun devient le SMI ═════════════ */
const IVenn: React.FC<{cx: number; cy: number; at: number; merge: number; core: number; labels: [string, string][]; coreL: string}> = ({cx, cy, at, merge, core, labels, coreL}) => {
  const t = useT();
  const m = prog(t, merge, merge + 1.4, easeInOut);
  const d = lerp(260, 120, m);
  const cq = t > core ? Math.min(1, sp(t, core, 8, 10)) : 0;
  const pos = labels.map((_, i) => { const a = -Math.PI / 2 + (i / 3) * Math.PI * 2; return [cx + Math.cos(a) * d, cy + Math.sin(a) * d] as [number, number]; });
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        {pos.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={210} fill={labels[i][1]} opacity={0.42} stroke={NBK} strokeWidth={6} style={{mixBlendMode: 'multiply'}} />)}
        {cq > 0 && <circle cx={cx} cy={cy} r={90 * cq} fill="#fff" stroke={NBK} strokeWidth={7} style={{filter: `drop-shadow(0 0 ${24 + 8 * Math.sin(t * 6)}px ${YY})`}} />}
      </svg>
      {labels.map(([l], i) => { const a = -Math.PI / 2 + (i / 3) * Math.PI * 2; const lx = cx + Math.cos(a) * (d + 150), ly = cy + Math.sin(a) * (d + 150); return <div key={l} style={{position: 'absolute', left: lx - 150, top: ly - 26, width: 300, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff', textShadow: `0 3px 0 ${NBK}, 0 0 10px ${NBK}`, opacity: pop(t, at + 0.3 + i * 0.2)}}>{l}</div>; })}
      {cq > 0 && <div style={{position: 'absolute', left: cx - 90, top: cy - 40, width: 180, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: IN, transform: `scale(${cq})`}}>{coreL}</div>}
    </>
  );
};

/* ═════════════ 4. Trois silos étanches : chaque domaine reçoit sa propre procédure ═════════════ */
const ISilos: React.FC<{cy: number; at: number; docs: [string, string, number][]}> = ({cy, at, docs}) => {
  const t = useT();
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <rect x={60} y={cy + 330} width={960} height={26} fill="#8A96A8" stroke={NBK} strokeWidth={5} />
        {docs.map(([, c, a], i) => { const x = 120 + i * 300; const q = Math.min(1, sp(t, at + i * 0.15, 9, 12)); const dq = prog(t, a, a + 0.7, easeIn); return (
          <g key={i}>
            <g transform={`translate(${x} ${cy + 330}) scale(1 ${q}) translate(${-x} ${-(cy + 330)})`}>
              <rect x={x} y={cy - 250} width={240} height={580} fill="#E7EBF0" stroke={NBK} strokeWidth={7} />
              <ellipse cx={x + 120} cy={cy - 250} rx={120} ry={38} fill="#CFD6E0" stroke={NBK} strokeWidth={7} />
              {[0, 1, 2, 3, 4].map((j) => <line key={j} x1={x} y1={cy - 150 + j * 100} x2={x + 240} y2={cy - 150 + j * 100} stroke="#B9C2CE" strokeWidth={4} />)}
              <rect x={x + 30} y={cy + 160} width={180} height={120} rx={10} fill={c} stroke={NBK} strokeWidth={5} />
            </g>
            {t > a && <g transform={`translate(${x + 120} ${lerp(cy - 520, cy - 140, dq)}) rotate(${(1 - dq) * 20})`} opacity={1 - prog(t, a + 0.7, a + 1.0)}><rect x={-55} y={-70} width={110} height={140} rx={8} fill="#fff" stroke={NBK} strokeWidth={5} />{[0, 1, 2].map((j) => <rect key={j} x={-35} y={-40 + j * 30} width={70} height={10} rx={4} fill={c} />)}</g>}
          </g>
        ); })}
      </svg>
      {docs.map(([l, , a], i) => <div key={l} style={{position: 'absolute', left: 120 + i * 300, top: cy + 190, width: 240, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: l.length > 9 ? 26 : 32, color: '#fff', opacity: pop(t, a + 0.5)}}>{l}</div>)}
    </>
  );
};

/* ═════════════ 5. Trois documents jumeaux : le scanner révèle qu'ils sont identiques ═════════════ */
const IClone: React.FC<{cy: number; at: number; eq: number}> = ({cy, at, eq}) => {
  const t = useT();
  const sc = prog(t, at + 0.3, eq, lin);
  const e = t > eq ? Math.min(1, sp(t, eq, 8, 10)) : 0;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      {QSE3.map(([, c], i) => { const x = 90 + i * 330; return <g key={i}><rect x={x} y={cy - 220} width={240} height={330} rx={12} fill="#fff" stroke={NBK} strokeWidth={6} /><rect x={x} y={cy - 220} width={240} height={50} rx={12} fill={c} stroke={NBK} strokeWidth={6} />{[0, 1, 2, 3, 4].map((j) => <rect key={j} x={x + 26} y={cy - 140 + j * 44} width={[180, 150, 170, 120, 160][j]} height={16} rx={6} fill={sc * 5 > j ? YY : '#D5DAE2'} />)}</g>; })}
      <rect x={70} y={cy - 220 + sc * 330} width={940} height={8} fill="#3CFFB0" opacity={sc < 1 ? 0.9 : 0} style={{filter: 'drop-shadow(0 0 10px #3CFFB0)'}} />
      {[0, 1].map((i) => <text key={i} x={350 + i * 330} y={cy - 40} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={110 * e} fill={IO} stroke={NBK} strokeWidth={4}>=</text>)}
      {e > 0 && [0, 1, 2].map((i) => { const y = cy + 180 + ((t - eq) * 300 + i * 60) % 180; return <path key={`d${i}`} d={`M ${300 + i * 240} ${y} q 26 40 0 56 q -26 -16 0 -56 Z`} fill="#5BC8F0" stroke={NBK} strokeWidth={4} />; })}
    </svg>
  );
};

/* ═════════════ 6. La tour de documents qui s'empilent, vacille… et devient illisible ═════════════ */
const IPile: React.FC<{cx: number; base: number; at: number; blur: number}> = ({cx, base, at, blur}) => {
  const t = useT();
  const bl = prog(t, blur, blur + 0.8, easeOut);
  const n = 14;
  return (
    <div style={{position: 'absolute', inset: 0, filter: bl > 0 ? `blur(${bl * 6}px)` : undefined, opacity: pop(t, at)}}>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        {Array.from({length: n}, (_, i) => { const a = at + 0.2 + i * 0.28; const q = prog(t, a, a + 0.3, easeOut); const sway = Math.sin(t * 3 + i * 0.4) * i * 1.6; const c = [IQ, IS, IE][i % 3]; return <g key={i} opacity={t > a ? 1 : 0} transform={`translate(${cx + sway + (i % 2 ? 14 : -14)} ${lerp(base - 900, base - 60 - i * 52, q)}) rotate(${(i % 3 - 1) * 4 + sway * 0.3})`}><rect x={-170} y={-24} width={340} height={48} rx={6} fill="#fff" stroke={NBK} strokeWidth={5} /><rect x={-170} y={-24} width={26} height={48} fill={c} stroke={NBK} strokeWidth={5} /></g>; })}
      </svg>
      {Array.from({length: 6}, (_, i) => { const a = at + 1.6 + i * 0.5; return <svg key={i} width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, a)}}><path d={`M ${150 + i * 140} ${base - 700 + (i % 2) * 120} C ${400} ${base - 300}, ${700} ${base - 900}, ${930 - i * 120} ${base - 400 - (i % 3) * 90}`} fill="none" stroke={[IQ, IS, IE][i % 3]} strokeWidth={7} strokeDasharray="16 10" markerEnd="" /></svg>; })}
    </div>
  );
};

/* ═════════════ 7. L'usine à gaz : tuyaux en labyrinthe, vannes, bouffées de gaz et horloge qui s'affole ═════════════ */
const IGasworks: React.FC<{cy: number; at: number; clock: number}> = ({cy, at, clock}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const pipes = ['M 100 Y0 H 400 V Y1 H 700 V Y2 H 980', 'M 100 Y1 H 250 V Y3 H 560 V Y0 H 860 V Y3 H 980', 'M 160 Y2 V Y4 H 480 V Y1 H 620 V Y4 H 900 V Y2'];
  const ys = [cy - 260, cy - 120, cy + 20, cy + 160, cy + 300];
  const sub = (p: string) => p.replace(/Y(\d)/g, (_, d) => String(ys[Number(d)]));
  const cl = prog(t, clock, clock + 0.4, easeOut);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      {pipes.map((p, i) => <path key={i} d={sub(p)} fill="none" stroke={NBK} strokeWidth={40} strokeLinejoin="round" pathLength={1} strokeDasharray={`${prog(t, at + i * 0.2, at + 1.0 + i * 0.2, easeOut)} 1`} />)}
      {pipes.map((p, i) => <path key={`c${i}`} d={sub(p)} fill="none" stroke={['#9AA4B2', '#B8C1CC', '#7D8896'][i]} strokeWidth={28} strokeLinejoin="round" pathLength={1} strokeDasharray={`${prog(t, at + i * 0.2, at + 1.0 + i * 0.2, easeOut)} 1`} />)}
      {[[400, 1], [560, 0], [860, 3], [250, 3], [620, 4]].map(([x, yi], i) => <g key={i} transform={`translate(${x} ${ys[yi]}) rotate(${k * 90 * (i % 2 ? 1 : -1)})`} opacity={pop(t, at + 0.8)}><circle r={28} fill={IS} stroke={NBK} strokeWidth={5} /><rect x={-36} y={-6} width={72} height={12} fill={NBK} /></g>)}
      {Array.from({length: 10}, (_, i) => { const u = ((k * 0.5 + i / 10) % 1); const x = [300, 520, 760, 900, 180][i % 5]; return <circle key={`g${i}`} cx={x + Math.sin(k * 2 + i) * 20} cy={ys[i % 5] - 40 - u * 220} r={20 + u * 40} fill="#C9D2DF" opacity={0.7 * (1 - u)} />; })}
      {cl > 0 && <g transform={`translate(860 ${cy - 400}) scale(${cl})`}><circle r={90} fill="#fff" stroke={NBK} strokeWidth={8} /><line x1={0} y1={0} x2={0} y2={-64} stroke={NBK} strokeWidth={8} strokeLinecap="round" transform={`rotate(${(t - clock) * 720})`} /><line x1={0} y1={0} x2={44} y2={0} stroke={IS} strokeWidth={8} strokeLinecap="round" transform={`rotate(${(t - clock) * 120})`} /><circle r={10} fill={NBK} /></g>}
    </svg>
  );
};

/* ═════════════ 8. Trois colonnes qui s'élèvent (avec option fronton) ═════════════ */
const IColumns: React.FC<{cy: number; at: number; rise: number; cols: [string, string, number][]; roof?: string; roofAt?: number}> = ({cy, at, rise, cols, roof, roofAt = 1e9}) => {
  const t = useT();
  const rq = t > roofAt ? Math.min(1, sp(t, roofAt, 8, 10)) : 0;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <rect x={110} y={cy + 300} width={860} height={50} rx={8} fill="#C9B79C" stroke={NBK} strokeWidth={6} />
        {cols.map(([, c], i) => { const x = 180 + i * 290; const h = 480 * prog(t, rise + i * 0.2, rise + i * 0.2 + 0.8, easeOut); return <g key={i}><rect x={x} y={cy + 300 - h} width={140} height={h} fill="#F2E6D4" stroke={NBK} strokeWidth={6} />{[0, 1, 2].map((j) => <line key={j} x1={x + 35 + j * 35} y1={cy + 300 - h + 20} x2={x + 35 + j * 35} y2={cy + 290} stroke="#C9B79C" strokeWidth={5} opacity={h > 40 ? 1 : 0} />)}<rect x={x - 20} y={cy + 300 - h - 34} width={180} height={34} fill={c} stroke={NBK} strokeWidth={6} opacity={h > 40 ? 1 : 0} /></g>; })}
        {roof && rq > 0 && <g transform={`translate(540 ${cy - 220}) scale(${rq}) translate(-540 ${-(cy - 220)})`}><polygon points={`${90},${cy - 180} ${540},${cy - 360} ${990},${cy - 180}`} fill={YY} stroke={NBK} strokeWidth={7} strokeLinejoin="round" /><rect x={90} y={cy - 186} width={900} height={36} fill="#E9C99A" stroke={NBK} strokeWidth={6} /></g>}
      </svg>
      {cols.map(([l, c, a], i) => l && <div key={i} style={{position: 'absolute', left: 140 + i * 290, top: cy + 360, width: 220, display: 'flex', justifyContent: 'center', transform: `scale(${t > a ? Math.min(1, sp(t, a, 9, 12)) : 0})`}}><div style={{...nb(c, 5), borderColor: NBK, padding: '6px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: '#fff'}}>{l}</div></div>)}
      {roof && rq > 0 && <div style={{position: 'absolute', left: 0, top: cy - 280, width: 1080, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: NBK, transform: `scale(${rq})`}}>{roof}</div>}
    </>
  );
};

/* ═════════════ 9. Le convoyeur : produits livrés de manière fiable et constante, le client sourit ═════════════ */
const IConveyor: React.FC<{cy: number; at: number; happy: number}> = ({cy, at, happy}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const h = prog(t, happy, happy + 0.6, easeOut);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <rect x={60} y={cy + 60} width={700} height={40} rx={20} fill="#5B6472" stroke={NBK} strokeWidth={6} />
      {Array.from({length: 8}, (_, i) => <circle key={i} cx={100 + i * 90} cy={cy + 80} r={14} fill="#C9D2DF" stroke={NBK} strokeWidth={4} transform={`rotate(${k * 300} ${100 + i * 90} ${cy + 80})`} />)}
      {Array.from({length: 5}, (_, i) => { const u = (k * 0.35 + i / 5) % 1; const x = 80 + u * 640; return <g key={`b${i}`} transform={`translate(${x} ${cy - 10})`} opacity={u > 0.92 ? (1 - u) / 0.08 : 1}><rect x={-46} y={-60} width={92} height={70} rx={6} fill="#D7A86E" stroke={NBK} strokeWidth={5} /><path d="M -12 -40 l 9 10 l 18 -20" fill="none" stroke={IE} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" /></g>; })}
      <g transform={`translate(880 ${cy - 30})`}>
        <circle cy={-130} r={70} fill="#8D5524" stroke={NBK} strokeWidth={6} />
        <path d="M -110 120 Q -110 -40 0 -40 Q 110 -40 110 120 Z" fill={IQ} stroke={NBK} strokeWidth={6} />
        <circle cx={-24} cy={-140} r={8} fill={NBK} /><circle cx={24} cy={-140} r={8} fill={NBK} />
        <path d={`M -28 ${-104 - 0} Q 0 ${-104 + 26 * h - 6 * (1 - h)} 28 -104`} fill="none" stroke={NBK} strokeWidth={6} strokeLinecap="round" />
        {h > 0.5 && [0, 1, 2].map((i) => <path key={i} d="M 0 -12 l 4 -10 l 10 0 l -8 -7 l 3 -10 l -9 6 l -9 -6 l 3 10 l -8 7 l 10 0 Z" transform={`translate(${-80 + i * 80} ${-240 - Math.sin(t * 5 + i) * 10}) scale(1.6)`} fill={YY} stroke={NBK} strokeWidth={2} />)}
      </g>
    </svg>
  );
};

/* ═════════════ 10. La planète : la fumée locale se dissipe, le thermomètre global se stabilise ═════════════ */
const IGlobe: React.FC<{cx: number; cy: number; at: number; local: number; global: number}> = ({cx, cy, at, local, global}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const l = prog(t, local + 0.5, local + 1.5, easeOut);
  const g = prog(t, global, global + 1.4, easeInOut);
  const R = 260;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <defs><clipPath id="iglobe"><circle cx={cx} cy={cy} r={R} /></clipPath></defs>
      <circle cx={cx} cy={cy} r={R} fill="#4FA3E0" stroke={NBK} strokeWidth={8} />
      <g clipPath="url(#iglobe)">{[0, 1, 2, 3].map((i) => { const x = ((k * 40 + i * 260) % 1040) - 260 + cx - 260; return <path key={i} d={`M ${x} ${cy - 120 + i * 40} q 60 -80 140 -20 q 60 40 20 120 q -60 60 -140 10 q -50 -40 -20 -110 Z`} fill={IE} stroke={NBK} strokeWidth={5} />; })}</g>
      <g opacity={pop(t, local - 0.3)} transform={`translate(${cx - 120} ${cy - R + 40})`}><rect x={-30} y={-40} width={60} height={80} fill="#5B6472" stroke={NBK} strokeWidth={5} /><rect x={-10} y={-90} width={22} height={60} fill="#5B6472" stroke={NBK} strokeWidth={5} />{[0, 1, 2].map((i) => <circle key={i} cx={4 + Math.sin(k * 2 + i) * 10} cy={-110 - i * 40 - ((k * 30) % 40)} r={18 + i * 8} fill={l > 0.5 ? '#E8F4EA' : '#6E6E6E'} opacity={(1 - l) * 0.8 + 0.15} />)}</g>
      <g opacity={pop(t, global - 0.3)} transform={`translate(${cx + R + 60} ${cy})`}><rect x={-22} y={-200} width={44} height={330} rx={22} fill="#fff" stroke={NBK} strokeWidth={6} /><circle cy={160} r={44} fill={IS} stroke={NBK} strokeWidth={6} /><rect x={-10} y={lerp(-170, -60, g)} width={20} height={lerp(330, 220, g)} fill={IS} /></g>
    </svg>
  );
};

/* ═════════════ 11. Le bouclier : les dangers rebondissent sur le travailleur protégé ═════════════ */
const IShield: React.FC<{cx: number; cy: number; at: number; shield: number; hazards: [string, number][]}> = ({cx, cy, at, shield, hazards}) => {
  const t = useT();
  const s = prog(t, shield, shield + 0.7, easeOut);
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <g transform={`translate(${cx} ${cy + 60})`}>
          <circle cy={-150} r={58} fill="#8D5524" stroke={NBK} strokeWidth={6} />
          <path d="M -70 -170 Q 0 -250 70 -170 L 76 -150 L -76 -150 Z" fill={YY} stroke={NBK} strokeWidth={6} />
          <path d="M -100 140 Q -100 -60 0 -60 Q 100 -60 100 140 Z" fill={IO} stroke={NBK} strokeWidth={6} />
          <rect x={-100} y={20} width={200} height={20} fill="#E6F0A0" />
        </g>
        <path d={`M ${cx} ${cy - 300} C ${cx + 260} ${cy - 260}, ${cx + 260} ${cy + 80}, ${cx} ${cy + 260} C ${cx - 260} ${cy + 80}, ${cx - 260} ${cy - 260}, ${cx} ${cy - 300} Z`} fill="rgba(30,158,90,0.16)" stroke={IE} strokeWidth={10} pathLength={1} strokeDasharray={`${s} 1`} style={{filter: s > 0.95 ? `drop-shadow(0 0 16px ${IE})` : undefined}} />
      </svg>
      {hazards.map(([l, a], i) => { if (t < a) return null; const u = Math.min(1, (t - a) / 1.2); const side = i % 2 ? 1 : -1; const hitU = 0.45; const x = u < hitU ? lerp(cx + side * 520, cx + side * 230, u / hitU) : lerp(cx + side * 230, cx + side * 560, (u - hitU) / (1 - hitU)); const y = cy - 200 + i * 170 + (u > hitU ? -(u - hitU) * 300 : 0); return <div key={l} style={{position: 'absolute', left: x - 120, top: y - 30, width: 240, display: 'flex', justifyContent: 'center', opacity: u > 0.85 ? (1 - u) / 0.15 : 1, transform: `rotate(${u > hitU ? side * (u - hitU) * 60 : 0}deg)`}}><div style={{...nb(IS, 5), borderColor: NBK, padding: '6px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8}}><Ico n="TriangleAlert" size={28} c="#fff" />{l}</div></div>; })}
    </>
  );
};

/* ═════════════ 12. Soudure : trois fondations glissent l'une contre l'autre, étincelles, un seul bloc ═════════════ */
const IWeld: React.FC<{cy: number; at: number; slide: number; weld: number; label: string; labelAt: number}> = ({cy, at, slide, weld, label, labelAt}) => {
  const t = useT();
  const s = prog(t, slide, slide + 1.0, easeInOut);
  const w = prog(t, weld, weld + 1.0, lin);
  const lq = t > labelAt ? Math.min(1, sp(t, labelAt, 8, 10)) : 0;
  const xs = [lerp(80, 150, s), lerp(400, 410, s), lerp(720, 670, s)];
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        {QSE3.map(([, c], i) => <g key={i}><rect x={xs[i]} y={cy - 80} width={260} height={220} fill={w >= 1 ? '#8A96A8' : c} stroke={NBK} strokeWidth={7} />{[0, 1, 2].map((j) => <line key={j} x1={xs[i]} y1={cy - 10 + j * 50} x2={xs[i] + 260} y2={cy - 10 + j * 50} stroke="rgba(0,0,0,0.15)" strokeWidth={4} />)}</g>)}
        {s >= 1 && [410, 670].map((x, i) => { const yy = cy - 80 + 220 * Math.min(1, w * 1.05); return <g key={i}><line x1={x} y1={cy - 80} x2={x} y2={yy} stroke={YY} strokeWidth={14} style={{filter: `drop-shadow(0 0 10px ${YO})`}} />{w < 1 && Array.from({length: 10}, (_, j) => { const a = random(`sp${i}${j}${Math.floor(t * 20)}`) * Math.PI * 2; const r0 = 20 + random(`sr${i}${j}${Math.floor(t * 20)}`) * 70; return <line key={j} x1={x} y1={yy} x2={x + Math.cos(a) * r0} y2={yy + Math.sin(a) * r0} stroke={j % 2 ? YY : '#fff'} strokeWidth={4} strokeLinecap="round" />; })}</g>; })}
        {w >= 1 && <rect x={150} y={cy - 80} width={780} height={220} fill="none" stroke={YY} strokeWidth={10} style={{filter: `drop-shadow(0 0 ${14 + 6 * Math.sin(t * 6)}px ${YY})`}} />}
      </svg>
      {lq > 0 && <div style={{position: 'absolute', left: 0, top: cy - 30, width: 1080, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 110, color: '#fff', textShadow: `0 6px 0 ${NBK}`, transform: `scale(${lq})`}}>{label}</div>}
    </>
  );
};

/* ═════════════ 13. Avant / après : le curseur balaie l'écran, le silo laisse place à l'intégré ═════════════ */
const IBeforeAfter: React.FC<{y: number; at: number; wipe: number; left: [string, number][]; right: [string, number][]}> = ({y, at, wipe, left, right}) => {
  const t = useT();
  const W = 960, H = 760;
  const sx = lerp(W, 0, prog(t, wipe, wipe + 1.1, easeInOut));
  const panel = (title: string, c: string, bg: string, items: [string, number][], icon: string, chaos: boolean) => (
    <div style={{position: 'absolute', inset: 0, background: bg, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40, gap: 26}}>
      <div style={{...nb(c, 6), borderColor: NBK, padding: '8px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: '#fff', display: 'flex', alignItems: 'center', gap: 12}}><Ico n={icon} size={44} c="#fff" />{title}</div>
      {chaos && <svg width={600} height={160}>{Array.from({length: 7}, (_, i) => <path key={i} d={`M ${40 + i * 70} ${20 + (i % 3) * 40} C ${200} ${160}, ${400} ${0}, ${560 - i * 60} ${140 - (i % 2) * 60}`} fill="none" stroke={[IQ, IS, IE][i % 3]} strokeWidth={6} />)}</svg>}
      {!chaos && <svg width={600} height={160}><rect x={60} y={20} width={480} height={120} rx={16} fill="#fff" stroke={NBK} strokeWidth={5} />{[0, 1, 2, 3].map((i) => <rect key={i} x={100 + i * 110} y={120 - (40 + i * 18)} width={70} height={40 + i * 18} fill={[IQ, IE, IS, IO][i]} />)}</svg>}
      {items.map(([l, a]) => <div key={l} style={{transform: `scale(${t > a ? Math.min(1, sp(t, a, 9, 12)) : 0})`, ...nb('#fff', 5), borderColor: NBK, boxShadow: `5px 5px 0 ${c}`, padding: '10px 24px', fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK}}>{l}</div>)}
    </div>
  );
  return (
    <Abs x={60} y={y} w={W} h={H} style={{opacity: pop(t, at), border: `8px solid ${NBK}`, borderRadius: 22, overflow: 'hidden', boxShadow: `12px 12px 0 ${NBK}`}}>
      {panel('Intégré', IE, '#EAF8EF', right, 'Layers', false)}
      <div style={{position: 'absolute', left: 0, top: 0, width: sx, height: H, overflow: 'hidden'}}><div style={{position: 'absolute', left: 0, top: 0, width: W, height: H}}>{panel('En silo', IS, '#FDECEA', left, 'Split', true)}</div></div>
      <div style={{position: 'absolute', left: sx - 6, top: 0, width: 12, height: H, background: NBK}} />
      <div style={{position: 'absolute', left: sx - 40, top: H / 2 - 40, width: 80, height: 80, borderRadius: 40, background: YY, border: `6px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: NBK}}>⇆</div>
    </Abs>
  );
};

/* ═════════════ 14. Le coffre-fort : la molette tourne, la porte s'ouvre sur une lumière ═════════════ */
const ISafe: React.FC<{cx: number; cy: number; at: number; open: number}> = ({cx, cy, at, open}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const o = prog(t, open, open + 1.2, easeInOut);
  const dial = t < open ? Math.sin(k * 3) * 120 + k * 60 : 0;
  return (
    <Abs x={cx - 320} y={cy - 320} w={640} h={640} style={{opacity: pop(t, at), perspective: 1600}}>
      <div style={{position: 'absolute', inset: 0, background: '#2B3240', border: `10px solid ${NBK}`, borderRadius: 30}} />
      <div style={{position: 'absolute', inset: 40, background: `radial-gradient(circle, #FFF7CC 0%, ${YY} 35%, #8A6A00 100%)`, borderRadius: 16, boxShadow: `inset 0 0 ${60 * o}px #fff`, opacity: o}} />
      <div style={{position: 'absolute', inset: 30, background: 'linear-gradient(135deg, #8A96A8, #5B6472)', border: `8px solid ${NBK}`, borderRadius: 20, transformOrigin: '0% 50%', transform: `rotateY(${-o * 105}deg)`, backfaceVisibility: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{width: 260, height: 260, borderRadius: 130, background: '#C9D2DF', border: `10px solid ${NBK}`, transform: `rotate(${dial}deg)`, position: 'relative'}}>{Array.from({length: 12}, (_, i) => <div key={i} style={{position: 'absolute', left: 125, top: 6, width: 10, height: 30, background: NBK, transformOrigin: '5px 124px', transform: `rotate(${i * 30}deg)`}} />)}<div style={{position: 'absolute', left: 80, top: 80, width: 100, height: 100, borderRadius: 50, background: '#5B6472', border: `8px solid ${NBK}`}} /></div>
        <div style={{position: 'absolute', right: 40, top: 250, width: 40, height: 100, borderRadius: 14, background: '#C9D2DF', border: `6px solid ${NBK}`}} />
      </div>
    </Abs>
  );
};

/* ═════════════ 15. La double hélice d'un ADN commun, aux trois couleurs ═════════════ */
const IHelix: React.FC<{cx: number; cy: number; at: number}> = ({cx, cy, at}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const n = 16, H = 720;
  const g = prog(t, at, at + 1.0, easeOut);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      {Array.from({length: n}, (_, i) => { const y = cy - H / 2 + (i / (n - 1)) * H; const ph = i * 0.55 + k * 2.4; const x1 = cx + Math.sin(ph) * 220 * g, x2 = cx - Math.sin(ph) * 220 * g; const z = Math.cos(ph); const c = QSE3[i % 3][1]; return <g key={i}><line x1={x1} y1={y} x2={x2} y2={y} stroke={c} strokeWidth={10} opacity={0.6 + 0.4 * Math.abs(z)} /><circle cx={x1} cy={y} r={18 + 6 * z} fill={z > 0 ? IN : '#5B7BB0'} stroke={NBK} strokeWidth={4} /><circle cx={x2} cy={y} r={18 - 6 * z} fill={z < 0 ? IN : '#5B7BB0'} stroke={NBK} strokeWidth={4} /></g>; })}
    </svg>
  );
};

/* ═════════════ 16. Trois calques translucides qui se superposent exactement : le même plan pour les trois normes ═════════════ */
const IOverlay: React.FC<{cy: number; at: number; align: number}> = ({cy, at, align}) => {
  const t = useT();
  const a = prog(t, at + 0.2, align, easeInOut);
  const offs: [number, number, number][] = [[-260, -120, -14], [260, 60, 12], [0, 240, -6]];
  const lock = t > align ? Math.min(1, sp(t, align, 8, 10)) : 0;
  return (
    <>
      {QSE3.map(([l, c], i) => { const [dx, dy, r] = offs[i]; return (
        <div key={l} style={{position: 'absolute', left: 240 + dx * (1 - a), top: cy - 280 + dy * (1 - a), width: 600, height: 560, background: `${c}22`, border: `6px solid ${c}`, borderRadius: 18, transform: `rotate(${r * (1 - a)}deg)`, opacity: pop(t, at + i * 0.15)}}>
          <svg width={588} height={548} style={{position: 'absolute', left: 0, top: 0}}><rect x={60} y={60} width={470} height={430} fill="none" stroke={c} strokeWidth={5} /><line x1={60} y1={260} x2={530} y2={260} stroke={c} strokeWidth={4} /><line x1={300} y1={60} x2={300} y2={490} stroke={c} strokeWidth={4} /><circle cx={300} cy={260} r={70} fill="none" stroke={c} strokeWidth={4} /></svg>
          <div style={{position: 'absolute', left: 14 + i * 150, top: -28, ...nb(c, 4), borderColor: NBK, padding: '2px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff'}}>{l}</div>
        </div>
      ); })}
      {lock > 0 && <div style={{position: 'absolute', left: 540 - 70, top: cy - 70, width: 140, height: 140, borderRadius: 70, background: YY, border: `7px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${lock})`}}><Ico n="Check" size={80} c={NBK} /></div>}
    </>
  );
};

/* ═════════════ 17. Harmonisation : trois colonnes décalées se recalent ligne à ligne ═════════════ */
const IAlign: React.FC<{y: number; at: number; snap: number; rows: [string, number][]}> = ({y, at, snap, rows}) => {
  const t = useT();
  const s = prog(t, snap, snap + 0.9, easeInOut);
  const off = [-90, 70, -40];
  return (
    <Abs x={60} y={y} w={960} h={rows.length * 150 + 120} style={{opacity: pop(t, at)}}>
      {QSE3.map(([l, c], j) => <div key={l} style={{position: 'absolute', left: 300 + j * 220, top: 0, width: 200, textAlign: 'center', ...nb(c, 4), borderColor: NBK, padding: '6px 0', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>{l}</div>)}
      {rows.map(([l, a], i) => <React.Fragment key={l}>
        <div style={{position: 'absolute', left: 0, top: 100 + i * 150, width: 280, height: 110, display: 'flex', alignItems: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK, opacity: pop(t, a)}}>{l}</div>
        {QSE3.map(([, c], j) => <div key={j} style={{position: 'absolute', left: 300 + j * 220, top: 100 + i * 150 + off[(i + j) % 3] * (1 - s), width: 200, height: 110, borderRadius: 14, background: s > 0.95 ? '#fff' : '#F4F6F9', border: `5px solid ${s > 0.95 ? c : '#C9D2DF'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: s > 0.95 ? `5px 5px 0 ${NBK}` : undefined}}>{[0, 1, 2].map((k) => <div key={k} style={{width: 34, height: 12, borderRadius: 6, margin: 4, background: s > 0.95 ? c : '#C9D2DF'}} />)}</div>)}
      </React.Fragment>)}
      {s > 0.95 && rows.map((_, i) => <div key={`l${i}`} style={{position: 'absolute', left: 290, top: 150 + i * 150, width: 680, height: 6, background: YY, opacity: 0.8, transform: `scaleX(${prog(t, snap + 0.9 + i * 0.1, snap + 1.3 + i * 0.1)})`, transformOrigin: '0 50%'}} />)}
    </Abs>
  );
};

/* ═════════════ 18. Le tableau de la structure commune : les coches tombent ligne par ligne ═════════════ */
const ITable: React.FC<{y: number; at: number; cols: number[]; rows: [string, number][]; same: number}> = ({y, at, cols, rows, same}) => {
  const t = useT();
  const sm = prog(t, same, same + 0.6, easeOut);
  return (
    <Abs x={50} y={y} w={980} h={130 + rows.length * 128} style={{opacity: pop(t, at), ...nb('#fff', 10), borderColor: NBK}}>
      {QSE3.map(([l, c], j) => <div key={l} style={{position: 'absolute', left: 430 + j * 180, top: 24, width: 160, textAlign: 'center', ...nb(c, 4), borderColor: NBK, padding: '8px 0', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: '#fff', transform: `scale(${t > cols[j] ? Math.min(1, sp(t, cols[j], 9, 12)) : 0})`}}>{l}</div>)}
      {rows.map(([l, a], i) => { const on = t > a; return <React.Fragment key={l}>
        <div style={{position: 'absolute', left: 0, top: 110 + i * 128, width: 980, height: 118, background: on ? `rgba(245,196,0,${0.18 * sm + (t < a + 1.2 ? 0.25 * (1 - prog(t, a, a + 1.2)) : 0)})` : 'transparent', borderTop: '3px solid #EEF1F5'}} />
        <div style={{position: 'absolute', left: 30, top: 110 + i * 128, width: 390, height: 118, display: 'flex', alignItems: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK, opacity: on ? 1 : 0.25, lineHeight: 1.05}}>{l}</div>
        {QSE3.map(([, c], j) => { const q = t > a + j * 0.1 ? Math.min(1, sp(t, a + j * 0.1, 9, 11)) : 0; return <div key={j} style={{position: 'absolute', left: 470 + j * 180, top: 130 + i * 128, width: 80, height: 80, borderRadius: 40, background: c, border: `5px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${q})`}}><Ico n="Check" size={48} c="#fff" /></div>; })}
      </React.Fragment>; })}
    </Abs>
  );
};

/* ═════════════ 19. La colonne vertébrale commune : les vertèbres s'empilent, la clé de voûte s'illumine ═════════════ */
const ISpine: React.FC<{cx: number; base: number; at: number; key0: number; n?: number}> = ({cx, base, at, key0, n = 7}) => {
  const t = useT();
  const kq = t > key0 ? Math.min(1, sp(t, key0, 8, 9)) : 0;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <line x1={cx} y1={base} x2={cx} y2={base - n * 105} stroke="#E4DCCB" strokeWidth={30} strokeLinecap="round" />
      {Array.from({length: n}, (_, i) => { const a = at + 0.1 + i * 0.25; const q = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0; const y = base - i * 105 - 50; const top = i === n - 1; const c = top ? (kq > 0 ? YY : '#F2E6D4') : '#F2E6D4'; return <g key={i} transform={`translate(${cx} ${y}) scale(${q})`}><path d="M -150 -20 Q -150 -44 -110 -44 L 110 -44 Q 150 -44 150 -20 L 150 20 Q 150 44 110 44 L -110 44 Q -150 44 -150 20 Z" fill={c} stroke={NBK} strokeWidth={6} style={{filter: top && kq > 0 ? `drop-shadow(0 0 ${20 * kq}px ${YY})` : undefined}} /><rect x={-170} y={-10} width={40} height={20} rx={8} fill={QSE3[i % 3][1]} stroke={NBK} strokeWidth={4} /><rect x={130} y={-10} width={40} height={20} rx={8} fill={QSE3[(i + 1) % 3][1]} stroke={NBK} strokeWidth={4} /></g>; })}
    </svg>
  );
};

/* ═════════════ 20. Le prisme des bénéfices : un prisme 3D à quatre faces tourne vers chaque avantage ═════════════ */
const IPrism: React.FC<{cy: number; at: number; faces: [string, string, string, number, [string, number][]][]}> = ({cy, at, faces}) => {
  const t = useT();
  const n = faces.length;
  const cur = faces.reduce((acc, f, i) => (t >= f[3] ? i : acc), -1);
  const prev = cur <= 0 ? 0 : cur - 1;
  const rot = cur < 0 ? 0 : lerp(prev * 90, cur * 90, prog(t, faces[cur][3], faces[cur][3] + 0.8, easeInOut));
  const Wd = 900, Hd = 760, dz = Wd / 2;
  return (
    <Abs x={90} y={cy - Hd / 2} w={Wd} h={Hd} style={{perspective: 3200, opacity: pop(t, at)}}>
      <div style={{position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: `translateZ(${-dz}px) rotateY(${-rot}deg)`}}>
        {faces.map(([title, ic, c, , subs], i) => (
          <div key={title} style={{position: 'absolute', inset: 0, transform: `rotateY(${i * (360 / n)}deg) translateZ(${dz}px)`, backfaceVisibility: 'hidden', background: '#fff', border: `9px solid ${NBK}`, borderRadius: 24, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 50, gap: 24}}>
            <div style={{width: 170, height: 170, borderRadius: 85, background: c, border: `7px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n={ic} size={96} c="#fff" /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: c, textAlign: 'center', lineHeight: 1.05, padding: '0 30px'}}>{title}</div>
            {subs.map(([l, a]) => <div key={l} style={{transform: `scale(${t > a ? Math.min(1, sp(t, a, 9, 12)) : 0})`, ...nb('#fff', 4), borderColor: NBK, boxShadow: `4px 4px 0 ${c}`, padding: '8px 20px', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK}}>{l}</div>)}
          </div>
        ))}
      </div>
    </Abs>
  );
};

/* ═════════════ 21. Le tremplin : la bille QSE rebondit et atterrit sur la plateforme RSE ═════════════ */
const ITrampoline: React.FC<{cy: number; at: number; jump: number; land: number; target: string}> = ({cy, at, jump, land, target}) => {
  const t = useT();
  const press = t < jump ? prog(t, at + 0.4, jump, easeIn) : Math.max(0, 1 - (t - jump) * 6);
  const fl = prog(t, jump, land, lin);
  const bx = t < jump ? 260 : lerp(260, 800, fl);
  const by = t < jump ? cy + 160 + press * 40 : lerp(cy + 160, cy - 300, fl) - Math.sin(fl * Math.PI) * 300;
  const lq = t > land ? Math.min(1, sp(t, land, 8, 9)) : 0;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <line x1={150} y1={cy + 330} x2={180} y2={cy + 210} stroke={NBK} strokeWidth={10} /><line x1={370} y1={cy + 330} x2={340} y2={cy + 210} stroke={NBK} strokeWidth={10} />
        <path d={`M 150 ${cy + 210} Q 260 ${cy + 210 + press * 90} 370 ${cy + 210}`} fill="none" stroke={IO} strokeWidth={14} strokeLinecap="round" />
        <rect x={790} y={cy - 140} width={40} height={470} fill="#8A96A8" stroke={NBK} strokeWidth={6} /><rect x={650} y={cy - 240} width={320} height={100} rx={14} fill={IE} stroke={NBK} strokeWidth={6} />
        {t > jump && fl < 1 && Array.from({length: 8}, (_, i) => { const u = Math.max(0, fl - i * 0.04); const x = lerp(260, 800, u), y = lerp(cy + 160, cy - 300, u) - Math.sin(u * Math.PI) * 300; return <circle key={i} cx={x} cy={y} r={30 - i * 3} fill={YY} opacity={0.5 - i * 0.06} />; })}
        <circle cx={bx} cy={t > land ? cy - 300 : by} r={44} fill={IQ} stroke={NBK} strokeWidth={6} />
        <text x={bx} y={(t > land ? cy - 300 : by) + 14} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={30} fill="#fff">QSE</text>
        {lq > 0 && Array.from({length: 12}, (_, i) => { const a = (i / 12) * Math.PI * 2; const r0 = 60 + 140 * prog(t, land, land + 0.5, easeOut); return <line key={i} x1={800 + Math.cos(a) * r0 * 0.6} y1={cy - 300 + Math.sin(a) * r0 * 0.6} x2={800 + Math.cos(a) * r0} y2={cy - 300 + Math.sin(a) * r0} stroke={YY} strokeWidth={8} strokeLinecap="round" opacity={1 - prog(t, land + 0.3, land + 0.8)} />; })}
      </svg>
      <div style={{position: 'absolute', left: 650, top: cy - 236, width: 320, height: 92, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: '#fff', transform: `scale(${0.8 + 0.2 * lq})`, opacity: pop(t, at + 0.3)}}>{target}</div>
    </>
  );
};

/* ═════════════ 22. Le porte-voix : le message part en ondes vers clients, partenaires et équipes ═════════════ */
const IBroadcast: React.FC<{cy: number; at: number; targets: [string, string, number][]}> = ({cy, at, targets}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const pos: [number, number][] = [[820, cy - 300], [880, cy], [820, cy + 300]];
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <g transform={`translate(200 ${cy}) rotate(${Math.sin(k * 8) * 2})`}><polygon points="0,-60 170,-150 170,150 0,60" fill={IO} stroke={NBK} strokeWidth={7} strokeLinejoin="round" /><rect x={-70} y={-60} width={80} height={120} rx={12} fill={IN} stroke={NBK} strokeWidth={7} /><rect x={-40} y={60} width={30} height={90} rx={8} fill={IN} stroke={NBK} strokeWidth={6} /></g>
        {Array.from({length: 5}, (_, i) => { const u = ((k * 0.9 + i / 5) % 1); return <path key={i} d={`M ${400 + u * 300} ${cy - 120 - u * 160} Q ${470 + u * 360} ${cy} ${400 + u * 300} ${cy + 120 + u * 160}`} fill="none" stroke={IO} strokeWidth={10 - u * 6} strokeLinecap="round" opacity={1 - u} />; })}
      </svg>
      {targets.map(([l, ic, a], i) => { const q = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0; return <div key={l} style={{position: 'absolute', left: pos[i][0] - 120, top: pos[i][1] - 80, width: 240, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, transform: `scale(${q})`}}><div style={{width: 110, height: 110, borderRadius: 55, background: [IQ, IE, IS][i], border: `6px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 ${20 + 10 * Math.sin(t * 6 + i)}px ${YY}`}}><Ico n={ic} size={60} c="#fff" /></div><div style={{...nb('#fff', 4), borderColor: NBK, padding: '4px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>{l}</div></div>; })}
    </>
  );
};

/* ═════════════ 23. Le podium : la première marche s'élève, trophée et rayons ═════════════ */
const IPodium: React.FC<{cy: number; at: number; rise: number}> = ({cy, at, rise}) => {
  const t = useT();
  const r = prog(t, rise, rise + 0.9, easeOut);
  const tq = t > rise + 0.6 ? Math.min(1, sp(t, rise + 0.6, 8, 9)) : 0;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      {tq > 0 && Array.from({length: 14}, (_, i) => { const a = (i / 14) * Math.PI * 2 + t * 0.6; return <polygon key={i} points={`540,${cy - 260} ${540 + Math.cos(a - 0.08) * 600},${cy - 260 + Math.sin(a - 0.08) * 600} ${540 + Math.cos(a + 0.08) * 600},${cy - 260 + Math.sin(a + 0.08) * 600}`} fill={YY} opacity={0.18 * tq} />; })}
      <rect x={140} y={cy + 140} width={260} height={200} fill="#C9D2DF" stroke={NBK} strokeWidth={7} /><text x={270} y={cy + 270} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={70} fill={NBK} opacity={0.35}>·</text>
      <rect x={680} y={cy + 200} width={260} height={140} fill="#D7A86E" stroke={NBK} strokeWidth={7} />
      <rect x={410} y={cy + 340 - 340 * r} width={260} height={340 * r} fill={YY} stroke={NBK} strokeWidth={7} />
      {tq > 0 && <g transform={`translate(540 ${cy - 120 + (1 - r) * 340}) scale(${tq})`}><path d="M -70 -120 H 70 V -60 Q 70 10 0 30 Q -70 10 -70 -60 Z" fill={YY} stroke={NBK} strokeWidth={7} /><path d="M -70 -100 Q -130 -100 -110 -50 Q -95 -20 -60 -30" fill="none" stroke={NBK} strokeWidth={7} /><path d="M 70 -100 Q 130 -100 110 -50 Q 95 -20 60 -30" fill="none" stroke={NBK} strokeWidth={7} /><rect x={-14} y={30} width={28} height={50} fill={YY} stroke={NBK} strokeWidth={6} /><rect x={-60} y={80} width={120} height={36} rx={8} fill={IN} stroke={NBK} strokeWidth={6} /></g>}
    </svg>
  );
};

/* ═════════════ 24. La question ouverte : le point du « ? » devient une porte qui s'ouvre sur la lumière ═════════════ */
const IOpenQ: React.FC<{cy: number; at: number; open: number}> = ({cy, at, open}) => {
  const t = useT();
  const o = prog(t, open, open + 0.7, easeInOut);
  const q = Math.min(1, sp(t, at, 8, 10));
  return (
    <>
      <div style={{position: 'absolute', left: 0, top: cy - 420, width: 1080, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 560, lineHeight: 1, color: IQ, WebkitTextStroke: `10px ${NBK}`, transform: `scale(${q})`, clipPath: 'inset(0 0 26% 0)'}}>?</div>
      <div style={{position: 'absolute', left: 540 - 90, top: cy + 30, width: 180, height: 260, background: `radial-gradient(circle, #FFFDE8, ${YY})`, border: `7px solid ${NBK}`, borderRadius: 10, boxShadow: `0 0 ${80 * o}px ${YY}`, transform: `scale(${q})`, perspective: 600}}>
        <div style={{position: 'absolute', inset: 0, background: IN, borderRadius: 4, transformOrigin: '0% 50%', transform: `rotateY(${-o * 100}deg)`}}><div style={{position: 'absolute', right: 20, top: 124, width: 20, height: 20, borderRadius: 10, background: YY}} /></div>
      </div>
    </>
  );
};

/* ═════════════ Palette TMS ═════════════ */
const QR = '#E2483B', QN = '#14284B', QB = '#1F5FBF', QG = '#1E9E5A', QO = '#F08A24', QY = '#F5C400';

/* ═════════════ Géométrie d'une silhouette humaine (articulations nommées) ═════════════ */
type QJ = 'tete' | 'nuque' | 'epauleG' | 'epauleD' | 'coudeG' | 'coudeD' | 'poignetG' | 'poignetD' | 'dos' | 'hancheG' | 'hancheD' | 'genouG' | 'genouD' | 'piedG' | 'piedD';
const qBody = (cx: number, cy: number, s: number): Record<QJ, [number, number]> => {
  const p = (x: number, y: number): [number, number] => [cx + x * s, cy + y * s];
  return {tete: p(0, -330), nuque: p(0, -250), epauleG: p(-120, -215), epauleD: p(120, -215), coudeG: p(-165, -60), coudeD: p(165, -60), poignetG: p(-185, 80), poignetD: p(185, 80), dos: p(0, 30), hancheG: p(-70, 100), hancheD: p(70, 100), genouG: p(-80, 290), genouD: p(80, 290), piedG: p(-90, 470), piedD: p(90, 470)};
};
const QSilhouette: React.FC<{cx: number; cy: number; s: number; fill: string; stroke?: string; sw?: number}> = ({cx, cy, s, fill, stroke = NBK, sw = 6}) => {
  const J = qBody(cx, cy, s);
  const limb = (a: QJ, b: QJ, c: QJ, w: number) => <polyline points={[J[a], J[b], J[c]].map((q) => q.join(',')).join(' ')} fill="none" stroke={fill} strokeWidth={w * s} strokeLinecap="round" strokeLinejoin="round" />;
  const limbO = (a: QJ, b: QJ, c: QJ, w: number) => <polyline points={[J[a], J[b], J[c]].map((q) => q.join(',')).join(' ')} fill="none" stroke={stroke} strokeWidth={w * s + sw * 2} strokeLinecap="round" strokeLinejoin="round" />;
  const torso = `M ${J.epauleG[0]} ${J.epauleG[1] - 20 * s} Q ${cx} ${J.epauleG[1] - 45 * s} ${J.epauleD[0]} ${J.epauleD[1] - 20 * s} L ${J.hancheD[0] + 20 * s} ${J.hancheD[1] + 20 * s} L ${J.hancheG[0] - 20 * s} ${J.hancheG[1] + 20 * s} Z`;
  return (
    <g>
      {limbO('epauleG', 'coudeG', 'poignetG', 64)}{limbO('epauleD', 'coudeD', 'poignetD', 64)}{limbO('hancheG', 'genouG', 'piedG', 84)}{limbO('hancheD', 'genouD', 'piedD', 84)}
      <path d={torso} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
      <rect x={J.nuque[0] - 30 * s} y={J.nuque[1] - 30 * s} width={60 * s} height={60 * s} fill={fill} />
      <circle cx={J.tete[0]} cy={J.tete[1]} r={64 * s} fill={fill} stroke={stroke} strokeWidth={sw} />
      {limb('epauleG', 'coudeG', 'poignetG', 64)}{limb('epauleD', 'coudeD', 'poignetD', 64)}{limb('hancheG', 'genouG', 'piedG', 84)}{limb('hancheD', 'genouD', 'piedD', 84)}
    </g>
  );
};

/* ═════════════ 1. Radiographie : la barre de scan révèle le squelette, les zones douloureuses s'allument ═════════════ */
const QXray: React.FC<{cx: number; cy: number; s?: number; at: number; scan: number; spots: [string, QJ, number, ('L' | 'R')?][]; side?: 'both' | 'none'}> = ({cx, cy, s = 0.85, at, scan, spots, side = 'both'}) => {
  const t = useT();
  const J = qBody(cx, cy, s);
  const sc = prog(t, scan, scan + 1.6, easeInOut);
  const top = cy - 420 * s, bot = cy + 520 * s;
  const sy = lerp(top, bot, sc);
  const bone = '#CFEFFF';
  const id = `qx${Math.round(cx)}${Math.round(cy)}`;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <defs><clipPath id={id}><rect x={0} y={0} width={1080} height={sc >= 1 ? 1920 : sy} /></clipPath></defs>
        <QSilhouette cx={cx} cy={cy} s={s} fill="#C9D2DF" />
        <g clipPath={`url(#${id})`}>
          <QSilhouette cx={cx} cy={cy} s={s} fill="#0F2A44" stroke="#5BC8F0" sw={4} />
          <circle cx={J.tete[0]} cy={J.tete[1] + 4 * s} r={44 * s} fill="none" stroke={bone} strokeWidth={7 * s} />
          {Array.from({length: 12}, (_, i) => { const y = J.nuque[1] + i * ((J.dos[1] + 60 * s - J.nuque[1]) / 11); return <rect key={i} x={cx - 13 * s} y={y - 8 * s} width={26 * s} height={14 * s} rx={4 * s} fill={bone} />; })}
          {Array.from({length: 5}, (_, i) => <path key={`r${i}`} d={`M ${cx} ${J.epauleG[1] + (25 + i * 30) * s} q ${-95 * s} ${-6 * s} ${-100 * s} ${30 * s} M ${cx} ${J.epauleG[1] + (25 + i * 30) * s} q ${95 * s} ${-6 * s} ${100 * s} ${30 * s}`} fill="none" stroke={bone} strokeWidth={5 * s} opacity={0.8} />)}
          {(['G', 'D'] as const).map((sd) => <g key={sd} stroke={bone} strokeWidth={9 * s} strokeLinecap="round" fill="none"><polyline points={[J[`epaule${sd}` as QJ], J[`coude${sd}` as QJ], J[`poignet${sd}` as QJ]].map((q) => q.join(',')).join(' ')} /><polyline points={[J[`hanche${sd}` as QJ], J[`genou${sd}` as QJ], J[`pied${sd}` as QJ]].map((q) => q.join(',')).join(' ')} /></g>)}
          <path d={`M ${J.hancheG[0] - 10 * s} ${J.hancheG[1]} Q ${cx} ${J.hancheG[1] + 60 * s} ${J.hancheD[0] + 10 * s} ${J.hancheD[1]}`} fill="none" stroke={bone} strokeWidth={9 * s} />
        </g>
        {sc > 0 && sc < 1 && <rect x={cx - 330} y={sy - 4} width={660} height={8} fill="#3CFFB0" style={{filter: 'drop-shadow(0 0 12px #3CFFB0)'}} />}
        {spots.map(([, j, a], i) => { if (t < a) return null; const [x, y] = J[j]; const k = t - a; const r0 = 30 + 10 * Math.sin(k * 6); return <g key={i}><circle cx={x} cy={y} r={r0 + 26} fill={QR} opacity={0.18} /><circle cx={x} cy={y} r={r0} fill={QR} opacity={0.55} style={{filter: `drop-shadow(0 0 16px ${QR})`}} /><circle cx={x} cy={y} r={12} fill="#fff" />{k < 0.8 && <circle cx={x} cy={y} r={30 + k * 120} fill="none" stroke={QR} strokeWidth={6} opacity={1 - k / 0.8} />}</g>; })}
      </svg>
      {side === 'both' && spots.map(([l, j, a, sd], i) => { if (t < a) return null; const [x, y] = J[j]; const right = sd ? sd === 'R' : x >= cx; const lx = right ? 1050 : 30; const q = Math.min(1, sp(t, a, 9, 12)); return <React.Fragment key={`l${i}`}><svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}><line x1={x} y1={y} x2={right ? 820 : 260} y2={y} stroke={QR} strokeWidth={4} strokeDasharray="8 6" opacity={q} /></svg><div style={{position: 'absolute', left: right ? 820 : lx, top: y - 30, width: 230, display: 'flex', justifyContent: right ? 'flex-start' : 'flex-end', transform: `scale(${q})`, transformOrigin: right ? '0 50%' : '100% 50%'}}><div style={{...nb('#fff', 5), borderColor: NBK, boxShadow: `5px 5px 0 ${QR}`, padding: '6px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK, whiteSpace: 'nowrap'}}>{l}</div></div></React.Fragment>; })}
    </>
  );
};

/* ═════════════ 2. La foule silencieuse : des milliers de points, certains s'allument en rouge sans un bruit ═════════════ */
const QCrowd: React.FC<{cy: number; at: number; light: number}> = ({cy, at, light}) => {
  const t = useT();
  const cols = 34, rows = 26;
  const l = prog(t, light, light + 2.4, easeOut);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      {Array.from({length: cols * rows}, (_, i) => { const c = i % cols, r = Math.floor(i / cols); const x = 70 + c * 28.5 + (r % 2) * 14, y = cy - 360 + r * 28; const red = random(`qc${i}`) < 0.32 * l; const tw = red ? 0.6 + 0.4 * Math.sin(t * 5 + i) : 1; const q = prog(t, at + (c + r) * 0.012, at + (c + r) * 0.012 + 0.3); return <circle key={i} cx={x} cy={y} r={red ? 9 : 7} fill={red ? QR : '#9AA4B2'} opacity={q * tw} />; })}
      <g transform={`translate(540 ${cy + 420})`} opacity={pop(t, light)}><rect x={-60} y={-40} width={50} height={80} rx={10} fill={QN} /><polygon points="-10,-40 40,-80 40,80 -10,40" fill={QN} /><line x1={60} y1={-50} x2={130} y2={50} stroke={QR} strokeWidth={14} strokeLinecap="round" /><line x1={130} y1={-50} x2={60} y2={50} stroke={QR} strokeWidth={14} strokeLinecap="round" /></g>
    </svg>
  );
};

/* ═════════════ 3. Le poste de bureau : les heures défilent, le poignet rougit ═════════════ */
const QDesk: React.FC<{cy: number; at: number; pain: number; back?: number}> = ({cy, at, pain, back = 1e9}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const p = prog(t, pain, pain + 3, easeIn);
  const b = prog(t, back, back + 1.2, easeOut);
  const type = Math.sin(k * 22) * 6;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <rect x={120} y={cy + 120} width={840} height={30} rx={8} fill="#B9845A" stroke={NBK} strokeWidth={6} />
      <rect x={520} y={cy - 220} width={380} height={250} rx={16} fill="#2B3240" stroke={NBK} strokeWidth={7} /><rect x={540} y={cy - 200} width={340} height={200} rx={8} fill="#9FD3FF" />{[0, 1, 2, 3].map((i) => <rect key={i} x={565} y={cy - 180 + i * 42} width={[260, 200, 280, 160][i]} height={18} rx={6} fill="#fff" opacity={0.85} />)}<rect x={690} y={cy + 30} width={40} height={90} fill="#2B3240" stroke={NBK} strokeWidth={5} />
      <rect x={480} y={cy + 92} width={300} height={28} rx={6} fill="#C9D2DF" stroke={NBK} strokeWidth={5} />
      <g transform={`translate(330 ${cy - 40})`}>
        <circle cy={-170} r={58} fill="#8D5524" stroke={NBK} strokeWidth={6} />
        <path d={`M -90 160 Q -100 -60 0 -90 Q 90 -60 ${90 + b * 0} 160 Z`} fill={QB} stroke={NBK} strokeWidth={6} transform={`rotate(${(1 - b) * 0 + b * 0})`} />
        <path d={`M 60 -40 L 190 ${110 + type} L 300 ${132 + type}`} fill="none" stroke={NBK} strokeWidth={46} strokeLinecap="round" strokeLinejoin="round" /><path d={`M 60 -40 L 190 ${110 + type} L 300 ${132 + type}`} fill="none" stroke={QB} strokeWidth={34} strokeLinecap="round" strokeLinejoin="round" />
        {p > 0 && <circle cx={290} cy={130 + type} r={26 + 18 * p} fill={QR} opacity={0.35 + 0.4 * p} style={{filter: `drop-shadow(0 0 ${12 + 20 * p}px ${QR})`}} />}
        {b > 0 && <circle cx={-10} cy={90} r={30 + 30 * b} fill={QR} opacity={0.4 + 0.3 * b} style={{filter: `drop-shadow(0 0 20px ${QR})`}} />}
      </g>
      <g transform={`translate(880 ${cy - 400})`}><circle r={80} fill="#fff" stroke={NBK} strokeWidth={7} /><line x1={0} y1={0} x2={0} y2={-58} stroke={NBK} strokeWidth={7} strokeLinecap="round" transform={`rotate(${k * 360})`} /><line x1={0} y1={0} x2={38} y2={0} stroke={QR} strokeWidth={7} strokeLinecap="round" transform={`rotate(${k * 30})`} /><circle r={8} fill={NBK} /></g>
    </svg>
  );
};

/* ═════════════ 4. Le signe avant-coureur : le panneau clignote, des ondes d'alerte s'échappent ═════════════ */
const QSign: React.FC<{cx: number; cy: number; at: number; flash: number}> = ({cx, cy, at, flash}) => {
  const t = useT();
  const on = t > flash && Math.floor((t - flash) * 3) % 2 === 0;
  const k = Math.max(0, t - flash);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <rect x={cx - 14} y={cy + 40} width={28} height={420} fill="#8A96A8" stroke={NBK} strokeWidth={6} />
      {t > flash && [0, 1, 2].map((i) => { const u = (k * 0.8 + i / 3) % 1; return <circle key={i} cx={cx} cy={cy - 60} r={200 + u * 260} fill="none" stroke={QY} strokeWidth={10 - u * 8} opacity={1 - u} />; })}
      <polygon points={`${cx},${cy - 300} ${cx + 230},${cy + 90} ${cx - 230},${cy + 90}`} fill={on ? QY : '#FFE27A'} stroke={NBK} strokeWidth={12} strokeLinejoin="round" style={{filter: on ? `drop-shadow(0 0 40px ${QY})` : undefined}} />
      <polygon points={`${cx},${cy - 230} ${cx + 175},${cy + 55} ${cx - 175},${cy + 55}`} fill="none" stroke={QR} strokeWidth={14} strokeLinejoin="round" />
      <rect x={cx - 14} y={cy - 150} width={28} height={130} rx={10} fill={NBK} /><circle cx={cx} cy={cy + 10} r={16} fill={NBK} />
    </svg>
  );
};

/* ═════════════ 5. Les quatre tissus : muscle qui se contracte, tendon qui se tend, influx nerveux, articulation qui pivote ═════════════ */
const QTissues: React.FC<{y: number; at: number; items: [string, number][]}> = ({y, at, items}) => {
  const t = useT();
  const art = (i: number, a: number) => {
    const k = Math.max(0, t - a);
    if (i === 0) { const f = 1 + 0.18 * Math.sin(k * 5); return <g><ellipse cx={150} cy={110} rx={95 * (2 - f) / 1.0 * 0.6} ry={46 * f} fill={QR} stroke={NBK} strokeWidth={5} />{[0, 1, 2, 3].map((j) => <line key={j} x1={70 + j * 10} y1={100 + j * 6} x2={230 - j * 10} y2={100 + j * 6} stroke="#fff" strokeWidth={3} opacity={0.6} />)}</g>; }
    if (i === 1) { const s0 = 1 + 0.15 * Math.sin(k * 4); return <g><rect x={150 - 110 * s0} y={98} width={220 * s0} height={24} rx={12} fill="#F4EBDD" stroke={NBK} strokeWidth={5} /><circle cx={150 - 110 * s0} cy={110} r={22} fill={QR} stroke={NBK} strokeWidth={5} /><circle cx={150 + 110 * s0} cy={110} r={22} fill="#E9E1D2" stroke={NBK} strokeWidth={5} /></g>; }
    if (i === 2) { const u = (k * 0.9) % 1; return <g><path d="M 30 110 C 80 60, 120 160, 170 110 S 250 60, 270 110" fill="none" stroke={QY} strokeWidth={10} strokeLinecap="round" /><circle cx={30 + u * 240} cy={110 + Math.sin(u * Math.PI * 3) * -24} r={14} fill="#fff" stroke={QO} strokeWidth={5} style={{filter: `drop-shadow(0 0 10px ${QY})`}} /></g>; }
    const r = Math.sin(k * 2.5) * 35; return <g><rect x={60} y={98} width={90} height={26} rx={12} fill="#E9E1D2" stroke={NBK} strokeWidth={5} /><g transform={`rotate(${r} 150 110)`}><rect x={150} y={98} width={100} height={26} rx={12} fill="#E9E1D2" stroke={NBK} strokeWidth={5} /></g><circle cx={150} cy={110} r={26} fill={QB} stroke={NBK} strokeWidth={5} /></g>;
  };
  return (
    <Abs x={70} y={y} w={940} h={700} style={{display: 'flex', flexWrap: 'wrap', gap: 30, justifyContent: 'center', opacity: pop(t, at)}}>
      {items.map(([l, a], i) => { const q = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0; return <div key={l} style={{width: 440, height: 320, ...nb('#fff', 8), borderColor: NBK, transform: `scale(${q})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6}}><svg width={300} height={220}>{art(i, a)}</svg><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: [QR, QO, '#B98A00', QB][i]}}>{l}</div></div>; })}
    </Abs>
  );
};

/* ═════════════ 6. L'engrenage qui s'use : à chaque tour, les dents rétrécissent… jusqu'à la cassure ═════════════ */
const QGear: React.FC<{cx: number; cy: number; at: number; wear: number; brk: number}> = ({cx, cy, at, wear, brk}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const w = prog(t, at + 0.5, wear, easeIn);
  const b = t > brk;
  const n = 14, R = 230;
  const pts: string[] = [];
  for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * Math.PI * 2; const tooth = i % 2 === 0; const broken = b && i === 6; const rr = tooth && !broken ? R + 60 * (1 - w * 0.7) : R; const a2 = a + Math.PI / (n * 2); pts.push(`${Math.cos(a) * rr},${Math.sin(a) * rr}`, `${Math.cos(a2) * rr},${Math.sin(a2) * rr}`); }
  const shake = b ? Math.sin(k * 50) * 4 * Math.exp(-(t - brk) * 3) : 0;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <g transform={`translate(${cx + shake} ${cy}) rotate(${k * 70})`}><path d={`M ${pts.join(' L ')} Z`} fill={w > 0.6 ? '#9AA4B2' : QB} stroke={NBK} strokeWidth={9} strokeLinejoin="round" /><circle r={90} fill="#fff" stroke={NBK} strokeWidth={9} /><circle r={30} fill={NBK} /></g>
      {Array.from({length: 16}, (_, i) => { const u = ((k * 0.8 + i / 16) % 1); const a = (i / 16) * Math.PI * 2; return <circle key={i} cx={cx + Math.cos(a) * (R + 70 + u * 120)} cy={cy + Math.sin(a) * (R + 70 + u * 120) + u * 80} r={5} fill="#B9A98F" opacity={w * (1 - u)} />; })}
      {b && <g transform={`translate(${cx + 280 + (t - brk) * 200} ${cy - 200 + (t - brk) ** 2 * 600}) rotate(${(t - brk) * 400})`}><rect x={-30} y={-30} width={60} height={60} fill="#9AA4B2" stroke={NBK} strokeWidth={6} /></g>}
      {b && t - brk < 0.6 && Array.from({length: 10}, (_, i) => { const a = (i / 10) * Math.PI * 2; return <line key={`s${i}`} x1={cx + 250} y1={cy - 120} x2={cx + 250 + Math.cos(a) * 80 * (t - brk) / 0.6 * 1.5} y2={cy - 120 + Math.sin(a) * 80 * (t - brk) / 0.6 * 1.5} stroke={QY} strokeWidth={6} strokeLinecap="round" />; })}
    </svg>
  );
};

/* ═════════════ 7. L'équation qui s'assemble (terme à terme, flèche de cause) ═════════════ */
const QEquation: React.FC<{y: number; terms: [string, string, number][]; cause?: [string, number]}> = ({y, terms, cause}) => {
  const t = useT();
  return (
    <>
      <Abs x={30} y={y} w={1020} h={180} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14}}>
        {terms.map(([l, c, a], i) => { const q = t > a ? Math.min(1, sp(t, a, 9, 11)) : 0; const op = l === '=' || l === '+' || l === '/'; return <div key={i} style={{transform: `translateY(${(1 - q) * -80}px) scale(${q})`, opacity: q > 0 ? 1 : 0, ...(op ? {fontFamily: sansFont, fontWeight: 900, fontSize: 96, color: NBK} : {...nb(c, 7), borderColor: NBK, padding: '16px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: '#fff'})}}>{l}</div>; })}
      </Abs>
      {cause && t > cause[1] && <>
        <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}><path d={`M 540 ${y + 470} L 540 ${y + 200}`} stroke={NBK} strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray={`${prog(t, cause[1], cause[1] + 0.5)} 1`} /><polygon points={`510,${y + 230} 540,${y + 190} 570,${y + 230}`} fill={NBK} opacity={prog(t, cause[1] + 0.4, cause[1] + 0.5)} /></svg>
        <Abs x={0} y={y + 480} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{transform: `scale(${Math.min(1, sp(t, cause[1] + 0.3, 9, 12))})`, ...nb(QN, 7), borderColor: NBK, padding: '14px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: '#fff', display: 'flex', alignItems: 'center', gap: 14}}><Ico n="Factory" size={48} c="#fff" />{cause[0]}</div></Abs>
      </>}
    </>
  );
};

/* ═════════════ 8. Le tapissage : les coupables alignés devant la toise, la lampe s'arrête sur chacun ═════════════ */
const QLineup: React.FC<{y: number; at: number; items: [string, string, number][]}> = ({y, at, items}) => {
  const t = useT();
  const n = items.length;
  const cur = items.reduce((acc, it, i) => (t >= it[2] ? i : acc), -1);
  const W = 960 / n;
  const spot = cur < 0 ? -1 : lerp(cur === 0 ? -1 : cur - 1, cur, prog(t, items[cur][2], items[cur][2] + 0.4, easeInOut));
  return (
    <Abs x={60} y={y} w={960} h={820} style={{opacity: pop(t, at), background: '#2B3240', border: `8px solid ${NBK}`, borderRadius: 20, overflow: 'hidden'}}>
      {Array.from({length: 9}, (_, i) => <div key={i} style={{position: 'absolute', left: 0, top: 80 + i * 70, width: 960, height: 3, background: 'rgba(255,255,255,0.18)'}} />)}
      {spot >= 0 && <div style={{position: 'absolute', left: spot * W + W / 2 - 160, top: -40, width: 320, height: 860, background: 'radial-gradient(ellipse 50% 60% at 50% 55%, rgba(255,240,180,0.55), rgba(255,240,180,0) 70%)'}} />}
      {items.map(([l, ic, a], i) => { const lit = i === cur; const shown = t > a - 0.1 || t > items[0][2]; return (
        <div key={l} style={{position: 'absolute', left: i * W, top: 120, width: W, height: 680, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: shown ? (lit ? 1 : 0.55) : 0.3}}>
          <svg width={W} height={420}><g transform={`translate(${W / 2} 0)`}><circle cy={90} r={58} fill={lit ? '#5B6472' : '#3A4250'} stroke={NBK} strokeWidth={5} /><path d="M -90 420 Q -95 170 0 160 Q 95 170 90 420 Z" fill={lit ? '#5B6472' : '#3A4250'} stroke={NBK} strokeWidth={5} /></g></svg>
          <div style={{marginTop: -230, width: 110, height: 110, borderRadius: 55, background: lit ? QR : '#4A5363', border: `5px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: lit ? `0 0 30px ${QR}` : undefined}}><Ico n={ic} size={60} c="#fff" /></div>
          <div style={{marginTop: 50, width: W - 16, minHeight: 120, background: '#111', border: `4px solid ${lit ? QY : '#5B6472'}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: lit ? QY : '#B9C2CE', lineHeight: 1.15, padding: 6, boxSizing: 'border-box'}}>{l}</div>
        </div>
      ); })}
    </Abs>
  );
};

/* ═════════════ 9. Prendre du recul : la caméra recule, une silhouette devient une foule entière ═════════════ */
const QPullback: React.FC<{cy: number; at: number; pull: number}> = ({cy, at, pull}) => {
  const t = useT();
  const z = lerp(4.2, 1, prog(t, pull, pull + 2.0, easeInOut));
  const cols = 9, rows = 7;
  return (
    <Abs x={0} y={cy - 420} w={1080} h={840} style={{overflow: 'hidden', opacity: pop(t, at)}}>
      <svg width={1080} height={840} style={{position: 'absolute', left: 0, top: 0, transform: `scale(${z})`, transformOrigin: `${540}px ${420}px`}}>
        {Array.from({length: cols * rows}, (_, i) => { const c = i % cols, r = Math.floor(i / cols); const x = 60 + c * 120, y = 50 + r * 120; const center = c === 4 && r === 3; const red = center || random(`pb${i}`) < 0.3; return <g key={i} transform={`translate(${x} ${y})`}><circle cy={-18} r={16} fill={red ? QR : '#9AA4B2'} stroke={NBK} strokeWidth={3} /><path d="M -26 40 Q -26 2 0 2 Q 26 2 26 40 Z" fill={red ? QR : '#9AA4B2'} stroke={NBK} strokeWidth={3} />{red && <circle cx={14} cy={18} r={8} fill={QY} opacity={0.6 + 0.4 * Math.sin(t * 6 + i)} />}</g>; })}
      </svg>
    </Abs>
  );
};

/* ═════════════ 10. Le monolithe : un « 1 » extrudé en 3D s'élève sous les projecteurs ═════════════ */
const QMonolith: React.FC<{cy: number; at: number; rise: number; label?: string; labelAt?: number}> = ({cy, at, rise, label, labelAt = 1e9}) => {
  const t = useT();
  const r = prog(t, rise, rise + 1.2, easeOut);
  const lq = t > labelAt ? Math.min(1, sp(t, labelAt, 8, 10)) : 0;
  const depth = 22;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        {[-1, 1].map((sd) => <polygon key={sd} points={`${540 + sd * 420},${cy - 620} ${540 + sd * 120},${cy + 330} ${540 + sd * 300},${cy + 330}`} fill="#FFF3C4" opacity={0.35 * r} />)}
        <ellipse cx={540} cy={cy + 340} rx={300} ry={40} fill="rgba(0,0,0,0.15)" />
      </svg>
      <div style={{position: 'absolute', left: 0, top: cy - 420 + (1 - r) * 300, width: 1080, height: 760, display: 'flex', justifyContent: 'center', overflow: 'hidden', opacity: r}}>
        <div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 720, lineHeight: 1}}>
          {Array.from({length: depth}, (_, i) => <div key={i} style={{position: 'absolute', left: depth - i, top: depth - i, color: i === 0 ? NBK : `hsl(220, 45%, ${18 + i}%)`}}>1</div>)}
          <div style={{position: 'relative', color: QY, WebkitTextStroke: `10px ${NBK}`}}>1</div>
        </div>
      </div>
      {label && lq > 0 && <div style={{position: 'absolute', left: 0, top: cy + 360, width: 1080, display: 'flex', justifyContent: 'center', transform: `scale(${lq})`}}><div style={{...nb(QR, 8), borderColor: NBK, padding: '10px 28px', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff'}}>{label}</div></div>}
    </>
  );
};

/* ═════════════ 11. Les secteurs : trois en tête de liste… puis tous s'allument, bureau compris ═════════════ */
const QSectors: React.FC<{y: number; at: number; top: [string, string, number][]; rest: [string, string][]; all: number}> = ({y, at, top, rest, all}) => {
  const t = useT();
  const a = prog(t, all, all + 1.0, easeOut);
  const tiles = [...top.map(([l, ic, tt]) => ({l, ic, tt, top: true})), ...rest.map(([l, ic], i) => ({l, ic, tt: all + 0.1 + i * 0.12, top: false}))];
  return (
    <Abs x={60} y={y} w={960} h={760} style={{display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', opacity: pop(t, at)}}>
      {tiles.map(({l, ic, tt, top: tp}) => { const on = t > tt; const q = tp ? (on ? Math.min(1, sp(t, tt, 9, 12)) : 0.001) : Math.max(0.6, a > 0 ? 1 : 0.6); const red = on; return <div key={l} style={{width: 290, height: 220, ...nb(red ? (tp ? QR : '#F7B9B2') : '#fff', 7), borderColor: NBK, transform: `scale(${q})`, opacity: tp ? 1 : 0.5 + 0.5 * a, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}><Ico n={ic} size={80} c={red ? (tp ? '#fff' : QR) : DIM} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: red && tp ? '#fff' : INK}}>{l}</div></div>; })}
    </Abs>
  );
};

/* ═════════════ 12. Le trousseau de la prévention : quatre clés qui se détachent une à une ═════════════ */
const QKeys: React.FC<{cy: number; at: number; keys: [string, string, number][]}> = ({cy, at, keys}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const swing = Math.sin(k * 2) * 8;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <circle cx={540} cy={cy - 330} r={70} fill="none" stroke="#8A96A8" strokeWidth={16} />
        {keys.map(([, , a], i) => { const ang = -60 + i * 40 + swing; const out = prog(t, a, a + 0.7, easeOut); const c = [QB, QO, QG, QN][i]; return <g key={i} transform={`translate(540 ${cy - 260}) rotate(${ang * (1 - out)}) translate(0 ${out * 60})`}><g transform={`translate(${out * (-330 + i * 220)} ${out * (120 + (i % 2) * 140)})`}><circle cy={30} r={44} fill="none" stroke={c} strokeWidth={18} /><rect x={-10} y={70} width={20} height={230} fill={c} stroke={NBK} strokeWidth={4} /><rect x={10} y={240} width={40} height={18} fill={c} stroke={NBK} strokeWidth={4} /><rect x={10} y={276} width={28} height={18} fill={c} stroke={NBK} strokeWidth={4} /></g></g>; })}
      </svg>
      {keys.map(([l, ic, a], i) => { const q = t > a + 0.5 ? Math.min(1, sp(t, a + 0.5, 9, 12)) : 0; const x = 540 + (-330 + i * 220), y = cy + 120 + (i % 2) * 140; return <div key={l} style={{position: 'absolute', left: x - 120, top: y + 80, width: 240, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, transform: `scale(${q})`}}><div style={{width: 76, height: 76, borderRadius: 38, background: [QB, QO, QG, QN][i], border: `5px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n={ic} size={42} c="#fff" /></div><div style={{...nb('#fff', 4), borderColor: NBK, padding: '4px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, textAlign: 'center', lineHeight: 1.05}}>{l}</div></div>; })}
    </>
  );
};

/* ═════════════ 13. Le poste ergonomique : le siège se règle, l'écran monte à hauteur des yeux ═════════════ */
const QWorkstation: React.FC<{cy: number; at: number; seat: number; screen: number}> = ({cy, at, seat, screen}) => {
  const t = useT();
  const s = prog(t, seat, seat + 0.9, easeInOut), e = prog(t, screen, screen + 0.9, easeInOut);
  const sy = lerp(60, 0, s), my = lerp(120, 0, e);
  const ok = s > 0.95 && e > 0.95;
  const eyeY = cy - 250 + sy;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <rect x={560} y={cy + 60} width={420} height={26} rx={8} fill="#B9845A" stroke={NBK} strokeWidth={6} /><rect x={940} y={cy + 86} width={20} height={300} fill="#8A96A8" stroke={NBK} strokeWidth={4} />
      <g transform={`translate(0 ${my})`}><rect x={720} y={cy - 330} width={240} height={170} rx={12} fill="#2B3240" stroke={NBK} strokeWidth={7} /><rect x={736} y={cy - 314} width={208} height={138} rx={6} fill="#9FD3FF" /><rect x={830} y={cy - 160} width={22} height={120 - my} fill="#2B3240" stroke={NBK} strokeWidth={4} /></g>
      <rect x={600} y={cy + 40} width={170} height={20} rx={6} fill="#C9D2DF" stroke={NBK} strokeWidth={4} />
      <g transform={`translate(0 ${sy})`}>
        <rect x={250} y={cy + 30} width={250} height={34} rx={14} fill={QN} stroke={NBK} strokeWidth={6} /><rect x={250} y={cy - 220} width={40} height={260} rx={14} fill={QN} stroke={NBK} strokeWidth={6} />
        <circle cx={400} cy={cy - 290} r={56} fill="#8D5524" stroke={NBK} strokeWidth={6} />
        <path d={`M 340 ${cy + 30} L 345 ${cy - 220} Q 400 ${cy - 245} 450 ${cy - 220} L 470 ${cy + 30} Z`} fill={QG} stroke={NBK} strokeWidth={6} />
        <path d={`M 440 ${cy - 170} L 560 ${cy - 60} L 650 ${cy + 40 - sy}`} fill="none" stroke={NBK} strokeWidth={40} strokeLinecap="round" strokeLinejoin="round" /><path d={`M 440 ${cy - 170} L 560 ${cy - 60} L 650 ${cy + 40 - sy}`} fill="none" stroke={QG} strokeWidth={28} strokeLinecap="round" strokeLinejoin="round" />
        <path d={`M 450 ${cy + 50} L 600 ${cy + 50} L 600 ${cy + 300}`} fill="none" stroke={NBK} strokeWidth={48} strokeLinecap="round" strokeLinejoin="round" /><path d={`M 450 ${cy + 50} L 600 ${cy + 50} L 600 ${cy + 300}`} fill="none" stroke={QN} strokeWidth={36} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <rect x={360} y={cy + 64 + sy} width={30} height={320 - sy} fill="#8A96A8" stroke={NBK} strokeWidth={4} /><rect x={270} y={cy + 380} width={210} height={20} rx={10} fill="#5B6472" stroke={NBK} strokeWidth={4} />
      <line x1={430} y1={eyeY} x2={740} y2={cy - 290 + my} stroke={ok ? QG : QO} strokeWidth={6} strokeDasharray="14 10" />
      {ok && <g transform={`translate(560 ${cy - 400})`}><circle r={44} fill={QG} stroke={NBK} strokeWidth={6} /><path d="M -18 0 l 12 14 l 26 -28" fill="none" stroke="#fff" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" /></g>}
    </svg>
  );
};

/* ═════════════ 14. La rotation des tâches : le travailleur tourne entre trois postes, chaque fois un groupe de muscles différent ═════════════ */
const QRotate: React.FC<{cx: number; cy: number; at: number; stations: [string, string][]}> = ({cx, cy, at, stations}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const n = stations.length, R = 300;
  const ph = (k * 0.45) % n;
  const cur = Math.floor(ph);
  const f = easeInOut(Math.min(1, (ph - cur) * 2.2));
  const ang = (i: number) => -Math.PI / 2 + (i / n) * Math.PI * 2;
  const a = lerp(ang(cur), ang(cur + 1), f);
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="#C9D2DF" strokeWidth={14} strokeDasharray="24 16" />
        {[0, 1, 2].map((i) => { const a0 = ang(i) + 0.5, a1 = ang(i) + 1.6; return <path key={i} d={`M ${cx + Math.cos(a0) * R} ${cy + Math.sin(a0) * R} A ${R} ${R} 0 0 1 ${cx + Math.cos(a1) * R} ${cy + Math.sin(a1) * R}`} fill="none" stroke={QO} strokeWidth={10} markerEnd="" />; })}
        <g transform={`translate(${cx + Math.cos(a) * R} ${cy + Math.sin(a) * R})`}><circle cy={-50} r={30} fill="#8D5524" stroke={NBK} strokeWidth={5} /><path d="M -40 50 Q -40 -16 0 -16 Q 40 -16 40 50 Z" fill={QO} stroke={NBK} strokeWidth={5} /></g>
      </svg>
      {stations.map(([l, ic], i) => { const x = cx + Math.cos(ang(i)) * (R + 0), y = cy + Math.sin(ang(i)) * R; const on = i === (f > 0.5 ? (cur + 1) % n : cur); return <div key={l} style={{position: 'absolute', left: x - 120, top: y - (i === 0 ? 210 : -60), width: 240, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}><div style={{width: 100, height: 100, borderRadius: 22, background: on ? QO : '#fff', border: `6px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: on ? `0 0 26px ${QO}` : `5px 5px 0 ${NBK}`}}><Ico n={ic} size={56} c={on ? '#fff' : QO} /></div><div style={{...nb('#fff', 4), borderColor: NBK, padding: '4px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, whiteSpace: 'nowrap'}}>{l}</div></div>; })}
    </>
  );
};

/* ═════════════ 15. Le bon geste de levage : dos rond barré, genoux fléchis validés ═════════════ */
const QLift: React.FC<{cy: number; at: number; bad: number; good: number}> = ({cy, at, bad, good}) => {
  const t = useT();
  const fig = (x: number, kind: 'bad' | 'good', a: number) => {
    const k = Math.max(0, t - a);
    const lift = (Math.sin(k * 2.2 - Math.PI / 2) + 1) / 2;
    const c = kind === 'bad' ? QR : QG;
    if (kind === 'bad') return <g transform={`translate(${x} ${cy})`}><path d={`M 0 200 L 0 60 Q 40 ${-10 + lift * -60} ${110 - lift * 60} ${40 - lift * 120}`} fill="none" stroke={NBK} strokeWidth={34} strokeLinecap="round" /><path d={`M 0 200 L 0 60 Q 40 ${-10 + lift * -60} ${110 - lift * 60} ${40 - lift * 120}`} fill="none" stroke={c} strokeWidth={22} strokeLinecap="round" /><circle cx={140 - lift * 70} cy={20 - lift * 130} r={36} fill="#8D5524" stroke={NBK} strokeWidth={5} /><rect x={90 - lift * 50} y={170 - lift * 120} width={110} height={80} fill="#D7A86E" stroke={NBK} strokeWidth={5} /><path d="M 0 200 L -30 330 M 0 200 L 30 330" stroke={NBK} strokeWidth={20} strokeLinecap="round" /></g>;
    return <g transform={`translate(${x} ${cy + lift * -40})`}><path d={`M 0 ${120 - lift * 40} L 0 ${-60 - lift * 20}`} stroke={NBK} strokeWidth={34} strokeLinecap="round" /><path d={`M 0 ${120 - lift * 40} L 0 ${-60 - lift * 20}`} stroke={c} strokeWidth={22} strokeLinecap="round" /><circle cx={0} cy={-110 - lift * 20} r={36} fill="#8D5524" stroke={NBK} strokeWidth={5} /><rect x={-55} y={110 - lift * 80} width={110} height={80} fill="#D7A86E" stroke={NBK} strokeWidth={5} /><path d={`M 0 ${120 - lift * 40} L ${-60 + lift * 50} ${230 - lift * 20} L -20 ${330 + lift * 40} M 0 ${120 - lift * 40} L ${60 - lift * 50} ${230 - lift * 20} L 20 ${330 + lift * 40}`} fill="none" stroke={NBK} strokeWidth={20} strokeLinecap="round" strokeLinejoin="round" /></g>;
  };
  const bq = t > bad ? Math.min(1, sp(t, bad + 0.6, 8, 10)) : 0, gq = t > good ? Math.min(1, sp(t, good + 0.6, 8, 10)) : 0;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <line x1={60} y1={cy + 340} x2={1020} y2={cy + 340} stroke={NBK} strokeWidth={6} />
      {t > bad && fig(260, 'bad', bad)}{t > good && fig(780, 'good', good)}
      {bq > 0 && <g transform={`translate(270 ${cy - 260}) scale(${bq})`}><circle r={56} fill={QR} stroke={NBK} strokeWidth={6} /><path d="M -22 -22 L 22 22 M 22 -22 L -22 22" stroke="#fff" strokeWidth={12} strokeLinecap="round" /></g>}
      {gq > 0 && <g transform={`translate(780 ${cy - 260}) scale(${gq})`}><circle r={56} fill={QG} stroke={NBK} strokeWidth={6} /><path d="M -24 0 l 16 18 l 32 -36" fill="none" stroke="#fff" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" /></g>}
    </svg>
  );
};

/* ═════════════ 16. L'aide mécanique : le palan soulève la charge, le dos est épargné ═════════════ */
const QHoist: React.FC<{cy: number; at: number; lift: number}> = ({cy, at, lift}) => {
  const t = useT();
  const l = prog(t, lift, lift + 1.6, easeInOut);
  const hy = lerp(cy + 160, cy - 120, l);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <rect x={140} y={cy - 420} width={800} height={36} fill={QY} stroke={NBK} strokeWidth={7} />{Array.from({length: 8}, (_, i) => <line key={i} x1={160 + i * 100} y1={cy - 420} x2={210 + i * 100} y2={cy - 384} stroke={NBK} strokeWidth={6} />)}
      <rect x={140} y={cy - 384} width={36} height={740} fill={QY} stroke={NBK} strokeWidth={7} /><rect x={100} y={cy + 350} width={120} height={30} fill="#5B6472" stroke={NBK} strokeWidth={6} />
      <rect x={580} y={cy - 380} width={120} height={80} rx={10} fill="#5B6472" stroke={NBK} strokeWidth={6} />
      <line x1={640} y1={cy - 300} x2={640} y2={hy - 40} stroke={NBK} strokeWidth={8} />
      <path d={`M 640 ${hy - 40} q 0 30 -24 30`} fill="none" stroke={NBK} strokeWidth={8} />
      <rect x={540} y={hy - 10} width={200} height={150} fill="#D7A86E" stroke={NBK} strokeWidth={7} /><path d={`M 560 ${hy - 10} L 640 ${hy - 40} L 720 ${hy - 10}`} fill="none" stroke={NBK} strokeWidth={5} />
      <g transform={`translate(330 ${cy + 120})`}><circle cy={-170} r={50} fill="#8D5524" stroke={NBK} strokeWidth={6} /><path d="M -60 220 L -60 -100 Q 0 -130 60 -100 L 60 220 Z" fill={QG} stroke={NBK} strokeWidth={6} /><path d={`M 50 -60 L 150 ${-120 + l * 0} L 230 ${-150}`} fill="none" stroke={NBK} strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" /><path d={`M 50 -60 L 150 -120 L 230 -150`} fill="none" stroke={QG} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" /><rect x={210} y={-180} width={60} height={40} rx={8} fill={QR} stroke={NBK} strokeWidth={5} /></g>
      <line x1={140} y1={cy + 380} x2={1000} y2={cy + 380} stroke={NBK} strokeWidth={6} />
    </svg>
  );
};

/* ═════════════ 17. La responsabilité partagée : deux pièces de puzzle (entreprise / collaborateur) s'emboîtent ═════════════ */
const QPuzzle: React.FC<{cy: number; at: number; left: [string, string, number]; right: [string, string, number]; join: number}> = ({cy, at, left, right, join}) => {
  const t = useT();
  const j = prog(t, join, join + 0.9, easeInOut);
  const piece = (side: 1 | -1) => `M ${-260 * (side === 1 ? 1 : 0)} -160 H ${side === 1 ? 0 : 260} V -40 ${side === 1 ? 'a 50 50 0 1 1 0 80' : 'a 50 50 0 1 0 0 80'} V 160 H ${side === 1 ? -260 : 0} Z`;
  const lq = t > left[2] ? Math.min(1, sp(t, left[2], 9, 12)) : 0, rq = t > right[2] ? Math.min(1, sp(t, right[2], 9, 12)) : 0;
  const glow = t > join + 0.9;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <g transform={`translate(${lerp(400, 540, j)} ${cy}) scale(${lq})`}><path d={piece(1)} fill={QB} stroke={NBK} strokeWidth={8} style={{filter: glow ? `drop-shadow(0 0 20px ${QY})` : undefined}} /></g>
        <g transform={`translate(${lerp(680, 540, j)} ${cy}) scale(${rq})`}><path d={`M 0 -160 H 260 V 160 H 0 V 40 a 50 50 0 1 0 0 -80 Z`} fill={QG} stroke={NBK} strokeWidth={8} style={{filter: glow ? `drop-shadow(0 0 20px ${QY})` : undefined}} /></g>
      </svg>
      <div style={{position: 'absolute', left: lerp(400, 540, j) - 250, top: cy - 60, width: 220, textAlign: 'center', transform: `scale(${lq})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}><Ico n={left[1]} size={64} c="#fff" /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: '#fff'}}>{left[0]}</div></div>
      <div style={{position: 'absolute', left: lerp(680, 540, j) + 40, top: cy - 60, width: 220, textAlign: 'center', transform: `scale(${rq})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}><Ico n={right[1]} size={64} c="#fff" /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: '#fff'}}>{right[0]}</div></div>
    </>
  );
};

/* ═════════════ 18. Le bon geste : une main trace une courbe de lumière parfaite qui devient un cœur ═════════════ */
const QGesture: React.FC<{cy: number; at: number; heart: number}> = ({cy, at, heart}) => {
  const t = useT();
  const p = prog(t, at + 0.3, heart, easeInOut);
  const h = prog(t, heart, heart + 0.8, easeOut);
  const N = 80;
  const curve = (u: number): [number, number] => { const a = u * Math.PI * 2; const x = 16 * Math.sin(a) ** 3, y = 13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a); return [540 + x * 18 * (0.4 + 0.6 * h) + (1 - h) * (u - 0.5) * 700, cy - y * 18 * (0.4 + 0.6 * h) + (1 - h) * Math.sin(u * Math.PI) * -200]; };
  const pts = Array.from({length: Math.max(2, Math.floor(N * p))}, (_, i) => curve(i / N));
  const tip = pts[pts.length - 1];
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <polyline points={pts.map((q) => q.join(',')).join(' ')} fill={h > 0.9 ? 'rgba(226,72,59,0.25)' : 'none'} stroke={h > 0.5 ? QR : QY} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" style={{filter: `drop-shadow(0 0 18px ${h > 0.5 ? QR : QY})`}} />
      {pts.filter((_, i) => i % 6 === 0).map((q, i) => <circle key={i} cx={q[0]} cy={q[1]} r={4} fill="#fff" opacity={0.7} />)}
      <g transform={`translate(${tip[0]} ${tip[1]})`}><circle r={16} fill="#fff" style={{filter: `drop-shadow(0 0 16px ${QY})`}} /><path d="M 10 10 q 40 30 70 90 l -30 18 q -30 -40 -60 -70 Z" fill="#8D5524" stroke={NBK} strokeWidth={5} /></g>
    </svg>
  );
};

/* ═════════════ Palette et données : la Charte Qualité ═════════════ */
const CqN = '#0B2E6B', CqG = '#22B573', CqO = '#F28C28', CqR = '#D7263D', CqB = '#1F5BD8', CqT = '#14A3A3', CqY = '#F6C744', CqV = '#8E5BD8', CqP = '#D6457A', CqK = '#1B1B1B', CqS = '#5B6577';
const CQ_PTS_RAW = '192320720304288240944304380248580280464240324232416272292296216208620232016272636296652264416288392256316248128320852216060264724312036216132296216304396264312192528240872208592288448288724264012264464320148200832240276280760272440304560224128224036248448240316312044248092328524264276216308248848288612328384240544272460328556264076216224304188184856208940312500328756296148296540248536240188312056224656240832320720320076328656224824288672192904192420280900184632224576192724296604296532216624224480272836216864272392240752224208256860280648224420184552304268248408224832272456256648208848240064304080192180184868328836264540200140296640320916248104192132232100216856288576288228248044216384304196248088208588264696208288256096320456208296272900216108216756312308232624272728224844264300216284184536208292248080208052296072192556248468248732264376272612264052232068216532312428280380328476248740312756232628296596216572200632240892200564200580264068296092184568304096336224240472240236248364312496304432256536272744256032272320192212280272256124216088336408256020264888240616224684200756184436280232240648256928272024224824224756216148312056272692200604216212184428232472320900264296320388248420296204184856224280288156216104320848272304272888320600208644328284264752240224192780184840288420232708184896320728288216320224272716296064288360272604200060232532328524280536288880256072208120192560272324328268264564264396200456288868200572312444280892184412200892248276328720192836312220312736304180216464256764216548200348328744288872320260248540216316232844216868232836184884200912240276312588296788216180312920240184272208192540296880272448208208224732216024256276200424272456224368256576272108184376240032240832256144224608272460280416240024272528224844184212232692216916264852312756264308264060280872192316264344320912192064224756248740296024240136320228264580184120208136224924328840320460312072288424224912272148216036312560240564328048208188248620200552192160208644248452264436264204280052280060248600192252248364296180296532200280224552272580216460248828216636264032208080320624320644200640256892216448272740232760224748280620216528192316200280192224288436232204200064208544320608320564184612216532184060328464272888208544256624192540184732200132328112320548248456240844200320272720224556328220280916328860312356328108200844248688192644264900328760240264240196200568192724328592192596184760256748216196296628248392304740200452232312288548328644216300328556216656256304208216224280272836296324216752320848192724184248240600304412216628264544192536320548184180200548280072320496320472272936304316296360320056288184208468280416224112336028280432240388312132200932248124296372296904208048224532232568320708200080336884312860248540264684184856240460296824240564216068312320304552320852280092216596296140200636216124312028264288272760208736192924184572232632304036296916216688208932328320288848224616304448224304320572216284248636232380232540232444216748296136192472256696192528272940216612312632288864240284328616320904256380264824272220232284232404248920272492312280256436296628280588184900312428184200256744272572280028248832288892264044280856256908200872256308328588280704208732232916184444248192288532248908248312224876216304224412184292280032288740216920320628312876264308296524200884248300296700200364264536224016256224320036232924312456272132280636312900248324280404200412248408288524232104336556312572248564280128288348312368272460216320224388232428200840192616240904240660248776208928192476264100312796184216192788200216256132312504320152304276248780216872272524248040240352320540328392208868280848256380312584192728208788184680208544224196264032256244248856304640272940184772216368320048256376256564296292328760288464304548312360288368304768192116216180264612296392224372312288304480320020232628232868312220200524184740264312256724232912320916312376288720208016240828248396248880192100328316280324264060200416192180248752256860200852200624304400272864224384272880320396296188280404296396232236264284280756200568240740328596264048320056320768208192240824208380280916200572328264272548232908184468232276184364328872240444296716264760304304304424288100200068328192192720288308312880304476328108312784208864320848304184192828312644232196232752272284312196280144208288288876328416208404232056192908312872304544288400240212328088192068232248272852264612232200272536256320240724248488288404264308280736240028232804216304288676216844312888192748264572184304192648272468264312272552256744304204248608256308184528320208288256240936192204328844296484312884328660328056240036264284296220296076296612248220264752208124200728272188264212216112304044312288320240256116296532264296240072304408272128208748248856320620296436184040224732184220248468328076200740280620280424192116184860264372328320208764200224256828232748312856272556280392272396216084184636280560288924200060216676184288208196216552240284216700216568208472304120304216288212200612200188232488320076312720256224208116328736208384256052312604312304256656320296304084328932312440208388264716248096192292184848320060312608304356296844328868248592304616288748200452216104208900200644280052216860232756328600272544240828280232256608224056256040288248256616192716328648320412232064240676200624240852232292264144320300184692184400208440288360304548216632208556200400256748232864304800208144304604264312240028216196328200304772200200288804184868296624288680192192208912256280240748184280304636248608208564312640240864288220184544304860296036280576208064192040208896272452248288192544208840304400192852248316184616208112192732296188296596200456304240272876184128304408192220216208304652232896240600288844280408240116200200224320320432272448256716280748328896304440272856192572264624208828328884264604280716184640208584208492296524312300280096208644312836280704192932184048240864208628328200240308216884216324184864256560304180232412296420216404184944320204264432192140216408304484296432224428216184224184240568224888256280320056208584272320256300200556232404280072224448192432288460264932200300232204312652328388280424208068200716216264256924248044264536304824320432304532280784192924264436248080304904320904272056304940328836248396280732312280208592272384320484280192224040304312320476296416304388296468296524296424304324296184256412280832192096304596280892328724200296192648240868216108328712192876200200320048304636328208208384288744208524216896208892312724216364280700184428296928208552208212296720272556296756280896256560320180328876312216240192256836328204296212248464224836232760320440224924216400304712208852296804200556184740184560208084216728320300312840208188328476312860184432208436216132216316328208320048288064272452200296256860328628216464288080224868264200208420200624256480288100184568288224224440256032224296288832304156312736224284200260264824256476280632256908216208240368288744240868184884184732328028296572296120224044232620312444232932216904304256256276296352304104304832224928256388216300264580296240240588200300248092312852184376304848208124328032304288224772184548296188216472288304240568256500312508328436200652248584288528288184288736288112208296208400288252264736256844232880208548264384224052200828184244264780200192304064320928304076184796200608192736320940200204216372280400224896192860216800192256272552288836200040272232272216272932264752304732280632192532296408208876248920304372264136304524328832208196184840240272240708216540312608288444184292232276232088320588216324200920208204232620264052264568272728240488304';
const CQ_PTS: [number, number][] = Array.from({length: CQ_PTS_RAW.length / 6}, (_, i) => [parseInt(CQ_PTS_RAW.slice(i * 6, i * 6 + 3), 10), parseInt(CQ_PTS_RAW.slice(i * 6 + 3, i * 6 + 6), 10)]);
/* couleur par lettre de « CHARTE » */
const cqLetter = (x: number) => (x < 170 ? CqN : x < 329 ? CqG : x < 518 ? CqO : x < 665 ? CqB : x < 815 ? CqT : CqR);

const CqChip: React.FC<{x: number; y: number; w?: number; at: number; l: string; c?: string; ic?: string; fs?: number; fill?: boolean; out?: number}> = ({x, y, w = 440, at, l, c = CqK, ic, fs = 32, fill, out}) => {
  const t = useT();
  const q = (t > at ? Math.min(1, sp(t, at, 9, 12)) : 0) * (out ? 1 - prog(t, out - 0.2, out, easeIn) : 1);
  const fg = fill ? (c === CqY ? NBK : '#fff') : INK;
  return <div style={{position: 'absolute', left: x - w / 2, top: Math.max(448, y), width: w, display: 'flex', justifyContent: 'center', transform: `scale(${q})`, zIndex: 6}}><div style={{...nb(fill ? c : '#fff', 6), borderColor: NBK, boxShadow: `6px 6px 0 ${fill ? NBK : c}`, padding: '8px 18px', display: 'flex', alignItems: 'center', gap: 12, fontFamily: sansFont, fontWeight: 900, fontSize: fs, color: fg, textAlign: 'center', lineHeight: 1.1}}>{ic && <Ico n={ic} size={fs + 8} c={fill ? fg : c} />}{l}</div></div>;
};
/* Silhouette de personne réutilisable (tête + buste) */
const CqPerson: React.FC<{x: number; y: number; c: string; s?: number; skin?: string; hair?: boolean; helmet?: string}> = ({x, y, c, s = 1, skin = '#8B5E3C', hair, helmet}) => <g transform={`translate(${x} ${y}) scale(${s})`}><circle cy={-58} r={26} fill={skin} stroke={NBK} strokeWidth={5} />{hair && <path d="M -28 -60 Q -30 -92 0 -90 Q 30 -92 28 -60 Q 30 -30 34 -20 L 20 -40 Q 0 -52 -20 -40 L -34 -20 Q -30 -30 -28 -60 Z" fill="#2B1B10" stroke={NBK} strokeWidth={4} />}{helmet && <path d="M -32 -64 Q -32 -96 0 -96 Q 32 -96 32 -64 L 40 -62 L -40 -62 Z" fill={helmet} stroke={NBK} strokeWidth={4} />}<path d="M -40 46 Q -40 -24 0 -24 Q 40 -24 40 46 Z" fill={c} stroke={NBK} strokeWidth={5} /></g>;
const SKINS = ['#8B5E3C', '#6B4A2B', '#A87652', '#5A3A22'];
/* Le document « charte qualité », fil rouge de la capsule : bandeau marine, lignes qui s'écrivent, sceau vert */
const CqDoc: React.FC<{x: number; y: number; w?: number; rot?: number; lines?: number; seal?: number; title?: string; z?: number; op?: number; dust?: number; glow?: number}> = ({x, y, w = 300, rot = 0, lines = 1, seal = 0, title = 'CHARTE QUALITÉ', z = 4, op = 1, dust = 0, glow = 0}) => {
  const h = w * 1.36;
  return (
    <div style={{position: 'absolute', left: x - w / 2, top: y - h / 2, width: w, height: h, transform: `rotate(${rot}deg)`, zIndex: z, opacity: op}}>
      {glow > 0 && <div style={{position: 'absolute', inset: -40 * glow, borderRadius: 40, background: `radial-gradient(closest-side, rgba(246,199,68,${0.55 * glow}), rgba(246,199,68,0))`}} />}
      <div style={{position: 'absolute', inset: 0, ...nb('#fff', 8), borderColor: NBK, overflow: 'hidden'}}>
        <div style={{height: h * 0.2, background: CqN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: w * 0.085, color: '#fff', letterSpacing: 1}}>{title}</div>
        {Array.from({length: 7}, (_, i) => <div key={i} style={{margin: `${h * 0.045}px ${w * 0.1}px 0`, height: h * 0.028, borderRadius: 4, background: i % 3 === 0 ? CqG : '#C9D2DF', width: `${(i % 3 === 2 ? 55 : 80) * cl(lines * 7 - i)}%`}} />)}
        {dust > 0 && <div style={{position: 'absolute', inset: 0, background: `rgba(150,130,100,${0.55 * dust})`, mixBlendMode: 'multiply'}} />}
      </div>
      {seal > 0 && <div style={{position: 'absolute', right: -w * 0.08, bottom: -w * 0.08, width: w * 0.36, height: w * 0.36, borderRadius: '50%', background: CqG, border: `5px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${seal}) rotate(${(1 - seal) * -90}deg)`, boxShadow: `4px 4px 0 ${NBK}`}}><Ico n="BadgeCheck" size={w * 0.22} c="#fff" /></div>}
    </div>
  );
};

/* ═════════════ 1. Douze cent cinquante particules qui s'assemblent en « CHARTE », une couleur par lettre ═════════════ */
const CqParticles: React.FC<{cy: number; at: number; form: number; dur?: number}> = ({cy, at, form, dur = 1.1}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const ox = 60, oy = cy - 260;
  const done = form + dur + 0.6;
  const wave = t > done ? prog(t, done, done + 0.9, easeOut) : 0;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      {CQ_PTS.map(([px, py], i) => { const tx = ox + px, ty = oy + py; const a0 = random(`ca${i}`) * Math.PI * 2, r0 = 600 + random(`cr${i}`) * 450; const sx = 540 + Math.cos(a0) * r0, sy = cy + Math.sin(a0) * r0 * 1.3; const d = random(`cd${i}`) * 0.5; const q = prog(t, form + d, form + d + dur, easeInOut); const dx = sx - tx, dy = sy - ty; const ang = (1 - q) * 2.5; const rx = dx * Math.cos(ang) - dy * Math.sin(ang), ry = dx * Math.sin(ang) + dy * Math.cos(ang); const x = tx + rx * (1 - q), y = ty + ry * (1 - q); const near = wave > 0 ? Math.max(0, 1 - Math.abs(px / 960 - wave) * 6) : 0; return <circle key={i} cx={x} cy={y} r={5.4 + near * 2.4 + (q >= 1 ? Math.sin(k * 3 + i) * 0.5 : 0) + (1 - q) * 1.4} fill={near > 0.5 ? CqY : cqLetter(px)} opacity={0.35 + 0.65 * Math.max(q, 0.2)} />; })}
    </svg>
  );
};

/* ═════════════ 2. Des concepts théoriques flous à la feuille de route : les bulles se figent en jalons d'une route, le niveau des standards monte ═════════════ */
const CqRoadmap: React.FC<{cy: number; at: number; theo: number; road: number; elev: number; ent: number}> = ({cy, at, theo, road, elev, ent}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const rq = prog(t, road, road + 1.0, easeInOut);
  const P = [[150, cy + 330], [330, cy + 230], [250, cy + 90], [480, cy + 20], [700, cy + 80], [620, cy - 80], [860, cy - 150]];
  const path = `M ${P[0][0]} ${P[0][1]} C 300 ${cy + 340}, 400 ${cy + 260}, ${P[1][0]} ${P[1][1]} S 140 ${cy + 120}, ${P[2][0]} ${P[2][1]} S 400 ${cy + 10}, ${P[3][0]} ${P[3][1]} S 760 ${cy + 120}, ${P[4][0]} ${P[4][1]} S 560 ${cy - 30}, ${P[5][0]} ${P[5][1]} S 790 ${cy - 170}, ${P[6][0]} ${P[6][1]}`;
  const L = ['Concept', 'Théorie', 'Principe', 'Norme', 'Exigence', 'Standard'];
  const lv = prog(t, elev, elev + 0.9, easeOut);
  const eq = t > ent ? Math.min(1, sp(t, ent, 9, 11)) : 0;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        {rq > 0.01 && <path d={path} stroke="#C6CDD8" strokeWidth={70} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${rq} 1`} />}
        {rq > 0.01 && <path d={path} stroke={CqN} strokeWidth={56} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${rq} 1`} />}
        <path d={path} stroke={CqY} strokeWidth={5} fill="none" strokeDasharray="20 18" strokeDashoffset={-k * 60} opacity={rq > 0.98 ? 1 : 0} />
        <rect x={940} y={cy - 360} width={70} height={560} rx={16} fill="#fff" stroke={NBK} strokeWidth={6} />
        <rect x={948} y={cy + 192 - 540 * (0.25 + lv * 0.7)} width={54} height={540 * (0.25 + lv * 0.7)} rx={12} fill={CqG} />
        {[0, 1, 2, 3, 4].map((m) => <line key={m} x1={940} y1={cy - 260 + m * 100} x2={965} y2={cy - 260 + m * 100} stroke={NBK} strokeWidth={4} />)}
        {lv > 0 && <path d={`M 975 ${cy - 420 - lv * 20} l -30 40 l 60 0 Z`} fill={CqG} stroke={NBK} strokeWidth={4} />}
      </svg>
      {L.map((w, i) => { const fx = P[i + 1][0], fy = P[i + 1][1]; const bx = 160 + (i % 3) * 300 + Math.sin(k * 1.3 + i) * 30, by = cy - 330 + Math.floor(i / 3) * 170 + Math.cos(k * 1.1 + i * 2) * 25; const app = t > theo + i * 0.12 ? Math.min(1, sp(t, theo + i * 0.12, 8, 12)) : 0; const q = prog(t, road + 0.1 + i * 0.12, road + 0.7 + i * 0.12, easeInOut); const x = lerp(bx, fx, q), y = lerp(by, fy - 70, q); return <div key={i} style={{position: 'absolute', left: x - 90, top: y - 32, width: 180, height: 64, transform: `scale(${app})`, zIndex: 5}}><div style={{width: '100%', height: '100%', borderRadius: q > 0.9 ? 14 : 32, background: q > 0.9 ? '#fff' : 'rgba(255,255,255,0.65)', border: `${q > 0.9 ? 5 : 4}px ${q > 0.9 ? 'solid' : 'dashed'} ${q > 0.9 ? NBK : '#9AA7B8'}`, boxShadow: q > 0.9 ? `5px 5px 0 ${CqG}` : 'none', filter: `blur(${(1 - q) * 3}px)`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: q > 0.9 ? INK : '#7A8698', boxSizing: 'border-box'}}>{q > 0.9 && <Ico n="Flag" size={26} c={CqG} />}{w}</div></div>; })}
      <div style={{position: 'absolute', left: 820 - 70, top: cy - 220 - 60, width: 140, height: 120, transform: `scale(${eq})`, zIndex: 5, display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}><Ico n="Factory" size={110} c={CqN} /></div>
      <CqChip x={300} y={cy - 440} w={460} at={theo} l="Concepts théoriques" c="#9AA7B8" ic="CircleHelp" fs={28} fill out={road + 0.4} />
      <CqChip x={420} y={cy + 400} w={620} at={road + 0.3} l="Feuille de route ultra claire" c={CqN} ic="Route" fs={30} fill />
      <CqChip x={720} y={cy - 440} w={460} at={elev} l="Élever les standards" c={CqG} ic="TrendingUp" fs={30} fill />
    </>
  );
};

/* ═════════════ 3. La question fondamentale : un point d'interrogation géant se monte en briques, une ligne le traverse « de bout en bout » ═════════════ */
const CQ_QMARK: [number, number][] = [[-2, -4], [-1, -5], [0, -5], [1, -5], [2, -4], [2, -3], [1, -2], [0, -1], [0, 0], [0, 2]];
const CqBigQuestion: React.FC<{cy: number; at: number; bout: number}> = ({cy, at, bout}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const S = 90;
  const lq = prog(t, bout - 0.3, bout + 0.8, easeInOut);
  return (
    <>
      <div style={{position: 'absolute', left: 0, top: 440, width: 1080, height: 960, overflow: 'hidden'}}>
        {CQ_QMARK.map(([gx, gy], i) => { const a = at + 0.1 + i * 0.13; const q = prog(t, a, a + 0.45, easeIn); const land = t > a + 0.45 ? 1 : 0; const x = 540 + gx * S, y = cy + 150 + gy * S - 440; const bounce = land ? Math.max(0, Math.sin((t - a - 0.45) * 18) * 10 * Math.exp(-(t - a - 0.45) * 6)) : 0; return <div key={i} style={{position: 'absolute', left: x - S / 2 + 3, top: lerp(-200, y - S / 2, q) - bounce, width: S - 6, height: S - 6, borderRadius: 16, background: i === CQ_QMARK.length - 1 ? CqO : i % 2 ? CqN : '#24488F', border: `5px solid ${NBK}`, boxShadow: `5px 5px 0 ${NBK}`, transform: `rotate(${(1 - q) * (i % 2 ? 25 : -25)}deg)`, opacity: q > 0 ? 1 : 0}}><div style={{position: 'absolute', left: 8, top: 6, width: 30, height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.35)'}} /></div>; })}
      </div>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 5}}>
        <line x1={40} y1={cy + 430} x2={40 + 1000 * lq} y2={cy + 430} stroke={CqG} strokeWidth={14} strokeLinecap="round" />
        {lq > 0 && [0, 1].map((m) => <circle key={m} cx={m ? 40 + 1000 * lq : 40} cy={cy + 430} r={22} fill="#fff" stroke={CqG} strokeWidth={8} />)}
        {lq > 0 && <circle cx={40 + 1000 * lq} cy={cy + 430} r={30 + ((k * 40) % 30)} fill="none" stroke={CqG} strokeWidth={4} opacity={1 - ((k * 40) % 30) / 30} />}
      </svg>
      <CqChip x={830} y={cy + 250} w={400} at={bout} l="De bout en bout" c={CqG} ic="Route" fs={30} fill />
    </>
  );
};

/* ═════════════ 4. Le plan de la ligne : feu de départ « on y va ! », puis cinq stations qui s'allument au fil du menu ═════════════ */
const CQ_MENU: [string, string, string][] = [['Définir la charte', 'BookOpen', '#22B573'], ['Le pourquoi stratégique', 'Target', '#1F5BD8'], ['Les atouts majeurs', 'Award', '#F28C28'], ['La méthodologie de rédaction', 'PenLine', '#14A3A3'], ['Les critères de réussite', 'ListChecks', '#D6457A']];
const CqMenuLine: React.FC<{cy: number; at: number; go: number; items: number[]}> = ({cy, at, go, items}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const gq = prog(t, go - 0.1, go + 0.3, easeOut) * (1 - prog(t, go + 1.0, go + 1.5, easeIn));
  const y0 = cy - 330, dy = 168;
  const cur = items.filter((a) => t > a).length - 1;
  const ty = cur < 0 ? y0 - 80 : lerp(y0 + Math.max(0, cur - 1) * dy, y0 + cur * dy, prog(t, items[cur], items[cur] + 0.6, easeInOut));
  return (
    <>
      {gq > 0 && <div style={{position: 'absolute', left: 390, top: cy - 300, width: 300, height: 560, ...nb('#22282F', 8), borderColor: NBK, opacity: gq, transform: `scale(${0.8 + gq * 0.2})`, zIndex: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly'}}>{[CqR, CqY, CqG].map((c, i) => <div key={i} style={{width: 130, height: 130, borderRadius: 65, background: i === 2 ? c : '#3A424D', boxShadow: i === 2 ? `0 0 60px 20px ${c}` : 'inset 0 6px 12px rgba(0,0,0,0.5)', border: `5px solid ${NBK}`}} />)}</div>}
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: prog(t, go + 1.3, go + 1.6)}}>
        <line x1={170} y1={y0 - 60} x2={170} y2={y0 + 4 * dy + 40} stroke="#C6CDD8" strokeWidth={26} strokeLinecap="round" />
        <line x1={170} y1={y0 - 60} x2={170} y2={Math.max(y0 - 60, ty)} stroke={CqN} strokeWidth={26} strokeLinecap="round" />
      </svg>
      {CQ_MENU.map(([l, ic, c], i) => { const on = t > items[i]; const q = t > go + 1.4 + i * 0.08 ? Math.min(1, sp(t, go + 1.4 + i * 0.08, 9, 12)) : 0; const hq = on ? Math.min(1, sp(t, items[i], 8, 10)) : 0; return <div key={i} style={{position: 'absolute', left: 120, top: y0 + i * dy - 50, width: 900, height: 100, transform: `translateX(${(1 - q) * 300}px)`, opacity: q, zIndex: 5}}><div style={{position: 'absolute', left: 14, top: 14, width: 72, height: 72, borderRadius: 36, background: on ? c : '#fff', border: `7px solid ${NBK}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: on ? '#fff' : INK, boxShadow: on ? `0 0 ${24 * hq}px ${c}` : 'none'}}>{i + 1}</div><div style={{position: 'absolute', left: 120, top: 4, width: 760, height: 92, ...nb(on ? '#fff' : '#F1F3F6', 6), borderColor: on ? NBK : '#C6CDD8', boxShadow: on ? `6px 6px 0 ${c}` : 'none', display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px', transform: `scale(${1 + 0.05 * Math.sin(hq * Math.PI)})`}}><div style={{width: 60, height: 60, borderRadius: 14, background: on ? c : '#DDE2EA', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n={ic} size={40} c="#fff" /></div><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: on ? INK : '#9AA7B8'}}>{l}</span>{on && <span style={{marginLeft: 'auto', fontSize: 34, fontWeight: 900, color: c}}>●</span>}</div></div>; })}
      {cur >= 0 && <div style={{position: 'absolute', left: 170 - 40, top: ty - 40, width: 80, height: 80, zIndex: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 40, background: CqY, border: `6px solid ${NBK}`, boxShadow: `0 0 30px ${CqY}`}}><Ico n="TrainFront" size={46} c={NBK} /></div>}
      <CqChip x={540} y={cy - 440} w={420} at={go} l="On y va !" c={CqG} ic="Play" fs={34} fill out={go + 1.3} />
    </>
  );
};

/* ═════════════ 5. La fondation : la dalle se coule, la charte se pose comme première pierre, les étages des standards apparaissent ═════════════ */
const CqFoundation: React.FC<{cy: number; at: number; found: number; std: number}> = ({cy, at, found, std}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const pour = prog(t, at + 0.2, found, easeInOut);
  const dq = prog(t, found - 0.2, found + 0.5, easeIn);
  const imp = t > found + 0.3 && t < found + 0.9 ? (t - found - 0.3) / 0.6 : 0;
  const sq = prog(t, std, std + 0.9, easeOut);
  const G = cy + 260;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <rect x={80} y={G} width={920} height={160} fill="#B8A27C" stroke={NBK} strokeWidth={6} />
        {Array.from({length: 18}, (_, i) => <circle key={i} cx={100 + ((i * 53) % 900)} cy={G + 40 + ((i * 37) % 110)} r={6} fill="#9C8662" />)}
        <rect x={140} y={G - 90} width={800 * pour} height={90} fill="#AEB6C2" stroke={NBK} strokeWidth={6} />
        {pour > 0 && pour < 1 && <path d={`M ${140 + 800 * pour} ${G - 90} q 20 -120 60 -260`} stroke="#AEB6C2" strokeWidth={36} fill="none" strokeLinecap="round" />}
        {Array.from({length: 4}, (_, f) => <rect key={f} x={200} y={G - 90 - (f + 1) * 120} width={680} height={110} rx={6} fill={sq > f / 4 ? 'rgba(34,181,115,0.16)' : 'none'} stroke={sq > f / 4 ? CqG : '#9AA7B8'} strokeWidth={5} strokeDasharray={sq > (f + 0.6) / 4 ? undefined : '16 12'} opacity={t > at + 0.4 ? 1 : 0} />)}
        {imp > 0 && Array.from({length: 12}, (_, i) => { const a = (i / 11) * Math.PI; return <circle key={i} cx={540 + Math.cos(a) * (120 + imp * 220)} cy={G - 90 - Math.sin(a) * (30 + imp * 90)} r={14 * (1 - imp)} fill="#AEB6C2" />; })}
      </svg>
      <CqDoc x={540} y={lerp(cy - 320, G - 150, dq)} w={200} rot={(1 - dq) * -20} lines={1} seal={prog(t, found + 0.4, found + 0.8, easeOut)} z={6} op={prog(t, found - 0.35, found - 0.15)} />
      <CqChip x={540} y={G + 30} w={480} at={found} l="La fondation" c={CqN} ic="Landmark" fs={34} fill />
      <CqChip x={540} y={cy - 440} w={460} at={std} l="Nos standards" c={CqG} ic="Layers" fs={32} fill />
    </>
  );
};

/* ═════════════ 6. Pas un bout de papier dans un tiroir : la feuille glisse dans le classeur, le tiroir claque, tampon « NON » ═════════════ */
const CqDrawer: React.FC<{cy: number; at: number; paper: number; drawer: number; no: number}> = ({cy, at, paper, drawer, no}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const open = prog(t, at + 0.3, at + 0.9, easeOut) * (1 - prog(t, drawer, drawer + 0.25, easeIn));
  const pq = prog(t, paper, drawer, easeInOut);
  const nq = t > no ? Math.min(1, sp(t, no, 9, 9)) : 0;
  const shake = t > drawer + 0.25 && t < drawer + 0.6 ? Math.sin(t * 90) * 6 : 0;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at), transform: `translateX(${shake}px)`}}>
        <rect x={290} y={cy - 300} width={500} height={720} rx={20} fill="#7C8796" stroke={NBK} strokeWidth={7} />
        {[0, 1, 2].map((d) => { const oz = d === 1 ? open * 230 : 0; const y = cy - 270 + d * 230; return <g key={d}><rect x={310 - oz * 0.2} y={y} width={460 + oz * 0.4} height={200} rx={12} fill={d === 1 ? '#AEB8C6' : '#9AA5B4'} stroke={NBK} strokeWidth={6} transform={`translate(0 ${oz * 0.3})`} /><rect x={480} y={y + 80 + oz * 0.3} width={120} height={30} rx={10} fill="#E3E7ED" stroke={NBK} strokeWidth={5} /></g>; })}
      </svg>
      <div style={{position: 'absolute', left: lerp(160, 540 - 110, pq), top: lerp(cy - 420, cy - 40, pq), width: 220, height: 280, transform: `rotate(${lerp(-18, 0, pq)}deg) scaleY(${1 - prog(t, drawer - 0.15, drawer, easeIn) * 0.9})`, opacity: t > drawer + 0.05 ? 0 : pop(t, at + 0.2), zIndex: 5, ...nb('#fff', 5), borderColor: NBK}}>{[0, 1, 2, 3, 4, 5].map((m) => <div key={m} style={{margin: '22px 22px 0', height: 10, borderRadius: 5, background: '#C9D2DF'}} />)}</div>
      {nq > 0 && <div style={{position: 'absolute', left: 0, top: cy - 120, width: 1080, display: 'flex', justifyContent: 'center', transform: `scale(${lerp(2.2, 1, nq)}) rotate(-8deg)`, opacity: Math.min(1, nq * 2), zIndex: 8}}><div style={{border: `12px solid ${CqR}`, borderRadius: 26, padding: '14px 44px', fontFamily: sansFont, fontWeight: 900, fontSize: 110, color: CqR, background: 'rgba(255,255,255,0.85)', letterSpacing: 6}}>NON</div></div>}
      <CqChip x={540} y={cy + 460} w={700} at={paper} l="Un bout de papier administratif" c={CqS} ic="FileText" fs={30} fill />
    </>
  );
};

/* ═════════════ 7. Un document officiel : il gravit l'échelle de l'organisation jusqu'au conseil d'administration qui l'approuve ═════════════ */
const CqApproval: React.FC<{cy: number; at: number; off: number; climb: number; top: number; board: number}> = ({cy, at, off, climb, top, board}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const lv = [cy + 330, cy + 150, cy - 30, cy - 210];
  const W = [880, 680, 480, 300];
  const cq = prog(t, climb, top, easeInOut);
  const step = cq * 3;
  const dy = lerp(lv[Math.floor(Math.min(2.999, step))], lv[Math.min(3, Math.floor(step) + 1)], step % 1) - 120 - Math.sin((step % 1) * Math.PI) * 50;
  const bq = t > board ? Math.min(1, sp(t, board, 9, 9)) : 0;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        {lv.map((y, i) => <g key={i}><rect x={540 - W[i] / 2} y={y} width={W[i]} height={80} rx={14} fill={i === 3 ? CqN : ['#DDE6F2', '#C9D7EA', '#AFC4E2'][i]} stroke={NBK} strokeWidth={6} opacity={t > at + 0.1 + i * 0.12 ? 1 : 0} />{Array.from({length: [6, 5, 4, 0][i]}, (_, j) => <CqPerson key={j} x={540 - W[i] / 2 + 70 + j * ((W[i] - 140) / Math.max(1, [6, 5, 4, 1][i] - 1))} y={y + 40} c={[CqB, CqT, CqO, CqG, CqV, CqP][j % 6]} s={0.5} skin={SKINS[j % 4]} />)}</g>)}
        {[0, 1, 2, 3, 4].map((j) => <CqPerson key={j} x={420 + j * 60} y={lv[3] - 6} c="#fff" s={0.48} skin={SKINS[(j + 1) % 4]} />)}
      </svg>
      <CqDoc x={540 + Math.sin(step * Math.PI) * 60} y={cq > 0 ? dy : lv[0] + 40} w={150} rot={Math.sin(k * 3) * 4} seal={bq} z={7} />
      {bq > 0 && <div style={{position: 'absolute', left: 0, top: lv[3] - 150, width: 1080, display: 'flex', justifyContent: 'center', transform: `scale(${lerp(2, 1, bq)}) rotate(-6deg)`, opacity: Math.min(1, bq * 2), zIndex: 8}}><div style={{border: `9px solid ${CqG}`, borderRadius: 18, padding: '6px 28px', fontFamily: sansFont, fontWeight: 900, fontSize: 54, color: CqG, background: 'rgba(255,255,255,0.9)', letterSpacing: 4}}>APPROUVÉ</div></div>}
      <CqChip x={540} y={lv[0] + 110} w={460} at={off} l="Document officiel" c={CqN} ic="FileCheck" fs={32} fill />
    </>
  );
};

/* ═════════════ 8. Son but : une cible, trois flèches — normes précises, besoins internes, attentes des clients ═════════════ */
const CqTarget: React.FC<{cy: number; at: number; gar: number; norm: number; int: number; cli: number}> = ({cy, at, gar, norm, int, cli}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const R = 300, ccy = cy - 60;
  const A: [number, number, string, string, string, number][] = [[-150, -250, 'Normes précises', 'Scale', CqB, norm], [-260, 200, 'Besoins internes', 'Users', CqT, int], [260, 160, 'Attentes des clients', 'Heart', CqO, cli]];
  const gq = t > gar ? Math.min(1, sp(t, gar, 8, 10)) : 0;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        {[1, 0.75, 0.5, 0.25].map((f, i) => <circle key={i} cx={540} cy={ccy} r={R * f * gq} fill={i % 2 ? '#fff' : CqR} stroke={NBK} strokeWidth={6} />)}
        <circle cx={540} cy={ccy} r={R * 0.1 * gq} fill={CqY} stroke={NBK} strokeWidth={5} />
        {A.map(([dx, dy, , , c, a], i) => { const q = prog(t, a, a + 0.35, easeIn); if (q <= 0) return null; const tx = 540 + dx * 0.18, ty = ccy + dy * 0.18; const sx = 540 + dx * 3, sy = ccy + dy * 3; const x = lerp(sx, tx, q), y = lerp(sy, ty, q); const ang = Math.atan2(ty - sy, tx - sx); const L = 300; const wob = q >= 1 ? Math.sin((t - a - 0.35) * 40) * 6 * Math.exp(-(t - a - 0.35) * 5) : 0; return <g key={i} transform={`translate(${x} ${y}) rotate(${(ang * 180) / Math.PI + wob})`}><line x1={-L} y1={0} x2={0} y2={0} stroke={NBK} strokeWidth={12} /><line x1={-L} y1={0} x2={-4} y2={0} stroke={c} strokeWidth={6} /><path d="M 0 0 l -40 -18 l 0 36 Z" fill={NBK} /><path d={`M ${-L} 0 l -36 -26 l 24 26 l -24 26 Z`} fill={c} stroke={NBK} strokeWidth={4} /></g>; })}
      </svg>
      {A.map(([dx, dy, l, ic, c, a], i) => <CqChip key={i} x={Math.max(250, Math.min(830, 540 + dx * 1.15))} y={ccy + dy * 1.05 + (dy > 0 ? 70 : -70)} w={440} at={a + 0.3} l={l} c={c} ic={ic} fs={28} fill />)}
      <CqChip x={540} y={cy + 400} w={420} at={gar} l="Garantir" c={CqN} ic="ShieldCheck" fs={34} fill />
    </>
  );
};

/* ═════════════ 9. Donner le ton : un diapason vibre, ses ondes accordent toute l'équipe sur la même couleur ═════════════ */
const CqTone: React.FC<{cy: number; at: number; ton: number}> = ({cy, at, ton}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const hit = t > ton ? t - ton : -1;
  const vib = hit > 0 ? Math.sin(hit * 60) * 8 * Math.exp(-hit * 1.2) : 0;
  const P = Array.from({length: 10}, (_, i) => [140 + (i % 5) * 200, cy + 200 + Math.floor(i / 5) * 190]);
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        {hit > 0 && [0, 1, 2, 3].map((m) => { const r = ((hit * 380 + m * 140) % 700); return <circle key={m} cx={540} cy={cy - 180} r={r} fill="none" stroke={CqG} strokeWidth={10 * (1 - r / 700)} opacity={1 - r / 700} />; })}
        <g transform={`translate(540 ${cy - 180})`}><path d={`M ${-60 - vib} -240 L ${-60 - vib} 0 Q -60 70 0 70 Q 60 70 ${60 + vib} 0 L ${60 + vib} -240`} fill="none" stroke="#C6CDD8" strokeWidth={34} strokeLinecap="round" /><path d={`M ${-60 - vib} -240 L ${-60 - vib} 0 Q -60 70 0 70 Q 60 70 ${60 + vib} 0 L ${60 + vib} -240`} fill="none" stroke={NBK} strokeWidth={6} /><rect x={-14} y={70} width={28} height={140} rx={10} fill="#C6CDD8" stroke={NBK} strokeWidth={6} /></g>
        {P.map(([x, y], i) => { const d = Math.hypot(x - 540, y - (cy - 180)); const on = hit > 0 && hit * 380 > d; return <CqPerson key={i} x={x} y={y + (on ? Math.sin(t * 6 + i) * 4 : 0)} c={on ? CqG : ['#9AA7B8', '#B5BDC9', '#8792A3'][i % 3]} s={0.85} skin={SKINS[i % 4]} hair={i % 2 === 0} />; })}
      </svg>
      <CqChip x={540} y={cy + 440} w={460} at={ton} l="Donner le ton" c={CqG} ic="Music" fs={34} fill />
    </>
  );
};

/* ═════════════ 10. Attention, distinction : un tamis ne laisse passer que les engagements forts, écrits avec des mots simples ═════════════ */
const CqSieve: React.FC<{cy: number; at: number; warn: number; eng: number; simple: number}> = ({cy, at, warn, eng, simple}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const wq = t > warn ? Math.min(1, sp(t, warn, 9, 9)) * (1 - prog(t, warn + 2.6, warn + 3.0, easeIn)) : 0;
  const W = ['Jargon', 'Promesse floue', 'Blabla', 'Sigles obscurs', 'Engagement fort', 'Phrase à rallonge', 'Engagement fort', 'Superlatifs', 'Engagement fort'];
  const flick = t > warn && t < warn + 2.6 ? (Math.floor(t * 4) % 2) : 0;
  return (
    <>
      {wq > 0 && <div style={{position: 'absolute', left: 0, top: cy - 300, width: 1080, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, transform: `scale(${wq})`, zIndex: 8}}><div style={{width: 300, height: 260, position: 'relative'}}><svg width={300} height={260}><path d="M 150 14 L 286 246 L 14 246 Z" fill={flick ? CqY : CqO} stroke={NBK} strokeWidth={10} strokeLinejoin="round" /><rect x={138} y={86} width={24} height={100} rx={10} fill={NBK} /><circle cx={150} cy={214} r={15} fill={NBK} /></svg></div><div style={{...nb(CqO, 8), borderColor: NBK, padding: '10px 28px', fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: '#fff'}}>Distinction importante</div></div>}
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: prog(t, warn + 2.4, warn + 2.8)}}>
        <path d={`M 140 ${cy - 120} L 940 ${cy - 120} L 680 ${cy + 120} L 400 ${cy + 120} Z`} fill="#E9EDF2" stroke={NBK} strokeWidth={7} />
        {Array.from({length: 14}, (_, i) => <line key={i} x1={190 + i * 52} y1={cy - 116} x2={415 + i * 19} y2={cy + 116} stroke="#9AA7B8" strokeWidth={3} />)}
        <rect x={400} y={cy + 120} width={280} height={60} fill="#E9EDF2" stroke={NBK} strokeWidth={7} />
      </svg>
      {W.map((w, i) => { const strong = w === 'Engagement fort'; const a = warn + 2.6 + i * 0.32; const q = prog(t, a, a + 0.6, easeIn); if (q <= 0) return null; const x0 = 180 + (i % 3) * 300; const yStop = cy - 160; if (q < 1 && lerp(cy - 520, yStop, q) < 470) return null; const y = strong ? (q < 1 ? lerp(cy - 520, yStop, q) : yStop + prog(t, a + 0.6, a + 1.2, easeIn) * 420) : lerp(cy - 520, yStop, q); const xs = strong && q >= 1 ? lerp(x0, 540, prog(t, a + 0.6, a + 1.0, easeInOut)) : x0; const rej = !strong && q >= 1 ? prog(t, a + 0.6, a + 1.1, easeIn) : 0; return <div key={i} style={{position: 'absolute', left: xs - 140 + rej * (i % 2 ? 500 : -500), top: y - 34 - rej * 120, width: 280, height: 68, ...nb(strong ? CqG : '#fff', 5), borderColor: NBK, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: sansFont, fontWeight: 900, fontSize: 25, color: strong ? '#fff' : '#7A8698', transform: `rotate(${rej * (i % 2 ? 40 : -40)}deg)`, opacity: 1 - rej, zIndex: 5}}>{strong && <Ico n="ShieldCheck" size={30} c="#fff" />}{w}</div>; })}
      <CqChip x={540} y={cy + 360} w={520} at={eng} l="Des engagements forts" c={CqG} ic="ShieldCheck" fs={32} fill />
      <CqChip x={540} y={cy + 440} w={400} at={simple} l="Des mots simples" c={CqN} ic="MessageCircle" fs={30} fill />
    </>
  );
};

/* ═════════════ 11. Ce qu'on exclut d'office : CGV, blabla publicitaire, argumentaire déguisé — chacun est barré puis éjecté ═════════════ */
const CqExclude: React.FC<{cy: number; at: number; items: number[]}> = ({cy, at, items}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const D: [string, string, string][] = [['Conditions générales de vente', 'ScrollText', CqS], ['Blabla publicitaire', 'Megaphone', CqP], ['Argumentaire commercial déguisé', 'Glasses', CqV]];
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <rect x={110} y={cy - 360} width={860} height={760} rx={30} fill="none" stroke={CqR} strokeWidth={8} strokeDasharray="26 18" />
      </svg>
      {D.map(([l, ic, c], i) => { const a = items[i]; const app = t > a - 0.6 ? Math.min(1, sp(t, a - 0.6, 9, 11)) : 0; const cross = prog(t, a + 0.25, a + 0.55, easeOut); const kick = prog(t, a + 0.9, a + 1.4, easeIn); const y = cy - 250 + i * 240; return <div key={i} style={{position: 'absolute', left: 160 + kick * (i % 2 ? -900 : 900), top: y - 80, width: 760, height: 160, transform: `scale(${app}) rotate(${kick * (i % 2 ? -25 : 25)}deg)`, zIndex: 5}}><div style={{position: 'absolute', inset: 0, ...nb('#fff', 7), borderColor: NBK, boxShadow: `7px 7px 0 ${c}`, display: 'flex', alignItems: 'center', gap: 22, padding: '0 26px'}}><div style={{width: 100, height: 100, borderRadius: 20, background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}><Ico n={ic} size={64} c="#fff" /></div><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK, lineHeight: 1.1}}>{l}</span></div><svg width={760} height={160} style={{position: 'absolute', left: 0, top: 0}}><line x1={20} y1={140} x2={20 + 720 * cross} y2={140 - 120 * cross} stroke={CqR} strokeWidth={14} strokeLinecap="round" /><line x1={20} y1={20} x2={20 + 720 * cross} y2={20 + 120 * cross} stroke={CqR} strokeWidth={14} strokeLinecap="round" /></svg></div>; })}
      <CqChip x={540} y={cy - 440} w={460} at={at + 0.3} l="Exclu d'office" c={CqR} ic="Ban" fs={32} fill />
    </>
  );
};

/* ═════════════ 12. Une déclaration de principe : le parchemin se déroule, le cadre de confiance se construit autour de la poignée de main, la transaction forcée est barrée ═════════════ */
const CqPrinciple: React.FC<{cy: number; at: number; decl: number; frame: number; force: number}> = ({cy, at, decl, frame, force}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const un = prog(t, decl - 0.3, decl + 0.7, easeOut);
  const fq = prog(t, frame, frame + 0.9, easeInOut);
  const out = prog(t, frame - 0.6, frame - 0.1, easeIn);
  const xq = t > force ? Math.min(1, sp(t, force, 9, 10)) : 0;
  const fy = cy - 120;
  return (
    <>
      <div style={{position: 'absolute', left: 160, top: cy - 340, width: 760, height: 120 + 480 * un, ...nb('#FFF6DD', 8), borderColor: NBK, overflow: 'hidden', opacity: 1 - out, transform: `translateY(${-out * 200}px)`, zIndex: 4}}><div style={{padding: '30px 40px', fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: CqN, textAlign: 'center', lineHeight: 1.1}}>DÉCLARATION<br />DE PRINCIPE</div>{[0, 1, 2, 3, 4].map((m) => <div key={m} style={{margin: '24px 60px 0', height: 14, borderRadius: 7, background: '#D9CDA8'}} />)}<div style={{position: 'absolute', right: 40, bottom: 30, width: 120, height: 120, borderRadius: 60, background: CqR, border: `6px solid ${NBK}`, transform: `scale(${prog(t, decl + 0.6, decl + 0.9, easeOut)})`}} /></div>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: prog(t, frame - 0.3, frame)}}>
        {[[200, fy - 260, 880, fy - 260], [880, fy - 260, 880, fy + 260], [880, fy + 260, 200, fy + 260], [200, fy + 260, 200, fy - 260]].map(([x1, y1, x2, y2], i) => { const q = cl(fq * 4 - i); return <line key={i} x1={x1} y1={y1} x2={lerp(x1, x2, q)} y2={lerp(y1, y2, q)} stroke={CqG} strokeWidth={26} strokeLinecap="round" />; })}
        <g transform={`translate(540 ${fy}) scale(${prog(t, frame + 0.2, frame + 0.8, easeOut)})`}><path d="M -230 30 L -90 -40 L 10 -10 L 90 -60 L 230 20 L 150 90 L 40 30 L -60 100 Z" fill="#E9C9A8" stroke={NBK} strokeWidth={7} strokeLinejoin="round" /><path d="M -230 30 l -40 -60 l 60 -40 l 40 70 Z" fill={CqN} stroke={NBK} strokeWidth={6} /><path d="M 230 20 l 40 -60 l -60 -40 l -40 70 Z" fill={CqB} stroke={NBK} strokeWidth={6} /></g>
      </svg>
      <div style={{position: 'absolute', left: 300, top: cy + 230, width: 480, height: 170, zIndex: 5, opacity: prog(t, force - 0.4, force), transform: `scale(${0.9 + 0.1 * prog(t, force - 0.4, force)})`}}><div style={{position: 'absolute', inset: 0, ...nb('#fff', 6), borderColor: NBK, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: '#7A8698'}}><Ico n="CreditCard" size={60} c={CqS} />Forcer une transaction</div>{xq > 0 && <svg width={480} height={170} style={{position: 'absolute', left: 0, top: 0}}><line x1={10} y1={160} x2={10 + 460 * xq} y2={160 - 150 * xq} stroke={CqR} strokeWidth={14} strokeLinecap="round" /></svg>}</div>
      <CqChip x={540} y={cy + 150} w={520} at={frame + 0.6} l="Un cadre de confiance" c={CqG} ic="Handshake" fs={32} fill />
    </>
  );
};

/* ═════════════ 13. Libérer la valeur : la porte du coffre tourne, s'ouvre et laisse jaillir la lumière ═════════════ */
const CqVault: React.FC<{cy: number; at: number; val: number}> = ({cy, at, val}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const spin = prog(t, at + 0.3, val - 0.3, easeInOut) * 540;
  const op = prog(t, val - 0.3, val + 0.6, easeOut);
  const lq = prog(t, val, val + 1.0, easeOut);
  const vy = cy - 10;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <rect x={170} y={vy - 360} width={740} height={720} rx={40} fill="#5B6577" stroke={NBK} strokeWidth={8} />
        <circle cx={540} cy={vy} r={318} fill="#1B2330" stroke={NBK} strokeWidth={8} />
        <defs><clipPath id="cqvc"><rect x={0} y={448} width={1080} height={940} /></clipPath></defs>
        {lq > 0 && <g clipPath="url(#cqvc)">{Array.from({length: 16}, (_, i) => { const a = (i / 16) * Math.PI * 2 + k * 0.3; const L = 340 + lq * 500; return <path key={i} d={`M 540 ${vy} L ${540 + Math.cos(a - 0.06) * L} ${vy + Math.sin(a - 0.06) * L} L ${540 + Math.cos(a + 0.06) * L} ${vy + Math.sin(a + 0.06) * L} Z`} fill={CqY} opacity={0.35 * lq} />; })}</g>}
        {lq > 0 && <circle cx={540} cy={vy} r={120 + lq * 80} fill={CqY} opacity={0.9} />}
        <g transform={`translate(540 ${vy}) translate(${-op * 300} 0) scale(${(1 - op * 0.25) * 0.96} 0.96)`}>
          <circle r={320} fill="#9AA5B4" stroke={NBK} strokeWidth={8} />
          <circle r={250} fill="#B5BFCC" stroke={NBK} strokeWidth={6} />
          {Array.from({length: 12}, (_, i) => { const a = (i / 12) * Math.PI * 2; return <circle key={i} cx={Math.cos(a) * 285} cy={Math.sin(a) * 285} r={14} fill="#7C8796" stroke={NBK} strokeWidth={4} />; })}
          <g transform={`rotate(${spin})`}>{[0, 60, 120].map((r) => <rect key={r} x={-12} y={-190} width={24} height={380} rx={12} fill="#E3E7ED" stroke={NBK} strokeWidth={5} transform={`rotate(${r})`} />)}<circle r={70} fill="#E3E7ED" stroke={NBK} strokeWidth={6} />{Array.from({length: 24}, (_, i) => <line key={i} x1={0} y1={-62} x2={0} y2={-48} stroke={NBK} strokeWidth={3} transform={`rotate(${i * 15})`} />)}</g>
        </g>
      </svg>
      {lq > 0 && <div style={{position: 'absolute', left: 0, top: vy - 60, width: 1080, display: 'flex', justifyContent: 'center', transform: `scale(${Math.min(1, sp(t, val + 0.2, 8, 9))})`, zIndex: 6}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 96, color: CqN, letterSpacing: 4, textShadow: '0 0 30px #fff'}}>VALEUR</div></div>}
      <CqChip x={540} y={cy + 400} w={460} at={val} l="Libérer la valeur" c={CqY} ic="KeyRound" fs={34} fill />
    </>
  );
};

/* ═════════════ 14. « Encore de la paperasse ! » : avalanche de feuilles, puis tout se fige — on se pose deux minutes ═════════════ */
const CqPaperwork: React.FC<{cy: number; at: number; oh: number; pap: number; pause: number; two: number}> = ({cy, at, oh, pap, pause, two}) => {
  const t = useT();
  const frz = Math.min(t, pause);
  const N = 26;
  const pq = t > pause ? Math.min(1, sp(t, pause, 9, 10)) : 0;
  const tq = t > two ? Math.min(1, sp(t, two, 9, 10)) : 0;
  const ohq = t > oh ? Math.min(1, sp(t, oh, 9, 10)) : 0;
  return (
    <>
      <div style={{position: 'absolute', left: 0, top: 440, width: 1080, height: 960, overflow: 'hidden', filter: t > pause ? `grayscale(${pq * 0.7}) blur(${pq * 2}px)` : undefined}}>
        {Array.from({length: N}, (_, i) => { const a = at + 0.1 + i * 0.09; const ft = Math.max(0, frz - a); const land = cy + 420 - 440 - Math.floor(i / 6) * 40 - (i % 3) * 8; const y = Math.min(land, -200 + ft * ft * 900 + ft * 300); const x = 120 + ((i * 137) % 840) + Math.sin(ft * 4 + i) * 40 * (y < land ? 1 : 0); const r = (y < land ? Math.sin(ft * 5 + i) * 40 : (i % 2 ? 8 : -8)); return <div key={i} style={{position: 'absolute', left: x - 70, top: y - 90, width: 140, height: 180, transform: `rotate(${r}deg)`, ...nb('#fff', 4), borderColor: NBK}}>{[0, 1, 2, 3].map((m) => <div key={m} style={{margin: '18px 16px 0', height: 8, borderRadius: 4, background: '#C9D2DF'}} />)}</div>; })}
      </div>
      {ohq > 0 && <div style={{position: 'absolute', left: 140, top: cy - 420, width: 800, transform: `scale(${ohq}) rotate(-3deg)`, transformOrigin: '20% 100%', zIndex: 7, opacity: 1 - pq * 0.7}}><div style={{...nb('#fff', 8), borderColor: NBK, padding: '20px 30px', fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: INK, textAlign: 'center'}}>« Oh, c'est encore de la <span style={{color: CqR}}>paperasse</span> ! »</div></div>}
      {pq > 0 && <div style={{position: 'absolute', left: 0, top: cy - 140, width: 1080, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26, transform: `scale(${pq})`, zIndex: 8}}><div style={{width: 230, height: 230, borderRadius: 115, background: CqN, border: `8px solid ${NBK}`, boxShadow: `8px 8px 0 ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30}}><div style={{width: 40, height: 110, borderRadius: 10, background: '#fff'}} /><div style={{width: 40, height: 110, borderRadius: 10, background: '#fff'}} /></div>{tq > 0 && <div style={{...nb(CqY, 8), borderColor: NBK, padding: '10px 30px', fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: NBK, transform: `scale(${tq})`}}>Posons-nous 2 minutes</div>}</div>}
      <CqChip x={540} y={cy + 440} w={420} at={pap} l="La paperasse ?" c={CqR} ic="Files" fs={32} fill out={pause + 0.1} />
    </>
  );
};

/* ═════════════ 15. Les entreprises qui cartonnent : la course des tours, la gagnante porte ses règles, puis le moteur stratégique s'ouvre ═════════════ */
const CqWinners: React.FC<{cy: number; at: number; cart: number; rules: number; serv: number; mot: number}> = ({cy, at, cart, rules, serv, mot}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const H = [0.45, 0.6, 1.0, 0.52];
  const gq = prog(t, at + 0.2, cart + 0.6, easeOut);
  const mq = prog(t, mot - 0.3, mot + 0.4, easeInOut);
  const G = cy + 300;
  const rq = t > rules ? Math.min(1, sp(t, rules, 9, 10)) : 0;
  const spin = t > mot ? (t - mot) * 220 : 0;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at) * (1 - mq)}}>
        <line x1={80} y1={G} x2={1000} y2={G} stroke={NBK} strokeWidth={8} />
        {H.map((h, i) => { const x = 140 + i * 210, hh = 560 * h * gq; const win = i === 2; return <g key={i}><rect x={x} y={G - hh} width={170} height={hh} rx={10} fill={win ? CqG : '#AFC4E2'} stroke={NBK} strokeWidth={6} />{Array.from({length: Math.floor(hh / 70)}, (_, r) => <rect key={r} x={x + 22} y={G - hh + 24 + r * 70} width={126} height={36} rx={5} fill={win ? '#8FE0BB' : '#DDE6F2'} stroke={NBK} strokeWidth={3} />)}</g>; })}
        {t > cart && <g transform={`translate(565 ${G - 560 * gq - 70}) scale(${Math.min(1, sp(t, cart, 9, 10))})`}><path d="M -50 -40 L 50 -40 L 40 20 Q 0 50 -40 20 Z" fill={CqY} stroke={NBK} strokeWidth={6} /><rect x={-14} y={30} width={28} height={30} fill={CqY} stroke={NBK} strokeWidth={5} /><rect x={-40} y={58} width={80} height={16} rx={5} fill={NBK} /></g>}
      </svg>
      {rq > 0 && mq < 1 && <div style={{position: 'absolute', left: 565 - 220, top: G - 560 * gq - 260, width: 440, display: 'flex', justifyContent: 'center', transform: `scale(${rq})`, zIndex: 6, opacity: 1 - mq}}><div style={{...nb('#fff', 6), borderColor: NBK, boxShadow: `6px 6px 0 ${CqG}`, padding: '8px 18px', display: 'flex', alignItems: 'center', gap: 10, fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK}}><Ico n="BookOpen" size={36} c={CqG} />S'imposer ces règles</div></div>}
      {mq > 0 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: mq}}>
        <rect x={190} y={cy - 280} width={700} height={500} rx={40} fill="#3A424D" stroke={NBK} strokeWidth={8} />
        {[-1, 1].map((s) => <rect key={s} x={540 + s * 170 - 60} y={cy - 360 + Math.sin(spin / 30 + (s > 0 ? Math.PI : 0)) * 40} width={120} height={140} rx={14} fill="#9AA5B4" stroke={NBK} strokeWidth={6} />)}
        <g transform={`translate(540 ${cy - 30}) rotate(${spin})`}><path d={Array.from({length: 12}, (_, i) => { const a = (i / 12) * Math.PI * 2; return `${i ? 'L' : 'M'} ${Math.cos(a) * 150} ${Math.sin(a) * 150} L ${Math.cos(a + 0.13) * 150} ${Math.sin(a + 0.13) * 150} L ${Math.cos(a + 0.2) * 120} ${Math.sin(a + 0.2) * 120} L ${Math.cos(a + 0.46) * 120} ${Math.sin(a + 0.46) * 120}`; }).join(' ') + ' Z'} fill={CqO} stroke={NBK} strokeWidth={6} /><circle r={50} fill="#3A424D" stroke={NBK} strokeWidth={6} /></g>
        <circle cx={540} cy={cy - 30} r={36} fill={CqY} />
      </svg>}
      <CqChip x={540} y={cy - 440} w={560} at={cart} l="Les entreprises qui cartonnent" c={CqG} ic="Trophy" fs={28} fill out={mot - 0.2} />
      <CqChip x={540} y={G + 40} w={480} at={serv} l="Leur niveau de service" c={CqN} ic="Gauge" fs={30} fill out={mot - 0.2} />
      <CqChip x={540} y={cy + 300} w={480} at={mot} l="Le moteur stratégique" c={CqO} ic="Cog" fs={32} fill />
    </>
  );
};

/* ═════════════ 16. Pas un contrat juridique mais l'expression d'un contrat : l'ampoule s'allume, le contrat se barre puis se replie en bulle de parole ═════════════ */
const CqContract: React.FC<{cy: number; at: number; idee: number; ctr: number; cross: number; expr: number; power: number}> = ({cy, at, idee, ctr, cross, expr, power}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const iq = t > idee ? Math.min(1, sp(t, idee, 9, 10)) : 0;
  const bulb = prog(t, idee, idee + 0.4) * (1 - prog(t, ctr - 0.4, ctr, easeIn));
  const cq = t > ctr ? Math.min(1, sp(t, ctr, 9, 11)) : 0;
  const xq = prog(t, cross, cross + 0.4, easeOut);
  const eq = prog(t, expr, expr + 0.8, easeInOut);
  const pw = t > power ? t - power : -1;
  return (
    <>
      {bulb > 0 && <div style={{position: 'absolute', left: 0, top: cy - 330, width: 1080, display: 'flex', justifyContent: 'center', transform: `scale(${iq})`, opacity: bulb, zIndex: 6}}><div style={{width: 360, height: 360, borderRadius: 180, background: `radial-gradient(circle, ${CqY}, rgba(246,199,68,0) 70%)`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="Lightbulb" size={240} c={NBK} /></div></div>}
      {cq > 0 && <div style={{position: 'absolute', left: 540 - 260, top: cy - 400, width: 520, height: 640, transform: `scale(${cq * (1 - eq * 0.35)}) translateY(${eq * -60}px)`, zIndex: 5}}>
        <div style={{position: 'absolute', inset: 0, borderRadius: lerp(18, 260, eq), ...nb(eq > 0.5 ? CqB : '#fff', 8), borderColor: NBK, overflow: 'hidden', transition: 'none'}}>
          <div style={{opacity: 1 - eq * 2, padding: '30px 36px'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK, textAlign: 'center'}}>CONTRAT</div>{['Article 1', 'Article 2', 'Article 3', 'Clause pénale'].map((a, m) => <div key={m} style={{marginTop: 26}}><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: CqS}}>{a}</div>{[0, 1].map((n) => <div key={n} style={{marginTop: 8, height: 10, borderRadius: 5, background: '#C9D2DF', width: n ? '70%' : '100%'}} />)}</div>)}<div style={{marginTop: 26, display: 'flex', justifyContent: 'flex-end'}}><Ico n="Gavel" size={60} c={CqS} /></div></div>
          {eq > 0.5 && <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: '#fff', lineHeight: 1.15, opacity: (eq - 0.5) * 2}}>L'EXPRESSION<br />D'UN CONTRAT</div>}
        </div>
        {eq > 0.6 && <div style={{position: 'absolute', left: 120, bottom: -70, width: 0, height: 0, borderLeft: '50px solid transparent', borderRight: '20px solid transparent', borderTop: `90px solid ${NBK}`}} />}
        {xq > 0 && eq < 0.4 && <svg width={520} height={640} style={{position: 'absolute', left: 0, top: 0, opacity: 1 - eq * 2.5}}><line x1={20} y1={620} x2={20 + 480 * xq} y2={620 - 600 * xq} stroke={CqR} strokeWidth={18} strokeLinecap="round" /></svg>}
      </div>}
      {pw > 0 && pw < 0.9 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 7}}>{Array.from({length: 14}, (_, i) => { const a = (i / 14) * Math.PI * 2; const r1 = 330 + pw * 300, r2 = 380 + pw * 420; return <line key={i} x1={540 + Math.cos(a) * r1} y1={cy - 80 + Math.sin(a) * r1} x2={540 + Math.cos(a) * r2} y2={cy - 80 + Math.sin(a) * r2} stroke={CqY} strokeWidth={14 * (1 - pw)} strokeLinecap="round" />; })}</svg>}
      <CqChip x={540} y={cy + 300} w={460} at={cross} l="Pas au sens juridique" c={CqR} ic="Gavel" fs={30} fill out={expr + 0.3} />
      <CqChip x={540} y={cy + 400} w={520} at={power} l="Extrêmement puissant" c={CqY} ic="Zap" fs={32} fill />
    </>
  );
};

/* ═════════════ 17. Une promesse officielle : la déclaration publique au mégaphone, la carte d'engagement se signe en direct ═════════════ */
const CqPromise: React.FC<{cy: number; at: number; pub: number; prom: number}> = ({cy, at, pub, prom}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const pq = t > pub ? Math.min(1, sp(t, pub, 9, 10)) : 0;
  const sig = prog(t, prom, prom + 0.8, easeInOut);
  const cq = t > prom - 0.6 ? Math.min(1, sp(t, prom - 0.6, 9, 11)) : 0;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        {pq > 0 && [0, 1, 2].map((m) => { const r = ((k * 300 + m * 120) % 360); return <path key={m} d={`M ${300 + r * 0.9} ${cy - 330 - r * 0.5} Q ${330 + r} ${cy - 220} ${300 + r * 0.9} ${cy - 110 + r * 0.5}`} fill="none" stroke={CqO} strokeWidth={10 * (1 - r / 360)} opacity={1 - r / 360} />; })}
        <g transform={`translate(200 ${cy - 220}) rotate(-8) scale(${0.6 + 0.4 * pq})`}><path d="M -60 -40 L 60 -110 L 60 110 L -60 40 Z" fill={CqO} stroke={NBK} strokeWidth={7} strokeLinejoin="round" /><rect x={-110} y={-40} width={56} height={80} rx={10} fill={CqN} stroke={NBK} strokeWidth={6} /><rect x={-80} y={40} width={30} height={70} rx={8} fill={CqN} stroke={NBK} strokeWidth={6} /></g>
        {Array.from({length: 12}, (_, i) => <CqPerson key={i} x={130 + (i % 6) * 165} y={cy + 330 + Math.floor(i / 6) * 120 + Math.sin(k * 4 + i) * 3} c={[CqB, CqT, CqO, CqG, CqV, CqP][i % 6]} s={0.7} skin={SKINS[i % 4]} hair={i % 3 === 0} />)}
      </svg>
      {cq > 0 && <div style={{position: 'absolute', left: 440, top: cy - 330, width: 560, height: 420, transform: `scale(${cq}) rotate(3deg)`, ...nb('#fff', 8), borderColor: NBK, boxShadow: `8px 8px 0 ${CqG}`, zIndex: 5, padding: '26px 30px', boxSizing: 'border-box'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: CqN, lineHeight: 1.1}}>PROMESSE<br />OFFICIELLE</div>{[0, 1, 2].map((m) => <div key={m} style={{marginTop: 18, height: 12, borderRadius: 6, background: '#C9D2DF', width: m === 2 ? '60%' : '100%'}} />)}<svg width={480} height={110} style={{marginTop: 14}}><path d="M 20 80 C 60 10, 90 110, 130 50 S 190 20, 210 70 S 280 90, 300 40 S 380 30, 440 70" fill="none" stroke={CqB} strokeWidth={7} strokeLinecap="round" pathLength={1} strokeDasharray={`${sig} 1`} /></svg></div>}
      <CqChip x={540} y={cy + 140} w={520} at={pub} l="Une déclaration publique" c={CqO} ic="Megaphone" fs={30} fill />
    </>
  );
};

/* ═════════════ 18. La transparence totale : un immeuble de verre où l'on voit travailler, les concurrents opaques s'effacent, la chaîne de confiance relie le public ═════════════ */
const CqGlass: React.FC<{cy: number; at: number; tr: number; dem: number; conc: number; lien: number; imb: number}> = ({cy, at, tr, dem, conc, lien, imb}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const G = cy + 150;
  const gq = prog(t, tr - 0.2, tr + 0.8, easeOut);
  const rise = prog(t, dem, dem + 0.8, easeOut) * 70;
  const fade = prog(t, conc, conc + 0.6);
  const lq = prog(t, lien, lien + 1.0, easeInOut);
  const iq = t > imb ? Math.min(1, sp(t, imb, 9, 10)) : 0;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        {[[110, 160, 340], [290, 140, 270], [800, 150, 310], [950, 120, 240]].map(([x, w, h], i) => <rect key={i} x={x - w / 2} y={G - h} width={w} height={h} rx={8} fill={hexMix('#5B6577', '#C6CDD8', fade)} stroke={NBK} strokeWidth={6} opacity={1 - fade * 0.55} />)}
        <g transform={`translate(0 ${-rise})`}>
          <rect x={410} y={G - 440} width={260} height={440} rx={10} fill={`rgba(160,215,255,${0.25 + 0.35 * (1 - gq)})`} stroke={NBK} strokeWidth={7} />
          {[0, 1, 2].map((f) => <line key={f} x1={410} y1={G - 110 * (f + 1)} x2={670} y2={G - 110 * (f + 1)} stroke={NBK} strokeWidth={5} />)}
          {gq > 0 && [0, 1, 2, 3].flatMap((f) => [0, 1].map((m) => <CqPerson key={`${f}${m}`} x={470 + m * 130 + Math.sin(k * 2 + f + m) * 8} y={G - 110 * f - 35} c={[CqG, CqB, CqO, CqT][(f + m) % 4]} s={0.5 * gq} skin={SKINS[(f + m) % 4]} />))}
          <path d={`M 410 ${G - 440} L 470 ${G - 440} L 410 ${G - 330} Z`} fill="rgba(255,255,255,0.55)" />
          {rise > 0 && <rect x={404} y={G - 446} width={272} height={452} rx={14} fill="none" stroke={CqY} strokeWidth={8 + Math.sin(k * 5) * 3} />}
        </g>
        <line x1={60} y1={G} x2={1020} y2={G} stroke={NBK} strokeWidth={8} />
        {lq > 0 && Array.from({length: 7}, (_, i) => { const x = 160 + i * 127; const ok = lq * 7 > i; return ok ? <g key={i}><ellipse cx={lerp(540, x, cl(lq * 7 - i))} cy={G + 100} rx={36} ry={22} fill="none" stroke={CqG} strokeWidth={10} /><CqPerson x={x} y={G + 215} c={[CqB, CqT, CqO, CqG, CqV, CqP, CqN][i]} s={0.7} skin={SKINS[i % 4]} hair={i % 2 === 0} /></g> : null; })}
        {lq > 0 && <path d={`M 540 ${G - rise + 10} L 540 ${G + 100}`} stroke={CqG} strokeWidth={10} strokeDasharray="20 14" />}
      </svg>
      {iq > 0 && <div style={{position: 'absolute', left: 540 - 80, top: G - 300 - rise, width: 160, height: 160, transform: `scale(${iq})`, zIndex: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 80, background: CqG, border: `7px solid ${NBK}`}}><Ico n="ShieldCheck" size={100} c="#fff" /></div>}
      <CqChip x={540} y={cy - 440} w={480} at={tr} l="Transparence totale" c={CqT} ic="Eye" fs={32} fill out={imb} />
      <CqChip x={870} y={G + 20} w={340} at={conc} l="Les concurrents" c={CqS} fs={26} fill />
      <CqChip x={540} y={G + 290} w={540} at={imb} l="Une confiance imbattable" c={CqG} ic="Link" fs={30} fill />
    </>
  );
};

/* ═════════════ 19. Interne ou externe : la pièce d'or se dédouble comme une cellule ═════════════ */
const CqSplit: React.FC<{cy: number; at: number; int: number; ext: number; ded: number}> = ({cy, at, int, ext, ded}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const sq = prog(t, ded - 0.5, ded + 0.5, easeInOut);
  const dx = sq * 230;
  const neck = 1 - Math.sin(sq * Math.PI) * 0.35;
  const app = t > at + 0.1 ? Math.min(1, sp(t, at + 0.1, 8, 11)) : 0;
  const coin = (x: number, l: string, c: string, ic: string, on: number) => <g transform={`translate(${x} ${cy - 40}) scale(${app})`}><ellipse rx={220 * neck} ry={220} fill={CqY} stroke={NBK} strokeWidth={8} /><ellipse rx={180 * neck} ry={180} fill="none" stroke="#C9971F" strokeWidth={6} />{on > 0 && <g opacity={on}><circle r={90} fill={c} stroke={NBK} strokeWidth={6} /></g>}</g>;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        {sq > 0.05 && <path d={`M ${540 - dx} ${cy - 120} Q 540 ${cy - 40 + sq * 40} ${540 + dx} ${cy - 120} L ${540 + dx} ${cy + 40} Q 540 ${cy - 40 - sq * 40} ${540 - dx} ${cy + 40} Z`} fill={CqY} opacity={1 - sq} />}
        {coin(540 - dx, 'INTERNE', CqT, 'Building2', prog(t, int, int + 0.4) * (sq > 0.5 ? 1 : 0))}
        {coin(540 + dx, 'EXTERNE', CqO, 'Globe', prog(t, ext, ext + 0.4) * (sq > 0.5 ? 1 : 0))}
      </svg>
      {sq > 0.5 && [[540 - dx, 'Building2', CqT], [540 + dx, 'Globe', CqO]].map(([x, ic, c], i) => <div key={i} style={{position: 'absolute', left: (x as number) - 60, top: cy - 100, width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, opacity: prog(t, ded + 0.1, ded + 0.4)}}><Ico n={ic as string} size={84} c="#fff" /></div>)}
      <CqChip x={300} y={cy + 230} w={360} at={int} l="En interne" c={CqT} ic="Building2" fs={32} fill />
      <CqChip x={780} y={cy + 230} w={360} at={ext} l="En externe" c={CqO} ic="Globe" fs={32} fill />
      <CqChip x={540} y={cy - 440} w={540} at={ded} l="Les bénéfices se dédoublent" c={CqY} ic="Copy" fs={30} fill />
    </>
  );
};

/* ═════════════ 20. En interne : trois cartes vivantes — retours d'audit (loupe), conseils sur mesure (mètre ruban), réglementations à jour (flèches de mise à jour) ═════════════ */
const CqInternal: React.FC<{cy: number; at: number; audit: number; cons: number; regl: number}> = ({cy, at, audit, cons, regl}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const C: [string, string, string, number][] = [["Retours d'audit externes", 'ClipboardCheck', CqB, audit], ['Conseils ultra personnalisés', 'Ruler', CqV, cons], ['Réglementations à jour', 'RefreshCw', CqG, regl]];
  return (
    <>
      <div style={{position: 'absolute', left: 90, top: cy - 420, width: 900, height: 230, ...nb('#000', 8), borderColor: NBK, overflow: 'hidden', opacity: pop(t, at), zIndex: 3}}><Img src={staticFile(IMG.audit)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.05 + k * 0.01})`}} /><div style={{position: 'absolute', left: 20, bottom: 16, ...nb(CqT, 5), borderColor: NBK, padding: '4px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff'}}>Les équipes dirigeantes</div></div>
      {C.map(([l, ic, c, a], i) => { const q = t > a ? Math.min(1, sp(t, a, 9, 11)) : 0; const y = cy - 140 + i * 190; const on = q > 0.5; return <div key={i} style={{position: 'absolute', left: 90, top: y, width: 900, height: 160, transform: `translateX(${(1 - q) * 1100}px)`, zIndex: 5}}><div style={{position: 'absolute', inset: 0, ...nb('#fff', 7), borderColor: NBK, boxShadow: `7px 7px 0 ${c}`, display: 'flex', alignItems: 'center', gap: 24, padding: '0 26px'}}><div style={{width: 110, height: 110, borderRadius: 22, background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${i === 2 && on ? (t - a) * 200 : 0}deg)`}}><Ico n={ic} size={72} c="#fff" /></div><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK, lineHeight: 1.1, flex: 1}}>{l}</span>{on && <div style={{width: 64, height: 64, borderRadius: 32, background: CqG, border: `5px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1, sp(t, a + 0.35, 9, 9))})`}}><Ico n="Check" size={40} c="#fff" /></div>}</div></div>; })}
      <CqChip x={540} y={cy + 410} w={360} at={at + 0.4} l="En interne" c={CqT} ic="Building2" fs={32} fill />
    </>
  );
};

/* ═════════════ 21. Détourner l'attention du prix : le regard du client quitte l'étiquette de prix, le projecteur glisse vers le sceau qualité ═════════════ */
const CqPriceShift: React.FC<{cy: number; at: number; det: number; prix: number; qual: number}> = ({cy, at, det, prix, qual}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const sw = prog(t, det, qual, easeInOut);
  const tx = lerp(250, 830, sw), ty = cy - 120;
  const pq = t > prix ? 1 : 0;
  const qq = t > qual ? Math.min(1, sp(t, qual, 8, 9)) : 0;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <defs><radialGradient id="cqspot"><stop offset="0%" stopColor="#FFF4C2" stopOpacity={0.95} /><stop offset="100%" stopColor="#FFF4C2" stopOpacity={0} /></radialGradient></defs>
        <rect x={0} y={440} width={1080} height={945} fill="rgba(11,46,107,0.12)" />
        <path d={`M 540 ${cy + 360} L ${tx - 170} ${ty + 40} L ${tx + 170} ${ty + 40} Z`} fill="url(#cqspot)" opacity={0.75} />
        <ellipse cx={tx} cy={ty + 40} rx={210} ry={70} fill="url(#cqspot)" />
        <g transform={`translate(250 ${cy - 120}) rotate(-12) scale(${1 - sw * 0.3})`} opacity={1 - sw * 0.6}><path d="M -120 -70 L 90 -70 L 150 0 L 90 70 L -120 70 Z" fill="#fff" stroke={NBK} strokeWidth={7} strokeLinejoin="round" /><circle cx={95} cy={0} r={14} fill="none" stroke={NBK} strokeWidth={5} /><text x={-20} y={22} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={66} fill={CqR}>€</text></g>
        <g transform={`translate(830 ${cy - 120}) scale(${0.6 + 0.4 * qq}) rotate(${(1 - qq) * 30})`}><circle r={110} fill={CqY} stroke={NBK} strokeWidth={8} /><path d="M -60 90 L -90 200 L -30 170 L 0 220 L 20 110 Z" fill={CqR} stroke={NBK} strokeWidth={6} /><path d="M 60 90 L 90 200 L 30 170 L 0 220 L -20 110 Z" fill={CqB} stroke={NBK} strokeWidth={6} /><circle r={110} fill={CqY} stroke={NBK} strokeWidth={8} /><path d="M 0 -60 L 18 -18 L 62 -16 L 28 12 L 40 56 L 0 32 L -40 56 L -28 12 L -62 -16 L -18 -18 Z" fill="#fff" stroke={NBK} strokeWidth={5} /></g>
        <CqPerson x={540} y={cy + 360} c={CqB} s={1.3} skin={SKINS[1]} />
        <line x1={540} y1={cy + 270} x2={tx} y2={ty} stroke={CqN} strokeWidth={5} strokeDasharray="14 12" strokeDashoffset={-k * 50} />
      </svg>
      {pq > 0 && <CqChip x={250} y={cy + 20} w={340} at={prix} l="Le simple prix" c={CqS} ic="Tag" fs={28} fill />}
      <CqChip x={830} y={cy + 130} w={340} at={qual} l="La qualité" c={CqG} ic="Award" fs={32} fill />
      <CqChip x={540} y={cy - 440} w={480} at={det} l="Détourner l'attention" c={CqN} ic="Eye" fs={30} fill />
    </>
  );
};

/* ═════════════ 22. En pleine lumière : le professionnalisme sous le projecteur, la confiance se maçonne brique par brique ═════════════ */
const CqSpotlight: React.FC<{cy: number; at: number; lum: number; pro: number; solid: number; conf: number}> = ({cy, at, lum, pro, solid, conf}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const lq = prog(t, lum - 0.3, lum + 0.4);
  const bq = prog(t, solid, conf + 0.6, easeOut);
  return (
    <>
      <div style={{position: 'absolute', left: 190, top: cy - 400, width: 700, height: 560, ...nb('#000', 8), borderColor: NBK, overflow: 'hidden', zIndex: 3, opacity: pop(t, at)}}>
        <Img src={staticFile(IMG.pro)} style={{width: '100%', height: '100%', objectFit: 'cover', filter: `brightness(${0.35 + lq * 0.75}) saturate(${0.4 + lq * 0.7})`, transform: `scale(${1.08 - lq * 0.05})`}} />
        <div style={{position: 'absolute', inset: 0, background: `radial-gradient(ellipse 45% 60% at 50% 40%, rgba(255,240,190,${0.35 * lq}), rgba(0,0,0,${0.55 * (1 - lq) + 0.25}) 80%)`}} />
      </div>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 4}}>
        {Array.from({length: 14}, (_, i) => { const row = Math.floor(i / 5), col = i % 5; const w = 170; const x = 120 + col * (w + 8) + (row % 2 ? w / 2 : 0); const y = cy + 360 - row * 80; const q = cl(bq * 14 - i); if (x + w > 1000) return null; return <g key={i} opacity={q > 0 ? 1 : 0} transform={`translate(0 ${(1 - q) * -60})`}><rect x={x} y={y} width={w} height={70} rx={8} fill={CqO} stroke={NBK} strokeWidth={5} /></g>; })}
      </svg>
      <CqChip x={540} y={cy + 180} w={560} at={pro} l="Le professionnalisme" c={CqY} ic="Sparkles" fs={32} fill />
      <CqChip x={540} y={cy - 440} w={460} at={conf} l="Une confiance solide" c={CqO} ic="BrickWall" fs={30} fill />
    </>
  );
};

/* ═════════════ 23. Rendre l'invisible concret : les principes fantômes se matérialisent, puis s'affichent sur Internet, dans les médias, sur l'emballage ═════════════ */
const CqReveal: React.FC<{cy: number; at: number; inv: number; conc: number; web: number; med: number; pack: number}> = ({cy, at, inv, conc, web, med, pack}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const cq = prog(t, conc, conc + 0.6, easeOut);
  const move = prog(t, web - 0.6, web, easeInOut);
  const P = ['Écoute', 'Rigueur', 'Respect', 'Sécurité'];
  const scr = (x: number, a: number, kind: number, l: string, ic: string) => { const q = t > a ? Math.min(1, sp(t, a, 9, 11)) : 0; return <div style={{position: 'absolute', left: x - 140, top: cy + 60, width: 280, height: 300, transform: `scale(${q})`, zIndex: 5}}><div style={{position: 'absolute', inset: 0, ...nb(kind === 2 ? '#C79A5B' : '#fff', 7), borderColor: NBK, overflow: 'hidden'}}>{kind === 0 && <div style={{height: 36, background: '#DDE2EA', borderBottom: `4px solid ${NBK}`, display: 'flex', gap: 8, alignItems: 'center', paddingLeft: 12}}>{[CqR, CqY, CqG].map((c) => <div key={c} style={{width: 14, height: 14, borderRadius: 7, background: c}} />)}</div>}{kind === 1 && <div style={{height: 36, background: CqN}} />}<div style={{margin: '20px auto 0', width: 150}}><CqDocMini /></div></div><div style={{position: 'absolute', left: 0, bottom: -60, width: 280, display: 'flex', justifyContent: 'center'}}><div style={{...nb(CqN, 5), borderColor: NBK, padding: '4px 14px', display: 'flex', alignItems: 'center', gap: 8, fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff'}}><Ico n={ic} size={30} c="#fff" />{l}</div></div></div>; };
  return (
    <>
      <div style={{opacity: 1 - move, transform: `translateY(${-move * 120}px)`}}>
        <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
          <rect x={160} y={cy - 330} width={760} height={530} rx={24} fill="#E9EDF2" stroke={NBK} strokeWidth={7} />
          <path d={`M 140 ${cy - 330} L 540 ${cy - 430} L 940 ${cy - 330} Z`} fill={CqN} stroke={NBK} strokeWidth={7} strokeLinejoin="round" />
        </svg>
        {P.map((p, i) => { const vis = prog(t, inv - 0.3 + i * 0.1, inv + 0.2 + i * 0.1); const x = 220 + (i % 2) * 340, y = cy - 300 + Math.floor(i / 2) * 240; return <div key={i} style={{position: 'absolute', left: x, top: y, width: 300, height: 190, borderRadius: 18, border: `5px ${cq > 0.5 ? 'solid' : 'dashed'} ${cq > 0.5 ? NBK : '#9AA7B8'}`, background: cq > 0.5 ? '#fff' : 'transparent', boxShadow: cq > 0.5 ? `6px 6px 0 ${[CqG, CqB, CqO, CqT][i]}` : 'none', opacity: 0.25 + 0.75 * Math.max(cq, vis * 0.5), filter: `blur(${(1 - cq) * 3}px)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: cq > 0.5 ? INK : '#9AA7B8', zIndex: 4, transform: `scale(${1 + 0.06 * Math.sin(cq * Math.PI)})`, boxSizing: 'border-box'}}>{p}</div>; })}
        <CqChip x={540} y={cy + 230} w={540} at={inv} l="Souvent invisibles" c="#9AA7B8" ic="EyeOff" fs={30} fill out={conc} />
        <CqChip x={540} y={cy + 230} w={500} at={conc} l="Hyper concrets" c={CqG} ic="Sparkles" fs={32} fill />
      </div>
      {move > 0.5 && <>{scr(190, web, 0, 'Internet', 'Globe')}{scr(540, med, 1, 'Médias', 'Newspaper')}{scr(890, pack, 2, 'Emballages', 'Package')}</>}
      {move > 0.5 && <CqChip x={540} y={cy - 440} w={460} at={web} l="On les affiche" c={CqN} ic="Megaphone" fs={30} fill />}
    </>
  );
};
const CqDocMini: React.FC = () => <div style={{width: 150, height: 190, ...nb('#fff', 4), borderColor: NBK, overflow: 'hidden'}}><div style={{height: 34, background: CqN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 13, color: '#fff'}}>CHARTE QUALITÉ</div>{[0, 1, 2, 3, 4].map((m) => <div key={m} style={{margin: '12px 14px 0', height: 8, borderRadius: 4, background: m % 2 ? '#C9D2DF' : CqG}} />)}</div>;

/* ═════════════ 24. L'image de marque fait un bond de géant, la grande question trouve sa réponse, le levier soulève la croissance, l'excellence devient visible ═════════════ */
const CqLeap: React.FC<{cy: number; at: number; bond: number; rep: number; lev: number; vis: number}> = ({cy, at, bond, rep, lev, vis}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const jq = prog(t, bond - 0.5, bond + 0.6, easeInOut);
  const jx = lerp(200, 860, jq), jy = cy - 40 - Math.sin(jq * Math.PI) * 420;
  const rq = prog(t, rep, rep + 0.8, easeInOut);
  const lq = prog(t, lev, lev + 1.0, easeOut);
  const vq = t > vis ? Math.min(1, sp(t, vis, 8, 10)) : 0;
  const phase2 = t > rep - 0.2;
  const phase3 = t > lev - 0.2;
  return (
    <>
      {!phase2 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <path d={`M 200 ${cy + 60} Q 530 ${cy - 860} 860 ${cy + 60}`} fill="none" stroke={CqO} strokeWidth={8} strokeDasharray="20 16" pathLength={1} strokeDashoffset={0} opacity={0.6} />
        <line x1={80} y1={cy + 110} x2={1000} y2={cy + 110} stroke={NBK} strokeWidth={8} />
        {jq >= 1 && t < bond + 1.2 && Array.from({length: 8}, (_, i) => { const e = (t - bond - 0.6) / 0.6; const a = Math.PI + (i / 7) * Math.PI; return <circle key={i} cx={860 + Math.cos(a) * (60 + e * 120)} cy={cy + 100 + Math.sin(a) * (20 + e * 40)} r={14 * (1 - e)} fill="#C6CDD8" />; })}
      </svg>}
      {!phase2 && <div style={{position: 'absolute', left: jx - 130, top: jy - 130, width: 260, height: 260, transform: `rotate(${jq * 360}deg) scale(${1 + Math.sin(jq * Math.PI) * 0.25})`, zIndex: 5, ...nb(CqN, 8), borderColor: NBK, borderRadius: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><Ico n="Award" size={120} c={CqY} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff'}}>MARQUE</span></div>}
      {phase2 && !phase3 && <div style={{position: 'absolute', left: 0, top: cy - 280, width: 1080, display: 'flex', justifyContent: 'center', zIndex: 5}}><div style={{width: 380, height: 380, borderRadius: 190, background: rq > 0.5 ? CqG : CqN, border: `10px solid ${NBK}`, boxShadow: `10px 10px 0 ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotateY(${rq * 180}deg) scale(${Math.min(1, sp(t, rep - 0.2, 8, 11))})`}}><div style={{transform: rq > 0.5 ? 'rotateY(180deg)' : undefined, fontFamily: sansFont, fontWeight: 900, fontSize: 230, color: '#fff', lineHeight: 1}}>{rq > 0.5 ? '✓' : '?'}</div></div></div>}
      {phase3 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        <path d={`M 300 ${cy + 260} L 380 ${cy + 120} L 460 ${cy + 260} Z`} fill={CqS} stroke={NBK} strokeWidth={6} />
        <g transform={`rotate(${lerp(14, -16, lq)} 380 ${cy + 120})`}><rect x={80} y={cy + 104} width={760} height={32} rx={10} fill="#8A6A3A" stroke={NBK} strokeWidth={6} /><g transform={`translate(760 ${cy + 104})`}>{[0, 1, 2, 3].map((b) => <rect key={b} x={-40 + b * 30} y={-60 - b * 50 * lq} width={26} height={60 + b * 50 * lq} rx={5} fill={CqG} stroke={NBK} strokeWidth={4} />)}<path d={`M -50 ${-90 - 160 * lq} L 90 ${-200 - 160 * lq}`} stroke={CqG} strokeWidth={10} strokeLinecap="round" /><path d={`M 90 ${-200 - 160 * lq} l -40 0 l 30 30 Z`} fill={CqG} stroke={NBK} strokeWidth={4} /></g><rect x={70} y={cy + 30} width={110} height={74} rx={10} fill={CqN} stroke={NBK} strokeWidth={5} /></g>
        {vq > 0 && <g transform={`translate(540 ${cy - 250}) scale(${vq})`}><path d="M -170 0 Q 0 -120 170 0 Q 0 120 -170 0 Z" fill="#fff" stroke={NBK} strokeWidth={8} /><circle r={62} fill={CqB} stroke={NBK} strokeWidth={6} /><circle r={26} fill={NBK} /><circle cx={-18} cy={-18} r={12} fill="#fff" />{Array.from({length: 10}, (_, i) => <line key={i} x1={Math.cos((i / 10) * Math.PI * 2) * 200} y1={Math.sin((i / 10) * Math.PI * 2) * 150} x2={Math.cos((i / 10) * Math.PI * 2) * (230 + Math.sin(k * 6 + i) * 10)} y2={Math.sin((i / 10) * Math.PI * 2) * (175 + Math.sin(k * 6 + i) * 8)} stroke={CqY} strokeWidth={8} strokeLinecap="round" />)}</g>}
      </svg>}
      <CqChip x={540} y={cy + 160} w={520} at={bond} l="Un bond de géant" c={CqO} ic="Rocket" fs={32} fill out={rep - 0.2} />
      <CqChip x={540} y={cy + 160} w={460} at={rep + 0.4} l="La réponse" c={CqG} ic="CircleCheckBig" fs={32} fill out={lev - 0.2} />
      <CqChip x={540} y={cy + 330} w={560} at={lev} l="Un levier de croissance" c={CqG} ic="TrendingUp" fs={30} fill />
      <CqChip x={540} y={cy - 50} w={460} at={vis} l="L'excellence visible" c={CqY} ic="Eye" fs={30} fill />
    </>
  );
};

/* ═════════════ 25. Les mains dans le cambouis : gants, clé qui tourne, et le plan de la charte qui se trace en bleu d'architecte ═════════════ */
const CqGarage: React.FC<{cy: number; at: number; mains: number; meth: number; constr: number}> = ({cy, at, mains, meth, constr}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const gq = t > mains ? Math.min(1, sp(t, mains, 8, 10)) : 0;
  const bp = prog(t, meth, constr + 0.8, easeInOut);
  const wr = t > mains ? Math.sin((t - mains) * 5) * 35 : 0;
  return (
    <>
      <div style={{position: 'absolute', left: 170, top: cy - 380, width: 740, height: 600, borderRadius: 24, border: `8px solid ${NBK}`, background: '#1F5BA8', backgroundImage: 'linear-gradient(rgba(255,255,255,0.12) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.12) 2px, transparent 2px)', backgroundSize: '40px 40px', boxShadow: `9px 9px 0 ${NBK}`, opacity: pop(t, at), zIndex: 3}} />
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 4}}>
        {[[380, cy - 320, 700, cy - 320], [700, cy - 320, 700, cy + 150], [700, cy + 150, 380, cy + 150], [380, cy + 150, 380, cy - 320], [380, cy - 230, 700, cy - 230]].map(([x1, y1, x2, y2], i) => { const q = cl(bp * 6 - i); return <line key={i} x1={x1} y1={y1} x2={lerp(x1, x2, q)} y2={lerp(y1, y2, q)} stroke="#fff" strokeWidth={6} strokeLinecap="round" />; })}
        {[0, 1, 2, 3, 4].map((m) => { const q = cl(bp * 6 - 5 + m * 0.15); return <line key={m} x1={420} y1={cy - 170 + m * 60} x2={420 + 240 * q} y2={cy - 170 + m * 60} stroke="#BFE0FF" strokeWidth={8} strokeLinecap="round" strokeDasharray="1 14" />; })}
        {bp > 0.05 && <g transform={`translate(${380 + 320 * cl(bp * 1.2)} ${cy - 330 + 470 * cl(bp * 1.2 - 0.4)})`}><path d="M 0 0 L 20 -60 L 34 -54 L 14 6 Z" fill={CqY} stroke={NBK} strokeWidth={4} /></g>}
      </svg>
      <div style={{position: 'absolute', left: 60, top: cy + 110, width: 300, height: 300, transform: `scale(${gq}) rotate(${wr * 0.2}deg)`, zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div style={{width: 220, height: 220, borderRadius: 110, background: CqO, border: `7px solid ${NBK}`, boxShadow: `7px 7px 0 ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div style={{transform: `rotate(${wr}deg)`}}><Ico n="Wrench" size={130} c="#fff" /></div></div></div>
      <div style={{position: 'absolute', left: 730, top: cy + 110, width: 300, height: 300, transform: `scale(${gq})`, zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div style={{width: 220, height: 220, borderRadius: 110, background: '#3A424D', border: `7px solid ${NBK}`, boxShadow: `7px 7px 0 ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="Hand" size={130} c={CqY} /></div></div>
      <CqChip x={540} y={cy + 430} w={600} at={meth} l="La méthodologie de rédaction" c={CqT} ic="PenLine" fs={30} fill />
    </>
  );
};

/* ═════════════ 26. Collaboration : des métiers différents convergent autour de la table, la porte « dirigeants seuls » est barrée ═════════════ */
const CqTeams: React.FC<{cy: number; at: number; collab: number; groups: number; dir: number; mix: number}> = ({cy, at, collab, groups, dir, mix}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const N = 8, R = 280;
  const H = ['#fff', CqY, CqO, '#fff', CqG, CqY, CqO, CqB];
  const C = [CqB, CqT, CqO, CqV, CqG, CqP, CqN, CqR];
  const tq = t > groups ? Math.min(1, sp(t, groups, 8, 11)) : 0;
  const dq = t > dir - 0.3 ? Math.min(1, sp(t, dir - 0.3, 9, 10)) * (1 - prog(t, mix + 0.1, mix + 0.5, easeIn)) : 0;
  const xq = prog(t, dir + 0.2, dir + 0.5, easeOut);
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <ellipse cx={540} cy={cy + 40} rx={250 * tq} ry={140 * tq} fill="#B5835A" stroke={NBK} strokeWidth={7} />
        {tq > 0.9 && <g transform={`translate(540 ${cy + 30})`}><rect x={-60} y={-40} width={120} height={80} rx={6} fill="#fff" stroke={NBK} strokeWidth={4} transform="rotate(-8)" /></g>}
        {Array.from({length: N}, (_, i) => { const a = (i / N) * Math.PI * 2 - Math.PI / 2; const a0 = at + 0.1 + i * 0.12; const q = prog(t, a0, a0 + 0.8, easeOut); const sx = 540 + Math.cos(a) * 900, sy = cy + 40 + Math.sin(a) * 900; const fx = 540 + Math.cos(a) * R * 1.2, fy = cy + 40 + Math.sin(a) * R * 0.75 + 30; const mixed = t > mix ? prog(t, mix, mix + 0.7, easeInOut) : 0; const a2 = a + mixed * Math.PI * 2 / N * (i % 2 ? 1 : -1) * 2; const mx = 540 + Math.cos(a2) * R * 1.2, my = cy + 40 + Math.sin(a2) * R * 0.75 + 30; return <CqPerson key={i} x={lerp(sx, lerp(fx, mx, mixed), q)} y={lerp(sy, lerp(fy, my, mixed), q)} c={C[i]} s={0.85} skin={SKINS[i % 4]} helmet={H[i]} hair={i % 3 === 1} />; })}
        {t > collab && [0, 1].map((m) => { const r = ((t - collab) * 300 + m * 200) % 400; return <ellipse key={m} cx={540} cy={cy + 40} rx={260 + r} ry={150 + r * 0.6} fill="none" stroke={CqG} strokeWidth={6 * (1 - r / 400)} opacity={1 - r / 400} />; })}
      </svg>
      {dq > 0 && <div style={{position: 'absolute', left: 540 - 170, top: cy - 420, width: 340, height: 200, transform: `scale(${dq})`, zIndex: 7}}><div style={{position: 'absolute', inset: 0, ...nb(CqN, 7), borderColor: NBK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}><Ico n="Crown" size={60} c={CqY} />Les dirigeants seuls</div><svg width={340} height={200} style={{position: 'absolute', left: 0, top: 0}}><line x1={10} y1={190} x2={10 + 320 * xq} y2={190 - 180 * xq} stroke={CqR} strokeWidth={14} strokeLinecap="round" /></svg></div>}
      <CqChip x={540} y={cy + 360} w={460} at={collab} l="La collaboration" c={CqG} ic="Handshake" fs={34} fill />
      <CqChip x={540} y={cy + 438} w={480} at={groups} l="Des groupes de travail" c={CqT} ic="Users" fs={30} fill />
      <CqChip x={540} y={cy - 440} w={520} at={mix + 0.4} l="On mélange les métiers" c={CqO} ic="Shuffle" fs={30} fill />
    </>
  );
};

/* ═════════════ 27. Objectifs alignés sur la stratégie, qui fait quoi, indicateurs : les flèches s'alignent sur l'étoile, les rôles sont distribués, la jauge monte ═════════════ */
const CqAlign: React.FC<{cy: number; at: number; obj: number; strat: number; qui: number; ind: number; mes: number}> = ({cy, at, obj, strat, qui, ind, mes}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const al = prog(t, strat - 0.2, strat + 0.6, easeInOut);
  const sq = t > strat ? Math.min(1, sp(t, strat, 8, 10)) : 0;
  const phase2 = t > qui - 0.3;
  const R: [string, string][] = [['Pilote', CqB], ['Rédacteur', CqT], ['Relecteur', CqO], ['Suivi', CqV]];
  const gq = prog(t, mes, mes + 1.0, easeOut);
  return (
    <>
      {!phase2 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <g transform={`translate(540 ${cy - 300}) scale(${sq}) rotate(${k * 30})`}><path d="M 0 -90 L 22 -22 L 90 0 L 22 22 L 0 90 L -22 22 L -90 0 L -22 -22 Z" fill={CqY} stroke={NBK} strokeWidth={6} /></g>
        {Array.from({length: 7}, (_, i) => { const x = 160 + i * 127, y = cy + 200; const a0 = -90 + (random(`al${i}`) - 0.5) * 220; const a1 = (Math.atan2(cy - 300 - y, 540 - x) * 180) / Math.PI; const a = lerp(a0, a1, al); const q = t > obj + i * 0.06 ? Math.min(1, sp(t, obj + i * 0.06, 9, 11)) : 0; return <g key={i} transform={`translate(${x} ${y}) rotate(${a}) scale(${q})`}><line x1={0} y1={0} x2={140} y2={0} stroke={al > 0.95 ? CqG : CqS} strokeWidth={14} strokeLinecap="round" /><path d="M 150 0 l -36 -22 l 0 44 Z" fill={al > 0.95 ? CqG : CqS} stroke={NBK} strokeWidth={4} /></g>; })}
      </svg>}
      {phase2 && <>
        <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
          {R.map(([, c], i) => <CqPerson key={i} x={180 + i * 240} y={cy - 160} c={c} s={1.1} skin={SKINS[i % 4]} hair={i % 2 === 0} />)}
          <g transform={`translate(540 ${cy + 330})`}><path d="M -220 0 A 220 220 0 0 1 220 0" fill="none" stroke="#DDE2EA" strokeWidth={40} /><path d="M -220 0 A 220 220 0 0 1 220 0" fill="none" stroke={CqG} strokeWidth={40} pathLength={1} strokeDasharray={`${0.15 + gq * 0.7} 1`} /><g transform={`rotate(${-90 + (0.15 + gq * 0.7) * 180 - 90})`}><line x1={0} y1={0} x2={170} y2={0} stroke={NBK} strokeWidth={10} strokeLinecap="round" /></g><circle r={22} fill={NBK} /></g>
        </svg>
        {R.map(([l, c], i) => { const a = qui + i * 0.15; const q = prog(t, a, a + 0.45, easeOut); return <div key={i} style={{position: 'absolute', left: lerp(540, 180 + i * 240, q) - 100, top: lerp(cy + 600, cy - 20, q), width: 200, height: 70, transform: `rotate(${(1 - q) * 30}deg)`, opacity: q > 0 ? 1 : 0, ...nb(c, 5), borderColor: NBK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', zIndex: 5}}>{l}</div>; })}
      </>}
      {!phase2 && <CqChip x={540} y={cy + 380} w={560} at={strat} l="La stratégie globale" c={CqY} ic="Compass" fs={32} fill />}
      {phase2 && <CqChip x={540} y={cy - 440} w={400} at={qui} l="Qui fait quoi" c={CqN} ic="Users" fs={32} fill />}
      {phase2 && <CqChip x={540} y={cy + 360} w={460} at={ind} l="Des indicateurs" c={CqG} ic="Gauge" fs={32} fill />}
    </>
  );
};

/* ═════════════ 28. Boulot d'équipe et moyens à la hauteur : les mains s'empilent, puis la balance moyens / ambitions s'équilibre ═════════════ */
const CqMeans: React.FC<{cy: number; at: number; eq: number; moy: number; amb: number}> = ({cy, at, eq, moy, amb}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const phase2 = t > moy - 0.4;
  const mq = prog(t, moy, moy + 0.5, easeOut);
  const aq = prog(t, amb - 0.4, amb + 0.6, easeOut);
  const tilt = lerp(-14, 0, prog(t, amb, amb + 0.9, easeOut)) * (mq > 0 ? 1 : 0) + Math.sin(k * 7) * 2 * (1 - prog(t, amb, amb + 0.9));
  return (
    <>
      {!phase2 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        {Array.from({length: 6}, (_, i) => { const a = at + 0.1 + i * 0.12; const q = prog(t, a, a + 0.4, easeOut); const left = i % 2 === 0; return <g key={i} transform={`translate(${lerp(left ? -200 : 1280, 540, q)} ${cy + 140 - i * 70}) scale(${left ? 1 : -1} 1)`}><path d="M -260 -30 L -40 -30 Q 20 -30 20 0 Q 20 30 -40 30 L -260 30 Z" fill={SKINS[i % 4]} stroke={NBK} strokeWidth={6} /><rect x={-300} y={-36} width={60} height={72} rx={10} fill={[CqB, CqO, CqG, CqT, CqV, CqP][i]} stroke={NBK} strokeWidth={6} /></g>; })}
      </svg>}
      {phase2 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        <path d={`M 470 ${cy + 330} L 540 ${cy - 170} L 610 ${cy + 330} Z`} fill={CqS} stroke={NBK} strokeWidth={7} />
        <g transform={`rotate(${tilt} 540 ${cy - 170})`}>
          <rect x={160} y={cy - 186} width={760} height={32} rx={14} fill="#8A6A3A" stroke={NBK} strokeWidth={6} />
          {[[230, mq, 'Moyens', CqT], [850, aq, 'Ambitions', CqO]].map(([x, q, l, c], i) => <g key={i}><line x1={x as number} y1={cy - 170} x2={x as number} y2={cy + 30} stroke={NBK} strokeWidth={5} /><path d={`M ${(x as number) - 120} ${cy + 30} L ${(x as number) + 120} ${cy + 30} L ${(x as number) + 90} ${cy + 80} L ${(x as number) - 90} ${cy + 80} Z`} fill="#C6CDD8" stroke={NBK} strokeWidth={6} />{(q as number) > 0 && <g transform={`translate(${x} ${cy + 30 - 70 * (q as number)}) scale(${q})`}><rect x={-80} y={-60} width={160} height={120} rx={16} fill={c as string} stroke={NBK} strokeWidth={6} /><text y={14} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={28} fill="#fff">{l}</text></g>}</g>)}
        </g>
        <circle cx={540} cy={cy - 170} r={20} fill={CqY} stroke={NBK} strokeWidth={5} />
      </svg>}
      {!phase2 && <CqChip x={540} y={cy + 380} w={480} at={eq} l="Un boulot d'équipe" c={CqG} ic="Users" fs={32} fill />}
      {phase2 && <CqChip x={540} y={cy + 420} w={560} at={amb} l="À la hauteur des ambitions" c={CqO} ic="Scale" fs={30} fill />}
    </>
  );
};

/* ═════════════ 29. Le pire : le joli document oublié sur l'étagère, la poussière tombe, la toile d'araignée se tisse, l'horloge s'emballe ═════════════ */
const CqShelf: React.FC<{cy: number; at: number; doc: number; dust: number}> = ({cy, at, doc, dust}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const dq = prog(t, dust - 1.2, dust + 0.8, easeIn);
  const web = prog(t, dust - 0.5, dust + 0.6, easeOut);
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <rect x={120} y={cy + 120} width={840} height={36} rx={6} fill="#8A6A3A" stroke={NBK} strokeWidth={6} />
        {[200, 880].map((x) => <path key={x} d={`M ${x} ${cy + 156} l 0 70 l -40 0 Z`} fill="#6E532C" stroke={NBK} strokeWidth={5} />)}
        {[0, 1, 2].map((b) => <rect key={b} x={170 + b * 70} y={cy - 150} width={60} height={270} rx={6} fill={['#9AA5B4', '#7C8796', '#AEB8C6'][b]} stroke={NBK} strokeWidth={5} />)}
        {web > 0 && <g transform={`translate(960 ${cy - 330})`} opacity={web}>{Array.from({length: 7}, (_, i) => { const a = Math.PI / 2 + (i / 6) * (Math.PI / 2); return <line key={i} x1={0} y1={0} x2={Math.cos(a) * 260 * web} y2={Math.sin(a) * 260 * web} stroke="#9AA7B8" strokeWidth={3} />; })}{[60, 120, 180, 240].map((r) => <path key={r} d={`M 0 ${r * web} A ${r * web} ${r * web} 0 0 1 ${-r * web} 0`} fill="none" stroke="#9AA7B8" strokeWidth={3} />)}</g>}
        <g transform={`translate(800 ${cy - 330})`}><circle r={70} fill="#fff" stroke={NBK} strokeWidth={6} /><line x1={0} y1={0} x2={Math.cos(k * 9) * 50} y2={Math.sin(k * 9) * 50} stroke={NBK} strokeWidth={6} strokeLinecap="round" /><line x1={0} y1={0} x2={Math.cos(k * 1.2) * 34} y2={Math.sin(k * 1.2) * 34} stroke={CqR} strokeWidth={7} strokeLinecap="round" /></g>
        {Array.from({length: 40}, (_, i) => { const life = 2.2; const a0 = random(`du${i}`) * life; const age = (k + a0) % life; const x = 380 + random(`dx${i}`) * 520 + Math.sin(age * 3 + i) * 14; const y = cy - 420 + age * 230; return <circle key={i} cx={x} cy={y} r={3 + random(`dr${i}`) * 4} fill="#B8A27C" opacity={0.6 * Math.min(1, dq * 2)} />; })}
      </svg>
      <CqDoc x={560} y={cy - 40} w={220} lines={1} dust={dq} rot={-4} z={4} />
      <CqChip x={540} y={cy + 270} w={540} at={doc} l="Un joli document…" c={CqS} ic="FileText" fs={30} fill />
      <CqChip x={540} y={cy + 360} w={600} at={dust} l="…qui prend la poussière" c="#B8A27C" ic="Archive" fs={30} fill />
    </>
  );
};

/* ═════════════ 30. Une charte vivante : le document respire au rythme d'un cœur, la roue de l'amélioration tourne, la loupe repère la faille, le viseur corrige, la flèche avance ═════════════ */
const CqLiving: React.FC<{cy: number; at: number; viv: number; mot: number; amel: number; fail: number; corr: number; av: number}> = ({cy, at, viv, mot, amel, fail, corr, av}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const beat = t > viv ? Math.pow(Math.max(0, Math.sin((t - viv) * 7.5)), 8) : 0;
  const wq = t > mot ? Math.min(1, sp(t, mot, 8, 11)) : 0;
  const rot = t > amel ? (t - amel) * 90 : 0;
  const fq = prog(t, fail - 0.4, fail + 0.2, easeInOut);
  const cq = prog(t, corr, corr + 0.5, easeOut);
  const aq = prog(t, av, av + 0.6, easeOut);
  const ecg = Array.from({length: 60}, (_, i) => { const x = 140 + i * 13.5; const ph = (i - (t - viv) * 30) % 20; const y = cy - 300 + (ph > 8 && ph < 10 ? -60 : ph >= 10 && ph < 11 ? 40 : 0); return `${x},${y}`; }).join(' ');
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        {t > viv && <polyline points={ecg} fill="none" stroke={CqG} strokeWidth={7} strokeLinejoin="round" opacity={1 - wq} />}
        {wq > 0 && <g transform={`translate(540 ${cy + 120}) scale(${wq}) rotate(${rot})`}>{[CqB, CqG, CqO, CqT].map((c, i) => <path key={i} d={`M 0 0 L ${Math.cos((i * Math.PI) / 2) * 260} ${Math.sin((i * Math.PI) / 2) * 260} A 260 260 0 0 1 ${Math.cos(((i + 1) * Math.PI) / 2) * 260} ${Math.sin(((i + 1) * Math.PI) / 2) * 260} Z`} fill={c} stroke={NBK} strokeWidth={6} />)}<circle r={90} fill="#fff" stroke={NBK} strokeWidth={6} /></g>}
        {wq > 0 && [['P', -1, -1], ['D', 1, -1], ['C', 1, 1], ['A', -1, 1]].map(([l, sx, sy], i) => { const a = (rot * Math.PI) / 180 + Math.atan2(sy as number, sx as number); return <text key={i} x={540 + Math.cos(a) * 175} y={cy + 120 + Math.sin(a) * 175 + 22} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={64} fill="#fff">{l}</text>; })}
        {fq > 0 && cq < 1 && <path d={`M ${780} ${cy - 30} l 20 40 l -16 30 l 22 40`} stroke={CqR} strokeWidth={8} fill="none" opacity={1 - cq} />}
        {aq > 0 && <g><line x1={140} y1={cy + 475} x2={140 + 800 * aq} y2={cy + 475} stroke={CqG} strokeWidth={18} strokeLinecap="round" /><path d={`M ${160 + 800 * aq} ${cy + 475} l -50 -32 l 0 64 Z`} fill={CqG} stroke={NBK} strokeWidth={5} /></g>}
      </svg>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, transform: `scale(${1 - wq * 0.45}) translate(${wq * -430}px, ${wq * -380}px)`, transformOrigin: '540px 880px', zIndex: 5}}><CqDoc x={540} y={cy - 40} w={260} lines={1} seal={1} rot={0} glow={beat} z={5} /></div>
      {fq > 0 && <div style={{position: 'absolute', left: lerp(1000, 720, fq), top: cy - 110, width: 170, height: 170, zIndex: 7, transform: `rotate(${-20 + cq * 40}deg)`}}><Ico n={cq > 0.3 ? 'Crosshair' : 'Search'} size={150} c={cq > 0.3 ? CqG : NBK} /></div>}
      <CqChip x={540} y={cy - 440} w={420} at={viv} l="C'est vivant" c={CqG} ic="HeartPulse" fs={32} fill />
      <CqChip x={540} y={cy + 392} w={560} at={amel} l="Amélioration continue" c={CqB} ic="RefreshCw" fs={30} fill />
    </>
  );
};

/* ═════════════ 31. La concision : le marteau du juge tombe sur le point-clé, les ciseaux taillent le long rouleau en une carte courte ═════════════ */

/* ═════════════ 31. La concision : sur le terrain, le marteau tombe sur le point-clé, les ciseaux taillent le long rouleau en une carte courte ═════════════ */
const CqConcision: React.FC<{cy: number; at: number; terr: number; cat: number; lourd: number; conc: number}> = ({cy, at, terr, cat, lourd, conc}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const tq = t > terr ? Math.min(1, sp(t, terr, 8, 10)) : 0;
  const ph2 = t > cat - 0.3;
  const hq = prog(t, lourd - 0.15, lourd + 0.15, easeIn);
  const imp = t > lourd + 0.15 && t < lourd + 0.7 ? (t - lourd - 0.15) / 0.55 : 0;
  const cut = prog(t, conc - 0.6, conc + 0.2, easeInOut);
  const drop = prog(t, conc + 0.2, conc + 0.9, easeIn);
  return (
    <>
      {!ph2 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <path d={`M 0 ${cy + 200} Q 300 ${cy + 120} 540 ${cy + 180} T 1080 ${cy + 150} L 1080 ${cy + 520} L 0 ${cy + 520} Z`} fill="#8BC34A" stroke={NBK} strokeWidth={6} />
        {[180, 400, 660, 880].map((x, i) => <g key={i} transform={`translate(${x} ${cy + 230 + (i % 2) * 40}) scale(${tq})`}><rect x={-8} y={-140} width={16} height={140} fill="#7A4E2D" stroke={NBK} strokeWidth={4} /><path d="M 8 -140 L 90 -116 L 8 -92 Z" fill={[CqG, CqO, CqB, CqR][i]} stroke={NBK} strokeWidth={4} /></g>)}
        <CqPerson x={540} y={cy + 120} c={CqO} s={1.4} skin={SKINS[2]} helmet="#fff" />
      </svg>}
      {ph2 && <>
        <div style={{position: 'absolute', left: 140, top: cy - 300, width: 520, height: 120 + 520 * (1 - cut * 0.75), ...nb('#FFF6DD', 7), borderColor: NBK, overflow: 'hidden', zIndex: 4, transform: `translateY(${drop * 0}px)`}}>{Array.from({length: 14}, (_, m) => <div key={m} style={{margin: '18px 30px 0', height: 12, borderRadius: 6, background: m % 4 === 0 ? CqG : '#D9CDA8', width: m % 3 === 2 ? '65%' : '90%'}} />)}</div>
        {cut > 0 && <div style={{position: 'absolute', left: 140, top: cy - 180 + 520 * 0.25 + drop * 700, width: 520, height: 520 * 0.75 * cut, ...nb('#FFF6DD', 5), borderColor: NBK, opacity: 1 - drop, transform: `rotate(${drop * 25}deg)`, zIndex: 3}} />}
        {cut > 0 && cut < 1 && <div style={{position: 'absolute', left: 80 + cut * 600, top: cy - 300 + 120 + 520 * 0.25 - 60, width: 120, height: 120, zIndex: 6, transform: `rotate(${Math.sin(t * 30) * 12}deg)`}}><Ico n="Scissors" size={110} c={NBK} /></div>}
        <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 5}}>
          <g transform={`translate(830 ${cy - 140}) rotate(${lerp(-60, 10, hq)})`}><rect x={-20} y={-20} width={240} height={40} rx={14} fill="#8A6A3A" stroke={NBK} strokeWidth={6} transform="rotate(-90) translate(0 -20)" /><rect x={-80} y={-260} width={160} height={90} rx={16} fill="#6E532C" stroke={NBK} strokeWidth={7} /></g>
          <rect x={720} y={cy + 30} width={220} height={50} rx={10} fill="#6E532C" stroke={NBK} strokeWidth={6} />
          {imp > 0 && Array.from({length: 10}, (_, i) => { const a = Math.PI + (i / 9) * Math.PI; return <line key={i} x1={830 + Math.cos(a) * (60 + imp * 60)} y1={cy + 30 + Math.sin(a) * (20 + imp * 50)} x2={830 + Math.cos(a) * (100 + imp * 120)} y2={cy + 30 + Math.sin(a) * (40 + imp * 90)} stroke={CqY} strokeWidth={8 * (1 - imp)} strokeLinecap="round" />; })}
        </svg>
      </>}
      <CqChip x={540} y={cy - 440} w={420} at={terr} l="Sur le terrain" c={CqG} ic="HardHat" fs={32} fill out={cat - 0.3} />
      {ph2 && <CqChip x={760} y={cy - 440} w={420} at={cat} l="Catégorique" c={CqN} ic="Gavel" fs={30} fill />}
      <CqChip x={540} y={cy + 380} w={460} at={conc} l="La concision" c={CqP} ic="Scissors" fs={36} fill />
    </>
  );
};

/* ═════════════ 32. Un grand maximum de 10 : dix cases se remplissent, le 10 devient magique, l'engagement de trop fait déborder, le message se dilue et le public s'en va ═════════════ */
const CqTen: React.FC<{cy: number; at: number; ten: number; mag: number; plus: number; perd: number; dil: number; souv: number}> = ({cy, at, ten, mag, plus, perd, dil, souv}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const mq = t > mag ? Math.min(1, sp(t, mag, 8, 9)) : 0;
  const xq = prog(t, plus - 0.3, plus + 0.3, easeOut);
  const shake = t > plus + 0.3 && t < plus + 0.9 ? Math.sin(t * 70) * 10 : 0;
  const dq = prog(t, dil, dil + 1.4, easeOut);
  const lq = prog(t, perd, perd + 1.6, easeIn);
  const fq = prog(t, souv - 0.3, souv + 0.4);
  return (
    <>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, transform: `translateX(${shake}px)`, filter: dq > 0 ? `blur(${dq * 5}px) saturate(${1 - dq * 0.8})` : undefined, opacity: 1 - fq * 0.6}}>
        {Array.from({length: 10}, (_, i) => { const a = at + 0.3 + i * ((ten - at - 0.3) / 10); const q = t > a ? Math.min(1, sp(t, a, 10, 11)) : 0; const x = 130 + (i % 5) * 170, y = cy - 330 + Math.floor(i / 5) * 190; return <div key={i} style={{position: 'absolute', left: x, top: y, width: 140, height: 160, borderRadius: 18, border: `5px ${q > 0 ? 'solid' : 'dashed'} ${q > 0 ? NBK : '#9AA7B8'}`, background: q > 0 ? '#fff' : 'transparent', boxShadow: q > 0 ? `5px 5px 0 ${CqG}` : 'none', boxSizing: 'border-box', zIndex: 4}}>{q > 0 && <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${q})`}}><div style={{width: 80, height: 80, borderRadius: 40, background: CqG, border: `5px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="Check" size={50} c="#fff" /></div></div>}</div>; })}
        {xq > 0 && <div style={{position: 'absolute', left: lerp(1100, 900, xq), top: cy - 330, width: 140, height: 160, ...nb(CqR, 6), borderColor: NBK, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${12 + shake}deg)`, zIndex: 5}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: '#fff'}}>+</span></div>}
      </div>
      {t > ten && <div style={{position: 'absolute', left: 0, top: cy + 60, width: 1080, display: 'flex', justifyContent: 'center', zIndex: 6, opacity: 1 - dq * 0.7}}><div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 300, lineHeight: 1, color: CqN, transform: `scale(${Math.min(1, sp(t, ten, 8, 10)) * (1 + 0.08 * mq * Math.sin(k * 6))})`, textShadow: mq > 0 ? `0 0 ${50 * mq}px ${CqY}, 8px 8px 0 ${CqY}` : `8px 8px 0 ${NBK}`, WebkitTextStroke: `6px ${NBK}`}}>10{mq > 0 && Array.from({length: 6}, (_, i) => { const a = (i / 6) * Math.PI * 2 + k * 1.5; return <div key={i} style={{position: 'absolute', left: 230 + Math.cos(a) * 260, top: 140 + Math.sin(a) * 170, transform: `scale(${mq})`}}><Ico n="Sparkles" size={56} c={CqY} /></div>; })}</div></div>}
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 5}}>
        {lq > 0 && Array.from({length: 6}, (_, i) => <CqPerson key={i} x={180 + i * 145 + (i % 2 ? 1 : -1) * lq * 500} y={cy + 430} c={[CqB, CqT, CqO, CqG, CqV, CqP][i]} s={0.75} skin={SKINS[i % 4]} hair={i % 2 === 0} />)}
      </svg>
      <CqChip x={540} y={cy - 440} w={600} at={ten} l="Un maximum de 10 engagements" c={CqN} ic="ListChecks" fs={30} fill out={plus} />
      <CqChip x={540} y={cy - 440} w={420} at={mag} l="Le chiffre magique" c={CqY} ic="Sparkles" fs={32} fill out={plus} />
      <CqChip x={540} y={cy - 440} w={460} at={dil} l="On dilue le message" c={CqR} ic="Droplet" fs={30} fill />
    </>
  );
};

/* ═════════════ 33. Dix points, des règles d'or : les lingots tombent, gravés « réaliste » et « mesurable » ═════════════ */
const CqGolden: React.FC<{cy: number; at: number; pts: number; rules: number; real: number; mes: number}> = ({cy, at, pts, rules, real, mes}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const pq = t > pts ? Math.min(1, sp(t, pts, 8, 10)) : 0;
  const ingot = (x: number, y: number, a: number, l: string, ic: string) => { const q = prog(t, a, a + 0.4, easeIn); const land = t > a + 0.4 ? t - a - 0.4 : 0; const b = land ? Math.abs(Math.sin(land * 14)) * 20 * Math.exp(-land * 7) : 0; return <div style={{position: 'absolute', left: x - 200, top: lerp(cy - 900, y, q) - b, width: 400, height: 170, zIndex: 5, opacity: q > 0 ? 1 : 0}}><svg width={400} height={170} style={{position: 'absolute', left: 0, top: 0}}><path d="M 40 30 L 360 30 L 395 160 L 5 160 Z" fill="#E8B923" stroke={NBK} strokeWidth={7} strokeLinejoin="round" /><path d="M 40 30 L 360 30 L 340 60 L 60 60 Z" fill="#FFE07A" /><path d={`M ${80 + ((k * 200) % 400) - 60} 34 l 40 0 l -30 120 l -40 0 Z`} fill="rgba(255,255,255,0.5)" /></svg><div style={{position: 'absolute', left: 0, top: 60, width: 400, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontFamily: sansFont, fontWeight: 900, fontSize: 42, color: '#6E4E00'}}><Ico n={ic} size={46} c="#6E4E00" />{l}</div></div>; };
  return (
    <>
      <div style={{position: 'absolute', left: 0, top: cy - 380, width: 1080, display: 'flex', justifyContent: 'center', transform: `scale(${pq})`, zIndex: 4}}><div style={{...nb(CqN, 8), borderColor: NBK, padding: '14px 40px', fontFamily: sansFont, fontWeight: 900, fontSize: 72, color: '#fff'}}>10 points</div></div>
      <div style={{position: 'absolute', left: 0, top: 440, width: 1080, height: 960, overflow: 'hidden'}}><div style={{position: 'absolute', left: 0, top: -440, width: 1080, height: 1920}}>{ingot(540, cy - 130, rules, "Règles d'or", 'Crown')}{ingot(330, cy + 80, real, 'Réaliste', 'Target')}{ingot(750, cy + 80, mes, 'Mesurable', 'Ruler')}</div></div>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 3}}><line x1={60} y1={cy + 255} x2={1020} y2={cy + 255} stroke={NBK} strokeWidth={8} /></svg>
    </>
  );
};

/* ═════════════ 34. Limpide : un verre d'eau trouble devient clair, l'égalité « 1 engagement = 1 phrase », et tout le monde comprend, du technicien au grand public ═════════════ */
const CqOneLine: React.FC<{cy: number; at: number; limp: number; eq: number; phrase: number; vocab: number; tech: number; pub: number}> = ({cy, at, limp, eq, phrase, vocab, tech, pub}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const cq = prog(t, limp - 0.3, limp + 0.8, easeOut);
  const ph2 = t > eq - 0.4;
  const e1 = t > eq ? Math.min(1, sp(t, eq, 9, 10)) : 0;
  const e2 = t > phrase ? Math.min(1, sp(t, phrase, 9, 10)) : 0;
  const ph3 = t > vocab - 0.3;
  return (
    <>
      {!ph2 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <path d={`M 380 ${cy - 300} L 700 ${cy - 300} L 660 ${cy + 220} L 420 ${cy + 220} Z`} fill={hexMix('#9C8662', '#BFE6FF', cq)} stroke={NBK} strokeWidth={8} strokeLinejoin="round" opacity={0.95} />
        {cq < 1 && Array.from({length: 18}, (_, i) => <circle key={i} cx={420 + random(`mu${i}`) * 240 + Math.sin(k * 2 + i) * 10} cy={cy - 250 + random(`mv${i}`) * 440} r={10 + random(`mr${i}`) * 12} fill="#6E532C" opacity={0.6 * (1 - cq)} />)}
        {cq > 0.6 && [0, 1, 2].map((m) => <path key={m} d={`M ${430 + m * 80} ${cy - 260} q 20 ${80 + m * 20} 0 ${200 + m * 40}`} stroke="#fff" strokeWidth={8} fill="none" opacity={0.7} />)}
        <path d={`M 700 ${cy - 300} L 740 ${cy - 300} L 700 ${cy + 220} L 660 ${cy + 220} Z`} fill="rgba(255,255,255,0.4)" />
      </svg>}
      {ph2 && !ph3 && <div style={{position: 'absolute', left: 0, top: cy - 200, width: 1080, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, zIndex: 5}}>
        <div style={{...nb(CqG, 8), borderColor: NBK, padding: '20px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: '#fff', textAlign: 'center', transform: `scale(${e1})`, lineHeight: 1.1}}>1<br />engagement</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 110, color: NBK, transform: `scale(${e1})`}}>=</div>
        <div style={{...nb(CqN, 8), borderColor: NBK, padding: '20px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: '#fff', textAlign: 'center', transform: `scale(${e2})`, lineHeight: 1.1}}>1 seule<br />phrase simple</div>
      </div>}
      {ph3 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        {Array.from({length: 7}, (_, i) => { const x = 130 + i * 137; const a = vocab + i * 0.12 + (i > 0 ? (pub - vocab) * (i / 6) * 0.5 : 0); const q = t > a ? Math.min(1, sp(t, a, 9, 11)) : 0; const nod = q > 0.9 ? Math.sin((t - a) * 9) * 4 : 0; return <g key={i} transform={`translate(0 ${nod})`}><CqPerson x={x} y={cy + 140} c={i === 0 ? CqO : [CqB, CqT, CqG, CqV, CqP, CqN][i - 1]} s={0.9 * Math.max(q, 0.0001)} skin={SKINS[i % 4]} helmet={i === 0 ? '#fff' : undefined} hair={i % 2 === 1} />{q > 0.9 && <g transform={`translate(${x + 26} ${cy + 16})`}><circle r={24} fill={CqG} stroke={NBK} strokeWidth={4} /><path d="M -10 0 l 7 8 l 13 -14" stroke="#fff" strokeWidth={5} fill="none" /></g>}</g>; })}
        <path d={`M 130 ${cy + 270} L 950 ${cy + 270}`} stroke={NBK} strokeWidth={6} />
        <path d={`M 950 ${cy + 270} l -30 -18 l 0 36 Z`} fill={NBK} />
      </svg>}
      {!ph2 && <CqChip x={540} y={cy + 320} w={360} at={limp} l="Limpide" c={CqT} ic="Droplet" fs={36} fill />}
      {ph3 && <CqChip x={540} y={cy - 300} w={600} at={vocab} l="Un vocabulaire pour tous" c={CqN} ic="MessageCircle" fs={30} fill />}
      {ph3 && <CqChip x={200} y={cy + 310} w={320} at={tech} l="Du technicien" c={CqO} ic="HardHat" fs={26} fill />}
      {ph3 && <CqChip x={860} y={cy + 310} w={360} at={pub} l="Au grand public" c={CqB} ic="Users" fs={26} fill />}
    </>
  );
};

/* ═════════════ 35. Compliquée = ignorée, la simplicité frappe : la pelote illisible est boudée, la flèche simple frappe la cible avec une onde de choc ═════════════ */
const CqPunch: React.FC<{cy: number; at: number; comp: number; ign: number; simp: number; frap: number}> = ({cy, at, comp, ign, simp, frap}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const ph2 = t > simp - 0.3;
  const iq = prog(t, ign, ign + 0.6, easeInOut);
  const aq = prog(t, frap - 0.6, frap, easeIn);
  const sh = t > frap ? t - frap : -1;
  const knot = Array.from({length: 90}, (_, i) => { const a = i * 0.37; const r = 150 + Math.sin(i * 1.7) * 70; return `${i ? 'L' : 'M'} ${540 + Math.cos(a + k * 0.4) * r} ${cy - 120 + Math.sin(a * 1.3) * r * 0.8}`; }).join(' ');
  return (
    <>
      {!ph2 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        <path d={knot} fill="none" stroke={CqS} strokeWidth={10} strokeLinejoin="round" pathLength={1} strokeDasharray={`${prog(t, at + 0.1, comp + 0.4)} 1`} />
        {Array.from({length: 5}, (_, i) => { const x = 180 + i * 180; return <g key={i} transform={`translate(${x} ${cy + 300}) scale(${1 - iq * 2 * (i % 2 ? 0 : 0)} 1)`}><CqPerson x={0} y={0} c={[CqB, CqT, CqO, CqG, CqV][i]} s={0.85} skin={SKINS[i % 4]} hair={i % 2 === 0} />{iq > 0.5 && <path d="M -40 -70 q 40 -30 80 0" stroke={NBK} strokeWidth={0} fill="none" />}</g>; })}
        {iq > 0 && Array.from({length: 5}, (_, i) => <text key={i} x={180 + i * 180} y={cy + 150} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={60} fill={CqR} opacity={iq}>?</text>)}
      </svg>}
      {ph2 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        <g transform={`translate(700 ${cy - 40})`}>{[1, 0.72, 0.44, 0.18].map((f, i) => <circle key={i} r={220 * f} fill={i % 2 ? '#fff' : CqR} stroke={NBK} strokeWidth={6} />)}</g>
        {sh > 0 && sh < 1 && [0, 1].map((m) => <circle key={m} cx={700} cy={cy - 40} r={240 + sh * 400 + m * 60} fill="none" stroke={CqY} strokeWidth={16 * (1 - sh)} />)}
        <g transform={`translate(${lerp(-200, 700, aq)} ${cy - 40})`}><line x1={-380} y1={0} x2={0} y2={0} stroke={NBK} strokeWidth={16} /><line x1={-380} y1={0} x2={-6} y2={0} stroke={CqG} strokeWidth={8} /><path d="M 0 0 l -50 -26 l 0 52 Z" fill={NBK} /><path d="M -380 0 l -46 -34 l 30 34 l -30 34 Z" fill={CqG} stroke={NBK} strokeWidth={5} />{aq < 1 && [0, 1, 2].map((m) => <line key={m} x1={-460 - m * 40} y1={-30 + m * 30} x2={-560 - m * 60} y2={-30 + m * 30} stroke={CqG} strokeWidth={6} opacity={0.6} />)}</g>
      </svg>}
      {!ph2 && <CqChip x={540} y={cy - 440} w={460} at={comp} l="Une charte compliquée" c={CqS} ic="Spline" fs={30} fill />}
      {!ph2 && <CqChip x={540} y={cy + 420} w={420} at={ign} l="Une charte ignorée" c={CqR} ic="EyeOff" fs={30} fill />}
      {ph2 && <CqChip x={540} y={cy - 440} w={420} at={simp} l="La simplicité" c={CqG} ic="Sparkles" fs={34} fill />}
      {ph2 && <CqChip x={540} y={cy + 300} w={460} at={frap} l="Sa force de frappe" c={CqY} ic="Zap" fs={34} fill />}
    </>
  );
};

/* ═════════════ 36. Un monde concurrentiel : l'arène de tours, une seule s'engage publiquement — son drapeau qualité se lève et elle s'allume ═════════════ */
const CqArena: React.FC<{cy: number; at: number; monde: number; prouv: number; pub: number}> = ({cy, at, monde, prouv, pub}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const G = cy + 260;
  const B: [number, number, number][] = [[120, 120, 300], [250, 110, 420], [380, 130, 340], [540, 140, 480], [700, 120, 380], [830, 110, 300], [960, 110, 360]];
  const fq = prog(t, pub, pub + 0.9, easeOut);
  const pq = t > prouv ? Math.min(1, sp(t, prouv, 8, 10)) : 0;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        {B.map(([x, w, h], i) => { const q = prog(t, at + 0.1 + i * 0.08, at + 0.6 + i * 0.08, easeOut); const me = i === 3; const hh = h * q; return <g key={i}><rect x={x - w / 2} y={G - hh} width={w} height={hh} rx={8} fill={me ? hexMix('#9AA5B4', '#22B573', fq) : hexMix('#9AA5B4', '#C6CDD8', fq)} stroke={NBK} strokeWidth={6} />{Array.from({length: Math.floor(hh / 70)}, (_, r) => <rect key={r} x={x - w / 2 + 18} y={G - hh + 22 + r * 70} width={w - 36} height={30} rx={4} fill={me && fq > 0.5 ? CqY : '#DDE2EA'} stroke={NBK} strokeWidth={3} />)}</g>; })}
        {t > monde && B.map(([x, , h], i) => i !== 3 ? <g key={i} transform={`translate(${x} ${G - h - 30}) rotate(${Math.sin(k * 6 + i) * 20})`}><path d="M -14 14 L 0 -14 L 14 14 Z" fill={CqR} opacity={0.8 * (1 - fq)} /></g> : null)}
        <g transform={`translate(540 ${G - 480})`}><line x1={0} y1={0} x2={0} y2={-200 * fq} stroke={NBK} strokeWidth={8} />{fq > 0.3 && <path d={`M 4 ${-200 * fq} Q 80 ${-200 * fq + 20 + Math.sin(k * 6) * 10} 160 ${-200 * fq + 10} L 160 ${-200 * fq + 90} Q 80 ${-200 * fq + 100 + Math.sin(k * 6 + 1) * 10} 4 ${-200 * fq + 80} Z`} fill={CqG} stroke={NBK} strokeWidth={5} />}</g>
        <line x1={40} y1={G} x2={1040} y2={G} stroke={NBK} strokeWidth={8} />
      </svg>
      {pq > 0 && <div style={{position: 'absolute', left: 0, top: G + 40, width: 1080, display: 'flex', justifyContent: 'center', transform: `scale(${pq})`, zIndex: 6}}><div style={{...nb('#fff', 7), borderColor: NBK, boxShadow: `7px 7px 0 ${CqG}`, padding: '10px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>Prouver ce qu'elle vaut ?</div></div>}
      <CqChip x={540} y={cy - 440} w={560} at={monde} l="Un monde concurrentiel" c={CqR} ic="Swords" fs={30} fill out={pub} />
      <CqChip x={540} y={G + 140} w={560} at={pub} l="S'engager publiquement" c={CqG} ic="Flag" fs={30} fill />
    </>
  );
};

/* ═════════════ 37. Sous silence ? Le haut-parleur barré se fissure et éclate, le mégaphone diffuse la charte ═════════════ */
const CqUnmute: React.FC<{cy: number; at: number; sil: number; sens: number}> = ({cy, at, sil, sens}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const crack = prog(t, sil, sens, easeIn);
  const br = t > sens ? t - sens : -1;
  return (
    <>
      {br < 0.3 && <div style={{position: 'absolute', left: 0, top: cy - 380, width: 1080, display: 'flex', justifyContent: 'center', zIndex: 5, opacity: br > 0 ? 1 - br / 0.3 : pop(t, at), transform: `translateX(${crack > 0 ? Math.sin(t * 80) * 8 * crack : 0}px)`}}><div style={{position: 'relative', width: 460, height: 460, borderRadius: 230, background: '#3A424D', border: `10px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="VolumeX" size={280} c="#fff" /><svg width={460} height={460} style={{position: 'absolute', left: 0, top: 0}}><path d="M 230 10 L 210 120 L 260 170 L 220 260 L 270 320 L 240 450" stroke={CqY} strokeWidth={10} fill="none" pathLength={1} strokeDasharray={`${crack} 1`} /></svg></div></div>}
      {br > 0 && br < 1.2 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 6}}>{Array.from({length: 14}, (_, i) => { const a = (i / 14) * Math.PI * 2; const d = br * 700; return <path key={i} d="M -30 -20 L 30 -26 L 20 30 Z" fill="#3A424D" stroke={NBK} strokeWidth={4} transform={`translate(${540 + Math.cos(a) * d} ${cy - 150 + Math.sin(a) * d + br * br * 400}) rotate(${br * 400 + i * 40})`} opacity={1 - br / 1.2} />; })}</svg>}
      {br > 0 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 4}}>
        <g transform={`translate(380 ${cy - 150}) rotate(-10) scale(${Math.min(1, sp(t, sens + 0.1, 8, 10))})`}><path d="M -70 -50 L 90 -150 L 90 150 L -70 50 Z" fill={CqG} stroke={NBK} strokeWidth={8} strokeLinejoin="round" /><rect x={-140} y={-50} width={76} height={100} rx={12} fill={CqN} stroke={NBK} strokeWidth={6} /></g>
        {[0, 1, 2].map((m) => { const r = ((br * 260 + m * 110) % 330); return <path key={m} d={`M ${500 + r * 0.8} ${cy - 330 - r * 0.4} Q ${540 + r} ${cy - 150} ${500 + r * 0.8} ${cy + 30 + r * 0.4}`} fill="none" stroke={CqG} strokeWidth={12 * (1 - r / 330)} opacity={1 - r / 330} />; })}
      </svg>}
      {br > 0 && <CqDoc x={830} y={cy - 150} w={190} lines={1} seal={1} rot={8} z={5} op={prog(t, sens + 0.3, sens + 0.6)} />}
      <CqChip x={540} y={cy + 230} w={420} at={sil - 0.2} l="Sous silence ?" c={CqS} ic="VolumeX" fs={32} fill out={sens + 0.2} />
      <CqChip x={540} y={cy + 230} w={460} at={sens + 0.3} l="Plus aucun sens" c={CqG} ic="Megaphone" fs={32} fill />
    </>
  );
};

/* ═════════════ 38. La clé de voûte : l'arche se monte pierre à pierre, la charte glisse au sommet, l'arche s'illumine et tient ═════════════ */
const CqKeystone: React.FC<{cy: number; at: number; key0: number; perf: number; nour: number; merci: number}> = ({cy, at, key0, perf, nour, merci}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const R1 = 300, R2 = 420, ccx = 540, ccy = cy + 180;
  const N = 9;
  const kq = prog(t, key0 - 0.1, key0 + 0.5, easeIn);
  const lit = prog(t, perf, perf + 0.8);
  const nq = t > nour ? Math.min(1, sp(t, nour, 8, 10)) : 0;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
        {lit > 0 && <circle cx={ccx} cy={ccy - 200} r={420} fill={`rgba(246,199,68,${0.25 * lit})`} />}
        {Array.from({length: N}, (_, i) => { if (i === 4) return null; const a0 = Math.PI + (i / N) * Math.PI, a1 = Math.PI + ((i + 1) / N) * Math.PI; const a = at + 0.05 + (i < 4 ? i : 8 - i) * 0.12; const q = prog(t, a, a + 0.45, easeOut); const d = `M ${ccx + Math.cos(a0) * R1} ${ccy + Math.sin(a0) * R1} L ${ccx + Math.cos(a0) * R2} ${ccy + Math.sin(a0) * R2} A ${R2} ${R2} 0 0 1 ${ccx + Math.cos(a1) * R2} ${ccy + Math.sin(a1) * R2} L ${ccx + Math.cos(a1) * R1} ${ccy + Math.sin(a1) * R1} A ${R1} ${R1} 0 0 0 ${ccx + Math.cos(a0) * R1} ${ccy + Math.sin(a0) * R1} Z`; return <path key={i} d={d} fill={hexMix('#C9BFA8', '#E9D9A8', lit)} stroke={NBK} strokeWidth={6} transform={`translate(0 ${(1 - q) * 300})`} opacity={q > 0 ? 1 : 0} />; })}
        {[ccx - (R1 + R2) / 2, ccx + (R1 + R2) / 2].map((x, i) => <rect key={i} x={x - 60} y={ccy} width={120} height={200} fill={hexMix('#C9BFA8', '#E9D9A8', lit)} stroke={NBK} strokeWidth={6} />)}
        <line x1={60} y1={ccy + 200} x2={1020} y2={ccy + 200} stroke={NBK} strokeWidth={8} />
        {(() => { const a0 = Math.PI + (4 / N) * Math.PI, a1 = Math.PI + (5 / N) * Math.PI; const d = `M ${ccx + Math.cos(a0) * R1} ${ccy + Math.sin(a0) * R1} L ${ccx + Math.cos(a0) * R2} ${ccy + Math.sin(a0) * R2} A ${R2} ${R2} 0 0 1 ${ccx + Math.cos(a1) * R2} ${ccy + Math.sin(a1) * R2} L ${ccx + Math.cos(a1) * R1} ${ccy + Math.sin(a1) * R1} A ${R1} ${R1} 0 0 0 ${ccx + Math.cos(a0) * R1} ${ccy + Math.sin(a0) * R1} Z`; return <g transform={`translate(0 ${(1 - kq) * -500})`} opacity={kq > 0 ? 1 : 0}><path d={d} fill={CqG} stroke={NBK} strokeWidth={7} /><text x={ccx} y={ccy - R1 - 40} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={30} fill="#fff">CHARTE</text></g>; })()}
        {t > key0 + 0.5 && t < key0 + 1.1 && Array.from({length: 10}, (_, i) => { const e = (t - key0 - 0.5) / 0.6; const a = (i / 10) * Math.PI * 2; return <line key={i} x1={ccx + Math.cos(a) * (60 + e * 80)} y1={ccy - R2 + 40 + Math.sin(a) * (40 + e * 50)} x2={ccx + Math.cos(a) * (90 + e * 140)} y2={ccy - R2 + 40 + Math.sin(a) * (60 + e * 90)} stroke={CqY} strokeWidth={8 * (1 - e)} strokeLinecap="round" />; })}
      </svg>
      {nq > 0 && <div style={{position: 'absolute', left: 0, top: cy - 420, width: 1080, display: 'flex', justifyContent: 'center', transform: `scale(${nq})`, zIndex: 6}}><div style={{...nb('#fff', 7), borderColor: NBK, boxShadow: `7px 7px 0 ${CqB}`, borderRadius: 60, padding: '12px 30px', display: 'flex', alignItems: 'center', gap: 12, fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK}}><Ico n="Brain" size={44} c={CqB} />De quoi nourrir la réflexion</div></div>}
      <CqChip x={540} y={ccy + 230} w={620} at={perf} l="La performance moderne" c={CqG} ic="TrendingUp" fs={32} fill />
      <CqChip x={540} y={ccy - R1 + 60} w={360} at={key0} l="La clé de voûte" c={CqN} ic="KeyRound" fs={30} fill />
      <CqChip x={540} y={ccy - 90} w={320} at={merci} l="Merci !" c={CqY} ic="Heart" fs={34} fill />
    </>
  );
};

/* ═════════════ Outils de scène propres à la capsule ═════════════ */
const Center: React.FC<{y: number; children: React.ReactNode; z?: number}> = ({y, children, z = 4}) => <Abs x={0} y={y} w={1080} style={{display: 'flex', justifyContent: 'center', zIndex: z}}>{children}</Abs>;
const RING_A = [IMG.fournisseurs, IMG.valoriser, IMG.operatrice, IMG.rapport, IMG.checklist, IMG.raffinerie, IMG.bienetre, IMG.jamaisSeul];

/* ═════════════ Guichet 1 : le guide de la charte qualité + le menu ═════════════ */
const Intro: React.FC = () => (
  <Out end={36.05}>
    <Heads h={[[2.65, ['Bienvenue dans ce décryptage', 'le guide de la charte qualité'], [1]], [5.15, ["L'idée : des concepts théoriques", 'une feuille de route ultra claire'], [1]], [10.7, ['Pour élever les standards', "d'une entreprise"], [0]], [12.4, ['La question fondamentale', 'de bout en bout'], [0]], [15.3, ['Pourquoi adopter', 'une charte qualité ?'], [1]], [17.1, ["Qu'est-ce que ça apporte", "concrètement à l'organisation ?"], [1]], [19.8, ['Allez,', 'on y va !'], [1]], [20.4, ['Au menu', 'de notre analyse'], [0]], [25.0, ['Ensuite, le pourquoi', 'stratégique'], [1]], [28.0, ['Avant de lister', 'les atouts majeurs'], [1]], [30.7, ['Puis la méthodologie', 'de rédaction'], [0]], [34.1, ['Pour finir :', 'les critères de réussite'], [1]]]} />
    <Ph a={2.6} b={5.15}>
      <CqParticles cy={850} at={2.63} form={2.66} dur={1.0} />
      <CqChip x={540} y={1180} w={720} at={4.0} l="Le guide de la charte qualité" c={CqN} ic="BookOpen" fs={34} fill />
    </Ph>
    <Ph a={5.1} b={12.4}>
      <CqRoadmap cy={890} at={5.15} theo={6.4} road={9.0} elev={10.75} ent={11.45} />
    </Ph>
    <Ph a={12.35} b={15.3}>
      <CqBigQuestion cy={860} at={12.4} bout={14.2} />
    </Ph>
    <Ph a={15.25} b={19.85}>
      <SearchOpen x={60} y={450} w={960} h={860} at={15.3} query="pourquoi adopter une charte" results={['Pourquoi adopter une charte qualité ?', 'Ce que ça apporte', "Concrètement, à l'organisation"]} found={0} foundAt={17.25} clickAt={17.5} c={CqB}>
        <div style={{position: 'absolute', inset: 0, background: '#000'}}>
          <Img src={staticFile(IMG.organisation)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.92)'}} />
          <div style={{position: 'absolute', left: 0, bottom: 50, width: 900, display: 'flex', justifyContent: 'center'}}><div style={{...nb(CqB, 8), borderColor: NBK, boxShadow: `8px 8px 0 ${NBK}`, padding: '12px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 42, color: '#fff', textAlign: 'center', lineHeight: 1.1}}>CONCRÈTEMENT, À L'ORGANISATION ?</div></div>
        </div>
      </SearchOpen>
    </Ph>
    <Ph a={19.8} b={36.05}>
      <CqMenuLine cy={880} at={19.85} go={19.85} items={[22.6, 26.7, 29.1, 32.8, 35.0]} />
    </Ph>
  </Out>
);

/* ═════════════ Guichet 2 : définir la charte ═════════════ */
const S1: React.FC = () => (
  <Out end={92.25}>
    <Heads h={[[37.8, ['Définir la charte', 'la fondation de nos standards'], [1]], [42.4, ['De quoi parle-t-on', 'exactement ?'], [0]], [44.6, ['Pas juste un bout de papier', 'rangé dans un tiroir'], [0]], [49.4, ['Un document officiel', "approuvé tout en haut de l'échelle"], [0]], [53.7, ['Directement par le conseil', "d'administration"], [0, 1]], [56.0, ['Son but ?', 'garantir des normes bien précises'], [1]], [60.2, ['Répondre aux besoins internes', 'et aux attentes des clients'], [0, 1]], [64.8, ['Le document qui donne le ton', 'à toute la démarche qualité'], [0]], [68.2, ['Attention :', 'une distinction super importante'], [1]], [71.8, ['Des engagements forts', 'écrits avec des mots simples'], [0, 1]], [77.2, ["On exclut d'office", 'les conditions générales de vente'], [0]], [81.3, ['Le blabla publicitaire', 'un argumentaire commercial déguisé'], [0, 1]], [85.6, ['Une véritable déclaration', 'de principe'], [0, 1]], [87.6, ['Bâtir un cadre de confiance', 'pas forcer une transaction'], [0]]]} />
    <Ph a={37.8} b={42.45}>
      <CqFoundation cy={880} at={37.85} found={40.5} std={41.3} />
    </Ph>
    <Ph a={42.4} b={49.45}>
      <CqDrawer cy={860} at={42.45} paper={47.2} drawer={48.45} no={49.0} />
    </Ph>
    <Ph a={49.4} b={56.0}>
      <CqApproval cy={880} at={49.45} off={49.9} climb={51.9} top={53.6} board={54.7} />
    </Ph>
    <Ph a={55.95} b={64.8}>
      <CqTarget cy={900} at={56.0} gar={56.5} norm={58.8} int={61.4} cli={63.7} />
    </Ph>
    <Ph a={64.75} b={68.25}>
      <CqTone cy={880} at={64.8} ton={66.8} />
    </Ph>
    <Ph a={68.2} b={77.25}>
      <CqSieve cy={880} at={68.25} warn={68.6} eng={75.0} simple={76.5} />
    </Ph>
    <Ph a={77.2} b={85.6}>
      <CqExclude cy={900} at={77.25} items={[79.8, 81.7, 83.9]} />
    </Ph>
    <Ph a={85.55} b={92.25}>
      <CqPrinciple cy={900} at={85.6} decl={86.4} frame={89.1} force={90.9} />
    </Ph>
  </Out>
);

/* ═════════════ Guichet 3 : le pourquoi stratégique ═════════════ */
const S2: React.FC = () => (
  <Out end={137.85}>
    <Heads h={[[94.0, ['Comment cette démarche', "libère-t-elle la valeur de l'entreprise ?"], [1]], [99.6, ["« Oh, c'est encore", 'de la paperasse ! »'], [1]], [102.8, ['Mais posons-nous', 'deux minutes'], [1]], [104.2, ['Pourquoi les entreprises', 'qui cartonnent'], [1]], [108.6, ["S'imposent ces règles", 'pour garantir leur niveau de service ?'], [0]], [111.0, ['Quel est le vrai', 'moteur stratégique ?'], [1]], [113.4, ['La réponse :', 'une idée brillante'], [1]], [116.8, ['Pas un contrat juridique', "mais l'expression d'un contrat"], [1]], [121.3, ['Extrêmement puissant', 'comme concept'], [0]], [123.5, ['Une déclaration publique', 'une promesse officielle'], [0, 1]], [128.6, ['La transparence totale', 'qui démarque des concurrents'], [0]], [134.1, ['Un lien de confiance', 'littéralement imbattable'], [0, 1]]]} />
    <Ph a={94.0} b={99.65}>
      <CqVault cy={880} at={94.05} val={97.8} />
    </Ph>
    <Ph a={99.6} b={104.2}>
      <CqPaperwork cy={880} at={99.65} oh={101.3} pap={102.4} pause={102.9} two={103.6} />
    </Ph>
    <Ph a={104.15} b={113.45}>
      <CqWinners cy={880} at={104.2} cart={107.1} rules={109.2} serv={110.6} mot={111.7} />
    </Ph>
    <Ph a={113.4} b={123.5}>
      <CqContract cy={900} at={113.45} idee={115.1} ctr={117.4} cross={118.4} expr={119.9} power={122.3} />
    </Ph>
    <Ph a={123.45} b={128.6}>
      <CqPromise cy={880} at={123.5} pub={124.6} prom={127.5} />
    </Ph>
    <Ph a={128.55} b={137.85}>
      <CqGlass cy={860} at={128.6} tr={130.1} dem={131.8} conc={133.4} lien={134.7} imb={136.4} />
    </Ph>
  </Out>
);

/* ═════════════ Guichet 4 : les atouts majeurs ═════════════ */
const S3: React.FC = () => (
  <Out end={193.85}>
    <Heads h={[[139.6, ['Les atouts majeurs', 'en interne ou en externe'], [0]], [144.2, ['Les bénéfices', 'se dédoublent'], [1]], [148.4, ["En interne : des retours", "d'audit externes"], [1]], [153.0, ['Des conseils ultra personnalisés', 'des réglementations à jour'], [0, 1]], [158.1, ["Mais c'est du côté externe", 'que la magie opère'], [1]], [160.4, ["Détourner l'attention du prix", 'pour la focaliser sur la qualité'], [1]], [166.4, ['En pleine lumière :', 'le professionnalisme'], [1]], [169.5, ['On solidifie', 'cette fameuse confiance'], [1]], [172.1, ['Des principes invisibles', 'rendus hyper concrets'], [1]], [178.4, ['Affichés sur Internet,', 'les médias, les emballages'], [0, 1]], [182.4, ["L'image de marque", 'fait un bond de géant'], [1]], [184.6, ['La réponse à notre', 'grande question'], [1]], [189.0, ['Un levier de croissance', 'massif'], [0]], [190.4, ["Rendre l'excellence", 'visible aux yeux de tous'], [1]]]} />
    <Ph a={139.6} b={148.45}>
      <CqSplit cy={880} at={139.65} int={142.3} ext={143.1} ded={147.6} />
    </Ph>
    <Ph a={148.4} b={158.15}>
      <CqInternal cy={900} at={148.45} audit={151.7} cons={153.2} regl={156.1} />
    </Ph>
    <Ph a={158.1} b={160.45}>
      <Abs x={0} y={440} w={1080} h={860}><Ring3D imgs={RING_A} at={158.12} w={1080} h={860} cw={380} ch={480} R={600} cy={0.45} /></Abs>
      <Center y={1290} z={6}><NBadge at={159.4} text="LA MAGIE OPÈRE" bg={CqO} rot={-2} size={34} /></Center>
    </Ph>
    <Ph a={160.4} b={166.45}>
      <CqPriceShift cy={880} at={160.45} det={161.5} prix={163.5} qual={165.3} />
    </Ph>
    <Ph a={166.4} b={172.1}>
      <CqSpotlight cy={900} at={166.45} lum={167.4} pro={168.0} solid={169.8} conf={170.8} />
    </Ph>
    <Ph a={172.05} b={182.45}>
      <CqReveal cy={900} at={172.1} inv={175.8} conc={177.6} web={179.3} med={180.2} pack={181.9} />
    </Ph>
    <Ph a={182.4} b={193.85}>
      <CqLeap cy={880} at={182.45} bond={184.1} rep={185.5} lev={189.4} vis={192.4} />
    </Ph>
  </Out>
);

/* ═════════════ Guichet 5 : la méthodologie ═════════════ */
const S4: React.FC = () => (
  <Out end={237.05}>
    <Heads h={[[195.6, ['Les mains dans le cambouis', 'la méthodologie de rédaction'], [1]], [198.2, ["Comment est-ce qu'on construit", 'tout ça concrètement ?'], [0]], [200.6, ['Le maître mot :', 'la collaboration'], [1]], [203.5, ['Étape numéro un :', 'des groupes de travail'], [1]], [205.8, ['Pas que les dirigeants :', 'on mélange les métiers'], [1]], [208.9, ['Des objectifs qui collent', 'à la stratégie globale'], [0, 1]], [213.3, ['Qui fait quoi,', 'des indicateurs pour mesurer'], [1]], [217.7, ['Un véritable', "boulot d'équipe"], [1]], [220.0, ['Des moyens à la hauteur', 'de ses ambitions'], [0]], [224.5, ['Le pire : un joli document', 'qui prend la poussière'], [1]], [228.9, ['Une bonne charte qualité,', "c'est vivant"], [1]], [230.6, ["Le moteur de l'amélioration", 'continue'], [0, 1]], [233.1, ['Repérer les failles,', 'corriger le tir, avancer'], [0, 1]]]} />
    <Ph a={195.6} b={200.6}>
      <CqGarage cy={880} at={195.65} mains={195.8} meth={197.0} constr={199.2} />
    </Ph>
    <Ph a={200.55} b={208.95}>
      <CqTeams cy={880} at={200.6} collab={202.4} groups={204.8} dir={207.0} mix={207.6} />
    </Ph>
    <Ph a={208.9} b={218.0}>
      <CqAlign cy={880} at={208.95} obj={211.2} strat={212.5} qui={214.2} ind={215.6} mes={216.7} />
    </Ph>
    <Ph a={217.95} b={224.5}>
      <CqMeans cy={880} at={218.0} eq={218.6} moy={221.5} amb={223.5} />
    </Ph>
    <Ph a={224.45} b={228.95}>
      <CqShelf cy={880} at={224.5} doc={226.4} dust={228.1} />
    </Ph>
    <Ph a={228.9} b={237.05}>
      <CqLiving cy={860} at={228.95} viv={230.15} mot={230.9} amel={231.9} fail={235.3} corr={235.8} av={236.6} />
    </Ph>
  </Out>
);

/* ═════════════ Guichet 6 : les critères de réussite ═════════════ */
const S5: React.FC = () => (
  <Out end={286.05}>
    <Heads h={[[238.8, ['Les critères de réussite', 'sur le terrain'], [0, 1]], [243.5, ['Le matériel source', 'est catégorique'], [1]], [246.3, ['Il insiste sur un point-clé :', 'la concision'], [1]], [249.4, ['Une charte qui marche :', 'un grand maximum de 10 engagements'], [1]], [255.4, ["10, c'est", 'le chiffre magique'], [1]], [256.9, ['Si on en met plus,', 'on perd les gens'], [1]], [258.8, ['On dilue le message', "plus personne ne s'en souvient"], [0]], [261.3, ['Pour que ce soit applicable :', '10 points'], [1]], [263.8, ['Pour chacun,', "des règles d'or"], [1]], [267.0, ['Hyper réaliste', 'et mesurable'], [0, 1]], [270.0, ['Mais surtout,', 'limpide'], [1]], [272.0, ['Un engagement', 'égale une seule phrase simple'], [1]], [275.1, ['Un vocabulaire', 'que tout le monde peut piger'], [0]], [278.1, ['Du technicien', "jusqu'au grand public"], [0, 1]], [279.9, ['Une charte compliquée', 'est une charte ignorée'], [0, 1]], [283.1, ['La simplicité,', 'sa force de frappe'], [0, 1]]]} />
    <Ph a={238.8} b={249.4}>
      <CqConcision cy={880} at={238.85} terr={242.4} cat={245.3} lourd={246.8} conc={248.6} />
    </Ph>
    <Ph a={249.35} b={261.3}>
      <CqTen cy={880} at={249.4} ten={254.0} mag={255.9} plus={257.5} perd={258.1} dil={258.9} souv={260.8} />
    </Ph>
    <Ph a={261.25} b={270.0}>
      <CqGolden cy={880} at={261.3} pts={263.3} rules={266.4} real={267.9} mes={269.4} />
    </Ph>
    <Ph a={269.95} b={279.9}>
      <CqOneLine cy={880} at={270.0} limp={271.4} eq={273.0} phrase={274.3} vocab={275.6} tech={278.2} pub={279.0} />
    </Ph>
    <Ph a={279.85} b={286.05}>
      <CqPunch cy={880} at={279.9} comp={281.4} ign={282.6} simp={283.3} frap={285.0} />
    </Ph>
  </Out>
);

/* ═════════════ Guichet 7 : la clé de voûte ═════════════ */
const S6: React.FC = () => (
  <Out end={OUTRO_AT}>
    <Heads h={[[287.8, ['Une vraie réflexion', 'de fond'], [0]], [288.7, ['Dans un monde', 'aussi concurrentiel'], [1]], [290.7, ['Comment prouver', "ce qu'elle vaut ?"], [0]], [292.9, ["Sans s'engager publiquement", 'sur la qualité ?'], [0]], [294.9, ['Garder ces standards', 'sous silence'], [1]], [300.0, ["n'a plus", 'aucun sens'], [1]], [301.0, ['La clé de voûte', 'de la performance moderne'], [0]], [303.6, ['Voilà de quoi', 'nourrir la réflexion'], [1]], [305.3, ["Merci d'avoir suivi", 'ce décryptage'], [0]]]} />
    <Ph a={287.8} b={294.9}>
      <CqArena cy={880} at={287.85} monde={289.6} prouv={292.0} pub={293.7} />
    </Ph>
    <Ph a={294.85} b={301.05}>
      <CqUnmute cy={880} at={294.9} sil={299.6} sens={300.4} />
    </Ph>
    <Ph a={301.0} b={OUTRO_AT}>
      <CqKeystone cy={860} at={301.05} key0={301.7} perf={302.6} nour={304.2} merci={305.3} />
    </Ph>
  </Out>
);
/* ═════════════ Police de la vidéo : Cambria (repli Caladea embarqué) ═════════════ */
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-Regular.ttf'), weight: '400'});
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-Bold.ttf'), weight: '700'});
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-Italic.ttf'), weight: '400', style: 'italic'});
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-BoldItalic.ttf'), weight: '700', style: 'italic'});
const CAMBRIA_CSS = ".cambria, .cambria * { font-family: Cambria, 'Caladea', Georgia, serif !important; }";

/* ═════════════ Couverture : orbite 3D des notions de la charte + titre en lettres-photos animées ═════════════ */
const COVER_SIG: [string, string, string][] = [['Charte', 'Qualité', CqN], ['Normes', 'Précises', CqB], ['Clients', 'Attentes', CqO], ['Confiance', 'Imbattable', CqG], ['Audit', 'Retours', CqT], ['Équipe', 'Collaboration', CqV], ['10', 'Engagements', CqR], ['Simple', 'Limpide', CqY], ['Voûte', 'Performance', BURG]];
const KOrbitSig: React.FC<{cx: number; cy: number; at: number}> = ({cx, cy, at}) => {
  const t = useT();
  const app = Math.min(1, sp(t, at, 7, 12));
  const els = COVER_SIG.map(([n, l, c], i) => { const th = (i / COVER_SIG.length) * Math.PI * 2 + t * 0.85; return {n, l, c, x: Math.sin(th) * 410 * app, z: Math.cos(th)}; }).sort((u, v) => u.z - v.z);
  return <>{els.map(({n, l, c, x, z}) => { const sc = 0.6 + 0.4 * ((z + 1) / 2); return <div key={`${n}${l}`} style={{position: 'absolute', left: cx + x, top: cy + z * 130, transform: `translate(-50%, -50%) scale(${sc})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.35 + 0.65 * ((z + 1) / 2), zIndex: Math.round(z * 10) + 20, filter: z < -0.3 ? 'blur(1.5px)' : undefined}}><div style={{minWidth: 120, height: 120, padding: '0 14px', borderRadius: 22, background: c, border: `5px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `6px 6px 0 ${NBK}`, fontFamily: sansFont, fontWeight: 900, fontSize: n.length > 3 ? 40 : 64, color: c === CqY ? NBK : '#fff', boxSizing: 'border-box', whiteSpace: 'nowrap'}}>{n}</div><div style={{...nb('#fff', 4), borderColor: NBK, padding: '3px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: INK, whiteSpace: 'nowrap'}}>{l}</div></div>; })}</>;
};
const KCover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Bg />
      <Abs x={0} y={40} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.14)'}}><Img src={staticFile(LOGO)} style={{height: 76, display: 'block'}} /></div></Abs>
      <Abs x={0} y={180} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb(CqG, 6), borderColor: NBK, padding: '8px 22px', ...CAP, fontSize: 26, color: '#fff'}}>Pourquoi l'adopter ?</div></Abs>
      <KOrbitSig cx={540} cy={560} at={0.05} />
      <Abs x={0} y={830} w={1080} style={{display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap', zIndex: 40}}><PhotoLetterAnim ch="LA CHARTE" src={IMG.cover} size={128} ls={4} seed={8} /></Abs>
      <Abs x={0} y={990} w={1080} style={{display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap', zIndex: 40}}><PhotoLetterAnim ch="QUALITÉ" src={IMG.c1} size={150} ls={5} seed={13} /></Abs>
      <Abs x={60} y={1400} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden', zIndex: 40}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 80 + k * (800 / (SECT.length - 1)) - 18, top: 28, width: 36, height: 36, borderRadius: 9, background: x.c, border: '4px solid #fff', boxSizing: 'border-box'}} />)}
        <div style={{position: 'absolute', left: 80 + 0.5 * (800 / (SECT.length - 1)) - 28, top: 36}}><Capsule w={56} c={NAVY} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 80 + k * (800 / (SECT.length - 1)) - 56, width: 112, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 18, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Montage, bruitage ═════════════ */
const TK = 1.8;
const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1 / TK, 4, 0.18 / TK, 'sfx/ding', 0.12), {at: x.at + 0.45 / TK, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95 / TK, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6 / TK, s: 'sfx/pop', v: 0.2}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len / 2), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const pops = (ts: number[], v = 0.18): Sfx[] => ts.map((at) => ({at, s: 'sfx/pop', v}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8}, ...rep(0.2, 10, 0.08, 'sfx/ding', 0.1),
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at + 0.15, s: 'sfx/bell', v: 0.1})),
  // guichet 1 : le guide + le menu
  {at: 2.66, s: 'soft-whoosh', v: 0.4, dur: 1.6}, ...rep(2.75, 12, 0.08, 'sfx/click', 0.04), {at: 3.8, s: 'bass-hit', v: 0.4}, {at: 4.05, s: 'sfx/pop', v: 0.25},
  ...rep(6.45, 6, 0.12, 'sfx/pop', 0.12), {at: 9.0, s: 'soft-whoosh', v: 0.3, dur: 1.2}, ...rep(9.1, 6, 0.12, 'sfx/click', 0.1), {at: 10.8, s: 'sfx/rise', v: 0.2, dur: 0.9}, {at: 11.5, s: 'sfx/pop', v: 0.2},
  ...rep(12.5, 10, 0.13, 'sfx/thud', 0.12), {at: 14.2, s: 'sfx/swish', v: 0.25},
  ...searchCues(15.3, 27, 17.25, 17.5),
  {at: 19.9, s: 'sfx/ding', v: 0.3}, {at: 20.2, s: 'sfx/whoosh', v: 0.25}, ...[22.6, 26.7, 29.1, 32.8, 35.0].map((at) => ({at, s: 'sfx/bell', v: 0.2})), ...[22.65, 26.75, 29.15, 32.85, 35.05].map((at) => ({at, s: 'sfx/swish', v: 0.12})),
  // guichet 2 : définir la charte
  {at: 38.1, s: 'soft-whoosh', v: 0.3, dur: 2}, {at: 40.6, s: 'sfx/thud', v: 0.45}, {at: 40.62, s: 'bass-hit', v: 0.3}, {at: 41.35, s: 'sfx/rise', v: 0.2, dur: 0.8},
  {at: 42.8, s: 'sfx/click', v: 0.25}, {at: 47.3, s: 'sfx/swish', v: 0.25}, {at: 48.5, s: 'sfx/thud', v: 0.5}, {at: 49.0, s: 'tampon', v: 0.45},
  {at: 49.95, s: 'sfx/pop', v: 0.2}, ...rep(51.9, 4, 0.42, 'sfx/click', 0.15), {at: 54.7, s: 'tampon', v: 0.4}, {at: 54.75, s: 'validation', v: 0.25},
  {at: 56.5, s: 'sfx/pop', v: 0.2}, ...[58.8, 61.4, 63.7].map((at) => ({at, s: 'sfx/swish', v: 0.25})), ...[59.15, 61.75, 64.05].map((at) => ({at, s: 'sfx/thud', v: 0.3})),
  {at: 66.8, s: 'sfx/ding', v: 0.35}, {at: 67.0, s: 'soft-whoosh', v: 0.25, dur: 1.2},
  {at: 68.6, s: 'alarme', v: 0.18, dur: 1.4}, ...rep(71.3, 9, 0.32, 'sfx/pop', 0.12), {at: 75.0, s: 'validation', v: 0.25}, {at: 76.5, s: 'sfx/pop', v: 0.2},
  ...[79.8, 81.7, 83.9].map((at) => ({at: at + 0.3, s: 'sfx/swish', v: 0.3})), ...[79.8, 81.7, 83.9].map((at) => ({at: at + 0.95, s: 'sfx/whoosh', v: 0.25})),
  {at: 86.2, s: 'page', v: 0.35}, {at: 86.9, s: 'tampon', v: 0.3}, ...rep(89.1, 4, 0.22, 'sfx/click', 0.15), {at: 89.9, s: 'validation', v: 0.25}, {at: 90.95, s: 'sfx/swish', v: 0.25},
  // guichet 3 : le pourquoi stratégique
  ...rep(94.4, 10, 0.32, 'tick', 0.15), {at: 97.6, s: 'cadenas', v: 0.4}, {at: 97.8, s: 'sfx/rise', v: 0.25, dur: 1}, {at: 98.0, s: 'bass-hit', v: 0.3},
  ...rep(99.75, 12, 0.11, 'page', 0.12), {at: 101.3, s: 'sfx/pop', v: 0.25}, {at: 102.9, s: 'deep-hit', v: 0.35}, {at: 103.6, s: 'sfx/pop', v: 0.22},
  ...rep(104.3, 4, 0.18, 'sfx/swish', 0.12), {at: 107.1, s: 'sfx/ding', v: 0.3}, {at: 109.2, s: 'sfx/pop', v: 0.2}, {at: 110.6, s: 'sfx/pop', v: 0.2}, {at: 111.7, s: 'sfx/whoosh', v: 0.25}, ...rep(111.9, 8, 0.18, 'sfx/click', 0.1),
  {at: 115.1, s: 'sfx/ding', v: 0.35}, {at: 117.4, s: 'sfx/pop', v: 0.2}, {at: 118.4, s: 'sfx/swish', v: 0.3}, {at: 119.9, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 122.3, s: 'bass-hit', v: 0.4}, {at: 122.32, s: 'sfx/thud', v: 0.3},
  {at: 124.6, s: 'sfx/whoosh', v: 0.25}, {at: 127.0, s: 'sfx/pop', v: 0.2}, {at: 127.5, s: 'stylo', v: 0.35},
  {at: 130.1, s: 'soft-whoosh', v: 0.3, dur: 1.2}, {at: 131.8, s: 'sfx/rise', v: 0.22, dur: 0.8}, {at: 133.4, s: 'sfx/thud', v: 0.2}, ...rep(134.7, 7, 0.14, 'sfx/click', 0.12), {at: 136.4, s: 'validation', v: 0.3},
  // guichet 4 : les atouts majeurs
  {at: 139.8, s: 'sfx/pop', v: 0.2}, {at: 142.3, s: 'sfx/ding', v: 0.2}, {at: 143.1, s: 'sfx/ding', v: 0.2}, {at: 147.2, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 147.7, s: 'sfx/pop', v: 0.3},
  ...[151.7, 153.2, 156.1].map((at) => ({at, s: 'sfx/whoosh', v: 0.25})), ...[152.05, 153.55, 156.45].map((at) => ({at, s: 'validation', v: 0.18})),
  {at: 158.2, s: 'soft-whoosh', v: 0.35, dur: 1.5}, {at: 159.4, s: 'sfx/pop', v: 0.25},
  {at: 161.5, s: 'sfx/swish', v: 0.2}, {at: 165.3, s: 'sfx/ding', v: 0.3},
  {at: 167.4, s: 'sfx/thud', v: 0.35}, {at: 168.0, s: 'sfx/rise', v: 0.2, dur: 0.6}, ...rep(169.8, 14, 0.1, 'sfx/click', 0.1),
  {at: 175.8, s: 'soft-whoosh', v: 0.2, dur: 1}, {at: 177.6, s: 'sfx/rise', v: 0.25, dur: 0.6}, ...[179.3, 180.2, 181.9].map((at) => ({at, s: 'sfx/pop', v: 0.25})),
  {at: 183.6, s: 'sfx/whoosh', v: 0.3}, {at: 184.7, s: 'sfx/thud', v: 0.4}, {at: 185.9, s: 'sfx/swish', v: 0.25}, {at: 186.2, s: 'validation', v: 0.28}, {at: 189.4, s: 'sfx/rise', v: 0.25, dur: 1}, {at: 192.4, s: 'sfx/ding', v: 0.3},
  // guichet 5 : la méthodologie
  ...rep(195.8, 6, 0.2, 'sfx/click', 0.15), {at: 197.0, s: 'stylo', v: 0.3},
  ...rep(200.7, 8, 0.12, 'sfx/pop', 0.12), {at: 202.4, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 204.8, s: 'sfx/pop', v: 0.2}, {at: 207.2, s: 'sfx/swish', v: 0.3}, {at: 207.6, s: 'soft-whoosh', v: 0.25, dur: 1},
  ...rep(211.2, 7, 0.06, 'sfx/click', 0.12), {at: 212.5, s: 'validation', v: 0.25}, ...rep(214.2, 4, 0.15, 'sfx/swish', 0.15), {at: 216.7, s: 'sfx/rise', v: 0.2, dur: 1},
  ...rep(218.1, 6, 0.12, 'sfx/thud', 0.15), {at: 221.5, s: 'sfx/thud', v: 0.3}, {at: 223.5, s: 'sfx/thud', v: 0.3}, {at: 224.2, s: 'sfx/ding', v: 0.2},
  ...rep(224.6, 8, 0.5, 'tick', 0.12), {at: 228.1, s: 'soft-whoosh', v: 0.2, dur: 1},
  ...rep(230.15, 9, 0.84, 'sfx/thud', 0.12), {at: 230.9, s: 'sfx/pop', v: 0.2}, {at: 235.3, s: 'sfx/swish', v: 0.2}, {at: 235.8, s: 'sfx/click', v: 0.3}, {at: 236.6, s: 'sfx/whoosh', v: 0.25},
  // guichet 6 : les critères de réussite
  ...rep(242.5, 4, 0.15, 'sfx/pop', 0.15), {at: 246.8, s: 'deep-hit', v: 0.45}, {at: 246.82, s: 'tampon', v: 0.35}, {at: 248.1, s: 'sfx/swish', v: 0.3}, {at: 248.6, s: 'sfx/click', v: 0.3},
  ...rep(249.7, 10, 0.43, 'sfx/pop', 0.15), {at: 254.0, s: 'bass-hit', v: 0.35}, {at: 255.9, s: 'sfx/ding', v: 0.3}, {at: 257.5, s: 'sfx/thud', v: 0.35}, {at: 258.9, s: 'soft-whoosh', v: 0.3, dur: 1.5},
  {at: 263.3, s: 'sfx/pop', v: 0.3}, ...[266.4, 267.9, 269.4].map((at) => ({at: at + 0.4, s: 'sfx/thud', v: 0.4})), ...[266.45, 267.95, 269.45].map((at) => ({at: at + 0.45, s: 'sfx/ding', v: 0.15})),
  {at: 271.4, s: 'soft-whoosh', v: 0.25, dur: 1}, {at: 273.0, s: 'sfx/pop', v: 0.25}, {at: 274.3, s: 'sfx/pop', v: 0.25}, ...rep(275.7, 7, 0.4, 'sfx/pop', 0.12),
  ...rep(279.95, 6, 0.2, 'sfx/swish', 0.08), {at: 282.6, s: 'sfx/thud', v: 0.2}, {at: 284.4, s: 'sfx/whoosh', v: 0.35}, {at: 285.0, s: 'deep-hit', v: 0.45}, {at: 285.02, s: 'bass-hit', v: 0.35},
  // guichet 7 : la clé de voûte
  ...rep(287.95, 7, 0.08, 'sfx/thud', 0.12), {at: 289.6, s: 'sfx/swish', v: 0.2}, {at: 292.0, s: 'sfx/pop', v: 0.25}, {at: 293.7, s: 'sfx/rise', v: 0.25, dur: 0.9}, {at: 294.4, s: 'validation', v: 0.25},
  {at: 299.6, s: 'tension', v: 0.2, dur: 0.8}, {at: 300.4, s: 'deep-hit', v: 0.45}, {at: 300.42, s: 'sfx/whoosh', v: 0.3}, {at: 300.6, s: 'sfx/rise', v: 0.2, dur: 0.8},
  ...rep(301.1, 8, 0.07, 'sfx/thud', 0.15), {at: 301.9, s: 'sfx/thud', v: 0.5}, {at: 301.92, s: 'bass-hit', v: 0.4}, {at: 302.6, s: 'soft-whoosh', v: 0.3, dur: 1.2}, {at: 304.2, s: 'sfx/pop', v: 0.25}, {at: 305.3, s: 'sfx/ding', v: 0.25},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];
const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SCN: [React.FC, number, number][] = [[Intro, 2.6, 36.0], [S1, 37.8, 92.2], [S2, 94.0, 137.8], [S3, 139.6, 193.8], [S4, 195.6, 237.0], [S5, 238.8, 286.0], [S6, 287.8, OUTRO_AT]];
export const CharteQualiteMetro: React.FC = () => (
  <AbsoluteFill className="cambria" style={{background: PAPER}}>
    <style>{CAMBRIA_CSS}</style>
    <Bg />
    {SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7 / TK}><TimeWarp.Provider value={{at: x.at, k: TK}}><C i={i} /></TimeWarp.Provider></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><KCover /></Gate>
    <Gate from={307.6} to={OUTRO_AT + 0.3}><JCrtOff at={307.75} /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-charte-qualite-metro-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u2 = [wn, Avatar, Ring3D, SlamTag, Arrow, slamK, CAP, STAGE, SCAN, RING_ISO, Drum, Marked, Announce, MBadge, RailSteps, StairSteps, ZigSteps, QBubble, Grid15, RameWipe, Forklift, ICO, MC, ACR, lin, hexMix, cl, GyroFlash, Hot, Photo, Pill2, Ph, TChip, Row3, SlamCard, ZInk, ZTicker, ZAxis, ZDef, CI, CD, METH, JCirText, JMirror, JNewton, JFuse, JShock, JTree, JAccordion, JRing, JButterfly, JAmdec, JHazop, JHourglass, JRewind, JFlipArrow, JBoard, JYarn, JPrint, JFault, JGears, JYinYang, JConstellation, CONST, ESiren, ECompass, ENeonExit, EFloorPlan, EBlackout, EVestDrop, EQueue, EDoor, ESonar, ERadio, EHub, EConfusion, EDice, ETape, EChess, EFunnel, ETally, EGavel, EBaton, EFiretruck, EGauge, EDomino, ECycle, EMonths, EChecklist, ESpiral, EFeather, EOdometer, ECrack, ENail, ETarget, EUnity, ExitRunner, AssemblyIcon, Vest, CG, CR, CY, CO, LGearsTol, JCrtOff, LEar, LBook, LSeal, LEngrave, LBinders, LGap, L25, LPuppet, LOrg, LOrbit, LLaw, LPlane, LSlide, LSwiss, LBalance, LBattery, LTri, LRoutine, LNine, LPlant, LSign, LSayDo, LSteps, LKnit, LDaily, LAnchor, LDistill, LJuggle, LIceberg, LTrophy, LJenga, LToggle, LWeak, LY, LN, LR, LG, LB, VForce, VAcro, VFour, VWheel, VGauge, VPillars, VMirror, VMorph, VStairs, VSkills, VIoT, VBlueprint, YRoad, YHouse, YEngine, YDust, YCubes, YCompass, YBingo, YBricks, YWave, YRadar, YFlatline, YReactor, YDials, YFlatpack, YVault, YCurtain, YLights, YMagnify, YCert, YTriad, YToolbox, YDeming, YMagic, ToolArt, yGearPath, YB, YN, YT, YO, YR, YG, YY, ITangle, ITrilemma, IVenn, ISilos, IClone, IPile, IGasworks, IColumns, IConveyor, IGlobe, IShield, IWeld, IBeforeAfter, ISafe, IHelix, IOverlay, IAlign, ITable, ISpine, IPrism, ITrampoline, IBroadcast, IPodium, IOpenQ, QSE3, IQ, IS, IE, IN, IO, QXray, QSilhouette, qBody, QCrowd, QDesk, QSign, QTissues, QGear, QEquation, QLineup, QPullback, QMonolith, QSectors, QKeys, QWorkstation, QRotate, QLift, QHoist, QPuzzle, QGesture, QR, QN, QB, QG, QO, QY, Center, RING_A, CqChip, CqPerson, SKINS, CqDoc, CqDocMini, CQ_PTS, cqLetter, CqParticles, CqRoadmap, CQ_QMARK, CqBigQuestion, CQ_MENU, CqMenuLine, CqFoundation, CqDrawer, CqApproval, CqTarget, CqTone, CqSieve, CqExclude, CqPrinciple, CqVault, CqPaperwork, CqWinners, CqContract, CqPromise, CqGlass, CqSplit, CqInternal, CqPriceShift, CqSpotlight, CqReveal, CqLeap, CqGarage, CqTeams, CqAlign, CqMeans, CqShelf, CqLiving, CqConcision, CqTen, CqGolden, CqOneLine, CqPunch, CqArena, CqUnmute, CqKeystone, CqN, CqG, CqO, CqR, CqB, CqT, CqY, CqV, CqP, CqK, CqS];

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn, Barred, Flap];
