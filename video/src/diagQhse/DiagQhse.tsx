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
 * « Quel outil QHSE pour quel problème ? » (1 min 19) — capsule « outil d'aide à la décision » : un responsable QHSE
 * devant un ÉCRAN DE DIAGNOSTIC ; un problème apparaît, il le sélectionne, le bon outil se matérialise avec une courte
 * démonstration animée (5S, QQOQCCP, Ishikawa 5M, Pareto 80/20, AMDEC, SWOT, audit interne, PDCA). Message central :
 * problème identifié → outil adapté → action pertinente. Les 8 outils sont les stations d'une ligne de métro que la
 * rame dessert au rythme de la voix. Voix d'origine (sans musique), sous-titres calés mot à mot, photos générées
 * (ChatGPT) d'après prompts-images-diag-qhse.md. Fil rouge : tube pneumatique à six guichets adaptés (le guide →
 * organiser → causes & priorités → anticiper & stratégie → vérifier & améliorer → le bon outil) ; gyrophare à chaque
 * partie ; barre de recherche qui trouve puis OUVRE le guide de choix ; final : les outils gravitent autour du
 * responsable puis convergent vers l'écran UNIVERSNORMES QHSE avec invitation à commenter.
 */
const IMG = {
  cover: 'diag-gen/couverture.jpg',
  responsable: 'diag-gen/responsable.jpg',
  poste: 'diag-gen/poste.jpg',
  defaut: 'diag-gen/defaut.jpg',
  accidents: 'diag-gen/accidents.jpg',
  actions: 'diag-gen/actions.jpg',
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
const OUTRO_AT = 79.2;
export const DIAG_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 9.8, n: '1', title: 'Le guide de choix', s: 'un problème, une méthode', c: NAVY, g: 'le guide', k: 'gyro', lab: 'GUICHET 1 / 6'},
  {at: 16.5, n: '2', title: 'Organiser', s: '5S · QQOQCCP', c: BLUE, g: 'organiser', k: 'gyro', lab: 'GUICHET 2 / 6'},
  {at: 24.9, n: '3', title: 'Causes & priorités', s: 'Ishikawa · Pareto', c: ORANGE, g: 'causes', k: 'gyro', lab: 'GUICHET 3 / 6'},
  {at: 34.9, n: '4', title: 'Anticiper & stratégie', s: 'AMDEC · SWOT', c: VIO, g: 'anticiper', k: 'gyro', lab: 'GUICHET 4 / 6'},
  {at: 43.9, n: '5', title: 'Vérifier & améliorer', s: 'audit · PDCA', c: GREEN, g: 'vérifier', k: 'gyro', lab: 'GUICHET 5 / 6'},
  {at: 53.8, n: '6', title: 'Le bon outil', s: 'au bon moment', c: RED, g: 'le bon outil', k: 'gyro', lab: 'GUICHET 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 72.0;
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

type Pair = {p: string; pa: number; tool: string; short: string; ta: number; c: string; demo: string};
const PAIRS: Pair[] = [
  {p: 'organiser mon poste de travail', pa: 16.66, tool: '5S', short: '5S', ta: 18.98, c: BLUE, demo: '5s'},
  {p: 'analyser complètement une situation', pa: 20.06, tool: 'QQOQCCP', short: 'QQOQCCP', ta: 22.98, c: TEAL, demo: 'qq'},
  {p: 'identifier les causes d’un problème', pa: 25.06, tool: 'Ishikawa · 5M', short: 'Ishikawa', ta: 27.38, c: ORANGE, demo: 'fish'},
  {p: 'prioriser les actions à mener', pa: 29.9, tool: 'Pareto · 80/20', short: 'Pareto', ta: 32.26, c: RED, demo: 'pareto'},
  {p: 'anticiper les défaillances', pa: 34.98, tool: 'AMDEC', short: 'AMDEC', ta: 38.34, c: VIO, demo: 'amdec'},
  {p: 'analyser le contexte stratégique', pa: 39.5, tool: 'SWOT', short: 'SWOT', ta: 42.74, c: GOLD, demo: 'swot'},
  {p: 'vérifier l’efficacité du système', pa: 43.94, tool: 'Audit interne', short: 'Audit', ta: 47.14, c: NAVY, demo: 'audit'},
  {p: 'entrer dans l’amélioration continue', pa: 48.46, tool: 'Cycle PDCA', short: 'PDCA', ta: 51.94, c: GREEN, demo: 'pdca'},
];

/** Gyrophare express : balise + bandeau dans le haut de l'écran, sans masquer la console. */
const GyroMini: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const S0 = SECT[i];
  const k = t - S0.at;
  if (k < 0 || k > 1.7) return null;
  const inn = prog(t, S0.at, S0.at + 0.2) * (1 - prog(t, S0.at + 1.35, S0.at + 1.7));
  return (
    <Abs x={0} y={200} w={1080} h={250} style={{zIndex: 36, opacity: inn, overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, background: `conic-gradient(from ${k * 640}deg at 540px 60px, rgba(224,74,63,0.45) 0deg, transparent 30deg, transparent 180deg, rgba(31,111,209,0.45) 180deg, transparent 210deg)`, backgroundColor: PAPER}} />
      <div style={{position: 'absolute', left: 480, top: 20, width: 120, height: 76, borderRadius: '60px 60px 10px 10px', background: `radial-gradient(circle at 50% 40%, #fff, ${S0.c} 60%)`, border: `5px solid ${INK}`, boxShadow: `0 0 ${30 + 25 * Math.abs(Math.sin(k * 10))}px ${S0.c}`}} />
      <div style={{position: 'absolute', left: 80, right: 80, top: 120, height: 100, borderRadius: 20, background: '#fff', border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${S0.c}`, display: 'flex', alignItems: 'center', gap: 20, padding: '0 24px', transform: `translateX(${(1 - prog(t, S0.at + 0.1, S0.at + 0.5, easeOut)) * -1100}px)`}}>
        <div style={{width: 64, height: 64, borderRadius: 32, background: S0.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 38, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{S0.n}</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>{S0.title}</div>
        <div style={{marginLeft: 'auto', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: S0.c}}>{S0.s}</div>
      </div>
    </Abs>
  );
};

/** Démonstrations animées des outils (lt = secondes depuis l'apparition de l'outil). */
const Demo: React.FC<{d: string; lt: number; c: string}> = ({d, lt, c}) => {
  const t = useT();
  const p = (a: number, b: number) => prog(lt, a, b, easeOut);
  const W = 860, H = 300;
  if (d === '5s') {
    const q = p(0.2, 1.4);
    return <div style={{position: 'relative', width: W, height: H}}>{[0, 1, 2, 3, 4].map((k) => { const x0 = 80 + random(`x${k}`) * 600, y0 = 20 + random(`y${k}`) * 160, r0 = (random(`r${k}`) - 0.5) * 120; return <div key={k} style={{position: 'absolute', left: lerp(x0, 60 + k * 160, q), top: lerp(y0, 80, q), width: 130, height: 130, borderRadius: 20, background: q > 0.98 ? c : '#3A4356', border: '5px solid #fff', transform: `rotate(${lerp(r0, 0, q)}deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: '#fff'}}>S</div>; })}<div style={{position: 'absolute', left: 0, right: 0, bottom: 0, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 26, color: '#C9D2DF', opacity: p(1.4, 1.8)}}>du désordre… au poste organisé</div></div>;
  }
  if (d === 'qq') {
    return <div style={{width: W, height: H, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, perspective: 900}}>{'QQOQCCP'.split('').map((l, k) => { const f = p(0.1 + k * 0.12, 0.5 + k * 0.12); return <div key={k} style={{width: 100, height: 140, borderRadius: 16, background: f > 0.5 ? c : '#3A4356', border: '5px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: '#fff', transform: `rotateY(${(1 - f) * 180}deg)`}}>{f > 0.5 ? l : '?'}</div>; })}</div>;
  }
  if (d === 'fish') {
    const bones = [[200, -1], [380, -1], [560, -1], [290, 1], [470, 1]];
    return <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}><line x1={60} y1={150} x2={680} y2={150} stroke="#fff" strokeWidth={10} strokeDasharray={640} strokeDashoffset={640 * (1 - p(0.1, 0.7))} />{bones.map(([x, s0], k) => <line key={k} x1={x} y1={150} x2={x - 90} y2={150 + s0 * 120} stroke={c} strokeWidth={9} strokeLinecap="round" strokeDasharray={160} strokeDashoffset={160 * (1 - p(0.6 + k * 0.15, 1.0 + k * 0.15))} />)}<rect x={690} y={100} width={150} height={100} rx={18} fill={c} opacity={p(0.5, 0.9)} /><text x={765} y={162} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={34} fill="#fff" opacity={p(0.5, 0.9)}>EFFET</text><text x={330} y={290} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={40} fill={c} opacity={p(1.4, 1.8)}>5M</text></svg>;
  }
  if (d === 'pareto') {
    const v = [1, 0.62, 0.38, 0.22, 0.12, 0.07];
    let acc = 0; const tot = v.reduce((a, b) => a + b, 0);
    const pts = v.map((x, k) => { acc += x; return `${110 + k * 120},${270 - (acc / tot) * 240}`; }).join(' ');
    return <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>{v.map((x, k) => { const h = x * 230 * p(0.1 + k * 0.1, 0.6 + k * 0.1); return <rect key={k} x={60 + k * 120} y={270 - h} width={100} height={h} rx={10} fill={k < 2 ? c : '#5A6478'} />; })}<polyline points={pts} fill="none" stroke="#fff" strokeWidth={7} strokeDasharray={900} strokeDashoffset={900 * (1 - p(0.8, 1.6))} /><text x={800} y={70} textAnchor="end" fontFamily={sansFont} fontWeight={900} fontSize={56} fill={c} opacity={p(1.2, 1.6)}>80/20</text></svg>;
  }
  if (d === 'amdec') {
    return <div style={{width: W, height: H, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10, padding: '20px 60px', boxSizing: 'border-box'}}>{Array.from({length: 18}, (_, k) => { const hot = k === 9; const q = p(0.05 * k, 0.05 * k + 0.3); const g = random(`am${k}`); return <div key={k} style={{borderRadius: 10, background: hot ? RED : `rgba(${Math.round(80 + g * 160)},${Math.round(200 - g * 120)},90,0.85)`, opacity: q, transform: hot ? `scale(${1 + 0.12 * Math.abs(Math.sin(t * 6))})` : undefined, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff', boxShadow: hot ? `0 0 26px ${RED}` : 'none'}}>{hot ? '!' : ''}</div>; })}</div>;
  }
  if (d === 'swot') {
    return <div style={{width: W, height: H, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, padding: '0 150px', boxSizing: 'border-box'}}>{[['S', GREEN], ['W', ORANGE], ['O', BLUE], ['T', RED]].map(([l, cc], k) => <div key={l} style={{borderRadius: 18, background: cc, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: '#fff', opacity: p(0.1 + k * 0.2, 0.4 + k * 0.2), transform: `scale(${0.5 + 0.5 * p(0.1 + k * 0.2, 0.5 + k * 0.2)})`}}>{l}</div>)}</div>;
  }
  if (d === 'audit') {
    const lx = 200 + Math.sin(lt * 2.2) * 160;
    return <div style={{position: 'relative', width: W, height: H}}><div style={{position: 'absolute', left: 230, top: 10, width: 400, height: 280, borderRadius: 20, background: 'rgba(255,255,255,0.08)', border: `5px solid ${c === NAVY ? '#7CC4FF' : c}`}}>{[0, 1, 2, 3].map((k) => <div key={k} style={{position: 'absolute', left: 26, top: 30 + k * 60, display: 'flex', alignItems: 'center', gap: 16}}><div style={{width: 40, height: 40, borderRadius: 10, background: lt > 0.4 + k * 0.35 ? GREEN : '#3A4356', color: '#fff', fontWeight: 900, fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{lt > 0.4 + k * 0.35 ? '✓' : ''}</div><div style={{width: 260, height: 14, borderRadius: 7, background: 'rgba(255,255,255,0.4)'}} /></div>)}</div><div style={{position: 'absolute', left: lx + 200, top: 110 + Math.cos(lt * 1.7) * 60, width: 110, height: 110, borderRadius: 55, border: '10px solid #fff', boxShadow: '0 0 30px #7CC4FF'}} /></div>;
  }
  return <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}><line x1={160} y1={280} x2={720} y2={120} stroke="#5A6478" strokeWidth={10} /><g transform={`translate(${lerp(260, 560, p(0.2, 2.0))} ${lerp(232, 150, p(0.2, 2.0)) - 100}) rotate(${lt * 120})`}>{['P', 'D', 'C', 'A'].map((l, k) => <g key={l} transform={`rotate(${k * 90})`}><path d="M0 -90 A90 90 0 0 1 90 0 L0 0 Z" fill={[BLUE, GREEN, ORANGE, RED][k]} stroke="#fff" strokeWidth={5} /><text x={38} y={-30} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={36} fill="#fff" transform={`rotate(${-k * 90 - lt * 120} 38 -30)`}>{l}</text></g>)}</g></svg>;
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 200}}><Pic src={IMG.cover} ic="ordinateur" w={1080} h={740} pos="50% 30%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER} 9%, ${PAPER}00 16%, ${PAPER}00 34%, ${PAPER}DD 43%, ${PAPER} 48%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={920} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>GUIDE DE CHOIX RAPIDE</div>
        <div style={{marginTop: 16}}><Board text="QUEL OUTIL" at={-1} h={80} gap={2} c={BLUE} stag={0.02} /></div>
        <div style={{marginTop: 8}}><Board text="POUR QUEL PROBLÈME ?" at={-1} h={62} gap={2} c={RED} stag={0.02} /></div>
        <div style={{marginTop: 20, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10, padding: '0 60px'}}>{PAIRS.map((x) => <div key={x.short} style={{background: x.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 26, padding: '6px 16px', borderRadius: 30, border: `4px solid ${INK}`}}>{x.short}</div>)}</div>
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

/* ═════════════ SCÈNE 1 · LE PROBLÈME APPARAÎT ═════════════ */
const PROBS = [{l: 'poste désorganisé', src: 'poste', ic: 'boite-outils', a: 0.4}, {l: 'défaut technique', src: 'defaut', ic: 'engrenage', a: 1.5}, {l: 'accidents répétés', src: 'accidents', ic: 'ambulance', a: 2.6}, {l: 'actions trop nombreuses', src: 'actions', ic: 'memo', a: 3.7}];
const Intro: React.FC = () => {
  const t = useT();
  const freeze = prog(t, 5.2, 5.6);
  return (
    <Out end={9.8}>
      <HiLine words={['Quel', 'outil', 'pour', 'quel', 'problème', '?']} mark={[1, 4]} at={2.8} y={330} size={60} />
      <Abs x={60} y={440} w={960} h={600} style={{filter: freeze > 0 ? `grayscale(${freeze * 0.8})` : undefined}}>
        {PROBS.map((p, k) => { const on = t >= p.a; const cur = PROBS.filter((x) => t >= x.a).length - 1 === k; return on && <div key={p.l} style={{position: 'absolute', left: (k % 2) * 490, top: Math.floor(k / 2) * 305, width: 470, height: 290, borderRadius: 20, overflow: 'hidden', border: `6px solid ${cur && freeze < 1 ? RED : INK}`, transform: `scale(${0.8 + 0.2 * prog(t, p.a, p.a + 0.25, easeOut)}) rotate(${(k % 2 ? 1 : -1) * 1.5}deg)`, boxShadow: cur ? `0 0 30px ${RED}` : 'none'}}>
          <Pic src={(IMG as Record<string, string>)[p.src]} ic={p.ic} w={470} h={290} />
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, background: 'rgba(224,74,63,0.92)', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 10}}>⚠ {p.l}</div>
        </div>; })}
      </Abs>
      {freeze > 0 && <Abs x={140} y={620} w={800} h={240} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 26, boxShadow: `0 0 50px ${RED}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: freeze, transform: `scale(${0.8 + 0.2 * freeze})`}}>
        <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: '#FF8A7A', letterSpacing: 4}}>❚❚ ARRÊT SUR IMAGE</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 54, color: '#fff', textAlign: 'center', lineHeight: 1.05}}>le bon outil<br />au bon moment</div>
      </Abs>}
      <Abs x={60} y={1080} w={960} h={260} style={{display: 'flex', gap: 20}}>
        <div style={{flex: 1, borderRadius: 24, background: GREEN, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 38, opacity: pop(t, 7.62)}}><F n="check" size={80} />action efficace</div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 50, color: INK, alignSelf: 'center', opacity: pop(t, 8.2)}}>ou</div>
        <div style={{flex: 1, borderRadius: 24, background: '#fff', border: `5px dashed ${RED}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, color: RED, fontFamily: sansFont, fontWeight: 900, fontSize: 38, opacity: pop(t, 8.58)}}><F n="sablier" size={80} />perte de temps</div>
      </Abs>
    </Out>
  );
};

/* ═════════════ GUICHET 1 · LE GUIDE (recherche) ═════════════ */
const Guide: React.FC = () => {
  const t = useT();
  return (
    <Out end={16.5}>
      <HiLine words={['Une', 'méthode', 'adaptée']} mark={[1, 2]} at={11.6} y={330} size={62} />
      <SearchOpen x={60} y={440} w={960} h={900} at={12.2} query="guide de choix rapide QHSE" results={['Liste des normes', 'Guide de choix rapide', 'Glossaire QHSE']} found={1} foundAt={14.2} clickAt={14.5} c={NAVY}>
        <div style={{position: 'absolute', inset: 0, padding: '30px 40px', display: 'flex', flexDirection: 'column', gap: 12}}>
          {PAIRS.map((x, k) => <div key={x.short} style={{display: 'flex', alignItems: 'center', gap: 16, opacity: pop(t, 14.9 + k * 0.12), transform: `translateX(${(1 - pop(t, 14.9 + k * 0.12)) * 60}px)`}}><div style={{width: 40, height: 40, borderRadius: 20, background: x.c, border: '5px solid #fff', boxShadow: `0 0 0 3px ${INK}`}} /><span style={{flex: 1, fontFamily: sansFont, fontWeight: 700, fontSize: 26, color: DIM}}>je veux {x.p}</span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: x.c}}>→ {x.short}</span></div>)}
        </div>
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ GUICHETS 2 à 5 · L'ÉCRAN DE DIAGNOSTIC ═════════════ */
const Diag: React.FC = () => {
  const t = useT();
  const i = PAIRS.reduce((a, x, k) => (t >= x.pa - 0.3 ? k : a), 0);
  const P = PAIRS[i];
  const typed = Math.floor(prog(t, P.pa, P.pa + 1.0) * P.p.length);
  const sel = t >= P.pa + 1.2;
  const tool = t >= P.ta;
  const mat = prog(t, P.ta, P.ta + 0.6, easeOut);
  const reached = PAIRS.filter((x) => t >= x.ta).length;
  const tx = (k: number) => 70 + k * (820 / 7);
  const trainK = Math.max(0, reached - 1);
  const prevK = Math.max(0, reached - 2);
  const mv = reached === 0 ? 0 : prog(t, PAIRS[trainK].ta - 0.5, PAIRS[trainK].ta, easeInOut);
  const trainX = reached === 0 ? tx(0) - 60 : lerp(tx(prevK), tx(trainK), reached === 1 ? 1 : mv);
  return (
    <Out end={53.8}>
      {/* ligne de métro des 8 outils */}
      <Abs x={60} y={290} w={960} h={140} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `6px 6px 0 ${INK}`}}>
        <div style={{position: 'absolute', left: 60, right: 60, top: 46, height: 16, borderRadius: 8, background: `linear-gradient(90deg, ${PAIRS.map((x) => x.c).join(', ')})`}} />
        {PAIRS.map((x, k) => { const on = t >= x.ta; return <div key={x.short} style={{position: 'absolute', left: tx(k) - 20, top: 34, width: 40, height: 40, borderRadius: 20, background: on ? x.c : '#fff', border: `6px solid ${on ? '#fff' : x.c}`, boxSizing: 'border-box', boxShadow: on ? `0 0 0 3px ${x.c}, 0 0 16px ${x.c}` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, fontWeight: 900}}>{on ? '✓' : ''}</div>; })}
        {PAIRS.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: tx(k) - 60, width: 120, top: 84, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 17, color: k === i ? x.c : DIM}}>{x.short}</div>)}
        <Img src={staticFile('metroiso-gen/metro/rame-dessus.png')} style={{position: 'absolute', left: trainX - 55, top: 34, width: 110, height: 40, filter: 'drop-shadow(0 0 10px rgba(124,196,255,0.9))'}} />
      </Abs>
      {/* écran de diagnostic */}
      <Abs x={40} y={450} w={1000} h={930} style={{background: NIGHT, border: `8px solid ${INK}`, borderRadius: 34, boxShadow: `0 30px 60px rgba(0,0,0,0.35), 0 0 0 4px ${P.c}55`, overflow: 'hidden'}}>
        <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(124,196,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,196,255,0.06) 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 70, background: '#0B1220', display: 'flex', alignItems: 'center', gap: 14, padding: '0 26px', fontFamily: MONO, fontWeight: 700, fontSize: 24, color: '#9AA7BC'}}>
          <div style={{width: 16, height: 16, borderRadius: 8, background: sel ? GREEN : RED, boxShadow: `0 0 12px ${sel ? GREEN : RED}`}} />DIAGNOSTIC QHSE<span style={{marginLeft: 'auto', color: '#fff'}}>problème {i + 1}/8</span>
        </div>
        {/* étape 1 : problème */}
        <div style={{position: 'absolute', left: 30, right: 30, top: 100, height: 190, borderRadius: 20, background: sel ? 'rgba(124,196,255,0.14)' : 'rgba(224,74,63,0.14)', border: `4px solid ${sel ? '#7CC4FF' : RED}`, padding: '20px 26px', boxSizing: 'border-box'}}>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: sel ? '#7CC4FF' : '#FF8A7A', letterSpacing: 3}}>{sel ? '● PROBLÈME SÉLECTIONNÉ' : '⚠ PROBLÈME DÉTECTÉ'}</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: '#fff', marginTop: 12, lineHeight: 1.1}}>Je veux {P.p.slice(0, typed)}<span style={{opacity: Math.sin(t * 10) > 0 && typed < P.p.length ? 1 : 0}}>▍</span></div>
        </div>
        {/* curseur qui sélectionne */}
        {t > P.pa + 0.6 && t < P.ta + 0.3 && <svg width={60} height={70} viewBox="0 0 60 70" style={{position: 'absolute', left: lerp(880, 720, prog(t, P.pa + 0.6, P.pa + 1.1, easeInOut)), top: lerp(560, 220, prog(t, P.pa + 0.6, P.pa + 1.1, easeInOut)), transform: `scale(${t > P.pa + 1.15 && t < P.pa + 1.35 ? 0.85 : 1})`, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.6))'}}><path d="M4 2 L4 56 L18 43 L28 66 L38 61 L28 39 L48 39 Z" fill="#fff" stroke="#151A26" strokeWidth={4} strokeLinejoin="round" /></svg>}
        {/* étape 2 : l'outil se matérialise */}
        {tool && <div style={{position: 'absolute', left: 30, right: 30, top: 320, height: 470, borderRadius: 24, border: `5px solid ${P.c}`, background: `linear-gradient(180deg, ${P.c}33, rgba(255,255,255,0.02))`, boxShadow: `0 0 ${40 * mat}px ${P.c}`, clipPath: `inset(0 0 ${(1 - mat) * 100}% 0 round 24px)`, overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: `${mat * 100}%`, height: 6, background: '#fff', boxShadow: '0 0 20px #fff', opacity: mat < 1 ? 1 : 0}} />
          <div style={{position: 'absolute', left: 26, top: 18, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#C9D2DF', letterSpacing: 3}}>OUTIL ADAPTÉ</div>
          <div style={{position: 'absolute', left: 26, top: 50, fontFamily: sansFont, fontWeight: 900, fontSize: 76, color: '#fff', textShadow: `0 0 24px ${P.c}`}}>{P.tool}</div>
          <div style={{position: 'absolute', left: 40, top: 150}}><Demo d={P.demo} lt={t - P.ta} c={P.c} /></div>
        </div>}
        {/* chaîne problème → outil → action */}
        <div style={{position: 'absolute', left: 30, right: 30, bottom: 26, height: 90, display: 'flex', alignItems: 'center', gap: 12}}>
          {[{l: 'problème identifié', on: sel, c: '#7CC4FF'}, {l: 'outil adapté', on: tool, c: P.c}, {l: 'action pertinente', on: t >= P.ta + 1.0, c: GREEN}].map((s0, k) => <React.Fragment key={s0.l}>{k > 0 && <div style={{fontSize: 34, color: s0.on ? '#fff' : '#3A4356', fontWeight: 900}}>→</div>}<div style={{flex: 1, height: 70, borderRadius: 16, background: s0.on ? s0.c : 'rgba(255,255,255,0.06)', border: `3px solid ${s0.on ? '#fff' : '#3A4356'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: s0.on ? '#fff' : '#5A6478', textAlign: 'center'}}>{s0.l}</div></React.Fragment>)}
        </div>
      </Abs>
    </Out>
  );
};

/* ═════════════ GUICHET 6 · LE BON OUTIL ═════════════ */
const Fin: React.FC = () => {
  const t = useT();
  const conv = prog(t, 66.1, 68.2, easeInOut);
  const spot = t > 56.98 && t < 66.1 ? Math.floor((t - 56.98) * 1.6) % PAIRS.length : -1;
  const typedC = 'Mon outil préféré, c’est… parce que…';
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={t < 66.1 ? ['Le', 'bon', 'outil', 'au', 'bon', 'moment'] : ['Et', 'vous', '?']} mark={t < 66.1 ? [2, 5] : [1]} at={t < 66.1 ? 53.9 : 66.2} y={330} size={58} />
      <Abs x={0} y={420} w={1080} h={900}>
        <div style={{position: 'absolute', left: 540 - 220, top: 230, width: 440, height: 440, borderRadius: 220, overflow: 'hidden', border: `8px solid ${INK}`, boxShadow: `0 0 0 10px #fff, 0 0 60px ${BLUE}`, opacity: pop(t, 54.0) * (1 - conv * 0.85), transform: `scale(${1 - conv * 0.4})`}}><Pic src={IMG.responsable} ic="superviseur" w={440} h={440} pos="50% 25%" /></div>
        {PAIRS.map((x, k) => { const a = (k / PAIRS.length) * Math.PI * 2 + t * 0.35; const R = 380 * (1 - conv); const cx = 540 + Math.cos(a) * R, cy = 450 + Math.sin(a) * R * 0.95; const hi = spot === k; return <div key={x.short} style={{position: 'absolute', left: cx - 95, top: cy - 38, width: 190, height: 76, borderRadius: 38, background: x.c, border: `5px solid ${hi ? YEL : INK}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: x.short.length > 6 ? 24 : 30, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 54.9 + k * 0.12) * (1 - prog(t, 67.6, 68.3)), transform: `scale(${(hi ? 1.25 : 1) * (1 - conv * 0.6)})`, boxShadow: hi ? `0 0 30px ${YEL}` : 'none', zIndex: hi ? 3 : 1}}>{x.short}</div>; })}
        {t > 59.3 && t < 66.1 && <div style={{position: 'absolute', left: 90, right: 90, top: 880, textAlign: 'center', opacity: pop(t, 62.3)}}><Pill at={62.3} c={NAVY} size={30}>sélectionner la méthode la plus pertinente</Pill></div>}
        {conv > 0 && <div style={{position: 'absolute', left: 90, top: 120, width: 900, height: 640, borderRadius: 34, background: NIGHT, border: `8px solid ${INK}`, boxShadow: `0 0 ${60 * conv}px ${BLUE}`, opacity: prog(t, 67.4, 68.2), transform: `scale(${0.6 + 0.4 * prog(t, 67.4, 68.4, easeOut)})`, overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 40, display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 22, padding: '10px 26px'}}><Img src={staticFile(LOGO)} style={{height: 80, display: 'block'}} /></div></div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 170, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: '#fff', letterSpacing: 2}}>UNIVERSNORMES QHSE</div>
          <div style={{position: 'absolute', left: 50, right: 50, top: 270, borderRadius: 22, background: '#fff', padding: '18px 22px', display: 'flex', gap: 16, alignItems: 'flex-start', opacity: pop(t, 69.38)}}>
            <div style={{width: 64, height: 64, borderRadius: 32, background: BLUE, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30}}>?</div>
            <div style={{flex: 1}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM}}>Ajouter un commentaire…</div><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: INK, marginTop: 6}}>{typedC.slice(0, Math.floor(prog(t, 70.0, 72.8) * typedC.length))}<span style={{opacity: Math.sin(t * 10) > 0 ? 1 : 0}}>▍</span></div></div>
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 440, display: 'flex', justifyContent: 'center', gap: 20}}>
            <div style={{padding: '16px 34px', borderRadius: 40, background: GREEN, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 34, transform: `scale(${t > 71.86 ? 1 + 0.06 * Math.sin(t * 8) : pop(t, 71.86)})`, boxShadow: `0 0 30px ${GREEN}`}}>💬 Commenter</div>
            <div style={{padding: '16px 30px', borderRadius: 40, background: ORANGE, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, opacity: pop(t, 76.1), transform: `scale(${0.6 + 0.4 * pop(t, 76.1)})`}}>✉ laisse-moi un message</div>
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 24, color: '#9AA7BC', opacity: pop(t, 74.0)}}>apprendre à utiliser ces outils</div>
        </div>}
      </Abs>
      {t > ALLDONE && <Dust n={20} c={GOLD} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: at + 0.35 + len * 0.05, s: 'sfx/pop', v: 0.25}, ...rep(at + 0.8 + len * 0.05, 3, 0.12, 'sfx/pop', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, ...flaps(0.1, 14), {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap((x) => [{at: x.at, s: 'sfx/whoosh', v: 0.35}, ...rep(x.at + 0.05, 3, 0.15, 'sfx/ding', 0.1), {at: x.at + 0.8, s: 'validation', v: 0.15}]), {at: ALLDONE, s: 'validation', v: 0.3},
  ...PROBS.map((p) => ({at: p.a, s: 'alarme', v: 0.04, dur: 0.4})), ...PROBS.map((p) => ({at: p.a, s: 'sfx/thud', v: 0.3})), {at: 5.2, s: 'deep-hit', v: 0.45}, {at: 5.25, s: 'sfx/swish', v: 0.3}, {at: 7.62, s: 'validation', v: 0.25}, {at: 8.58, s: 'sfx/thud', v: 0.3},
  ...searchCues(12.2, 26, 14.2, 14.5), ...PAIRS.map((_, k) => ({at: 14.9 + k * 0.12, s: 'tick', v: 0.12})),
  ...PAIRS.flatMap((x) => [{at: x.pa, s: 'alarme', v: 0.04, dur: 0.3}, ...rep(x.pa, 10, 0.1, 'sfx/click', 0.06), {at: x.pa + 1.2, s: 'sfx/click', v: 0.5}, {at: x.ta - 0.5, s: 'soft-whoosh', v: 0.3, dur: 0.5}, {at: x.ta, s: 'sfx/rise', v: 0.25, dur: 0.6}, {at: x.ta + 0.1, s: 'bass-hit', v: 0.25}, {at: x.ta + 1.0, s: 'validation', v: 0.22}]),
  {at: 54.0, s: 'soft-whoosh', v: 0.35, dur: 1}, ...PAIRS.map((_, k) => ({at: 54.9 + k * 0.12, s: 'sfx/pop', v: 0.15})), ...rep(56.98, 14, 0.625, 'tick', 0.1), {at: 62.3, s: 'sfx/pop', v: 0.22},
  {at: 66.1, s: 'sfx/rise', v: 0.25, dur: 2}, {at: 68.0, s: 'bass-hit', v: 0.4}, {at: 69.38, s: 'sfx/pop', v: 0.22}, ...rep(70.0, 20, 0.14, 'sfx/click', 0.06), {at: 71.86, s: 'notification', v: 0.35}, {at: 76.1, s: 'sfx/ding', v: 0.25},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const DiagQhse: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={9.85}><Intro /></Gate>
    <Gate from={9.8} to={16.55}><Guide /></Gate>
    <Gate from={16.3} to={53.85}><Diag /></Gate>
    <Gate from={53.8} to={OUTRO_AT}><Fin /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 1.8}><GyroMini i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={78.6}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-diag-qhse-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Gyro, Kin, Brut, T, TitleBlock, Win, GLASS, Check, Tile, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, spring, Strike, LoupeSweep, PneuDeliver, Shine, Count, Shot, Stamp];
