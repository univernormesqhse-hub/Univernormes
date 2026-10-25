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
 * « Plan de prévention vs plan d'intervention » (voix d'origine, 1 min 11) — capsule « condensé + effet wahou + ultra
 * premium » présentée en métro (6 stations). Tube de verre à six guichets adaptés au sujet : confusion → prévention →
 * consignation → intervention → incendie → à retenir ; la capsule file d'un guichet à l'autre. Gyrophare (principal),
 * loupe, capsule pneumatique, store vénitien ; barre de recherche qui trouve et ouvre « anticiper / réagir ». Kit
 * capsule-ui-neo-brutal (cartes à ombre dure, badges, bouton S'abonner cliqué) et capsule-recit-illustre (entreprise
 * utilisatrice / entreprise extérieure, avant / pendant). Couverture : photo + « PRÉVENTION / INTERVENTION » en
 * lettres-photos animées.
 */
const IMG = {
  cover: 'promo/terrain-controle.jpg',
  cPrev: 'promo/raffinerie.jpg',
  cInt: 'permisfeu/soudeur-etincelles.jpg',
  exterieur: 'influence-gen/terrain.jpg',
  usine: 'promo/raffinerie.jpg',
  machine: 'promo/hse-machine.jpg',
  incendie: 'promo/formation-incendie.jpg',
  extincteur: 'permisfeu/extincteur.jpg',
  doc: 'sysqsse-gen/architecte.jpg',
  equipe: 'heures-gen/equipe-chantier.jpg',
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
const OUTRO_AT = 71.0;
export const PLANS_PREV_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 4.3, n: '1', title: 'Le piège', s: 'confondre les deux plans', c: RED, g: 'confusion', k: 'gyro', lab: 'GUICHET 1 / 6'},
  {at: 11.9, n: '2', title: 'Plan de prévention', s: 'c’est l’anticipation', c: GREEN, g: 'prévention', k: 'loupe', lab: 'GUICHET 2 / 6'},
  {at: 24.2, n: '3', title: 'La consignation', s: 'avant la maintenance', c: BLUE, g: 'consignation', k: 'none', lab: 'GUICHET 3 / 6'},
  {at: 28.6, n: '4', title: 'Plan d’intervention', s: 'organiser les actions', c: ORANGE, g: 'intervention', k: 'tube', lab: 'GUICHET 4 / 6'},
  {at: 35.7, n: '5', title: 'En cas d’incendie', s: 'alerte · consignes · équipes', c: RED, g: 'incendie', k: 'none', lab: 'GUICHET 5 / 6'},
  {at: 43.7, n: '6', title: 'À retenir', s: 'éviter ≠ organiser', c: VIO, g: 'à retenir', k: 'store', lab: 'GUICHET 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 66.5;
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
  {n: 1, l: 'Le piège · les confondre', s: 'confusion', at: 7.9},
  {n: 2, l: 'Prévention · anticiper', s: 'prévention', at: 15.4},
  {n: 3, l: 'Consignation · énergie à zéro', s: 'consignation', at: 24.4},
  {n: 4, l: 'Intervention · organiser', s: 'intervention', at: 32.1},
  {n: 5, l: 'Incendie · alerte & équipes', s: 'incendie', at: 36.0},
  {n: 6, l: 'À retenir · éviter ≠ organiser', s: 'à retenir', at: 47.2},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE QHSE · STATION {r.n} / 6</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="clipboard" w={1080} h={820} pos="50% 30%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 24%, ${PAPER}CC 32%, ${PAPER} 37%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 18}}><div style={{...nb(NBK, 5), color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3, padding: '8px 22px'}}>NE LES CONFONDEZ PLUS</div><div style={{transform: 'rotate(-8deg)'}}><div style={{...nb(RED, 5), color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 26, padding: '6px 16px'}}>QHSE</div></div></Abs>
      <Abs x={0} y={650} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="PRÉVENTION" src={IMG.cPrev} size={136} ls={2} /></Abs>
      <Abs x={0} y={800} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb(YEL, 6), fontFamily: sansFont, fontWeight: 900, fontSize: 54, color: NBK, padding: '0 26px', transform: `rotate(-4deg) scale(${spring(t, 0.3)})`}}>VS</div></Abs>
      <Abs x={0} y={900} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="INTERVENTION" src={IMG.cInt} size={118} ls={1} seed={3} /></Abs>
      <Abs x={90} y={1070} w={900} style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{...nb('#fff', 6), width: 420, padding: 18, display: 'flex', alignItems: 'center', gap: 14}}><F n="bouclier" size={80} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: GREEN, lineHeight: 1.1}}>anticiper<br /><span style={{color: DIM, fontSize: 22}}>avant les travaux</span></div></div>
        <div style={{...nb('#fff', 6), width: 420, padding: 18, display: 'flex', alignItems: 'center', gap: 14}}><F n="sirene" size={80} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: ORANGE, lineHeight: 1.1}}>organiser<br /><span style={{color: DIM, fontSize: 22}}>en cas d’urgence</span></div></div>
      </Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* Classeur 3D (récit illustré) */
const Binder: React.FC<{l: string; c: string; ic: string; w?: number}> = ({l, c, ic, w = 330}) => (
  <div style={{...nb('#fff', 8), width: w, height: w * 1.25, overflow: 'hidden', position: 'relative'}}>
    <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 46, background: c, borderRight: `4px solid ${NBK}`}} />
    <div style={{position: 'absolute', left: 14, top: '42%', width: 18, height: 60, borderRadius: 9, background: '#fff', border: `3px solid ${NBK}`}} />
    <div style={{position: 'absolute', left: 60, right: 14, top: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}><F n={ic} size={w * 0.36} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: w * 0.1, color: NBK, textAlign: 'center', lineHeight: 1.05}}>{l}</div></div>
  </div>
);

/* ═════════════ Intro : les deux classeurs se percutent → recherche → anticiper / réagir ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  if (t < 7.6) {
    const slide = prog(t, 2.8, 3.4, easeOut);
    const hit = t > 3.4 ? Math.sin((t - 3.4) * 40) * 12 * (1 - prog(t, 3.4, 3.9)) : 0;
    return (
      <Out end={4.35}>
        <HiLine words={['Ne', 'les', 'confondez', 'plus']} mark={[2]} at={2.9} y={330} size={64} />
        <Abs x={60} y={440} w={960} h={930}>
          <div style={{position: 'absolute', left: lerp(-420, 120, slide) + hit, top: 140, transform: 'rotate(-6deg)'}}><Binder l="PLAN DE PRÉVENTION" c={GREEN} ic="bouclier" /></div>
          <div style={{position: 'absolute', left: lerp(1000, 500, slide) - hit, top: 180, transform: 'rotate(5deg)'}}><Binder l="PLAN D’INTERVENTION" c={ORANGE} ic="sirene" /></div>
          {t > 3.4 && <div style={{position: 'absolute', left: 380, top: 120, transform: `scale(${spring(t, 3.4)})`}}><F n="collision" size={200} /></div>}
          <div style={{position: 'absolute', left: 0, right: 0, top: 700, display: 'flex', justifyContent: 'center'}}><NBadge at={3.5} text="≠" bg={RED} rot={-6} size={70} /></div>
        </Abs>
      </Out>
    );
  }
  return (
    <Out end={11.95}>
      <HiLine words={t < 10.2 ? ['Erreur', 'de', 'maîtrise'] : ['Anticiper', 'ou', 'réagir']} mark={t < 10.2 ? [0, 2] : [0, 2]} at={t < 10.2 ? 7.9 : 10.3} y={330} size={64} />
      <SearchOpen x={60} y={440} w={960} h={930} at={7.7} query="prévention ou intervention ?" results={['Un seul document fourre-tout', 'Anticiper ≠ organiser la réponse', 'Copier le plan du voisin']} found={1} foundAt={9.9} clickAt={10.3} c={NAVY}>
        <div style={{position: 'absolute', inset: 0, display: 'flex'}}>
          <div style={{flex: 1, background: `${GREEN}18`, borderRight: `4px solid ${NBK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, transform: `translateX(${(1 - prog(t, 11.0, 11.4, easeOut)) * -60}px)`}}><F n="bouclier" size={200} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: GREEN}}>ANTICIPER</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>plan de prévention</div></div>
          <div style={{flex: 1, background: `${ORANGE}18`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, transform: `translateX(${(1 - prog(t, 11.1, 11.5, easeOut)) * 60}px)`}}><F n="sirene" size={200} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: ORANGE}}>ORGANISER</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>plan d’intervention</div></div>
        </div>
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ Prévention : entreprise utilisatrice + entreprise extérieure → coactivité → mesures avant travaux ═════════════ */
const Prevention: React.FC = () => {
  const t = useT();
  const zone = prog(t, 19.0, 19.6, easeOut);
  const bar = prog(t, 21.0, 23.4, easeInOut);
  return (
    <Out end={24.25}>
      <HiLine words={t < 20.6 ? ['La', 'coactivité'] : ['Avant', 'les', 'travaux']} mark={t < 20.6 ? [1] : [0, 2]} at={t < 20.6 ? 15.4 : 20.8} y={330} size={64} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{...nb('#fff'), position: 'absolute', left: lerp(-500, 0, prog(t, 15.3, 15.8, easeOut)), top: 0, width: 440, height: 400, overflow: 'hidden'}}><Pic src={IMG.usine} ic="usine" w={432} h={290} pos="50% 50%" /><div style={{padding: 12, fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: NBK, display: 'flex', alignItems: 'center', gap: 10}}><F n="usine" size={44} />votre usine</div></div>
        <div style={{...nb('#fff'), position: 'absolute', right: lerp(-500, 0, prog(t, 16.4, 16.9, easeOut)), top: 0, width: 440, height: 400, overflow: 'hidden'}}><Pic src={IMG.exterieur} ic="intervenant" w={432} h={290} pos="50% 40%" /><div style={{padding: 12, fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: NBK, display: 'flex', alignItems: 'center', gap: 10}}><F n="intervenant" size={44} />entreprise extérieure</div></div>
        {zone > 0 && <div style={{position: 'absolute', left: 330, top: 130, width: 300, height: 140, borderRadius: 70, background: `repeating-linear-gradient(45deg, ${RED}, ${RED} 18px, ${YEL} 18px, ${YEL} 36px)`, border: `5px solid ${NBK}`, boxShadow: `0 0 ${30 + 20 * Math.abs(Math.sin(t * 5))}px ${RED}`, transform: `scale(${spring(t, 19.0)})`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div style={{background: '#fff', border: `4px solid ${NBK}`, borderRadius: 12, padding: '4px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: RED}}>COACTIVITÉ</div></div>}
        <div style={{position: 'absolute', left: 40, top: 440, display: 'flex', flexDirection: 'column', gap: 14}}>
          <Chip at={18.4} ic="danger" l="risques identifiés" c={RED} />
          <Chip at={21.2} ic="bouclier" l="mesures de prévention" c={GREEN} />
          <Chip at={22.4} ic="calendrier" l="avant le démarrage" c={BLUE} />
        </div>
        <div style={{...nb('#fff', 6), position: 'absolute', left: 40, right: 40, top: 760, height: 120, opacity: pop(t, 20.9), padding: '18px 24px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM}}><span>ANALYSE</span><span>MESURES</span><span style={{color: bar >= 1 ? GREEN : DIM}}>DÉMARRAGE ▶</span></div>
          <div style={{marginTop: 14, height: 28, borderRadius: 14, border: `4px solid ${NBK}`, overflow: 'hidden', background: '#EEF1F5'}}><div style={{width: `${bar * 100}%`, height: '100%', background: `linear-gradient(90deg, ${RED}, ${YEL}, ${GREEN})`}} /></div>
        </div>
        <Stamp at={23.4} text="AVANT" c={GREEN} x={600} y={450} rot={-12} />
      </Abs>
    </Out>
  );
};

/* ═════════════ Consignation : cadenas qui se ferme, énergie qui tombe à zéro ═════════════ */
const Consignation: React.FC = () => {
  const t = useT();
  const lock = prog(t, 25.4, 25.9, easeIn);
  const nrj = 1 - prog(t, 25.9, 27.2, easeInOut);
  return (
    <Out end={28.65}>
      <HiLine words={['Consigner', 'avant', 'd’agir']} mark={[0]} at={24.5} y={330} size={64} />
      <Shot src={IMG.machine} ic="engrenage" x={60} y={440} w={960} h={520} at={24.3} pos="50% 35%" c={BLUE} filter={`saturate(${0.4 + nrj * 0.6})`} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{position: 'absolute', left: 620, top: 300, transform: `scale(${pop(t, 24.9)})`}}>
          <svg width={220} height={240} viewBox="0 0 110 120"><path d={`M 28 ${58 - 18 * (1 - lock)} V 34 a 27 27 0 0 1 54 0 V 58`} fill="none" stroke={NBK} strokeWidth={12} strokeLinecap="round" transform={`translate(${(1 - lock) * 14} 0)`} /><rect x={14} y={54} width={82} height={62} rx={12} fill={RED} stroke={NBK} strokeWidth={6} /><circle cx={55} cy={80} r={8} fill={NBK} /><rect x={51} y={84} width={8} height={18} fill={NBK} /></svg>
        </div>
        {t > 25.9 && <div style={{position: 'absolute', left: 560, top: 200, transform: `rotate(8deg) scale(${spring(t, 25.9)})`}}><div style={{...nb('#fff', 5), borderColor: RED, padding: '8px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: RED, textAlign: 'center', lineHeight: 1.1}}>CONSIGNÉ<br /><span style={{fontSize: 16, color: NBK}}>ne pas manœuvrer</span></div></div>}
        <div style={{...nb('#fff', 6), position: 'absolute', left: 0, right: 0, top: 560, height: 170, padding: '18px 26px', opacity: pop(t, 24.8)}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><div style={{display: 'flex', alignItems: 'center', gap: 12, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: NBK}}><F n="eclair" size={52} />énergie de la machine</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 40, color: nrj < 0.02 ? GREEN : RED}}>{nrj < 0.02 ? '0 ✓' : '⚡'}</div></div>
          <div style={{marginTop: 16, height: 40, borderRadius: 20, border: `4px solid ${NBK}`, overflow: 'hidden', background: '#EEF1F5'}}><div style={{width: `${nrj * 100}%`, height: '100%', background: `linear-gradient(90deg, ${YEL}, ${RED})`}} /></div>
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 780, display: 'flex', justifyContent: 'center', gap: 16}}><Chip at={26.6} ic="outils" l="puis la maintenance" c={BLUE} /></div>
      </Abs>
    </Out>
  );
};

/* ═════════════ Intervention : panneau de nuit, sirène, actions à mener ═════════════ */
const Intervention: React.FC = () => {
  const t = useT();
  const urg = t > 33.9;
  const beam = (t * 300) % 360;
  return (
    <Out end={35.75}>
      <HiLine words={urg ? ['Situation', 'd’urgence'] : ['Organiser', 'les', 'actions']} mark={urg ? [0, 1] : [0, 2]} at={urg ? 34.0 : 32.1} y={330} size={64} />
      <Abs x={60} y={440} w={960} h={930} style={{...nb(NIGHT), overflow: 'hidden', opacity: pop(t, 32.0)}}>
        {urg && <AbsoluteFill style={{background: `conic-gradient(from ${beam}deg at 480px 260px, rgba(240,122,18,0.45) 0deg, transparent 30deg, transparent 180deg, rgba(240,122,18,0.45) 180deg, transparent 210deg)`}} />}
        <div style={{position: 'absolute', left: 380, top: 160, transform: `scale(${urg ? 1 + 0.06 * Math.sin(t * 14) : 0.9})`, filter: urg ? `drop-shadow(0 0 40px ${ORANGE})` : 'grayscale(0.6)'}}><F n="sirene" size={200} /></div>
        <div style={{position: 'absolute', left: 60, top: 460, display: 'flex', flexDirection: 'column', gap: 16}}>
          <Chip at={32.3} ic="clipboard" l="les actions à mener" c={ORANGE} />
          <Chip at={33.2} ic="intervenant" l="intervention spécifique" c={ORANGE} />
          <Chip at={34.1} ic="sirene" l="situation d’urgence" c={RED} />
        </div>
        {urg && <div style={{position: 'absolute', left: 0, right: 0, top: 60, display: 'flex', justifyContent: 'center'}}><NBadge at={34.0} text="PLAN D’INTERVENTION ACTIVÉ" bg={ORANGE} rot={-3} size={32} /></div>}
      </Abs>
    </Out>
  );
};

/* ═════════════ Incendie : 3 actions qui s'allument une à une, bord rouge pulsé ═════════════ */
const STEPS = [
  {at: 37.4, ic: 'megaphone', l: 'Donner l’alerte'},
  {at: 38.7, ic: 'clipboard', l: 'Appliquer les consignes'},
  {at: 41.5, ic: 'equipe', l: 'Équipes compétentes'},
];
const Incendie: React.FC = () => {
  const t = useT();
  const pulse = 0.5 + 0.5 * Math.sin(t * 8);
  return (
    <Out end={43.75}>
      <HiLine words={['En', 'cas', 'd’incendie']} mark={[2]} at={36.0} y={330} size={64} />
      <Shot src={IMG.incendie} ic="feu" x={60} y={440} w={960} h={380} at={35.9} pos="50% 40%" c={RED} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{position: 'absolute', inset: -8, borderRadius: 34, border: `8px solid rgba(224,74,63,${0.3 + 0.6 * pulse})`, boxShadow: `0 0 ${20 + 30 * pulse}px rgba(224,74,63,0.6)`, pointerEvents: 'none'}} />
        <div style={{position: 'absolute', right: 20, top: 210, transform: `scale(${pop(t, 36.4)}) rotate(${Math.sin(t * 3) * 6}deg)`}}><F n="feu" size={150} /></div>
        <div style={{position: 'absolute', left: 30, right: 30, top: 420, display: 'flex', flexDirection: 'column', gap: 18}}>
          {STEPS.map((x, k) => { const on = t > x.at; return (
            <div key={k} style={{...nb(on ? '#fff' : '#F1F1EA', 7), display: 'flex', alignItems: 'center', gap: 20, padding: '14px 20px', opacity: on ? 1 : 0.35, transform: `translateX(${on ? (1 - Math.min(1, spring(t, x.at))) * -80 : 0}px)`}}>
              <div style={{width: 80, height: 80, borderRadius: 40, background: on ? RED : '#DDD', border: `4px solid ${NBK}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{k + 1}</div>
              <F n={x.ic} size={70} />
              <div style={{flex: 1, fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: NBK}}>{x.l}</div>
              {on && <div style={{fontSize: 44, fontWeight: 900, color: GREEN, transform: `scale(${spring(t, x.at + 0.2)})`}}>✓</div>}
            </div>
          ); })}
        </div>
      </Abs>
    </Out>
  );
};

/* ═════════════ À retenir : duel éviter / organiser ═════════════ */
const Retenir: React.FC = () => {
  const t = useT();
  const col = (x: number, c: string, ic: string, h: string, l: string, at: number) => (
    <div style={{...nb('#fff', 9), position: 'absolute', left: x, top: 60, width: 440, height: 600, overflow: 'hidden', transform: `translateY(${(1 - Math.min(1, spring(t, at))) * 300}px)`, opacity: t > at ? 1 : 0}}>
      <div style={{height: 120, background: c, borderBottom: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: '#fff', textAlign: 'center', lineHeight: 1.05}}>{h}</div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26, paddingTop: 40}}><F n={ic} size={190} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: NBK, textAlign: 'center', padding: '0 20px', lineHeight: 1.1}}>{l}</div></div>
    </div>
  );
  return (
    <Out end={52.0}>
      <HiLine words={['Retiens', 'ceci']} mark={[0]} at={47.1} y={330} size={64} />
      <Abs x={60} y={440} w={960} h={930}>
        {col(0, GREEN, 'bouclier', 'PLAN DE PRÉVENTION', 'vise à éviter l’accident', 47.1)}
        {col(520, ORANGE, 'clipboard', 'PLAN D’INTERVENTION', 'organise les actions à entreprendre', 48.4)}
        {t > 48.9 && <div style={{position: 'absolute', left: 405, top: 290, transform: `scale(${spring(t, 48.9)}) rotate(-8deg)`}}><div style={{...nb(YEL, 6), width: 150, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: NBK}}>≠</div></div>}
        <div style={{position: 'absolute', left: 0, right: 0, top: 700, display: 'flex', justifyContent: 'space-between', padding: '0 30px'}}><NBadge at={49.6} text="avant l’accident" bg={GREEN} rot={-3} size={28} /><NBadge at={50.2} text="en cas d’urgence" bg={ORANGE} rot={3} size={28} /></div>
      </Abs>
    </Out>
  );
};

/* ═════════════ Contexte → documents = risques ═════════════ */
const Contexte: React.FC = () => {
  const t = useT();
  const ph = t < 56.5 ? 0 : 1;
  const morph = Math.sin((t - 53.5) * 2.2);
  return (
    <Out end={60.5}>
      <HiLine words={ph === 0 ? ['Selon', 'le', 'contexte'] : ['Maîtriser', 'les', 'documents']} mark={ph === 0 ? [2] : [0, 2]} at={ph === 0 ? 52.2 : 56.8} y={330} size={64} />
      {ph === 0 ? <Abs x={60} y={440} w={960} h={930}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 30, display: 'flex', justifyContent: 'center'}}><NBadge at={52.1} text="⚠ ATTENTION" bg={RED} rot={-4} size={36} /></div>
        <div style={{position: 'absolute', left: 300, top: 180, transform: `scale(${pop(t, 52.6) * (1 + (t > 53.5 ? 0.08 * morph : 0))}) rotate(${t > 53.5 ? morph * 4 : 0}deg)`}}><Binder l="PLAN D’INTERVENTION" c={ORANGE} ic="sirene" w={360} /></div>
        <div style={{position: 'absolute', left: 40, right: 40, top: 680, display: 'flex', justifyContent: 'center'}}><Chip at={54.4} ic="boussole" l="son contenu exact dépend du contexte" c={ORANGE} /></div>
      </Abs> : <Abs x={60} y={440} w={960} h={930}>
        <Shot src={IMG.doc} ic="dossier" x={0} y={0} w={420} h={560} at={56.6} pos="50% 30%" c={NAVY} />
        <div style={{position: 'absolute', left: 470, top: 40, display: 'flex', flexDirection: 'column', gap: 20}}>
          <div style={{...nb('#fff', 6), padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 14, opacity: pop(t, 57.0)}}><F n="classeur" size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32}}>documents maîtrisés</span></div>
          <div style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: NBK, opacity: pop(t, 58.0)}}>=</div>
          <div style={{...nb('#fff', 6), padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 14, opacity: pop(t, 58.6), boxShadow: `8px 8px 0 ${GREEN}`}}><F n="bouclier" size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32}}>risques maîtrisés</span></div>
        </div>
        <Stamp at={59.0} text="QHSE" c={GREEN} x={560} y={620} rot={-6} />
      </Abs>}
    </Out>
  );
};

/* ═════════════ Abonnement (bouton néo-brutal cliqué) + signature ═════════════ */
const Fin: React.FC = () => {
  const t = useT();
  const click = 62.6;
  const cur = prog(t, 61.4, click, easeInOut);
  const done = t > click;
  const ph = t < 66.3 ? 0 : 1;
  return (
    <>
      <HiLine words={ph === 0 ? ['Abonne-toi'] : ['Un', 'avenir', 'durable']} mark={ph === 0 ? [0] : [1, 2]} at={ph === 0 ? 60.8 : 66.6} y={330} size={64} />
      <Abs x={60} y={440} w={960} h={930}>
        {ph === 0 ? <>
          <div style={{...nb('#fff', 8), position: 'absolute', left: 80, right: 80, top: 20, height: 300, overflow: 'hidden', opacity: pop(t, 60.6)}}><Pic src={IMG.equipe} ic="equipe" w={792} h={300} pos="50% 40%" /></div>
          <div style={{position: 'absolute', left: 230, top: 380, width: 500, height: 120, ...nb(done ? NBK : RED, done ? 4 : 10), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: '#fff', transform: `translate(${done && t < click + 0.15 ? 6 : 0}px, ${done && t < click + 0.15 ? 6 : 0}px) scale(${pop(t, 61.0)})`}}>{done ? '✓ Abonné' : 'S’abonner'}</div>
          {t > 61.2 && t < click + 0.8 && <div style={{position: 'absolute', left: lerp(860, 560, cur), top: lerp(700, 450, cur), zIndex: 5, transform: `scale(${done && t < click + 0.2 ? 0.85 : 1})`}}><svg width={60} height={74} viewBox="0 0 24 30"><path d="M2 2 L2 24 L8 18 L12 28 L16 26 L12 17 L20 17 Z" fill="#fff" stroke={INK} strokeWidth={2} strokeLinejoin="round" /></svg></div>}
          {done && t < click + 0.7 && <div style={{position: 'absolute', left: 480 - (t - click) * 400, top: 440 - (t - click) * 400, width: (t - click) * 800, height: (t - click) * 800, borderRadius: '50%', border: `6px solid ${RED}`, opacity: 1 - (t - click) / 0.7}} />}
          <div style={{position: 'absolute', left: 0, right: 0, top: 580, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14}}>{[['bouclier', 'prévention', 63.3], ['casque', 'sécurité', 63.9], ['graphique', 'management des risques', 64.5]].map(([ic, l, a]) => <Chip key={l as string} at={a as number} ic={ic as string} l={l as string} c={GREEN} />)}</div>
        </> : <>
          <div style={{position: 'absolute', left: 0, right: 0, top: 40, display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '14px 34px', ...nb('#fff', 8), transform: `scale(${spring(t, 66.4)})`}}><Img src={staticFile(LOGO)} style={{height: 110, display: 'block'}} /></div></div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26}}>
            <div style={{...nb('#fff', 7), padding: '16px 30px', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: NBK, opacity: pop(t, 67.4)}}>des normes <span style={{color: BLUE}}>aujourd’hui</span></div>
            <div style={{...nb(GREEN, 7), padding: '16px 30px', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: '#fff', opacity: pop(t, 68.7)}}>un avenir durable demain</div>
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 540, display: 'flex', justifyContent: 'center', opacity: pop(t, 68.9), transform: `scale(${0.9 + 0.1 * pop(t, 68.9)})`}}><PhotoLetterAnim ch="DEMAIN" src={IMG.equipe} size={190} ls={6} seed={2} /></div>
          {t > 68.7 && <Dust n={26} c={ACC} />}
        </>}
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
  {at: 2.8, s: 'sfx/swish', v: 0.35}, {at: 3.4, s: 'deep-hit', v: 0.4}, {at: 3.5, s: 'tampon', v: 0.35},
  ...searchCues(7.7, 28, 9.9, 10.3), {at: 11.0, s: 'sfx/swish', v: 0.25},
  {at: 15.3, s: 'sfx/swish', v: 0.3}, {at: 16.4, s: 'sfx/swish', v: 0.3}, {at: 19.0, s: 'tension', v: 0.22, dur: 1.8}, {at: 19.0, s: 'deep-hit', v: 0.3},
  {at: 18.5, s: 'validation', v: 0.16}, {at: 21.3, s: 'validation', v: 0.16}, {at: 22.5, s: 'validation', v: 0.16}, {at: 23.4, s: 'tampon', v: 0.45},
  {at: 25.8, s: 'sfx/thud', v: 0.5}, {at: 25.9, s: 'tampon', v: 0.35}, {at: 27.2, s: 'validation', v: 0.25},
  {at: 33.9, s: 'tension', v: 0.25, dur: 1.8}, {at: 34.0, s: 'bass-hit', v: 0.35},
  {at: 36.0, s: 'deep-hit', v: 0.3}, ...STEPS.map((x) => ({at: x.at, s: 'validation', v: 0.25})),
  {at: 47.1, s: 'sfx/swish', v: 0.3}, {at: 48.4, s: 'sfx/swish', v: 0.3}, {at: 48.9, s: 'tampon', v: 0.4},
  {at: 52.1, s: 'tampon', v: 0.35}, {at: 57.0, s: 'sfx/pop', v: 0.22}, {at: 58.6, s: 'sfx/pop', v: 0.22}, {at: 59.0, s: 'tampon', v: 0.4},
  {at: 62.6, s: 'sfx/click', v: 0.55}, {at: 62.65, s: 'validation', v: 0.3}, {at: 66.4, s: 'bass-hit', v: 0.35}, {at: 68.7, s: 'sfx/pop', v: 0.25},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
export const PlansPrevention: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.8} to={12.0}><Intro /></Gate>
    <Gate from={15.2} to={24.3}><Prevention /></Gate>
    <Gate from={24.2} to={28.7}><Consignation /></Gate>
    <Gate from={31.9} to={35.8}><Intervention /></Gate>
    <Gate from={35.7} to={43.8}><Incendie /></Gate>
    <Gate from={47.0} to={52.1}><Retenir /></Gate>
    <Gate from={52.0} to={60.6}><Contexte /></Gate>
    <Gate from={60.5} to={OUTRO_AT}><Fin /></Gate>
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    <Gate from={7} to={51}><StationBanner /></Gate>
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={70.9}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-plans-prevention-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO];
