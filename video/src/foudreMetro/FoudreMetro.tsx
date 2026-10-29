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
 * « L'analyse du risque foudre (ARF) » (voix d'origine, 1 min 48) — capsule « condensé + effet wahou + ultra premium »
 * présentée en métro (7 stations). Tube de verre à six guichets : l'impact → la vraie question → l'ARF → surtensions
 * & protection → ARF ≠ étude → retenez ; la capsule file d'un guichet à l'autre. Gyrophare, loupe, capsule
 * pneumatique, store vénitien ; barre de recherche « analyse du risque foudre ». Wahou procédural : éclairs générés
 * (tracé fractal déterministe + flash + branches) sur la raffinerie, ondes de choc qui dépassent le point d'impact,
 * fausse question barrée → vraie question, onde de surtension qui court le long d'un câble et fait clignoter
 * automates / contrôle-commande / instruments / sécurité, puis bouclier qui s'assemble en 4 couches (impacts directs,
 * parafoudres, liaison équipotentielle, mesures adaptées) et repasse tout au vert ; ARF → étude technique ;
 * « IEC 62305-2 » tapé ; évaluer → justifier → vérifier. Images de la session réutilisées.
 * Kits capsule-ui-neo-brutal et capsule-recit-illustre.
 */
const IMG = {
  cover: 'promo/raffinerie.jpg',
  c1: 'promo/raffinerie.jpg',
  c2: 'ident/electrique.jpg',
  site: 'promo/raffinerie.jpg',
  eval: 'evalrisques-gen/couverture.jpg',
  usine: 'iso26/usine-porte.jpg',
  etude: 'induction/ingenieur-chantier.jpg',
  norme: 'normesiso/sphere-iso.jpg',
  expert: 'ingenieur/ingenieur.jpg',
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
const OUTRO_AT = 108.8;
export const FOUDRE_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '!', title: 'L’impact de foudre', s: 'incendie · explosion · pannes', c: RED, g: 'l’impact', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 12.6, n: '?', title: 'La vraie question', s: 'paratonnerre ou analyse ?', c: ORANGE, g: 'la question', k: 'gyro', lab: 'GUICHET 2 / 6'},
  {at: 24.6, n: '3', title: 'L’ARF', s: 'analyse du risque foudre', c: NAVY, g: 'l’ARF', k: 'loupe', lab: 'GUICHET 3 / 6'},
  {at: 43.3, n: '4', title: 'Surtensions et protection', s: 'bien plus qu’un paratonnerre', c: VIO, g: 'protection', k: 'tube', lab: 'GUICHET 4 / 6'},
  {at: 66.6, n: '5', title: 'ARF ≠ étude technique', s: 'besoins ≠ dispositifs', c: BLUE, g: 'l’étude', k: 'store', lab: 'GUICHET 5 / 6'},
  {at: 91.6, n: '★', title: 'Retenez ceci', s: 'évaluer · justifier · vérifier', c: GREEN, g: 'retenez', k: 'gyro', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 101.6;
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
  {n: 1, l: 'Le point d’impact', s: 'impact', at: 11.8},
  {n: 2, l: 'La vraie question', s: 'question', at: 20.2},
  {n: 3, l: 'Le niveau de risque', s: 'risque', at: 40.2},
  {n: 4, l: 'Les surtensions', s: 'surtensions', at: 47.2},
  {n: 5, l: 'La protection combinée', s: 'protection', at: 58.1},
  {n: 6, l: 'L’étude technique', s: 'étude', at: 73.0},
  {n: 7, l: 'IEC 62305-2', s: 'norme', at: 83.1},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE FOUDRE · STATION {r.n} / 7</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="eclair" w={1080} h={820} pos="50% 30%" filter="brightness(0.55) contrast(1.2)" /></div>
      <Bolt x0={760} y0={-20} x1={600} y1={560} at={1.25} seed={7} w={9} /><Bolt x0={260} y0={-20} x1={330} y1={480} at={0.35} seed={3} w={6} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 24%, ${PAPER}CC 32%, ${PAPER} 37%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb(NBK, 5), color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3, padding: '8px 22px'}}>ANALYSE DU RISQUE FOUDRE</div></Abs>
      <Abs x={0} y={650} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="RISQUE" src={IMG.c1} size={170} ls={6} /></Abs>
      <Abs x={0} y={840} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="FOUDRE" src={IMG.c2} size={170} ls={6} seed={3} /></Abs>
      <Abs x={40} y={1030} w={1000} style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10}}>{[['ARF', NAVY], ['surtensions', ORANGE], ['parafoudres', VIO], ['IEC 62305-2', BLUE], ['vérifier', GREEN]].map(([n, c], k) => <div key={n} style={{...nb(c, 4), padding: '6px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', transform: `translateY(${(1 - Math.min(1, spring(t, 0.3 + k * 0.08))) * 60}px)`}}>{n}</div>)}</Abs>
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

type CH = [string, string, number];
const hd = (l: string, a: number): HD => { const w = l.split(' '); return [a, w, [w.length - 1]]; };
const SC: React.FC<{at: number; end: number; c: string; badge: string; img?: string; pos?: string; ih?: number; chips?: CH[]; h?: HD[]; hx?: HD[]; vis?: React.ReactNode; over?: React.ReactNode; children?: React.ReactNode}> = ({at, end, c, badge, img, pos = '50% 40%', ih = 560, chips = [], h, hx = [], vis, over, children}) => {
  const t = useT();
  const hh: HD[] = (h ?? [...chips.map(([l, , a]) => hd(l, a)), ...hx]).sort((x, y) => x[0] - y[0]);
  const bd = <div style={{position: 'absolute', left: 20, top: 20, zIndex: 6}}><NBadge at={at + 0.2} text={badge} bg={c} rot={-2} size={26} /></div>;
  return (
    <Out end={end}>
      {hh.length > 0 && <Heads h={hh} />}
      {img ? <Shot src={img} ic="causerie" x={60} y={440} w={960} h={ih} at={at} pos={pos} c={c}>{bd}{over}</Shot> : (
        <Abs x={60} y={440} w={960} h={ih} style={{...nb('#fff', 8), boxShadow: `8px 8px 0 ${c}`, overflow: 'hidden', opacity: pop(t, at), transform: `translateY(${(1 - pop(t, at)) * 40}px)`, backgroundImage: 'radial-gradient(#0001 2px, transparent 2px)', backgroundSize: '22px 22px'}}>{bd}{vis}{over}</Abs>
      )}
      <Abs x={60} y={440 + ih + 34} w={960} style={{display: 'flex', flexWrap: 'wrap', gap: 12}}>{chips.map(([l, ic, a]) => (t > a ? <Chip key={l} at={a} ic={ic} l={l} c={c} /> : null))}</Abs>
      {children}
    </Out>
  );
};


/* ═════════════ Éclair procédural (tracé fractal déterministe + flash + branches) ═════════════ */
const boltPath = (x0: number, y0: number, x1: number, y1: number, seed: number, n = 12, amp = 60) => {
  const pts: [number, number][] = [[x0, y0]];
  for (let i = 1; i < n; i++) { const f = i / n; pts.push([lerp(x0, x1, f) + (random(`b${seed}-${i}`) - 0.5) * amp * 2, lerp(y0, y1, f) + (random(`c${seed}-${i}`) - 0.5) * amp * 0.4]); }
  pts.push([x1, y1]);
  return pts;
};
const Bolt: React.FC<{x0: number; y0: number; x1: number; y1: number; at: number; seed: number; w?: number; c?: string}> = ({x0, y0, x1, y1, at, seed, w = 7, c = '#FFF7C2'}) => {
  const t = useT();
  const k = t - at;
  if (k < 0 || k > 0.75) return null;
  const draw = prog(t, at, at + 0.08);
  const flick = k < 0.08 ? 1 : k < 0.18 ? 0.3 : k < 0.3 ? 1 : 1 - prog(t, at + 0.3, at + 0.75);
  const pts = boltPath(x0, y0, x1, y1, seed);
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${x} ${y}`).join(' ');
  const br = [3, 6, 8].map((i, j) => { const [bx, by] = pts[i]; const q = boltPath(bx, by, bx + (random(`d${seed}-${j}`) - 0.5) * 300, by + 120 + random(`e${seed}-${j}`) * 140, seed * 10 + j, 5, 30); return q.map(([x, y], m) => `${m ? 'L' : 'M'} ${x} ${y}`).join(' '); });
  return (
    <svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible', pointerEvents: 'none', zIndex: 4}} width={10} height={10}>
      <g opacity={flick} style={{filter: `drop-shadow(0 0 18px ${c}) drop-shadow(0 0 40px #9CC6FF)`}}>
        <path d={d} fill="none" stroke={c} strokeWidth={w} strokeLinejoin="round" strokeLinecap="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - draw}} />
        {br.map((b, j) => <path key={j} d={b} fill="none" stroke={c} strokeWidth={w * 0.45} strokeLinejoin="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - draw}} />)}
      </g>
    </svg>
  );
};
const Flash: React.FC<{ats: number[]}> = ({ats}) => {
  const t = useT();
  const o = ats.reduce((a, at) => Math.max(a, t >= at ? Math.max(0, 1 - (t - at) * 5) * (t - at < 0.1 || (t - at > 0.18 && t - at < 0.28) ? 0.75 : 0.35) : 0), 0);
  return o > 0 ? <div style={{position: 'absolute', inset: 0, background: '#EAF2FF', opacity: o, pointerEvents: 'none', zIndex: 5}} /> : null;
};

/* ═════════════ Guichet 1 : l'orage sur la raffinerie ═════════════ */
const STRIKES = [3.0, 3.8, 6.1, 9.9];
const Orage: React.FC = () => {
  const t = useT();
  const IX = 560, IY = 520;
  const C3: CH[] = [['incendie', 'feu', 3.0], ['explosion', 'bombe', 3.8], ['systèmes électriques et de sécurité indisponibles', 'eclair', 6.1]];
  return (
    <Out end={12.65}>
      <Heads h={[[2.9, ['Un', 'impact', 'de', 'foudre'], [3]], [3.0, ['Un', 'incendie'], [1]], [3.8, ['Une', 'explosion'], [1]], [5.0, ['Des', 'systèmes', 'indisponibles'], [2]], [8.4, ['Une', 'installation', 'industrielle'], [2]], [10.6, ['Au-delà', 'du', 'point', 'd’impact'], [3]]]} />
      <Abs x={60} y={440} w={960} h={880} style={{borderRadius: 30, overflow: 'hidden', border: `5px solid ${NBK}`, boxShadow: `10px 10px 0 ${RED}`, background: NIGHT, boxSizing: 'border-box'}}>
        <Img src={PH(IMG.site)} style={{position: 'absolute', left: 0, top: 0, width: 950, height: 870, objectFit: 'cover', objectPosition: '50% 45%', filter: 'brightness(0.42) contrast(1.25) saturate(0.6)', transform: `scale(${1.12 - prog(t, 2.8, 12.6, (x: number) => x) * 0.08})`}} />
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #0B1530EE 0%, #0B153055 45%, transparent 70%)'}} />
        {[0, 1, 2, 3, 4, 5].map((j) => <div key={j} style={{position: 'absolute', left: ((j * 211 + t * 30) % 1100) - 150, top: 20 + (j % 3) * 50, width: 360, height: 120, borderRadius: 60, background: '#22304F', opacity: 0.55, filter: 'blur(14px)'}} />)}
        {Array.from({length: 40}, (_, j) => { const x = (random(`r${j}`) * 1000 + t * 120) % 960; const y = ((random(`s${j}`) * 870 + t * 900) % 870); return <div key={`r${j}`} style={{position: 'absolute', left: x, top: y, width: 2, height: 26, background: '#9CC6FF66', transform: 'rotate(12deg)'}} />; })}
        <Bolt x0={IX + 80} y0={-10} x1={IX} y1={IY} at={3.0} seed={11} w={10} />
        <Bolt x0={200} y0={-10} x1={260} y1={430} at={3.8} seed={12} w={7} />
        <Bolt x0={820} y0={-10} x1={780} y1={380} at={6.1} seed={13} w={7} />
        <Bolt x0={IX - 60} y0={-10} x1={IX} y1={IY} at={9.9} seed={14} w={12} />
        {t > 3.1 && <div style={{position: 'absolute', left: IX - 70, top: IY - 120, width: 140, height: 140, borderRadius: 70, background: `radial-gradient(circle, ${YEL}, ${ORANGE} 50%, transparent 70%)`, opacity: 0.85 * (0.7 + 0.3 * Math.sin(t * 20)), transform: `scale(${1 + 0.1 * Math.sin(t * 9)})`, mixBlendMode: 'screen'}} />}
        {[0, 1, 2].map((j) => { const p = prog(t, 9.9 + j * 0.35, 11.6 + j * 0.35); return p > 0 && p < 1 ? <div key={`w${j}`} style={{position: 'absolute', left: IX - p * 620, top: IY - p * 620 * 0.6, width: p * 1240, height: p * 1240 * 0.6, borderRadius: '50%', border: `6px solid ${ORANGE}`, opacity: 1 - p}} /> : null; })}
        {t > 10.6 && <div style={{position: 'absolute', left: 20, bottom: 24}}><NBadge at={10.7} text="LES CONSÉQUENCES DÉPASSENT LE POINT D’IMPACT" bg={ORANGE} rot={-1} size={24} /></div>}
        <div style={{position: 'absolute', left: 20, top: 20, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10, zIndex: 6}}>{C3.map(([l, ic, a]) => (t > a ? <Chip key={l} at={a} ic={ic} l={l} c={RED} /> : null))}</div>
        <Flash ats={STRIKES} />
      </Abs>
    </Out>
  );
};

/* ═════════════ Guichet 2 : la mauvaise et la vraie question ═════════════ */
const Question: React.FC = () => {
  const t = useT();
  const card = (at: number, txt: string, c: string, good: boolean) => <div style={{position: 'relative', ...nb(good ? '#fff' : '#F3F5F8', 7), boxShadow: `7px 7px 0 ${c}`, padding: '22px 26px', display: 'flex', alignItems: 'center', gap: 18, transform: `scale(${t > at ? Math.min(1.03, spring(t, at)) : 0})`, opacity: !good && t > 19.8 ? 0.55 : 1}}>
    <div style={{width: 80, height: 80, borderRadius: 40, background: c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `5px solid ${NBK}`, boxSizing: 'border-box'}}>?</div>
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, lineHeight: 1.15}}>{txt}</div>
    {!good && t > 19.8 && <Strk at={19.8} />}
  </div>;
  return <SC at={16.1} end={24.65} c={ORANGE} badge="QUELLE QUESTION POSER ?" ih={760} h={[[16.2, ['Un', 'professionnel', 'QHSE'], [1, 2]], [17.6, ['Un', 'paratonnerre', '?'], [1]], [19.8, ['La', 'vraie', 'question'], [1, 2]], [21.8, ['Le', 'risque', 'évalué', '?'], [1, 2]]]}
    vis={<div style={{position: 'absolute', left: 40, right: 40, top: 110, display: 'flex', flexDirection: 'column', gap: 40}}>
      {card(16.9, '« Avons-nous installé un paratonnerre ? »', DIM, false)}
      {card(21.0, '« Avons-nous évalué le risque foudre de manière structurée ? »', GREEN, true)}
      {t > 23.4 && <div style={{alignSelf: 'center'}}><NBadge at={23.5} text="LA BONNE QUESTION" bg={GREEN} rot={-2} size={34} /></div>}
    </div>} />;
};

/* ═════════════ Guichet 3 : l'ARF (recherche) ═════════════ */
const CRIT: [string, string, number][] = [['la structure', 'batiment', 31.7], ['son environnement', 'arbre', 32.5], ['les activités exercées', 'engrenage', 33.6], ['équipements sensibles', 'ordinateur', 35.2], ['les conséquences', 'danger', 36.6]];
const Arf: React.FC = () => {
  const t = useT();
  const lvl = prog(t, 39.6, 41.0, easeOut);
  const ang = -180 + lvl * 140 + Math.sin(t * 6) * 3 * lvl;
  return (
    <Out end={43.35}>
      <Heads h={[[28.3, ['L’analyse', 'du', 'risque', 'foudre'], [3]], ...CRIT.map(([l, , a]) => { const w = l.split(' '); return [a, w, [w.length - 1]] as HD; }), [39.4, ['Le', 'niveau', 'de', 'risque'], [3]], [41.4, ['Les', 'besoins', 'de', 'protection'], [3]]]} />
      <SearchOpen x={60} y={440} w={960} h={900} at={28.0} query="analyse du risque foudre" results={['ARF · analyse du risque foudre', 'installer un paratonnerre', 'prix d’un parafoudre']} found={0} foundAt={29.4} clickAt={29.8} c={NAVY}>
        <div style={{position: 'absolute', left: 30, top: 24, width: 420, height: 560, borderRadius: 22, overflow: 'hidden', border: `4px solid ${NBK}`}}><Img src={PH(IMG.eval)} style={{width: 420, height: 560, objectFit: 'cover', objectPosition: '40% 30%'}} /><Shine at={30.8} /></div>
        <div style={{position: 'absolute', left: 480, top: 24, width: 450, display: 'flex', flexDirection: 'column', gap: 12}}>{CRIT.map(([l, ic, a]) => (t > a ? <Chip key={l} at={a} ic={ic} l={l} c={NAVY} /> : null))}</div>
        {t > 39.2 && <div style={{position: 'absolute', left: 60, top: 610, display: 'flex', alignItems: 'center', gap: 30, opacity: pop(t, 39.2)}}>
          <svg width={240} height={140}><path d="M 20 125 A 100 100 0 0 1 220 125" fill="none" stroke="#E3E8EF" strokeWidth={22} /><path d="M 20 125 A 100 100 0 0 1 220 125" fill="none" stroke={`url(#gr)`} strokeWidth={22} /><defs><linearGradient id="gr"><stop offset="0" stopColor={GREEN} /><stop offset="0.5" stopColor={YEL} /><stop offset="1" stopColor={RED} /></linearGradient></defs><line x1={120} y1={125} x2={120 + Math.cos((ang * Math.PI) / 180) * 88} y2={125 + Math.sin((ang * Math.PI) / 180) * 88} stroke={NBK} strokeWidth={8} strokeLinecap="round" /><circle cx={120} cy={125} r={12} fill={NBK} /></svg>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, lineHeight: 1.1}}>niveau<br />de risque</div>
          {t > 41.4 && <div style={{display: 'flex', alignItems: 'center', gap: 10, transform: `scale(${Math.min(1.05, spring(t, 41.4))})`}}><F n="bouclier" size={90} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: GREEN}}>besoins de<br />protection</span></div>}
        </div>}
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ Guichet 4 : surtension qui court → protection combinée ═════════════ */
const EQ: [string, string, number][] = [['automates', 'ordinateur', 49.1], ['contrôle-commande', 'engrenage', 50.4], ['instruments de mesure', 'thermometre', 51.4], ['dispositifs de sécurité', 'sirene', 52.5]];
const LAY: [string, string, number, string][] = [['impacts directs · paratonnerre', 'eclair', 60.3, NAVY], ['parafoudres', 'prise', 61.6, VIO], ['liaison équipotentielle', 'chaine-cassee', 62.6, BLUE], ['mesures adaptées', 'clipboard', 64.5, TEAL]];
const Surtension: React.FC = () => {
  const t = useT();
  const safe = t > 65.2;
  const wave = prog(t, 47.4, 52.8, (x: number) => x);
  const P = [[60, 160], [900, 160], [900, 330], [60, 330], [60, 500], [900, 500]];
  const L = P.reduce((a, p, i) => (i ? a + Math.hypot(p[0] - P[i - 1][0], p[1] - P[i - 1][1]) : 0), 0);
  const at = (f: number) => { let d = f * L; for (let i = 1; i < P.length; i++) { const s0 = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); if (d <= s0) return [lerp(P[i - 1][0], P[i][0], d / s0), lerp(P[i - 1][1], P[i][1], d / s0)]; d -= s0; } return P[P.length - 1]; };
  const NODE = [[300, 160], [700, 330], [300, 330], [700, 500]];
  const [wx, wy] = at(wave);
  return <SC at={46.8} end={66.7} c={VIO} badge={t < 56.8 ? 'DOMMAGES DIRECTS ET SURTENSIONS' : 'UNE PROTECTION COMBINÉE'} ih={600} h={[[46.9, ['Dommages', 'directs'], [1]], [47.2, ['Et', 'surtensions'], [1]], ...EQ.map(([l, , a]) => { const w = l.split(' '); return [a, w, [w.length - 1]] as HD; }), [54.4, ['Pas', 'que', 'le', 'paratonnerre'], [3]], [57.4, ['Une', 'combinaison', 'cohérente'], [1, 2]], [61.6, ['Parafoudres'], [0]], [62.6, ['Liaison', 'équipotentielle'], [1]], [64.5, ['Mesures', 'adaptées'], [1]]]}
    vis={<>
      <div style={{position: 'absolute', inset: 0, background: safe ? '#F2FBF6' : t < 56.8 ? '#11182A' : '#F7F7FB', opacity: 0.95}} />
      <svg style={{position: 'absolute', left: 0, top: 0}} width={960} height={600}><polyline points={P.map((p) => p.join(',')).join(' ')} fill="none" stroke={safe ? GREEN : '#5A6B8C'} strokeWidth={10} strokeLinejoin="round" strokeDasharray="2 18" strokeLinecap="round" /></svg>
      <Bolt x0={100} y0={-20} x1={60} y1={160} at={47.2} seed={21} w={9} />
      {t > 47.4 && t < 53.4 && <div style={{position: 'absolute', left: wx - 30, top: wy - 30, width: 60, height: 60, borderRadius: 30, background: `radial-gradient(circle, #fff, ${YEL} 40%, ${ORANGE} 70%, transparent)`, boxShadow: `0 0 40px ${YEL}`}} />}
      {EQ.map(([l, ic, a], k) => { const hit = t > a && !safe; const [x, y] = NODE[k]; return (
        <div key={l} style={{position: 'absolute', left: x - 90, top: y - 62, width: 180, textAlign: 'center'}}>
          <div style={{margin: '0 auto', width: 96, height: 96, borderRadius: 18, background: safe ? '#fff' : hit ? RED : '#2A3550', border: `5px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: hit ? `0 0 ${20 + 20 * Math.abs(Math.sin(t * 25))}px ${RED}` : safe ? `0 0 18px ${GREEN}` : 'none', transform: `translateX(${hit && t < a + 0.6 ? Math.sin(t * 60) * 6 : 0}px)`, boxSizing: 'border-box'}}><F n={ic} size={58} /></div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 20, color: t < 56.8 && !safe ? '#fff' : INK, marginTop: 4, background: t < 56.8 ? 'transparent' : '#ffffffcc', borderRadius: 6}}>{l}</div>
          {safe && <div style={{position: 'absolute', right: 30, top: -8, width: 34, height: 34, borderRadius: 17, background: GREEN, border: `3px solid ${NBK}`, color: '#fff', fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1.1, spring(t, 65.2 + k * 0.1))})`}}>✓</div>}
        </div>
      ); })}
      {t > 54.4 && t < 57.6 && <div style={{position: 'absolute', left: 0, right: 0, top: 260, display: 'flex', justifyContent: 'center', zIndex: 6}}><Barred at={54.5} strk={56.0} text="se limiter au paratonnerre" fs={34} /></div>}
    </>}>
    {t > 59.0 && <Abs x={60} y={1074} w={960} h={290} style={{display: 'grid', gridTemplateColumns: '470px 470px', gap: 14}}>{LAY.map(([l, ic, a, c]) => (t > a ? <div key={l} style={{...nb(c, 6), height: 120, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 28, lineHeight: 1.05, transform: `translateY(${(1 - Math.min(1, spring(t, a, 9, 12))) * 200}px)`}}><F n={ic} size={60} />{l}</div> : null))}</Abs>}
  </SC>;
};

/* ═════════════ Guichet 5 : ARF ≠ étude technique ═════════════ */
const Etude: React.FC = () => {
  const t = useT();
  const arrow = prog(t, 72.4, 73.2, easeOut);
  return <SC at={70.2} end={79.45} c={BLUE} badge="ARF → ÉTUDE TECHNIQUE" img={IMG.etude} pos="50% 30%" ih={460} chips={[['les dispositifs à mettre en œuvre', 'outils', 74.3], ['leur implantation', 'carte', 75.9], ['vérification et maintenance', 'cle', 77.7]]} hx={[[70.4, ['L’ARF', 'ne', 'remplace', 'pas'], [3]], [71.1, ['L’ARF', ':', 'les', 'besoins'], [3]], [73.0, ['L’étude', 'technique'], [1]]]}>
    <Abs x={60} y={1150} w={960} h={130} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24}}>
      <div style={{...nb(NAVY, 6), color: '#fff', padding: '14px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, transform: `scale(${pop(t, 70.9)})`}}>ARF = les besoins</div>
      <svg width={120} height={40}><path d="M 5 20 L 105 20 M 85 5 L 110 20 L 85 35" fill="none" stroke={BLUE} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - arrow}} /></svg>
      <div style={{...nb(BLUE, 6), color: '#fff', padding: '14px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, transform: `scale(${t > 73.0 ? Math.min(1, spring(t, 73.0)) : 0})`}}>étude = les dispositifs</div>
    </Abs>
  </SC>;
};
const NORM = 'IEC 62305-2';
const Norme: React.FC = () => {
  const t = useT();
  const n = Math.floor(prog(t, 82.6, 84.8, (x: number) => x) * NORM.length);
  return <SC at={79.4} end={91.7} c={BLUE} badge="LA RÉFÉRENCE INTERNATIONALE" img={IMG.norme} pos="50% 50%" ih={420} h={[[79.6, ['La', 'référence', 'internationale'], [2]], [82.6, ['IEC', '62305'], [0, 1]], [85.7, ['Partie', '2', ':', 'gestion', 'du', 'risque'], [1, 5]], [88.0, ['Version', 'applicable', 'à', 'vérifier'], [3]]]}>
    <Abs x={60} y={890} w={960} h={420}>
      <div style={{...nb(NIGHT, 8), boxShadow: `8px 8px 0 ${BLUE}`, padding: '24px 30px', display: 'flex', alignItems: 'center', gap: 20, opacity: pop(t, 82.4)}}><F n="livres" size={80} /><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 76, color: '#fff', letterSpacing: 2}}>{NORM.slice(0, n)}<span style={{opacity: Math.sin(t * 12) > 0 && n < NORM.length ? 1 : 0, color: YEL}}>_</span></div></div>
      {t > 85.6 && <div style={{marginTop: 22, display: 'flex', gap: 14, flexWrap: 'wrap'}}><Chip at={85.7} ic="balance" l="partie 2 : gestion du risque" c={BLUE} /></div>}
      {t > 88.6 && <div style={{position: 'absolute', left: 260, top: 240}}><Stamp at={88.7} text="VERSION À VÉRIFIER" c={ORANGE} x={0} y={0} rot={-6} size={40} /></div>}
      {t > 90.0 && <div style={{position: 'absolute', left: 0, top: 330}}><Chip at={90.1} ic="juge" l="selon le contexte réglementaire du site" c={ORANGE} /></div>}
    </Abs>
  </SC>;
};

/* ═════════════ Guichet 6 : retenez ═════════════ */
const STEPS: [string, string, number][] = [['évaluer le risque', 'loupe', 98.2], ['justifier les mesures', 'balance', 99.5], ['vérifier l’efficacité', 'check', 101.0]];
const SLOGAN = 'Des normes aujourd’hui, un avenir durable demain.';
const Retenez: React.FC = () => {
  const t = useT();
  const sl = Math.floor(prog(t, 104.9, 107.4, (x: number) => x) * SLOGAN.length);
  return (
    <>
      <Heads h={[[95.3, ['Prévention', 'des', 'risques', 'industriels'], [0, 3]], [95.8, ['Pas', 'd’intuition'], [1]], [98.2, ['Évaluer'], [0]], [99.5, ['Justifier'], [0]], [101.0, ['Vérifier'], [0]], [102.7, ['UNIVERSNORMES'], [0]]]} />
      <Abs x={60} y={440} w={960} h={880} style={{...nb('#fff', 8), boxShadow: `8px 8px 0 ${GREEN}`, overflow: 'hidden', opacity: pop(t, 95.2)}}>
        <div style={{position: 'absolute', left: 20, top: 20}}><NBadge at={95.4} text="RETENEZ CECI" bg={GREEN} rot={-2} size={28} /></div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20}}>
          {t > 96.0 && <div style={{position: 'relative', ...nb('#F3F5F8', 6), padding: '14px 22px', display: 'flex', alignItems: 'center', gap: 12, transform: `scale(${pop(t, 96.0)})`}}><F n="pensif" size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: DIM}}>dimensionner à l’intuition</span><Strk at={97.2} /></div>}
        </div>
        <div style={{position: 'absolute', left: 40, right: 40, top: 270, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          {STEPS.map(([l, ic, a], k) => (
            <React.Fragment key={l}>
              <div style={{width: 250, textAlign: 'center', transform: `scale(${t > a ? Math.min(1.08, spring(t, a, 9, 12)) : 0.85})`, opacity: t > a ? 1 : 0.25}}>
                <div style={{margin: '0 auto', width: 150, height: 150, borderRadius: 75, background: t > a ? GREEN : '#E3E8EF', border: `6px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: t > a ? `0 0 24px ${GREEN}` : 'none', boxSizing: 'border-box'}}><F n={ic} size={80} /></div>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, marginTop: 10}}>{l}</div>
              </div>
              {k < 2 && <svg width={60} height={40}><path d="M 5 20 L 45 20 M 32 8 L 50 20 L 32 32" fill="none" stroke={t > STEPS[k + 1][2] ? GREEN : '#C9D2DF'} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </React.Fragment>
          ))}
        </div>
        {t > 102.6 && <div style={{position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center', opacity: pop(t, 102.6)}}>
          <Img src={staticFile(LOGO)} style={{height: 110, transform: `scale(${Math.min(1, spring(t, 102.6))})`}} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: NAVY, marginTop: 20, minHeight: 50}}>{SLOGAN.slice(0, sl)}<span style={{opacity: sl < SLOGAN.length && Math.sin(t * 12) > 0 ? 1 : 0, color: GREEN}}>|</span></div>
        </div>}
        <Bolt x0={880} y0={-20} x1={840} y1={240} at={101.6} seed={31} w={6} c="#FFE27A" />
      </Abs>
      {t > 101.6 && t < 103.5 && <Dust n={24} c={GOLD} />}
    </>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const thunder = (at: number, v = 0.5): Sfx[] => [{at, s: 'deep-hit', v}, {at: at + 0.04, s: 'bass-hit', v: v * 0.8}, {at: at + 0.25, s: 'sfx/thud', v: v * 0.6}];
const pops = (xs: number[]): Sfx[] => xs.map((at) => ({at, s: 'sfx/pop', v: 0.22}));
const CUES: Sfx[] = [
  ...thunder(0.35, 0.35), ...thunder(1.25, 0.5),
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at, s: 'sfx/bell', v: 0.22})),
  ...STRIKES.flatMap((a) => thunder(a, 0.5)), {at: 9.9, s: 'soft-whoosh', v: 0.4, dur: 1.6}, {at: 10.7, s: 'tampon', v: 0.35}, ...pops([3.05, 3.85, 6.15]),
  {at: 16.9, s: 'sfx/pop', v: 0.3}, {at: 19.8, s: 'sfx/swish', v: 0.45}, {at: 21.0, s: 'bass-hit', v: 0.35}, {at: 23.5, s: 'validation', v: 0.35},
  ...searchCues(28.0, 24, 29.4, 29.8), ...pops(CRIT.map((c) => c[2])), {at: 39.6, s: 'sfx/rise', v: 0.3, dur: 1.4}, {at: 41.4, s: 'bass-hit', v: 0.35},
  ...thunder(47.2, 0.5), {at: 47.4, s: 'soft-whoosh', v: 0.35, dur: 5.4}, ...EQ.flatMap(([, , a]) => [{at: a, s: 'sfx/ding', v: 0.3}, {at: a + 0.03, s: 'sfx/thud', v: 0.3}] as Sfx[]), {at: 56.0, s: 'sfx/swish', v: 0.4}, ...LAY.map((x) => ({at: x[2], s: 'sfx/thud', v: 0.38})), {at: 65.2, s: 'validation', v: 0.4}, ...rep(65.2, 4, 0.1, 'sfx/ding', 0.12),
  {at: 70.9, s: 'sfx/pop', v: 0.28}, {at: 72.4, s: 'stylo', v: 0.3, dur: 0.8}, {at: 73.0, s: 'bass-hit', v: 0.3}, ...pops([74.3, 75.9, 77.7]),
  ...rep(82.6, 11, 0.2, 'sfx/click', 0.14), {at: 84.9, s: 'validation', v: 0.3}, {at: 85.7, s: 'sfx/pop', v: 0.28}, {at: 88.7, s: 'tampon', v: 0.45}, {at: 90.1, s: 'sfx/pop', v: 0.28},
  {at: 96.0, s: 'sfx/pop', v: 0.3}, {at: 97.2, s: 'sfx/swish', v: 0.4}, ...STEPS.map((x) => ({at: x[2], s: 'bass-hit', v: 0.32})), ...thunder(101.6, 0.3), {at: 102.6, s: 'sfx/rise', v: 0.3, dur: 1}, ...rep(104.9, 16, 0.15, 'sfx/click', 0.07),
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SCN: [React.FC, number, number][] = [[Orage, 2.7, 12.7], [Question, 16.0, 24.7], [Arf, 27.9, 43.4], [Surtension, 46.7, 66.75], [Etude, 70.1, 79.5], [Norme, 79.3, 91.75], [Retenez, 95.1, OUTRO_AT]];
export const FoudreMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    {SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-foudre-metro-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn, hd, Barred];
