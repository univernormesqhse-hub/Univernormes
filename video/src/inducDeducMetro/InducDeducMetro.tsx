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
 * « Les méthodes inductives et déductives d'analyse des risques » (voix d'origine, 1 min 21) — capsule
 * « condensé de toutes les techniques + effet wahou + ultra premium » en métro. Tube de verre à six guichets
 * (deux démarches → inductives → exemples inductifs → déductives → exemples déductifs → en résumé), capsule
 * qui file d'un guichet à l'autre, gyrophare resserré par TimeWarp, barre de recherche qui ouvre les deux arbres
 * déductifs. Police Cambria (repli Caladea). Couverture : constellation des méthodes citées + titre en
 * lettres-photos animées « INDUCTIVES ou DÉDUCTIVES ». Techniques nouvelles : texte qui court sur un cercle,
 * miroir qui reflète l'approche inductive en approche déductive, pendule de Newton (la cause frappe, l'effet
 * s'envole), mèche allumée qui court jusqu'à l'accident, onde de choc à aberration chromatique, arbre qui se
 * ramifie vers les conséquences, accordéon des sept méthodes, carrousel orbital, papillon qui se transforme en
 * nœud papillon, mini-tableau AMDE qui reçoit la colonne criticité (AMDEC), mini-canalisation HAZOP, sablier qui
 * se retourne, rembobinage VHS qui rejoue la mèche à l'envers (TimeWarp négatif), flèche élastique qui se
 * retourne, tableau d'enquête à punaises et fils rouges, pelote qui se dévide jusqu'aux causes, empreinte
 * digitale révélée à la loupe, arbre des causes inversé, arbre de défaillances à portes ET / OU, engrenages
 * réversibles, yin-yang complémentaire, extinction d'écran cathodique. Sous-titres NeoCaptions, sans musique.
 */
const IMG = {
  cover: 'hazop-gen/gazier.jpg',
  c1: 'evalrisques-gen/detective.jpg',
  c2: 'taproot-gen/tableau-preuves.jpg',
  ind: 'hazop-gen/gazier.jpg',
  ded: 'evalrisques-gen/detective.jpg',
  apr: 'apr-gen/consignation-apr.jpg',
  acc: 'incident/chute-entrepot.jpg',
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
const OUTRO_AT = 81.0;
export const INDUC_DEDUC_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '0', title: 'Deux démarches', s: 'Analyse des risques', c: NAVY, g: 'intro', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 8.05, n: '1', title: 'Méthodes inductives', s: 'Des causes vers les effets', c: '#E04E3C', g: 'inductives', k: 'gyro', lab: 'GUICHET 2 / 6 · DÉMARCHE 1'},
  {at: 24.35, n: '2', title: 'Exemples inductifs', s: '7 méthodes citées', c: '#E04E3C', g: 'ex. induc.', k: 'gyro', lab: 'GUICHET 3 / 6'},
  {at: 40.35, n: '3', title: 'Méthodes déductives', s: 'Des effets vers les causes', c: '#E8901E', g: 'déductives', k: 'gyro', lab: 'GUICHET 4 / 6 · DÉMARCHE 2'},
  {at: 60.45, n: '4', title: 'Exemples déductifs', s: '2 méthodes citées', c: '#E8901E', g: 'ex. déduc.', k: 'gyro', lab: 'GUICHET 5 / 6'},
  {at: 67.6, n: '✓', title: 'En résumé', s: 'Démarches complémentaires', c: BURG, g: 'synthèse', k: 'gyro', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 80.2;
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
  {n: 1, l: 'Méthodes inductives', s: 'Inductives', at: 12.0},
  {n: 2, l: 'Événement initiateur', s: 'Événement', at: 17.0},
  {n: 3, l: 'Analyse préliminaire des risques', s: 'APR', at: 28.8},
  {n: 4, l: 'AMDE et AMDEC', s: 'AMDEC', at: 33.3},
  {n: 5, l: 'Nœud papillon', s: 'Papillon', at: 36.2},
  {n: 6, l: 'Méthodes déductives', s: 'Déductives', at: 48.7},
  {n: 7, l: 'Accident', s: 'Accident', at: 52.7},
  {n: 8, l: 'Arbre des causes', s: 'Arbre', at: 64.7},
  {n: 9, l: 'En résumé', s: 'Synthèse', at: 69.1},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE RISQUES · STATION {r.n} / 9</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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

/* ═════════════ Guichet 1 : deux démarches (miroir) ═════════════ */
const Intro: React.FC = () => (
  <Out end={8.0}>
    <Heads h={[[2.9, ["L'analyse des risques", 'deux démarches'], [1]], [5.4, ['Inductives', 'ou déductives'], [0, 1]]]} />
    <Ph a={2.65} b={5.45}>
      <Abs x={0} y={500} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb('#fff', 8), borderColor: NBK, padding: '6px 40px', display: 'flex', alignItems: 'baseline', gap: 16}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 150, color: NAVY, lineHeight: 1}}><Count n={2} a={3.7} b={4.3} /></span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 54, color: INK}}>grandes démarches</span></div></Abs>
      <JCirText cx={540} cy={1010} R={230} at={3.0} text="ANALYSE DES RISQUES · DEUX DÉMARCHES · " c={NAVY} />
      <Abs x={390} y={860} w={300} h={300} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6}}><Ico n="ShieldAlert" size={150} c={NAVY} /></Abs>
    </Ph>
    <Ph a={5.4} b={8.0}>
      <JMirror a={5.5} b={7.3} y={620} />
      <Row3 y={1040} gap={18}><TChip at={6.2} l="Inductives" c={CI} ic="ArrowRight" fill /><TChip at={7.9} l="Déductives" c={CD} ic="Search" fill /></Row3>
    </Ph>
  </Out>
);

/* ═════════════ Guichet 2 : méthodes inductives (pendule, mèche, onde de choc, arbre des conséquences) ═════════════ */
const G1: React.FC = () => {
  const t = useT();
  return (
  <Out end={24.3}>
    <Heads h={[[9.9, ['Les méthodes', 'inductives'], [1]], [13.2, ['Des causes', 'vers les effets'], [0, 1]], [15.2, ["On part d'un", 'événement'], [1]], [20.9, ['Susceptible de', 'provoquer un accident'], [1]], [22.6, ['Identifier les', 'conséquences'], [1]]]} />
    <Ph a={9.85} b={15.15}>
      <JNewton cx={540} y={500} at={10.0} hit={14.2} c={CI} />
      <Abs x={260} y={880} w={190} style={{textAlign: 'center', opacity: pop(t, 14.0)}}><div style={{...nb(CI, 5), borderColor: NBK, padding: '6px 0', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>Causes</div></Abs>
      <Abs x={630} y={880} w={190} style={{textAlign: 'center', opacity: pop(t, 14.8)}}><div style={{...nb(NAVY, 5), borderColor: NBK, padding: '6px 0', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>Effets</div></Abs>
      <ZInk src={IMG.ind} x={60} y={990} w={960} h={380} at={10.4} c={CI} tag="INDUCTIVE" pos="50% 40%" />
    </Ph>
    <Ph a={15.1} b={22.45}>
      <JFuse at={15.2} starts={[['Événement', 17.0], ['Défaillance', 18.3], ['Situation', 19.7]]} burn={[20.0, 21.6]} c={CI} />
      <JShock at={21.6} cx={940} cy={720} />
    </Ph>
    <Ph a={22.4} b={24.35}>
      <JTree cx={540} y={540} at={22.45} root="Accident" kids={[['Personnes', 22.85], ['Biens', 23.15], ['Environnement', 23.45]]} c={CI} h={380} spread={330} />
      <Abs x={0} y={1080} w={1080} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={23.6} text="CONSÉQUENCES POSSIBLES" bg={CI} rot={-2} size={30} /></Abs>
    </Ph>
  </Out>
  );
};

/* ═════════════ Guichet 3 : exemples inductifs (carrousel, accordéon, mini-animations) ═════════════ */
const G2: React.FC = () => (
  <Out end={40.3}>
    <Heads h={[[26.1, ['Exemples de méthodes', 'inductives'], [1]], [28.8, ['Analyse préliminaire', 'des risques'], [0, 1]], [31.4, ["L'arbre des", 'conséquences'], [1]], [33.2, ["L'AMDE", "et l'AMDEC"], [0, 1]], [35.1, ['La méthode', 'HAZOP'], [1]], [36.0, ['La méthode du', 'nœud papillon'], [1]], [38.4, ['La méthode', 'MADS-MOSAR'], [1]]]} />
    <Ph a={26.1} b={28.75}>
      <JRing cx={540} cy={800} at={26.2} items={METH.map((m) => m[0])} c={CI} R={330} />
      <Abs x={0} y={1110} w={1080} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={27.4} text="7 MÉTHODES CITÉES" bg={CI} rot={-3} size={30} /></Abs>
    </Ph>
    <Ph a={28.7} b={40.35}>
      <JAccordion x={60} y={460} w={960} rowH={66} items={METH.map(([l, d], i) => [l, d, [28.8, 31.4, 33.3, 34.2, 35.3, 36.2, 39.3][i]] as [string, string, number])} c={CI} />
      <Ph a={28.75} b={31.35}><ZInk src={IMG.apr} x={60} y={960} w={960} h={420} at={28.9} c={CI} tag="APR" pos="50% 45%" /></Ph>
      <Ph a={31.3} b={33.2}><JTree cx={540} y={1000} at={31.4} root="Événement" kids={[['Conséquence 1', 31.9], ['Conséquence 2', 32.2], ['Conséquence 3', 32.5]]} c={CI} h={250} spread={330} fs={26} /></Ph>
      <Ph a={33.15} b={35.15}><JAmdec x={170} y={1000} at={33.3} crit={34.2} /></Ph>
      <Ph a={35.1} b={36.1}><JHazop x={90} y={1010} at={35.15} c={CI} /></Ph>
      <Ph a={36.05} b={39.25}><JButterfly cx={540} cy={1180} at={36.1} morph={37.0} c={CD} /></Ph>
      <Ph a={39.2} b={40.35}><Abs x={0} y={1080} w={1080} style={{display: 'flex', justifyContent: 'center'}}><SlamCard at={39.3} lines={['MADS-MOSAR']} c={CI} rot={-3} size={76} /></Abs></Ph>
    </Ph>
  </Out>
);

/* ═════════════ Guichet 4 : méthodes déductives (sablier, rembobinage, flèche, tableau d'enquête, pelote) ═════════════ */
const G3: React.FC = () => (
  <Out end={60.4}>
    <Heads h={[[42.1, ['Les méthodes', 'déductives'], [1]], [44.2, ['Contrairement aux', 'méthodes inductives'], [1]], [49.8, ['Des effets', 'vers les causes'], [0, 1]], [52.7, ["On part d'un", 'accident'], [1]], [56.5, ['Rechercher les', 'événements et causes'], [1]]]} />
    <Ph a={42.1} b={44.45}>
      <JHourglass cx={540} cy={860} at={42.2} flip={44.0} />
    </Ph>
    <Ph a={44.4} b={48.8}>
      <JRewind a={44.45} b={48.75}>
        <TimeWarp.Provider value={{at: 34.04, k: -1.17}}>
          <JFuse at={15.2} starts={[['Événement', 17.0], ['Défaillance', 18.3], ['Situation', 19.7]]} burn={[20.0, 21.6]} c={CI} />
        </TimeWarp.Provider>
      </JRewind>
    </Ph>
    <Ph a={48.75} b={52.65}>
      <JFlipArrow y={470} at={48.8} flip={50.7} />
      <ZInk src={IMG.ded} x={60} y={800} w={960} h={560} at={49.0} c={CD} tag="DÉDUCTIVE" pos="50% 40%" />
    </Ph>
    <Ph a={52.6} b={56.5}>
      <JBoard x={60} y={480} w={960} h={760} at={52.6} center={['Accident', IMG.acc, 53.3]} pins={[['Défaillance', 175, 70, 54.4], ['Situation indésirable', 785, 70, 55.3]]} />
    </Ph>
    <Ph a={56.45} b={60.45}>
      <JPrint cx={540} cy={640} at={59.1} c={CD} />
      <JYarn y={1020} at={56.5} dur={3.4} stops={[['Événements', 57.7], ['Causes', 58.5]]} />
    </Ph>
  </Out>
);

/* ═════════════ Guichet 5 : exemples déductifs (recherche, arbre des causes, arbre de défaillances) ═════════════ */
const G4: React.FC = () => {
  const t = useT();
  return (
    <Out end={67.55}>
      <Heads h={[[62.2, ['Exemples de méthodes', 'déductives'], [1]], [64.7, ["L'arbre", 'des causes'], [1]], [66.1, ["L'arbre de", 'défaillances'], [1]]]} />
      <SearchOpen x={60} y={450} w={960} h={930} at={62.3} query="arbres déductifs" results={['Arbre des causes · arbre de défaillances', 'Méthodes inductives', 'Analyse préliminaire des risques']} found={0} foundAt={63.8} clickAt={64.15} c={CD}>
        <div style={{position: 'absolute', inset: 0, background: '#FBF7EE'}}>
          <div style={{position: 'absolute', left: 475, top: 30, width: 6, height: 800, background: '#E4DCCB'}} />
          <div style={{position: 'absolute', left: 20, top: 24, width: 440, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: CD, opacity: pop(t, 64.7)}}>Arbre des causes</div>
          <JTree cx={240} y={720} at={64.9} root="Accident" kids={[['Cause 1', 65.15], ['Cause 2', 65.4]]} c={CD} up h={400} spread={210} kw={180} fs={26} />
          <div style={{position: 'absolute', left: 495, top: 24, width: 440, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: CD, opacity: pop(t, 65.9)}}>Arbre de défaillances</div>
          <JFault x={485} y={120} at={65.9} c={CD} />
        </div>
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ Guichet 6 : en résumé (engrenages réversibles, yin-yang) ═════════════ */
const G5: React.FC = () => (
  <Out end={OUTRO_AT}>
    <Heads h={[[69.1, ['Inductives :', 'des causes aux effets'], [0]], [72.9, ['Déductives :', 'des effets aux causes'], [0]], [76.7, ['Deux démarches', 'complémentaires'], [1]]]} />
    <Ph a={69.35} b={76.65}>
      <JGears y={790} a={69.2} b={73.3} />
      <Row3 y={1170} gap={16}><TChip at={70.5} l="Partent des causes" c={CI} ic="ArrowRight" /><TChip at={74.8} l="Partent des effets" c={CD} ic="Search" /></Row3>
    </Ph>
    <Ph a={76.6} b={OUTRO_AT}>
      <JYinYang cx={540} cy={820} R={210} at={76.8} />
      <Abs x={0} y={1140} w={1080} style={{display: 'flex', justifyContent: 'center'}}><SlamTag at={80.0} text="COMPLÉMENTAIRES" c={BURG} rot={-4} size={58} /></Abs>
    </Ph>
  </Out>
);

/* ═════════════ Police de la vidéo : Cambria (repli Caladea embarqué) ═════════════ */
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-Regular.ttf'), weight: '400'});
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-Bold.ttf'), weight: '700'});
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-Italic.ttf'), weight: '400', style: 'italic'});
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-BoldItalic.ttf'), weight: '700', style: 'italic'});
const CAMBRIA_CSS = ".cambria, .cambria * { font-family: Cambria, 'Caladea', Georgia, serif !important; }";

/* ═════════════ Couverture : constellation des méthodes + titre en lettres-photos animées ═════════════ */
const KCover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Bg />
      <Abs x={0} y={40} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.14)'}}><Img src={staticFile(LOGO)} style={{height: 76, display: 'block'}} /></div></Abs>
      <Abs x={0} y={180} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb(NAVY, 6), borderColor: NBK, padding: '8px 22px', ...CAP, fontSize: 26, color: '#fff'}}>Analyse des risques · 2 démarches</div></Abs>
      <JConstellation at={0.1} />
      <Abs x={0} y={950} w={1080} style={{display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap'}}><PhotoLetterAnim ch="INDUCTIVES" src={IMG.ind} size={128} ls={3} seed={3} /></Abs>
      <Abs x={0} y={1095} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{fontFamily: handFont, fontSize: 64, color: BURG, transform: `rotate(-4deg) scale(${Math.min(1, sp(t, 0.6, 9, 12))})`}}>ou</div></Abs>
      <Abs x={0} y={1180} w={1080} style={{display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap'}}><PhotoLetterAnim ch="DÉDUCTIVES" src={IMG.ded} size={128} ls={3} seed={7} /></Abs>
      <Abs x={60} y={1400} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
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
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8}, ...rep(0.15, 8, 0.07, 'sfx/ding', 0.1),
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at + 0.15, s: 'sfx/bell', v: 0.14})),
  {at: 3.0, s: 'soft-whoosh', v: 0.3, dur: 1.2}, {at: 3.7, s: 'tick', v: 0.2}, {at: 4.3, s: 'tampon', v: 0.35}, {at: 5.5, s: 'sfx/pop', v: 0.2}, {at: 7.2, s: 'sfx/swish', v: 0.3}, {at: 7.9, s: 'sfx/pop', v: 0.2},
  {at: 13.6, s: 'sfx/swish', v: 0.25}, {at: 14.2, s: 'sfx/click', v: 0.5}, {at: 14.85, s: 'sfx/click', v: 0.35}, {at: 15.5, s: 'sfx/click', v: 0.25},
  {at: 17.0, s: 'sfx/pop', v: 0.2}, {at: 18.3, s: 'sfx/pop', v: 0.2}, {at: 19.7, s: 'sfx/pop', v: 0.2}, {at: 20.0, s: 'sfx/rise', v: 0.22, dur: 1.6}, {at: 21.6, s: 'bass-hit', v: 0.45}, {at: 21.62, s: 'sfx/thud', v: 0.4},
  {at: 22.5, s: 'sfx/swish', v: 0.25}, ...[23.3, 23.6, 23.9].map((at) => ({at, s: 'sfx/pop', v: 0.18})),
  {at: 26.2, s: 'soft-whoosh', v: 0.35, dur: 1.5}, {at: 27.4, s: 'tampon', v: 0.3},
  ...[28.8, 31.4, 33.3, 34.2, 35.3, 36.2, 39.3].flatMap((at) => [{at: at - 0.1, s: 'sfx/swish', v: 0.2}, {at: at + 0.3, s: 'sfx/click', v: 0.2}]),
  {at: 34.2, s: 'sfx/ding', v: 0.2}, {at: 37.0, s: 'soft-whoosh', v: 0.35, dur: 1}, {at: 37.9, s: 'sfx/ding', v: 0.22}, {at: 39.3, s: 'tampon', v: 0.35},
  {at: 42.2, s: 'tick', v: 0.15}, {at: 44.0, s: 'sfx/swish', v: 0.35}, {at: 44.7, s: 'sfx/thud', v: 0.25},
  ...rep(44.5, 20, 0.21, 'sfx/click', 0.08), {at: 44.45, s: 'sfx/rise', v: 0.18, dur: 4},
  {at: 48.8, s: 'sfx/pop', v: 0.2}, {at: 50.7, s: 'sfx/swish', v: 0.35}, {at: 51.0, s: 'sfx/thud', v: 0.3},
  {at: 52.6, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 53.3, s: 'tampon', v: 0.35}, {at: 54.4, s: 'sfx/click', v: 0.3}, {at: 55.3, s: 'sfx/click', v: 0.3},
  {at: 56.5, s: 'sfx/rise', v: 0.2, dur: 3}, {at: 57.7, s: 'sfx/pop', v: 0.2}, {at: 58.5, s: 'sfx/pop', v: 0.2}, {at: 59.1, s: 'soft-whoosh', v: 0.3, dur: 1.2},
  ...searchCues(62.3, 16, 63.8, 64.15), ...[65.15, 65.4].map((at) => ({at, s: 'sfx/pop', v: 0.18})), ...rep(65.9, 6, 0.22, 'sfx/click', 0.14),
  {at: 69.2, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 73.3, s: 'sfx/thud', v: 0.3}, {at: 70.5, s: 'sfx/pop', v: 0.2}, {at: 74.8, s: 'sfx/pop', v: 0.2},
  {at: 76.8, s: 'sfx/rise', v: 0.22, dur: 2}, {at: 80.0, s: 'tampon', v: 0.4}, {at: 80.45, s: 'sfx/swish', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];
const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SCN: [React.FC, number, number][] = [[Intro, 2.6, 8.05], [G1, 9.85, 24.35], [G2, 26.1, 40.35], [G3, 42.1, 60.45], [G4, 62.2, 67.6], [G5, 69.35, OUTRO_AT]];
export const InducDeducMetro: React.FC = () => (
  <AbsoluteFill className="cambria" style={{background: PAPER}}>
    <style>{CAMBRIA_CSS}</style>
    <Bg />
    {SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7 / TK}><TimeWarp.Provider value={{at: x.at, k: TK}}><C i={i} /></TimeWarp.Provider></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><KCover /></Gate>
    <Gate from={80.3} to={OUTRO_AT + 0.3}><JCrtOff at={80.45} /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-inductives-deductives-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u2 = [wn, Avatar, Ring3D, SlamTag, Arrow, slamK, CAP, STAGE, SCAN, RING_ISO, Drum, Marked, Announce, MBadge, RailSteps, StairSteps, ZigSteps, QBubble, Grid15, RameWipe, Forklift, ICO, MC, ACR, lin, hexMix, cl, GyroFlash, Hot, Photo, Pill2, Ph, TChip, Row3, SlamCard, ZInk, ZTicker, ZAxis, ZDef];

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn, Barred, Flap];
