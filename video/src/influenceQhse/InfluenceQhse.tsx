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
 * « Responsable QHSE : les erreurs qui font perdre l'influence » (6 min 07) — capsule « condensé + effet wahou + ultra
 * premium » : voix d'origine (sans musique de fond), sous-titres calés mot à mot, photos générées (ChatGPT) d'après les
 * prompts de prompts-images-influence-qhse.md, thème « papier quadrillé ».
 * Fil rouge : LE TUBE PNEUMATIQUE À SIX GUICHETS (profils → confiance → terrain → vigilance → causes → influence),
 * adaptés aux parties réellement présentes ; la capsule du dossier file d'un guichet à l'autre, chaque guichet passé se
 * coche. Transition : LE GYROPHARE à chaque partie ; dans les scènes : capsule pneumatique, loupe, store vénitien.
 * Ultra premium : balance certifications / terrain, duel contrôleur – influenceur en écran partagé, socle qui se
 * fissure, maillon qui casse, jauges de méfiance, flèche qui rebondit sur un mur de résistance, globules du système
 * immunitaire, fossé qui s'ouvre entre la tour d'ivoire et le terrain, documents qui grisent et tombent au tiroir, usine
 * à gaz animée, compteur d'écarts, bille sur la pente glissante, courbe de corrélation, barre de recherche qui trouve
 * puis OUVRE les vraies causes, carrousel de l'histoire qui se répète, façade qui s'effondre, film sépia du gendarme,
 * batterie qui se vide, aimant du changement désirable, chemin qui bifurque.
 */
/** Images générées (ChatGPT) d'après les prompts de prompts-images-influence-qhse.md. */
const IMG = {
  cover: 'influence-gen/couverture.jpg',
  certifs: 'influence-gen/certifications.jpg',
  controleur: 'influence-gen/controleur.jpg',
  influenceur: 'influence-gen/influenceur.jpg',
  critique: 'influence-gen/critique.jpg',
  ecoute: 'influence-gen/ecoute.jpg',
  bulldozer: 'influence-gen/bulldozer.jpg',
  bureau: 'influence-gen/bureau.jpg',
  tiroir: 'influence-gen/tiroir.jpg',
  usine: 'influence-gen/usine-a-gaz.jpg',
  ecart: 'influence-gen/ecart.jpg',
  coupable: 'influence-gen/coupable.jpg',
  terrain: 'influence-gen/terrain.jpg',
  adhesion: 'influence-gen/adhesion.jpg',
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
const OUTRO_AT = 366.6;
export const INFLUENCE_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 31.5, n: '1', title: 'Deux profils', s: 'contrôleur ou influenceur ?', c: NAVY, g: 'profils', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 49.2, n: '2', title: 'La confiance', s: 'le socle de tout', c: BLUE, g: 'confiance', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 145.8, n: '3', title: 'Le contact terrain', s: 'la tour d’ivoire du bureau', c: ORANGE, g: 'terrain', k: 'gyro', lab: 'PARTIE 3 / 6'},
  {at: 224.0, n: '4', title: 'La zone rouge', s: 'les erreurs de vigilance', c: RED, g: 'vigilance', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 264.8, n: '5', title: 'Le vrai échec', s: 'comprendre les vraies causes', c: VIO, g: 'causes', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 304.0, n: '6', title: 'Le pouvoir de l’influence', s: 'de la contrainte à la conviction', c: GREEN, g: 'influence', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 365.0;

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
/** Photo en « profondeur » ou en store vénitien ; sans image, carte icône. */
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
/** Jauge horizontale (0 → 1). */
const Gauge: React.FC<{v: number; c: string; label: string; w: number}> = ({v, c, label, w}) => (
  <div style={{width: w}}>
    <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: INK, marginBottom: 8}}>{label}</div>
    <div style={{height: 46, borderRadius: 23, background: '#E3E8EF', border: `4px solid ${INK}`, overflow: 'hidden'}}><div style={{height: '100%', width: `${Math.max(0, Math.min(1, v)) * 100}%`, background: c, transition: 'none'}} /></div>
  </div>
);

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 200}}><Pic src={IMG.cover} ic="megaphone" w={1080} h={760} pos="60% 30%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER} 9%, ${PAPER}00 16%, ${PAPER}00 36%, ${PAPER}DD 44%, ${PAPER} 49%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={700} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>RESPONSABLE QHSE</div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 80, color: DIM, marginTop: 10}}><span style={{position: 'relative'}}>contrôler<Strike p={1} c={RED} /></span></div>
        <div style={{marginTop: 4}}><Board text="INFLUENCER" at={-1} h={110} gap={3} c={GREEN} stag={0.02} /></div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 76, color: NAVY, marginTop: 14}}>les erreurs à éviter</div>
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

/* ═════════════ INTRO : LE PARADOXE + LE PARCOURS ═════════════ */
const PARC = [{n: '01', l: 'Le piège de la compétence', a: 19.46, c: NAVY}, {n: '02', l: 'Perdre la confiance', a: 21.94, c: BLUE}, {n: '03', l: 'Perdre le terrain', a: 23.02, c: ORANGE}, {n: '04', l: 'Perdre de vue l’essentiel', a: 25.7, c: RED}, {n: '05', l: 'Le pouvoir de l’influence', a: 29.26, c: GREEN}];
const Intro: React.FC = () => {
  const t = useT();
  const ph = t < 10.1 ? 0 : t < 16.5 ? 1 : 2;
  const tilt = lerp(-12, 14, prog(t, 7.6, 9.0, easeInOut)) + (t > 9.0 ? Math.sin((t - 9.0) * 6) * 2 * (1 - prog(t, 9, 10)) : 0);
  return (
    <Out end={31.5}>
      {ph === 0 && (
        <>
          <HiLine words={['Tout', 'le', 'paradoxe']} mark={[2]} at={2.8} y={330} size={68} />
          <Shot src={IMG.certifs} ic="diplome" x={60} y={440} w={960} h={420} at={2.8} c={GOLD}>
            <div style={{position: 'absolute', left: 24, bottom: 24}}><Pill at={5.26} c={GOLD} size={28}>des certifications au mur…</Pill></div>
          </Shot>
          <Abs x={60} y={900} w={960} h={480} style={{opacity: pop(t, 6.4)}}>
            <div style={{position: 'absolute', left: 470, top: 120, width: 20, height: 300, background: INK, borderRadius: 10}} />
            <div style={{position: 'absolute', left: 380, top: 410, width: 200, height: 36, background: INK, borderRadius: 12}} />
            <div style={{position: 'absolute', left: 80, top: 110, width: 800, height: 0, transform: `rotate(${tilt}deg)`}}>
              <div style={{position: 'absolute', left: 0, top: -9, width: 800, height: 18, background: INK, borderRadius: 9}} />
              {[{ic: 'diplome', l: 'certifications', c: DIM, x: -70, a: 6.4}, {ic: 'chantier', l: 'changement réel sur le terrain', c: GREEN, x: 540, a: 7.46}].map((p) => (
                <div key={p.l} style={{position: 'absolute', left: p.x, top: 10, width: 330, transform: `rotate(${-tilt}deg)`, transformOrigin: '50% 0', opacity: pop(t, p.a)}}>
                  <div style={{margin: '0 auto', width: 4, height: 40, background: INK}} />
                  <div style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: '0 0 70px 70px', height: 200, boxShadow: `6px 6px 0 ${p.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 14px'}}>
                    <F n={p.ic} size={90} />
                    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: p.c, textAlign: 'center', lineHeight: 1.05}}>{p.l}</div>
                  </div>
                </div>
              ))}
            </div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Savoir', 'influencer']} mark={[1]} at={10.2} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={300} style={{background: '#F1F1EC', border: `5px solid ${INK}`, borderRadius: 26, opacity: pop(t, 10.3), display: 'flex', alignItems: 'center', gap: 30, padding: '0 40px'}}>
            <F n="cerveau" size={170} />
            <div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: INK}}>l’expertise technique</div><div style={{position: 'relative', display: 'inline-block', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: RED}}>seule ne suffit pas<Strike p={prog(t, 12.4, 12.8)} c={RED} /></div></div>
          </Abs>
          <Abs x={60} y={800} w={960} h={560} style={{borderRadius: 36, background: `radial-gradient(circle at 50% 40%, #E9FFF2, ${GREEN}33)`, border: `6px solid ${INK}`, boxShadow: `10px 10px 0 ${GREEN}`, opacity: pop(t, 14.0), overflow: 'hidden'}}>
            {[0, 1, 2].map((k) => { const ph2 = ((t - 14) * 0.8 + k / 3) % 1; return t > 14 && <div key={k} style={{position: 'absolute', left: 480 - ph2 * 500, top: 280 - ph2 * 500, width: ph2 * 1000, height: ph2 * 1000, borderRadius: '50%', border: `6px solid ${GREEN}`, opacity: (1 - ph2) * 0.6}} />; })}
            <div style={{position: 'absolute', left: 0, right: 0, top: 170, textAlign: 'center'}}><F n="megaphone" size={150} /></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 360}}><Kin text="influencer" at={14.26} size={96} color={GREEN} stagger={0.04} style={{textAlign: 'center'}} /></div>
            <Shine at={14.8} every={2} />
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Notre', 'parcours']} mark={[1]} at={16.62} y={330} size={66} />
          {PARC.map((x, k) => (
            <GlassCard key={x.n} x={60} y={440 + k * 188} w={960} h={165} at={x.a} c={x.c}>
              <div style={{display: 'flex', alignItems: 'center', gap: 30, height: '100%', padding: '0 30px'}}>
                <Num n={x.n} c={x.c} size={110} />
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: INK}}>{x.l}</div>
              </div>
            </GlassCard>
          ))}
        </>
      )}
    </Out>
  );
};

/* ═════════════ 1 · DEUX PROFILS ═════════════ */
const Profils: React.FC = () => {
  const t = useT();
  const split = prog(t, 35.0, 35.8, easeOut);
  return (
    <Out end={49.2}>
      <HiLine words={['Contrôleur', 'ou', 'influenceur', '?']} mark={[0, 2]} at={34.9} y={330} size={58} />
      {[{x: 60, src: IMG.controleur, ic: 'superviseur', c: RED, pos: '42% 30%', l: 'le contrôleur', s: 'tombe dans tous les pièges', a: 35.62, as: 38.78}, {x: 560, src: IMG.influenceur, ic: 'formatrice', c: GREEN, pos: '68% 30%', l: 'l’influenceur', s: 'les déjoue', a: 40.74, as: 43.66}].map((p, k) => (
        <Abs key={p.l} x={p.x} y={440} w={460} h={820} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 30, boxShadow: `9px 9px 0 ${p.c}`, overflow: 'hidden', opacity: pop(t, p.a - 0.3), transform: `translateX(${(1 - split) * (k ? 300 : -300)}px) perspective(1200px) rotateY(${(1 - pop(t, p.a - 0.3)) * (k ? 30 : -30)}deg)`}}>
          <Pic src={p.src} ic={p.ic} w={460} h={560} pos={p.pos} zoom={1.08 - 0.06 * prog(t, p.a, p.a + 8)} />
          <div style={{background: p.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 44, textAlign: 'center', padding: '12px 0'}}>{p.l}</div>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: INK, textAlign: 'center', marginTop: 20, opacity: pop(t, p.as)}}>{p.s}</div>
          {k === 0 && t > 39.38 && [0, 1, 2].map((j) => <div key={j} style={{position: 'absolute', left: 80 + j * 120, top: lerp(-120, 420, prog(t, 39.4 + j * 0.2, 40.0 + j * 0.2, easeIn)), transform: `rotate(${j * 30}deg)`}}><F n="danger" size={80} /></div>)}
          {k === 1 && t > 43.66 && <div style={{position: 'absolute', left: 0, right: 0, top: 460, textAlign: 'center', fontSize: 70, color: GREEN, fontWeight: 900, transform: `scale(${pop(t, 43.66)})`}}>✓</div>}
        </Abs>
      ))}
      <Abs x={0} y={1290} w={1080} style={{textAlign: 'center'}}><Pill at={44.74} c={NAVY} size={30}>bâtir une culture de sécurité</Pill></Abs>
    </Out>
  );
};

/* ═════════════ 2 · LA CONFIANCE ═════════════ */
const Confiance: React.FC = () => {
  const t = useT();
  const ph = t < 62.9 ? 0 : t < 89.3 ? 1 : t < 100.2 ? 2 : t < 115.1 ? 3 : t < 132.5 ? 4 : 5;
  const crack = prog(t, 58.66, 61.0, easeOut);
  const brk = prog(t, 81.5, 82.3, easeOut);
  const bounce = t > 101.9 ? Math.abs(Math.sin((t - 101.9) * 5)) * Math.exp(-(t - 101.9) * 1.6) : 0;
  return (
    <Out end={145.8}>
      {ph === 0 && (
        <>
          <HiLine words={['Le', 'socle', 'de', 'tout']} mark={[1]} at={52.6} y={330} size={68} />
          <Abs x={140} y={500} w={800} h={820} style={{opacity: pop(t, 52.6)}}>
            {[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 120 + k * 200, top: 60, width: 120, height: 440, background: 'linear-gradient(90deg, #DCE3EC, #fff 50%, #DCE3EC)', border: `5px solid ${INK}`, borderRadius: 12, transform: `translateY(${(1 - pop(t, 53.0 + k * 0.2)) * -200}px)`}} />)}
            <div style={{position: 'absolute', left: 40, top: 500, width: 720, height: 200, background: `linear-gradient(180deg, ${BLUE}, ${NAVY})`, border: `6px solid ${INK}`, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: '#fff', letterSpacing: 6, boxShadow: `0 0 30px ${BLUE}66`}}>CONFIANCE</div>
            <svg width={800} height={820} style={{position: 'absolute', left: 0, top: 0}}>
              <path d="M 400 500 L 380 560 L 420 600 L 370 650 L 410 700" fill="none" stroke={INK} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={260} strokeDashoffset={260 * (1 - crack)} />
              <path d="M 420 600 L 470 620 L 500 670" fill="none" stroke={INK} strokeWidth={6} strokeLinecap="round" strokeDasharray={120} strokeDashoffset={120 * (1 - prog(t, 59.8, 61.0))} />
            </svg>
            <div style={{position: 'absolute', left: 0, right: 0, top: 740, textAlign: 'center'}}><Pill at={59.82} c={RED} size={28}>quasi irréparable</Pill></div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 80.5 ? ['Critiquer', 'l’existant'] : ['Le', 'lien', 'brisé']} mark={t < 80.5 ? [0, 1] : [1, 2]} at={t < 80.5 ? 63.2 : 80.62} y={330} size={66} />
          {t < 80.5 && (
            <>
              <Shot src={IMG.critique} ic="bulle-colere" x={60} y={440} w={960} h={440} at={63.2} c={RED} />
              <Abs x={60} y={910} w={960} h={170} style={{background: '#F1F1EC', border: `5px dashed ${DIM}`, borderRadius: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 71.94)}}>
                <span style={{position: 'relative', fontFamily: handFont, fontWeight: 700, fontSize: 54, color: DIM}}>« je suis compétent »<Strike p={prog(t, 72.9, 73.3)} c={RED} /></span>
              </Abs>
              <Abs x={60} y={1110} w={960} h={190} style={{background: RED, border: `5px solid ${INK}`, borderRadius: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 73.06), transform: `scale(${0.9 + 0.1 * pop(t, 73.06)}) rotate(-1deg)`}}>
                <span style={{fontFamily: handFont, fontWeight: 700, fontSize: 48, color: '#fff', textAlign: 'center', lineHeight: 1.1}}>« tout ce que vous avez fait jusqu’ici, c’est nul »</span>
              </Abs>
            </>
          )}
          {t >= 80.5 && (
            <>
              <Abs x={140} y={460} w={800} h={360}>
                {[0, 1].map((k) => <div key={k} style={{position: 'absolute', left: 150 + k * 260 + (k ? brk * 120 : -brk * 120), top: 100, width: 240, height: 140, borderRadius: 70, border: `26px solid ${BLUE}`, boxShadow: `0 0 20px ${BLUE}66`, transform: `rotate(${(k ? 1 : -1) * brk * 25}deg)`}} />)}
                {brk > 0 && brk < 1 && Array.from({length: 8}, (_, j) => <div key={j} style={{position: 'absolute', left: 400 + Math.cos(j) * brk * 160, top: 170 + Math.sin(j) * brk * 160, width: 14, height: 14, borderRadius: 7, background: YEL}} />)}
              </Abs>
              <Abs x={60} y={860} w={960} h={420} style={{opacity: pop(t, 83.62)}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: 30, padding: '20px 40px'}}>
                  <Gauge v={prog(t, 84.6, 86.6)} c={ORANGE} label="méfiance" w={880} />
                  <Gauge v={prog(t, 87.5, 89.0)} c={RED} label="scepticisme" w={880} />
                </div>
              </Abs>
            </>
          )}
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Écouter,', 'pas', 'juger']} mark={[0]} at={89.4} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={240} style={{background: '#F1F1EC', border: `5px solid ${INK}`, borderRadius: 24, display: 'flex', alignItems: 'center', gap: 30, padding: '0 40px', opacity: pop(t, 91.0)}}>
            <div style={{transform: `rotate(${Math.sin(t * 6) * 15}deg)`}}><F n="juge" size={140} /></div>
            <span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: DIM}}>juger<Strike p={prog(t, 93.2, 93.6)} c={RED} /></span>
          </Abs>
          <Shot src={IMG.ecoute} ic="yeux" x={60} y={720} w={960} h={460} at={93.6} c={GREEN} blinds>
            <div style={{position: 'absolute', left: 24, bottom: 24, zIndex: 3}}><Pill at={94.1} c={GREEN} size={32}>écouter</Pill></div>
          </Shot>
          <Abs x={0} y={1220} w={1080} style={{textAlign: 'center'}}><Pill at={95.78} c={GOLD} size={30}>un investissement crucial</Pill></Abs>
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={['Imposer', 'ou', 'expliquer', '?']} mark={[0, 2]} at={100.3} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={400} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 26, boxShadow: `8px 8px 0 ${RED}`, overflow: 'hidden', opacity: pop(t, 100.3)}}>
            <div style={{position: 'absolute', left: 24, top: 18}}><Mono at={100.4} c={RED} size={24}>imposer</Mono></div>
            <div style={{position: 'absolute', left: lerp(40, 560, prog(t, 101.2, 101.9, easeIn)) - bounce * 200, top: 150}}><svg width={220} height={100}><line x1={0} y1={50} x2={170} y2={50} stroke={INK} strokeWidth={16} /><polygon points="160,15 220,50 160,85" fill={INK} /></svg></div>
            <div style={{position: 'absolute', left: 790, top: 60, width: 130, height: 280, background: `repeating-linear-gradient(0deg, #B85C38 0 40px, #8E4528 40px 46px)`, border: `5px solid ${INK}`, borderRadius: 8, transform: `translateX(${bounce * 10}px)`}} />
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center'}}><Pill at={102.94} c={RED} size={28}>la résistance</Pill></div>
          </Abs>
          <Abs x={60} y={880} w={960} h={420} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 26, boxShadow: `8px 8px 0 ${GREEN}`, overflow: 'hidden', opacity: pop(t, 106.0)}}>
            <div style={{position: 'absolute', left: 24, top: 18}}><Mono at={106.1} c={GREEN} size={24}>expliquer le pourquoi</Mono></div>
            <div style={{position: 'absolute', left: lerp(40, 640, prog(t, 108.9, 110.5, easeInOut)), top: 140}}><svg width={220} height={100}><line x1={0} y1={50} x2={170} y2={50} stroke={GREEN} strokeWidth={16} /><polygon points="160,15 220,50 160,85" fill={GREEN} /></svg></div>
            <div style={{position: 'absolute', left: 800, top: 110, transform: `scale(${pop(t, 110.5)})`}}><F n="cible" size={140} /></div>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 24, display: 'flex', justifyContent: 'center', gap: 16}}><Pill at={111.46} c={TEAL} size={26}>un objectif partagé</Pill><Pill at={114.02} c={GREEN} size={26}>on y adhère</Pill></div>
          </Abs>
        </>
      )}
      {ph === 4 && (
        <>
          <HiLine words={['L’approche', 'bulldozer']} mark={[1]} at={115.2} y={330} size={66} />
          <Shot src={IMG.bulldozer} ic="grue" x={60} y={440} w={960} h={440} at={115.2} c={ORANGE}>
            <div style={{position: 'absolute', inset: 0, background: `rgba(224,74,63,${t > 123.8 ? 0.1 + 0.12 * Math.abs(Math.sin(t * 7)) : 0})`}} />
            <div style={{position: 'absolute', left: 24, bottom: 24}}><Pill at={118.42} c={ORANGE} size={28}>tout révolutionner tout de suite</Pill></div>
          </Shot>
          <Abs x={60} y={910} w={960} h={400} style={{background: NIGHT, border: `5px solid ${INK}`, borderRadius: 26, overflow: 'hidden', opacity: pop(t, 125.9)}}>
            <div style={{position: 'absolute', left: 24, top: 18}}><Mono at={126.0} c="#9AA7BC" size={22}>système immunitaire de l’entreprise</Mono></div>
            {Array.from({length: 6}, (_, k) => { const hit = prog(t, 128.1 + k * 0.15, 128.6 + k * 0.15); return <div key={`c${k}`} style={{position: 'absolute', left: 120 + k * 130, top: 160, width: 90, height: 90, borderRadius: 12, background: ORANGE, border: `4px solid #000`, opacity: 1 - hit, transform: `scale(${1 - hit * 0.6}) rotate(${hit * 90}deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 30}}>Δ</div>; })}
            {Array.from({length: 10}, (_, k) => { const p = prog(t, 126.8 + (k % 6) * 0.12, 128.3 + (k % 6) * 0.15, easeInOut); return <div key={`g${k}`} style={{position: 'absolute', left: lerp(k % 2 ? -60 : 1000, 140 + (k % 6) * 130, p), top: lerp(k < 5 ? -40 : 420, 180 + (k % 3) * 20, p), width: 50, height: 50, borderRadius: 25, background: '#F2F2F2', border: `4px solid ${BLUE}`, boxShadow: `0 0 12px ${BLUE}`}} />; })}
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center'}}><Pill at={128.14} c={RED} size={28}>rejet en bloc</Pill></div>
          </Abs>
        </>
      )}
      {ph === 5 && (
        <>
          <HiLine words={['Le', 'terrain', 'humain']} mark={[1, 2]} at={132.6} y={330} size={68} />
          {[{ic: 'yeux', l: 'observer', a: 136.3, c: BLUE}, {ic: 'haut-parleur', l: 'écouter', a: 137.54, c: TEAL}, {ic: 'equipe', l: 'impliquer', a: 138.4, c: GREEN}].map((x, k) => (
            <GlassCard key={x.l} x={60} y={440 + k * 280} w={960} h={250} at={x.a} c={x.c}>
              <div style={{display: 'flex', alignItems: 'center', gap: 34, height: '100%', padding: '0 40px'}}>
                <Num n={k + 1} c={x.c} size={110} />
                <F n={x.ic} size={130} />
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: x.c}}>{x.l}</div>
              </div>
            </GlassCard>
          ))}
          <Abs x={0} y={1300} w={1080} style={{textAlign: 'center'}}><Pill at={140.98} c={ORANGE} size={28}>mais d’autres erreurs guettent…</Pill></Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 3 · LE CONTACT TERRAIN ═════════════ */
const Terrain: React.FC = () => {
  const t = useT();
  const ph = t < 158.3 ? 0 : t < 171.0 ? 1 : t < 190.1 ? 2 : t < 208.3 ? 3 : 4;
  const gap = prog(t, 154.1, 156.9, easeInOut);
  const cred = 1 - prog(t, 187.14, 188.9, easeIn);
  return (
    <Out end={224.0}>
      {ph === 0 && (
        <>
          <HiLine words={['Le', 'théoricien', 'déconnecté']} mark={[1, 2]} at={149.2} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={940} style={{opacity: pop(t, 149.2)}}>
            <div style={{position: 'absolute', left: 0, top: 640, width: 480 - gap * 120, height: 300, background: 'linear-gradient(180deg, #A9D18E, #7A9E63)', border: `5px solid ${INK}`, borderRadius: '0 0 0 24px'}} />
            <div style={{position: 'absolute', right: 0, top: 640, width: 480 - gap * 120, height: 300, background: 'linear-gradient(180deg, #A9D18E, #7A9E63)', border: `5px solid ${INK}`, borderRadius: '0 0 24px 0'}} />
            <div style={{position: 'absolute', left: 480 - gap * 120, top: 640, width: gap * 240, height: 300, background: 'linear-gradient(180deg, #3A2A1A, #000)'}} />
            <div style={{position: 'absolute', left: 120, top: 120, width: 200, height: 520, background: 'linear-gradient(90deg, #F5F0E6, #fff 50%, #E8E0D0)', border: `5px solid ${INK}`, borderRadius: '100px 100px 0 0'}}>
              {[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 70, top: 90 + k * 130, width: 60, height: 80, borderRadius: '30px 30px 0 0', background: NAVY}} />)}
            </div>
            <div style={{position: 'absolute', left: 90, top: 60, opacity: pop(t, 154.1)}}><Pill at={154.1} c={NAVY} size={26}>tour d’ivoire</Pill></div>
            <div style={{position: 'absolute', left: 620, top: 420}}><F n="chantier" size={200} /></div>
            <div style={{position: 'absolute', left: 600, top: 330, opacity: pop(t, 156.98)}}><Pill at={156.98} c={GREEN} size={26}>la vraie vie du terrain</Pill></div>
            {gap > 0.3 && <div style={{position: 'absolute', left: 0, right: 0, top: 860, textAlign: 'center'}}><Pill at={155.0} c={RED} size={28}>le fossé</Pill></div>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['La', 'pente', 'bureaucratique']} mark={[1, 2]} at={158.4} y={330} size={60} />
          <Shot src={IMG.bureau} ic="ordinateur" x={60} y={440} w={960} h={460} at={158.4} c={NAVY} />
          <Abs x={60} y={930} w={960} h={240}>
            {['tableaux Excel', 'documents', 'procédures'].map((d, k) => <div key={d} style={{position: 'absolute', left: k * 320, top: 20 + Math.sin(t * 2 + k) * 6, width: 300, height: 120, borderRadius: 18, background: '#fff', border: `4px solid ${INK}`, boxShadow: `5px 5px 0 ${NAVY}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: NAVY, opacity: pop(t, [162.14, 163.34, 164.14][k])}}>{d}</div>)}
          </Abs>
          <Abs x={60} y={1170} w={960} h={200} style={{borderRadius: 26, background: `linear-gradient(110deg, ${GREEN}, #2FBF71)`, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', gap: 24, padding: '0 34px', opacity: pop(t, 167.3), overflow: 'hidden'}}>
            <F n="equipe" size={120} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: '#fff', lineHeight: 1.05}}>la sécurité se passe<br />sur le terrain, avec les gens</div>
            <Shine at={167.6} />
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 181.8 ? ['Des', 'documents', 'morts'] : ['Crédibilité', 'perdue']} mark={t < 181.8 ? [1, 2] : [0, 1]} at={t < 181.8 ? 171.1 : 181.9} y={330} size={64} />
          {t < 181.8 && (
            <>
              <Abs x={60} y={440} w={960} h={460}>
                {Array.from({length: 5}, (_, k) => {
                  const a = 175.4 + k * 0.4;
                  const p = prog(t, a, a + 1.2, easeIn);
                  return <div key={k} style={{position: 'absolute', left: 120 + k * 150, top: lerp(40, 380, p), width: 150, height: 190, background: '#fff', border: `4px solid ${INK}`, borderRadius: 8, filter: `grayscale(${prog(t, a - 0.6, a)}) brightness(${1 - 0.3 * prog(t, a - 0.6, a)})`, transform: `rotate(${(k - 2) * 8 + p * 40}deg)`, opacity: 1 - prog(t, a + 1.0, a + 1.3), padding: 14, boxSizing: 'border-box'}}>{Array.from({length: 5}, (_, j) => <div key={j} style={{height: 9, background: '#D3D8E0', borderRadius: 5, marginTop: 12}} />)}</div>;
                })}
                <div style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center', gap: 16}}><Pill at={173.66} c={DIM} size={26}>écrites en vase clos</Pill></div>
              </Abs>
              <Shot src={IMG.tiroir} ic="classeur" x={60} y={900} w={960} h={400} at={179.18} c={DIM} filter="sepia(0.3)" />
              <Stamp at={177.9} c={RED} text="inapplicables" x={110} y={770} rot={-8} size={50} />
              <Stamp at={178.9} c={RED} text="irréalistes" x={600} y={790} rot={6} size={50} />
            </>
          )}
          {t >= 181.8 && (
            <>
              <Abs x={60} y={440} w={960} h={420} style={{display: 'flex', gap: 30}}>
                <Card x={0} y={0} w={460} h={400} at={181.86} c={GREEN}><div style={{position: 'relative', height: '100%'}}><IcoLab ic="pouce" l="un partenaire" size={130} fs={38} c={GREEN} /><div style={{position: 'absolute', left: 30, right: 30, top: '50%', height: 10, background: RED, transform: `scaleX(${prog(t, 183.3, 183.8)}) rotate(-12deg)`, transformOrigin: '0 50%'}} /></div></Card>
                <Card x={500} y={0} w={460} h={400} at={184.22} c={RED}><IcoLab ic="sens-interdit" l="une source de contraintes inutiles" size={130} fs={34} c={RED} /></Card>
              </Abs>
              <Abs x={60} y={900} w={960} h={420} style={{background: NIGHT, border: `5px solid ${INK}`, borderRadius: 26, opacity: pop(t, 187.1), padding: 40, boxSizing: 'border-box'}}>
                <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: '#9AA7BC'}}>crédibilité opérationnelle</div>
                <div style={{marginTop: 30, height: 90, borderRadius: 45, background: '#25304A', border: `5px solid #000`, overflow: 'hidden'}}><div style={{height: '100%', width: `${cred * 100}%`, background: cred > 0.5 ? GREEN : cred > 0.2 ? ORANGE : RED}} /></div>
                <div style={{marginTop: 30, fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: RED, textAlign: 'center', opacity: prog(t, 188.6, 189.0)}}>PERDUE</div>
              </Abs>
            </>
          )}
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={t < 198.1 ? ['Une', 'usine', 'à', 'gaz'] : ['L’humain', 'd’abord']} mark={t < 198.1 ? [1, 2, 3] : [0]} at={t < 198.1 ? 190.2 : 198.26} y={330} size={64} />
          <Abs x={60} y={440} w={960} h={480} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 26, boxShadow: `8px 8px 0 ${ORANGE}`, overflow: 'hidden', opacity: pop(t, 190.2)}}>
            <svg width={960} height={480} style={{position: 'absolute', left: 0, top: 0}}>
              <path d="M 40 400 L 200 400 L 200 120 L 420 120 L 420 300 L 640 300 L 640 80 L 900 80" fill="none" stroke="#9AA7BC" strokeWidth={22} strokeLinejoin="round" />
              <path d="M 40 400 L 200 400 L 200 120 L 420 120 L 420 300 L 640 300 L 640 80 L 900 80" fill="none" stroke={ORANGE} strokeWidth={8} strokeDasharray="20 30" strokeDashoffset={-t * 120} />
            </svg>
            {[[200, 120, 120], [420, 300, 100], [640, 80, 130], [300, 260, 90], [760, 300, 110]].map(([x, y, sz], k) => <div key={k} style={{position: 'absolute', left: x - sz / 2, top: y - sz / 2, transform: `rotate(${(t - 190) * (k % 2 ? -160 : 200)}deg)`}}><F n="engrenage" size={sz} /></div>)}
            <div style={{position: 'absolute', right: 20, bottom: 16}}><Pill at={193.74} c={ORANGE} size={26}>le système « parfait »</Pill></div>
          </Abs>
          <Shot src={IMG.usine} ic="pensif" x={60} y={960} w={460} h={420} at={198.26} c={RED} />
          <Abs x={560} y={960} w={460} h={420} style={{display: 'flex', flexDirection: 'column', gap: 18, justifyContent: 'center'}}>
            {[{l: 'les habitudes', a: 201.42}, {l: 'les contraintes de temps', a: 202.14}, {l: 'la pression', a: 203.18}].map((x) => <Pill key={x.l} at={x.a} c={RED} size={30}>{x.l}</Pill>)}
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: INK, opacity: pop(t, 204.98)}}>→ s’intégrer naturellement au travail</div>
          </Abs>
        </>
      )}
      {ph === 4 && (
        <>
          <HiLine words={['Le', 'meilleur', 'système']} mark={[1, 2]} at={208.4} y={330} size={66} />
          <Abs x={60} y={440} w={460} h={560} style={{background: '#F1F1EC', border: `5px solid ${INK}`, borderRadius: 26, opacity: pop(t, 213.58), overflow: 'hidden'}}>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, padding: 24}}>{Array.from({length: 16}, (_, k) => <div key={k} style={{height: 70, borderRadius: 10, background: '#D3D8E0', border: `3px solid ${DIM}`}} />)}</div>
            <div style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: DIM, position: 'relative'}}><span style={{position: 'relative'}}>complet, complexe<Strike p={prog(t, 215.9, 216.3)} c={RED} /></span></div>
          </Abs>
          <Abs x={560} y={440} w={460} h={560} style={{borderRadius: 26, background: `linear-gradient(160deg, #E9FFF2, #fff)`, border: `5px solid ${INK}`, boxShadow: `8px 8px 0 ${GREEN}`, opacity: pop(t, 216.86), overflow: 'hidden'}}>
            <div style={{margin: '60px auto 0', width: 220, height: 260, borderRadius: 20, background: '#fff', border: `5px solid ${GREEN}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + 0.04 * Math.sin(t * 4)})`}}><F n="check" size={140} /></div>
            <div style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: GREEN, marginTop: 30}}>utilisé réellement</div>
            <Shine at={218.0} every={2.5} />
          </Abs>
          <Abs x={0} y={1060} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap'}}><Pill at={219.3} c={GREEN} size={32}>pragmatisme + simplicité</Pill><Pill at={221.4} c={DIM} size={28}>&gt; perfection théorique</Pill></Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 4 · LA ZONE ROUGE ═════════════ */
const Vigilance: React.FC = () => {
  const t = useT();
  const ph = t < 235.0 ? 0 : t < 252.6 ? 1 : 2;
  const cnt = t >= 239.78 ? 2 : t >= 238.22 ? 1 : 0;
  const eye = prog(t, 241.0, 241.6) * (1 - prog(t, 243.6, 244.3));
  const roll = prog(t, 245.5, 250.0, easeIn);
  const curve = prog(t, 253.8, 259.4, easeInOut);
  return (
    <Out end={264.8}>
      {ph === 0 && (
        <>
          <AbsoluteFill style={{boxShadow: `inset 0 0 ${160 + 60 * Math.abs(Math.sin(t * 4))}px rgba(224,74,63,0.45)`}} />
          <HiLine words={['La', 'zone', 'rouge']} mark={[1, 2]} at={227.4} y={330} size={72} />
          {[0, 1].map((k) => <div key={k} style={{position: 'absolute', left: -200, top: 560 + k * 380, width: 1500, height: 110, transform: `rotate(${k ? 6 : -6}deg) translateX(${((t * 160) % 200) - (k ? 0 : 100)}px)`, background: `repeating-linear-gradient(45deg, ${YEL} 0 60px, ${INK} 60px 120px)`, border: `5px solid ${INK}`, opacity: pop(t, 227.4 + k * 0.3)}} />)}
          <GlassCard x={140} y={700} w={800} h={280} at={228.0} c={RED}>
            <div style={{display: 'flex', alignItems: 'center', gap: 30, height: '100%', padding: '0 40px'}}>
              <div style={{filter: `drop-shadow(0 0 ${20 + 15 * Math.abs(Math.sin(t * 7))}px ${RED})`}}><F n="sirene" size={150} /></div>
              <div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: RED, lineHeight: 1}}>erreurs de vigilance</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: INK, marginTop: 10, opacity: pop(t, 232.42)}}>conséquences dramatiques</div></div>
            </div>
          </GlassCard>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['«', 'Oh,', 'ça', 'passe', '»']} mark={[1, 2, 3]} at={235.2} y={330} size={66} />
          <Shot src={IMG.ecart} ic="danger" x={60} y={440} w={620} h={460} at={235.2} c={RED}>
            <div style={{position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(0,0,0,${eye * 0.85}) ${50 * eye}%, transparent ${50 * eye}%, transparent ${100 - 50 * eye}%, rgba(0,0,0,${eye * 0.85}) ${100 - 50 * eye}%)`}} />
          </Shot>
          <Abs x={720} y={440} w={300} h={460} style={{background: NIGHT, border: `5px solid ${INK}`, borderRadius: 26, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 238.0)}}>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#9AA7BC'}}>écarts tolérés</div>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 160, color: cnt ? RED : '#3A4356', transform: `scale(${1 + 0.2 * Math.max(0, 1 - (t - (cnt === 2 ? 239.78 : 238.22)) * 4)})`}}>{cnt}</div>
          </Abs>
          <Stamp at={244.06} c={RED} text="négociables ?" x={190} y={760} rot={-7} size={60} />
          <Abs x={60} y={940} w={960} h={420} style={{opacity: pop(t, 245.5)}}>
            <svg width={960} height={420} style={{position: 'absolute', left: 0, top: 0}}>
              <path d="M 20 60 Q 480 120 900 380" fill="none" stroke={INK} strokeWidth={14} strokeLinecap="round" />
            </svg>
            {(() => { const x = lerp(30, 860, roll); const y = 60 + (x - 20) / 880 * 320 * (0.3 + 0.7 * ((x - 20) / 880)) - 50; return <div style={{position: 'absolute', left: x, top: y, width: 60, height: 60, borderRadius: 30, background: `radial-gradient(circle at 35% 30%, #fff, ${ORANGE})`, border: `4px solid ${INK}`, transform: `rotate(${roll * 900}deg)`}} />; })()}
            <div style={{position: 'absolute', right: 0, bottom: 0, opacity: pop(t, 249.74), transform: `scale(${pop(t, 249.74)})`}}><Pill at={249.74} c={RED} size={30}>accident majeur</Pill></div>
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Les', 'chiffres', 'ne', 'mentent', 'pas']} mark={[1, 3, 4]} at={252.7} y={330} size={58} />
          <Abs x={60} y={440} w={960} h={560} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 26, boxShadow: `8px 8px 0 ${RED}`, opacity: pop(t, 252.7)}}>
            <svg width={960} height={560} style={{position: 'absolute', left: 0, top: 0}}>
              <line x1={100} y1={470} x2={900} y2={470} stroke={INK} strokeWidth={6} />
              <line x1={100} y1={470} x2={100} y2={50} stroke={INK} strokeWidth={6} />
              <path d={`M 100 450 ${Array.from({length: 40}, (_, k) => { const x = 100 + (k + 1) * 20; const yy = 450 - Math.pow((k + 1) / 40, 2.2) * 380; return `L ${x} ${yy}`; }).join(' ')}`} fill="none" stroke={RED} strokeWidth={10} strokeLinecap="round" strokeDasharray={1100} strokeDashoffset={1100 * (1 - curve)} />
            </svg>
            <div style={{position: 'absolute', left: 300, top: 490, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: INK}}>petits écarts laissés passer →</div>
            <div style={{position: 'absolute', left: -110, top: 230, width: 360, transform: 'rotate(-90deg)', textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: INK}}>risque d’accident grave →</div>
            <div style={{position: 'absolute', right: 30, top: 20, fontFamily: MONO, fontWeight: 700, fontSize: 18, color: DIM}}>illustratif</div>
          </Abs>
          <Abs x={60} y={1040} w={960} h={330} style={{opacity: pop(t, 260.62)}}>
            {Array.from({length: 7}, (_, k) => <div key={k} style={{position: 'absolute', left: 40 + k * 110, bottom: k * 30 - 10, width: 100, height: 70, borderRadius: '45%', background: 'radial-gradient(circle at 35% 30%, #D6D2C8, #8C877C)', border: `4px solid ${INK}`, opacity: pop(t, 260.8 + k * 0.25), transform: `translateY(${(1 - pop(t, 260.8 + k * 0.25)) * -120}px)`}} />)}
            <div style={{position: 'absolute', right: 0, top: 0, opacity: pop(t, 263.62), transform: `scale(${pop(t, 263.62)})`, filter: `drop-shadow(0 0 20px ${RED})`}}><F n="effondre" size={130} /></div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 5 · LE VRAI ÉCHEC ═════════════ */
const Causes: React.FC = () => {
  const t = useT();
  const ph = t < 275.95 ? 0 : t < 283.8 ? 1 : 2;
  const fall = prog(t, 293.1, 294.4, easeIn);
  const crd = 1 - prog(t, 299.0, 301.4, easeIn);
  return (
    <Out end={304.0}>
      {ph === 0 && (
        <>
          <HiLine words={t < 271.2 ? ['«', 'Pas', 'de', 'chance', '»'] : ['Chercher', 'un', 'coupable']} mark={t < 271.2 ? [1, 2, 3] : [0, 2]} at={t < 271.2 ? 268.3 : 271.3} y={330} size={62} />
          {t < 271.2 && (
            <Abs x={240} y={480} w={600} h={600} style={{opacity: pop(t, 268.3)}}>
              <div style={{position: 'absolute', inset: 0, transform: `rotate(${(t - 268.3) * 180}deg)`}}><F n="de" size={600} /></div>
              <div style={{position: 'absolute', left: -100, right: -100, top: 280, height: 30, background: RED, transform: `rotate(-14deg) scaleX(${prog(t, 269.5, 270.0)})`, borderRadius: 15}} />
            </Abs>
          )}
          {t >= 271.2 && (
            <>
              <Shot src={IMG.coupable} ic="juge" x={60} y={440} w={960} h={560} at={271.3} c={VIO} />
              <Abs x={60} y={1040} w={960} h={140} style={{background: '#F1F1EC', border: `5px solid ${INK}`, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 274.14)}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: DIM}}>s’arrêter à la surface</span></Abs>
              <Stamp at={275.7} c={RED} text="le vrai échec" x={250} y={1210} rot={-6} size={64} />
            </>
          )}
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Les', 'vraies', 'causes']} mark={[1, 2]} at={276.0} y={330} size={68} />
          <SearchOpen x={60} y={440} w={960} h={940} at={276.0} query="vraies causes" results={['La faute à pas de chance', 'Un coupable', 'Les vraies causes']} found={2} foundAt={277.3} clickAt={277.7} c={VIO}>
            {[{ic: 'ecole', l: 'le manque de formation', a: 279.18}, {ic: 'clipboard', l: 'la procédure mal foutue', a: 280.74}, {ic: 'outils', l: 'le matériel défaillant', a: 282.18}].map((x, k) => (
              <div key={x.l} style={{position: 'absolute', left: 30, right: 30, top: 30 + k * 270, height: 240, borderRadius: 24, background: '#fff', border: `5px solid ${INK}`, boxShadow: `7px 7px 0 ${VIO}`, display: 'flex', alignItems: 'center', gap: 30, padding: '0 30px', opacity: pop(t, x.a), transform: `translateX(${(1 - pop(t, x.a)) * 120}px)`}}>
                <Num n={k + 1} c={VIO} size={100} />
                <F n={x.ic} size={120} />
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK, lineHeight: 1.05}}>{x.l}</div>
              </div>
            ))}
          </SearchOpen>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 289.7 ? ['L’histoire', 'se', 'répète'] : t < 298.6 ? ['Une', 'façade'] : ['Crédibilité', 'perdue']} mark={t < 289.7 ? [0, 2] : t < 298.6 ? [1] : [0, 1]} at={t < 289.7 ? 283.9 : t < 298.6 ? 289.8 : 298.7} y={330} size={66} />
          {t < 289.7 && (
            <Abs x={60} y={480} w={960} h={760}>
              {[0, 1, 2].map((k) => {
                const ang = ((t - 284) * 1.4 + (k / 3) * Math.PI * 2);
                return <div key={k} style={{position: 'absolute', left: 330 + Math.sin(ang) * 300, top: 200 + Math.cos(ang) * 40, width: 300, height: 360, borderRadius: 22, background: '#fff', border: `5px solid ${INK}`, boxShadow: `7px 7px 0 ${RED}`, transform: `scale(${0.75 + 0.25 * Math.cos(ang)})`, zIndex: Math.round(Math.cos(ang) * 10) + 10, opacity: pop(t, 284.0 + k * 0.2)}}><IcoLab ic="ambulance" l="le même accident" size={130} fs={30} c={RED} /></div>;
              })}
              <div style={{position: 'absolute', left: 0, right: 0, top: 640, textAlign: 'center'}}><Pill at={287.78} c={RED} size={30}>revivre les mêmes accidents</Pill></div>
            </Abs>
          )}
          {t >= 289.7 && t < 298.6 && (
            <Abs x={190} y={460} w={700} h={820}>
              <div style={{position: 'absolute', left: 0, top: 100, width: 700, height: 620, background: '#EEF1F5', border: `5px dashed ${DIM}`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: DIM}}>vide</div>
              <div style={{position: 'absolute', left: 0, top: 100, width: 700, height: 620, background: 'linear-gradient(180deg, #F5F0E6, #E2D8C4)', border: `6px solid ${INK}`, borderRadius: 12, transformOrigin: '50% 100%', transform: `perspective(1500px) rotateX(${fall * 88}deg)`, boxShadow: `0 ${20 * (1 - fall)}px 40px rgba(0,0,0,0.25)`}}>
                {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <div key={`${r}${c}`} style={{position: 'absolute', left: 80 + c * 200, top: 70 + r * 170, width: 140, height: 110, background: NAVY, border: `4px solid ${INK}`, borderRadius: 8}} />))}
                <div style={{position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 24, color: INK}}>DÉMARCHE SÉCURITÉ</div>
              </div>
              <div style={{position: 'absolute', left: 0, right: 0, top: 740, textAlign: 'center'}}><Pill at={295.02} c={RED} size={30}>une mascarade</Pill></div>
            </Abs>
          )}
          {t >= 298.6 && (
            <Abs x={60} y={480} w={960} h={600} style={{background: NIGHT, border: `5px solid ${INK}`, borderRadius: 26, padding: 40, boxSizing: 'border-box'}}>
              <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: '#9AA7BC'}}>crédibilité</div>
              <div style={{marginTop: 30, height: 100, borderRadius: 50, background: '#25304A', border: `5px solid #000`, overflow: 'hidden'}}><div style={{height: '100%', width: `${crd * 100}%`, background: crd > 0.5 ? ORANGE : RED}} /></div>
              <div style={{marginTop: 60, fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: RED, textAlign: 'center', opacity: pop(t, 301.42), transform: `scale(${pop(t, 301.42)})`}}>DÉFINITIVE</div>
            </Abs>
          )}
        </>
      )}
    </Out>
  );
};

/* ═════════════ 6 · LE POUVOIR DE L'INFLUENCE ═════════════ */
const Influence: React.FC = () => {
  const t = useT();
  const ph = t < 320.0 ? 0 : t < 327.9 ? 1 : t < 340.1 ? 2 : t < 347.2 ? 3 : 4;
  const batt = 1 - prog(t, 320.5, 324.0, easeIn);
  const mag = prog(t, 342.0, 345.5, easeInOut);
  const road = prog(t, 354.6, 356.0, easeOut);
  return (
    <Out end={OUTRO_AT}>
      {ph === 0 && (
        <>
          <HiLine words={t < 313.5 ? ['Ce', 'qui', 'change', 'tout'] : ['La', 'vision', 'vieillotte']} mark={t < 313.5 ? [2, 3] : [1, 2]} at={t < 313.5 ? 307.4 : 313.4} y={330} size={64} />
          {t < 313.5 && (
            <Abs x={60} y={440} w={960} h={900} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 30}}>
              <div style={{transform: `scale(${pop(t, 311.58)})`, filter: `drop-shadow(0 0 ${30 + 20 * Math.sin(t * 4)}px ${GREEN})`}}><F n="aimant" size={300} /></div>
              <Board text="INFLUENCE" at={311.6} h={110} gap={3} c={GREEN} stag={0.03} />
            </Abs>
          )}
          {t >= 313.5 && (
            <>
              <Abs x={60} y={440} w={960} h={620} style={{border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', boxShadow: `9px 9px 0 ${DIM}`, opacity: pop(t, 313.4)}}>
                <Pic src={IMG.controleur} ic="superviseur" w={960} h={620} pos="50% 25%" filter="sepia(0.85) contrast(1.15) brightness(0.95)" zoom={1.04 + 0.02 * Math.sin(t * 9)} />
                {Array.from({length: 4}, (_, k) => <div key={k} style={{position: 'absolute', top: 0, bottom: 0, left: (random(`sc${k}${Math.floor(t * 12)}`) * 960), width: 2, background: 'rgba(255,255,255,0.5)'}} />)}
                <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.55))'}} />
                <div style={{position: 'absolute', left: 24, top: 24}}><Pill at={315.8} c={INK} size={28}>le contrôleur · le gendarme</Pill></div>
              </Abs>
              <Abs x={0} y={1100} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16}}>
                {[{l: 'vérifie', a: 317.0}, {l: 'sanctionne', a: 318.1}, {l: 'impose', a: 318.9}].map((x) => <div key={x.l} style={{padding: '10px 24px', border: `6px solid ${RED}`, borderRadius: 12, color: RED, fontFamily: sansFont, fontWeight: 900, fontSize: 40, textTransform: 'uppercase', transform: `rotate(-6deg) scale(${t >= x.a ? lerp(2, 1, prog(t, x.a, x.a + 0.2)) : 0})`, background: '#fffD'}}>{x.l}</div>)}
              </Abs>
            </>
          )}
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Le', 'contrôle', 'permanent']} mark={[1, 2]} at={320.1} y={330} size={64} />
          <Abs x={290} y={440} w={500} h={640} style={{opacity: pop(t, 320.1)}}>
            <div style={{position: 'absolute', left: 190, top: 0, width: 120, height: 50, background: INK, borderRadius: 12}} />
            <div style={{position: 'absolute', left: 50, top: 40, width: 400, height: 580, border: `14px solid ${INK}`, borderRadius: 40, padding: 20, boxSizing: 'border-box', display: 'flex', flexDirection: 'column-reverse', gap: 12}}>
              {Array.from({length: 5}, (_, k) => <div key={k} style={{flex: 1, borderRadius: 14, background: batt > k / 5 ? (batt > 0.5 ? GREEN : batt > 0.25 ? ORANGE : RED) : '#E3E8EF', opacity: batt > k / 5 ? 1 : 0.5}} />)}
            </div>
          </Abs>
          <Abs x={0} y={1110} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 20}}><Pill at={322.9} c={ORANGE} size={32}>épuisant pour tous</Pill><Pill at={325.5} c={RED} size={32}>inefficace</Pill></Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Il', 'influence']} mark={[1]} at={328.0} y={330} size={72} />
          {t > 329.5 && <Abs x={0} y={440} w={1080}><Board text="INFLUENCER" at={329.6} h={96} gap={3} c={GREEN} stag={0.03} /></Abs>}
          <PneuDeliver x={60} y={570} w={960} at={332.8} c={GREEN} />
          <Shot src={IMG.terrain} ic="formatrice" x={60} y={650} w={960} h={420} at={333.9} c={GREEN} blinds />
          <Abs x={0} y={1110} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', padding: '0 40px', boxSizing: 'border-box'}}>
            {[{l: 'écouter', a: 334.0}, {l: 'expliquer', a: 334.7}, {l: 'être sur le terrain', a: 335.4}].map((x) => <Pill key={x.l} at={x.a} c={GREEN} size={30}>{x.l}</Pill>)}
          </Abs>
          <Abs x={0} y={1240} w={1080} style={{textAlign: 'center'}}><Pill at={338.3} c={NAVY} size={32}>donner du sens aux règles</Pill></Abs>
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={['Rendre', 'le', 'changement', 'désirable']} mark={[2, 3]} at={340.2} y={330} size={56} />
          <Abs x={60} y={440} w={960} h={900}>
            <div style={{position: 'absolute', left: 380, top: 300, filter: `drop-shadow(0 0 ${20 + 15 * Math.sin(t * 5)}px ${GREEN})`}}><F n="aimant" size={200} /></div>
            {[{l: 'désirable', a: 344.0, x: 40, y: 40}, {l: 'logique', a: 345.1, x: 680, y: 60}, {l: 'inévitable', a: 345.9, x: 340, y: 720}].map((x) => <div key={x.l} style={{position: 'absolute', left: lerp(x.x, 380 + (x.x - 380) * 0.35, mag), top: lerp(x.y, 300 + (x.y - 300) * 0.35, mag), padding: '14px 26px', borderRadius: 40, background: GREEN, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 40, opacity: pop(t, x.a), transform: `scale(${pop(t, x.a)})`, boxShadow: `0 10px 24px ${GREEN}66`}}>{x.l}</div>)}
            {[0, 1, 2, 3, 4, 5].map((k) => { const ang = (k / 6) * Math.PI * 2 + t; const r = lerp(420, 160, mag); return <div key={k} style={{position: 'absolute', left: 480 + Math.cos(ang) * r - 30, top: 400 + Math.sin(ang) * r - 30, opacity: 0.8}}><F n="ouvrier" size={60} /></div>; })}
            <div style={{position: 'absolute', left: 0, right: 0, top: 820, textAlign: 'center'}}><Pill at={341.0} c={DIM} size={28}>il ne force pas le changement</Pill></div>
          </Abs>
        </>
      )}
      {ph === 4 && (
        <>
          <HiLine words={t < 361.9 ? ['Quel', 'chemin', 'choisir', '?'] : ['La', 'conviction']} mark={t < 361.9 ? [1, 2] : [1]} at={t < 361.9 ? 349.0 : 362.0} y={330} size={64} />
          <Abs x={60} y={440} w={960} h={960} style={{opacity: pop(t, 349.0)}}>
            <svg width={960} height={960} style={{position: 'absolute', left: 0, top: 0}}>
              <path d="M 480 940 L 480 620" stroke="#3A4356" strokeWidth={90} strokeLinecap="round" />
              <path d="M 480 640 Q 300 480 170 160" fill="none" stroke={RED} strokeWidth={70} strokeLinecap="round" strokeDasharray={600} strokeDashoffset={600 * (1 - road)} opacity={0.85} />
              <path d="M 480 640 Q 660 480 790 160" fill="none" stroke={GREEN} strokeWidth={70} strokeLinecap="round" strokeDasharray={600} strokeDashoffset={600 * (1 - prog(t, 357.0, 358.4, easeOut))} />
            </svg>
            <div style={{position: 'absolute', left: 10, top: 40, width: 320, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center'}}>
              <Pill at={355.0} c={RED} size={30}>contrôle</Pill>
              <Pill at={356.0} c={RED} size={24}>résistance</Pill>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: RED, opacity: pop(t, 356.6)}}>échec</div>
            </div>
            <div style={{position: 'absolute', right: 0, top: 0, width: 360, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center'}}>
              <div style={{width: 340, height: 230, borderRadius: 22, overflow: 'hidden', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${GREEN}`, opacity: pop(t, 358.6)}}><Pic src={IMG.adhesion} ic="pouce" w={340} h={230} /></div>
              <Pill at={357.4} c={GREEN} size={30}>influence</Pill>
              <Pill at={358.6} c={GREEN} size={24}>adhésion</Pill>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: GREEN, opacity: pop(t, 360.0), textAlign: 'center', lineHeight: 1}}>succès durable</div>
            </div>
            {t > 362.0 && <div style={{position: 'absolute', left: 0, right: 0, top: 820, textAlign: 'center'}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: DIM}}>la contrainte</span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK}}> → </span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: GREEN, display: 'inline-block', transform: `scale(${pop(t, 363.0)})`}}>la conviction</span></div>}
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
const dings = (L: number[], v = 0.22): Sfx[] => L.map((a) => ({at: a, s: 'sfx/ding', v}));
const stamps = (L: number[]): Sfx[] => L.map((a) => ({at: a, s: 'tampon', v: 0.55}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, ...flaps(0.1, 10), {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 0.8, s: 'validation', v: 0.18})), {at: ALLDONE, s: 'validation', v: 0.35},
  {at: 2.8, s: 'sfx/whoosh', v: 0.22}, {at: 5.26, s: 'sfx/pop', v: 0.22}, {at: 6.4, s: 'sfx/pop', v: 0.2}, {at: 7.6, s: 'sfx/rise', v: 0.2, dur: 1.4}, {at: 9.0, s: 'sfx/thud', v: 0.35},
  {at: 10.3, s: 'sfx/whoosh', v: 0.2}, {at: 12.4, s: 'stylo', v: 0.3}, {at: 14.0, s: 'sfx/rise', v: 0.25, dur: 1.2}, ...flaps(14.26, 10), shine(14.8),
  ...pops(PARC.map((x) => x.a)), ...PARC.map((x) => shine(x.a + 0.3)),
  {at: 35.0, s: 'soft-whoosh', v: 0.4, dur: 1}, {at: 35.62, s: 'sfx/pop', v: 0.25}, ...rep(39.6, 3, 0.2, 'sfx/thud', 0.25), {at: 40.74, s: 'sfx/pop', v: 0.25}, {at: 43.66, s: 'validation', v: 0.3}, {at: 44.74, s: 'sfx/pop', v: 0.22},
  ...rep(53.0, 3, 0.2, 'sfx/thud', 0.3), {at: 58.66, s: 'deep-hit', v: 0.35}, ...rep(58.7, 8, 0.25, 'tick', 0.12), {at: 59.82, s: 'sfx/pop', v: 0.2},
  {at: 63.2, s: 'sfx/whoosh', v: 0.22}, {at: 71.94, s: 'sfx/pop', v: 0.2}, {at: 72.9, s: 'stylo', v: 0.3}, {at: 73.06, s: 'bass-hit', v: 0.3}, {at: 80.62, s: 'sfx/whoosh', v: 0.2}, {at: 81.5, s: 'deep-hit', v: 0.4}, {at: 81.55, s: 'sfx/swish', v: 0.3}, {at: 84.6, s: 'sfx/rise', v: 0.2, dur: 2}, {at: 87.5, s: 'sfx/rise', v: 0.2, dur: 1.5},
  {at: 91.0, s: 'sfx/pop', v: 0.2}, {at: 93.2, s: 'stylo', v: 0.3}, {at: 93.6, s: 'soft-whoosh', v: 0.4, dur: 1}, {at: 95.78, s: 'sfx/ding', v: 0.22},
  {at: 100.3, s: 'sfx/whoosh', v: 0.2}, {at: 101.2, s: 'sfx/swish', v: 0.3}, {at: 101.9, s: 'sfx/thud', v: 0.45}, {at: 106.0, s: 'sfx/whoosh', v: 0.2}, {at: 108.9, s: 'sfx/swish', v: 0.3}, {at: 110.5, s: 'validation', v: 0.3}, ...pops([111.46, 114.02]),
  {at: 115.2, s: 'sfx/whoosh', v: 0.22}, {at: 118.42, s: 'sfx/pop', v: 0.2}, {at: 123.8, s: 'alarme', v: 0.05, dur: 1.2}, {at: 125.9, s: 'sfx/whoosh', v: 0.2}, ...rep(126.8, 10, 0.15, 'sfx/pop', 0.1), ...rep(128.1, 6, 0.15, 'sfx/thud', 0.2), {at: 128.14, s: 'sfx/pop', v: 0.22},
  ...pops([136.3, 137.54, 138.4], 0.25), ...[136.6, 137.8, 138.7].map(shine), {at: 140.98, s: 'sfx/pop', v: 0.2},
  {at: 149.2, s: 'sfx/whoosh', v: 0.22}, {at: 154.1, s: 'deep-hit', v: 0.3}, {at: 154.2, s: 'sfx/rise', v: 0.2, dur: 2.5}, {at: 156.98, s: 'sfx/pop', v: 0.2},
  {at: 158.4, s: 'sfx/whoosh', v: 0.22}, ...pops([162.14, 163.34, 164.14], 0.2), {at: 167.3, s: 'sfx/rise', v: 0.22, dur: 1}, shine(167.6),
  {at: 171.1, s: 'sfx/whoosh', v: 0.2}, ...rep(175.4, 5, 0.4, 'sfx/swish', 0.15), ...stamps([177.9, 178.9]), {at: 179.18, s: 'sfx/thud', v: 0.3},
  {at: 181.86, s: 'sfx/pop', v: 0.22}, {at: 183.3, s: 'stylo', v: 0.3}, {at: 184.22, s: 'sfx/pop', v: 0.22}, {at: 187.14, s: 'sfx/rise', v: 0.15, dur: 0.6}, {at: 188.6, s: 'deep-hit', v: 0.35},
  {at: 190.2, s: 'sfx/whoosh', v: 0.22}, ...rep(190.4, 16, 0.25, 'tick', 0.12), {at: 198.26, s: 'sfx/ding', v: 0.25}, ...pops([201.42, 202.14, 203.18], 0.2),
  {at: 213.58, s: 'sfx/pop', v: 0.2}, {at: 215.9, s: 'stylo', v: 0.3}, {at: 216.86, s: 'validation', v: 0.3}, shine(218.0), ...pops([219.3, 221.4], 0.22),
  {at: 227.4, s: 'alarme', v: 0.07, dur: 1.6}, {at: 227.45, s: 'bass-hit', v: 0.35}, {at: 228.0, s: 'sfx/whoosh', v: 0.22},
  {at: 235.2, s: 'sfx/whoosh', v: 0.2}, {at: 238.22, s: 'sfx/click', v: 0.5}, {at: 239.78, s: 'sfx/click', v: 0.5}, {at: 241.0, s: 'soft-whoosh', v: 0.3}, {at: 244.06, s: 'tampon', v: 0.6}, ...rep(245.6, 14, 0.3, 'tick', 0.1), {at: 249.74, s: 'deep-hit', v: 0.4},
  {at: 252.7, s: 'sfx/whoosh', v: 0.2}, {at: 253.8, s: 'sfx/rise', v: 0.25, dur: 5.5}, ...rep(260.8, 7, 0.25, 'sfx/thud', 0.2), {at: 263.62, s: 'deep-hit', v: 0.4},
  {at: 268.3, s: 'sfx/swish', v: 0.25}, {at: 269.5, s: 'stylo', v: 0.3}, {at: 271.3, s: 'sfx/whoosh', v: 0.22}, {at: 274.14, s: 'sfx/pop', v: 0.2}, {at: 275.7, s: 'tampon', v: 0.6},
  ...searchCues(276.0, 13, 277.3, 277.7), ...[279.18, 280.74, 282.18].flatMap((a) => [{at: a, s: 'sfx/pop', v: 0.22}, {at: a + 0.3, s: 'sfx/ding', v: 0.18}]),
  ...rep(284.0, 6, 0.9, 'soft-whoosh', 0.18), {at: 287.78, s: 'sfx/pop', v: 0.2}, {at: 293.1, s: 'sfx/swish', v: 0.3}, {at: 294.4, s: 'deep-hit', v: 0.45}, {at: 295.02, s: 'sfx/pop', v: 0.2}, {at: 299.0, s: 'sfx/rise', v: 0.15, dur: 2}, {at: 301.42, s: 'tampon', v: 0.6},
  {at: 307.4, s: 'sfx/whoosh', v: 0.2}, {at: 311.58, s: 'sfx/rise', v: 0.25, dur: 1}, ...flaps(311.6, 14), {at: 313.4, s: 'soft-whoosh', v: 0.3}, ...stamps([317.0, 318.1, 318.9]),
  {at: 320.1, s: 'sfx/whoosh', v: 0.2}, ...rep(320.6, 5, 0.7, 'sfx/thud', 0.15), ...pops([322.9, 325.5]),
  {at: 328.0, s: 'sfx/whoosh', v: 0.22}, ...flaps(329.6, 14), {at: 332.8, s: 'sfx/swish', v: 0.3}, {at: 333.6, s: 'sfx/pop', v: 0.25}, {at: 333.9, s: 'soft-whoosh', v: 0.4, dur: 1}, ...pops([334.0, 334.7, 335.4], 0.2), {at: 338.3, s: 'sfx/ding', v: 0.25},
  {at: 340.2, s: 'sfx/whoosh', v: 0.2}, {at: 341.0, s: 'sfx/pop', v: 0.2}, {at: 342.0, s: 'sfx/rise', v: 0.25, dur: 3.5}, ...pops([344.0, 345.1, 345.9], 0.25),
  {at: 349.0, s: 'sfx/whoosh', v: 0.22}, {at: 354.6, s: 'sfx/swish', v: 0.3}, {at: 356.6, s: 'deep-hit', v: 0.3}, {at: 357.0, s: 'sfx/swish', v: 0.3}, {at: 360.0, s: 'validation', v: 0.35}, {at: 363.0, s: 'sfx/rise', v: 0.25, dur: 1},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const InfluenceQhse: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={31.55}><Intro /></Gate>
    <Gate from={34.7} to={49.25}><Profils /></Gate>
    <Gate from={52.4} to={145.85}><Confiance /></Gate>
    <Gate from={149.0} to={224.05}><Terrain /></Gate>
    <Gate from={227.2} to={264.85}><Vigilance /></Gate>
    <Gate from={268.0} to={304.05}><Causes /></Gate>
    <Gate from={307.2} to={OUTRO_AT}><Influence /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}><Gyro i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={366.4}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-influence-qhse-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Kin, Brut, T, TitleBlock, Win, Count, GLASS, LoupeSweep, Check, Tile];
