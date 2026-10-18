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
 * « Les 8 types de permis de travail » (7 min 47) — capsule « condensé + effet wahou + ultra premium » : voix d'origine
 * (sans musique de fond), sous-titres calés mot à mot, photos réelles, thème « papier quadrillé ».
 * Fil rouge : LE TUBE PNEUMATIQUE À SIX GUICHETS (pyramide → 3 piliers → thermique → espace → énergies → limites),
 * adaptés aux parties réellement présentes ; la capsule du dossier file d'un guichet à l'autre, chaque guichet passé se
 * coche. Transition : LE GYROPHARE à chaque partie.
 * Ultra premium : reflets lumineux, cartes en verre dépoli pivotant en 3D, éventail des 8 permis, paperasse
 * déchiquetée, sceau de cire sur le contrat, pyramide inversée de la maîtrise des risques avec couronne, séparation
 * des rôles, trois colonnes qui s'élèvent, équipes coordonnées sans collision, barre de recherche qui trouve puis OUVRE
 * le permis à chaud (étincelles), store vénitien sur photos réelles, bouton PAUSE géant, matrice des énergies, zoom
 * loupe sur le LOTO avec cadenas qui se verrouillent un à un, papier qui brûle, cœur battant.
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
const OUTRO_AT = 467.2;
export const PERMIS_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 74.9, n: '1', title: 'La pyramide des risques', s: 'la hiérarchie des contrôles', c: NAVY, g: 'pyramide', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 158.6, n: '2', title: 'Les 3 piliers fondamentaux', s: 'sécurité · responsabilité · données', c: TEAL, g: '3 piliers', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 207.1, n: '3', title: 'Les risques thermiques', s: 'permis à froid · permis à chaud', c: RED, g: 'thermique', k: 'gyro', lab: 'PARTIE 3 / 6'},
  {at: 255.3, n: '4', title: 'Les risques liés à l’espace', s: 'espace confiné · hauteur', c: ORANGE, g: 'espace', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 310.2, n: '5', title: 'Énergies et installations', s: 'excavation · électricité · LOTO · radiographie', c: VIO, g: 'énergies', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 374.3, n: '6', title: 'Les limites du papier', s: 'la vigilance humaine', c: GREEN, g: 'limites', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 459.0;

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

const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('permisfeu/soudeur-etincelles.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 900, objectFit: 'cover', objectPosition: '50% 40%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 32%, ${PAPER}DD 42%, ${PAPER} 47%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={700} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>8 TYPES INCONTOURNABLES</div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 88, color: INK, marginTop: 10}}>le</div>
        <div style={{display: 'flex', justifyContent: 'center', gap: 10}}>{'PERMIS'.split('').map((c, i) => <Tile key={i} ch={c} size={140} c={RED} />)}</div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 84, color: ORANGE, marginTop: 10}}>de travail</div>
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

const P8 = [{l: 'à froid', ic: 'froid', c: BLUE}, {l: 'à chaud', ic: 'feu', c: RED}, {l: 'espace confiné', ic: 'trinome', c: ORANGE}, {l: 'en hauteur', ic: 'echelle', c: GOLD}, {l: 'excavation', ic: 'pelle', c: BURG}, {l: 'électricité', ic: 'eclair', c: YEL}, {l: 'consignation', ic: 'cadenas', c: VIO}, {l: 'radiographie', ic: 'radioactif', c: TEAL}];

/* ═════════════ INTRO ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const ph = t < 21.9 ? 0 : t < 49.5 ? 1 : 2;
  const shred = prog(t, 17.4, 18.8);
  return (
    <Out end={74.95}>
      <HiLine words={ph === 0 ? ['Les', '8', 'permis', 'de', 'travail'] : ph === 1 ? ['Des', 'outils', 'de', 'sauvetage'] : ['Avant', 'le', 'premier', 'outil']} mark={ph === 0 ? [1, 2] : ph === 1 ? [1, 3] : [3]} at={[2.7, 22.3, 49.9][ph]} y={330} size={60} />
      {ph === 0 && (
        <>
          <Abs x={0} y={440} w={1080} h={560}>
            {P8.map((p, k) => {
              const f = prog(t, 2.8 + k * 0.07, 3.6 + k * 0.07, easeOut) * (1 - prog(t, 7.6, 8.2));
              const ang = lerp(0, (k - 3.5) * 11, f);
              return <div key={p.l} style={{position: 'absolute', left: 540 - 110, top: 160, width: 220, height: 300, transformOrigin: '50% 140%', transform: `rotate(${ang}deg)`, background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `6px 6px 0 ${p.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: pop(t, 2.8) * (1 - prog(t, 7.8, 8.2))}}><F n={p.ic} size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, textAlign: 'center'}}>{p.l}</div></div>;
            })}
          </Abs>
          {t > 7.8 && (
            <Abs x={240} y={460} w={600} h={520}>
              {Array.from({length: 10}, (_, k) => {
                const col = k;
                const fall = prog(t, 17.5 + k * 0.05, 18.9 + k * 0.05, easeIn);
                return <div key={k} style={{position: 'absolute', left: col * 60, top: 0, width: 60, height: 520, overflow: 'hidden', transform: `translateY(${fall * 700}px) rotate(${fall * (k % 2 ? 14 : -14)}deg)`, opacity: 1 - fall}}>
                  <div style={{position: 'absolute', left: -col * 60, top: 0, width: 600, height: 520, background: '#FFFDF4', border: `5px solid ${INK}`, borderRadius: 14}}>
                    <div style={{position: 'absolute', left: 30, top: 24, fontFamily: MONO, fontWeight: 700, fontSize: 26, color: DIM}}>FORMULAIRE · À COCHER</div>
                    {Array.from({length: 7}, (_, j) => <div key={j} style={{position: 'absolute', left: 30, top: 90 + j * 58, display: 'flex', gap: 14, alignItems: 'center'}}><div style={{width: 36, height: 36, border: `4px solid ${INK}`, borderRadius: 6, background: t > 9 + j * 0.25 ? GREEN : '#fff'}} /><div style={{width: 400, height: 12, borderRadius: 6, background: '#D9DFE8'}} /></div>)}
                  </div>
                </div>;
              })}
            </Abs>
          )}
          {t > 7.8 && shred < 1 && <Stamp at={16.4} c={RED} text="mythe" x={360} y={700} rot={-8} size={100} />}
          <Abs x={0} y={1060} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16}}><Pill at={19.9} c={VIO} size={36}>fascinante</Pill><Pill at={21.3} c={NAVY} size={36}>stratégique</Pill></Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <Abs x={0} y={450} w={1080} style={{textAlign: 'center'}}><span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 42, color: DIM, opacity: pop(t, 23.0)}}>des freins administratifs<Strike p={prog(t, 24.2, 24.7)} c={RED} /></span></Abs>
          {t < 35.9 && (
            <GlassCard x={140} y={540} w={800} h={420} at={26.0} c={TEAL}>
              <div style={{display: 'flex', alignItems: 'center', gap: 30, padding: '50px 40px'}}><F n="bouclier" size={170} /><div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44}}>des outils de sauvetage</div><span style={{position: 'relative', display: 'inline-block', marginTop: 18, fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: DIM, opacity: pop(t, 31.1)}}>une corvée<Strike p={prog(t, 31.6, 32.1)} c={RED} /></span><div style={{marginTop: 14}}><Pill at={33.4} c={TEAL} size={30}>nouveau paradigme</Pill></div></div></div>
            </GlassCard>
          )}
          {t >= 35.9 && <GlassCard x={140} y={540} w={800} h={420} at={35.9} c={NAVY}>
            <div style={{position: 'absolute', left: 40, top: 30, fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM}}>CONTRAT DE SÉCURITÉ</div>
            {Array.from({length: 5}, (_, k) => <div key={k} style={{position: 'absolute', left: 40, top: 90 + k * 46, width: 480 - k * 40, height: 14, borderRadius: 7, background: '#D9DFE8'}} />)}
            <div style={{position: 'absolute', right: 50, bottom: 40, width: 170, height: 170, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, #E25555, ${BURG})`, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 26, textAlign: 'center', transform: `scale(${Math.max(0, Math.min(1.15, spring(t, 39.2, 7, 9)))}) rotate(-12deg)`}}>INDÉ-<br />FECTIBLE</div>
          </GlassCard>}
          <Abs x={60} y={1000} w={960} h={380} style={{opacity: pop(t, 42.0)}}>
            <div style={{position: 'absolute', left: 40, top: 40, textAlign: 'center'}}><F n="directeur" size={150} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>la direction</div></div>
            <div style={{position: 'absolute', right: 40, top: 40, textAlign: 'center', opacity: pop(t, 44.4)}}><F n="ouvrier" size={150} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>les opérateurs</div></div>
            <svg width={960} height={300} style={{position: 'absolute', left: 0, top: 0}}><line x1={240} y1={110} x2={lerp(240, 720, prog(t, 43.1, 44.4))} y2={110} stroke={TEAL} strokeWidth={10} strokeDasharray="20 12" /></svg>
            {t > 46.8 && [0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 340 + k * 110, top: 150 + Math.sin(t * 4 + k) * 10, opacity: pop(t, 46.9 + k * 0.25)}}><F n="bulle" size={80} /></div>)}
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <Abs x={60} y={450} w={960} h={400}>
            {Array.from({length: 12}, (_, k) => {const o = prog(t, 51.3, 52.6, easeInOut); const cx = lerp(80 + random(`cx${k}`) * 800, 60 + (k % 6) * 150, o); const cy = lerp(20 + random(`cy${k}`) * 300, 60 + Math.floor(k / 6) * 160, o); return <div key={k} style={{position: 'absolute', left: cx, top: cy, transform: `rotate(${lerp(random(`cr${k}`) * 180 - 90, 0, o)}deg)`, opacity: pop(t, 50.1)}}><F n={['danger', 'feu', 'eclair', 'boulon'][k % 4]} size={90} /></div>;})}
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 52, color: GREEN, opacity: pop(t, 52.7)}}>le chaos est maîtrisé</div>
          </Abs>
          <GlassCard x={60} y={880} w={960} h={600} at={60.9} c={BLUE}>
            <div style={{position: 'absolute', left: 30, top: 20}}><Mono at={61.0} c={BLUE} size={22}>programme</Mono></div>
            {[{l: 'la pyramide des risques', a: 62.9}, {l: 'les 3 piliers fondamentaux', a: 65.5}, {l: 'les 8 permis essentiels', a: 69.9}, {l: 'les limites du format papier', a: 73.5}].map((x, k) => <div key={x.l} style={{position: 'absolute', left: 40, top: 80 + k * 125, display: 'flex', alignItems: 'center', gap: 20, opacity: pop(t, x.a), transform: `translateX(${(1 - pop(t, x.a)) * -60}px)`}}><Num n={k + 1} c={[NAVY, TEAL, RED, GREEN][k]} size={80} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38}}>{x.l}</div></div>)}
          </GlassCard>
          {t > 55.2 && t < 60.9 && <Abs x={380} y={900} w={320} h={300} style={{textAlign: 'center', opacity: pop(t, 55.3)}}><F n="boite-outils" size={180} /><div style={{position: 'absolute', left: 200, top: 120, transform: `scale(${pop(t, 55.8)})`}}><F n="cadenas" size={110} /></div></Abs>}
        </>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 1 : LA PYRAMIDE ═════════════ */
const LV = [{l: 'éliminer le risque', a: 96.5, c: GREEN}, {l: 'substitution', a: 101.1, c: TEAL}, {l: 'contrôle technique', a: 103.5, c: BLUE}, {l: 'contrôle administratif', a: 110.6, c: ORANGE}, {l: 'EPI', a: 119.1, c: RED}];
const Pyramide: React.FC = () => {
  const t = useT();
  const ph = t < 121.4 ? 0 : 1;
  const crown = Math.max(0, Math.min(1, spring(t, 113.4, 7, 10)));
  return (
    <Out end={158.65}>
      <HiLine words={ph === 0 ? ['La', 'pyramide', 'des', 'risques'] : ['Une', 'autorisation', 'écrite']} mark={ph === 0 ? [1, 3] : [1, 2]} at={ph === 0 ? 78.4 : 121.5} y={330} size={62} />
      {ph === 0 && (
        <>
          <Abs x={60} y={450} w={960} h={1000}>
            {LV.map((v, k) => {
              const w = 940 - k * 150;
              const on = pop(t, v.a);
              const isAdm = k === 3;
              return (
                <div key={v.l} style={{position: 'absolute', left: (960 - w) / 2, top: 20 + k * 175, width: w, height: 150, clipPath: `polygon(0 0, 100% 0, ${100 - (75 / w) * 100}% 100%, ${(75 / w) * 100}% 100%)`, background: on > 0 ? `linear-gradient(90deg, ${v.c}, ${v.c}CC)` : '#E3E8EF', opacity: 0.25 + 0.75 * on, transform: `scale(${isAdm && t > 112.3 ? 1.04 + 0.02 * Math.sin(t * 5) : 1})`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16}}>
                  <div style={{width: 64, height: 64, borderRadius: 32, background: '#fff', border: `4px solid ${INK}`, fontFamily: sansFont, fontWeight: 900, fontSize: 36, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{k + 1}</div>
                  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: w > 500 ? 40 : 32, color: '#fff', textShadow: `2px 2px 0 ${INK}`}}>{v.l}</div>
                </div>
              );
            })}
            {crown > 0 && <div style={{position: 'absolute', left: 820, top: 20 + 3 * 175 - 30, transform: `scale(${crown}) rotate(${(1 - crown) * 90}deg)`, filter: `drop-shadow(0 0 20px ${GOLD})`}}><F n="couronne" size={130} /></div>}
            {crown > 0 && <div style={{position: 'absolute', left: 40, top: 20 + 3 * 175 + 30, opacity: crown}}><Pill at={113.5} c={ORANGE} size={26}>le permis de travail</Pill></div>}
          </Abs>
          <Abs x={0} y={1350} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 48, color: RED, opacity: pop(t, 117.2)}}>l’EPI : l’ultime rempart</Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <GlassCard x={60} y={450} w={960} h={430} at={121.6} c={ORANGE}>
            <div style={{display: 'flex', alignItems: 'center', gap: 30, padding: '40px 40px'}}><F n="clipboard" size={170} /><div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44}}>autorisation écrite</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: RED, marginTop: 10, opacity: pop(t, 127.5)}}>conditions ultra strictes</div><span style={{position: 'relative', display: 'inline-block', marginTop: 16, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM, opacity: pop(t, 129.4)}}>laissez-passer illimité<Strike p={prog(t, 131.8, 132.3)} c={RED} /></span></div></div>
            <div style={{position: 'absolute', left: 40, bottom: 30, display: 'flex', gap: 12}}><Pill at={132.6} c={NAVY} size={26}>tâches spécifiques</Pill><Pill at={134.6} c={RED} size={26}>haut risque</Pill><Pill at={135.6} c={ORANGE} size={26}>délai serré</Pill></div>
          </GlassCard>
          <Abs x={60} y={920} w={960} h={520} style={{opacity: pop(t, 139.9)}}>
            <div style={{position: 'absolute', left: 60, top: 40, textAlign: 'center'}}><F n="ouvrier" size={170} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>fait les travaux</div></div>
            <div style={{position: 'absolute', left: 476, top: 0, width: 8, height: 380, background: `repeating-linear-gradient(180deg, ${INK} 0 20px, transparent 20px 34px)`, opacity: pop(t, 149.9)}} />
            <div style={{position: 'absolute', right: 60, top: 40, textAlign: 'center', opacity: pop(t, 141.1)}}><F n="auditeur" size={170} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>tiers qualifié</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: TEAL}}>non participant</div></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 300, textAlign: 'center'}}><Pill at={150.0} c={TEAL} size={30}>séparation des rôles → objectivité</Pill></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 390, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: pop(t, 155.1)}}><div style={{filter: `grayscale(${prog(t, 155.4, 156.2)})`}}><F n="yeux" size={80} /></div><span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: DIM}}>fermer les yeux par habitude<Strike p={prog(t, 156.4, 156.9)} c={RED} /></span></div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 2 : LES 3 PILIERS ═════════════ */
const Piliers: React.FC = () => {
  const t = useT();
  const COL = [{l: 'sécurité du personnel', ic: 'casque', a: 172.4, c: TEAL, sub: ['matériel prêt', 'plan d’évacuation'], sa: [178.8, 180.0]}, {l: 'responsabilisation', ic: 'ecrit', a: 184.6, c: NAVY, sub: ['qui a approuvé', 'qui a agi'], sa: [191.3, 192.2]}, {l: 'analyse des données', ic: 'loupe', a: 196.3, c: GOLD, sub: ['mine d’or', 'éviter les catastrophes'], sa: [200.9, 204.6]}];
  return (
    <Out end={207.15}>
      <HiLine words={['Trois', 'fondations', 'solides']} mark={[0, 1]} at={162.1} y={330} size={64} />
      <Abs x={60} y={1420} w={960} h={36} style={{background: INK, borderRadius: 10, opacity: pop(t, 168.7)}} />
      {COL.map((c, k) => {
        const h = prog(t, c.a, c.a + 0.9, easeOut);
        return (
          <Abs key={c.l} x={70 + k * 320} y={1420 - 900 * h} w={300} h={900 * h + 1} style={{background: `linear-gradient(90deg, #fff, ${c.c}22 40%, #fff)`, border: `5px solid ${INK}`, borderRadius: 16, boxShadow: `8px 8px 0 ${c.c}`, overflow: 'hidden', opacity: t >= c.a ? 1 : 0}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30, gap: 14, textAlign: 'center'}}>
              <Num n={k + 1} c={c.c} size={80} /><F n={c.ic} size={120} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: c.l.length > 15 ? 22 : 28, padding: '0 8px', wordBreak: 'break-word'}}>{c.l}</div>
              {c.sub.map((s0, j) => <div key={s0} style={{opacity: pop(t, c.sa[j]), marginTop: 6}}><Pill at={c.sa[j]} c={c.c} size={22}>{s0}</Pill></div>)}
            </div>
            <Shine at={c.a + 1.0} />
          </Abs>
        );
      })}
      {t > 200.9 && t < 207.1 && <Dust n={12} c={GOLD} />}
    </Out>
  );
};

/* ═════════════ PARTIE 3 : THERMIQUE ═════════════ */
const Thermique: React.FC = () => {
  const t = useT();
  const ph = t < 235.6 ? 0 : 1;
  const tt = Math.max(0, t - 228);
  return (
    <Out end={255.35}>
      <HiLine words={ph === 0 ? ['Froid', 'ou', 'chaud', '?'] : ['Le', 'permis', 'à', 'chaud']} mark={ph === 0 ? [0, 2] : [1, 3]} at={ph === 0 ? 210.7 : 235.7} y={330} size={66} />
      {ph === 0 && (
        <>
          <GlassCard x={60} y={450} w={460} h={430} at={221.3} c={BLUE}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 34, gap: 12, textAlign: 'center'}}><F n="froid" size={140} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: BLUE}}>permis à froid</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM, opacity: pop(t, 225.0)}}>aucune étincelle · aucune chaleur</div></div>
          </GlassCard>
          <Abs x={560} y={450} w={460} h={430} style={{border: `5px dashed ${RED}`, borderRadius: 26, opacity: pop(t, 221.6) * 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="feu" size={140} /></Abs>
          <GlassCard x={60} y={920} w={960} h={520} at={227.6} c={BLUE}>
            <div style={{position: 'absolute', left: 30, top: 20}}><Mono at={227.8} c={BLUE} size={22}>coordination · plusieurs équipes, même zone</Mono></div>
            <svg width={960} height={520} style={{position: 'absolute', left: 0, top: 0}}>
              {[0, 1, 2].map((k) => <path key={k} d={['M80 420 C 300 400, 400 140, 880 120', 'M80 120 C 380 160, 520 420, 880 420', 'M480 470 C 470 360, 500 200, 480 70'][k]} fill="none" stroke={[BLUE, ORANGE, VIO][k]} strokeWidth={6} strokeDasharray="14 12" opacity={0.6} />)}
            </svg>
            {[0, 1, 2].map((k) => {const ph2 = ((tt * 0.25 + k * 0.33) % 1); const P = [[80, 420, 300, 400, 400, 140, 880, 120], [80, 120, 380, 160, 520, 420, 880, 420], [480, 470, 470, 360, 500, 200, 480, 70]][k]; const u = ph2, b = (a0: number, a1: number, a2: number, a3: number) => (1 - u) ** 3 * a0 + 3 * (1 - u) ** 2 * u * a1 + 3 * (1 - u) * u * u * a2 + u ** 3 * a3; return <div key={k} style={{position: 'absolute', left: b(P[0], P[2], P[4], P[6]) - 45, top: b(P[1], P[3], P[5], P[7]) - 45, opacity: t > 229 ? 1 : 0}}><div style={{width: 90, height: 90, borderRadius: 45, background: [BLUE, ORANGE, VIO][k], border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="equipe" size={60} /></div></div>;})}
            <div style={{position: 'absolute', right: 30, bottom: 24}}><Pill at={233.5} c={GREEN} size={26}>aucune collision</Pill></div>
          </GlassCard>
        </>
      )}
      {ph === 1 && (
        <SearchOpen x={60} y={440} w={960} h={1000} at={235.7} query="permis pour soudure" results={['Permis de travail à froid', 'Permis de travail à chaud', 'Permis en espace confiné']} found={1} foundAt={237.8} clickAt={238.3} c={RED}>
          <div style={{position: 'absolute', left: 30, right: 30, top: 24, height: 380, borderRadius: 20, overflow: 'hidden', border: `5px solid ${INK}`}}>
            <Img src={PH('permisfeu/soudeur-etincelles.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', filter: `saturate(${1 + 0.3 * Math.sin(t * 8)})`}} />
            {Array.from({length: 14}, (_, k) => {const ph2 = ((t * (1.2 + random(`sp${k}`)) + random(`so${k}`)) % 1); return <div key={k} style={{position: 'absolute', left: 300 + random(`sx${k}`) * 300 + ph2 * (random(`sd${k}`) - 0.5) * 500, top: 200 - ph2 * 160 + ph2 * ph2 * 320, width: 10, height: 10, borderRadius: 5, background: YEL, boxShadow: `0 0 12px ${ORANGE}`, opacity: 1 - ph2}} />;})}
          </div>
          <div style={{position: 'absolute', left: 30, top: 430, display: 'flex', alignItems: 'center', gap: 20, opacity: pop(t, 239.3)}}>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM}}>niveau de danger</div>
            <div style={{width: 520, height: 40, borderRadius: 20, background: '#E3E8EF', border: `4px solid ${INK}`, overflow: 'hidden'}}><div style={{width: `${lerp(20, 95, prog(t, 239.4, 240.2, easeOut))}%`, height: '100%', background: `linear-gradient(90deg, ${GOLD}, ${RED})`}} /></div>
          </div>
          <div style={{position: 'absolute', left: 30, top: 500}}><Pill at={244.7} c={RED} size={28}>cause majeure d’incendie professionnel</Pill></div>
          <div style={{position: 'absolute', left: 30, right: 30, top: 580, display: 'flex', flexDirection: 'column', gap: 16}}>
            <Check at={249.1} label="listes de contrôle incendie" c={RED} size={30} />
            <Check at={251.3} label="extincteurs prêts à l’emploi" c={RED} size={30} />
            <Check at={252.5} label="plan d’évacuation spécifique" c={RED} size={30} />
          </div>
        </SearchOpen>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 4 : ESPACE ═════════════ */
const Espace: React.FC = () => {
  const t = useT();
  const ph = t < 287.1 ? 0 : 1;
  const press = prog(t, 296.6, 296.9) * (1 - prog(t, 297.1, 297.5));
  const ring = (t - 296.9) / 0.8;
  return (
    <Out end={310.25}>
      <HiLine words={ph === 0 ? ['Les', 'espaces', 'confinés'] : ['Le', 'travail', 'en', 'hauteur']} mark={ph === 0 ? [1, 2] : [3]} at={ph === 0 ? 258.8 : 287.2} y={330} size={64} />
      {ph === 0 && (
        <>
          {t > 259.0 && <Blinds src="confines/regard.jpg" x={60} y={450} w={960} h={420} at={259.1} pos="50% 50%" n={12}>
            <div style={{position: 'absolute', left: 20, bottom: 20, display: 'flex', gap: 12}}><Pill at={264.7} c={ORANGE} size={28}>préparation chirurgicale</Pill></div>
          </Blinds>}
          <GlassCard x={60} y={910} w={960} h={540} at={268.0} c={ORANGE}>
            <div style={{position: 'absolute', left: 30, top: 20, display: 'flex', gap: 12}}><Mono at={268.2} c={ORANGE} size={22}>barrière administrative</Mono>{t > 274.2 && <Mono at={274.2} c={NAVY} size={22}>checklist · normes internationales</Mono>}</div>
            <div style={{position: 'absolute', left: 30, right: 360, top: 90, display: 'flex', flexDirection: 'column', gap: 16}}>
              <Check at={278.9} label="ventilation" c={ORANGE} size={30} />
              <Check at={280.0} label="absence de gaz toxique" c={ORANGE} size={30} />
              <Check at={282.7} label="observateurs à l’extérieur" c={ORANGE} size={30} />
            </div>
            {t < 278.8 && <div style={{position: 'absolute', left: 0, right: 0, top: 140, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30, opacity: pop(t, 268.4)}}><F n="barriere" size={160} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36}}>face à l’imprévisible<br />et au toxique</div></div>}
            <div style={{position: 'absolute', right: 40, top: 100, width: 280, height: 320, background: NIGHT, border: `5px solid ${INK}`, borderRadius: 22, opacity: pop(t, 279.8), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}>
              <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#8B95A8'}}>DÉTECTEUR</div>
              <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 40, color: GREEN}}>gaz : 0</div>
              <div style={{width: 30, height: 30, borderRadius: 15, background: GREEN, boxShadow: `0 0 ${20 + 10 * Math.sin(t * 6)}px ${GREEN}`}} />
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 24, textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 44, color: ORANGE, opacity: pop(t, 285.2)}}>rien n’est laissé au hasard</div>
          </GlassCard>
        </>
      )}
      {ph === 1 && (
        <>
          {t > 287.3 && <Blinds src="epiepc/hauteur.jpg" x={60} y={450} w={960} h={420} at={287.4} pos="50% 40%" n={12}>
            <div style={{position: 'absolute', left: 20, bottom: 20}}><Pill at={291.6} c={RED} size={28}>les chutes : causes fréquentes</Pill></div>
          </Blinds>}
          <Abs x={60} y={900} w={460} h={540} style={{opacity: pop(t, 295.9)}}>
            {ring > 0 && ring < 1 && <div style={{position: 'absolute', left: 230 - ring * 220, top: 230 - ring * 220, width: ring * 440, height: ring * 440, borderRadius: '50%', border: `10px solid ${RED}`, opacity: 1 - ring}} />}
            <div style={{position: 'absolute', left: 60, top: 60, width: 340, height: 340, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, #FF8A7A, ${RED})`, border: `10px solid ${INK}`, boxShadow: `0 ${20 - press * 16}px 0 #7A1F1A`, transform: `translateY(${press * 16}px)`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24}}>
              <div style={{width: 40, height: 140, background: '#fff', borderRadius: 8}} /><div style={{width: 40, height: 140, background: '#fff', borderRadius: 8}} />
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34}}>pause obligatoire</div>
          </Abs>
          <Abs x={560} y={920} w={460} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            <Check at={300.7} label="inspecter" c={GOLD} size={30} />
            <Check at={302.9} label="barrières en place" c={GOLD} size={30} />
            <Check at={305.5} label="harnais antichute" c={GOLD} size={30} />
            <div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 10, opacity: pop(t, 307.0)}}><F n="echelle" size={80} /><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 36, color: RED}}>…avant de grimper</div></div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 5 : ÉNERGIES ═════════════ */
const MX = [{p: 'excavation', ic: 'pelle', r: 'réseaux souterrains', e: 'relevé topo + plan', a: 319.0, c: BURG}, {p: 'électricité', ic: 'eclair', r: 'choc mortel · incendie', e: 'certificat d’isolation', a: 325.7, c: GOLD}, {p: 'consignation (LOTO)', ic: 'cadenas', r: 'énergies méca · chimiques', e: 'tolérance zéro', a: 332.0, c: VIO}, {p: 'radiographie', ic: 'radioactif', r: 'rayons X', e: 'ciblée · isolée', a: 339.5, c: TEAL}];
const Energies: React.FC = () => {
  const t = useT();
  const ph = t < 345.4 ? 0 : 1;
  const locks = [358.2, 359.0, 360.6, 361.6];
  return (
    <Out end={374.35}>
      <HiLine words={ph === 0 ? ['La', 'matrice', 'des', 'énergies'] : ['Zoom', 'sur', 'le', 'LOTO']} mark={ph === 0 ? [1, 3] : [3]} at={ph === 0 ? 313.8 : 345.5} y={330} size={62} />
      {ph === 0 && (
        <GlassCard x={40} y={450} w={1000} h={1000} at={314.9} c={VIO}>
          <div style={{display: 'flex', padding: '24px 24px 10px', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}><div style={{width: 330}}>PERMIS</div><div style={{width: 300}}>RISQUE</div><div>EXIGENCE</div></div>
          {MX.map((m, k) => (
            <div key={m.p} style={{display: 'flex', alignItems: 'center', margin: '14px 20px', height: 200, background: '#fff', border: `4px solid ${INK}`, borderRadius: 18, boxShadow: `6px 6px 0 ${m.c}`, opacity: pop(t, m.a), transform: `translateX(${(1 - pop(t, m.a)) * 80}px)`}}>
              <div style={{width: 330, display: 'flex', alignItems: 'center', gap: 14, paddingLeft: 16}}><F n={m.ic} size={80} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>{m.p}</div></div>
              <div style={{width: 300, fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: RED, opacity: pop(t, m.a + 1.0)}}>{m.r}</div>
              <div style={{flex: 1, paddingRight: 14, opacity: pop(t, m.a + 2.4)}}><Pill at={m.a + 2.4} c={m.c} size={22}>{m.e}</Pill></div>
            </div>
          ))}
        </GlassCard>
      )}
      {ph === 1 && (
        <>
          <Abs x={140} y={450} w={800} h={640} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 30, boxShadow: `10px 10px 0 ${VIO}`, opacity: pop(t, 345.6), transform: `scale(${lerp(0.4, 1, prog(t, 345.6, 346.6, easeOut))})`, overflow: 'hidden'}}>
            <div style={{position: 'absolute', left: 30, top: 20}}><Mono at={345.8} c={VIO} size={24}>LOTO · consignation</Mono></div>
            <div style={{position: 'absolute', left: 40, top: 100, opacity: pop(t, 353.1), textAlign: 'center'}}><F n="engrenage" size={80} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 18}}>moteur</div></div>
            <div style={{position: 'absolute', left: 40, top: 220, opacity: pop(t, 354.3), textAlign: 'center'}}><F n="goutte" size={80} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 18}}>hydraulique</div></div>
            <Stamp at={350.4} c={RED} text="tolérance zéro" x={330} y={330} rot={-6} size={34} />
            <div style={{position: 'absolute', left: 300, top: 110, width: 200, height: 120, border: `14px solid ${INK}`, borderBottom: 'none', borderRadius: '100px 100px 0 0'}} />
            <div style={{position: 'absolute', left: 240, top: 220, width: 320, height: 90, background: '#C9D2DF', border: `6px solid ${INK}`, borderRadius: 14}} />
            {locks.map((a, k) => {
              const on = pop(t, a) * (1 - prog(t, 364.6 + k * 0.3, 365.0 + k * 0.3));
              return <div key={k} style={{position: 'absolute', left: 230 + k * 90, top: lerp(-120, 300, on), opacity: on}}><F n="cadenas" size={90} /></div>;
            })}
            <div style={{position: 'absolute', left: 0, right: 0, top: 440, display: 'flex', justifyContent: 'center', gap: 10}}>{locks.map((a, k) => <div key={k} style={{opacity: pop(t, a)}}><F n={k % 2 ? 'ouvrier' : 'salarie'} size={70} /></div>)}</div>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: VIO, opacity: pop(t, 358.0)}}>toutes les parties prenantes sur place</div>
          </Abs>
          <GlassCard x={60} y={1130} w={960} h={320} at={366.5} c={RED}>
            <div style={{display: 'flex', alignItems: 'center', gap: 30, padding: '40px 40px'}}>
              <div style={{position: 'relative'}}><F n="engrenage" size={140} /><div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 120, color: RED, opacity: pop(t, 369.9)}}>✗</div></div>
              <div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34}}>jamais de redémarrage</div><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 40, color: RED, marginTop: 8, opacity: pop(t, 372.4)}}>tant qu’un technicien est à l’intérieur</div></div>
            </div>
          </GlassCard>
        </>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 6 : LES LIMITES DU PAPIER ═════════════ */
const QUOTE = '« Le contrôle administratif des risques demeure la quatrième option… et ne doit pas être le seul recours. »';
const Limites: React.FC = () => {
  const t = useT();
  const ph = t < 402.0 ? 0 : t < 425.4 ? 1 : t < 453.7 ? 2 : 3;
  const typed = Math.floor(prog(t, 391.1, 397.0) * QUOTE.length);
  const fall = prog(t, 407.5, 410.4, easeIn);
  const burn = prog(t, 411.0, 412.6);
  const beat = Math.abs(Math.sin(t * 6));
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={ph === 0 ? ['Les', 'limites', 'du', 'papier'] : ph === 1 ? ['Le', 'papier', 'ne', 'rattrape', 'pas'] : ph === 2 ? ['La', 'vigilance', 'humaine'] : ['Squelette', 'et', 'cœur']} mark={ph === 0 ? [1, 3] : ph === 1 ? [3] : ph === 2 ? [1, 2] : [0, 2]} at={[377.9, 402.1, 425.5, 453.8][ph]} y={330} size={60} />
      {ph === 0 && (
        <GlassCard x={60} y={460} w={960} h={760} at={388.6} c={GREEN}>
          <div style={{position: 'absolute', left: 30, top: 10, fontFamily: sansFont, fontWeight: 900, fontSize: 200, color: `${GREEN}55`, lineHeight: 1}}>“</div>
          <div style={{position: 'absolute', left: 60, right: 60, top: 140, fontFamily: sansFont, fontWeight: 800, fontSize: 44, lineHeight: 1.35, color: INK}}>{QUOTE.slice(0, typed)}<span style={{opacity: Math.sin(t * 10) > 0 && typed < QUOTE.length ? 1 : 0, color: GREEN}}>▍</span></div>
          <Stamp at={398.0} c={RED} text="mise en garde" x={260} y={560} rot={-6} size={64} />
        </GlassCard>
      )}
      {ph === 1 && (
        <>
          <Abs x={140} y={460} w={800} h={700}>
            <div style={{position: 'absolute', left: 120, top: 260, width: 560, height: 380, background: '#FFFDF4', border: `5px solid ${INK}`, borderRadius: 14, clipPath: `inset(${burn * 100}% 0 0 0)`, boxShadow: burn > 0 ? `0 -10px 30px ${ORANGE}` : 'none'}}>
              <div style={{position: 'absolute', left: 30, top: 24, fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM}}>PERMIS · signé ✓</div>
              {Array.from({length: 5}, (_, j) => <div key={j} style={{position: 'absolute', left: 30, top: 80 + j * 56, display: 'flex', gap: 14, alignItems: 'center'}}><div style={{width: 34, height: 34, border: `4px solid ${INK}`, borderRadius: 6, background: GREEN, color: '#fff', fontWeight: 900, fontSize: 24, textAlign: 'center'}}>✓</div><div style={{width: 380, height: 12, borderRadius: 6, background: '#D9DFE8'}} /></div>)}
            </div>
            {burn > 0 && burn < 1 && <div style={{position: 'absolute', left: 300, top: 240 + burn * 380 - 90}}><F n="feu" size={150} /></div>}
            {t > 407.4 && <div style={{position: 'absolute', left: 560, top: lerp(-120, 760, fall), transform: `rotate(${fall * 200}deg)`, opacity: 1 - prog(t, 409.8, 410.4)}}><F n="ouvrier" size={140} /></div>}
          </Abs>
          <Abs x={60} y={1190} w={960} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap'}}>
            <Pill at={415.2} c={TEAL} size={30}>d’incroyables facilitateurs</Pill>
            <div style={{display: 'flex', gap: 10, opacity: pop(t, 420.0)}}><F n="epi-ble" size={70} /><F n="cadenas" size={70} /></div>
          </Abs>
          <Abs x={0} y={1320} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 50, color: GREEN, opacity: pop(t, 422.4)}}>ils organisent, ils ne remplacent pas</Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <GlassCard x={60} y={460} w={960} h={380} at={425.5} c={TEAL}>
            <div style={{position: 'absolute', left: 30, top: 20}}><Mono at={425.6} c={TEAL} size={22}>culture d’entreprise</Mono></div>
            <div style={{position: 'absolute', left: 40, top: 90, textAlign: 'center', opacity: pop(t, 429.0)}}><F n="clipboard" size={120} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26}}>documentée</div></div>
            <div style={{position: 'absolute', left: 260, top: 130, fontFamily: sansFont, fontWeight: 900, fontSize: 60, opacity: pop(t, 432.7)}}>≠</div>
            <div style={{position: 'absolute', left: 380, right: 30, top: 70, display: 'flex', flexWrap: 'wrap', gap: 8, opacity: pop(t, 433.0)}}>{Array.from({length: 18}, (_, k) => <div key={k} style={{width: 80, height: 50, borderRadius: 8, border: `3px solid ${INK}`, background: t > 433.2 + k * 0.2 ? TEAL : '#EEF1F5'}} />)}</div>
            <div style={{position: 'absolute', left: 380, bottom: 24, fontFamily: handFont, fontWeight: 700, fontSize: 38, color: TEAL, opacity: pop(t, 434.0)}}>construite seconde après seconde</div>
          </GlassCard>
          <Abs x={0} y={880} w={1080} style={{textAlign: 'center', opacity: pop(t, 441.1)}}><div style={{display: 'inline-block', fontFamily: sansFont, fontWeight: 900, fontSize: 40, background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, padding: '16px 24px', boxShadow: `7px 7px 0 ${ORANGE}`}}>le papier, à lui seul, suffit-il ?</div></Abs>
          <Abs x={60} y={1030} w={960} style={{display: 'flex', justifyContent: 'center', gap: 12}}>{P8.map((p, k) => <div key={p.l} style={{width: 104, height: 104, borderRadius: 18, background: '#fff', border: `4px solid ${INK}`, boxShadow: `4px 4px 0 ${p.c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 446.5 + k * 0.08)}}><F n={p.ic} size={70} /></div>)}</Abs>
          <Abs x={0} y={1200} w={1080} style={{textAlign: 'center'}}><span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK, opacity: pop(t, 450.8)}}>le papier seul protège<Strike p={prog(t, 452.0, 452.6)} c={RED} /></span></Abs>
        </>
      )}
      {ph === 3 && (
        <>
          <GlassCard x={60} y={460} w={460} h={600} at={455.0} c={NAVY}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 50, gap: 16, textAlign: 'center'}}><F n="clipboard" size={150} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32}}>la procédure administrative</div><Pill at={456.8} c={NAVY} size={30}>le squelette</Pill></div>
          </GlassCard>
          <GlassCard x={560} y={460} w={460} h={600} at={458.5} c={RED}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 50, gap: 16, textAlign: 'center'}}><div style={{transform: `scale(${1 + 0.15 * beat})`, filter: `drop-shadow(0 0 ${20 * beat}px ${RED})`}}><F n="coeur" size={150} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32}}>l’attention humaine</div><Pill at={459.6} c={RED} size={30}>le cœur battant</Pill></div>
          </GlassCard>
          <Abs x={0} y={1110} w={1080}><Board text="NOS ACTES" at={454.0} h={96} c={GREEN} stag={0.04} /></Abs>
          {t > ALLDONE && <Dust n={24} c={GOLD} />}
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
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 1.4, s: 'validation', v: 0.2})), {at: ALLDONE, s: 'validation', v: 0.35},
  ...rep(2.8, 8, 0.07, 'sfx/swish', 0.12), {at: 7.8, s: 'page', v: 0.35}, ...rep(9.0, 7, 0.25, 'sfx/click', 0.14), {at: 16.4, s: 'tampon', v: 0.6}, ...rep(17.5, 10, 0.05, 'sfx/swish', 0.12), {at: 19.9, s: 'sfx/pop', v: 0.22}, {at: 21.3, s: 'sfx/pop', v: 0.22},
  {at: 24.2, s: 'stylo', v: 0.3}, {at: 35.9, s: 'page', v: 0.35}, shine(36.2), {at: 39.2, s: 'tampon', v: 0.55}, {at: 39.22, s: 'deep-hit', v: 0.3}, {at: 43.1, s: 'sfx/whoosh', v: 0.25}, ...[46.9, 47.15, 47.4].map((a) => ({at: a, s: 'notification', v: 0.15})),
  {at: 50.1, s: 'tension', v: 0.15, dur: 1.2}, {at: 51.3, s: 'soft-whoosh', v: 0.4, dur: 1.3}, {at: 52.7, s: 'validation', v: 0.25}, {at: 55.8, s: 'cadenas', v: 0.4}, {at: 60.9, s: 'sfx/pop', v: 0.22}, ...[62.9, 65.5, 69.9, 73.5].map((a) => ({at: a, s: 'sfx/thud', v: 0.26})),
  ...LV.map((v) => ({at: v.a, s: 'sfx/thud', v: 0.3})), {at: 112.3, s: 'sfx/rise', v: 0.25, dur: 1}, {at: 113.4, s: 'sfx/ding', v: 0.35}, {at: 113.45, s: 'bass-hit', v: 0.3}, {at: 117.2, s: 'sfx/pop', v: 0.2},
  {at: 121.6, s: 'sfx/whoosh', v: 0.25}, shine(121.9), {at: 131.8, s: 'stylo', v: 0.3}, ...[132.6, 134.6, 135.6].map((a) => ({at: a, s: 'sfx/pop', v: 0.18})), {at: 139.9, s: 'sfx/pop', v: 0.22}, {at: 141.1, s: 'sfx/pop', v: 0.22}, {at: 149.9, s: 'sfx/thud', v: 0.3}, {at: 156.4, s: 'stylo', v: 0.3},
  {at: 168.7, s: 'sfx/thud', v: 0.3}, ...[172.4, 184.6, 196.3].flatMap((a) => [{at: a, s: 'sfx/rise', v: 0.25, dur: 0.9}, {at: a + 0.9, s: 'sfx/thud', v: 0.4}, shine(a + 1.0)]), ...[178.8, 180.0, 191.3, 192.2, 200.9, 204.6].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})),
  {at: 221.3, s: 'sfx/whoosh', v: 0.25}, shine(221.6), {at: 225.0, s: 'sfx/pop', v: 0.2}, {at: 227.6, s: 'sfx/whoosh', v: 0.25}, {at: 233.5, s: 'validation', v: 0.25},
  ...searchCues(235.7, 19, 237.8, 238.3), {at: 239.4, s: 'sfx/rise', v: 0.3, dur: 0.8}, {at: 240.2, s: 'alarme', v: 0.08, dur: 1}, ...[249.1, 251.3, 252.5].map((a) => ({at: a + 0.25, s: 'sfx/ding', v: 0.22})),
  {at: 259.1, s: 'page', v: 0.4}, {at: 264.7, s: 'sfx/pop', v: 0.2}, {at: 268.0, s: 'sfx/whoosh', v: 0.25}, ...[278.9, 280.0, 282.7].map((a) => ({at: a + 0.25, s: 'sfx/ding', v: 0.22})), {at: 279.8, s: 'notification', v: 0.2},
  {at: 287.4, s: 'page', v: 0.4}, {at: 296.6, s: 'sfx/click', v: 0.6}, {at: 296.9, s: 'deep-hit', v: 0.45}, ...[300.7, 302.9, 305.5].map((a) => ({at: a + 0.25, s: 'sfx/ding', v: 0.22})), {at: 307.0, s: 'sfx/pop', v: 0.2},
  {at: 314.9, s: 'sfx/whoosh', v: 0.25}, ...MX.flatMap((m) => [{at: m.a, s: 'sfx/swish', v: 0.3}, {at: m.a + 1.0, s: 'sfx/pop', v: 0.18}, {at: m.a + 2.4, s: 'sfx/ding', v: 0.2}]),
  {at: 345.6, s: 'soft-whoosh', v: 0.4, dur: 1}, {at: 358.2, s: 'cadenas', v: 0.4}, {at: 359.0, s: 'cadenas', v: 0.4}, {at: 360.6, s: 'cadenas', v: 0.4}, {at: 361.6, s: 'cadenas', v: 0.4}, ...[364.6, 364.9, 365.2, 365.5].map((a) => ({at: a, s: 'sfx/click', v: 0.3})), {at: 366.5, s: 'sfx/pop', v: 0.22}, {at: 369.9, s: 'alarme', v: 0.08, dur: 0.8},
  {at: 388.6, s: 'sfx/pop', v: 0.22}, shine(388.9), ...rep(391.2, 30, 0.2, 'sfx/click', 0.08), {at: 398.0, s: 'tampon', v: 0.6}, {at: 398.02, s: 'bass-hit', v: 0.35},
  {at: 407.5, s: 'sfx/whoosh', v: 0.35, dur: 2}, {at: 410.3, s: 'sfx/thud', v: 0.4}, {at: 411.0, s: 'soft-whoosh', v: 0.35, dur: 1.6}, {at: 415.2, s: 'sfx/pop', v: 0.22}, {at: 420.0, s: 'sfx/pop', v: 0.22}, {at: 422.4, s: 'validation', v: 0.25},
  {at: 425.5, s: 'sfx/pop', v: 0.22}, shine(425.8), ...rep(433.2, 18, 0.2, 'tick', 0.12), {at: 441.1, s: 'sfx/pop', v: 0.25}, ...rep(446.5, 8, 0.08, 'sfx/pop', 0.12), {at: 452.0, s: 'stylo', v: 0.3},
  ...flaps(454.0, 12), {at: 455.0, s: 'sfx/pop', v: 0.22}, {at: 458.5, s: 'sfx/pop', v: 0.22}, ...rep(458.6, 6, 0.52, 'sfx/thud', 0.12),
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const PermisTravail: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={75.0}><Intro /></Gate>
    <Gate from={78.2} to={158.7}><Pyramide /></Gate>
    <Gate from={161.9} to={207.2}><Piliers /></Gate>
    <Gate from={210.4} to={255.4}><Thermique /></Gate>
    <Gate from={258.6} to={310.3}><Espace /></Gate>
    <Gate from={313.5} to={374.4}><Energies /></Gate>
    <Gate from={377.6} to={OUTRO_AT}><Limites /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}><Gyro i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={467.1}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-permis-travail-origine.m4a')} trimAfter={s(467.2)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Kin, Brut, T, TitleBlock, Deep, Card, IcoLab, Win, Count, GLASS];
