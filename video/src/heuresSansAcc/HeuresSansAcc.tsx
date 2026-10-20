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
 * « Heures et jours travaillés sans accident avec arrêt » (4 min 38) — capsule « condensé + effet wahou + ultra
 * premium » : voix d'origine (sans musique de fond), sous-titres calés mot à mot, photos générées (ChatGPT) d'après les
 * prompts de prompts-images-heures-sans-accident.md, thème « papier quadrillé ».
 * Fil rouge : LE TUBE PNEUMATIQUE À SIX GUICHETS (définition → formule heures → formule jours → différence → point SST →
 * conclusion), adaptés aux parties réellement présentes ; la capsule file d'un guichet à l'autre, chaque guichet passé se
 * coche. Transition : LE GYROPHARE à chaque partie ; dans les scènes : capsule pneumatique, loupe, store vénitien.
 * Ultra premium : grille de 100 travailleurs qui s'allument, horloge 8 h qui tourne, calendrier de 25 jours qui se coche,
 * équation qui s'assemble pièce par pièce, compteur mécanique à rouleaux jusqu'à 20 000, panneau « sans accident »,
 * balance heures / jours, filtre qui retire le facteur « 8 h », barre de recherche qui trouve puis OUVRE les catégories
 * d'événements, récapitulatif en cartes de verre.
 */
const IMG = {
  cover: 'heures-gen/couverture.jpg',
  entretien: 'heures-gen/entretien.jpg',
  secteurs: 'heures-gen/secteurs.jpg',
  equipe: 'heures-gen/equipe-chantier.jpg',
  panneau: 'heures-gen/panneau.jpg',
  pointage: 'heures-gen/pointage.jpg',
  rapport: 'heures-gen/rapport.jpg',
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
const OUTRO_AT = 278.0;
export const HEURES_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 24.7, n: '1', title: 'La définition', s: 'heures sans accident avec arrêt', c: NAVY, g: 'définition', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 57.2, n: '2', title: 'Formule des heures', s: 'travailleurs × heures × jours', c: BLUE, g: 'heures', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 103.0, n: '3', title: 'Formule des jours', s: 'travailleurs × jours', c: TEAL, g: 'jours', k: 'gyro', lab: 'PARTIE 3 / 6'},
  {at: 148.3, n: '4', title: 'Ne pas confondre', s: 'la différence essentielle', c: VIO, g: 'différence', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 192.5, n: '5', title: 'Attention SST', s: 'la définition de votre entreprise', c: RED, g: 'point SST', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 225.2, n: '6', title: 'Conclusion', s: 'les deux formules', c: GREEN, g: 'conclusion', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 263.0;

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
const Pic: React.FC<{src: string; ic: string; w: number; h: number; zoom?: number; pos?: string}> = ({src, ic, w, h, zoom = 1, pos = 'center'}) => (src ? <Img src={PH(src)} style={{width: w, height: h, objectFit: 'cover', objectPosition: pos, transform: `scale(${zoom})`, display: 'block'}} /> : <div style={{width: w, height: h, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F4F6FA'}}><F n={ic} size={Math.min(w, h) * 0.5} /></div>);
const Shot: React.FC<{src: string; ic: string; x: number; y: number; w: number; h: number; at: number; pos?: string; blinds?: boolean; c?: string; children?: React.ReactNode}> = ({src, ic, x, y, w, h, at, pos = '50% 40%', blinds, c = INK, children}) => {
  const t = useT();
  if (src) return blinds ? (t > at ? <Blinds src={src} x={x} y={y} w={w} h={h} at={at} pos={pos}>{children}</Blinds> : null) : <Deep src={src} x={x} y={y} w={w} h={h} at={at} pos={pos}>{children}</Deep>;
  return <Abs x={x} y={y} w={w} h={h} style={{background: '#F4F6FA', border: `5px solid ${INK}`, borderRadius: 30, boxShadow: `8px 8px 0 ${c}`, overflow: 'hidden', opacity: pop(t, at), display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={ic} size={Math.min(w, h) * 0.5} />{children}</Abs>;
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
/** Compteur mécanique à rouleaux. */
const Odo: React.FC<{n: number; a: number; b: number; digits: number; c: string; h?: number}> = ({n, a, b, digits, c, h = 130}) => {
  const t = useT();
  const v = lerp(0, n, prog(t, a, b, easeOut));
  return (
    <div style={{display: 'flex', gap: 8, justifyContent: 'center'}}>
      {Array.from({length: digits}, (_, k) => {
        const place = Math.pow(10, digits - 1 - k);
        const d = (v / place) % 10;
        return (
          <div key={k} style={{width: h * 0.72, height: h, borderRadius: 14, background: NIGHT, border: `5px solid ${INK}`, overflow: 'hidden', position: 'relative', boxShadow: `inset 0 ${h * 0.2}px ${h * 0.2}px #0008, inset 0 -${h * 0.2}px ${h * 0.2}px #0008`}}>
            <div style={{position: 'absolute', left: 0, right: 0, top: -d * h, fontFamily: MONO, fontWeight: 700, fontSize: h * 0.72, color: c, textAlign: 'center', lineHeight: `${h}px`}}>{Array.from({length: 11}, (_, j) => <div key={j} style={{height: h}}>{j % 10}</div>)}</div>
          </div>
        );
      })}
    </div>
  );
};
/** Équation qui s'assemble : chaque terme tombe à son instant. */
const Eq: React.FC<{terms: {v: string; l: string; c: string; a: number}[]; res?: {v: React.ReactNode; l: string; a: number}; size?: number}> = ({terms, res, size = 110}) => {
  const t = useT();
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap'}}>
      {terms.map((x, k) => (
        <React.Fragment key={k}>
          {k > 0 && <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.6, color: INK, opacity: pop(t, x.a)}}>×</div>}
          <div style={{textAlign: 'center', opacity: pop(t, x.a), transform: `translateY(${(1 - pop(t, x.a)) * -80}px)`}}>
            <div style={{minWidth: size * 1.4, padding: '6px 16px', borderRadius: 18, background: x.c, border: `5px solid ${INK}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.62, boxShadow: `5px 5px 0 ${INK}55`}}>{x.v}</div>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM, marginTop: 6}}>{x.l}</div>
          </div>
        </React.Fragment>
      ))}
      {res && <>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.6, color: INK, opacity: pop(t, res.a)}}>=</div>
        <div style={{textAlign: 'center', opacity: pop(t, res.a), transform: `scale(${0.6 + 0.4 * pop(t, res.a)})`}}>
          <div style={{padding: '6px 20px', borderRadius: 18, background: GOLD, border: `5px solid ${INK}`, color: INK, fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.62, boxShadow: `0 0 30px ${GOLD}`}}>{res.v}</div>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM, marginTop: 6}}>{res.l}</div>
        </div>
      </>}
    </div>
  );
};
/** Grille de 100 travailleurs. */
const Crowd: React.FC<{a: number; size?: number; c?: string}> = ({a, size = 76, c = BLUE}) => {
  const t = useT();
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 4}}>
      {Array.from({length: 100}, (_, k) => { const on = t >= a + (k % 10 + Math.floor(k / 10)) * 0.035; return <div key={k} style={{width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, background: on ? `${c}22` : 'transparent', opacity: on ? 1 : 0.15, transform: `scale(${on ? 1 : 0.6})`}}><F n="ouvrier" size={size * 0.8} /></div>; })}
    </div>
  );
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 200}}><Pic src={IMG.cover} ic="chantier" w={1080} h={760} pos="50% 30%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER} 9%, ${PAPER}00 16%, ${PAPER}00 36%, ${PAPER}DD 44%, ${PAPER} 49%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={930} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>QUESTION D’ENTRETIEN HSE</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 58, lineHeight: 1.12, color: INK, marginTop: 18, padding: '0 50px', textTransform: 'uppercase'}}>
          Comment calculer le <span style={{color: '#fff', background: BLUE, padding: '0 10px', borderRadius: 10}}>nombre total d’heures</span> et de <span style={{color: '#fff', background: TEAL, padding: '0 10px', borderRadius: 10}}>jours</span> <span style={{color: RED}}>sans accident avec arrêt</span> ?
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
const Intro: React.FC = () => {
  const t = useT();
  const ph = t < 13.9 ? 0 : 1;
  return (
    <Out end={24.7}>
      {ph === 0 && (
        <>
          <HiLine words={['Deux', 'indicateurs', 'clés']} mark={[1, 2]} at={2.8} y={330} size={66} />
          {[{ic: 'chrono', l: 'heures travaillées', s: 'sans accident avec arrêt', a: 5.62, c: BLUE}, {ic: 'calendrier', l: 'jours travaillés', s: 'sans accident avec arrêt', a: 9.82, c: TEAL}].map((x, k) => (
            <GlassCard key={x.l} x={60} y={460 + k * 440} w={960} h={400} at={x.a} c={x.c}>
              <div style={{display: 'flex', alignItems: 'center', gap: 34, height: '100%', padding: '0 44px'}}>
                <div style={{transform: `rotate(${k ? 0 : (t - x.a) * 60}deg)`}}><F n={x.ic} size={190} /></div>
                <div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: x.c, lineHeight: 1}}>{x.l}</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 28, color: INK, marginTop: 12}}>{x.s}</div></div>
              </div>
            </GlassCard>
          ))}
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['La', 'question', 'd’entretien']} mark={[1, 2]} at={14.1} y={330} size={64} />
          <Shot src={IMG.entretien} ic="question" x={60} y={440} w={960} h={460} at={14.1} c={NAVY}>
            <div style={{position: 'absolute', left: 24, bottom: 24}}><Pill at={15.54} c={NAVY} size={28}>entretien d’embauche HSE</Pill></div>
          </Shot>
          <Shot src={IMG.secteurs} ic="usine" x={60} y={930} w={960} h={300} at={17.5} c={ORANGE} blinds />
          <Abs x={0} y={1250} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', padding: '0 40px', boxSizing: 'border-box'}}>
            {[{l: 'construction', a: 18.46}, {l: 'industrie', a: 19.3}, {l: 'mines', a: 20.26}, {l: 'pétrole et gaz', a: 20.9}].map((x) => <Pill key={x.l} at={x.a} c={ORANGE} size={26}>{x.l}</Pill>)}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 1 · LA DÉFINITION ═════════════ */
const Definition: React.FC = () => {
  const t = useT();
  const ph = t < 44.9 ? 0 : 1;
  const sum = prog(t, 51.54, 54.5, easeInOut);
  return (
    <Out end={57.2}>
      {ph === 0 && (
        <>
          <HiLine words={['La', 'définition']} mark={[1]} at={29.98} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={560} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `9px 9px 0 ${NAVY}`, padding: 40, boxSizing: 'border-box', opacity: pop(t, 32.42)}}>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM}}>DÉFINITION</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK, lineHeight: 1.25, marginTop: 14}}>
              Le nombre total d’<span style={{background: `${BLUE}33`, padding: '0 6px'}}>heures de travail</span> effectuées par <span style={{background: `${TEAL}33`, padding: '0 6px', opacity: prog(t, 39.14, 39.5)}}>l’ensemble des travailleurs</span> pendant une période où <span style={{background: `${RED}22`, padding: '0 6px', opacity: prog(t, 41.42, 41.8)}}>aucun accident n’a entraîné d’arrêt</span>.
            </div>
            <LoupeSweep x0={-40} y0={180} x1={700} y1={300} a={36.9} b={43.5} size={200} />
          </Abs>
          <Abs x={60} y={1040} w={960} h={330} style={{opacity: pop(t, 39.14)}}>
            <Shot src={IMG.equipe} ic="equipe" x={0} y={0} w={960} h={330} at={39.14} c={TEAL} />
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Additionner', 'toutes', 'les', 'heures']} mark={[0]} at={45.0} y={330} size={60} />
          <Abs x={60} y={450} w={960} h={600} style={{opacity: pop(t, 45.9)}}>
            {Array.from({length: 18}, (_, k) => {
              const col = k % 6; const row = Math.floor(k / 6);
              const sx = 60 + col * 150; const sy = 40 + row * 170;
              return <div key={k} style={{position: 'absolute', left: lerp(sx, 400, sum), top: lerp(sy, 230, sum), width: 120, height: 120, borderRadius: 60, background: '#fff', border: `5px solid ${BLUE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 45.9 + k * 0.08) * (1 - prog(t, 54.2, 54.6)), transform: `scale(${1 - sum * 0.5})`}}><F n="chrono" size={70} /></div>;
            })}
            {t > 54.3 && <div style={{position: 'absolute', left: 280, top: 160, width: 400, height: 260, borderRadius: 30, background: `linear-gradient(160deg, ${BLUE}, ${NAVY})`, border: `6px solid ${INK}`, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1, spring(t, 54.3, 8, 12))})`, boxShadow: `0 0 50px ${BLUE}`}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 90}}>Σ h</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24}}>total des heures</div></div>}
          </Abs>
          <Abs x={0} y={1110} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16}}><Pill at={45.9} c={TEAL} size={30}>plusieurs travailleurs</Pill><Pill at={46.94} c={BLUE} size={30}>plusieurs jours</Pill></Abs>
          <Abs x={0} y={1220} w={1080} style={{textAlign: 'center'}}><Pill at={49.46} c={GREEN} size={30}>aucun accident avec arrêt</Pill></Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 2 · FORMULE DES HEURES ═════════════ */
const Heures: React.FC = () => {
  const t = useT();
  const ph = t < 71.2 ? 0 : t < 81.8 ? 1 : t < 94.8 ? 2 : 3;
  const day = Math.min(25, Math.floor(prog(t, 80.3, 81.6) * 25));
  return (
    <Out end={103.0}>
      {ph === 0 && (
        <>
          <HiLine words={['La', 'formule']} mark={[1]} at={58.34} y={330} size={72} />
          <Abs x={40} y={520} w={1000} h={500}><Eq terms={[{v: 'travailleurs', l: 'nombre', c: TEAL, a: 63.98}, {v: 'h / jour', l: 'heures par jour', c: BLUE, a: 66.1}, {v: 'jours', l: 'jours travaillés', c: ORANGE, a: 68.66}]} size={80} /></Abs>
          <Abs x={0} y={900} w={1080} style={{textAlign: 'center', opacity: pop(t, 62.18)}}><div style={{display: 'inline-block', padding: '16px 30px', borderRadius: 20, background: GOLD, border: `5px solid ${INK}`, fontFamily: sansFont, fontWeight: 900, fontSize: 44}}>= heures travaillées</div></Abs>
          <Abs x={0} y={1080} w={1080} style={{textAlign: 'center'}}><Pill at={60.3} c={GREEN} size={32}>très simple</Pill></Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Un', 'exemple', 'concret']} mark={[1, 2]} at={71.3} y={330} size={66} />
          <Abs x={110} y={430} w={860} h={560} style={{opacity: pop(t, 73.7)}}><Crowd a={74.98} size={80} /></Abs>
          <Abs x={60} y={1000} w={960} h={360} style={{display: 'flex', gap: 20}}>
            <div style={{flex: 1, borderRadius: 24, background: '#fff', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${BLUE}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 77.7)}}>
              <div style={{position: 'relative', width: 160, height: 160, borderRadius: 80, border: `8px solid ${INK}`, background: '#fff'}}>
                <div style={{position: 'absolute', left: 74, top: 18, width: 12, height: 62, background: BLUE, borderRadius: 6, transformOrigin: '50% 100%', transform: `rotate(${prog(t, 77.7, 79.5) * 240}deg)`}} />
                <div style={{position: 'absolute', left: 70, top: 70, width: 20, height: 20, borderRadius: 10, background: INK}} />
              </div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: BLUE}}>8 h / jour</div>
            </div>
            <div style={{flex: 1, borderRadius: 24, background: '#fff', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${ORANGE}`, padding: 14, boxSizing: 'border-box', opacity: pop(t, 80.3)}}>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6}}>{Array.from({length: 25}, (_, k) => <div key={k} style={{height: 42, borderRadius: 6, background: k < day ? ORANGE : '#EEF1F5', color: k < day ? '#fff' : DIM, fontFamily: MONO, fontWeight: 700, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{k < day ? '✓' : k + 1}</div>)}</div>
              <div style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: ORANGE, marginTop: 6}}>25 jours</div>
            </div>
          </Abs>
          <Abs x={0} y={1000} w={1080} style={{textAlign: 'center', zIndex: 4}}><span style={{position: 'relative', top: -60, display: 'inline-block', opacity: pop(t, 74.98)}}><Pill at={74.98} c={TEAL} size={34}>100 travailleurs</Pill></span></Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Le', 'calcul']} mark={[1]} at={81.9} y={330} size={72} />
          <Abs x={40} y={480} w={1000} h={360}><Eq terms={[{v: '100', l: 'travailleurs', c: TEAL, a: 83.46}, {v: '8', l: 'heures', c: BLUE, a: 84.34}, {v: '25', l: 'jours', c: ORANGE, a: 85.94}]} size={120} /></Abs>
          <PneuDeliver x={60} y={860} w={960} at={91.2} c={GOLD} />
          <Abs x={0} y={950} w={1080} style={{opacity: pop(t, 92.0)}}><Odo n={20000} a={92.0} b={93.9} digits={5} c={GOLD} h={170} /></Abs>
          <Abs x={0} y={1150} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: INK, opacity: pop(t, 93.6)}}>heures travaillées</Abs>
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={['Aucun', 'accident', 'avec', 'arrêt']} mark={[0, 1]} at={94.9} y={330} size={62} />
          <Shot src={IMG.panneau} ic="bouclier" x={60} y={440} w={960} h={480} at={94.9} c={GREEN} blinds>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 30, textAlign: 'center', zIndex: 3}}><span style={{display: 'inline-block', background: GREEN, color: '#fff', border: `5px solid ${INK}`, borderRadius: 18, fontFamily: sansFont, fontWeight: 900, fontSize: 56, padding: '8px 28px', boxShadow: `0 0 40px ${GREEN}`}}>20 000 h</span></div>
          </Shot>
          <Stamp at={99.06} c={GREEN} text="sans accident avec arrêt" x={130} y={970} rot={-5} size={46} />
          {t > 99.1 && <Dust n={18} c={GREEN} />}
        </>
      )}
    </Out>
  );
};

/* ═════════════ 3 · FORMULE DES JOURS ═════════════ */
const Jours: React.FC = () => {
  const t = useT();
  const ph = t < 125.6 ? 0 : t < 134.0 ? 1 : 2;
  const cut = prog(t, 122.8, 124.2, easeIn);
  return (
    <Out end={148.3}>
      {ph === 0 && (
        <>
          <HiLine words={['Le', 'deuxième', 'indicateur']} mark={[1, 2]} at={108.6} y={330} size={64} />
          <Shot src={IMG.pointage} ic="calendrier" x={60} y={440} w={960} h={440} at={108.6} c={TEAL}>
            <div style={{position: 'absolute', left: 24, bottom: 24}}><Pill at={114.54} c={TEAL} size={28}>des journées de travail</Pill></div>
          </Shot>
          <Abs x={40} y={940} w={1000} h={360}>
            <div style={{position: 'relative'}}>
              <Eq terms={[{v: 'travailleurs', l: '', c: TEAL, a: 120.5}, {v: 'h / jour', l: '', c: BLUE, a: 120.6}, {v: 'jours', l: '', c: ORANGE, a: 120.7}]} size={70} />
              <div style={{position: 'absolute', left: 410, top: -20, width: 220, height: 160, opacity: cut > 0 ? 1 : 0}}>
                <div style={{position: 'absolute', left: 0, top: 70, width: 220 * cut, height: 14, background: RED, borderRadius: 7, transform: 'rotate(-14deg)'}} />
              </div>
            </div>
            <div style={{textAlign: 'center', marginTop: 30, opacity: pop(t, 123.6)}}><Pill at={123.6} c={RED} size={28}>plus besoin des heures par jour</Pill></div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['La', 'formule', 'des', 'jours']} mark={[1, 3]} at={125.7} y={330} size={66} />
          <Abs x={40} y={560} w={1000} h={400}><Eq terms={[{v: 'travailleurs', l: 'nombre', c: TEAL, a: 129.3}, {v: 'jours', l: 'jours travaillés', c: ORANGE, a: 131.3}]} size={90} /></Abs>
          <Abs x={0} y={900} w={1080} style={{textAlign: 'center', opacity: pop(t, 127.5)}}><div style={{display: 'inline-block', padding: '16px 30px', borderRadius: 20, background: GOLD, border: `5px solid ${INK}`, fontFamily: sansFont, fontWeight: 900, fontSize: 44}}>= jours travaillés</div></Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Reprenons', 'l’exemple']} mark={[0]} at={134.2} y={330} size={66} />
          <Abs x={40} y={480} w={1000} h={360}><Eq terms={[{v: '100', l: 'travailleurs', c: TEAL, a: 135.46}, {v: '25', l: 'jours', c: ORANGE, a: 136.66}]} size={130} /></Abs>
          <PneuDeliver x={60} y={860} w={960} at={140.4} c={GOLD} />
          <Abs x={0} y={950} w={1080} style={{opacity: pop(t, 141.3)}}><Odo n={2500} a={141.3} b={142.8} digits={4} c={GOLD} h={170} /></Abs>
          <Abs x={0} y={1150} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: INK, opacity: pop(t, 142.5)}}>jours travaillés</Abs>
          <Stamp at={145.1} c={GREEN} text="sans accident avec arrêt" x={130} y={1260} rot={-5} size={44} />
        </>
      )}
    </Out>
  );
};

/* ═════════════ 4 · LA DIFFÉRENCE ═════════════ */
const Difference: React.FC = () => {
  const t = useT();
  const ph = t < 182.7 ? 0 : 1;
  const tilt = lerp(0, -12, prog(t, 185.9, 187.2, easeInOut));
  return (
    <Out end={192.5}>
      {ph === 0 && (
        <>
          <HiLine words={['Ne', 'pas', 'confondre']} mark={[2]} at={152.3} y={330} size={70} />
          {[{l: 'HEURES', a: 155.38, c: BLUE, terms: [{v: '100', l: 'trav.', c: TEAL, a: 159.34}, {v: '8', l: 'h/j', c: BLUE, a: 160.54}, {v: '25', l: 'jours', c: ORANGE, a: 162.7}], r: '20 000 h', ra: 169.7, y: 440}, {l: 'JOURS', a: 171.38, c: TEAL, terms: [{v: '100', l: 'trav.', c: TEAL, a: 175.18}, {v: '25', l: 'jours', c: ORANGE, a: 176.26}], r: '2 500 j', ra: 180.78, y: 850}].map((x) => (
            <GlassCard key={x.l} x={60} y={x.y} w={960} h={330} at={x.a} c={x.c}>
              <div style={{position: 'absolute', left: 30, top: 24, fontFamily: MONO, fontWeight: 700, fontSize: 28, color: x.c, letterSpacing: 4}}>{x.l}</div>
              <div style={{position: 'absolute', left: 0, right: 0, top: 110}}><Eq terms={x.terms} res={{v: x.r, l: '', a: x.ra}} size={78} /></div>
            </GlassCard>
          ))}
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['La', 'différence', 'essentielle']} mark={[1, 2]} at={182.9} y={330} size={62} />
          <Abs x={60} y={480} w={960} h={700} style={{opacity: pop(t, 182.9)}}>
            <div style={{position: 'absolute', left: 470, top: 120, width: 20, height: 420, background: INK, borderRadius: 10}} />
            <div style={{position: 'absolute', left: 380, top: 530, width: 200, height: 36, background: INK, borderRadius: 12}} />
            <div style={{position: 'absolute', left: 80, top: 120, width: 800, height: 0, transform: `rotate(${tilt}deg)`}}>
              <div style={{position: 'absolute', left: 0, top: -9, width: 800, height: 18, background: INK, borderRadius: 9}} />
              {[{l: 'heures', s: 'avec les heures / jour', c: BLUE, x: -60, ic: 'chrono'}, {l: 'jours', s: 'sans les heures / jour', c: TEAL, x: 560, ic: 'calendrier'}].map((p) => (
                <div key={p.l} style={{position: 'absolute', left: p.x, top: 10, width: 300, transform: `rotate(${-tilt}deg)`, transformOrigin: '50% 0'}}>
                  <div style={{margin: '0 auto', width: 4, height: 50, background: INK}} />
                  <div style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: '0 0 70px 70px', height: 230, boxShadow: `6px 6px 0 ${p.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <F n={p.ic} size={90} />
                    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: p.c}}>{p.l}</div>
                    <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: INK, textAlign: 'center'}}>{p.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </Abs>
          <Abs x={0} y={1180} w={1080} style={{textAlign: 'center'}}><Pill at={186.98} c={BLUE} size={30}>le facteur « heures par jour »</Pill></Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 5 · ATTENTION SST ═════════════ */
const CATS = [{l: 'accidents avec arrêt', c: RED, a: 218.9}, {l: 'accidents enregistrables', c: ORANGE, a: 219.82}, {l: 'premiers soins', c: YEL, a: 222.18}, {l: 'autres incidents', c: TEAL, a: 223.66}];
const PointSST: React.FC = () => {
  const t = useT();
  const ph = t < 215.2 ? 0 : 1;
  return (
    <Out end={225.2}>
      {ph === 0 && (
        <>
          <AbsoluteFill style={{boxShadow: `inset 0 0 ${120 + 50 * Math.abs(Math.sin(t * 4))}px rgba(224,74,63,0.35)`}} />
          <HiLine words={['Un', 'point', 'important']} mark={[1, 2]} at={193.0} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={330} style={{background: '#F1F1EC', border: `5px solid ${INK}`, borderRadius: 26, display: 'flex', alignItems: 'center', gap: 30, padding: '0 40px', opacity: pop(t, 196.3)}}>
            <F n="chantier" size={150} />
            <div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: DIM, lineHeight: 1.1}}>juste « présents sur le chantier »<Strike p={prog(t, 200.8, 201.3)} c={RED} /></div>
          </Abs>
          <GlassCard x={60} y={810} w={960} h={500} at={207.46} c={RED}>
            <div style={{padding: '30px 40px'}}>
              <Mono at={207.6} c={DIM} size={24}>on parle d’heures sans événements répondant aux</Mono>
              <div style={{display: 'flex', gap: 20, marginTop: 30}}>
                <div style={{flex: 1, height: 220, borderRadius: 22, background: `${NAVY}15`, border: `5px solid ${NAVY}`, opacity: pop(t, 211.18)}}><IcoLab ic="batiment" l="critères de l’organisation" size={100} fs={30} c={NAVY} /></div>
                <div style={{flex: 1, height: 220, borderRadius: 22, background: `${VIO}15`, border: `5px solid ${VIO}`, opacity: pop(t, 213.22)}}><IcoLab ic="balance" l="réglementation applicable" size={100} fs={30} c={VIO} /></div>
              </div>
            </div>
          </GlassCard>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Votre', 'définition']} mark={[1]} at={215.3} y={330} size={70} />
          <SearchOpen x={60} y={440} w={960} h={940} at={215.4} query="accident enregistrable" results={['Accident de trajet', 'Catégories d’événements', 'Registre des visiteurs']} found={1} foundAt={217.0} clickAt={217.4} c={RED}>
            {CATS.map((x, k) => (
              <div key={x.l} style={{position: 'absolute', left: 60 + k * 50, right: 60 + k * 50, top: 40 + k * 190, height: 160, borderRadius: 22, background: x.c, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: x.c === YEL ? INK : '#fff', opacity: pop(t, x.a), transform: `translateY(${(1 - pop(t, x.a)) * -100}px)`}}>{x.l}</div>
            ))}
          </SearchOpen>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 6 · CONCLUSION ═════════════ */
const Conclusion: React.FC = () => {
  const t = useT();
  const ph = t < 256.8 ? 0 : 1;
  return (
    <Out end={OUTRO_AT}>
      {ph === 0 && (
        <>
          <HiLine words={['Pour', 'résumer']} mark={[1]} at={226.7} y={330} size={70} />
          <GlassCard x={60} y={460} w={960} h={330} at={227.78} c={BLUE}>
            <div style={{position: 'absolute', left: 30, top: 24, fontFamily: MONO, fontWeight: 700, fontSize: 26, color: BLUE}}>HEURES SANS ACCIDENT AVEC ARRÊT</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 110}}><Eq terms={[{v: '100', l: 'travailleurs', c: TEAL, a: 230.32}, {v: '8', l: 'h / jour', c: BLUE, a: 232.6}, {v: '25', l: 'jours', c: ORANGE, a: 234.5}]} res={{v: '20 000 h', l: '', a: 240.0}} size={80} /></div>
            <Shine at={240.3} />
          </GlassCard>
          <GlassCard x={60} y={850} w={960} h={330} at={244.52} c={TEAL}>
            <div style={{position: 'absolute', left: 30, top: 24, fontFamily: MONO, fontWeight: 700, fontSize: 26, color: TEAL}}>JOURS SANS ACCIDENT AVEC ARRÊT</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 110}}><Eq terms={[{v: '100', l: 'travailleurs', c: TEAL, a: 247.5}, {v: '25', l: 'jours', c: ORANGE, a: 249.5}]} res={{v: '2 500 j', l: '', a: 253.5}} size={80} /></div>
            <Shine at={253.8} />
          </GlassCard>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Suivre', 'et', 'communiquer']} mark={[0, 2]} at={256.9} y={330} size={62} />
          <Shot src={IMG.rapport} ic="graphique" x={60} y={440} w={960} h={520} at={256.9} c={GREEN} blinds />
          <Abs x={0} y={1000} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16}}><Pill at={259.0} c={GREEN} size={30}>performance SST</Pill><Pill at={261.0} c={NAVY} size={30}>résultats de sécurité</Pill></Abs>
          <Abs x={60} y={1100} w={960} h={260} style={{display: 'flex', gap: 20, justifyContent: 'center', opacity: pop(t, 264.0)}}>
            {[{ic: 'cloche', l: 's’abonner', a: 266.0}, {ic: 'pouce', l: 'liker', a: 266.98}, {ic: 'enveloppe', l: 'partager', a: 268.0}].map((x) => <div key={x.l} style={{width: 280, height: 240, borderRadius: 24, background: '#fff', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${RED}`, opacity: pop(t, x.a), transform: `scale(${pop(t, x.a)})`}}><IcoLab ic={x.ic} l={x.l} size={100} fs={32} /></div>)}
          </Abs>
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
  {at: 0.05, s: 'sfx/pop', v: 0.35}, ...flaps(0.1, 8), {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 0.8, s: 'validation', v: 0.18})), {at: ALLDONE, s: 'validation', v: 0.35},
  {at: 5.62, s: 'sfx/pop', v: 0.25}, shine(5.9), {at: 9.82, s: 'sfx/pop', v: 0.25}, shine(10.1),
  {at: 14.1, s: 'sfx/whoosh', v: 0.22}, {at: 17.5, s: 'soft-whoosh', v: 0.35, dur: 1}, ...pops([18.46, 19.3, 20.26, 20.9], 0.2),
  {at: 32.42, s: 'sfx/whoosh', v: 0.2}, {at: 36.9, s: 'soft-whoosh', v: 0.3, dur: 6}, {at: 41.42, s: 'sfx/ding', v: 0.22},
  ...rep(45.9, 18, 0.08, 'sfx/pop', 0.08), {at: 51.54, s: 'soft-whoosh', v: 0.4, dur: 3}, {at: 54.3, s: 'sfx/thud', v: 0.4}, {at: 54.35, s: 'validation', v: 0.3},
  ...[63.98, 66.1, 68.66].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), {at: 62.18, s: 'sfx/pop', v: 0.22},
  ...rep(74.98, 20, 0.05, 'sfx/pop', 0.06), ...rep(77.7, 12, 0.15, 'tick', 0.12), ...rep(80.3, 25, 0.052, 'sfx/click', 0.07),
  ...[83.46, 84.34, 85.94].map((a) => ({at: a, s: 'sfx/thud', v: 0.35})), {at: 91.2, s: 'sfx/swish', v: 0.3}, ...rep(92.0, 18, 0.1, 'tick', 0.14), {at: 93.9, s: 'bass-hit', v: 0.35}, {at: 93.95, s: 'validation', v: 0.35},
  {at: 94.9, s: 'soft-whoosh', v: 0.4, dur: 1}, {at: 99.06, s: 'tampon', v: 0.6},
  {at: 108.6, s: 'sfx/whoosh', v: 0.22}, ...pops([120.5, 120.6, 120.7], 0.18), {at: 122.8, s: 'stylo', v: 0.4}, {at: 123.6, s: 'sfx/pop', v: 0.22},
  ...[129.3, 131.3].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})),
  ...[135.46, 136.66].map((a) => ({at: a, s: 'sfx/thud', v: 0.35})), {at: 140.4, s: 'sfx/swish', v: 0.3}, ...rep(141.3, 14, 0.1, 'tick', 0.14), {at: 142.8, s: 'bass-hit', v: 0.35}, {at: 145.1, s: 'tampon', v: 0.6},
  {at: 155.38, s: 'sfx/whoosh', v: 0.22}, ...pops([159.34, 160.54, 162.7]), {at: 169.7, s: 'validation', v: 0.3}, {at: 171.38, s: 'sfx/whoosh', v: 0.22}, ...pops([175.18, 176.26]), {at: 180.78, s: 'validation', v: 0.3},
  {at: 182.9, s: 'sfx/whoosh', v: 0.22}, {at: 185.9, s: 'sfx/rise', v: 0.2, dur: 1.3}, {at: 187.2, s: 'sfx/thud', v: 0.35},
  {at: 193.0, s: 'alarme', v: 0.06, dur: 1.2}, {at: 196.3, s: 'sfx/pop', v: 0.2}, {at: 200.8, s: 'stylo', v: 0.35}, {at: 207.46, s: 'sfx/whoosh', v: 0.22}, ...pops([211.18, 213.22]),
  ...searchCues(215.4, 21, 217.0, 217.4), ...CATS.map((x) => ({at: x.a, s: 'sfx/thud', v: 0.25})),
  {at: 227.78, s: 'sfx/whoosh', v: 0.22}, ...pops([230.32, 232.6, 234.5]), {at: 240.0, s: 'validation', v: 0.3}, shine(240.3), {at: 244.52, s: 'sfx/whoosh', v: 0.22}, ...pops([247.5, 249.5]), {at: 253.5, s: 'validation', v: 0.3}, shine(253.8),
  {at: 256.9, s: 'soft-whoosh', v: 0.4, dur: 1}, ...pops([259.0, 261.0]), ...[266.0, 266.98, 268.0].map((a) => ({at: a, s: 'sfx/ding', v: 0.22})),
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const HeuresSansAcc: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={24.75}><Intro /></Gate>
    <Gate from={27.9} to={57.25}><Definition /></Gate>
    <Gate from={58.0} to={103.05}><Heures /></Gate>
    <Gate from={106.2} to={148.35}><Jours /></Gate>
    <Gate from={151.5} to={192.55}><Difference /></Gate>
    <Gate from={192.9} to={225.25}><PointSST /></Gate>
    <Gate from={226.0} to={OUTRO_AT}><Conclusion /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}><Gyro i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={277.8}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-heures-sans-accident-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Kin, Brut, T, TitleBlock, Win, Count, GLASS, Check, Tile, Card, Num, random, VIO];
