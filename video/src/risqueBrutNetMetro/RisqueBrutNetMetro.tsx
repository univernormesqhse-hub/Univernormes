import React from 'react';
import {loadFont} from '@remotion/fonts';
import type {LucideIcon} from 'lucide-react';
import {Activity, ArrowRight, Package, Store as LStore, Rocket, Compass, Telescope, Snowflake, Shovel, Radiation, Crown, Hammer, KeyRound, Construction, Turtle, ScanEye, Car, Laptop, HeartPulse, Accessibility, Apple, Carrot, Wheat, Fish, Milk, Trash2, CircleHelp, TrainFront, Play, Music, CreditCard, Files, Trophy, Building2, Copy, Ruler, Tag, BrickWall, EyeOff, Shuffle, Swords, Droplet, Spline, Archive, Crosshair, Coffee, Unplug, Pencil, Drill, Smile, Palette, ListOrdered, Star, UtensilsCrossed, Truck, Award, BadgeCheck, Ban, Bell, BellRing, BookOpen, Briefcase, BriefcaseMedical, CalendarClock, CalendarDays, ChartColumn, ChartNoAxesCombined, Check as LCheck, CircleCheckBig, CircleX, ClipboardCheck, ClipboardList, Clock, DoorOpen, Droplets, Ear, Eye, Factory, Fan, FileText, FireExtinguisher, Flag, FlaskConical, FolderOpen, Footprints, Gauge, Gavel, Glasses, Globe, GraduationCap, Hand, HandHeart, HardHat, IdCard, Image as ImageIcon, Infinity as InfinityIcon, TrendingUp, TrendingDown, Dumbbell, CalendarSync, Cog, MessageCircle, Send, Phone, MousePointerClick, FileCheck, Stamp as StampIcon, Mic, History as HistoryIcon, Timer, RotateCcw, Brain, Hourglass, Repeat2, Sparkles, Calendar, Quote, Signpost, Heart, House, Video, Shield, Flame, Landmark, Scissors, Handshake, Thermometer, ChartGantt, CloudSun, ScanSearch, Unlink, Layers, Leaf, Lightbulb, Link, Navigation, ListChecks, Lock, LockOpen, Mail, MapPin, Megaphone, MessageCircleOff, MessageSquareText, Network, Newspaper, OctagonAlert, PenLine, Power, Presentation, Puzzle, Recycle, RefreshCw, Repeat, Route, Scale, ScrollText, Search, Settings2, ShieldAlert, ShieldCheck, Siren, Split, Sprout, Target, ThumbsUp, TriangleAlert, User, UserCheck, UserPlus, Users, VolumeX, Workflow, Wrench, Zap} from 'lucide-react';
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
 * « Risque brut, moyens de maîtrise, risque net » (voix d'origine, 6 min 53, refonte d'un ancien montage) — capsule
 * « condensé de toutes les techniques + effet wahou + ultra premium » en métro, encadrée sur ses quatre bords par des
 * bandes de marquage au sol jaune / noir. Tube de verre à sept guichets (introduction → comprendre le risque brut →
 * les moyens de maîtrise → le risque net expliqué → conserver l'analyse brute → gérer au quotidien → conclusion),
 * capsule qui file d'un guichet à l'autre, gyrophare TimeWarp, deux barres de recherche (« risque inhérent »,
 * « risque zéro »), deux carrousels 3D d'images du dépôt (sécurité incendie, terrain). Couverture : orbite 3D des
 * notions + titre « RISQUE BRUT / RISQUE NET » en lettres-photos animées. Seuls les chiffres cités par la voix sont
 * affichés (100 expatriés, trois ordinateurs, trois raisons, numéros de parties prononcés).
 * Scènes QHSE : particules « RISQUE », cadenas et clé de la survie puis bascule de perspective, face-à-face incendie /
 * erreur de frappe sur la fiche de paie avec jauges de gravité identiques puis « ≠ », dictionnaire du vocabulaire des
 * risques qui se brouille, flamme et feuille écrasées sur le même plan, programme en cinq stations, grand titre
 * « RISQUE BRUT » en pierre fissurée, photo sans protection et protections barrées sous l'orage, fiche de paie
 * criblée d'erreurs, jauge du risque brut qui explose sur le globe des expatriés et ses lois croisées, usine chimique
 * aux losanges inflammables et thermomètre au maximum face au petit bureau, mur de boucliers hexagonaux autour de
 * l'entreprise et chaos qui se range, leviers probabilité / gravité sur la matrice 5 × 5, barrière qui tombe sur le
 * virement suspect « BLOQUÉ », équation brut − maîtrise = net en barres, chute des deux risques vers « faible » et
 * tableau de bord apaisé, mâchoires du piège qui claquent, jumelles brut / net, trottoir ou falaise avec plongée
 * le long de la paroi, radiographie des étiquettes « faible », ciseaux dans le budget et bandeau « ATTENTION »,
 * bouclier sacralisé sur son socle doré et pense-bête, fine ligne entre l'activité et le désastre qui se fissure
 * sous le laxisme, réunion du langage commun avec dialogue de sourds puis mots « brut » et « net » posés sur la
 * table, case cochée barrée et boucle continue à comète, bouclier qu'on entretient sous de nouvelles menaces,
 * montagnes de fichiers englouties puis logiciel générique (historique, contrôles, niveau de protection), chemin
 * balisé entre risques identifiés et cadenassés, tableau de bord vert au-dessus du gouffre et du filet.
 * Packs de 25 techniques globales (partRb3) et 15 effets (partRb4) recalés sur la voix.
 * Sous-titres NeoCaptions sur la voix d'origine, sans musique.
 */
const IMG = {
  cover: 'evalrisques-gen/zone-rouge.jpg',
  c1: 'metroiso-gen/terrain.jpg',
  c2: 'evalrisques-gen/couverture.jpg',
  search1: 'risquebrut/danger-immediat.jpg',
  naked: 'risquebrut/technicien-sans-protection.jpg',
  usine: 'hazid-gen/chantier-chimique.jpg',
  bureau: 'evacuation-gen/serre-file.jpg',
  zone: 'evalrisques-gen/zone-rouge.jpg',
  alarme: 'evacuation-gen/alarme.jpg',
  extinct: 'epiepc/extincteur.jpg',
  guide: 'evacuation-gen/guide-file.jpg',
  rassemb: 'evacuation-gen/rassemblement.jpg',
  extinct2: 'permisfeu/extincteur.jpg',
  respevac: 'evacuation-gen/responsable.jpg',
  serre: 'evacuation-gen/serre-file.jpg',
  bilan: 'evacuation-gen/bilan.jpg',
  terrain: 'metroiso-gen/terrain.jpg',
  resp: 'integration/responsable.jpg',
  tableau: 'audit13-gen/tableau-bord.jpg',
  evalcov: 'evalrisques-gen/couverture.jpg',
  conforme: 'risquebrut/etat-conforme.jpg',
  analyste: 'iso26/analyste-kpi.jpg',
  techhse: 'induction/technicien-hse.jpg',
  gemba: 'kaizen-gen/gemba.jpg',
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
const OUTRO_AT = 413.6;
export const RISQUE_BRUT_NET_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '!', title: 'La gestion des risques', s: 'Brut, maîtrise, net', c: NAVY, g: 'introduction', k: 'none', lab: 'INTRODUCTION'},
  {at: 54.5, n: '1', title: 'Comprendre le risque brut', s: "La menace à l'état pur", c: '#D7263D', g: 'risque brut', k: 'gyro', lab: 'PARTIE 1'},
  {at: 129.6, n: '2', title: 'Les moyens de maîtrise', s: 'Les boucliers', c: '#1F5BD8', g: 'maîtrise', k: 'gyro', lab: 'PARTIE 2'},
  {at: 175.3, n: '3', title: 'Le risque net expliqué', s: 'Le risque résiduel', c: '#2FA84F', g: 'risque net', k: 'gyro', lab: 'PARTIE 3'},
  {at: 234.1, n: '4', title: "Conserver l'analyse brute", s: 'Trois raisons', c: '#F28C28', g: 'conserver', k: 'gyro', lab: 'PARTIE 4'},
  {at: 324.7, n: '∞', title: 'Gérer au quotidien', s: 'Une boucle continue', c: '#14A3A3', g: 'au quotidien', k: 'gyro', lab: 'DERNIÈRE PARTIE'},
  {at: 370.7, n: '✓', title: 'Pour conclure', s: "Le risque zéro n'existe pas", c: '#8E5BD8', g: 'conclusion', k: 'gyro', lab: 'CONCLUSION'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 413.3;
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
  {n: 1, l: 'Le risque brut', s: 'Brut', at: 58.14},
  {n: 2, l: 'Le risque inhérent', s: 'Inhérent', at: 63.18},
  {n: 3, l: 'Le contexte change tout', s: 'Contexte', at: 79.2},
  {n: 4, l: "La nature de l'activité", s: 'Activité', at: 126.91},
  {n: 5, l: 'Les boucliers', s: 'Boucliers', at: 140.26},
  {n: 6, l: "L'armure de l'entreprise", s: 'Armure', at: 153.3},
  {n: 7, l: 'Le risque résiduel', s: 'Résiduel', at: 182.27},
  {n: 8, l: 'Le piège du net', s: 'Piège', at: 221.72},
  {n: 9, l: 'Trottoir ou falaise', s: 'Falaise', at: 253.55},
  {n: 10, l: 'Un langage commun', s: 'Langage', at: 303.33},
  {n: 11, l: 'Une boucle continue', s: 'Boucle', at: 334.75},
  {n: 12, l: 'Le risque zéro, un mythe', s: 'Zéro', at: 378.28},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE RISQUES · STATION {r.n} / 12</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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
const LUC: Record<string, LucideIcon> = {Heart, House, Video, Shield, Flame, Landmark, Scissors, Handshake, Thermometer, ChartGantt, CloudSun, ScanSearch, Unlink, Quote, Signpost, TrendingUp, TrendingDown, Dumbbell, CalendarSync, Cog, MessageCircle, Send, Phone, MousePointerClick, FileCheck, Stamp: StampIcon, Mic, History: HistoryIcon, Timer, RotateCcw, Brain, Hourglass, Repeat2, Sparkles, Calendar, DoorOpen, UserPlus, IdCard, Route, BriefcaseMedical, Newspaper, Presentation, Image: ImageIcon, Mail, Clock, Eye, Bell, BellRing, Sprout, ThumbsUp, HandHeart, Infinity: InfinityIcon, Flag, MapPin, Link, Puzzle, Split, User, Droplets, Lightbulb, Navigation, Activity, Ear, Siren, MessageSquareText, MessageCircleOff, VolumeX, Power, OctagonAlert, Fan, Megaphone, FlaskConical, LockOpen, Ban, Repeat, Zap, UserCheck, Network, BookOpen, Workflow, Search, FileText, CircleX, ChartColumn, FolderOpen, HardHat, TriangleAlert, Target, ClipboardList, ScrollText, Lock, ShieldAlert, FireExtinguisher, Wrench, Leaf, Factory, Scale, Recycle, Gavel, ShieldCheck, Globe, Layers, BadgeCheck, CalendarDays, PenLine, Gauge, RefreshCw, CalendarClock, ListChecks, Settings2, Award, GraduationCap, Briefcase, Users, ClipboardCheck, ChartNoAxesCombined, Glasses, Hand, Footprints, Check: LCheck, CircleCheckBig, Package, Store: LStore, Rocket, Compass, Telescope, Snowflake, Shovel, Radiation, Crown, Hammer, KeyRound, Construction, Turtle, ScanEye, Car, Laptop, HeartPulse, Accessibility, Apple, Carrot, Wheat, Fish, Milk, Trash2, CircleHelp, TrainFront, Play, Music, CreditCard, Files, Trophy, Building2, Copy, Ruler, Tag, BrickWall, EyeOff, Shuffle, Swords, Droplet, Spline, Archive, Crosshair, Coffee, Unplug, Pencil, Drill, Smile, Palette, ListOrdered, Star, UtensilsCrossed, Truck,
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
/* ═════════════ Palette et données : risque brut, moyens de maîtrise, risque net ═════════════ */
const RbN = '#0B2E6B', RbR = '#D7263D', RbO = '#F28C28', RbG = '#2FA84F', RbB = '#1F5BD8', RbT = '#14A3A3', RbY = '#F6C744', RbV = '#8E5BD8', RbP = '#D6457A', RbK = '#1B1B1B', RbSl = '#5B6577', RbGold = '#C99A06';
/* couleurs de cycle pour les effets globaux */
const RB_C = [RbR, RbB, RbG, RbO, RbT, RbV, RbP, RbGold, RbN];
/* échelle de criticité de la matrice, du vert au rouge */
const RB_HEAT = ['#2FA84F', '#7DBB3A', '#C6CB2E', '#F6C744', '#F5A623', '#F28C28', '#E8592E', '#D7263D', '#B0122B'];
const RB_PTS_RAW = '792276183258801198111246408192312240774288276276339246267174681282510180564204450264090312552204201306684288117186606228126204825174540216345234648288849306252288396204507282435234204312276264102192342300723198198192705282783294579210849186099282801270537294303234186216711222675282252312558336447222780312159210480300237282360240834228387186696288114240165294183222444228450252558228813246321306612216138180504288324192771306639282633186144180093186441258276312258228243246399186183246804204252204798252108204417258810312684276267198495210558288381282369282801210315234189198861246567210822300522204762216645222588336399294177210111174615258204228270204447198336240621270768180339306399270618228567318723234777210783198819186309294384264198228342216156204864180615282807246717234531342300228627210822288642192381174768276474288120288396252543318102216630276180204309198255258804228789282771258870204315294702180087198633258711234561246168264825294702192105282246180096264639294369174333174129222567270501318360228126240501186573342843246351306330180738180624192414252447258702240186288402192132300474180699258378240327246762288540192279210732276459234651294558264726216702216531210327186402252564324246192816252102252507198774240633270474204393282783234720288804300714204552348348252444276117258189282474192249174723210786228309282834240828252144252252240519318117210270288534192459270090264702228099198699246642204858252579234111198714264126228522192114228354240531330189270828228804180105294696300768264102288468180849246723282273258621210855186705174702204873282813306195186834204153186369234582216123270576276699174849294369294105258870312099270531306852288120276249222369306273246273210786192534204477234555222243258510324189210258204534324441222366240438216807174840180774264708276087186357294459186510288606252822228720240798228609174705198366252606192798312858204552252165306468204312204774276153246864300174264714216834252798204186312339222111186798288861306096276714276477198321282093294738204816240348300699306387210099186486216459282531294810204243210096180669282201294525318513330207234708288129282189294357234378252612192771282132180495318459246675306450204807294351246846204711258582228819234693306312192660300528288267234777282483306639174561222822192765294858192582336102300537318129258528324735246459258639186537330105270390180195246630216315210777174351198732252117282768204375246258300570312837198474240513318549246087258396180558240774252495282585234150264132216537282864192681294732240570288345294348204786240768288129234804240648228087234480276234216561330330216102264552300870192303294702252174288198264144192318300846228498288522312555186711186870300564252324300255282528312579330249282456252624288849234540204318240639258630180261282342240516336852300387198234288171270330240264228306216276192555246549294111294687282555282864240543186858312546240498204243198801258372192165282726192348180246312441246156288564216336300768312207246489186351186348288543306186252678312273306504180393258096288609234774228156180321294525294336228354204546216435258699186735222468228540312189258618204624240606204633234720192510204540264711210618264762204567342108216606240366204195258768240363186615210618180264300720276396192633198648204567330360192783174774192177270630204813294465246333306447270843294717246378300270252549330663294087270330204522324186204120192453282186180792240399282546300237246855198543210486300411186108300393306495198327294318288114192270264393234108192852228099210573222468252669294159294162276843234861174462300708192852240249186627246243234570204450288765210729198867306108252510192234192234312708240552288858240714300264180792204831282357258804312534276201246198204432252126312207306279270825246366192519330873306477294174300645186411282609198795306360180513198591330861282699222243186849174279282363258438228768252537198798192384192210300192276795234732192621234336180726288558348525342159186339198828204144276237186168276198300270276762276438264792192336252318228582324198216765282111282516324195222135198774216855306369186417270717210471234828312252228093210627198831246456216801186402276795222162252459222363282864252186192789198780180273234840192390276867198504300090240468264168240243306624264405198831294786288522288258288180252192216507294105198528276252300279306234300567222564192549234846240324216156252825282192204192252336216525306279294090300177282105306153258798240504192642288375270087282705306375234855174456276615270120264174276867258390288477306537270342228252180126288354252255222318276780276387234501306645258672300303210261270843198474264270312267222630252264276543198447210357174645294270216135246432228579258768216252276132204141174732264552336117198477222570336612264324288708228159246819198147246696276825234837186090216549306363198249294645282723258873186477282165258537222333294690288342204726228279234816192363234261246627258492180180180543222795174762240120204531282804252237294336288330300444204813174672288549258720180522300255198651270264312558204276288237270735210585330513186117270798300090204462240705234636216627282867246663282279198375198483210345210507306621282726204309234477270642240318216249270126252825198456192720252573330132228381246249234738216519174795186387270366228777246468288276228186276168252240300864288735186621198507186561342711246135174855258117222468216699270789186723270345198351222609270840204255174354288732180237210807186213234849198171246453294543330771270618276387282420264441282612240402180177246543270108312093222654300441234612204726276822180525186120228150252648276312216858300342312519282162180093270372240273186237174387174777294762312114180573258210204708180615246537210468276402204324312198252261174393246330312810180696240531198447234627294321198189246660276210240144204855282141186534288534180120216567258099294096300171198378276726180204192357282789258399198129270786252108180720228645198651258819282492192798180612276555258123186258264141246243174642300180288639234792312855294612228255234462228528300804276090228639198648240345282501174657282168216729210240216849282543234840252660288111234795198480204180228450276180312870180714240633174867234129210447282234276345174339234831306807198372180090276588324645234651306615174261294117294837294147174369246270300540252555234648252552264246252147198504324198240345186516312378192774312822204516300390264573282837258177234255294570216546228249246408276189186576336333210309306873294708216405246339258234240765186393174579342396240438252696216765222540240330252582264387246216312153174621222813234378228387294243282699234852192693282240252549198636276624180471186345222477186162288474276471306495186453222240312552216279186348312534312648300405258405186555294150204711294711270303198174216786180129246258192324240636252828180735258465186861294315198195234195198465210561270462192801174792228261198375306396288171210732228087306372204264252792252462288102276618252474228609246360288096204132288624228834180780192558252180264633210441210711198492276783306786312858288549186852252108228210216561198267246123198093282192228618288240228816228567246648216306204813186441270525282666312720300162264114300552276183186111258417282513282864204816288699210630228384252189222171186762252846180546288213210555198729282531174315222177306390192570264639306861258372252345306330228828288180240630240789222840240789210735174576312627174489282207198816300822240399258414288633222837306405282363246558276237306258216465198183210381186381270489294465270243270771222624276375282807258516288798216348228468240540180456204300300435222336204540288087246096252468300183306105210765258771198129294846312159282675294549282246276330276099174567198366180768228096192555342105174693294195282120240684300636192408288327234171306132312714252729234138204609258666300123282813282';
const RB_PTS: [number, number][] = Array.from({length: RB_PTS_RAW.length / 6}, (_, i) => [parseInt(RB_PTS_RAW.slice(i * 6, i * 6 + 3), 10), parseInt(RB_PTS_RAW.slice(i * 6 + 3, i * 6 + 6), 10)]);
/* ═════════════ Cadre de la vidéo : bandes de marquage au sol jaune / noir sur les quatre bords, rayures continues dans les angles ═════════════ */
const RB_BORDER = 26;
const RbHazardFrame: React.FC = () => {
  const B = RB_BORDER;
  const stripes = `repeating-linear-gradient(45deg, ${RbY} 0px, ${RbY} 26px, #141414 26px, #141414 52px)`;
  const side = (x: number, y: number, w: number, h: number) => <div style={{position: 'absolute', left: x, top: y, width: w, height: h, backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0) 40%, rgba(0,0,0,0.12)), ${stripes}`, backgroundSize: '1080px 1920px', backgroundPosition: `${-x}px ${-y}px`}} />;
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {side(0, 0, 1080, B)}
      {side(0, 1920 - B, 1080, B)}
      {side(0, B, B, 1920 - 2 * B)}
      {side(1080 - B, B, B, 1920 - 2 * B)}
      <div style={{position: 'absolute', left: B, top: B, width: 1080 - 2 * B, height: 1920 - 2 * B, boxSizing: 'border-box', border: '3px solid #141414', boxShadow: 'inset 0 0 18px rgba(0,0,0,0.25)'}} />
    </AbsoluteFill>
  );
};

const RbChip: React.FC<{x: number; y: number; w?: number; at: number; l: string; c?: string; ic?: string; fs?: number; fill?: boolean; out?: number}> = ({x, y, w = 440, at, l, c = RbK, ic, fs = 32, fill, out}) => {
  const t = useT();
  const q = (t > at ? Math.min(1, sp(t, at, 9, 12)) : 0) * (out ? 1 - prog(t, out - 0.2, out, easeIn) : 1);
  const fg = fill ? (c === RbY ? NBK : '#fff') : INK;
  return <div style={{position: 'absolute', left: x - w / 2, top: Math.max(448, y), width: w, display: 'flex', justifyContent: 'center', transform: `scale(${q})`, zIndex: 6}}><div style={{...nb(fill ? c : '#fff', 6), borderColor: NBK, boxShadow: `6px 6px 0 ${fill ? NBK : c}`, padding: '8px 18px', display: 'flex', alignItems: 'center', gap: 12, fontFamily: sansFont, fontWeight: 900, fontSize: fs, color: fg, textAlign: 'center', lineHeight: 1.1, whiteSpace: 'nowrap'}}>{ic && <Ico n={ic} size={fs + 8} c={fill ? fg : c} />}{l}</div></div>;
};
/* Pastille ronde à icône, qui apparaît à « at » et peut être barrée à « cross » */
const RbDisc: React.FC<{x: number; y: number; ic: string; c: string; at: number; cross?: number; size?: number; label?: string}> = ({x, y, ic, c, at, cross, size = 130, label}) => {
  const t = useT();
  const q = t > at ? Math.min(1, sp(t, at, 9, 10)) : 0;
  const xq = cross !== undefined ? prog(t, cross, cross + 0.25, easeOut) : 0;
  return <div style={{position: 'absolute', left: x - size / 2, top: y - size / 2, width: size, transform: `scale(${q})`, zIndex: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
    <div style={{position: 'relative', width: size, height: size, borderRadius: size / 2, background: xq > 0.5 ? '#DDE2EA' : c, border: `6px solid ${NBK}`, boxShadow: `5px 5px 0 ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box'}}><Ico n={ic} size={size * 0.52} c={xq > 0.5 ? '#9AA7B8' : '#fff'} />{xq > 0 && <svg width={size} height={size} style={{position: 'absolute', left: -6, top: -6}}><line x1={size * 0.15} y1={size * 0.15} x2={size * 0.15 + size * 0.7 * xq} y2={size * 0.15 + size * 0.7 * xq} stroke={RbR} strokeWidth={14} strokeLinecap="round" /><line x1={size * 0.85} y1={size * 0.15} x2={size * 0.85 - size * 0.7 * xq} y2={size * 0.15 + size * 0.7 * xq} stroke={RbR} strokeWidth={14} strokeLinecap="round" /></svg>}</div>
    {label && <div style={{...nb('#fff', 4), borderColor: NBK, padding: '2px 10px', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK, whiteSpace: 'nowrap'}}>{label}</div>}
  </div>;
};
const RbPerson: React.FC<{x: number; y: number; c: string; s?: number; skin?: string; helmet?: string}> = ({x, y, c, s = 1, skin = '#8B5E3C', helmet}) => <g transform={`translate(${x} ${y}) scale(${s})`}><circle cy={-58} r={26} fill={skin} stroke={NBK} strokeWidth={5} />{helmet && <path d="M -32 -64 Q -32 -96 0 -96 Q 32 -96 32 -64 L 40 -62 L -40 -62 Z" fill={helmet} stroke={NBK} strokeWidth={4} />}<path d="M -40 46 Q -40 -24 0 -24 Q 40 -24 40 46 Z" fill={c} stroke={NBK} strokeWidth={5} /></g>;
const RBSK = ['#8B5E3C', '#6B4A2B', '#A87652', '#5A3A22', '#7A5233'];
/* Flamme animée (SVG) */
const RbFlame: React.FC<{x: number; y: number; s: number; t: number; seed?: number}> = ({x, y, s, t, seed = 0}) => { if (s <= 0.01) return null; const f = (k: number) => Math.sin(t * (9 + k) + seed + k) * 0.08; return <g transform={`translate(${x} ${y}) scale(${s})`}><path d={`M 0 0 C -70 -10 -80 -90 -30 -150 C -20 -110 10 -120 0 -${190 + 30 * f(1) * 10} C 50 -140 90 -90 70 -30 C 60 0 30 5 0 0 Z`} fill={RbR} stroke={NBK} strokeWidth={6} transform={`scale(${1 + f(0)} ${1 + f(2)})`} /><path d={`M 0 -6 C -40 -12 -40 -70 -10 -100 C 0 -70 30 -80 20 -${120 + 20 * f(3) * 10} C 50 -80 50 -30 30 -10 C 20 -2 10 -2 0 -6 Z`} fill={RbO} transform={`scale(${1 + f(4)} ${1 + f(1)})`} /><path d="M 0 -10 C -18 -14 -18 -45 0 -62 C 12 -45 22 -30 12 -14 C 8 -10 4 -9 0 -10 Z" fill={RbY} /></g>; };
/* Jauge demi-cercle (0 → 1) */
const RbGauge: React.FC<{x: number; y: number; r: number; v: number; label?: string}> = ({x, y, r, v, label}) => { const a = Math.PI * (1 - v); return <g transform={`translate(${x} ${y})`}>{RB_HEAT.map((c, i) => { const a0 = Math.PI * (1 - i / 9), a1 = Math.PI * (1 - (i + 1) / 9); return <path key={i} d={`M ${Math.cos(a0) * r} ${-Math.sin(a0) * r} A ${r} ${r} 0 0 1 ${Math.cos(a1) * r} ${-Math.sin(a1) * r}`} fill="none" stroke={c} strokeWidth={r * 0.22} />; })}<line x1={0} y1={0} x2={Math.cos(a) * r * 0.82} y2={-Math.sin(a) * r * 0.82} stroke={NBK} strokeWidth={r * 0.07} strokeLinecap="round" /><circle r={r * 0.1} fill={NBK} />{label && <text y={r * 0.42} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={r * 0.2} fill={INK}>{label}</text>}</g>; };

/* ═════════════ 1. Particules qui forment « RISQUE », dégradé brut rouge → orange → jaune ═════════════ */
const RbParticles: React.FC<{cy: number; at: number; form: number; dur?: number}> = ({cy, at, form, dur = 0.8}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const ox = 60, oy = cy - 261;
  const done = form + dur + 0.6;
  const wave = t > done ? ((t - done) * 0.5) % 1.4 : -1;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, at, 0.2)}}>
      {RB_PTS.map(([px, py], i) => { const tx = ox + px, ty = oy + py; const a0 = random(`ra${i}`) * Math.PI * 2, r0 = 600 + random(`rr${i}`) * 450; const sx = 540 + Math.cos(a0) * r0, sy = cy + Math.sin(a0) * r0 * 1.3; const d = random(`rd${i}`) * 0.4; const q = prog(t, form + d, form + d + dur, easeInOut); const dx = sx - tx, dy = sy - ty; const ang = (1 - q) * 2.6; const rx = dx * Math.cos(ang) - dy * Math.sin(ang), ry = dx * Math.sin(ang) + dy * Math.cos(ang); const x = tx + rx * (1 - q), y = ty + ry * (1 - q); const near = wave >= 0 ? Math.max(0, 1 - Math.abs(px / 960 - wave) * 6) : 0; const c = hexMix(RbR, RbY, px / 960); return <circle key={i} cx={x} cy={y - near * 10} r={4.6 + near * 2.2 + (q >= 1 ? Math.sin(k * 4 + i) * 0.5 : 0) + (1 - q) * 1.4} fill={near > 0.5 ? '#fff' : c} stroke={near > 0.5 ? c : undefined} strokeWidth={2} opacity={0.35 + 0.65 * Math.max(q, 0.2)} />; })}
    </svg>
  );
};

/* ═════════════ 2. La clé de la survie : la clé entre dans le cadenas et tourne ; puis la perspective bascule ═════════════ */
const RbKey: React.FC<{cy: number; at: number; key0: number; turn: number; persp: number}> = ({cy, at, key0, turn, persp}) => {
  const t = useT();
  const kq = prog(t, key0 - 0.35, key0 + 0.1, easeOut);
  const tq = prog(t, turn, turn + 0.35, easeInOut);
  const open = prog(t, turn + 0.3, turn + 0.6, easeOut);
  const pq = prog(t, persp - 0.2, persp + 0.4, easeInOut);
  const vp = lerp(160, 920, prog(t, persp, persp + 1.4, easeInOut));
  const lx = 540, ly = cy - 120;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 3, opacity: pq}}>
        <defs><clipPath id="rbPersp"><rect x={40} y={460} width={1000} height={900} /></clipPath></defs>
        <g clipPath="url(#rbPersp)">{Array.from({length: 15}, (_, i) => <line key={i} x1={vp} y1={cy - 120} x2={-600 + i * 160} y2={1400} stroke={RbB} strokeWidth={3} opacity={0.5} />)}{Array.from({length: 8}, (_, i) => { const y = cy - 120 + Math.pow((i + 1) / 8, 2) * 520; return <line key={`h${i}`} x1={40} y1={y} x2={1040} y2={y} stroke={RbB} strokeWidth={3} opacity={0.4} />; })}<line x1={40} y1={cy - 120} x2={1040} y2={cy - 120} stroke={RbO} strokeWidth={5} /></g>
      </svg>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 4, opacity: pop(t, at)}}>
        <g transform={`translate(${lx} ${ly}) scale(${1 - 0.45 * pq}) translate(${pq * 0} ${pq * -260})`}>
          <path d={`M -90 -40 L -90 -140 A 90 90 0 0 1 90 -140 L 90 ${-40 - open * 70}`} fill="none" stroke={RbSl} strokeWidth={34} strokeLinecap="round" transform={`translate(0 ${-open * 60})`} />
          <rect x={-150} y={-60} width={300} height={260} rx={36} fill={RbGold} stroke={NBK} strokeWidth={9} />
          <circle cy={50} r={34} fill={NBK} /><rect x={-12} y={60} width={24} height={70} rx={8} fill={NBK} />
          {kq > 0 && <g transform={`translate(${lerp(-520, -10, kq)} 60) rotate(${tq * 90})`}><circle cx={-120} r={46} fill="none" stroke={RbN} strokeWidth={18} /><rect x={-80} y={-11} width={110} height={22} rx={6} fill={RbN} /><rect x={0} y={8} width={14} height={26} fill={RbN} /><rect x={20} y={8} width={12} height={18} fill={RbN} /></g>}
          {open > 0 && Array.from({length: 10}, (_, i) => { const a = (i / 10) * Math.PI * 2; const r = 200 + open * 70; return <line key={i} x1={Math.cos(a) * 190} y1={50 + Math.sin(a) * 190} x2={Math.cos(a) * r} y2={50 + Math.sin(a) * r} stroke={RbY} strokeWidth={10} strokeLinecap="round" opacity={1 - prog(t, turn + 0.6, turn + 1.2)} />; })}
        </g>
      </svg>
      {pq > 0 && <div style={{position: 'absolute', left: 0, top: cy + 120, width: 1080, display: 'flex', justifyContent: 'center', zIndex: 6, transform: `scale(${pq})`}}><div style={{width: 150, height: 150, borderRadius: 75, background: '#fff', border: `7px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `6px 6px 0 ${RbB}`, transform: `translateX(${vp - 540}px)`}}><Ico n="Eye" size={86} c={RbB} /></div></div>}
      <RbChip x={540} y={cy + 330} w={500} at={turn} out={persp - 0.05} l="La clé de la survie" c={RbGold} ic="KeyRound" fs={32} fill />
      <RbChip x={540} y={cy + 330} w={560} at={persp + 0.1} l="Changement de perspective" c={RbB} ic="Eye" fs={30} fill />
    </>
  );
};

/* ═════════════ 3. Un incendie ou une erreur de frappe : deux panneaux face à face, même gravité imposée, absurde ═════════════ */
const RbVersus: React.FC<{cy: number; at: number; fire: number; ravage: number; typo: number; paie: number; same: number; absurd: number; destroy: number; puzzle: number}> = ({cy, at, fire, ravage, typo, paie, same, absurd, destroy, puzzle}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const PW = 450, PH = 620, top = cy - 380;
  const lq = Math.min(1, sp(t, at, 8, 12)), rq = Math.min(1, sp(t, at + 0.15, 8, 12));
  const fq = prog(t, fire, ravage + 0.5, easeOut);
  const dq = prog(t, destroy, destroy + 0.7, easeIn);
  const tq = t > typo ? Math.min(1, sp(t, typo, 9, 11)) : 0;
  const sq = t > same ? Math.min(1, sp(t, same, 8, 10)) : 0;
  const ab = t > absurd ? Math.min(1, sp(t, absurd, 10, 9)) : 0;
  const pz = t > puzzle ? Math.min(1, sp(t, puzzle, 9, 10)) : 0;
  return (
    <>
      <div style={{position: 'absolute', left: 60, top, width: PW, height: PH, ...nb('#FFF4EE', 16), borderColor: NBK, boxShadow: `8px 8px 0 ${RbR}`, overflow: 'hidden', zIndex: 4, transform: `translateX(${(1 - lq) * -500}px)`}}>
        <svg width={PW} height={PH}>
          <rect x={0} y={PH - 70} width={PW} height={70} fill="#C9B9A8" />
          <g transform={`translate(225 ${PH - 70}) rotate(${dq * 8}) translate(-225 ${-(PH - 70)})`}>
            <rect x={90} y={PH - 70 - lerp(330, 150, dq)} width={270} height={lerp(330, 150, dq)} fill="#DDE6F2" stroke={NBK} strokeWidth={7} />
            {Array.from({length: 6}, (_, m) => <rect key={m} x={115 + (m % 3) * 82} y={PH - 70 - lerp(330, 150, dq) + 30 + Math.floor(m / 3) * 90} width={56} height={56} rx={6} fill={fq > 0.2 ? RbO : '#9AA7B8'} stroke={NBK} strokeWidth={4} opacity={1 - dq} />)}
            <path d={`M 70 ${PH - 70 - lerp(330, 150, dq)} L 225 ${PH - 70 - lerp(420, 190, dq)} L 380 ${PH - 70 - lerp(330, 150, dq)} Z`} fill={RbN} stroke={NBK} strokeWidth={7} transform={`translate(${dq * 40} ${dq * 60}) rotate(${dq * 25} 225 ${PH - 200})`} />
          </g>
          <RbFlame x={150} y={PH - 70} s={fq * 0.9} t={t} />
          <RbFlame x={300} y={PH - 70} s={fq * 1.15} t={t} seed={2} />
          <RbFlame x={225} y={PH - 160} s={fq * 0.7} t={t} seed={4} />
          {dq > 0 && Array.from({length: 8}, (_, m) => <circle key={m} cx={120 + m * 30 + Math.sin(k + m) * 10} cy={PH - 200 - ((k * 120 + m * 40) % 300)} r={30 + m * 3} fill="#5A6170" opacity={0.35 * dq} />)}
        </svg>
        <div style={{position: 'absolute', left: 0, top: 18, width: PW, display: 'flex', justifyContent: 'center'}}><div style={{...nb(RbR, 8), borderColor: NBK, padding: '6px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: '#fff', display: 'flex', alignItems: 'center', gap: 8, transform: `scale(${fq > 0 ? 1 : 0})`}}><Ico n="Flame" size={34} c="#fff" />Incendie</div></div>
      </div>
      <div style={{position: 'absolute', left: 570, top, width: PW, height: PH, ...nb('#F4F7FF', 16), borderColor: NBK, boxShadow: `8px 8px 0 ${RbB}`, overflow: 'hidden', zIndex: 4, transform: `translateX(${(1 - rq) * 500}px)`}}>
        <div style={{position: 'absolute', left: 60, top: 110, width: 330, height: 400, ...nb('#fff', 10), borderColor: NBK, padding: 22, boxSizing: 'border-box', transform: `rotate(${-3 + Math.sin(k) * 1}deg)`}}>
          <div style={{height: 40, borderRadius: 6, background: RbB, display: 'flex', alignItems: 'center', paddingLeft: 12, fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: '#fff'}}>FICHE DE PAIE</div>
          {Array.from({length: 7}, (_, m) => <div key={m} style={{marginTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><div style={{width: [150, 120, 170, 110, 140, 160, 100][m], height: 12, borderRadius: 6, background: '#C6CDD8'}} /><div style={{width: 50, height: 12, borderRadius: 6, background: m === 4 && tq > 0 ? RbR : '#C6CDD8', boxShadow: m === 4 && tq > 0 ? `0 0 0 ${6 * tq}px rgba(215,38,61,0.25)` : undefined}} /></div>)}
          {tq > 0 && <div style={{position: 'absolute', right: 6, top: 240, transform: `scale(${tq}) rotate(-8deg)`, fontFamily: handFont, fontSize: 46, color: RbR}}>oups !</div>}
        </div>
        <div style={{position: 'absolute', left: 0, top: 18, width: PW, display: 'flex', justifyContent: 'center'}}><div style={{...nb(RbB, 8), borderColor: NBK, padding: '6px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff', display: 'flex', alignItems: 'center', gap: 8, transform: `scale(${tq})`}}><Ico n="PenLine" size={32} c="#fff" />Erreur de frappe</div></div>
        {pz > 0 && <div style={{position: 'absolute', left: PW - 150, top: PH - 150, transform: `scale(${pz}) rotate(${(1 - pz) * 90}deg)`}}><div style={{width: 110, height: 110, borderRadius: 22, background: RbY, border: `6px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="Puzzle" size={64} c={NBK} /></div></div>}
      </div>
      {sq > 0 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 6}}>
        <RbGauge x={285} y={top + PH + 200} r={120 * sq} v={0.92} />
        <RbGauge x={795} y={top + PH + 200} r={120 * sq} v={0.92} />
      </svg>}
      {sq > 0 && <div style={{position: 'absolute', left: 540 - 60, top: top + PH / 2 - 60, width: 120, height: 120, borderRadius: 60, background: ab > 0.5 ? RbR : RbY, border: `7px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 84, color: ab > 0.5 ? '#fff' : NBK, transform: `scale(${sq * (1 + 0.2 * Math.sin(ab * Math.PI))}) rotate(${ab * 360}deg)`, zIndex: 7, boxSizing: 'border-box'}}>{ab > 0.5 ? '≠' : '='}</div>}
      <RbChip x={540} y={top + PH + 20} w={420} at={same} out={absurd} l="Même gravité ?" c={RbO} ic="Scale" fs={32} fill />
      <RbChip x={540} y={top + PH + 20} w={340} at={absurd} l="Absurde !" c={RbR} ic="CircleX" fs={34} fill />
    </>
  );
};

/* ═════════════ 4. Le vocabulaire des risques : le dictionnaire s'ouvre, les trois termes s'écrivent puis se brouillent ═════════════ */
const RbVocab: React.FC<{cy: number; at: number; voc: number; err: number}> = ({cy, at, voc, err}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const oq = prog(t, at + 0.1, voc, easeInOut);
  const jam = t > err ? Math.min(1, (t - err) / 0.4) : 0;
  const TERMS: [string, string][] = [['Risque brut', RbR], ['Moyens de maîtrise', RbB], ['Risque net', RbG]];
  const f = Math.floor(t * 20);
  return (
    <>
      <div style={{position: 'absolute', left: 90, top: cy - 360, width: 900, height: 560, zIndex: 4, transform: `scale(${0.85 + 0.15 * oq}) rotate(${jam * Math.sin(k * 30) * 1.5}deg)`}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 450, height: 560, ...nb('#FBF6EA', 14), borderColor: NBK, transformOrigin: '100% 50%', transform: `scaleX(${Math.max(0.02, oq)})`, boxShadow: `8px 8px 0 ${RbN}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16}}><Ico n="BookOpen" size={110} c={RbN} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: RbN, textAlign: 'center', lineHeight: 1.1}}>Vocabulaire<br />des risques</div></div>
        <div style={{position: 'absolute', left: 450, top: 0, width: 450, height: 560, ...nb('#FBF6EA', 14), borderColor: NBK, padding: '50px 36px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 34}}>
          {TERMS.map(([l, c], i) => { const q = prog(t, voc + i * 0.35, voc + 0.6 + i * 0.35, easeOut); const shown = l.slice(0, Math.round(l.length * q)); const txt = jam > 0 ? shown.split('').map((ch, j) => (ch === ' ' || random(`j${f}${i}${j}`) > jam * 0.7 ? ch : '#%&?!'[Math.floor(random(`k${f}${i}${j}`) * 5)])).join('') : shown; return <div key={i} style={{display: 'flex', alignItems: 'center', gap: 14, transform: `translateX(${jam * Math.sin(k * 25 + i) * 10}px)`}}><div style={{width: 22, height: 22, borderRadius: 11, background: c, border: `4px solid ${NBK}`}} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: c}}>{txt}</div></div>; })}
        </div>
      </div>
      <RbChip x={540} y={cy + 270} w={540} at={err} l="Une erreur colossale" c={RbR} ic="TriangleAlert" fs={32} fill />
    </>
  );
};

/* ═════════════ 5. Sur le même plan : sept jours défilent, la flamme géante et la petite feuille sont écrasées à la même taille ═════════════ */
const RbSamePlane: React.FC<{cy: number; at: number; days: number; plane: number; opp: number}> = ({cy, at, days, plane, opp}) => {
  const t = useT();
  const pq = prog(t, plane - 0.2, plane + 0.4, easeInOut);
  const oq = t > opp ? Math.min(1, sp(t, opp, 9, 10)) : 0;
  const ly = cy + 140;
  const S1 = lerp(360, 200, pq), S2 = lerp(110, 200, pq);
  return (
    <>
      <div style={{position: 'absolute', left: 120, top: cy - 400, width: 840, display: 'flex', justifyContent: 'space-between', zIndex: 4}}>{Array.from({length: 7}, (_, i) => { const on = t > days + i * 0.18; return <div key={i} style={{width: 100, height: 110, ...nb(on ? RbN : '#fff', 10), borderColor: NBK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${on ? 1 : 0.85})`}}><div style={{width: 60, height: 12, borderRadius: 6, background: on ? RbY : '#DDE2EA'}} />{on && <Ico n="TriangleAlert" size={44} c={RbY} />}</div>; })}</div>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 3}}>
        <line x1={80} y1={ly} x2={1000} y2={ly} stroke={NBK} strokeWidth={10} strokeLinecap="round" />
        {pq > 0 && <rect x={80} y={ly - 6} width={920 * pq} height={12} fill={RbO} />}
        {oq > 0 && <g opacity={oq}><path d={`M 470 ${cy + 300} L 140 ${cy + 300}`} stroke={RbR} strokeWidth={14} markerEnd="" /><path d={`M 150 ${cy + 280} L 120 ${cy + 300} L 150 ${cy + 320} Z`} fill={RbR} /><path d={`M 610 ${cy + 300} L 940 ${cy + 300}`} stroke={RbB} strokeWidth={14} /><path d={`M 930 ${cy + 280} L 960 ${cy + 300} L 930 ${cy + 320} Z`} fill={RbB} /></g>}
      </svg>
      <div style={{position: 'absolute', left: 290 - S1 / 2, top: ly - S1, width: S1, height: S1, borderRadius: 30, background: RbR, border: `7px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, boxSizing: 'border-box', transform: `scaleY(${1 - 0.15 * Math.sin(pq * Math.PI)})`, transformOrigin: '50% 100%'}}><Ico n="Flame" size={S1 * 0.6} c="#fff" /></div>
      <div style={{position: 'absolute', left: 790 - S2 / 2, top: ly - S2, width: S2, height: S2, borderRadius: 24, background: RbB, border: `7px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, boxSizing: 'border-box', transform: `scaleX(${1 - 0.15 * Math.sin(pq * Math.PI)})`, transformOrigin: '50% 100%'}}><Ico n="FileText" size={S2 * 0.6} c="#fff" /></div>
      <RbChip x={540} y={cy + 380} w={520} at={opp} l="Diamétralement opposées" c={RbN} ic="Split" fs={30} fill />
      <RbChip x={540} y={cy - 230} w={440} at={plane} l="Le même plan" c={RbO} ic="Layers" fs={32} fill />
    </>
  );
};

/* ═════════════ 6. Le programme : les blocs en désordre s'alignent, puis la ligne des cinq étapes s'allume ═════════════ */
const RB_PROG: [string, string, string][] = [['Comprendre le risque brut', 'Flame', RbR], ['Examiner les moyens de maîtrise', 'Shield', RbB], ['Expliquer le risque net', 'ShieldCheck', RbG], ["Conserver l'analyse brute", 'Eye', RbO], ['Gérer au quotidien', 'RefreshCw', RbT]];
const RbProgram: React.FC<{cy: number; at: number; order: number; times: number[]}> = ({cy, at, order, times}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const oq = prog(t, order - 0.3, order + 0.5, easeInOut);
  const y0 = cy - 360, gap = 150;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 3}}>
        <line x1={150} y1={y0 + 50} x2={150} y2={y0 + 50 + 4 * gap} stroke="#DDE2EA" strokeWidth={22} strokeLinecap="round" />
        {(() => { const last = times.reduce((acc, a, i) => (t >= a ? i : acc), -1); const f = last < 0 ? 0 : last + Math.min(1, (t - times[last]) / 0.5); const h = Math.min(4, f) * gap; return <line x1={150} y1={y0 + 50} x2={150} y2={y0 + 50 + h} stroke={RbN} strokeWidth={14} strokeLinecap="round" />; })()}
      </svg>
      {RB_PROG.map(([l, ic, c], i) => { const on = t > times[i]; const q = on ? Math.min(1, sp(t, times[i], 9, 10)) : 0; const sx = 540 + (random(`px${i}`) - 0.5) * 700, sy = cy + (random(`py${i}`) - 0.5) * 600, rot = (random(`pr${i}`) - 0.5) * 60; const x = lerp(sx, 150, oq), y = lerp(sy, y0 + 50 + i * gap, oq); return <React.Fragment key={i}>
        <div style={{position: 'absolute', left: x - 50, top: y - 50, width: 100, height: 100, borderRadius: 26, background: on ? c : '#fff', border: `6px solid ${NBK}`, boxShadow: `5px 5px 0 ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${rot * (1 - oq)}deg) scale(${(0.85 + 0.15 * q) * Math.min(1, sp(t, at + i * 0.08, 9, 11))})`, zIndex: 5, boxSizing: 'border-box'}}><Ico n={ic} size={54} c={on ? '#fff' : c} /></div>
        <div style={{position: 'absolute', left: 230, top: y0 + 50 + i * gap - 38, width: 780, height: 76, ...nb(on ? '#fff' : '#F1F1EA', 10), borderColor: on ? NBK : '#C9D2DF', boxShadow: on ? `6px 6px 0 ${c}` : undefined, display: 'flex', alignItems: 'center', paddingLeft: 24, fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: on ? INK : '#9AA7B8', opacity: oq, transform: `translateX(${(1 - q) * 40}px)`, zIndex: 4, boxSizing: 'border-box'}}>{l}</div>
      </React.Fragment>; })}
      <RbChip x={540} y={y0 + 50 + 4 * gap + 110} w={460} at={order} l="Remettre de l'ordre" c={RbN} ic="ListOrdered" fs={30} fill />
    </>
  );
};

/* ═════════════ 7. Grand mot-titre : lettres qui tombent une à une et se tamponnent (brut : pierre fissurée, net : vernis lisse) ═════════════ */
const RbBigWord: React.FC<{cy: number; at: number; lines: string[]; c: string; rough?: boolean; sub?: [number, string, string][]}> = ({cy, at, lines, c, rough, sub = []}) => {
  const t = useT();
  let n = 0;
  const fs = Math.min(170, 1650 / Math.max(...lines.map((l) => l.length)));
  return (
    <>
      <div style={{position: 'absolute', left: 0, top: cy - 300, width: 1080, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 5}}>
        {lines.map((l, li) => <div key={li} style={{display: 'flex', gap: 4}}>{l.split('').map((ch, j) => { const a = at + (n++) * 0.045; const q = t > a ? Math.min(1, sp(t, a, 10, 9)) : 0; return <span key={j} style={{display: 'inline-block', minWidth: ch === ' ' ? fs * 0.3 : undefined, fontFamily: sansFont, fontWeight: 900, fontSize: fs, lineHeight: 1, color: rough ? c : '#fff', background: rough ? undefined : `linear-gradient(180deg, ${hexMix(c, '#FFFFFF', 0.35)}, ${c})`, WebkitBackgroundClip: rough ? undefined : 'text', WebkitTextFillColor: rough ? undefined : 'transparent', WebkitTextStroke: `5px ${NBK}`, textShadow: rough ? `6px 6px 0 ${NBK}, 0 0 1px #000` : undefined, transform: `translateY(${(1 - q) * -260}px) rotate(${(1 - q) * (j % 2 ? 20 : -20)}deg) scale(${0.6 + 0.4 * q})`, opacity: q, filter: rough ? `drop-shadow(0 0 0 ${NBK})` : `drop-shadow(0 8px 0 ${NBK})`}}>{ch}</span>; })}</div>)}
      </div>
      {rough && t > at + 0.5 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 6}}>{[[300, cy - 280], [620, cy - 120], [820, cy - 260]].map(([x, y], m) => { const q = prog(t, at + 0.5 + m * 0.1, at + 0.8 + m * 0.1, easeOut); return <path key={m} d={`M ${x} ${y} l 18 40 l -22 30 l 26 44 l -14 30`} fill="none" stroke={NBK} strokeWidth={5} pathLength={1} strokeDasharray={`${q} 1`} />; })}</svg>}
      {sub.map(([a, l, ic], i) => <RbChip key={i} x={540} y={cy + 40 + i * 100} w={600} at={a} l={l} c={i ? RbN : c} ic={ic} fs={32} fill />)}
    </>
  );
};

/* ═════════════ 8. Pas de filet, pas de procédures, rien : la photo sans protection, les protections barrées, l'orage du scénario catastrophe ═════════════ */
const RbNaked: React.FC<{cy: number; at: number; doigt: number; filet: number; proc: number; rien: number; cata: number; src: string}> = ({cy, at, doigt, filet, proc, rien, cata, src}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const cq = prog(t, cata, cata + 0.6, easeOut);
  const flash = t > cata ? Math.max(0, 1 - ((t - cata) % 1.3) / 0.15) * (t < cata + 2.6 ? 1 : 0) : 0;
  const rq = t > rien ? Math.min(1, sp(t, rien, 9, 10)) : 0;
  return (
    <>
      <div style={{position: 'absolute', left: 90, top: cy - 410, width: 900, height: 560, ...nb('#000', 16), borderColor: NBK, boxShadow: `9px 9px 0 ${cq > 0.5 ? RbR : NBK}`, overflow: 'hidden', zIndex: 4, opacity: pop(t, at)}}>
        <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.05 + 0.08 * prog(t, at, at + 10)})`, filter: `saturate(${1 - 0.5 * cq}) brightness(${1 - 0.25 * cq})`}} />
        <div style={{position: 'absolute', inset: 0, background: `rgba(215,38,61,${0.32 * cq})`}} />
        {cq > 0 && <svg width={900} height={560} style={{position: 'absolute', left: 0, top: 0}}><path d="M 620 -10 L 560 180 L 640 190 L 540 420 L 600 420 L 500 600" fill="none" stroke="#FFF7C2" strokeWidth={14} strokeLinejoin="round" opacity={flash} /></svg>}
        {flash > 0 && <div style={{position: 'absolute', inset: 0, background: '#fff', opacity: 0.5 * flash}} />}
      </div>
      <RbDisc x={240} y={cy + 290} ic="Hand" c={RbSl} at={doigt} size={120} label="Aucun geste" />
      <RbDisc x={440} y={cy + 290} ic="Layers" c={RbB} at={filet - 0.35} cross={filet} size={120} label="Filet" />
      <RbDisc x={640} y={cy + 290} ic="ClipboardList" c={RbT} at={proc - 0.35} cross={proc} size={120} label="Procédures" />
      <div style={{position: 'absolute', left: 840 - 60, top: cy + 230, width: 120, height: 120, borderRadius: 60, border: `6px dashed ${RbSl}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: RbSl, transform: `scale(${rq})`, zIndex: 6, boxSizing: 'border-box'}}>∅</div>
      <RbChip x={540} y={cy + 430} w={620} at={cata} l="Le scénario catastrophe" c={RbR} ic="Zap" fs={32} fill />
    </>
  );
};

/* ═════════════ 9. L'erreur de paie sans contrôle : la fiche se couvre d'erreurs qui se multiplient ═════════════ */
const RbPayErr: React.FC<{cy: number; at: number; ctx: number; pay: number; noctl: number; inev: number; base: number}> = ({cy, at, ctx, pay, noctl, inev, base}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const pq = t > pay ? Math.min(1, sp(t, pay, 8, 11)) : 0;
  const nErr = t > inev ? Math.min(14, Math.floor((t - inev) * 9) + 3) : t > noctl ? 2 : t > pay + 0.6 ? 1 : 0;
  const cq = Math.min(1, sp(t, ctx, 9, 11));
  const dial = t > ctx ? (t - ctx) * 220 : 0;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 4}}><g transform={`translate(860 ${cy - 330}) scale(${cq}) rotate(${Math.sin(dial / 60) * 70})`}><circle r={78} fill="#fff" stroke={NBK} strokeWidth={7} />{Array.from({length: 12}, (_, i) => <line key={i} x1={0} y1={-62} x2={0} y2={-48} stroke={NBK} strokeWidth={5} transform={`rotate(${i * 30})`} />)}<line x1={0} y1={0} x2={0} y2={-56} stroke={RbR} strokeWidth={9} strokeLinecap="round" /><circle r={10} fill={NBK} /></g></svg>
      <div style={{position: 'absolute', left: 860 - 110, top: cy - 230, width: 220, display: 'flex', justifyContent: 'center', zIndex: 5, transform: `scale(${cq})`}}><div style={{...nb('#fff', 6), borderColor: NBK, padding: '2px 10px', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK}}>Contexte</div></div>
      <div style={{position: 'absolute', left: 170, top: cy - 300, width: 500, height: 640, ...nb('#fff', 14), borderColor: NBK, boxShadow: `9px 9px 0 ${RbB}`, padding: 30, boxSizing: 'border-box', zIndex: 4, transform: `scale(${pq}) rotate(${-3 + (nErr > 6 ? Math.sin(k * 30) * 1.2 : 0)}deg)`}}>
        <div style={{height: 54, borderRadius: 8, background: RbB, display: 'flex', alignItems: 'center', paddingLeft: 16, fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff', gap: 10}}><Ico n="FileText" size={32} c="#fff" />FICHE DE PAIE</div>
        {Array.from({length: 9}, (_, m) => <div key={m} style={{marginTop: 22, display: 'flex', justifyContent: 'space-between'}}><div style={{width: [220, 180, 250, 160, 210, 240, 150, 200, 190][m], height: 14, borderRadius: 7, background: '#C6CDD8'}} /><div style={{width: 70, height: 14, borderRadius: 7, background: '#C6CDD8'}} /></div>)}
        {Array.from({length: nErr}, (_, e) => { const x = 40 + random(`ex${e}`) * 380, y = 90 + random(`ey${e}`) * 480; const q = Math.min(1, (t - inev + 0.3 - e * 0.11) * 6); return <div key={e} style={{position: 'absolute', left: x, top: y, width: 54, height: 54, borderRadius: 27, background: RbR, border: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff', transform: `scale(${Math.max(0.6, Math.min(1, q))})`, boxSizing: 'border-box'}}>!</div>; })}
      </div>
      <RbDisc x={860} y={cy + 30} ic="ShieldCheck" c={RbG} at={noctl - 0.3} cross={noctl} size={130} label="Contrôle" />
      <RbChip x={540} y={cy + 400} w={520} at={inev} out={base} l="Erreur inévitable" c={RbR} ic="TriangleAlert" fs={32} fill />
      <RbChip x={540} y={cy + 400} w={600} at={base} l="Le danger de base varie" c={RbN} ic="Shuffle" fs={30} fill />
    </>
  );
};

/* ═════════════ 10. Le contexte : la paie locale à une seule règle, puis le globe des expatriés où les lois se croisent, la jauge explose ═════════════ */
const RbPayContext: React.FC<{cy: number; at: number; loc: number; one: number; emb: number; expat: number; lois: number; boom: number}> = ({cy, at, loc, one, emb, expat, lois, boom}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const v = t < expat ? lerp(0.1, 0.32, prog(t, loc, emb + 0.4, easeOut)) : t < boom ? lerp(0.32, 0.7, prog(t, expat, lois + 0.6, easeInOut)) : Math.min(1.02, 0.7 + 0.32 * prog(t, boom, boom + 0.3, easeOut)) + (t > boom ? Math.sin(k * 40) * 0.015 : 0);
  const lq = t > loc ? Math.min(1, sp(t, loc, 9, 11)) : 0, gq = t > expat ? Math.min(1, sp(t, expat, 8, 11)) : 0;
  const aq = prog(t, lois, lois + 1.2, easeOut);
  const bq = prog(t, boom, boom + 0.6, easeOut);
  const gx = 790, gy = cy + 120, GR = 190;
  const dots = Array.from({length: 100}, (_, i) => { const lat = (random(`la${i}`) - 0.5) * 2.4, lon = random(`lo${i}`) * Math.PI * 2 + k * 0.4; const x = Math.cos(lat) * Math.sin(lon), z = Math.cos(lat) * Math.cos(lon), y = Math.sin(lat); return [gx + x * GR, gy - y * GR, z] as [number, number, number]; });
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 4}}>
        <RbGauge x={540} y={cy - 210} r={170} v={Math.max(0, Math.min(1, v))} label="Risque brut" />
        {bq > 0 && bq < 1 && Array.from({length: 16}, (_, i) => { const a = (i / 16) * Math.PI * 2; return <line key={i} x1={540 + Math.cos(a) * 190} y1={cy - 210 + Math.sin(a) * 190} x2={540 + Math.cos(a) * (190 + bq * 160)} y2={cy - 210 + Math.sin(a) * (190 + bq * 160)} stroke={RbR} strokeWidth={12 * (1 - bq)} strokeLinecap="round" />; })}
        {gq > 0 && <g opacity={gq}><circle cx={gx} cy={gy} r={GR * gq} fill="#DDEBFF" stroke={NBK} strokeWidth={7} />{[-0.6, 0, 0.6].map((l) => <ellipse key={l} cx={gx} cy={gy - Math.sin(l) * GR} rx={GR * Math.cos(l) * gq} ry={GR * 0.18 * gq} fill="none" stroke={RbB} strokeWidth={2.5} opacity={0.5} />)}{[0, 1, 2].map((m) => <ellipse key={`m${m}`} cx={gx} cy={gy} rx={GR * Math.abs(Math.cos(k * 0.4 + m))} ry={GR * gq} fill="none" stroke={RbB} strokeWidth={2.5} opacity={0.5} />)}
          {aq > 0 && Array.from({length: 14}, (_, i) => { const a = dots[(i * 7) % 100], b = dots[(i * 13 + 5) % 100]; if (a[2] < 0 || b[2] < 0) return null; const mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - 60; return <path key={i} d={`M ${a[0]} ${a[1]} Q ${mx} ${my} ${b[0]} ${b[1]}`} fill="none" stroke={i % 2 ? RbR : RbO} strokeWidth={4} pathLength={1} strokeDasharray={`${aq} 1`} />; })}
          {dots.map(([x, y, z], i) => z > -0.1 && i / 100 < gq ? <circle key={i} cx={x} cy={y} r={5 + 2 * z} fill={RbO} stroke={NBK} strokeWidth={1.5} /> : null)}</g>}
      </svg>
      <div style={{position: 'absolute', left: 70, top: cy - 30, width: 440, height: 360, ...nb('#fff', 16), borderColor: NBK, boxShadow: `7px 7px 0 ${RbG}`, zIndex: 5, transform: `scale(${lq})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: gq > 0 ? 0.6 + 0.4 * (1 - gq) : 1}}>
        <svg width={360} height={120}>{[0, 1, 2, 3, 4].map((m) => <RbPerson key={m} x={40 + m * 70} y={100} c={[RbB, RbO, RbT, RbV, RbG][m]} s={0.75} skin={RBSK[m]} />)}</svg>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>Employés locaux</div>
        <div style={{...nb(RbG, 8), borderColor: NBK, padding: '4px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: '#fff', display: 'flex', alignItems: 'center', gap: 8, transform: `scale(${t > one ? 1 : 0})`}}><Ico n="BookOpen" size={28} c="#fff" />Une seule réglementation</div>
      </div>
      <RbChip x={290} y={cy + 360} w={300} at={emb} out={boom} l="Embêtant" c={RbY} ic="TriangleAlert" fs={30} fill />
      <RbChip x={790} y={cy + 360} w={360} at={expat} out={boom} l="100 expatriés" c={RbO} ic="Globe" fs={30} fill />
      <RbChip x={540} y={cy + 360} w={560} at={boom} l="Le risque brut explose" c={RbR} ic="Zap" fs={30} fill />
    </>
  );
};

/* ═════════════ 11. L'usine chimique sans prévention : extincteur et alarme barrés, losanges inflammables, thermomètre au maximum ═════════════ */
const RbThermo: React.FC<{x: number; y: number; h: number; v: number}> = ({x, y, h, v}) => <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 6}}><rect x={x - 26} y={y - h} width={52} height={h} rx={26} fill="#fff" stroke={NBK} strokeWidth={7} /><rect x={x - 14} y={y - h * Math.max(0.05, v)} width={28} height={h * Math.max(0.05, v)} rx={14} fill={hexMix('#F6C744', '#D7263D', Math.min(1, v))} /><circle cx={x} cy={y + 20} r={44} fill={hexMix('#F6C744', '#D7263D', Math.min(1, v))} stroke={NBK} strokeWidth={7} />{[0.25, 0.5, 0.75].map((f) => <line key={f} x1={x + 26} y1={y - h * f} x2={x + 46} y2={y - h * f} stroke={NBK} strokeWidth={4} />)}</svg>;
const RbFactory: React.FC<{cy: number; at: number; prev: number; ext: number; alarm: number; usine: number; infl: number; cata: number; src: string}> = ({cy, at, prev, ext, alarm, usine, infl, cata, src}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const uq = t > usine ? Math.min(1, sp(t, usine, 8, 11)) : 0;
  const cq = prog(t, cata, cata + 0.5, easeOut);
  const v = lerp(0.2, 0.62, prog(t, usine, infl, easeOut)) + 0.4 * cq;
  const shake = cq > 0 ? Math.sin(k * 50) * 6 * (1 - prog(t, cata + 0.5, cata + 1.5)) : 0;
  return (
    <>
      <div style={{position: 'absolute', left: 80, top: cy - 380, width: 760, height: 520, ...nb('#000', 16), borderColor: NBK, boxShadow: `8px 8px 0 ${RbO}`, overflow: 'hidden', zIndex: 4, transform: `scale(${uq}) translateX(${shake}px)`}}>
        <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.08 - 0.05 * prog(t, usine, usine + 4)})`}} />
        <div style={{position: 'absolute', inset: 0, background: `linear-gradient(0deg, rgba(215,38,61,${0.5 * cq}), transparent 70%)`}} />
        <svg width={760} height={520} style={{position: 'absolute', left: 0, top: 0}}><RbFlame x={200} y={520} s={cq * 1.3} t={t} /><RbFlame x={420} y={520} s={cq * 1.6} t={t} seed={3} /><RbFlame x={620} y={520} s={cq * 1.2} t={t} seed={5} /></svg>
      </div>
      {[0, 1, 2].map((i) => { const q = t > infl + i * 0.12 ? Math.min(1, sp(t, infl + i * 0.12, 10, 10)) : 0; const x = 160 + i * 260, y = cy + 210; return <div key={i} style={{position: 'absolute', left: x - 60, top: y - 60, width: 120, height: 120, transform: `scale(${q}) rotate(45deg)`, background: '#fff', border: `12px solid ${RbR}`, outline: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 6, boxSizing: 'border-box'}}><div style={{transform: 'rotate(-45deg)', display: 'flex'}}><Ico n="Flame" size={60} c={NBK} /></div></div>; })}
      {(() => { const tq = t > at + 1.6 ? Math.min(1, sp(t, at + 1.6, 9, 11)) : 0; const xq = 1 - prog(t, usine - 0.2, usine + 0.2, easeIn); if (tq * xq <= 0.001) return null; const A: [number, number] = [470, cy - 280], B: [number, number] = [230, cy + 130], C: [number, number] = [710, cy + 130]; const eq = (i: number) => prog(t, at + 1.9 + i * 0.35, at + 2.5 + i * 0.35, easeOut); const fl = prog(t, prev, prev + 1.2, easeOut); const nodes: [[number, number], string, string, string, number][] = [[B, 'Package', 'Combustible', RbO, 0], [C, 'O2', 'Comburant', RbB, 1], [A, 'Thermometer', 'Chaleur', RbR, 2]]; return <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, zIndex: 5, transform: `scale(${tq * xq})`, transformOrigin: `470px ${cy - 10}px`}}>
        <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
          <path d={`M ${A[0]} ${A[1]} L ${B[0]} ${B[1]} L ${C[0]} ${C[1]} Z`} fill={hexMix(RbR, '#FFFFFF', 0.88)} opacity={eq(2)} />
          {[[A, B], [B, C], [C, A]].map(([p, q], i) => <line key={i} x1={p[0]} y1={p[1]} x2={lerp(p[0], q[0], eq(i))} y2={lerp(p[1], q[1], eq(i))} stroke={NBK} strokeWidth={14} strokeLinecap="round" />)}
          <RbFlame x={470} y={cy + 30} s={0.6 * eq(2) + 0.7 * fl} t={t} seed={7} />
        </svg>
        {nodes.map(([[x, y], ic, l, c, i]) => { const q = t > at + 1.9 + i * 0.35 ? Math.min(1, sp(t, at + 1.9 + i * 0.35, 10, 10)) : 0; return <div key={l} style={{position: 'absolute', left: x - 110, top: y - 62, width: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, transform: `scale(${q})`}}><div style={{width: 124, height: 124, borderRadius: 62, background: c, border: `7px solid ${NBK}`, boxShadow: `5px 5px 0 ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: '#fff'}}>{ic === 'O2' ? <span>O<sub style={{fontSize: 30}}>2</sub></span> : <Ico n={ic} size={64} c="#fff" />}</div><div style={{...nb('#fff', 6), borderColor: NBK, padding: '2px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK}}>{l}</div></div>; })}
      </div>; })()}
      <RbDisc x={170} y={cy - 310} ic="FireExtinguisher" c={RbR} at={ext - 0.3} cross={ext} size={110} />
      <RbDisc x={330} y={cy - 310} ic="BellRing" c={RbO} at={alarm - 0.3} cross={alarm} size={110} />
      <RbThermo x={960} y={cy + 160} h={500} v={v} />
      <RbChip x={540} y={cy + 360} w={500} at={usine} out={cata} l="Usine chimique" c={RbO} ic="Factory" fs={32} fill />
      <RbChip x={540} y={cy + 360} w={560} at={cata} l="Catastrophe absolue" c={RbR} ic="Flame" fs={32} fill />
      <RbChip x={680} y={cy - 420} w={420} at={prev} l="Absence de prévention" c={RbN} ic="Ban" fs={28} fill />
    </>
  );
};

/* ═════════════ 12. Le petit bureau : trois ordinateurs et une machine à café, risque grave mais moindre ; la nature de l'activité dicte le danger ═════════════ */
const RbOffice: React.FC<{cy: number; at: number; pcs: number; cafe: number; grave: number; amp: number; dicte: number; src: string}> = ({cy, at, pcs, cafe, grave, amp, dicte, src}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const oq = Math.min(1, sp(t, at, 8, 12));
  const cmp = prog(t, amp - 0.2, amp + 0.4, easeInOut);
  const v = lerp(0.15, 0.6, prog(t, grave - 0.4, grave + 0.4, easeOut));
  const dq = t > dicte ? Math.min(1, sp(t, dicte, 9, 10)) : 0;
  return (
    <>
      <div style={{position: 'absolute', left: 80, top: cy - 380, width: 760, height: 460, ...nb('#000', 16), borderColor: NBK, boxShadow: `8px 8px 0 ${RbB}`, overflow: 'hidden', zIndex: 4, transform: `scale(${oq * (1 - 0.45 * cmp)}) translate(0px, ${-cmp * 20}px)`, transformOrigin: '0% 0%'}}>
        <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        <svg width={760} height={460} style={{position: 'absolute', left: 0, top: 0}}><RbFlame x={380} y={460} s={0.75 * prog(t, grave - 0.3, grave + 0.4)} t={t} /></svg>
      </div>
      <div style={{position: 'absolute', left: 120, top: cy + 120, display: 'flex', gap: 26, zIndex: 5, opacity: 1 - cmp}}>{[0, 1, 2].map((i) => { const q = t > pcs + i * 0.12 ? Math.min(1, sp(t, pcs + i * 0.12, 10, 10)) : 0; return <div key={i} style={{width: 140, height: 120, ...nb('#fff', 14), borderColor: NBK, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${q})`, boxShadow: `5px 5px 0 ${RbB}`}}><Ico n="Laptop" size={80} c={RbB} /></div>; })}<div style={{width: 140, height: 120, ...nb('#fff', 14), borderColor: NBK, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${t > cafe ? Math.min(1, sp(t, cafe, 10, 10)) : 0})`, boxShadow: `5px 5px 0 ${RbO}`}}><Ico n="Coffee" size={80} c={RbO} /></div></div>
      {cmp > 0 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 5, opacity: cmp}}>
        <line x1={100} y1={cy + 300} x2={880} y2={cy + 300} stroke={NBK} strokeWidth={8} strokeLinecap="round" />
        <RbFlame x={270} y={cy + 300} s={2.3 * cmp} t={t} />
        <RbFlame x={690} y={cy + 300} s={1.1 * cmp} t={t} seed={2} />
      </svg>}
      {cmp > 0 && <><div style={{position: 'absolute', left: 270 - 150, top: cy + 320, width: 300, display: 'flex', justifyContent: 'center', zIndex: 6}}><div style={{...nb(RbR, 8), borderColor: NBK, padding: '4px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff'}}>Usine chimique</div></div><div style={{position: 'absolute', left: 690 - 150, top: cy + 320, width: 300, display: 'flex', justifyContent: 'center', zIndex: 6}}><div style={{...nb(RbB, 8), borderColor: NBK, padding: '4px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff'}}>Petit bureau</div></div></>}
      <RbThermo x={960} y={cy + 160} h={500} v={cmp > 0 ? 0.6 : v} />
      <RbChip x={540} y={cy + 430} w={680} at={dicte} l="L'activité dicte le danger" c={RbN} ic="Gauge" fs={30} fill />
      {dq > 0 && <div style={{position: 'absolute', left: 600, top: cy - 300, zIndex: 6, transform: `scale(${dq}) rotate(${-8 + 8 * dq}deg)`}}><div style={{width: 120, height: 120, borderRadius: 60, background: '#fff', border: `7px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="Factory" size={64} c={RbN} /></div></div>}
    </>
  );
};

/* Matrice gravité × probabilité 5 × 5 : position du centre d'une case */
const RB_M = {C: 120, G: 8, N: 5};
const rbCell = (x0: number, y0: number, c: number, r: number): [number, number] => [x0 + c * (RB_M.C + RB_M.G) + RB_M.C / 2, y0 + (RB_M.N - 1 - r) * (RB_M.C + RB_M.G) + RB_M.C / 2];
const RbMatrixGrid: React.FC<{x0: number; y0: number; at: number; dim?: number; axes?: boolean}> = ({x0, y0, at, dim = 0, axes = true}) => {
  const t = useT();
  const W = RB_M.N * RB_M.C + (RB_M.N - 1) * RB_M.G;
  return <g>
    {Array.from({length: 25}, (_, i) => { const c = i % 5, r = Math.floor(i / 5); const d = at + (c + (4 - r)) * 0.04; const q = t > d ? Math.min(1, sp(t, d, 10, 10)) : 0; const [x, y] = rbCell(x0, y0, c, r); return <rect key={i} x={x - (RB_M.C / 2) * q} y={y - (RB_M.C / 2) * q} width={RB_M.C * q} height={RB_M.C * q} rx={14} fill={RB_HEAT[c + r]} stroke={NBK} strokeWidth={4} opacity={1 - dim} />; })}
    {axes && <><line x1={x0 - 26} y1={y0 + W} x2={x0 - 26} y2={y0 - 16} stroke={NBK} strokeWidth={6} /><path d={`M ${x0 - 40} ${y0 - 2} L ${x0 - 26} ${y0 - 26} L ${x0 - 12} ${y0 - 2} Z`} fill={NBK} /><line x1={x0 - 26} y1={y0 + W + 22} x2={x0 + W + 16} y2={y0 + W + 22} stroke={NBK} strokeWidth={6} /><path d={`M ${x0 + W + 2} ${y0 + W + 8} L ${x0 + W + 26} ${y0 + W + 22} L ${x0 + W + 2} ${y0 + W + 36} Z`} fill={NBK} /><text x={x0 - 44} y={y0 + W / 2} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={28} fill={RbSl} transform={`rotate(-90 ${x0 - 44} ${y0 + W / 2})`}>Probabilité</text><text x={x0 + W / 2} y={y0 + W + 62} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={28} fill={RbSl}>Gravité</text></>}
  </g>;
};

/* ═════════════ 13. Les boucliers : la menace rouge pulse, un mur de boucliers hexagonaux se referme autour de l'entreprise, le chaos se range ═════════════ */
const RbShields: React.FC<{cy: number; at: number; title: number; men: number; bouc: number; trio: number[]; chaos: number}> = ({cy, at, title, men, bouc, trio, chaos}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const bx = 540, by = cy + 40;
  const mq = t > men ? Math.min(1, sp(t, men, 8, 10)) : 0;
  const wq = prog(t, bouc - 0.2, bouc + 0.9, easeOut);
  const cq = prog(t, chaos, chaos + 0.9, easeInOut);
  const HX = 16;
  const hex = (r: number) => Array.from({length: 6}, (_, i) => { const a = (i / 6) * Math.PI * 2 + Math.PI / 6; return `${i ? 'L' : 'M'} ${Math.cos(a) * r} ${Math.sin(a) * r}`; }).join(' ') + ' Z';
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 4}}>
        {Array.from({length: 40}, (_, i) => { const ox = 540 + (random(`cx${i}`) - 0.5) * 900, oy = cy + (random(`cy${i}`) - 0.5) * 760; const jx = ox + Math.sin(k * 3 + i) * 50 * (1 - cq), jy = oy + Math.cos(k * 2.6 + i * 1.3) * 50 * (1 - cq); const gx = 160 + (i % 8) * 108, gy = cy - 380 + Math.floor(i / 8) * 34; const x = lerp(jx, gx, cq), y = lerp(jy, gy, cq); return <circle key={i} cx={x} cy={y} r={7} fill={cq > 0.9 ? RbB : RB_C[i % 9]} opacity={t > men ? 0.55 : 0} />; })}
        {mq > 0 && <g transform={`translate(${bx} ${by}) scale(${mq})`}>{Array.from({length: 8}, (_, i) => { const a = (i / 8) * Math.PI * 2 + k * 0.6; const r = 330 + Math.sin(k * 5 + i) * 20; return <path key={i} d={`M ${Math.cos(a) * r} ${Math.sin(a) * r} Q ${Math.cos(a + 0.3) * r * 0.7} ${Math.sin(a + 0.3) * r * 0.7} ${Math.cos(a) * (230 + wq * 60)} ${Math.sin(a) * (230 + wq * 60)}`} fill="none" stroke={RbR} strokeWidth={10} strokeLinecap="round" opacity={0.8 * (1 - 0.6 * wq)} />; })}</g>}
        {wq > 0 && Array.from({length: HX}, (_, i) => { const a = (i / HX) * Math.PI * 2 - Math.PI / 2; const q = Math.max(0, Math.min(1, wq * HX - i * 0.6)); const r = 250; return <g key={i} transform={`translate(${bx + Math.cos(a) * r} ${by + Math.sin(a) * r}) rotate(${(a * 180) / Math.PI + 90}) scale(${q})`}><path d={hex(56)} fill={RbB} fillOpacity={0.85} stroke={NBK} strokeWidth={5} /><path d={hex(34)} fill="none" stroke="#fff" strokeWidth={3} opacity={0.6} /></g>; })}
        <g transform={`translate(${bx} ${by})`}><rect x={-120} y={-130} width={240} height={250} rx={12} fill="#DDE6F2" stroke={NBK} strokeWidth={7} />{Array.from({length: 9}, (_, m) => <rect key={m} x={-92 + (m % 3) * 66} y={-100 + Math.floor(m / 3) * 66} width={50} height={44} rx={5} fill={RbY} stroke={NBK} strokeWidth={4} opacity={0.85} />)}<rect x={-26} y={70} width={52} height={50} fill={RbN} stroke={NBK} strokeWidth={5} /></g>
        {mq > 0 && <g transform={`translate(${bx + 330} ${cy - 330})`}><circle r={60 + Math.sin(k * 6) * 6} fill={RbR} stroke={NBK} strokeWidth={6} opacity={mq} /><text y={18} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={54} fill="#fff" opacity={mq}>!</text></g>}
      </svg>
      {(['Wrench', 'ClipboardList', 'HardHat'] as const).map((ic, i) => { const q = t > trio[i] ? Math.min(1, sp(t, trio[i], 9, 10)) : 0; const L = ['Actions', 'Procédures', 'Équipements'][i]; return <div key={i} style={{position: 'absolute', left: 120 + i * 300, top: cy + 330, width: 240, display: 'flex', alignItems: 'center', gap: 10, transform: `scale(${q})`, zIndex: 6}}><div style={{width: 76, height: 76, borderRadius: 18, background: RbB, border: `5px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box'}}><Ico n={ic} size={44} c="#fff" /></div><div style={{...nb('#fff', 6), borderColor: NBK, padding: '4px 10px', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK}}>{L}</div></div>; })}
      <RbChip x={540} y={cy - 440} w={600} at={title} l="Les moyens de maîtrise" c={RbB} ic="Shield" fs={32} fill />
      <RbChip x={260} y={cy - 330} w={300} at={men} out={bouc} l="La menace" c={RbR} ic="TriangleAlert" fs={28} fill />
      <RbChip x={260} y={cy - 330} w={320} at={bouc} l="Les boucliers" c={RbB} ic="Shield" fs={28} fill />
    </>
  );
};

/* ═════════════ 14. Les deux leviers : le jeton du risque descend la probabilité, puis recule sur la gravité, l'armure se referme ═════════════ */
const RbLevers: React.FC<{cy: number; at: number; prob: number; grav: number; arm: number}> = ({cy, at, prob, grav, arm}) => {
  const t = useT();
  const x0 = 540 - 316 + 30, y0 = cy - 400;
  const pq = prog(t, prob, prob + 0.9, easeInOut), gq = prog(t, grav, grav + 0.9, easeInOut);
  const r = lerp(4, 1, pq), c = lerp(4, 1, gq);
  const [tx, ty] = rbCell(x0, y0, c, r);
  const aq = t > arm ? Math.min(1, sp(t, arm, 9, 10)) : 0;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 4}}>
        <RbMatrixGrid x0={x0} y0={y0} at={at} dim={0.25} />
        {pq > 0 && <line x1={rbCell(x0, y0, 4, 4)[0]} y1={rbCell(x0, y0, 4, 4)[1]} x2={rbCell(x0, y0, 4, 4)[0]} y2={lerp(rbCell(x0, y0, 4, 4)[1], rbCell(x0, y0, 4, 1)[1], pq)} stroke={RbB} strokeWidth={12} strokeDasharray="18 12" />}
        {gq > 0 && <line x1={rbCell(x0, y0, 4, 1)[0]} y1={rbCell(x0, y0, 4, 1)[1]} x2={lerp(rbCell(x0, y0, 4, 1)[0], rbCell(x0, y0, 1, 1)[0], gq)} y2={rbCell(x0, y0, 4, 1)[1]} stroke={RbV} strokeWidth={12} strokeDasharray="18 12" />}
        <g transform={`translate(${tx} ${ty})`}><circle r={52 + aq * 8} fill={aq > 0.5 ? RbG : RbR} stroke={NBK} strokeWidth={7} />{aq > 0 && <path d="M 0 -78 L 64 -54 L 64 6 Q 64 60 0 86 Q -64 60 -64 6 L -64 -54 Z" fill="none" stroke={RbN} strokeWidth={10 * aq} opacity={aq} />}<text y={16} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={46} fill="#fff">!</text></g>
      </svg>
      <RbChip x={300} y={cy + 380} w={460} at={prob} out={arm} l="Réduire les chances" c={RbB} ic="TrendingDown" fs={28} fill />
      <RbChip x={790} y={cy + 380} w={400} at={grav} out={arm} l="Amortir le choc" c={RbV} ic="Shield" fs={28} fill />
      <RbChip x={540} y={cy + 380} w={560} at={arm} l="L'armure de l'entreprise" c={RbG} ic="ShieldCheck" fs={30} fill />
    </>
  );
};

/* ═════════════ 15. L'armure administrative : double vérification, alerte logicielle, la barrière tombe sur le virement suspect ═════════════ */
const RbPaySecure: React.FC<{cy: number; at: number; adm: number; dbl: number; soft: number; block: number; vir: number}> = ({cy, at, adm, dbl, soft, block, vir}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const dq = t > dbl ? Math.min(1, sp(t, dbl, 9, 10)) : 0;
  const sq = t > soft ? Math.min(1, sp(t, soft, 9, 10)) : 0;
  const mv = prog(t, block - 0.8, vir, easeInOut);
  const bar = prog(t, block, block + 0.35, easeIn);
  const st = t > vir ? Math.min(1, sp(t, vir, 10, 8)) : 0;
  const coinX = lerp(140, 470, mv);
  return (
    <>
      <div style={{position: 'absolute', left: 90, top: cy - 400, width: 420, height: 330, ...nb('#fff', 14), borderColor: NBK, boxShadow: `7px 7px 0 ${RbB}`, zIndex: 4, padding: 20, boxSizing: 'border-box', opacity: pop(t, at)}}>
        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: 200}}>{[0, 1].map((m) => <div key={m} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, transform: `scale(${dq})`}}><div style={{width: 90, height: 90, borderRadius: 45, background: [RBSK[1], RBSK[2]][m], border: `5px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="Eye" size={50} c="#fff" /></div><div style={{width: 120, height: 70, borderRadius: '50px 50px 0 0', background: [RbB, RbT][m], border: `5px solid ${NBK}`}} /></div>)}</div>
        <div style={{marginTop: 10, display: 'flex', justifyContent: 'center', gap: 10, alignItems: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, opacity: dq}}><Ico n="UserCheck" size={32} c={RbG} />Double vérification</div>
      </div>
      <div style={{position: 'absolute', left: 570, top: cy - 400, width: 420, height: 330, ...nb('#fff', 14), borderColor: NBK, boxShadow: `7px 7px 0 ${RbO}`, zIndex: 4, overflow: 'hidden', transform: `scale(${sq})`}}>
        <div style={{height: 46, background: RbN, display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 14}}>{[RbR, RbY, RbG].map((c) => <div key={c} style={{width: 16, height: 16, borderRadius: 8, background: c}} />)}<div style={{marginLeft: 10, fontFamily: 'monospace', fontWeight: 700, fontSize: 20, color: '#fff'}}>alerte.log</div></div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 284, gap: 12}}><div style={{transform: `rotate(${Math.sin(k * 18) * 14}deg)`}}><Ico n="BellRing" size={90} c={RbO} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: RbO}}>Montant suspect</div></div>
      </div>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 5}}>
        <line x1={100} y1={cy + 200} x2={980} y2={cy + 200} stroke="#C6CDD8" strokeWidth={16} strokeDasharray="30 18" strokeLinecap="round" />
        <g transform={`translate(${coinX} ${cy + 200})`}><circle r={56} fill={RbGold} stroke={NBK} strokeWidth={7} /><text y={20} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={58} fill="#fff">€</text></g>
        <g transform={`translate(560 ${cy + 260})`}><rect x={-20} y={-140} width={40} height={140} fill={RbN} stroke={NBK} strokeWidth={5} /><g transform={`rotate(${lerp(-80, 0, bar)})`}><rect x={0} y={-150} width={340} height={30} rx={8} fill="#fff" stroke={NBK} strokeWidth={5} />{[0, 1, 2, 3].map((m) => <rect key={m} x={20 + m * 80} y={-150} width={40} height={30} fill={RbR} />)}</g></g>
        <g transform={`translate(860 ${cy + 200})`}><rect x={-80} y={-90} width={160} height={150} fill="#DDE6F2" stroke={NBK} strokeWidth={6} /><path d="M -100 -90 L 0 -150 L 100 -90 Z" fill={RbN} stroke={NBK} strokeWidth={6} />{[-50, 0, 50].map((x) => <rect key={x} x={x - 12} y={-70} width={24} height={110} fill="#fff" stroke={NBK} strokeWidth={4} />)}</g>
      </svg>
      {st > 0 && <div style={{position: 'absolute', left: 300, top: cy + 300, zIndex: 7, transform: `scale(${2.2 - 1.2 * st}) rotate(-10deg)`, opacity: Math.min(1, st * 2)}}><div style={{border: `8px solid ${RbR}`, borderRadius: 14, padding: '6px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: RbR, letterSpacing: 6, background: 'rgba(255,255,255,0.85)'}}>BLOQUÉ</div></div>}
      <RbChip x={540} y={cy - 500} w={560} at={adm} l="Une armure administrative" c={RbN} ic="Briefcase" fs={30} fill />
    </>
  );
};

/* ═════════════ 16. Le risque net : brut − moyens de maîtrise = net, la barre rouge se fait trancher, l'armure s'enfile, les engrenages tournent en toile de fond ═════════════ */
const RbNetFormula: React.FC<{cy: number; at: number; vis: number; arm: number; eq: number; bg: number; att: number}> = ({cy, at, vis, arm, eq, bg, att}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const floor = cy + 260;
  const bq = Math.min(1, sp(t, at + 0.1, 8, 12));
  const mq = prog(t, arm - 0.2, arm + 0.6, easeInOut);
  const nq = t > eq ? Math.min(1, sp(t, eq, 9, 10)) : 0;
  const gq = t > bg ? Math.min(1, sp(t, bg, 8, 11)) : 0;
  const aq = prog(t, att, att + 1.0, easeOut);
  const HB = 560;
  const rot = k * 30;
  const gear = (r: number, n: number) => Array.from({length: n}, (_, i) => { const st = (Math.PI * 2) / n, a = i * st; return `${i ? 'L' : 'M'} ${Math.cos(a) * (r - 18)} ${Math.sin(a) * (r - 18)} L ${Math.cos(a + st * 0.14) * r} ${Math.sin(a + st * 0.14) * r} L ${Math.cos(a + st * 0.4) * r} ${Math.sin(a + st * 0.4) * r} L ${Math.cos(a + st * 0.54) * (r - 18)} ${Math.sin(a + st * 0.54) * (r - 18)}`; }).join(' ') + ' Z';
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 3}}>
        {gq > 0 && <g opacity={0.22 * gq}><g transform={`translate(210 ${cy - 200}) rotate(${rot})`}><path d={gear(150, 12)} fill={RbSl} /></g><g transform={`translate(860 ${cy + 40}) rotate(${-rot * 1.3})`}><path d={gear(120, 10)} fill={RbSl} /></g><g transform={`translate(560 ${cy - 330}) rotate(${rot * 1.6})`}><path d={gear(80, 8)} fill={RbSl} /></g></g>}
        <line x1={80} y1={floor} x2={1000} y2={floor} stroke={NBK} strokeWidth={8} strokeLinecap="round" />
        <rect x={130} y={floor - HB * bq} width={190} height={HB * bq} rx={12} fill={hexMix(RbR, '#F6A0A8', aq)} stroke={NBK} strokeWidth={7} />
        {mq > 0 && <g transform={`translate(${lerp(1100, 430, mq)} 0)`}><rect x={0} y={floor - HB} width={190} height={HB * 0.72} rx={12} fill={RbB} stroke={NBK} strokeWidth={7} />{[0, 1, 2].map((m) => <path key={m} d={`M 95 ${floor - HB + 70 + m * 130} m -36 -24 l 72 0 l 0 30 q 0 34 -36 50 q -36 -16 -36 -50 z`} fill="#fff" stroke={NBK} strokeWidth={4} />)}</g>}
        {nq > 0 && <rect x={770} y={floor - HB * 0.28 * nq} width={190} height={HB * 0.28 * nq} rx={12} fill={RbG} stroke={NBK} strokeWidth={7} />}
        {mq > 0.5 && <text x={375} y={floor - HB / 2 + 20} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={90} fill={NBK}>−</text>}
        {nq > 0 && <text x={700} y={floor - HB / 2 + 20} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={90} fill={NBK} opacity={nq}>=</text>}
      </svg>
      {[['Risque brut', RbR, 225, 1], ['Moyens de maîtrise', RbB, 525, mq], ['Risque net', RbG, 865, nq]].map(([l, c, x, q], i) => <div key={i} style={{position: 'absolute', left: (x as number) - 150, top: floor + 22, width: 300, display: 'flex', justifyContent: 'center', zIndex: 6, opacity: q as number}}><div style={{...nb(c as string, 8), borderColor: NBK, padding: '4px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: '#fff', whiteSpace: 'nowrap'}}>{l as string}</div></div>)}
      <RbChip x={540} y={cy - 460} w={480} at={vis} out={att} l="Le visage rassurant" c={RbG} ic="Smile" fs={30} fill />
      <RbChip x={540} y={cy - 460} w={480} at={att} l="La réalité atténuée" c={RbT} ic="CloudSun" fs={30} fill />
    </>
  );
};

/* ═════════════ 17. Les deux risques tombent ensemble : incendie grave et erreur de paie importante glissent vers « faible », le tableau de bord s'apaise ═════════════ */
const RbMatrixDrop: React.FC<{cy: number; at: number; fire: number; pay: number; sh: number[]; fall: number; low: number; dash: number}> = ({cy, at, fire, pay, sh, fall, low, dash}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const x0 = 540 - 316 + 30, y0 = cy - 420;
  const fq = prog(t, fall, fall + 1.0, easeInOut);
  const fireP = rbCell(x0, y0, lerp(4, 0, fq), lerp(4, 1, fq)), payP = rbCell(x0, y0, lerp(3, 1, fq), lerp(3, 0, fq));
  const T: [number, [number, number], string, string, string][] = [[fire, fireP, 'Flame', RbR, 'Incendie'], [pay, payP, 'FileText', RbO, 'Erreur de paie']];
  const lq = t > low ? Math.min(1, sp(t, low, 9, 10)) : 0;
  const dq = t > dash ? Math.min(1, sp(t, dash, 8, 11)) : 0;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 4}}>
        <RbMatrixGrid x0={x0} y0={y0} at={at} dim={0.3} />
        {T.map(([a, [x, y], , c], i) => { const q = t > a ? Math.min(1, sp(t, a, 9, 10)) : 0; return q > 0 && fq > 0 && fq < 1 ? <line key={`l${i}`} x1={rbCell(x0, y0, i ? 3 : 4, i ? 3 : 4)[0]} y1={rbCell(x0, y0, i ? 3 : 4, i ? 3 : 4)[1]} x2={x} y2={y} stroke={c} strokeWidth={10} strokeDasharray="16 10" /> : null; })}
      </svg>
      {T.map(([a, [x, y], ic, c, l], i) => { const q = t > a ? Math.min(1, sp(t, a, 9, 10)) : 0; const green = fq >= 1; return <div key={i} style={{position: 'absolute', left: x - 56, top: y - 56, width: 112, height: 112, zIndex: 6, transform: `scale(${q})`}}>
        <div style={{width: 112, height: 112, borderRadius: 56, background: green ? RbG : c, border: `7px solid ${NBK}`, boxShadow: `0 0 ${green ? 30 : 0}px ${RbG}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box'}}><Ico n={ic} size={58} c="#fff" /></div>
        {sh.map((s, m) => { const sq = t > s + i * 0.1 ? Math.min(1, sp(t, s + i * 0.1, 10, 10)) : 0; const ang = -90 + (m - 1) * 50; return sq > 0 ? <div key={m} style={{position: 'absolute', left: 56 + Math.cos((ang * Math.PI) / 180) * 76 - 22, top: 56 + Math.sin((ang * Math.PI) / 180) * 76 - 22, width: 44, height: 44, borderRadius: 12, background: RbB, border: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${sq})`, boxSizing: 'border-box'}}><Ico n={['BellRing', 'UserCheck', 'ClipboardList'][m]} size={24} c="#fff" /></div> : null; })}
        <div style={{position: 'absolute', left: -60, top: 120, width: 232, display: 'flex', justifyContent: 'center'}}><div style={{...nb('#fff', 6), borderColor: NBK, padding: '2px 8px', fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: INK, whiteSpace: 'nowrap'}}>{l}</div></div>
      </div>; })}
      <div style={{position: 'absolute', left: 540 - 140, top: cy + 300, width: 280, display: 'flex', justifyContent: 'center', zIndex: 7, transform: `scale(${lq})`}}><div style={{...nb(RbG, 10), borderColor: NBK, boxShadow: `6px 6px 0 ${NBK}`, padding: '6px 24px', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: '#fff'}}>FAIBLE</div></div>
      {dq > 0 && <div style={{position: 'absolute', left: 140, top: cy + 375, width: 800, height: 90, ...nb(RbN, 16), borderColor: NBK, display: 'flex', alignItems: 'center', justifyContent: 'space-around', zIndex: 6, transform: `translateY(${(1 - dq) * 120}px)`}}>{Array.from({length: 6}, (_, m) => <div key={m} style={{width: 46, height: 46, borderRadius: 23, background: RbG, border: '4px solid #fff', boxShadow: `0 0 ${14 + 6 * Math.sin(k * 4 + m)}px ${RbG}`}} />)}</div>}
    </>
  );
};

/* ═════════════ 18. Le piège se referme : les mâchoires d'acier claquent sous les deux étiquettes « faible », célébration prématurée ═════════════ */
const RbTrap: React.FC<{cy: number; at: number; trap: number; both: number; why: number; fel: number}> = ({cy, at, trap, both, why, fel}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const jq = prog(t, trap - 0.1, trap + 0.2, easeIn);
  const bounce = t > trap + 0.2 ? Math.exp(-(t - trap - 0.2) * 7) * Math.sin((t - trap - 0.2) * 40) * 8 : 0;
  const tq = t > fel ? Math.min(1, sp(t, fel, 9, 9)) : 0;
  const bq = t > both ? 0.5 + 0.5 * Math.sin((t - both) * 8) : 0;
  const jy = cy + 160;
  const teeth = (up: boolean) => Array.from({length: 11}, (_, i) => { const x = -360 + i * 72; return `L ${x + 36} ${up ? -60 : 60} L ${x + 72} 0`; }).join(' ');
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 4}}>
        <g transform={`translate(540 ${jy}) translate(0 ${bounce})`}>
          <g transform={`rotate(${lerp(-70, -8, jq)} -380 0)`}><path d={`M -360 0 ${teeth(true)} L 432 0 L 432 30 L -360 30 Z`} fill="#9AA5B4" stroke={NBK} strokeWidth={7} strokeLinejoin="round" /></g>
          <g transform={`rotate(${lerp(70, 8, jq)} -380 0) scale(1 -1)`}><path d={`M -360 0 ${teeth(true)} L 432 0 L 432 30 L -360 30 Z`} fill="#7D8899" stroke={NBK} strokeWidth={7} strokeLinejoin="round" /></g>
          <circle cx={-380} cy={0} r={36} fill={RbSl} stroke={NBK} strokeWidth={7} />
        </g>
        {jq >= 1 && t < trap + 0.6 && Array.from({length: 12}, (_, i) => { const u = (t - trap - 0.2) / 0.4; const a = (i / 12) * Math.PI * 2; return <line key={i} x1={540 + Math.cos(a) * 80} y1={jy + Math.sin(a) * 40} x2={540 + Math.cos(a) * (80 + u * 260)} y2={jy + Math.sin(a) * (40 + u * 130)} stroke={RbY} strokeWidth={10 * (1 - u)} strokeLinecap="round" />; })}
      </svg>
      {[0, 1].map((i) => <div key={i} style={{position: 'absolute', left: [180, 640][i], top: cy - 300, width: 260, height: 300, ...nb('#fff', 16), borderColor: NBK, boxShadow: `7px 7px 0 ${RbG}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, zIndex: 5, transform: `scale(${Math.min(1, sp(t, at + i * 0.1, 9, 11))}) translateY(${jq * 20}px)`}}><div style={{width: 110, height: 110, borderRadius: 55, background: [RbR, RbO][i], border: `6px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.4}}><Ico n={['Flame', 'FileText'][i]} size={58} c="#fff" /></div><div style={{...nb(RbG, 8), borderColor: NBK, padding: '4px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff', boxShadow: `0 0 ${20 * bq}px ${RbG}`}}>FAIBLE</div></div>)}
      {tq > 0 && <div style={{position: 'absolute', left: 540 - 80, top: cy - 470, zIndex: 7, transform: `scale(${tq}) rotate(${Math.sin(k * 6) * 6}deg)`}}><div style={{width: 160, height: 160, borderRadius: 80, background: RbGold, border: `7px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="Trophy" size={92} c="#fff" /></div></div>}
      <RbChip x={540} y={cy + 380} w={520} at={trap} out={why} l="Le piège se referme" c={RbR} ic="TriangleAlert" fs={32} fill />
      <RbChip x={540} y={cy + 380} w={520} at={why} l="Pourquoi s'embêter ?" c={RbN} ic="CircleHelp" fs={32} fill />
    </>
  );
};

/* ═════════════ 19. Trois raisons et la double vision : les jumelles à verres rouge (brut) et vert (net) ═════════════ */
const RbThree: React.FC<{cy: number; at: number; cons: number; eye: number; err: number; three: number; dbl: number}> = ({cy, at, cons, eye, err, three, dbl}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const dq = t > dbl ? Math.min(1, sp(t, dbl, 8, 11)) : 0;
  return (
    <>
      {(() => { const oq = 1 - prog(t, three - 0.3, three + 0.05, easeIn); const eq = prog(t, eye, eye + 0.5, easeInOut); const rq = prog(t, err, err + 0.3, easeOut); if (t < cons || oq <= 0) return null; const sh = rq > 0 ? Math.sin(k * 45) * 8 * (1 - prog(t, err + 0.3, err + 1.2)) : 0; return <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 5}}>
        {eq > 0 && <path d={`M 560 ${cy - 170} L 650 ${cy - 290} L 650 ${cy - 30} Z`} fill={RbG} opacity={0.22 * eq} />}
        {[0, 1].map((i) => { const q = Math.min(1, sp(t, cons + i * 0.15, 9, 11)) * oq; const x = [290, 790][i], c = [RbR, RbG][i]; const dim = i === 0 ? eq : 0; return <g key={i} transform={`translate(${x + (i === 0 ? sh : 0)} ${cy - 160}) scale(${q})`}>
          <rect x={-150} y={-140} width={120} height={44} rx={12} fill={hexMix(c, '#FFFFFF', 0.45)} stroke={NBK} strokeWidth={7} />
          <rect x={-120} y={-150} width={240} height={90} rx={8} fill="#fff" stroke={NBK} strokeWidth={5} />
          {[0, 1, 2].map((m) => <rect key={m} x={-96} y={-134 + m * 22} width={150 - m * 30} height={9} rx={4} fill="#C6CDD8" />)}
          <rect x={-150} y={-110} width={300} height={220} rx={18} fill={hexMix(c, '#FFFFFF', 0.6)} stroke={NBK} strokeWidth={7} />
          <text y={22} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={70} fill={c} stroke={NBK} strokeWidth={2.5}>{i === 0 ? 'BRUT' : 'NET'}</text>
          <rect x={-150} y={-110} width={300} height={220} rx={18} fill="#8A93A3" opacity={0.6 * dim} />
          {rq > 0 && i === 0 && <rect x={-162} y={-122} width={324} height={244} rx={24} fill="none" stroke={RbR} strokeWidth={10} opacity={rq * (0.6 + 0.4 * Math.sin(k * 12))} />}
        </g>; })}
        {eq > 0 && <g transform={`translate(540 ${cy - 160}) scale(${eq})`}><path d="M -78 0 Q 0 -66 78 0 Q 0 66 -78 0 Z" fill="#fff" stroke={NBK} strokeWidth={7} /><circle cx={18} r={30} fill={RbG} stroke={NBK} strokeWidth={5} /><circle cx={24} cy={-6} r={10} fill={NBK} /><circle cx={8} cy={-14} r={6} fill="#fff" /></g>}
      </svg>; })()}
      {[0, 1, 2].map((i) => { const q = t > three + i * 0.15 ? Math.min(1, sp(t, three + i * 0.15, 9, 10)) : 0; return <div key={i} style={{position: 'absolute', left: 190 + i * 250, top: cy - 260, width: 200, height: 200, borderRadius: 40, background: [RbR, RbO, RbV][i], border: `8px solid ${NBK}`, boxShadow: `7px 7px 0 ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 130, color: '#fff', transform: `scale(${q}) rotate(${(1 - q) * 30}deg)`, zIndex: 5, boxSizing: 'border-box'}}>{i + 1}</div>; })}
      {dq > 0 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 5}}>
        <g transform={`translate(540 ${cy + 180}) scale(${dq})`}>
          <rect x={-60} y={-40} width={120} height={60} rx={14} fill={NBK} />
          {[-1, 1].map((s) => <g key={s} transform={`translate(${s * 150} 0)`}><rect x={-110} y={-130} width={220} height={200} rx={40} fill={RbSl} stroke={NBK} strokeWidth={8} /><circle cy={-20} r={92} fill={s < 0 ? RbR : RbG} stroke={NBK} strokeWidth={10} opacity={0.9} /><circle cx={-30} cy={-50} r={22} fill="#fff" opacity={0.5} /><text y={6} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={42} fill="#fff">{s < 0 ? 'BRUT' : 'NET'}</text></g>)}
        </g>
      </svg>}
      <RbChip x={540} y={cy - 440} w={600} at={cons} l="Conserver l'analyse brute" c={RbO} ic="Eye" fs={30} fill />
      <RbChip x={540} y={cy + 90} w={460} at={err} out={three} l="Erreur stratégique" c={RbR} ic="CircleX" fs={30} fill />
      <RbChip x={540} y={cy + 420} w={420} at={dbl} l="Double vision" c={RbN} ic="Glasses" fs={32} fill />
    </>
  );
};

/* ═════════════ 20. Un trottoir ou une falaise : même bord, profondeur sans commune mesure, la caméra plonge le long de la paroi ═════════════ */
const RbCliff: React.FC<{cy: number; at: number; trot: number; fal: number}> = ({cy, at, trot, fal}) => {
  const t = useT();
  const tq = t > trot ? Math.min(1, sp(t, trot, 9, 10)) : 0;
  const fq = t > fal ? Math.min(1, sp(t, fal, 9, 10)) : 0;
  const dive = prog(t, fal + 0.2, fal + 1.0, easeInOut);
  const gy = cy - 40;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 4}}>
        <defs><clipPath id="rbCl"><rect x={40} y={460} width={1000} height={920} /></clipPath><linearGradient id="rbAb" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3A4558" /><stop offset="100%" stopColor="#05070C" /></linearGradient></defs>
        <g clipPath="url(#rbCl)"><g transform={`translate(0 ${-dive * 380})`}>
          <g opacity={tq}><rect x={60} y={gy} width={300} height={40} fill="#B9BFC9" stroke={NBK} strokeWidth={6} /><rect x={60} y={gy + 40} width={420} height={600} fill="#8C93A0" /><line x1={360} y1={gy} x2={360} y2={gy + 40} stroke={NBK} strokeWidth={6} /><RbPerson x={280} y={gy - 50} c={RbB} s={0.9} /></g>
          <g opacity={fq}><rect x={560} y={gy} width={260} height={1400} fill="#6E5A44" stroke={NBK} strokeWidth={6} />{Array.from({length: 10}, (_, i) => <path key={i} d={`M 820 ${gy + 40 + i * 130} l -30 40 l 20 50`} fill="none" stroke={NBK} strokeWidth={4} />)}<rect x={820} y={gy + 6} width={220} height={1400} fill="url(#rbAb)" /><RbPerson x={760} y={gy - 50} c={RbO} s={0.9} /></g>
        </g></g>
      </svg>
      <div style={{position: 'absolute', left: 210 - 120, top: cy - 300, width: 240, display: 'flex', justifyContent: 'center', zIndex: 6, transform: `scale(${tq})`}}><div style={{...nb(RbB, 8), borderColor: NBK, padding: '6px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: '#fff'}}>Trottoir</div></div>
      <div style={{position: 'absolute', left: 760 - 120, top: cy - 300, width: 240, display: 'flex', justifyContent: 'center', zIndex: 6, transform: `scale(${fq})`}}><div style={{...nb(RbR, 8), borderColor: NBK, padding: '6px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: '#fff'}}>Falaise</div></div>
    </>
  );
};

/* ═════════════ 21. La vraie nature du danger : deux étiquettes « faible » identiques, le scanner les radiographie et révèle l'incendie caché sous l'une ═════════════ */
const RbXray: React.FC<{cy: number; at: number; nat: number; nette: number; ident: number}> = ({cy, at, nat, nette, ident}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const sq = prog(t, nat - 0.1, nat + 1.6, easeInOut);
  const sx = lerp(60, 1020, sq);
  const iq = t > ident ? 0.5 + 0.5 * Math.sin((t - ident) * 7) : 0;
  const C: [number, string, string, string][] = [[90, RbR, 'Flame', 'Incendie'], [570, RbO, 'FileText', 'Erreur de comptabilité']];
  return (
    <>
      <div style={{position: 'absolute', left: 60, top: cy - 430, width: 130, height: 130, borderRadius: 30, background: RbR, border: `7px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 86, color: '#fff', transform: `scale(${Math.min(1, sp(t, at, 9, 10))})`, zIndex: 6, boxSizing: 'border-box'}}>1</div>
      {C.map(([x, c, ic, l], i) => { const q = Math.min(1, sp(t, at + 0.15 + i * 0.1, 9, 11)); const reveal = Math.max(0, Math.min(1, (sx - x) / 420)); return <div key={i} style={{position: 'absolute', left: x, top: cy - 230, width: 420, height: 480, ...nb('#fff', 18), borderColor: NBK, boxShadow: `8px 8px 0 ${RbG}`, overflow: 'hidden', zIndex: 4, transform: `scale(${q})`}}>
        <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, background: '#F2FBF4'}}><div style={{...nb(RbG, 10), borderColor: NBK, padding: '8px 28px', fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: '#fff', boxShadow: `0 0 ${24 * iq}px ${RbG}`}}>FAIBLE</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: RbSl}}>{l}</div></div>
        <div style={{position: 'absolute', inset: 0, background: '#0B1530', clipPath: `inset(0 ${(1 - reveal) * 100}% 0 0)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14}}>
          <div style={{width: i ? 120 : 300, height: i ? 120 : 300, borderRadius: '50%', background: `radial-gradient(circle, ${c}, ${c}33 60%, transparent 70%)`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n={ic} size={i ? 70 : 190} c="#fff" /></div>
          <div style={{fontFamily: 'monospace', fontWeight: 700, fontSize: 26, color: '#9CC6FF', letterSpacing: 3}}>{i ? 'DANGER : MINEUR' : 'DANGER : MAJEUR'}</div>
        </div>
      </div>; })}
      {sq > 0 && sq < 1 && <div style={{position: 'absolute', left: sx - 6, top: cy - 260, width: 12, height: 540, background: '#7FFFD4', boxShadow: '0 0 30px #7FFFD4, 0 0 60px #2FA84F', zIndex: 7}} />}
      <RbChip x={540} y={cy + 320} w={560} at={nat} out={nette} l="La vraie nature du danger" c={RbR} ic="ScanEye" fs={30} fill />
      <RbChip x={540} y={cy + 320} w={560} at={ident} l="Identiques… en apparence" c={RbG} ic="Copy" fs={30} fill />
    </>
  );
};

/* ═════════════ 22. Couper dans les budgets : les ciseaux coupent la maintenance des alarmes, la sirène hurle « attention », le feu ressurgit ═════════════ */
const RbBudget: React.FC<{cy: number; at: number; budg: number; maint: number; faible: number; hurl: number; att: number; sous: number}> = ({cy, at, budg, maint, faible, hurl, att, sous}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const cut = prog(t, maint + 0.6, maint + 1.0, easeIn);
  const scx = lerp(80, 520, prog(t, budg, maint + 0.8, easeInOut));
  const snip = Math.abs(Math.sin(k * 12)) * 22;
  const fq = t > faible ? Math.min(1, sp(t, faible, 10, 9)) : 0;
  const hq = t > hurl ? Math.min(1, sp(t, hurl, 9, 10)) : 0;
  const aq = t > att ? Math.min(1, sp(t, att, 9, 10)) : 0;
  const sq = prog(t, sous, sous + 0.6, easeOut);
  const BARS = [0.9, 0.7, 0.8, 0.6];
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 4}}>
        {BARS.map((h, i) => { const isM = i === 2; const hh = 300 * h * (isM ? 1 - 0.65 * cut : 1); return <g key={i}><rect x={150 + i * 130} y={cy - 40 - hh} width={90} height={hh} rx={10} fill={isM ? RbO : RbB} stroke={NBK} strokeWidth={6} opacity={pop(t, at)} />{isM && <g transform={`translate(${195 + i * 130} ${cy - 90 - hh})`}><circle r={34} fill="#fff" stroke={NBK} strokeWidth={5} /><path d="M -14 8 Q -14 -16 0 -16 Q 14 -16 14 8 L 18 12 L -18 12 Z" fill={cut > 0.5 ? '#C6CDD8' : RbY} stroke={NBK} strokeWidth={3} /></g>}</g>; })}
        <line x1={110} y1={cy - 40} x2={720} y2={cy - 40} stroke={NBK} strokeWidth={7} />
        {t > budg && cut < 1 && <g transform={`translate(${scx} ${cy - 160})`}><g transform={`rotate(${-snip})`}><path d="M 0 0 L 110 -14 L 110 -2 Z" fill="#C6CDD8" stroke={NBK} strokeWidth={4} /><circle cx={-30} cy={-16} r={22} fill="none" stroke={RbR} strokeWidth={10} /></g><g transform={`rotate(${snip})`}><path d="M 0 0 L 110 14 L 110 2 Z" fill="#C6CDD8" stroke={NBK} strokeWidth={4} /><circle cx={-30} cy={16} r={22} fill="none" stroke={RbR} strokeWidth={10} /></g><circle r={7} fill={NBK} /></g>}
        {sq > 0 && <g><RbFlame x={850} y={cy + 360} s={2.4 * sq} t={t} /><RbFlame x={700} y={cy + 360} s={1.4 * sq} t={t} seed={2} /></g>}
        {hq > 0 && <g transform={`translate(860 ${cy - 220}) scale(${hq})`}><path d="M -90 -40 L -20 -40 L 60 -100 L 60 100 L -20 40 L -90 40 Z" fill={RbR} stroke={NBK} strokeWidth={7} strokeLinejoin="round" />{[0, 1, 2].map((m) => { const u = ((k * 1.6 + m / 3) % 1); return <path key={m} d={`M ${90 + u * 80} -60 Q ${120 + u * 100} 0 ${90 + u * 80} 60`} fill="none" stroke={RbR} strokeWidth={10 * (1 - u)} opacity={1 - u} />; })}</g>}
      </svg>
      {fq > 0 && <div style={{position: 'absolute', left: 560, top: cy + 80, zIndex: 6, transform: `scale(${fq}) rotate(-8deg)`}}><div style={{...nb(RbG, 10), borderColor: NBK, padding: '8px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 42, color: '#fff', boxShadow: `6px 6px 0 ${NBK}`}}>DÉJÀ FAIBLE</div></div>}
      {aq > 0 && <div style={{position: 'absolute', left: 60, top: cy + 230, width: 960, height: 110, zIndex: 7, transform: `scaleX(${aq})`, backgroundImage: `repeating-linear-gradient(45deg, ${RbY} 0 30px, ${NBK} 30px 60px)`, border: `6px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div style={{background: '#fff', border: `5px solid ${NBK}`, padding: '4px 30px', fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: RbR, letterSpacing: 6}}>ATTENTION</div></div>}
      <RbChip x={300} y={cy - 470} w={420} at={budg} l="Couper les budgets" c={RbN} ic="Scissors" fs={30} fill />
      <RbChip x={420} y={cy + 30} w={520} at={maint} out={att} l="Maintenance des alarmes" c={RbO} ic="Wrench" fs={28} fill />
    </>
  );
};

/* ═════════════ 23. Sacraliser les moyens de maîtrise : le bouclier sur son socle doré, le pense-bête, puis la ligne fragile entre l'activité et le désastre ═════════════ */
const RbSacred: React.FC<{cy: number; at: number; sac: number; pense: number}> = ({cy, at, sac, pense}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const sq = t > sac ? Math.min(1, sp(t, sac, 8, 10)) : 0;
  const pq = t > pense ? Math.min(1, sp(t, pense, 9, 9)) : 0;
  return (
    <>
      <div style={{position: 'absolute', left: 60, top: cy - 430, width: 130, height: 130, borderRadius: 30, background: RbO, border: `7px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 86, color: '#fff', transform: `scale(${Math.min(1, sp(t, at, 9, 10))})`, zIndex: 6, boxSizing: 'border-box'}}>2</div>
      {sq > 0 && <RbRays at={sac} cx={540} cy={cy - 60} />}
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 4}}>
        <g transform={`translate(540 ${cy + 260})`}><path d="M -230 0 L 230 0 L 190 -70 L -190 -70 Z" fill={RbGold} stroke={NBK} strokeWidth={7} /><rect x={-160} y={-110} width={320} height={40} fill={hexMix(RbGold, '#FFFFFF', 0.3)} stroke={NBK} strokeWidth={6} /></g>
        <g transform={`translate(540 ${cy - 80 - sq * 20}) scale(${0.6 + 0.4 * sq})`}><path d="M 0 -230 L 190 -160 L 190 10 Q 190 160 0 240 Q -190 160 -190 10 L -190 -160 Z" fill={RbB} stroke={NBK} strokeWidth={10} /><path d="M 0 -170 L 130 -120 L 130 10 Q 130 120 0 180 Z" fill="#fff" opacity={0.25} /><path d="M -70 0 l 50 55 l 100 -110" fill="none" stroke="#fff" strokeWidth={26} strokeLinecap="round" strokeLinejoin="round" /></g>
        {sq > 0 && <ellipse cx={540} cy={cy - 360} rx={170} ry={36} fill="none" stroke={RbY} strokeWidth={12} opacity={sq} />}
      </svg>
      {pq > 0 && <div style={{position: 'absolute', left: 700, top: cy - 230, zIndex: 6, transform: `scale(${pq}) rotate(${8 + Math.sin(k * 3) * 3}deg)`}}><div style={{width: 230, height: 210, background: RbY, border: `5px solid ${NBK}`, boxShadow: `6px 6px 0 ${NBK}`, padding: 16, boxSizing: 'border-box', fontFamily: handFont, fontSize: 36, color: NBK, lineHeight: 1.1}}>Penser au risque brut !</div></div>}
      <RbChip x={540} y={cy + 360} w={600} at={sac} out={pense} l="Sacraliser les moyens de maîtrise" c={RbGold} ic="Award" fs={28} fill />
      <RbChip x={540} y={cy + 360} w={420} at={pense} l="Un pense-bête permanent" c={RbN} ic="PenLine" fs={28} fill />
    </>
  );
};
const RbLine: React.FC<{cy: number; at: number; des: number; rig: number; lax: number; long: number}> = ({cy, at, des, rig, lax, long}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const dq = t > des ? Math.min(1, sp(t, des, 8, 11)) : 0;
  const lq = prog(t, lax, lax + 2.5, easeInOut);
  const crack = prog(t, long, long + 0.6, easeOut);
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 4}}>
        <rect x={40} y={460} width={500} height={920} fill="#EAF6EE" opacity={dq} />
        <rect x={540} y={460} width={500} height={920} fill="#2B2F3A" opacity={dq} />
        {dq > 0 && Array.from({length: 16}, (_, i) => { const x = 560 + random(`st${i}`) * 460, y = 470 + ((k * 500 + random(`sy${i}`) * 900) % 900); return <line key={i} x1={x} y1={y} x2={x - 10} y2={y + 40} stroke="#8FB3E8" strokeWidth={4} opacity={0.7 * dq} />; })}
        {dq > 0 && <g transform={`translate(${290} ${cy + 200})`} opacity={dq}><rect x={-140} y={-160} width={280} height={160} fill="#DDE6F2" stroke={NBK} strokeWidth={6} />{[-90, -30, 30, 90].map((x) => <rect key={x} x={x - 20} y={-260} width={40} height={100} fill={RbSl} stroke={NBK} strokeWidth={5} />)}</g>}
        {dq > 0 && <g opacity={dq}><path d={`M 780 ${cy - 300} l -60 140 l 50 0 l -60 150`} fill="none" stroke={RbY} strokeWidth={14} strokeLinejoin="round" opacity={0.5 + 0.5 * Math.sin(k * 9)} /></g>}
        <g transform={`translate(540 ${cy})`}><rect x={-22} y={-440} width={44} height={880} rx={18} fill={hexMix(RbB, '#9AA7B8', lq)} stroke={NBK} strokeWidth={6} opacity={1 - 0.35 * lq} />{crack > 0 && <path d="M -10 -300 l 18 60 l -20 50 l 22 70 l -16 60 l 18 80 l -20 70" fill="none" stroke={NBK} strokeWidth={6} pathLength={1} strokeDasharray={`${crack} 1`} />}{lq > 0 && Array.from({length: 18}, (_, i) => <circle key={i} cx={(random(`du${i}`) - 0.5) * 50} cy={-420 + random(`dv${i}`) * 840} r={3 + random(`dr${i}`) * 5} fill="#9A8B6E" opacity={lq * 0.8} />)}</g>
      </svg>
      {[0, 1, 2].map((i) => { const q = t > rig + i * 0.18 ? Math.min(1, sp(t, rig + i * 0.18, 10, 10)) : 0; return <div key={i} style={{position: 'absolute', left: 120, top: cy - 380 + i * 90, display: 'flex', alignItems: 'center', gap: 12, zIndex: 6, transform: `scale(${q})`, transformOrigin: '0% 50%'}}><div style={{width: 56, height: 56, borderRadius: 12, background: RbG, border: `5px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box'}}><Ico n="Check" size={36} c="#fff" /></div><div style={{width: [180, 220, 160][i], height: 18, borderRadius: 9, background: '#9AA7B8'}} /></div>; })}
      <RbChip x={290} y={cy + 360} w={360} at={des} out={lax} l="L'activité" c={RbG} ic="Factory" fs={28} fill />
      <RbChip x={790} y={cy + 360} w={360} at={des + 0.2} out={lax} l="Le désastre" c={RbR} ic="Zap" fs={28} fill />
      <RbChip x={540} y={cy + 360} w={480} at={lax} l="Le laxisme s'installe" c={RbSl} ic="Hourglass" fs={28} fill />
    </>
  );
};

/* ═════════════ 24. Un langage commun : la réunion, « faible » contre « important », dialogue de sourds, puis les mots brut et net posés sur la table ═════════════ */
const RbMeeting: React.FC<{cy: number; at: number; lang: number; reun: number; un: number; low: number; soft: number; aut: number; high: number; fine: number; sourd: number; mots: number; same: number}> = ({cy, at, lang, reun, un, low, soft, aut, high, fine, sourd, mots, same}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const rq = t > reun ? Math.min(1, sp(t, reun, 8, 11)) : 0;
  const lq = t > low ? Math.min(1, sp(t, low, 9, 10)) : 0, hq = t > high ? Math.min(1, sp(t, high, 9, 10)) : 0;
  const sd = t > sourd ? Math.sin((t - sourd) * 14) * 30 * Math.exp(-(t - sourd) * 1.5) : 0;
  const mq = t > mots ? Math.min(1, sp(t, mots, 9, 10)) : 0;
  const merge = prog(t, same - 0.2, same + 0.5, easeInOut);
  const tx = 540, ty = cy + 160;
  return (
    <>
      <div style={{position: 'absolute', left: 60, top: cy - 430, width: 130, height: 130, borderRadius: 30, background: RbV, border: `7px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 86, color: '#fff', transform: `scale(${Math.min(1, sp(t, at, 9, 10))})`, zIndex: 6, boxSizing: 'border-box'}}>3</div>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 4}}>
        <g opacity={rq}><ellipse cx={tx} cy={ty} rx={380 * rq} ry={120 * rq} fill="#B5835A" stroke={NBK} strokeWidth={8} /><ellipse cx={tx} cy={ty - 10} rx={340 * rq} ry={96 * rq} fill="#C99A6E" /></g>
        {rq > 0 && <><RbPerson x={180} y={ty + 40} c={RbG} s={1.4} skin={RBSK[1]} /><RbPerson x={900} y={ty + 40} c={RbR} s={1.4} skin={RBSK[2]} /></>}
        {t > sourd && t < mots && <g>{[180, 900].map((x, i) => <g key={i} transform={`translate(${x + (i ? -70 : 70)} ${ty - 120})`}><circle r={30} fill="#fff" stroke={NBK} strokeWidth={5} /><path d="M -8 -12 Q 10 -14 10 4 Q 10 14 0 16" fill="none" stroke={NBK} strokeWidth={5} /><line x1={-26} y1={-26} x2={26} y2={26} stroke={RbR} strokeWidth={8} /></g>)}</g>}
      </svg>
      <div style={{position: 'absolute', left: lerp(80, 290, merge), top: cy - 300 + sd * 0.3, width: 420, zIndex: 6, transform: `scale(${lq}) translateX(${sd}px)`, opacity: 1 - merge}}><div style={{...nb('#fff', 22), borderColor: NBK, boxShadow: `7px 7px 0 ${RbG}`, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 10}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: RbG}}>Risque faible</div><div style={{display: 'flex', alignItems: 'center', gap: 8, fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: INK, opacity: t > soft ? 1 : 0}}><Ico n="Laptop" size={30} c={RbG} />Logiciel de contrôle</div></div></div>
      <div style={{position: 'absolute', left: lerp(580, 370, merge), top: cy - 160 - sd * 0.3, width: 420, zIndex: 6, transform: `scale(${hq}) translateX(${-sd}px)`, opacity: 1 - merge}}><div style={{...nb('#fff', 22), borderColor: NBK, boxShadow: `7px 7px 0 ${RbR}`, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 10}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: RbR}}>Risque important</div><div style={{display: 'flex', alignItems: 'center', gap: 8, fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: INK, opacity: t > fine ? 1 : 0}}><Ico n="Gavel" size={30} c={RbR} />Amendes, contrôle fiscal</div></div></div>
      {merge > 0 && <div style={{position: 'absolute', left: 540 - 260, top: cy - 280, width: 520, zIndex: 7, transform: `scale(${merge})`}}><div style={{...nb('#fff', 22), borderColor: NBK, boxShadow: `7px 7px 0 ${RbN}`, padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16}}><div style={{...nb(RbR, 8), borderColor: NBK, padding: '4px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: '#fff'}}>BRUT</div><div style={{...nb(RbG, 8), borderColor: NBK, padding: '4px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: '#fff'}}>NET</div><Ico n="CircleCheckBig" size={54} c={RbG} /></div></div>}
      {mq > 0 && merge < 1 && [['BRUT', RbR, 430], ['NET', RbG, 650]].map(([l, c, x], i) => <div key={i} style={{position: 'absolute', left: (x as number) - 80, top: ty - 40 - (1 - mq) * 300, width: 160, display: 'flex', justifyContent: 'center', zIndex: 7, transform: `rotate(${(i ? 6 : -6) * mq}deg)`}}><div style={{...nb(c as string, 10), borderColor: NBK, boxShadow: `5px 5px 0 ${NBK}`, padding: '6px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff'}}>{l as string}</div></div>)}
      <RbChip x={620} y={cy - 470} w={480} at={lang} l="Un langage commun" c={RbV} ic="MessageCircle" fs={30} fill />
      <RbChip x={540} y={cy + 420} w={480} at={sourd} out={mots} l="Dialogue de sourds" c={RbR} ic="Ear" fs={30} fill />
      <RbChip x={540} y={cy + 420} w={480} at={mots} l="Poser les mots" c={RbN} ic="BookOpen" fs={30} fill />
      {un > 0 ? null : null}{aut > 0 ? null : null}
    </>
  );
};

/* ═════════════ 25. Une boucle continue : la case cochée une fois est barrée, la boucle des quatre temps tourne, l'année suivante relance ═════════════ */
const RbLoop: React.FC<{cy: number; at: number; vivre: number; casee: number; loop: number; st: number[]}> = ({cy, at, vivre, casee, loop, st}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const cq = t > casee ? Math.min(1, sp(t, casee, 9, 10)) : 0;
  const xq = prog(t, casee + 0.6, casee + 0.9, easeOut);
  const lq = prog(t, loop - 0.4, loop + 0.6, easeInOut);
  const cx = 540, ccy = cy + 60, R = 280;
  const N: [string, string, string][] = [['Évaluer le brut', 'Flame', RbR], ['Déployer les contrôles', 'Shield', RbB], ['Vérifier le net', 'ShieldCheck', RbG], ["L'année suivante", 'CalendarSync', RbT]];
  const comet = t > loop ? ((t - loop) * 0.35) % 1 : 0;
  return (
    <>
      {(() => { const s0 = at + 0.7; const mq = t > s0 ? Math.min(1, sp(t, s0, 9, 11)) : 0; const xq = 1 - prog(t, casee - 0.15, casee + 0.2, easeIn); if (mq * xq <= 0.001) return null; const X0 = 170, X1 = 910, base = cy - 150; const beat = (x: number) => { const p = (((x - X0) % 200) + 200) % 200 / 200; if (p > 0.1 && p < 0.18) return -14 * Math.sin(((p - 0.1) / 0.08) * Math.PI); if (p >= 0.28 && p < 0.31) return 14 * ((p - 0.28) / 0.03); if (p >= 0.31 && p < 0.35) return lerp(14, -120, (p - 0.31) / 0.04); if (p >= 0.35 && p < 0.39) return lerp(-120, 34, (p - 0.35) / 0.04); if (p >= 0.39 && p < 0.42) return lerp(34, 0, (p - 0.39) / 0.03); if (p > 0.55 && p < 0.7) return -26 * Math.sin(((p - 0.55) / 0.15) * Math.PI); return 0; }; const u = ((t - s0) / 2.4) % 1; const hx = X0 + u * (X1 - X0); const cur: string[] = [], old: string[] = []; for (let x = X0; x <= X1; x += 4) { if (x <= hx) cur.push(`${x},${base + beat(x)}`); else if (x > hx + 50 && t - s0 > 2.4) old.push(`${x},${base + beat(x)}`); } return <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, zIndex: 5, transform: `scale(${mq * xq})`, transformOrigin: `540px ${cy - 150}px`}}>
        <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
          <rect x={130} y={cy - 330} width={820} height={330} rx={26} fill="#0B1220" stroke={NBK} strokeWidth={9} />
          {Array.from({length: 9}, (_, i) => <line key={`v${i}`} x1={170 + i * 92.5} y1={cy - 310} x2={170 + i * 92.5} y2={cy - 20} stroke="#1E3A2E" strokeWidth={2} />)}
          {Array.from({length: 4}, (_, i) => <line key={`h${i}`} x1={150} y1={cy - 300 + i * 90} x2={930} y2={cy - 300 + i * 90} stroke="#1E3A2E" strokeWidth={2} />)}
          {old.length > 1 && <polyline points={old.join(' ')} fill="none" stroke={RbG} strokeWidth={6} opacity={0.3} strokeLinejoin="round" />}
          {cur.length > 1 && <polyline points={cur.join(' ')} fill="none" stroke="#4ADE80" strokeWidth={7} strokeLinejoin="round" style={{filter: 'drop-shadow(0 0 8px #4ADE80)'}} />}
          <circle cx={hx} cy={base + beat(hx)} r={11} fill="#fff" style={{filter: 'drop-shadow(0 0 12px #4ADE80)'}} />
        </svg>
        <div style={{position: 'absolute', left: 160, top: cy - 315, display: 'flex', transform: `scale(${1 + 0.12 * Math.max(0, Math.sin(k * 5.2))})`}}><Ico n="HeartPulse" size={54} c="#F87171" /></div>
      </div>; })()}
      {lq < 1 && <div style={{position: 'absolute', left: 540 - 130, top: cy - 300, width: 260, height: 260, zIndex: 6, transform: `scale(${cq * (1 - lq)})`}}><div style={{width: 260, height: 260, borderRadius: 40, background: '#fff', border: `12px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}><Ico n="Check" size={200} c={RbG} />{xq > 0 && <svg width={260} height={260} style={{position: 'absolute', left: -12, top: -12}}><line x1={30} y1={30} x2={30 + 200 * xq} y2={30 + 200 * xq} stroke={RbR} strokeWidth={22} strokeLinecap="round" /><line x1={230} y1={30} x2={230 - 200 * xq} y2={30 + 200 * xq} stroke={RbR} strokeWidth={22} strokeLinecap="round" /></svg>}</div></div>}
      {lq > 0 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 4, opacity: lq}}>
        <circle cx={cx} cy={ccy} r={R} fill="none" stroke="#DDE2EA" strokeWidth={36} />
        <circle cx={cx} cy={ccy} r={R} fill="none" stroke={RbT} strokeWidth={20} pathLength={1} strokeDasharray={`${lq} 1`} transform={`rotate(-90 ${cx} ${ccy})`} />
        {[0, 1, 2, 3].map((i) => { const a = -Math.PI / 2 + (i / 4) * Math.PI * 2 + Math.PI / 4; return <path key={i} d={`M ${cx + Math.cos(a) * R - 18} ${ccy + Math.sin(a) * R - 18} l 36 18 l -36 18 z`} fill={RbT} transform={`rotate(${(a * 180) / Math.PI + 90} ${cx + Math.cos(a) * R} ${ccy + Math.sin(a) * R})`} />; })}
        {t > loop && Array.from({length: 10}, (_, m) => { const u = comet - m * 0.012; const a = -Math.PI / 2 + u * Math.PI * 2; return <circle key={m} cx={cx + Math.cos(a) * R} cy={ccy + Math.sin(a) * R} r={20 - m * 1.6} fill={m ? RbY : '#fff'} stroke={m ? undefined : NBK} strokeWidth={4} opacity={1 - m / 10} />; })}
        <text x={cx} y={ccy + 20} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={54} fill={RbT}>CONTINU</text>
      </svg>}
      {N.map(([l, ic, c], i) => { const a = -Math.PI / 2 + (i / 4) * Math.PI * 2; const q = t > st[i] ? Math.min(1, sp(t, st[i], 9, 10)) : 0; const x = cx + Math.cos(a) * R, y = ccy + Math.sin(a) * R; return <div key={i} style={{position: 'absolute', left: x - 120, top: y - 60, width: 240, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, transform: `scale(${q})`, zIndex: 6}}><div style={{width: 96, height: 96, borderRadius: 48, background: c, border: `6px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box'}}><Ico n={ic} size={52} c="#fff" /></div><div style={{...nb('#fff', 6), borderColor: NBK, padding: '2px 10px', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK, whiteSpace: 'nowrap'}}>{l}</div></div>; })}
      <RbChip x={540} y={cy - 470} w={480} at={vivre} out={casee} l="Vivre avec le risque" c={RbT} ic="HeartPulse" fs={30} fill />
      <RbChip x={540} y={cy - 470} w={520} at={casee} out={loop} l="Une case cochée une fois ?" c={RbR} ic="CircleHelp" fs={28} fill />
      <RbChip x={540} y={cy - 470} w={440} at={loop} l="Une boucle continue" c={RbT} ic="RefreshCw" fs={30} fill />
    </>
  );
};

/* ═════════════ 26. Le bouclier s'entretient : la météo change, de nouvelles menaces surgissent, la clé polit le bouclier ═════════════ */
const RbMaintain: React.FC<{cy: number; at: number; env: number; nouv: number; entr: number}> = ({cy, at, env, nouv, entr}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const eq = prog(t, env, env + 0.8, easeInOut);
  const wq = prog(t, entr, entr + 0.4, easeOut);
  const pol = t > entr ? Math.sin((t - entr) * 10) : 0;
  const TH: [string, number][] = [['Zap', 0], ['Flame', 1], ['Radiation', 2], ['Siren', 3], ['TriangleAlert', 4]];
  return (
    <>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${hexMix('#FFF6D8', '#3A4558', eq)}, transparent 70%)`, opacity: 0.6, zIndex: 2}} />
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 4}}>
        <g transform={`translate(${lerp(840, 980, eq)} ${cy - 360})`} opacity={1 - eq}><circle r={70} fill={RbY} stroke={NBK} strokeWidth={6} /></g>
        {eq > 0 && <g transform={`translate(${lerp(1100, 800, eq)} ${cy - 380})`}><ellipse cx={0} cy={0} rx={120} ry={60} fill="#7D8899" stroke={NBK} strokeWidth={6} /><ellipse cx={-70} cy={20} rx={80} ry={46} fill="#9AA5B4" stroke={NBK} strokeWidth={6} /></g>}
        <g transform={`translate(540 ${cy + 20})`}><path d="M 0 -220 L 180 -150 L 180 10 Q 180 150 0 230 Q -180 150 -180 10 L -180 -150 Z" fill={RbB} stroke={NBK} strokeWidth={10} /><path d="M -60 0 l 44 48 l 90 -96" fill="none" stroke="#fff" strokeWidth={24} strokeLinecap="round" strokeLinejoin="round" /></g>
        {wq > 0 && <g transform={`translate(${700 + pol * 60} ${cy - 40 + pol * 20}) rotate(${-30 + pol * 15})`}><rect x={-14} y={-20} width={150} height={40} rx={12} fill={RbSl} stroke={NBK} strokeWidth={5} /><path d="M -14 -40 a 40 40 0 1 0 0 80 l 0 -22 l 22 0 l 0 -36 l -22 0 z" fill={RbSl} stroke={NBK} strokeWidth={5} /></g>}
      </svg>
      {TH.map(([ic, i]) => { const q = t > nouv + i * 0.15 ? Math.min(1, sp(t, nouv + i * 0.15, 9, 10)) : 0; const a = -Math.PI * 0.9 + (i / 4) * Math.PI * 0.8 - Math.PI * 0.05; const x = 540 + Math.cos(a) * 380, y = cy + 20 + Math.sin(a) * 300 + 340; return <div key={ic} style={{position: 'absolute', left: x - 50, top: y - 50, width: 100, height: 100, borderRadius: 26, background: RbR, border: `6px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${q}) translateY(${Math.sin(k * 4 + i) * 8}px)`, zIndex: 5, boxSizing: 'border-box'}}><Ico n={ic} size={54} c="#fff" /></div>; })}
      <RbChip x={540} y={cy - 470} w={480} at={env} out={entr} l="L'environnement change" c={RbSl} ic="CloudSun" fs={30} fill />
      <RbChip x={540} y={cy - 470} w={540} at={entr} l="Un bouclier s'entretient" c={RbB} ic="Wrench" fs={30} fill />
    </>
  );
};

/* ═════════════ 27. Des montagnes de fichiers, puis un logiciel dédié : historique, pilotage des contrôles, niveau de protection ═════════════ */
const RbFiles: React.FC<{cy: number; at: number; noy: number}> = ({cy, at, noy}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const wq = prog(t, noy, noy + 1.5, easeIn);
  return (
    <>
      {Array.from({length: 4}, (_, s) => Array.from({length: 9}, (_, m) => { const d = at + 0.1 + s * 0.1 + m * 0.12; const q = prog(t, d, d + 0.3, easeIn); const x = 150 + s * 240, y = cy + 300 - m * 74; return q > 0 ? <div key={`${s}${m}`} style={{position: 'absolute', left: x + Math.sin(k * 2 + m + s) * 6 * wq, top: lerp(y - 600, y, q), width: 190, height: 66, ...nb(['#fff', '#FFF8DA', '#EAF2FF'][m % 3], 8), borderColor: NBK, display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 12, zIndex: 4, transform: `rotate(${(random(`fr${s}${m}`) - 0.5) * 10}deg)`, boxSizing: 'border-box'}}><Ico n="FileText" size={34} c={RbSl} /><div style={{width: 90, height: 10, borderRadius: 5, background: '#C6CDD8'}} /></div> : null; }))}
      <div style={{position: 'absolute', left: 40, top: lerp(1400, cy - 80, wq), width: 1000, height: 600, zIndex: 5, background: `linear-gradient(180deg, rgba(31,91,216,0.55), rgba(11,46,107,0.85))`, borderTop: `8px solid ${RbB}`}} />
      <RbChip x={540} y={cy - 470} w={560} at={noy} l="Noyé sous les fichiers" c={RbN} ic="Files" fs={30} fill />
    </>
  );
};
const RbSoftware: React.FC<{cy: number; at: number; trace: number; pil: number; niv: number; garde: number}> = ({cy, at, trace, pil, niv, garde}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const wq = Math.min(1, sp(t, at, 8, 12));
  const tq = prog(t, trace, trace + 1.2, easeInOut);
  const gq = t > garde ? Math.min(1, sp(t, garde, 9, 10)) : 0;
  const nv = lerp(0.2, 0.86, prog(t, niv - 0.4, niv + 0.6, easeOut));
  const pts = Array.from({length: 9}, (_, i) => [40 + i * 52, 150 - [20, 40, 30, 60, 55, 80, 75, 100, 110][i]] as [number, number]);
  return (
    <>
      <div style={{position: 'absolute', left: 70, top: cy - 420, width: 940, height: 740, ...nb('#F7F9FC', 18), borderColor: NBK, boxShadow: `10px 10px 0 ${RbN}`, overflow: 'hidden', zIndex: 4, transform: `perspective(1600px) rotateX(${(1 - wq) * 25}deg) scale(${0.8 + 0.2 * wq})`, opacity: wq}}>
        <div style={{height: 60, background: RbN, display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 20}}>{[RbR, RbY, RbG].map((c) => <div key={c} style={{width: 18, height: 18, borderRadius: 9, background: c}} />)}<div style={{marginLeft: 16, fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', display: 'flex', alignItems: 'center', gap: 10}}><Ico n="ShieldCheck" size={30} c={RbY} />Gestion des risques</div></div>
        <div style={{display: 'flex', height: 680}}>
          <div style={{width: 170, background: '#E9EEF6', borderRight: `4px solid ${NBK}`, padding: 18, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 18}}>{['Flame', 'Shield', 'ShieldCheck', 'ChartColumn', 'History'].map((ic, i) => <div key={ic} style={{width: 120, height: 62, borderRadius: 12, background: i === Math.floor(k) % 5 ? RbB : '#fff', border: `3px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n={ic} size={34} c={i === Math.floor(k) % 5 ? '#fff' : RbN} /></div>)}</div>
          <div style={{flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 20}}>
            <div style={{height: 220, ...nb('#fff', 12), borderColor: NBK, position: 'relative'}}><div style={{position: 'absolute', left: 16, top: 10, fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: RbSl}}>Historique</div><svg width={560} height={200} style={{position: 'absolute', left: 50, top: 20}}><path d={pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${x} ${y}`).join(' ')} fill="none" stroke={RbB} strokeWidth={7} strokeLinejoin="round" pathLength={1} strokeDasharray={`${tq} 1`} />{pts.map(([x, y], i) => i / 8 <= tq ? <circle key={i} cx={x} cy={y} r={8} fill="#fff" stroke={NBK} strokeWidth={4} /> : null)}</svg></div>
            <div style={{display: 'flex', gap: 20}}>
              <div style={{flex: 1, height: 300, ...nb('#fff', 12), borderColor: NBK, padding: 20, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 24}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: RbSl}}>Contrôles</div>{[0, 1, 2].map((i) => { const on = t > pil + i * 0.25; return <div key={i} style={{display: 'flex', alignItems: 'center', gap: 14}}><div style={{width: 84, height: 40, borderRadius: 20, background: on ? RbG : '#C6CDD8', border: `4px solid ${NBK}`, position: 'relative', boxSizing: 'border-box'}}><div style={{position: 'absolute', top: 2, left: on ? 44 : 2, width: 28, height: 28, borderRadius: 14, background: '#fff', border: `3px solid ${NBK}`, boxSizing: 'border-box'}} /></div><div style={{width: [120, 90, 140][i], height: 14, borderRadius: 7, background: '#C6CDD8'}} /></div>; })}</div>
              <div style={{width: 280, height: 300, ...nb('#fff', 12), borderColor: NBK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><svg width={260} height={190}><RbGauge x={130} y={150} r={110} v={nv} /></svg><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: RbSl}}>Niveau de protection</div></div>
            </div>
          </div>
        </div>
      </div>
      {gq > 0 && <div style={{position: 'absolute', left: 860, top: cy - 520, zIndex: 7, transform: `scale(${gq}) rotate(${(1 - gq) * -40}deg)`}}><div style={{width: 150, height: 150, borderRadius: 40, background: RbG, border: `7px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `6px 6px 0 ${NBK}`}}><Ico n="ShieldCheck" size={96} c="#fff" /></div></div>}
      <RbChip x={540} y={cy + 400} w={560} at={at + 0.3} l="Un logiciel dédié" c={RbB} ic="Laptop" fs={30} fill />
    </>
  );
};

/* ═════════════ 28. Avancer en toute sécurité : le chemin traverse des dangers balisés, chacun identifié et cadenassé ═════════════ */
const RbCoexist: React.FC<{cy: number; at: number; elim: number; surf: number; avan: number; ident: number}> = ({cy, at, elim, surf, avan, ident}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const gq = t > elim ? Math.min(1, sp(t, elim, 8, 11)) : 0;
  const gout = prog(t, avan - 0.6, avan, easeIn);
  const wq = prog(t, avan, avan + 3.2, easeInOut);
  const P: [number, number][] = [[120, cy + 360], [420, cy + 200], [300, cy - 20], [660, cy - 120], [900, cy - 360]];
  const bez = (u: number): [number, number] => { const n = P.length - 1; const s = u * n; const i = Math.min(n - 1, Math.floor(s)), f = s - i; return [lerp(P[i][0], P[i + 1][0], f), lerp(P[i][1], P[i + 1][1], f)]; };
  const [wx, wy] = bez(wq);
  const HZ: [number, number, string][] = [[640, cy + 260, 'Flame'], [140, cy + 60, 'Radiation'], [520, cy - 260, 'Zap'], [880, cy - 40, 'TriangleAlert']];
  return (
    <>
      {gout < 1 && gq > 0 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 5, opacity: 1 - gout}}><g transform={`translate(540 ${cy - 40}) scale(${gq})`}><circle r={230} fill="#DDEBFF" stroke={NBK} strokeWidth={8} />{[-0.5, 0, 0.5].map((l) => <ellipse key={l} cy={-Math.sin(l) * 230} rx={230 * Math.cos(l)} ry={40} fill="none" stroke={RbB} strokeWidth={3} />)}{Array.from({length: 7}, (_, i) => { const a = (i / 7) * Math.PI * 2 + k; return <g key={i} transform={`translate(${Math.cos(a) * 170} ${Math.sin(a) * 120})`}><circle r={26} fill={RbR} stroke={NBK} strokeWidth={4} /></g>; })}{t > surf && <g><line x1={-260} y1={-260} x2={260} y2={260} stroke={RbR} strokeWidth={26} strokeLinecap="round" /><line x1={260} y1={-260} x2={-260} y2={260} stroke={RbR} strokeWidth={26} strokeLinecap="round" /></g>}</g></svg>}
      {gout > 0 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 4, opacity: gout}}>
        <path d={P.map(([x, y], i) => `${i ? 'L' : 'M'} ${x} ${y}`).join(' ')} fill="none" stroke="#DDE2EA" strokeWidth={60} strokeLinecap="round" strokeLinejoin="round" />
        <path d={P.map(([x, y], i) => `${i ? 'L' : 'M'} ${x} ${y}`).join(' ')} fill="none" stroke={RbG} strokeWidth={14} strokeDasharray="24 18" strokeLinecap="round" strokeLinejoin="round" />
        {HZ.map(([x, y], i) => { const iq = t > ident + i * 0.1 ? Math.min(1, sp(t, ident + i * 0.1, 9, 10)) : 0; return <g key={i}><rect x={x - 90} y={y - 80} width={180} height={160} rx={18} fill="none" stroke={NBK} strokeWidth={6} strokeDasharray="1 0" /><rect x={x - 90} y={y - 80} width={180} height={160} rx={18} fill="none" stroke={RbY} strokeWidth={14} strokeDasharray="20 20" opacity={0.9} />{iq > 0 && <g transform={`translate(${x + 70} ${y - 70}) scale(${iq})`}><circle r={30} fill={RbG} stroke={NBK} strokeWidth={5} /><rect x={-12} y={-6} width={24} height={20} rx={4} fill="#fff" /><path d="M -8 -6 L -8 -14 A 8 8 0 0 1 8 -14 L 8 -6" fill="none" stroke="#fff" strokeWidth={4} /></g>}</g>; })}
        <g transform={`translate(${wx} ${wy - 20})`}><RbPerson x={0} y={0} c={RbB} s={1.0} helmet={RbY} /></g>
      </svg>}
      {gout > 0 && HZ.map(([x, y, ic], i) => <div key={i} style={{position: 'absolute', left: x - 44, top: y - 44, width: 88, height: 88, borderRadius: 22, background: RbR, border: `5px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, opacity: gout, boxSizing: 'border-box'}}><Ico n={ic} size={50} c="#fff" /></div>)}
      <RbChip x={540} y={cy - 470} w={520} at={elim} out={avan} l="Éliminer toute menace ?" c={RbR} ic="Globe" fs={30} fill />
      <RbChip x={540} y={cy - 470} w={560} at={avan} l="Avancer en toute sécurité" c={RbG} ic="Footprints" fs={30} fill />
      {t > ident && <RbScramble text="IDENTIFIÉS · MAÎTRISÉS" at={ident + 0.1} y={cy + 385} c={RbG} size={44} />}
    </>
  );
};

/* ═════════════ 29. Le gouffre sous le filet : tableau de bord tout vert, la caméra descend, un filet tendu au-dessus de l'abîme, l'équipe s'endort ═════════════ */
const RbAbyss: React.FC<{cy: number; at: number; ult: number; dash: number; vert: number; gouf: number; filet: number; dort: number}> = ({cy, at, ult, dash, vert, gouf, filet, dort}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const dq = t > dash ? Math.min(1, sp(t, dash, 8, 11)) : 0;
  const pan = prog(t, gouf - 0.3, gouf + 1.4, easeInOut);
  const fq = t > filet ? Math.min(1, sp(t, filet, 9, 10)) : 0;
  const zq = t > dort ? 1 : 0;
  const off = -pan * 560;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 3}}>
        <defs><clipPath id="rbAbC"><rect x={40} y={456} width={1000} height={930} /></clipPath><radialGradient id="rbAbG" cx="0.5" cy="0.2" r="0.9"><stop offset="0%" stopColor="#1E2A44" /><stop offset="100%" stopColor="#020308" /></radialGradient></defs>
        <g clipPath="url(#rbAbC)"><g transform={`translate(0 ${off})`}>
          <rect x={40} y={cy + 230} width={1000} height={1200} fill="url(#rbAbG)" />
          {Array.from({length: 7}, (_, i) => <path key={i} d={`M ${40 + i * 160} ${cy + 230} l 60 ${200 + (i % 3) * 120} l -40 ${150 + (i % 2) * 120}`} fill="none" stroke="#3A4558" strokeWidth={6} />)}
          <path d={`M 40 ${cy + 230} L 300 ${cy + 230} L 260 ${cy + 1400} L 40 ${cy + 1400} Z`} fill="#4B3B2B" />
          <path d={`M 780 ${cy + 230} L 1040 ${cy + 230} L 1040 ${cy + 1400} L 820 ${cy + 1400} Z`} fill="#4B3B2B" />
          <g opacity={fq}>{Array.from({length: 12}, (_, i) => <line key={i} x1={300 + i * 44} y1={cy + 300} x2={300 + i * 44 + 30} y2={cy + 360 + Math.sin(i) * 10} stroke="#E6D3A0" strokeWidth={4} />)}{Array.from({length: 4}, (_, i) => <path key={`h${i}`} d={`M 300 ${cy + 300 + i * 18} Q 540 ${cy + 360 + i * 18} 780 ${cy + 300 + i * 18}`} fill="none" stroke="#E6D3A0" strokeWidth={4} />)}</g>
        </g></g>
      </svg>
      <div style={{position: 'absolute', left: 0, top: 456, width: 1080, height: 930, overflow: 'hidden', zIndex: 5}}>
      <div style={{position: 'absolute', left: 120, top: cy - 300 + off - 456, width: 840, height: 420, ...nb(RbN, 20), borderColor: NBK, boxShadow: `10px 10px 0 ${NBK}`, zIndex: 5, transform: `scale(${dq})`, padding: 30, boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22}}>
        {Array.from({length: 6}, (_, i) => { const on = t > vert + i * 0.12; return <div key={i} style={{...nb('#fff', 14), borderColor: NBK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}><div style={{width: 64, height: 64, borderRadius: 32, background: on ? RbG : '#C6CDD8', border: `5px solid ${NBK}`, boxShadow: on ? `0 0 ${16 + 6 * Math.sin(k * 4 + i)}px ${RbG}` : undefined}} /><div style={{width: 110, height: 12, borderRadius: 6, background: '#C6CDD8'}} /></div>; })}
      </div>
      {zq > 0 && Array.from({length: 3}, (_, i) => { const u = ((k * 0.6 + i / 3) % 1); return <div key={i} style={{position: 'absolute', left: 820 + u * 80, top: cy - 380 + off - u * 160 - 456, zIndex: 6, fontFamily: sansFont, fontWeight: 900, fontSize: 50 + i * 12, color: RbV, opacity: 1 - u}}>Z</div>; })}
      </div>
      <RbChip x={540} y={cy - 470} w={480} at={ult} out={gouf} l="Une ultime réflexion" c={RbV} ic="Lightbulb" fs={30} fill />
      <RbChip x={540} y={cy + 400} w={480} at={filet} l="Le filet de sécurité" c={RbGold} ic="Layers" fs={30} fill />
      <RbChip x={540} y={cy - 470} w={420} at={gouf} out={dort} l="Le gouffre" c={RbR} ic="TriangleAlert" fs={32} fill />
      <RbChip x={540} y={cy - 470} w={440} at={dort} l="Endormies ?" c={RbV} ic="EyeOff" fs={32} fill />
    </>
  );
};

/* ═════════════ Mot fantôme en parallaxe ═════════════ */
const RbGhost: React.FC<{n: string; c: string; at: number; end: number; fs?: number}> = ({n, c, at, end, fs = 1000}) => {
  const t = useT();
  const u = prog(t, at, end, (v: number) => v);
  const q = prog(t, at, at + 0.4, easeOut) * (1 - prog(t, end - 0.3, end, easeIn));
  return <div style={{position: 'absolute', left: 0, top: 420, width: 1080, height: 980, overflow: 'hidden', zIndex: 1, pointerEvents: 'none'}}><div style={{position: 'absolute', left: lerp(380, 300, u), top: lerp(40, 0, u), fontFamily: sansFont, fontWeight: 900, fontSize: fs, lineHeight: 1, color: 'transparent', WebkitTextStroke: `8px ${c}`, opacity: 0.14 * q, transform: `scale(${lerp(1.12, 1, u)}) rotate(${lerp(-4, 2, u)}deg)`, whiteSpace: 'nowrap'}}>{n}</div></div>;
};

/* ═════════════ Pack « 25 techniques » : caméra, lumière, texture, typographie et transitions posées sur toute la capsule ═════════════ */
const RB_IMPACT = [2.85, 8.11, 21.96, 36.26, 63.5, 76.32, 103.21, 116.19, 140.26, 153.3, 173.58, 211.49, 221.72, 253.55, 277.42, 297.4, 319.11, 343.17, 378.5, 399.6];
const RB_SCENE = [7.7, 10.75, 28.85, 38.65, 56.3, 61.6, 68.85, 79.0, 92.55, 104.0, 117.9, 131.4, 147.45, 156.0, 162.75, 177.1, 183.0, 197.0, 219.25, 235.9, 250.4, 254.55, 268.75, 283.0, 293.45, 300.55, 326.5, 343.95, 350.95, 355.0, 372.5, 380.4, 391.6, 404.95];
const RB_GYRO = [54.5, 129.6, 175.3, 234.1, 324.7, 370.7];
const rbDecay = (t: number, a: number, d = 0.35) => (t >= a && t < a + d ? 1 - (t - a) / d : 0);

/* T1 + T2 + T3 — caméra : secousse amortie sur chaque impact, travelling avant continu dans chaque scène, punch-in ciblé sur la case verrouillée */
const RbCam: React.FC<{children: React.ReactNode}> = ({children}) => {
  const t = useT();
  let sx = 0, sy = 0;
  RB_IMPACT.forEach((a, i) => { const d = rbDecay(t, a, 0.38); if (d > 0) { const u = t - a; sx += Math.sin(u * 70 + i) * 11 * d; sy += Math.cos(u * 55 + i * 2) * 8 * d; } });
  const si = RB_SCENE.reduce((acc, a, k) => (t >= a ? k : acc), -1);
  const s0 = si >= 0 ? RB_SCENE[si] : 0, s1 = si >= 0 && si + 1 < RB_SCENE.length ? RB_SCENE[si + 1] : OUTRO_AT;
  const dolly = si >= 0 ? 1 + 0.028 * prog(t, s0, s1, (v: number) => v) : 1;
  const pin = prog(t, 213.2, 213.55, easeOut) * (1 - prog(t, 214.6, 214.95, easeIn));
  const thru = prog(t, 404.7, 404.95, easeIn) * (1 - prog(t, 404.95, 405.1, easeOut));
  const tilt = si >= 0 ? (1 - prog(t, s0, s0 + 0.5, easeOut)) * 10 : 0;
  return <AbsoluteFill style={{transformOrigin: pin > 0 ? '380px 990px' : '540px 900px', transform: `perspective(1800px) rotateX(${tilt}deg) translate(${sx}px, ${sy}px) scale(${dolly * (1 + 0.1 * pin) * (1 + 0.7 * thru)})`, filter: thru > 0.02 ? `blur(${thru * 9}px)` : undefined, opacity: 1 - 0.5 * thru}}>{children}</AbsoluteFill>;
};

/* T4 — onde de choc plein écran à chaque impact */
const RbShock: React.FC = () => {
  const t = useT();
  return <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 33, pointerEvents: 'none'}}>{RB_IMPACT.map((a, i) => { const u = t - a; if (u < 0 || u > 0.6) return null; const q = u / 0.6; return <circle key={i} cx={540} cy={900} r={80 + q * 900} fill="none" stroke={RB_C[i % 9]} strokeWidth={26 * (1 - q)} opacity={0.35 * (1 - q)} />; })}</svg>;
};

/* T5 — flash blanc de coupe à l'ouverture de chaque gyrophare */
const RbFlash: React.FC = () => {
  const t = useT();
  const o = RB_GYRO.reduce((m, a) => Math.max(m, rbDecay(t, a, 0.14)), 0);
  return o > 0 ? <AbsoluteFill style={{zIndex: 36, background: '#fff', opacity: 0.7 * o, pointerEvents: 'none'}} /> : null;
};

/* T6 — fuite de lumière chaude en diagonale à l'entrée de chaque scène */
const RbLeak: React.FC = () => {
  const t = useT();
  const a = RB_SCENE.find((x) => t >= x && t < x + 0.9);
  if (a === undefined) return null;
  const q = (t - a) / 0.9;
  return <AbsoluteFill style={{zIndex: 33, pointerEvents: 'none', mixBlendMode: 'screen', opacity: Math.sin(q * Math.PI) * 0.9, background: `linear-gradient(115deg, transparent ${q * 140 - 40}%, rgba(255,196,110,0.55) ${q * 140 - 20}%, rgba(255,240,200,0.7) ${q * 140 - 12}%, rgba(255,150,90,0.35) ${q * 140 - 4}%, transparent ${q * 140 + 10}%)`}} />;
};

/* T7 — vignette dynamique : bords qui rougissent sur les moments de danger */
const RbVignette: React.FC = () => {
  const t = useT();
  const W2: [number, number][] = [[76.1, 78.6], [113.2, 117.8], [221.5, 223.6], [278.5, 282.6], [399.4, 402.2]];
  const danger = W2.reduce((m, [a, b]) => Math.max(m, prog(t, a, a + 0.2) * (1 - prog(t, b - 0.3, b))), 0);
  return <AbsoluteFill style={{zIndex: 32, pointerEvents: 'none', background: `radial-gradient(ellipse 75% 60% at 50% 50%, transparent 55%, rgba(${Math.round(lerp(20, 215, danger))},${Math.round(lerp(30, 38, danger))},${Math.round(lerp(60, 61, danger))},${0.1 + 0.25 * danger}) 100%)`}} />;
};

/* T8 — grain argentique animé sur toute l'image */
const RbGrain: React.FC = () => {
  const t = useT();
  const seed = Math.floor(t * 30) % 97;
  return <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 115, pointerEvents: 'none', opacity: 0.06, mixBlendMode: 'multiply'}}><filter id={`rbg${seed}`}><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={seed} /><feColorMatrix type="saturate" values="0" /></filter><rect width={1080} height={1920} filter={`url(#rbg${seed})`} /></svg>;
};

/* T9 — mot-choc cinétique plein écran sur le verbe de chaque principe */
const RB_SLAM: [number, string, string][] = [[58.14, 'RISQUE BRUT', RbR], [76.32, 'CATASTROPHE', RbR], [103.21, 'EXPLOSE', RbO], [140.26, 'BOUCLIERS', RbB], [153.3, 'ARMURE', RbN], [179.05, 'RISQUE NET', RbG], [213.21, 'FAIBLE', RbG], [221.72, 'PIÈGE', RbR], [253.55, 'FALAISE', RbR], [278.76, 'ATTENTION', RbO], [294.17, 'RIGUEUR', RbB], [303.33, 'LANGAGE COMMUN', RbV], [334.75, 'BOUCLE', RbT], [379.34, 'MYTHE', RbP], [399.6, 'GOUFFRE', RbN], [410.89, 'RÉSILIENTES', RbG]];
const RbSlam: React.FC = () => {
  const t = useT();
  const ghost = RB_SLAM.find(([a]) => t >= a + 0.3 && t < a + 0.95);
  const w = RB_SLAM.find(([a]) => t >= a && t < a + 0.42);
  const gEl = ghost ? (() => { const [a, l, c] = ghost; const q = prog(t, a + 0.3, a + 0.95, easeOut); return <AbsoluteFill key="g" style={{zIndex: 37, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: Math.min(190, 1650 / l.length), letterSpacing: 4, color: 'transparent', WebkitTextStroke: `3px ${c}`, transform: `scale(${1 + 0.35 * q})`, opacity: 0.55 * (1 - q), marginTop: -40}}>{l}</div></AbsoluteFill>; })() : null;
  if (!w) return gEl;
  const [a, l, c] = w;
  const u = t - a;
  const inn = prog(t, a, a + 0.1, easeOut), out = prog(t, a + 0.27, a + 0.42, easeIn);
  const fs = Math.min(190, 1650 / l.length);
  return <>{gEl}<AbsoluteFill style={{zIndex: 38, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: fs, letterSpacing: 4, color: '#fff', WebkitTextStroke: `6px ${NBK}`, textShadow: `10px 10px 0 ${c}, 20px 20px 0 ${NBK}`, transform: `translateY(${-out * 420}px) scale(${lerp(2.3, 1, inn) * (1 - 0.5 * out)}) skewX(${-8 + 8 * inn}deg)`, filter: `blur(${(1 - inn) * 10}px)`, opacity: inn * (1 - out), marginTop: -40 + u * 0}}>{l}</div></AbsoluteFill></>;
};

/* T10 — anneau de progression à neuf segments, en haut à droite */
const RbRing9: React.FC = () => {
  const t = useT();
  if (t < 2.8 || t > OUTRO_AT) return null;
  const cur = RB_GYRO.reduce((acc, a, k) => (t >= a + 0.5 ? k : acc), -1);
  const R = 46;
  const NS = RB_GYRO.length;
  const arc = (k: number) => { const a0 = -Math.PI / 2 + (k / NS) * Math.PI * 2 + 0.08, a1 = -Math.PI / 2 + ((k + 1) / NS) * Math.PI * 2 - 0.08; return `M ${Math.cos(a0) * R} ${Math.sin(a0) * R} A ${R} ${R} 0 0 1 ${Math.cos(a1) * R} ${Math.sin(a1) * R}`; };
  return <svg width={140} height={140} style={{position: 'absolute', left: 900, top: 44, zIndex: 41, opacity: pop(t, 2.8)}}><g transform="translate(70 70)"><circle r={60} fill="#fff" stroke={NBK} strokeWidth={5} /><g transform={`rotate(${t > 413.3 ? (t - 413.3) * 420 : 0})`}>{Array.from({length: NS}, (_, k) => <path key={k} d={arc(k)} fill="none" stroke={k <= cur ? RB_C[k] : '#DDE2EA'} strokeWidth={k === cur ? 14 + 3 * Math.sin(t * 8) : 12} strokeLinecap="round" />)}</g><text y={11} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={30} fill={cur >= 0 ? RB_C[cur] : RbN}>QHSE</text></g></svg>;
};

/* T11 — projecteur : tout s'assombrit sauf la case verrouillée de la matrice */
const RbSpot: React.FC = () => {
  const t = useT();
  const q = prog(t, 213.25, 213.55, easeOut) * (1 - prog(t, 214.6, 214.95, easeIn));
  if (q <= 0) return null;
  return <AbsoluteFill style={{zIndex: 33, pointerEvents: 'none', background: `radial-gradient(circle at 380px 990px, transparent ${lerp(520, 210, q)}px, rgba(8,18,40,${0.5 * q}) ${lerp(600, 280, q)}px)`}} />;
};

/* T12 — glitch numérique en tranches sur « dangereux » */
const RbGlitch: React.FC = () => {
  const t = useT();
  const g = Math.max(rbDecay(t, 23.91, 0.25), rbDecay(t, 221.72, 0.28), rbDecay(t, 319.11, 0.25), rbDecay(t, 76.32, 0.2));
  if (g <= 0) return null;
  const f = Math.floor(t * 30);
  return <AbsoluteFill style={{zIndex: 37, pointerEvents: 'none'}}>{Array.from({length: 9}, (_, i) => { const y = 460 + random(`gy${f}${i}`) * 900, h = 8 + random(`gh${f}${i}`) * 50; const dx = (random(`gx${f}${i}`) - 0.5) * 120 * g; return <div key={i} style={{position: 'absolute', left: dx, top: y, width: 1080, height: h, background: i % 2 ? 'rgba(0,220,255,0.28)' : 'rgba(255,40,80,0.28)', mixBlendMode: 'multiply'}} />; })}</AbsoluteFill>;
};

/* T13 — étincelles étoilées sur les validations */
const RB_SPARK: [number, number, number][] = [[8.6, 540, 700], [52.3, 150, 1110], [153.3, 540, 760], [174.0, 400, 1200], [214.3, 540, 1180], [323.4, 540, 640], [348.6, 540, 900], [369.6, 935, 435], [388.7, 540, 1300]];
const RbSparkle: React.FC = () => {
  const t = useT();
  return <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 37, pointerEvents: 'none'}}>{RB_SPARK.map(([a, x, y], j) => { const u = t - a; if (u < 0 || u > 0.8) return null; return Array.from({length: 8}, (_, i) => { const ang = (i / 8) * Math.PI * 2 + j; const r = 50 + u * 160; const s = Math.sin((u / 0.8) * Math.PI) * (10 + (i % 3) * 5); return <path key={`${j}${i}`} d={`M 0 ${-s * 2} L ${s * 0.45} ${-s * 0.45} L ${s * 2} 0 L ${s * 0.45} ${s * 0.45} L 0 ${s * 2} L ${-s * 0.45} ${s * 0.45} L ${-s * 2} 0 L ${-s * 0.45} ${-s * 0.45} Z`} transform={`translate(${x + Math.cos(ang) * r} ${y + Math.sin(ang) * r}) rotate(${u * 200})`} fill={i % 2 ? RbY : '#fff'} stroke={NBK} strokeWidth={2} />; }); })}</svg>;
};

/* T14 — flare anamorphique : longue traînée horizontale de lumière */
const RbFlare: React.FC = () => {
  const t = useT();
  const F: [number, number][] = [[2.85, 860], [214.3, 1000], [410.9, 900]];
  return <>{F.map(([a, y], i) => { const u = t - a; if (u < 0 || u > 0.7) return null; const q = Math.sin((u / 0.7) * Math.PI); return <div key={i} style={{position: 'absolute', left: 0, top: y - 40, width: 1080, height: 80, zIndex: 37, pointerEvents: 'none', mixBlendMode: 'screen', opacity: q}}><div style={{position: 'absolute', left: 0, top: 36, width: 1080, height: 8, background: 'linear-gradient(90deg, transparent, rgba(140,200,255,0.9) 30%, #fff 50%, rgba(140,200,255,0.9) 70%, transparent)'}} /><div style={{position: 'absolute', left: 540 - 60, top: -20, width: 120, height: 120, borderRadius: 60, background: 'radial-gradient(circle, rgba(255,255,255,0.95), rgba(255,220,150,0.4) 40%, transparent 70%)'}} />{[0.2, 0.35, 0.68, 0.82].map((f, m) => <div key={m} style={{position: 'absolute', left: f * 1080 - 22, top: 18, width: 44, height: 44, borderRadius: 22, border: `3px solid ${RB_C[m * 2]}`, opacity: 0.6}} />)}</div>; })}</>;
};

/* T15 — lignes de vitesse radiales (départ du travailleur, envol des tuiles) */
const RbSpeed: React.FC = () => {
  const t = useT();
  const W: [number, number, number, number][] = [[7.85, 8.35, 540, 760], [211.4, 212.2, 540, 1000], [253.6, 254.4, 760, 840]];
  const w = W.find(([a, b]) => t >= a && t < b);
  if (!w) return null;
  const [a, b, cx, cy] = w;
  const q = Math.sin(((t - a) / (b - a)) * Math.PI);
  const f = Math.floor(t * 30);
  return <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 33, pointerEvents: 'none', opacity: 0.5 * q}}><defs><clipPath id="rbSp"><rect x={30} y={452} width={1020} height={930} /></clipPath></defs><g clipPath="url(#rbSp)">{Array.from({length: 46}, (_, i) => { const ang = random(`sa${f}${i}`) * Math.PI * 2; const r0 = 260 + random(`sr${f}${i}`) * 200, r1 = r0 + 200 + random(`sl${f}${i}`) * 300; return <line key={i} x1={cx + Math.cos(ang) * r0} y1={cy + Math.sin(ang) * r0} x2={cx + Math.cos(ang) * r1} y2={cy + Math.sin(ang) * r1} stroke={RbN} strokeWidth={3 + (i % 3) * 2} strokeLinecap="round" />; })}</g></svg>;
};

/* T16 — volet liquide : une goutte marine aux bords ondulants avale la recherche et révèle la scène suivante */
const RbBlob: React.FC = () => {
  const t = useT();
  const a = 68.6;
  const u = t - a;
  if (u < 0 || u > 0.55) return null;
  const grow = prog(t, a, a + 0.23, easeIn), fade = prog(t, a + 0.25, a + 0.55, easeOut);
  const R = 1250 * grow + 300 * fade;
  const d = Array.from({length: 49}, (_, i) => { const th = (i / 48) * Math.PI * 2; const r = R * (1 + 0.07 * Math.sin(th * 6 + u * 18) + 0.04 * Math.sin(th * 11 - u * 25)); return `${i ? 'L' : 'M'} ${540 + Math.cos(th) * r} ${900 + Math.sin(th) * r}`; }).join(' ') + ' Z';
  return <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 34, pointerEvents: 'none', opacity: 1 - fade}}><path d={d} fill={RbN} /></svg>;
};

/* T17 — ondulation lumineuse de la grille de fond à chaque arrivée de scène */
const RbRipple: React.FC = () => {
  const t = useT();
  const k = RB_SCENE.reduce((acc, a, i) => (t >= a && t < a + 1.2 ? i : acc), -1);
  if (k < 0) return null;
  const u = t - RB_SCENE[k];
  const c = RB_C[Math.min(8, k)];
  return <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, pointerEvents: 'none'}}>{Array.from({length: 16 * 15}, (_, i) => { const x = 60 + (i % 16) * 64, y = 470 + Math.floor(i / 16) * 64; const dist = Math.hypot(x - 540, y - 900); const w = Math.max(0, 1 - Math.abs(dist - u * 900) / 90); return w > 0.02 ? <circle key={i} cx={x} cy={y} r={3 + 6 * w} fill={c} opacity={0.55 * w * (1 - u / 1.2)} /> : null; })}</svg>;
};

/* T18 — bokeh : grands disques flous de couleur qui dérivent lentement derrière tout */
const RbBokeh: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{pointerEvents: 'none'}}>{Array.from({length: 12}, (_, i) => { const x = 80 + random(`bx${i}`) * 920 + Math.sin(t * 0.3 + i) * 40, y = 500 + random(`by${i}`) * 850 + Math.cos(t * 0.25 + i * 2) * 50; const r = 50 + random(`br${i}`) * 90; return <div key={i} style={{position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: r, background: `radial-gradient(circle, ${RB_C[i % 9]}2E, ${RB_C[i % 9]}12 55%, transparent 72%)`}} />; })}</AbsoluteFill>;
};

/* T19 — texte qui se décode lettre à lettre (signes aléatoires puis la bonne lettre) */
const RbScramble: React.FC<{text: string; at: number; y: number; c: string; size?: number}> = ({text, at, y, c, size = 72}) => {
  const t = useT();
  if (t < at) return null;
  const f = Math.floor(t * 30);
  const G = '#%&@$?!*+=<>/\\';
  const s = text.split('').map((ch, i) => { const rv = at + 0.08 + i * 0.045; if (ch === ' ' || t >= rv) return ch; return G[Math.floor(random(`sc${f}${i}`) * G.length)]; }).join('');
  return <div style={{position: 'absolute', left: 0, top: y, width: 1080, display: 'flex', justifyContent: 'center', zIndex: 7}}><div style={{...nb('#fff', 10), borderColor: NBK, boxShadow: `8px 8px 0 ${c}`, padding: '6px 30px', fontFamily: 'monospace', fontWeight: 900, fontSize: size, letterSpacing: 8, color: c, opacity: pop(t, at, 0.15)}}>{s}</div></div>;
};

/* T20 — faisceaux volumétriques rotatifs derrière la pyramide */
const RbRays: React.FC<{at: number; cx: number; cy: number}> = ({at, cx, cy}) => {
  const t = useT();
  if (t < at) return null;
  const q = prog(t, at, at + 0.5, easeOut);
  return <div style={{position: 'absolute', left: cx - 700, top: cy - 700, width: 1400, height: 1400, zIndex: 2, pointerEvents: 'none', opacity: 0.85 * q, transform: `rotate(${(t - at) * 25}deg)`, background: 'repeating-conic-gradient(from 0deg, rgba(246,199,68,0.32) 0deg 7deg, transparent 7deg 20deg)', WebkitMaskImage: 'radial-gradient(circle, black 18%, transparent 62%)', maskImage: 'radial-gradient(circle, black 18%, transparent 62%)'}} />;
};

/* T21 — colorisation progressive : la photo trouvée passe du noir et blanc à la couleur */
const RbColorImg: React.FC<{src: string; a: number; b: number}> = ({src, a, b}) => {
  const t = useT();
  const q = prog(t, a, b, easeInOut);
  return <Img src={staticFile(src)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: `grayscale(${1 - q}) contrast(${1.15 - 0.15 * q}) brightness(0.95)`, transform: `scale(${1.12 - 0.08 * q})`}} />;
};

/* T22 — reflet holographique : une bande irisée balaie le carrousel */
const RbHolo: React.FC = () => {
  const t = useT();
  const ring = (t >= 156.0 && t < 162.8) || (t >= 405.0 && t <= OUTRO_AT);
  if (!ring) return null;
  const u = ((t - (t < 200 ? 156.0 : 405.0)) / 1.1) % 1;
  return <div style={{position: 'absolute', left: 0, top: 460, width: 1080, height: 820, zIndex: 33, pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0.55, background: `linear-gradient(105deg, transparent ${u * 160 - 40}%, rgba(255,120,200,0.45) ${u * 160 - 28}%, rgba(120,220,255,0.5) ${u * 160 - 18}%, rgba(255,240,140,0.45) ${u * 160 - 8}%, transparent ${u * 160 + 4}%)`}} />;
};

/* ═════════════ Pack « 15 effets de plus » ═════════════ */

/* E1 — rideau de lamelles : douze lames marine se ferment puis s'ouvrent à la sortie de la couverture */
const RbBlinds: React.FC = () => {
  const t = useT();
  if (t < 2.5 || t > 3.05) return null;
  return <AbsoluteFill style={{zIndex: 61, pointerEvents: 'none'}}>{Array.from({length: 12}, (_, i) => { const d = i * 0.012; const q = prog(t, 2.5 + d, 2.68 + d, easeIn) * (1 - prog(t, 2.72 + d, 2.92 + d, easeOut)); return <div key={i} style={{position: 'absolute', left: 0, top: i * 160, width: 1080, height: 160, transformOrigin: i % 2 ? '50% 0%' : '50% 100%', transform: `scaleY(${q})`, background: i % 2 ? RbN : '#12387F', borderBottom: q > 0.5 ? `4px solid ${RbY}` : undefined}} />; })}</AbsoluteFill>;
};

/* E2 — contour néon qui se trace autour de la scène à son entrée */
const RbNeon: React.FC = () => {
  const t = useT();
  const k = RB_SCENE.reduce((acc, a, i) => (t >= a && t < a + 1.1 ? i : acc), -1);
  if (k < 0) return null;
  const a = RB_SCENE[k], c = RB_C[Math.min(8, k)];
  const q = prog(t, a, a + 0.55, easeInOut), out = prog(t, a + 0.75, a + 1.1, easeIn);
  return <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 33, pointerEvents: 'none', opacity: 1 - out, filter: `drop-shadow(0 0 10px ${c}) drop-shadow(0 0 22px ${c})`}}><rect x={52} y={446} width={976} height={940} rx={36} fill="none" stroke={c} strokeWidth={6} pathLength={1} strokeDasharray={`${q} 1`} /></svg>;
};

/* E3 — paillettes dorées qui tombent en se balançant (couverture et final) */
const RbDust: React.FC<{a: number; b: number; z: number}> = ({a, b, z}) => {
  const t = useT();
  if (t < a || t > b) return null;
  const k = t - a;
  const o = prog(t, a, a + 0.3) * (1 - prog(t, b - 0.3, b));
  return <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: z, pointerEvents: 'none', opacity: o}}>{Array.from({length: 46}, (_, i) => { const x = 40 + random(`dx${i}`) * 1000 + Math.sin(k * 2 + i) * 24; const y = ((random(`dy${i}`) * 1920 + k * (90 + random(`dv${i}`) * 120)) % 1920); const r = 2.5 + random(`dr${i}`) * 4; const tw = 0.5 + 0.5 * Math.sin(k * 9 + i * 1.7); return <circle key={i} cx={x} cy={y} r={r} fill={i % 3 ? '#F6C744' : '#FFF3C4'} opacity={0.5 + 0.5 * tw} />; })}</svg>;
};

/* E4 — balayage laser : une ligne rouge scanne la matrice pendant qu'elle se remplit */
const RbLaser: React.FC = () => {
  const t = useT();
  if (t < 258.9 || t > 260.5) return null;
  const q = prog(t, 258.9, 260.5, easeInOut);
  const y = lerp(500, 1120, q);
  return <div style={{position: 'absolute', left: 60, top: y - 30, width: 960, height: 60, zIndex: 33, pointerEvents: 'none', background: 'linear-gradient(180deg, transparent, rgba(215,38,61,0.18) 45%, rgba(255,70,90,0.95) 50%, rgba(215,38,61,0.18) 55%, transparent)', boxShadow: '0 0 30px rgba(255,60,80,0.6)', opacity: Math.sin(q * Math.PI)}} />;
};

/* E5 — éclatement : la carte « dangereux » vole en éclats triangulaires */
const RbShatter: React.FC = () => {
  const t = useT();
  const a = 297.4, u = t - a;
  if (u < 0 || u > 0.9) return null;
  return <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 37, pointerEvents: 'none'}}>{Array.from({length: 20}, (_, i) => { const ang = (i / 20) * Math.PI * 2 + random(`sh${i}`) * 0.4; const v = 380 + random(`sv${i}`) * 520; const x = 540 + Math.cos(ang) * v * u, y = 900 + Math.sin(ang) * v * u + 900 * u * u; const s = 18 + random(`ss${i}`) * 26; return <path key={i} d={`M 0 ${-s} L ${s * 0.9} ${s * 0.7} L ${-s * 0.8} ${s * 0.5} Z`} transform={`translate(${x} ${y}) rotate(${u * 720 * (random(`sr${i}`) - 0.5)})`} fill={i % 3 ? RbR : '#fff'} stroke={NBK} strokeWidth={3} opacity={1 - u / 0.9} />; })}</svg>;
};

/* E6 — ondes sonar sous les pastilles des instructions */
const RbSonar: React.FC = () => {
  const t = useT();
  const A = [405.27, 407.9, 410.89];
  return <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 33, pointerEvents: 'none'}}>{A.map((a, i) => [0, 0.15, 0.3].map((d) => { const u = t - a - d; if (u < 0 || u > 0.8) return null; return <ellipse key={`${i}${d}`} cx={540} cy={1318} rx={80 + u * 520} ry={20 + u * 120} fill="none" stroke={[RbR, RbGold, RbG][i]} strokeWidth={8 * (1 - u / 0.8)} opacity={1 - u / 0.8} />; }))}</svg>;
};

/* E7 — confettis 3D qui retournent leur face en tombant (final) */
const RbConfetti: React.FC = () => {
  const t = useT();
  const a = 231.85, u = t - a;
  if (u < 0 || u > 1.0) return null;
  return <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 37, pointerEvents: 'none'}}><defs><clipPath id="rbCf"><rect x={30} y={452} width={1020} height={930} /></clipPath></defs><g clipPath="url(#rbCf)">{Array.from({length: 56}, (_, i) => { const x0 = 60 + random(`cx${i}`) * 960; const y = 430 + u * (500 + random(`cy${i}`) * 500) - random(`cd${i}`) * 200; const x = x0 + Math.sin(u * 6 + i) * 30; const spin = u * (8 + random(`cs${i}`) * 10) + i; const sx = Math.abs(Math.cos(spin)); return <rect key={i} x={-10} y={-6} width={20} height={12} rx={2} fill={RB_C[i % 9]} transform={`translate(${x} ${y}) rotate(${spin * 40}) scale(${Math.max(0.08, sx)} 1)`} />; })}</g></svg>;
};

/* E8 — damier : la scène se révèle case par case en diagonale */
const RbChecker: React.FC = () => {
  const t = useT();
  const W: [number, string][] = [[78.95, RbB], [300.5, RbV], [355.0, RbN]];
  const w = W.find(([a]) => t >= a && t < a + 0.6);
  if (!w) return null;
  const [a, c] = w;
  return <AbsoluteFill style={{zIndex: 34, pointerEvents: 'none'}}>{Array.from({length: 9 * 16}, (_, i) => { const cx = i % 9, cy = Math.floor(i / 9); const d = (cx + cy) * 0.016; const q = 1 - prog(t, a + d, a + d + 0.22, easeIn); return q > 0.01 ? <div key={i} style={{position: 'absolute', left: cx * 120, top: cy * 120, width: 120, height: 120, background: (cx + cy) % 2 ? c : hexMix(c, '#FFFFFF', 0.25), transform: `scale(${q}) rotate(${(1 - q) * 45}deg)`}} /> : null; })}</AbsoluteFill>;
};

/* E9 — tache d'encre qui se diffuse derrière la scène */
const RbInk: React.FC = () => {
  const t = useT();
  const W: [number, string][] = [[56.3, RbR], [131.4, RbB], [177.1, RbG], [235.9, RbO], [326.5, RbT], [372.5, RbV]];
  return <>{W.map(([a, c], j) => { const u = t - a; if (u < 0 || u > 2.2) return null; const q = prog(t, a, a + 0.9, easeOut); const R = 80 + q * 620; const d = Array.from({length: 61}, (_, i) => { const th = (i / 60) * Math.PI * 2; const r = R * (1 + 0.12 * Math.sin(th * 7 + j) + 0.06 * Math.sin(th * 13 + u * 2)); return `${i ? 'L' : 'M'} ${540 + Math.cos(th) * r} ${900 + Math.sin(th) * r * 0.9}`; }).join(' ') + ' Z'; return <svg key={j} width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, pointerEvents: 'none', opacity: 0.1 * (1 - prog(t, a + 1.4, a + 2.2))}}><path d={d} fill={c} /></svg>; })}</>;
};

/* E10 — lucioles : points lumineux sur des courbes de Lissajous autour du centre (intro et final) */
const RbFireflies: React.FC = () => {
  const t = useT();
  const on = (t >= 2.6 && t < 7.7) || (t >= 410.6 && t < OUTRO_AT);
  if (!on) return null;
  const o = t < 7.7 ? prog(t, 2.6, 2.9) * (1 - prog(t, 7.4, 7.7)) : prog(t, 410.6, 410.9) * (1 - prog(t, OUTRO_AT - 0.3, OUTRO_AT));
  return <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 33, pointerEvents: 'none', opacity: o}}>{Array.from({length: 24}, (_, i) => { const p = i * 0.7; const x = 540 + Math.sin(t * (1.1 + (i % 4) * 0.2) + p) * (330 + (i % 5) * 20), y = 860 + Math.sin(t * (1.7 + (i % 3) * 0.25) + p * 1.3) * (360 + (i % 4) * 15); const g = 0.5 + 0.5 * Math.sin(t * 7 + i); return <g key={i}><circle cx={x} cy={y} r={14 * g + 6} fill={RB_C[i % 9]} opacity={0.18} /><circle cx={x} cy={y} r={4 + 2 * g} fill="#fff" stroke={RB_C[i % 9]} strokeWidth={2} /></g>; })}</svg>;
};

/* E11 — barre de progression de lecture aux neuf couleurs, au ras du cadre bas */
const RbProgress: React.FC = () => {
  const t = useT();
  if (t > OUTRO_AT) return null;
  const q = Math.min(1, t / OUTRO_AT);
  return <div style={{position: 'absolute', left: 44, top: 1872, width: 992, height: 10, borderRadius: 5, background: 'rgba(20,20,20,0.12)', zIndex: 119, overflow: 'hidden'}}><div style={{width: `${q * 100}%`, height: '100%', background: `linear-gradient(90deg, ${RB_C.join(', ')})`, backgroundSize: '992px 10px'}} /></div>;
};
/* ═════════════ Outils de scène propres à la capsule ═════════════ */
const Center: React.FC<{y: number; children: React.ReactNode; z?: number}> = ({y, children, z = 4}) => <Abs x={0} y={y} w={1080} style={{display: 'flex', justifyContent: 'center', zIndex: z}}>{children}</Abs>;
const RbUntil: React.FC<{b: number; children: React.ReactNode}> = ({b, children}) => (useT() < b ? <>{children}</> : null);
const RING_A = [IMG.alarme, IMG.extinct, IMG.guide, IMG.rassemb, IMG.extinct2, IMG.respevac, IMG.serre, IMG.bilan];
const RING_B = [IMG.terrain, IMG.resp, IMG.tableau, IMG.evalcov, IMG.conforme, IMG.analyste, IMG.techhse, IMG.gemba];
const RbSwapBadge: React.FC<{items: [number, number, string, string][]}> = ({items}) => <>{items.map(([a, b, l, c]) => <RbUntil key={l} b={b}><Center y={1290} z={6}><NBadge at={a} text={l} bg={c} rot={-2} size={l.length > 18 ? 30 : 36} /></Center></RbUntil>)}</>;

/* ═════════════ Introduction : la gestion des risques ═════════════ */
const Intro: React.FC = () => (
  <Out end={54.55}>
    <Heads h={[[2.65, ['La gestion des risques :', "l'analyse du pire scénario"], [0]], [4.3, ['Pas un exercice théorique,', 'mais la clé de la survie'], [1]], [8.7, ['Un changement de', 'perspective radical'], [1]], [10.8, ['Imaginons un instant', 'la situation suivante'], [0]], [12.9, ['Un incendie qui ravage des locaux', 'ou une erreur de frappe'], [0, 1]], [19.8, ['Les traiter avec', 'exactement la même gravité ?'], [1]], [24.4, ["L'un détruit des bâtiments,", "l'autre crée un casse-tête"], [0, 1]], [29.0, ['Sans maîtrise du', 'vocabulaire des risques'], [1]], [32.6, ['Une erreur colossale', 'faite tous les jours'], [0]], [35.8, ['Des menaces opposées', 'mises sur le même plan'], [1]], [38.9, ["Pour remettre de l'ordre,", 'une progression très claire'], [0]], [43.3, ['Au programme', 'du décryptage'], [0]]]} />
    <Ph a={2.0} b={7.75}>
      <RbParticles cy={860} at={2.0} form={2.05} />
      <RbChip x={540} y={1150} w={560} at={3.18} l="Le pire scénario absolu" c={RbR} ic="TriangleAlert" fs={30} fill />
      <RbChip x={540} y={1250} w={600} at={5.41} l="Pas un exercice théorique" c={RbN} ic="BookOpen" fs={30} fill />
    </Ph>
    <Ph a={7.7} b={10.8}><RbKey cy={880} at={7.75} key0={7.87} turn={8.11} persp={9.08} /></Ph>
    <Ph a={10.75} b={28.9}><RbVersus cy={900} at={10.8} fire={13.12} ravage={13.79} typo={16.51} paie={17.79} same={21.96} absurd={23.91} destroy={24.97} puzzle={27.34} /></Ph>
    <Ph a={28.85} b={34.0}><RbVocab cy={880} at={28.9} voc={30.67} err={32.64} /></Ph>
    <Ph a={33.95} b={38.7}><RbSamePlane cy={880} at={34.0} days={34.28} plane={36.26} opp={37.14} /></Ph>
    <Ph a={38.65} b={54.55}><RbProgram cy={880} at={38.7} order={39.42} times={[43.48, 44.9, 46.64, 49.63, 51.81]} /></Ph>
  </Out>
);

/* ═════════════ Partie 1 : comprendre le risque brut ═════════════ */
const S1: React.FC = () => (
  <Out end={129.65}>
    <RbGhost n="BRUT" c={RbR} at={56.3} end={129.65} fs={420} />
    <Heads h={[[56.3, ['Première étape :', 'comprendre le risque brut'], [1]], [59.4, ['Le risque brut, appelé aussi', 'risque inhérent'], [1]], [64.8, ["La menace à l'état pur,", 'avant le moindre geste'], [0]], [71.5, ['Pas de filet de sécurité,', 'pas de procédures, rien'], [0, 1]], [75.0, ['Le scénario catastrophe', "par défaut d'une activité"], [0]], [78.9, ['Le contexte', 'change absolument tout'], [0]], [81.8, ["Le risque d'erreur de paie", 'sans aucun contrôle'], [0]], [88.5, ['Le danger de base', 'dépend de la situation'], [0]], [91.0, ['La paie de ses employés locaux,', 'une seule réglementation'], [1]], [96.3, ['La paie de 100 expatriés', 'dans le monde entier'], [0]], [100.0, ['Des lois fiscales croisées :', 'le risque brut explose'], [1]], [104.2, ['Même logique', 'pour un incendie'], [1]], [107.5, ['Absence totale de prévention :', "ni extincteur, ni alarme"], [0]], [112.3, ['Une usine chimique', 'hautement inflammable'], [0]], [116.0, ['Une catastrophe', 'absolue'], [1]], [117.9, ['Un petit bureau de service,', 'trois ordinateurs et un café'], [0]], [122.8, ['Le risque brut reste grave,', 'mais pas la même ampleur'], [1]], [126.8, ["La nature de l'activité", 'dicte le niveau du danger'], [0]]]} />
    <Ph a={56.3} b={61.65}><RbBigWord cy={880} at={57.6} lines={['RISQUE', 'BRUT']} c={RbR} rough sub={[[56.73, 'Première étape', 'Flag']]} /></Ph>
    <Ph a={61.6} b={68.9}>
      <SearchOpen x={60} y={450} w={960} h={860} at={61.65} query="risque inhérent" results={['Risque inhérent', 'Risque brut', "La menace à l'état pur"]} found={0} foundAt={63.2} clickAt={63.5} c={RbR}>
        <div style={{position: 'absolute', inset: 0, background: '#000'}}>
          <RbColorImg src={IMG.search1} a={64.2} b={65.2} />
          <div style={{position: 'absolute', left: 0, bottom: 50, width: 900, display: 'flex', justifyContent: 'center'}}><div style={{...nb(RbR, 8), borderColor: NBK, boxShadow: `8px 8px 0 ${NBK}`, padding: '12px 30px', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: '#fff'}}>LA MENACE À L'ÉTAT PUR</div></div>
        </div>
      </SearchOpen>
    </Ph>
    <Ph a={68.85} b={79.05}><RbNaked cy={880} at={68.9} doigt={70.4} filet={72.37} proc={73.8} rien={74.38} cata={76.32} src={IMG.naked} /></Ph>
    <Ph a={79.0} b={92.6}><RbPayErr cy={880} at={79.05} ctx={79.2} pay={82.6} noctl={85.31} inev={87.06} base={88.6} /></Ph>
    <Ph a={92.55} b={104.05}><RbPayContext cy={900} at={92.6} loc={92.73} one={93.56} emb={95.11} expat={97.25} lois={100.85} boom={103.21} /></Ph>
    <Ph a={104.0} b={117.95}><RbFactory cy={900} at={104.05} prev={107.7} ext={110.36} alarm={111.31} usine={113.4} infl={115.3} cata={116.19} src={IMG.usine} /></Ph>
    <Ph a={117.9} b={129.65}><RbOffice cy={900} at={117.95} pcs={119.8} cafe={121.3} grave={123.21} amp={125.74} dicte={126.91} src={IMG.bureau} /></Ph>
  </Out>
);

/* ═════════════ Partie 2 : les moyens de maîtrise ═════════════ */
const S2: React.FC = () => (
  <Out end={175.35}>
    <RbGhost n="MAÎTRISE" c={RbB} at={131.4} end={175.35} fs={260} />
    <Heads h={[[131.4, ['Deuxième point-clé :', 'les moyens de maîtrise'], [1]], [136.4, ['Le risque brut est la menace,', 'la maîtrise, ce sont les boucliers'], [1]], [141.4, ['Actions, procédures, équipements', 'pour dompter le chaos'], [0]], [146.8, ['Réduire les chances', 'ou amortir le choc'], [0, 1]], [151.8, ["L'armure", "de l'entreprise"], [0]], [155.6, ['Face au feu : alarmes,', 'portes coupe-feu, évacuation'], [0, 1]], [162.5, ['Pour la paie, une armure', 'administrative'], [1]], [168.0, ['Double vérification humaine', 'et alertes logicielles'], [0, 1]], [172.0, ['Le virement au montant suspect', 'est bloqué'], [1]]]} />
    <Ph a={131.4} b={147.5}><RbShields cy={900} at={131.45} title={134.4} men={137.78} bouc={140.26} trio={[141.95, 142.65, 143.49]} chaos={145.18} /></Ph>
    <Ph a={147.45} b={156.05}><RbLevers cy={900} at={147.5} prob={147.97} grav={150.77} arm={153.3} /></Ph>
    <Ph a={156.0} b={162.8}>
      <Abs x={0} y={440} w={1080} h={860}><Ring3D imgs={RING_A} at={156.02} w={1080} h={860} cw={380} ch={480} R={600} cy={0.45} /></Abs>
      <RbSwapBadge items={[[156.3, 158.19, 'FACE AU FEU', RbR], [158.19, 159.53, 'ALARMES INCENDIE', RbO], [159.53, 161.0, 'PORTES COUPE-FEU', RbN], [161.0, 999, "PLANS D'ÉVACUATION", RbG]]} />
    </Ph>
    <Ph a={162.75} b={175.35}><RbPaySecure cy={900} at={162.8} adm={166.75} dbl={168.55} soft={170.56} block={172.22} vir={173.58} /></Ph>
  </Out>
);

/* ═════════════ Partie 3 : le risque net expliqué ═════════════ */
const S3: React.FC = () => (
  <Out end={234.15}>
    <RbGhost n="NET" c={RbG} at={177.1} end={234.15} fs={480} />
    <Heads h={[[177.1, ['Troisième partie :', 'le risque net expliqué'], [1]], [181.4, ['Le risque net, ou', 'risque résiduel'], [1]], [183.0, ['Le visage rassurant du danger,', "une fois l'armure enfilée"], [0]], [187.3, ['La menace, compte tenu', 'des mesures de sécurité'], [1]], [192.5, ['La réalité atténuée,', 'au quotidien'], [0]], [196.6, ["L'impact de cette", 'transformation'], [1]], [200.4, ['Un incendie grave,', 'une erreur de paie importante'], [0, 1]], [206.4, ['Alarmes, vérifications,', 'procédures activées'], [0, 1]], [211.3, ['Les deux risques tombent', 'à un niveau faible'], [1]], [214.4, ['Le tableau de bord', 'devient très apaisant'], [1]], [219.4, ["C'est là que", 'le piège se referme'], [1]], [224.4, ['Tous les deux classés faibles :', "pourquoi s'embêter ?"], [1]], [230.2, ['Pourquoi ne pas se féliciter', 'et passer à autre chose ?'], [0]]]} />
    <Ph a={177.1} b={183.05}><RbBigWord cy={880} at={178.4} lines={['RISQUE', 'NET']} c={RbG} sub={[[177.92, 'Troisième partie', 'Flag'], [182.27, 'Le risque résiduel', 'ShieldCheck']]} /></Ph>
    <Ph a={183.0} b={197.05}><RbNetFormula cy={880} at={183.05} vis={183.32} arm={185.6} eq={188.6} bg={191.88} att={193.44} /></Ph>
    <Ph a={197.0} b={219.3}><RbMatrixDrop cy={900} at={197.05} fire={201.1} pay={203.81} sh={[207.3, 207.96, 209.02]} fall={211.49} low={213.21} dash={216.38} /></Ph>
    <Ph a={219.25} b={234.15}><RbTrap cy={900} at={219.3} trap={221.72} both={225.7} why={228.86} fel={231.83} /></Ph>
  </Out>
);

/* ═════════════ Partie 4 : conserver l'analyse brute ═════════════ */
const S4: React.FC = () => (
  <Out end={324.75}>
    <RbGhost n="BRUT" c={RbO} at={235.9} end={324.75} fs={420} />
    <Heads h={[[235.9, ['Quatrième section :', "conserver l'analyse brute"], [1]], [240.8, ['Ne regarder que le net,', 'une erreur stratégique majeure'], [1]], [245.6, ['Trois raisons de garder', 'cette double vision'], [1]], [250.4, ['Ne pas confondre un trottoir', "avec le bord d'une falaise"], [0, 1]], [254.6, ['Première raison :', 'la vraie nature du danger'], [1]], [260.0, ['En net, incendie et erreur', "ont l'air identiques"], [1]], [267.0, ['Couper dans les budgets,', 'réduire la maintenance des alarmes'], [0, 1]], [276.0, ["L'analyse brute hurle", "un rappel à l'ordre"], [1]], [279.0, ['Sans ces alarmes,', 'une catastrophe absolue'], [1]], [283.0, ['Deuxièmement : sacraliser', 'les moyens de maîtrise'], [0]], [287.5, ['Le risque brut,', 'un pense-bête permanent'], [1]], [292.0, ['La rigueur avec laquelle', 'on entretient le bouclier'], [0]], [296.2, ['Éviter le laxisme', 'quand tout va bien'], [0]], [300.5, ['Troisièmement :', 'un langage commun'], [1]], [304.4, ['Une réunion pour évaluer', 'le risque de la paie'], [0]], [307.4, ["L'un dit « faible »,", "l'autre « important »"], [0, 1]], [318.8, ['Sans brut et net,', 'un dialogue de sourds'], [1]], [320.6, ['Poser ces mots :', 'parler de la même chose'], [0]]]} />
    <Ph a={235.9} b={250.45}><RbThree cy={880} at={235.95} cons={238.1} eye={241.07} err={243.88} three={246.33} dbl={248.72} /></Ph>
    <Ph a={250.4} b={254.6}><RbCliff cy={900} at={250.45} trot={252.2} fal={253.55} /></Ph>
    <Ph a={254.55} b={268.8}><RbXray cy={900} at={254.6} nat={258.97} nette={261.5} ident={265.53} /></Ph>
    <Ph a={268.75} b={283.05}><RbBudget cy={900} at={268.8} budg={269.09} maint={272.57} faible={274.83} hurl={277.42} att={278.76} sous={280.63} /></Ph>
    <Ph a={283.0} b={293.5}><RbSacred cy={900} at={283.05} sac={284.63} pense={288.78} /></Ph>
    <Ph a={293.45} b={300.6}><RbLine cy={900} at={293.5} des={293.59} rig={294.17} lax={297.1} long={299.0} /></Ph>
    <Ph a={300.55} b={324.75}><RbMeeting cy={900} at={300.6} lang={303.33} reun={304.71} un={307.59} low={307.8} soft={310.9} aut={312.16} high={312.4} fine={315.2} sourd={319.11} mots={320.73} same={323.31} /></Ph>
  </Out>
);

/* ═════════════ Partie 5 : gérer et vivre avec le risque au quotidien ═════════════ */
const S5: React.FC = () => (
  <Out end={370.75}>
    <RbGhost n="∞" c={RbT} at={326.5} end={370.75} />
    <Heads h={[[326.5, ['Dernière partie : vivre', 'avec le risque au quotidien'], [1]], [330.5, ["Ce n'est pas une case", 'cochée une fois pour toutes'], [0]], [334.5, ['Une boucle continue :', 'brut, contrôles, net'], [0]], [341.0, ['Et on recommence', "l'année suivante"], [1]], [344.0, ["L'environnement change,", 'de nouvelles menaces apparaissent'], [0, 1]], [347.0, ['Un bouclier,', "ça s'entretient constamment"], [1]], [350.9, ['Ne pas se noyer sous', 'des montagnes de fichiers'], [1]], [354.9, ['Un logiciel dédié', 'à la gestion des risques'], [0]], [361.4, ["Garder la trace de l'évolution,", 'piloter les contrôles'], [0, 1]], [366.0, ['Maintenir la protection', 'sans baisser la garde'], [0, 1]]]} />
    <Ph a={326.5} b={344.0}><RbLoop cy={900} at={326.55} vivre={328.5} casee={332.58} loop={334.75} st={[335.58, 337.24, 339.22, 343.17]} /></Ph>
    <Ph a={343.95} b={351.0}><RbMaintain cy={900} at={344.0} env={344.3} nouv={345.87} entr={348.47} /></Ph>
    <Ph a={350.95} b={355.05}><RbFiles cy={900} at={351.0} noy={351.86} /></Ph>
    <Ph a={355.0} b={370.75}><RbSoftware cy={900} at={355.05} trace={362.72} pil={365.06} niv={368.19} garde={369.54} /></Ph>
  </Out>
);

/* ═════════════ Conclusion : le risque zéro n'existe pas ═════════════ */
const S6: React.FC = () => (
  <Out end={OUTRO_AT}>
    <Heads h={[[372.5, ['Une entreprise sans risque', "n'existe pas"], [1]], [377.4, ['Le risque zéro :', 'un mythe dangereux'], [1]], [380.4, ['Non pas éliminer toute menace,', 'mais avancer en toute sécurité'], [1]], [387.6, ['Aux côtés de risques', 'identifiés et maîtrisés'], [1]], [391.6, ['Une ultime', 'réflexion'], [1]], [393.5, ['Tableaux de bord', 'et indicateurs au vert'], [1]], [398.3, ['Conscience du gouffre', 'sous le filet de sécurité ?'], [0]], [402.9, ['Ou endormies par', "l'illusion du risque net ?"], [1]], [407.0, ['La prise de conscience', 'des entreprises résilientes'], [0, 1]]]} />
    <Ph a={372.5} b={380.45}>
      <SearchOpen x={60} y={450} w={960} h={860} at={372.6} query="risque zéro" results={['Le risque zéro', 'Une entreprise sans risque', 'Un mythe dangereux']} found={0} foundAt={378.3} clickAt={378.55} c={RbV}>
        <div style={{position: 'absolute', inset: 0, background: '#000'}}>
          <RbColorImg src={IMG.zone} a={379.3} b={380.0} />
          <div style={{position: 'absolute', left: 0, bottom: 50, width: 900, display: 'flex', justifyContent: 'center'}}><div style={{...nb(RbV, 8), borderColor: NBK, boxShadow: `8px 8px 0 ${NBK}`, padding: '12px 30px', fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: '#fff'}}>UN MYTHE DANGEREUX</div></div>
        </div>
      </SearchOpen>
    </Ph>
    <Ph a={380.4} b={391.65}><RbCoexist cy={900} at={380.45} elim={381.0} surf={383.75} avan={385.6} ident={388.5} /></Ph>
    <Ph a={391.6} b={405.0}><RbAbyss cy={880} at={391.65} ult={391.7} dash={394.27} vert={396.62} gouf={399.6} filet={401.42} dort={404.03} /></Ph>
    <Ph a={404.95} b={OUTRO_AT}>
      <Abs x={0} y={440} w={1080} h={860}><Ring3D imgs={RING_B} at={404.97} w={1080} h={860} cw={380} ch={480} R={600} cy={0.45} /></Abs>
      <RbSwapBadge items={[[405.27, 407.9, 'ILLUSION DU RISQUE NET', RbR], [407.9, 410.89, 'PRISE DE CONSCIENCE', RbGold], [410.89, 999, 'ENTREPRISES RÉSILIENTES', RbG]]} />
    </Ph>
  </Out>
);
/* ═════════════ Police de la vidéo : Cambria (repli Caladea embarqué) ═════════════ */
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-Regular.ttf'), weight: '400'});
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-Bold.ttf'), weight: '700'});
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-Italic.ttf'), weight: '400', style: 'italic'});
loadFont({family: 'Caladea', url: staticFile('fonts/Caladea-BoldItalic.ttf'), weight: '700', style: 'italic'});
const CAMBRIA_CSS = ".cambria, .cambria * { font-family: Cambria, 'Caladea', Georgia, serif !important; }";

/* ═════════════ Couverture : orbite 3D des notions du risque + titre en lettres-photos animées ═════════════ */
const COVER_SIG: [string, string, string][] = [['B', 'Risque brut', RbR], ['M', 'Maîtrise', RbB], ['N', 'Risque net', RbG], ['2', 'Double vision', RbO], ['3', 'Trois raisons', RbV], ['∞', 'Boucle', RbT], ['0', 'Risque zéro ?', RbP], ['?', 'Gouffre', RbN], ['✓', 'Résilience', RbGold]];
const KOrbitSig: React.FC<{cx: number; cy: number; at: number}> = ({cx, cy, at}) => {
  const t = useT();
  const app = Math.min(1, sp(t, at, 7, 12));
  const els = COVER_SIG.map(([n, l, c], i) => { const th = (i / COVER_SIG.length) * Math.PI * 2 + t * 0.85; return {n, l, c, x: Math.sin(th) * 410 * app, z: Math.cos(th)}; }).sort((u, v) => u.z - v.z);
  return <>{els.map(({n, l, c, x, z}) => { const sc = 0.6 + 0.4 * ((z + 1) / 2); return <div key={`${n}${l}`} style={{position: 'absolute', left: cx + x, top: cy + z * 130, transform: `translate(-50%, -50%) scale(${sc})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.35 + 0.65 * ((z + 1) / 2), zIndex: Math.round(z * 10) + 20, filter: z < -0.3 ? 'blur(1.5px)' : undefined}}><div style={{minWidth: 120, height: 120, padding: '0 14px', borderRadius: 22, background: c, border: `5px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `6px 6px 0 ${NBK}`, fontFamily: sansFont, fontWeight: 900, fontSize: n.length > 3 ? 40 : 64, color: c === RbY ? NBK : '#fff', boxSizing: 'border-box', whiteSpace: 'nowrap'}}>{n}</div><div style={{...nb('#fff', 4), borderColor: NBK, padding: '3px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: INK, whiteSpace: 'nowrap'}}>{l}</div></div>; })}</>;
};
const KCover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Bg />
      <Abs x={0} y={40} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.14)'}}><Img src={staticFile(LOGO)} style={{height: 76, display: 'block'}} /></div></Abs>
      <Abs x={0} y={180} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb(RbN, 6), borderColor: NBK, padding: '8px 22px', ...CAP, fontSize: 26, color: '#fff'}}>La gestion des risques</div></Abs>
      <KOrbitSig cx={540} cy={560} at={0.05} />
      <Abs x={0} y={830} w={1080} style={{display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap', zIndex: 40}}><PhotoLetterAnim ch="RISQUE BRUT" src={IMG.cover} size={100} ls={3} seed={8} /></Abs>
      <Abs x={0} y={990} w={1080} style={{display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap', zIndex: 40}}><PhotoLetterAnim ch="RISQUE NET" src={IMG.c1} size={106} ls={3} seed={13} /></Abs>
      <Abs x={60} y={1400} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden', zIndex: 40}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 80 + k * (800 / (SECT.length - 1)) - 18, top: 28, width: 36, height: 36, borderRadius: 9, background: x.c, border: '4px solid #fff', boxSizing: 'border-box'}} />)}
        <div style={{position: 'absolute', left: 80 + 0.5 * (800 / (SECT.length - 1)) - 28, top: 36}}><Capsule w={56} c={NAVY} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 80 + k * (800 / (SECT.length - 1)) - 62, width: 124, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
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
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8}, ...rep(0.2, 9, 0.09, 'sfx/ding', 0.1),
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at + 0.15, s: 'sfx/bell', v: 0.1})),
  // introduction
  {at: 2.02, s: 'soft-whoosh', v: 0.4, dur: 1.2}, ...rep(2.1, 10, 0.06, 'sfx/click', 0.04), {at: 2.85, s: 'bass-hit', v: 0.4}, {at: 3.18, s: 'sfx/pop', v: 0.22}, {at: 5.41, s: 'sfx/pop', v: 0.2},
  {at: 7.87, s: 'sfx/whoosh', v: 0.25}, {at: 8.11, s: 'cadenas', v: 0.35}, {at: 9.08, s: 'soft-whoosh', v: 0.3, dur: 1.2},
  {at: 13.12, s: 'alarme', v: 0.08, dur: 1.2}, {at: 13.79, s: 'deep-hit', v: 0.25}, ...rep(16.51, 4, 0.08, 'stylo', 0.12), {at: 17.79, s: 'sfx/pop', v: 0.2}, {at: 21.96, s: 'tampon', v: 0.35}, {at: 23.91, s: 'sfx/thud', v: 0.35}, {at: 24.97, s: 'sfx/thud', v: 0.3}, {at: 27.34, s: 'sfx/pop', v: 0.22},
  ...rep(30.67, 3, 0.35, 'stylo', 0.12), {at: 32.64, s: 'tension', v: 0.15, dur: 1}, ...rep(34.28, 7, 0.18, 'sfx/click', 0.1), {at: 36.26, s: 'sfx/thud', v: 0.3}, {at: 37.14, s: 'sfx/swish', v: 0.2},
  ...rep(39.42, 5, 0.06, 'sfx/swish', 0.12), ...[43.48, 44.9, 46.64, 49.63, 51.81].map((at) => ({at, s: 'sfx/ding', v: 0.18})),
  // partie 1 : risque brut
  ...rep(57.6, 11, 0.045, 'sfx/thud', 0.12), ...searchCues(61.65, 15, 63.2, 63.5),
  {at: 70.4, s: 'sfx/pop', v: 0.18}, {at: 72.37, s: 'sfx/swish', v: 0.2}, {at: 73.8, s: 'sfx/swish', v: 0.2}, {at: 74.38, s: 'sfx/pop', v: 0.15}, {at: 76.32, s: 'deep-hit', v: 0.4}, {at: 76.4, s: 'alarme', v: 0.08, dur: 1},
  {at: 79.2, s: 'tick', v: 0.15}, {at: 82.6, s: 'page', v: 0.15}, {at: 85.31, s: 'sfx/swish', v: 0.2}, ...rep(87.06, 8, 0.11, 'sfx/pop', 0.1),
  {at: 92.73, s: 'sfx/pop', v: 0.2}, {at: 95.11, s: 'sfx/ding', v: 0.15}, {at: 97.25, s: 'soft-whoosh', v: 0.3, dur: 1.2}, ...rep(100.85, 6, 0.15, 'sfx/swish', 0.1), {at: 103.21, s: 'bass-hit', v: 0.45},
  {at: 110.36, s: 'sfx/swish', v: 0.2}, {at: 111.31, s: 'sfx/swish', v: 0.2}, {at: 113.4, s: 'sfx/pop', v: 0.2}, ...rep(115.3, 3, 0.12, 'sfx/pop', 0.15), {at: 116.19, s: 'deep-hit', v: 0.4},
  ...rep(119.8, 3, 0.12, 'sfx/pop', 0.15), {at: 121.3, s: 'sfx/pop', v: 0.18}, {at: 125.74, s: 'sfx/whoosh', v: 0.2}, {at: 126.91, s: 'sfx/ding', v: 0.2},
  // partie 2 : moyens de maîtrise
  {at: 134.4, s: 'sfx/pop', v: 0.22}, {at: 137.78, s: 'tension', v: 0.15, dur: 1.5}, ...rep(140.3, 8, 0.1, 'sfx/click', 0.1), {at: 141.0, s: 'validation', v: 0.2}, ...[141.95, 142.65, 143.49].map((at) => ({at, s: 'sfx/pop', v: 0.18})), {at: 145.18, s: 'soft-whoosh', v: 0.25, dur: 1},
  {at: 147.97, s: 'sfx/whoosh', v: 0.2}, {at: 150.77, s: 'sfx/whoosh', v: 0.2}, {at: 153.3, s: 'tampon', v: 0.3},
  {at: 156.05, s: 'soft-whoosh', v: 0.35, dur: 1.5}, ...pops([156.3, 158.19, 159.53, 161.0], 0.22),
  {at: 166.75, s: 'sfx/pop', v: 0.2}, {at: 168.55, s: 'sfx/ding', v: 0.18}, {at: 170.56, s: 'alarme', v: 0.08, dur: 0.6}, {at: 172.22, s: 'sfx/thud', v: 0.35}, {at: 173.58, s: 'tampon', v: 0.4},
  // partie 3 : risque net
  ...rep(178.4, 9, 0.045, 'sfx/ding', 0.08), {at: 182.27, s: 'sfx/pop', v: 0.2}, {at: 185.6, s: 'sfx/whoosh', v: 0.25}, {at: 188.6, s: 'validation', v: 0.22}, {at: 193.44, s: 'soft-whoosh', v: 0.25, dur: 1.2},
  {at: 201.1, s: 'sfx/pop', v: 0.2}, {at: 203.81, s: 'sfx/pop', v: 0.2}, ...[207.3, 207.96, 209.02].map((at) => ({at, s: 'sfx/ding', v: 0.15})), {at: 211.49, s: 'sfx/whoosh', v: 0.3}, {at: 213.21, s: 'validation', v: 0.25}, {at: 216.38, s: 'sfx/rise', v: 0.15, dur: 1.2},
  {at: 221.6, s: 'deep-hit', v: 0.45}, {at: 221.75, s: 'sfx/thud', v: 0.4}, {at: 228.86, s: 'sfx/pop', v: 0.18}, {at: 231.83, s: 'sfx/rise', v: 0.25, dur: 0.6},
  // partie 4 : conserver l'analyse brute
  {at: 238.1, s: 'sfx/pop', v: 0.2}, {at: 243.88, s: 'sfx/thud', v: 0.25}, ...rep(246.33, 3, 0.15, 'sfx/pop', 0.2), {at: 248.72, s: 'soft-whoosh', v: 0.25, dur: 1}, {at: 252.2, s: 'sfx/pop', v: 0.18}, {at: 253.55, s: 'tension', v: 0.2, dur: 1}, {at: 253.75, s: 'sfx/whoosh', v: 0.3},
  {at: 258.97, s: 'sfx/rise', v: 0.15, dur: 1.5}, {at: 265.53, s: 'sfx/ding', v: 0.18}, ...rep(269.5, 6, 0.14, 'sfx/click', 0.15), {at: 273.4, s: 'sfx/thud', v: 0.3}, {at: 274.83, s: 'tampon', v: 0.3}, {at: 277.42, s: 'alarme', v: 0.12, dur: 1.4}, {at: 278.76, s: 'bass-hit', v: 0.35}, {at: 280.63, s: 'deep-hit', v: 0.35},
  {at: 284.63, s: 'soft-whoosh', v: 0.3, dur: 1.2}, {at: 288.78, s: 'page', v: 0.15}, {at: 293.59, s: 'tension', v: 0.15, dur: 1.5}, ...rep(294.17, 3, 0.18, 'sfx/ding', 0.12), {at: 299.0, s: 'sfx/thud', v: 0.2},
  {at: 303.33, s: 'sfx/pop', v: 0.2}, {at: 304.71, s: 'soft-whoosh', v: 0.25, dur: 1}, {at: 307.8, s: 'sfx/pop', v: 0.2}, {at: 312.4, s: 'sfx/pop', v: 0.2}, ...rep(319.11, 4, 0.1, 'sfx/thud', 0.2), {at: 320.73, s: 'sfx/swish', v: 0.2}, {at: 323.31, s: 'validation', v: 0.25},
  // dernière partie : vivre avec le risque
  {at: 328.5, s: 'sfx/pop', v: 0.18}, {at: 332.58, s: 'sfx/ding', v: 0.2}, {at: 333.25, s: 'sfx/thud', v: 0.25}, {at: 334.75, s: 'soft-whoosh', v: 0.3, dur: 1.2}, ...[335.58, 337.24, 339.22, 343.17].map((at) => ({at, s: 'sfx/pop', v: 0.2})),
  {at: 344.3, s: 'soft-whoosh', v: 0.2, dur: 1.2}, ...rep(345.87, 5, 0.15, 'sfx/pop', 0.15), ...rep(348.5, 6, 0.2, 'sfx/swish', 0.1),
  ...rep(351.1, 12, 0.1, 'page', 0.08), {at: 352.4, s: 'sfx/whoosh', v: 0.25}, {at: 355.05, s: 'sfx/rise', v: 0.2, dur: 0.8}, ...rep(365.06, 3, 0.25, 'sfx/click', 0.2), {at: 369.54, s: 'validation', v: 0.25},
  // conclusion
  ...searchCues(372.6, 11, 378.3, 378.55),
  {at: 381.0, s: 'sfx/pop', v: 0.18}, {at: 383.75, s: 'sfx/thud', v: 0.3}, {at: 385.6, s: 'soft-whoosh', v: 0.25, dur: 1.5}, ...rep(388.5, 4, 0.1, 'cadenas', 0.15),
  {at: 391.7, s: 'sfx/pop', v: 0.15}, {at: 394.27, s: 'sfx/pop', v: 0.2}, ...rep(396.62, 6, 0.12, 'sfx/ding', 0.08), {at: 399.3, s: 'tension', v: 0.2, dur: 2}, {at: 399.6, s: 'deep-hit', v: 0.4}, {at: 401.42, s: 'sfx/pop', v: 0.15},
  {at: 405.0, s: 'soft-whoosh', v: 0.35, dur: 1.5}, ...pops([405.27, 407.9, 410.89], 0.22), {at: 411.0, s: 'sfx/rise', v: 0.25, dur: 1.2},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];
const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SCN: [React.FC, number, number][] = [[Intro, 2.0, 54.5], [S1, 56.3, 129.6], [S2, 131.4, 175.3], [S3, 177.1, 234.1], [S4, 235.9, 324.7], [S5, 326.5, 370.7], [S6, 372.5, OUTRO_AT]];
export const RisqueBrutNetMetro: React.FC = () => (
  <AbsoluteFill className="cambria" style={{background: PAPER}}>
    <style>{CAMBRIA_CSS}</style>
    <Bg />
    <RbBokeh />
    <RbInk />
    <RbRipple />
    <RbCam>{SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}</RbCam>
    <RbVignette />
    <RbLeak />
    <RbShock />
    <RbSpot />
    <RbSpeed />
    <RbBlob />
    <RbHolo />
    <RbFlash />
    <RbGlitch />
    <RbSparkle />
    <RbFlare />
    <RbSlam />
    <RbRing9 />
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7 / TK}><TimeWarp.Provider value={{at: x.at, k: TK}}><C i={i} /></TimeWarp.Provider></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><KCover /></Gate>
    <Gate from={413.3} to={OUTRO_AT + 0.3}><JCrtOff at={413.35} /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <RbBlinds />
    <RbDust a={0} b={2.9} z={61} />
    <RbDust a={410.6} b={OUTRO_AT} z={37} />
    <RbNeon />
    <RbLaser />
    <RbShatter />
    <RbSonar />
    <RbConfetti />
    <RbChecker />
    <RbFireflies />
    <RbProgress />
    <RbGrain />
    <AbsoluteFill style={{zIndex: 120}}><RbHazardFrame /></AbsoluteFill>
    <Audio src={staticFile('voix-risque-brut-net-metro-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u2 = [wn, Avatar, Ring3D, SlamTag, Arrow, slamK, CAP, STAGE, SCAN, RING_ISO, Drum, Marked, Announce, MBadge, RailSteps, StairSteps, ZigSteps, QBubble, Grid15, RameWipe, Forklift, ICO, MC, ACR, lin, hexMix, cl, GyroFlash, Hot, Photo, Pill2, Ph, TChip, Row3, SlamCard, ZInk, ZTicker, ZAxis, ZDef, CI, CD, METH, JCirText, JMirror, JNewton, JFuse, JShock, JTree, JAccordion, JRing, JButterfly, JAmdec, JHazop, JHourglass, JRewind, JFlipArrow, JBoard, JYarn, JPrint, JFault, JGears, JYinYang, JConstellation, CONST, ESiren, ECompass, ENeonExit, EFloorPlan, EBlackout, EVestDrop, EQueue, EDoor, ESonar, ERadio, EHub, EConfusion, EDice, ETape, EChess, EFunnel, ETally, EGavel, EBaton, EFiretruck, EGauge, EDomino, ECycle, EMonths, EChecklist, ESpiral, EFeather, EOdometer, ECrack, ENail, ETarget, EUnity, ExitRunner, AssemblyIcon, Vest, CG, CR, CY, CO, LGearsTol, JCrtOff, LEar, LBook, LSeal, LEngrave, LBinders, LGap, L25, LPuppet, LOrg, LOrbit, LLaw, LPlane, LSlide, LSwiss, LBalance, LBattery, LTri, LRoutine, LNine, LPlant, LSign, LSayDo, LSteps, LKnit, LDaily, LAnchor, LDistill, LJuggle, LIceberg, LTrophy, LJenga, LToggle, LWeak, LY, LN, LR, LG, LB, VForce, VAcro, VFour, VWheel, VGauge, VPillars, VMirror, VMorph, VStairs, VSkills, VIoT, VBlueprint, YRoad, YHouse, YEngine, YDust, YCubes, YCompass, YBingo, YBricks, YWave, YRadar, YFlatline, YReactor, YDials, YFlatpack, YVault, YCurtain, YLights, YMagnify, YCert, YTriad, YToolbox, YDeming, YMagic, ToolArt, yGearPath, YB, YN, YT, YO, YR, YG, YY, ITangle, ITrilemma, IVenn, ISilos, IClone, IPile, IGasworks, IColumns, IConveyor, IGlobe, IShield, IWeld, IBeforeAfter, ISafe, IHelix, IOverlay, IAlign, ITable, ISpine, IPrism, ITrampoline, IBroadcast, IPodium, IOpenQ, QSE3, IQ, IS, IE, IN, IO, QXray, QSilhouette, qBody, QCrowd, QDesk, QSign, QTissues, QGear, QEquation, QLineup, QPullback, QMonolith, QSectors, QKeys, QWorkstation, QRotate, QLift, QHoist, QPuzzle, QGesture, QR, QN, QB, QG, QO, QY, Center, RbUntil, RbSwapBadge, RING_A, RING_B, RB_BORDER, RbHazardFrame, RB_PTS, RB_C, RB_HEAT, RbChip, RbDisc, RbPerson, RBSK, RbFlame, RbGauge, RbParticles, RbKey, RbVersus, RbVocab, RbSamePlane, RB_PROG, RbProgram, RbBigWord, RbNaked, RbPayErr, RbPayContext, RbThermo, RbFactory, RbOffice, RB_M, rbCell, RbMatrixGrid, RbShields, RbLevers, RbPaySecure, RbNetFormula, RbMatrixDrop, RbTrap, RbThree, RbCliff, RbXray, RbBudget, RbSacred, RbLine, RbMeeting, RbLoop, RbMaintain, RbFiles, RbSoftware, RbCoexist, RbAbyss, RbGhost, RB_IMPACT, RB_SCENE, RB_GYRO, rbDecay, RbCam, RbShock, RbFlash, RbLeak, RbVignette, RbGrain, RB_SLAM, RbSlam, RbRing9, RbSpot, RbGlitch, RB_SPARK, RbSparkle, RbFlare, RbSpeed, RbBlob, RbRipple, RbBokeh, RbScramble, RbRays, RbColorImg, RbHolo, RbBlinds, RbNeon, RbDust, RbLaser, RbShatter, RbSonar, RbConfetti, RbChecker, RbInk, RbFireflies, RbProgress, RbN, RbR, RbO, RbG, RbB, RbT, RbY, RbV, RbP, RbK, RbSl, RbGold];

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn, Barred, Flap];
