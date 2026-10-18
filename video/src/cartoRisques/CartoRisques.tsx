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
 * « La cartographie des risques » (6 min 11) — capsule « condensé + effet wahou + ultra premium » : voix d'origine
 * (sans musique de fond), sous-titres calés mot à mot, photos réelles, thème « papier quadrillé ».
 * Fil rouge : LE TUBE PNEUMATIQUE À SIX GUICHETS (outil → anatomie → valeur → construire → évaluer → suivi), adaptés aux
 * parties réellement présentes ; la capsule du dossier file d'un guichet à l'autre, chaque guichet passé se coche.
 * Transition : LE GYROPHARE à chaque partie ; dans les scènes : capsule pneumatique, loupe, store vénitien.
 * Ultra premium : boussole qui se cale, nuage d'incertitude qui s'ordonne en grille, axes qui se tracent, radar à
 * balayage, matrice qui se transforme de 3×3 en 4×4 puis 5×5, feux tricolores, machine à sous du score 4 × 5 = 20,
 * loupe sur la case critique, rapport de 100 pages qui s'envole, ondes sonores du rouge qui crie, iceberg de la
 * conformité, chaos → tableau de bord, dominos du fournisseur, barre de recherche qui trouve puis OUVRE la grille de
 * gravité, curseur de seuils, calculatrice, 4 stratégies, tampon d'approbation, fichier Excel sans fin, quatre règles
 * d'or, document vivant qui respire, analyse figée dans la glace, flèches de révision continue.
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
const OUTRO_AT = 371.6;
export const CARTO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 24.6, n: '1', title: 'L’outil du décideur', s: 'un besoin de maîtrise', c: NAVY, g: 'outil', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 78.8, n: '2', title: 'L’anatomie de la matrice', s: 'probabilité × impact', c: BLUE, g: 'anatomie', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 149.6, n: '3', title: 'Pourquoi cartographier ?', s: 'la proposition de valeur', c: VIO, g: 'valeur', k: 'gyro', lab: 'PARTIE 3 / 6'},
  {at: 180.6, n: '4', title: 'Identifier et définir', s: 'étapes 1 et 2 sur 4', c: ORANGE, g: 'construire', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 275.0, n: '5', title: 'Évaluer et valider', s: 'étapes 3 et 4 sur 4', c: RED, g: 'évaluer', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 318.6, n: '6', title: 'Bonnes pratiques et suivi', s: 'un document vivant', c: GREEN, g: 'suivi', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 370.0;

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


/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('iso26/tablette-matrice.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 900, objectFit: 'cover', objectPosition: '50% 50%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 32%, ${PAPER}DD 42%, ${PAPER} 47%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={700} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>L’OUTIL DU DÉCIDEUR</div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 88, color: INK, marginTop: 10}}>la</div>
        <div style={{marginTop: 4}}><Board text="CARTOGRAPHIE" at={-1} h={104} gap={3} c={NAVY} stag={0.02} /></div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 88, color: RED, marginTop: 14}}>des risques</div>
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

/* ═════════════ Briques communes ═════════════ */
const cellC = (v: number, max: number) => (v / max < 0.25 ? GREEN : v / max < 0.5 ? ORANGE : RED);
const cellK = (v: number, max: number) => (v / max < 0.25 ? 0 : v / max < 0.5 ? 1 : 2);
/** Matrice probabilité (lignes, du bas vers le haut) × impact (colonnes). */
const Matrix: React.FC<{n: number; size: number; at: number; colorAt?: number[]; hi?: [number, number]; hiAt?: number; vals?: boolean; wave?: boolean; shuffle?: number}> = ({n, size, at, colorAt = [at, at, at], hi, hiAt = 0, vals, wave, shuffle = 0}) => {
  const t = useT();
  const cs = size / n;
  return (
    <div style={{position: 'relative', width: size, height: size}}>
      {Array.from({length: n * n}, (_, k) => {
        const r = Math.floor(k / n);
        const c = k % n;
        const v = (r + 1) * (c + 1);
        const kk = cellK(v, n * n);
        const ca = colorAt[kk] + (wave ? (r + c) * 0.06 : 0);
        const on = pop(t, at + (r + c) * 0.03);
        const col = shuffle > 0 ? [GREEN, ORANGE, RED][Math.floor(random(`sh${k}${Math.floor(t * shuffle)}`) * 3)] : cellC(v, n * n);
        const lit = t >= ca;
        const isHi = hi && hi[0] === r + 1 && hi[1] === c + 1 && t >= hiAt;
        return (
          <div key={k} style={{position: 'absolute', left: c * cs + 3, top: (n - 1 - r) * cs + 3, width: cs - 6, height: cs - 6, borderRadius: cs * 0.12, background: lit ? col : '#fff', border: `4px solid ${INK}`, boxSizing: 'border-box', opacity: on, transform: `scale(${(0.6 + 0.4 * on) * (isHi ? 1.08 + 0.04 * Math.sin(t * 8) : 1)})`, boxShadow: isHi ? `0 0 30px ${col}, 0 0 0 6px ${INK}` : lit ? `inset 0 -8px 0 #0002` : 'none', zIndex: isHi ? 2 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: cs * 0.32}}>{vals && lit ? v : ''}</div>
        );
      })}
    </div>
  );
};
const Photo: React.FC<{src: string; x: number; y: number; w: number; h: number; at: number; label: string; c: string; rot?: number; ic?: string}> = ({src, x, y, w, h, at, label, c, rot = 0, ic}) => {
  const t = useT();
  const p = Math.max(0, Math.min(1, spring(t, at, 8, 12)));
  return (
    <Abs x={x} y={y} w={w} h={h} style={{opacity: t >= at ? 1 : 0, transform: `rotate(${rot}deg) scale(${0.6 + 0.4 * p})`, background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${c}`, overflow: 'hidden'}}>
      {ic ? <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: h - 60}}><F n={ic} size={Math.min(w, h) * 0.5} /></div> : <Img src={PH(src)} style={{width: '100%', height: h - 60, objectFit: 'cover'}} />}
      <div style={{height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK}}>{label}</div>
    </Abs>
  );
};
/** Capsule pneumatique qui file dans un tube et livre son contenu. */
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

/* ═════════════ INTRO : LA BOUSSOLE + PROGRAMME ═════════════ */
const PROG = [{n: '01', l: 'L’outil essentiel du décideur', a: 10.5, c: NAVY}, {n: '02', l: 'L’anatomie de la matrice', a: 12.9, c: BLUE}, {n: '03', l: 'Pourquoi cartographier ?', a: 15.7, c: VIO}, {n: '04', l: 'Les 4 grandes étapes', a: 18.98, c: ORANGE}, {n: '05', l: 'Bonnes pratiques et suivi', a: 21.58, c: GREEN}];
const Intro: React.FC = () => {
  const t = useT();
  const ph2 = t >= 7.4;
  const needle = 220 * Math.exp(-(t - 3.0) * 1.4) * Math.cos((t - 3.0) * 7) + 45;
  const order = prog(t, 6.02, 7.0, easeInOut);
  return (
    <Out end={24.6}>
      {!ph2 && (
        <>
          <HiLine words={['La', 'boussole', 'du', 'risque']} mark={[1]} at={2.9} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={960}>
            {Array.from({length: 25}, (_, k) => {
              const r = Math.floor(k / 5);
              const c = k % 5;
              const cx = random(`ix${k}`) * 900 + Math.sin(t * 2 + k) * 40;
              const cy = random(`iy${k}`) * 900 + Math.cos(t * 1.7 + k) * 40;
              const gx = 230 + c * 100;
              const gy = 430 + (4 - r) * 100;
              return <div key={k} style={{position: 'absolute', left: lerp(cx, gx, order), top: lerp(cy, gy, order), width: lerp(30, 92, order), height: lerp(30, 92, order), borderRadius: lerp(15, 12, order), background: order > 0 ? cellC((r + 1) * (c + 1), 25) : '#9AA7BC', border: `3px solid ${INK}`, opacity: pop(t, 3.78 + k * 0.03) * (0.6 + 0.4 * order), transform: `rotate(${(1 - order) * (t * 90 + k * 20)}deg)`}} />;
            })}
            <div style={{position: 'absolute', left: 330, top: 40, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #fff, #E8EEF6)', border: `8px solid ${INK}`, boxShadow: `0 0 0 10px ${GOLD}, 0 20px 40px rgba(0,0,0,0.25)`, opacity: pop(t, 3.0), transform: `scale(${pop(t, 3.0)})`}}>
              {['N', 'E', 'S', 'O'].map((d, k) => <div key={d} style={{position: 'absolute', left: 150 - 16 + Math.sin((k * Math.PI) / 2) * 110, top: 150 - 22 - Math.cos((k * Math.PI) / 2) * 110, width: 32, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: d === 'N' ? RED : INK}}>{d}</div>)}
              <div style={{position: 'absolute', left: 140, top: 40, width: 20, height: 220, transform: `rotate(${needle}deg)`}}>
                <div style={{width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: `110px solid ${RED}`}} />
                <div style={{width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: `110px solid ${NAVY}`}} />
              </div>
              <div style={{position: 'absolute', left: 135, top: 135, width: 30, height: 30, borderRadius: 15, background: INK}} />
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center', opacity: pop(t, 4.82) * (1 - order)}}><Pill at={4.82} c={DIM} size={30}>flot d’incertitude</Pill></div>
            {order >= 1 && <div style={{position: 'absolute', left: 0, right: 0, top: 940, textAlign: 'center'}}><Pill at={7.0} c={NAVY} size={30}>vision claire et structurée</Pill></div>}
          </Abs>
        </>
      )}
      {ph2 && (
        <>
          <HiLine words={['Au', 'programme']} mark={[1]} at={7.54} y={330} size={66} />
          {PROG.map((x, k) => (
            <GlassCard key={x.n} x={60} y={440 + k * 188} w={960} h={165} at={x.a} c={x.c} tilt={0}>
              <div style={{display: 'flex', alignItems: 'center', gap: 30, height: '100%', padding: '0 30px'}}>
                <Num n={x.n} c={x.c} size={110} />
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: INK}}>{x.l}</div>
              </div>
            </GlassCard>
          ))}
          {t > 23.9 && <Abs x={0} y={1385} w={1080} style={{textAlign: 'center'}}><Pill at={23.94} c={RED} size={30}>c’est parti !</Pill></Abs>}
        </>
      )}
    </Out>
  );
};

/* ═════════════ 1 · L'OUTIL DU DÉCIDEUR ═════════════ */
const Outil: React.FC = () => {
  const t = useT();
  const ph = t < 37.9 ? 0 : t < 49.6 ? 1 : t < 56.1 ? 2 : t < 72.8 ? 3 : 4;
  const ax1 = prog(t, 38.06, 38.9, easeOut);
  const ax2 = prog(t, 41.38, 42.2, easeOut);
  const sweep = (t - 49.7) * 160;
  return (
    <Out end={78.8}>
      {ph === 0 && (
        <>
          <HiLine words={['Un', 'besoin', 'de', 'maîtrise']} mark={[1, 2, 3]} at={28.0} y={330} size={64} />
          <Deep src="iso26/direction-equipe.jpg" x={60} y={440} w={960} h={420} at={28.0} pos="50% 40%">
            <div style={{position: 'absolute', left: 24, bottom: 24}}><Pill at={28.6} c={NAVY} size={28}>le décideur</Pill></div>
          </Deep>
          <GlassCard x={60} y={900} w={960} h={480} at={33.7} c={BLUE}>
            <div style={{padding: '24px 34px'}}>
              <Mono at={33.9} c={DIM} size={24}>c’est quoi ?</Mono>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: INK, marginTop: 6}}>un tableau à <span style={{color: BLUE}}>double entrée</span></div>
            </div>
            <svg width={960} height={300} style={{position: 'absolute', left: 0, top: 170}}>
              {[0, 1, 2, 3].map((k) => <line key={`h${k}`} x1={200} y1={20 + k * 80} x2={200 + 560 * prog(t, 36.7 + k * 0.1, 37.3 + k * 0.1)} y2={20 + k * 80} stroke={INK} strokeWidth={6} strokeLinecap="round" />)}
              {[0, 1, 2, 3].map((k) => <line key={`v${k}`} x1={200 + k * 186} y1={20} x2={200 + k * 186} y2={20 + 240 * prog(t, 36.9 + k * 0.1, 37.5 + k * 0.1)} stroke={INK} strokeWidth={6} strokeLinecap="round" />)}
            </svg>
          </GlassCard>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Probabilité', '×', 'impact']} mark={[0, 2]} at={38.1} y={330} size={64} />
          <Abs x={60} y={440} w={960} h={640}>
            <svg width={960} height={640} style={{position: 'absolute', left: 0, top: 0}}>
              <line x1={150} y1={590} x2={150} y2={590 - 560 * ax1} stroke={INK} strokeWidth={10} strokeLinecap="round" />
              {ax1 >= 1 && <polygon points="130,40 150,6 170,40" fill={INK} />}
              <line x1={150} y1={590} x2={150 + 780 * ax2} y2={590} stroke={INK} strokeWidth={10} strokeLinecap="round" />
              {ax2 >= 1 && <polygon points="920,570 954,590 920,610" fill={INK} />}
            </svg>
            <div style={{position: 'absolute', left: -150, top: 270, width: 300, textAlign: 'center', transform: 'rotate(-90deg)', opacity: pop(t, 38.62)}}><Pill at={38.62} c={BLUE} size={28}>probabilité</Pill></div>
            <div style={{position: 'absolute', left: 420, top: 600, opacity: pop(t, 41.38)}}><Pill at={41.38} c={RED} size={28}>impact</Pill></div>
            <div style={{position: 'absolute', left: 230, top: 60}}><Matrix n={4} size={520} at={43.66} colorAt={[44.3, 44.3, 44.3]} wave /></div>
          </Abs>
          <Abs x={150} y={1130} w={780} h={250} style={{background: '#F1F1EC', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${DIM}`, opacity: pop(t, 44.74), transform: `rotate(-2deg) translateY(${(1 - pop(t, 44.74)) * 60}px)`}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 20, padding: 24}}>
              <F n="classeur" size={110} />
              <div>
                <div style={{position: 'relative', display: 'inline-block', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: DIM}}>document administratif ennuyeux<Strike p={prog(t, 48.42, 48.9)} c={RED} /></div>
                <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM, marginTop: 8}}>pour faire plaisir aux auditeurs ISO · zzz</div>
              </div>
            </div>
          </Abs>
          <Stamp at={48.6} c={RED} text="pas du tout" x={560} y={1290} rot={-7} size={50} />
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Un', 'véritable', 'radar']} mark={[2]} at={49.74} y={330} size={66} />
          <Abs x={190} y={450} w={700} h={700} style={{opacity: pop(t, 49.74), transform: `scale(${0.8 + 0.2 * pop(t, 49.74)})`}}>
            <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: NIGHT, border: `8px solid ${INK}`, boxShadow: `0 0 50px ${GREEN}55`, overflow: 'hidden'}}>
              {[0.25, 0.5, 0.75].map((r) => <div key={r} style={{position: 'absolute', left: `${50 - r * 50}%`, top: `${50 - r * 50}%`, width: `${r * 100}%`, height: `${r * 100}%`, borderRadius: '50%', border: '3px solid #2E7D4F'}} />)}
              <div style={{position: 'absolute', left: '50%', top: 0, bottom: 0, width: 3, background: '#2E7D4F'}} />
              <div style={{position: 'absolute', top: '50%', left: 0, right: 0, height: 3, background: '#2E7D4F'}} />
              <div style={{position: 'absolute', inset: 0, background: `conic-gradient(from ${sweep}deg, #3BE38B88 0deg, transparent 60deg)`}} />
              {[{x: 470, y: 170, c: RED, a: 50.2}, {x: 200, y: 260, c: ORANGE, a: 50.7}, {x: 420, y: 480, c: GREEN, a: 51.2}, {x: 240, y: 470, c: GREEN, a: 51.6}, {x: 520, y: 330, c: ORANGE, a: 52.0}].map((b, k) => <div key={k} style={{position: 'absolute', left: b.x - 22, top: b.y - 22, width: 44, height: 44, borderRadius: 22, background: b.c, opacity: pop(t, b.a), boxShadow: `0 0 ${20 + 12 * Math.sin(t * 6 + k)}px ${b.c}`}} />)}
              {t > 53.6 && <div style={{position: 'absolute', left: 470 - 70, top: 170 - 70, width: 140, height: 140, borderRadius: 70, border: `6px solid #fff`, transform: `scale(${lerp(3, 1, prog(t, 53.6, 54.2, easeOut))})`, opacity: prog(t, 53.6, 54.0)}} />}
            </div>
          </Abs>
          <Abs x={0} y={1200} w={1080} style={{textAlign: 'center'}}><Pill at={51.18} c={NAVY} size={32}>moteur de priorisation stratégique</Pill></Abs>
          <Abs x={0} y={1300} w={1080} style={{textAlign: 'center'}}><Pill at={53.62} c={RED} size={28}>où concentrer notre attention</Pill></Abs>
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={['Deux', 'extrêmes']} mark={[1]} at={56.2} y={330} size={66} />
          {[{y: 440, c: RED, ic: 'sirene', a: 60.22, l1: 'très probable', a1: 60.22, l2: 'conséquences désastreuses', a2: 61.38, v: 'INACCEPTABLE', av: 63.46, s: 'mobilisation immédiate', as: 64.5}, {y: 920, c: GREEN, ic: 'yeux', a: 67.3, l1: 'peu probable', a1: 67.3, l2: 'impact minimum', a2: 68.5, v: 'À SURVEILLER', av: 70.82, s: 'un œil dessus, sans paniquer', as: 71.2}].map((x) => (
            <GlassCard key={x.v} x={60} y={x.y} w={960} h={440} at={x.a - 0.3} c={x.c}>
              <div style={{position: 'absolute', inset: 0, background: `${x.c}${x.c === RED && t > 63.46 ? Math.round(16 + 20 * Math.abs(Math.sin(t * 6))).toString(16).padStart(2, '0') : '14'}`}} />
              <div style={{position: 'absolute', left: 40, top: 60, filter: `drop-shadow(0 0 ${x.c === RED ? 20 + 18 * Math.abs(Math.sin(t * 8)) : 10}px ${x.c})`}}><F n={x.ic} size={170} /></div>
              <div style={{position: 'absolute', left: 260, top: 50, display: 'flex', flexDirection: 'column', gap: 14}}>
                <Pill at={x.a1} c={INK} size={30}>{x.l1}</Pill>
                <Pill at={x.a2} c={INK} size={30}>+ {x.l2}</Pill>
              </div>
              <div style={{position: 'absolute', left: 260, top: 230, fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: x.c, opacity: pop(t, x.av), transform: `scale(${pop(t, x.av)})`, transformOrigin: '0 50%'}}>{x.v}</div>
              <div style={{position: 'absolute', left: 262, top: 330, fontFamily: MONO, fontWeight: 700, fontSize: 28, color: INK, opacity: pop(t, x.as)}}>→ {x.s}</div>
            </GlassCard>
          ))}
        </>
      )}
      {ph === 4 && (
        <>
          <HiLine words={['Le', 'tri', 'instantané']} mark={[1]} at={73.0} y={330} size={66} />
          {[{ic: 'feu', r: 1}, {ic: 'punaise', r: 0}, {ic: 'eclair', r: 1}, {ic: 'feuille', r: 0}, {ic: 'bombe', r: 1}, {ic: 'goutte', r: 0}].map((x, k) => {
            const a = 73.7 + k * 0.6;
            const p = prog(t, a, a + 0.85);
            const sx = 480;
            const ex = x.r ? 230 : 730;
            return t > a && <div key={k} style={{position: 'absolute', left: lerp(sx, ex, prog(t, a + 0.3, a + 0.8, easeInOut)), top: lerp(590, 1090, p), transform: `rotate(${p * 200}deg)`, opacity: 1 - prog(t, a + 0.8, a + 0.95)}}><F n={x.ic} size={110} /></div>;
          })}
          <Abs x={420} y={460} w={240} h={150} style={{background: INK, borderRadius: '20px 20px 120px 120px', opacity: pop(t, 73.1)}}><div style={{color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 24, textAlign: 'center', paddingTop: 40}}>TRI</div></Abs>
          {[{x: 60, c: RED, l: 'urgence absolue', s: 'menace la boîte', a: 75.78}, {x: 560, c: GREEN, l: 'détail mineur', s: 'à garder à l’œil', a: 77.34}].map((b) => (
            <Abs key={b.l} x={b.x} y={1130} w={460} h={250} style={{background: '#fff', border: `6px solid ${INK}`, borderTop: `16px solid ${b.c}`, borderRadius: '10px 10px 30px 30px', boxShadow: `8px 8px 0 ${b.c}`, opacity: pop(t, 73.4)}}>
              <div style={{textAlign: 'center', marginTop: 50, fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: b.c, transform: `scale(${0.8 + 0.2 * pop(t, b.a)})`}}>{b.l}</div>
              <div style={{textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM, opacity: pop(t, b.a)}}>{b.s}</div>
            </Abs>
          ))}
        </>
      )}
    </Out>
  );
};

/* ═════════════ 2 · L'ANATOMIE DE LA MATRICE ═════════════ */
const Reel: React.FC<{v: number; stop: number; c: string; at: number}> = ({v, stop, c, at}) => {
  const t = useT();
  const spinning = t >= at && t < stop;
  const shown = t >= stop ? v : Math.floor((t * 23) % 9) + 1;
  return (
    <div style={{width: 170, height: 200, borderRadius: 22, background: '#fff', border: `6px solid ${INK}`, boxShadow: `inset 0 18px 20px #0002, inset 0 -18px 20px #0002, 6px 6px 0 ${c}`, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 130, color: t >= stop ? c : DIM, filter: spinning ? 'blur(3px)' : undefined, transform: spinning ? `translateY(${((t * 900) % 120) - 60}px)` : `scale(${1 + 0.15 * Math.max(0, 1 - (t - stop) * 4)})`}}>{t >= at ? shown : ''}</div>
    </div>
  );
};
const Anatomie: React.FC = () => {
  const t = useT();
  const ph = t < 98.9 ? 0 : t < 110.2 ? 1 : t < 126.2 ? 2 : t < 138.9 ? 3 : 4;
  const n = t < 93.74 ? 3 : 4;
  const morph = t >= 93.74 ? Math.max(0, Math.min(1, spring(t, 93.74, 8, 12))) : Math.max(0, Math.min(1, spring(t, 87.0, 8, 12)));
  const lamp = (a: number) => (t >= a ? 1 : 0.15);
  const alarm = t > 104.42 && t < 106.3 ? Math.abs(Math.sin(t * 10)) : 0;
  const lens = prog(t, 124.4, 125.3, easeInOut);
  const fly = prog(t, 137.9, 138.8, easeIn);
  return (
    <Out end={149.6}>
      {ph === 0 && (
        <>
          <HiLine words={['Comment', 'elle', 'prend', 'forme']} mark={[3]} at={83.3} y={330} size={62} />
          <Abs x={170} y={480} w={760} h={760}>
            <div style={{position: 'absolute', left: 90, top: 0, transform: `scale(${0.85 + 0.15 * morph}) rotate(${(1 - morph) * -6}deg)`, opacity: morph}}><Matrix key={n} n={n} size={640} at={t >= 93.74 ? 93.74 : 87.0} colorAt={[96.86, 96.86, 96.86]} wave /></div>
            <div style={{position: 'absolute', left: -150, top: 300, width: 300, textAlign: 'center', transform: 'rotate(-90deg)'}}><Pill at={86.98} c={BLUE} size={28}>axe de probabilité</Pill></div>
            <div style={{position: 'absolute', left: 230, top: 660}}><Pill at={89.7} c={RED} size={28}>axe d’impact</Pill></div>
          </Abs>
          <Abs x={0} y={1290} w={1080} style={{textAlign: 'center'}}>
            <span style={{display: 'inline-block', fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: n === 3 ? BLUE : DIM, opacity: pop(t, 91.9), marginRight: 30}}>3 × 3</span>
            <span style={{display: 'inline-block', fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: n === 4 ? BLUE : DIM, opacity: pop(t, 93.74)}}>4 × 4</span>
            {t > 96.86 && <div style={{marginTop: 10}}><Pill at={96.86} c={INK} size={28}>code couleur universel</Pill></div>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Le', 'code', 'couleur']} mark={[1, 2]} at={99.0} y={330} size={66} />
          <AbsoluteFill style={{background: `rgba(224,74,63,${alarm * 0.18})`}} />
          <Abs x={70} y={440} w={280} h={860} style={{background: NIGHT, border: `7px solid ${INK}`, borderRadius: 60, boxShadow: `10px 10px 0 ${INK}55`, opacity: pop(t, 98.9)}}>
            {[{c: RED, a: 103.5}, {c: ORANGE, a: 100.58}, {c: GREEN, a: 98.98}].map((l, k) => <div key={k} style={{position: 'absolute', left: 40, top: 40 + k * 270, width: 186, height: 186, borderRadius: '50%', background: l.c, opacity: lamp(l.a), boxShadow: t >= l.a ? `0 0 ${50 + (l.c === RED ? 40 * alarm : 0)}px ${l.c}` : 'none', border: `6px solid #000`}} />)}
          </Abs>
          {[{c: RED, l: 'critique', s: 'alarme générale', a: 103.5}, {c: ORANGE, l: 'modéré', s: 'on reste vigilant', a: 100.58}, {c: GREEN, l: 'acceptable', s: 'risque acceptable', a: 98.98}].map((x, k) => (
            <GlassCard key={x.l} x={400} y={460 + k * 280} w={620} h={230} at={x.a} c={x.c}>
              <div style={{padding: '40px 36px'}}>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 66, color: x.c}}>{x.l}</div>
                <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: INK}}>{x.s}</div>
              </div>
            </GlassCard>
          ))}
          <Stamp at={108.06} c={INK} text="aucune ambiguïté" x={210} y={1300} rot={-5} size={54} />
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 113.9 ? ['En', 'comité', 'de', 'direction'] : ['L’objectivité']} mark={t < 113.9 ? [1, 2, 3] : [0]} at={t < 113.9 ? 110.3 : 114.02} y={330} size={64} />
          {t > 110.3 && t < 119.8 && <Blinds src="promo/audit-reunion.jpg" x={60} y={440} w={960} h={340} at={110.3} pos="50% 40%" />}
          {t >= 119.8 && (
            <Abs x={60} y={440} w={960} h={340} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 26, boxShadow: `8px 8px 0 ${BLUE}`}}>
              <div style={{position: 'absolute', left: 30, top: 24}}><Mono at={119.8} c={DIM} size={24}>la formule toute bête</Mono></div>
              <div style={{position: 'absolute', left: 40, top: 80, fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: INK}}>score = <span style={{color: BLUE}}>probabilité</span> × <span style={{color: RED}}>impact</span></div>
              <div style={{position: 'absolute', left: 40, top: 200}}><Pill at={125.22} c={INK} size={30}>point final</Pill></div>
            </Abs>
          )}
          <Abs x={60} y={820} w={960} h={280} style={{opacity: pop(t, 115.5) * (1 - prog(t, 119.5, 119.8))}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 30, background: '#F1F1EC', border: `5px solid ${INK}`, borderRadius: 24, height: 240, padding: '0 30px'}}>
              <div style={{transform: `rotate(${Math.sin(t * 5) * 12}deg)`}}><F n="main-levee" size={150} /></div>
              <div>
                <div style={{position: 'relative', display: 'inline-block', fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: DIM}}>au doigt mouillé<Strike p={prog(t, 116.3, 116.7)} c={RED} /></div>
                <div style={{position: 'relative', display: 'inline-block', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: DIM, marginTop: 8}}>débattre pendant des heures<Strike p={prog(t, 117.4, 117.8)} c={RED} /></div>
              </div>
            </div>
          </Abs>
          {t >= 119.8 && (
            <Abs x={60} y={820} w={960} h={260} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24}}>
              <Reel v={4} at={119.9} stop={120.9} c={BLUE} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: INK}}>×</div>
              <Reel v={5} at={119.9} stop={122.86} c={RED} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: INK}}>=</div>
              <div style={{width: 230, height: 200, borderRadius: 22, background: t >= 123.98 ? RED : '#fff', border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 130, boxShadow: t >= 123.98 ? `0 0 50px ${RED}` : 'none', overflow: 'hidden', position: 'relative'}}>{t >= 123.98 ? <Count n={20} a={123.98} b={124.4} /> : ''}<Shine at={124.4} /></div>
            </Abs>
          )}
          {t >= 123.9 && (
            <Abs x={60} y={1110} w={960} h={290}>
              <div style={{position: 'absolute', left: 0, top: 0, opacity: pop(t, 123.9)}}><Matrix n={5} size={280} at={123.9} colorAt={[123.9, 123.9, 123.9]} hi={[4, 5]} hiAt={124.1} /></div>
              <div style={{position: 'absolute', left: 420, top: 40, fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK, opacity: pop(t, 125.3)}}>probabilité 4 · impact 5</div>
              <div style={{position: 'absolute', left: 420, top: 110, opacity: pop(t, 125.5)}}><Pill at={125.5} c={RED} size={34}>score 20</Pill></div>
              {lens > 0 && lens < 1 && <div style={{position: 'absolute', left: lerp(-60, 200, lens), top: lerp(180, 2, lens), width: 120, height: 120, borderRadius: '50%', border: `9px solid ${INK}`, background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.6), rgba(191,215,234,0.35) 60%)', zIndex: 5}}><div style={{position: 'absolute', right: -40, bottom: -26, width: 70, height: 20, background: INK, borderRadius: 10, transform: 'rotate(40deg)'}} /></div>}
              {lens >= 1 && <div style={{position: 'absolute', left: 170, top: -50, width: 220, height: 220, borderRadius: '50%', border: `10px solid ${INK}`, overflow: 'hidden', background: RED, boxShadow: `0 0 40px ${RED}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 100, transform: `scale(${Math.min(1, spring(t, 125.3, 8, 12))})`, opacity: 1 - prog(t, 125.9, 126.2)}}>20</div>}
            </Abs>
          )}
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={['Un', 'arbitre', 'neutre']} mark={[1, 2]} at={126.3} y={330} size={66} />
          <GlassCard x={60} y={440} w={960} h={300} at={126.3} c={NAVY}>
            <div style={{display: 'flex', alignItems: 'center', gap: 30, height: '100%', padding: '0 40px'}}>
              <div style={{transform: `rotate(${Math.sin(t * 3) * 6}deg)`}}><F n="arbitre" size={190} /></div>
              <div>
                <Kin text="arbitre totalement neutre" at={126.8} size={52} color={NAVY} stagger={0.02} />
                <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 14, opacity: pop(t, 132.78)}}><div style={{transform: `rotate(${(t - 132.78) * 720}deg)`}}><F n="chrono" size={60} /></div><span style={{fontFamily: MONO, fontWeight: 700, fontSize: 28, color: INK}}>décision hyper rapide</span></div>
              </div>
            </div>
          </GlassCard>
          <Abs x={60} y={790} w={460} h={590} style={{opacity: pop(t, 136.74)}}>
            {Array.from({length: 12}, (_, k) => {
              const d = random(`fl${k}`);
              return <div key={k} style={{position: 'absolute', left: 60 + k * 2 + fly * (d - 0.3) * 900, top: 140 - k * 8 - fly * (300 + d * 500), width: 320, height: 400, background: '#fff', border: `3px solid ${INK}`, borderRadius: 8, transform: `rotate(${(k - 6) * 1.5 + fly * (d - 0.5) * 300}deg)`, opacity: 1 - fly, boxShadow: '2px 2px 0 #0002'}}>
                {k === 11 && <div style={{padding: 20}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: INK}}>RAPPORT</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: DIM}}><Count n={100} a={137.3} b={137.9} /></div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: DIM}}>pages</div>{Array.from({length: 6}, (_, j) => <div key={j} style={{height: 10, background: '#E3E8EF', borderRadius: 5, marginTop: 12, width: `${90 - j * 8}%`}} />)}</div>}
              </div>;
            })}
          </Abs>
          <Card x={560} y={830} w={460} h={540} at={136.9} c={GREEN}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, paddingTop: 30}}>
              <Mono at={137.0} c={DIM} size={24}>une seule page</Mono>
              <Matrix n={4} size={300} at={137.0} colorAt={[137.2, 137.2, 137.2]} />
              <Pill at={138.4} c={GREEN} size={28}>lu en un clin d’œil</Pill>
            </div>
          </Card>
        </>
      )}
      {ph === 4 && (
        <>
          <HiLine words={['Les', 'couleurs', 'parlent']} mark={[1, 2]} at={139.0} y={330} size={66} />
          {[{c: RED, l: 'le rouge crie', s: '« il faut agir maintenant ! »', a: 139.3, amp: 1}, {c: ORANGE, l: 'l’orange murmure', s: '« fais attention… »', a: 142.18, amp: 0.45}, {c: GREEN, l: 'le vert rassure', s: 'tout le monde', a: 144.26, amp: 0.2}].map((x, k) => (
            <Abs key={x.l} x={60} y={440 + k * 250} w={960} h={220} style={{opacity: pop(t, x.a), transform: `translateX(${(1 - pop(t, x.a)) * -80}px)`}}>
              <div style={{position: 'absolute', left: 10, top: 20, width: 180, height: 180}}>
                {[0, 1, 2].map((j) => {
                  const ph2 = ((t - x.a) * (0.6 + x.amp) + j / 3) % 1;
                  return t > x.a && <div key={j} style={{position: 'absolute', left: 90 - ph2 * 90 * (1 + x.amp), top: 90 - ph2 * 90 * (1 + x.amp), width: ph2 * 180 * (1 + x.amp), height: ph2 * 180 * (1 + x.amp), borderRadius: '50%', border: `${4 + 6 * x.amp}px solid ${x.c}`, opacity: (1 - ph2) * 0.8}} />;
                })}
                <div style={{position: 'absolute', left: 40, top: 40, width: 100, height: 100, borderRadius: 50, background: x.c, border: `6px solid ${INK}`, boxShadow: `0 0 ${30 * x.amp + 10}px ${x.c}`, transform: `scale(${1 + 0.1 * x.amp * Math.abs(Math.sin(t * 10))})`}} />
              </div>
              <div style={{position: 'absolute', left: 260, top: 30, right: 0, height: 160, background: '#fff', border: `5px solid ${INK}`, borderRadius: 30, boxShadow: `7px 7px 0 ${x.c}`, padding: '20px 30px', boxSizing: 'border-box'}}>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30 + 26 * x.amp, color: x.c, lineHeight: 1}}>{x.l}</div>
                <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 36, color: INK, marginTop: 6}}>{x.s}</div>
              </div>
            </Abs>
          ))}
          <Abs x={0} y={1200} w={1080} style={{textAlign: 'center'}}><Pill at={145.78} c={NAVY} size={30}>toute la direction alignée d’un coup d’œil</Pill></Abs>
          <Abs x={0} y={1300} w={1080} style={{textAlign: 'center'}}><Pill at={148.26} c={GOLD} size={30}>gain de temps monstrueux</Pill></Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 3 · POURQUOI CARTOGRAPHIER ? ═════════════ */
const Valeur: React.FC = () => {
  const t = useT();
  const ph = t < 162.5 ? 0 : 1;
  const sink = prog(t, 159.26, 160.6, easeInOut);
  return (
    <Out end={180.6}>
      {ph === 0 && (
        <>
          <HiLine words={['La', 'vraie', 'valeur']} mark={[1, 2]} at={153.4} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={950} style={{borderRadius: 30, overflow: 'hidden', border: `5px solid ${INK}`, boxShadow: `8px 8px 0 ${VIO}`, opacity: pop(t, 153.0)}}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 330, background: 'linear-gradient(180deg, #DDEBFA, #F4F8FC)'}} />
            <div style={{position: 'absolute', left: 0, right: 0, top: 330, bottom: 0, background: 'linear-gradient(180deg, #2B6CB0, #0E2A5C)'}} />
            <svg width={960} height={950} style={{position: 'absolute', left: 0, top: 0}}>
              <path d={`M ${lerp(400, 360, sink)} 330 L 480 ${lerp(140, 170, sink)} L ${lerp(560, 600, sink)} 330 Z`} fill="#fff" stroke={INK} strokeWidth={6} />
              <path d={`M 360 330 L 120 ${lerp(500, 780, sink)} L 480 ${lerp(560, 900, sink)} L 840 ${lerp(500, 760, sink)} L 600 330 Z`} fill="#CFE3F7" stroke={INK} strokeWidth={6} opacity={0.9} />
              <path d={`M 0 330 ${Array.from({length: 13}, (_, k) => `Q ${k * 80 + 40} ${330 + Math.sin(t * 3 + k) * 10} ${k * 80 + 80} 330`).join(' ')}`} fill="none" stroke="#fff" strokeWidth={5} />
            </svg>
            <div style={{position: 'absolute', left: 0, right: 0, top: 60, textAlign: 'center'}}><Pill at={160.66} c={DIM} size={26}>conformité réglementaire</Pill></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 420, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: NAVY, opacity: pop(t, 159.4)}}>l’enjeu va bien au-delà</div>
            {['priorités', 'budget', 'communication', 'objectivité'].map((w, k) => <div key={w} style={{position: 'absolute', left: [180, 520, 240, 520][k], top: [520, 520, 640, 640][k], opacity: pop(t, 160.2 + k * 0.3)}}><Pill at={160.2 + k * 0.3} c={VIO} size={28}>{w}</Pill></div>)}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Trois', 'bénéfices']} mark={[1]} at={162.6} y={330} size={66} />
          <GlassCard x={60} y={440} w={960} h={290} at={162.6} c={RED}>
            <div style={{position: 'absolute', left: 30, top: 30}}><Num n={1} c={RED} size={90} /></div>
            <div style={{position: 'absolute', left: 150, top: 30, fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK, lineHeight: 1.1, width: 520}}>allouer budget et équipes là où le danger est le plus fort</div>
            <div style={{position: 'absolute', right: 40, top: 40, width: 200, height: 200}}>
              <div style={{position: 'absolute', left: 50, top: 50, filter: `drop-shadow(0 0 16px ${RED})`}}><F n="cible" size={110} /></div>
              {t > 163.94 && [0, 1, 2, 3].map((k) => { const p = ((t - 163.94) * 0.9 + k / 4) % 1; return <div key={k} style={{position: 'absolute', left: lerp(-60, 90, p), top: lerp(220, 100, p) - Math.sin(p * Math.PI) * 80, opacity: 1 - p * 0.6}}><F n="argent" size={50} /></div>; })}
            </div>
          </GlassCard>
          <GlassCard x={60} y={760} w={960} h={290} at={168.42} c={GOLD}>
            <div style={{position: 'absolute', left: 30, top: 30}}><Num n={2} c={GOLD} size={90} /></div>
            <div style={{position: 'absolute', left: 150, top: 30, fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK, lineHeight: 1.1, width: 520}}>un outil de communication en or avec le top management</div>
            <div style={{position: 'absolute', right: 50, top: 50}}><F n="directeur" size={130} /></div>
            <div style={{position: 'absolute', left: 150, top: 190}}><Check at={172.54} label="les cases des régulateurs" c={GREEN} size={26} /></div>
          </GlassCard>
          <GlassCard x={60} y={1080} w={960} h={310} at={173.58} c={VIO}>
            <div style={{position: 'absolute', left: 30, top: 30}}><Num n={3} c={VIO} size={90} /></div>
            <div style={{position: 'absolute', left: 150, top: 34, fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK}}>objectiviser le débat</div>
            {[{l: 'peurs irrationnelles', a: 175.9, x: 150}, {l: 'biais de confirmation', a: 177.3, x: 520}].map((b) => {
              const burst = prog(t, 179.3, 179.6);
              return <div key={b.l} style={{position: 'absolute', left: b.x, top: 130, padding: '16px 24px', borderRadius: 40, background: '#EFE9FF', border: `4px dashed ${VIO}`, fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: VIO, opacity: pop(t, b.a) * (1 - burst), transform: `scale(${pop(t, b.a) * (1 + burst * 0.8)}) translateY(${Math.sin(t * 3 + b.x) * 6}px)`}}>{b.l}</div>;
            })}
          </GlassCard>
          <Stamp at={179.62} c={GREEN} text="factuel" x={420} y={1200} rot={-6} size={70} />
        </>
      )}
    </Out>
  );
};

/* ═════════════ 4 · IDENTIFIER ET DÉFINIR ═════════════ */
const STEPS = [{l: 'identifier', a: 199.9, c: ORANGE, ic: 'loupe'}, {l: 'définir', a: 200.86, c: BLUE, ic: 'equerre'}, {l: 'évaluer', a: 201.7, c: RED, ic: 'balance'}, {l: 'valider et suivre', a: 202.38, c: GREEN, ic: 'check'}];
const Construire: React.FC = () => {
  const t = useT();
  const ph = t < 204.3 ? 0 : t < 216.7 ? 1 : t < 228.4 ? 2 : t < 243.15 ? 3 : t < 253.3 ? 4 : 5;
  const conv = prog(t, 193.5, 194.8, easeInOut);
  const fall = prog(t, 214.7, 216.0, easeIn);
  const slide = prog(t, 246.0, 250.4, easeInOut);
  const coin = prog(t, 237.3, 238.3, easeIn);
  return (
    <Out end={275.0}>
      {ph === 0 && (
        <>
          <HiLine words={t < 189.4 ? ['Une', 'méthode', 'éprouvée'] : ['Du', 'chaos', 'au', 'tableau', 'de', 'bord']} mark={t < 189.4 ? [1, 2] : [1, 3, 4, 5]} at={t < 189.4 ? 184.0 : 189.5} y={330} size={58} />
          <Abs x={60} y={440} w={960} h={560}>
            {Array.from({length: 12}, (_, k) => {
              const gx = (k % 4) * 240 + 10;
              const gy = Math.floor(k / 4) * 186 + 10;
              const cx = random(`cx${k}`) * 760 + Math.sin(t * 2.2 + k) * 50;
              const cy = random(`cy${k}`) * 400 + Math.cos(t * 1.8 + k) * 40;
              const kind = k % 3;
              return (
                <div key={k} style={{position: 'absolute', left: lerp(cx, gx, conv), top: lerp(cy, gy, conv), width: lerp(140, 220, conv), height: lerp(110, 166, conv), borderRadius: 16, background: '#fff', border: `4px solid ${conv > 0.5 ? INK : RED}`, transform: `rotate(${(1 - conv) * (random(`cr${k}`) - 0.5) * 70}deg)`, opacity: pop(t, 184.2 + k * 0.08), boxShadow: conv > 0.9 ? `5px 5px 0 ${[BLUE, ORANGE, GREEN][kind]}` : '0 8px 20px #0003', overflow: 'hidden', padding: 12, boxSizing: 'border-box'}}>
                  {kind === 0 && <div style={{display: 'flex', alignItems: 'flex-end', gap: 6, height: '100%'}}>{[0.4, 0.8, 0.55, 0.9, 0.3].map((h, j) => <div key={j} style={{flex: 1, height: `${h * (0.5 + 0.5 * conv) * 100}%`, background: [GREEN, ORANGE, RED, ORANGE, GREEN][j], borderRadius: 4}} />)}</div>}
                  {kind === 1 && <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: conv > 0.5 ? ORANGE : DIM, textAlign: 'center', marginTop: 10}}>{conv > 0.5 ? '●' : '?!'}</div>}
                  {kind === 2 && Array.from({length: 4}, (_, j) => <div key={j} style={{height: 10, background: conv > 0.5 ? '#C9D2DF' : '#F2B8B5', borderRadius: 5, marginTop: 10, width: `${90 - j * 15}%`}} />)}
                </div>
              );
            })}
            {conv >= 1 && <div style={{position: 'absolute', left: 0, right: 0, top: 580, textAlign: 'center'}}><Pill at={194.8} c={NAVY} size={28}>tableau de bord ultra lisible</Pill></div>}
            {conv < 0.5 && t > 192.1 && <div style={{position: 'absolute', left: 0, right: 0, top: 580, textAlign: 'center', opacity: 1 - conv * 2}}><Pill at={192.1} c={RED} size={28}>chaotique · anxiogène</Pill></div>}
          </Abs>
          <Abs x={60} y={1090} w={960} h={290}>
            <div style={{position: 'absolute', left: 110, right: 110, top: 70, height: 10, background: '#E3E8EF', borderRadius: 5}} />
            <div style={{position: 'absolute', left: 110, top: 70, height: 10, width: 740 * prog(t, 199.9, 202.6), background: GREEN, borderRadius: 5}} />
            {STEPS.map((x, k) => (
              <div key={x.l} style={{position: 'absolute', left: 30 + k * 260, top: 0, width: 160, textAlign: 'center', opacity: pop(t, x.a), transform: `scale(${pop(t, x.a)})`}}>
                <div style={{margin: '0 auto', width: 150, height: 150, borderRadius: 75, background: '#fff', border: `6px solid ${x.c}`, boxShadow: `0 0 24px ${x.c}66`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={x.ic} size={80} /></div>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: x.c, marginTop: 10, lineHeight: 1.05}}>{k + 1}. {x.l}</div>
              </div>
            ))}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Étape', '1', ':', 'identifier']} mark={[3]} at={204.4} y={330} size={64} />
          <Win x={60} y={440} w={960} h={430} at={204.4} title="registre des risques · la fondation" c={ORANGE}>
            <div style={{padding: '26px 30px', display: 'flex', flexDirection: 'column', gap: 14}}>
              <Check at={206.6} label="on identifie les risques" c={ORANGE} size={28} />
              <Check at={208.5} label="on liste les événements indésirables" c={ORANGE} size={28} />
              <Check at={210.9} label="tout ce qui peut faire dérailler l’entreprise" c={ORANGE} size={28} />
            </div>
          </Win>
          <Abs x={60} y={910} w={960} h={470} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 26, boxShadow: `8px 8px 0 ${RED}`, opacity: pop(t, 212.66), overflow: 'hidden'}}>
            <div style={{position: 'absolute', left: 24, top: 18}}><Mono at={212.8} c={DIM} size={22}>et si… notre fournisseur principal faisait faillite ?</Mono></div>
            {['camion', 'usine', 'colis', 'argent', 'batiment'].map((ic, k) => {
              const a = 214.7 + k * 0.22;
              const r = prog(t, a, a + 0.3, easeIn) * 72;
              return (
                <div key={ic} style={{position: 'absolute', left: 80 + k * 170, top: 190, width: 70, height: 190, transformOrigin: '100% 100%', transform: `rotate(${r}deg)`}}>
                  <div style={{width: 70, height: 190, borderRadius: 12, background: k === 0 ? RED : NAVY, border: `5px solid ${INK}`, boxSizing: 'border-box'}} />
                  <div style={{position: 'absolute', left: -10, top: -95}}><F n={ic} size={90} /></div>
                </div>
              );
            })}
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center', opacity: fall}}><Pill at={216.0} c={RED} size={28}>effet domino</Pill></div>
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Aller', 'sur', 'le', 'terrain']} mark={[3]} at={216.8} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={240} style={{background: '#F1F1EC', border: `5px solid ${INK}`, borderRadius: 24, opacity: pop(t, 216.8)}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 30, height: '100%', padding: '0 30px'}}>
              <F n="porte" size={150} />
              <div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: DIM}}>enfermé tout seul dans son bureau<Strike p={prog(t, 219.6, 220.1)} c={RED} /></div>
            </div>
          </Abs>
          {t > 221.4 && <Blinds src="promo/terrain-controle.jpg" x={60} y={720} w={960} h={400} at={221.5} pos="50% 40%" />}
          {t > 221.6 && <div style={{position: 'absolute', left: 90, top: 750, zIndex: 3}}><Pill at={221.6} c={ORANGE} size={28}>sur le terrain</Pill></div>}
          {[{l: 'ateliers', ic: 'causerie', a: 222.5}, {l: 'interviews', ic: 'bulle', a: 223.82}, {l: 'réalité opérationnelle', ic: 'chantier', a: 226.66}].map((x, k) => (
            <Card key={x.l} x={60 + k * 330} y={1150} w={300} h={230} at={x.a} c={ORANGE}><IcoLab ic={x.ic} l={x.l} size={100} fs={26} /></Card>
          ))}
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={['Étape', '2', ':', 'définir']} mark={[3]} at={228.5} y={330} size={64} />
          <GlassCard x={60} y={440} w={960} h={250} at={228.5} c={BLUE}>
            <div style={{display: 'flex', alignItems: 'center', gap: 30, height: '100%', padding: '0 36px'}}>
              <div style={{transform: `rotate(${(t - 228.5) * 40}deg)`}}><F n="de" size={140} /></div>
              <div>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: INK}}>nos règles du jeu</div>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: BLUE, opacity: pop(t, 230.78)}}>nos critères de gravité</div>
                <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM, opacity: pop(t, 234.82)}}>adaptés à la taille de la structure</div>
              </div>
            </div>
          </GlassCard>
          <Abs x={330} y={720} w={420} h={130} style={{opacity: pop(t, 237.3) * (1 - prog(t, 238.3, 238.6)), transform: `translateY(${coin * 140}px)`}}>
            <div style={{margin: '0 auto', width: 400, height: 110, borderRadius: 55, background: `radial-gradient(circle at 35% 30%, #FFF4C8, ${GOLD})`, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK}}>20 000 francs suisses</div>
          </Abs>
          {[{l: 'petite start-up', ic: 'pousse', a: 240.54, g: 0.92, c: RED, v: 'coup dur'}, {l: 'multinationale', ic: 'batiment', a: 241.7, g: 0.08, c: GREEN, v: 'presque rien'}].map((x, k) => (
            <Card key={x.l} x={60 + k * 500} y={880} w={460} h={500} at={238.4} c={x.c}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20, gap: 10}}>
                <F n={x.ic} size={k ? 170 : 110} />
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK}}>{x.l}</div>
                <div style={{width: 340, height: 40, borderRadius: 20, background: '#E3E8EF', border: `4px solid ${INK}`, overflow: 'hidden'}}><div style={{height: '100%', width: `${x.g * 100 * prog(t, x.a, x.a + 0.8, easeOut)}%`, background: x.c}} /></div>
                <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: x.c, opacity: pop(t, x.a + 0.6)}}>impact : {x.v}</div>
              </div>
            </Card>
          ))}
        </>
      )}
      {ph === 4 && (
        <>
          <HiLine words={['Une', 'grille', 'précise']} mark={[1, 2]} at={243.2} y={330} size={66} />
          <SearchOpen x={60} y={440} w={960} h={940} at={243.3} query="grille de gravité" results={['Grille de probabilité', 'Grille de gravité', 'Plan de crise']} found={1} foundAt={244.6} clickAt={244.95} c={BLUE}>
            <div style={{position: 'absolute', left: 40, right: 40, top: 40}}>
              <Mono at={245.8} c={DIM} size={24}>impact financier (francs)</Mono>
              <div style={{position: 'relative', marginTop: 70, height: 90, borderRadius: 45, background: `linear-gradient(90deg, ${GREEN}, ${YEL} 45%, ${ORANGE} 65%, ${RED})`, border: `6px solid ${INK}`}}>
                <div style={{position: 'absolute', left: `${lerp(4, 90, slide)}%`, top: -50, transform: 'translateX(-50%)'}}>
                  <div style={{width: 0, height: 0, margin: '0 auto', borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderTop: `36px solid ${INK}`}} />
                </div>
                <div style={{position: 'absolute', left: '22%', top: -14, bottom: -14, width: 6, background: INK}} />
                <div style={{position: 'absolute', left: '78%', top: -14, bottom: -14, width: 6, background: INK}} />
              </div>
              <div style={{position: 'relative', height: 240, marginTop: 30}}>
                <div style={{position: 'absolute', left: 0, width: 400, opacity: pop(t, 245.9)}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: GREEN}}>&lt; 5 000</div><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: INK}}>insignifiant</div></div>
                <div style={{position: 'absolute', right: 0, width: 420, textAlign: 'right', opacity: pop(t, 248.74)}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: RED}}>&gt; 100 000</div><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: INK}}>zone critique</div></div>
              </div>
            </div>
            <div style={{position: 'absolute', left: 40, right: 40, top: 520, height: 300, borderRadius: 26, background: t > 251.5 ? `rgba(224,74,63,${0.12 + 0.12 * Math.abs(Math.sin(t * 8))})` : '#F4F6FA', border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', gap: 30, padding: '0 30px', opacity: pop(t, 250.38)}}>
              <div style={{filter: `drop-shadow(0 0 ${t > 251.5 ? 30 : 0}px ${RED})`}}><F n="sirene" size={150} /></div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: RED, lineHeight: 1.1, opacity: pop(t, 251.5)}}>on déclenche les protocoles de crise</div>
            </div>
          </SearchOpen>
        </>
      )}
      {ph === 5 && (
        <>
          <HiLine words={['Même', 'rigueur', ':', 'la', 'probabilité']} mark={[1, 4]} at={253.4} y={330} size={56} />
          <Abs x={60} y={440} w={960} h={300} style={{opacity: pop(t, 257.18) * (1 - prog(t, 261.4, 261.86))}}>
            <div style={{position: 'absolute', left: 40, top: 20, width: 880, height: 220, borderRadius: 110, background: '#EEF1F5', border: `5px dashed ${DIM}`, display: 'flex', alignItems: 'center', gap: 20, padding: '0 40px', boxSizing: 'border-box', filter: `blur(${1.5 + Math.sin(t * 3)}px)`}}>
              <F n="brouillard" size={120} />
              <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 44, color: DIM}}>« ouais, je crois que ça arrive assez souvent »</div>
            </div>
          </Abs>
          <Stamp at={261.76} c={RED} text="non" x={420} y={500} rot={-8} size={110} />
          <Abs x={60} y={780} w={960} h={420} style={{opacity: pop(t, 261.86)}}>
            <Mono at={262.0} c={DIM} size={24}>fréquences concrètes</Mono>
            {[{n: 1, l: '1 fois tous les 15 ans', a: 264.78, c: GREEN}, {n: 2, l: '', a: 265.6, c: YEL}, {n: 3, l: '', a: 266.2, c: ORANGE}, {n: 4, l: '1 fois par mois', a: 267.3, c: RED}].map((x, k) => (
              <div key={x.n} style={{position: 'absolute', left: k * 240, bottom: 0, width: 210, height: 360, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}}>
                {x.l && <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: x.c, textAlign: 'center', marginBottom: 10, opacity: pop(t, x.a + 0.3)}}>{x.l}</div>}
                <div style={{width: 170, height: (k + 1) * 60 * prog(t, x.a, x.a + 0.5, easeOut), background: x.c, border: `5px solid ${INK}`, borderRadius: '14px 14px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 44, overflow: 'hidden'}}>{x.n}</div>
              </div>
            ))}
          </Abs>
          <Abs x={0} y={1250} w={1080} style={{textAlign: 'center'}}><Pill at={273.78} c={NAVY} size={30}>tous les départements : le même langage</Pill></Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 5 · ÉVALUER ET VALIDER ═════════════ */
const STRAT = [{l: 'accepter', ic: 'pouce', a: 289.1, c: GREEN}, {l: 'réduire', ic: 'baisse', a: 290.38, c: ORANGE}, {l: 'transférer', ic: 'bouclier', a: 292.14, c: BLUE, s: 'assurance'}, {l: 'supprimer', ic: 'stop', a: 294.02, c: RED, s: 'arrêter l’activité'}];
const Evaluer: React.FC = () => {
  const t = useT();
  const ph = t < 288.3 ? 0 : t < 297.0 ? 1 : t < 310.4 ? 2 : 3;
  const scroll = Math.max(0, t - 313.6) * 900;
  return (
    <Out end={318.6}>
      {ph === 0 && (
        <>
          <HiLine words={['Probabilité', '×', 'gravité']} mark={[0, 2]} at={278.4} y={330} size={64} />
          <Abs x={160} y={440} w={760} h={380} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 34, boxShadow: `10px 10px 0 ${RED}`, opacity: pop(t, 278.4)}}>
            <div style={{position: 'absolute', left: 30, right: 30, top: 30, height: 170, borderRadius: 18, background: '#B9D9B0', border: `5px solid #000`, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 30px', fontFamily: MONO, fontWeight: 700, fontSize: 90, color: '#1D2A1A'}}>
              {t >= 282.98 ? '4' : ''}{t >= 283.6 ? ' × ' : ''}{t >= 284.0 ? '3' : ''}{t >= 284.9 ? ' = ' : ''}{t >= 285.42 ? <span style={{color: RED}}><Count n={12} a={285.42} b={285.9} /></span> : ''}
            </div>
            {['P', 'G', '×', '='].map((k, j) => <div key={k} style={{position: 'absolute', left: 40 + j * 175, top: 230, width: 150, height: 110, borderRadius: 20, background: j < 2 ? [BLUE, RED][j] : '#3A4356', border: `4px solid #000`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `translateY(${[282.98, 284.0, 283.6, 284.9].some((a, i) => i === j && t > a && t < a + 0.15) ? 6 : 0}px)`}}>{k}</div>)}
          </Abs>
          <PneuDeliver x={60} y={812} w={960} at={285.0} c={RED} />
          <Abs x={290} y={885} w={500} h={500} style={{opacity: pop(t, 280.6)}}><Matrix n={4} size={500} at={280.6} colorAt={[281.0, 281.0, 281.0]} hi={[4, 3]} hiAt={285.5} vals /></Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Quelle', 'stratégie', '?']} mark={[1]} at={288.4} y={330} size={66} />
          {STRAT.map((x, k) => (
            <GlassCard key={x.l} x={60 + (k % 2) * 500} y={440 + Math.floor(k / 2) * 480} w={460} h={440} at={x.a} c={x.c} tilt={(k % 2 ? 1 : -1) * 2}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12}}>
                <Num n={k + 1} c={x.c} size={80} />
                <F n={x.ic} size={130} />
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: x.c}}>{x.l}</div>
                {x.s && <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM}}>{x.s}</div>}
              </div>
            </GlassCard>
          ))}
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Valider', 'et', 'suivre']} mark={[0, 2]} at={297.1} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={430} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 26, boxShadow: `8px 8px 0 ${GREEN}`, opacity: pop(t, 297.1)}}>
            <div style={{position: 'absolute', left: 40, top: 40}}><Matrix n={4} size={340} at={297.2} colorAt={[297.4, 297.4, 297.4]} /></div>
            <div style={{position: 'absolute', left: 420, top: 60}}>
              <F n="directeur" size={150} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK, marginTop: 10}}>la direction</div>
              <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM}}>une même vision pour tous</div>
            </div>
            <Stamp at={301.66} c={GREEN} text="approuvé" x={440} y={335} rot={-8} size={56} />
          </Abs>
          <Win x={60} y={910} w={960} h={470} at={306.3} title="logiciel dédié · cartographie en ligne" c={BLUE} dark>
            <div style={{display: 'flex', gap: 24, padding: 26}}>
              <Matrix n={5} size={300} at={307.6} colorAt={[307.9, 307.9, 307.9]} />
              <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 16}}>
                {[0.8, 0.55, 0.35, 0.2].map((w, j) => <div key={j} style={{height: 46, borderRadius: 10, background: '#25304A', overflow: 'hidden'}}><div style={{height: '100%', width: `${w * 100 * prog(t, 308.2 + j * 0.2, 309.0 + j * 0.2, easeOut)}%`, background: [RED, ORANGE, ORANGE, GREEN][j]}} /></div>)}
                <div style={{display: 'flex', alignItems: 'center', gap: 10, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#9AA7BC'}}><span style={{width: 16, height: 16, borderRadius: 8, background: GREEN, opacity: 0.5 + 0.5 * Math.sin(t * 6)}} />à jour en temps réel</div>
              </div>
            </div>
          </Win>
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={['Le', 'piège', 'classique']} mark={[1, 2]} at={310.5} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={560} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 20, boxShadow: `8px 8px 0 ${RED}`, overflow: 'hidden', opacity: pop(t, 310.5)}}>
            <div style={{height: 54, background: '#1E7145', color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 24, display: 'flex', alignItems: 'center', paddingLeft: 20}}>cartographie_v12_FINAL_vraiment-final.xlsx</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 54, bottom: 0, overflow: 'hidden'}}>
              {Array.from({length: 14}, (_, j) => {
                const row = Math.floor(scroll / 40) + j + 1;
                return <div key={j} style={{position: 'absolute', left: 0, right: 0, top: j * 40 - (scroll % 40), height: 40, borderBottom: '2px solid #E3E8EF', display: 'flex', fontFamily: MONO, fontSize: 20, color: DIM}}><div style={{width: 90, background: '#F2F4F7', textAlign: 'center', lineHeight: '40px'}}>{row}</div>{[0, 1, 2, 3, 4].map((c) => <div key={c} style={{flex: 1, borderLeft: '2px solid #E3E8EF', padding: '8px 10px'}}><div style={{height: 12, background: '#E3E8EF', borderRadius: 6, width: `${30 + random(`x${row}${c}`) * 60}%`}} /></div>)}</div>;
              })}
            </div>
            {t > 313.6 && <div style={{position: 'absolute', right: 20, bottom: 20}}><Pill at={313.6} c={RED} size={28}>interminable…</Pill></div>}
          </Abs>
          <Abs x={60} y={1040} w={960} h={340} style={{background: '#E9E6DF', border: `5px solid ${INK}`, borderRadius: 24, opacity: pop(t, 316.14), filter: 'sepia(0.4)'}}>
            <div style={{position: 'absolute', left: 40, top: 60}}><F n="dossier" size={190} /></div>
            <div style={{position: 'absolute', left: 140, top: 20, opacity: 0.8}}><F n="toile" size={120} /></div>
            <div style={{position: 'absolute', left: 300, top: 80, fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: DIM, width: 600}}>rangé dans un dossier que plus personne n’ouvre</div>
          </Abs>
          <Stamp at={317.3} c={RED} text="jamais à jour" x={380} y={1280} rot={-6} size={54} />
        </>
      )}
    </Out>
  );
};

/* ═════════════ 6 · BONNES PRATIQUES ET SUIVI ═════════════ */
const OR = [{l: 'restez simple', s: '3 niveaux suffisent souvent', ic: 'feuille', a: 333.0, as: 336.0}, {l: 'critères hyper clairs', s: 'bouclier contre la subjectivité', ic: 'bouclier', a: 338.5, as: 341.0}, {l: 'réviser', s: 'après incident majeur ou gros changement', ic: 'repeter', a: 343.0, as: 345.0}, {l: 'impliquer le terrain', s: 'rester connecté à la réalité', ic: 'equipe', a: 348.9, as: 350.5}];
const QUOTE = '« Une cartographie n’est utile que si elle reste un document vivant. »';
const Suivi: React.FC = () => {
  const t = useT();
  const ph = t < 327.5 ? 0 : t < 353.8 ? 1 : t < 359.4 ? 2 : 3;
  const ice = prog(t, 362.8, 364.0, easeOut);
  const breath = 1 + 0.025 * Math.sin(t * 4);
  return (
    <Out end={OUTRO_AT}>
      {ph === 0 && (
        <>
          <HiLine words={['Tenir', 'sur', 'le', 'long', 'terme']} mark={[3, 4]} at={322.0} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={900} style={{opacity: pop(t, 322.0)}}>
            <svg width={960} height={900}>
              <path d="M480 880 C 300 700, 700 520, 480 340 S 520 80, 480 20" fill="none" stroke="#3A4356" strokeWidth={90} strokeLinecap="round" strokeDasharray={1400} strokeDashoffset={1400 * (1 - prog(t, 322.2, 324.5, easeInOut))} />
              <path d="M480 880 C 300 700, 700 520, 480 340 S 520 80, 480 20" fill="none" stroke={YEL} strokeWidth={8} strokeDasharray="30 30" strokeDashoffset={-t * 80} opacity={prog(t, 324.0, 324.5)} />
            </svg>
            <div style={{position: 'absolute', left: 420, top: -30, opacity: pop(t, 324.6)}}><F n="trophee" size={120} /></div>
            {t > 325.0 && <div style={{position: 'absolute', left: 0, right: 0, top: 860, textAlign: 'center'}}><Pill at={325.0} c={GREEN} size={30}>les règles essentielles</Pill></div>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Les', 'règles', 'd’or']} mark={[1, 2]} at={327.6} y={330} size={66} />
          {OR.map((x, k) => (
            <Abs key={x.l} x={60} y={440 + k * 238} w={960} h={212} style={{opacity: t >= x.a - 0.4 ? 1 : 0.25, transform: `translateX(${(1 - pop(t, x.a - 0.4)) * 60}px)`}}>
              <div style={{position: 'absolute', inset: 0, borderRadius: 26, background: t >= x.a ? 'linear-gradient(110deg, #FFF8DC, #FFE89A 50%, #FFF8DC)' : '#fff', border: `5px solid ${INK}`, boxShadow: `8px 8px 0 ${GOLD}`, overflow: 'hidden'}}>
                <Shine at={x.a} />
                <div style={{position: 'absolute', left: 30, top: 50}}><Num n={k + 1} c={GOLD} size={110} /></div>
                <div style={{position: 'absolute', left: 170, top: 46}}><F n={x.ic} size={110} /></div>
                <div style={{position: 'absolute', left: 310, top: 40, fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: INK}}>{x.l}</div>
                <div style={{position: 'absolute', left: 312, top: 116, fontFamily: MONO, fontWeight: 700, fontSize: 26, color: BURG, opacity: pop(t, x.as)}}>{x.s}</div>
              </div>
            </Abs>
          ))}
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['À', 'retenir']} mark={[1]} at={353.9} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={440} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 30, boxShadow: `10px 10px 0 ${GREEN}`, padding: 40, boxSizing: 'border-box', opacity: pop(t, 354.0)}}>
            <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 64, color: INK, lineHeight: 1.2}}>{QUOTE.slice(0, Math.floor(prog(t, 355.4, 358.6) * QUOTE.length))}<span style={{opacity: Math.sin(t * 12) > 0 ? 1 : 0, color: GREEN}}>|</span></div>
          </Abs>
          <Abs x={300} y={920} w={480} h={460} style={{transform: `scale(${breath})`, opacity: pop(t, 357.5)}}>
            <div style={{position: 'absolute', inset: 0, background: '#fff', border: `6px solid ${INK}`, borderRadius: 20, boxShadow: `0 0 ${30 + 20 * Math.sin(t * 4)}px ${GREEN}88`}}>
              <div style={{position: 'absolute', left: 90, top: 30}}><Matrix n={4} size={300} at={357.6} colorAt={[357.8, 357.8, 357.8]} /></div>
              <svg width={468} height={100} style={{position: 'absolute', left: 0, top: 350}}>
                <polyline points={Array.from({length: 60}, (_, k) => { const x = k * 8; const kk = (x + t * 200) % 160; return `${x},${50 - (kk > 60 && kk < 70 ? 35 : kk > 70 && kk < 80 ? -25 : 0)}`; }).join(' ')} fill="none" stroke={GREEN} strokeWidth={5} />
              </svg>
            </div>
          </Abs>
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={t < 366.7 ? ['Figée', '=', 'obsolète'] : ['Révision', 'continue']} mark={t < 366.7 ? [0, 2] : [0, 1]} at={t < 366.7 ? 359.5 : 366.8} y={330} size={66} />
          {t < 366.7 && (
            <>
              <Abs x={240} y={440} w={600} h={600} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 26, overflow: 'hidden', opacity: pop(t, 359.5)}}>
                <div style={{position: 'absolute', left: 60, top: 60, filter: `grayscale(${ice * 0.7})`}}><Matrix n={4} size={480} at={359.5} colorAt={[359.6, 359.6, 359.6]} /></div>
                <div style={{position: 'absolute', inset: 0, background: `linear-gradient(135deg, rgba(200,230,255,${0.75 * ice}), rgba(150,200,240,${0.55 * ice}))`, boxShadow: `inset 0 0 ${80 * ice}px #fff`}} />
                {ice > 0 && Array.from({length: 9}, (_, k) => <div key={k} style={{position: 'absolute', left: random(`ic${k}`) * 540, top: random(`iy${k}`) * 540, fontSize: 50 + random(`is${k}`) * 40, color: '#fff', opacity: ice, transform: `rotate(${random(`ir${k}`) * 90}deg) scale(${ice})`}}>❄</div>)}
                <div style={{position: 'absolute', left: 0, right: 0, top: 20, textAlign: 'center', opacity: ice}}><Pill at={362.8} c={BLUE} size={28}>figée à un instant T</Pill></div>
              </Abs>
              <Stamp at={365.2} c={RED} text="obsolète dès le lendemain" x={110} y={1100} rot={-6} size={50} />
            </>
          )}
          {t >= 366.7 && (
            <>
              <Abs x={190} y={450} w={700} h={700}>
                <svg width={700} height={700} style={{position: 'absolute', left: 0, top: 0, transform: `rotate(${(t - 366.7) * 120}deg)`}}>
                  <path d="M350 30 A 320 320 0 0 1 670 350" fill="none" stroke={GREEN} strokeWidth={22} strokeLinecap="round" />
                  <polygon points="650,330 690,330 670,380" fill={GREEN} />
                  <path d="M350 670 A 320 320 0 0 1 30 350" fill="none" stroke={GREEN} strokeWidth={22} strokeLinecap="round" />
                  <polygon points="10,370 50,370 30,320" fill={GREEN} />
                </svg>
                <div style={{position: 'absolute', left: 140, top: 140}}><Matrix n={4} size={420} at={366.7} colorAt={[366.8, 366.8, 366.8]} shuffle={t < 368.3 ? 3 : 0} /></div>
              </Abs>
              <Abs x={0} y={1180} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 20}}>
                <Pill at={366.9} c={RED} size={28}>les risques mutent</Pill>
                <Pill at={367.6} c={BLUE} size={28}>l’environnement change</Pill>
              </Abs>
              <Abs x={0} y={1280} w={1080} style={{textAlign: 'center'}}><Pill at={369.6} c={GREEN} size={32}>rester dans la course</Pill></Abs>
            </>
          )}
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
  {at: 0.05, s: 'sfx/pop', v: 0.35}, ...flaps(0.1, 12), {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 0.8, s: 'validation', v: 0.18})), {at: ALLDONE, s: 'validation', v: 0.35},
  {at: 3.0, s: 'sfx/rise', v: 0.2, dur: 1.2}, ...rep(3.1, 10, 0.2, 'tick', 0.1), {at: 6.02, s: 'soft-whoosh', v: 0.4, dur: 1}, {at: 7.0, s: 'sfx/thud', v: 0.3},
  ...pops(PROG.map((x) => x.a)), ...PROG.map((x) => shine(x.a + 0.3)), {at: 23.94, s: 'sfx/rise', v: 0.25, dur: 1},
  {at: 28.0, s: 'sfx/whoosh', v: 0.22}, {at: 33.7, s: 'sfx/pop', v: 0.22}, ...rep(36.7, 8, 0.1, 'stylo', 0.12),
  {at: 38.06, s: 'stylo', v: 0.35}, {at: 41.38, s: 'stylo', v: 0.35}, ...rep(43.66, 8, 0.06, 'sfx/pop', 0.1), {at: 44.74, s: 'sfx/swish', v: 0.25}, {at: 48.42, s: 'stylo', v: 0.3}, {at: 48.6, s: 'tampon', v: 0.55},
  {at: 49.74, s: 'sfx/rise', v: 0.2, dur: 1}, ...[50.2, 50.7, 51.2, 51.6, 52.0].map((a) => ({at: a, s: 'notification', v: 0.15})), {at: 53.6, s: 'sfx/ding', v: 0.3},
  {at: 59.9, s: 'sfx/whoosh', v: 0.22}, {at: 63.46, s: 'alarme', v: 0.06, dur: 1}, {at: 63.5, s: 'bass-hit', v: 0.3}, {at: 67.0, s: 'sfx/whoosh', v: 0.22}, {at: 70.82, s: 'sfx/ding', v: 0.25},
  ...[0, 1, 2, 3, 4, 5].map((k) => ({at: 74.4 + k * 0.6, s: 'sfx/thud', v: 0.2})), {at: 75.78, s: 'sfx/pop', v: 0.25}, {at: 77.34, s: 'sfx/pop', v: 0.25},
  {at: 87.0, s: 'soft-whoosh', v: 0.3}, ...rep(87.0, 9, 0.04, 'sfx/pop', 0.08), {at: 91.9, s: 'sfx/ding', v: 0.22}, {at: 93.74, s: 'sfx/swish', v: 0.3}, ...rep(93.8, 16, 0.03, 'sfx/pop', 0.07), {at: 96.86, s: 'sfx/rise', v: 0.25, dur: 1},
  {at: 98.98, s: 'sfx/ding', v: 0.25}, {at: 100.58, s: 'sfx/ding', v: 0.25}, {at: 103.5, s: 'sfx/ding', v: 0.25}, {at: 104.42, s: 'alarme', v: 0.07, dur: 1.4}, {at: 108.06, s: 'tampon', v: 0.55},
  {at: 110.3, s: 'soft-whoosh', v: 0.35, dur: 1}, {at: 115.5, s: 'sfx/whoosh', v: 0.2}, {at: 116.3, s: 'stylo', v: 0.3}, {at: 117.4, s: 'stylo', v: 0.3},
  ...rep(119.9, 10, 0.1, 'tick', 0.14), {at: 120.9, s: 'sfx/thud', v: 0.35}, ...rep(121.0, 18, 0.1, 'tick', 0.12), {at: 122.86, s: 'sfx/thud', v: 0.35}, {at: 123.98, s: 'validation', v: 0.35}, {at: 124.0, s: 'bass-hit', v: 0.3}, {at: 124.4, s: 'soft-whoosh', v: 0.3}, {at: 125.3, s: 'sfx/pop', v: 0.3},
  {at: 126.3, s: 'sfx/whoosh', v: 0.22}, shine(126.6), {at: 132.78, s: 'sfx/swish', v: 0.25}, ...rep(137.3, 10, 0.06, 'tick', 0.12), {at: 137.9, s: 'soft-whoosh', v: 0.5, dur: 1.2}, {at: 138.4, s: 'sfx/ding', v: 0.25},
  {at: 139.3, s: 'bass-hit', v: 0.35}, {at: 139.35, s: 'alarme', v: 0.05, dur: 0.8}, {at: 142.18, s: 'sfx/pop', v: 0.18}, {at: 144.26, s: 'sfx/ding', v: 0.2}, {at: 145.78, s: 'sfx/pop', v: 0.22}, {at: 148.26, s: 'sfx/pop', v: 0.22},
  {at: 153.0, s: 'sfx/whoosh', v: 0.22}, {at: 159.26, s: 'deep-hit', v: 0.3}, {at: 159.3, s: 'soft-whoosh', v: 0.35, dur: 1.4}, ...pops([160.2, 160.5, 160.8, 161.1], 0.18), {at: 160.66, s: 'sfx/pop', v: 0.2},
  ...pops([162.6, 168.42, 173.58]), ...[162.9, 168.7, 173.9].map(shine), ...rep(164.0, 6, 0.3, 'sfx/click', 0.1), {at: 172.54, s: 'sfx/ding', v: 0.25}, {at: 175.9, s: 'sfx/pop', v: 0.2}, {at: 177.3, s: 'sfx/pop', v: 0.2}, {at: 179.3, s: 'sfx/swish', v: 0.3}, {at: 179.62, s: 'tampon', v: 0.6},
  ...rep(184.2, 12, 0.08, 'sfx/pop', 0.08), {at: 192.1, s: 'sfx/swish', v: 0.2}, {at: 193.5, s: 'soft-whoosh', v: 0.5, dur: 1.4}, {at: 194.8, s: 'sfx/thud', v: 0.35}, ...STEPS.map((x) => ({at: x.a, s: 'sfx/ding', v: 0.22})),
  {at: 204.4, s: 'sfx/whoosh', v: 0.22}, ...[206.6, 208.5, 210.9].map((a) => ({at: a + 0.25, s: 'sfx/ding', v: 0.2})), {at: 212.66, s: 'sfx/pop', v: 0.22}, ...[0, 1, 2, 3, 4].map((k) => ({at: 214.95 + k * 0.22, s: 'sfx/thud', v: 0.3})), {at: 216.0, s: 'deep-hit', v: 0.3},
  {at: 216.8, s: 'sfx/whoosh', v: 0.22}, {at: 219.6, s: 'stylo', v: 0.3}, {at: 221.5, s: 'soft-whoosh', v: 0.4, dur: 1}, ...pops([222.5, 223.82, 226.66]),
  {at: 228.5, s: 'sfx/whoosh', v: 0.22}, ...rep(228.6, 6, 0.15, 'tick', 0.1), {at: 237.3, s: 'sfx/swish', v: 0.25}, {at: 238.3, s: 'sfx/thud', v: 0.4}, {at: 240.54, s: 'sfx/rise', v: 0.2, dur: 0.8}, {at: 241.7, s: 'sfx/rise', v: 0.15, dur: 0.6},
  ...searchCues(243.3, 17, 244.6, 244.95), {at: 245.9, s: 'sfx/pop', v: 0.22}, ...rep(246.0, 15, 0.3, 'tick', 0.1), {at: 248.74, s: 'sfx/pop', v: 0.22}, {at: 251.5, s: 'alarme', v: 0.06, dur: 1.2},
  {at: 253.4, s: 'sfx/whoosh', v: 0.22}, {at: 257.18, s: 'soft-whoosh', v: 0.25}, {at: 261.76, s: 'tampon', v: 0.6}, {at: 261.8, s: 'deep-hit', v: 0.3}, ...[264.78, 265.6, 266.2, 267.3].map((a) => ({at: a, s: 'sfx/rise', v: 0.16, dur: 0.5})), {at: 273.78, s: 'sfx/pop', v: 0.22},
  ...rep(278.5, 4, 0.1, 'tick', 0.12), {at: 280.6, s: 'soft-whoosh', v: 0.3}, ...[282.98, 283.6, 284.0, 284.9].map((a) => ({at: a, s: 'sfx/click', v: 0.4})), {at: 285.42, s: 'validation', v: 0.3}, {at: 285.5, s: 'sfx/ding', v: 0.25},
  ...pops(STRAT.map((x) => x.a), 0.25), ...STRAT.map((x) => shine(x.a + 0.3)),
  {at: 297.1, s: 'sfx/whoosh', v: 0.22}, {at: 301.66, s: 'tampon', v: 0.6}, {at: 301.7, s: 'bass-hit', v: 0.25}, {at: 306.3, s: 'sfx/swish', v: 0.25}, {at: 307.6, s: 'notification', v: 0.2},
  {at: 310.5, s: 'sfx/whoosh', v: 0.22}, ...rep(313.6, 20, 0.1, 'sfx/click', 0.08), {at: 316.14, s: 'sfx/thud', v: 0.3}, {at: 317.3, s: 'tampon', v: 0.6},
  {at: 322.2, s: 'soft-whoosh', v: 0.35, dur: 2}, {at: 324.6, s: 'sfx/ding', v: 0.25}, ...OR.map((x) => ({at: x.a, s: 'sfx/ding', v: 0.25})), ...OR.map((x) => shine(x.a)),
  {at: 354.0, s: 'sfx/whoosh', v: 0.22}, ...rep(355.4, 30, 0.1, 'sfx/click', 0.07), {at: 357.5, s: 'sfx/rise', v: 0.2, dur: 1},
  {at: 359.5, s: 'sfx/whoosh', v: 0.22}, {at: 362.8, s: 'soft-whoosh', v: 0.4, dur: 1.2}, {at: 365.2, s: 'tampon', v: 0.6}, {at: 365.25, s: 'deep-hit', v: 0.3}, {at: 366.8, s: 'sfx/rise', v: 0.25, dur: 1.5}, ...rep(366.9, 10, 0.15, 'tick', 0.1), {at: 369.6, s: 'sfx/pop', v: 0.25},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const CartoRisques: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={24.65}><Intro /></Gate>
    <Gate from={27.8} to={78.85}><Outil /></Gate>
    <Gate from={82.0} to={149.65}><Anatomie /></Gate>
    <Gate from={152.8} to={180.65}><Valeur /></Gate>
    <Gate from={183.8} to={275.05}><Construire /></Gate>
    <Gate from={278.2} to={318.65}><Evaluer /></Gate>
    <Gate from={321.8} to={OUTRO_AT}><Suivi /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}><Gyro i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={371.4}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-cartographie-risques-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Kin, Brut, T, TitleBlock, Deep, Card, IcoLab, Win, Count, GLASS, TEAL, Photo, Tile];
