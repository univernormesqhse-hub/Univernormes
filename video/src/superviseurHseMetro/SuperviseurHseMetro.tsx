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
 * « Le superviseur HSE » (voix d'origine, 51 s) — capsule « condensé de toutes les techniques de la session + effet
 * wahou + ultra premium » présentée en métro (8 stations). Tube de verre à six guichets adapté au contenu :
 * mission → terrain → permis → urgence → rôles → bouclier ; la capsule du dossier file d'un guichet à l'autre
 * (gyrophare ×2, loupe, capsule pneumatique, store vénitien — transitions resserrées par accélération locale du
 * temps `TimeWarp` pour tenir sur une voix courte). Barre de recherche « superviseur HSE » qui ouvre le trajet
 * usine → maison (« sain et sauf »). Techniques combinées : volet comparateur bureau ✗ / terrain ✓, épingles
 * d'omniprésence qui tombent sur les zones, rame de métro (prochaine station), radar des dangers à balayage
 * conique, photo d'inspection puis correction « en direct » (viseur, ✗ → ✓), check-list, maillet du « dernier
 * mot » à onde de choc, trois activités cadenassées (soudure, levage, espace confiné), feu tricolore, permis de
 * travail signé en direct et tamponné « validé » qui déverrouille tout, gyrophare et plan d'évacuation tracé,
 * déchets qui tombent dans les bacs, fusion « HSE ? » scindée au laser (responsable ≠ superviseur), projecteur
 * qui passe d'une colonne à l'autre, électrocardiogramme « vit dans l'action », manuel 3D qui s'ouvre puis pages
 * qui s'envolent pour former un bouclier, carrousel cylindrique 3D des équipes. Images haute définition.
 * Sous-titres NeoCaptions sur la voix d'origine (transcription locale corrigée), sans musique, bruitage discret.
 */
const IMG = {
  cover: 'influence-gen/controleur.jpg',
  c1: 'influence-gen/terrain.jpg',
  c2: 'rhse-gen/controle.jpg',
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
const OUTRO_AT = 51.6;
export const SUPERVISEUR_HSE_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '1', title: 'Sa mission', s: 'chaque travailleur, sain et sauf', c: BLUE, g: 'mission', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 5.89, n: '2', title: 'Sur le terrain', s: 'traquer · inspecter · corriger', c: GREEN, g: 'terrain', k: 'gyro', lab: 'GUICHET 2 / 6'},
  {at: 15.48, n: '3', title: 'Le dernier mot', s: 'le permis de travail', c: ORANGE, g: 'permis', k: 'loupe', lab: 'GUICHET 3 / 6'},
  {at: 24.16, n: '4', title: 'Urgence et déchets', s: 'exercices · tri', c: RED, g: 'urgence', k: 'tube', lab: 'GUICHET 4 / 6'},
  {at: 29.2, n: '5', title: 'Ne pas confondre', s: 'superviseur ≠ responsable', c: VIO, g: 'rôles', k: 'store', lab: 'GUICHET 5 / 6'},
  {at: 42.65, n: '6', title: 'Le bouclier', s: 'de ses équipes', c: TEAL, g: 'bouclier', k: 'gyro', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 51.0;
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
  {n: 1, l: 'Sain et sauf', s: 'sain et sauf', at: 5.4},
  {n: 2, l: 'Sur le terrain', s: 'terrain', at: 10.0},
  {n: 3, l: 'Les dangers', s: 'dangers', at: 12.4},
  {n: 4, l: 'Le permis', s: 'permis', at: 23.6},
  {n: 5, l: 'L\'urgence', s: 'urgence', at: 26.6},
  {n: 6, l: 'Les déchets', s: 'déchets', at: 28.4},
  {n: 7, l: 'Le responsable', s: 'responsable', at: 32.5},
  {n: 8, l: 'Le bouclier', s: 'bouclier', at: 49.8},
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
      {STATIONS.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: sx(k) - 57, width: 114, top: 62, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 14, color: k === cur ? BURG : DIM}}>{x.s}</div>)}
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE SUPERVISEUR · STATION {r.n} / 8</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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


/* ═════════════ Superviseur HSE — constantes, outils de scène ═════════════ */
const SUPC = '#F07A12';
const RSPC = '#0E2A5C';
const OKV = '#1E9E5A';
const KOV = '#D9363E';
const RING_SUP = ['heures-gen/equipe-chantier.jpg', 'influence-gen/terrain.jpg', 'rhse-gen/controle.jpg', 'induction/mine-equipe.jpg', 'kaizen-gen/gemba.jpg', 'metroiso-gen/terrain.jpg', 'promo/terrain-controle.jpg', 'induction/technicien-hse.jpg'];
const bz = (P: number[][], u: number): [number, number] => { const m = 1 - u; const f = (i: number) => m * m * m * P[0][i] + 3 * m * m * u * P[1][i] + 3 * m * u * u * P[2][i] + u * u * u * P[3][i]; return [f(0), f(1)]; };
const polyAt = (P: number[][], u: number): [number, number] => {
  const L: number[] = []; let tot = 0;
  for (let i = 1; i < P.length; i++) { const d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); L.push(d); tot += d; }
  let r = u * tot;
  for (let i = 0; i < L.length; i++) { if (r <= L[i]) { const q = L[i] ? r / L[i] : 0; return [P[i][0] + (P[i + 1][0] - P[i][0]) * q, P[i][1] + (P[i + 1][1] - P[i][1]) * q]; } r -= L[i]; }
  return [P[P.length - 1][0], P[P.length - 1][1]];
};
const polyLen = (P: number[][]) => P.slice(1).reduce((s0, p, i) => s0 + Math.hypot(p[0] - P[i][0], p[1] - P[i][1]), 0);
const Circ: React.FC<{src: string; d: number; c: string; pos?: string; style?: React.CSSProperties}> = ({src, d, c, pos = '50% 30%', style}) => (
  <div style={{width: d, height: d, borderRadius: '50%', overflow: 'hidden', border: `6px solid ${NBK}`, boxShadow: `7px 7px 0 ${c}`, background: '#fff', flexShrink: 0, ...style}}><Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos}} /></div>
);

/* ═════════════ Guichet 1 : recherche « superviseur HSE » → trajet usine → maison, sain et sauf ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const P = [[150, 560], [380, 600], [470, 170], [760, 200]];
  const u = prog(t, 3.95, 5.45, easeInOut);
  const [wx, wy] = bz(P, u);
  const home = prog(t, 5.4, 5.7, easeOut);
  const d = `M ${P[0][0]} ${P[0][1]} C ${P[1][0]} ${P[1][1]} ${P[2][0]} ${P[2][1]} ${P[3][0]} ${P[3][1]}`;
  return (
    <Out end={6.05}>
      <Heads h={[[2.45, ['Son seul objectif :', 'chaque travailleur'], [1]], [4.6, ['Rentrer chez lui', 'sain et sauf'], [1]]]} />
      <SearchOpen x={60} y={450} w={960} h={880} at={2.5} query="superviseur HSE" results={['Superviseur HSE · son objectif', 'Responsable HSE · son rôle']} found={0} foundAt={3.15} clickAt={3.45} c={SUPC}>
        <div style={{position: 'absolute', inset: 0, background: '#F7F4EC'}}>
          <svg width={900} height={720} style={{position: 'absolute', left: 0, top: 0}}>
            <path d={d} fill="none" stroke="#D9DEE6" strokeWidth={46} strokeLinecap="round" />
            <path d={d} fill="none" stroke="#fff" strokeWidth={6} strokeDasharray="22 20" strokeLinecap="round" />
            <path d={d} fill="none" stroke={OKV} strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - u} />
          </svg>
          <div style={{position: 'absolute', left: P[0][0] - 95, top: P[0][1] - 80, transform: `scale(${pop(t, 3.6)})`}}><Ico n="usine" size={170} /></div>
          <div style={{position: 'absolute', left: P[3][0] - 90, top: P[3][1] - 150, width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle, rgba(245,196,0,${0.7 * home}) 0%, rgba(245,196,0,0) 70%)`}} />
          <div style={{position: 'absolute', left: P[3][0] - 85, top: P[3][1] - 145, transform: `scale(${pop(t, 3.7) * (1 + 0.12 * Math.sin(home * Math.PI))})`}}><Ico n="maison" size={170} /></div>
          {t > 3.9 && <div style={{position: 'absolute', left: wx - 52, top: wy - 70, width: 104, height: 104, borderRadius: '50%', background: '#fff', border: `5px solid ${NBK}`, boxShadow: `0 0 0 ${8 + 4 * Math.sin(t * 9)}px ${OKV}55, 5px 5px 0 ${SUPC}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `translateY(${Math.abs(Math.sin(t * 14)) * -8}px)`}}><Ico n="HardHat" size={58} c={SUPC} /></div>}
          {home > 0 && <Abs x={0} y={600} w={900} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb(OKV, 7), borderColor: NBK, display: 'flex', alignItems: 'center', gap: 16, padding: '14px 30px', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 46, transform: `scale(${Math.min(1, sp(t, 5.42))}) rotate(-2deg)`}}><Ico n="Heart" size={50} c="#fff" />Sain et sauf ✓</div></Abs>}
        </div>
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ Guichet 2 : bureau ✗ / terrain ✓ (volet comparateur), omniprésence, radar des dangers, correction en direct ═════════════ */
const Volet: React.FC<{a: string; b: string; split: number; x: number; y: number; w: number; h: number; ko: number}> = ({a, b, split, x, y, w, h, ko}) => (
  <Abs x={x} y={y} w={w} h={h} style={{...nb('#fff', 8), borderColor: NBK, overflow: 'hidden'}}>
    <Img src={PH(a)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '40% 40%', filter: `grayscale(${ko}) brightness(${1 - 0.25 * ko})`}} />
    <div style={{position: 'absolute', inset: 0, clipPath: `inset(0 0 0 ${split * w}px)`}}><Img src={PH(b)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '45% 35%'}} /></div>
    <div style={{position: 'absolute', left: split * w - 4, top: 0, width: 8, height: h, background: '#fff', boxShadow: `0 0 0 3px ${NBK}`}} />
    <div style={{position: 'absolute', left: split * w - 38, top: h / 2 - 38, width: 76, height: 76, borderRadius: '50%', background: '#fff', border: `5px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>◀▶</div>
    {split > 0.08 && <div style={{position: 'absolute', left: 18, top: 18, ...nb(ko > 0.5 ? KOV : '#fff', 5), borderColor: NBK, padding: '6px 16px', ...CAP, fontSize: 24, color: ko > 0.5 ? '#fff' : INK}}>Bureau {ko > 0.5 ? '✗' : ''}</div>}
    <div style={{position: 'absolute', right: 18, top: 18, ...nb(OKV, 5), borderColor: NBK, padding: '6px 16px', ...CAP, fontSize: 24, color: '#fff'}}>Terrain ✓</div>
  </Abs>
);
const Radar: React.FC<{at: number; x: number; y: number; d: number}> = ({at, x, y, d}) => {
  const t = useT();
  const R = d / 2;
  const ang = (t - at) * 240;
  const BL: [number, number, string, number][] = [[40, 0.62, 'danger', 0.45], [150, 0.45, 'feu', 0.9], [230, 0.7, 'eclair', 1.25], [310, 0.38, 'goutte', 1.6]];
  return (
    <Abs x={x} y={y} w={d} h={d + 60} style={{opacity: pop(t, at)}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: d, height: d, ...STAGE, borderRadius: '50%', overflow: 'hidden'}}>
        <div style={{position: 'absolute', inset: 0, background: `conic-gradient(from ${ang}deg, rgba(30,158,90,0.55) 0deg, rgba(30,158,90,0) 70deg, rgba(30,158,90,0) 360deg)`}} />
        {[0.33, 0.66, 0.97].map((f) => <div key={f} style={{position: 'absolute', left: R - R * f, top: R - R * f, width: 2 * R * f, height: 2 * R * f, borderRadius: '50%', border: '2px solid rgba(120,230,170,0.35)'}} />)}
        <div style={{position: 'absolute', left: R - 1, top: 0, width: 2, height: d, background: 'rgba(120,230,170,0.25)'}} />
        <div style={{position: 'absolute', left: 0, top: R - 1, width: d, height: 2, background: 'rgba(120,230,170,0.25)'}} />
        {BL.map(([a, r, ic, dt]) => { const on = t > at + dt; const q = on ? Math.min(1, sp(t, at + dt, 9, 12)) : 0; const ring = on ? ((t - at - dt) * 1.4) % 1 : 0; const bx = R + Math.cos((a * Math.PI) / 180) * R * r; const by = R + Math.sin((a * Math.PI) / 180) * R * r; return on ? (
          <React.Fragment key={a}>
            <div style={{position: 'absolute', left: bx - 30 - ring * 30, top: by - 30 - ring * 30, width: 60 + ring * 60, height: 60 + ring * 60, borderRadius: '50%', border: `4px solid ${KOV}`, opacity: 1 - ring}} />
            <div style={{position: 'absolute', left: bx - 34, top: by - 34, width: 68, height: 68, borderRadius: '50%', background: '#fff', border: `4px solid ${KOV}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${q})`}}><Ico n={ic} size={44} /></div>
          </React.Fragment>
        ) : null; })}
      </div>
      <div style={{position: 'absolute', left: 0, top: d + 12, width: d, textAlign: 'center', ...CAP, fontSize: 22, color: INK}}>Dangers traqués</div>
    </Abs>
  );
};
const LiveHud: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  const blink = Math.sin(t * 10) > 0 ? 1 : 0.25;
  const fix = prog(t, at + 0.75, at + 1.05);
  const B = (s0: React.CSSProperties) => <div style={{position: 'absolute', width: 46, height: 46, borderColor: '#fff', borderStyle: 'solid', borderWidth: 0, ...s0}} />;
  return (
    <>
      <div style={{position: 'absolute', left: 18, top: 18, display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(17,17,17,0.72)', borderRadius: 10, padding: '6px 14px', ...CAP, fontSize: 22, color: '#fff'}}><span style={{width: 16, height: 16, borderRadius: 8, background: KOV, opacity: blink}} />En direct</div>
      {B({left: 14, bottom: 14, borderLeftWidth: 6, borderBottomWidth: 6})}{B({right: 14, top: 14, borderRightWidth: 6, borderTopWidth: 6})}{B({right: 14, bottom: 14, borderRightWidth: 6, borderBottomWidth: 6})}
      {t > at + 0.4 && <div style={{position: 'absolute', left: 18, bottom: 22, display: 'flex', alignItems: 'center', gap: 10, ...nb(fix > 0.5 ? OKV : KOV, 5), borderColor: NBK, padding: '6px 16px', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 28, transform: `scale(${1 + 0.15 * Math.sin(fix * Math.PI)})`}}>{fix > 0.5 ? '✓ Geste corrigé' : '✗ Geste à risque'}</div>}
    </>
  );
};
const Terrain: React.FC = () => {
  const t = useT();
  const split = lerp(0.5, 0, prog(t, 9.45, 10.35, easeInOut));
  const ko = prog(t, 8.75, 9.15);
  const Z = ['usine', 'chantier', 'grue', 'camion', 'stock'];
  const v1 = 1 - prog(t, 10.9, 11.15);
  return (
    <Out end={15.5}>
      <Heads h={[[7.9, ['Il ne reste pas', 'au bureau'], [1]], [9.38, ['Omniprésent', 'sur le terrain'], [1]], [11.29, ['Il traque', 'les dangers'], [1]], [12.87, ['Inspecte et corrige', 'en temps réel'], [0, 1]]]} />
      {v1 > 0 && <AbsoluteFill style={{opacity: v1}}>
        <Volet a="influence-gen/bureau.jpg" b="influence-gen/terrain.jpg" split={split} x={60} y={465} w={960} h={560} ko={ko} />
        {t > 9.55 && <Abs x={60} y={1060} w={960} h={250} style={{...nb('#fff', 7), borderColor: NBK, opacity: pop(t, 9.6)}}>
          <div style={{position: 'absolute', left: 24, top: 14, ...CAP, fontSize: 20, color: DIM}}>Omniprésent sur le terrain</div>
          {Z.map((z, k) => { const a = 9.75 + k * 0.17; const q = t > a ? Math.min(1, sp(t, a, 9, 11)) : 0; return (
            <div key={z} style={{position: 'absolute', left: 40 + k * 182, top: 60, width: 150, height: 170, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end'}}>
              <div style={{transform: `translateY(${(1 - q) * -80}px) scale(${q})`, marginBottom: 2}}><div style={{width: 64, height: 64, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', background: SUPC, border: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div style={{transform: 'rotate(45deg)'}}><Ico n="HardHat" size={32} c="#fff" /></div></div></div>
              <Ico n={z} size={92} />
            </div>
          ); })}
        </Abs>}
      </AbsoluteFill>}
      {t > 11.2 && <>
        <Radar at={11.45} x={60} y={470} d={440} />
        <Photo src="rhse-gen/controle.jpg" x={530} y={470} w={490} h={440} at={12.85} c={TEAL} pos="55% 30%" tag="INSPECTION" />
        {t > 13.95 && <Photo src="promo/terrain-controle.jpg" x={530} y={470} w={490} h={440} at={13.95} c={KOV} pos="60% 35%"><LiveHud at={14.05} /></Photo>}
        <Abs x={60} y={1010} w={960} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          <Check at={12.4} label="Dangers traqués" c={KOV} />
          <Check at={13.45} label="Inspections menées" c={TEAL} />
          <Check at={14.6} label="Gestes corrigés en temps réel" c={OKV} />
        </Abs>
      </>}
    </Out>
  );
};

/* ═════════════ Guichet 3 : le dernier mot — trois activités verrouillées, feu rouge, permis signé et tamponné ═════════════ */
const Manhole: React.FC<{s: number}> = ({s: z}) => (
  <svg width={110 * z} height={100 * z} viewBox="0 0 110 100"><ellipse cx={55} cy={34} rx={48} ry={18} fill="#5B6476" stroke={NBK} strokeWidth={5} /><ellipse cx={55} cy={34} rx={34} ry={11} fill="#1C2230" /><rect x={36} y={40} width={6} height={56} fill={SUPC} stroke={NBK} strokeWidth={2} /><rect x={68} y={40} width={6} height={56} fill={SUPC} stroke={NBK} strokeWidth={2} />{[52, 66, 80].map((y) => <rect key={y} x={36} y={y} width={38} height={5} fill={SUPC} stroke={NBK} strokeWidth={2} />)}</svg>
);
const Permis: React.FC = () => {
  const t = useT();
  const gav = t < 18.8 ? lerp(-55, 0, prog(t, 18.35, 18.8, easeIn)) : Math.sin(Math.min(1, (t - 18.8) / 0.3) * Math.PI) * -12;
  const shock = t > 18.8 ? ((t - 18.8) / 0.6) : 0;
  const ph1 = 1 - prog(t, 19.75, 20.0);
  const ok = t > 23.75;
  const T3: [string, number, React.ReactNode][] = [['Soudure', 20.03, <Ico key="s" n="etincelles" size={96} />], ['Levage', 20.4, <Ico key="l" n="grue" size={96} />], ['Espace confiné', 20.73, <Manhole key="m" s={1} />]];
  const doc = Math.min(1, sp(t, 22.15, 7, 13));
  const sig = prog(t, 22.8, 23.45, easeInOut);
  return (
    <Out end={24.1}>
      <Heads h={[[17.3, ['Opération critique :', 'le dernier mot'], [1]], [21.38, ['Rien ne démarre', 'sans sa validation'], [1]], [22.6, ['Sans le permis', 'de travail validé'], [1]]]} />
      {ph1 > 0 && <AbsoluteFill style={{opacity: ph1}}>
        <Abs x={0} y={500} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Circ src="influence-gen/controleur.jpg" d={400} c={SUPC} pos="38% 25%" style={{transform: `scale(${Math.min(1, sp(t, 17.35))})`}} /></Abs>
        <div style={{position: 'absolute', left: 770, top: 500, transformOrigin: '20% 85%', transform: `rotate(${gav}deg)`, opacity: pop(t, 17.9)}}><Ico n="Gavel" size={190} c={INK} /></div>
        {shock > 0 && shock < 1 && <div style={{position: 'absolute', left: 800 - shock * 160, top: 700 - shock * 160, width: 40 + shock * 320, height: 40 + shock * 320, borderRadius: '50%', border: `8px solid ${SUPC}`, opacity: 1 - shock}} />}
        {t > 18.7 && <Abs x={0} y={990} w={1080} style={{display: 'flex', justifyContent: 'center'}}><SlamTag at={18.85} text="LE DERNIER MOT" c={SUPC} rot={-4} size={60} ic="Gavel" /></Abs>}
      </AbsoluteFill>}
      {t > 19.9 && <>
        <Abs x={60} y={470} w={960} h={250} style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24}}>
          {T3.map(([l, a, ic], k) => { const q = t > a ? Math.min(1, sp(t, a, 8, 12)) : 0; const un = prog(t, 23.75 + k * 0.12, 23.95 + k * 0.12); return (
            <div key={l} style={{position: 'relative', ...nb('#fff', 7), borderColor: un > 0.5 ? OKV : KOV, borderWidth: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, transform: `translateY(${(1 - q) * -260}px) rotate(${(1 - q) * -8}deg)`, opacity: t > a ? 1 : 0}}>
              {ic}
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>{l}</div>
              <div style={{position: 'absolute', right: -16, top: -18, width: 64, height: 64, borderRadius: '50%', background: un > 0.5 ? OKV : KOV, border: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + 0.3 * Math.sin(un * Math.PI)}) rotate(${un * 360}deg)`}}><Ico n={un > 0.5 ? 'LockOpen' : 'Lock'} size={34} c="#fff" /></div>
            </div>
          ); })}
        </Abs>
        <Abs x={60} y={760} w={190} h={540} style={{...nb('#22262E', 7), borderColor: NBK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', opacity: pop(t, 21.3)}}>
          {[KOV, '#F5B400', OKV].map((c, k) => { const lit = (k === 0 && t > 21.4 && !ok) || (k === 2 && ok); return <div key={c} style={{width: 120, height: 120, borderRadius: '50%', background: lit ? c : '#3A3F49', border: `5px solid ${NBK}`, boxShadow: lit ? `0 0 40px 10px ${c}AA` : 'none'}} />; })}
        </Abs>
        {t > 22.1 && <Abs x={280} y={760} w={740} h={540} style={{...nb('#FFFDF7', 8), borderColor: NBK, padding: '26px 34px', transform: `translateX(${(1 - doc) * 900}px) rotate(${(1 - doc) * 6}deg)`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}><Ico n="FileCheck" size={50} c={SUPC} />Permis de travail</div>
          {[0.92, 0.75, 0.84, 0.6].map((w, k) => <div key={k} style={{height: 16, width: `${w * 100}%`, borderRadius: 8, background: '#E5E1D6', marginTop: k ? 22 : 30}} />)}
          <div style={{position: 'absolute', left: 34, right: 34, bottom: 70, borderTop: `4px dashed ${DIM}`}} />
          <div style={{position: 'absolute', left: 34, bottom: 30, ...CAP, fontSize: 20, color: DIM}}>Validation du superviseur</div>
          <svg width={420} height={130} style={{position: 'absolute', left: 60, bottom: 66}} viewBox="0 0 420 130"><path d="M 10 95 C 40 20, 70 20, 80 80 S 120 120, 140 60 S 170 10, 190 70 C 200 100, 230 100, 250 60 C 262 40, 280 40, 290 70 L 300 85 C 330 60, 370 50, 410 55" fill="none" stroke="#1F3D8F" strokeWidth={7} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - sig} /></svg>
          {t > 23.45 && <div style={{position: 'absolute', right: 40, top: 150}}><SlamTag at={23.6} text="VALIDÉ" c={OKV} rot={-12} size={64} ic="BadgeCheck" /></div>}
        </Abs>}
      </>}
    </Out>
  );
};

/* ═════════════ Guichet 4 : exercice d'urgence (plan d'évacuation tracé) + tri des déchets (chute dans les bacs) ═════════════ */
const Urgence: React.FC = () => {
  const t = useT();
  const PATH = [[90, 120], [90, 300], [300, 300], [300, 440], [400, 440]];
  const u = prog(t, 25.95, 27.2, easeInOut);
  const L = polyLen(PATH);
  const [rx, ry] = polyAt(PATH, u);
  const siren = Math.sin(t * 16) > 0;
  const BINS: [string, string][] = [['#2E9E5B', 'dossier'], ['#E8B400', 'boulon'], ['#5B6476', 'eprouvette']];
  return (
    <Out end={29.25}>
      <Heads h={[[25.45, ['Il orchestre', 'les exercices d\'urgence'], [1]], [27.48, ['Et surveille', 'le tri des déchets'], [1]]]} />
      <GyroFlash at={25.95} />
      <Abs x={60} y={470} w={470} h={560} style={{...nb('#fff', 8), borderColor: NBK, overflow: 'hidden', opacity: pop(t, 25.75)}}>
        <div style={{position: 'absolute', left: 18, top: 16, display: 'flex', alignItems: 'center', gap: 10, ...nb(siren ? KOV : '#fff', 4), borderColor: NBK, padding: '5px 12px', ...CAP, fontSize: 18, color: siren ? '#fff' : KOV}}><Ico n="Siren" size={26} c={siren ? '#fff' : KOV} />Exercice d'urgence</div>
        <svg width={470} height={560} style={{position: 'absolute', left: 0, top: 0}}>
          {[[40, 80, 180, 170], [240, 80, 190, 170], [40, 340, 180, 160]].map(([x, y, w, h], k) => <rect key={k} x={x} y={y} width={w} height={h} fill="#F3F5F9" stroke="#9AA6B8" strokeWidth={4} />)}
          <rect x={400} y={410} width={50} height={60} fill={OKV} stroke={NBK} strokeWidth={3} />
          <polyline points={PATH.map((p) => p.join(',')).join(' ')} fill="none" stroke={OKV} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${u * L} ${L}`} />
          {u > 0.98 && <circle cx={425} cy={515} r={26 + 4 * Math.sin(t * 10)} fill="none" stroke={OKV} strokeWidth={5} />}
        </svg>
        <div style={{position: 'absolute', left: 401, top: 418}}><Ico n="DoorOpen" size={44} c="#fff" /></div>
        {t > 25.9 && <div style={{position: 'absolute', left: rx - 26, top: ry - 26, width: 52, height: 52, borderRadius: '50%', background: '#fff', border: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="Footprints" size={30} c={OKV} /></div>}
        {u > 0.98 && <div style={{position: 'absolute', left: 399, top: 489, transform: `scale(${pop(t, 27.2)})`}}><Ico n="Users" size={52} c={OKV} /></div>}
      </Abs>
      <Photo src="metroiso-gen/environnement.jpg" x={550} y={470} w={470} h={560} at={27.3} c={OKV} pos="50% 40%" tag="TRI DES DÉCHETS" />
      {t > 27.5 && <Abs x={60} y={1060} w={960} h={260} style={{display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
        {BINS.map(([c, it], k) => { const a = 27.75 + k * 0.32; const fall = prog(t, a, a + 0.45, easeIn); const land = t > a + 0.45 ? Math.max(0, 1 - (t - a - 0.45) / 0.25) : 0; return (
          <div key={c} style={{position: 'relative', width: 230, height: 230, opacity: pop(t, 27.55 + k * 0.08)}}>
            {fall < 1 && t > a && <div style={{position: 'absolute', left: 75, top: lerp(-280, 40, fall), transform: `rotate(${fall * 200}deg)`}}><Ico n={it} size={80} /></div>}
            <div style={{position: 'absolute', left: 20, top: 70, width: 190, height: 160, background: c, border: `5px solid ${NBK}`, borderRadius: '10px 10px 22px 22px', boxShadow: `6px 6px 0 ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scaleY(${1 - 0.12 * land}) scaleX(${1 + 0.08 * land})`, transformOrigin: '50% 100%'}}><Ico n="Recycle" size={74} c="#fff" /></div>
            <div style={{position: 'absolute', left: 6, top: 52, width: 218, height: 26, background: c, border: `5px solid ${NBK}`, borderRadius: 8, transform: `rotate(${-14 * land}deg)`, transformOrigin: '0 100%'}} />
            {t > a + 0.55 && <div style={{position: 'absolute', right: 0, top: 30, width: 54, height: 54, borderRadius: '50%', background: '#fff', border: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: OKV, fontSize: 34, fontWeight: 900, transform: `scale(${Math.min(1, sp(t, a + 0.55))})`}}>✓</div>}
          </div>
        ); })}
      </Abs>}
    </Out>
  );
};

/* ═════════════ Guichet 5 : ne pas confondre — fusion « HSE ? », scission au laser, responsable (système) / superviseur (action) ═════════════ */
const ecgPath = (w: number, h: number, ph: number) => { let d = ''; for (let x = 0; x <= w; x += 6) { const k = ((x / w) * 3 + ph) % 1; const y = k > 0.42 && k < 0.47 ? -0.9 : k > 0.47 && k < 0.52 ? 0.7 : k > 0.52 && k < 0.56 ? -0.25 : Math.sin(x * 0.05) * 0.04; d += `${x ? 'L' : 'M'} ${x} ${h / 2 + y * h * 0.45} `; } return d; };
const Roles: React.FC = () => {
  const t = useT();
  const cut = prog(t, 31.95, 32.45);
  const beam = 1 - prog(t, 32.45, 32.65);
  const apart = prog(t, 32.45, 33.0, easeOut);
  const focusL = t < 38.0 ? 1 : 0.4 + 0.6 * (1 - prog(t, 38.0, 38.4));
  const focusR = t < 33.5 ? 1 : t < 38.0 ? 0.45 : 0.45 + 0.55 * prog(t, 38.0, 38.4);
  const LR: [string, number, string][] = [['Pilote le système', 33.62, 'Workflow'], ['Décortique les chiffres', 35.3, 'ChartColumn'], ['Conseille la direction', 36.4, 'Presentation']];
  const RR: [string, number, string][] = [['Observe', 40.87, 'Eye'], ['Alerte', 41.23, 'Siren'], ['Fait appliquer les règles', 41.64, 'ShieldCheck']];
  const Row2 = ({l, a, ic, c, k}: {l: string; a: number; ic: string; c: string; k: number}) => { const q = t > a ? Math.min(1, sp(t, a, 8, 13)) : 0; return (
    <div style={{position: 'absolute', left: 0, top: k * 150, width: 460, height: 130, ...nb('#fff', 6), borderColor: NBK, boxShadow: `6px 6px 0 ${c}`, display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px', transform: `translateY(${(1 - q) * 60}px)`, opacity: cl(q * 1.5)}}>
      <div style={{width: 76, height: 76, borderRadius: 18, background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: ic === 'Siren' && t > a ? `rotate(${Math.sin(t * 30) * 8}deg)` : ic === 'Workflow' ? `rotate(${(t - a) * 30}deg)` : undefined}}><Ico n={ic} size={46} c="#fff" /></div>
      <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 31, color: INK, lineHeight: 1.1}}>{l}</div>
      {ic === 'ChartColumn' && t > a && <div style={{position: 'absolute', right: 16, bottom: 18, display: 'flex', alignItems: 'flex-end', gap: 6}}>{[0.5, 0.8, 0.65].map((h0, j) => <div key={j} style={{display: 'flex', flexDirection: 'column', gap: 3 * prog(t, a + 0.3, a + 0.8) * 3}}>{[0, 1, 2].map((s0) => <div key={s0} style={{width: 16, height: (h0 * 72) / 3, background: s0 === 1 ? SUPC : RSPC, borderRadius: 3}} />)}</div>)}</div>}
    </div>
  ); };
  const Head = ({side, c, title, src, pos}: {side: number; c: string; title: string; src: string; pos: string}) => (
    <div style={{position: 'absolute', left: side ? 500 : 0, top: 0, width: 460, height: 290, ...nb(c, 8), borderColor: NBK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, transform: `translateX(${(side ? -1 : 1) * (1 - apart) * 130}px) rotate(${(side ? 1 : -1) * (1 - apart) * 4}deg)`}}>
      <Circ src={src} d={150} c="#fff" pos={pos} />
      <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: '#fff', letterSpacing: 1}}>{title}</div>
    </div>
  );
  return (
    <Out end={42.7}>
      <Heads h={[[30.6, ['Ne pas le confondre', 'avec le responsable HSE'], [0]], [33.62, ['Le responsable', 'pilote le système'], [1]], [38.11, ['Le superviseur', 'vit dans l\'action'], [1]]]} />
      <Abs x={60} y={470} w={960} h={860}>
        {apart < 0.02 ? (
          <div style={{position: 'absolute', left: 120, top: 0, width: 720, height: 290, ...nb('#fff', 8), borderColor: NBK, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, opacity: pop(t, 30.8), transform: `rotate(${Math.sin(t * 5) * 1.2}deg)`}}>
            <Circ src="rhse-gen/responsable.jpg" d={170} c={RSPC} pos="50% 25%" style={{transform: 'translateX(30px)'}} />
            <Circ src="influence-gen/controleur.jpg" d={170} c={SUPC} pos="38% 25%" style={{transform: 'translateX(-30px)'}} />
            <div style={{marginLeft: 26, fontFamily: sansFont, fontWeight: 900, fontSize: 74, color: INK}}>HSE ?</div>
          </div>
        ) : (
          <div style={{position: 'absolute', inset: 0, height: 290}}>
            <div style={{position: 'absolute', inset: 0, transform: `translateX(${-apart * 0}px)`}}><Head side={0} c={RSPC} title="Responsable HSE" src="rhse-gen/responsable.jpg" pos="50% 25%" /></div>
            <div style={{position: 'absolute', inset: 0}}><Head side={1} c={SUPC} title="Superviseur HSE" src="influence-gen/controleur.jpg" pos="38% 25%" /></div>
          </div>
        )}
        {apart > 0 && apart < 1 && <div style={{position: 'absolute', left: 0, top: 0, width: 960, height: 290, display: 'flex', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none'}}>{Array.from({length: 12}, (_, k) => { const a = (k / 12) * Math.PI * 2; const r = 20 + apart * 160; return <div key={k} style={{position: 'absolute', left: 480 + Math.cos(a) * r, top: 145 + Math.sin(a) * r, width: 10, height: 10, borderRadius: 5, background: YEL, opacity: 1 - apart}} />; })}</div>}
        {cut > 0 && beam > 0 && <><div style={{position: 'absolute', left: 475, top: -30, width: 10, height: 350 * cut, background: 'linear-gradient(180deg, #FF8A8A, #FF2020)', boxShadow: '0 0 28px 10px rgba(255,40,40,0.75)', borderRadius: 5, opacity: beam, zIndex: 3}} /><div style={{position: 'absolute', left: 458, top: -30 + 350 * cut - 22, width: 44, height: 44, borderRadius: 22, background: 'radial-gradient(circle, #fff 0%, #FFE27A 40%, rgba(255,80,40,0) 72%)', opacity: beam * (cut < 1 ? 1 : 0), zIndex: 4}} /></>}
        {t > 32.75 && <div style={{position: 'absolute', left: 430, top: 95, width: 100, height: 100, borderRadius: '50%', background: '#fff', border: `6px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: KOV, zIndex: 5, transform: `scale(${lerp(2.2, 1, prog(t, 32.75, 32.9, easeIn))})`}}>≠</div>}
        <div style={{position: 'absolute', left: 0, top: 330, width: 460, height: 450, opacity: focusL, filter: `grayscale(${1 - focusL})`}}>{LR.map(([l, a, ic], k) => <Row2 key={l} l={l} a={a} ic={ic} c={RSPC} k={k} />)}</div>
        <div style={{position: 'absolute', left: 500, top: 330, width: 460, height: 450, opacity: focusR}}>
          {t > 38.2 && t < 41.2 && <div style={{position: 'absolute', inset: 0, ...STAGE, opacity: pop(t, 38.25) * (1 - prog(t, 40.75, 41.1))}}><svg width={450} height={440} style={{position: 'absolute', left: 0, top: 0}}><path d={ecgPath(450, 300, -(t - 38.2) * 0.9)} transform="translate(0,70)" fill="none" stroke="#3BE38A" strokeWidth={6} style={{filter: 'drop-shadow(0 0 8px #3BE38A)'}} /></svg><div style={{position: 'absolute', left: 0, right: 0, bottom: 26, textAlign: 'center', ...CAP, fontSize: 24, color: '#3BE38A'}}>Vit dans l'action</div></div>}
          {RR.map(([l, a, ic], k) => <Row2 key={l} l={l} a={a} ic={ic} c={SUPC} k={k} />)}
        </div>
        {t > 34.3 && t < 38.1 && <div style={{position: 'absolute', left: 120, top: 262, zIndex: 6}}><SlamTag at={34.4} text="SYSTÈME" c={RSPC} rot={-4} size={30} ic="Settings2" /></div>}
        {t > 39.45 && <div style={{position: 'absolute', left: 640, top: 262, zIndex: 6}}><SlamTag at={39.55} text="ACTION" c={OKV} rot={4} size={30} ic="Zap" /></div>}
      </Abs>
    </Out>
  );
};

/* ═════════════ Guichet 6 : le manuel seul ne suffit pas → les pages s'envolent et deviennent un bouclier, carrousel 3D des équipes ═════════════ */
const BookPage: React.FC<{z: number; back?: boolean; cover?: boolean}> = ({z, back, cover}) => (
  <div style={{position: 'absolute', inset: 0, background: cover ? '#E9E1CE' : '#FBF8F1', border: `${cover ? 5 : 3}px solid ${cover ? NBK : '#CFC6B2'}`, borderRadius: back ? '16px 6px 6px 16px' : '6px 16px 16px 6px', backfaceVisibility: 'hidden', transform: back ? 'rotateY(180deg)' : undefined, padding: '34px 30px', boxSizing: 'border-box'}}>
    {!cover && <div style={{height: 18, width: '55%', borderRadius: 6, background: '#B9AE96', marginBottom: 26}} />}
    {Array.from({length: cover ? 0 : 9}, (_, k) => <div key={k} style={{height: 10, width: `${62 + ((k * 37 + z * 13) % 34)}%`, borderRadius: 5, background: '#DDD5C3', marginBottom: 20}} />)}
  </div>
);
const SHP = (cx: number, cy: number, s0: number) => `M ${cx} ${cy - 210 * s0} L ${cx + 180 * s0} ${cy - 150 * s0} L ${cx + 172 * s0} ${cy + 40 * s0} Q ${cx + 150 * s0} ${cy + 170 * s0} ${cx} ${cy + 225 * s0} Q ${cx - 150 * s0} ${cy + 170 * s0} ${cx - 172 * s0} ${cy + 40 * s0} L ${cx - 180 * s0} ${cy - 150 * s0} Z`;
const Bouclier: React.FC = () => {
  const t = useT();
  const W = 960, H = 880, BX = 480, BY = 400;
  const open = prog(t, 44.55, 45.3, easeInOut);
  const bookOut = prog(t, 47.4, 47.9);
  const shield = prog(t, 48.75, 49.5, easeInOut);
  const fill = prog(t, 49.3, 49.8);
  const TG: [number, number][] = [[0, -200], [150, -140], [168, 10], [120, 140], [0, 205], [-120, 140], [-168, 10], [-150, -140]];
  return (
    <Out end={OUTRO_AT}>
      <Heads h={[[43.0, ['Les manuels seuls', 'ne sauvent aucune vie'], [0]], [46.98, ['La théorie devient', 'un bouclier'], [1]], [50.0, ['Un bouclier protecteur', 'pour ses équipes'], [0, 1]]]} />
      <Abs x={60} y={460} w={W} h={H} style={{...STAGE, opacity: pop(t, 43.9)}}>
        <div style={SCAN} />
        {t > 49.3 && <Ring3D imgs={RING_SUP} at={49.35} w={W} h={H} cw={420} ch={300} R={600} zr={330} persp={1300} speed={18} cy={0.4} />}
        {bookOut < 1 && <div style={{position: 'absolute', left: 0, top: 0, width: W, height: H, perspective: 1700, opacity: 1 - bookOut, transform: `scale(${1 - 0.2 * bookOut})`, filter: t > 46.1 ? `grayscale(${prog(t, 46.1, 46.5)})` : undefined}}>
          <div style={{position: 'absolute', left: BX - 160 * (1 - open), top: BY - 220, width: 320, height: 420, transformStyle: 'preserve-3d'}}>
            <BookPage z={0} />
            {[0.15, 0.32].map((d0, k) => <div key={k} style={{position: 'absolute', inset: 0, transformOrigin: '0 50%', transformStyle: 'preserve-3d', transform: `rotateY(${-178 * prog(t, 44.85 + d0, 45.55 + d0, easeInOut)}deg)`}}><BookPage z={1} /><BookPage z={1} back /></div>)}
            <div style={{position: 'absolute', inset: 0, transformOrigin: '0 50%', transformStyle: 'preserve-3d', transform: `rotateY(${-179 * open}deg)`}}>
              <div style={{position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${RSPC}, #1F4C9A)`, borderRadius: '6px 16px 16px 6px', border: `5px solid ${NBK}`, backfaceVisibility: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, color: '#fff', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.5)'}}><Ico n="ShieldCheck" size={96} c={YEL} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, lineHeight: 1.1}}>Manuel de<br />sécurité</div></div>
              <BookPage z={2} back cover />
            </div>
          </div>
        </div>}
        {t > 46.1 && t < 47.5 && <Abs x={0} y={680} w={W} style={{display: 'flex', justifyContent: 'center'}}><SlamTag at={46.2} text="À EUX SEULS ✗" c={KOV} rot={-6} size={48} /></Abs>}
        {t > 47.0 && shield < 1 && TG.map(([tx, ty], k) => { const a = 47.05 + k * 0.08; const q = prog(t, a, a + 1.0, easeInOut); const arc = Math.sin(q * Math.PI) * (k % 2 ? -160 : 160); return t > a ? <div key={k} style={{position: 'absolute', left: lerp(BX - 45, BX + tx - 45, q) + arc * 0.3, top: lerp(BY - 60, BY + ty - 60, q) - Math.abs(arc), width: 90, height: 120, background: '#FBF8F1', border: '3px solid #CFC6B2', borderRadius: 6, transform: `rotate(${(1 - q) * (k * 47) + q * 0}deg) scale(${1 - 0.2 * q})`, boxShadow: '0 10px 20px rgba(0,0,0,0.4)', opacity: 1 - shield}} /> : null; })}
        {shield > 0 && <svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible', zIndex: 5}}>
          <defs><linearGradient id="shg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#23C483" /><stop offset="100%" stopColor="#0F7F86" /></linearGradient></defs>
          <path d={SHP(BX, BY, 1)} fill="url(#shg)" fillOpacity={fill} stroke="#fff" strokeWidth={10} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - shield} style={{filter: `drop-shadow(0 0 ${20 + 14 * Math.sin(t * 6)}px rgba(35,196,131,${0.8 * fill}))`}} />
        </svg>}
        {fill > 0 && <div style={{position: 'absolute', left: BX - 70, top: BY - 80, zIndex: 6, transform: `scale(${fill})`}}><Ico n="Users" size={140} c="#fff" /></div>}
        {fill > 0.9 && [0, 1].map((k) => { const r = ((t - 49.8 + k * 0.6) * 0.8) % 1; return <svg key={k} width={W} height={H} style={{position: 'absolute', left: 0, top: 0, zIndex: 4, opacity: 1 - r}}><path d={SHP(BX, BY, 1 + r * 0.5)} fill="none" stroke="#3BE38A" strokeWidth={5} /></svg>; })}
        {t > 50.1 && <Abs x={0} y={740} w={W} style={{display: 'flex', justifyContent: 'center', zIndex: 7}}><SlamTag at={50.2} text="BOUCLIER PROTECTEUR" c={OKV} rot={-4} size={46} ic="Shield" /></Abs>}
      </Abs>
    </Out>
  );
};

/** Couverture : superviseur sur le terrain (photo haute définition) + titre « SUPERVISEUR HSE » en lettres-photos animées. */
const COVER_PHOTO = 'influence-gen/controleur.jpg';
const ICover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1040, overflow: 'hidden'}}><Img src={PH(COVER_PHOTO)} style={{width: 1080, height: 1040, objectFit: 'cover', objectPosition: '35% 30%', transform: `scale(${1.0 + t * 0.012})`, transformOrigin: '40% 30%'}} /></div>
      <div style={{position: 'absolute', left: 0, top: 640, width: 1080, height: 400, background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}D9 55%, ${PAPER} 100%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.18)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={880} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="SUPERVISEUR" src={IMG.c1} size={124} ls={4} seed={3} /></Abs>
      <Abs x={0} y={1010} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="HSE" src={IMG.c2} size={250} ls={10} seed={6} /></Abs>
      <Abs x={0} y={1300} w={1080} style={{textAlign: 'center'}}><span style={{fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: DIM}}>OMNIPRÉSENT SUR LE TERRAIN</span></Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140 + lerp(0, 40, Math.sin(t * 2) * 0.5 + 0.5), top: 36}}><Capsule w={56} c={NAVY} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 700, fontSize: 14, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Montage, bruitage ═════════════ */
const TK = 1.65;
const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1 / TK, 4, 0.18 / TK, 'sfx/ding', 0.12), {at: x.at + 0.45 / TK, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95 / TK, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6 / TK, s: 'sfx/pop', v: 0.2}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len / 2), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at + 0.15, s: 'sfx/bell', v: 0.16})),
  ...searchCues(2.5, 15, 3.15, 3.45), {at: 3.95, s: 'soft-whoosh', v: 0.3, dur: 1.4}, {at: 5.42, s: 'validation', v: 0.3},
  {at: 8.8, s: 'sfx/thud', v: 0.3}, {at: 9.45, s: 'sfx/swish', v: 0.32}, ...rep(9.85, 5, 0.17, 'sfx/pop', 0.2), {at: 10.95, s: 'sfx/whoosh', v: 0.3},
  {at: 11.45, s: 'riser', v: 0.16, dur: 0.9}, ...[11.9, 12.35, 12.7, 13.05].map((at) => ({at, s: 'sfx/ding', v: 0.15})), {at: 12.85, s: 'sfx/pop', v: 0.24}, {at: 13.95, s: 'sfx/click', v: 0.35}, {at: 14.85, s: 'validation', v: 0.26},
  {at: 18.8, s: 'deep-hit', v: 0.42}, {at: 18.85, s: 'tampon', v: 0.35}, ...[20.03, 20.4, 20.73].map((at) => ({at, s: 'cadenas', v: 0.3})), {at: 21.4, s: 'alarme', v: 0.12, dur: 0.5},
  {at: 22.15, s: 'soft-whoosh', v: 0.4, dur: 1}, {at: 22.8, s: 'stylo', v: 0.35, dur: 0.65}, {at: 23.6, s: 'tampon', v: 0.45}, ...[23.75, 23.87, 23.99].map((at) => ({at, s: 'sfx/click', v: 0.3})), {at: 23.85, s: 'validation', v: 0.3},
  {at: 25.95, s: 'alarme', v: 0.2, dur: 1.0}, {at: 27.3, s: 'sfx/pop', v: 0.24}, ...[28.2, 28.52, 28.84].map((at) => ({at, s: 'sfx/thud', v: 0.3})),
  {at: 30.8, s: 'sfx/pop', v: 0.24}, {at: 31.95, s: 'tension', v: 0.2, dur: 0.5}, {at: 32.45, s: 'bass-hit', v: 0.4}, {at: 32.5, s: 'sfx/swish', v: 0.35}, {at: 32.75, s: 'tampon', v: 0.35},
  ...[33.62, 35.3, 36.4].map((at) => ({at, s: 'sfx/pop', v: 0.22})), {at: 34.4, s: 'tampon', v: 0.3}, {at: 38.25, s: 'sfx/rise', v: 0.18, dur: 0.8}, {at: 39.55, s: 'tampon', v: 0.32}, ...[40.87, 41.23, 41.64].map((at) => ({at, s: 'sfx/pop', v: 0.22})),
  ...[44.55, 44.9, 45.2].map((at) => ({at, s: 'page', v: 0.35})), {at: 46.2, s: 'tampon', v: 0.38}, {at: 47.05, s: 'soft-whoosh', v: 0.4, dur: 1.2}, {at: 48.75, s: 'riser', v: 0.2, dur: 1.0}, {at: 49.5, s: 'bass-hit', v: 0.38}, {at: 50.2, s: 'tampon', v: 0.42},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];
const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SCN: [React.FC, number, number][] = [[Intro, 2.4, 6.1], [Terrain, 7.6, 15.6], [Permis, 17.2, 24.2], [Urgence, 25.7, 29.3], [Roles, 30.75, 42.8], [Bouclier, 43.8, OUTRO_AT]];
export const SuperviseurHseMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    {SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    <Gate from={10.95} to={12.0}><TimeWarp.Provider value={{at: 10.95, k: 1.5}}><RameWipe at={10.95} n={3} /></TimeWarp.Provider></Gate>
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7 / TK}><TimeWarp.Provider value={{at: x.at, k: TK}}><C i={i} /></TimeWarp.Provider></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><ICover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-superviseur-hse-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u2 = [wn, Avatar, Ring3D, SlamTag, Arrow, slamK, CAP, STAGE, SCAN, RING_ISO, RING_SUP, Drum, Marked, Announce, MBadge, RailSteps, StairSteps, ZigSteps, QBubble, Grid15, RameWipe, Forklift, ICO, MC, ACR, lin, hexMix, cl, GyroFlash, Hot, Photo, Pill2, SUPC, RSPC, OKV, KOV, bz, polyAt, polyLen, Circ, Volet, Radar, LiveHud, Manhole, ecgPath, SHP, BookPage];

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn, Barred, Flap];
