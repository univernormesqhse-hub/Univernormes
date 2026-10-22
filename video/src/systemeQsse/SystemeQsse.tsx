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
 * « Le système QSSE » (5 min 59) — « construire le système QSSE sous les yeux du spectateur » : motion design
 * pédagogique premium + infographie animée + interface de pilotage. La carte en étoile du système QSSE (16 bulles
 * autour du cœur) est la carte globale : à chaque partie la caméra y plonge sur la bulle concernée, puis la scène
 * construit le concept (cœur QSSE et quatre domaines qui convergent, triangle du triple challenge → performance durable,
 * barre de progression des cinq socles, bâtiment de l'architecte, maquette + chaîne de valeur, boîte à outils qui
 * alimente le cœur, chef de projet en étoile, synthèse en cascade, puis moment d'accompagnement : l'écran se charge,
 * se simplifie, et la proposition apparaît). Présentation en métro : une ligne relie les neuf parties et la rame
 * réaliste les dessert. Voix d'origine (sans musique), sous-titres calés mot à mot, photos générées (ChatGPT) d'après
 * prompts-images-systeme-qsse.md. Fil rouge : tube pneumatique à six guichets adaptés ; gyrophare à chaque guichet.
 */
const IMG = {
  cover: '',
  qualite: '',
  sante: '',
  environnement: '',
  architecte: '',
  conception: '',
  reunion: '',
  chef: '',
  accompagnement: '',
  surcharge: '',
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
const OUTRO_AT = 359.2;
export const SYSQSSE_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 40.9, n: '1', title: 'Le triple challenge', s: 'qualité · santé-sécurité · environnement', c: BLUE, g: 'triple challenge', k: 'gyro', lab: 'GUICHET 1 / 6'},
  {at: 72.7, n: '2', title: 'Les cinq socles', s: 'les fondamentaux du système', c: TEAL, g: '5 socles', k: 'gyro', lab: 'GUICHET 2 / 6'},
  {at: 136.5, n: '3', title: 'L’architecte du système', s: 'le responsable QSSE', c: VIO, g: 'architecte', k: 'gyro', lab: 'GUICHET 3 / 6'},
  {at: 169.9, n: '4', title: 'Dès la conception', s: 'toute la chaîne de valeur', c: ORANGE, g: 'conception', k: 'gyro', lab: 'GUICHET 4 / 6'},
  {at: 203.3, n: '5', title: 'Outils & chef de projet', s: 'faire vivre le système', c: GREEN, g: 'outils', k: 'gyro', lab: 'GUICHET 5 / 6'},
  {at: 259.4, n: '6', title: 'En résumé', s: 'l’affaire de tous', c: NAVY, g: 'synthèse', k: 'gyro', lab: 'GUICHET 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 294.2;
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

/* ═════════════ La carte globale : le système QSSE en étoile (16 bulles) ═════════════ */
const BUB = ['Un triple challenge', '5 socles', 'De haut en bas', 'Responsable architecte', 'Investissement', 'Prévention · amélioration', 'Un acte de management', 'Dès la conception', 'Avec les fournisseurs', 'Aider le personnel à faire bien', 'Les référentiels : des guides', 'Approche processus', 'Résolution de problème', 'Réunions minute', 'Valoriser les résultats', 'Chef de projet'];
const WC: [number, number] = [540, 900];
const WR = 375;
const bxy = (k: number): [number, number] => { const a = (k / BUB.length) * Math.PI * 2 - Math.PI / 2; return [WC[0] + Math.cos(a) * WR, WC[1] + Math.sin(a) * WR]; };
const Wheel: React.FC<{lit: number[]; at: number; all?: boolean; core?: string; coreC?: string}> = ({lit, at, all, core = 'Système QSSE', coreC = '#2F7C93'}) => {
  const t = useT();
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1800}}>
      <svg width={1080} height={1800} style={{position: 'absolute', left: 0, top: 0}}>
        {BUB.map((_, k) => { const [x, y] = bxy(k); const on = all || lit.includes(k); return <line key={k} x1={WC[0]} y1={WC[1]} x2={x} y2={y} stroke={on ? YEL : INK} strokeWidth={on ? 9 : 5} strokeDasharray={420} strokeDashoffset={420 * (1 - prog(t, at + k * 0.04, at + k * 0.04 + 0.5))} opacity={on ? 1 : 0.55} />; })}
      </svg>
      {BUB.map((l, k) => { const [x, y] = bxy(k); const on = all || lit.includes(k); return (
        <div key={l} style={{position: 'absolute', left: x - 82, top: y - 82, width: 164, height: 164, borderRadius: 82, background: on ? '#fff' : '#86BCCB', border: `${on ? 7 : 4}px solid ${on ? YEL : '#5E9AAB'}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 12, fontFamily: sansFont, fontWeight: on ? 900 : 700, fontSize: l.length > 20 ? 19 : 22, color: on ? INK : '#14324A', lineHeight: 1.08, opacity: pop(t, at + 0.2 + k * 0.04), transform: `scale(${on ? 1.1 + 0.04 * Math.sin(t * 5 + k) : 1})`, boxShadow: on ? `0 0 34px ${YEL}` : 'none'}}>{l}</div>
      ); })}
      <div style={{position: 'absolute', left: WC[0] - 150, top: WC[1] - 150, width: 300, height: 300, borderRadius: 150, background: `radial-gradient(circle at 35% 30%, #5FA9BF, ${coreC} 70%)`, border: `8px solid ${INK}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 52, lineHeight: 1.0, opacity: pop(t, at), boxShadow: `0 0 ${30 + 20 * Math.sin(t * 3)}px rgba(47,124,147,0.7)`}}>{core}</div>
    </div>
  );
};
/** Plongée dans la carte globale : la carte apparaît, les bulles de la partie s'allument, la caméra zoome dessus. */
const ZOOMS: {at: number; lit: number[]}[] = [{at: 44.3, lit: [0]}, {at: 76.1, lit: [1, 6, 5, 11, 9]}, {at: 139.9, lit: [3, 4, 2]}, {at: 173.3, lit: [7, 8]}, {at: 206.7, lit: [10, 11, 12, 13, 14]}, {at: 240.4, lit: [15]}];
const MapZoom: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const Z = ZOOMS[i];
  const k = t - Z.at;
  if (k < 0 || k > 2.6) return null;
  const pts = Z.lit.map(bxy);
  const fx = pts.reduce((a, p) => a + p[0], 0) / pts.length;
  const fy = pts.reduce((a, p) => a + p[1], 0) / pts.length;
  const z = prog(t, Z.at + 1.2, Z.at + 2.5, easeIn);
  const op = prog(t, Z.at, Z.at + 0.3) * (1 - prog(t, Z.at + 2.1, Z.at + 2.6));
  return (
    <AbsoluteFill style={{zIndex: 34, opacity: op, overflow: 'hidden'}}>
      <AbsoluteFill style={{background: PAPER}} /><Bg />
      <div style={{position: 'absolute', left: 0, top: 120, width: 1080, height: 1800, transformOrigin: `${fx}px ${fy}px`, transform: `scale(${0.82 + 2.6 * z})`, filter: z > 0.4 ? `blur(${(z - 0.4) * 6}px)` : undefined}}><Wheel lit={Z.lit} at={Z.at - 1} /></div>
      <Abs x={0} y={250} w={1080} style={{textAlign: 'center', opacity: 1 - z}}><div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 20px', borderRadius: 8}}>CARTE DU SYSTÈME · ZOOM</div></Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Ligne de métro des neuf parties ═════════════ */
const LINE = [{l: 'QSSE', at: 0, c: '#2F7C93'}, {l: 'Triple', at: 40.9, c: BLUE}, {l: '5 socles', at: 72.7, c: TEAL}, {l: 'Architecte', at: 136.5, c: VIO}, {l: 'Conception', at: 169.9, c: ORANGE}, {l: 'Outils', at: 203.3, c: GREEN}, {l: 'Chef de projet', at: 238.4, c: GOLD}, {l: 'Synthèse', at: 259.4, c: NAVY}, {l: 'Terrain', at: 296.2, c: RED}];
const Metro: React.FC = () => {
  const t = useT();
  const cur = LINE.reduce((a, x, k) => (t >= x.at ? k : a), 0);
  const sx = (k: number) => 60 + k * (840 / (LINE.length - 1));
  const mv = cur === 0 ? 1 : prog(t, LINE[cur].at, LINE[cur].at + 1.6, easeInOut);
  const tx = cur === 0 ? sx(0) : lerp(sx(cur - 1), sx(cur), mv);
  return (
    <Abs x={60} y={1400} w={960} h={104} style={{zIndex: 30, background: 'rgba(255,255,255,0.94)', border: `4px solid ${INK}`, borderRadius: 20, boxShadow: `5px 5px 0 ${INK}`}}>
      <div style={{position: 'absolute', left: 60, right: 60, top: 30, height: 12, borderRadius: 6, background: `linear-gradient(90deg, ${LINE.map((x) => x.c).join(', ')})`}} />
      {LINE.map((x, k) => { const on = k < cur || (k === cur && mv > 0.98); return <div key={x.l} style={{position: 'absolute', left: sx(k) - 16, top: 20, width: 32, height: 32, borderRadius: 16, background: on ? x.c : '#fff', border: `5px solid ${on ? '#fff' : x.c}`, boxSizing: 'border-box', boxShadow: on ? `0 0 0 3px ${x.c}` : 'none', color: '#fff', fontSize: 14, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{on ? '✓' : ''}</div>; })}
      {LINE.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: sx(k) - 60, width: 120, top: 62, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 15, color: k === cur ? x.c : DIM}}>{x.l}</div>)}
      <Img src={staticFile('metroiso-gen/metro/rame-dessus.png')} style={{position: 'absolute', left: tx - 50, top: 20, width: 100, height: 34, filter: 'drop-shadow(0 0 8px rgba(124,196,255,0.9))'}} />
    </Abs>
  );
};

/** Bandeau-gyrophare express pour les sous-parties (chef de projet, accompagnement). */
const Banner: React.FC<{at: number; title: string; c: string; sub: string}> = ({at, title, c, sub}) => {
  const t = useT();
  const k = t - at;
  if (k < 0 || k > 1.9) return null;
  const inn = prog(t, at, at + 0.2) * (1 - prog(t, at + 1.5, at + 1.9));
  return (
    <Abs x={0} y={200} w={1080} h={250} style={{zIndex: 36, opacity: inn, overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, background: `conic-gradient(from ${k * 640}deg at 540px 60px, rgba(224,74,63,0.45) 0deg, transparent 30deg, transparent 180deg, rgba(31,111,209,0.45) 180deg, transparent 210deg)`, backgroundColor: PAPER}} />
      <div style={{position: 'absolute', left: 480, top: 20, width: 120, height: 76, borderRadius: '60px 60px 10px 10px', background: `radial-gradient(circle at 50% 40%, #fff, ${c} 60%)`, border: `5px solid ${INK}`, boxShadow: `0 0 ${30 + 25 * Math.abs(Math.sin(k * 10))}px ${c}`}} />
      <div style={{position: 'absolute', left: 80, right: 80, top: 120, height: 100, borderRadius: 20, background: '#fff', border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${c}`, display: 'flex', alignItems: 'center', gap: 20, padding: '0 24px', transform: `translateX(${(1 - prog(t, at + 0.1, at + 0.5, easeOut)) * -1100}px)`}}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>{title}</div>
        <div style={{marginLeft: 'auto', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: c}}>{sub}</div>
      </div>
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
      {IMG.cover ? <div style={{position: 'absolute', left: 0, top: 200}}><Pic src={IMG.cover} ic="usine" w={1080} h={740} pos="50% 30%" /></div> : <div style={{position: 'absolute', left: 0, top: -260, transform: 'scale(0.86)', transformOrigin: '540px 900px'}}><Wheel lit={[]} at={-5} /></div>}
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER} 9%, ${PAPER}00 16%, ${PAPER}00 34%, ${PAPER}DD 43%, ${PAPER} 48%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={930} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>QUALITÉ · SANTÉ · SÉCURITÉ · ENVIRONNEMENT</div>
        <div style={{marginTop: 18}}><Board text="LE SYSTÈME" at={-1} h={84} gap={2} c={'#2F7C93'} stag={0.02} /></div>
        <div style={{marginTop: 8}}><Board text="QSSE" at={-1} h={120} gap={4} c={BLUE} stag={0.02} /></div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 48, color: INK, marginTop: 14}}>comprendre, structurer, faire progresser</div>
      </Abs>
      <Abs x={60} y={1470} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO · le cœur du système ═════════════ */
const DOM = [{l: 'QUALITÉ', c: BLUE, a: 18.3, x: 120, y: 120}, {l: 'SANTÉ', c: GREEN, a: 19.34, x: 840, y: 120}, {l: 'SÉCURITÉ', c: ORANGE, a: 19.9, x: 120, y: 760}, {l: 'ENVIRONNEMENT', c: TEAL, a: 20.6, x: 840, y: 760}];
const VERBS = [{l: 'donner une direction', a: 32.14}, {l: 'organiser les responsabilités', a: 33.7}, {l: 'maîtriser les risques', a: 35.46}, {l: 'résoudre les problèmes', a: 36.94}, {l: 'faire progresser', a: 38.18}];
const Intro: React.FC = () => {
  const t = useT();
  const ph = t < 22.1 ? 0 : t < 31.1 ? 1 : 2;
  const conv = prog(t, 20.9, 21.9, easeInOut);
  return (
    <Out end={40.9}>
      {ph === 0 && (
        <>
          <HiLine words={t < 16.9 ? ['Un', 'cadre', 'de', 'pilotage'] : ['Q', '·', 'S', '·', 'S', '·', 'E']} mark={t < 16.9 ? [1, 3] : [0, 2, 4, 6]} at={t < 16.9 ? 8.1 : 16.98} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={940}>
            <div style={{position: 'absolute', left: 480 - 190, top: 300, width: 380, height: 380, borderRadius: 190, background: `radial-gradient(circle at 35% 30%, #5FA9BF, #2F7C93 70%)`, border: `9px solid ${INK}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 62, lineHeight: 1, opacity: pop(t, 2.8), transform: `scale(${(0.6 + 0.4 * pop(t, 2.8)) * (1 + 0.08 * conv * Math.sin(t * 8))})`, boxShadow: `0 0 ${40 + 60 * conv}px rgba(47,124,147,0.8)`}}>Système<br />QSSE</div>
              {t < 16.9 && [{l: 'comprendre', a: 2.46, x: 60, y: 120}, {l: 'structurer', a: 3.22, x: 380, y: 40}, {l: 'faire progresser', a: 3.9, x: 640, y: 120}].map((p) => <div key={p.l} style={{position: 'absolute', left: p.x, top: p.y, opacity: pop(t, p.a)}}><Pill at={p.a} c={NAVY} size={30}>{p.l}</Pill></div>)}
              {t < 16.9 && [{l: 'maîtriser les activités', a: 11.02, x: 20, y: 760}, {l: 'prévenir les risques', a: 12.9, x: 520, y: 760}, {l: 'améliorer durablement', a: 14.18, x: 260, y: 860}].map((p) => <div key={p.l} style={{position: 'absolute', left: p.x, top: p.y, opacity: pop(t, p.a)}}><Pill at={p.a} c={GREEN} size={30}>{p.l}</Pill></div>)}
              {t < 16.9 && <svg width={960} height={940} style={{position: 'absolute', left: 0, top: 0}}><circle cx={480} cy={490} r={250} fill="none" stroke={BLUE} strokeWidth={8} strokeDasharray="30 18" strokeDashoffset={-t * 60} opacity={pop(t, 8.1)} /></svg>}
              {t >= 16.9 && DOM.map((d) => { const q = pop(t, d.a); return <div key={d.l} style={{position: 'absolute', left: lerp(d.x, 480, conv) - 140, top: lerp(d.y, 490, conv) - 50, width: 280, height: 100, borderRadius: 50, background: d.c, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: d.l.length > 9 ? 28 : 38, opacity: q * (1 - conv * 0.9), transform: `scale(${(0.5 + 0.5 * q) * (1 - conv * 0.5)})`, boxShadow: `0 0 26px ${d.c}`}}>{d.l}</div>; })}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Pas', 'une', 'pile', 'de', 'documents']} mark={[2, 4]} at={22.2} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={940}>
            {Array.from({length: 9}, (_, k) => { const a = 24.4 + k * 0.35; const q = prog(t, a, a + 0.4, easeOut); return t > a && <div key={k} style={{position: 'absolute', left: 300 + (k % 2) * 30 + Math.sin(k) * 20, top: lerp(-200, 560 - k * 52, q), width: 360, height: 60, borderRadius: 10, background: ['#fff', '#F1F3F6', '#E8ECF2'][k % 3], border: `4px solid ${INK}`, transform: `rotate(${(k % 3 - 1) * 4}deg)`, display: 'flex', alignItems: 'center', padding: '0 16px', fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM}}>{['procédure', 'document', 'exigence réglementaire'][k % 3]}</div>; })}
            <div style={{position: 'absolute', left: 240, right: 240, top: 300}}><Strike p={prog(t, 28.0, 28.6)} c={RED} /></div>
            <div style={{position: 'absolute', left: 60, right: 60, top: 680, height: 220, borderRadius: 28, background: NIGHT, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 20, opacity: pop(t, 28.58), transform: `scale(${0.7 + 0.3 * pop(t, 28.58)})`}}>
              <div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: '#fff', lineHeight: 1.1}}>Le QSSE : <span style={{color: YEL}}>un système</span>,<br />pas une pile de documents.</div></div>
              <Shine at={29.4} />
            </div>
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Un', 'système', 'de', 'management']} mark={[1, 3]} at={31.2} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={940}>
            <svg width={960} height={940} style={{position: 'absolute', left: 0, top: 0}}>{VERBS.map((v, k) => { const a = (k / VERBS.length) * Math.PI * 2 - Math.PI / 2; return <line key={k} x1={480} y1={490} x2={480 + Math.cos(a) * 360} y2={490 + Math.sin(a) * 360} stroke={GREEN} strokeWidth={8} strokeDasharray={360} strokeDashoffset={360 * (1 - prog(t, v.a - 0.3, v.a + 0.2))} />; })}</svg>
            <div style={{position: 'absolute', left: 480 - 150, top: 340, width: 300, height: 300, borderRadius: 150, background: `radial-gradient(circle at 35% 30%, #5FA9BF, #2F7C93 70%)`, border: `8px solid ${INK}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 48, lineHeight: 1}}>Système<br />QSSE</div>
            {VERBS.map((v, k) => { const a = (k / VERBS.length) * Math.PI * 2 - Math.PI / 2; const q = pop(t, v.a); return <div key={v.l} style={{position: 'absolute', left: 480 + Math.cos(a) * 360 - 150, top: 490 + Math.sin(a) * 360 - 46, width: 300, minHeight: 92, borderRadius: 20, background: '#fff', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${GREEN}`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '8px 12px', boxSizing: 'border-box', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, lineHeight: 1.05, opacity: q, transform: `scale(${0.6 + 0.4 * q})`}}>{v.l}</div>; })}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 1 · LE TRIPLE CHALLENGE ═════════════ */
const TRI = [{l: 'Qualité', s: 'produits et services', c: BLUE, a: 46.18, x: 480, y: 70, img: 'qualite', ic: 'medaille'}, {l: 'Santé & sécurité', s: 'collaborateurs exposés', c: GREEN, a: 49.38, x: 150, y: 590, img: 'sante', ic: 'casque'}, {l: 'Environnement', s: 'démarche responsable', c: ORANGE, a: 55.02, x: 810, y: 590, img: 'environnement', ic: 'feuille'}];
const Triple: React.FC = () => {
  const t = useT();
  const linked = prog(t, 60.9, 62.0);
  const perf = prog(t, 67.14, 68.4, easeOut);
  const CY = 460;
  return (
    <Out end={72.7}>
      <HiLine words={t < 60.8 ? ['Un', 'triple', 'challenge'] : t < 67.1 ? ['Trois', 'dimensions', 'liées'] : ['Performance', 'durable']} mark={t < 60.8 ? [1, 2] : t < 67.1 ? [2] : [0, 1]} at={t < 60.8 ? 43.0 : t < 67.1 ? 60.9 : 67.2} y={330} size={62} />
      <Abs x={60} y={450} w={960} h={930}>
        <svg width={960} height={930} style={{position: 'absolute', left: 0, top: 0}}>
          {[[0, 1], [1, 2], [2, 0]].map(([a, b], k) => <line key={k} x1={TRI[a].x} y1={TRI[a].y + 90} x2={TRI[b].x} y2={TRI[b].y + 90} stroke={k === 0 ? GREEN : k === 1 ? ORANGE : BLUE} strokeWidth={10 + 6 * linked * Math.abs(Math.sin(t * 4 + k))} strokeLinecap="round" strokeDasharray={760} strokeDashoffset={760 * (1 - prog(t, TRI[Math.max(a, b)].a, TRI[Math.max(a, b)].a + 0.8))} opacity={0.4 + 0.6 * linked} />)}
          {perf > 0 && TRI.map((p, k) => <line key={`c${k}`} x1={p.x} y1={p.y + 90} x2={lerp(p.x, 480, perf)} y2={lerp(p.y + 90, CY, perf)} stroke={p.c} strokeWidth={8} strokeDasharray="16 10" strokeDashoffset={-t * 80} />)}
        </svg>
        {TRI.map((p) => { const q = pop(t, p.a); return (
          <div key={p.l} style={{position: 'absolute', left: p.x - 150, top: p.y - 60, width: 300, textAlign: 'center', opacity: q, transform: `scale(${0.5 + 0.5 * q})`}}>
            <div style={{margin: '0 auto', width: 220, height: 220, borderRadius: 110, overflow: 'hidden', border: `8px solid ${p.c}`, boxShadow: `0 0 0 5px ${INK}, 0 0 30px ${p.c}`, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{(IMG as Record<string, string>)[p.img] ? <Pic src={(IMG as Record<string, string>)[p.img]} ic={p.ic} w={220} h={220} /> : <F n={p.ic} size={130} />}</div>
            <div style={{marginTop: 10, display: 'inline-block', background: p.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 32, padding: '6px 18px', borderRadius: 14, border: `4px solid ${INK}`}}>{p.l}</div>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM, marginTop: 6}}>{p.s}</div>
          </div>
        ); })}
        {t > 62.5 && t < 67.1 && <div style={{position: 'absolute', left: 230, right: 230, top: 370, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}><Pill at={64.66} c={DIM} size={30}>productivité seule</Pill><Pill at={65.86} c={DIM} size={30}>rentabilité seule</Pill><div style={{width: 260, opacity: pop(t, 66.3)}}><Strike p={prog(t, 66.3, 66.9)} c={RED} /></div></div>}
        {perf > 0 && <div style={{position: 'absolute', left: 480 - 190, top: CY - 95, width: 380, height: 190, borderRadius: 95, background: `linear-gradient(120deg, ${BLUE}, ${GREEN}, ${ORANGE})`, border: `7px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 44, lineHeight: 1.0, transform: `scale(${perf})`, boxShadow: `0 0 ${40 + 20 * Math.sin(t * 4)}px ${YEL}`}}>PERFORMANCE<br />DURABLE</div>}
        {perf > 0 && <Shine at={69.0} />}
      </Abs>
    </Out>
  );
};

/* ═════════════ 2 · LES CINQ SOCLES ═════════════ */
const SOC = [{n: '01', l: 'Management', at: 79.98, c: NAVY}, {n: '02', l: 'Prévention', at: 87.14, c: RED}, {n: '03', l: 'Processus', at: 101.26, c: BLUE}, {n: '04', l: 'Personnes', at: 113.7, c: GREEN}, {n: '05', l: 'Amélioration', at: 128.5, c: ORANGE}];
const Socles: React.FC = () => {
  const t = useT();
  const i = SOC.reduce((a, x, k) => (t >= x.at ? k : a), -1);
  const S0 = i >= 0 ? SOC[i] : SOC[0];
  const lt = i >= 0 ? t - S0.at : 0;
  const p = (a: number, b: number) => prog(t, a, b, easeOut);
  return (
    <Out end={136.5}>
      {i < 0 && <SearchOpen x={60} y={330} w={960} h={1040} at={75.7} query="fondamentaux du système QSSE" results={['Glossaire QSSE', 'Les cinq socles du système', 'Exigences réglementaires']} found={1} foundAt={77.6} clickAt={77.9} c={TEAL}><div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16, padding: '0 50px'}}>{SOC.map((x, k) => <div key={x.n} style={{display: 'flex', alignItems: 'center', gap: 18, opacity: pop(t, 78.3 + k * 0.15), transform: `translateX(${(1 - pop(t, 78.3 + k * 0.15)) * 60}px)`}}><Num n={x.n} c={x.c} size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK}}>{x.l}</span></div>)}</div></SearchOpen>}
      {i >= 0 && (
        <>
          <Abs x={40} y={300} w={1000} h={120} style={{display: 'flex', gap: 8}}>
            {SOC.map((x, k) => { const on = k === i; const done = k < i; return <div key={x.n} style={{flex: 1, height: 110, borderRadius: 18, background: on ? x.c : done ? `${x.c}33` : '#fff', border: `4px solid ${on || done ? x.c : '#C9D2DF'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: on ? `0 0 26px ${x.c}` : 'none', transform: `scale(${on ? 1.06 : 1})`}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: on ? '#fff' : done ? x.c : '#9AA7BC'}}>{done ? '✓ ' : ''}{x.n}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 21, color: on ? '#fff' : done ? x.c : '#9AA7BC'}}>{x.l.toUpperCase()}</div></div>; })}
          </Abs>
          <Abs x={40} y={308} w={1000} h={8} style={{background: 'transparent'}}><div style={{width: `${((i + Math.min(1, lt / 5)) / 5) * 100}%`, height: 6, background: S0.c, borderRadius: 3, boxShadow: `0 0 12px ${S0.c}`}} /></Abs>
          <Abs x={60} y={450} w={960} h={920} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 30, boxShadow: `9px 9px 0 ${S0.c}`, overflow: 'hidden', opacity: pop(t, S0.at), transform: `translateY(${(1 - prog(t, S0.at, S0.at + 0.5, easeOut)) * 120}px)`}}>
            <div style={{height: 120, background: S0.c, display: 'flex', alignItems: 'center', gap: 22, padding: '0 30px'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: 'rgba(255,255,255,0.45)'}}>{S0.n}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: '#fff'}}>{S0.l}</div></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 120, bottom: 0}}>
              {i === 0 && <>
                <div style={{position: 'absolute', left: 380, top: 40, opacity: pop(t, 81.82)}}><F n="directeur" size={200} /></div>
                <svg width={960} height={800} style={{position: 'absolute', left: 0, top: 0}}><line x1={480} y1={250} x2={480} y2={620} stroke={NAVY} strokeWidth={12} strokeDasharray={370} strokeDashoffset={370 * (1 - p(83.0, 84.6))} /><path d="M450 600 L480 650 L510 600" fill="none" stroke={NAVY} strokeWidth={12} opacity={p(84.4, 84.7)} /></svg>
                {['stratégie', 'décisions', 'équipes'].map((l, k) => <div key={l} style={{position: 'absolute', left: 140 + k * 30, right: 140 + k * 30, top: 300 + k * 120, height: 90, borderRadius: 16, background: `${NAVY}${['33', '22', '14'][k]}`, border: `4px solid ${NAVY}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: NAVY, opacity: pop(t, 83.3 + k * 0.6)}}>{l}</div>)}
                <div style={{position: 'absolute', left: 0, right: 0, top: 700, textAlign: 'center'}}><Pill at={84.9} c={NAVY} size={28}>porté par la direction · de haut en bas</Pill></div>
              </>}
              {i === 1 && <>
                <div style={{position: 'absolute', left: 60, right: 60, top: 60, height: 14, borderRadius: 7, background: '#E3E8EF'}} />
                <div style={{position: 'absolute', left: 60, width: 840 * p(87.3, 100.0), top: 60, height: 14, borderRadius: 7, background: `linear-gradient(90deg, ${GREEN}, ${RED})`}} />
                <div style={{position: 'absolute', left: 620, top: 30, width: 70, height: 70, borderRadius: 35, background: RED, border: `5px solid ${INK}`, color: '#fff', fontWeight: 900, fontSize: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 91.0)}}>!</div>
                <div style={{position: 'absolute', left: 560, top: 110, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: RED, opacity: pop(t, 91.0)}}>incident</div>
                <div style={{position: 'absolute', left: 520, top: 190, width: 400, height: 220, borderRadius: 20, border: `4px dashed ${DIM}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 91.02)}}><F n="pansement" size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM}}>corriger après</div></div>
                <div style={{position: 'absolute', left: 40, top: 190, width: 440, height: 220, borderRadius: 20, background: `${GREEN}22`, border: `5px solid ${GREEN}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 93.22), transform: `scale(${0.7 + 0.3 * pop(t, 93.22)})`}}><F n="bouclier" size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: GREEN}}>anticiper avant</div></div>
                <div style={{position: 'absolute', left: 50, right: 50, top: 460, display: 'flex', flexDirection: 'column', gap: 14}}>{[{l: 'anticiper les risques', a: 93.22}, {l: 'identifier les opportunités d’amélioration', a: 95.18}, {l: 'agir avant les incidents et non-conformités', a: 96.46}].map((x) => <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 14, opacity: pop(t, x.a)}}><Check at={x.a} label="" c={GREEN} size={46} /><span style={{fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: INK}}>{x.l}</span></div>)}</div>
              </>}
              {i === 2 && <>
                {[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 60 + k * 300, top: 120, width: 240, height: 150, borderRadius: 20, background: BLUE, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, textAlign: 'center', opacity: pop(t, 104.58 + k * 0.5), transform: `translateY(${(1 - pop(t, 104.58 + k * 0.5)) * -60}px)`}}>activité {k + 1}</div>)}
                <svg width={960} height={800} style={{position: 'absolute', left: 0, top: 0}}>{[0, 1].map((k) => <g key={k} opacity={p(108.0 + k * 0.4, 108.5 + k * 0.4)}><line x1={300 + k * 300} y1={195} x2={360 + k * 300} y2={195} stroke={INK} strokeWidth={8} /><path d={`M${348 + k * 300} 182 L${364 + k * 300} 195 L${348 + k * 300} 208`} fill={INK} /></g>)}<path d="M180 270 C 180 380, 780 380, 780 270" fill="none" stroke={BLUE} strokeWidth={6} strokeDasharray="14 10" strokeDashoffset={-t * 40} opacity={p(109.62, 110.2)} /></svg>
                <div style={{position: 'absolute', left: 0, right: 0, top: 420, display: 'flex', justifyContent: 'center', gap: 16}}><Pill at={109.62} c={BLUE} size={30}>interactions</Pill><Pill at={111.26} c={RED} size={30}>risques</Pill><Pill at={112.26} c={GREEN} size={30}>résultats attendus</Pill></div>
                <div style={{position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 52, color: INK, opacity: pop(t, 108.02)}}>des activités qui fonctionnent ensemble</div>
              </>}
              {i === 3 && <>
                <div style={{position: 'absolute', left: 380, top: 220, width: 200, height: 200, borderRadius: 100, background: `${GREEN}22`, border: `6px solid ${GREEN}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 115.1)}}><F n="salarie" size={150} /></div>
                {[{l: 'informations', ic: 'memo', a: 124.26}, {l: 'méthodes', ic: 'clipboard', a: 125.02}, {l: 'compétences', ic: 'cerveau', a: 126.02}, {l: 'outils', ic: 'boite-outils', a: 126.9}].map((x, k) => { const ang = (k / 4) * Math.PI * 2 - Math.PI / 4; const q = prog(t, x.a, x.a + 0.5, easeOut); return <div key={x.l} style={{position: 'absolute', left: 480 + Math.cos(ang) * lerp(560, 300, q) - 110, top: 320 + Math.sin(ang) * lerp(500, 240, q) - 50, width: 220, height: 100, borderRadius: 50, background: '#fff', border: `5px solid ${GREEN}`, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', boxSizing: 'border-box', opacity: q}}><F n={x.ic} size={56} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK}}>{x.l}</span></div>; })}
                <div style={{position: 'absolute', left: 0, right: 0, top: 30, textAlign: 'center'}}><Pill at={117.94} c={GREEN} size={32}>aider le personnel à faire bien</Pill></div>
                <div style={{position: 'absolute', left: 0, right: 0, top: 650, textAlign: 'center', opacity: pop(t, 119.78)}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: DIM, position: 'relative'}}>compliquer inutilement le travail<div style={{position: 'absolute', left: -10, right: -10, top: 18}}><Strike p={prog(t, 120.9, 121.6)} c={RED} /></div></span></div>
              </>}
              {i === 4 && <>
                <svg width={960} height={800} style={{position: 'absolute', left: 0, top: 0}}><circle cx={480} cy={360} r={230} fill="none" stroke={`${ORANGE}55`} strokeWidth={14} /><circle cx={480} cy={360} r={230} fill="none" stroke={ORANGE} strokeWidth={14} strokeDasharray={1445} strokeDashoffset={1445 * (1 - p(131.9, 135.6))} transform="rotate(-90 480 360)" /></svg>
                {[{l: 'mesurer', a: 131.94}, {l: 'analyser', a: 133.22}, {l: 'apprendre', a: 134.18}, {l: 'corriger', a: 134.66}, {l: 'progresser', a: 135.2}].map((x, k) => { const ang = (k / 5) * Math.PI * 2 - Math.PI / 2; return <div key={x.l} style={{position: 'absolute', left: 480 + Math.cos(ang) * 230 - 100, top: 360 + Math.sin(ang) * 230 - 40, width: 200, height: 80, borderRadius: 40, background: t > x.a ? ORANGE : '#fff', border: `5px solid ${ORANGE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: t > x.a ? '#fff' : ORANGE, transform: `scale(${0.6 + 0.4 * pop(t, x.a)})`}}>{x.l}</div>; })}
                <div style={{position: 'absolute', left: 380, top: 280, opacity: pop(t, 130.14)}}><F n="hausse" size={180} /></div>
              </>}
            </div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 3 · L'ARCHITECTE ═════════════ */
const FLOORS = [{l: 'Fondation', a: 146.02, c: NAVY}, {l: 'Processus', a: 147.3, c: BLUE}, {l: 'Responsabilités', a: 148.02, c: TEAL}, {l: 'Indicateurs', a: 149.58, c: GREEN}, {l: 'Amélioration', a: 150.86, c: ORANGE}];
const PILLARS = [{l: 'Direction', s: 'donne les moyens', a: 160.3, ic: 'directeur'}, {l: 'Managers', s: 'montrent l’exemple', a: 162.38, ic: 'superviseur'}, {l: 'Collaborateurs', s: 'impliqués', a: 164.58, ic: 'equipe'}, {l: 'Fournisseurs', s: 'pris en compte', a: 166.54, ic: 'camion'}];
const Architecte: React.FC = () => {
  const t = useT();
  const ph = t < 154.4 ? 0 : 1;
  return (
    <Out end={169.9}>
      {ph === 0 && (
        <>
          <HiLine words={['L’architecte', 'du', 'système']} mark={[0, 2]} at={140.6} y={330} size={62} />
          <Abs x={60} y={440} w={560} h={940}>
            <svg width={560} height={940} style={{position: 'absolute', left: 0, top: 0}}><path d={`M40 ${880 - FLOORS.length * 140} L280 ${720 - FLOORS.length * 140} L520 ${880 - FLOORS.length * 140}`} fill={RED} stroke={INK} strokeWidth={6} opacity={pop(t, 151.6)} /></svg>
            {FLOORS.map((f, k) => { const q = prog(t, f.a, f.a + 0.5, easeOut); return <div key={f.l} style={{position: 'absolute', left: 40, width: 480, top: 880 - (k + 1) * 140, height: 130, borderRadius: 12, background: f.c, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 38, opacity: q, transform: `translateY(${(1 - q) * -500}px)`}}>{f.l}</div>; })}
            <div style={{position: 'absolute', left: 0, top: 870, width: 560, height: 20, background: INK, borderRadius: 4}} />
          </Abs>
          <Abs x={640} y={440} w={380} h={940}>
            <div style={{width: 380, height: 560, borderRadius: 26, overflow: 'hidden', border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${VIO}`, opacity: pop(t, 143.94), transform: `translateX(${(1 - pop(t, 143.94)) * 300}px)`}}><Pic src={IMG.architecte} ic="superviseur" w={380} h={560} pos="50% 20%" /></div>
            <div style={{marginTop: 16, background: VIO, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 32, textAlign: 'center', padding: '10px 0', borderRadius: 14, border: `4px solid ${INK}`, opacity: pop(t, 144.6)}}>RESPONSABLE QSSE</div>
            <div style={{marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10}}>{[{l: 'construire le cadre', a: 146.02}, {l: 'assurer la cohérence', a: 148.02}, {l: 'accompagner les équipes', a: 149.58}, {l: 'vérifier l’intégration', a: 150.86}].map((x) => <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 10, opacity: pop(t, x.a)}}><div style={{width: 16, height: 16, borderRadius: 8, background: VIO}} /><span style={{fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: INK}}>{x.l}</span></div>)}</div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Un', 'investissement', 'collectif']} mark={[1, 2]} at={156.7} y={330} size={58} />
          <Abs x={60} y={440} w={960} h={940}>
            <div style={{position: 'absolute', left: 40, right: 40, top: 40, height: 140, borderRadius: 18, background: `radial-gradient(circle at 35% 30%, #5FA9BF, #2F7C93 70%)`, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 52, transform: `translateY(${(1 - prog(t, 160.3, 161.0, easeOut)) * 30}px) rotate(${(1 - prog(t, 166.5, 167.5)) * 3 * Math.sin(t * 6)}deg)`}}>SYSTÈME QSSE</div>
            {t < 160.2 && <div style={{position: 'absolute', left: 300, top: 300, textAlign: 'center', opacity: pop(t, 154.58)}}><F n="superviseur" size={200} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: RED, marginTop: 10}}>seul ? impossible</div></div>}
            {PILLARS.map((p, k) => { const q = prog(t, p.a, p.a + 0.6, easeOut); return <div key={p.l} style={{position: 'absolute', left: 50 + k * 220, top: 190, width: 200, height: 560 * q, background: `linear-gradient(180deg, #fff, #E3E8EF)`, border: `5px solid ${INK}`, borderTop: 'none', borderRadius: '0 0 16px 16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20, boxSizing: 'border-box'}}><F n={p.ic} size={100} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, marginTop: 8}}>{p.l}</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 17, color: DIM, textAlign: 'center'}}>{p.s}</div></div>; })}
            <div style={{position: 'absolute', left: 0, right: 0, top: 790, textAlign: 'center'}}><Pill at={158.66} c={VIO} size={32}>il ne peut pas porter le système seul</Pill></div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 4 · DÈS LA CONCEPTION ═════════════ */
const CHAIN = [{l: 'Conception', ic: 'ampoule'}, {l: 'Réalisation', ic: 'grue'}, {l: 'Fournisseurs', ic: 'camion'}, {l: 'Exploitation', ic: 'usine'}, {l: 'Résultats', ic: 'trophee'}];
const Conception: React.FC = () => {
  const t = useT();
  const ph = t < 193.6 ? 0 : 1;
  const run = prog(t, 196.3, 202.3, easeInOut);
  return (
    <Out end={203.3}>
      {ph === 0 && (
        <>
          <HiLine words={['Dès', 'la', 'conception']} mark={[0, 2]} at={172.9} y={330} size={62} />
          <Shot src={IMG.conception} ic="batiment" x={60} y={440} w={960} h={420} at={176.8} c={ORANGE} blinds />
          <Abs x={60} y={440} w={960} h={420} style={{pointerEvents: 'none'}}><div style={{position: 'absolute', left: 24, top: 24, display: 'flex', gap: 10}}>{[{l: 'projet', a: 178.66}, {l: 'produit', a: 179.94}, {l: 'équipement', a: 180.7}, {l: 'nouvelle activité', a: 181.4}].map((x) => <Pill key={x.l} at={x.a} c={NAVY} size={24}>{x.l}</Pill>)}</div></Abs>
          <Abs x={60} y={890} w={960} h={170} style={{display: 'flex', gap: 14}}>{[{l: 'Qualité', c: BLUE, a: 183.22}, {l: 'Santé', c: GREEN, a: 184.86}, {l: 'Sécurité', c: ORANGE, a: 185.7}, {l: 'Environnement', c: TEAL, a: 186.3}].map((x) => { const on = t > x.a; return <div key={x.l} style={{flex: 1, borderRadius: 20, background: on ? x.c : '#fff', border: `5px solid ${x.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: on ? '#fff' : x.c, fontFamily: sansFont, fontWeight: 900, fontSize: x.l.length > 9 ? 22 : 28, transform: `scale(${0.6 + 0.4 * pop(t, x.a)})`, boxShadow: on ? `0 0 20px ${x.c}` : 'none'}}><div style={{fontSize: 44}}>{on ? '✓' : '○'}</div>{x.l}</div>; })}</Abs>
          <Abs x={60} y={1080} w={960} h={300} style={{background: NIGHT, border: `5px solid ${INK}`, borderRadius: 24, overflow: 'hidden', opacity: pop(t, 188.94)}}>
            <div style={{position: 'absolute', left: 24, top: 14, fontFamily: MONO, fontWeight: 700, fontSize: 20, color: '#9AA7BC'}}>coût d’une correction selon le moment</div>
            <svg width={960} height={300} style={{position: 'absolute', left: 0, top: 0}}><path d="M60 250 C 400 245, 650 220, 900 60" fill="none" stroke={RED} strokeWidth={8} strokeDasharray={1000} strokeDashoffset={1000 * (1 - prog(t, 191.14, 192.9))} /><circle cx={90} cy={250} r={18} fill={GREEN} opacity={pop(t, 190.06)} /></svg>
            <div style={{position: 'absolute', left: 50, bottom: 14, fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: GREEN, opacity: pop(t, 190.06)}}>anticiper ici</div>
            <div style={{position: 'absolute', right: 40, top: 80, fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: '#FF8A7A', opacity: pop(t, 192.14)}}>corriger plus tard</div>
          </Abs>
          <Stamp at={187.0} c={ORANGE} text="QSSE intégré dès la conception" x={120} y={560} rot={-6} size={40} />
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Toute', 'la', 'chaîne', 'de', 'valeur']} mark={[2, 4]} at={193.7} y={330} size={60} />
          <Abs x={60} y={460} w={960} h={900}>
            <div style={{position: 'absolute', left: 80, right: 80, top: 420, height: 16, borderRadius: 8, background: '#E3E8EF'}} />
            <div style={{position: 'absolute', left: 80, width: 800 * run, top: 420, height: 16, borderRadius: 8, background: `linear-gradient(90deg, ${ORANGE}, ${GREEN})`, boxShadow: `0 0 16px ${ORANGE}`}} />
            {CHAIN.map((c, k) => { const x = 80 + k * 200; const on = run * 4 >= k - 0.05; const sup = k === 2 && t > 194.74; return <div key={c.l} style={{position: 'absolute', left: x - 90, top: k % 2 ? 470 : 170, width: 180, textAlign: 'center', opacity: pop(t, 194.0 + k * 0.25)}}><div style={{margin: '0 auto', width: 160, height: 160, borderRadius: 80, background: on ? '#fff' : '#F1F3F6', border: `7px solid ${sup ? YEL : on ? ORANGE : '#C9D2DF'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: sup ? `0 0 30px ${YEL}` : 'none'}}><F n={c.ic} size={96} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, marginTop: 8}}>{c.l}</div></div>; })}
            {t > 196.3 && <div style={{position: 'absolute', left: 80 + 800 * run - 30, top: 398, width: 60, height: 60, borderRadius: 30, background: ORANGE, border: '6px solid #fff', boxShadow: `0 0 26px ${ORANGE}`}} />}
            <div style={{position: 'absolute', left: 0, right: 0, top: 780, textAlign: 'center'}}><Pill at={198.82} c={DIM} size={28}>pas seulement à l’intérieur de l’entreprise</Pill></div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 5a · LES OUTILS DU QUOTIDIEN ═════════════ */
const TOOLS = [{l: 'Référentiels & guides', s: 'un cadre commun', ic: 'livres', a: 208.74, c: BLUE}, {l: 'Approche processus', s: 'maîtriser les activités', ic: 'engrenage', a: 212.34, c: TEAL}, {l: 'Résolution de problèmes', s: 'causes → actions efficaces', ic: 'loupe', a: 216.74, c: ORANGE}, {l: 'Réunions minute', s: 'communication · suivi', ic: 'chrono', a: 222.86, c: VIO}, {l: 'Valoriser les résultats', s: 'efforts reconnus · progrès mesurés', ic: 'trophee', a: 229.9, c: GREEN}];
const Outils: React.FC = () => {
  const t = useT();
  const open = prog(t, 205.0, 206.4, easeOut);
  const feed = (k: number) => (k < TOOLS.length - 1 ? prog(t, TOOLS[k + 1].a - 0.9, TOOLS[k + 1].a - 0.1, easeIn) : prog(t, 237.4, 238.2, easeIn));
  return (
    <Out end={238.4}>
      <HiLine words={['Les', 'outils', 'du', 'quotidien']} mark={[1, 3]} at={203.5} y={330} size={62} />
      <Abs x={60} y={440} w={960} h={940}>
        <div style={{position: 'absolute', left: 330, top: 0, width: 300, height: 300, borderRadius: 150, background: `radial-gradient(circle at 35% 30%, #5FA9BF, #2F7C93 70%)`, border: `8px solid ${INK}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 44, lineHeight: 1, boxShadow: `0 0 ${20 + 50 * TOOLS.filter((_, k) => feed(k) >= 1).length / 5}px rgba(47,124,147,0.9)`}}>Système<br />QSSE</div>
        <div style={{position: 'absolute', left: 280, top: 690, width: 400, height: 200, borderRadius: '0 0 24px 24px', background: RED, border: `6px solid ${INK}`}} />
        <div style={{position: 'absolute', left: 260, top: 640, width: 440, height: 70, borderRadius: 14, background: '#C93A3F', border: `6px solid ${INK}`, transformOrigin: '20px 70px', transform: `translate(${-open * 330}px, ${-open * 60}px) rotate(${-open * 14}deg)`}} />
        <div style={{position: 'absolute', left: 280, top: 760, width: 400, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff'}}>BOÎTE À OUTILS QSSE</div>
        {TOOLS.map((x, k) => { const out = prog(t, x.a, x.a + 0.6, easeOut); const f = feed(k); const tx = 0; const cur = t >= x.a && (k === TOOLS.length - 1 || t < TOOLS[k + 1].a); return t >= x.a && <div key={x.l} style={{position: 'absolute', left: 480 + lerp(lerp(0, tx, out), 0, f) - 95, top: lerp(lerp(700, 480, out), 150, f) - 95, width: 190, textAlign: 'center', opacity: 1 - f * 0.9, transform: `scale(${(cur && f === 0 ? 1.25 : 1) * (1 - f * 0.6)})`, zIndex: cur ? 3 : 1}}>
          <div style={{margin: '0 auto', width: 130, height: 130, borderRadius: 26, background: '#fff', border: `6px solid ${x.c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 20px ${x.c}`}}><F n={x.ic} size={86} /></div>
          {cur && f === 0 && <div style={{marginTop: 8, background: x.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 24, padding: '6px 8px', borderRadius: 12, border: `3px solid ${INK}`, lineHeight: 1.05}}>{x.l}</div>}
          {cur && f === 0 && <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 17, color: DIM, marginTop: 4}}>{x.s}</div>}
        </div>; })}
        {t > 231.8 && <div style={{position: 'absolute', left: 60, right: 60, top: 896, height: 40, borderRadius: 20, background: '#E3E8EF', border: `4px solid ${INK}`, overflow: 'hidden', opacity: pop(t, 231.8)}}><div style={{width: `${100 * prog(t, 232.4, 236.9)}%`, height: '100%', background: `linear-gradient(90deg, ${GREEN}, ${YEL})`}} /></div>}
        {t > 231.8 && <div style={{position: 'absolute', left: 60, right: 60, top: 896, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: INK, opacity: pop(t, 232.4)}}>{t < 236.9 ? 'efforts reconnus · progrès mesurés' : 'une dynamique plus forte ↑'}</div>}
      </Abs>
    </Out>
  );
};

/* ═════════════ 5b · LE CHEF DE PROJET ═════════════ */
const ACT = [{l: 'Direction', ic: 'directeur'}, {l: 'QSSE', ic: 'casque'}, {l: 'Équipes', ic: 'equipe'}, {l: 'Fournisseurs', ic: 'camion'}];
const Chef: React.FC = () => {
  const t = useT();
  const ph = t < 253.6 ? 0 : 1;
  const drag = prog(t, 255.2, 257.6, easeInOut);
  return (
    <Out end={259.4}>
      {ph === 0 && (
        <>
          <HiLine words={['Le', 'chef', 'de', 'projet']} mark={[1, 3]} at={240.8} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={600}>
            {ACT.map((a, k) => { const ang = (k / 4) * Math.PI * 2 - Math.PI / 4; const x = 480 + Math.cos(ang) * 340, y = 300 + Math.sin(ang) * 220; return <React.Fragment key={a.l}><svg width={960} height={600} style={{position: 'absolute', left: 0, top: 0}}><line x1={480} y1={300} x2={x} y2={y} stroke={GOLD} strokeWidth={8} strokeDasharray={420} strokeDashoffset={420 * (1 - prog(t, 247.46 + k * 0.25, 248.2 + k * 0.25))} /></svg><div style={{position: 'absolute', left: x - 90, top: y - 70, width: 180, textAlign: 'center', opacity: pop(t, 241.0 + k * 0.3)}}><div style={{margin: '0 auto', width: 110, height: 110, borderRadius: 55, background: '#fff', border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={a.ic} size={76} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK}}>{a.l}</div></div></React.Fragment>; })}
            <div style={{position: 'absolute', left: 480 - 130, top: 300 - 130, width: 260, height: 260, borderRadius: 130, overflow: 'hidden', border: `8px solid ${GOLD}`, boxShadow: `0 0 0 5px ${INK}, 0 0 ${30 + 20 * Math.sin(t * 4)}px ${GOLD}`, background: '#fff', opacity: pop(t, 241.98)}}><Pic src={IMG.chef} ic="superviseur" w={260} h={260} /></div>
            <div style={{position: 'absolute', left: 480 - 130, top: 300 + 140, width: 260, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: GOLD, opacity: pop(t, 242.5)}}>CHEF DE PROJET</div>
          </Abs>
          <Abs x={60} y={1060} w={960} h={320} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `7px 7px 0 ${GOLD}`, padding: '20px 26px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
            {[{l: 'intégrer les exigences QSSE', a: 244.06}, {l: 'coordonner les acteurs', a: 247.46}, {l: 'anticiper les risques', a: 249.46}, {l: 'objectifs respectés', a: 251.1}].map((x) => <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 12, opacity: pop(t, x.a)}}><Check at={x.a} label="" c={GOLD} size={46} /><span style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: INK, lineHeight: 1.1}}>{x.l}</span></div>)}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Intégré', 'dès', 'le', 'départ']} mark={[0, 3]} at={256.8} y={330} size={62} />
          <Abs x={60} y={460} w={960} h={900}>
            <div style={{position: 'absolute', left: 40, right: 40, top: 200, height: 160, display: 'flex', gap: 10}}>{['Départ', 'Conception', 'Réalisation', 'Livraison', 'Fin'].map((l, k) => <div key={l} style={{flex: 1, borderRadius: 16, background: '#F1F3F6', border: `4px solid ${INK}`, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 12, fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: DIM, opacity: pop(t, 253.7 + k * 0.1)}}>{l}</div>)}</div>
            <div style={{position: 'absolute', left: lerp(40 + 4 * 180 + 6, 46, drag), top: 214, width: 160, height: 80, borderRadius: 14, background: drag > 0.98 ? GREEN : RED, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 32, boxShadow: `0 0 26px ${drag > 0.98 ? GREEN : RED}`, transform: `translateY(${-Math.sin(drag * Math.PI) * 80}px)`}}>QSSE</div>
            <div style={{position: 'absolute', left: 60, right: 60, top: 470, textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 48, color: INK, lineHeight: 1.2, opacity: pop(t, 256.82)}}>« Le QSSE ne s’ajoute pas à la fin.<br />Il se construit dès le départ. »</div>
            {t < 256.8 && <Stamp at={255.18} c={RED} text="ajouté à la fin" x={560} y={330} rot={-6} size={38} />}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 6 · LA SYNTHÈSE ═════════════ */
const CASC = [{l: 'Faire bien', a: 268.02, c: BLUE}, {l: 'Faire en sécurité', a: 269.66, c: ORANGE}, {l: 'Préserver la santé', a: 271.22, c: GREEN}, {l: 'Protéger l’environnement', a: 272.94, c: TEAL}, {l: 'Résoudre les problèmes', a: 274.7, c: VIO}, {l: 'Prévenir les risques', a: 276.3, c: RED}, {l: 'Améliorer continuellement', a: 277.66, c: GOLD}];
const ALL = [{l: 'Direction', a: 283.14}, {l: 'Managers', a: 284.58}, {l: 'Responsable QSSE', a: 285.9}, {l: 'Chef de projet', a: 287.94}, {l: 'Collaborateurs', a: 289.22}, {l: 'Fournisseurs & partenaires', a: 290.7}];
const Synthese: React.FC = () => {
  const t = useT();
  const ph = t < 267.9 ? 0 : t < 281.0 ? 1 : 2;
  const conv = prog(t, 292.8, 294.2, easeInOut);
  return (
    <Out end={296.2}>
      {ph === 0 && (
        <>
          <HiLine words={['Une', 'démarche', 'de', 'management']} mark={[1, 3]} at={264.9} y={330} size={60} />
          <Abs x={60} y={440} w={960} h={940}>
            <div style={{position: 'absolute', left: 260, top: 40, opacity: pop(t, 260.9) * (1 - prog(t, 264.6, 265.2))}}>{[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: k * 30, top: k * 30, width: 380, height: 480, background: '#fff', border: `5px solid ${INK}`, borderRadius: 12}} />)}<div style={{position: 'absolute', left: 30, top: 230, width: 400}}><Strike p={prog(t, 263.8, 264.4)} c={RED} /></div></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 200, transform: 'scale(0.82)', transformOrigin: '480px 450px', opacity: prog(t, 264.9, 265.6)}}><div style={{position: 'relative', left: -60, top: -460}}><Wheel lit={[]} all at={264.9} /></div></div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['QSSE', '=']} mark={[0]} at={268.0} y={330} size={66} />
          <Abs x={160} y={430} w={760} h={960} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
            {CASC.map((x, k) => { const q = pop(t, x.a); return <React.Fragment key={x.l}>{k > 0 && <div style={{fontSize: 30, color: INK, fontWeight: 900, opacity: q, lineHeight: 1}}>↓</div>}<div style={{width: 640, height: 88, borderRadius: 44, background: x.c, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 36, opacity: q, transform: `translateX(${(1 - q) * (k % 2 ? 300 : -300)}px)`, boxShadow: `0 0 ${t > x.a && t < x.a + 1 ? 30 : 0}px ${x.c}`}}>{x.l}</div></React.Fragment>; })}
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 294.1 ? ['Ça', 'concerne', 'tout', 'le', 'monde'] : ['L’affaire', 'de', 'tous']} mark={t < 294.1 ? [1, 4] : [0, 2]} at={t < 294.1 ? 281.1 : 294.2} y={330} size={60} />
          <Abs x={60} y={440} w={960} h={940}>
            {ALL.map((x, k) => { const ang = (k / ALL.length) * Math.PI * 2 - Math.PI / 2; const R = 360 * (1 - conv); const q = pop(t, x.a); return <div key={x.l} style={{position: 'absolute', left: 480 + Math.cos(ang) * R - 130, top: 470 + Math.sin(ang) * R * 0.95 - 45, width: 260, height: 90, borderRadius: 45, background: '#fff', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${[NAVY, BLUE, VIO, GOLD, GREEN, ORANGE][k]}`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: x.l.length > 16 ? 22 : 28, color: INK, lineHeight: 1.05, opacity: q * (1 - conv), transform: `scale(${0.6 + 0.4 * q})`}}>{x.l}</div>; })}
            <div style={{position: 'absolute', left: 480 - 160 - conv * 60, top: 470 - 160 - conv * 60, width: 320 + conv * 120, height: 320 + conv * 120, borderRadius: 300, background: conv > 0.5 ? `linear-gradient(120deg, ${BLUE}, ${GREEN}, ${ORANGE})` : `radial-gradient(circle at 35% 30%, #5FA9BF, #2F7C93 70%)`, border: `8px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: conv > 0.5 ? 46 : 52, lineHeight: 1, boxShadow: `0 0 ${30 + 60 * conv}px ${conv > 0.5 ? YEL : 'rgba(47,124,147,0.8)'}`}}>{conv > 0.5 ? <span>PERFORMANCE<br />DURABLE</span> : <span>Système<br />QSSE</span>}</div>
          </Abs>
          {t > ALLDONE && <Dust n={22} c={GOLD} />}
        </>
      )}
    </Out>
  );
};

/* ═════════════ 7 · L'ACCOMPAGNEMENT ═════════════ */
const CLUT = [{l: 'exigences', a: 301.22}, {l: 'référentiels', a: 302.34}, {l: 'procédures', a: 303.46}, {l: 'indicateurs', a: 304.62}, {l: 'audits', a: 305.82}, {l: 'prévention des risques', a: 306.98}, {l: 'implication des équipes', a: 308.06}];
const OFFER = [{l: 'clarifier votre démarche', a: 331.06}, {l: 'structurer vos processus', a: 333.86}, {l: 'identifier les priorités', a: 335.78}, {l: 'renforcer vos pratiques QSSE', a: 337.74}, {l: 'dynamique d’amélioration durable', a: 339.94}];
const Accomp: React.FC = () => {
  const t = useT();
  const ph = t < 314.3 ? 0 : t < 343.1 ? 1 : 2;
  const simp = prog(t, 314.3, 315.6, easeInOut);
  return (
    <Out end={OUTRO_AT}>
      {ph === 0 && (
        <>
          <HiLine words={['Sur', 'le', 'terrain', '…']} mark={[2]} at={297.8} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={940} style={{transform: `translate(${t > 309.5 ? Math.sin(t * 40) * 4 : 0}px, 0)`}}>
            <div style={{position: 'absolute', inset: 0, borderRadius: 26, overflow: 'hidden', border: `6px solid ${INK}`, opacity: pop(t, 297.8)}}><Pic src={IMG.surcharge} ic="classeur" w={948} h={928} filter="saturate(0.7)" /></div>
            <AbsoluteFill style={{background: `rgba(21,26,38,${0.3 + 0.35 * prog(t, 301, 309)})`, borderRadius: 26}} />
            {CLUT.map((x, k) => <div key={x.l} style={{position: 'absolute', left: 40 + random(`cx${k}`) * 560, top: 60 + random(`cy${k}`) * 640, transform: `rotate(${(random(`cr${k}`) - 0.5) * 30}deg) scale(${0.6 + 0.4 * pop(t, x.a)})`, opacity: pop(t, x.a)}}><Pill at={x.a} c={RED} size={30}>{x.l}</Pill></div>)}
            {t > 310.6 && <Stamp at={310.66} c={RED} text="lourd" x={40} y={730} rot={-6} size={36} />}
            {t > 311.8 && <Stamp at={311.82} c={RED} text="complexe" x={250} y={790} rot={4} size={36} />}
            {t > 313.1 && <Stamp at={313.18} c={RED} text="difficile à faire vivre" x={470} y={720} rot={-3} size={32} />}
            {t > 308.8 && <div style={{position: 'absolute', left: 60, right: 60, top: 380, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: '#fff', lineHeight: 1.1, textShadow: '0 4px 20px rgba(0,0,0,0.8)', opacity: pop(t, 308.8)}}>Mais comment faire vivre<br />tout cela sur le terrain ?</div>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Structurer', '→', 'simplifier', '→', 'piloter', '→', 'améliorer']} mark={[0, 2, 4, 6]} at={316.5} y={330} size={40} />
          <Abs x={60} y={440} w={960} h={420} style={{opacity: simp}}>
            <Shot src={IMG.accompagnement} ic="poignee" x={0} y={0} w={960} h={420} at={314.4} c={GREEN} />
          </Abs>
          <Abs x={60} y={880} w={960} h={500}>
            {t < 329.9 ? <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30}}>
              <div style={{width: 360, height: 360, borderRadius: 26, background: '#fff', border: `6px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: pop(t, 322.86), filter: t > 325.78 ? 'grayscale(1)' : undefined}}><F n="classeur" size={150} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM}}>purement documentaire</div></div>
              <div style={{fontSize: 70, fontWeight: 900, color: GREEN, opacity: pop(t, 325.0)}}>→</div>
              <div style={{width: 360, height: 360, borderRadius: 26, background: NIGHT, border: `6px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: pop(t, 325.78), transform: `scale(${0.6 + 0.4 * pop(t, 325.78)})`, boxShadow: `0 0 30px ${GREEN}`}}><F n="graphique" size={150} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>réellement piloté</div><div style={{display: 'flex', gap: 8}}><Pill at={327.14} c={GREEN} size={20}>compris</Pill><Pill at={327.9} c={GREEN} size={20}>appliqué</Pill></div></div>
            </div> : <div style={{position: 'absolute', inset: 0, background: '#fff', border: `6px solid ${INK}`, borderRadius: 26, boxShadow: `9px 9px 0 ${GREEN}`, padding: '16px 30px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 4}}>
              <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>MON ACCOMPAGNEMENT</div>
              {OFFER.map((x) => <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 14, opacity: pop(t, x.a), transform: `translateX(${(1 - pop(t, x.a)) * 60}px)`}}><Check at={x.a} label="" c={GREEN} size={40} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>{x.l}</span></div>)}
            </div>}
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 353.7 ? ['Contactez-moi'] : ['Un', 'levier', 'de', 'performance']} mark={t < 353.7 ? [0] : [1, 3]} at={t < 353.7 ? 343.2 : 356.1} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={520} style={{background: NIGHT, border: `7px solid ${INK}`, borderRadius: 32, boxShadow: `0 0 40px ${GREEN}`, overflow: 'hidden', opacity: pop(t, 343.2)}}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 36, display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 22, padding: '10px 26px'}}><Img src={staticFile(LOGO)} style={{height: 80, display: 'block'}} /></div></div>
            <div style={{position: 'absolute', left: 40, right: 40, top: 160, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: '#fff', lineHeight: 1.15}}>Vous souhaitez structurer ou améliorer votre système QSSE ?</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 340, display: 'flex', justifyContent: 'center'}}><div style={{padding: '18px 44px', borderRadius: 50, background: GREEN, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 42, transform: `scale(${t > 345.7 ? 1 + 0.06 * Math.sin(t * 7) : pop(t, 345.7)})`, boxShadow: `0 0 30px ${GREEN}`}}>✉ Contactez-moi</div></div>
          </Abs>
          <Abs x={60} y={990} w={960} h={170} style={{display: 'flex', gap: 14}}>{[{l: 'plus simple', a: 348.46}, {l: 'plus efficace', a: 350.86}, {l: 'plus vivant', a: 352.5}].map((x, k) => <div key={x.l} style={{flex: 1, borderRadius: 22, background: [BLUE, TEAL, GREEN][k], border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 34, opacity: pop(t, x.a), transform: `scale(${0.6 + 0.4 * pop(t, x.a)})`}}>{x.l}</div>)}</Abs>
          <Abs x={60} y={1180} w={960} h={200} style={{opacity: pop(t, 353.74)}}>
            <div style={{position: 'absolute', left: 120, right: 120, top: 120, height: 18, borderRadius: 9, background: INK, transformOrigin: '30% 50%', transform: `rotate(${lerp(10, -12, prog(t, 356.1, 357.6, easeInOut))}deg)`}} />
            <div style={{position: 'absolute', left: 300, top: 138, width: 0, height: 0, borderLeft: '40px solid transparent', borderRight: '40px solid transparent', borderBottom: `60px solid ${GOLD}`}} />
            <div style={{position: 'absolute', left: 60, top: 40, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM, opacity: 1 - prog(t, 356.1, 357)}}><span style={{position: 'relative'}}>une contrainte<div style={{position: 'absolute', left: -6, right: -6, top: 16}}><Strike p={prog(t, 355.4, 356.0)} c={RED} /></div></span></div>
            <div style={{position: 'absolute', right: 40, top: -10, fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: GREEN, opacity: pop(t, 357.7)}}>levier de performance ↑</div>
          </Abs>
        </>
      )}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: at + 0.35 + len * 0.05, s: 'sfx/pop', v: 0.25}, ...rep(at + 0.8 + len * 0.05, 3, 0.12, 'sfx/pop', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const pops = (L: number[], v = 0.2): Sfx[] => L.map((a) => ({at: a, s: 'sfx/pop', v}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, ...flaps(0.1, 14), {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 0.8, s: 'validation', v: 0.18})), {at: ALLDONE, s: 'validation', v: 0.35},
  ...ZOOMS.flatMap((z) => [{at: z.at, s: 'soft-whoosh', v: 0.3, dur: 1}, ...rep(z.at + 0.2, 6, 0.06, 'tick', 0.1), {at: z.at + 1.2, s: 'sfx/rise', v: 0.25, dur: 1.2}, {at: z.at + 2.4, s: 'sfx/whoosh', v: 0.3}]),
  ...LINE.slice(1).map((x) => ({at: x.at, s: 'soft-whoosh', v: 0.2, dur: 1.6})), ...LINE.slice(1).map((x) => ({at: x.at + 1.6, s: 'sfx/ding', v: 0.18})),
  {at: 2.8, s: 'bass-hit', v: 0.3}, ...pops([2.46, 3.22, 3.9, 11.02, 12.9, 14.18]), {at: 8.1, s: 'sfx/rise', v: 0.2, dur: 1},
  ...DOM.map((d) => ({at: d.a, s: 'sfx/whoosh', v: 0.25})), {at: 20.9, s: 'sfx/rise', v: 0.25, dur: 1}, {at: 21.9, s: 'bass-hit', v: 0.4},
  ...rep(24.4, 9, 0.35, 'sfx/thud', 0.15), {at: 28.0, s: 'sfx/swish', v: 0.3}, {at: 28.58, s: 'deep-hit', v: 0.35}, ...VERBS.map((v) => ({at: v.a, s: 'sfx/pop', v: 0.22})),
  ...TRI.map((p) => ({at: p.a, s: 'sfx/ding', v: 0.25})), {at: 60.9, s: 'sfx/rise', v: 0.22, dur: 1}, ...pops([64.66, 65.86]), {at: 66.3, s: 'sfx/swish', v: 0.25}, {at: 67.14, s: 'bass-hit', v: 0.4}, {at: 69.0, s: 'soft-whoosh', v: 0.18, dur: 0.8},
  ...searchCues(75.7, 28, 77.6, 77.9), ...SOC.flatMap((x) => [{at: x.at, s: 'soft-whoosh', v: 0.35, dur: 0.8}, {at: x.at + 0.4, s: 'validation', v: 0.22}]),
  ...pops([83.3, 83.9, 84.5, 91.0, 93.22, 95.18, 96.46, 104.58, 105.08, 105.58, 109.62, 111.26, 112.26, 124.26, 125.02, 126.02, 126.9, 131.94, 133.22, 134.18, 134.66, 135.2], 0.18), {at: 120.9, s: 'sfx/swish', v: 0.25},
  ...FLOORS.map((f) => ({at: f.a + 0.3, s: 'sfx/thud', v: 0.3})), {at: 143.94, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 151.6, s: 'validation', v: 0.25}, ...PILLARS.map((p) => ({at: p.a, s: 'sfx/rise', v: 0.2, dur: 0.6})), {at: 154.58, s: 'deep-hit', v: 0.3},
  {at: 176.8, s: 'soft-whoosh', v: 0.3, dur: 1}, ...pops([178.66, 179.94, 180.7, 181.4]), ...[183.22, 184.86, 185.7, 186.3].map((a) => ({at: a, s: 'sfx/ding', v: 0.2})), {at: 187.0, s: 'tampon', v: 0.55}, {at: 191.14, s: 'sfx/rise', v: 0.2, dur: 1.8},
  ...pops([194.0, 194.25, 194.5, 194.75, 195.0], 0.15), {at: 196.3, s: 'soft-whoosh', v: 0.4, dur: 6}, {at: 202.3, s: 'validation', v: 0.25},
  {at: 205.0, s: 'sfx/thud', v: 0.35}, ...TOOLS.flatMap((x, k) => [{at: x.a, s: 'sfx/whoosh', v: 0.25}, {at: k < TOOLS.length - 1 ? TOOLS[k + 1].a - 0.1 : 238.2, s: 'sfx/ding', v: 0.18}]), {at: 232.4, s: 'sfx/rise', v: 0.2, dur: 4.5},
  ...pops([241.0, 241.3, 241.6, 241.9]), ...[244.06, 247.46, 249.46, 251.1].map((a) => ({at: a, s: 'validation', v: 0.2})), {at: 255.18, s: 'tampon', v: 0.5}, {at: 255.2, s: 'soft-whoosh', v: 0.4, dur: 2.4}, {at: 257.6, s: 'sfx/thud', v: 0.35},
  {at: 263.8, s: 'sfx/swish', v: 0.25}, {at: 264.9, s: 'sfx/rise', v: 0.22, dur: 1}, ...CASC.map((x) => ({at: x.a, s: 'sfx/pop', v: 0.22})), ...ALL.map((x) => ({at: x.a, s: 'sfx/ding', v: 0.18})), {at: 292.8, s: 'sfx/rise', v: 0.25, dur: 1.4}, {at: 294.2, s: 'bass-hit', v: 0.45},
  ...CLUT.map((x) => ({at: x.a, s: 'notification', v: 0.12})), ...[310.66, 311.82, 313.18].map((a) => ({at: a, s: 'tampon', v: 0.45})), {at: 308.8, s: 'deep-hit', v: 0.35},
  {at: 314.3, s: 'soft-whoosh', v: 0.5, dur: 1.4}, {at: 315.6, s: 'validation', v: 0.3}, {at: 325.78, s: 'bass-hit', v: 0.3}, ...OFFER.map((x) => ({at: x.a, s: 'validation', v: 0.2})),
  {at: 343.2, s: 'sfx/whoosh', v: 0.3}, {at: 345.7, s: 'notification', v: 0.35}, ...pops([348.46, 350.86, 352.5], 0.22), {at: 355.4, s: 'sfx/swish', v: 0.25}, {at: 356.1, s: 'sfx/rise', v: 0.25, dur: 1.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const SystemeQsse: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={40.95}><Intro /></Gate>
    <Gate from={41.0} to={72.75}><Triple /></Gate>
    <Gate from={72.8} to={136.55}><Socles /></Gate>
    <Gate from={136.6} to={169.95}><Architecte /></Gate>
    <Gate from={170.0} to={203.35}><Conception /></Gate>
    <Gate from={203.4} to={238.45}><Outils /></Gate>
    <Gate from={238.4} to={259.45}><Chef /></Gate>
    <Gate from={259.5} to={296.25}><Synthese /></Gate>
    <Gate from={296.2} to={OUTRO_AT}><Accomp /></Gate>
    {ZOOMS.map((z, i) => <Gate key={`z${i}`} from={z.at} to={z.at + 2.7}><MapZoom i={i} /></Gate>)}
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}><Gyro i={i} /></Gate>)}
    <Gate from={238.4} to={240.4}><Banner at={238.4} title="Le rôle du chef de projet" c={GOLD} sub="coordonner" /></Gate>
    <Gate from={296.2} to={298.2}><Banner at={296.2} title="Sur le terrain" c={RED} sub="l’accompagnement" /></Gate>
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={358.9}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-systeme-qsse-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Kin, Brut, T, TitleBlock, Win, GLASS, Tile, Card, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, spring, LoupeSweep, PneuDeliver, Count, BURG];
