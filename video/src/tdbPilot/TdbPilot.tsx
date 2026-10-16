import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Captions} from '../components/Captions';
import {Blinds, Board, Center, Cite, Deep, Dust, Kin, Out, Pill, Stamp, Tile, Word} from '../durab/Durab';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {handFont, s, sansFont} from '../theme';
import {Abs, Bg, DIM, easeIn, easeInOut, easeOut, GREEN, INK, lerp, LOGO, PAPER, PH, pop, prog, RED, spring, T, useT} from '../implIso/kit';
import {captions} from './captions';

/**
 * « Tableaux de bord QHSE » (6 min 54) — capsule « hors normes » qui fusionne les quatre skills de style :
 *  - William (video-promo-diagnostic-qhse) : chaîne de 5 maillons dont un casse, jauge de score, cartes cochées ;
 *  - Ray (style-ray-tech-decodee) : en-tête « UNIVERSNORMES // QHSE DÉCODÉE », cartes néo-brutalistes à ombre dure,
 *    étiquettes monospace, courbes qui se tracent, mots barrés ;
 *  - Ambassade (style-ambassade-ui-tech) : éclats corail qui entrent par les coins, fenêtres d'interface sombres,
 *    mot-clé en étiquette noire ;
 *  - Amadou (style-amadou-storytelling) : phrase d'accroche avec mot surligné jaune et mot-chute manuscrit, halos.
 * Thème « papier quadrillé », voix d'origine, sous-titres recalés mot à mot, photos réelles.
 * Fil rouge inédit : LE CIRCUIT. La course de nuit de l'intro devient l'identité : l'en-tête est un circuit vu de dessus
 * (stade, damier, 5 secteurs) sur lequel une voiture tourne de plus en plus vite ; le secteur courant et un chrono
 * monospace (temps écoulé de la vidéo) sont affichés à gauche.
 * Transition inédite : LES FEUX DE DÉPART — cinq feux rouges s'allument un à un, passent au vert, « DÉPART ! », la
 * voiture traverse l'écran en laissant des traînées et le titre de la partie apparaît entre deux éclats corail.
 * (La capsule courte « Construire un tableau de bord QHSE efficace » utilise déjà des cadrans : on ne les reprend
 * pas en fil rouge ici.)
 */
const BLUE = '#1F6FD1';
const ORANGE = '#F07A12';
const TEAL = '#0F9D8F';
const VIO = '#6D4BD8';
const CORAL = '#D86C50';
const YEL = '#F5C400';
const BURG = '#7A1F2B';
const NIGHT = '#151A26';
const MONO = '"JetBrains Mono", "IBM Plex Mono", "DejaVu Sans Mono", monospace';
const OUTRO_AT = 410.9;
export const TDBPILOT_FRAMES = s(OUTRO_AT + 3.8);
const SECT = [
  {at: 61.2, n: '1', title: 'Le rôle du tableau QHSE', s: 'quatre missions', c: BLUE, g: 'RÔLE'},
  {at: 113.75, n: '2', title: 'Indicateurs sécurité', s: 'protéger les équipes', c: RED, g: 'SÉCU'},
  {at: 183.85, n: '3', title: 'Indicateurs qualité', s: 'respect des exigences', c: VIO, g: 'QUAL'},
  {at: 232.15, n: '4', title: 'Volet environnemental', s: 'impact et conformité', c: GREEN, g: 'ENV'},
  {at: 295.7, n: '5', title: 'Construire l’outil', s: 'bonnes pratiques', c: ORANGE, g: 'OUTIL'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);

/* ─── Briques « Ray » ─── */
export const Brut: React.FC<{x: number; y: number; w: number; h?: number; at: number; sh?: string; children: React.ReactNode; style?: React.CSSProperties}> = ({x, y, w, h, at, sh = INK, children, style}) => {
  const t = useT();
  const p = Math.max(0, Math.min(1, spring(t, at, 8, 13)));
  return <Abs x={x} y={y} w={w} h={h} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 14, boxShadow: `8px 8px 0 ${sh}`, padding: 22, boxSizing: 'border-box', transform: `translateY(${(1 - p) * 50}px) scale(${0.92 + 0.08 * p})`, opacity: t >= at ? 1 : 0, ...style}}>{children}</Abs>;
};
export const Mono: React.FC<{children: React.ReactNode; at: number; c?: string; size?: number; style?: React.CSSProperties}> = ({children, at, c = INK, size = 20, style}) => {
  const t = useT();
  return <span style={{display: 'inline-block', background: c, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: size, letterSpacing: 2, padding: '4px 12px', borderRadius: 4, textTransform: 'uppercase', opacity: pop(t, at), transform: `translateY(${(1 - pop(t, at)) * 10}px)`, ...style}}>{children}</span>;
};
export const Strike: React.FC<{p: number; c?: string}> = ({p, c = BURG}) => <div style={{position: 'absolute', left: -6, right: -6, top: '52%', height: 6, background: c, transform: `scaleX(${p})`, transformOrigin: '0 50%'}} />;
/* ─── Brique « Ambassade » : éclat corail à branches arrondies, entrant par un coin ─── */
const Burst: React.FC<{at: number; corner: 'tl' | 'tr' | 'bl' | 'br'; size?: number; c?: string; out?: number}> = ({at, corner, size = 300, c = CORAL, out}) => {
  const t = useT();
  const p = prog(t, at, at + 0.5, easeOut) * (out ? 1 - prog(t, out - 0.4, out, easeIn) : 1);
  if (p <= 0) return null;
  const pos: React.CSSProperties = {tl: {left: -size * 0.4, top: 430}, tr: {right: -size * 0.4, top: 430}, bl: {left: -size * 0.35, bottom: 360}, br: {right: -size * 0.35, bottom: 360}}[corner];
  const rot = {tl: 135, tr: 225, bl: 45, br: -45}[corner];
  return (
    <div style={{position: 'absolute', ...pos, width: size, height: size, transform: `rotate(${rot + (1 - p) * 40}deg) scale(${p})`, opacity: 0.95, pointerEvents: 'none', zIndex: 1}}>
      <svg width={size} height={size} viewBox="-50 -50 100 100">{[-50, -25, 0, 25, 50].map((a, k) => <line key={k} x1={0} y1={0} x2={Math.cos(((a - 90) * Math.PI) / 180) * (k % 2 ? 36 : 46)} y2={Math.sin(((a - 90) * Math.PI) / 180) * (k % 2 ? 36 : 46)} stroke={c} strokeWidth={9} strokeLinecap="round" />)}</svg>
    </div>
  );
};
/* ─── Brique « Amadou » : phrase avec mot surligné jaune ─── */
export const HiLine: React.FC<{words: string[]; mark?: number[]; at: number; size?: number; y: number; hand?: string; handAt?: number; c?: string; x?: number; w?: number}> = ({words, mark = [], at, size = 58, y, hand, handAt = 0, c = INK, x = 50, w = 980}) => {
  const t = useT();
  return (
    <Abs x={x} y={y} w={w} style={{textAlign: 'center'}}>
      <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: size, color: c, lineHeight: 1.18}}>
        {words.map((w, i) => {
          const st = at + i * 0.09;
          const p = pop(t, st, 0.3);
          const hi = mark.includes(i) ? prog(t, st + 0.25, st + 0.65, easeOut) : 0;
          return <span key={i} style={{display: 'inline-block', marginRight: size * 0.25, opacity: p, filter: `blur(${(1 - p) * 6}px)`, transform: `translateY(${(1 - p) * 14}px)`, backgroundImage: `linear-gradient(${YEL}, ${YEL})`, backgroundRepeat: 'no-repeat', backgroundSize: `${hi * 100}% 42%`, backgroundPosition: '0 88%'}}>{w}</span>;
        })}
      </div>
      {hand && <div style={{fontFamily: handFont, fontWeight: 700, fontSize: size * 1.05, color: INK, marginTop: 4, clipPath: `inset(0 ${(1 - prog(t, handAt, handAt + 0.7, easeOut)) * 100}% 0 0)`}}>{hand}</div>}
    </Abs>
  );
};
/* ─── Brique « William » : maillon ─── */
export const Link: React.FC<{label: string; sub: string; at: number; c: string; broken?: number; dim?: number; n: string}> = ({label, sub, at, c, broken = 0, dim = 0, n}) => {
  const t = useT();
  const p = Math.max(0, Math.min(1, spring(t, at, 8, 12)));
  return (
    <div style={{position: 'relative', height: 132, opacity: (t >= at ? 1 : 0) * (1 - dim * 0.6), transform: `translateX(${(1 - p) * -120}px) rotate(${broken * 4}deg)`}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 110, borderRadius: 60, background: broken > 0.5 ? '#FFE9E7' : '#fff', border: `6px solid ${broken > 0.5 ? RED : c}`, display: 'flex', alignItems: 'center', gap: 18, padding: '0 28px', boxShadow: '0 10px 22px rgba(20,33,61,0.14)'}}>
        <div style={{width: 64, height: 64, borderRadius: 32, background: broken > 0.5 ? RED : c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{n}</div>
        <div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>{label}</div><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 22, color: DIM}}>{sub}</div></div>
        {broken > 0 && <svg width={80} height={110} style={{position: 'absolute', right: 120, top: -6}}><path d="M40 0 L28 30 L50 52 L30 80 L44 110" fill="none" stroke={RED} strokeWidth={7} strokeDasharray={140} strokeDashoffset={140 * (1 - broken)} /></svg>}
      </div>
      <div style={{position: 'absolute', left: '50%', top: 104, width: 34, height: 34, marginLeft: -17, borderRadius: 17, border: `6px solid ${INK}`, opacity: 0.6}} />
    </div>
  );
};
/* ─── Cadran (fil rouge et transition) ─── */
const Gauge: React.FC<{r: number; v: number; on: number; c: string; label?: string; ticks?: number; mono?: boolean}> = ({r, v, on, c, label, ticks = 9}) => {
  const a = lerp(-120, 120, v);
  const rad = (d: number) => ((d - 90) * Math.PI) / 180;
  return (
    <svg width={r * 2 + 10} height={r * 1.75} viewBox={`${-r - 5} ${-r - 5} ${r * 2 + 10} ${r * 1.75}`} style={{overflow: 'visible'}}>
      <circle cx={0} cy={0} r={r} fill={on > 0 ? '#0E1320' : '#1D2433'} stroke={on > 0 ? c : '#3A4458'} strokeWidth={r * 0.07} style={{filter: on > 0 ? `drop-shadow(0 0 ${r * 0.25 * on}px ${c})` : undefined}} />
      {Array.from({length: ticks}, (_, k) => {
        const d = lerp(-120, 120, k / (ticks - 1));
        return <line key={k} x1={Math.cos(rad(d)) * r * 0.72} y1={Math.sin(rad(d)) * r * 0.72} x2={Math.cos(rad(d)) * r * 0.88} y2={Math.sin(rad(d)) * r * 0.88} stroke={on > 0 ? (k >= ticks - 2 ? RED : '#E8EEF8') : '#4A5468'} strokeWidth={r * 0.05} strokeLinecap="round" opacity={0.4 + 0.6 * on} />;
      })}
      <line x1={0} y1={0} x2={Math.cos(rad(a)) * r * 0.7} y2={Math.sin(rad(a)) * r * 0.7} stroke={on > 0 ? c : '#5A647A'} strokeWidth={r * 0.07} strokeLinecap="round" />
      <circle cx={0} cy={0} r={r * 0.1} fill={on > 0 ? c : '#5A647A'} />
      {label && <text x={0} y={r * 0.52} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={r * 0.26} fill={on > 0 ? '#fff' : '#5A647A'}>{label}</text>}
    </svg>
  );
};

/* ═════════════ Fil rouge : le circuit ═════════════ */
/** Point sur un circuit en forme de stade (rectangle arrondi), u ∈ [0,1). */
const trackPt = (u: number, x0: number, y0: number, w: number, h: number) => {
  const r = h / 2;
  const L = 2 * (w - 2 * r) + 2 * Math.PI * r;
  let d = (((u % 1) + 1) % 1) * L;
  const st = w - 2 * r;
  if (d < st) return [x0 + r + d, y0];
  d -= st;
  if (d < Math.PI * r) { const a = -Math.PI / 2 + d / r; return [x0 + w - r + Math.cos(a) * r, y0 + r + Math.sin(a) * r]; }
  d -= Math.PI * r;
  if (d < st) return [x0 + w - r - d, y0 + h];
  d -= st;
  const a = Math.PI / 2 + d / r; return [x0 + r + Math.cos(a) * r, y0 + r + Math.sin(a) * r];
};
const Header: React.FC = () => {
  const t = useT();
  const si = sectIdx(t);
  const lap = t * (0.08 + 0.035 * Math.max(0, si + 1));
  const X0 = 360, Y0 = 18, W = 610, H = 70;
  const [cx, cy] = trackPt(lap, X0, Y0, W, H);
  const [bx, by] = trackPt(lap - 0.012, X0, Y0, W, H);
  const ang = (Math.atan2(cy - by, cx - bx) * 180) / Math.PI;
  const c = si < 0 ? CORAL : SECT[si].c;
  const mm = Math.floor(t / 60), ss = Math.floor(t % 60), ds = Math.floor((t * 10) % 10);
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 56, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 76, display: 'block'}} /></div>
      {t > 2.6 && t < OUTRO_AT && (
        <div style={{position: 'absolute', left: 36, right: 36, top: 178, height: 108, borderRadius: 22, background: '#fff', border: `5px solid ${INK}`, boxShadow: `7px 7px 0 ${BURG}`, opacity: pop(t, 2.6), overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 16, top: 10, fontFamily: MONO, fontSize: 13, letterSpacing: 2, color: DIM}}><b style={{color: INK}}>UNIVERSNORMES</b> <span style={{color: CORAL}}>//</span> QHSE DÉCODÉE</div>
          <div style={{position: 'absolute', left: 16, top: 34, fontFamily: MONO, fontWeight: 700, fontSize: 26, color: INK}}>{si < 0 ? 'TOUR DE CHAUFFE' : `SECTEUR ${si + 1}/5`}</div>
          <div style={{position: 'absolute', left: 16, top: 68, fontFamily: MONO, fontSize: 18, color: c}}>⏱ {String(mm).padStart(2, '0')}:{String(ss).padStart(2, '0')}.{ds}</div>
          <svg width={1008} height={108} style={{position: 'absolute', left: 0, top: 0}}>
            <rect x={X0} y={Y0} width={W} height={H} rx={H / 2} fill="none" stroke="#2A3142" strokeWidth={16} />
            <rect x={X0} y={Y0} width={W} height={H} rx={H / 2} fill="none" stroke="#fff" strokeWidth={2} strokeDasharray="10 10" />
            {SECT.map((x, k) => {
              const [px, py] = trackPt(k / 5 + 0.02, X0, Y0, W, H);
              const on = k <= si;
              return <g key={k}><circle cx={px} cy={py} r={on ? 11 : 8} fill={on ? x.c : '#fff'} stroke={INK} strokeWidth={3} /><text x={px} y={py + 4} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={11} fill={on ? '#fff' : INK}>{k + 1}</text></g>;
            })}
            {(() => { const [fx, fy] = trackPt(0, X0, Y0, W, H); return <g>{[0, 1, 2, 3].map((j) => <rect key={j} x={fx - 2 + (j % 2) * 5} y={fy - 8 + Math.floor(j / 2) * 8} width={5} height={8} fill={j % 3 ? INK : '#fff'} />)}</g>; })()}
            <g transform={`translate(${cx} ${cy}) rotate(${ang})`}><rect x={-14} y={-7} width={28} height={14} rx={5} fill={c} stroke={INK} strokeWidth={2.5} /><rect x={2} y={-5} width={7} height={10} rx={2} fill="#BFE3FF" /></g>
          </svg>
        </div>
      )}
    </AbsoluteFill>
  );
};

/** Les feux de départ : 5 feux rouges s'allument, s'éteignent… départ ! */
const Feux: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const S0 = SECT[i];
  const k = t - S0.at;
  if (k < 0 || k > 3.6) return null;
  const inn = prog(t, S0.at, S0.at + 0.3, easeOut) * (1 - prog(t, S0.at + 3.2, S0.at + 3.6, easeIn));
  const go = k >= 1.55;
  const zoom = prog(t, S0.at + 1.55, S0.at + 2.05, easeIn);
  const flash = Math.max(0, 1 - Math.abs(k - 1.6) * 5);
  return (
    <AbsoluteFill style={{zIndex: 35, opacity: inn}}>
      <AbsoluteFill style={{background: PAPER}} />
      <Bg />
      <AbsoluteFill style={{background: `rgba(31,166,122,${0.25 * flash})`}} />
      <Abs x={110} y={360} w={860} h={250} style={{background: NIGHT, borderRadius: 30, border: `6px solid ${INK}`, boxShadow: `10px 10px 0 ${S0.c}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 30px', boxSizing: 'border-box'}}>
        {[0, 1, 2, 3, 4].map((j) => {
          const on = !go && k > 0.3 + j * 0.24;
          const g = go && k < 2.6;
          const col = g ? GREEN : on ? RED : '#2A3142';
          return <div key={j} style={{width: 120, height: 120, borderRadius: 60, background: `radial-gradient(circle at 35% 35%, ${on || g ? '#fff' : '#3A4458'}, ${col} 55%)`, border: '6px solid #0B0F18', boxShadow: on || g ? `0 0 34px ${col}` : 'inset 0 0 20px #000'}} />;
        })}
      </Abs>
      <div style={{position: 'absolute', left: 0, right: 0, top: 640, height: 6, background: `repeating-linear-gradient(90deg, ${INK} 0 40px, #fff 40px 80px)`, opacity: 0.8}} />
      {go && <div style={{position: 'absolute', left: lerp(-300, 1300, zoom), top: 680, filter: zoom > 0 && zoom < 1 ? 'blur(2px)' : undefined}}><F n="voiture" size={220} style={{transform: 'scaleX(-1)'}} /></div>}
      {go && zoom < 1 && Array.from({length: 6}, (_, j) => <div key={j} style={{position: 'absolute', left: lerp(-300, 1300, zoom) - 220 - j * 60, top: 720 + j * 22, width: 180, height: 7, borderRadius: 4, background: `${S0.c}88`}} />)}
      <Abs x={0} y={900} w={1080} style={{textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 40, letterSpacing: 6, color: go ? GREEN : DIM}}>{go ? 'DÉPART !' : 'PARTIE ' + S0.n + ' / 5'}</Abs>
      <Abs x={60} y={1000} w={960} style={{textAlign: 'center'}}><Kin text={S0.title} at={S0.at + 1.75} size={S0.title.length > 20 ? 70 : 84} /></Abs>
      <Abs x={0} y={S0.title.length > 20 ? 1210 : 1120} w={1080} style={{textAlign: 'center'}}><Mono at={S0.at + 2.1} c={S0.c} size={30}>{S0.s}</Mono></Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('verites/operatrice-tablette.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 860, objectFit: 'cover', objectPosition: '50% 30%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 32%, ${PAPER}DD 40%, ${PAPER} 44%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={700} w={1080} style={{textAlign: 'center'}}>
        <div style={{fontFamily: MONO, fontSize: 26, letterSpacing: 4, color: DIM}}><b style={{color: INK}}>UNIVERSNORMES</b> <span style={{color: CORAL}}>//</span> QHSE DÉCODÉE</div>
        <T size={112} style={{marginTop: 14, textTransform: 'uppercase', letterSpacing: -3, lineHeight: 1}}>Tableaux</T>
        <T size={70} style={{textTransform: 'uppercase', letterSpacing: -1}}>de <span style={{backgroundImage: `linear-gradient(${YEL}, ${YEL})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 42%', backgroundPosition: '0 88%'}}>bord</span></T>
        <div style={{display: 'flex', justifyContent: 'center', gap: 12, marginTop: 14}}>{'QHSE'.split('').map((c, i) => <Tile key={i} ch={c} size={140} c={[BLUE, TEAL, RED, GREEN][i]} />)}</div>
      </Abs>
      <Abs x={90} y={1290} w={900} h={200} style={{background: NIGHT, borderRadius: 30, border: `6px solid ${INK}`, boxShadow: `10px 10px 0 ${BURG}`, display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '0 24px', boxSizing: 'border-box'}}>
        {SECT.map((x, k) => <div key={k} style={{width: 120, height: 120, borderRadius: 60, background: `radial-gradient(circle at 35% 35%, #fff, ${k < 4 ? RED : GREEN} 55%)`, border: '6px solid #0B0F18', boxShadow: `0 0 30px ${k < 4 ? RED : GREEN}`}} />)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO ═════════════ */
const Nuit: React.FC = () => {
  const t = useT();
  const road = (t * 900) % 240;
  const blink = (a: number) => (t > a ? 0.35 + 0.65 * Math.abs(Math.sin((t - a) * 6)) : 0);
  return (
    <Out end={11.85}>
      <HiLine words={['Une', 'course', 'de', 'nuit…']} mark={[1]} at={0.8} y={320} size={64} hand="tableau de bord éteint" handAt={5.6} />
      <Abs x={70} y={540} w={940} h={700} style={{background: NIGHT, borderRadius: 40, border: `6px solid ${INK}`, boxShadow: `12px 12px 0 ${BURG}`, overflow: 'hidden', opacity: pop(t, 2.0)}}>
        <svg width={940} height={330} style={{position: 'absolute', left: 0, top: 0}}>
          <polygon points="380,0 560,0 940,330 0,330" fill="#20283A" />
          {Array.from({length: 4}, (_, k) => {
            const y = ((k * 80 + road / 3) % 320);
            const w = lerp(6, 40, y / 320);
            return <rect key={k} x={470 - w / 2} y={y} width={w} height={lerp(10, 60, y / 320)} fill="#E8EEF8" opacity={0.7} />;
          })}
        </svg>
        <div style={{position: 'absolute', left: 0, right: 0, top: 330, height: 370, background: '#0B0F18', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
          {[{l: 'vitesse', a: 8.5}, {l: 'essence', a: 9.2}, {l: 'moteur', a: 10.4}].map((g, k) => (
            <div key={k} style={{textAlign: 'center'}}>
              <Gauge r={110} v={0} on={0} c={RED} ticks={9} />
              <div style={{fontFamily: MONO, fontSize: 30, fontWeight: 700, color: t > g.a ? RED : '#4A5468', opacity: t > g.a ? blink(g.a) : 1}}>{g.l} ?</div>
            </div>
          ))}
        </div>
      </Abs>
    </Out>
  );
};
const Chaos: React.FC = () => {
  const t = useT();
  const order = prog(t, 22.2, 24.0, easeInOut);
  const files = Array.from({length: 14}, (_, k) => ({x: 120 + random(`fx${k}`) * 760, y: 470 + random(`fy${k}`) * 520, r: (random(`fr${k}`) - 0.5) * 120, ic: ['dossier', 'graphique', 'clipboard', 'ecrit'][k % 4]}));
  return (
    <Out end={27.25}>
      <Center y={320}><Kin text="Sans suivi de performance…" at={12.3} size={58} /></Center>
      {files.map((f, k) => {
        const gx = 160 + (k % 7) * 120;
        const gy = 620 + Math.floor(k / 7) * 160;
        const x = lerp(f.x + Math.sin(t * 2 + k) * 30, gx, order);
        const y = lerp(f.y + Math.cos(t * 1.6 + k) * 30, gy, order);
        return <div key={k} style={{position: 'absolute', left: x, top: y, transform: `rotate(${lerp(f.r + t * 40 * (k % 2 ? 1 : -1), 0, order)}deg)`, opacity: pop(t, 12.4 + k * 0.08)}}><F n={f.ic} size={100} /></div>;
      })}
      {t < 22.1 && <Stamp at={18.1} c={RED} text="le chaos total" x={260} y={1090} rot={-6} size={58} />}
      {t > 22.0 && <Abs x={0} y={1060} w={1080} style={{textAlign: 'center', opacity: pop(t, 22.4)}}><div style={{display: 'flex', justifyContent: 'center', gap: 6}}>{[0, 1, 2].map((k) => <div key={k} style={{transform: `rotate(${t * (k % 2 ? -90 : 90)}deg)`, marginTop: k === 1 ? 30 : 0}}><F n="engrenage" size={110} /></div>)}</div><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 52, color: TEAL}}>une mécanique de précision</div></Abs>}
      {t > 25.4 && <Abs x={0} y={1290} w={1080}><Word text="QHSE" at={25.6} size={90} c={BLUE} variant={0} /></Abs>}
    </Out>
  );
};
const Unifie: React.FC = () => {
  const t = useT();
  const merge = prog(t, 36.0, 37.8, easeInOut);
  const XL = Array.from({length: 8}, (_, k) => ({x: 90 + (k % 4) * 230, y: 470 + Math.floor(k / 4) * 230}));
  const L = [{l: 'Qualité', a: 40.6, c: BLUE, ic: 'medaille'}, {l: 'Hygiène', a: 41.8, c: TEAL, ic: 'savon'}, {l: 'Sécurité', a: 42.5, c: RED, ic: 'casque'}, {l: 'Environnement', a: 43.3, c: GREEN, ic: 'planete'}];
  return (
    <Out end={46.15}>
      <Center y={320}><Kin text="Comment piloter tout ça ?" at={28.4} size={60} /></Center>
      {merge < 1 && XL.map((p, k) => (
        <div key={k} style={{position: 'absolute', left: lerp(p.x, 440, merge), top: lerp(p.y, 600, merge), width: 200, height: 170, background: '#fff', border: `4px solid ${INK}`, borderRadius: 12, boxShadow: `5px 5px 0 #1D6F42`, opacity: pop(t, 32.6 + k * 0.1) * (1 - merge), transform: `rotate(${(k % 3 - 1) * 6 * (1 - merge)}deg) scale(${1 - merge * 0.6})`}}>
          <div style={{background: '#1D6F42', color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 18, padding: '4px 10px'}}>fichier_{k + 1}.xlsx</div>
          {Array.from({length: 4}, (_, j) => <div key={j} style={{display: 'flex', gap: 4, margin: '8px 10px 0'}}>{[0, 1, 2].map((q) => <div key={q} style={{flex: 1, height: 14, background: '#DDE8E0'}} />)}</div>)}
        </div>
      ))}
      {merge < 0.9 && <Abs x={0} y={940} w={1080} style={{textAlign: 'center', opacity: pop(t, 33.3)}}><div style={{display: 'inline-block', position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: DIM}}>des dizaines de fichiers éparpillés<Strike p={prog(t, 35.9, 36.5)} /></div></Abs>}
      {merge > 0 && (
        <Abs x={90} y={460} w={900} h={620} style={{background: NIGHT, borderRadius: 24, border: `6px solid ${INK}`, boxShadow: `10px 10px 0 ${CORAL}`, overflow: 'hidden', opacity: merge, transform: `scale(${0.8 + 0.2 * merge})`}}>
          <div style={{height: 46, background: '#0E1320', display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 18}}>{[RED, YEL, GREEN].map((c) => <div key={c} style={{width: 14, height: 14, borderRadius: 7, background: c}} />)}<span style={{fontFamily: MONO, fontSize: 18, color: '#8B95A8', marginLeft: 14}}>tableau-de-bord-qhse</span></div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, padding: 28}}>
            {L.map((x, k) => {
              const on = prog(t, x.a, x.a + 0.4);
              return (
                <div key={k} style={{height: 230, borderRadius: 18, background: on > 0 ? `${x.c}22` : '#1D2433', border: `3px solid ${on > 0 ? x.c : '#2E3648'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: on > 0 ? `0 0 ${24 * on}px ${x.c}88` : 'none'}}>
                  <div style={{filter: on > 0 ? undefined : 'grayscale(1) brightness(0.4)'}}><F n={x.ic} size={100} /></div>
                  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: on > 0 ? '#fff' : '#5A647A', marginTop: 10}}>{x.l}</div>
                </div>
              );
            })}
          </div>
        </Abs>
      )}
      {t > 37.6 && <Abs x={0} y={1120} w={1080} style={{textAlign: 'center'}}><Mono at={37.7} c={INK} size={30}>un système unifié</Mono></Abs>}
      {t > 44.3 && <Abs x={0} y={1200} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: pop(t, 44.3)}}><F n="yeux" size={80} /><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 54, color: INK}}>en un seul coup d’œil</div></Abs>}
    </Out>
  );
};
const Plan: React.FC = () => {
  const t = useT();
  const P = [{l: 'Rôle du tableau QHSE', a: 49.8, c: BLUE}, {l: 'Indicateurs sécurité', a: 52.3, c: RED}, {l: 'Indicateurs qualité', a: 54.0, c: VIO}, {l: 'Volet environnemental', a: 55.5, c: GREEN}, {l: 'Construire l’outil', a: 57.3, c: ORANGE}];
  return (
    <Out end={61.2}>
      <HiLine words={['Notre', 'plan', 'd’action']} mark={[1, 2]} at={46.3} y={320} size={64} />
      {P.map((p, k) => (
        <Brut key={k} x={110 + (k % 2) * 40} y={460 + k * 160} w={820} h={130} at={p.a} sh={p.c} style={{display: 'flex', alignItems: 'center', gap: 22, padding: '0 26px'}}>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 48, color: p.c}}>0{k + 1}</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK}}>{p.l}</div>
        </Brut>
      ))}
    </Out>
  );
};

/* ═════════════ SECTION 1 ═════════════ */
const Missions: React.FC = () => {
  const t = useT();
  const M = [{l: 'Suivre', s: 'l’évolution de la performance', ic: 'courbe', a: 75.0, c: BLUE}, {l: 'Détecter', s: 'les écarts très vite', ic: 'loupe', a: 78.8, c: ORANGE}, {l: 'Se conformer', s: 'réglementation et audits', ic: 'check', a: 83.0, c: TEAL}, {l: 'Mobiliser', s: 'les équipes', ic: 'equipe', a: 88.1, c: VIO}];
  return (
    <Out end={97.65}>
      <HiLine words={['Quatre', 'missions', 'essentielles']} mark={[1]} at={73.0} y={320} size={60} />
      {t < 93.5 && (
        <>
          <Deep src="promo/audit-reunion.jpg" x={110} y={440} w={860} h={300} at={64.9} pos="50% 40%">
            <div style={{position: 'absolute', left: 20, top: 20}}><Mono at={68.4} c={RED} size={22}>données perdues</Mono></div>
            <div style={{position: 'absolute', right: 20, bottom: 20}}><Mono at={71.6} c={INK} size={22}>tout au même endroit</Mono></div>
          </Deep>
          {M.map((m, k) => (
            <Brut key={k} x={70 + (k % 2) * 480} y={790 + Math.floor(k / 2) * 250} w={460} h={220} at={m.a} sh={m.c} style={{textAlign: 'center'}}>
              <div style={{display: 'flex', justifyContent: 'center'}}><F n={m.ic} size={80} /></div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: m.c}}>{m.l}</div>
              <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 22, color: DIM}}>{m.s}</div>
            </Brut>
          ))}
        </>
      )}
      {t >= 93.5 && (
        <>
          <Blinds src="induction/briefing-atelier.jpg" x={70} y={440} w={940} h={560} at={93.6} pos="50% 45%">
            <div style={{position: 'absolute', right: 20, top: 20}}><Mono at={95.3} c={VIO} size={24}>visible par tous</Mono></div>
          </Blinds>
          <HiLine words={['des', 'objectifs', 'abstraits']} at={93.8} y={1040} size={44} c={DIM} hand="une réalité concrète" handAt={94.4} />
        </>
      )}
    </Out>
  );
};
const Decisions: React.FC = () => {
  const t = useT();
  const dust = prog(t, 107.0, 109.0);
  const shock = Math.max(0, 1 - Math.abs(t - 111.2) * 3);
  return (
    <Out end={113.75}>
      <Brut x={70} y={330} w={940} at={97.8} sh={YEL}>
        <div style={{fontFamily: 'Georgia, serif', fontSize: 110, color: YEL, lineHeight: 0.6}}>“</div>
        <HiLine words={['Un', 'tableau', 'de', 'bord', 'n’a', 'de', 'valeur', 'que', 's’il', 'déclenche', 'de', 'vraies', 'décisions.']} mark={[9, 12]} at={100.4} y={70} size={46} x={10} w={860} />
        <div style={{height: 230}} />
      </Brut>
      <Abs x={70} y={720} w={940} h={420}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 440, height: 400, borderRadius: 24, background: '#ECEAE4', border: `4px dashed #B9B4AA`, overflow: 'hidden', opacity: pop(t, 104.0)}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 24, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>REMPLIR DES CASES</div>
          {Array.from({length: 12}, (_, k) => <div key={k} style={{position: 'absolute', left: 40 + (k % 4) * 92, top: 80 + Math.floor(k / 4) * 90, width: 70, height: 60, border: `3px solid #B9B4AA`, borderRadius: 6, background: k < (t - 104.2) * 6 ? '#D6D1C6' : 'transparent'}} />)}
          <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%, rgba(160,150,130,${0.5 * dust}), transparent 70%)`}} />
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center', fontFamily: handFont, fontSize: 36, color: DIM, opacity: dust}}>poussière numérique…</div>
        </div>
        <div style={{position: 'absolute', right: 0, top: 0, width: 440, height: 400, borderRadius: 24, background: shock > 0 ? `rgba(245,196,0,${0.25 + 0.5 * shock})` : '#fff', border: `5px solid ${INK}`, boxShadow: `8px 8px 0 ${ORANGE}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 109.3), transform: `translateX(${Math.sin(t * 70) * 10 * shock}px)`}}>
          <F n="eclair" size={140} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK, marginTop: 10}}>un électrochoc</div>
          <Mono at={112.2} c={ORANGE} size={24} style={{marginTop: 10}}>l’action</Mono>
        </div>
      </Abs>
    </Out>
  );
};

/* ═════════════ SECTION 2 ═════════════ */
const Gravite: React.FC = () => {
  const t = useT();
  const pages = Math.max(0, Math.floor((t - 123.3) * 5));
  return (
    <Out end={140.05}>
      <HiLine words={['Le', 'taux', 'de', 'gravité']} mark={[1, 3]} at={121.8} y={320} size={68} />
      <Deep src="incident/blessure-soins.jpg" x={70} y={460} w={540} h={480} at={117.4} pos="45% 50%" />
      <Brut x={640} y={460} w={370} h={480} at={123.3} sh={RED} style={{textAlign: 'center'}}>
        <Mono at={123.4} c={RED} size={18}>jours d’arrêt</Mono>
        <div style={{position: 'relative', height: 230, marginTop: 20}}>
          {[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 60 + k * 6, top: 10 + k * 6, width: 200, height: 200, background: '#fff', border: `4px solid ${INK}`, borderRadius: 10}} />)}
          <div style={{position: 'absolute', left: 72, top: 22, width: 200, height: 200, background: '#fff', border: `4px solid ${INK}`, borderRadius: 10, overflow: 'hidden'}}>
            <div style={{height: 46, background: RED}} />
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 70, color: INK, marginTop: 20, transform: `rotateX(${((t - 123.3) * 5 % 1) * 30}deg)`}}>J+{pages % 99}</div>
          </div>
        </div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, marginTop: 10}}>la sévérité des accidents</div>
        <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 18, color: DIM, marginTop: 6}}>(compteur illustratif)</div>
      </Brut>
      <Abs x={70} y={980} w={940} style={{display: 'flex', justifyContent: 'center', gap: 20}}>
        <div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: DIM, opacity: pop(t, 126.9)}}>une petite ligne de tableur<Strike p={prog(t, 128.9, 129.4)} /></div>
      </Abs>
      <Abs x={70} y={1070} w={940} style={{display: 'flex', justifyContent: 'center', gap: 16}}><Pill at={134.5} c={RED} size={30}>impact humain</Pill><Pill at={137.5} c={INK} size={30}>impact opérationnel</Pill></Abs>
    </Out>
  );
};
const Presque: React.FC = () => {
  const t = useT();
  const draw = prog(t, 143.2, 147.2);
  const N = 40;
  const pts = Array.from({length: N}, (_, k) => {
    const x = 30 + k * 21;
    const spike = [6, 13, 21, 29, 35].includes(k) ? 1 : 0;
    const y = 190 - (spike ? 120 : Math.sin(k * 1.3) * 12 + 14);
    return `${k ? 'L' : 'M'}${x} ${y}`;
  }).join(' ');
  return (
    <Out end={168.45}>
      <HiLine words={['L’analyse', 'des', 'presque-accidents']} mark={[2]} at={142.3} y={320} size={56} />
      <Brut x={70} y={450} w={940} h={340} at={142.4} sh={BURG}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}><Mono at={142.5} c={INK} size={18}>signaux faibles</Mono><Mono at={147.2} c={BURG} size={18}>ce qui a failli mal tourner</Mono></div>
        <svg width={880} height={240} style={{marginTop: 10}}>
          <line x1={20} y1={200} x2={860} y2={200} stroke="#DCD6C9" strokeWidth={3} strokeDasharray="8 8" />
          <path d={pts} fill="none" stroke={BURG} strokeWidth={6} strokeLinejoin="round" strokeDasharray={2600} strokeDashoffset={2600 * (1 - draw)} />
          {[6, 13, 21, 29, 35].map((k, j) => draw * N > k && <g key={j}><circle cx={30 + k * 21} cy={70} r={14} fill={YEL} stroke={INK} strokeWidth={3} /><text x={30 + k * 21} y={76} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={16}>!</text></g>)}
        </svg>
      </Brut>
      <Abs x={70} y={830} w={940} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={147.2} c={GREEN} size={30}>pure proactivité</Pill><Pill at={150.6} c={BLUE} size={30}>maturité de la culture</Pill></Abs>
      <HiLine words={['une', 'leçon', 'd’avertissement', 'gratuite']} mark={[3]} at={153.6} y={930} size={44} />
      <Stamp at={157.9} c={GREEN} text="la vraie prévention" x={250} y={1040} rot={-5} size={50} />
      {t > 159.5 && (
        <Abs x={70} y={1150} w={940} h={190} style={{display: 'flex', gap: 20}}>
          {[{l: 'participation aux formations', a: 159.7, v: 0.72, c: TEAL, ph: 'promo/formation-incendie.jpg'}, {l: 'délai de traitement des dangers', a: 162.6, v: 0.4, c: ORANGE, ph: 'epiepc/allee.jpg'}].map((x, k) => (
            <div key={k} style={{flex: 1, display: 'flex', alignItems: 'center', gap: 14, background: '#fff', border: `5px solid ${INK}`, borderRadius: 14, boxShadow: `6px 6px 0 ${x.c}`, padding: 12, opacity: pop(t, x.a)}}>
              <div style={{width: 120, height: 150, borderRadius: 10, overflow: 'hidden', flexShrink: 0}}><Img src={PH(x.ph)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK}}>{x.l}</div>
            </div>
          ))}
        </Abs>
      )}
    </Out>
  );
};
const Iso45: React.FC = () => {
  const t = useT();
  return (
    <Out end={183.85}>
      <Center y={330}><Kin text="Aller encore plus loin" at={168.6} size={60} color={RED} /></Center>
      <Abs x={0} y={460} w={1080} style={{opacity: pop(t, 174.2)}}><Board text="ISO 45001" at={174.3} h={110} c={RED} /></Abs>
      <Abs x={0} y={620} w={1080} style={{textAlign: 'center'}}><Mono at={177.3} c={INK} size={28}>le cadre idéal</Mono></Abs>
      <Abs x={90} y={720} w={900} h={460} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40}}>
        <div style={{transform: `rotate(${t * 20}deg) scale(${Math.min(1, spring(t, 180.6, 7, 12))})`}}><F n="globe" size={280} /></div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
          {[{l: 'global', a: 178.9}, {l: 'hyper carré', a: 179.6}, {l: 'reconnu mondialement', a: 180.6}].map((x, k) => <div key={k} style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK, opacity: pop(t, x.a), transform: `translateX(${(1 - pop(t, x.a)) * 40}px)`}}><span style={{color: GREEN}}>✓</span> {x.l}</div>)}
        </div>
      </Abs>
      <Abs x={0} y={1220} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 46, color: DIM, opacity: pop(t, 181.7)}}>gestion des risques professionnels</Abs>
    </Out>
  );
};

/* ═════════════ SECTION 3 ═════════════ */
const Rebut: React.FC = () => {
  const t = useT();
  const belt = (t * 120) % 160;
  const scan = prog(t, 210.9, 212.9, easeInOut);
  return (
    <Out end={213.35}>
      <HiLine words={['Un', 'miroir', 'impitoyable']} mark={[1]} at={191.8} y={320} size={64} />
      <Brut x={70} y={450} w={940} h={420} at={195.7} sh={VIO} style={{overflow: 'hidden'}}>
        <Mono at={195.8} c={VIO} size={20}>taux de rebut / retouche</Mono>
        <div style={{position: 'absolute', left: 30, right: 30, top: 230, height: 40, background: INK, borderRadius: 20}} />
        {Array.from({length: 7}, (_, k) => {
          const x = 40 + k * 160 + belt - 160;
          const bad = k % 3 === 1;
          return <div key={k} style={{position: 'absolute', left: x, top: 150, width: 80, height: 80, background: bad ? '#FFE0DC' : '#E8D2A8', border: `4px solid ${bad ? RED : '#8A5B26'}`, borderRadius: 6, transform: bad && x > 600 ? `translateY(${(x - 600) * 0.6}px) rotate(${(x - 600) * 0.3}deg)` : undefined}}>{bad && <div style={{color: RED, fontWeight: 900, fontSize: 40, textAlign: 'center'}}>✗</div>}</div>;
        })}
        <div style={{position: 'absolute', right: 30, top: 290}}><F n="poubelle" size={90} /></div>
        <div style={{position: 'absolute', left: 30, top: 300, display: 'flex', gap: 10, alignItems: 'center', opacity: pop(t, 199.9)}}><F n="argent" size={70} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: RED}}>une perte financière</div></div>
      </Brut>
      <Abs x={70} y={910} w={940} h={300} style={{display: 'flex', gap: 20}}>
        {[{l: 'rebut', a: 195.7, v: 0.35, c: VIO}, {l: 'réclamations client', a: 208.2, v: 0.55, c: ORANGE}, {l: 'délais de traitement', a: 209.3, v: 0.45, c: TEAL}].map((g, k) => (
          <div key={k} style={{flex: 1, background: NIGHT, borderRadius: 18, border: `4px solid ${INK}`, textAlign: 'center', paddingTop: 16, opacity: pop(t, g.a), position: 'relative', overflow: 'hidden'}}>
            <Gauge r={80} v={g.v * prog(t, g.a, g.a + 0.8)} on={1} c={g.c} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: '#fff', padding: '0 8px'}}>{g.l}</div>
            {scan > 0 && <div style={{position: 'absolute', left: 0, right: 0, top: `${scan * 100 - 10}%`, height: '20%', background: 'linear-gradient(180deg, transparent, rgba(120,220,255,0.55), transparent)'}} />}
          </div>
        ))}
      </Abs>
      {t > 210.8 && <Abs x={0} y={1240} w={1080} style={{textAlign: 'center'}}><Mono at={210.9} c={BLUE} size={28}>radiographie des points de friction</Mono></Abs>}
      <Cite y={1300} at={209.3} text="valeurs des cadrans illustratives (ajout graphique)" />
    </Out>
  );
};
const RespQualite: React.FC = () => {
  const t = useT();
  const live = Math.max(0, t - 218.8);
  const pts = Array.from({length: 30}, (_, k) => `${k ? 'L' : 'M'}${20 + k * 14} ${110 - Math.sin(k * 0.6 + live * 2) * 30 - k * 1.5}`).join(' ');
  return (
    <Out end={232.15}>
      <Center y={320}><Kin text="Le responsable qualité" at={213.4} size={62} color={VIO} /></Center>
      <Deep src="verites/operatrice-tablette.jpg" x={70} y={450} w={500} h={600} at={214.4} pos="50% 30%" />
      <Brut x={600} y={450} w={410} h={290} at={218.8} sh={VIO}>
        <Mono at={218.9} c={VIO} size={16}>plan d’action · temps réel</Mono>
        <svg width={360} height={180} style={{marginTop: 10}}><path d={pts} fill="none" stroke={VIO} strokeWidth={5} /><circle cx={20 + 29 * 14} cy={110 - Math.sin(29 * 0.6 + live * 2) * 30 - 29 * 1.5} r={8} fill={RED} opacity={0.5 + 0.5 * Math.sin(t * 8)} /></svg>
      </Brut>
      <Brut x={600} y={770} w={410} h={280} at={224.5} sh={GREEN} style={{textAlign: 'center'}}>
        <F n="diplome" size={110} style={{margin: '0 auto'}} />
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, marginTop: 8}}>audits de certification</div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 34, color: GREEN}}>super serein</div>
      </Brut>
      <Stamp at={229.7} c={VIO} text="moment décisif" x={300} y={1110} rot={-5} size={52} />
    </Out>
  );
};

/* ═════════════ SECTION 4 ═════════════ */
const Circulaire: React.FC = () => {
  const t = useT();
  const rot = Math.max(0, t - 240.4) * 40;
  return (
    <Out end={260.55}>
      <HiLine words={['L’économie', 'circulaire']} mark={[1]} at={240.4} y={320} size={68} />
      <Abs x={190} y={450} w={700} h={700} style={{opacity: pop(t, 236.2)}}>
        <div style={{position: 'absolute', left: 150, top: 150, width: 400, height: 400, borderRadius: 200, overflow: 'hidden', border: `8px solid #fff`, boxShadow: '0 20px 40px rgba(20,33,61,0.25)'}}><Img src={PH('durab/planete-odd.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
        <svg width={700} height={700} style={{position: 'absolute', inset: 0, transform: `rotate(${rot}deg)`}}>
          {[0, 1, 2].map((k) => <g key={k} transform={`rotate(${k * 120} 350 350)`}><path d="M350 40 A310 310 0 0 1 618 195" fill="none" stroke={GREEN} strokeWidth={26} strokeLinecap="round" /><polygon points="618,160 640,214 588,206" fill={GREEN} /></g>)}
        </svg>
        {[{l: 'recyclage', a: 249.5, x: 0, y: 60}, {l: 'revalorisation', a: 251.0, x: 440, y: 600}, {l: 'valeur durable', a: 246.1, x: 470, y: 30}].map((x, k) => <div key={k} style={{position: 'absolute', left: x.x, top: x.y}}><Pill at={x.a} c={[GREEN, TEAL, BLUE][k]} size={28}>{x.l}</Pill></div>)}
      </Abs>
      <Abs x={0} y={1170} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-block', position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: DIM, opacity: pop(t, 242.1)}}>polluer un peu moins<Strike p={prog(t, 244.2, 244.8)} /></div></Abs>
      {t > 258.4 && <Abs x={0} y={1240} w={1080} style={{textAlign: 'center'}}><Mono at={258.5} c={GREEN} size={28}>levier de performance stratégique</Mono></Abs>}
    </Out>
  );
};
const ParUnite: React.FC = () => {
  const t = useT();
  const dbl = prog(t, 269.7, 271.0, easeOut);
  const unit = prog(t, 273.3, 275.0, easeOut);
  return (
    <Out end={282.9}>
      <HiLine words={['Eau', 'et', 'énergie', 'par', 'unité', 'produite']} mark={[3, 4]} at={263.2} y={330} size={46} />
      <Brut x={70} y={460} w={450} h={600} at={267.6} sh={RED}>
        <Mono at={267.7} c={RED} size={18}>consommation totale</Mono>
        <div style={{position: 'absolute', left: 50, right: 50, bottom: 110, height: 380, display: 'flex', alignItems: 'flex-end', gap: 40}}>
          <div style={{flex: 1, height: 160, background: '#C9D2DF', borderRadius: 8}} />
          <div style={{flex: 1, height: 160 + 160 * dbl, background: RED, borderRadius: 8}} />
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 40, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: DIM}}>production ×2, facture ×2</div>
      </Brut>
      <Brut x={560} y={460} w={450} h={600} at={273.3} sh={GREEN}>
        <Mono at={273.4} c={GREEN} size={18}>par unité produite</Mono>
        <div style={{position: 'absolute', left: 50, right: 50, bottom: 110, height: 380, display: 'flex', alignItems: 'flex-end', gap: 40}}>
          <div style={{flex: 1, height: 160, background: '#C9D2DF', borderRadius: 8}} />
          <div style={{flex: 1, height: 160 - 40 * unit, background: GREEN, borderRadius: 8}} />
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 40, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: GREEN, opacity: pop(t, 277.0)}}>plus efficient, plus vert</div>
      </Brut>
      <Cite y={1090} at={267.6} text="barres illustratives (ajout graphique)" />
      <Stamp at={280.9} c={GREEN} text="précision redoutable" x={240} y={1150} rot={-5} size={50} />
    </Out>
  );
};
const Maroc: React.FC = () => {
  const t = useT();
  return (
    <Out end={295.7}>
      <Center y={330}><Kin text="Un détail géographique" at={283.0} size={60} color={GREEN} /></Center>
      <Brut x={140} y={460} w={800} h={420} at={285.7} sh={GREEN} style={{display: 'flex', alignItems: 'center', gap: 30}}>
        <div style={{position: 'relative'}}><F n="carte" size={240} /><div style={{position: 'absolute', left: 90, top: 40, transform: `translateY(${-Math.abs(Math.sin(t * 4)) * 14}px)`}}><F n="epingle" size={70} /></div></div>
        <div><Mono at={286.7} c={INK} size={24}>exemple cité</Mono><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: INK, marginTop: 10, opacity: pop(t, 286.7)}}>Maroc</div></div>
      </Brut>
      <Abs x={0} y={940} w={1080} style={{opacity: pop(t, 290.6)}}><Board text="ISO 14001" at={290.7} h={100} c={GREEN} /></Abs>
      <Abs x={0} y={1100} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={292.5} c={GREEN} size={30}>structurer</Pill><Pill at={293.5} c={TEAL} size={30}>approfondir</Pill></Abs>
    </Out>
  );
};

/* ═════════════ SECTION 5 ═════════════ */
const Infobesite: React.FC = () => {
  const t = useT();
  const rain = Math.max(0, t - 313.5);
  return (
    <Out end={333.95}>
      <HiLine words={['Pourquoi', 'tant', 'de', 'flops', '?']} mark={[3]} at={304.4} y={320} size={64} />
      {t < 314.6 && (
        <Abs x={0} y={450} w={1080} h={700}>
          <Center y={60}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: INK, opacity: pop(t, 306.6)}}>une fortune…</div></Center>
          
          <Center y={500}><div style={{display: 'inline-block', position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: DIM, opacity: pop(t, 310.3)}}>un manque de données<Strike p={prog(t, 311.5, 312.1)} /></div></Center>
          {t > 313.4 && <Center y={590}><Mono at={313.5} c={RED} size={48}>l’infobésité</Mono></Center>}
          {Array.from({length: 30}, (_, k) => rain > 0 && <div key={k} style={{position: 'absolute', left: random(`rx${k}`) * 1000, top: ((random(`ry${k}`) * 700 + rain * 600) % 760) - 60, fontFamily: MONO, fontWeight: 700, fontSize: 30, color: `${RED}88`}}>{Math.floor(random(`rv${k}`) * 900)}</div>)}
        </Abs>
      )}
      {t >= 314.6 && (
        <>
          <Abs x={40} y={450} w={490} h={720} style={{background: NIGHT, borderRadius: 20, border: `5px solid ${INK}`, boxShadow: `8px 8px 0 ${RED}`, overflow: 'hidden', opacity: pop(t, 314.8)}}>
            <div style={{height: 40, background: '#0E1320', display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 14}}>{[RED, YEL, GREEN].map((c) => <div key={c} style={{width: 12, height: 12, borderRadius: 6, background: c}} />)}</div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, padding: 12}}>{Array.from({length: 36}, (_, k) => <div key={k} style={{height: 50, borderRadius: 4, background: '#1D2433', fontFamily: MONO, fontSize: 14, color: '#5A647A', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{Math.floor(random(`g${k}`) * 999)}</div>)}</div>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center'}}><Mono at={315.4} c={RED} size={22}>l’outil qui plante</Mono></div>
            <div style={{position: 'absolute', left: 20, right: 20, top: 360, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: '#fff', opacity: pop(t, 320.5)}}>joli reporting de bureau</div>
          </Abs>
          <Abs x={550} y={450} w={490} h={720} style={{background: '#fff', borderRadius: 20, border: `5px solid ${INK}`, boxShadow: `8px 8px 0 ${GREEN}`, opacity: pop(t, 322.6)}}>
            <div style={{padding: 22, display: 'flex', flexDirection: 'column', gap: 18}}>
              {[{l: 'indicateur clé 1', c: BLUE}, {l: 'indicateur clé 2', c: RED}, {l: 'indicateur clé 3', c: GREEN}].map((x, k) => <div key={k} style={{height: 120, borderRadius: 16, border: `4px solid ${x.c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: x.c, opacity: pop(t, 323.9 + k * 0.3)}}>{x.l}</div>)}
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 100, textAlign: 'center'}}><Pill at={326.3} c={TEAL} size={24}>avec les équipes</Pill></div>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center'}}><Mono at={322.7} c={GREEN} size={22}>la formule gagnante</Mono></div>
          </Abs>
          {t > 330.3 && <HiLine words={['l’efficacité', 'naît', 'de', 'la', 'simplicité']} mark={[4]} at={331.5} y={1210} size={48} />}
        </>
      )}
    </Out>
  );
};
const Etapes: React.FC = () => {
  const t = useT();
  const brk = prog(t, 361.8, 362.6, easeIn);
  const L = [{l: 'Objectifs SMART', s: 'spécifiques · mesurables · atteignables · réalistes · temporels', a: 337.4, c: BLUE}, {l: 'Limiter les KPI', s: 'ne pas finir paralysé par l’analyse', a: 342.5, c: RED}, {l: 'Adapter le détail', s: 'directeur ≠ chef d’atelier', a: 347.4, c: VIO}, {l: 'Revues régulières', s: 'faire vivre la donnée', a: 352.7, c: TEAL}, {l: 'Co-construire', s: 'avec les équipes terrain', a: 356.0, c: ORANGE}];
  return (
    <Out end={365.55}>
      <HiLine words={['La', 'chaîne', 'en', '5', 'maillons']} mark={[1]} at={334.4} y={320} size={60} />
      <Abs x={70} y={430} w={940} style={{display: 'flex', flexDirection: 'column', gap: 18}}>
        {L.map((x, k) => <Link key={k} n={String(k + 1)} label={x.l} sub={x.s} at={x.a} c={x.c} broken={k === 4 ? brk : 0} dim={k === 4 ? 0 : brk * 0.6} />)}
      </Abs>
      {t > 338.5 && t < 342.2 && <Abs x={0} y={1200} w={1080} style={{opacity: pop(t, 338.5) * (1 - prog(t, 341.8, 342.2))}}><Board text="SMART" at={338.6} h={80} c={BLUE} /></Abs>}
      {t > 360.4 && <Abs x={0} y={1180} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: RED, opacity: pop(t, 360.5)}}>sans co-construction : une corvée imposée d’en haut</Abs>}
      <Stamp at={364.1} c={RED} text="échec assuré" x={330} y={1240} rot={-6} size={54} />
    </Out>
  );
};
const Metier: React.FC = () => {
  const t = useT();
  const score = Math.round(100 * prog(t, 380.7, 382.3, easeOut));
  return (
    <Out end={386.05}>
      <HiLine words={['Un', 'vrai', 'métier']} mark={[2]} at={365.6} y={320} size={68} />
      <Deep src="verites/tablette.jpg" x={70} y={450} w={460} h={560} at={366.6} pos="50% 25%" />
      <Abs x={560} y={450} w={450} h={560} style={{display: 'flex', flexDirection: 'column', gap: 18}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, opacity: pop(t, 371.8)}}><div style={{transform: `rotate(${t * 60}deg)`}}><F n="engrenage" size={90} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK}}>technicité</div></div>
        <div style={{fontSize: 50, fontWeight: 900, color: DIM, marginLeft: 30, opacity: pop(t, 372.6)}}>+</div>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, opacity: pop(t, 372.9)}}><F n="cerveau" size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>psychologie managériale</div></div>
        {t > 377.4 && (
          <div style={{background: NIGHT, borderRadius: 20, border: `5px solid ${INK}`, boxShadow: `7px 7px 0 ${YEL}`, padding: 16, textAlign: 'center', marginTop: 10, opacity: pop(t, 377.6)}}>
            <Mono at={377.7} c={YEL} size={18} style={{color: INK}}>formation certifiante</Mono>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff', marginTop: 10, opacity: pop(t, 380.7)}}>QHSE Manager</div>
            <div style={{height: 12, borderRadius: 6, background: '#2E3648', marginTop: 12, overflow: 'hidden'}}><div style={{width: `${score}%`, height: '100%', background: GREEN}} /></div>
          </div>
        )}
      </Abs>
      <Cite y={1060} at={383.6} text="certification mentionnée par la vidéo d’origine" />
    </Out>
  );
};
const Final: React.FC = () => {
  const t = useT();
  const wake = prog(t, 398.0, 399.6, easeInOut);
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={['Quelle', 'décision', 'concrète', 'vont-ils', 'déclencher', '?']} mark={[1, 4]} at={391.8} y={320} size={52} />
      <Deep src="verites/plans.jpg" x={150} y={530} w={780} h={360} at={386.3} pos="50% 30%">
        <div style={{position: 'absolute', left: 20, top: 20}}><Mono at={389.0} c={INK} size={20}>face au tableau de bord</Mono></div>
      </Deep>
      <Abs x={70} y={920} w={940} h={200} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30, opacity: pop(t, 397.0)}}>
        <div style={{textAlign: 'center', filter: `grayscale(${1 - wake})`}}><F n="sablier" size={110} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: DIM}}>données dormantes</div></div>
        <div style={{textAlign: 'center', transform: `scale(${0.6 + 0.4 * wake})`, opacity: wake}}><F n="fusee" size={120} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: ORANGE}}>actions décisives</div></div>
      </Abs>
      <Abs x={0} y={1140} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 12}}><Pill at={400.5} c={BLUE} size={28}>commerciales</Pill><Pill at={401.6} c={RED} size={28}>humaines</Pill><Pill at={402.3} c={GREEN} size={28}>environnementales</Pill></Abs>
      {t > 404.0 && <Abs x={0} y={1230} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-block', position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: DIM}}>un chiffre ignoré<Strike p={prog(t, 405.9, 406.5)} /></div><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 52, color: RED, opacity: pop(t, 407.3)}}>une opportunité gâchée</div></Abs>}
      {t > 408.4 && <Dust n={22} c={YEL} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap((x) => [{at: x.at, s: 'soft-whoosh', v: 0.4, dur: 1}, {at: x.at + 0.3, s: 'cadenas', v: 0.45}, ...rep(x.at + 0.6, 6, 0.07, 'tick', 0.2), {at: x.at + 0.9, s: 'sfx/rise', v: 0.3}, {at: x.at + 1.4, s: 'sfx/swish', v: 0.35}, {at: x.at + 1.5, s: 'sfx/swish', v: 0.3}, {at: x.at + 3.2, s: 'sfx/whoosh', v: 0.3}]),
  {at: 2.0, s: 'tension', v: 0.18, dur: 4}, {at: 8.5, s: 'sfx/ding', v: 0.15}, {at: 9.2, s: 'sfx/ding', v: 0.15}, {at: 10.4, s: 'sfx/ding', v: 0.15},
  {at: 12.4, s: 'sfx/whoosh', v: 0.25}, {at: 18.1, s: 'tampon', v: 0.5}, {at: 19.6, s: 'sfx/swish', v: 0.3}, {at: 22.2, s: 'sfx/rise', v: 0.25}, ...rep(25.6, 4, 0.07, 'sfx/thud', 0.25),
  ...rep(32.6, 8, 0.1, 'sfx/pop', 0.12), {at: 35.9, s: 'sfx/swish', v: 0.3}, {at: 36.0, s: 'soft-whoosh', v: 0.35}, {at: 37.6, s: 'sfx/swish', v: 0.3}, ...[40.6, 41.8, 42.5, 43.3].map((a) => ({at: a, s: 'sfx/ding', v: 0.2})), {at: 44.3, s: 'sfx/pop', v: 0.2},
  ...[49.8, 52.3, 54.0, 55.5, 57.3].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})),
  {at: 64.9, s: 'soft-whoosh', v: 0.3}, ...[75.0, 78.8, 83.0, 88.1].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), {at: 74.9, s: 'sfx/swish', v: 0.3}, {at: 93.6, s: 'soft-whoosh', v: 0.3}, {at: 94.4, s: 'stylo', v: 0.35},
  {at: 97.8, s: 'sfx/thud', v: 0.3}, ...rep(104.2, 12, 0.17, 'tick', 0.1), {at: 109.3, s: 'sfx/pop', v: 0.22}, {at: 111.2, s: 'bass-hit', v: 0.45}, {at: 112.2, s: 'sfx/pop', v: 0.22},
  {at: 117.3, s: 'sfx/swish', v: 0.3}, {at: 117.4, s: 'soft-whoosh', v: 0.3}, {at: 123.3, s: 'sfx/thud', v: 0.3}, ...rep(123.4, 20, 0.2, 'page', 0.08), {at: 128.9, s: 'sfx/swish', v: 0.3}, {at: 134.5, s: 'sfx/pop', v: 0.2}, {at: 137.5, s: 'sfx/pop', v: 0.2},
  {at: 142.4, s: 'sfx/thud', v: 0.3}, ...[145, 146.5, 148.3, 150, 151.4].map((a) => ({at: a, s: 'sfx/ding', v: 0.12})), {at: 147.2, s: 'sfx/pop', v: 0.2}, {at: 150.6, s: 'sfx/pop', v: 0.2}, {at: 157.9, s: 'tampon', v: 0.5}, {at: 159.7, s: 'sfx/pop', v: 0.22}, {at: 162.6, s: 'sfx/pop', v: 0.22},
  {at: 174.2, s: 'sfx/swish', v: 0.3}, ...flaps(174.3, 12), {at: 177.3, s: 'sfx/pop', v: 0.2}, ...[178.9, 179.6, 180.6].map((a) => ({at: a, s: 'validation', v: 0.18})),
  {at: 191.8, s: 'sfx/swish', v: 0.3}, {at: 195.7, s: 'sfx/thud', v: 0.3}, {at: 199.9, s: 'deep-hit', v: 0.35}, {at: 208.2, s: 'sfx/rise', v: 0.2}, {at: 209.3, s: 'sfx/rise', v: 0.2}, {at: 210.9, s: 'soft-whoosh', v: 0.35},
  {at: 214.4, s: 'soft-whoosh', v: 0.3}, {at: 218.8, s: 'sfx/thud', v: 0.3}, {at: 224.5, s: 'sfx/thud', v: 0.3}, {at: 225.6, s: 'validation', v: 0.3}, {at: 229.7, s: 'tampon', v: 0.45},
  {at: 236.2, s: 'soft-whoosh', v: 0.3}, {at: 240.4, s: 'sfx/swish', v: 0.3}, {at: 244.2, s: 'sfx/swish', v: 0.3}, ...[246.1, 249.5, 251.0].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})), {at: 258.5, s: 'sfx/pop', v: 0.22},
  {at: 267.6, s: 'sfx/thud', v: 0.3}, {at: 269.7, s: 'sfx/rise', v: 0.25}, {at: 273.3, s: 'sfx/thud', v: 0.3}, {at: 277.0, s: 'validation', v: 0.25}, {at: 280.9, s: 'tampon', v: 0.45},
  {at: 285.7, s: 'sfx/thud', v: 0.3}, {at: 286.7, s: 'sfx/pop', v: 0.2}, ...flaps(290.7, 12), {at: 292.5, s: 'sfx/pop', v: 0.2}, {at: 293.5, s: 'sfx/pop', v: 0.2},
  {at: 306.6, s: 'sfx/pop', v: 0.22}, {at: 308.3, s: 'deep-hit', v: 0.35}, {at: 311.5, s: 'sfx/swish', v: 0.3}, {at: 313.5, s: 'bass-hit', v: 0.4}, ...rep(313.8, 6, 0.12, 'tick', 0.14), {at: 314.8, s: 'soft-whoosh', v: 0.3}, {at: 322.6, s: 'soft-whoosh', v: 0.3}, ...[323.9, 324.2, 324.5].map((a) => ({at: a, s: 'sfx/ding', v: 0.15})), {at: 331.5, s: 'validation', v: 0.3},
  ...[337.4, 342.5, 347.4, 352.7, 356.0].map((a) => ({at: a, s: 'sfx/thud', v: 0.32})), ...flaps(338.6, 8), {at: 361.8, s: 'deep-hit', v: 0.45}, {at: 364.1, s: 'tampon', v: 0.5},
  {at: 366.6, s: 'soft-whoosh', v: 0.3}, {at: 371.8, s: 'sfx/pop', v: 0.2}, {at: 372.9, s: 'sfx/pop', v: 0.2}, {at: 377.6, s: 'sfx/thud', v: 0.3}, ...rep(380.7, 8, 0.2, 'tick', 0.14), {at: 382.4, s: 'validation', v: 0.3},
  {at: 386.3, s: 'soft-whoosh', v: 0.3}, {at: 391.8, s: 'sfx/swish', v: 0.35}, {at: 398.0, s: 'sfx/rise', v: 0.3}, ...[400.5, 401.6, 402.3].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})), {at: 405.9, s: 'sfx/swish', v: 0.3}, {at: 407.3, s: 'deep-hit', v: 0.35}, {at: 408.5, s: 'validation', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const TdbPilot: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={11.9}><Nuit /></Gate>
    <Gate from={11.8} to={27.3}><Chaos /></Gate>
    <Gate from={27.2} to={46.2}><Unifie /></Gate>
    <Gate from={46.1} to={61.3}><Plan /></Gate>
    <Gate from={64.7} to={97.7}><Missions /></Gate>
    <Gate from={97.6} to={113.8}><Decisions /></Gate>
    <Gate from={117.25} to={140.1}><Gravite /></Gate>
    <Gate from={140.0} to={168.5}><Presque /></Gate>
    <Gate from={168.4} to={183.9}><Iso45 /></Gate>
    <Gate from={187.35} to={213.4}><Rebut /></Gate>
    <Gate from={213.3} to={232.2}><RespQualite /></Gate>
    <Gate from={235.65} to={260.6}><Circulaire /></Gate>
    <Gate from={260.5} to={282.95}><ParUnite /></Gate>
    <Gate from={282.85} to={295.75}><Maroc /></Gate>
    <Gate from={299.2} to={334.0}><Infobesite /></Gate>
    <Gate from={333.9} to={365.6}><Etapes /></Gate>
    <Gate from={365.5} to={386.1}><Metier /></Gate>
    <Gate from={386.0} to={OUTRO_AT}><Final /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}><Feux i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={410.6}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-tableaux-de-bord-qhse-origine.m4a')} trimAfter={s(410.8)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Dust, easeIn, Burst];
