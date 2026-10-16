import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Captions} from '../components/Captions';
import {Blinds, Board, Cite, Deep, Dust, Kin, Out, Pill, Stamp, Tile} from '../durab/Durab';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {handFont, s, sansFont} from '../theme';
import {Abs, Bg, DIM, easeIn, easeInOut, easeOut, GREEN, INK, lerp, LOGO, PAPER, PH, pop, prog, RED, spring, T, useT} from '../implIso/kit';
import {Brut, HiLine, Mono, Strike} from '../tdbPilot/TdbPilot';
import {captions} from './captions';

/**
 * « Aspects ISO 14001 : la cotation » (6 min 13) — capsule « condensé » de la série : voix d'origine, sous-titres
 * recalés mot à mot, photos réelles, thème « papier quadrillé ».
 * Fil rouge : LE TUBE PNEUMATIQUE À SIX GUICHETS. L'en-tête est un tube de verre qui relie six guichets (écart →
 * aspect → cotation → seuils → application → bilan) ; la capsule du dossier file d'un guichet à l'autre à chaque
 * partie et chaque guichet passé se coche.
 * Transitions : LE GYROPHARE (le problème, partie 4), LE PNEUMATIQUE (partie 1 et « dossier clos »), LA LOUPE
 * (partie 2), LE STORE VÉNITIEN (partie 3).
 * Condensé des techniques de la série : texte cinétique, mot surligné jaune et mot manuscrit, tuiles de bois, palettes
 * d'affichage, fenêtres d'interface, store vénitien sur photo, photos en profondeur, compteurs, cartes à ombre dure,
 * étiquettes monospace, tampons, mots barrés, feux de départ, onde de choc du battement, écran qui tremble,
 * cases qui se cochent, poussière.
 * Nouvelles techniques : puzzle qui s'assemble, balance subjectif / mécanique, nappe qui se vide, quatre murs qui
 * s'ouvrent sur le cycle de vie, formule en tuiles, jauge multipliée puis divisée, grille 1 → 4 qui se remplit, règle
 * 0,25 → 16, histogramme qui sort du bruit, curseur de seuil d'équilibriste, calcul qui se fissure, tableau de cotation
 * rempli en direct avec jauge de seuil, la loi qui écrase la note.
 */
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
const OUTRO_AT = 369.4;
export const ISO14001_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 30.87, n: '!', title: 'Le problème', s: 'l’écart d’audit', c: RED, g: 'écart', k: 'gyro', lab: 'ALERTE'},
  {at: 76.56, n: '1', title: 'Aspect ou impact', s: 'la distinction de base', c: BLUE, g: 'aspect', k: 'tube', lab: 'DOSSIER N°1'},
  {at: 115.46, n: '2', title: 'La formule de cotation', s: 'faire parler les maths', c: VIO, g: 'cotation', k: 'loupe', lab: 'PARTIE 2 / 4'},
  {at: 199.09, n: '3', title: 'Seuils et garde-fous', s: 'séparer l’essentiel', c: ORANGE, g: 'seuils', k: 'store', lab: 'PARTIE 3 / 4'},
  {at: 271.6, n: '4', title: 'Application pratique', s: 'un tableau rempli', c: TEAL, g: 'application', k: 'gyro', lab: 'PARTIE 4 / 4'},
  {at: 332.27, n: '✓', title: 'Le bilan', s: 'dossier clos', c: GREEN, g: 'bilan', k: 'tube', lab: 'DOSSIER CLOS'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 362.3;

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

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('smi/raffinerie.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 860, objectFit: 'cover', objectPosition: '50% 30%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 30%, ${PAPER}DD 39%, ${PAPER} 44%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={680} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>MANAGEMENT ENVIRONNEMENTAL</div>
        <div style={{marginTop: 22}}><Board text="ASPECTS" at={-1} h={100} c={GREEN} stag={0.03} /></div>
        <div style={{display: 'flex', justifyContent: 'center', gap: 6, marginTop: 22}}>{'ISO14001'.split('').map((c, i) => <React.Fragment key={i}>{i === 3 && <div style={{width: 22}} />}<Tile ch={c} size={88} c={NAVY} /></React.Fragment>)}</div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 96, color: INK, marginTop: 6}}>la <span style={{backgroundImage: `linear-gradient(${YEL}, ${YEL})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 40%', backgroundPosition: '0 85%'}}>cotation</span></div>
        <div style={{display: 'inline-block', marginTop: 6, fontFamily: MONO, fontWeight: 700, fontSize: 40, color: '#fff', background: VIO, padding: '8px 22px', borderRadius: 10, border: `4px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`}}>C = F × G / M</div>
      </Abs>
      <Abs x={60} y={1340} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={RED} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 70, width: 140, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO ═════════════ */
const PIECES = [{ic: 'goutte', c: BLUE}, {ic: 'vapeur', c: DIM}, {ic: 'dechets', c: ORANGE}, {ic: 'usine', c: NAVY}, {ic: 'camion', c: TEAL}, {ic: 'feuille', c: GREEN}];
const Intro: React.FC = () => {
  const t = useT();
  const snap = prog(t, 22.4, 23.6, easeInOut);
  return (
    <Out end={30.3}>
      {t < 14.0 && (
        <>
          <HiLine words={['Un', 'vrai', 'décryptage']} mark={[2]} at={3.9} y={330} size={70} />
          <Abs x={0} y={470} w={1080}><Board text="ISO 14001" at={5.0} h={110} c={GREEN} stag={0.04} /></Abs>
          <Deep src="smi/raffinerie.jpg" x={110} y={640} w={860} h={480} at={7.5} pos="50% 35%">
            <div style={{position: 'absolute', left: 18, top: 18}}><Mono at={7.8} c={INK} size={20}>une méthodologie</Mono></div>
            <div style={{position: 'absolute', left: 18, bottom: 18}}><Mono at={11.5} c={GREEN} size={20}>expertise universnormes</Mono></div>
          </Deep>
        </>
      )}
      {t >= 14.0 && t < 24.4 && (
        <>
          <HiLine words={['Un', 'énorme', 'casse-tête']} mark={[2]} at={17.0} y={330} size={64} hand="→ limpide" handAt={22.5} />
          <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14, opacity: pop(t, 14.4)}}>{['qualité', 'sécurité', 'environnement'].map((w, k) => <Pill key={w} at={14.5 + k * 0.6} c={[BLUE, RED, GREEN][k]} size={28}>{w}</Pill>)}</Abs>
          {PIECES.map((p, k) => {
            const gx = 250 + (k % 3) * 200, gy = 700 + Math.floor(k / 3) * 200;
            const rx = 90 + random(`px${k}`) * 800, ry = 680 + random(`py${k}`) * 420;
            const rot = (random(`pr${k}`) - 0.5) * 120;
            const ap = pop(t, 18.0 + k * 0.18);
            return (
              <div key={k} style={{position: 'absolute', left: lerp(rx, gx, snap), top: lerp(ry, gy, snap), width: 190, height: 190, borderRadius: 22, background: '#fff', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${p.c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${rot * (1 - snap)}deg) scale(${ap})`}}>
                <F n={p.ic} size={110} />
                <div style={{position: 'absolute', right: -22, top: 70, width: 40, height: 40, borderRadius: 20, background: '#fff', border: `5px solid ${INK}`, opacity: k % 3 === 2 ? 0 : 1, clipPath: 'inset(0 0 0 50%)'}} />
              </div>
            );
          })}
          {snap > 0.95 && <Stamp at={23.4} c={GREEN} text="limpide" x={360} y={1120} rot={-5} size={58} />}
        </>
      )}
      {t >= 24.4 && (
        <>
          <HiLine words={['Une', 'méthode', 'bien', 'construite']} mark={[1]} at={24.5} y={330} size={60} />
          <Abs x={90} y={470} w={900} style={{display: 'flex', flexDirection: 'column', gap: 22}}>
            {[{l: 'structurée', ic: 'engrenage', a: 25.3, c: BLUE}, {l: 'chiffrée', ic: 'graphique', a: 26.4, c: VIO}, {l: 'auditable', ic: 'loupe', a: 27.4, c: GREEN}].map((x, k) => (
              <Brut key={k} x={0} y={0} w={900} h={150} at={x.a} sh={x.c} style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 24}}><F n={x.ic} size={96} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: INK}}>{x.l}</div><div style={{marginLeft: 'auto', width: 56, height: 56, borderRadius: 12, background: GREEN, color: '#fff', fontSize: 38, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop(t, x.a + 0.5)})`}}>✓</div></Brut>
            ))}
          </Abs>
          <Abs x={0} y={1060} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 60, color: GREEN, opacity: pop(t, 28.4)}}>transformer la conformité</Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ LE PROBLÈME ═════════════ */
const Piege: React.FC = () => {
  const t = useT();
  const slip = prog(t, 36.6, 37.8, easeIn);
  const L = ['consommation d’eau', 'énergie', 'déchets', 'rejets atmosphériques', 'bruit'];
  return (
    <Out end={45.9}>
      <HiLine words={['La', 'peau', 'de', 'banane']} mark={[1, 2, 3]} at={35.0} y={320} size={62} />
      <Abs x={70} y={440} w={380} h={460} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${YEL}`, overflow: 'hidden', opacity: pop(t, 35.3)}}>
        <div style={{position: 'absolute', left: 120, top: 300}}><F n="banane" size={130} /></div>
        <div style={{position: 'absolute', left: lerp(40, 230, slip), top: lerp(60, 250, slip), transform: `rotate(${slip * 70}deg)`}}><F n="clipboard" size={130} /></div>
        <div style={{position: 'absolute', left: 16, top: 14}}><Mono at={37.6} c={RED} size={18}>on glisse en audit</Mono></div>
      </Abs>
      <Win x={480} y={440} w={540} h={460} at={38.8} title="aspects_env.xlsx" c={RED}>
        <div style={{display: 'flex', fontFamily: MONO, fontWeight: 700, fontSize: 18, color: DIM, padding: '12px 18px', borderBottom: '2px solid #E3E8EF'}}><div style={{flex: 1}}>ASPECT</div><div style={{width: 130, textAlign: 'center'}}>COTATION</div></div>
        {L.map((l, k) => (
          <div key={k} style={{display: 'flex', alignItems: 'center', padding: '12px 18px', borderBottom: '2px solid #F0F2F6', opacity: pop(t, 39.9 + k * 0.2)}}>
            <div style={{flex: 1, fontFamily: sansFont, fontWeight: 800, fontSize: 25, color: INK}}>{l}</div>
            <div style={{width: 130, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: RED, opacity: pop(t, 42.3 + k * 0.12)}}>?</div>
          </div>
        ))}
      </Win>
      <Abs x={0} y={950} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={39.9} c={INK} size={30}>une simple liste</Pill><Pill at={42.3} c={RED} size={30}>aucun critère</Pill></Abs>
      <Stamp at={43.9} c={RED} text="écart d’audit" x={290} y={1080} rot={-6} size={64} />
    </Out>
  );
};
const Balance: React.FC = () => {
  const t = useT();
  const tilt = lerp(0, -14, prog(t, 48.4, 49.2, easeOut)) + lerp(0, 28, prog(t, 51.0, 51.8, easeInOut)) + lerp(0, -14, prog(t, 56.8, 57.9, easeInOut));
  const ok = prog(t, 57.5, 58.0);
  return (
    <Out end={61.9}>
      <HiLine words={['Trouver', 'le', 'juste', 'milieu']} mark={[2, 3]} at={47.0} y={320} size={64} />
      <Abs x={90} y={450} w={900} h={620} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `9px 9px 0 ${ok > 0.5 ? GREEN : RED}`, opacity: pop(t, 46.4)}}>
        <svg width={900} height={620} style={{position: 'absolute', inset: 0}}>
          <polygon points="450,170 400,520 500,520" fill={INK} />
          <rect x={340} y={520} width={220} height={24} rx={8} fill={INK} />
          <g transform={`rotate(${tilt} 450 170)`}>
            <rect x={110} y={160} width={680} height={20} rx={10} fill={ok > 0.5 ? GREEN : INK} />
            <line x1={170} y1={180} x2={170} y2={300} stroke={INK} strokeWidth={4} /><line x1={730} y1={180} x2={730} y2={300} stroke={INK} strokeWidth={4} />
            <path d="M70 300 Q170 360 270 300 Z" fill="#EEF1F5" stroke={INK} strokeWidth={5} /><path d="M630 300 Q730 360 830 300 Z" fill="#EEF1F5" stroke={INK} strokeWidth={5} />
          </g>
          <circle cx={450} cy={170} r={18} fill={YEL} stroke={INK} strokeWidth={5} />
        </svg>
        {(() => {
          const r = (tilt * Math.PI) / 180;
          const py = (x: number) => 170 + Math.sin(r) * (x - 450) + 120;
          return (
            <>
              <div style={{position: 'absolute', left: 105, top: py(170) - 130, width: 130, textAlign: 'center', opacity: pop(t, 48.6)}}><F n="pensif" size={110} style={{margin: '0 auto'}} /></div>
              <div style={{position: 'absolute', left: 665, top: py(730) - 130, width: 130, textAlign: 'center', opacity: pop(t, 51.0)}}><F n="engrenage" size={110} style={{margin: '0 auto'}} /></div>
            </>
          );
        })()}
        <div style={{position: 'absolute', left: 30, bottom: 26, opacity: pop(t, 48.9)}}><Mono at={48.9} c={RED} size={24}>subjectif</Mono></div>
        <div style={{position: 'absolute', right: 30, bottom: 26, opacity: pop(t, 51.0)}}><Mono at={51.0} c={RED} size={24}>trop mécanique</Mono></div>
        {ok > 0 && <div style={{position: 'absolute', left: 0, right: 0, top: 26, textAlign: 'center', opacity: ok}}><Mono at={57.5} c={GREEN} size={26}>✓ juste milieu</Mono></div>}
      </Abs>
      <Abs x={140} y={1110} w={800} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, opacity: pop(t, 58.9)}}><F n="bouclier" size={110} /><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 58, color: INK}}>une défense bétonnée</div></Abs>
    </Out>
  );
};
const Plan: React.FC = () => {
  const t = useT();
  const k = t - 74.3;
  const go = t > 75.55;
  const P = SECT.slice(1, 5);
  return (
    <Out end={76.7}>
      <HiLine words={['La', 'feuille', 'de', 'route']} mark={[1, 2, 3]} at={62.8} y={320} size={64} />
      {P.map((x, i) => (
        <Brut key={i} x={70 + (i % 2) * 480} y={450 + Math.floor(i / 2) * 250} w={460} h={220} at={[65.6, 68.1, 70.5, 73.4][i]} sh={x.c} style={{display: 'flex', alignItems: 'center', gap: 18, padding: 20}}>
          <Tile ch={x.n} size={90} c={x.c} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK, lineHeight: 1.1}}>{x.title}</div>
        </Brut>
      ))}
      <Abs x={160} y={980} w={760} h={170} style={{background: NIGHT, borderRadius: 28, border: `6px solid ${INK}`, boxShadow: `9px 9px 0 ${TEAL}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 24px', boxSizing: 'border-box', opacity: pop(t, 74.1)}}>
        {[0, 1, 2, 3, 4].map((j) => {const on = !go && k > j * 0.22; const col = go ? GREEN : on ? RED : '#2A3142'; return <div key={j} style={{width: 96, height: 96, borderRadius: 48, background: `radial-gradient(circle at 35% 35%, ${on || go ? '#fff' : '#3A4458'}, ${col} 55%)`, border: '6px solid #0B0F18', boxShadow: on || go ? `0 0 26px ${col}` : 'none'}} />;})}
      </Abs>
      {go && <Abs x={0} y={1180} w={1080} style={{textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 46, letterSpacing: 6, color: GREEN, transform: `scale(${Math.max(0, Math.min(1, spring(t, 75.55, 9, 12)))})`}}>C’EST PARTI !</Abs>}
    </Out>
  );
};

/* ═════════════ PARTIE 1 : aspect ou impact ═════════════ */
const CauseEffet: React.FC = () => {
  const t = useT();
  const level = lerp(0.82, 0.18, prog(t, 95.0, 96.8, easeInOut));
  const drip = (t * 2.2) % 1;
  const scan = prog(t, 98.9, 100.6, easeInOut);
  return (
    <Out end={101.5}>
      <HiLine words={['La', 'cause', 'et', 'l’effet']} mark={[1, 3]} at={82.5} y={320} size={66} />
      <Brut x={60} y={450} w={450} h={600} at={83.4} sh={BLUE} style={{padding: 0, overflow: 'hidden'}}>
        <div style={{background: BLUE, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3, padding: '12px 20px'}}>ASPECT = LA CAUSE</div>
        <div style={{position: 'relative', height: 340}}>
          <div style={{position: 'absolute', left: 150, top: 30}}><F n="usine" size={150} /></div>
          {t > 88.7 && <div style={{position: 'absolute', left: 205, top: 200 + drip * 110, opacity: 1 - drip}}><F n="goutte" size={44} /></div>}
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, textAlign: 'center'}}><Mono at={88.7} c={BLUE} size={20}>consommer de l’eau</Mono></div>
        </div>
        <div style={{padding: '14px 20px', fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: INK, opacity: pop(t, 85.7)}}>l’activité <span style={{background: `${YEL}88`, padding: '0 6px'}}>interagit</span> avec l’environnement</div>
      </Brut>
      <Abs x={500} y={700} w={80} h={80} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: INK, opacity: pop(t, 91.3), transform: `translateX(${(1 - pop(t, 91.3)) * -30}px)`}}>→</Abs>
      <Brut x={570} y={450} w={450} h={600} at={91.3} sh={RED} style={{padding: 0, overflow: 'hidden'}}>
        <div style={{background: RED, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3, padding: '12px 20px'}}>IMPACT = L’EFFET</div>
        <div style={{position: 'relative', height: 340}}>
          <div style={{position: 'absolute', left: 95, top: 30, width: 250, height: 280, border: `6px solid ${INK}`, borderTop: 'none', borderRadius: '0 0 30px 30px', overflow: 'hidden', background: '#EEF6FB'}}>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: `${level * 100}%`, background: `linear-gradient(180deg, #7DB9F0, ${BLUE})`}} />
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, textAlign: 'center'}}><Mono at={95.0} c={RED} size={20}>épuisement des nappes</Mono></div>
        </div>
        <div style={{padding: '14px 20px', fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: INK, opacity: pop(t, 93.1)}}>la <span style={{background: `${YEL}88`, padding: '0 6px'}}>conséquence</span> de l’activité</div>
      </Brut>
      {t > 98.6 && <div style={{position: 'absolute', left: lerp(40, 860, scan), top: 470, opacity: 1 - prog(t, 100.6, 101.0)}}><F n="loupe" size={130} /></div>}
      <Stamp at={99.9} c={INK} text="vérifié en audit" x={300} y={1090} rot={-5} size={52} />
    </Out>
  );
};
const CycleVie: React.FC = () => {
  const t = useT();
  const walls = prog(t, 106.4, 107.4, easeInOut);
  const ring = prog(t, 107.6, 110.0, easeInOut);
  const urg = prog(t, 113.0, 113.4);
  const N = [{l: 'achats en amont', ic: 'camion', a: 108.1, ang: 200}, {l: 'l’usine', ic: 'usine', a: 107.6, ang: 270}, {l: 'fin de vie en aval', ic: 'recyclage', a: 109.6, ang: 340}, {l: 'usage', ic: 'colis', a: 110.2, ang: 90}];
  const R = 300;
  return (
    <Out end={115.5}>
      <HiLine words={['Tout', 'le', 'cycle', 'de', 'vie']} mark={[2, 3, 4]} at={105.5} y={320} size={62} />
      <Abs x={90} y={430} w={900} h={760} style={{background: urg > 0 ? `rgba(224,74,63,${0.08 * urg})` : '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `9px 9px 0 ${urg > 0.5 ? RED : GREEN}`, overflow: 'hidden', opacity: pop(t, 101.8)}}>
        <div style={{position: 'absolute', left: 16, top: 14}}><Mono at={102.6} c={INK} size={18}>{walls < 0.5 ? 'les quatre murs de l’usine' : 'analyse du cycle de vie'}</Mono></div>
        <svg width={900} height={760} style={{position: 'absolute', inset: 0}}>
          <circle cx={450} cy={400} r={R} fill="none" stroke={GREEN} strokeWidth={10} strokeDasharray={2 * Math.PI * R} strokeDashoffset={2 * Math.PI * R * (1 - ring)} strokeLinecap="round" />
          {[0, 1, 2, 3].map((k) => <rect key={k} x={k % 2 ? 450 + (k === 1 ? 140 : -150) : 310} y={k % 2 ? 260 : 400 + (k === 0 ? -140 : 130)} width={k % 2 ? 10 : 280} height={k % 2 ? 280 : 10} fill={BURG} opacity={1 - walls} transform={`translate(${[0, 1, 0, -1][k] * walls * 300} ${[-1, 0, 1, 0][k] * walls * 300})`} />)}
        </svg>
        <div style={{position: 'absolute', left: 450 - 80, top: 400 - 80, transform: `scale(${1 - walls * 0.35})`, opacity: pop(t, 102.4)}}><F n="usine" size={160} /></div>
        {N.filter((x) => x.ic !== 'usine').map((x, k) => {
          const a = (x.ang * Math.PI) / 180;
          return (
            <div key={k} style={{position: 'absolute', left: 450 + Math.cos(a) * R - 110, top: 400 + Math.sin(a) * R - 70, width: 220, textAlign: 'center', opacity: pop(t, x.a), transform: `scale(${pop(t, x.a)})`}}>
              <div style={{display: 'inline-block', background: '#fff', borderRadius: 60, padding: 10, border: `4px solid ${INK}`}}><F n={x.ic} size={80} /></div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK, background: '#fff'}}>{x.l}</div>
            </div>
          );
        })}
      </Abs>
      <Abs x={0} y={1220} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16, alignItems: 'center'}}>
        <Pill at={110.8} c={urg > 0.5 ? '#B8C0CC' : GREEN} size={30}>fonctionnement normal</Pill>
        <Pill at={113.0} c={RED} size={30}>situation d’urgence</Pill>
        {urg > 0 && <F n="sirene" size={80} style={{transform: `rotate(${Math.sin(t * 20) * 8}deg)`}} />}
      </Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 2 : la formule ═════════════ */
const Formule: React.FC = () => {
  const t = useT();
  const strike = prog(t, 124.4, 125.0, easeOut);
  const lab = [{l: 'fréquence', a: 136.3, c: BLUE}, {l: 'gravité', a: 137.2, c: RED}, {l: 'maîtrise', a: 138.5, c: GREEN}];
  const tile = (ch: string, a: number, c: string, size = 130) => <div style={{transform: `translateY(${(1 - Math.max(0, Math.min(1, spring(t, a, 8, 11)))) * -400}px)`, opacity: t >= a ? 1 : 0}}><Tile ch={ch} size={size} c={c} /></div>;
  return (
    <Out end={140.6}>
      <HiLine words={['On', 'fait', 'parler', 'les', 'maths']} mark={[4]} at={119.8} y={320} size={64} />
      <Abs x={0} y={460} w={1080} style={{textAlign: 'center', opacity: pop(t, 122.3) * (1 - prog(t, 129.8, 130.4))}}>
        <div style={{display: 'inline-block', position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 58, color: DIM}}>une formule magique imposée<Strike p={strike} c={RED} /></div>
        <div style={{marginTop: 30}}><Pill at={128.6} c={VIO} size={38}>redoutable d’efficacité</Pill></div>
      </Abs>
      <Abs x={0} y={560} w={1080} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: prog(t, 130.4, 130.6)}}>
        {tile('C', 130.8, INK, 150)}
        {tile('=', 131.2, DIM, 110)}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
          <div style={{display: 'flex', gap: 14, alignItems: 'center'}}>{tile('F', 131.6, BLUE)}{tile('×', 131.9, DIM, 90)}{tile('G', 132.3, RED)}</div>
          <div style={{width: 470 * prog(t, 132.7, 133.2, easeOut), height: 12, borderRadius: 6, background: INK}} />
          {tile('M', 133.3, GREEN)}
        </div>
      </Abs>
      <Abs x={110} y={1030} w={860} style={{display: 'flex', justifyContent: 'space-between'}}>
        {lab.map((x) => <div key={x.l} style={{textAlign: 'center', opacity: pop(t, x.a), transform: `translateY(${(1 - pop(t, x.a)) * 20}px)`}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 30, color: '#fff', background: x.c, padding: '6px 16px', borderRadius: 6}}>{x.l.toUpperCase()}</div></div>)}
      </Abs>
      <Abs x={0} y={1130} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 58, color: VIO, opacity: pop(t, 139.0)}}>fréquence × gravité ÷ maîtrise</Abs>
    </Out>
  );
};
const Logique: React.FC = () => {
  const t = useT();
  const up = prog(t, 143.2, 146.4, easeOut);
  const div = prog(t, 152.6, 155.6, easeInOut);
  const v = 12 * up * lerp(1, 1 / 3, div);
  const H = 460;
  return (
    <Out end={161.8}>
      <HiLine words={['Une', 'logique', 'brillante']} mark={[2]} at={140.6} y={320} size={64} />
      <Abs x={70} y={440} w={420} h={700} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${div > 0.5 ? GREEN : RED}`, opacity: pop(t, 141.0)}}>
        <div style={{position: 'absolute', left: 20, top: 16}}><Mono at={141.2} c={INK} size={18}>score C</Mono></div>
        <div style={{position: 'absolute', left: 130, bottom: 40, width: 160, height: H, borderRadius: 18, background: '#EEF1F5', border: `4px solid ${INK}`, overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: (v / 16) * H, background: div > 0.5 ? `linear-gradient(180deg, #6FD3A3, ${GREEN})` : `linear-gradient(180deg, #FF8A7A, ${RED})`}} />
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 96, color: div > 0.5 ? GREEN : RED}}>{v.toFixed(0)}</div>
      </Abs>
      <Abs x={530} y={440} w={480} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
        {[{l: 'arrive souvent', ic: 'calendrier', a: 143.4, c: BLUE, s: '× F ↑'}, {l: 'fait des dégâts', ic: 'collision', a: 144.6, c: RED, s: '× G ↑'}, {l: 'procédures de maîtrise', ic: 'clipboard', a: 149.1, c: GREEN, s: '÷ M'}].map((x, k) => (
          <div key={k} style={{display: 'flex', alignItems: 'center', gap: 14, background: '#fff', border: `4px solid ${INK}`, borderRadius: 14, padding: '12px 16px', boxShadow: `6px 6px 0 ${x.c}`, opacity: pop(t, x.a), transform: `translateX(${(1 - pop(t, x.a)) * 50}px)`}}>
            <F n={x.ic} size={64} /><div style={{flex: 1, fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK}}>{x.l}</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: x.c}}>{x.s}</div>
          </div>
        ))}
        <div style={{marginTop: 10, display: 'flex', justifyContent: 'center'}}><Pill at={145.6} c={RED} size={30}>le score grimpe</Pill></div>
        <div style={{display: 'flex', justifyContent: 'center'}}><Pill at={155.2} c={GREEN} size={30}>la note baisse</Pill></div>
      </Abs>
      <Cite y={1160} at={143.4} text="valeurs de la jauge choisies pour illustrer (exemple : 4 × 3 ÷ 3)" />
      <Stamp at={157.4} c={VIO} text="la preuve par A + B" x={220} y={1210} rot={-5} size={50} />
    </Out>
  );
};
const GRID = [['Rare', 'Négligeable', 'Aucune'], ['Occasionnel', 'Local', 'Partielle'], ['Fréquent', 'Significatif', 'Correcte'], ['Continu', 'Grave', 'Complète']];
const Echelles: React.FC = () => {
  const t = useT();
  const col = [167.2, 172.2, 177.2];
  const cc = [BLUE, RED, GREEN];
  return (
    <Out end={184.1}>
      <HiLine words={['Des', 'échelles', 'claires']} mark={[1]} at={163.1} y={320} size={64} />
      <Abs x={0} y={440} w={1080}><Board text="1 > 4" at={165.9} h={90} c={VIO} stag={0.05} /></Abs>
      <Win x={50} y={580} w={980} h={560} at={166.6} title="grille_de_cotation" c={VIO}>
        <div style={{display: 'flex', background: '#F6EEFF', fontFamily: MONO, fontWeight: 700, fontSize: 24, color: INK}}>
          <div style={{width: 130, padding: '14px 16px'}}>NIV.</div>
          {['F · fréquence', 'G · gravité', 'M · maîtrise'].map((h, j) => <div key={h} style={{flex: 1, padding: '14px 10px', color: cc[j], opacity: pop(t, col[j])}}>{h}</div>)}
        </div>
        {GRID.map((r, i) => (
          <div key={i} style={{display: 'flex', alignItems: 'center', borderTop: '2px solid #EEF1F5', height: 112}}>
            <div style={{width: 130, display: 'flex', justifyContent: 'center'}}><Tile ch={String(i + 1)} size={64} c={VIO} /></div>
            {r.map((v, j) => {const a = col[j] + i * 0.55; return <div key={j} style={{flex: 1, padding: '0 10px', fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: INK, opacity: pop(t, a), transform: `translateY(${(1 - pop(t, a)) * 16}px)`}}>{v}</div>;})}
          </div>
        ))}
      </Win>
      <Cite y={1160} at={167.5} text="niveaux repris de la grille affichée dans la vidéo d’origine" />
    </Out>
  );
};
const Plage: React.FC = () => {
  const t = useT();
  const run = prog(t, 186.1, 187.6, easeOut);
  const dim = prog(t, 188.7, 189.4);
  return (
    <Out end={199.2}>
      <HiLine words={['Le', 'chiffre', 'importe', 'peu']} mark={[1]} at={184.3} y={320} size={64} />
      <Abs x={70} y={450} w={940} h={300} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${VIO}`, opacity: pop(t, 184.6) * (1 - dim * 0.55)}}>
        <div style={{position: 'absolute', left: 60, right: 60, top: 150, height: 14, borderRadius: 7, background: '#E3E8EF'}}><div style={{width: `${run * 100}%`, height: '100%', borderRadius: 7, background: `linear-gradient(90deg, ${GREEN}, ${YEL}, ${RED})`}} /></div>
        {Array.from({length: 9}, (_, k) => <div key={k} style={{position: 'absolute', left: 60 + k * 102.5, top: 172, width: 3, height: 22, background: INK, opacity: run > k / 8 ? 1 : 0.2}} />)}
        <div style={{position: 'absolute', left: 30, top: 40, fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: GREEN}}>0,25</div>
        <div style={{position: 'absolute', right: 40, top: 40, fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: RED, opacity: run > 0.95 ? 1 : 0.15}}><Count n={16} a={186.1} b={187.6} /></div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center'}}><Mono at={185.2} c={INK} size={20}>plage du score C</Mono></div>
      </Abs>
      <Abs x={70} y={800} w={940} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
        <Check at={193.8} label="chaque niveau a sa définition" c={VIO} />
        <Check at={195.0} label="chaque note est précise" c={VIO} />
        <Check at={196.3} label="tout se justifie devant l’auditeur" c={VIO} />
      </Abs>
      <Stamp at={197.6} c={GREEN} text="justifiable" x={340} y={1180} rot={-5} size={56} />
    </Out>
  );
};

/* ═════════════ PARTIE 3 : seuils et garde-fous ═════════════ */
const BARS = [3, 6, 2.7, 4, 1.5, 8, 2, 5, 1, 3.5, 12, 2.2];
const Bruit: React.FC = () => {
  const t = useT();
  const noise = 1 - prog(t, 211.0, 211.8);
  const sort = prog(t, 215.7, 217.6, easeInOut);
  const line = prog(t, 220.6, 221.6, easeOut);
  const order = [...BARS.keys()].sort((a, b) => BARS[a] - BARS[b]);
  const W = 64;
  const steps = [{l: 'tout noter', a: 211.3}, {l: 'observer la répartition', a: 214.9}, {l: 'placer le seuil', a: 219.0}];
  return (
    <Out end={222.8}>
      <HiLine words={['Le', 'signal', 'ou', 'le', 'bruit', '?']} mark={[1]} at={203.8} y={320} size={64} />
      <Abs x={70} y={430} w={940} h={120} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{position: 'absolute', left: 60, right: 60, top: 38, height: 8, background: '#E3E8EF', borderRadius: 4}}><div style={{width: `${prog(t, 211.3, 220.0) * 100}%`, height: '100%', background: ORANGE, borderRadius: 4}} /></div>
        {steps.map((x, k) => (
          <div key={k} style={{position: 'relative', width: 280, textAlign: 'center', opacity: 0.35 + 0.65 * pop(t, x.a)}}>
            <div style={{margin: '0 auto', width: 84, height: 84, borderRadius: 42, background: t >= x.a ? ORANGE : '#fff', border: `5px solid ${INK}`, color: t >= x.a ? '#fff' : INK, fontFamily: sansFont, fontWeight: 900, fontSize: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{k + 1}</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK, marginTop: 6}}>{x.l}</div>
          </div>
        ))}
      </Abs>
      <Abs x={70} y={600} w={940} h={560} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${ORANGE}`, overflow: 'hidden', opacity: pop(t, 204.3)}}>
        {BARS.map((v, k) => {
          const slot = lerp(k, order.indexOf(k), sort);
          const jit = noise * (0.5 + 0.5 * Math.abs(Math.sin(t * 9 + k * 1.7)));
          const h = lerp(jit * 380, (v / 12) * 400, prog(t, 211.3 + k * 0.08, 211.9 + k * 0.08));
          const over = line > 0.5 && v >= 4;
          return <div key={k} style={{position: 'absolute', left: 50 + slot * (W + 12), bottom: 60, width: W, height: h, borderRadius: '10px 10px 0 0', background: noise > 0.5 ? '#C9D2DF' : over ? RED : '#9AA6B8'}} />;
        })}
        <div style={{position: 'absolute', left: 30, right: 30, bottom: 60, height: 4, background: INK}} />
        {line > 0 && <div style={{position: 'absolute', left: 30, width: 880 * line, bottom: 60 + (4 / 12) * 400, height: 0, borderTop: `6px dashed ${ORANGE}`}} />}
        {line > 0.8 && <div style={{position: 'absolute', right: 30, bottom: 60 + (4 / 12) * 400 + 10}}><Mono at={221.2} c={ORANGE} size={20}>seuil</Mono></div>}
        <div style={{position: 'absolute', left: 16, top: 14}}><Mono at={204.9} c={noise > 0.5 ? DIM : INK} size={18}>{noise > 0.5 ? 'bruit de fond' : 'toutes les notes'}</Mono></div>
      </Abs>
      <Abs x={0} y={1190} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 54, color: ORANGE, opacity: pop(t, 209.8)}}>« significatif » ne s’improvise pas</Abs>
    </Out>
  );
};
const Equilibriste: React.FC = () => {
  const t = useT();
  const lv = 4 + lerp(0, -2.6, prog(t, 225.6, 226.4, easeInOut)) + lerp(0, 8.6, prog(t, 231.5, 232.5, easeInOut)) + lerp(0, -6, prog(t, 235.2, 236.4, easeInOut));
  const y = (v: number) => 60 + (v / 12) * 400;
  const low = t > 226 && t < 231.5;
  const high = t > 232.4 && t < 235.4;
  return (
    <Out end={238.7}>
      <HiLine words={['Un', 'travail', 'd’équilibriste']} mark={[2]} at={222.8} y={320} size={62} />
      <Abs x={70} y={440} w={940} h={560} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${low || high ? RED : GREEN}`, overflow: 'hidden', opacity: pop(t, 223.0)}}>
        {[...BARS].sort((a, b) => a - b).map((v, k) => {
          const miss = high && v === 12;
          return <div key={k} style={{position: 'absolute', left: 50 + k * 76, bottom: 60, width: 64, height: (v / 12) * 400, borderRadius: '10px 10px 0 0', background: miss ? RED : v >= lv ? ORANGE : '#C9D2DF', boxShadow: miss ? `0 0 0 5px ${RED}55` : 'none'}} />;
        })}
        <div style={{position: 'absolute', left: 30, right: 30, bottom: 60, height: 4, background: INK}} />
        <div style={{position: 'absolute', left: 20, right: 20, bottom: y(lv), borderTop: `6px dashed ${INK}`}} />
        <div style={{position: 'absolute', right: 24, bottom: y(lv) + 8, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: INK, background: YEL, padding: '2px 10px', borderRadius: 4}}>seuil</div>
        <div style={{position: 'absolute', left: 16, top: 14}}><Mono at={224.5} c={INK} size={18}>curseur du seuil</Mono></div>
        {high && <div style={{position: 'absolute', right: 20, top: 60}}><Mono at={232.5} c={RED} size={20}>risque majeur raté</Mono></div>}
      </Abs>
      {low && (
        <Abs x={0} y={1030} w={1080} h={200}>
          {Array.from({length: 7}, (_, k) => <div key={k} style={{position: 'absolute', left: 300 + k * 14 + Math.sin(k) * 30, top: 120 - k * 18 * pop(t, 228.6 + k * 0.18), transform: `rotate(${(k % 3 - 1) * 6}deg)`, opacity: pop(t, 228.6 + k * 0.18)}}><F n="memo" size={110} /></div>)}
          <div style={{position: 'absolute', left: 560, top: 40}}><Pill at={227.7} c={RED} size={30}>tout devient urgent</Pill></div>
          <div style={{position: 'absolute', left: 560, top: 120}}><Pill at={229.6} c={INK} size={26}>plans d’action irréalisables</Pill></div>
        </Abs>
      )}
      {t > 235.4 && <Abs x={0} y={1060} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={235.6} c={GREEN} size={34}>une vraie réflexion stratégique</Pill></Abs>}
    </Out>
  );
};
const Citation: React.FC = () => {
  const t = useT();
  return (
    <Out end={249.4}>
      <HiLine words={['La', 'phrase', 'parfaite']} mark={[2]} at={239.0} y={320} size={64} />
      <Abs x={70} y={450} w={940} h={520} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 28, boxShadow: `10px 10px 0 ${ORANGE}`, opacity: pop(t, 241.3), padding: '50px 50px', boxSizing: 'border-box'}}>
        <div style={{position: 'absolute', left: 30, top: -30, fontFamily: 'Georgia, serif', fontSize: 200, color: YEL, lineHeight: 1}}>“</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: INK, lineHeight: 1.18, marginTop: 40}}>
          <Kin text="Une méthode de cotation" at={243.1} size={52} stagger={0.02} style={{display: 'inline'}} />
          <span style={{backgroundImage: `linear-gradient(${YEL}, ${YEL})`, backgroundRepeat: 'no-repeat', backgroundSize: `${prog(t, 244.5, 245.1) * 100}% 40%`, backgroundPosition: '0 88%', opacity: pop(t, 244.4), marginLeft: 14}}>crédible</span>
          <Kin text="ne surprend ni l’exploitant ni l’auditeur." at={245.4} size={52} stagger={0.02} style={{display: 'inline', marginLeft: 14}} />
        </div>
      </Abs>
      <Abs x={110} y={1010} w={860} style={{display: 'flex', justifyContent: 'space-around'}}>
        {[{ic: 'ouvrier', l: 'l’exploitant', a: 246.6}, {ic: 'auditeur', l: 'l’auditeur', a: 248.2}].map((x) => (
          <div key={x.l} style={{textAlign: 'center', opacity: pop(t, x.a)}}>
            <div style={{position: 'relative', display: 'inline-block'}}><F n={x.ic} size={130} /><div style={{position: 'absolute', right: -10, top: -6, width: 50, height: 50, borderRadius: 25, background: GREEN, color: '#fff', fontWeight: 900, fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop(t, x.a + 0.4)})`}}>✓</div></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK}}>{x.l} · pas surpris</div>
          </div>
        ))}
      </Abs>
      <Cite y={1230} at={243.5} text="citation reprise de la vidéo d’origine" />
    </Out>
  );
};
const GardeFou: React.FC = () => {
  const t = useT();
  const boom = t - 258.1;
  const shake = boom > 0 && boom < 0.6 ? Math.sin(boom * 80) * 14 * (1 - boom / 0.6) : 0;
  return (
    <Out end={271.7}>
      <AbsoluteFill style={{transform: `translate(${shake}px, ${shake * 0.6}px)`}}>
        <HiLine words={['Le', 'fameux', 'garde-fou']} mark={[2]} at={249.5} y={320} size={64} />
        {t < 262.4 && (
          <Win x={90} y={450} w={900} h={560} at={252.2} title="calcul_automatique.exe" c={RED} dark>
            <div style={{padding: 30, fontFamily: MONO, fontWeight: 700, fontSize: 30, color: '#C8D0E0', lineHeight: 1.7}}>
              <div style={{opacity: pop(t, 253.0)}}>&gt; équation sophistiquée…</div>
              <div style={{opacity: pop(t, 254.6)}}>&gt; aspect : <span style={{color: '#FFB86B'}}>pollution chimique évidente</span></div>
              <div style={{opacity: pop(t, 256.2), fontSize: 40, marginTop: 18}}>&gt; résultat : <span style={{color: GREEN}}>NON significatif</span></div>
            </div>
            {boom > 0 && (
              <svg width={900} height={511} style={{position: 'absolute', inset: 0}}>
                <path d="M450 0 L420 120 L480 200 L400 320 L470 420 L430 511" stroke={RED} strokeWidth={8} fill="none" strokeDasharray={600} strokeDashoffset={600 * (1 - prog(t, 258.1, 258.5))} />
                <path d="M420 120 L300 160 M480 200 L620 240 M400 320 L260 360" stroke={RED} strokeWidth={5} fill="none" opacity={prog(t, 258.3, 258.6)} />
              </svg>
            )}
          </Win>
        )}
        {boom > 0 && boom < 1.2 && [0, 0.25].map((d) => {const rk = (boom - d) / 0.9; return rk > 0 && rk < 1 ? <div key={d} style={{position: 'absolute', left: 540 - rk * 700, top: 730 - rk * 700, width: rk * 1400, height: rk * 1400, borderRadius: '50%', border: `${lerp(26, 2, rk)}px solid ${RED}`, opacity: 0.5 * (1 - rk)}} /> : null;})}
        {t < 262.4 && <Stamp at={258.15} c={RED} text="boum !" x={640} y={420} rot={8} size={56} />}
        {t < 262.4 && <Stamp at={260.6} c={INK} text="le calcul est à côté" x={200} y={1060} rot={-5} size={52} />}
        {t >= 262.4 && (
          <>
            <Blinds src="smi/raffinerie.jpg" x={90} y={450} w={900} h={560} at={262.6} pos="50% 40%">
              <div style={{position: 'absolute', left: 20, top: 20}}><Mono at={265.6} c={INK} size={22}>la réalité opérationnelle</Mono></div>
            </Blinds>
            <Abs x={0} y={1050} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={263.8} c={ORANGE} size={30}>toujours connectée</Pill><Pill at={267.2} c={GREEN} size={30}>+ le bon sens</Pill></Abs>
            <Abs x={0} y={1160} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 52, color: INK, opacity: pop(t, 268.3)}}>pas des maths pour faire joli</Abs>
          </>
        )}
      </AbsoluteFill>
    </Out>
  );
};

/* ═════════════ PARTIE 4 : application ═════════════ */
const ROWS = [
  {l: 'Eau', ic: 'goutte', v: [4, 3, 2], c: 6, at: [280.7, 282.1, 283.2], cAt: 285.2, ok: 287.2, verdict: 'OUI'},
  {l: 'GES', ic: 'vapeur', v: [4, 3, 3], c: 4, at: [291.0, 291.4, 291.8], cAt: 292.7, ok: 293.7, verdict: 'OUI'},
  {l: 'Déchets', ic: 'dechets', v: [2, 4, 3], c: 2.7, at: [297.2, 297.6, 298.0], cAt: 298.2, ok: 300.7, verdict: 'NON'},
];
const Tableau: React.FC = () => {
  const t = useT();
  const exc = t >= 302.9;
  const flip = prog(t, 310.0, 310.5, easeOut);
  const crush = prog(t, 317.2, 317.8, easeIn);
  const cur = t < 289.8 ? 0 : t < 295.4 ? 1 : 2;
  const needle = ROWS[cur].c;
  return (
    <Out end={332.3}>
      <HiLine words={exc ? ['Pourquoi', 'une', 'exception', '?'] : ['Dans', 'la', 'vraie', 'vie']} mark={exc ? [2] : [2, 3]} at={exc ? 303.1 : 275.5} y={320} size={62} />
      <Win x={40} y={430} w={1000} h={480} at={276.0} title="cotation_aspects.xlsx" c={TEAL}>
        <div style={{display: 'flex', background: '#E6F6F3', fontFamily: MONO, fontWeight: 700, fontSize: 24, color: INK, height: 56, alignItems: 'center'}}>
          <div style={{width: 280, paddingLeft: 20}}>ASPECT</div>{['F', 'G', 'M', 'C'].map((h) => <div key={h} style={{width: 110, textAlign: 'center'}}>{h}</div>)}<div style={{flex: 1, textAlign: 'center', background: YEL, alignSelf: 'stretch', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>SEUIL 4</div>
        </div>
        {ROWS.map((r, i) => {
          const hot = (exc && i === 2) || (!exc && i === cur && t > r.at[0] - 1.2);
          const isEx = i === 2 && flip > 0;
          return (
            <div key={i} style={{display: 'flex', alignItems: 'center', height: 124, borderTop: '2px solid #EEF1F5', background: hot ? '#FFF8E1' : '#fff', opacity: pop(t, r.at[0] - 1.0)}}>
              <div style={{width: 280, paddingLeft: 16, display: 'flex', alignItems: 'center', gap: 12}}><F n={r.ic} size={64} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK}}>{r.l}</span></div>
              {r.v.map((v, j) => <div key={j} style={{width: 110, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: [BLUE, RED, GREEN][j], transform: `scale(${pop(t, r.at[j])})`}}>{v}</div>)}
              <div style={{width: 110, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 46, opacity: pop(t, r.cAt), color: i === 2 && crush > 0 ? DIM : INK, transform: i === 2 ? `scaleY(${1 - crush * 0.4}) translateY(${crush * 12}px)` : undefined, textDecoration: i === 2 && crush > 0.5 ? 'line-through' : undefined}}><Count n={r.c} a={r.cAt} b={r.cAt + 0.6} dec={r.c % 1 ? 1 : 0} /></div>
              <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
                <div style={{position: 'relative', padding: '8px 18px', borderRadius: 12, background: isEx ? RED : r.verdict === 'OUI' ? GREEN : '#9AA6B8', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 32, transform: `scale(${pop(t, r.ok)}) rotateY(${isEx ? (1 - flip) * 180 : 0}deg)`}}>{isEx ? 'OUI · loi' : r.verdict}</div>
              </div>
            </div>
          );
        })}
      </Win>
      {!exc && (
        <Abs x={70} y={960} w={940} h={220} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${TEAL}`, opacity: pop(t, 277.9)}}>
          <div style={{position: 'absolute', left: 40, right: 40, top: 90, height: 30, borderRadius: 15, background: '#E3E8EF', overflow: 'hidden'}}><div style={{width: `${(needle / 8) * 100}%`, height: '100%', background: needle >= 4 ? (needle > 4 ? RED : ORANGE) : GREEN, transition: 'none'}} /></div>
          <div style={{position: 'absolute', left: 40 + (4 / 8) * 860 - 4, top: 60, width: 8, height: 90, background: INK}} />
          <div style={{position: 'absolute', left: 40 + (4 / 8) * 860 - 60, top: 20, width: 120, textAlign: 'center'}}><Mono at={277.9} c={INK} size={20}>seuil 4</Mono></div>
          <div style={{position: 'absolute', left: 40, top: 140, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>{ROWS[cur].l} : {String(ROWS[cur].c).replace('.', ',')} {ROWS[cur].c > 4 ? '> 4 · il faut agir' : ROWS[cur].c === 4 ? '= 4 · plan d’action' : '< 4 · on ne bouge pas'}</div>
        </Abs>
      )}
      {exc && (
        <>
          <Abs x={70} y={960} w={460} h={300} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${RED}`, opacity: pop(t, 306.2)}}>
            <F n="radioactif" size={110} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK, textAlign: 'center'}}>déchets dangereux<br />score 2,7</div>
          </Abs>
          <Abs x={560} y={960} w={460} h={300} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: NIGHT, border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${GOLD}`, opacity: pop(t, 313.1)}}>
            <div style={{transform: `translateY(${(1 - prog(t, 313.2, 313.8, easeIn)) * -200}px)`}}><F n="juge" size={120} /></div>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 28, color: GOLD, letterSpacing: 2}}>LA RÉGLEMENTATION</div>
          </Abs>
          {t > 322.5 && <Abs x={0} y={1280} w={1080}><Board text="LOI > CALCUL" at={322.7} h={78} c={RED} stag={0.035} /></Abs>}
          <Stamp at={310.1} c={RED} text="significatif" x={600} y={905} rot={-4} size={38} />
        </>
      )}
      {t > 327.6 && <Abs x={0} y={1390} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16, alignItems: 'center'}}><Pill at={327.8} c={GREEN} size={28}>intelligence métier</Pill><div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: DIM, opacity: pop(t, 330.5)}}>feuille de calcul aveugle<Strike p={prog(t, 330.9, 331.4)} c={RED} /></div></Abs>}
      {!exc && <Cite y={918} at={276.2} text="valeurs F, G, M, C et seuil reprises du tableau de la vidéo d’origine" />}
    </Out>
  );
};

/* ═════════════ BILAN ═════════════ */
const Retenir: React.FC = () => {
  const t = useT();
  return (
    <Out end={349.4}>
      <HiLine words={['Pas', 'de', 'la', 'magie']} mark={[3]} at={335.6} y={320} size={64} />
      <Abs x={90} y={450} w={900} style={{display: 'flex', flexDirection: 'column', gap: 18}}>
        <Check at={338.2} label="séparer la cause de l’effet" c={BLUE} />
        <Check at={339.9} label="une formule défendable" c={VIO} />
        <Check at={341.2} label="des seuils bien pensés" c={ORANGE} />
        <Check at={343.9} label="du bon sens terrain" c={TEAL} />
      </Abs>
      <Stamp at={346.0} c={GREEN} text="méthode solide" x={300} y={1090} rot={-5} size={58} />
    </Out>
  );
};
const Question: React.FC = () => {
  const t = useT();
  const door = prog(t, 351.9, 352.9, easeInOut);
  const verdict = t >= 359.4;
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={['Tiendrait-elle', 'la', 'route', '?']} mark={[2]} at={355.7} y={320} size={60} />
      <Abs x={60} y={440} w={380} h={600} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${INK}`, overflow: 'hidden', opacity: pop(t, 349.6)}}>
        <div style={{position: 'absolute', left: 60, top: 80, width: 260, height: 440, background: '#EAF1F8', border: `5px solid ${INK}`}}>
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 4, paddingBottom: 20, opacity: door}}><F n="auditeur" size={110} /><F n="detective" size={90} /></div>
          <div style={{position: 'absolute', inset: 0, background: `linear-gradient(90deg, #B98A4A, #D9AF6E)`, transformOrigin: '0 50%', transform: `perspective(800px) rotateY(${-door * 75}deg)`, border: `4px solid ${INK}`}}><div style={{position: 'absolute', right: 20, top: 210, width: 22, height: 22, borderRadius: 11, background: GOLD}} /></div>
        </div>
        <div style={{position: 'absolute', left: 16, top: 16}}><Mono at={351.9} c={RED} size={18}>audit surprise</Mono></div>
      </Abs>
      <Win x={470} y={440} w={550} h={600} at={354.0} title="grille_de_cotation" c={verdict ? GREEN : ORANGE}>
        {['Eau', 'GES', 'Déchets', 'Bruit', 'Énergie'].map((l, k) => (
          <div key={l} style={{display: 'flex', alignItems: 'center', height: 100, borderBottom: '2px solid #EEF1F5', padding: '0 20px', gap: 14, opacity: pop(t, 354.4 + k * 0.15)}}>
            <div style={{flex: 1, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>{l}</div>
            <div style={{width: 54, height: 54, borderRadius: 12, background: verdict && t >= 359.5 + k * 0.15 ? GREEN : '#FFF1D6', border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 32, color: verdict && t >= 359.5 + k * 0.15 ? '#fff' : ORANGE}}>{verdict && t >= 359.5 + k * 0.15 ? '✓' : '?'}</div>
          </div>
        ))}
      </Win>
      <Abs x={0} y={1080} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16}}><Pill at={359.0} c={GREEN} size={30}>justifiée fermement</Pill><Pill at={361.2} c={DIM} size={30}>ou débats sans fin ?</Pill></Abs>
      <Stamp at={362.4} c={INK} text="test de solidité" x={260} y={1170} rot={-5} size={58} />
      {t > 364.5 && <Dust n={20} c={GOLD} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const trans = (x: {at: number; k: TK}): Sfx[] => x.k === 'tube' ? [{at: x.at + 0.05, s: 'sfx/whoosh', v: 0.5}, {at: x.at + 0.75, s: 'sfx/thud', v: 0.4}, {at: x.at + 0.85, s: 'cadenas', v: 0.35}, {at: x.at + 1.0, s: 'page', v: 0.45}, {at: x.at + 1.32, s: 'tampon', v: 0.4}, {at: x.at + 2.6, s: 'page', v: 0.3}, {at: x.at + 3.0, s: 'sfx/whoosh', v: 0.45}]
  : x.k === 'gyro' ? [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}]
  : x.k === 'loupe' ? [{at: x.at, s: 'sfx/swish', v: 0.4}, {at: x.at + 0.4, s: 'sfx/thud', v: 0.3}, {at: x.at + 1.1, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 1.4, s: 'sfx/pop', v: 0.22}, {at: x.at + 3.0, s: 'sfx/whoosh', v: 0.3}]
  : [...rep(x.at, 12, 0.035, 'sfx/click', 0.18), {at: x.at + 0.7, s: 'sfx/pop', v: 0.25}, {at: x.at + 1.0, s: 'soft-whoosh', v: 0.35, dur: 1}, ...rep(x.at + 2.85, 12, 0.035, 'sfx/click', 0.16), {at: x.at + 3.1, s: 'sfx/swish', v: 0.3}];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 1.4, s: 'validation', v: 0.2})), {at: ALLDONE, s: 'validation', v: 0.35},
  ...flaps(5.0, 14), {at: 7.5, s: 'soft-whoosh', v: 0.3}, ...[14.5, 15.1, 15.7].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})), ...rep(18.0, 6, 0.18, 'sfx/pop', 0.2), {at: 22.4, s: 'sfx/rise', v: 0.25}, {at: 23.4, s: 'tampon', v: 0.45},
  ...[25.3, 26.4, 27.4].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), ...[25.8, 26.9, 27.9].map((a) => ({at: a, s: 'sfx/ding', v: 0.18})), {at: 28.4, s: 'stylo', v: 0.3},
  {at: 36.6, s: 'sfx/swish', v: 0.4}, {at: 37.8, s: 'sfx/thud', v: 0.4}, {at: 38.8, s: 'sfx/whoosh', v: 0.25}, ...rep(39.9, 5, 0.2, 'sfx/click', 0.2), ...rep(42.3, 5, 0.12, 'sfx/pop', 0.15), {at: 43.9, s: 'tampon', v: 0.55},
  {at: 48.4, s: 'sfx/thud', v: 0.3}, {at: 51.0, s: 'sfx/thud', v: 0.3}, {at: 56.8, s: 'sfx/rise', v: 0.2}, {at: 57.9, s: 'sfx/ding', v: 0.3}, {at: 58.9, s: 'validation', v: 0.25},
  ...[65.6, 68.1, 70.5, 73.4].map((a) => ({at: a, s: 'sfx/thud', v: 0.28})), ...rep(74.3, 5, 0.22, 'sfx/click', 0.3), {at: 75.55, s: 'sfx/ding', v: 0.35}, {at: 75.6, s: 'sfx/whoosh', v: 0.35},
  {at: 83.4, s: 'sfx/thud', v: 0.3}, ...rep(88.8, 6, 0.45, 'sfx/pop', 0.1), {at: 91.3, s: 'sfx/thud', v: 0.3}, {at: 95.0, s: 'sfx/rise', v: 0.2}, {at: 98.8, s: 'sfx/swish', v: 0.3}, {at: 100.7, s: 'tampon', v: 0.45},
  {at: 104.2, s: 'sfx/thud', v: 0.3}, {at: 106.4, s: 'soft-whoosh', v: 0.35}, ...[107.6, 108.1, 109.6, 110.2].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})), {at: 113.0, s: 'alarme', v: 0.1, dur: 1.2},
  {at: 124.4, s: 'stylo', v: 0.35}, {at: 128.6, s: 'sfx/pop', v: 0.22}, ...[130.8, 131.2, 131.6, 131.9, 132.3, 133.3].map((a) => ({at: a + 0.25, s: 'sfx/thud', v: 0.3})), {at: 132.7, s: 'stylo', v: 0.25}, ...[136.3, 137.2, 138.5].map((a) => ({at: a, s: 'sfx/ding', v: 0.18})),
  ...rep(143.2, 12, 0.25, 'tick', 0.14), {at: 146.4, s: 'bass-hit', v: 0.35}, {at: 149.1, s: 'sfx/pop', v: 0.2}, {at: 152.6, s: 'sfx/swish', v: 0.35}, ...rep(152.8, 8, 0.3, 'tick', 0.12), {at: 155.6, s: 'validation', v: 0.25}, {at: 157.4, s: 'tampon', v: 0.45},
  ...flaps(165.9, 8), {at: 166.6, s: 'sfx/whoosh', v: 0.25}, ...[0, 1, 2].flatMap((j) => rep([167.2, 172.2, 177.2][j], 4, 0.55, 'sfx/click', 0.18)),
  ...rep(186.1, 10, 0.15, 'tick', 0.14), {at: 187.6, s: 'sfx/ding', v: 0.25}, ...[194.05, 195.25, 196.55].map((a) => ({at: a, s: 'sfx/click', v: 0.3})), {at: 197.6, s: 'tampon', v: 0.45},
  {at: 204.3, s: 'tension', v: 0.12, dur: 6}, ...[211.3, 214.9, 219.0].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), {at: 215.7, s: 'sfx/swish', v: 0.3}, {at: 220.6, s: 'stylo', v: 0.35},
  {at: 225.6, s: 'sfx/swish', v: 0.3}, ...rep(228.6, 7, 0.18, 'page', 0.2), {at: 231.5, s: 'sfx/swish', v: 0.3}, {at: 232.5, s: 'notification', v: 0.2}, {at: 235.2, s: 'sfx/swish', v: 0.3}, {at: 235.6, s: 'validation', v: 0.25},
  {at: 241.3, s: 'soft-whoosh', v: 0.3}, {at: 244.5, s: 'stylo', v: 0.3}, {at: 246.6, s: 'sfx/ding', v: 0.2}, {at: 248.2, s: 'sfx/ding', v: 0.22},
  {at: 252.2, s: 'sfx/whoosh', v: 0.25}, ...[253.0, 254.6, 256.2].map((a) => ({at: a, s: 'sfx/click', v: 0.25})), {at: 258.1, s: 'deep-hit', v: 0.55}, {at: 258.12, s: 'bass-hit', v: 0.45}, {at: 260.6, s: 'tampon', v: 0.45}, {at: 262.6, s: 'soft-whoosh', v: 0.3}, {at: 268.3, s: 'stylo', v: 0.25},
  {at: 276.0, s: 'sfx/whoosh', v: 0.25}, {at: 277.9, s: 'sfx/pop', v: 0.2},
  ...ROWS.flatMap((r) => [...r.at.map((a) => ({at: a, s: 'sfx/click', v: 0.25})), ...rep(r.cAt, 4, 0.14, 'tick', 0.15), {at: r.ok, s: r.verdict === 'OUI' ? 'validation' : 'sfx/thud', v: 0.25}]),
  {at: 306.2, s: 'sfx/pop', v: 0.2}, {at: 310.0, s: 'sfx/swish', v: 0.3}, {at: 310.1, s: 'tampon', v: 0.5}, {at: 313.2, s: 'sfx/whoosh', v: 0.3}, {at: 313.8, s: 'deep-hit', v: 0.4}, {at: 317.6, s: 'sfx/thud', v: 0.45}, ...flaps(322.7, 12), {at: 327.8, s: 'sfx/pop', v: 0.22}, {at: 330.9, s: 'stylo', v: 0.3},
  ...[338.2, 339.9, 341.2, 343.9].map((a) => ({at: a + 0.3, s: 'sfx/click', v: 0.35})), {at: 346.0, s: 'tampon', v: 0.5},
  {at: 351.9, s: 'cadenas', v: 0.35}, {at: 352.1, s: 'sfx/swish', v: 0.3}, {at: 354.0, s: 'sfx/whoosh', v: 0.25}, ...rep(359.5, 5, 0.15, 'sfx/click', 0.25), {at: 361.2, s: 'sfx/pop', v: 0.2}, {at: 362.4, s: 'tampon', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Iso14001: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={30.4}><Intro /></Gate>
    <Gate from={34.2} to={46.0}><Piege /></Gate>
    <Gate from={45.9} to={62.0}><Balance /></Gate>
    <Gate from={61.9} to={76.8}><Plan /></Gate>
    <Gate from={79.9} to={101.6}><CauseEffet /></Gate>
    <Gate from={101.5} to={115.6}><CycleVie /></Gate>
    <Gate from={118.9} to={140.7}><Formule /></Gate>
    <Gate from={140.6} to={161.9}><Logique /></Gate>
    <Gate from={161.8} to={184.2}><Echelles /></Gate>
    <Gate from={184.1} to={199.3}><Plage /></Gate>
    <Gate from={202.5} to={222.9}><Bruit /></Gate>
    <Gate from={222.8} to={238.8}><Equilibriste /></Gate>
    <Gate from={238.7} to={249.5}><Citation /></Gate>
    <Gate from={249.4} to={271.8}><GardeFou /></Gate>
    <Gate from={274.9} to={332.4}><Tableau /></Gate>
    <Gate from={335.5} to={349.5}><Retenir /></Gate>
    <Gate from={349.4} to={OUTRO_AT}><Question /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}>{x.k === 'tube' ? <Pneumatique i={i} /> : x.k === 'gyro' ? <Gyro i={i} /> : x.k === 'loupe' ? <Loupe i={i} /> : <Store i={i} />}</Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={369.3}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-iso14001-cotation-origine.m4a')} trimAfter={s(369.4)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [T, Deep];
