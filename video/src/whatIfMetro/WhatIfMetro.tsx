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
 * « WHAT IF — et si… ? » (voix d'origine, 50 s) — capsule « condensé + effet wahou + ultra premium » présentée en
 * métro (7 stations). Tube de verre à six guichets : définition → principe → schéma → exemple → mesures →
 * collectif ; la capsule file d'un guichet à l'autre. Gyrophare, loupe, capsule pneumatique, store vénitien, éclair
 * de gyrophare final ; barre de recherche « WHAT IF » qui ouvre « ET SI… ? ». Techniques : pluie de points
 * d'interrogation, arbre des possibles (« Et si… ? » → situations → conséquences, branches qui se tracent), schéma
 * en 4 temps en escalier, entrepôt animé où chaque question « Que se passerait-il si… » est tapée puis jouée
 * (chariot élévateur sans freins avec traces de dérapage, charge qui tombe des fourches avec impact, piéton qui
 * traverse la zone de circulation face au chariot), matrice de coches conséquences / mesures, bulles « Et si… ? »
 * au-dessus de l'équipe. Kits capsule-ui-neo-brutal et capsule-recit-illustre ; images de la session réutilisées
 * + image ChatGPT de l'utilisateur (cariste et responsable QHSE dans l'entrepôt : couverture et exemple).
 */
const IMG = {
  cover: 'whatif-gen/entrepot-chariot.jpg',
  c1: 'zones/entrepot.jpg',
  c2: 'principes-gen/reunions.jpg',
  wh: 'whatif-gen/entrepot-chariot.jpg',
  team: 'principes-gen/reunions.jpg',
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
const OUTRO_AT = 50.8;
export const WHATIF_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '1', title: 'What if ?', s: 'et si… ?', c: RED, g: 'définition', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 7.3, n: '2', title: 'Le principe', s: 'imaginer · examiner', c: ORANGE, g: 'principe', k: 'gyro', lab: 'GUICHET 2 / 6'},
  {at: 14.3, n: '3', title: 'Le schéma', s: 'question → prévention', c: BLUE, g: 'schéma', k: 'loupe', lab: 'GUICHET 3 / 6'},
  {at: 21.6, n: '4', title: 'Exemple', s: 'entrepôt logistique', c: NAVY, g: 'exemple', k: 'tube', lab: 'GUICHET 4 / 6'},
  {at: 39.4, n: '5', title: 'Pour chaque situation', s: 'conséquences + mesures', c: GREEN, g: 'mesures', k: 'store', lab: 'GUICHET 5 / 6'},
  {at: 45.85, n: '6', title: 'Questionnement collectif', s: 'anticiper ensemble', c: VIO, g: 'collectif', k: 'none', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 50.0;
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
  {n: 1, l: 'What if', s: 'what if', at: 3.4},
  {n: 2, l: 'Principe', s: 'principe', at: 11.0},
  {n: 3, l: 'Schéma', s: 'schéma', at: 18.0},
  {n: 4, l: 'Entrepôt', s: 'entrepôt', at: 25.3},
  {n: 5, l: 'Chariot', s: 'chariot', at: 27.4},
  {n: 6, l: 'Piéton', s: 'piéton', at: 35.6},
  {n: 7, l: 'Collectif', s: 'collectif', at: 46.0},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE WHAT IF · STATION {r.n} / 7</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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
      <Abs x={0} y={640} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="MÉTHODE D'ANALYSE" src={IMG.c2} size={84} ls={1} seed={2} /></Abs>
      <Abs x={0} y={760} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="DES RISQUES :" src={IMG.c2} size={104} ls={2} seed={5} /></Abs>
      <Abs x={0} y={880} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="WHAT IF ?" src={IMG.c1} size={158} ls={2} /></Abs>
      <Abs x={40} y={1170} w={1000} style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10}}>{[['QUESTION', BLUE], ['SCÉNARIO', VIO], ['CONSÉQUENCES', RED], ['PRÉVENTION', GREEN]].map(([n, c], k) => <div key={n} style={{...nb(c, 4), padding: '6px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', transform: `translateY(${(1 - Math.min(1, spring(t, 0.3 + k * 0.08))) * 60}px)`}}>{n}</div>)}</Abs>
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






/* ═════════════ Guichet 1 : WHAT IF ? → recherche → « et si… ? » ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const qs = [[60, 500, 0], [250, 580, 1], [430, 500, 2], [610, 580, 3], [790, 500, 4]];
  return (
    <Out end={7.4}>
      <Heads h={[[2.85, ['What', 'if', '?'], [0, 1]], [3.34, ['«', 'Et', 'si', '»'], [1, 2]], [4.34, ['Analyse', 'des', 'risques'], [0, 2]], [6.54, ['Par', 'le', 'questionnement'], [2]]]} />
      <SearchOpen x={60} y={440} w={960} h={900} at={2.6} query="WHAT IF" results={['WHAT IF · et si… ?', 'HAZOP · dangers et opérabilité', 'AMDEC · modes de défaillance']} found={0} foundAt={3.1} clickAt={3.45} c={RED}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 130, color: INK, opacity: pop(t, 3.6)}}>WHAT IF ?</div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 240, display: 'flex', justifyContent: 'center', opacity: pop(t, 3.8)}}><svg width={80} height={80}><path d="M 40 5 L 40 62 M 16 40 L 40 70 L 64 40" fill="none" stroke={INK} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" /></svg></div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 340, display: 'flex', justifyContent: 'center'}}>{t > 3.9 && <div style={{...nb(YEL, 8), padding: '14px 34px', fontFamily: sansFont, fontWeight: 900, fontSize: 96, transform: `scale(${Math.min(1, spring(t, 3.9))}) rotate(-3deg)`}}>« ET SI… ? »</div>}</div>
        {qs.map(([x, y, k]) => t > 4.6 + k * 0.25 && <div key={k} style={{position: 'absolute', left: x, top: y, transform: `scale(${Math.min(1, spring(t, 4.6 + k * 0.25))}) translateY(${Math.sin(t * 2 + k) * 8}px)`}}><F n="question" size={90} /></div>)}
        {t > 6.54 && <div style={{position: 'absolute', left: 0, right: 0, top: 720, display: 'flex', justifyContent: 'center'}}><NBadge at={6.54} text="QUESTIONNEMENT" bg={NBK} rot={2} size={36} /></div>}
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ Guichet 2 : le principe — l'arbre des possibles ═════════════ */
const Principe: React.FC = () => {
  const t = useT();
  const root = {x: 540, y: 560};
  const mids = [220, 540, 860].map((x) => ({x, y: 820}));
  const ends = [220, 540, 860].map((x) => ({x, y: 1110}));
  const b1 = prog(t, 11.1, 11.7, easeOut), b2 = prog(t, 12.9, 13.5, easeOut);
  return (
    <Out end={14.4}>
      <Heads h={[[11.0, ['Situations', 'anormales', 'ou', 'dangereuses'], [0, 1, 3]], [12.9, ['Leurs', 'conséquences', 'possibles'], [1, 2]]]} />
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        {mids.map((m, i) => <path key={i} d={`M ${root.x} ${root.y + 70} C ${root.x} ${root.y + 160}, ${m.x} ${m.y - 150}, ${m.x} ${m.y - 60}`} fill="none" stroke={ORANGE} strokeWidth={10} strokeLinecap="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - b1}} />)}
        {mids.map((m, i) => <path key={`e${i}`} d={`M ${m.x} ${m.y + 60} L ${ends[i].x} ${ends[i].y - 60}`} fill="none" stroke={RED} strokeWidth={10} strokeLinecap="round" strokeDasharray="4 14" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - b2}} />)}
      </svg>
      <Abs x={root.x - 190} y={root.y - 70} w={380} h={140} style={{...nb(YEL, 8), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 64, transform: `scale(${Math.min(1, spring(t, 11.0))})`}}>ET SI… ?</Abs>
      {mids.map((m, i) => b1 > 0.6 && <Abs key={i} x={m.x - 140} y={m.y - 60} w={280} h={120} style={{...nb('#fff', 6), borderColor: ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transform: `scale(${Math.min(1, spring(t, 11.5 + i * 0.12))})`}}><F n="question" size={56} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: ORANGE, lineHeight: 1.05}}>situation<br />n° {i + 1}</div></Abs>)}
      {ends.map((e, i) => b2 > 0.6 && <Abs key={i} x={e.x - 140} y={e.y - 60} w={280} h={120} style={{...nb(RED, 6), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transform: `scale(${Math.min(1, spring(t, 13.3 + i * 0.12))})`}}><F n="danger" size={56} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', lineHeight: 1.05}}>conséquence<br />possible</div></Abs>)}
    </Out>
  );
};

/* ═════════════ Guichet 3 : le schéma en 4 temps ═════════════ */
const STEPS: [string, number, string, string][] = [['Question', 18.0, BLUE, 'question'], ['Scénario possible', 18.2, VIO, 'cerveau'], ['Conséquences', 18.45, RED, 'danger'], ['Mesures de prévention', 19.46, GREEN, 'bouclier']];
const Schema: React.FC = () => {
  const t = useT();
  return (
    <Out end={21.7}>
      <Heads h={[[18.0, ['Le', 'schéma'], [1]]]} />
      {STEPS.map(([l, at, c, ic], i) => {
        const s0 = Math.min(1, spring(t, at, 9, 12));
        const y = 450 + i * 225;
        return (
          <React.Fragment key={l}>
            <Abs x={60 + i * 40} y={y} w={800} h={170} style={{opacity: t > at ? 1 : 0, transform: `translateX(${(1 - s0) * 500}px) rotate(${(1 - s0) * 6}deg)`}}>
              <div style={{position: 'absolute', inset: 0, ...nb('#fff', 7), borderColor: c}} />
              <div style={{position: 'absolute', left: 20, top: 25}}><F n={ic} size={120} /></div>
              <div style={{position: 'absolute', left: 170, top: 0, bottom: 0, right: 100, display: 'flex', alignItems: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: l.length > 16 ? 44 : 54, color: c, lineHeight: 1.05}}>{l}</div>
              <div style={{position: 'absolute', right: 22, top: 50, width: 70, height: 70, borderRadius: 35, background: c, border: `4px solid ${NBK}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i + 1}</div>
            </Abs>
            {i < 3 && t > STEPS[i + 1][1] && <Abs x={60 + i * 40 + 380} y={y + 168} w={60} h={60} style={{opacity: pop(t, STEPS[i + 1][1])}}><svg width={60} height={60}><path d="M 30 4 L 30 44 M 14 30 L 30 50 L 46 30" fill="none" stroke={INK} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" /></svg></Abs>}
          </React.Fragment>
        );
      })}
    </Out>
  );
};

/* ═════════════ Guichet 4 : l'entrepôt — 3 questions jouées en direct ═════════════ */
const Forklift: React.FC<{x: number; y: number; fork: number; load?: boolean; brakeOut?: boolean; t: number}> = ({x, y, fork, load, brakeOut, t}) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-150} y={-120} width={170} height={110} rx={14} fill={GOLD} stroke={NBK} strokeWidth={6} />
    <rect x={-170} y={-90} width={40} height={80} rx={8} fill="#5B6472" stroke={NBK} strokeWidth={5} />
    <path d="M -110 -120 L -110 -210 L 10 -210 L 10 -120" fill="none" stroke={NBK} strokeWidth={8} />
    <circle cx={-55} cy={-150} r={20} fill="#3A2A1E" />
    <rect x={-72} y={-178} width={34} height={14} rx={6} fill={YEL} stroke={NBK} strokeWidth={3} />
    <rect x={22} y={-260} width={16} height={250} fill="#5B6472" stroke={NBK} strokeWidth={4} />
    <rect x={38} y={-24 - fork} width={110} height={12} fill={NBK} />
    {load && <rect x={44} y={-110 - fork} width={96} height={86} rx={6} fill="#C68B4E" stroke={NBK} strokeWidth={5} />}
    {load && <path d={`M 44 ${-80 - fork} L 140 ${-80 - fork}`} stroke="#8A5A2B" strokeWidth={6} />}
    {[[-110, 0], [0, 0]].map(([cx], k) => <g key={k} transform={`translate(${cx} 0) rotate(${x * 2})`}><circle r={34} fill={NBK} /><circle r={14} fill="#9AA3B2" /><line x1={-14} y1={0} x2={14} y2={0} stroke={NBK} strokeWidth={4} /></g>)}
    {brakeOut && <g transform="translate(-55 -260)"><circle r={36} fill={RED} stroke="#fff" strokeWidth={5} /><text y={13} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={36} fill="#fff">{Math.sin(t * 10) > 0 ? '✕' : '!'}</text></g>}
  </g>
);
const Walker: React.FC<{x: number; y: number; t: number; s?: number}> = ({x, y, t, s = 1}) => {
  const sw = Math.sin(t * 9) * 20;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <line x1={0} y1={-60} x2={-16} y2={0} stroke={NBK} strokeWidth={12} strokeLinecap="round" transform={`rotate(${sw} 0 -60)`} />
      <line x1={0} y1={-60} x2={16} y2={0} stroke={NBK} strokeWidth={12} strokeLinecap="round" transform={`rotate(${-sw} 0 -60)`} />
      <rect x={-22} y={-140} width={44} height={84} rx={14} fill={ORANGE} stroke={NBK} strokeWidth={5} />
      <circle cx={0} cy={-162} r={22} fill="#5A3A28" stroke={NBK} strokeWidth={4} />
      <path d="M -22 -170 Q 0 -200 22 -170 Z" fill={YEL} stroke={NBK} strokeWidth={4} />
    </g>
  );
};
const Warehouse: React.FC<{t: number}> = ({t}) => {
  const q = t < 31.02 ? 0 : t < 35.62 ? 1 : 2;
  let body: React.ReactNode = null;
  if (q === 0) {
    const brake = t > 29.9;
    const xx = 160 + (t - 27.34) * 70 + (brake ? (t - 29.9) ** 2 * 120 : 0);
    body = <>
      {brake && <path d={`M ${Math.max(60, xx - 260)} 512 L ${xx - 110} 512`} stroke="#3A3A3A" strokeWidth={8} strokeDasharray="20 10" />}
      {brake && [0, 1, 2].map((k) => <line key={k} x1={xx - 230 - k * 30} y1={350 + k * 40} x2={xx - 180 - k * 30} y2={350 + k * 40} stroke={RED} strokeWidth={8} strokeLinecap="round" />)}
      <Forklift x={Math.min(xx, 880)} y={500} fork={20} brakeOut={brake} t={t} />
    </>;
  } else if (q === 1) {
    const fall = prog(t, 32.4, 33.1, easeIn);
    const boxY = 500 - 240 + fall * 210;
    const bounce = t > 33.1 ? Math.max(0, Math.sin((t - 33.1) * 14) * 30 * Math.exp(-(t - 33.1) * 5)) : 0;
    body = <>
      <Forklift x={420} y={500} fork={t < 32.4 ? 200 : 200} load={t < 32.4} t={t} />
      {t >= 32.4 && <g transform={`translate(${470 + fall * 60} ${boxY - bounce}) rotate(${fall * 38})`}><rect x={0} y={-86} width={96} height={86} rx={6} fill="#C68B4E" stroke={NBK} strokeWidth={5} /></g>}
      {t > 33.1 && t < 34.0 && <g transform="translate(560 500)">{Array.from({length: 8}, (_, k) => { const a = (k / 8) * Math.PI - Math.PI; const r = 40 + (t - 33.1) * 160; return <line key={k} x1={Math.cos(a) * 30} y1={Math.sin(a) * 30} x2={Math.cos(a) * r} y2={Math.sin(a) * r} stroke={RED} strokeWidth={7} strokeLinecap="round" opacity={1 - (t - 33.1) / 0.9} />; })}</g>}
    </>;
  } else {
    const fx = 80 + Math.min(1, (t - 35.62) / 2.2) * 330;
    const px = 760 - Math.min(1, (t - 35.62) / 2.6) * 180;
    body = <>
      <rect x={480} y={430} width={260} height={90} fill="url(#zebra)" opacity={0.9} />
      <Forklift x={fx} y={500} fork={20} t={t} />
      <Walker x={px} y={500} t={t} s={1.15} />
      {t > 37.5 && <g transform={`translate(${(fx + px) / 2} 190) scale(${Math.min(1, spring(t, 37.5))})`}><path d="M 0 -60 L 56 40 L -56 40 Z" fill={YEL} stroke={NBK} strokeWidth={6} /><text y={30} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={60} fill={NBK}>!</text></g>}
    </>;
  }
  return (
    <svg width={960} height={620} viewBox="0 0 960 620">
      <defs><pattern id="zebra" width={40} height={40} patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width={20} height={40} fill={YEL} /><rect x={20} width={20} height={40} fill={NBK} /></pattern></defs>
      <rect width={960} height={620} rx={26} fill="#EEF2F7" stroke={NBK} strokeWidth={6} />
      {[40, 330, 620].map((x) => <g key={x}><rect x={x} y={60} width={260} height={330} fill="none" stroke="#C0C8D4" strokeWidth={8} />{[0, 1, 2].map((r) => <line key={r} x1={x} y1={60 + r * 110 + 110} x2={x + 260} y2={60 + r * 110 + 110} stroke="#C0C8D4" strokeWidth={8} />)}{[0, 1, 2].map((r) => [0, 1].map((c) => <rect key={`${r}${c}`} x={x + 20 + c * 120} y={60 + r * 110 + 40} width={100} height={66} fill="#E2C9A6" stroke="#B89B74" strokeWidth={3} />))}</g>)}
      <rect x={0} y={510} width={960} height={110} fill="#9AA3B2" />
      <line x1={0} y1={540} x2={960} y2={540} stroke={YEL} strokeWidth={8} strokeDasharray="40 30" />
      {body}
      <text x={28} y={44} fontFamily="JetBrains Mono, monospace" fontWeight={700} fontSize={22} fill={DIM}>ENTREPÔT · QUESTION {q + 1} / 3</text>
    </svg>
  );
};
const QS: [string, number, number][] = [['un chariot élévateur perdait ses freins ?', 27.34, 28.58], ['une charge tombait pendant une opération de manutention ?', 31.02, 32.34], ['un piéton traversait une zone de circulation d’engins ?', 35.62, 36.58]];
const Exemple: React.FC = () => {
  const t = useT();
  const q = QS.reduce((a, x, k) => (t >= x[1] ? k : a), -1);
  const typed = q >= 0 ? Math.floor(prog(t, QS[q][2] - 0.6, QS[q][2] + 0.9) * QS[q][0].length) : 0;
  return (
    <Out end={39.6}>
      <Heads h={[[25.3, ['Un', 'entrepôt', 'logistique'], [1, 2]], [27.34, ['Que', 'se', 'passerait-il', 'si…'], [2, 3]]]} />
      {t < 27.4 && <Shot src={IMG.wh} ic="colis" x={60} y={450} w={960} h={760} at={25.3} pos="50% 45%" c={NAVY}>
        {t > 25.9 && <div style={{position: 'absolute', left: 720, top: 220, width: 210, height: 210, borderRadius: '50%', border: `8px solid ${GREEN}`, boxShadow: '0 0 0 6px #fff', transform: `scale(${Math.min(1, spring(t, 25.9, 9, 12))})`}} />}
        <div style={{position: 'absolute', right: 24, top: 24}}>{t > 25.9 && <NBadge at={25.9} text="ÉQUIPE QHSE" bg={GREEN} rot={3} size={30} />}</div>
        {t > 26.4 && <div style={{position: 'absolute', left: 40, top: 60, ...nb(YEL, 6), padding: '10px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 44, transform: `scale(${Math.min(1, spring(t, 26.4))}) rotate(-4deg)`}}>Et si… ?</div>}
      </Shot>}
      {t >= 27.3 && <>
        <Abs x={60} y={440} w={960} h={190} style={{...nb('#fff', 7), padding: '18px 24px', boxSizing: 'border-box'}}>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: RED, letterSpacing: 2}}>QUE SE PASSERAIT-IL SI…</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, lineHeight: 1.12, marginTop: 8}}>{q >= 0 ? QS[q][0].slice(0, typed) : ''}<span style={{opacity: Math.sin(t * 12) > 0 ? 1 : 0, color: RED}}>|</span></div>
        </Abs>
        <Abs x={60} y={660} w={960} h={620} style={{opacity: pop(t, 27.35)}}><Warehouse t={t} /></Abs>
        <Abs x={60} y={1300} w={960} style={{display: 'flex', justifyContent: 'center', gap: 16}}>{QS.map((_, k) => <div key={k} style={{width: 64, height: 64, borderRadius: 32, background: k <= q ? RED : '#fff', border: `5px solid ${NBK}`, color: k <= q ? '#fff' : NBK, fontFamily: sansFont, fontWeight: 900, fontSize: 34, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>?</div>)}</Abs>
      </>}
    </Out>
  );
};

/* ═════════════ Guichet 5 : pour chaque situation — conséquences + mesures ═════════════ */
const ROWS: [string, string][] = [['Chariot sans freins', 'chariot'], ['Chute de charge', 'colis'], ['Piéton en zone engins', 'danger']];
const Mesures: React.FC = () => {
  const t = useT();
  return (
    <Out end={46.0}>
      <Heads h={[[43.2, ['Pour', 'chaque', 'situation'], [1, 2]]]} />
      <Abs x={60} y={450} w={960} h={110} style={{display: 'flex', gap: 12}}>
        <div style={{width: 380}} />
        {['CONSÉQUENCES POSSIBLES', 'MESURES DE PRÉVENTION'].map((h, k) => <div key={h} style={{flex: 1, ...nb(k ? GREEN : RED, 5), color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 21, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 8px'}}>{h}</div>)}
      </Abs>
      {ROWS.map(([l, ic], i) => (
        <Abs key={l} x={60} y={590 + i * 200} w={960} h={180} style={{display: 'flex', gap: 12, opacity: pop(t, 43.25 + i * 0.12)}}>
          <div style={{width: 380, ...nb('#fff', 6), display: 'flex', alignItems: 'center', gap: 12, padding: '0 14px'}}>{ic === 'chariot' ? <svg width={80} height={70} viewBox="-180 -280 340 330"><Forklift x={0} y={0} fork={20} t={t} /></svg> : <F n={ic} size={76} />}<div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, lineHeight: 1.1}}>{l}</div></div>
          {[0, 1].map((k) => { const at = 43.5 + i * 0.35 + k * 0.6; return <div key={k} style={{flex: 1, ...nb('#fff', 6), display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{t > at && <div style={{width: 90, height: 90, borderRadius: 45, background: k ? GREEN : RED, border: `5px solid ${NBK}`, color: '#fff', fontSize: 54, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1, spring(t, at))})`}}>✓</div>}</div>; })}
        </Abs>
      ))}
    </Out>
  );
};

/* ═════════════ Guichet 6 : un questionnement collectif ═════════════ */
const BUBS: [number, number, number][] = [[230, 520, 46.3], [560, 470, 46.7], [840, 560, 47.1]];
const Collectif: React.FC = () => {
  const t = useT();
  return (
    <Out end={OUTRO_AT}>
      <Heads h={[[45.9, ['Anticiper', 'les', 'scénarios', 'dangereux'], [0]], [49.38, ['Un', 'questionnement', 'collectif'], [1, 2]]]} />
      <Shot src={IMG.team} ic="equipe" x={60} y={450} w={960} h={700} at={45.9} pos="50% 35%" c={GREEN} />
      {BUBS.map(([x, y, at], k) => t > at && <Abs key={k} x={x - 110} y={y} w={220} h={110} style={{transform: `scale(${Math.min(1, spring(t, at))}) translateY(${Math.sin(t * 2.4 + k) * 8}px)`}}>
        <div style={{position: 'absolute', inset: 0, ...nb('#fff', 6), borderRadius: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 38}}>Et si… ?</div>
        <div style={{position: 'absolute', left: 90, bottom: -24, width: 0, height: 0, borderLeft: '18px solid transparent', borderRight: '18px solid transparent', borderTop: `26px solid ${NBK}`}} />
      </Abs>)}
      {t > 46.98 && <Abs x={60} y={1180} w={960} style={{display: 'flex', justifyContent: 'center', gap: 16}}>
        <NBadge at={46.98} text="ANTICIPER" bg={GREEN} rot={-3} size={40} />
        {t > 49.4 && <NBadge at={49.4} text="ENSEMBLE" bg={NBK} rot={2} size={40} />}
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
  ...searchCues(2.6, 7, 3.1, 3.45), {at: 3.9, s: 'tampon', v: 0.4}, ...rep(4.6, 5, 0.25, 'sfx/pop', 0.25), {at: 6.54, s: 'sfx/thud', v: 0.3},
  {at: 11.0, s: 'sfx/pop', v: 0.35}, {at: 11.1, s: 'sfx/swish', v: 0.3}, ...rep(11.5, 3, 0.12, 'sfx/pop', 0.25), {at: 12.9, s: 'sfx/swish', v: 0.3}, ...rep(13.3, 3, 0.12, 'sfx/thud', 0.25),
  ...STEPS.map(([, at]) => ({at, s: 'sfx/thud', v: 0.33})),
  {at: 25.3, s: 'soft-whoosh', v: 0.35, dur: 1}, {at: 25.6, s: 'sfx/pop', v: 0.3}, {at: 26.2, s: 'sfx/pop', v: 0.3},
  ...QS.flatMap(([s0, at, ty]) => [{at, s: 'sfx/whoosh', v: 0.3}, ...rep(ty - 0.6, Math.round(s0.length / 3), 0.05, 'sfx/click', 0.08)] as Sfx[]),
  {at: 29.9, s: 'sfx/rise', v: 0.35, dur: 1}, ...rep(30.0, 4, 0.2, 'sfx/ding', 0.2), {at: 33.1, s: 'bass-hit', v: 0.45}, {at: 33.15, s: 'sfx/thud', v: 0.5}, {at: 37.5, s: 'sfx/ding', v: 0.35}, ...rep(37.6, 3, 0.25, 'sfx/ding', 0.2),
  ...ROWS.flatMap((_, i) => [{at: 43.5 + i * 0.35, s: 'sfx/pop', v: 0.3}, {at: 44.1 + i * 0.35, s: 'validation', v: 0.2}] as Sfx[]),
  {at: 45.8, s: 'sfx/whoosh', v: 0.4}, ...BUBS.map(([, , at]) => ({at, s: 'sfx/pop', v: 0.3})), {at: 47.0, s: 'tampon', v: 0.45}, {at: 49.4, s: 'tampon', v: 0.4},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SCN: [React.FC, number, number][] = [[Intro, 2.5, 7.45], [Principe, 10.95, 14.45], [Schema, 17.95, 21.75], [Exemple, 25.25, 39.65], [Mesures, 43.15, 46.05], [Collectif, 45.85, OUTRO_AT]];
export const WhatIfMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    {SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    <Gate from={45.7} to={46.8}><GyroFlash at={45.8} /></Gate>
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-whatif-metro-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn, Barred, Flap];
