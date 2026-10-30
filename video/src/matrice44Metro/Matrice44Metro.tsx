import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, Img, continueRender, delayRender, random, staticFile} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {Matrix3DScene, riskColor} from './Matrix3D';
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
 * « La matrice des risques 4 × 4 » (voix d'origine, 1 min 14) — capsule « condensé + effet wahou + ultra premium »
 * présentée en métro (7 stations). Tube de verre à six guichets : danger → matrice → probabilité → gravité → cas
 * pratique → à retenir ; la capsule file d'un guichet à l'autre. Gyrophare, loupe, capsule pneumatique, store
 * vénitien ; barre de recherche « matrice des risques » qui ouvre la matrice. Techniques : matrice 3D WebGL
 * (16 colonnes de hauteur P × G qui surgissent en vague, orbite caméra puis vue de dessus, « hiérarchiser » =
 * les colonnes s'illuminent par ordre de valeur — fiche fromage-suisse-3d / film « La ligne invisible »), axes qui
 * se tracent, dé 3D qui roule, échelles 1 → 4 à segments, matrice 2D qui se construit en vague avec ligne et
 * colonne surlignées et case croisée, afficheur à palettes « 3 × 4 = 12 », gyrophare d'alarme sur la case,
 * escalier identifier / évaluer / prévenir, téléphone avec commentaires et champ entouré. Kits capsule-ui-neo-brutal
 * et capsule-recit-illustre ; images de la session réutilisées.
 */
const IMG = {
  cover: 'evalrisques-gen/couverture.jpg',
  c1: 'evalrisques-gen/zone-rouge.jpg',
  c2: 'evalrisques-gen/proba-gravite.jpg',
  danger: 'evalrisques-gen/danger.jpg',
  chute: 'causerie/chute-echelle.jpg',
  scaff: 'tirant/echafaudage.jpg',
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
const OUTRO_AT = 74.4;
export const MATRICE44_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '1', title: 'Un danger ?', s: 'le savoir en quelques secondes', c: ORANGE, g: 'danger', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 8.94, n: '2', title: 'La matrice 4 × 4', s: 'évaluer et hiérarchiser', c: NAVY, g: 'matrice', k: 'gyro', lab: 'GUICHET 2 / 6'},
  {at: 21.38, n: '3', title: 'La probabilité', s: 'critère n° 1', c: BLUE, g: 'probabilité', k: 'loupe', lab: 'GUICHET 3 / 6'},
  {at: 28.7, n: '4', title: 'La gravité', s: 'critère n° 2', c: RED, g: 'gravité', k: 'tube', lab: 'GUICHET 4 / 6'},
  {at: 40.1, n: '5', title: 'Cas pratique', s: 'travail en hauteur', c: GOLD, g: 'cas pratique', k: 'store', lab: 'GUICHET 5 / 6'},
  {at: 58.42, n: '6', title: 'Retenez ceci', s: 'identifier · évaluer · prévenir', c: GREEN, g: 'à retenir', k: 'gyro', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 73.2;
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
  const S0 = SECTX[i];
  return (
    <>
      <Abs x={60} y={y} w={960} style={{textAlign: 'center'}}><Kin text={S0.title} at={at} size={S0.title.length > 20 ? 66 : 80} color={dark ? '#fff' : INK} /></Abs>
      <Abs x={0} y={y + (S0.title.length > 20 ? 190 : 120)} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-block', background: S0.c, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 2, padding: '6px 16px', borderRadius: 6, opacity: pop(t, at + 0.5)}}>{S0.s.toUpperCase()}</div></Abs>
    </>
  );
};
const Pneumatique: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const S0 = SECTX[i];
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
  const S0 = SECTX[i];
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
  const S0 = SECTX[i];
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
  const S0 = SECTX[i];
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

/* ═════════════ La ligne de métro (6 stations = 6 maillons) ═════════════ */
const STATIONS = [
  {n: 1, l: 'Un danger ?', s: 'danger', at: 4.5},
  {n: 2, l: 'La matrice 4 × 4', s: 'matrice', at: 12.6},
  {n: 3, l: 'Probabilité', s: 'proba.', at: 25.0},
  {n: 4, l: 'Gravité', s: 'gravité', at: 32.4},
  {n: 5, l: 'Croisement P × G', s: 'P × G', at: 36.6},
  {n: 6, l: 'Cas pratique', s: 'cas', at: 44.0},
  {n: 7, l: 'Prévention', s: 'prévention', at: 62.2},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE RISQUES · STATION {r.n} / 7</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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
const NBadge: React.FC<{at: number; text: string; bg?: string; rot?: number; size?: number}> = ({at, text, bg = ACC, rot = -10, size = 30}) => {
  const t = useT();
  if (t < at) return null;
  const sc = spring(t, at);
  return <div style={{display: 'inline-block', background: bg, color: '#fff', border: `4px solid ${NBK}`, borderRadius: 10, padding: '4px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: size, letterSpacing: 1, transform: `rotate(${rot}deg) scale(${lerp(1.5, 1, Math.min(1, sc))})`, boxShadow: `4px 4px 0 ${NBK}`, whiteSpace: 'nowrap'}}>{text}</div>;
};
const Chip: React.FC<{at: number; ic: string; l: string; c: string}> = ({at, ic, l, c}) => {
  const t = useT();
  const on = t > at;
  return <div style={{...nb(on ? '#fff' : '#F1F1EA', 5), display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px 8px 8px', opacity: on ? 1 : 0.35, transform: `scale(${on ? Math.min(1.04, spring(t, at)) : 0.94})`}}><div style={{width: 54, height: 54, borderRadius: 12, background: on ? c : '#DDD', border: `3px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={ic} size={38} /></div><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: NBK, whiteSpace: 'nowrap'}}>{l}</span>{on && <span style={{fontSize: 26, fontWeight: 900, color: ACC}}>✓</span>}</div>;
};
/* ═════════════ Outils communs ═════════════ */
type HD = [number, string[], number[]];
const headAt = (h: HD[], t: number) => h.reduce((a, x) => (t >= x[0] - 0.2 ? x : a), h[0]);
const Heads: React.FC<{h: HD[]}> = ({h}) => {
  const t = useT();
  const x = headAt(h, t);
  const len = x[1].join(' ').length;
  return <HiLine words={x[1]} mark={x[2]} at={x[0]} y={330} size={len > 26 ? 50 : len > 20 ? 56 : 62} />;
};
const fmt = (v: number) => Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const arcP = (r: number, a0: number, a1: number) => { const p = (a: number) => [r * Math.cos((a * Math.PI) / 180), r * Math.sin((a * Math.PI) / 180)]; const [x0, y0] = p(a0); const [x1, y1] = p(a1); return `M 0 0 L ${x0} ${y0} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1} Z`; };
const Strk: React.FC<{at: number; c?: string}> = ({at, c = RED}) => {
  const t = useT();
  return <div style={{position: 'absolute', left: 8, right: 8, top: '50%', height: 7, background: c, borderRadius: 4, transform: `scaleX(${prog(t, at, at + 0.4)}) rotate(-3deg)`, transformOrigin: '0 50%'}} />;
};
const Row: React.FC<{at: number; ic: string; l: string; c: string; fs?: number; w?: number}> = ({at, ic, l, c, fs = 30, w}) => {
  const t = useT();
  const on = t > at;
  return <div style={{...nb('#fff', 5), boxShadow: `5px 5px 0 ${c}`, width: w, display: 'flex', alignItems: 'center', gap: 14, padding: '10px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: fs, lineHeight: 1.1, opacity: on ? 1 : 0, transform: `translateX(${on ? (1 - Math.min(1, spring(t, at))) * -160 : 0}px)`}}><F n={ic} size={58} /><span style={{flex: 1}}>{l}</span><span style={{color: ACC}}>{t > at + 0.4 ? '✓' : ''}</span></div>;
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="danger" w={1080} h={820} pos="50% 50%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 24%, ${PAPER}CC 32%, ${PAPER} 37%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb(NBK, 5), color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3, padding: '8px 22px'}}>MATRICE DES RISQUES · 1 MINUTE</div></Abs>
      <Abs x={0} y={650} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="MATRICE" src={IMG.c1} size={150} ls={4} /></Abs>
      <Abs x={0} y={840} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="4 × 4" src={IMG.c2} size={220} ls={6} seed={3} /></Abs>
      <Abs x={40} y={1030} w={1000} style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10}}>{[['PROBABILITÉ', BLUE], ['×', NBK], ['GRAVITÉ', RED], ['=', NBK], ['NIVEAU DE RISQUE', GOLD]].map(([n, c], k) => <div key={n} style={{...nb(c, 4), padding: '6px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', transform: `translateY(${(1 - Math.min(1, spring(t, 0.3 + k * 0.08))) * 60}px)`}}>{n}</div>)}</Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={NAVY} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

const Barred: React.FC<{at: number; strk: number; text: string; fs?: number}> = ({at, strk, text, fs = 30}) => {
  const t = useT();
  if (t < at) return null;
  return <div style={{position: 'relative', display: 'inline-block', ...nb('#fff', 5), padding: '10px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: fs, color: DIM, transform: `scale(${pop(t, at)})`}}>{text}<Strk at={strk} /></div>;
};


/* ═════════════ Les 15 normes ═════════════ */
const Flap: React.FC<{text: string; at: number; size: number; c: string}> = ({text, at, size, c}) => {
  const t = useT();
  return (
    <div style={{display: 'flex', gap: size * 0.08}}>
      {text.split('').map((ch, i) => {
        const land = at + 0.25 + i * 0.12;
        const done = t >= land;
        const roll = Math.floor((t - at) * 22 + i * 3);
        const shown = done ? ch : /[0-9]/.test(ch) ? String((roll % 10 + 10) % 10) : ch === ' ' ? ' ' : String.fromCharCode(65 + ((roll % 26) + 26) % 26);
        const flip = done ? Math.max(0, 1 - (t - land) * 6) : (t * 22) % 1;
        if (t < at) return <div key={i} style={{width: size * 0.66, height: size}} />;
        return (
          <div key={i} style={{position: 'relative', width: size * 0.66, height: size, borderRadius: size * 0.08, background: ch === ' ' ? 'transparent' : NIGHT, border: ch === ' ' ? 'none' : `3px solid ${NBK}`, boxShadow: ch === ' ' ? 'none' : `0 ${size * 0.06}px 0 #00000055`, overflow: 'hidden', perspective: 400}}>
            <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontWeight: 700, fontSize: size * 0.7, color: done ? (ch === ' ' ? 'transparent' : '#fff') : '#9CC6FF', transform: `rotateX(${flip * 70}deg)`, textShadow: done ? `0 0 12px ${c}` : 'none'}}>{shown}</div>
            {ch !== ' ' && <div style={{position: 'absolute', left: 0, right: 0, top: '50%', height: 3, background: '#000', opacity: 0.6}} />}
          </div>
        );
      })}
    </div>
  );
};
/** Mini tableau périodique (5 × 3) qui se remplit au fil des normes. */

/* ═════════════ Données de la matrice ═════════════ */
const cellCol = (v: number) => { const c = riskColor(v); return `#${c.getHexString()}`; };
const CELL = 150, GAP = 12;
/** Matrice 2D (P en lignes de bas en haut, G en colonnes). `hiP`/`hiG` = ligne / colonne surlignées, `pick` = case croisée. */
const Grid2D: React.FC<{x: number; y: number; at: number; hiP?: number; hiPAt?: number; hiG?: number; hiGAt?: number; pick?: [number, number]; pickAt?: number; alarm?: number; scale?: number}> = ({x, y, at, hiP, hiPAt = 0, hiG, hiGAt = 0, pick, pickAt = 0, alarm = 0, scale = 1}) => {
  const t = useT();
  const S = CELL * scale, G0 = GAP * scale, W = 4 * S + 3 * G0;
  const ax = 70 * scale;
  const cx = (g: number) => ax + (g - 1) * (S + G0), cy = (p: number) => (4 - p) * (S + G0);
  const pP = hiP ? prog(t, hiPAt, hiPAt + 0.5, easeOut) : 0, pG = hiG ? prog(t, hiGAt, hiGAt + 0.5, easeOut) : 0;
  const pk = pick ? prog(t, pickAt, pickAt + 0.4, easeOut) : 0;
  return (
    <Abs x={x} y={y} w={W + ax} h={W + ax} style={{opacity: pop(t, at)}}>
      {[1, 2, 3, 4].map((p) => [1, 2, 3, 4].map((g) => {
        const v = p * g;
        const a = at + 0.05 * (p + g);
        const s = Math.min(1, spring(t, a, 10, 13));
        const dim = pick && pk > 0 && !(pick[0] === p && pick[1] === g) ? 1 - 0.55 * pk : 1;
        const isPk = pick && pick[0] === p && pick[1] === g;
        const lit = isPk ? pk : 0;
        return (
          <div key={`${p}${g}`} style={{position: 'absolute', left: cx(g), top: cy(p), width: S, height: S, borderRadius: 16 * scale, background: cellCol(v), border: `${4 * scale}px solid ${NBK}`, boxSizing: 'border-box', transform: `scale(${s * (1 + lit * 0.12 + (isPk && alarm > 0 ? Math.abs(Math.sin(t * 9)) * 0.05 : 0))})`, opacity: dim, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 56 * scale, color: '#fff', textShadow: '0 3px 0 rgba(0,0,0,0.35)', boxShadow: lit ? `0 0 ${40 * lit}px ${cellCol(v)}, 0 0 0 ${6 * lit}px #fff` : `${5 * scale}px ${5 * scale}px 0 ${NBK}`, zIndex: isPk ? 3 : 1}}>{v}</div>
        );
      }))}
      {hiP && pP > 0 && <div style={{position: 'absolute', left: ax - 10, top: cy(hiP) - 8, width: (W + 20) * pP, height: S + 16, borderRadius: 20, border: `6px solid ${BLUE}`, boxSizing: 'border-box', zIndex: 4}} />}
      {hiG && pG > 0 && <div style={{position: 'absolute', left: cx(hiG) - 8, top: W + 10 - (W + 20) * pG, width: S + 16, height: (W + 20) * pG, borderRadius: 20, border: `6px solid ${RED}`, boxSizing: 'border-box', zIndex: 4}} />}
      {[1, 2, 3, 4].map((p) => <div key={`p${p}`} style={{position: 'absolute', left: 0, top: cy(p), width: ax - 14, height: S, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40 * scale, color: hiP === p && pP > 0 ? BLUE : INK}}>{p}</div>)}
      {[1, 2, 3, 4].map((g) => <div key={`g${g}`} style={{position: 'absolute', left: cx(g), top: W + 8, width: S, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40 * scale, color: hiG === g && pG > 0 ? RED : INK}}>{g}</div>)}
      <div style={{position: 'absolute', left: -6, top: W / 2, transform: 'translate(-50%, -50%) rotate(-90deg)', fontFamily: MONO, fontWeight: 700, fontSize: 24 * scale, letterSpacing: 4, color: BLUE, whiteSpace: 'nowrap'}}>PROBABILITÉ ↑</div>
      <div style={{position: 'absolute', left: ax, width: W, top: W + 62 * scale, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 24 * scale, letterSpacing: 4, color: RED}}>GRAVITÉ →</div>
    </Abs>
  );
};

/** Échelle verticale 1 → 4 qui se remplit (jauge à segments). */
const Scale14: React.FC<{x: number; y: number; at: number; c: string; label: string; upto?: number; uptoAt?: number}> = ({x, y, at, c, label, upto = 4, uptoAt}) => {
  const t = useT();
  const ua = uptoAt ?? at + 0.3;
  return (
    <Abs x={x} y={y} w={200} h={520} style={{opacity: pop(t, at)}}>
      {[4, 3, 2, 1].map((n, i) => {
        const on = t > ua + (n - 1) * 0.22 && n <= upto;
        return <div key={n} style={{position: 'absolute', left: 30, top: i * 112, width: 140, height: 96, borderRadius: 16, ...nb(on ? c : '#fff', 5), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: on ? '#fff' : '#C9D2DF', transform: `scale(${on ? Math.min(1.08, spring(t, ua + (n - 1) * 0.22, 9, 12)) : 1})`, opacity: 0.35 + 0.65 * (n / 4)}}>{n}</div>;
      })}
      <div style={{position: 'absolute', left: 0, right: 0, top: 460, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 24, letterSpacing: 3, color: c}}>{label}</div>
    </Abs>
  );
};

/** Dé 3D (CSS) qui roule et s'arrête sur une valeur. */
const Dice: React.FC<{x: number; y: number; at: number; stop: number; land: number; c: string}> = ({x, y, at, stop, land, c}) => {
  const t = useT();
  const S = 180;
  const roll = prog(t, at, land, easeOut);
  const faces: [number, string][] = [[1, 'rotateY(0deg)'], [2, 'rotateY(90deg)'], [3, 'rotateX(-90deg)'], [4, 'rotateX(90deg)'], [5, 'rotateY(-90deg)'], [6, 'rotateY(180deg)']];
  const target: Record<number, [number, number]> = {1: [0, 0], 2: [0, -90], 3: [90, 0], 4: [-90, 0]};
  const [tx, ty] = target[stop];
  const rx = tx + (1 - roll) * 720, ry = ty + (1 - roll) * 900;
  const pip = (n: number) => {
    const P: Record<number, [number, number][]> = {1: [[50, 50]], 2: [[28, 28], [72, 72]], 3: [[25, 25], [50, 50], [75, 75]], 4: [[28, 28], [72, 28], [28, 72], [72, 72]], 5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]], 6: [[28, 22], [72, 22], [28, 50], [72, 50], [28, 78], [72, 78]]};
    return P[n].map(([a, b], i) => <div key={i} style={{position: 'absolute', left: `${a}%`, top: `${b}%`, width: 30, height: 30, marginLeft: -15, marginTop: -15, borderRadius: 15, background: n <= 4 ? c : '#C9D2DF'}} />);
  };
  if (t < at) return null;
  return (
    <Abs x={x} y={y - Math.abs(Math.sin(roll * Math.PI * 3)) * 120 * (1 - roll)} w={S} h={S} style={{perspective: 900}}>
      <div style={{position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: `rotateX(${rx}deg) rotateY(${ry}deg)`}}>
        {faces.map(([n, tr]) => <div key={n} style={{position: 'absolute', inset: 0, background: '#fff', border: `5px solid ${NBK}`, borderRadius: 28, boxSizing: 'border-box', transform: `${tr} translateZ(${S / 2}px)`, backfaceVisibility: 'hidden'}}>{pip(n)}</div>)}
      </div>
    </Abs>
  );
};

/* ═════════════ Guichet 1 : un danger ? → recherche « matrice des risques » ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  return (
    <Out end={8.9}>
      <Heads h={[[2.9, ['Un', 'danger', '?'], [1]], [3.5, ['Comment', 'le', 'savoir', '?'], [3]], [5.9, ['La', 'matrice', '4 × 4'], [1, 2]]]} />
      {t < 3.6 && <Shot src={IMG.danger} ic="danger" x={260} y={470} w={560} h={640} at={2.85} pos="50% 30%" c={ORANGE} />}
      <SearchOpen x={60} y={440} w={960} h={900} at={3.5} query="matrice des risques" results={['matrice des risques 4 × 4', 'matrice des risques 5 × 5', 'document unique']} found={0} foundAt={5.4} clickAt={5.95} c={RED}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 70}}><Grid2D x={165} y={0} at={6.6} scale={0.95} /></div>
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ Guichet 2 : la matrice en 3D → évaluer, hiérarchiser → 2 critères ═════════════ */
const M3_AT = 12.0;
const Matrice: React.FC = () => {
  const t = useT();
  const [handle] = useState(() => delayRender('fonts-m3'));
  const [ready, setReady] = useState(false);
  useEffect(() => { document.fonts.load('900 120px Montserrat').then(() => document.fonts.ready).then(() => { setReady(true); continueRender(handle); }); }, [handle]);
  const crit = prog(t, 18.6, 19.1, easeOut);
  return (
    <Out end={21.3}>
      <Heads h={[[12.0, ['Un', 'outil', 'pour'], [1]], [12.66, ['Évaluer'], [0]], [13.82, ['Hiérarchiser'], [0]], [16.14, ['Comment', 'ça', 'marche', '?'], [2]], [18.66, ['Deux', 'critères'], [0, 1]]]} />
      {ready && <AbsoluteFill style={{zIndex: 6}}>
        <ThreeCanvas width={1080} height={1920} camera={{position: [7, 6, 9], fov: 40, near: 0.1, far: 100}} gl={{antialias: true, preserveDrawingBuffer: true, alpha: true}} style={{position: 'absolute', left: 0, top: 0}}>
          <Matrix3DScene u={t - M3_AT} />
        </ThreeCanvas>
      </AbsoluteFill>}
      {t > 12.66 && t < 16.0 && <Abs x={60} y={1300} w={960} style={{display: 'flex', justifyContent: 'center', gap: 18, zIndex: 8}}>
        <Chip at={12.7} ic="balance" l="ÉVALUER" c={BLUE} />
        {t > 13.85 && <Chip at={13.85} ic="graphique" l="HIÉRARCHISER" c={RED} />}
      </Abs>}
      {crit > 0 && <>
        <Abs x={130} y={640} w={120} h={640} style={{zIndex: 8, opacity: crit}}><svg width={120} height={640}><path d="M 60 620 L 60 30" stroke={BLUE} strokeWidth={12} strokeLinecap="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - crit}} /><path d="M 30 70 L 60 24 L 90 70" fill="none" stroke={BLUE} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" opacity={crit} /></svg></Abs>
        <Abs x={200} y={1240} w={720} h={90} style={{zIndex: 8, opacity: crit}}><svg width={720} height={90}><path d="M 10 45 L 680 45" stroke={RED} strokeWidth={12} strokeLinecap="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - crit}} /><path d="M 640 15 L 686 45 L 640 75" fill="none" stroke={RED} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" opacity={crit} /></svg></Abs>
        <Abs x={60} y={1318} w={960} style={{display: 'flex', justifyContent: 'center', gap: 20, zIndex: 8}}>
          <NBadge at={19.0} text="① PROBABILITÉ" bg={BLUE} rot={-3} size={34} />
          {t > 19.4 && <NBadge at={19.4} text="② GRAVITÉ" bg={RED} rot={3} size={34} />}
        </Abs>
      </>}
    </Out>
  );
};

/* ═════════════ Guichet 3 : la probabilité ═════════════ */
const Proba: React.FC = () => {
  const t = useT();
  return (
    <Out end={28.6}>
      <Heads h={[[24.4, ['Sa', 'fréquence'], [1]], [25.9, ['Ou', 'sa', 'possibilité', 'de', 'survenue'], [2, 3, 4]]]} />
      <Scale14 x={110} y={520} at={24.5} c={BLUE} label="PROBABILITÉ" />
      <Dice x={560} y={600} at={24.6} land={25.9} stop={4} c={BLUE} />
      <Abs x={400} y={880} w={560} style={{display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center'}}>
        <Chip at={25.2} ic="chrono" l="FRÉQUENCE" c={BLUE} />
        {t > 26.4 && <Chip at={26.4} ic="danger" l="POSSIBILITÉ DE SURVENUE" c={NAVY} />}
      </Abs>
      {t > 27.0 && <Abs x={420} y={1130} w={520} style={{textAlign: 'center'}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: DIM, opacity: pop(t, 27.0)}}>« est-ce que ça peut arriver ? »</div></Abs>}
    </Out>
  );
};

/* ═════════════ Guichet 4 : la gravité → échelle 1 à 4 → croisement ═════════════ */
const Gravite: React.FC = () => {
  const t = useT();
  const cross = t >= 36.5;
  return (
    <Out end={40.0}>
      <Heads h={[[32.3, ['Les', 'conséquences'], [1]], [32.98, ['Une', 'échelle', 'de', '1', 'à', '4'], [3, 4, 5]], [36.62, ['On', 'croise'], [1]], [38.86, ['Niveau', 'de', 'risque'], [0, 1, 2]]]} />
      {!cross && <>
        <Shot src={IMG.chute} ic="danger" x={60} y={470} w={660} h={560} at={32.3} pos="50% 50%" c={RED} />
        <Scale14 x={790} y={470} at={32.4} c={RED} label="GRAVITÉ" uptoAt={33.2} />
        <Abs x={60} y={1120} w={960} style={{display: 'flex', gap: 22, alignItems: 'center', justifyContent: 'center'}}>
          {t > 33.0 && <div style={{...nb(BLUE, 6), color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 40, padding: '10px 20px', transform: `scale(${Math.min(1, spring(t, 33.0))})`}}>P : 1 → <Count n={4} from={1} a={33.2} b={34.6} /></div>}
          {t > 33.4 && <div style={{...nb(RED, 6), color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 40, padding: '10px 20px', transform: `scale(${Math.min(1, spring(t, 33.4))})`}}>G : 1 → <Count n={4} from={1} a={33.6} b={35.0} /></div>}
        </Abs>
      </>}
      {cross && <>
        <Grid2D x={190} y={440} at={36.55} scale={0.92} hiP={2} hiPAt={37.0} hiG={3} hiGAt={37.4} pick={[2, 3]} pickAt={38.0} />
        {t > 38.86 && <Abs x={60} y={1160} w={960} style={{display: 'flex', justifyContent: 'center', zIndex: 6}}>
          <div style={{...nb('#fff', 6), padding: '10px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 40, transform: `scale(${Math.min(1, spring(t, 38.86))})`}}><span style={{color: BLUE}}>P</span> × <span style={{color: RED}}>G</span> = niveau de risque</div>
        </Abs>}
      </>}
    </Out>
  );
};

/* ═════════════ Guichet 5 : cas pratique — travail en hauteur, 3 × 4 = 12 ═════════════ */
const Cas: React.FC = () => {
  const t = useT();
  const mat = t >= 44.9;
  const flapT = 51.0;
  const alarm = t > 53.5;
  return (
    <Out end={57.9}>
      <Heads h={[[43.8, ['Sans', 'protection', 'contre', 'les', 'chutes'], [1, 2, 3, 4]], [44.94, ['Probabilité', ':', '3'], [2]], [48.4, ['Gravité', ':', '4'], [2]], [49.7, ['Le', 'calcul'], [1]], [53.54, ['Risque', 'élevé'], [0, 1]], [55.54, ['Prévention', 'prioritaire'], [0, 1]]]} />
      {!mat && <Shot src={IMG.scaff} ic="casque" x={160} y={460} w={760} h={700} at={43.8} pos="50% 40%" c={ORANGE}>
        <div style={{position: 'absolute', right: 26, top: 30}}><NBadge at={44.0} text="TRAVAIL EN HAUTEUR" bg={NBK} rot={4} size={28} /></div>
      </Shot>}
      {!mat && <Stamp at={44.2} text="SANS PROTECTION" c={RED} x={250} y={1010} rot={-7} size={50} />}
      {mat && <>
        <Grid2D x={190} y={440} at={44.9} scale={0.92} hiP={3} hiPAt={46.6} hiG={4} hiGAt={48.4} pick={[3, 4]} pickAt={52.0} alarm={alarm ? 1 : 0} />
        <Abs x={60} y={1150} w={960} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, zIndex: 6, opacity: pop(t, 49.8)}}>
          <Flap text="3" at={flapT - 0.6} size={90} c={BLUE} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: INK}}>×</div>
          <Flap text="4" at={flapT - 0.3} size={90} c={RED} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: INK}}>=</div>
          <Flap text="12" at={flapT} size={90} c={RED} />
        </Abs>
        {alarm && <AbsoluteFill style={{zIndex: 2, pointerEvents: 'none', background: `radial-gradient(circle at ${50 + 40 * Math.cos(t * 7)}% 0%, rgba(224,56,62,${0.28 * Math.abs(Math.sin(t * 7))}), transparent 55%)`}} />}
        {t > 54.58 && <Abs x={60} y={1290} w={960} style={{display: 'flex', justifyContent: 'center', gap: 14, zIndex: 7}}>
          <NBadge at={54.6} text="🚨 RISQUE ÉLEVÉ" bg={RED} rot={-3} size={32} />
          {t > 55.6 && <NBadge at={55.6} text="PRÉVENTION PRIORITAIRE" bg={NBK} rot={2} size={30} />}
        </Abs>}
      </>}
    </Out>
  );
};

/* ═════════════ Guichet 6 : retenez ceci → l'escalier → commentaire ═════════════ */
const STEPS: [string, string, number, string, string][] = [
  ['IDENTIFIER', "c'est bien", 59.94, BLUE, 'loupe'],
  ['ÉVALUER', "c'est mieux", 62.34, ORANGE, 'balance'],
  ['PRÉVENIR', "c'est indispensable", 65.18, GREEN, 'bouclier'],
];
const Retenir: React.FC = () => {
  const t = useT();
  return (
    <Out end={67.9}>
      <Heads h={[[62.1, ['Identifier', '·', 'évaluer', '·', 'prévenir'], [4]]]} />
      {STEPS.map(([w, s0, at, c, ic], i) => {
        const a = Math.max(at, 62.15 + i * 0.1);
        const up = Math.min(1, spring(t, a, 8, 12));
        const h = 220 + i * 190;
        return (
          <Abs key={w} x={70 + i * 320} y={1340 - h * up} w={300} h={h} style={{opacity: t > a ? 1 : 0}}>
            <div style={{position: 'absolute', inset: 0, ...nb(c, 7), borderRadius: 22}} />
            <div style={{position: 'absolute', left: 0, right: 0, top: 18, textAlign: 'center'}}><F n={ic} size={70} /></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 100, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff'}}>{w}</div>
            <div style={{position: 'absolute', left: 10, right: 10, top: 146, textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 32, color: '#fff'}}>{s0}</div>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 14, textAlign: 'center', fontSize: 34, color: YEL, letterSpacing: 4}}>{'★'.repeat(i + 1)}</div>
          </Abs>
        );
      })}
      {t > 66.4 && <Stamp at={66.4} text="INDISPENSABLE" c={GREEN} x={560} y={640} rot={-9} size={48} />}
    </Out>
  );
};
const Comment: React.FC = () => {
  const t = useT();
  const up = Math.min(1, spring(t, 67.9));
  const q = 'Utilisez-vous déjà la matrice 4 × 4 ?';
  const typed = Math.floor(prog(t, 68.3, 70.6) * q.length);
  const ring = prog(t, 72.45, 73.1, easeOut);
  return (
    <Out end={OUTRO_AT}>
      <Heads h={[[67.98, ['Et', 'chez', 'vous', '?'], [2, 3]], [72.42, ['Dites-le', 'en', 'commentaire'], [2]]]} />
      <Abs x={250} y={430} w={580} h={940} style={{transform: `translateY(${(1 - up) * 900}px) rotate(${(1 - up) * 6}deg)`}}>
        <div style={{position: 'absolute', inset: 0, borderRadius: 60, background: NBK, boxShadow: `12px 12px 0 ${RED}`, padding: 16, boxSizing: 'border-box'}}>
          <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: 46, overflow: 'hidden', background: '#111'}}>
            <Img src={PH(IMG.cover)} style={{position: 'absolute', inset: 0, width: '100%', height: '62%', objectFit: 'cover', opacity: 0.85}} />
            <div style={{position: 'absolute', left: '50%', top: 10, width: 120, height: 30, marginLeft: -60, borderRadius: 15, background: NBK}} />
            <div style={{position: 'absolute', right: 18, top: 210, display: 'flex', flexDirection: 'column', gap: 26, alignItems: 'center'}}>
              {['❤', '💬', '↗'].map((e, i) => <div key={i} style={{width: 70, height: 70, borderRadius: 35, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, color: '#fff', transform: i === 1 && t > 72.4 ? `scale(${1 + 0.2 * Math.abs(Math.sin(t * 8))})` : undefined, boxShadow: i === 1 && t > 72.4 ? `0 0 0 6px ${YEL}` : undefined}}>{e}</div>)}
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: '44%', background: '#fff', borderRadius: '30px 30px 0 0', padding: '22px 22px', boxSizing: 'border-box', transform: `translateY(${(1 - prog(t, 68.1, 68.6, easeOut)) * 100}%)`}}>
              <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: DIM, letterSpacing: 2}}>COMMENTAIRES</div>
              <div style={{display: 'flex', gap: 12, marginTop: 14, alignItems: 'flex-start'}}>
                <div style={{width: 46, height: 46, borderRadius: 23, background: '#fff', border: `3px solid ${NAVY}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden'}}><Img src={staticFile(LOGO)} style={{width: 40}} /></div>
                <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: INK, lineHeight: 1.2}}>{q.slice(0, typed)}<span style={{opacity: typed < q.length && Math.sin(t * 12) > 0 ? 1 : 0}}>|</span></div>
              </div>
              <div style={{position: 'absolute', left: 18, right: 18, bottom: 20, height: 62, borderRadius: 31, background: '#F1F3F6', display: 'flex', alignItems: 'center', padding: '0 22px', fontFamily: sansFont, fontWeight: 700, fontSize: 22, color: '#8A93A3'}}>Ajouter un commentaire…</div>
              {ring > 0 && <svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}} width={548} height={400}><ellipse cx={274} cy={330} rx={262} ry={50} fill="none" stroke={RED} strokeWidth={7} strokeLinecap="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - ring}} /></svg>}
            </div>
          </div>
        </div>
      </Abs>
      {t > 72.9 && <Abs x={0} y={1180} w={250} style={{display: 'flex', justifyContent: 'center', transform: `translateX(${Math.sin(t * 6) * 8}px)`}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: RED}}>→</div></Abs>}
    </Out>
  );
};

/* ═════════════ Bruitage ═════════════ */
const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at, s: 'sfx/bell', v: 0.2})),
  {at: 2.85, s: 'sfx/thud', v: 0.3}, ...searchCues(3.5, 19, 5.4, 5.95), ...rep(6.65, 16, 0.04, 'sfx/pop', 0.1),
  ...rep(M3_AT + 0.3, 16, 0.07, 'sfx/thud', 0.12), {at: M3_AT + 2.9, s: 'sfx/rise', v: 0.3, dur: 1.4}, {at: 12.7, s: 'sfx/pop', v: 0.3}, {at: 13.85, s: 'sfx/pop', v: 0.3}, {at: 18.6, s: 'sfx/swish', v: 0.35}, {at: 19.0, s: 'sfx/pop', v: 0.3}, {at: 19.4, s: 'sfx/pop', v: 0.3},
  ...rep(24.6, 9, 0.14, 'sfx/click', 0.18), {at: 25.9, s: 'sfx/thud', v: 0.4}, ...rep(24.8, 4, 0.22, 'sfx/ding', 0.14), {at: 25.2, s: 'sfx/pop', v: 0.3}, {at: 26.4, s: 'sfx/pop', v: 0.3},
  {at: 32.3, s: 'sfx/swish', v: 0.3}, ...rep(33.2, 4, 0.22, 'sfx/ding', 0.14), {at: 36.55, s: 'soft-whoosh', v: 0.35, dur: 0.8}, ...rep(36.6, 16, 0.04, 'sfx/pop', 0.1), {at: 37.0, s: 'sfx/swish', v: 0.3}, {at: 37.4, s: 'sfx/swish', v: 0.3}, {at: 38.0, s: 'validation', v: 0.3},
  {at: 44.2, s: 'tampon', v: 0.45}, ...rep(44.95, 16, 0.04, 'sfx/pop', 0.1), {at: 46.6, s: 'sfx/swish', v: 0.35}, {at: 48.4, s: 'sfx/swish', v: 0.35}, ...rep(50.3, 14, 0.06, 'sfx/click', 0.14), {at: 51.1, s: 'sfx/thud', v: 0.45}, {at: 52.0, s: 'bass-hit', v: 0.45},
  ...rep(53.6, 6, 0.36, 'sfx/ding', 0.16), {at: 54.6, s: 'tampon', v: 0.4}, {at: 55.6, s: 'tampon', v: 0.4},
  {at: 62.15, s: 'sfx/thud', v: 0.35}, {at: 62.34, s: 'sfx/thud', v: 0.35}, {at: 65.18, s: 'sfx/thud', v: 0.4}, {at: 66.4, s: 'tampon', v: 0.5},
  {at: 67.9, s: 'soft-whoosh', v: 0.45, dur: 1}, ...rep(68.3, 20, 0.11, 'sfx/click', 0.08), {at: 72.45, s: 'stylo', v: 0.3, dur: 0.6}, {at: 72.9, s: 'sfx/pop', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SCN: [React.FC, number, number][] = [[Intro, 2.6, 8.95], [Matrice, 11.9, 21.4], [Proba, 24.3, 28.7], [Gravite, 32.2, 40.1], [Cas, 43.7, 58.0], [Retenir, 62.0, 67.95], [Comment, 67.85, OUTRO_AT]];
export const Matrice44Metro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    {SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-matrice44-metro-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn, Barred];
