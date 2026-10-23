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
 * « Toolbox Meeting HSE » (6 min 05) — capsule « condensé + effet wahou + ultra premium » présentée en métro :
 * 8 stations (feuille signée → 5 erreurs → dialogue → chef d'équipe → 3 sources → 15 minutes → silence → intention).
 * Voix d'origine (sans musique de fond), sous-titres calés mot à mot. Couverture : photo + « TOOLBOX MEETING HSE » en
 * lettres-photos animées. Fil rouge : tube pneumatique à six guichets calés sur les vraies parties de la vidéo
 * (formalité → 5 erreurs → dialogue → méthode → silence → intention) ; gyrophare (transition principale), loupe et
 * capsule pneumatique plein écran ; store vénitien dans les scènes ; barre de recherche qui ouvre les 3 sources du plan.
 */
const IMG = {
  cover: 'sysqsse-gen/sante.jpg',
  cTool: 'maturite-gen/proactif.jpg',
  cMeet: 'heures-gen/equipe-chantier.jpg',
  cHse: 'ishikawa-gen/panique.jpg',
  raffinerie: 'smi/raffinerie.jpg',
  feuille: 'ishikawa-gen/signatures.jpg',
  dialogue: 'influence-gen/ecoute.jpg',
  chef: 'causerie/manager-d.png',
  programme: 'heures-gen/rapport.jpg',
  miroir: 'sysqsse-gen/sante.jpg',
  silence: 'alerte-gen/silence.jpg',
  leader: 'causerie/animatrice-d.png',
  final: 'maturite-gen/proactif.jpg',
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
const OUTRO_AT = 365.4;
export const TOOLBOXC_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 46.38, n: '1', title: 'Une formalité vide', s: 'une trace, pas de prévention', c: RED, g: 'formalité', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 70.02, n: '2', title: 'Les 5 erreurs fatales', s: 'pourquoi ça rate', c: ORANGE, g: '5 erreurs', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 121.62, n: '3', title: 'Du monologue au dialogue', s: 'une autre voie', c: GREEN, g: 'dialogue', k: 'loupe', lab: 'PARTIE 3 / 6'},
  {at: 181.62, n: '4', title: 'La méthode concrète', s: 'planifier & animer', c: BLUE, g: 'méthode', k: 'tube', lab: 'PARTIE 4 / 6'},
  {at: 259.14, n: '5', title: 'Le miroir de la culture', s: 'que cache le silence ?', c: VIO, g: 'silence', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 326.18, n: '6', title: 'L’intention du leader', s: 'la leçon fondamentale', c: GOLD, g: 'intention', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 357.9;
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

/* ═════════════ La ligne de métro (8 stations) ═════════════ */
const STATIONS = [
  {n: 1, l: 'Une feuille signée… et rien d’autre', s: 'feuille', at: 23.22},
  {n: 2, l: 'Cinq défauts fatals', s: '5 erreurs', at: 76.78},
  {n: 3, l: 'Du monologue au dialogue', s: 'dialogue', at: 134.5},
  {n: 4, l: 'Animée par le chef d’équipe', s: 'chef', at: 149.7},
  {n: 5, l: 'Un plan nourri de 3 sources', s: '3 sources', at: 207.5},
  {n: 6, l: '15 minutes chrono', s: '15 min', at: 231.58},
  {n: 7, l: 'Le silence révélateur', s: 'silence', at: 290.02},
  {n: 8, l: 'L’intention du leader', s: 'intention', at: 339.94},
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

/* ═════════════ Couverture : photo + « TOOLBOX MEETING HSE » en lettres-photos animées ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="equipe" w={1080} h={800} pos="50% 35%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 22%, ${PAPER}CC 30%, ${PAPER} 35%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={560} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: '#fff', background: ORANGE, padding: '8px 24px', borderRadius: 8}}>RÉUNION SÉCURITÉ TERRAIN</div></Abs>
      <Abs x={0} y={640} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="TOOLBOX" src={IMG.cTool} size={168} ls={0} /></Abs>
      <Abs x={0} y={815} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="MEETING" src={IMG.cMeet} size={168} ls={0} seed={2} /></Abs>
      <Abs x={0} y={990} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="HSE" src={IMG.cHse} size={250} ls={6} seed={4} /></Abs>
      <Abs x={0} y={1270} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: NAVY}}>formalité vide <span style={{color: RED}}>ou</span> outil vital ?</Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO : perte de temps ou outil vital ? ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const ph = t < 12.0 ? 0 : t < 26.3 ? 1 : 2;
  const tilt = t < 5.2 ? lerp(0, 12, prog(t, 2.2, 3.4, easeOut)) : t < 8.1 ? lerp(12, -12, prog(t, 5.2, 6.4, easeInOut)) : lerp(-12, 0, prog(t, 8.1, 9.0, easeInOut)) + Math.sin(t * 6) * 3;
  const pile = prog(t, 30.5, 33.0, easeOut);
  const lid = prog(t, 44.82, 45.6, easeOut);
  return (
    <Out end={46.38}>
      {ph === 0 && (
        <>
          <HiLine words={t < 8.1 ? ['Perte', 'de', 'temps', 'ou', 'outil', 'vital', '?'] : ['Qui', 'a', 'raison', '?']} mark={t < 8.1 ? [0, 2, 5] : [2]} at={t < 8.1 ? 2.8 : 8.14} y={330} size={t < 8.1 ? 50 : 70} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 468, top: 220, width: 24, height: 480, background: INK, borderRadius: 12}} />
            <div style={{position: 'absolute', left: 360, top: 690, width: 240, height: 40, background: INK, borderRadius: 12}} />
            <div style={{position: 'absolute', left: 100, top: 220, width: 760, height: 0, transform: `rotate(${tilt}deg)`}}>
              <div style={{position: 'absolute', left: 0, top: -10, width: 760, height: 20, background: INK, borderRadius: 10}} />
              {[{l: 'perte de temps', ic: 'sablier', c: RED, x: -70, a: 2.22}, {l: 'outil vital', ic: 'coeur', c: GREEN, x: 530, a: 5.22}].map((p) => <div key={p.l} style={{position: 'absolute', left: p.x, top: 10, width: 300, transform: `rotate(${-tilt}deg)`, transformOrigin: '50% 0', opacity: pop(t, p.a)}}><div style={{margin: '0 auto', width: 4, height: 40, background: INK}} /><div style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: '0 0 60px 60px', height: 240, boxShadow: `6px 6px 0 ${p.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><F n={p.ic} size={110} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>{p.l}</div></div></div>)}
            </div>
            {t > 8.14 && <div style={{position: 'absolute', left: 420, top: 40, width: 120, height: 120, borderRadius: 60, background: GOLD, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: INK, transform: `scale(${spring(t, 8.14)})`}}>?</div>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 20.2 ? ['Une', 'scène', 'familière'] : ['Le', 'même', 'rituel']} mark={t < 20.2 ? [1, 2] : [2]} at={t < 20.2 ? 12.1 : 20.9} y={330} size={66} />
          <Shot src={IMG.raffinerie} ic="usine" x={60} y={440} w={960} h={460} at={12.3} c={ORANGE} filter="sepia(0.9) contrast(1.1)">
            {t > 17.06 && <div style={{position: 'absolute', right: 24, bottom: 24, fontFamily: MONO, fontWeight: 700, fontSize: 46, color: '#FFB347', textShadow: '0 0 12px #FF7A00', transform: `scale(${spring(t, 17.06)})`}}>1989 · SITE PÉTROCHIMIQUE</div>}
          </Shot>
          <Abs x={60} y={930} w={960} h={440} style={{display: 'flex', gap: 14, alignItems: 'center'}}>
            {[{l: 'on parle sécurité', ic: 'haut-parleur', a: 21.98}, {l: 'on signe la feuille', ic: 'ecrit', a: 23.22}, {l: 'on retourne bosser', ic: 'outils', a: 24.74}].map((x, k) => <React.Fragment key={x.l}><div style={{flex: 1, height: 300, borderRadius: 24, background: '#fff', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${ORANGE}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, opacity: pop(t, x.a)}}><F n={x.ic} size={100} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, textAlign: 'center'}}>{x.l}</div></div>{k < 2 && <div style={{fontSize: 40, fontWeight: 900, color: ORANGE, opacity: pop(t, x.a + 0.5)}}>→</div>}</React.Fragment>)}
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 43.4 ? ['Du', 'papier,', 'zéro', 'prévention'] : ['Une', 'coquille', 'vide']} mark={t < 43.4 ? [1, 2] : [1, 2]} at={t < 43.4 ? 30.5 : 44.82} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 0, top: 0, width: 470, height: 600, borderRadius: 26, background: '#fff', border: `5px solid ${INK}`, overflow: 'hidden', opacity: pop(t, 26.6)}}>
              <div style={{position: 'absolute', left: 20, top: 16, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>trace papier</div>
              {Array.from({length: 12}, (_, k) => <div key={k} style={{position: 'absolute', left: 100 + (k % 2) * 10, top: 520 - k * 38 * pile, width: 260, height: 34, background: '#FFFDF6', border: `3px solid ${INK}`, borderRadius: 4, transform: `rotate(${(random(`pp${k}`) - 0.5) * 8}deg)`, opacity: pile > k / 12 ? 1 : 0}} />)}
            </div>
            <div style={{position: 'absolute', left: 490, top: 0, width: 470, height: 600, borderRadius: 26, background: '#fff', border: `5px solid ${INK}`, opacity: pop(t, 32.0)}}>
              <div style={{position: 'absolute', left: 20, top: 16, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>prévention</div>
              <div style={{position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 200, color: RED, lineHeight: 1}}>0</div>
              <div style={{position: 'absolute', left: 40, right: 40, top: 420, height: 30, borderRadius: 15, background: '#E3E8EF', border: `4px solid ${INK}`}} />
            </div>
            <div style={{position: 'absolute', left: 280, top: 640, width: 400, height: 260, opacity: pop(t, 43.4)}}>
              <div style={{position: 'absolute', left: 0, bottom: 0, width: 400, height: 180, background: '#C9A574', border: `6px solid ${INK}`, borderRadius: '0 0 20px 20px'}} />
              <div style={{position: 'absolute', left: -10, top: 60 - lid * 80, width: 420, height: 40, background: '#B48A55', border: `6px solid ${INK}`, borderRadius: 10, opacity: 1 - lid * 0.6}} />
              {lid > 0.5 && <div style={{position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 26, color: '#fff'}}>… vide</div>}
            </div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 1 · UNE FORMALITÉ VIDE ═════════════ */
const Formalite: React.FC = () => {
  const t = useT();
  const move = prog(t, 60.34, 61.6, easeInOut);
  return (
    <Out end={70.02}>
      <HiLine words={t < 57.8 ? ['La', 'case', 'est', 'cochée'] : ['Se', 'protéger', 'soi-même']} mark={t < 57.8 ? [1, 3] : [1, 2]} at={t < 57.8 ? 52.3 : 60.34} y={330} size={66} />
      <Abs x={60} y={440} w={960} h={380} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${RED}`, opacity: pop(t, 50.0), overflow: 'hidden'}}>
        <div style={{height: 60, background: NAVY, display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px'}}>{[RED, YEL, GREEN].map((c) => <div key={c} style={{width: 18, height: 18, borderRadius: 9, background: c}} />)}<span style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: '#fff', marginLeft: 12}}>SYSTÈME · registre des réunions</span></div>
        <div style={{display: 'flex', alignItems: 'center', gap: 20, padding: '40px 30px'}}><div style={{width: 110, height: 110, borderRadius: 18, border: `8px solid ${INK}`, background: t > 52.3 ? GREEN : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, color: '#fff', fontWeight: 900, transform: `scale(${t > 52.3 ? spring(t, 52.3) : 1})`}}>{t > 52.3 ? '✓' : ''}</div><div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>Toolbox du jour</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: GREEN, opacity: pop(t, 52.6)}}>RÉALISÉE · signée</div></div></div>
        <div style={{position: 'absolute', left: 30, right: 30, bottom: 26, height: 90, borderRadius: 14, background: NIGHT, opacity: pop(t, 55.06)}}><svg width={892} height={90}><path d={`M 0 45 L 892 45`} stroke="#34D399" strokeWidth={4} /></svg><div style={{position: 'absolute', left: 16, top: 8, fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF'}}>culture sécurité : rien ne se passe</div></div>
      </Abs>
      <Abs x={60} y={850} w={960} h={520} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 57.8)}}>
        <div style={{position: 'absolute', left: 60, top: 160}}><F n="equipe" size={200} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, textAlign: 'center'}}>les gens</div></div>
        <div style={{position: 'absolute', right: 60, top: 140}}><F n="batiment" size={220} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, textAlign: 'center'}}>l’entreprise</div></div>
        <div style={{position: 'absolute', left: lerp(110, 640, move), top: 40, transform: `rotate(${move * 360}deg)`}}><F n="bouclier" size={140} /></div>
        {t > 64.78 && <div style={{position: 'absolute', left: 220, top: 448, background: '#FFF6DA', border: `4px solid ${INK}`, borderRadius: '24px 24px 24px 4px', padding: '12px 20px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, transform: `scale(${spring(t, 64.78)})`}}>« Regardez, on a fait la réunion ! »</div>}
      </Abs>
      {t > 66.66 && <Stamp at={66.66} c={RED} text="trace ≠ prévention" x={250} y={1240} rot={-5} size={48} />}
    </Out>
  );
};

/* ═════════════ 2 · LES 5 ERREURS FATALES ═════════════ */
const ERR = [
  {n: 1, l: 'Sujets à côté de la plaque', s: 'déconnectés du travail de l’heure', ic: 'cible', a: 83.42},
  {n: 2, l: 'Le chef lit sa fiche', s: 'sans lever les yeux, sans interaction', ic: 'memo', a: 91.02},
  {n: 3, l: 'Tous les jours, coûte que coûte', s: 'ça devient du bruit de fond', ic: 'calendrier', a: 98.34},
  {n: 4, l: 'Objectif : la conformité', s: 'pas d’éviter un accident', ic: 'classeur', a: 104.62},
  {n: 5, l: 'Une question… jamais de réponse', s: 'ta voix ne compte pas', ic: 'question', a: 109.26},
];
const Erreurs: React.FC = () => {
  const t = useT();
  const cur = ERR.reduce((a, x, k) => (t >= x.a ? k : a), -1);
  const e = cur >= 0 ? ERR[cur] : null;
  const typing = cur === 4 && t > 113.7 && t < 117.06;
  return (
    <Out end={121.62}>
      <HiLine words={cur < 0 ? ['5', 'défauts', 'fatals'] : cur === 4 && t > 117.0 ? ['Jamais', '.'] : ['Erreur', `n°${cur + 1}`]} mark={cur < 0 ? [0, 2] : [0, 1]} at={cur < 0 ? 76.78 : cur === 4 && t > 117.0 ? 117.06 : ERR[cur].a} y={330} size={70} />
      <Abs x={60} y={440} w={960} h={170} style={{display: 'flex', justifyContent: 'center', gap: 18}}>
        {ERR.map((x, k) => <div key={x.n} style={{width: 160, height: 160, borderRadius: 26, background: k <= cur ? RED : '#fff', border: `5px solid ${INK}`, boxShadow: k === cur ? `0 0 30px ${RED}` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', opacity: pop(t, 74.0 + k * 0.2)}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: k <= cur ? '#fff' : INK}}>{x.n}</span>{k < cur && <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 150, color: '#fff', fontWeight: 900, opacity: 0.55}}>✕</div>}</div>)}
      </Abs>
      {e && (
        <Abs key={e.n} x={60} y={650} w={960} h={720} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 30, boxShadow: `10px 10px 0 ${RED}`, transform: `translateX(${(1 - prog(t, e.a, e.a + 0.45, easeOut)) * 1100}px) rotate(${(1 - prog(t, e.a, e.a + 0.45, easeOut)) * 8}deg)`, overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 40, top: 40, width: 140, height: 140, borderRadius: 30, background: RED, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 90, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{e.n}</div>
          <div style={{position: 'absolute', left: 210, top: 50, right: 40}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: INK, lineHeight: 1.05}}>{e.l}</div><div style={{marginTop: 12, fontFamily: MONO, fontWeight: 700, fontSize: 24, color: RED}}>{e.s}</div></div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 280, display: 'flex', justifyContent: 'center'}}><F n={e.ic} size={240} /></div>
          {cur === 4 && <div style={{position: 'absolute', left: 60, right: 60, bottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><div style={{background: BLUE, color: '#fff', borderRadius: '24px 24px 24px 4px', padding: '10px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, opacity: pop(t, 112.14)}}>une vraie bonne question ?</div><div style={{background: '#E3E8EF', borderRadius: 24, padding: '10px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: DIM, opacity: typing ? 1 : t > 117.06 ? 0.4 : 0}}>{typing ? '.'.repeat(1 + (Math.floor(t * 3) % 3)) : '∅'}</div></div>}
        </Abs>
      )}
      {cur < 0 && <Abs x={60} y={650} w={960} h={600} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 300, color: RED, transform: `scale(${t > 75.02 ? spring(t, 75.02) : 0})`}}>5</div></Abs>}
      {t > 120.74 && <Stamp at={120.74} c={INK} text="ça ne compte pas" x={280} y={1250} rot={-5} size={46} />}
    </Out>
  );
};

/* ═════════════ 3 · DU MONOLOGUE AU DIALOGUE ═════════════ */
const ROWS = [
  {k: 'communication', o: 'descendante', n: 'vrai dialogue', ao: 160.78, an: 168.42},
  {k: 'sujet', o: 'abstrait', n: 'travail du jour', ao: 162.02, an: 169.58},
  {k: 'mené par', o: 'service lointain', n: 'manager de proximité', ao: 163.14, an: 170.7},
  {k: 'trace', o: 'signature papier', n: 'trace dans les esprits', ao: 165.26, an: 174.82},
];
const Dialogue: React.FC = () => {
  const t = useT();
  const ph = t < 135.5 ? 0 : t < 157.0 ? 1 : 2;
  const two = prog(t, 133.8, 134.8, easeInOut);
  return (
    <Out end={181.62}>
      {ph === 0 && (
        <>
          <HiLine words={['Du', 'monologue', 'au', 'dialogue']} mark={[1, 3]} at={130.78} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={930} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 125.3)}}>
            <div style={{position: 'absolute', left: 380, top: 60}}><F n="superviseur" size={200} /></div>
            <div style={{position: 'absolute', left: 380, top: 600}}><F n="equipe" size={200} /></div>
            <div style={{position: 'absolute', left: lerp(470, 380, two), top: 290, width: 30, height: 280, background: BLUE, borderRadius: 15}} /><div style={{position: 'absolute', left: lerp(445, 355, two), top: 550, width: 0, height: 0, borderLeft: '40px solid transparent', borderRight: '40px solid transparent', borderTop: `50px solid ${BLUE}`}} />
            <div style={{position: 'absolute', left: 560, top: 290, width: 30, height: 280, background: GREEN, borderRadius: 15, opacity: two}} /><div style={{position: 'absolute', left: 535, top: 250, width: 0, height: 0, borderLeft: '40px solid transparent', borderRight: '40px solid transparent', borderBottom: `50px solid ${GREEN}`, opacity: two}} />
            <div style={{position: 'absolute', left: 30, top: 400}}><Pill at={131.0} c={two > 0.5 ? DIM : BLUE} size={28}>monologue</Pill></div>
            <div style={{position: 'absolute', right: 30, top: 400}}><Pill at={134.5} c={GREEN} size={28}>dialogue</Pill></div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Une', 'conversation']} mark={[1]} at={141.86} y={330} size={70} />
          <Shot src={IMG.dialogue} ic="equipe" x={60} y={440} w={960} h={400} at={135.7} c={GREEN} />
          <Abs x={60} y={870} w={960} h={500}>
            <div style={{position: 'absolute', left: 0, top: 0, display: 'flex', gap: 12, flexWrap: 'wrap', width: 600}}>
              <div style={{position: 'relative'}}><Pill at={140.02} c={DIM} size={28}>une présentation</Pill><div style={{position: 'absolute', left: 8, right: 8, top: '50%'}}><Strike p={prog(t, 140.6, 141.1)} c={RED} /></div></div>
              <Pill at={143.54} c={GREEN} size={28}>courte</Pill><Pill at={144.58} c={TEAL} size={28}>précise</Pill>
            </div>
            <div style={{position: 'absolute', left: 0, top: 130, width: 600, height: 360, borderRadius: 26, background: '#fff', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${GREEN}`, opacity: pop(t, 146.2), padding: 22, boxSizing: 'border-box'}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM}}>animée par</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK, opacity: pop(t, 149.7)}}>le chef d’équipe</div><div style={{marginTop: 30, fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM, opacity: pop(t, 152.8)}}>centrée sur</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: GREEN, opacity: pop(t, 154.06)}}>le boulot juste après. Là, maintenant.</div></div>
            <div style={{position: 'absolute', right: 0, top: 0, width: 340, height: 490, borderRadius: 26, overflow: 'hidden', background: `linear-gradient(180deg, #E6F7EE, #fff)`, border: `5px solid ${INK}`, opacity: pop(t, 147.3)}}><Img src={staticFile(IMG.chef)} style={{position: 'absolute', left: -40, bottom: 0, width: 420, height: 460, objectFit: 'cover', objectPosition: '50% 20%'}} /></div>
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 178.0 ? ['Vieux', 'modèle', 'vs', 'vrai', 'dialogue'] : ['En', 'pratique', '?']} mark={t < 178.0 ? [1, 4] : [1]} at={t < 178.0 ? 159.66 : 179.86} y={330} size={t < 178.0 ? 54 : 70} />
          <Abs x={60} y={440} w={960} h={930} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 157.1)}}>
            <div style={{display: 'flex', height: 110}}><div style={{width: 220}} /><div style={{flex: 1, background: RED, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 159.66)}}>vieux modèle</div><div style={{flex: 1, background: GREEN, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 167.78)}}>nouveau modèle</div></div>
            {ROWS.map((r) => <div key={r.k} style={{display: 'flex', height: 180, borderTop: `3px solid ${INK}`}}><div style={{width: 220, display: 'flex', alignItems: 'center', padding: '0 16px', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>{r.k}</div><div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: RED, textAlign: 'center', borderLeft: `3px solid ${INK}`, transform: `rotateX(${(1 - prog(t, r.ao, r.ao + 0.4)) * 90}deg)`, textDecoration: t > r.an ? 'line-through' : 'none', opacity: t > r.an ? 0.55 : 1}}>{r.o}</div><div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: GREEN, textAlign: 'center', borderLeft: `3px solid ${INK}`, background: t > r.an ? '#EAFBF1' : '#fff', transform: `rotateX(${(1 - prog(t, r.an, r.an + 0.4)) * 90}deg)`}}>{r.n}</div></div>)}
            {t > 179.86 && <div style={{position: 'absolute', right: 30, bottom: 30, width: 110, height: 110, borderRadius: 55, background: GOLD, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: INK, transform: `scale(${spring(t, 179.86)})`}}>?</div>}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 4 · LA MÉTHODE CONCRÈTE ═════════════ */
const SEGS = [{l: 'accroche', s: 'capter l’attention', a: 232.86, c: BLUE}, {l: 'cœur du sujet', s: '1 à 2 points', a: 236.26, c: TEAL}, {l: 'questions ouvertes', s: 'le plus important', a: 242.7, c: GREEN}, {l: 'message clé', s: 'une seule phrase', a: 246.58, c: GOLD}, {l: 'signalements', s: 'un truc dangereux vu ?', a: 251.62, c: RED}];
const Methode: React.FC = () => {
  const t = useT();
  const ph = t < 204.3 ? 0 : t < 227.6 ? 1 : 2;
  const merge = prog(t, 223.78, 225.4, easeInOut);
  const hand = prog(t, 232.86, 255.66);
  return (
    <Out end={259.14}>
      {ph === 0 && (
        <>
          <HiLine words={t < 195.2 ? ['Ça', 'ne', 's’improvise', 'pas'] : ['Un', 'programme', 'annuel']} mark={t < 195.2 ? [2] : [1, 2]} at={t < 195.2 ? 190.9 : 198.86} y={330} size={64} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center', gap: 20, opacity: 1 - prog(t, 195.0, 195.6)}}><div style={{position: 'relative', transform: `rotate(${t * 200}deg)`}}><F n="de" size={160} /></div><div style={{position: 'relative'}}><Pill at={192.74} c={DIM} size={30}>un sujet au hasard</Pill><div style={{position: 'absolute', left: 8, right: 8, top: '50%'}}><Strike p={prog(t, 194.0, 194.5)} c={RED} /></div></div></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 120, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, opacity: pop(t, 195.3)}}>
              {['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOÛ', 'SEP', 'OCT', 'NOV', 'DÉC'].map((m, k) => { const on = t > 198.9 + k * 0.35; return <div key={m} style={{height: 220, borderRadius: 20, background: '#fff', border: `4px solid ${INK}`, overflow: 'hidden'}}><div style={{height: 50, background: BLUE, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{m}</div>{[0, 1, 2].map((j) => <div key={j} style={{margin: '10px 12px 0', height: 30, borderRadius: 8, background: [RED, ORANGE, GREEN][(k + j) % 3], transform: `scaleX(${on ? 1 : 0})`, transformOrigin: '0 50%', opacity: 0.85}} />)}</div>; })}
            </div>
            {t > 202.22 && <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={202.22} c={BLUE} size={30}>du sens</Pill><Pill at={203.42} c={GREEN} size={30}>de la cohérence</Pill></div>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 223.7 ? ['3', 'sources'] : ['Un', 'programme', 'qui', 'parle']} mark={t < 223.7 ? [0, 1] : [1, 3]} at={t < 223.7 ? 207.5 : 223.78} y={330} size={70} />
          <SearchOpen x={60} y={440} w={960} h={930} at={204.4} query="sources du programme toolbox" results={['Modèle de fiche toolbox', 'Les 3 sources du programme annuel', 'Registre de présence']} found={1} foundAt={206.3} clickAt={206.6} c={BLUE}>
            <div style={{position: 'absolute', inset: 0}}>
              {[{l: 'gros risques des documents officiels', ic: 'classeur', a: 208.62, c: NAVY}, {l: 'accidents & presque-accidents vécus chez nous', ic: 'pansement', a: 212.86, c: RED}, {l: 'chantiers à venir, les plus dangereux', ic: 'grue', a: 218.98, c: ORANGE}].map((x, k) => <div key={x.l} style={{position: 'absolute', left: lerp(30 + k * 300, 330, merge), top: lerp(40, 360, merge), width: 280, height: 320, borderRadius: 24, background: '#fff', border: `5px solid ${x.c}`, boxShadow: `6px 6px 0 ${x.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 14, boxSizing: 'border-box', opacity: pop(t, x.a) * (1 - merge * 0.9), transform: `scale(${1 - merge * 0.4})`}}><div style={{width: 60, height: 60, borderRadius: 30, background: x.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 34, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{k + 1}</div><F n={x.ic} size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK, textAlign: 'center', lineHeight: 1.1}}>{x.l}</div></div>)}
              {merge > 0.6 && <div style={{position: 'absolute', left: 230, top: 420, width: 480, height: 200, borderRadius: 30, background: BLUE, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, transform: `scale(${spring(t, 224.6)})`}}><F n="calendrier" size={90} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff'}}>programme qui parle aux gens</span></div>}
            </div>
          </SearchOpen>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 255.6 ? ['15', 'minutes', 'chrono'] : ['Simple,', 'rythmé,', 'efficace']} mark={t < 255.6 ? [0, 2] : [0, 1, 2]} at={t < 255.6 ? 231.58 : 256.74} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 180, top: 40, width: 600, height: 600, borderRadius: '50%', border: `10px solid ${INK}`, background: `conic-gradient(${SEGS.map((x, k) => `${t > x.a ? x.c : '#E3E8EF'} ${k * 72}deg ${k * 72 + 72}deg`).join(', ')})`}} />
            <div style={{position: 'absolute', left: 330, top: 190, width: 300, height: 300, borderRadius: '50%', background: PAPER, border: `8px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 110, color: INK, lineHeight: 1}}>15</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: DIM}}>minutes</div></div>
            <div style={{position: 'absolute', left: 476, top: 70, width: 8, height: 270, background: RED, borderRadius: 4, transformOrigin: '50% 100%', transform: `rotate(${hand * 360}deg)`}} />
            {SEGS.map((x, k) => { const a = ((k * 72 + 36 - 90) * Math.PI) / 180; return <div key={x.l} style={{position: 'absolute', left: 480 + Math.cos(a) * 400 - 130, top: 340 + Math.sin(a) * 380 - 50, width: 260, textAlign: 'center', opacity: pop(t, x.a), transform: `scale(${t > x.a ? spring(t, x.a) : 0.5})`}}><div style={{background: x.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 26, borderRadius: 14, padding: '6px 10px', border: `4px solid ${INK}`}}>{k + 1}. {x.l}</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 17, color: INK, marginTop: 4}}>{x.s}</div></div>; })}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 5 · LE MIROIR & LE SILENCE ═════════════ */
const Silence: React.FC = () => {
  const t = useT();
  const ph = t < 285.9 ? 0 : t < 299.2 ? 1 : 2;
  const brk = prog(t, 324.62, 325.6, easeIn);
  return (
    <Out end={326.18}>
      {ph === 0 && (
        <>
          <HiLine words={t < 271.3 ? ['Un', 'miroir'] : ['Prendre', 'le', 'pouls']} mark={t < 271.3 ? [1] : [0, 2]} at={t < 271.3 ? 263.3 : 271.46} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={520}>
            <div style={{position: 'absolute', left: 120, top: 0, width: 720, height: 520, borderRadius: '360px 360px 30px 30px', border: '18px solid #C9A574', boxShadow: 'inset 0 0 60px rgba(255,255,255,0.6), 0 20px 40px rgba(0,0,0,0.25)', overflow: 'hidden', opacity: pop(t, 262.5)}}>
              <div style={{position: 'absolute', inset: 0, transform: 'scaleX(-1)'}}><Pic src={IMG.miroir} ic="equipe" w={684} h={484} /></div>
              <div style={{position: 'absolute', top: 0, bottom: 0, width: 140, left: lerp(-200, 800, ((t - 262.5) * 0.4) % 1), background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)', transform: 'skewX(-20deg)'}} />
            </div>
            {t > 264.54 && <div style={{position: 'absolute', left: 0, right: 0, bottom: -20, textAlign: 'center'}}><Pill at={264.54} c={VIO} size={30}>révélateur de la vraie culture</Pill></div>}
          </Abs>
          <Abs x={60} y={990} w={960} h={380} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 271.0)}}>
            <svg width={948} height={368}>{(() => { let d = ''; for (let x = 0; x <= 948; x += 6) { const ph2 = ((x / 948) * 6 + t * 0.8) % 1; const alive = t > 282.26 && t < 283.94; const y = 184 - (alive || t < 282.26 ? (ph2 > 0.45 && ph2 < 0.5 ? 120 : ph2 > 0.5 && ph2 < 0.55 ? -60 : 0) : 0); d += `${x === 0 ? 'M' : 'L'}${x},${y} `; } return <path d={d} fill="none" stroke={t > 283.94 ? RED : '#34D399'} strokeWidth={5} />; })()}</svg>
            <div style={{position: 'absolute', left: 20, top: 16, display: 'flex', gap: 12}}><div style={{position: 'relative'}}><Pill at={275.5} c={DIM} size={24}>statistiques</Pill><div style={{position: 'absolute', left: 8, right: 8, top: '50%'}}><Strike p={prog(t, 275.8, 276.3)} c={RED} /></div></div><Pill at={279.46} c={GREEN} size={24}>15 minutes sur place</Pill></div>
            {t > 283.94 && <div style={{position: 'absolute', right: 20, bottom: 16}}><Pill at={283.94} c={RED} size={24}>ou juste une ligne dans un rapport</Pill></div>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Le', 'silence']} mark={[1]} at={290.02} y={330} size={76} />
          <Shot src={IMG.silence} ic="pensif" x={60} y={440} w={960} h={420} at={286.2} c={VIO} filter="grayscale(0.6)" />
          <Abs x={60} y={890} w={960} h={480} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 287.0)}}>
            {[0, 1, 2, 3, 4, 5].map((k) => <div key={k} style={{position: 'absolute', left: 40 + k * 150, top: 220}}><F n={k % 2 ? 'ouvrier' : 'ouvrier-dark'} size={120} /><div style={{position: 'absolute', left: 20, top: -90, width: 100, height: 70, borderRadius: '30px 30px 30px 6px', background: '#E3E8EF', border: `3px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, color: DIM, opacity: pop(t, 291.3 + k * 0.1)}}>{t > 293.62 && t < 295.78 ? '✓' : '…'}</div></div>)}
            {t > 295.78 && <Stamp at={295.78} c={RED} text="tout le contraire" x={230} y={340} rot={-5} size={50} />}
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Ce', 'que', 'cache', 'le', 'silence']} mark={[2, 4]} at={299.3} y={330} size={58} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20}}>
              {[{l: 'la peur', s: '« si je parle, j’aurai des ennuis »', ic: 'anxieux', a: 302.82, c: RED}, {l: 'la futilité', s: '« rien ne change, à quoi bon ? »', ic: 'repeter', a: 305.06, c: ORANGE}, {l: 'le manque de pertinence', s: '« ça ne me concerne pas »', ic: 'haussement', a: 310.74, c: BLUE}, {l: 'le format', s: '« le chef parle, parle, parle »', ic: 'megaphone', a: 316.82, c: VIO}].map((x) => <div key={x.l} style={{height: 360, borderRadius: 26, background: '#fff', border: `5px solid ${INK}`, boxShadow: `7px 7px 0 ${x.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 16, transform: `rotateY(${(1 - prog(t, x.a, x.a + 0.5, easeOut)) * 90}deg)`}}><F n={x.ic} size={110} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: x.c, textAlign: 'center'}}>{x.l}</div><div style={{fontFamily: handFont, fontSize: 30, color: INK, textAlign: 'center'}}>{x.s}</div></div>)}
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 790, display: 'flex', justifyContent: 'center', gap: 6}}>{'SILENCE'.split('').map((ch, k) => <div key={k} style={{fontFamily: sansFont, fontWeight: 900, fontSize: 96, color: VIO, opacity: pop(t, 323.0) * (1 - brk), transform: `translate(${(random(`bx${k}`) - 0.5) * 900 * brk}px, ${(random(`by${k}`) - 0.2) * 700 * brk}px) rotate(${(random(`br${k}`) - 0.5) * 600 * brk}deg)`}}>{ch}</div>)}</div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 6 · L'INTENTION DU LEADER ═════════════ */
const Intention: React.FC = () => {
  const t = useT();
  const ph = t < 342.0 ? 0 : t < 351.7 ? 1 : 2;
  const day = prog(t, 357.94, 362.6, easeInOut);
  return (
    <Out end={OUTRO_AT}>
      {ph === 0 && (
        <>
          <HiLine words={t < 339.8 ? ['Ce', 'qui', 'fait', 'la', 'différence'] : ['L’intention', 'du', 'leader']} mark={t < 339.8 ? [4] : [0, 2]} at={t < 339.8 ? 330.02 : 339.94} y={330} size={t < 339.8 ? 58 : 66} />
          <Abs x={60} y={440} w={960} h={930}>
            {[{l: 'la technique parfaite', ic: 'boite-outils', a: 334.06}, {l: 'la plus belle fiche support', ic: 'memo', a: 336.26}, {l: 'le timing à la seconde', ic: 'chrono', a: 337.14}].map((x, k) => <div key={x.l} style={{position: 'relative', height: 140, marginBottom: 18, borderRadius: 22, background: '#fff', border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px', opacity: pop(t, x.a) * (t > 339.9 ? 0.45 : 1)}}><F n={x.ic} size={80} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK}}>{x.l}</span><div style={{position: 'absolute', left: 120, right: 30, top: '50%'}}><Strike p={prog(t, x.a + 0.6, x.a + 1.0)} c={RED} /></div></div>)}
            {t > 339.94 && <div style={{position: 'absolute', left: 230, top: 520, width: 500, height: 300, borderRadius: 40, background: `radial-gradient(circle at 35% 30%, #FFF3B0, ${GOLD})`, border: `6px solid ${INK}`, boxShadow: `0 0 50px ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, transform: `scale(${spring(t, 339.94)})`}}><F n="coeur" size={120} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: INK}}>l’intention</span></div>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 349.4 ? ['Obligé', 'ou', 'convaincu', '?'] : ['Sincérité', '&', 'authenticité']} mark={t < 349.4 ? [0, 2] : [0, 2]} at={t < 349.4 ? 343.0 : 349.54} y={330} size={60} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 0, top: 0, width: 470, height: 760, borderRadius: 28, background: '#F1F3F7', border: `6px solid ${INK}`, overflow: 'hidden', opacity: pop(t, 344.78), filter: 'grayscale(1)'}}><Img src={staticFile(IMG.leader)} style={{position: 'absolute', left: 0, bottom: 0, width: 458, height: 600, objectFit: 'cover', objectPosition: '50% 15%'}} /><div style={{position: 'absolute', left: 20, top: 20}}><Pill at={344.78} c={DIM} size={26}>« on l’a obligé »</Pill></div></div>
            <div style={{position: 'absolute', left: 490, top: 0, width: 470, height: 760, borderRadius: 28, background: '#FFF6DA', border: `6px solid ${INK}`, boxShadow: `0 0 40px ${GOLD}`, overflow: 'hidden', opacity: pop(t, 346.58)}}><Img src={staticFile(IMG.leader)} style={{position: 'absolute', left: 0, bottom: 0, width: 458, height: 600, objectFit: 'cover', objectPosition: '50% 15%'}} /><div style={{position: 'absolute', left: 20, top: 20}}><Pill at={346.58} c={GOLD} size={26}>« il y croit vraiment »</Pill></div></div>
            {t > 348.82 && <div style={{position: 'absolute', left: 0, right: 0, top: 800, display: 'flex', justifyContent: 'center'}}><Pill at={348.82} c={GREEN} size={34}>éviter un drame</Pill></div>}
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 361.2 ? ['Une', 'simplicité', 'désarmante'] : ['Rentrer', 'en', 'un', 'seul', 'morceau']} mark={t < 361.2 ? [1, 2] : [0, 4]} at={t < 361.2 ? 354.98 : 361.38} y={330} size={58} />
          <Abs x={60} y={440} w={960} h={930} style={{border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', background: `linear-gradient(180deg, ${day < 0.5 ? '#BFE3FF' : '#1B2A55'}, ${day < 0.5 ? '#FFF3D6' : '#F6A65A'})`, opacity: pop(t, 352.0)}}>
            <div style={{position: 'absolute', left: lerp(80, 760, day), top: 140 - Math.sin(day * Math.PI) * 80}}><F n={day < 0.5 ? 'soleil' : 'planete'} size={130} /></div>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 260, background: '#7FB069'}} />
            <div style={{position: 'absolute', left: 60, bottom: 200}}><F n="usine" size={220} /></div>
            <div style={{position: 'absolute', right: 60, bottom: 200}}><F n="maison" size={200} /></div>
            <div style={{position: 'absolute', left: lerp(240, 640, day), bottom: 190 + Math.abs(Math.sin(day * 30)) * 14}}><F n="ouvrier" size={130} /></div>
            <div style={{position: 'absolute', left: 30, top: 30}}><Pill at={359.46} c={NAVY} size={26}>venu travailler le matin</Pill></div>
            {t > 361.38 && <div style={{position: 'absolute', right: 30, top: 30, display: 'flex', alignItems: 'center', gap: 10, background: GREEN, borderRadius: 40, padding: '8px 22px', transform: `scale(${spring(t, 361.38)})`}}><span style={{fontSize: 34, color: '#fff', fontWeight: 900}}>✓</span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff'}}>rentré le soir, entier</span></div>}
            {t > 363.42 && <div style={{position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center'}}><Pill at={363.42} c={GOLD} size={36}>la seule chose qui compte</Pill></div>}
          </Abs>
          {t > 363.4 && <Dust n={24} c={GOLD} />}
        </>
      )}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const pops = (L: number[], v = 0.2): Sfx[] => L.map((a) => ({at: a, s: 'sfx/pop', v}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 1.5},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 0.8, s: 'validation', v: 0.18})), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.flatMap((r) => [{at: r.at - 1.2, s: 'soft-whoosh', v: 0.2, dur: 1.2}, {at: r.at, s: 'bass-hit', v: 0.33}, {at: r.at + 0.05, s: 'sfx/bell', v: 0.26}]),
  {at: 2.8, s: 'sfx/thud', v: 0.3}, {at: 5.2, s: 'sfx/swish', v: 0.3}, {at: 6.4, s: 'sfx/thud', v: 0.3}, {at: 8.14, s: 'sfx/ding', v: 0.3},
  {at: 12.3, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 17.06, s: 'deep-hit', v: 0.35}, ...pops([21.98, 24.74]), {at: 23.3, s: 'stylo', v: 0.4},
  ...rep(30.5, 12, 0.2, 'page', 0.12), {at: 33.06, s: 'deep-hit', v: 0.35}, {at: 44.82, s: 'sfx/swish', v: 0.3}, {at: 45.4, s: 'sfx/thud', v: 0.3},
  {at: 50.0, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 52.3, s: 'sfx/click', v: 0.5}, {at: 52.35, s: 'validation', v: 0.25}, {at: 55.06, s: 'tension', v: 0.08, dur: 2}, {at: 60.34, s: 'soft-whoosh', v: 0.4, dur: 1.3}, {at: 64.78, s: 'sfx/pop', v: 0.25}, {at: 66.66, s: 'tampon', v: 0.55},
  ...rep(74.0, 5, 0.2, 'sfx/pop', 0.16), {at: 75.02, s: 'bass-hit', v: 0.35}, ...ERR.flatMap((e) => [{at: e.a, s: 'sfx/whoosh', v: 0.3}, {at: e.a + 0.45, s: 'deep-hit', v: 0.35}, {at: e.a + 0.5, s: 'alarme', v: 0.04, dur: 0.5}]), ...rep(113.7, 10, 0.33, 'tick', 0.1), {at: 117.06, s: 'deep-hit', v: 0.4}, {at: 120.74, s: 'tampon', v: 0.55},
  {at: 131.0, s: 'sfx/pop', v: 0.2}, {at: 133.8, s: 'soft-whoosh', v: 0.4, dur: 1}, {at: 134.5, s: 'validation', v: 0.3},
  {at: 135.7, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 140.6, s: 'sfx/swish', v: 0.3}, ...pops([143.54, 144.58, 149.7, 154.06]),
  ...ROWS.flatMap((r) => [{at: r.ao, s: 'sfx/click', v: 0.3}, {at: r.an, s: 'sfx/ding', v: 0.22}]), {at: 179.86, s: 'sfx/pop', v: 0.25},
  {at: 190.9, s: 'sfx/swish', v: 0.25}, {at: 194.0, s: 'sfx/swish', v: 0.3}, ...rep(198.9, 12, 0.35, 'sfx/pop', 0.12), ...pops([202.22, 203.42]),
  ...searchCues(204.4, 28, 206.3, 206.6), ...[208.62, 212.86, 218.98].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), {at: 223.78, s: 'soft-whoosh', v: 0.45, dur: 1.6}, {at: 224.6, s: 'validation', v: 0.35},
  ...rep(231.6, 48, 0.5, 'tick', 0.08), ...SEGS.map((x) => ({at: x.a, s: 'sfx/ding', v: 0.25})), ...pops([256.74, 257.46, 258.2]),
  {at: 262.5, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 264.54, s: 'sfx/ding', v: 0.22}, ...rep(271.5, 12, 0.85, 'tick', 0.1), {at: 275.8, s: 'sfx/swish', v: 0.3}, {at: 283.94, s: 'deep-hit', v: 0.3},
  {at: 286.2, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 295.78, s: 'tampon', v: 0.55},
  ...[302.82, 305.06, 310.74, 316.82].map((a) => ({at: a, s: 'sfx/whoosh', v: 0.28})), {at: 324.62, s: 'deep-hit', v: 0.5}, {at: 324.65, s: 'sfx/swish', v: 0.4},
  ...[334.06, 336.26, 337.14].map((a) => ({at: a + 0.6, s: 'sfx/swish', v: 0.25})), {at: 339.94, s: 'bass-hit', v: 0.4},
  {at: 344.78, s: 'sfx/pop', v: 0.2}, {at: 346.58, s: 'sfx/ding', v: 0.25}, {at: 348.82, s: 'validation', v: 0.3},
  {at: 352.0, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 357.94, s: 'soft-whoosh', v: 0.25, dur: 4.6}, {at: 361.38, s: 'validation', v: 0.35}, {at: 363.42, s: 'bass-hit', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<TK, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
export const ToolboxCondense: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={46.45}><Intro /></Gate>
    <Gate from={49.6} to={70.1}><Formalite /></Gate>
    <Gate from={73.3} to={121.7}><Erreurs /></Gate>
    <Gate from={125.0} to={181.7}><Dialogue /></Gate>
    <Gate from={185.1} to={259.2}><Methode /></Gate>
    <Gate from={262.4} to={326.25}><Silence /></Gate>
    <Gate from={329.4} to={OUTRO_AT}><Intention /></Gate>
    {SECT.map((x, i) => { const C = TRANS[x.k]; return <Gate key={x.n} from={x.at} to={x.at + 3.7}><C i={i} /></Gate>; })}
    <Gate from={20} to={345}><StationBanner /></Gate>
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={365.3}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-toolbox-meeting-origine.m4a')} trimAfter={s(365.25)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Tile, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, spring, LoupeSweep, PneuDeliver, Shine, Count, BURG, YEL, handFont, Board, random, Strike, TEAL, PhotoLetter, Watermark, ORANGE];
