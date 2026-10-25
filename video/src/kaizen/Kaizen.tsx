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
 * « Maîtriser la méthode Kaizen » (6 min 05, source NotebookLM) — capsule « condensé + effet wahou + ultra premium »
 * présentée en métro : 9 stations (PDCA → Gemba → sécurité → séquence → opérationnel/stratégique → 10 → 30 → 90 →
 * audit). Voix d'origine (la voix Isac sera substituée dès qu'ElevenLabs lève sa limite), sous-titres néo-brutalistes.
 * Kits capsule-ui-neo-brutal et capsule-recit-illustre. Couverture : photo + « MÉTHODE / KAIZEN » en lettres-photos
 * animées. Tube à six guichets = six parties (essence → objectifs → déploiement → limites → mesure → pérennité) ;
 * gyrophare, loupe, store vénitien, capsule pneumatique ; barre de recherche qui ouvre la feuille de route.
 */
const IMG = {
  cover: 'kaizen-gen/tableau.jpg',
  cMet: 'vingt-gen/montre.jpg',
  cKai: 'kaizen-gen/tableau.jpg',
  capot: 'vingt-gen/montre.jpg',
  gemba: 'kaizen-gen/gemba.jpg',
  comite: 'kaizen-gen/comite.jpg',
  standard: 'vingt-gen/5s.jpg',
  chrono: 'isoperf-gen/chrono.jpg',
  audit: 'kaizen-gen/audit.jpg',
  equipe: 'vingt-gen/final.jpg',
  route: 'isoperf-gen/amelioration.jpg',
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
const OUTRO_AT = 365.0;
export const KAIZEN_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 46.0, n: '1', title: 'L’essence du Kaizen', s: 'PDCA & Gemba', c: BLUE, g: 'essence', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 108.5, n: '2', title: 'Objectifs stratégiques', s: 'alignement risques HSE', c: GREEN, g: 'objectifs', k: 'loupe', lab: 'PARTIE 2 / 6'},
  {at: 153.6, n: '3', title: 'Le déploiement', s: '6 étapes de précision', c: ORANGE, g: 'déploiement', k: 'store', lab: 'PARTIE 3 / 6'},
  {at: 187.0, n: '4', title: 'Limites & cas d’usage', s: 'quand l’éviter', c: RED, g: 'limites', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 242.0, n: '5', title: 'Mesure & gouvernance', s: '10 · 30 · 90', c: VIO, g: 'mesure', k: 'tube', lab: 'PARTIE 5 / 6'},
  {at: 317.6, n: '6', title: 'Pérenniser l’excellence', s: 'audit & culture', c: GOLD, g: 'pérennité', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 357.0;
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

/* ═════════════ La ligne Kaizen (9 stations) ═════════════ */
const STATIONS = [
  {n: 1, l: 'Le PDCA, cœur du réacteur', s: 'PDCA', at: 53.0},
  {n: 2, l: 'Le Gemba : aller sur le terrain', s: 'Gemba', at: 85.0},
  {n: 3, l: 'La sécurité en premier', s: 'sécurité', at: 131.8},
  {n: 4, l: 'Respecter la séquence', s: 'séquence', at: 175.0},
  {n: 5, l: 'Opérationnel ≠ stratégique', s: 'opé/strat', at: 192.5},
  {n: 6, l: '10 indicateurs maximum', s: '10', at: 270.8},
  {n: 7, l: '30 jours par cycle PDCA', s: '30', at: 284.6},
  {n: 8, l: 'Standards revus tous les 90 jours', s: '90', at: 302.6},
  {n: 9, l: 'Un audit interne par an', s: 'audit', at: 330.6},
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

/* ═════════════ Kit néo-brutaliste ═════════════ */
const NBK = '#111';
const ACC = '#22B573';
const nb = (bg = '#fff', sh = 8): React.CSSProperties => ({background: bg, border: `4px solid ${NBK}`, borderRadius: 18, boxShadow: `${sh}px ${sh}px 0 ${NBK}`, boxSizing: 'border-box'});
const NBadge: React.FC<{at: number; text: string; bg?: string; rot?: number; size?: number}> = ({at, text, bg = ACC, rot = -10, size = 30}) => {
  const t = useT();
  if (t < at) return null;
  const sc = spring(t, at);
  return <div style={{display: 'inline-block', background: bg, color: '#fff', border: `4px solid ${NBK}`, borderRadius: 10, padding: '4px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: size, letterSpacing: 1, transform: `rotate(${rot}deg) scale(${lerp(1.5, 1, Math.min(1, sc))})`, boxShadow: `4px 4px 0 ${NBK}`, whiteSpace: 'nowrap'}}>{text}</div>;
};
const Chip: React.FC<{at: number; ic: string; l: string; c: string; w?: number}> = ({at, ic, l, c, w}) => {
  const t = useT();
  const on = t > at;
  return <div style={{...nb(on ? '#fff' : '#F1F1EA', 5), width: w, display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px 8px 8px', opacity: on ? 1 : 0.35, transform: `scale(${on ? Math.min(1.04, spring(t, at)) : 0.94})`}}><div style={{width: 56, height: 56, borderRadius: 12, background: on ? c : '#DDD', border: `3px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}><F n={ic} size={40} /></div><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: NBK}}>{l}</span>{on && <span style={{marginLeft: 'auto', fontSize: 26, fontWeight: 900, color: ACC}}>✓</span>}</div>;
};
const Cross: React.FC<{at: number; size?: number}> = ({at, size = 200}) => {
  const t = useT();
  const p1 = prog(t, at, at + 0.2), p2 = prog(t, at + 0.15, at + 0.35);
  return <svg width={size} height={size} viewBox="0 0 100 100" style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none'}}><path d="M 12 12 L 88 88" stroke={RED} strokeWidth={12} strokeLinecap="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - p1}} /><path d="M 88 12 L 12 88" stroke={RED} strokeWidth={12} strokeLinecap="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - p2}} /></svg>;
};
const BigNum: React.FC<{at: number; n: number; unit: string; c: string}> = ({at, n, unit, c}) => {
  const t = useT();
  return <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 16, opacity: pop(t, at), transform: `scale(${t > at ? spring(t, at) : 0.6})`}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 240, color: c, WebkitTextStroke: `6px ${NBK}`, lineHeight: 1}}>{t > at ? <Count n={n} a={at} b={at + 1.0} /> : '0'}</span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: NBK}}>{unit}</span></div>;
};
const PARTS = [
  {l: 'essence', ic: 'loupe', c: BLUE}, {l: 'objectifs', ic: 'cible', c: GREEN}, {l: '6 étapes', ic: 'engrenage', c: ORANGE},
  {l: 'limites', ic: 'stop', c: RED}, {l: 'mesure', ic: 'graphique', c: VIO}, {l: 'pérenniser', ic: 'trophee', c: GOLD},
];
const STEPS = [
  {l: 'cadrage', ic: 'clipboard', a: 160.6}, {l: 'cartographie', ic: 'carte', a: 163.0}, {l: 'conception', ic: 'ampoule', a: 165.6},
  {l: 'pilote', ic: 'fusee', a: 167.6}, {l: 'mesure', ic: 'graphique', a: 170.7}, {l: 'standardisation', ic: 'classeur', a: 174.2},
];

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
      <Abs x={0} y={545} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 18}}><div style={{...nb(NBK, 5), color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3, padding: '8px 22px'}}>LE DÉCRYPTAGE · 6 PARTIES</div><div style={{transform: 'rotate(-8deg)'}}><div style={{...nb(ACC, 5), color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 26, padding: '6px 16px'}}>PDCA</div></div></Abs>
      <Abs x={0} y={640} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="MÉTHODE" src={IMG.cMet} size={140} ls={4} /></Abs>
      <Abs x={0} y={820} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="KAIZEN" src={IMG.cKai} size={176} ls={8} seed={3} /></Abs>
      <Abs x={0} y={1040} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 42, color: NAVY}}>pas un slogan : <span style={{color: ACC}}>un système de gouvernance</span></Abs>
      <Abs x={40} y={1120} w={1000} style={{display: 'flex', justifyContent: 'center', gap: 12}}>{PARTS.map((p, k) => <div key={p.l} style={{...nb(p.c, 5), width: 150, height: 170, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#fff'}}>{k + 1}</div><F n={p.ic} size={64} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 20, color: '#fff'}}>{p.l}</span></div>)}</Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Intro : slogan de couloir → système → feuille de route ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const ph = t < 10.2 ? 0 : t < 25.6 ? 1 : t < 35.4 ? 2 : 3;
  const tear = prog(t, 9.0, 10.0, easeIn);
  return (
    <Out end={46.0}>
      {ph === 0 && (
        <>
          <HiLine words={['Un', 'slogan', 'de', 'couloir', '?']} mark={[1, 3]} at={5.6} y={330} size={64} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 0, top: 0, width: 960, height: 760, borderRadius: 24, background: 'linear-gradient(180deg, #E9E4D8, #D9D2C2)', border: `4px solid ${NBK}`, overflow: 'hidden', opacity: pop(t, 2.9)}}>
              <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 120, background: '#B9AE98', borderTop: `4px solid ${NBK}`}} />
              <div style={{position: 'absolute', left: 120, top: 120, width: 460, height: 420, background: '#fff', border: `6px solid ${NBK}`, boxShadow: `10px 10px 0 ${NBK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, transformOrigin: '0 0', transform: `rotate(${tear * 28}deg) translateY(${tear * 600}px)`, opacity: 1 - tear * 0.4}}>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 100, color: RED, letterSpacing: 6}}>KAIZEN</div><div style={{fontFamily: handFont, fontSize: 44, color: NBK}}>Amélioration continue !</div><F n="poing" size={90} />
                {[[16, 16], [404, 16]].map(([x, y], k) => <div key={k} style={{position: 'absolute', left: x, top: y, width: 24, height: 24, borderRadius: 12, background: RED, border: `3px solid ${NBK}`}} />)}
              </div>
              <div style={{position: 'absolute', left: 680, top: 260, width: 210, height: 380, borderRadius: 16, background: '#6B7280', border: `5px solid ${NBK}`, opacity: pop(t, 4.4)}}><div style={{margin: 20, height: 100, borderRadius: 10, background: NIGHT}} /><div style={{position: 'absolute', left: 50, bottom: 30}}><F n="chaud" size={110} /></div></div>
              {t > 9.6 && <div style={{position: 'absolute', left: 120, top: 120, width: 460, height: 420, border: `6px dashed ${NBK}66`}} />}
            </div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Sous', 'le', 'capot']} mark={[2]} at={11.0} y={330} size={70} />
          <Shot src={IMG.capot} ic="engrenage" x={60} y={440} w={960} h={420} at={10.3} c={BLUE} />
          <Abs x={60} y={890} w={960} h={480} style={{display: 'flex', flexDirection: 'column', gap: 14}}>
            <Chip at={14.4} ic="engrenage" l="un système de gouvernance ultra rigoureux" c={BLUE} />
            <Chip at={17.0} ic="graphique" l="basé sur des données factuelles" c={BLUE} />
            <Chip at={20.2} ic="medaille" l="intégré aux normes ISO" c={BLUE} />
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Dépasser', 'les', 'clichés']} mark={[0, 2]} at={26.0} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 20, display: 'flex', justifyContent: 'center', gap: 20}}>{['concept à la mode', 'slogan', 'campagne ponctuelle'].map((c, k) => <div key={c} style={{...nb('#F1F1EA', 5), position: 'relative', padding: '14px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: DIM, transform: `rotate(${(k - 1) * 4}deg)`, opacity: pop(t, 26.2 + k * 0.3)}}>« {c} »{t > 27.4 + k * 0.3 && <Cross at={27.4 + k * 0.3} size={120} />}</div>)}</div>
            <div style={{position: 'absolute', left: 230, top: 200, width: 500, height: 500, borderRadius: '50%', border: `14px dashed ${ACC}`, transform: `rotate(${t * 30}deg)`, opacity: pop(t, 29.0)}} />
            <div style={{position: 'absolute', left: 330, top: 300, width: 300, height: 300, borderRadius: '50%', ...nb(ACC, 8), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${t > 31.0 ? spring(t, 31.0) : 0})`}}><F n="bouclier" size={120} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', textAlign: 'center'}}>gestion des risques</span></div>
            {t > 33.6 && <div style={{position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center'}}><NBadge at={33.6} text="C’EST PARTI !" bg={RED} rot={-5} size={40} /></div>}
          </Abs>
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={['La', 'feuille', 'de', 'route']} mark={[1, 3]} at={36.0} y={330} size={66} />
          <SearchOpen x={60} y={440} w={960} h={930} at={35.5} query="méthode Kaizen" results={['Slogan de couloir', 'Feuille de route : 6 parties', 'Campagne de fin d’année']} found={1} foundAt={37.3} clickAt={37.7} c={BLUE}>
            <div style={{position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, padding: 30, alignContent: 'center'}}>{PARTS.map((p, k) => { const a = [38.6, 39.8, 41.0, 42.2, 43.1, 44.4][k]; return <div key={p.l} style={{...nb('#fff', 6), height: 170, display: 'flex', alignItems: 'center', gap: 16, padding: '0 18px', transform: `scale(${t > a ? spring(t, a) : 0})`}}><div style={{width: 90, height: 90, borderRadius: 18, background: p.c, border: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: '#fff'}}>{k + 1}</div><F n={p.ic} size={64} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: NBK}}>{p.l}</span></div>; })}</div>
          </SearchOpen>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 1 · L'ESSENCE : PDCA & GEMBA ═════════════ */
const Essence: React.FC = () => {
  const t = useT();
  const ph = t < 67.4 ? 0 : t < 81.8 ? 1 : 2;
  const Q = [{l: 'Planifier', c: BLUE, a: 55.6}, {l: 'Faire', c: GREEN, a: 56.3}, {l: 'Vérifier', c: GOLD, a: 56.9}, {l: 'Agir', c: RED, a: 57.4}];
  return (
    <Out end={108.5}>
      {ph === 0 && (
        <>
          <HiLine words={t < 58 ? ['Le', 'cœur', 'du', 'réacteur'] : ['Tous', 'les', 'jours']} mark={t < 58 ? [1, 3] : [0, 2]} at={t < 58 ? 51.5 : 61.0} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 180, top: 20, width: 600, height: 600, transform: `rotate(${t > 57.8 ? (t - 57.8) * 40 : 0}deg)`}}>
              {Q.map((q, k) => <div key={q.l} style={{position: 'absolute', left: k % 3 === 0 ? 0 : 300, top: k < 2 ? 0 : 300, width: 300, height: 300, background: q.c, border: `6px solid ${NBK}`, borderRadius: [`300px 0 0 0`, `0 300px 0 0`, `0 0 300px 0`, `0 0 0 300px`][k === 0 ? 0 : k === 1 ? 1 : k === 2 ? 2 : 3], boxSizing: 'border-box', opacity: t > q.a ? 1 : 0.15, transform: `scale(${t > q.a ? Math.min(1, spring(t, q.a)) : 0.9})`}}>
                <div style={{position: 'absolute', left: k % 3 === 0 ? 90 : 40, top: k < 2 ? 110 : 60, fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: '#fff', transform: `rotate(${t > 57.8 ? -(t - 57.8) * 40 : 0}deg)`}}>{q.l[0]}</div>
              </div>)}
              <div style={{position: 'absolute', left: 220, top: 220, width: 160, height: 160, borderRadius: 80, ...nb('#fff', 0), display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${t > 57.8 ? -(t - 57.8) * 40 : 0}deg)`}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: NBK}}>PDCA</span></div>
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 660, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap'}}>{Q.map((q) => <div key={q.l} style={{...nb(q.c, 4), padding: '6px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff', opacity: pop(t, q.a)}}>{q.l}</div>)}</div>
            {t > 63.8 && <div style={{position: 'absolute', left: 0, right: 0, top: 780, display: 'flex', justifyContent: 'center'}}><div style={{position: 'relative', ...nb('#F1F1EA', 5), padding: '8px 20px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: DIM}}>« coup de collier de fin d’année »<Cross at={65.4} size={110} /></div></div>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 75.1 ? ['Tester,', 'garder,', 'abandonner'] : ['Un', 'socle', 'ISO']} mark={t < 75.1 ? [0, 1, 2] : [1, 2]} at={t < 75.1 ? 69.0 : 76.0} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={930}>
            {t < 75.1 ? <>
              <div style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center'}}><Chip at={67.6} ic="loupe" l="repérer les écarts" c={BLUE} /></div>
              {[0, 1, 2, 3, 4].map((k) => { const keep = k === 1 || k === 3; const go = prog(t, 72.4, 73.8, easeInOut); return <div key={k} style={{...nb(keep && go > 0.5 ? '#E5F7EC' : '#fff', 5), position: 'absolute', left: 40 + k * 180 + (keep ? 0 : 0), top: 180 + go * (keep ? 360 : 260), width: 150, height: 150, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 69.0 + k * 0.25) * (keep ? 1 : 1 - go * 0.8), transform: `rotate(${keep ? 0 : go * (k - 2) * 20}deg)`}}><F n="ampoule" size={64} /><span style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: NBK}}>essai {k + 1}</span></div>; })}
              {t > 72.4 && <><div style={{position: 'absolute', left: 60, top: 720, ...nb(ACC, 5), padding: '8px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff'}}>✓ on standardise</div><div style={{position: 'absolute', right: 60, top: 640, ...nb(RED, 5), padding: '8px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff'}}>✕ on abandonne</div></>}
            </> : <>
              <div style={{position: 'absolute', left: 280, top: 60, width: 400, height: 300, transform: `rotate(${t * 30}deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="engrenage" size={300} /></div>
              <div style={{position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: NBK}}>KAIZEN</div>
              {['ISO 9001', 'ISO 45001'].map((s, k) => <div key={s} style={{...nb(k ? ORANGE : BLUE, 8), position: 'absolute', left: 120 + k * 380, top: 440, width: 340, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: '#fff', transform: `translateY(${(1 - pop(t, 79.6 + k * 0.6)) * 200}px)`, opacity: pop(t, 79.6 + k * 0.6)}}>{s}</div>)}
              <div style={{position: 'absolute', left: 120, top: 620, width: 720, height: 30, background: NBK, borderRadius: 8, opacity: pop(t, 77.0)}} />
              <div style={{position: 'absolute', left: 0, right: 0, top: 700, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM, opacity: pop(t, 77.2)}}>systèmes de management certifiés déjà en place</div>
            </>}
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 96.4 ? ['Le', 'Gemba'] : ['Se', 'salir', 'les', 'bottes']} mark={t < 96.4 ? [1] : [1, 3]} at={t < 96.4 ? 84.6 : 97.0} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{...nb('#E8F1FF'), position: 'absolute', left: 0, top: 0, width: 440, height: 360, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: pop(t, 86.8), filter: t > 92.4 ? 'grayscale(1) opacity(0.6)' : 'none'}}><div style={{display: 'flex', gap: 10}}><F n="homme-bureau" size={120} /><F n="froid" size={90} /></div><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: NBK, textAlign: 'center'}}>suppositions en salle climatisée</span>{t > 92.0 && <Cross at={92.0} size={260} />}</div>
            <div style={{position: 'absolute', right: 0, top: 0, width: 480, height: 360, borderRadius: 18, overflow: 'hidden', border: `4px solid ${NBK}`, boxShadow: `8px 8px 0 ${GREEN}`, opacity: pop(t, 92.4), transform: `scale(${t > 92.4 ? Math.min(1, spring(t, 92.4)) : 0.8})`}}><Pic src={IMG.gemba} ic="ouvrier" w={472} h={352} pos="50% 30%" /><div style={{position: 'absolute', left: 12, bottom: 12, ...nb(GREEN, 4), padding: '4px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff'}}>GEMBA = le terrain réel</div></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 410, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
              <Chip at={94.0} ic="yeux" l="observation physique" c={GREEN} w={620} />
              <Chip at={97.6} ic="chaussure" l="aller là où la valeur se crée" c={GREEN} w={620} />
              <Chip at={103.2} ic="pas" l="la toute première étape incontournable" c={GREEN} w={620} />
            </div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 2 · OBJECTIFS STRATÉGIQUES ═════════════ */
const Objectifs: React.FC = () => {
  const t = useT();
  const ph = t < 126.2 ? 0 : 1;
  const shuffle = t < 126.2 ? Math.sin(t * 3) : 0;
  const L = [{l: 'Sécurité', c: GREEN, a: 131.0, w: 860}, {l: 'Qualité', c: BLUE, a: 140.2, w: 620}, {l: 'Productivité', c: GOLD, a: 143.6, w: 380}];
  return (
    <Out end={153.6}>
      {ph === 0 && (
        <>
          <HiLine words={['On', 'commence', 'par', 'quoi', '?']} mark={[1, 3]} at={116.8} y={330} size={64} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{...nb('#fff'), position: 'absolute', left: 120, top: 0, width: 720, height: 180, display: 'flex', alignItems: 'center', gap: 20, padding: 24, opacity: pop(t, 114.2)}}><F n="equipe" size={110} /><span style={{fontFamily: handFont, fontSize: 40, color: NBK}}>Comité de pilotage : « on commence par quoi ? »</span></div>
            {[{l: 'Sécurité', c: GREEN}, {l: 'Qualité', c: BLUE}, {l: 'Productivité', c: GOLD}].map((x, k) => <div key={x.l} style={{...nb(x.c, 8), position: 'absolute', left: 130 + k * 250 + shuffle * (k - 1) * 40, top: 300 + Math.cos(t * 3 + k) * 30, width: 220, height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, transform: `rotate(${(k - 1) * 6 + shuffle * 5}deg)`, opacity: pop(t, 119.8 + k * 0.6)}}><F n={['casque', 'medaille', 'engrenage'][k]} size={110} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>{x.l}</span><span style={{fontSize: 60, fontWeight: 900, color: '#fff'}}>?</span></div>)}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 143.6 ? ['La', 'sécurité', 'en', 'premier'] : ['Un', 'effet', 'domino']} mark={t < 143.6 ? [1, 3] : [1, 2]} at={t < 143.6 ? 131.0 : 152.1} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            {t > 126.4 && <div style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center'}}><NBadge at={127.4} text="NON NÉGOCIABLE" bg={NBK} rot={-4} size={34} /></div>}
            {L.map((x, k) => <div key={x.l} style={{...nb(x.c, 8), position: 'absolute', left: 480 - x.w / 2, top: 560 - k * 170, width: x.w, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, transform: `translateY(${(1 - pop(t, x.a)) * -400}px)`, opacity: pop(t, x.a)}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>{k + 1}</span><F n={['casque', 'medaille', 'engrenage'][k]} size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff'}}>{x.l}</span></div>)}
            {t > 134.0 && t < 139.2 && <div style={{position: 'absolute', left: 0, right: 0, top: 750, display: 'flex', justifyContent: 'center', gap: 14}}><Chip at={135.0} ic="bouclier" l="stabilise le travail" c={GREEN} /><Chip at={137.2} ic="poignee" l="climat de confiance" c={GREEN} /></div>}
            {t > 148.8 && <div style={{position: 'absolute', left: 30, top: 760, width: 900, height: 120}}>{Array.from({length: 8}, (_, k) => { const f = prog(t, 149.6 + k * 0.18, 150.0 + k * 0.18, easeIn); return <div key={k} style={{position: 'absolute', left: k * 110, bottom: 0, width: 26, height: 110, background: RED, border: `3px solid ${NBK}`, borderRadius: 4, transformOrigin: '100% 100%', transform: `rotate(${f * 72}deg)`}} />; })}<div style={{position: 'absolute', right: 0, top: -50}}><NBadge at={149.0} text="8 GASPILLAGES" bg={RED} rot={4} size={24} /></div></div>}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 3 · LE DÉPLOIEMENT EN 6 ÉTAPES ═════════════ */
const Deploiement: React.FC = () => {
  const t = useT();
  const bar = prog(t, 160.0, 175.0, (x) => x);
  return (
    <Out end={187.0}>
      <HiLine words={t < 178.2 ? ['Une', 'mécanique', 'de', 'précision'] : ['Sans', 'bureaucratie', 'inutile']} mark={t < 178.2 ? [1, 3] : [1, 2]} at={t < 178.2 ? 157.6 : 185.0} y={330} size={60} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{...nb('#fff'), position: 'absolute', left: 0, top: 0, width: 960, height: 70, overflow: 'hidden', opacity: pop(t, 157.4)}}><div style={{width: `${bar * 100}%`, height: '100%', background: `repeating-linear-gradient(45deg, ${ORANGE} 0 20px, #F59B4A 20px 40px)`}} /><span style={{position: 'absolute', left: 20, top: 14, fontFamily: MONO, fontWeight: 700, fontSize: 26, color: NBK}}>DÉPLOIEMENT · {Math.round(bar * 6)}/6</span></div>
        <div style={{position: 'absolute', left: 0, top: 110, width: 960, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20}}>{STEPS.map((s, k) => <div key={s.l} style={{...nb(t > s.a ? '#fff' : '#F1F1EA', 6), height: 250, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: t > s.a ? 1 : 0.35, transform: `scale(${t > s.a ? Math.min(1.04, spring(t, s.a)) : 0.94})`}}><div style={{position: 'absolute', left: 14, top: 10, fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: ORANGE}}>{k + 1}</div><F n={s.ic} size={100} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: NBK}}>{s.l}</span>{t > s.a + 0.3 && <div style={{position: 'absolute', right: -12, top: -12, width: 44, height: 44, borderRadius: 22, background: ACC, border: `4px solid ${NBK}`, color: '#fff', fontWeight: 900, fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>✓</div>}</div>)}</div>
        <div style={{position: 'absolute', left: 0, top: 680, width: 960, height: 200}}>
          {Array.from({length: 14}, (_, k) => { const al = prog(t, 178.4, 180.4, easeInOut); const x0 = 60 + ((k * 211) % 840), y0 = 20 + ((k * 97) % 160); return <div key={k} style={{position: 'absolute', left: lerp(x0, 40 + k * 64, al), top: lerp(y0, 90, al), width: 30, height: 30, borderRadius: 15, background: al > 0.9 ? ACC : DIM, border: `3px solid ${NBK}`, opacity: pop(t, 178.3)}} />; })}
          {t > 181.6 && <div style={{position: 'absolute', right: 0, top: -10}}><NBadge at={181.6} text="ALIGNÉ ISO" bg={ACC} rot={-4} size={26} /></div>}
          {t > 185.0 && <div style={{position: 'absolute', left: 0, top: -10, ...nb('#F1F1EA', 4), padding: '4px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: DIM}}>bureaucratie<Cross at={185.3} size={70} /></div>}
        </div>
      </Abs>
    </Out>
  );
};

/* ═════════════ 4 · LIMITES ET CAS D'USAGE ═════════════ */
const Limites: React.FC = () => {
  const t = useT();
  const ph = t < 215.8 ? 0 : t < 228.6 ? 1 : 2;
  const fall = prog(t, 234.6, 236.0, easeIn);
  return (
    <Out end={242.0}>
      {ph === 0 && (
        <>
          <HiLine words={t < 207 ? ['Opérationnel', '≠', 'stratégique'] : ['La', 'coordination', 'active']} mark={t < 207 ? [0, 2] : [1, 2]} at={t < 207 ? 192.2 : 207.6} y={330} size={60} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{...nb('#fff'), position: 'absolute', left: 0, top: 0, width: 450, height: 560, padding: 20, opacity: pop(t, 191.4)}}>
              <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: RED}}>KAIZEN OPÉRATIONNEL</div>
              <div style={{display: 'flex', justifyContent: 'center', margin: '20px 0'}}><div style={{transform: `rotate(${t * 180}deg)`}}><F n="chrono" size={150} /></div></div>
              <Chip at={196.0} ic="outils" l="un poste de travail" c={RED} /><div style={{height: 12}} /><Chip at={198.8} ic="eclair" l="cycles très rapides" c={RED} />
            </div>
            <div style={{...nb('#fff'), position: 'absolute', right: 0, top: 0, width: 450, height: 560, padding: 20, opacity: pop(t, 201.4)}}>
              <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: NAVY}}>KAIZEN STRATÉGIQUE</div>
              <div style={{position: 'relative', height: 190, margin: '10px 0'}}>{[[60, 40], [200, 100], [320, 30], [130, 140]].map(([x, y], k) => <div key={k} style={{position: 'absolute', left: x, top: y, transform: `scale(${t > 202.6 + k * 0.25 ? spring(t, 202.6 + k * 0.25) : 0})`}}><F n="usine" size={70} /></div>)}</div>
              <Chip at={202.4} ic="engrenage" l="processus entiers" c={NAVY} /><div style={{height: 12}} /><Chip at={205.0} ic="telescope" l="vision moyen terme" c={NAVY} />
            </div>
            {t > 208.4 && <div style={{position: 'absolute', left: 0, right: 0, top: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}><svg width={600} height={80}><path d="M 100 70 Q 300 -20 500 70" fill="none" stroke={ACC} strokeWidth={10} strokeDasharray="20 12" strokeDashoffset={-t * 60} pathLength={1} /></svg><div style={{display: 'flex', gap: 14}}><Chip at={209.6} ic="calendrier" l="comités mensuels" c={ACC} /><Chip at={213.4} ic="medaille" l="objectifs ISO 9001" c={ACC} /></div></div>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Pas', 'une', 'baguette', 'magique']} mark={[2, 3]} at={219.0} y={330} size={64} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 330, top: 0, width: 300, height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${Math.sin(t * 4) * 10}deg)`}}><F n="etoile" size={200} />{t > 219.8 && <Cross at={219.8} size={260} />}</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
              {[{l: 'un investissement financier lourd', ic: 'argent', a: 222.5}, {l: 'des travaux d’ingénierie massifs', ic: 'grue', a: 223.8}, {l: 'une mise aux normes réglementaire', ic: 'juge', a: 226.7}].map((x) => <div key={x.l} style={{...nb('#FDE8E8', 6), width: 760, height: 130, display: 'flex', alignItems: 'center', gap: 20, padding: '0 24px', opacity: pop(t, x.a)}}><F n={x.ic} size={80} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: NBK}}>ne remplace pas {x.l}</span></div>)}
            </div>
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 235.4 ? ['Sans', 'standards,', 'il', 's’effondre'] : ['Optimiser,', 'pas', 'éteindre', 'le', 'feu']} mark={t < 235.4 ? [1, 3] : [0, 2]} at={t < 235.4 ? 231.0 : 236.2} y={330} size={58} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 60, height: 60, background: `repeating-linear-gradient(90deg, #8A6E4B 0 40px, #6B5235 40px 80px)`, border: `4px solid ${NBK}`, borderRadius: 10}} />
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 130, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>sol : pas de discipline, pas de standards de base</div>
            {['KAI', 'ZEN', 'PDCA', 'STD'].map((b, k) => <div key={b} style={{...nb([BLUE, GREEN, GOLD, RED][k], 6), position: 'absolute', left: 360 + Math.sin(k * 2.3) * fall * 300, top: 520 - k * 130 + fall * (k * 120 + 100), width: 240, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff', transform: `rotate(${fall * (k % 2 ? 40 : -50)}deg)`, opacity: pop(t, 229.2 + k * 0.2)}}>{b}</div>)}
            {t > 236.0 && <div style={{position: 'absolute', left: 0, right: 0, top: 30, display: 'flex', justifyContent: 'center', gap: 20}}><Chip at={236.4} ic="engrenage" l="optimiser & sécuriser l’existant" c={ACC} /><div style={{position: 'relative', ...nb('#F1F1EA', 5), padding: 10}}><F n="extincteur" size={70} /><Cross at={239.4} size={100} /></div></div>}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 5 · MESURE & GOUVERNANCE ═════════════ */
const Mesure: React.FC = () => {
  const t = useT();
  const ph = t < 266.5 ? 0 : t < 284.4 ? 1 : t < 300.4 ? 2 : 3;
  const net = prog(t, 252.6, 258.0, easeOut);
  return (
    <Out end={317.6}>
      {ph === 0 && (
        <>
          <HiLine words={t < 259.6 ? ['Changer', 'de', 'dimension'] : ['Une', 'maîtrise', 'systémique']} mark={t < 259.6 ? [0, 2] : [1, 2]} at={t < 259.6 ? 252.8 : 262.0} y={330} size={64} />
          <Shot src={IMG.comite} ic="equipe" x={60} y={440} w={960} h={320} at={245.6} c={VIO} />
          <Abs x={60} y={790} w={960} h={930} style={{...nb(NIGHT), overflow: 'hidden', opacity: pop(t, 245.8), transform: 'scale(0.62)', transformOrigin: '50% 0'}}>
            {Array.from({length: 9}, (_, k) => { const a = (k / 9) * Math.PI * 2; const x = 480 + Math.cos(a) * 320 * net, y = 440 + Math.sin(a) * 300 * net; return <React.Fragment key={k}><svg style={{position: 'absolute', left: 0, top: 0}} width={952} height={922}><line x1={480} y1={440} x2={x} y2={y} stroke={ACC} strokeWidth={4} strokeDasharray="10 8" strokeDashoffset={-t * 40} opacity={net} /></svg><div style={{position: 'absolute', left: x - 40, top: y - 40, width: 80, height: 80, borderRadius: 40, background: '#1E2638', border: `4px solid ${ACC}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: net}}><F n="outils" size={44} /></div></React.Fragment>; })}
            <div style={{position: 'absolute', left: 380, top: 340, width: 200, height: 200, borderRadius: 100, background: VIO, border: `5px solid #fff`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${lerp(0.5, 1, net)})`}}><F n="calendrier" size={80} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 20, color: '#fff', textAlign: 'center'}}>comité mensuel</span></div>
            <div style={{position: 'absolute', left: 24, top: 18, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: GOLD}}>{net < 0.5 ? 'UN ATELIER LOCAL…' : 'UN PROGRAMME ROBUSTE'}</div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['La', 'règle', 'd’or']} mark={[1, 2]} at={268.4} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930}>
            <BigNum at={268.9} n={10} unit="indicateurs max" c={VIO} />
            <div style={{position: 'absolute', left: 0, top: 340, width: 960, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14}}>{Array.from({length: 10}, (_, k) => <div key={k} style={{...nb('#fff', 4), height: 110, display: 'flex', alignItems: 'flex-end', padding: 10, gap: 4, transform: `scale(${t > 270.8 + k * 0.12 ? spring(t, 270.8 + k * 0.12) : 0})`}}>{[0.4, 0.7, 0.55].map((h, j) => <div key={j} style={{flex: 1, height: `${h * 100}%`, background: k % 2 ? VIO : NBK, borderRadius: 3}} />)}</div>)}</div>
            {t > 274.0 && <div style={{position: 'absolute', left: 0, right: 0, top: 640, display: 'flex', justifyContent: 'center', gap: 14}}><div style={{position: 'relative', ...nb('#F1F1EA', 5), padding: '8px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: DIM}}>fatigue des tableaux de bord<Cross at={275.6} size={90} /></div><Chip at={280.8} ic="eclair" l="décision accélérée" c={VIO} /></div>}
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['30', 'jours', 'par', 'cycle']} mark={[0, 1]} at={284.6} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 230, top: 0, width: 500, height: 500}}>
              <svg width={500} height={500}><circle cx={250} cy={250} r={210} fill="none" stroke="#E3E8EF" strokeWidth={40} /><circle cx={250} cy={250} r={210} fill="none" stroke={VIO} strokeWidth={40} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - prog(t, 284.6, 287.6, (x) => x)} transform="rotate(-90 250 250)" /></svg>
              <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 150, color: NBK, lineHeight: 1}}>{t > 282.2 ? <Count n={30} a={282.6} b={284.0} /> : '0'}</span><span style={{fontFamily: MONO, fontWeight: 700, fontSize: 28, color: VIO}}>JOURS · 1 PDCA</span></div>
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 560, display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap'}}><Chip at={290.4} ic="fusee" l="force l’action" c={VIO} /><Chip at={292.6} ic="cerveau" l="apprentissage rapide" c={VIO} /></div>
            {t > 297.4 && <div style={{position: 'absolute', left: 0, right: 0, top: 700, display: 'flex', justifyContent: 'center', gap: 12}}>{['on teste', 'on évalue', 'on décide'].map((x, k) => <NBadge key={x} at={297.6 + k * 0.6} text={x} bg={[BLUE, GOLD, ACC][k]} rot={(k - 1) * 4} size={30} />)}</div>}
          </Abs>
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={t < 307.4 ? ['Revus', 'tous', 'les', '90', 'jours'] : ['L’antidote', 'aux', 'habitudes']} mark={t < 307.4 ? [0, 3, 4] : [0, 2]} at={t < 307.4 ? 302.6 : 308.0} y={330} size={60} />
          <Abs x={60} y={440} w={960} h={930}>
            <BigNum at={301.2} n={90} unit="jours" c={VIO} />
            <div style={{position: 'absolute', left: 0, top: 320, width: 960, display: 'flex', justifyContent: 'space-between'}}>{['T1', 'T2', 'T3', 'T4'].map((q, k) => <div key={q} style={{...nb(t > 303.6 + k * 0.4 ? '#fff' : '#F1F1EA', 5), width: 210, height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, transform: `scale(${t > 303.6 + k * 0.4 ? spring(t, 303.6 + k * 0.4) : 0.9})`}}><F n="calendrier" size={80} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: NBK}}>revue {q}</span></div>)}</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 570, display: 'flex', justifyContent: 'center', gap: 16}}><Chip at={308.6} ic="pilule" l="antidote aux mauvaises habitudes" c={VIO} /></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 690, display: 'flex', justifyContent: 'center', gap: 16}}><Chip at={313.0} ic="classeur" l="traçabilité pour les auditeurs" c={VIO} /></div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 6 · PÉRENNISER ═════════════ */
const Perenniser: React.FC = () => {
  const t = useT();
  const ph = t < 343.8 ? 0 : 1;
  const drift = 1 - prog(t, 326.4, 327.6, easeInOut);
  const spine = prog(t, 358.6, 361.4, (x) => x);
  return (
    <Out end={OUTRO_AT}>
      {ph === 0 && (
        <>
          <HiLine words={t < 330.2 ? ['Relier', 'à', 'l’ISO', '19011'] : ['Un', 'audit', 'interne', 'par', 'an']} mark={t < 330.2 ? [0, 3] : [1, 2]} at={t < 330.2 ? 324.4 : 330.6} y={330} size={60} />
          <Abs x={60} y={440} w={960} h={930}>
            {t < 330.2 ? <>
              <svg style={{position: 'absolute', left: 0, top: 0}} width={960} height={500}><path d={`M 60 250 C 300 250, 500 ${250 + drift * 180}, 900 ${250 + drift * 220}`} fill="none" stroke={drift > 0.5 ? RED : ACC} strokeWidth={12} strokeDasharray="24 14" strokeDashoffset={-t * 60} /></svg>
              <div style={{position: 'absolute', left: 30, top: 200, ...nb(GOLD, 5), padding: '10px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>KAIZEN</div>
              <div style={{position: 'absolute', right: 30, top: 200 + drift * 220, ...nb(drift > 0.5 ? RED : ACC, 5), padding: '10px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>{drift > 0.5 ? 'dérive…' : 'ISO 19011 ✓'}</div>
              <div style={{position: 'absolute', left: 380, top: 520, transform: `scale(${t > 326.4 ? spring(t, 326.4) : 0})`}}><F n="maillon" size={200} /></div>
            </> : <>
              <Shot src={IMG.audit} ic="auditeur" x={0} y={0} w={960} h={340} at={330.4} c={GOLD} />
              <div style={{position: 'absolute', left: 0, right: 0, top: 370, display: 'flex', justifyContent: 'center', gap: 20}}><div style={{position: 'relative', ...nb('#F1F1EA', 5), padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 10}}><F n="badge" size={60} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: DIM}}>jouer aux gendarmes</span><Cross at={335.9} size={120} /></div></div>
              <div style={{position: 'absolute', left: 0, right: 0, top: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}><Chip at={337.4} ic="coeur" l="vitalité des rituels" c={GOLD} w={620} /><Chip at={339.4} ic="balance" l="décisions qui tiennent la route" c={GOLD} w={620} /><Chip at={341.4} ic="clipboard" l="respect strict des standards" c={GOLD} w={620} /></div>
            </>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 356.8 ? ['Une', 'culture', 'du', 'progrès'] : ['La', 'colonne', 'vertébrale']} mark={t < 356.8 ? [1, 3] : [1, 2]} at={t < 356.8 ? 346.0 : 358.0} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            {t < 356.8 ? <>
              <div style={{...nb('#fff', 10), position: 'absolute', left: 60, top: 20, width: 840, padding: '34px 40px', opacity: pop(t, 344.2)}}><div style={{position: 'absolute', left: 20, top: -50, fontFamily: 'Georgia, serif', fontSize: 140, color: GOLD}}>“</div><span style={{fontFamily: sansFont, fontWeight: 800, fontSize: 46, color: NBK, lineHeight: 1.3}}>Le Kaizen, c’est une culture du <span style={{background: YEL}}>progrès utile</span>, observable et reproductible.</span></div>
              <div style={{position: 'absolute', left: 0, right: 0, top: 400, display: 'flex', justifyContent: 'center', gap: 16}}>{['utile', 'observable', 'reproductible'].map((x, k) => <NBadge key={x} at={348.4 + k * 0.7} text={x.toUpperCase()} bg={[ACC, BLUE, GOLD][k]} rot={(k - 1) * 5} size={32} />)}</div>
              {t > 351.0 && <div style={{position: 'absolute', left: 0, right: 0, top: 560, display: 'flex', justifyContent: 'center'}}><div style={{position: 'relative', ...nb('#F1F1EA', 5), padding: '10px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: DIM}}>« un énième projet parallèle »<Cross at={352.4} size={110} /></div></div>}
            </> : <>
              <div style={{position: 'absolute', left: 380, top: 0, width: 200, height: 760}}>{Array.from({length: 9}, (_, k) => { const on = spine * 9 > k; return <div key={k} style={{position: 'absolute', left: 30 + Math.sin(k * 0.6) * 18, top: k * 82, width: 140, height: 64, borderRadius: 22, background: on ? GOLD : '#E3E8EF', border: `4px solid ${NBK}`, boxShadow: on ? `0 0 26px ${GOLD}` : 'none'}} />; })}</div>
              {['QHSE', 'ADN', 'routines'].map((x, k) => <div key={x} style={{position: 'absolute', left: k % 2 ? 640 : 60, top: 140 + k * 220}}><NBadge at={359.4 + k * 0.8} text={x} bg={[NAVY, ACC, VIO][k]} rot={k % 2 ? 6 : -6} size={34} /></div>)}
              {t > 360.0 && <Dust n={26} c={GOLD} />}
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
const ticks = (L: number[], v = 0.18): Sfx[] => L.map((a) => ({at: a + 0.15, s: 'validation', v}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 0.8, s: 'validation', v: 0.18})), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.flatMap((r) => [{at: r.at - 1.2, s: 'soft-whoosh', v: 0.2, dur: 1.2}, {at: r.at, s: 'bass-hit', v: 0.33}, {at: r.at + 0.05, s: 'sfx/bell', v: 0.26}]),
  {at: 2.9, s: 'sfx/pop', v: 0.2}, {at: 4.4, s: 'sfx/thud', v: 0.2}, {at: 9.0, s: 'page', v: 0.5}, {at: 9.6, s: 'sfx/thud', v: 0.35},
  {at: 10.3, s: 'soft-whoosh', v: 0.3, dur: 1}, ...ticks([14.4, 17.0, 20.2]), ...pops([26.2, 26.5, 26.8]), ...[27.4, 27.7, 28.0].map((a) => ({at: a, s: 'sfx/swish', v: 0.25})), {at: 31.0, s: 'bass-hit', v: 0.35}, {at: 33.6, s: 'tampon', v: 0.5},
  ...searchCues(35.5, 14, 37.3, 37.7), ...pops([38.6, 39.8, 41.0, 42.2, 43.1, 44.4], 0.18),
  ...[55.6, 56.3, 56.9, 57.4].map((a) => ({at: a, s: 'sfx/ding', v: 0.22})), {at: 57.0, s: 'soft-whoosh', v: 0.3, dur: 1.4}, {at: 65.4, s: 'sfx/swish', v: 0.3},
  ...ticks([67.6]), ...rep(69.0, 5, 0.25, 'sfx/pop', 0.15), {at: 72.4, s: 'soft-whoosh', v: 0.35, dur: 1.4}, {at: 73.8, s: 'validation', v: 0.25}, {at: 77.0, s: 'sfx/thud', v: 0.3}, {at: 79.6, s: 'sfx/thud', v: 0.35}, {at: 80.2, s: 'sfx/thud', v: 0.35},
  {at: 86.8, s: 'sfx/pop', v: 0.2}, {at: 92.0, s: 'sfx/swish', v: 0.3}, {at: 92.4, s: 'soft-whoosh', v: 0.3, dur: 1}, ...ticks([94.0, 97.6, 103.2]),
  {at: 114.2, s: 'sfx/pop', v: 0.22}, ...pops([119.8, 120.4, 121.0]), {at: 127.4, s: 'tampon', v: 0.5}, ...[131.0, 140.2, 143.6].map((a) => ({at: a, s: 'sfx/thud', v: 0.4})), ...ticks([135.0, 137.2]), ...rep(149.6, 8, 0.18, 'sfx/click', 0.22), {at: 149.0, s: 'tampon', v: 0.35},
  {at: 157.4, s: 'sfx/pop', v: 0.2}, ...STEPS.flatMap((x) => [{at: x.a, s: 'sfx/thud', v: 0.25}, {at: x.a + 0.3, s: 'validation', v: 0.15}]), {at: 178.4, s: 'sfx/rise', v: 0.25, dur: 2}, {at: 181.6, s: 'tampon', v: 0.35}, {at: 185.3, s: 'sfx/swish', v: 0.3},
  {at: 191.4, s: 'sfx/pop', v: 0.2}, {at: 201.4, s: 'sfx/pop', v: 0.2}, ...ticks([196.0, 198.8, 202.4, 205.0]), {at: 208.4, s: 'soft-whoosh', v: 0.3, dur: 1.2}, ...ticks([209.6, 213.4]),
  {at: 219.8, s: 'sfx/swish', v: 0.35}, ...[221.8, 223.8, 225.8].map((a) => ({at: a, s: 'deep-hit', v: 0.22})), ...rep(229.2, 4, 0.2, 'sfx/thud', 0.2), {at: 234.6, s: 'deep-hit', v: 0.4}, {at: 235.4, s: 'sfx/thud', v: 0.45}, ...ticks([236.4]), {at: 239.4, s: 'sfx/swish', v: 0.3},
  {at: 245.8, s: 'sfx/pop', v: 0.2}, {at: 252.6, s: 'sfx/rise', v: 0.3, dur: 2}, ...rep(253.0, 9, 0.3, 'sfx/pop', 0.12),
  {at: 268.9, s: 'bass-hit', v: 0.4}, ...rep(268.9, 10, 0.1, 'tick', 0.1), ...rep(270.8, 10, 0.12, 'sfx/pop', 0.12), {at: 275.6, s: 'sfx/swish', v: 0.3}, ...ticks([280.8]),
  ...rep(282.6, 14, 0.1, 'tick', 0.1), {at: 284.6, s: 'sfx/rise', v: 0.25, dur: 3}, ...ticks([290.4, 292.6]), ...[297.6, 298.2, 298.8].map((a) => ({at: a, s: 'tampon', v: 0.25})),
  {at: 301.2, s: 'bass-hit', v: 0.4}, ...rep(301.2, 10, 0.1, 'tick', 0.1), ...pops([303.6, 304.0, 304.4, 304.8]), ...ticks([308.6, 313.0]),
  {at: 324.4, s: 'tension', v: 0.2, dur: 2}, {at: 326.4, s: 'cadenas', v: 0.35}, {at: 330.4, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 335.9, s: 'sfx/swish', v: 0.3}, ...ticks([337.4, 339.4, 341.4]),
  {at: 344.2, s: 'page', v: 0.35}, ...[348.4, 349.1, 349.8].map((a) => ({at: a, s: 'tampon', v: 0.3})), {at: 352.4, s: 'sfx/swish', v: 0.3}, {at: 358.6, s: 'sfx/rise', v: 0.3, dur: 3}, ...[359.4, 360.2, 361.0].map((a) => ({at: a, s: 'sfx/ding', v: 0.22})),
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<TK, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
export const Kaizen: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.8} to={46.1}><Intro /></Gate>
    <Gate from={49.3} to={108.6}><Essence /></Gate>
    <Gate from={111.8} to={153.7}><Objectifs /></Gate>
    <Gate from={156.9} to={187.1}><Deploiement /></Gate>
    <Gate from={190.3} to={242.1}><Limites /></Gate>
    <Gate from={245.3} to={317.7}><Mesure /></Gate>
    <Gate from={320.9} to={OUTRO_AT}><Perenniser /></Gate>
    {SECT.map((x, i) => { const C = TRANS[x.k]; return <Gate key={x.n} from={x.at} to={x.at + 3.7}><C i={i} /></Gate>; })}
    <Gate from={10} to={334}><StationBanner /></Gate>
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={364.9}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-kaizen-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, Board, random, PhotoLetter, Watermark, Captions, Pill, Stamp, Strike, TEAL, IMG.standard, IMG.chrono, IMG.equipe, IMG.route];
