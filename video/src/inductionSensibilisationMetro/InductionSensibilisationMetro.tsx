import React from 'react';
import type {LucideIcon} from 'lucide-react';
import {Activity, ArrowRight, Award, BadgeCheck, Ban, Bell, BellRing, BookOpen, Briefcase, BriefcaseMedical, CalendarClock, CalendarDays, ChartColumn, ChartNoAxesCombined, Check as LCheck, CircleCheckBig, CircleX, ClipboardCheck, ClipboardList, Clock, DoorOpen, Droplets, Ear, Eye, Factory, Fan, FileText, FireExtinguisher, Flag, FlaskConical, FolderOpen, Footprints, Gauge, Gavel, Glasses, Globe, GraduationCap, Hand, HandHeart, HardHat, IdCard, Image as ImageIcon, Infinity as InfinityIcon, Layers, Leaf, Lightbulb, Link, ListChecks, Lock, LockOpen, Mail, MapPin, Megaphone, MessageCircleOff, MessageSquareText, Network, Newspaper, OctagonAlert, PenLine, Power, Presentation, Puzzle, Recycle, RefreshCw, Repeat, Route, Scale, ScrollText, Search, Settings2, ShieldAlert, ShieldCheck, Siren, Split, Sprout, Target, ThumbsUp, TriangleAlert, User, UserCheck, UserPlus, Users, VolumeX, Workflow, Wrench, Zap} from 'lucide-react';
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
 * « La différence entre l'induction HSE et la sensibilisation HSE » (voix d'origine, 3 min 42) — capsule « condensé
 * + effet wahou + ultra premium » présentée en métro (8 stations). Tube de verre à six guichets adapté au contenu :
 * deux notions → induction → sensibilisation → objectif · public → format · fréquence → résumé ; la capsule du
 * dossier file d'un guichet à l'autre (gyrophare ×2, loupe, capsule pneumatique, store vénitien) et deux rames de
 * métro foncent vers la caméra entre les différences. Barre de recherche « induction HSE » qui ouvre le face-à-face
 * des deux notions. Techniques : porte du site qui s'ouvre en 3D sur l'accueil, badges d'accès à cordon qui se
 * balancent (nouvel employé, visiteur), cible et flèche plantée, rail d'induction à capsule (5 éléments), boucle ∞
 * avec comète et jauge de conscience, cartes qui pivotent (sécurité · hygiène · environnement), mosaïque des formes,
 * escalier des objectifs, comparateur à volet glissant entre deux photos, population de pictogrammes (nouveaux,
 * visiteurs, vague verte « tous les employés »), formats qui basculent en 3D, électrocardiogramme de la fréquence
 * (un seul pic contre des pics périodiques), tableau-checklist balayé ligne à ligne, final sur le carrousel
 * cylindrique 3D du film ISO 45001. Sous-titres NeoCaptions sur la voix d'origine (transcription locale corrigée),
 * sans musique, bruitage discret. Images de la session réutilisées.
 */
const IMG = {
  cover: 'promo/hse-machine.jpg',
  c1: 'induction/accueil-groupe.jpg',
  c2: 'rhse-gen/prevention.jpg',
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
const OUTRO_AT = 223.0;
export const INDUCTION_SENSIB_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '1', title: 'Deux notions', s: 'liées mais distinctes', c: BLUE, g: 'deux notions', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 19.11, n: '2', title: "L'induction HSE", s: "un processus d'introduction", c: NAVY, g: 'induction', k: 'gyro', lab: 'GUICHET 2 / 6'},
  {at: 65.3, n: '3', title: 'La sensibilisation HSE', s: 'un processus continu', c: GREEN, g: 'sensibilisation', k: 'loupe', lab: 'GUICHET 3 / 6'},
  {at: 115.3, n: '4', title: 'Les différences', s: 'objectifs · public cible', c: ORANGE, g: 'objectif · public', k: 'tube', lab: 'GUICHET 4 / 6'},
  {at: 150.5, n: '5', title: 'Contenu et fréquence', s: 'format · fréquence', c: VIO, g: 'format · fréquence', k: 'store', lab: 'GUICHET 5 / 6'},
  {at: 191.6, n: '6', title: 'En résumé', s: 'bien commencer · rester vigilant', c: TEAL, g: 'résumé', k: 'gyro', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 221.6;
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
  {n: 1, l: 'Deux concepts liés', s: 'concepts', at: 7.62},
  {n: 2, l: 'Nouveaux employés et visiteurs', s: 'accueil', at: 26.4},
  {n: 3, l: 'Éléments essentiels', s: 'éléments', at: 48.0},
  {n: 4, l: 'Un processus continu', s: 'continu', at: 71.3},
  {n: 5, l: 'Les objectifs', s: 'objectifs', at: 120.3},
  {n: 6, l: 'Le public cible', s: 'public', at: 136.8},
  {n: 7, l: 'Contenu et format', s: 'format', at: 150.6},
  {n: 8, l: 'La fréquence', s: 'fréquence', at: 175.1},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE HSE · STATION {r.n} / 8</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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
const LUC: Record<string, LucideIcon> = {DoorOpen, UserPlus, IdCard, Route, BriefcaseMedical, Newspaper, Presentation, Image: ImageIcon, Mail, Clock, Eye, Bell, BellRing, Sprout, ThumbsUp, HandHeart, Infinity: InfinityIcon, Flag, MapPin, Link, Puzzle, Split, User, Droplets, Lightbulb, Activity, Ear, Siren, MessageSquareText, MessageCircleOff, VolumeX, Power, OctagonAlert, Fan, Megaphone, FlaskConical, LockOpen, Ban, Repeat, Zap, UserCheck, Network, BookOpen, Workflow, Search, FileText, CircleX, ChartColumn, FolderOpen, HardHat, TriangleAlert, Target, ClipboardList, ScrollText, Lock, ShieldAlert, FireExtinguisher, Wrench, Leaf, Factory, Scale, Recycle, Gavel, ShieldCheck, Globe, Layers, BadgeCheck, CalendarDays, PenLine, Gauge, RefreshCw, CalendarClock, ListChecks, Settings2, Award, GraduationCap, Briefcase, Users, ClipboardCheck, ChartNoAxesCombined, Glasses, Hand, Footprints, Check: LCheck, CircleCheckBig,
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


/* ═════════════ Outils propres à la capsule « induction vs sensibilisation » ═════════════ */
const IC = '#1F5FBF';
const SC = '#1E9E5A';
const RING_HSE = ['induction/accueil-groupe.jpg', 'promo/hse-machine.jpg', 'rhse-gen/prevention.jpg', 'induction/technicien-hse.jpg', 'promo/formation-incendie.jpg', 'induction/operatrice.jpg', 'principes-gen/chef-projet.jpg', 'promo/terrain-controle.jpg'];

/** Pastille de rôle « INDUCTION » / « SENSIBILISATION ». */
const Role: React.FC<{k: 'i' | 's'; size?: number; at?: number}> = ({k, size = 26, at = -1}) => {
  const t = useT();
  const q = at < 0 ? 1 : Math.min(1, sp(t, at));
  const c = k === 'i' ? IC : SC;
  return <div style={{display: 'inline-flex', alignItems: 'center', gap: 10, background: c, color: '#fff', border: `4px solid ${NBK}`, borderRadius: 12, padding: '6px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: size, letterSpacing: 1.5, boxShadow: `5px 5px 0 ${NBK}`, transform: `scale(${q})`, whiteSpace: 'nowrap'}}><Ico n={k === 'i' ? 'DoorOpen' : 'RefreshCw'} size={size * 1.15} c="#fff" />{k === 'i' ? 'INDUCTION' : 'SENSIBILISATION'}</div>;
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

/** Badge d'accès à cordon qui se balance (nouvel employé / visiteur). */
const IdBadge: React.FC<{at: number; src: string; role: string; c: string; x: number; y: number}> = ({at, src, role, c, x, y}) => {
  const t = useT();
  if (t < at - 0.05) return null;
  const q = Math.min(1.2, sp(t, at, 6, 9));
  const sw = Math.sin((t - at) * 3.2) * 9 * Math.exp(-(t - at) * 0.8);
  return (
    <div style={{position: 'absolute', left: x, top: y, width: 300, height: 330, transformOrigin: '150px -120px', transform: `translateY(${(1 - Math.min(1, q)) * -420}px) rotate(${sw}deg)`}}>
      <svg style={{position: 'absolute', left: 0, top: -120, overflow: 'visible'}} width={300} height={130}><path d="M 70 0 L 130 120 M 230 0 L 170 120" stroke={c} strokeWidth={12} fill="none" /></svg>
      <div style={{position: 'absolute', left: 120, top: -16, width: 60, height: 30, borderRadius: 8, background: '#9AA3B2', border: `4px solid ${NBK}`}} />
      <div style={{position: 'absolute', inset: 0, ...nb('#fff', 7), borderColor: NBK, overflow: 'hidden'}}>
        <div style={{height: 70, background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 26, letterSpacing: 1}}><Ico n="IdCard" size={34} c="#fff" />{role}</div>
        <div style={{position: 'absolute', left: 70, top: 86, width: 160, height: 160, borderRadius: 80, overflow: 'hidden', border: `5px solid ${c}`}}><Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
        <div style={{position: 'absolute', left: 30, right: 30, top: 262, height: 14, borderRadius: 7, background: '#E3E6EC'}} />
        <div style={{position: 'absolute', left: 60, right: 60, top: 288, height: 14, borderRadius: 7, background: '#E3E6EC'}} />
      </div>
    </div>
  );
};

/* ═════════════ Guichet 1 : deux notions → recherche → liées mais distinctes ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const near = prog(t, 14.3, 15.0, easeInOut) * (1 - prog(t, 16.1, 16.8, easeInOut));
  const apart = prog(t, 16.1, 16.8, easeInOut);
  const dx = -near * 30 + apart * 30;
  return (
    <Out end={19.25}>
      <Heads h={[[2.9, ['Induction', 'ou', 'sensibilisation ?'], [0, 2]], [7.62, ['Deux concepts', 'étroitement liés'], [1]], [13.22, ['Complémentaires,', 'mais distincts'], [1]]]} />
      <SearchOpen x={60} y={450} w={960} h={890} at={2.65} query="induction HSE" results={['Induction HSE · accueil sécurité', 'Sensibilisation HSE · culture sécurité', 'Induction vs sensibilisation HSE']} found={2} foundAt={4.1} clickAt={4.45} c={IC}>
        <div style={{position: 'absolute', inset: 0, background: '#F7F8FB'}}>
          {[['i', 40, IC, 'DoorOpen', 'Induction HSE', 5.3], ['s', 500, SC, 'Megaphone', 'Sensibilisation HSE', 6.3]].map(([k, x, c, ic, l, a]) => {
            const q = Math.min(1, sp(t, a as number));
            return <Abs key={k as string} x={(x as number) + (k === 'i' ? -dx : dx)} y={50} w={410} h={400} style={{...nb('#fff', 8), borderColor: NBK, overflow: 'hidden', opacity: cl(q * 1.5), transform: `translateY(${(1 - q) * 60}px) rotate(${k === 'i' ? -apart * 3 : apart * 3}deg)`}}>
              <div style={{height: 120, background: c as string, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n={ic as string} size={84} c="#fff" /></div>
              <div style={{padding: '26px 22px', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK, lineHeight: 1.08}}>{l as string}</div>
              <div style={{textAlign: 'center', ...CAP, fontSize: 18, color: c as string}}>{k === 'i' ? "processus d'introduction" : 'processus continu'}</div>
            </Abs>;
          })}
          {t > 9.2 && <div style={{position: 'absolute', left: 475 - 48, top: 200, width: 96, height: 96, borderRadius: 48, background: '#fff', border: `5px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1, sp(t, 9.32)) * (1 - apart)})`, zIndex: 3}}><Ico n="Link" size={56} c={INK} /></div>}
          <Abs x={40} y={520} w={870} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18}}>
            <Pill2 at={9.32} ic="Link" l="Étroitement liés" c={INK} />
            <Pill2 at={14.32} ic="Puzzle" l="Complémentaires" c={TEAL} />
            <Pill2 at={16.1} ic="Target" l="Objectifs différents" c={ORANGE} />
            <Pill2 at={18.1} ic="Split" l="Approches distinctes" c={VIO} />
          </Abs>
        </div>
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ Guichet 2 : l'induction — porte du site, badges, familiarisation ═════════════ */
const IndDef: React.FC = () => {
  const t = useT();
  const open = prog(t, 23.1, 24.4, easeInOut);
  const fam = prog(t, 29.9, 30.4, easeInOut);
  return (
    <Out end={36.95}>
      <Heads h={[[21.28, ["L'induction :", "un processus d'introduction"], [1]], [26.4, ['Nouveaux employés', 'et visiteurs'], [0, 1]], [29.6, ['Se familiariser', 'avec le site'], [1]]]} />
      <Abs x={240} y={455} w={600} h={330} style={{...nb('#fff', 8), borderColor: NBK, overflow: 'hidden', perspective: 1200, opacity: pop(t, 22.6)}}>
        <Img src={PH('induction/accueil-groupe.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.15 - 0.1 * open})`}} />
        {[0, 1].map((s0) => <div key={s0} style={{position: 'absolute', top: 0, bottom: 0, [s0 ? 'right' : 'left']: 0, width: '50%', background: `linear-gradient(${s0 ? 270 : 90}deg, #5B6472, #8E99A8)`, border: `4px solid ${NBK}`, boxSizing: 'border-box', transformOrigin: s0 ? '100% 50%' : '0 50%', transform: `rotateY(${(s0 ? 1 : -1) * open * 100}deg)`, display: 'flex', alignItems: 'center', justifyContent: s0 ? 'flex-start' : 'flex-end', padding: '0 18px'}}><div style={{width: 14, height: 70, borderRadius: 7, background: YEL, border: `3px solid ${NBK}`}} /></div>)}
        <div style={{position: 'absolute', left: 0, right: 0, top: 14, textAlign: 'center', opacity: 1 - open}}><span style={{...CAP, fontSize: 22, color: '#fff', background: NBK, padding: '4px 12px', borderRadius: 6}}>Entrée du site</span></div>
      </Abs>
      <div style={{opacity: 1 - fam, transform: `scale(${1 - fam * 0.12})`, transformOrigin: '50% 30%'}}>
        <IdBadge at={26.4} src="induction/operatrice.jpg" role="NOUVEL EMPLOYÉ" c={IC} x={150} y={920} />
        <IdBadge at={27.6} src="induction/ingenieur-chantier.jpg" role="VISITEUR" c={GOLD} x={630} y={920} />
      </div>
      {t > 30.2 && <Abs x={60} y={880} w={960} style={{display: 'flex', flexDirection: 'column', gap: 20}}>
        <Pill2 at={31.28} ic="ScrollText" l="Procédures de sécurité" c={IC} fs={34} />
        <Pill2 at={32.4} ic="TriangleAlert" l="Risques potentiels" c={ORANGE} fs={34} />
        <Pill2 at={33.6} ic="ShieldCheck" l="Mesures de prévention" c={SC} fs={34} />
      </Abs>}
      {t > 35.3 && <Abs x={60} y={1260} w={960} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={35.4} text="Applicables sur le site de travail" bg={IC} rot={-2} size={30} /></Abs>}
    </Out>
  );
};

/** Cible : la flèche part, se plante au centre (secousse) ; anneaux concentriques. */
const IndObj: React.FC = () => {
  const t = useT();
  const fly = prog(t, 38.5, 39.1, easeIn);
  const hit = slamK(t, 39.1);
  return (
    <Out end={44.85}>
      <Heads h={[[36.81, ['Objectif :', 'travailler en sécurité'], [1]]]} />
      <Abs x={290} y={460} w={500} h={500} style={{transform: `translate(${Math.sin(t * 90) * hit * 8}px, 0) scale(${Math.min(1, sp(t, 36.9))})`}}>
        <svg width={500} height={500} viewBox="0 0 500 500">{[230, 180, 130, 80, 34].map((r, k) => <circle key={r} cx={250} cy={250} r={r} fill={k % 2 ? '#fff' : IC} stroke={NBK} strokeWidth={6} />)}</svg>
        {t > 38.4 && <div style={{position: 'absolute', left: lerp(900, 250, fly) - 10, top: lerp(-300, 250, fly) - 6, width: 300, height: 12, background: NBK, borderRadius: 6, transformOrigin: '0 50%', transform: 'rotate(-40deg)'}}><div style={{position: 'absolute', right: -6, top: -14, width: 0, height: 0, borderTop: '20px solid transparent', borderBottom: '20px solid transparent', borderLeft: `40px solid ${RED}`}} /></div>}
        {hit > 0 && <div style={{position: 'absolute', left: 250 - (1 - hit) * 200, top: 250 - (1 - hit) * 200, width: (1 - hit) * 400, height: (1 - hit) * 400, borderRadius: '50%', border: `8px solid ${YEL}`, opacity: hit}} />}
      </Abs>
      <Abs x={110} y={1010} w={860} style={{display: 'flex', flexDirection: 'column', gap: 20}}>
        <Check at={40.0} label="Comprendre les risques de son activité" c={IC} size={36} />
        <Check at={42.4} label="Savoir travailler en toute sécurité" c={SC} size={36} />
      </Abs>
    </Out>
  );
};

const IndElem: React.FC = () => {
  const t = useT();
  return (
    <Out end={65.4}>
      <Heads h={[[44.76, ['Plusieurs éléments', 'essentiels'], [1]], [61.45, ['Jusqu’aux règles', 'de circulation'], [1]]]} />
      {t < 48.4 && <Abs x={290} y={560} w={500} h={560} style={{...nb('#fff', 9), borderColor: NBK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, opacity: pop(t, 45.0) * (1 - prog(t, 48.0, 48.4)), transform: `rotate(${-2 + Math.sin(t * 2) * 1}deg)`}}>
        <div style={{width: 200, height: 200, borderRadius: 30, background: `${IC}18`, border: `4px solid ${IC}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="BookOpen" size={130} c={IC} /></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK, textAlign: 'center', lineHeight: 1.05}}>Contenu de<br />l'induction</div>
      </Abs>}
      {t > 47.9 && <RailSteps c={IC} y={470} h={880} at={48.0} fs={34} items={[['Politiques et procédures de sécurité', 49.9, 'ScrollText'], ['Équipements de protection individuelle requis', 52.6, 'HardHat'], ["Procédures d'urgence et premiers secours", 55.3, 'BriefcaseMedical'], ['Identification des dangers, évaluation des risques', 58.2, 'TriangleAlert'], ['Règles de circulation et de sécurité sur le site', 61.9, 'Route']]} />}
    </Out>
  );
};

/* ═════════════ Guichet 3 : la sensibilisation — boucle continue, formes, objectifs ═════════════ */
const Infinite: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  const d = 'M 300 150 C 380 40 540 40 540 150 C 540 260 380 260 300 150 C 220 40 60 40 60 150 C 60 260 220 260 300 150 Z';
  const draw = prog(t, at - 1.0, at, easeInOut);
  const ph = ((t - at) * 0.45) % 1;
  const pts = (u: number) => { const a = u * Math.PI * 2; const s0 = Math.sin(a), c0 = Math.cos(a); const den = 1 + s0 * s0; return [300 + (240 * c0) / den, 150 + (240 * s0 * c0) / den]; };
  return (
    <svg width={600} height={300} viewBox="0 0 600 300" style={{overflow: 'visible'}}>
      <path d={d} fill="none" stroke="#DCE3EC" strokeWidth={30} strokeLinecap="round" />
      <path d={d} fill="none" stroke={SC} strokeWidth={18} strokeLinecap="round" strokeDasharray={`${draw * 1500} 1600`} />
      {t > at && Array.from({length: 14}, (_, k) => { const [x, y] = pts((ph - k * 0.012 + 1) % 1); return <circle key={k} cx={x} cy={y} r={16 - k} fill={k ? `rgba(255,255,255,${0.9 - k * 0.06})` : '#fff'} stroke={k ? 'none' : NBK} strokeWidth={4} />; })}
    </svg>
  );
};
const SensCont: React.FC = () => {
  const t = useT();
  const lvl = t < 73.3 ? 0.55 - 0.05 * Math.sin(t) : 0.55 + 0.35 * prog(t, 73.3, 74.6, easeOut) - 0.05 * ((t * 0.8) % 1) + 0.05;
  return (
    <Out end={79.3}>
      <Heads h={[[67.3, ['La sensibilisation :', 'un processus continu'], [1]], [72.2, ['Maintenir', 'et renforcer'], [0, 1]], [75.3, ['Sécurité · hygiène ·', 'environnement'], [0, 1]]]} />
      <Abs x={240} y={470} w={600} h={300} style={{opacity: pop(t, 68.6)}}><Infinite at={71.3} /></Abs>
      {t > 72.1 && <Abs x={100} y={500} w={220} style={{textAlign: 'center'}}><NBadge at={72.2} text="maintenir" bg={SC} rot={-4} size={28} /></Abs>}
      {t > 73.2 && <Abs x={760} y={500} w={220} style={{textAlign: 'center'}}><NBadge at={73.3} text="renforcer" bg={SC} rot={4} size={28} /></Abs>}
      <Abs x={110} y={810} w={860} h={150} style={{...nb('#fff', 6), borderColor: NBK, padding: '18px 24px', opacity: pop(t, 73.8)}}>
        <div style={{...CAP, fontSize: 19, color: DIM}}>Conscience des employés</div>
        <div style={{position: 'relative', marginTop: 14, height: 46, borderRadius: 23, background: '#E6E9EF', border: `4px solid ${NBK}`, overflow: 'hidden'}}><div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${cl(lvl) * 100}%`, background: `linear-gradient(90deg, ${SC}, #7BD89F)`}} /></div>
      </Abs>
      <Abs x={60} y={1010} w={960} style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18}}>
        {[['ShieldCheck', 'Sécurité', 75.9], ['Droplets', 'Hygiène', 76.3], ['Leaf', 'Environnement', 77.4]].map(([ic, l, a]) => { const q = Math.min(1, sp(t, a as number)); return t > (a as number) - 0.05 && <div key={l as string} style={{...nb('#fff', 6), borderColor: NBK, height: 250, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, transform: `rotateY(${(1 - q) * 90}deg)`, opacity: cl(q * 2)}}><div style={{width: 110, height: 110, borderRadius: 55, background: `${SC}1A`, border: `3px solid ${SC}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n={ic as string} size={64} c={SC} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>{l as string}</div></div>; })}
      </Abs>
    </Out>
  );
};
const SensFormes: React.FC = () => {
  const t = useT();
  const F4: [string, number, string, string][] = [['Formations régulières', 82.0, 'promo/formation-incendie.jpg', 'Presentation'], ["Séances d'information", 83.6, 'induction/briefing-atelier.jpg', 'Megaphone'], ['Campagnes de sensibilisation', 85.2, 'audit13-gen/affichage.jpg', 'Image'], ['Exercices pratiques', 86.7, 'promo/formation-consignation.jpg', 'HardHat']];
  return (
    <Out end={91.0}>
      <Heads h={[[79.25, ['Différentes', 'formes'], [1]], [87.6, ['Rappeler et renforcer', 'les bonnes pratiques'], [1]]]} />
      {F4.map(([l, a, src, ic], k) => {
        const x = 60 + (k % 2) * 490, y = 470 + Math.floor(k / 2) * 370;
        return t > a - 0.05 && <Photo key={l} src={src} x={x} y={y} w={470} h={345} at={a} c={SC} pos="50% 40%">
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: '12px 16px', background: 'linear-gradient(0deg, rgba(10,14,22,0.85), rgba(10,14,22,0))', display: 'flex', alignItems: 'center', gap: 10}}><Ico n={ic} size={34} c="#fff" /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff'}}>{l}</span></div>
        </Photo>;
      })}
      {t > 88.1 && <Abs x={60} y={1230} w={960} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb(SC, 6), color: '#fff', display: 'flex', alignItems: 'center', gap: 14, padding: '10px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, transform: `scale(${Math.min(1, sp(t, 88.2))})`}}><span style={{display: 'inline-flex', transform: `rotate(${t * 160}deg)`}}><Ico n="RefreshCw" size={38} c="#fff" /></span>Bonnes pratiques rappelées</div></Abs>}
    </Out>
  );
};
const SensObj: React.FC = () => {
  return (
    <Out end={115.4}>
      <Heads h={[[90.9, ['Plusieurs', 'objectifs'], [1]], [101.1, ['Prévenir', 'les accidents'], [1]], [105.4, ['Une culture', 'de sécurité positive'], [1]], [109.8, ['Informer', 'des changements'], [1]]]} />
      <StairSteps c={SC} y={500} h={850} fs={40} items={[['Vigilance de haut niveau', 96.8, 'Eye'], ['Prévenir accidents et incidents', 101.1, 'ShieldCheck'], ['Encourager les comportements sûrs', 103.1, 'ThumbsUp'], ['Culture de sécurité positive', 105.4, 'Sprout'], ['Informer des nouveaux risques', 109.8, 'BellRing']]} />
    </Out>
  );
};

/* ═════════════ Guichet 4 : différences 1 et 2 — comparateur à volet, population ═════════════ */
const DiffObj: React.FC = () => {
  const t = useT();
  const target = t < 123.6 ? 0.5 : t < 130.4 ? 0.74 : t < 136.0 ? 0.26 : 0.5;
  const from = t < 123.6 ? 0.5 : t < 130.4 ? 0.5 : t < 136.0 ? 0.74 : 0.26;
  const at = t < 123.6 ? 0 : t < 130.4 ? 123.6 : t < 136.0 ? 130.4 : 136.0;
  const sx = lerp(from, target, prog(t, at, at + 0.7, easeInOut));
  const W = 960, H = 560, X = sx * W;
  return (
    <Out end={136.8}>
      <Heads h={[[120.2, ['Différence n° 1 :', 'les objectifs'], [1]], [128.8, ['Dès le début', '· au fil du temps'], [0, 1]]]} />
      <Abs x={60} y={460} w={W} h={H} style={{...nb('#000', 8), borderColor: NBK, overflow: 'hidden', opacity: pop(t, 118.9)}}>
        <Img src={PH('rhse-gen/prevention.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '45% 40%'}} />
        <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: X, overflow: 'hidden'}}><Img src={PH('induction/accueil-groupe.jpg')} style={{position: 'absolute', left: 0, top: 0, width: W, height: H, objectFit: 'cover'}} /></div>
        <div style={{position: 'absolute', left: X - 4, top: 0, bottom: 0, width: 8, background: '#fff', boxShadow: '0 0 20px rgba(0,0,0,0.5)'}} />
        <div style={{position: 'absolute', left: X - 38, top: H / 2 - 38, width: 76, height: 76, borderRadius: 38, background: '#fff', border: `5px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>⇔</div>
        <div style={{position: 'absolute', left: 18, top: 18}}><Role k="i" size={22} /></div>
        <div style={{position: 'absolute', right: 18, top: 18}}><Role k="s" size={22} /></div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 14, textAlign: 'center'}}><span style={{...CAP, fontSize: 20, color: '#fff', background: NBK, padding: '4px 12px', borderRadius: 6}}>1 · objectifs</span></div>
      </Abs>
      <Abs x={60} y={1060} w={960} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20}}>
        <div style={{opacity: t > 124.5 ? 1 : 0}}><Pill2 at={124.6} ic="Flag" l="Les bases, dès le début" c={IC} fs={30} /></div>
        <div style={{opacity: t > 131.8 ? 1 : 0}}><Pill2 at={131.9} ic="Clock" l="Renforcer au fil du temps" c={SC} fs={30} /></div>
      </Abs>
    </Out>
  );
};
const DiffPublic: React.FC = () => {
  const t = useT();
  const COLS = 7, ROWS = 4;
  const NEW = [3, 11, 22], VIS = [6, 16];
  const wave = (k: number) => prog(t, 146.9 + (k % COLS) * 0.07 + Math.floor(k / COLS) * 0.05, 147.4 + (k % COLS) * 0.07 + Math.floor(k / COLS) * 0.05);
  return (
    <Out end={150.6}>
      <Heads h={[[136.7, ['Différence n° 2 :', 'le public cible'], [1]], [145.7, ['Sensibilisation :', 'tous les employés'], [1]]]} />
      <Abs x={60} y={470} w={960} h={620} style={{...nb('#fff', 8), borderColor: NBK, opacity: pop(t, 138.2)}}>
        {Array.from({length: COLS * ROWS}, (_, k) => {
          const isN = NEW.includes(k), isV = VIS.includes(k);
          const hiN = isN && t > 143.3, hiV = isV && t > 144.4;
          const g = !isV ? wave(k) : 0;
          const col = hiV ? GOLD : hiN && g < 0.5 ? IC : g > 0.5 ? SC : '#C9D2DF';
          const x = 40 + (k % COLS) * 128, y = 40 + Math.floor(k / COLS) * 140;
          const q = Math.min(1, sp(t, 138.4 + k * 0.025));
          return (
            <div key={k} style={{position: 'absolute', left: x, top: y, width: 110, height: 120, transform: `scale(${q * ((hiN && t < 145.0) || (hiV && t < 145.5) ? 1.12 : 1)})`, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div style={{width: 92, height: 92, borderRadius: 46, background: col, border: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="User" size={54} c="#fff" /></div>
              {(hiN || hiV) && <div style={{marginTop: -8, background: hiV ? GOLD : IC, color: '#fff', border: `3px solid ${NBK}`, borderRadius: 6, padding: '0 6px', fontFamily: sansFont, fontWeight: 900, fontSize: 14}}>{hiV ? 'VISITEUR' : 'NOUVEAU'}</div>}
              {isN && t > 149.3 && <div style={{position: 'absolute', right: 2, top: -4, width: 36, height: 36, borderRadius: 18, background: SC, border: `3px solid ${NBK}`, color: '#fff', fontWeight: 900, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1, sp(t, 149.3))})`}}>✓</div>}
            </div>
          );
        })}
      </Abs>
      <Abs x={60} y={1120} w={960} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
        {t > 141.2 && <div style={{display: 'flex', alignItems: 'center', gap: 16, opacity: pop(t, 141.3)}}><Role k="i" size={24} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>nouveaux employés · visiteurs</span></div>}
        {t > 145.8 && <div style={{display: 'flex', alignItems: 'center', gap: 16, opacity: pop(t, 145.9)}}><Role k="s" size={24} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>tous les employés</span></div>}
      </Abs>
    </Out>
  );
};

/* ═════════════ Guichet 5 : différences 3 et 4 — formats, électrocardiogramme de la fréquence ═════════════ */
const DiffFormat: React.FC = () => {
  const t = useT();
  const dim = prog(t, 162.0, 162.6);
  const T5: [string, number, string][] = [['Formations courtes', 166.1, 'Clock'], ['Ateliers', 167.1, 'Users'], ['Affiches', 167.7, 'Image'], ['Newsletters', 168.5, 'Newspaper'], ['Autres méthodes', 169.1, 'Lightbulb']];
  return (
    <Out end={174.8}>
      <Heads h={[[153.9, ["L'induction :", 'une formation structurée'], [1]], [162.1, ['La sensibilisation :', 'plusieurs formes'], [1]], [170.3, ['Rappeler', 'et approfondir'], [0, 1]]]} />
      <Abs x={60} y={470} w={440} h={860} style={{...nb('#fff', 8), borderColor: NBK, padding: 26, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', opacity: pop(t, 154.0) * (1 - dim * 0.45), transform: `scale(${1 - dim * 0.04})`}}>
        <div><Role k="i" size={22} /></div>
        <div style={{width: 220, height: 260, borderRadius: 14, background: IC, border: `5px solid ${NBK}`, boxShadow: `10px 10px 0 #9DB7E8`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto'}}><Ico n="BookOpen" size={130} c="#fff" /></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 42, color: INK, textAlign: 'center', lineHeight: 1.05}}>Formation structurée</div>
        {[['Procédures de base', 159.2], ['Exigences de sécurité', 160.3]].map(([l, a], k) => <div key={l as string} style={{display: 'flex', alignItems: 'center', gap: 12, opacity: pop(t, a as number)}}><div style={{width: 52, height: 52, borderRadius: 10, background: IC, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `3px solid ${NBK}`}}>{k + 1}</div><span style={{fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: INK, lineHeight: 1.1}}>{l as string}</span></div>)}
        <div style={{height: 18, borderRadius: 9, background: '#E3E6EC', overflow: 'hidden', flexShrink: 0}}><div style={{width: `${prog(t, 157.2, 161.0) * 100}%`, height: '100%', background: IC}} /></div>
      </Abs>
      <Abs x={530} y={470} w={490} h={860} style={{...nb('#fff', 8), borderColor: NBK, padding: 22, display: 'flex', flexDirection: 'column', opacity: pop(t, 162.1)}}>
        <div><Role k="s" size={20} /></div>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', flex: 1, perspective: 900}}>
          {T5.map(([l, a, ic]) => { const q = Math.min(1, sp(t, a)); return <div key={l} style={{...nb('#F4FBF7', 5), borderColor: NBK, display: 'flex', alignItems: 'center', gap: 16, padding: '20px 18px', transform: `rotateX(${(1 - q) * 90}deg)`, opacity: t > a - 0.05 ? 1 : 0}}><Ico n={ic} size={54} c={SC} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK}}>{l}</span></div>; })}
        </div>
      </Abs>
    </Out>
  );
};
const ecg = (x: number, spikes: number[], w = 18) => {
  let y = 0;
  for (const s0 of spikes) { const d = x - s0; if (Math.abs(d) < w) y += d < -w / 3 ? (d + w) * 2.2 : d < w / 3 ? -(d * 6) : (w - d) * -1.2; }
  return y;
};
const DiffFreq: React.FC = () => {
  const t = useT();
  const W = 860;
  const pathOf = (spikes: number[], upto: number) => { let d = ''; for (let x = 0; x <= upto; x += 4) { d += `${x === 0 ? 'M' : 'L'} ${x} ${-ecg(x, spikes) * 2.2}`; } return d; };
  const scanA = prog(t, 178.0, 182.6, lin) * W;
  const scanB = prog(t, 184.8, 188.0, lin) * W;
  const sA = [90], sB = [70, 190, 310, 430, 550, 670, 790];
  return (
    <Out end={191.7}>
      <Heads h={[[174.7, ['Différence n° 4 :', 'la fréquence'], [1]], [177.9, ['Induction :', 'une seule fois'], [1]], [183.6, ['Sensibilisation :', 'continue ou périodique'], [1]]]} />
      <Abs x={60} y={460} w={960} h={620} style={{...STAGE, opacity: pop(t, 176.0)}}>
        <div style={SCAN} />
        <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(111,211,179,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(111,211,179,0.08) 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
        {[[IC, '#7FB2FF', 'INDUCTION', 160, sA, scanA, 'une seule fois'], [SC, '#7BE3A4', 'SENSIBILISATION', 430, sB, scanB, 'continue ou périodique']].map(([c, glow, l, y0, sp0, sc0, sub]) => (
          <div key={l as string} style={{position: 'absolute', left: 50, top: (y0 as number) - 130, width: W, height: 220}}>
            <div style={{...CAP, fontSize: 18, color: glow as string}}>{l as string} · {sub as string}</div>
            <svg width={W} height={200} style={{position: 'absolute', left: 0, top: 30, overflow: 'visible'}}>
              <g transform="translate(0 110)">
                <line x1={0} y1={0} x2={W} y2={0} stroke="rgba(255,255,255,0.12)" strokeWidth={2} />
                <path d={pathOf(sp0 as number[], sc0 as number)} fill="none" stroke={glow as string} strokeWidth={6} strokeLinejoin="round" style={{filter: `drop-shadow(0 0 8px ${glow as string})`}} />
                {(sc0 as number) > 0 && (sc0 as number) < W && <circle cx={sc0 as number} cy={-ecg(sc0 as number, sp0 as number[]) * 2.2} r={9} fill="#fff" />}
              </g>
            </svg>
          </div>
        ))}
        {t > 180.3 && <div style={{position: 'absolute', left: 150, top: 140}}><NBadge at={180.4} text="1 fois" bg={IC} rot={-4} size={26} /></div>}
      </Abs>
      <Abs x={60} y={1110} w={960} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
        <Pill2 at={180.7} ic="Flag" l="Au début de l'emploi ou avant une visite" c={IC} fs={28} />
        <Pill2 at={188.0} ic="Target" l="Selon les besoins et les risques identifiés" c={SC} fs={28} />
      </Abs>
    </Out>
  );
};

/* ═════════════ Guichet 6 : résumé — tableau-checklist, puis carrousel final ═════════════ */
const ROWS4: [string, string, string, string][] = [['Objectif', 'Flag', 'Les bases, dès le début', 'Renforcer au fil du temps'], ['Public', 'Users', 'Nouveaux employés, visiteurs', 'Tous les employés'], ['Format', 'BookOpen', 'Formation structurée', 'Formats variés'], ['Fréquence', 'Clock', 'Une seule fois', 'Continue ou périodique']];
const Resume: React.FC = () => {
  const t = useT();
  const aI = (k: number) => 194.6 + k * 1.5, aS = (k: number) => 204.2 + k * 1.6;
  return (
    <Out end={212.4}>
      <Heads h={[[192.49, ["L'induction :", 'une étape initiale cruciale'], [1]], [202.0, ['La sensibilisation :', 'un processus continu'], [1]]]} />
      <Abs x={60} y={460} w={960} h={880} style={{...nb('#fff', 8), borderColor: NBK, overflow: 'hidden', opacity: pop(t, 194.4)}}>
        <div style={{display: 'grid', gridTemplateColumns: '200px 1fr 1fr', height: 110, borderBottom: `4px solid ${NBK}`}}>
          <div style={{background: '#F1F3F7'}} />
          <div style={{background: IC, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, borderLeft: `4px solid ${NBK}`}}><Ico n="DoorOpen" size={38} c="#fff" />Induction</div>
          <div style={{background: SC, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, borderLeft: `4px solid ${NBK}`}}><Ico n="RefreshCw" size={38} c="#fff" />Sensibilisation</div>
        </div>
        {ROWS4.map(([r, ic, a, b], k) => {
          const onI = t > aI(k), onS = t > aS(k);
          const scanI = prog(t, aI(k), aI(k) + 0.6), scanS = prog(t, aS(k), aS(k) + 0.6);
          return (
            <div key={r} style={{display: 'grid', gridTemplateColumns: '200px 1fr 1fr', height: 188, borderBottom: k < 3 ? `3px solid ${NBK}` : 'none'}}>
              <div style={{background: '#F1F3F7', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8}}><Ico n={ic} size={46} c={INK} /><span style={{...CAP, fontSize: 18, color: INK}}>{r}</span></div>
              {[[onI, scanI, a, IC], [onS, scanS, b, SC]].map(([on, sc0, txt, c], j) => (
                <div key={j} style={{position: 'relative', borderLeft: `3px solid ${NBK}`, display: 'flex', alignItems: 'center', gap: 14, padding: '0 20px', background: on ? `${c as string}0F` : '#fff', overflow: 'hidden'}}>
                  {(sc0 as number) > 0 && (sc0 as number) < 1 && <div style={{position: 'absolute', top: 0, bottom: 0, left: `${(sc0 as number) * 100 - 20}%`, width: '20%', background: `linear-gradient(90deg, transparent, ${c as string}55, transparent)`}} />}
                  {on && <div style={{width: 46, height: 46, borderRadius: 10, background: c as string, border: `3px solid ${NBK}`, color: '#fff', fontSize: 28, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: `scale(${Math.min(1, sp(t, j ? aS(k) + 0.3 : aI(k) + 0.3))})`}}>✓</div>}
                  <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, lineHeight: 1.1, opacity: on ? 1 : 0, clipPath: `inset(0 ${(1 - (sc0 as number)) * 100}% 0 0)`}}>{txt as string}</span>
                </div>
              ))}
            </div>
          );
        })}
      </Abs>
    </Out>
  );
};
const Final: React.FC = () => {
  const t = useT();
  return (
    <Out end={OUTRO_AT}>
      <Heads h={[[212.4, ['Bien commencer,', 'rester vigilant'], [0, 1]]]} />
      <Abs x={40} y={450} w={1000} h={900} style={{...STAGE, opacity: pop(t, 212.3)}}>
        <Ring3D imgs={RING_HSE} at={212.4} w={990} h={890} cw={545} ch={390} R={750} zr={420} persp={1560} speed={16} cy={0.4} />
        <div style={SCAN} />
        <Abs x={0} y={600} w={990} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22}}>
          {t > 214.6 && <SlamTag at={214.7} text="INDUCTION · BIEN COMMENCER" c={IC} rot={-3} size={38} ic="Flag" />}
          {t > 218.1 && <SlamTag at={218.2} text="SENSIBILISATION · RESTER VIGILANT" c={SC} rot={2} size={34} ic="Eye" />}
        </Abs>
      </Abs>
    </Out>
  );
};

/** Couverture : la cheffe de projet QHSE et son équipe au lever du soleil + titre « INDUCTION vs SENSIBILISATION HSE » en lettres-photos animées. */
const COVER_PHOTO = 'principes-gen/chef-projet.jpg';
const ICover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1000, overflow: 'hidden'}}><Img src={PH(COVER_PHOTO)} style={{width: 1080, height: 1000, objectFit: 'cover', objectPosition: '62% 35%', transform: `scale(${1.04 + t * 0.015})`, transformOrigin: '60% 30%'}} /></div>
      <div style={{position: 'absolute', left: 0, top: 640, width: 1080, height: 360, background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}D9 55%, ${PAPER} 100%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.18)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={830} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="INDUCTION" src={IMG.c1} size={150} ls={6} seed={2} /></Abs>
      <Abs x={0} y={995} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="VS" src={IMG.c2} size={74} ls={8} seed={3} /></Abs>
      <Abs x={0} y={1078} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="SENSIBILISATION" src={IMG.c2} size={100} ls={2} seed={5} /></Abs>
      <Abs x={0} y={1192} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="HSE" src={IMG.cover} size={170} ls={14} seed={8} /></Abs>
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
const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.2}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const rame = (at: number): Sfx[] => [{at, s: 'sfx/whoosh', v: 0.45}, {at: at + 0.2, s: 'riser', v: 0.25, dur: 0.9}, {at: at + 1.0, s: 'deep-hit', v: 0.35}];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at + 0.15, s: 'sfx/bell', v: 0.16})),
  ...searchCues(2.65, 13, 4.1, 4.45), ...[5.3, 6.3].map((at) => ({at, s: 'sfx/pop', v: 0.28})), {at: 9.32, s: 'sfx/ding', v: 0.3}, ...[14.32, 16.1, 18.1].map((at) => ({at, s: 'sfx/pop', v: 0.24})),
  {at: 23.1, s: 'soft-whoosh', v: 0.4, dur: 1.4}, {at: 26.4, s: 'sfx/swish', v: 0.3}, {at: 27.6, s: 'sfx/swish', v: 0.3}, ...[31.28, 32.4, 33.6].map((at) => ({at, s: 'sfx/pop', v: 0.24})), {at: 35.4, s: 'tampon', v: 0.32},
  {at: 38.5, s: 'sfx/whoosh', v: 0.35}, {at: 39.1, s: 'sfx/thud', v: 0.45}, {at: 39.12, s: 'tampon', v: 0.3}, ...[40.0, 42.4].map((at) => ({at, s: 'sfx/pop', v: 0.24})),
  {at: 45.0, s: 'page', v: 0.3}, ...[49.9, 52.6, 55.3, 58.2, 61.9].map((at) => ({at, s: 'sfx/bell', v: 0.18})),
  {at: 70.3, s: 'riser', v: 0.22, dur: 1.2}, ...[72.2, 73.3].map((at) => ({at, s: 'sfx/pop', v: 0.24})), ...[75.9, 76.3, 77.4].map((at) => ({at, s: 'sfx/swish', v: 0.22})),
  ...[82.0, 83.6, 85.2, 86.7].map((at) => ({at, s: 'sfx/pop', v: 0.26})), {at: 88.2, s: 'sfx/rise', v: 0.22, dur: 1},
  ...[96.8, 101.1, 103.1, 105.4, 109.8].map((at) => ({at, s: 'sfx/thud', v: 0.24})),
  ...[123.6, 130.4, 136.0].map((at) => ({at, s: 'soft-whoosh', v: 0.32, dur: 0.8})), {at: 124.6, s: 'sfx/pop', v: 0.24}, {at: 131.9, s: 'sfx/pop', v: 0.24},
  ...rame(136.7), ...rep(138.4, 14, 0.05, 'tick', 0.1), {at: 143.3, s: 'sfx/pop', v: 0.28}, {at: 144.4, s: 'sfx/pop', v: 0.28}, {at: 146.9, s: 'sfx/rise', v: 0.25, dur: 0.8}, {at: 149.3, s: 'validation', v: 0.26},
  ...[159.2, 160.3].map((at) => ({at, s: 'sfx/pop', v: 0.22})), ...[166.1, 167.1, 167.7, 168.5, 169.1].map((at) => ({at, s: 'sfx/click', v: 0.32})),
  ...rame(174.7), {at: 178.48, s: 'sfx/ding', v: 0.32}, {at: 180.4, s: 'tampon', v: 0.32}, ...[70, 190, 310, 430, 550, 670, 790].map((x) => ({at: 184.8 + (x / 860) * 3.2, s: 'sfx/ding', v: 0.18})), {at: 180.7, s: 'sfx/pop', v: 0.22}, {at: 188.0, s: 'sfx/pop', v: 0.22},
  ...[0, 1, 2, 3].flatMap((k) => [{at: 194.6 + k * 1.5, s: 'stylo', v: 0.16, dur: 0.6}, {at: 194.9 + k * 1.5, s: 'sfx/pop', v: 0.2}, {at: 204.2 + k * 1.6, s: 'stylo', v: 0.16, dur: 0.6}, {at: 204.5 + k * 1.6, s: 'sfx/pop', v: 0.2}] as Sfx[]),
  {at: 212.4, s: 'sfx/whoosh', v: 0.35}, {at: 214.7, s: 'tampon', v: 0.42}, {at: 218.2, s: 'tampon', v: 0.42},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];
const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SCN: [React.FC, number, number][] = [[Intro, 2.5, 19.3], [IndDef, 22.45, 37.0], [IndObj, 36.7, 44.9], [IndElem, 44.7, 65.5], [SensCont, 68.6, 79.4], [SensFormes, 79.1, 91.1], [SensObj, 90.8, 115.5], [DiffObj, 118.8, 136.9], [DiffPublic, 136.6, 150.7], [DiffFormat, 153.8, 174.9], [DiffFreq, 174.6, 191.8], [Resume, 194.9, 212.5], [Final, 212.2, OUTRO_AT]];
export const InductionSensibilisationMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    {SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    <Gate from={136.6} to={138.3}><RameWipe at={136.7} n={6} /></Gate>
    <Gate from={174.6} to={176.3}><RameWipe at={174.7} n={8} /></Gate>
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><ICover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-induction-sensibilisation-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u2 = [wn, Avatar, Ring3D, SlamTag, Arrow, slamK, CAP, STAGE, SCAN, RING_ISO, RING_HSE, Drum, Marked, Announce, MBadge, RailSteps, StairSteps, ZigSteps, QBubble, Grid15, RameWipe, Forklift, ICO, MC, ACR, lin, hexMix, cl, GyroFlash, Hot, Photo, Role, Pill2, IdBadge, ecg];

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn, Barred, Flap];
