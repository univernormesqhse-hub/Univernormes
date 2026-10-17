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
 * « ISO 9001 en Afrique de l'Ouest » (3 min 56) — capsule « condensé + effet wahou » : voix d'origine, sous-titres
 * recalés mot à mot, photos réelles, thème « papier quadrillé ».
 * Fil rouge : LE TUBE PNEUMATIQUE À SIX GUICHETS (portrait → répartition → fossé → pourquoi → potentiel → avenir) ;
 * la capsule du dossier file d'un guichet à l'autre et chaque guichet passé se coche.
 * Transitions : LE PNEUMATIQUE (1 et 5), LA LOUPE (2 et 6), LE STORE VÉNITIEN (3), LE GYROPHARE (4).
 * Condensé de la série : texte cinétique, mot surligné jaune, mot manuscrit, tuiles de bois, palettes d'affichage,
 * fenêtres d'interface, store vénitien sur photo, photos en profondeur, compteurs, cartes à ombre dure, étiquettes
 * monospace, tampons, mots barrés, onde de choc, cases cochées, poussière.
 * Effets « wahou » nouveaux : barre de recherche qui tape la requête et trouve « 1947 », sceau de cire pressé sur le certificat, certificats qui se multiplient en mosaïque,
 * carte à bulles de l'Afrique de l'Ouest (bulles proportionnelles aux certifications citées), compteur à rouleaux
 * « 1947 », pièce de puzzle, donut 52 / 48 avec couronne, locomotive qui tire ses wagons, course de barres, travelling
 * vertical sur le classement, sol qui se fissure entre 1013 et 1, engrenages du cercle vertueux contre engrenages
 * grippés, carte qui se retourne en 3D (écart → opportunité), fusée qui décolle, projecteur qui allume toute la carte.
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
const OUTRO_AT = 235.6;
export const ISOAFR_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 37.9, n: '1', title: 'Portrait de la qualité', s: 'la vue d’ensemble', c: BLUE, g: 'portrait', k: 'tube', lab: 'DOSSIER N°1'},
  {at: 63.45, n: '2', title: 'La répartition', s: 'une domination écrasante', c: VIO, g: 'répartition', k: 'loupe', lab: 'PARTIE 2 / 6'},
  {at: 112.6, n: '3', title: 'Le grand écart', s: 'une histoire à deux vitesses', c: RED, g: 'fossé', k: 'store', lab: 'PARTIE 3 / 6'},
  {at: 137.05, n: '4', title: 'Derrière les chiffres', s: 'le pourquoi', c: ORANGE, g: 'pourquoi', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 181.9, n: '5', title: 'Le potentiel', s: 'vers l’opportunité', c: GREEN, g: 'potentiel', k: 'tube', lab: 'DOSSIER N°5'},
  {at: 220.6, n: '6', title: 'Et demain ?', s: 'la question ouverte', c: TEAL, g: 'avenir', k: 'loupe', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 231.1;

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


/* ═════════════ Carte à bulles de l'Afrique de l'Ouest ═════════════ */
const PAYS: {l: string; lon: number; lat: number; n?: number; pos?: 'u' | 'l' | 'r'}[] = [
  {l: 'Mauritanie', lon: -10.9, lat: 20.3}, {l: 'Sénégal', lon: -14.5, lat: 14.6, n: 96, pos: 'u'}, {l: 'Gambie', lon: -15.6, lat: 13.2, n: 1, pos: 'r'}, {l: 'Guinée-Bissau', lon: -15, lat: 11.9},
  {l: 'Guinée', lon: -10.9, lat: 10.3}, {l: 'Sierra Leone', lon: -11.8, lat: 8.4, n: 4, pos: 'l'}, {l: 'Liberia', lon: -9.4, lat: 6.3}, {l: 'Côte d’Ivoire', lon: -5.5, lat: 7.6, n: 304, pos: 'l'},
  {l: 'Mali', lon: -3.5, lat: 17.0}, {l: 'Burkina Faso', lon: -1.6, lat: 12.3, n: 125, pos: 'u'}, {l: 'Ghana', lon: -1.0, lat: 7.9, n: 190}, {l: 'Togo', lon: 0.9, lat: 8.6},
  {l: 'Bénin', lon: 2.3, lat: 9.6}, {l: 'Niger', lon: 8.0, lat: 17.0, n: 2}, {l: 'Nigeria', lon: 8.2, lat: 9.2, n: 1013},
];
const MW = 900, MH = 640;
const px = (lon: number) => 40 + ((lon + 18) / 32) * 820;
const py = (lat: number) => 30 + ((23 - lat) / 18) * 580;
const rad = (n?: number) => (n === undefined ? 7 : 9 + Math.sqrt(n) * 2.2);
const BubbleMap: React.FC<{x: number; y: number; at: number; grow: number; lit?: number; hi?: string[]; labels?: boolean; dim?: number}> = ({x, y, at, grow, lit = 0, hi = [], labels = true, dim = 0}) => {
  const t = useT();
  return (
    <Abs x={x} y={y} w={MW} h={MH} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 26, boxShadow: `9px 9px 0 ${lit > 0.5 ? GREEN : NAVY}`, overflow: 'hidden', opacity: pop(t, at)}}>
      <div style={{position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(#D9DFE8 2px, transparent 2px)', backgroundSize: '26px 26px'}} />
      <svg width={MW} height={MH} style={{position: 'absolute', inset: 0}}>
        <text x={px(-14)} y={py(5)} fill="#7FA9D2" fontFamily="sans-serif" fontWeight={800} fontSize={22}>océan Atlantique</text>
        <text x={px(-5)} y={py(3.8)} fill="#7FA9D2" fontFamily="sans-serif" fontWeight={800} fontSize={20}>golfe de Guinée</text>
      </svg>
      {PAYS.map((p, k) => {
        const r = lerp(6, rad(p.n), p.n === undefined ? 1 : grow);
        const isHi = hi.includes(p.l);
        const on = lit > 0 && lit >= (px(p.lon) / MW) * 0.92;
        const col = on ? GREEN : p.n === undefined ? '#C9D2DF' : isHi ? RED : p.n > 500 ? VIO : p.n > 50 ? BLUE : ORANGE;
        return (
          <div key={k} style={{position: 'absolute', left: px(p.lon) - r, top: py(p.lat) - r, width: r * 2, height: r * 2, borderRadius: '50%', background: col, border: `${p.n && p.n > 50 ? 4 : 2}px solid ${on ? '#fff' : INK}`, boxShadow: on ? `0 0 26px ${GREEN}` : isHi ? `0 0 0 ${6 + 4 * Math.sin(t * 6)}px ${RED}44` : 'none', opacity: (1 - dim) * pop(t, at + 0.2 + k * 0.03), transition: 'none'}}>
            {labels && (p.n !== undefined || on) && <div style={{position: 'absolute', ...(p.pos === 'u' ? {left: '50%', bottom: r * 2 + 2, transform: 'translateX(-50%)'} : p.pos === 'l' ? {right: r * 2 + 6, top: r - 13} : p.pos === 'r' ? {left: r * 2 + 6, top: r - 13} : {left: '50%', top: r * 2 + 2, transform: 'translateX(-50%)'}), whiteSpace: 'nowrap', fontFamily: sansFont, fontWeight: 900, fontSize: p.n && p.n > 100 ? 22 : 17, color: INK, background: 'rgba(255,255,255,0.85)', padding: '0 4px', borderRadius: 4}}>{p.l}{p.n !== undefined && grow > 0.9 ? ` · ${p.n}` : ''}</div>}
          </div>
        );
      })}
    </Abs>
  );
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('induction/mine-equipe.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 880, objectFit: 'cover', objectPosition: '62% 40%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 30%, ${PAPER}DD 40%, ${PAPER} 45%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={700} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>LES DONNÉES DE CERTIFICATION · 2023</div>
        <div style={{marginTop: 22}}><Board text="ISO 9001" at={-1} h={104} c={BLUE} stag={0.03} /></div>
        <T size={64} style={{marginTop: 12, letterSpacing: -1}}>en</T>
        <div style={{display: 'flex', justifyContent: 'center', gap: 6, marginTop: 8}}>{'AFRIQUE'.split('').map((c, i) => <Tile key={i} ch={c} size={100} c={ORANGE} />)}</div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 96, color: INK, marginTop: 4}}>de <span style={{backgroundImage: `linear-gradient(${YEL}, ${YEL})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 40%', backgroundPosition: '0 85%'}}>l’Ouest</span></div>
      </Abs>
      <Abs x={60} y={1390} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 70, width: 140, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO : sceau de cire, mosaïque, carte ═════════════ */
const Certif: React.FC<{w: number; seal?: number}> = ({w, seal = 0}) => (
  <div style={{position: 'relative', width: w, height: w * 0.72, background: 'linear-gradient(135deg, #FFFDF6, #F5EBCF)', border: `${w * 0.012}px solid ${GOLD}`, outline: `${w * 0.006}px solid ${INK}`, outlineOffset: w * 0.012, borderRadius: w * 0.02, boxShadow: '0 20px 40px rgba(20,33,61,0.18)'}}>
    <div style={{position: 'absolute', left: 0, right: 0, top: w * 0.08, textAlign: 'center', fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: w * 0.07, color: NAVY, letterSpacing: w * 0.004}}>CERTIFICAT</div>
    <div style={{position: 'absolute', left: 0, right: 0, top: w * 0.2, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: w * 0.05, color: INK}}>ISO 9001</div>
    {[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: w * 0.15, right: w * 0.15, top: w * (0.33 + k * 0.06), height: w * 0.012, background: '#D8CBA6', borderRadius: 4}} />)}
    {seal > 0 && <div style={{position: 'absolute', right: w * 0.08, bottom: w * 0.06, width: w * 0.22, height: w * 0.22, borderRadius: '50%', background: `radial-gradient(circle at 35% 35%, #E25B4E, ${BURG})`, border: `${w * 0.008}px solid #8E2A22`, transform: `scale(${lerp(2.4, 1, seal)}) rotate(${(1 - seal) * -30}deg)`, opacity: seal, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: w * 0.05, color: '#FFD9D2'}}>9001</div>}
  </div>
);
const Intro: React.FC = () => {
  const t = useT();
  const seal = prog(t, 5.5, 5.9, easeIn);
  const ring = (t - 5.9) / 0.9;
  const zoom = prog(t, 14.4, 16.6, easeInOut);
  return (
    <Out end={22.8}>
      {t < 10.3 && (
        <>
          <HiLine words={['Un', 'simple', 'certificat', '?']} mark={[2]} at={2.8} y={330} size={66} />
          <Abs x={140} y={520} w={800} style={{transform: `rotate(${-3 + Math.sin(t) * 1}deg) scale(${Math.max(0, Math.min(1, spring(t, 3.0, 8, 12)))})`}}><Certif w={800} seal={seal} /></Abs>
          {ring > 0 && ring < 1 && <div style={{position: 'absolute', left: 780 - ring * 400, top: 950 - ring * 400, width: ring * 800, height: ring * 800, borderRadius: '50%', border: `${lerp(20, 2, ring)}px solid ${BURG}`, opacity: 0.5 * (1 - ring)}} />}
          <Abs x={0} y={1150} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={6.5} c={BLUE} size={30}>norme internationale</Pill><Pill at={7.9} c={INK} size={30}>management de la qualité</Pill></Abs>
        </>
      )}
      {t >= 10.3 && t < 17.0 && (
        <>
          <HiLine words={['Des', 'milliers', 'de', 'certificats']} mark={[1]} at={10.5} y={330} size={62} />
          <AbsoluteFill style={{transform: `scale(${1 - zoom * 0.65})`, transformOrigin: '540px 840px', opacity: 1 - prog(t, 16.0, 16.9)}}>
            {Array.from({length: 10 * 9}, (_, k) => {
              const c = k % 10, r = Math.floor(k / 10);
              const d = Math.hypot(c - 4.5, r - 4) * 0.12;
              const p = Math.max(0, Math.min(1, spring(t, 10.8 + d, 9, 12)));
              return <div key={k} style={{position: 'absolute', left: 40 + c * 102, top: 450 + r * 84, transform: `scale(${p * 0.9})`, opacity: t >= 10.8 + d ? 1 : 0}}><Certif w={100} seal={1} /></div>;
            })}
          </AbsoluteFill>
          <Abs x={0} y={1240} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 60, color: ORANGE, opacity: pop(t, 14.6)}}>l’histoire de toute une région</Abs>
        </>
      )}
      {t >= 16.6 && (
        <>
          <HiLine words={['L’Afrique', 'de', 'l’Ouest']} mark={[0, 1, 2]} at={19.4} y={330} size={66} />
          <BubbleMap x={90} y={460} at={16.8} grow={0} labels={false} />
          <Abs x={0} y={1140} w={1080}><Board text="DONNEES" at={19.6} h={76} c={NAVY} stag={0.04} /></Abs>
        </>
      )}
    </Out>
  );
};
const Plan: React.FC = () => {
  return (
    <Out end={38.0}>
      <HiLine words={['Comment', 'on', 'procède']} mark={[2]} at={22.9} y={330} size={66} />
      {[{l: 'La situation d’ensemble', ic: 'globe', a: 24.8, c: BLUE}, {l: 'Une division surprenante', ic: 'chaine-cassee', a: 27.9, c: RED}, {l: 'Le pourquoi des écarts', ic: 'loupe', a: 30.5, c: ORANGE}, {l: 'Le potentiel de demain', ic: 'fusee', a: 34.2, c: GREEN}].map((x, k) => (
        <Brut key={k} x={70 + (k % 2) * 480} y={460 + Math.floor(k / 2) * 290} w={460} h={260} at={x.a} sh={x.c} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, textAlign: 'center'}}>
          <F n={x.ic} size={110} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, lineHeight: 1.1}}>{x.l}</div>
        </Brut>
      ))}
    </Out>
  );
};

/** Barre de recherche qui tape une requête, déroule des résultats et trouve la réponse. */
const SearchBar: React.FC<{x: number; y: number; w: number; at: number; query: string; results: string[]; found: number; foundAt: number; close: number}> = ({x, y, w, at, query, results, found, foundAt, close}) => {
  const t = useT();
  const typed = Math.floor(prog(t, at + 0.3, at + 0.3 + query.length * 0.045) * query.length);
  const drop = prog(t, at + 0.4 + query.length * 0.045, at + 0.8 + query.length * 0.045, easeOut) * (1 - prog(t, close, close + 0.4, easeIn));
  const hit = prog(t, foundAt, foundAt + 0.3, easeOut);
  const scan = (t * 3) % results.length;
  return (
    <Abs x={x} y={y} w={w} style={{opacity: pop(t, at) * (1 - prog(t, close + 0.2, close + 0.6)), transform: `translateY(${(1 - pop(t, at)) * 30}px) scale(${1 - prog(t, close, close + 0.6) * 0.1})`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 18, height: 104, background: '#fff', border: `5px solid ${INK}`, borderRadius: 52, boxShadow: `8px 8px 0 ${BLUE}`, padding: '0 30px'}}>
        <F n="loupe" size={62} />
        <div style={{flex: 1, fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: INK, whiteSpace: 'nowrap', overflow: 'hidden'}}>{query.slice(0, typed)}<span style={{opacity: Math.sin(t * 12) > 0 ? 1 : 0, color: BLUE}}>|</span></div>
        <div style={{width: 64, height: 64, borderRadius: 32, background: BLUE, color: '#fff', fontWeight: 900, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + 0.2 * Math.max(0, 1 - Math.abs(t - (at + 0.35 + query.length * 0.045)) * 6)})`}}>↵</div>
      </div>
      <div style={{margin: '12px 30px 0', background: '#fff', border: `4px solid ${INK}`, borderRadius: 22, overflow: 'hidden', height: drop * (results.length * 84 + 10), boxShadow: '0 20px 40px rgba(20,33,61,0.15)'}}>
        {results.map((r, k) => {
          const isF = k === found && hit > 0;
          const scanning = hit === 0 && Math.floor(scan) === k;
          return (
            <div key={k} style={{display: 'flex', alignItems: 'center', gap: 14, height: 84, padding: '0 24px', borderBottom: '2px solid #EEF1F5', background: isF ? `${GREEN}22` : scanning ? '#F2F6FC' : '#fff', opacity: pop(t, at + 0.9 + query.length * 0.045 + k * 0.12)}}>
              <div style={{width: 14, height: 14, borderRadius: 7, background: isF ? GREEN : '#C9D2DF'}} />
              <div style={{flex: 1, fontFamily: sansFont, fontWeight: isF ? 900 : 700, fontSize: 28, color: isF ? INK : DIM}}>{r}</div>
              {isF && <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#fff', background: GREEN, padding: '4px 12px', borderRadius: 6, transform: `scale(${hit})`}}>TROUVÉ ✓</div>}
            </div>
          );
        })}
      </div>
    </Abs>
  );
};

/* ═════════════ PARTIE 1 : compteur à rouleaux ═════════════ */
const Roll: React.FC<{d: number; at: number; dur: number; h: number}> = ({d, at, dur, h}) => {
  const t = useT();
  const p = prog(t, at, at + dur, easeOut);
  const v = p * (20 + d);
  return (
    <div style={{position: 'relative', width: h * 0.68, height: h, overflow: 'hidden', background: NIGHT, borderRadius: 16, border: `6px solid ${INK}`, boxShadow: 'inset 0 20px 30px rgba(0,0,0,0.6), inset 0 -20px 30px rgba(0,0,0,0.6)'}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: -(v % 10) * h - (Math.floor(v) % 10 === 0 ? 0 : 0), transform: `translateY(${-Math.floor(v / 10) * 0}px)`}}>
        {Array.from({length: 11}, (_, k) => <div key={k} style={{height: h, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: h * 0.72, color: '#fff'}}>{k % 10}</div>)}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: '50%', height: 3, background: 'rgba(0,0,0,0.35)'}} />
    </div>
  );
};
const Chiffre: React.FC = () => {
  const t = useT();
  const piece = Math.max(0, Math.min(1, spring(t, 58.0, 8, 11)));
  return (
    <Out end={63.5}>
      <HiLine words={['Le', 'chiffre', 'clé', 'de', '2023']} mark={[2]} at={41.6} y={330} size={66} />
      <SearchBar x={60} y={450} w={960} at={42.2} query="entreprises certifiées ISO 9001 · Afrique de l’Ouest · 2023" results={['Nombre de normes ISO publiées', 'Liste des organismes certificateurs', 'Total des entreprises certifiées : 1947', 'Répartition par pays']} found={2} foundAt={46.6} close={47.6} />
      <Abs x={0} y={600} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16, opacity: prog(t, 47.7, 48.0), transform: `scale(${1 + 0.06 * Math.max(0, 1 - Math.abs(t - 49.0) * 3)})`}}>
        {[1, 9, 4, 7].map((d, k) => <Roll key={k} d={d} at={47.7 + k * 0.1} dur={1.1 + k * 0.12} h={250} />)}
      </Abs>
      {t > 49.0 && t < 49.9 && <div style={{position: 'absolute', left: 540 - (t - 49.0) * 900, top: 725 - (t - 49.0) * 900, width: (t - 49.0) * 1800, height: (t - 49.0) * 1800, borderRadius: '50%', border: `14px solid ${GOLD}`, opacity: 0.6 * (1 - (t - 49.0) / 0.9)}} />}
      <Abs x={0} y={890} w={1080} style={{textAlign: 'center'}}><Mono at={49.9} c={BLUE} size={28}>entreprises certifiées iso 9001</Mono></Abs>
      <Cite y={945} at={50.2} text="« 1947 » en 2023 : chiffre cité par la vidéo d’origine" />
      <Abs x={0} y={1000} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={54.0} c={DIM} size={28}>« OK, c’est un chiffre »</Pill><Pill at={56.8} c={GREEN} size={28}>notre point de départ</Pill></Abs>
      <Abs x={330} y={1090} w={420} h={300} style={{opacity: pop(t, 57.9)}}>
        {Array.from({length: 6}, (_, k) => <div key={k} style={{position: 'absolute', left: (k % 3) * 140, top: Math.floor(k / 3) * 140, width: 132, height: 132, borderRadius: 14, border: `4px dashed ${DIM}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: '#C9D2DF'}}>?</div>)}
        <div style={{position: 'absolute', left: lerp(600, 0, piece), top: lerp(-300, 0, piece), transform: `rotate(${(1 - piece) * 200}deg)`}}><div style={{width: 132, height: 132, borderRadius: 14, background: BLUE, border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="puzzle" size={90} /></div></div>
      </Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 2 : répartition, couronne, locomotive ═════════════ */
const Repartition: React.FC = () => {
  const t = useT();
  return (
    <Out end={75.5}>
      <HiLine words={['Bien', 'distribué', '?']} mark={[1]} at={67.0} y={330} size={66} />
      <BubbleMap x={90} y={450} at={67.0} grow={prog(t, 68.4, 70.4, easeOut)} />
      <Stamp at={73.4} c={RED} text="non !" x={360} y={1120} rot={-6} size={80} />
    </Out>
  );
};
const Couronne: React.FC = () => {
  const t = useT();
  const d = prog(t, 78.6, 80.6, easeOut);
  const crown = Math.max(0, Math.min(1, spring(t, 80.3, 8, 10)));
  const loco = prog(t, 91.6, 93.6, easeOut);
  return (
    <Out end={97.9}>
      <HiLine words={['Une', 'domination', 'écrasante']} mark={[1]} at={76.0} y={330} size={64} />
      <Abs x={110} y={460} w={460} h={460}>
        <svg width={460} height={460}><circle cx={230} cy={230} r={170} fill="none" stroke="#C7D9F5" strokeWidth={70} /><circle cx={230} cy={230} r={170} fill="none" stroke={VIO} strokeWidth={70} strokeDasharray={1068} strokeDashoffset={1068 * (1 - 0.52 * d)} transform="rotate(-90 230 230)" /></svg>
        <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 110, color: VIO}}><Count n={52} a={78.6} b={80.6} suf="%" /></div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>NIGERIA</div></div>
        <div style={{position: 'absolute', left: 170, top: -60 + (1 - crown) * -300, opacity: t > 80.3 ? 1 : 0}}><F n="couronne" size={120} /></div>
      </Abs>
      <Abs x={600} y={500} w={420} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, opacity: pop(t, 79.0)}}><div style={{width: 36, height: 36, borderRadius: 8, background: VIO}} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>Nigeria · 52 %</span></div>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, opacity: pop(t, 80.0)}}><div style={{width: 36, height: 36, borderRadius: 8, background: '#C7D9F5'}} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK}}>reste de la région · 48 %</span></div>
        <div style={{marginTop: 10}}><Pill at={81.7} c={VIO} size={30}>plus de la moitié</Pill></div>
      </Abs>
      <Stamp at={85.8} c={VIO} text="sans appel" x={560} y={810} rot={-6} size={46} />
      <Cite y={950} at={84.0} text="52 % / 48 % : répartition citée par la vidéo d’origine" />
      <Abs x={0} y={1010} w={1080} h={240} style={{overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 200, height: 14, background: `repeating-linear-gradient(90deg, ${INK} 0 40px, transparent 40px 60px)`}} />
        <div style={{position: 'absolute', left: lerp(-500, 330, loco), top: 30}}><Loco label="NIGERIA" /></div>
        <div style={{position: 'absolute', right: 30, top: 0, opacity: pop(t, 93.3)}}><Mono at={93.3} c={VIO} size={22}>la locomotive</Mono></div>
      </Abs>
    </Out>
  );
};
const Loco: React.FC<{label: string}> = ({label}) => {
  const t = useT();
  return (
    <div style={{position: 'relative', width: 380, height: 180}}>
      <div style={{position: 'absolute', left: 40, top: 40, width: 300, height: 110, background: VIO, border: `6px solid ${INK}`, borderRadius: '16px 40px 10px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 30, color: '#fff', letterSpacing: 2}}>{label}</div>
      <div style={{position: 'absolute', left: 230, top: 0, width: 50, height: 50, background: INK, borderRadius: 6}} />
      <div style={{position: 'absolute', left: 60, top: -10, width: 90, height: 60, background: '#4A5468', border: `5px solid ${INK}`, borderRadius: 8}} />
      {[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 230 + k * 30 - (t * 120) % 90, top: -40 - k * 30, width: 40 + k * 14, height: 40 + k * 14, borderRadius: '50%', background: '#E3E8EF', opacity: 0.8 - k * 0.2}} />)}
      {[70, 170, 270].map((x) => <div key={x} style={{position: 'absolute', left: x, top: 130, width: 54, height: 54, borderRadius: 27, background: INK, border: '6px solid #fff', transform: `rotate(${t * 400}deg)`}}><div style={{position: 'absolute', left: 19, top: 0, width: 4, height: 42, background: '#fff'}} /></div>)}
    </div>
  );
};
const Wagon: React.FC<{label: string; n: number; c: string}> = ({label, n, c}) => (
  <div style={{position: 'relative', width: 220, height: 180}}>
    <div style={{position: 'absolute', left: 10, top: 50, width: 200, height: 100, background: c, border: `6px solid ${INK}`, borderRadius: 10, textAlign: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900}}><div style={{fontSize: 22, marginTop: 10}}>{label}</div><div style={{fontSize: 34}}>{n}</div></div>
    <div style={{position: 'absolute', left: -20, top: 100, width: 34, height: 10, background: INK}} />
    {[40, 140].map((x) => <div key={x} style={{position: 'absolute', left: x, top: 130, width: 46, height: 46, borderRadius: 23, background: INK, border: '5px solid #fff'}} />)}
  </div>
);
const Peloton: React.FC = () => {
  const t = useT();
  const B = [{l: 'Nigeria', n: 1013, c: VIO, a: 98.2}, {l: 'Côte d’Ivoire', n: 304, c: BLUE, a: 103.3}, {l: 'Ghana', n: 190, c: TEAL, a: 108.4}, {l: 'Burkina Faso', n: 125, c: ORANGE, a: 109.3}];
  const W = [{l: 'CÔTE D’IVOIRE', n: 304, c: BLUE, a: 104.7}, {l: 'GHANA', n: 190, c: TEAL, a: 108.4}, {l: 'BURKINA', n: 125, c: ORANGE, a: 109.3}];
  return (
    <Out end={112.7}>
      <HiLine words={['Le', 'peloton', 'de', 'poursuite']} mark={[1]} at={101.3} y={330} size={64} />
      <Abs x={70} y={440} w={940} h={520} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `9px 9px 0 ${BLUE}`, padding: '30px 30px', boxSizing: 'border-box', opacity: pop(t, 98.2)}}>
        {B.map((b, k) => {
          const p = prog(t, b.a, b.a + 1.4, easeOut);
          return (
            <div key={b.l} style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 26, opacity: pop(t, b.a)}}>
              <div style={{width: 220, fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, textAlign: 'right'}}>{b.l}</div>
              <div style={{width: (b.n / 1013) * 520 * p, height: 64, borderRadius: 10, background: b.c, border: `4px solid ${INK}`}} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: b.c}}><Count n={b.n} a={b.a} b={b.a + 1.4} /></div>
            </div>
          );
        })}
        <div style={{position: 'absolute', left: 30, bottom: 20}}><Mono at={98.4} c={INK} size={18}>certifications iso 9001 · chiffres cités</Mono></div>
      </Abs>
      <Abs x={0} y={1000} w={1080} h={230} style={{overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 196, height: 14, background: `repeating-linear-gradient(90deg, ${INK} 0 40px, transparent 40px 60px)`, transform: `translateX(${-(t * 120) % 60}px)`}} />
        <div style={{position: 'absolute', left: 700, top: 20, transform: 'scale(0.8)', transformOrigin: '0 100%'}}><Loco label="NIGERIA" /></div>
        {W.map((w, k) => {const p = prog(t, w.a, w.a + 0.8, easeOut); return <div key={w.l} style={{position: 'absolute', left: lerp(-300, 500 - k * 190, p), top: 36, transform: 'scale(0.8)', transformOrigin: '0 100%'}}><Wagon label={w.l} n={w.n} c={w.c} /></div>;})}
      </Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 3 : classement et fossé ═════════════ */
const ROWS = [['Nigeria', '1013'], ['Côte d’Ivoire', '304'], ['Ghana', '190'], ['Burkina Faso', '125'], ['Sénégal', '96'], ['…', '…'], ['Sierra Leone', '4'], ['Niger', '2'], ['Gambie', '1']];
const Classement: React.FC = () => {
  const t = useT();
  const scroll = prog(t, 120.4, 123.0, easeInOut);
  const crack = prog(t, 133.3, 135.2, easeInOut);
  const phase2 = t >= 125.4;
  return (
    <Out end={137.1}>
      <HiLine words={phase2 ? ['Le', 'grand', 'écart'] : ['Le', 'tableau', 'complet']} mark={[phase2 ? 2 : 1]} at={phase2 ? 125.5 : 116.2} y={330} size={66} />
      {!phase2 && (
        <Win x={140} y={450} w={800} h={700} at={116.3} title="certifications_iso9001_2023" c={RED}>
          <div style={{position: 'absolute', left: 0, right: 0, top: -scroll * 470}}>
            {ROWS.map(([l, n], k) => {
              const top = k === 0, bot = k >= 6;
              return (
                <div key={l + k} style={{display: 'flex', alignItems: 'center', height: 116, padding: '0 40px', borderBottom: '2px solid #EEF1F5', background: top && scroll < 0.3 ? `${VIO}18` : bot && scroll > 0.7 ? `${RED}14` : '#fff', opacity: pop(t, 116.6 + k * 0.08)}}>
                  <div style={{flex: 1, fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>{l}</div>
                  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: top ? VIO : bot ? RED : BLUE}}>{n}</div>
                </div>
              );
            })}
          </div>
        </Win>
      )}
      {!phase2 && <Cite y={1170} at={116.6} text="valeurs reprises du tableau de la vidéo d’origine" />}
      {phase2 && (
        <Abs x={0} y={440} w={1080} h={820}>
          <div style={{position: 'absolute', left: 0, top: 560, width: 540 - crack * 120, height: 260, background: `linear-gradient(180deg, #C9A26A, #8C6A3E)`, clipPath: `polygon(0 0, 100% 0, ${100 - crack * 8}% 30%, 100% 55%, ${100 - crack * 10}% 80%, 100% 100%, 0 100%)`}} />
          <div style={{position: 'absolute', right: 0, top: 560, width: 540 - crack * 120, height: 260, background: `linear-gradient(180deg, #C9A26A, #8C6A3E)`, clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%, ${crack * 10}% 80%, 0 55%, ${crack * 8}% 30%)`}} />
          <div style={{position: 'absolute', left: 120, top: 560 - 420 * prog(t, 126.0, 127.2, easeOut), width: 240, height: 420 * prog(t, 126.0, 127.2, easeOut), background: VIO, border: `6px solid ${INK}`, borderRadius: '14px 14px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 60, paddingTop: 20, boxSizing: 'border-box', overflow: 'hidden'}}>1013</div>
          <div style={{position: 'absolute', left: 120, top: 600, width: 240, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>Nigeria</div>
          <div style={{position: 'absolute', right: 160, top: 540, width: 160, height: 20, background: RED, border: `5px solid ${INK}`, opacity: pop(t, 127.6)}} />
          <div style={{position: 'absolute', right: 120, top: 460, width: 240, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: RED, opacity: pop(t, 127.6)}}>1</div>
          <div style={{position: 'absolute', right: 120, top: 600, width: 240, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff', opacity: pop(t, 127.6)}}>Gambie</div>
          <div style={{position: 'absolute', left: 380, top: 0, width: 320, textAlign: 'center', opacity: pop(t, 130.2)}}><F n="main-levee" size={160} style={{margin: '0 auto'}} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK}}>sur les doigts d’une main</div></div>
          {crack > 0 && <div style={{position: 'absolute', left: 540 - crack * 120, top: 560, width: crack * 240, height: 260, background: 'linear-gradient(180deg, #2A1B10, #000)'}} />}
          {crack > 0.6 && <Stamp at={134.5} c={RED} text="le fossé" x={390} y={380} rot={-5} size={60} />}
        </Abs>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 4 : le pourquoi, engrenages ═════════════ */
const Gear: React.FC<{size: number; c: string; rot: number; teeth?: number}> = ({size, c, rot, teeth = 10}) => (
  <svg width={size} height={size} viewBox="-50 -50 100 100" style={{transform: `rotate(${rot}deg)`}}>
    {Array.from({length: teeth}, (_, k) => <rect key={k} x={-7} y={-50} width={14} height={18} rx={3} fill={c} stroke={INK} strokeWidth={3} transform={`rotate(${(k * 360) / teeth})`} />)}
    <circle r={36} fill={c} stroke={INK} strokeWidth={4} /><circle r={12} fill="#fff" stroke={INK} strokeWidth={4} />
  </svg>
);
const Pourquoi: React.FC = () => {
  const t = useT();
  const F3 = [{l: 'maturité des entreprises', ic: 'engrenage', a: 155.1, c: BLUE}, {l: 'soutien des institutions', ic: 'batiment', a: 157.1, c: VIO}, {l: 'accès à la certification', ic: 'cle', a: 158.8, c: ORANGE}];
  return (
    <Out end={163.7}>
      <HiLine words={t < 147.4 ? ['Le', 'quoi', '→', 'le', 'pourquoi'] : ['Trois', 'facteurs']} mark={[t < 147.4 ? 4 : 1]} at={t < 147.4 ? 140.6 : 152.8} y={330} size={66} />
      {t < 152.6 && (
        <Deep src="induction/operatrice.jpg" x={110} y={460} w={860} h={640} at={147.6} pos="50% 30%">
          <div style={{position: 'absolute', left: 18, top: 18}}><Mono at={149.2} c={ORANGE} size={22}>réalités économiques et structurelles</Mono></div>
        </Deep>
      )}
      {t < 147.4 && <Abs x={0} y={560} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-block', position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: DIM, opacity: pop(t, 141.0)}}>le quoi<Strike p={prog(t, 141.9, 142.4)} c={RED} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 110, color: ORANGE, marginTop: 30, transform: `scale(${Math.max(0, Math.min(1, spring(t, 141.9, 8, 10)))})`}}>pourquoi ?</div></Abs>}
      {t >= 152.6 && (
        <Abs x={70} y={460} w={940} style={{display: 'flex', flexDirection: 'column', gap: 22}}>
          {F3.map((f, k) => (
            <Brut key={f.l} x={0} y={0} w={940} h={190} at={f.a} sh={f.c} style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 26}}>
              <Tile ch={String(k + 1)} size={90} c={f.c} /><F n={f.ic} size={110} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>{f.l}</div>
            </Brut>
          ))}
        </Abs>
      )}
    </Out>
  );
};
const Engrenages: React.FC = () => {
  const t = useT();
  const jam = t > 176.4 ? Math.sin(t * 40) * 4 : 0;
  const crack = prog(t, 180.6, 181.4);
  return (
    <Out end={182.0}>
      <HiLine words={['Une', 'fracture']} mark={[1]} at={164.0} y={330} size={70} />
      <Abs x={60} y={450} w={460} h={720} style={{background: '#F1FBF5', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `9px 9px 0 ${GREEN}`, overflow: 'hidden', opacity: pop(t, 166.8)}}>
        <div style={{position: 'absolute', left: 18, top: 16}}><Mono at={167.2} c={GREEN} size={20}>pays leaders</Mono></div>
        <div style={{position: 'absolute', left: 40, top: 80}}><Gear size={220} c="#8FD4AE" rot={t * 60} /></div>
        <div style={{position: 'absolute', left: 220, top: 210}}><Gear size={180} c="#6FC39A" rot={-t * 73 + 18} /></div>
        <div style={{position: 'absolute', left: 90, top: 330}}><Gear size={160} c="#A9E0C3" rot={-t * 82} teeth={9} /></div>
        <div style={{position: 'absolute', left: 30, bottom: 30, display: 'flex', flexDirection: 'column', gap: 8}}><Mono at={170.0} c={INK} size={18}>✓ mieux structurées</Mono><Mono at={171.7} c={INK} size={18}>✓ fort soutien</Mono><Mono at={173.3} c={INK} size={18}>✓ accès facile</Mono></div>
        <div style={{position: 'absolute', right: 20, top: 60, opacity: pop(t, 168.2)}}><F n="repeter" size={90} style={{transform: `rotate(${t * 90}deg)`}} /></div>
      </Abs>
      <Abs x={560} y={450} w={460} h={720} style={{background: '#F6F1F1', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `9px 9px 0 ${RED}`, overflow: 'hidden', opacity: pop(t, 175.3), filter: 'grayscale(0.7)'}}>
        <div style={{position: 'absolute', left: 18, top: 16}}><Mono at={176.5} c={RED} size={20}>pays en retrait</Mono></div>
        <div style={{position: 'absolute', left: 40, top: 80, transform: `rotate(${jam}deg)`}}><Gear size={220} c="#C9B9B9" rot={12} /></div>
        <div style={{position: 'absolute', left: 230, top: 230, transform: `rotate(${-jam}deg)`}}><Gear size={180} c="#BBAAAA" rot={0} /></div>
        <div style={{position: 'absolute', left: 90, top: 360, transform: `rotate(${jam}deg)`}}><Gear size={160} c="#D3C6C6" rot={5} teeth={9} /></div>
        <div style={{position: 'absolute', left: 30, bottom: 30, display: 'flex', flexDirection: 'column', gap: 8}}><Mono at={178.7} c={RED} size={18}>✗ des défis sur les 3 points</Mono></div>
      </Abs>
      {crack > 0 && <svg width={120} height={760} style={{position: 'absolute', left: 480, top: 430}}><path d="M60 0 L30 120 L80 240 L20 380 L90 520 L40 640 L60 760" fill="none" stroke={RED} strokeWidth={10} strokeDasharray={900} strokeDashoffset={900 * (1 - crack)} /></svg>}
    </Out>
  );
};

/* ═════════════ PARTIE 5 : carte qui se retourne, fusée ═════════════ */
const Retourne: React.FC = () => {
  const t = useT();
  const flip = prog(t, 188.6, 189.9, easeInOut);
  const quote = t >= 192.5;
  return (
    <Out end={204.0}>
      <HiLine words={quote ? ['Cette', 'citation', 'résume', 'tout'] : ['Changer', 'de', 'perspective']} mark={[quote ? 1 : 2]} at={quote ? 192.7 : 185.5} y={330} size={62} />
      {!quote && (
        <AbsoluteFill style={{perspective: 1600}}>
          <div style={{position: 'absolute', left: 140, top: 480, width: 800, height: 560, transformStyle: 'preserve-3d', transform: `rotateY(${flip * 180}deg)`, opacity: pop(t, 185.6)}}>
            <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', background: '#fff', border: `7px solid ${INK}`, borderRadius: 30, boxShadow: `12px 12px 0 ${RED}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><F n="chaine-cassee" size={180} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: RED}}>un écart</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: DIM}}>pas une fatalité</div></div>
            <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: '#F1FBF5', border: `7px solid ${INK}`, borderRadius: 30, boxShadow: `12px 12px 0 ${GREEN}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><F n="ampoule" size={180} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 74, color: GREEN}}>une opportunité</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: GREEN}}>énorme</div></div>
          </div>
          {flip > 0.95 && <Dust n={16} c={GREEN} />}
        </AbsoluteFill>
      )}
      {quote && (
        <>
          <Abs x={70} y={450} w={940} h={560} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 28, boxShadow: `10px 10px 0 ${GREEN}`, padding: '70px 50px', boxSizing: 'border-box', opacity: pop(t, 192.8)}}>
            <div style={{position: 'absolute', left: 30, top: -30, fontFamily: 'Georgia, serif', fontSize: 200, color: YEL, lineHeight: 1}}>“</div>
            <Kin text="Une faible pénétration de l’ISO 9001 révèle un potentiel important de développement." at={194.6} size={54} stagger={0.018} />
          </Abs>
          <Abs x={0} y={1040} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16, alignItems: 'center'}}>
            <div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: DIM, opacity: pop(t, 196.0)}}>une faiblesse<Strike p={prog(t, 197.2, 197.7)} c={RED} /></div>
            <Pill at={201.7} c={GREEN} size={32}>la marge de progression</Pill>
          </Abs>
          <Cite y={1140} at={193.0} text="citation reprise de la vidéo d’origine" />
        </>
      )}
    </Out>
  );
};
const Fusee: React.FC = () => {
  const t = useT();
  const launch = prog(t, 218.3, 220.4, easeIn);
  const steps = [{l: 'croissance', a: 215.2, c: BLUE}, {l: 'compétitivité', a: 216.2, c: VIO}, {l: 'nouveaux marchés', a: 218.1, c: GREEN}];
  const shake = launch > 0 && launch < 0.4 ? Math.sin(t * 70) * 6 : 0;
  return (
    <Out end={220.7}>
      <HiLine words={['Une', 'ligne', 'de', 'départ']} mark={[1, 2, 3]} at={206.2} y={330} size={64} />
      <AbsoluteFill style={{transform: `translate(${shake}px, 0)`}}>
        <Abs x={60} y={1150} w={960} h={10} style={{background: `repeating-linear-gradient(90deg, ${INK} 0 30px, #fff 30px 60px)`, border: `3px solid ${INK}`, opacity: pop(t, 209.4)}} />
        <Abs x={60} y={1170} w={300} style={{opacity: pop(t, 209.4)}}><Mono at={209.4} c={INK} size={20}>ligne de départ</Mono></Abs>
        {steps.map((s0, k) => {const p = Math.max(0, Math.min(1, spring(t, s0.a, 9, 11))); return (
          <div key={s0.l} style={{position: 'absolute', left: 160 + k * 240, top: 1150 - (k + 1) * 160 * p, width: 240, height: (k + 1) * 160 * p, background: s0.c, border: `5px solid ${INK}`, borderBottom: 'none', boxSizing: 'border-box', overflow: 'hidden', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 14, fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: '#fff', textAlign: 'center'}}>{s0.l}</div>
        );})}
        {Array.from({length: 4}, (_, k) => <div key={k} style={{position: 'absolute', left: 100 + k * 150, top: 1100 - k * 40, opacity: pop(t, 212.3 + k * 0.5), transform: `rotate(${-20}deg)`}}><F n="pas" size={60} /></div>)}
        <div style={{position: 'absolute', left: 650, top: lerp(450, -900, launch * launch), transform: `rotate(-45deg) scale(${pop(t, 218.0)})`}}><F n="fusee" size={220} /></div>
        {launch > 0 && Array.from({length: 14}, (_, k) => {const q = ((t - 218.3) * 1.8 + k / 14) % 1; return <div key={k} style={{position: 'absolute', left: 730 + (random(`sm${k}`) - 0.5) * 200 * q, top: lerp(450, -900, launch * launch) + 200 + q * 300, width: 60 + q * 80, height: 60 + q * 80, borderRadius: '50%', background: k % 3 ? '#E3E8EF' : ORANGE, opacity: (1 - q) * 0.8}} />;})}
      </AbsoluteFill>
      <Abs x={0} y={440} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={207.9} c={RED} size={30}>pas une condamnation</Pill></Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 6 : la carte s'allume ═════════════ */
const Final: React.FC = () => {
  const t = useT();
  const lit = prog(t, 231.1, 234.6, easeInOut);
  const spot = lerp(-200, 1300, lit);
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={['Que', 'faudra-t-il', 'faire', '?']} mark={[1, 2]} at={228.6} y={330} size={64} />
      <Abs x={0} y={430} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={224.2} c={RED} size={30}>une histoire de division</Pill><Pill at={226.9} c={GREEN} size={30}>un potentiel incroyable</Pill></Abs>
      <BubbleMap x={90} y={530} at={224.2} grow={1} lit={lit} />
      {lit > 0 && lit < 1 && <div style={{position: 'absolute', left: spot - 250, top: 500, width: 500, height: 700, background: 'radial-gradient(closest-side, rgba(255,240,170,0.6), transparent)', pointerEvents: 'none'}} />}
      <Abs x={0} y={1200} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 60, color: GREEN, opacity: pop(t, 233.3)}}>pour tous les pays de la région</Abs>
      {t > 233.5 && <Dust n={22} c={GOLD} />}
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
  {at: 3.0, s: 'page', v: 0.4}, {at: 5.5, s: 'sfx/swish', v: 0.3}, {at: 5.9, s: 'tampon', v: 0.6}, {at: 5.92, s: 'deep-hit', v: 0.35}, {at: 6.5, s: 'sfx/pop', v: 0.2}, {at: 7.9, s: 'sfx/pop', v: 0.2},
  ...rep(10.8, 16, 0.05, 'sfx/pop', 0.09), {at: 14.4, s: 'riser', v: 0.25, dur: 2}, {at: 16.8, s: 'soft-whoosh', v: 0.35}, ...flaps(19.6, 12),
  ...[24.8, 27.9, 30.5, 34.2].map((a) => ({at: a, s: 'sfx/thud', v: 0.28})),
  ...rep(42.5, 46, 0.045, 'sfx/click', 0.12), {at: 44.6, s: 'sfx/pop', v: 0.25}, ...rep(45.2, 4, 0.12, 'sfx/pop', 0.1), {at: 46.6, s: 'validation', v: 0.35}, {at: 47.6, s: 'sfx/whoosh', v: 0.35}, {at: 47.7, s: 'riser', v: 0.3, dur: 1.4}, ...rep(47.7, 18, 0.07, 'tick', 0.2), {at: 49.0, s: 'bass-hit', v: 0.5}, {at: 49.02, s: 'deep-hit', v: 0.35}, {at: 54.0, s: 'sfx/pop', v: 0.2}, {at: 56.8, s: 'sfx/pop', v: 0.22}, {at: 58.0, s: 'sfx/swish', v: 0.35}, {at: 58.6, s: 'sfx/thud', v: 0.4},
  ...rep(68.4, 10, 0.18, 'sfx/pop', 0.12), {at: 73.4, s: 'tampon', v: 0.6},
  ...rep(78.6, 12, 0.16, 'tick', 0.15), {at: 80.3, s: 'sfx/whoosh', v: 0.3}, {at: 80.8, s: 'sfx/thud', v: 0.45}, {at: 81.7, s: 'sfx/pop', v: 0.22}, {at: 85.8, s: 'tampon', v: 0.5}, {at: 91.6, s: 'soft-whoosh', v: 0.4, dur: 2},
  ...[98.2, 103.3, 108.4, 109.3].map((a) => ({at: a, s: 'sfx/rise', v: 0.2})), ...[104.7, 108.4, 109.3].map((a) => ({at: a + 0.8, s: 'cadenas', v: 0.3})),
  {at: 116.3, s: 'sfx/whoosh', v: 0.25}, {at: 120.4, s: 'soft-whoosh', v: 0.35, dur: 2.5}, {at: 126.0, s: 'sfx/rise', v: 0.3}, {at: 127.6, s: 'sfx/pop', v: 0.25}, {at: 130.2, s: 'sfx/pop', v: 0.22}, {at: 133.3, s: 'tension', v: 0.3, dur: 2}, {at: 134.4, s: 'deep-hit', v: 0.5}, {at: 134.5, s: 'tampon', v: 0.45},
  {at: 141.9, s: 'stylo', v: 0.35}, {at: 142.0, s: 'bass-hit', v: 0.35}, {at: 147.6, s: 'soft-whoosh', v: 0.3}, ...[155.1, 157.1, 158.8].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})),
  {at: 166.8, s: 'sfx/whoosh', v: 0.25}, ...rep(167.2, 20, 0.3, 'tick', 0.1), ...[170.0, 171.7, 173.3].map((a) => ({at: a, s: 'sfx/ding', v: 0.18})), {at: 175.3, s: 'sfx/whoosh', v: 0.25}, {at: 176.4, s: 'alarme', v: 0.06, dur: 1.5}, {at: 180.6, s: 'deep-hit', v: 0.45},
  {at: 185.6, s: 'sfx/whoosh', v: 0.25}, {at: 188.6, s: 'sfx/swish', v: 0.45}, {at: 189.9, s: 'bass-hit', v: 0.4}, {at: 190.0, s: 'validation', v: 0.3}, {at: 192.8, s: 'soft-whoosh', v: 0.3}, {at: 197.2, s: 'stylo', v: 0.35}, {at: 201.7, s: 'sfx/pop', v: 0.22},
  {at: 207.9, s: 'sfx/pop', v: 0.2}, {at: 209.4, s: 'sfx/thud', v: 0.3}, ...rep(212.3, 4, 0.5, 'sfx/click', 0.2), ...[215.2, 216.2, 218.1].map((a) => ({at: a, s: 'sfx/thud', v: 0.35})), {at: 217.6, s: 'riser', v: 0.35, dur: 1}, {at: 218.3, s: 'deep-hit', v: 0.5}, {at: 218.35, s: 'soft-whoosh', v: 0.6, dur: 2},
  {at: 224.2, s: 'sfx/pop', v: 0.2}, {at: 226.9, s: 'sfx/pop', v: 0.22}, {at: 231.1, s: 'riser', v: 0.3, dur: 3}, ...rep(231.3, 15, 0.22, 'sfx/ding', 0.08), {at: 234.6, s: 'validation', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const IsoAfrique: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={22.9}><Intro /></Gate>
    <Gate from={22.8} to={38.1}><Plan /></Gate>
    <Gate from={41.3} to={63.6}><Chiffre /></Gate>
    <Gate from={66.8} to={75.6}><Repartition /></Gate>
    <Gate from={75.5} to={98.0}><Couronne /></Gate>
    <Gate from={97.9} to={112.8}><Peloton /></Gate>
    <Gate from={116.0} to={137.2}><Classement /></Gate>
    <Gate from={140.4} to={163.8}><Pourquoi /></Gate>
    <Gate from={163.7} to={182.1}><Engrenages /></Gate>
    <Gate from={185.3} to={204.1}><Retourne /></Gate>
    <Gate from={204.0} to={220.8}><Fusee /></Gate>
    <Gate from={224.0} to={OUTRO_AT}><Final /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}>{x.k === 'tube' ? <Pneumatique i={i} /> : x.k === 'gyro' ? <Gyro i={i} /> : x.k === 'loupe' ? <Loupe i={i} /> : <Store i={i} />}</Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={235.5}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-iso9001-afrique-origine.m4a')} trimAfter={s(235.6)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Blinds, Check, GLASS, Win, NIGHT];
