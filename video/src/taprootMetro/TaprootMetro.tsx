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
 * « Au-delà de l'erreur humaine — TapRooT® » (voix d'origine, 1 min 23) — capsule « condensé + effet wahou + ultra
 * premium » présentée en métro : une ligne à 6 stations. Tube de verre à six guichets : au-delà → l'accident →
 * TapRooT® → les pistes → les faits → retiens ; la capsule file d'un guichet à l'autre. Gyrophare, loupe, store
 * vénitien, capsule pneumatique ; barre de recherche « erreur humaine » qui ouvre « chercher les causes profondes ».
 * Fil wahou : l'iceberg (erreur humaine en surface, plongée sous l'eau vers les causes profondes), dossier « enquête
 * clôturée » dont le tampon se brise, racines qui poussent sous l'iceberg (causes, facteurs, 5 pistes), « QUI ? »
 * barré → « POURQUOI ? », tableau de preuves, fin avec le profil TikTok et le numéro WhatsApp entouré. Kits
 * capsule-ui-neo-brutal et capsule-recit-illustre. Couverture : photo + « AU-DELÀ DE / L'ERREUR HUMAINE ».
 */
const IMG = {
  cover: 'causerie/chute-entrepot.jpg',
  c1: 'ident/machine.jpg',
  c2: 'promo/hse-machine.jpg',
  tiktok: 'taproot-gen/tiktok-profil.jpg',
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
const OUTRO_AT = 85.3;
export const TAPROOT_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '1', title: 'Au-delà de l’erreur humaine', s: 'examiner aussi le système', c: NAVY, g: 'au-delà', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 8.4, n: '2', title: 'Un accident vient de se produire', s: 'l’opérateur n’a pas respecté la procédure', c: RED, g: 'l’accident', k: 'gyro', lab: 'GUICHET 2 / 6'},
  {at: 22.1, n: '3', title: 'TapRooT®', s: 'une méthode structurée d’investigation', c: BLUE, g: 'TapRooT®', k: 'loupe', lab: 'GUICHET 3 / 6'},
  {at: 38.7, n: '4', title: 'Les pistes', s: 'procédure · formation · équipements · conditions · barrières', c: ORANGE, g: 'les pistes', k: 'store', lab: 'GUICHET 4 / 6'},
  {at: 51.2, n: '5', title: 'Des faits et des preuves', s: 'pas de conclusions prématurées', c: VIO, g: 'les faits', k: 'tube', lab: 'GUICHET 5 / 6'},
  {at: 66.6, n: '★', title: 'Retiens ceci', s: 'comprendre pour prévenir', c: GREEN, g: 'retiens', k: 'none', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 65.6;
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
  {n: 1, l: 'La cause profonde', s: 'cause', at: 20.9},
  {n: 2, l: 'La méthode TapRooT®', s: 'TapRooT®', at: 24.0},
  {n: 3, l: 'Pourquoi était-ce possible ?', s: 'pourquoi', at: 38.0},
  {n: 4, l: 'Les barrières de sécurité', s: 'barrières', at: 49.5},
  {n: 5, l: 'Des faits et des preuves', s: 'preuves', at: 54.5},
  {n: 6, l: 'Des actions correctives efficaces', s: 'actions', at: 64.7},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE ENQUÊTE · STATION {r.n} / 6</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="loupe" w={1080} h={820} pos="50% 45%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 24%, ${PAPER}CC 32%, ${PAPER} 37%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb(NBK, 5), color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3, padding: '8px 22px'}}>MÉTHODE TAPROOT® · ENQUÊTE</div></Abs>
      <Abs x={0} y={650} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="AU-DELÀ DE" src={IMG.c1} size={118} ls={3} /></Abs>
      <Abs x={0} y={820} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="L’ERREUR HUMAINE" src={IMG.c2} size={74} ls={1} seed={3} /></Abs>
      <Abs x={60} y={990} w={960} style={{display: 'flex', justifyContent: 'center', gap: 12}}>{[['causes profondes', BLUE], ['facteurs', ORANGE], ['preuves', VIO]].map(([n, c], k) => <div key={n} style={{...nb(c, 5), padding: '8px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff', transform: `translateY(${(1 - Math.min(1, spring(t, 0.3 + k * 0.1))) * 60}px)`}}>{n}</div>)}</Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={NAVY} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Fil wahou : l'iceberg ═════════════ */
const Iceberg: React.FC<{dive: number; tipAt: number; roots?: number}> = ({dive, tipAt, roots}) => {
  const t = useT();
  const WL = 260;
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: 960, height: 930, overflow: 'hidden', borderRadius: 24}}>
      <div style={{position: 'absolute', left: 0, top: -dive * 300, width: 960, height: 1400}}>
        <div style={{position: 'absolute', left: 0, top: WL, width: 960, height: 1200, background: `linear-gradient(180deg, #4FA3D9, ${NAVY})`}} />
        <svg style={{position: 'absolute', left: 0, top: 0}} width={960} height={1400}>
          <path d={`M 0 ${WL} Q 120 ${WL - 12 + Math.sin(t * 2) * 6} 240 ${WL} T 480 ${WL} T 720 ${WL} T 960 ${WL}`} fill="none" stroke="#fff" strokeWidth={6} opacity={0.8} />
          <polygon points={`380,${WL} 450,${WL - 170} 500,${WL - 210} 560,${WL - 150} 610,${WL}`} fill="#fff" stroke={NBK} strokeWidth={6} opacity={pop(t, tipAt - 0.2)} />
          <polygon points={`380,${WL} 610,${WL} 760,${WL + 220} 720,${WL + 480} 560,${WL + 620} 360,${WL + 580} 220,${WL + 380} 260,${WL + 160}`} fill="#CFE8F7" stroke={NBK} strokeWidth={6} opacity={0.4 + 0.6 * dive} />
          {roots !== undefined && t > roots && [0, 1, 2, 3, 4].map((k) => { const x0 = 300 + k * 90; const p = prog(t, roots + k * 0.12, roots + 0.8 + k * 0.12); return <path key={k} d={`M ${x0} ${WL + 560} C ${x0} ${WL + 640}, ${x0 + (k - 2) * 60} ${WL + 700}, ${x0 + (k - 2) * 120} ${WL + 820}`} fill="none" stroke="#8C5A2B" strokeWidth={10} strokeLinecap="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - p}} />; })}
        </svg>
        <div style={{position: 'absolute', left: 385, top: WL - 120, width: 220, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: RED, opacity: pop(t, tipAt)}}>erreur<br />humaine</div>
        <div style={{position: 'absolute', left: 300, top: WL + 260, width: 400, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: NAVY, opacity: dive}}>{t < 25.8 ? 'cause profonde ?' : 'causes profondes'}</div>
        {dive > 0.5 && t < 25.8 && [0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 320 + k * 130, top: WL + 360 + Math.sin(t * 3 + k) * 10, fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: NAVY, opacity: 0.6}}>?</div>)}
        {Array.from({length: 10}, (_, i) => { const p = ((t * 0.3 + i * 0.1) % 1); return <div key={i} style={{position: 'absolute', left: 60 + i * 90, top: WL + 900 - p * 640, width: 12 + (i % 3) * 6, height: 12 + (i % 3) * 6, borderRadius: 20, border: '3px solid #ffffff99', opacity: dive * 0.8}} />; })}
      </div>
    </div>
  );
};

/* ═════════════ Guichet 1 : recherche ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  return (
    <Out end={8.45}>
      <Heads h={[[3.2, ['Accuser', 'l’opérateur', '?'], [0, 1]], [5.2, ['Ou', 'le', 'système', '?'], [2]]]} />
      <SearchOpen x={60} y={440} w={960} h={880} at={2.9} query="erreur humaine" results={['blâmer l’opérateur', 'chercher les causes profondes', 'clôturer l’enquête']} found={1} foundAt={4.4} clickAt={4.8} c={NAVY}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 60}}>
          <div style={{position: 'relative', textAlign: 'center', opacity: lerp(1, 0.45, prog(t, 6.0, 6.6))}}><F n="ouvrier" size={200} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>l’opérateur</div>{[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: -60 + k * 110, top: -70, transform: `rotate(${150 + (k - 1) * 30}deg) scale(${pop(t, 5.6 + k * 0.1)})`, fontSize: 60}}><F n="main-levee" size={60} /></div>)}</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60}}>+</div>
          <div style={{textAlign: 'center', transform: `scale(${t > 6.2 ? Math.min(1.1, spring(t, 6.2)) : 0.8})`}}><div style={{display: 'flex'}}>{[0, 1].map((k) => <div key={k} style={{transform: `rotate(${(k ? -1 : 1) * t * 90}deg)`, marginLeft: k ? -30 : 0}}><F n="engrenage" size={130} /></div>)}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: BLUE}}>le système de travail</div></div>
        </div>
        {t > 6.8 && <div style={{position: 'absolute', left: 0, right: 0, top: 400, display: 'flex', justifyContent: 'center'}}><NBadge at={6.8} text="À EXAMINER AUSSI" bg={BLUE} rot={-3} size={40} /></div>}
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ Guichet 2 : l'accident → enquête pas terminée → iceberg ═════════════ */
const Accident: React.FC = () => {
  const t = useT();
  const crack = prog(t, 15.0, 15.4, easeOut);
  return (
    <Out end={22.15}>
      <Heads h={[[12.9, ['L’enquête', 'terminée', '?'], [1]], [15.0, ['Absolument', 'pas'], [0, 1]], [17.6, ['Erreur', '≠', 'cause', 'profonde'], [0, 3]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        {t < 17.4 ? <div style={{...nb('#F3E5C8', 8), position: 'absolute', left: 180, top: 40, width: 600, height: 520, padding: 30, opacity: pop(t, 12.1)}}>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 30, color: NBK}}>DOSSIER · ENQUÊTE</div>
          {[0, 1, 2, 3].map((j) => <div key={j} style={{height: 14, borderRadius: 7, background: '#00000022', marginTop: 28, width: `${90 - j * 12}%`}} />)}
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 30}}><F n="ouvrier" size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26}}>procédure non respectée</span></div>
          {t > 13.5 && <div style={{position: 'absolute', left: 120, top: 330, transform: `rotate(-12deg) scale(${lerp(2, 1, prog(t, 13.5, 13.75, easeIn))})`}}>
            <div style={{position: 'relative', border: `8px solid ${GREEN}`, borderRadius: 14, padding: '8px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 58, color: GREEN, background: 'rgba(255,255,255,0.85)', clipPath: crack > 0 ? 'polygon(0 0, 48% 0, 55% 100%, 0 100%)' : undefined, transform: `translate(${-crack * 40}px, ${crack * 30}px) rotate(${-crack * 10}deg)`}}>CLÔTURÉE</div>
            {crack > 0 && <div style={{position: 'absolute', left: 0, top: 0, border: `8px solid ${GREEN}`, borderRadius: 14, padding: '8px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 58, color: GREEN, background: 'rgba(255,255,255,0.85)', clipPath: 'polygon(48% 0, 100% 0, 100% 100%, 55% 100%)', transform: `translate(${crack * 40}px, ${crack * 50}px) rotate(${crack * 12}deg)`}}>CLÔTURÉE</div>}
          </div>}
          <Stamp at={15.0} text="ABSOLUMENT PAS" c={RED} x={60} y={180} rot={6} size={56} />
        </div> : <Iceberg dive={prog(t, 20.4, 21.6, easeInOut)} tipAt={17.9} />}
      </Abs>
    </Out>
  );
};

/* ═════════════ Guichet 3 : TapRooT® ═════════════ */
const Taproot: React.FC = () => {
  const t = useT();
  return (
    <Out end={38.75}>
      <Heads h={[[25.8, ['Une', 'méthode', 'structurée'], [1, 2]], [27.3, ['Causes', 'profondes'], [0, 1]], [29.2, ['Facteurs', 'contributifs'], [0, 1]], [32.0, ['Pas', '« qui', '? »'], [1]], [36.0, ['Mais', '« pourquoi', '? »'], [1]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        {t < 31.8 ? <>
          <Iceberg dive={1} tipAt={0} roots={28.0} />
          <div style={{position: 'absolute', left: 30, top: 640, zIndex: 3}}><Chip at={28.2} ic="herbe" l="causes profondes" c={BLUE} /></div>
          <div style={{position: 'absolute', right: 30, top: 720, zIndex: 3}}><Chip at={29.6} ic="engrenage" l="facteurs contributifs" c={ORANGE} /></div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 30, display: 'flex', justifyContent: 'center', zIndex: 3}}><NBadge at={25.8} text="TapRooT® · INVESTIGATION STRUCTURÉE" bg={NAVY} rot={-2} size={30} /></div>
        </> : <div style={{position: 'absolute', left: 0, right: 0, top: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 60}}>
          <div style={{position: 'relative', ...nb('#fff', 8), padding: '24px 50px', display: 'flex', alignItems: 'center', gap: 20, opacity: lerp(1, 0.5, prog(t, 34.0, 34.6)), transform: `scale(${pop(t, 32.0)})`}}><F n="main-levee" size={110} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: DIM}}>QUI ?</span>{t > 34.0 && <Strk at={34.0} />}</div>
          <div style={{...nb(BLUE, 9), padding: '30px 60px', display: 'flex', alignItems: 'center', gap: 20, transform: `scale(${t > 36.4 ? Math.min(1.05, spring(t, 36.4)) : 0})`}}><F n="loupe" size={120} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: '#fff'}}>POURQUOI ?</span></div>
          {t > 37.9 && <NBadge at={38.0} text="…CETTE ERREUR A-T-ELLE ÉTÉ POSSIBLE ?" bg={NBK} rot={-2} size={30} />}
        </div>}
      </Abs>
    </Out>
  );
};

/* ═════════════ Guichet 4 : les 5 pistes ═════════════ */
const PISTES: [string, string, number][] = [['la procédure', 'clipboard', 39.4], ['la formation', 'diplome', 41.4], ['les équipements', 'outils', 43.7], ['les conditions de travail', 'usine', 46.4], ['les barrières de sécurité', 'barriere', 49.0]];
const Pistes: React.FC = () => {
  const t = useT();
  return (
    <Out end={51.25}>
      <Heads h={[[42.3, ['5', 'pistes'], [1]], [43.5, ['Les', 'équipements'], [1]], [45.8, ['Les', 'conditions'], [1]], [48.8, ['Les', 'barrières'], [1]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{...nb(RED, 7), position: 'absolute', left: 330, top: 0, width: 300, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, opacity: pop(t, 42.2)}}><F n="danger" size={60} />l’incident</div>
        <svg style={{position: 'absolute', left: 0, top: 0}} width={960} height={930}>{PISTES.map(([, , a], k) => { const y = 200 + k * 140; const p = prog(t, Math.max(42.3, a) - 0.3, Math.max(42.3, a) + 0.2); return <path key={k} d={`M 480 110 C 480 ${y - 40}, ${k % 2 ? 640 : 320} ${y - 20}, ${k % 2 ? 620 : 340} ${y + 40}`} fill="none" stroke="#8C5A2B" strokeWidth={8} strokeLinecap="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - p}} />; })}</svg>
        {PISTES.map(([l, ic, a], k) => { const on = t > Math.max(42.3, a); const L = k % 2 === 0; return <div key={l} style={{...nb('#fff', 6), boxShadow: `6px 6px 0 ${ORANGE}`, position: 'absolute', left: L ? 20 : 560, top: 180 + k * 140, width: 380, height: 110, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', opacity: on ? 1 : 0, transform: `translateX(${on ? (1 - Math.min(1, spring(t, Math.max(42.3, a)))) * (L ? -300 : 300) : 0}px)`}}><F n={ic} size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, lineHeight: 1.1, flex: 1}}>{l}</span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: ORANGE}}>?</span></div>; })}
      </Abs>
    </Out>
  );
};

/* ═════════════ Guichet 5 : faits et preuves ═════════════ */
const Faits: React.FC = () => {
  const t = useT();
  return (
    <Out end={66.65}>
      <Heads h={[[55.0, ['Pas', 'de', 'conclusions', 'hâtives'], [2, 3]], [57.6, ['Pas', 'd’excuse'], [1]], [60.3, ['Comprendre', 'les', 'mécanismes'], [0, 2]], [63.9, ['Des', 'actions', 'efficaces'], [1, 2]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{...nb('#C9A26B', 8), position: 'absolute', left: 0, top: 0, width: 960, height: 440, backgroundImage: 'radial-gradient(#0002 2px, transparent 2px)', backgroundSize: '18px 18px', opacity: pop(t, 54.8)}}>
          {[['fait', 'memo', 60, 40, -4], ['preuve', 'loupe', 330, 60, 3], ['témoin', 'bulle', 600, 30, -2], ['photo', 'carte', 160, 230, 5], ['mesure', 'equerre', 470, 240, -3]].map(([l, ic, x, y, r], k) => <div key={l as string} style={{position: 'absolute', left: x as number, top: y as number, width: 230, height: 150, background: '#fff', border: `4px solid ${NBK}`, boxShadow: '5px 5px 0 #0005', transform: `rotate(${r}deg) scale(${pop(t, 54.9 + k * 0.12)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontFamily: sansFont, fontWeight: 900, fontSize: 26}}><div style={{position: 'absolute', top: -14, left: 100, width: 26, height: 26, borderRadius: 13, background: RED, border: `3px solid ${NBK}`}} /><F n={ic as string} size={60} />{l}</div>)}
          <svg style={{position: 'absolute', left: 0, top: 0}} width={960} height={440}><path d="M 175 110 L 445 130 L 715 100 M 445 130 L 275 300 L 585 310" fill="none" stroke={RED} strokeWidth={4} pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - prog(t, 55.6, 56.6)}} /></svg>
        </div>
        <div style={{position: 'absolute', left: 0, top: 480, display: 'flex', flexDirection: 'column', gap: 14, width: 960}}>
          <div style={{position: 'relative', alignSelf: 'flex-start', ...nb('#fff', 5), padding: '10px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: DIM, opacity: pop(t, 56.0)}}>conclusions prématurées<Strk at={56.4} /></div>
          <div style={{position: 'relative', alignSelf: 'flex-start', ...nb('#fff', 5), padding: '10px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: DIM, opacity: pop(t, 58.2)}}>excuser les comportements dangereux<Strk at={58.9} /></div>
          <div style={{display: 'flex', gap: 14, flexWrap: 'wrap'}}><Chip at={61.1} ic="engrenage" l="comprendre les mécanismes" c={VIO} /><Chip at={64.6} ic="cible" l="actions correctives réellement efficaces" c={GREEN} /></div>
        </div>
      </Abs>
    </Out>
  );
};

/* ═════════════ Guichet 6 : retiens + fin TikTok ═════════════ */
const PH_W = 330, PH_H = 330 * 2712 / 1220;
const NUM = {x: 0.212 * PH_W, y: 0.32 * PH_H};
const TikTokPhone: React.FC<{at: number; zAt: number; ringAt: number; badgeAt: number}> = ({at, zAt, ringAt, badgeAt}) => {
  const t = useT();
  if (t < at) return null;
  const up = Math.min(1, spring(t, at));
  const z = prog(t, zAt, zAt + 0.8, easeInOut);
  const Z = lerp(1, 2.2, z);
  const ring = prog(t, ringAt, ringAt + 0.7, easeOut);
  return (
    <>
      <div style={{position: 'absolute', left: 303, top: 70, width: PH_W + 24, height: PH_H + 24, borderRadius: 48, background: NBK, boxShadow: `10px 10px 0 #25D366, 0 30px 60px rgba(0,0,0,0.25)`, transform: `translateY(${(1 - up) * 900}px) rotate(${(1 - up) * 8}deg)`, padding: 12, boxSizing: 'border-box'}}>
        <div style={{position: 'relative', width: PH_W, height: PH_H, borderRadius: 36, overflow: 'hidden', background: '#fff'}}>
          <Img src={PH(IMG.tiktok)} style={{position: 'absolute', left: 0, top: 0, width: PH_W, height: PH_H, transformOrigin: `${NUM.x}px ${NUM.y}px`, transform: `translate(${(PH_W / 2 - NUM.x) * z}px, ${(PH_H / 2 - NUM.y) * z}px) scale(${Z})`}} />
          {ring > 0 && <svg style={{position: 'absolute', left: 0, top: 0}} width={PH_W} height={PH_H}><ellipse cx={PH_W / 2} cy={PH_H / 2} rx={150} ry={34} fill="none" stroke={RED} strokeWidth={7} strokeLinecap="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - ring}} transform={`rotate(-3 ${PH_W / 2} ${PH_H / 2})`} /></svg>}
          <div style={{position: 'absolute', left: PH_W / 2 - 40, top: 8, width: 80, height: 22, borderRadius: 11, background: NBK}} />
        </div>
      </div>
      {t > ringAt + 0.3 && <div style={{position: 'absolute', left: 0, top: 70 + 12 + PH_H / 2 - 40, display: 'flex', alignItems: 'center', gap: 6, transform: `translateX(${Math.sin(t * 6) * 8}px) scale(${Math.min(1, spring(t, ringAt + 0.3))})`}}><div style={{...nb('#25D366', 5), padding: '8px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>WhatsApp</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: RED}}>→</div></div>}
      {t > badgeAt && <div style={{position: 'absolute', left: 0, right: 0, top: 70 + PH_H + 40, display: 'flex', justifyContent: 'center'}}><NBadge at={badgeAt} text="ÉCRIS-MOI ICI · ACCOMPAGNEMENT PERSONNALISÉ" bg={NBK} rot={-1} size={24} /></div>}
    </>
  );
};
const Retiens: React.FC = () => {
  const t = useT();
  if (t < 75.1) return (
    <Out end={75.15}>
      <Heads h={[[66.9, ['Retiens', 'ceci'], [0]], [68.2, ['Constater', 'un', 'fait'], [0, 2]], [71.1, ['Faire', 'progresser', 'la', 'prévention'], [1, 3]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 960, height: 780, opacity: 0.35}}><Iceberg dive={0.35} tipAt={0} /></div>
        <div style={{...nb('#fff', 7), boxShadow: `7px 7px 0 ${RED}`, position: 'absolute', left: 80, top: 30, width: 800, padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 16, opacity: pop(t, 68.1)}}><F n="loupe" size={80} /><div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32}}>identifier une erreur</div><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: DIM}}>= constater un fait</div></div></div>
        <div style={{...nb(GREEN, 8), position: 'absolute', left: 80, top: 430, width: 800, padding: '22px 24px', display: 'flex', alignItems: 'center', gap: 16, color: '#fff', transform: `scale(${t > 71.0 ? Math.min(1, spring(t, 71.0)) : 0})`}}><F n="hausse" size={90} /><div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34}}>comprendre pourquoi</div><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30}}>= faire progresser la prévention</div></div></div>
        {t > 73.9 && <Dust n={22} c={GOLD} />}
      </Abs>
    </Out>
  );
  return (
    <>
      <Heads h={[[75.4, ['Les', 'méthodes', 'd’investigation'], [1, 2]], [80.3, ['Écris-moi'], [0]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center', gap: 12}}>{[['TapRooT®', BLUE], ['causes profondes', ORANGE], ['compétences QHSE', GREEN]].map(([l, c], k) => <div key={l} style={{...nb(c, 5), padding: '8px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', transform: `scale(${t > 76.6 + k * 0.4 ? Math.min(1, spring(t, 76.6 + k * 0.4)) : 0})`}}>{l}</div>)}</div>
        <TikTokPhone at={79.2} zAt={80.4} ringAt={81.1} badgeAt={81.8} />
        {t > 82.5 && <Dust n={22} c={GOLD} />}
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
  ...STATIONS.map((r) => ({at: r.at, s: 'sfx/bell', v: 0.22})),
  ...searchCues(2.9, 14, 4.4, 4.8), ...rep(5.6, 3, 0.1, 'sfx/pop', 0.2), {at: 6.2, s: 'soft-whoosh', v: 0.3, dur: 0.8}, {at: 6.8, s: 'tampon', v: 0.35},
  {at: 12.1, s: 'sfx/pop', v: 0.3}, {at: 13.6, s: 'tampon', v: 0.45}, {at: 15.0, s: 'deep-hit', v: 0.55}, {at: 15.05, s: 'tampon', v: 0.5}, {at: 17.9, s: 'soft-whoosh', v: 0.3, dur: 0.8}, {at: 20.4, s: 'soft-whoosh', v: 0.45, dur: 1.4},
  {at: 25.8, s: 'tampon', v: 0.35}, {at: 28.0, s: 'stylo', v: 0.3, dur: 1.2}, {at: 28.2, s: 'sfx/pop', v: 0.25}, {at: 29.6, s: 'sfx/pop', v: 0.25}, {at: 32.0, s: 'sfx/pop', v: 0.3}, {at: 34.0, s: 'sfx/swish', v: 0.4}, {at: 36.4, s: 'bass-hit', v: 0.45}, {at: 38.0, s: 'tampon', v: 0.35},
  {at: 42.3, s: 'sfx/thud', v: 0.35}, ...PISTES.map((x) => ({at: Math.max(42.4, x[2]), s: 'sfx/swish', v: 0.3})),
  ...rep(54.9, 5, 0.12, 'sfx/pop', 0.2), {at: 55.6, s: 'stylo', v: 0.25, dur: 1}, {at: 56.4, s: 'sfx/swish', v: 0.35}, {at: 58.9, s: 'sfx/swish', v: 0.35}, {at: 61.1, s: 'sfx/pop', v: 0.3}, {at: 64.6, s: 'validation', v: 0.35},
  {at: 68.1, s: 'sfx/pop', v: 0.3}, {at: 71.0, s: 'bass-hit', v: 0.35}, {at: 73.9, s: 'validation', v: 0.3},
  ...rep(76.6, 3, 0.4, 'sfx/pop', 0.22), {at: 79.2, s: 'soft-whoosh', v: 0.4, dur: 0.8}, {at: 80.4, s: 'sfx/rise', v: 0.3, dur: 0.8}, {at: 81.1, s: 'stylo', v: 0.35, dur: 0.7}, {at: 81.4, s: 'sfx/pop', v: 0.3}, {at: 81.8, s: 'tampon', v: 0.35}, {at: 82.5, s: 'bass-hit', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
export const TaprootMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.8} to={8.5}><Intro /></Gate>
    <Gate from={11.9} to={22.2}><Accident /></Gate>
    <Gate from={25.6} to={38.8}><Taproot /></Gate>
    <Gate from={42.1} to={51.3}><Pistes /></Gate>
    <Gate from={54.7} to={66.7}><Faits /></Gate>
    <Gate from={66.6} to={OUTRO_AT}><Retiens /></Gate>
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-taproot-metro-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG];
