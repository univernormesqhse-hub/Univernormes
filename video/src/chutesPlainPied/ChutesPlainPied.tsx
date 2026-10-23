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
 * « Les chutes de plain-pied au travail » (5 min 13) — capsule « condensé + effet wahou + ultra premium » présentée en
 * métro : 8 stations (2e cause → angle mort → invisible → réflexe → enquêteurs → escape game → box → transformation).
 * Voix d'origine (sans musique de fond), sous-titres calés mot à mot. Couverture : photo + « CHUTES DE PLAIN-PIED » en
 * lettres-photos animées. Fil rouge : tube pneumatique à six guichets calés sur les vraies parties (paradoxe → angle
 * mort → faire vivre → boîte à outils → sur mesure → transformation) ; gyrophare (transition principale), loupe et
 * capsule pneumatique plein écran ; store vénitien dans les scènes ; barre de recherche qui trouve où se cache le risque.
 */
const IMG = {
  cover: 'ishikawa-gen/couverture.jpg',
  cChutes: 'ishikawa-gen/flaque.jpg',
  cDe: 'ishikawa-gen/dos.jpg',
  cPlain: 'ishikawa-gen/matiere.jpg',
  flaque: 'ishikawa-gen/flaque.jpg',
  blessure: 'ishikawa-gen/blessure.jpg',
  enquete: 'ishikawa-gen/test-mental.jpg',
  escape: 'ishikawa-gen/faits.jpg',
  box: 'maturite-gen/proactif.jpg',
  final: 'ishikawa-gen/final.jpg',
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
const OUTRO_AT = 313.4;
export const CHUTES_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 27.78, n: '1', title: 'Le paradoxe', s: 'partout… et sous-estimé', c: RED, g: 'paradoxe', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 67.46, n: '2', title: 'L’angle mort', s: 'pourquoi on le sous-estime', c: ORANGE, g: 'angle mort', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 116.94, n: '3', title: 'Faire vivre la prévention', s: 'du passif au réflexe', c: GREEN, g: 'faire vivre', k: 'loupe', lab: 'PARTIE 3 / 6'},
  {at: 153.06, n: '4', title: 'La boîte à outils', s: '3 formats qui engagent', c: BLUE, g: 'outils', k: 'tube', lab: 'PARTIE 4 / 6'},
  {at: 236.94, n: '5', title: 'Sur mesure', s: 'pas de solution miracle', c: VIO, g: 'sur mesure', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 261.58, n: '6', title: 'Formation → transformation', s: 'une culture durable', c: GOLD, g: 'transformation', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 303.78;
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
  {n: 1, l: '2e cause d’accident du travail', s: '2e cause', at: 30.5},
  {n: 2, l: 'L’angle mort de la prévention', s: 'angle mort', at: 58.7},
  {n: 3, l: 'L’habitude rend le risque invisible', s: 'invisible', at: 99.06},
  {n: 4, l: 'De la conscience au réflexe', s: 'réflexe', at: 127.22},
  {n: 5, l: 'Mission prévention : des enquêteurs', s: 'enquêteurs', at: 164.3},
  {n: 6, l: 'L’escape game de la prévention', s: 'escape game', at: 181.02},
  {n: 7, l: 'La box prévention', s: 'box', at: 208.02},
  {n: 8, l: 'De la formation à la transformation', s: 'transfo', at: 271.3},
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

/** Petite silhouette qui marche… et glisse (rotation + chute) au temps « slip ». */
const Walker: React.FC<{x0: number; x1: number; y: number; a: number; b: number; slip?: number; size?: number; avoid?: boolean}> = ({x0, x1, y, a, b, slip, size = 120, avoid}) => {
  const t = useT();
  const lin = (x: number) => x;
  const p = prog(t, a, b, lin);
  const fall = slip !== undefined ? prog(t, slip, slip + 0.5, easeIn) : 0;
  const hop = avoid ? Math.sin(prog(t, (a + b) / 2 - 0.3, (a + b) / 2 + 0.3) * Math.PI) * 70 : 0;
  const px = slip !== undefined && t > slip ? lerp(x0, x1, prog(slip, a, b, lin)) + fall * 40 : lerp(x0, x1, p);
  return <div style={{position: 'absolute', left: px, top: y - Math.abs(Math.sin(p * 40)) * 10 * (1 - fall) - hop + fall * 40, transform: `rotate(${fall * -95}deg)`, transformOrigin: '50% 100%'}}><F n="ouvrier" size={size} /></div>;
};
const Puddle: React.FC<{x: number; y: number; w: number; o?: number}> = ({x, y, w, o = 1}) => {
  const t = useT();
  return <div style={{position: 'absolute', left: x, top: y, width: w, height: w * 0.28, borderRadius: '50%', background: 'radial-gradient(ellipse at 40% 40%, #CDEBFF, #4FA3E0 60%, #2D6FA8)', opacity: o, boxShadow: `0 0 0 ${4 + Math.sin(t * 3) * 2}px rgba(79,163,224,0.25)`}} />;
};

/* ═════════════ Couverture : photo + « CHUTES DE PLAIN-PIED » en lettres-photos animées ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="danger" w={1080} h={800} pos="50% 40%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 22%, ${PAPER}CC 30%, ${PAPER} 35%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={560} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: '#fff', background: RED, padding: '8px 24px', borderRadius: 8}}>RISQUE N°2 DES ACCIDENTS DU TRAVAIL</div></Abs>
      <Abs x={0} y={640} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="CHUTES" src={IMG.cChutes} size={220} ls={0} /></Abs>
      <Abs x={0} y={855} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="DE" src={IMG.cDe} size={120} ls={4} seed={2} /></Abs>
      <Abs x={0} y={970} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="PLAIN-PIED" src={IMG.cPlain} size={132} ls={0} seed={4} /></Abs>
      <Abs x={0} y={1140} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: NAVY, letterSpacing: -1}}>AU TRAVAIL</Abs>
      <Abs x={0} y={1235} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 38, color: INK}}>un risque banal… <span style={{color: RED}}>aux lourdes conséquences</span></Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const ph = t < 13.8 ? 0 : 1;
  const fade = prog(t, 25.42, 26.6, easeInOut);
  return (
    <Out end={27.78}>
      {ph === 0 && (
        <>
          <HiLine words={t < 6.4 ? ['Un', 'risque', 'qui', 'a', 'l’air', 'de', 'rien'] : ['Les', 'chutes', 'de', 'plain-pied']} mark={t < 6.4 ? [1, 6] : [1, 3]} at={t < 6.4 ? 3.06 : 6.54} y={330} size={t < 6.4 ? 54 : 62} />
          <Abs x={60} y={440} w={960} h={930} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 2.8)}}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 560, height: 370, background: 'repeating-linear-gradient(90deg, #E8E3D6 0 120px, #DDD6C6 120px 240px)'}} />
            <Puddle x={420} y={540} w={220} />
            <Walker x0={60} x1={780} y={430} a={3.2} b={12.0} slip={8.7} size={140} />
            <div style={{position: 'absolute', left: 30, top: 30, display: 'flex', flexDirection: 'column', gap: 12}}><Pill at={4.3} c={RED} size={30}>lourd de conséquences</Pill><Pill at={8.58} c={NAVY} size={30}>petits accidents du quotidien</Pill></div>
            {t > 9.2 && <div style={{position: 'absolute', left: 520, top: 300, fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: RED, transform: `scale(${spring(t, 9.2)}) rotate(-8deg)`}}>OUPS !</div>}
            {t > 12.26 && <div style={{position: 'absolute', right: 30, bottom: 30}}><Pill at={12.26} c={RED} size={30}>une réalité sérieuse</Pill></div>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 22.1 ? ['Ça', 'vous', 'dit', 'quelque', 'chose', '?'] : ['Partie', 'du', 'décor']} mark={t < 22.1 ? [4] : [2]} at={t < 22.1 ? 13.86 : 23.46} y={330} size={60} />
          <Abs x={60} y={440} w={960} h={930} style={{background: '#F6F1E6', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 13.9)}}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 520, background: 'linear-gradient(180deg, #EDE7DA, #E3DBCB)'}} />
            <div style={{position: 'absolute', left: 0, right: 0, top: 520, bottom: 0, background: 'repeating-linear-gradient(90deg, #D9CFBC 0 140px, #CFC4AE 140px 280px)'}} />
            <div style={{position: 'absolute', left: 640, top: 240, width: 160, height: 300, borderRadius: 18, background: '#5B6476', border: `5px solid ${INK}`}}><div style={{margin: '30px auto 0', width: 100, height: 70, borderRadius: 10, background: '#1E2638'}} /><div style={{position: 'absolute', bottom: 20, left: 50, width: 60, height: 40, borderRadius: 8, background: '#fff'}} /></div>
            <div style={{position: 'absolute', left: 660, top: 200, fontFamily: MONO, fontWeight: 700, fontSize: 20, color: INK}}>CAFÉ</div>
            {[{x: 80, y: 620, a: 14.98, l: 'câble qui traîne', el: <svg width={340} height={80}><path d="M 0 40 C 60 0, 100 80, 160 40 S 260 0, 340 50" fill="none" stroke="#111" strokeWidth={10} strokeLinecap="round" /></svg>}, {x: 560, y: 600, a: 16.18, l: 'flaque d’eau', el: <div style={{position: 'relative', width: 260, height: 80}}><Puddle x={0} y={0} w={260} /></div>}, {x: 240, y: 760, a: 17.94, l: 'carton dans le passage', el: <div style={{width: 200, height: 150, background: '#C9A574', border: `5px solid ${INK}`, borderRadius: 8}} />}].map((h) => <div key={h.l} style={{position: 'absolute', left: h.x, top: h.y, opacity: pop(t, h.a) * lerp(1, 0.35, fade), filter: `grayscale(${fade})`}}>{h.el}<div style={{position: 'absolute', left: -20, top: -30, right: -20, bottom: -30, border: `6px solid ${RED}`, borderRadius: 30, opacity: (1 - fade) * (0.6 + 0.4 * Math.sin(t * 8)), boxShadow: `0 0 20px ${RED}`}} /><div style={{position: 'absolute', left: 0, top: -80, whiteSpace: 'nowrap'}}><Pill at={h.a} c={RED} size={24}>{h.l}</Pill></div></div>)}
            {t > 25.42 && <div style={{position: 'absolute', left: 30, top: 30}}><Pill at={25.42} c={DIM} size={28}>on ne les voit même plus</Pill></div>}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 1 · LE PARADOXE ═════════════ */
const Paradoxe: React.FC = () => {
  const t = useT();
  const ph = t < 43.0 ? 0 : t < 56.6 ? 1 : 2;
  return (
    <Out end={67.46}>
      {ph === 0 && (
        <>
          <HiLine words={t < 34.2 ? ['2e', 'cause', 'd’accident'] : ['Le', 'paradoxe']} mark={t < 34.2 ? [0, 1] : [1]} at={t < 34.2 ? 31.82 : 34.26} y={330} size={68} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 420, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 10}}>
              {[{r: 2, h: 260, c: RED, l: 'chutes de plain-pied'}, {r: 1, h: 340, c: '#C9D2DF', l: ''}, {r: 3, h: 200, c: '#C9D2DF', l: ''}].map((p) => <div key={p.r} style={{width: 260, height: p.h * prog(t, 31.4, 32.4, easeOut), background: p.c, border: `5px solid ${INK}`, borderRadius: '16px 16px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 16, position: 'relative'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: p.r === 2 ? '#fff' : INK, lineHeight: 1}}>{p.r === 2 ? '2e' : ''}</div>{p.l && <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: '#fff', textAlign: 'center'}}>{p.l}</div>}</div>)}
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM, opacity: pop(t, 33.1)}}>cause d’accident du travail en France</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 520, height: 400, borderRadius: 28, background: '#fff', border: `5px solid ${INK}`, padding: 28, boxSizing: 'border-box', opacity: pop(t, 34.8)}}>
              {[{l: 'présence du risque', s: 'partout, tout le temps', v: prog(t, 36.1, 37.2, easeOut), c: RED, a: 36.14}, {l: 'perception du risque', s: 'massivement sous-estimé', v: 0.15 * prog(t, 38.8, 39.6, easeOut), c: GREEN, a: 38.86}].map((b) => <div key={b.l} style={{marginBottom: 40, opacity: pop(t, b.a)}}><div style={{display: 'flex', justifyContent: 'space-between', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK}}><span>{b.l}</span><span style={{fontFamily: MONO, fontSize: 20, color: b.c}}>{b.s}</span></div><div style={{marginTop: 10, height: 60, borderRadius: 30, background: '#E3E8EF', border: `4px solid ${INK}`, overflow: 'hidden'}}><div style={{width: `${b.v * 100}%`, height: '100%', background: b.c}} /></div></div>)}
              {t > 39.86 && <div style={{textAlign: 'center'}}><Pill at={39.86} c={GOLD} size={30}>le contraste au cœur du sujet</Pill></div>}
            </div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 53.0 ? ['Un', 'simple', 'faux', 'pas'] : ['Un', 'impact', 'très', 'lourd']} mark={t < 53.0 ? [2, 3] : [1, 3]} at={t < 53.0 ? 46.3 : 55.38} y={330} size={66} />
          <Shot src={IMG.blessure} ic="pansement" x={60} y={440} w={960} h={420} at={43.3} c={RED} />
          <Abs x={60} y={890} w={960} h={480} style={{display: 'flex', alignItems: 'center', gap: 10}}>
            {[{l: 'faux pas', ic: 'pas', a: 46.3}, {l: 'entorse', ic: 'pansement', a: 48.86}, {l: 'fracture', ic: 'pansement2', a: 49.46}, {l: 'semaines, mois d’arrêt', ic: 'calendrier', a: 51.1}].map((x, k) => <React.Fragment key={x.l}><div style={{flex: 1, height: 260, borderRadius: 22, background: k === 3 ? RED : '#fff', border: `5px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: pop(t, x.a), transform: `translateY(${(1 - pop(t, x.a)) * 60}px)`}}><F n={x.ic} size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: k === 3 ? '#fff' : INK, textAlign: 'center', padding: '0 6px'}}>{x.l}</div></div>{k < 3 && <div style={{fontSize: 34, fontWeight: 900, color: RED, opacity: pop(t, x.a + 0.4)}}>→</div>}</React.Fragment>)}
          </Abs>
          {t > 51.82 && Array.from({length: 8}, (_, k) => <div key={k} style={{position: 'absolute', left: 700 + (random(`cal${k}`) - 0.5) * 300, top: 1150 - ((t - 51.82) * 400 + k * 60) % 500, opacity: 0.8, transform: `rotate(${k * 37 + t * 60}deg)`, zIndex: 5}}><div style={{width: 50, height: 56, background: '#fff', border: `3px solid ${INK}`, borderTop: `12px solid ${RED}`}} /></div>)}
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['L’angle', 'mort']} mark={[0, 1]} at={58.7} y={330} size={76} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 130, top: 60, width: 700, height: 460, borderRadius: '50% / 45%', background: 'linear-gradient(135deg, #DDE7F1, #9FB3CC)', border: `16px solid ${INK}`, overflow: 'hidden', opacity: pop(t, 57.0)}}>
              <div style={{position: 'absolute', inset: 0, background: 'repeating-linear-gradient(90deg, #E8E3D6 0 90px, #DDD6C6 90px 180px)', opacity: 0.6}} />
              <div style={{position: 'absolute', left: 120, top: 250}}><F n="ouvrier" size={140} /></div>
              <div style={{position: 'absolute', right: 0, top: 0, bottom: 0, width: 300, background: `linear-gradient(90deg, transparent, ${NIGHT}EE 30%)`, opacity: prog(t, 58.7, 59.6)}} />
              <div style={{position: 'absolute', right: 70, top: 300, opacity: 0.25 + 0.2 * Math.sin(t * 4)}}><Puddle x={0} y={0} w={170} /></div>
              <div style={{position: 'absolute', right: 90, top: 200, fontFamily: MONO, fontWeight: 700, fontSize: 24, color: '#fff', opacity: prog(t, 59.6, 60.2)}}>ANGLE MORT</div>
            </div>
            <div style={{position: 'absolute', left: 455, top: 520, width: 50, height: 160, background: INK, borderRadius: 10}} />
            <div style={{position: 'absolute', left: 0, right: 0, top: 720, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={61.3} c={RED} size={28}>si fréquent</Pill><Pill at={63.9} c={RED} size={28}>si sérieux</Pill></div>
            {t > 65.38 && <div style={{position: 'absolute', left: 0, right: 0, top: 820, textAlign: 'center'}}><Pill at={65.38} c={NAVY} size={32}>… et pourtant on passe à côté ?</Pill></div>}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 2 · POURQUOI ON LE SOUS-ESTIME ═════════════ */
const AngleMort: React.FC = () => {
  const t = useT();
  const ph = t < 78.9 ? 0 : t < 101.0 ? 1 : 2;
  const ghost = prog(t, 99.06, 100.4, easeInOut);
  const gap = prog(t, 103.78, 105.2, easeOut);
  const fall = prog(t, 113.9, 114.8, easeIn);
  return (
    <Out end={116.94}>
      {ph === 0 && (
        <>
          <HiLine words={['Pourquoi', 'sous-estimé', '?']} mark={[0, 1]} at={70.9} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            {[{l: 'incendie', ic: 'feu', s: 1.0}, {l: 'explosion', ic: 'bombe', s: 0.95}, {l: 'électrocution', ic: 'eclair', s: 0.9}, {l: 'chute de plain-pied', ic: 'pas', s: 0.55}].map((x, k) => { const drop = k === 3 ? prog(t, 75.0, 76.2, easeInOut) : 0; return <div key={x.l} style={{position: 'absolute', left: 0, right: 0, top: k * 200 + drop * 40, height: 170, borderRadius: 24, background: k === 3 ? '#F4F6FA' : '#fff', border: `5px solid ${k === 3 ? '#9FB3CC' : INK}`, display: 'flex', alignItems: 'center', gap: 18, padding: '0 24px', opacity: pop(t, 71.6 + k * 0.4), transform: `scale(${x.s + (k < 3 ? 0.03 * Math.sin(t * 4 + k) : 0)})`, transformOrigin: '0 50%'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: k === 3 ? '#9FB3CC' : RED, width: 70}}>{k + 1}</div><F n={x.ic} size={k === 3 ? 70 : 110} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: k === 3 ? 30 : 40, color: k === 3 ? DIM : INK}}>{x.l}</span>{k === 3 && t > 75.66 && <span style={{marginLeft: 'auto', fontFamily: MONO, fontWeight: 700, fontSize: 20, color: ORANGE}}>pas une « priorité »</span>}</div>; })}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 97.7 ? ['Il', 'se', 'cache', 'partout'] : ['Le', 'risque', 'invisible']} mark={t < 97.7 ? [2, 3] : [2]} at={t < 97.7 ? 80.1 : 99.06} y={330} size={66} />
          <SearchOpen x={60} y={440} w={960} h={930} at={79.1} query="où se cache le risque de chute ?" results={['Fiche réflexe incendie', 'Les détails qui cachent le risque de chute', 'Registre des EPI']} found={1} foundAt={81.0} clickAt={81.3} c={ORANGE}>
            <div style={{position: 'absolute', inset: 0, padding: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18}}>
              {[{l: 'le bazar', ic: 'colis', a: 82.9}, {l: 'matériel mal rangé', ic: 'outils', a: 83.94}, {l: 'signalisation absente', ic: 'danger', a: 85.22}, {l: 'culture de l’urgence', ic: 'chrono', a: 87.7}, {l: 'le téléphone en marchant', ic: 'telephone', a: 92.26}, {l: '« on a toujours fait comme ça »', ic: 'repeter', a: 96.1}].map((x) => <div key={x.l} style={{borderRadius: 22, background: '#fff', border: `5px solid ${ORANGE}`, boxShadow: `6px 6px 0 ${ORANGE}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 10, opacity: pop(t, x.a) * lerp(1, 0.12, ghost), transform: `scale(${t > x.a ? spring(t, x.a) : 0.6})`, filter: `blur(${ghost * 3}px)`}}><F n={x.ic} size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, textAlign: 'center'}}>{x.l}</div></div>)}
            </div>
          </SearchOpen>
          {t > 99.06 && <div style={{position: 'absolute', left: 0, right: 0, top: 860, textAlign: 'center', zIndex: 6}}><Pill at={99.06} c={NAVY} size={36}>l’habitude rend le risque invisible</Pill></div>}
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 112.0 ? ['Connaître', '≠', 'prendre', 'au', 'sérieux'] : ['Jusqu’au', 'jour', 'où…']} mark={t < 112.0 ? [0, 2, 4] : [1]} at={t < 112.0 ? 105.34 : 113.78} y={330} size={t < 112.0 ? 52 : 70} />
          <Abs x={60} y={440} w={960} h={930} style={{background: 'linear-gradient(180deg, #DFF0FF, #fff)', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 101.3)}}>
            <div style={{position: 'absolute', left: 0, top: 520, width: 480 - gap * 160, height: 420, background: '#8C7A5B', borderTop: `10px solid #5E8C3A`}} />
            <div style={{position: 'absolute', right: 0, top: 520, width: 480 - gap * 160, height: 420, background: '#8C7A5B', borderTop: `10px solid #5E8C3A`}} />
            <div style={{position: 'absolute', left: 40, top: 360}}><Pill at={106.5} c={BLUE} size={28}>je connais le risque</Pill></div>
            <div style={{position: 'absolute', right: 40, top: 360}}><Pill at={107.82} c={GREEN} size={28}>je le prends au sérieux</Pill></div>
            {gap > 0.5 && <div style={{position: 'absolute', left: 0, right: 0, top: 600, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 26, color: '#fff'}}>FOSSÉ</div>}
            <div style={{position: 'absolute', left: lerp(140, 360, prog(t, 109.0, 113.7)), top: 400 + fall * 600, transform: `rotate(${fall * -120}deg)`}}><F n="ouvrier" size={120} /></div>
            {t > 112.1 && <div style={{position: 'absolute', left: 30, top: 30}}><Pill at={112.1} c={DIM} size={28}>« ça n’arrive qu’aux autres »</Pill></div>}
            {t > 114.4 && <AbsoluteFill style={{background: RED, opacity: 0.35 * (1 - prog(t, 114.4, 115.4))}} />}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 3 · FAIRE VIVRE LA PRÉVENTION ═════════════ */
const FaireVivre: React.FC = () => {
  const t = useT();
  const ph = t < 129.0 ? 0 : t < 142.4 ? 1 : 2;
  const on = prog(t, 126.0, 127.3, easeInOut);
  const peel = prog(t, 137.9, 139.4, easeInOut);
  const open = prog(t, 147.6, 148.8, easeOut);
  return (
    <Out end={153.06}>
      {ph === 0 && (
        <>
          <HiLine words={['Du', 'passif', 'au', 'réflexe']} mark={[1, 3]} at={124.26} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930} style={{background: on > 0.5 ? NIGHT : '#fff', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 120.6)}}>
            <div style={{position: 'absolute', left: 330, top: 120, width: 300, height: 300, borderRadius: 150, background: on > 0.5 ? `radial-gradient(circle, ${YEL}, ${YEL}00 70%)` : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div style={{filter: on > 0.5 ? 'none' : 'grayscale(1) opacity(0.5)'}}><F n={on > 0.5 ? 'eclair' : 'ampoule'} size={220} /></div></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 500, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: on > 0.5 ? YEL : DIM}}>{on > 0.5 ? 'PRÉVENTION ACTIVE' : 'conscience passive'}</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 620, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={120.26} c={GREEN} size={30}>vitesse supérieure</Pill>{on > 0.5 && <Pill at={127.22} c={GOLD} size={30}>un réflexe</Pill>}</div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Faire', 'vivre', 'la', 'prévention']} mark={[0, 1]} at={131.78} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={930} style={{background: '#EDE7DA', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 129.2)}}>
            <div style={{position: 'absolute', left: 240, top: 150, width: 480, height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30}}>
              {[{l: 'geste', ic: 'main-levee', a: 140.14}, {l: 'réflexe', ic: 'eclair', a: 140.98}].map((x) => <div key={x.l} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: pop(t, x.a), transform: `scale(${t > x.a ? spring(t, x.a) : 0.5})`}}><F n={x.ic} size={130} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: GREEN}}>{x.l}</div></div>)}
            </div>
            <div style={{position: 'absolute', left: 240, top: 100, width: 480, height: 600, background: '#fff', border: `6px solid ${INK}`, boxShadow: '0 20px 40px rgba(0,0,0,0.2)', transformOrigin: '0 0', transform: `perspective(1200px) rotateX(${peel * 75}deg) rotate(${peel * 8}deg)`, opacity: (1 - peel) * pop(t, 137.0), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16}}>
              <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: RED}}>ATTENTION</div><F n="danger" size={160} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK, textAlign: 'center'}}>risque de chute<br />de plain-pied</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: DIM}}>(affiche au mur)</div>
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 760, textAlign: 'center'}}><Pill at={138.9} c={NAVY} size={30}>la théorie devient terrain</Pill></div>
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Une', 'boîte', 'à', 'outils']} mark={[1, 3]} at={146.38} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center'}}><div style={{position: 'relative'}}><Pill at={143.62} c={DIM} size={32}>une simple formation théorique</Pill><div style={{position: 'absolute', left: 10, right: 10, top: '50%'}}><Strike p={prog(t, 145.4, 145.9)} c={RED} /></div></div></div>
            <div style={{position: 'absolute', left: 180, top: 520, width: 600, height: 280, background: RED, border: `8px solid ${INK}`, borderRadius: '20px 20px 30px 30px'}} />
            <div style={{position: 'absolute', left: 170, top: 470 - open * 60, width: 620, height: 70, background: '#C0392B', border: `8px solid ${INK}`, borderRadius: 18, transform: `rotate(${-open * 12}deg)`, transformOrigin: '0 100%'}} />
            {[{l: 'mission prévention', ic: 'loupe', c: BLUE}, {l: 'escape game', ic: 'cadenas', c: VIO}, {l: 'box prévention', ic: 'de', c: GOLD}].map((x, k) => <div key={x.l} style={{position: 'absolute', left: 200 + k * 200, top: lerp(560, 200 + (k === 1 ? -40 : 0), open), width: 180, height: 220, borderRadius: 20, background: '#fff', border: `5px solid ${x.c}`, boxShadow: `5px 5px 0 ${x.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, opacity: open, transform: `rotate(${(k - 1) * 8 * open}deg)`}}><F n={x.ic} size={80} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 20, color: INK, textAlign: 'center'}}>{x.l}</div></div>)}
            {t > 147.62 && <div style={{position: 'absolute', left: 0, right: 0, top: 830, textAlign: 'center'}}><Pill at={147.62} c={GREEN} size={32}>pour engager les gens</Pill></div>}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 4 · LA BOÎTE À OUTILS ═════════════ */
const Outils: React.FC = () => {
  const t = useT();
  const ph = t < 178.9 ? 0 : t < 206.5 ? 1 : 2;
  const code = t < 199.1 ? [Math.floor(t * 7) % 10, Math.floor(t * 9 + 3) % 10, Math.floor(t * 11 + 5) % 10] : [0, 4, 2];
  const unlock = prog(t, 199.1, 199.8, easeOut);
  const step = [221.22, 224.18, 225.7, 228.78].reduce((a, x, k) => (t >= x ? k : a), -1);
  return (
    <Out end={236.94}>
      {ph === 0 && (
        <>
          <HiLine words={t < 164.2 ? ['Mission', 'prévention'] : ['Des', 'enquêteurs']} mark={t < 164.2 ? [0, 1] : [1]} at={t < 164.2 ? 156.8 : 164.3} y={330} size={70} />
          <Shot src={IMG.enquete} ic="detective" x={60} y={440} w={960} h={360} at={156.8} c={BLUE} />
          <Abs x={60} y={830} w={960} h={540} style={{background: '#C9A574', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 157.4), backgroundImage: 'radial-gradient(#B48A55 2px, transparent 2px)', backgroundSize: '22px 22px'}}>
            <svg width={948} height={528} style={{position: 'absolute', left: 0, top: 0}}>{[[474, 190, 160, 400], [474, 190, 474, 420], [474, 190, 790, 400]].map(([a, b, c, d], k) => <line key={k} x1={a} y1={b} x2={lerp(a, c, prog(t, [171.1, 172.38, 173.26][k], [171.1, 172.38, 173.26][k] + 0.5))} y2={lerp(b, d, prog(t, [171.1, 172.38, 173.26][k], [171.1, 172.38, 173.26][k] + 0.5))} stroke={RED} strokeWidth={6} />)}</svg>
            <div style={{position: 'absolute', left: 344, top: 60, width: 260, height: 190, background: '#fff', border: `4px solid ${INK}`, transform: 'rotate(-3deg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 166.62)}}><div style={{position: 'absolute', top: -14, left: 118, width: 24, height: 24, borderRadius: 12, background: RED}} /><F n="pas" size={70} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK}}>cas d’accident</div></div>
            {[{l: 'organisation', ic: 'engrenage', a: 171.1, x: 60}, {l: 'circulation', ic: 'route', a: 172.38, x: 374}, {l: 'distractions', ic: 'telephone', a: 173.26, x: 690}].map((x) => <div key={x.l} style={{position: 'absolute', left: x.x, top: 340, width: 200, height: 160, background: '#FFF6DA', border: `4px solid ${INK}`, transform: `rotate(${(x.x % 7) - 3}deg) scale(${t > x.a ? spring(t, x.a) : 0})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><F n={x.ic} size={60} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: INK}}>{x.l}</div></div>)}
            {t > 176.18 && <div style={{position: 'absolute', left: 20, top: 20}}><Pill at={176.18} c={BLUE} size={24}>remettre en question les habitudes</Pill></div>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 194.9 ? ['L’escape', 'game'] : ['S’entraider', 'pour', 'résoudre']} mark={t < 194.9 ? [0, 1] : [0]} at={t < 194.9 ? 181.02 : 194.98} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 179.2)}}>
            <div style={{position: 'absolute', left: 280, top: 80, width: 400, height: 420}}>
              <div style={{position: 'absolute', left: 80, top: -unlock * 70, width: 240, height: 220, borderRadius: '120px 120px 0 0', border: `34px solid #C9D2DF`, borderBottom: 'none', boxSizing: 'border-box', transform: `rotate(${unlock * -20}deg)`, transformOrigin: '100% 100%'}} />
              <div style={{position: 'absolute', left: 0, top: 180, width: 400, height: 260, borderRadius: 30, background: unlock > 0.5 ? GREEN : GOLD, border: `8px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14}}>{code.map((d, k) => <div key={k} style={{width: 90, height: 120, borderRadius: 14, background: '#fff', border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 70, color: INK}}>{d}</div>)}</div>
            </div>
            <div style={{position: 'absolute', left: 30, top: 30, display: 'flex', gap: 12}}><Pill at={185.7} c={VIO} size={26}>mécanique du jeu</Pill><Pill at={189.62} c={TEAL} size={26}>ludique & collaboratif</Pill></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 580, display: 'flex', justifyContent: 'center', gap: 30}}>{['ouvrier', 'salariee', 'ouvrier-dark', 'formatrice'].map((ic, k) => <div key={ic} style={{transform: `translateY(${Math.sin(t * 4 + k) * 8}px)`, opacity: pop(t, 194.98 + k * 0.12)}}><F n={ic} size={110} /></div>)}</div>
            {t > 197.38 && <div style={{position: 'absolute', left: 0, right: 0, top: 740, display: 'flex', justifyContent: 'center', gap: 12}}>{['énigme 1', 'énigme 2', 'énigme 3'].map((l, k) => <div key={l} style={{background: t > 197.6 + k * 0.5 ? GREEN : '#2C3650', color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 22, padding: '8px 14px', borderRadius: 10}}>{l} {t > 197.6 + k * 0.5 ? '✓' : '?'}</div>)}</div>}
            {t > 202.14 && <div style={{position: 'absolute', left: 0, right: 0, top: 820, display: 'flex', justifyContent: 'center', gap: 12}}><Pill at={202.14} c={GOLD} size={26}>journée sécurité</Pill><Pill at={204.9} c={BLUE} size={26}>adaptable</Pill></div>}
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 217.6 ? ['La', 'box', 'prévention'] : ['Faire', 'bouger', 'les', 'lignes']} mark={t < 217.6 ? [1, 2] : [1, 3]} at={t < 217.6 ? 208.02 : 232.86} y={330} size={66} />
          <Shot src={IMG.box} ic="equipe" x={60} y={440} w={960} h={330} at={206.8} c={GOLD} />
          <Abs x={60} y={800} w={960} h={570} style={{background: '#2E7D4F', border: `8px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 207.0)}}>
            <div style={{position: 'absolute', left: 20, top: 16, fontFamily: MONO, fontWeight: 700, fontSize: 20, color: '#D5FFE5'}}>JEU DE PLATEAU · CLÉ EN MAIN</div>
            {[{l: 'les chiffres', ic: 'graphique', c: BLUE}, {l: 'facteurs de risque', ic: 'danger', c: ORANGE}, {l: 'conséquences', ic: 'pansement', c: RED}, {l: 'solutions concrètes', ic: 'check', c: GREEN}].map((x, k) => <div key={x.l} style={{position: 'absolute', left: 30 + k * 228, top: 160, width: 200, height: 220, borderRadius: 18, background: step >= k ? '#fff' : '#FFFFFF55', border: `5px solid ${step >= k ? x.c : '#ffffff88'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: step === k ? `0 0 26px ${YEL}` : 'none'}}><F n={x.ic} size={70} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: INK, textAlign: 'center', padding: '0 6px'}}>{x.l}</div></div>)}
            <div style={{position: 'absolute', left: 30 + Math.max(0, step) * 228 + 70, top: step < 0 ? 420 : 100 - Math.abs(Math.sin(t * 6)) * 14, width: 60, height: 60, borderRadius: '50% 50% 10px 10px', background: RED, border: `5px solid ${INK}`, opacity: pop(t, 213.0)}} />
            <div style={{position: 'absolute', left: 40, top: 420, transform: `rotate(${t < 212 ? t * 400 : 20}deg)`, opacity: pop(t, 210.94)}}><F n="de" size={90} /></div>
            <div style={{position: 'absolute', right: 30, top: 440, display: 'flex', gap: 12}}><Pill at={214.02} c={GOLD} size={24}>lancer la discussion</Pill><Pill at={216.1} c={TEAL} size={24}>partage d’expérience</Pill></div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 5 · SUR MESURE ═════════════ */
const SurMesure: React.FC = () => {
  const t = useT();
  const tape = prog(t, 255.4, 257.0, easeInOut);
  return (
    <Out end={261.58}>
      <HiLine words={t < 249.4 ? ['La', 'clé', ':', 'l’adaptabilité'] : t < 255.3 ? ['Pas', 'de', 'solution', 'miracle'] : ['Sur', 'mesure']} mark={t < 249.4 ? [3] : t < 255.3 ? [2, 3] : [0, 1]} at={t < 249.4 ? 245.9 : t < 255.3 ? 249.54 : 255.5} y={330} size={62} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap'}}><Pill at={240.54} c={VIO} size={28}>scénarios face à l’imprévu</Pill><Pill at={242.7} c={TEAL} size={28}>parcours immersifs</Pill></div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 140, display: 'flex', justifyContent: 'center', gap: 20, alignItems: 'center', opacity: pop(t, 250.66)}}>
          {['Ctrl + C', 'Ctrl + V'].map((k) => <div key={k} style={{position: 'relative', width: 260, height: 120, borderRadius: 18, background: '#fff', border: `6px solid ${INK}`, boxShadow: `0 10px 0 ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 40, color: INK}}>{k}<div style={{position: 'absolute', left: 10, right: 10, top: '50%'}}><Strike p={prog(t, 251.6, 252.2)} c={RED} /></div></div>)}
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 330, height: 560, borderRadius: 28, background: '#fff', border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${VIO}`, overflow: 'hidden', opacity: pop(t, 252.9)}}>
          <div style={{position: 'absolute', left: 340, top: 70}}><F n="equipe" size={260} /></div>
          <div style={{position: 'absolute', left: 30, top: 360, width: 888 * tape, height: 70, background: YEL, border: `4px solid ${INK}`, borderRadius: 8, overflow: 'hidden', backgroundImage: `repeating-linear-gradient(90deg, ${INK} 0 3px, transparent 3px 40px)`}} />
          <div style={{position: 'absolute', left: 30, right: 30, top: 460, display: 'flex', justifyContent: 'space-between'}}>{[{l: 'réalité du terrain', a: 256.26}, {l: 'risques spécifiques', a: 258.22}, {l: 'objectifs de l’équipe', a: 259.46}].map((x) => <Pill key={x.l} at={x.a} c={VIO} size={24}>{x.l}</Pill>)}</div>
        </div>
      </Abs>
    </Out>
  );
};

/* ═════════════ 6 · DE LA FORMATION À LA TRANSFORMATION ═════════════ */
const Transfo: React.FC = () => {
  const t = useT();
  const ph = t < 272.9 ? 0 : t < 289.9 ? 1 : 2;
  const morph = prog(t, 271.3, 272.4, easeInOut);
  const drop = prog(t, 300.5, 302.9, easeInOut);
  return (
    <Out end={OUTRO_AT}>
      {ph === 0 && (
        <>
          <HiLine words={['Une', 'culture', 'durable']} mark={[1, 2]} at={267.5} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 80, display: 'flex', justifyContent: 'center', gap: 16}}><div style={{position: 'relative'}}><Pill at={265.74} c={DIM} size={30}>formation ponctuelle</Pill><div style={{position: 'absolute', left: 10, right: 10, top: '50%'}}><Strike p={prog(t, 266.5, 267.0)} c={RED} /></div></div></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 300, display: 'flex', justifyContent: 'center', alignItems: 'baseline', fontFamily: sansFont, fontWeight: 900, fontSize: 78, color: NAVY, opacity: pop(t, 269.86)}}><span style={{display: 'inline-block', maxWidth: `${morph * 280}px`, overflow: 'hidden', color: GOLD, whiteSpace: 'nowrap'}}>TRANS</span><span>FORMATION</span></div>
            {t > 272.4 && <div style={{position: 'absolute', left: 0, right: 0, top: 460, display: 'flex', justifyContent: 'center'}}><F n="pousse" size={200} /></div>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['3', 'grandes', 'étapes']} mark={[0, 2]} at={273.7} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930}>
            {[{n: 1, l: 'voir & comprendre', s: 'les risques du quotidien', ic: 'yeux', a: 276.94, c: BLUE}, {n: 2, l: 'engager les équipes', s: 'outils participatifs', ic: 'equipe', a: 279.9, c: GREEN}, {n: 3, l: 'ancrer', s: 'de vrais réflexes', ic: 'cerveau', a: 286.5, c: GOLD}].map((x, k) => <div key={x.n} style={{position: 'absolute', left: k * 320, top: 600 - k * 220, width: 320, height: 330 + k * 220, background: t > x.a ? x.c : '#E3E8EF', border: `6px solid ${INK}`, borderRadius: '24px 24px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 24, gap: 8, transform: `scaleY(${pop(t, 274.0 + k * 0.2)})`, transformOrigin: '50% 100%'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: '#fff', lineHeight: 1}}>{x.n}</div><div style={{opacity: pop(t, x.a), display: 'flex', flexDirection: 'column', alignItems: 'center'}}><F n={x.ic} size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff', textAlign: 'center'}}>{x.l}</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#fff'}}>{x.s}</div></div></div>)}
            <div style={{position: 'absolute', left: lerp(110, 750, prog(t, 276.9, 287.5, easeInOut)), top: lerp(500, 60, prog(t, 276.9, 287.5, easeInOut))}}><F n="ouvrier" size={100} /></div>
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 303.6 ? ['Pas', 'une', 'fatalité'] : ['Le', 'prochain', 'faux', 'pas', '?']} mark={t < 303.6 ? [2] : [1, 3]} at={t < 303.6 ? 294.06 : 308.74} y={330} size={66} />
          <Shot src={IMG.final} ic="equipe" x={60} y={440} w={960} h={380} at={290.1} c={GOLD} blinds />
          <Abs x={60} y={850} w={960} h={520} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 290.6)}}>
            {t < 303.6 ? <>
              <div style={{position: 'absolute', left: 30, top: 24, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>risque de chute</div>
              <svg width={948} height={508} style={{position: 'absolute', left: 0, top: 0}}><path d="M 60 120 C 300 120, 420 140, 520 260 S 760 440, 890 450" fill="none" stroke={GREEN} strokeWidth={14} strokeLinecap="round" strokeDasharray={1100} strokeDashoffset={1100 * (1 - drop)} /><path d="M 60 120 L 890 120" stroke="#E3E8EF" strokeWidth={6} strokeDasharray="12 10" /></svg>
              <div style={{position: 'absolute', left: 30, bottom: 30, display: 'flex', gap: 12}}><Pill at={296.14} c={BLUE} size={26}>bons outils</Pill><Pill at={298.38} c={GREEN} size={26}>équipes impliquées</Pill><Pill at={302.9} c={GOLD} size={26}>recul durable</Pill></div>
            </> : <>
              <div style={{position: 'absolute', left: 0, right: 0, top: 360, height: 160, background: 'repeating-linear-gradient(90deg, #E8E3D6 0 120px, #DDD6C6 120px 240px)'}} />
              <Puddle x={420} y={360} w={200} />
              <Walker x0={60} x1={800} y={250} a={308.8} b={312.6} avoid size={120} />
              {t > 311.78 && <div style={{position: 'absolute', right: 30, top: 30, display: 'flex', alignItems: 'center', gap: 10, background: GREEN, borderRadius: 40, padding: '8px 22px', transform: `scale(${spring(t, 311.78)})`}}><span style={{fontSize: 34, color: '#fff', fontWeight: 900}}>✓</span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>faux pas évité</span></div>}
            </>}
          </Abs>
          {t > 311.8 && <Dust n={24} c={GOLD} />}
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
  ...rep(3.2, 12, 0.55, 'tick', 0.08), {at: 8.7, s: 'sfx/swish', v: 0.35}, {at: 9.1, s: 'deep-hit', v: 0.5}, ...pops([4.3, 8.58, 12.26]),
  ...[14.98, 16.18, 17.94].flatMap((a) => [{at: a, s: 'sfx/pop', v: 0.25}, {at: a + 0.05, s: 'alarme', v: 0.04, dur: 0.4}]), {at: 25.42, s: 'soft-whoosh', v: 0.3, dur: 1.2},
  {at: 31.4, s: 'sfx/rise', v: 0.25, dur: 1}, {at: 32.4, s: 'bass-hit', v: 0.35}, {at: 36.14, s: 'sfx/rise', v: 0.2, dur: 1}, {at: 38.86, s: 'sfx/thud', v: 0.3}, {at: 39.86, s: 'sfx/ding', v: 0.22},
  {at: 43.3, s: 'soft-whoosh', v: 0.3, dur: 1}, ...[46.3, 48.86, 49.46, 51.1].map((a) => ({at: a, s: 'sfx/thud', v: 0.32})), ...rep(51.9, 8, 0.12, 'page', 0.12), {at: 55.38, s: 'deep-hit', v: 0.4},
  {at: 57.0, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 58.7, s: 'tension', v: 0.1, dur: 3}, ...pops([61.3, 63.9, 65.38]),
  ...[71.6, 72.0, 72.4, 72.8].map((a) => ({at: a, s: 'sfx/thud', v: 0.25})), {at: 75.0, s: 'sfx/swish', v: 0.3},
  ...searchCues(79.1, 32, 81.0, 81.3), ...pops([82.9, 83.94, 85.22, 87.7, 92.26, 96.1], 0.18), {at: 99.06, s: 'soft-whoosh', v: 0.35, dur: 1.4},
  {at: 103.78, s: 'deep-hit', v: 0.35}, {at: 104.0, s: 'soft-whoosh', v: 0.3, dur: 1.2}, ...pops([106.5, 107.82, 112.1]), {at: 113.9, s: 'sfx/swish', v: 0.4}, {at: 114.4, s: 'deep-hit', v: 0.5},
  {at: 120.26, s: 'sfx/pop', v: 0.2}, {at: 126.0, s: 'sfx/click', v: 0.5}, {at: 126.3, s: 'sfx/rise', v: 0.3, dur: 1}, {at: 127.22, s: 'sfx/ding', v: 0.25},
  {at: 137.0, s: 'page', v: 0.3}, {at: 137.9, s: 'soft-whoosh', v: 0.4, dur: 1.5}, ...pops([140.14, 140.98]),
  {at: 145.4, s: 'sfx/swish', v: 0.3}, {at: 147.6, s: 'sfx/rise', v: 0.3, dur: 1.2}, {at: 148.6, s: 'validation', v: 0.3},
  {at: 156.8, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 166.62, s: 'sfx/thud', v: 0.3}, ...[171.1, 172.38, 173.26].map((a) => ({at: a, s: 'stylo', v: 0.3})), {at: 176.18, s: 'sfx/ding', v: 0.22},
  ...rep(179.4, 40, 0.5, 'tick', 0.08), ...pops([185.7, 189.62]), ...rep(195.0, 4, 0.12, 'sfx/pop', 0.15), ...[197.6, 198.1, 198.6].map((a) => ({at: a, s: 'sfx/ding', v: 0.2})), {at: 199.1, s: 'cadenas', v: 0.5}, {at: 199.3, s: 'validation', v: 0.3}, ...pops([202.14, 204.9]),
  {at: 206.8, s: 'soft-whoosh', v: 0.3, dur: 1}, ...rep(210.94, 8, 0.12, 'sfx/click', 0.2), {at: 212.0, s: 'sfx/thud', v: 0.3}, ...[221.22, 224.18, 225.7, 228.78].map((a) => ({at: a, s: 'sfx/pop', v: 0.25})), {at: 232.86, s: 'validation', v: 0.25},
  ...pops([240.54, 242.7]), {at: 245.9, s: 'sfx/ding', v: 0.22}, {at: 250.66, s: 'sfx/click', v: 0.4}, {at: 251.6, s: 'sfx/swish', v: 0.3}, {at: 255.4, s: 'soft-whoosh', v: 0.35, dur: 1.6}, ...pops([256.26, 258.22, 259.46]),
  {at: 266.5, s: 'sfx/swish', v: 0.3}, {at: 271.3, s: 'sfx/rise', v: 0.3, dur: 1.1}, {at: 272.4, s: 'bass-hit', v: 0.35},
  ...[274.0, 274.2, 274.4].map((a) => ({at: a, s: 'sfx/thud', v: 0.25})), ...[276.94, 279.9, 286.5].map((a) => ({at: a, s: 'sfx/ding', v: 0.25})),
  {at: 290.1, s: 'soft-whoosh', v: 0.35, dur: 1}, ...rep(290.2, 10, 0.05, 'sfx/click', 0.12), {at: 300.5, s: 'soft-whoosh', v: 0.25, dur: 2.4}, ...pops([296.14, 298.38, 302.9]),
  {at: 308.8, s: 'soft-whoosh', v: 0.2, dur: 3.8}, {at: 310.6, s: 'sfx/swish', v: 0.3}, {at: 311.78, s: 'validation', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<TK, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
export const ChutesPlainPied: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={27.85}><Intro /></Gate>
    <Gate from={31.0} to={67.55}><Paradoxe /></Gate>
    <Gate from={70.7} to={117.0}><AngleMort /></Gate>
    <Gate from={120.3} to={153.15}><FaireVivre /></Gate>
    <Gate from={156.6} to={237.0}><Outils /></Gate>
    <Gate from={240.2} to={261.65}><SurMesure /></Gate>
    <Gate from={264.8} to={OUTRO_AT}><Transfo /></Gate>
    {SECT.map((x, i) => { const C = TRANS[x.k]; return <Gate key={x.n} from={x.at} to={x.at + 3.7}><C i={i} /></Gate>; })}
    <Gate from={28} to={275}><StationBanner /></Gate>
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={313.3}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-chutes-plain-pied-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Tile, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, spring, LoupeSweep, PneuDeliver, Shine, Count, BURG, YEL, handFont, Board, random, Strike, TEAL, PhotoLetter, Watermark, ORANGE];
