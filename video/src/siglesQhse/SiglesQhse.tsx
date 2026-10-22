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
 * « Les sigles importants en QHSE » (1 min) — capsule « condensé + effet wahou + ultra premium » présentée en métro :
 * 20 sigles = 20 stations d'une ligne multicolore (une couleur par famille), la rame réaliste les dessert au rythme de
 * la voix. À chaque sigle : les lettres claquent en tuiles (flip), puis une BARRE DE RECHERCHE tape progressivement la
 * signification complète, trouve le résultat et OUVRE la fiche (nom anglais, famille, visuel animé : pyramide des
 * cas, jauge d'indicateur, arête de poisson, arbre des causes, 5 pourquoi, étapes JSA). Voix d'origine (sans musique),
 * sous-titres calés mot à mot, photos générées (ChatGPT) d'après prompts-images-sigles-qhse.md. Fil rouge : tube
 * pneumatique à six guichets adaptés aux familles ; gyrophare express à chaque changement de famille.
 */
const IMG = {
  cover: '',
  evenements: '',
  indicateurs: '',
  international: '',
  classification: '',
  gravite: '',
  analyse: '',
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
const OUTRO_AT = 57.2;
export const SIGLES_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 2.7, n: '1', title: 'Les événements', s: 'AT · PA', c: RED, g: 'événements', k: 'gyro', lab: 'FAMILLE 1 / 6'},
  {at: 7.7, n: '2', title: 'Indicateurs', s: 'TF · TG · IF · IG', c: BLUE, g: 'indicateurs', k: 'gyro', lab: 'FAMILLE 2 / 6'},
  {at: 15.6, n: '3', title: 'Reporting international', s: 'LTI · LTIR · TRIR', c: VIO, g: 'international', k: 'gyro', lab: 'FAMILLE 3 / 6'},
  {at: 24.6, n: '4', title: 'Classification des cas', s: 'MTI · FAI · RWC · DART', c: ORANGE, g: 'classification', k: 'gyro', lab: 'FAMILLE 4 / 6'},
  {at: 38.1, n: '5', title: 'Gravité', s: 'SIF · SIFp', c: BURG, g: 'gravité', k: 'gyro', lab: 'FAMILLE 5 / 6'},
  {at: 43.6, n: '6', title: 'Analyse des causes', s: 'RCA · ICAM · 5 Why · FTA · JSA', c: GREEN, g: 'analyse', k: 'gyro', lab: 'FAMILLE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 56.2;
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

type Sg = {s: string; m: string; en?: string; f: number; a: number; viz: string};
const SG: Sg[] = [
  {s: 'AT', m: 'Accident du travail', f: 0, a: 2.8, viz: 'at'},
  {s: 'PA', m: 'Presque accident', en: 'Near miss', f: 0, a: 5.6, viz: 'pa'},
  {s: 'TF', m: 'Taux de fréquence', f: 1, a: 7.8, viz: 'gauge'},
  {s: 'TG', m: 'Taux de gravité', f: 1, a: 9.7, viz: 'gauge'},
  {s: 'IF', m: 'Indice de fréquence', f: 1, a: 11.7, viz: 'gauge'},
  {s: 'IG', m: 'Indice de gravité', f: 1, a: 13.8, viz: 'gauge'},
  {s: 'LTI', m: 'Accident avec arrêt de travail', en: 'Lost Time Injury', f: 2, a: 15.7, viz: 'pyr'},
  {s: 'LTIR', m: 'Taux de fréquence des accidents avec arrêt', en: 'Lost Time Injury Rate', f: 2, a: 18.2, viz: 'globe'},
  {s: 'TRIR', m: 'Taux d’incidence des accidents enregistrables', en: 'Total Recordable Incident Rate', f: 2, a: 21.4, viz: 'globe'},
  {s: 'MTI', m: 'Accident nécessitant un traitement médical', en: 'Medical Treatment Injury', f: 3, a: 24.7, viz: 'pyr'},
  {s: 'FAI', m: 'Accident nécessitant uniquement des premiers soins', en: 'First Aid Injury', f: 3, a: 27.8, viz: 'pyr'},
  {s: 'RWC', m: 'Cas avec restriction de travail', en: 'Restricted Work Case', f: 3, a: 31.0, viz: 'pyr'},
  {s: 'DART', m: 'Jours d’absence, de restriction ou de changement de poste', en: 'Days Away, Restricted or Transferred', f: 3, a: 34.3, viz: 'cal'},
  {s: 'SIF', m: 'Blessure grave ou mortelle', en: 'Serious Injury or Fatality', f: 4, a: 38.2, viz: 'pyr'},
  {s: 'SIFp', m: 'Potentiel de blessure grave ou mortelle', en: 'SIF potential', f: 4, a: 40.6, viz: 'sifp'},
  {s: 'RCA', m: 'Analyse des causes racines', en: 'Root Cause Analysis', f: 5, a: 43.7, viz: 'fish'},
  {s: 'ICAM', m: 'Méthode d’analyse des causes d’incident', en: 'Incident Cause Analysis Method', f: 5, a: 46.2, viz: 'icam'},
  {s: '5 Why', m: 'Méthode des 5 pourquoi', f: 5, a: 49.0, viz: 'why'},
  {s: 'FTA', m: 'Analyse par arbre des causes', en: 'Fault Tree Analysis', f: 5, a: 51.4, viz: 'tree'},
  {s: 'JSA', m: 'Analyse de sécurité du travail', en: 'Job Safety Analysis', f: 5, a: 54.1, viz: 'jsa'},
];
const FAMC = [RED, BLUE, VIO, ORANGE, BURG, GREEN];
const FAMIMG = ['evenements', 'indicateurs', 'international', 'classification', 'gravite', 'analyse'];
const FAMIC = ['ambulance', 'graphique', 'globe', 'pansement', 'crane', 'loupe'];
const end = (i: number) => (i < SG.length - 1 ? SG[i + 1].a : OUTRO_AT);
const PYR = ['SIF', 'LTI', 'RWC', 'MTI', 'FAI', 'PA'];

/** Gyrophare express (bandeau) au changement de famille. */
const GyroMini: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const S0 = SECT[i];
  const k = t - S0.at;
  if (k < 0 || k > 1.6) return null;
  const inn = prog(t, S0.at, S0.at + 0.15) * (1 - prog(t, S0.at + 1.25, S0.at + 1.6));
  return (
    <Abs x={0} y={200} w={1080} h={130} style={{zIndex: 36, opacity: inn, overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, background: `conic-gradient(from ${k * 700}deg at 80px 65px, rgba(224,74,63,0.5) 0deg, transparent 30deg, transparent 180deg, rgba(31,111,209,0.5) 180deg, transparent 210deg)`, backgroundColor: PAPER}} />
      <div style={{position: 'absolute', left: 30, top: 25, width: 100, height: 70, borderRadius: '50px 50px 10px 10px', background: `radial-gradient(circle at 50% 40%, #fff, ${S0.c} 60%)`, border: `5px solid ${INK}`, boxShadow: `0 0 ${25 + 25 * Math.abs(Math.sin(k * 11))}px ${S0.c}`}} />
      <div style={{position: 'absolute', left: 150, right: 30, top: 18, height: 92, borderRadius: 18, background: '#fff', border: `5px solid ${INK}`, boxShadow: `7px 7px 0 ${S0.c}`, display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px', transform: `translateX(${(1 - prog(t, S0.at + 0.05, S0.at + 0.4, easeOut)) * 1000}px)`}}>
        <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: S0.c}}>{S0.lab}</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK}}>{S0.title}</div>
      </div>
    </Abs>
  );
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.6, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      {IMG.cover ? <div style={{position: 'absolute', left: 0, top: 200}}><Pic src={IMG.cover} ic="graphique" w={1080} h={700} pos="50% 30%" /></div> : null}
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER} 9%, ${PAPER}00 16%, ${PAPER}00 32%, ${PAPER}DD 40%, ${PAPER} 45%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={60} y={860} w={960} style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10}}>{SG.map((x, k) => <div key={x.s} style={{background: FAMC[x.f], color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 34, padding: '6px 16px', borderRadius: 12, border: `4px solid ${INK}`, transform: `rotate(${(k % 3 - 1) * 3}deg)`, boxShadow: `3px 3px 0 ${INK}`}}>{x.s}</div>)}</Abs>
      <Abs x={0} y={1180} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>LEXIQUE QHSE · 20 SIGLES</div>
        <div style={{marginTop: 16}}><Board text="LES SIGLES" at={-1} h={84} gap={2} c={NAVY} stag={0.02} /></div>
        <div style={{marginTop: 8}}><Board text="IMPORTANTS" at={-1} h={84} gap={2} c={GREEN} stag={0.02} /></div>
      </Abs>
      <Abs x={60} y={1550} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/** Visuels animés de la fiche (lt = secondes depuis l'ouverture). */
const Viz: React.FC<{g: Sg; lt: number; c: string}> = ({g, lt, c}) => {
  const t = useT();
  const p = (a: number, b: number) => prog(lt, a, b, easeOut);
  if (g.viz === 'pyr' || g.viz === 'pa') {
    const hi = g.viz === 'pa' ? 'PA' : g.s;
    return <div style={{width: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>{PYR.map((l, k) => { const on = l === hi; return <div key={l} style={{width: 120 + k * 56, height: 44, borderRadius: 8, background: on ? c : '#E3E8EF', border: `3px solid ${on ? INK : '#C9D2DF'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: on ? '#fff' : DIM, opacity: p(k * 0.06, k * 0.06 + 0.3), transform: `scale(${on ? 1.06 + 0.03 * Math.sin(t * 6) : 1})`, boxShadow: on ? `0 0 20px ${c}` : 'none'}}>{l}</div>; })}<div style={{fontFamily: MONO, fontWeight: 700, fontSize: 16, color: DIM, marginTop: 4}}>pyramide des cas (gravité ↑)</div></div>;
  }
  if (g.viz === 'at') return <div style={{width: 420, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}><div style={{opacity: p(0, 0.3), transform: `scale(${0.6 + 0.4 * p(0, 0.4)})`}}><F n="ambulance" size={150} /></div><div style={{opacity: p(0.3, 0.6)}}><F n="clipboard" size={110} /></div></div>;
  if (g.viz === 'gauge') {
    const a = -70 + 140 * p(0.1, 1.2) * (0.35 + 0.15 * ['TF', 'TG', 'IF', 'IG'].indexOf(g.s));
    return <svg width={420} height={300} viewBox="0 0 420 300"><path d="M60 250 A150 150 0 0 1 360 250" fill="none" stroke="#E3E8EF" strokeWidth={30} strokeLinecap="round" /><path d="M60 250 A150 150 0 0 1 360 250" fill="none" stroke={c} strokeWidth={30} strokeLinecap="round" strokeDasharray={472} strokeDashoffset={472 * (1 - p(0.1, 1.2) * 0.8)} /><g transform={`translate(210 250) rotate(${a})`}><line x1={0} y1={0} x2={0} y2={-120} stroke={INK} strokeWidth={10} strokeLinecap="round" /><circle r={16} fill={INK} /></g><text x={210} y={295} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={18} fill={DIM}>{g.s.startsWith('T') ? 'taux' : 'indice'} · {g.m.includes('fréquence') ? 'fréquence' : 'gravité'}</text></svg>;
  }
  if (g.viz === 'globe') return <div style={{width: 420, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}><div style={{transform: `rotate(${lt * 20}deg)`}}><F n="globe" size={200} /></div>{[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', width: 260 + k * 60, height: 260 + k * 60, borderRadius: '50%', border: `3px dashed ${c}`, opacity: 0.5, transform: `rotate(${-lt * (15 + k * 10)}deg)`}} />)}</div>;
  if (g.viz === 'cal') return <div style={{width: 420, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center'}}>{[{l: 'absence', ic: 'maison'}, {l: 'restriction', ic: 'sens-interdit'}, {l: 'changement de poste', ic: 'relais'}].map((x, k) => <div key={x.l} style={{width: 380, height: 80, borderRadius: 16, background: '#fff', border: `4px solid ${c}`, display: 'flex', alignItems: 'center', gap: 14, padding: '0 16px', opacity: p(k * 0.5, k * 0.5 + 0.3), transform: `translateX(${(1 - p(k * 0.5, k * 0.5 + 0.4)) * 80}px)`}}><F n={x.ic} size={56} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK}}>{x.l}</span></div>)}</div>;
  if (g.viz === 'sifp') return <div style={{width: 420, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16}}><div style={{opacity: p(0, 0.3)}}><F n="danger" size={140} /></div><div style={{fontSize: 60, fontWeight: 900, color: c}}>→</div><div style={{width: 130, height: 130, borderRadius: 65, border: `8px dashed ${c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: c, opacity: p(0.4, 0.8), transform: `scale(${1 + 0.06 * Math.sin(t * 6)})`}}>SIF ?</div></div>;
  if (g.viz === 'fish' || g.viz === 'icam') {
    const bones = [[140, -1], [240, -1], [340, -1], [190, 1], [290, 1]];
    return <svg width={420} height={300} viewBox="0 0 420 300"><line x1={30} y1={150} x2={340} y2={150} stroke={INK} strokeWidth={8} strokeDasharray={320} strokeDashoffset={320 * (1 - p(0, 0.6))} />{bones.map(([x, s0], k) => <line key={k} x1={x} y1={150} x2={x - 60} y2={150 + s0 * 90} stroke={c} strokeWidth={7} strokeLinecap="round" strokeDasharray={120} strokeDashoffset={120 * (1 - p(0.4 + k * 0.12, 0.8 + k * 0.12))} />)}<rect x={345} y={120} width={65} height={60} rx={10} fill={c} opacity={p(0.3, 0.6)} /><text x={377} y={158} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={22} fill="#fff" opacity={p(0.3, 0.6)}>{g.viz === 'icam' ? '!' : '?'}</text>{g.viz === 'icam' && <text x={210} y={290} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={18} fill={DIM}>incident → causes → actions</text>}</svg>;
  }
  if (g.viz === 'why') return <div style={{width: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>{[1, 2, 3, 4, 5].map((k) => <div key={k} style={{width: 140 + k * 40, height: 44, borderRadius: 22, background: k === 5 ? c : '#fff', border: `4px solid ${c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: k === 5 ? '#fff' : c, opacity: p((k - 1) * 0.3, (k - 1) * 0.3 + 0.25)}}>{k === 5 ? 'cause racine' : `pourquoi ? ${k}`}</div>)}</div>;
  if (g.viz === 'tree') {
    const N = [[210, 40], [110, 140], [310, 140], [60, 240], [160, 240], [260, 240], [360, 240]];
    const E = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]];
    return <svg width={420} height={300} viewBox="0 0 420 300">{E.map(([a, b], k) => <line key={k} x1={N[a][0]} y1={N[a][1]} x2={N[b][0]} y2={N[b][1]} stroke={INK} strokeWidth={5} opacity={p(0.2 + k * 0.1, 0.5 + k * 0.1)} />)}{N.map(([x, y], k) => <rect key={k} x={x - 34} y={y - 22} width={68} height={44} rx={10} fill={k === 0 ? RED : c} opacity={p(k * 0.1, k * 0.1 + 0.3)} />)}<text x={210} y={47} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={16} fill="#fff">événement</text></svg>;
  }
  return <div style={{width: 420, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8}}>{[{l: 'étape', ic: 'clipboard'}, {l: 'danger', ic: 'danger'}, {l: 'mesure', ic: 'bouclier'}].map((x, k) => <React.Fragment key={x.l}>{k > 0 && <div style={{fontSize: 34, fontWeight: 900, color: c, opacity: p(k * 0.4, k * 0.4 + 0.2)}}>→</div>}<div style={{width: 110, height: 140, borderRadius: 16, background: '#fff', border: `4px solid ${c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: p(k * 0.4, k * 0.4 + 0.3)}}><F n={x.ic} size={60} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 20, color: INK}}>{x.l}</span></div></React.Fragment>)}</div>;
};

/* ═════════════ La station courante : tuiles + barre de recherche + fiche ═════════════ */
const Station: React.FC = () => {
  const t = useT();
  const i = SG.reduce((a, x, k) => (t >= x.a - 0.05 ? k : a), -1);
  if (i < 0) return null;
  const g = SG[i];
  const c = FAMC[g.f];
  const e = end(i);
  const ts = g.a + 0.35;
  const te = ts + Math.min((e - g.a) * 0.42, Math.max(0.6, Math.min(1.2, g.m.length * 0.028)));
  const typed = Math.floor(prog(t, ts, te) * g.m.length);
  const found = t >= te + 0.05;
  const click = te + 0.15;
  const open = prog(t, click, click + 0.35, easeOut);
  const out = prog(t, e - 0.15, e, easeIn);
  const L = g.s.replace(' ', '').length;
  const tw = Math.min(170, 820 / L);
  return (
    <AbsoluteFill style={{opacity: 1 - out * 0.6}}>
      {/* compteur + famille */}
      <Abs x={60} y={340} w={960} h={70} style={{display: 'flex', alignItems: 'center', gap: 14}}>
        <div style={{background: c, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 24, padding: '8px 18px', borderRadius: 10, border: `3px solid ${INK}`}}>{SECT[g.f].title.toUpperCase()}</div>
        <div style={{marginLeft: 'auto', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: c}}>{String(i + 1).padStart(2, '0')}<span style={{color: DIM, fontSize: 28}}> / 20</span></div>
      </Abs>
      {/* tuiles du sigle */}
      <Abs x={0} y={430} w={1080} h={230} style={{display: 'flex', justifyContent: 'center', gap: 14, perspective: 1000}}>
        {g.s.split('').map((l, k) => { const q = prog(t, g.a + k * 0.07, g.a + k * 0.07 + 0.3, easeOut); return l === ' ' ? <div key={k} style={{width: 20}} /> : <div key={k} style={{width: tw, height: 210, borderRadius: 24, background: `linear-gradient(180deg, ${c}, ${c}CC)`, border: `6px solid ${INK}`, boxShadow: `0 10px 0 ${INK}, 0 0 30px ${c}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: Math.min(150, tw * 0.9), color: '#fff', transform: `rotateX(${(1 - q) * -100}deg)`, transformOrigin: '50% 0'}}>{l}</div>; })}
      </Abs>
      {/* barre de recherche (frappe clavier) */}
      <Abs x={60} y={700} w={960} h={110} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 55, boxShadow: `6px 6px 0 ${c}`, display: 'flex', alignItems: 'center', gap: 16, padding: '0 30px', boxSizing: 'border-box', opacity: pop(t, g.a + 0.15)}}>
        <F n="loupe" size={56} />
        <div style={{flex: 1, fontFamily: sansFont, fontWeight: 800, fontSize: g.m.length > 40 ? 28 : 34, color: INK, lineHeight: 1.1}}>{g.m.slice(0, typed)}<span style={{color: c, opacity: Math.sin(t * 12) > 0 && !found ? 1 : 0}}>▍</span>{typed === 0 && <span style={{color: '#9AA7BC'}}>{g.s} = …</span>}</div>
        <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: found ? GREEN : DIM}}>{found ? '✓ trouvé' : 'recherche…'}</div>
      </Abs>
      {/* fiche ouverte */}
      <Abs x={60} y={840} w={960} h={530} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `9px 9px 0 ${c}`, overflow: 'hidden', opacity: open, transform: `translateY(${(1 - open) * -40}px) scaleY(${0.3 + 0.7 * open})`, transformOrigin: '50% 0'}}>
        <div style={{height: 100, background: c, display: 'flex', alignItems: 'center', gap: 18, padding: '0 26px'}}>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 58, color: '#fff'}}>{g.s}</div>
          <div style={{flex: 1, fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: 'rgba(255,255,255,0.92)', lineHeight: 1.1}}>{g.en ? <><span style={{fontFamily: MONO, fontSize: 18, opacity: 0.8}}>EN · </span><i>{g.en}</i></> : g.m}</div>
        </div>
        <div style={{display: 'flex', height: 430}}>
          <div style={{width: 420, position: 'relative', overflow: 'hidden', borderRight: `4px solid ${INK}`}}>
            {(IMG as Record<string, string>)[FAMIMG[g.f]] ? <Pic src={(IMG as Record<string, string>)[FAMIMG[g.f]]} ic={FAMIC[g.f]} w={420} h={430} zoom={1.05 + 0.05 * prog(t, click, e)} /> : <div style={{width: 420, height: 430, background: `${c}14`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={FAMIC[g.f]} size={180} /></div>}
            <div style={{position: 'absolute', left: 14, bottom: 14, background: 'rgba(255,255,255,0.94)', borderRadius: 12, padding: '6px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: c, border: `3px solid ${c}`, maxWidth: 380, lineHeight: 1.1}}>{g.m}</div>
          </div>
          <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Viz g={g} lt={t - click} c={c} /></div>
        </div>
      </Abs>
      {open > 0.95 && <LoupeSweep x0={120} y0={720} x1={760} y1={740} a={click + 0.1} b={Math.min(e - 0.2, click + 1.2)} size={120} />}
    </AbsoluteFill>
  );
};

/** Ligne de métro des 20 sigles. */
const Metro: React.FC = () => {
  const t = useT();
  const cur = SG.reduce((a, x, k) => (t >= x.a ? k : a), -1);
  const sx = (k: number) => 40 + k * (880 / (SG.length - 1));
  const mv = cur <= 0 ? 1 : prog(t, SG[cur].a - 0.35, SG[cur].a + 0.05, easeInOut);
  const tx = cur < 0 ? sx(0) - 40 : cur === 0 ? sx(0) : lerp(sx(cur - 1), sx(cur), mv);
  return (
    <Abs x={60} y={1400} w={960} h={104} style={{zIndex: 30, background: 'rgba(255,255,255,0.95)', border: `4px solid ${INK}`, borderRadius: 20, boxShadow: `5px 5px 0 ${INK}`}}>
      {SG.slice(0, -1).map((x, k) => <div key={k} style={{position: 'absolute', left: sx(k), width: sx(k + 1) - sx(k), top: 32, height: 10, background: FAMC[SG[k + 1].f]}} />)}
      {SG.map((x, k) => { const on = k <= cur; const here = k === cur; return <div key={x.s} style={{position: 'absolute', left: sx(k) - 13, top: 24, width: 26, height: 26, borderRadius: 13, background: on ? FAMC[x.f] : '#fff', border: `4px solid ${on ? '#fff' : FAMC[x.f]}`, boxSizing: 'border-box', boxShadow: here ? `0 0 0 3px ${FAMC[x.f]}, 0 0 16px ${FAMC[x.f]}` : on ? `0 0 0 2px ${FAMC[x.f]}` : 'none'}} />; })}
      {SG.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: sx(k) - 30, width: 60, top: k % 2 ? 72 : 56, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: k === cur ? 17 : 12, color: k === cur ? FAMC[x.f] : DIM}}>{x.s}</div>)}
      {cur >= 0 && <Img src={staticFile('metroiso-gen/metro/rame-dessus.png')} style={{position: 'absolute', left: tx - 40, top: 22, width: 80, height: 30, filter: 'drop-shadow(0 0 8px rgba(124,196,255,0.9))'}} />}
    </Abs>
  );
};

/** Final : les 20 sigles en mosaïque cochée. */
const Final: React.FC = () => {
  const t = useT();
  const q = prog(t, 56.2, 56.9, easeOut);
  if (q <= 0) return null;
  return (
    <AbsoluteFill style={{zIndex: 40, background: PAPER, opacity: q}}>
      <Bg />
      <Abs x={0} y={330} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: INK}}>20 sigles à maîtriser</Abs>
      <Abs x={60} y={450} w={960} h={900} style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12}}>{SG.map((x, k) => <div key={x.s} style={{borderRadius: 16, background: FAMC[x.f], border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 34, opacity: prog(t, 56.2 + k * 0.03, 56.5 + k * 0.03), transform: `scale(${0.5 + 0.5 * prog(t, 56.2 + k * 0.03, 56.6 + k * 0.03, easeOut)})`}}>✓ {x.s}</div>)}</Abs>
      <Dust n={20} c={GOLD} />
    </AbsoluteFill>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, ...rep(0.1, 14, 0.06, 'tick', 0.16), {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 1.5},
  ...SECT.flatMap((x) => [{at: x.at, s: 'sfx/whoosh', v: 0.3}, ...rep(x.at + 0.05, 3, 0.12, 'sfx/ding', 0.08)]),
  ...SG.flatMap((g, i) => { const e = end(i); const ts = g.a + 0.35; const te = ts + Math.min((e - g.a) * 0.42, Math.max(0.6, Math.min(1.2, g.m.length * 0.028))); const n = Math.max(3, Math.round((te - ts) / 0.07)); return [{at: g.a - 0.35, s: 'soft-whoosh', v: 0.18, dur: 0.4}, ...g.s.replace(' ', '').split('').map((_, k) => ({at: g.a + k * 0.07, s: 'tick', v: 0.2, dur: 0.3})), ...rep(ts, n, (te - ts) / n, 'sfx/click', 0.07), {at: te + 0.05, s: 'validation', v: 0.18}, {at: te + 0.15, s: 'sfx/click', v: 0.35}, {at: te + 0.18, s: 'soft-whoosh', v: 0.25, dur: 0.5}]; }),
  {at: 56.2, s: 'sfx/rise', v: 0.25, dur: 0.8}, ...SG.map((_, k) => ({at: 56.2 + k * 0.03, s: 'sfx/pop', v: 0.06})), {at: 56.9, s: 'validation', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const SiglesQhse: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.5} to={OUTRO_AT}><Station /></Gate>
    <Gate from={2.5} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={56.1} to={OUTRO_AT}><Final /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 1.7}><GyroMini i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.7}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={57.0}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-sigles-qhse-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Gyro, Kin, Brut, T, TitleBlock, Win, GLASS, Check, Tile, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, spring, Strike, PneuDeliver, Shine, Count, Shot, Stamp, random, HiLine, Pill, ALLDONE, TEAL, YEL, SearchOpen];
