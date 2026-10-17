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
 * « Le rôle des normes ISO » (2 min 35) — capsule « condensé + effet wahou » : voix d'origine, sous-titres recalés
 * mot à mot, photos réelles, thème « papier quadrillé ».
 * Fil rouge : LE TUBE PNEUMATIQUE À SIX GUICHETS (qualité → sécurité → société → données → labo → bilan), adaptés aux
 * neuf normes réellement présentées ; la capsule du dossier file d'un guichet à l'autre et chaque guichet passé se coche.
 * Transition : LE GYROPHARE à chaque partie.
 * Condensé de la série : texte cinétique, mot surligné jaune, tuiles de bois, palettes d'affichage, fenêtres
 * d'interface, store vénitien sur photo, photos en profondeur, cartes à ombre dure, étiquettes monospace, tampons,
 * mots barrés, cases cochées, poussière.
 * Effets « wahou » nouveaux : mur de neuf normes qui se retournent, roue PDCA qui tourne, révélation circulaire
 * fumée → planète, dôme qui fait rebondir les chutes d'objets, convoyeur de la chaîne alimentaire scanné à la loupe,
 * temple de la responsabilité sociétale qui se construit, barres de recherche qui trouvent puis OUVRENT l'élément
 * (ISO 26000 certifiable ?, dispositifs médicaux), jauge d'énergie et ampoules qui s'éteignent, pluie de code
 * verrouillée par un cadenas, triangle confidentialité / intégrité / disponibilité, électrocardiogramme, cible de
 * précision des laboratoires, orbite des neuf normes autour d'un objectif commun.
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
const OUTRO_AT = 155.2;
export const NORMESISO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 12.4, n: '1', title: 'Qualité et environnement', s: 'ISO 9001 · ISO 14001', c: BLUE, g: 'qualité', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 36.7, n: '2', title: 'Santé, sécurité, aliments', s: 'ISO 45001 · ISO 22000', c: RED, g: 'sécurité', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 67.1, n: '3', title: 'Société et énergie', s: 'ISO 26000 · ISO 50001', c: VIO, g: 'société', k: 'gyro', lab: 'PARTIE 3 / 6'},
  {at: 95.6, n: '4', title: 'Information et santé', s: 'ISO 27001 · ISO 13485', c: TEAL, g: 'données', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 125.8, n: '5', title: 'Les laboratoires', s: 'ISO/IEC 17025', c: ORANGE, g: 'labo', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 142.0, n: '6', title: 'L’objectif commun', s: 'neuf normes, un cap', c: GREEN, g: 'bilan', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 152.3;

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
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('normesiso/sphere-iso.jpg')} style={{position: 'absolute', left: 130, top: 205, width: 820, height: 574, objectFit: 'contain', mixBlendMode: 'multiply', transform: `translateY(${Math.sin(t * 2.4) * 8}px) rotate(${Math.sin(t * 1.6) * 1.5}deg)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={800} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>9 NORMES INCONTOURNABLES</div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 92, color: INK, marginTop: 12}}>le rôle des</div>
        <div style={{marginTop: 6}}><Board text="NORMES" at={-1} h={110} c={BLUE} stag={0.03} /></div>
        <div style={{display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20}}>{'ISO'.split('').map((c, i) => <Tile key={i} ch={c} size={120} c={GREEN} />)}</div>
      </Abs>
      <Abs x={60} y={1400} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 70, width: 140, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

const NINE = [
  {n: '9001', l: 'qualité', ic: 'medaille', c: BLUE},
  {n: '14001', l: 'environnement', ic: 'feuille', c: GREEN},
  {n: '45001', l: 'santé-sécurité', ic: 'casque', c: RED},
  {n: '22000', l: 'aliments', ic: 'assiette', c: ORANGE},
  {n: '26000', l: 'responsabilité', ic: 'equipe', c: VIO},
  {n: '50001', l: 'énergie', ic: 'eclair', c: GOLD},
  {n: '27001', l: 'information', ic: 'cadenas', c: TEAL},
  {n: '13485', l: 'dispositifs médicaux', ic: 'stethoscope', c: BURG},
  {n: '17025', l: 'laboratoires', ic: 'microscope', c: NAVY},
];
const Card: React.FC<{x: number; y: number; w: number; h: number; at: number; c: string; children: React.ReactNode; style?: React.CSSProperties}> = ({x, y, w, h, at, c, children, style}) => {
  const t = useT();
  const p = Math.max(0, Math.min(1, spring(t, at, 8, 13)));
  return <Abs x={x} y={y} w={w} h={h} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${c}`, overflow: 'hidden', opacity: t >= at ? 1 : 0, transform: `translateY(${(1 - p) * 50}px) scale(${0.9 + 0.1 * p})`, ...style}}>{children}</Abs>;
};
const IcoLab: React.FC<{ic: string; l: string; size?: number; fs?: number; c?: string}> = ({ic, l, size = 100, fs = 28, c = INK}) => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 10, textAlign: 'center', padding: '0 10px'}}><F n={ic} size={size} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: fs, color: c, lineHeight: 1.1}}>{l}</div></div>
);

/* ═════════════ INTRO ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const Q = [{ic: 'medaille', l: 'qualité', a: 3.54, c: BLUE}, {ic: 'casque', l: 'travailleurs', a: 4.3, c: RED}, {ic: 'feuille', l: 'environnement', a: 6.06, c: GREEN}, {ic: 'bouclier', l: 'activités', a: 7.3, c: VIO}];
  return (
    <Out end={12.5}>
      <HiLine words={['Connaissez-vous', 'les', 'normes', 'ISO', '?']} mark={[2, 3]} at={2.7} y={330} size={50} />
      {Q.map((q, k) => <Card key={q.l} x={60 + k * 245} y={450} w={225} h={230} at={q.a} c={q.c}><IcoLab ic={q.ic} l={q.l} size={90} fs={q.l.length > 10 ? 22 : 26} /></Card>)}
      {NINE.map((x, k) => {
        const a = 9.5 + k * 0.09;
        const f = prog(t, a, a + 0.45, easeOut);
        return (
          <Abs key={x.n} x={60 + (k % 3) * 330} y={760 + Math.floor(k / 3) * 240} w={300} h={215} style={{perspective: 900, opacity: t >= a ? 1 : 0}}>
            <div style={{width: '100%', height: '100%', background: '#fff', border: `5px solid ${INK}`, borderRadius: 20, boxShadow: `7px 7px 0 ${x.c}`, transform: `rotateY(${(1 - f) * 90}deg)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, boxSizing: 'border-box'}}>
              <F n={x.ic} size={64} />
              <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 36, color: x.c}}>ISO {x.n}</div>
              <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 20, color: DIM}}>{x.l}</div>
            </div>
          </Abs>
        );
      })}
      <Abs x={0} y={706} w={1080} style={{textAlign: 'center'}}><Mono at={9.5} c={INK} size={24}>neuf normes ISO incontournables</Mono></Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 1 : QUALITÉ ET ENVIRONNEMENT ═════════════ */
const N9001: React.FC = () => {
  const t = useT();
  const rot = prog(t, 22.6, 25.4, easeInOut) * 360 + Math.max(0, t - 22.3) * 20;
  const Q = ['P', 'D', 'C', 'A'];
  return (
    <Out end={25.6}>
      <HiLine words={['Le', 'management', 'de', 'la', 'qualité']} mark={[4]} at={15.6} y={330} size={58} />
      <Deep src="iso26/audit-checklist.jpg" x={60} y={440} w={960} h={400} at={15.7} pos="50% 40%">
        <div style={{position: 'absolute', left: 24, bottom: 24}}><Board text="ISO 9001" at={16.0} h={70} c={BLUE} stag={0.04} /></div>
      </Deep>
      <Abs x={60} y={900} w={540} style={{display: 'flex', flexDirection: 'column', gap: 22}}>
        <Check at={19.3} label="satisfaire les clients" c={BLUE} size={30} />
        <Check at={20.9} label="maîtriser les processus" c={BLUE} size={30} />
        <Check at={24.1} label="améliorer les performances" c={GREEN} size={28} />
      </Abs>
      <Abs x={640} y={880} w={380} h={380} style={{opacity: pop(t, 22.3), transform: `scale(${0.6 + 0.4 * pop(t, 22.3)})`}}>
        <svg width={380} height={380} style={{transform: `rotate(${rot}deg)`}}>
          {Q.map((q, k) => {
            const a0 = (k * 90 - 90) * Math.PI / 180;
            const a1 = ((k + 1) * 90 - 90) * Math.PI / 180;
            const cx = 190, cy = 190, r = 170;
            const mid = (a0 + a1) / 2;
            return (
              <g key={q}>
                <path d={`M${cx} ${cy} L${cx + r * Math.cos(a0)} ${cy + r * Math.sin(a0)} A${r} ${r} 0 0 1 ${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)} Z`} fill={[BLUE, ORANGE, GREEN, VIO][k]} stroke={INK} strokeWidth={5} />
                <text x={cx + 100 * Math.cos(mid)} y={cy + 100 * Math.sin(mid) + 22} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={64} fill="#fff" stroke={INK} strokeWidth={2}>{q}</text>
              </g>
            );
          })}
          <circle cx={190} cy={190} r={36} fill="#fff" stroke={INK} strokeWidth={5} />
        </svg>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: -44, textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 38, color: GREEN, opacity: pop(t, 22.6)}}>en continu ↻</div>
      </Abs>
    </Out>
  );
};
const N14001: React.FC = () => {
  const t = useT();
  const rev = prog(t, 33.9, 35.0, easeInOut);
  const C3 = [{ic: 'usine', l: 'impacts environnementaux', a: 29.3, c: ORANGE}, {ic: 'vapeur', l: 'prévenir les pollutions', a: 31.14, c: RED}, {ic: 'recyclage', l: 'mieux gérer les déchets', a: 32.74, c: GREEN}];
  return (
    <Out end={36.8}>
      <HiLine words={['Maîtriser', 'ses', 'impacts']} mark={[0, 2]} at={25.8} y={330} size={62} />
      <Blinds src="smi/fumees.jpg" x={60} y={440} w={960} h={500} at={26.0} pos="50% 50%" n={12}>
        <div style={{position: 'absolute', inset: 0, clipPath: `circle(${rev * 75}% at 50% 50%)`}}><Img src={PH('durab/planete-odd.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
        <div style={{position: 'absolute', left: 24, bottom: 24}}><Board text="ISO 14001" at={26.4} h={66} c={GREEN} stag={0.04} /></div>
      </Blinds>
      {C3.map((x, k) => <Card key={x.l} x={60 + k * 330} y={990} w={300} h={270} at={x.a} c={x.c}><IcoLab ic={x.ic} l={x.l} size={96} fs={25} /></Card>)}
      {t > 31.6 && <Abs x={390} y={1000} w={300} h={140} style={{pointerEvents: 'none'}}><svg width={300} height={140}><line x1={60} y1={20} x2={240} y2={120} stroke={RED} strokeWidth={10} strokeLinecap="round" strokeDasharray={220} strokeDashoffset={220 * (1 - prog(t, 31.6, 32.0))} /></svg></Abs>}
      <Abs x={0} y={1300} w={1080} style={{textAlign: 'center'}}><Pill at={34.4} c={GREEN} size={32}>performance environnementale ↑</Pill></Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 2 : SANTÉ, SÉCURITÉ, ALIMENTS ═════════════ */
const N45001: React.FC = () => {
  const t = useT();
  const dome = pop(t, 48.1);
  const S3 = [{ic: 'danger', l: 'identifier les dangers', a: 45.26, c: ORANGE}, {ic: 'balance', l: 'évaluer les risques', a: 46.06, c: VIO}, {ic: 'bouclier', l: 'prévenir les accidents', a: 48.14, c: GREEN}];
  return (
    <Out end={51.6}>
      <HiLine words={['Santé', 'et', 'sécurité', 'au', 'travail']} mark={[0, 2]} at={40.2} y={330} size={58} />
      <Deep src="risquebrut/technicien-harnais.jpg" x={60} y={440} w={960} h={440} at={40.3} pos="50% 30%">
        <div style={{position: 'absolute', left: 24, bottom: 24}}><Board text="ISO 45001" at={40.6} h={66} c={RED} stag={0.04} /></div>
      </Deep>
      {dome > 0 && <div style={{position: 'absolute', left: 240, top: 470, width: 600, height: 600, borderRadius: '50%', border: `8px solid ${GREEN}`, background: `radial-gradient(circle, ${GREEN}10 55%, ${GREEN}40 70%, transparent 72%)`, opacity: dome * 0.9, transform: `scale(${0.7 + 0.3 * dome})`, clipPath: 'inset(0 0 40% 0)', boxShadow: `0 0 ${30 + 20 * Math.sin(t * 6)}px ${GREEN}`}} />}
      {['brique', 'boulon', 'eclair', 'brique', 'boulon'].map((ic, k) => {
        const a = 48.3 + k * 0.28;
        if (t < a) return null;
        const p = prog(t, a, a + 0.45, easeIn);
        const q = prog(t, a + 0.45, a + 1.2, easeOut);
        const x0 = 300 + k * 120;
        const dir = k % 2 ? 1 : -1;
        return <div key={k} style={{position: 'absolute', left: x0 + dir * q * 360, top: lerp(220, 470, p) - 260 * q + 520 * q * q, transform: `rotate(${q * 400 * dir}deg)`, opacity: 1 - prog(t, a + 0.9, a + 1.2), zIndex: 5}}><F n={ic} size={80} /></div>;
      })}
      {S3.map((x, k) => (
        <React.Fragment key={x.l}>
          <Card x={60 + k * 335} y={940} w={290} h={290} at={x.a} c={x.c}><IcoLab ic={x.ic} l={x.l} size={100} fs={26} /></Card>
          {k < 2 && <Abs x={355 + k * 335} y={1060} w={40} style={{opacity: pop(t, S3[k + 1].a - 0.2), fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK}}>→</Abs>}
        </React.Fragment>
      ))}
      <Abs x={0} y={1290} w={1080} style={{textAlign: 'center'}}><Pill at={49.5} c={RED} size={30}>accidents du travail · maladies professionnelles</Pill></Abs>
    </Out>
  );
};
const N22000: React.FC = () => {
  const t = useT();
  const belt = (t * 140) % 80;
  const ST = [{ic: 'herbe', l: 'champ'}, {ic: 'camion', l: 'transport'}, {ic: 'usine', l: 'transformation'}, {ic: 'assiette', l: 'assiette'}];
  const tok = prog(t, 60.2, 64.4, easeInOut);
  const HZ = [{ic: 'microbe', l: 'biologiques', a: 62.38, c: GREEN}, {ic: 'eprouvette', l: 'chimiques', a: 63.54, c: VIO}, {ic: 'boulon', l: 'physiques', a: 64.0, c: ORANGE}];
  const lens = prog(t, 62.4, 64.7, easeInOut);
  return (
    <Out end={67.1}>
      <HiLine words={['La', 'sécurité', 'des', 'denrées']} mark={[1, 3]} at={51.9} y={330} size={62} />
      <Deep src="zones/boulangerie.jpg" x={60} y={440} w={960} h={360} at={52.0} pos="50% 50%">
        <div style={{position: 'absolute', left: 24, bottom: 24}}><Board text="ISO 22000" at={52.3} h={66} c={ORANGE} stag={0.04} /></div>
      </Deep>
      <Card x={60} y={850} w={960} h={290} at={56.8} c={ORANGE}>
        <div style={{position: 'absolute', left: 16, top: 12}}><Mono at={57.0} c={ORANGE} size={20}>des denrées alimentaires</Mono></div>
        <div style={{position: 'absolute', left: 40, right: 40, top: 200, height: 26, borderRadius: 13, background: `repeating-linear-gradient(90deg, #3A4356 0 40px, #59647A 40px 80px)`, backgroundPosition: `${belt}px 0`, border: `4px solid ${INK}`}} />
        {ST.map((x, k) => <div key={x.l} style={{position: 'absolute', left: 60 + k * 230, top: 50, width: 150, textAlign: 'center', opacity: pop(t, 57.0 + k * 0.3)}}><F n={x.ic} size={90} /><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 20, color: DIM}}>{x.l}</div></div>)}
        <div style={{position: 'absolute', left: lerp(70, 790, tok), top: 168, opacity: t > 60.2 ? 1 : 0}}><F n="colis" size={52} /></div>
      </Card>
      {HZ.map((x, k) => (
        <Card key={x.l} x={60 + k * 330} y={1180} w={300} h={250} at={x.a} c={x.c}>
          <IcoLab ic={x.ic} l={`dangers ${x.l}`} size={86} fs={24} />
          <div style={{position: 'absolute', right: 14, top: 10, fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: RED, opacity: pop(t, 64.9 + k * 0.12)}}>✗</div>
        </Card>
      ))}
      {lens > 0 && lens < 1 && (
        <div style={{position: 'absolute', left: lerp(60, 760, lens), top: 1170, width: 240, height: 240, borderRadius: '50%', border: `10px solid ${INK}`, background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.7), rgba(191,215,234,0.35) 60%)', boxShadow: '0 12px 30px rgba(20,33,61,0.3)', zIndex: 6}}>
          <div style={{position: 'absolute', right: -70, bottom: -50, width: 110, height: 30, background: INK, borderRadius: 15, transform: 'rotate(40deg)'}} />
        </div>
      )}
      <Stamp at={65.0} c={GREEN} text="aliments sûrs" x={330} y={1460} rot={-5} size={50} />
    </Out>
  );
};

/* ═════════════ PARTIE 3 : SOCIÉTÉ ET ÉNERGIE ═════════════ */
const N26000: React.FC = () => {
  const t = useT();
  const phase2 = t >= 79.2;
  const P3 = [{ic: 'equipe', l: 'sociales', a: 75.14, c: BLUE}, {ic: 'planete', l: 'environnementales', a: 75.62, c: GREEN}, {ic: 'graphique', l: 'économie', a: 76.3, c: VIO}];
  const roof = Math.max(0, Math.min(1, spring(t, 77.1, 8, 11)));
  return (
    <Out end={84.95}>
      <HiLine words={phase2 ? ['Attention', '!'] : ['La', 'responsabilité', 'sociétale']} mark={phase2 ? [0] : [1, 2]} at={phase2 ? 79.3 : 70.5} y={330} size={62} />
      {!phase2 && (
        <>
          <Deep src="iso26/direction-equipe.jpg" x={60} y={440} w={960} h={360} at={70.6} pos="50% 40%">
            <div style={{position: 'absolute', left: 24, bottom: 24}}><Board text="ISO 26000" at={70.9} h={66} c={VIO} stag={0.04} /></div>
            <div style={{position: 'absolute', right: 20, top: 18}}><Mono at={69.6} c={VIO} size={22}>lignes directrices</Mono></div>
          </Deep>
          <Abs x={150} y={860 - (1 - roof) * 400} w={780} h={130} style={{opacity: t > 77.1 ? 1 : 0}}>
            <svg width={780} height={130}><polygon points="20,120 390,10 760,120" fill="#fff" stroke={INK} strokeWidth={8} strokeLinejoin="round" /><text x={390} y={100} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={34} fill={VIO}>décisions & activités</text></svg>
          </Abs>
          {P3.map((x, k) => {
            const h = prog(t, x.a, x.a + 0.5, easeOut);
            return (
              <Abs key={x.l} x={180 + k * 255} y={1000 + (1 - h) * 300} w={210} h={300 * h + 1} style={{background: `linear-gradient(90deg, #fff, ${x.c}22 50%, #fff)`, border: `5px solid ${INK}`, borderRadius: 10, boxShadow: `6px 6px 0 ${x.c}`, overflow: 'hidden', opacity: t >= x.a ? 1 : 0}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30, gap: 14}}><F n={x.ic} size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: x.l.length > 10 ? 17 : 26, color: INK}}>{x.l}</div></div>
              </Abs>
            );
          })}
          <Abs x={140} y={1310} w={800} h={30} style={{background: INK, borderRadius: 8, opacity: pop(t, 75.1)}} />
        </>
      )}
      {phase2 && (
        <SearchOpen x={60} y={440} w={960} h={820} at={79.3} query="ISO 26000 certifiable ?" results={['ISO 26000 · lignes directrices', 'ISO 9001 · certification', 'ISO 14001 · certification']} found={0} foundAt={81.2} clickAt={81.7} c={VIO}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 50, gap: 20}}>
            <F n="parchemin" size={200} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: INK}}>une norme de</div>
            <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 76, color: VIO}}>lignes directrices</div>
          </div>
          <Stamp at={83.5} c={RED} text="non certifiable" x={180} y={540} rot={-7} size={64} />
        </SearchOpen>
      )}
    </Out>
  );
};
const N50001: React.FC = () => {
  const t = useT();
  const needle = lerp(70, -70, prog(t, 90.34, 91.9, easeInOut)) + Math.sin(t * 9) * 3;
  const gc = needle > 0 ? RED : GREEN;
  return (
    <Out end={95.65}>
      <HiLine words={['La', 'performance', 'énergétique']} mark={[1, 2]} at={85.2} y={330} size={62} />
      <Deep src="promo/raffinerie.jpg" x={60} y={440} w={960} h={360} at={85.3} pos="50% 50%">
        <div style={{position: 'absolute', left: 24, bottom: 24}}><Board text="ISO 50001" at={85.6} h={66} c={GOLD} stag={0.04} /></div>
      </Deep>
      <Card x={60} y={860} w={460} h={430} at={89.8} c={gc}>
        <div style={{position: 'absolute', left: 16, top: 12}}><Mono at={90.0} c={DIM} size={20}>consommation d’énergie</Mono></div>
        <svg width={450} height={300} style={{position: 'absolute', left: 0, top: 70}}>
          <path d="M60 240 A165 165 0 0 1 390 240" fill="none" stroke="#E3E8EF" strokeWidth={40} />
          <path d="M60 240 A165 165 0 0 1 225 75" fill="none" stroke={GREEN} strokeWidth={40} />
          <path d="M225 75 A165 165 0 0 1 390 240" fill="none" stroke={RED} strokeWidth={40} />
          <line x1={225} y1={240} x2={225 + 150 * Math.sin(needle * Math.PI / 180)} y2={240 - 150 * Math.cos(needle * Math.PI / 180)} stroke={INK} strokeWidth={12} strokeLinecap="round" />
          <circle cx={225} cy={240} r={20} fill={INK} />
        </svg>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: gc}}>{needle > 0 ? 'trop haut' : 'réduite ✓'}</div>
      </Card>
      <Card x={560} y={860} w={460} h={430} at={92.1} c={GOLD}>
        <div style={{position: 'absolute', left: 16, top: 12}}><Mono at={92.2} c={DIM} size={20}>usages optimisés</Mono></div>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 20, padding: '70px 40px 0', justifyContent: 'center'}}>
          {Array.from({length: 6}, (_, k) => {
            const off = [1, 3, 4].includes(k) && t > 92.6 + k * 0.25;
            return <div key={k} style={{filter: off ? 'grayscale(1) brightness(0.8)' : `drop-shadow(0 0 ${12 + 6 * Math.sin(t * 5 + k)}px ${GOLD})`, opacity: off ? 0.45 : 1}}><F n="ampoule" size={90} /></div>;
          })}
        </div>
      </Card>
      <Abs x={0} y={1330} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: pop(t, 94.3)}}><F n="argent" size={80} /><Pill at={94.3} c={GREEN} size={32}>coûts maîtrisés</Pill></Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 4 : INFORMATION ET SANTÉ ═════════════ */
const RAIN = Array.from({length: 18}, (_, k) => ({x: 18 + k * 52, sp: 120 + random(`rs${k}`) * 160, off: random(`ro${k}`) * 400, ch: Array.from({length: 12}, (_, j) => '01ABCDEF9#$'[Math.floor(random(`rc${k}-${j}`) * 11)])}));
const N27001: React.FC = () => {
  const t = useT();
  const lock = Math.max(0, Math.min(1, spring(t, 106.8, 7, 10)));
  const safe = t > 106.8;
  const V = [{l: 'confidentialité', ic: 'cadenas', a: 103.22, x: 330, y: 40}, {l: 'intégrité', ic: 'bouclier', a: 104.9, x: 60, y: 330}, {l: 'disponibilité', ic: 'chrono', a: 105.5, x: 600, y: 330}];
  return (
    <Out end={109.95}>
      <HiLine words={['La', 'sécurité', 'de', 'l’information']} mark={[1, 3]} at={99.1} y={330} size={58} />
      <Win x={60} y={440} w={960} h={430} at={99.2} title={safe ? 'serveur · protégé' : 'serveur · données'} c={TEAL} dark>
        {RAIN.map((r, k) => (
          <div key={k} style={{position: 'absolute', left: r.x, top: ((t * r.sp + r.off) % 520) - 260, fontFamily: MONO, fontWeight: 700, fontSize: 24, lineHeight: '28px', color: safe ? GREEN : '#3FA9F5', opacity: 0.75}}>
            {r.ch.map((c, j) => <div key={j} style={{opacity: 1 - j * 0.07}}>{c}</div>)}
          </div>
        ))}
        <div style={{position: 'absolute', left: 0, right: 0, top: 70, display: 'flex', justifyContent: 'center', transform: `scale(${lock}) translateY(${(1 - lock) * -200}px)`, filter: `drop-shadow(0 0 30px ${GREEN})`}}><F n="cadenas" size={220} /></div>
        <div style={{position: 'absolute', left: 24, bottom: 20}}><Board text="ISO 27001" at={99.6} h={60} c={TEAL} stag={0.04} /></div>
      </Win>
      <Abs x={60} y={920} w={960} h={520}>
        <svg width={960} height={520} style={{position: 'absolute', left: 0, top: 0}}>
          {[[0, 1], [1, 2], [2, 0]].map(([a, b], k) => {
            const st = Math.max(V[a].a, V[b].a);
            const p = prog(t, st, st + 0.4);
            const A = {x: V[a].x + 150, y: V[a].y + 70}, B = {x: V[b].x + 150, y: V[b].y + 70};
            return <line key={k} x1={A.x} y1={A.y} x2={lerp(A.x, B.x, p)} y2={lerp(A.y, B.y, p)} stroke={TEAL} strokeWidth={10} strokeLinecap="round" />;
          })}
        </svg>
        {V.map((v) => (
          <div key={v.l} style={{position: 'absolute', left: v.x, top: v.y, width: 300, height: 140, background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `6px 6px 0 ${TEAL}`, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', boxSizing: 'border-box', opacity: pop(t, v.a), transform: `scale(${0.7 + 0.3 * pop(t, v.a)})`}}>
            <F n={v.ic} size={70} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: v.l.length > 12 ? 24 : 28, color: INK}}>{v.l}</div>
          </div>
        ))}
      </Abs>
    </Out>
  );
};
const N13485: React.FC = () => {
  const t = useT();
  const D4 = [{ic: 'stethoscope', l: 'stéthoscope'}, {ic: 'seringue', l: 'seringue'}, {ic: 'pansement', l: 'pansement'}, {ic: 'thermometre', l: 'thermomètre'}];
  const ecg = Array.from({length: 61}, (_, k) => {
    const x = k * 14;
    const ph = ((k + Math.floor(t * 18)) % 20);
    const y = ph === 8 ? -60 : ph === 9 ? 50 : ph === 10 ? -20 : 0;
    return `${x},${70 + y}`;
  }).join(' ');
  return (
    <Out end={125.85}>
      <HiLine words={['Les', 'dispositifs', 'médicaux']} mark={[1, 2]} at={110.1} y={330} size={62} />
      <SearchOpen x={60} y={440} w={960} h={1000} at={110.2} query="ISO dispositifs médicaux" results={['ISO 13485 · dispositifs médicaux', 'ISO 9001 · qualité', 'ISO 45001 · santé-sécurité']} found={0} foundAt={112.2} clickAt={112.8} c={BURG}>
        <svg width={950} height={140} style={{position: 'absolute', left: 0, top: 10}}><polyline points={ecg} fill="none" stroke={RED} strokeWidth={6} strokeLinejoin="round" /></svg>
        <div style={{position: 'absolute', left: 30, top: 160, display: 'flex', gap: 20}}>
          {D4.map((x, k) => <div key={x.l} style={{width: 205, height: 190, border: `4px solid ${INK}`, borderRadius: 18, background: '#fff', boxShadow: `5px 5px 0 ${BURG}`, opacity: pop(t, 116.9 + k * 0.2), transform: `translateY(${(1 - pop(t, 116.9 + k * 0.2)) * 40}px)`}}><IcoLab ic={x.ic} l={x.l} size={80} fs={22} /></div>)}
        </div>
        <div style={{position: 'absolute', left: 30, right: 30, top: 400, display: 'flex', flexDirection: 'column', gap: 20}}>
          <Check at={118.6} label="fabricants et organisations concernées" c={BURG} size={28} />
          <Check at={121.38} label="processus maîtrisés" c={BURG} size={30} />
          <Check at={122.78} label="exigences réglementaires respectées" c={GREEN} size={28} />
        </div>
        <div style={{position: 'absolute', left: 30, bottom: 30}}><Board text="ISO 13485" at={113.6} h={60} c={BURG} stag={0.04} /></div>
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ PARTIE 5 : LABORATOIRES ═════════════ */
const DARTS = Array.from({length: 6}, (_, k) => ({dx: (random(`dx${k}`) - 0.5) * 50, dy: (random(`dy${k}`) - 0.5) * 50}));
const N17025: React.FC = () => {
  const t = useT();
  const B3 = [{ic: 'diplome', l: 'compétence', a: 130.86, c: BLUE}, {ic: 'balance', l: 'impartialité', a: 131.5, c: VIO}, {ic: 'engrenage', l: 'fonctionnement cohérent', a: 132.62, c: ORANGE}];
  return (
    <Out end={142.05}>
      <HiLine words={['Des', 'laboratoires', 'fiables']} mark={[1, 2]} at={129.3} y={330} size={62} />
      <Deep src="iso26/labo-manuel.jpg" x={60} y={440} w={960} h={360} at={129.4} pos="50% 45%">
        <div style={{position: 'absolute', left: 24, bottom: 24}}><Board text="ISO/IEC 17025" at={129.7} h={60} c={ORANGE} stag={0.035} /></div>
      </Deep>
      {B3.map((x, k) => <Card key={x.l} x={60 + k * 330} y={840} w={300} h={230} at={x.a} c={x.c}><IcoLab ic={x.ic} l={x.l} size={86} fs={x.l.length > 12 ? 22 : 26} /></Card>)}
      <Card x={60} y={1110} w={460} h={340} at={136.6} c={ORANGE}>
        <div style={{position: 'absolute', left: 16, top: 12}}><Mono at={136.8} c={DIM} size={20}>fiabilité des résultats</Mono></div>
        <svg width={450} height={300} style={{position: 'absolute', left: 0, top: 40}}>
          {[120, 90, 60, 30].map((r, k) => <circle key={r} cx={225} cy={140} r={r} fill={k % 2 ? '#fff' : `${ORANGE}33`} stroke={INK} strokeWidth={4} />)}
          {DARTS.map((d, k) => {
            const a = 137.6 + k * 0.16;
            const p = prog(t, a, a + 0.25, easeIn);
            if (t < a) return null;
            return <g key={k} transform={`translate(${lerp(460, 225 + d.dx, p)} ${lerp(-40, 140 + d.dy, p)})`}><circle r={9} fill={RED} stroke={INK} strokeWidth={3} /></g>;
          })}
        </svg>
      </Card>
      <Card x={560} y={1110} w={460} h={340} at={133.9} c={GREEN}>
        <div style={{display: 'flex', justifyContent: 'center', gap: 20, marginTop: 30}}><F n="microscope" size={100} /><F n="eprouvette" size={100} /></div>
        <div style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: DIM}}>essais & étalonnage</div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 18, opacity: pop(t, 139.1)}}><F n="poignee" size={70} /><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 44, color: GREEN}}>confiance ✓</div></div>
      </Card>
    </Out>
  );
};

/* ═════════════ PARTIE 6 : L'OBJECTIF COMMUN ═════════════ */
const Final: React.FC = () => {
  const t = useT();
  const phase2 = t >= 152.2;
  const R = lerp(380, 300, prog(t, 145.3, 147.0, easeOut));
  const W3 = [{v: 'améliorer', l: 'la performance', a: 146.66, c: BLUE}, {v: 'maîtriser', l: 'les risques', a: 148.1, c: RED}, {v: 'renforcer', l: 'la confiance', a: 149.34, c: GREEN}];
  const qm = Math.max(0, Math.min(1, spring(t, 152.5, 7, 9)));
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={phase2 ? ['Lesquelles', 'connaissez-vous', '?'] : ['Un', 'objectif', 'commun']} mark={phase2 ? [1] : [1, 2]} at={phase2 ? 152.4 : 145.4} y={330} size={58} />
      <Abs x={0} y={420} w={1080} h={760}>
        {NINE.map((x, k) => {
          const ang = (k / 9) * Math.PI * 2 + (t - 145) * 0.5;
          const a = 145.4 + k * 0.06;
          return (
            <div key={x.n} style={{position: 'absolute', left: 540 + R * Math.cos(ang) - 80, top: 380 + R * 0.95 * Math.sin(ang) - 45, width: 160, height: 90, background: '#fff', border: `4px solid ${INK}`, borderRadius: 14, boxShadow: `5px 5px 0 ${x.c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, opacity: pop(t, a), transform: `scale(${pop(t, a)})`}}>
              <F n={x.ic} size={38} /><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: x.c}}>{x.n}</div>
              {phase2 && <div style={{position: 'absolute', right: -14, top: -14, width: 34, height: 34, borderRadius: 8, border: `4px solid ${INK}`, background: '#fff', opacity: pop(t, 152.6 + k * 0.05)}} />}
            </div>
          );
        })}
        <div style={{position: 'absolute', left: 540 - 120, top: 380 - 120, width: 240, height: 240, borderRadius: '50%', background: '#fff', border: `6px solid ${INK}`, boxShadow: `0 0 ${30 + 20 * Math.sin(t * 4)}px ${GREEN}88`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 145.3)}}>
          {phase2 ? <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 170, color: VIO, transform: `scale(${qm}) rotate(${(1 - qm) * -40}deg)`}}>?</div> : <F n="cible" size={170} />}
        </div>
      </Abs>
      {!phase2 && (
        <Abs x={60} y={1200} w={960} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          {W3.map((w) => (
            <div key={w.v} style={{display: 'flex', alignItems: 'center', gap: 18, background: '#fff', border: `5px solid ${INK}`, borderRadius: 16, boxShadow: `7px 7px 0 ${w.c}`, padding: '10px 24px', opacity: pop(t, w.a), transform: `scale(${1 + 0.3 * (1 - pop(t, w.a, 0.25))})`}}>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: w.c}}>{w.v}</div><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: INK}}>{w.l}</div>
            </div>
          ))}
        </Abs>
      )}
      {phase2 && <Abs x={0} y={1250} w={1080}><Board text="9 NORMES ISO" at={152.4} h={86} c={GREEN} stag={0.035} /></Abs>}
      {t > ALLDONE && <Dust n={22} c={GOLD} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: at + 0.35 + len * 0.05, s: 'sfx/pop', v: 0.25}, ...rep(at + 0.8 + len * 0.05, 3, 0.12, 'sfx/pop', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const board = (a: number) => flaps(a, 8);
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 1.4, s: 'validation', v: 0.2})), {at: ALLDONE, s: 'validation', v: 0.35},
  ...[3.54, 4.3, 6.06, 7.3].map((a) => ({at: a, s: 'sfx/pop', v: 0.25})), ...rep(9.5, 9, 0.09, 'sfx/swish', 0.12), {at: 10.4, s: 'sfx/ding', v: 0.25},
  {at: 15.7, s: 'sfx/whoosh', v: 0.25}, ...board(16.0), ...[19.3, 20.9, 24.1].map((a) => ({at: a + 0.25, s: 'sfx/ding', v: 0.22})), {at: 22.3, s: 'sfx/pop', v: 0.3}, {at: 22.6, s: 'sfx/rise', v: 0.22, dur: 2.5},
  {at: 26.0, s: 'page', v: 0.35}, ...board(26.4), ...[29.3, 31.14, 32.74].map((a) => ({at: a, s: 'sfx/thud', v: 0.28})), {at: 31.6, s: 'stylo', v: 0.3}, {at: 33.9, s: 'soft-whoosh', v: 0.4, dur: 1.4}, {at: 34.4, s: 'validation', v: 0.3},
  {at: 40.3, s: 'sfx/whoosh', v: 0.25}, ...board(40.6), ...[45.26, 46.06, 48.14].map((a) => ({at: a, s: 'sfx/thud', v: 0.28})), {at: 48.1, s: 'sfx/rise', v: 0.3, dur: 0.6}, ...[0, 1, 2, 3, 4].map((k) => ({at: 48.75 + k * 0.28, s: 'cadenas', v: 0.25})), {at: 49.5, s: 'sfx/pop', v: 0.22},
  {at: 52.0, s: 'sfx/whoosh', v: 0.25}, ...board(52.3), ...[57.0, 57.3, 57.6, 57.9].map((a) => ({at: a, s: 'sfx/pop', v: 0.18})), ...rep(60.2, 14, 0.3, 'tick', 0.1), ...[62.38, 63.54, 64.0].map((a) => ({at: a, s: 'alarme', v: 0.05, dur: 0.5})), {at: 62.4, s: 'soft-whoosh', v: 0.3, dur: 2.3}, ...[64.9, 65.02, 65.14].map((a) => ({at: a, s: 'sfx/swish', v: 0.2})), {at: 65.0, s: 'tampon', v: 0.55},
  {at: 70.6, s: 'sfx/whoosh', v: 0.25}, ...board(70.9), ...[75.14, 75.62, 76.3].map((a) => ({at: a, s: 'sfx/rise', v: 0.2, dur: 0.5})), {at: 77.1, s: 'deep-hit', v: 0.45}, {at: 77.15, s: 'sfx/thud', v: 0.4},
  {at: 79.3, s: 'alarme', v: 0.08, dur: 0.8}, ...searchCues(79.3, 23, 81.2, 81.7), {at: 83.5, s: 'tampon', v: 0.6}, {at: 83.52, s: 'bass-hit', v: 0.35},
  {at: 85.3, s: 'sfx/whoosh', v: 0.25}, ...board(85.6), {at: 89.8, s: 'sfx/pop', v: 0.22}, {at: 90.34, s: 'tension', v: 0.2, dur: 1.6}, {at: 91.9, s: 'validation', v: 0.3}, ...[1, 3, 4].map((k) => ({at: 92.6 + k * 0.25, s: 'sfx/click', v: 0.4})), {at: 94.3, s: 'sfx/ding', v: 0.3},
  {at: 99.2, s: 'sfx/whoosh', v: 0.25}, ...rep(99.4, 20, 0.12, 'tick', 0.06), ...board(99.6), ...[103.22, 104.9, 105.5].map((a) => ({at: a, s: 'sfx/pop', v: 0.25})), {at: 106.8, s: 'cadenas', v: 0.6}, {at: 106.82, s: 'deep-hit', v: 0.4}, {at: 107.3, s: 'validation', v: 0.3},
  ...searchCues(110.2, 24, 112.2, 112.8), ...board(113.6), ...rep(113.8, 10, 1.1, 'sfx/click', 0.08), ...[116.9, 117.1, 117.3, 117.5].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})), ...[118.6, 121.38, 122.78].map((a) => ({at: a + 0.25, s: 'sfx/ding', v: 0.22})),
  {at: 129.4, s: 'sfx/whoosh', v: 0.25}, ...board(129.7), ...[130.86, 131.5, 132.62].map((a) => ({at: a, s: 'sfx/thud', v: 0.28})), {at: 133.9, s: 'sfx/pop', v: 0.22}, {at: 136.6, s: 'sfx/pop', v: 0.22}, ...[0, 1, 2, 3, 4, 5].map((k) => ({at: 137.85 + k * 0.16, s: 'sfx/thud', v: 0.3})), {at: 139.1, s: 'validation', v: 0.3},
  {at: 145.3, s: 'sfx/rise', v: 0.25, dur: 1.5}, ...rep(145.4, 9, 0.06, 'sfx/pop', 0.12), ...[146.66, 148.1, 149.34].flatMap((a) => [{at: a, s: 'tampon', v: 0.45}, {at: a + 0.02, s: 'deep-hit', v: 0.3}]),
  {at: 152.4, s: 'riser', v: 0.3, dur: 1}, ...flaps(152.4, 12), {at: 152.6, s: 'sfx/ding', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const NormesIso: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={12.6}><Intro /></Gate>
    <Gate from={15.5} to={25.7}><N9001 /></Gate>
    <Gate from={25.6} to={36.9}><N14001 /></Gate>
    <Gate from={39.9} to={51.7}><N45001 /></Gate>
    <Gate from={51.6} to={67.2}><N22000 /></Gate>
    <Gate from={70.3} to={85.0}><N26000 /></Gate>
    <Gate from={84.9} to={95.7}><N50001 /></Gate>
    <Gate from={98.8} to={110.0}><N27001 /></Gate>
    <Gate from={109.9} to={125.9}><N13485 /></Gate>
    <Gate from={129.0} to={142.1}><N17025 /></Gate>
    <Gate from={145.2} to={OUTRO_AT}><Final /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}><Gyro i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={155.1}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-role-normes-iso-economiques.m4a')} trimAfter={s(155.2)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Count, Kin, Brut, Strike, NIGHT, YEL, T, TitleBlock];
