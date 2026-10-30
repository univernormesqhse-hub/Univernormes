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
 * « APR — analyse préliminaire des risques » (voix d'origine, 1 min 00) — capsule « condensé + effet wahou + ultra
 * premium » présentée en métro (7 stations). Tube de verre à six guichets : définition → objectifs → étapes → cas
 * pratique → mesures → anticiper ; la capsule file d'un guichet à l'autre. Gyrophare, loupe, capsule pneumatique,
 * store vénitien ; barre de recherche « APR » qui ouvre le sigle déplié. Techniques : 4 verbes qui glissent en
 * cartes numérotées, frise de projet « APR ici ↓ », chaîne de dominos (activité → … → conséquences) qui tombe et
 * s'arrête sur le mur « mesures de maîtrise », cas pratique (technicien, tampon « avant l'intervention »,
 * responsable QHSE), 4 risques « IDENTIFIÉ » (dont batterie animée pour les énergies résiduelles), 4 mesures
 * animées (levier + cadenas de consignation, voltmètre qui tombe à 0 V, EPI qui tombent, permis tamponné
 * « AUTORISÉ »). Kits capsule-ui-neo-brutal et capsule-recit-illustre ; images de la session réutilisées + image
 * ChatGPT de l'utilisateur (technicien et responsable QHSE devant l'armoire, cas pratique).
 */
const IMG = {
  cover: 'permisfeu/technicien.jpg',
  c1: 'permisfeu/technicien.jpg',
  c2: 'evalrisques-gen/operateur.jpg',
  tech: 'apr-gen/consignation-apr.jpg',
  resp: 'rhse-gen/responsable.jpg',
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
const OUTRO_AT = 61.8;
export const APR_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '1', title: 'APR ?', s: 'analyse préliminaire des risques', c: RED, g: 'définition', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 5.2, n: '2', title: 'Les objectifs', s: 'identifier · analyser · évaluer · proposer', c: ORANGE, g: 'objectifs', k: 'none', lab: 'GUICHET 2 / 6'},
  {at: 16.2, n: '3', title: 'Les étapes', s: 'une succession logique', c: BLUE, g: 'étapes', k: 'gyro', lab: 'GUICHET 3 / 6'},
  {at: 27.2, n: '4', title: 'Cas pratique', s: 'intervention sur installation', c: NAVY, g: 'cas pratique', k: 'loupe', lab: 'GUICHET 4 / 6'},
  {at: 44.2, n: '5', title: 'Les mesures', s: 'définies à partir de l’analyse', c: GREEN, g: 'mesures', k: 'tube', lab: 'GUICHET 5 / 6'},
  {at: 55.6, n: '6', title: 'Anticiper', s: 'avant le démarrage', c: VIO, g: 'anticiper', k: 'store', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 59.5;
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
  {n: 1, l: 'APR', s: 'APR', at: 3.6},
  {n: 2, l: 'Objectifs', s: 'objectifs', at: 5.5},
  {n: 3, l: 'Étapes', s: 'étapes', at: 19.9},
  {n: 4, l: 'Technicien', s: 'technicien', at: 30.9},
  {n: 5, l: 'Risques', s: 'risques', at: 38.0},
  {n: 6, l: 'Mesures', s: 'mesures', at: 47.9},
  {n: 7, l: 'Anticiper', s: 'anticiper', at: 59.3},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE APR · STATION {r.n} / 7</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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
      <Abs x={0} y={640} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="ANALYSE PRÉLIMINAIRE" src={IMG.c2} size={70} ls={1} seed={2} /></Abs>
      <Abs x={0} y={760} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="DES RISQUES :" src={IMG.c2} size={104} ls={2} seed={5} /></Abs>
      <Abs x={0} y={880} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="APR" src={IMG.c1} size={260} ls={14} /></Abs>
      <Abs x={40} y={1170} w={1000} style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10}}>{[['IDENTIFIER', ORANGE], ['ANALYSER', RED], ['ÉVALUER', BLUE], ['PROPOSER', GREEN]].map(([n, c], k) => <div key={n} style={{...nb(c, 4), padding: '6px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', transform: `translateY(${(1 - Math.min(1, spring(t, 0.3 + k * 0.08))) * 60}px)`}}>{n}</div>)}</Abs>
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



/* ═════════════ Guichet 1 : APR ? → recherche → sigle déplié ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const w = (a: number) => prog(t, a, a + 0.5, easeOut);
  const L: [string, string, number, string][] = [['A', 'nalyse', 3.85, RED], ['P', 'réliminaire', 4.05, BLUE], ['R', 'isques', 4.45, GREEN]];
  return (
    <Out end={5.3}>
      <Heads h={[[2.85, ['APR', '?'], [0]], [3.85, ['Analyse', 'préliminaire', 'des', 'risques'], [0, 1, 3]]]} />
      <SearchOpen x={60} y={440} w={960} h={900} at={2.6} query="APR" results={['APR · analyse préliminaire des risques', 'AMDEC · modes de défaillance', 'HAZID · identification des dangers']} found={0} foundAt={3.1} clickAt={3.45} c={RED}>
        <div style={{position: 'absolute', left: 60, right: 60, top: 110, display: 'flex', flexDirection: 'column', gap: 18}}>
          {L.map(([a, rest, at, c], i) => (
            <div key={a} style={{display: 'flex', alignItems: 'baseline', fontFamily: sansFont, fontWeight: 900, opacity: pop(t, at - 0.1)}}>
              <span style={{fontSize: 130, color: c, width: 120, textAlign: 'center'}}>{a}</span>
              <span style={{fontSize: 72, color: INK, display: 'inline-block', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: w(at) * 620}}>{rest}</span>
            </div>
          ))}
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 640, display: 'flex', justifyContent: 'center'}}>{t > 4.7 && <NBadge at={4.7} text="UNE MÉTHODE D'ANTICIPATION" bg={NBK} rot={-2} size={34} />}</div>
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ Guichet 2 : 4 verbes + dès les premières phases ═════════════ */
const VERBS: [string, string, number, string, string][] = [
  ['IDENTIFIER', 'les dangers', 5.3, ORANGE, 'loupe'],
  ['ANALYSER', 'les situations dangereuses', 7.78, RED, 'danger'],
  ['ÉVALUER', 'les risques', 10.02, BLUE, 'balance'],
  ['PROPOSER', 'des mesures de prévention', 11.34, GREEN, 'bouclier'],
];
const Objectifs: React.FC = () => {
  const t = useT();
  const tl = prog(t, 12.4, 13.3, easeInOut);
  return (
    <Out end={16.25}>
      <Heads h={[[5.3, ['Ce', 'que', "permet", "l'APR"], [3]], [12.34, ['Dès', 'les', 'premières', 'phases'], [2, 3]]]} />
      {VERBS.map(([v, o, at, c, ic], i) => {
        const s0 = Math.min(1, spring(t, at, 9, 12));
        return (
          <Abs key={v} x={60} y={440 + i * 150} w={960} h={130} style={{opacity: t > at ? 1 : 0, transform: `translateX(${(1 - s0) * -500}px)`}}>
            <div style={{position: 'absolute', inset: 0, ...nb('#fff', 6), borderColor: c}} />
            <div style={{position: 'absolute', left: 18, top: 15}}><F n={ic} size={96} /></div>
            <div style={{position: 'absolute', left: 140, top: 18, fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: c}}>{v}</div>
            <div style={{position: 'absolute', left: 140, top: 72, fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: INK}}>{o}</div>
            <div style={{position: 'absolute', right: 22, top: 30, width: 70, height: 70, borderRadius: 35, background: c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `4px solid ${NBK}`}}>{i + 1}</div>
          </Abs>
        );
      })}
      {t > 12.3 && <Abs x={60} y={1070} w={960} h={240} style={{opacity: pop(t, 12.3)}}>
        <div style={{position: 'absolute', left: 60, right: 60, top: 100, height: 14, borderRadius: 7, background: '#D9DEE7'}} />
        <div style={{position: 'absolute', left: 60, top: 100, height: 14, borderRadius: 7, width: 840 * tl, background: `linear-gradient(90deg, ${GREEN}, ${BLUE}, ${NAVY})`}} />
        {['IDÉE', 'CONCEPTION', 'RÉALISATION', 'EXPLOITATION'].map((p, i) => (
          <div key={p} style={{position: 'absolute', left: 60 + i * 280 - 90, width: 180, top: 82, textAlign: 'center', opacity: tl > i / 3 - 0.01 ? 1 : 0.3}}>
            <div style={{width: 50, height: 50, margin: '0 auto', borderRadius: 25, background: i < 2 ? GREEN : '#fff', border: `5px solid ${i < 2 ? GREEN : NAVY}`}} />
            <div style={{marginTop: 10, fontFamily: MONO, fontWeight: 700, fontSize: 20, color: i < 2 ? GREEN : DIM}}>{p}</div>
          </div>
        ))}
        {t > 13.4 && <div style={{position: 'absolute', left: 0, top: 0, ...nb(GREEN, 5), color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 28, padding: '6px 16px', transform: `scale(${Math.min(1, spring(t, 13.4))})`}}>APR ICI ↓ AVANT D'AGIR</div>}
      </Abs>}
    </Out>
  );
};

/* ═════════════ Guichet 3 : la succession d'étapes en dominos ═════════════ */
const DOM: [string, number, string][] = [
  ['ACTIVITÉ', 19.9, BLUE], ['DANGER', 20.7, ORANGE], ['SITUATION DANGEREUSE', 21.5, GOLD], ['ÉVÉNEMENT REDOUTÉ', 22.98, RED], ['CONSÉQUENCES', 24.34, BURG],
];
const FALL_AT = 25.75;
const Dominos: React.FC = () => {
  const t = useT();
  const base = 1150, W0 = 92, H0 = 470, gap = 150, x0 = 110;
  const wall = Math.min(1, spring(t, 25.0, 9, 11));
  return (
    <Out end={27.25}>
      <Heads h={[[19.9, ['Une', 'succession', "d'étapes"], [1, 2]], [25.0, ['Puis', 'les', 'mesures', 'de', 'maîtrise'], [2, 3, 4]]]} />
      <Abs x={40} y={base} w={1000} h={14} style={{background: INK, borderRadius: 7}} />
      {DOM.map(([l, at, c], i) => {
        const fall = prog(t, FALL_AT + i * 0.18, FALL_AT + i * 0.18 + 0.28, easeIn);
        const ang = fall * (i === DOM.length - 1 ? 28 : 34);
        const s0 = Math.min(1, spring(t, at, 9, 12));
        return (
          <Abs key={l} x={x0 + i * gap} y={base - H0} w={W0} h={H0} style={{transformOrigin: '100% 100%', transform: `rotate(${ang}deg) scaleY(${t > at ? s0 : 0.0001})`, opacity: t > at - 0.05 ? 1 : 0}}>
            <div style={{position: 'absolute', inset: 0, ...nb(c, 6), borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: sansFont, fontWeight: 900, fontSize: l.length > 14 ? 30 : 38, color: '#fff', letterSpacing: 1, whiteSpace: 'nowrap'}}>{l}</div>
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, top: -64, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: c}}>{i + 1}</div>
          </Abs>
        );
      })}
      <Abs x={x0 + 5 * gap + 10} y={base - 520} w={150} h={520} style={{transformOrigin: '50% 100%', transform: `scaleY(${wall})`, opacity: t > 24.95 ? 1 : 0}}>
        <div style={{position: 'absolute', inset: 0, ...nb(GREEN, 7), borderRadius: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', padding: '20px 0'}}>
          <F n="bouclier" size={90} />
          <div style={{writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: sansFont, fontWeight: 900, fontSize: 27, color: '#fff', whiteSpace: 'nowrap'}}>MESURES DE MAÎTRISE</div>
        </div>
      </Abs>
      {t > FALL_AT + 1.05 && <Stamp at={FALL_AT + 1.05} text="CHAÎNE STOPPÉE" c={GREEN} x={260} y={1210} rot={-6} size={48} />}
    </Out>
  );
};

/* ═════════════ Guichet 4 : cas pratique — technicien, APR, risques ═════════════ */
const BatteryIco: React.FC<{t: number}> = ({t}) => (
  <svg width={110} height={110} viewBox="0 0 110 110"><rect x={14} y={30} width={74} height={50} rx={8} fill="#fff" stroke={NBK} strokeWidth={6} /><rect x={88} y={45} width={10} height={20} rx={3} fill={NBK} />{[0, 1, 2].map((k) => <rect key={k} x={22 + k * 22} y={38} width={16} height={34} rx={3} fill={TEAL} opacity={0.35 + 0.65 * Math.abs(Math.sin(t * 4 + k))} />)}</svg>
);
const RISKS: [string, string, number, string][] = [
  ['Électriques', 'eclair', 39.14, GOLD], ['Mécaniques', 'engrenage', 40.42, BLUE], ['Chimiques', 'eprouvette', 41.26, VIO], ['Énergies résiduelles', 'bat', 42.58, TEAL],
];
const Cas: React.FC = () => {
  const t = useT();
  const part2 = t >= 37.95;
  return (
    <Out end={44.35}>
      <Heads h={[[30.9, ['Un', 'technicien', 'intervient'], [1]], [32.26, ['Avant', "l'intervention"], [1]], [35.86, ['Le', 'responsable', 'QHSE', 'réalise', "l'APR"], [4]], [37.98, ['Les', 'risques', 'identifiés'], [2]]]} />
      {!part2 && <>
        <Shot src={IMG.tech} ic="engrenage" x={60} y={450} w={960} h={780} at={30.9} pos="50% 24%" c={NAVY}>
          {t > 34.0 && <>
            <div style={{position: 'absolute', left: 500 - 120, top: 270 - 120, width: 240, height: 240, borderRadius: '50%', border: `8px solid ${GREEN}`, boxShadow: '0 0 0 6px #fff', transform: `scale(${Math.min(1, spring(t, 34.0, 9, 12))})`}} />
            <div style={{position: 'absolute', left: 560, top: 40, ...nb(GREEN, 5), color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 24, padding: '6px 14px', letterSpacing: 2, transform: `scale(${Math.min(1, spring(t, 34.1))})`}}>RESPONSABLE QHSE</div>
          </>}
          {t > 35.86 && <div style={{position: 'absolute', left: 520, top: 400, ...nb(YEL, 6), padding: '10px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 36, transform: `scale(${Math.min(1, spring(t, 35.86))}) rotate(-3deg)`}}>📋 réalise l'APR</div>}
        </Shot>
        <Stamp at={32.3} text="AVANT LE DÉBUT DE L'INTERVENTION" c={RED} x={110} y={1170} rot={-4} size={38} />
      </>}
      {part2 && RISKS.map(([l, ic, at, c], i) => {
        const x = 60 + (i % 2) * 490, y = 450 + Math.floor(i / 2) * 420;
        const s0 = Math.min(1, spring(t, at, 9, 12));
        return (
          <Abs key={l} x={x} y={y} w={470} h={380} style={{opacity: t > at ? 1 : 0.15, transform: `scale(${t > at ? s0 : 0.92})`}}>
            <div style={{position: 'absolute', inset: 0, ...nb(t > at ? '#fff' : '#EEF1F5', 6), borderColor: t > at ? c : NBK}} />
            <div style={{position: 'absolute', left: 0, right: 0, top: 50, display: 'flex', justifyContent: 'center'}}>{ic === 'bat' ? <BatteryIco t={t} /> : <F n={ic} size={130} />}</div>
            <div style={{position: 'absolute', left: 10, right: 10, top: 230, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: l.length > 14 ? 36 : 44, color: c}}>{l}</div>
            {t > at + 0.4 && <div style={{position: 'absolute', right: -14, top: -14, ...nb(RED, 4), color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 20, padding: '4px 10px', transform: `scale(${Math.min(1, spring(t, at + 0.4))}) rotate(6deg)`}}>IDENTIFIÉ</div>}
            {t > at && t < at + 0.7 && <div style={{position: 'absolute', inset: -6, borderRadius: 24, border: `6px solid ${c}`, opacity: 1 - (t - at) / 0.7, transform: `scale(${1 + (t - at) * 0.4})`}} />}
          </Abs>
        );
      })}
    </Out>
  );
};

/* ═════════════ Guichet 5 : les mesures — consignation, VAT, EPI, autorisation ═════════════ */
const Lockout: React.FC<{t: number; at: number}> = ({t, at}) => {
  const lever = prog(t, at + 0.1, at + 0.5, easeInOut);
  const lock = prog(t, at + 0.5, at + 0.9, easeOut);
  return (
    <svg width={300} height={250} viewBox="0 0 300 250">
      <rect x={60} y={30} width={180} height={190} rx={16} fill="#D9DEE7" stroke={NBK} strokeWidth={6} />
      <circle cx={150} cy={110} r={46} fill="#fff" stroke={NBK} strokeWidth={6} />
      <g transform={`rotate(${-90 * lever} 150 110)`}><rect x={142} y={40} width={16} height={74} rx={8} fill={RED} stroke={NBK} strokeWidth={4} /></g>
      <text x={110} y={200} fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={22} fill={lever > 0.5 ? GREEN : RED}>{lever > 0.5 ? 'O · OFF' : 'I · ON'}</text>
      <g transform={`translate(195, ${150 - (1 - lock) * 50})`} opacity={lock > 0 ? 1 : 0}>
        <path d={`M 10 ${-4 - (1 - lock) * 18} L 10 -26 A 18 18 0 0 1 46 -26 L 46 ${-4 - (1 - lock) * 18}`} fill="none" stroke="#9AA3B2" strokeWidth={9} />
        <rect x={0} y={-6} width={56} height={46} rx={8} fill={RED} stroke={NBK} strokeWidth={4} />
        <circle cx={28} cy={14} r={6} fill={NBK} />
      </g>
    </svg>
  );
};
const VatMeter: React.FC<{t: number; at: number}> = ({t, at}) => {
  const p = prog(t, at + 0.2, at + 1.2, easeInOut);
  const ang = lerp(55, -60, p);
  return (
    <svg width={300} height={250} viewBox="0 0 300 250">
      <rect x={40} y={20} width={220} height={210} rx={22} fill={GOLD} stroke={NBK} strokeWidth={6} />
      <rect x={62} y={40} width={176} height={120} rx={12} fill="#F7F3E6" stroke={NBK} strokeWidth={4} />
      <path d="M 82 140 A 70 70 0 0 1 218 140" fill="none" stroke={NBK} strokeWidth={4} />
      <path d="M 82 140 A 70 70 0 0 1 100 98" fill="none" stroke={GREEN} strokeWidth={10} />
      <g transform={`rotate(${ang} 150 140)`}><line x1={150} y1={140} x2={150} y2={72} stroke={RED} strokeWidth={6} strokeLinecap="round" /></g>
      <circle cx={150} cy={140} r={8} fill={NBK} />
      <text x={150} y={205} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={40} fill={p > 0.95 ? GREEN : NBK}>{p > 0.95 ? '0 V' : '…'}</text>
    </svg>
  );
};
const Permit: React.FC<{t: number; at: number}> = ({t, at}) => {
  const st = prog(t, at + 0.5, at + 0.75, easeIn);
  return (
    <svg width={300} height={250} viewBox="0 0 300 250">
      <rect x={70} y={14} width={160} height={222} rx={10} fill="#fff" stroke={NBK} strokeWidth={6} />
      <text x={150} y={48} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight={700} fontSize={14} fill={NBK}>AUTORISATION</text>
      <text x={150} y={66} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight={700} fontSize={14} fill={NBK}>DE TRAVAIL</text>
      {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={88} y={84 + k * 22} width={124 - (k % 2) * 30} height={8} rx={4} fill="#C9D2DF" />)}
      {st > 0 && <g transform={`translate(150 180) rotate(-12) scale(${lerp(2.2, 1, st)})`} opacity={st}><rect x={-78} y={-24} width={156} height={48} rx={8} fill="none" stroke={GREEN} strokeWidth={6} /><text x={0} y={10} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={28} fill={GREEN}>AUTORISÉ</text></g>}
    </svg>
  );
};
const MES: [string, number, string][] = [['Consignation', 47.9, RED], ["Vérification d'absence de tension", 49.06, GOLD], ['Équipements adaptés', 51.1, BLUE], ['Autorisation de travail', 52.7, GREEN]];
const Mesures: React.FC = () => {
  const t = useT();
  return (
    <Out end={55.65}>
      <Heads h={[[47.9, ['Les', 'mesures', 'nécessaires'], [1, 2]], [53.94, ['Si', 'elle', 'est', 'requise'], [3]]]} />
      {MES.map(([l, at, c], i) => {
        const x = 60 + (i % 2) * 490, y = 440 + Math.floor(i / 2) * 440;
        const s0 = Math.min(1, spring(t, at, 9, 12));
        return (
          <Abs key={l} x={x} y={y} w={470} h={410} style={{opacity: t > at ? 1 : 0.12, transform: `scale(${t > at ? s0 : 0.9})`}}>
            <div style={{position: 'absolute', inset: 0, ...nb('#fff', 7), borderColor: t > at ? c : NBK}} />
            <div style={{position: 'absolute', left: 85, top: 20}}>
              {i === 0 && <Lockout t={t} at={at} />}
              {i === 1 && <VatMeter t={t} at={at} />}
              {i === 2 && <div style={{width: 300, height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6}}>{['casque', 'gants', 'lunettes'].map((n, k) => <div key={n} style={{transform: `translateY(${(1 - Math.min(1, spring(t, at + 0.15 + k * 0.15, 9, 11))) * 80}px)`, opacity: t > at + 0.15 + k * 0.15 ? 1 : 0}}><F n={n} size={92} /></div>)}</div>}
              {i === 3 && <Permit t={t} at={at} />}
            </div>
            <div style={{position: 'absolute', left: 14, right: 14, top: 290, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: l.length > 22 ? 30 : 36, color: c, lineHeight: 1.1}}>{l}</div>
            <div style={{position: 'absolute', left: 18, top: 16, width: 54, height: 54, borderRadius: 27, background: c, border: `4px solid ${NBK}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i + 1}</div>
          </Abs>
        );
      })}
    </Out>
  );
};

/* ═════════════ Guichet 6 : anticiper ═════════════ */
const Anticiper: React.FC = () => {
  const t = useT();
  const go = prog(t, 59.6, 60.3, easeOut);
  return (
    <Out end={OUTRO_AT}>
      <Heads h={[[59.3, ['Anticiper', 'les', 'risques'], [0]]]} />
      <Abs x={60} y={470} w={960} h={420} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30}}>
        <div style={{...nb(GREEN, 8), padding: '30px 40px', fontFamily: sansFont, fontWeight: 900, fontSize: 96, color: '#fff', transform: `scale(${Math.min(1, spring(t, 59.3))}) rotate(-3deg)`}}>APR</div>
        <svg width={160} height={80} style={{opacity: go}}><path d="M 10 40 L 130 40 M 100 12 L 140 40 L 100 68" fill="none" stroke={INK} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" /></svg>
        <div style={{...nb('#fff', 8), padding: '24px 30px', fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: NAVY, opacity: go, transform: `translateX(${(1 - go) * 120}px)`}}>DÉMARRAGE<br />DE L'ACTIVITÉ</div>
      </Abs>
      {t > 60.4 && <Abs x={60} y={960} w={960} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={60.4} text="AVANT, PAS APRÈS" bg={RED} rot={-2} size={40} /></Abs>}
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
  ...searchCues(2.6, 3, 3.1, 3.45), {at: 3.85, s: 'sfx/swish', v: 0.3}, {at: 4.05, s: 'sfx/swish', v: 0.3}, {at: 4.45, s: 'sfx/swish', v: 0.3}, {at: 4.7, s: 'tampon', v: 0.35},
  ...VERBS.map(([, , at]) => ({at, s: 'sfx/thud', v: 0.32})), {at: 12.4, s: 'soft-whoosh', v: 0.35, dur: 1}, {at: 13.4, s: 'sfx/pop', v: 0.3},
  ...DOM.map(([, at]) => ({at, s: 'sfx/pop', v: 0.3})), {at: 25.0, s: 'sfx/thud', v: 0.4}, ...DOM.map((_, i) => ({at: FALL_AT + i * 0.18 + 0.26, s: 'sfx/click', v: 0.4})), {at: FALL_AT + 1.0, s: 'sfx/thud', v: 0.5}, {at: FALL_AT + 1.05, s: 'tampon', v: 0.45},
  {at: 32.3, s: 'tampon', v: 0.45}, {at: 34.0, s: 'sfx/pop', v: 0.3}, {at: 35.86, s: 'sfx/pop', v: 0.35},
  ...RISKS.map(([, , at]) => ({at, s: 'sfx/thud', v: 0.35})), ...RISKS.map(([, , at]) => ({at: at + 0.4, s: 'tampon', v: 0.25})),
  {at: 47.9, s: 'sfx/thud', v: 0.35}, {at: 48.4, s: 'cadenas', v: 0.5}, {at: 49.06, s: 'sfx/thud', v: 0.35}, {at: 49.3, s: 'sfx/rise', v: 0.2, dur: 1}, {at: 50.3, s: 'validation', v: 0.3},
  ...rep(51.25, 3, 0.15, 'sfx/pop', 0.3), {at: 52.7, s: 'sfx/thud', v: 0.35}, {at: 53.25, s: 'tampon', v: 0.5},
  {at: 59.3, s: 'sfx/pop', v: 0.35}, {at: 59.6, s: 'sfx/swish', v: 0.35}, {at: 60.4, s: 'tampon', v: 0.4},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SCN: [React.FC, number, number][] = [[Intro, 2.5, 5.35], [Objectifs, 5.2, 16.3], [Dominos, 19.85, 27.3], [Cas, 30.85, 44.4], [Mesures, 47.85, 55.7], [Anticiper, 59.2, OUTRO_AT]];
export const AprMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    {SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-apr-metro-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn, Barred, Flap];
