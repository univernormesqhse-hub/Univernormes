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
 * « Les 25 lois invisibles QHSE » (voix d'origine, 5 min 48) — capsule « condensé de toutes les techniques + effet
 * wahou + ultra premium » en métro. Tube de verre à six guichets (lois invisibles → facteur humain → réalité du
 * système → impératif leadership → leçon ultime → la vraie question), capsule qui file d'un guichet à l'autre,
 * gyrophare resserré par TimeWarp, barre de recherche qui ouvre la grille des 25 lois, carrousel 3D de photos de
 * terrain. Police Cambria (repli Caladea). Couverture : orbite 3D des lois citées (n° 1, 5, 9, 10, 14, 21, 22, 23,
 * 25) + titre en lettres-photos animées. Seuls les numéros de lois cités par la voix sont affichés. Techniques
 * nouvelles : manuel d'où s'échappe la lumière, sceau de cire qui se fend, gravure laser dans la tête, classeurs et
 * coches d'audit puis incidents qui éclatent, rails qui divergent (écrit / réel), grille des 25 lois en vague,
 * marionnettiste Q-S-E, organigramme à impulsions, orbite autour d'une silhouette, plaque de gare des numéros de
 * loi, avion de papier rattrapé par un filet, responsabilité qui glisse sur un rail, fromage suisse 3D dont les
 * trous s'alignent, balance émotions / logique et prévention / accident, batterie qui se vide, trois engrenages du
 * système, boucle de la routine et jauge de vigilance, papier déchiré terrain / procédures, jauge 9 sur 10, arbre
 * à pièces, pyramide à sommet lumineux, clé de voûte, signature barrée, écran partagé dire / faire, empreintes du
 * leader, tricot de la culture, calendrier-pellicule, ancre, distillation, jonglage, iceberg avec plongée sous
 * l'eau, trophée fendu, tour de blocs fragile, interrupteur connaître / appliquer, signal faible amplifié,
 * oreille à ondes. Sous-titres NeoCaptions sur la voix d'origine, sans musique.
 */
const IMG = {
  cover: 'rhse-gen/lumiere.jpg',
  c1: 'evacuation-gen/guide-file.jpg',
  c2: 'evacuation-gen/bilan.jpg',
  accuse: 'taproot-gen/accuser-systeme.jpg',
  fatigue: 'alerte-gen/silence.jpg',
  direction: 'alerte-gen/direction.jpg',
  torch: 'rhse-gen/ombre.jpg',
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
const OUTRO_AT = 347.9;
export const LOIS_INVISIBLES_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '0', title: 'Les lois invisibles', s: 'Au-delà des manuels', c: NAVY, g: 'lois', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 56.4, n: '1', title: 'Le facteur humain', s: "L'humain au cœur", c: '#1F6FD1', g: 'humain', k: 'gyro', lab: 'GUICHET 2 / 6 · PARTIE 2'},
  {at: 145.9, n: '2', title: 'La réalité du système', s: 'Culture et complexité', c: '#0F9D8F', g: 'système', k: 'gyro', lab: 'GUICHET 3 / 6 · PARTIE 3'},
  {at: 218.2, n: '3', title: "L'impératif leadership", s: "L'exemple d'en haut", c: '#E8A200', g: 'leadership', k: 'gyro', lab: 'GUICHET 4 / 6 · PARTIE 4'},
  {at: 280.2, n: '4', title: 'La leçon ultime', s: 'Synthèse des experts', c: '#E2483B', g: 'leçon', k: 'gyro', lab: 'GUICHET 5 / 6 · PARTIE 5'},
  {at: 327.4, n: '✓', title: 'La vraie question', s: 'Quel signal faible écouterez-vous ?', c: BURG, g: 'question', k: 'gyro', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 347.3;
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
  {n: 1, l: 'Règles du jeu non écrites', s: 'Non écrites', at: 6.2},
  {n: 2, l: '25 lois invisibles', s: '25 lois', at: 44.5},
  {n: 3, l: "Loi 9 : l'erreur est humaine", s: 'Loi 9', at: 70.2},
  {n: 4, l: 'Le fromage suisse', s: 'Fromage', at: 106.5},
  {n: 5, l: 'Loi 22 : la fatigue', s: 'Loi 22', at: 137.0},
  {n: 6, l: 'Loi 5 : la routine', s: 'Loi 5', at: 160.0},
  {n: 7, l: 'Loi 21 : le terrain', s: 'Loi 21', at: 176.1},
  {n: 8, l: 'Loi 14 : la prévention', s: 'Loi 14', at: 195.0},
  {n: 9, l: "Loi 1 : l'engagement", s: 'Loi 1', at: 233.6},
  {n: 10, l: "La loi de l'exemple", s: 'Exemple', at: 247.7},
  {n: 11, l: 'Loi 23 : la constance', s: 'Loi 23', at: 267.3},
  {n: 12, l: 'Loi 25 : la vigilance', s: 'Loi 25', at: 310.6},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE DES LOIS · STATION {r.n} / 12</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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
const EGavel: React.FC<{cx: number; cy: number; at: number; hit: number}> = ({cx, cy, at, hit}) => {
  const t = useT();
  const up = t < hit ? prog(t, at, hit - 0.15, easeOut) : 0;
  const down = t < hit ? prog(t, hit - 0.15, hit, easeIn) : 1;
  const ang = -50 * up * (1 - down);
  const k = t - hit;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at)}}>
      <rect x={cx - 280} y={cy + 60} width={560} height={130} rx={12} fill="#C9A227" stroke={NBK} strokeWidth={7} />
      <rect x={cx - 260} y={cy + 76} width={30} height={100} fill="#9A7A12" />
      <text x={cx + 10} y={cy + 145} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={46} fill={NBK}>CODE DU TRAVAIL</text>
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
const EGauge: React.FC<{cx: number; cy: number; at: number; R?: number}> = ({cx, cy, at, R = 240}) => {
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
      <text x={cx} y={cy + 110} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={30} fill={NBK}>PRESSION</text>
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

/* ═════════════ Outils de scène propres à la capsule ═════════════ */
const Center: React.FC<{y: number; children: React.ReactNode; z?: number}> = ({y, children, z = 4}) => <Abs x={0} y={y} w={1080} style={{display: 'flex', justifyContent: 'center', zIndex: z}}>{children}</Abs>;
const Zoom: React.FC<{a: number; b: number; s1: number; ox: string; children: React.ReactNode}> = ({a, b, s1, ox, children}) => { const t = useT(); const z = lerp(1, s1, prog(t, a, b, easeIn)); return <AbsoluteFill style={{clipPath: 'inset(440px 0 525px 0)'}}><AbsoluteFill style={{transform: `scale(${z})`, transformOrigin: ox, filter: z > 1.05 ? `blur(${(z - 1) * 2}px)` : undefined}}>{children}</AbsoluteFill></AbsoluteFill>; };
const Bubble: React.FC<{at: number; text: string; c: string; y: number; strike?: number; tail?: 'l' | 'r'; fs?: number}> = ({at, text, c, y, strike, tail = 'l', fs = 46}) => {
  const t = useT();
  const q = t > at ? Math.min(1, sp(t, at, 9, 12)) : 0;
  const st = strike ? prog(t, strike, strike + 0.35, easeOut) : 0;
  return (
    <Center y={y}>
      <div style={{position: 'relative', transform: `scale(${q})`, transformOrigin: tail === 'l' ? '10% 100%' : '90% 100%'}}>
        <div style={{...nb('#fff', 8), borderColor: NBK, boxShadow: `8px 8px 0 ${c}`, padding: '22px 38px', fontFamily: sansFont, fontWeight: 900, fontSize: fs, color: INK, whiteSpace: 'nowrap'}}>{text}</div>
        <div style={{position: 'absolute', [tail === 'l' ? 'left' : 'right']: 60, bottom: -34, width: 0, height: 0, borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderTop: `36px solid ${NBK}`}} />
        {st > 0 && <div style={{position: 'absolute', left: -20, top: '50%', width: `calc(${st * 100}% + 40px)`, height: 14, background: LR, borderRadius: 7, transform: 'rotate(-6deg)'}} />}
      </div>
    </Center>
  );
};
const Col: React.FC<{y: number; gap?: number; children: React.ReactNode}> = ({y, gap = 22, children}) => <Abs x={60} y={y} w={960} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap}}>{children}</Abs>;
const FIELD = ['evacuation-gen/guide-file.jpg', 'evacuation-gen/bilan.jpg', 'induction/briefing-atelier.jpg', 'rhse-gen/lumiere.jpg', 'evalrisques-gen/hawthorne.jpg', 'coordo/coordinatrice.jpg', 'evacuation-gen/responsable.jpg', 'induction/mine-equipe.jpg'];

/* ═════════════ Guichet 1 : les lois invisibles (introduction) ═════════════ */
const Intro: React.FC = () => (
  <Out end={56.35}>
    <Heads h={[[2.9, ["Ce qu'on ne trouve", 'dans aucun manuel'], [1]], [5.2, ['Les règles du jeu', 'non écrites'], [1]], [13.8, ['Les secrets', 'du métier'], [1]], [17.2, ['La sagesse collective', 'du terrain'], [1]], [20.1, ['Des années', "d'expérience"], [1]], [26.8, ['LA grande', 'question'], [1]], [36.7, ['Pourquoi', 'ce décalage ?'], [1]], [41.0, ['25 lois', 'invisibles'], [0, 1]], [45.5, ['Elles pilotent', 'Q, S et E'], [1]], [51.7, ['La dynamique', "d'une organisation"], [1]]]} />
    <Ph a={2.65} b={13.5}>
      <Zoom a={12.2} b={13.5} s1={2.6} ox="540px 900px">
        <Row3 y={500} gap={16}><TChip at={3.5} l="Aucun manuel" c={DIM} ic="CircleX" /><TChip at={4.2} l="Aucune certification" c={DIM} ic="CircleX" /></Row3>
        <LBook cx={540} cy={1000} at={2.8} open={6.1} />
        <Center y={1290}><NBadge at={8.8} text="LA LEÇON DU TERRAIN" bg={LN} rot={-2} size={30} /></Center>
      </Zoom>
    </Ph>
    <Ph a={13.45} b={17.25}>
      <LSeal cx={540} cy={880} at={13.6} crack={15.9} />
      <Center y={1210}><NBadge at={16.4} text="LE SECRET DE POLICHINELLE" bg={LR} rot={-2} size={30} /></Center>
    </Ph>
    <Ph a={17.2} b={20.45}>
      <Abs x={0} y={440} w={1080} h={900}><Ring3D imgs={FIELD} at={17.3} w={1080} h={900} cw={400} ch={500} R={620} cy={0.45} /></Abs>
      <Center y={1290}><NBadge at={19.5} text="LA SAGESSE COLLECTIVE DU TERRAIN" bg={LN} rot={-2} size={28} /></Center>
    </Ph>
    <Ph a={20.4} b={26.85}>
      <Row3 y={480} gap={16}><TChip at={22.2} l="Formation ISO" c={DIM} ic="CircleX" /><TChip at={23.4} l="Des années de terrain" c={LG} ic="CircleCheckBig" fill /></Row3>
      <LEngrave cx={540} cy={930} at={20.6} burn={25.3} text="EXPÉRIENCE" />
    </Ph>
    <Ph a={26.8} b={36.65}><LBinders at={29.4} audit={32.3} boom={35.2} /></Ph>
    <Ph a={36.6} b={41.0}><LGap cy={880} at={36.7} split={38.1} /></Ph>
    <Ph a={40.95} b={47.0}>
      <SearchOpen x={60} y={450} w={960} h={930} at={41.1} query="25 lois invisibles QHSE" results={['Les 25 lois invisibles QHSE', 'Les lois du facteur humain', 'Les lois du leadership']} found={0} foundAt={43.3} clickAt={43.7} c={LN}>
        <L25 x={60} y={10} w={780} at={44.4} lit={[1, 5, 9, 10, 14, 21, 22, 23, 25]} />
      </SearchOpen>
    </Ph>
    <Ph a={46.95} b={51.25}><LPuppet at={47.0} labels={[['Qualité', LB, 47.6], ['Sécurité', LR, 48.2], ['Environnement', LG, 48.8]]} /></Ph>
    <Ph a={51.6} b={56.4}><LOrg at={51.7} cy={880} /></Ph>
  </Out>
);

/* ═════════════ Guichet 2 : le facteur humain ═════════════ */
const G1: React.FC = () => (
  <Out end={145.85}>
    <Heads h={[[58.2, ['Le plus crucial', 'et le plus sous-estimé'], [0]], [62.2, ["L'humain", 'au cœur'], [0]], [69.7, ['Loi n° 9', "L'erreur est humaine"], [1]], [83.9, ['La deuxième partie', 'qui change tout'], [1]], [93.2, ['Des systèmes', 'assez solides'], [1]], [98.3, ['La responsabilité', 'glisse'], [1]], [105.2, ['Le modèle du', 'fromage suisse'], [1]], [124.3, ['Ajouter', 'des tranches'], [1]], [130.2, ['Loi n° 10', 'Le danger se ressent'], [1]], [136.5, ['Loi n° 22', 'La fatigue invisible'], [1]]]} />
    <Ph a={58.2} b={69.65}>
      <LOrbit cx={540} cy={880} at={58.4} items={[['Comportements', 65.6, LN], ['Perceptions', 66.8, LB], ['Faiblesses', 68.4, LR]]} />
      <Center y={1250}><NBadge at={62.2} text="L'HUMAIN AU CŒUR" bg={LN} rot={-2} size={30} /></Center>
    </Ph>
    <Ph a={69.6} b={83.85}>
      <LLaw n={9} title="L'erreur est humaine. Point." at={70.2} c={LR} />
      <Col y={840}><TChip at={75.8} l="L'accepter n'est pas être laxiste" c={LN} ic="Scale" /><TChip at={79.4} l="Construire un système intelligent" c={LG} ic="Cog" fill /></Col>
      <Center y={1150}><SlamTag at={82.7} text="BATAILLE PERDUE D'AVANCE" c={LR} rot={-4} size={50} /></Center>
    </Ph>
    <Ph a={83.8} b={89.05}><ZInk src={IMG.accuse} x={60} y={470} w={960} h={800} at={84.0} c={LR} tag="LE SYSTÈME, PAS LA PERSONNE" pos="50% 50%" /></Ph>
    <Ph a={89.0} b={93.1}>
      <Bubble at={89.1} text="« C'est sa faute ! »" c={LR} y={640} strike={92.0} />
      <Center y={980}><SlamTag at={92.0} text="NON." c={LR} rot={-6} size={110} /></Center>
    </Ph>
    <Ph a={93.0} b={98.3}>
      <LPlane cy={880} at={95.3} net={94.3} />
      <Center y={1260}><TChip at={97.6} l="Pas de désastre" c={LG} ic="ShieldCheck" fill /></Center>
    </Ph>
    <Ph a={98.25} b={104.95}><LSlide cy={900} at={98.4} slide={99.8} /></Ph>
    <Ph a={104.9} b={124.35}>
      <LSwiss cy={880} at={106.0} align={120.8} shoot={122.3} />
      <Ph a={116.4} b={120.8}><Center y={480}><NBadge at={116.6} text="DES TROUS, DES FAILLES" bg={LR} rot={-2} size={30} /></Center></Ph>
      <Center y={480}><SlamTag at={123.4} text="ACCIDENT" c={LR} rot={-4} size={56} /></Center>
      <Ph a={112.5} b={120.8}><Row3 y={1230} gap={14}><TChip at={112.8} l="Procédure" c={LN} fs={28} /><TChip at={113.5} l="Équipement" c={LN} fs={28} /><TChip at={114.5} l="Formation" c={LN} fs={28} /></Row3></Ph>
    </Ph>
    <Ph a={124.3} b={129.05}>
      <LSwiss cy={880} at={124.4} align={1e9} shoot={1e9} n={8} />
      <Center y={1250}><TChip at={127.8} l="Alignement quasi impossible" c={LG} ic="ShieldCheck" fill /></Center>
    </Ph>
    <Ph a={129.0} b={136.45}>
      <LLaw n={10} title="On évalue un danger avec nos tripes" at={130.3} c={LB} />
      <LBalance cy={880} at={131.6} tip={134.0} l="Logique" r="Émotions" />
    </Ph>
    <Ph a={136.4} b={145.9}>
      <LLaw n={22} title="La fatigue, souvent invisible" at={136.7} c={LR} />
      <ZInk src={IMG.fatigue} x={60} y={800} w={560} h={460} at={138.0} c={LR} tag="FATIGUE" pos="50% 40%" />
      <LBattery x={680} y={790} at={138.6} drain={4.5} />
      <Center y={1290}><TChip at={145.1} l="Notre propre biologie" c={LR} ic="Activity" /></Center>
    </Ph>
  </Out>
);

/* ═════════════ Guichet 3 : la réalité du système ═════════════ */
const G2: React.FC = () => (
  <Out end={218.15}>
    <Heads h={[[147.6, ["Après l'humain", 'le système'], [1]], [158.9, ['Loi n° 5', 'Un danger paradoxal'], [1]], [166.5, ['Le plus grand risque', 'la routine'], [1]], [176.0, ['Loi n° 21', 'Le fossé'], [1]], [186.5, ['Travail réel', 'et travail prescrit'], [0, 1]], [194.5, ['Loi n° 14', 'Le coût de la prévention'], [1]], [205.3, ['Le coût réel', "d'un accident"], [1]], [214.4, ['Le véritable', 'investissement'], [1]]]} />
    <Ph a={147.7} b={158.9}>
      <LTri cy={840} at={148.5} items={[['Culture', 151.6, LY], ['Complexité', 152.4, LB], ['Coûts', 154.6, LR]]} />
      <Center y={1270}><NBadge at={156.4} text="ÇA FAÇONNE LES RÉSULTATS QHSE" bg={LN} rot={-2} size={28} /></Center>
    </Ph>
    <Ph a={158.85} b={166.95}>
      <LLaw n={5} title="Un danger totalement paradoxal" at={159.9} c={LR} />
      <Bubble at={163.6} text="« L'inconnu est le plus dangereux »" c={DIM} y={900} strike={166.0} fs={40} />
    </Ph>
    <Ph a={166.9} b={175.85}>
      <LRoutine cx={460} cy={860} at={167.0} danger={174.2} />
      <Row3 y={1220} gap={14}><TChip at={171.1} l="Excès de confiance" c={LR} fs={28} /><TChip at={172.3} l="Baisse de vigilance" c={LR} fs={28} /></Row3>
    </Ph>
    <Ph a={175.8} b={179.45}><LLaw n={21} title="Procédures écrites contre réalité du terrain" at={176.2} c={LN} /><Center y={880}><Ico n="FolderOpen" size={300} c={LN} /></Center></Ph>
    <Ph a={179.4} b={194.45}>
      <LTorn at={179.5} tear={179.9} y={470} h={740} left={['La réalité du terrain', [['Un joyeux bazar', 185.3], ["S'adapter en permanence", 187.5]]]} right={['Les procédures écrites', [['Bien rangées', 181.8], ['Version idéale', 191.6]]]} />
      <Ph a={192.5} b={194.45}><LNine y={1240} at={192.6} /></Ph>
    </Ph>
    <Ph a={194.4} b={199.05}><LLaw n={14} title="Le coût de la prévention, le coût d'un accident" at={194.8} c={LG} /><Center y={880}><Ico n="Scale" size={300} c={LG} /></Center></Ph>
    <Ph a={199.0} b={214.35}>
      <LBalance cy={820} at={199.1} tip={205.6} l="Prévention" r="Accident" />
      <Row3 y={1280} gap={12}><TChip at={209.2} l="Production perdue" c={LR} fs={26} /><TChip at={210.3} l="Image de marque" c={LR} fs={26} /><TChip at={211.3} l="Frais juridiques" c={LR} fs={26} /></Row3>
    </Ph>
    <Ph a={214.3} b={218.2}>
      <LPlant cx={540} base={1200} at={214.5} />
      <Center y={480}><SlamTag at={216.0} text="LE VRAI INVESTISSEMENT" c={LG} rot={-3} size={50} /></Center>
    </Ph>
  </Out>
);

/* ═════════════ Guichet 4 : l'impératif leadership ═════════════ */
const G3: React.FC = () => {
  const t = useT();
  return (
    <Out end={280.2}>
      <Heads h={[[220.0, ['Tout en haut', 'de la pyramide'], [1]], [221.0, ['Le facteur décisif', 'le leadership'], [1]], [231.4, ['Loi n° 1', "L'engagement de la direction"], [1]], [236.5, ['Pas juste', 'signer un papier'], [1]], [240.2, ['Ça se voit', 'au quotidien'], [1]], [247.4, ['La loi', "de l'exemple"], [1]], [254.8, ['Ce qu’ils disent', 'ce qu’ils font'], [0, 1]], [264.2, ['Le point clé', 'la constance'], [1]], [266.9, ['Loi n° 23', 'La culture se tricote'], [1]], [274.2, ['5 minutes', 'chaque matin'], [0]]]} />
      <Ph a={220.0} b={226.85}><LPyramid cy={880} at={220.1} levels={[['Humain', LB, 220.3], ['Système', LN, 221.3], ['Leadership', LY, 224.1]]} /></Ph>
      <Ph a={226.8} b={231.35}>
        <ZInk src={IMG.direction} x={60} y={470} w={960} h={640} at={226.9} c={LR} tag="SANS ENGAGEMENT RÉEL" pos="50% 40%" />
        <Center y={1140}><TChip at={227.5} l="Engagement sincère et visible" c={LG} ic="Eye" fill /></Center>
        <Center y={1260}><NBadge at={230.6} text="SINON : DE LA BELLE LITTÉRATURE" bg={LR} rot={-2} size={28} /></Center>
      </Ph>
      <Ph a={231.3} b={236.45}><LLaw n={1} title="L'engagement de la direction" at={232.0} c={LY} /><LArch cx={540} cy={1080} at={233.2} key0={234.8} /></Ph>
      <Ph a={236.4} b={240.15}><LSign cx={540} cy={880} at={236.6} ban={239.4} /></Ph>
      <Ph a={240.1} b={247.35}>
        <Center y={480}><div style={{transform: `scale(${1 + 0.05 * Math.sin(t * 4)})`}}><Ico n="Eye" size={280} c={LN} /></div></Center>
        <Col y={860} gap={26}><TChip at={242.5} l="Les choix" c={LN} ic="Signpost" /><TChip at={244.0} l="Les budgets accordés" c={LN} ic="ChartColumn" /><TChip at={245.6} l="Le temps des managers" c={LN} ic="Clock" /></Col>
      </Ph>
      <Ph a={247.3} b={254.75}>
        <LSteps y={1000} at={247.6} follow={250.6} />
        <Center y={1250}><NBadge at={249.1} text="UNE PUISSANCE REDOUTABLE" bg={LN} rot={-2} size={30} /></Center>
      </Ph>
      <Ph a={254.7} b={266.85}>
        <LSayDo at={254.8} say={["La sécurité d'abord", 255.5]} doIt={['Prend un raccourci dangereux', 257.4]} y={470} />
        <Ph a={261.2} b={265.7}><Center y={1250}><SlamTag at={261.3} text="LA PRODUCTION PASSE AVANT" c={LR} rot={-3} size={44} /></Center></Ph>
        <Center y={1250}><SlamCard at={265.9} lines={['CONSTANCE']} c={LG} rot={-3} size={50} /></Center>
      </Ph>
      <Ph a={266.8} b={274.15}>
        <LLaw n={23} title="La culture sécurité se tricote au jour le jour" at={267.2} c={LG} />
        <LKnit cx={480} top={890} at={269.4} dur={4.4} rows={9} />
        <Center y={1290}><TChip at={271.8} l="Pas le grand discours annuel" c={DIM} ic="CircleX" /></Center>
      </Ph>
      <Ph a={274.1} b={280.25}>
        <LDaily cy={800} at={274.2} dur={4.5} />
        <Center y={1230}><TChip at={274.6} l="5 minutes chaque matin" c={LG} ic="Clock" fill /></Center>
        <LAnchor cx={900} at={278.6} y1={760} />
      </Ph>
    </Out>
  );
};

/* ═════════════ Guichet 5 : la leçon ultime ═════════════ */
const G4: React.FC = () => (
  <Out end={327.35}>
    <Heads h={[[282.0, ["Qu'est-ce qu'on", 'retient ?'], [1]], [285.4, ['Une conclusion', 'simple et profonde'], [0]], [289.1, ['Tous les experts', 'au même constat'], [1]], [295.5, ['La technique', 'ne suffit pas'], [0]], [300.1, ['Le vrai levier', 'est ailleurs'], [1]], [307.9, ['Loi n° 25', 'La plus humble'], [1]], [313.8, ['Pas un trophée', 'gagné pour toujours'], [1]], [319.0, ['Un succès', 'fragile'], [1]]]} />
    <Ph a={282.0} b={288.95}><LDistill cx={540} cy={860} at={282.1} drop={285.6} /></Ph>
    <Ph a={288.9} b={295.45}>
      <LJuggle cx={540} cy={820} at={289.1} balls={[['Normes', LB, 291.2], ['Outils', LG, 291.7], ['Audits', LR, 292.2]]} />
      <Center y={1260}><NBadge at={294.3} text="LE MÊME CONSTAT" bg={LN} rot={-2} size={30} /></Center>
    </Ph>
    <Ph a={295.4} b={307.85}><LIceberg at={295.5} dive={302.5} top={[['Technique', 295.6], ['Procédures', 298.6]]} bottom={[['Comportement humain', 304.7], ['Leadership', 306.8]]} /></Ph>
    <Ph a={307.8} b={313.75}><LLaw n={25} title="La plus importante, et la plus humble" at={310.2} c={LY} /><Center y={880}><Ico n="ShieldCheck" size={300} c={LG} /></Center></Ph>
    <Ph a={313.7} b={318.95}>
      <LTrophy cx={540} cy={860} at={313.9} crack={316.6} />
      <Center y={1240}><TChip at={317.6} l="Pas une bonne fois pour toutes" c={LR} ic="CircleX" /></Center>
    </Ph>
    <Ph a={318.9} b={327.4}>
      <LJenga cx={540} base={1200} at={319.0} pull={322.7} />
      <Center y={480}><NBadge at={323.4} text="UN SUCCÈS FRAGILE" bg={LR} rot={-2} size={32} /></Center>
      <Center y={1250}><TChip at={326.0} l="Une vigilance de tous les instants" c={LN} ic="Eye" fill /></Center>
    </Ph>
  </Out>
);

/* ═════════════ Guichet 6 : la vraie question ═════════════ */
const G5: React.FC = () => (
  <Out end={OUTRO_AT}>
    <Heads h={[[329.2, ['Pas les connaître', 'les appliquer'], [1]], [334.5, ['Les petits', 'signaux faibles'], [1]], [338.6, ['Quel détail', 'écouterez-vous demain ?'], [1]]]} />
    <Ph a={329.2} b={334.45}>
      <LToggle cy={720} at={329.3} flip={333.5} />
      <L25 x={330} y={960} w={420} at={331.2} lit={[1, 5, 9, 10, 14, 21, 22, 23, 25]} />
    </Ph>
    <Ph a={334.4} b={338.65}><LWeak cy={900} at={334.5} amp={337.1} /></Ph>
    <Ph a={338.6} b={OUTRO_AT}>
      <LEar cx={640} cy={720} at={338.7} />
      <Col y={1020} gap={20}><TChip at={342.4} l="Le petit détail" c={LN} ic="Search" /><TChip at={343.4} l="La remarque anodine" c={LN} ic="MessageCircle" /><TChip at={345.2} l="Le presque-accident" c={LR} ic="TriangleAlert" fill /></Col>
    </Ph>
  </Out>
);

/* ═════════════ Police de la vidéo : Cambria (repli Caladea embarqué) ═════════════ */
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-Regular.ttf'), weight: '400'});
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-Bold.ttf'), weight: '700'});
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-Italic.ttf'), weight: '400', style: 'italic'});
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-BoldItalic.ttf'), weight: '700', style: 'italic'});
const CAMBRIA_CSS = ".cambria, .cambria * { font-family: Cambria, 'Caladea', Georgia, serif !important; }";

/* ═════════════ Couverture : orbite 3D des lois citées + titre en lettres-photos animées ═════════════ */
const COVER_LAWS: [number, string, string][] = [[1, 'Engagement', LY], [5, 'Routine', LR], [9, 'Erreur humaine', LR], [10, 'Émotions', LB], [14, 'Prévention', LG], [21, 'Terrain', LN], [22, 'Fatigue', LR], [23, 'Constance', LG], [25, 'Vigilance', LY]];
const KOrbitLaws: React.FC<{cx: number; cy: number; at: number}> = ({cx, cy, at}) => {
  const t = useT();
  const app = Math.min(1, sp(t, at, 7, 12));
  const els = COVER_LAWS.map(([n, l, c], i) => { const th = (i / COVER_LAWS.length) * Math.PI * 2 + t * 0.85; return {n, l, c, x: Math.sin(th) * 400 * app, z: Math.cos(th)}; }).sort((u, v) => u.z - v.z);
  return <>{els.map(({n, l, c, x, z}) => { const sc = 0.6 + 0.4 * ((z + 1) / 2); return <div key={n} style={{position: 'absolute', left: cx + x, top: cy + z * 130, transform: `translate(-50%, -50%) scale(${sc})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.35 + 0.65 * ((z + 1) / 2), zIndex: Math.round(z * 10) + 20, filter: z < -0.3 ? 'blur(1.5px)' : undefined}}><div style={{width: 120, height: 120, borderRadius: 22, background: NBK, border: `5px solid ${c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: `6px 6px 0 ${c}`}}><div style={{...CAP, fontSize: 16, color: '#fff'}}>Loi</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 56, color: c, lineHeight: 1}}>{n}</div></div><div style={{...nb('#fff', 4), borderColor: NBK, padding: '3px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK, whiteSpace: 'nowrap'}}>{l}</div></div>; })}</>;
};
const KCover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Bg />
      <Abs x={0} y={40} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.14)'}}><Img src={staticFile(LOGO)} style={{height: 76, display: 'block'}} /></div></Abs>
      <Abs x={0} y={180} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb(LN, 6), borderColor: NBK, padding: '8px 22px', ...CAP, fontSize: 26, color: '#fff'}}>QHSE · au-delà des manuels</div></Abs>
      <KOrbitLaws cx={540} cy={560} at={0.05} />
      <Abs x={0} y={820} w={1080} style={{display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap', zIndex: 40}}><PhotoLetterAnim ch="LES 25 LOIS" src={IMG.cover} size={150} ls={4} seed={6} /></Abs>
      <Abs x={0} y={1010} w={1080} style={{display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap', zIndex: 40}}><PhotoLetterAnim ch="INVISIBLES" src={IMG.c1} size={140} ls={3} seed={11} /></Abs>
      <Abs x={0} y={1200} w={1080} style={{display: 'flex', justifyContent: 'center', zIndex: 40}}><div style={{...nb(LY, 6), borderColor: NBK, padding: '6px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: NBK, transform: `scale(${Math.min(1, sp(t, 0.7, 9, 12))}) rotate(-3deg)`}}>QHSE</div></Abs>
      <Abs x={60} y={1400} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden', zIndex: 40}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 80 + k * 160 - 18, top: 28, width: 36, height: 36, borderRadius: 9, background: x.c, border: '4px solid #fff', boxSizing: 'border-box'}} />)}
        <div style={{position: 'absolute', left: 80 + 0.5 * 160 - 28, top: 36}}><Capsule w={56} c={NAVY} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 80 + k * 160 - 70, width: 140, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 18, color: x.c}}>{x.g}</div>)}
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
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8}, ...rep(0.2, 9, 0.08, 'sfx/ding', 0.1),
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at + 0.15, s: 'sfx/bell', v: 0.14})),
  // introduction
  ...pops([3.5, 4.2]), {at: 6.1, s: 'sfx/rise', v: 0.22, dur: 1.5}, {at: 8.8, s: 'tampon', v: 0.3}, {at: 12.2, s: 'soft-whoosh', v: 0.45, dur: 1.4},
  {at: 13.6, s: 'sfx/pop', v: 0.2}, {at: 15.9, s: 'sfx/thud', v: 0.4}, {at: 16.2, s: 'sfx/swish', v: 0.3}, {at: 16.4, s: 'tampon', v: 0.3},
  {at: 17.3, s: 'soft-whoosh', v: 0.35, dur: 2}, {at: 19.5, s: 'tampon', v: 0.3}, ...pops([22.2, 23.4]), ...rep(25.3, 16, 0.1, 'tick', 0.1),
  ...rep(29.4, 7, 0.18, 'sfx/thud', 0.18), ...rep(32.6, 4, 0.25, 'sfx/click', 0.25), {at: 35.2, s: 'bass-hit', v: 0.45}, ...rep(35.3, 6, 0.12, 'sfx/pop', 0.15),
  {at: 38.1, s: 'sfx/rise', v: 0.2, dur: 1.8}, ...searchCues(41.1, 23, 43.3, 43.7), ...rep(44.4, 9, 0.08, 'sfx/click', 0.1),
  {at: 47.0, s: 'soft-whoosh', v: 0.3, dur: 1}, ...pops([47.6, 48.2, 48.9]), {at: 51.7, s: 'soft-whoosh', v: 0.3, dur: 1}, ...rep(51.8, 7, 0.08, 'sfx/pop', 0.1),
  // facteur humain
  {at: 58.4, s: 'soft-whoosh', v: 0.3, dur: 1.5}, {at: 62.2, s: 'tampon', v: 0.3}, ...pops([65.7, 66.8, 68.4]),
  {at: 70.2, s: 'sfx/click', v: 0.4}, {at: 70.35, s: 'sfx/click', v: 0.4}, ...pops([75.8, 79.4]), {at: 82.7, s: 'tampon', v: 0.42},
  {at: 84.0, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 89.1, s: 'sfx/pop', v: 0.25}, {at: 92.0, s: 'bass-hit', v: 0.4}, {at: 92.02, s: 'sfx/swish', v: 0.35},
  {at: 94.3, s: 'sfx/pop', v: 0.2}, {at: 95.3, s: 'soft-whoosh', v: 0.35, dur: 2}, {at: 97.3, s: 'sfx/thud', v: 0.35}, {at: 97.6, s: 'validation', v: 0.25},
  {at: 99.8, s: 'sfx/swish', v: 0.3}, {at: 101.0, s: 'sfx/thud', v: 0.3},
  ...rep(106.0, 5, 0.12, 'sfx/pop', 0.18), ...pops([112.8, 113.5, 114.5]), {at: 116.6, s: 'tampon', v: 0.3}, {at: 120.8, s: 'sfx/rise', v: 0.25, dur: 1.2}, {at: 122.3, s: 'sfx/swish', v: 0.4}, {at: 123.4, s: 'bass-hit', v: 0.5},
  ...rep(124.4, 8, 0.12, 'sfx/pop', 0.15), {at: 127.8, s: 'validation', v: 0.25},
  {at: 130.3, s: 'sfx/click', v: 0.35}, {at: 134.0, s: 'sfx/thud', v: 0.35}, {at: 136.7, s: 'sfx/click', v: 0.35}, {at: 138.0, s: 'soft-whoosh', v: 0.3, dur: 1}, ...rep(139.0, 8, 0.5, 'tick', 0.12), {at: 145.1, s: 'sfx/pop', v: 0.2},
  // système
  ...[151.6, 152.4, 154.6].map((at) => ({at, s: 'sfx/thud', v: 0.25})), {at: 156.4, s: 'tampon', v: 0.3},
  {at: 160.0, s: 'sfx/click', v: 0.35}, {at: 163.6, s: 'sfx/pop', v: 0.2}, {at: 166.0, s: 'sfx/swish', v: 0.35},
  ...rep(167.0, 16, 0.45, 'tick', 0.1), ...pops([171.1, 172.3]), {at: 174.2, s: 'bass-hit', v: 0.4},
  {at: 176.2, s: 'sfx/click', v: 0.35}, {at: 179.9, s: 'sfx/swish', v: 0.45}, {at: 180.0, s: 'sfx/thud', v: 0.3}, ...pops([181.8, 185.3, 187.5, 191.6]), ...rep(192.6, 10, 0.08, 'sfx/pop', 0.12),
  {at: 194.8, s: 'sfx/click', v: 0.35}, {at: 199.1, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 205.6, s: 'sfx/thud', v: 0.45}, ...pops([209.2, 210.3, 211.3]), {at: 214.5, s: 'sfx/rise', v: 0.22, dur: 1.6}, {at: 216.0, s: 'tampon', v: 0.4},
  // leadership
  ...[220.3, 221.3, 224.1].map((at) => ({at, s: 'sfx/thud', v: 0.35})), {at: 224.3, s: 'validation', v: 0.3},
  {at: 226.9, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 227.5, s: 'sfx/pop', v: 0.2}, {at: 230.6, s: 'tampon', v: 0.3},
  {at: 232.0, s: 'sfx/click', v: 0.35}, {at: 234.8, s: 'bass-hit', v: 0.4}, {at: 236.8, s: 'sfx/swish', v: 0.2, dur: 1}, {at: 239.4, s: 'sfx/swish', v: 0.4},
  ...pops([242.5, 244.0, 245.6]), ...rep(247.6, 9, 0.25, 'tick', 0.14), {at: 249.1, s: 'tampon', v: 0.3},
  {at: 255.5, s: 'sfx/pop', v: 0.25}, {at: 257.4, s: 'sfx/swish', v: 0.35}, {at: 257.6, s: 'bass-hit', v: 0.3}, {at: 261.3, s: 'tampon', v: 0.42}, {at: 265.9, s: 'tampon', v: 0.38},
  {at: 267.2, s: 'sfx/click', v: 0.35}, ...rep(269.4, 18, 0.24, 'tick', 0.1), {at: 271.8, s: 'sfx/pop', v: 0.2},
  ...rep(274.2, 14, 0.32, 'sfx/swish', 0.08), {at: 274.6, s: 'sfx/pop', v: 0.22}, {at: 278.6, s: 'sfx/rise', v: 0.2, dur: 0.5}, {at: 279.05, s: 'bass-hit', v: 0.45},
  // leçon ultime
  {at: 282.1, s: 'soft-whoosh', v: 0.3, dur: 2}, {at: 285.6, s: 'sfx/rise', v: 0.2, dur: 0.8}, {at: 286.4, s: 'sfx/ding', v: 0.3},
  ...[291.2, 291.7, 292.2].map((at) => ({at, s: 'sfx/pop', v: 0.22})), {at: 294.3, s: 'tampon', v: 0.3},
  {at: 295.6, s: 'sfx/pop', v: 0.2}, {at: 298.6, s: 'sfx/pop', v: 0.2}, {at: 302.5, s: 'soft-whoosh', v: 0.45, dur: 1.5}, ...pops([304.7, 306.8]),
  {at: 310.3, s: 'sfx/click', v: 0.35}, {at: 313.9, s: 'validation', v: 0.25}, {at: 316.6, s: 'sfx/swish', v: 0.4}, {at: 316.65, s: 'sfx/thud', v: 0.35},
  ...rep(319.0, 14, 0.06, 'sfx/click', 0.08), {at: 322.7, s: 'sfx/swish', v: 0.3}, {at: 323.4, s: 'tampon', v: 0.35}, {at: 326.0, s: 'sfx/pop', v: 0.2},
  // vraie question
  {at: 331.2, s: 'soft-whoosh', v: 0.25, dur: 1}, {at: 333.5, s: 'sfx/click', v: 0.5}, {at: 333.6, s: 'validation', v: 0.25},
  {at: 334.5, s: 'sfx/rise', v: 0.15, dur: 2.5}, {at: 337.1, s: 'sfx/ding', v: 0.3}, {at: 338.7, s: 'soft-whoosh', v: 0.3, dur: 1.5}, ...pops([342.4, 343.4, 345.2]), {at: 347.35, s: 'sfx/swish', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];
const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SCN: [React.FC, number, number][] = [[Intro, 2.6, 56.4], [G1, 58.2, 145.9], [G2, 147.7, 218.2], [G3, 220.0, 280.2], [G4, 282.0, 327.4], [G5, 329.2, OUTRO_AT]];
export const LoisInvisiblesMetro: React.FC = () => (
  <AbsoluteFill className="cambria" style={{background: PAPER}}>
    <style>{CAMBRIA_CSS}</style>
    <Bg />
    {SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7 / TK}><TimeWarp.Provider value={{at: x.at, k: TK}}><C i={i} /></TimeWarp.Provider></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><KCover /></Gate>
    <Gate from={347.2} to={OUTRO_AT + 0.3}><JCrtOff at={347.35} /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-25-lois-invisibles-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u2 = [wn, Avatar, Ring3D, SlamTag, Arrow, slamK, CAP, STAGE, SCAN, RING_ISO, Drum, Marked, Announce, MBadge, RailSteps, StairSteps, ZigSteps, QBubble, Grid15, RameWipe, Forklift, ICO, MC, ACR, lin, hexMix, cl, GyroFlash, Hot, Photo, Pill2, Ph, TChip, Row3, SlamCard, ZInk, ZTicker, ZAxis, ZDef, CI, CD, METH, JCirText, JMirror, JNewton, JFuse, JShock, JTree, JAccordion, JRing, JButterfly, JAmdec, JHazop, JHourglass, JRewind, JFlipArrow, JBoard, JYarn, JPrint, JFault, JGears, JYinYang, JConstellation, CONST, ESiren, ECompass, ENeonExit, EFloorPlan, EBlackout, EVestDrop, EQueue, EDoor, ESonar, ERadio, EHub, EConfusion, EDice, ETape, EChess, EFunnel, ETally, EGavel, EBaton, EFiretruck, EGauge, EDomino, ECycle, EMonths, EChecklist, ESpiral, EFeather, EOdometer, ECrack, ENail, ETarget, EUnity, ExitRunner, AssemblyIcon, Vest, CG, CR, CY, CO, LGearsTol, JCrtOff];

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn, Barred, Flap];
