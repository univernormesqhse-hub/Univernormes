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
 * « Animer la sécurité sur le terrain » (causerie, quart d'heure, minute sécurité — voix d'origine, 5 min 36) —
 * capsule « condensé + effet wahou + ultra premium » présentée en métro : une ligne à 8 stations. Tube de verre à six
 * guichets : pourquoi → pédagogie → format → règles d'or → lancer → à retenir ; la capsule file d'un guichet à
 * l'autre. Gyrophare (principal), loupe, store vénitien, capsule pneumatique ; barre de recherche « animation sécurité
 * terrain » qui écarte l'audit formel et ouvre la causerie. Fil wahou : le cercle de causerie (participants, écoute,
 * niveaux, réticences, échanges), barreaux de prison sur « 75 000 € », curseur petite ↔ grosse structure, 40 visites
 * qui se répartissent, faux générique « à la semaine prochaine » rembobiné en VHS, chrono 15 min, feuille d'émargement
 * qui se signe. Kits capsule-ui-neo-brutal et capsule-recit-illustre. Couverture : photo + « CAUSERIE / SÉCURITÉ » en
 * lettres-photos animées.
 */
const IMG = {
  cover: 'causerie/groupe.jpg',
  c1: 'causerie/groupe.jpg',
  c2: 'causerie/animatrice.jpg',
  groupe: 'causerie/groupe.jpg',
  anim: 'causerie/animatrice-d.png',
  chef: 'causerie/manager-d.png',
  orateur: 'causerie/orateur.jpg',
  banane: 'quartheure/peau-banane.jpg',
  chute: 'causerie/chute-entrepot.jpg',
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
const OUTRO_AT = 336.6;
export const ANIM_TERRAIN_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '1', title: 'Pourquoi animer ?', s: 'une obligation de résultat', c: RED, g: 'pourquoi', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 74.9, n: '2', title: 'Une démarche pédagogique', s: 'vérifier · recommander', c: BLUE, g: 'pédagogie', k: 'gyro', lab: 'GUICHET 2 / 6'},
  {at: 101.8, n: '3', title: 'Quel format ?', s: 'selon la taille de l’entreprise', c: ORANGE, g: 'format', k: 'loupe', lab: 'GUICHET 3 / 6'},
  {at: 184.5, n: '4', title: 'Les règles d’or', s: 'écoute · court · régulier', c: TEAL, g: 'règles d’or', k: 'store', lab: 'GUICHET 4 / 6'},
  {at: 247.0, n: '5', title: 'Lancer l’animation', s: 'choisir · échanger · formaliser', c: VIO, g: 'lancer', k: 'tube', lab: 'GUICHET 5 / 6'},
  {at: 293.4, n: '★', title: 'À retenir', s: 'régulière · bienveillante · constructive', c: GREEN, g: 'à retenir', k: 'gyro', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 313.4;
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
  {n: 1, l: 'Obligation de sécurité de résultat', s: 'résultat', at: 51.6},
  {n: 2, l: 'Responsabilité pénale', s: 'pénal', at: 69.8},
  {n: 3, l: 'Une démarche pédagogique', s: 'pédagogie', at: 82.6},
  {n: 4, l: 'Petites structures : la causerie', s: 'causerie', at: 109.4},
  {n: 5, l: 'Grosses structures : les visites', s: 'visites', at: 123.7},
  {n: 6, l: '15 minutes max, chaque semaine', s: '15 min', at: 219.3},
  {n: 7, l: 'La feuille d’émargement', s: 'émargement', at: 281.0},
  {n: 8, l: 'Parler sécurité régulièrement', s: 'régularité', at: 308.8},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE TERRAIN · STATION {r.n} / 8</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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

/* ═════════════ Le cercle de causerie (fil wahou) ═════════════ */
const RING = ['ouvrier', 'salariee', 'superviseur', 'ouvrier-dark', 'salarie', 'intervenant', 'femme-bureau', 'agent-hse'];
const LVL = [0.35, 0.9, 0.6, 0.45, 0.8, 0.55, 0.7, 0.4];
const Circle: React.FC<{cx: number; cy: number; r: number; at: number; bub?: [number, number]; lvl?: number; away?: [number, number]; links?: number; hands?: number; glow?: number; c?: string}> = ({cx, cy, r, at, bub, lvl, away, links, hands, glow, c = TEAL}) => {
  const t = useT();
  const aw = away ? prog(t, away[0], away[0] + 0.7, easeOut) * (1 - prog(t, away[1], away[1] + 0.7, easeInOut)) : 0;
  const pos = (k: number, rr: number) => { const a = ((-90 + k * 45) * Math.PI) / 180; return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)]; };
  const g = glow !== undefined && t > glow;
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: 960, height: 930}}>
      <svg style={{position: 'absolute', left: 0, top: 0}} width={960} height={930}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={g ? GOLD : '#C9D2DF'} strokeWidth={g ? 8 : 5} strokeDasharray="10 14" strokeDashoffset={-t * 20} opacity={pop(t, at)} />
        {links !== undefined && t > links && RING.map((_, k) => { const [x, y] = pos(k, r * (1 + 0.35 * aw)); const p = prog(t, links + k * 0.05, links + 0.45 + k * 0.05); return <line key={k} x1={cx} y1={cy} x2={lerp(cx, x, p)} y2={lerp(cy, y, p)} stroke={c} strokeWidth={7} strokeLinecap="round" strokeDasharray="16 12" strokeDashoffset={(k % 2 ? 1 : -1) * t * 60} opacity={0.85} />; })}
      </svg>
      <div style={{position: 'absolute', left: cx - 120, top: cy - 120, width: 240, height: 240, borderRadius: 120, overflow: 'hidden', border: `7px solid ${NBK}`, background: `radial-gradient(circle at 50% 35%, #fff, ${c}55)`, boxShadow: g ? `0 0 60px ${GOLD}` : `8px 8px 0 ${c}`, transform: `scale(${Math.min(1, spring(t, at))})`}}><Img src={PH(IMG.anim)} style={{width: '100%', height: '130%', objectFit: 'cover', objectPosition: '50% 5%'}} /></div>
      {RING.map((ic, k) => {
        const a0 = at + 0.2 + k * 0.08;
        const [x, y] = pos(k, r * (1 + 0.35 * aw));
        const sc = t > a0 ? Math.min(1, spring(t, a0)) : 0;
        const b = bub && t > bub[0] + k * 0.07 && t < bub[1];
        return (
          <div key={k} style={{position: 'absolute', left: x - 66, top: y - 66, width: 132, height: 132, transform: `scale(${sc * (1 - 0.18 * aw)}) rotate(${aw * (k % 2 ? 24 : -24)}deg)`, filter: aw > 0.05 ? `grayscale(${aw})` : undefined, opacity: 1 - 0.45 * aw}}>
            <div style={{...nb(g ? YEL : '#fff', 5), width: 132, height: 132, borderRadius: 66, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: g ? `0 0 30px ${GOLD}` : `5px 5px 0 ${NBK}`}}><F n={ic} size={92} /></div>
            {b && <div style={{position: 'absolute', right: -26, top: -34, transform: `scale(${0.9 + 0.12 * Math.sin(t * 8 + k)})`}}><F n="bulle" size={58} /></div>}
            {lvl !== undefined && t > lvl && <div style={{position: 'absolute', left: 16, top: 140, width: 100, height: 16, borderRadius: 8, background: '#E3E8EF', border: `3px solid ${NBK}`, overflow: 'hidden'}}><div style={{width: `${LVL[k] * 100 * prog(t, lvl + k * 0.06, lvl + 0.5 + k * 0.06)}%`, height: '100%', background: [BLUE, ORANGE, TEAL, VIO][k % 4]}} /></div>}
            {hands !== undefined && t > hands + k * 0.06 && <div style={{position: 'absolute', right: -30, top: -40, transform: `scale(${Math.min(1, spring(t, hands + k * 0.06))}) rotate(${Math.sin(t * 6 + k) * 10}deg)`}}><F n="main-levee" size={62} /></div>}
          </div>
        );
      })}
    </div>
  );
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="causerie" w={1080} h={820} pos="50% 45%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 24%, ${PAPER}CC 32%, ${PAPER} 37%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 18}}><div style={{...nb(NBK, 5), color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3, padding: '8px 22px'}}>ANIMER LA SÉCURITÉ SUR LE TERRAIN</div></Abs>
      <Abs x={0} y={650} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="CAUSERIE" src={IMG.c1} size={170} ls={4} /></Abs>
      <Abs x={0} y={830} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="SÉCURITÉ" src={IMG.c2} size={160} ls={4} seed={3} /></Abs>
      <Abs x={60} y={1020} w={960} style={{display: 'flex', justifyContent: 'center', gap: 12}}>{[['causerie', TEAL], ['quart d’heure sécurité', ORANGE], ['minute sécurité', RED]].map(([n, c], k) => <div key={n} style={{...nb(c, 5), padding: '8px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff', transform: `translateY(${(1 - Math.min(1, spring(t, 0.3 + k * 0.1))) * 60}px)`}}>{n}</div>)}</Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={RED} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Intro ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  if (t < 10.9) return (
    <Out end={10.95}>
      <Heads h={[[3.5, ['Chaque', 'semaine'], [1]], [6.2, ['Des', 'conseils', 'terrain'], [1, 2]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{position: 'absolute', left: 350, top: 20, transform: `scale(${pop(t, 3.0)})`}}><F n="boite-outils" size={260} float={6} /></div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 330, display: 'flex', justifyContent: 'center', gap: 22}}>{[['outils', 'outils', 4.8, BLUE], ['méthodes', 'engrenage', 5.3, ORANGE], ['conseils', 'ampoule', 5.8, TEAL]].map(([l, ic, a, c], k) => <div key={l as string} style={{...nb('#fff', 7), boxShadow: `7px 7px 0 ${c}`, width: 280, height: 250, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: t > (a as number) ? 1 : 0, transform: `translateY(${t > (a as number) ? (1 - Math.min(1, spring(t, a as number))) * -300 : 0}px) rotate(${(k - 1) * 3}deg)`}}><F n={ic as string} size={120} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: c as string}}>{l}</div></div>)}</div>
        {t > 7.7 && <div style={{position: 'absolute', left: 60, top: 640, transform: `scale(${Math.min(1, spring(t, 7.7))})`}}><F n="usine" size={140} /></div>}
        <div style={{position: 'absolute', left: 240, top: 670}}><NBadge at={9.0} text="SANTÉ-SÉCURITÉ AU TRAVAIL" bg={RED} rot={-3} size={36} /></div>
      </Abs>
    </Out>
  );
  if (t < 21.7) return (
    <Out end={21.75}>
      <Heads h={[[12.4, ['Une', 'chose', 'indispensable'], [2]], [15.6, ['L’animation', 'terrain'], [0, 1]], [18.4, ['Trois', 'noms,', 'un', 'rituel'], [3]]]} />
      <SearchOpen x={60} y={440} w={960} h={880} at={11.2} query="animation sécurité terrain" results={['audit formel', 'causerie · quart d’heure · minute sécurité', 'réunion annuelle']} found={1} foundAt={15.7} clickAt={16.4} c={TEAL}>
        <div style={{position: 'absolute', left: 0, top: 0}}><Pic src={IMG.groupe} ic="causerie" w={950} h={520} pos="50% 55%" zoom={1 + Math.max(0, t - 17) * 0.015} /></div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 560, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}><Chip at={18.6} ic="causerie" l="causerie" c={TEAL} /><Chip at={19.2} ic="chrono" l="quart d’heure sécurité" c={ORANGE} /><Chip at={20.6} ic="sablier" l="minute sécurité" c={RED} /></div>
      </SearchOpen>
    </Out>
  );
  if (t < 31.8) {
    const mini = prog(t, 23.4, 24.1, easeInOut);
    const sweep = prog(t, 22.1, 23.2, easeOut) * 360;
    return (
      <Out end={31.85}>
        <Heads h={[[21.9, ['Cinq', 'minutes', 'chrono'], [0, 1]], [24.2, ['Le', 'programme'], [1]]]} />
        <Abs x={60} y={440} w={960} h={930}>
          <div style={{position: 'absolute', left: lerp(230, 700, mini), top: lerp(40, 0, mini), transform: `scale(${lerp(1, 0.45, mini) * pop(t, 21.8)})`, transformOrigin: '0 0'}}>
            <svg width={500} height={500} viewBox="-250 -250 500 500" style={{overflow: 'visible'}}><circle r={230} fill="#fff" stroke={NBK} strokeWidth={12} /><path d={arcP(200, -90, -90 + Math.max(1, sweep))} fill={`${TEAL}AA`} /><circle r={18} fill={NBK} /><text y={110} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={70} fill={NBK}>5:00</text><rect x={-40} y={-290} width={80} height={46} rx={10} fill={NBK} /></svg>
          </div>
          {[['POURQUOI ?', 24.4, RED, 'question'], ['QUEL FORMAT ?', 27.7, ORANGE, 'puzzle'], ['COMMENT ?', 29.0, VIO, 'engrenage']].map(([l, a, c, ic], k) => { const on = t > (a as number); return <div key={l as string} style={{position: 'absolute', left: 0, top: 250 + k * 190, width: 680, height: 160, perspective: 1000}}><div style={{...nb(c as string, 7), width: 680, height: 160, display: 'flex', alignItems: 'center', gap: 24, padding: '0 30px', transformOrigin: '50% 0', transform: `rotateX(${on ? (1 - Math.min(1, spring(t, a as number))) * -90 : -90}deg)`, opacity: on ? 1 : 0}}><div style={{width: 110, height: 110, borderRadius: 55, background: '#fff', border: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={ic as string} size={74} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: '#fff'}}>{l}</div><div style={{marginLeft: 'auto', width: 30, height: 30, borderRadius: 15, background: PAPER, border: `4px solid ${NBK}`}} /></div></div>; })}
        </Abs>
      </Out>
    );
  }
  const need = prog(t, 41.3, 42.9, easeInOut);
  return (
    <Out end={46.75}>
      <Heads h={[[32.7, ['La', 'checklist', 'des', '20'], [1, 3]], [36.2, ['L’inspection', 'du', 'travail'], [0, 2]], [40.4, ['Le', 'contrôle', 'avec', 'le', 'sourire'], [1, 4]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        {Array.from({length: 20}, (_, k) => { const a = 33.9 + k * 0.05; const on = t > a; return <div key={k} style={{position: 'absolute', left: 130, top: 130, width: 200, height: 270, background: '#fff', border: `3px solid ${NBK}`, borderRadius: 10, transformOrigin: '50% 130%', transform: `rotate(${on ? lerp(0, -24 + k * 2.5, Math.min(1, spring(t, a))) : 0}deg)`, opacity: on ? 1 : 0}}>{[0, 1, 2, 3].map((j) => <div key={j} style={{height: 10, margin: '22px 18px 0', borderRadius: 5, background: '#E3E8EF'}} />)}</div>; })}
        <div style={{...nb(NAVY, 7), position: 'absolute', left: 60, top: 420, width: 340, padding: '14px 18px', color: '#fff', textAlign: 'center', opacity: pop(t, 33.3)}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22}}>CHECKLIST</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 110, lineHeight: 1}}>{t > 34.0 ? fmt(lerp(1, 20, prog(t, 34.0, 34.8, easeOut))) : '…'}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26}}>documents obligatoires</div></div>
        {t > 36.0 && <div style={{position: 'absolute', left: 520, top: 40, width: 420, height: 400, transform: `scale(${Math.min(1, spring(t, 36.0))})`}}><div style={{...nb('#fff', 7), width: 420, height: 400, boxShadow: `7px 7px 0 ${RED}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}><div style={{position: 'relative', transform: `translateX(${(1 - prog(t, 42.6, 43.4, easeOut)) * 0}px)`}}><F n="auditeur" size={200} />{t > 42.9 && <div style={{position: 'absolute', right: -30, top: -20}}><NBadge at={42.9} text="SURPRISE !" bg={RED} rot={10} size={26} /></div>}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, textAlign: 'center'}}>contrôle de<br />l’inspection du travail</div></div></div>}
        {t > 37.9 && t < 40.6 && <div style={{position: 'absolute', left: 560, top: 470, display: 'flex', alignItems: 'center', gap: 12, opacity: pop(t, 37.9)}}><div style={{...nb(YEL, 5), padding: '8px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>lien dans la description</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, transform: `translateY(${Math.abs(Math.sin(t * 6)) * 18}px)`}}>↓</div></div>}
        {t > 40.6 && <div style={{position: 'absolute', left: 470, top: 480, width: 490, opacity: pop(t, 40.6)}}>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM, marginBottom: 8}}>NIVEAU DE STRESS</div>
          <div style={{position: 'relative', height: 60, borderRadius: 30, border: `5px solid ${NBK}`, background: `linear-gradient(90deg, ${GREEN}, ${YEL}, ${RED})`}}><div style={{position: 'absolute', top: -14, left: `${lerp(88, 8, need)}%`, width: 16, height: 80, marginLeft: -8, background: NBK, borderRadius: 8}} /></div>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: 24, transform: `scale(${t > 45.6 ? Math.min(1.15, spring(t, 45.6)) : 1})`}}><F n={t > 45.6 ? 'pouce' : 'anxieux'} size={150} /></div>
          {t > 45.6 && <div style={{display: 'flex', justifyContent: 'center'}}><NBadge at={45.7} text="AVEC LE SOURIRE" bg={GREEN} rot={-3} size={28} /></div>}
        </div>}
      </Abs>
    </Out>
  );
};

/* ═════════════ Guichet 1 : pourquoi ═════════════ */
const Pourquoi: React.FC = () => {
  const t = useT();
  if (t < 58.3) {
    const slam = prog(t, 49.2, 49.6, easeIn);
    return (
      <Out end={58.35}>
        <Heads h={[[48.2, ['Une', 'réglementation', 'stricte'], [1, 2]], [50.6, ['Une', 'obligation', 'de', 'résultat'], [1, 3]], [53.4, ['Sans', 'tenir', 'compte'], [0, 2]]]} />
        <Abs x={60} y={440} w={960} h={930}>
          <div style={{position: 'absolute', left: 60, top: 20, transform: `translateY(${(1 - slam) * -500}px) scale(${lerp(1.6, 1, slam)})`, opacity: t > 47.8 ? 1 : 0}}><F n="livres" size={240} /></div>
          {t > 49.6 && t < 50.2 && <div style={{position: 'absolute', left: 0, top: 230, width: 400, height: 40, background: `radial-gradient(ellipse, ${NBK}55, transparent 70%)`}} />}
          <div style={{position: 'absolute', left: 360, top: 60, transform: `translateX(${Math.sin(t * 60) * 6 * (t > 49.6 && t < 50.0 ? 1 : 0)}px)`}}><div style={{...nb('#fff', 6), padding: '18px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 40, opacity: pop(t, 48.2)}}>la réglementation<div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: RED, marginTop: 6}}>PARTICULIÈREMENT STRICTE</div></div></div>
          <Stamp at={51.4} text="OBLIGATION DE RÉSULTAT" c={RED} x={30} y={300} rot={-5} size={58} />
          {t > 52.2 && <div style={{position: 'absolute', left: 700, top: 400, transform: `scale(${Math.min(1, spring(t, 52.2))})`, textAlign: 'center'}}><F n="employeur" size={150} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26}}>l’employeur</div></div>}
          <div style={{position: 'absolute', left: 0, top: 600, display: 'flex', gap: 20}}>{[['difficultés éventuelles', 'montagne', 55.7], ['réalité du terrain', 'chantier', 56.8]].map(([l, ic, a]) => <div key={l as string} style={{position: 'relative', ...nb('#fff', 5), padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM, opacity: pop(t, (a as number) - 0.4)}}><F n={ic as string} size={60} />{l}<Strk at={a as number} /></div>)}</div>
        </Abs>
      </Out>
    );
  }
  if (t < 67.7) return (
    <Out end={67.75}>
      <Heads h={[[60.8, ['Le', 'chef', 'd’entreprise'], [1, 2]], [63.6, ['Veiller', 'à', 'l’application'], [0, 2]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{position: 'absolute', left: -20, top: 40, width: 440, height: 700, transform: `translateX(${(1 - Math.min(1, spring(t, 60.8))) * -500}px)`}}><Img src={PH(IMG.chef)} style={{width: 440, height: 660, objectFit: 'contain', objectPosition: '50% 100%', filter: 'drop-shadow(0 18px 24px rgba(0,0,0,0.3))'}} /><div style={{position: 'absolute', left: 60, bottom: 0}}><NBadge at={61.2} text="CHEF D’ENTREPRISE" bg={NAVY} rot={-3} size={28} /></div></div>
        {t > 61.9 && <div style={{position: 'absolute', left: 460, top: 20}}><Chip at={61.9} ic="salarie" l="ou un collaborateur" c={BLUE} /></div>}
        <div style={{position: 'absolute', left: 440, top: 180, display: 'flex', flexDirection: 'column', gap: 16}}><Row at={63.8} ic="check" l="l’application des mesures" c={RED} fs={28} /><Row at={65.3} ic="coeur" l="la santé" c={RED} fs={28} /><Row at={65.9} ic="casque" l="la sécurité des salariés" c={RED} fs={28} /></div>
        {t > 63.8 && <div style={{position: 'absolute', left: 520, top: 560, transform: `rotate(${Math.sin(t * 2) * 6}deg)`}}><F n="loupe" size={150} /></div>}
      </Abs>
    </Out>
  );
  const bars = prog(t, 74.15, 74.55, easeIn);
  return (
    <>
      <Heads h={[[69.8, ['Responsabilité', 'pénale'], [0, 1]], [72.6, ['75 000 €', 'et', 'la', 'prison'], [0, 3]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        {t > 69.6 && <div style={{position: 'absolute', left: 60, top: 20, transformOrigin: '80% 80%', transform: `rotate(${t < 70.6 ? lerp(-50, 0, prog(t, 70.2, 70.6, easeIn)) : Math.sin((t - 70.6) * 30) * 4 * Math.max(0, 1 - (t - 70.6) * 3)}deg)`}}><F n="juge" size={260} /></div>}
        {t > 70.6 && <div style={{position: 'absolute', left: 380, top: 90}}><NBadge at={70.6} text="RESPONSABILITÉ PÉNALE" bg={NAVY} rot={-4} size={34} /></div>}
        {t > 71.9 && <div style={{...nb(RED, 9), position: 'absolute', left: 140, top: 340, width: 680, padding: '20px 0', textAlign: 'center', color: '#fff', transform: `scale(${Math.min(1, spring(t, 71.9))})`}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26}}>AMENDES À PLUS DE</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 130, lineHeight: 1}}>{fmt(lerp(0, 75000, prog(t, 72.6, 73.7, easeOut)))} €</div></div>}
        {t > 74.1 && <div style={{position: 'absolute', left: 0, top: 0, width: 960, height: 930, transform: `translateY(${(1 - bars) * -940}px)`}}>
          {Array.from({length: 9}, (_, k) => <div key={k} style={{position: 'absolute', left: 30 + k * 110, top: -40, width: 30, height: 900, borderRadius: 15, background: 'linear-gradient(90deg, #555, #BBB 40%, #444)', border: `3px solid ${NBK}`}} />)}
          {[120, 760].map((y) => <div key={y} style={{position: 'absolute', left: 0, top: y, width: 960, height: 34, borderRadius: 10, background: 'linear-gradient(180deg, #666, #CCC 45%, #444)', border: `3px solid ${NBK}`}} />)}
          <div style={{position: 'absolute', left: 330, top: 420}}><NBadge at={74.4} text="PRISON" bg={NBK} rot={-6} size={64} /></div>
        </div>}
      </Abs>
    </>
  );
};

/* ═════════════ Guichet 2 : pédagogie ═════════════ */
const Peda: React.FC = () => {
  const t = useT();
  const side = prog(t, 83.8, 84.5, easeInOut);
  return (
    <Out end={101.85}>
      <Heads h={[[78.0, ['Pratico-pratique'], [0]], [80.0, ['Une', 'démarche', 'pédagogique'], [1, 2]], [84.6, ['Les', 'objectifs'], [1]], [93.3, ['Des', 'points', 'de', 'repère'], [1, 3]], [97.3, ['Comment', '?', 'Quel', 'format', '?'], [0, 3]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        {t < 93.0 && <>
          <div style={{position: 'absolute', left: lerp(40, -40, side), top: lerp(60, 200, side), width: 420, height: 620, transformOrigin: '0 100%', transform: `scale(${lerp(1, 0.7, side)}) translateY(${(1 - Math.min(1, spring(t, 79.6))) * 400}px)`}}><Img src={PH(IMG.anim)} style={{width: 420, height: 600, objectFit: 'contain', objectPosition: '50% 100%', filter: 'drop-shadow(0 18px 24px rgba(0,0,0,0.3))'}} /></div>
          {t < 84.0 && <div style={{...nb('#fff', 7), position: 'absolute', left: 480, top: 70, width: 460, height: 380, boxShadow: `7px 7px 0 ${BLUE}`, opacity: pop(t, 80.2), padding: 26, boxSizing: 'border-box'}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>ANIMATION TERRAIN</div><svg width={400} height={260}><path d="M 20 200 Q 120 40 200 140 T 380 60" fill="none" stroke={BLUE} strokeWidth={10} strokeLinecap="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - prog(t, 80.4, 82.4)}} /><circle cx={380} cy={60} r={14} fill={ORANGE} opacity={prog(t, 82.3, 82.5)} /></svg></div>}
          {t > 82.5 && t < 84.0 && <div style={{position: 'absolute', left: 520, top: 480}}><NBadge at={82.6} text="PÉDAGOGIQUE" bg={BLUE} rot={-4} size={44} /></div>}
          <div style={{position: 'absolute', left: 340, top: 80, display: 'flex', flexDirection: 'column', gap: 22}}>
            {[['1 · vérifier la réglementation', 'parchemin', 86.6], ['2 · les dispositions internes', 'classeur', 88.4], ['3 · faire des recommandations', 'ampoule', 90.2]].map(([l, ic, a]) => <Row key={l as string} at={a as number} ic={ic as string} l={l as string} c={BLUE} fs={30} w={600} />)}
            {t > 91.6 && <div style={{alignSelf: 'flex-end'}}><NBadge at={91.7} text="EN CAS DE PROBLÈMES CONSTATÉS" bg={ORANGE} rot={-2} size={24} /></div>}
          </div>
        </>}
        {t >= 93.0 && t < 97.1 && <div style={{position: 'absolute', left: 0, top: 0, width: 960, height: 700, opacity: pop(t, 93.0)}}>
          <div style={{position: 'absolute', left: 300, top: 40, width: 360, height: 360}}><svg width={360} height={360} viewBox="-180 -180 360 360"><circle r={170} fill="#fff" stroke={NBK} strokeWidth={10} />{[0, 90, 180, 270].map((a) => <text key={a} x={130 * Math.sin((a * Math.PI) / 180)} y={-130 * Math.cos((a * Math.PI) / 180) + 14} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={38}>{['N', 'E', 'S', 'O'][a / 90]}</text>)}<g transform={`rotate(${t < 95.7 ? Math.sin(t * 5) * 70 : Math.sin((t - 95.7) * 12) * 20 * Math.max(0, 1 - (t - 95.7) * 1.5)})`}><path d="M 0 -120 L 22 0 L 0 120 L -22 0 Z" fill={RED} stroke={NBK} strokeWidth={5} /><path d="M 0 0 L 22 0 L 0 120 L -22 0 Z" fill="#fff" stroke={NBK} strokeWidth={5} /></g><circle r={14} fill={NBK} /></svg></div>
          {[[90, 470], [330, 540], [600, 470], [820, 560]].map(([x, y], k) => { const a = 95.7 + k * 0.15; return t > a ? <div key={k} style={{position: 'absolute', left: x, top: y, transform: `translateY(${(1 - Math.min(1, spring(t, a))) * -300}px)`}}><F n="epingle" size={90} /></div> : null; })}
          <svg style={{position: 'absolute', left: 0, top: 0}} width={960} height={700}><path d="M 135 520 Q 250 640 375 590 T 645 520 T 865 610" fill="none" stroke={BLUE} strokeWidth={6} strokeDasharray="14 12" pathLength={1} opacity={prog(t, 96.0, 96.4)} /></svg>
        </div>}
        {t >= 97.1 && <div style={{position: 'absolute', left: 0, right: 0, top: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 50}}>
          {[['COMMENT ?', 98.8, VIO, -3], ['QUEL FORMAT ?', 100.9, ORANGE, 3]].map(([l, a, c, r]) => <div key={l as string} style={{...nb(c as string, 9), padding: '30px 50px', fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: '#fff', transform: `rotate(${r}deg) scale(${t > (a as number) - 0.3 ? Math.min(1, spring(t, (a as number) - 0.3)) : 0})`}}>{l}</div>)}
          {t > 97.4 && <div style={{position: 'absolute', left: 60, top: 420, transform: `rotate(${Math.sin(t * 3) * 10}deg)`}}><F n="pensif" size={160} /></div>}
        </div>}
      </Abs>
    </Out>
  );
};

/* ═════════════ Guichet 3 : le format ═════════════ */
const knob = (t: number) => t < 107.4 ? 0.5 : t < 121.3 ? lerp(0.5, 0.06, prog(t, 107.4, 108.1, easeInOut)) : lerp(0.06, 0.94, prog(t, 121.3, 122.3, easeInOut));
const SizeSlider: React.FC = () => {
  const t = useT();
  const k = knob(t);
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: 960, height: 150, opacity: pop(t, 105.2)}}>
      <div style={{position: 'absolute', left: 0, top: 10, textAlign: 'center', width: 160, transform: `scale(${1 + 0.25 * (1 - Math.min(1, Math.abs(k - 0.06) * 6))})`}}><F n="maison" size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 20}}>petite structure</div></div>
      <div style={{position: 'absolute', right: 0, top: 10, textAlign: 'center', width: 160, transform: `scale(${1 + 0.25 * (1 - Math.min(1, Math.abs(k - 0.94) * 6))})`}}><F n="usine2" size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 20}}>grosse structure</div></div>
      <div style={{position: 'absolute', left: 180, right: 180, top: 52, height: 26, borderRadius: 13, border: `5px solid ${NBK}`, background: `linear-gradient(90deg, ${TEAL}, ${ORANGE})`}} />
      <div style={{position: 'absolute', left: 180 + k * 600 - 32, top: 33, width: 64, height: 64, borderRadius: 32, background: '#fff', border: `6px solid ${NBK}`, boxShadow: `4px 4px 0 ${NBK}`}} />
    </div>
  );
};
const Format: React.FC = () => {
  const t = useT();
  if (t < 121.2) return (
    <Out end={121.25}>
      <Heads h={[[105.4, ['Petites', 'vs', 'grosses'], [0, 2]], [108.7, ['La', 'causerie'], [1]], [114.0, ['Plusieurs', 'fois', 'par', 'mois'], [0, 3]], [117.8, ['Dans', 'tous', 'les', 'services'], [1, 3]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        <SizeSlider />
        <Shot src={IMG.groupe} ic="causerie" x={0} y={190} w={560} h={330} at={109.3} pos="50% 55%" c={TEAL} />
        {t > 109.3 && <div style={{position: 'absolute', left: 20, top: 170, zIndex: 3}}><NBadge at={109.4} text="CAUSERIE · QUART D’HEURE" bg={TEAL} rot={-3} size={26} /></div>}
        <div style={{position: 'absolute', left: 590, top: 200, display: 'flex', flexDirection: 'column', gap: 14}}><Chip at={112.0} ic="employeur" l="le chef d’entreprise" c={NAVY} /><Chip at={113.0} ic="salarie" l="ou un collaborateur" c={BLUE} /><Chip at={114.3} ic="repeter" l="régulièrement" c={TEAL} /></div>
        {t > 115.5 && <div style={{...nb('#fff', 6), position: 'absolute', left: 0, top: 560, width: 380, height: 270, padding: 14, opacity: pop(t, 115.5)}}><div style={{height: 38, background: RED, borderRadius: 8, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>CE MOIS-CI</div><div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginTop: 10}}>{Array.from({length: 28}, (_, k) => <div key={k} style={{height: 30, borderRadius: 5, background: '#EEF1F5'}} />)}</div><div style={{position: 'absolute', right: -20, bottom: -24, transform: `rotate(${(t - 115.5) * 120}deg)`}}><F n="repeter" size={90} /></div></div>}
        <div style={{position: 'absolute', left: 420, top: 560, display: 'grid', gridTemplateColumns: 'repeat(2, 260px)', gap: 16}}>{['usine', 'ordinateur', 'colis', 'chantier'].map((ic, k) => { const a = 118.0 + k * 0.15; return <div key={ic} style={{...nb('#fff', 5), height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: t > a ? 1 : 0, transform: `scale(${t > a ? Math.min(1, spring(t, a)) : 0.5})`}}><F n={ic} size={80} /><div style={{transform: `scale(${0.9 + 0.1 * Math.sin(t * 6 + k)})`}}><F n="bulle" size={56} /></div></div>; })}</div>
        {t > 119.8 && <div style={{position: 'absolute', left: 470, top: 850}}><NBadge at={119.9} text="BESOINS SPÉCIFIQUES" bg={NAVY} rot={-2} size={28} /></div>}
      </Abs>
    </Out>
  );
  if (t < 140.6) {
    const fly = (i: number) => prog(t, 137.8 + (i % 10) * 0.04 + Math.floor(i / 10) * 0.08, 138.5 + (i % 10) * 0.04 + Math.floor(i / 10) * 0.08, easeInOut);
    return (
      <Out end={140.65}>
        <Heads h={[[121.4, ['Les', 'grosses', 'structures'], [1, 2]], [123.6, ['Des', 'visites', 'de', 'sécurité'], [1, 3]], [129.5, ['Définir', 'le', 'nombre'], [0, 2]], [134.0, ['40', 'visites', 'par', 'an'], [0, 1]], [137.4, ['À', 'répartir'], [1]]]} />
        <Abs x={60} y={440} w={960} h={930}>
          <SizeSlider />
          {t < 129.3 ? <div style={{position: 'absolute', left: 0, top: 190, display: 'flex', gap: 24}}>{[['l’encadrement', 'superviseur', 124.9], ['l’ingénieur sécurité', 'agent-hse', 125.9], ['la CSSCT', 'equipe', 127.8]].map(([l, ic, a], k) => { const on = t > (a as number); return <div key={l as string} style={{...nb('#fff', 7), boxShadow: `7px 7px 0 ${ORANGE}`, width: 296, height: 330, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: on ? 1 : 0, transform: `translateY(${on ? (1 - Math.min(1, spring(t, a as number))) * 300 : 0}px) rotate(${(k - 1) * 2}deg)`}}><F n={ic as string} size={150} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, textAlign: 'center'}}>{l}</div></div>; })}{t > 123.6 && <div style={{position: 'absolute', left: 260, top: 360}}><NBadge at={123.7} text="VISITES DE SÉCURITÉ" bg={ORANGE} rot={-2} size={36} /></div>}</div> : <>
            <div style={{...nb(ORANGE, 8), position: 'absolute', left: 0, top: 190, width: 300, height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', opacity: pop(t, 129.4)}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 150, lineHeight: 1}}>{t > 133.9 ? fmt(lerp(0, 40, prog(t, 134.0, 134.8, easeOut))) : '?'}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30}}>visites / an</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, opacity: 0.85}}>par exemple</div></div>
            {[0, 1, 2, 3].map((u) => <div key={u} style={{...nb('#fff', 5), position: 'absolute', left: 30 + u * 235, top: 600, width: 200, height: 210, opacity: pop(t, 137.4), display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 8}}><span style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM}}>unité</span></div>)}
            {t > 134.0 && Array.from({length: 40}, (_, i) => { const p = fly(i); const u = i % 4, j = Math.floor(i / 4); const x0 = 360 + (i % 8) * 72, y0 = 200 + Math.floor(i / 8) * 62; const x1 = 30 + u * 235 + 22 + (j % 5) * 34, y1 = 618 + Math.floor(j / 5) * 40; return <div key={i} style={{position: 'absolute', left: lerp(x0, x1, p), top: lerp(y0, y1, p) - Math.sin(p * Math.PI) * 120, width: p > 0.9 ? 28 : 46, height: p > 0.9 ? 28 : 46, borderRadius: 23, background: ORANGE, border: `3px solid ${NBK}`, opacity: prog(t, 134.1 + i * 0.02, 134.3 + i * 0.02)}} />; })}
            {t > 136.4 && t < 137.8 && <div style={{position: 'absolute', left: 380, top: 520}}><NBadge at={136.5} text="ÇA PEUT PARAÎTRE BEAUCOUP…" bg={NBK} rot={-2} size={24} /></div>}
          </>}
        </Abs>
      </Out>
    );
  }
  if (t < 161.9) {
    const sh = prog(t, 155.5, 156.2, easeInOut);
    return (
      <Out end={161.95}>
        <Heads h={[[141.0, ['Des', 'thèmes', 'par', 'visite'], [1, 3]], [144.0, ['Un', 'document', 'récapitulatif'], [1, 2]], [146.6, ['Par', 'exemple'], [1]], [155.8, ['Un', 'support', 'de', 'visite'], [1, 3]], [157.6, ['Mis', 'à', 'jour'], [0, 2]]]} />
        <Abs x={60} y={440} w={960} h={930}>
          <div style={{...nb('#fff', 8), position: 'absolute', left: lerp(130, 0, sh), top: 20, width: 700, padding: 26, boxSizing: 'border-box', boxShadow: `8px 8px 0 ${ORANGE}`, transformOrigin: '0 0', transform: `scale(${lerp(1, 0.66, sh)})`, opacity: pop(t, 141.5)}}>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM, marginBottom: 18}}>{t > 143.9 ? 'DOCUMENT RÉCAPITULATIF' : 'THÈMES DES VISITES'}</div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>{[['les EPI', 'casque', 147.3], ['l’accès au plan d’évacuation', 'porte', 150.7], ['le matériel de lutte contre l’incendie', 'extincteur', 152.3], ['etc.', 'memo', 153.7]].map(([l, ic, a]) => <Row key={l as string} at={a as number} ic={ic as string} l={l as string} c={ORANGE} fs={30} />)}</div>
          </div>
          {t > 155.6 && <div style={{position: 'absolute', left: 500, top: 60, width: 440, transform: `scale(${Math.min(1, spring(t, 155.6))})`}}><div style={{...nb(YEL, 8), padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}><div style={{position: 'relative'}}><F n="clipboard" size={200} />{t > 157.6 && <div style={{position: 'absolute', right: -40, bottom: -10, transform: `rotate(${(t - 157.6) * 200}deg)`}}><F n="repeter" size={100} /></div>}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36}}>support de visite</div></div></div>}
          {t > 157.9 && <div style={{position: 'absolute', left: 420, top: 560}}><NBadge at={158.0} text="MIS À JOUR RÉGULIÈREMENT" bg={NAVY} rot={-3} size={30} /></div>}
          {t > 159.9 && <div style={{position: 'absolute', left: 80, top: 700}}><Chip at={159.9} ic="cible" l="à partir des principaux thèmes" c={ORANGE} /></div>}
        </Abs>
      </Out>
    );
  }
  /* faux générique : « le tour est joué… à la semaine prochaine » puis rembobinage VHS */
  const tv = prog(t, 179.8, 180.5, easeInOut);
  const lin = (x: number) => x;
  const rew = prog(t, 184.0, 185.2, lin);
  const roll = t < 184.0 ? prog(t, 180.6, 184.0, lin) : 1 - rew;
  return (
    <>
      <Heads h={[[162.4, ['Vous', 'savez', 'tout', '?'], [2]], [164.6, ['Pour', 'résumer'], [1]], [179.9, ['Le', 'tour', 'est', 'joué', '?'], [1, 3]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 960, height: 860, transformOrigin: '50% 40%', transform: `scale(${lerp(1, 0.5, tv)})`, opacity: 1 - tv}}>
          <div style={{...nb('#fff', 8), position: 'absolute', left: 40, top: 20, width: 880, padding: 28, boxSizing: 'border-box', boxShadow: `8px 8px 0 ${NAVY}`, opacity: pop(t, 164.5)}}>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: DIM, marginBottom: 20}}>RÉSUMÉ</div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
              <Row at={167.3} ic="juge" l="1 · obligatoire" c={RED} fs={34} />
              <div style={{display: 'flex', gap: 14, paddingLeft: 30}}><Chip at={169.5} ic="argent" l="sanctions financières" c={RED} /><Chip at={170.7} ic="cadenas" l="prison" c={NBK} /></div>
              <Row at={173.3} ic="usine2" l="2 · selon la taille de l’entreprise" c={ORANGE} fs={34} />
              <Row at={175.9} ic="loupe" l="3 · thèmes préparés minutieusement" c={TEAL} fs={34} />
            </div>
          </div>
        </div>
        {tv > 0 && <div style={{position: 'absolute', left: 60, top: 60, width: 840, height: 640, borderRadius: 40, background: NIGHT, border: `10px solid ${NBK}`, boxShadow: `12px 12px 0 ${BURG}`, overflow: 'hidden', transform: `scale(${lerp(0.3, 1, tv)})`, opacity: tv}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: lerp(470, -480, roll), textAlign: 'center', color: '#fff'}}>
            <div style={{fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 700, fontSize: 130}}>Fin</div>
            <div style={{fontFamily: MONO, fontSize: 30, marginTop: 60, color: '#BFD7EA'}}>Merci de m’avoir écouté</div>
            <div style={{fontFamily: MONO, fontSize: 30, marginTop: 40, color: '#BFD7EA'}}>À la semaine prochaine…</div>
            <div style={{fontFamily: MONO, fontSize: 24, marginTop: 60, color: '#7A8AA0'}}>UNIVERSNORMES</div>
          </div>
          {Array.from({length: 30}, (_, k) => <div key={k} style={{position: 'absolute', left: random(`gx${k}${Math.floor(t * 12)}`) * 840, top: random(`gy${k}${Math.floor(t * 12)}`) * 640, width: 3, height: 3, background: '#fff', opacity: 0.4}} />)}
          {rew > 0 && rew < 1 && <>
            {Array.from({length: 7}, (_, k) => <div key={k} style={{position: 'absolute', left: 0, right: 0, top: random(`rb${k}${Math.floor(t * 30)}`) * 640, height: 8 + random(`rh${k}${Math.floor(t * 30)}`) * 26, background: 'rgba(255,255,255,0.55)', transform: `translateX(${(random(`rx${k}${Math.floor(t * 30)}`) - 0.5) * 80}px)`}} />)}
            <div style={{position: 'absolute', left: 30, top: 24, fontFamily: MONO, fontWeight: 700, fontSize: 40, color: '#fff'}}>◀◀ REWIND</div>
          </>}
        </div>}
        {t > 181.1 && t < 184.0 && <div style={{position: 'absolute', left: 300, top: 740}}><NBadge at={181.2} text="LE TOUR EST JOUÉ ?" bg={GOLD} rot={-3} size={34} /></div>}
        {rew > 0.15 && <div style={{position: 'absolute', left: 200, top: 740}}><NBadge at={184.2} text="ATTENDEZ… CE N’EST PAS FINI" bg={RED} rot={2} size={32} /></div>}
      </Abs>
    </>
  );
};

/* ═════════════ Guichet 4 : les règles d'or ═════════════ */
const SRC: [string, string, number, boolean][] = [['suggestions des salariés', 'bulle', 198.2, false], ['problèmes de terrain', 'danger', 199.8, false], ['accidents du travail', 'ambulance', 201.6, false], ['presque-accidents', '', 202.6, true], ['écarts d’audit', 'loupe', 204.0, false], ['nouveautés réglementaires', 'parchemin', 206.2, false]];
const Regles: React.FC = () => {
  const t = useT();
  if (t < 209.4) return (
    <Out end={209.45}>
      <Heads h={[[188.5, ['Écoute', 'et', 'sensibilisation'], [0, 2]], [189.6, ['Tous', 'les', 'niveaux'], [0, 2]], [193.3, ['Les', 'thèmes'], [1]], [197.4, ['Choisis', 'avec', 'le', 'terrain'], [0, 3]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        {t < 193.2 ? <Circle cx={480} cy={420} r={330} at={188.2} bub={[188.3, 190.6]} lvl={189.6} /> : <>
          <div style={{...nb(TEAL, 8), position: 'absolute', left: 330, top: 300, width: 300, height: 170, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', opacity: pop(t, 193.4), boxShadow: t > 206.6 ? `0 0 50px ${GOLD}` : `8px 8px 0 ${NBK}`}}><F n="memo" size={70} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40}}>THÈMES</div></div>
          <svg style={{position: 'absolute', left: 0, top: 0}} width={960} height={930}>{SRC.map(([, , a], k) => { const L = k % 2 === 0; const y = 70 + Math.floor(k / 2) * 300; const p = prog(t, a + 0.3, a + 0.8); return <line key={k} x1={L ? 300 : 660} y1={y + 55} x2={lerp(L ? 300 : 660, L ? 330 : 630, p)} y2={lerp(y + 55, 385, p)} stroke={TEAL} strokeWidth={8} strokeDasharray="14 10" strokeDashoffset={-t * 60} opacity={t > a ? 1 : 0} />; })}</svg>
          {SRC.map(([l, ic, a, ph], k) => { const L = k % 2 === 0; const y = 10 + Math.floor(k / 2) * 300; const on = t > a; return <div key={l} style={{...nb('#fff', 5), boxShadow: `5px 5px 0 ${TEAL}`, position: 'absolute', left: L ? 0 : 660, top: y, width: 300, height: 130, display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px', opacity: on ? 1 : 0, transform: `translateX(${on ? (1 - Math.min(1, spring(t, a))) * (L ? -200 : 200) : 0}px)`, overflow: 'hidden'}}>{ph ? <div style={{width: 96, height: 106, borderRadius: 10, overflow: 'hidden', flexShrink: 0, border: `3px solid ${NBK}`}}><Pic src={IMG.banane} ic="danger" w={96} h={106} pos="50% 80%" /></div> : <F n={ic} size={80} />}<span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 25, lineHeight: 1.1}}>{l}</span></div>; })}
          {t > 196.8 && t < 198.2 && <div style={{position: 'absolute', left: 300, top: 530}}><NBadge at={196.9} text="DIVERS ET VARIÉS" bg={NBK} rot={-2} size={30} /></div>}
        </>}
      </Abs>
    </Out>
  );
  if (t < 227.2) {
    const sw = Math.min(90, prog(t, 213.0, 219.3, easeInOut) * 90);
    const stop = t > 219.3;
    return (
      <Out end={227.25}>
        <Heads h={[[210.0, ['Courtes'], [0]], [215.5, ['Et', 'efficaces'], [1]], [217.5, ['15', 'minutes', 'max'], [0, 2]], [220.6, ['Régulières'], [0]], [222.8, ['Une', 'fois', 'par', 'semaine'], [1, 3]], [224.2, ['Horaires', 'fixes', 'concertés'], [0, 2]]]} />
        <Abs x={60} y={440} w={960} h={930}>
          {t < 220.3 ? <>
            <div style={{position: 'absolute', left: 220, top: 0, transform: `scale(${pop(t, 209.6)}) translateX(${stop && t < 219.8 ? Math.sin(t * 80) * 8 : 0}px)`}}>
              <svg width={520} height={560} viewBox="-260 -290 520 560" style={{overflow: 'visible'}}><rect x={-45} y={-290} width={90} height={50} rx={12} fill={NBK} /><circle r={250} fill="#fff" stroke={stop ? RED : NBK} strokeWidth={14} />{Array.from({length: 12}, (_, k) => <line key={k} x1={0} y1={-230} x2={0} y2={-205} stroke={NBK} strokeWidth={6} transform={`rotate(${k * 30})`} />)}<path d={arcP(200, -90, -90 + Math.max(0.5, sw))} fill={stop ? `${RED}CC` : `${TEAL}AA`} />{t > 218.8 && <line x1={0} y1={0} x2={0} y2={-240} stroke={RED} strokeWidth={10} transform="rotate(90)" strokeDasharray="12 8" />}<line x1={0} y1={0} x2={0} y2={-200} stroke={NBK} strokeWidth={10} strokeLinecap="round" transform={`rotate(${sw})`} /><circle r={20} fill={NBK} /><text y={130} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={70} fill={stop ? RED : NBK}>{fmt(sw / 6)}:00</text></svg>
            </div>
            <div style={{position: 'absolute', left: 0, top: 590, display: 'flex', gap: 14, flexWrap: 'wrap'}}><Chip at={213.0} ic="sablier" l="des animations courtes" c={TEAL} /><Chip at={214.1} ic="yeux" l="garder l’attention" c={BLUE} /><Chip at={216.3} ic="cible" l="rester efficace" c={GREEN} /></div>
            {stop && <div style={{position: 'absolute', left: 560, top: 60}}><NBadge at={219.3} text="15 MIN MAX" bg={RED} rot={8} size={46} /></div>}
          </> : <>
            <div style={{...nb('#fff', 7), position: 'absolute', left: 0, top: 0, width: 600, padding: 18, boxSizing: 'border-box', opacity: pop(t, 220.4)}}>
              <div style={{display: 'grid', gridTemplateColumns: '90px repeat(7, 1fr)', gap: 6, fontFamily: MONO, fontWeight: 700, fontSize: 18, color: DIM, textAlign: 'center'}}><span />{['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, k) => <span key={k}>{d}</span>)}</div>
              {[0, 1, 2, 3].map((w) => <div key={w} style={{display: 'grid', gridTemplateColumns: '90px repeat(7, 1fr)', gap: 6, marginTop: 8}}><span style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: DIM, alignSelf: 'center'}}>sem. {w + 1}</span>{Array.from({length: 7}, (_, d) => { const hit = d === 1 && t > 222.9 + w * 0.22; return <div key={d} style={{height: 54, borderRadius: 8, background: hit ? TEAL : '#EEF1F5', border: hit ? `3px solid ${NBK}` : '3px solid transparent', transform: `scale(${hit ? Math.min(1.1, spring(t, 222.9 + w * 0.22)) : 1})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 24}}>{hit ? '✓' : ''}</div>; })}</div>)}
            </div>
            {t > 224.1 && <div style={{position: 'absolute', left: 640, top: 20, textAlign: 'center', transform: `scale(${Math.min(1, spring(t, 224.1))})`}}><F n="chrono" size={180} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>plage horaire fixe</div></div>}
            {t > 225.5 && <div style={{position: 'absolute', left: 220, top: 420, display: 'flex', alignItems: 'center', gap: 18, transform: `scale(${Math.min(1, spring(t, 225.5))})`}}><F n="poignee" size={150} /><NBadge at={225.6} text="EN CONCERTATION" bg={TEAL} rot={-3} size={34} /></div>}
          </>}
        </Abs>
      </Out>
    );
  }
  return (
    <Out end={247.05}>
      <Heads h={[[227.5, ['Du', 'sens', 'pour', 'tous'], [1, 3]], [232.0, ['Pas', 'un', 'audit', 'formel'], [0, 3]], [234.6, ['Sinon', 'les', 'réticences'], [2]], [239.5, ['Une', 'philosophie', 'd’échange'], [1, 2]], [244.3, ['Bonnes', '&', 'mauvaises', 'pratiques'], [0, 2]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 960, height: 930, transformOrigin: '50% 0', transform: `scale(${t > 244.2 ? lerp(1, 0.78, prog(t, 244.2, 244.8, easeInOut)) : 1})`}}><Circle cx={480} cy={400} r={300} at={227.3} away={[237.3, 239.3]} links={241.4} /></div>
        {t > 232.5 && t < 237.4 && <div style={{position: 'absolute', left: 280, top: 300, transform: `scale(${Math.min(1, spring(t, 232.5))})`, zIndex: 4}}><div style={{position: 'relative', ...nb('#fff', 7), padding: '20px 30px', display: 'flex', alignItems: 'center', gap: 16, fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: DIM}}><F n="clipboard" size={90} />audit formel<Strk at={233.5} /></div></div>}
        {t > 237.3 && t < 239.4 && <div style={{position: 'absolute', left: 320, top: 360, zIndex: 4}}><NBadge at={237.4} text="RÉTICENCES" bg={NBK} rot={-4} size={44} /></div>}
        {t > 242.9 && t < 244.3 && <div style={{position: 'absolute', left: 330, top: 760}}><NBadge at={243.0} text="TRANSPARENCE" bg={TEAL} rot={-2} size={34} /></div>}
        {t > 244.9 && <div style={{position: 'absolute', left: 0, right: 0, top: 740, display: 'flex', justifyContent: 'center', gap: 24}}>{[['✓ bonnes pratiques', GREEN, 245.0], ['✗ mauvaises pratiques', RED, 245.7]].map(([l, c, a]) => <div key={l as string} style={{...nb(c as string, 7), padding: '16px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: '#fff', transform: `scale(${t > (a as number) ? Math.min(1, spring(t, a as number)) : 0})`}}>{l}</div>)}</div>}
      </Abs>
    </Out>
  );
};

/* ═════════════ Guichet 5 : lancer ═════════════ */
const RISKS: [string, number][] = [['echelle', 0.9], ['feu', 0.6], ['eclair', 0.75], ['eprouvette', 0.45], ['chariot', 0.55]];
const Lancer: React.FC = () => {
  const t = useT();
  if (t < 258.1) {
    const pick = prog(t, 253.1, 253.8, easeInOut);
    return (
      <Out end={258.15}>
        <Heads h={[[250.4, ['Les', 'risques', 'significatifs'], [1, 2]], [252.3, ['Choisissez-en', 'un'], [0, 1]], [255.9, ['Un', 'support', 'papier'], [1, 2]]]} />
        <Abs x={60} y={440} w={960} h={930}>
          {RISKS.map(([ic, v], k) => { const a = 250.6 + k * 0.1; const chosen = k === 0; const x = 20 + k * 190; return <div key={ic} style={{position: 'absolute', left: chosen ? lerp(x, 330, pick) : x, top: chosen ? lerp(80, 20, pick) : 80 + pick * 500, width: 170, opacity: t > a ? (chosen ? 1 : 1 - pick) : 0, transform: `scale(${t > a ? Math.min(1, spring(t, a)) * (chosen ? lerp(1, 1.7, pick) : 1) : 0}) rotate(${chosen ? 0 : pick * (k % 2 ? 30 : -30)}deg)`, transformOrigin: '50% 0', zIndex: chosen ? 3 : 1}}>
            <div style={{...nb('#fff', 5), height: 170, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: chosen && pick > 0.5 ? `0 0 40px ${GOLD}` : `5px 5px 0 ${NBK}`}}><F n={ic} size={110} /></div>
            <div style={{height: 22, marginTop: 10, borderRadius: 11, border: `3px solid ${NBK}`, background: '#EEF1F5', overflow: 'hidden'}}><div style={{width: `${v * 100 * prog(t, a + 0.2, a + 0.8)}%`, height: '100%', background: v > 0.7 ? RED : ORANGE}} /></div>
          </div>; })}
          <LoupeSweep x0={40} y0={60} x1={800} y1={60} a={251.0} b={252.6} size={170} />
          {t > 253.5 && <div style={{position: 'absolute', left: 330, top: 380}}><Chip at={253.6} ic="megaphone" l="sensibiliser à ce risque" c={VIO} /></div>}
          {t > 256.5 && <div style={{...nb('#fff', 7), position: 'absolute', left: 300, top: 500, width: 360, height: 300, padding: 22, boxSizing: 'border-box', transform: `rotate(-3deg) translateY(${(1 - Math.min(1, spring(t, 256.5))) * 400}px)`, boxShadow: `7px 7px 0 ${VIO}`}}><div style={{display: 'flex', alignItems: 'center', gap: 12}}><F n="feuille" size={60} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30}}>support papier</span></div>{[0, 1, 2, 3, 4].map((j) => <div key={j} style={{height: 14, borderRadius: 7, background: '#E3E8EF', marginTop: 20, width: `${95 - j * 9}%`}} />)}</div>}
        </Abs>
      </Out>
    );
  }
  if (t < 273.3) {
    const gather = prog(t, 271.0, 271.9, easeInOut);
    return (
      <Out end={273.35}>
        <Heads h={[[258.4, ['À', 'l’écoute'], [1]], [260.2, ['Échanger'], [0]], [261.6, ['Tout', 'le', 'monde', 'participe'], [0, 3]], [263.4, ['Noter', 'les', 'remontées'], [0, 2]], [267.0, ['Leurs', 'thèmes'], [1]], [270.4, ['Une', 'base', 'de', 'thèmes'], [1, 3]]]} />
        <Abs x={60} y={440} w={960} h={930}>
          {t < 263.2 ? <Circle cx={480} cy={420} r={320} at={258.0} bub={[259.5, 260.2]} links={260.2} hands={261.8} c={VIO} /> : <>
            <div style={{...nb('#B98A55', 8), position: 'absolute', left: 140, top: 340, width: 680, height: 470, opacity: pop(t, 270.6), backgroundImage: 'radial-gradient(#0002 2px, transparent 2px)', backgroundSize: '18px 18px'}}><div style={{position: 'absolute', left: 0, right: 0, top: -30, display: 'flex', justifyContent: 'center'}}><NBadge at={271.0} text="BASE DE THÈMES" bg={VIO} rot={-2} size={30} /></div></div>
            {Array.from({length: 12}, (_, k) => { const a = (k < 7 ? 264.6 : 267.8) + (k % 7) * 0.12; const x0 = 60 + random(`mx${k}`) * 760, y0 = 20 + random(`my${k}`) * 260; const x1 = 170 + (k % 4) * 160, y1 = 380 + Math.floor(k / 4) * 140; const p = gather; return t > a ? <div key={k} style={{position: 'absolute', left: lerp(x0, x1, p), top: lerp(y0, y1, p), width: 130, height: 110, background: [YEL, '#FFB3C7', '#A8E6CF', '#BFD7EA'][k % 4], border: `3px solid ${NBK}`, boxShadow: '4px 4px 0 #0004', transform: `rotate(${lerp((random(`mr${k}`) - 0.5) * 30, (k % 3 - 1) * 4, p)}deg) scale(${Math.min(1, spring(t, a))})`, padding: 10, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{k < 7 ? [0, 1, 2].map((j) => <div key={j} style={{position: 'absolute', left: 14, right: 14 + j * 12, top: 26 + j * 24, height: 8, borderRadius: 4, background: '#0003'}} />) : <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 50}}>?</span>}</div> : null; })}
          </>}
        </Abs>
      </Out>
    );
  }
  return (
    <Out end={293.45}>
      <Heads h={[[273.6, ['Formalisez', '!'], [0]], [279.5, ['La', 'feuille', 'd’émargement'], [1, 2]], [282.4, ['Qui', 'a', 'suivi', '?'], [2]], [284.7, ['Qui', 'n’a', 'pas', 'suivi', '?'], [1, 3]], [288.0, ['Prouver'], [0]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        {t < 279.2 ? <div style={{position: 'absolute', left: 330, top: 120, transform: `scale(${pop(t, 273.6)}) rotate(${Math.sin(t * 4) * 8}deg)`}}><F n="ecrit" size={300} /></div> : <div style={{...nb('#fff', 8), position: 'absolute', left: 60, top: 0, width: 840, padding: 24, boxSizing: 'border-box', boxShadow: `8px 8px 0 ${VIO}`, opacity: pop(t, 279.2)}}>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: NBK, textAlign: 'center'}}>FEUILLE D’ÉMARGEMENT</div>
          <div style={{fontFamily: MONO, fontSize: 18, color: DIM, textAlign: 'center', margin: '6px 0 14px'}}>quart d’heure sécurité · thème : ……………</div>
          {Array.from({length: 8}, (_, k) => { const signed = k < 6; const sa = 280.0 + k * 0.2; const miss = !signed && t > 285.3; return <div key={k} style={{display: 'flex', alignItems: 'center', gap: 14, height: 74, borderTop: '3px solid #E3E8EF', background: miss ? `${ORANGE}33` : 'transparent'}}>
            <div style={{width: 260, height: 14, borderRadius: 7, background: '#D5DCE6', marginLeft: 10}} />
            <svg width={300} height={60}>{signed && <path d={`M 10 ${40 - (k % 3) * 4} C 40 0, 60 60, 90 30 S 140 ${10 + k * 3}, 170 35 S 230 20, 280 ${30 + (k % 2) * 8}`} fill="none" stroke={NAVY} strokeWidth={4} strokeLinecap="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - prog(t, sa, sa + 0.5)}} />}</svg>
            <div style={{width: 60, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: signed ? GREEN : ORANGE}}>{signed && t > 282.9 + k * 0.1 ? '✓' : miss ? '!' : ''}</div>
          </div>; })}
        </div>}
        {t > 286.2 && <div style={{position: 'absolute', left: 120, top: 760}}><NBadge at={286.3} text="À SENSIBILISER PAR LA SUITE" bg={ORANGE} rot={-2} size={28} /></div>}
        <Stamp at={288.0} text="PREUVE" c={NAVY} x={560} y={300} rot={-12} size={70} />
        {t > 291.1 && <div style={{position: 'absolute', left: 520, top: 840}}><Chip at={291.2} ic="equipe" l="l’ensemble des collaborateurs" c={VIO} /></div>}
      </Abs>
    </Out>
  );
};

/* ═════════════ Guichet 6 : à retenir ═════════════ */
const TRIO: [string, string, string, number][] = [['RÉGULIÈRE', 'calendrier', BLUE, 311.0], ['BIENVEILLANTE', 'coeur', RED, 312.0], ['CONSTRUCTIVE', 'outils', ORANGE, 313.1]];
const Retenir: React.FC = () => {
  const t = useT();
  if (t < 304.9) return (
    <Out end={304.95}>
      <Heads h={[[297.0, ['Les', 'grandes', 'lignes'], [1, 2]], [299.2, ['Vos', 'questions'], [1]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        <svg style={{position: 'absolute', left: 0, top: 0}} width={960} height={460}><path d="M 80 380 C 200 380, 220 120, 380 120 S 560 380, 700 300 S 820 110, 850 110" fill="none" stroke={NBK} strokeWidth={22} strokeLinecap="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - prog(t, 296.8, 298.4)}} /></svg>
        {SECT.slice(0, 5).map((x, k) => { const pts = [[80, 380], [300, 150], [500, 280], [700, 300], [850, 110]][k]; const a = 297.0 + k * 0.3; return t > a ? <div key={k} style={{position: 'absolute', left: pts[0] - 34, top: pts[1] - 34, textAlign: 'center', width: 68}}><div style={{width: 68, height: 68, borderRadius: 34, background: x.c, border: `6px solid ${NBK}`, transform: `scale(${Math.min(1, spring(t, a))})`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div><div style={{position: 'absolute', left: -50, width: 168, top: 76, fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: x.c}}>{x.g}</div></div> : null; })}
        {t > 299.0 && <div style={{...nb('#fff', 7), position: 'absolute', left: 80, top: 520, width: 800, padding: 22, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 18, opacity: pop(t, 299.0)}}><F n="bulle" size={90} /><div style={{flex: 1}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM}}>COMMENTAIRES</div><div style={{height: 46, borderRadius: 23, border: `3px solid ${NBK}`, marginTop: 8, display: 'flex', alignItems: 'center', paddingLeft: 18, gap: 8}}>{[0, 1, 2].map((j) => <div key={j} style={{width: 12, height: 12, borderRadius: 6, background: NBK, opacity: 0.3 + 0.7 * Math.abs(Math.sin(t * 4 + j))}} />)}</div></div></div>}
        {t > 302.8 && <div style={{position: 'absolute', left: 300, top: 690}}><NBadge at={302.9} text="RÉPONSE DÈS QUE POSSIBLE" bg={GREEN} rot={-2} size={28} /></div>}
      </Abs>
    </Out>
  );
  if (t < 317.4) return (
    <Out end={317.45}>
      <Heads h={[[305.2, ['Une', 'chose', 'à', 'retenir'], [1, 3]], [308.6, ['Parler', 'sécurité'], [0, 1]], [314.4, ['Des', 'accidents', 'évités'], [1, 2]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        {t < 314.1 ? <>
          {t > 308.6 && <div style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, transform: `scale(${Math.min(1, spring(t, 308.6))})`}}><F n="megaphone" size={140} /><div style={{...nb(NAVY, 8), padding: '18px 30px', fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: '#fff'}}>PARLER SÉCURITÉ</div></div>}
          <div style={{position: 'absolute', left: 0, right: 0, top: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22}}>{TRIO.map(([l, ic, c, a]) => <div key={l} style={{perspective: 1200}}><div style={{...nb(c, 8), width: 720, height: 150, display: 'flex', alignItems: 'center', gap: 26, padding: '0 34px', transformOrigin: '50% 50%', transform: `rotateX(${t > a - 0.2 ? (1 - Math.min(1, spring(t, a - 0.2))) * 90 : 90}deg)`, opacity: t > a - 0.2 ? 1 : 0}}><div style={{width: 104, height: 104, borderRadius: 52, background: '#fff', border: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={ic} size={72} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 62, color: '#fff'}}>{l}</div></div></div>)}</div>
          {t > 313.3 && <Dust n={20} c={GOLD} />}
        </> : <>
          <div style={{position: 'absolute', left: 330, top: 300, transform: `scale(${Math.min(1, spring(t, 315.4))})`, filter: `drop-shadow(0 0 30px ${GREEN})`}}><F n="bouclier" size={300} /></div>
          {['ambulance', 'pansement', 'collision', 'echelle'].map((ic, k) => { const a = 314.6 + k * 0.2; const p = prog(t, a, a + 0.6, easeIn); const hit = t > a + 0.6; const bx = 60 + k * 240; return t > a ? <div key={ic} style={{position: 'absolute', left: hit ? bx + (k < 2 ? -1 : 1) * (t - a - 0.6) * 500 : bx, top: hit ? 200 - (t - a - 0.6) * 300 + (t - a - 0.6) ** 2 * 900 : lerp(-200, 200, p), transform: `rotate(${hit ? (t - a) * 400 : 0}deg)`, opacity: hit ? 1 - prog(t, a + 1.2, a + 1.6) : 1}}><F n={ic} size={120} /></div> : null; })}
          {t > 315.6 && <div style={{position: 'absolute', left: 300, top: 650}}><NBadge at={315.6} text="ÉVITÉS ✓" bg={GREEN} rot={-3} size={50} /></div>}
        </>}
      </Abs>
    </Out>
  );
  const cur = prog(t, 322.6, 323.2, easeInOut);
  const sub = t > 323.3;
  return (
    <>
      <Heads h={[[318.5, ['Partagez'], [0]], [322.7, ['Abonnez-vous'], [0]], [330.5, ['Sensibilisez'], [0]], [333.6, ['Simple', 'et', 'constructif'], [0, 2]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        {t < 328.4 ? <>
          <div style={{position: 'absolute', left: 120, top: 40, display: 'flex', alignItems: 'center', gap: 20, transform: `scale(${pop(t, 320.4)})`}}><div style={{...nb('#fff', 7), padding: '18px 30px', display: 'flex', alignItems: 'center', gap: 16, fontFamily: sansFont, fontWeight: 900, fontSize: 44}}><F n="avion" size={80} />PARTAGER</div>{t > 320.6 && [0, 1, 2].map((j) => <div key={j} style={{transform: `translateX(${Math.max(0, t - 320.6 - j * 0.15) * 300}px)`, opacity: 1 - prog(t, 321.4 + j * 0.15, 322 + j * 0.15)}}><F n="equipe" size={70} /></div>)}</div>
          <div style={{position: 'absolute', left: 200, top: 320, transform: `scale(${pop(t, 322.4) * (t > 323.3 && t < 323.45 ? 0.92 : 1)})`}}><div style={{...nb(sub ? '#9AA5B5' : RED, 9), padding: '30px 60px', fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: '#fff', display: 'flex', alignItems: 'center', gap: 20}}>{sub ? 'ABONNÉ ✓' : 'S’ABONNER'}{sub && <div style={{transform: `rotate(${Math.sin(t * 20) * 20 * Math.max(0, 1 - (t - 323.3))}deg)`}}><F n="cloche" size={80} /></div>}</div></div>
          {t > 322.5 && t < 324.4 && <div style={{position: 'absolute', left: lerp(780, 420, cur), top: lerp(700, 380, cur), zIndex: 9}}><svg width={70} height={86} viewBox="0 0 24 30"><path d="M2 2 L2 24 L8 18 L12 28 L16 26 L12 17 L20 17 Z" fill="#fff" stroke={INK} strokeWidth={2} strokeLinejoin="round" /></svg></div>}
          {t > 325.8 && <div style={{position: 'absolute', left: 250, top: 600}}><NBadge at={325.9} text="AUCUNE PROCHAINE VIDÉO MANQUÉE" bg={NAVY} rot={-2} size={28} /></div>}
        </> : <>
          <Circle cx={480} cy={400} r={310} at={328.4} links={330.9} glow={333.4} c={GREEN} />
          {t > 333.9 && <div style={{position: 'absolute', left: 0, right: 0, top: 790, display: 'flex', justifyContent: 'center', gap: 20}}><NBadge at={334.0} text="SIMPLE" bg={TEAL} rot={-3} size={40} /><NBadge at={334.6} text="CONSTRUCTIVE" bg={ORANGE} rot={3} size={40} /></div>}
          {t > 330.9 && <Dust n={26} c={GOLD} />}
        </>}
      </Abs>
    </>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const ring = (a: number): Sfx[] => [{at: a, s: 'sfx/pop', v: 0.3}, ...rep(a + 0.2, 8, 0.08, 'sfx/pop', 0.12)];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at, s: 'sfx/bell', v: 0.22})),
  {at: 3.0, s: 'sfx/pop', v: 0.3}, ...[4.8, 5.3, 5.8].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), {at: 9.0, s: 'tampon', v: 0.35},
  ...searchCues(11.2, 26, 15.7, 16.4), ...[18.6, 19.2, 20.6].map((a) => ({at: a, s: 'sfx/pop', v: 0.25})),
  {at: 22.1, s: 'sfx/rise', v: 0.25, dur: 1.1}, ...[24.4, 27.7, 29.0].map((a) => ({at: a, s: 'sfx/swish', v: 0.35})),
  ...rep(33.9, 20, 0.05, 'sfx/click', 0.12), {at: 36.0, s: 'sfx/pop', v: 0.3}, {at: 42.9, s: 'tampon', v: 0.35}, {at: 41.3, s: 'soft-whoosh', v: 0.3, dur: 1.6}, {at: 45.6, s: 'validation', v: 0.35},
  {at: 49.5, s: 'deep-hit', v: 0.5}, {at: 51.4, s: 'tampon', v: 0.5}, ...[55.7, 56.8].map((a) => ({at: a, s: 'sfx/swish', v: 0.35})),
  {at: 60.8, s: 'soft-whoosh', v: 0.4, dur: 0.8}, ...[63.8, 65.3, 65.9].map((a) => ({at: a, s: 'validation', v: 0.15})),
  {at: 70.6, s: 'deep-hit', v: 0.55}, {at: 72.6, s: 'sfx/rise', v: 0.3, dur: 1.1}, {at: 74.5, s: 'bass-hit', v: 0.5}, {at: 74.55, s: 'sfx/thud', v: 0.5},
  {at: 79.6, s: 'soft-whoosh', v: 0.35, dur: 0.8}, {at: 80.4, s: 'stylo', v: 0.25, dur: 2}, {at: 82.6, s: 'tampon', v: 0.4}, ...[86.6, 88.4, 90.2].map((a) => ({at: a, s: 'sfx/swish', v: 0.3})),
  {at: 93.1, s: 'soft-whoosh', v: 0.3, dur: 2.5}, ...rep(95.7, 4, 0.15, 'sfx/thud', 0.25), {at: 98.5, s: 'bass-hit', v: 0.35}, {at: 100.6, s: 'bass-hit', v: 0.35},
  {at: 107.4, s: 'sfx/swish', v: 0.35}, {at: 109.3, s: 'soft-whoosh', v: 0.35, dur: 1}, ...[112.0, 113.0, 114.3].map((a) => ({at: a, s: 'sfx/pop', v: 0.22})), ...rep(118.0, 4, 0.15, 'sfx/pop', 0.18), {at: 119.9, s: 'tampon', v: 0.35},
  {at: 121.3, s: 'sfx/swish', v: 0.35}, ...[124.9, 125.9, 127.8].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), {at: 134.0, s: 'sfx/rise', v: 0.3, dur: 0.9}, ...rep(137.8, 10, 0.06, 'sfx/pop', 0.12),
  ...[147.3, 150.7, 152.3, 153.7].map((a) => ({at: a, s: 'validation', v: 0.15})), {at: 155.6, s: 'soft-whoosh', v: 0.35, dur: 0.8}, {at: 158.0, s: 'tampon', v: 0.35},
  ...[167.3, 173.3, 175.9].map((a) => ({at: a, s: 'sfx/swish', v: 0.3})), {at: 179.8, s: 'soft-whoosh', v: 0.4, dur: 1}, {at: 181.0, s: 'bass-hit', v: 0.35}, {at: 184.0, s: 'sfx/rise', v: 0.45, dur: 1.2}, {at: 184.1, s: 'sfx/swish', v: 0.45},
  ...ring(188.2), {at: 189.6, s: 'sfx/rise', v: 0.2, dur: 0.8}, ...SRC.map((x) => ({at: x[2], s: 'sfx/swish', v: 0.25})), {at: 206.6, s: 'validation', v: 0.3},
  {at: 213.0, s: 'sfx/rise', v: 0.2, dur: 6}, {at: 219.3, s: 'bass-hit', v: 0.5}, {at: 219.35, s: 'sfx/ding', v: 0.3},
  ...rep(222.9, 4, 0.22, 'sfx/pop', 0.2), {at: 224.1, s: 'sfx/pop', v: 0.3}, {at: 225.6, s: 'tampon', v: 0.35},
  ...ring(227.3), {at: 233.5, s: 'sfx/swish', v: 0.4}, {at: 237.3, s: 'deep-hit', v: 0.35}, {at: 239.3, s: 'sfx/rise', v: 0.3, dur: 1}, {at: 241.4, s: 'soft-whoosh', v: 0.35, dur: 1}, {at: 245.0, s: 'validation', v: 0.3}, {at: 245.7, s: 'sfx/thud', v: 0.35},
  ...rep(250.6, 5, 0.1, 'sfx/pop', 0.18), {at: 251.0, s: 'soft-whoosh', v: 0.3, dur: 1.5}, {at: 253.1, s: 'bass-hit', v: 0.4}, {at: 256.5, s: 'sfx/swish', v: 0.3},
  ...ring(258.0), {at: 260.2, s: 'soft-whoosh', v: 0.3, dur: 1}, ...rep(261.8, 8, 0.06, 'sfx/pop', 0.15), ...rep(264.6, 7, 0.12, 'sfx/pop', 0.15), ...rep(267.8, 5, 0.12, 'sfx/pop', 0.15), {at: 271.0, s: 'soft-whoosh', v: 0.4, dur: 1},
  {at: 273.6, s: 'sfx/pop', v: 0.3}, ...rep(280.0, 6, 0.2, 'stylo', 0.18), ...rep(282.9, 6, 0.1, 'validation', 0.1), {at: 285.3, s: 'sfx/thud', v: 0.3}, {at: 288.0, s: 'tampon', v: 0.55},
  {at: 296.8, s: 'stylo', v: 0.25, dur: 1.6}, ...rep(297.0, 5, 0.3, 'sfx/pop', 0.2), {at: 299.0, s: 'sfx/pop', v: 0.25},
  {at: 308.6, s: 'bass-hit', v: 0.35}, ...TRIO.map((x) => ({at: x[3] - 0.2, s: 'sfx/thud', v: 0.4})), ...rep(315.2, 4, 0.2, 'sfx/thud', 0.3), {at: 315.6, s: 'validation', v: 0.35},
  {at: 320.6, s: 'soft-whoosh', v: 0.35, dur: 0.8}, {at: 323.3, s: 'sfx/click', v: 0.5}, {at: 323.35, s: 'sfx/ding', v: 0.3},
  ...ring(328.4), {at: 333.4, s: 'sfx/rise', v: 0.3, dur: 1}, {at: 334.0, s: 'tampon', v: 0.35}, {at: 334.6, s: 'tampon', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
export const AnimTerrainMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.8} to={46.8}><Intro /></Gate>
    <Gate from={46.6} to={75.0}><Pourquoi /></Gate>
    <Gate from={77.8} to={101.9}><Peda /></Gate>
    <Gate from={104.9} to={185.3}><Format /></Gate>
    <Gate from={188.0} to={247.1}><Regles /></Gate>
    <Gate from={250.2} to={293.5}><Lancer /></Gate>
    <Gate from={296.6} to={OUTRO_AT}><Retenir /></Gate>
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-anim-terrain-metro-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust];
