import React from 'react';
import type {LucideIcon} from 'lucide-react';
import {Activity, ArrowRight, Award, BadgeCheck, Ban, Bell, BellRing, BookOpen, Briefcase, BriefcaseMedical, CalendarClock, CalendarDays, ChartColumn, ChartNoAxesCombined, Check as LCheck, CircleCheckBig, CircleX, ClipboardCheck, ClipboardList, Clock, DoorOpen, Droplets, Ear, Eye, Factory, Fan, FileText, FireExtinguisher, Flag, FlaskConical, FolderOpen, Footprints, Gauge, Gavel, Glasses, Globe, GraduationCap, Hand, HandHeart, HardHat, IdCard, Image as ImageIcon, Infinity as InfinityIcon, TrendingUp, TrendingDown, Dumbbell, CalendarSync, Cog, MessageCircle, Send, Phone, MousePointerClick, FileCheck, Stamp as StampIcon, Mic, History as HistoryIcon, Timer, RotateCcw, Brain, Hourglass, Repeat2, Sparkles, Calendar, Quote, Signpost, Layers, Leaf, Lightbulb, Link, ListChecks, Lock, LockOpen, Mail, MapPin, Megaphone, MessageCircleOff, MessageSquareText, Network, Newspaper, OctagonAlert, PenLine, Power, Presentation, Puzzle, Recycle, RefreshCw, Repeat, Route, Scale, ScrollText, Search, Settings2, ShieldAlert, ShieldCheck, Siren, Split, Sprout, Target, ThumbsUp, TriangleAlert, User, UserCheck, UserPlus, Users, VolumeX, Workflow, Wrench, Zap} from 'lucide-react';
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
import {captions} from './captions';
import {NeoCaptions} from '../components/NeoCaptions';

/**
 * « Le refresher HSE » (voix d'origine, 2 min 50) — capsule « condensé + effet wahou + ultra premium » présentée en
 * métro (8 stations). Tube de verre à six guichets adapté au contenu : question → définition → érosion → cariste →
 * quand ? → à retenir ; la capsule du dossier file d'un guichet à l'autre (gyrophare ×2, loupe, capsule pneumatique,
 * store vénitien). Barre de recherche « refresher HSE » qui ouvre la notion. Techniques : attestation « validée » qui
 * se ternit sous le tampon « pas nécessairement », calendrier à feuilles qui s'arrachent, synonymes en équation,
 * frise « formation initiale → refreshers », verbes en tuiles qui pivotent, cartes retournées, courbe de l'oubli tracée
 * en direct (seuil des exigences du poste, zone de risque, repères), exemple du cariste en trois états (appris ✓ /
 * dérive ✗ barrée, compteur de vitesse, chariot en flou de bougé / refresher ✓), jauge « pas de retour à zéro »,
 * anneau de l'intervalle défini, interrupteurs des situations déclenchantes, rappel verbal ≠ recyclage formalisé,
 * courbe en dents de scie des refreshers contre la chute sans refresher, citation à onde de choc, question sur le
 * carrousel cylindrique 3D, bouton « S'abonner » cliqué et conversation WhatsApp tapée. Sous-titres NeoCaptions sur la
 * voix d'origine (transcription locale corrigée), sans musique, bruitage discret. Images de la session réutilisées.
 */
const IMG = {
  cover: 'whatif-gen/entrepot-chariot.jpg',
  c1: 'promo/hse-machine.jpg',
  c2: 'promo/formation-consignation.jpg',
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
const OUTRO_AT = 171.0;
export const REFRESHER_HSE_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '1', title: 'Formé une fois ?', s: 'pas nécessairement', c: BLUE, g: 'question', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 16.3, n: '2', title: 'Le refresher HSE', s: 'recyclage · rappel des connaissances', c: NAVY, g: 'définition', k: 'gyro', lab: 'GUICHET 2 / 6'},
  {at: 45.9, n: '3', title: "L'érosion des acquis", s: 'oublis · mauvaises habitudes', c: ORANGE, g: 'érosion', k: 'loupe', lab: 'GUICHET 3 / 6'},
  {at: 55.9, n: '4', title: 'Exemple : le cariste', s: 'conducteur de chariot élévateur', c: GOLD, g: 'cariste', k: 'tube', lab: 'GUICHET 4 / 6'},
  {at: 109.0, n: '5', title: 'Quand le programmer ?', s: 'intervalle · situations', c: VIO, g: 'quand ?', k: 'store', lab: 'GUICHET 5 / 6'},
  {at: 136.2, n: '6', title: 'À retenir', s: 'acquérir · maintenir', c: TEAL, g: 'à retenir', k: 'gyro', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 158.0;
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
  {n: 1, l: 'Refreshers HSE', s: 'refresher', at: 12.4},
  {n: 2, l: 'Session périodique', s: 'périodique', at: 21.8},
  {n: 3, l: 'Réviser · actualiser · renforcer', s: 'objectif', at: 28.1},
  {n: 4, l: "L'érosion des acquis", s: 'érosion', at: 49.2},
  {n: 5, l: 'Le cariste', s: 'cariste', at: 57.0},
  {n: 6, l: 'Le refresher du cariste', s: 'session', at: 87.2},
  {n: 7, l: 'Intervalle défini', s: 'intervalle', at: 111.3},
  {n: 8, l: 'À retenir', s: 'retenir', at: 139.2},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE REFRESHER · STATION {r.n} / 8</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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
const LUC: Record<string, LucideIcon> = {Quote, Signpost, TrendingUp, TrendingDown, Dumbbell, CalendarSync, Cog, MessageCircle, Send, Phone, MousePointerClick, FileCheck, Stamp: StampIcon, Mic, History: HistoryIcon, Timer, RotateCcw, Brain, Hourglass, Repeat2, Sparkles, Calendar, DoorOpen, UserPlus, IdCard, Route, BriefcaseMedical, Newspaper, Presentation, Image: ImageIcon, Mail, Clock, Eye, Bell, BellRing, Sprout, ThumbsUp, HandHeart, Infinity: InfinityIcon, Flag, MapPin, Link, Puzzle, Split, User, Droplets, Lightbulb, Activity, Ear, Siren, MessageSquareText, MessageCircleOff, VolumeX, Power, OctagonAlert, Fan, Megaphone, FlaskConical, LockOpen, Ban, Repeat, Zap, UserCheck, Network, BookOpen, Workflow, Search, FileText, CircleX, ChartColumn, FolderOpen, HardHat, TriangleAlert, Target, ClipboardList, ScrollText, Lock, ShieldAlert, FireExtinguisher, Wrench, Leaf, Factory, Scale, Recycle, Gavel, ShieldCheck, Globe, Layers, BadgeCheck, CalendarDays, PenLine, Gauge, RefreshCw, CalendarClock, ListChecks, Settings2, Award, GraduationCap, Briefcase, Users, ClipboardCheck, ChartNoAxesCombined, Glasses, Hand, Footprints, Check: LCheck, CircleCheckBig,
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


/* ═════════════ Outils propres à la capsule « refresher HSE » ═════════════ */
const RC = '#E07A1F';
const OKC = '#1E9E5A';
const KOC = '#D9363E';
const RING_RF = ['whatif-gen/entrepot-chariot.jpg', 'promo/formation-consignation.jpg', 'rhse-gen/prevention.jpg', 'promo/hse-machine.jpg', 'promo/formation-incendie.jpg', 'induction/technicien-hse.jpg', 'principes-gen/chef-projet.jpg', 'promo/terrain-controle.jpg'];
const MOIS = ['JANV.', 'FÉVR.', 'MARS', 'AVR.', 'MAI', 'JUIN', 'JUIL.', 'AOÛT', 'SEPT.', 'OCT.', 'NOV.', 'DÉC.'];

/** Niveau de compétence (0 → 1) le long de l'axe du temps u ∈ [0, 1]. */
const lvlDecay = (u: number) => 0.24 + 0.68 * Math.exp(-2.6 * u);
const SAW0 = 0.08, SAWP = 0.16;
const lvlSaw = (u: number) => {
  if (u < SAW0) return 0.08 + (0.92 - 0.08) * Math.sin((u / SAW0) * Math.PI * 0.5);
  const k = Math.floor((u - SAW0) / SAWP);
  const u0 = SAW0 + k * SAWP;
  const d = u - u0;
  const boost = k > 0 ? Math.min(1, d / 0.012) : 1;
  const prev = k > 0 ? 0.92 - (0.92 - (0.24 + 0.68 * Math.exp(-2.6 * SAWP))) : 0.92;
  const top = prev + (0.92 - prev) * boost;
  return 0.24 + (top - 0.24) * Math.exp(-2.6 * d);
};
const lvlNoRef = (u: number) => (u < SAW0 ? lvlSaw(u) : 0.24 + 0.68 * Math.exp(-2.6 * (u - SAW0)));

/** Courbe de l'oubli tracée en direct (axes, seuil « exigences du poste », zone de risque). */
const Curve: React.FC<{W: number; H: number; a: number; b: number; mode: 'decay' | 'saw'; marks?: [number, string][]}> = ({W, H, a, b, mode, marks = []}) => {
  const t = useT();
  const p = prog(t, a, b, lin);
  const X = (u: number) => 70 + u * (W - 110);
  const Y = (l: number) => H - 60 - l * (H - 120);
  const f = mode === 'decay' ? lvlDecay : lvlSaw;
  const path = (fn: (u: number) => number, upto: number) => { let d = ''; for (let u = 0; u <= upto + 1e-6; u += 0.004) d += `${d ? 'L' : 'M'} ${X(u).toFixed(1)} ${Y(fn(u)).toFixed(1)} `; return d; };
  const REQ = 0.6;
  const head = Math.min(p, 1);
  return (
    <svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
      <rect x={X(0)} y={Y(REQ)} width={X(1) - X(0)} height={Y(0) - Y(REQ)} fill="rgba(217,54,62,0.10)" />
      <line x1={X(0)} y1={Y(REQ)} x2={X(1)} y2={Y(REQ)} stroke="#F2C14E" strokeWidth={3} strokeDasharray="12 10" />
      <text x={X(1)} y={Y(REQ) - 12} textAnchor="end" fill="#F2C14E" style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, letterSpacing: 2}}>EXIGENCES DU POSTE</text>
      <line x1={X(0)} y1={Y(0)} x2={X(1) + 20} y2={Y(0)} stroke="#C9D2DF" strokeWidth={4} />
      <line x1={X(0)} y1={Y(0)} x2={X(0)} y2={Y(1) - 20} stroke="#C9D2DF" strokeWidth={4} />
      <text x={X(1)} y={Y(0) + 40} textAnchor="end" fill="#C9D2DF" style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, letterSpacing: 2}}>TEMPS →</text>
      <text x={X(0) - 14} y={Y(1) - 30} fill="#C9D2DF" style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, letterSpacing: 2}}>COMPÉTENCES</text>
      {mode === 'saw' && <path d={path(lvlNoRef, head)} fill="none" stroke={KOC} strokeWidth={5} strokeDasharray="14 10" opacity={0.85} />}
      <path d={path(f, head)} fill="none" stroke={mode === 'saw' ? '#7BE3A4' : '#FF9A62'} strokeWidth={8} strokeLinejoin="round" strokeLinecap="round" style={{filter: `drop-shadow(0 0 10px ${mode === 'saw' ? '#7BE3A4' : '#FF9A62'})`}} />
      {p > 0 && p < 1 && <circle cx={X(head)} cy={Y(f(head))} r={12} fill="#fff" />}
      {marks.map(([u, l], k) => p >= u && (
        <g key={k} style={{opacity: cl((p - u) * 30)}}>
          <circle cx={X(u)} cy={Y(f(u))} r={11} fill={KOC} stroke="#fff" strokeWidth={4} />
          <line x1={X(u)} y1={Y(f(u)) + 14} x2={X(u)} y2={Y(f(u)) + 70 + (k % 2) * 60} stroke="#fff" strokeWidth={3} />
          <foreignObject x={X(u) - 130} y={Y(f(u)) + 70 + (k % 2) * 60} width={260} height={90}><div style={{background: KOC, color: '#fff', border: `4px solid ${NBK}`, borderRadius: 10, padding: '6px 10px', fontFamily: sansFont, fontWeight: 900, fontSize: 24, lineHeight: 1.1, textAlign: 'center'}}>{l}</div></foreignObject>
        </g>
      ))}
    </svg>
  );
};

/** Ligne de check-list à trois états : appris (✓ bleu), dérive (✗ rouge, barré), repris (✓ vert). */
const CRow: React.FC<{at: number; l: string; ic: string; c: string; mark: 'ok' | 'ko'; fs?: number}> = ({at, l, ic, c, mark, fs = 32}) => {
  const t = useT();
  if (t < at - 0.05) return null;
  const q = Math.min(1, sp(t, at));
  const k = prog(t, at + 0.15, at + 0.45, easeOut);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 16, ...nb('#fff', 5), borderColor: NBK, padding: '12px 18px', opacity: cl(q * 1.6), transform: `translateX(${(1 - q) * 120}px)`}}>
      <Ico n={ic} size={44} c={c} />
      <span style={{flex: 1, position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: fs, color: INK, lineHeight: 1.08}}>{l}{mark === 'ko' && <span style={{position: 'absolute', left: 0, top: '52%', height: 5, width: `${k * 100}%`, background: KOC, borderRadius: 3}} />}</span>
      <div style={{width: 52, height: 52, borderRadius: 12, background: k > 0.3 ? c : '#fff', border: `4px solid ${NBK}`, color: '#fff', fontSize: 32, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: `scale(${1 + 0.2 * Math.sin(k * Math.PI)})`}}>{k > 0.3 ? (mark === 'ok' ? '✓' : '✗') : ''}</div>
    </div>
  );
};

/* ═════════════ Guichet 1 : formé une fois, compétent pour toujours ? ═════════════ */
const Q1: React.FC = () => {
  const t = useT();
  const fade = prog(t, 8.2, 8.9);
  const n = t < 5.3 ? 0 : Math.floor(Math.pow(prog(t, 5.3, 7.5, lin), 1.6) * 30);
  const ph = t < 5.3 ? 0 : ((Math.pow(prog(t, 5.3, 7.5, lin), 1.6) * 30) % 1);
  return (
    <Out end={9.45}>
      <Heads h={[[2.9, ['Formé une fois,', 'compétent pour toujours ?'], [1]], [8.19, ['Pas', 'nécessairement'], [1]]]} />
      <Abs x={140} y={470} w={800} h={380} style={{...nb('#FFFDF5', 8), borderColor: NBK, opacity: pop(t, 2.6), filter: `grayscale(${fade}) brightness(${1 - fade * 0.15})`, transform: `rotate(${-1.5 + fade * 2}deg)`}}>
        <div style={{position: 'absolute', inset: 14, border: `3px solid ${GOLD}`, borderRadius: 12}} />
        <div style={{position: 'absolute', left: 40, top: 46, width: 170, height: 170, borderRadius: 85, overflow: 'hidden', border: `5px solid ${NBK}`}}><Img src={PH('induction/technicien-hse.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
        <div style={{position: 'absolute', left: 240, top: 50, right: 30}}>
          <div style={{...CAP, fontSize: 20, color: DIM}}>Attestation</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: INK, lineHeight: 1.05}}>Formation HSE</div>
          <div style={{height: 14, width: '80%', background: '#E3E6EC', borderRadius: 7, marginTop: 18}} />
          <div style={{height: 14, width: '62%', background: '#E3E6EC', borderRadius: 7, marginTop: 14}} />
        </div>
        <div style={{position: 'absolute', left: 60, bottom: 40, display: 'flex', alignItems: 'center', gap: 12}}><Ico n="Award" size={64} c={GOLD} /><span style={{...CAP, fontSize: 20, color: GOLD}}>règles de sécurité acquises</span></div>
        {t > 2.9 && <div style={{position: 'absolute', right: 40, bottom: 34}}><SlamTag at={3.0} text="VALIDÉE" c={OKC} rot={-10} size={36} ic="BadgeCheck" /></div>}
      </Abs>
      <Abs x={330} y={900} w={420} h={330} style={{opacity: pop(t, 5.1), perspective: 900}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 70, background: KOC, border: `5px solid ${NBK}`, borderRadius: '18px 18px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10}}><Ico n="Calendar" size={40} c="#fff" /><span style={{...CAP, fontSize: 20, color: '#fff'}}>le temps passe</span></div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 70, bottom: 0, background: '#fff', border: `5px solid ${NBK}`, borderTop: 'none', borderRadius: '0 0 18px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 100, color: INK}}>{MOIS[n % 12]}</div>
        {t > 5.3 && t < 7.6 && <div style={{position: 'absolute', left: 0, right: 0, top: 70, height: 255, background: '#fff', border: `5px solid ${NBK}`, borderRadius: '0 0 18px 18px', transformOrigin: '50% 0', transform: `rotateX(${ph * 100}deg)`, opacity: 1 - ph, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 100, color: INK}}>{MOIS[(n + 11) % 12]}</div>}
      </Abs>
      {t > 6.0 && <Abs x={0} y={1250} w={1080} style={{textAlign: 'center', ...CAP, fontSize: 24, color: KOC, opacity: pop(t, 6.0)}}>plusieurs mois… plusieurs années</Abs>}
      {t > 8.1 && <Abs x={0} y={600} w={1080} style={{display: 'flex', justifyContent: 'center', zIndex: 5}}><SlamTag at={8.2} text="PAS NÉCESSAIREMENT" c={KOC} rot={-5} size={58} ic="TriangleAlert" /></Abs>}
    </Out>
  );
};
const Q2: React.FC = () => {
  const t = useT();
  return (
    <Out end={16.4}>
      <Heads h={[[9.34, ['Les entreprises organisent', 'des refreshers HSE'], [1]], [13.75, ['De quoi', "s'agit-il ?"], [1]]]} />
      <SearchOpen x={60} y={450} w={960} h={890} at={9.4} query="refresher HSE" results={['Formation initiale HSE', 'Refresher HSE · recyclage des connaissances', 'Induction HSE · accueil sécurité']} found={1} foundAt={10.95} clickAt={11.3} c={RC}>
        <div style={{position: 'absolute', inset: 0, background: '#FFF8F1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18}}>
          <div style={{width: 260, height: 260, borderRadius: 130, background: '#fff', border: `6px solid ${NBK}`, boxShadow: `10px 10px 0 ${RC}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div style={{transform: `rotate(${-t * 120}deg)`}}><Ico n="RotateCcw" size={160} c={RC} /></div></div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: INK, letterSpacing: -1}}>Refresher HSE</div>
          <div style={{...CAP, fontSize: 22, color: RC, opacity: pop(t, 12.4)}}>recyclage · rappel des connaissances</div>
          <div style={{display: 'flex', gap: 26, marginTop: 10}}>{[0, 1, 2].map((k) => <div key={k} style={{fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: RC, opacity: t > 13.8 ? 1 : 0, transform: `translateY(${-Math.abs(Math.sin((t - 13.8) * 6 + k)) * 30}px)`}}>?</div>)}</div>
        </div>
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ Guichet 2 : définition — synonymes, session périodique, objectifs ═════════════ */
const Def1: React.FC = () => {
  const t = useT();
  const tr = prog(t, 19.8, 20.6, easeOut);
  const per = (k: number) => 21.8 + k * 0.18;
  return (
    <Out end={27.15}>
      <Heads h={[[17.53, ['Recyclage', '· rappel des connaissances'], [0, 1]], [20.7, ['Une session', 'périodique'], [1]], [22.4, ['Pour les travailleurs', 'déjà formés'], [1]]]} />
      <Abs x={40} y={480} w={1000} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'nowrap'}}>
        {[['Refresher HSE', RC, 19.7], ['Recyclage', NAVY, 19.85], ['Rappel des connaissances', TEAL, 20.0]].map(([l, c, a], k) => <React.Fragment key={k}>{k > 0 && <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK, opacity: pop(t, a as number)}}>=</span>}<div style={{...nb(c as string, 5), color: '#fff', padding: '8px 14px', whiteSpace: 'nowrap', fontFamily: sansFont, fontWeight: 900, fontSize: 26, transform: `scale(${Math.min(1, sp(t, a as number))})`}}>{l as string}</div></React.Fragment>)}
      </Abs>
      <Abs x={60} y={650} w={960} h={240} style={{...nb('#fff', 7), borderColor: NBK, opacity: pop(t, 20.6)}}>
        <div style={{position: 'absolute', left: 30, right: 30, top: 150, height: 10, borderRadius: 5, background: '#E3E6EC'}}><div style={{width: `${tr * 100}%`, height: '100%', borderRadius: 5, background: `linear-gradient(90deg, ${NAVY}, ${RC})`}} /></div>
        <div style={{position: 'absolute', left: 30, top: 40, width: 230, height: 90, borderRadius: 14, background: NAVY, border: `4px solid ${NBK}`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 24, lineHeight: 1.05, transform: `scale(${t > 25.3 ? 1 + 0.08 * Math.sin(Math.min(1, (t - 25.3) * 3) * Math.PI) : 1})`, boxShadow: t > 25.3 ? `0 0 0 6px ${YEL}` : 'none'}}>Formation<br />initiale</div>
        {[0, 1, 2, 3].map((k) => t > per(k) && <div key={k} style={{position: 'absolute', left: 330 + k * 160, top: 120, width: 70, height: 70, borderRadius: 35, background: RC, border: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1, sp(t, per(k)))})`}}><Ico n="RotateCcw" size={38} c="#fff" /></div>)}
        {t > 21.8 && <div style={{position: 'absolute', left: 330, top: 26, ...CAP, fontSize: 20, color: RC, opacity: pop(t, 22.0)}}>refresher · refresher · refresher…</div>}
      </Abs>
      <Abs x={60} y={940} w={960} style={{display: 'flex', justifyContent: 'center', gap: 40}}>
        {[0, 1, 2].map((k) => <div key={k} style={{opacity: pop(t, 23.1 + k * 0.12)}}><Avatar ic="HardHat" c={NAVY} size={140} /></div>)}
      </Abs>
      {t > 24.2 && <Abs x={60} y={1140} w={960} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={24.4} text="déjà formés une première fois" bg={NAVY} rot={-2} size={32} /></Abs>}
    </Out>
  );
};
const Def2: React.FC = () => {
  const t = useT();
  const V3: [string, number, string][] = [['RÉVISER', 28.1, 'BookOpen'], ['ACTUALISER', 28.9, 'RefreshCw'], ['RENFORCER', 29.8, 'Dumbbell']];
  return (
    <Out end={34.8}>
      <Heads h={[[27.11, ['Réviser · actualiser', '· renforcer'], [0, 1]], [30.6, ['Les acquis', 'HSE'], [1]]]} />
      <Abs x={60} y={470} w={960} style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18, perspective: 1100}}>
        {V3.map(([l, a, ic]) => { const q = Math.min(1, sp(t, a)); return <div key={l} style={{height: 300, ...nb(t > a ? RC : '#fff', 7), borderColor: NBK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, transform: `rotateY(${(1 - q) * -90}deg)`, opacity: t > a - 0.05 ? 1 : 0}}><Ico n={ic} size={110} c="#fff" /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff', letterSpacing: 1}}>{l}</span></div>; })}
      </Abs>
      <Abs x={60} y={830} w={960} style={{display: 'flex', flexDirection: 'column', gap: 18}}>
        <Pill2 at={30.6} ic="Brain" l="Les connaissances" c={NAVY} fs={34} />
        <Pill2 at={31.6} ic="Award" l="Les compétences" c={NAVY} fs={34} />
        <Pill2 at={32.5} ic="HardHat" l="Les pratiques HSE" c={NAVY} fs={34} />
      </Abs>
      {t > 33.2 && <Abs x={60} y={1250} w={960} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={33.3} text="déjà acquises" bg={OKC} rot={-3} size={34} /></Abs>}
    </Out>
  );
};
const Def3: React.FC = () => {
  const t = useT();
  const C4: [string, number, string][] = [['Rappeler les règles de sécurité', 35.9, 'ScrollText'], ['Corriger les mauvaises habitudes', 38.0, 'Wrench'], ["Suivre l'évolution des risques", 40.5, 'TrendingUp'], ['Maintenir le niveau de compétences du poste', 42.5, 'Gauge']];
  return (
    <Out end={46.0}>
      <Heads h={[[34.89, ['Ce que permet', 'le refresher'], [1]]]} />
      <Abs x={60} y={470} w={960} h={860} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 20, perspective: 1300}}>
        {C4.map(([l, a, ic], k) => {
          const f = prog(t, a - 0.1, a + 0.45, easeInOut);
          return (
            <div key={l} style={{position: 'relative', transformStyle: 'preserve-3d', transform: `rotateY(${180 - f * 180}deg)`, opacity: pop(t, 35.0 + k * 0.1)}}>
              <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', ...nb(NAVY, 7), borderColor: NBK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 140, color: '#ffffff33'}}>{k + 1}</div>
              <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', ...nb('#fff', 7), borderColor: NBK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: 24, textAlign: 'center'}}>
                <div style={{width: 130, height: 130, borderRadius: 30, background: `${RC}18`, border: `3px solid ${RC}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n={ic} size={80} c={RC} /></div>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK, lineHeight: 1.1}}>{l}</div>
              </div>
            </div>
          );
        })}
      </Abs>
    </Out>
  );
};

/* ═════════════ Guichet 3 : l'érosion des acquis — courbe de l'oubli ═════════════ */
const Oubli: React.FC = () => {
  const t = useT();
  const a = 48.9, b = 55.2;
  const u = (x: number) => (x - a) / (b - a);
  return (
    <Out end={55.95}>
      <Heads h={[[46.0, ['Avec le temps,', "les acquis s'érodent"], [1]]]} />
      <Abs x={60} y={460} w={960} h={880} style={{...STAGE, opacity: pop(t, 49.2)}}>
        <div style={SCAN} />
        <div style={{position: 'absolute', left: 30, top: 40, width: 900, height: 800}}><Curve W={900} H={760} a={a} b={b} mode="decay" marks={[[u(49.5), 'Consignes oubliées'], [u(51.2), 'Mauvaises habitudes'], [u(53.3), 'Procédures mal appliquées']]} /></div>
      </Abs>
    </Out>
  );
};

/* ═════════════ Guichet 4 : l'exemple du cariste — appris, dérive, refresher ═════════════ */
const Cariste: React.FC = () => {
  const t = useT();
  const phase = t < 74.3 ? 0 : t < 85.3 ? 1 : 2;
  const drift = prog(t, 74.3, 75.2) * (1 - prog(t, 85.3, 86.2));
  const fast = prog(t, 78.9, 80.3, easeIn);
  const tags = ['FORMATION INITIALE', 'QUELQUES MOIS PLUS TARD', 'SESSION DE REFRESHER'];
  const cols = [NAVY, KOC, OKC];
  const needle = -110 + 70 * prog(t, 74.5, 76.0) + 120 * prog(t, 78.9, 79.6, easeOut) - 150 * prog(t, 88.0, 89.0, easeInOut);
  const nr = ((needle - 90) * Math.PI) / 180;
  const listOp = (k: number) => (k === 0 ? 1 - prog(t, 74.3, 74.8) : k === 1 ? prog(t, 74.5, 75.0) * (1 - prog(t, 85.3, 85.8)) : prog(t, 85.5, 86.0));
  return (
    <Out end={101.0}>
      <Heads h={[[60.6, ['Formation initiale', 'du cariste'], [1]], [70.4, ['Éviter collisions', 'et renversements'], [0, 1]], [74.3, ['Après plusieurs mois', 'de travail'], [0]], [76.7, ['Il commence', 'à négliger'], [1]], [85.3, ["L'entreprise organise", 'un refresher HSE'], [1]], [88.5, ['Pendant', 'la session'], [1]]]} />
      <Abs x={60} y={455} w={960} h={400} style={{...nb('#000', 8), borderColor: NBK, overflow: 'hidden', opacity: pop(t, 59.4)}}>
        <Img src={PH('whatif-gen/entrepot-chariot.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '45% 45%', transform: `scale(${1.05 + (t - 59.4) * 0.002})`, filter: `saturate(${1 - drift * 0.7}) contrast(${1 + drift * 0.1})`}} />
        <div style={{position: 'absolute', inset: 0, background: `rgba(217,54,62,${drift * 0.28})`}} />
        {fast > 0 && fast < 1 && <div style={{position: 'absolute', left: lerp(-260, 1100, fast), top: 250, filter: 'blur(3px)'}}><Forklift s={1.4} /></div>}
        <div style={{position: 'absolute', left: 18, top: 18}}><div style={{background: cols[phase], color: '#fff', border: `4px solid ${NBK}`, borderRadius: 10, padding: '4px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, boxShadow: `4px 4px 0 ${NBK}`}}>{tags[phase]}</div></div>
        <div style={{position: 'absolute', right: 20, bottom: 18, width: 170, height: 120}}>
          <svg width={170} height={120} viewBox="0 0 170 120"><path d="M 15 105 A 70 70 0 0 1 155 105" fill="rgba(255,255,255,0.92)" stroke={NBK} strokeWidth={5} /><path d="M 120 52 A 70 70 0 0 1 155 105" fill="none" stroke={KOC} strokeWidth={10} /><line x1={85} y1={105} x2={85 + 58 * Math.cos(nr)} y2={105 + 58 * Math.sin(nr)} stroke={NBK} strokeWidth={6} strokeLinecap="round" /><circle cx={85} cy={105} r={8} fill={NBK} /></svg>
          <div style={{position: 'absolute', left: 0, right: 0, top: -26, textAlign: 'center', ...CAP, fontSize: 16, color: '#fff', textShadow: '0 2px 4px #000'}}>vitesse</div>
        </div>
        {t > 85.2 && t < 90 && <div style={{position: 'absolute', left: 0, right: 0, top: 150, display: 'flex', justifyContent: 'center'}}><SlamTag at={85.3} text="REFRESHER HSE" c={RC} rot={-4} size={58} ic="RotateCcw" /></div>}
      </Abs>
      <Abs x={60} y={890} w={960} style={{display: 'flex', flexDirection: 'column', gap: 12, opacity: listOp(0)}}>
        {listOp(0) > 0 && <>
          <CRow at={63.6} l="Règles de conduite sécurisée" ic="Route" c={NAVY} mark="ok" fs={30} />
          <CRow at={65.6} l="Vérifications avant utilisation" ic="ClipboardCheck" c={NAVY} mark="ok" fs={30} />
          <CRow at={67.3} l="Limitations de vitesse" ic="Gauge" c={NAVY} mark="ok" fs={30} />
          <CRow at={69.0} l="Règles de circulation" ic="Signpost" c={NAVY} mark="ok" fs={30} />
          <CRow at={71.8} l="Éviter collisions et renversements" ic="TriangleAlert" c={NAVY} mark="ok" fs={30} />
        </>}
      </Abs>
      <Abs x={60} y={890} w={960} style={{display: 'flex', flexDirection: 'column', gap: 14, opacity: listOp(1)}}>
        {listOp(1) > 0 && <>
          <CRow at={77.2} l="Vérifications négligées" ic="ClipboardCheck" c={KOC} mark="ko" fs={34} />
          <CRow at={78.9} l="Circulation trop rapide" ic="Gauge" c={KOC} mark="ko" fs={34} />
          <CRow at={80.8} l="Charges sans respecter les consignes" ic="TriangleAlert" c={KOC} mark="ko" fs={32} />
        </>}
      </Abs>
      <Abs x={60} y={890} w={960} style={{display: 'flex', flexDirection: 'column', gap: 14, opacity: listOp(2)}}>
        {listOp(2) > 0 && <>
          <CRow at={90.4} l="Révise les règles de conduite" ic="BookOpen" c={OKC} mark="ok" fs={32} />
          <CRow at={92.3} l="Reprend les vérifications" ic="ClipboardCheck" c={OKC} mark="ok" fs={32} />
          <CRow at={94.3} l="Revoit les principaux risques" ic="TriangleAlert" c={OKC} mark="ok" fs={32} />
          <CRow at={97.5} l="Exercices pratiques de maîtrise" ic="HardHat" c={OKC} mark="ok" fs={32} />
        </>}
      </Abs>
    </Out>
  );
};
const PasZero: React.FC = () => {
  const t = useT();
  const lv = 0.62 + 0.38 * prog(t, 104.6, 105.6, easeOut);
  const cross = prog(t, 102.6, 103.0, easeOut);
  return (
    <Out end={109.1}>
      <Heads h={[[101.3, ['Pas tout reprendre', 'depuis le début'], [0]], [104.6, ['Consolider', '· corriger · maintenir'], [0, 1]]]} />
      <Abs x={110} y={470} w={860} h={250} style={{...nb('#fff', 7), borderColor: NBK, padding: '24px 30px', opacity: pop(t, 101.0)}}>
        <div style={{...CAP, fontSize: 20, color: DIM}}>Compétences du cariste</div>
        <div style={{position: 'relative', marginTop: 16, height: 60, borderRadius: 30, background: '#E6E9EF', border: `4px solid ${NBK}`, overflow: 'hidden'}}><div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${lv * 100}%`, background: `linear-gradient(90deg, ${NAVY}, ${OKC})`}} /></div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 12, ...CAP, fontSize: 18, color: DIM}}><span>acquis conservés</span><span style={{color: OKC}}>{lv > 0.99 ? 'à jour ✓' : ''}</span></div>
      </Abs>
      <Abs x={190} y={750} w={700} h={110} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 102.2)}}>
        <div style={{position: 'relative', ...nb('#fff', 6), borderColor: NBK, padding: '14px 30px', display: 'flex', alignItems: 'center', gap: 14, whiteSpace: 'nowrap', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: DIM}}><Ico n="RotateCcw" size={40} c={DIM} />Tout recommencer à 0
          <div style={{position: 'absolute', left: -10, right: -10, top: '50%', height: 10, background: KOC, borderRadius: 5, transform: `rotate(-8deg) scaleX(${cross})`, transformOrigin: '0 50%'}} />
        </div>
      </Abs>
      <Abs x={60} y={910} w={960} style={{display: 'flex', flexDirection: 'column', gap: 18}}>
        <Pill2 at={104.6} ic="ShieldCheck" l="Consolider ses acquis" c={OKC} fs={34} />
        <Pill2 at={106.0} ic="Wrench" l="Corriger ses écarts" c={RC} fs={34} />
        <Pill2 at={107.2} ic="RefreshCw" l="Maintenir ses compétences à jour" c={NAVY} fs={34} />
      </Abs>
    </Out>
  );
};

/* ═════════════ Guichet 5 : quand l'organiser ? — intervalle défini, situations déclenchantes ═════════════ */
const Quand1: React.FC = () => {
  const t = useT();
  const ang = (t - 111.0) * 90;
  return (
    <Out end={119.0}>
      <Heads h={[[111.1, ['À intervalle', 'défini'], [1]], [112.3, ['Selon les exigences', 'et les risques'], [0, 1]]]} />
      <Abs x={340} y={470} w={400} h={400} style={{opacity: pop(t, 112.4)}}>
        <svg width={400} height={400} viewBox="0 0 400 400"><circle cx={200} cy={200} r={170} fill="none" stroke="#E3E6EC" strokeWidth={22} /><circle cx={200} cy={200} r={170} fill="none" stroke={VIO} strokeWidth={22} strokeDasharray="60 47" /></svg>
        <div style={{position: 'absolute', left: 200 + 170 * Math.cos((ang * Math.PI) / 180) - 28, top: 200 + 170 * Math.sin((ang * Math.PI) / 180) - 28, width: 56, height: 56, borderRadius: 28, background: RC, border: `5px solid ${NBK}`}} />
        <div style={{position: 'absolute', inset: 80, ...nb('#fff', 6), borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6}}><Ico n="CalendarSync" size={86} c={VIO} /><span style={{...CAP, fontSize: 15, color: VIO, textAlign: 'center', lineHeight: 1.3}}>intervalle<br />défini</span></div>
      </Abs>
      <Abs x={60} y={910} w={960} style={{display: 'flex', flexDirection: 'column', gap: 18}}>
        <Pill2 at={112.8} ic="Scale" l="Exigences réglementaires" c={VIO} fs={34} />
        <Pill2 at={114.1} ic="ScrollText" l="Procédures internes" c={VIO} fs={34} />
        <Pill2 at={116.0} ic="TriangleAlert" l="Risques liés au poste" c={VIO} fs={34} />
      </Abs>
    </Out>
  );
};
const Quand2: React.FC = () => {
  const t = useT();
  const SW: [string, number, string][] = [['Après un accident ou un incident', 119.8, 'Siren'], ['Changement de procédures', 122.1, 'RefreshCw'], ['Nouvel équipement', 125.2, 'Cog'], ['Insuffisances de compétences', 127.2, 'TrendingDown']];
  return (
    <Out end={130.7}>
      <Heads h={[[118.3, ['Également nécessaire', 'dans ces situations'], [1]]]} />
      <Abs x={60} y={470} w={960} h={860} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 20}}>
        {SW.map(([l, a, ic], k) => {
          const on = prog(t, a, a + 0.35, easeInOut);
          return (
            <div key={l} style={{...nb('#fff', 7), borderColor: on > 0.5 ? RC : NBK, boxShadow: on > 0.5 ? `7px 7px 0 ${NBK}, 0 0 30px ${RC}88` : `7px 7px 0 ${NBK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 20, textAlign: 'center', opacity: pop(t, 118.9 + k * 0.1)}}>
              <Ico n={ic} size={90} c={on > 0.5 ? RC : '#9AA3B2'} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, lineHeight: 1.1}}>{l}</div>
              <div style={{position: 'relative', width: 140, height: 64, borderRadius: 32, background: on > 0.5 ? OKC : '#C9D2DF', border: `4px solid ${NBK}`}}><div style={{position: 'absolute', top: 4, left: 4 + on * 76, width: 48, height: 48, borderRadius: 24, background: '#fff', border: `4px solid ${NBK}`}} /></div>
              <div style={{...CAP, fontSize: 16, color: on > 0.5 ? OKC : DIM}}>{on > 0.5 ? 'refresher déclenché' : 'en veille'}</div>
            </div>
          );
        })}
      </Abs>
    </Out>
  );
};
const Attention: React.FC = () => {
  const t = useT();
  return (
    <Out end={136.3}>
      <Heads h={[[130.7, ['Attention :', 'un rappel verbal ne suffit pas'], [1]]]} />
      <Abs x={60} y={500} w={400} h={520} style={{...nb('#F1F3F7', 7), borderColor: NBK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, opacity: pop(t, 131.2)}}>
        <Ico n="MessageCircle" size={170} c="#9AA3B2" />
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: DIM, textAlign: 'center'}}>Simple rappel<br />verbal</div>
      </Abs>
      <Abs x={460} y={640} w={160} style={{display: 'flex', justifyContent: 'center'}}>{t > 132.3 && <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 170, color: KOC, transform: `scale(${lerp(2.2, 1, prog(t, 132.3, 132.5, easeIn))})`}}>≠</div>}</Abs>
      <Abs x={620} y={500} w={400} h={520} style={{...nb('#fff', 7), borderColor: NBK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, opacity: pop(t, 133.6)}}>
        <Ico n="FileCheck" size={170} c={OKC} />
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK, textAlign: 'center'}}>Recyclage<br />formalisé</div>
        {t > 134.1 && <div style={{position: 'absolute', right: -20, top: 20}}><SlamTag at={134.2} text="FORMALISÉ" c={OKC} rot={10} size={28} ic="Stamp" /></div>}
      </Abs>
      {t > 135.8 && <Abs x={60} y={1090} w={960} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={135.9} text="lorsqu'il est exigé" bg={NBK} rot={-2} size={34} /></Abs>}
    </Out>
  );
};

/* ═════════════ Guichet 6 : à retenir — dents de scie, citation, question, appel ═════════════ */
const Retenir: React.FC = () => {
  const t = useT();
  return (
    <Out end={150.6}>
      <Heads h={[[138.3, ['Formation initiale :', 'acquérir'], [1]], [142.1, ['Refresher :', 'réviser · maintenir'], [1]]]} />
      <Abs x={60} y={460} w={960} h={740} style={{...STAGE, opacity: pop(t, 139.6)}}>
        <div style={SCAN} />
        <div style={{position: 'absolute', left: 30, top: 30, width: 900, height: 680}}><Curve W={900} H={660} a={139.8} b={147.6} mode="saw" /></div>
        {t > 140.0 && <div style={{position: 'absolute', left: 40, top: 30}}><NBadge at={140.0} text="Formation initiale · acquérir" bg={NAVY} rot={-2} size={24} /></div>}
        {t > 144.2 && <div style={{position: 'absolute', right: 30, top: 30}}><NBadge at={144.3} text="Refreshers · maintenir" bg={OKC} rot={2} size={24} /></div>}
      </Abs>
      <Abs x={60} y={1225} w={960} style={{display: 'flex', justifyContent: 'center', gap: 30, ...CAP, fontSize: 19, opacity: pop(t, 141.5)}}>
        <span style={{color: OKC}}>━ avec refreshers</span><span style={{color: KOC}}>╍ sans refresher</span>
      </Abs>
    </Out>
  );
};
const Citation: React.FC = () => {
  const t = useT();
  const ring = (t - 151.6) / 0.9;
  return (
    <Out end={154.7}>
      <Heads h={[[149.0, ['Avoir appris', '≠ bien appliquer'], [1]]]} />
      <Abs x={90} y={520} w={900} h={620} style={{...nb('#FFFDF5', 9), borderColor: NBK, padding: '50px 54px', opacity: pop(t, 150.5)}}>
        <Ico n="Quote" size={90} c={RC} />
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 58, color: INK, lineHeight: 1.12, marginTop: 14}}>
          <span style={{background: t > 150.7 ? `${YEL}AA` : 'transparent'}}>Avoir appris une règle</span> <span style={{color: t > 151.6 ? KOC : INK}}>ne signifie pas forcément</span> <span style={{background: t > 152.7 ? `${OKC}33` : 'transparent'}}>continuer à bien l'appliquer.</span>
        </div>
      </Abs>
      {ring > 0 && ring < 1 && [0, 1].map((k) => <div key={k} style={{position: 'absolute', left: 540 - (ring + k * 0.25) * 600, top: 830 - (ring + k * 0.25) * 600, width: (ring + k * 0.25) * 1200, height: (ring + k * 0.25) * 1200, borderRadius: '50%', border: `8px solid ${KOC}`, opacity: (1 - ring) * 0.6}} />)}
    </Out>
  );
};
const Question: React.FC = () => {
  const t = useT();
  return (
    <Out end={158.7}>
      <Heads h={[[154.7, ['Et dans', 'ton entreprise ?'], [1]]]} />
      <Abs x={40} y={450} w={1000} h={900} style={{...STAGE, opacity: pop(t, 154.6)}}>
        <Ring3D imgs={RING_RF} at={154.6} w={990} h={890} cw={545} ch={390} R={750} zr={420} persp={1560} speed={18} cy={0.36} />
        <div style={SCAN} />
        <QBubble at={155.6} text="Les refreshers HSE sont-ils organisés régulièrement ?" x={80} y={600} w={830} c={RC} dur={1.6} fs={40} />
      </Abs>
    </Out>
  );
};
const Appel: React.FC = () => {
  const t = useT();
  const click = t > 158.95 && t < 159.15;
  const subbed = t > 159.05;
  const cur = prog(t, 158.4, 158.95, easeInOut);
  const send = t > 168.4 && t < 168.6;
  const msg = (a: number, s0: string) => s0.slice(0, Math.floor(s0.length * prog(t, a, a + 1.1, lin)));
  return (
    <Out end={OUTRO_AT}>
      <Heads h={[[158.6, ['Abonne-toi', 'et contacte-nous'], [0, 1]]]} />
      <Abs x={190} y={460} w={700} h={150} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 158.5)}}>
        <div style={{...nb(subbed ? '#fff' : KOC, 7), borderColor: NBK, display: 'flex', alignItems: 'center', gap: 16, padding: '20px 40px', fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: subbed ? INK : '#fff', transform: `scale(${click ? 0.92 : 1})`}}><span style={{display: 'inline-flex', transform: `rotate(${subbed ? Math.sin((t - 159.05) * 18) * 20 * Math.exp(-(t - 159.05) * 2) : 0}deg)`}}><Ico n="BellRing" size={52} c={subbed ? RC : '#fff'} /></span>{subbed ? 'Abonné ✓' : "S'abonner"}</div>
      </Abs>
      {t > 158.3 && t < 159.6 && <div style={{position: 'absolute', left: lerp(980, 640, cur), top: lerp(760, 545, cur), zIndex: 20}}><svg width={60} height={72} viewBox="0 0 24 30"><path d="M2 2 L2 24 L8 18 L12 28 L16 26 L12 17 L20 17 Z" fill="#fff" stroke={INK} strokeWidth={2} strokeLinejoin="round" /></svg></div>}
      <Abs x={230} y={650} w={620} h={690} style={{background: '#0E1320', border: `6px solid ${NBK}`, borderRadius: 48, boxShadow: `10px 10px 0 ${OKC}`, overflow: 'hidden', opacity: pop(t, 162.8), transform: `translateY(${(1 - Math.min(1, sp(t, 162.8))) * 200}px)`}}>
        <div style={{height: 110, background: '#128C7E', display: 'flex', alignItems: 'center', gap: 16, padding: '0 26px'}}><div style={{width: 64, height: 64, borderRadius: 32, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Img src={staticFile(LOGO)} style={{width: 54}} /></div><div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff'}}>UNIVERSNORMES</div><div style={{fontFamily: sansFont, fontWeight: 600, fontSize: 18, color: '#D7F5EE'}}>WhatsApp · +226 67 96 74 19</div></div></div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 110, bottom: 100, background: '#ECE5DD', padding: 24, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-end'}}>
          {t > 163.5 && <div style={{maxWidth: 470, background: '#DCF8C6', borderRadius: '18px 18px 4px 18px', padding: '14px 18px', fontFamily: sansFont, fontWeight: 700, fontSize: 28, color: INK, boxShadow: '0 2px 4px rgba(0,0,0,0.15)'}}>{msg(163.6, 'Renforcer les compétences HSE de nos équipes')}</div>}
          {t > 166.2 && <div style={{maxWidth: 470, background: '#DCF8C6', borderRadius: '18px 18px 4px 18px', padding: '14px 18px', fontFamily: sansFont, fontWeight: 700, fontSize: 28, color: INK, boxShadow: '0 2px 4px rgba(0,0,0,0.15)'}}>{msg(166.3, 'Structurer notre système de management QHSE')}</div>}
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 100, background: '#F0F0F0', display: 'flex', alignItems: 'center', gap: 14, padding: '0 20px'}}>
          <div style={{flex: 1, height: 60, borderRadius: 30, background: '#fff', display: 'flex', alignItems: 'center', paddingLeft: 20, fontFamily: sansFont, fontSize: 24, color: DIM}}>Contactez-nous…</div>
          <div style={{width: 70, height: 70, borderRadius: 35, background: '#128C7E', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${send ? 0.85 : 1 + 0.08 * Math.sin(Math.max(0, t - 168.4) * 8) * (t > 168.4 ? 1 : 0)})`}}><Ico n="Send" size={36} c="#fff" /></div>
        </div>
      </Abs>
    </Out>
  );
};

/** Couverture : le cariste et la responsable HSE dans l'entrepôt + titre « LE REFRESHER HSE » en lettres-photos animées. */
const COVER_PHOTO = 'whatif-gen/entrepot-chariot.jpg';
const ICover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1020, overflow: 'hidden'}}><Img src={PH(COVER_PHOTO)} style={{width: 1080, height: 1020, objectFit: 'cover', objectPosition: '45% 35%', transform: `scale(${1.04 + t * 0.015})`, transformOrigin: '45% 30%'}} /></div>
      <div style={{position: 'absolute', left: 0, top: 660, width: 1080, height: 360, background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}D9 55%, ${PAPER} 100%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.18)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={880} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="LE" src={IMG.c2} size={80} ls={8} seed={1} /></Abs>
      <Abs x={0} y={968} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="REFRESHER" src={IMG.cover} size={150} ls={6} seed={4} /></Abs>
      <Abs x={0} y={1130} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="HSE" src={IMG.c1} size={200} ls={14} seed={7} /></Abs>
      <Abs x={0} y={1360} w={1080} style={{textAlign: 'center'}}><span style={{fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: DIM}}>RECYCLAGE · RAPPEL DES CONNAISSANCES</span></Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140 + lerp(0, 40, Math.sin(t * 2) * 0.5 + 0.5), top: 36}}><Capsule w={56} c={NAVY} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 700, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Montage, bruitage ═════════════ */
const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.2}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at + 0.15, s: 'sfx/bell', v: 0.16})),
  {at: 3.0, s: 'tampon', v: 0.38}, ...rep(5.4, 14, 0.15, 'page', 0.12), {at: 8.2, s: 'tampon', v: 0.5}, {at: 8.22, s: 'deep-hit', v: 0.3},
  ...searchCues(9.4, 13, 10.95, 11.3), {at: 13.8, s: 'sfx/pop', v: 0.24},
  ...[19.7, 19.85, 20.0].map((at) => ({at, s: 'sfx/pop', v: 0.22})), {at: 21.8, s: 'riser', v: 0.2, dur: 0.8}, ...[23.1, 23.22, 23.34].map((at) => ({at, s: 'sfx/pop', v: 0.18})), {at: 25.3, s: 'sfx/ding', v: 0.24},
  ...[28.1, 28.9, 29.8].map((at) => ({at, s: 'sfx/thud', v: 0.3})), ...[30.6, 31.6, 32.5].map((at) => ({at, s: 'sfx/pop', v: 0.22})), {at: 33.3, s: 'validation', v: 0.24},
  ...[35.8, 37.9, 40.4, 42.4].map((at) => ({at, s: 'soft-whoosh', v: 0.32, dur: 0.6})),
  {at: 49.2, s: 'tension', v: 0.15, dur: 4}, ...[49.5, 51.2, 53.3].map((at) => ({at, s: 'sfx/thud', v: 0.3})),
  ...[63.6, 65.6, 67.3, 69.0, 71.8].map((at) => ({at, s: 'sfx/pop', v: 0.22})), ...[77.2, 78.9, 80.8].map((at) => ({at, s: 'sfx/thud', v: 0.32})), {at: 78.9, s: 'sfx/whoosh', v: 0.4},
  {at: 85.3, s: 'tampon', v: 0.5}, ...[90.4, 92.3, 94.3, 97.5].map((at) => ({at, s: 'validation', v: 0.2})),
  {at: 102.6, s: 'stylo', v: 0.3, dur: 0.5}, {at: 104.6, s: 'sfx/rise', v: 0.24, dur: 1}, ...[104.6, 106.0, 107.2].map((at) => ({at, s: 'sfx/pop', v: 0.22})),
  ...[112.8, 114.1, 116.0].map((at) => ({at, s: 'sfx/pop', v: 0.22})), ...[119.8, 122.1, 125.2, 127.2].map((at) => ({at, s: 'sfx/click', v: 0.45})), {at: 119.85, s: 'alarme', v: 0.08, dur: 0.8},
  {at: 132.3, s: 'deep-hit', v: 0.35}, {at: 134.2, s: 'tampon', v: 0.4},
  {at: 139.8, s: 'riser', v: 0.2, dur: 1.5}, ...[0, 1, 2, 3, 4, 5].map((k) => ({at: 139.8 + (0.08 + k * 0.16) * 7.8, s: 'sfx/ding', v: 0.14})), {at: 140.0, s: 'sfx/pop', v: 0.22}, {at: 144.3, s: 'sfx/pop', v: 0.22},
  {at: 151.6, s: 'bass-hit', v: 0.35}, {at: 154.6, s: 'sfx/whoosh', v: 0.35}, {at: 155.6, s: 'sfx/pop', v: 0.24}, ...rep(155.7, 14, 0.1, 'sfx/click', 0.06),
  {at: 158.95, s: 'sfx/click', v: 0.5}, {at: 159.05, s: 'notification', v: 0.3}, {at: 162.8, s: 'soft-whoosh', v: 0.35, dur: 0.8}, ...rep(163.6, 10, 0.1, 'sfx/click', 0.06), ...rep(166.3, 10, 0.1, 'sfx/click', 0.06), {at: 168.45, s: 'sfx/swish', v: 0.35}, {at: 168.6, s: 'notification', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];
const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SCN: [React.FC, number, number][] = [[Q1, 2.5, 9.5], [Q2, 9.3, 16.5], [Def1, 19.6, 27.2], [Def2, 26.9, 34.9], [Def3, 34.6, 46.1], [Oubli, 49.2, 56.0], [Cariste, 59.3, 101.1], [PasZero, 100.8, 109.2], [Quand1, 112.5, 119.1], [Quand2, 118.8, 130.8], [Attention, 130.5, 136.4], [Retenir, 139.6, 150.7], [Citation, 150.4, 154.8], [Question, 154.5, 158.8], [Appel, 158.4, OUTRO_AT]];
export const RefresherHseMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    {SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    <Gate from={85.2} to={86.3}><GyroFlash at={85.3} /></Gate>
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><ICover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-refresher-hse-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u2 = [wn, Avatar, Ring3D, SlamTag, Arrow, slamK, CAP, STAGE, SCAN, RING_ISO, RING_RF, Drum, Marked, Announce, MBadge, RailSteps, StairSteps, ZigSteps, QBubble, Grid15, RameWipe, Forklift, ICO, MC, ACR, lin, hexMix, cl, GyroFlash, Hot, Photo, Pill2, lvlNoRef, OKC, KOC, RC];

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn, Barred, Flap];
