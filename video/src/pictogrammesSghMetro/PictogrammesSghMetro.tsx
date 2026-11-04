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
 * « Les 9 pictogrammes de danger SGH » (voix d'origine, 9 min 28) — capsule « condensé de toutes les techniques de la
 * session + effet wahou + ultra premium » présentée en métro (9 stations = 9 pictogrammes). Tube de verre à onze
 * guichets (introduction, SGH01 → SGH09, réflexe QHSE) ; la capsule du dossier file d'un guichet à l'autre, transition
 * gyrophare à chaque partie. Les 9 pictogrammes sont dessinés en SVG conformément aux modèles (losange rouge, symbole
 * noir) et se tracent en direct : losange, puis symbole élément par élément, puis remplissage. Couverture : les 9
 * pictogrammes et le titre en lettres-photos ; carrousel rotatif convergent des 9 pictogrammes ; recherche
 * « pictogrammes SGH » qui ouvre la grille ; acronyme SGH qui se déploie. Pour chaque pictogramme : héros dessiné en
 * grand qui file en badge dans le coin, animation signature (déclencheurs qui convergent et explosion, étincelle qui
 * embrase, comparaison flamme / flamme sur cercle à la loupe, triangle du feu, feu attisé, bouteille chauffée avec
 * manomètre puis givre, métal rongé, projection vers l'œil, goutte toxique, voies d'exposition, points sensibles du
 * corps, danger différé, aquarium pollué, interdits de déversement, globe photo-texturé), exemples cités, réflexe
 * QHSE coché, tampon final. Conclusion : grille des 9 qui s'allument au fil de la voix, étiquette à la loupe, FDS,
 * trois questions, mantra du réflexe QHSE. Sous-titres NeoCaptions sur la voix d'origine, sans musique.
 */
const IMG = {
  cover: 'hazid-gen/chantier-chimique.jpg',
  c1: 'hazop-gen/pharmaceutique.jpg',
  c2: 'dangerrisque-gen/vapeurs.jpg',
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
const OUTRO_AT = 569.0;
export const PICTOGRAMMES_SGH_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: 'S', title: 'Les pictogrammes SGH', s: 'un langage de prévention', c: NAVY, g: 'intro', k: 'none', lab: 'GUICHET 1 / 11'},
  {at: 50.3, n: '1', title: 'La bombe qui explose', s: 'SGH01 · explosifs', c: '#F07A12', g: 'explosif', k: 'gyro', lab: 'PICTOGRAMME 1 / 9'},
  {at: 90.3, n: '2', title: 'La flamme', s: 'SGH02 · inflammables', c: RED, g: 'inflammable', k: 'gyro', lab: 'PICTOGRAMME 2 / 9'},
  {at: 132.7, n: '3', title: 'La flamme sur un cercle', s: 'SGH03 · comburants', c: '#E0A100', g: 'comburant', k: 'gyro', lab: 'PICTOGRAMME 3 / 9'},
  {at: 173.6, n: '4', title: 'La bouteille de gaz', s: 'SGH04 · gaz sous pression', c: '#1F6FD1', g: 'gaz', k: 'gyro', lab: 'PICTOGRAMME 4 / 9'},
  {at: 217.2, n: '5', title: 'La corrosion', s: 'SGH05 · corrosifs', c: '#6D4BD8', g: 'corrosif', k: 'gyro', lab: 'PICTOGRAMME 5 / 9'},
  {at: 267.1, n: '6', title: 'La tête de mort', s: 'SGH06 · toxicité aiguë', c: '#3A3F49', g: 'toxique', k: 'gyro', lab: 'PICTOGRAMME 6 / 9'},
  {at: 316.5, n: '7', title: "Le point d'exclamation", s: 'SGH07 · nocif, irritant', c: '#0F9D8F', g: 'nocif', k: 'gyro', lab: 'PICTOGRAMME 7 / 9'},
  {at: 366.0, n: '8', title: 'Danger grave pour la santé', s: 'SGH08 · effets à long terme', c: '#B5179E', g: 'santé', k: 'gyro', lab: 'PICTOGRAMME 8 / 9'},
  {at: 423.5, n: '9', title: "Danger pour l'environnement", s: 'SGH09 · milieu aquatique', c: '#1E9E5A', g: 'environ.', k: 'gyro', lab: 'PICTOGRAMME 9 / 9'},
  {at: 478.6, n: 'R', title: 'Le réflexe QHSE', s: 'lire · comprendre · appliquer', c: BLUE, g: 'réflexe', k: 'gyro', lab: 'GUICHET 11 / 11'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 568.6;
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
  const sx = (k: number) => 64 + k * (884 / (SECT.length - 1));
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
                <div style={{position: 'absolute', left: -42, width: 128, top: 50, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 11, color: here ? x.c : passed ? GREEN : '#A9B1BE'}}>{x.g}</div>
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
  {n: 1, l: 'Explosifs', s: 'explosif', at: 53.6},
  {n: 2, l: 'Inflammables', s: 'inflammable', at: 93.7},
  {n: 3, l: 'Comburants', s: 'comburant', at: 139.6},
  {n: 4, l: 'Gaz sous pression', s: 'gaz', at: 177.0},
  {n: 5, l: 'Corrosifs', s: 'corrosif', at: 220.6},
  {n: 6, l: 'Toxicité aiguë', s: 'toxique', at: 270.4},
  {n: 7, l: 'Nocif, irritant', s: 'nocif', at: 319.9},
  {n: 8, l: 'Santé', s: 'santé', at: 369.4},
  {n: 9, l: 'Environnement', s: 'environ.', at: 426.9},
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
      {STATIONS.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: sx(k) - 48, width: 96, top: 62, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 12, color: k === cur ? BURG : DIM}}>{x.s}</div>)}
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE SGH · STATION {r.n} / 9</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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


/* ═════════════ Pictogrammes SGH dessinés en SVG (conformes aux modèles fournis ; SGH09 d'après le modèle officiel) ═════════════ */
type PE = {k: string; d?: string; cx?: number; cy?: number; r?: number; rx?: number; ry?: number; x?: number; y?: number; w2?: number; h?: number; x1?: number; y1?: number; x2?: number; y2?: number; f?: string; s?: string; w?: number; tr?: string; els?: PE[]};
type PD = {name: string; cls: string; els: PE[]};
const PICTOS: Record<string, PD> = {"SGH01": {"name": "Bombe explosant", "cls": "Explosifs", "els": [{"k": "l", "x1": 104.8, "y1": 89.2, "x2": 118.5, "y2": 51.6, "s": "#000", "w": 2.6}, {"k": "l", "x1": 112.1, "y1": 93.9, "x2": 139.7, "y2": 66.3, "s": "#000", "w": 3.4}, {"k": "l", "x1": 116.5, "y1": 100.5, "x2": 157.3, "y2": 84, "s": "#000", "w": 2.6}, {"k": "l", "x1": 118, "y1": 106.6, "x2": 165.8, "y2": 103.3, "s": "#000", "w": 3.4}, {"k": "l", "x1": 117.4, "y1": 112.8, "x2": 152.3, "y2": 121.5, "s": "#000", "w": 2.6}, {"k": "l", "x1": 115, "y1": 118.6, "x2": 139.6, "y2": 134, "s": "#000", "w": 3.4}, {"k": "l", "x1": 79.2, "y1": 114.8, "x2": 52, "y2": 124.8, "s": "#000", "w": 2.6}, {"k": "l", "x1": 78, "y1": 108.7, "x2": 37, "y2": 110.1, "s": "#000", "w": 3.4}, {"k": "l", "x1": 78.8, "y1": 102.5, "x2": 38.4, "y2": 90.9, "s": "#000", "w": 2.6}, {"k": "l", "x1": 81.6, "y1": 96.5, "x2": 53.8, "y2": 77, "s": "#000", "w": 3.4}, {"k": "l", "x1": 86.5, "y1": 91.6, "x2": 69.3, "y2": 67, "s": "#000", "w": 2.6}, {"k": "l", "x1": 82.7, "y1": 120.9, "x2": 63.5, "y2": 136.9, "s": "#000", "w": 3.4}, {"k": "p", "d": "M 136.6 85.2 L 142.4 79.7 L 145.6 87.3 Z", "f": "#000"}, {"k": "p", "d": "M 148.3 120.7 L 154.1 115.2 L 157.3 122.8 Z", "f": "#000"}, {"k": "p", "d": "M 121.4 140.0 L 127.3 134.5 L 130.4 142.2 Z", "f": "#000"}, {"k": "p", "d": "M 44.3 96.7 L 50.1 91.2 L 53.3 98.8 Z", "f": "#000"}, {"k": "p", "d": "M 64.9 73.6 L 70.7 68.1 L 73.9 75.8 Z", "f": "#000"}, {"k": "p", "d": "M 58.1 124.7 L 63.9 119.2 L 67.1 126.9 Z", "f": "#000"}, {"k": "c", "cx": 98, "cy": 108, "r": 17, "f": "#000"}, {"k": "p", "d": "M 91 101 Q 96 96 102 99", "f": "none", "s": "#fff", "w": 2.6}]}, "SGH02": {"name": "Flamme", "cls": "Inflammables", "els": [{"k": "p", "d": "M 100 138 C 74 138 63 122 66 104 C 68 92 74 87 74 73 C 82 80 86 88 85 97 C 89 86 93 75 90 56 C 101 65 107 78 106 91 C 111 83 113 74 110 63 C 121 74 129 89 131 105 C 133 125 122 138 100 138 Z", "f": "#000"}, {"k": "p", "d": "M 100 133 C 89 133 84 125 87 116 C 89 110 94 107 93 98 C 101 103 105 110 104 117 C 107 113 108 109 107 104 C 113 110 115 117 114 122 C 113 129 108 133 100 133 Z", "f": "#fff"}, {"k": "r", "x": 60, "y": 146, "w2": 80, "h": 9, "f": "#000"}]}, "SGH03": {"name": "Flamme sur un cercle", "cls": "Comburants", "els": [{"k": "p", "d": "M 100 138 C 74 138 63 122 66 104 C 68 92 74 87 74 73 C 82 80 86 88 85 97 C 89 86 93 75 90 56 C 101 65 107 78 106 91 C 111 83 113 74 110 63 C 121 74 129 89 131 105 C 133 125 122 138 100 138 Z", "f": "#000", "tr": "translate(100 108) scale(0.7) translate(-100 -136)"}, {"k": "p", "d": "M 100 133 C 89 133 84 125 87 116 C 89 110 94 107 93 98 C 101 103 105 110 104 117 C 107 113 108 109 107 104 C 113 110 115 117 114 122 C 113 129 108 133 100 133 Z", "f": "#fff", "tr": "translate(100 108) scale(0.7) translate(-100 -136)"}, {"k": "c", "cx": 100, "cy": 127, "r": 15, "f": "none", "s": "#000", "w": 9}, {"k": "r", "x": 64, "y": 150, "w2": 72, "h": 9, "f": "#000"}]}, "SGH04": {"name": "Bouteille de gaz", "cls": "Gaz sous pression", "els": [{"k": "p", "d": "M 62 93 L 126 93 Q 140 93 145 101 L 151 103 L 151 113 L 145 115 Q 140 123 126 123 L 62 123 Q 47 123 47 108 Q 47 93 62 93 Z", "f": "#000", "tr": "rotate(-28 102 108)"}, {"k": "r", "x": 151, "y": 99, "w2": 10, "h": 18, "f": "#000", "tr": "rotate(-28 102 108)"}]}, "SGH05": {"name": "Corrosion", "cls": "Corrosifs", "els": [{"k": "p", "d": "M 60 61 L 92 61 A 5.5 5.5 0 0 1 92 72 L 60 72", "f": "#fff", "s": "#000", "w": 3.4, "tr": "rotate(-12 96 66)"}, {"k": "p", "d": "M 140 61 L 108 61 A 5.5 5.5 0 0 0 108 72 L 140 72", "f": "#fff", "s": "#000", "w": 3.4, "tr": "rotate(12 104 66)"}, {"k": "l", "x1": 63, "y1": 80, "x2": 63, "y2": 92, "s": "#000", "w": 3}, {"k": "e", "cx": 63, "cy": 100, "rx": 2.4, "ry": 3.6, "f": "#000"}, {"k": "e", "cx": 63, "cy": 109, "rx": 2.2, "ry": 3.2, "f": "#000"}, {"k": "l", "x1": 137, "y1": 80, "x2": 137, "y2": 92, "s": "#000", "w": 3}, {"k": "e", "cx": 137, "cy": 100, "rx": 2.4, "ry": 3.6, "f": "#000"}, {"k": "e", "cx": 137, "cy": 108, "rx": 2.2, "ry": 3.2, "f": "#000"}, {"k": "p", "d": "M 55 116 q -3 -3 0 -5 q 3 -3 0 -5", "f": "none", "s": "#000", "w": 2}, {"k": "p", "d": "M 71 116 q -3 -3 0 -5 q 3 -3 0 -5", "f": "none", "s": "#000", "w": 2}, {"k": "p", "d": "M 129 114 q -3 -3 0 -5 q 3 -3 0 -5", "f": "none", "s": "#000", "w": 2}, {"k": "p", "d": "M 145 114 q -3 -3 0 -5 q 3 -3 0 -5", "f": "none", "s": "#000", "w": 2}, {"k": "p", "d": "M 150 118 q -3 -3 0 -5 q 3 -3 0 -5", "f": "none", "s": "#000", "w": 2}, {"k": "p", "d": "M 42 120 L 59 120 L 63 125 L 67 120 L 92 120 L 92 131 L 42 131 Z", "f": "#000"}, {"k": "p", "d": "M 162 120 L 140 120 C 134 115 127 114 126 118 C 125 121 130 123 133 124 L 114 124 C 108 124 108 130 114 130 L 111 130 C 106 130 106 136 111 136 L 113 136 C 109 137 110 142 115 142 L 138 143 C 150 144 156 141 162 139", "f": "#fff", "s": "#000", "w": 3.2}, {"k": "l", "x1": 114, "y1": 130, "x2": 132, "y2": 130, "s": "#000", "w": 2.4}, {"k": "l", "x1": 111, "y1": 136, "x2": 131, "y2": 136, "s": "#000", "w": 2.4}]}, "SGH06": {"name": "Tête de mort sur deux tibias", "cls": "Toxicité aiguë", "els": [{"k": "g", "tr": "rotate(30 100 128)", "els": [{"k": "r", "x": 50, "y": 123, "w2": 100, "h": 11, "f": "#000", "rx": 5}, {"k": "c", "cx": 50, "cy": 120, "r": 7, "f": "#000"}, {"k": "c", "cx": 50, "cy": 137, "r": 7, "f": "#000"}, {"k": "c", "cx": 150, "cy": 120, "r": 7, "f": "#000"}, {"k": "c", "cx": 150, "cy": 137, "r": 7, "f": "#000"}]}, {"k": "g", "tr": "rotate(-30 100 128)", "els": [{"k": "r", "x": 50, "y": 123, "w2": 100, "h": 11, "f": "#000", "rx": 5}, {"k": "c", "cx": 50, "cy": 120, "r": 7, "f": "#000"}, {"k": "c", "cx": 50, "cy": 137, "r": 7, "f": "#000"}, {"k": "c", "cx": 150, "cy": 120, "r": 7, "f": "#000"}, {"k": "c", "cx": 150, "cy": 137, "r": 7, "f": "#000"}]}, {"k": "p", "d": "M 100 50 C 78 50 66 64 66 84 C 66 96 72 104 80 108 L 80 121 L 120 121 L 120 108 C 128 104 134 96 134 84 C 134 64 122 50 100 50 Z", "f": "#000"}, {"k": "e", "cx": 88, "cy": 86, "rx": 9, "ry": 8, "f": "#fff"}, {"k": "e", "cx": 112, "cy": 86, "rx": 9, "ry": 8, "f": "#fff"}, {"k": "p", "d": "M 100 96 L 94.5 105 L 105.5 105 Z", "f": "#fff"}, {"k": "r", "x": 89, "y": 111, "w2": 3, "h": 10, "f": "#fff"}, {"k": "r", "x": 96.5, "y": 111, "w2": 3, "h": 10, "f": "#fff"}, {"k": "r", "x": 104, "y": 111, "w2": 3, "h": 10, "f": "#fff"}, {"k": "r", "x": 111.5, "y": 111, "w2": 3, "h": 10, "f": "#fff"}]}, "SGH07": {"name": "Point d'exclamation", "cls": "Danger pour la santé (nocif, irritant)", "els": [{"k": "p", "d": "M 89 58 Q 100 46 111 58 L 105.5 124 L 94.5 124 Z", "f": "#000"}, {"k": "c", "cx": 100, "cy": 143, "r": 9.5, "f": "#000"}]}, "SGH08": {"name": "Danger grave pour la santé", "cls": "CMR, sensibilisants respiratoires", "els": [{"k": "c", "cx": 100, "cy": 64, "r": 15, "f": "#000"}, {"k": "p", "d": "M 62 152 C 62 112 76 86 100 86 C 124 86 138 112 138 152 Z", "f": "#000"}, {"k": "p", "d": "M 100.0 105.0 L 102.7 117.5 L 113.4 110.6 L 106.5 121.3 L 119.0 124.0 L 106.5 126.7 L 113.4 137.4 L 102.7 130.5 L 100.0 143.0 L 97.3 130.5 L 86.6 137.4 L 93.5 126.7 L 81.0 124.0 L 93.5 121.3 L 86.6 110.6 L 97.3 117.5 Z", "f": "#fff"}]}, "SGH09": {"name": "Environnement", "cls": "Dangereux pour le milieu aquatique", "els": [{"k": "l", "x1": 80, "y1": 142, "x2": 80, "y2": 72, "s": "#000", "w": 9}, {"k": "l", "x1": 80, "y1": 108, "x2": 58, "y2": 88, "s": "#000", "w": 5.5}, {"k": "l", "x1": 80, "y1": 96, "x2": 100, "y2": 78, "s": "#000", "w": 5.5}, {"k": "l", "x1": 80, "y1": 86, "x2": 68, "y2": 66, "s": "#000", "w": 5.5}, {"k": "l", "x1": 64, "y1": 94, "x2": 54, "y2": 82, "s": "#000", "w": 5.5}, {"k": "l", "x1": 94, "y1": 84, "x2": 100, "y2": 70, "s": "#000", "w": 5.5}, {"k": "l", "x1": 58, "y1": 88, "x2": 48, "y2": 92, "s": "#000", "w": 5.5}, {"k": "l", "x1": 52, "y1": 145, "x2": 108, "y2": 145, "s": "#000", "w": 5}, {"k": "p", "d": "M 102 136 Q 122 120 146 132 L 160 124 L 158 138 L 162 150 L 146 140 Q 122 150 102 136 Z", "f": "#000"}, {"k": "c", "cx": 114, "cy": 134, "r": 3.4, "f": "#fff"}, {"k": "l", "x1": 100, "y1": 156, "x2": 150, "y2": 156, "s": "#000", "w": 4}]}};
const SGH_RED = '#E30613';
const flatEls = (els: PE[]): number => els.reduce((a, e) => a + (e.k === 'g' ? flatEls(e.els || []) : 1), 0);
const PEl: React.FC<{e: PE; p: number; fill: number}> = ({e, p, fill}) => {
  const filled = e.f && e.f !== 'none';
  const dc = filled ? (e.f as string) : (e.s || '#000');
  const common = {pathLength: 1, strokeDasharray: '1 1', strokeDashoffset: 1 - p, stroke: e.s || dc, strokeWidth: e.s ? e.w : 2.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: filled ? e.f : 'none', fillOpacity: filled ? fill : 0, transform: e.tr};
  if (p <= 0) return null;
  if (e.k === 'p') return <path d={e.d} {...common} />;
  if (e.k === 'c') return <circle cx={e.cx} cy={e.cy} r={e.r} {...common} />;
  if (e.k === 'e') return <ellipse cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} {...common} />;
  if (e.k === 'r') return <rect x={e.x} y={e.y} width={e.w2} height={e.h} rx={e.rx || 0} {...common} />;
  if (e.k === 'l') return <line x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} {...common} fill="none" />;
  return null;
};
/** Pictogramme SGH : draw 0 → 0,3 trace le losange rouge, 0,3 → 0,85 trace le symbole élément par élément, 0,7 → 1 remplit. draw = 1 : statique. */
const Picto: React.FC<{id: string; size: number; draw?: number; glow?: number; style?: React.CSSProperties}> = ({id, size, draw = 1, glow = 0, style}) => {
  const P = PICTOS[id];
  const pb = Math.min(1, draw / 0.3);
  const ps = Math.max(0, Math.min(1, (draw - 0.3) / 0.55));
  const pf = Math.max(0, Math.min(1, (draw - 0.7) / 0.3));
  const n = flatEls(P.els);
  let idx = 0;
  const pi = () => { const i = idx++; const g = Math.max(1, n * 0.45); return Math.max(0, Math.min(1, (ps * (n + g) - i) / g)); };
  const render = (els: PE[]): React.ReactNode[] => els.map((e, k) => e.k === 'g' ? <g key={k} transform={e.tr}>{render(e.els || [])}</g> : <PEl key={k} e={e} p={pi()} fill={pf} />);
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{overflow: 'visible', filter: glow > 0 ? `drop-shadow(0 0 ${18 * glow}px rgba(227,6,19,${0.7 * glow}))` : undefined, ...style}}>
      <polygon points="100,6 194,100 100,194 6,100" fill="#fff" fillOpacity={Math.min(1, pb * 1.4)} stroke={SGH_RED} strokeWidth={12} strokeLinejoin="miter" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - pb} />
      {render(P.els)}
    </svg>
  );
};
const SGH_IDS = ['SGH01', 'SGH02', 'SGH03', 'SGH04', 'SGH05', 'SGH06', 'SGH07', 'SGH08', 'SGH09'];

/* ═════════════ Blocs communs de la capsule SGH ═════════════ */
const OKG = '#1E9E5A';
const KOR = '#D9363E';
const C01 = '#F07A12', C02 = '#E30613', C03 = '#E0A100', C04 = '#1F6FD1', C05 = '#6D4BD8', C06 = '#3A3F49', C07 = '#0F9D8F', C08 = '#B5179E', C09 = '#1E9E5A';
/** Fenêtre de phase : fondu d'entrée à a, de sortie avant b. */
const Ph: React.FC<{a: number; b: number; children: React.ReactNode}> = ({a, b, children}) => {
  const t = useT();
  if (t < a - 0.02 || t > b) return null;
  const o = pop(t, a, 0.35) * (1 - prog(t, b - 0.3, b, easeIn));
  return <AbsoluteFill style={{opacity: o}}>{children}</AbsoluteFill>;
};
/** Carrousel rotatif des 9 pictogrammes ; conv : le rayon se referme et tous convergent au centre (éclair final). */
const PictoRing: React.FC<{a: number; b: number; cy: number; conv?: boolean; size?: number; R0?: number}> = ({a, b, cy, conv = true, size = 200, R0 = 400}) => {
  const t = useT();
  const k = Math.max(0, t - a);
  const cv = conv ? prog(t, a + (b - a) * 0.5, b - 0.15, easeIn) : 0;
  const app = Math.min(1, sp(t, a, 7, 13));
  const R = R0 * app * (1 - cv);
  const rot = k * 55 + cv * 260;
  const P = 1500;
  const items = SGH_IDS.map((id, i) => {
    const th = ((i * 40 + rot) * Math.PI) / 180;
    const x = R * Math.sin(th), z = R * Math.cos(th);
    const sc = P / (P - z);
    return {id, x, z, sc};
  }).sort((u, v) => u.z - v.z);
  const flash = conv && t > b - 0.2 ? Math.max(0, 1 - (t - b + 0.2) / 0.5) : 0;
  return (
    <>
      {items.map(({id, x, z, sc}) => {
        const sz = size * sc * (0.75 + 0.25 * app);
        const dim = Math.max(0, Math.min(0.55, (-z / (R0 + 1)) * 0.55));
        return <div key={id} style={{position: 'absolute', left: 540 + x * 0.98 - sz / 2, top: cy - z * 0.32 - sz / 2, filter: `brightness(${1 - dim}) drop-shadow(0 ${14 * sc}px ${18 * sc}px rgba(0,0,0,0.25))`, opacity: app}}><Picto id={id} size={sz} /></div>;
      })}
      {flash > 0 && <AbsoluteFill style={{background: `radial-gradient(circle at 540px ${cy}px, #fff 0%, rgba(255,255,255,${flash}) 40%, rgba(255,255,255,0) 75%)`, opacity: flash, zIndex: 9}} />}
    </>
  );
};
/** Héros : le pictogramme se dessine en grand, puis file en badge dans le coin (nom + code) jusqu'à la fin de la séquence. */
const Hero: React.FC<{id: string; a: number; fly: number; end: number; name: string; cls: string; c: string; children?: React.ReactNode}> = ({id, a, fly, end, name, cls, c, children}) => {
  const t = useT();
  if (t < a || t > end) return null;
  const f = prog(t, fly, fly + 0.7, easeInOut);
  const size = lerp(500, 128, f);
  const cx = lerp(540, 124, f), cy = lerp(770, 522, f);
  const draw = prog(t, a, a + 2.6, (v: number) => v);
  const lab = 1 - prog(t, fly - 0.25, fly + 0.15);
  const glow = draw >= 1 && f < 0.5 ? 0.5 + 0.5 * Math.sin((t - a) * 3) : 0;
  return (
    <>
      <div style={{position: 'absolute', left: cx - size / 2, top: cy - size / 2, zIndex: 6}}><Picto id={id} size={size} draw={draw} glow={glow * (1 - f)} /></div>
      {lab > 0 && <Abs x={0} y={1046} w={1080} style={{opacity: lab * pop(t, a + 1.2), textAlign: 'center'}}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: name.length > 22 ? 56 : 66, color: INK, lineHeight: 1.05}}>{name}</div>
        <div style={{display: 'inline-block', marginTop: 16, background: c, color: '#fff', ...CAP, fontSize: 26, padding: '8px 18px', borderRadius: 8}}>{id} · {cls}</div>
      </Abs>}
      {lab > 0 && f === 0 && children}
      {f > 0.85 && <Abs x={204} y={474} w={820} style={{opacity: prog(t, fly + 0.45, fly + 0.8)}}><div style={{...CAP, fontSize: 22, color: c}}>{id} · {cls}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK, lineHeight: 1.1}}>{name}</div></Abs>}
    </>
  );
};
/** Exemples cités : pastilles qui apparaissent au rythme de la voix. */
const Chips: React.FC<{title: string; items: [string, number, string][]; c: string; y?: number; fs?: number}> = ({title, items, c, y = 630, fs = 36}) => {
  const t = useT();
  return (
    <Abs x={60} y={y} w={960}>
      <div style={{...CAP, fontSize: 24, color: DIM, marginBottom: 20}}>{title}</div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 20}}>
        {items.map(([l, a, ic]) => { const q = t > a ? Math.min(1, sp(t, a, 9, 13)) : 0; return (
          <div key={l} style={{...nb('#fff', 6), boxShadow: `6px 6px 0 ${c}`, display: 'flex', alignItems: 'center', gap: 14, padding: '12px 24px', fontFamily: sansFont, fontWeight: 900, fontSize: fs, color: INK, transform: `scale(${q})`, opacity: t > a ? 1 : 0}}><Ico n={ic} size={fs * 1.5} c={c} />{l}</div>
        ); })}
      </div>
    </Abs>
  );
};
/** Le réflexe QHSE : lignes cochées (icône Fluent). */
const Refl: React.FC<{items: [string, number, string][]; y?: number; at: number; fs?: number}> = ({items, y = 620, at, fs = 35}) => {
  const t = useT();
  return (
    <Abs x={60} y={y} w={960} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
      <div style={{alignSelf: 'flex-start', ...nb(GREEN, 5), borderColor: NBK, padding: '8px 20px', ...CAP, fontSize: 24, color: '#fff', display: 'flex', alignItems: 'center', gap: 10, transform: `scale(${Math.min(1, sp(t, at))})`, transformOrigin: '0 50%'}}><Ico n="ShieldCheck" size={30} c="#fff" />Le réflexe QHSE</div>
      {items.map(([l, a, ic]) => <Row key={l} at={a} ic={ic} l={l} c={GREEN} fs={fs} />)}
    </Abs>
  );
};
/** Tampon multiligne qui s'abat (échelle 2,4 → 1, rebond). */
const SlamCard: React.FC<{at: number; lines: string[]; c: string; rot?: number; size?: number; ic?: string}> = ({at, lines, c, rot = -4, size = 60, ic}) => {
  const t = useT();
  if (t < at - 0.12) return null;
  const q = prog(t, at - 0.12, at, easeIn);
  const bounce = t > at ? Math.sin(Math.min(1, (t - at) / 0.3) * Math.PI) * 0.05 : 0;
  return (
    <div style={{display: 'inline-flex', alignItems: 'center', gap: 22, background: c, color: '#fff', border: `7px solid ${NBK}`, borderRadius: 18, padding: '18px 34px', boxShadow: `10px 10px 0 ${NBK}`, transform: `rotate(${rot}deg) scale(${lerp(2.4, 1, q) + bounce})`, opacity: cl(q * 2)}}>
      {ic && <Ico n={ic} size={size * 1.4} c="#fff" />}
      <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, lineHeight: 1.05, letterSpacing: 2, textAlign: 'center'}}>{lines.map((l, k) => <div key={k}>{l}</div>)}</div>
    </div>
  );
};
const Punch: React.FC<{at: number; lines: string[]; c: string; y?: number; size?: number; ic?: string; pre?: React.ReactNode}> = ({at, lines, c, y = 820, size = 60, ic, pre}) => (
  <>
    {pre}
    <Abs x={0} y={y} w={1080} style={{display: 'flex', justifyContent: 'center', zIndex: 7}}><SlamCard at={at} lines={lines} c={c} size={size} ic={ic} /></Abs>
    <GyroFlash at={at} />
  </>
);
/** Carte néo-brutale à icône qui apparaît (grilles d'effets, d'états). */
const NTile: React.FC<{at: number; ic: string; l: string; c: string; w: number; h: number; fs?: number; children?: React.ReactNode}> = ({at, ic, l, c, w, h, fs = 32, children}) => {
  const t = useT();
  const q = t > at ? Math.min(1, sp(t, at, 8, 13)) : 0;
  return (
    <div style={{position: 'relative', width: w, height: h, ...nb('#fff', 7), borderColor: NBK, boxShadow: `7px 7px 0 ${c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 12, textAlign: 'center', transform: `translateY(${(1 - q) * 70}px) scale(${0.8 + 0.2 * q})`, opacity: cl(q * 1.6), overflow: 'hidden'}}>
      {children || <Ico n={ic} size={Math.min(w, h) * 0.42} c={c} />}
      <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: fs, color: INK, lineHeight: 1.1}}>{l}</div>
    </div>
  );
};
/** Pictogramme de taille moyenne qui se dessine (comparaisons, conclusion). */
const PDraw: React.FC<{id: string; a: number; x: number; y: number; size: number; dur?: number; glow?: number}> = ({id, a, x, y, size, dur = 1.6, glow = 0}) => {
  const t = useT();
  return <div style={{position: 'absolute', left: x - size / 2, top: y - size / 2}}><Picto id={id} size={size} draw={prog(t, a, a + dur, (v: number) => v)} glow={glow} /></div>;
};
/** Globe photo-texturé : la photo HD défile derrière un masque circulaire, méridiens qui tournent, ombrage 3D et halo. */
const PhotoGlobe: React.FC<{t: number; d: number; src?: string}> = ({t, d, src = 'sysqsse-gen/environnement.jpg'}) => {
  const W = d * 1672 / 941, x = (t * 150) % W, ph = t * 1.6, R = d / 2;
  return (
    <div style={{position: 'relative', width: d, height: d}}>
      <div style={{position: 'absolute', inset: -26, borderRadius: '50%', background: `radial-gradient(circle, ${OKG}55 55%, ${OKG}00 72%)`}} />
      <div style={{position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', border: `6px solid ${NBK}`, boxShadow: `12px 12px 0 ${NBK}`, boxSizing: 'border-box'}}>
        <div style={{position: 'absolute', left: -x, top: 0, width: W * 2, height: d, display: 'flex'}}>{[0, 1].map((k) => <Img key={k} src={PH(src)} style={{width: W, height: d, objectFit: 'cover', display: 'block'}} />)}</div>
        <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 33% 28%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 30%), radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 52%, rgba(4,24,40,0.62) 100%)`}} />
        <svg width={d} height={d} style={{position: 'absolute', left: 0, top: 0}}>
          {Array.from({length: 6}, (_, k) => { const a = ph + (k * Math.PI) / 6; const rx = Math.abs(Math.cos(a)) * R; return <ellipse key={k} cx={R} cy={R} rx={rx} ry={R - 3} fill="none" stroke="#fff" strokeOpacity={0.18 + 0.32 * Math.abs(Math.sin(a))} strokeWidth={2} />; })}
          {[-0.62, -0.31, 0, 0.31, 0.62].map((f, k) => { const y = R + f * R; const rx = Math.sqrt(Math.max(0, R * R - (f * R) ** 2)); return <ellipse key={`l${k}`} cx={R} cy={y} rx={rx} ry={rx * 0.12} fill="none" stroke="#fff" strokeOpacity={0.35} strokeWidth={1.6} />; })}
        </svg>
      </div>
      <div style={{position: 'absolute', left: d * 0.5 + Math.cos(t * 2.2) * (R + 30) - 26, top: d * 0.5 + Math.sin(t * 2.2) * (R * 0.28) - 26, width: 52, height: 52, borderRadius: 14, background: '#fff', border: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: Math.sin(t * 2.2) > 0 ? 2 : 0, opacity: Math.sin(t * 2.2) > 0 ? 1 : 0.35}}><Ico n="Thermometer" size={30} c={KOR} /></div>
    </div>
  );
};


/* ═════════════ Guichet 1 : introduction — carrousel convergent, dangers, étiquette, recherche, SGH ═════════════ */
const Jerrican: React.FC<{lab: number}> = ({lab}) => (
  <svg width={420} height={480} viewBox="0 0 420 480">
    <path d="M 60 90 L 260 90 L 260 40 L 330 40 L 330 90 L 360 90 Q 380 90 380 110 L 380 450 Q 380 470 360 470 L 60 470 Q 40 470 40 450 L 40 110 Q 40 90 60 90 Z" fill="#2E6FD1" stroke={NBK} strokeWidth={8} />
    <rect x={120} y={50} width={110} height={30} rx={12} fill="#2E6FD1" stroke={NBK} strokeWidth={7} />
    <rect x={80} y={170} width={260} height={250} rx={14} fill="#fff" stroke={NBK} strokeWidth={6} opacity={lab} />
  </svg>
);
const Intro: React.FC = () => {
  const t = useT();
  const D5: [string, number, string, number][] = [['Inflammables', 7.1, 'feu', -90], ['Brûlures', 9.6, 'chaud', -18], ['Intoxications', 10.2, 'crane', 54], ['Santé', 12.0, 'coeur', 126], ['Environnement', 12.4, 'globe', 198]];
  const SGHW: [string, string, number][] = [['S', 'Système', 27.0], ['G', 'Général', 27.6], ['H', 'Harmonisé', 27.9]];
  const ST3: [string, string, number, string][] = [['Découvrir', 'les 9 pictogrammes', 36.0, 'loupe2'], ['Comprendre', 'leurs significations', 38.5, 'cerveau'], ['Identifier', 'les bons réflexes', 40.9, 'bouclier']];
  return (
    <Out end={50.6}>
      <Heads h={[[2.9, ['Des produits chimiques', 'au quotidien'], [0]], [6.5, ['Inflammables, brûlures,', 'intoxications…'], [0]], [13.5, ['Comment reconnaître', 'ces dangers ?'], [1]], [16.9, ['La réponse :', 'son étiquette'], [1]], [18.7, ['Losanges à bord rouge,', 'symboles noirs'], [0, 1]], [24.9, ['Les pictogrammes', 'de danger du SGH'], [1]], [31.4, ['Un véritable langage', 'de prévention'], [1]], [34.4, ['Découvrir, comprendre,', 'identifier'], [0, 1]], [44.6, ['Comprendre le danger,', "c'est déjà prévenir"], [1]]]} />
      <Ph a={2.65} b={7.05}><PictoRing a={2.7} b={7.0} cy={880} /></Ph>
      <Ph a={7.0} b={13.4}>
        <div style={{position: 'absolute', left: 540 - 130, top: 880 - 130, width: 260, height: 260, borderRadius: '50%', ...nb('#fff', 8), borderColor: NBK, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1, sp(t, 7.0))})`}}><Ico n="eprouvette" size={170} /></div>
        {D5.map(([l, a, ic, ang]) => { const q = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0; const r = 360, x = 540 + r * Math.cos((ang * Math.PI) / 180), y = 880 + r * 0.95 * Math.sin((ang * Math.PI) / 180); return (
          <div key={l} style={{position: 'absolute', left: x - 150, top: y - 52, width: 300, display: 'flex', justifyContent: 'center', transform: `scale(${q})`, opacity: t > a ? 1 : 0}}><div style={{...nb('#fff', 6), boxShadow: `6px 6px 0 ${RED}`, display: 'flex', alignItems: 'center', gap: 12, padding: '12px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK, whiteSpace: 'nowrap'}}><Ico n={ic} size={56} />{l}</div></div>
        ); })}
      </Ph>
      <Ph a={13.4} b={18.7}>
        <QBubble at={13.7} text="Comment reconnaître ces dangers ?" x={110} y={470} w={860} c={NAVY} fs={40} dur={1.4} />
        {t > 16.7 && <Photo src="sgh-gen/lecture-etiquette.jpg" x={110} y={640} w={860} h={573} at={16.8} c={NAVY} pos="50% 50%" />}
        <LoupeSweep x0={420} y0={1150} x1={673} y1={920} a={17.4} b={18.4} size={170} />
        {t > 18.1 && <Abs x={0} y={1230} w={1080} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={18.2} text="Son étiquette" bg={NAVY} rot={-2} size={34} /></Abs>}
      </Ph>
      <Ph a={18.7} b={24.85}>
        <SearchOpen x={60} y={450} w={960} h={880} at={18.8} query="pictogrammes SGH" results={['Pictogrammes SGH · les 9 symboles', 'Étiquette · mentions de danger', 'FDS · fiche de données de sécurité']} found={0} foundAt={20.0} clickAt={20.6} c={RED}>
          <div style={{position: 'absolute', inset: 0, background: '#FAFAF7'}}>
            {SGH_IDS.map((id, k) => <PDraw key={id} id={id} a={21.0 + k * 0.09} x={170 + (k % 3) * 310} y={120 + Math.floor(k / 3) * 230} size={205} dur={1.0} />)}
            <Hot x={170} y={30} at={22.2} l="Losange à bord rouge" c={RED} dx={120} dy={0} />
            <Hot x={170} y={120} at={23.5} l="Symbole noir" c={NBK} dx={130} dy={10} />
          </div>
        </SearchOpen>
      </Ph>
      <Ph a={24.85} b={31.35}>
        <Abs x={60} y={540} w={960} style={{display: 'flex', justifyContent: 'center', gap: 40}}>
          {SGHW.map(([ch, w, a], k) => { const q = Math.min(1, sp(t, 25.5 + k * 0.25, 8, 12)); return (
            <div key={ch} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22}}>
              <div style={{width: 230, height: 230, borderRadius: 30, ...nb(k === 1 ? RED : NAVY, 9), borderColor: NBK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 170, color: '#fff', transform: `scale(${q}) rotate(${(1 - q) * -20}deg)`}}>{ch}</div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK, opacity: pop(t, a), transform: `translateY(${(1 - pop(t, a)) * 30}px)`}}>{w}</div>
            </div>
          ); })}
        </Abs>
        <Abs x={90} y={960} w={900} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 40, color: DIM, lineHeight: 1.25, opacity: pop(t, 28.5)}}>de classification et d'étiquetage<br />des produits chimiques</Abs>
        {t > 29.8 && <Abs x={0} y={1150} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 22}}>{SGH_IDS.map((id, k) => <div key={id} style={{opacity: pop(t, 29.8 + k * 0.06)}}><Picto id={id} size={92} /></div>)}</Abs>}
      </Ph>
      <Ph a={31.35} b={34.35}>
        <Abs x={110} y={560} w={860} h={560} style={{...nb('#fff', 9), borderColor: NBK, borderRadius: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, transform: `scale(${Math.min(1, sp(t, 31.4))})`}}>
          <div style={{display: 'flex', gap: 30}}>{['SGH02', 'SGH05', 'SGH09'].map((id, k) => <Picto key={id} id={id} size={210} draw={prog(t, 31.6 + k * 0.25, 32.6 + k * 0.25, (v: number) => v)} />)}</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: INK}}>= un langage universel</div>
          <div style={{position: 'absolute', left: 120, bottom: -70, width: 0, height: 0, borderLeft: '40px solid transparent', borderRight: '40px solid transparent', borderTop: `70px solid ${NBK}`}} />
        </Abs>
      </Ph>
      <Ph a={34.35} b={44.55}>
        <div style={{position: 'absolute', left: 150, top: 900, width: 780 * prog(t, 36.0, 41.4), height: 14, borderRadius: 7, background: GREEN, zIndex: 0}} />
        <Abs x={60} y={640} w={960} style={{display: 'flex', justifyContent: 'space-between'}}>
          {ST3.map(([l, s0, a, ic], k) => <NTile key={l} at={a} ic={ic} l={l} c={[NAVY, RED, GREEN][k]} w={300} h={520} fs={44}><div style={{width: 60, height: 60, borderRadius: '50%', background: [NAVY, RED, GREEN][k], color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 34, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{k + 1}</div><Ico n={ic} size={170} /><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 30, color: DIM, lineHeight: 1.15}}>{s0}</div></NTile>)}
        </Abs>
      </Ph>
      <Ph a={44.55} b={50.6}><Punch at={47.5} lines={['COMPRENDRE LE DANGER,', "C'EST DÉJÀ PRÉVENIR", "L'ACCIDENT"]} c={GREEN} size={50} ic="ShieldCheck" /></Ph>
    </Out>
  );
};

/* ═════════════ Guichet 2 : SGH01 — la bombe qui explose ═════════════ */
const Triggers: React.FC = () => {
  const t = useT();
  const TR: [string, number, string, number, number][] = [['Choc', 58.9, 'collision', -1, -1], ['Friction', 59.9, 'vibration', 1, -1], ['Flamme', 60.7, 'feu', -1, 1], ['Chaleur', 61.5, 'thermometre', 1, 1]];
  const boom = t > 62.1 ? Math.max(0, 1 - (t - 62.1) / 0.7) : 0;
  const shake = t > 58.9 && t < 62.3 ? Math.sin(t * 60) * (2 + 8 * prog(t, 58.9, 62.1)) : 0;
  return (
    <>
      <div style={{position: 'absolute', left: 540 - 170 + shake, top: 930 - 170, zIndex: 3}}><Picto id="SGH01" size={340} glow={prog(t, 58.9, 62.1)} /></div>
      {TR.map(([l, a, ic, sx, sy]) => { const q = prog(t, a, a + 0.6, easeOut); const x = 540 + sx * lerp(420, 300, q), y = 930 + sy * lerp(320, 250, q); return t > a - 0.05 ? (
        <div key={l} style={{position: 'absolute', left: x - 100, top: y - 85, width: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: pop(t, a), zIndex: 4}}>
          <div style={{width: 118, height: 118, borderRadius: '50%', ...nb('#fff', 5), borderColor: NBK, boxShadow: `5px 5px 0 ${C01}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n={ic} size={72} /></div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>{l}</div>
        </div>
      ) : null; })}
      {boom > 0 && <><AbsoluteFill style={{background: '#fff', opacity: boom * 0.85, zIndex: 8}} /><div style={{position: 'absolute', left: 540 - (80 + 520 * (1 - boom)), top: 930 - (80 + 520 * (1 - boom)), width: 2 * (80 + 520 * (1 - boom)), height: 2 * (80 + 520 * (1 - boom)), borderRadius: '50%', border: `14px solid ${C01}`, opacity: boom, zIndex: 9}} /></>}
      {t > 62.15 && <Abs x={0} y={1180} w={1080} style={{display: 'flex', justifyContent: 'center', zIndex: 10}}><SlamTag at={62.25} text="RISQUE D'EXPLOSION" c={C01} rot={-3} size={48} ic="TriangleAlert" /></Abs>}
    </>
  );
};
const Sgh01: React.FC = () => {
  const t = useT();
  return (
    <Out end={90.6}>
      <Heads h={[[53.3, ['Ce symbole indique', "un risque d'explosion"], [1]], [55.7, ['Choc, friction, flamme', 'ou chaleur'], [0, 1]], [62.8, ['Explosifs, autoréactifs,', 'peroxydes organiques'], [0, 1]], [70.5, ['Mal manipulés,', 'mal stockés'], [0, 1]], [75.6, ['Le réflexe', 'QHSE'], [1]], [86.2, ['La prudence', 'doit être maximale'], [1]]]} />
      <Hero id="SGH01" a={53.5} fly={55.8} end={90.6} name="La bombe qui explose" cls="Explosifs" c={C01} />
      <Ph a={56.4} b={62.75}><Triggers /></Ph>
      <Ph a={62.75} b={70.45}><Chips title="On le retrouve notamment sur" items={[['Explosifs', 65.3, 'bombe'], ['Substances autoréactives', 67.3, 'eclair'], ['Peroxydes organiques', 69.0, 'eprouvette']]} c={C01} /></Ph>
      <Ph a={70.45} b={75.55}>
        <Abs x={60} y={620} w={960} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb(C01, 6), borderColor: NBK, padding: '10px 22px', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 34, transform: `scale(${Math.min(1, sp(t, 71.2))})`}}>Danger particulièrement élevé</div></Abs>
        <Abs x={60} y={740} w={960} style={{display: 'flex', justifyContent: 'space-between'}}>
          {([['Mal manipulés', 73.5, 'bris'], ['Mal stockés', 74.2, 'stock']] as [string, number, string][]).map(([l, a, ic]) => <NTile key={l} at={a} ic={ic} l={l} c={KOR} w={450} h={420} fs={42}><Ico n={ic} size={170} /><div style={{position: 'absolute', right: 18, top: 18, width: 70, height: 70, borderRadius: '50%', background: KOR, border: `4px solid ${NBK}`, color: '#fff', fontSize: 44, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1, sp(t, a + 0.3))})`}}>✗</div></NTile>)}
        </Abs>
      </Ph>
      <Ph a={75.55} b={86.15}><Refl at={75.8} items={[['Éviter chocs, frictions et chaleur', 77.0, 'collision'], ['Respecter les conditions de stockage', 82.5, 'stock'], ['Suivre les consignes spécifiques du produit', 83.8, 'clipboard']]} /></Ph>
      <Ph a={86.15} b={90.6}><Punch at={87.8} lines={['PRUDENCE', 'MAXIMALE']} c={C01} size={76} ic="TriangleAlert" /></Ph>
    </Out>
  );
};

/* ═════════════ Guichet 3 : SGH02 — la flamme ═════════════ */
const Sgh02: React.FC = () => {
  const t = useT();
  const st: [string, number, string][] = [['Liquides', 109.3, 'goutte'], ['Gaz', 111.4, 'vapeur'], ['Solides', 111.7, 'brique']];
  const sk = prog(t, 113.9, 114.6, easeIn);
  const fl = prog(t, 114.6, 115.8, easeOut);
  return (
    <Out end={132.9}>
      <Heads h={[[93.9, ['Un produit inflammable', "qui s'enflamme facilement"], [0]], [100.5, ['Essence, acétone, solvants,', 'alcool, aérosols'], [0]], [106.9, ['Pas uniquement', 'les liquides'], [1]], [113.8, ['Une simple étincelle', 'peut suffire'], [0]], [116.4, ['Les bons', 'réflexes'], [1]], [127.4, ['Pensez au risque', "d'incendie"], [1]]]} />
      <Hero id="SGH02" a={93.6} fly={100.3} end={132.9} name="La flamme" cls="Inflammables" c={C02} />
      <Ph a={100.35} b={106.85}><Chips title="Ce danger concerne notamment" items={[['Essence', 102.0, 'goutte'], ['Acétone', 102.5, 'eprouvette'], ['Solvants', 104.2, 'eprouvette'], ['Alcool à brûler', 105.0, 'feu'], ['Aérosols inflammables', 106.0, 'vapeur']]} c={C02} /></Ph>
      <Ph a={106.85} b={113.75}>
        <Abs x={60} y={680} w={960} style={{display: 'flex', justifyContent: 'space-between'}}>
          {st.map(([l, a, ic]) => <NTile key={l} at={a} ic={ic} l={l} c={C02} w={295} h={420} fs={40}><Ico n={ic} size={150} />{t > a + 0.4 && <div style={{position: 'absolute', right: 14, top: 10, transform: `scale(${Math.min(1, sp(t, a + 0.4))})`}}><Ico n="feu" size={80} /></div>}</NTile>)}
        </Abs>
      </Ph>
      <Ph a={113.75} b={116.35}>
        {sk < 1 && <div style={{position: 'absolute', left: lerp(80, 520, sk), top: lerp(720, 940, sk), width: 40, height: 40, borderRadius: '50%', background: 'radial-gradient(circle, #fff 0%, #FFE27A 45%, rgba(255,120,0,0) 75%)', boxShadow: '0 0 30px 12px rgba(255,200,40,0.8)'}} />}
        {fl > 0 && <div style={{position: 'absolute', left: 540 - 220 * fl, top: 1060 - 440 * fl, width: 440 * fl, height: 440 * fl, filter: `drop-shadow(0 0 ${40 * fl}px rgba(255,90,0,0.8))`}}><Ico n="feu" size={440 * fl} /></div>}
        {t > 115.8 && <Abs x={0} y={1130} w={1080} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={115.9} text="Un incendie" bg={C02} rot={-3} size={40} /></Abs>}
      </Ph>
      <Ph a={116.35} b={127.35}><Refl at={116.6} items={[['Éloigner des flammes et des étincelles', 118.0, 'feu'], ['Ne jamais fumer à proximité', 121.2, 'sens-interdit'], ['Refermer les récipients après usage', 123.0, 'colis'], ['Respecter les exigences de ventilation', 125.1, 'vent']]} /></Ph>
      <Ph a={127.35} b={132.9}><Punch at={130.9} lines={['RISQUE', "D'INCENDIE"]} c={C02} size={76} ic="Flame" /></Ph>
    </Out>
  );
};

/* ═════════════ Guichet 4 : SGH03 — la flamme sur un cercle ═════════════ */
const Sgh03: React.FC = () => {
  const t = useT();
  const ring = t > 138.6 ? 0.5 + 0.5 * Math.sin((t - 138.6) * 9) : 0;
  const edge = prog(t, 145.3, 146.5);
  const fire = prog(t, 146.3, 147.1, easeOut);
  const V: [number, number, string, string][] = [[540, 650, 'Comburant', 'bulle'], [250, 1150, 'Combustible', 'arbre'], [830, 1150, 'Chaleur', 'chaud']];
  const big = prog(t, 156.7, 158.4, easeInOut);
  const away = prog(t, 165.0, 167.0, easeInOut);
  const CB: [string, number, string][] = [['Papier', 165.2, 'ecrit'], ['Bois', 165.6, 'arbre'], ['Huiles', 166.1, 'goutte'], ['Chiffons', 166.7, 'toile']];
  return (
    <Out end={173.9}>
      <Heads h={[[134.1, ['Ne le confondez pas', 'avec le précédent'], [1]], [137.6, ['La flamme est', "au-dessus d'un cercle"], [1]], [139.5, ['Le pictogramme', 'des comburants'], [1]], [145.1, ['Il favorise la combustion', "d'autres matières"], [0]], [149.4, ['Oxygène, peroxydes,', 'nitrates'], [0, 1]], [155.9, ['Un feu soudainement', 'plus intense'], [1]], [159.8, ['Loin des matières', 'combustibles'], [1]], [167.1, ['Un incendie beaucoup', 'plus dangereux'], [1]]]} />
      <Ph a={135.6} b={139.45}>
        <PDraw id="SGH02" a={135.7} x={290} y={800} size={380} dur={1.0} />
        <PDraw id="SGH03" a={136.1} x={790} y={800} size={380} dur={1.0} />
        {t > 136.6 && <div style={{position: 'absolute', left: 490, top: 750, width: 100, height: 100, borderRadius: '50%', background: '#fff', border: `6px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: KOR, transform: `scale(${lerp(2.2, 1, prog(t, 136.6, 136.8, easeIn))})`}}>≠</div>}
        <Abs x={90} y={1020} w={400} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: C02, opacity: pop(t, 137.0)}}>Inflammable</Abs>
        <Abs x={590} y={1020} w={400} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: C03, opacity: pop(t, 137.2)}}>Comburant</Abs>
        {ring > 0 && <div style={{position: 'absolute', left: 790 - 52, top: 800 + 27 * 1.9 - 52, width: 104, height: 104, borderRadius: '50%', border: `7px solid ${C03}`, boxShadow: `0 0 ${20 + 20 * ring}px ${C03}`, opacity: 0.6 + 0.4 * ring}} />}
        <LoupeSweep x0={640} y0={1000} x1={790} y1={851} a={138.35} b={139.3} size={170} />
      </Ph>
      <Hero id="SGH03" a={139.5} fly={145.0} end={173.9} name="La flamme sur un cercle" cls="Comburants" c={C03} />
      <Ph a={145.05} b={149.35}>
        <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}><polygon points={V.map(([x, y]) => `${x},${y}`).join(' ')} fill="none" stroke={NBK} strokeWidth={10} strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - edge} /></svg>
        {V.map(([x, y, l, ic], k) => <div key={l} style={{position: 'absolute', left: x - 110, top: y - 75, width: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: pop(t, 145.3 + k * 0.25)}}><div style={{width: 120, height: 120, borderRadius: '50%', ...nb(k === 0 ? C03 : '#fff', 6), borderColor: NBK, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n={ic} size={74} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: k === 0 ? C03 : INK}}>{l}</div></div>)}
        {fire > 0 && <div style={{position: 'absolute', left: 540 - 110 * fire, top: 1000 - 200 * fire, filter: `drop-shadow(0 0 ${30 * fire}px rgba(255,90,0,0.7))`}}><Ico n="feu" size={220 * fire} /></div>}
        {t > 147.9 && <Abs x={0} y={1290} w={1080} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={148.0} text="Il ne brûle pas forcément lui-même" bg={C03} rot={-2} size={30} /></Abs>}
      </Ph>
      <Ph a={149.35} b={155.85}><Chips title="On le retrouve notamment sur" items={[["Produits contenant de l'oxygène", 152.4, 'bulle'], ['Peroxydes concentrés', 153.7, 'eprouvette'], ['Nitrates', 154.8, 'goutte']]} c={C03} /></Ph>
      <Ph a={155.85} b={159.75}>
        {Array.from({length: 10}, (_, k) => { const ph = ((t - 156.0) * 0.9 + k * 0.1) % 1; return t > 156.0 ? <div key={k} style={{position: 'absolute', left: 380 + ((k * 73) % 300), top: 1250 - ph * 380, width: 30, height: 30, borderRadius: '50%', border: `4px solid ${C04}`, background: '#DCEBFF', opacity: (1 - ph) * prog(t, 156.0, 156.4)}} /> : null; })}
        <div style={{position: 'absolute', left: 540 - lerp(110, 230, big), top: 1100 - lerp(220, 460, big), filter: `drop-shadow(0 0 ${lerp(10, 60, big)}px rgba(255,80,0,0.8))`}}><Ico n="feu" size={lerp(220, 460, big)} /></div>
        <div style={{position: 'absolute', left: 900, top: 640, width: 70, height: 560, ...nb('#fff', 5), borderColor: NBK, overflow: 'hidden'}}><div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: `${lerp(20, 100, big)}%`, background: `linear-gradient(0deg, ${OKG}, ${C03} 50%, ${KOR})`}} /></div>
        {t > 158.1 && <Abs x={0} y={1180} w={1080} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={158.2} text="Beaucoup plus intense" bg={KOR} rot={-3} size={36} /></Abs>}
      </Ph>
      <Ph a={159.75} b={167.05}>
        <Abs x={60} y={620} w={960}><Row at={161.6} ic="arbre" l="Éloigner des matières combustibles" c={GREEN} fs={34} /></Abs>
        <div style={{position: 'absolute', left: 80, top: 860}}><Picto id="SGH03" size={230} /></div>
        <div style={{position: 'absolute', left: 330, top: 966, width: 90 + 100 * away, height: 10, borderRadius: 5, background: NBK}} />
        <div style={{position: 'absolute', left: 410 + 100 * away, top: 950, width: 0, height: 0, borderTop: '21px solid transparent', borderBottom: '21px solid transparent', borderLeft: `34px solid ${NBK}`}} />
        <Abs x={450 + 100 * away} y={760} w={460} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
          {CB.map(([l, a, ic]) => { const q = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0; return <div key={l} style={{...nb('#fff', 5), boxShadow: `5px 5px 0 ${C03}`, display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, transform: `scale(${q})`, opacity: t > a ? 1 : 0}}><Ico n={ic} size={50} />{l}</div>; })}
        </Abs>
      </Ph>
      <Ph a={167.05} b={173.9}><Punch at={171.6} lines={['UN INCENDIE BEAUCOUP', 'PLUS DANGEREUX']} c={C03} size={52} ic="Flame" pre={t > 168.6 ? <Abs x={0} y={640} w={1080} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={168.7} text="Pas forcément incombustible" bg={NAVY} rot={-2} size={34} /></Abs> : null} /></Ph>
    </Out>
  );
};

/* ═════════════ Guichet 5 : SGH04 — la bouteille de gaz ═════════════ */
const Cyl: React.FC<{w: number; h: number; c: string; frost?: number}> = ({w, h, c, frost = 0}) => (
  <svg width={w} height={h} viewBox="0 0 160 400">
    <rect x={64} y={6} width={32} height={30} rx={4} fill="#5B6476" stroke={NBK} strokeWidth={5} />
    <path d="M 40 70 Q 40 40 80 40 Q 120 40 120 70 L 140 110 L 140 380 Q 140 394 126 394 L 34 394 Q 20 394 20 380 L 20 110 Z" fill={c} stroke={NBK} strokeWidth={6} />
    <rect x={30} y={120} width={14} height={250} rx={7} fill="#fff" opacity={0.35} />
    {frost > 0 && <path d="M 40 70 Q 40 40 80 40 Q 120 40 120 70 L 140 110 L 140 380 Q 140 394 126 394 L 34 394 Q 20 394 20 380 L 20 110 Z" fill="#DFF3FF" opacity={0.75 * frost} />}
  </svg>
);
const Sgh04: React.FC = () => {
  const t = useT();
  const heat = prog(t, 186.9, 187.6) * (1 - prog(t, 189.4, 189.8));
  const needle = lerp(-90, 80, prog(t, 186.9, 188.6, easeIn));
  const boom = t > 188.7 ? Math.max(0, 1 - (t - 188.7) / 0.6) : 0;
  const shake = t > 187.6 && t < 188.9 ? Math.sin(t * 70) * 6 : 0;
  const frost = prog(t, 190.3, 191.6);
  const CY: [string, number, string][] = [['Oxygène', 195.8, '#9FB3CC'], ['Azote', 196.7, '#5B6476'], ['CO₂', 197.5, '#8A97A5'], ['Acétylène', 198.4, '#8E5A43']];
  return (
    <Out end={217.5}>
      <Heads h={[[176.1, ['Une bouteille', 'de gaz'], [1]], [179.1, ['Un gaz', 'sous pression'], [1]], [182.0, ['Comprimé, liquéfié,', 'dissous ou réfrigéré'], [0, 1]], [185.2, ['Une bouteille chauffée', 'peut exploser'], [1]], [189.8, ['Gaz réfrigérés :', 'brûlures par le froid'], [1]], [193.9, ['Oxygène, azote,', 'CO₂, acétylène'], [0, 1]], [199.0, ['Les bons', 'réflexes'], [1]], [209.6, ['Une manipulation', 'rigoureuse'], [1]]]} />
      <Hero id="SGH04" a={176.9} fly={181.9} end={217.5} name="La bouteille de gaz" cls="Gaz sous pression" c={C04} />
      <Ph a={181.95} b={185.15}>
        <Abs x={60} y={700} w={960} style={{display: 'flex', justifyContent: 'space-between'}}>
          {([['Comprimé', 182.7, 'Gauge'], ['Liquéfié', 183.5, 'goutte'], ['Dissous', 183.9, 'eprouvette'], ['Réfrigéré', 184.8, 'froid']] as [string, number, string][]).map(([l, a, ic]) => <NTile key={l} at={a} ic={ic} l={l} c={C04} w={220} h={320} fs={32} />)}
        </Abs>
      </Ph>
      <Ph a={185.15} b={193.85}>
        <div style={{position: 'absolute', left: 540 - 110 + shake, top: 600, transform: 'rotate(90deg)', transformOrigin: '110px 270px'}}><Cyl w={220} h={540} c="#4F7FC4" frost={frost} /></div>
        {heat > 0 && [0, 1, 2, 3].map((k) => <div key={k} style={{position: 'absolute', left: 300 + k * 130, top: 1010 - 30 * Math.sin(t * 9 + k), opacity: heat, transform: `scale(${heat})`}}><Ico n="feu" size={110} /></div>)}
        {t > 186.6 && t < 189.6 && <div style={{position: 'absolute', left: 800, top: 600, width: 200, height: 120}}>
          <svg width={200} height={120} viewBox="0 0 200 120"><path d="M 20 110 A 80 80 0 0 1 180 110" fill="#fff" stroke={NBK} strokeWidth={8} /><path d="M 140 50 A 80 80 0 0 1 180 110" fill="none" stroke={KOR} strokeWidth={14} /><line x1={100} y1={110} x2={100 + 70 * Math.sin((needle * Math.PI) / 180)} y2={110 - 70 * Math.cos((needle * Math.PI) / 180)} stroke={NBK} strokeWidth={7} strokeLinecap="round" /><circle cx={100} cy={110} r={10} fill={NBK} /></svg>
        </div>}
        {boom > 0 && <AbsoluteFill style={{background: '#fff', opacity: boom * 0.85, zIndex: 8}} />}
        {t > 188.6 && t < 189.9 && <Abs x={0} y={1150} w={1080} style={{display: 'flex', justifyContent: 'center', zIndex: 9}}><SlamTag at={188.7} text="PEUT EXPLOSER" c={KOR} rot={-4} size={56} ic="TriangleAlert" /></Abs>}
        {frost > 0 && [[260, 640], [820, 700], [300, 1050], [780, 1080]].map(([x, y], k) => <div key={k} style={{position: 'absolute', left: x, top: y, opacity: frost, transform: `rotate(${t * 30 + k * 40}deg) scale(${frost})`}}><Ico n="froid" size={90} /></div>)}
        {t > 192.2 && <Abs x={0} y={1190} w={1080} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={192.3} text="Brûlures par le froid" bg={C04} rot={-2} size={38} /></Abs>}
      </Ph>
      <Ph a={193.85} b={198.95}>
        <Abs x={60} y={640} w={960} style={{display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
          {CY.map(([l, a, c]) => { const q = t > a ? Math.min(1, sp(t, a, 8, 12)) : 0; return (
            <div key={l} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, transform: `translateY(${(1 - q) * 120}px)`, opacity: cl(q * 1.5)}}><Cyl w={170} h={425} c={c} /><div style={{...nb('#fff', 5), borderColor: NBK, padding: '8px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 32}}>{l}</div></div>
          ); })}
        </Abs>
      </Ph>
      <Ph a={198.95} b={209.55}><Refl at={199.2} items={[['Bouteilles correctement arrimées', 202.1, 'maillon'], ['Protégées de la chaleur', 203.8, 'chaud'], ['Chariot adapté pour le déplacement', 205.6, 'chariot'], ['Vérifier leur état', 208.2, 'loupe2']]} /></Ph>
      <Ph a={209.55} b={217.5}><Punch at={214.6} lines={['MANIPULATION', 'RIGOUREUSE']} c={C04} size={70} ic="ShieldCheck" pre={t > 210.7 ? <Abs x={0} y={640} w={1080} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={210.8} text="Jamais un simple récipient" bg={NAVY} rot={-2} size={36} /></Abs> : null} /></Ph>
    </Out>
  );
};

/* ═════════════ Guichet 6 : SGH05 — la corrosion ═════════════ */
const Sgh05: React.FC = () => {
  const t = useT();
  const hole = prog(t, 231.0, 231.7);
  const drop = prog(t, 238.0, 239.8, easeIn);
  const hit = t > 240.0 ? Math.max(0, 1 - (t - 240.0) / 0.6) : 0;
  const sw = ((t - 263.4) * 120) % 360;
  return (
    <Out end={267.4}>
      <Heads h={[[218.6, ['Le pictogramme', 'de la corrosion'], [1]], [221.3, ['Un liquide qui attaque', 'une main et un métal'], [1]], [225.9, ['Peau, yeux', 'et métaux'], [0, 1]], [231.8, ['Acides', 'et bases'], [0, 1]], [237.6, ['Une projection :', 'conséquences très graves'], [1]], [242.5, ['Les bons', 'réflexes'], [1]], [263.4, ['Chaque seconde', 'compte'], [1]]]} />
      <Hero id="SGH05" a={220.5} fly={225.8} end={267.4} name="La corrosion" cls="Corrosifs" c={C05}>
        <Hot x={627} y={850} at={223.8} l="Une main" c={C05} dx={150} dy={-120} />
        <Hot x={458} y={832} at={224.3} l="Surface métallique" c={C05} dx={-120} dy={-140} />
      </Hero>
      <Ph a={225.85} b={231.75}>
        <Abs x={60} y={650} w={960} style={{display: 'flex', justifyContent: 'space-between'}}>
          <NTile at={228.1} ic="main-levee" l="Brûlures de la peau" c={C05} w={300} h={440} fs={32} />
          <NTile at={229.6} ic="yeux" l="Lésions oculaires sévères" c={C05} w={300} h={440} fs={32} />
          <NTile at={231.0} ic="boulon" l="Métaux corrodés" c={C05} w={300} h={440} fs={32}>
            <svg width={220} height={150} viewBox="0 0 220 150"><rect x={10} y={60} width={200} height={50} rx={6} fill="#8A97A5" stroke={NBK} strokeWidth={5} />{[40, 95, 150].map((x, k) => <ellipse key={k} cx={x + 10} cy={70} rx={16 * hole} ry={9 * hole} fill="#3B2A1A" />)}{[0, 1, 2].map((k) => <ellipse key={`d${k}`} cx={50 + k * 55} cy={20 + ((t * 80 + k * 30) % 40)} rx={5} ry={8} fill={C05} />)}</svg>
          </NTile>
        </Abs>
      </Ph>
      <Ph a={231.75} b={237.55}>
        <Abs x={60} y={650} w={960} style={{display: 'flex', justifyContent: 'space-between'}}>
          {([['ACIDES', 234.3, 'Acide sulfurique', 234.8, '#E2483B'], ['BASES', 236.3, 'Soude caustique', 236.8, '#3B6FD8']] as [string, number, string, number, string][]).map(([l, a, ex, b, c]) => <NTile key={l} at={a} ic="eprouvette" l="" c={c} w={455} h={520}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: c, letterSpacing: 3}}>{l}</div><Ico n="eprouvette" size={170} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK, opacity: pop(t, b)}}>{ex}</div></NTile>)}
        </Abs>
      </Ph>
      <Ph a={237.55} b={242.45}>
        <div style={{position: 'absolute', left: 170, top: 760, transform: `rotate(${lerp(0, 50, prog(t, 237.7, 238.2))}deg)`, transformOrigin: '50% 80%'}}><Ico n="eprouvette" size={220} /></div>
        {drop > 0 && drop < 1 && [0, 1, 2, 3].map((k) => { const u = Math.min(1, drop * 1.2 - k * 0.06); return u > 0 ? <div key={k} style={{position: 'absolute', left: lerp(360, 780, u), top: 780 + Math.sin(u * Math.PI) * -220 + u * 80, width: 26, height: 34, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: C05}} /> : null; })}
        <div style={{position: 'absolute', left: 730, top: 760, width: 260, height: 260, borderRadius: '50%', ...nb('#fff', 7), borderColor: NBK, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: hit > 0 ? `0 0 0 ${30 * hit}px ${KOR}55, 7px 7px 0 ${NBK}` : `7px 7px 0 ${NBK}`}}><Ico n="yeux" size={180} /></div>
        {t > 240.6 && <Abs x={0} y={1160} w={1080} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={240.7} text="Conséquences très graves" bg={KOR} rot={-2} size={38} /></Abs>}
      </Ph>
      <Ph a={242.45} b={252.6}><Refl at={242.7} fs={29} items={[['Gants et protection oculaire ou faciale', 246.5, 'gants'], ['Jamais de mélange sans autorisation', 248.9, 'sens-interdit'], ["Projection : rinçage abondant à l'eau", 255.3, 'goutte'], ['Suivre la fiche de données de sécurité', 258.8, 'memo'], ['Secours ou service médical sans délai', 260.9, 'ambulance']]} /></Ph>
      <Ph a={252.6} b={258.1}>
        <Photo src="sgh-gen/rince-oeil.jpg" x={60} y={620} w={960} h={640} at={252.7} c={C05} pos="40% 45%" tag="RINÇAGE ABONDANT À L'EAU" />
        {t > 255.2 && <Abs x={0} y={1290} w={1080} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={255.3} text="Immédiatement" bg={KOR} rot={-2} size={36} /></Abs>}
      </Ph>
      <Ph a={258.1} b={263.35}><Refl at={242.7} fs={29} items={[['Gants et protection oculaire ou faciale', 246.5, 'gants'], ['Jamais de mélange sans autorisation', 248.9, 'sens-interdit'], ["Projection : rinçage abondant à l'eau", 255.3, 'goutte'], ['Suivre la fiche de données de sécurité', 258.8, 'memo'], ['Secours ou service médical sans délai', 260.9, 'ambulance']]} /></Ph>
      <Ph a={263.35} b={267.4}>
        <Punch at={265.2} lines={['CHAQUE SECONDE', 'COMPTE']} c={C05} size={64} y={1000} pre={<div style={{position: 'absolute', left: 540 - 150, top: 610, width: 300, height: 300, borderRadius: '50%', ...nb('#fff', 8), borderColor: NBK}}><svg width={300} height={300} viewBox="0 0 300 300" style={{position: 'absolute', left: -8, top: -8}}><circle cx={150} cy={150} r={118} fill="none" stroke={C05} strokeWidth={14} strokeDasharray={`${(sw / 360) * 741} 741`} transform="rotate(-90 150 150)" /><line x1={150} y1={150} x2={150 + 100 * Math.sin((sw * Math.PI) / 180)} y2={150 - 100 * Math.cos((sw * Math.PI) / 180)} stroke={NBK} strokeWidth={9} strokeLinecap="round" /><circle cx={150} cy={150} r={14} fill={NBK} /></svg></div>} />
      </Ph>
    </Out>
  );
};

/* ═════════════ Silhouette humaine (effets sur la santé, voies d'exposition) ═════════════ */
const Body: React.FC<{x: number; y: number; s?: number; c?: string; star?: number; outline?: boolean}> = ({x, y, s: z = 1, c = INK, star = 0, outline}) => (
  <svg width={360 * z} height={660 * z} viewBox="0 0 360 660" style={{position: 'absolute', left: x - 180 * z, top: y}}>
    <circle cx={180} cy={78} r={70} fill={outline ? '#fff' : c} stroke={NBK} strokeWidth={8} />
    <path d="M 40 640 L 40 330 C 40 220 96 168 180 168 C 264 168 320 220 320 330 L 320 640 Z" fill={outline ? '#fff' : c} stroke={NBK} strokeWidth={8} />
    {star > 0 && <path d={(() => { let d = ''; for (let i = 0; i < 16; i++) { const a = (Math.PI * i) / 8 - Math.PI / 2; const r = i % 2 ? 22 : 58; d += `${i ? 'L' : 'M'} ${(180 + r * Math.cos(a)).toFixed(1)} ${(330 + r * Math.sin(a)).toFixed(1)} `; } return d + 'Z'; })()} fill={outline ? C08 : '#fff'} opacity={star} />}
  </svg>
);

/* ═════════════ Guichet 7 : SGH06 — la tête de mort ═════════════ */
const Sgh06: React.FC = () => {
  const t = useT();
  const dr = prog(t, 278.0, 278.6, easeIn);
  const tox = prog(t, 279.2, 280.6);
  const RT: [string, number, string, number][] = [['Ingestion', 285.2, 'pilule', 690], ['Inhalation', 285.8, 'poumons', 860], ['Contact avec la peau', 286.4, 'main-levee', 1060]];
  return (
    <Out end={316.8}>
      <Heads h={[[268.1, ['Un pictogramme', 'particulièrement important'], [1]], [274.4, ['Une toxicité', 'aiguë élevée'], [1]], [276.6, ['Une faible quantité', 'peut tuer'], [1]], [283.2, ['Ingestion, inhalation,', 'contact cutané'], [0, 1]], [288.5, ['Pesticides, méthanol,', 'cyanures'], [0, 1]], [293.1, ['Aucune improvisation', "n'est acceptable"], [0]], [312.0, ["Danger d'empoisonnement", 'grave ou mortel'], [1]]]} />
      <Hero id="SGH06" a={270.3} fly={276.5} end={316.8} name="La tête de mort" cls="Toxicité aiguë" c={C06}>
        <Hot x={540} y={735} at={271.5} l="Tête de mort" c={C06} dx={170} dy={-150} />
        <Hot x={665} y={862} at={272.6} l="Os croisés" c={C06} dx={140} dy={90} />
      </Hero>
      <Ph a={276.55} b={282.95}>
        <svg width={360} height={460} viewBox="0 0 360 460" style={{position: 'absolute', left: 360, top: 700}}>
          <path d="M 40 40 L 320 40 L 290 430 L 70 430 Z" fill="#EEF6FB" stroke={NBK} strokeWidth={9} strokeLinejoin="round" />
          <path d={`M ${52 + 6} 180 L ${308 - 6} 180 L 290 428 L 70 428 Z`} fill={`rgb(${Math.round(120 - 80 * tox)},${Math.round(190 - 110 * tox)},${Math.round(230 - 170 * tox)})`} opacity={0.85} />
        </svg>
        {dr < 1 && t > 277.9 && <div style={{position: 'absolute', left: 528, top: lerp(560, 880, dr), width: 26, height: 36, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: '#3A3F49'}} />}
        {tox > 0.5 && <div style={{position: 'absolute', left: 540 - 70, top: 960, opacity: prog(t, 280.0, 280.6), transform: `scale(${0.6 + 0.4 * prog(t, 280.0, 280.6)})`}}><Ico n="crane" size={140} /></div>}
        {t > 278.3 && <Abs x={0} y={600} w={1080} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={278.4} text="Une faible quantité" bg={C06} rot={-2} size={36} /></Abs>}
        {t > 280.5 && <Abs x={60} y={1210} w={960} style={{display: 'flex', justifyContent: 'center', gap: 24}}><div style={{...nb('#fff', 6), boxShadow: `6px 6px 0 ${KOR}`, padding: '10px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 36, transform: `scale(${Math.min(1, sp(t, 280.6))})`}}>Intoxication grave</div>{t > 281.7 && <div style={{...nb(KOR, 6), borderColor: NBK, padding: '10px 22px', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 36, transform: `scale(${Math.min(1, sp(t, 281.8))})`}}>voire mortelle</div>}</Abs>}
      </Ph>
      <Ph a={282.95} b={288.45}>
        <Body x={300} y={630} s={0.95} c="#DDE3EA" />
        {RT.map(([l, a, ic, y], k) => { const q = t > a ? Math.min(1, sp(t, a, 9, 12)) : 0; const tx = [300, 300, 160][k], ty = [705, 740, 1150][k]; return t > a - 0.05 ? (
          <React.Fragment key={l}>
            <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: q}}><line x1={560} y1={y + 40} x2={tx + 40} y2={ty} stroke={KOR} strokeWidth={6} strokeDasharray="14 10" /><circle cx={tx + 40} cy={ty} r={12} fill={KOR} /></svg>
            <div style={{position: 'absolute', left: 560, top: y - 10, ...nb('#fff', 6), boxShadow: `6px 6px 0 ${KOR}`, display: 'flex', alignItems: 'center', gap: 14, padding: '12px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 34, transform: `scale(${q})`, transformOrigin: '0 50%'}}><Ico n={ic} size={56} />{l}</div>
          </React.Fragment>
        ) : null; })}
      </Ph>
      <Ph a={288.45} b={293.05}><Chips title="Peuvent présenter ce danger" items={[['Pesticides', 288.9, 'herbe'], ['Méthanol', 289.6, 'eprouvette'], ['Cyanures', 290.3, 'crane']]} c={C06} /></Ph>
      <Ph a={293.05} b={311.95}>
        {t > 294.3 && <Abs x={0} y={610} w={1080} style={{display: 'flex', justifyContent: 'center'}}><SlamTag at={294.5} text="AUCUNE IMPROVISATION" c={KOR} rot={-3} size={44} ic="OctagonAlert" /></Abs>}
        <Refl at={296.5} y={740} fs={29} items={[['Respecter les procédures', 296.7, 'clipboard'], ['Équipements de protection prescrits', 298.8, 'gants'], ['Ni manger, ni boire, ni fumer', 301.4, 'sens-interdit'], ['Exposition suspectée : alerter les secours', 306.2, 'sirene'], ['Appliquer les consignes de la FDS', 308.9, 'memo']]} />
      </Ph>
      <Ph a={311.95} b={316.8}><Punch at={313.8} lines={['DANGER', "D'EMPOISONNEMENT", 'GRAVE OU MORTEL']} c={KOR} size={54} ic="crane" /></Ph>
    </Out>
  );
};

/* ═════════════ Guichet 8 : SGH07 — le point d'exclamation ═════════════ */
const Sgh07: React.FC = () => {
  const t = useT();
  const pulse = 1 + 0.06 * Math.sin((t - 342.4) * 8);
  return (
    <Out end={366.3}>
      <Heads h={[[318.3, ['Le point', "d'exclamation"], [1]], [321.7, ['Des effets nocifs', 'ou irritants'], [1]], [328.1, ['Peau, yeux,', 'voies respiratoires'], [0, 1]], [332.8, ['Allergies, vertiges,', 'somnolence'], [0, 1]], [337.2, ["Détergents, produits d'entretien,", 'colles, solvants'], [0]], [342.4, ['Moins dangereux', '≠ sans risque'], [1]], [349.2, ['Les bons', 'réflexes'], [1]], [360.6, ['Ne banalisez jamais', 'un pictogramme'], [0]]]} />
      <Hero id="SGH07" a={319.8} fly={327.9} end={366.3} name="Le point d'exclamation" cls="Nocif, irritant" c={C07}>
        <Abs x={0} y={1200} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 22}}>
          {([['Effets nocifs', 326.0], ['Irritants', 326.4]] as [string, number][]).map(([l, a]) => <div key={l} style={{...nb('#fff', 5), boxShadow: `5px 5px 0 ${C07}`, padding: '8px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, opacity: t > a ? 1 : 0, transform: `scale(${t > a ? Math.min(1, sp(t, a)) : 0})`}}>{l}</div>)}
        </Abs>
      </Hero>
      <Ph a={327.95} b={337.15}>
        <Body x={540} y={600} s={1.0} c="#DDE3EA" />
        <Hot x={515} y={668} at={330.7} l="Yeux" c={C07} dx={-200} dy={-40} />
        <Hot x={540} y={790} at={331.2} l="Voies respiratoires" c={C07} dx={170} dy={-60} />
        <Hot x={392} y={1000} at={329.9} l="Peau" c={C07} dx={-170} dy={20} />
        <Hot x={680} y={1120} at={334.1} l="Allergies cutanées" c={C07} dx={60} dy={110} />
        <Hot x={560} y={615} at={336.1} l="Vertiges" c={C07} dx={160} dy={-20} />
        <Hot x={480} y={630} at={336.5} l="Somnolence" c={C07} dx={-180} dy={70} />
      </Ph>
      <Ph a={337.15} b={342.35}><Chips title="On le retrouve sur" items={[['Détergents', 339.3, 'savon'], ["Produits d'entretien", 340.4, 'boite-outils'], ['Colles', 341.2, 'feutre'], ['Solvants', 342.0, 'eprouvette']]} c={C07} /></Ph>
      <Ph a={342.35} b={349.15}>
        <div style={{position: 'absolute', left: 540 - 150, top: 610, transform: `scale(${pulse})`}}><Picto id="SGH07" size={300} glow={0.6} /></div>
        <Abs x={60} y={990} w={960} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <NTile at={345.5} ic="pouce" l="Moins dangereux" c={C07} w={390} h={260} fs={36} />
          {t > 347.8 && <div style={{width: 110, height: 110, borderRadius: '50%', background: '#fff', border: `7px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 76, color: KOR, transform: `scale(${lerp(2.2, 1, prog(t, 347.9, 348.05, easeIn))})`}}>≠</div>}
          <NTile at={347.6} ic="ShieldCheck" l="Sans risque" c={KOR} w={390} h={260} fs={36} />
        </Abs>
      </Ph>
      <Ph a={349.15} b={360.55}><Refl at={349.4} items={[['Porter les protections adaptées', 351.2, 'gants'], ['Espace suffisamment ventilé', 353.6, 'vent'], ['Éviter le contact avec la peau', 356.8, 'main-levee'], ['Se laver les mains après usage', 358.2, 'savon']]} /></Ph>
      <Ph a={360.55} b={366.3}><Punch at={361.5} lines={['NE BANALISEZ JAMAIS', 'UN PICTOGRAMME']} c={C07} size={56} ic="TriangleAlert" /></Ph>
    </Out>
  );
};

/* ═════════════ Guichet 9 : SGH08 — le danger grave pour la santé ═════════════ */
const Sgh08: React.FC = () => {
  const t = useT();
  const FX: [string, number, string][] = [['Cancérogènes', 379.7, 'microbe'], ['Fertilité', 381.4, 'coeur'], ['Développement du fœtus', 382.6, 'enfants'], ["Lésions d'organes", 384.3, 'cerveau'], ['Maladies respiratoires', 387.5, 'poumons'], ['Mortel après ingestion', 389.4, 'crane']];
  const flip = Math.floor(Math.max(0, t - 400.0) * 5);
  return (
    <Out end={423.8}>
      <Heads h={[[368.0, ['Une silhouette', 'et une étoile'], [1]], [372.5, ['Des effets', 'à long terme'], [1]], [378.4, ['Cancer, fertilité,', 'fœtus, organes'], [0, 1]], [386.2, ['Maladies', 'respiratoires'], [1]], [393.6, ['Solvants, benzène,', 'formaldéhyde'], [0, 1]], [398.5, ['Un danger', 'parfois invisible'], [1]], [404.4, ['Les bons', 'réflexes'], [1]], [418.5, ['Pas de symptômes', '≠ pas de danger'], [1]]]} />
      <Hero id="SGH08" a={369.3} fly={378.3} end={423.8} name="Danger grave pour la santé" cls="Effets à long terme" c={C08}>
        <Hot x={540} y={680} at={370.4} l="Silhouette humaine" c={C08} dx={-160} dy={-100} />
        <Hot x={540} y={830} at={371.6} l="Étoile sur la poitrine" c={C08} dx={170} dy={-40} />
      </Hero>
      <Ph a={378.35} b={393.55}>
        <Abs x={60} y={630} w={960} style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 26}}>
          {FX.map(([l, a, ic]) => <NTile key={l} at={a} ic={ic} l={l} c={C08} w={302} h={300} fs={28} />)}
        </Abs>
      </Ph>
      <Ph a={393.55} b={398.45}><Chips title="On le retrouve notamment sur" items={[['Certains solvants', 395.3, 'eprouvette'], ['Benzène', 397.1, 'goutte'], ['Formaldéhyde', 397.8, 'vapeur']]} c={C08} /></Ph>
      <Ph a={398.45} b={404.35}>
        <Body x={330} y={620} s={0.9} outline star={prog(t, 401.0, 403.4)} />
        <div style={{position: 'absolute', left: 640, top: 700, width: 320, height: 330}}>
          {[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: k * 10, top: k * 10, width: 280, height: 300, ...nb('#fff', 6), borderColor: NBK}}><div style={{height: 64, background: C08, borderRadius: '12px 12px 0 0'}} /></div>)}
          <div key={flip} style={{position: 'absolute', left: 20, top: 20, width: 280, height: 300, ...nb('#fff', 6), borderColor: NBK, transformOrigin: '50% 0', transform: `rotateX(${((t - 400.0) * 5 % 1) * 80}deg)`, opacity: t > 400.0 ? 1 - ((t - 400.0) * 5 % 1) : 0}}><div style={{height: 64, background: C08, borderRadius: '12px 12px 0 0'}} /></div>
        </div>
        {t > 400.1 && <Abs x={0} y={600} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 70, boxSizing: 'border-box'}}><NBadge at={400.2} text="Exposition répétée" bg={C08} rot={2} size={30} /></Abs>}
        {t > 403.4 && <Abs x={0} y={1110} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 80, boxSizing: 'border-box'}}><NBadge at={403.5} text="Des années plus tard" bg={KOR} rot={-3} size={36} /></Abs>}
      </Ph>
      <Ph a={404.35} b={418.45}><Refl at={404.6} items={[["Réduire l'exposition à la source", 406.2, 'baisse'], ['Respecter les mesures de ventilation', 408.3, 'vent'], ['Protections respiratoires adaptées', 411.6, 'poumons'], ['Suivre strictement les procédures', 416.0, 'clipboard']]} /></Ph>
      <Ph a={418.45} b={423.8}>
        <Abs x={60} y={700} w={960} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <NTile at={419.6} ic="pouce" l="Absence de symptômes" c={C08} w={390} h={330} fs={34} />
          {t > 421.9 && <div style={{width: 120, height: 120, borderRadius: '50%', background: '#fff', border: `7px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 84, color: KOR, transform: `scale(${lerp(2.4, 1, prog(t, 422.0, 422.15, easeIn))})`}}>≠</div>}
          <NTile at={421.8} ic="ShieldCheck" l="Absence de danger" c={KOR} w={390} h={330} fs={34} />
        </Abs>
        <GyroFlash at={422.0} />
      </Ph>
    </Out>
  );
};

/* ═════════════ Guichet 10 : SGH09 — le danger pour l'environnement ═════════════ */
const Grate: React.FC = () => <svg width={150} height={150} viewBox="0 0 150 150"><rect x={10} y={10} width={130} height={130} rx={16} fill="#5B6476" stroke={NBK} strokeWidth={7} />{[34, 58, 82, 106].map((x) => <rect key={x} x={x} y={26} width={12} height={98} rx={5} fill="#1C2230" />)}</svg>;
const Sgh09: React.FC = () => {
  const t = useT();
  const cloud = prog(t, 436.3, 438.6);
  const dead = prog(t, 437.8, 438.6, easeInOut);
  const algae = prog(t, 438.9, 439.6);
  const micro = prog(t, 440.0, 440.6);
  const ND: [string, number, React.ReactNode][] = [['Égouts', 455.0, <Grate key="g" />], ["Cours d'eau", 455.9, <Ico key="p" n="poisson" size={130} />], ['Sol', 456.9, <Ico key="h" n="herbe" size={130} />]];
  return (
    <Out end={478.9}>
      <Heads h={[[426.6, ['Le 9e', 'pictogramme'], [1]], [430.4, ['Danger pour les organismes', 'aquatiques'], [1]], [435.0, ['Poissons, algues,', 'organismes vivants'], [0, 1]], [441.9, ['Des effets', 'qui persistent'], [1]], [445.2, ['Pesticides, produits', 'pétroliers'], [0, 1]], [452.2, ['Ne jamais', 'déverser'], [1]], [458.8, ['En cas de fuite,', 'sécuriser la zone'], [1]], [472.4, ['La prévention protège', 'aussi l\'environnement'], [1]]]} />
      <Hero id="SGH09" a={426.8} fly={434.9} end={478.9} name="Danger pour l'environnement" cls="Milieu aquatique" c={C09}>
        <Hot x={490} y={795} at={428.7} l="L'arbre" c={C09} dx={-150} dy={-130} />
        <Hot x={615} y={862} at={429.2} l="Le poisson" c={C09} dx={150} dy={-130} />
      </Hero>
      <Ph a={434.95} b={444.95}>
        <Abs x={110} y={620} w={860} h={560} style={{...nb('#fff', 8), borderColor: NBK, overflow: 'hidden', background: `linear-gradient(180deg, #CFEFFF 0%, #6BC1E8 100%)`}}>
          <div style={{position: 'absolute', inset: 0, background: `radial-gradient(120% 80% at 50% 0%, rgba(40,30,20,${0.75 * cloud}) 0%, rgba(40,30,20,${0.35 * cloud}) 55%, rgba(40,30,20,0) 100%)`}} />
          {[0, 1, 2].map((k) => { const x = ((t * (40 + k * 12) + k * 260) % 960) - 100; return <div key={k} style={{position: 'absolute', left: x, top: 120 + k * 120 - dead * (60 + k * 20), transform: `rotate(${180 * dead}deg)`, filter: `grayscale(${dead})`}}><Ico n="poisson" size={110} /></div>; })}
          {[0, 1, 2, 3].map((k) => <div key={`a${k}`} style={{position: 'absolute', left: 60 + k * 210, bottom: -10, filter: `grayscale(${algae}) brightness(${1 - 0.4 * algae})`, transform: `rotate(${Math.sin(t * 2 + k) * 6 * (1 - algae)}deg)`, transformOrigin: '50% 100%'}}><Ico n="herbe" size={110} /></div>)}
          {[0, 1, 2].map((k) => <div key={`m${k}`} style={{position: 'absolute', left: 180 + k * 250, top: 330 + Math.sin(t * 3 + k) * 20, opacity: 1 - micro}}><Ico n="microbe" size={60} /></div>)}
        </Abs>
        {t > 442.4 && <Abs x={0} y={1210} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20}}><div style={{transform: `rotate(${(t - 442.5) * 90}deg)`}}><Ico n="sablier" size={80} /></div><NBadge at={442.6} text="Les effets peuvent persister" bg={C09} rot={-2} size={34} /></Abs>}
      </Ph>
      <Ph a={444.95} b={452.15}><Chips title="On retrouve ce symbole sur" items={[['Pesticides', 446.7, 'herbe'], ['Produits pétroliers', 447.1, 'goutte'], ['Substances dangereuses pour les écosystèmes', 448.9, 'eprouvette']]} c={C09} fs={32} /></Ph>
      <Ph a={452.15} b={458.75}>
        {t > 453.5 && <Abs x={0} y={620} w={1080} style={{display: 'flex', justifyContent: 'center'}}><SlamTag at={453.6} text="NE JAMAIS DÉVERSER" c={KOR} rot={-3} size={46} ic="Ban" /></Abs>}
        <Abs x={60} y={760} w={960} style={{display: 'flex', justifyContent: 'space-between'}}>
          {ND.map(([l, a, ic]) => <NTile key={l} at={a} ic="" l={l} c={KOR} w={300} h={420} fs={38}>{ic}{t > a + 0.3 && <div style={{position: 'absolute', left: 50, right: 50, top: 40, height: 200, borderRadius: '50%', border: `12px solid ${KOR}`, transform: `scale(${Math.min(1, sp(t, a + 0.3))})`}}><div style={{position: 'absolute', left: '50%', top: -10, width: 14, height: 'calc(100% + 20px)', background: KOR, transform: 'translateX(-50%) rotate(45deg)'}} /></div>}</NTile>)}
        </Abs>
      </Ph>
      <Ph a={458.75} b={472.35}><Refl at={458.9} fs={29} items={[['Fuite : sécuriser la zone', 459.7, 'barriere'], ['Empêcher la dispersion, sans danger', 461.1, 'stop'], ['Procédure de gestion des déversements', 464.4, 'clipboard'], ['Déchets collectés et éliminés selon les règles', 467.4, 'poubelle']]} /></Ph>
      <Ph a={472.35} b={478.9}>
        <div style={{position: 'absolute', left: 540 - 220, top: 610, transform: `scale(${Math.min(1, sp(t, 472.5))})`}}><PhotoGlobe t={t} d={440} /></div>
        {t > 474.8 && <Abs x={0} y={1080} w={1080} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={474.9} text="Pas seulement les travailleurs" bg={NAVY} rot={-2} size={32} /></Abs>}
        <Punch at={475.7} lines={['ELLE PROTÈGE AUSSI', 'NOTRE ENVIRONNEMENT']} c={C09} size={46} y={1170} ic="Leaf" />
      </Ph>
    </Out>
  );
};

/* ═════════════ Guichet 11 : conclusion — le réflexe QHSE ═════════════ */
const NAMES: [number, string][] = [[485.1, 'Bombe'], [486.6, 'Flamme'], [488.0, 'Flamme / cercle'], [489.4, 'Bouteille'], [491.0, 'Corrosion'], [492.4, 'Tête de mort'], [494.1, 'Exclamation'], [496.9, 'Santé'], [499.0, 'Environnement']];
const Conclusion: React.FC = () => {
  const t = useT();
  const lit = NAMES.reduce((a, [at], k) => (t >= at ? k : a), -1);
  const fds = Math.min(1, sp(t, 526.6, 7, 13));
  const MT: [string, number, string][] = [["Je lis l'étiquette", 551.6, 'loupe2'], ['Je comprends le danger', 553.7, 'cerveau'], ["J'applique les consignes", 555.3, 'clipboard'], ['Je me protège', 558.4, 'bouclier']];
  return (
    <Out end={OUTRO_AT}>
      <Heads h={[[480.7, ['Les 9 pictogrammes', 'du SGH'], [1]], [501.2, ['9 symboles,', '9 familles de danger'], [0, 1]], [508.5, ['Le pictogramme', 'ne suffit pas à lui seul'], [1]], [514.0, ['Prenez le temps de lire', "l'étiquette"], [1]], [525.2, ['Consultez', 'la FDS'], [1]], [530.3, ['Connaître le danger,', 'appliquer les bonnes pratiques'], [0, 1]], [535.8, ['Trois questions', 'avant chaque utilisation'], [0]], [546.6, ['Mal identifié =', 'risque majeur'], [1]], [551.4, ['Le réflexe', 'QHSE'], [1]], [560.2, ['La sécurité est', "l'affaire de tous"], [1]]]} />
      <Ph a={481.6} b={500.95}>
        {SGH_IDS.map((id, k) => { const on = k <= lit; const here = k === lit; const x = 230 + (k % 3) * 310, y = 640 + Math.floor(k / 3) * 270; return (
          <React.Fragment key={id}>
            <div style={{position: 'absolute', left: x - 120, top: y - 120, opacity: on || t < 484.8 ? 1 : 0.35, transform: `scale(${here ? 1.1 : 1})`, filter: on ? undefined : 'grayscale(0.6)'}}><Picto id={id} size={240} draw={prog(t, 482.4 + k * 0.12, 484.0 + k * 0.12, (v: number) => v)} glow={here ? 0.8 : 0} /></div>
            {on && <div style={{position: 'absolute', left: x - 110, top: y + 92, width: 220, textAlign: 'center'}}><span style={{...nb(here ? RED : '#fff', 4), borderColor: NBK, padding: '3px 10px', fontFamily: sansFont, fontWeight: 900, fontSize: 21, color: here ? '#fff' : INK, whiteSpace: 'nowrap'}}>{NAMES[k][1]}</span></div>}
          </React.Fragment>
        ); })}
      </Ph>
      <Ph a={500.95} b={508.45}>
        <PictoRing a={501.0} b={508.3} cy={860} />
        {t > 502.3 && <Abs x={0} y={1180} w={1080} style={{display: 'flex', justifyContent: 'center', zIndex: 10}}><SlamCard at={502.5} lines={['9 SYMBOLES', '9 FAMILLES DE DANGER']} c={RED} size={46} /></Abs>}
        {t > 504.3 && <Abs x={0} y={600} w={1080} style={{display: 'flex', justifyContent: 'center', zIndex: 10}}><NBadge at={504.4} text="Un seul objectif : prévenir" bg={GREEN} rot={-2} size={34} /></Abs>}
      </Ph>
      <Ph a={508.45} b={530.25}>
        <Photo src="sgh-gen/armoire-stockage.jpg" x={60} y={640} w={420} h={560} at={508.6} c={NAVY} pos="22% 50%" />
        <LoupeSweep x0={160} y0={1120} x1={200} y1={780} a={516.2} b={518.0} size={160} />
        <Abs x={500} y={680} w={520} style={{display: 'flex', flexDirection: 'column', gap: 18, opacity: 1 - prog(t, 525.4, 525.9)}}>
          {([['Pictogrammes', 511.8, 'danger'], ['Mentions de danger', 519.2, 'memo'], ['Conseils de prudence', 521.0, 'clipboard'], ['Équipements de protection', 522.5, 'gants']] as [string, number, string][]).map(([l, a, ic]) => <Row key={l} at={a} ic={ic} l={l} c={NAVY} fs={28} />)}
        </Abs>
        {t > 525.6 && <Abs x={500} y={640} w={520} h={560} style={{...nb('#FFFDF7', 8), borderColor: NBK, padding: 28, transform: `translateX(${(1 - fds) * 700}px) rotate(${(1 - fds) * 8}deg)`}}>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 72, color: NAVY}}>FDS</div>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: DIM, marginBottom: 20}}>Fiche de données de sécurité</div>
          {[0.9, 0.7, 0.85, 0.6, 0.8, 0.5].map((w, k) => <div key={k} style={{height: 13, width: `${w * 100}%`, borderRadius: 6, background: '#E5E1D6', marginTop: 18}} />)}
          {t > 529.9 && <div style={{position: 'absolute', right: 20, bottom: 30}}><SlamTag at={530.1} text="À CONSULTER" c={NAVY} rot={-10} size={34} ic="BookOpen" /></div>}
        </Abs>}
      </Ph>
      <Ph a={530.25} b={535.75}>
        <Abs x={60} y={700} w={960} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <NTile at={531.4} ic="cerveau" l="Connaissance du danger" c={NAVY} w={400} h={420} fs={36} />
          <div style={{width: 120 * prog(t, 533.0, 534.2), height: 16, background: NBK, borderRadius: 8}} />
          <NTile at={534.4} ic="clipboard" l="Bonnes pratiques appliquées" c={GREEN} w={400} h={420} fs={36} />
        </Abs>
      </Ph>
      <Ph a={535.75} b={546.55}>
        {t > 539.0 && <Abs x={60} y={600} w={960} style={{display: 'flex', alignItems: 'center', gap: 18}}><div style={{width: 84, height: 84, borderRadius: '50%', background: RED, border: `5px solid ${NBK}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1, sp(t, 539.1))})`}}>3</div><span style={{...CAP, fontSize: 28, color: INK}}>questions avant chaque utilisation</span></Abs>}
        <QBubble at={539.7} text="Quel est le danger ?" x={70} y={740} w={720} c={RED} fs={42} dur={0.9} />
        <QBubble at={541.4} text="Comment puis-je m'y exposer ?" x={290} y={930} w={730} c={C04} side="r" fs={40} dur={1.0} />
        <QBubble at={544.1} text="Quelle mesure pour me protéger ?" x={60} y={1120} w={900} c={GREEN} fs={40} dur={1.0} />
      </Ph>
      <Ph a={546.55} b={551.35}><Punch at={550.7} lines={['PRODUIT MAL IDENTIFIÉ', '= RISQUE MAJEUR']} c={KOR} size={52} ic="TriangleAlert" /></Ph>
      <Ph a={551.35} b={560.15}>
        {MT.map(([l, a, ic], k) => { const q = t > a ? Math.min(1, sp(t, a, 8, 13)) : 0; return (
          <div key={l} style={{position: 'absolute', left: 60 + k * 60, top: 640 + k * 160, width: 780, height: 130, ...nb('#fff', 7), borderColor: NBK, boxShadow: `7px 7px 0 ${[NAVY, RED, C04, GREEN][k]}`, display: 'flex', alignItems: 'center', gap: 22, padding: '0 26px', transform: `translateX(${(1 - q) * -900}px)`, opacity: t > a ? 1 : 0}}>
            <div style={{width: 84, height: 84, borderRadius: 20, background: [NAVY, RED, C04, GREEN][k], display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n={ic} size={60} /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK}}>{l}</div>
          </div>
        ); })}
      </Ph>
      <Ph a={560.15} b={OUTRO_AT}>
        <PictoRing a={560.2} b={OUTRO_AT + 2} cy={800} conv={false} size={190} R0={420} />
        <Abs x={60} y={1080} w={960} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
          {([['Comprendre les dangers', 563.5, NAVY], ['Maîtriser les risques', 566.3, RED], ['Protéger les vies', 567.2, GREEN]] as [string, number, string][]).map(([l, a, c]) => <div key={l} style={{...nb(c, 6), borderColor: NBK, padding: '10px 26px', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 40, opacity: t > a ? 1 : 0, transform: `scale(${t > a ? Math.min(1, sp(t, a)) : 0})`}}>{l}</div>)}
        </Abs>
      </Ph>
    </Out>
  );
};

/** Couverture : les 9 pictogrammes qui se dessinent + titre « LES 9 PICTOGRAMMES DE DANGER SGH » en lettres-photos animées. */
const ICover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Bg />
      <Abs x={0} y={46} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.14)'}}><Img src={staticFile(LOGO)} style={{height: 80, display: 'block'}} /></div></Abs>
      {SGH_IDS.map((id, k) => { const x = 230 + (k % 3) * 310, y = 330 + Math.floor(k / 3) * 262; const fl = Math.sin(t * 2 + k) * 6; return <div key={id} style={{position: 'absolute', left: x - 125, top: y - 125 + fl}}><Picto id={id} size={250} draw={prog(t, 0.05 + k * 0.08, 1.15 + k * 0.08, (v: number) => v)} /></div>; })}
      <Abs x={0} y={1060} w={1080} style={{display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap'}}><PhotoLetterAnim ch="LES 9 PICTOGRAMMES" src={IMG.c1} size={74} ls={2} seed={3} /></Abs>
      <Abs x={0} y={1160} w={1080} style={{display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap'}}><PhotoLetterAnim ch="DE DANGER SGH" src={IMG.c2} size={102} ls={4} seed={6} /></Abs>
      <Abs x={0} y={1320} w={1080} style={{textAlign: 'center'}}><span style={{fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: DIM}}>SYSTÈME GÉNÉRAL HARMONISÉ</span></Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Montage, bruitage ═════════════ */
const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.2}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len / 2), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const HERO_A = [53.5, 93.6, 139.5, 176.9, 220.5, 270.3, 319.8, 369.3, 426.8];
const HERO_F = [55.8, 100.3, 145.0, 181.9, 225.8, 276.5, 327.9, 378.3, 434.9];
const SLAMS = [47.5, 62.25, 87.8, 130.9, 171.6, 188.7, 214.6, 265.2, 294.5, 313.8, 361.5, 422.0, 453.6, 475.7, 502.5, 530.1, 550.7];
const ALARMS = [47.5, 87.8, 130.9, 171.6, 214.6, 265.2, 313.8, 361.5, 422.0, 475.7, 550.7];
const POPS = [7.1, 9.6, 10.2, 12.0, 12.4, 18.2, 22.2, 23.5, 25.5, 25.75, 26.0, 36.0, 38.5, 40.9, 59.0, 59.9, 60.7, 61.5, 65.3, 67.3, 69.0, 71.2, 73.5, 74.2, 77.0, 82.5, 83.8, 102.0, 102.5, 104.2, 105.0, 106.0, 109.3, 111.4, 111.7, 115.9, 118.0, 121.2, 123.0, 125.1, 136.6, 145.3, 145.55, 145.8, 148.0, 152.4, 153.7, 154.8, 158.2, 161.6, 165.2, 165.6, 166.1, 166.7, 168.7, 182.7, 183.5, 183.9, 184.8, 192.3, 195.8, 196.7, 197.5, 198.4, 202.1, 203.8, 205.6, 208.2, 210.8, 223.8, 224.3, 228.1, 229.6, 231.0, 234.3, 236.3, 240.7, 246.5, 248.9, 255.3, 258.8, 260.9, 271.5, 272.6, 278.4, 280.6, 281.8, 285.2, 285.8, 286.4, 288.9, 289.6, 290.3, 296.7, 298.8, 301.4, 306.2, 308.9, 326.0, 326.4, 329.9, 330.7, 331.2, 334.1, 336.1, 336.5, 339.3, 340.4, 341.2, 342.0, 345.5, 347.6, 351.2, 353.6, 356.8, 358.2, 370.4, 371.6, 379.7, 381.4, 382.6, 384.3, 387.5, 389.4, 395.3, 397.1, 397.8, 400.2, 403.5, 406.2, 408.3, 411.6, 416.0, 419.6, 421.8, 428.7, 429.2, 442.6, 446.7, 447.1, 448.9, 455.0, 455.9, 456.9, 459.7, 461.1, 464.4, 467.4, 474.9, 504.4, 511.8, 519.2, 521.0, 522.5, 532.4, 534.4, 539.1, 539.7, 541.4, 544.1, 551.6, 553.7, 555.3, 558.4, 563.5, 566.3, 567.2];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at + 0.15, s: 'sfx/bell', v: 0.16})),
  ...HERO_A.map((at) => ({at, s: 'stylo', v: 0.32, dur: 1.4})), ...HERO_A.map((at) => ({at: at + 2.6, s: 'sfx/ding', v: 0.2})), ...HERO_F.map((at) => ({at, s: 'soft-whoosh', v: 0.3, dur: 0.9})),
  ...SLAMS.map((at) => ({at, s: 'tampon', v: 0.4})), ...ALARMS.map((at) => ({at: at + 0.05, s: 'alarme', v: 0.1, dur: 0.6})),
  ...POPS.map((at) => ({at, s: 'sfx/pop', v: 0.2})),
  {at: 2.7, s: 'riser', v: 0.18, dur: 3.5}, {at: 6.85, s: 'bass-hit', v: 0.35}, ...searchCues(18.8, 16, 20.0, 20.6), {at: 31.6, s: 'sfx/swish', v: 0.25},
  {at: 62.1, s: 'bass-hit', v: 0.45}, {at: 113.9, s: 'sfx/swish', v: 0.3}, {at: 114.6, s: 'riser', v: 0.2, dur: 1.2}, {at: 138.35, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 156.7, s: 'riser', v: 0.18, dur: 1.6},
  {at: 186.9, s: 'tension', v: 0.2, dur: 1.7}, {at: 188.7, s: 'bass-hit', v: 0.45}, {at: 190.3, s: 'sfx/swish', v: 0.3}, {at: 238.0, s: 'sfx/swish', v: 0.3}, {at: 240.0, s: 'deep-hit', v: 0.3},
  {at: 278.6, s: 'sfx/ding', v: 0.25}, {at: 280.0, s: 'deep-hit', v: 0.3}, {at: 342.4, s: 'deep-hit', v: 0.3}, {at: 347.9, s: 'tampon', v: 0.3}, ...rep(400.0, 17, 0.2, 'tick', 0.08), {at: 436.3, s: 'riser', v: 0.16, dur: 2}, {at: 472.5, s: 'sfx/whoosh', v: 0.3},
  ...NAMES.map(([at]) => ({at, s: 'sfx/ding', v: 0.2})), {at: 501.0, s: 'riser', v: 0.18, dur: 6}, {at: 508.1, s: 'bass-hit', v: 0.35}, {at: 525.6, s: 'soft-whoosh', v: 0.35, dur: 1}, {at: 560.2, s: 'sfx/rise', v: 0.2, dur: 2},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];
const SCN: [React.FC, number, number][] = [[Intro, 2.6, 50.65], [Sgh01, 53.3, 90.65], [Sgh02, 93.4, 132.95], [Sgh03, 135.6, 173.95], [Sgh04, 176.5, 217.55], [Sgh05, 220.2, 267.45], [Sgh06, 270.0, 316.85], [Sgh07, 319.4, 366.35], [Sgh08, 369.0, 423.85], [Sgh09, 426.4, 478.95], [Conclusion, 481.6, OUTRO_AT]];
export const PictogrammesSghMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    {SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    {SECT.map((x, i) => x.k === 'gyro' ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7}><Gyro i={i} /></Gate> : null)}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><ICover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-pictogrammes-sgh-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u2 = [wn, Avatar, Ring3D, SlamTag, Arrow, slamK, CAP, STAGE, SCAN, RING_ISO, Drum, Marked, Announce, MBadge, RailSteps, StairSteps, ZigSteps, QBubble, Grid15, RameWipe, Forklift, ICO, MC, ACR, lin, hexMix, cl, GyroFlash, Hot, Photo, Pill2, OKG, KOR, C01, C02, C03, C04, C05, C06, C07, C08, C09, Ph, PictoRing, Hero, Chips, Refl, SlamCard, Punch, NTile, PDraw, PhotoGlobe, Jerrican, Triggers, Cyl, Body, Grate, NAMES, SGH_RED, flatEls, PEl];

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn, Barred, Flap];
