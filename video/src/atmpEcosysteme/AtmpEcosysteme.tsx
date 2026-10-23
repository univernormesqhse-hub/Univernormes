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
 * « L'écosystème des accidents du travail et maladies professionnelles » (7 min 11) — capsule « condensé + effet wahou
 * + ultra premium » présentée en métro : 8 stations (1 297 décès → 50 % → fréquence ≠ gravité → 24 h / 48 h → taux
 * d'IPP → 2 conditions FIE → 562 950 € → nécessité). Voix d'origine (sans musique de fond), sous-titres calés mot à mot.
 * Couverture : photo + « ACCIDENTS DU TRAVAIL » en lettres-photos animées. Fil rouge : tube pneumatique à six guichets
 * calés sur le programme annoncé (chiffres → définition → taux d'IPP → faute inexcusable → coûts → prévention) ;
 * gyrophare (transition principale), loupe et capsule pneumatique plein écran ; store vénitien ; barre de recherche.
 */
const IMG = {
  cover: 'diag-gen/accidents.jpg',
  cAcc: 'verites/accident.jpg',
  cTrav: 'heures-gen/equipe-chantier.jpg',
  manutention: 'ishikawa-gen/dos.jpg',
  stats: 'heures-gen/rapport.jpg',
  declaration: 'ishikawa-gen/signatures.jpg',
  medecin: 'ishikawa-gen/blessure.jpg',
  employeur: 'alerte-gen/direction.jpg',
  machine: 'ishikawa-gen/piece-mouvement.jpg',
  chantier: 'heures-gen/secteurs.jpg',
  final: 'ishikawa-gen/final.jpg',
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
const OUTRO_AT = 431.4;
export const ATMP_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 70.5, n: '1', title: 'Les chiffres réels', s: 'au crible des statistiques', c: RED, g: 'chiffres', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 161.7, n: '2', title: 'La définition légale', s: 'travail ou trajet ?', c: BLUE, g: 'définition', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 207.18, n: '3', title: 'Contester le taux d’IPP', s: 'le pourcentage qui dicte tout', c: VIO, g: 'taux d’IPP', k: 'loupe', lab: 'PARTIE 3 / 6'},
  {at: 247.58, n: '4', title: 'La faute inexcusable', s: 'deux conditions', c: ORANGE, g: 'faute (FIE)', k: 'tube', lab: 'PARTIE 4 / 6'},
  {at: 306.7, n: '5', title: 'Tarification & coûts', s: 'l’impact financier', c: GOLD, g: 'coûts', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 373.22, n: '6', title: 'La prévention', s: 'la seule vraie solution', c: GREEN, g: 'prévention', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 420.58;
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

/* ═════════════ La ligne de métro (8 stations) ═════════════ */
const STATIONS = [
  {n: 1, l: '1 297 décès en 2024', s: '1 297', at: 86.5},
  {n: 2, l: 'Manutention : la moitié des accidents', s: '50 %', at: 112.1},
  {n: 3, l: 'Fréquence en baisse ≠ gravité en baisse', s: 'gravité', at: 152.42},
  {n: 4, l: '24 h employeur · 48 h CPAM', s: '24 h / 48 h', at: 195.1},
  {n: 5, l: 'Le pourcentage qui dicte tout', s: 'taux IPP', at: 226.34},
  {n: 6, l: 'Faute inexcusable : 2 conditions', s: 'FIE', at: 285.14},
  {n: 7, l: '562 950 € pour un seul sinistre', s: '562 950 €', at: 344.5},
  {n: 8, l: 'Une nécessité absolue', s: 'prévention', at: 398.34},
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

const fmt = (n: number) => Math.round(n).toLocaleString('fr-FR').replace(/ | /g, ' ');
const Timer: React.FC<{at: number; label: string; who: string; c: string; size?: number}> = ({at, label, who, c, size = 300}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: pop(t, at), transform: `scale(${t > at ? spring(t, at) : 0.6})`}}>
      <div style={{position: 'relative', width: size, height: size, borderRadius: '50%', background: `conic-gradient(${c} ${Math.min(1, k / 3) * 360}deg, #E3E8EF 0deg)`, border: `8px solid ${INK}`}}>
        <div style={{position: 'absolute', inset: size * 0.13, borderRadius: '50%', background: '#fff', border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.24, color: INK}}>{label}</div>
        <div style={{position: 'absolute', left: size / 2 - 4, top: size * 0.06, width: 8, height: size * 0.44, background: c, borderRadius: 4, transformOrigin: '50% 100%', transform: `rotate(${k * 240}deg)`}} />
      </div>
      <div style={{marginTop: 14, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: c}}>{who}</div>
    </div>
  );
};

/* ═════════════ Couverture : photo + « ACCIDENTS DU TRAVAIL » en lettres-photos animées ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="pansement" w={1080} h={800} pos="50% 30%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 22%, ${PAPER}CC 30%, ${PAPER} 35%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={560} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: '#fff', background: RED, padding: '8px 24px', borderRadius: 8}}>L’ÉCOSYSTÈME AT / MP</div></Abs>
      <Abs x={0} y={650} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="ACCIDENTS" src={IMG.cAcc} size={150} ls={0} /></Abs>
      <Abs x={0} y={810} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="DU TRAVAIL" src={IMG.cTrav} size={140} ls={0} seed={3} /></Abs>
      <Abs x={0} y={975} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: NAVY, letterSpacing: -1, lineHeight: 1.1}}>& MALADIES PROFESSIONNELLES</Abs>
      <Abs x={0} y={1070} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 12}}>{[{l: 'chiffres', ic: 'graphique', c: RED}, {l: 'droit', ic: 'balance', c: BLUE}, {l: 'IPP', ic: 'stethoscope', c: VIO}, {l: 'faute', ic: 'juge', c: ORANGE}, {l: 'coûts', ic: 'argent', c: GOLD}, {l: 'prévention', ic: 'bouclier', c: GREEN}].map((p) => <div key={p.l} style={{width: 150, height: 130, borderRadius: 22, background: p.c, border: `5px solid ${INK}`, boxShadow: `4px 4px 0 ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><F n={p.ic} size={58} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 20, color: '#fff'}}>{p.l}</div></div>)}</Abs>
      <Abs x={0} y={1250} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 40, color: INK}}>un seul incident, <span style={{color: RED}}>une onde de choc</span></Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO ═════════════ */
const PROG = [{l: 'les statistiques', a: 55.14, c: RED, ic: 'graphique'}, {l: 'la définition de l’AT', a: 56.94, c: BLUE, ic: 'balance'}, {l: 'contester le taux d’IPP', a: 60.5, c: VIO, ic: 'stethoscope'}, {l: 'la faute inexcusable', a: 63.5, c: ORANGE, ic: 'juge'}, {l: 'l’impact financier', a: 64.98, c: GOLD, ic: 'argent'}, {l: 'la prévention', a: 67.66, c: GREEN, ic: 'bouclier'}];
const Intro: React.FC = () => {
  const t = useT();
  const ph = t < 14.9 ? 0 : t < 30.1 ? 1 : t < 52.2 ? 2 : 3;
  const wave = (t - 15.86) / 2.2;
  const link = prog(t, 27.1, 28.6, easeOut);
  const SAT = [{l: 'statistiques', ic: 'graphique', a: 17.78, x: 474, y: 110, c: RED}, {l: 'finances', ic: 'argent', a: 21.06, x: 150, y: 640, c: GOLD}, {l: 'parcours juridique', ic: 'juge', a: 23.66, x: 800, y: 640, c: BLUE}];
  return (
    <Out end={70.5}>
      {ph === 0 && (
        <>
          <HiLine words={['L’écosystème', 'AT', '/', 'MP']} mark={[0, 1, 3]} at={6.02} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 40, display: 'flex', justifyContent: 'center', gap: 30}}>
              {[{l: 'accidents du travail', ic: 'pansement', c: RED, a: 7.46}, {l: 'maladies professionnelles', ic: 'stethoscope', c: VIO, a: 8.42}].map((x) => <div key={x.l} style={{width: 440, height: 380, borderRadius: 30, background: '#fff', border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${x.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: pop(t, x.a), transform: `rotateY(${(1 - prog(t, x.a, x.a + 0.5, easeOut)) * 90}deg)`}}><F n={x.ic} size={150} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK, textAlign: 'center'}}>{x.l}</div></div>)}
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 480, display: 'flex', justifyContent: 'center'}}><div style={{position: 'relative'}}><Pill at={12.06} c={DIM} size={32}>simple dossier administratif</Pill><div style={{position: 'absolute', left: 10, right: 10, top: '50%'}}><Strike p={prog(t, 12.8, 13.3)} c={RED} /></div></div></div>
            {t > 13.34 && <Stamp at={13.34} c={RED} text="un véritable phénomène" x={90} y={620} rot={-5} size={44} />}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 26.3 ? ['Une', 'onde', 'de', 'choc'] : ['Une', 'vision', 'd’ensemble']} mark={t < 26.3 ? [1, 3] : [1, 2]} at={t < 26.3 ? 15.86 : 28.98} y={330} size={68} />
          <Abs x={60} y={440} w={960} h={930} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 15.0)}}>
            {wave > 0 && [0, 1, 2, 3].map((k) => { const r = ((wave + k * 0.25) % 1); return <div key={k} style={{position: 'absolute', left: 474 - r * 650, top: 450 - r * 650, width: r * 1300, height: r * 1300, borderRadius: '50%', border: `8px solid ${RED}`, opacity: (1 - r) * (t < 26.3 ? 1 : 0.3)}} />; })}
            <svg width={948} height={918} style={{position: 'absolute', left: 0, top: 0}}>{[[0, 1], [1, 2], [2, 0]].map(([a, b], k) => <line key={k} x1={SAT[a].x} y1={SAT[a].y + 80} x2={lerp(SAT[a].x, SAT[b].x, link)} y2={lerp(SAT[a].y + 80, SAT[b].y + 80, link)} stroke={YEL} strokeWidth={6} strokeDasharray="14 10" />)}</svg>
            <div style={{position: 'absolute', left: 374, top: 350, width: 200, height: 200, borderRadius: 100, background: RED, border: '6px solid #fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + 0.06 * Math.sin(t * 6)})`}}><F n="collision" size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: '#fff'}}>1 incident</div></div>
            {SAT.map((x) => <div key={x.l} style={{position: 'absolute', left: x.x - 130, top: x.y, width: 260, height: 170, borderRadius: 24, background: '#fff', border: `5px solid ${x.c}`, boxShadow: `0 0 26px ${x.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${t > x.a ? spring(t, x.a) : 0})`}}><F n={x.ic} size={70} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, textAlign: 'center'}}>{x.l}</div></div>)}
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 49.0 ? ['Prévenir', '>', 'corriger'] : ['La', 'clé', 'de', 'voûte']} mark={t < 49.0 ? [0, 2] : [1, 3]} at={t < 49.0 ? 30.18 : 49.94} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930}>
            {t < 47.0 ? <>
              {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{position: 'absolute', left: 280 + (k - 2) * 90 * prog(t, 41.74, 42.6), top: 200 + Math.abs(k - 2) * 40 * prog(t, 41.74, 42.6), width: 140, height: 160, background: '#C46A3C', border: `5px solid ${INK}`, clipPath: ['polygon(0 0,100% 10%,80% 100%,10% 90%)', 'polygon(10% 0,100% 0,90% 100%,0 80%)', 'polygon(0 10%,90% 0,100% 90%,20% 100%)', 'polygon(0 0,100% 20%,70% 100%,0 100%)', 'polygon(20% 0,100% 10%,100% 100%,0 70%)'][k], transform: `rotate(${(k - 2) * 25 * prog(t, 41.74, 42.6)}deg)`, opacity: pop(t, 38.6)}} />)}
              <div style={{position: 'absolute', left: 0, right: 0, top: 480, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={43.06} c={RED} size={30}>douloureux</Pill><Pill at={44.26} c={GOLD} size={30}>extrêmement cher</Pill></div>
              <div style={{position: 'absolute', left: 0, right: 0, top: 600, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 120, color: GOLD, opacity: pop(t, 44.26), transform: `translateY(${-Math.max(0, t - 44.26) * 20}px)`}}>€ € €</div>
            </> : <>
              {Array.from({length: 9}, (_, k) => { const a = Math.PI * (1 - k / 8); const isKey = k === 4; const at = isKey ? 49.94 : 47.2 + (k > 4 ? k - 1 : k) * 0.25; const drop = prog(t, at, at + 0.4, easeIn); return <div key={k} style={{position: 'absolute', left: 480 + Math.cos(a) * 330 - 55, top: 560 - Math.sin(a) * 330 - 45 - (1 - drop) * 500, width: 110, height: 90, background: isKey ? GREEN : '#C9B48E', border: `5px solid ${INK}`, borderRadius: 10, transform: `rotate(${90 - (a * 180) / Math.PI}deg)`, opacity: drop > 0 ? 1 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: isKey && t > 50.3 ? `0 0 30px ${GREEN}` : 'none'}}>{isKey && <F n="bouclier" size={50} />}</div>; })}
              {[[120, 560], [770, 560]].map(([x, y], k) => <div key={k} style={{position: 'absolute', left: x, top: y, width: 110, height: 330, background: '#C9B48E', border: `5px solid ${INK}`}} />)}
              {t > 50.3 && <div style={{position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center'}}><Pill at={50.3} c={GREEN} size={34}>la prévention</Pill></div>}
            </>}
          </Abs>
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={['Au', 'programme']} mark={[1]} at={52.26} y={330} size={70} />
          <SearchOpen x={60} y={440} w={960} h={930} at={52.4} query="écosystème AT / MP" results={['Registre des accidents bénins', 'L’écosystème AT / MP : 6 étapes', 'Document unique']} found={1} foundAt={53.85} clickAt={54.15} c={RED}>
            <div style={{position: 'absolute', inset: 0, padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 14}}>
              {PROG.map((x, k) => <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 16, height: 118, borderRadius: 22, background: '#fff', border: `5px solid ${INK}`, boxShadow: `5px 5px 0 ${x.c}`, padding: '0 18px', opacity: pop(t, x.a), transform: `translateX(${(1 - pop(t, x.a)) * 80}px)`}}><div style={{width: 72, height: 72, borderRadius: 18, background: x.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `4px solid ${INK}`}}>{k + 1}</div><F n={x.ic} size={60} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK}}>{x.l}</span></div>)}
            </div>
          </SearchOpen>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 1 · LES CHIFFRES ═════════════ */
const Chiffres: React.FC = () => {
  const t = useT();
  const ph = t < 102.8 ? 0 : t < 123.6 ? 1 : t < 143.2 ? 2 : 3;
  const n = prog(t, 85.0, 87.9, easeOut) * 1297;
  const dots = prog(t, 96.0, 99.6);
  const half = prog(t, 112.1, 113.3, easeOut);
  return (
    <Out end={161.7}>
      {ph === 0 && (
        <>
          <HiLine words={t < 86.4 ? ['En', '2024'] : t < 93.9 ? ['1 297', 'décès'] : ['Une', 'réalité', 'humaine']} mark={t < 86.4 ? [1] : t < 93.9 ? [0, 1] : [1, 2]} at={t < 86.4 ? 83.38 : t < 93.9 ? 86.5 : 96.78} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 10, display: 'flex', justifyContent: 'center', opacity: pop(t, 84.9)}}><PhotoLetterAnim ch={fmt(n)} src={IMG.cAcc} size={230} ls={0} /></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 250, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: INK, opacity: pop(t, 86.5)}}>décès · tous sinistres confondus</div>
            {t > 90.5 && <div style={{position: 'absolute', left: 0, right: 0, top: 330, display: 'flex', justifyContent: 'center'}}><div style={{display: 'flex', alignItems: 'center', gap: 10, background: RED, borderRadius: 40, padding: '8px 24px', transform: `scale(${spring(t, 90.5)})`}}><F n="hausse" size={50} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff'}}>+ 10 décès vs 2023</span></div></div>}
            {t > 95.5 && <svg width={960} height={440} style={{position: 'absolute', left: 0, top: 460}}>{Array.from({length: 1297}, (_, k) => { const cols = 48; const x = (k % cols) * 20 + 2; const y = Math.floor(k / cols) * 16 + 2; return k / 1297 <= dots ? <rect key={k} x={x} y={y} width={13} height={11} rx={3} fill={k >= 1287 ? YEL : RED} opacity={0.85} /> : null; })}</svg>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 116.4 ? ['La', 'moitié', ':', '50 %'] : ['Le', 'trio', 'de', 'tête']} mark={t < 116.4 ? [1, 3] : [1, 3]} at={t < 116.4 ? 110.26 : 116.5} y={330} size={70} />
          <Shot src={IMG.manutention} ic="colis" x={60} y={440} w={960} h={360} at={103.0} c={RED} />
          <Abs x={60} y={830} w={960} h={540}>
            <div style={{position: 'absolute', left: 20, top: 20, width: 460, height: 460, borderRadius: '50%', border: `8px solid ${INK}`, background: `conic-gradient(${RED} ${half * 180}deg, #E3E8EF 0deg)`}}><div style={{position: 'absolute', inset: 90, borderRadius: '50%', background: PAPER, border: `6px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: RED, lineHeight: 1}}>{t > 112.1 ? <Count n={50} a={112.1} b={113.3} suf=" %" /> : '0 %'}</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM}}>manutention</div></div></div>
            <div style={{position: 'absolute', left: 520, top: 30, right: 0, display: 'flex', flexDirection: 'column', gap: 16}}>
              {[{l: 'manutention manuelle', ic: 'colis', a: 107.98, c: RED}, {l: 'chutes de plain-pied', ic: 'pas', a: 114.82, c: ORANGE}, {l: 'chutes de hauteur', ic: 'echelle', a: 115.6, c: GOLD}].map((x, k) => <div key={x.l} style={{height: 120, borderRadius: 20, background: '#fff', border: `5px solid ${x.c}`, display: 'flex', alignItems: 'center', gap: 12, padding: '0 14px', opacity: pop(t, x.a)}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: x.c}}>{k + 1}</div><F n={x.ic} size={60} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK}}>{x.l}</span></div>)}
              {t > 121.86 && <Pill at={121.86} c={NAVY} size={24}>nos gestes les plus routiniers</Pill>}
            </div>
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Une', 'vraie', 'disparité']} mark={[2]} at={128.42} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930}>
            {[{side: 0, who: 'hommes', ic: 'ouvrier', a: 130.34, w: 135.66, l: 'traumatismes physiques graves', s: 'sévères & immédiats', ic2: 'eclair', c: BLUE}, {side: 1, who: 'femmes', ic: 'salariee', a: 136.98, w: 141.7, l: 'affections chroniques · TMS', s: 'qui s’installent dans le temps', ic2: 'sablier', c: VIO}].map((p) => <div key={p.who} style={{position: 'absolute', left: p.side * 490, top: 0, width: 470, height: 900, borderRadius: 28, background: '#fff', border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${p.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 24, boxSizing: 'border-box', gap: 16, opacity: pop(t, p.a)}}>
              <F n={p.ic2} size={130} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, textAlign: 'center'}}>{p.l}</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: p.c, textAlign: 'center'}}>{p.s}</div>
              <div style={{marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: pop(t, p.w), transform: `scale(${t > p.w ? spring(t, p.w) : 0.5})`}}><F n={p.ic} size={200} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: p.c, textAlign: 'center'}}>surtout les {p.who}</div></div>
            </div>)}
          </Abs>
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={['Fréquence', '≠', 'gravité']} mark={[0, 2]} at={152.42} y={330} size={72} />
          <Abs x={60} y={440} w={960} h={930} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 143.4)}}>
            {t > 144.18 && <Stamp at={144.18} c={RED} text="piège statistique" x={250} y={40} rot={-4} size={46} />}
            <div style={{position: 'absolute', left: 40, top: 180, width: 410, height: 500, borderRadius: 20, background: '#F4F6FA', border: `4px solid ${INK}`, opacity: pop(t, 147.02)}}>
              <div style={{position: 'absolute', left: 16, top: 12, fontFamily: MONO, fontWeight: 700, fontSize: 20, color: BLUE}}>indice de fréquence</div>
              <svg width={402} height={492}><path d={`M 30 120 L 130 160 L 230 ${lerp(200, 300, prog(t, 152.4, 154.0))} L 360 ${lerp(220, 400, prog(t, 152.4, 154.7))}`} fill="none" stroke={BLUE} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" /></svg>
              {t > 153.7 && <div style={{position: 'absolute', left: 16, bottom: 14}}><Pill at={153.7} c={BLUE} size={24}>en baisse</Pill></div>}
            </div>
            <div style={{position: 'absolute', right: 40, top: 180, width: 410, height: 500, borderRadius: 20, background: '#FFF1F0', border: `4px solid ${INK}`, opacity: pop(t, 154.74)}}>
              <div style={{position: 'absolute', left: 16, top: 12, fontFamily: MONO, fontWeight: 700, fontSize: 20, color: RED}}>gravité</div>
              <div style={{position: 'absolute', left: 140, bottom: 70, width: 130, height: lerp(120, 360, prog(t, 158.6, 160.8, easeOut)), background: RED, border: `5px solid ${INK}`, borderRadius: '14px 14px 0 0'}} />
              {t > 160.66 && <div style={{position: 'absolute', left: 16, bottom: 14}}><Pill at={160.66} c={RED} size={24}>conséquences plus lourdes</Pill></div>}
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 720, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK, opacity: pop(t, 156.58)}}>moins d’accidents ≠ moins de drames</div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 2 · LA DÉFINITION LÉGALE ═════════════ */
const Definition: React.FC = () => {
  const t = useT();
  const ph = t < 182.4 ? 0 : t < 190.0 ? 1 : 2;
  const car = prog(t, 178.6, 181.5, easeInOut);
  return (
    <Out end={207.18}>
      {ph === 0 && (
        <>
          <HiLine words={['Travail', 'ou', 'trajet', '?']} mark={[0, 2]} at={171.1} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 0, top: 0, width: 960, height: 430, borderRadius: 28, background: '#fff', border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${BLUE}`, opacity: pop(t, 171.1), overflow: 'hidden'}}>
              <div style={{position: 'absolute', left: 24, top: 20, background: BLUE, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, padding: '6px 18px', borderRadius: 12}}>ACCIDENT DU TRAVAIL</div>
              <div style={{position: 'absolute', left: 40, top: 110}}><F n="usine" size={200} /></div>
              <div style={{position: 'absolute', left: 300, top: 110, right: 30}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK, opacity: pop(t, 173.22)}}>par le fait ou à l’occasion du travail</div><div style={{marginTop: 18, display: 'flex', alignItems: 'center', gap: 12, opacity: pop(t, 175.66)}}><F n="directeur" size={70} /><span style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: BLUE}}>sous l’autorité de l’employeur</span></div></div>
            </div>
            <div style={{position: 'absolute', left: 0, top: 470, width: 960, height: 430, borderRadius: 28, background: '#fff', border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${TEAL}`, opacity: pop(t, 177.38), overflow: 'hidden'}}>
              <div style={{position: 'absolute', left: 24, top: 20, background: TEAL, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, padding: '6px 18px', borderRadius: 12}}>ACCIDENT DE TRAJET</div>
              <div style={{position: 'absolute', left: 40, top: 160}}><F n="maison" size={160} /></div>
              <div style={{position: 'absolute', right: 40, top: 160}}><F n="usine" size={160} /></div>
              <svg width={948} height={418} style={{position: 'absolute', left: 0, top: 0}}><path d="M 210 260 C 400 140, 560 380, 740 260" fill="none" stroke={TEAL} strokeWidth={10} strokeDasharray="20 14" /></svg>
              <div style={{position: 'absolute', left: lerp(200, 660, car), top: 200 + Math.sin(car * Math.PI * 2) * -40}}><F n="voiture" size={90} /></div>
              <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 24, color: TEAL, opacity: pop(t, 178.66)}}>sur l’itinéraire habituel maison ↔ boulot</div>
            </div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Le', 'même', 'résultat']} mark={[1, 2]} at={185.1} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 180, top: 40, width: 600, height: 560, background: '#FFFDF6', border: `6px solid ${INK}`, borderRadius: 16, boxShadow: '0 20px 40px rgba(0,0,0,0.15)', opacity: pop(t, 182.6)}}>
              <div style={{position: 'absolute', left: 30, top: 24, fontFamily: MONO, fontWeight: 700, fontSize: 26, color: INK}}>CONTRAT DE TRAVAIL</div>
              {[0, 1, 2, 3, 4, 5].map((k) => <div key={k} style={{position: 'absolute', left: 30, right: 30, top: 90 + k * 60, height: 14, borderRadius: 7, background: '#E3E8EF'}} />)}
              {t > 185.5 && <Stamp at={185.5} c={RED} text="SUSPENDU" x={120} y={230} rot={-12} size={80} />}
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 650, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: pop(t, 187.82), transform: `scale(${t > 187.82 ? spring(t, 187.82) : 0.6})`}}><F n="bouclier" size={130} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: BLUE}}>protection juridique spécifique</span></div>
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Le', 'chrono', 'tourne']} mark={[1, 2]} at={190.02} y={330} size={72} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 40, display: 'flex', justifyContent: 'center', gap: 60}}><Timer at={195.1} label="24 h" who="informer l’employeur" c={ORANGE} /><Timer at={197.18} label="48 h" who="déclarer à la CPAM" c={RED} /></div>
            {t > 200.62 && <Stamp at={200.62} c={INK} text="délais obligatoires" x={240} y={480} rot={-5} size={52} />}
            {t > 203.78 && <div style={{position: 'absolute', left: 0, right: 0, top: 640, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: pop(t, 203.78)}}><F n="danger" size={80} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: RED}}>droits à l’indemnisation compromis</span></div>}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 3 · LE TAUX D'IPP ═════════════ */
const Ipp: React.FC = () => {
  const t = useT();
  const ph = t < 224.8 ? 0 : t < 240.6 ? 1 : 2;
  const needle = t < 230.5 ? 0.55 : t < 236.5 ? lerp(0.55, 0.25, prog(t, 230.5, 231.8, easeInOut)) : lerp(0.25, 0.6, prog(t, 237.6, 239.0, easeInOut));
  const Gauge = <div style={{position: 'relative', width: 620, height: 340}}>
    <div style={{position: 'absolute', left: 0, top: 0, width: 620, height: 620, borderRadius: '50%', background: `conic-gradient(from -90deg, ${GREEN} 0deg 60deg, ${GOLD} 60deg 120deg, ${RED} 120deg 180deg, transparent 180deg)`, clipPath: 'inset(0 0 50% 0)', border: `8px solid ${INK}`, boxSizing: 'border-box'}} />
    <div style={{position: 'absolute', left: 110, top: 110, width: 400, height: 400, borderRadius: '50%', background: PAPER, clipPath: 'inset(0 0 50% 0)'}} />
    <div style={{position: 'absolute', left: 304, top: 50, width: 12, height: 260, background: INK, borderRadius: 6, transformOrigin: '50% 100%', transform: `rotate(${lerp(-90, 90, needle)}deg)`}} />
    <div style={{position: 'absolute', left: 285, top: 290, width: 50, height: 50, borderRadius: 25, background: INK}} />
    <div style={{position: 'absolute', left: 0, right: 0, top: 210, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: INK}}>IPP %</div>
  </div>;
  return (
    <Out end={247.58}>
      {ph === 0 && (
        <>
          <HiLine words={['Le', 'taux', 'd’IPP']} mark={[1, 2]} at={213.26} y={330} size={72} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 170, top: 30, opacity: pop(t, 210.8)}}>{Gauge}</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 420, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: VIO, opacity: pop(t, 215.94)}}>incapacité permanente partielle</div>
            <div style={{position: 'absolute', left: 60, top: 540, display: 'flex', alignItems: 'center', gap: 16, opacity: pop(t, 222.22)}}><F n="medecin" size={130} /><div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>évaluation par</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK}}>le médecin-conseil</div></div></div>
            {t > 219.94 && <div style={{position: 'absolute', right: 40, top: 560, width: 140, height: 140, borderRadius: 70, background: GOLD, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: INK, transform: `scale(${spring(t, 219.94)})`}}>?</div>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 230.4 ? ['Ce', '%', 'dicte', 'tout'] : ['Contester', 'si', 'sous-évalué']} mark={t < 230.4 ? [1, 2] : [0, 2]} at={t < 230.4 ? 226.34 : 230.54} y={330} size={64} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 170, top: 10}}>{Gauge}</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 380, display: 'flex', justifyContent: 'center', gap: 30}}>
              {[{l: 'à l’amiable', ic: 'poignee', a: 233.06, c: GREEN}, {l: 'devant un tribunal', ic: 'juge', a: 234.1, c: VIO}].map((x) => <div key={x.l} style={{width: 380, height: 220, borderRadius: 24, background: '#fff', border: `5px solid ${x.c}`, boxShadow: `6px 6px 0 ${x.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: pop(t, x.a)}}><F n={x.ic} size={90} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>{x.l}</span></div>)}
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 650, display: 'flex', justifyContent: 'center', gap: 12}}><Pill at={228.58} c={GOLD} size={28}>compensation financière</Pill>{t > 238.5 && <Pill at={238.5} c={GREEN} size={28}>reflète les vraies souffrances</Pill>}</div>
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Déficit', 'fonctionnel', 'permanent']} mark={[0, 2]} at={243.78} y={330} size={56} />
          <Abs x={60} y={440} w={960} h={930} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${VIO}`, opacity: pop(t, 240.8)}}>
            <div style={{position: 'absolute', left: 60, top: 80}}><F n="parchemin" size={260} /></div>
            <div style={{position: 'absolute', left: 360, top: 100, right: 40}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: VIO}}>RÉCENTES RÉFORMES</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK, lineHeight: 1.1, marginTop: 10}}>mieux intégrer le déficit fonctionnel permanent</div></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 520, display: 'flex', justifyContent: 'center'}}><div style={{position: 'relative'}}><Pill at={245.54} c={DIM} size={34}>minimiser les séquelles</Pill><div style={{position: 'absolute', left: 10, right: 10, top: '50%'}}><Strike p={prog(t, 246.3, 246.8)} c={RED} /></div></div></div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 4 · LA FAUTE INEXCUSABLE ═════════════ */
const Fie: React.FC = () => {
  const t = useT();
  const ph = t < 281.2 ? 0 : 1;
  const both = t > 298.06;
  const blade = prog(t, 298.06, 298.5, easeIn);
  return (
    <Out end={306.7}>
      {ph === 0 && (
        <>
          <HiLine words={t < 263.7 ? ['Le', 'paysage', 'a', 'bougé'] : t < 269.5 ? ['Obligation', 'de', 'moyens', 'renforcée'] : ['Exonéré', 'si…', 'preuve']} mark={t < 263.7 ? [1, 3] : t < 269.5 ? [0, 2, 3] : [0, 2]} at={t < 263.7 ? 255.54 : t < 269.5 ? 266.9 : 273.06} y={330} size={t < 269.5 && t >= 263.7 ? 52 : 66} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 40, right: 40, top: 120, height: 10, borderRadius: 5, background: INK}} />
            {[{x: 60, l: 'AVANT', s: 'obligation de sécurité de résultat', a: 259.82, c: DIM}, {x: 380, l: '2015', s: 'arrêt majeur', a: 263.78, c: ORANGE}, {x: 680, l: 'AUJOURD’HUI', s: 'obligation de moyens renforcée', a: 266.9, c: GREEN}].map((m) => <div key={m.l} style={{position: 'absolute', left: m.x, top: 70, width: 240, opacity: pop(t, m.a)}}><div style={{margin: '0 auto', width: 140, height: 140, borderRadius: 70, background: m.c, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: m.l.length > 6 ? 18 : 34, color: '#fff', transform: `scale(${t > m.a ? spring(t, m.a) : 0})`}}>{m.l}</div><div style={{marginTop: 14, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK}}>{m.s}</div></div>)}
            <div style={{position: 'absolute', left: 0, right: 0, top: 400, height: 500, borderRadius: 28, background: '#fff', border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${ORANGE}`, opacity: pop(t, 270.1), display: 'flex', alignItems: 'center', gap: 24, padding: 30, boxSizing: 'border-box'}}>
              <F n="livres" size={200} />
              <div style={{flex: 1}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: ORANGE}}>EXONÉRATION POSSIBLE SI</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK, lineHeight: 1.15, marginTop: 8}}>preuve par A + B de <span style={{color: GREEN}}>toutes les mesures de prévention</span> du Code du travail</div>
                <div style={{marginTop: 16, display: 'flex', gap: 10}}>{[0, 1, 2, 3, 4].map((k) => <div key={k} style={{width: 46, height: 46, borderRadius: 10, border: `4px solid ${INK}`, background: t > 276.3 + k * 0.4 ? GREEN : '#fff', color: '#fff', fontWeight: 900, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{t > 276.3 + k * 0.4 ? '✓' : ''}</div>)}</div></div>
            </div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 285.0 ? ['Comme', 'un', 'couperet'] : ['2', 'conditions']} mark={t < 285.0 ? [2] : [0, 1]} at={t < 285.0 ? 283.9 : 285.14} y={330} size={72} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 380, top: 0, width: 200, height: 420, borderLeft: `14px solid #7A5230`, borderRight: `14px solid #7A5230`, borderTop: `20px solid #7A5230`, boxSizing: 'border-box', opacity: pop(t, 282.0)}}>
              <div style={{position: 'absolute', left: 0, right: 0, top: lerp(10, 300, blade), height: 90, background: 'linear-gradient(160deg, #EEF2F7, #9FB3CC)', clipPath: 'polygon(0 0, 100% 0, 100% 40%, 0 100%)', border: `0px solid ${INK}`}} />
            </div>
            {[{n: 1, l: 'conscience du danger', s: 'il avait, ou aurait dû avoir…', ex: ['machine sans protection', 'signalements répétés'], exa: [290.66, 292.46], a: 286.54, x: 0}, {n: 2, l: 'pas de mesures prises', s: 'pour y remédier', ex: [], exa: [], a: 295.3, x: 600}].map((c) => <div key={c.n} style={{position: 'absolute', left: c.x, top: 60, width: 360, height: 520, borderRadius: 26, background: '#fff', border: `5px solid ${t > c.a ? ORANGE : '#C9D2DF'}`, boxShadow: t > c.a ? `6px 6px 0 ${ORANGE}` : 'none', padding: 20, boxSizing: 'border-box', opacity: pop(t, c.a - 0.6)}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 12}}><div style={{width: 70, height: 70, borderRadius: 35, background: t > c.a ? ORANGE : '#C9D2DF', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 44, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{c.n}</div><div style={{width: 60, height: 60, borderRadius: 12, border: `5px solid ${INK}`, background: t > c.a + 0.8 ? ORANGE : '#fff', color: '#fff', fontSize: 44, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{t > c.a + 0.8 ? '✓' : ''}</div></div>
              <div style={{marginTop: 18, fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>{c.l}</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: DIM, marginTop: 6}}>{c.s}</div>
              {c.ex.map((e, k) => <div key={e} style={{marginTop: 14, display: 'flex', alignItems: 'center', gap: 8, opacity: pop(t, c.exa[k])}}><F n={k ? 'megaphone' : 'engrenage'} size={50} /><span style={{fontFamily: sansFont, fontWeight: 800, fontSize: 22, color: INK}}>{e}</span></div>)}
            </div>)}
            {both && <div style={{position: 'absolute', left: 0, right: 0, top: 640, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, transform: `scale(${spring(t, 298.5)})`}}><div style={{background: RED, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 36, padding: '12px 26px', borderRadius: 18, border: `5px solid ${INK}`}}>FAUTE INEXCUSABLE RECONNUE</div><div style={{display: 'flex', gap: 12}}><Pill at={302.22} c={ORANGE} size={26}>majoration maximale de la rente</Pill><Pill at={305.1} c={VIO} size={26}>préjudices complémentaires</Pill></div></div>}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 5 · TARIFICATION & COÛTS ═════════════ */
const Couts: React.FC = () => {
  const t = useT();
  const ph = t < 332.4 ? 0 : t < 355.8 ? 1 : 2;
  const size = prog(t, 321.0, 324.5, easeInOut);
  const net = 1 - prog(t, 326.8, 328.2, easeIn);
  const euros = prog(t, 344.4, 347.4, easeOut) * 562950;
  const berg = prog(t, 353.7, 355.4, easeOut);
  return (
    <Out end={373.22}>
      {ph === 0 && (
        <>
          <HiLine words={['Cotisations', 'AT/MP', '2026']} mark={[0, 2]} at={315.94} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={930} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 310.3)}}>
            <div style={{position: 'absolute', left: 40, top: 30, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>taille de l’entreprise</div>
            <div style={{position: 'absolute', left: 40, right: 40, top: 80, height: 16, borderRadius: 8, background: '#E3E8EF'}}><div style={{width: `${10 + size * 90}%`, height: '100%', borderRadius: 8, background: GOLD}} /></div>
            <div style={{position: 'absolute', left: lerp(60, 680, size), top: 120, transform: `scale(${lerp(0.6, 1.4, size)})`, transformOrigin: '50% 0'}}><F n="usine2" size={160} /></div>
            <div style={{position: 'absolute', left: 40, top: 420, display: 'flex', gap: 14}}><Pill at={318.9} c={size > 0.5 ? DIM : BLUE} size={28}>tarification collective</Pill>{t > 323.22 && <Pill at={323.22} c={GOLD} size={28}>tarification individuelle</Pill>}</div>
            <div style={{position: 'absolute', left: 120, right: 120, top: 560, height: 200, opacity: net, backgroundImage: `linear-gradient(45deg, ${BLUE} 2px, transparent 2px), linear-gradient(-45deg, ${BLUE} 2px, transparent 2px)`, backgroundSize: '40px 40px', borderTop: `8px solid ${BLUE}`, transform: `translateY(${(1 - net) * 300}px)`}} />
            <div style={{position: 'absolute', left: 0, right: 0, top: 640, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: BLUE, opacity: net * pop(t, 326.82)}}>filet de sécurité collectif</div>
            {t > 330.06 && <Stamp at={330.06} c={RED} text="le coût réel" x={300} y={780} rot={-5} size={56} />}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 349.7 ? ['Un', 'exemple', 'concret'] : ['Plus', 'd’un', 'demi-million']} mark={t < 349.7 ? [2] : [2]} at={t < 349.7 ? 335.46 : 349.78} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap'}}><Pill at={338.82} c={RED} size={28}>1 accident · IPP &gt; 40 %</Pill><Pill at={342.34} c={INK} size={28}>ou un décès</Pill></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 110, display: 'flex', justifyContent: 'center', opacity: pop(t, 344.3)}}><PhotoLetterAnim ch={`${fmt(euros)} €`} src={IMG.chantier} size={130} ls={0} /></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 260, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM, opacity: pop(t, 348.5)}}>coût moyen · gros œuvre · Alsace-Moselle</div>
            <div style={{position: 'absolute', left: 80, right: 80, top: 360, height: 560, borderRadius: 24, overflow: 'hidden', background: 'linear-gradient(180deg, #CFEAFF 0 34%, #1E5A8C 34% 100%)', border: `6px solid ${INK}`, opacity: pop(t, 349.8)}}>
              <div style={{position: 'absolute', left: 250, top: 70, width: 300, height: 130, background: '#fff', clipPath: 'polygon(50% 0, 100% 100%, 0 100%)'}} />
              <div style={{position: 'absolute', left: 120, top: 190, width: 560, height: 340 * berg, background: '#DDEFFF', opacity: 0.85, clipPath: 'polygon(30% 0, 70% 0, 100% 40%, 80% 100%, 20% 100%, 0 40%)'}} />
              <div style={{position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK}}>coût direct</div>
              {berg > 0.3 && <div style={{position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: NAVY}}>perte de production indirecte<br /><span style={{fontFamily: MONO, fontSize: 20}}>(non comptée)</span></div>}
            </div>
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Une', 'gestion', 'stratégique']} mark={[1, 2]} at={357.86} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 380, top: 0, width: 200, height: 200, borderRadius: 100, background: NAVY, border: `6px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 356.0)}}><F n="directeur" size={90} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: '#fff'}}>direction</span></div>
            <svg width={960} height={400} style={{position: 'absolute', left: 0, top: 180}}><path d="M 480 20 C 480 120, 240 120, 240 220" fill="none" stroke={GREEN} strokeWidth={10} strokeDasharray={400} strokeDashoffset={400 * (1 - prog(t, 361.38, 362.4))} /><path d="M 480 20 C 480 120, 720 120, 720 220" fill="none" stroke={RED} strokeWidth={10} strokeDasharray={400} strokeDashoffset={400 * (1 - prog(t, 367.78, 368.8))} /></svg>
            <div style={{position: 'absolute', left: 0, top: 410, width: 470, height: 480, borderRadius: 26, background: '#EAFBF1', border: `5px solid ${GREEN}`, padding: 22, boxSizing: 'border-box', opacity: pop(t, 361.38)}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: GREEN}}>proactif</div>{[{l: 'taux réduit (fonctions administratives)', a: 363.98}, {l: 'ristournes pour bonne conduite', a: 366.06}].map((x) => <div key={x.l} style={{marginTop: 18, display: 'flex', alignItems: 'center', gap: 10, opacity: pop(t, x.a)}}><F n="baisse" size={56} /><span style={{fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: INK}}>{x.l}</span></div>)}</div>
            <div style={{position: 'absolute', left: 490, top: 410, width: 470, height: 480, borderRadius: 26, background: '#FFF1F0', border: `5px solid ${RED}`, padding: 22, boxSizing: 'border-box', opacity: pop(t, 367.78)}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: RED}}>laisser couler</div>{[{l: 'injonctions de la CARSAT', a: 368.46}, {l: 'pénalités financières', a: 370.38}].map((x) => <div key={x.l} style={{marginTop: 18, display: 'flex', alignItems: 'center', gap: 10, opacity: pop(t, x.a)}}><F n="hausse" size={56} /><span style={{fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: INK}}>{x.l}</span></div>)}</div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 6 · LA PRÉVENTION ═════════════ */
const Prevention: React.FC = () => {
  const t = useT();
  const ph = t < 393.8 ? 0 : t < 402.8 ? 1 : 2;
  const conv = prog(t, 390.7, 392.2, easeInOut);
  const cut = prog(t, 396.6, 397.6, easeInOut);
  return (
    <Out end={OUTRO_AT}>
      {ph === 0 && (
        <>
          <HiLine words={t < 391.8 ? ['La', 'seule', 'vraie', 'solution'] : ['Pas', 'd’alternative']} mark={t < 391.8 ? [1, 3] : [1]} at={t < 391.8 ? 376.5 : 391.86} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 376.8)}}>
            {[{l: 'dureté des statistiques', ic: 'graphique', a: 384.9, x: 80, y: 80, c: RED}, {l: 'labyrinthe juridique', ic: 'juge', a: 386.74, x: 600, y: 80, c: BLUE}, {l: 'gouffre financier', ic: 'argent', a: 389.42, x: 340, y: 620, c: GOLD}].map((x) => <div key={x.l} style={{position: 'absolute', left: lerp(x.x, 340, conv), top: lerp(x.y, 330, conv), width: 270, height: 200, borderRadius: 24, background: '#fff', border: `5px solid ${x.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: pop(t, x.a) * (1 - conv), transform: `scale(${1 - conv * 0.5})`}}><F n={x.ic} size={80} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK, textAlign: 'center'}}>{x.l}</span></div>)}
            {t > 391.86 && <div style={{position: 'absolute', left: 274, top: 260, width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${GREEN}88, transparent 70%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, 391.86)})`}}><F n="bouclier" size={200} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff'}}>PRÉVENTION</span></div>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Une', 'nécessité', 'absolue']} mark={[1, 2]} at={398.34} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 394.0)}}>
            <div style={{position: 'absolute', left: 40, top: 40, fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM}}>BUDGET</div>
            {['production', 'maintenance', 'prévention des risques', 'communication'].map((l, k) => <div key={l} style={{position: 'absolute', left: 40, right: 40, top: 100 + k * 110, height: 90, borderRadius: 14, background: k === 2 ? '#EAFBF1' : '#F4F6FA', border: `4px solid ${k === 2 ? GREEN : '#C9D2DF'}`, display: 'flex', alignItems: 'center', padding: '0 20px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: k === 2 ? GREEN : DIM}}>{l}</div>)}
            <div style={{position: 'absolute', left: lerp(980, 640, cut), top: 300, transform: `rotate(${Math.sin(t * 20) * 10}deg)`}}><F n="ciseaux" size={120} /></div>
            {t > 397.6 && <div style={{position: 'absolute', left: 600, top: 290, fontSize: 160, color: RED, fontWeight: 900, transform: `scale(${spring(t, 397.6)})`}}>✕</div>}
            <div style={{position: 'absolute', left: 0, right: 0, top: 620, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={401.26} c={RED} size={30}>la vie humaine</Pill><Pill at={402.0} c={NAVY} size={30}>l’entreprise</Pill></div>
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 420.4 ? ['Réaction', 'ou', 'pilier', '?'] : ['Choisir', 'l’avenir']} mark={t < 420.4 ? [0, 2] : [0, 1]} at={t < 420.4 ? 412.02 : 421.9} y={330} size={68} />
          <Shot src={IMG.final} ic="equipe" x={60} y={440} w={960} h={380} at={420.6} c={GREEN} blinds />
          {t < 420.6 && <Abs x={60} y={440} w={960} h={380} style={{background: '#2C3650', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 403.0)}}><div style={{position: 'absolute', left: 380, top: 40}}><F n="eclair" size={140} /></div>{Math.floor(t * 3) % 5 === 0 && t > 409.2 && <AbsoluteFill style={{background: '#fff', opacity: 0.5}} />}<div style={{position: 'absolute', left: 0, right: 0, bottom: 30, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 24, color: '#fff', opacity: pop(t, 409.22)}}>la foudre légale et financière</div></Abs>}
          <Abs x={60} y={850} w={960} h={520}>
            {[{l: 'mesure de réaction', s: 'trop tard, après le drame', ic: 'ambulance', a: 412.02, c: RED, x: 0}, {l: 'véritable pilier', s: 'réfléchi en amont', ic: 'temple', a: 418.1, c: GREEN, x: 490}].map((x) => <div key={x.l} style={{position: 'absolute', left: x.x, top: 0, width: 470, height: 500, borderRadius: 26, background: '#fff', border: `5px solid ${x.c}`, boxShadow: `7px 7px 0 ${x.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, opacity: pop(t, x.a) * (t > 420.4 && x.c === RED ? 0.4 : 1)}}><F n={x.ic} size={140} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK}}>{x.l}</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: x.c}}>{x.s}</div></div>)}
          </Abs>
          {t > 426.0 && <Dust n={24} c={GOLD} />}
        </>
      )}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const pops = (L: number[], v = 0.2): Sfx[] => L.map((a) => ({at: a, s: 'sfx/pop', v}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 1.5},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 0.8, s: 'validation', v: 0.18})), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.flatMap((r) => [{at: r.at - 1.2, s: 'soft-whoosh', v: 0.2, dur: 1.2}, {at: r.at, s: 'bass-hit', v: 0.33}, {at: r.at + 0.05, s: 'sfx/bell', v: 0.26}]),
  ...[7.46, 8.42].map((a) => ({at: a, s: 'sfx/swish', v: 0.28})), {at: 12.8, s: 'sfx/swish', v: 0.3}, {at: 13.34, s: 'tampon', v: 0.55},
  {at: 15.86, s: 'deep-hit', v: 0.45}, ...rep(16.0, 6, 0.55, 'sfx/thud', 0.12), ...[17.78, 21.06, 23.66].map((a) => ({at: a, s: 'sfx/pop', v: 0.25})), {at: 27.1, s: 'soft-whoosh', v: 0.3, dur: 1.5},
  {at: 41.74, s: 'sfx/thud', v: 0.45}, {at: 41.8, s: 'sfx/swish', v: 0.3}, ...pops([43.06, 44.26]), ...rep(47.2, 8, 0.25, 'sfx/thud', 0.2), {at: 49.94, s: 'bass-hit', v: 0.4}, {at: 50.3, s: 'validation', v: 0.3},
  ...searchCues(52.4, 18, 53.85, 54.15), ...pops([55.14, 56.94, 60.5, 63.5, 64.98, 67.66], 0.18),
  ...rep(85.0, 29, 0.1, 'tick', 0.12), {at: 87.9, s: 'deep-hit', v: 0.45}, {at: 90.5, s: 'sfx/ding', v: 0.25}, {at: 96.0, s: 'soft-whoosh', v: 0.25, dur: 3.6}, {at: 99.6, s: 'tension', v: 0.1, dur: 2.5},
  {at: 103.0, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 112.1, s: 'sfx/rise', v: 0.25, dur: 1.2}, ...pops([107.98, 114.82, 115.6, 121.86]),
  {at: 130.34, s: 'sfx/whoosh', v: 0.25}, {at: 135.66, s: 'sfx/thud', v: 0.3}, {at: 136.98, s: 'sfx/whoosh', v: 0.25}, {at: 141.7, s: 'sfx/thud', v: 0.3},
  {at: 144.18, s: 'tampon', v: 0.55}, {at: 152.4, s: 'sfx/swish', v: 0.25}, {at: 158.6, s: 'sfx/rise', v: 0.25, dur: 2.2}, {at: 160.66, s: 'deep-hit', v: 0.35},
  {at: 171.1, s: 'sfx/pop', v: 0.25}, {at: 177.38, s: 'sfx/pop', v: 0.25}, {at: 178.6, s: 'soft-whoosh', v: 0.25, dur: 2.9}, {at: 182.6, s: 'page', v: 0.35}, {at: 185.5, s: 'tampon', v: 0.6}, {at: 187.82, s: 'validation', v: 0.25},
  ...rep(190.0, 30, 0.5, 'tick', 0.12), {at: 195.1, s: 'bass-hit', v: 0.3}, {at: 197.18, s: 'bass-hit', v: 0.3}, {at: 200.62, s: 'tampon', v: 0.55}, {at: 203.78, s: 'alarme', v: 0.05, dur: 1},
  {at: 215.94, s: 'sfx/pop', v: 0.2}, {at: 219.94, s: 'sfx/ding', v: 0.25}, {at: 222.22, s: 'sfx/pop', v: 0.2}, {at: 230.5, s: 'sfx/swish', v: 0.3}, ...pops([233.06, 234.1]), {at: 237.6, s: 'sfx/rise', v: 0.25, dur: 1.4}, {at: 239.0, s: 'validation', v: 0.3},
  {at: 240.8, s: 'page', v: 0.3}, {at: 246.3, s: 'sfx/swish', v: 0.3},
  ...[259.82, 263.78, 266.9].map((a) => ({at: a, s: 'bass-hit', v: 0.28})), {at: 270.1, s: 'soft-whoosh', v: 0.3, dur: 1}, ...rep(276.3, 5, 0.4, 'sfx/click', 0.3),
  {at: 283.9, s: 'tension', v: 0.12, dur: 3}, {at: 286.54, s: 'sfx/thud', v: 0.3}, {at: 287.34, s: 'sfx/ding', v: 0.22}, ...pops([290.66, 292.46]), {at: 295.3, s: 'sfx/thud', v: 0.3}, {at: 296.1, s: 'sfx/ding', v: 0.22}, {at: 298.06, s: 'sfx/swish', v: 0.5}, {at: 298.5, s: 'deep-hit', v: 0.6}, ...pops([302.22, 305.1]),
  {at: 321.0, s: 'sfx/rise', v: 0.22, dur: 3.5}, {at: 323.22, s: 'sfx/ding', v: 0.22}, {at: 326.8, s: 'sfx/swish', v: 0.3}, {at: 330.06, s: 'tampon', v: 0.55},
  ...pops([338.82, 342.34]), ...rep(344.4, 30, 0.1, 'tick', 0.12), {at: 347.4, s: 'deep-hit', v: 0.5}, {at: 349.8, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 353.7, s: 'sfx/rise', v: 0.25, dur: 1.7},
  {at: 361.38, s: 'soft-whoosh', v: 0.25, dur: 1}, ...pops([363.98, 366.06]), {at: 367.78, s: 'soft-whoosh', v: 0.25, dur: 1}, {at: 368.46, s: 'alarme', v: 0.05, dur: 0.8}, {at: 370.38, s: 'deep-hit', v: 0.35},
  ...[384.9, 386.74, 389.42].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), {at: 390.7, s: 'soft-whoosh', v: 0.45, dur: 1.5}, {at: 391.86, s: 'bass-hit', v: 0.45},
  {at: 396.6, s: 'sfx/swish', v: 0.35}, {at: 397.6, s: 'deep-hit', v: 0.4}, ...pops([401.26, 402.0]),
  {at: 403.0, s: 'soft-whoosh', v: 0.3, dur: 1}, ...rep(409.2, 4, 1.0, 'deep-hit', 0.2), ...pops([412.02, 418.1]), {at: 420.6, s: 'soft-whoosh', v: 0.35, dur: 1}, ...rep(420.7, 10, 0.05, 'sfx/click', 0.12), {at: 421.9, s: 'validation', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<TK, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
export const AtmpEcosysteme: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={70.55}><Intro /></Gate>
    <Gate from={73.7} to={161.75}><Chiffres /></Gate>
    <Gate from={164.9} to={207.25}><Definition /></Gate>
    <Gate from={210.6} to={247.65}><Ipp /></Gate>
    <Gate from={251.2} to={306.75}><Fie /></Gate>
    <Gate from={309.9} to={373.3}><Couts /></Gate>
    <Gate from={376.4} to={OUTRO_AT}><Prevention /></Gate>
    {SECT.map((x, i) => { const C = TRANS[x.k]; return <Gate key={x.n} from={x.at} to={x.at + 3.7}><C i={i} /></Gate>; })}
    <Gate from={80} to={402}><StationBanner /></Gate>
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={431.3}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-atmp-ecosysteme-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Tile, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, spring, LoupeSweep, PneuDeliver, Shine, Count, BURG, YEL, handFont, Board, random, Strike, TEAL, PhotoLetter, Watermark, ORANGE];
