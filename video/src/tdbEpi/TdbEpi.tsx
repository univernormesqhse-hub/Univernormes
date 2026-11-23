import React from 'react';
import {AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, spring, staticFile} from 'remotion';
import {
  Bell, Calendar, CalendarClock, Check, CircleAlert, CircleCheckBig, CircleX, ClipboardCheck, ClipboardList, Ear, FileSpreadsheet, Filter, Footprints, Frown,
  Gauge, Glasses, Hand, HardHat, Link2, MousePointer2, Phone, RefreshCw, Shield, ShieldCheck, Shirt, Truck, User, Users, Wind, Building2, Briefcase, Timer,
} from 'lucide-react';
import type {LucideIcon} from 'lucide-react';
import {easeIn, easeInOut, easeOut, prog, useT} from '../anim';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {s, sansFont} from '../theme';
import {captions} from './captions';

/**
 * « Tableau de bord de gestion des EPI » — vidéo de présentation motion design (voix off ElevenLabs fournie, 2 min 01),
 * identité UNIVERSNORMES : bleu marine #13296B, vert #1FA36E, blanc, globe et orbites du logo. Très dynamique : chaque
 * plan enchaîne 3 à 6 animations synchronisées sur la voix, transition « orbite » (arcs marine et vert qui balaient
 * l'écran), poussées caméra, curseur qui clique. Données réelles du classeur Tableau_de_Bord_EPI.xlsm (ateliers, EPI,
 * validités, mises en service et renouvellements par mois) ; les numéros de téléphone sont masqués. Aucune musique.
 */
const NAVY = '#13296B', GREEN = '#1FA36E', INK = '#0E1A3A', BG = '#F4F7FC', RED = '#E03131', YEL = '#F5B400', ORA = '#F28C28', GREY = '#8A94A8';
const FONT = sansFont;
const OUTRO_AT = 121.4;
export const TDB_EPI_FRAMES = s(OUTRO_AT + 4.2);
const cl = (v: number) => Math.min(1, Math.max(0, v));
const eo = (x: number) => 1 - Math.pow(1 - cl(x), 3);
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const pop = (t: number, a: number, k = 10, d = 11) => (t < a ? 0 : spring({frame: (t - a) * 30, fps: 30, config: {stiffness: k * 18, damping: d}}));
const PH = (f: string) => staticFile(`tdb-epi/${f}`);
const EP = (f: string) => staticFile(`epi/${f}`);

/* ═══ Habillage permanent ═══ */
const Backdrop: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: BG}}>
    <AbsoluteFill style={{backgroundImage: 'radial-gradient(rgba(19,41,107,0.10) 2.5px, transparent 2.5px)', backgroundSize: '46px 46px', backgroundPosition: `${t * 6}px ${t * 10}px`}} />
    <div style={{position: 'absolute', left: -260 + Math.sin(t * 0.3) * 60, top: 180 + Math.cos(t * 0.25) * 80, width: 760, height: 760, borderRadius: '50%', background: 'radial-gradient(circle, rgba(31,163,110,0.16), transparent 68%)'}} />
    <div style={{position: 'absolute', right: -300 + Math.cos(t * 0.27) * 60, top: 1050 + Math.sin(t * 0.22) * 90, width: 860, height: 860, borderRadius: '50%', background: 'radial-gradient(circle, rgba(19,41,107,0.14), transparent 68%)'}} />
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: 0.08}}><ellipse cx={540} cy={960} rx={820} ry={260} fill="none" stroke={NAVY} strokeWidth={14} transform={`rotate(${-18 + Math.sin(t * 0.2) * 4} 540 960)`} /><ellipse cx={540} cy={960} rx={760} ry={200} fill="none" stroke={GREEN} strokeWidth={10} transform={`rotate(${40 + Math.cos(t * 0.2) * 4} 540 960)`} /></svg>
  </AbsoluteFill>;
};
const FLOAT: LucideIcon[] = [HardHat, Hand, Glasses, Ear, Footprints, Shirt, Wind, Link2, ShieldCheck, ClipboardCheck];
const Floaters: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{pointerEvents: 'none'}}>{FLOAT.map((Ic, i) => { const x = 60 + ((i * 337) % 940), y0 = 300 + ((i * 523) % 1400); const y = y0 - ((t * (18 + i * 4)) % 1700) + (y0 < 900 ? 0 : 0); const yy = ((y % 1700) + 1700) % 1700 + 150; return <div key={i} style={{position: 'absolute', left: x + Math.sin(t * 0.6 + i) * 40, top: yy, opacity: 0.07, transform: `rotate(${Math.sin(t * 0.4 + i * 2) * 25}deg)`}}><Ic size={90 + (i % 3) * 30} color={i % 2 ? GREEN : NAVY} strokeWidth={2} /></div>; })}</AbsoluteFill>;
};
const Header: React.FC = () => {
  const t = useT();
  if (t < 7.0 || t > OUTRO_AT) return null;
  const k = eo((t - 7.0) / 0.6);
  return <div style={{position: 'absolute', left: 40, right: 40, top: 46, height: 120, zIndex: 50, transform: `translateY(${(1 - k) * -160}px)`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', borderRadius: 30, boxShadow: '0 14px 40px rgba(19,41,107,0.14)', padding: '0 26px'}}>
    <Img src={PH('logo.png')} style={{height: 96}} />
    <div style={{display: 'flex', alignItems: 'center', gap: 12, background: NAVY, color: '#fff', borderRadius: 20, padding: '12px 20px', fontFamily: FONT, fontWeight: 900, fontSize: 26}}><HardHat size={34} color={GREEN} strokeWidth={2.6} />TABLEAU DE BORD EPI</div>
  </div>;
};
const SCENES = [0, 7.1, 17.3, 25.5, 35.1, 43.7, 59.6, 68.1, 72.9, 94.8, 109.0, 117.3];
const Progress: React.FC = () => {
  const t = useT();
  if (t > OUTRO_AT) return null;
  return <div style={{position: 'absolute', left: 60, right: 60, top: 1880, height: 12, zIndex: 50, display: 'flex', gap: 8}}>{SCENES.map((a, i) => { const b = SCENES[i + 1] ?? OUTRO_AT; const k = cl((t - a) / (b - a)); return <div key={i} style={{flex: 1, borderRadius: 6, background: 'rgba(19,41,107,0.15)', overflow: 'hidden'}}><div style={{width: `${k * 100}%`, height: '100%', background: k >= 1 ? NAVY : GREEN}} /></div>; })}</div>;
};
/* transition « orbite » : arc marine + arc vert qui balaient l'écran et masquent la coupe */
const OrbitWipe: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  const u = (t - (at - 0.45)) / 0.9;
  if (u <= 0 || u >= 1) return null;
  const q = easeInOut(u), cover = Math.sin(u * Math.PI);
  return <AbsoluteFill style={{zIndex: 80, pointerEvents: 'none', overflow: 'hidden'}}>
    <svg width={1080} height={1920}>
      <g transform={`translate(${lerp(-1400, 1500, q)} ${lerp(2400, -500, q)}) rotate(-35)`}>
        <rect x={-1600} y={-260} width={3200} height={520} fill={NAVY} />
        <rect x={-1600} y={260} width={3200} height={120} fill={GREEN} />
        <rect x={-1600} y={-360} width={3200} height={70} fill={GREEN} opacity={0.7} />
      </g>
    </svg>
    <AbsoluteFill style={{background: NAVY, opacity: 0.25 * cover}} />
    {cover > 0.6 && <div style={{position: 'absolute', left: 540 - 130, top: 960 - 130, width: 260, height: 260, opacity: (cover - 0.6) / 0.4, transform: `rotate(${u * 140}deg)`}}><Img src={PH('globe.png')} style={{width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(0) invert(1)'}} /></div>}
  </AbsoluteFill>;
};
/* sous-titres : carte blanche, mots-clés en vert */
const Captions: React.FC = () => {
  const t = useT() + 0.15;
  const c = captions.find((x) => t >= x.start && t < x.end + 0.05);
  if (!c || t > OUTRO_AT) return null;
  const k = Math.min(1, (t - c.start) / 0.2);
  const parts = c.text.split(/(\*[^*]+\*)/).filter(Boolean);
  return <div style={{position: 'absolute', left: 0, right: 0, top: 1690, zIndex: 60, display: 'flex', justifyContent: 'center'}}>
    <div style={{background: '#fff', borderRadius: 22, padding: '14px 30px', boxShadow: '0 12px 34px rgba(19,41,107,0.18)', borderBottom: `6px solid ${GREEN}`, transform: `translateY(${(1 - k) * 24}px) scale(${0.94 + 0.06 * k})`, opacity: k, maxWidth: 960, textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: 46, color: INK, lineHeight: 1.15}}>
      {parts.map((p, i) => p.startsWith('*') ? <span key={i} style={{color: GREEN, fontWeight: 900}}>{p.slice(1, -1)}</span> : <span key={i}>{p}</span>)}
    </div>
  </div>;
};

/* ═══ Briques ═══ */
const Title: React.FC<{y: number; at: number; l: string; c?: string; fs?: number; sub?: string; out?: number}> = ({y, at, l, c = NAVY, fs = 64, sub, out}) => {
  const t = useT();
  if (t < at || (out && t > out)) return null;
  const words = l.split(' ');
  return <div style={{position: 'absolute', left: 50, right: 50, top: y, zIndex: 20, textAlign: 'center'}}>
    <div style={{fontFamily: FONT, fontWeight: 900, fontSize: fs, color: c, lineHeight: 1.05}}>{words.map((w, i) => { const k = eo((t - at - i * 0.06) / 0.35); return <span key={i} style={{display: 'inline-block', marginRight: 16, opacity: k, transform: `translateY(${(1 - k) * 50}px) rotate(${(1 - k) * 6}deg)`}}>{w}</span>; })}</div>
    {sub && <div style={{marginTop: 10, fontFamily: FONT, fontWeight: 700, fontSize: 30, color: GREEN, opacity: eo((t - at - 0.4) / 0.4)}}>{sub}</div>}
  </div>;
};
const Chip: React.FC<{x: number; y: number; at: number; l: string; c?: string; Ic?: LucideIcon; fs?: number; out?: number; dark?: boolean}> = ({x, y, at, l, c = NAVY, Ic, fs = 32, out, dark = true}) => {
  const t = useT();
  if (t < at || (out && t > out)) return null;
  const k = Math.min(1.06, pop(t, at, 12, 10)), o = out ? 1 - prog(t, out - 0.25, out) : 1;
  return <div style={{position: 'absolute', left: x, top: y, zIndex: 22, transform: `translate(-50%, -50%) scale(${k})`, opacity: o, display: 'flex', alignItems: 'center', gap: 12, background: dark ? c : '#fff', color: dark ? '#fff' : c, border: dark ? 'none' : `4px solid ${c}`, borderRadius: 999, padding: `12px ${fs * 0.8}px`, fontFamily: FONT, fontWeight: 900, fontSize: fs, whiteSpace: 'nowrap', boxShadow: '0 10px 26px rgba(19,41,107,0.22)'}}>{Ic && <Ic size={fs * 1.15} strokeWidth={2.6} />}{l}</div>;
};
const Card: React.FC<{x: number; y: number; w: number; h: number; at: number; children: React.ReactNode; out?: number; from?: 'up' | 'left' | 'right' | 'zoom'; style?: React.CSSProperties}> = ({x, y, w, h, at, children, out, from = 'up', style}) => {
  const t = useT();
  if (t < at || (out && t > out + 0.3)) return null;
  const k = eo((t - at) / 0.5), o = out ? 1 - prog(t, out, out + 0.3, easeIn) : 1;
  const tr = from === 'up' ? `translateY(${(1 - k) * 120}px)` : from === 'left' ? `translateX(${(1 - k) * -700}px)` : from === 'right' ? `translateX(${(1 - k) * 700}px)` : `scale(${0.6 + 0.4 * k})`;
  return <div style={{position: 'absolute', left: x, top: y, width: w, height: h, zIndex: 15, opacity: k * o, transform: tr, background: '#fff', borderRadius: 28, boxShadow: '0 18px 50px rgba(19,41,107,0.16)', overflow: 'hidden', ...style}}>{children}</div>;
};
/* écran réel (enregistrement du classeur) dans un ordinateur, avec poussée caméra */
const Laptop: React.FC<{y: number; at: number; src: string; from?: number; zoom?: [number, number, number, number]; out?: number; still?: boolean}> = ({y, at, src, from = 0, zoom = [1, 1.25, 0.5, 0.3], out, still}) => {
  const t = useT();
  if (t < at || (out && t > out + 0.4)) return null;
  const k = eo((t - at) / 0.6), o = out ? 1 - prog(t, out, out + 0.4, easeIn) : 1;
  const z = lerp(zoom[0], zoom[1], prog(t, at + 0.4, (out ?? at + 8) - 0.2, easeInOut));
  const W = 980, H = 600;
  return <div style={{position: 'absolute', left: 50, top: y, width: W, zIndex: 14, opacity: o, transform: `perspective(1600px) rotateX(${(1 - k) * 35}deg) translateY(${(1 - k) * 200}px)`}}>
    <div style={{width: W, height: H, background: '#0B1633', borderRadius: 26, padding: 16, boxShadow: '0 30px 70px rgba(19,41,107,0.35)'}}>
      <div style={{width: '100%', height: '100%', borderRadius: 12, overflow: 'hidden', background: '#fff', position: 'relative'}}>
        <div style={{position: 'absolute', inset: 0, transform: `scale(${z})`, transformOrigin: `${zoom[2] * 100}% ${zoom[3] * 100}%`}}>
          {still ? <Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top'}} /> : <Sequence from={s(at)} layout="none"><OffthreadVideo src={PH(src)} startFrom={s(from)} muted style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top'}} /></Sequence>}
        </div>
        <div style={{position: 'absolute', top: 0, bottom: 0, width: 160, left: lerp(-200, W + 200, cl((t - at - 0.5) / 1.2)), background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)', transform: 'skewX(-18deg)'}} />
      </div>
    </div>
    <div style={{width: W + 80, marginLeft: -40, height: 34, background: 'linear-gradient(#D7DCE8, #AEB6C8)', borderRadius: '0 0 30px 30px'}} />
  </div>;
};
const Cursor: React.FC<{path: [number, number, number][]}> = ({path}) => {
  const t = useT();
  if (t < path[0][2] - 0.3 || t > path[path.length - 1][2] + 0.8) return null;
  let i = path.findIndex(([, , a]) => t < a);
  if (i === -1) i = path.length;
  const [x0, y0, a0] = path[Math.max(0, i - 1)], [x1, y1, a1] = path[Math.min(path.length - 1, i)];
  const q = i === 0 || i === path.length ? 1 : easeInOut(cl((t - a0) / (a1 - a0)));
  const x = i === 0 ? path[0][0] : lerp(x0, x1, q), y = i === 0 ? path[0][1] : lerp(y0, y1, q);
  const click = path.some(([, , a]) => t > a && t < a + 0.25);
  return <div style={{position: 'absolute', left: x, top: y, zIndex: 70}}>
    {path.map(([, , a], j) => { const u = t - a; return u > 0 && u < 0.5 ? <div key={j} style={{position: 'absolute', left: -40 - u * 60, top: -40 - u * 60, width: 80 + u * 120, height: 80 + u * 120, borderRadius: '50%', border: `5px solid ${GREEN}`, opacity: 1 - u / 0.5}} /> : null; })}
    <MousePointer2 size={70} color="#fff" fill={INK} strokeWidth={1.6} style={{transform: `scale(${click ? 0.85 : 1})`, filter: 'drop-shadow(3px 4px 4px rgba(0,0,0,0.35))'}} />
  </div>;
};
const Count: React.FC<{v: number; at: number; dur?: number; suffix?: string}> = ({v, at, dur = 0.8, suffix = ''}) => {
  const t = useT();
  return <>{Math.round(v * prog(t, at, at + dur, easeOut)).toLocaleString('fr-FR')}{suffix}</>;
};
const Stamp: React.FC<{x: number; y: number; at: number; l: string; c?: string; fs?: number; out?: number}> = ({x, y, at, l, c = RED, fs = 48, out}) => {
  const t = useT();
  if (t < at || (out && t > out)) return null;
  const k = eo((t - at) / 0.22), sc = lerp(2.4, 1, k);
  return <div style={{position: 'absolute', left: x, top: y, zIndex: 30, transform: `translate(-50%, -50%) rotate(-8deg) scale(${sc})`, opacity: k, border: `8px solid ${c}`, borderRadius: 16, padding: '8px 26px', fontFamily: FONT, fontWeight: 900, fontSize: fs, color: c, letterSpacing: 3, background: 'rgba(255,255,255,0.88)', whiteSpace: 'nowrap'}}>{l}</div>;
};

/* ═══ Scènes ═══ */
const EPI_ICONS: [string, LucideIcon][] = [['Casques', HardHat], ['Gants', Hand], ['Harnais', Link2], ['Masques', Wind]];
const Hook: React.FC = () => {
  const t = useT();
  return <>
    {EPI_ICONS.map(([l, Ic], i) => { const a = [0.0, 0.3, 0.7, 1.1][i]; const k = Math.min(1.08, pop(t, a, 13, 9)); const x = 150 + i * 260, y = 360 + (i % 2) * 70; const out = prog(t, 6.6, 7.1, easeIn); return k > 0 ? <div key={l} style={{position: 'absolute', left: x - 110, top: y - 110 - out * 600, width: 220, zIndex: 20, transform: `scale(${k}) rotate(${Math.sin(t * 2 + i) * 4}deg)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
      <div style={{width: 190, height: 190, borderRadius: 48, background: i % 2 ? GREEN : NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 16px 36px rgba(19,41,107,0.3)'}}><Ic size={110} color="#fff" strokeWidth={2.2} /></div>
      <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 34, color: INK}}>{l}</div>
    </div> : null; })}
    <Card x={90} y={640} w={900} h={170} at={1.4} from="left" out={6.6}><div style={{display: 'flex', alignItems: 'center', gap: 24, height: '100%', padding: '0 36px'}}><Users size={80} color={NAVY} /><div style={{fontFamily: FONT, fontWeight: 900, fontSize: 52, color: NAVY}}>Qui a reçu quoi ?</div></div></Card>
    <Card x={90} y={840} w={900} h={170} at={2.9} from="right" out={6.6}><div style={{display: 'flex', alignItems: 'center', gap: 24, height: '100%', padding: '0 36px'}}><CalendarClock size={80} color={ORA} /><div style={{fontFamily: FONT, fontWeight: 900, fontSize: 52, color: NAVY}}>Quand renouveler ?</div></div></Card>
    <Card x={90} y={1040} w={900} h={170} at={4.6} from="left" out={6.6}><div style={{display: 'flex', alignItems: 'center', gap: 24, height: '100%', padding: '0 36px'}}><CircleAlert size={80} color={RED} /><div style={{fontFamily: FONT, fontWeight: 900, fontSize: 52, color: NAVY}}>Lesquels sont périmés ?</div></div></Card>
    <Card x={190} y={1260} w={700} h={330} at={1.9} from="zoom" out={6.6}><Img src={EP('epi-panoplie.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.05 + (t - 1.9) * 0.03})`}} /></Card>
    {t > 6.0 && t < 6.9 && <Stamp x={700} y={1180} at={6.1} l="PÉRIMÉ ?" fs={58} />}
  </>;
};
const Reveal: React.FC = () => {
  const t = useT();
  return <>
    <Title y={230} at={7.3} l="Tableau de bord de suivi des EPI" fs={66} />
    <Laptop y={440} at={7.8} src="dash.mp4" zoom={[1, 1.12, 0.3, 0.2]} out={17.0} />
    <Card x={70} y={1150} w={300} h={120} at={10.6} from="zoom" out={17.0} style={{background: '#1D6F42'}}><div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, height: '100%', color: '#fff', fontFamily: FONT, fontWeight: 900, fontSize: 40}}><FileSpreadsheet size={60} />Excel</div></Card>
    <Chip x={640} y={1180} at={10.2} l="Un seul fichier" Ic={Check} c={NAVY} fs={30} />
    {[['Dotation', 11.8, ClipboardList, NAVY], ['Renouvellement', 12.4, RefreshCw, ORA], ['Suivi', 13.5, Gauge, GREEN]].map(([l, a, Ic, c], i) => <Chip key={l as string} x={200 + i * 340} y={1340} at={a as number} l={l as string} Ic={Ic as LucideIcon} c={c as string} fs={30} />)}
    <Chip x={540} y={1480} at={14.7} l="Équipements de protection individuelle" c={GREEN} Ic={Shield} fs={28} dark={false} />
    <Chip x={540} y={1580} at={16.0} l="Tout le personnel" c={NAVY} Ic={Users} fs={32} />
  </>;
};
const NAV: [string, LucideIcon, number][] = [['Tableau de bord', Gauge, 19.9], ['Dotation', HardHat, 21.1], ['Gestion du personnel', Users, 21.8]];
const Navigation: React.FC = () => {
  const t = useT();
  const active = NAV.reduce((m, [, , a], i) => (t >= a ? i : m), -1);
  return <>
    <Title y={240} at={17.5} l="3 boutons, c'est tout" fs={70} />
    <Card x={60} y={470} w={960} h={200} at={18.1} from="zoom"><div style={{display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'space-around'}}>{NAV.map(([l, Ic, a], i) => { const on = i === active; const k = t >= a ? Math.min(1.1, pop(t, a, 14, 8)) : 1; return <div key={l} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, transform: `scale(${on ? k * 1.08 : 0.92})`, opacity: t >= a || on ? 1 : 0.45}}>
      <div style={{width: 110, height: 110, borderRadius: 30, background: on ? GREEN : t >= a ? NAVY : '#E4E9F3', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: on ? `0 0 0 8px rgba(31,163,110,0.25)` : 'none'}}><Ic size={64} color={t >= a ? '#fff' : GREY} /></div>
      <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 24, color: on ? GREEN : NAVY}}>{l}</div>
    </div>; })}</div></Card>
    <Cursor path={[[860, 900, 19.3], [250, 600, 19.9], [540, 600, 21.1], [830, 600, 21.8], [700, 1150, 23.6]]} />
    <Card x={200} y={780} w={680} h={460} at={22.8} from="up"><div style={{height: 110, background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, color: '#fff', fontFamily: FONT, fontWeight: 900, fontSize: 40}}><Calendar size={50} />Date du jour</div>
      <div style={{textAlign: 'center', marginTop: 40, fontFamily: FONT, fontWeight: 900, fontSize: 150, color: NAVY, lineHeight: 1, transform: `rotateX(${(1 - prog(t, 23.4, 23.9)) * 90}deg)`}}>23</div>
      <div style={{textAlign: 'center', marginTop: 16, fontFamily: FONT, fontWeight: 800, fontSize: 44, color: GREEN}}>lundi · novembre</div>
    </Card>
    <Chip x={540} y={1360} at={24.4} l="Automatique" Ic={RefreshCw} c={GREEN} fs={34} />
  </>;
};
const KPI: [string, LucideIcon, string, number, string][] = [['Valides', CircleCheckBig, GREEN, 28.5, 'en vert'], ['En cours', CircleAlert, YEL, 30.7, 'en jaune'], ['Dépassés', CircleX, RED, 32.7, 'en rouge']];
const Kpis: React.FC = () => {
  const t = useT();
  return <>
    <Title y={240} at={25.7} l="3 compteurs en un coup d'œil" fs={62} />
    {KPI.map(([l, Ic, c, a, sub], i) => { const on = t >= a; const k = Math.min(1.07, pop(t, a, 12, 9)); const shake = i === 2 && t > 33.9 ? Math.sin(t * 40) * 6 * Math.exp(-(t - 33.9) * 2) : 0; return on ? <div key={l} style={{position: 'absolute', left: 90 + shake, top: 450 + i * 300, width: 900, height: 260, zIndex: 16, transform: `scale(${k})`, background: '#fff', borderRadius: 32, boxShadow: `0 18px 44px rgba(19,41,107,0.16)`, borderLeft: `22px solid ${c}`, display: 'flex', alignItems: 'center', gap: 34, padding: '0 40px'}}>
      <Ic size={150} color={c} strokeWidth={2.4} style={{transform: `rotate(${(1 - cl((t - a) / 0.4)) * -90}deg)`}} />
      <div><div style={{fontFamily: FONT, fontWeight: 900, fontSize: 30, color: GREY, letterSpacing: 3}}>EPI</div><div style={{fontFamily: FONT, fontWeight: 900, fontSize: 76, color: c === YEL ? '#C98F00' : c, lineHeight: 1}}>{l}</div><div style={{fontFamily: FONT, fontWeight: 700, fontSize: 30, color: INK}}>{sub}</div></div>
    </div> : null; })}
    <Chip x={540} y={1420} at={33.9} l="À renouveler en priorité" Ic={Bell} c={RED} fs={36} />
  </>;
};
const SLICERS: [string, string[], number][] = [['Ateliers', ['Brassage', 'STEP', 'PET', 'Thermolyse', 'Fermentation', 'MPC'], 38.4], ['Statuts', ['Dépassé', 'En cours', 'Valide'], 39.0], ['EPI', ['Casque', 'Gants', 'Harnais', 'Masque', 'Visière', 'Bouchons'], 39.9]];
const Filters: React.FC = () => {
  const t = useT();
  const bars = [18, 6, 7, 21, 6, 8, 23, 20, 11];
  const reb = t > 40.5 ? prog(t, 40.5, 41.5, easeOut) : 1;
  const pick = [1, 0, 3];
  return <>
    <Title y={240} at={35.3} l="Des filtres dynamiques" fs={66} />
    {SLICERS.map(([h, items, a], g) => <Card key={h} x={60} y={430 + g * 300} w={440} h={270} at={36.6 + g * 0.15} from="left"><div style={{padding: 18}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 10, fontFamily: FONT, fontWeight: 900, fontSize: 30, color: NAVY, marginBottom: 12}}><Filter size={30} color={GREEN} />{h}</div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>{items.map((it, j) => { const on = t >= a && j === pick[g]; return <div key={it} style={{padding: '8px 14px', borderRadius: 12, background: on ? GREEN : '#EAF0FA', color: on ? '#fff' : NAVY, fontFamily: FONT, fontWeight: 800, fontSize: 22, transform: `scale(${on ? 1.08 : 1})`}}>{it}</div>; })}</div>
    </div></Card>)}
    <Card x={540} y={430} w={480} h={870} at={37.2} from="right"><div style={{padding: 20}}>
      <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 28, color: NAVY}}>Tableau de bord</div>
      <svg width={440} height={420} style={{marginTop: 20}}>{bars.map((b, i) => { const h = b * 14 * (t > 40.5 ? reb : prog(t, 37.5 + i * 0.05, 38.3 + i * 0.05)) * (t > 40.5 ? [0.4, 1, 0.6, 1.2, 0.3, 0.9, 0.5, 1.1, 0.7][i] : 1); return <rect key={i} x={10 + i * 47} y={400 - h} width={34} height={h} rx={6} fill={t > 40.5 ? GREEN : '#7B3FB8'} />; })}</svg>
      <div style={{display: 'flex', gap: 12, marginTop: 30}}>{[GREEN, YEL, RED].map((c, i) => <div key={c} style={{flex: 1, height: 120, borderRadius: 18, background: c, opacity: 0.9, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: FONT, fontWeight: 900, fontSize: 40, transform: `scale(${t > 40.5 ? 1 + 0.1 * Math.sin(cl((t - 40.5 - i * 0.1) / 0.4) * Math.PI) : 1})`}}>{[CircleCheckBig, CircleAlert, CircleX].map((I, j) => j === i ? <I key={j} size={56} /> : null)}</div>)}</div>
    </div></Card>
    {t > 42.3 && <div style={{position: 'absolute', left: 780 - 60, top: 1180, zIndex: 40, transform: `rotate(${(t - 42.3) * 400}deg)`}}><RefreshCw size={120} color={GREEN} strokeWidth={3} /></div>}
    <Cursor path={[[400, 1500, 37.8], [150, 580, 38.4], [140, 870, 39.0], [300, 1170, 39.9], [780, 900, 40.5], [800, 1450, 42.6]]} />
    <Chip x={540} y={1440} at={40.5} l="Un clic, tout se met à jour" Ic={MousePointer2} c={NAVY} fs={34} />
  </>;
};
const ATEL: [string, number, number][] = [['Brassage', 25, 49.0], ['STEP', 23, 49.6], ['PET', 21, 49.9], ['Thermolyse', 20, 50.4], ['Fermentation', 18, 50.9], ['Traitement des eaux', 11, 0], ['Siroperie', 8, 0], ['MPC', 7, 0], ['Filtration', 6, 0], ['Salle des machines', 6, 0]];
const EPIC: [string, LucideIcon, number, number][] = [['Casques', HardHat, 12, 56.6], ['Casquettes', HardHat, 23, 57.1], ['Gants', Hand, 14, 57.5], ['Chaussures', Footprints, 15, 58.0], ['Harnais', Link2, 12, 58.4], ['Masques', Wind, 15, 58.9], ['Visières', Glasses, 11, 59.3], ['Bouchons', Ear, 7, 0], ['Blouses', Shirt, 11, 0]];
const Ateliers: React.FC = () => {
  const t = useT();
  const part1 = t < 51.7;
  return <>
    <Title y={240} at={43.9} l={part1 ? 'Suivi des EPI par atelier' : 'Un compteur par type d\'EPI'} fs={60} />
    {part1 && <>
      <Card x={60} y={420} w={960} h={1020} at={44.2} from="zoom"><div style={{padding: '30px 30px'}}>
        {ATEL.map(([l, v, a], i) => { const k = prog(t, 44.6 + i * 0.08, 45.4 + i * 0.08, easeOut); const hot = a > 0 && t >= a; return <div key={l} style={{display: 'flex', alignItems: 'center', gap: 16, height: 94}}>
          <div style={{width: 300, textAlign: 'right', fontFamily: FONT, fontWeight: 900, fontSize: 28, color: hot ? GREEN : NAVY, transform: `scale(${hot ? 1.06 : 1})`}}>{l}</div>
          <div style={{flex: 1, height: 52, background: '#EEF2F9', borderRadius: 12, overflow: 'hidden'}}><div style={{width: `${(v / 25) * 100 * k}%`, height: '100%', borderRadius: 12, background: hot ? `linear-gradient(90deg, ${GREEN}, #37C98C)` : `linear-gradient(90deg, ${NAVY}, #3156B8)`}} /></div>
          <div style={{width: 60, fontFamily: FONT, fontWeight: 900, fontSize: 30, color: NAVY}}>{Math.round(v * k)}</div>
        </div>; })}
      </div></Card>
      {t > 47.8 && <div style={{position: 'absolute', left: 760, top: 300, zIndex: 30, transform: `scale(${Math.min(1.1, pop(t, 47.9, 12, 9))}) rotate(8deg)`, width: 220, height: 220, borderRadius: 110, background: GREEN, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: FONT, fontWeight: 900, boxShadow: '0 14px 34px rgba(31,163,110,0.45)'}}><div style={{fontSize: 96, lineHeight: 1}}><Count v={10} at={47.9} /></div><div style={{fontSize: 30}}>ateliers</div></div>}
      <Chip x={540} y={1540} at={45.2} l="Nombre de dotations du fichier" Ic={ClipboardCheck} c={NAVY} fs={26} dark={false} />
    </>}
    {!part1 && <>
      <Chip x={540} y={400} at={52.0} l="À droite du tableau de bord" Ic={Gauge} c={NAVY} fs={28} dark={false} />
      {EPIC.map(([l, Ic, v, a], i) => { const k = Math.min(1.08, pop(t, 52.6 + i * 0.12, 12, 9)); const hot = a > 0 && t >= a; const x = 70 + (i % 3) * 320, y = 500 + Math.floor(i / 3) * 330; return <div key={l} style={{position: 'absolute', left: x, top: y, width: 300, height: 300, zIndex: 16, transform: `scale(${k * (hot ? 1.04 : 1)})`, background: hot ? NAVY : '#fff', borderRadius: 34, boxShadow: hot ? `0 0 0 8px rgba(31,163,110,0.35), 0 18px 40px rgba(19,41,107,0.25)` : '0 14px 34px rgba(19,41,107,0.14)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6}}>
        <Ic size={84} color={hot ? GREEN : NAVY} strokeWidth={2.3} />
        <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 78, lineHeight: 1, color: hot ? '#fff' : NAVY}}><Count v={v} at={52.6 + i * 0.12} dur={1.0} /></div>
        <div style={{fontFamily: FONT, fontWeight: 800, fontSize: 28, color: hot ? '#C9F2DF' : GREY}}>{l}</div>
      </div>; })}
    </>}
  </>;
};
const Fiche: React.FC = () => {
  const t = useT();
  const names = ['Aicha', 'Blaise', 'Marius', 'Yasmine', 'Kais'];
  const open = t > 61.6 && t < 63.2;
  const FIELDS: [string, string, LucideIcon, number][] = [['Âge', '41 ans', User, 64.0], ['Atelier', 'PET', Building2, 64.5], ['Fonction', 'HSE', Briefcase, 65.1], ['Téléphone', '69• •• •• 43', Phone, 65.9]];
  return <>
    <Title y={240} at={59.8} l="La fiche d'un salarié" fs={66} />
    <Card x={90} y={420} w={900} h={170} at={60.2} from="zoom" style={{overflow: 'visible', zIndex: 25}}><div style={{display: 'flex', alignItems: 'center', height: '100%', padding: '0 30px', gap: 20}}>
      <div style={{background: ORA, color: '#fff', borderRadius: 16, padding: '12px 20px', fontFamily: FONT, fontWeight: 900, fontSize: 34}}>Choix du nom</div>
      <div style={{flex: 1, height: 90, border: `4px solid ${NAVY}`, borderRadius: 16, display: 'flex', alignItems: 'center', padding: '0 20px', fontFamily: FONT, fontWeight: 900, fontSize: 44, color: NAVY}}>{t > 63.1 ? 'Yasmine' : ''}<span style={{marginLeft: 'auto', fontSize: 30, color: GREY}}>▼</span></div>
    </div>
      {open && <div style={{position: 'absolute', left: 330, top: 160, width: 540, background: '#fff', borderRadius: 16, boxShadow: '0 20px 40px rgba(0,0,0,0.2)', overflow: 'hidden'}}>{names.map((n, i) => <div key={n} style={{padding: '14px 22px', fontFamily: FONT, fontWeight: 800, fontSize: 34, color: i === 3 ? '#fff' : NAVY, background: i === 3 && t > 62.6 ? GREEN : '#fff', opacity: cl((t - 61.6 - i * 0.06) / 0.2)}}>{n}</div>)}</div>}
    </Card>
    {FIELDS.map(([l, v, Ic, a], i) => <Card key={l} x={i % 2 ? 555 : 90} y={720 + Math.floor(i / 2) * 330} w={435} h={290} at={a} from={i % 2 ? 'right' : 'left'}><div style={{padding: 26, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 12, fontFamily: FONT, fontWeight: 900, fontSize: 32, color: GREEN}}><Ic size={42} />{l}</div>
      <div style={{fontFamily: FONT, fontWeight: 900, fontSize: l === 'Téléphone' ? 46 : 70, color: NAVY}}>{v}</div>
    </div></Card>)}
    <Img src={EP('travailleur-epi.png')} style={{position: 'absolute', left: 840, top: 1380 - Math.min(1, pop(t, 64.0, 10, 10)) * 120, height: 260, zIndex: 18}} />
    <Chip x={400} y={1440} at={67.1} l="Immédiatement" Ic={Timer} c={GREEN} fs={36} />
    <Cursor path={[[900, 900, 61.0], [800, 505, 61.6], [600, 790, 62.6], [700, 505, 63.1]]} />
  </>;
};
const MES = [30, 5, 26, 16, 26, 20, 22, 0, 0, 0];
const REN = [0, 9, 14, 13, 19, 17, 13, 30, 12, 4];
const MOIS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.'];
const Curves: React.FC = () => {
  const t = useT();
  const line = (d: number[], at: number) => { const n = Math.max(1, Math.round(prog(t, at, at + 1.6, easeInOut) * (d.length - 1))); return d.slice(0, n + 1).map((v, i) => `${i ? 'L' : 'M'} ${60 + i * 92} ${560 - v * 15}`).join(' '); };
  return <>
    <Title y={240} at={68.3} l="2 courbes, mois par mois" fs={66} />
    <Card x={60} y={420} w={960} h={700} at={68.4} from="zoom"><svg width={960} height={700}>
      {MOIS.map((m, i) => <text key={m} x={60 + i * 92} y={620} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={800} fontSize={22} fill={GREY}>{m}</text>)}
      <line x1={40} y1={570} x2={920} y2={570} stroke="#DDE3EE" strokeWidth={4} />
      <path d={line(MES, 69.9)} fill="none" stroke={GREEN} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" />
      <path d={line(REN, 71.0)} fill="none" stroke={ORA} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" />
      {t > 70.5 && <g><rect x={60} y={40} width={330} height={56} rx={14} fill={GREEN} /><text x={225} y={78} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={28} fill="#fff">Mises en service</text></g>}
      {t > 71.6 && <g><rect x={560} y={40} width={330} height={56} rx={14} fill={ORA} /><text x={725} y={78} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={28} fill="#fff">Renouvellements</text></g>}
    </svg></Card>
    <Chip x={540} y={1260} at={71.9} l="Anticiper les commandes" Ic={Truck} c={NAVY} fs={38} />
    {t > 72.0 && <div style={{position: 'absolute', left: lerp(-300, 1200, prog(t, 72.0, 73.4, easeIn)), top: 1340, zIndex: 20}}><Truck size={130} color={GREEN} /></div>}
  </>;
};
const ROWS: [string, string, string, string][] = [['Bouhdaoui', 'Traitement des eaux', 'Casque', '18/07/2022'], ['Yasmine', 'PET', 'Harnais', '05/05/2022'], ['Blaise', 'Thermolyse', 'Casquette', '09/05/2021'], ['Marius', 'STEP', 'Visière', '24/01/2024'], ['Ramz', 'Brassage', 'Masque', '05/06/2022']];
const COLS: [string, number][] = [['Salarié', 77.4], ['Atelier', 78.1], ['Équipement', 78.5], ['Mise en service', 79.5]];
const Dotation: React.FC = () => {
  const t = useT();
  const ph = t < 81.0 ? 0 : t < 89.2 ? 1 : 2;
  return <>
    <Title y={240} at={73.1} l={ph === 0 ? "L'onglet Dotation" : ph === 1 ? 'Le calcul automatique' : 'Dépassé ? Impossible à rater'} fs={62} />
    {ph === 0 && <Card x={40} y={440} w={1000} h={640} at={73.6} from="zoom"><div style={{display: 'grid', gridTemplateColumns: '1.1fr 1.4fr 1.1fr 1.2fr', fontFamily: FONT}}>
      {COLS.map(([c, a]) => <div key={c} style={{background: t >= a ? GREEN : NAVY, color: '#fff', fontWeight: 900, fontSize: 25, padding: '22px 12px', textAlign: 'center', transition: 'none'}}>{c}</div>)}
      {ROWS.map((r, i) => r.map((v, j) => { const k = eo((t - 74.9 - i * 0.18) / 0.35); const hot = t >= COLS[j][1]; return <div key={`${i}${j}`} style={{padding: '30px 10px', textAlign: 'center', fontWeight: 800, fontSize: 26, color: NAVY, background: hot ? 'rgba(31,163,110,0.10)' : i % 2 ? '#F6F8FC' : '#fff', opacity: k, transform: `translateX(${(1 - k) * 80}px)`, borderBottom: '2px solid #E6EBF4'}}>{v}</div>; }))}
    </div></Card>}
    {ph === 0 && <Chip x={540} y={1200} at={76.2} l="Chaque remise est enregistrée" Ic={ClipboardCheck} c={GREEN} fs={32} />}
    {ph === 1 && <>
      <div style={{position: 'absolute', left: 60, right: 60, top: 430, zIndex: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        {[['Mise en service', '18/07/2022', NAVY, 81.4], ['+', '', GREY, 84.5], ['Validité casque', '30 jours', ORA, 84.9], ['=', '', GREY, 83.2]].map(([l, v, c, a], i) => { const k = Math.min(1.08, pop(t, a as number, 12, 9)); return v ? <div key={i} style={{width: 380, height: 240, borderRadius: 30, background: '#fff', boxShadow: '0 16px 40px rgba(19,41,107,0.16)', borderTop: `14px solid ${c}`, transform: `scale(${k})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}><div style={{fontFamily: FONT, fontWeight: 800, fontSize: 28, color: GREY}}>{l}</div><div style={{fontFamily: FONT, fontWeight: 900, fontSize: 52, color: c as string}}>{v}</div></div> : <div key={i} style={{fontFamily: FONT, fontWeight: 900, fontSize: 90, color: NAVY, transform: `scale(${k})`}}>{l}</div>; })}
      </div>
      <Card x={140} y={760} w={800} h={200} at={83.2} from="zoom" style={{background: NAVY}}><div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, height: '100%', color: '#fff', fontFamily: FONT, fontWeight: 900}}><RefreshCw size={70} color={GREEN} style={{transform: `rotate(${t * 200}deg)`}} /><div><div style={{fontSize: 30, color: '#9FB3E8'}}>Renouvellement</div><div style={{fontSize: 64}}>17/08/2022</div></div></div></Card>
      <Card x={140} y={1000} w={380} h={240} at={86.7} from="left"><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 8}}><div style={{fontFamily: FONT, fontWeight: 800, fontSize: 28, color: GREY}}>Jours restants</div><div style={{fontFamily: FONT, fontWeight: 900, fontSize: 64, color: RED}}>−<Count v={1559} at={86.8} dur={1.0} /></div></div></Card>
      <Card x={560} y={1000} w={380} h={240} at={88.2} from="right" style={{background: RED}}><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 6, color: '#fff', fontFamily: FONT, fontWeight: 900}}><div style={{fontSize: 28}}>Statut</div><div style={{fontSize: 58}}>Dépassé</div><Frown size={60} style={{opacity: cl((t - 88.7) / 0.3)}} /></div></Card>
    </>}
    {ph === 2 && <>
      <Laptop y={440} at={89.3} src="dotation.mp4" from={2} zoom={[1, 1.6, 0.92, 0.15]} />
      {t > 91.3 && <div style={{position: 'absolute', left: 540 - 140, top: 1110, zIndex: 25, width: 280, height: 280, borderRadius: 140, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1.1, pop(t, 91.3, 12, 8))}) rotate(${Math.sin(t * 8) * 6}deg)`, boxShadow: '0 0 60px rgba(224,49,49,0.6)'}}><Frown size={200} color="#fff" strokeWidth={2.2} /></div>}
      <Stamp x={540} y={1470} at={93.0} l="IMPOSSIBLE À RATER" fs={50} />
    </>}
  </>;
};
const VALID: [string, string, LucideIcon, number][] = [['Casque', '30 jours', HardHat, 105.0], ['Harnais', '90 jours', Link2, 106.5], ['Gilet haute visibilité', '120 jours', Shirt, 108.4]];
const Perso: React.FC = () => {
  const t = useT();
  const ph = t < 101.0;
  return <>
    <Title y={240} at={95.1} l="Gestion du personnel" fs={66} sub={ph ? 'Les référentiels, au même endroit' : undefined} />
    {ph && <>
      <Laptop y={430} at={95.2} src="perso.png" still zoom={[1, 1.15, 0.1, 0.1]} out={100.9} />
      {[['Salariés', 97, Users, 99.0], ['Ateliers', 10, Building2, 99.8], ['Fonctions', 0, Briefcase, 100.5]].map(([l, v, Ic, a], i) => <Card key={l as string} x={70 + i * 320} y={1180} w={300} h={220} at={a as number} from="up"><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 6}}>{React.createElement(Ic as LucideIcon, {size: 56, color: GREEN})}{(v as number) > 0 && <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 60, color: NAVY, lineHeight: 1}}><Count v={v as number} at={a as number} /></div>}<div style={{fontFamily: FONT, fontWeight: 900, fontSize: 30, color: NAVY}}>{l as string}</div></div></Card>)}
    </>}
    {!ph && <>
      <Chip x={540} y={420} at={101.2} l="Durée de validité de chaque EPI" Ic={Timer} c={NAVY} fs={32} />
      {VALID.map(([l, v, Ic, a], i) => { const days = parseInt(v); const k = prog(t, a, a + 0.8, easeOut); return <Card key={l} x={60} y={540 + i * 300} w={960} h={260} at={a - 0.4} from="left"><div style={{display: 'flex', alignItems: 'center', gap: 26, height: '100%', padding: '0 34px'}}>
        <div style={{width: 140, height: 140, borderRadius: 36, background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ic size={84} color="#fff" /></div>
        <div style={{flex: 1}}><div style={{fontFamily: FONT, fontWeight: 900, fontSize: 40, color: NAVY}}>{l}</div>
          <div style={{marginTop: 14, height: 40, background: '#EEF2F9', borderRadius: 20, overflow: 'hidden'}}><div style={{width: `${(days / 120) * 100 * k}%`, height: '100%', borderRadius: 20, background: `linear-gradient(90deg, ${GREEN}, #37C98C)`}} /></div></div>
        <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 56, color: GREEN, width: 220, textAlign: 'right'}}><Count v={days} at={a} /> j</div>
      </div></Card>; })}
    </>}
  </>;
};
const BEN: [string, LucideIcon, number][] = [['Plus aucun EPI oublié', CircleCheckBig, 111.4], ['Des renouvellements anticipés', CalendarClock, 112.9], ['Une preuve de dotation prête pour l\'audit', ShieldCheck, 114.2]];
const Benefits: React.FC = () => {
  const t = useT();
  return <>
    <Title y={240} at={109.2} l="Résultat" fs={86} c={GREEN} />
    {BEN.map(([l, Ic, a], i) => { const k = Math.min(1.06, pop(t, a, 12, 9)); return k > 0 ? <div key={l} style={{position: 'absolute', left: 70, top: 440 + i * 310, width: 940, height: 260, zIndex: 16, transform: `scale(${k}) translateX(${(1 - Math.min(1, k)) * -300}px)`, background: i === 2 ? NAVY : '#fff', borderRadius: 34, boxShadow: '0 18px 44px rgba(19,41,107,0.18)', display: 'flex', alignItems: 'center', gap: 30, padding: '0 40px'}}>
      <div style={{width: 150, height: 150, borderRadius: 75, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}><Ic size={92} color="#fff" /></div>
      <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 46, color: i === 2 ? '#fff' : NAVY, lineHeight: 1.1}}>{l}</div>
    </div> : null; })}
    <Img src={EP('harnais.jpg')} style={{position: 'absolute', left: 290, top: 1400, width: 500, height: 230, objectFit: 'cover', borderRadius: 26, zIndex: 14, opacity: eo((t - 115.0) / 0.4), boxShadow: '0 16px 40px rgba(19,41,107,0.2)'}} />
  </>;
};
const Cta: React.FC = () => {
  const t = useT();
  const k = Math.min(1.05, pop(t, 117.5, 9, 11));
  const out = t > OUTRO_AT ? prog(t, OUTRO_AT + 3.4, OUTRO_AT + 4.2) : 0;
  return <AbsoluteFill style={{zIndex: 45, opacity: 1 - out}}>
    <Title y={260} at={117.6} l="Ce tableau de bord pour votre entreprise ?" fs={54} />
    <div style={{position: 'absolute', left: 540 - 300, top: 560, width: 600, height: 480, transform: `scale(${k})`}}>
      <Img src={PH('globe.png')} style={{width: '100%', height: '100%', objectFit: 'contain', transform: `rotate(${Math.sin(t * 1.2) * 4}deg)`}} />
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 1060, textAlign: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 100, color: NAVY, letterSpacing: 0, clipPath: `inset(0 ${(1 - prog(t, 120.2, 121.0, easeOut)) * 100}% 0 0)`}}>UNIVERSNORMES</div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 1210, textAlign: 'center', fontFamily: FONT, fontStyle: 'italic', fontWeight: 600, fontSize: 44, color: '#4A5266', opacity: prog(t, 120.8, 121.4)}}>Qualité <span style={{color: GREEN}}>•</span> Sécurité <span style={{color: GREEN}}>•</span> Environnement</div>
    <Chip x={540} y={1400} at={120.2} l="Contactez-nous" Ic={Phone} c={GREEN} fs={44} />
  </AbsoluteFill>;
};

const CUTS = [7.1, 17.3, 25.5, 35.1, 43.7, 51.6, 59.6, 68.1, 72.9, 81.0, 89.2, 94.8, 101.0, 109.0, 117.3];
const SC: [React.FC, number, number][] = [[Hook, 0, 7.1], [Reveal, 7.1, 17.3], [Navigation, 17.3, 25.5], [Kpis, 25.5, 35.1], [Filters, 35.1, 43.7], [Ateliers, 43.7, 59.6], [Fiche, 59.6, 68.1], [Curves, 68.1, 72.9], [Dotation, 72.9, 94.8], [Perso, 94.8, 109.0], [Benefits, 109.0, 117.3], [Cta, 117.3, 999]];
const Cam: React.FC<{children: React.ReactNode}> = ({children}) => {
  const t = useT();
  const a = [...CUTS].reverse().find((c) => t >= c) ?? 0;
  const punch = 1 + 0.05 * Math.exp(-(t - a) * 4) + 0.012 * Math.sin(t * 0.7);
  return <AbsoluteFill style={{transform: `scale(${punch})`, transformOrigin: '50% 45%'}}>{children}</AbsoluteFill>;
};
const CUES: Sfx[] = [
  ...[0.0, 0.3, 0.7, 1.1].map((at) => ({at, s: 'sfx/pop', v: 0.3})), ...[1.4, 2.9, 4.6].map((at) => ({at, s: 'sfx/swish', v: 0.25})), {at: 6.1, s: 'tampon', v: 0.35},
  ...CUTS.map((at) => ({at: at - 0.45, s: 'sfx/whoosh', v: 0.3})),
  ...[10.6, 11.8, 12.4, 13.5, 16.0, 24.4, 33.9, 40.5, 45.2, 52.0, 67.1, 71.9, 76.2, 101.2, 120.2].map((at) => ({at, s: 'sfx/pop', v: 0.2})),
  ...[19.9, 21.1, 21.8, 38.4, 39.0, 39.9, 40.5, 61.6, 62.6, 63.1].map((at) => ({at, s: 'sfx/click', v: 0.32})),
  ...[28.5, 30.7].map((at) => ({at, s: 'sfx/ding', v: 0.22})), {at: 32.7, s: 'alarme', v: 0.12, dur: 1.0},
  ...[49.0, 49.6, 49.9, 50.4, 50.9, 56.6, 57.1, 57.5, 58.0, 58.4, 58.9, 59.3].map((at) => ({at, s: 'tick', v: 0.14})),
  {at: 47.9, s: 'sfx/ding', v: 0.22}, ...[64.0, 64.5, 65.1, 65.9].map((at) => ({at, s: 'sfx/swish', v: 0.18})), {at: 69.9, s: 'sfx/rise', v: 0.18, dur: 1.6}, {at: 72.0, s: 'soft-whoosh', v: 0.3},
  ...[77.4, 78.1, 78.5, 79.5].map((at) => ({at, s: 'sfx/click', v: 0.2})), {at: 83.2, s: 'validation', v: 0.25}, {at: 86.8, s: 'tick', v: 0.2}, {at: 88.2, s: 'sfx/thud', v: 0.3}, {at: 91.3, s: 'deep-hit', v: 0.35}, {at: 93.0, s: 'tampon', v: 0.35},
  ...[99.0, 99.8, 100.5, 105.0, 106.5, 108.4].map((at) => ({at, s: 'sfx/ding', v: 0.18})), ...[111.4, 112.9, 114.2].map((at) => ({at, s: 'validation', v: 0.22})),
  {at: 117.5, s: 'riser', v: 0.25, dur: 2.5}, {at: OUTRO_AT - 0.6, s: 'signature-marque', v: 0.55, dur: 3.5},
];

export const TdbEpi: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: BG, fontFamily: FONT}}>
    <Backdrop />
    <Floaters />
    <Cam>{SC.map(([C, a, b]) => (t >= a - 0.05 && t < b + 0.05 ? <C key={a} /> : null))}</Cam>
    <Header />
    {CUTS.map((a) => <OrbitWipe key={a} at={a} />)}
    <Captions />
    <Progress />
    <Audio src={PH('voix-tdb-epi.mp3')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>;
};
