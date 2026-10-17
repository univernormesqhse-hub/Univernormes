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
 * « Réussir son entretien HSE » (7 min 38) — capsule « condensé + effet wahou » : voix d'origine, sous-titres recalés
 * mot à mot, photos réelles, thème « papier quadrillé ».
 * Fil rouge : LE TUBE PNEUMATIQUE À SIX GUICHETS (technique → secteur → STAR → terrain → attitude → bilan) ; la capsule
 * du dossier file d'un guichet à l'autre et chaque guichet passé se coche.
 * Transition : LE GYROPHARE à chaque partie.
 * Condensé de la série : texte cinétique, mot surligné jaune, mot manuscrit, tuiles de bois, palettes d'affichage,
 * fenêtres d'interface, store vénitien sur photo, photos en profondeur, compteurs, cartes à ombre dure, étiquettes
 * monospace, tampons, mots barrés, onde de choc, écran qui tremble, cases cochées, poussière.
 * Effets « wahou » nouveaux : réseau neuronal qui s'allume, CV scanné au laser, cartes de candidature qui glissent
 * (rejetée / embauchée), tour de compétences qui s'empile, dictionnaire sur pattes, barres de recherche qui trouvent
 * puis OUVRENT l'élément (bases HSE, mise en situation en messagerie, questions à poser), curseurs rigueur / clarté,
 * prisme 3D des secteurs avec explosion, barre de chargement instantanée, lettres STAR qui se retournent, coureur qui
 * percute le mur de la théorie, bulle qui éclate, jauge d'influence qui s'effondre, interrupteur sanctionner /
 * persuader, drapeaux d'alarme, porte de sortie, puzzle du candidat idéal, verbes qui claquent, mémoire qui s'efface,
 * gros bouton STOP et poignée de main.
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
const OUTRO_AT = 458.6;
export const ENTRETIEN_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 62.0, n: '1', title: 'Au-delà de la technique', s: 'théorie et humain', c: BLUE, g: 'technique', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 123.0, n: '2', title: 'Les risques du secteur', s: 'une préparation sur mesure', c: ORANGE, g: 'secteur', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 180.55, n: '3', title: 'La méthode STAR', s: 'structurer son vécu', c: VIO, g: 'STAR', k: 'gyro', lab: 'PARTIE 3 / 6'},
  {at: 224.75, n: '4', title: 'La mentalité terrain', s: 'l’épreuve de la réalité', c: RED, g: 'terrain', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 327.1, n: '5', title: 'L’attitude d’expert', s: 'le savoir-être', c: TEAL, g: 'attitude', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 389.85, n: '6', title: 'Le candidat idéal', s: 'la vraie maîtrise HSE', c: GREEN, g: 'bilan', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 455.5;

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
      <Img src={PH('causerie/animatrice.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 900, objectFit: 'cover', objectPosition: '50% 20%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 32%, ${PAPER}DD 42%, ${PAPER} 47%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={720} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>DÉCRYPTAGE STRATÉGIQUE</div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 92, color: INK, marginTop: 12}}>réussir son</div>
        <div style={{marginTop: 6}}><Board text="ENTRETIEN" at={-1} h={100} c={BLUE} stag={0.03} /></div>
        <div style={{display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20}}>{'HSE'.split('').map((c, i) => <Tile key={i} ch={c} size={120} c={GREEN} />)}</div>
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

/* ═════════════ INTRO ═════════════ */
const NODES = Array.from({length: 22}, (_, k) => ({x: 120 + random(`nx${k}`) * 700, y: 60 + random(`ny${k}`) * 380}));
const Neurones: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  return (
    <svg width={940} height={500}>
      {NODES.map((a, i) => NODES.slice(i + 1).filter((b) => Math.hypot(a.x - b.x, a.y - b.y) < 190).map((b, j) => {const on = prog(t, at + i * 0.06, at + i * 0.06 + 0.4); const pulse = 0.4 + 0.6 * Math.abs(Math.sin(t * 3 + i + j)); return <line key={`${i}-${j}`} x1={a.x} y1={a.y} x2={lerp(a.x, b.x, on)} y2={lerp(a.y, b.y, on)} stroke={VIO} strokeWidth={3} opacity={0.5 * pulse} />;}))}
      {NODES.map((a, i) => <circle key={i} cx={a.x} cy={a.y} r={10 + 4 * Math.sin(t * 4 + i)} fill={i % 3 ? VIO : YEL} stroke={INK} strokeWidth={3} opacity={prog(t, at + i * 0.06, at + i * 0.06 + 0.3)} />)}
    </svg>
  );
};
const Intro: React.FC = () => {
  const t = useT();
  const scan = prog(t, 7.8, 10.6, easeInOut);
  return (
    <Out end={13.05}>
      <HiLine words={['Comment', 'on', 'pense']} mark={[0, 1, 2]} at={2.7} y={330} size={70} />
      <Abs x={70} y={440} w={940} h={500} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `9px 9px 0 ${VIO}`, overflow: 'hidden', opacity: pop(t, 2.8)}}>
        <Neurones at={2.9} />
        <div style={{position: 'absolute', left: 18, top: 16}}><Mono at={3.8} c={VIO} size={20}>face aux risques réels</Mono></div>
      </Abs>
      <Abs x={240} y={980} w={600} h={300} style={{background: '#fff', border: `4px solid ${INK}`, borderRadius: 16, overflow: 'hidden', opacity: pop(t, 7.0)}}>
        <div style={{padding: 20, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: INK}}>CV · CANDIDAT HSE</div>
        {['ISO 45001 récitée', 'ISO 14001 récitée', 'Code du travail par cœur'].map((l, k) => <div key={l} style={{margin: '8px 20px', fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: scan * 4 > k + 1 ? RED : DIM}}>{scan * 4 > k + 1 ? '✗ ' : '· '}{l}</div>)}
        <div style={{position: 'absolute', left: 0, right: 0, top: scan * 300, height: 6, background: RED, boxShadow: `0 0 24px ${RED}`, opacity: scan > 0 && scan < 1 ? 1 : 0}} />
      </Abs>
      <Stamp at={11.5} c={RED} text="ne suffit pas" x={330} y={1180} rot={-5} size={50} />
    </Out>
  );
};
const Swipe: React.FC = () => {
  const t = useT();
  const l = prog(t, 14.9, 15.6, easeIn), r = prog(t, 15.9, 16.6, easeIn);
  return (
    <Out end={24.3}>
      <HiLine words={['L’intelligence', 'du', 'terrain']} mark={[0]} at={16.8} y={330} size={64} />
      {[{l: 'candidature rejetée', c: RED, p: l, dir: -1, ic: 'croix'}, {l: 'embauche', c: GREEN, p: r, dir: 1, ic: 'check'}].map((x, k) => (
        <div key={x.l} style={{position: 'absolute', left: 290 + x.dir * x.p * 700 + (k ? 20 : -20), top: 450 + k * 20 + Math.abs(x.p) * 80, width: 500, height: 360, background: '#fff', border: `6px solid ${INK}`, borderRadius: 26, boxShadow: `10px 10px 0 ${x.c}`, transform: `rotate(${x.dir * x.p * 25 + (k ? 3 : -3)}deg)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 13.2 + k * 0.3) * (1 - prog(t, 16.6, 17.0)), zIndex: 2 - k}}>
          <F n={x.ic} size={120} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: x.c}}>{x.l}</div>
        </div>
      ))}
      {t > 17.0 && <Abs x={0} y={470} w={1080}><Board text="TERRAIN" at={17.2} h={100} c={GREEN} stag={0.04} /></Abs>}
      {t > 17.0 && <Blinds src="zones/chantier.jpg" x={110} y={620} w={860} h={420} at={18.4} pos="50% 40%"><div style={{position: 'absolute', left: 16, top: 16}}><Mono at={19.4} c={INK} size={20}>un vrai site de travail</Mono></div></Blinds>}
      <Abs x={0} y={1080} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={21.0} c={ORANGE} size={30}>complexe</Pill><Pill at={21.6} c={VIO} size={30}>désordonnée</Pill><Pill at={22.4} c={TEAL} size={30}>très humaine</Pill></Abs>
    </Out>
  );
};
const Decryptage: React.FC = () => {
  const t = useT();
  return (
    <Out end={42.7}>
      <HiLine words={['Un', 'décryptage', 'stratégique']} mark={[1]} at={24.8} y={330} size={64} />
      <Abs x={0} y={440} w={1080} style={{textAlign: 'center', opacity: pop(t, 28.4)}}><div style={{display: 'inline-flex', alignItems: 'center', gap: 16, position: 'relative'}}><F n="livres" size={80} /><span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: DIM}}>le simple bachotage<Strike p={prog(t, 29.2, 29.8)} c={RED} /></span></div></Abs>
      <Abs x={70} y={570} w={940} style={{display: 'flex', flexDirection: 'column', gap: 18}}>
        {[{l: 'les attentes non dites', ic: 'yeux', a: 31.0, c: BLUE}, {l: 'la psychologie de la sécurité', ic: 'cerveau', a: 32.6, c: VIO}, {l: 'de vraies stratégies', ic: 'cible', a: 35.1, c: ORANGE}].map((x) => (
          <Brut key={x.l} x={0} y={0} w={940} h={140} at={x.a} sh={x.c} style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 24}}><F n={x.ic} size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>{x.l}</div></Brut>
        ))}
      </Abs>
      <Abs x={0} y={1080} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20}}>
        <div style={{opacity: pop(t, 38.2) * (1 - prog(t, 40.0, 40.5)), fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: DIM}}>questions ↔ réponses</div>
        {t > 40.0 && <div style={{display: 'flex', alignItems: 'center', gap: 14, transform: `scale(${Math.max(0, Math.min(1, spring(t, 40.1, 8, 10)))})`}}><F n="trophee" size={100} /><Pill at={40.1} c={GOLD} size={32}>expertise incontestable</Pill></div>}
      </Abs>
    </Out>
  );
};
const Plan: React.FC = () => {
  const t = useT();
  return (
    <Out end={62.1}>
      <HiLine words={['La', 'feuille', 'de', 'route']} mark={[1, 2, 3]} at={43.0} y={330} size={64} />
      <Abs x={90} y={440} w={900} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
        {SECT.slice(0, 5).map((x, k) => (
          <Brut key={k} x={0} y={0} w={900} h={130} at={[44.7, 47.3, 50.3, 52.5, 55.1][k]} sh={x.c} style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 20}}><Tile ch={x.n} size={80} c={x.c} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>{x.title}</div></Brut>
        ))}
      </Abs>
      {t > 59.1 && <Abs x={0} y={1180} w={1080} style={{textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 46, letterSpacing: 6, color: GREEN, transform: `scale(${Math.max(0, Math.min(1, spring(t, 59.2, 9, 12)))})`}}>C’EST PARTI !</Abs>}
    </Out>
  );
};

/* ═════════════ PARTIE 1 ═════════════ */
const Tour: React.FC = () => {
  const t = useT();
  const B = [{l: 'normes', a: 75.7, c: '#9AA6B8'}, {l: 'audits', a: 76.3, c: '#9AA6B8'}, {l: 'permis de travail', a: 76.9, c: '#9AA6B8'}];
  const H = [{l: 'leadership', a: 85.9, c: BLUE}, {l: 'pédagogie', a: 86.9, c: VIO}, {l: 'gestion des conflits', a: 87.6, c: TEAL}];
  const walk = prog(t, 80.9, 82.6);
  const tact = prog(t, 90.5, 91.4, easeOut), ferm = prog(t, 91.8, 92.6, easeOut);
  return (
    <Out end={95.1}>
      <HiLine words={['La', 'théorie', 'et', 'l’humain']} mark={[1, 3]} at={65.6} y={330} size={66} />
      <Abs x={60} y={440} w={560} h={800}>
        {B.map((b, k) => {const p = Math.max(0, Math.min(1, spring(t, b.a, 9, 11))); return <div key={b.l} style={{position: 'absolute', left: 0, right: 0, bottom: k * 120, height: 110, background: b.c, border: `5px solid ${INK}`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 34, transform: `translateY(${(1 - p) * -600}px)`, opacity: t >= b.a ? 1 : 0}}>{b.l}</div>;})}
        {H.map((b, k) => {const p = Math.max(0, Math.min(1, spring(t, b.a, 9, 11))); return <div key={b.l} style={{position: 'absolute', left: 30, right: 30, bottom: 380 + k * 120, height: 110, background: b.c, border: `5px solid ${INK}`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 34, transform: `translateY(${(1 - p) * -600}px)`, opacity: t >= b.a ? 1 : 0}}>{b.l}</div>;})}
        <div style={{position: 'absolute', left: 0, bottom: 360, opacity: pop(t, 77.9)}}><Mono at={77.9} c={INK} size={20}>le ticket d’entrée</Mono></div>
      </Abs>
      <Abs x={650} y={460} w={370} h={360} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `7px 7px 0 ${RED}`, overflow: 'hidden', opacity: pop(t, 80.6)}}>
        <div style={{position: 'absolute', left: lerp(-40, 200, walk), top: 80, transform: `rotate(${Math.sin(t * 14) * 6}deg)`}}><F n="livres" size={120} /><div style={{display: 'flex', gap: 22, marginLeft: 30, marginTop: -6}}>{[0, 1].map((k) => <div key={k} style={{width: 10, height: 50, background: INK, borderRadius: 5, transform: `rotate(${Math.sin(t * 14 + k * 3) * 25}deg)`, transformOrigin: '50% 0'}} />)}</div></div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK}}>un dictionnaire sur pattes</div>
        {t > 81.7 && <svg width={370} height={360} style={{position: 'absolute', inset: 0}}><line x1={30} y1={30} x2={30 + 310 * prog(t, 81.7, 82.1)} y2={30 + 300 * prog(t, 81.7, 82.1)} stroke={RED} strokeWidth={14} strokeLinecap="round" /></svg>}
      </Abs>
      <Abs x={650} y={860} w={370} h={340} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `7px 7px 0 ${BLUE}`, padding: 24, boxSizing: 'border-box', opacity: pop(t, 89.0)}}>
        <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM}}>LE MESSAGE SÉCURITÉ</div>
        {[{l: 'tact', p: tact, c: TEAL}, {l: 'fermeté', p: ferm, c: RED}].map((x) => (
          <div key={x.l} style={{marginTop: 34}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>{x.l}</div>
            <div style={{position: 'relative', height: 16, background: '#E3E8EF', borderRadius: 8, marginTop: 10}}><div style={{width: `${x.p * 85}%`, height: '100%', background: x.c, borderRadius: 8}} /><div style={{position: 'absolute', left: `calc(${x.p * 85}% - 18px)`, top: -12, width: 36, height: 36, borderRadius: 18, background: '#fff', border: `5px solid ${x.c}`}} /></div>
          </div>
        ))}
      </Abs>
    </Out>
  );
};
const Bases: React.FC = () => {
  const t = useT();
  const T4 = [{l: 'danger vs risque', ic: 'danger', a: 105.9, hi: true}, {l: 'accident vs incident', ic: 'collision', a: 106.4, hi: false}, {l: 'arbre des causes', ic: 'arbre', a: 108.0, hi: true}, {l: 'normes ISO', ic: 'clipboard', a: 108.5, hi: false}];
  return (
    <Out end={113.9}>
      <HiLine words={['Des', 'fondations', 'en', 'béton']} mark={[1, 3]} at={95.4} y={330} size={64} />
      <SearchOpen x={60} y={440} w={960} h={800} at={97.0} query="danger ou risque ?" results={['Modèle de lettre de motivation', 'Réviser les bases HSE', 'Salaires moyens en HSE']} found={1} foundAt={102.4} clickAt={103.0} c={BLUE}>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 24, padding: 30}}>
          {T4.map((x) => (
            <div key={x.l} style={{width: 410, height: 250, borderRadius: 22, border: `5px solid ${INK}`, background: x.hi && t > x.a ? `${BLUE}18` : '#fff', boxShadow: `7px 7px 0 ${x.hi ? BLUE : '#C9D2DF'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: pop(t, x.a - 1.5), transform: `scale(${x.hi && t > x.a ? 1.04 : 1})`}}>
              <F n={x.ic} size={110} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>{x.l}</div>
            </div>
          ))}
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 40, textAlign: 'center', opacity: pop(t, 109.2)}}><Pill at={109.2} c={GREEN} size={32}>expliqué de manière ultra simple</Pill></div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 120, textAlign: 'center'}}><span style={{position: 'relative', fontFamily: MONO, fontWeight: 700, fontSize: 28, color: DIM, opacity: pop(t, 111.8)}}>jargon incompréhensible<Strike p={prog(t, 112.4, 112.9)} c={RED} /></span></div>
      </SearchOpen>
    </Out>
  );
};
const Equilibre: React.FC = () => {
  const t = useT();
  const cut = prog(t, 115.2, 115.8);
  const bal = prog(t, 119.3, 121.6, easeInOut);
  return (
    <Out end={123.1}>
      <HiLine words={['Le', 'vrai', 'graal']} mark={[2]} at={117.1} y={330} size={70} />
      <Abs x={140} y={450} w={800} h={260} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${RED}`, opacity: pop(t, 113.9)}}>
        <div style={{position: 'absolute', left: 60, top: 70}}><F n="ouvrier" size={120} /></div><div style={{position: 'absolute', right: 60, top: 70}}><F n="auditeur" size={120} /></div>
        <svg width={800} height={260} style={{position: 'absolute', inset: 0}}><path d={`M200 130 Q300 ${130 - 40} 400 130`} stroke={cut > 0.5 ? DIM : GREEN} strokeWidth={8} fill="none" strokeDasharray={cut > 0.5 ? '14 12' : '0'} /><path d={`M400 130 Q500 ${130 + 40 * cut} 600 ${130 + 60 * cut}`} stroke={cut > 0.5 ? DIM : GREEN} strokeWidth={8} fill="none" strokeDasharray={cut > 0.5 ? '14 12' : '0'} /></svg>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 14, textAlign: 'center'}}><Mono at={113.9} c={RED} size={20}>{cut > 0.5 ? 'le recruteur décroche' : 'technique floue…'}</Mono></div>
      </Abs>
      <Abs x={140} y={760} w={800} h={430} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${GREEN}`, padding: 34, boxSizing: 'border-box', opacity: pop(t, 118.0)}}>
        {[{l: 'la rigueur de l’ingénieur', ic: 'equerre', p: lerp(0.95, 0.5, bal), c: NAVY}, {l: 'la clarté du pédagogue', ic: 'formatrice', p: lerp(0.15, 0.5, bal), c: ORANGE}].map((x) => (
          <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 26}}>
            <F n={x.ic} size={80} />
            <div style={{flex: 1}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>{x.l}</div><div style={{height: 22, background: '#E3E8EF', borderRadius: 11, marginTop: 10, overflow: 'hidden'}}><div style={{width: `${x.p * 100}%`, height: '100%', background: x.c}} /></div></div>
          </div>
        ))}
        {bal > 0.95 && <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 50, color: GREEN}}>l’équilibre parfait ✓</div>}
      </Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 2 : prisme 3D des secteurs ═════════════ */
const FACES = [{l: 'agroalimentaire', s: 'contamination · HACCP', ic: ['assiette', 'microbe'], c: GREEN}, {l: 'BTP', s: 'hauteur · levage', ic: ['echelle', 'grue'], c: ORANGE}, {l: 'pétrole', s: 'étincelle · espace confiné', ic: ['etincelles', 'feu'], c: RED}];
const Prisme: React.FC = () => {
  const t = useT();
  const rot = prog(t, 146.6, 147.4, easeInOut) * 120 + prog(t, 152.2, 153.0, easeInOut) * 120;
  const boom = t - 156.6;
  const shake = boom > 0 && boom < 0.6 ? Math.sin(boom * 80) * 16 * (1 - boom / 0.6) : 0;
  return (
    <Out end={165.4}>
      <HiLine words={['Une', 'préparation', 'sur', 'mesure']} mark={[1, 3]} at={128.8} y={330} size={60} />
      <AbsoluteFill style={{transform: `translate(${shake}px, ${shake * 0.5}px)`}}>
        <Abs x={0} y={440} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14, opacity: pop(t, 132.3) * (1 - prog(t, 139.8, 140.3))}}><F n="epingle" size={70} /><Pill at={133.9} c={INK} size={30}>la sécurité ne flotte pas dans le vide</Pill></Abs>
        <AbsoluteFill style={{perspective: 1800}}>
          <div style={{position: 'absolute', left: 540, top: 820, transformStyle: 'preserve-3d', transform: `rotateY(${-rot}deg)`, opacity: pop(t, 140.3)}}>
            {FACES.map((f, k) => (
              <div key={f.l} style={{position: 'absolute', left: -280, top: -250, width: 560, height: 500, transform: `rotateY(${k * 120}deg) translateZ(162px)`, backfaceVisibility: 'hidden', background: '#fff', border: `7px solid ${INK}`, borderRadius: 26, boxShadow: `12px 12px 0 ${f.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12}}>
                <div style={{display: 'flex', gap: 20}}>{f.ic.map((i) => <F key={i} n={i} size={140} />)}</div>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: f.c}}>{f.l}</div>
                <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: INK}}>{f.s}</div>
              </div>
            ))}
          </div>
        </AbsoluteFill>
        {boom > 0 && boom < 0.5 && <AbsoluteFill style={{background: '#FFF6D6', opacity: 1 - boom * 2}} />}
        {boom > 0 && boom < 1.2 && [0, 0.25].map((d) => {const rk = (boom - d) / 0.9; return rk > 0 && rk < 1 ? <div key={d} style={{position: 'absolute', left: 540 - rk * 700, top: 820 - rk * 700, width: rk * 1400, height: rk * 1400, borderRadius: '50%', border: `${lerp(30, 2, rk)}px solid ${ORANGE}`, opacity: 0.6 * (1 - rk)}} /> : null;})}
        {t > 156.7 && t < 158.6 && <Stamp at={156.7} c={RED} text="explosion !" x={330} y={1100} rot={-6} size={64} />}
      </AbsoluteFill>
      {t > 158.6 && <Abs x={0} y={1110} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16}}><F n="cible" size={90} /><Pill at={159.5} c={ORANGE} size={30}>risques spécifiques cernés</Pill><Pill at={163.6} c={GREEN} size={30}>ce poste précis</Pill></Abs>}
    </Out>
  );
};
const Credibilite: React.FC = () => {
  const t = useT();
  const load = prog(t, 170.7, 171.3, easeOut);
  const JAR = ['HACCP', 'travail en hauteur', 'levage', 'espace confiné', 'contamination', 'permis de travail'];
  return (
    <Out end={180.65}>
      <HiLine words={['Une', 'équation', 'magique']} mark={[2]} at={166.1} y={330} size={66} />
      <Abs x={60} y={450} w={960} style={{display: 'flex', alignItems: 'center', gap: 16}}>
        <Brut x={0} y={0} w={420} h={200} at={168.9} sh={ORANGE} style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK}}>connaissance pointue du secteur</Brut>
        <div style={{opacity: pop(t, 170.0)}}><Tile ch="=" size={90} c={INK} /></div>
        <Brut x={0} y={0} w={420} h={200} at={170.7} sh={GREEN} style={{position: 'relative', textAlign: 'center'}}>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK}}>crédibilité instantanée</div>
          <div style={{height: 34, background: '#E3E8EF', borderRadius: 17, marginTop: 30, overflow: 'hidden', border: `3px solid ${INK}`}}><div style={{width: `${load * 100}%`, height: '100%', background: GREEN}} /></div>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: GREEN, marginTop: 6}}>{Math.round(load * 100)} %</div>
        </Brut>
      </Abs>
      <Abs x={60} y={720} w={960} h={420} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `8px 8px 0 ${BLUE}`, overflow: 'hidden', opacity: pop(t, 175.9)}}>
        <div style={{position: 'absolute', left: 18, top: 16}}><Mono at={176.0} c={BLUE} size={20}>parler le langage de l’industrie</Mono></div>
        {JAR.map((j, k) => {const p = prog(t, 176.3 + k * 0.3, 177.0 + k * 0.3, easeOut); return <div key={j} style={{position: 'absolute', left: lerp(-300, 40 + (k % 2) * 450, p), top: 80 + Math.floor(k / 2) * 80, background: [GREEN, ORANGE, BLUE, RED, VIO, TEAL][k], color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 28, padding: '12px 20px', borderRadius: 30, whiteSpace: 'nowrap'}}>{j}</div>;})}
        <div style={{position: 'absolute', right: 40, bottom: 20, transform: `translateY(${(1 - Math.max(0, Math.min(1, spring(t, 179.2, 8, 9)))) * -300}px)`, opacity: t > 179.2 ? 1 : 0}}><F n="chaussure" size={120} /></div>
        <div style={{position: 'absolute', left: 40, bottom: 30, fontFamily: handFont, fontWeight: 700, fontSize: 44, color: INK, opacity: pop(t, 179.3)}}>un pied sur le terrain</div>
      </Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 3 : STAR ═════════════ */
const Concret: React.FC = () => {
  const t = useT();
  return (
    <Out end={199.0}>
      {t < 190.1 ? <HiLine words={['Structurer', 'son', 'vécu']} mark={[2]} at={184.3} y={330} size={66} /> : <HiLine words={['Ils', 'veulent', 'du', 'concret']} mark={[3]} at={190.2} y={330} size={66} />}
      <Abs x={60} y={450} w={460} h={560} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `7px 7px 0 ${DIM}`, overflow: 'hidden', opacity: pop(t, 188.4)}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 30 - ((t - 188) * 60) % 200}}>{Array.from({length: 14}, (_, k) => <div key={k} style={{height: 14, background: '#D9DFE8', borderRadius: 7, margin: '22px 30px', width: `${60 + (k % 4) * 9}%`}} />)}</div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center'}}><Mono at={190.0} c={DIM} size={20}>grands discours théoriques</Mono></div>
        <div style={{position: 'absolute', left: 170, top: 200, opacity: pop(t, 191.0)}}><F n="fatigue" size={120} /></div>
      </Abs>
      <Brut x={560} y={450} w={460} h={560} at={194.6} sh={GREEN} style={{textAlign: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 40}}><F n="outils" size={180} /></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK, marginTop: 20}}>raconter comment on a mis en pratique</div>
        <div style={{marginTop: 20}}><Pill at={197.3} c={GREEN} size={30}>ça change la donne</Pill></div>
      </Brut>
    </Out>
  );
};
const Star: React.FC = () => {
  const t = useT();
  const L = [{c: 'S', l: 'situation', s: 'le contexte', a: 204.3, col: BLUE}, {c: 'T', l: 'tâche', s: 'le défi à relever', a: 207.1, col: VIO}, {c: 'A', l: 'action', s: 'ses propres initiatives', a: 210.0, col: ORANGE}, {c: 'R', l: 'résultat', s: 'chiffres à l’appui', a: 214.9, col: GREEN}];
  const proof = prog(t, 222.6, 223.3, easeInOut);
  return (
    <Out end={224.85}>
      <HiLine words={['La', 'méthode', 'STAR']} mark={[2]} at={199.6} y={330} size={70} />
      <Abs x={60} y={450} w={960} style={{display: 'flex', justifyContent: 'space-between'}}>
        {L.map((x) => {const flip = prog(t, x.a, x.a + 0.6, easeInOut); return (
          <div key={x.c} style={{width: 225, height: 420, perspective: 900, opacity: pop(t, 201.5)}}>
            <div style={{position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d', transform: `rotateY(${flip * 180}deg)`}}>
              <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Tile ch={x.c} size={200} c={x.col} /></div>
              <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: '#fff', border: `6px solid ${INK}`, borderRadius: 20, boxShadow: `7px 7px 0 ${x.col}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 14, boxSizing: 'border-box', textAlign: 'center'}}>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: x.col, lineHeight: 1}}>{x.c}</div>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, marginTop: 10}}>{x.l}</div>
                <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 22, color: DIM, marginTop: 8}}>{x.s}</div>
              </div>
            </div>
          </div>
        );})}
      </Abs>
      <Abs x={60} y={920} w={960} h={300} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${VIO}`, overflow: 'hidden', opacity: pop(t, 216.5)}}>
        {[0.3, 0.45, 0.62, 0.85].map((v, k) => <div key={k} style={{position: 'absolute', left: 60 + k * 110, bottom: 30, width: 80, height: 220 * v * prog(t, 216.6 + k * 0.15, 217.4 + k * 0.15, easeOut), background: GREEN, border: `4px solid ${INK}`, borderRadius: '8px 8px 0 0'}} />)}
        <div style={{position: 'absolute', left: 540, top: 60, width: 360, height: 180}}>
          <div style={{position: 'absolute', inset: 0, background: '#F4F6FA', border: `4px solid ${INK}`, borderRadius: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: DIM, opacity: pop(t, 220.6) * (1 - proof), transform: `scale(${1 - proof * 0.2})`}}>une anecdote…</div>
          {proof > 0 && <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${lerp(1.6, 1, proof)}) rotate(-6deg)`, opacity: proof}}><div style={{padding: '12px 26px', border: `7px solid ${GREEN}`, borderRadius: 14, color: GREEN, background: 'rgba(255,255,255,0.95)', fontFamily: sansFont, fontWeight: 900, fontSize: 44}}>PREUVE ✓</div></div>}
        </div>
      </Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 4 : le mur, la bulle, la mise en situation ═════════════ */
const Mur: React.FC = () => {
  const t = useT();
  const run = prog(t, 232.3, 233.6, easeIn);
  const hit = t - 233.6;
  const shake = hit > 0 && hit < 0.5 ? Math.sin(hit * 70) * 12 * (1 - hit / 0.5) : 0;
  const pop2 = prog(t, 255.9, 256.3);
  const phase2 = t >= 243.9;
  return (
    <Out end={260.0}>
      <HiLine words={phase2 ? ['La', 'mentalité', 'de', 'terrain'] : ['L’épreuve', 'de', 'la', 'réalité']} mark={[phase2 ? 1 : 0]} at={phase2 ? 244.1 : 229.6} y={330} size={62} />
      {!phase2 && (
        <AbsoluteFill style={{transform: `translate(${shake}px, 0)`}}>
          <Abs x={60} y={450} w={960} h={600} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `8px 8px 0 ${RED}`, overflow: 'hidden', opacity: pop(t, 229.8)}}>
            {Array.from({length: 6}, (_, r) => Array.from({length: 3}, (_, c) => <div key={`${r}${c}`} style={{position: 'absolute', left: 660 + c * 95 + (r % 2) * 45, top: 40 + r * 90, width: 90, height: 84, background: `linear-gradient(180deg, #E06A4E, ${BURG})`, border: `3px solid ${INK}`, borderRadius: 6}} />))}
            <div style={{position: 'absolute', left: 690, top: 260, transform: 'rotate(-90deg)', fontFamily: MONO, fontWeight: 900, fontSize: 30, color: '#fff', whiteSpace: 'nowrap', transformOrigin: '50% 50%'}}>THÉORIE PURE</div>
            <div style={{position: 'absolute', left: lerp(40, 520, run) - (hit > 0 ? Math.min(hit, 0.3) * 200 : 0), top: 300, transform: `rotate(${hit > 0 ? -Math.min(hit, 0.4) * 60 : 0}deg)`}}><F n="pas" size={120} /></div>
            {hit > 0 && hit < 2 && Array.from({length: 5}, (_, k) => <div key={k} style={{position: 'absolute', left: 560 + Math.cos(t * 4 + k * 1.3) * 60, top: 260 + Math.sin(t * 4 + k * 1.3) * 30}}><F n="etoile" size={40} /></div>)}
            <div style={{position: 'absolute', left: 50, top: 100, transform: `translate(${prog(t, 239.3, 240.6) * 260}px, ${-Math.sin(prog(t, 239.3, 240.6) * Math.PI) * 120}px) rotate(${prog(t, 239.3, 240.6) * 220}deg)`, opacity: pop(t, 239.3)}}><F n="parchemin" size={100} /></div>
            <div style={{position: 'absolute', left: 18, bottom: 16}}><Mono at={240.3} c={RED} size={20}>un article de loi ≠ une réponse</Mono></div>
          </Abs>
          <Stamp at={241.2} c={RED} text="déconnexion totale" x={220} y={1080} rot={-5} size={50} />
        </AbsoluteFill>
      )}
      {phase2 && (
        <>
          <Abs x={60} y={450} w={960} style={{display: 'flex', justifyContent: 'space-between'}}>
            {[{l: 'pression de la production', a: 250.0, c: ORANGE}, {l: 'délais impossibles', a: 251.2, c: RED}, {l: 'comportements humains', a: 252.6, c: VIO}].map((g) => {const v = prog(t, g.a, g.a + 1.0, easeOut); return (
              <div key={g.l} style={{width: 300, height: 340, background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `7px 7px 0 ${g.c}`, textAlign: 'center', opacity: pop(t, g.a - 0.3)}}>
                <svg width={290} height={190} style={{marginTop: 20}}><path d="M45 160 A100 100 0 0 1 245 160" fill="none" stroke="#E3E8EF" strokeWidth={24} /><path d="M45 160 A100 100 0 0 1 245 160" fill="none" stroke={g.c} strokeWidth={24} strokeDasharray={315} strokeDashoffset={315 * (1 - v * 0.85)} /><g transform={`rotate(${lerp(-90, 65, v)} 145 160)`}><line x1={145} y1={160} x2={145} y2={80} stroke={INK} strokeWidth={8} strokeLinecap="round" /></g></svg>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, padding: '0 16px'}}>{g.l}</div>
              </div>
            );})}
          </Abs>
          <Abs x={340} y={840} w={400} h={400}>
            {pop2 < 1 && <div style={{position: 'absolute', left: 50, top: 30, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95), rgba(191,215,234,0.55) 60%, rgba(109,75,216,0.25))', border: '4px solid rgba(109,75,216,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + pop2 * 0.3})`, opacity: pop(t, 254.0) * (1 - pop2)}}><F n="bouclier" size={110} /></div>}
            {pop2 > 0 && Array.from({length: 14}, (_, k) => {const a = (k / 14) * Math.PI * 2; const q = prog(t, 255.9, 256.8); return <div key={k} style={{position: 'absolute', left: 200 + Math.cos(a) * 180 * q, top: 180 + Math.sin(a) * 180 * q, width: 16, height: 16, borderRadius: 8, background: k % 2 ? VIO : GLASS, opacity: 1 - q}} />;})}
            {pop2 > 0.5 && <div style={{position: 'absolute', left: 0, right: 0, top: 150, textAlign: 'center'}}><Pill at={256.4} c={GREEN} size={30}>cohabiter avec le réel</Pill></div>}
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 10, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 20, color: VIO, opacity: pop(t, 254.0) * (1 - pop2)}}>une bulle coupée du monde ?</div>
          </Abs>
        </>
      )}
    </Out>
  );
};
const Bubble: React.FC<{who: string; txt: string; at: number; right?: boolean; c: string; ic: string}> = ({who, txt, at, right, c, ic}) => {
  const t = useT();
  const p = Math.max(0, Math.min(1, spring(t, at, 9, 12)));
  return (
    <div style={{display: 'flex', flexDirection: right ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: 14, marginTop: 22, opacity: t >= at ? 1 : 0, transform: `translateY(${(1 - p) * 30}px) scale(${0.9 + 0.1 * p})`}}>
      <F n={ic} size={80} />
      <div style={{maxWidth: 620, background: right ? c : '#F1F4F8', color: right ? '#fff' : INK, border: `4px solid ${INK}`, borderRadius: 26, padding: '16px 22px', fontFamily: sansFont, fontWeight: 800, fontSize: 30}}><div style={{fontFamily: MONO, fontSize: 18, opacity: 0.7}}>{who}</div>{txt}</div>
    </div>
  );
};
const MiseEnSituation: React.FC = () => {
  const t = useT();
  const bam = t - 270.4;
  const typing = t > 271.2 && t < 274.3;
  return (
    <Out end={286.7}>
      <HiLine words={['Un', 'test', 'de', 'pression']} mark={[3]} at={260.0} y={330} size={66} />
      <SearchOpen x={60} y={440} w={960} h={800} at={260.2} query="mise en situation HSE" results={['Fiche de poste type', 'Le superviseur pressé par les délais', 'Grille d’évaluation des EPI']} found={1} foundAt={262.6} clickAt={263.2} c={RED}>
        <div style={{padding: '10px 30px'}}>
          <Bubble who="SUPERVISEUR" txt="On continue ce travail, il faut tenir les délais !" at={264.5} c={RED} ic="superviseur" />
          <Bubble who="RECRUTEUR" txt="Que faites-vous ?" at={269.3} right c={BLUE} ic="auditeur" />
          {typing && <div style={{display: 'flex', gap: 10, marginTop: 24, marginLeft: 100}}>{[0, 1, 2].map((k) => <div key={k} style={{width: 18, height: 18, borderRadius: 9, background: DIM, transform: `translateY(${Math.sin(t * 10 + k) * 6}px)`}} />)}</div>}
          {t > 274.3 && (
            <div style={{display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 26}}>
              <Pill at={275.4} c={TEAL} size={30}>courage professionnel</Pill>
              <Pill at={278.4} c={BLUE} size={30}>❄ la tête froide</Pill>
              <Pill at={280.3} c={VIO} size={30}>analyser sous tension</Pill>
            </div>
          )}
          {t > 282.0 && (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30, marginTop: 30, opacity: pop(t, 282.0)}}>
              <div style={{textAlign: 'center'}}><F n="stop" size={100} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: RED}}>arrêt immédiat</div></div>
              <F n="balance" size={110} />
              <div style={{textAlign: 'center'}}><F n="usine" size={100} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK}}>impératifs de la boîte</div></div>
            </div>
          )}
        </div>
        {bam > 0 && bam < 1.0 && <div style={{position: 'absolute', left: 560, top: 230, transform: `scale(${lerp(0.3, 1.1, Math.min(1, bam * 5))}) rotate(-8deg)`, opacity: 1 - Math.max(0, bam - 0.6) * 2.5}}><svg width={300} height={200} viewBox="-150 -100 300 200"><polygon points={Array.from({length: 16}, (_, k) => {const a = (k / 16) * Math.PI * 2; const r = k % 2 ? 60 : 110; return `${Math.cos(a) * r * 1.3},${Math.sin(a) * r * 0.8}`;}).join(' ')} fill={YEL} stroke={INK} strokeWidth={6} /><text x={0} y={18} textAnchor="middle" fontFamily="sans-serif" fontWeight={900} fontSize={60} fill={RED}>BAM !</text></svg></div>}
      </SearchOpen>
    </Out>
  );
};
const Regle: React.FC = () => {
  const t = useT();
  const infl = lerp(0.8, 0.04, prog(t, 300.5, 302.8, easeIn));
  const good = prog(t, 304.8, 306.4);
  return (
    <Out end={309.3}>
      <HiLine words={['La', 'règle', 'd’or']} mark={[2]} at={287.2} y={330} size={70} />
      <Abs x={60} y={450} w={960} style={{display: 'flex', justifyContent: 'space-between'}}>
        {[{l: 'communiquer', ic: 'megaphone', a: 294.3}, {l: 'expliquer', ic: 'tableau', a: 295.9}, {l: 'écouter', ic: 'haut-parleur', a: 297.0}, {l: 'convaincre', ic: 'poignee', a: 297.6}].map((x) => <Brut key={x.l} x={0} y={0} w={225} h={220} at={x.a} sh={BLUE} style={{position: 'relative', textAlign: 'center', padding: 14}}><F n={x.ic} size={100} style={{margin: '0 auto'}} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, marginTop: 6}}>{x.l}</div></Brut>)}
      </Abs>
      <Abs x={60} y={720} w={960} h={480} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `8px 8px 0 ${good > 0.5 ? GREEN : RED}`, overflow: 'hidden', opacity: pop(t, 298.7)}}>
        <div style={{position: 'absolute', left: 40, top: 60, textAlign: 'center', opacity: 1 - good}}><F n="sirene" size={130} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: RED}}>le « policier »</div></div>
        <div style={{position: 'absolute', left: 260, right: 40, top: 90}}>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>INFLUENCE SUR LE TERRAIN</div>
          <div style={{height: 40, background: '#E3E8EF', borderRadius: 20, marginTop: 14, overflow: 'hidden', border: `3px solid ${INK}`}}><div style={{width: `${lerp(infl, 0.95, good) * 100}%`, height: '100%', background: good > 0.5 ? GREEN : RED}} /></div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: good > 0.5 ? GREEN : RED, marginTop: 10}}>{good > 0.5 ? 'influence positive' : infl < 0.1 ? 'proche du néant' : '…'}</div>
        </div>
        {good > 0 && [0, 1, 2].map((k) => {const rk = ((t - 304.8 - k * 0.5) % 1.5) / 1.5; return <div key={k} style={{position: 'absolute', left: 500 - rk * 300, top: 330 - rk * 120, width: rk * 600, height: rk * 240, borderRadius: '50%', border: `4px solid ${GREEN}`, opacity: 0.5 * (1 - rk)}} />;})}
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 30, textAlign: 'center', display: 'flex', justifyContent: 'center', gap: 16, alignItems: 'center'}}>
          <span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: DIM, opacity: pop(t, 307.3)}}>imposer par la force<Strike p={prog(t, 307.9, 308.4)} c={RED} /></span>
        </div>
      </Abs>
    </Out>
  );
};
const Friction: React.FC = () => {
  const t = useT();
  const sw = prog(t, 324.6, 325.4, easeInOut);
  return (
    <Out end={327.2}>
      <HiLine words={['Les', 'zones', 'de', 'friction']} mark={[1, 3]} at={310.4} y={330} size={64} />
      <Abs x={60} y={450} w={960} style={{display: 'flex', gap: 20}}>
        <Brut x={0} y={0} w={470} h={380} at={313.5} sh={ORANGE} style={{position: 'relative', textAlign: 'center'}}><div style={{display: 'flex', justifyContent: 'center', gap: 10}}><F n="ouvrier" size={120} /><F n="casque" size={100} style={{filter: 'grayscale(1)', transform: `rotate(${Math.sin(t * 5) * 10}deg)`}} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK, marginTop: 16}}>refuse de porter ses EPI</div></Brut>
        <Brut x={0} y={0} w={470} h={380} at={316.4} sh={RED} style={{position: 'relative', textAlign: 'center'}}><div style={{display: 'flex', justifyContent: 'center', gap: 10}}><F n="anxieux" size={120} /><F n="ambulance" size={110} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK, marginTop: 16}}>panique après un accident</div></Brut>
      </Abs>
      <Abs x={0} y={880} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={322.2} c={TEAL} size={30}>imperturbable</Pill><Pill at={323.4} c={BLUE} size={30}>méthodique</Pill></Abs>
      <Abs x={190} y={990} w={700} h={200} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 100, boxShadow: `8px 8px 0 ${sw > 0.5 ? GREEN : RED}`, opacity: pop(t, 324.0)}}>
        <div style={{position: 'absolute', left: 60, top: 70, fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: sw > 0.5 ? DIM : RED}}>sanctionner</div>
        <div style={{position: 'absolute', right: 60, top: 70, fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: sw > 0.5 ? GREEN : DIM}}>persuader</div>
        <div style={{position: 'absolute', left: lerp(270, 330, sw) , top: 40, width: 100, height: 120, borderRadius: 50, background: sw > 0.5 ? GREEN : RED, border: `5px solid ${INK}`}} />
      </Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 5 : attitude ═════════════ */
const Alarmes: React.FC = () => {
  const t = useT();
  const door = prog(t, 352.1, 353.1, easeInOut);
  const phase2 = t >= 354.3;
  return (
    <Out end={365.8}>
      <HiLine words={phase2 ? ['L’humilité', 'non', 'négociable'] : t < 340.8 ? ['Le', 'savoir-être'] : ['Les', 'pires', 'signaux', 'd’alarme']} mark={[phase2 ? 0 : t < 340.8 ? 1 : 2]} at={phase2 ? 354.4 : t < 340.8 ? 331.2 : 340.9} y={330} size={60} />
      {t < 340.8 && (
        <Abs x={60} y={560} w={960} style={{display: 'flex', justifyContent: 'center', gap: 12}}>
          {'POSTURE'.split('').map((ch, k) => <div key={k} style={{opacity: pop(t, 338.0 + k * 0.08), transform: `translateY(${(1 - pop(t, 338.0 + k * 0.08)) * -80}px)`}}><Tile ch={ch} size={110} c={TEAL} /></div>)}
        </Abs>
      )}
      {!phase2 && t >= 340.8 && (
        <>
          <Abs x={60} y={450} w={600} style={{display: 'flex', flexDirection: 'column', gap: 18}}>
            {[{l: 'démolir son ancien employeur', a: 343.1}, {l: 's’énerver face à une question piège', a: 346.0}, {l: 'jouer au super expert arrogant', a: 349.6}].map((x) => (
              <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 16, background: '#fff', border: `4px solid ${INK}`, borderRadius: 16, padding: '16px 18px', boxShadow: `6px 6px 0 ${RED}`, opacity: pop(t, x.a), transform: `translateX(${(1 - pop(t, x.a)) * -60}px)`}}>
                <svg width={60} height={70}><line x1={10} y1={5} x2={10} y2={68} stroke={INK} strokeWidth={6} /><path d={`M12 8 Q30 ${2 + Math.sin(t * 8) * 6} 56 10 L56 34 Q30 ${30 + Math.sin(t * 8 + 1) * 6} 12 32 Z`} fill={RED} stroke={INK} strokeWidth={3} /></svg>
                <div style={{flex: 1, fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK}}>{x.l}</div>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: RED}}>✗</div>
              </div>
            ))}
          </Abs>
          <Abs x={700} y={450} w={320} h={560} style={{opacity: pop(t, 350.5)}}>
            <div style={{position: 'absolute', left: 30, top: 0, width: 260, height: 70, background: GREEN, border: `5px solid ${INK}`, borderRadius: 10, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>SORTIE →</div>
            <div style={{position: 'absolute', left: 30, top: 90, width: 260, height: 440, background: '#EAF1F8', border: `5px solid ${INK}`}}>
              <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #B98A4A, #D9AF6E)', transformOrigin: '0 50%', transform: `perspective(800px) rotateY(${-door * 70}deg)`, border: `4px solid ${INK}`}} />
            </div>
          </Abs>
        </>
      )}
      {phase2 && (
        <>
          <Abs x={0} y={460} w={1080}><Board text="HUMILITE" at={354.5} h={96} c={TEAL} stag={0.04} /></Abs>
          <Abs x={110} y={640} w={860} h={460} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `8px 8px 0 ${TEAL}`, overflow: 'hidden', opacity: pop(t, 357.0)}}>
            <Img src={PH('zones/chantier.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) brightness(0.8)'}} />
            {(() => {const lx = lerp(100, 700, prog(t, 358.4, 360.4, easeInOut)); return <div style={{position: 'absolute', inset: 0, clipPath: `circle(150px at ${lx}px 230px)`}}><Img src={PH('zones/chantier.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>;})()}
            <div style={{position: 'absolute', left: 18, top: 16}}><Mono at={358.4} c={TEAL} size={20}>le terrain révèle la vérité</Mono></div>
          </Abs>
          <Abs x={0} y={1130} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14, alignItems: 'center', opacity: pop(t, 361.4)}}><F n="danger" size={80} /><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 48, color: RED}}>« j’ai tout vu » → le prochain incident</div></Abs>
        </>
      )}
    </Out>
  );
};
const Questions: React.FC = () => {
  const t = useT();
  return (
    <Out end={390.0}>
      <HiLine words={['Marquer', 'des', 'points']} mark={[2]} at={366.5} y={330} size={66} />
      <SearchOpen x={60} y={440} w={960} h={800} at={366.6} query="questions à poser au recruteur" results={['Comment négocier son salaire', 'Trois questions qui marquent des points', 'Tenue vestimentaire en entretien']} found={1} foundAt={369.3} clickAt={369.9} c={TEAL}>
        <div style={{padding: 30, display: 'flex', flexDirection: 'column', gap: 22}}>
          {[{l: 'Quels sont les gros défis du site ?', ic: 'montagne', a: 373.9}, {l: 'Comment s’organise la culture sécurité ?', ic: 'equipe', a: 376.3}, {l: 'Quels sont les projets brûlants ?', ic: 'feu', a: 379.8}].map((q) => (
            <div key={q.l} style={{display: 'flex', alignItems: 'center', gap: 20, background: '#fff', border: `5px solid ${INK}`, borderRadius: 20, padding: '18px 22px', boxShadow: `7px 7px 0 ${TEAL}`, opacity: pop(t, q.a), transform: `translateX(${(1 - pop(t, q.a)) * 60}px)`}}>
              <div style={{width: 70, height: 70, borderRadius: 35, background: TEAL, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>?</div>
              <F n={q.ic} size={80} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>{q.l}</div>
            </div>
          ))}
          <div style={{display: 'flex', justifyContent: 'center', gap: 14, marginTop: 10}}><Pill at={381.9} c={GREEN} size={30}>maturité</Pill><Pill at={385.7} c={BLUE} size={30}>motivation</Pill><Pill at={387.0} c={VIO} size={30}>vision stratégique</Pill></div>
          <div style={{textAlign: 'center'}}><span style={{position: 'relative', fontFamily: MONO, fontWeight: 700, fontSize: 26, color: DIM, opacity: pop(t, 384.0)}}>questions de façade<Strike p={prog(t, 384.6, 385.1)} c={RED} /></span></div>
        </div>
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ PARTIE 6 : puzzle, verbes, mémoire, STOP ═════════════ */
const Puzzle: React.FC = () => {
  const t = useT();
  const P = [{l: 'maturité', a: 397.3, c: BLUE, x: 0, y: 0}, {l: 'esprit de réflexion', a: 398.4, c: VIO, x: 1, y: 0}, {l: 'intelligence relationnelle', a: 400.2, c: TEAL, x: 0, y: 1}, {l: 'sens des responsabilités', a: 401.2, c: ORANGE, x: 1, y: 1}];
  const done = prog(t, 403.8, 404.6);
  return (
    <Out end={408.2}>
      <HiLine words={['Le', 'candidat', 'idéal']} mark={[2]} at={393.4} y={330} size={70} />
      <Abs x={0} y={440} w={1080} style={{textAlign: 'center', opacity: pop(t, 394.0)}}><span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: DIM}}>un empilement de certifications<Strike p={prog(t, 395.3, 395.8)} c={RED} /></span></Abs>
      <Abs x={190} y={520} w={700} h={640} style={{filter: done > 0 ? `drop-shadow(0 0 ${40 * done}px ${GOLD})` : undefined}}>
        {P.map((p) => {const q = Math.max(0, Math.min(1, spring(t, p.a, 8, 11))); return (
          <div key={p.l} style={{position: 'absolute', left: p.x * 350 + (1 - q) * (p.x ? 500 : -500), top: p.y * 320 + (1 - q) * (p.y ? 300 : -300), width: 350, height: 320, background: p.c, border: `6px solid ${INK}`, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, boxSizing: 'border-box', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff', opacity: t >= p.a ? 1 : 0, transform: `rotate(${(1 - q) * (p.x ? 30 : -30)}deg)`}}>{p.l}</div>
        );})}
        {done > 0 && <div style={{position: 'absolute', left: 280, top: 240, opacity: done, transform: `scale(${done})`}}><F n="medaille" size={140} /></div>}
      </Abs>
      <Abs x={0} y={1200} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 54, color: GREEN, opacity: pop(t, 404.9)}}>une vraie culture de la prévention</Abs>
    </Out>
  );
};
const Verbes: React.FC = () => {
  const t = useT();
  const V = [{w: 'AGIR', a: 417.7, c: BLUE, y: 560}, {w: 'ANTICIPER', a: 418.5, c: VIO, y: 730}, {w: 'PRÉVENIR', a: 419.1, c: GREEN, y: 900}];
  return (
    <Out end={426.8}>
      <HiLine words={['Pourquoi', 'tout', 'ça', '?']} mark={[0]} at={409.0} y={330} size={70} />
      <Abs x={0} y={450} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14, opacity: pop(t, 414.8) * (1 - prog(t, 417.4, 417.7))}}><Pill at={414.8} c={INK} size={34}>un seul et unique objectif</Pill></Abs>
      {V.map((v) => {const p = prog(t, v.a, v.a + 0.22, easeIn); const ring = (t - v.a - 0.22) / 0.8; return (
        <React.Fragment key={v.w}>
          {t > v.a && <Abs x={0} y={v.y} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-block', fontFamily: sansFont, fontWeight: 900, fontSize: 130, color: v.c, letterSpacing: -2, transform: `scale(${lerp(3, 1, p)})`, opacity: p, textShadow: `6px 6px 0 ${INK}`}}>{v.w}</div></Abs>}
          {ring > 0 && ring < 1 && <div style={{position: 'absolute', left: 540 - ring * 500, top: v.y + 70 - ring * 500, width: ring * 1000, height: ring * 1000, borderRadius: '50%', border: `10px solid ${v.c}`, opacity: 0.4 * (1 - ring)}} />}
        </React.Fragment>
      );})}
      <Abs x={0} y={1110} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 54, color: RED, opacity: pop(t, 420.5)}}>avant que le drame ne se produise</Abs>
      {t > 421.9 && <Abs x={240} y={1190} w={600} h={120}><svg width={600} height={120}>{(() => {const pts = Array.from({length: 61}, (_, k) => {const x = k * 10; const ph = ((x + t * 300) % 300) / 300; const y = ph > 0.45 && ph < 0.5 ? -45 : ph > 0.5 && ph < 0.54 ? 25 : 0; return `${k ? 'L' : 'M'}${x} ${60 + y}`;}).join(' '); return <path d={pts} fill="none" stroke={RED} strokeWidth={6} />;})()}</svg></Abs>}
    </Out>
  );
};
const Final: React.FC = () => {
  const t = useT();
  const fade = prog(t, 433.2, 435.8);
  const press = prog(t, 452.4, 452.8, easeIn) * (1 - prog(t, 453.0, 453.4));
  const shake = prog(t, 453.5, 454.3);
  const phase2 = t >= 443.0;
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={phase2 ? ['Tout', 'stopper', 'sans', 'braquer'] : ['Ce', 'qu’ils', 'retiendront']} mark={[phase2 ? 1 : 2]} at={phase2 ? 448.1 : 427.0} y={330} size={62} />
      {!phase2 && (
        <Abs x={60} y={450} w={960} style={{display: 'flex', gap: 20}}>
          <div style={{width: 470, height: 520, background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `7px 7px 0 ${DIM}`, textAlign: 'center', paddingTop: 60, boxSizing: 'border-box', opacity: pop(t, 430.8)}}>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 64, color: INK, filter: `blur(${fade * 14}px)`, opacity: 1 - fade * 0.7}}>N° ????</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM, marginTop: 40}}>le numéro exact de la norme</div>
            <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 44, color: DIM, marginTop: 20, opacity: fade}}>oublié…</div>
          </div>
          <div style={{width: 470, height: 520, background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `7px 7px 0 ${VIO}`, textAlign: 'center', paddingTop: 50, boxSizing: 'border-box', opacity: pop(t, 436.7)}}>
            <div style={{display: 'flex', justifyContent: 'center', filter: `drop-shadow(0 0 ${20 + 10 * Math.sin(t * 4)}px ${VIO})`}}><F n="cerveau" size={180} /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, marginTop: 20}}>votre esprit d’analyse</div>
            <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 44, color: VIO, marginTop: 14, opacity: pop(t, 439.8)}}>retenu ✓</div>
          </div>
        </Abs>
      )}
      {phase2 && (
        <>
          <Abs x={0} y={440} w={1080} style={{textAlign: 'center', opacity: pop(t, 443.2)}}><span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: DIM}}>recracher le Code du travail<Strike p={prog(t, 444.8, 445.4)} c={RED} /></span></Abs>
          <Abs x={60} y={530} w={460} h={520} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `7px 7px 0 ${ORANGE}`, textAlign: 'center', opacity: pop(t, 448.8)}}>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><F n="chantier" size={150} /></div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 20, transform: `rotate(${Math.sin(t * 12) * 8}deg)`}}><F n="chrono" size={110} /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: RED, marginTop: 16}}>un retard fou</div>
          </Abs>
          <Abs x={560} y={530} w={460} h={520} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `7px 7px 0 ${RED}`, textAlign: 'center', opacity: pop(t, 451.6)}}>
            <div style={{margin: '60px auto 0', width: 260, height: 260, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, #FF8A7A, ${RED})`, border: `10px solid ${INK}`, boxShadow: `0 ${18 - press * 14}px 0 #7A1F1A`, transform: `translateY(${press * 14}px)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: '#fff'}}>STOP</div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 30, opacity: shake}}><F n="poignee" size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: GREEN}}>sans braquer la direction</div></div>
          </Abs>
          {t > 455.4 && <Abs x={0} y={1110} w={1080}><Board text="MAITRISE HSE" at={455.5} h={80} c={GREEN} stag={0.035} /></Abs>}
          {t > 455.5 && <Dust n={22} c={GOLD} />}
        </>
      )}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: at + 0.35 + len * 0.05, s: 'sfx/pop', v: 0.25}, ...rep(at + 0.8 + len * 0.05, 3, 0.12, 'sfx/pop', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 1.4, s: 'validation', v: 0.2})), {at: ALLDONE, s: 'validation', v: 0.35},
  ...rep(2.9, 14, 0.1, 'sfx/pop', 0.08), {at: 3.8, s: 'sfx/ding', v: 0.2}, {at: 7.0, s: 'sfx/whoosh', v: 0.25}, {at: 7.8, s: 'tension', v: 0.2, dur: 2.8}, ...[8.5, 9.2, 9.9].map((a) => ({at: a, s: 'sfx/click', v: 0.3})), {at: 11.5, s: 'tampon', v: 0.55},
  {at: 13.2, s: 'sfx/thud', v: 0.25}, {at: 14.9, s: 'sfx/swish', v: 0.45}, {at: 15.9, s: 'sfx/swish', v: 0.45}, {at: 16.2, s: 'validation', v: 0.3}, ...flaps(17.2, 10), {at: 18.4, s: 'soft-whoosh', v: 0.3}, ...[21.0, 21.6, 22.4].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})),
  {at: 29.2, s: 'stylo', v: 0.3}, ...[31.0, 32.6, 35.1].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), {at: 40.1, s: 'bass-hit', v: 0.35}, {at: 40.2, s: 'validation', v: 0.3},
  ...[44.7, 47.3, 50.3, 52.5, 55.1].map((a) => ({at: a, s: 'sfx/thud', v: 0.28})), {at: 59.2, s: 'sfx/ding', v: 0.35}, {at: 59.25, s: 'sfx/whoosh', v: 0.35},
  ...[75.7, 76.3, 76.9, 85.9, 86.9, 87.6].map((a) => ({at: a + 0.2, s: 'sfx/thud', v: 0.3})), ...rep(80.9, 8, 0.2, 'sfx/click', 0.15), {at: 81.7, s: 'stylo', v: 0.35}, {at: 90.5, s: 'sfx/swish', v: 0.25}, {at: 91.8, s: 'sfx/swish', v: 0.25},
  ...searchCues(97.0, 18, 102.4, 103.0), {at: 105.9, s: 'sfx/ding', v: 0.22}, {at: 108.0, s: 'sfx/ding', v: 0.22}, {at: 109.2, s: 'sfx/pop', v: 0.22}, {at: 112.4, s: 'stylo', v: 0.3},
  {at: 115.2, s: 'alarme', v: 0.06, dur: 0.8}, {at: 119.3, s: 'sfx/rise', v: 0.25, dur: 2.3}, {at: 121.7, s: 'validation', v: 0.3},
  {at: 133.9, s: 'sfx/pop', v: 0.2}, {at: 140.3, s: 'soft-whoosh', v: 0.4, dur: 1.5}, {at: 146.6, s: 'sfx/swish', v: 0.4}, {at: 152.2, s: 'sfx/swish', v: 0.4}, {at: 155.4, s: 'tension', v: 0.3, dur: 1.2}, {at: 156.6, s: 'deep-hit', v: 0.6}, {at: 156.62, s: 'bass-hit', v: 0.5}, {at: 156.7, s: 'tampon', v: 0.45}, {at: 159.5, s: 'sfx/pop', v: 0.22}, {at: 163.6, s: 'sfx/pop', v: 0.22},
  {at: 168.9, s: 'sfx/thud', v: 0.3}, {at: 170.0, s: 'sfx/ding', v: 0.25}, {at: 170.7, s: 'sfx/rise', v: 0.3, dur: 0.6}, {at: 171.3, s: 'validation', v: 0.35}, ...rep(176.3, 6, 0.3, 'sfx/swish', 0.18), {at: 179.4, s: 'sfx/thud', v: 0.5},
  {at: 188.4, s: 'sfx/whoosh', v: 0.25}, {at: 194.6, s: 'sfx/thud', v: 0.3}, {at: 197.3, s: 'sfx/pop', v: 0.22},
  ...flaps(201.5, 8), ...[204.3, 207.1, 210.0, 214.9].flatMap((a) => [{at: a, s: 'sfx/swish', v: 0.35}, {at: a + 0.6, s: 'sfx/thud', v: 0.3}]), ...rep(216.6, 4, 0.15, 'sfx/pop', 0.18), {at: 222.6, s: 'sfx/swish', v: 0.3}, {at: 223.2, s: 'tampon', v: 0.55},
  {at: 229.8, s: 'sfx/whoosh', v: 0.25}, ...rep(232.3, 6, 0.2, 'sfx/thud', 0.12), {at: 233.6, s: 'deep-hit', v: 0.55}, {at: 233.62, s: 'sfx/thud', v: 0.5}, {at: 239.3, s: 'page', v: 0.45}, {at: 241.2, s: 'tampon', v: 0.5},
  ...[250.0, 251.2, 252.6].map((a) => ({at: a, s: 'sfx/rise', v: 0.2})), {at: 254.0, s: 'soft-whoosh', v: 0.3}, {at: 255.9, s: 'sfx/pop', v: 0.6}, {at: 256.4, s: 'validation', v: 0.25},
  ...searchCues(260.2, 21, 262.6, 263.2), {at: 264.5, s: 'notification', v: 0.35}, {at: 269.3, s: 'notification', v: 0.35}, {at: 270.4, s: 'deep-hit', v: 0.55}, {at: 270.42, s: 'bass-hit', v: 0.45}, ...rep(271.3, 8, 0.35, 'tick', 0.12), ...[275.4, 278.4, 280.3].map((a) => ({at: a, s: 'sfx/pop', v: 0.22})), {at: 282.0, s: 'sfx/thud', v: 0.3},
  ...[294.3, 295.9, 297.0, 297.6].map((a) => ({at: a, s: 'sfx/thud', v: 0.25})), {at: 298.7, s: 'alarme', v: 0.08, dur: 1}, {at: 300.5, s: 'tension', v: 0.2, dur: 2.3}, {at: 302.8, s: 'sfx/thud', v: 0.4}, {at: 304.8, s: 'sfx/rise', v: 0.25}, {at: 306.4, s: 'validation', v: 0.3}, {at: 307.9, s: 'stylo', v: 0.3},
  {at: 313.5, s: 'sfx/thud', v: 0.3}, {at: 316.4, s: 'sfx/thud', v: 0.3}, {at: 322.2, s: 'sfx/pop', v: 0.2}, {at: 323.4, s: 'sfx/pop', v: 0.2}, {at: 324.6, s: 'sfx/click', v: 0.5}, {at: 325.4, s: 'validation', v: 0.3},
  ...[343.1, 346.0, 349.6].flatMap((a) => [{at: a, s: 'sfx/swish', v: 0.3}, {at: a + 0.4, s: 'alarme', v: 0.06, dur: 0.6}]), {at: 352.1, s: 'cadenas', v: 0.4}, {at: 352.3, s: 'sfx/whoosh', v: 0.35}, ...flaps(354.5, 10), {at: 358.4, s: 'soft-whoosh', v: 0.35, dur: 2}, {at: 361.4, s: 'sfx/pop', v: 0.22},
  ...searchCues(366.6, 30, 369.3, 369.9), ...[373.9, 376.3, 379.8].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), ...[381.9, 385.7, 387.0].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})), {at: 384.6, s: 'stylo', v: 0.3},
  {at: 395.3, s: 'stylo', v: 0.3}, ...[397.3, 398.4, 400.2, 401.2].flatMap((a) => [{at: a, s: 'sfx/whoosh', v: 0.25}, {at: a + 0.5, s: 'cadenas', v: 0.3}]), {at: 403.8, s: 'riser', v: 0.3, dur: 1}, {at: 404.6, s: 'validation', v: 0.35},
  {at: 414.8, s: 'sfx/pop', v: 0.22}, ...[417.7, 418.5, 419.1].flatMap((a) => [{at: a + 0.2, s: 'tampon', v: 0.55}, {at: a + 0.22, s: 'deep-hit', v: 0.35}]), {at: 420.5, s: 'stylo', v: 0.25}, ...rep(422.2, 4, 1.0, 'sfx/thud', 0.2),
  {at: 433.2, s: 'soft-whoosh', v: 0.35, dur: 2.5}, {at: 436.7, s: 'sfx/rise', v: 0.25}, {at: 439.8, s: 'validation', v: 0.3}, {at: 444.8, s: 'stylo', v: 0.3}, {at: 448.8, s: 'sfx/thud', v: 0.3}, ...rep(449.0, 10, 0.25, 'tick', 0.14), {at: 451.6, s: 'sfx/thud', v: 0.3}, {at: 452.6, s: 'sfx/click', v: 0.6}, {at: 452.65, s: 'deep-hit', v: 0.45}, {at: 453.5, s: 'sfx/ding', v: 0.3}, ...flaps(455.5, 14), {at: 456.4, s: 'validation', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const EntretienHse: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={13.1}><Intro /></Gate>
    <Gate from={13.0} to={24.4}><Swipe /></Gate>
    <Gate from={24.3} to={42.8}><Decryptage /></Gate>
    <Gate from={42.7} to={62.2}><Plan /></Gate>
    <Gate from={65.4} to={95.2}><Tour /></Gate>
    <Gate from={95.1} to={114.0}><Bases /></Gate>
    <Gate from={113.9} to={123.2}><Equilibre /></Gate>
    <Gate from={126.4} to={165.5}><Prisme /></Gate>
    <Gate from={165.4} to={180.7}><Credibilite /></Gate>
    <Gate from={184.0} to={199.1}><Concret /></Gate>
    <Gate from={199.0} to={224.9}><Star /></Gate>
    <Gate from={228.2} to={260.1}><Mur /></Gate>
    <Gate from={260.0} to={286.8}><MiseEnSituation /></Gate>
    <Gate from={286.7} to={309.4}><Regle /></Gate>
    <Gate from={309.3} to={327.3}><Friction /></Gate>
    <Gate from={330.6} to={365.9}><Alarmes /></Gate>
    <Gate from={365.8} to={390.1}><Questions /></Gate>
    <Gate from={393.3} to={408.3}><Puzzle /></Gate>
    <Gate from={408.2} to={426.9}><Verbes /></Gate>
    <Gate from={426.8} to={OUTRO_AT}><Final /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}><Gyro i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={458.5}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-entretien-hse-origine.m4a')} trimAfter={s(458.6)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Check, Count, Win, Kin, Deep, T];
