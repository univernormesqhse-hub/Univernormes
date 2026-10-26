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
 * « Les outils de la démarche qualité » (voix d'origine, 1 min 06) — capsule « condensé + effet wahou + ultra premium »
 * présentée en métro (7 stations). Tube de verre à six guichets adaptés au sujet : qualité → PDCA → processus → plan
 * d'action → contrôle → implication ; la capsule file d'un guichet à l'autre. Gyrophare (principal), loupe, capsule
 * pneumatique, store vénitien ; barre de recherche qui trouve et ouvre « les 4 outils de la démarche qualité ». Effets
 * wahou : roue de Deming qui se construit puis gravit la pente calée par ISO 9001, cartographie des processus qui
 * s'allume, plan d'action dont les barres d'avancement se remplissent, ligne de contrôle avec tampon « CONFORME »,
 * trois acteurs qui font tourner la roue ensemble. Kits capsule-ui-neo-brutal et capsule-recit-illustre. Couverture :
 * photo + « OUTILS / QUALITÉ » en lettres-photos animées.
 */
const IMG = {
  cover: 'sysqsse-gen/chef.jpg',
  cOut: 'sysqsse-gen/qualite.jpg',
  cQual: 'sysqsse-gen/couverture.jpg',
  controle: 'sysqsse-gen/qualite.jpg',
  direction: 'sysqsse-gen/accompagnement.jpg',
  rq: 'diag-gen/responsable.jpg',
  equipes: 'heures-gen/equipe-chantier.jpg',
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
const OUTRO_AT = 65.9;
export const QUALITE_OUTILS_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: 'Q', title: 'La démarche qualité', s: 'amélioration continue', c: NAVY, g: 'qualité', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 6.6, n: '1', title: 'Le PDCA', s: 'la roue de Deming', c: BLUE, g: 'PDCA', k: 'gyro', lab: 'GUICHET 2 / 6'},
  {at: 23.6, n: '2', title: 'L’approche processus', s: 'organiser les activités', c: GREEN, g: 'processus', k: 'loupe', lab: 'GUICHET 3 / 6'},
  {at: 35.7, n: '3', title: 'Le plan d’action', s: 'suivre · coordonner · évaluer', c: ORANGE, g: 'plan d’action', k: 'none', lab: 'GUICHET 4 / 6'},
  {at: 42.6, n: '4', title: 'Plan de contrôle', s: 'et de surveillance', c: VIO, g: 'contrôle', k: 'tube', lab: 'GUICHET 5 / 6'},
  {at: 51.9, n: '5', title: 'L’implication de tous', s: 'direction · RQ · terrain', c: RED, g: 'implication', k: 'none', lab: 'GUICHET 6 / 6'},
];
const SECTX: SX[] = [...SECT, {at: 62.4, n: '+', title: 'L’article', s: 'en commentaire', c: TEAL, g: 'article', k: 'store', lab: 'POUR ALLER PLUS LOIN'}];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 61.0;
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
  {n: 1, l: 'PDCA', s: 'PDCA', at: 8.1},
  {n: 2, l: 'Roue de Deming', s: 'Deming', at: 10.4},
  {n: 3, l: 'Base ISO 9001', s: 'ISO 9001', at: 22.4},
  {n: 4, l: 'Approche processus', s: 'processus', at: 25.8},
  {n: 5, l: 'Plan d’action', s: 'action', at: 36.5},
  {n: 6, l: 'Plan de contrôle', s: 'contrôle', at: 44.0},
  {n: 7, l: 'L’implication de tous', s: 'tous', at: 55.8},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE QUALITÉ · STATION {r.n} / 7</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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
const TOOLS4 = [['repeter', 'PDCA', BLUE], ['engrenage', 'approche processus', GREEN], ['clipboard', 'plan d’action', ORANGE], ['loupe', 'plan de contrôle', VIO]];
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="medaille" w={1080} h={820} pos="50% 35%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 24%, ${PAPER}CC 32%, ${PAPER} 37%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 18}}><div style={{...nb(NBK, 5), color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3, padding: '8px 22px'}}>LA DÉMARCHE QUALITÉ</div><div style={{transform: 'rotate(-8deg)'}}><div style={{...nb(BLUE, 5), color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 26, padding: '6px 16px'}}>4 OUTILS</div></div></Abs>
      <Abs x={0} y={650} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="OUTILS" src={IMG.cOut} size={170} ls={6} /></Abs>
      <Abs x={0} y={830} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="QUALITÉ" src={IMG.cQual} size={170} ls={6} seed={3} /></Abs>
      <Abs x={60} y={1050} w={960} style={{display: 'flex', justifyContent: 'center', gap: 12}}>{TOOLS4.map(([ic, l, c], k) => <div key={l} style={{...nb('#fff', 4), boxShadow: `4px 4px 0 ${c}`, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6, fontFamily: sansFont, fontWeight: 900, fontSize: 20, color: c, transform: `translateY(${(1 - Math.min(1, spring(t, 0.3 + k * 0.1))) * 60}px)`}}><F n={ic} size={30} />{l}</div>)}</Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Intro : recherche → les 4 outils ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  return (
    <Out end={6.65}>
      <HiLine words={['L’amélioration', 'continue']} mark={[0, 1]} at={3.6} y={330} size={62} />
      <SearchOpen x={60} y={440} w={960} h={930} at={2.8} query="outils qualité" results={['Un logiciel miracle', 'Les 4 outils de la démarche qualité', 'Un audit par an']} found={1} foundAt={4.3} clickAt={4.6} c={NAVY}>
        <div style={{position: 'absolute', inset: 0, display: 'flex', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center', gap: 24, padding: 20}}>{TOOLS4.map(([ic, l, c], k) => <div key={l} style={{...nb('#fff', 7), boxShadow: `7px 7px 0 ${c}`, width: 400, height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, transform: `scale(${t > 5.2 + k * 0.12 ? Math.min(1, spring(t, 5.2 + k * 0.12)) : 0})`}}><F n={ic} size={130} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: c}}>{k + 1}. {l}</div></div>)}</div>
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ PDCA : la roue se construit puis gravit la pente, calée par ISO 9001 ═════════════ */
const QUAD = [['P', 'Planifier', BLUE, 13.0, 180], ['D', 'Réaliser', GREEN, 13.8, -90], ['C', 'Vérifier', ORANGE, 14.8, 0], ['A', 'Améliorer', RED, 15.6, 90]];
const arc = (r: number, a0: number, a1: number) => { const p = (a: number) => [r * Math.cos((a * Math.PI) / 180), r * Math.sin((a * Math.PI) / 180)]; const [x0, y0] = p(a0); const [x1, y1] = p(a1); return `M 0 0 L ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1} Z`; };
const Wheel: React.FC<{r: number; rot: number}> = ({r, rot}) => {
  const t = useT();
  return (
    <svg width={2 * r + 20} height={2 * r + 20} viewBox={`${-r - 10} ${-r - 10} ${2 * r + 20} ${2 * r + 20}`} style={{overflow: 'visible'}}>
      <g transform={`rotate(${rot})`}>
        {QUAD.map(([L, , c, a, a0]) => { const p = prog(t, a as number, (a as number) + 0.35, easeOut); return <g key={L as string} transform={`scale(${p})`}><path d={arc(r, a0 as number, (a0 as number) + 90)} fill={c as string} stroke={NBK} strokeWidth={8} /><text x={r * 0.55 * Math.cos((((a0 as number) + 45) * Math.PI) / 180)} y={r * 0.55 * Math.sin((((a0 as number) + 45) * Math.PI) / 180) + r * 0.13} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={r * 0.38} fill="#fff">{L}</text></g>; })}
      </g>
      <circle r={r * 0.3} fill="#fff" stroke={NBK} strokeWidth={8} />
      <text y={r * 0.1} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={r * 0.17} fill={NBK}>PDCA</text>
    </svg>
  );
};
const Pdca: React.FC = () => {
  const t = useT();
  const ph = t < 16.4 ? 0 : 1;
  const climb = prog(t, 17.0, 21.6, easeInOut);
  if (ph === 0) return (
    <Out end={16.45}>
      <HiLine words={['La', 'roue', 'de', 'Deming']} mark={[1, 3]} at={10.2} y={330} size={64} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{position: 'absolute', left: 190, top: 20, transform: `scale(${pop(t, 10.0)})`}}><Wheel r={280} rot={t > 15.9 ? (t - 15.9) * 40 : 0} /></div>
        {QUAD.map(([L, l, c, a], k) => <div key={L as string} style={{position: 'absolute', left: k % 3 === 0 ? 0 : 680, top: k < 2 ? 0 : 520, width: 280, ...nb('#fff', 5), boxShadow: `5px 5px 0 ${c}`, padding: '8px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: c as string, textAlign: 'center', transform: `scale(${t > (a as number) ? Math.min(1, spring(t, a as number)) : 0})`}}>{l}</div>)}
        <div style={{position: 'absolute', left: 0, right: 0, top: 650, display: 'flex', justifyContent: 'center', gap: 14}}><Chip at={10.4} ic="repeter" l="roue de Deming" c={BLUE} /><Chip at={12.2} ic="echelle" l="4 étapes" c={BLUE} /></div>
      </Abs>
    </Out>
  );
  const x0 = 60, y0 = 648, x1 = 560, y1 = 393;
  const wx = lerp(x0, x1, climb), wy = lerp(y0, y1, climb);
  return (
    <Out end={23.65}>
      <HiLine words={t < 19.7 ? ['Progresser', 'en', 'continu'] : ['La', 'base', 'ISO 9001']} mark={t < 19.7 ? [0, 2] : [1, 2]} at={t < 19.7 ? 17.0 : 19.8} y={330} size={64} />
      <Abs x={60} y={440} w={960} h={930}>
        <svg style={{position: 'absolute', left: 0, top: 0}} width={960} height={930}><path d={`M 0 900 L 960 900 L 960 410 Z`} fill={NAVY} stroke={NBK} strokeWidth={8} opacity={pop(t, 16.4)} /></svg>
        <div style={{position: 'absolute', left: wx - 20, top: wy - 110}}><Wheel r={130} rot={climb * 720} /></div>
        {t > 22.4 && <div style={{position: 'absolute', left: wx + 60, top: wy + 160, transform: `scale(${Math.min(1, spring(t, 22.4))}) rotate(-28deg)`, transformOrigin: '0 0'}}><div style={{...nb(YEL, 5), padding: '6px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: NBK, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}}>ISO 9001</div></div>}
        <div style={{position: 'absolute', left: 20, top: 20, display: 'flex', flexDirection: 'column', gap: 12}}><Chip at={18.0} ic="hausse" l="progresser en continu" c={BLUE} /><Chip at={19.9} ic="batiment" l="base des systèmes de management" c={NAVY} /></div>
        {t > 22.4 && <Dust n={16} c={GOLD} />}
      </Abs>
    </Out>
  );
};

/* ═════════════ Approche processus : la cartographie s'allume ═════════════ */
const Processus: React.FC = () => {
  const t = useT();
  const flow = t > 29.8;
  const box = (x: number, y: number, w: number, h: number, l: string, c: string, ic: string, at: number) => <div style={{position: 'absolute', left: x, top: y, width: w, height: h, ...nb('#fff', 6), boxShadow: `6px 6px 0 ${c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, textAlign: 'center', transform: `scale(${t > at ? Math.min(1, spring(t, at)) : 0})`}}><F n={ic} size={56} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: NBK, lineHeight: 1.05}}>{l}</span></div>;
  return (
    <Out end={35.75}>
      <HiLine words={t < 30.9 ? ['Sous', 'forme', 'de', 'processus'] : ['Maîtriser', 'et', 'optimiser']} mark={t < 30.9 ? [3] : [0, 2]} at={t < 30.9 ? 27.1 : 31.0} y={330} size={60} />
      <Abs x={60} y={440} w={960} h={930}>
        {box(0, 200, 170, 200, 'besoins clients', NAVY, 'equipe', 27.0)}
        <div style={{position: 'absolute', left: 210, top: 20, width: 540, height: 560, border: `5px dashed ${BLUE}`, borderRadius: 24, opacity: pop(t, 27.2)}} />
        {box(260, 50, 440, 140, 'processus management', GREEN, 'directeur', 27.4)}
        {box(260, 230, 440, 140, 'processus réalisation (métier)', BLUE, 'engrenage', 28.0)}
        {box(260, 410, 440, 140, 'processus supports', ORANGE, 'outils', 28.6)}
        {box(790, 200, 170, 200, 'satisfaction clients', GREEN, 'coeur', 29.2)}
        <svg style={{position: 'absolute', left: 0, top: 0}} width={960} height={600}>{[[170, 300, 260, 300], [700, 300, 790, 300]].map(([a, b, c, d], k) => <line key={k} x1={a} y1={b} x2={c} y2={d} stroke={NBK} strokeWidth={10} strokeDasharray={flow ? '18 12' : undefined} strokeDashoffset={-t * 80} opacity={pop(t, 29.0)} />)}</svg>
        {flow && Array.from({length: 4}, (_, k) => { const p = ((t - 29.8) * 0.5 + k / 4) % 1; return <div key={k} style={{position: 'absolute', left: lerp(170, 790, p) - 14, top: 286, width: 28, height: 28, borderRadius: 14, background: GOLD, border: `3px solid ${NBK}`, boxShadow: `0 0 14px ${GOLD}`}} />; })}
        <div style={{position: 'absolute', left: 0, right: 0, top: 640, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap'}}><Chip at={31.2} ic="poignee" l="maîtriser les opérations" c={GREEN} /><Chip at={32.6} ic="hausse" l="optimiser les résultats" c={GREEN} /><Chip at={34.1} ic="livres" l="pérenniser les savoir-faire" c={GREEN} /></div>
      </Abs>
    </Out>
  );
};

/* ═════════════ Plan d'action : le tableau qui avance ═════════════ */
const PlanAction: React.FC = () => {
  const t = useT();
  const rows = [['Action 1', 'Responsable A', 1.0], ['Action 2', 'Responsable B', 0.75], ['Action 3', 'Responsable C', 0.5], ['Action 4', 'Responsable D', 0.25]];
  return (
    <Out end={42.65}>
      <HiLine words={t < 39.5 ? ['Suivre', 'l’avancement'] : t < 40.9 ? ['Coordonner', 'les', 'ressources'] : ['Évaluer', 'les', 'résultats']} mark={t < 39.5 ? [0, 1] : [0, 2]} at={t < 39.5 ? 37.8 : t < 40.9 ? 39.6 : 41.0} y={330} size={60} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{...nb('#fff', 9), position: 'absolute', left: 0, top: 20, width: 960, height: 620, boxShadow: `9px 9px 0 ${ORANGE}`, overflow: 'hidden', opacity: pop(t, 35.9)}}>
          <div style={{display: 'flex', height: 80, background: NAVY, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 22, alignItems: 'center'}}>{['ACTION', 'RESPONSABLE', 'AVANCEMENT', 'RÉSULTAT'].map((h, k) => <div key={h} style={{width: [200, 280, 320, 160][k], paddingLeft: 20}}>{h}</div>)}</div>
          {rows.map(([a, r, v], k) => { const on = t > 36.3 + k * 0.15; return (
            <div key={a as string} style={{display: 'flex', height: 128, alignItems: 'center', borderBottom: `3px solid #E3E8EF`, fontFamily: sansFont, fontWeight: 900, fontSize: 28, opacity: on ? 1 : 0, transform: `translateX(${on ? (1 - Math.min(1, spring(t, 36.3 + k * 0.15))) * -120 : 0}px)`}}>
              <div style={{width: 200, paddingLeft: 20}}>{a}</div>
              <div style={{width: 280, paddingLeft: 20, display: 'flex', alignItems: 'center', gap: 10}}><div style={{transform: `scale(${t > 39.7 + k * 0.12 ? Math.min(1, spring(t, 39.7 + k * 0.12)) : 0.6})`, opacity: t > 39.7 ? 1 : 0.3}}><F n="salarie" size={44} /></div><span style={{fontSize: 22}}>{r}</span></div>
              <div style={{width: 320, paddingLeft: 20}}><div style={{height: 34, borderRadius: 17, border: `4px solid ${NBK}`, overflow: 'hidden', background: '#EEF1F5'}}><div style={{width: `${(v as number) * 100 * prog(t, 38.2, 39.4, easeOut)}%`, height: '100%', background: (v as number) >= 1 ? GREEN : ORANGE}} /></div></div>
              <div style={{width: 160, paddingLeft: 40, fontSize: 40, color: (v as number) >= 1 ? GREEN : ORANGE, transform: `scale(${t > 41.0 + k * 0.2 ? Math.min(1, spring(t, 41.0 + k * 0.2)) : 0})`}}>{(v as number) >= 1 ? '✓' : '⟳'}</div>
            </div>
          ); })}
        </div>
      </Abs>
    </Out>
  );
};

/* ═════════════ Plan de contrôle : un point de contrôle à chaque étape ═════════════ */
const Controle: React.FC = () => {
  const t = useT();
  const scan = prog(t, 46.2, 48.6, easeInOut);
  return (
    <Out end={51.95}>
      <HiLine words={t < 49.2 ? ['À', 'chaque', 'étape'] : ['Garantir', 'la', 'conformité']} mark={t < 49.2 ? [1, 2] : [0, 2]} at={t < 49.2 ? 46.1 : 49.3} y={330} size={64} />
      <Abs x={60} y={440} w={960} h={930}>
        <Shot src={IMG.controle} ic="loupe" x={0} y={0} w={960} h={330} at={46.0} pos="50% 30%" c={VIO} />
        <div style={{position: 'absolute', left: 40, top: 500, width: 880, height: 12, background: NBK, borderRadius: 6, opacity: pop(t, 46.1)}} />
        {[0, 1, 2, 3].map((k) => { const x = 40 + k * 240; const on = scan * 4 > k + 0.5; return <React.Fragment key={k}>
          <div style={{position: 'absolute', left: x, top: 430, width: 160, height: 150, ...nb('#fff', 5), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, opacity: pop(t, 46.2 + k * 0.1)}}>étape {k + 1}</div>
          <div style={{position: 'absolute', left: x + 50, top: 610, transform: `scale(${on ? Math.min(1, spring(t, 46.2 + (k + 0.5) * 0.6)) : 0})`}}><F n="bouclier" size={70} /></div>
        </React.Fragment>; })}
        {t > 46.2 && t < 49.0 && <div style={{position: 'absolute', left: 40 + scan * 820, top: 410, width: 8, height: 280, background: VIO, boxShadow: `0 0 24px ${VIO}`}} />}
        <Stamp at={49.9} text="CONFORME" c={GREEN} x={260} y={730} rot={-6} />
        <div style={{position: 'absolute', left: 720, top: 720, transform: `scale(${pop(t, 51.2)})`}}><F n="pouce" size={130} /></div>
        <div style={{position: 'absolute', left: 20, top: 345}}><Chip at={46.2} ic="clipboard" l="contrôles recensés" c={VIO} /></div>
      </Abs>
    </Out>
  );
};

/* ═════════════ L'implication de tous : trois acteurs font tourner la roue ═════════════ */
const Implication: React.FC = () => {
  const t = useT();
  const actors = [['direction', IMG.direction, 56.4, NAVY, 0], ['responsable qualité', IMG.rq, 57.3, BLUE, 1], ['équipes terrain', IMG.equipes, 58.9, GREEN, 2]];
  const joined = actors.filter((a) => t > (a[2] as number)).length;
  const speed = [8, 25, 60, 140][joined];
  return (
    <Out end={62.45}>
      <HiLine words={t < 61.0 ? ['L’implication', 'de', 'tous'] : ['Amélioration', 'continue']} mark={t < 61.0 ? [0, 2] : [0, 1]} at={t < 61.0 ? 52.3 : 61.0} y={330} size={62} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{position: 'absolute', left: 330, top: 260, transform: `scale(${pop(t, 52.2)})`, filter: joined === 3 ? `drop-shadow(0 0 30px ${GOLD})` : undefined}}><Wheel r={140} rot={(t - 52) * speed} /></div>
        {actors.map(([l, img, a, c, k]) => { const on = t > (a as number); const pos = [[20, 20], [640, 20], [330, 610]][k as number]; return (
          <div key={l as string} style={{position: 'absolute', left: pos[0], top: pos[1], width: 300, height: 260, ...nb(on ? '#fff' : '#F1F1EA', 7), boxShadow: on ? `7px 7px 0 ${c}` : 'none', border: on ? `4px solid ${NBK}` : `4px dashed #9FB3CC`, overflow: 'hidden', transform: `scale(${on ? Math.min(1, spring(t, a as number)) : 0.92})`}}>
            {on ? <><Pic src={img as string} ic="equipe" w={292} h={190} pos="50% 35%" /><div style={{padding: 8, fontFamily: sansFont, fontWeight: 900, fontSize: 24, textAlign: 'center', color: c as string}}>{l}</div></> : <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: '#C2C8D2'}}>?</div>}
          </div>
        ); })}
        <svg style={{position: 'absolute', left: 0, top: 0}} width={960} height={930}>{actors.map(([, , a, c, k]) => { const p = prog(t, a as number, (a as number) + 0.5); const s0 = [[320, 260], [640, 260], [480, 610]][k as number]; return <line key={k as number} x1={s0[0]} y1={s0[1]} x2={lerp(s0[0], 480, p * 0.62)} y2={lerp(s0[1], 400, p * 0.62)} stroke={c as string} strokeWidth={8} strokeDasharray="14 10" strokeDashoffset={-t * 60} />; })}</svg>
        {t > 61.0 && <div style={{position: 'absolute', left: 0, right: 0, top: 880, display: 'flex', justifyContent: 'center'}}><NBadge at={61.0} text="ENSEMBLE" bg={GOLD} rot={-3} size={30} /></div>}
        {t > 61.0 && <Dust n={24} c={GOLD} />}
      </Abs>
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECTX.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at, s: 'sfx/bell', v: 0.2})),
  ...searchCues(2.8, 14, 4.3, 4.6), ...rep(5.2, 4, 0.12, 'sfx/pop', 0.2),
  ...QUAD.map((q) => ({at: q[3] as number, s: 'sfx/thud', v: 0.35})), {at: 15.9, s: 'soft-whoosh', v: 0.3, dur: 1},
  {at: 17.0, s: 'sfx/rise', v: 0.3, dur: 4.4}, {at: 22.4, s: 'tampon', v: 0.45}, {at: 22.45, s: 'bass-hit', v: 0.3},
  ...rep(27.0, 6, 0.4, 'sfx/pop', 0.2), {at: 29.8, s: 'soft-whoosh', v: 0.3, dur: 1.4}, {at: 31.2, s: 'validation', v: 0.18}, {at: 32.6, s: 'validation', v: 0.18}, {at: 34.1, s: 'validation', v: 0.18},
  ...rep(36.3, 4, 0.15, 'sfx/swish', 0.18), {at: 38.2, s: 'sfx/rise', v: 0.25, dur: 1.2}, ...rep(39.7, 4, 0.12, 'sfx/pop', 0.15), ...rep(41.0, 4, 0.2, 'validation', 0.16),
  {at: 46.2, s: 'soft-whoosh', v: 0.3, dur: 2.4}, ...rep(46.5, 4, 0.6, 'sfx/pop', 0.2), {at: 49.9, s: 'tampon', v: 0.45}, {at: 51.2, s: 'sfx/pop', v: 0.3},
  {at: 56.4, s: 'sfx/pop', v: 0.3}, {at: 57.3, s: 'sfx/pop', v: 0.3}, {at: 58.9, s: 'sfx/pop', v: 0.3}, {at: 61.0, s: 'bass-hit', v: 0.4},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
export const QualiteOutilsMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.8} to={6.7}><Intro /></Gate>
    <Gate from={9.9} to={23.7}><Pdca /></Gate>
    <Gate from={26.9} to={35.8}><Processus /></Gate>
    <Gate from={35.7} to={42.7}><PlanAction /></Gate>
    <Gate from={45.9} to={52.0}><Controle /></Gate>
    <Gate from={51.9} to={62.5}><Implication /></Gate>
    {SECTX.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={65.8}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-qualite-outils-metro-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip];
