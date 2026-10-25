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
 * « Café HSE : la sagesse » (5 min 22, source NotebookLM) — capsule « condensé + effet wahou + ultra premium »
 * présentée en métro : 8 stations (terrain → écouter → résistance → silence → prévention → presque-accidents →
 * confiance → rentrer chez soi). Voix d'origine (sans musique de fond), sous-titres calés mot à mot. Couverture :
 * photo + « CAFÉ HSE / LA SAGESSE » en lettres-photos animées. Fil rouge : tube pneumatique à six guichets calés sur
 * les vraies parties (question → café → architecture → vérités → confiance → conseils) ; gyrophare (transition
 * principale), loupe, store vénitien et capsule pneumatique plein écran ; barre de recherche qui ouvre le trésor.
 */
const IMG = {
  cover: 'influence-gen/ecoute.jpg',
  cCafe: 'causerie/groupe.jpg',
  cSag: 'ishikawa-gen/faits.jpg',
  terrain: 'ishikawa-gen/faits.jpg',
  ecoute: 'influence-gen/ecoute.jpg',
  poussiere: 'influence-gen/tiroir.jpg',
  paperasse: 'influence-gen/usine-a-gaz.jpg',
  seul: 'alerte-gen/silence.jpg',
  groupe: 'causerie/groupe.jpg',
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
const OUTRO_AT = 321.9;
export const CAFE_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 2.6, n: '1', title: 'La question qui change', s: 'le point de départ', c: GOLD, g: 'question', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 56.62, n: '2', title: 'Le Café HSE', s: 'un acte de résistance', c: BLUE, g: 'café', k: 'loupe', lab: 'PARTIE 2 / 6'},
  {at: 74.93, n: '3', title: 'L’architecture invisible', s: 'pour libérer la parole', c: GREEN, g: 'architecture', k: 'store', lab: 'PARTIE 3 / 6'},
  {at: 122.17, n: '4', title: 'Les vérités de la table', s: 'ce qui se dit vraiment', c: VIO, g: 'vérités', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 207.0, n: '5', title: 'Confiance, pas contrôle', s: 'la vraie infrastructure', c: ORANGE, g: 'confiance', k: 'tube', lab: 'PARTIE 5 / 6'},
  {at: 259.28, n: '6', title: 'Conseils à mon jeune moi', s: 'leçons d’une carrière', c: RED, g: 'conseils', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 315.2;
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
  {n: 1, l: 'L’expertise est sur le terrain', s: 'terrain', at: 33.3},
  {n: 2, l: 'Arrêter de parler, écouter', s: 'écouter', at: 48.74},
  {n: 3, l: 'Un acte de résistance', s: 'résistance', at: 65.58},
  {n: 4, l: 'Le pouvoir du silence', s: 'silence', at: 107.42},
  {n: 5, l: 'Des fiches… ou de la prévention ?', s: 'prévention', at: 148.74},
  {n: 6, l: 'Les presque-accidents : un trésor', s: 'trésor', at: 191.22},
  {n: 7, l: 'Bâtir la confiance', s: 'confiance', at: 215.86},
  {n: 8, l: 'Rentrer chez soi en bonne santé', s: 'chez soi', at: 289.38},
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

const QUOTE = 'Vous parlez des risques. Jamais comment on fait pour ne pas mourir.';
const INGR = [
  {l: 'le lieu', s: 'casser les codes', ic: 'maison', a: 94.9},
  {l: 'le rituel', s: 'une tasse en main', ic: 'chaud', a: 99.42},
  {l: 'le silence', s: 'se taire, attendre', ic: 'sablier', a: 107.42},
  {l: 'la fiction', s: 'plus de hiérarchie', ic: 'equipe', a: 114.66},
];

/* Tasse de café fumante (SVG + vapeur) */
const Cup: React.FC<{size: number; t: number}> = ({size, t}) => (
  <div style={{position: 'relative', width: size, height: size}}>
    {Array.from({length: 3}, (_, k) => { const p = ((t * 0.5 + k / 3) % 1); return <div key={k} style={{position: 'absolute', left: size * (0.3 + k * 0.14) + Math.sin(t * 2 + k) * 10, top: size * 0.12 - p * size * 0.3, width: size * 0.07, height: size * 0.28, borderRadius: size, background: '#AEB8C8', filter: `blur(${size * 0.03}px)`, opacity: (1 - p) * 0.8}} />; })}
    <svg width={size} height={size} viewBox="0 0 100 100" style={{position: 'absolute', left: 0, top: 0}}>
      <ellipse cx="45" cy="88" rx="38" ry="7" fill="#E3E8EF" stroke={INK} strokeWidth="2.5" />
      <path d="M 15 40 L 75 40 L 70 82 Q 45 90 20 82 Z" fill="#fff" stroke={INK} strokeWidth="3" />
      <path d="M 75 48 Q 92 50 88 64 Q 84 74 71 72" fill="none" stroke={INK} strokeWidth="4" />
      <ellipse cx="45" cy="40" rx="30" ry="6" fill="#6B3E1E" stroke={INK} strokeWidth="3" />
      <path d="M 22 58 L 68 58" stroke={BLUE} strokeWidth="4" />
    </svg>
  </div>
);

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
      <Abs x={0} y={560} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: '#fff', background: NAVY, padding: '8px 24px', borderRadius: 8}}>40 ANS DE TERRAIN · UN CAFÉ</div></Abs>
      <Abs x={0} y={650} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="CAFÉ HSE" src={IMG.cCafe} size={150} ls={4} /></Abs>
      <Abs x={0} y={840} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="LA SAGESSE" src={IMG.cSag} size={124} ls={2} seed={3} /></Abs>
      <Abs x={0} y={1010} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: NAVY}}>arrêter de parler, <span style={{color: GOLD}}>commencer à écouter</span></Abs>
      <Abs x={0} y={1090} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30}}>
        <div style={{transform: 'scale(1)'}}><Cup size={300} t={t} /></div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>{INGR.map((x, k) => <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 12, background: [BLUE, GREEN, VIO, ORANGE][k], border: `4px solid ${INK}`, borderRadius: 16, padding: '6px 18px 6px 8px', boxShadow: `4px 4px 0 ${INK}`}}><F n={x.ic} size={52} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff'}}>{x.l}</span></div>)}</div>
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

/* ═════════════ 1 · LA QUESTION QUI CHANGE ═════════════ */
const Question: React.FC = () => {
  const t = useT();
  const ph = t < 15.5 ? 0 : t < 37.2 ? 1 : 2;
  const typed = Math.floor(prog(t, 17.0, 21.2, (x) => x) * QUOTE.length);
  const shock = prog(t, 23.3, 24.6, easeOut);
  const flip = prog(t, 47.6, 49.0, easeInOut);
  return (
    <Out end={56.62}>
      {ph === 0 && (
        <>
          <HiLine words={['Un', 'café,', '40', 'ans', 'de', 'terrain']} mark={[1, 2, 3]} at={6.2} y={330} size={60} />
          <Abs x={60} y={440} w={960} h={930}>
            {[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 60 + k * 40 + lerp(0, -700, prog(t, 6.0 + k * 0.2, 7.2 + k * 0.2, easeIn)), top: 40 + k * 30, width: 200, height: 280, background: [BLUE, RED, GREEN][k], border: `6px solid ${INK}`, borderRadius: 12, transform: `rotate(${-8 + k * 6 - prog(t, 6.0, 7.4) * 40}deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#fff', textAlign: 'center'}}>MANUEL<br />PROC.</div>)}
            <div style={{position: 'absolute', left: 280, top: 60, opacity: pop(t, 6.4), transform: `scale(${pop(t, 6.4)})`}}><Cup size={420} t={t} /></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 560, display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 16, opacity: pop(t, 8.0)}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 160, color: GOLD}}>{t > 8.0 ? <Count n={40} a={8.18} b={9.6} /> : '0'}</span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: INK}}>ans d’expérience</span></div>
            {t > 12.6 && <div style={{position: 'absolute', left: 0, right: 0, top: 790, display: 'flex', justifyContent: 'center'}}><Pill at={12.6} c={GOLD} size={32}>une approche qui change tout</Pill></div>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 28.4 ? ['Une', 'phrase,', 'un', 'choc'] : ['Pas', 'au', 'bureau,', 'sur', 'le', 'terrain']} mark={t < 28.4 ? [1, 3] : [2, 5]} at={t < 28.4 ? 16.3 : 32.14} y={330} size={60} />
          <Abs x={60} y={440} w={960} h={930}>
            {t < 28.4 ? <>
              <div style={{position: 'absolute', left: 40, top: 40, width: 880, minHeight: 360, background: '#fff', border: `6px solid ${INK}`, borderRadius: 30, boxShadow: `10px 10px 0 ${GOLD}`, padding: '40px 46px', boxSizing: 'border-box', transform: `translate(${Math.sin(t * 60) * 14 * (1 - shock) * (t > 23.3 ? 1 : 0)}px, 0)`, opacity: pop(t, 16.4)}}>
                <div style={{position: 'absolute', left: 24, top: -40, fontFamily: 'Georgia, serif', fontSize: 140, color: GOLD, lineHeight: 1}}>“</div>
                <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 52, color: INK, lineHeight: 1.25}}>{QUOTE.slice(0, typed).split(' ').map((w, k) => <span key={k} style={{background: /mourir/.test(w) ? YEL : 'transparent'}}>{w} </span>)}<span style={{opacity: typed < QUOTE.length && Math.sin(t * 12) > 0 ? 1 : 0, color: GOLD}}>|</span></div>
              </div>
              <div style={{position: 'absolute', left: 0, right: 0, top: 460, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={19.4} c={NAVY} size={30}>un opérateur</Pill><Pill at={21.86} c={DIM} size={30}>années 90</Pill></div>
              {shock > 0 && <>{[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 480 - 600 * prog(t, 23.3 + k * 0.15, 24.8 + k * 0.15), top: 220 - 600 * prog(t, 23.3 + k * 0.15, 24.8 + k * 0.15), width: 1200 * prog(t, 23.3 + k * 0.15, 24.8 + k * 0.15), height: 1200 * prog(t, 23.3 + k * 0.15, 24.8 + k * 0.15), borderRadius: '50%', border: `${10 - k * 3}px solid ${RED}`, opacity: 1 - prog(t, 23.3 + k * 0.15, 24.8 + k * 0.15)}} />)}</>}
              {t > 24.66 && <Stamp at={24.66} c={RED} text="DÉFLAGRATION" x={180} y={600} rot={-6} size={60} />}
            </> : <>
              <div style={{position: 'absolute', left: 0, top: 0, width: 460, height: 420, borderRadius: 24, background: '#F4F6FA', border: `5px solid #C9D2DF`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: pop(t, 28.6), filter: t > 32.14 ? 'grayscale(1) opacity(0.6)' : 'none'}}><F n="homme-bureau" size={180} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: DIM}}>les bureaux</span>{t > 32.14 && <div style={{position: 'absolute', fontSize: 260, color: RED, fontWeight: 900}}>✕</div>}</div>
              <div style={{position: 'absolute', left: 500, top: 0, width: 460, height: 420, borderRadius: 24, overflow: 'hidden', border: `5px solid ${GREEN}`, boxShadow: `7px 7px 0 ${GREEN}`, opacity: pop(t, 33.3), transform: `scale(${t > 33.3 ? spring(t, 33.3) : 0.6})`}}><Pic src={IMG.terrain} ic="ouvrier" w={460} h={420} pos="50% 40%" /><div style={{position: 'absolute', left: 14, bottom: 14, background: GREEN, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 32, padding: '4px 16px', borderRadius: 12}}>le terrain ✓</div></div>
              <div style={{position: 'absolute', left: 0, right: 0, top: 480, display: 'flex', justifyContent: 'center'}}><Pill at={29.4} c={GOLD} size={32}>une vérité fondamentale</Pill></div>
              {t > 34.6 && <div style={{position: 'absolute', left: 0, right: 0, top: 580, display: 'flex', justifyContent: 'center', gap: 20}}>{['main', 'outils', 'ouvrier', 'casque'].slice(0, 4).map((ic, k) => <div key={ic} style={{transform: `scale(${t > 34.6 + k * 0.3 ? spring(t, 34.6 + k * 0.3) : 0})`}}><F n={ic === 'main' ? 'main-levee' : ic} size={120} /></div>)}</div>}
            </>}
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 48.6 ? ['Tout', 'inverser'] : ['Écouter', 'ce', 'qu’ils', 'ont', 'à', 'dire']} mark={t < 48.6 ? [1] : [0]} at={t < 48.6 ? 44.42 : 48.74} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center', opacity: pop(t, 38.22)}}><div style={{background: GOLD, borderRadius: 40, padding: '12px 30px', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK, transform: `scale(${t > 38.22 ? spring(t, 38.22) : 0})`}}>💡 le déclic</div></div>
            <div style={{position: 'absolute', left: 80, top: 130, width: 800, height: 220, perspective: 1600, opacity: pop(t, 43.0)}}>
              <div style={{position: 'absolute', inset: 0, transform: `rotateX(${flip * 180}deg)`, transformStyle: 'preserve-3d'}}>
                <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', background: RED, border: `6px solid ${INK}`, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}><F n="megaphone" size={120} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: '#fff'}}>PARLER → aux gens</span></div>
                <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateX(180deg)', background: GREEN, border: `6px solid ${INK}`, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}><F n="coeur" size={110} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: '#fff'}}>ÉCOUTER ← les gens</span></div>
              </div>
            </div>
            <Shot src={IMG.ecoute} ic="equipe" x={0} y={390} w={960} h={340} at={49.6} c={GREEN} />
            {t > 54.0 && <div style={{position: 'absolute', left: 0, right: 0, top: 770, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={52.6} c={GREEN} size={28}>rester en sécurité</Pill><Pill at={55.02} c={DIM} size={28}>malgré les contraintes</Pill></div>}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 2 · LE CAFÉ HSE, ACTE DE RÉSISTANCE ═════════════ */
const Cafe: React.FC = () => {
  const t = useT();
  return (
    <Out end={74.93}>
      <HiLine words={t < 65.4 ? ['Le', 'Café', 'HSE'] : ['Un', 'acte', 'de', 'résistance']} mark={t < 65.4 ? [1, 2] : [1, 3]} at={t < 65.4 ? 57.46 : 65.58} y={330} size={70} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 960, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30, opacity: pop(t, 60.2)}}>
          <Cup size={260} t={t} />
          <div style={{position: 'relative'}}><Pill at={61.0} c={DIM} size={30}>« un nom sympa pour une réunion »</Pill><div style={{position: 'absolute', left: 8, right: 8, top: '50%'}}><Strike p={prog(t, 62.2, 62.8)} c={RED} /></div></div>
        </div>
        {t > 65.58 && <div style={{position: 'absolute', left: 0, right: 0, top: 290, display: 'flex', justifyContent: 'center'}}><div style={{display: 'flex', alignItems: 'center', gap: 16, background: BLUE, border: `6px solid ${INK}`, borderRadius: 24, padding: '14px 30px', transform: `scale(${spring(t, 65.58)}) rotate(-2deg)`, boxShadow: `8px 8px 0 ${INK}`}}><F n="poing" size={90} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: '#fff'}}>RÉSISTANCE CONTRE…</span></div></div>}
        <div style={{position: 'absolute', left: 0, right: 0, top: 460, display: 'flex', gap: 16}}>
          {[{l: 'la réunionite aiguë', ic: 'calendrier', a: 67.38}, {l: 'les audits que personne ne lit', ic: 'classeur', a: 68.9}, {l: 'les formations déconnectées', ic: 'prise', a: 70.98}].map((x, k) => <div key={x.l} style={{position: 'relative', flex: 1, height: 400, borderRadius: 24, background: '#fff', border: `5px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, opacity: pop(t, x.a), overflow: 'hidden'}}>
            <div style={{transform: k === 2 ? `translateX(${prog(t, 72.9, 73.6) * 40}px) rotate(${prog(t, 72.9, 73.6) * 30}deg)` : 'none'}}><F n={x.ic} size={130} /></div>
            <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, textAlign: 'center', padding: '0 14px'}}>{x.l}</span>
            {k === 1 && t > 70.38 && Array.from({length: 14}, (_, j) => <div key={j} style={{position: 'absolute', left: 20 + (j * 37) % 260, top: ((t - 70.38) * 60 + j * 29) % 400, width: 6, height: 6, borderRadius: 3, background: '#B7A27A', opacity: 0.7}} />)}
            {t > x.a + 1.0 && <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 280, color: RED, fontWeight: 900, opacity: 0.85 * prog(t, x.a + 1.0, x.a + 1.3)}}>✕</div>}
          </div>)}
        </div>
      </Abs>
    </Out>
  );
};

/* ═════════════ 3 · L'ARCHITECTURE INVISIBLE ═════════════ */
const Architecture: React.FC = () => {
  const t = useT();
  const draw = prog(t, 82.8, 86.0, (x) => x);
  const mute = prog(t, 107.4, 108.6) * (1 - prog(t, 112.0, 113.0));
  const flat = prog(t, 116.4, 118.0, easeInOut);
  return (
    <Out end={122.17}>
      <HiLine words={t < 91.4 ? ['Un', 'cadre', 'invisible'] : t < 105.0 ? ['Les', '4', 'ingrédients'] : t < 114.6 ? ['Savoir', 'se', 'taire'] : ['Sans', 'hiérarchie']} mark={t < 91.4 ? [1, 2] : t < 105.0 ? [1, 2] : t < 114.6 ? [1, 2] : [1]} at={t < 91.4 ? 84.38 : t < 105.0 ? 91.6 : t < 114.6 ? 108.34 : 116.42} y={330} size={62} />
      <Abs x={60} y={440} w={960} h={930} style={{background: '#0F2B4C', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 78.6)}}>
        <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#ffffff14 2px, transparent 2px), linear-gradient(90deg, #ffffff14 2px, transparent 2px)', backgroundSize: '48px 48px'}} />
        <div style={{position: 'absolute', left: 24, top: 18, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#9CC6FF'}}>PLAN · ARCHITECTURE DE LA PAROLE</div>
        {t < 91.4 && <>
          <div style={{position: 'absolute', left: 120, top: 140, width: 720, height: 300, background: '#fff', border: `5px solid ${INK}`, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, opacity: pop(t, 78.8) * (1 - prog(t, 80.6, 81.4))}}><F n="equipe" size={120} /><Cup size={140} t={t} /><span style={{fontFamily: handFont, fontSize: 44, color: INK}}>= c’est bon ?</span></div>
          <svg style={{position: 'absolute', left: 0, top: 0}} width={948} height={918}><path d="M 180 760 L 180 360 L 474 180 L 768 360 L 768 760 Z M 180 560 L 768 560 M 474 180 L 474 760" fill="none" stroke="#9CC6FF" strokeWidth={6} strokeDasharray="12 8" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - draw}} /></svg>
          {t > 86.0 && <div style={{position: 'absolute', left: 0, right: 0, top: 800, display: 'flex', justifyContent: 'center'}}><Pill at={86.0} c={GOLD} size={30}>des conversations puissantes</Pill></div>}
        </>}
        {t >= 91.4 && <div style={{position: 'absolute', left: 30, right: 30, top: 80, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22}}>
          {INGR.map((x, k) => <div key={x.l} style={{height: 360, borderRadius: 24, background: t > x.a ? [BLUE, GREEN, VIO, ORANGE][k] : '#ffffff10', border: `5px dashed ${t > x.a ? INK : '#9CC6FF'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, transform: `scale(${t > x.a ? spring(t, x.a) : 0.92})`, filter: k !== 2 && mute > 0 ? `blur(${mute * 6}px) opacity(${1 - mute * 0.6})` : 'none'}}>
            {t > x.a ? <>{k === 1 ? <Cup size={150} t={t} /> : k === 3 ? <div style={{position: 'relative', width: 240, height: 150}}>{[0, 1, 2, 3, 4].map((j) => { const tx = lerp([90, 30, 150, 0, 180][j], j * 50, flat); const ty = lerp([0, 70, 70, 140, 140][j], 60, flat); return <div key={j} style={{position: 'absolute', left: tx, top: ty, width: 48, height: 48, borderRadius: 24, background: '#fff', border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="salarie" size={36} /></div>; })}</div> : <F n={x.ic} size={140} />}<span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: '#fff'}}>{x.l}</span><span style={{fontFamily: sansFont, fontWeight: 700, fontSize: 24, color: '#ffffffCC'}}>{x.s}</span></> : <span style={{fontFamily: MONO, fontWeight: 700, fontSize: 60, color: '#9CC6FF'}}>{k + 1}</span>}
          </div>)}
        </div>}
        {mute > 0 && <div style={{position: 'absolute', left: 0, right: 0, bottom: 30, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 8, height: 90}}>{Array.from({length: 24}, (_, j) => <div key={j} style={{width: 14, height: 6 + Math.abs(Math.sin(t * 8 + j)) * 70 * (1 - mute), background: '#9CC6FF', borderRadius: 4}} />)}<span style={{marginLeft: 20, fontFamily: MONO, fontWeight: 700, fontSize: 28, color: '#fff', opacity: mute}}>… silence</span></div>}
      </Abs>
    </Out>
  );
};

/* ═════════════ 4 · LES VÉRITÉS DE LA TABLE ═════════════ */
const Verites: React.FC = () => {
  const t = useT();
  const ph = t < 149.7 ? 0 : t < 170.0 ? 1 : t < 186.7 ? 2 : 3;
  const stack = prog(t, 141.6, 148.0, (x) => x);
  const gaze = prog(t, 182.4, 183.6, easeInOut);
  return (
    <Out end={207.0}>
      {ph === 0 && (
        <>
          <HiLine words={t < 135.8 ? ['Des', 'vérités', 'universelles'] : ['Fiches', 'ou', 'prévention', '?']} mark={t < 135.8 ? [1, 2] : [0, 2]} at={t < 135.8 ? 125.22 : 141.6} y={330} size={58} />
          <Abs x={60} y={440} w={960} h={930}>
            {t < 135.8 ? <>
              <div style={{position: 'absolute', left: 230, top: 20, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #BFE3FF, #2D6FA8)', border: `8px solid ${INK}`, opacity: pop(t, 125.6), transform: `rotate(${t * 6}deg)`}}>{[[100, 120], [300, 90], [200, 280], [350, 300], [120, 330]].map(([x, y], k) => <div key={k} style={{position: 'absolute', left: x, top: y, transform: `rotate(${-t * 6}deg) scale(${t > 128.4 + k * 0.4 ? spring(t, 128.4 + k * 0.4) : 0})`}}><Cup size={70} t={t} /></div>)}</div>
              <div style={{position: 'absolute', left: 0, right: 0, top: 570, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={128.6} c={BLUE} size={30}>peu importe le pays</Pill><Pill at={130.2} c={TEAL} size={30}>peu importe le secteur</Pill></div>
              {t > 133.82 && <div style={{position: 'absolute', left: 0, right: 0, top: 680, display: 'flex', justifyContent: 'center'}}><Pill at={133.82} c={VIO} size={32}>♪ les mêmes refrains ♪</Pill></div>}
            </> : <>
              <div style={{position: 'absolute', left: 60, top: 20, width: 840, height: 220, background: '#fff', border: `6px solid ${INK}`, borderRadius: 26, padding: '26px 34px', boxSizing: 'border-box', opacity: pop(t, 136.0)}}><span style={{fontFamily: sansFont, fontWeight: 800, fontSize: 38, color: INK, lineHeight: 1.3}}>« On passe plus de temps à <span style={{background: YEL}}>remplir les fiches</span> qu’à faire de la <span style={{background: YEL}}>prévention</span>. »</span></div>
              <div style={{position: 'absolute', left: 100, bottom: 40, width: 300, height: 600, display: 'flex', flexDirection: 'column-reverse', alignItems: 'center'}}>{Array.from({length: Math.floor(stack * 18)}, (_, k) => <div key={k} style={{width: 260 + (k % 3) * 10, height: 26, background: k % 2 ? '#F4F6FA' : '#fff', border: `3px solid ${INK}`, transform: `rotate(${((k * 7) % 9) - 4}deg)`, marginTop: -2}} />)}<div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: RED, marginBottom: 10}}>charge admin.</div></div>
              <div style={{position: 'absolute', right: 120, bottom: 40, width: 220, height: 600, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: 10}}><div style={{width: 160, height: lerp(420, 60, stack), background: GREEN, border: `5px solid ${INK}`, borderRadius: '16px 16px 0 0'}} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: GREEN}}>prévention</div></div>
              {t > 137.5 && <div style={{position: 'absolute', left: 380, top: 300}}><Pill at={137.5} c={GOLD} size={26}>soupir de soulagement</Pill></div>}
            </>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 157.2 ? ['Un', 'fossé', 'immense'] : ['Le', 'dilemme', 'permanent']} mark={t < 157.2 ? [1, 2] : [1]} at={t < 157.2 ? 152.1 : 158.7} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 0, top: 40, width: 400 - prog(t, 152.1, 153.6) * 60, height: 360, background: '#C9D2DF', border: `6px solid ${INK}`, borderRadius: '24px 0 0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: pop(t, 150.0)}}><F n="homme-bureau" size={120} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>théorie</span></div>
            <div style={{position: 'absolute', right: 0, top: 40, width: 400 - prog(t, 152.1, 153.6) * 60, height: 360, borderRadius: '0 24px 24px 0', overflow: 'hidden', border: `6px solid ${INK}`, opacity: pop(t, 150.0)}}><Pic src={IMG.terrain} ic="ouvrier" w={400} h={360} pos="50% 40%" /><div style={{position: 'absolute', left: 10, bottom: 10, background: RED, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 26, padding: '2px 12px', borderRadius: 8}}>dure réalité</div></div>
            <div style={{position: 'absolute', left: 340, top: 40, width: 280, height: 360, background: `repeating-linear-gradient(180deg, #14213D, #14213D 20px, #27324A 20px, #27324A 40px)`, opacity: prog(t, 152.1, 153.6), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: GOLD}}>FOSSÉ</div>
            {t > 157.3 && <svg style={{position: 'absolute', left: 0, top: 440}} width={960} height={420}><path d="M 480 20 L 480 140 Q 480 200 240 260 M 480 140 Q 480 200 720 260" fill="none" stroke={INK} strokeWidth={10} pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - prog(t, 157.3, 158.7)}} /></svg>}
            {t > 159.0 && <div style={{position: 'absolute', left: 400, top: 380}}><F n="ouvrier" size={140} /></div>}
            <div style={{position: 'absolute', left: 20, top: 720, width: 420, height: 150, borderRadius: 20, background: '#FDE8E8', border: `4px solid ${RED}`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, padding: 10, opacity: pop(t, 161.94)}}>suivre une procédure inadaptée</div>
            <div style={{position: 'absolute', right: 20, top: 720, width: 420, height: 150, borderRadius: 20, background: '#FFF6DA', border: `4px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, padding: 10, opacity: pop(t, 163.3)}}>son intelligence… mais non conforme</div>
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 181.8 ? ['Un', 'métier', 'solitaire'] : ['Tous', 'les', 'regards']} mark={t < 181.8 ? [2] : [2]} at={t < 181.8 ? 175.82 : 182.82} y={330} size={66} />
          <Shot src={IMG.seul} ic="superviseur" x={60} y={440} w={960} h={360} at={170.3} c={VIO} filter={`saturate(${lerp(1, 0.3, prog(t, 175.8, 177))})`} />
          <Abs x={60} y={830} w={960} h={540} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 176.0)}}>
            <div style={{position: 'absolute', left: 420, top: 200 + Math.sin(t * 2) * 4}}><F n="superviseur" size={120} /></div>
            <div style={{position: 'absolute', left: 390, top: 150, width: 180, height: 50, background: ORANGE, border: `4px solid ${INK}`, borderRadius: 10, fontFamily: MONO, fontSize: 18, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 177.58)}}>sécurité des autres</div>
            {t < 181.8 && t > 180.0 && <div style={{position: 'absolute', left: 30, top: 30}}><Pill at={180.0} c={DIM} size={24}>accident évité → personne ne le voit</Pill></div>}
            {Array.from({length: 10}, (_, k) => { const a = (k / 10) * Math.PI * 2; return <div key={k} style={{position: 'absolute', left: 470 + Math.cos(a) * 380 - 40, top: 260 + Math.sin(a) * 210 - 40, opacity: gaze, transform: `rotate(${(a * 180) / Math.PI + 180}deg)`}}><F n="yeux" size={80} /></div>; })}
            {t > 184.42 && <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, display: 'flex', justifyContent: 'center'}}><Pill at={184.42} c={RED} size={28}>une charge morale très lourde</Pill></div>}
          </Abs>
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={t < 197.8 ? ['Le', 'trésor', 'de', 'la', 'prévention'] : ['La', 'confiance', 'fait', 'remonter']} mark={t < 197.8 ? [1, 4] : [1, 3]} at={t < 197.8 ? 188.1 : 201.34} y={330} size={58} />
          <SearchOpen x={60} y={440} w={960} h={930} at={186.9} query="presque-accident" results={['Accidents déclarés', 'Presque-accidents : le trésor', 'Audits archivés']} found={1} foundAt={189.2} clickAt={189.7} c={VIO}>
            <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 40%, #3A2A0A, #120D04)'}}>
              <div style={{position: 'absolute', left: 290, top: 120, width: 300, height: 220}}>
                <div style={{position: 'absolute', left: 0, top: 80, width: 300, height: 140, background: '#8A5A2B', border: `6px solid ${INK}`, borderRadius: 12}} />
                <div style={{position: 'absolute', left: 0, top: 0, width: 300, height: 90, background: '#A06A34', border: `6px solid ${INK}`, borderRadius: '60px 60px 8px 8px', transformOrigin: '50% 100%', transform: `rotateX(${prog(t, 202.0, 203.2) * 70}deg)`}} />
                <div style={{position: 'absolute', left: 120, top: 100, width: 60, height: 60, background: GOLD, border: `5px solid ${INK}`, borderRadius: 10, opacity: 1 - prog(t, 201.3, 202.0)}}><F n="cadenas" size={50} /></div>
              </div>
              {t > 202.6 && Array.from({length: 26}, (_, k) => { const p = ((t - 202.6) * 0.6 + k / 26) % 1; return <div key={k} style={{position: 'absolute', left: 300 + ((k * 53) % 280), top: 220 - p * 300, width: 26, height: 26, borderRadius: 13, background: GOLD, border: '3px solid #8A6400', opacity: 1 - p, boxShadow: `0 0 18px ${GOLD}`}} />; })}
              <div style={{position: 'absolute', left: 0, right: 0, top: 420, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={193.58} c={RED} size={28}>aurait pu être dramatique</Pill><Pill at={196.66} c={GREEN} size={28}>bien terminé</Pill></div>
              <div style={{position: 'absolute', left: 0, right: 0, top: 520, display: 'flex', justifyContent: 'center', gap: 14}}>{t > 199.38 && <div style={{position: 'relative'}}><Pill at={199.38} c={DIM} size={28}>peur des sanctions</Pill><div style={{position: 'absolute', left: 8, right: 8, top: '50%'}}><Strike p={prog(t, 201.0, 201.5)} c={RED} /></div></div>}{t > 201.34 && <Pill at={201.34} c={GOLD} size={28}>confiance totale</Pill>}</div>
              {t > 203.5 && <div style={{position: 'absolute', left: 0, right: 0, top: 640, display: 'flex', justifyContent: 'center'}}><Pill at={203.5} c={GOLD} size={32}>l’information la plus précieuse</Pill></div>}
            </div>
          </SearchOpen>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 5 · CONFIANCE, PAS CONTRÔLE ═════════════ */
const Confiance: React.FC = () => {
  const t = useT();
  const ph = t < 242.7 ? 0 : 1;
  const bridge = prog(t, 255.2, 257.0, easeOut);
  return (
    <Out end={259.28}>
      {ph === 0 && (
        <>
          <HiLine words={t < 219.9 ? ['Bâtir', 'la', 'confiance'] : t < 235.2 ? ['Peur', 'vs', 'confiance'] : ['La', 'parole', 'circule']} mark={t < 219.9 ? [0, 2] : t < 235.2 ? [0, 2] : [1, 2]} at={t < 219.9 ? 214.38 : t < 235.2 ? 220.6 : 239.14} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            {t < 235.2 ? <>
              <div style={{position: 'absolute', left: 0, top: 0, width: 470, height: 880, borderRadius: 26, background: '#2A1418', border: `6px solid ${INK}`, overflow: 'hidden', opacity: pop(t, 219.9)}}>
                <div style={{padding: 20, fontFamily: MONO, fontWeight: 700, fontSize: 26, color: '#FF8A8A'}}>SYSTÈME DE PEUR</div>
                {[{l: 'contrôle', a: 222.26}, {l: 'sanction', a: 222.9}, {l: 'recherche du coupable', a: 223.54}].map((x) => <div key={x.l} style={{margin: '14px 20px', padding: '14px 18px', borderRadius: 14, background: '#4A1E24', border: `3px solid ${RED}`, fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff', opacity: pop(t, x.a)}}>{x.l}</div>)}
                <div style={{position: 'absolute', left: 0, right: 0, bottom: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: pop(t, 225.5)}}><F n="cadenas" size={120} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: '#FF8A8A'}}>→ le silence</span></div>
              </div>
              <div style={{position: 'absolute', right: 0, top: 0, width: 470, height: 880, borderRadius: 26, background: '#E5F7EC', border: `6px solid ${INK}`, overflow: 'hidden', opacity: pop(t, 227.9)}}>
                <div style={{padding: 20, fontFamily: MONO, fontWeight: 700, fontSize: 26, color: GREEN}}>INFRASTRUCTURE DE CONFIANCE</div>
                {[{l: 'communication', a: 230.38}, {l: 'curiosité', a: 231.38}, {l: 'apprentissage', a: 232.34}].map((x) => <div key={x.l} style={{margin: '14px 20px', padding: '14px 18px', borderRadius: 14, background: '#fff', border: `3px solid ${GREEN}`, fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, opacity: pop(t, x.a)}}>{x.l}</div>)}
                <div style={{position: 'absolute', left: 0, right: 0, bottom: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: pop(t, 233.38)}}><F n="bulle" size={120} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: GREEN}}>→ la parole se libère</span></div>
              </div>
              {t < 219.9 && <div style={{position: 'absolute', left: 0, right: 0, top: 300, display: 'flex', justifyContent: 'center', gap: 14}}><div style={{position: 'relative'}}><Pill at={212.4} c={DIM} size={30}>+ de contrôles</Pill><div style={{position: 'absolute', left: 8, right: 8, top: '50%'}}><Strike p={prog(t, 214.0, 214.5)} c={RED} /></div></div><Pill at={214.38} c={ORANGE} size={30}>infrastructures de confiance</Pill></div>}
            </> : <>
              {[{l: '« je ne sais pas »', a: 235.5, x: 40, y: 40}, {l: '« j’ai besoin d’aide »', a: 236.7, x: 420, y: 160}, {l: '« cette procédure est nulle »', a: 237.9, x: 80, y: 300}].map((b) => <div key={b.l} style={{position: 'absolute', left: b.x, top: b.y - prog(t, b.a, b.a + 4) * 30, background: '#fff', border: `5px solid ${INK}`, borderRadius: '30px 30px 30px 6px', padding: '16px 26px', fontFamily: handFont, fontSize: 44, color: INK, transform: `scale(${t > b.a ? spring(t, b.a) : 0})`, boxShadow: `6px 6px 0 ${ORANGE}`}}>{b.l}</div>)}
              <svg style={{position: 'absolute', left: 0, top: 460}} width={960} height={200}><path d="M 20 100 C 240 0, 480 200, 720 100 S 940 60, 940 100" fill="none" stroke={ORANGE} strokeWidth={14} strokeDasharray="30 20" strokeDashoffset={-t * 120} opacity={prog(t, 239.0, 239.6)} /></svg>
              {t > 240.86 && <div style={{position: 'absolute', left: 0, right: 0, top: 700, display: 'flex', justifyContent: 'center'}}><div style={{display: 'flex', alignItems: 'center', gap: 14, background: GOLD, border: `5px solid ${INK}`, borderRadius: 24, padding: '12px 28px', transform: `scale(${spring(t, 240.86)})`}}><F n="cle" size={90} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK}}>la clé de la sécurité</span></div></div>}
            </>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 254.5 ? ['Revoir', 'le', 'métier'] : ['Un', 'pont,', 'un', 'traducteur']} mark={t < 254.5 ? [0, 2] : [1, 3]} at={t < 254.5 ? 243.6 : 255.26} y={330} size={64} />
          <Abs x={60} y={440} w={960} h={930}>
            {[{a: 'expert en normes', b: 'expert en curiosité', ta: 246.3, tb: 248.3}, {a: 'trouver un coupable', b: 'comprendre le système', ta: 250.22, tb: 251.74}].map((r, k) => <div key={k} style={{position: 'absolute', left: 0, right: 0, top: k * 160, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20}}><div style={{position: 'relative'}}><Pill at={r.ta} c={DIM} size={30}>{r.a}</Pill><div style={{position: 'absolute', left: 8, right: 8, top: '50%'}}><Strike p={prog(t, r.tb - 0.6, r.tb - 0.1)} c={RED} /></div></div><span style={{fontSize: 40, fontWeight: 900, opacity: pop(t, r.tb)}}>→</span><Pill at={r.tb} c={ORANGE} size={30}>{r.b}</Pill></div>)}
            <div style={{position: 'absolute', left: 0, top: 380, width: 280, height: 420, borderRadius: 24, background: NAVY, border: `5px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: pop(t, 254.6)}}><F n="directeur" size={140} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>direction</span></div>
            <div style={{position: 'absolute', right: 0, top: 380, width: 280, height: 420, borderRadius: 24, background: GREEN, border: `5px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: pop(t, 254.6)}}><F n="ouvrier" size={140} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>terrain</span></div>
            <svg style={{position: 'absolute', left: 280, top: 440}} width={400} height={260}><path d="M 0 200 Q 200 -60 400 200" fill="none" stroke={ORANGE} strokeWidth={18} pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - bridge}} /><line x1={0} y1={200} x2={400} y2={200} stroke={INK} strokeWidth={14} opacity={bridge} />{[80, 160, 240, 320].map((x) => <line key={x} x1={x} y1={200} x2={x} y2={200 - Math.sin((x / 400) * Math.PI) * 130 * bridge} stroke={INK} strokeWidth={6} />)}</svg>
            {t > 256.3 && <div style={{position: 'absolute', left: 340, top: 520, transform: `scale(${spring(t, 256.3)})`}}><F n="superviseur" size={120} /></div>}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 6 · CONSEILS À MON JEUNE MOI ═════════════ */
const Conseils: React.FC = () => {
  const t = useT();
  const ph = t < 290.8 ? 0 : 1;
  const road = prog(t, 268.6, 289.4, (x) => x);
  const peel = prog(t, 298.6, 300.4, easeInOut);
  return (
    <Out end={OUTRO_AT}>
      {ph === 0 && (
        <>
          <HiLine words={t < 268.4 ? ['À', 'la', 'nouvelle', 'génération'] : ['La', 'feuille', 'de', 'route']} mark={t < 268.4 ? [2, 3] : [1, 3]} at={t < 268.4 ? 262.6 : 268.62} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={930}>
            {t < 268.4 ? <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40, opacity: pop(t, 262.8)}}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}><F n="pensif" size={220} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>vieux praticien</span></div>
              <svg width={200} height={60}><path d="M 0 30 L 180 30 M 150 8 L 190 30 L 150 52" fill="none" stroke={RED} strokeWidth={10} pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - prog(t, 263.3, 264.4)}} /></svg>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: pop(t, 263.4)}}><F n="ouvrier" size={220} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>nouvelle génération</span></div>
            </div> : <>
              <svg style={{position: 'absolute', left: 0, top: 0}} width={960} height={900}><path d="M 120 860 C 120 700, 840 720, 840 560 S 120 420, 120 260 S 840 120, 840 40" fill="none" stroke="#C9D2DF" strokeWidth={60} strokeLinecap="round" /><path d="M 120 860 C 120 700, 840 720, 840 560 S 120 420, 120 260 S 840 120, 840 40" fill="none" stroke={RED} strokeWidth={16} strokeDasharray="1" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - road}} /></svg>
              {[{l: 'une affaire humaine', ic: 'coeur', a: 273.26, x: 200, y: 740}, {l: 'l’expertise est sur le terrain', ic: 'casque', a: 275.98, x: 560, y: 560}, {l: 'comprendre avant de juger', ic: 'loupe', a: 280.58, x: 160, y: 380}, {l: 'bâtir des ponts', ic: 'poignee', a: 281.7, x: 520, y: 220}].map((m) => <div key={m.l} style={{position: 'absolute', left: m.x, top: m.y, display: 'flex', alignItems: 'center', gap: 12, background: '#fff', border: `5px solid ${RED}`, borderRadius: 20, padding: '10px 18px', boxShadow: `5px 5px 0 ${RED}`, transform: `scale(${t > m.a ? spring(t, m.a) : 0})`}}><F n={m.ic} size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, maxWidth: 260}}>{m.l}</span></div>)}
              {t > 288.1 && <div style={{position: 'absolute', left: 700, top: -20, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${spring(t, 288.1)})`}}><div style={{position: 'relative'}}><F n="maison" size={170} /><div style={{position: 'absolute', left: 64, top: 90, width: 40, height: 40, background: GOLD, boxShadow: `0 0 40px 10px ${GOLD}`, opacity: prog(t, 289.4, 290.0)}} /></div><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: GREEN, background: '#fff', borderRadius: 10, padding: '2px 10px'}}>rentrer en bonne santé</span></div>}
            </>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 308.4 ? ['Derrière', 'chaque', 'procédure'] : ['L’esprit', 'du', 'Café', 'HSE', '?']} mark={t < 308.4 ? [0, 2] : [0, 2, 3]} at={t < 308.4 ? 296.58 : 318.82} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={930}>
            {t < 308.4 ? <>
              <div style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center'}}><Pill at={294.3} c={RED} size={34}>pas une méthode : une philosophie</Pill></div>
              <div style={{position: 'absolute', left: 160, top: 110, width: 640, height: 600}}>
                <div style={{position: 'absolute', inset: 0, borderRadius: 24, background: GOLD, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap', padding: 40, boxSizing: 'border-box'}}>{['salariee', 'ouvrier', 'enfants', 'femme-bureau', 'ouvrier-dark', 'salarie'].map((ic, k) => <div key={ic} style={{transform: `scale(${peel > 0.4 ? spring(t, 299.4 + k * 0.15) : 0})`}}><F n={ic} size={130} /></div>)}</div>
                <div style={{position: 'absolute', inset: 0, borderRadius: 24, background: '#fff', border: `6px solid ${INK}`, transformOrigin: '100% 0', transform: `rotate(${peel * 70}deg) translate(${peel * 200}px, ${-peel * 100}px)`, padding: 40, boxSizing: 'border-box', opacity: pop(t, 295.0) * (1 - peel)}}>
                  <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: DIM}}>PROCÉDURE · KPI</div>
                  {Array.from({length: 8}, (_, j) => <div key={j} style={{height: 18, borderRadius: 6, background: '#E3E8EF', marginTop: 26, width: `${[90, 70, 85, 60, 95, 75, 80, 65][j]}%`}} />)}
                  <svg width={300} height={120} style={{marginTop: 20}}><path d="M 0 100 L 80 70 L 160 80 L 240 30 L 300 20" fill="none" stroke={BLUE} strokeWidth={8} /></svg>
                </div>
              </div>
              {t > 300.82 && <div style={{position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center'}}><Pill at={300.82} c={GREEN} size={30}>des familles qui les attendent chaque soir</Pill></div>}
            </> : <>
              <div style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center', gap: 14}}>{[{l: 'humanité', a: 308.9, c: RED}, {l: 'écoute', a: 310.7, c: BLUE}, {l: 'confiance', a: 312.26, c: GREEN}].map((x) => <Pill key={x.l} at={x.a} c={x.c} size={34}>+ {x.l}</Pill>)}</div>
              <div style={{position: 'absolute', left: 280, top: 130, transform: `scale(${pop(t, 313.6)})`}}><Cup size={400} t={t} /></div>
              {t > 315.8 && <div style={{position: 'absolute', left: 60, right: 60, top: 600, background: '#fff', border: `6px solid ${INK}`, borderRadius: 26, padding: '24px 30px', boxShadow: `8px 8px 0 ${GOLD}`, fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK, textAlign: 'center', transform: `scale(${spring(t, 315.8)})`}}>Comment intégrer, à votre niveau, <span style={{background: YEL}}>un peu de l’esprit du Café HSE</span> dans votre quotidien ?</div>}
              {t > 318.8 && <Dust n={26} c={GOLD} />}
            </>}
          </Abs>
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
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 0.8, s: 'validation', v: 0.18})), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.flatMap((r) => [{at: r.at - 1.2, s: 'soft-whoosh', v: 0.2, dur: 1.2}, {at: r.at, s: 'bass-hit', v: 0.33}, {at: r.at + 0.05, s: 'sfx/bell', v: 0.26}]),
  ...rep(6.0, 3, 0.2, 'sfx/swish', 0.25), {at: 6.4, s: 'sfx/pop', v: 0.3}, ...rep(8.18, 14, 0.1, 'tick', 0.1), {at: 9.6, s: 'sfx/ding', v: 0.25}, {at: 12.6, s: 'sfx/pop', v: 0.2},
  {at: 16.4, s: 'page', v: 0.35}, {at: 17.0, s: 'stylo', v: 0.35, dur: 4.2}, ...pops([19.4, 21.86]), {at: 23.3, s: 'deep-hit', v: 0.45}, {at: 23.4, s: 'bass-hit', v: 0.4}, {at: 24.66, s: 'tampon', v: 0.55},
  {at: 28.6, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 32.14, s: 'sfx/swish', v: 0.3}, {at: 33.3, s: 'validation', v: 0.3}, ...rep(34.6, 4, 0.3, 'sfx/pop', 0.18),
  {at: 38.22, s: 'sfx/ding', v: 0.3}, {at: 43.0, s: 'sfx/pop', v: 0.2}, {at: 47.6, s: 'soft-whoosh', v: 0.4, dur: 1.4}, {at: 49.0, s: 'sfx/thud', v: 0.3}, {at: 49.6, s: 'soft-whoosh', v: 0.3, dur: 1},
  {at: 60.2, s: 'sfx/pop', v: 0.25}, {at: 62.2, s: 'sfx/swish', v: 0.3}, {at: 65.58, s: 'tampon', v: 0.5}, ...[67.38, 68.9, 70.98].flatMap((a) => [{at: a, s: 'sfx/pop', v: 0.22}, {at: a + 1.0, s: 'sfx/thud', v: 0.3}]),
  {at: 78.6, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 80.6, s: 'sfx/swish', v: 0.25}, {at: 82.8, s: 'stylo', v: 0.3, dur: 3.2}, {at: 86.0, s: 'sfx/pop', v: 0.2},
  ...INGR.map((x) => ({at: x.a, s: 'bass-hit', v: 0.3})), {at: 107.4, s: 'deep-hit', v: 0.3}, {at: 116.4, s: 'soft-whoosh', v: 0.35, dur: 1.6},
  {at: 125.6, s: 'sfx/rise', v: 0.25, dur: 1.4}, ...rep(128.4, 5, 0.4, 'sfx/ding', 0.15), ...pops([128.6, 130.2]), {at: 133.82, s: 'sfx/bell', v: 0.2},
  {at: 136.0, s: 'page', v: 0.35}, ...rep(141.6, 18, 0.35, 'page', 0.12), {at: 148.0, s: 'deep-hit', v: 0.3},
  {at: 150.0, s: 'sfx/thud', v: 0.3}, {at: 152.1, s: 'deep-hit', v: 0.35}, {at: 157.3, s: 'stylo', v: 0.25, dur: 1.4}, ...pops([161.94, 163.3]),
  {at: 170.3, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 177.58, s: 'sfx/thud', v: 0.25}, {at: 182.4, s: 'tension', v: 0.3, dur: 2}, {at: 184.42, s: 'deep-hit', v: 0.3},
  ...searchCues(186.9, 16, 189.2, 189.7), ...pops([193.58, 196.66]), {at: 201.0, s: 'sfx/swish', v: 0.3}, {at: 201.3, s: 'cadenas', v: 0.4}, {at: 202.0, s: 'soft-whoosh', v: 0.4, dur: 1.2}, ...rep(202.6, 10, 0.2, 'sfx/ding', 0.1),
  {at: 212.4, s: 'sfx/pop', v: 0.2}, {at: 214.0, s: 'sfx/swish', v: 0.3}, {at: 219.9, s: 'deep-hit', v: 0.3}, ...pops([222.26, 222.9, 223.54], 0.18), {at: 225.5, s: 'cadenas', v: 0.35},
  {at: 227.9, s: 'sfx/rise', v: 0.25, dur: 1}, ...pops([230.38, 231.38, 232.34], 0.18), {at: 233.38, s: 'validation', v: 0.3},
  ...[235.5, 236.7, 237.9].map((a) => ({at: a, s: 'notification', v: 0.25})), {at: 239.0, s: 'soft-whoosh', v: 0.3, dur: 1.4}, {at: 240.86, s: 'bass-hit', v: 0.35},
  ...[247.7, 251.1].map((a) => ({at: a, s: 'sfx/swish', v: 0.3})), {at: 254.6, s: 'sfx/pop', v: 0.2}, {at: 255.2, s: 'sfx/rise', v: 0.3, dur: 1.8}, {at: 256.3, s: 'validation', v: 0.3},
  {at: 262.8, s: 'sfx/pop', v: 0.2}, {at: 263.3, s: 'sfx/swish', v: 0.3}, {at: 268.6, s: 'stylo', v: 0.2, dur: 3}, ...[273.26, 275.98, 280.58, 281.7].map((a) => ({at: a, s: 'sfx/ding', v: 0.22})), {at: 288.1, s: 'sfx/pop', v: 0.3}, {at: 289.4, s: 'sfx/bell', v: 0.3},
  {at: 294.3, s: 'sfx/pop', v: 0.2}, {at: 298.6, s: 'page', v: 0.45}, ...rep(299.4, 6, 0.15, 'sfx/pop', 0.15), {at: 300.82, s: 'sfx/ding', v: 0.25},
  ...pops([308.9, 310.7, 312.26], 0.22), {at: 313.6, s: 'sfx/rise', v: 0.25, dur: 1.2}, {at: 315.8, s: 'bass-hit', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<TK, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
export const CafeHse: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={5.9} to={56.7}><Question /></Gate>
    <Gate from={60.0} to={75.0}><Cafe /></Gate>
    <Gate from={78.3} to={122.25}><Architecture /></Gate>
    <Gate from={125.5} to={207.1}><Verites /></Gate>
    <Gate from={210.4} to={259.35}><Confiance /></Gate>
    <Gate from={262.6} to={OUTRO_AT}><Conseils /></Gate>
    {SECT.map((x, i) => { const C = TRANS[x.k]; return <Gate key={x.n} from={x.at} to={x.at + 3.7}><C i={i} /></Gate>; })}
    <Gate from={10} to={293}><StationBanner /></Gate>
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={321.8}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-cafe-hse-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Tile, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, BURG, Board, random, PhotoLetter, Watermark, IMG.poussiere, IMG.paperasse, IMG.groupe];
