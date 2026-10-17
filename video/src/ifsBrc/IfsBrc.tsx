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
 * « Le mandat invisible : IFS & BRC » (4 min 13) — capsule « condensé + effet wahou » : voix d'origine, sous-titres
 * recalés mot à mot, photos réelles, thème « papier quadrillé ».
 * Fil rouge : LE TUBE PNEUMATIQUE À SIX GUICHETS (pression → gardiens → client → intégré → risque → avenir) ; la
 * capsule du dossier file d'un guichet à l'autre et chaque guichet passé se coche.
 * Transition : LE GYROPHARE à chaque partie.
 * Condensé de la série : texte cinétique, mot surligné jaune, mot manuscrit, tuiles de bois, palettes d'affichage,
 * fenêtres d'interface, store vénitien sur photo, photos en profondeur, compteurs, cartes à ombre dure, étiquettes
 * monospace, tampons, mots barrés, onde de choc, cases cochées, poussière.
 * Effets « wahou » nouveaux : encre invisible révélée par une lampe UV, voile qui se soulève, presse hydraulique avec
 * manomètre, portes automatiques de supermarché qui se verrouillent, barre de recherche qui trouve puis OUVRE l'élément
 * (IFS / BRC dépliés lettre à lettre, tableau des conséquences), flux d'énergie qui passe du législateur au client,
 * passeport tamponné et barrière de frontière, contrat déchiré, deux mondes qui fusionnent, modules qui s'arriment à un
 * moyeu, électrocardiogramme qui s'aplatit, balance contrat contre loi, onde qui se propage aux autres industries.
 */
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
const OUTRO_AT = 253.4;
export const IFSBRC_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 28.75, n: '1', title: 'La pression commerciale', s: 'une autorisation d’exister', c: RED, g: 'pression', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 54.4, n: '2', title: 'Les gardiens du système', s: 'les standards IFS & BRC', c: BLUE, g: 'gardiens', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 104.85, n: '3', title: 'Client contre règlement', s: 'une autre autorité', c: VIO, g: 'client', k: 'gyro', lab: 'PARTIE 3 / 6'},
  {at: 152.65, n: '4', title: 'Un système intégré', s: 'qualité et sécurité', c: TEAL, g: 'intégré', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 195.2, n: '5', title: 'Le risque ultime', s: 'perdre le client', c: ORANGE, g: 'risque', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 236.85, n: '6', title: 'Et demain ?', s: 'le débat est ouvert', c: GREEN, g: 'avenir', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 248.8;

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
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('zones/entrepot.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 880, objectFit: 'cover', objectPosition: '50% 40%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 30%, ${PAPER}DD 40%, ${PAPER} 45%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={700} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>AGROALIMENTAIRE · DISTRIBUTION</div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 84, color: INK, marginTop: 14}}>le mandat <span style={{color: VIO}}>invisible</span></div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 10}}>{'IFS'.split('').map((c, i) => <Tile key={i} ch={c} size={110} c={BLUE} />)}<div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: INK, margin: '0 14px'}}>&amp;</div>{'BRC'.split('').map((c, i) => <Tile key={`b${i}`} ch={c} size={110} c={RED} />)}</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: INK, marginTop: 26}}>plus puissant que <span style={{backgroundImage: `linear-gradient(${YEL}, ${YEL})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 40%', backgroundPosition: '0 85%'}}>la loi</span> ?</div>
      </Abs>
      <Abs x={60} y={1400} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={RED} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 70, width: 140, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO : la loi, l'encre invisible, le voile ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const uv = prog(t, 9.2, 12.6, easeInOut);
  const ux = lerp(-100, 1180, uv);
  const veil = prog(t, 14.5, 15.9, easeInOut);
  const bow = prog(t, 24.5, 26.0, easeInOut);
  return (
    <Out end={28.9}>
      {t < 9.0 && (
        <>
          <HiLine words={['Qui', 'fait', 'les', 'lois', '?']} mark={[3]} at={2.7} y={330} size={70} />
          <Abs x={90} y={470} w={900} style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
            <div style={{textAlign: 'center', opacity: pop(t, 2.8)}}><F n="batiment" size={170} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>les gouvernements</div></div>
            <div style={{transform: `rotate(${-30 + 30 * prog(t, 3.0, 3.3, easeIn)}deg)`, transformOrigin: '80% 80%', opacity: pop(t, 2.9)}}><F n="juge" size={150} /></div>
            <div style={{textAlign: 'center', opacity: pop(t, 3.8)}}><F n="assiette" size={170} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>notre assiette</div></div>
          </Abs>
          <Abs x={0} y={820} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 64, color: VIO, opacity: pop(t, 6.5)}}>une force bien plus puissante…</Abs>
        </>
      )}
      {t >= 9.0 && t < 14.4 && (
        <>
          <Abs x={60} y={440} w={960} h={700} style={{background: NIGHT, border: `5px solid ${INK}`, borderRadius: 26, overflow: 'hidden', opacity: pop(t, 9.0)}}>
            <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#1E2434', fontFamily: sansFont, fontWeight: 900, fontSize: 96, lineHeight: 1.05, textAlign: 'center'}}>LE MANDAT<br />INVISIBLE</div>
            <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#D7B8FF', textShadow: '0 0 24px #9B5CFF, 0 0 60px #6D4BD8', fontFamily: sansFont, fontWeight: 900, fontSize: 96, lineHeight: 1.05, textAlign: 'center', clipPath: `circle(${uv > 0.98 ? 1200 : 200}px at ${ux}px 350px)`}}>LE MANDAT<br />INVISIBLE</div>
            <div style={{position: 'absolute', left: ux - 200, top: 150, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(155,92,255,0.35), transparent)', opacity: uv < 0.98 ? 1 : 0}} />
            <div style={{position: 'absolute', left: 18, top: 16}}><Mono at={9.3} c={VIO} size={20}>lampe uv</Mono></div>
          </Abs>
          <Abs x={0} y={1180} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={10.7} c={VIO} size={30}>un pouvoir immense</Pill><Pill at={11.8} c={INK} size={30}>sur les fabricants</Pill></Abs>
        </>
      )}
      {t >= 14.4 && (
        <>
          <HiLine words={['Lever', 'le', 'voile']} mark={[2]} at={14.4} y={330} size={70} />
          <Abs x={110} y={460} w={860} h={640} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 26, boxShadow: `9px 9px 0 ${VIO}`, overflow: 'hidden'}}>
            <div style={{position: 'absolute', left: 300, top: 120, transform: `scale(${1 + bow * 0.25})`, transformOrigin: '50% 100%'}}><F n="chariot" size={260} /><div style={{position: 'absolute', left: 70, top: -90, transform: `scale(${Math.max(0, Math.min(1, spring(t, 18.1, 8, 10)))})`}}><F n="couronne" size={120} /></div></div>
            {Array.from({length: 6}, (_, k) => <div key={k} style={{position: 'absolute', left: 40 + k * 135, top: 470, transform: `scale(${1 - bow * 0.3}) rotate(${bow * (k % 2 ? 6 : -6)}deg)`, transformOrigin: '50% 100%', opacity: pop(t, 24.6 + k * 0.08)}}><F n="usine" size={110} /></div>)}
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 640 * (1 - veil), background: `linear-gradient(180deg, ${NAVY}, #2A3C6E)`, clipPath: `polygon(0 0, 100% 0, 100% 92%, 85% 100%, 70% 93%, 55% 100%, 40% 93%, 25% 100%, 10% 93%, 0 100%)`}} />
            <div style={{position: 'absolute', left: 18, top: 16}}><Mono at={21.5} c={RED} size={20}>pas gouvernementale</Mono></div>
          </Abs>
          <Abs x={0} y={1130} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={23.1} c={VIO} size={32}>purement commerciale</Pill><Pill at={24.5} c={INK} size={30}>toute une industrie</Pill></Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 1 : presse et portes ═════════════ */
const Presse: React.FC = () => {
  const t = useT();
  const down = prog(t, 34.7, 36.9, easeIn);
  const needle = lerp(-120, 110, prog(t, 34.8, 37.6, easeOut)) + (down > 0.95 ? Math.sin(t * 40) * 3 : 0);
  return (
    <Out end={44.5}>
      <HiLine words={['Une', 'pression', 'énorme']} mark={[1]} at={32.3} y={330} size={70} />
      <Abs x={60} y={450} w={600} h={700} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `9px 9px 0 ${RED}`, overflow: 'hidden', opacity: pop(t, 32.4)}}>
        <div style={{position: 'absolute', left: 80, top: 20, width: 30, height: 640, background: '#8A97A8', border: `4px solid ${INK}`}} /><div style={{position: 'absolute', right: 80, top: 20, width: 30, height: 640, background: '#8A97A8', border: `4px solid ${INK}`}} />
        <div style={{position: 'absolute', left: 280, top: 0, width: 40, height: 60 + down * 260, background: '#4A5468', border: `4px solid ${INK}`}} />
        <div style={{position: 'absolute', left: 70, top: 60 + down * 260, width: 460, height: 60, background: `repeating-linear-gradient(45deg, ${YEL} 0 24px, ${INK} 24px 48px)`, border: `5px solid ${INK}`, borderRadius: 8}} />
        <div style={{position: 'absolute', left: 190, top: 420, transform: `scaleY(${1 - down * 0.35}) scaleX(${1 + down * 0.12})`, transformOrigin: '50% 100%'}}><F n="usine" size={220} /></div>
        <div style={{position: 'absolute', left: 60, right: 60, bottom: 20, height: 20, background: INK, borderRadius: 6}} />
        <div style={{position: 'absolute', left: 18, top: 70}}><Mono at={32.9} c={INK} size={18}>producteur agroalimentaire</Mono></div>
      </Abs>
      <Abs x={690} y={450} w={330} h={330} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: '50%', boxShadow: `7px 7px 0 ${RED}`, opacity: pop(t, 34.3)}}>
        <svg width={320} height={320} style={{position: 'absolute', inset: 0}}><path d="M60 240 A120 120 0 1 1 260 240" fill="none" stroke="#E3E8EF" strokeWidth={24} /><path d="M195 70 A120 120 0 0 1 260 240" fill="none" stroke={RED} strokeWidth={24} />
          <g transform={`rotate(${needle} 160 165)`}><line x1={160} y1={165} x2={160} y2={60} stroke={INK} strokeWidth={9} strokeLinecap="round" /></g><circle cx={160} cy={165} r={16} fill={INK} /></svg>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 40, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: RED}}>PRESSION</div>
      </Abs>
      <Abs x={690} y={820} w={330} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
        {[{l: 'simple avantage', a: 39.5}, {l: 'case à cocher', a: 42.0}].map((x) => <div key={x.l} style={{position: 'relative', alignSelf: 'flex-start', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: DIM, opacity: pop(t, x.a)}}>{x.l}<Strike p={prog(t, x.a + 0.8, x.a + 1.2)} c={RED} /></div>)}
        <div style={{opacity: pop(t, 44.0)}}><Pill at={44.0} c={RED} size={34}>non, non !</Pill></div>
      </Abs>
    </Out>
  );
};
const Portes: React.FC = () => {
  const t = useT();
  const open = prog(t, 48.4, 49.4, easeInOut) * (1 - prog(t, 51.7, 52.6, easeInOut));
  const locked = t > 52.6;
  return (
    <Out end={54.5}>
      <HiLine words={['Une', 'autorisation', 'd’exister']} mark={[1, 2]} at={44.6} y={330} size={62} />
      <Abs x={90} y={450} w={900} h={720} style={{opacity: pop(t, 44.8)}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 130, background: RED, border: `6px solid ${INK}`, borderRadius: '20px 20px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 56, letterSpacing: 4}}><F n="chariot" size={90} />SUPERMARCHÉ</div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 124, bottom: 0, background: '#F1F4F8', border: `6px solid ${INK}`, borderTop: 'none', overflow: 'hidden'}}>
          <Img src={PH('zones/entrepot.jpg')} style={{position: 'absolute', left: 150, top: 40, width: 600, height: 520, objectFit: 'cover', filter: `brightness(${0.5 + open * 0.5})`}} />
          {[0, 1].map((k) => <div key={k} style={{position: 'absolute', top: 40, left: k ? 450 + open * 290 : 150 - open * 290, width: 300, height: 520, background: 'linear-gradient(120deg, rgba(190,220,240,0.85), rgba(255,255,255,0.55))', border: `6px solid ${INK}`, boxSizing: 'border-box'}} />)}
          {locked && <div style={{position: 'absolute', left: 390, top: 230, transform: `scale(${Math.max(0, Math.min(1, spring(t, 52.6, 8, 10)))})`}}><F n="cadenas" size={120} /></div>}
          <div style={{position: 'absolute', left: 20, top: 20}}><Mono at={48.3} c={open > 0.5 ? GREEN : RED} size={22}>{open > 0.5 ? 'certifié : entrez' : locked ? 'fermé' : 'accès'}</Mono></div>
        </div>
      </Abs>
      {locked && <Stamp at={52.8} c={RED} text="portes fermées" x={250} y={1090} rot={-5} size={58} />}
    </Out>
  );
};

/* ═════════════ PARTIE 2 : gardiens, recherche IFS/BRC, pouvoir ═════════════ */
const Gardiens: React.FC = () => {
  const t = useT();
  return (
    <Out end={65.8}>
      <HiLine words={['Deux', 'acronymes']} mark={[1]} at={57.9} y={330} size={70} />
      <Abs x={0} y={480} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 60}}>
        {[{l: 'IFS', c: BLUE, a: 61.1}, {l: 'BRC', c: RED, a: 61.8}].map((x) => (
          <div key={x.l} style={{textAlign: 'center'}}>
            <div style={{position: 'relative', display: 'inline-block', transform: `scale(${Math.max(0, Math.min(1, spring(t, 63.7, 8, 10)))})`}}><F n="bouclier" size={300} /></div>
            <div style={{marginTop: -200}}><Board text={x.l} at={x.a} h={110} c={x.c} stag={0.05} /></div>
          </div>
        ))}
      </Abs>
      <Abs x={0} y={1000} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={59.1} c={INK} size={30}>la pluie et le beau temps</Pill><Pill at={63.7} c={BLUE} size={30}>les gardiens du système</Pill></Abs>
    </Out>
  );
};
const Acro: React.FC<{short: string; long: string[]; at: number; c: string}> = ({short, long, at, c}) => {
  const t = useT();
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
      {short.split('').map((ch, k) => {const p = prog(t, at + k * 0.35, at + k * 0.35 + 0.4, easeOut); return (
        <div key={k} style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <Tile ch={ch} size={78} c={c} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK, clipPath: `inset(0 ${(1 - p) * 100}% 0 0)`}}>{long[k]}</div>
        </div>
      );})}
    </div>
  );
};
const Createurs: React.FC = () => {
  const t = useT();
  const az = prog(t, 85.0, 88.0, easeInOut);
  return (
    <Out end={89.6}>
      <HiLine words={['Le', 'point', 'crucial']} mark={[2]} at={65.8} y={330} size={66} />
      <SearchOpen x={60} y={440} w={960} h={800} at={65.9} query="qui a créé IFS et BRC ?" results={['Calendrier des audits 2024', 'IFS & BRC : des cahiers des charges privés', 'Liste des organismes certificateurs', 'Barème des non-conformités']} found={1} foundAt={67.9} clickAt={68.4} c={BLUE}>
        <div style={{position: 'absolute', left: 40, top: 30}}><Acro short="IFS" long={['International', 'Featured', 'Standards']} at={69.0} c={BLUE} /></div>
        <div style={{position: 'absolute', left: 500, top: 30}}><Acro short="BRC" long={['British', 'Retail', 'Consortium']} at={71.4} c={RED} /></div>
        <div style={{position: 'absolute', left: 40, top: 330}}><div style={{position: 'relative', display: 'inline-block', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: DIM, opacity: pop(t, 75.6)}}>des normes publiques<Strike p={prog(t, 76.5, 77.0)} c={RED} /></div></div>
        {t > 77.6 && <div style={{position: 'absolute', left: 520, top: 300}}><Stamp at={77.7} c={RED} text="privés" x={0} y={0} rot={-6} size={60} /></div>}
        <div style={{position: 'absolute', left: 40, right: 40, top: 430, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30, opacity: pop(t, 79.6)}}>
          <div style={{textAlign: 'center'}}><F n="chariot" size={110} /><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: INK}}>par la distribution</div></div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: BLUE, transform: `rotate(${(t - 80) * 90}deg)`}}>⟳</div>
          <div style={{textAlign: 'center'}}><F n="chariot" size={110} /><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: INK}}>pour la distribution</div></div>
        </div>
        <div style={{position: 'absolute', left: 60, right: 60, top: 630, height: 54, borderRadius: 27, background: '#E3E8EF', border: `4px solid ${INK}`, overflow: 'hidden', opacity: pop(t, 84.9)}}>
          <div style={{width: `${az * 100}%`, height: '100%', background: `linear-gradient(90deg, ${BLUE}, ${GREEN})`}} />
          <div style={{position: 'absolute', left: 16, top: 6, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>A</div><div style={{position: 'absolute', right: 16, top: 6, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: az > 0.95 ? '#fff' : INK}}>Z</div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 10, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 20, color: INK}}>qualité · sécurité · fournisseurs</div>
        </div>
      </SearchOpen>
    </Out>
  );
};
const Pouvoir: React.FC = () => {
  const t = useT();
  const flow = prog(t, 92.2, 95.6, easeInOut);
  return (
    <Out end={104.95}>
      <HiLine words={['Le', 'pouvoir', 'change', 'de', 'main']} mark={[1]} at={89.6} y={330} size={62} />
      <Abs x={60} y={450} w={960} h={440} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `9px 9px 0 ${VIO}`, overflow: 'hidden', opacity: pop(t, 89.7)}}>
        <div style={{position: 'absolute', left: 50, top: 80, textAlign: 'center', filter: `grayscale(${flow}) opacity(${1 - flow * 0.6})`}}><F n="juge" size={190} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>le législateur</div></div>
        <div style={{position: 'absolute', right: 50, top: 80, textAlign: 'center', filter: `drop-shadow(0 0 ${30 * flow}px ${VIO})`}}><F n="chariot" size={190} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: VIO}}>le client</div></div>
        <svg width={960} height={440} style={{position: 'absolute', inset: 0}}>
          <line x1={280} y1={180} x2={680} y2={180} stroke="#E3E8EF" strokeWidth={16} strokeLinecap="round" />
          <line x1={280} y1={180} x2={280 + 400 * flow} y2={180} stroke={VIO} strokeWidth={16} strokeLinecap="round" strokeDasharray="30 16" strokeDashoffset={-t * 120} />
          {flow > 0 && flow < 1 && <circle cx={280 + 400 * flow} cy={180} r={24} fill={YEL} stroke={INK} strokeWidth={4} />}
        </svg>
        <div style={{position: 'absolute', left: 380, top: 220, width: 200, textAlign: 'center'}}><Mono at={92.2} c={VIO} size={20}>pouvoir</Mono></div>
      </Abs>
      <Blinds src="zones/client.jpg" x={60} y={920} w={460} h={300} at={97.6} pos="50% 60%"><div style={{position: 'absolute', left: 14, bottom: 14}}><Mono at={98.2} c={VIO} size={18}>chaîne de supermarchés</Mono></div></Blinds>
      <Abs x={550} y={1010} w={470} style={{textAlign: 'center'}}><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 52, color: INK, opacity: pop(t, 101.9)}}>son exigence devient…</div></Abs>
      <Abs x={0} y={1250} w={1080}><Board text="LOI DU MARCHE" at={102.7} h={62} c={VIO} stag={0.03} /></Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 3 : diplôme / passeport, recherche conséquences ═════════════ */
const Passeport: React.FC = () => {
  const t = useT();
  const stamp = prog(t, 128.2, 128.5, easeIn);
  const bar = prog(t, 129.8, 130.8, easeInOut);
  return (
    <Out end={135.6}>
      <HiLine words={['Diplôme', 'ou', 'passeport', '?']} mark={[0, 2]} at={108.4} y={330} size={66} />
      <Brut x={60} y={450} w={440} h={520} at={116.9} sh={BLUE} style={{textAlign: 'center'}}>
        <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: BLUE}}>ISO 9001</div>
        <div style={{margin: '24px auto', width: 300, height: 210, background: 'linear-gradient(135deg, #FFFDF6, #F5EBCF)', border: `6px solid ${GOLD}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="diplome" size={150} /></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK}}>un diplôme</div>
        <div style={{display: 'flex', justifyContent: 'center', gap: 10, marginTop: 14}}><Pill at={119.8} c={BLUE} size={24}>un plus</Pill><Pill at={122.3} c={INK} size={24}>choisi</Pill></div>
      </Brut>
      <Brut x={540} y={450} w={480} h={520} at={124.1} sh={RED} style={{textAlign: 'center', overflow: 'hidden'}}>
        <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: RED}}>IFS & BRC</div>
        <div style={{position: 'relative', margin: '24px auto', width: 230, height: 300, background: NAVY, border: `5px solid ${INK}`, borderRadius: 14, color: GOLD, fontFamily: sansFont, fontWeight: 900, fontSize: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16}}>
          <F n="globe" size={100} />PASSEPORT
          {stamp > 0 && <div style={{position: 'absolute', left: 40, top: 160, padding: '6px 14px', border: `5px solid ${GREEN}`, borderRadius: 10, color: GREEN, background: 'rgba(255,255,255,0.9)', fontSize: 28, transform: `rotate(-14deg) scale(${lerp(2.4, 1, stamp)})`, opacity: stamp}}>ADMIS</div>}
        </div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>le passeport</div>
      </Brut>
      <Abs x={60} y={1010} w={960} h={200} style={{opacity: pop(t, 129.2)}}>
        <div style={{position: 'absolute', left: 380, top: 30, width: 50, height: 170, background: INK, borderRadius: 8}} />
        <div style={{position: 'absolute', left: 405, top: 50, width: 520, height: 34, background: `repeating-linear-gradient(90deg, ${RED} 0 50px, #fff 50px 100px)`, border: `4px solid ${INK}`, transformOrigin: '0 50%', transform: `scaleX(${1 - bar * 0.85})`}} />
        <div style={{position: 'absolute', left: 20, top: 90}}><Mono at={129.7} c={INK} size={22}>la frontière</Mono></div>
      </Abs>
      <Abs x={0} y={1230} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={131.8} c={DIM} size={28}>pas une option</Pill><Pill at={133.1} c={RED} size={28}>une condition pour travailler</Pill></Abs>
    </Out>
  );
};
const Consequences: React.FC = () => {
  const t = useT();
  const tear = prog(t, 151.2, 151.8, easeIn);
  const R = [{s: 'ISO 9001', a: 'choix', c: 'perdre des points face à un concurrent', at: 138.9, col: BLUE}, {s: 'IFS & BRC', a: 'contrat commercial', c: 'perte immédiate du plus gros client', at: 143.5, col: RED}];
  return (
    <Out end={152.75}>
      <HiLine words={['La', 'colonne', 'des', 'conséquences']} mark={[3]} at={135.6} y={330} size={60} />
      <SearchOpen x={60} y={440} w={960} h={800} at={135.7} query="échec : conséquences ?" results={['Préparer son premier audit', 'Tableau : ISO 9001 face à IFS & BRC', 'Durée de validité d’un certificat']} found={1} foundAt={137.6} clickAt={138.1} c={VIO}>
        <div style={{display: 'flex', height: 70, alignItems: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM, borderBottom: `3px solid ${INK}`}}><div style={{width: 220, paddingLeft: 24}}>STANDARD</div><div style={{width: 240}}>AUTORITÉ</div><div style={{flex: 1}}>CONSÉQUENCE D’UN ÉCHEC</div></div>
        {R.map((r) => (
          <div key={r.s} style={{display: 'flex', alignItems: 'center', height: 170, borderBottom: '2px solid #EEF1F5', background: r.col === RED && t > 146.0 ? `${RED}12` : '#fff', opacity: pop(t, r.at)}}>
            <div style={{width: 220, paddingLeft: 24, fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: r.col}}>{r.s}</div>
            <div style={{width: 240, fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: INK}}>{r.a}</div>
            <div style={{flex: 1, paddingRight: 24, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: r.col === RED ? RED : INK, opacity: pop(t, r.at + 1.6)}}>{r.c}</div>
          </div>
        ))}
        <div style={{position: 'absolute', left: 250, top: 470, width: 440, height: 220}}>
          {[0, 1].map((k) => <div key={k} style={{position: 'absolute', top: 0, left: 0, width: 440, height: 220, clipPath: k ? 'polygon(52% 0, 100% 0, 100% 100%, 48% 100%, 53% 70%, 47% 45%, 53% 20%)' : 'polygon(0 0, 52% 0, 53% 20%, 47% 45%, 53% 70%, 48% 100%, 0 100%)', transform: `translateX(${(k ? 1 : -1) * tear * 120}px) rotate(${(k ? 1 : -1) * tear * 12}deg)`, opacity: pop(t, 149.4)}}>
            <div style={{width: '100%', height: '100%', background: '#F4F1E8', border: `5px solid ${INK}`, borderRadius: 10, boxSizing: 'border-box', padding: 24, fontFamily: MONO, fontWeight: 700, fontSize: 26, color: INK}}>CONTRAT<div style={{height: 10, background: '#D8CBA6', marginTop: 24, borderRadius: 5}} /><div style={{height: 10, background: '#D8CBA6', marginTop: 18, width: '70%', borderRadius: 5}} /></div>
          </div>)}
        </div>
      </SearchOpen>
      {tear > 0.5 && <Stamp at={151.5} c={RED} text="fin du contrat" x={300} y={1262} rot={-4} size={54} />}
    </Out>
  );
};

/* ═════════════ PARTIE 4 : fusion et moyeu ═════════════ */
const Fusion: React.FC = () => {
  const t = useT();
  const m = prog(t, 171.4, 173.2, easeInOut);
  return (
    <Out end={174.3}>
      <HiLine words={['Fusionner', 'deux', 'mondes']} mark={[0]} at={162.4} y={330} size={66} />
      <Abs x={60} y={440} w={960} h={460} style={{opacity: pop(t, 156.2)}}>
        <div style={{position: 'absolute', left: lerp(80, 280, m), top: 40, width: 400, height: 400, borderRadius: '50%', background: m > 0.95 ? `${TEAL}55` : `${BLUE}33`, border: `6px solid ${m > 0.95 ? TEAL : BLUE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 167.8)}}><div style={{textAlign: 'center', opacity: 1 - m, transform: `translateX(-60px)`}}><F n="medaille" size={110} style={{margin: '0 auto'}} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: BLUE}}>qualité</div></div></div>
        <div style={{position: 'absolute', left: lerp(480, 280, m), top: 40, width: 400, height: 400, borderRadius: '50%', background: m > 0.95 ? `${TEAL}55` : `${GREEN}33`, border: `6px solid ${m > 0.95 ? TEAL : GREEN}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 169.6)}}><div style={{textAlign: 'center', opacity: 1 - m, transform: `translateX(60px)`}}><F n="assiette" size={110} style={{margin: '0 auto'}} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: GREEN}}>sécurité des aliments</div></div></div>
        {m > 0.95 && <div style={{position: 'absolute', left: 280, top: 160, width: 400, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: TEAL, transform: `scale(${Math.max(0, Math.min(1, spring(t, 173.2, 8, 10)))})`}}>un seul<br />référentiel</div>}
      </Abs>
      <Abs x={0} y={920} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={158.7} c={TEAL} size={32}>une approche totalement intégrée</Pill></Abs>
      <Deep src="iso26/labo-manuel.jpg" x={190} y={1010} w={700} h={230} at={160.7} pos="50% 35%" />
    </Out>
  );
};
const Moyeu: React.FC = () => {
  const t = useT();
  const MOD = [{l: 'qualité', ic: 'medaille', a: 177.2, c: BLUE}, {l: 'HACCP', ic: 'eprouvette', a: 182.0, c: RED}, {l: 'hygiène', ic: 'savon', a: 185.1, c: TEAL}, {l: 'allergènes', ic: 'stop', a: 187.6, c: ORANGE}, {l: 'traçabilité', ic: 'loupe', a: 189.9, c: VIO}];
  const glow = prog(t, 192.4, 193.4);
  const cx = 540, cy = 830, R = 330;
  return (
    <Out end={195.3}>
      <HiLine words={['Vraiment', 'tout']} mark={[1]} at={174.3} y={330} size={70} />
      <div style={{position: 'absolute', left: cx - R, top: cy - R, width: R * 2, height: R * 2, borderRadius: '50%', border: `4px dashed ${glow > 0.5 ? TEAL : '#C9D2DF'}`, transform: `rotate(${t * 10}deg)`, opacity: pop(t, 174.6)}} />
      <div style={{position: 'absolute', left: cx - 130, top: cy - 130, width: 260, height: 260, borderRadius: '50%', background: TEAL, border: `8px solid ${INK}`, boxShadow: `0 0 ${80 * glow}px ${TEAL}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 44, opacity: pop(t, 174.6), transform: `scale(${1 + glow * 0.08})`}}>IFS<div style={{fontSize: 30}}>& BRC</div></div>
      {MOD.map((m, k) => {
        const dock = prog(t, m.a, m.a + 0.8, easeOut);
        const ang = (-90 + k * 72) * (Math.PI / 180) + (1 - dock) * 1.2;
        const r = lerp(R + 260, R, dock);
        return (
          <div key={m.l} style={{position: 'absolute', left: cx + Math.cos(ang) * r - 95, top: cy + Math.sin(ang) * r - 95, width: 190, height: 190, borderRadius: 30, background: '#fff', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${m.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: dock}}>
            <F n={m.ic} size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK}}>{m.l}</div>
          </div>
        );
      })}
      <Abs x={0} y={1230} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 60, color: TEAL, opacity: pop(t, 192.4)}}>un seul standard, une maîtrise totale</Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 5 : amende ou fin, électrocardiogramme ═════════════ */
const Ecg: React.FC<{flat: number; w: number; h: number}> = ({flat, w, h}) => {
  const t = useT();
  const pts = Array.from({length: 121}, (_, k) => {
    const x = (k / 120) * w;
    const ph = ((x + t * 260) % 260) / 260;
    const beat = ph > 0.45 && ph < 0.5 ? -h * 0.38 : ph > 0.5 && ph < 0.53 ? h * 0.2 : ph > 0.6 && ph < 0.7 ? -h * 0.06 : 0;
    const f = x / w < flat ? 1 : 0;
    return `${k ? 'L' : 'M'}${x} ${h / 2 + beat * (1 - f)}`;
  }).join(' ');
  return <svg width={w} height={h}><path d={pts} fill="none" stroke={flat > 0.5 ? RED : GREEN} strokeWidth={6} strokeLinejoin="round" /></svg>;
};
const Risque: React.FC = () => {
  const t = useT();
  const flat = prog(t, 216.9, 218.6);
  return (
    <Out end={221.6}>
      <HiLine words={['Amende', 'ou', 'fin', 'du', 'contrat', '?']} mark={[0, 2, 3, 4]} at={198.8} y={330} size={58} />
      <Brut x={60} y={450} w={440} h={560} at={203.9} sh={BLUE} style={{textAlign: 'center'}}>
        <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: BLUE}}>INSPECTION DE L’ÉTAT</div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 20}}><F n="batiment" size={130} /></div>
        <div style={{margin: '20px auto 0', width: 260, padding: '14px 0', background: '#FFF6D6', border: `4px dashed ${INK}`, borderRadius: 12, fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, transform: `rotate(-4deg) scale(${pop(t, 206.3)})`}}>amende</div>
        <div style={{marginTop: 14}}><Pill at={207.3} c={ORANGE} size={26}>avertissement</Pill></div>
        <div style={{marginTop: 16, fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: GREEN, opacity: pop(t, 209.4)}}>✓ l’entreprise s’en remet</div>
      </Brut>
      <Brut x={540} y={450} w={480} h={560} at={211.3} sh={RED} style={{textAlign: 'center', overflow: 'hidden'}}>
        <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: RED}}>AUDIT IFS / BRC RATÉ</div>
        <div style={{margin: '30px auto 0', width: 420, height: 240, background: NIGHT, borderRadius: 16, border: `4px solid ${INK}`, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ecg flat={flat} w={400} h={220} /></div>
        <div style={{marginTop: 20, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: flat > 0.5 ? RED : INK}}>{flat > 0.5 ? 'fin de l’activité avec ce client' : 'activité avec le client'}</div>
      </Brut>
      <Abs x={0} y={1050} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 20, alignItems: 'center'}}><div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: DIM, opacity: pop(t, 218.7)}}>administratif<Strike p={prog(t, 219.6, 220.1)} c={RED} /></div></Abs>
      <Stamp at={220.4} c={RED} text="vital" x={400} y={1140} rot={-5} size={70} />
    </Out>
  );
};
const Phrase: React.FC = () => {
  const t = useT();
  const tip = prog(t, 231.4, 233.0, easeInOut);
  return (
    <Out end={236.95}>
      <HiLine words={['Deux', 'mots', 'qui', 'changent', 'tout']} mark={[1]} at={221.6} y={330} size={58} />
      <Abs x={70} y={440} w={940} h={300} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 26, boxShadow: `9px 9px 0 ${ORANGE}`, padding: '40px 46px', boxSizing: 'border-box', opacity: pop(t, 221.7)}}>
        <div style={{position: 'absolute', left: 20, top: -40, fontFamily: 'Georgia, serif', fontSize: 170, color: YEL, lineHeight: 1}}>“</div>
        <Kin text="La perte de la certification peut signifier la perte du client…" at={223.5} size={46} stagger={0.016} />
      </Abs>
      {[{w: 'IMMÉDIATEMENT', a: 227.1, y: 765, rot: -4}, {w: 'DÉFINITIVEMENT', a: 228.2, y: 895, rot: 3}].map((x) => {const p = prog(t, x.a, x.a + 0.25, easeIn); const ring = (t - x.a - 0.25) / 0.7; return (
        <React.Fragment key={x.w}>
          {t > x.a && <Abs x={0} y={x.y} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-block', padding: '10px 30px', border: `8px solid ${RED}`, borderRadius: 14, color: RED, background: 'rgba(255,255,255,0.92)', fontFamily: sansFont, fontWeight: 900, fontSize: 62, letterSpacing: 4, transform: `rotate(${x.rot}deg) scale(${lerp(2.6, 1, p)})`, opacity: p}}>{x.w}</div></Abs>}
          {ring > 0 && ring < 1 && <div style={{position: 'absolute', left: 540 - ring * 500, top: x.y + 50 - ring * 500, width: ring * 1000, height: ring * 1000, borderRadius: '50%', border: `10px solid ${RED}`, opacity: 0.4 * (1 - ring)}} />}
        </React.Fragment>
      );})}
      <Abs x={190} y={1000} w={700} h={260} style={{opacity: pop(t, 230.1)}}>
        <svg width={700} height={260}><polygon points="350,240 320,260 380,260" fill={INK} /><line x1={350} y1={60} x2={350} y2={240} stroke={INK} strokeWidth={10} />
          <g transform={`rotate(${tip * 14} 350 60)`}><rect x={70} y={52} width={560} height={16} rx={8} fill={INK} /><line x1={110} y1={68} x2={110} y2={130} stroke={INK} strokeWidth={4} /><line x1={590} y1={68} x2={590} y2={130} stroke={INK} strokeWidth={4} /><rect x={40} y={130} width={140} height={18} rx={6} fill={BLUE} /><rect x={520} y={130} width={140} height={18} rx={6} fill={RED} /></g></svg>
        <div style={{position: 'absolute', left: 50 , top: 60 - tip * 70}}><F n="livres" size={90} /><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: BLUE}}>la loi</div></div>
        <div style={{position: 'absolute', left: 540, top: 60 + tip * 70}}><F n="parchemin" size={90} /><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: RED}}>le contrat</div></div>
      </Abs>
      <Abs x={0} y={1265} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={234.5} c={RED} size={30}>la force brute du contrat commercial</Pill></Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 6 : onde vers les autres industries ═════════════ */
const Avenir: React.FC = () => {
  const t = useT();
  const IND = [{l: 'agroalimentaire', ic: 'assiette', a: 240.2, ang: 270}, {l: 'textile', ic: 'ciseaux', a: 243.6, ang: 30}, {l: 'électronique', ic: 'ordinateur', a: 244.7, ang: 150}, {l: 'automobile', ic: 'voiture', a: 245.9, ang: 90}];
  const cx = 540, cy = 830, R = 300;
  const shrink = prog(t, 249.9, 251.0, easeInOut);
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={['Va-t-il', 'se', 'généraliser', '?']} mark={[2]} at={240.3} y={330} size={64} />
      {[0, 1, 2].map((k) => {const rk = ((t - 242.7 - k * 0.8) % 2.4) / 2.4; return t > 242.7 ? <div key={k} style={{position: 'absolute', left: cx - rk * R * 1.2, top: cy - rk * R * 1.2, width: rk * R * 2.4, height: rk * R * 2.4, borderRadius: '50%', border: `5px solid ${VIO}`, opacity: 0.5 * (1 - rk)}} /> : null;})}
      <div style={{position: 'absolute', left: cx - 110, top: cy - 110, width: 220, height: 220, borderRadius: '50%', background: '#fff', border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 240.4)}}><F n="chariot" size={130} /><div style={{position: 'absolute', top: -60}}><F n="couronne" size={90} /></div></div>
      {IND.map((d) => {
        const a = (d.ang * Math.PI) / 180;
        const crown = Math.max(0, Math.min(1, spring(t, d.a + 0.4, 8, 10)));
        return (
          <div key={d.l} style={{position: 'absolute', left: cx + Math.cos(a) * R - 100, top: cy + Math.sin(a) * R - 90, width: 200, textAlign: 'center', opacity: pop(t, d.a)}}>
            <div style={{position: 'relative', display: 'inline-block', background: '#fff', border: `5px solid ${INK}`, borderRadius: 30, padding: 14, boxShadow: `6px 6px 0 ${VIO}`}}><F n={d.ic} size={90} />{t > d.a + 0.4 && <div style={{position: 'absolute', right: -24, top: -34, transform: `scale(${crown})`}}><F n="couronne" size={60} /></div>}</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, marginTop: 6}}>{d.l}</div>
          </div>
        );
      })}
      <Abs x={60} y={1210} w={960} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20}}>
        <div style={{opacity: pop(t, 249.9), transform: `scale(${1 - shrink * 0.45})`, transformOrigin: '50% 50%'}}><F n="juge" size={90} /></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM, opacity: pop(t, 249.9)}}>réglementations publiques… secondaires ?</div>
      </Abs>
      <Abs x={0} y={1320} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16}}><Pill at={252.3} c={GREEN} size={32}>le débat est ouvert</Pill></Abs>
      {t > 252.3 && <Dust n={22} c={GOLD} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: at + 0.35 + len * 0.05, s: 'sfx/pop', v: 0.25}, ...rep(at + 0.8 + len * 0.05, 3, 0.12, 'sfx/pop', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 1.4, s: 'validation', v: 0.2})), {at: ALLDONE, s: 'validation', v: 0.35},
  {at: 3.3, s: 'tampon', v: 0.5}, {at: 3.8, s: 'sfx/pop', v: 0.2}, {at: 6.5, s: 'stylo', v: 0.25},
  {at: 9.1, s: 'tension', v: 0.2, dur: 3.5}, {at: 9.2, s: 'soft-whoosh', v: 0.35, dur: 3}, {at: 12.6, s: 'bass-hit', v: 0.4}, {at: 10.7, s: 'sfx/pop', v: 0.2}, {at: 11.8, s: 'sfx/pop', v: 0.2},
  {at: 14.5, s: 'sfx/swish', v: 0.45}, {at: 15.0, s: 'soft-whoosh', v: 0.4, dur: 1}, {at: 18.1, s: 'sfx/ding', v: 0.3}, {at: 21.5, s: 'sfx/pop', v: 0.2}, {at: 23.1, s: 'sfx/pop', v: 0.22}, ...rep(24.6, 6, 0.08, 'sfx/thud', 0.12),
  {at: 34.7, s: 'tension', v: 0.3, dur: 2.2}, {at: 36.9, s: 'deep-hit', v: 0.55}, {at: 36.92, s: 'bass-hit', v: 0.4}, {at: 40.3, s: 'stylo', v: 0.3}, {at: 42.8, s: 'stylo', v: 0.3}, {at: 44.0, s: 'sfx/pop', v: 0.25},
  {at: 48.4, s: 'validation', v: 0.3}, {at: 48.5, s: 'soft-whoosh', v: 0.4, dur: 1}, {at: 51.7, s: 'sfx/swish', v: 0.35}, {at: 52.6, s: 'cadenas', v: 0.55}, {at: 52.8, s: 'tampon', v: 0.5},
  ...flaps(61.1, 10), ...flaps(61.8, 10), {at: 63.7, s: 'bass-hit', v: 0.35},
  ...searchCues(65.9, 23, 67.9, 68.4), ...[0, 1, 2].map((k) => ({at: 69.0 + k * 0.35, s: 'sfx/pop', v: 0.18})), ...[0, 1, 2].map((k) => ({at: 71.4 + k * 0.35, s: 'sfx/pop', v: 0.18})), {at: 76.5, s: 'stylo', v: 0.3}, {at: 77.7, s: 'tampon', v: 0.55}, {at: 79.6, s: 'sfx/whoosh', v: 0.25}, {at: 85.0, s: 'sfx/rise', v: 0.3, dur: 3},
  {at: 92.2, s: 'riser', v: 0.3, dur: 3.4}, ...rep(92.4, 12, 0.28, 'sfx/click', 0.1), {at: 95.6, s: 'bass-hit', v: 0.4}, {at: 97.6, s: 'soft-whoosh', v: 0.3}, ...flaps(102.7, 14),
  {at: 116.9, s: 'sfx/thud', v: 0.3}, {at: 119.8, s: 'sfx/pop', v: 0.2}, {at: 122.3, s: 'sfx/pop', v: 0.2}, {at: 124.1, s: 'sfx/thud', v: 0.3}, {at: 128.2, s: 'tampon', v: 0.6}, {at: 129.8, s: 'sfx/swish', v: 0.35}, {at: 130.6, s: 'sfx/ding', v: 0.3}, {at: 131.8, s: 'sfx/pop', v: 0.2}, {at: 133.1, s: 'sfx/pop', v: 0.22},
  ...searchCues(135.7, 22, 137.6, 138.1), {at: 138.9, s: 'sfx/thud', v: 0.25}, {at: 143.5, s: 'sfx/thud', v: 0.3}, {at: 146.0, s: 'alarme', v: 0.08, dur: 1}, {at: 149.4, s: 'page', v: 0.4}, {at: 151.2, s: 'page', v: 0.6}, {at: 151.25, s: 'sfx/swish', v: 0.4}, {at: 151.5, s: 'tampon', v: 0.5},
  {at: 158.7, s: 'sfx/pop', v: 0.22}, {at: 160.7, s: 'soft-whoosh', v: 0.3}, {at: 167.8, s: 'sfx/pop', v: 0.2}, {at: 169.6, s: 'sfx/pop', v: 0.2}, {at: 171.4, s: 'soft-whoosh', v: 0.4, dur: 1.8}, {at: 173.2, s: 'bass-hit', v: 0.4}, {at: 173.25, s: 'validation', v: 0.3},
  ...[177.2, 182.0, 185.1, 187.6, 189.9].flatMap((a) => [{at: a, s: 'sfx/whoosh', v: 0.25}, {at: a + 0.8, s: 'cadenas', v: 0.3}]), {at: 192.4, s: 'riser', v: 0.3, dur: 1}, {at: 193.4, s: 'validation', v: 0.35},
  {at: 203.9, s: 'sfx/thud', v: 0.3}, {at: 206.3, s: 'page', v: 0.4}, {at: 207.3, s: 'sfx/pop', v: 0.2}, {at: 209.4, s: 'sfx/ding', v: 0.2}, {at: 211.3, s: 'sfx/thud', v: 0.3}, ...rep(211.8, 5, 1.0, 'sfx/click', 0.25), {at: 216.9, s: 'tension', v: 0.25, dur: 1.7}, {at: 218.6, s: 'alarme', v: 0.12, dur: 1.5}, {at: 219.6, s: 'stylo', v: 0.3}, {at: 220.4, s: 'tampon', v: 0.6},
  {at: 221.7, s: 'soft-whoosh', v: 0.3}, {at: 227.1, s: 'tampon', v: 0.6}, {at: 227.15, s: 'deep-hit', v: 0.45}, {at: 228.2, s: 'tampon', v: 0.6}, {at: 228.25, s: 'deep-hit', v: 0.45}, {at: 231.4, s: 'sfx/swish', v: 0.3}, {at: 233.0, s: 'sfx/thud', v: 0.45}, {at: 234.5, s: 'sfx/pop', v: 0.22},
  {at: 240.4, s: 'sfx/pop', v: 0.25}, {at: 242.7, s: 'soft-whoosh', v: 0.3, dur: 2}, ...[243.6, 244.7, 245.9].flatMap((a) => [{at: a, s: 'sfx/pop', v: 0.22}, {at: a + 0.4, s: 'sfx/ding', v: 0.2}]), {at: 249.9, s: 'sfx/swish', v: 0.3}, {at: 252.3, s: 'validation', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const IfsBrc: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={29.0}><Intro /></Gate>
    <Gate from={32.1} to={44.6}><Presse /></Gate>
    <Gate from={44.5} to={54.6}><Portes /></Gate>
    <Gate from={57.8} to={65.9}><Gardiens /></Gate>
    <Gate from={65.8} to={89.7}><Createurs /></Gate>
    <Gate from={89.6} to={105.0}><Pouvoir /></Gate>
    <Gate from={108.2} to={135.7}><Passeport /></Gate>
    <Gate from={135.6} to={152.8}><Consequences /></Gate>
    <Gate from={156.0} to={174.4}><Fusion /></Gate>
    <Gate from={174.3} to={195.4}><Moyeu /></Gate>
    <Gate from={198.6} to={221.7}><Risque /></Gate>
    <Gate from={221.6} to={237.0}><Phrase /></Gate>
    <Gate from={240.2} to={OUTRO_AT}><Avenir /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}><Gyro i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={253.3}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-ifs-brc-origine.m4a')} trimAfter={s(253.4)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Check, Count, Win, Kin, GLASS, T, random];
