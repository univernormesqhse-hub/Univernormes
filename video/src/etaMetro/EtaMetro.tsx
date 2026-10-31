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
 * « ETA — analyse par arbre des événements » (voix d'origine, 59 s) — capsule « condensé + effet wahou + ultra
 * premium » présentée en métro (7 stations). Tube de verre à six guichets : définition → FTA vs ETA → schéma →
 * exemple → issues → conséquences ; la capsule file d'un guichet à l'autre. Gyrophare, loupe, capsule pneumatique,
 * store vénitien, éclairs de gyrophare ; barre de recherche « ETA » qui ouvre le sigle. Techniques : lettres E · T · A
 * qui déplient leurs mots (Event, Tree, Analysis) avec traduction qui glisse, miroir FTA ◀◀ causes / ETA ▶▶ scénarios
 * avec barre de lecture façon magnétoscope et événement qui passe de « redouté » à « initiateur », arbre des
 * événements en SVG (branches succès en vert / échec en rouge qui se tracent, pastilles ✓ / ✗, feuilles colorées
 * selon le nombre d'échecs), départ de feu animé sur photo, 3 barrières jouées (détecteur qui clignote et émet,
 * sprinkler qui arrose et réduit la flamme, camion de pompiers gyrophares allumés) pendant que l'arbre se construit
 * colonne par colonne, deux plans d'atelier — feu maîtrisé vs propagation case par case jusqu'à l'incendie
 * généralisé —, zoom arrière qui révèle l'arbre complet. Kits capsule-ui-neo-brutal et capsule-recit-illustre ;
 * images de la session réutilisées.
 */
const IMG = {
  cover: 'permisfeu/soudeur-etincelles.jpg',
  c1: 'ident/electrique.jpg',
  c2: 'promo/hse-machine.jpg',
  atelier: 'permisfeu/soudeur-etincelles.jpg',
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
const OUTRO_AT = 59.3;
export const ETA_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.6, n: '1', title: 'ETA', s: 'event tree analysis', c: RED, g: 'définition', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 7.9, n: '2', title: 'FTA vs ETA', s: 'causes ◀ · ▶ scénarios', c: ORANGE, g: 'comparaison', k: 'gyro', lab: 'GUICHET 2 / 6'},
  {at: 18.2, n: '3', title: 'Le schéma', s: 'succès · échec', c: BLUE, g: 'schéma', k: 'loupe', lab: 'GUICHET 3 / 6'},
  {at: 28.15, n: '4', title: 'Exemple', s: 'départ de feu · atelier', c: NAVY, g: 'exemple', k: 'tube', lab: 'GUICHET 4 / 6'},
  {at: 46.55, n: '5', title: 'Les issues', s: 'fonctionnement ou défaillance', c: VIO, g: 'issues', k: 'store', lab: 'GUICHET 5 / 6'},
  {at: 54.6, n: '6', title: 'Les conséquences', s: "tout l'arbre", c: GREEN, g: 'conséquences', k: 'none', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 58.6;
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
  {n: 1, l: 'ETA', s: 'eta', at: 2.9},
  {n: 2, l: 'Initiateur', s: 'initiateur', at: 13.9},
  {n: 3, l: 'Branches', s: 'branches', at: 22.1},
  {n: 4, l: 'Départ de feu', s: 'départ feu', at: 31.8},
  {n: 5, l: 'Détecteur', s: 'détecteur', at: 37.2},
  {n: 6, l: 'Secours', s: 'secours', at: 44.2},
  {n: 7, l: 'Incendie généralisé', s: 'généralisé', at: 53.2},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE ETA · STATION {r.n} / 7</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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
      <Abs x={0} y={590} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="ANALYSE PAR" src={IMG.c2} size={92} ls={2} seed={2} /></Abs>
      <Abs x={0} y={700} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="ARBRE DES" src={IMG.c2} size={92} ls={2} seed={4} /></Abs>
      <Abs x={0} y={810} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="ÉVÉNEMENTS :" src={IMG.c2} size={86} ls={1} seed={5} /></Abs>
      <Abs x={0} y={925} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="ETA" src={IMG.c1} size={220} ls={6} /></Abs>
      <Abs x={40} y={1200} w={1000} style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10}}>{[['INITIATEUR', NAVY], ['BARRIÈRES', BLUE], ['SUCCÈS', GREEN], ['ÉCHEC', RED]].map(([n, c], k) => <div key={n} style={{...nb(c, 4), padding: '6px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', transform: `translateY(${(1 - Math.min(1, spring(t, 0.3 + k * 0.08))) * 60}px)`}}>{n}</div>)}</Abs>
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

/* ═════════════ Arbre des événements (SVG) : branches succès (haut, vert) / échec (bas, rouge) qui se tracent ═════════════ */
const cl = (x: number) => Math.max(0, Math.min(1, x));
const LEAFC = [GREEN, YEL, ORANGE, RED];
const EventTree: React.FC<{w: number; h: number; n: number; pr: number[]; leaf: number; headers: string[]; init: string[]; leafLabels?: (string | null)[]; t: number}> = ({w, h, n, pr, leaf, headers, init, leafLabels = [], t}) => {
  const IW = 200, leafW = n === 3 ? 140 : 210, top = 70;
  const x0 = IW + 30, x1 = w - leafW - 16;
  const colX = (k: number) => x0 + (k + 0.45) * ((x1 - x0) / n);
  const yN = (lv: number, j: number) => top + ((h - top) * (2 * j + 1)) / 2 ** (lv + 1);
  const mid = yN(0, 0);
  const rowH = (h - top) / 2 ** n;
  const els: React.ReactNode[] = [];
  const inc = (k: number) => (k === 0 ? cl(pr[0] / 0.3) : 1);
  if (pr[0] > 0) els.push(<line key="in" x1={IW} y1={mid} x2={IW + (colX(0) - IW) * inc(0)} y2={mid} stroke={NBK} strokeWidth={6} />);
  for (let k = 0; k < n; k++) {
    const p = pr[k] ?? 0;
    if (p <= 0) continue;
    const v = k === 0 ? cl((p - 0.3) / 0.3) : cl(p / 0.4);
    const hz = k === 0 ? cl((p - 0.6) / 0.4) : cl((p - 0.4) / 0.6);
    const nx = k < n - 1 ? colX(k + 1) : x1;
    for (let j = 0; j < 2 ** k; j++) {
      const y = yN(k, j), yU = yN(k + 1, 2 * j), yD = yN(k + 1, 2 * j + 1);
      const cx = colX(k);
      els.push(<line key={`v${k}${j}`} x1={cx} y1={y - (y - yU) * v} x2={cx} y2={y + (yD - y) * v} stroke={NBK} strokeWidth={5} />);
      if (hz > 0) {
        els.push(<line key={`u${k}${j}`} x1={cx} y1={yU} x2={cx + (nx - cx) * hz} y2={yU} stroke={GREEN} strokeWidth={7} strokeLinecap="round" />);
        els.push(<line key={`d${k}${j}`} x1={cx} y1={yD} x2={cx + (nx - cx) * hz} y2={yD} stroke={RED} strokeWidth={7} strokeLinecap="round" />);
      }
      if (hz > 0.35) {
        const r = n === 3 && k === 2 ? 11 : 15;
        els.push(<g key={`bu${k}${j}`} transform={`translate(${cx + 34} ${yU})`}><circle r={r} fill={GREEN} stroke={NBK} strokeWidth={3} /><text y={r * 0.45} textAnchor="middle" fontSize={r * 1.3} fontWeight={900} fill="#fff">✓</text></g>);
        els.push(<g key={`bd${k}${j}`} transform={`translate(${cx + 34} ${yD})`}><circle r={r} fill={RED} stroke={NBK} strokeWidth={3} /><text y={r * 0.45} textAnchor="middle" fontSize={r * 1.3} fontWeight={900} fill="#fff">✗</text></g>);
      }
    }
    els.push(<text key={`h${k}`} x={colX(k) + 30} y={36} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={n === 3 ? 26 : 30} fill={BLUE} opacity={cl(p * 3)}>{headers[k]}</text>);
  }
  const leaves = 2 ** n;
  for (let j = 0; j < leaves; j++) {
    const lp = cl((leaf - j / (leaves * 1.4)) * 3);
    if (lp <= 0) continue;
    const f = j.toString(2).split('').filter((c) => c === '1').length;
    const c = n === 3 ? LEAFC[f] : [GREEN, ORANGE, RED][f];
    const y = yN(n, j), hh = Math.min(rowH - 8, 88);
    els.push(
      <g key={`l${j}`} transform={`translate(${x1 + (1 - lp) * 40} ${y - hh / 2})`} opacity={lp}>
        <rect width={leafW} height={hh} rx={10} fill={c} stroke={NBK} strokeWidth={4} />
        {leafLabels[j] && <text x={leafW / 2} y={hh / 2 + 9} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={n === 3 ? 19 : 26} fill={f === 1 && n === 3 ? NBK : '#fff'}>{leafLabels[j]}</text>}
      </g>,
    );
  }
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {els}
      <g opacity={cl(t > 0 ? 1 : 0)}>
        <rect x={0} y={mid - 70} width={IW} height={140} rx={16} fill={NAVY} stroke={NBK} strokeWidth={6} />
        {init.map((l, i) => <text key={l} x={IW / 2} y={mid - (init.length - 1) * 15 + i * 30 + 10} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={24} fill="#fff">{l}</text>)}
      </g>
    </svg>
  );
};

/* ═════════════ Guichet 1 : ETA ? → recherche → lettres qui déplient leurs mots ═════════════ */
const WORDS3: [string, string, string, number, string][] = [['E', 'vent', 'événements', 7.44, RED], ['T', 'ree', 'arbre', 6.92, GREEN], ['A', 'nalysis', 'analyse', 6.12, BLUE]];
const Intro: React.FC = () => {
  const t = useT();
  return (
    <Out end={7.95}>
      <Heads h={[[2.85, ['ETA', '?'], [0]], [3.2, ['Event', 'Tree', 'Analysis'], [0, 1, 2]], [6.12, ['Analyse', 'par arbre', 'des événements'], [1, 2]]]} />
      <SearchOpen x={60} y={440} w={960} h={900} at={2.6} query="ETA" results={['ETA · Event Tree Analysis', 'FTA · arbre des défaillances', 'AMDEC · modes de défaillance']} found={0} foundAt={3.0} clickAt={3.3} c={RED}>
        {WORDS3.map(([L, rest, fr, frAt, c], k) => {
          const a = 4.0 + k * 0.12;
          const unfold = prog(t, a + 0.35, a + 0.85, easeOut);
          return (
            <div key={L} style={{position: 'absolute', left: 50, right: 30, top: 70 + k * 210, height: 190, display: 'flex', alignItems: 'center', opacity: pop(t, a, 0.25)}}>
              <div style={{width: 160, height: 170, ...nb(c, 7), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 130, color: '#fff', transform: `scale(${Math.min(1, spring(t, a, 9, 14))}) rotate(${(1 - unfold) * -6}deg)`}}>{L}</div>
              <div style={{overflow: 'hidden', maxWidth: unfold * 420, whiteSpace: 'nowrap', fontFamily: sansFont, fontWeight: 900, fontSize: 84, color: INK, marginLeft: 12}}>{rest}</div>
              {t > frAt && <div style={{marginLeft: 'auto', ...nb(YEL, 5), padding: '6px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, transform: `translateX(${(1 - Math.min(1, spring(t, frAt))) * 200}px)`}}>{fr}</div>}
            </div>
          );
        })}
        <div style={{position: 'absolute', left: 0, right: 0, top: 720, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: pop(t, 6.9)}}><F n="arbre" size={100} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: GREEN}}>arbre des événements</div></div>
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ Guichet 2 : FTA ◀◀ causes  vs  ETA ▶▶ scénarios ═════════════ */
const SIDE_Y = [640, 860, 1080];
const Compare: React.FC = () => {
  const t = useT();
  const fta = prog(t, 11.5, 12.0, easeOut);
  const eta = prog(t, 14.4, 16.3, easeInOut);
  const etaOn = t > 12.84;
  const head = t < 12.84 ? lerp(0, -1, prog(t, 11.5, 12.3, easeInOut)) : lerp(-1, 1, prog(t, 12.9, 17.4, easeInOut));
  const ini = t >= 13.92;
  return (
    <Out end={18.25}>
      <Heads h={[[11.5, ['FTA', '→', 'les causes'], [0, 2]], [12.84, ['ETA', '→', 'les scénarios'], [0, 2]]]} />
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        <defs><marker id="arR" markerWidth={10} markerHeight={10} refX={6} refY={5} orient="auto"><path d="M 0 0 L 10 5 L 0 10 Z" fill={ORANGE} /></marker><marker id="arG" markerWidth={10} markerHeight={10} refX={6} refY={5} orient="auto"><path d="M 0 0 L 10 5 L 0 10 Z" fill={GREEN} /></marker></defs>
        {SIDE_Y.map((y, k) => fta > 0 && <line key={`f${k}`} x1={210} y1={y} x2={lerp(210, 372, fta)} y2={lerp(y, 860, fta)} stroke={ORANGE} strokeWidth={8} markerEnd="url(#arR)" opacity={etaOn ? 0.3 : 1} />)}
        {SIDE_Y.map((y, k) => eta > k / 3 && <line key={`e${k}`} x1={708} y1={860} x2={lerp(708, 862, cl(eta * 3 - k))} y2={lerp(860, y, cl(eta * 3 - k))} stroke={GREEN} strokeWidth={8} markerEnd="url(#arG)" />)}
      </svg>
      <Abs x={60} y={470} w={300} style={{opacity: etaOn ? 0.35 : pop(t, 11.5)}}><div style={{...nb(ORANGE, 6), color: '#fff', padding: '8px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 40, display: 'inline-block'}}>FTA</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: ORANGE, marginTop: 8}}>◀◀ les causes</div></Abs>
      <Abs x={720} y={470} w={300} style={{textAlign: 'right', opacity: etaOn ? pop(t, 12.84) : 0.25}}><div style={{...nb(GREEN, 6), color: '#fff', padding: '8px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 40, display: 'inline-block'}}>ETA</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: GREEN, marginTop: 8}}>les scénarios ▶▶</div></Abs>
      {SIDE_Y.map((y, k) => <Abs key={`c${k}`} x={90} y={y - 60} w={120} h={120} style={{...nb('#fff', 5), borderRadius: 60, borderColor: ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: etaOn ? 0.3 : pop(t, 11.5 + k * 0.08)}}><F n="question" size={66} /></Abs>)}
      {SIDE_Y.map((y, k) => t > 16.32 + k * 0.1 && <Abs key={`s${k}`} x={870} y={y - 60} w={120} h={120} style={{...nb([GREEN, YEL, RED][k], 5), borderRadius: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1, spring(t, 16.32 + k * 0.1))})`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 56}}>?</Abs>)}
      <Abs x={372} y={770} w={336} h={180} style={{...nb(ini ? NAVY : RED, 8), color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', transform: `scale(${1 + Math.max(0, 1 - Math.abs(t - 13.92) * 4) * 0.1})`}}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, lineHeight: 1.08}}>ÉVÉNEMENT<br />{ini ? 'INITIATEUR' : 'REDOUTÉ'}</div>
      </Abs>
      <Abs x={140} y={1190} w={800} h={110} style={{...nb(NIGHT, 7), display: 'flex', alignItems: 'center', padding: '0 24px', gap: 20}}>
        <span style={{fontSize: 44, color: !etaOn ? ORANGE : '#3B4660'}}>◀◀</span>
        <div style={{flex: 1, height: 10, borderRadius: 5, background: '#33405A', position: 'relative'}}>
          <div style={{position: 'absolute', left: '50%', top: -6, width: 4, height: 22, background: '#5B6B8C'}} />
          <div style={{position: 'absolute', left: `${50 + head * 46}%`, top: -13, width: 36, height: 36, marginLeft: -18, borderRadius: 18, background: etaOn ? GREEN : ORANGE, border: '4px solid #fff'}} />
        </div>
        <span style={{fontSize: 44, color: etaOn ? GREEN : '#3B4660'}}>▶▶</span>
      </Abs>
    </Out>
  );
};

/* ═════════════ Guichet 3 : le schéma — arbre à 2 barrières, 4 scénarios finaux ═════════════ */
const Schema: React.FC = () => {
  const t = useT();
  return (
    <Out end={28.2}>
      <Heads h={[[21.9, ['Événement', 'initiateur'], [0, 1]], [22.08, ['Plusieurs', 'branches'], [1]], [23.48, ['Succès', 'ou', 'échec'], [0, 2]], [24.52, ['Barrières', 'de sécurité'], [0, 1]], [26.08, ['Scénarios', 'finaux'], [0, 1]]]} />
      <Abs x={60} y={470} w={960} h={820} style={{opacity: pop(t, 21.9)}}>
        <EventTree w={960} h={820} n={2} t={t} pr={[prog(t, 22.0, 23.0), prog(t, 24.5, 25.3)]} leaf={prog(t, 26.0, 27.6)} headers={['barrière 1', 'barrière 2']} init={['ÉVÉNEMENT', 'INITIATEUR']} leafLabels={['scénario 1', 'scénario 2', 'scénario 3', 'scénario 4']} />
      </Abs>
      {t > 23.48 && <Abs x={60} y={1300} w={960} style={{display: 'flex', justifyContent: 'center', gap: 20}}><NBadge at={23.48} text="✓ SUCCÈS" bg={GREEN} rot={-3} size={34} />{t > 24.08 && <NBadge at={24.08} text="✗ ÉCHEC" bg={RED} rot={3} size={34} />}</Abs>}
    </Out>
  );
};

/* ═════════════ Guichet 4 : exemple — départ de feu, puis 3 barrières jouées et arbre construit colonne par colonne ═════════════ */
const Flames: React.FC<{t: number; s: number; x: number; y: number}> = ({t, s, x, y}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[0, 1, 2, 3, 4, 5, 6].map((k) => { const h = (120 + Math.sin(t * 11 + k * 1.7) * 26) * (1 - Math.abs(k - 3) * 0.14); const px = (k - 3) * 30; return <path key={k} d={`M ${px - 22} 0 Q ${px - 30} ${-h * 0.6} ${px} ${-h} Q ${px + 30} ${-h * 0.6} ${px + 22} 0 Z`} fill={[RED, ORANGE, YEL][k % 3]} stroke={NBK} strokeWidth={2} />; })}
  </g>
);
const QS3: [string, number, number, string][] = [['Détecteur incendie', 35.92, 37.2, 'Détecteur'], ["Système d'extinction", 39.36, 40.56, 'Extinction'], ['Intervention des secours', 42.96, 44.16, 'Secours']];
const Barrier: React.FC<{t: number; q: number}> = ({t, q}) => {
  let body: React.ReactNode = null;
  if (q === 0) {
    const on = t > 37.9;
    body = <>
      <rect x={0} y={0} width={620} height={40} fill="#C9D2DF" />
      <g transform="translate(310 66)"><ellipse rx={90} ry={30} fill="#fff" stroke={NBK} strokeWidth={6} /><circle cx={50} cy={0} r={10} fill={on && Math.sin(t * 16) > 0 ? RED : '#9AA3B2'} /></g>
      {on && [0, 1, 2].map((k) => { const q2 = ((t - 37.9) * 1.4 + k / 3) % 1; return <path key={k} d={`M ${310 - 110 - q2 * 120} ${70 + q2 * 40} Q 310 ${140 + q2 * 120} ${310 + 110 + q2 * 120} ${70 + q2 * 40}`} fill="none" stroke={RED} strokeWidth={6} opacity={1 - q2} />; })}
      {Array.from({length: 7}, (_, k) => { const p = ((t * 0.5 + k / 7) % 1); return <circle key={k} cx={310 + Math.sin(k * 2.2) * 50} cy={330 - p * 230} r={18 + p * 34} fill="#5B6472" opacity={(1 - p) * 0.45} />; })}
      <Flames t={t} s={0.55} x={310} y={400} />
    </>;
  } else if (q === 1) {
    const spray = prog(t, 40.9, 41.3);
    body = <>
      <rect x={0} y={0} width={620} height={40} fill="#C9D2DF" /><rect x={0} y={40} width={620} height={18} fill="#9AA3B2" />
      <g transform="translate(310 58)"><rect x={-12} y={0} width={24} height={30} fill="#9AA3B2" stroke={NBK} strokeWidth={4} /><path d="M -46 40 L 46 40 L 30 30 L -30 30 Z" fill={RED} stroke={NBK} strokeWidth={4} /></g>
      {spray > 0 && Array.from({length: 40}, (_, k) => { const p = ((t * 1.3 + k / 40) % 1); const a = ((k % 10) / 9 - 0.5) * 1.6; return <circle key={k} cx={310 + Math.sin(a) * p * 300} cy={100 + Math.cos(a) * p * 300} r={6} fill={BLUE} opacity={(1 - p * 0.6) * spray} />; })}
      <Flames t={t} s={0.6 * (1 - prog(t, 41.4, 42.6) * 0.75)} x={310} y={400} />
    </>;
  } else {
    const x = lerp(760, 230, prog(t, 43.1, 44.5, easeOut));
    body = <>
      <rect x={0} y={360} width={620} height={70} fill="#5B6472" />{[0, 1, 2, 3, 4].map((k) => <rect key={k} x={((k * 140 - (t * 200) % 140) + 700) % 700 - 60} y={392} width={70} height={8} fill="#fff" />)}
      <Flames t={t} s={0.5 * (1 - prog(t, 45.0, 46.2) * 0.6)} x={70} y={360} />
      <g transform={`translate(${x} 250)`}>
        <rect x={0} y={20} width={280} height={95} rx={12} fill={RED} stroke={NBK} strokeWidth={5} />
        <rect x={190} y={-20} width={90} height={60} rx={10} fill={RED} stroke={NBK} strokeWidth={5} /><rect x={205} y={-8} width={60} height={30} rx={5} fill="#BFD7EA" stroke={NBK} strokeWidth={3} />
        <path d="M 20 10 L 180 -30" stroke="#9AA3B2" strokeWidth={10} /><path d="M 20 0 L 180 -40" stroke="#9AA3B2" strokeWidth={4} />
        <rect x={200} y={-34} width={30} height={14} rx={4} fill={Math.sin(t * 18) > 0 ? RED : '#fff'} stroke={NBK} strokeWidth={3} /><rect x={238} y={-34} width={30} height={14} rx={4} fill={Math.sin(t * 18) > 0 ? '#fff' : BLUE} stroke={NBK} strokeWidth={3} />
        {[50, 220].map((wx) => <g key={wx} transform={`translate(${wx} 118) rotate(${t * 500})`}><circle r={26} fill={NBK} /><circle r={10} fill="#C9D2DF" /><rect x={-3} y={-24} width={6} height={14} fill="#C9D2DF" /></g>)}
      </g>
    </>;
  }
  return (
    <svg width={620} height={430} viewBox="0 0 620 430">
      <rect width={620} height={430} fill="#EEF2F7" />
      {body}
    </svg>
  );
};
const Exemple: React.FC = () => {
  const t = useT();
  const q = QS3.reduce((a, x, k) => (t >= x[1] - 0.2 ? k : a), 0);
  const phase2 = t >= 35.6;
  return (
    <Out end={46.65}>
      <Heads h={[[31.8, ['Un', 'départ', 'de feu'], [1, 2]], [33.04, ['Examiner', 'les', 'barrières'], [2]], [35.92, ['Le', 'détecteur', 'fonctionne-t-il ?'], [1]], [39.36, ['Le système', "d'extinction", '?'], [1]], [42.96, ['Les secours', 'efficaces ?'], [0, 1]]]} />
      {!phase2 && <>
        <Shot src={IMG.atelier} ic="usine" x={60} y={450} w={960} h={760} at={31.8} pos="50% 50%" c={RED}>
          <svg width={960} height={760} style={{position: 'absolute', left: 0, top: 0}}>
            {Array.from({length: 8}, (_, k) => { const p = ((t * 0.4 + k / 8) % 1); return <circle key={k} cx={700 + Math.sin(k * 2.1) * 70 + p * 60} cy={700 - p * 520} r={(30 + p * 70) * prog(t, 31.9, 32.6)} fill="#3B4250" opacity={(1 - p) * 0.55} />; })}
            <Flames t={t} s={1.3 * prog(t, 31.9, 32.6, easeOut)} x={700} y={760} />
          </svg>
          {t > 32.1 && <div style={{position: 'absolute', left: 24, top: 24}}><NBadge at={32.1} text="DÉPART DE FEU" bg={RED} rot={-3} size={34} /></div>}
        </Shot>
        {t > 33.6 && <Abs x={60} y={1225} w={960} style={{display: 'flex', justifyContent: 'center', gap: 18}}>{[0, 1, 2].map((k) => <div key={k} style={{...nb('#fff', 5), borderColor: BLUE, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: BLUE, transform: `translateY(${(1 - Math.min(1, spring(t, 33.6 + k * 0.15))) * 120}px)`}}><F n="bouclier" size={44} />barrière {k + 1}</div>)}</Abs>}
      </>}
      {phase2 && <>
        <Abs x={60} y={440} w={960} h={470} style={{...nb('#fff', 6), padding: 10, opacity: pop(t, 35.6)}}>
          <EventTree w={936} h={446} n={3} t={t} pr={QS3.map(([, , at]) => prog(t, at - 0.1, at + 0.6))} leaf={prog(t, 45.6, 46.4)} headers={QS3.map((x) => x[3])} init={['DÉPART', 'DE FEU']} />
        </Abs>
        <Abs x={60} y={935} w={960} h={440} style={{...nb('#fff', 7), borderColor: [ORANGE, BLUE, RED][q], overflow: 'hidden', opacity: pop(t, 35.7)}}>
          <div style={{position: 'absolute', left: 6, top: 4}}><Barrier t={t} q={q} /></div>
          <div style={{position: 'absolute', right: 20, top: 24, width: 300}}>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM, letterSpacing: 2}}>QUESTION {q + 1} / 3</div>
            <div key={q} style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, lineHeight: 1.05, marginTop: 6, opacity: pop(t, QS3[q][1] - 0.2)}}>{QS3[q][0]} ?</div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 12, marginTop: 22}}>
              {[['✓ fonctionne', GREEN], ['✗ défaillance', RED]].map(([l, c], i) => <div key={l} style={{...nb(c, 4), color: '#fff', padding: '8px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, transform: `scale(${t > QS3[q][2] + i * 0.25 ? 1 + Math.max(0, 1 - (t - QS3[q][2] - i * 0.25) * 4) * 0.12 : 0.92})`, opacity: t > QS3[q][2] - 0.3 + i * 0.25 ? 1 : 0.3}}>{l}</div>)}
            </div>
          </div>
        </Abs>
      </>}
    </Out>
  );
};

/* ═════════════ Guichet 5 : les issues — même départ de feu : maîtrisé vs généralisé (propagation case par case) ═════════════ */
const GC = 8, GR = 4, OX = 2, OY = 1;
const Plan: React.FC<{t: number; ko: boolean}> = ({t, ko}) => (
  <div style={{display: 'grid', gridTemplateColumns: `repeat(${GC}, 1fr)`, gap: 6, padding: 12}}>
    {Array.from({length: GC * GR}, (_, i) => {
      const x = i % GC, y = Math.floor(i / GC);
      const d = Math.abs(x - OX) + Math.abs(y - OY);
      const origin = d === 0;
      const ignite = origin ? 50.2 : ko ? 52.4 + d * 0.13 : 999;
      const out = !ko && origin && t > 51.1;
      const burning = t > ignite && !out;
      const k = burning ? cl((t - ignite) * 2) : 0;
      return (
        <div key={i} style={{height: 70, borderRadius: 8, border: `3px solid ${NBK}`, background: out ? GREEN : burning ? `rgb(${Math.round(lerp(245, 224, k))},${Math.round(lerp(220, 70, k))},${Math.round(lerp(190, 40, k))})` : '#F4EEDF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, color: '#fff', fontWeight: 900}}>
          {out ? '✓' : burning ? <div style={{transform: `scale(${0.7 + 0.25 * Math.sin(t * 12 + i)})`}}><F n="feu" size={44} /></div> : null}
        </div>
      );
    })}
  </div>
);
const Issues: React.FC = () => {
  const t = useT();
  return (
    <Out end={54.65}>
      <Heads h={[[50.15, ['Rapidement', 'maîtrisé'], [1]], [52.4, ['Ou', 'incendie', 'généralisé'], [1, 2]]]} />
      <Abs x={60} y={450} w={960} h={420} style={{...nb('#fff', 7), borderColor: GREEN, opacity: pop(t, 50.15)}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px 0'}}><F n="extincteur" size={50} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: GREEN}}>FEU RAPIDEMENT MAÎTRISÉ</span>{t > 51.2 && <span style={{marginLeft: 'auto'}}><NBadge at={51.2} text="✓" bg={GREEN} rot={0} size={34} /></span>}</div>
        <Plan t={t} ko={false} />
      </Abs>
      <Abs x={60} y={900} w={960} h={420} style={{...nb('#fff', 7), borderColor: RED, opacity: pop(t, 50.3)}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px 0'}}><F n="feu" size={50} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: RED}}>INCENDIE GÉNÉRALISÉ</span>{t > 53.4 && <span style={{marginLeft: 'auto'}}><NBadge at={53.4} text="✗" bg={RED} rot={0} size={34} /></span>}</div>
        <Plan t={t} ko />
      </Abs>
    </Out>
  );
};

/* ═════════════ Guichet 6 : les conséquences — zoom arrière qui révèle tout l'arbre ═════════════ */
const Consequences: React.FC = () => {
  const t = useT();
  const z = lerp(2.6, 1, prog(t, 55.5, 56.9, easeInOut));
  return (
    <Out end={OUTRO_AT}>
      <Heads h={[[54.91, ["L'ETA", 'étudie', 'les conséquences'], [2]], [57.8, ["D'un", 'événement', 'initiateur'], [1, 2]]]} />
      <Abs x={60} y={450} w={960} h={830} style={{overflow: 'hidden', ...nb('#fff', 7), opacity: pop(t, 54.7)}}>
        <div style={{position: 'absolute', left: 12, top: 12, transform: `scale(${z})`, transformOrigin: '10% 50%'}}>
          <EventTree w={936} h={806} n={3} t={t} pr={[1, 1, 1]} leaf={prog(t, 56.7, 57.4)} headers={['Détecteur', 'Extinction', 'Secours']} init={['DÉPART', 'DE FEU']} leafLabels={['maîtrisé', null, null, null, null, null, null, 'généralisé']} />
        </div>
      </Abs>
      {t > 58.0 && <Abs x={80} y={1150} w={600} style={{display: 'flex', justifyContent: 'flex-start'}}><div style={{border: `8px solid ${GREEN}`, borderRadius: 14, padding: '4px 24px', color: GREEN, fontFamily: sansFont, fontWeight: 900, fontSize: 48, letterSpacing: 4, background: '#ffffffd9', transform: `rotate(-5deg) scale(${lerp(2, 1, Math.min(1, prog(t, 58.0, 58.25, easeIn)))})`}}>ETA ▶ CONSÉQUENCES</div></Abs>}
    </Out>
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
  ...searchCues(2.6, 3, 3.0, 3.3), ...rep(4.0, 3, 0.12, 'sfx/thud', 0.3), ...rep(4.4, 3, 0.12, 'sfx/swish', 0.25), ...WORDS3.map(([, , , at]) => ({at, s: 'sfx/pop', v: 0.3})),
  {at: 11.5, s: 'sfx/swish', v: 0.35}, {at: 12.9, s: 'sfx/rise', v: 0.3, dur: 0.8}, {at: 13.92, s: 'sfx/thud', v: 0.4}, ...rep(14.6, 3, 0.6, 'sfx/swish', 0.25), ...rep(16.32, 3, 0.1, 'sfx/pop', 0.3),
  {at: 22.0, s: 'sfx/swish', v: 0.3}, {at: 23.48, s: 'validation', v: 0.3}, {at: 24.08, s: 'sfx/thud', v: 0.4}, {at: 24.5, s: 'sfx/swish', v: 0.3}, ...rep(26.0, 4, 0.35, 'sfx/pop', 0.25),
  {at: 31.9, s: 'deep-hit', v: 0.45}, {at: 32.0, s: 'sfx/rise', v: 0.3, dur: 0.8}, {at: 32.1, s: 'tampon', v: 0.3}, ...rep(33.6, 3, 0.15, 'sfx/pop', 0.25),
  {at: 35.6, s: 'sfx/whoosh', v: 0.3}, ...QS3.flatMap(([, at, br]) => [{at, s: 'tick', v: 0.35}, {at: br, s: 'sfx/swish', v: 0.3}, {at: br + 0.4, s: 'sfx/pop', v: 0.25}] as Sfx[]),
  {at: 37.9, s: 'alarme', v: 0.22, dur: 1.4}, {at: 40.9, s: 'soft-whoosh', v: 0.35, dur: 1.6}, {at: 43.1, s: 'alarme', v: 0.15, dur: 1.4}, {at: 45.6, s: 'validation', v: 0.25},
  {at: 50.2, s: 'deep-hit', v: 0.35}, {at: 51.1, s: 'validation', v: 0.35}, {at: 52.4, s: 'riser', v: 0.3, dur: 1.2}, {at: 53.4, s: 'bass-hit', v: 0.45},
  {at: 55.5, s: 'soft-whoosh', v: 0.4, dur: 1.4}, ...rep(56.7, 8, 0.08, 'sfx/pop', 0.18), {at: 58.0, s: 'tampon', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SCN: [React.FC, number, number][] = [[Intro, 2.5, 8.0], [Compare, 11.45, 18.3], [Schema, 21.85, 28.25], [Exemple, 31.75, 46.7], [Issues, 50.1, 54.7], [Consequences, 54.6, OUTRO_AT]];
export const EtaMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    {SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    {[35.6, 54.6].map((a) => <Gate key={a} from={a} to={a + 0.9}><GyroFlash at={a} /></Gate>)}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-eta-metro-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn, Barred, Flap];
