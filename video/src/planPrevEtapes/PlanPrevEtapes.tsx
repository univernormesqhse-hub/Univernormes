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
 * « Le plan de prévention : quand, quoi, comment » (voix d'origine, 1 min 15) — capsule « condensé + effet wahou + ultra
 * premium » présentée en métro : une ligne à 6 stations (les 5 points du plan + la signature). Tube de verre à six
 * guichets : le plan → quand ? → 5 points → signer → les étapes → le sourire ; la capsule file d'un guichet à l'autre.
 * Gyrophare (principal), loupe, store vénitien, capsule pneumatique ; barre de recherche « plan de prévention » qui
 * ouvre la poignée de main entreprise utilisatrice ↔ entreprises extérieures. Fil wahou : interrupteur « OU » entre le
 * compteur 400 h / 12 mois et la liste des travaux dangereux, étoile à 5 branches qui se trace autour du plan, annexes
 * agrafées, signatures en cascade, checklist qui défile et inspecteur accueilli avec le sourire. Kits
 * capsule-ui-neo-brutal et capsule-recit-illustre. Couverture : photo + « PLAN DE / PRÉVENTION » en lettres-photos.
 */
const IMG = {
  cover: 'promo/terrain-controle.jpg',
  c1: 'promo/raffinerie.jpg',
  c2: 'heures-gen/equipe-chantier.jpg',
  equipe: 'heures-gen/equipe-chantier.jpg',
  usine: 'promo/raffinerie.jpg',
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
const OUTRO_AT = 75.5;
export const PLAN_PREV_ETAPES_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '1', title: 'Le plan de prévention', s: 'avec les entreprises extérieures', c: NAVY, g: 'le plan', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 9.6, n: '2', title: 'Quand l’établir ?', s: 'avant le début des travaux', c: RED, g: 'quand ?', k: 'gyro', lab: 'GUICHET 2 / 6'},
  {at: 22.3, n: '3', title: 'Les 5 points', s: 'rédigés avec les entreprises extérieures', c: BLUE, g: '5 points', k: 'loupe', lab: 'GUICHET 3 / 6'},
  {at: 45.2, n: '4', title: 'Faire signer', s: 'toutes les parties concernées', c: ORANGE, g: 'signer', k: 'store', lab: 'GUICHET 4 / 6'},
  {at: 50.5, n: '5', title: 'Les étapes', s: 'concrètement, pas à pas', c: VIO, g: 'étapes', k: 'tube', lab: 'GUICHET 5 / 6'},
  {at: 71.2, n: '★', title: 'Avec le sourire', s: 'l’inspection du travail', c: GREEN, g: 'sourire', k: 'none', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 70.6;
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
  {n: 1, l: 'Les phases d’activités dangereuses', s: 'phases', at: 28.4},
  {n: 2, l: 'Les moyens matériels', s: 'moyens', at: 31.4},
  {n: 3, l: 'Les instructions aux travailleurs', s: 'instructions', at: 33.6},
  {n: 4, l: 'Les premiers secours', s: 'secours', at: 36.2},
  {n: 5, l: 'Les conditions de coordination', s: 'coordination', at: 39.7},
  {n: 6, l: 'La signature de toutes les parties', s: 'signature', at: 48.0},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE PRÉVENTION · STATION {r.n} / 6</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="clipboard" w={1080} h={820} pos="50% 40%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 24%, ${PAPER}CC 32%, ${PAPER} 37%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb(NBK, 5), color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3, padding: '8px 22px'}}>ENTREPRISES EXTÉRIEURES</div></Abs>
      <Abs x={0} y={650} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="PLAN DE" src={IMG.c1} size={170} ls={5} /></Abs>
      <Abs x={0} y={830} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="PRÉVENTION" src={IMG.c2} size={140} ls={3} seed={3} /></Abs>
      <Abs x={60} y={1010} w={960} style={{display: 'flex', justifyContent: 'center', gap: 12}}>{[['quand ?', RED], ['5 points', BLUE], ['les étapes', VIO]].map(([n, c], k) => <div key={n} style={{...nb(c, 5), padding: '8px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: '#fff', transform: `translateY(${(1 - Math.min(1, spring(t, 0.3 + k * 0.1))) * 60}px)`}}>{n}</div>)}</Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={NAVY} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Intro : recherche → poignée de main EU ↔ EE ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const shake = prog(t, 7.7, 8.3, easeOut);
  return (
    <Out end={9.65}>
      <Heads h={[[3.6, ['Le', 'plan', 'de', 'prévention'], [1, 3]], [6.4, ['Indispensable'], [0]], [8.0, ['Avec', 'les', 'entreprises', 'extérieures'], [2, 3]]]} />
      <SearchOpen x={60} y={440} w={960} h={880} at={3.2} query="plan de prévention" results={['plan d’intervention', 'plan de prévention', 'permis de feu']} found={1} foundAt={4.9} clickAt={5.5} c={NAVY}>
        <div style={{position: 'absolute', left: 30, top: 40, width: 380, textAlign: 'center'}}><div style={{...nb('#fff', 7), boxShadow: `7px 7px 0 ${NAVY}`, height: 300, overflow: 'hidden'}}><Pic src={IMG.usine} ic="usine" w={372} h={292} pos="50% 50%" /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, marginTop: 14}}>entreprise utilisatrice</div></div>
        <div style={{position: 'absolute', left: 530, top: 40, width: 380, textAlign: 'center', opacity: pop(t, 8.0), transform: `translateX(${(1 - pop(t, 8.0)) * 200}px)`}}><div style={{...nb('#fff', 7), boxShadow: `7px 7px 0 ${ORANGE}`, height: 300, overflow: 'hidden'}}><Pic src={IMG.equipe} ic="chantier" w={372} h={292} pos="50% 40%" /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, marginTop: 14}}>entreprises extérieures</div></div>
        {t > 7.7 && <div style={{position: 'absolute', left: 380, top: 120, transform: `scale(${Math.min(1, spring(t, 7.7))}) rotate(${Math.sin(shake * Math.PI * 4) * 8}deg)`, zIndex: 3}}><div style={{width: 200, height: 200, borderRadius: 100, background: YEL, border: `6px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="poignee" size={140} /></div></div>}
        <div style={{position: 'absolute', left: 0, right: 0, top: 470, display: 'flex', justifyContent: 'center'}}><NBadge at={6.5} text="INDISPENSABLE" bg={RED} rot={-3} size={44} /></div>
        {t > 8.6 && <Dust n={18} c={GOLD} />}
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ Guichet 2 : quand ? interrupteur « OU » ═════════════ */
const Quand: React.FC = () => {
  const t = useT();
  const sw = prog(t, 19.0, 19.5, easeInOut);
  return (
    <Out end={22.35}>
      <Heads h={[[13.2, ['Plusieurs', 'entreprises'], [0, 1]], [14.7, ['Au', 'moins', '400', 'heures'], [2, 3]], [19.0, ['Ou', 'des', 'travaux', 'dangereux'], [0, 3]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{position: 'absolute', left: 0, top: 0, display: 'flex', gap: 14, flexWrap: 'wrap'}}><Chip at={13.0} ic="barriere" l="avant les travaux" c={RED} /><Chip at={13.6} ic="equipe" l="plusieurs entreprises" c={NAVY} /></div>
        <div style={{...nb('#fff', 8), position: 'absolute', left: 0, top: 130, width: 420, height: 470, boxShadow: `8px 8px 0 ${BLUE}`, opacity: lerp(1, 0.55, sw), transform: `scale(${lerp(1, 0.94, sw)})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <svg width={300} height={300} viewBox="-150 -150 300 300">{Array.from({length: 12}, (_, k) => { const on = prog(t, 17.6 + k * 0.05, 17.8 + k * 0.05); return <path key={k} d={`M ${130 * Math.cos(((k * 30 - 90 + 2) * Math.PI) / 180)} ${130 * Math.sin(((k * 30 - 90 + 2) * Math.PI) / 180)} A 130 130 0 0 1 ${130 * Math.cos(((k * 30 - 90 + 28) * Math.PI) / 180)} ${130 * Math.sin(((k * 30 - 90 + 28) * Math.PI) / 180)}`} fill="none" stroke={on > 0 ? BLUE : '#E3E8EF'} strokeWidth={26} opacity={0.3 + 0.7 * on} />; })}<text y={14} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={84} fill={NBK}>{t > 16.8 ? fmt(lerp(0, 400, prog(t, 16.8, 17.5, easeOut))) : '…'}</text><text y={60} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={28} fill={DIM}>heures</text></svg>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, opacity: pop(t, 17.8)}}>au moins · sur 12 mois</div>
        </div>
        <div style={{...nb('#fff', 8), position: 'absolute', left: 540, top: 130, width: 420, height: 470, boxShadow: `8px 8px 0 ${RED}`, opacity: t > 19.4 ? 1 : 0.35, transform: `scale(${t > 19.4 ? lerp(0.94, 1, sw) : 0.94})`, padding: 26, boxSizing: 'border-box'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}><F n="danger" size={70} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, lineHeight: 1.1}}>liste des travaux dangereux</div></div>
          {[0, 1, 2, 3, 4, 5].map((j) => <div key={j} style={{position: 'relative', height: 16, borderRadius: 8, background: '#E3E8EF', marginTop: 30, width: `${92 - (j % 3) * 10}%`}}>{j === 3 && t > 21.3 && <div style={{position: 'absolute', left: -8, top: -10, height: 36, width: `${prog(t, 21.3, 21.9) * 100 + 8}%`, background: `${RED}66`, borderRadius: 8}} />}</div>)}
        </div>
        <div style={{position: 'absolute', left: 405, top: 290, width: 150, height: 150, transform: `scale(${pop(t, 18.8)})`}}>
          <div style={{width: 150, height: 74, borderRadius: 37, border: `6px solid ${NBK}`, background: lerp(0, 1, sw) > 0.5 ? RED : BLUE, position: 'relative', marginTop: 38}}><div style={{position: 'absolute', top: 6, left: lerp(6, 82, sw), width: 50, height: 50, borderRadius: 25, background: '#fff', border: `4px solid ${NBK}`}} /></div>
          <div style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 44, marginTop: 4}}>OU</div>
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 680, display: 'flex', justifyContent: 'center'}}><NBadge at={21.6} text="PLAN ÉCRIT OBLIGATOIRE" bg={NAVY} rot={-2} size={40} /></div>
      </Abs>
    </Out>
  );
};

/* ═════════════ Guichet 3 : les 5 points en étoile ═════════════ */
const PTS: [string, string, number, string][] = [['phases d’activités dangereuses', 'danger', 28.4, RED], ['moyens matériels', 'grue', 31.4, ORANGE], ['instructions aux travailleurs', 'megaphone', 33.6, BLUE], ['organisation des premiers secours', 'pansement', 36.2, GREEN], ['conditions de coordination', 'poignee', 39.1, VIO]];
const CX = 480, CY = 400, R = 300;
const pp = (k: number) => { const a = ((-90 + k * 72) * Math.PI) / 180; return [CX + R * Math.cos(a), CY + R * Math.sin(a)]; };
const Points: React.FC = () => {
  const t = useT();
  if (t < 41.0) return (
    <Out end={41.05}>
      <Heads h={[[26.0, ['5', 'points', 'principaux'], [0, 2]], [28.2, ['Les', 'phases', 'dangereuses'], [1, 2]], [31.0, ['Les', 'moyens', 'matériels'], [1, 2]], [33.4, ['Les', 'instructions'], [1]], [35.6, ['Les', 'premiers', 'secours'], [1, 2]], [38.6, ['La', 'coordination'], [1]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        <svg style={{position: 'absolute', left: 0, top: 0}} width={960} height={930}>
          {PTS.map((p, k) => { if (k === 0) return null; const [x0, y0] = pp(k - 1); const [x1, y1] = pp(k); const q = prog(t, p[2] - 0.2, p[2] + 0.3); return <line key={k} x1={x0} y1={y0} x2={lerp(x0, x1, q)} y2={lerp(y0, y1, q)} stroke={NBK} strokeWidth={8} strokeLinecap="round" opacity={q > 0 ? 1 : 0} />; })}
          {(() => { const [x0, y0] = pp(4); const [x1, y1] = pp(0); const q = prog(t, 39.6, 40.0); return <line x1={x0} y1={y0} x2={lerp(x0, x1, q)} y2={lerp(y0, y1, q)} stroke={NBK} strokeWidth={8} strokeLinecap="round" opacity={q > 0 ? 1 : 0} />; })()}
          {[0, 1, 2, 3, 4].map((k) => { const [x0, y0] = pp(k); const [x1, y1] = pp((k + 2) % 5); const q = prog(t, 40.0 + k * 0.1, 40.3 + k * 0.1); return <line key={`s${k}`} x1={x0} y1={y0} x2={lerp(x0, x1, q)} y2={lerp(y0, y1, q)} stroke={GOLD} strokeWidth={10} strokeLinecap="round" opacity={q > 0 ? 0.9 : 0} style={{filter: `drop-shadow(0 0 10px ${GOLD})`}} />; })}
        </svg>
        <div style={{...nb('#fff', 8), position: 'absolute', left: CX - 105, top: CY - 95, width: 210, height: 250, padding: 14, boxShadow: t > 40.4 ? `0 0 50px ${GOLD}` : `8px 8px 0 ${NAVY}`, transform: `scale(${pop(t, 25.9)}) rotate(-2deg)`, zIndex: 2}}>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 19, color: NAVY, textAlign: 'center'}}>PLAN DE PRÉVENTION</div>
          {PTS.map((p, k) => <div key={k} style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 9}}><div style={{width: 26, height: 26, borderRadius: 13, background: t > p[2] ? p[3] : '#E3E8EF', color: '#fff', fontSize: 15, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{k + 1}</div><div style={{flex: 1, height: 12, borderRadius: 6, background: t > p[2] ? `${p[3]}55` : '#E3E8EF'}} /></div>)}
        </div>
        {PTS.map(([l, ic, a, c], k) => { const [x, y] = pp(k); const on = t > a; return <div key={l} style={{position: 'absolute', left: x - 120, top: y - 70, width: 240, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: on ? 1 : 0, transform: `scale(${on ? Math.min(1, spring(t, a)) : 0.3})`, zIndex: 3}}>
          <div style={{position: 'relative', width: 120, height: 120, borderRadius: 60, background: '#fff', border: `6px solid ${NBK}`, boxShadow: `6px 6px 0 ${c}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={ic} size={80} /><div style={{position: 'absolute', left: -14, top: -14, width: 46, height: 46, borderRadius: 23, background: c, border: `4px solid ${NBK}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{k + 1}</div></div>
          <div style={{...nb('#fff', 4), marginTop: 10, padding: '6px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 22, textAlign: 'center', lineHeight: 1.1, color: c}}>{l}</div>
        </div>; })}
        {t > 22.4 && t < 27.5 && <div style={{position: 'absolute', left: 0, right: 0, top: 800, display: 'flex', justifyContent: 'center'}}><NBadge at={26.2} text="RÉDIGÉ CONJOINTEMENT" bg={NAVY} rot={-2} size={32} /></div>}
      </Abs>
    </Out>
  );
  return (
    <Out end={45.25}>
      <Heads h={[[41.2, ['D’autres', 'documents'], [1]], [42.6, ['En', 'annexe'], [1]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{...nb('#fff', 8), position: 'absolute', left: 280, top: 140, width: 400, height: 520, padding: 26, boxShadow: `8px 8px 0 ${NAVY}`, opacity: pop(t, 41.0)}}>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: NAVY, textAlign: 'center'}}>PLAN DE PRÉVENTION</div>
          {PTS.map((p, k) => <div key={k} style={{display: 'flex', alignItems: 'center', gap: 10, marginTop: 26}}><div style={{width: 34, height: 34, borderRadius: 17, background: p[3], color: '#fff', fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{k + 1}</div><div style={{flex: 1, height: 14, borderRadius: 7, background: `${p[3]}55`}} /></div>)}
        </div>
        {[['dossier amiante', 'danger', 42.6, -1, ORANGE], ['FDS', 'eprouvette', 43.4, 1, TEAL]].map(([l, ic, a, side, c]) => { const on = t > (a as number); const p = on ? Math.min(1, spring(t, a as number)) : 0; return <div key={l as string} style={{position: 'absolute', left: (side as number) < 0 ? lerp(-300, 60, p) : lerp(1200, 640, p), top: 60, width: 260, transform: `rotate(${(side as number) * 8}deg)`, opacity: on ? 1 : 0}}>
          <div style={{...nb('#fff', 6), boxShadow: `6px 6px 0 ${c}`, height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12}}><F n={ic as string} size={110} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, textAlign: 'center'}}>{l}</div></div>
          <div style={{position: 'absolute', left: 110, top: -30, width: 40, height: 80, borderRadius: 20, border: `7px solid #8A96A8`, borderBottomColor: 'transparent'}} />
        </div>; })}
        <div style={{position: 'absolute', left: 0, right: 0, top: 720, display: 'flex', justifyContent: 'center'}}><NBadge at={44.1} text="PEUVENT Y FIGURER EN ANNEXE" bg={ORANGE} rot={-2} size={32} /></div>
      </Abs>
    </Out>
  );
};

/* ═════════════ Guichet 4 : signatures en cascade ═════════════ */
const Signer: React.FC = () => {
  const t = useT();
  return (
    <Out end={50.55}>
      <Heads h={[[48.6, ['Toutes', 'les', 'parties'], [2]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{...nb('#fff', 8), position: 'absolute', left: 100, top: 40, width: 760, padding: 30, boxShadow: `8px 8px 0 ${ORANGE}`}}>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: NAVY, textAlign: 'center', marginBottom: 14}}>PLAN DE PRÉVENTION · SIGNATURES</div>
          {['entreprise utilisatrice', 'entreprise extérieure', 'entreprise extérieure'].map((l, k) => { const a = 48.7 + k * 0.35; return <div key={k} style={{display: 'flex', alignItems: 'center', gap: 20, height: 110, borderTop: '3px solid #E3E8EF'}}>
            <div style={{width: 260, fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: DIM}}>{l}</div>
            <svg width={320} height={80}><path d={`M 10 ${55 - k * 4} C 40 5, 70 75, 110 40 S 170 ${15 + k * 5}, 210 50 S 270 25, 310 ${40 + k * 4}`} fill="none" stroke={NAVY} strokeWidth={5} strokeLinecap="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - prog(t, a, a + 0.45)}} /></svg>
            <div style={{fontSize: 40, fontWeight: 900, color: GREEN}}>{t > a + 0.45 ? '✓' : ''}</div>
          </div>; })}
        </div>
        <Stamp at={50.0} text="SIGNÉ" c={GREEN} x={560} y={520} rot={-10} size={70} />
      </Abs>
    </Out>
  );
};

/* ═════════════ Guichet 5 : la checklist qui défile ═════════════ */
const STEPS: [number, string, string][] = [[53.1, 'récupérer un exemple de plan', 'dossier'], [54.8, 'définir les phases dangereuses', 'danger'], [57.2, 'mentionner les moyens', 'outils'], [57.8, 'les instructions', 'megaphone'], [58.8, 'l’organisation des secours', 'pansement'], [61.3, 'récupérer la liste des postes à risques', 'clipboard'], [62.9, 'annexer les FDS', 'eprouvette'], [65.0, 'faire signer toutes les parties', 'ecrit'], [67.5, 'informer l’inspection du travail', 'enveloppe'], [69.7, 'réaliser une inspection commune', 'loupe']];
const Etapes: React.FC = () => {
  const t = useT();
  const done = STEPS.filter((x) => t > x[0]).length;
  const scroll = Math.max(0, done - 6) * 108;
  const sm = lerp(0, scroll, 1);
  return (
    <Out end={71.25}>
      <Heads h={[[54.0, ['Les', 'étapes', 'à', 'suivre'], [1, 3]], [60.5, ['Postes', 'à', 'risques', '&', 'FDS'], [0, 4]], [64.6, ['Signer', 'et', 'informer'], [0, 2]], [69.2, ['L’inspection', 'commune'], [0, 1]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{...nb('#fff', 6), position: 'absolute', left: 0, top: 0, width: 960, height: 46, overflow: 'hidden', padding: 0}}><div style={{width: `${(done / STEPS.length) * 100}%`, height: '100%', background: `linear-gradient(90deg, ${VIO}, ${GREEN})`, transition: undefined}} /></div>
        <div style={{position: 'absolute', left: 0, top: 80, width: 960, height: 660, overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 0, top: -sm, width: 960}}>
            {STEPS.map(([a, l, ic], k) => { const on = t > a - 0.3; const ck = t > a + 0.3; return <div key={k} style={{...nb(ck ? '#fff' : '#F6F7FA', 5), position: 'absolute', left: 0, top: k * 108, width: 930, height: 92, boxShadow: ck ? `5px 5px 0 ${VIO}` : 'none', display: 'flex', alignItems: 'center', gap: 18, padding: '0 20px', opacity: on ? 1 : 0, transform: `translateX(${on ? (1 - Math.min(1, spring(t, a - 0.3))) * -300 : 0}px)`}}>
              <div style={{width: 52, height: 52, borderRadius: 12, border: `4px solid ${NBK}`, background: ck ? GREEN : '#fff', color: '#fff', fontSize: 34, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${ck ? Math.min(1.15, spring(t, a + 0.3)) : 1})`}}>{ck ? '✓' : ''}</div>
              <F n={ic} size={60} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32}}>{l}</span>
            </div>; })}
          </div>
        </div>
        {t > 67.5 && t < 69.4 && <div style={{position: 'absolute', left: lerp(500, 900, prog(t, 67.8, 69.0, easeIn)), top: lerp(640, -250, prog(t, 67.8, 69.0, easeIn)), transform: `rotate(-20deg) scale(${lerp(1, 0.5, prog(t, 67.8, 69.0))})`, zIndex: 5}}><F n="enveloppe" size={130} /></div>}
        {t > 69.7 && <div style={{position: 'absolute', left: 0, right: 0, top: 780, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, transform: `scale(${Math.min(1, spring(t, 69.7))})`}}><F n="superviseur" size={100} /><F n="loupe" size={80} /><F n="ouvrier" size={100} /><NBadge at={69.8} text="INSPECTION COMMUNE" bg={VIO} rot={-2} size={30} /></div>}
      </Abs>
    </Out>
  );
};

/* ═════════════ Guichet 6 : avec le sourire ═════════════ */
const Sourire: React.FC = () => {
  const t = useT();
  const door = prog(t, 72.6, 73.4, easeInOut);
  const need = prog(t, 73.0, 74.3, easeInOut);
  return (
    <>
      <Heads h={[[71.4, ['Voir', 'venir', 'l’inspection'], [1, 2]], [74.0, ['Avec', 'le', 'sourire'], [2]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{position: 'absolute', left: 300, top: 0, width: 360, height: 480, ...nb('#fff', 8), boxShadow: `8px 8px 0 ${GREEN}`, overflow: 'hidden', perspective: 1200, opacity: pop(t, 71.3)}}>
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="auditeur" size={240} /></div>
          <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #B98A55, #8E6438)', border: `4px solid ${NBK}`, transformOrigin: '0 50%', transform: `rotateY(${-door * 100}deg)`}}><div style={{position: 'absolute', right: 30, top: 230, width: 26, height: 26, borderRadius: 13, background: GOLD, border: `3px solid ${NBK}`}} /></div>
        </div>
        <div style={{position: 'absolute', left: 180, top: 540, width: 600}}>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM, marginBottom: 8}}>NIVEAU DE STRESS</div>
          <div style={{position: 'relative', height: 60, borderRadius: 30, border: `5px solid ${NBK}`, background: `linear-gradient(90deg, ${GREEN}, ${YEL}, ${RED})`}}><div style={{position: 'absolute', top: -14, left: `${lerp(88, 8, need)}%`, width: 16, height: 80, marginLeft: -8, background: NBK, borderRadius: 8}} /></div>
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 690, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20}}><div style={{transform: `scale(${t > 74.3 ? Math.min(1.15, spring(t, 74.3)) : 1})`}}><F n={t > 74.3 ? 'pouce' : 'anxieux'} size={150} /></div>{t > 74.3 && <NBadge at={74.4} text="AVEC LE SOURIRE" bg={GREEN} rot={-3} size={40} />}</div>
        {t > 74.4 && <Dust n={24} c={GOLD} />}
      </Abs>
    </>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at, s: 'sfx/bell', v: 0.22})),
  ...searchCues(3.2, 18, 4.9, 5.5), {at: 6.5, s: 'tampon', v: 0.4}, {at: 7.7, s: 'bass-hit', v: 0.4},
  {at: 13.0, s: 'sfx/pop', v: 0.25}, {at: 13.6, s: 'sfx/pop', v: 0.25}, {at: 16.8, s: 'sfx/rise', v: 0.3, dur: 0.8}, ...rep(17.6, 12, 0.05, 'sfx/click', 0.12), {at: 19.0, s: 'sfx/click', v: 0.5}, {at: 19.1, s: 'sfx/swish', v: 0.35}, {at: 21.3, s: 'stylo', v: 0.25, dur: 0.7}, {at: 21.6, s: 'tampon', v: 0.4},
  {at: 25.9, s: 'sfx/pop', v: 0.3}, ...PTS.map((p) => ({at: p[2], s: 'sfx/thud', v: 0.35})), {at: 40.0, s: 'sfx/rise', v: 0.35, dur: 0.9}, {at: 40.5, s: 'validation', v: 0.3},
  {at: 42.6, s: 'sfx/swish', v: 0.35}, {at: 43.4, s: 'sfx/swish', v: 0.35}, {at: 44.1, s: 'tampon', v: 0.35},
  ...rep(48.7, 3, 0.35, 'stylo', 0.25), {at: 50.0, s: 'tampon', v: 0.5},
  ...STEPS.map((x) => ({at: x[0] + 0.3, s: 'validation', v: 0.15})), {at: 67.8, s: 'soft-whoosh', v: 0.4, dur: 1.2}, {at: 69.7, s: 'tampon', v: 0.35},
  {at: 72.6, s: 'sfx/swish', v: 0.3}, {at: 73.0, s: 'soft-whoosh', v: 0.3, dur: 1.3}, {at: 74.3, s: 'validation', v: 0.4}, {at: 74.4, s: 'bass-hit', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
export const PlanPrevEtapes: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.8} to={9.7}><Intro /></Gate>
    <Gate from={12.9} to={22.4}><Quand /></Gate>
    <Gate from={22.3} to={45.3}><Points /></Gate>
    <Gate from={48.5} to={50.6}><Signer /></Gate>
    <Gate from={53.8} to={71.3}><Etapes /></Gate>
    <Gate from={71.2} to={OUTRO_AT}><Sourire /></Gate>
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-plan-prev-etapes-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC];
