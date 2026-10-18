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
 * « Les 9 principes généraux de prévention » (6 min 03) — capsule « condensé + effet wahou + ultra premium » :
 * voix d'origine (sans musique de fond), sous-titres calés mot à mot, photos réelles, thème « papier quadrillé ».
 * Fil rouge : LE TUBE PNEUMATIQUE À SIX GUICHETS (défi → anticiper → DUERP → adapter → protéger → culture), adaptés aux
 * parties réellement présentes ; la capsule du dossier file d'un guichet à l'autre, chaque guichet passé se coche.
 * Transition : LE GYROPHARE à chaque partie.
 * Ultra premium : reflets lumineux qui balaient les cartes, cartes en verre dépoli, profondeur 3D, projecteur qui
 * révèle les dangers invisibles, feuille de route des 5 étapes, boussole qui retrouve le nord, escalier des
 * 3 premiers principes, carte de chaleur du DUERP ouverte par la barre de recherche, orbite autour de l'humain,
 * sigle CMR décodé, plan annuel qui s'orchestre, store vénitien sur photos réelles (garde-corps, harnais, briefing),
 * fusion des 9 piliers en un bouclier, balance contrainte / opportunité.
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
const OUTRO_AT = 363.6;
export const NEUF_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 42.6, n: '1', title: 'Le grand défi de la sécurité', s: 'un système de défense', c: RED, g: 'défi', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 85.9, n: '2', title: 'Anticiper les risques', s: 'principes 1 · 2 · 3', c: ORANGE, g: 'anticiper', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 128.1, n: '3', title: 'Le DUERP, outil vivant', s: 'cartographier et prioriser', c: BLUE, g: 'DUERP', k: 'gyro', lab: 'PARTIE 3 / 6'},
  {at: 178.9, n: '4', title: 'Adaptation et innovation', s: 'principes 4 · 5 · 6 · 7', c: VIO, g: 'adapter', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 249.9, n: '5', title: 'Protection et formation', s: 'principes 8 · 9', c: TEAL, g: 'protéger', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 317.2, n: '6', title: 'Vers une culture de sécurité', s: 'des règles à la vision', c: GREEN, g: 'culture', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 360.9;

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
      <Img src={PH('epi/garde-corps.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 900, objectFit: 'cover'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 32%, ${PAPER}DD 42%, ${PAPER} 47%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={690} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>ARTICLE L4121-2</div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, marginTop: 16}}><Tile ch="9" size={170} c={RED} glow={20} /><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 84, color: INK, textAlign: 'left', lineHeight: 1}}>principes<br />généraux</div></div>
        <div style={{marginTop: 14}}><Board text="PREVENTION" at={-1} h={100} c={GREEN} stag={0.03} /></div>
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
const STEPS = [{l: 'le défi de la sécurité', a: 33.18, c: RED, p: []}, {l: 'anticiper les risques', a: 34.78, c: ORANGE, p: [1, 2, 3]}, {l: 'adaptation et innovation', a: 36.58, c: VIO, p: [4, 5, 6, 7]}, {l: 'protection et formation', a: 38.18, c: TEAL, p: [8, 9]}, {l: 'la culture de sécurité', a: 40.62, c: GREEN, p: []}];
const Intro: React.FC = () => {
  const t = useT();
  const ph = t < 11.1 ? 0 : t < 25.4 ? 1 : 2;
  const beat = Math.abs(Math.sin(t * 7));
  return (
    <Out end={42.65}>
      <HiLine words={ph === 0 ? ['Le', 'piège', 'de', 'la', 'paperasse'] : ph === 1 ? ['Une', 'philosophie', 'de', 'prévention'] : ['Cinq', 'grandes', 'étapes']} mark={ph === 0 ? [4] : ph === 1 ? [1] : [0, 2]} at={[2.7, 11.2, 25.5][ph]} y={330} size={ph === 1 ? 50 : 60} />
      {ph === 0 && (
        <>
          <Abs x={110} y={460} w={860} h={560} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${DIM}`, opacity: pop(t, 2.8), overflow: 'hidden'}}>
            <div style={{position: 'absolute', left: 20, top: 14}}><Mono at={3.0} c={DIM} size={20}>registre · à signer</Mono></div>
            {Array.from({length: 12}, (_, k) => {const a = 7.5 + k * 0.2; return <div key={k} style={{position: 'absolute', left: 40 + (k % 3) * 270, top: 70 + Math.floor(k / 3) * 110, display: 'flex', alignItems: 'center', gap: 12}}><div style={{width: 46, height: 46, border: `4px solid ${INK}`, borderRadius: 8, background: t > a ? GREEN : '#fff', color: '#fff', fontWeight: 900, fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{t > a ? '✓' : ''}</div><div style={{width: 160, height: 12, borderRadius: 6, background: '#D9DFE8'}} /></div>;})}
          </Abs>
          <svg width={1080} height={200} style={{position: 'absolute', left: 0, top: 1050}}><path d="M200 120 C 260 40, 300 160, 360 90 S 460 40, 520 110 S 640 150, 700 70 S 820 120, 880 90" fill="none" stroke={NAVY} strokeWidth={8} strokeLinecap="round" strokeDasharray={900} strokeDashoffset={900 * (1 - prog(t, 8.7, 10.0))} /></svg>
          <Abs x={0} y={1250} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 56, color: RED, opacity: pop(t, 10.2)}}>…et on passe à autre chose</Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <Abs x={0} y={470} w={1080} style={{textAlign: 'center'}}><span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: DIM, opacity: pop(t, 16.3)}}>une liste de contraintes barbantes<Strike p={prog(t, 17.6, 18.1)} c={RED} /></span></Abs>
          <GlassCard x={60} y={580} w={460} h={560} at={21.5} c={RED}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 50, gap: 16}}><div style={{transform: `scale(${1 + 0.12 * beat})`}}><F n="coeur" size={170} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40}}>sauve des vies</div></div>
            <svg width={460} height={120} style={{position: 'absolute', left: 0, bottom: 20}}><polyline points={Array.from({length: 24}, (_, k) => {const ph2 = (k + Math.floor(t * 16)) % 12; return `${k * 20},${60 + (ph2 === 5 ? -45 : ph2 === 6 ? 40 : 0)}`;}).join(' ')} fill="none" stroke={RED} strokeWidth={5} /></svg>
          </GlassCard>
          <GlassCard x={560} y={580} w={460} h={560} at={23.7} c={GREEN}>
            <div style={{position: 'absolute', left: 50, right: 50, bottom: 120, height: 300, display: 'flex', alignItems: 'flex-end', gap: 20}}>{[0.35, 0.55, 0.75, 1].map((h, k) => <div key={k} style={{flex: 1, height: `${h * 100 * prog(t, 23.9 + k * 0.15, 24.6 + k * 0.15, easeOut)}%`, background: GREEN, border: `4px solid ${INK}`, borderRadius: 8}} />)}</div>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 40, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34}}>les plus performantes</div>
          </GlassCard>
        </>
      )}
      {ph === 2 && (
        <>
          {Array.from({length: 9}, (_, k) => {
            const sc = prog(t, 28.9 + k * 0.06, 29.4 + k * 0.06, easeOut);
            const grp = prog(t, 31.0, 32.4, easeInOut);
            const si = k < 3 ? 1 : k < 7 ? 2 : 3;
            const idx = STEPS[si].p.indexOf(k + 1);
            const fx = 140 + (random(`sx${k}`)) * 800, fy = 520 + random(`sy${k}`) * 300;
            const tx = 330 + idx * 120, ty = 470 + si * 190 + 60;
            return <div key={k} style={{position: 'absolute', left: lerp(fx, tx, grp) - 45, top: lerp(fy, ty, grp) - 45, opacity: sc, transform: `scale(${lerp(1, 0.78, grp)})`, zIndex: 4}}><Num n={k + 1} c={STEPS[si].c} /></div>;
          })}
          {STEPS.map((x, k) => (
            <Abs key={x.l} x={60} y={470 + k * 190} w={960} h={150} style={{opacity: pop(t, x.a), transform: `translateX(${(1 - pop(t, x.a)) * -80}px)`}}>
              <div style={{position: 'absolute', left: 0, top: 20, width: 230, height: 110, borderRadius: 18, background: x.c, border: `5px solid ${INK}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 10, boxSizing: 'border-box', boxShadow: `6px 6px 0 ${INK}`}}>{x.l}</div>
              {k < 4 && <div style={{position: 'absolute', left: 105, top: 135, width: 10, height: 55, background: INK}} />}
              {x.p.length === 0 && <div style={{position: 'absolute', left: 270, top: 55, fontFamily: handFont, fontWeight: 700, fontSize: 40, color: x.c}}>{k === 0 ? 'le cadre : la loi' : 'la vision d’ensemble'}</div>}
            </Abs>
          ))}
        </>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 1 : LE DÉFI ═════════════ */
const DANG = [{ic: 'eclair', x: 220, y: 200}, {ic: 'feu', x: 640, y: 160}, {ic: 'danger', x: 420, y: 380}, {ic: 'radioactif', x: 760, y: 420}, {ic: 'echelle', x: 160, y: 440}];
const Defi: React.FC = () => {
  const t = useT();
  const ph = t < 61.4 ? 0 : 1;
  const lx = 480 + Math.sin((t - 52) * 1.1) * 330, ly = 300 + Math.cos((t - 52) * 0.8) * 150;
  const comp = t < 84.6 ? Math.sin(t * 5) * 70 * (1 - prog(t, 80.2, 84.6)) + 40 * (1 - prog(t, 82, 84.6)) : 0;
  return (
    <Out end={85.95}>
      <HiLine words={ph === 0 ? ['Un', 'système', 'de', 'défense'] : ['Article', 'L4121-2']} mark={ph === 0 ? [1, 3] : [1]} at={ph === 0 ? 46.1 : 61.6} y={330} size={64} />
      {ph === 0 && (
        <>
          <Abs x={60} y={460} w={960} h={620} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 26, overflow: 'hidden', opacity: pop(t, 46.3), boxShadow: `10px 10px 0 ${RED}`}}>
            {DANG.map((d, k) => {const v = Math.max(0, 1 - Math.hypot(d.x - lx, d.y - ly) / 230); return <div key={k} style={{position: 'absolute', left: d.x - 60, top: d.y - 60, opacity: t > 53.8 ? Math.max(v, 0.05) : 0, transform: `scale(${0.8 + 0.4 * v})`}}><F n={d.ic} size={120} /></div>;})}
            <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at ${lx}px ${ly}px, transparent 170px, rgba(10,12,20,0.9) 320px)`, opacity: t > 53.8 ? 1 : 0}} />
            <div style={{position: 'absolute', left: 20, top: 16}}><Mono at={53.9} c={YEL} size={22}>dangers invisibles</Mono></div>
          </Abs>
          <Abs x={0} y={1110} w={1080} style={{textAlign: 'center'}}><span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK, opacity: pop(t, 58.2)}}>réaction improvisée<Strike p={prog(t, 60.0, 60.5)} c={RED} /></span></Abs>
          <Stamp at={60.9} c={RED} text="jamais" x={360} y={1200} rot={-6} size={80} />
        </>
      )}
      {ph === 1 && (
        <>
          <Abs x={160} y={450} w={760} h={420} style={{perspective: 1600}}>
            <div style={{width: '100%', height: '100%', background: 'linear-gradient(160deg, #FFFDF4, #F1EAD3)', border: `6px solid ${INK}`, borderRadius: 18, boxShadow: `0 30px 60px rgba(20,33,61,0.25), 10px 10px 0 ${NAVY}`, transform: `rotateX(${(1 - Math.max(0, Math.min(1, spring(t, 61.8, 7, 12)))) * 70}deg) rotateY(${Math.sin(t * 0.8) * 4}deg)`, overflow: 'hidden', position: 'relative'}}>
              <div style={{position: 'absolute', left: 30, top: 24, fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM}}>CODE DU TRAVAIL</div>
              <div style={{position: 'absolute', left: 30, top: 70, fontFamily: sansFont, fontWeight: 900, fontSize: 72, color: NAVY}}>Art. L4121-2</div>
              <div style={{position: 'absolute', left: 30, right: 30, top: 180, display: 'flex', flexWrap: 'wrap', gap: 12}}>{Array.from({length: 9}, (_, k) => <div key={k} style={{opacity: pop(t, 70.2 + k * 0.12), transform: `scale(${pop(t, 70.2 + k * 0.12)})`}}><Num n={k + 1} c={GOLD} size={66} /></div>)}</div>
              <div style={{position: 'absolute', left: 30, bottom: 24, fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: INK, opacity: pop(t, 71.0)}}>9 principes généraux de prévention</div>
              <Shine at={63.8} dur={1.2} every={4} />
            </div>
          </Abs>
          <Abs x={0} y={900} w={1080} style={{textAlign: 'center'}}><span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: DIM, opacity: pop(t, 75.5)}}>un texte de loi austère<Strike p={prog(t, 76.6, 77.1)} c={RED} /></span></Abs>
          <GlassCard x={60} y={1000} w={460} h={430} at={77.9} c={ORANGE}><IcoLab ic="boite-outils" l="la boîte à outils ultime" size={140} fs={32} /></GlassCard>
          <GlassCard x={560} y={1000} w={460} h={430} at={80.2} c={NAVY}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30}}>
              <svg width={220} height={220}><circle cx={110} cy={110} r={100} fill="#fff" stroke={INK} strokeWidth={8} /><text x={110} y={42} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={30} fill={RED}>N</text><g transform={`rotate(${comp} 110 110)`}><polygon points="110,40 124,110 96,110" fill={RED} stroke={INK} strokeWidth={3} /><polygon points="110,180 124,110 96,110" fill="#C9D2DF" stroke={INK} strokeWidth={3} /></g><circle cx={110} cy={110} r={10} fill={INK} /></svg>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, marginTop: 14}}>la vraie boussole</div>
              <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 40, color: GREEN, opacity: pop(t, 84.6)}}>cap au nord ✓</div>
            </div>
          </GlassCard>
        </>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 2 : ANTICIPER ═════════════ */
const Anticiper: React.FC = () => {
  const t = useT();
  const ph = t < 101.1 ? 0 : 1;
  const come = prog(t, 94.0, 98.0, easeIn);
  const stop = t > 98.1;
  const sortP = prog(t, 119.6, 120.8, easeInOut);
  const BARS = [0.4, 0.9, 0.6, 0.3];
  const order = [1, 2, 0, 3];
  return (
    <Out end={128.15}>
      <HiLine words={ph === 0 ? ['Stopper', 'le', 'danger'] : ['Les', 'trois', 'premiers', 'principes']} mark={ph === 0 ? [0, 2] : [1, 2]} at={ph === 0 ? 89.5 : 101.3} y={330} size={62} />
      {ph === 0 && (
        <Abs x={60} y={480} w={960} h={600} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `8px 8px 0 ${ORANGE}`, opacity: pop(t, 91.4), overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 20, top: 14}}><Mono at={91.6} c={ORANGE} size={22}>proactivité</Mono></div>
          <div style={{position: 'absolute', left: 40, right: 40, top: 330, height: 14, background: '#E3E8EF', borderRadius: 7}} />
          <div style={{position: 'absolute', left: lerp(860, stop ? 560 : 300, stop ? 1 : come), top: 250, transform: stop ? `translateX(${Math.sin(t * 40) * 6 * (1 - prog(t, 98.1, 98.8))}px)` : undefined}}><F n="danger" size={150} /></div>
          <div style={{position: 'absolute', left: 120, top: 220, opacity: pop(t, 96.8)}}><F n="salarie" size={170} /></div>
          {t > 97.6 && <div style={{position: 'absolute', left: 430, top: lerp(-200, 190, prog(t, 97.6, 98.1, easeIn)), width: 40, height: 260, background: `repeating-linear-gradient(180deg, ${RED} 0 40px, #fff 40px 80px)`, border: `5px solid ${INK}`, borderRadius: 10}} />}
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 30, textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 50, color: GREEN, opacity: pop(t, 98.4)}}>arrêté avant même d’arriver</div>
        </Abs>
      )}
      {ph === 1 && (
        <>
          {[{n: 1, l: 'Éviter', s: 'supprimer le danger', a: 104.2, c: GREEN}, {n: 2, l: 'Évaluer', s: 'identifier et classer', a: 116.6, c: ORANGE}, {n: 3, l: 'Combattre à la source', s: 'attaquer la racine', a: 122.8, c: RED}].map((x, k) => (
            <GlassCard key={x.n} x={60 + k * 40} y={450 + k * 330} w={600} h={300} at={x.a} c={x.c}>
              <div style={{display: 'flex', alignItems: 'center', gap: 20, padding: '30px 26px'}}><Num n={x.n} c={x.c} size={100} /><div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: x.l.length > 12 ? 34 : 46, color: INK}}>{x.l}</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM, marginTop: 6}}>{x.s}</div></div></div>
            </GlassCard>
          ))}
          <Abs x={720} y={460} w={300} h={290} style={{opacity: pop(t, 106.3)}}>
            <div style={{position: 'absolute', left: 70, top: 30, filter: `blur(${prog(t, 108.1, 109.6) * 10}px)`, opacity: 1 - prog(t, 108.4, 109.8), transform: `scale(${1 + prog(t, 108.1, 109.6) * 0.5})`}}><F n="danger" size={160} /></div>
            {Array.from({length: 10}, (_, k) => {const q = prog(t, 108.1, 109.6, easeOut); return t > 108.1 ? <div key={k} style={{position: 'absolute', left: 150 + Math.cos(k * 0.63) * 140 * q, top: 110 + Math.sin(k * 0.63) * 140 * q, width: 14, height: 14, borderRadius: 7, background: YEL, opacity: 1 - q}} /> : null;})}
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 40, color: GREEN, opacity: pop(t, 110.2)}}>plus de risque</div>
          </Abs>
          <Abs x={760} y={790} w={260} h={260} style={{opacity: pop(t, 118.8), background: '#fff', border: `4px solid ${INK}`, borderRadius: 18}}>
            {BARS.map((b, k) => {const pos = lerp(k, order.indexOf(k), sortP); return <div key={k} style={{position: 'absolute', left: 24 + pos * 56, bottom: 24, width: 40, height: b * 200, background: b > 0.7 ? RED : b > 0.5 ? ORANGE : GREEN, border: `3px solid ${INK}`, borderRadius: 6}} />;})}
          </Abs>
          <Abs x={800} y={1120} w={220} h={300} style={{opacity: pop(t, 123.4)}}>
            <F n="arbre" size={180} />
            <svg width={220} height={120} style={{position: 'absolute', left: 0, top: 170}}>{[0, 1, 2, 3].map((k) => <path key={k} d={`M110 0 Q ${60 + k * 35} 50 ${30 + k * 55} 110`} fill="none" stroke={RED} strokeWidth={6} strokeDasharray={140} strokeDashoffset={140 * (1 - prog(t, 124.0 + k * 0.1, 124.8 + k * 0.1))} />)}</svg>
          </Abs>
          <Abs x={60} y={1460} w={960} style={{textAlign: 'center'}}><span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: DIM, opacity: pop(t, 126.0)}}>limiter la casse<Strike p={prog(t, 126.6, 127.1)} c={RED} /></span></Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 3 : LE DUERP ═════════════ */
const HEAT = Array.from({length: 20}, (_, k) => random(`ht${k}`));
const Duerp: React.FC = () => {
  const t = useT();
  const ph = t < 152.4 ? 0 : 1;
  const heat = prog(t, 137.4, 139.2);
  const pri = prog(t, 147.7, 149.0, easeInOut);
  const top = HEAT.map((v, i) => [v, i]).sort((a, b) => b[0] - a[0]).slice(0, 3).map((x) => x[1]);
  const col = (v: number) => (v > 0.75 ? RED : v > 0.5 ? ORANGE : v > 0.25 ? YEL : GREEN);
  const bim = Math.max(0, Math.min(1, spring(t, 162.5, 7, 9)));
  return (
    <Out end={178.95}>
      <HiLine words={ph === 0 ? ['Le', 'DUERP'] : ['Dans', 'la', 'vraie', 'vie']} mark={ph === 0 ? [1] : [2, 3]} at={ph === 0 ? 131.5 : 152.5} y={330} size={66} />
      {ph === 0 && (
        <SearchOpen x={60} y={440} w={960} h={1040} at={131.6} query="document unique risques" results={['Registre des visites de chantier', 'DUERP · document unique d’évaluation', 'Plan de formation annuel']} found={1} foundAt={133.6} clickAt={134.1} c={BLUE}>
          <div style={{position: 'absolute', left: 30, top: 20, display: 'flex', gap: 12}}><Pill at={136.2} c={RED} size={26}>obligatoire</Pill><Pill at={137.5} c={BLUE} size={26}>cartographier</Pill>{t > 144.8 && <div style={{display: 'flex', alignItems: 'center', gap: 8, background: GREEN, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 22, padding: '6px 14px', borderRadius: 20}}><span style={{opacity: Math.sin(t * 8) > 0 ? 1 : 0.3}}>●</span> VIVANT</div>}</div>
          <div style={{position: 'absolute', left: 30, top: 90, width: 560, height: 450, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8}}>
            {HEAT.map((v, k) => {const isTop = top.includes(k); return <div key={k} style={{borderRadius: 10, border: `3px solid ${INK}`, background: heat * 20 > k ? col(v) : '#EEF1F5', transform: `scale(${pri > 0 && isTop ? 1 + 0.12 * Math.sin(t * 6) : 1})`, boxShadow: pri > 0 && isTop ? `0 0 20px ${RED}` : 'none', opacity: pri > 0 && !isTop ? 1 - pri * 0.5 : 1}} />;})}
          </div>
          <div style={{position: 'absolute', left: 620, top: 90, width: 300, display: 'flex', flexDirection: 'column', gap: 14}}>
            {top.map((k, i) => <div key={k} style={{display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: `4px solid ${INK}`, borderRadius: 14, padding: '10px 12px', opacity: prog(t, 148.0 + i * 0.25, 148.4 + i * 0.25), transform: `translateX(${(1 - prog(t, 148.0 + i * 0.25, 148.4 + i * 0.25)) * 60}px)`}}><Num n={i + 1} c={RED} size={46} /><F n="argent" size={44} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22}}>priorité</div></div>)}
            <div style={{display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, opacity: pop(t, 150.3)}}><F n="epingle" size={60} /><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 36, color: BLUE}}>où intervenir</div></div>
          </div>
          <div style={{position: 'absolute', left: 30, right: 30, top: 580, height: 330, borderRadius: 20, overflow: 'hidden', border: `5px solid ${INK}`, opacity: pop(t, 139.6)}}>
            <Img src={PH('docs5/duerp.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', filter: t > 141.2 ? `grayscale(${prog(t, 141.2, 142.2)})` : undefined}} />
            <div style={{position: 'absolute', left: 20, bottom: 20}}><span style={{position: 'relative', background: '#fff', padding: '6px 14px', borderRadius: 10, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM}}>paperasse rangée au placard<Strike p={prog(t, 143.6, 144.2)} c={RED} /></span></div>
            <Shine at={145.0} dur={1.0} />
          </div>
        </SearchOpen>
      )}
      {ph === 1 && (
        <>
          <GlassCard x={60} y={450} w={960} h={470} at={158.6} c={GREEN}>
            <div style={{position: 'absolute', left: 20, top: 16}}><Mono at={158.8} c={GREEN} size={22}>exemple 1 · principe 1</Mono></div>
            <div style={{position: 'absolute', left: 70, top: 110, textAlign: 'center', opacity: 1 - prog(t, 161.5, 162.4) * 0.6, filter: `grayscale(${prog(t, 161.5, 162.4)})`}}><F n="ouvrier" size={170} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>tâche manuelle dangereuse</div></div>
            <div style={{position: 'absolute', left: 430, top: 160, fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: INK, opacity: pop(t, 161.5)}}>→</div>
            <div style={{position: 'absolute', left: 600, top: 110, textAlign: 'center', opacity: pop(t, 161.5)}}><div style={{transform: `rotate(${(t - 161.5) * 90}deg)`}}><F n="engrenage" size={170} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>automatisée</div></div>
            {bim > 0 && <div style={{position: 'absolute', left: 560, top: 30, transform: `scale(${bim}) rotate(-10deg)`, opacity: 1 - prog(t, 164.0, 164.6)}}><svg width={300} height={180}><polygon points="150,0 180,60 260,30 210,90 300,120 200,125 220,180 150,135 80,180 100,125 0,120 90,90 40,30 120,60" fill={YEL} stroke={INK} strokeWidth={6} /><text x={150} y={108} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={48} fill={RED}>BIM !</text></svg></div>}
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center'}}><Pill at={165.0} c={GREEN} size={30}>évitement total</Pill></div>
          </GlassCard>
          <GlassCard x={60} y={960} w={960} h={470} at={166.3} c={RED}>
            <div style={{position: 'absolute', left: 20, top: 16}}><Mono at={166.5} c={RED} size={22}>exemple 2 · combattre à la source</Mono></div>
            <div style={{position: 'absolute', left: 80, top: 90, textAlign: 'center'}}><div style={{filter: `blur(${prog(t, 172.4, 174.6) * 12}px)`, opacity: 1 - prog(t, 173.0, 175.0)}}><F n="radioactif" size={160} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>produit toxique</div></div>
            <div style={{position: 'absolute', left: 400, top: 120, textAlign: 'center', opacity: pop(t, 171.2)}}><span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: DIM}}>un masque<Strike p={prog(t, 171.8, 172.2)} c={RED} /></span></div>
            <div style={{position: 'absolute', left: 680, top: 80, opacity: pop(t, 175.7), transform: `rotate(${Math.sin(t * 12) * 10}deg)`}}><F n="ciseaux" size={150} /></div>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center'}}><Pill at={177.2} c={GREEN} size={30}>mille fois plus sûr</Pill></div>
          </GlassCard>
        </>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 4 : ADAPTATION ET INNOVATION ═════════════ */
const ORB = [{ic: 'engrenage', l: 'les machines', a: 198.3}, {ic: 'clipboard', l: 'les méthodes', a: 199.3}, {ic: 'batiment', l: 'l’environnement', a: 200.7}];
const Adapter: React.FC = () => {
  const t = useT();
  const ph = t < 214.8 ? 0 : 1;
  const flip = prog(t, 195.6, 196.6, easeInOut);
  const rot = (t - 182) * 0.6;
  return (
    <Out end={249.95}>
      <HiLine words={ph === 0 ? (t < 195.6 ? ['L’humain', 'au', 'centre'] : ['Adapter', 'le', 'travail', 'à', 'l’homme']) : ['Principes', '5,', '6', 'et', '7']} mark={ph === 0 ? (t < 195.6 ? [0, 2] : [0, 4]) : [0]} at={ph === 0 ? (t < 195.6 ? 182.4 : 195.7) : 214.9} y={330} size={60} />
      {ph === 0 && (
        <>
          <Abs x={90} y={440} w={900} h={900}>
            {[300, 400].map((r) => <div key={r} style={{position: 'absolute', left: 450 - r, top: 450 - r, width: r * 2, height: r * 2, borderRadius: '50%', border: `3px dashed ${VIO}66`, opacity: pop(t, 182.6)}} />)}
            <div style={{position: 'absolute', left: 330, top: 330, width: 240, height: 240, borderRadius: 120, background: '#fff', border: `6px solid ${INK}`, boxShadow: `0 0 ${40 + 20 * Math.sin(t * 3)}px ${VIO}88`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 182.6)}}><F n="salarie" size={170} /></div>
            {t > 189.0 && [0, 1, 2, 3, 4, 5].map((k) => {const a = (k / 6) * Math.PI * 2; const r = lerp(200, 330, flip); const press = (1 - flip) * (0.5 + 0.5 * Math.sin(t * 6)); return <div key={k} style={{position: 'absolute', left: 450 + Math.cos(a) * (r + press * 20) - 30, top: 450 + Math.sin(a) * (r + press * 20) - 30, transform: `rotate(${(a * 180) / Math.PI + (flip > 0.5 ? 0 : 180)}deg)`, fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: flip > 0.5 ? GREEN : RED, opacity: pop(t, 189.1) * (1 - prog(t, 197.5, 198.2))}}>➜</div>;})}
            {ORB.map((o, k) => {const a = rot + (k / 3) * Math.PI * 2; return <div key={o.l} style={{position: 'absolute', left: 450 + Math.cos(a) * 360 - 85, top: 450 + Math.sin(a) * 360 - 80, width: 170, textAlign: 'center', opacity: pop(t, o.a), transform: `scale(${pop(t, o.a)})`}}><div style={{background: '#fff', border: `4px solid ${INK}`, borderRadius: 20, padding: 10, boxShadow: `5px 5px 0 ${VIO}`}}><F n={o.ic} size={80} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 20}}>{o.l}</div></div></div>;})}
          </Abs>
          {t < 195.6 && <Abs x={0} y={1370} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 54, color: RED, opacity: pop(t, 191.9)}}>une aberration absolue</Abs>}
          {t > 205.4 && (
            <Abs x={60} y={1340} w={960} style={{display: 'flex', alignItems: 'center', gap: 20, background: '#fff', border: `5px solid ${INK}`, borderRadius: 20, padding: '14px 20px', boxShadow: `7px 7px 0 ${VIO}`, opacity: pop(t, 205.5)}}>
              <div style={{transform: `rotate(${(1 - prog(t, 209.0, 210.4)) * 25}deg)`}}><F n="courbe-dos" size={90} /></div>
              <div style={{flex: 1}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32}}>ergonomie : ingénierie de précision</div><span style={{position: 'relative', fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: DIM}}>un petit tapis antifatigue<Strike p={prog(t, 208.0, 208.5)} c={RED} /></span></div>
              <Pill at={212.4} c={VIO} size={24}>TMS évités</Pill>
            </Abs>
          )}
        </>
      )}
      {ph === 1 && (
        <>
          <GlassCard x={60} y={450} w={960} h={290} at={218.4} c={BLUE}>
            <div style={{display: 'flex', alignItems: 'center', gap: 24, padding: '30px 30px'}}><Num n={5} c={BLUE} size={110} /><div style={{flex: 1}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40}}>l’évolution de la technique</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM, marginTop: 8, opacity: pop(t, 222.9)}}>équipements modernes · sécurisés</div></div><div style={{transform: `translateY(${Math.sin(t * 3) * -10}px)`}}><F n="fusee" size={120} /></div></div>
          </GlassCard>
          <GlassCard x={60} y={770} w={960} h={330} at={225.7} c={ORANGE}>
            <div style={{display: 'flex', alignItems: 'center', gap: 24, padding: '26px 30px'}}><Num n={6} c={ORANGE} size={110} /><div style={{flex: 1}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40}}>la substitution systématique</div></div>
              <div style={{position: 'relative', width: 130, height: 130, perspective: 600}}><div style={{position: 'absolute', inset: 0, transform: `rotateY(${prog(t, 230.5, 231.4) * 180}deg)`, transformStyle: 'preserve-3d'}}><div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden'}}><F n="crane" size={130} /></div><div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)'}}><F n="feuille" size={130} /></div></div></div>
            </div>
            <div style={{position: 'absolute', left: 30, bottom: 24, display: 'flex', gap: 12}}>{[{l: 'C · cancérigènes', a: 237.0}, {l: 'M · mutagènes', a: 238.2}, {l: 'R · reprotoxiques', a: 238.9}].map((x) => <Pill key={x.l} at={x.a} c={RED} size={24}>{x.l}</Pill>)}</div>
          </GlassCard>
          <GlassCard x={60} y={1130} w={960} h={360} at={239.6} c={GREEN}>
            <div style={{display: 'flex', alignItems: 'center', gap: 24, padding: '24px 30px 0'}}><Num n={7} c={GREEN} size={100} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40}}>planifier la prévention</div></div>
            <div style={{position: 'absolute', left: 30, right: 30, top: 150, display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 6}}>{Array.from({length: 36}, (_, k) => {const lane = Math.floor(k / 12); const a = [243.5, 244.1, 245.3][lane] + (k % 12) * 0.05; return <div key={k} style={{height: 34, borderRadius: 6, border: `2px solid ${INK}`, background: t > a ? [BLUE, ORANGE, VIO][lane] : '#EEF1F5'}} />;})}</div>
            <div style={{position: 'absolute', left: 30, bottom: 20, display: 'flex', gap: 14, fontFamily: MONO, fontWeight: 700, fontSize: 20}}><span style={{color: BLUE}}>■ technique</span><span style={{color: ORANGE}}>■ organisation</span><span style={{color: VIO}}>■ dialogue social</span></div>
            <div style={{position: 'absolute', right: 30, bottom: 14, fontFamily: handFont, fontWeight: 700, fontSize: 40, color: GREEN, opacity: pop(t, 248.7)}}>ça s’orchestre ♪</div>
          </GlassCard>
        </>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 5 : PROTECTION ET FORMATION ═════════════ */
const Proteger: React.FC = () => {
  const t = useT();
  const ph = t < 262.8 ? 0 : t < 291.2 ? 1 : 2;
  return (
    <Out end={317.25}>
      <HiLine words={ph === 0 ? ['L’ultime', 'ligne', 'de', 'défense'] : ph === 1 ? ['Principe', '8', ':', 'la', 'hiérarchie'] : ['Principe', '9', ':', 'instruire']} mark={ph === 0 ? [0, 3] : ph === 1 ? [1, 4] : [1, 3]} at={[253.4, 262.9, 291.3][ph]} y={330} size={60} />
      {ph === 0 && (
        <GlassCard x={140} y={460} w={800} h={560} at={256.7} c={TEAL}>
          <div style={{position: 'absolute', left: 20, top: 16}}><Mono at={256.9} c={TEAL} size={22}>risque résiduel</Mono></div>
          <svg width={800} height={420} style={{position: 'absolute', left: 0, top: 80}}>
            <path d="M100 360 A300 300 0 0 1 700 360" fill="none" stroke="#E3E8EF" strokeWidth={50} />
            <path d="M100 360 A300 300 0 0 1 700 360" fill="none" stroke={TEAL} strokeWidth={50} strokeDasharray={942} strokeDashoffset={942 * (1 - lerp(1, 0.88, prog(t, 257.8, 260.2, easeOut)))} />
            <line x1={400} y1={360} x2={400 + 250 * Math.cos(Math.PI * (1 - lerp(1, 0.88, prog(t, 257.8, 260.2, easeOut))))} y2={360 - 250 * Math.sin(Math.PI * (1 - lerp(1, 0.88, prog(t, 257.8, 260.2, easeOut))))} stroke={INK} strokeWidth={14} strokeLinecap="round" />
          </svg>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 40, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: RED, opacity: pop(t, 260.3)}}>il reste toujours une part de risque</div>
        </GlassCard>
      )}
      {ph === 1 && (
        <>
          {t > 274.1 && <Blinds src="epi/garde-corps.jpg" x={60} y={450} w={460} h={560} at={274.2} pos="50% 50%" n={10}>
            <div style={{position: 'absolute', left: 14, top: 14}}><Pill at={268.6} c={GREEN} size={26}>1 · collective</Pill></div>
            <div style={{position: 'absolute', left: 14, bottom: 14, display: 'flex', gap: 8}}><Pill at={283.8} c={TEAL} size={22}>pour tous</Pill><Pill at={284.6} c={TEAL} size={22}>passive</Pill></div>
          </Blinds>}
          {t > 278.8 && <Blinds src="epi/harnais.jpg" x={560} y={450} w={460} h={560} at={278.9} pos="50% 30%" n={10}>
            <div style={{position: 'absolute', left: 14, top: 14}}><Pill at={271.7} c={ORANGE} size={26}>2 · individuelle</Pill></div>
            <div style={{position: 'absolute', left: 14, bottom: 14}}><Pill at={287.2} c={RED} size={22}>comportement humain</Pill></div>
          </Blinds>}
          {t > 268.5 && t < 274.2 && <Abs x={0} y={560} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 86, lineHeight: 1.2, opacity: pop(t, 268.6)}}><span style={{color: GREEN}}>collective</span><br /><span style={{color: INK}}>&gt;</span><br /><span style={{color: ORANGE, opacity: pop(t, 271.7)}}>individuelle</span></Abs>}
          <Abs x={0} y={1050} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 56, color: TEAL, opacity: pop(t, 277.6)}}>infiniment plus efficace</Abs>
          <Abs x={60} y={1160} w={960} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, opacity: pop(t, 288.3)}}><F n="toile" size={100} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36}}>le harnais : le dernier filet</div></Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <Blinds src="induction/briefing-atelier.jpg" x={60} y={450} w={960} h={460} at={297.6} pos="50% 40%" n={12}>
            <div style={{position: 'absolute', left: 20, bottom: 20, display: 'flex', gap: 12}}><Pill at={300.7} c={TEAL} size={30}>former</Pill><Pill at={301.9} c={BLUE} size={30}>informer</Pill></div>
          </Blinds>
          <Abs x={0} y={940} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: pop(t, 298.8)}}><div style={{filter: `drop-shadow(0 0 ${20 + 15 * Math.sin(t * 4)}px ${YEL})`}}><F n="ampoule" size={100} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36}}>le pouvoir de la connaissance</div></Abs>
          <GlassCard x={60} y={1080} w={960} h={360} at={307.0} c={RED}>
            <div style={{display: 'flex', justifyContent: 'center', gap: 30, paddingTop: 40}}>{['casque', 'gants', 'lunettes', 'gilet'].map((ic, k) => <div key={ic} style={{filter: `grayscale(${prog(t, 311.6, 313.0)})`, opacity: 1 - prog(t, 313.0, 315.0) * 0.6, position: 'relative'}}><F n={ic} size={110} />{t > 312.4 && <div style={{position: 'absolute', right: -10, top: -10, fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: RED, opacity: pop(t, 312.4 + k * 0.15)}}>?</div>}</div>)}</div>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 34, textAlign: 'center'}}><span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK, opacity: pop(t, 309.4)}}>EPI high-tech sans compréhension<Strike p={prog(t, 316.3, 316.8)} c={RED} /></span></div>
          </GlassCard>
        </>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 6 : LA CULTURE DE SÉCURITÉ ═════════════ */
const Culture: React.FC = () => {
  const t = useT();
  const ph = t < 340.8 ? 0 : t < 355.4 ? 1 : 2;
  const fuse = prog(t, 334.6, 336.2, easeInOut);
  const tip = prog(t, 353.7, 354.6, easeInOut);
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={ph === 0 ? ['Des', 'règles', 'à', 'la', 'vision'] : ph === 1 ? ['Contrainte', 'ou', 'opportunité', '?'] : ['Le', 'défi', 'est', 'lancé']} mark={ph === 0 ? [1, 4] : ph === 1 ? [0, 2] : [1, 3]} at={[323.0, 340.9, 355.5][ph]} y={330} size={60} />
      {ph === 0 && (
        <>
          <Abs x={60} y={460} w={960} h={620}>
            {Array.from({length: 9}, (_, k) => {
              const a = 325.7 + k * 0.12;
              const x0 = k * 106, x1 = 430;
              return <div key={k} style={{position: 'absolute', left: lerp(x0, x1, fuse), bottom: 60, width: 96, height: lerp(300 + (k % 3) * 40, 200, fuse) * pop(t, a), background: `linear-gradient(90deg, ${[RED, ORANGE, GOLD, VIO, BLUE, TEAL, NAVY, GREEN, BURG][k]}, ${[RED, ORANGE, GOLD, VIO, BLUE, TEAL, NAVY, GREEN, BURG][k]}CC)`, border: `4px solid ${INK}`, borderRadius: 10, opacity: 1 - fuse * 0.9, display: 'flex', justifyContent: 'center', paddingTop: 10, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 40}}>{k + 1}</div>;
            })}
            {fuse > 0 && <div style={{position: 'absolute', left: 480 - 200, top: 80, width: 400, height: 460, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${fuse})`, filter: `drop-shadow(0 0 ${40 * fuse}px ${GOLD})`}}><F n="bouclier" size={380} /></div>}
            {fuse > 0 && fuse < 1 && <div style={{position: 'absolute', left: 480 - 400 * fuse, top: 310 - 400 * fuse, width: 800 * fuse, height: 800 * fuse, borderRadius: '50%', border: `10px solid ${GOLD}`, opacity: 1 - fuse}} />}
          </Abs>
          <Abs x={0} y={1110} w={1080} style={{textAlign: 'center'}}><span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: DIM, opacity: pop(t, 337.0)}}>checklist administrative<Strike p={prog(t, 338.0, 338.5)} c={RED} /></span></Abs>
          {t > 339.1 && <Abs x={0} y={1200} w={1080}><Board text="CULTURE" at={339.18} h={110} c={GREEN} stag={0.04} /></Abs>}
        </>
      )}
      {ph === 1 && (
        <>
          <Abs x={90} y={460} w={900} h={600}>
            <div style={{position: 'absolute', left: 440, top: 120, width: 20, height: 420, background: INK, borderRadius: 10}} />
            <div style={{position: 'absolute', left: 340, top: 520, width: 220, height: 40, background: INK, borderRadius: 10}} />
            <div style={{position: 'absolute', left: 80, top: 110, width: 740, height: 14, background: INK, borderRadius: 7, transform: `rotate(${lerp(8, -14, tip)}deg)`, transformOrigin: '50% 50%'}}>
              <div style={{position: 'absolute', left: -60, top: 14, width: 200, textAlign: 'center', transform: `rotate(${-lerp(8, -14, tip)}deg)`}}><F n="cadenas" size={110} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: RED}}>contrainte</div></div>
              <div style={{position: 'absolute', right: -60, top: 14, width: 200, textAlign: 'center', transform: `rotate(${-lerp(8, -14, tip)}deg)`}}><F n="fusee" size={110} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: GREEN}}>opportunité</div></div>
            </div>
          </Abs>
          <Abs x={60} y={1080} w={960} style={{display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap'}}>
            {[{ic: 'baisse', l: 'accidents en chute', a: 350.7}, {ic: 'hausse', l: 'processus boostés', a: 351.3}, {ic: 'coeur', l: 'l’humain valorisé', a: 352.3}].map((x) => <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: `4px solid ${INK}`, borderRadius: 18, padding: '10px 18px', boxShadow: `5px 5px 0 ${GREEN}`, opacity: pop(t, x.a)}}><F n={x.ic} size={60} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26}}>{x.l}</div></div>)}
          </Abs>
          <Abs x={0} y={1280} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 60, color: GREEN, opacity: pop(t, 353.8)}}>la réponse crève les yeux</Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <Abs x={0} y={520} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 10}}>{'9 PILIERS'.split('').map((c, k) => c === ' ' ? <div key={k} style={{width: 40}} /> : <div key={k} style={{transform: `translateY(${(1 - Math.max(0, Math.min(1, spring(t, 355.7 + k * 0.07, 8, 11)))) * -300}px)`}}><Tile ch={c} size={100} c={k === 0 ? RED : GREEN} /></div>)}</Abs>
          <GlassCard x={140} y={720} w={800} h={420} at={357.5} c={GREEN}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40, gap: 14}}><F n="poing" size={140} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, textAlign: 'center'}}>s’emparer de la philosophie</div><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 46, color: GREEN}}>et transformer durablement</div></div>
          </GlassCard>
          {t > ALLDONE && <Dust n={26} c={GOLD} />}
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
  {at: 2.8, s: 'page', v: 0.3}, ...rep(7.5, 12, 0.2, 'sfx/click', 0.14), {at: 8.7, s: 'stylo', v: 0.35, dur: 1.3},
  {at: 17.6, s: 'stylo', v: 0.3}, {at: 21.5, s: 'sfx/pop', v: 0.25}, shine(21.8), {at: 23.7, s: 'sfx/pop', v: 0.25}, ...rep(23.9, 4, 0.15, 'sfx/thud', 0.15),
  ...rep(28.9, 9, 0.06, 'sfx/pop', 0.12), {at: 31.0, s: 'soft-whoosh', v: 0.35, dur: 1.4}, ...[33.18, 34.78, 36.58, 38.18, 40.62].map((a) => ({at: a, s: 'sfx/thud', v: 0.28})),
  {at: 51.9, s: 'tension', v: 0.15, dur: 6}, {at: 60.0, s: 'stylo', v: 0.3}, {at: 60.9, s: 'tampon', v: 0.6},
  {at: 61.8, s: 'page', v: 0.45}, shine(63.8), ...rep(70.2, 9, 0.12, 'sfx/ding', 0.12), {at: 76.6, s: 'stylo', v: 0.3}, {at: 77.9, s: 'sfx/pop', v: 0.25}, {at: 80.2, s: 'sfx/pop', v: 0.25}, ...rep(80.4, 14, 0.3, 'tick', 0.1), {at: 84.6, s: 'validation', v: 0.3},
  {at: 91.4, s: 'sfx/pop', v: 0.22}, {at: 94.0, s: 'sfx/rise', v: 0.2, dur: 4}, {at: 97.6, s: 'sfx/whoosh', v: 0.3}, {at: 98.1, s: 'deep-hit', v: 0.45}, {at: 98.12, s: 'sfx/thud', v: 0.4},
  {at: 104.2, s: 'sfx/thud', v: 0.3}, {at: 108.1, s: 'soft-whoosh', v: 0.35}, {at: 108.2, s: 'sfx/pop', v: 0.3}, {at: 116.6, s: 'sfx/thud', v: 0.3}, {at: 119.6, s: 'sfx/swish', v: 0.25}, {at: 122.8, s: 'sfx/thud', v: 0.3}, {at: 124.0, s: 'stylo', v: 0.25}, {at: 126.6, s: 'stylo', v: 0.25},
  ...searchCues(131.6, 23, 133.6, 134.1), ...rep(137.4, 20, 0.09, 'sfx/pop', 0.08), {at: 143.6, s: 'stylo', v: 0.3}, {at: 144.8, s: 'notification', v: 0.25}, shine(145.0), ...[148.0, 148.25, 148.5].map((a) => ({at: a, s: 'sfx/ding', v: 0.2})), {at: 150.3, s: 'sfx/pop', v: 0.25},
  {at: 158.6, s: 'sfx/pop', v: 0.22}, {at: 161.5, s: 'sfx/swish', v: 0.3}, {at: 162.5, s: 'bass-hit', v: 0.45}, {at: 162.52, s: 'sfx/pop', v: 0.5}, {at: 165.0, s: 'validation', v: 0.25},
  {at: 166.3, s: 'sfx/pop', v: 0.22}, {at: 171.8, s: 'stylo', v: 0.3}, {at: 172.4, s: 'soft-whoosh', v: 0.35, dur: 2}, {at: 175.7, s: 'sfx/swish', v: 0.35}, {at: 177.2, s: 'sfx/ding', v: 0.3},
  {at: 182.6, s: 'sfx/rise', v: 0.2, dur: 1.5}, {at: 189.1, s: 'tension', v: 0.2, dur: 6}, {at: 195.6, s: 'soft-whoosh', v: 0.4, dur: 1}, {at: 196.4, s: 'validation', v: 0.3}, ...[198.3, 199.3, 200.7].map((a) => ({at: a, s: 'sfx/pop', v: 0.22})), {at: 205.5, s: 'sfx/pop', v: 0.22}, {at: 208.0, s: 'stylo', v: 0.3}, {at: 212.4, s: 'sfx/ding', v: 0.22},
  {at: 218.4, s: 'sfx/whoosh', v: 0.25}, shine(218.7), {at: 225.7, s: 'sfx/whoosh', v: 0.25}, shine(226.0), {at: 230.5, s: 'sfx/swish', v: 0.35}, ...[237.0, 238.2, 238.9].map((a) => ({at: a, s: 'sfx/pop', v: 0.22})), {at: 239.6, s: 'sfx/whoosh', v: 0.25}, shine(239.9), ...rep(243.5, 36, 0.05, 'tick', 0.08), ...flaps(248.7, 6),
  {at: 256.7, s: 'sfx/pop', v: 0.22}, {at: 257.8, s: 'sfx/rise', v: 0.2, dur: 2.4}, {at: 260.3, s: 'alarme', v: 0.06, dur: 0.8},
  {at: 268.6, s: 'sfx/thud', v: 0.35}, {at: 271.7, s: 'sfx/thud', v: 0.3}, {at: 274.2, s: 'page', v: 0.4}, {at: 278.9, s: 'page', v: 0.4}, ...[283.8, 284.6, 287.2].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})), {at: 288.3, s: 'sfx/thud', v: 0.3},
  {at: 297.6, s: 'page', v: 0.4}, {at: 298.8, s: 'sfx/ding', v: 0.25}, {at: 300.7, s: 'sfx/pop', v: 0.2}, {at: 301.9, s: 'sfx/pop', v: 0.2}, {at: 307.0, s: 'sfx/pop', v: 0.22}, shine(307.3), ...rep(312.4, 4, 0.15, 'sfx/click', 0.2), {at: 316.3, s: 'stylo', v: 0.35},
  ...rep(325.7, 9, 0.12, 'sfx/thud', 0.14), {at: 334.6, s: 'riser', v: 0.3, dur: 1.6}, {at: 336.2, s: 'deep-hit', v: 0.5}, {at: 336.22, s: 'validation', v: 0.3}, {at: 338.0, s: 'stylo', v: 0.3}, ...flaps(339.18, 10),
  {at: 341.0, s: 'sfx/pop', v: 0.22}, ...[350.7, 351.3, 352.3].map((a) => ({at: a, s: 'sfx/pop', v: 0.22})), {at: 353.7, s: 'sfx/swish', v: 0.35}, {at: 354.6, s: 'sfx/thud', v: 0.45}, {at: 354.7, s: 'validation', v: 0.3},
  ...rep(355.7, 8, 0.07, 'sfx/thud', 0.15), {at: 357.5, s: 'sfx/pop', v: 0.25}, shine(357.8),
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const NeufPrincipes: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={42.7}><Intro /></Gate>
    <Gate from={45.9} to={86.0}><Defi /></Gate>
    <Gate from={89.2} to={128.2}><Anticiper /></Gate>
    <Gate from={131.4} to={179.0}><Duerp /></Gate>
    <Gate from={182.2} to={250.0}><Adapter /></Gate>
    <Gate from={253.2} to={317.3}><Proteger /></Gate>
    <Gate from={320.5} to={OUTRO_AT}><Culture /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}><Gyro i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={363.5}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-neuf-principes-origine.m4a')} trimAfter={s(363.6)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Kin, Brut, T, TitleBlock, Deep, Card, Check, Win, Count, GLASS, BURG];
