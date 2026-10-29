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
import {NeoCaptions} from '../components/NeoCaptions';

/**
 * « Les 16 principes d'un système QSSE efficace » (voix d'origine, 4 min 09) — capsule « condensé + effet wahou +
 * ultra premium » présentée en métro (7 stations). Tube de verre à six guichets : les 16 principes → fondations →
 * management → les personnes → les méthodes → chef de projet ; la capsule file d'un guichet à l'autre. Gyrophare,
 * loupe, capsule pneumatique, store vénitien ; barre de recherche « système QSSE efficace » qui ouvre les principes.
 * Chaque principe « slamme » son numéro (tel que prononcé : la voix énonce 1→13, un principe sans numéro (★), puis
 * reprend 11→16), puis photo ou mini-scène animée et puces synchronisées. Mini-scènes : tampon « validé par la
 * direction », corriger ✗ / anticiper ✓, service QSSE → tous les managers, contributions « + » de chacun, absence
 * d'accident ≠ risques maîtrisés, 4 moyens, boussole vs pile de documents, cloisons entre services qui tombent.
 * Final wahou : l'édifice des 20 principes se construit brique par brique de bas en haut, couronné par leadership /
 * participation / prévention / amélioration ; sondage défilant puis « S'abonner » cliqué. Illustrations générées par
 * l'utilisateur (public/principes-gen/). Kits capsule-ui-neo-brutal et capsule-recit-illustre.
 */
const IMG = {
  cover: 'principes-gen/couverture.jpg',
  c1: 'principes-gen/base.jpg',
  c2: 'principes-gen/chef-projet.jpg',
  triple: 'principes-gen/triple.jpg',
  piliers: 'principes-gen/piliers.jpg',
  base: 'principes-gen/base.jpg',
  seul: 'principes-gen/jamais-seul.jpg',
  conception: 'principes-gen/conception.jpg',
  personnel: 'principes-gen/personnel.jpg',
  fournisseurs: 'principes-gen/fournisseurs.jpg',
  conformite: 'principes-gen/conformite.jpg',
  rex: 'principes-gen/rex.jpg',
  reunions: 'principes-gen/reunions.jpg',
  valoriser: 'principes-gen/valoriser.jpg',
  chef: 'principes-gen/chef-projet.jpg',
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
const OUTRO_AT = 249.0;
export const PRINCIPES_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '1', title: 'Les 16 principes', s: 'un système QSSE efficace', c: NAVY, g: '16 principes', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 13.8, n: '2', title: 'Les fondations', s: 'principes 1 à 5', c: TEAL, g: 'fondations', k: 'gyro', lab: 'GUICHET 2 / 6'},
  {at: 66.3, n: '3', title: 'Le management', s: 'principes 6 à 9', c: BLUE, g: 'management', k: 'loupe', lab: 'GUICHET 3 / 6'},
  {at: 108.6, n: '4', title: 'Les personnes', s: 'principes 10 à 13 et ★', c: ORANGE, g: 'les personnes', k: 'tube', lab: 'GUICHET 4 / 6'},
  {at: 155.7, n: '5', title: 'Les méthodes', s: 'principes 11 à 15', c: VIO, g: 'les méthodes', k: 'store', lab: 'GUICHET 5 / 6'},
  {at: 209.2, n: '★', title: 'Chef de projet', s: 'le principe déterminant', c: GREEN, g: 'chef de projet', k: 'gyro', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 236.0;
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
  {n: 1, l: 'Le triple objectif', s: 'objectif', at: 15.2},
  {n: 2, l: 'Les 5 piliers', s: 'piliers', at: 26.6},
  {n: 3, l: 'Validé par la direction', s: 'direction', at: 58.4},
  {n: 4, l: 'Dès la conception', s: 'conception', at: 90.4},
  {n: 5, l: 'Aider le personnel', s: 'personnel', at: 109.8},
  {n: 6, l: 'Retours d’expérience', s: 'REX', at: 178.3},
  {n: 7, l: 'Chef de projet', s: 'chef de projet', at: 211.6},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE QSSE · STATION {r.n} / 7</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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

/* ═════════════ Les 20 principes tels que prononcés ═════════════ */
const PR: [string, string, string][] = [['1', 'triple objectif', TEAL], ['2', '5 piliers', TEAL], ['3', 'de bas en haut', TEAL], ['4', 'jamais seul', TEAL], ['5', 'validé par la direction', TEAL], ['6', 'prévention + amélioration', BLUE], ['7', 'acte de management', BLUE], ['8', 'dès la conception', BLUE], ['9', 'fournisseurs', BLUE], ['10', 'aider le personnel', ORANGE], ['11', 'impliquer chacun', ORANGE], ['12', 'aspect sécurité', ORANGE], ['13', 'conformité du site', ORANGE], ['★', 'donner les moyens', ORANGE], ['11', 'référentiels guides', VIO], ['12', 'approche processus', VIO], ['13', 'retours d’expérience', VIO], ['14', 'réunions courtes', VIO], ['15', 'valoriser', VIO], ['16', 'chef de projet', GREEN]];

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="batiment" w={1080} h={820} pos="45% 30%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 24%, ${PAPER}CC 32%, ${PAPER} 37%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb(NBK, 5), color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3, padding: '8px 22px'}}>UN SYSTÈME QSSE EFFICACE</div></Abs>
      <Abs x={0} y={650} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="LES 16" src={IMG.c1} size={190} ls={8} /></Abs>
      <Abs x={0} y={850} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="PRINCIPES" src={IMG.c2} size={140} ls={4} seed={3} /></Abs>
      <Abs x={60} y={1040} w={960} style={{display: 'flex', justifyContent: 'center', gap: 12}}>{[['fondations', TEAL], ['management', BLUE], ['personnes', ORANGE], ['méthodes', VIO]].map(([n, c], k) => <div key={n} style={{...nb(c, 5), padding: '8px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff', transform: `translateY(${(1 - Math.min(1, spring(t, 0.3 + k * 0.1))) * 60}px)`}}>{n}</div>)}</Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={NAVY} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Slam du numéro de principe ═════════════ */
const Slam: React.FC<{at: number; n: string; title: string; c: string}> = ({at, n, title, c}) => {
  const t = useT();
  const k = t - at;
  if (k < 0 || k > 2.1) return null;
  const inn = Math.min(1, spring(t, at, 9, 12));
  const out = prog(t, at + 1.7, at + 2.1, easeIn);
  return (
    <Abs x={60} y={440} w={960} h={900} style={{opacity: 1 - out, zIndex: 12, transform: `scale(${1 + out * 0.15})`}}>
      {[0, 1, 2].map((j) => { const r = prog(t, at + 0.1 + j * 0.15, at + 1.0 + j * 0.15); return <div key={j} style={{position: 'absolute', left: 480 - r * 420, top: 300 - r * 420, width: r * 840, height: r * 840, borderRadius: '50%', border: `${10 - j * 3}px solid ${c}`, opacity: (1 - r) * 0.8}} />; })}
      {Array.from({length: 16}, (_, j) => { const a = (j / 16) * Math.PI * 2; const r = prog(t, at + 0.08, at + 0.5, easeOut); return <div key={`s${j}`} style={{position: 'absolute', left: 480 + Math.cos(a) * (150 + r * 260), top: 300 + Math.sin(a) * (150 + r * 260), width: 60, height: 8, borderRadius: 4, background: j % 2 ? c : YEL, transform: `rotate(${(a * 180) / Math.PI}deg)`, opacity: 1 - prog(t, at + 0.4, at + 0.8)}} />; })}
      <div style={{position: 'absolute', left: 0, right: 0, top: 300 - 130, display: 'flex', justifyContent: 'center', transform: `scale(${lerp(3, 1, inn)}) rotate(${(1 - inn) * -25}deg)`}}><Tile ch={n} size={260} c={c} /></div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 540, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 38, letterSpacing: 8, color: DIM, opacity: pop(t, at + 0.3)}}>{n === '★' ? 'PRINCIPE SANS NUMÉRO' : `PRINCIPE N° ${n}`}</div>
      <div style={{position: 'absolute', left: 40, right: 40, top: 610, textAlign: 'center'}}><Kin text={title} at={at + 0.45} size={title.length > 30 ? 58 : title.length > 18 ? 66 : 84} color={c} /></div>
    </Abs>
  );
};

/* ═════════════ Scène type d'un principe ═════════════ */
type CH = [string, string, number];
const P: React.FC<{n: string; at: number; end: number; title: string; hd: string; c: string; img?: string; pos?: string; slam?: boolean; chips: CH[]; vis?: React.ReactNode; hx?: HD[]; children?: React.ReactNode}> = ({n, at, end, title, hd, c, img, pos = '50% 40%', slam, chips, vis, hx = [], children}) => {
  const t = useT();
  const s0 = slam ? at + 1.9 : at;
  const tw = hd.split(' ');
  const h: HD[] = [...(slam ? [[at, ['Principe', n], [1]] as HD] : []), [s0 + 0.1, tw, [tw.length - 1]] as HD, ...chips.map(([l, , a]) => { const w = l.split(' '); return [a, w, [w.length - 1]] as HD; }), ...hx].sort((x, y) => x[0] - y[0]);
  const badge = <div style={{position: 'absolute', left: 20, top: 20, zIndex: 6}}><NBadge at={s0 + 0.2} text={`${n === '★' ? '★' : `N° ${n}`} · ${title.toUpperCase()}`} bg={c} rot={-2} size={title.length > 34 ? 22 : 26} /></div>;
  return (
    <Out end={end}>
      <Heads h={h} />
      {slam && <Slam at={at} n={n} title={title} c={c} />}
      {t > s0 && (
        <>
          {img ? <Shot src={img} ic="agent-hse" x={60} y={440} w={960} h={520} at={s0} pos={pos} c={c}>{badge}</Shot> : (
            <Abs x={60} y={440} w={960} h={520} style={{...nb('#fff', 8), boxShadow: `8px 8px 0 ${c}`, overflow: 'hidden', opacity: pop(t, s0), transform: `translateY(${(1 - pop(t, s0)) * 40}px)`, backgroundImage: 'radial-gradient(#0001 2px, transparent 2px)', backgroundSize: '22px 22px'}}>{badge}{vis}</Abs>
          )}
          <Abs x={60} y={994} w={960} style={{display: 'flex', flexWrap: 'wrap', gap: 12}}>{chips.map(([l, ic, a]) => (t > a ? <Chip key={l} at={a} ic={ic} l={l} c={c} /> : null))}</Abs>
          {children}
        </>
      )}
    </Out>
  );
};

/* ═════════════ Guichet 1 : recherche → 16 principes ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  return (
    <Out end={13.85}>
      <Heads h={[[3.2, ['Un', 'système', 'efficace', '?'], [2]], [6.6, ['16', 'principes', 'essentiels'], [0, 1]], [10.2, ['Le', 'dernier', 'est', 'déterminant'], [1, 3]]]} />
      <SearchOpen x={60} y={440} w={960} h={900} at={3.0} query="système QSSE efficace" results={['les 16 principes essentiels', 'norme ISO 45001', 'modèle de manuel QSSE']} found={0} foundAt={6.4} clickAt={6.8} c={NAVY}>
        <div style={{position: 'absolute', left: 30, top: 24, width: 900, height: 470, borderRadius: 22, overflow: 'hidden', border: `4px solid ${NBK}`}}><Img src={PH(IMG.cover)} style={{width: 900, height: 470, objectFit: 'cover', objectPosition: '50% 30%', transform: `scale(${1.1 - prog(t, 7.6, 13.5, (x: number) => x) * 0.08})`}} /><Shine at={7.8} /></div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 520, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 22}}>
          <div style={{...nb(NAVY, 7), width: 170, height: 150, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${t > 7.0 ? Math.min(1.08, spring(t, 7.0)) : 0})`}}><Count n={16} a={7.0} b={8.2} /></div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, lineHeight: 1.05, color: NAVY, opacity: pop(t, 7.4)}}>principes<br />essentiels</div>
        </div>
        {t > 11.2 && <div style={{position: 'absolute', left: 0, right: 0, top: 715, display: 'flex', justifyContent: 'center'}}><NBadge at={11.3} text="LE DERNIER EST DÉTERMINANT" bg={GREEN} rot={-2} size={34} /></div>}
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ Mini-scènes animées (principes sans photo) ═════════════ */
const Ln: React.FC<{w: number; o?: number}> = ({w, o = 0.18}) => <div style={{height: 14, borderRadius: 7, background: `rgba(0,0,0,${o})`, width: w, marginTop: 16}} />;
const V5: React.FC = () => {
  const t = useT();
  return (
    <>
      <div style={{...nb('#F3E5C8', 6), position: 'absolute', left: 60, top: 100, width: 420, height: 300, padding: 24, transform: 'rotate(-2deg)'}}>
        <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26}}>OBJECTIF QSSE</div><Ln w={330} /><Ln w={280} /><Ln w={300} />
        <div style={{display: 'flex', gap: 8, marginTop: 22}}>{['equipe', 'outils', 'argent'].map((ic, k) => <div key={ic} style={{opacity: t > [63.7, 64.1, 64.6][k] ? 1 : 0.2}}><F n={ic} size={52} /></div>)}</div>
      </div>
      <div style={{position: 'absolute', left: 560, top: 110, textAlign: 'center', opacity: pop(t, 58.2)}}><F n="directeur" size={190} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30}}>la direction</div></div>
      <Stamp at={58.7} text="VALIDÉ" c={GREEN} x={150} y={250} rot={-12} size={64} />
    </>
  );
};
const V6: React.FC = () => {
  const t = useT();
  const d = prog(t, 73.6, 75.2, easeOut);
  return (
    <div style={{position: 'absolute', left: 30, right: 30, top: 100, display: 'flex', gap: 30, alignItems: 'center', justifyContent: 'center'}}>
      <div style={{position: 'relative', ...nb('#fff', 6), width: 360, height: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: lerp(1, 0.5, prog(t, 71.2, 71.8)), transform: `scale(${pop(t, 70.2)})`}}><F n="pansement" size={130} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34}}>corriger seulement</div>{t > 71.0 && <Strk at={71.0} />}</div>
      <div style={{...nb('#fff', 6), boxShadow: `6px 6px 0 ${GREEN}`, width: 420, height: 280, padding: 16, transform: `scale(${t > 72.4 ? Math.min(1, spring(t, 72.4)) : 0})`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10}}><F n="loupe" size={64} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32}}>anticiper</span></div>
        <svg width={380} height={170}><path d="M 10 160 C 90 150, 140 120, 190 100 S 300 40, 370 12" fill="none" stroke={GREEN} strokeWidth={10} strokeLinecap="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - d}} /></svg>
      </div>
    </div>
  );
};
const V7: React.FC = () => {
  const t = useT();
  const all = prog(t, 86.2, 87.0, easeOut);
  const MG: [string, number][] = [['directeur', 160], ['superviseur', 330], ['homme-bureau', 500], ['femme-bureau', 670], ['ouvrier', 840]];
  return (
    <>
      <div style={{position: 'absolute', left: 330, top: 90, width: 300, ...nb(BLUE, 6), color: '#fff', textAlign: 'center', padding: '12px 0', fontFamily: sansFont, fontWeight: 900, fontSize: 32, opacity: pop(t, 80.0)}}>service QSSE</div>
      {t > 83.4 && t < 86.2 && <div style={{position: 'absolute', left: 660, top: 92}}><NBadge at={83.5} text="UNIQUEMENT ?" bg={RED} rot={4} size={28} /></div>}
      <svg style={{position: 'absolute', left: 0, top: 0}} width={960} height={450}>{MG.map(([, x], k) => <path key={k} d={`M 480 160 C 480 220, ${x} 220, ${x} 270`} fill="none" stroke={GREEN} strokeWidth={6} pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - all}} />)}</svg>
      {MG.map(([ic, x], k) => <div key={ic} style={{position: 'absolute', left: x - 60, top: 270, width: 120, height: 140, ...nb(all > 0.5 ? '#fff' : '#EEF1F5', 5), boxShadow: all > 0.5 ? `5px 5px 0 ${GREEN}` : `5px 5px 0 ${NBK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: lerp(0.35, 1, prog(t, 86.2 + k * 0.1, 86.6 + k * 0.1)), transform: `scale(${lerp(0.9, 1, prog(t, 86.2 + k * 0.1, 86.6 + k * 0.1))})`}}><F n={ic} size={72} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 18}}>manager</div></div>)}
    </>
  );
};
const V11: React.FC = () => {
  const t = useT();
  return (
    <>
      {Array.from({length: 10}, (_, k) => { const at = 121.4 + k * 0.22; const x = 40 + (k % 5) * 180; const y = 100 + Math.floor(k / 5) * 160; return (
        <div key={k} style={{position: 'absolute', left: x, top: y, width: 150, height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <F n={k % 2 ? 'salariee' : 'salarie'} size={96} />
          {t > at && <div style={{position: 'absolute', right: 6, top: 0, width: 50, height: 50, borderRadius: 25, background: GREEN, border: `4px solid ${NBK}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1.1, spring(t, at))})`, boxSizing: 'border-box'}}>+</div>}
        </div>
      ); })}
    </>
  );
};
const V12: React.FC = () => {
  const t = useT();
  return (
    <div style={{position: 'absolute', left: 30, right: 30, top: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}>
      <div style={{...nb('#fff', 6), boxShadow: `6px 6px 0 ${GREEN}`, width: 340, height: 250, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', transform: `scale(${pop(t, 133.6)})`}}><F n="trophee" size={110} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32}}>absence d’accident</div></div>
      <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 130, color: RED, transform: `scale(${t > 134.4 ? Math.min(1.2, spring(t, 134.4)) : 0}) rotate(${t > 134.4 ? 0 : 40}deg)`}}>≠</div>
      <div style={{...nb('#fff', 6), boxShadow: `6px 6px 0 ${RED}`, width: 340, height: 250, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', transform: `scale(${pop(t, 135.6)})`}}><F n="cadenas" size={110} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32}}>risques maîtrisés</div></div>
    </div>
  );
};
const VS: React.FC = () => {
  const t = useT();
  const M: [string, string, number][] = [['compétences', 'diplome', 149.0], ['équipements', 'casque', 150.0], ['instructions', 'clipboard', 151.1], ['conditions', 'usine', 152.3]];
  return (
    <div style={{position: 'absolute', left: 60, top: 86, display: 'grid', gridTemplateColumns: '410px 410px', gap: 20}}>
      {M.map(([l, ic, a]) => { const on = t > a; return <div key={l} style={{...nb(on ? ORANGE : '#F1F1EA', 6), height: 150, display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px', color: on ? '#fff' : DIM, transform: `scale(${on ? Math.min(1.05, spring(t, a)) : 0.95})`}}><F n={ic} size={90} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38}}>{l}</span></div>; })}
    </div>
  );
};
const V11b: React.FC = () => {
  const t = useT();
  const settle = prog(t, 159.3, 160.8, easeOut);
  const ang = lerp(-140, 0, settle) + Math.sin(t * 9) * 20 * (1 - settle);
  const pile = Math.floor(prog(t, 163.2, 164.8, (x: number) => x) * 8);
  return (
    <div style={{position: 'absolute', left: 30, right: 30, top: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 70}}>
      <div style={{textAlign: 'center', opacity: pop(t, 158.9)}}>
        <svg width={250} height={250}><circle cx={125} cy={125} r={112} fill="#fff" stroke={NBK} strokeWidth={8} />{[0, 90, 180, 270].map((dd) => <line key={dd} x1={125 + 88 * Math.cos((dd * Math.PI) / 180)} y1={125 + 88 * Math.sin((dd * Math.PI) / 180)} x2={125 + 104 * Math.cos((dd * Math.PI) / 180)} y2={125 + 104 * Math.sin((dd * Math.PI) / 180)} stroke={NBK} strokeWidth={6} />)}<g transform={`rotate(${ang} 125 125)`}><polygon points="125,28 142,125 108,125" fill={RED} stroke={NBK} strokeWidth={3} /><polygon points="125,222 142,125 108,125" fill="#C9D2DF" stroke={NBK} strokeWidth={3} /></g><circle cx={125} cy={125} r={11} fill={NBK} /></svg>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: VIO}}>un guide</div>
      </div>
      <div style={{position: 'relative', width: 260, height: 300, opacity: pop(t, 163.0)}}>
        {Array.from({length: pile}, (_, k) => <div key={k} style={{position: 'absolute', left: 20 + ((k * 13) % 30), bottom: k * 30, width: 200, height: 30, background: k % 2 ? '#F3E5C8' : '#fff', border: `4px solid ${NBK}`, borderRadius: 4, transform: `rotate(${((k * 37) % 9) - 4}deg)`}} />)}
        {t > 165.0 && <div style={{position: 'absolute', left: -20, top: 120, transform: 'rotate(-14deg)'}}><Stamp at={165.0} text="PAS UNE PILE" c={RED} x={0} y={0} rot={0} size={40} /></div>}
      </div>
    </div>
  );
};
const V12b: React.FC = () => {
  const t = useT();
  const fall = prog(t, 172.5, 173.3, easeIn);
  const coop = prog(t, 174.4, 175.6, easeOut);
  const SV = ['usine', 'outils', 'check', 'camion'];
  return (
    <>
      {SV.map((ic, k) => <div key={ic} style={{position: 'absolute', left: 50 + k * 225, top: 150, width: 170, height: 170, ...nb('#fff', 6), boxShadow: `6px 6px 0 ${coop > 0.5 ? GREEN : NBK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 169.8 + k * 0.12)}}><F n={ic} size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 20}}>service</div></div>)}
      {[0, 1, 2].map((k) => <div key={`w${k}`} style={{position: 'absolute', left: 50 + k * 225 + 180, top: 120, width: 26, height: 230, background: `repeating-linear-gradient(45deg, ${RED} 0 14px, #fff 14px 28px)`, border: `4px solid ${NBK}`, borderRadius: 6, opacity: t > 171.9 ? 1 - fall : 0, transform: `translateY(${fall * 260}px) rotate(${fall * (k % 2 ? 70 : -70)}deg)`, transformOrigin: '50% 100%'}} />)}
      <svg style={{position: 'absolute', left: 0, top: 0}} width={960} height={450}>{[0, 1, 2].map((k) => <path key={k} d={`M ${50 + k * 225 + 170} 235 L ${50 + (k + 1) * 225} 235`} stroke={GREEN} strokeWidth={8} strokeLinecap="round" markerEnd="url(#ar)" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - coop}} />)}<defs><marker id="ar" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={GREEN} /></marker></defs></svg>
      {t > 174.6 && <div style={{position: 'absolute', left: 0, right: 0, top: 360, display: 'flex', justifyContent: 'center'}}><NBadge at={174.7} text="COOPÉRATION" bg={GREEN} rot={-2} size={32} /></div>}
    </>
  );
};

/* ═════════════ Les 20 scènes de principe ═════════════ */
const P1: React.FC = () => <P n="1" at={17.4} end={25.25} title="Gardez en vue le triple objectif" hd="Le triple objectif" c={TEAL} img={IMG.triple} pos="50% 30%" chips={[['satisfaire les clients', 'pouce', 19.2], ['santé et sécurité des travailleurs', 'casque', 20.5], ['préserver l’environnement', 'feuille', 23.2]]} />;
const P2: React.FC = () => <P n="2" at={25.3} end={36.85} slam title="S’appuyer sur les 5 piliers" hd="Les 5 piliers" c={TEAL} img={IMG.piliers} pos="50% 30%" chips={[['réglementation applicable', 'juge', 29.0], ['besoins des clients', 'pouce', 30.6], ['salariés', 'salarie', 31.7], ['collectivité', 'maison', 33.0], ['ambitions de l’entreprise', 'batiment', 35.0]]} />;
const P3: React.FC = () => <P n="3" at={36.9} end={45.85} slam title="Construire de bas en haut" hd="De bas en haut" c={TEAL} img={IMG.base} pos="50% 40%" chips={[['engagement de la direction', 'directeur', 42.0], ['objectifs clairement définis', 'cible', 43.9]]} />;
const P4: React.FC = () => <P n="4" at={45.9} end={56.15} slam title="Ne jamais construire le système seul" hd="Jamais seul" c={TEAL} img={IMG.seul} pos="50% 40%" chips={[['l’architecte du système', 'equerre', 50.6], ['mobiliser tous les métiers', 'equipe', 52.6], ['participation', 'main-levee', 54.8]]} />;
const P5: React.FC = () => <P n="5" at={56.2} end={66.25} slam title="Faire valider chaque objectif par la direction" hd="Validé par la direction" c={TEAL} vis={<V5 />} chips={[['plan d’action précis', 'clipboard', 61.8], ['moyens humains', 'equipe', 63.7], ['matériels', 'outils', 64.1], ['financiers', 'argent', 64.6]]} />;
const P6: React.FC = () => <P n="6" at={69.9} end={76.25} title="Associer prévention et amélioration continue" hd="Prévention + amélioration" c={BLUE} vis={<V6 />} chips={[['anticiper les risques', 'loupe', 72.4], ['améliorer continuellement', 'hausse', 73.6]]} />;
const P7: React.FC = () => <P n="7" at={76.3} end={88.25} slam title="Le QSSE, un acte de management" hd="Un acte de management" c={BLUE} vis={<V7 />} chips={[['qualité', 'medaille', 80.2], ['santé-sécurité', 'casque', 81.1], ['environnement', 'feuille', 82.0], ['tous les managers', 'equipe', 86.2]]} />;
const P8: React.FC = () => <P n="8" at={88.3} end={99.45} slam title="Intégrer le QSSE dès la conception" hd="Dès la conception" c={BLUE} img={IMG.conception} pos="50% 35%" chips={[['produits', 'colis', 93.9], ['processus', 'engrenage', 94.5], ['prévenir les problèmes', 'bouclier', 95.4], ['réduire les coûts de non-qualité', 'baisse', 96.6]]} />;
const P9: React.FC = () => <P n="9" at={99.5} end={108.55} slam title="Travailler avec les fournisseurs" hd="Avec les fournisseurs" c={BLUE} img={IMG.fournisseurs} pos="50% 40%" chips={[['impliquer vos fournisseurs', 'poignee', 101.8], ['maîtriser les risques', 'danger', 104.8], ['chaîne d’approvisionnement', 'camion', 107.0]]} />;
const P10: React.FC = () => <P n="10" at={112.1} end={118.15} title="Aider le personnel à bien faire son travail" hd="Aider le personnel" c={ORANGE} img={IMG.personnel} pos="50% 35%" chips={[['former', 'diplome', 112.1], ['connaissances et savoir-faire', 'cerveau', 113.0], ['vérifier sur le terrain', 'check', 115.0]]} />;
const P11: React.FC = () => <P n="11" at={118.2} end={127.35} slam title="Impliquer les individus dans l’amélioration" hd="Impliquer chacun" c={ORANGE} vis={<V11 />} chips={[['contribution de chacun', 'main-levee', 122.0], ['qualité', 'medaille', 124.1], ['santé-sécurité', 'casque', 124.9], ['environnement', 'feuille', 126.1]]} />;
const P12: React.FC = () => <P n="12" at={127.4} end={137.35} slam title="Ne pas négliger l’aspect sécurité" hd="L’aspect sécurité" c={ORANGE} vis={<V12 />} chips={[['règles de prévention', 'clipboard', 131.0], ['comprises', 'cerveau', 132.2], ['respectées', 'check', 132.7]]} />;
const P13: React.FC = () => <P n="13" at={137.4} end={147.65} slam title="S’assurer de la conformité du site" hd="La conformité du site" c={ORANGE} img={IMG.conformite} pos="50% 35%" chips={[['traçabilité écrite', 'memo', 140.9], ['levée des observations', 'check', 142.8], ['responsabilité engagée', 'juge', 145.1]]} />;
const PS: React.FC = () => {
  const t = useT();
  return <P n="★" at={147.7} end={155.65} slam title="Donner aux collaborateurs les moyens" hd="Donner les moyens" c={ORANGE} vis={<VS />} chips={[]}>
    {t > 153.3 && <Abs x={60} y={1010} w={960} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={153.4} text="TRAVAILLER CORRECTEMENT ET EN SÉCURITÉ" bg={NAVY} rot={-2} size={30} /></Abs>}
  </P>;
};
const P11b: React.FC = () => <P n="11" at={158.6} end={166.45} title="Utiliser les référentiels comme des guides" hd="Des référentiels guides" c={VIO} vis={<V11b />} chips={[['normes ISO', 'livres', 159.2], ['référentiels applicables', 'classeur', 160.0], ['guider votre démarche', 'boussole', 161.5]]} />;
const P12b: React.FC = () => <P n="12" at={166.5} end={176.85} slam title="Développer l’approche processus" hd="L’approche processus" c={VIO} vis={<V12b />} chips={[['interactions entre services', 'engrenage', 170.2], ['supprimer les barrières', 'barriere', 172.0], ['coopération', 'poignee', 174.6]]} />;
const P13b: React.FC = () => <P n="13" at={176.9} end={188.45} slam title="Exploiter les retours d’expérience" hd="Les retours d’expérience" c={VIO} img={IMG.rex} pos="50% 35%" chips={[['incidents', 'danger', 180.6], ['non-conformités', 'croix', 181.4], ['dysfonctionnements', 'engrenage', 182.6], ['causes profondes', 'loupe', 184.4], ['éviter la répétition', 'bouclier', 186.8]]} />;
const P14: React.FC = () => <P n="14" at={188.5} end={198.65} slam title="Réunions courtes avec les managers" hd="Des réunions courtes" c={VIO} img={IMG.reunions} pos="50% 35%" chips={[['faits marquants', 'memo', 192.1], ['suivre les actions', 'clipboard', 193.6], ['décider rapidement', 'chrono', 195.3]]} />;
const P15: React.FC = () => <P n="15" at={198.7} end={209.15} slam title="Valoriser les réussites et les efforts" hd="Valoriser les réussites" c={VIO} img={IMG.valoriser} pos="50% 30%" chips={[['bonnes pratiques', 'pouce', 202.6], ['progrès', 'hausse', 203.6], ['engagement des équipes', 'equipe', 204.4], ['motivation', 'fusee', 207.2], ['culture QSSE', 'coeur', 208.0]]} />;
const P16: React.FC = () => {
  const t = useT();
  return <P n="16" at={212.7} end={223.35} title="Se positionner comme un véritable chef de projet" hd="Un véritable chef de projet" c={GREEN} img={IMG.chef} pos="55% 30%" chips={[['animer', 'megaphone', 217.9], ['fédérer', 'equipe', 218.8], ['accompagner', 'poignee', 219.7], ['donner envie de progresser', 'fusee', 220.8]]} hx={[[213.4, ['Pas', 'seulement', 'contrôler'], [2]]]}>
    {t > 213.6 && t < 217.8 && <Abs x={60} y={994} w={960} style={{display: 'flex', justifyContent: 'center'}}><div style={{position: 'relative', ...nb('#fff', 5), padding: '10px 20px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: DIM}}>contrôler et rédiger des procédures<Strk at={216.2} /></div></Abs>}
  </P>;
};

/* ═════════════ Fil wahou final : l'édifice des 20 principes ═════════════ */
const Edifice: React.FC = () => {
  const t = useT();
  const CW = 228, RH = 104;
  const roof: [string, string, number][] = [['leadership', NAVY, 231.2], ['participation collective', BLUE, 232.4], ['prévention', ORANGE, 234.0], ['amélioration continue', GREEN, 235.0]];
  return (
    <>
      <Heads h={[[223.6, ['Retenez', 'bien', 'ceci'], [0]], [225.0, ['Un', 'système', 'performant'], [2]], [228.0, ['Pas', 'seulement', 'des', 'documents'], [3]], [230.3, ['Avant', 'tout', ':', 'le', 'leadership'], [4]], [232.4, ['La', 'participation', 'collective'], [1, 2]], [233.8, ['Prévention', '·', 'amélioration'], [0, 2]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        {PR.map(([n, l, c], k) => {
          const row = Math.floor(k / 4), col = k % 4;
          const at = 224.9 + k * 0.17;
          const p = Math.max(0, Math.min(1.05, spring(t, at, 10, 14)));
          return t > at ? <div key={k} style={{...nb(c, 4), position: 'absolute', left: col * (CW + 16), top: 900 - (row + 1) * RH - (1 - Math.min(1, p)) * 500, width: CW, height: RH - 12, display: 'flex', alignItems: 'center', gap: 8, padding: '0 10px', color: '#fff'}}><div style={{width: 44, height: 44, borderRadius: 22, background: '#fff', color: c, border: `3px solid ${NBK}`, fontFamily: sansFont, fontWeight: 900, fontSize: n.length > 1 ? 18 : 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxSizing: 'border-box'}}>{n}</div><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 19, lineHeight: 1.05}}>{l}</span></div> : null;
        })}
        {t > 228.0 && t < 230.9 && <div style={{position: 'absolute', left: 0, right: 0, top: 120, display: 'flex', justifyContent: 'center'}}><div style={{position: 'relative', ...nb('#fff', 6), padding: '14px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: DIM, transform: `scale(${pop(t, 228.0)})`}}>seulement les normes et les documents<Strk at={229.0} /></div></div>}
        {roof.map(([l, c, a], k) => t > a ? <div key={l} style={{...nb(c, 6), position: 'absolute', left: k * (CW + 16), top: 260 - (1 - Math.min(1, spring(t, a, 8, 12))) * 300, width: CW, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 26, lineHeight: 1.05, boxShadow: `0 0 26px ${c}, 6px 6px 0 ${NBK}`}}>{l}</div> : null)}
        {t > 230.6 && <svg style={{position: 'absolute', left: 0, top: 0}} width={960} height={400}><polygon points={`0,250 480,${lerp(250, 90, prog(t, 230.6, 231.4, easeOut))} 960,250`} fill="none" stroke={GOLD} strokeWidth={10} strokeLinejoin="round" /></svg>}
        {t > 235.5 && <Dust n={26} c={GOLD} />}
      </Abs>
    </>
  );
};
const Cta: React.FC = () => {
  const t = useT();
  const sh = prog(t, 242.5, 243.1, easeInOut);
  const scroll = prog(t, 238.0, 242.2, easeInOut);
  const clickAt = 244.0;
  const cur = prog(t, 243.2, clickAt, easeInOut);
  const on = t > clickAt + 0.1;
  return (
    <>
      <Heads h={[[236.6, ['Dites-le', 'en', 'commentaire'], [2]], [239.4, ['Le', 'plus', 'difficile', '?'], [2]], [242.9, ['Abonnez-vous'], [0]], [246.0, ['Un', 'levier', 'de', 'performance'], [1, 3]]]} />
      <Abs x={60} y={440} w={960} h={lerp(760, 470, sh)} style={{...nb('#fff', 8), boxShadow: `8px 8px 0 ${VIO}`, overflow: 'hidden'}}>
        <div style={{position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 14, padding: '18px 24px', borderBottom: `4px solid ${NBK}`, background: '#F1ECFD'}}><F n="bulle" size={56} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, lineHeight: 1.1}}>Lequel est le plus difficile à appliquer dans votre entreprise ?</div></div>
        <div style={{padding: '8px 24px', transform: `translateY(${-scroll * 900}px)`}}>{PR.map(([n, l, c], k) => <div key={k} style={{display: 'flex', alignItems: 'center', gap: 14, height: 66, opacity: t > 237.0 + Math.min(k, 8) * 0.08 ? 1 : 0}}><div style={{width: 30, height: 30, borderRadius: 15, border: `4px solid ${NBK}`, boxSizing: 'border-box'}} /><div style={{minWidth: 44, height: 40, borderRadius: 10, background: c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{n}</div><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30}}>{l}</span></div>)}</div>
      </Abs>
      {t > 242.6 && <Abs x={0} y={lerp(1280, 990, sh)} w={1080} style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{...nb(on ? GREEN : RED, 8), padding: '22px 48px', display: 'flex', alignItems: 'center', gap: 16, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 50, transform: `scale(${t > clickAt && t < clickAt + 0.15 ? 0.92 : Math.min(1, spring(t, 242.6))})`}}><F n="cloche" size={60} />{on ? 'ABONNÉ ✓' : 'S’ABONNER'}</div>
      </Abs>}
      {t > 243.0 && t < clickAt + 0.6 && <div style={{position: 'absolute', left: lerp(900, 600, cur), top: lerp(1300, 1060, cur), zIndex: 20}}><svg width={60} height={72} viewBox="0 0 24 30"><path d="M2 2 L2 24 L8 18 L12 28 L16 26 L12 17 L20 17 Z" fill="#fff" stroke={INK} strokeWidth={2} strokeLinejoin="round" /></svg></div>}
      {t > clickAt && t < clickAt + 0.7 && <div style={{position: 'absolute', left: 600 - (t - clickAt) * 200, top: 1060 - (t - clickAt) * 200, width: (t - clickAt) * 400, height: (t - clickAt) * 400, borderRadius: '50%', border: `6px solid ${GREEN}`, opacity: 1 - (t - clickAt) / 0.7, zIndex: 19}} />}
      {t > 246.9 && <Abs x={0} y={1180} w={1080} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={247.0} text="UN VÉRITABLE LEVIER DE PERFORMANCE" bg={NAVY} rot={-2} size={32} /></Abs>}
      {t > 247.4 && <Dust n={24} c={GOLD} />}
    </>
  );
};
const Final: React.FC = () => {
  const t = useT();
  const a = prog(t, 236.0, 236.6);
  return (
    <>
      {a < 1 && <AbsoluteFill style={{opacity: 1 - a, transform: `scale(${1 - a * 0.15})`}}><Edifice /></AbsoluteFill>}
      {a > 0 && <AbsoluteFill style={{opacity: a}}><Cta /></AbsoluteFill>}
    </>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const slamCues = (at: number): Sfx[] => [{at, s: 'deep-hit', v: 0.5}, {at: at + 0.05, s: 'bass-hit', v: 0.4}, {at: at + 0.45, s: 'sfx/swish', v: 0.3}, {at: at + 1.75, s: 'sfx/whoosh', v: 0.3}];
const pops = (xs: number[]): Sfx[] => xs.map((at) => ({at, s: 'sfx/pop', v: 0.24}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at, s: 'sfx/bell', v: 0.22})),
  ...searchCues(3.0, 21, 6.4, 6.8), {at: 7.0, s: 'sfx/rise', v: 0.3, dur: 1.2}, {at: 8.2, s: 'bass-hit', v: 0.35}, {at: 11.3, s: 'tampon', v: 0.4},
  ...[25.3, 36.9, 45.9, 56.2, 76.3, 88.3, 99.5, 118.2, 127.4, 137.4, 147.7, 166.5, 176.9, 188.5, 198.7].flatMap(slamCues),
  ...pops([19.2, 20.5, 23.2, 29.0, 30.6, 31.7, 33.0, 35.0, 42.0, 43.9, 50.6, 52.6, 54.8, 61.8, 63.7, 64.1, 64.6, 72.4, 73.6, 80.2, 81.1, 82.0, 93.9, 94.5, 95.4, 96.6, 101.8, 104.8, 107.0, 112.1, 113.0, 115.0, 122.0, 124.1, 124.9, 126.1, 131.0, 132.2, 132.7, 140.9, 142.8, 145.1, 159.2, 160.0, 161.5, 170.2, 172.0, 174.6, 180.6, 181.4, 182.6, 184.4, 186.8, 192.1, 193.6, 195.3, 202.6, 203.6, 204.4, 207.2, 208.0, 217.9, 218.8, 219.7, 220.8]),
  {at: 58.7, s: 'tampon', v: 0.5}, {at: 71.0, s: 'sfx/swish', v: 0.4}, {at: 73.6, s: 'stylo', v: 0.3, dur: 1.4}, {at: 86.2, s: 'validation', v: 0.35}, ...rep(121.4, 10, 0.22, 'sfx/pop', 0.16), {at: 134.4, s: 'deep-hit', v: 0.45},
  ...[149.0, 150.0, 151.1, 152.3].map((at) => ({at, s: 'sfx/thud', v: 0.35})), {at: 153.4, s: 'tampon', v: 0.35}, {at: 160.0, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 165.0, s: 'tampon', v: 0.45}, {at: 172.5, s: 'sfx/thud', v: 0.45}, {at: 174.5, s: 'validation', v: 0.3}, {at: 216.2, s: 'sfx/swish', v: 0.4},
  ...rep(224.9, 20, 0.17, 'sfx/thud', 0.22), {at: 229.0, s: 'sfx/swish', v: 0.4}, {at: 230.6, s: 'sfx/rise', v: 0.3, dur: 0.8}, ...[231.2, 232.4, 234.0, 235.0].map((at) => ({at, s: 'bass-hit', v: 0.3})), {at: 235.5, s: 'validation', v: 0.35},
  {at: 236.2, s: 'soft-whoosh', v: 0.35, dur: 1}, {at: 238.0, s: 'soft-whoosh', v: 0.25, dur: 4}, {at: 242.6, s: 'sfx/pop', v: 0.35}, {at: 244.0, s: 'sfx/click', v: 0.55}, {at: 244.1, s: 'validation', v: 0.4}, {at: 247.0, s: 'tampon', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SC: [React.FC, number, number][] = [[Intro, 2.8, 13.9], [P1, 17.3, 25.3], [P2, 25.2, 36.9], [P3, 36.8, 45.9], [P4, 45.8, 56.2], [P5, 56.1, 66.3], [P6, 69.8, 76.3], [P7, 76.2, 88.3], [P8, 88.2, 99.5], [P9, 99.4, 108.6], [P10, 112.0, 118.2], [P11, 118.1, 127.4], [P12, 127.3, 137.4], [P13, 137.3, 147.7], [PS, 147.6, 155.7], [P11b, 158.5, 166.5], [P12b, 166.4, 176.9], [P13b, 176.8, 188.5], [P14, 188.4, 198.7], [P15, 198.6, 209.2], [P16, 212.6, 223.4], [Final, 223.3, OUTRO_AT]];
export const PrincipesMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    {SC.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-principes-metro-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn];
