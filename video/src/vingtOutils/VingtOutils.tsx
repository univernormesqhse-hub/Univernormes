import React from 'react';
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

/**
 * « Maîtriser les 20 outils du management de la qualité » (7 min 53) — capsule « condensé + effet wahou + ultra
 * premium » : voix d'origine (sans musique de fond), sous-titres calés mot à mot, photos générées (ChatGPT) d'après les
 * prompts de prompts-images-20-outils-qualite.md, thème « papier quadrillé ».
 * Fil rouge : LE TUBE PNEUMATIQUE À SIX GUICHETS (logique → mesurer → cause racine → traiter → améliorer → synthèse),
 * adaptés aux parties réellement présentes ; la capsule du dossier file d'un guichet à l'autre, chaque guichet passé se
 * coche. En bas, L'ÉTAGÈRE DES 20 OUTILS se remplit outil après outil (compteur n / 20).
 * Transition : LE GYROPHARE à chaque partie ; dans les scènes : capsule pneumatique, loupe, store vénitien.
 * Ultra premium : compteur 0 → 20, eau qui monte (« noyé »), boîte à outils qui s'ordonne, cycle en six étapes, problème
 * boomerang, tuiles QQOQCCP qui se retournent, filet d'identification, histogramme / nuage / carte de contrôle tracés,
 * Pareto avec courbe cumulée, barre de recherche qui trouve puis OUVRE la cause racine, forage jusqu'à la racine, arête
 * de poisson 6M, cinq couches des « pourquoi », jauge de criticité AMDEC, SWOT contre 5S, ruban 8D, trio plan / matrice /
 * benchmark, juges KPI, roue PDCA qui monte la pente avec sa cale, rouages de montre, globe de la conformité.
 */
/** Images générées (ChatGPT) — chemin vide = icône en attendant. */
const IMG = {
  cover: '',
  noye: '',
  enquete: '',
  brain: '',
  releve: '',
  audit: '',
  donnees: '',
  aero: '',
  s5: '',
  d8: '',
  roue: '',
  montre: '',
  final: '',
  ishikawa: 'ishikawa-gen/equipe-5m.jpg',
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
const OUTRO_AT = 473.0;
export const VINGT_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 46.5, n: '1', title: 'La logique qualité', s: 'un cadre d’une rigueur absolue', c: NAVY, g: 'logique', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 83.9, n: '2', title: 'Identifier et mesurer', s: 'investigation pure', c: BLUE, g: 'mesurer', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 196.9, n: '3', title: 'La cause racine', s: 'creuser jusqu’à l’origine', c: VIO, g: 'cause racine', k: 'gyro', lab: 'PARTIE 3 / 6'},
  {at: 315.8, n: '4', title: 'Traiter et vérifier', s: 'des preuves irréfutables', c: ORANGE, g: 'traiter', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 380.9, n: '5', title: 'L’amélioration continue', s: 'le travail n’est jamais fini', c: TEAL, g: 'améliorer', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 414.8, n: '6', title: 'La machine huilée', s: 'tout s’emboîte', c: GREEN, g: 'synthèse', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 471.5;
/** Les 20 outils, dans l'ordre où la voix les cite. */
const TOOLS = [
  {l: 'QQOQCCP', a: 110.34, ic: 'question'}, {l: 'brainstorming', a: 134.94, ic: 'ampoule'}, {l: 'cartographie', a: 138.5, ic: 'carte'}, {l: 'feuille de relevé', a: 143.02, ic: 'clipboard'}, {l: 'audit', a: 147.62, ic: 'auditeur'},
  {l: 'histogramme', a: 156.58, ic: 'graphique'}, {l: 'nuage de points', a: 160.1, ic: 'courbe'}, {l: 'carte de contrôle', a: 163.3, ic: 'hausse'}, {l: 'Pareto', a: 167.9, ic: 'cible'}, {l: 'Ishikawa', a: 208.42, ic: 'poisson'},
  {l: '5 pourquoi', a: 233.74, ic: 'enfants'}, {l: 'AMDEC', a: 254.7, ic: 'avion'}, {l: 'SWOT', a: 281.06, ic: 'boussole'}, {l: '5S', a: 289.22, ic: 'boite-outils'}, {l: '8D', a: 326.82, ic: 'voiture'},
  {l: 'plan d’action', a: 348.34, ic: 'calendrier'}, {l: 'matrice des risques', a: 352.74, ic: 'danger'}, {l: 'benchmarking', a: 357.9, ic: 'trophee'}, {l: 'KPI', a: 366.74, ic: 'chrono'}, {l: 'PDCA', a: 395.02, ic: 'repeter'},
];

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
  const S0 = SECT[i];
  return (
    <>
      <Abs x={60} y={y} w={960} style={{textAlign: 'center'}}><Kin text={S0.title} at={at} size={S0.title.length > 20 ? 66 : 80} color={dark ? '#fff' : INK} /></Abs>
      <Abs x={0} y={y + (S0.title.length > 20 ? 190 : 120)} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-block', background: S0.c, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 2, padding: '6px 16px', borderRadius: 6, opacity: pop(t, at + 0.5)}}>{S0.s.toUpperCase()}</div></Abs>
    </>
  );
};
const Pneumatique: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const S0 = SECT[i];
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
  const S0 = SECT[i];
  const k = t - S0.at;
  if (k < 0 || k > 3.4) return null;
  const inn = prog(t, S0.at, S0.at + 0.25, easeOut) * (1 - prog(t, S0.at + 3.0, S0.at + 3.4, easeIn));
  const band = prog(t, S0.at + 0.3, S0.at + 1.0, easeOut);
  const beam = S0.n === '!' ? '224,74,63' : '31,111,209';
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
  const S0 = SECT[i];
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
  const S0 = SECT[i];
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
/** Étagère des 20 outils : chaque case s'allume quand la voix cite l'outil. */
const Shelf: React.FC = () => {
  const t = useT();
  if (t < 46.5 || t > OUTRO_AT) return null;
  const n = TOOLS.filter((x) => t >= x.a).length;
  const last = TOOLS.reduce((k, x, i) => (t >= x.a ? i : k), -1);
  const fresh = last >= 0 ? 1 - prog(t, TOOLS[last].a, TOOLS[last].a + 2.2) : 0;
  return (
    <AbsoluteFill style={{zIndex: 38, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: 36, right: 36, top: 1418, height: 104, borderRadius: 20, background: 'linear-gradient(180deg, #fff, #F1F4F8)', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${GOLD}`, opacity: pop(t, 46.6), display: 'flex', alignItems: 'center', padding: '0 14px', gap: 6}}>
        <div style={{width: 120, flexShrink: 0, textAlign: 'center'}}>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 14, color: DIM}}>OUTILS</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: n >= 20 ? GREEN : INK, lineHeight: 1}}>{n}<span style={{fontSize: 22, color: DIM}}>/20</span></div>
        </div>
        <div style={{flex: 1, display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 5}}>
          {TOOLS.map((x, k) => {
            const on = t >= x.a;
            const isNew = k === last && fresh > 0;
            return <div key={x.l} style={{height: 36, borderRadius: 8, background: on ? (isNew ? GOLD : GREEN) : '#E3E8EF', border: `2px solid ${on ? INK : '#C9D2DF'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${isNew ? 1 + 0.25 * fresh : 1})`, boxShadow: isNew ? `0 0 ${18 * fresh}px ${GOLD}` : 'none'}}>{on && <F n={x.ic} size={24} />}</div>;
          })}
        </div>
      </div>
      {last >= 0 && fresh > 0 && <div style={{position: 'absolute', left: 0, right: 0, top: 1380, textAlign: 'center', opacity: Math.min(1, fresh * 3)}}><span style={{display: 'inline-block', background: INK, color: GOLD, fontFamily: MONO, fontWeight: 700, fontSize: 22, padding: '4px 14px', borderRadius: 8, transform: `translateY(${(1 - Math.min(1, (1 - fresh) * 8)) * 20}px)`}}>+ OUTIL {last + 1} : {TOOLS[last].l.toUpperCase()}</span></div>}
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
      <div style={{position: 'absolute', left: 0, top: 200}}><Pic src={IMG.cover} ic="boite-outils" w={1080} h={760} pos="50% 30%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER} 9%, ${PAPER}00 16%, ${PAPER}00 36%, ${PAPER}DD 44%, ${PAPER} 49%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={720} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>MANAGEMENT DE LA QUALITÉ</div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24, marginTop: 14}}>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 200, color: GOLD, lineHeight: 1, textShadow: `8px 8px 0 ${INK}`}}>20</div>
          <div style={{textAlign: 'left'}}><Board text="OUTILS" at={-1} h={100} gap={3} c={NAVY} stag={0.02} /><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 64, color: RED, marginTop: 6}}>essentiels</div></div>
        </div>
      </Abs>
      <Abs x={60} y={1400} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO ═════════════ */
const PARC = [{n: 1, l: 'La logique globale', a: 32.42, c: NAVY}, {n: 2, l: 'Identifier et mesurer', a: 34.78, c: BLUE}, {n: 3, l: 'Analyser la cause racine', a: 37.74, c: VIO}, {n: 4, l: 'Traiter et vérifier', a: 39.14, c: ORANGE}, {n: 5, l: 'L’amélioration continue', a: 42.74, c: TEAL}];
const Intro: React.FC = () => {
  const t = useT();
  const ph = t < 8.1 ? 0 : t < 17.6 ? 1 : t < 31.0 ? 2 : 3;
  const water = prog(t, 12.9, 16.6, easeInOut);
  const order = prog(t, 20.6, 22.0, easeInOut);
  return (
    <Out end={46.5}>
      {ph === 0 && (
        <>
          <HiLine words={['20', 'outils', 'essentiels']} mark={[0, 1]} at={2.8} y={330} size={70} />
          <Abs x={140} y={460} w={800} h={900}>
            {TOOLS.map((x, k) => { const a = 3.4 + k * 0.12; const p = prog(t, a, a + 0.7, easeIn); return t > a && <div key={x.l} style={{position: 'absolute', left: 340 + Math.sin(k * 2.4) * 300 * (1 - p), top: lerp(-60, 520, p), opacity: 1 - prog(t, a + 0.6, a + 0.75), transform: `rotate(${(1 - p) * k * 30}deg)`}}><F n={x.ic} size={90} /></div>; })}
            <div style={{position: 'absolute', left: 220, top: 540, width: 360, height: 260, borderRadius: '16px 16px 30px 30px', background: `linear-gradient(180deg, ${RED}, ${BURG})`, border: `6px solid ${INK}`, boxShadow: `0 0 ${20 + 10 * Math.sin(t * 6)}px ${GOLD}`}}>
              <div style={{position: 'absolute', left: 120, top: -60, width: 120, height: 70, border: `14px solid ${INK}`, borderBottom: 'none', borderRadius: '30px 30px 0 0'}} />
              <div style={{position: 'absolute', left: 0, right: 0, top: 60, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 120, color: '#fff', textShadow: `4px 4px 0 ${INK}`}}><Count n={20} a={3.4} b={6.0} /></div>
            </div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Noyé', 'sous', 'les', 'méthodes']} mark={[0]} at={8.3} y={330} size={66} />
          <Shot src={IMG.noye} ic="classeur" x={60} y={440} w={960} h={760} at={8.3} c={BLUE}>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: `${water * 70}%`, background: 'linear-gradient(180deg, rgba(31,111,209,0.35), rgba(14,42,92,0.75))', borderTop: water > 0 ? '6px solid rgba(255,255,255,0.7)' : undefined}}>
              {water > 0 && Array.from({length: 10}, (_, k) => <div key={k} style={{position: 'absolute', left: `${(k * 11 + 4) % 96}%`, bottom: `${((t * 30 + k * 37) % 100)}%`, width: 14, height: 14, borderRadius: 7, border: '2px solid #fff8'}} />)}
            </div>
            <div style={{position: 'absolute', left: 24, top: 24}}><Pill at={9.4} c={NAVY} size={26}>des dizaines de méthodes…</Pill></div>
          </Shot>
          <Abs x={0} y={1240} w={1080} style={{textAlign: 'center'}}><Pill at={15.3} c={RED} size={30}>par quel bout prendre le problème ?</Pill></Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Une', 'boîte', 'à', 'outils', 'organisée']} mark={[1, 2, 3]} at={17.7} y={330} size={58} />
          <Abs x={60} y={450} w={960} h={760}>
            {TOOLS.map((x, k) => {
              const col = Math.floor(k / 4);
              const row = k % 4;
              const cx = random(`ox${k}`) * 860 + Math.sin(t * 2 + k) * 30;
              const cy = random(`oy${k}`) * 640 + Math.cos(t * 1.7 + k) * 30;
              return <div key={x.l} style={{position: 'absolute', left: lerp(cx, 30 + col * 186, order), top: lerp(cy, 40 + row * 170, order), width: 150, height: 140, borderRadius: 18, background: '#fff', border: `4px solid ${order > 0.6 ? PARC[col].c : '#C9D2DF'}`, boxShadow: order > 0.9 ? `5px 5px 0 ${PARC[col].c}` : '0 6px 16px #0002', transform: `rotate(${(1 - order) * (random(`or${k}`) - 0.5) * 80}deg)`, opacity: pop(t, 18.0 + k * 0.05), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4}}><F n={x.ic} size={60} /><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 16, color: INK, textAlign: 'center', lineHeight: 1.05, padding: '0 6px'}}>{x.l}</div></div>;
            })}
          </Abs>
          <Abs x={0} y={1240} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={21.74} c={BLUE} size={28}>ultra claire</Pill><Pill at={22.7} c={VIO} size={28}>séquentielle</Pill><Pill at={24.22} c={GREEN} size={28}>logique</Pill></Abs>
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={['Un', 'parcours', 'en', '5', 'étapes']} mark={[1, 3, 4]} at={31.2} y={330} size={62} />
          {PARC.map((x, k) => (
            <GlassCard key={x.n} x={60} y={440 + k * 188} w={960} h={165} at={x.a} c={x.c}>
              <div style={{display: 'flex', alignItems: 'center', gap: 30, height: '100%', padding: '0 30px'}}>
                <Num n={x.n} c={x.c} size={110} />
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: INK}}>{x.l}</div>
              </div>
            </GlassCard>
          ))}
        </>
      )}
    </Out>
  );
};

/* ═════════════ 1 · LA LOGIQUE QUALITÉ ═════════════ */
const CYCLE = [{l: 'identifier', a: 65.26, c: NAVY, ic: 'loupe'}, {l: 'mesurer', a: 66.34, c: BLUE, ic: 'equerre'}, {l: 'analyser', a: 67.3, c: VIO, ic: 'cerveau'}, {l: 'traiter', a: 68.38, c: ORANGE, ic: 'outils'}, {l: 'vérifier', a: 69.3, c: RED, ic: 'check'}, {l: 'améliorer', a: 69.9, c: TEAL, ic: 'hausse'}];
const Logique: React.FC = () => {
  const t = useT();
  const ph = t < 61.0 ? 0 : 1;
  const frame = prog(t, 58.22, 59.2, easeOut);
  const skip = t >= 77.7;
  const boom = prog(t, 80.9, 83.0, easeInOut);
  return (
    <Out end={83.9}>
      {ph === 0 && (
        <>
          <HiLine words={['Aucune', 'improvisation']} mark={[1]} at={49.9} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={300} style={{background: '#F1F1EC', border: `5px solid ${INK}`, borderRadius: 26, display: 'flex', alignItems: 'center', gap: 30, padding: '0 40px', opacity: pop(t, 52.42)}}>
            <div style={{transform: `rotate(${(t - 52) * 200}deg)`}}><F n="de" size={150} /></div>
            <div><div style={{position: 'relative', display: 'inline-block', fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: DIM}}>piocher au hasard<Strike p={prog(t, 55.8, 56.2)} c={RED} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: RED, opacity: pop(t, 56.62)}}>= la catastrophe</div></div>
          </Abs>
          <Abs x={140} y={800} w={800} h={560} style={{opacity: pop(t, 58.22)}}>
            <div style={{position: 'absolute', left: 400 - 400 * frame, top: 280 - 280 * frame, width: 800 * frame, height: 560 * frame, border: `12px solid ${NAVY}`, borderRadius: 24, boxShadow: `0 0 30px ${NAVY}55`}} />
            {frame >= 1 && [[0, 0], [1, 0], [0, 1], [1, 1]].map(([a, b], k) => <div key={k} style={{position: 'absolute', left: a ? 740 : -20, top: b ? 500 : -20, width: 80, height: 80, borderRadius: 12, background: GOLD, border: `5px solid ${INK}`}} />)}
            <div style={{position: 'absolute', left: 0, right: 0, top: 220, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 58, color: NAVY, opacity: prog(t, 59.0, 59.4)}}>un cadre<br />d’une rigueur absolue</div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={skip ? ['Sauter', 'une', 'étape', '?'] : ['Le', 'cycle', 'en', '6', 'étapes']} mark={skip ? [0, 2] : [1, 3, 4]} at={skip ? 77.7 : 61.1} y={330} size={62} />
          <Abs x={90} y={440} w={900} h={900}>
            <svg width={900} height={900} style={{position: 'absolute', left: 0, top: 0}}>
              <circle cx={450} cy={450} r={330} fill="none" stroke="#E3E8EF" strokeWidth={26} />
              <circle cx={450} cy={450} r={330} fill="none" stroke={RED} strokeWidth={10} strokeDasharray="30 30" strokeDashoffset={-t * 60} opacity={prog(t, 72.7, 73.2)} />
            </svg>
            {CYCLE.map((x, k) => {
              const ang = (k / 6) * Math.PI * 2 - Math.PI / 2;
              const off = skip && k === 2;
              return <div key={x.l} style={{position: 'absolute', left: 450 + Math.cos(ang) * 330 - 95, top: 450 + Math.sin(ang) * 330 - 95, width: 190, height: 190, borderRadius: 95, background: off ? '#E3E8EF' : '#fff', border: `7px solid ${off ? '#C9D2DF' : x.c}`, boxShadow: off ? 'none' : `0 0 24px ${x.c}55`, opacity: pop(t, x.a), transform: `scale(${pop(t, x.a)})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', filter: off ? 'grayscale(1)' : undefined}}>
                <F n={x.ic} size={70} />
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: off ? DIM : x.c}}>{k + 1}. {x.l}</div>
                {off && <div style={{position: 'absolute', fontSize: 150, color: RED, fontWeight: 900, top: -10}}>✕</div>}
              </div>;
            })}
            <div style={{position: 'absolute', left: 300, top: 360, width: 300, textAlign: 'center', opacity: pop(t, 71.46) * (skip ? 0 : 1)}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK, lineHeight: 1.1}}>la colonne vertébrale</div><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 40, color: RED}}>le fil rouge</div></div>
            {skip && t > 80.9 && <div style={{position: 'absolute', left: 450 + Math.cos(boom * Math.PI * 2) * 260 - 60, top: 450 + Math.sin(boom * Math.PI * 2) * 260 - 60, transform: `rotate(${boom * 720}deg)`, filter: `drop-shadow(0 0 16px ${RED})`}}><F n="bug" size={120} /></div>}
            {skip && <div style={{position: 'absolute', left: 280, top: 400, width: 340, textAlign: 'center', opacity: pop(t, 80.9)}}><Pill at={80.9} c={RED} size={26}>le même problème revient</Pill></div>}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 2 · IDENTIFIER ET MESURER ═════════════ */
const QQ = [{k: 'Q', l: 'qui', a: 113.58}, {k: 'Q', l: 'quoi', a: 114.3}, {k: 'O', l: 'où', a: 115.12}, {k: 'Q', l: 'quand', a: 115.9}, {k: 'C', l: 'comment', a: 116.66}, {k: 'C', l: 'combien', a: 117.38}, {k: 'P', l: 'pourquoi', a: 118.0}];
const PAR = [0.36, 0.24, 0.12, 0.08, 0.06, 0.05, 0.04, 0.03, 0.02];
const Mesurer: React.FC = () => {
  const t = useT();
  const ph = t < 107.9 ? 0 : t < 130.3 ? 1 : t < 153.9 ? 2 : t < 166.4 ? 3 : t < 182.4 ? 4 : 5;
  const draw = prog(t, 168.0, 170.5, easeOut);
  let cum = 0;
  return (
    <Out end={196.9}>
      {ph === 0 && (
        <>
          <HiLine words={['Investigation', 'pure']} mark={[0, 1]} at={90.7} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={420} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `9px 9px 0 ${BLUE}`, overflow: 'hidden', opacity: pop(t, 90.7)}}>
            <div style={{position: 'absolute', left: 40, top: 40, fontFamily: MONO, fontWeight: 700, fontSize: 26, color: '#9AA7BC'}}>objectif</div>
            <div style={{position: 'absolute', left: 40, top: 90, fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: '#fff', lineHeight: 1.1, width: 860}}>isoler ce qui cloche,<br /><span style={{color: YEL}}>récolter les faits</span></div>
            <LoupeSweep x0={-40} y0={200} x1={640} y1={150} a={96.2} b={98.9} size={220} />
          </Abs>
          <Abs x={60} y={900} w={960} h={240} style={{background: '#F1F1EC', border: `5px solid ${INK}`, borderRadius: 24, display: 'flex', alignItems: 'center', gap: 30, padding: '0 40px', opacity: pop(t, 102.58)}}>
            <div style={{transform: `translateX(${Math.sin(t * 14) * 8}px)`}}><F n="pas" size={130} /></div>
            <span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: DIM}}>la précipitation<Strike p={prog(t, 103.6, 104.0)} c={RED} /></span>
          </Abs>
          <Abs x={0} y={1200} w={1080} style={{textAlign: 'center'}}><Pill at={106.26} c={NAVY} size={30}>ne rater aucun détail</Pill></Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 119.5 ? ['Le', 'QQOQCCP'] : ['L’outil', 'de', 'l’enquêteur']} mark={t < 119.5 ? [1] : [0, 2]} at={t < 119.5 ? 108.0 : 119.54} y={330} size={66} />
          {t < 119.5 && (
            <Abs x={40} y={480} w={1000} h={800}>
              {QQ.map((q, k) => {
                const flip = prog(t, q.a, q.a + 0.4, easeInOut);
                const row = k < 4 ? 0 : 1;
                const x = row ? 125 + (k - 4) * 250 : (k * 250);
                return (
                  <div key={k} style={{position: 'absolute', left: x, top: row * 380, width: 230, height: 340, perspective: 1000, opacity: pop(t, 110.3 + k * 0.08)}}>
                    <div style={{position: 'absolute', inset: 0, borderRadius: 22, background: flip < 0.5 ? `linear-gradient(160deg, ${NAVY}, ${BLUE})` : '#fff', border: `6px solid ${INK}`, transform: `rotateY(${flip * 180}deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `6px 6px 0 ${GOLD}`}}>
                      <div style={{transform: `rotateY(${flip >= 0.5 ? 180 : 0}deg)`, fontFamily: sansFont, fontWeight: 900, fontSize: flip < 0.5 ? 150 : 40, color: flip < 0.5 ? '#fff' : NAVY}}>{flip < 0.5 ? q.k : q.l}</div>
                    </div>
                  </div>
                );
              })}
            </Abs>
          )}
          {t >= 119.5 && (
            <>
              <Shot src={IMG.enquete} ic="detective" x={60} y={440} w={960} h={520} at={119.6} c={BLUE} blinds />
              <Abs x={60} y={1000} w={460} h={330} style={{opacity: pop(t, 120.14)}}><Card x={0} y={0} w={460} h={330} at={120.14} c={RED}><IcoLab ic="pansement2" l="trousse de premier secours" size={110} fs={30} c={RED} /></Card></Abs>
              <Abs x={560} y={1000} w={460} h={330} style={{opacity: pop(t, 124.74)}}><Card x={0} y={0} w={460} h={330} at={124.74} c={GREEN}><IcoLab ic="clipboard" l="checklist chirurgicale" size={110} fs={30} c={GREEN} /></Card></Abs>
            </>
          )}
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Le', 'filet', 'd’identification']} mark={[1, 2]} at={130.4} y={330} size={62} />
          {[{src: IMG.brain, ic: 'ampoule', l: 'brainstorming', s: 'libérer la parole', a: 134.94, c: GOLD, x: 60, y: 440}, {src: '', ic: 'carte', l: 'cartographie des processus', s: 'qui fait quoi', a: 138.5, c: BLUE, x: 560, y: 440}, {src: IMG.releve, ic: 'clipboard', l: 'feuille de relevé', s: 'collecte sur le terrain', a: 143.02, c: ORANGE, x: 60, y: 900}, {src: IMG.audit, ic: 'auditeur', l: 'audit qualité', s: 'le gardien du temple', a: 147.62, c: VIO, x: 560, y: 900}].map((x) => (
            <Abs key={x.l} x={x.x} y={x.y} w={460} h={420} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `7px 7px 0 ${x.c}`, overflow: 'hidden', opacity: pop(t, x.a), transform: `perspective(1000px) rotateX(${(1 - pop(t, x.a)) * 60}deg)`}}>
              {x.src ? <Pic src={x.src} ic={x.ic} w={460} h={290} zoom={1.08 - 0.05 * prog(t, x.a, x.a + 5)} /> : (
                <svg width={460} height={290} style={{display: 'block', background: '#F4F8FF'}}>
                  {[[40, 120], [170, 60], [170, 190], [310, 120]].map(([cx, cy], k) => <rect key={k} x={cx} y={cy - 30} width={110} height={60} rx={12} fill="#fff" stroke={BLUE} strokeWidth={5} opacity={prog(t, x.a + k * 0.2, x.a + 0.3 + k * 0.2)} />)}
                  {[[150, 120, 170, 90], [150, 120, 170, 190], [280, 90, 310, 120], [280, 190, 310, 120]].map(([a, b, c, d], k) => <line key={k} x1={a} y1={b} x2={c} y2={d} stroke={INK} strokeWidth={4} strokeDasharray={60} strokeDashoffset={60 * (1 - prog(t, x.a + 0.6 + k * 0.1, x.a + 1 + k * 0.1))} />)}
                </svg>
              )}
              <div style={{padding: '12px 20px'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: x.c, lineHeight: 1.05}}>{x.l}</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM}}>{x.s}</div></div>
            </Abs>
          ))}
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={['La', 'data', 'prend', 'le', 'relais']} mark={[1]} at={154.1} y={330} size={62} />
          <Shot src={IMG.donnees} ic="ordinateur" x={60} y={440} w={960} h={420} at={154.1} c={BLUE} />
          {[{l: 'histogramme', a: 156.58, c: BLUE}, {l: 'nuage de points', a: 160.1, c: VIO}, {l: 'carte de contrôle', a: 163.3, c: GREEN}].map((g, k) => (
            <Abs key={g.l} x={60 + k * 330} y={900} w={300} h={440} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `6px 6px 0 ${g.c}`, opacity: pop(t, g.a)}}>
              <svg width={290} height={330} style={{position: 'absolute', left: 0, top: 10}}>
                <line x1={30} y1={300} x2={270} y2={300} stroke={INK} strokeWidth={4} />
                {k === 0 && [0.2, 0.45, 0.75, 1, 0.8, 0.5, 0.25].map((h, j) => <rect key={j} x={38 + j * 33} y={300 - h * 240 * prog(t, g.a + j * 0.06, g.a + 0.4 + j * 0.06)} width={28} height={h * 240 * prog(t, g.a + j * 0.06, g.a + 0.4 + j * 0.06)} fill={g.c} rx={4} />)}
                {k === 1 && Array.from({length: 18}, (_, j) => { const xx = 40 + random(`np${j}`) * 220; const yy = 280 - (xx - 40) * 0.8 - random(`nq${j}`) * 70; return <circle key={j} cx={xx} cy={yy} r={8} fill={g.c} opacity={pop(t, g.a + j * 0.05)} />; })}
                {k === 1 && <line x1={40} y1={260} x2={270} y2={70} stroke={RED} strokeWidth={4} strokeDasharray="10 8" opacity={prog(t, g.a + 1.2, g.a + 1.6)} />}
                {k === 2 && <>
                  <line x1={30} y1={90} x2={270} y2={90} stroke={RED} strokeWidth={3} strokeDasharray="10 8" />
                  <line x1={30} y1={250} x2={270} y2={250} stroke={RED} strokeWidth={3} strokeDasharray="10 8" />
                  <polyline points={Array.from({length: 13}, (_, j) => `${30 + j * 20},${170 + Math.sin(j * 1.7) * 45}`).join(' ')} fill="none" stroke={g.c} strokeWidth={5} strokeDasharray={600} strokeDashoffset={600 * (1 - prog(t, g.a, g.a + 1.4))} />
                </>}
              </svg>
              <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: g.c}}>{g.l}</div>
            </Abs>
          ))}
        </>
      )}
      {ph === 4 && (
        <>
          <HiLine words={['Le', 'joyau', ':', 'Pareto']} mark={[1, 3]} at={166.5} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={560} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 26, boxShadow: `8px 8px 0 ${GOLD}`, opacity: pop(t, 166.5)}}>
            <svg width={960} height={560} style={{position: 'absolute', left: 0, top: 0}}>
              <line x1={60} y1={500} x2={920} y2={500} stroke={INK} strokeWidth={5} />
              {PAR.map((v, j) => { const h = v / PAR[0] * 380 * prog(t, 167.9 + j * 0.08, 168.5 + j * 0.08, easeOut); return <rect key={j} x={80 + j * 92} y={500 - h} width={74} height={h} fill={j < 2 ? RED : '#C9D2DF'} stroke={INK} strokeWidth={3} rx={6} />; })}
              <polyline points={PAR.map((v, j) => { cum += v; return `${117 + j * 92},${500 - cum * 420}`; }).join(' ')} fill="none" stroke={NAVY} strokeWidth={6} strokeDasharray={1400} strokeDashoffset={1400 * (1 - draw)} />
              <line x1={60} y1={500 - 0.8 * 420} x2={920} y2={500 - 0.8 * 420} stroke={GOLD} strokeWidth={3} strokeDasharray="12 10" opacity={prog(t, 171.66, 172.0)} />
            </svg>
            <div style={{position: 'absolute', right: 30, top: 60, fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM}}>illustratif</div>
          </Abs>
          <Abs x={60} y={1040} w={960} h={320} style={{display: 'flex', gap: 30, opacity: pop(t, 171.66)}}>
            <div style={{flex: 1, borderRadius: 26, background: RED, border: `5px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 110, lineHeight: 1}}>{t >= 173.14 ? <Count n={80} a={173.14} b={174.4} suf=" %" /> : '80 %'}</div><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30}}>des problèmes</div></div>
            <div style={{flex: 1, borderRadius: 26, background: '#fff', border: `5px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: INK, opacity: pop(t, 175.34)}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 110, lineHeight: 1, color: RED}}>{t >= 175.34 ? <Count n={20} a={175.34} b={176.4} suf=" %" /> : '20 %'}</div><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30}}>des causes</div></div>
          </Abs>
        </>
      )}
      {ph === 5 && (
        <>
          <HiLine words={['La', 'vraie', 'cause', 'racine']} mark={[1, 2, 3]} at={182.5} y={330} size={64} />
          <SearchOpen x={60} y={440} w={960} h={940} at={184.9} query="cause racine" results={['Les symptômes', 'La cause racine', 'Les hypothèses']} found={1} foundAt={186.2} clickAt={186.6} c={VIO}>
            <div style={{position: 'absolute', inset: 0, background: '#0B0F18'}}>
              <div style={{position: 'absolute', left: lerp(-200, 380, prog(t, 188.0, 191.5, easeInOut)), top: 160, width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,240,180,0.9), rgba(255,240,180,0.15) 60%, transparent 70%)'}} />
              <div style={{position: 'absolute', left: 430, top: 240, opacity: prog(t, 190.5, 191.5), filter: `drop-shadow(0 0 20px ${VIO})`}}><F n="arbre" size={200} /></div>
              <div style={{position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center', opacity: pop(t, 191.14)}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: '#fff'}}>celle qui se cache <span style={{color: VIO}}>dans l’ombre</span></span></div>
              <div style={{position: 'absolute', left: 0, right: 0, top: 680, textAlign: 'center', opacity: pop(t, 194.86)}}><Pill at={194.86} c={VIO} size={32}>place à l’interrogatoire</Pill></div>
            </div>
          </SearchOpen>
          {t < 184.9 && <Abs x={0} y={700} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16}}><Pill at={184.86} c={BLUE} size={30}>identifié ✓</Pill><Pill at={186.34} c={BLUE} size={30}>mesuré ✓</Pill></Abs>}
        </>
      )}
    </Out>
  );
};

/* ═════════════ 3 · LA CAUSE RACINE ═════════════ */
const M6 = [{l: 'Main-d’œuvre', a: 220.38, c: ORANGE}, {l: 'Machine', a: 221.7, c: BLUE}, {l: 'Matière', a: 222.74, c: TEAL}, {l: 'Milieu', a: 223.78, c: RED}, {l: 'Méthode', a: 224.4, c: VIO}, {l: 'Mesure', a: 225.2, c: GOLD}];
const WHY = [239.98, 241.5, 243.0, 246.22, 248.18];
const Cause: React.FC = () => {
  const t = useT();
  const ph = t < 208.3 ? 0 : t < 232.2 ? 1 : t < 251.8 ? 2 : t < 274.6 ? 3 : t < 302.3 ? 4 : 5;
  const drill = prog(t, 203.2, 207.0, easeInOut);
  const spine = prog(t, 216.6, 217.6, easeOut);
  const crit = prog(t, 268.9, 273.2, easeInOut);
  return (
    <Out end={315.8}>
      {ph === 0 && (
        <>
          <HiLine words={['Sous', 'les', 'symptômes']} mark={[2]} at={200.2} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={940} style={{borderRadius: 30, overflow: 'hidden', border: `5px solid ${INK}`, opacity: pop(t, 200.2)}}>
            {['#C9E4F5', '#C7A57A', '#A47B52', '#7E5A3A', '#5A3E28'].map((c, k) => <div key={k} style={{position: 'absolute', left: 0, right: 0, top: k * 188, height: 188, background: c}} />)}
            <div style={{position: 'absolute', left: 30, top: 70, fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: NAVY, opacity: pop(t, 203.18)}}>symptômes</div>
            <div style={{position: 'absolute', left: 455, top: 0, width: 50, height: 120 + drill * 700, background: `repeating-linear-gradient(180deg, #9AA7BC 0 20px, #6B7689 20px 40px)`, border: `4px solid ${INK}`, borderRadius: '0 0 25px 25px'}} />
            {drill >= 1 && <div style={{position: 'absolute', left: 380, top: 790, width: 200, height: 100, borderRadius: '50%', background: `radial-gradient(circle, ${GOLD}, transparent 70%)`, opacity: 0.6 + 0.4 * Math.sin(t * 6)}} />}
            <div style={{position: 'absolute', right: 30, bottom: 40, opacity: pop(t, 205.86)}}><Pill at={205.86} c={GOLD} size={28}>l’origine fondamentale</Pill></div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 216.5 ? ['Le', 'diagramme', 'd’Ishikawa'] : ['Les', '6', 'M']} mark={t < 216.5 ? [2] : [1, 2]} at={t < 216.5 ? 208.4 : 216.6} y={330} size={64} />
          {t < 216.5 && <Shot src={IMG.ishikawa} ic="poisson" x={60} y={440} w={960} h={760} at={208.4} c={VIO}><div style={{position: 'absolute', left: 24, bottom: 24}}><Pill at={211.78} c={VIO} size={28}>l’arête de poisson</Pill></div></Shot>}
          {t >= 216.5 && (
            <Abs x={40} y={460} w={1000} h={760}>
              <svg width={1000} height={760} style={{position: 'absolute', left: 0, top: 0}}>
                <line x1={30} y1={380} x2={30 + 740 * spine} y2={380} stroke={INK} strokeWidth={12} strokeLinecap="round" />
                {M6.map((m, k) => { const up = k < 3; const bx = 140 + (k % 3) * 220; const b = prog(t, m.a, m.a + 0.4, easeOut); return <line key={m.l} x1={bx + 90} y1={380} x2={lerp(bx + 90, bx, b)} y2={lerp(380, up ? 90 : 670, b)} stroke={m.c} strokeWidth={10} strokeLinecap="round" />; })}
              </svg>
              {M6.map((m, k) => { const up = k < 3; const bx = 140 + (k % 3) * 220; return <div key={`l${m.l}`} style={{position: 'absolute', left: bx - 90, top: up ? 30 : 680, width: 200, textAlign: 'center', opacity: pop(t, m.a)}}><span style={{display: 'inline-block', background: m.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 26, padding: '6px 12px', borderRadius: 10}}>{m.l}</span></div>; })}
              <div style={{position: 'absolute', left: 780, top: 320, width: 200, height: 120, borderRadius: 18, background: RED, border: `5px solid ${INK}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: prog(t, 217.4, 217.8), boxShadow: `0 0 ${20 + 10 * Math.sin(t * 5)}px ${RED}88`}}>PROBLÈME</div>
            </Abs>
          )}
          {t > 226.6 && <Abs x={0} y={1260} w={1080} style={{textAlign: 'center'}}><Pill at={226.6} c={VIO} size={30}>systématique, sans s’éparpiller</Pill></Abs>}
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Les', '5', 'pourquoi']} mark={[1, 2]} at={232.3} y={330} size={68} />
          <Abs x={60} y={440} w={960} h={900}>
            {WHY.map((a, k) => {
              const peel = prog(t, (WHY[k + 1] ?? 249.9), (WHY[k + 1] ?? 249.9) + 0.6, easeIn);
              return <div key={k} style={{position: 'absolute', left: k * 40, top: k * 70, width: 960 - k * 80, height: 560 - k * 40, borderRadius: 30, background: ['#E9EEF6', '#DCE3EE', '#CBD5E3', '#B8C5D8', '#A6B5CC'][k], border: `5px solid ${INK}`, opacity: pop(t, a) * (1 - peel), transform: `translateY(${peel * -200}px) rotate(${peel * -8}deg)`, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '20px 30px', boxSizing: 'border-box'}}>
                <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: NAVY}}>pourquoi ? <span style={{color: VIO}}>#{k + 1}</span></span>
                <F n="enfants" size={70} />
              </div>;
            })}
            {t > 250.18 && <div style={{position: 'absolute', left: 280, top: 430, width: 400, height: 260, borderRadius: 30, background: `radial-gradient(circle, #FFF4C8, ${GOLD})`, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: INK, transform: `scale(${Math.min(1, spring(t, 250.18, 8, 11))})`, boxShadow: `0 0 60px ${GOLD}`}}>la vraie cause !</div>}
          </Abs>
          <Abs x={0} y={1250} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16}}><Pill at={235.74} c={TEAL} size={26}>simplicité désarmante</Pill><Pill at={237.98} c={VIO} size={26}>efficacité bluffante</Pill></Abs>
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={['L’AMDEC', ':', 'zéro', 'droit', 'à', 'l’erreur']} mark={[0, 2]} at={251.9} y={330} size={54} />
          <Shot src={IMG.aero} ic="avion" x={60} y={440} w={960} h={440} at={252.0} c={NAVY}>
            <div style={{position: 'absolute', left: 24, bottom: 24}}><Pill at={260.42} c={NAVY} size={26}>aérospatiale · automobile</Pill></div>
          </Shot>
          <Abs x={60} y={920} w={960} h={440} style={{background: NIGHT, border: `5px solid ${INK}`, borderRadius: 26, overflow: 'hidden', opacity: pop(t, 265.74)}}>
            {[{l: 'mode de défaillance', s: 'comment flancher ?', a: 268.9}, {l: 'effet', s: 'de la panne', a: 270.54}, {l: 'criticité', s: 'niveau exact', a: 272.78}].map((c, k) => <div key={c.l} style={{position: 'absolute', left: 30 + k * 305, top: 30, width: 280, height: 150, borderRadius: 18, background: '#1F2A3D', border: `3px solid #33405A`, padding: 16, boxSizing: 'border-box', opacity: pop(t, c.a)}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff'}}>{c.l}</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: '#9AA7BC'}}>{c.s}</div></div>)}
            <div style={{position: 'absolute', left: 30, right: 30, top: 230, height: 70, borderRadius: 35, background: `linear-gradient(90deg, ${GREEN}, ${YEL}, ${ORANGE}, ${RED})`, border: `4px solid #000`}} />
            <div style={{position: 'absolute', left: 30 + crit * 840, top: 210, width: 40, height: 110, borderRadius: 10, background: '#fff', border: `5px solid #000`}} />
            <div style={{position: 'absolute', left: 0, right: 0, top: 340, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#9AA7BC'}}>une panne peut être catastrophique</div>
          </Abs>
        </>
      )}
      {ph === 4 && (
        <>
          <HiLine words={['SWOT', 'contre', '5S']} mark={[0, 2]} at={274.8} y={330} size={68} />
          <Abs x={60} y={440} w={960} h={430} style={{opacity: pop(t, 280.58)}}>
            <div style={{position: 'absolute', left: 0, top: 0, fontFamily: MONO, fontWeight: 700, fontSize: 24, color: NAVY}}>SWOT · vision macro, stratégique</div>
            {[{l: 'forces', c: GREEN, a: 284.3}, {l: 'faiblesses', c: ORANGE, a: 285.26}, {l: 'opportunités', c: BLUE, a: 285.86}, {l: 'menaces', c: RED, a: 286.98}].map((q, k) => <div key={q.l} style={{position: 'absolute', left: (k % 2) * 490, top: 40 + Math.floor(k / 2) * 195, width: 470, height: 180, borderRadius: 20, background: `${q.c}22`, border: `5px solid ${q.c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: q.c, opacity: pop(t, q.a), transform: `scale(${0.8 + 0.2 * pop(t, q.a)})`}}>{q.l}</div>)}
          </Abs>
          <Shot src={IMG.s5} ic="boite-outils" x={60} y={900} w={460} h={460} at={288.8} c={TEAL} blinds />
          <Abs x={560} y={900} w={460} h={460} style={{display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center', opacity: pop(t, 288.8)}}>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: TEAL}}>5S · micro, hyper pragmatique</div>
            {[{l: 'trier', a: 290.5}, {l: 'ranger', a: 291.0}, {l: 'nettoyer', a: 291.66}, {l: 'standardiser', a: 292.42}, {l: 'maintenir', a: 293.46}].map((x, k) => <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 14, opacity: pop(t, x.a), transform: `translateX(${(1 - pop(t, x.a)) * 60}px)`}}><Num n={k + 1} c={TEAL} size={56} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK}}>{x.l}</span></div>)}
          </Abs>
        </>
      )}
      {ph === 5 && (
        <>
          <HiLine words={['La', 'moitié', 'du', 'chemin']} mark={[1]} at={302.5} y={330} size={66} />
          <Abs x={60} y={480} w={960} h={420} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 26, padding: 40, boxSizing: 'border-box', opacity: pop(t, 302.5)}}>
            <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: sansFont, fontWeight: 900, fontSize: 36}}><span style={{color: VIO}}>trouver la cause</span><span style={{color: RED, opacity: pop(t, 305.5)}}>l’éliminer</span></div>
            <div style={{marginTop: 40, height: 90, borderRadius: 45, background: '#E3E8EF', border: `5px solid ${INK}`, overflow: 'hidden'}}><div style={{height: '100%', width: `${50 * prog(t, 303.0, 304.6, easeOut) + 50 * prog(t, 312.4, 313.8, easeOut)}%`, background: `linear-gradient(90deg, ${VIO}, ${GREEN})`}} /></div>
            <div style={{marginTop: 30, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: VIO}}><Count n={50} a={303.0} b={304.6} suf=" %" /></div>
          </Abs>
          <Abs x={0} y={980} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap'}}><Pill at={309.22} c={ORANGE} size={30}>s’en débarrasser pour de bon</Pill><Pill at={311.02} c={GREEN} size={30}>le prouver</Pill></Abs>
          <Abs x={0} y={1130} w={1080} style={{textAlign: 'center'}}><Pill at={313.86} c={RED} size={36}>place à l’action !</Pill></Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 4 · TRAITER ET VÉRIFIER ═════════════ */
const Traiter: React.FC = () => {
  const t = useT();
  const ph = t < 344.3 ? 0 : t < 363.5 ? 1 : 2;
  return (
    <Out end={380.9}>
      {ph === 0 && (
        <>
          <HiLine words={['La', 'méthode', '8D']} mark={[1, 2]} at={319.1} y={330} size={68} />
          <Shot src={IMG.d8} ic="voiture" x={60} y={440} w={960} h={460} at={319.1} c={ORANGE}>
            <div style={{position: 'absolute', left: 24, top: 24}}><Pill at={321.7} c={ORANGE} size={26}>solutions concrètes sur le terrain</Pill></div>
          </Shot>
          <Abs x={60} y={940} w={960} h={170} style={{display: 'flex', gap: 10, opacity: pop(t, 326.82)}}>
            {Array.from({length: 8}, (_, k) => { const on = t >= 327.0 + k * 0.18; return <div key={k} style={{flex: 1, borderRadius: 16, background: on ? `linear-gradient(180deg, ${ORANGE}, ${BURG})` : '#E3E8EF', border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: on ? '#fff' : DIM, fontFamily: sansFont, fontWeight: 900, fontSize: 38, transform: `translateY(${on ? -8 * Math.max(0, 1 - (t - 327 - k * 0.18) * 3) : 0}px)`}}>D{k + 1}</div>; })}
          </Abs>
          <Abs x={60} y={1140} w={960} h={220} style={{display: 'flex', gap: 20}}>
            <Card x={0} y={0} w={470} h={220} at={330.14} c={BLUE}><div style={{padding: 22}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM}}>anecdote</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, lineHeight: 1.1}}>popularisée par la Ford Motor Company</div></div></Card>
            <Card x={490} y={0} w={470} h={220} at={340.06} c={RED}><div style={{padding: 22}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM}}>aujourd’hui</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, lineHeight: 1.1}}>l’arme ultime contre les anomalies récalcitrantes</div></div></Card>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Un', 'trio', 'redoutable']} mark={[1, 2]} at={344.5} y={330} size={66} />
          {[{l: 'plan d’action', s: 'rôles et délais', a: 348.34, c: NAVY}, {l: 'matrice des risques', s: 'anticiper les effets de bord', a: 352.74, c: RED}, {l: 'benchmarking', s: 'se comparer aux meilleurs', a: 357.9, c: GOLD}].map((x, k) => (
            <GlassCard key={x.l} x={60} y={440 + k * 310} w={960} h={280} at={x.a} c={x.c}>
              <div style={{position: 'absolute', left: 30, top: 30}}><Num n={k + 1} c={x.c} size={90} /></div>
              <div style={{position: 'absolute', left: 150, top: 40, fontFamily: sansFont, fontWeight: 900, fontSize: 42, color: x.c}}>{x.l}</div>
              <div style={{position: 'absolute', left: 152, top: 108, fontFamily: MONO, fontWeight: 700, fontSize: 24, color: INK}}>{x.s}</div>
              <div style={{position: 'absolute', left: 600, top: 40, width: 330, height: 200}}>
                {k === 0 && [0.7, 0.45, 0.85, 0.3].map((w, j) => <div key={j} style={{height: 30, marginTop: 14, marginLeft: j * 40, width: `${w * 100 * prog(t, x.a + j * 0.2, x.a + 0.8 + j * 0.2, easeOut)}%`, background: [NAVY, BLUE, TEAL, GOLD][j], borderRadius: 8}} />)}
                {k === 1 && <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, width: 200, marginLeft: 110}}>{Array.from({length: 9}, (_, j) => { const r = 2 - Math.floor(j / 3); const c = j % 3; const v = (r + 1) * (c + 1); return <div key={j} style={{height: 58, borderRadius: 8, border: `3px solid ${INK}`, background: v <= 2 ? GREEN : v <= 4 ? ORANGE : RED, opacity: pop(t, x.a + j * 0.06)}} />; })}</div>}
                {k === 2 && <div style={{display: 'flex', alignItems: 'flex-end', gap: 14, height: 190, justifyContent: 'center'}}>{[0.55, 1, 0.75].map((h, j) => <div key={j} style={{width: 80, height: `${h * 100 * prog(t, x.a + j * 0.15, x.a + 0.7 + j * 0.15, easeOut)}%`, background: j === 1 ? GOLD : '#C9D2DF', border: `3px solid ${INK}`, borderRadius: '10px 10px 0 0', display: 'flex', justifyContent: 'center', paddingTop: 6, fontFamily: sansFont, fontWeight: 900, fontSize: 30}}>{j === 1 ? '★' : ''}</div>)}</div>}
              </div>
            </GlassCard>
          ))}
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['L’heure', 'du', 'verdict']} mark={[0, 2]} at={363.7} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={300} style={{background: NIGHT, border: `5px solid ${INK}`, borderRadius: 26, display: 'flex', alignItems: 'center', gap: 30, padding: '0 40px', opacity: pop(t, 363.7)}}>
            <div style={{transform: `rotate(${t > 366.7 ? -30 + 30 * prog(t, 366.7, 367.0, easeIn) : -30}deg)`, transformOrigin: '80% 80%'}}><F n="juge2" size={170} /></div>
            <div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: GOLD}}>KPI qualité</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: '#9AA7BC', opacity: pop(t, 368.54)}}>indicateurs clés de performance</div></div>
          </Abs>
          {[{l: 'taux de conformité', ic: 'check', a: 371.94, c: GREEN}, {l: 'réclamations', ic: 'baisse', a: 373.14, c: BLUE}, {l: 'délais', ic: 'chrono', a: 374.5, c: ORANGE}].map((x, k) => (
            <Abs key={x.l} x={60 + k * 330} y={780} w={300} h={330} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `6px 6px 0 ${x.c}`, opacity: pop(t, x.a), transform: `translateY(${(1 - pop(t, x.a)) * 60}px)`}}><IcoLab ic={x.ic} l={x.l} size={120} fs={30} c={x.c} /></Abs>
          ))}
          <Abs x={0} y={1160} w={1080} style={{textAlign: 'center'}}><Pill at={375.54} c={NAVY} size={32}>des juges impartiaux</Pill></Abs>
          <Abs x={0} y={1260} w={1080} style={{textAlign: 'center', opacity: pop(t, 378.66)}}><span style={{position: 'relative', fontFamily: handFont, fontWeight: 700, fontSize: 44, color: DIM}}>sans eux : une simple opinion<Strike p={prog(t, 379.6, 380.0)} c={RED} /></span></Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 5 · L'AMÉLIORATION CONTINUE ═════════════ */
const PDCA = [{l: 'Plan', s: 'planifier', a: 396.66, c: BLUE}, {l: 'Do', s: 'réaliser', a: 397.7, c: GREEN}, {l: 'Check', s: 'vérifier', a: 398.74, c: ORANGE}, {l: 'Act', s: 'agir', a: 399.62, c: RED}];
const Ameliorer: React.FC = () => {
  const t = useT();
  const ph = t < 396.6 ? 0 : 1;
  const inf = prog(t, 388.0, 390.4, easeInOut);
  const climb = prog(t, 403.4, 409.0, easeInOut);
  const back = t > 410.0 && t < 412.5 ? Math.sin((t - 410) * 9) * 0.03 * (1 - prog(t, 410, 412.5)) : 0;
  const pos = Math.max(0, climb - (t > 409.8 ? 0.04 * Math.max(0, 1 - (t - 409.8) * 2) : 0)) + back;
  return (
    <Out end={414.8}>
      {ph === 0 && (
        <>
          <HiLine words={['Jamais', 'fini']} mark={[0, 1]} at={384.2} y={330} size={72} />
          <Abs x={90} y={460} w={900} h={600} style={{opacity: pop(t, 384.2)}}>
            <svg width={900} height={600}>
              <path d="M 450 300 C 250 80, 60 160, 60 300 C 60 440, 250 520, 450 300 C 650 80, 840 160, 840 300 C 840 440, 650 520, 450 300 Z" fill="none" stroke="#E3E8EF" strokeWidth={40} />
              <path d="M 450 300 C 250 80, 60 160, 60 300 C 60 440, 250 520, 450 300 C 650 80, 840 160, 840 300 C 840 440, 650 520, 450 300 Z" fill="none" stroke={TEAL} strokeWidth={40} strokeLinecap="round" strokeDasharray={2200} strokeDashoffset={2200 * (1 - inf)} />
            </svg>
          </Abs>
          <Abs x={0} y={1110} w={1080} style={{textAlign: 'center'}}><Pill at={391.26} c={TEAL} size={34}>l’amélioration en continu</Pill></Abs>
          <Abs x={0} y={1230} w={1080} style={{textAlign: 'center'}}><Pill at={395.02} c={NAVY} size={30}>le moteur : le cycle PDCA</Pill></Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 402.4 ? ['La', 'roue', 'de', 'Deming'] : ['La', 'roue', 'et', 'sa', 'cale']} mark={t < 402.4 ? [1, 3] : [1, 4]} at={t < 402.4 ? 396.7 : 402.5} y={330} size={64} />
          <Shot src={IMG.roue} ic="pousse" x={60} y={440} w={960} h={360} at={402.5} c={TEAL} />
          <Abs x={60} y={820} w={960} h={560}>
            <svg width={960} height={560} style={{position: 'absolute', left: 0, top: 0}}>
              <polygon points="0,540 960,140 960,560 0,560" fill="#DCE3EC" stroke={INK} strokeWidth={6} />
              <text x={820} y={130} fontFamily="sans-serif" fontWeight={900} fontSize={30} fill={GREEN} opacity={prog(t, 407.3, 407.8)}>excellence</text>
            </svg>
            {(() => {
              const x = lerp(110, 720, pos);
              const y = 540 - (x / 960) * 400 - 230;
              return (
                <>
                  <div style={{position: 'absolute', left: x, top: y, width: 240, height: 240, borderRadius: '50%', border: `8px solid ${INK}`, overflow: 'hidden', transform: `rotate(${pos * 720}deg)`, boxShadow: '0 10px 24px rgba(0,0,0,0.25)'}}>
                    {PDCA.map((q, k) => <div key={q.l} style={{position: 'absolute', left: k % 3 === 0 ? 0 : '50%', top: k < 2 ? 0 : '50%', width: '50%', height: '50%', background: t >= q.a ? q.c : '#E3E8EF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30}}>{q.l[0]}</div>)}
                  </div>
                  {t > 409.14 && <div style={{position: 'absolute', left: x - 70, top: y + 170, width: 0, height: 0, borderLeft: '70px solid transparent', borderBottom: `70px solid ${GOLD}`, transform: `rotate(-22deg) scale(${pop(t, 409.14)})`, filter: `drop-shadow(0 0 10px ${GOLD})`}} />}
                </>
              );
            })()}
            <div style={{position: 'absolute', left: 30, top: 20, display: 'flex', gap: 10}}>{PDCA.map((q) => <Pill key={q.l} at={q.a} c={q.c} size={24}>{q.s}</Pill>)}</div>
            {t > 409.14 && <div style={{position: 'absolute', left: 30, top: 470}}><Pill at={409.14} c={GOLD} size={26}>la cale : pas de retour en arrière</Pill></div>}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 6 · LA MACHINE HUILÉE ═════════════ */
const CHAIN = [{l: 'Pareto', s: 'cibler l’urgence', a: 423.51, c: RED}, {l: 'Ishikawa + 5 pourquoi', s: 'décortiquer la cause', a: 425.93, c: VIO}, {l: 'plan d’action', s: 'lancer', a: 429.86, c: NAVY}, {l: 'PDCA', s: 'encadrer', a: 431.33, c: TEAL}, {l: 'KPI', s: 'le verdict', a: 433.98, c: GOLD}];
const Synthese: React.FC = () => {
  const t = useT();
  const ph = t < 436.6 ? 0 : t < 444.4 ? 1 : t < 454.4 ? 2 : 3;
  const ord = prog(t, 437.6, 439.0, easeInOut);
  return (
    <Out end={OUTRO_AT}>
      {ph === 0 && (
        <>
          <HiLine words={['Une', 'montre', 'suisse']} mark={[1, 2]} at={418.2} y={330} size={66} />
          <Shot src={IMG.montre} ic="engrenage" x={60} y={440} w={960} h={360} at={418.2} c={GOLD} pos="50% 50%" />
          <Abs x={60} y={830} w={960} h={540}>
            {CHAIN.map((g, k) => {
              const cx = 100 + k * 190;
              const cy = k % 2 ? 330 : 150;
              const on = t >= g.a;
              return (
                <div key={g.l} style={{position: 'absolute', left: cx - 95, top: cy - 95, width: 190, height: 190, opacity: pop(t, g.a - 0.2)}}>
                  <div style={{position: 'absolute', inset: 0, transform: `rotate(${(t - 420) * (k % 2 ? -90 : 90)}deg)`, filter: on ? `drop-shadow(0 0 12px ${g.c})` : 'grayscale(1)'}}><F n="engrenage" size={190} /></div>
                  <div style={{position: 'absolute', left: -40, right: -40, top: k % 2 ? 196 : -64, textAlign: 'center'}}><span style={{display: 'inline-block', background: on ? g.c : DIM, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 22, padding: '4px 10px', borderRadius: 8, lineHeight: 1.1}}>{g.l}</span></div>
                </div>
              );
            })}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Vaincre', 'le', 'chaos']} mark={[0, 2]} at={436.7} y={330} size={70} />
          <Abs x={60} y={460} w={960} h={860}>
            {Array.from({length: 30}, (_, k) => { const gx = 60 + (k % 6) * 150; const gy = 60 + Math.floor(k / 6) * 150; return <div key={k} style={{position: 'absolute', left: lerp(random(`cx${k}`) * 880 + Math.sin(t * 3 + k) * 40, gx, ord), top: lerp(random(`cy${k}`) * 780 + Math.cos(t * 2.6 + k) * 40, gy, ord), width: 110, height: 110, borderRadius: lerp(55, 18, ord), background: ord > 0.5 ? [NAVY, BLUE, TEAL, GREEN, GOLD, VIO][k % 6] : '#C9D2DF', border: `4px solid ${INK}`, transform: `rotate(${(1 - ord) * (t * 120 + k * 30)}deg)`}} />; })}
          </Abs>
          {ord >= 1 && <Abs x={0} y={1230} w={1080} style={{textAlign: 'center'}}><Pill at={439.0} c={GREEN} size={32}>une machine parfaitement huilée</Pill></Abs>}
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Le', 'langage', 'mondial']} mark={[1, 2]} at={444.6} y={330} size={66} />
          <Abs x={240} y={450} w={600} h={600} style={{opacity: pop(t, 444.6)}}>
            <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, #BFE3FF, ${BLUE} 60%, ${NAVY})`, border: `8px solid ${INK}`, boxShadow: `0 0 60px ${BLUE}66`, overflow: 'hidden'}}>
              {Array.from({length: 6}, (_, k) => <div key={k} style={{position: 'absolute', left: ((k * 160 + t * 60) % 900) - 150, top: 80 + (k % 3) * 160, width: 220, height: 110, borderRadius: '50%', background: '#4CAF7A', opacity: 0.85}} />)}
            </div>
            <div style={{position: 'absolute', left: -140, top: 240, transform: `scale(${pop(t, 450.14)}) rotate(-8deg)`}}><span style={{display: 'inline-block', background: GOLD, color: INK, border: `5px solid ${INK}`, fontFamily: sansFont, fontWeight: 900, fontSize: 44, padding: '10px 24px', borderRadius: 16}}>ISO 9001</span></div>
            <div style={{position: 'absolute', right: -140, top: 380, transform: `scale(${pop(t, 452.62)}) rotate(6deg)`}}><span style={{display: 'inline-block', background: GREEN, color: '#fff', border: `5px solid ${INK}`, fontFamily: sansFont, fontWeight: 900, fontSize: 40, padding: '10px 24px', borderRadius: 16}}>lean management</span></div>
          </Abs>
          <Abs x={0} y={1110} w={1080} style={{textAlign: 'center'}}><Pill at={447.54} c={RED} size={30}>le cœur battant des normes</Pill></Abs>
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={t < 467.4 ? ['Les', 'fondations', 'de', 'l’innovation'] : ['Et', 'maintenant', '?']} mark={t < 467.4 ? [1, 3] : [1]} at={t < 467.4 ? 456.2 : 467.5} y={330} size={58} />
          <Shot src={IMG.final} ic="fusee" x={60} y={440} w={960} h={480} at={456.2} c={GREEN} blinds />
          <PneuDeliver x={60} y={935} w={960} at={460.6} c={GREEN} />
          <Abs x={60} y={1010} w={960} h={380}>
            {[{l: 'désordre', c: DIM, a: 461.4}, {l: 'prévisible', c: BLUE, a: 463.0}, {l: 'innovation continue', c: GREEN, a: 464.6}].map((b, k) => <div key={b.l} style={{position: 'absolute', left: 120 + k * 60, bottom: k * 115, width: 720 - k * 120, height: 105, borderRadius: 16, background: b.c, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 38, opacity: pop(t, b.a), transform: `translateY(${(1 - pop(t, b.a)) * -200}px)`}}>{b.l}</div>)}
          </Abs>
          {t > 469.4 && <Abs x={0} y={720} w={1080} style={{textAlign: 'center', zIndex: 5}}><span style={{display: 'inline-block', background: INK, color: GOLD, fontFamily: sansFont, fontWeight: 900, fontSize: 44, padding: '14px 28px', borderRadius: 18, transform: `scale(${pop(t, 469.4)})`}}>votre prochain processus ?</span></Abs>}
          {t > ALLDONE && <Dust n={22} c={GOLD} />}
        </>
      )}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: at + 0.35 + len * 0.05, s: 'sfx/pop', v: 0.25}, ...rep(at + 0.8 + len * 0.05, 3, 0.12, 'sfx/pop', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const shine = (a: number): Sfx => ({at: a, s: 'soft-whoosh', v: 0.18, dur: 0.8});
const pops = (L: number[], v = 0.22): Sfx[] => L.map((a) => ({at: a, s: 'sfx/pop', v}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, ...flaps(0.1, 6), {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 0.8, s: 'validation', v: 0.18})), {at: ALLDONE, s: 'validation', v: 0.35},
  ...TOOLS.map((x) => ({at: x.a, s: 'sfx/ding', v: 0.2})), {at: 395.1, s: 'validation', v: 0.3},
  ...rep(3.4, 20, 0.12, 'sfx/pop', 0.1), {at: 6.0, s: 'sfx/thud', v: 0.4},
  {at: 8.3, s: 'sfx/whoosh', v: 0.22}, {at: 12.9, s: 'soft-whoosh', v: 0.4, dur: 3.5}, {at: 15.3, s: 'sfx/pop', v: 0.2},
  ...rep(18.0, 20, 0.05, 'tick', 0.1), {at: 20.6, s: 'soft-whoosh', v: 0.4, dur: 1.4}, {at: 22.0, s: 'sfx/thud', v: 0.3}, ...pops([21.74, 22.7, 24.22]),
  ...pops(PARC.map((x) => x.a)), ...PARC.map((x) => shine(x.a + 0.3)),
  {at: 52.42, s: 'sfx/pop', v: 0.2}, {at: 55.8, s: 'stylo', v: 0.3}, {at: 56.62, s: 'deep-hit', v: 0.3}, {at: 58.22, s: 'sfx/swish', v: 0.3}, {at: 59.2, s: 'sfx/thud', v: 0.35},
  ...CYCLE.map((x) => ({at: x.a, s: 'sfx/pop', v: 0.22})), {at: 72.7, s: 'soft-whoosh', v: 0.3}, {at: 77.7, s: 'sfx/swish', v: 0.3}, {at: 78.0, s: 'deep-hit', v: 0.3}, {at: 80.9, s: 'soft-whoosh', v: 0.4, dur: 2}, {at: 82.4, s: 'alarme', v: 0.05, dur: 0.8},
  {at: 90.7, s: 'sfx/whoosh', v: 0.22}, {at: 96.2, s: 'soft-whoosh', v: 0.3, dur: 2.5}, {at: 102.58, s: 'sfx/pop', v: 0.2}, {at: 103.6, s: 'stylo', v: 0.3}, {at: 106.26, s: 'sfx/pop', v: 0.2},
  ...rep(110.3, 7, 0.08, 'sfx/pop', 0.12), ...QQ.map((q) => ({at: q.a, s: 'sfx/swish', v: 0.2})), {at: 119.6, s: 'soft-whoosh', v: 0.4, dur: 1}, ...pops([120.14, 124.74]),
  ...[134.94, 138.5, 143.02, 147.62].map((a) => ({at: a, s: 'sfx/whoosh', v: 0.2})),
  {at: 154.1, s: 'sfx/whoosh', v: 0.22}, ...rep(156.6, 7, 0.06, 'sfx/pop', 0.1), ...rep(160.1, 18, 0.05, 'tick', 0.08), {at: 163.3, s: 'stylo', v: 0.3},
  ...rep(167.9, 9, 0.08, 'sfx/pop', 0.1), {at: 168.0, s: 'stylo', v: 0.3}, ...rep(173.14, 10, 0.12, 'tick', 0.12), {at: 174.4, s: 'bass-hit', v: 0.3}, ...rep(175.34, 8, 0.12, 'tick', 0.12),
  ...searchCues(184.9, 12, 186.2, 186.6), {at: 190.5, s: 'sfx/rise', v: 0.22, dur: 1}, {at: 194.86, s: 'sfx/pop', v: 0.22},
  {at: 200.2, s: 'sfx/whoosh', v: 0.22}, {at: 203.2, s: 'soft-whoosh', v: 0.35, dur: 3.8}, ...rep(203.4, 18, 0.2, 'tick', 0.1), {at: 207.0, s: 'sfx/thud', v: 0.4},
  {at: 208.4, s: 'sfx/whoosh', v: 0.22}, {at: 216.6, s: 'stylo', v: 0.35}, ...M6.map((m) => ({at: m.a, s: 'sfx/pop', v: 0.2})), {at: 226.6, s: 'sfx/pop', v: 0.2},
  ...WHY.map((a) => ({at: a, s: 'sfx/pop', v: 0.25})), ...WHY.slice(1).map((a) => ({at: a, s: 'sfx/swish', v: 0.22})), {at: 250.18, s: 'validation', v: 0.35}, {at: 250.2, s: 'bass-hit', v: 0.3},
  {at: 252.0, s: 'sfx/whoosh', v: 0.22}, ...pops([268.9, 270.54, 272.78], 0.2), {at: 268.9, s: 'sfx/rise', v: 0.22, dur: 4}, {at: 273.2, s: 'alarme', v: 0.05, dur: 0.8},
  ...pops([284.3, 285.26, 285.86, 286.98], 0.22), {at: 288.8, s: 'soft-whoosh', v: 0.4, dur: 1}, ...pops([290.5, 291.0, 291.66, 292.42, 293.46], 0.18),
  {at: 302.5, s: 'sfx/whoosh', v: 0.2}, ...rep(303.0, 10, 0.15, 'tick', 0.12), ...pops([309.22, 311.02]), {at: 313.86, s: 'bass-hit', v: 0.3},
  {at: 319.1, s: 'sfx/whoosh', v: 0.22}, ...rep(327.0, 8, 0.18, 'sfx/thud', 0.2), ...pops([330.14, 340.06]),
  ...[348.34, 352.74, 357.9].flatMap((a) => [{at: a, s: 'sfx/pop', v: 0.25}, shine(a + 0.3)]),
  {at: 363.7, s: 'sfx/whoosh', v: 0.22}, {at: 367.0, s: 'tampon', v: 0.6}, ...pops([371.94, 373.14, 374.5]), {at: 375.54, s: 'sfx/ding', v: 0.22}, {at: 379.6, s: 'stylo', v: 0.3},
  {at: 384.2, s: 'sfx/whoosh', v: 0.2}, {at: 388.0, s: 'soft-whoosh', v: 0.35, dur: 2.4}, {at: 391.26, s: 'sfx/pop', v: 0.22},
  ...PDCA.map((q) => ({at: q.a, s: 'sfx/pop', v: 0.22})), {at: 402.5, s: 'soft-whoosh', v: 0.3}, {at: 403.4, s: 'sfx/rise', v: 0.25, dur: 5.6}, {at: 409.14, s: 'sfx/thud', v: 0.45}, {at: 409.2, s: 'tampon', v: 0.4},
  {at: 418.2, s: 'sfx/whoosh', v: 0.22}, ...CHAIN.map((g) => ({at: g.a, s: 'sfx/click', v: 0.4})), ...rep(420, 30, 0.5, 'tick', 0.08),
  {at: 436.7, s: 'sfx/whoosh', v: 0.2}, {at: 437.6, s: 'soft-whoosh', v: 0.45, dur: 1.4}, {at: 439.0, s: 'sfx/thud', v: 0.35},
  {at: 444.6, s: 'sfx/whoosh', v: 0.2}, {at: 447.54, s: 'sfx/pop', v: 0.2}, {at: 450.14, s: 'tampon', v: 0.5}, {at: 452.62, s: 'tampon', v: 0.45},
  {at: 456.2, s: 'soft-whoosh', v: 0.4, dur: 1}, {at: 460.6, s: 'sfx/swish', v: 0.3}, ...[461.4, 463.0, 464.6].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), {at: 469.4, s: 'sfx/rise', v: 0.25, dur: 1},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const VingtOutils: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={46.55}><Intro /></Gate>
    <Gate from={49.7} to={83.95}><Logique /></Gate>
    <Gate from={87.1} to={196.95}><Mesurer /></Gate>
    <Gate from={200.1} to={315.85}><Cause /></Gate>
    <Gate from={319.0} to={380.95}><Traiter /></Gate>
    <Gate from={384.1} to={414.85}><Ameliorer /></Gate>
    <Gate from={418.0} to={OUTRO_AT}><Synthese /></Gate>
    <Gate from={46.5} to={OUTRO_AT}><Shelf /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}><Gyro i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={472.8}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-20-outils-qualite-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Kin, Brut, T, TitleBlock, Win, Count, GLASS, Check, Tile, Stamp, YEL];
