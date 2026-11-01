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
import {captions} from '../methodesRisques/captions';
import {NeoCaptions} from '../components/NeoCaptions';

/**
 * « 15 méthodes d'identification et d'analyse des risques » (voix d'origine, 17 min 06) — capsule « condensé + effet
 * wahou + ultra premium » présentée en métro : les 15 méthodes sont les 15 stations de la ligne. Tube de verre à six
 * guichets adapté au contenu (familles de méthodes) : identifier → déviations → questionner → arbres → systèmes →
 * quantifier ; la capsule file d'un guichet à l'autre et chaque changement de famille passe par une transition
 * (gyrophare ×3, loupe, store vénitien, capsule pneumatique). Entre deux méthodes d'une même famille : « rame plein
 * cadre » (la rame surgit du tunnel et fonce vers la caméra). Chaque méthode s'ouvre sur un rouleau-prisme des 15
 * sigles qui s'arrête net sur la méthode annoncée, sigle déployé mot à mot (initiales soulignées) + traduction
 * manuscrite, puis se replie en badge. Schémas : ligne de métro verticale, escalier où un casque saute de marche en
 * marche, cartes en zigzag. Exemples : photos existantes avec points chauds, roue des mots-guides HAZOP, oscilloscope
 * de déviation, P&ID qui s'emballe, criticité G × F × D en rouleaux, pompe à défaillances, bulles « Et si ? » tapées,
 * chaos → grille SWIFT, tâche découpée en 5, portes logiques ET / OU qui s'allument, arbre d'événements oui / non,
 * nœud papillon vertical, système éclaté MOSAR, chaîne HACCP sur tapis roulant avec scanner, couches LOPA autour d'un
 * réservoir qui se remplit, panache gaussien QRA, facteurs humains en orbite. Intro : barre de recherche qui ouvre la
 * grille des 15 méthodes ; conclusion : terminus, familles regroupées, sélecteur de méthode, coches du spectateur.
 * Sous-titres NeoCaptions sur la voix d'origine (transcription locale corrigée), sans musique, bruitage discret.
 */
const IMG = {
  cover: 'hazid-gen/chantier-chimique.jpg',
  c1: 'hazid-gen/chantier-chimique.jpg',
  c2: 'hazop-gen/gazier.jpg',
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
const OUTRO_AT = 1026.0;
export const METHODES_RISQUES_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 51.0, n: '1', title: 'Identifier', s: 'HAZID · APR', c: ORANGE, g: 'identifier', k: 'gyro', lab: 'GUICHET 1 / 6'},
  {at: 168.5, n: '2', title: 'Déviations', s: 'HAZOP · AMDEC', c: BLUE, g: 'déviations', k: 'loupe', lab: 'GUICHET 2 / 6'},
  {at: 300.5, n: '3', title: 'Questionner', s: 'What if · SWIFT · JSA', c: VIO, g: 'questionner', k: 'store', lab: 'GUICHET 3 / 6'},
  {at: 465.8, n: '4', title: 'Arbres', s: 'FTA · ETA · Bow-tie', c: TEAL, g: 'arbres', k: 'tube', lab: 'GUICHET 4 / 6'},
  {at: 654.4, n: '5', title: 'Systèmes', s: 'MOSAR · HACCP · LOPA', c: NAVY, g: 'systèmes', k: 'gyro', lab: 'GUICHET 5 / 6'},
  {at: 814.4, n: '6', title: 'Quantifier', s: 'QRA · HRA · choisir', c: GREEN, g: 'quantifier', k: 'gyro', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 1001.8;
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
  {n: 1, l: 'HAZID — identification des dangers', s: 'HAZID', at: 54.6},
  {n: 2, l: 'APR — analyse préliminaire des risques', s: 'APR', at: 113.7},
  {n: 3, l: 'HAZOP — dangers et opérabilité', s: 'HAZOP', at: 172.1},
  {n: 4, l: 'AMDEC — défaillances et criticité', s: 'AMDEC', at: 242.5},
  {n: 5, l: 'What if — « Et si ? »', s: 'What if', at: 304.1},
  {n: 6, l: 'SWIFT — What if structuré', s: 'SWIFT', at: 352.7},
  {n: 7, l: 'JSA · AST — analyse des tâches', s: 'JSA', at: 404.5},
  {n: 8, l: 'FTA — arbre des défaillances', s: 'FTA', at: 469.4},
  {n: 9, l: 'ETA — arbre des événements', s: 'ETA', at: 531.6},
  {n: 10, l: 'Bow-tie — nœud papillon', s: 'Bow-tie', at: 591.6},
  {n: 11, l: 'MOSAR — analyse systémique', s: 'MOSAR', at: 658.0},
  {n: 12, l: 'HACCP — points critiques', s: 'HACCP', at: 703.1},
  {n: 13, l: 'LOPA — couches de protection', s: 'LOPA', at: 762.5},
  {n: 14, l: 'QRA — évaluation quantitative', s: 'QRA', at: 818.0},
  {n: 15, l: 'HRA — fiabilité humaine', s: 'HRA', at: 870.6},
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
      {STATIONS.map((x, k) => { const on = k <= cur; return <div key={x.n} style={{position: 'absolute', left: sx(k) - 16, top: 20, width: 32, height: 32, borderRadius: 16, background: on ? `radial-gradient(circle at 35% 30%, #DDEBFF, ${BLUE})` : '#fff', border: `4px solid ${on ? INK : '#9FB3CC'}`, boxSizing: 'border-box', color: on ? '#fff' : INK, fontFamily: sansFont, fontWeight: 900, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: k === cur ? `0 0 18px ${BLUE}` : 'none'}}>{x.n}</div>; })}
      {STATIONS.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: sx(k) - 32, width: 64, top: 60, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 12.5, color: k === cur ? BURG : DIM}}>{x.s}</div>)}
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE ANALYSE DES RISQUES · STATION {r.n} / 15</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 820, overflow: 'hidden', clipPath: 'polygon(0 0, 60% 0, 40% 100%, 0 100%)', transform: `scale(${1 + t * 0.02})`}}><Pic src={IMG.c1} ic="danger" w={1080} h={820} pos="30% 50%" /></div>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 820, overflow: 'hidden', clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 40% 100%)', transform: `scale(${1 + t * 0.02})`}}><Pic src={IMG.c2} ic="usine" w={1080} h={820} pos="70% 40%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 24%, ${PAPER}CC 32%, ${PAPER} 37%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 26}}><PhotoLetterAnim ch="15" src={IMG.c2} size={300} ls={4} seed={3} /></Abs>
      <Abs x={0} y={850} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="MÉTHODES" src={IMG.c1} size={150} ls={2} seed={6} /></Abs>
      <Abs x={0} y={1025} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb(NBK, 6), color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 50, padding: '6px 26px', transform: `rotate(-3deg) scale(${Math.min(1, spring(t, 0.4))})`}}>d'analyse des <span style={{color: YEL}}>risques</span></div></Abs>
      <Abs x={40} y={1200} w={1000} style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10}}>{[['HAZID', ORANGE], ['HAZOP', BLUE], ['AMDEC', VIO], ['BOW-TIE', TEAL], ['LOPA', NAVY], ['QRA', GREEN]].map(([n, c], k) => <div key={n} style={{...nb(c, 4), padding: '6px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', transform: `translateY(${(1 - Math.min(1, spring(t, 0.3 + k * 0.08))) * 60}px)`}}>{n}</div>)}</Abs>
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






/* ═════════════ Outils propres à la capsule « 15 méthodes » ═════════════ */
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
              {ic && <F n={ic} size={Math.min(76, gap - 40)} />}
              <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: l.length > 34 ? fs - 6 : fs, color: here ? c : INK, lineHeight: 1.1}}>{l}</span>
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
            {ic && <F n={ic} size={Math.min(64, gh - 34)} />}
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
            {ic && <F n={ic} size={Math.min(80, gh - 40)} />}
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

const wn = (t: number, a: number, b: number, f = 0.35) => prog(t, a, a + f) * (1 - prog(t, b - f, b));
const GH = (props: {x: number; y: number; w: number; h: number; at: number; ic: string; l: string; c: string; fs?: number; sub?: string}) => {
  const t = useT();
  const {x, y, w, h, at, ic, l, c, fs = 34, sub} = props;
  if (t < at - 0.05) return null;
  const q = sp(t, at);
  return (
    <Abs x={x} y={y} w={w} h={h} style={{...nb('#fff', 6), borderColor: c, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, transform: `scale(${0.6 + 0.4 * q}) translateY(${(1 - q) * 40}px)`, opacity: cl(q * 1.4), textAlign: 'center', padding: 10}}>
      <F n={ic} size={Math.min(110, h * 0.45)} />
      <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: fs, color: INK, lineHeight: 1.05}}>{l}</div>
      {sub && <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: fs * 0.6, color: DIM}}>{sub}</div>}
    </Abs>
  );
};

/* ═════════════ INTRO ═════════════ */
const Intro1: React.FC = () => {
  const t = useT();
  const up = prog(t, 9.4, 10.2, easeInOut);
  return (
    <Out end={15.4}>
      <Heads h={[[3.0, ['Introduction'], [0]], [4.4, ['Santé', '·', 'sécurité', '·', 'environnement'], [0, 2, 4]], [9.5, ['Un sujet', 'fondamental'], [1]], [12.3, ['Identifier', '·', 'analyser'], [0, 2]]]} />
      {t < 12.6 && [['coeur', 'Santé', 5.39, RED], ['casque', 'Sécurité', 5.94, ORANGE], ['arbre', 'Environnement', 6.59, GREEN]].map(([ic, l, a, c], k) => (
        <GH key={k} x={60 + k * 330} y={lerp(560, 470, up)} w={300} h={lerp(380, 300, up)} at={a as number} ic={ic as string} l={l as string} c={c as string} fs={l === 'Environnement' ? 30 : 38} />
      ))}
      {t > 10.2 && t < 12.6 && <Abs x={140} y={900} w={800} h={260} style={{...nb(NBK, 8), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, opacity: pop(t, 10.2) * (1 - prog(t, 12.3, 12.6)), transform: `rotate(-2deg) scale(${Math.min(1, sp(t, 10.2))})`}}><F n="agent-hse" size={150} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: '#fff', lineHeight: 1}}>professionnel<br /><span style={{color: YEL}}>QHSE</span></div></Abs>}
      {t > 12.3 && <>
        <Abs x={60} y={520} w={960} h={520} style={{...nb('#fff', 9), borderColor: NBK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: pop(t, 12.3), transform: `scale(${0.9 + 0.1 * Math.min(1, sp(t, 12.3))})`}}>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 6, color: DIM}}>LES MÉTHODES</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: INK, textAlign: 'center', lineHeight: 1.05}}>d'<span style={{color: ORANGE}}>identification</span><br />et d'<span style={{color: BLUE}}>analyse</span></div>
          <div style={{fontFamily: handFont, fontSize: 72, color: RED, opacity: pop(t, 14.3)}}>des risques</div>
        </Abs>
        <LoupeSweep x0={140} y0={640} x1={820} y1={820} a={12.6} b={15.2} size={190} />
      </>}
    </Out>
  );
};

const Intro2: React.FC = () => {
  const t = useT();
  return (
    <Out end={24.15}>
      <Heads h={[[15.4, ['Prévenir', 'les accidents'], [1]], [18.0, ['Pas', 'simplement'], [1]], [20.0, ['Porter', 'des EPI'], [1]], [22.0, ['Installer', 'des panneaux'], [1]]]} />
      {t < 20.0 && <Abs x={190} y={560} w={700} h={560} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 15.5)}}>
        <div style={{position: 'absolute', inset: 40, borderRadius: '50%', background: `radial-gradient(circle, ${RED}33, transparent 70%)`, transform: `scale(${1 + 0.08 * Math.sin(t * 6)})`}} />
        <F n="ambulance" size={300} />
        {t > 18.0 && <div style={{position: 'absolute', bottom: 10}}><NBadge at={18.0} text="PAS SIMPLEMENT…" bg={NBK} rot={-3} size={36} /></div>}
      </Abs>}
      {t > 19.9 && <Photo src="epi/epi-panoplie.jpg" x={60} y={480} w={960} h={420} at={20.0} c={BLUE} tag="ÉQUIPEMENTS DE PROTECTION" />}
      {t > 21.9 && <Photo src="epi/signalisation.jpg" x={60} y={930} w={960} h={420} at={22.0} c={ORANGE} tag="PANNEAUX DE SIGNALISATION" pos="50% 30%" />}
      {t > 23.0 && <Abs x={60} y={480} w={960} h={870} style={{pointerEvents: 'none'}}>
        <svg width={960} height={870}><line x1={40} y1={40} x2={920} y2={830} stroke={RED} strokeWidth={22} strokeLinecap="round" pathLength={1} strokeDasharray={`${prog(t, 23.0, 23.4, easeOut)} 1`} /><line x1={920} y1={40} x2={40} y2={830} stroke={RED} strokeWidth={22} strokeLinecap="round" pathLength={1} strokeDasharray={`${prog(t, 23.2, 23.6, easeOut)} 1`} /></svg>
      </Abs>}
    </Out>
  );
};

const Intro3: React.FC = () => (
  <Out end={32.7}>
    <Heads h={[[24.2, ['Avant', 'tout'], [1]], [25.6, ['Identifier', 'les dangers'], [0]], [26.4, ['Comprendre'], [0]], [28.3, ['Analyser', 'les scénarios'], [0]], [30.1, ['Mesures', 'adaptées'], [0]]]} />
    <ZigSteps c={ORANGE} y={480} h={880} items={[['Identifier les dangers', 25.67, 'loupe'], ['Comprendre les situations dangereuses', 26.4, 'danger'], ["Analyser les scénarios d'accident", 28.31, 'collision'], ['Mesures de prévention adaptées', 30.85, 'bouclier']]} />
  </Out>
);

const Intro4: React.FC = () => {
  const t = useT();
  return (
    <Out end={44.7}>
      <Heads h={[[33.4, ['Plusieurs', 'méthodes'], [1]], [38.2, ['15', 'méthodes'], [0]], [39.7, ['Principe', '·', 'schéma', '·', 'exemple'], [0, 2, 4]]]} />
      <SearchOpen x={60} y={440} w={960} h={940} at={33.0} query="méthodes d'analyse des risques" results={['HAZID · identification des dangers', '15 méthodes · analyse des risques', 'EPI · protection individuelle']} found={1} foundAt={38.17} clickAt={38.7} c={ORANGE}>
        <Grid15 at={39.5} y={24} x={8} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 640, display: 'flex', justifyContent: 'center', gap: 18}}>
          {[['Principe', 'engrenage', 39.75], ['Schéma', 'tableau', 41.35], ['Exemple concret', 'usine', 42.4]].map(([l, ic, a]) => t > (a as number) && <div key={l as string} style={{...nb('#fff', 5), borderColor: ORANGE, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, transform: `scale(${Math.min(1, sp(t, a as number))})`}}><F n={ic as string} size={56} />{l as string}</div>)}
        </div>
      </SearchOpen>
    </Out>
  );
};

const Intro5: React.FC = () => {
  const t = useT();
  const z = 1 + (t - 44.6) * 0.06;
  return (
    <Out end={51.2}>
      <Heads h={[[44.7, ['Quelques', 'minutes'], [1]], [48.0, ['Connaissances', 'essentielles'], [1]]]} />
      <Abs x={60} y={470} w={960} h={880} style={{...nb('#000', 9), overflow: 'hidden', opacity: pop(t, 44.7)}}>
        <Img src={staticFile('metroiso-gen/metro/cabine-tunnel.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${z})`, transformOrigin: '50% 45%'}} />
        {Array.from({length: 16}, (_, j) => { const a = (j / 16) * Math.PI * 2; const r = ((t * 500 + j * 83) % 600); return <div key={j} style={{position: 'absolute', left: 480 + Math.cos(a) * r, top: 380 + Math.sin(a) * r * 0.8, width: 6, height: 40 + r * 0.3, background: '#BFD9FF', opacity: 0.45, transform: `rotate(${(a * 180) / Math.PI + 90}deg)`, transformOrigin: '50% 0'}} />; })}
        <div style={{position: 'absolute', left: 30, top: 30, display: 'flex', alignItems: 'center', gap: 12, ...nb('#fff', 5), padding: '8px 18px'}}><F n="chrono" size={60} /><span style={{fontFamily: MONO, fontWeight: 700, fontSize: 30}}>QUELQUES MINUTES</span></div>
        {t > 48.0 && <div style={{position: 'absolute', left: 0, right: 0, bottom: 60, display: 'flex', justifyContent: 'center'}}><NBadge at={48.0} text="CONNAISSANCES ESSENTIELLES" bg={ORANGE} rot={-2} size={36} /></div>}
      </Abs>
    </Out>
  );
};

/* ═════════════ 01 · HAZID ═════════════ */
const RADAR: [string, number, number][] = [['eclair', -0.9, 0.62], ['feu', 0.3, 0.7], ['vapeur', 1.6, 0.55], ['engrenage', 2.6, 0.75], ['echelle', 3.9, 0.6], ['grue', 5.0, 0.72]];
const M1: React.FC = () => {
  const t = useT();
  const sweep = ((t - 71.7) * 140) % 360;
  return (
    <Out end={113.6}>
      <Heads h={[[54.7, ['Première', 'méthode'], [1]], [56.5, ['HAZID'], [0]], [62.3, ['Identifier', 'systématiquement'], [1]], [66.4, ['Installation', '·', 'activité', '·', 'projet'], [0, 2, 4]], [71.7, ['Examiner', 'le système'], [0]], [75.9, ['Sources', 'de danger'], [0]], [80.3, ['Le', 'schéma'], [1]], [82.6, ['Activité'], [0]], [84.3, ['Sources', 'de danger'], [0]], [86.6, ['Scénarios'], [0]], [88.9, ['Mesures', 'de maîtrise'], [0]], [91.2, ['Exemple', 'concret'], [1]], [93.3, ['Nouvelle', 'unité chimique'], [1]], [98.1, ['Étude', 'HAZID'], [1]], [101.6, ['Risques', 'repérés'], [0]], [110.4, ['Dès la', 'conception'], [1]]]} />
      <Announce n={1} at={54.7} end={62.2} en={[['[Haz]ard', 56.9], ['[Id]entification', 57.7]]} fr="identification des dangers" frAt={60.0} />
      <MBadge n={1} from={62.0} />
      {t > 62.2 && t < 71.8 && <>
        {[['usine', 'Installation', 67.22], ['outils', 'Activité', 68.35], ['dossier', 'Projet', 68.94], ['chantier', 'Environnement de travail', 69.52]].map(([ic, l, a], k) => <GH key={k} x={60 + (k % 2) * 490} y={480 + Math.floor(k / 2) * 420} w={470} h={390} at={a as number} ic={ic as string} l={l as string} c={ORANGE} fs={(l as string).length > 14 ? 32 : 40} />)}
        {t > 64.2 && t < 66.5 && <Abs x={60} y={600} w={960} h={420} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: wn(t, 64.2, 66.5)}}><div style={{fontFamily: handFont, fontSize: 96, color: ORANGE, transform: 'rotate(-4deg)'}}>systématiquement</div></Abs>}
        {t > 69.9 && <div style={{position: 'absolute', left: 60, top: lerp(470, 1320, prog(t, 69.9, 71.5, easeInOut)), width: 960, height: 10, background: ORANGE, boxShadow: `0 0 30px ${ORANGE}`, opacity: 1 - prog(t, 71.4, 71.7)}} />}
      </>}
      {t > 71.6 && t < 80.4 && <Abs x={140} y={470} w={800} h={800} style={{opacity: wn(t, 71.6, 80.4)}}>
        <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, #0E2A1E, #06140E)', border: `10px solid ${NBK}`, boxShadow: `10px 10px 0 ${ORANGE}`, overflow: 'hidden'}}>
          {[0.25, 0.5, 0.75].map((r) => <div key={r} style={{position: 'absolute', left: 400 - 390 * r, top: 400 - 390 * r, width: 780 * r, height: 780 * r, borderRadius: '50%', border: '2px solid #2FAE6A55'}} />)}
          <div style={{position: 'absolute', inset: 0, background: `conic-gradient(from ${sweep}deg, rgba(60,220,130,0.45) 0deg, transparent 50deg, transparent 360deg)`}} />
        </div>
        {RADAR.map(([ic, a, r], k) => { const x = 400 + Math.cos(a) * r * 360; const y = 400 + Math.sin(a) * r * 360; const deg = ((((a * 180) / Math.PI) % 360) + 360 + 90) % 360; const seen = t > 75.9 && ((sweep - deg + 360) % 360 < 60); const hot = t > 75.9 + k * 0.25; return <div key={k} style={{position: 'absolute', left: x - 50, top: y - 50, width: 100, height: 100, borderRadius: 50, background: hot ? `${RED}DD` : '#1C3A2A', border: `4px solid ${hot ? '#fff' : '#2FAE6A'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${seen ? 1.18 : 1})`, boxShadow: hot ? `0 0 30px ${RED}` : 'none', opacity: pop(t, 72.4 + k * 0.3)}}><F n={ic} size={64} /></div>; })}
        {t > 78.3 && <div style={{position: 'absolute', left: 330, top: 330, width: 140, height: 140, borderRadius: 70, background: RED, border: `6px solid #fff`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1.1, sp(t, 78.3) * 1.1) * (1 + 0.06 * Math.sin(t * 12))})`}}><F n="collision" size={96} /></div>}
      </Abs>}
      {t > 75.95 && t < 80.4 && <Abs x={60} y={1290} w={960} style={{display: 'flex', justifyContent: 'center', gap: 16, opacity: 1 - prog(t, 80.0, 80.4)}}><NBadge at={75.95} text="SOURCES DE DANGER" bg={RED} rot={-2} size={30} />{t > 78.3 && <NBadge at={78.3} text="→ ACCIDENT" bg={NBK} rot={2} size={30} />}</Abs>}
      {t > 80.3 && t < 91.3 && <Out end={91.3}><RailSteps c={ORANGE} y={470} h={880} at={80.5} items={[["Identification de l'activité", 82.59, 'clipboard'], ['Identification des sources de danger', 84.31, 'danger'], ['Identification des scénarios dangereux', 86.61, 'collision'], ['Définition des mesures de maîtrise', 88.88, 'bouclier']]} /></Out>}
      {t > 91.2 && <>
        <Photo src="hazid-gen/chantier-chimique.jpg" x={60} y={470} w={560} h={880} at={92.4} c={ORANGE} pos="50% 30%" tag="UNITÉ CHIMIQUE" />
        {t > 96.0 && t < 101.2 && <Abs x={60} y={470} w={560} h={880} style={{borderRadius: 18, overflow: 'hidden', opacity: wn(t, 96.0, 101.2) * 0.85, backgroundImage: 'linear-gradient(#7FB2FF 2px, transparent 2px), linear-gradient(90deg, #7FB2FF 2px, transparent 2px)', backgroundSize: '40px 40px', backgroundColor: 'rgba(16,48,110,0.55)'}}><div style={{position: 'absolute', left: 30, bottom: 30, fontFamily: MONO, fontWeight: 700, fontSize: 26, color: '#fff'}}>AVANT LE DÉMARRAGE DES TRAVAUX</div></Abs>}
        {t > 99.8 && <Stamp at={100.2} text="ÉTUDE HAZID" c={ORANGE} x={640} y={500} rot={-6} size={52} />}
        {[[564, 741, 'Produits chimiques', 104.13, 'eprouvette'], [396, 662, 'Installations électriques', 105.51, 'eclair'], [480, 532, 'Travaux en hauteur', 106.83, 'echelle'], [144, 493, 'Engins de chantier', 107.85, 'grue'], [295, 632, 'Manutention', 109.55, 'colis']].map(([x, y, l, a, ic], k) => <Hot key={k} x={x as number} y={y as number} at={a as number} l={l as string} c={ORANGE} ic={ic as string} dx={640 - (x as number)} dy={640 + k * 130 - (y as number)} />)}
        {t > 110.4 && <Abs x={600} y={1290} w={440} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={110.6} text="DÈS LA CONCEPTION" bg={NBK} rot={-3} size={30} /></Abs>}
      </>}
    </Out>
  );
};

/* ═════════════ 02 · APR ═════════════ */
const M2: React.FC = () => {
  const t = useT();
  const flip = (k: number) => prog(t, [158.69, 159.89, 161.43, 163.26][k] - 0.3, [158.69, 159.89, 161.43, 163.26][k] + 0.2, easeInOut);
  return (
    <Out end={168.6}>
      <Heads h={[[114.6, ['Deuxième', 'méthode'], [1]], [116.0, ['APR'], [0]], [119.0, ['Identifier', '·', 'analyser'], [0, 2]], [123.4, ['Évaluer', '·', 'proposer'], [0, 2]], [126.5, ['Dès les', 'premières phases'], [1]], [128.8, ['Une', 'succession', "d'étapes"], [1, 2]], [138.2, ['Intervention', 'industrielle'], [0]], [144.9, ['Avant', "l'intervention"], [0]], [151.2, ['Électrique', '·', 'mécanique', '·', 'chimique'], [0, 2, 4]], [154.3, ['Énergies', 'résiduelles'], [0]], [155.2, ['Les', 'mesures'], [1]], [166.6, ['Anticiper'], [0]]]} />
      <Announce n={2} at={114.6} end={119.0} en={[['[A]nalyse', 117.2], ['[P]réliminaire', 117.8], ['des', 118.3], ['[R]isques', 118.5]]} />
      <MBadge n={2} from={118.8} />
      {t > 119.0 && t < 128.9 && <Out end={128.9}>
        {[['loupe', 'Identifier les dangers', 120.51], ['danger', 'Analyser les situations', 121.59], ['balance', 'Évaluer les risques', 123.49], ['bouclier', 'Proposer des mesures', 125.01]].map(([ic, l, a], k) => <GH key={k} x={60 + (k % 2) * 490} y={470 + Math.floor(k / 2) * 330} w={470} h={300} at={a as number} ic={ic as string} l={l as string} c={ORANGE} fs={36} />)}
        {t > 126.5 && <Abs x={60} y={1150} w={960} h={190} style={{...nb('#fff', 6), opacity: pop(t, 126.5), overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 30, right: 30, top: 90, height: 24, borderRadius: 12, background: '#E3E8EF', border: `3px solid ${NBK}`}} />
          <div style={{position: 'absolute', left: 30, top: 90, height: 24, width: 260 * prog(t, 126.8, 127.6, easeOut), borderRadius: 12, background: ORANGE, border: `3px solid ${NBK}`}} />
          <div style={{position: 'absolute', left: 40, top: 22, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: ORANGE}}>premières phases</div>
          <div style={{position: 'absolute', right: 40, top: 22, fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: DIM}}>projet · activité</div>
          <div style={{position: 'absolute', left: 260 * prog(t, 126.8, 127.6, easeOut), top: 70}}><F n="pousse" size={60} /></div>
        </Abs>}
      </Out>}
      {t > 128.8 && t < 138.3 && <Out end={138.3}><StairSteps c={ORANGE} y={470} h={880} items={[['Activités', 132.9, 'outils'], ['Dangers', 133.36, 'danger'], ['Situations dangereuses', 133.8, 'collision'], ['Événements redoutés', 135.2, 'feu'], ['Conséquences', 136.13, 'pansement'], ['Mesures de maîtrise', 137.29, 'bouclier']]} /></Out>}
      {t > 138.2 && <>
        <Photo src="apr-gen/consignation-apr.jpg" x={60} y={470} w={500} h={880} at={139.0} c={ORANGE} pos="50% 35%" />
        {t > 144.95 && <Abs x={80} y={1270} w={460} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={144.95} text="AVANT L'INTERVENTION" bg={NBK} rot={-2} size={26} /></Abs>}
        {t > 140.5 && t < 151.4 && <div style={{opacity: 1 - prog(t, 151.0, 151.4)}}>{[['ouvrier', 'Un technicien', 140.9], ['usine', 'Installation industrielle', 142.8], ['clipboard', 'Responsable QHSE · APR', 147.0]].map(([ic, l, a], k) => <GH key={k} x={590} y={470 + k * 222} w={430} h={200} at={a as number} ic={ic as string} l={l as string} c={ORANGE} fs={32} />)}</div>}
        {[['eclair', 'Électriques', 151.55, 'cadenas', 'Consignation'], ['engrenage', 'Mécaniques', 152.11, 'check', 'Absence de tension'], ['eprouvette', 'Chimiques', 152.63, 'casque', 'Équipements adaptés'], ['etincelles', 'Énergies résiduelles', 154.31, 'parchemin', 'Autorisation de travail']].map(([ic, l, a, ic2, l2], k) => {
          if (t < (a as number) - 0.05) return null;
          const f = flip(k);
          const q = sp(t, a as number);
          const back = f > 0.5;
          return <Abs key={k} x={590} y={470 + k * 222} w={430} h={200} style={{perspective: 900}}>
            <div style={{width: '100%', height: '100%', transform: `rotateY(${f * 180 + (back ? 180 : 0)}deg) scale(${0.7 + 0.3 * q})`, ...nb(back ? '#EFFAF3' : '#fff', 6), borderColor: back ? GREEN : RED, display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px', opacity: cl(q * 1.4)}}>
              <F n={back ? (ic2 as string) : (ic as string)} size={84} />
              <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: back ? GREEN : RED}}>{back ? 'MESURE' : 'RISQUE'}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: ((back ? l2 : l) as string).length > 18 ? 30 : 36, color: INK, lineHeight: 1.05}}>{back ? (l2 as string) : (l as string)}</div></div>
            </div>
          </Abs>;
        })}
        {t > 167.9 && <Stamp at={167.9} text="ANTICIPER" c={GREEN} x={250} y={780} rot={-8} size={84} />}
      </>}
    </Out>
  );
};

/* ═════════════ 03 · HAZOP ═════════════ */
const GW: [string, number][] = [['PLUS', 197.86], ['MOINS', 198.0], ['AUCUN', 198.64], ['INVERSE', 198.96], ['AUTRE QUE', 199.98]];
const M3: React.FC = () => {
  const t = useT();
  const gi = GW.reduce((a, x, k) => (t >= x[1] ? k : a), -1);
  const wheelA = gi < 0 ? (t - 195.4) * 300 : -(gi * 72 + 36) + 720 + (1 - prog(t, GW[gi][1], GW[gi][1] + 0.3, easeOut)) * 40;
  const fast = t >= 220.72;
  const flowSp = fast ? 3.2 : 1;
  const ph = t < 220.72 ? (t - 211) * 0.25 : (220.72 - 211) * 0.25 + (t - 220.72) * 0.25 * flowSp;
  const needle = lerp(-40, 55, prog(t, 220.72, 221.6, easeOut));
  const valve = prog(t, 227.53, 228.3, easeInOut);
  const shake = t > 231.3 && t < 233.9 ? Math.sin(t * 50) * 4 : 0;
  return (
    <Out end={242.3}>
      <Heads h={[[172.2, ['Troisième', 'méthode'], [1]], [174.9, ['HAZOP'], [0]], [180.8, ['Industries', 'de procédés'], [1]], [188.9, ['Les', 'déviations'], [1]], [192.1, ['Fonctionnement', 'normal'], [1]], [195.2, ['Les', 'mots-guides'], [1]], [200.5, ['Le', 'schéma'], [1]], [203.6, ['Paramètre', '+', 'mot-guide'], [0, 2]], [205.6, ['=', 'déviation'], [1]], [207.1, ['Causes', '·', 'conséquences'], [0, 2]], [209.5, ['Protection'], [0]], [211.3, ['Exemple', 'usine chimique'], [1]], [215.2, ['Canalisation', '→', 'réacteur'], [0, 2]], [218.2, ['Débit', 'supérieur', 'à la normale'], [0, 1]], [222.5, ['Les', 'causes'], [1]], [229.4, ['Conséquences'], [0]], [232.7, ['Dispositifs', 'de protection'], [0]], [235.6, ['Anticiper'], [0]]]} />
      <Announce n={3} at={172.2} end={180.7} en={[['[Haz]ard', 175.6], ['and', 175.9], ['[Op]erability', 176.1], ['Study', 176.6]]} fr="analyse des dangers et de l'opérabilité" frAt={177.5} />
      <MBadge n={3} from={180.5} />
      {t > 180.7 && t < 189.0 && <Out end={189.0}>
        {[['smi/raffinerie.jpg', 'Pétroliers', 185.6], ['hazop-gen/gazier.jpg', 'Gaziers', 186.16], ['hazid-gen/chantier-chimique.jpg', 'Chimiques', 186.58], ['hazop-gen/pharmaceutique.jpg', 'Pharmaceutiques', 187.19]].map(([src, l, a], k) => {
          const f = prog(t, (a as number) - 0.2, (a as number) + 0.3, easeOut);
          return <Abs key={k} x={60 + (k % 2) * 490} y={480 + Math.floor(k / 2) * 430} w={470} h={400} style={{perspective: 1000}}>
            <div style={{width: '100%', height: '100%', transform: `rotateY(${(1 - f) * 90}deg)`, ...nb('#fff', 6), overflow: 'hidden', opacity: f > 0.02 ? 1 : 0}}>
              <Img src={PH(src as string)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              <div style={{position: 'absolute', left: 14, bottom: 14, ...nb(BLUE, 4), color: '#fff', padding: '4px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 32}}>{l as string}</div>
            </div>
          </Abs>;
        })}
        {t > 181.6 && t < 185.6 && <Abs x={60} y={700} w={960} style={{textAlign: 'center', opacity: wn(t, 181.6, 185.6)}}><div style={{display: 'inline-block', ...nb(NBK, 8), color: '#fff', padding: '18px 36px', fontFamily: sansFont, fontWeight: 900, fontSize: 64}}>industries de <span style={{color: YEL}}>procédés</span></div></Abs>}
      </Out>}
      {t > 188.9 && t < 195.3 && <Out end={195.3}>
        <Abs x={60} y={500} w={960} h={620} style={{...nb('#06141A', 8), overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 220, height: 180, background: 'rgba(47,174,106,0.18)', borderTop: '3px dashed #2FAE6A', borderBottom: '3px dashed #2FAE6A'}} />
          <div style={{position: 'absolute', left: 20, top: 180, fontFamily: MONO, fontWeight: 700, fontSize: 24, color: '#5FE0A0'}}>FONCTIONNEMENT NORMAL</div>
          <svg width={960} height={620} style={{position: 'absolute', left: 0, top: 0}}>
            <polyline fill="none" stroke={t > 190.47 ? '#FF6B5E' : '#5FE0A0'} strokeWidth={7} points={Array.from({length: 97}, (_, k) => { const x = k * 10; const u = x / 960; const dev = t > 190.47 ? Math.max(0, (u - 0.55) * 2.2) * prog(t, 190.47, 191.5, easeOut) : 0; return `${x},${310 + Math.sin(x * 0.03 - t * 6) * 50 - dev * 330}`; }).join(' ')} />
          </svg>
          {t > 190.47 && <div style={{position: 'absolute', right: 30, top: 40}}><NBadge at={190.6} text="DÉVIATION" bg={RED} rot={3} size={38} /></div>}
        </Abs>
      </Out>}
      {t > 195.2 && t < 203.7 && <Out end={203.7}>
        <Abs x={190} y={480} w={700} h={700}>
          <div style={{position: 'absolute', inset: 0, borderRadius: '50%', border: `10px solid ${NBK}`, boxShadow: `10px 10px 0 ${BLUE}`, overflow: 'hidden', transform: `rotate(${wheelA}deg)`, background: `conic-gradient(${[BLUE, ORANGE, RED, VIO, TEAL].map((c, k) => `${c} ${k * 72}deg ${(k + 1) * 72}deg`).join(', ')})`}}>
            {GW.map(([w], k) => <div key={k} style={{position: 'absolute', left: 350, top: 350, width: 0, height: 0, transform: `rotate(${k * 72 + 36}deg)`}}><div style={{position: 'absolute', left: -130, top: -300, width: 260, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: w.length > 6 ? 40 : 50, color: '#fff', textShadow: `3px 3px 0 ${NBK}`}}>{w}</div></div>)}
          </div>
          <div style={{position: 'absolute', left: 300, top: 300, width: 100, height: 100, borderRadius: 50, background: '#fff', border: `8px solid ${NBK}`}} />
          <div style={{position: 'absolute', left: 320, top: -40, width: 0, height: 0, borderLeft: '30px solid transparent', borderRight: '30px solid transparent', borderTop: `70px solid ${YEL}`, filter: `drop-shadow(3px 3px 0 ${NBK})`}} />
        </Abs>
        {gi >= 0 && <Abs x={60} y={1210} w={960} style={{textAlign: 'center'}}><div key={gi} style={{display: 'inline-block', ...nb(NBK, 6), color: '#fff', padding: '10px 34px', fontFamily: sansFont, fontWeight: 900, fontSize: 70, transform: `scale(${Math.min(1, sp(t, GW[gi][1], 10, 18))})`}}>{GW[gi][0]}</div></Abs>}
      </Out>}
      {t > 200.5 && t < 211.4 && <Out end={211.4}>
        <Abs x={60} y={490} w={960} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14}}>
          {[['PARAMÈTRE', 203.62, BLUE], ['+', 204.6, NBK], ['MOT-GUIDE', 205.04, ORANGE], ['=', 205.4, NBK], ['DÉVIATION', 205.63, RED]].map(([l, a, c], k) => t > (a as number) && <div key={k} style={{...(l === '+' || l === '=' ? {} : nb(c as string, 6)), color: l === '+' || l === '=' ? NBK : '#fff', padding: l === '+' || l === '=' ? 0 : '14px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: l === '+' || l === '=' ? 70 : 34, transform: `scale(${Math.min(1, sp(t, a as number))})`}}>{l as string}</div>)}
        </Abs>
        <svg width={1080} height={400} style={{position: 'absolute', left: 0, top: 640}}>{[200, 540, 880].map((x, k) => <path key={k} d={`M 540 10 C 540 120, ${x} 120, ${x} 230`} fill="none" stroke={NBK} strokeWidth={8} pathLength={1} strokeDasharray={`${prog(t, [207.1, 208.51, 209.5][k] - 0.4, [207.1, 208.51, 209.5][k], easeOut)} 1`} />)}</svg>
        {[['question', 'Causes possibles', 207.1], ['feu', 'Conséquences', 208.51], ['bouclier', 'Mesures de protection', 209.5]].map(([ic, l, a], k) => <GH key={k} x={60 + k * 330} y={880} w={300} h={380} at={a as number} ic={ic as string} l={l as string} c={BLUE} fs={32} />)}
      </Out>}
      {t > 211.3 && <Abs x={60} y={470} w={960} h={880} style={{...nb('#F3F7FB', 8), overflow: 'hidden', opacity: pop(t, 211.4), transform: `translateX(${shake}px)`}}>
        <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#DDE7F1 2px, transparent 2px), linear-gradient(90deg, #DDE7F1 2px, transparent 2px)', backgroundSize: '40px 40px'}} />
        <svg width={960} height={880} style={{position: 'absolute', left: 0, top: 0}}>
          <rect x={60} y={230} width={200} height={300} rx={30} fill="#CFE0F3" stroke={NBK} strokeWidth={7} />
          <rect x={66} y={330} width={188} height={194} rx={24} fill={ORANGE} opacity={0.75} />
          <path d="M 260 430 L 700 430" stroke={NBK} strokeWidth={34} strokeLinecap="round" />
          <path d="M 260 430 L 700 430" stroke="#9FB7CF" strokeWidth={22} strokeLinecap="round" />
          {Array.from({length: 12}, (_, k) => { const u = (((k / 12) + ph) % 1); return <circle key={k} cx={270 + u * 420} cy={430} r={8} fill={fast ? RED : ORANGE} />; })}
          <g transform="translate(430 430)"><path d="M -40 -34 L 40 34 L 40 -34 L -40 34 Z" fill={valve > 0 ? YEL : '#fff'} stroke={NBK} strokeWidth={6} /><g transform={`rotate(${valve * 80})`}><rect x={-6} y={-90} width={12} height={56} fill={NBK} /><rect x={-40} y={-100} width={80} height={16} rx={8} fill={RED} stroke={NBK} strokeWidth={4} /></g></g>
          <rect x={700} y={180} width={200} height={420} rx={90} fill="#E5ECF5" stroke={NBK} strokeWidth={7} />
          <rect x={708} y={lerp(420, 230, prog(t, 229.4, 233.0, easeInOut))} width={184} height={lerp(170, 360, prog(t, 229.4, 233.0, easeInOut))} rx={60} fill={ORANGE} opacity={0.75} />
          <g transform="translate(560 250)"><rect x={-80} y={-50} width={160} height={100} rx={14} fill={t > 226.73 && Math.floor(t * 4) % 2 ? RED : '#fff'} stroke={NBK} strokeWidth={6} /><text y={14} textAnchor="middle" fontFamily="DejaVu Sans Mono, monospace" fontWeight={700} fontSize={34} fill={NBK}>RÉGUL.</text><line x1={0} y1={50} x2={0} y2={150} stroke={NBK} strokeWidth={5} strokeDasharray="10 8" /></g>
          <g transform="translate(480 720)"><circle r={110} fill="#fff" stroke={NBK} strokeWidth={7} /><path d="M -90 0 A 90 90 0 0 1 90 0" fill="none" stroke={GREEN} strokeWidth={16} /><path d="M 50 -75 A 90 90 0 0 1 90 0" fill="none" stroke={RED} strokeWidth={16} /><g transform={`rotate(${needle})`}><line x1={0} y1={0} x2={0} y2={-88} stroke={NBK} strokeWidth={8} strokeLinecap="round" /></g><circle r={14} fill={NBK} /><text y={60} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={30} fill={NBK}>DÉBIT</text></g>
          <text x={160} y={590} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={28} fill={NBK}>LIQUIDE</text>
          <text x={800} y={650} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={28} fill={NBK}>RÉACTEUR</text>
          {t > 231.3 && <circle cx={800} cy={390} r={140 + 20 * Math.sin(t * 10)} fill={RED} opacity={0.18} />}
        </svg>
        {t > 220.72 && <div style={{position: 'absolute', left: 620, top: 700}}><NBadge at={220.8} text="PLUS + DÉBIT" bg={RED} rot={-3} size={30} /></div>}
        {t > 226.73 && <div style={{position: 'absolute', left: 430, top: 110}}><NBadge at={226.8} text="DÉFAILLANCE RÉGULATION" bg={NBK} rot={2} size={24} /></div>}
        {t > 227.53 && <div style={{position: 'absolute', left: 290, top: 500}}><NBadge at={227.6} text="VANNE TROP OUVERTE" bg={NBK} rot={-2} size={24} /></div>}
        {t > 233.94 && <div style={{position: 'absolute', left: 90, top: 70, display: 'flex', alignItems: 'center', gap: 6, transform: `scale(${Math.min(1, sp(t, 233.94))})`}}><F n="bouclier" size={120} /></div>}
        {t > 233.94 && <div style={{position: 'absolute', left: 560, top: 820, transform: 'translateY(-100%)'}}><NBadge at={234.0} text="PROTECTION ADAPTÉE" bg={GREEN} rot={2} size={26} /></div>}
      </Abs>}
      {t > 235.6 && <Stamp at={237.2} text="ANTICIPER" c={BLUE} x={260} y={1150} rot={-6} size={70} />}
    </Out>
  );
};

/* ═════════════ 04 · AMDEC ═════════════ */
const BARS = [0.42, 0.88, 0.25, 0.66, 0.53];
const M4: React.FC = () => {
  const t = useT();
  const srt = prog(t, 257.6, 258.8, easeInOut);
  const order = [...BARS.keys()].sort((a, b) => BARS[b] - BARS[a]);
  const toFail = prog(t, 291.0, 291.8, easeInOut);
  return (
    <Out end={300.4}>
      <Heads h={[[242.9, ['4e', 'méthode'], [1]], [243.5, ['AMDEC'], [0]], [250.1, ['Défaillances', 'potentielles'], [0]], [253.4, ['Équipement', '·', 'produit', '·', 'processus'], [0, 2, 4]], [255.8, ['Effets'], [0]], [257.3, ['Hiérarchiser'], [0]], [259.9, ['Son', 'principe'], [1]], [266.9, ['Cotation'], [0]], [270.7, ['Gravité', '×', 'fréquence', '×', 'détectabilité'], [0, 2, 4]], [274.6, ['Exemple', 'concret'], [1]], [278.1, ['Pompe', 'industrielle'], [1]], [281.5, ['Défaillances', 'possibles'], [0]], [287.8, ['Conséquences'], [0]], [291.2, ['Actions', 'prioritaires'], [0, 1]], [297.5, ['Anticiper'], [0]]]} />
      <Announce n={4} at={242.9} end={250.0} en={[['[A]nalyse', 245.3], ['des', 246.1], ['[M]odes', 246.3], ['de', 246.7], ['[D]éfaillance,', 246.9], ['de leurs', 247.4], ['[E]ffets', 247.84], ['et de leur', 248.3], ['[C]riticité', 248.9]]} />
      <MBadge n={4} from={249.8} />
      {t > 250.0 && t < 260.0 && <Out end={260.0}>
        {[['engrenage', 'Équipement', 253.39], ['colis', 'Produit', 254.15], ['usine', 'Processus', 255.29]].map(([ic, l, a], k) => <GH key={k} x={60 + k * 330} y={470} w={300} h={270} at={a as number} ic={ic as string} l={l as string} c={BLUE} fs={36} />)}
        {t > 250.6 && t < 253.4 && <Abs x={60} y={520} w={960} style={{textAlign: 'center', opacity: wn(t, 250.6, 253.4)}}><div style={{display: 'inline-flex', alignItems: 'center', gap: 16, ...nb('#fff', 7), borderColor: RED, padding: '14px 26px'}}><F n="chaine-cassee" size={100} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 50}}>défaillances <span style={{color: RED}}>potentielles</span></span></div></Abs>}
        {t > 255.8 && <Abs x={60} y={790} w={960} h={540} style={{...nb('#fff', 7), opacity: pop(t, 255.8)}}>
          <div style={{position: 'absolute', left: 24, top: 16, fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM}}>{t > 257.4 ? 'HIÉRARCHISER LES RISQUES' : 'ÉTUDIER LES EFFETS'}</div>
          {BARS.map((v, k) => { const r = order.indexOf(k); const x = lerp(60 + k * 175, 60 + r * 175, srt); const hh = 380 * v * prog(t, 256.0 + k * 0.1, 256.6 + k * 0.1, easeOut); return <div key={k} style={{position: 'absolute', left: x, bottom: 40, width: 130, height: hh, background: hexMix(BLUE, RED, v), border: `4px solid ${NBK}`, borderRadius: '12px 12px 0 0', boxShadow: r === 0 && srt > 0.9 ? `0 0 30px ${RED}` : 'none'}} />; })}
          {srt > 0.9 && <div style={{position: 'absolute', left: 40, top: 70}}><NBadge at={258.8} text="PRIORITÉ" bg={RED} rot={-4} size={28} /></div>}
        </Abs>}
      </Out>}
      {t > 259.9 && t < 267.0 && <Out end={267.0}><RailSteps c={BLUE} y={470} h={880} at={260.0} items={[['Mode de défaillance', 261.62, 'chaine-cassee'], ['Rechercher ses causes', 262.99, 'question'], ['Analyser ses effets', 264.39, 'collision'], ['Évaluer sa criticité', 265.4, 'danger']]} /></Out>}
      {t > 266.9 && t < 274.7 && <Out end={274.7}>
        <Abs x={60} y={480} w={960} style={{textAlign: 'center', opacity: pop(t, 267.0)}}><div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 4, color: '#fff', background: NBK, padding: '8px 20px', borderRadius: 10}}>SELON LA COTATION RETENUE</div></Abs>
        {[['G', 'Gravité', 271.26, RED], ['F', 'Fréquence', 271.87, ORANGE], ['D', 'Détectabilité', 273.7, VIO]].map(([L, l, a, c], k) => { const q = sp(t, (a as number) - 0.15, 9, 16); return t > (a as number) - 0.15 && <Abs key={k} x={60 + k * 330} y={600} w={300} h={420} style={{...nb(c as string, 8), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `translateY(${(1 - Math.min(1, q)) * -500}px)`, color: '#fff'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 200, lineHeight: 1}}>{L as string}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34}}>{l as string}</div></Abs>; })}
        {[1, 2].map((k) => t > [271.87, 273.7][k - 1] && <Abs key={k} x={60 + k * 330 - 30} y={760} w={0} style={{fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: NBK, transform: 'translateX(-50%)'}}>×</Abs>)}
        {t > 273.9 && <Abs x={60} y={1080} w={960} style={{textAlign: 'center'}}><div style={{display: 'inline-block', ...nb(NBK, 8), color: '#fff', padding: '14px 40px', fontFamily: sansFont, fontWeight: 900, fontSize: 64, transform: `scale(${Math.min(1, sp(t, 273.9))})`}}>= <span style={{color: YEL}}>CRITICITÉ</span></div></Abs>}
      </Out>}
      {t > 274.6 && <>
        <Photo src="amdec-gen/pompe-maintenance.jpg" x={60} y={470} w={960} h={lerp(560, 380, toFail)} at={276.0} c={BLUE} pos="50% 40%" tag="ÉQUIPE DE MAINTENANCE" />
        {[['goutte', 'Fuite', 284.61], ['chaud', 'Surchauffe', 285.19], ['engrenage', 'Usure de roulement', 285.71], ['eclair', 'Panne du moteur', 287.12]].map(([ic, l, a], k) => {
          if (t < (a as number) - 0.05) return null;
          const q = sp(t, a as number);
          const x = lerp(60 + k * 245, 80 + k * 240, toFail), y = lerp(1060, 870, toFail), w = lerp(225, 220, toFail), h = lerp(280, 150, toFail);
          const wob = l === 'Usure de roulement' ? Math.sin(t * 30) * 6 : 0;
          return <Abs key={k} x={x} y={y} w={w} h={h} style={{...nb('#fff', 5), borderColor: RED, display: 'flex', flexDirection: toFail > 0.5 ? 'row' : 'column', alignItems: 'center', justifyContent: 'center', gap: 8, transform: `scale(${0.6 + 0.4 * q})`, opacity: cl(q * 1.4), padding: 8, textAlign: 'center'}}>
            <div style={{transform: `rotate(${wob}deg) translateY(${l === 'Fuite' ? ((t * 60) % 20) : 0}px)`, filter: l === 'Surchauffe' ? `drop-shadow(0 0 ${10 + 8 * Math.sin(t * 9)}px ${RED})` : undefined}}><F n={ic as string} size={toFail > 0.5 ? 54 : 100} /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: toFail > 0.5 ? 22 : 28, color: INK, lineHeight: 1.05}}>{l as string}</div>
          </Abs>;
        })}
        {t > 288.0 && t < 291.3 && <Abs x={60} y={1360} w={960} style={{display: 'flex', justifyContent: 'center', opacity: wn(t, 288.0, 291.3)}}><NBadge at={289.2} text="CONSÉQUENCES ÉVALUÉES" bg={NBK} rot={-2} size={26} /></Abs>}
        {[['calendrier', 'Contrôle périodique', 293.55], ['outils', 'Maintenance préventive', 294.52], ['boulon', 'Remplacement de pièces', 296.13]].map(([ic, l, a], k) => <GH key={k} x={60 + k * 330} y={1050} w={300} h={290} at={a as number} ic={ic as string} l={l as string} c={GREEN} fs={30} />)}
        {t > 297.5 && <Stamp at={298.9} text="ANTICIPER" c={BLUE} x={290} y={620} rot={-6} size={76} />}
      </>}
    </Out>
  );
};

/* ═════════════ 05 · WHAT IF ═════════════ */
const M5: React.FC = () => {
  const t = useT();
  const q1 = prog(t, 329.0, 332.0, lin);
  return (
    <Out end={352.6}>
      <Heads h={[[304.2, ['Cinquième', 'méthode'], [1]], [305.0, ['What if'], [0]], [308.1, ['Le', 'questionnement'], [1]], [312.8, ['Situations', 'anormales'], [1]], [314.9, ['Conséquences', 'possibles'], [0]], [317.2, ['Le', 'schéma'], [1]], [324.6, ['Exemple', 'entrepôt'], [1]], [328.8, ['Chariot', 'sans freins ?'], [0]], [332.2, ['Charge', 'qui tombe ?'], [0]], [336.4, ['Piéton', 'en zone engins ?'], [0]], [341.6, ['Conséquences', '·', 'prévention'], [0, 2]], [347.2, ['Questionnement', 'collectif'], [1]]]} />
      <Announce n={5} at={304.2} end={308.0} en={[['What', 305.2], ['if', 305.5]]} fr="« Et si ? »" frAt={306.9} />
      <MBadge n={5} from={307.8} />
      {t > 308.0 && t < 317.3 && <Out end={317.3}>
        <Photo src="swift-gen/et-si-reflexion.jpg" x={250} y={470} w={580} h={880} at={308.3} c={VIO} pos="50% 30%" />
        {Array.from({length: 6}, (_, k) => { const a = t * 0.9 + k * 1.05; return <Abs key={k} x={540 + Math.cos(a) * 470 - 45} y={900 + Math.sin(a) * 380 - 50} w={90} h={100} style={{fontFamily: sansFont, fontWeight: 900, fontSize: 96, color: VIO, textShadow: `4px 4px 0 ${NBK}`, opacity: pop(t, 308.6 + k * 0.15), transform: `rotate(${Math.sin(a) * 20}deg)`}}>?</Abs>; })}
        {t > 312.8 && <Abs x={60} y={1150} w={960} style={{display: 'flex', justifyContent: 'center', gap: 14}}><NBadge at={313.9} text="SITUATIONS ANORMALES" bg={VIO} rot={-3} size={28} />{t > 316.1 && <NBadge at={316.1} text="→ CONSÉQUENCES" bg={NBK} rot={2} size={28} />}</Abs>}
      </Out>}
      {t > 317.2 && t < 324.7 && <Out end={324.7}><ZigSteps c={VIO} y={480} h={860} items={[['Question', 319.82, 'question'], ['Scénario possible', 320.89, 'pensif'], ['Conséquences', 322.19, 'collision'], ['Mesures de prévention', 323.42, 'bouclier']]} /></Out>}
      {t > 324.6 && <>
        <Photo src="whatif-gen/entrepot-chariot.jpg" x={60} y={470} w={960} h={420} at={325.0} c={VIO} pos="50% 55%" tag="ENTREPÔT" />
        <Abs x={60} y={920} w={960} h={430} style={{...nb('#2B2F38', 7), overflow: 'hidden', opacity: pop(t, 327.0)}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 150, height: 150, background: '#3A404C', borderTop: `6px dashed ${YEL}`, borderBottom: `6px dashed ${YEL}`}} />
          {t > 336.4 && <div style={{position: 'absolute', left: 560, top: 150, width: 120, height: 150, backgroundImage: 'repeating-linear-gradient(90deg, #fff 0 18px, transparent 18px 36px)', opacity: 0.9}} />}
          <div style={{position: 'absolute', left: 30, top: 20, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#C9D2DF'}}>VUE DU DESSUS · ZONE DE CIRCULATION</div>
          {(() => {
            let x = 120;
            let rot = 0;
            if (t < 332.2) { x = lerp(80, 760, q1); rot = t > 330.6 ? Math.sin(t * 25) * 6 : 0; }
            else if (t < 336.4) x = 300;
            else x = lerp(40, 470, prog(t, 336.6, 339.6, easeOut));
            return <div style={{position: 'absolute', left: x, top: 172, transform: `rotate(${rot}deg)`}}><Forklift /></div>;
          })()}
          {t < 332.2 && t > 330.6 && <div style={{position: 'absolute', left: 200, top: 280, width: lerp(0, 560, prog(t, 330.6, 332.0)), height: 8, background: '#111', opacity: 0.7}} />}
          {t > 330.6 && t < 332.2 && <div style={{position: 'absolute', left: 860, top: 140, width: 20, height: 170, background: RED, border: `3px solid ${NBK}`}} />}
          {t > 332.2 && t < 336.4 && <div style={{position: 'absolute', left: 420, top: lerp(120, 250, prog(t, 334.3, 334.9, easeIn)) - (t > 334.9 ? Math.abs(Math.sin((t - 334.9) * 9)) * 30 * Math.max(0, 1 - (t - 334.9)) : 0), transform: `rotate(${prog(t, 334.3, 335.1) * 40}deg)`}}><F n="colis" size={90} /></div>}
          {t > 336.4 && <div style={{position: 'absolute', left: 600, top: lerp(330, 160, prog(t, 338.4, 340.4, lin))}}><F n="pas" size={80} /></div>}
          {t > 339.6 && t < 341.6 && <div style={{position: 'absolute', inset: 0, border: `14px solid ${RED}`, opacity: Math.floor(t * 6) % 2 ? 1 : 0.3}} />}
        </Abs>
        {t > 328.8 && t < 341.6 && (() => {
          const qs: [string, number, number][] = [['Que se passerait-il si un chariot élévateur perdait ses freins ?', 328.8, 332.2], ['… si une charge tombait pendant une opération de manutention ?', 332.2, 336.4], ["… si un piéton traversait une zone de circulation d'engins ?", 336.4, 341.6]];
          return qs.map(([q, a, b], k) => t > a && t < b ? <QBubble key={k} at={a} text={q} x={100} y={560} w={880} c={VIO} fs={36} /> : null);
        })()}
        {t > 341.6 && t < 347.3 && <Abs x={60} y={500} w={960} h={360} style={{display: 'flex', flexDirection: 'column', gap: 14, opacity: wn(t, 341.6, 347.3)}}>
          {[['chariot', 'Freins'], ['colis', 'Charge'], ['pas', 'Piéton']].map(([ic, l], k) => <div key={k} style={{display: 'flex', alignItems: 'center', gap: 14, ...nb('#fff', 5), padding: '8px 18px', transform: `translateX(${(1 - Math.min(1, sp(t, 341.8 + k * 0.25))) * -300}px)`}}>{ic === 'chariot' ? <Forklift s={0.45} /> : <F n={ic} size={60} />}<span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, width: 150}}>{l}</span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: RED, opacity: pop(t, 343.7)}}>→ conséquences</span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: GREEN, opacity: pop(t, 344.9)}}>→ prévention</span></div>)}
        </Abs>}
        {t > 347.2 && <Abs x={60} y={500} w={960} h={360} style={{...nb('#fff', 7), borderColor: VIO, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30, opacity: pop(t, 347.2)}}><F n="equipe" size={260} />{[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 300 + k * 160, top: 40 + Math.sin(t * 3 + k) * 14, fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: VIO, opacity: pop(t, 347.6 + k * 0.2)}}>?</div>)}<div style={{position: 'absolute', bottom: 20}}><NBadge at={351.5} text="QUESTIONNEMENT COLLECTIF" bg={VIO} rot={-2} size={28} /></div></Abs>}
      </>}
    </Out>
  );
};

/* ═════════════ 06 · SWIFT ═════════════ */
const NOTES = Array.from({length: 9}, (_, k) => ({x: 80 + ((k * 337) % 820), y: 520 + ((k * 211) % 560), r: ((k * 53) % 50) - 25, c: [YEL, '#FF9FB2', '#9FD8FF', '#B8F2A2'][k % 4], ic: ['question', 'feu', 'vent', 'stock', 'eclair', 'pas', 'chariot', 'goutte', 'danger'][k]}));
const M6: React.FC = () => {
  const t = useT();
  const ord = prog(t, 362.9, 364.3, easeInOut);
  const fan = t < 384.7 ? t * 720 : 384.7 * 720 + Math.max(0, 1 - (t - 384.7) / 1.6) * (t - 384.7) * 720;
  return (
    <Out end={404.3}>
      <Heads h={[[353.1, ['Sixième', 'méthode'], [1]], [354.2, ['SWIFT'], [0]], [360.5, ['Proche', 'du What if'], [0]], [362.9, ['Plus', 'organisée'], [1]], [366.3, ['Le', 'schéma'], [1]], [376.0, ['Exemple', 'nouvel entrepôt'], [1]], [381.3, ['Atelier', 'SWIFT'], [1]], [384.7, ['Ventilation', '?'], [0]], [388.3, ['Stockage', '?'], [0]], [391.7, ['Incendie', '?'], [0]], [396.2, ['Questionnement', 'structuré'], [1]]]} />
      <Announce n={6} at={353.1} end={360.4} en={[['[S]tructured', 354.6], ['[W]hat', 355.1], ['[If]', 355.4], ['[T]echnique', 355.8]]} fr="technique structurée d'analyse par questionnement" frAt={357.0} />
      <MBadge n={6} from={360.2} />
      {t > 360.4 && t < 366.4 && <Out end={366.4}>
        <Abs x={60} y={480} w={960} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb(ord > 0.5 ? VIO : '#fff', 6), color: ord > 0.5 ? '#fff' : VIO, padding: '8px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 40}}>{ord > 0.5 ? 'SWIFT · structuré' : 'What if · libre'}</div></Abs>
        {NOTES.map((n, k) => { const gx = 150 + (k % 3) * 300, gy = 620 + Math.floor(k / 3) * 230; const jit = (1 - ord) * Math.sin(t * 3 + k) * 12; return <Abs key={k} x={lerp(n.x, gx, ord) + jit} y={lerp(n.y, gy, ord)} w={220} h={190} style={{background: n.c, border: `4px solid ${NBK}`, borderRadius: 10, boxShadow: `5px 5px 0 ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${lerp(n.r, 0, ord)}deg) scale(${Math.min(1, sp(t, 360.6 + k * 0.08))})`}}><F n={n.ic} size={100} /></Abs>; })}
        {ord > 0.9 && <svg width={1080} height={760} style={{position: 'absolute', left: 0, top: 600}}>{[0, 1, 2].map((r) => <rect key={r} x={130} y={r * 230 + 8} width={860} height={214} rx={14} fill="none" stroke={VIO} strokeWidth={5} strokeDasharray="14 10" opacity={prog(t, 364.3 + r * 0.15, 364.8 + r * 0.15)} />)}</svg>}
      </Out>}
      {t > 366.3 && t < 376.1 && <Out end={376.1}><RailSteps c={VIO} y={470} h={880} at={366.5} items={[['Définition du périmètre', 368.17, 'cible'], ['Question guidée', 369.85, 'question'], ['Identification des scénarios', 371.15, 'loupe'], ['Évaluation des risques', 372.92, 'balance'], ['Définition des mesures de maîtrise', 374.44, 'bouclier']]} /></Out>}
      {t > 376.0 && <>
        <Photo src="swift-gen/atelier-entrepot.jpg" x={60} y={470} w={960} h={520} at={376.4} c={VIO} pos="50% 45%" tag="NOUVEL ENTREPÔT" />
        {t > 381.3 && <Stamp at={382.1} text="ATELIER SWIFT" c={VIO} x={560} y={860} rot={-5} size={46} />}
        <Abs x={60} y={1020} w={960} h={330} style={{...nb('#fff', 7), borderColor: VIO, opacity: pop(t, 383.6), padding: '14px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
          {[['vent', 'Défaillance de la ventilation ?', 384.7], ['stock', 'Mauvaise organisation du stockage ?', 388.3], ['feu', 'Incendie pendant les heures de travail ?', 391.7]].map(([ic, l, a], k) => {
            const on = t > (a as number);
            const ok = t > 399.0 + k * 0.6;
            return <div key={k} style={{display: 'flex', alignItems: 'center', gap: 16, opacity: on ? 1 : 0.15, transform: `translateX(${(1 - Math.min(1, sp(t, a as number))) * 60}px)`}}>
              <div style={{width: 76, height: 76, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: ic === 'vent' ? `rotate(${fan}deg)` : ic === 'stock' && on ? `rotate(${Math.sin(t * 14) * 6}deg)` : `scale(${1 + 0.08 * Math.sin(t * 11)})`}}><F n={ic as string} size={70} /></div>
              <div style={{flex: 1, fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>{l as string}</div>
              <div style={{width: 56, height: 56, borderRadius: 12, border: `5px solid ${NBK}`, background: ok ? GREEN : '#fff', color: '#fff', fontSize: 36, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${ok ? Math.min(1.1, sp(t, 399.0 + k * 0.6) * 1.1) : 1})`}}>{ok ? '✓' : ''}</div>
            </div>;
          })}
        </Abs>
        {t > 401.3 && <Abs x={60} y={1290} w={960} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={401.3} text="MESURES DE PRÉVENTION" bg={GREEN} rot={-2} size={28} /></Abs>}
      </>}
    </Out>
  );
};

/* ═════════════ 07 · JSA / AST ═════════════ */
const JST: [string, string, number][] = [['clipboard', 'Préparation', 437.35], ['stop', 'Arrêt', 440.06], ['cadenas', 'Consignation', 442.78], ['outils', 'Intervention', 445.76], ['check', 'Remise en service', 447.97]];
const M7: React.FC = () => {
  const t = useT();
  const cut = prog(t, 414.3, 415.2, easeOut);
  const zoom = t > 456.7;
  return (
    <Out end={465.9}>
      <Heads h={[[404.9, ['7e', 'méthode'], [1]], [405.6, ['JSA', 'ou', 'AST'], [0, 2]], [410.9, ['Décomposer', 'une activité'], [0]], [414.3, ['En', 'plusieurs étapes'], [1]], [420.5, ['Le', 'schéma'], [1]], [429.3, ['Exemple', 'maintenance'], [1]], [437.4, ['Préparation'], [0]], [440.1, ['Arrêt'], [0]], [442.8, ['Consignation'], [0]], [445.8, ['Intervention'], [0]], [448.0, ['Remise', 'en service'], [1]], [451.1, ['À chaque', 'étape'], [1]], [456.7, ['Maîtriser', 'les énergies'], [0]], [463.4, ['Travaux', 'à risques'], [0]]]} />
      <Announce n={7} at={404.9} end={410.8} en={[['[J]ob', 406.4], ['[S]afety', 406.9], ['[A]nalysis', 407.4]]} fr="analyse sécuritaire des tâches" frAt={409.6} />
      <MBadge n={7} from={410.6} />
      {t > 410.8 && t < 420.6 && <Out end={420.6}>
        <Abs x={60} y={560} w={960} h={190}>
          {Array.from({length: 5}, (_, k) => <div key={k} style={{position: 'absolute', left: k * 192 + (k - 2) * 26 * cut + 2, top: 0, width: 188, height: 190, background: hexMix(VIO, '#ffffff', 0.15 + k * 0.08), border: `5px solid ${NBK}`, borderRadius: k === 0 ? '24px 0 0 24px' : k === 4 ? '0 24px 24px 0' : 0, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: cut > 0.5 ? 60 : 0, transform: `translateY(${cut > 0 ? Math.sin(k * 1.7) * 14 * cut : 0}px) rotate(${(k - 2) * 2 * cut}deg)`}}>{cut > 0.5 ? k + 1 : ''}</div>)}
          {cut < 0.6 && <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: '#fff', opacity: 1 - cut * 1.6, textShadow: `3px 3px 0 ${NBK}`}}>ACTIVITÉ PROFESSIONNELLE</div>}
          {t > 413.9 && t < 415.3 && <div style={{position: 'absolute', left: lerp(-60, 1000, prog(t, 413.9, 415.2, easeInOut)), top: -60, width: 14, height: 310, background: '#DDE3EA', border: `3px solid ${NBK}`, transform: 'rotate(8deg)', boxShadow: '0 0 20px #fff'}} />}
        </Abs>
        {Array.from({length: 5}, (_, k) => t > 416.2 + k * 0.15 && <Abs key={k} x={60 + k * 192 + (k - 2) * 26 + 50} y={800} w={100} h={100} style={{transform: `scale(${Math.min(1, sp(t, 416.2 + k * 0.15))})`}}><F n="danger" size={92} /></Abs>)}
        {Array.from({length: 5}, (_, k) => t > 418.9 + k * 0.15 && <Abs key={k} x={60 + k * 192 + (k - 2) * 26 + 50} y={940} w={100} h={100} style={{transform: `scale(${Math.min(1, sp(t, 418.9 + k * 0.15))})`}}><F n="bouclier" size={92} /></Abs>)}
        {t > 416.2 && <Abs x={60} y={1090} w={960} style={{display: 'flex', justifyContent: 'center', gap: 16}}><NBadge at={416.2} text="DANGERS À CHAQUE ÉTAPE" bg={RED} rot={-2} size={28} />{t > 418.9 && <NBadge at={418.9} text="MESURES" bg={GREEN} rot={2} size={28} />}</Abs>}
      </Out>}
      {t > 420.5 && t < 429.4 && <Out end={429.4}><ZigSteps c={VIO} y={480} h={860} items={[['Décomposition de la tâche', 422.88, 'ciseaux'], ['Identification des dangers', 424.62, 'danger'], ['Évaluation des risques', 426.5, 'balance'], ['Mesures de prévention', 427.85, 'bouclier']]} /></Out>}
      {t > 429.3 && <>
        {!zoom && <Photo src="jsa-gen/machine-radio.jpg" x={60} y={470} w={960} h={420} at={430.0} c={VIO} pos="50% 50%" tag="MAINTENANCE D'UNE MACHINE" />}
        {zoom && <Photo src="jsa-gen/consignation.jpg" x={60} y={470} w={960} h={420} at={456.8} c={VIO} pos="50% 35%" tag="ÉTAPE 3 · CONSIGNATION" />}
        <Abs x={60} y={920} w={960} h={430} style={{...nb('#fff', 7), borderColor: VIO, opacity: pop(t, 434.0)}}>
          <div style={{position: 'absolute', left: 96, right: 96, top: 92, height: 12, borderRadius: 6, background: '#E3E8EF'}} />
          <div style={{position: 'absolute', left: 96, top: 92, height: 12, borderRadius: 6, background: VIO, width: 768 * cl((JST.reduce((a, x, k) => (t >= x[2] ? k : a), -1)) / 4)}} />
          {JST.map(([ic, l, a], k) => { const on = t >= a; const q = sp(t, a); const big = zoom && k === 2; return <div key={k} style={{position: 'absolute', left: 96 + k * 192 - 70, top: 30, width: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
            <div style={{width: 124, height: 124, borderRadius: 62, background: on ? (big ? RED : '#fff') : '#F1F3F7', border: `6px solid ${on ? VIO : '#C9D2DF'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${on ? 0.8 + 0.2 * Math.min(1, q) : 0.8}) scale(${big ? 1.15 : 1})`, boxShadow: big ? `0 0 30px ${RED}` : 'none'}}><F n={ic} size={70} /></div>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: VIO}}>ÉTAPE {k + 1}</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: on ? INK : '#A9B1BE', textAlign: 'center', lineHeight: 1.05}}>{l}</div>
            {t > 452.6 && <div style={{display: 'flex', gap: 6, marginTop: 6}}><div style={{transform: `scale(${Math.min(1, sp(t, 452.7 + k * 0.12))})`}}><F n="danger" size={44} /></div><div style={{transform: `scale(${Math.min(1, sp(t, 454.6 + k * 0.12))})`}}><F n="bouclier" size={44} /></div></div>}
          </div>; })}
        </Abs>
        {t > 459.1 && <Abs x={60} y={830} w={960} style={{display: 'flex', justifyContent: 'center', gap: 14}}><NBadge at={459.14} text="MAÎTRISER LES ÉNERGIES" bg={RED} rot={-2} size={26} />{t > 460.9 && <NBadge at={460.88} text="VÉRIFIER LA CONSIGNATION" bg={GREEN} rot={2} size={26} />}</Abs>}
        {t > 464.2 && <Stamp at={464.2} text="TRAVAUX À RISQUES" c={VIO} x={190} y={610} rot={-6} size={60} />}
      </>}
    </Out>
  );
};

/* ═════════════ 08 · FTA ═════════════ */
const GateSvg: React.FC<{k: 'ET' | 'OU'; x: number; y: number; s?: number; on?: boolean; c: string}> = ({k, x, y, s = 1, on, c}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {k === 'ET' ? <path d="M -60 50 L -60 -10 A 60 60 0 0 1 60 -10 L 60 50 Z" fill={on ? c : '#fff'} stroke={NBK} strokeWidth={7} /> : <path d="M -62 50 Q 0 20 62 50 Q 62 -30 0 -75 Q -62 -30 -62 50 Z" fill={on ? c : '#fff'} stroke={NBK} strokeWidth={7} />}
    <text y={30} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={36} fill={on ? '#fff' : NBK}>{k}</text>
  </g>
);
const M8: React.FC = () => {
  const t = useT();
  const L = (a: number, d = 0.5) => prog(t, a, a + d, easeOut);
  return (
    <Out end={531.4}>
      <Heads h={[[469.5, ['Huitième', 'méthode'], [1]], [471.7, ['FTA'], [0]], [477.3, ['Rechercher', 'les causes'], [1]], [482.8, ['Événement', 'au sommet'], [0]], [487.6, ['Remonter', 'vers les causes'], [0]], [492.0, ['Deux', 'portes logiques'], [1]], [497.5, ['Porte', 'ET'], [1]], [503.2, ['Porte', 'OU'], [1]], [508.4, ['Exemple', 'local électrique'], [1]], [515.5, ["L'arbre", 'des défaillances'], [1]], [525.6, ['Combinaisons'], [0]]]} />
      <Announce n={8} at={469.5} end={477.2} en={[['[F]ault', 472.0], ['[T]ree', 472.5], ['[A]nalysis', 472.9]]} fr="analyse par arbre des défaillances" frAt={474.2} />
      <MBadge n={8} from={477.0} />
      {t > 477.2 && t < 492.1 && <Out end={492.1}>
        <svg width={1080} height={900} style={{position: 'absolute', left: 0, top: 470}}>
          {[[540, 150, 230, 420], [540, 150, 540, 420], [540, 150, 850, 420]].map(([x1, y1, x2, y2], k) => <path key={k} d={`M ${x1} ${y1} L ${x1} ${(y1 + y2) / 2} L ${x2} ${(y1 + y2) / 2} L ${x2} ${y2}`} fill="none" stroke={NBK} strokeWidth={7} pathLength={1} strokeDasharray={`${L(488.0 + k * 0.25, 0.6)} 1`} />)}
          {[230, 540, 850].flatMap((x, j) => [x - 90, x + 90].map((x2, k) => <path key={`${j}${k}`} d={`M ${x} 500 L ${x} 560 L ${x2} 560 L ${x2} 620`} fill="none" stroke={NBK} strokeWidth={5} pathLength={1} strokeDasharray={`${L(489.4 + j * 0.25 + k * 0.1, 0.5)} 1`} />))}
        </svg>
        <Abs x={290} y={480} w={500} h={140} style={{...nb(RED, 7), color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontFamily: sansFont, fontWeight: 900, fontSize: 36, opacity: pop(t, 480.8), transform: `scale(${t > 484.9 && t < 487.6 ? 1.06 + 0.03 * Math.sin(t * 10) : 1})`}}><F n="feu" size={80} />ÉVÉNEMENT REDOUTÉ</Abs>
        {[230, 540, 850].map((x, k) => <Abs key={k} x={x - 130} y={890} w={260} h={80} style={{...nb('#fff', 5), borderColor: TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, opacity: L(488.5 + k * 0.25)}}>cause</Abs>)}
        {[230, 540, 850].flatMap((x) => [x - 90, x + 90]).map((x, k) => <Abs key={`s${k}`} x={x - 70} y={1090} w={140} h={66} style={{...nb('#fff', 4), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 22, color: DIM, opacity: L(489.8 + k * 0.08)}}>cause</Abs>)}
        {t > 487.6 && <Abs x={lerp(140, 900, prog(t, 489.0, 491.6, easeInOut))} y={lerp(560, 1060, prog(t, 487.8, 489.0, easeInOut))} w={120} h={120}><F n="loupe" size={110} /></Abs>}
        {t > 484.9 && <Abs x={800} y={500} w={240} style={{fontFamily: handFont, fontSize: 44, color: RED, opacity: pop(t, 485.0)}}>← au sommet</Abs>}
      </Out>}
      {t > 492.0 && t < 508.5 && <Out end={508.5}>
        {t < 497.5 && <svg width={1080} height={700} style={{position: 'absolute', left: 0, top: 560}}>
          <g opacity={L(494.44)}><GateSvg k="ET" x={300} y={260} s={2.2} on={t > 494.44} c={TEAL} /></g>
          <g opacity={L(495.78)}><GateSvg k="OU" x={780} y={260} s={2.2} on={t > 495.78} c={ORANGE} /></g>
        </svg>}
        {t >= 497.5 && (() => {
          const isEt = t < 503.2;
          const a0 = isEt ? 497.5 : 503.2;
          const inA = isEt ? t > 498.4 : t > 504.7;
          const inB = isEt ? t > 499.6 : false;
          const out = isEt ? inA && inB && t > 500.4 : inA && t > 506.0;
          const c = isEt ? TEAL : ORANGE;
          return <svg width={1080} height={860} style={{position: 'absolute', left: 0, top: 480, opacity: prog(t, a0, a0 + 0.3)}}>
            <path d="M 540 160 L 540 280" stroke={out ? c : NBK} strokeWidth={out ? 14 : 8} />
            <path d="M 400 640 L 400 520 L 500 520 L 500 470" fill="none" stroke={inA ? c : NBK} strokeWidth={inA ? 14 : 8} />
            <path d="M 680 640 L 680 520 L 580 520 L 580 470" fill="none" stroke={inB ? c : NBK} strokeWidth={inB ? 14 : 8} />
            <GateSvg k={isEt ? 'ET' : 'OU'} x={540} y={385} s={1.9} on={out} c={c} />
            <rect x={340} y={30} width={400} height={130} rx={20} fill={out ? RED : '#fff'} stroke={NBK} strokeWidth={7} />
            <text x={540} y={110} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={34} fill={out ? '#fff' : NBK}>ÉVÉNEMENT</text>
            {[[400, inA, 'A'], [680, inB, 'B']].map(([x, on, l]) => <g key={l as string}><rect x={(x as number) - 110} y={640} width={220} height={120} rx={18} fill={on ? c : '#fff'} stroke={NBK} strokeWidth={6} /><text x={x as number} y={715} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={44} fill={on ? '#fff' : NBK}>{l as string}</text></g>)}
          </svg>;
        })()}
        {t > 500.4 && t < 503.2 && <Abs x={60} y={1290} w={960} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={500.4} text="SIMULTANÉMENT" bg={TEAL} rot={-2} size={30} /></Abs>}
        {t > 506.0 && <Abs x={60} y={1290} w={960} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={506.0} text="INDÉPENDAMMENT" bg={ORANGE} rot={-2} size={30} /></Abs>}
      </Out>}
      {t > 508.4 && <>
        <Abs x={190} y={480} w={700} h={170} style={{...nb(t > 528.4 ? RED : '#fff', 8), borderColor: NBK, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: pop(t, 513.4), padding: '0 20px'}}>
          <div style={{transform: `scale(${t > 528.4 ? 1 + 0.15 * Math.sin(t * 14) : 1})`}}><F n="feu" size={100} /></div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: t > 528.4 ? '#fff' : INK, lineHeight: 1.1}}>Incendie dans un<br />local électrique</div>
        </Abs>
        <svg width={1080} height={700} style={{position: 'absolute', left: 0, top: 650}}>
          {[0, 1, 2, 3].map((k) => { const x = 165 + k * 250; const a = [519.13, 520.59, 521.67, 523.4][k]; const glow = t > 527.15 && Math.floor((t - 527.15) * 2.5) % 2 === k % 2; return <path key={k} d={`M 540 0 L 540 120 L ${x} 120 L ${x} 260`} fill="none" stroke={glow ? RED : NBK} strokeWidth={glow ? 12 : 7} pathLength={1} strokeDasharray={`${L(a - 0.3)} 1`} />; })}
        </svg>
        {[['eclair', 'Courts-circuits', 519.13], ['prise', "Défauts d'isolation", 520.59], ['chaud', 'Surcharges électriques', 521.67], ['bris', 'Défaillances de protection', 523.4]].map(([ic, l, a], k) => <GH key={k} x={60 + k * 250} y={910} w={230} h={320} at={a as number} ic={ic as string} l={l as string} c={TEAL} fs={26} />)}
        {t > 527.15 && <Abs x={60} y={1260} w={960} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={527.15} text="COMBINAISONS DE DÉFAILLANCES" bg={RED} rot={-2} size={28} /></Abs>}
      </>}
    </Out>
  );
};

/* ═════════════ 09 · ETA ═════════════ */
/** Arbre d'événements vertical : initiateur en haut, chaque barrière = une rangée, gauche = OUI (vert), droite = NON (rouge). */
const EtaTree: React.FC<{init: [string, number]; rows: [string, number][]; leafAt: number; okAt?: number; koAt?: number; okL?: string; koL?: string; yes?: string; no?: string}> = ({init, rows, leafAt, okAt = 9999, koAt = 9999, okL, koL, yes = 'oui', no = 'non'}) => {
  const t = useT();
  const X0 = 680, Y0 = 560, DY = 190;
  const nodes: {x: number; y: number; path: number[]}[][] = [[{x: X0, y: Y0, path: []}]];
  rows.forEach((_, r) => { const w = 217 / Math.pow(2, r); nodes.push(nodes[r].flatMap((n) => [0, 1].map((b) => ({x: n.x + (b ? w : -w), y: Y0 + (r + 1) * DY, path: [...n.path, b]})))); });
  const lit = (p: number[]) => (t > okAt && p.every((b) => b === 0) ? GREEN : t > koAt && p.every((b) => b === 1) ? RED : null);
  return (
    <>
      <svg width={1080} height={1000} style={{position: 'absolute', left: 0, top: 0}}>
        {rows.map(([, a], r) => nodes[r].flatMap((n, j) => [0, 1].map((b) => { const ch = nodes[r + 1][j * 2 + b]; const g = lit(ch.path); return <path key={`${r}${j}${b}`} d={`M ${n.x} ${n.y} L ${ch.x} ${ch.y}`} stroke={g || (b ? RED : GREEN)} strokeWidth={g ? 14 : 7} opacity={g ? 1 : 0.85} pathLength={1} strokeDasharray={`${prog(t, a + j * 0.05, a + 0.5 + j * 0.05, easeOut)} 1`} />; })))}
      </svg>
      <Abs x={X0 - 190} y={Y0 - 110} w={380} h={90} style={{...nb(RED, 6), color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontFamily: sansFont, fontWeight: 900, fontSize: 30, opacity: pop(t, init[1])}}><F n="feu" size={56} />{init[0]}</Abs>
      {rows.map(([l, a], r) => <Abs key={r} x={40} y={Y0 + r * DY + 70} w={240} style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, opacity: pop(t, a), lineHeight: 1.05}}>{l}</Abs>)}
      {rows.length > 0 && t > rows[0][1] + 0.3 && <><Abs x={X0 - 217 * 0.6 - 60} y={Y0 + 30} w={120} style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: GREEN, textAlign: 'center'}}>{yes}</Abs><Abs x={X0 + 217 * 0.6 - 60} y={Y0 + 30} w={120} style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: RED, textAlign: 'center'}}>{no}</Abs></>}
      {nodes[rows.length].map((n, k) => { const g = lit(n.path); return <div key={k} style={{position: 'absolute', left: n.x - 22, top: n.y - 22, width: 44, height: 44, borderRadius: 22, background: g || hexMix(GREEN, RED, k / Math.max(1, nodes[rows.length].length - 1)), border: `5px solid ${NBK}`, opacity: pop(t, leafAt + k * 0.06), transform: `scale(${g ? 1.4 : 1})`, boxShadow: g ? `0 0 26px ${g}` : 'none'}} />; })}
      {okL && t > okAt && <Abs x={60} y={Y0 + rows.length * DY + 50} w={420} style={{...nb(GREEN, 5), color: '#fff', padding: '8px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, textAlign: 'center', transform: `scale(${Math.min(1, sp(t, okAt))})`}}>{okL}</Abs>}
      {koL && t > koAt && <Abs x={600} y={Y0 + rows.length * DY + 50} w={420} style={{...nb(RED, 5), color: '#fff', padding: '8px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, textAlign: 'center', transform: `scale(${Math.min(1, sp(t, koAt))})`}}>{koL}</Abs>}
    </>
  );
};
const M9: React.FC = () => {
  const t = useT();
  const fl = prog(t, 543.2, 544.2, easeInOut);
  return (
    <Out end={591.4}>
      <Heads h={[[532.0, ['9e', 'méthode'], [1]], [533.3, ['ETA'], [0]], [538.1, ['FTA', '↔', 'ETA'], [0, 2]], [543.8, ['Part', "de l'initiateur"], [1]], [548.4, ['Le', 'schéma'], [1]], [553.1, ['Succès', 'ou échec'], [0, 1]], [557.1, ['Scénarios', 'finaux'], [1]], [558.4, ['Exemple', 'départ de feu'], [1]], [566.8, ['Le détecteur', '?'], [0]], [570.4, ["L'extinction", '?'], [0]], [573.7, ['Les secours', '?'], [0]], [578.0, ['Maîtrisé', 'ou généralisé'], [0, 1]]]} />
      <Announce n={9} at={532.0} end={538.0} en={[['[E]vent', 534.4], ['[T]ree', 534.7], ['[A]nalysis', 535.0]]} fr="analyse par arbre des événements" frAt={536.5} />
      <MBadge n={9} from={537.8} />
      {t > 538.0 && t < 548.5 && <Out end={548.5}>
        <Abs x={140} y={500} w={800} h={760} style={{perspective: 1600}}>
          <div style={{position: 'absolute', inset: 0, transform: `rotateY(${fl * 180}deg)`, transformStyle: 'preserve-3d'}}>
            <div style={{position: 'absolute', inset: 0, ...nb('#fff', 9), borderColor: TEAL, backfaceVisibility: 'hidden', overflow: 'hidden'}}>
              <div style={{position: 'absolute', left: 24, top: 18, fontFamily: MONO, fontWeight: 700, fontSize: 30, color: TEAL}}>FTA · REMONTE AUX CAUSES</div>
              <svg width={800} height={760}>{[180, 400, 620].map((x, k) => <path key={k} d={`M 400 210 L 400 300 L ${x} 300 L ${x} 420`} fill="none" stroke={NBK} strokeWidth={7} />)}<rect x={250} y={110} width={300} height={100} rx={16} fill={RED} stroke={NBK} strokeWidth={6} />{[180, 400, 620].map((x, k) => <rect key={k} x={x - 90} y={420} width={180} height={80} rx={14} fill="#fff" stroke={NBK} strokeWidth={5} />)}<path d="M 720 620 L 720 260" stroke={TEAL} strokeWidth={12} markerEnd="url(#ar)" /><defs><marker id="ar" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={TEAL} /></marker></defs></svg>
            </div>
            <div style={{position: 'absolute', inset: 0, ...nb('#fff', 9), borderColor: TEAL, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', overflow: 'hidden'}}>
              <div style={{position: 'absolute', left: 24, top: 18, fontFamily: MONO, fontWeight: 700, fontSize: 30, color: TEAL}}>ETA · PART DE L'INITIATEUR</div>
              <svg width={800} height={760}><rect x={40} y={330} width={200} height={100} rx={16} fill={RED} stroke={NBK} strokeWidth={6} />{[[240, 380, 440, 220], [240, 380, 440, 540], [440, 220, 640, 140], [440, 220, 640, 300], [440, 540, 640, 460], [440, 540, 640, 620]].map(([a, b, c, d], k) => <path key={k} d={`M ${a} ${b} L ${c} ${d}`} stroke={d < b ? GREEN : RED} strokeWidth={7} />)}{[140, 300, 460, 620].map((y, k) => <circle key={k} cx={660} cy={y} r={22} fill={hexMix(GREEN, RED, k / 3)} stroke={NBK} strokeWidth={5} />)}</svg>
            </div>
          </div>
        </Abs>
      </Out>}
      {t > 548.4 && t < 558.5 && <Out end={558.5}><EtaTree init={['Initiateur', 550.94]} rows={[['Barrière 1', 552.0], ['Barrière 2', 552.9]]} leafAt={556.9} yes="succès" no="échec" okAt={557.63} okL="scénario final" koAt={557.9} koL="scénario final" /></Out>}
      {t > 558.4 && <EtaTree init={['Départ de feu', 561.15]} rows={[['Détecteur incendie ?', 568.29], ['Extinction ?', 571.7], ['Secours efficaces ?', 575.08]]} leafAt={577.0} okAt={582.33} koAt={584.72} okL="Rapidement maîtrisé" koL="Incendie généralisé" />}
    </Out>
  );
};

/* ═════════════ 10 · BOW-TIE ═════════════ */
const BT = {
  cause: [['Corrosion', 627.47], ['Surremplissage', 627.98], ["Défaillance d'une vanne", 628.85]] as [string, number][],
  prev: [['Inspections périodiques', 632.89], ['Contrôle de niveau', 635.28], ['Maintenance préventive', 636.37]] as [string, number][],
  cons: [['Pollution', 640.28], ['Incendie', 640.76], ['Explosion', 641.64]] as [string, number][],
  prot: [['Rétention', 646.37], ["Moyens d'extinction", 647.48], ["Intervention d'urgence", 649.47]] as [string, number][],
};
const M10: React.FC = () => {
  const t = useT();
  const ex = t > 616.8;
  const flap = Math.sin(t * 7) * 0.08 * (t > 603.4 && t < 606 ? 1 : 0);
  const row = (items: [string, number][], y: number, kind: 'c' | 'b', c: string, gen: [string, number]) => (
    <>
      {(!ex || t < items[0][1]) && <Abs x={60} y={y} w={960} h={kind === 'c' ? 110 : 80} style={{...(kind === 'c' ? nb('#fff', 6) : nb(c, 5)), borderColor: kind === 'c' ? c : NBK, color: kind === 'c' ? INK : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, opacity: pop(t, gen[1]) * (ex ? 0.35 : 1)}}>{gen[0]}</Abs>}
      {ex && items.map(([l, a], k) => <Abs key={k} x={60 + k * 330} y={y} w={300} h={kind === 'c' ? 110 : 80} style={{...(kind === 'c' ? nb('#fff', 6) : nb(c, 5)), borderColor: kind === 'c' ? c : NBK, color: kind === 'c' ? INK : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 10px', fontFamily: sansFont, fontWeight: 900, fontSize: l.length > 18 ? 24 : 30, lineHeight: 1.05, transform: `scale(${Math.min(1, sp(t, a))})`}}>{kind === 'b' ? '▮ ' : ''}{l}</Abs>)}
    </>
  );
  return (
    <Out end={654.5}>
      <Heads h={[[592.0, ['10e', 'méthode'], [1]], [593.5, ['Bow-tie'], [0]], [595.7, ['Représenter', 'visuellement'], [1]], [603.4, ['Un', 'papillon'], [1]], [605.7, ['À gauche', '·', 'causes'], [0, 2]], [609.1, ['Au centre', '·', 'événement'], [0, 2]], [612.6, ['À droite', '·', 'conséquences'], [0, 2]], [616.8, ['Exemple', 'stockage de carburant'], [1]], [621.2, ['Perte', 'de confinement'], [0]], [624.8, ['Causes'], [0]], [631.0, ['Barrières', 'préventives'], [0]], [638.3, ['Conséquences'], [0]], [642.2, ['Barrières', 'de protection'], [0]], [651.7, ['Tout', 'le scénario'], [1]]]} />
      <Announce n={10} at={592.0} end={595.6} en={[['Bow-tie', 593.3]]} fr="« nœud papillon »" frAt={594.4} />
      <MBadge n={10} from={595.4} />
      {t > 595.6 && t < 605.8 && <Out end={605.8}>
        <Abs x={60} y={480} w={960} style={{display: 'flex', justifyContent: 'center', gap: 14}}>{[['Causes', 597.6, ORANGE], ['Conséquences', 599.7, RED], ['Barrières', 601.3, TEAL]].map(([l, a, c]) => t > (a as number) && <div key={l as string} style={{...nb(c as string, 5), color: '#fff', padding: '8px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 34, transform: `scale(${Math.min(1, sp(t, a as number))})`}}>{l as string}</div>)}</Abs>
        <svg width={1080} height={700} style={{position: 'absolute', left: 0, top: 600, opacity: pop(t, 602.0)}}>
          <g transform={`translate(540 330) scale(${1 + flap * 3} 1)`}><path d="M 0 0 L -380 -250 L -380 250 Z" fill={`${ORANGE}CC`} stroke={NBK} strokeWidth={8} /><path d="M 0 0 L 380 -250 L 380 250 Z" fill={`${RED}CC`} stroke={NBK} strokeWidth={8} /><circle r={60} fill={NBK} /><circle r={36} fill={YEL} /></g>
        </svg>
      </Out>}
      {t > 605.6 && <>
        <svg width={1080} height={900} style={{position: 'absolute', left: 0, top: 470, opacity: pop(t, 605.7)}}>
          <path d="M 60 70 L 1020 70 L 600 420 L 480 420 Z" fill={`${ORANGE}22`} stroke={ORANGE} strokeWidth={5} strokeDasharray="14 10" />
          <path d="M 480 480 L 600 480 L 1020 830 L 60 830 Z" fill={`${RED}22`} stroke={RED} strokeWidth={5} strokeDasharray="14 10" />
        </svg>
        {row(BT.cause, 480, 'c', ORANGE, ['Menaces · causes', 606.98])}
        {row(BT.prev, 620, 'b', TEAL, ['Barrières préventives', 608.14])}
        <Abs x={240} y={760} w={600} h={180} style={{...nb(ex ? RED : NBK, 8), color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '0 20px', opacity: pop(t, 610.97), transform: `scale(${t > 651.7 ? 1 + 0.04 * Math.sin(t * 8) : 1})`}}>
          {ex && <div style={{position: 'relative', width: 110, height: 120}}><svg width={110} height={130}><rect x={15} y={10} width={80} height={100} rx={14} fill="#E5ECF5" stroke="#fff" strokeWidth={5} /><rect x={20} y={45} width={70} height={60} rx={10} fill={ORANGE} />{[0, 1, 2].map((k) => <circle key={k} cx={55} cy={112 + ((t * 40 + k * 7) % 20)} r={5} fill={ORANGE} />)}</svg></div>}
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: ex ? 34 : 40, lineHeight: 1.1, textAlign: 'center'}}>{ex ? (t > 622.5 ? 'Perte de confinement du réservoir' : 'Événement redouté') : 'Événement redouté'}</div>
        </Abs>
        {row(BT.prot, 980, 'b', TEAL, ['Barrières de protection', 614.88])}
        {row(BT.cons, 1100, 'c', RED, ['Conséquences', 613.96])}
        {t > 651.7 && <Abs x={60} y={1240} w={960} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={652.99} text="TOUT LE SCÉNARIO D'UN COUP D'ŒIL" bg={NBK} rot={-2} size={28} /></Abs>}
      </>}
    </Out>
  );
};

/* ═════════════ 11 · MOSAR ═════════════ */
const NET: [string, number, number][] = [['engrenage', 0, 0.8], ['eclair', 1.05, 0.8], ['vapeur', 2.1, 0.8], ['goutte', 3.15, 0.8], ['feu', 4.2, 0.8], ['vent', 5.25, 0.8]];
const PLANT: [string, string, number, number, number][] = [['stock', 'Stockage', 686.0, 110, 510], ['engrenage', 'Pompe', 688.6, 430, 510], ['eprouvette', 'Réacteur', 688.92, 760, 510], ['vent', 'Ventilation', 689.96, 760, 180]];
const M11: React.FC = () => {
  const t = useT();
  const ex = prog(t, 672.0, 673.0, easeOut);
  const zo = prog(t, 698.0, 699.8, easeInOut);
  return (
    <Out end={703.0}>
      <Heads h={[[658.1, ['11e', 'méthode'], [1]], [659.6, ['MOSAR'], [0]], [664.0, ['Système', 'complexe'], [1]], [667.9, ['Composants', '·', 'interactions'], [0, 2]], [669.9, ['Son', 'principe'], [1]], [672.1, ['Décomposer'], [0]], [674.4, ['Sources', 'de danger'], [0]], [675.7, ['Scénarios'], [0]], [678.0, ['Prévention', '·', 'protection'], [0, 2]], [679.7, ['Exemple', 'usine chimique'], [1]], [684.0, ['Plusieurs', 'éléments'], [1]], [690.5, ['Sources', 'de danger'], [0]], [694.6, ['Interactions'], [0]], [698.0, ['Vision', 'globale'], [1]]]} />
      <Announce n={11} at={658.1} end={663.9} en={[['[M]éthode', 660.0], ['[O]rganisée', 661.1], ['[S]ystémique', 661.6], ["d'[A]nalyse", 662.3], ['des', 662.8], ['[R]isques', 663.0]]} />
      <MBadge n={11} from={663.7} />
      {t > 663.9 && t < 670.0 && <Out end={670.0}>
        <svg width={1080} height={900} style={{position: 'absolute', left: 0, top: 470}}>
          {NET.flatMap((a, i) => NET.slice(i + 1).map((b, j) => { const x1 = 540 + Math.cos(a[1]) * 340, y1 = 430 + Math.sin(a[1]) * 340, x2 = 540 + Math.cos(b[1]) * 340, y2 = 430 + Math.sin(b[1]) * 340; const on = t > 669.24; return <g key={`${i}-${j}`}><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={on ? NAVY : '#B9C3D1'} strokeWidth={on ? 6 : 3} opacity={prog(t, 665.0 + i * 0.1, 665.6 + i * 0.1)} />{on && <circle cx={lerp(x1, x2, ((t - 669.24) * 0.8 + i * 0.13 + j * 0.21) % 1)} cy={lerp(y1, y2, ((t - 669.24) * 0.8 + i * 0.13 + j * 0.21) % 1)} r={9} fill={ORANGE} />}</g>; }))}
        </svg>
        {NET.map(([ic, a], k) => <Abs key={k} x={540 + Math.cos(a) * 340 - 75} y={900 + Math.sin(a) * 340 - 75} w={150} h={150} style={{...nb('#fff', 6), borderColor: NAVY, borderRadius: 75, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1, sp(t, 664.4 + k * 0.12)) * (t > 668.36 && t < 669.3 ? 1.12 : 1)})`}}><F n={ic} size={86} /></Abs>)}
        <Abs x={390} y={750} w={300} h={300} style={{...nb(NAVY, 8), borderRadius: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 40, textAlign: 'center', lineHeight: 1.05, opacity: pop(t, 664.9)}}>système<br />complexe</Abs>
      </Out>}
      {t > 669.9 && t < 679.8 && <Out end={679.8}>
        {[[0, 0, 'usine'], [1, 0, 'engrenage'], [0, 1, 'eprouvette'], [1, 1, 'vent']].map(([cx, cy, ic], k) => {
          const x = 300 + (cx as number) * 240 + ((cx as number) - 0.5) * 2 * 120 * ex;
          const y = 560 + (cy as number) * 240 + ((cy as number) - 0.5) * 2 * 110 * ex;
          const hot = t > 674.39 + k * 0.15;
          const shield = t > 678.42 + k * 0.12;
          return <Abs key={k} x={x} y={y} w={240} h={240} style={{background: hot ? '#FFF0EE' : '#EEF2FA', border: `6px solid ${NBK}`, borderRadius: 26 * ex, boxShadow: shield ? `0 0 0 10px ${GREEN}88, 6px 6px 0 ${NBK}` : `6px 6px 0 ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${(k % 2 ? 1 : -1) * 6 * ex}deg)`}}>
            <F n={ic as string} size={120} />
            {hot && <div style={{position: 'absolute', right: -20, top: -20, transform: `scale(${Math.min(1, sp(t, 674.39 + k * 0.15))})`}}><F n="danger" size={66} /></div>}
          </Abs>;
        })}
        {t > 675.72 && <svg width={1080} height={800} style={{position: 'absolute', left: 0, top: 470}}><path d="M 300 210 C 560 120, 640 160, 790 220 C 900 300, 860 520, 760 590 C 600 700, 420 680, 300 600" fill="none" stroke={RED} strokeWidth={12} strokeDasharray="26 14" strokeDashoffset={-t * 120} pathLength={2000} opacity={prog(t, 675.7, 676.2)} /></svg>}
        <Abs x={60} y={1230} w={960} style={{display: 'flex', justifyContent: 'center', gap: 12}}>
          {[['DÉCOMPOSER', 672.13, NAVY], ['DANGERS', 674.39, RED], ['SCÉNARIOS', 675.72, ORANGE], ['PROTECTION', 678.42, GREEN]].map(([l, a, c]) => t > (a as number) && <NBadge key={l as string} at={a as number} text={l as string} bg={c as string} rot={-2} size={24} />)}
        </Abs>
      </Out>}
      {t > 679.7 && <Abs x={60} y={470} w={960} h={880} style={{opacity: pop(t, 680.0), transform: `scale(${1 - zo * 0.22})`, transformOrigin: '50% 45%'}}>
        <div style={{position: 'absolute', inset: 0, ...nb('#F3F7FB', 8), borderColor: zo > 0.5 ? NAVY : NBK}} />
        <div style={{position: 'absolute', left: 24, top: 18, fontFamily: MONO, fontWeight: 700, fontSize: 26, color: DIM}}>USINE CHIMIQUE · INSTALLATION</div>
        <svg width={960} height={880} style={{position: 'absolute', left: 0, top: 0}}>
          {[[260, 610, 430, 610], [580, 610, 760, 610], [835, 510, 835, 380]].map(([x1, y1, x2, y2], k) => { const on = t > 694.58 && Math.floor((t - 694.58) * 3) % 3 === k; return <g key={k}><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={NBK} strokeWidth={30} strokeLinecap="round" opacity={prog(t, 687.76, 688.3)} /><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={on ? RED : '#9FB7CF'} strokeWidth={18} strokeLinecap="round" opacity={prog(t, 687.76, 688.3)} /></g>; })}
        </svg>
        {t > 687.76 && <div style={{position: 'absolute', left: 290, top: 650}}><NBadge at={687.76} text="TUYAUTERIE" bg={NBK} rot={-2} size={22} /></div>}
        {PLANT.map(([ic, l, a, x, y], k) => { const q = sp(t, a); return t > a - 0.05 && <div key={k} style={{position: 'absolute', left: x - 60, top: y, width: 220, height: 200, ...nb('#fff', 6), borderColor: t > 690.5 ? RED : NAVY, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, transform: `scale(${0.6 + 0.4 * Math.min(1, q)})`}}>
          <F n={ic} size={96} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>{l}</div>
          {t > 690.5 + k * 0.3 && <div style={{position: 'absolute', right: -22, top: -22, transform: `scale(${Math.min(1, sp(t, 690.5 + k * 0.3))})`}}><F n="danger" size={60} /></div>}
        </div>; })}
        {t > 694.58 && <div style={{position: 'absolute', left: 0, right: 0, top: 780, display: 'flex', justifyContent: 'center'}}><NBadge at={694.58} text="INTERACTIONS → ACCIDENT" bg={RED} rot={-2} size={30} /></div>}
      </Abs>}
      {zo > 0.5 && <Abs x={60} y={1290} w={960} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={699.0} text="VISION GLOBALE DES RISQUES" bg={NAVY} rot={-2} size={30} /></Abs>}
    </Out>
  );
};

/* ═════════════ 12 · HACCP ═════════════ */
const HST: [string, string, number][] = [['camion', 'Réception', 729.84], ['stock', 'Stockage', 730.78], ['couteau', 'Préparation', 731.64], ['engrenage', 'Transformation', 732.2], ['colis', 'Conditionnement', 733.34], ['camion', 'Distribution', 734.58]];
const Bottle: React.FC<{bad?: string}> = ({bad}) => (
  <div style={{position: 'relative', width: 70, height: 150}}>
    <svg width={70} height={150}><rect x={25} y={0} width={20} height={22} rx={4} fill={GREEN} stroke={NBK} strokeWidth={3} /><path d="M 22 22 L 48 22 L 60 50 L 60 142 Q 60 148 54 148 L 16 148 Q 10 148 10 142 L 10 50 Z" fill="#FFF7E6" stroke={NBK} strokeWidth={4} /><path d="M 12 70 L 58 70 L 58 142 Q 58 146 54 146 L 16 146 Q 12 146 12 142 Z" fill={ORANGE} /></svg>
    {bad && <div style={{position: 'absolute', left: 8, top: 82}}><F n={bad} size={54} /></div>}
  </div>
);
const M12: React.FC = () => {
  const t = useT();
  const belt = (t - 735) * 120;
  return (
    <Out end={762.4}>
      <Heads h={[[703.5, ['12e', 'méthode'], [1]], [705.0, ['HACCP'], [0]], [713.4, ['Secteur', 'agroalimentaire'], [1]], [717.3, ['Biologiques', '·', 'chimiques', '·', 'physiques'], [0, 2, 4]], [721.6, ['Sécurité', 'des aliments'], [1]], [726.8, ['Le', 'processus'], [1]], [735.2, ['Exemple', 'jus de fruit'], [1]], [743.2, ['Contamination', '·', 'résidus', '·', 'corps étrangers'], [0, 2, 4]], [751.3, ['Points', 'critiques'], [1]], [754.0, ['Limites', '·', 'surveillance', '·', 'actions'], [0, 2, 4]], [758.8, ['Sécurité', 'sanitaire'], [1]]]} />
      <Announce n={12} at={703.5} end={713.3} en={[['[H]azard', 705.3], ['[A]nalysis', 706.2], ['[C]ritical', 706.8], ['[C]ontrol', 707.2], ['[P]oints', 707.6]]} fr="analyse des dangers et points critiques pour leur maîtrise" frAt={708.6} />
      <MBadge n={12} from={713.1} />
      {t > 713.3 && t < 726.9 && <Out end={726.9}>
        <Abs x={340} y={520} w={400} h={400} style={{...nb('#fff', 8), borderColor: NAVY, borderRadius: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 713.6)}}><F n="pasteque" size={230} />{t > 722.9 && <div style={{position: 'absolute', inset: -30, borderRadius: '50%', border: `14px solid ${GREEN}`, boxShadow: `0 0 40px ${GREEN}`, transform: `scale(${Math.min(1, sp(t, 722.9))})`}} />}</Abs>
        {t > 714.2 && t < 718.9 && <Abs x={60} y={960} w={960} style={{textAlign: 'center', opacity: wn(t, 714.2, 718.9)}}><div style={{display: 'inline-block', ...nb(NBK, 6), color: '#fff', padding: '10px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 52}}>secteur <span style={{color: YEL}}>agroalimentaire</span></div></Abs>}
        {[['microbe', 'Biologiques', 718.98, 120, 980], ['eprouvette', 'Chimiques', 719.56, 450, 1010], ['bris', 'Physiques', 720.14, 780, 980]].map(([ic, l, a, x, y], k) => { const near = t > 722.9 ? prog(t, 722.9, 723.6, easeOut) : 0; return <GH key={k} x={(x as number) - (near * ((x as number) - 450)) * 0.0 } y={y as number} w={240} h={260} at={a as number} ic={ic as string} l={l as string} c={RED} fs={30} />; })}
        {t > 723.7 && <Abs x={60} y={1290} w={960} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={724.7} text="MESURES DE MAÎTRISE" bg={GREEN} rot={-2} size={28} /></Abs>}
      </Out>}
      {t > 726.8 && t < 735.3 && <Out end={735.3}>
        <Abs x={30} y={860} w={1020} h={110} style={{background: '#3A404C', border: `6px solid ${NBK}`, borderRadius: 55, overflow: 'hidden', opacity: pop(t, 727.0)}}>
          <div style={{position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(90deg, #555C6A 0 30px, #3A404C 30px 60px)', backgroundPosition: `${(t * 160) % 60}px 0`}} />
        </Abs>
        {Array.from({length: 7}, (_, k) => <Abs key={k} x={((t - 727) * 120 + k * 150) % 1050 - 40} y={770} w={90} h={90} style={{opacity: pop(t, 727.3)}}><F n="banane" size={84} /></Abs>)}
        {HST.map(([ic, l, a], k) => { const up = k % 2 === 0; const q = sp(t, a); return t > a - 0.05 && <Abs key={k} x={40 + k * 165} y={up ? 520 : 1000} w={160} h={220} style={{...nb('#fff', 5), borderColor: NAVY, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, transform: `scale(${0.6 + 0.4 * Math.min(1, q)})`, padding: 6, textAlign: 'center'}}><F n={ic} size={70} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: l.length > 12 ? 17 : 21, lineHeight: 1}}>{l}</div><div style={{position: 'absolute', left: 74, [up ? 'bottom' : 'top']: -36, width: 6, height: 34, background: NBK}} /></Abs>; })}
      </Out>}
      {t > 735.2 && <>
        <Abs x={60} y={480} w={960} h={300} style={{...nb('#fff', 7), borderColor: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, opacity: pop(t, 735.6)}}>
          <F n="pasteque" size={140} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 54, color: INK}}>Jus de <span style={{color: ORANGE}}>fruit</span></div>
          {t > 739.5 && <div style={{position: 'absolute', right: 24, top: 18}}><NBadge at={739.5} text="ÉQUIPE HACCP" bg={NAVY} rot={3} size={26} /></div>}
        </Abs>
        <Abs x={30} y={1110} w={1020} h={90} style={{background: '#3A404C', border: `6px solid ${NBK}`, borderRadius: 45, overflow: 'hidden', opacity: pop(t, 736.0)}}><div style={{position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(90deg, #555C6A 0 30px, #3A404C 30px 60px)', backgroundPosition: `${(t * 160) % 60}px 0`}} /></Abs>
        {Array.from({length: 7}, (_, k) => {
          const x = ((belt + k * 160) % 1120) - 80;
          const id = Math.floor((belt + k * 160) / 1120) * 7 + k;
          const bad = t > 745.8 && id % 5 === 2 ? (t > 749.76 ? ['microbe', 'eprouvette', 'bris'][id % 3] : t > 748.35 ? ['microbe', 'eprouvette'][id % 2] : 'microbe') : undefined;
          const ejected = bad && x > 540;
          return <Abs key={k} x={x} y={ejected ? 960 - (x - 540) * 0.6 : 960} w={70} h={150} style={{transform: `rotate(${ejected ? (x - 540) * 0.4 : 0}deg)`, opacity: pop(t, 736.2)}}><Bottle bad={bad} /></Abs>;
        })}
        <Abs x={480} y={860} w={150} h={360} style={{opacity: pop(t, 743.0)}}>
          <div style={{position: 'absolute', inset: 0, border: `8px solid ${NBK}`, borderBottom: 'none', borderRadius: '20px 20px 0 0', background: 'rgba(80,140,255,0.12)'}} />
          <div style={{position: 'absolute', left: 8, right: 8, top: 20 + ((t * 300) % 300), height: 6, background: '#5FA8FF', boxShadow: '0 0 18px #5FA8FF'}} />
          <div style={{position: 'absolute', left: -20, top: -60, ...nb(t > 745.8 && Math.floor(t * 4) % 2 ? RED : NBK, 4), color: '#fff', padding: '4px 10px', fontFamily: MONO, fontWeight: 700, fontSize: 20}}>CONTRÔLE</div>
        </Abs>
        <Abs x={60} y={800} w={960} style={{display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap'}}>
          {[['Contamination microbiologique', 745.8, 'microbe'], ['Résidus chimiques', 748.35, 'eprouvette'], ['Corps étrangers', 749.76, 'bris']].map(([l, a, ic]) => t > (a as number) && t < 751.3 && <div key={l as string} style={{...nb('#fff', 4), borderColor: RED, display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 22, transform: `scale(${Math.min(1, sp(t, a as number))})`}}><F n={ic as string} size={34} />{l as string}</div>)}
        </Abs>
        {t > 751.3 && <Abs x={60} y={790} w={960} h={100} style={{display: 'flex', justifyContent: 'center', gap: 12}}>
          {[['CCP', 752.57, RED, 'cible'], ['Limites critiques', 754.54, ORANGE, 'thermometre'], ['Surveillance', 756.38, NAVY, 'yeux'], ['Actions correctives', 757.2, GREEN, 'cle']].map(([l, a, c, ic]) => t > (a as number) && <div key={l as string} style={{...nb(c as string, 4), color: '#fff', display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 22, transform: `scale(${Math.min(1, sp(t, a as number))})`}}><F n={ic as string} size={38} />{l as string}</div>)}
        </Abs>}
        {t > 752.57 && [200, 800].map((x, k) => <Abs key={k} x={x} y={1210} w={80} h={120} style={{transform: `scale(${Math.min(1, sp(t, 752.57 + k * 0.2))})`, transformOrigin: '50% 100%'}}><div style={{position: 'absolute', left: 10, top: 0, width: 6, height: 110, background: NBK}} /><div style={{position: 'absolute', left: 16, top: 0, ...nb(RED, 3), color: '#fff', padding: '2px 8px', fontFamily: MONO, fontWeight: 700, fontSize: 20}}>CCP</div></Abs>)}
        {t > 758.8 && <Stamp at={760.26} text="SÉCURITÉ SANITAIRE" c={GREEN} x={180} y={560} rot={-5} size={58} />}
      </>}
    </Out>
  );
};

/* ═════════════ 13 · LOPA ═════════════ */
const M13: React.FC = () => {
  const t = useT();
  const lvl = t < 795.0 ? lerp(0.3, 0.72, prog(t, 790.0, 795.0, lin)) : t < 801.19 ? lerp(0.72, 0.95, prog(t, 795.0, 801.19, lin)) : 0.95;
  const risk = 1 - 0.28 * [799.75, 801.19, 802.97].filter((a) => t > a).length - (t > 808.55 ? 0.05 : 0);
  return (
    <Out end={814.5}>
      <Heads h={[[762.9, ['13e', 'méthode'], [1]], [763.5, ['LOPA'], [0]], [769.8, ['Couches', 'indépendantes'], [0, 1]], [774.9, ['Suffisantes', '?'], [0]], [777.5, ['Risque', 'acceptable'], [1]], [779.8, ['Son', 'principe'], [1]], [788.4, ['Exemple', 'réservoir'], [1]], [795.0, ['Surremplissage'], [0]], [797.3, ['Protections', 'existantes'], [0]], [805.0, ['Efficacité'], [0]], [810.1, ['Suffisant', '?'], [0]]]} />
      <Announce n={13} at={762.9} end={769.7} en={[['[L]ayer', 765.0], ['[o]f', 765.4], ['[P]rotection', 765.7], ['[A]nalysis', 766.3]]} fr="analyse des couches de protection" frAt={767.5} />
      <MBadge n={13} from={769.5} />
      {t > 769.7 && t < 779.9 && <Out end={779.9}>
        <svg width={1080} height={700} style={{position: 'absolute', left: 0, top: 500}}>
          {[0, 1, 2].map((k) => { const x = 330 + k * 200; const on = t > 772.3 + k * 0.4; return <g key={k} opacity={on ? 1 : 0}><rect x={x - 30} y={60} width={60} height={480} rx={14} fill={hexMix(NAVY, '#ffffff', 0.2 + k * 0.2)} stroke={NBK} strokeWidth={6} /><text x={x} y={590} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={26} fill={NBK}>couche</text></g>; })}
          {(() => { const p = prog(t, 773.0, 777.6, easeInOut); const x2 = lerp(80, 1000, p); const segs = [80, 300, 500, 700, 1000]; return segs.slice(0, -1).map((x, k) => x < x2 && <line key={k} x1={x + (k ? 30 : 0)} y1={300} x2={Math.min(x2, segs[k + 1] - 30)} y2={300} stroke={hexMix(RED, GREEN, k / 3)} strokeWidth={60 - k * 14} strokeLinecap="round" />); })()}
          <circle cx={80} cy={300} r={46} fill={RED} stroke={NBK} strokeWidth={6} />
        </svg>
        <Abs x={60} y={480} w={300} style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: RED}}>SCÉNARIO DE RISQUE</Abs>
        {t > 778.46 && <Abs x={700} y={1110} w={320} style={{transform: `scale(${Math.min(1, sp(t, 778.46))})`}}><div style={{...nb(GREEN, 6), color: '#fff', textAlign: 'center', padding: '10px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 34}}>ACCEPTABLE ✓</div></Abs>}
        {t > 774.86 && t < 778.4 && <Abs x={60} y={1120} w={600} style={{fontFamily: handFont, fontSize: 60, color: NAVY}}>suffisantes ?</Abs>}
      </Out>}
      {t > 779.8 && t < 788.5 && <Out end={788.5}><RailSteps c={NAVY} y={470} h={880} at={780.0} items={[['Identifier un événement initiateur', 780.89, 'feu'], ['Estimer sa fréquence', 782.52, 'chrono'], ['Examiner les couches de protection', 784.21, 'bouclier'], ['Évaluer le risque résiduel', 787.66, 'balance']]} /></Out>}
      {t > 788.4 && <>
        <Abs x={140} y={470} w={800} h={800}>
          {[[799.75, 'sirene', 'Alarmes de niveau'], [801.19, 'stop', 'Arrêt automatique'], [802.97, 'bouclier', 'Autres dispositifs']].map(([a, ic, l], k) => { const r = 230 + k * 80; const on = t > (a as number); const ok = t > 805.0 + k * 0.4; return on && <div key={k} style={{position: 'absolute', left: 400 - r, top: 400 - r, width: r * 2, height: r * 2, borderRadius: '50%', border: `${18 - k * 3}px solid ${ok ? GREEN : NAVY}`, opacity: 0.55 + 0.45 * Math.min(1, sp(t, a as number)), transform: `scale(${Math.min(1, sp(t, a as number))})`}}><div style={{position: 'absolute', left: r - 160 + [0, 180, -180][k], top: -34, ...nb('#fff', 4), borderColor: ok ? GREEN : NAVY, display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 22, whiteSpace: 'nowrap', transform: k === 0 && on && t < 801.19 ? `rotate(${Math.sin(t * 20) * 4}deg)` : undefined}}><F n={ic as string} size={36} />{l as string}{ok ? ' ✓' : ''}</div></div>; })}
          <svg width={800} height={800} style={{position: 'absolute', left: 0, top: 0}}>
            <rect x={300} y={230} width={200} height={340} rx={40} fill="#E5ECF5" stroke={NBK} strokeWidth={8} />
            <rect x={308} y={230 + 332 * (1 - lvl)} width={184} height={332 * lvl} rx={32} fill={hexMix(TEAL, RED, prog(t, 794.0, 795.5))} opacity={0.85} />
            <line x1={300} y1={290} x2={500} y2={290} stroke={RED} strokeWidth={5} strokeDasharray="12 8" />
            <rect x={380} y={180} width={40} height={50} fill="#9FB7CF" stroke={NBK} strokeWidth={5} />
            {t < 801.19 && t > 790 && [0, 1, 2].map((k) => <circle key={k} cx={400} cy={185 + ((t * 120 + k * 15) % 45)} r={6} fill={TEAL} />)}
            <text x={400} y={620} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={28} fill={NBK}>RÉSERVOIR</text>
          </svg>
          {t > 799.75 && t < 801.19 && <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle, ${RED}22, transparent 60%)`, opacity: Math.floor(t * 6) % 2}} />}
        </Abs>
        {t > 795.49 && <Abs x={60} y={1150} w={300} style={{transform: `scale(${Math.min(1, sp(t, 795.49))})`}}><div style={{...nb(RED, 5), color: '#fff', padding: '8px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, textAlign: 'center'}}>Surremplissage</div></Abs>}
        {t > 805.0 && <Abs x={720} y={1110} w={300} h={200} style={{...nb('#fff', 5), opacity: pop(t, 805.0), padding: 14}}>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM}}>RISQUE</div>
          <div style={{marginTop: 10, height: 30, borderRadius: 15, background: '#E3E8EF', border: `3px solid ${NBK}`, overflow: 'hidden'}}><div style={{height: '100%', width: `${risk * 100 * (t > 808.55 ? lerp(1, 0.55, prog(t, 808.55, 809.6, easeOut)) : 1)}%`, background: hexMix(GREEN, RED, risk)}} /></div>
          <div style={{marginTop: 8, display: 'flex', alignItems: 'center', gap: 6, fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: GREEN, opacity: pop(t, 808.6)}}><F n="baisse" size={40} />réduction</div>
        </Abs>}
        {t > 810.1 && <Abs x={60} y={1290} w={960} style={{display: 'flex', justifyContent: 'center', gap: 14}}><NBadge at={812.2} text="SUFFISANTES ✓" bg={GREEN} rot={-2} size={26} />{t > 814.0 && <NBadge at={814.0} text="+ MESURES SUPPLÉMENTAIRES" bg={ORANGE} rot={2} size={26} />}</Abs>}
      </>}
    </Out>
  );
};

/* ═════════════ 14 · QRA ═════════════ */
const HOUSES: [number, number][] = [[700, 180], [800, 300], [860, 160], [760, 420]];
const M14: React.FC = () => {
  const t = useT();
  const pl = prog(t, 854.25, 858.5, easeOut);
  const mv = prog(t, 866.3, 868.3, easeInOut);
  return (
    <Out end={870.5}>
      <Heads h={[[818.1, ['14e', 'méthode'], [1]], [820.3, ['QRA'], [0]], [826.4, ['Qualitatif', '→', 'quantitatif'], [0, 2]], [830.8, ['Données', 'numériques'], [1]], [832.8, ['Fréquences', '·', 'conséquences'], [0, 2]], [836.0, ['Le', 'schéma'], [1]], [846.6, ['Exemple', 'dépôt de gaz'], [1]], [854.0, ['Fuite', 'de gaz'], [1]], [858.8, ['Incendie', '·', 'explosion', '·', 'exposition'], [0, 2, 4]], [864.3, ['Éclairer', 'les décisions'], [1]]]} />
      <Announce n={14} at={818.1} end={826.3} en={[['[Q]uantitative', 821.0], ['[R]isk', 821.9], ['[A]ssessment', 822.3]]} fr="évaluation quantitative des risques" frAt={823.2} />
      <MBadge n={14} from={826.1} />
      {t > 826.3 && t < 836.1 && <Out end={836.1}>
        <Abs x={60} y={480} w={460} h={560} style={{...nb('#fff', 7), opacity: pop(t, 826.5), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, filter: t > 828.8 ? 'grayscale(0.8)' : undefined}}>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 28, color: DIM}}>QUALITATIF</div>
          {['faible', 'moyen', 'élevé'].map((w, k) => <div key={w} style={{...nb([GREEN, ORANGE, RED][k], 4), color: '#fff', padding: '6px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 36}}>{w}</div>)}
        </Abs>
        <Abs x={560} y={480} w={460} h={560} style={{...nb('#fff', 7), borderColor: GREEN, opacity: pop(t, 828.8), padding: 20}}>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 28, color: GREEN, textAlign: 'center'}}>QUANTITATIF</div>
          <svg width={410} height={330} style={{marginTop: 20}}>
            <line x1={30} y1={300} x2={400} y2={300} stroke={NBK} strokeWidth={5} /><line x1={30} y1={300} x2={30} y2={10} stroke={NBK} strokeWidth={5} />
            {[0.3, 0.55, 0.42, 0.8, 0.65].map((v, k) => <rect key={k} x={55 + k * 68} y={300 - 270 * v * prog(t, 831.35 + k * 0.1, 831.9 + k * 0.1, easeOut)} width={46} height={270 * v * prog(t, 831.35 + k * 0.1, 831.9 + k * 0.1, easeOut)} fill={hexMix(GREEN, RED, v)} stroke={NBK} strokeWidth={4} />)}
            <polyline fill="none" stroke={NAVY} strokeWidth={6} points={Array.from({length: 40}, (_, k) => `${30 + k * 9.5},${300 - 260 * Math.exp(-Math.pow((k - 22) / 8, 2)) * prog(t, 832.0, 833.5, easeOut)}`).join(' ')} />
          </svg>
        </Abs>
        {t > 832.77 && <Abs x={60} y={1090} w={960} style={{textAlign: 'center'}}><div style={{display: 'inline-block', ...nb(NBK, 7), color: '#fff', padding: '12px 28px', fontFamily: sansFont, fontWeight: 900, fontSize: 44, transform: `scale(${Math.min(1, sp(t, 832.77))})`}}>risque = <span style={{color: YEL}}>fréquence</span> × <span style={{color: '#FF9A8F'}}>conséquences</span></div></Abs>}
      </Out>}
      {t > 836.0 && t < 846.7 && <Out end={846.7}><StairSteps c={GREEN} y={470} h={880} items={[['Identification des dangers', 838.34, 'danger'], ['Construction des scénarios', 840.09, 'collision'], ['Estimation des fréquences', 842.39, 'chrono'], ['Modélisation des conséquences', 843.71, 'ordinateur'], ['Quantification du risque', 845.32, 'graphique']]} /></Out>}
      {t > 846.6 && <Abs x={60} y={470} w={960} h={880} style={{...nb('#24412F', 8), overflow: 'hidden', opacity: pop(t, 846.8)}}>
        <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.06) 2px, transparent 2px)', backgroundSize: '60px 60px'}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 590, height: 70, background: '#56606E'}} />
        <div style={{position: 'absolute', left: 560, top: 0, bottom: 0, width: 60, background: '#56606E'}} />
        <div style={{position: 'absolute', left: 24, top: 18, fontFamily: MONO, fontWeight: 700, fontSize: 24, color: '#CFE8D6'}}>DÉPÔT DE GAZ INDUSTRIEL · VUE DU DESSUS</div>
        <div style={{position: 'absolute', left: 40, top: 70, display: 'flex', alignItems: 'center', gap: 8, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#fff'}}><div style={{fontSize: 40, transform: 'rotate(-20deg)'}}>➜</div>VENT</div>
        {t > 854.25 && <svg width={960} height={880} style={{position: 'absolute', left: 0, top: 0}}>
          <defs><radialGradient id="plume" cx="15%" cy="50%" r="85%"><stop offset="0%" stopColor="#FFE16B" stopOpacity={0.85} /><stop offset="50%" stopColor="#F5A623" stopOpacity={0.45} /><stop offset="100%" stopColor="#F5A623" stopOpacity={0} /></radialGradient></defs>
          <g transform="translate(250 430) rotate(-20)"><ellipse cx={260 * pl} cy={0} rx={300 * pl + 10} ry={110 * pl + 6} fill="url(#plume)" />
            {t > 860.36 && <ellipse cx={120} cy={0} rx={190} ry={95} fill="none" stroke={ORANGE} strokeWidth={8} strokeDasharray="20 10" opacity={prog(t, 860.36, 860.9)} />}
            {t > 861.21 && <ellipse cx={80} cy={0} rx={120} ry={70} fill="none" stroke={RED} strokeWidth={10} opacity={prog(t, 861.21, 861.7)} />}
            {t > 862.22 && <ellipse cx={300} cy={0} rx={380} ry={150} fill="none" stroke={VIO} strokeWidth={8} strokeDasharray="10 10" opacity={prog(t, 862.22, 862.8)} />}
          </g>
        </svg>}
        {[[160, 360], [300, 300], [230, 500]].map(([x, y], k) => <div key={k} style={{position: 'absolute', left: x - 55, top: y - 55, width: 110, height: 110, borderRadius: 55, background: 'radial-gradient(circle at 35% 30%, #fff, #B8C4D2)', border: `5px solid ${NBK}`}} />)}
        {t > 854.25 && <div style={{position: 'absolute', left: 230, top: 400, width: 40, height: 40, borderRadius: 20, background: RED, border: '4px solid #fff', transform: `scale(${1 + 0.3 * Math.sin(t * 10)})`}} />}
        {HOUSES.map(([x, y], k) => { const moved = k === 0 ? mv : 0; return <div key={k} style={{position: 'absolute', left: x + moved * 150, top: y - moved * 120, width: 90, height: 90, ...nb('#fff', 4), display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={k === 3 ? 'equipe' : 'maison'} size={64} /></div>; })}
        {t > 860.36 && <div style={{position: 'absolute', left: 30, bottom: 30, display: 'flex', flexDirection: 'column', gap: 8}}>
          {[['Incendie', ORANGE, 860.36], ['Explosion', RED, 861.21], ['Exposition des personnes', VIO, 862.22]].map(([l, c, a]) => t > (a as number) && <div key={l as string} style={{...nb('#fff', 3), borderColor: c as string, padding: '4px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: c as string, transform: `scale(${Math.min(1, sp(t, a as number))})`, transformOrigin: '0 50%'}}>{l as string}</div>)}
        </div>}
        {t > 855.41 && t < 860.3 && <div style={{position: 'absolute', right: 30, bottom: 30}}><NBadge at={855.41} text="FRÉQUENCES DES SCÉNARIOS" bg={NBK} rot={-2} size={24} /></div>}
        {t > 866.14 && <div style={{position: 'absolute', right: 30, bottom: 30}}><NBadge at={866.14} text="DÉCISIONS · IMPLANTATION" bg={GREEN} rot={-2} size={26} /></div>}
      </Abs>}
    </Out>
  );
};

/* ═════════════ 15 · HRA ═════════════ */
const HF: [string, string, number][] = [['puzzle', 'Complexité des tâches', 887.06], ['diplome', 'Formation', 888.54], ['fatigue', 'Fatigue', 889.47], ['sablier', 'Charge de travail', 889.98], ['classeur', 'Procédures', 890.96], ['thermometre', 'Conditions de travail', 892.24]];
const M15: React.FC = () => {
  const t = useT();
  const flip = (k: number) => prog(t, [927.12, 928.51, 930.03, 932.07][k] - 0.3, [927.12, 928.51, 930.03, 932.07][k] + 0.2, easeInOut);
  return (
    <Out end={936.5}>
      <Heads h={[[871.0, ['15e', 'méthode'], [1]], [872.4, ['HRA'], [0]], [876.8, ['Facteurs', 'humains'], [1]], [880.6, ['Erreur', 'ou défaillance'], [0, 1]], [886.6, ['Complexité', '·', 'formation', '·', 'fatigue'], [0, 2, 4]], [889.9, ['Charge', '·', 'procédures', '·', 'conditions'], [0, 2, 4]], [893.2, ['Le', 'schéma'], [1]], [908.6, ['Exemple', 'consignation électrique'], [1]], [915.0, ['Erreurs', 'possibles'], [0]], [925.1, ['Les', 'mesures'], [1]], [933.2, ['Réduire', 'les erreurs'], [0]]]} />
      <Announce n={15} at={871.0} end={876.7} en={[['[H]uman', 872.8], ['[R]eliability', 873.3], ['[A]nalysis', 873.9]]} fr="analyse de la fiabilité humaine" frAt={874.8} />
      <MBadge n={15} from={876.5} />
      {t > 876.7 && t < 893.3 && <Out end={893.3}>
        <Abs x={340} y={710} w={400} h={400} style={{...nb('#fff', 8), borderColor: GREEN, borderRadius: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 877.0), transform: t > 881.33 && t < 884.6 ? `translateX(${Math.sin(t * 60) * 6}px)` : undefined}}>
          <F n="salarie" size={240} />
          {t > 881.33 && t < 884.6 && <div style={{position: 'absolute', right: 10, top: 10, width: 110, height: 110, borderRadius: 55, background: RED, border: `6px solid ${NBK}`, color: '#fff', fontSize: 70, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1, sp(t, 881.33))})`}}>✕</div>}
        </Abs>
        {HF.map(([ic, l, a], k) => { const ang = (k / HF.length) * Math.PI * 2 + (t - 886) * 0.35; const x = 540 + Math.cos(ang) * 400, y = 910 + Math.sin(ang) * 380; return t > a - 0.05 && <Abs key={k} x={x - 140} y={y - 50} w={280} h={100} style={{...nb('#fff', 5), borderColor: GREEN, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', transform: `scale(${Math.min(1, sp(t, a))})`}}><F n={ic} size={60} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: l.length > 14 ? 22 : 28, lineHeight: 1.05}}>{l}</div></Abs>; })}
      </Out>}
      {t > 893.2 && t < 908.7 && <Out end={908.7}><RailSteps c={GREEN} y={470} h={880} at={893.4} items={[['Identification de la tâche', 895.81, 'clipboard'], ['Erreurs humaines possibles', 897.7, 'croix'], ['Facteurs influençant la performance', 900.9, 'cerveau'], ["Évaluation de la probabilité d'erreur", 903.6, 'de'], ['Mesures de réduction du risque', 905.8, 'bouclier']]} /></Out>}
      {t > 908.6 && <>
        <Photo src="promo/formation-consignation.jpg" x={60} y={470} w={960} h={400} at={909.0} c={GREEN} pos="50% 40%" tag="CONSIGNATION ÉLECTRIQUE" />
        {[['Mauvaise identification du circuit', 916.95, 'eclair', 'diplome', 'Renforcer la formation'], ["Oubli d'une étape de consignation", 918.96, 'clipboard', 'equipe', 'Vérification croisée'], ['Mauvaise communication', 921.59, 'radio', 'classeur', 'Améliorer les procédures'], ["Mauvaise interprétation d'une procédure", 922.68, 'parchemin', 'calendrier', 'Organisation du travail']].map(([l, a, ic, ic2, l2], k) => {
          if (t < (a as number) - 0.05) return null;
          const f = flip(k);
          const back = f > 0.5;
          const q = sp(t, a as number);
          return <Abs key={k} x={60 + (k % 2) * 490} y={900 + Math.floor(k / 2) * 225} w={470} h={205} style={{perspective: 900}}>
            <div style={{width: '100%', height: '100%', transform: `rotateY(${f * 180 + (back ? 180 : 0)}deg) scale(${0.7 + 0.3 * Math.min(1, q)})`, ...nb(back ? '#EFFAF3' : '#fff', 6), borderColor: back ? GREEN : RED, display: 'flex', alignItems: 'center', gap: 14, padding: '0 18px', opacity: cl(q * 1.4)}}>
              <div style={{transform: !back && ic === 'radio' ? `rotate(${Math.sin(t * 30) * 8}deg)` : undefined}}><F n={back ? (ic2 as string) : (ic as string)} size={80} /></div>
              <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: back ? GREEN : RED}}>{back ? 'MESURE' : 'ERREUR POSSIBLE'}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, lineHeight: 1.08}}>{back ? (l2 as string) : (l as string)}</div></div>
            </div>
          </Abs>;
        })}
        {t > 933.2 && <Abs x={60} y={780} w={960} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb(GREEN, 6), color: '#fff', padding: '10px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 40, display: 'flex', alignItems: 'center', gap: 14, transform: `scale(${Math.min(1, sp(t, 933.2))})`}}>probabilité d'erreur <span style={{display: 'inline-block', transform: `translateY(${Math.sin(t * 6) * 6}px)`}}><F n="baisse" size={54} /></span></div></Abs>}
      </>}
    </Out>
  );
};

/* ═════════════ CONCLUSION ═════════════ */
const FAM: [number[], number, string][] = [[[0], 952.4, 'identifier les dangers'], [[1], 953.4, 'risques préliminaires'], [[2], 957.2, 'déviations des procédés'], [[7, 8], 961.4, 'causes · conséquences'], [[9, 12], 967.8, 'barrières de sécurité'], [[13], 969.6, 'quantifier les risques'], [[14], 971.46, 'facteurs humains']];
const famAt = (t: number) => FAM.reduce((a, x, k) => (t >= x[1] ? k : a), -1);
const C1: React.FC = () => {
  const t = useT();
  return (
    <Out end={950.3}>
      <Heads h={[[936.7, ['Terminus'], [0]], [939.0, ['15', 'méthodes'], [0]], [944.7, ['Pas le même', 'objectif'], [1]]]} />
      {t < 940.2 && <Abs x={60} y={470} w={960} h={880} style={{...nb('#000', 9), overflow: 'hidden', opacity: pop(t, 936.7)}}>
        <Img src={staticFile('metroiso-gen/metro/terminus.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.05 + (t - 936.6) * 0.02})`}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 60, display: 'flex', justifyContent: 'center'}}><div style={{...nb(NIGHT, 8), borderColor: BLUE, color: '#fff', padding: '14px 40px', fontFamily: sansFont, fontWeight: 900, fontSize: 76, letterSpacing: 6, boxShadow: `0 0 40px ${BLUE}`, transform: `scale(${Math.min(1, sp(t, 936.8))})`}}>TERMINUS</div></div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 50, display: 'flex', justifyContent: 'center'}}><NBadge at={937.4} text="CONCLUSION GÉNÉRALE" bg={GREEN} rot={-2} size={34} /></div>
      </Abs>}
      {t > 940.0 && <Grid15 at={940.2} y={500} hi={(k, tt) => (tt > 946.9 ? 0.6 + 0.4 * Math.sin(tt * 4 + k) : 0)} />}
      {t > 942.7 && <Abs x={60} y={1150} w={960} style={{display: 'flex', justifyContent: 'center', gap: 12, opacity: pop(t, 942.7)}}>{['usine', 'chantier', 'pasteque', 'eclair', 'camion'].map((ic, k) => <div key={ic} style={{...nb('#fff', 4), padding: 8, transform: `scale(${Math.min(1, sp(t, 942.8 + k * 0.12))})`}}><F n={ic} size={64} /></div>)}</Abs>}
    </Out>
  );
};
const C2: React.FC = () => {
  const t = useT();
  const f = famAt(t);
  return (
    <Out end={972.7}>
      <Heads h={[[950.2, ['Chaque', 'méthode', 'son objectif'], [2]], [952.4, ['Identifier'], [0]], [953.4, ['Préliminaire'], [0]], [957.2, ['Déviations'], [0]], [961.4, ['Causes', '·', 'conséquences'], [0, 2]], [966.2, ['Barrières', '·', 'chiffres', '·', 'humain'], [0, 2, 4]]]} />
      <Grid15 at={950.0} y={500} dim={f >= 0 ? 0.75 : 0} hi={(k, tt) => { const ff = famAt(tt); return ff >= 0 && FAM[ff][0].includes(k) ? 1 : 0; }} />
      {f >= 0 && <Abs x={60} y={1150} w={960} style={{textAlign: 'center'}}><div key={f} style={{display: 'inline-block', ...nb(NBK, 7), color: '#fff', padding: '12px 30px', fontFamily: sansFont, fontWeight: 900, fontSize: 46, transform: `scale(${Math.min(1, sp(t, FAM[f][1]))})`}}>{FAM[f][2]}</div></Abs>}
    </Out>
  );
};
const C3: React.FC = () => {
  const t = useT();
  return (
    <Out end={981.8}>
      <Heads h={[[972.6, ['Le choix', 'dépend de'], [0]], [976.0, ['Activité', '·', 'système'], [0, 2]], [978.1, ['Complexité', '·', 'objectif'], [0, 2]]]} />
      {[['usine', "L'activité", 976.0], ['engrenage', 'Le système étudié', 976.7], ['puzzle', 'La complexité des risques', 978.1], ['cible', "L'objectif recherché", 979.5]].map(([ic, l, a], k) => <GH key={k} x={60 + (k % 2) * 650} y={480 + Math.floor(k / 2) * 330} w={310} h={290} at={a as number} ic={ic as string} l={l as string} c={GREEN} fs={28} />)}
      <svg width={1080} height={900} style={{position: 'absolute', left: 0, top: 470}}>{[[370, 155], [710, 155], [370, 485], [710, 485]].map(([x, y], k) => <path key={k} d={`M ${x} ${y} L ${x < 540 ? 440 : 640} ${y} L 540 330`} fill="none" stroke={GREEN} strokeWidth={8} strokeDasharray="16 10" strokeDashoffset={-t * 60} opacity={prog(t, [976.0, 976.7, 978.1, 979.5][k], [976.0, 976.7, 978.1, 979.5][k] + 0.4)} />)}</svg>
      <Abs x={390} y={690} w={300} h={220} style={{...nb(NBK, 8), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', opacity: pop(t, 973.7)}}>
        <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: YEL}}>CHOIX DE</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40}}>LA MÉTHODE</div>
        <div style={{marginTop: 8, height: 50, width: 240, overflow: 'hidden', background: '#fff', borderRadius: 10, border: `3px solid ${YEL}`, position: 'relative'}}>{ACR.map((a, k) => <div key={k} style={{position: 'absolute', left: 0, right: 0, top: ((k * 50 - (t - 973) * 420) % 750 + 750) % 750 - 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: NBK, filter: 'blur(1.5px)'}}>{a}</div>)}</div>
      </Abs>
      <Abs x={60} y={1230} w={960} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={980.0} text="LA MÉTHODE ADAPTÉE" bg={GREEN} rot={-2} size={30} /></Abs>
    </Out>
  );
};
const C4: React.FC = () => {
  const t = useT();
  return (
    <Out end={992.4}>
      <Heads h={[[981.7, ['Retenez', 'ceci'], [0]], [983.8, ['Ne suffit', 'pas'], [0]], [986.0, ['Analyser', '·', 'évaluer'], [0, 2]], [989.2, ['Mesures', 'efficaces'], [1]]]} />
      <StairSteps c={GREEN} y={480} h={820} items={[['Identifier un danger', 983.8, 'loupe'], ['Analyser le risque', 986.0, 'cerveau'], ['Évaluer sa criticité', 987.72, 'balance'], ['Mesures de prévention efficaces', 990.12, 'bouclier']]} />
      {t > 984.9 && <Abs x={640} y={500} w={400}><NBadge at={984.9} text="NE SUFFIT PAS" bg={RED} rot={4} size={30} /></Abs>}
    </Out>
  );
};
const C5: React.FC = () => {
  const t = useT();
  return (
    <Out end={1001.9}>
      <Heads h={[[992.3, ['Un bon', 'professionnel QHSE'], [1]], [994.6, ['Pas', 'les noms'], [1]], [996.5, ['Choisir', '·', 'appliquer', '·', 'exploiter'], [0, 2, 4]]]} />
      <Abs x={60} y={480} w={960} h={300} style={{...nb('#fff', 7), opacity: pop(t, 992.5), padding: 20, display: 'flex', flexWrap: 'wrap', gap: 10, alignContent: 'center', justifyContent: 'center', filter: t > 995.8 ? 'grayscale(1)' : undefined}}>
        {ACR.map((a, k) => <div key={k} style={{...nb(MC[k], 3), color: '#fff', padding: '4px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, transform: `scale(${Math.min(1, sp(t, 992.6 + k * 0.05))})`}}>{a}</div>)}
        {t > 994.6 && <div style={{position: 'absolute', left: 30, right: 30, top: '50%', height: 14, background: RED, transform: `scaleX(${prog(t, 995.6, 996.2, easeOut)}) rotate(-4deg)`, transformOrigin: '0 50%'}} />}
        {t > 994.6 && <div style={{position: 'absolute', right: 20, bottom: -24}}><NBadge at={994.6} text="CONNAÎTRE LES NOMS" bg={NBK} rot={3} size={24} /></div>}
      </Abs>
      {t > 996.4 && <Photo src="promo/terrain-controle.jpg" x={60} y={830} w={960} h={520} at={996.5} c={GREEN} pos="50% 40%" tag="SUR LE TERRAIN" />}
      {t > 997.4 && <Abs x={60} y={1150} w={960} style={{display: 'flex', justifyContent: 'center', gap: 12}}>{[['Choisir', 997.4, 'cible'], ['Appliquer', 997.9, 'outils'], ['Exploiter', 998.6, 'graphique']].map(([l, a, ic]) => t > (a as number) && <div key={l as string} style={{...nb('#fff', 5), borderColor: GREEN, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 34, transform: `scale(${Math.min(1, sp(t, a as number))})`}}><F n={ic as string} size={50} />{l as string}</div>)}</Abs>}
    </Out>
  );
};
const CHK = [2, 3, 0, 9, 7, 4, 13];
const C6: React.FC = () => {
  const t = useT();
  const comment = 'HAZOP, AMDEC, Bow-tie…';
  return (
    <Out end={1013.5}>
      <Heads h={[[1001.8, ['Question', 'pour vous'], [1]], [1003.9, ['Lesquelles', 'connaissez-vous ?'], [1]], [1006.8, ['Lesquelles', 'appliquez-vous ?'], [1]], [1009.9, ['En', 'commentaire'], [1]]]} />
      {t < 1009.9 && <Grid15 at={1002.0} y={500} check={(k, tt) => CHK.slice(0, Math.max(0, Math.floor((tt - 1004.0) / 0.35))).includes(k)} hi={(k, tt) => (tt > 1006.8 && CHK.slice(0, 3).includes(k) ? 1 : 0)} />}
      {t < 1009.9 && <Abs x={60} y={1150} w={960} style={{display: 'flex', justifyContent: 'center', opacity: pop(t, 1003.9)}}><div style={{...nb(NBK, 6), color: '#fff', padding: '10px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 40}}>{t > 1006.8 ? 'et lesquelles appliquez-vous ?' : 'lesquelles connaissez-vous ?'}</div></Abs>}
      {t > 1009.9 && <Abs x={60} y={520} w={960} h={700} style={{...nb('#fff', 8), opacity: pop(t, 1009.9), padding: 30}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16}}><F n="bulle" size={70} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40}}>Commentaires</div></div>
        {[0, 1].map((k) => <div key={k} style={{marginTop: 26, display: 'flex', gap: 14, alignItems: 'center', opacity: 0.35}}><div style={{width: 64, height: 64, borderRadius: 32, background: '#DDE3EA'}} /><div style={{flex: 1, height: 22, borderRadius: 11, background: '#E8ECF1'}} /></div>)}
        <div style={{position: 'absolute', left: 30, right: 30, bottom: 30, height: 110, border: `5px solid ${NBK}`, borderRadius: 55, display: 'flex', alignItems: 'center', padding: '0 20px 0 34px', gap: 16}}>
          <div style={{flex: 1, fontFamily: sansFont, fontWeight: 800, fontSize: 36}}>{comment.slice(0, Math.floor(comment.length * prog(t, 1010.3, 1011.6, lin)))}<span style={{opacity: Math.floor(t * 4) % 2, color: GREEN}}>|</span></div>
          <div style={{width: 80, height: 80, borderRadius: 40, background: GREEN, border: `4px solid ${NBK}`, color: '#fff', fontSize: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${t > 1011.7 && t < 1012.0 ? 0.85 : 1})`}}>➤</div>
        </div>
      </Abs>}
    </Out>
  );
};
const C7: React.FC = () => {
  const t = useT();
  const clickS = t > 1015.6 && t < 1015.9;
  const clickA = t > 1016.6 && t < 1016.9;
  return (
    <Out end={OUTRO_AT}>
      <Heads h={[[1013.4, ['Partagez'], [0]], [1016.2, ['Abonnez-vous'], [0]], [1019.2, ['Qualité', '·', 'hygiène', '·', 'sécurité', '·', 'environnement'], [0, 2, 4, 6]], [1022.6, ['À très', 'bientôt'], [1]]]} />
      <Abs x={60} y={520} w={960} style={{display: 'flex', justifyContent: 'center', gap: 30}}>
        <div style={{...nb(t > 1015.6 ? BLUE : '#fff', 7), color: t > 1015.6 ? '#fff' : INK, padding: '20px 34px', fontFamily: sansFont, fontWeight: 900, fontSize: 44, display: 'flex', alignItems: 'center', gap: 12, transform: `scale(${clickS ? 0.9 : Math.min(1, sp(t, 1013.6))})`}}><F n="telephone" size={60} />Partager</div>
        <div style={{...nb(t > 1016.6 ? RED : '#fff', 7), color: t > 1016.6 ? '#fff' : INK, padding: '20px 34px', fontFamily: sansFont, fontWeight: 900, fontSize: 44, display: 'flex', alignItems: 'center', gap: 12, transform: `scale(${clickA ? 0.9 : Math.min(1, sp(t, 1013.9))})`}}><F n="cloche" size={60} />{t > 1016.6 ? 'Abonné ✓' : "S'abonner"}</div>
      </Abs>
      {t < 1017.4 && <div style={{position: 'absolute', left: lerp(900, t < 1015.9 ? 330 : 760, prog(t, t < 1015.9 ? 1014.6 : 1015.9, t < 1015.9 ? 1015.5 : 1016.5, easeInOut)), top: 600, zIndex: 20}}><svg width={60} height={72} viewBox="0 0 24 30"><path d="M2 2 L2 24 L8 18 L12 28 L16 26 L12 17 L20 17 Z" fill="#fff" stroke={INK} strokeWidth={2} strokeLinejoin="round" /></svg></div>}
      <Abs x={60} y={760} w={960} style={{display: 'flex', justifyContent: 'center', gap: 16}}>{[['Q', 'Qualité', BLUE, 1019.2], ['H', 'Hygiène', TEAL, 1020.6], ['S', 'Sécurité', ORANGE, 1021.3], ['E', 'Environnement', GREEN, 1021.8]].map(([L, l, c, a]) => t > (a as number) && <div key={L as string} style={{width: 210, height: 230, ...nb(c as string, 7), color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1, sp(t, a as number))})`}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 120, lineHeight: 1}}>{L as string}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: (l as string).length > 10 ? 22 : 28}}>{l as string}</div></div>)}</Abs>
      {t > 1022.6 && <Abs x={60} y={1080} w={960} style={{textAlign: 'center'}}><div style={{display: 'inline-block', fontFamily: handFont, fontSize: 96, color: GREEN, transform: `rotate(-3deg) scale(${Math.min(1, sp(t, 1022.6))})`}}>À très bientôt !</div></Abs>}
    </Out>
  );
};

/* ═════════════ Montage, bruitage ═════════════ */
const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.2}];
const RAMES: [number, number][] = [[113.4, 2], [242.2, 4], [352.4, 6], [404.2, 7], [531.3, 9], [591.3, 10], [702.8, 12], [762.2, 13], [870.3, 15]];
const DRUMS: number[] = [54.7, 114.6, 172.2, 242.9, 304.2, 353.1, 404.9, 469.5, 532.0, 592.0, 658.1, 703.5, 762.9, 818.1, 871.0];
const drumCues = (a: number): Sfx[] => [...rep(a, 14, 0.06, 'tick', 0.16), ...rep(a + 0.84, 6, 0.13, 'tick', 0.13), {at: a + 1.7, s: 'sfx/thud', v: 0.45}, {at: a + 1.75, s: 'sfx/ding', v: 0.25}];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...RAMES.flatMap(([a]) => [{at: a, s: 'riser', v: 0.3, dur: 1.0}, {at: a + 0.95, s: 'sfx/whoosh', v: 0.45}, {at: a + 1.0, s: 'deep-hit', v: 0.35}] as Sfx[]),
  ...DRUMS.flatMap(drumCues), ...STATIONS.map((r) => ({at: r.at + 0.2, s: 'sfx/bell', v: 0.18})),
  ...[5.39, 5.94, 6.59].map((at) => ({at, s: 'sfx/pop', v: 0.28})), {at: 10.2, s: 'tampon', v: 0.35}, {at: 20.05, s: 'sfx/whoosh', v: 0.3}, {at: 22.04, s: 'sfx/whoosh', v: 0.3}, {at: 23.0, s: 'deep-hit', v: 0.4},
  ...[25.67, 26.4, 28.31, 30.85].map((at) => ({at, s: 'sfx/pop', v: 0.26})), {at: 33.3, s: 'sfx/click', v: 0.2}, {at: 38.17, s: 'validation', v: 0.3}, {at: 38.7, s: 'sfx/click', v: 0.45}, ...rep(39.5, 8, 0.07, 'sfx/ding', 0.08), {at: 44.7, s: 'sfx/rise', v: 0.3, dur: 5},
  ...[67.22, 68.35, 68.94, 69.52].map((at) => ({at, s: 'sfx/pop', v: 0.24})), ...rep(72.0, 8, 0.5, 'tick', 0.12), {at: 75.95, s: 'alarme', v: 0.12, dur: 1.2}, {at: 78.3, s: 'deep-hit', v: 0.4},
  ...[82.59, 84.31, 86.61, 88.88].map((at) => ({at, s: 'sfx/bell', v: 0.2})), {at: 100.2, s: 'tampon', v: 0.4}, ...[104.13, 105.51, 106.83, 107.85, 109.55].map((at) => ({at, s: 'sfx/pop', v: 0.24})), {at: 110.6, s: 'tampon', v: 0.3},
  ...[120.51, 121.59, 123.49, 125.01].map((at) => ({at, s: 'sfx/pop', v: 0.24})), ...[132.9, 133.36, 133.8, 135.2, 136.13, 137.29].map((at) => ({at, s: 'sfx/thud', v: 0.22})), ...[151.55, 152.11, 152.63, 154.31].map((at) => ({at, s: 'sfx/pop', v: 0.24})), ...[158.69, 159.89, 161.43, 163.26].map((at) => ({at, s: 'sfx/swish', v: 0.26})), {at: 158.7, s: 'cadenas', v: 0.3}, {at: 442.8, s: 'cadenas', v: 0.3}, {at: 167.9, s: 'tampon', v: 0.45},
  ...[185.6, 186.16, 186.58, 187.19].map((at) => ({at, s: 'sfx/swish', v: 0.24})), {at: 190.47, s: 'alarme', v: 0.12, dur: 1}, ...rep(195.4, 16, 0.15, 'tick', 0.14), ...GW.map(([, at]) => ({at, s: 'sfx/thud', v: 0.3})), ...[203.62, 205.04, 205.63, 207.1, 208.51, 209.5].map((at) => ({at, s: 'sfx/pop', v: 0.22})),
  {at: 220.72, s: 'riser', v: 0.25, dur: 1.2}, {at: 226.73, s: 'alarme', v: 0.1, dur: 1}, {at: 227.53, s: 'sfx/swish', v: 0.3}, {at: 233.94, s: 'validation', v: 0.3}, {at: 237.2, s: 'tampon', v: 0.4},
  ...[253.39, 254.15, 255.29].map((at) => ({at, s: 'sfx/pop', v: 0.24})), {at: 257.6, s: 'soft-whoosh', v: 0.3, dur: 1}, ...[261.62, 262.99, 264.39, 265.4].map((at) => ({at, s: 'sfx/bell', v: 0.2})), ...[271.1, 271.7, 273.55].map((at) => ({at, s: 'deep-hit', v: 0.35})), {at: 273.9, s: 'tampon', v: 0.4},
  ...[284.61, 285.19, 285.71, 287.12].map((at) => ({at, s: 'sfx/pop', v: 0.24})), ...[293.55, 294.52, 296.13].map((at) => ({at, s: 'sfx/pop', v: 0.24})), {at: 298.9, s: 'tampon', v: 0.4},
  ...[319.82, 320.89, 322.19, 323.42].map((at) => ({at, s: 'sfx/pop', v: 0.24})), ...[328.8, 332.2, 336.4].map((at) => ({at, s: 'notification', v: 0.22})), ...rep(328.9, 16, 0.08, 'sfx/click', 0.06), {at: 330.6, s: 'sfx/swish', v: 0.3}, {at: 334.9, s: 'sfx/thud', v: 0.4}, {at: 339.6, s: 'alarme', v: 0.12, dur: 1}, {at: 351.5, s: 'tampon', v: 0.3},
  {at: 362.9, s: 'soft-whoosh', v: 0.35, dur: 1.2}, ...[368.17, 369.85, 371.15, 372.92, 374.44].map((at) => ({at, s: 'sfx/bell', v: 0.2})), {at: 382.1, s: 'tampon', v: 0.4}, ...[384.7, 388.3, 391.7].map((at) => ({at, s: 'sfx/pop', v: 0.26})), ...[399.0, 399.6, 400.2].map((at) => ({at, s: 'validation', v: 0.18})),
  {at: 413.9, s: 'sfx/swish', v: 0.4}, {at: 414.4, s: 'deep-hit', v: 0.3}, ...[422.88, 424.62, 426.5, 427.85].map((at) => ({at, s: 'sfx/pop', v: 0.24})), ...JST.map(([, , at]) => ({at, s: 'sfx/bell', v: 0.22})), {at: 456.8, s: 'sfx/whoosh', v: 0.3}, {at: 464.2, s: 'tampon', v: 0.4},
  ...rep(488.0, 6, 0.25, 'sfx/pop', 0.16), {at: 494.44, s: 'sfx/thud', v: 0.35}, {at: 495.78, s: 'sfx/thud', v: 0.35}, {at: 498.4, s: 'sfx/click', v: 0.35}, {at: 499.6, s: 'sfx/click', v: 0.35}, {at: 500.4, s: 'validation', v: 0.3}, {at: 504.7, s: 'sfx/click', v: 0.35}, {at: 506.0, s: 'validation', v: 0.3}, ...[519.13, 520.59, 521.67, 523.4].map((at) => ({at, s: 'sfx/pop', v: 0.24})), {at: 528.4, s: 'deep-hit', v: 0.4},
  {at: 543.2, s: 'soft-whoosh', v: 0.4, dur: 1}, ...[568.29, 571.7, 575.08].map((at) => ({at, s: 'sfx/swish', v: 0.28})), {at: 582.33, s: 'validation', v: 0.3}, {at: 584.72, s: 'alarme', v: 0.14, dur: 1.2},
  ...[597.6, 599.7, 601.3].map((at) => ({at, s: 'sfx/pop', v: 0.24})), {at: 603.4, s: 'soft-whoosh', v: 0.3, dur: 1}, ...[627.47, 627.98, 628.85, 632.89, 635.28, 636.37, 640.28, 640.76, 641.64, 646.37, 647.48, 649.47].map((at) => ({at, s: 'sfx/pop', v: 0.2})),
  {at: 669.24, s: 'riser', v: 0.2, dur: 1}, {at: 672.0, s: 'deep-hit', v: 0.35}, {at: 674.39, s: 'alarme', v: 0.1, dur: 1}, ...[686.0, 687.76, 688.6, 688.92, 689.96].map((at) => ({at, s: 'sfx/pop', v: 0.22})), {at: 698.0, s: 'soft-whoosh', v: 0.35, dur: 1.4},
  ...[718.98, 719.56, 720.14].map((at) => ({at, s: 'sfx/pop', v: 0.24})), {at: 722.9, s: 'validation', v: 0.3}, ...HST.map(([, , at]) => ({at, s: 'sfx/pop', v: 0.2})), ...[745.8, 748.35, 749.76].map((at) => ({at, s: 'alarme', v: 0.08, dur: 0.6})), ...[752.57, 754.54, 756.38, 757.2].map((at) => ({at, s: 'sfx/pop', v: 0.22})), {at: 760.26, s: 'tampon', v: 0.4},
  {at: 773.0, s: 'riser', v: 0.25, dur: 4.5}, {at: 778.46, s: 'validation', v: 0.3}, ...[780.89, 782.52, 784.21, 787.66].map((at) => ({at, s: 'sfx/bell', v: 0.2})), {at: 799.75, s: 'alarme', v: 0.14, dur: 1.4}, {at: 801.19, s: 'sfx/thud', v: 0.4}, {at: 802.97, s: 'sfx/pop', v: 0.24}, ...[805.0, 805.4, 805.8].map((at) => ({at, s: 'validation', v: 0.16})),
  {at: 832.77, s: 'tampon', v: 0.35}, ...[838.34, 840.09, 842.39, 843.71, 845.32].map((at) => ({at, s: 'sfx/thud', v: 0.22})), {at: 854.25, s: 'tension', v: 0.2, dur: 2}, ...[860.36, 861.21, 862.22].map((at) => ({at, s: 'deep-hit', v: 0.28})), {at: 866.3, s: 'sfx/whoosh', v: 0.3},
  {at: 881.33, s: 'alarme', v: 0.1, dur: 0.8}, ...HF.map(([, , at]) => ({at, s: 'sfx/pop', v: 0.22})), ...[895.81, 897.7, 900.9, 903.6, 905.8].map((at) => ({at, s: 'sfx/bell', v: 0.2})), ...[916.95, 918.96, 921.59, 922.68].map((at) => ({at, s: 'sfx/pop', v: 0.24})), ...[927.12, 928.51, 930.03, 932.07].map((at) => ({at, s: 'sfx/swish', v: 0.24})), {at: 933.2, s: 'validation', v: 0.3},
  {at: 936.7, s: 'sfx/bell', v: 0.35}, ...rep(940.2, 8, 0.07, 'sfx/ding', 0.08), ...FAM.map(([, at]) => ({at, s: 'sfx/pop', v: 0.24})), ...[976.0, 976.7, 978.1, 979.5].map((at) => ({at, s: 'sfx/pop', v: 0.24})), ...rep(983.8, 1, 1, 'sfx/thud', 0.3), {at: 984.9, s: 'tampon', v: 0.35}, ...[986.0, 987.72, 990.12].map((at) => ({at, s: 'sfx/thud', v: 0.24})),
  {at: 995.6, s: 'stylo', v: 0.3, dur: 0.6}, ...[997.4, 997.9, 998.6].map((at) => ({at, s: 'sfx/pop', v: 0.24})), ...rep(1004.0, 7, 0.35, 'sfx/click', 0.2), ...rep(1010.3, 12, 0.1, 'sfx/click', 0.06), {at: 1011.7, s: 'notification', v: 0.3}, {at: 1015.6, s: 'sfx/click', v: 0.45}, {at: 1016.6, s: 'sfx/click', v: 0.45}, {at: 1016.7, s: 'validation', v: 0.3}, ...[1019.2, 1020.6, 1021.3, 1021.8].map((at) => ({at, s: 'sfx/pop', v: 0.26})),
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SCN: [React.FC, number, number][] = [[Intro1, 2.5, 15.5], [Intro2, 15.3, 24.25], [Intro3, 24.1, 32.8], [Intro4, 32.6, 44.8], [Intro5, 44.6, 51.3], [M1, 54.5, 113.7], [M2, 114.3, 168.7], [M3, 172.0, 242.4], [M4, 242.8, 300.5], [M5, 304.0, 352.7], [M6, 352.9, 404.4], [M7, 404.7, 466.0], [M8, 469.3, 531.5], [M9, 531.8, 591.5], [M10, 591.8, 654.6], [M11, 658.0, 703.1], [M12, 703.3, 762.5], [M13, 762.7, 814.6], [M14, 818.0, 870.6], [M15, 870.8, 936.6], [C1, 936.5, 950.4], [C2, 950.1, 972.8], [C3, 972.5, 981.9], [C4, 981.6, 992.5], [C5, 992.2, 1002.0], [C6, 1001.7, 1013.6], [C7, 1013.3, OUTRO_AT]];
/** Calque commun aux deux formats : scènes + transitions + rame + bandeau de station (coordonnées 1080 × 1920). */
const MRStage: React.FC = () => (
  <>
    {SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    {RAMES.map(([a, n]) => <Gate key={a} from={a} to={a + 1.5}><RameWipe at={a} n={n} /></Gate>)}
    <Gate from={936.6} to={937.5}><GyroFlash at={936.6} /></Gate>
    <Gate from={2.8} to={OUTRO_AT}><StationBanner /></Gate>
  </>
);
export const MethodesRisquesMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <MRStage />
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-methodes-risques-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

/* ═════════════ VERSION YOUTUBE 16:9 (1920 × 1080) ═════════════ */
const ST_X = 60, ST_Y = 95, ST_S = 0.8, ST_TOP = 295;
const LBg: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill style={{background: PAPER}}>
      <AbsoluteFill style={{backgroundImage: 'linear-gradient(rgba(20,33,61,0.045) 2px, transparent 2px), linear-gradient(90deg, rgba(20,33,61,0.045) 2px, transparent 2px)', backgroundSize: '60px 60px', backgroundPosition: `${(t * 5) % 60}px 0`}} />
      <div style={{position: 'absolute', right: -160, top: 120 + Math.sin(t * 0.3) * 30, width: 420, height: 420, borderRadius: 210, background: `${YEL}22`}} />
      <div style={{position: 'absolute', left: 820, top: 820 + Math.cos(t * 0.25) * 30, width: 360, height: 360, borderRadius: 180, background: `${BLUE}10`}} />
    </AbsoluteFill>
  );
};
/** Plan de ligne vertical : les 15 méthodes comme 15 stations (équivalent visuel des chapitres YouTube). */
const LMetro: React.FC = () => {
  const t = useT();
  const cur = STATIONS.reduce((a, x, k) => (t >= x.at ? k : a), -1);
  const fin = t >= 936.6;
  const RH = 46, Y0 = 318, X = 1046;
  const mv = cur <= 0 ? 1 : prog(t, STATIONS[cur].at - 0.8, STATIONS[cur].at, easeInOut);
  const ty = cur < 0 ? Y0 - 34 : lerp(Y0 + Math.max(0, cur - 1) * RH, Y0 + cur * RH, cur === 0 ? 1 : mv);
  return (
    <>
      <Abs x={990} y={244} w={880} h={772} style={{background: 'rgba(255,255,255,0.94)', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `8px 8px 0 ${NAVY}`}} />
      <Abs x={1020} y={256} w={820} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM, letterSpacing: 3}}><span>LIGNE · 15 MÉTHODES</span><span style={{color: fin ? GREEN : NAVY}}>{fin ? 'TERMINUS ✓' : cur < 0 ? 'DÉPART' : `STATION ${String(cur + 1).padStart(2, '0')} / 15`}</span></Abs>
      <div style={{position: 'absolute', left: X - 6, top: Y0, width: 12, height: 14 * RH, borderRadius: 6, background: `linear-gradient(180deg, ${ORANGE}, ${BLUE}, ${VIO}, ${TEAL}, ${NAVY}, ${GREEN})`}} />
      {STATIONS.map((x, k) => {
        const [acr, name] = x.l.split(' — ');
        const here = k === cur && !fin;
        const past = k < cur || fin;
        const y = Y0 + k * RH;
        return (
          <React.Fragment key={k}>
            {here && <div style={{position: 'absolute', left: X + 26, top: y - 21, width: 790, height: 42, borderRadius: 12, background: MC[k], border: `3px solid ${INK}`, boxShadow: `4px 4px 0 ${INK}`, transform: `scaleX(${Math.min(1, sp(t, x.at))})`, transformOrigin: '0 50%'}} />}
            <div style={{position: 'absolute', left: X - 15, top: y - 15, width: 30, height: 30, borderRadius: 15, background: past ? GREEN : here ? '#fff' : '#fff', border: `4px solid ${past ? INK : here ? MC[k] : '#9FB3CC'}`, boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: here ? `0 0 16px ${MC[k]}` : 'none'}}>{past ? '✓' : ''}</div>
            <div style={{position: 'absolute', left: X + 40, top: y - 17, display: 'flex', alignItems: 'baseline', gap: 12, whiteSpace: 'nowrap'}}>
              <span style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: here ? '#fff' : past ? GREEN : '#A9B1BE'}}>{String(k + 1).padStart(2, '0')}</span>
              <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: here ? '#fff' : past ? INK : '#8A94A6'}}>{acr}</span>
              <span style={{fontFamily: sansFont, fontWeight: 700, fontSize: 19, color: here ? '#fff' : '#8A94A6'}}>{name}</span>
            </div>
          </React.Fragment>
        );
      })}
      {!fin && <Img src={staticFile('metroiso-gen/metro/rame-dessus.png')} style={{position: 'absolute', left: X - 50, top: ty - 17, width: 100, height: 34, transform: 'rotate(90deg)', filter: 'drop-shadow(0 0 8px rgba(120,180,255,0.9))'}} />}
    </>
  );
};
/** Couverture paysage = miniature YouTube : photo en diagonale + « 15 MÉTHODES » en lettres-photos animées. */
const LCover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 90, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, overflow: 'hidden', clipPath: 'polygon(0 0, 46% 0, 34% 100%, 0 100%)'}}><Img src={PH(IMG.c2)} style={{width: 1100, height: 1080, objectFit: 'cover', objectPosition: '50% 50%', transform: `scale(${1.04 + t * 0.02})`}} /></div>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, clipPath: 'polygon(46% 0, 47.2% 0, 35.2% 100%, 34% 100%)', background: YEL}} />
      <Abs x={1470} y={40} w={400} style={{display: 'flex', justifyContent: 'flex-end'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 26px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)'}}><Img src={staticFile(LOGO)} style={{height: 80, display: 'block'}} /></div></Abs>
      <Abs x={790} y={150} w={1100} style={{display: 'flex', alignItems: 'flex-end', gap: 26}}>
        <PhotoLetterAnim ch="15" src={IMG.c2} size={330} ls={4} seed={3} />
        <div style={{paddingBottom: 36}}><PhotoLetterAnim ch="MÉTHODES" src={IMG.c1} size={112} ls={2} seed={6} /></div>
      </Abs>
      <Abs x={800} y={540} w={1100}><div style={{display: 'inline-block', ...nb(NBK, 7), color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 70, padding: '8px 34px', transform: `rotate(-2deg) scale(${1 + 0.02 * Math.sin(t * 4)})`}}>d'analyse des <span style={{color: YEL}}>risques</span></div></Abs>
      <Abs x={800} y={720} w={1080} style={{display: 'flex', flexWrap: 'wrap', gap: 12}}>{ACR.map((a, k) => <div key={k} style={{...nb(MC[k], 4), color: '#fff', padding: '6px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, transform: `translateY(${Math.sin(t * 3 + k * 0.6) * 4}px)`}}>{a}</div>)}</Abs>
      <Abs x={800} y={930} w={1080} style={{fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: DIM}}>PRINCIPE · SCHÉMA · EXEMPLE CONCRET</Abs>
    </AbsoluteFill>
  );
};
export const MethodesRisquesYoutube: React.FC = () => (
  <AbsoluteFill style={{background: PAPER, overflow: 'hidden'}}>
    <LBg />
    <div style={{position: 'absolute', left: ST_X - 10, top: ST_Y - 10, width: 1080 * ST_S + 20, height: 1100 * ST_S + 20, border: `5px solid ${INK}`, borderRadius: 26, boxShadow: `9px 9px 0 ${BURG}`, background: PAPER, boxSizing: 'border-box'}} />
    <div style={{position: 'absolute', left: ST_X, top: ST_Y, width: 1080 * ST_S, height: 1100 * ST_S, overflow: 'hidden', borderRadius: 18}}>
      <div style={{position: 'absolute', left: 0, top: -ST_TOP * ST_S, width: 1080, height: 1920, transform: `scale(${ST_S})`, transformOrigin: '0 0'}}>
        <Bg />
        <MRStage />
      </div>
    </div>
    <Gate from={2.6} to={OUTRO_AT}><LMetro /></Gate>
    <div style={{position: 'absolute', left: 968, top: -26, width: 1080, height: 320, transform: 'scale(0.84)', transformOrigin: '0 0'}}><Gate from={0} to={OUTRO_AT}><Header /></Gate></div>
    <div style={{position: 'absolute', left: ST_X + 540 * ST_S - 540, top: 0, width: 1080, height: 1080, zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} top={990} /></Gate></div>
    <Gate from={0} to={2.8}><LCover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 95, background: PAPER}}><LBg /><div style={{position: 'absolute', left: 960 - 540 * 0.75, top: 540 - 920 * 0.75, width: 1080, height: 1920, transform: 'scale(0.75)', transformOrigin: '0 0'}}><Outro at={OUTRO_AT} logo={LOGO} /></div></AbsoluteFill></Gate>
    <Audio src={staticFile('voix-methodes-risques-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn, Barred, Flap];
