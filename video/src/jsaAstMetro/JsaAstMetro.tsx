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
 * « JSA / AST — analyse sécuritaire des tâches » (voix d'origine, 65 s) — capsule « condensé + effet wahou + ultra
 * premium » présentée en métro (7 stations). Tube de verre à six guichets : définition → méthode → schéma → exemple →
 * 5 étapes → dangers + mesures ; la capsule file d'un guichet à l'autre. Gyrophare, loupe, capsule pneumatique, store
 * vénitien, éclairs de gyrophare entre les étapes ; barre de recherche « JSA » qui ouvre le sigle. Techniques : sigles
 * en palettes d'aéroport (JSA puis AST) dépliés lettre à lettre, bloc « activité professionnelle » qui éclate en 5
 * étapes puis passe sous un scanner qui révèle les dangers et fait tomber les boucliers, schéma en ascenseur qui monte
 * 4 étages (portes qui s'ouvrent, afficheur d'étage), photo découpée en 5 lamelles numérotées, machine animée qui joue
 * les 5 étapes (check-list, arrêt d'urgence et engrenages qui ralentissent, sectionneur sur O + cadenas + étiquette,
 * clé en action, vérification et redémarrage), flux d'énergie bloqué par le cadenas puis testeur de vérification,
 * jauge de risque qui bascule au rouge et tampon « JSA · AST ». Kits capsule-ui-neo-brutal et capsule-recit-illustre ;
 * images de la session réutilisées.
 */
const IMG = {
  cover: 'apr-gen/consignation-apr.jpg',
  c1: 'promo/hse-machine.jpg',
  c2: 'amdec-gen/pompe-maintenance.jpg',
  ex: 'amdec-gen/pompe-maintenance.jpg',
  tab: 'jsa-gen/tablette-jsa.jpg',
  conso: 'jsa-gen/consignation.jpg',
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
const OUTRO_AT = 65.5;
export const JSA_AST_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.6, n: '1', title: 'JSA / AST', s: 'analyse des tâches', c: RED, g: 'définition', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 9.3, n: '2', title: 'La méthode', s: 'décomposer en étapes', c: ORANGE, g: 'méthode', k: 'gyro', lab: 'GUICHET 2 / 6'},
  {at: 18.95, n: '3', title: 'Le schéma', s: 'tâche → mesures', c: BLUE, g: 'schéma', k: 'loupe', lab: 'GUICHET 3 / 6'},
  {at: 27.75, n: '4', title: 'Exemple', s: 'maintenance machine', c: NAVY, g: 'exemple', k: 'tube', lab: 'GUICHET 4 / 6'},
  {at: 35.3, n: '5', title: 'Les 5 étapes', s: "de l'intervention", c: TEAL, g: 'étapes', k: 'none', lab: 'GUICHET 5 / 6'},
  {at: 48.75, n: '6', title: 'Dangers + mesures', s: 'à chaque étape', c: GREEN, g: 'mesures', k: 'store', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 64.6;
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
  {n: 1, l: 'JSA · AST', s: 'jsa · ast', at: 3.0},
  {n: 2, l: 'Décomposer', s: 'décomposer', at: 12.9},
  {n: 3, l: 'Schéma', s: 'schéma', at: 22.4},
  {n: 4, l: 'Technicien', s: 'technicien', at: 31.4},
  {n: 5, l: 'Consignation', s: 'consignation', at: 41.6},
  {n: 6, l: 'Énergies', s: 'énergies', at: 56.4},
  {n: 7, l: 'Travaux à risques', s: 'travaux', at: 63.4},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE JSA · STATION {r.n} / 7</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="danger" w={1080} h={820} pos="52% 30%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 24%, ${PAPER}CC 32%, ${PAPER} 37%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={590} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="ANALYSE" src={IMG.c2} size={96} ls={2} seed={2} /></Abs>
      <Abs x={0} y={700} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="SÉCURITAIRE" src={IMG.c2} size={96} ls={2} seed={4} /></Abs>
      <Abs x={0} y={810} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="DES TÂCHES :" src={IMG.c2} size={96} ls={2} seed={5} /></Abs>
      <Abs x={0} y={940} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="JSA · AST" src={IMG.c1} size={150} ls={4} /></Abs>
      <Abs x={40} y={1200} w={1000} style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10}}>{[['DÉCOMPOSER', BLUE], ['DANGERS', ORANGE], ['RISQUES', RED], ['MESURES', GREEN]].map(([n, c], k) => <div key={n} style={{...nb(c, 4), padding: '6px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', transform: `translateY(${(1 - Math.min(1, spring(t, 0.3 + k * 0.08))) * 60}px)`}}>{n}</div>)}</Abs>
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






/* ═════════════ Éclair de gyrophare (non bloquant) ═════════════ */
const GyroFlash: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  const q = (t - at) / 0.9;
  if (q < 0 || q > 1) return null;
  const a = Math.sin(q * Math.PI);
  return <AbsoluteFill style={{zIndex: 70, pointerEvents: 'none', opacity: a * 0.6, background: `radial-gradient(circle at ${50 + 45 * Math.cos(q * 12)}% 10%, rgba(224,56,62,0.85), transparent 45%), radial-gradient(circle at ${50 - 45 * Math.cos(q * 12)}% 10%, rgba(31,111,209,0.85), transparent 45%)`}} />;
};

/* ═════════════ Guichet 1 : JSA ? → recherche → palettes JSA puis AST ═════════════ */
const ACRO: [string, number, [string, number][], string][] = [
  ['JSA', 3.5, [['Job', 4.16], ['Safety', 4.4], ['Analysis', 4.9]], RED],
  ['AST', 6.4, [['Analyse', 7.4], ['Sécuritaire', 7.92], ['des Tâches', 8.3]], BLUE],
];
const Intro: React.FC = () => {
  const t = useT();
  return (
    <Out end={9.35}>
      <Heads h={[[2.85, ['JSA', 'ou', 'AST', '?'], [0, 2]], [4.16, ['Job', 'Safety', 'Analysis'], [0, 1, 2]], [7.4, ['Analyse', 'sécuritaire', 'des tâches'], [0, 1, 2]]]} />
      <SearchOpen x={60} y={440} w={960} h={900} at={2.6} query="JSA" results={['JSA · Job Safety Analysis', 'AST · Analyse sécuritaire des tâches', 'SWIFT · technique structurée']} found={0} foundAt={3.1} clickAt={3.45} c={RED}>
        {ACRO.map(([ac, at, words, c], r) => (
          <div key={ac} style={{position: 'absolute', left: 40, right: 30, top: 70 + r * 280, height: 240, display: 'flex', alignItems: 'center', gap: 34, opacity: t > at - 0.1 ? 1 : 0}}>
            <Flap text={ac} at={at} size={150} c={c} />
            <div style={{display: 'flex', flexDirection: 'column', gap: 2}}>
              {words.map(([w, wa]) => {
                const cut = w.startsWith('des ') ? 4 : 0;
                return <div key={w} style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, lineHeight: 1.08, opacity: pop(t, wa), transform: `translateX(${(1 - Math.min(1, spring(t, wa))) * 70}px)`, color: INK}}>{w.slice(0, cut)}<span style={{color: c}}>{w[cut]}</span>{w.slice(cut + 1)}</div>;
              })}
            </div>
          </div>
        ))}
        <div style={{position: 'absolute', left: 0, right: 0, top: 650, display: 'flex', justifyContent: 'center'}}>{t > 8.3 && <div style={{...nb(YEL, 7), padding: '12px 30px', fontFamily: sansFont, fontWeight: 900, fontSize: 54, transform: `scale(${Math.min(1, spring(t, 8.3))}) rotate(-3deg)`}}><span style={{color: RED}}>JSA</span> = <span style={{color: BLUE}}>AST</span></div>}</div>
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ Guichet 2 : la méthode — le bloc « activité » éclate en étapes, scanner, boucliers ═════════════ */
const COLX = (k: number) => 60 + k * 195;
const Methode: React.FC = () => {
  const t = useT();
  const split = prog(t, 13.0, 13.6, easeOut);
  const sx = lerp(20, 1060, prog(t, 14.2, 15.9, easeInOut));
  const scanOn = t > 14.1 && t < 16.0;
  return (
    <Out end={18.95}>
      <Heads h={[[12.9, ['Décomposer', 'en étapes'], [0]], [14.2, ['Identifier', 'les dangers'], [1]], [17.0, ['Déterminer', 'les mesures'], [1]]]} />
      {[['ÉTAPES', 610, BLUE, 12.9], ['DANGERS', 850, ORANGE, 14.2], ['MESURES', 1065, GREEN, 17.0]].map(([l, y, c, at]) => <Abs key={l as string} x={60} y={y as number} w={960} style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, letterSpacing: 4, color: c as string, opacity: pop(t, at as number)}}>{l as string}</Abs>)}
      {split < 1 && <Abs x={60} y={650} w={960} h={160} style={{...nb('#fff', 8), borderColor: NBK, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, opacity: 1 - split, transform: `scale(${1 + Math.sin(prog(t, 12.6, 13.0) * Math.PI) * 0.04})`}}><F n="casque" size={90} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 50}}>ACTIVITÉ PROFESSIONNELLE</span></Abs>}
      {t > 12.95 && t < 13.35 && [1, 2, 3, 4].map((k) => <Abs key={k} x={60 + k * 192 - 3} y={630} w={6} h={200} style={{background: '#fff', boxShadow: `0 0 18px ${YEL}`, opacity: Math.sin(prog(t, 12.95, 13.35) * Math.PI)}} />)}
      {split > 0 && [0, 1, 2, 3, 4].map((k) => {
        const x = lerp(60 + k * 192, COLX(k), split) + (k - 2) * 26 * Math.sin(split * Math.PI);
        const lit = scanOn && Math.abs(sx - (COLX(k) + 90)) < 90;
        return (
          <Abs key={k} x={x} y={650 + Math.sin(split * Math.PI) * (k % 2 ? 30 : -30)} w={lerp(192, 180, split)} h={160} style={{...nb(lit ? YEL : '#fff', 6), borderColor: NBK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `rotate(${Math.sin(split * Math.PI) * (k - 2) * 4}deg)`}}>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM}}>ÉTAPE</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: BLUE, lineHeight: 1}}>{k + 1}</div>
          </Abs>
        );
      })}
      {[0, 1, 2, 3, 4].map((k) => {
        const at = 14.2 + ((COLX(k) + 90 - 20) / 1040) * 1.7;
        return t > at && <Abs key={`d${k}`} x={COLX(k)} y={890} w={180} h={140} style={{...nb('#FFF4E5', 5), borderColor: ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1, spring(t, at, 9, 16))})`}}><F n="danger" size={86} /></Abs>;
      })}
      {[0, 1, 2, 3, 4].map((k) => {
        const at = 17.0 + k * 0.14;
        const d = Math.min(1, spring(t, at, 10, 12));
        return t > at && <Abs key={`m${k}`} x={COLX(k)} y={1105 - (1 - d) * 320} w={180} h={140} style={{...nb('#EAF8F1', 5), borderColor: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6}}><F n="bouclier" size={80} /><span style={{fontSize: 46, fontWeight: 900, color: GREEN}}>✓</span></Abs>;
      })}
      {scanOn && <Abs x={sx - 4} y={610} w={8} h={440} style={{background: `linear-gradient(180deg, transparent, ${ORANGE}, transparent)`, boxShadow: `0 0 30px 10px ${ORANGE}88`}} />}
    </Out>
  );
};

/* ═════════════ Guichet 3 : le schéma — un ascenseur qui monte 4 étages ═════════════ */
const FLOORS: [string, string, string][] = [['Décomposition de la tâche', 'puzzle', BLUE], ['Identification des dangers', 'danger', ORANGE], ['Évaluation des risques', 'balance', RED], ['Définition des mesures de prévention', 'bouclier', GREEN]];
const LIFT: [number, number][] = [[22.65, 23.25], [23.95, 24.45], [25.3, 25.85]];
const FH = 212;
const floorY = (k: number) => 1300 - (k + 1) * FH;
const Schema: React.FC = () => {
  const t = useT();
  let pos = 0;
  LIFT.forEach(([a, b], k) => { pos += prog(t, a, b, easeInOut); void k; });
  const cur = Math.round(pos);
  const moving = LIFT.some(([a, b]) => t > a && t < b);
  const nextDep = LIFT.find(([a]) => a > t);
  const lastArr = [22.3, ...LIFT.map(([, b]) => b)].filter((b) => b <= t).pop() ?? 22.3;
  const open = moving ? 0 : Math.min(prog(t, lastArr + 0.05, lastArr + 0.35, easeOut), nextDep ? 1 - prog(t, nextDep[0] - 0.25, nextDep[0], easeIn) : 1);
  const cy = lerp(floorY(0), floorY(3), pos / 3) + 16;
  return (
    <Out end={27.85}>
      <Heads h={[[22.45, ['Le', 'schéma', 'est', 'simple'], [1, 3]]]} />
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        <rect x={410} y={floorY(3)} width={260} height={4 * FH} fill="#E6EAF0" stroke={NBK} strokeWidth={6} />
        {[0, 1, 2, 3].map((k) => <line key={k} x1={410} x2={670} y1={floorY(k)} y2={floorY(k)} stroke="#C0C8D4" strokeWidth={4} strokeDasharray="10 8" />)}
        <line x1={540} x2={540} y1={floorY(3)} y2={cy} stroke="#5B6472" strokeWidth={5} />
        <line x1={470} x2={470} y1={floorY(3)} y2={1300} stroke="#C9D2DF" strokeWidth={4} />
        <line x1={610} x2={610} y1={floorY(3)} y2={1300} stroke="#C9D2DF" strokeWidth={4} />
      </svg>
      <Abs x={430} y={cy} w={220} h={FH - 32} style={{background: '#fff', border: `6px solid ${NBK}`, borderRadius: 14, overflow: 'hidden', boxShadow: `0 0 0 4px ${FLOORS[cur][2]}55, 8px 8px 0 ${NBK}`}}>
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${FLOORS[cur][2]}18`}}><F n={FLOORS[cur][1]} size={110} /></div>
        <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${50 * (1 - open)}%`, background: 'linear-gradient(90deg, #9AA3B2, #C9D2DF)', borderRight: `3px solid ${NBK}`}} />
        <div style={{position: 'absolute', right: 0, top: 0, bottom: 0, width: `${50 * (1 - open)}%`, background: 'linear-gradient(270deg, #9AA3B2, #C9D2DF)', borderLeft: `3px solid ${NBK}`}} />
      </Abs>
      {FLOORS.map(([l, ic, c], k) => {
        const reached = pos >= k - 0.02;
        const here = cur === k && !moving;
        return (
          <Abs key={l} x={60} y={floorY(k) + 22} w={330} h={FH - 44} style={{...nb(reached ? '#fff' : '#F1F3F7', reached ? 6 : 3), borderColor: reached ? c : '#C9D2DF', display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', transform: `scale(${here ? 1.04 : 1})`, opacity: reached ? 1 : 0.55}}>
            <F n={ic} size={56} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: l.length > 26 ? 23 : 26, lineHeight: 1.08, color: reached ? c : '#A9B1BE'}}>{l}</div>
          </Abs>
        );
      })}
      <Abs x={790} y={floorY(3) + 20} w={230} h={250} style={{...nb(NIGHT, 7), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: '#9CC6FF', letterSpacing: 4}}>ÉTAGE</div>
        <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
          <span style={{fontSize: 44, color: moving && Math.sin(t * 18) > 0 ? YEL : '#33405A'}}>▲</span>
          <span style={{fontFamily: MONO, fontWeight: 700, fontSize: 110, color: '#fff', textShadow: `0 0 18px ${FLOORS[cur][2]}`}}>{cur + 1}</span>
          <span style={{fontFamily: MONO, fontWeight: 700, fontSize: 34, color: '#5B6B8C'}}>/4</span>
        </div>
      </Abs>
      {[0, 1, 2, 3].map((k) => { const arr = k === 0 ? 22.3 : LIFT[k - 1][1]; return t > arr + 0.2 && <Abs key={`ok${k}`} x={692} y={floorY(k) + 70} w={80} h={80} style={{transform: `scale(${Math.min(1, spring(t, arr + 0.2))})`}}><div style={{width: 72, height: 72, borderRadius: 36, background: FLOORS[k][2], border: `5px solid ${NBK}`, color: '#fff', fontSize: 40, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>✓</div></Abs>; })}
    </Out>
  );
};

/* ═════════════ Guichet 4 : exemple — la photo se découpe en 5 lamelles ═════════════ */
const Exemple: React.FC = () => {
  const t = useT();
  const sp = prog(t, 32.7, 33.4, easeOut);
  const z = 1 + (1 - Math.min(1, spring(t, 31.4, 6, 10))) * 0.12;
  return (
    <Out end={35.4}>
      <Heads h={[[31.4, ['Un', 'technicien', 'en', 'maintenance'], [1, 3]], [32.64, ['Décomposer', 'son', 'intervention'], [0]]]} />
      {[0, 1, 2, 3, 4].map((k) => (
        <Abs key={k} x={60 + k * 192 + sp * (k - 2) * 12} y={460 + sp * (k % 2 ? 30 : -10)} w={192} h={700} style={{overflow: 'hidden', border: sp > 0.02 ? `5px solid ${NBK}` : 'none', borderRadius: sp > 0.02 ? 16 : k === 0 ? '30px 0 0 30px' : k === 4 ? '0 30px 30px 0' : 0, boxShadow: sp > 0.02 ? `${6 * sp}px ${6 * sp}px 0 ${NBK}` : 'none', transform: `rotate(${sp * (k - 2) * 1.6}deg) scale(${z * (1 - 0.07 * sp)})`, opacity: pop(t, 31.35, 0.3), boxSizing: 'border-box'}}>
          <Img src={PH(IMG.ex)} style={{position: 'absolute', left: -k * 192, top: 0, width: 960, height: 700, objectFit: 'cover', objectPosition: '45% 40%'}} />
          {t > 33.6 + k * 0.13 && <div style={{position: 'absolute', left: '50%', bottom: 26, transform: `translateX(-50%) scale(${Math.min(1, spring(t, 33.6 + k * 0.13))})`, width: 84, height: 84, borderRadius: 42, background: TEAL, border: `5px solid ${NBK}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 48, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{k + 1}</div>}
        </Abs>
      ))}
      <Abs x={60} y={1240} w={960} style={{display: 'flex', justifyContent: 'center'}}>{t > 31.6 && <NBadge at={31.6} text="MACHINE INDUSTRIELLE" bg={NAVY} rot={-2} size={38} />}</Abs>
    </Out>
  );
};

/* ═════════════ Guichet 5 : les 5 étapes jouées sur une machine animée ═════════════ */
const ST5: [string, string, number, string, string][] = [
  ['Préparation du travail', 'Préparation', 35.52, BLUE, 'clipboard'], ['Arrêt de la machine', 'Arrêt', 38.08, ORANGE, 'stop'],
  ['Consignation des énergies', 'Consignation', 40.48, RED, 'cadenas'], ['Intervention de maintenance', 'Intervention', 43.4, VIO, 'cle'],
  ['Vérification et remise en service', 'Remise en service', 46.08, GREEN, 'check'],
];
const speedAt = (t: number) => (t < 38.7 ? 1 : t < 39.8 ? 1 - (t - 38.7) / 1.1 : t < 48.3 ? 0 : Math.min(1, (t - 48.3) / 0.6));
const gearAngle = (t: number) => { let a = 0; for (let x = 35; x < t; x += 1 / 30) a += speedAt(x) * 7; return a; };
const gearPath = (r: number, n: number) => { let d = ''; for (let i = 0; i < n * 2; i++) { const a0 = (i / (n * 2)) * Math.PI * 2, a1 = ((i + 1) / (n * 2)) * Math.PI * 2; const R = i % 2 ? r * 0.8 : r; d += `${i ? 'L' : 'M'} ${R * Math.cos(a0)} ${R * Math.sin(a0)} L ${R * Math.cos(a1)} ${R * Math.sin(a1)} `; } return d + 'Z'; };
const Machine: React.FC<{t: number}> = ({t}) => {
  const ga = gearAngle(t);
  const press = Math.max(0, 1 - Math.abs(t - 38.75) * 5);
  const lever = prog(t, 40.9, 41.3, easeInOut) * (1 - prog(t, 47.75, 48.1, easeInOut));
  const lock = prog(t, 41.45, 41.75, easeOut);
  const unlock = prog(t, 47.25, 47.6, easeIn);
  const on = speedAt(t) > 0.05;
  const light = on ? GREEN : t > 43.3 && t < 46.0 ? ORANGE : RED;
  const powered = lever < 0.5;
  return (
    <svg width={960} height={630} viewBox="0 0 960 630">
      <rect width={960} height={630} rx={26} fill="#EEF2F7" stroke={NBK} strokeWidth={6} />
      <rect x={0} y={560} width={960} height={70} fill="#9AA3B2" />
      <rect x={40} y={170} width={170} height={300} rx={14} fill="#E6EAF0" stroke={NBK} strokeWidth={6} />
      <circle cx={125} cy={250} r={34} fill={GREEN} stroke={NBK} strokeWidth={5} opacity={on ? 1 : 0.45} />
      <circle cx={125} cy={370} r={54} fill={YEL} stroke={NBK} strokeWidth={5} />
      <circle cx={125} cy={370 + press * 4} r={40 - press * 4} fill={RED} stroke={NBK} strokeWidth={5} />
      {press > 0.2 && <circle cx={125} cy={370} r={54 + press * 30} fill="none" stroke={RED} strokeWidth={6} opacity={press} />}
      <path d={`M 860 430 L 860 530 L 700 530 L 700 500`} fill="none" stroke={powered ? '#F5C400' : '#9AA3B2'} strokeWidth={14} strokeLinecap="round" />
      <path d={`M 860 430 L 860 530 L 700 530 L 700 500`} fill="none" stroke={NBK} strokeWidth={3} strokeLinecap="round" opacity={0.4} />
      {powered && Array.from({length: 6}, (_, k) => { const p = ((t * 0.9 + k / 6) % 1); const L1 = 100, L2 = 160, L3 = 30, tot = L1 + L2 + L3, d = p * tot; const [x, y] = d < L1 ? [860, 430 + d] : d < L1 + L2 ? [860 - (d - L1), 530] : [700, 530 - (d - L1 - L2)]; return <circle key={k} cx={x} cy={y} r={8} fill="#fff" stroke={ORANGE} strokeWidth={3} />; })}
      <rect x={260} y={140} width={480} height={360} rx={20} fill="#1F6FA8" stroke={NBK} strokeWidth={6} />
      <rect x={300} y={185} width={300} height={230} rx={12} fill="#0E2A5C" stroke={NBK} strokeWidth={4} />
      <g transform={`translate(390 300) rotate(${ga})`}><path d={gearPath(72, 12)} fill="#C9D2DF" stroke={NBK} strokeWidth={4} /><circle r={18} fill="#5B6472" stroke={NBK} strokeWidth={3} /></g>
      <g transform={`translate(512 335) rotate(${-ga * 1.4 + 15})`}><path d={gearPath(52, 9)} fill="#9AA3B2" stroke={NBK} strokeWidth={4} /><circle r={13} fill="#5B6472" stroke={NBK} strokeWidth={3} /></g>
      <rect x={620} y={190} width={96} height={60} rx={8} fill={NBK} />
      <text x={668} y={232} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight={700} fontSize={30} fill={on ? GREEN : RED}>{on ? 'ON' : 'OFF'}</text>
      <rect x={636} y={95} width={64} height={45} rx={6} fill="#5B6472" stroke={NBK} strokeWidth={4} />
      <circle cx={668} cy={92} r={24} fill={light} stroke={NBK} strokeWidth={5} />
      <circle cx={668} cy={92} r={40} fill={light} opacity={0.25 + 0.15 * Math.sin(t * 10)} />
      <rect x={790} y={150} width={140} height={280} rx={14} fill="#D9DEE7" stroke={NBK} strokeWidth={6} />
      <circle cx={860} cy={250} r={52} fill="#fff" stroke={NBK} strokeWidth={6} />
      <g transform={`rotate(${-90 * lever} 860 250)`}><rect x={850} y={182} width={20} height={80} rx={10} fill={RED} stroke={NBK} strokeWidth={4} /></g>
      <text x={860} y={190 - 18} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={22} fill={NBK}>I</text>
      <text x={790 + 4} y={256} fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={22} fill={NBK}>O</text>
      {lock > 0 && unlock < 1 && (
        <g transform={`translate(832, ${352 - (1 - lock) * 60 - unlock * 80})`} opacity={1 - unlock}>
          <path d={`M 12 ${-2 - unlock * 16} L 12 -26 A 16 16 0 0 1 44 -26 L 44 ${-2 - unlock * 16}`} fill="none" stroke="#9AA3B2" strokeWidth={9} />
          <rect x={0} y={-6} width={56} height={46} rx={8} fill={RED} stroke={NBK} strokeWidth={4} />
          <circle cx={28} cy={14} r={6} fill={NBK} />
          <g transform={`rotate(${Math.sin(t * 3) * 6} 28 40)`}><line x1={28} y1={40} x2={28} y2={58} stroke={NBK} strokeWidth={3} /><rect x={-6} y={58} width={68} height={92} rx={6} fill="#fff" stroke={RED} strokeWidth={5} /><rect x={-6} y={58} width={68} height={18} fill={RED} /><text x={28} y={104} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={13} fill={RED}>NE PAS</text><text x={28} y={122} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={11} fill={RED}>MANŒUVRER</text></g>
        </g>
      )}
    </svg>
  );
};
const Etapes: React.FC = () => {
  const t = useT();
  const k = ST5.reduce((a, s, i) => (t >= s[2] - 0.2 ? i : a), 0);
  const [title, , at, c, ic] = ST5[k];
  return (
    <Out end={48.85}>
      <Heads h={[[35.52, ['Préparation', 'du travail'], [0]], [38.08, ['Arrêt', 'de la machine'], [0]], [40.48, ['Consignation', 'des énergies'], [0]], [43.4, ['Intervention', 'de maintenance'], [0]], [46.08, ['Vérification', 'et', 'remise en service'], [0, 2]]]} />
      <Abs x={60} y={440} w={960} h={160} style={{...nb('#fff', 7), borderColor: c, display: 'flex', alignItems: 'center', gap: 26, padding: '0 24px'}}>
        <div key={k}><Flap text={String(k + 1)} at={at - 0.35} size={110} c={c} /></div>
        <div>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, letterSpacing: 3, color: c}}>ÉTAPE {k + 1} / 5</div>
          <div key={k} style={{fontFamily: sansFont, fontWeight: 900, fontSize: title.length > 26 ? 40 : 46, lineHeight: 1.05, color: INK, opacity: pop(t, at - 0.1), transform: `translateY(${(1 - Math.min(1, spring(t, at - 0.1))) * 30}px)`}}>{title}</div>
        </div>
        <div style={{marginLeft: 'auto'}}><F n={ic} size={100} /></div>
      </Abs>
      <Abs x={60} y={625} w={960} h={630}><Machine t={t} /></Abs>
      {t > 35.9 && t < 38.0 && <Abs x={300} y={760} w={420} h={300} style={{...nb('#fff', 7), borderColor: BLUE, padding: 20, transform: `scale(${Math.min(1, spring(t, 35.9))})`, opacity: 1 - prog(t, 37.7, 38.0)}}>
        <div style={{display: 'flex', gap: 14, marginBottom: 10}}><F n="clipboard" size={70} /><F n="outils" size={70} /><F n="casque" size={70} /></div>
        {[0, 1, 2].map((r) => <div key={r} style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 10}}><div style={{width: 40, height: 40, borderRadius: 8, border: `4px solid ${NBK}`, background: t > 36.4 + r * 0.4 ? GREEN : '#fff', color: '#fff', fontWeight: 900, fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{t > 36.4 + r * 0.4 ? '✓' : ''}</div><div style={{height: 16, flex: 1, borderRadius: 8, background: '#D9DEE7'}} /></div>)}
      </Abs>}
      {t > 42.2 && t < 43.3 && <Abs x={60 + 760} y={625 + 520} w={110} h={110} style={{transform: `scale(${Math.min(1, spring(t, 42.2))})`}}><F n="eclair" size={100} /><div style={{position: 'absolute', left: 0, top: 50, width: 110, height: 10, background: RED, transform: 'rotate(-40deg)', border: `2px solid ${NBK}`}} /></Abs>}
      {t > 43.9 && t < 46.0 && <Abs x={60 + 330} y={625 + 220} w={120} h={120} style={{transform: `rotate(${Math.sin((t - 43.9) * 7) * 35}deg) scale(${Math.min(1, spring(t, 43.9))})`, transformOrigin: '30% 70%'}}><F n="cle" size={120} /></Abs>}
      {t > 47.08 && <Abs x={60 + 410} y={625 + 40} w={150} h={150} style={{transform: `scale(${Math.min(1, spring(t, 47.08))})`}}><div style={{width: 140, height: 140, borderRadius: 70, background: GREEN, border: `6px solid ${NBK}`, color: '#fff', fontSize: 84, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 10px ${GREEN}44`}}>✓</div></Abs>}
      <Abs x={60} y={1280} w={960} style={{display: 'flex', justifyContent: 'space-between'}}>
        {ST5.map(([, sh, sa, sc], i) => <div key={sh} style={{...nb(t >= sa - 0.2 ? sc : '#fff', 4), width: 182, height: 70, color: t >= sa - 0.2 ? '#fff' : DIM, fontFamily: sansFont, fontWeight: 900, fontSize: sh.length > 11 ? 17 : 21, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', lineHeight: 1.05, transform: `scale(${i === k ? 1.06 : 1})`}}>{i < k ? '✓ ' : ''}{sh}</div>)}
      </Abs>
    </Out>
  );
};

/* ═════════════ Guichet 6 : dangers + mesures → énergie bloquée par la consignation → jauge des travaux à risques ═════════════ */
const Energie: React.FC<{t: number}> = ({t}) => {
  const lock = prog(t, 56.6, 56.9, easeOut);
  const cut = t > 56.75;
  const probe = prog(t, 58.3, 58.75, easeInOut);
  const ok = t > 58.95;
  return (
    <svg width={500} height={800} viewBox="0 0 500 800">
      <rect x={170} y={0} width={160} height={92} rx={14} fill={YEL} stroke={NBK} strokeWidth={6} />
      <path d="M 262 14 L 226 52 L 252 52 L 236 82 L 278 40 L 252 40 Z" fill={NBK} />
      <line x1={250} y1={92} x2={250} y2={330} stroke="#F5C400" strokeWidth={16} />
      <line x1={250} y1={430} x2={250} y2={700} stroke={cut ? '#9AA3B2' : '#F5C400'} strokeWidth={16} />
      <rect x={185} y={330} width={130} height={100} rx={12} fill="#D9DEE7" stroke={NBK} strokeWidth={6} />
      <g transform={`rotate(${-90 * prog(t, 56.3, 56.6, easeInOut)} 250 380)`}><rect x={242} y={340} width={16} height={50} rx={8} fill={RED} stroke={NBK} strokeWidth={3} /></g>
      {Array.from({length: 8}, (_, k) => {
        const p = ((t * 0.7 + k / 8) % 1);
        let y = 100 + p * 600;
        if (cut) { const stack = 318 - (k % 4) * 22; y = Math.min(y, stack); if (100 + p * 600 > 430) return null; }
        return <circle key={k} cx={250 + (cut && y >= 250 ? ((k % 2) * 2 - 1) * 14 : 0)} cy={y} r={11} fill="#fff" stroke={ORANGE} strokeWidth={4} />;
      })}
      {lock > 0 && <g transform={`translate(300, ${400 - (1 - lock) * 70})`}><path d="M 10 0 L 10 -22 A 16 16 0 0 1 42 -22 L 42 0" fill="none" stroke="#9AA3B2" strokeWidth={8} /><rect x={0} y={-4} width={52} height={44} rx={8} fill={RED} stroke={NBK} strokeWidth={4} /><circle cx={26} cy={16} r={6} fill={NBK} /></g>}
      <rect x={110} y={700} width={280} height={90} rx={14} fill="#1F6FA8" stroke={NBK} strokeWidth={6} />
      <g transform={`translate(250 745) rotate(${cut ? 0 : t * 160})`}><path d={gearPath(30, 9)} fill="#C9D2DF" stroke={NBK} strokeWidth={3} /></g>
      <g transform={`translate(${lerp(560, 400, probe)}, ${lerp(560, 690, probe)})`}>
        <rect x={0} y={-60} width={70} height={110} rx={12} fill={NIGHT} stroke={NBK} strokeWidth={4} />
        <rect x={10} y={-48} width={50} height={40} rx={5} fill={ok ? GREEN : '#33405A'} />
        {ok && <text x={35} y={-17} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={30} fill="#fff">✓</text>}
        <line x1={0} y1={30} x2={-24} y2={40} stroke={RED} strokeWidth={6} strokeLinecap="round" />
      </g>
    </svg>
  );
};
const Gauge: React.FC<{t: number}> = ({t}) => {
  const a = lerp(-82, 70, prog(t, 61.2, 63.9, easeInOut)) + (t > 63.9 ? Math.sin((t - 63.9) * 18) * 3 * Math.exp(-(t - 63.9) * 3) : 0);
  const seg = [GREEN, YEL, ORANGE, RED];
  const arc = (a0: number, a1: number, r: number) => { const p = (d: number) => [480 + r * Math.cos(((d - 90) * Math.PI) / 180), 430 + r * Math.sin(((d - 90) * Math.PI) / 180)]; const [x0, y0] = p(a0), [x1, y1] = p(a1); return `M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`; };
  return (
    <svg width={960} height={520} viewBox="0 0 960 520">
      {seg.map((c, k) => <path key={c} d={arc(-90 + k * 45, -90 + (k + 1) * 45, 320)} fill="none" stroke={c} strokeWidth={70} />)}
      <path d={arc(-90, 90, 357)} fill="none" stroke={NBK} strokeWidth={5} />
      <path d={arc(-90, 90, 283)} fill="none" stroke={NBK} strokeWidth={5} />
      <g transform={`rotate(${a} 480 430)`}><path d="M 470 430 L 480 140 L 490 430 Z" fill={NBK} /></g>
      <circle cx={480} cy={430} r={34} fill={NBK} /><circle cx={480} cy={430} r={14} fill="#fff" />
    </svg>
  );
};
const Resultat: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      {t < 54.15 && <Out end={54.15}>
        <Heads h={[[51.6, ['Dangers', 'identifiés'], [0, 1]], [52.2, ['Mesures', 'définies'], [0, 1]]]} />
        <Shot src={IMG.tab} ic="clipboard" x={110} y={450} w={860} h={860} at={51.65} pos="50% 35%" c={GREEN} />
      </Out>}
      {t >= 54.0 && t < 60.75 && <Out end={60.75}>
        <Heads h={[[54.28, ['Avant', 'toute', 'intervention'], [2]], [56.44, ['Maîtriser', 'les énergies'], [1]], [58.28, ['Vérifier', 'la consignation'], [1]]]} />
        <Shot src={IMG.conso} ic="cadenas" x={60} y={460} w={440} h={640} at={54.1} pos="50% 40%" c={RED} />
        <Abs x={520} y={450} w={500} h={800}><Energie t={t} /></Abs>
        <Abs x={60} y={1130} w={440} style={{display: 'flex', justifyContent: 'center'}}>{t > 56.9 && <NBadge at={56.9} text="ÉNERGIES MAÎTRISÉES" bg={RED} rot={-3} size={30} />}</Abs>
        <Abs x={60} y={1280} w={960} style={{display: 'flex', justifyContent: 'center'}}>{t > 59.0 && <NBadge at={59.0} text="CONSIGNATION VÉRIFIÉE ✓" bg={GREEN} rot={-2} size={40} />}</Abs>
      </Out>}
      {t >= 60.6 && <Out end={OUTRO_AT}>
        <Heads h={[[61.0, ['Particulièrement', 'utile'], [0, 1]], [62.84, ['Préparer', 'les travaux'], [1]], [63.68, ['Risques', 'importants'], [0, 1]]]} />
        <Abs x={60} y={480} w={960} h={520} style={{opacity: pop(t, 60.7)}}><Gauge t={t} /></Abs>
        <Abs x={60} y={1010} w={960} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: RED, opacity: pop(t, 63.7)}}>travaux à risques importants</Abs>
        {t > 62.84 && <Abs x={70} y={1090} w={200} h={200} style={{transform: `translateX(${(1 - Math.min(1, spring(t, 62.84))) * -300}px) rotate(-6deg)`}}><F n="clipboard" size={180} /></Abs>}
        {t > 64.1 && <Abs x={300} y={1100} w={600} style={{display: 'flex', justifyContent: 'center'}}><div style={{border: `9px solid ${GREEN}`, borderRadius: 16, padding: '10px 34px', color: GREEN, fontFamily: sansFont, fontWeight: 900, fontSize: 84, letterSpacing: 4, background: '#ffffffd9', transform: `rotate(-8deg) scale(${lerp(2.2, 1, Math.min(1, prog(t, 64.1, 64.35, easeIn)))})`}}>JSA · AST</div></Abs>}
      </Out>}
    </AbsoluteFill>
  );
};

/* ═════════════ Bruitage ═════════════ */
const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at, s: 'sfx/bell', v: 0.2})),
  ...searchCues(2.6, 3, 3.1, 3.45), ...rep(3.75, 3, 0.12, 'tick', 0.3), ...rep(6.65, 3, 0.12, 'tick', 0.3), {at: 8.3, s: 'tampon', v: 0.35},
  {at: 12.6, s: 'sfx/rise', v: 0.3, dur: 0.5}, {at: 13.0, s: 'bass-hit', v: 0.45}, {at: 14.2, s: 'riser', v: 0.25, dur: 1.7}, ...rep(14.4, 5, 0.33, 'sfx/pop', 0.22), ...rep(17.0, 5, 0.14, 'sfx/thud', 0.25), {at: 17.8, s: 'validation', v: 0.3},
  ...[22.3, ...LIFT.map(([, b]) => b)].map((b) => ({at: b, s: 'sfx/ding', v: 0.35})), ...LIFT.map(([a]) => ({at: a, s: 'soft-whoosh', v: 0.25, dur: 0.6})),
  {at: 31.35, s: 'sfx/whoosh', v: 0.35}, {at: 32.7, s: 'deep-hit', v: 0.45}, {at: 32.75, s: 'sfx/swish', v: 0.4}, ...rep(33.6, 5, 0.13, 'sfx/pop', 0.25),
  ...ST5.map(([, , at]) => ({at: at - 0.35, s: 'tick', v: 0.35})), ...rep(36.4, 3, 0.4, 'sfx/click', 0.3), {at: 38.75, s: 'sfx/click', v: 0.55}, {at: 38.8, s: 'sfx/thud', v: 0.35},
  {at: 40.9, s: 'sfx/swish', v: 0.35}, {at: 41.7, s: 'cadenas', v: 0.55}, {at: 42.2, s: 'sfx/thud', v: 0.3}, ...rep(44.0, 6, 0.3, 'sfx/click', 0.2), {at: 47.08, s: 'validation', v: 0.35}, {at: 47.3, s: 'cadenas', v: 0.35}, {at: 48.3, s: 'sfx/rise', v: 0.3, dur: 0.7},
  {at: 51.65, s: 'sfx/whoosh', v: 0.3}, {at: 54.1, s: 'sfx/whoosh', v: 0.35}, {at: 56.3, s: 'sfx/swish', v: 0.3}, {at: 56.85, s: 'cadenas', v: 0.6}, {at: 56.95, s: 'sfx/pop', v: 0.3}, {at: 58.3, s: 'soft-whoosh', v: 0.3, dur: 0.6}, {at: 58.95, s: 'notification', v: 0.35}, {at: 59.0, s: 'validation', v: 0.3},
  {at: 60.7, s: 'sfx/whoosh', v: 0.3}, {at: 61.2, s: 'tension', v: 0.2, dur: 2.7}, {at: 62.84, s: 'sfx/swish', v: 0.3}, {at: 63.7, s: 'alarme', v: 0.18, dur: 0.6}, {at: 64.3, s: 'tampon', v: 0.55},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SCN: [React.FC, number, number][] = [[Intro, 2.5, 9.4], [Methode, 12.9, 19.0], [Schema, 22.35, 27.9], [Exemple, 31.3, 35.45], [Etapes, 35.3, 48.9], [Resultat, 51.55, OUTRO_AT]];
export const JsaAstMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    {SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    {[38.08, 40.48, 43.4, 46.08].map((a) => <Gate key={a} from={a} to={a + 0.9}><GyroFlash at={a} /></Gate>)}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-jsa-ast-metro-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn, Barred, Flap];
