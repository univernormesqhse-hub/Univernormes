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
 * « AMDEC — modes de défaillance, effets et criticité » (voix d'origine, 1 min 04) — capsule « condensé + effet wahou
 * + ultra premium » présentée en métro (7 stations). Tube de verre à six guichets : définition → objectifs → principe
 * → criticité → exemple → actions ; la capsule file d'un guichet à l'autre. Capsule pneumatique, gyrophare, loupe,
 * store vénitien, éclair de gyrophare final ; barre de recherche « AMDEC » qui ouvre le sigle déplié. Techniques :
 * 3 cibles avec ondes « effets », barres de risques qui se trient toutes seules (hiérarchiser), train de 4
 * engrenages qui s'engrènent un à un (mode → causes → effets → criticité) + réglette de cotation, 3 jauges G/F/D qui
 * convergent vers la criticité, pompe industrielle animée (roue qui tourne, fuite qui goutte, moteur qui chauffe,
 * roulement qui vibre, moteur en panne) puis remise en état, 3 actions animées (calendrier qui se coche, clé,
 * pièce usée remplacée par une neuve), défaillances barrées. Kits capsule-ui-neo-brutal et capsule-recit-illustre.
 * Image ChatGPT de l'utilisateur : l'équipe de maintenance devant la pompe (panoramique, pompe entourée), qui se
 * transforme en pompe animée.
 */
const IMG = {
  cover: 'principes-gen/conception.jpg',
  c1: 'principes-gen/conception.jpg',
  c2: 'audit13-gen/metrologie.jpg',
  pompe: 'amdec-gen/pompe-maintenance.jpg',
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
const OUTRO_AT = 64.6;
export const AMDEC_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '1', title: 'AMDEC ?', s: 'modes de défaillance', c: RED, g: 'définition', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 7.0, n: '2', title: 'Les objectifs', s: 'identifier · étudier · hiérarchiser', c: BLUE, g: 'objectifs', k: 'tube', lab: 'GUICHET 2 / 6'},
  {at: 16.3, n: '3', title: 'Le principe', s: 'mode de défaillance', c: ORANGE, g: 'principe', k: 'gyro', lab: 'GUICHET 3 / 6'},
  {at: 28.45, n: '4', title: 'La criticité', s: 'gravité · fréquence · détectabilité', c: GREEN, g: 'criticité', k: 'none', lab: 'GUICHET 4 / 6'},
  {at: 35.2, n: '5', title: 'Exemple concret', s: 'une pompe industrielle', c: NAVY, g: 'exemple', k: 'loupe', lab: 'GUICHET 5 / 6'},
  {at: 49.2, n: '6', title: 'Les actions', s: 'prioritaires', c: VIO, g: 'actions', k: 'store', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 63.6;
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
  {n: 1, l: 'AMDEC', s: 'AMDEC', at: 3.5},
  {n: 2, l: 'Objectifs', s: 'objectifs', at: 10.7},
  {n: 3, l: 'Principe', s: 'principe', at: 20.0},
  {n: 4, l: 'Criticité', s: 'criticité', at: 28.6},
  {n: 5, l: 'Pompe', s: 'pompe', at: 38.9},
  {n: 6, l: 'Actions', s: 'actions', at: 53.9},
  {n: 7, l: 'Anticiper', s: 'anticiper', at: 59.0},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE AMDEC · STATION {r.n} / 7</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="danger" w={1080} h={820} pos="50% 50%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 24%, ${PAPER}CC 32%, ${PAPER} 37%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={640} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="MODES DE DÉFAILLANCE" src={IMG.c2} size={72} ls={1} seed={2} /></Abs>
      <Abs x={0} y={760} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="ET CRITICITÉ :" src={IMG.c2} size={96} ls={2} seed={5} /></Abs>
      <Abs x={0} y={880} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="AMDEC" src={IMG.c1} size={230} ls={8} /></Abs>
      <Abs x={40} y={1170} w={1000} style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10}}>{[['MODE', ORANGE], ['CAUSES', RED], ['EFFETS', BLUE], ['CRITICITÉ', GREEN]].map(([n, c], k) => <div key={n} style={{...nb(c, 4), padding: '6px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', transform: `translateY(${(1 - Math.min(1, spring(t, 0.3 + k * 0.08))) * 60}px)`}}>{n}</div>)}</Abs>
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





/* ═════════════ Guichet 1 : AMDEC ? → recherche → sigle déplié ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const w = (a: number) => prog(t, a, a + 0.5, easeOut);
  const L: [string, string, number, string][] = [['A', 'nalyse des', 3.8, RED], ['M', 'odes de', 3.95, ORANGE], ['D', 'éfaillance', 4.1, GOLD], ['E', 'ffets', 4.58, BLUE], ['C', 'riticité', 5.74, GREEN]];
  return (
    <Out end={7.1}>
      <Heads h={[[2.85, ['AMDEC', '?'], [0]], [3.8, ['Modes', 'de', 'défaillance'], [0, 2]], [5.74, ['Effets', 'et', 'criticité'], [0, 2]]]} />
      <SearchOpen x={60} y={440} w={960} h={900} at={2.6} query="AMDEC" results={['AMDEC · modes de défaillance', 'HAZOP · dangers et opérabilité', 'APR · analyse préliminaire des risques']} found={0} foundAt={3.2} clickAt={3.55} c={RED}>
        <div style={{position: 'absolute', left: 90, right: 60, top: 70, display: 'flex', flexDirection: 'column', gap: 6}}>
          {L.map(([a, rest, at, c]) => (
            <div key={a} style={{display: 'flex', alignItems: 'baseline', fontFamily: sansFont, fontWeight: 900, opacity: pop(t, at - 0.1)}}>
              <span style={{fontSize: 104, color: c, width: 110, textAlign: 'center'}}>{a}</span>
              <span style={{fontSize: 62, color: INK, display: 'inline-block', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: w(at) * 560}}>{rest}</span>
            </div>
          ))}
        </div>
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ Guichet 2 : objectifs — 3 cibles, effets, hiérarchie qui se trie ═════════════ */
const TARGETS: [string, string, number, string][] = [['Équipement', 'engrenage', 10.7, BLUE], ['Produit', 'colis', 11.0, ORANGE], ['Processus', 'courbe', 11.8, VIO]];
const BARS: [string, number, string][] = [['Risque B', 0.55, ORANGE], ['Risque A', 0.95, RED], ['Risque C', 0.3, GOLD]];
const Objectifs: React.FC = () => {
  const t = useT();
  const sortP = prog(t, 14.1, 14.9, easeInOut);
  const order = [...BARS].map((b, i) => ({b, i})).sort((x, y) => y.b[1] - x.b[1]).map((x) => x.i);
  return (
    <Out end={16.4}>
      <Heads h={[[10.7, ['Identifier', 'les', 'défaillances'], [2]], [12.58, ['Étudier', 'leurs', 'effets'], [2]], [13.86, ['Hiérarchiser', 'les', 'risques'], [0]]]} />
      {TARGETS.map(([l, ic, at, c], i) => {
        const s0 = Math.min(1, spring(t, at, 9, 12));
        return (
          <Abs key={l} x={60 + i * 330} y={450} w={300} h={300} style={{opacity: t > at ? 1 : 0, transform: `scale(${s0})`}}>
            <div style={{position: 'absolute', inset: 0, ...nb('#fff', 7), borderColor: c}} />
            <div style={{position: 'absolute', left: 0, right: 0, top: 36, display: 'flex', justifyContent: 'center'}}><F n={ic} size={130} /></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 200, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: c}}>{l}</div>
            {t > 12.58 && t < 13.9 && [0, 0.35].map((o) => { const q = Math.max(0, Math.min(1, (t - 12.58 - o) / 0.9)); return q > 0 ? <div key={o} style={{position: 'absolute', left: 150 - 260 * q, top: 150 - 260 * q, width: 520 * q, height: 520 * q, borderRadius: '50%', border: `${8 * (1 - q)}px solid ${c}`, opacity: 1 - q}} /> : null; })}
          </Abs>
        );
      })}
      {t > 12.6 && <Abs x={60} y={790} w={960} style={{textAlign: 'center', opacity: pop(t, 12.6)}}><div style={{display: 'inline-block', ...nb(NBK, 5), color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 28, padding: '8px 20px', letterSpacing: 2}}>EFFETS ÉTUDIÉS</div></Abs>}
      {t > 13.86 && <Abs x={160} y={900} w={760} h={420} style={{opacity: pop(t, 13.86)}}>
        {BARS.map(([l, v, c], i) => {
          const rank = order.indexOf(i);
          const y = lerp(i, rank, sortP) * 135;
          return (
            <div key={l} style={{position: 'absolute', left: 0, top: y, width: 760, height: 110}}>
              <div style={{position: 'absolute', left: 0, top: 22, width: 60, fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: sortP > 0.9 ? c : '#C9D2DF'}}>{sortP > 0.9 ? rank + 1 : '·'}</div>
              <div style={{position: 'absolute', left: 70, top: 10, height: 90, width: 680 * v * Math.min(1, spring(t, 13.9 + i * 0.1)), ...nb(c, 5), borderRadius: 14, display: 'flex', alignItems: 'center', paddingLeft: 18, fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: '#fff', whiteSpace: 'nowrap'}}>{l}</div>
            </div>
          );
        })}
      </Abs>}
    </Out>
  );
};

/* ═════════════ Guichet 3 : le principe — un train de 4 engrenages ═════════════ */
const gearPath = (r: number, n: number) => {
  const pts: string[] = [];
  for (let k = 0; k < n * 2; k++) {
    const a0 = (k / (n * 2)) * Math.PI * 2, a1 = ((k + 1) / (n * 2)) * Math.PI * 2;
    const rr = k % 2 === 0 ? r : r * 0.86;
    pts.push(`${(Math.cos(a0) * rr).toFixed(1)},${(Math.sin(a0) * rr).toFixed(1)}`, `${(Math.cos(a1) * rr).toFixed(1)},${(Math.sin(a1) * rr).toFixed(1)}`);
  }
  return `M ${pts.join(' L ')} Z`;
};
const GEARS: [string, number, number, number, number, string, number][] = [
  ['MODE', 420, 650, 150, 20.0, ORANGE, 1], ['CAUSES', 649, 811, 130, 20.38, RED, -1], ['EFFETS', 444, 954, 120, 22.1, BLUE, 1], ['CRITICITÉ', 632, 1086, 110, 23.9, GREEN, -1],
];
const Principe: React.FC = () => {
  const t = useT();
  return (
    <Out end={28.5}>
      <Heads h={[[20.0, ['Mode', 'de', 'défaillance'], [0, 2]], [20.38, ['Rechercher', 'les', 'causes'], [2]], [22.1, ['Analyser', 'les', 'effets'], [2]], [23.9, ['Évaluer', 'la', 'criticité'], [2]], [26.5, ['Selon', 'la', 'cotation', 'retenue'], [2]]]} />
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        {GEARS.map(([l, cx, cy, r, at, c, dir], i) => {
          const on = t >= at;
          const s0 = Math.min(1, spring(t, at, 9, 12));
          const rot = on ? (t - at) * 60 * (150 / r) * dir : 0;
          return (
            <g key={l} transform={`translate(${cx} ${cy}) scale(${on ? s0 : 0.92})`} opacity={on ? 1 : 0.18}>
              <g transform={`rotate(${rot + i * 9})`}><path d={gearPath(r, Math.round(r / 11))} fill={on ? c : '#C9D2DF'} stroke={NBK} strokeWidth={6} strokeLinejoin="round" /><circle r={r * 0.62} fill="#fff" stroke={NBK} strokeWidth={5} /></g>
              <text y={10} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={r > 120 ? 34 : l.length > 7 ? 21 : 26} fill={on ? c : '#A9B1BE'}>{l}</text>
              <text y={-r * 0.32} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={22} fill={NBK}>{i + 1}</text>
            </g>
          );
        })}
      </svg>
      {t > 26.5 && <Abs x={700} y={1180} w={330} style={{transform: `scale(${Math.min(1, spring(t, 26.5))}) rotate(4deg)`}}>
        <div style={{...nb(YEL, 6), padding: '12px 16px', textAlign: 'center'}}>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, letterSpacing: 2}}>MÉTHODE DE</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40}}>COTATION</div>
          <svg width={280} height={40}><line x1={10} y1={20} x2={270} y2={20} stroke={NBK} strokeWidth={5} />{Array.from({length: 11}, (_, k) => <line key={k} x1={10 + k * 26} y1={k % 5 === 0 ? 4 : 10} x2={10 + k * 26} y2={20} stroke={NBK} strokeWidth={4} />)}<circle cx={10 + 260 * prog(t, 26.6, 27.6, easeInOut)} cy={20} r={10} fill={RED} stroke={NBK} strokeWidth={3} /></svg>
        </div>
      </Abs>}
    </Out>
  );
};

/* ═════════════ Guichet 4 : la criticité — 3 jauges qui convergent ═════════════ */
const FACT: [string, string, number, string, number][] = [['G', 'Gravité', 30.78, RED, 0.85], ['F', "Fréquence d'apparition", 31.82, ORANGE, 0.6], ['D', 'Détectabilité', 33.18, BLUE, 0.7]];
const Criticite: React.FC = () => {
  const t = useT();
  const conv = prog(t, 33.7, 34.4, easeInOut);
  return (
    <Out end={35.35}>
      <Heads h={[[28.58, ['La', 'criticité', 'à', 'partir', 'de'], [1]]]} />
      {FACT.map(([k, l, at, c, v], i) => {
        const x = 60 + i * 330;
        const fill = prog(t, at + 0.1, at + 0.9, easeOut) * v;
        const R0 = 110, C0 = 2 * Math.PI * R0;
        return (
          <Abs key={k} x={x} y={470} w={300} h={420} style={{opacity: t > at ? 1 : 0.15, transform: `scale(${t > at ? Math.min(1, spring(t, at, 9, 12)) : 0.92}) translateY(${conv * 60}px)`}}>
            <div style={{position: 'absolute', inset: 0, ...nb('#fff', 7), borderColor: t > at ? c : NBK}} />
            <svg width={300} height={300} style={{position: 'absolute', left: 0, top: 10}}>
              <circle cx={150} cy={150} r={R0} fill="none" stroke="#E6EAF0" strokeWidth={26} />
              <circle cx={150} cy={150} r={R0} fill="none" stroke={c} strokeWidth={26} strokeLinecap="round" strokeDasharray={`${C0 * fill} ${C0}`} transform="rotate(-90 150 150)" />
              <text x={150} y={176} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={90} fill={c}>{k}</text>
            </svg>
            <div style={{position: 'absolute', left: 8, right: 8, top: 318, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: l.length > 14 ? 28 : 36, color: c, lineHeight: 1.1}}>{l}</div>
          </Abs>
        );
      })}
      {conv > 0 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>{[210, 540, 870].map((x, i) => <path key={i} d={`M ${x} 960 Q ${x} 1060 540 1110`} fill="none" stroke={FACT[i][3]} strokeWidth={10} strokeLinecap="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - conv}} />)}</svg>}
      {conv > 0.6 && <Abs x={260} y={1120} w={560} style={{display: 'flex', justifyContent: 'center', transform: `scale(${Math.min(1, spring(t, 34.2))})`}}><div style={{...nb(GREEN, 8), padding: '16px 30px', fontFamily: sansFont, fontWeight: 900, fontSize: 58, color: '#fff'}}>CRITICITÉ</div></Abs>}
    </Out>
  );
};

/* ═════════════ Guichet 5 : exemple — la pompe et ses défaillances ═════════════ */
const FAIL: [string, number, string, string][] = [['Fuite', 44.74, BLUE, 'goutte'], ['Surchauffe', 45.4, RED, 'thermometre'], ['Usure des roulements', 46.58, ORANGE, 'engrenage'], ['Panne du moteur', 47.86, NBK, 'eclair']];
const Pump: React.FC<{t: number}> = ({t}) => {
  const fuite = t > 44.74, chaud = t > 45.4, roul = t > 46.58, panne = t > 47.86;
  const ok = t > 57.9;
  const imp = panne && !ok ? (47.86 - 40) * 400 : (t - 40) * 400;
  const flowOff = panne && !ok ? 0 : -t * 160;
  const shake = roul && !ok ? Math.sin(t * 60) * 3 : 0;
  return (
    <svg width={960} height={600} viewBox="0 0 960 600">
      <rect width={960} height={600} rx={26} fill="#F2F6FB" stroke={NBK} strokeWidth={6} />
      <rect x={60} y={470} width={840} height={36} rx={8} fill="#9AA3B2" stroke={NBK} strokeWidth={5} />
      <path d="M 730 300 L 900 300" stroke={NBK} strokeWidth={46} /><path d="M 730 300 L 900 300" stroke="#fff" strokeWidth={32} /><path d="M 730 300 L 900 300" stroke={BLUE} strokeWidth={18} strokeDasharray="22 16" strokeDashoffset={-flowOff} />
      <path d="M 620 190 L 620 40" stroke={NBK} strokeWidth={46} /><path d="M 620 190 L 620 40" stroke="#fff" strokeWidth={32} /><path d="M 620 190 L 620 40" stroke={BLUE} strokeWidth={18} strokeDasharray="22 16" strokeDashoffset={flowOff} />
      <g transform={`translate(${shake} 0)`}>
        <rect x={80} y={210} width={300} height={220} rx={26} fill={panne && !ok ? '#9AA3B2' : chaud && !ok ? '#F4B7B0' : '#5B7FB9'} stroke={NBK} strokeWidth={6} />
        {Array.from({length: 7}, (_, k) => <line key={k} x1={110 + k * 38} y1={225} x2={110 + k * 38} y2={415} stroke={NBK} strokeWidth={4} opacity={0.35} />)}
        <text x={230} y={330} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={34} fill="#fff">MOTEUR</text>
        <rect x={380} y={290} width={110} height={40} fill="#C9D2DF" stroke={NBK} strokeWidth={5} />
        <circle cx={440} cy={310} r={30} fill="#fff" stroke={NBK} strokeWidth={5} />
        <circle cx={440} cy={310} r={14} fill={roul && !ok ? ORANGE : '#C9D2DF'} stroke={NBK} strokeWidth={4} />
        <circle cx={620} cy={300} r={130} fill="#E6EAF0" stroke={NBK} strokeWidth={7} />
        <g transform={`rotate(${imp} 620 300)`}>{Array.from({length: 6}, (_, k) => <path key={k} d="M 620 300 Q 680 250 720 300" fill="none" stroke={NBK} strokeWidth={9} strokeLinecap="round" transform={`rotate(${k * 60} 620 300)`} />)}</g>
        <circle cx={620} cy={300} r={22} fill={NBK} />
      </g>
      {chaud && !ok && [0, 1, 2].map((k) => { const q = ((t * 0.8 + k / 3) % 1); return <path key={k} d={`M ${150 + k * 70} ${200 - q * 120} q 12 -20 0 -40 q -12 -20 0 -40`} fill="none" stroke={RED} strokeWidth={6} opacity={1 - q} strokeLinecap="round" />; })}
      {fuite && !ok && [0, 1, 2, 3].map((k) => { const q = ((t * 1.2 + k / 4) % 1); return <path key={k} d={`M ${505 + (k % 2) * 14} ${345 + q * 120} q 8 14 0 22 q -8 -8 0 -22 Z`} fill={BLUE} opacity={1 - q * 0.6} />; })}
      {fuite && !ok && <ellipse cx={515} cy={470} rx={40 + Math.sin(t) * 4} ry={8} fill={BLUE} opacity={0.6} />}
      {panne && !ok && <g transform="translate(230 150)"><circle r={38} fill={NBK} stroke="#fff" strokeWidth={5} /><text y={14} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={40} fill="#fff">✕</text></g>}
      {ok && <g transform={`translate(800 120) scale(${Math.min(1, spring(t, 57.9))})`}><circle r={56} fill={GREEN} stroke={NBK} strokeWidth={6} /><path d="M -24 2 L -6 20 L 26 -16" fill="none" stroke="#fff" strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" /></g>}
      <text x={620} y={485} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight={700} fontSize={22} fill="#fff">POMPE INDUSTRIELLE</text>
    </svg>
  );
};
const Exemple: React.FC = () => {
  const t = useT();
  const scan = prog(t, 43.2, 44.6, easeInOut);
  return (
    <Out end={49.3}>
      <Heads h={[[38.9, ['Une', 'pompe', 'industrielle'], [1, 2]], [43.18, ['Les', 'défaillances', 'possibles'], [1, 2]]]} />
      {t < 44.2 && <Abs x={60} y={440} w={960} h={600} style={{opacity: 1 - prog(t, 43.6, 44.2), transform: `scale(${1 - 0.1 * prog(t, 43.6, 44.2, easeIn)})`}}>
        <div style={{position: 'absolute', inset: 0, borderRadius: 26, overflow: 'hidden', border: `6px solid ${NBK}`, boxShadow: `10px 10px 0 ${NAVY}`}}>
          <Img src={PH(IMG.pompe)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: `${lerp(30, 70, prog(t, 38.9, 43.6, easeInOut))}% 45%`, transform: `scale(${1.15 - prog(t, 38.9, 43.6) * 0.1})`}} />
          {t > 40.82 && <div style={{position: 'absolute', left: 640, top: 330, width: 230, height: 230, borderRadius: '50%', border: `8px solid ${RED}`, boxShadow: '0 0 0 6px #fff', transform: `scale(${Math.min(1, spring(t, 40.82, 9, 12))})`}} />}
        </div>
      </Abs>}
      <Abs x={60} y={440} w={960} h={600} style={{opacity: prog(t, 43.6, 44.2), transform: `scale(${0.9 + 0.1 * prog(t, 43.6, 44.3, easeOut)})`}}><Pump t={t} /></Abs>
      {scan > 0 && scan < 1 && <Abs x={60} y={440 + scan * 600 - 10} w={960} h={20} style={{background: `linear-gradient(180deg, transparent, ${RED}, transparent)`, boxShadow: `0 0 30px ${RED}`}} />}
      {t > 39.0 && t < 44.7 && <Abs x={60} y={1080} w={960} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Chip at={39.0} ic="outils" l="ÉQUIPE MAINTENANCE" c={BLUE} />{t > 40.2 && <Chip at={40.2} ic="clipboard" l="AMDEC" c={RED} />}</Abs>}
      {t > 44.7 && <Abs x={60} y={1070} w={960} h={300}>
        {FAIL.map(([l, at, c, ic], i) => (
          <div key={l} style={{position: 'absolute', left: (i % 2) * 490, top: Math.floor(i / 2) * 150, width: 470, height: 130, ...nb('#fff', 6), borderColor: t > at ? c : '#DCE4EF', opacity: t > at ? 1 : 0.25, transform: `scale(${t > at ? Math.min(1, spring(t, at, 9, 12)) : 0.95})`, display: 'flex', alignItems: 'center', gap: 16, padding: '0 18px'}}>
            <F n={ic} size={80} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: l.length > 14 ? 30 : 38, color: c, lineHeight: 1.05}}>{l}</div>
          </div>
        ))}
      </Abs>}
    </Out>
  );
};

/* ═════════════ Guichet 6 : actions prioritaires → anticiper ═════════════ */
const ACTS: [string, number, string][] = [['Contrôle périodique', 53.86, BLUE], ['Maintenance préventive', 55.46, ORANGE], ['Remplacement de certaines pièces', 56.74, GREEN]];
const Actions: React.FC = () => {
  const t = useT();
  const fin = prog(t, 58.95, 59.5, easeOut);
  return (
    <Out end={OUTRO_AT}>
      <Heads h={[[52.58, ['Les', 'actions', 'prioritaires'], [1, 2]], [58.98, ['Anticiper', 'les', 'défaillances'], [0]]]} />
      <Abs x={60} y={440} w={960} h={600} style={{transform: `scale(${0.62})`, transformOrigin: '50% 0%', opacity: 1 - fin * 0.85}}><Pump t={t} /></Abs>
      {ACTS.map(([l, at, c], i) => {
        const s0 = Math.min(1, spring(t, at, 9, 12));
        const y = 840 + i * 170;
        const sw = prog(t, at + 0.3, at + 1.0, easeInOut);
        return (
          <Abs key={l} x={60} y={y} w={960} h={150} style={{opacity: t > at ? 1 - fin * 0.85 : 0, transform: `translateX(${(1 - s0) * 600}px)`}}>
            <div style={{position: 'absolute', inset: 0, ...nb('#fff', 7), borderColor: c}} />
            <div style={{position: 'absolute', left: 20, top: 18, width: 114, height: 114}}>
              {i === 0 && <svg width={114} height={114}><rect x={6} y={14} width={102} height={94} rx={12} fill="#fff" stroke={NBK} strokeWidth={5} /><rect x={6} y={14} width={102} height={24} rx={8} fill={BLUE} stroke={NBK} strokeWidth={5} />{Array.from({length: 6}, (_, k) => { const done = sw > (k + 1) / 7; return <g key={k} transform={`translate(${24 + (k % 3) * 32} ${58 + Math.floor(k / 3) * 28})`}><rect x={-10} y={-10} width={20} height={20} rx={4} fill={done ? GREEN : '#E6EAF0'} />{done && <path d="M -6 0 L -1 5 L 7 -5" fill="none" stroke="#fff" strokeWidth={3} />}</g>; })}</svg>}
              {i === 1 && <div style={{transform: `rotate(${Math.sin(t * 6) * 20 * (t > at ? 1 : 0)}deg)`}}><F n="cle" size={110} /></div>}
              {i === 2 && <svg width={114} height={114}><g transform={`translate(${57 - sw * 120} 57)`}><path d={gearPath(42, 9)} fill={RED} stroke={NBK} strokeWidth={4} /><circle r={18} fill="#fff" stroke={NBK} strokeWidth={3} /></g><g transform={`translate(${57 + (1 - sw) * 120} 57) rotate(${t * 90})`}><path d={gearPath(42, 9)} fill={GREEN} stroke={NBK} strokeWidth={4} /><circle r={18} fill="#fff" stroke={NBK} strokeWidth={3} /></g></svg>}
            </div>
            <div style={{position: 'absolute', left: 160, top: 0, bottom: 0, right: 90, display: 'flex', alignItems: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: l.length > 24 ? 38 : 46, color: c, lineHeight: 1.05}}>{l}</div>
            <div style={{position: 'absolute', right: 22, top: 40, width: 70, height: 70, borderRadius: 35, background: c, border: `4px solid ${NBK}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 38, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i + 1}</div>
          </Abs>
        );
      })}
      {fin > 0 && <Abs x={60} y={620} w={960} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24}}>
        <div style={{...nb(GREEN, 8), padding: '22px 34px', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: '#fff', textAlign: 'center', lineHeight: 1.05, transform: `scale(${fin}) rotate(-2deg)`}}>ANTICIPER<br />LES DÉFAILLANCES</div>
        <div style={{display: 'flex', gap: 16}}>
          {[['INCIDENTS', 62.22], ['ARRÊTS DE PRODUCTION', 63.3]].map(([l, at]) => t > (at as number) ? <div key={l as string} style={{position: 'relative', ...nb('#fff', 5), padding: '8px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM, transform: `scale(${Math.min(1, spring(t, at as number))})`}}>{l}<svg style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%'}} preserveAspectRatio="none" viewBox="0 0 100 100"><line x1={4} y1={80} x2={96} y2={20} stroke={RED} strokeWidth={6} pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - prog(t, (at as number) + 0.2, (at as number) + 0.5)}} /></svg></div> : null)}
        </div>
      </Abs>}
    </Out>
  );
};

/** Éclair de gyrophare (non bloquant). */
const GyroFlash: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  const q = (t - at) / 0.9;
  if (q < 0 || q > 1) return null;
  const a = Math.sin(q * Math.PI);
  return <AbsoluteFill style={{zIndex: 70, pointerEvents: 'none', opacity: a * 0.75, background: `radial-gradient(circle at ${50 + 45 * Math.cos(q * 12)}% 10%, rgba(224,56,62,0.85), transparent 45%), radial-gradient(circle at ${50 - 45 * Math.cos(q * 12)}% 10%, rgba(31,111,209,0.85), transparent 45%)`}} />;
};

/* ═════════════ Bruitage ═════════════ */
const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at, s: 'sfx/bell', v: 0.2})),
  ...searchCues(2.6, 5, 3.2, 3.55), {at: 3.8, s: 'sfx/swish', v: 0.25}, {at: 4.1, s: 'sfx/swish', v: 0.25}, {at: 4.58, s: 'sfx/swish', v: 0.25}, {at: 5.74, s: 'sfx/swish', v: 0.25},
  ...TARGETS.map(([, , at]) => ({at, s: 'sfx/pop', v: 0.3})), {at: 12.58, s: 'soft-whoosh', v: 0.35, dur: 1}, {at: 13.9, s: 'sfx/thud', v: 0.3}, ...rep(14.1, 3, 0.25, 'sfx/swish', 0.25), {at: 14.9, s: 'validation', v: 0.25},
  ...GEARS.map(([, , , , at]) => ({at, s: 'sfx/thud', v: 0.35})), ...rep(20.1, 30, 0.25, 'sfx/click', 0.05), {at: 26.5, s: 'sfx/pop', v: 0.3},
  ...FACT.map(([, , at]) => ({at, s: 'sfx/thud', v: 0.32})), ...FACT.map(([, , at]) => ({at: at + 0.1, s: 'sfx/rise', v: 0.15, dur: 0.8})), {at: 33.7, s: 'sfx/swish', v: 0.35}, {at: 34.2, s: 'tampon', v: 0.4},
  {at: 38.9, s: 'soft-whoosh', v: 0.35, dur: 1}, {at: 39.0, s: 'sfx/pop', v: 0.3}, {at: 40.2, s: 'sfx/pop', v: 0.3}, {at: 43.2, s: 'sfx/rise', v: 0.25, dur: 1.4},
  ...FAIL.map(([, at]) => ({at, s: 'sfx/thud', v: 0.38})), {at: 44.8, s: 'sfx/ding', v: 0.15}, {at: 47.9, s: 'bass-hit', v: 0.35},
  ...ACTS.map(([, at]) => ({at, s: 'sfx/thud', v: 0.35})), ...rep(54.2, 6, 0.11, 'sfx/click', 0.15), {at: 57.0, s: 'sfx/swish', v: 0.35}, {at: 57.9, s: 'validation', v: 0.35},
  {at: 58.9, s: 'sfx/whoosh', v: 0.4}, ...rep(58.95, 4, 0.18, 'sfx/ding', 0.12), {at: 59.3, s: 'tampon', v: 0.45}, {at: 62.4, s: 'stylo', v: 0.3, dur: 0.5}, {at: 63.5, s: 'stylo', v: 0.3, dur: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SCN: [React.FC, number, number][] = [[Intro, 2.5, 7.15], [Objectifs, 10.65, 16.45], [Principe, 19.95, 28.55], [Criticite, 28.45, 35.4], [Exemple, 38.85, 49.35], [Actions, 52.85, OUTRO_AT]];
export const AmdecMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    {SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    <Gate from={58.8} to={59.9}><GyroFlash at={58.9} /></Gate>
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-amdec-metro-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn, Barred, Flap];
