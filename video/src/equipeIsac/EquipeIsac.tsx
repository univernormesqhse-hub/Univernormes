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
 * « L'architecture d'une équipe HSE performante » revoicée par Isac (ElevenLabs, 1 min 16) — capsule « condensé +
 * effet wahou + ultra premium » présentée en métro (6 stations = 6 maillons). L'organigramme se construit sous les
 * yeux du spectateur, filmé par une caméra qui zoome sur chaque rôle ; il se referme en circuit (directives qui
 * descendent, informations qui remontent). Kit capsule-ui-neo-brutal (cartes à ombre dure, badges, sous-titres 2–4 mots)
 * et capsule-recit-illustre (bureau / chantier, avant / après). Couverture : photo + « ÉQUIPE HSE / PERFORMANTE » en
 * lettres-photos animées. Tube à six guichets = six rôles ; gyrophare, loupe, capsule pneumatique, store vénitien ;
 * barre de recherche qui trouve et ouvre « l'architecture en 6 maillons ».
 */
const IMG = {
  cover: 'maturite-gen/proactif.jpg',
  cEq: 'heures-gen/equipe-chantier.jpg',
  cPerf: 'maturite-gen/proactif.jpg',
  bureau: 'influence-gen/bureau.jpg',
  chantier: 'heures-gen/equipe-chantier.jpg',
};
const PORT = (r: string) => `personnages/equipe-hse/${r}.png`;
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
const OUTRO_AT = 76.0;
export const EQUIPE_ISAC_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 13.0, n: '1', title: 'Le responsable HSE', s: 'pilote le système global', c: NAVY, g: 'responsable', k: 'gyro', lab: 'MAILLON 1 / 6'},
  {at: 26.0, n: '2', title: 'Le coordonnateur', s: 'harmonise les procédures', c: BLUE, g: 'coordonnateur', k: 'none', lab: 'MAILLON 2 / 6'},
  {at: 30.1, n: '3', title: 'Le superviseur', s: 'encadre les équipes', c: GREEN, g: 'superviseur', k: 'none', lab: 'MAILLON 3 / 6'},
  {at: 40.9, n: '4', title: 'L’agent HSE', s: 'l’œil expert du terrain', c: ORANGE, g: 'agent', k: 'loupe', lab: 'MAILLON 4 / 6'},
  {at: 48.4, n: '5', title: 'Le relais HSE', s: 'l’information remonte', c: RED, g: 'relais', k: 'tube', lab: 'MAILLON 5 / 6'},
  {at: 58.9, n: '6', title: 'L’assistant HSE', s: 'statistiques pour la direction', c: VIO, g: 'assistant', k: 'store', lab: 'MAILLON 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 69.0;
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

/* ═════════════ La ligne de métro (6 stations = 6 maillons) ═════════════ */
const STATIONS = [
  {n: 1, l: 'Responsable · pilote le système', s: 'responsable', at: 15.0},
  {n: 2, l: 'Coordonnateur · harmonise', s: 'coordonnateur', at: 26.9},
  {n: 3, l: 'Superviseur · encadre', s: 'superviseur', at: 31.0},
  {n: 4, l: 'Agent HSE · inspecte & intervient', s: 'agent', at: 44.6},
  {n: 5, l: 'Relais · signale', s: 'relais', at: 54.6},
  {n: 6, l: 'Assistant · centralise', s: 'assistant', at: 62.7},
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

/* ═════════════ L'organigramme vivant (persistant, filmé par une caméra) ═════════════ */
type Node = {id: string; l: string; x: number; y: number; c: string; at: number};
const NODES: Node[] = [
  {id: 'responsable', l: 'Responsable HSE', x: 480, y: 120, c: NAVY, at: 14.4},
  {id: 'coordonnateur', l: 'Coordonnateur HSE', x: 190, y: 360, c: BLUE, at: 26.4},
  {id: 'superviseur', l: 'Superviseur HSE', x: 770, y: 360, c: GREEN, at: 30.5},
  {id: 'assistant', l: 'Assistant HSE', x: 480, y: 540, c: VIO, at: 60.3},
  {id: 'agent', l: 'Agent HSE', x: 190, y: 760, c: ORANGE, at: 41.7},
  {id: 'relais', l: 'Relais HSE', x: 770, y: 760, c: RED, at: 54.6},
];
const NP = (id: string) => NODES.find((n) => n.id === id)!;
/* liaisons : sens descendant (directives, bleu) ou montant (remontées, vert) */
const LINKS: {a: string; b: string; up?: boolean; at: number}[] = [
  {a: 'responsable', b: 'coordonnateur', at: 24.6},
  {a: 'responsable', b: 'superviseur', at: 25.0},
  {a: 'coordonnateur', b: 'agent', at: 40.4},
  {a: 'superviseur', b: 'relais', at: 50.4},
  {a: 'relais', b: 'assistant', up: true, at: 57.2},
  {a: 'agent', b: 'assistant', up: true, at: 61.4},
  {a: 'assistant', b: 'responsable', up: true, at: 63.8},
];
/* caméra : [t, cx, cy, zoom] */
const CAM: [number, number, number, number][] = [
  [14.0, 480, 300, 1.6], [16.0, 480, 190, 1.7], [23.6, 480, 190, 1.7], [25.6, 480, 330, 1.0], [26.6, 260, 380, 1.5], [29.8, 260, 380, 1.5], [30.8, 700, 380, 1.5], [35.4, 700, 380, 1.5],
  [44.6, 230, 700, 1.6], [48.2, 230, 700, 1.6], [52.0, 480, 560, 1.0], [53.8, 720, 700, 1.6], [58.8, 720, 700, 1.6], [62.6, 480, 520, 1.6], [65.6, 480, 500, 1.5], [67.0, 480, 455, 0.95], [99, 480, 455, 0.95],
];
const camAt = (t: number) => {
  let k = 0;
  while (k < CAM.length - 2 && t > CAM[k + 1][0]) k++;
  const [t0, x0, y0, z0] = CAM[k];
  const [t1, x1, y1, z1] = CAM[k + 1];
  const p = t <= t0 ? 0 : easeInOut(Math.min(1, (t - t0) / Math.max(0.01, t1 - t0)));
  return {x: lerp(x0, x1, p), y: lerp(y0, y1, p), z: lerp(z0, z1, p)};
};
const focusId = (t: number) => (t < 23.6 ? 'responsable' : t < 30.3 ? 'coordonnateur' : t < 36 ? 'superviseur' : t < 49 ? 'agent' : t < 59.4 ? 'relais' : t < 66 ? 'assistant' : '');
const OrgChart: React.FC<{dimBg?: boolean}> = () => {
  const t = useT();
  const cam = camAt(t);
  const f = focusId(t);
  const loop = prog(t, 68.95, 70.0);
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: 960, height: 930, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 960, height: 930, transformOrigin: '0 0', transform: `translate(${480 - cam.x * cam.z}px, ${465 - cam.y * cam.z}px) scale(${cam.z})`}}>
        <svg style={{position: 'absolute', left: 0, top: 0}} width={960} height={930}>
          <defs>{['b', 'g'].map((m) => <marker key={m} id={`ar${m}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill={m === 'b' ? BLUE : GREEN} /></marker>)}</defs>
          {LINKS.map((L, k) => { const A = NP(L.a), B = NP(L.b); const p = prog(t, L.at, L.at + 0.8); if (p <= 0) return null; const dx = B.x - A.x, dy = B.y - A.y, d = Math.hypot(dx, dy); const ux = dx / d, uy = dy / d; const x1 = A.x + ux * 92, y1 = A.y + uy * 92, x2 = B.x - ux * 100, y2 = B.y - uy * 100; return <g key={k}><line x1={x1} y1={y1} x2={lerp(x1, x2, p)} y2={lerp(y1, y2, p)} stroke={L.up ? GREEN : BLUE} strokeWidth={10} strokeLinecap="round" markerEnd={p > 0.95 ? `url(#ar${L.up ? 'g' : 'b'})` : undefined} strokeDasharray={loop > 0 ? '22 14' : undefined} strokeDashoffset={loop > 0 ? -t * 90 : 0} />{L.up && p >= 1 && <circle r={12} fill={GREEN} cx={lerp(x1, x2, ((t * 0.7 + k * 0.3) % 1))} cy={lerp(y1, y2, ((t * 0.7 + k * 0.3) % 1))} />}{!L.up && p >= 1 && loop > 0 && <circle r={12} fill={BLUE} cx={lerp(x1, x2, ((t * 0.7 + k * 0.3) % 1))} cy={lerp(y1, y2, ((t * 0.7 + k * 0.3) % 1))} />}</g>; })}
        </svg>
        {NODES.map((n) => { const on = t > n.at; const sc = on ? spring(t, n.at) : 0; const dim = f && f !== n.id && t < 66; return (
          <div key={n.id} style={{position: 'absolute', left: n.x - 90, top: n.y - 90, width: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: on ? (dim ? 0.45 : 1) : 0.25, filter: dim ? 'grayscale(0.7)' : 'none'}}>
            <div style={{width: 180, height: 180, borderRadius: 90, background: on ? `radial-gradient(circle at 50% 30%, #fff, ${n.c}33)` : 'transparent', border: `${on ? 6 : 4}px ${on ? 'solid' : 'dashed'} ${on ? NBK : '#9FB3CC'}`, boxShadow: on ? `6px 6px 0 ${n.c}` : 'none', overflow: 'hidden', transform: `scale(${on ? sc : 1})`, position: 'relative'}}>
              {on && <Img src={staticFile(PORT(n.id))} style={{position: 'absolute', left: '50%', top: 6, width: 150, transform: 'translateX(-50%)'}} />}
            </div>
            <div style={{marginTop: 8, background: on ? n.c : '#E3E8EF', color: '#fff', border: `3px solid ${NBK}`, borderRadius: 10, padding: '2px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 22, whiteSpace: 'nowrap', transform: `scale(${on ? sc : 0.9})`, opacity: on ? 1 : 0}}>{n.l}</div>
          </div>
        ); })}
        {loop > 0 && <div style={{position: 'absolute', left: 340, top: 860, width: 280, textAlign: 'center', transform: `scale(${spring(t, 68.95)})`}}><NBadge at={68.95} text="CIRCUIT FERMÉ" bg={GREEN} rot={-4} size={30} /></div>}
      </div>
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
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="equipe" w={1080} h={800} pos="50% 30%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 22%, ${PAPER}CC 30%, ${PAPER} 35%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={545} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 18}}><div style={{...nb(NBK, 5), color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3, padding: '8px 22px'}}>L’ARCHITECTURE · 6 MAILLONS</div><div style={{transform: 'rotate(-8deg)'}}><div style={{...nb(ACC, 5), color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 26, padding: '6px 16px'}}>VOIX : ISAC</div></div></Abs>
      <Abs x={0} y={640} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="ÉQUIPE HSE" src={IMG.cEq} size={140} ls={3} /></Abs>
      <Abs x={0} y={820} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="PERFORMANTE" src={IMG.cPerf} size={112} ls={1} seed={3} /></Abs>
      <Abs x={40} y={1000} w={1000} style={{display: 'flex', justifyContent: 'center', gap: 10}}>{NODES.map((n) => <div key={n.id} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}><div style={{width: 150, height: 150, borderRadius: 75, overflow: 'hidden', border: `5px solid ${NBK}`, boxShadow: `5px 5px 0 ${n.c}`, background: `radial-gradient(circle at 50% 30%, #fff, ${n.c}33)`, position: 'relative'}}><Img src={staticFile(PORT(n.id))} style={{position: 'absolute', left: '50%', top: 6, width: 124, transform: 'translateX(-50%)'}} /></div><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 17, color: n.c}}>{n.l.replace(' HSE', '')}</span></div>)}</Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Intro : bureaux / chantier → recherche → 6 maillons ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const ph = t < 5.1 ? 0 : 1;
  return (
    <Out end={13.0}>
      {ph === 0 && (
        <>
          <HiLine words={['Pas', 'juste', 'empiler', 'des', 'règles']} mark={[2, 4]} at={3.0} y={330} size={60} />
          <Abs x={60} y={440} w={960} h={930}>
            {Array.from({length: 7}, (_, k) => { const fall = prog(t, 4.2, 5.0, easeIn); const drop = prog(t, 2.9 + k * 0.12, 3.3 + k * 0.12, easeOut); return <div key={k} style={{...nb(['#fff', '#FFF6DA', '#E8F1FF'][k % 3], 5), position: 'absolute', left: 300 + ((k * 37) % 60) + fall * (k - 3) * 60, top: 700 - k * 92 - (1 - drop) * 400 + fall * k * 40, width: 360, height: 84, transform: `rotate(${((k * 13) % 9) - 4 + fall * (k - 3) * 12}deg)`, opacity: drop, display: 'flex', alignItems: 'center', padding: '0 18px', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: NBK}}>RÈGLE n°{k + 1}</div>; })}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 10.6 ? ['Du', 'bureau', 'au', 'chantier', '?'] : ['Six', 'maillons']} mark={t < 10.6 ? [1, 3] : [0, 1]} at={t < 10.6 ? 5.4 : 11.6} y={330} size={64} />
          {t < 9.7 ? <Abs x={60} y={440} w={960} h={930}>
            <div style={{...nb('#fff'), position: 'absolute', left: 0, top: 0, width: 440, height: 420, overflow: 'hidden', opacity: pop(t, 5.4)}}><Pic src={IMG.bureau} ic="homme-bureau" w={432} h={300} pos="50% 30%" /><div style={{padding: 14, fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: NBK}}>📄 la politique, au bureau</div></div>
            <div style={{...nb('#fff'), position: 'absolute', right: 0, top: 0, width: 440, height: 420, overflow: 'hidden', opacity: pop(t, 7.6)}}><Pic src={IMG.chantier} ic="ouvrier" w={432} h={300} pos="50% 50%" /><div style={{padding: 14, fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: NBK}}>👷 le travailleur, sur le chantier</div></div>
            <svg style={{position: 'absolute', left: 0, top: 440}} width={960} height={300}><path d="M 220 10 C 220 200, 740 100, 740 10" fill="none" stroke={NBK} strokeWidth={8} strokeDasharray="18 14" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - prog(t, 7.8, 9.0)}} /></svg>
            {t > 8.6 && <div style={{position: 'absolute', left: 400, top: 560, transform: `scale(${spring(t, 8.6)})`}}><F n="question" size={160} /></div>}
          </Abs> : <SearchOpen x={60} y={440} w={960} h={930} at={9.5} query="équipe HSE performante" results={['Empiler des procédures', 'L’architecture en 6 maillons', 'Recruter un expert unique']} found={1} foundAt={11.2} clickAt={11.55} c={NAVY}>
            <div style={{position: 'absolute', inset: 0, display: 'flex', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center', gap: 22, padding: 30}}>{NODES.map((n, k) => <div key={n.id} style={{width: 250, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, transform: `scale(${t > 12.2 + k * 0.12 ? spring(t, 12.2 + k * 0.12) : 0})`}}><div style={{width: 160, height: 160, borderRadius: 80, overflow: 'hidden', border: `5px solid ${NBK}`, boxShadow: `5px 5px 0 ${n.c}`, background: `radial-gradient(circle at 50% 30%, #fff, ${n.c}33)`, position: 'relative'}}><Img src={staticFile(PORT(n.id))} style={{position: 'absolute', left: '50%', top: 6, width: 134, transform: 'translateX(-50%)'}} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: n.c}}>{k + 1}. {n.l.replace(' HSE', '')}</div></div>)}</div>
          </SearchOpen>}
        </>
      )}
    </Out>
  );
};

/* ═════════════ Corps : l'organigramme filmé + fiches de rôle ═════════════ */
const ROLE_PANEL: {from: number; to: number; title: string; chips: {at: number; ic: string; l: string}[]; c: string}[] = [
  {from: 16.6, to: 23.6, title: 'Responsable HSE', c: NAVY, chips: [{at: 16.6, ic: 'engrenage', l: 'pilote le système global'}, {at: 20.6, ic: 'cible', l: 'élabore la stratégie'}, {at: 21.9, ic: 'bouclier', l: 'stricte conformité'}]},
  {from: 26.4, to: 30.2, title: 'Coordonnateur HSE', c: BLUE, chips: [{at: 27.4, ic: 'classeur', l: 'harmonise les procédures'}, {at: 28.8, ic: 'batiment', l: 'entre les services'}]},
  {from: 30.4, to: 35.6, title: 'Superviseur HSE', c: GREEN, chips: [{at: 31.6, ic: 'chantier', l: 'prend le relais sur site'}, {at: 32.9, ic: 'equipe', l: 'encadre les équipes'}]},
  {from: 44.6, to: 48.4, title: 'Agent HSE', c: ORANGE, chips: [{at: 44.6, ic: 'loupe', l: 'inspecte'}, {at: 44.9, ic: 'danger', l: 'détecte la faille'}, {at: 46.6, ic: 'eclair', l: 'intervient'}]},
  {from: 54.0, to: 58.9, title: 'Relais HSE', c: RED, chips: [{at: 54.4, ic: 'equipe', l: 'intégré aux équipes'}, {at: 56.2, ic: 'megaphone', l: 'signale les dangers'}]},
  {from: 62.6, to: 66.0, title: 'Assistant HSE', c: VIO, chips: [{at: 62.6, ic: 'clipboard', l: 'centralise'}, {at: 63.8, ic: 'graphique', l: 'statistiques → direction'}]},
];
const Corps: React.FC = () => {
  const t = useT();
  const panel = ROLE_PANEL.find((p) => t >= p.from && t < p.to);
  const head = t < 23.6 ? {w: ['Il', 'pilote', 'le', 'système'], m: [1, 3], a: 15.0} : t < 26.3 ? {w: ['La', 'vision', 'descend'], m: [1, 2], a: 24.0} : t < 30.3 ? {w: ['Harmoniser', 'les', 'procédures'], m: [0, 2], a: 27.0} : t < 36.1 ? {w: ['Encadrer', 'les', 'équipes'], m: [0, 2], a: 31.2} : t < 40.9 ? {w: ['Un', 'œil', 'expert'], m: [1, 2], a: 39.2} : t < 49 ? {w: ['Inspecter,', 'détecter,', 'intervenir'], m: [0, 1, 2], a: 44.6} : t < 54 ? {w: ['L’info', 'remonte'], m: [1], a: 52.0} : t < 59.4 ? {w: ['Signaler', 'le', 'danger'], m: [0, 2], a: 55.6} : t < 66 ? {w: ['Des', 'statistiques'], m: [1], a: 62.8} : t < 68.9 ? {w: ['Pas', 'une', 'hiérarchie…'], m: [2], a: 66.4} : t < 70.7 ? {w: ['Un', 'circuit', 'fermé'], m: [1, 2], a: 69.0} : {w: ['Directives', '⇅', 'terrain'], m: [0, 2], a: 71.2};
  return (
    <>
      <HiLine words={head.w} mark={head.m} at={head.a} y={330} size={head.w.join(' ').length > 24 ? 52 : 64} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{position: 'absolute', inset: 0, opacity: pop(t, 13.6)}}><OrgChart /></div>
        {t > 36.0 && t < 40.9 && <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 25% 80%, transparent 120px, ${NIGHT}DD 300px)`, opacity: prog(t, 36.0, 37.0)}}><div style={{position: 'absolute', left: 120, top: 640, transform: `scale(${pop(t, 38.8)})`}}><F n="yeux" size={140} /></div><div style={{position: 'absolute', left: 300, top: 160}}><NBadge at={37.2} text="ANTICIPER L’ACCIDENT" bg={ORANGE} rot={-6} size={34} /></div></div>}
        {t > 45.4 && t < 48.4 && <div style={{position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 24}}><div style={{position: 'absolute', left: 120, top: 560, width: 300, height: 300, borderRadius: '50%', border: `10px solid ${ORANGE}`, boxShadow: `0 0 0 2000px ${NIGHT}55`, transform: `translate(${Math.sin(t * 2) * 30}px, ${Math.cos(t * 2) * 20}px)`}} /></div>}
        {t > 51.0 && t < 54.0 && Array.from({length: 6}, (_, k) => { const p = ((t - 51.0) * 0.9 + k / 6) % 1; return <div key={k} style={{position: 'absolute', left: 140 + k * 130, top: 820 - p * 700, opacity: 1 - p}}><div style={{width: 50, height: 30, borderRadius: 15, background: GREEN, border: `3px solid ${NBK}`}} /></div>; })}
        {t > 52.6 && t < 54.0 && <div style={{position: 'absolute', left: 0, right: 0, top: 40, display: 'flex', justifyContent: 'center'}}><NBadge at={52.6} text="ZÉRO FRICTION" bg={GREEN} rot={-5} size={34} /></div>}
        {t > 66.4 && t < 68.95 && <div style={{position: 'absolute', left: 0, right: 0, top: 30, display: 'flex', justifyContent: 'center'}}><div style={{position: 'relative', ...nb('#fff', 5), padding: '8px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: DIM}}>hiérarchie administrative<div style={{position: 'absolute', left: 10, right: 10, top: '50%', height: 6, background: RED, transform: `scaleX(${prog(t, 67.6, 68.2)})`, transformOrigin: '0 50%'}} /></div></div>}
        {t > 70.9 && <div style={{position: 'absolute', left: 0, right: 0, top: 20, display: 'flex', justifyContent: 'space-between', padding: '0 10px'}}><NBadge at={71.0} text="↓ les directives protègent" bg={BLUE} rot={-3} size={24} /><NBadge at={73.0} text="↑ le terrain perfectionne" bg={GREEN} rot={3} size={24} /></div>}
        {panel && <div style={{position: 'absolute', left: panel.title.match(/Superv|Agent/) ? 470 : 20, top: panel.title.startsWith('Responsable') ? 590 : 30, width: 460, display: 'flex', flexDirection: 'column', gap: 12, opacity: prog(t, panel.from, panel.from + 0.3)}}>{panel.chips.map((c) => <Chip key={c.l} at={c.at} ic={c.ic} l={c.l} c={panel.c} />)}</div>}
        {t > 63.8 && t < 66 && <div style={{...nb('#fff', 6), position: 'absolute', right: 30, top: 300, width: 300, height: 220, padding: 16, display: 'flex', alignItems: 'flex-end', gap: 12}}>{[60, 110, 80, 150].map((h, k) => <div key={k} style={{flex: 1, height: h * prog(t, 63.8 + k * 0.15, 64.6 + k * 0.15), background: k === 3 ? VIO : NBK, borderRadius: '6px 6px 0 0'}} />)}</div>}
        {t > 72.8 && <Dust n={22} c={ACC} />}
      </Abs>
    </>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.flatMap((r) => [{at: r.at - 1.2, s: 'soft-whoosh', v: 0.2, dur: 1.2}, {at: r.at, s: 'bass-hit', v: 0.33}, {at: r.at + 0.05, s: 'sfx/bell', v: 0.26}]),
  ...rep(2.9, 7, 0.12, 'sfx/thud', 0.16), {at: 4.2, s: 'sfx/swish', v: 0.35},
  {at: 5.4, s: 'sfx/pop', v: 0.22}, {at: 7.6, s: 'sfx/pop', v: 0.22}, {at: 7.8, s: 'stylo', v: 0.2, dur: 1.2}, {at: 8.6, s: 'deep-hit', v: 0.25},
  ...searchCues(9.5, 22, 11.2, 11.55), ...rep(12.2, 6, 0.12, 'sfx/pop', 0.16),
  ...NODES.map((n) => ({at: n.at, s: 'tampon', v: 0.3})), ...LINKS.map((l) => ({at: l.at, s: 'soft-whoosh', v: 0.18, dur: 0.8})),
  ...CAM.slice(1, -1).map((c) => ({at: c[0] - 0.6, s: 'sfx/swish', v: 0.12})),
  ...ROLE_PANEL.flatMap((p) => p.chips.map((c) => ({at: c.at + 0.1, s: 'validation', v: 0.16}))),
  {at: 36.0, s: 'tension', v: 0.25, dur: 2.5}, {at: 37.2, s: 'tampon', v: 0.4}, {at: 45.4, s: 'deep-hit', v: 0.25},
  ...rep(51.0, 6, 0.3, 'sfx/pop', 0.12), {at: 52.6, s: 'tampon', v: 0.4},
  ...rep(63.8, 4, 0.15, 'sfx/thud', 0.18), {at: 67.6, s: 'sfx/swish', v: 0.35}, {at: 68.95, s: 'bass-hit', v: 0.4}, {at: 69.0, s: 'tampon', v: 0.45}, {at: 71.0, s: 'sfx/pop', v: 0.25}, {at: 73.0, s: 'sfx/pop', v: 0.25},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
export const EquipeIsac: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.8} to={13.1}><Intro /></Gate>
    <Gate from={16.4} to={OUTRO_AT}><Corps /></Gate>
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    <Gate from={10} to={67}><StationBanner /></Gate>
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={75.9}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-equipe-hse-isac.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Stamp, Strike, Count, handFont, TEAL, GOLD, Shot];
