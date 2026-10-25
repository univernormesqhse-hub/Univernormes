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
import {NeoCaptions} from '../components/NeoCaptions';

/**
 * « 9 normes ISO incontournables » revoicée par Isac (ElevenLabs, 2 min 42) — capsule « condensé + effet wahou + ultra
 * premium » présentée en métro : la ligne ISO à 9 stations (une par norme). Mélange des skills capsule-ui-neo-brutal
 * (cartes blanches à bordure noire et ombre dure, badges inclinés, sous-titre 2–4 mots à mot d'accent, commande
 * tapée, éditeur de code qui modifie le résultat) et capsule-recit-illustre (téléphone, panneau indicateur qui pivote,
 * fiche manuscrite). Couverture : photo + « 9 NORMES ISO / INCONTOURNABLES » en lettres-photos animées. Fil rouge :
 * tube pneumatique à six guichets (qualité → environnement & SST → aliments & société → énergie & information →
 * santé & labos → objectif commun) ; gyrophare, loupe, store vénitien et capsule pneumatique ; barre de recherche
 * « certifier ISO 26000 » qui ouvre la réponse (NON).
 */
const IMG = {
  cover: 'metroiso-gen/couverture.jpg',
  c9: 'metroiso-gen/qualite.jpg',
  cInc: 'metroiso-gen/terrain.jpg',
  qualite: 'metroiso-gen/qualite.jpg',
  env: 'metroiso-gen/environnement.jpg',
  sst: 'metroiso-gen/sst.jpg',
  aliments: 'sysqsse-gen/qualite.jpg',
  medical: 'metro-gen/technicien.jpg',
  labo: 'metro-gen/etalonnage.jpg',
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
const OUTRO_AT = 162.6;
export const NORMES_ISAC_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 2.6, n: '1', title: 'La qualité', s: 'ISO 9001', c: BLUE, g: 'qualité', k: 'gyro', lab: 'NORME 1 / 9'},
  {at: 25.4, n: '2', title: 'Environnement & SST', s: 'ISO 14001 · ISO 45001', c: GREEN, g: 'env. & SST', k: 'loupe', lab: 'NORMES 2–3 / 9'},
  {at: 52.6, n: '3', title: 'Aliments & société', s: 'ISO 22000 · ISO 26000', c: ORANGE, g: 'aliments', k: 'store', lab: 'NORMES 4–5 / 9'},
  {at: 87.9, n: '4', title: 'Énergie & information', s: 'ISO 50001 · ISO 27001', c: VIO, g: 'énergie & info', k: 'gyro', lab: 'NORMES 6–7 / 9'},
  {at: 115.3, n: '5', title: 'Santé & laboratoires', s: 'ISO 13485 · ISO/IEC 17025', c: RED, g: 'santé & labos', k: 'tube', lab: 'NORMES 8–9 / 9'},
  {at: 147.4, n: '6', title: 'Un objectif commun', s: 'performance · risques · confiance', c: GOLD, g: 'objectif', k: 'gyro', lab: 'CONCLUSION'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 158.2;
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

/* ═════════════ La ligne ISO (9 stations = 9 normes) ═════════════ */
const STATIONS = [
  {n: 1, l: 'ISO 9001 · qualité', s: '9001', at: 16.78},
  {n: 2, l: 'ISO 14001 · environnement', s: '14001', at: 30.42},
  {n: 3, l: 'ISO 45001 · santé-sécurité', s: '45001', at: 38.48},
  {n: 4, l: 'ISO 22000 · denrées alimentaires', s: '22000', at: 58.66},
  {n: 5, l: 'ISO 26000 · responsabilité sociétale', s: '26000', at: 69.9},
  {n: 6, l: 'ISO 50001 · énergie', s: '50001', at: 92.74},
  {n: 7, l: 'ISO 27001 · sécurité de l’information', s: '27001', at: 100.94},
  {n: 8, l: 'ISO 13485 · dispositifs médicaux', s: '13485', at: 122.18},
  {n: 9, l: 'ISO/IEC 17025 · laboratoires', s: '17025', at: 132.34},
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

/* ═════════════ Kit néo-brutaliste (skill capsule-ui-neo-brutal) ═════════════ */
const NBK = '#111';
const ACC = '#22B573';
const nb = (bg = '#fff', sh = 8): React.CSSProperties => ({background: bg, border: `4px solid ${NBK}`, borderRadius: 18, boxShadow: `${sh}px ${sh}px 0 ${NBK}`, boxSizing: 'border-box'});
const NORMES = [
  {n: '9001', l: 'qualité', ic: 'medaille', c: BLUE},
  {n: '14001', l: 'environnement', ic: 'feuille', c: GREEN},
  {n: '45001', l: 'santé-sécurité', ic: 'casque', c: ORANGE},
  {n: '22000', l: 'aliments', ic: 'assiette', c: GOLD},
  {n: '26000', l: 'sociétal', ic: 'equipe', c: VIO},
  {n: '50001', l: 'énergie', ic: 'eclair', c: TEAL},
  {n: '27001', l: 'information', ic: 'cadenas', c: NAVY},
  {n: '13485', l: 'médical', ic: 'stethoscope', c: RED},
  {n: '17025', l: 'laboratoires', ic: 'microscope', c: '#1BA3C6'},
];
/* Badge incliné qui « se colle » (NOUVEAU, NON, 1/9…) */
const NBadge: React.FC<{at: number; text: string; bg?: string; rot?: number; size?: number}> = ({at, text, bg = ACC, rot = -10, size = 30}) => {
  const t = useT();
  if (t < at) return null;
  const sc = spring(t, at);
  return <div style={{display: 'inline-block', background: bg, color: '#fff', border: `4px solid ${NBK}`, borderRadius: 10, padding: '4px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: size, letterSpacing: 1, transform: `rotate(${rot}deg) scale(${lerp(1.5, 1, Math.min(1, sc))})`, boxShadow: `4px 4px 0 ${NBK}`}}>{text}</div>;
};
/* Tuile cochée (Aa Textes / Graphiques… → ici les bénéfices de chaque norme) */
const NTile: React.FC<{at: number; ic: string; l: string; c?: string; w?: number}> = ({at, ic, l, c = ACC, w = 280}) => {
  const t = useT();
  const on = t > at;
  return <div style={{...nb(on ? '#fff' : '#F1F1EA', 6), width: w, height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, position: 'relative', opacity: on ? 1 : 0.35, transform: `scale(${on ? Math.min(1.05, spring(t, at)) : 0.92})`}}>
    <F n={ic} size={80} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: NBK, textAlign: 'center', padding: '0 10px', lineHeight: 1.1}}>{l}</span>
    {on && <div style={{position: 'absolute', right: -12, top: -12, width: 44, height: 44, borderRadius: 22, background: c, border: `4px solid ${NBK}`, color: '#fff', fontWeight: 900, fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, at + 0.15)})`}}>✓</div>}
  </div>;
};
/* Carte-titre d'une norme : en-tête accent + numéro + badge n/9 */
const NormCard: React.FC<{k: number; at: number; s: string; children?: React.ReactNode; h?: number; narrow?: boolean}> = ({k, at, s, children, h = 330, narrow}) => {
  const t = useT();
  const N = NORMES[k];
  return <div style={{...nb('#fff'), position: 'absolute', left: 0, top: 0, width: 960, height: h, overflow: 'hidden', opacity: pop(t, at), transform: `translateY(${(1 - pop(t, at)) * 40}px)`}}>
    <div style={{height: 96, background: N.c, borderBottom: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', gap: 18, padding: '0 24px'}}>
      <div style={{width: 64, height: 64, borderRadius: 14, background: '#fff', border: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={N.ic} size={48} /></div>
      <div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: '#fff', lineHeight: 1}}>{k === 8 ? 'ISO/IEC ' : 'ISO '}{N.n}</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: '#ffffffDD', letterSpacing: 2}}>{N.l.toUpperCase()}</div></div>
      <div style={{marginLeft: 'auto'}}><NBadge at={at + 0.4} text={`${k + 1}/9`} bg={NBK} rot={8} size={28} /></div>
    </div>
    <div style={{padding: '18px 26px', maxWidth: narrow ? 560 : undefined, fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: NBK, lineHeight: 1.25}}>{s}</div>
    {children}
  </div>;
};
/* Téléphone (skill capsule-recit-illustre) */
const Phone: React.FC<{x: number; y: number; at: number; title: string; children: React.ReactNode; w?: number; h?: number}> = ({x, y, at, title, children, w = 520, h = 820}) => {
  const t = useT();
  return <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 60, background: NBK, padding: 16, boxSizing: 'border-box', boxShadow: `10px 10px 0 ${ACC}`, opacity: pop(t, at), transform: `translateY(${(1 - pop(t, at)) * 60}px)`}}>
    <div style={{width: '100%', height: '100%', borderRadius: 46, background: '#ECE5DD', overflow: 'hidden', position: 'relative'}}>
      <div style={{height: 110, background: '#1F7A5C', display: 'flex', alignItems: 'flex-end', gap: 14, padding: '0 22px 16px'}}><div style={{width: 54, height: 54, borderRadius: 27, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Img src={staticFile(LOGO)} style={{width: 44}} /></div><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: '#fff'}}>{title}</div></div>
      <div style={{padding: 20, display: 'flex', flexDirection: 'column', gap: 14}}>{children}</div>
    </div>
  </div>;
};
const Bubble: React.FC<{at: number; me?: boolean; children: React.ReactNode}> = ({at, me, children}) => {
  const t = useT();
  if (t < at) return null;
  return <div style={{alignSelf: me ? 'flex-end' : 'flex-start', maxWidth: '85%', background: me ? '#DCF8C6' : '#fff', borderRadius: me ? '20px 20px 4px 20px' : '20px 20px 20px 4px', padding: '12px 18px', fontFamily: sansFont, fontWeight: 700, fontSize: 26, color: NBK, boxShadow: '0 2px 0 rgba(0,0,0,0.12)', transform: `scale(${spring(t, at)})`, transformOrigin: me ? '100% 100%' : '0 100%'}}>{children}</div>;
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="superviseur" w={1080} h={800} pos="50% 30%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 22%, ${PAPER}CC 30%, ${PAPER} 35%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={545} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 18}}><div style={{...nb(NBK, 5), color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3, padding: '8px 22px'}}>LA LIGNE ISO · 9 STATIONS</div><div style={{transform: 'rotate(-8deg)'}}><div style={{...nb(ACC, 5), color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 26, padding: '6px 16px'}}>VOIX : ISAC</div></div></Abs>
      <Abs x={0} y={640} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="9 NORMES ISO" src={IMG.c9} size={124} ls={2} /></Abs>
      <Abs x={0} y={800} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="INCONTOURNABLES" src={IMG.cInc} size={86} ls={0} seed={3} /></Abs>
      <Abs x={90} y={950} w={900} style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16}}>{NORMES.map((N) => <div key={N.n} style={{...nb('#fff', 5), height: 96, display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px'}}><div style={{width: 58, height: 58, borderRadius: 12, background: N.c, border: `3px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}><F n={N.ic} size={40} /></div><div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: NBK, lineHeight: 1}}>{N.n}</div><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 16, color: DIM}}>{N.l}</div></div></div>)}</Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ 1 · INTRO + ISO 9001 ═════════════ */
const Qualite: React.FC = () => {
  const t = useT();
  const ph = t < 12.9 ? 0 : 1;
  const film = (t - 9.6) * 160;
  return (
    <Out end={25.4}>
      {ph === 0 && (
        <>
          <HiLine words={t < 9.6 ? ['Connaissez-vous', 'les', 'normes', '?'] : ['9', 'normes', 'incontournables']} mark={t < 9.6 ? [2, 3] : [0, 2]} at={t < 9.6 ? 6.0 : 9.7} y={330} size={58} />
          <Abs x={60} y={440} w={960} h={930}>
            {t < 9.6 ? <Phone x={220} y={0} at={6.0} title="UNIVERSNORMES" h={780}>
              <Bubble at={6.1}>Connaissez-vous les normes ISO ? 🤔</Bubble>
              {[{l: 'qualité', a: 6.5}, {l: 'travailleurs', a: 6.9}, {l: 'environnement', a: 7.3}, {l: 'activités', a: 7.8}].map((x) => <Bubble key={x.l} at={x.a} me>✓ {x.l}</Bubble>)}
            </Phone> : <>
              <div style={{position: 'absolute', left: -60, top: 120, width: 1080, height: 330, background: NBK, overflow: 'hidden', borderTop: `4px solid ${NBK}`, borderBottom: `4px solid ${NBK}`, opacity: pop(t, 9.7)}}>
                {[0, 1].map((r) => <div key={r} style={{position: 'absolute', left: 0, right: 0, top: r ? 300 : 6, height: 24, backgroundImage: 'repeating-linear-gradient(90deg, #fff 0 24px, transparent 24px 52px)', backgroundPositionX: -film, opacity: 0.9}} />)}
                <div style={{position: 'absolute', top: 44, left: 0, display: 'flex', gap: 22, transform: `translateX(${200 - film}px)`}}>{[...NORMES, ...NORMES].map((N, k) => <div key={k} style={{width: 220, height: 240, borderRadius: 12, background: N.c, border: '4px solid #fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6}}><F n={N.ic} size={90} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff'}}>{N.n}</span></div>)}</div>
              </div>
              <div style={{position: 'absolute', left: 0, right: 0, top: 540, display: 'flex', justifyContent: 'center'}}><NBadge at={11.0} text="9 NORMES" rot={-8} size={64} /></div>
            </>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 18.2 ? ['Le', 'management', 'de', 'la', 'qualité'] : ['Clients', '&', 'processus']} mark={t < 18.2 ? [1, 4] : [0, 2]} at={t < 18.2 ? 15.5 : 20.0} y={330} size={58} />
          <Abs x={60} y={440} w={960} h={930}>
            <NormCard k={0} at={13.1} s="Exigences d’un système de management de la qualité" h={420}>
              <div style={{position: 'absolute', left: 26, right: 26, bottom: 22, height: 170, borderRadius: 12, overflow: 'hidden', border: `4px solid ${NBK}`}}><Pic src={IMG.qualite} ic="equipe" w={900} h={170} pos="50% 30%" /></div>
            </NormCard>
            <div style={{position: 'absolute', left: 0, right: 0, top: 470, display: 'flex', justifyContent: 'space-between'}}>
              <NTile at={20.02} ic="poignee" l="satisfaire les clients" c={BLUE} />
              <NTile at={21.54} ic="engrenage" l="maîtriser les processus" c={BLUE} />
              <div style={{position: 'relative'}}><NTile at={23.18} ic="courbe" l="amélioration continue" c={BLUE} />{t > 23.18 && <div style={{position: 'absolute', left: 100, top: 210, width: 80, height: 80, borderRadius: 40, border: `8px solid ${BLUE}`, borderTopColor: 'transparent', transform: `rotate(${t * 240}deg)`}} />}</div>
            </div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 2 · ISO 14001 + ISO 45001 ═════════════ */
const EnvSst: React.FC = () => {
  const t = useT();
  const ph = t < 38.3 ? 0 : 1;
  return (
    <Out end={52.6}>
      {ph === 0 && (
        <>
          <HiLine words={['Maîtriser', 'ses', 'impacts']} mark={[0, 2]} at={30.42} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            <NormCard k={1} at={28.9} s="Maîtriser les impacts environnementaux" h={400}>
              <div style={{position: 'absolute', left: 26, top: 170, width: 420, height: 200, borderRadius: 12, overflow: 'hidden', border: `4px solid ${NBK}`}}><Pic src={IMG.env} ic="feuille" w={420} h={200} pos="50% 30%" /></div>
              <svg style={{position: 'absolute', left: 500, top: 160}} width={420} height={220}><path d="M 30 200 A 180 180 0 0 1 390 200" fill="none" stroke="#E3E8EF" strokeWidth={34} /><path d="M 30 200 A 180 180 0 0 1 120 45" fill="none" stroke={GREEN} strokeWidth={34} /><path d="M 300 45 A 180 180 0 0 1 390 200" fill="none" stroke={RED} strokeWidth={34} /><line x1={210} y1={200} x2={210 + Math.cos(Math.PI * lerp(0.15, 0.85, prog(t, 30.4, 32.0, easeInOut))) * 150} y2={200 - Math.sin(Math.PI * lerp(0.15, 0.85, prog(t, 30.4, 32.0, easeInOut))) * 150} stroke={NBK} strokeWidth={10} strokeLinecap="round" /><text x={210} y={130} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={22} fill={NBK}>impacts</text></svg>
            </NormCard>
            <div style={{position: 'absolute', left: 0, right: 0, top: 450, display: 'flex', justifyContent: 'space-between'}}>
              <div style={{position: 'relative'}}><NTile at={32.14} ic="vent" l="prévenir les pollutions" c={GREEN} /></div>
              <NTile at={33.62} ic="recyclage" l="mieux gérer les déchets" c={GREEN} />
              <NTile at={35.22} ic="hausse" l="performance environnementale" c={GREEN} />
            </div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 45.1 ? ['Santé', 'et', 'sécurité', 'au', 'travail'] : ['Évaluer', 'les', 'risques']} mark={t < 45.1 ? [0, 2] : [0, 2]} at={t < 45.1 ? 42.18 : 47.46} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={930}>
            <NormCard k={2} at={38.5} s="Structurer le management de la santé-sécurité au travail" h={300} narrow>
              <div style={{position: 'absolute', right: 26, top: 110, width: 330, height: 170, borderRadius: 12, overflow: 'hidden', border: `4px solid ${NBK}`}}><Pic src={IMG.sst} ic="casque" w={330} h={170} pos="50% 30%" /></div>
            </NormCard>
            <div style={{...nb('#fff'), position: 'absolute', left: 0, top: 340, width: 560, height: 560, padding: 24, opacity: pop(t, 45.2)}}>
              <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: NBK, marginBottom: 12}}>MATRICE DES RISQUES</div>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10}}>{Array.from({length: 9}, (_, k) => { const r = 2 - Math.floor(k / 3), c = k % 3; const lvl = r + c; return <div key={k} style={{height: 140, borderRadius: 10, border: `3px solid ${NBK}`, background: t > 47.46 + k * 0.12 ? [GREEN, GREEN, GOLD, ORANGE, RED][lvl] : '#F1F1EA', transform: `scale(${t > 47.46 + k * 0.12 ? spring(t, 47.46 + k * 0.12) : 0.9})`}} />; })}</div>
              {t > 46.0 && t < 47.6 && <div style={{position: 'absolute', left: 200, top: 200, transform: `scale(${spring(t, 46.0)})`}}><F n="danger" size={160} /></div>}
            </div>
            <div style={{position: 'absolute', left: 600, top: 340, width: 360, display: 'flex', flexDirection: 'column', gap: 20}}>
              {[{l: 'accidents du travail', ic: 'pansement', a: 49.5}, {l: 'maladies professionnelles', ic: 'stethoscope', a: 50.86}].map((x) => <div key={x.l} style={{...nb('#fff', 6), height: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: pop(t, x.a)}}><div style={{display: 'flex', alignItems: 'center', gap: 10}}><F n={x.ic} size={80} /><span style={{fontSize: 70, fontWeight: 900, color: GREEN, transform: `translateY(${Math.sin(t * 6) * 6}px)`}}>↓</span></div><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: NBK, textAlign: 'center'}}>prévenir les {x.l}</span></div>)}
            </div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 3 · ISO 22000 + ISO 26000 (recherche) ═════════════ */
const AlimSoc: React.FC = () => {
  const t = useT();
  const ph = t < 69.7 ? 0 : t < 82.2 ? 1 : 2;
  const belt = (t - 61.7) * 140;
  const tilt = (prog(t, 77.62, 78.4) - prog(t, 78.4, 79.2) * 0.5) * 8 * Math.sin(t * 3);
  const sign = prog(t, 85.0, 86.0, easeInOut);
  return (
    <Out end={87.9}>
      {ph === 0 && (
        <>
          <HiLine words={t < 61.6 ? ['La', 'sécurité', 'des', 'denrées'] : ['Toute', 'la', 'chaîne', 'alimentaire']} mark={t < 61.6 ? [1, 3] : [2, 3]} at={t < 61.6 ? 57.14 : 61.74} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={930}>
            <NormCard k={3} at={56.1} s="Management de la sécurité des denrées alimentaires" h={300} narrow>
              <div style={{position: 'absolute', right: 26, top: 110, width: 330, height: 170, borderRadius: 12, overflow: 'hidden', border: `4px solid ${NBK}`}}><Pic src={IMG.aliments} ic="assiette" w={330} h={170} pos="50% 30%" /></div>
            </NormCard>
            <div style={{position: 'absolute', left: 0, top: 380, width: 960, height: 200, opacity: pop(t, 61.74)}}>
              <div style={{position: 'absolute', left: 0, right: 0, top: 150, height: 40, borderRadius: 20, background: NBK, backgroundImage: 'repeating-linear-gradient(90deg, #333 0 30px, #111 30px 60px)', backgroundPositionX: belt}} />
              {[{ic: 'herbe', l: 'ferme'}, {ic: 'usine', l: 'usine'}, {ic: 'camion', l: 'transport'}, {ic: 'assiette', l: 'assiette'}].map((x, k) => <div key={x.l} style={{position: 'absolute', left: 30 + k * 240, top: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${t > 61.9 + k * 0.25 ? spring(t, 61.9 + k * 0.25) : 0})`}}><F n={x.ic} size={110} /><span style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: NBK}}>{x.l}</span></div>)}
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 640, display: 'flex', justifyContent: 'center', gap: 30}}>
              {[{l: 'biologiques', ic: 'microbe', a: 64.26}, {l: 'chimiques', ic: 'eprouvette', a: 65.62}, {l: 'physiques', ic: 'boulon', a: 66.1}].map((x) => { const b = prog(t, x.a + 0.3, x.a + 0.9, easeOut); return <div key={x.l} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `translate(${b * 0}px, ${-Math.sin(b * Math.PI) * 60}px) scale(${t > x.a ? spring(t, x.a) : 0})`}}><div style={{position: 'relative'}}><F n={x.ic} size={100} />{t > 66.98 && <div style={{position: 'absolute', inset: -6, border: `6px solid ${RED}`, borderRadius: '50%'}}><div style={{position: 'absolute', left: '50%', top: -6, bottom: -6, width: 6, background: RED, transform: 'rotate(45deg)'}} /></div>}</div><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: NBK}}>{x.l}</span></div>; })}
            </div>
            {t > 66.98 && <div style={{position: 'absolute', left: 0, right: 0, top: 830, display: 'flex', justifyContent: 'center'}}><NBadge at={66.98} text="SÉCURITÉ DES ALIMENTS ✓" rot={-4} size={32} /></div>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['La', 'responsabilité', 'sociétale']} mark={[1, 2]} at={72.9} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            <NormCard k={4} at={69.9} s="Lignes directrices sur la responsabilité sociétale" h={250} />
            <div style={{position: 'absolute', left: 130, top: 330, width: 700, height: 560, opacity: pop(t, 76.4)}}>
              <div style={{position: 'absolute', left: 330, top: 120, width: 40, height: 400, background: NBK, borderRadius: 8}} />
              <div style={{position: 'absolute', left: 200, top: 500, width: 300, height: 40, background: NBK, borderRadius: 8}} />
              <div style={{position: 'absolute', left: 30, top: 110, width: 640, height: 22, background: NBK, borderRadius: 11, transform: `rotate(${tilt}deg)`}}>
                {[{l: 'sociales', ic: 'equipe', a: 77.62, x: -40}, {l: 'environnementales', ic: 'feuille', a: 78.22, x: 230}, {l: 'éthiques', ic: 'balance', a: 79.0, x: 500}].map((p) => <div key={p.l} style={{position: 'absolute', left: p.x, top: 22, width: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `rotate(${-tilt}deg)`}}><div style={{width: 4, height: 60, background: NBK}} /><div style={{...nb('#fff', 5), width: 180, height: 170, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, transform: `scale(${t > p.a ? spring(t, p.a) : 0.6})`, opacity: t > p.a ? 1 : 0.3}}><F n={p.ic} size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: p.l.length > 10 ? 18 : 24, color: VIO}}>{p.l}</span></div></div>)}
              </div>
            </div>
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Certifiable', '?']} mark={[0]} at={82.34} y={330} size={70} />
          <SearchOpen x={60} y={440} w={960} h={930} at={82.4} query="certifier ISO 26000" results={['ISO 9001 : certifiable', 'ISO 26000 : lignes directrices', 'ISO 14001 : certifiable']} found={1} foundAt={84.2} clickAt={84.6} c={VIO}>
            <div style={{position: 'absolute', inset: 0, padding: 30}}>
              <div style={{...nb('#FFFDF6'), position: 'absolute', left: 60, top: 30, width: 520, height: 360, padding: 26, transform: 'rotate(-3deg)', filter: t > 86.06 ? 'grayscale(1)' : 'none'}}>
                <div style={{fontFamily: 'Georgia, serif', fontSize: 40, color: NBK, textAlign: 'center'}}>CERTIFICAT</div>
                <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM, textAlign: 'center', marginTop: 10}}>ISO 26000</div>
                {[0, 1, 2].map((j) => <div key={j} style={{height: 14, background: '#E3E8EF', borderRadius: 5, margin: '24px 30px 0'}} />)}
                <div style={{position: 'absolute', right: 40, bottom: 30, width: 90, height: 90, borderRadius: 45, background: GOLD, border: `4px solid ${NBK}`}} />
              </div>
              {t > 86.06 && <div style={{position: 'absolute', left: 170, top: 130}}><NBadge at={86.06} text="NON" bg={RED} rot={-14} size={110} /></div>}
              <div style={{position: 'absolute', left: 560, top: 300, width: 320, height: 500}}>
                <div style={{position: 'absolute', left: 150, top: 40, width: 20, height: 460, background: '#8A5A2B', border: `3px solid ${NBK}`}} />
                <div style={{position: 'absolute', left: 30, top: 60, width: 280, height: 80, background: '#C9C2B2', border: `4px solid ${NBK}`, clipPath: 'polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)', display: 'flex', alignItems: 'center', paddingLeft: 16, fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: '#666', transformOrigin: '43% 50%', transform: `rotate(${sign * -18}deg)`}}>certification</div>
                <div style={{position: 'absolute', left: 10, top: 180, width: 300, height: 90, background: sign > 0.5 ? ACC : '#C9C2B2', border: `4px solid ${NBK}`, clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 15% 100%, 0 50%)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 16, fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: sign > 0.5 ? '#fff' : '#666', transformOrigin: '53% 50%', transform: `rotate(${(1 - sign) * 20}deg)`, boxShadow: sign > 0.5 ? `0 0 30px ${ACC}` : 'none'}}>lignes directrices</div>
              </div>
            </div>
          </SearchOpen>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 4 · ISO 50001 + ISO 27001 ═════════════ */
const EnerInfo: React.FC = () => {
  const t = useT();
  const ph = t < 100.8 ? 0 : 1;
  const tri = prog(t, 107.6, 108.8, (x) => x);
  return (
    <Out end={115.3}>
      {ph === 0 && (
        <>
          <HiLine words={t < 96.4 ? ['Réduire', 'la', 'consommation'] : ['Maîtriser', 'les', 'coûts']} mark={t < 96.4 ? [0, 2] : [0, 2]} at={t < 96.4 ? 94.5 : 98.78} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            <NormCard k={5} at={91.4} s="Améliorer la performance énergétique" h={250} />
            <div style={{...nb(NIGHT), position: 'absolute', left: 0, top: 290, width: 960, height: 330, overflow: 'hidden', opacity: pop(t, 92.7)}}>
              <svg style={{position: 'absolute', left: 260, top: 20}} width={440} height={280}><path d="M 40 250 A 180 180 0 0 1 400 250" fill="none" stroke="#2A3550" strokeWidth={40} /><path d="M 40 250 A 180 180 0 0 1 220 70" fill="none" stroke={GREEN} strokeWidth={40} /><path d="M 220 70 A 180 180 0 0 1 400 250" fill="none" stroke={RED} strokeWidth={40} />{(() => { const a = Math.PI * lerp(0.12, 0.8, prog(t, 94.5, 96.2, easeInOut)); return <line x1={220} y1={250} x2={220 + Math.cos(a) * 170} y2={250 - Math.sin(a) * 170} stroke="#fff" strokeWidth={10} strokeLinecap="round" />; })()}<circle cx={220} cy={250} r={18} fill="#fff" /></svg>
              <div style={{position: 'absolute', left: 40, top: 110, transform: `scale(${1 + 0.1 * Math.sin(t * 8)})`}}><F n="eclair" size={120} /></div>
              <div style={{position: 'absolute', right: 40, top: 120, fontFamily: MONO, fontWeight: 700, fontSize: 30, color: GREEN}}>kWh ↓</div>
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 660, display: 'flex', justifyContent: 'space-between'}}>
              <NTile at={92.74} ic="hausse" l="performance énergétique" c={TEAL} w={220} />
              <NTile at={94.5} ic="baisse" l="consommation réduite" c={TEAL} w={220} />
              <NTile at={96.46} ic="engrenage" l="usages optimisés" c={TEAL} w={220} />
              <NTile at={98.78} ic="argent" l="coûts maîtrisés" c={TEAL} w={220} />
            </div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Protéger', 'l’information']} mark={[0, 1]} at={107.6} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            <NormCard k={6} at={100.95} s="Management de la sécurité de l’information" h={250} />
            <div style={{position: 'absolute', left: 80, top: 290, width: 800, height: 620}}>
              <svg style={{position: 'absolute', left: 0, top: 0}} width={800} height={620}><path d="M 400 80 L 720 540 L 80 540 Z" fill={NAVY} fillOpacity={0.08 * tri} stroke={NAVY} strokeWidth={10} strokeLinejoin="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - tri}} /></svg>
              {[{l: 'confidentialité', ic: 'cadenas', a: 108.9, x: 400, y: 80}, {l: 'intégrité', ic: 'bouclier', a: 110.82, x: 80, y: 540}, {l: 'disponibilité', ic: 'ordinateur', a: 111.7, x: 720, y: 540}].map((v) => <div key={v.l} style={{position: 'absolute', left: v.x - 110, top: v.y - 90, width: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${t > v.a ? spring(t, v.a) : 0})`}}><div style={{...nb('#fff', 5), width: 130, height: 130, borderRadius: 65, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={v.ic} size={80} /></div><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: NAVY, background: '#fff', padding: '0 8px', borderRadius: 6, marginTop: 6}}>{v.l}</span></div>)}
              {t > 112.8 && Array.from({length: 5}, (_, k) => { const p = ((t - 112.8) * 0.9 + k / 5) % 1; const a = (k / 5) * Math.PI * 2; const d = 360 - Math.abs(Math.sin(p * Math.PI)) * 160; return <div key={k} style={{position: 'absolute', left: 400 + Math.cos(a) * d - 20, top: 380 + Math.sin(a) * d * 0.6 - 20, fontSize: 40, color: RED}}>⚡</div>; })}
              {t > 112.8 && <div style={{position: 'absolute', left: 340, top: 310, transform: `scale(${1 + 0.08 * Math.sin(t * 7)})`}}><F n="bouclier" size={120} /></div>}
            </div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 5 · ISO 13485 + ISO/IEC 17025 ═════════════ */
const SanteLabo: React.FC = () => {
  const t = useT();
  const ph = t < 132.2 ? 0 : 1;
  const belt = (t - 122) * 120;
  return (
    <Out end={147.4}>
      {ph === 0 && (
        <>
          <HiLine words={t < 128.6 ? ['Les', 'dispositifs', 'médicaux'] : ['Exigences', 'réglementaires']} mark={t < 128.6 ? [1, 2] : [0, 1]} at={t < 128.6 ? 122.18 : 128.74} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            <NormCard k={7} at={118.8} s="Management de la qualité des dispositifs médicaux" h={300} narrow>
              <div style={{position: 'absolute', right: 26, top: 110, width: 330, height: 170, borderRadius: 12, overflow: 'hidden', border: `4px solid ${NBK}`}}><Pic src={IMG.medical} ic="stethoscope" w={330} h={170} pos="50% 30%" /></div>
            </NormCard>
            <div style={{...nb('#fff'), position: 'absolute', left: 0, top: 350, width: 960, height: 300, overflow: 'hidden', opacity: pop(t, 122.2)}}>
              <div style={{position: 'absolute', left: 0, right: 0, bottom: 40, height: 34, background: NBK, backgroundImage: 'repeating-linear-gradient(90deg, #333 0 30px, #111 30px 60px)', backgroundPositionX: belt}} />
              {['stethoscope', 'seringue', 'pilule', 'pansement', 'stethoscope', 'seringue'].map((ic, k) => { const x = ((k * 200 + belt) % 1200) - 120; const checked = x > 500; return <div key={k} style={{position: 'absolute', left: x, top: 110}}><F n={ic} size={100} />{checked && <div style={{position: 'absolute', right: -10, top: -10, width: 40, height: 40, borderRadius: 20, background: ACC, border: `3px solid ${NBK}`, color: '#fff', fontWeight: 900, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>✓</div>}</div>; })}
              <div style={{position: 'absolute', left: 480, top: 0, width: 8, height: 230, background: `repeating-linear-gradient(180deg, ${RED} 0 14px, transparent 14px 24px)`}} />
              <div style={{position: 'absolute', left: 500, top: 14, fontFamily: MONO, fontWeight: 700, fontSize: 20, color: RED}}>CONTRÔLE QUALITÉ</div>
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 700, display: 'flex', justifyContent: 'center', gap: 24}}>
              <NTile at={127.14} ic="engrenage" l="maîtriser les processus" c={RED} />
              <NTile at={128.74} ic="juge" l="exigences réglementaires" c={RED} />
            </div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 141.8 ? ['Compétence', '&', 'impartialité'] : ['Des', 'résultats', 'fiables']} mark={t < 141.8 ? [0, 2] : [1, 2]} at={t < 141.8 ? 136.54 : 143.18} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={930}>
            <NormCard k={8} at={132.35} s="Laboratoires d’essais et d’étalonnage" h={300} narrow>
              <div style={{position: 'absolute', right: 26, top: 110, width: 330, height: 170, borderRadius: 12, overflow: 'hidden', border: `4px solid ${NBK}`}}><Pic src={IMG.labo} ic="microscope" w={330} h={170} pos="50% 30%" /></div>
            </NormCard>
            <div style={{position: 'absolute', left: 0, top: 350, width: 960, display: 'flex', justifyContent: 'space-between'}}>
              <NTile at={136.54} ic="medaille" l="compétence" c="#1BA3C6" w={220} />
              <NTile at={137.22} ic="balance" l="impartialité" c="#1BA3C6" w={220} />
              <NTile at={138.6} ic="engrenage" l="fonctionnement cohérent" c="#1BA3C6" w={220} />
              <NTile at={139.06} ic="microscope" l="essais & étalonnage" c="#1BA3C6" w={220} />
            </div>
            <div style={{...nb('#fff'), position: 'absolute', left: 0, top: 600, width: 960, height: 300, opacity: pop(t, 141.9), display: 'flex', alignItems: 'center', gap: 30, padding: '0 40px'}}>
              <div style={{position: 'relative', width: 240, height: 240}}>{[1, 0.72, 0.44, 0.18].map((r, k) => <div key={k} style={{position: 'absolute', left: 120 - 120 * r, top: 120 - 120 * r, width: 240 * r, height: 240 * r, borderRadius: '50%', background: k % 2 ? '#fff' : RED, border: `3px solid ${NBK}`}} />)}{[[118, 112], [126, 122], [114, 126], [122, 116]].map(([x, y], k) => t > 143.2 + k * 0.25 && <div key={k} style={{position: 'absolute', left: x - 8, top: y - 8, width: 16, height: 16, borderRadius: 8, background: NBK, border: '3px solid #fff', transform: `scale(${spring(t, 143.2 + k * 0.25)})`}} />)}</div>
              <div style={{display: 'flex', flexDirection: 'column', gap: 14}}><NBadge at={143.18} text="FIABILITÉ DES RÉSULTATS" bg="#1BA3C6" rot={-3} size={30} /><NBadge at={144.9} text="CONFIANCE DANS LES MESURES" bg={NBK} rot={2} size={26} /></div>
            </div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 6 · UN OBJECTIF COMMUN ═════════════ */
const CODE = [
  {k: 'performance', v: '"améliorée"', a: 153.74},
  {k: 'risques', v: '"maîtrisés"', a: 155.46},
  {k: 'confiance', v: '"renforcée"', a: 156.82},
];
const Objectif: React.FC = () => {
  const t = useT();
  const ph = t < 159.5 ? 0 : 1;
  return (
    <Out end={OUTRO_AT}>
      {ph === 0 && (
        <>
          <HiLine words={['Un', 'objectif', 'commun']} mark={[1, 2]} at={152.1} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{...nb(NIGHT), position: 'absolute', left: 0, top: 0, width: 960, height: 420, overflow: 'hidden', opacity: pop(t, 151.0)}}>
              <div style={{height: 54, background: '#F6D6CB', borderBottom: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', gap: 10, padding: '0 18px'}}>{[RED, GOLD, GREEN].map((c) => <div key={c} style={{width: 16, height: 16, borderRadius: 8, background: c, border: `2px solid ${NBK}`}} />)}<div style={{marginLeft: 16, background: '#fff', border: `3px solid ${NBK}`, borderBottom: 'none', borderRadius: '8px 8px 0 0', padding: '4px 14px', fontFamily: MONO, fontWeight: 700, fontSize: 20, color: NBK}}>objectif.ts</div></div>
              <div style={{padding: '24px 30px', fontFamily: MONO, fontSize: 32, lineHeight: 1.7, color: '#E6EDF6'}}>
                <div style={{opacity: pop(t, 151.4)}}><span style={{color: '#C792EA'}}>const</span> <span style={{color: '#82AAFF'}}>neufNormes</span> = {'{'}</div>
                {CODE.map((c) => { const n = Math.floor(prog(t, c.a, c.a + 0.9, (x) => x) * (c.k.length + c.v.length + 3)); const s = `${c.k}: ${c.v},`.slice(0, n); return <div key={c.k} style={{paddingLeft: 40, minHeight: 54, position: 'relative'}}>{t > c.a && <span style={{position: 'absolute', left: 6, top: 18, width: 14, height: 14, borderRadius: 7, background: ACC}} />}<span style={{color: '#F78C6C'}}>{s.split(':')[0]}</span>{s.includes(':') && <span>:<span style={{color: '#C3E88D'}}>{s.split(':').slice(1).join(':')}</span></span>}</div>; })}
                <div style={{opacity: pop(t, 157.6)}}>{'};'}</div>
              </div>
            </div>
            <svg style={{position: 'absolute', left: 440, top: 420}} width={80} height={60}><path d="M 40 0 L 40 44 M 22 28 L 40 50 L 58 28" fill="none" stroke={NBK} strokeWidth={8} opacity={pop(t, 153.6)} /></svg>
            <div style={{position: 'absolute', left: 0, right: 0, top: 490, display: 'flex', justifyContent: 'space-between'}}>
              <NTile at={153.9} ic="hausse" l="améliorer la performance" c={GOLD} />
              <NTile at={155.6} ic="bouclier" l="maîtriser les risques" c={GOLD} />
              <NTile at={157.0} ic="poignee" l="renforcer la confiance" c={GOLD} />
            </div>
            {t > 158.2 && <div style={{position: 'absolute', left: 0, right: 0, top: 770, display: 'flex', justifyContent: 'center'}}><NBadge at={158.2} text="DES PARTIES INTÉRESSÉES" bg={NBK} rot={-3} size={30} /></div>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Lesquelles', 'connaissez-vous', '?']} mark={[1]} at={160.9} y={330} size={60} />
          <Abs x={60} y={440} w={960} h={930}>
            <Phone x={220} y={0} at={159.6} title="Ligne ISO · 9 stations" h={800}>
              <Bubble at={159.8}>Parmi ces normes, lesquelles connaissez-vous déjà ?</Bubble>
              {['9001 ✓', '14001 ✓', '45001 ✓'].map((x, k) => <Bubble key={x} at={161.0 + k * 0.35} me>ISO {x}</Bubble>)}
              {t > 162.0 && <div style={{alignSelf: 'flex-end', display: 'flex', gap: 6, padding: '10px 16px', background: '#DCF8C6', borderRadius: 18}}>{[0, 1, 2].map((d) => <div key={d} style={{width: 12, height: 12, borderRadius: 6, background: '#5B6577', opacity: 0.3 + 0.7 * Math.abs(Math.sin(t * 6 + d))}} />)}</div>}
            </Phone>
          </Abs>
          {t > 160.9 && <Dust n={24} c={ACC} />}
        </>
      )}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const ticks = (L: number[], s0 = 'validation', v = 0.18): Sfx[] => L.map((a) => ({at: a + 0.15, s: s0, v}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 0.8, s: 'validation', v: 0.18})), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.flatMap((r) => [{at: r.at - 1.2, s: 'soft-whoosh', v: 0.2, dur: 1.2}, {at: r.at, s: 'bass-hit', v: 0.33}, {at: r.at + 0.05, s: 'sfx/bell', v: 0.26}]),
  {at: 6.0, s: 'notification', v: 0.3}, ...[6.5, 6.9, 7.3, 7.8].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})), {at: 9.7, s: 'soft-whoosh', v: 0.35, dur: 1.4}, ...rep(9.9, 8, 0.15, 'sfx/click', 0.08), {at: 11.0, s: 'tampon', v: 0.5},
  {at: 13.1, s: 'sfx/swish', v: 0.3}, {at: 13.5, s: 'tampon', v: 0.3}, ...ticks([20.02, 21.54, 23.18]),
  {at: 28.9, s: 'sfx/swish', v: 0.3}, {at: 30.4, s: 'tension', v: 0.2, dur: 1.6}, ...ticks([32.14, 33.62, 35.22]),
  {at: 38.5, s: 'sfx/swish', v: 0.3}, {at: 46.0, s: 'deep-hit', v: 0.3}, ...rep(47.46, 9, 0.12, 'sfx/pop', 0.12), ...[49.5, 50.86].map((a) => ({at: a, s: 'sfx/swish', v: 0.25})),
  {at: 56.1, s: 'sfx/swish', v: 0.3}, ...rep(61.9, 4, 0.25, 'sfx/pop', 0.18), ...[64.26, 65.62, 66.1].map((a) => ({at: a, s: 'sfx/thud', v: 0.25})), {at: 66.98, s: 'tampon', v: 0.45},
  {at: 69.9, s: 'sfx/swish', v: 0.3}, ...[77.62, 78.22, 79.0].map((a) => ({at: a, s: 'sfx/ding', v: 0.22})),
  ...searchCues(82.4, 19, 84.2, 84.6), {at: 85.0, s: 'sfx/swish', v: 0.3}, {at: 86.06, s: 'tampon', v: 0.6}, {at: 86.1, s: 'deep-hit', v: 0.3},
  {at: 91.4, s: 'sfx/swish', v: 0.3}, {at: 94.5, s: 'sfx/rise', v: 0.25, dur: 1.6}, ...ticks([92.74, 94.5, 96.46, 98.78]),
  {at: 100.95, s: 'sfx/swish', v: 0.3}, {at: 107.6, s: 'stylo', v: 0.25, dur: 1.2}, ...[108.9, 110.82, 111.7].map((a) => ({at: a, s: 'bass-hit', v: 0.25})), {at: 112.8, s: 'alarme', v: 0.08, dur: 1.5},
  {at: 118.8, s: 'sfx/swish', v: 0.3}, {at: 122.2, s: 'soft-whoosh', v: 0.25, dur: 1}, ...ticks([127.14, 128.74]),
  {at: 132.35, s: 'sfx/swish', v: 0.3}, ...ticks([136.54, 137.22, 138.6, 139.06]), {at: 141.9, s: 'sfx/pop', v: 0.2}, ...rep(143.2, 4, 0.25, 'sfx/thud', 0.2), {at: 144.9, s: 'tampon', v: 0.3},
  {at: 151.0, s: 'sfx/pop', v: 0.25}, ...CODE.map((c) => ({at: c.a, s: 'stylo', v: 0.25, dur: 0.9})), ...ticks([153.9, 155.6, 157.0], 'validation', 0.25), {at: 158.2, s: 'tampon', v: 0.35},
  {at: 159.6, s: 'notification', v: 0.35}, ...[161.0, 161.35, 161.7].map((a) => ({at: a, s: 'notification', v: 0.18})),
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<TK, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
export const NormesIsac: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={5.9} to={25.5}><Qualite /></Gate>
    <Gate from={28.7} to={52.7}><EnvSst /></Gate>
    <Gate from={55.9} to={88.0}><AlimSoc /></Gate>
    <Gate from={91.2} to={115.4}><EnerInfo /></Gate>
    <Gate from={118.6} to={147.5}><SanteLabo /></Gate>
    <Gate from={150.8} to={OUTRO_AT}><Objectif /></Gate>
    {SECT.map((x, i) => { const C = TRANS[x.k]; return <Gate key={x.n} from={x.at} to={x.at + 3.7}><C i={i} /></Gate>; })}
    <Gate from={10} to={136}><StationBanner /></Gate>
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={162.5}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-normes-iso-isac.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Stamp, Strike, Count, handFont];
