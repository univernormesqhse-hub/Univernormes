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
 * « Les sigles QHSE — de LIE à NPS » (voix d'origine, 33 sigles, 118 s) — capsule « condensé + effet wahou + ultra
 * premium » présentée en métro (7 stations). Tube de verre à six guichets, un par famille de sigles : prévention →
 * urgence → risques majeurs → chimie & environnement → qualité → gouvernance ; la capsule file d'un guichet à
 * l'autre. Gyrophare (deux fois), loupe, capsule pneumatique, store vénitien ; chaque transition présente le premier
 * sigle de sa famille. Barre de recherche « LIE » qui ouvre un tableau des départs (palettes d'aéroport) ; carte focus
 * commune : le sigle en tuiles qui tombent + l'expansion qui s'écrit au rythme de la voix, initiales surlignées.
 * Une technique par famille : tableau des départs, zones concentriques autour du site (POI, PPI, ORSEC), train de
 * marchandises dont chaque wagon porte un sigle sur plaque orange et s'arrête à quai, tuiles qui pivotent façon
 * tableau périodique, carte de contrôle qui se trace avec un point par sigle, cartes distribuées sur une table.
 * Kits capsule-ui-neo-brutal et capsule-recit-illustre ; images de la capsule « Sigles QHSE » réutilisées.
 */
const IMG = {
  cover: 'sigles-gen/couverture.jpg',
  c1: 'sigles-gen/analyse.jpg',
  c2: 'sigles-gen/indicateurs.jpg',
  intl: 'sigles-gen/international.jpg',
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
const OUTRO_AT = 119.3;
export const SIGLES_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.6, n: '1', title: 'LIE', s: "limite inférieure d'explosivité", c: RED, g: 'prévention', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 26.0, n: '2', title: 'ORSEC', s: 'réponse de sécurité civile', c: ORANGE, g: 'urgence', k: 'gyro', lab: 'GUICHET 2 / 6'},
  {at: 35.65, n: '3', title: 'PPAM', s: 'accidents majeurs', c: VIO, g: 'risques majeurs', k: 'loupe', lab: 'GUICHET 3 / 6'},
  {at: 61.35, n: '4', title: 'REACH', s: 'produits chimiques', c: TEAL, g: 'chimie · env.', k: 'tube', lab: 'GUICHET 4 / 6'},
  {at: 72.1, n: '5', title: 'PDCA', s: 'Plan · Do · Check · Act', c: BLUE, g: 'qualité', k: 'store', lab: 'GUICHET 5 / 6'},
  {at: 98.55, n: '6', title: 'NRE', s: 'régulations économiques', c: GREEN, g: 'gouvernance', k: 'gyro', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 118.6;
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
  {n: 1, l: 'OPPBTP', s: 'oppbtp', at: 8.1},
  {n: 2, l: 'TMS', s: 'tms', at: 23.1},
  {n: 3, l: 'ORSEC', s: 'orsec', at: 26.4},
  {n: 4, l: 'RID', s: 'rid', at: 43.5},
  {n: 5, l: 'REACH', s: 'reach', at: 61.7},
  {n: 6, l: 'SPC', s: 'spc', at: 88.9},
  {n: 7, l: 'RSE', s: 'rse', at: 109.8},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE SIGLES · STATION {r.n} / 7</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="danger" w={1080} h={820} pos="52% 30%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 24%, ${PAPER}CC 32%, ${PAPER} 37%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={590} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="LES SIGLES" src={IMG.c2} size={96} ls={2} seed={2} /></Abs>
      <Abs x={0} y={705} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="QHSE" src={IMG.c1} size={200} ls={6} /></Abs>
      <Abs x={0} y={935} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="DE LIE À NPS" src={IMG.c2} size={84} ls={2} seed={5} /></Abs>
      <Abs x={40} y={1200} w={1000} style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10}}>{[['PRÉVENTION', RED], ['URGENCE', ORANGE], ['RISQUES', VIO], ['CHIMIE', TEAL], ['QUALITÉ', BLUE], ['GOUVERNANCE', GREEN]].map(([n, c], k) => <div key={n} style={{...nb(c, 4), padding: '6px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', transform: `translateY(${(1 - Math.min(1, spring(t, 0.3 + k * 0.08))) * 60}px)`}}>{n}</div>)}</Abs>
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






/* ═════════════ Éclair de gyrophare (non bloquant) ═════════════ */
const GyroFlash: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  const q = (t - at) / 0.9;
  if (q < 0 || q > 1) return null;
  const a = Math.sin(q * Math.PI);
  return <AbsoluteFill style={{zIndex: 70, pointerEvents: 'none', opacity: a * 0.6, background: `radial-gradient(circle at ${50 + 45 * Math.cos(q * 12)}% 10%, rgba(224,56,62,0.85), transparent 45%), radial-gradient(circle at ${50 - 45 * Math.cos(q * 12)}% 10%, rgba(31,111,209,0.85), transparent 45%)`}} />;
};

/* ═════════════ Les 33 sigles (temps de la voix : sigle, début et fin de l'expansion) ═════════════ */
type Item = [string, number, number, number, string];
const IT: Item[] = [
  ['LIE', 0.15, 1.15, 2.98, "limite inférieure d'explosivité"],
  ['MASE', 3.71, 4.81, 7.18, "Manuel d'amélioration sécurité des entreprises"],
  ['OPPBTP', 8.1, 10.04, 13.39, "Organisme professionnel de prévention du bâtiment et des travaux publics"],
  ['PTI', 14.26, 15.11, 16.54, "protection du travailleur isolé"],
  ['RPS', 17.37, 18.4, 19.3, "risques psychosociaux"],
  ['SST', 20.08, 21.28, 22.38, "santé et sécurité au travail"],
  ['TMS', 23.13, 24.06, 25.33, "troubles musculosquelettiques"],
  ['ORSEC', 26.37, 27.37, 29.48, "Organisation de la réponse de sécurité civile"],
  ['POI', 30.34, 31.17, 32.19, "plan d'opération interne"],
  ['PPI', 32.91, 33.74, 35.19, "plan particulier d'intervention"],
  ['PPAM', 36.01, 37.31, 39.12, "politique de prévention des accidents majeurs"],
  ['PPRT', 40.01, 41.19, 42.91, "plan de prévention des risques technologiques"],
  ['RID', 43.48, 44.62, 48.19, "Regulations concerning the International carriage of Dangerous goods by rail"],
  ['SDIS', 48.99, 50.32, 51.95, "Service départemental d'incendie et de secours"],
  ['SGS', 52.37, 53.84, 54.96, "système de gestion de la sécurité"],
  ['TMD', 55.53, 56.7, 58.2, "transport de matières dangereuses"],
  ['POLMAR', 59.31, 60.14, 60.99, "pollution maritime"],
  ['REACH', 61.67, 62.49, 65.8, "enregistrement, évaluation et autorisation des produits chimiques"],
  ['SGH', 66.37, 67.6, 68.66, "système général harmonisé"],
  ['SME', 69.28, 70.28, 71.9, "système de management environnemental"],
  ['PDCA', 72.41, 73.45, 74.54, "Plan, Do, Check, Act"],
  ['QSSE', 75.16, 76.27, 78.5, "qualité, santé, sécurité, environnement"],
  ['SMQ', 79.17, 80.15, 81.75, "système de management de la qualité"],
  ['MRP', 82.28, 83.24, 85.0, "méthode de résolution de problèmes"],
  ['MSP', 85.55, 86.6, 88.22, "maîtrise statistique des procédés"],
  ['SPC', 88.85, 89.85, 93.2, "Statistical Process Control, maîtrise statistique des procédés"],
  ['TQM', 93.81, 94.88, 98.29, "Total Quality Management, management total de la qualité"],
  ['NRE', 98.92, 99.8, 101.41, "nouvelles régulations économiques"],
  ['OCDE', 102.0, 103.0, 105.87, "Organisation de coopération et de développement économiques"],
  ['OIT', 106.33, 107.23, 109.13, "Organisation internationale du travail"],
  ['RSE', 109.76, 110.71, 112.76, "responsabilité sociétale des entreprises"],
  ['MSA', 113.61, 114.48, 115.94, "Mutualité sociale agricole"],
  ['NPS', 116.48, 117.55, 118.57, "Net Promoter Score"],
];
const cl = (x: number) => Math.max(0, Math.min(1, x));
const curOf = (ids: number[], t: number) => ids.reduce((a, i) => (t >= IT[i][1] - 0.1 ? i : a), ids[0]);
const STOP = ['de', 'du', 'des', 'et', 'la', 'le', 'les', 'of', 'by', 'the', 'au', 'à'];
const norm = (ch: string) => ch.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();
const initials = (acr: string, exp: string) => {
  let p = 0;
  return exp.split(' ').map((w) => {
    const core = w.replace(/^[dlDL]['’]/, '');
    const off = w.length - core.length;
    let hi = -1;
    if (p < acr.length && core && !STOP.includes(core.toLowerCase().replace(/[,.]/g, '')) && norm(core[0]) === acr[p]) { hi = off; p++; }
    return {w, hi};
  });
};
/** Carte focus : le sigle en tuiles + l'expansion qui s'écrit au rythme de la voix, initiales surlignées. */
const Focus: React.FC<{i: number; c: string; x: number; y: number; w: number; h: number; compact?: boolean}> = ({i, c, x, y, w, h, compact}) => {
  const t = useT();
  const [acr, a, e1, e2, exp] = IT[i];
  const words = initials(acr, exp);
  const tile = Math.min(compact ? 90 : 124, (w - 60) / acr.length - 12);
  const fs = compact ? 34 : exp.length > 60 ? 38 : 46;
  return (
    <Abs x={x} y={y} w={w} h={h} style={{...nb('#fff', 8), borderColor: c, padding: compact ? '16px 24px' : '24px 28px', overflow: 'hidden'}}>
      <div style={{position: 'absolute', right: 20, top: 16, fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM, letterSpacing: 2}}>SIGLE {i + 1} / {IT.length}</div>
      <div key={acr} style={{display: 'flex', gap: 10, marginTop: compact ? 18 : 26}}>
        {acr.split('').map((L, k) => {
          const at = a + k * 0.06;
          return <div key={k} style={{width: tile, height: tile * 1.08, borderRadius: tile * 0.16, background: c, border: `5px solid ${NBK}`, boxShadow: `0 ${tile * 0.07}px 0 ${NBK}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: tile * 0.68, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `translateY(${(1 - Math.min(1, spring(t, at, 10, 15))) * -120}px) rotate(${(1 - cl((t - at) * 4)) * (k % 2 ? 12 : -12)}deg)`, opacity: t >= at - 0.02 ? 1 : 0}}>{L}</div>;
        })}
      </div>
      <div key={`e${acr}`} style={{marginTop: compact ? 14 : 26, fontFamily: sansFont, fontWeight: 800, fontSize: fs, lineHeight: 1.18, color: INK, display: 'flex', flexWrap: 'wrap', columnGap: fs * 0.28}}>
        {words.map(({w: wd, hi}, k) => {
          const at = e1 + ((e2 - e1) * k) / Math.max(1, words.length);
          const on = t >= at - 0.05;
          return <span key={k} style={{opacity: on ? 1 : 0.12, transform: `translateY(${on ? 0 : 14}px)`, transition: 'none'}}>{hi < 0 ? wd : <>{wd.slice(0, hi)}<span style={{color: c, textDecoration: 'underline', textDecorationThickness: 6, textUnderlineOffset: 6}}>{wd[hi]}</span>{wd.slice(hi + 1)}</>}</span>;
        })}
      </div>
    </Abs>
  );
};

/* ═════════════ Guichet 1 : prévention — recherche « LIE » → tableau des départs ═════════════ */
const G1 = [0, 1, 2, 3, 4, 5, 6];
const Prevention: React.FC = () => {
  const t = useT();
  const cur = curOf(G1, t);
  return (
    <Out end={26.1}>
      <Heads h={G1.map((i) => [Math.max(2.85, IT[i][1]), [IT[i][0]], [0]] as HD)} />
      <SearchOpen x={60} y={440} w={960} h={930} at={2.6} query="LIE" results={["LIE · limite inférieure d'explosivité", 'MASE · amélioration sécurité', 'OPPBTP · bâtiment et travaux publics']} found={0} foundAt={3.0} clickAt={3.3} c={RED}>
        <div style={{position: 'absolute', left: 24, right: 24, top: 56, height: 400, background: NIGHT, borderRadius: 18, border: `4px solid ${NBK}`, overflow: 'hidden'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px 18px', fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3, borderBottom: '2px solid #2A3550'}}><span>LIGNE SIGLES · PRÉVENTION</span><span>{G1.filter((i) => t >= IT[i][1] - 0.1).length} / {G1.length}</span></div>
          {G1.map((i, r) => {
            const [acr, a, , , exp] = IT[i];
            const shown = t >= Math.max(a, 3.9) - 0.1;
            const here = i === cur;
            return (
              <div key={acr} style={{display: 'flex', alignItems: 'center', gap: 14, height: 48, padding: '0 14px', background: here ? '#ffffff16' : 'transparent', borderLeft: `6px solid ${here ? RED : 'transparent'}`}}>
                <span style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#5B6B8C', width: 26}}>{String(i + 1).padStart(2, '0')}</span>
                {shown ? <Flap text={acr.padEnd(6, ' ')} at={Math.max(a, 3.9)} size={34} c={RED} /> : <div style={{width: 160}} />}
                <span style={{flex: 1, fontFamily: sansFont, fontWeight: 700, fontSize: 20, color: here ? '#fff' : '#8F9BB3', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', opacity: shown ? 1 : 0}}>{exp}</span>
              </div>
            );
          })}
        </div>
        <div style={{position: 'absolute', left: 0, top: 0}}><Focus i={cur} c={RED} x={24} y={476} w={862} h={400} /></div>
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ Guichet 2 : urgence — zones concentriques autour du site ═════════════ */
const G2: [number, number][] = [[7, 300], [9, 210], [8, 120]];
const Urgence: React.FC = () => {
  const t = useT();
  const cur = curOf([7, 8, 9], t);
  const CX = 540, CY = 790;
  return (
    <Out end={35.75}>
      <Heads h={[[29.6, ['ORSEC'], [0]], [30.34, ['POI'], [0]], [32.91, ['PPI'], [0]]]} />
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        {G2.map(([i, r]) => {
          const a = i === 7 ? 29.55 : IT[i][1];
          const p = prog(t, a, a + 0.6, easeOut);
          const here = i === cur;
          return p > 0 && (
            <g key={i}>
              <circle cx={CX} cy={CY} r={r} fill={ORANGE} fillOpacity={here ? 0.16 : 0.07} />
              <circle cx={CX} cy={CY} r={r} fill="none" stroke={here ? ORANGE : '#C9A27A'} strokeWidth={here ? 9 : 5} strokeDasharray={i === 7 ? '18 12' : undefined} pathLength={1} strokeDashoffset={0} opacity={p} />
              {here && [0, 0.5].map((o) => { const q = ((t - a) * 0.8 + o) % 1; return <circle key={o} cx={CX} cy={CY} r={r + q * 60} fill="none" stroke={ORANGE} strokeWidth={5 * (1 - q)} opacity={1 - q} />; })}
            </g>
          );
        })}
      </svg>
      <Abs x={CX - 80} y={CY - 80} w={160} h={160} style={{...nb('#fff', 6), borderRadius: 80, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="usine" size={110} /></Abs>
      {G2.map(([i, r]) => { const a = i === 7 ? 29.55 : IT[i][1]; return t > a && <Abs key={`l${i}`} x={CX - 90} y={CY - r - 28} w={180} style={{display: 'flex', justifyContent: 'center', transform: `scale(${Math.min(1, spring(t, a))})`}}><div style={{...nb(i === cur ? ORANGE : '#fff', 4), color: i === cur ? '#fff' : ORANGE, padding: '4px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 30}}>{IT[i][0]}</div></Abs>; })}
      {t > 31.17 && <Abs x={CX + 128} y={CY - 16} w={160} style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: ORANGE, opacity: pop(t, 31.6)}}>interne</Abs>}
      <Focus i={cur} c={ORANGE} x={60} y={1110} w={960} h={270} compact />
    </Out>
  );
};

/* ═════════════ Guichet 3 : risques majeurs — train de marchandises, chaque wagon porte un sigle ═════════════ */
const G3 = [10, 11, 12, 13, 14, 15, 16];
const LOCO = 260, STRIDE = 320, WW = 300;
const trainX = (t: number) => {
  const X = (k: number) => 540 - LOCO - k * STRIDE - WW / 2;
  let x = X(0);
  G3.forEach((i, k) => { if (k > 0) x = lerp(x, X(k), prog(t, IT[i][1] - 0.75, IT[i][1] - 0.05, easeInOut)); });
  return x;
};
const Risques: React.FC = () => {
  const t = useT();
  const cur = curOf(G3, t);
  const x = trainX(t);
  const moving = G3.some((i, k) => k > 0 && t > IT[i][1] - 0.75 && t < IT[i][1] - 0.05);
  return (
    <Out end={61.45}>
      <Heads h={G3.map((i) => [Math.max(39.3, IT[i][1]), [IT[i][0]], [0]] as HD)} />
      <Abs x={60} y={450} w={960} h={60} style={{...nb(BLUE, 6), display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 24, letterSpacing: 3}}><span>QUAI · RISQUES MAJEURS</span><span>{G3.indexOf(cur) + 1} / {G3.length}</span></Abs>
      <svg width={1080} height={460} style={{position: 'absolute', left: 0, top: 520}}>
        <rect x={0} y={380} width={1080} height={70} fill="#C9D2DF" /><rect x={0} y={380} width={1080} height={10} fill={YEL} />
        {Array.from({length: 30}, (_, k) => <rect key={k} x={((k * 50 - x * 0) % 1100)} y={352} width={26} height={10} fill="#8A6A4A" />)}
        <rect x={0} y={346} width={1080} height={6} fill="#5B6472" /><rect x={0} y={362} width={1080} height={6} fill="#5B6472" />
        <g transform={`translate(${x} 0)`}>
          <g>
            <rect x={20} y={170} width={230} height={160} rx={14} fill={RED} stroke={NBK} strokeWidth={6} />
            <rect x={140} y={110} width={110} height={90} rx={10} fill={RED} stroke={NBK} strokeWidth={6} /><rect x={156} y={124} width={78} height={44} rx={6} fill="#BFD7EA" stroke={NBK} strokeWidth={4} />
            <rect x={48} y={120} width={36} height={56} fill="#5B6472" stroke={NBK} strokeWidth={4} />
            <circle cx={24} cy={270} r={14} fill={YEL} stroke={NBK} strokeWidth={4} />
            {moving && [0, 1, 2].map((k) => { const q = ((t * 1.5 + k / 3) % 1); return <circle key={k} cx={66 + q * 60} cy={110 - q * 90} r={14 + q * 26} fill="#9AA3B2" opacity={1 - q} />; })}
            {[70, 200].map((wx) => <g key={wx} transform={`translate(${wx} 340) rotate(${-x * 1.4})`}><circle r={26} fill={NBK} /><circle r={9} fill="#C9D2DF" /><rect x={-3} y={-24} width={6} height={14} fill="#C9D2DF" /></g>)}
          </g>
          {G3.map((i, k) => {
            const wx = LOCO + k * STRIDE;
            const here = i === cur;
            return (
              <g key={i} transform={`translate(${wx} 0)`}>
                <rect x={-20} y={300} width={22} height={10} fill={NBK} />
                <rect x={0} y={170} width={WW} height={160} rx={12} fill={k % 2 ? '#2E5E9E' : '#3B4660'} stroke={NBK} strokeWidth={6} />
                {here && <rect x={-8} y={162} width={WW + 16} height={176} rx={16} fill="none" stroke={YEL} strokeWidth={8} opacity={0.7 + 0.3 * Math.sin(t * 8)} />}
                <rect x={40} y={205} width={220} height={90} rx={8} fill={ORANGE} stroke={NBK} strokeWidth={6} />
                <text x={150} y={268} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={IT[i][0].length > 4 ? 44 : 56} fill={NBK}>{IT[i][0]}</text>
                {[60, 240].map((wx2) => <g key={wx2} transform={`translate(${wx2} 340) rotate(${-x * 1.4})`}><circle r={24} fill={NBK} /><circle r={8} fill="#C9D2DF" /><rect x={-3} y={-22} width={6} height={12} fill="#C9D2DF" /></g>)}
              </g>
            );
          })}
        </g>
      </svg>
      <Focus i={cur} c={VIO} x={60} y={990} w={960} h={390} />
    </Out>
  );
};

/* ═════════════ Guichet 4 : chimie & environnement — tuiles qui pivotent comme un tableau périodique ═════════════ */
const G4: [number, string][] = [[17, 'goutte'], [18, 'danger'], [19, 'feuille']];
const Chimie: React.FC = () => {
  const t = useT();
  const cur = curOf(G4.map((g) => g[0]), t);
  return (
    <Out end={72.2}>
      <Heads h={G4.map(([i]) => [Math.max(65.0, IT[i][1]), [IT[i][0]], [0]] as HD)} />
      {G4.map(([i, ic], k) => {
        const a = i === 17 ? 64.95 : IT[i][1];
        const f = prog(t, a - 0.1, a + 0.45, easeOut);
        const here = i === cur;
        return (
          <Abs key={i} x={70 + k * 325} y={470} w={290} h={320} style={{perspective: 1200}}>
            <div style={{width: '100%', height: '100%', ...nb(here ? TEAL : '#fff', 8), transform: `rotateY(${(1 - f) * 90}deg) scale(${here ? 1.04 : 1})`, opacity: f > 0.02 ? 1 : 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14}}>
              <div style={{position: 'absolute', right: 16, top: 14}}><F n={ic} size={56} /></div>
              <div style={{position: 'absolute', left: 18, top: 16, fontFamily: MONO, fontWeight: 700, fontSize: 24, color: here ? '#fff' : DIM}}>{i + 1}</div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: IT[i][0].length > 4 ? 72 : 92, color: here ? '#fff' : TEAL}}>{IT[i][0]}</div>
            </div>
          </Abs>
        );
      })}
      <Focus i={cur} c={TEAL} x={60} y={830} w={960} h={540} />
    </Out>
  );
};

/* ═════════════ Guichet 5 : qualité — carte de contrôle qui se trace, un point par sigle ═════════════ */
const G5 = [20, 21, 22, 23, 24, 25, 26];
const T0 = 74.9, T1 = 98.65;
const cx5 = (tt: number) => 30 + ((Math.max(T0, tt) - T0) / (T1 - T0)) * 880;
const cy5 = (tt: number) => 175 + Math.sin(tt * 1.7) * 55 + (random(`q${Math.floor(tt * 4)}`) - 0.5) * 40;
const Qualite: React.FC = () => {
  const t = useT();
  const cur = curOf(G5, t);
  const pts: string[] = [];
  for (let tt = T0; tt <= Math.min(t, T1); tt += 0.25) pts.push(`${cx5(tt).toFixed(1)},${cy5(tt).toFixed(1)}`);
  return (
    <Out end={98.65}>
      <Heads h={G5.map((i) => [Math.max(75.0, IT[i][1]), [IT[i][0]], [0]] as HD)} />
      <Abs x={60} y={450} w={960} h={380} style={{...nb('#fff', 7), borderColor: BLUE, overflow: 'hidden', opacity: pop(t, 74.9)}}>
        <svg width={940} height={360} style={{position: 'absolute', left: 6, top: 8}}>
          <line x1={20} x2={920} y1={70} y2={70} stroke={RED} strokeWidth={4} strokeDasharray="16 10" />
          <line x1={20} x2={920} y1={280} y2={280} stroke={RED} strokeWidth={4} strokeDasharray="16 10" />
          <line x1={20} x2={920} y1={175} y2={175} stroke={GREEN} strokeWidth={4} />
          <polyline points={pts.join(' ')} fill="none" stroke={BLUE} strokeWidth={6} strokeLinejoin="round" />
          {G5.map((i) => {
            const at = IT[i][1];
            if (t < Math.max(T0, at) - 0.05) return null;
            const px = cx5(at), py = cy5(Math.max(T0, at));
            const here = i === cur;
            return (
              <g key={i}>
                {here && <circle cx={px} cy={py} r={20 + Math.sin(t * 8) * 4} fill={BLUE} opacity={0.25} />}
                <circle cx={px} cy={py} r={11} fill={here ? YEL : '#fff'} stroke={NBK} strokeWidth={4} />
                <g transform={`translate(${Math.min(860, Math.max(50, px))} ${py < 175 ? py + 46 : py - 30})`}><rect x={-44} y={-24} width={88} height={34} rx={8} fill={here ? BLUE : '#fff'} stroke={NBK} strokeWidth={3} /><text y={2} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={20} fill={here ? '#fff' : BLUE}>{IT[i][0]}</text></g>
              </g>
            );
          })}
        </svg>
      </Abs>
      <Focus i={cur} c={BLUE} x={60} y={860} w={960} h={510} />
    </Out>
  );
};

/* ═════════════ Guichet 6 : gouvernance — cartes distribuées sur la table ═════════════ */
const G6 = [27, 28, 29, 30, 31, 32];
const Gouvernance: React.FC = () => {
  const t = useT();
  const cur = curOf(G6, t);
  return (
    <Out end={OUTRO_AT}>
      <Heads h={G6.map((i) => [Math.max(102.0, IT[i][1]), [IT[i][0]], [0]] as HD)} />
      <Abs x={60} y={450} w={960} h={420} style={{...nb('#fff', 7), borderColor: GREEN, overflow: 'hidden', opacity: pop(t, 101.95)}}>
        <Img src={PH(IMG.intl)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(1.1)'}} />
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14,42,92,0.35), rgba(14,42,92,0.8))'}} />
        {G6.map((i, k) => {
          const a = i === 27 ? 101.95 : IT[i][1];
          if (t < a - 0.02) return null;
          const p = Math.min(1, spring(t, a, 8, 13));
          const here = i === cur;
          const fx = 30 + k * 152, fy = 120;
          return (
            <div key={i} style={{position: 'absolute', left: lerp(400, fx, p), top: lerp(460, fy - (here ? 26 : 0), p), width: 140, height: 200, borderRadius: 16, background: '#fff', border: `5px solid ${here ? YEL : NBK}`, boxShadow: here ? `0 0 0 6px ${GREEN}` : `5px 5px 0 ${NBK}`, transform: `rotate(${lerp(-40, (k - 2.5) * 5, p)}deg) scale(${here ? 1.08 : 1})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8}}>
              <div style={{position: 'absolute', left: 10, top: 8, fontFamily: MONO, fontWeight: 700, fontSize: 16, color: DIM}}>{i + 1}</div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: IT[i][0].length > 3 ? 36 : 44, color: GREEN}}>{IT[i][0]}</div>
              <div style={{width: 60, height: 6, borderRadius: 3, background: GREEN}} />
            </div>
          );
        })}
      </Abs>
      <Focus i={cur} c={GREEN} x={60} y={900} w={960} h={470} />
    </Out>
  );
};

/* ═════════════ Bruitage ═════════════ */
const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const inTrans = (tt: number) => SECT.some((x) => x.k !== 'none' && tt > x.at - 0.1 && tt < x.at + 3.7);
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at, s: 'sfx/bell', v: 0.2})),
  ...searchCues(2.6, 3, 3.0, 3.3),
  ...IT.filter(([, a]) => a > 3.5 && !inTrans(a)).flatMap(([acr, a, e1]) => [...rep(a, acr.length, 0.06, 'tick', 0.18), {at: e1, s: 'sfx/pop', v: 0.18}] as Sfx[]),
  ...G3.slice(1).flatMap((i) => [{at: IT[i][1] - 0.75, s: 'soft-whoosh', v: 0.3, dur: 0.7}, {at: IT[i][1] - 0.05, s: 'sfx/thud', v: 0.3}] as Sfx[]),
  {at: 30.34, s: 'deep-hit', v: 0.35}, {at: 32.91, s: 'deep-hit', v: 0.35},
  ...G4.slice(1).map(([i]) => ({at: IT[i][1] - 0.1, s: 'sfx/swish', v: 0.35})),
  ...G5.map((i) => ({at: Math.max(75.0, IT[i][1]), s: 'sfx/ding', v: 0.22})),
  ...G6.slice(1).map((i) => ({at: IT[i][1], s: 'sfx/swish', v: 0.35})),
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SCN: [React.FC, number, number][] = [[Prevention, 2.5, 26.15], [Urgence, 29.5, 35.8], [Risques, 39.2, 61.5], [Chimie, 64.9, 72.25], [Qualite, 74.85, 98.7], [Gouvernance, 101.9, OUTRO_AT]];
const VOICE_FROM = 1.2;
export const SiglesMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    {SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    {/* Voix : le fragment coupé du début (0–0,6 s) est retiré. */}
    <Audio src={staticFile('voix-sigles-metro-origine.m4a')} trimBefore={s(VOICE_FROM)} trimAfter={s(VOICE_FROM + OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn, Barred, Flap];
