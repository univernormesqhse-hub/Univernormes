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
import {captions} from '../aiprAtex/captions';
import {NeoCaptions} from '../components/NeoCaptions';

/**
 * « AIPR vs ATEX — formations » (voix d'origine, 5 min 37) — capsule « condensé + effet wahou + ultra premium »
 * présentée en métro (7 stations). Tube de verre à six guichets = les six parties annoncées par la voix : zones à
 * risque → réglementation → champ d'application → objectifs → modalités → conclusion ; la capsule file d'un guichet à
 * l'autre et chaque transition (gyrophare ×3, loupe, capsule pneumatique, store vénitien) couvre l'annonce de la partie.
 * Intro : secteurs en cartes photo + tampon, barre de recherche « AIPR ATEX » qui ouvre un bonneteau (deux gobelets
 * mélangés puis soulevés), puzzle qui ne s'emboîte pas, personas qui butent, écran partagé sous-sol / atmosphère avec
 * « ≠ » qui claque et fissures qui secouent l'écran, feuille de route tracée en ligne de métro. Parties : sigles
 * dépliés, coupe de terrain (réseaux aux couleurs réglementaires), nuée de gaz invisible, ciel moitié jour moitié nuit,
 * compteur d'années mécanique 1999 → 2014 → 2013 → 2018 et frise, godet qui frappe un réseau + STOP, travaux publics /
 * réseaux / « AIPR exigée », coupe avec ligne aérienne et ouvrier (sous ses pieds, au-dessus de sa tête), relais à 3
 * profils + chaîne de responsabilités, raffinerie + gaz / vapeurs / poussières, anneaux de zones ATEX 0 / 1 / 2 avec
 * jauge, plan des réseaux qui se déroule + détecteur qui balaie et sonne + coup de pioche arrêté, triangle du feu,
 * matériel « Ex » qui confine l'étincelle, réglette sensibilisation → urgences, palettes 7 H / 5 ANS, réglette élastique
 * 1 heure → plusieurs jours, bouclier sur les réseaux, flamme barrée, carrefour TERRE → AIPR / AIR → ATEX, tracé
 * cardiaque. Kits capsule-ui-neo-brutal, capsule-recit-illustre, capsule-decryptage-chiffres ; images de la capsule
 * AIPR / ATEX réutilisées ; sous-titres de la capsule d'origine (même voix, vérifiée).
 */
const IMG = {
  cover: 'epi/chantier.jpg',
  c1: 'epi/chantier.jpg',
  c2: 'smi/raffinerie.jpg',
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
const OUTRO_AT = 337.3;
export const AIPR_ATEX_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 60.3, n: '1', title: 'Zones à risque', s: 'réseaux · atmosphère', c: ORANGE, g: 'zones', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 92.3, n: '2', title: 'Réglementation', s: 'origine · cadre', c: BLUE, g: 'réglementation', k: 'loupe', lab: 'PARTIE 2 / 6'},
  {at: 123.2, n: '3', title: "Champ d'application", s: 'qui · quel terrain', c: VIO, g: 'champ', k: 'tube', lab: 'PARTIE 3 / 6'},
  {at: 216.6, n: '4', title: 'Objectifs', s: "ce qu'on apprend", c: TEAL, g: 'objectifs', k: 'store', lab: 'PARTIE 4 / 6'},
  {at: 263.5, n: '5', title: 'Modalités', s: 'durée · validité', c: NAVY, g: 'modalités', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 291.6, n: '6', title: 'Conclusion', s: 'terre ou air ?', c: GREEN, g: 'conclusion', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 336.2;
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
  {n: 1, l: 'Feuille de route', s: 'feuille de route', at: 46.1},
  {n: 2, l: 'AIPR · ATEX', s: 'aipr · atex', at: 69.4},
  {n: 3, l: 'Directives', s: 'directives', at: 96.8},
  {n: 4, l: '3 profils', s: '3 profils', at: 150.2},
  {n: 5, l: 'Zones 0 · 1 · 2', s: 'zones 0·1·2', at: 199.8},
  {n: 6, l: 'Formations', s: 'formations', at: 221.7},
  {n: 7, l: 'Terre ou air ?', s: 'terre ou air', at: 323.1},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE AIPR / ATEX · STATION {r.n} / 7</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 820, overflow: 'hidden', clipPath: 'polygon(0 0, 60% 0, 40% 100%, 0 100%)', transform: `scale(${1 + t * 0.02})`}}><Pic src={IMG.c1} ic="danger" w={1080} h={820} pos="30% 50%" /></div>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 820, overflow: 'hidden', clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 40% 100%)', transform: `scale(${1 + t * 0.02})`}}><Pic src={IMG.c2} ic="usine" w={1080} h={820} pos="70% 40%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 24%, ${PAPER}CC 32%, ${PAPER} 37%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={590} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="AIPR" src={IMG.c1} size={190} ls={6} seed={2} /></Abs>
      <Abs x={0} y={790} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb(RED, 6), color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 64, padding: '4px 26px', transform: `rotate(-4deg) scale(${Math.min(1, spring(t, 0.4))})`}}>VS</div></Abs>
      <Abs x={0} y={900} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="ATEX" src={IMG.c2} size={190} ls={6} seed={5} /></Abs>
      <Abs x={40} y={1200} w={1000} style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10}}>{[['RÉSEAUX', BLUE], ['ATMOSPHÈRE', ORANGE], ['ZONES', RED], ['FORMATIONS', GREEN]].map(([n, c], k) => <div key={n} style={{...nb(c, 4), padding: '6px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', transform: `translateY(${(1 - Math.min(1, spring(t, 0.3 + k * 0.08))) * 60}px)`}}>{n}</div>)}</Abs>
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






/* ═════════════ Outils communs ═════════════ */
const AIPR_C = BLUE, ATEX_C = ORANGE;
const cl = (x: number) => Math.max(0, Math.min(1, x));
const GyroFlash: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  const q = (t - at) / 0.9;
  if (q < 0 || q > 1) return null;
  const a = Math.sin(q * Math.PI);
  return <AbsoluteFill style={{zIndex: 70, pointerEvents: 'none', opacity: a * 0.6, background: `radial-gradient(circle at ${50 + 45 * Math.cos(q * 12)}% 10%, rgba(224,56,62,0.85), transparent 45%), radial-gradient(circle at ${50 - 45 * Math.cos(q * 12)}% 10%, rgba(31,111,209,0.85), transparent 45%)`}} />;
};
/** Carte néo-brutale icône + libellé qui surgit à `at`. */
const ICard: React.FC<{at: number; ic: string; l: string; c: string; x: number; y: number; w: number; h?: number; fs?: number; sub?: string}> = ({at, ic, l, c, x, y, w, h = 120, fs = 34, sub}) => {
  const t = useT();
  if (t < at - 0.02) return null;
  const p = Math.min(1, spring(t, at, 9, 15));
  return (
    <Abs x={x} y={y} w={w} h={h} style={{...nb('#fff', 6), borderColor: c, display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px', transform: `translateY(${(1 - p) * 70}px) scale(${0.85 + 0.15 * p})`, opacity: cl(p * 2)}}>
      <F n={ic} size={h * 0.62} />
      <div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: fs, color: c, lineHeight: 1.05}}>{l}</div>{sub && <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: fs * 0.62, color: DIM, marginTop: 4}}>{sub}</div>}</div>
    </Abs>
  );
};
/** Coupe de terrain : ciel, sol, réseaux enterrés aux couleurs (gaz jaune, électricité rouge, eau bleue, télécom vert). */
const NETS: [string, number][] = [['#E8B500', 0.38], [RED, 0.55], [BLUE, 0.7], [GREEN, 0.86]];
const Ground: React.FC<{w: number; h: number; t: number; p?: number; overhead?: boolean; sky?: string}> = ({w, h, t, p = 1, overhead, sky = '#DCEBFA'}) => {
  const gy = h * 0.26;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <rect width={w} height={gy} fill={sky} />
      <rect y={gy} width={w} height={h - gy} fill="#B98A5A" />
      {Array.from({length: 18}, (_, k) => <circle key={k} cx={(k * 97) % w} cy={gy + 30 + ((k * 53) % (h - gy - 40))} r={4 + (k % 3) * 2} fill="#9C7046" />)}
      <rect y={gy - 10} width={w} height={14} fill="#6E9E3A" />
      {NETS.map(([c, f], k) => { const y = gy + (h - gy) * f * 0.92; const L = w * cl(p * 1.3 - k * 0.1); return <g key={c}><line x1={0} y1={y} x2={L} y2={y} stroke={NBK} strokeWidth={k < 2 ? 26 : 20} strokeLinecap="round" /><line x1={0} y1={y} x2={L} y2={y} stroke={c} strokeWidth={k < 2 ? 18 : 13} strokeLinecap="round" /></g>; })}
      {overhead && <>{[w * 0.15, w * 0.85].map((x) => <rect key={x} x={x - 7} y={gy - 150} width={14} height={150} fill="#7A5A3A" />)}<path d={`M ${w * 0.15} ${gy - 140} Q ${w / 2} ${gy - 100} ${w * 0.85} ${gy - 140}`} fill="none" stroke={NBK} strokeWidth={5} /></>}
    </svg>
  );
};
/** Nuée de gaz invisible (particules orange qui dérivent). */
const GasCloud: React.FC<{w: number; h: number; t: number; dens?: number; c?: string}> = ({w, h, t, dens = 1, c = ATEX_C}) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{position: 'absolute', left: 0, top: 0}}>
    {Array.from({length: Math.round(26 * dens)}, (_, k) => { const x = ((k * 137 + t * (20 + (k % 5) * 9)) % (w + 120)) - 60; const y = (k * 71) % h + Math.sin(t * 1.2 + k) * 22; return <circle key={k} cx={x} cy={y} r={18 + (k % 4) * 10} fill={c} opacity={0.12 + (k % 3) * 0.06} />; })}
  </svg>
);

/* ═════════════ Intro 1 : un sujet central — construction, industrie, énergie ═════════════ */
const SECTORS: [string, string, number, number][] = [['Construction', 'epi/chantier.jpg', 5.2, -7], ['Industrie', 'promo/hse-machine.jpg', 6.3, 0], ['Énergie', 'promo/raffinerie.jpg', 6.9, 7]];
const Hook: React.FC = () => {
  const t = useT();
  return (
    <Out end={9.05}>
      <Heads h={[[2.7, ['Un', 'sujet', 'central'], [2]], [5.2, ['Construction', 'industrie', 'énergie'], [0, 1, 2]], [7.7, ['La', 'sécurité', 'au travail'], [1, 2]]]} />
      {SECTORS.map(([l, , , r], k) => <Abs key={`ph${l}`} x={90 + k * 300} y={560} w={300} h={420} style={{transform: `rotate(${r}deg)`, border: `5px dashed #C9D2DF`, borderRadius: 18, opacity: pop(t, 2.8 + k * 0.15), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: '#C9D2DF'}}>?</Abs>)}
      {SECTORS.map(([l, src, at, r], k) => { if (t < at - 0.02) return null; const p = Math.min(1, spring(t, at, 8, 13)); return (
        <Abs key={l} x={90 + k * 300} y={560 + (1 - p) * 500} w={300} h={420} style={{transform: `rotate(${r}deg)`, ...nb('#fff', 7), overflow: 'hidden'}}>
          <Img src={PH(src)} style={{width: '100%', height: 330, objectFit: 'cover'}} />
          <div style={{height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK}}>{l}</div>
        </Abs>
      ); })}
      {t > 7.7 && <Stamp at={7.7} text="SÉCURITÉ AU TRAVAIL" c={RED} x={140} y={1090} rot={-6} size={54} />}
    </Out>
  );
};

/* ═════════════ Intro 2 : recherche « AIPR ATEX » → bonneteau qui mélange puis révèle ═════════════ */
const Confusion: React.FC = () => {
  const t = useT();
  const SH = [11.0, 11.6, 12.2, 12.8, 13.4, 14.0];
  let order = 0;
  let swapP = 0;
  SH.forEach((a) => { if (t >= a + 0.45) order = 1 - order; else if (t >= a) swapP = prog(t, a, a + 0.45, easeInOut); });
  const reveal = prog(t, 14.9, 15.4, easeOut);
  const pos = (cup: number) => { const base = (cup + order) % 2; const inSwap = SH.some((a) => t >= a && t < a + 0.45); const from = base, to = 1 - base; const x = inSwap ? lerp(from, to, swapP) : base; const arc = inSwap ? Math.sin(swapP * Math.PI) * (base === 0 ? -90 : 90) : 0; return {x: 130 + x * 380, y: 330 + arc}; };
  return (
    <Out end={21.85}>
      <Heads h={[[9.1, ['Une', 'confusion'], [1]], [15.0, ["L'AIPR", 'et', "l'ATEX"], [0, 2]], [16.5, ['Remettre', 'au clair'], [1]]]} />
      <SearchOpen x={60} y={440} w={960} h={900} at={9.1} query="AIPR ATEX" results={["AIPR · intervention près des réseaux", 'ATEX · atmosphère explosible', 'AIPR ou ATEX ? la confusion']} found={2} foundAt={9.9} clickAt={10.2} c={RED}>
        {[0, 1].map((cup) => { const {x, y} = pos(cup); const c = cup === 0 ? AIPR_C : ATEX_C; return (
          <div key={cup} style={{position: 'absolute', left: x, top: y - 220, width: 300, height: 360}}>
            <div style={{position: 'absolute', left: 30, right: 30, bottom: 0, height: 120 * reveal, ...nb(c, 6), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 64, overflow: 'hidden', opacity: reveal}}>{cup === 0 ? 'AIPR' : 'ATEX'}</div>
            <svg width={300} height={300} style={{position: 'absolute', left: 0, top: -reveal * 150}}><path d="M 50 280 L 80 40 L 220 40 L 250 280 Z" fill={reveal > 0.5 ? '#C9D2DF' : NAVY} stroke={NBK} strokeWidth={8} /><rect x={70} y={26} width={160} height={26} rx={10} fill={NBK} /><text x={150} y={190} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={110} fill="#fff" opacity={1 - reveal}>?</text></svg>
          </div>
        ); })}
        {t > 16.5 && <div style={{position: 'absolute', left: 0, right: 0, top: 640, display: 'flex', justifyContent: 'center'}}><div style={{...nb(YEL, 6), padding: '10px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 40, transform: `scale(${Math.min(1, spring(t, 16.5))}) rotate(-2deg)`}}>deux acronymes · deux mondes</div></div>}
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ Intro 3 : un vrai casse-tête — puzzle qui ne s'emboîte pas, tout le monde bute ═════════════ */
const piece = (tab: boolean) => `M 0 0 L 120 0 ${tab ? 'C 120 40 170 40 170 80 C 170 120 120 120 120 160' : 'C 120 40 75 40 75 80 C 75 120 120 120 120 160'} L 120 240 L 0 240 Z`;
const CasseTete: React.FC = () => {
  const t = useT();
  const wob = t < 25.6 ? Math.sin(t * 9) * 14 * cl((t - 22.2) * 2) : 0;
  return (
    <Out end={33.05}>
      <Heads h={[[21.9, ['Un', 'vrai', 'casse-tête'], [2]], [25.8, ['Tout', 'le monde', 'bute'], [2]]]} />
      <svg width={1080} height={700} style={{position: 'absolute', left: 0, top: 440}}>
        <g transform={`translate(${300 + wob} 60)`}><path d={piece(true)} fill={AIPR_C} stroke={NBK} strokeWidth={7} transform="scale(1.4)" /><text x={84} y={190} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={48} fill="#fff">AIPR</text></g>
        <g transform={`translate(${780 - wob} 60) scale(-1 1)`}><path d={piece(true)} fill={ATEX_C} stroke={NBK} strokeWidth={7} transform="scale(1.4)" /><text x={84} y={190} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={48} fill="#fff" transform="translate(168 0) scale(-1 1)">ATEX</text></g>
        {t > 23.8 && <g transform="translate(540 230)" opacity={cl((t - 23.8) * 3)}><circle r={46} fill={RED} stroke={NBK} strokeWidth={6} /><text y={20} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={58} fill="#fff">✕</text></g>}
      </svg>
      {[['Professionnels du terrain', 'casque', 25.8], ['Responsables sécurité', 'bouclier', 27.5], ['Formateurs', 'tableau', 28.9]].map(([l, ic, at], k) => t > (at as number) && (
        <Abs key={l as string} x={60 + k * 330} y={900} w={300} h={300} style={{...nb('#fff', 6), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, transform: `scale(${Math.min(1, spring(t, at as number))})`}}>
          <F n={ic as string} size={110} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, textAlign: 'center', lineHeight: 1.1, padding: '0 12px'}}>{l as string}</div>
          {t > 30.5 && <div style={{position: 'absolute', right: -14, top: -24, width: 70, height: 70, borderRadius: 35, ...nb(YEL, 4), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 44, transform: `scale(${Math.min(1, spring(t, 30.5 + k * 0.12))}) rotate(${Math.sin(t * 6 + k) * 8}deg)`}}>?</div>}
        </Abs>
      ))}
    </Out>
  );
};

/* ═════════════ Intro 4 : mêmes mots, rien à voir — écran partagé + ≠ + fissures ═════════════ */
const RienAVoir: React.FC = () => {
  const t = useT();
  const crack = prog(t, 42.0, 42.6, easeOut);
  const shake = t > 42.0 && t < 42.9 ? Math.sin(t * 70) * 10 * (1 - prog(t, 42.0, 42.9)) : 0;
  return (
    <Out end={46.05}>
      <Heads h={[[33.1, ['Les', 'deux', 'parlent'], [2]], [34.5, ['de', 'risques'], [1]], [35.3, ['de', 'zones'], [1]], [38.2, ['Rien', 'à voir'], [0, 1]], [42.0, ['Conséquences', 'désastreuses'], [0, 1]]]} />
      <AbsoluteFill style={{transform: `translateX(${shake}px)`}}>
        <Abs x={60} y={450} w={470} h={620} style={{...nb('#fff', 7), borderColor: AIPR_C, overflow: 'hidden'}}>
          <Ground w={470} h={520} t={t} />
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 100, background: AIPR_C, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 56, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>AIPR</div>
        </Abs>
        <Abs x={550} y={450} w={470} h={620} style={{...nb('#FFF4E5', 7), borderColor: ATEX_C, overflow: 'hidden'}}>
          <GasCloud w={470} h={520} t={t} dens={1.2} />
          <div style={{position: 'absolute', left: 150, top: 160}}><F n="usine" size={170} /></div>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 100, background: ATEX_C, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 56, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>ATEX</div>
        </Abs>
        {[['risques', 34.5], ['zones', 35.3]].map(([l, at], k) => t > (at as number) && <Abs key={l as string} x={300} y={1100 + k * 90} w={480} h={74} style={{...nb('#fff', 5), display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, transform: `scale(${Math.min(1, spring(t, at as number))})`}}><span style={{color: AIPR_C}}>✓</span>{l as string}<span style={{color: ATEX_C}}>✓</span></Abs>)}
        {t > 38.2 && <Abs x={430} y={640} w={220} h={220} style={{transform: `scale(${lerp(2.4, 1, Math.min(1, prog(t, 38.2, 38.45, easeIn)))})`, display: 'flex', alignItems: 'center', justifyContent: 'center', ...nb(RED, 8), borderRadius: 110, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 150, zIndex: 5}}>≠</Abs>}
        {crack > 0 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 6}}>{Array.from({length: 9}, (_, k) => { const a = (k / 9) * Math.PI * 2 + 0.3; const pts = [0, 1, 2, 3].map((j) => `${540 + Math.cos(a + Math.sin(j * 3 + k) * 0.25) * j * 130 * crack},${760 + Math.sin(a + Math.cos(j * 2 + k) * 0.25) * j * 130 * crack}`).join(' '); return <polyline key={k} points={pts} fill="none" stroke={NBK} strokeWidth={6} />; })}</svg>}
        {t > 43.3 && <Abs x={60} y={1290} w={960} style={{display: 'flex', justifyContent: 'center', zIndex: 7}}><NBadge at={43.3} text="CHANTIER · USINE" bg={RED} rot={-2} size={36} /></Abs>}
      </AbsoluteFill>
    </Out>
  );
};

/* ═════════════ Intro 5 : la feuille de route — une ligne qui se trace, 4 arrêts ═════════════ */
const ROUTE: [string, string, number][] = [['Les zones à risque', 'danger', 50.6], ['La réglementation', 'balance', 53.1], ['Qui est concerné', 'equipe', 54.2], ['Objectifs & formats', 'cible', 55.7]];
const Route: React.FC = () => {
  const t = useT();
  const pts = [[150, 560], [900, 560], [900, 800], [150, 800], [150, 1040], [900, 1040]];
  const dr = prog(t, 47.6, 57.0, (v: number) => v);
  const d = pts.map((p, k) => `${k ? 'L' : 'M'} ${p[0]} ${p[1]}`).join(' ');
  const stops = [[150, 560], [900, 680], [150, 920], [900, 1040]];
  return (
    <Out end={60.4}>
      <Heads h={[[46.1, ['On', 'plonge'], [1]], [47.6, ['La', 'feuille', 'de route'], [1, 2]], [58.5, ['Le', 'bon', 'choix'], [1, 2]]]} />
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        <path d={d} fill="none" stroke="#E3E6EC" strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" />
        <path d={d} fill="none" stroke={GREEN} strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${dr} 1`} />
      </svg>
      {ROUTE.map(([l, ic, at], k) => { const [x, y] = stops[k]; const on = t > at; return (
        <React.Fragment key={l}>
          <Abs x={x - 38} y={y - 38} w={76} h={76} style={{borderRadius: 38, background: on ? GREEN : '#fff', border: `8px solid ${NBK}`, boxSizing: 'border-box', transform: `scale(${on ? 1 + Math.max(0, 1 - (t - at) * 3) * 0.4 : 1})`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{k + 1}</Abs>
          {on && <ICard at={at} ic={ic} l={l} c={GREEN} x={x < 500 ? 230 : 330} y={y - (k === 1 ? 0 : 60) + (k === 1 ? -60 : 0)} w={480} h={110} fs={32} />}
        </React.Fragment>
      ); })}
      {t > 58.5 && <Abs x={60} y={1200} w={960} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={58.5} text="FAIRE LE BON CHOIX" bg={NAVY} rot={-2} size={40} /></Abs>}
    </Out>
  );
};

/* ═════════════ Partie 1 : zones à risque — sigles dépliés, coupe du sous-sol, nuage invisible, jour / nuit ═════════════ */
const Unfold: React.FC<{acr: string; words: [string, number][]; at: number; c: string; y: number}> = ({acr, words, at, c, y}) => {
  const t = useT();
  return (
    <Abs x={60} y={y} w={960} h={300}>
      <div style={{display: 'flex', gap: 14, justifyContent: 'center'}}>{acr.split('').map((L, k) => <div key={k} style={{width: 120, height: 130, ...nb(c, 6), color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `translateY(${(1 - Math.min(1, spring(t, at + k * 0.07, 10, 15))) * -160}px)`, opacity: t > at + k * 0.07 - 0.02 ? 1 : 0}}>{L}</div>)}</div>
      <div style={{marginTop: 26, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: 14, fontFamily: sansFont, fontWeight: 900, fontSize: 46, lineHeight: 1.15}}>
        {words.map(([w, wa], k) => <span key={k} style={{opacity: t > wa ? 1 : 0.1}}>{/^[A-ZÉ]/.test(w) ? <><span style={{color: c, textDecoration: 'underline', textDecorationThickness: 6}}>{w[0]}</span>{w.slice(1)}</> : w}</span>)}
      </div>
    </Abs>
  );
};
const ZonesA: React.FC = () => {
  const t = useT();
  return (
    <Out end={78.05}>
      <Heads h={[[65.1, ['Un', 'énorme', 'indice'], [2]], [69.4, ['AIPR'], [0]], [73.7, ['Près', "d'infrastructures"], [1]], [76.0, ['Tuyaux', '·', 'câbles'], [0, 2]]]} />
      <Unfold acr="AIPR" at={65.3} c={AIPR_C} y={450} words={[['Autorisation', 69.6], ["d'Intervention", 71.1], ['à', 71.8], ['Proximité', 72.0], ['des', 72.5], ['Réseaux', 72.7]]} />
      {t < 73.2 && <Abs x={340} y={820} w={400} h={400} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 65.9) * (1 - prog(t, 72.8, 73.2)), transform: `scale(${1 + 0.06 * Math.sin(t * 5)}) rotate(${Math.sin(t * 2) * 6}deg)`}}><div style={{position: 'absolute', inset: 30, borderRadius: '50%', background: `radial-gradient(circle, ${YEL}88, transparent 70%)`}} /><F n="ampoule" size={300} /></Abs>}
      <Abs x={60} y={790} w={960} h={520} style={{...nb('#fff', 7), borderColor: AIPR_C, overflow: 'hidden', opacity: pop(t, 73.1)}}>
        <Ground w={960} h={520} t={t} p={prog(t, 73.3, 76.5, (v: number) => v)} />
        {t > 76.0 && <div style={{position: 'absolute', left: 30, top: 200}}><NBadge at={76.0} text="TUYAUX" bg={NBK} rot={-3} size={30} /></div>}
        {t > 76.8 && <div style={{position: 'absolute', right: 40, top: 290}}><NBadge at={76.8} text="CÂBLES" bg={RED} rot={3} size={30} /></div>}
      </Abs>
    </Out>
  );
};
const ZonesB: React.FC = () => {
  const t = useT();
  const split = t >= 85.9;
  const dn = prog(t, 91.0, 91.8, easeInOut);
  return (
    <Out end={92.4}>
      <Heads h={[[78.1, ['ATEX'], [0]], [81.4, ['Un', 'danger', 'invisible'], [2]], [85.9, ['Enfoui', 'ou', 'suspendu'], [0, 2]], [88.7, ['Chimique', 'et', 'ambiant'], [0, 2]], [91.0, ['Le', 'jour', 'et la nuit'], [1, 2]]]} />
      {!split && <>
        <Unfold acr="ATEX" at={78.2} c={ATEX_C} y={450} words={[['ATmosphère', 79.2], ['EXplosible', 80.4]]} />
        <Abs x={60} y={790} w={960} h={520} style={{...nb('#FFF4E5', 7), borderColor: ATEX_C, overflow: 'hidden', opacity: pop(t, 81.4)}}>
          <GasCloud w={960} h={520} t={t} dens={2 * prog(t, 81.4, 83.0)} />
          <div style={{position: 'absolute', left: 380, top: 170}}><F n="casque" size={180} /></div>
          {t > 82.7 && <div style={{position: 'absolute', left: 30, top: 30}}><NBadge at={82.7} text="IL FLOTTE DANS L'AIR" bg={ATEX_C} rot={-3} size={32} /></div>}
        </Abs>
      </>}
      {split && <>
        <Abs x={60} y={450} w={470} h={860} style={{...nb('#fff', 7), borderColor: AIPR_C, overflow: 'hidden'}}>
          <div style={{position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${lerp(0, 1, dn) > 0.5 ? '#FFE7A3' : '#DCEBFA'}, #fff 40%)`}} />
          <div style={{position: 'absolute', left: 0, top: 160}}><Ground w={470} h={700} t={t} overhead sky="transparent" /></div>
          <div style={{position: 'absolute', left: 300, top: 30, width: 110, height: 110, borderRadius: 55, background: YEL, boxShadow: `0 0 ${40 * dn}px ${YEL}`, opacity: dn, transform: `translateY(${(1 - dn) * 80}px)`}} />
          <div style={{position: 'absolute', left: 20, top: 30}}><NBadge at={85.9} text="ENFOUI · SUSPENDU" bg={AIPR_C} rot={-3} size={26} /></div>
        </Abs>
        <Abs x={550} y={450} w={470} h={860} style={{...nb(dn > 0.5 ? '#141B33' : '#FFF4E5', 7), borderColor: ATEX_C, overflow: 'hidden'}}>
          <GasCloud w={470} h={860} t={t} dens={2} />
          <div style={{position: 'absolute', left: 150, top: 330}}><F n="usine" size={170} /></div>
          {Array.from({length: 14}, (_, k) => <div key={k} style={{position: 'absolute', left: (k * 67) % 440, top: 40 + (k * 41) % 260, width: 6, height: 6, borderRadius: 3, background: '#fff', opacity: dn * (0.4 + 0.6 * Math.abs(Math.sin(t * 3 + k)))}} />)}
          <div style={{position: 'absolute', left: 300, top: 40, width: 100, height: 100, borderRadius: 50, background: '#F4F1E6', boxShadow: `inset -24px -10px 0 ${dn > 0.5 ? '#141B33' : '#FFF4E5'}`, opacity: dn}} />
          {t > 88.7 && <div style={{position: 'absolute', left: 20, top: 160}}><NBadge at={88.7} text="CHIMIQUE · AMBIANT" bg={ATEX_C} rot={3} size={26} /></div>}
        </Abs>
      </>}
    </Out>
  );
};

/* ═════════════ Partie 2 : réglementation — compteur d'années qui roule + coup de pelle stoppé ═════════════ */
const YEARS: [number, number, string, string, string][] = [[1999, 98.5, 'ATEX', 'Directive ATEX 137', 'éviter les explosions au travail'], [2014, 105.5, 'ATEX', 'Directive 114', 'les équipements des zones dangereuses'], [2013, 113.7, 'AIPR', 'Directive européenne', 'à l’origine de l’AIPR'], [2018, 116.8, 'AIPR', 'Décret en France', 'transposition — décret « super important »']];
const Odo: React.FC<{v: number; c: string}> = ({v, c}) => (
  <div style={{display: 'flex', gap: 12, justifyContent: 'center'}}>{[1000, 100, 10, 1].map((m) => { const base = Math.floor(v / m) % 10; const low = v % m; const fr = m === 1 ? v - Math.floor(v) : Math.max(0, low - (m - 1)); return (
    <div key={m} style={{width: 150, height: 190, ...nb(NIGHT, 7), overflow: 'hidden', position: 'relative'}}>
      {[0, 1].map((j) => <div key={j} style={{position: 'absolute', left: 0, right: 0, top: (j - fr) * 190, height: 190, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 140, color: '#fff', textShadow: `0 0 18px ${c}`}}>{(base + j) % 10}</div>)}
      <div style={{position: 'absolute', left: 0, right: 0, top: '50%', height: 4, background: '#000', opacity: 0.6}} />
    </div>
  ); })}</div>
);
const Regle: React.FC = () => {
  const t = useT();
  const k = YEARS.reduce((a, y, i) => (t >= y[1] - 0.6 ? i : a), 0);
  const prev = k === 0 ? 1990 : YEARS[k - 1][0];
  const v = lerp(prev, YEARS[k][0], prog(t, YEARS[k][1] - 0.6, YEARS[k][1], easeOut));
  const [, at, who, title, sub] = YEARS[k];
  const c = who === 'AIPR' ? AIPR_C : ATEX_C;
  const strike = t >= 117.6;
  const dig = prog(t, 120.7, 121.6, easeIn);
  return (
    <Out end={123.3}>
      <Heads h={[[96.8, ["L'ATEX", 'ouvre', 'le bal'], [0]], [104.5, ['Renforcée', 'en 2014'], [1]], [111.1, ["L'AIPR", 'plus', 'récente'], [0, 2]], [117.6, ['Le', 'but', '?'], [1]], [118.2, ['Un', "point d'arrêt"], [1]]]} />
      {!strike && <>
        <Abs x={60} y={450} w={960} h={200} style={{opacity: pop(t, 96.0)}}><Odo v={v} c={c} /></Abs>
        <Abs x={60} y={690} w={960} h={240} style={{...nb('#fff', 7), borderColor: c, display: 'flex', alignItems: 'center', gap: 24, padding: '0 30px', opacity: pop(t, at - 0.1)}}>
          <div style={{...nb(c, 5), color: '#fff', padding: '10px 20px', fontFamily: sansFont, fontWeight: 900, fontSize: 48}}>{who}</div>
          <div key={k}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, lineHeight: 1.05, opacity: pop(t, at)}}>{title}</div><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 30, color: DIM, marginTop: 8, opacity: pop(t, at + 0.3)}}>{sub}</div></div>
        </Abs>
        <svg width={1080} height={340} style={{position: 'absolute', left: 0, top: 980}}>
          <line x1={110} x2={970} y1={150} y2={150} stroke={NBK} strokeWidth={8} />
          {[[1999, 'ATEX'], [2013, 'AIPR'], [2014, 'ATEX'], [2018, 'AIPR']].map(([y, w]) => { const x = 110 + ((y as number) - 1995) / 25 * 860; const on = YEARS.some((Y) => Y[0] === y && t >= Y[1]); const cc = w === 'AIPR' ? AIPR_C : ATEX_C; return <g key={y as number}><circle cx={x} cy={150} r={on ? 26 : 16} fill={on ? cc : '#fff'} stroke={NBK} strokeWidth={6} /><text x={x} y={(w === 'AIPR') ? 230 : 100} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={34} fill={on ? cc : '#A9B1BE'}>{y as number}</text></g>; })}
        </svg>
      </>}
      {strike && <Abs x={60} y={450} w={960} h={820} style={{...nb('#fff', 7), overflow: 'hidden', opacity: pop(t, 117.6)}}>
        <Ground w={960} h={820} t={t} />
        <svg width={960} height={820} style={{position: 'absolute', left: 0, top: 0}}>
          <g transform={`translate(${520} ${lerp(-60, 260, dig)}) rotate(${lerp(-30, 10, dig)})`}><path d="M -90 -20 L 90 -20 L 70 80 L -70 80 Z" fill="#F5C400" stroke={NBK} strokeWidth={7} />{[-60, -20, 20, 60].map((x) => <path key={x} d={`M ${x - 10} 80 L ${x} 108 L ${x + 10} 80`} fill="#9AA3B2" stroke={NBK} strokeWidth={4} />)}<rect x={-14} y={-260} width={28} height={250} fill="#F5C400" stroke={NBK} strokeWidth={6} /></g>
          {dig > 0.9 && Array.from({length: 12}, (_, k) => { const a = (k / 12) * Math.PI * 2; const q = cl((t - 121.6) * 2); return <line key={k} x1={520 + Math.cos(a) * 30} y1={410 + Math.sin(a) * 30} x2={520 + Math.cos(a) * (40 + q * 90)} y2={410 + Math.sin(a) * (40 + q * 90)} stroke={YEL} strokeWidth={6} opacity={1 - q} />; })}
        </svg>
        {t > 118.3 && <div style={{position: 'absolute', left: 0, right: 0, top: 40, display: 'flex', justifyContent: 'center'}}><div style={{width: 170, height: 170, borderRadius: 30, background: RED, border: `8px solid ${NBK}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', clipPath: 'polygon(30% 0, 70% 0, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0 70%, 0 30%)', transform: `scale(${Math.min(1, spring(t, 118.3))})`}}>STOP</div></div>}
        {t > 118.9 && <div style={{position: 'absolute', left: 30, bottom: 30, display: 'flex', gap: 14}}><NBadge at={118.9} text="ACCIDENTS" bg={RED} rot={-3} size={30} /><NBadge at={119.4} text="PANNES MONSTRES" bg={NBK} rot={2} size={30} /></div>}
      </Abs>}
    </Out>
  );
};

/* ═════════════ Partie 3a : AIPR — qui et quels réseaux ; sous ses pieds, au-dessus de sa tête ═════════════ */
const ChampA: React.FC = () => {
  const t = useT();
  const pan = t >= 142.3;
  return (
    <Out end={150.2}>
      <Heads h={[[128.6, ["L'AIPR", 'cible'], [0]], [130.7, ['Travaux', 'publics'], [0, 1]], [136.7, ['Gaz', 'haute tension', 'fibre'], [0, 1, 2]], [140.9, ['AIPR', 'exigée'], [1]], [148.3, ['Sous', 'ses pieds'], [1]], [149.5, ['Au-dessus', 'de sa tête'], [0, 1]]]} />
      {!pan && <>
        {[['Travaux publics', 'pelle', 131.7], ['Artisans', 'outils', 132.7], ['Techniciens', 'casque', 133.4]].map(([l, ic, at], k) => <ICard key={l as string} at={at as number} ic={ic as string} l={l as string} c={AIPR_C} x={60} y={460 + k * 140} w={460} h={120} />)}
        {t > 134.3 && <Abs x={560} y={460} w={460} h={400} style={{...nb('#fff', 6), overflow: 'hidden', opacity: pop(t, 134.3)}}><Ground w={460} h={400} t={t} p={prog(t, 134.3, 136.0)} /><div style={{position: 'absolute', left: 16, top: 16}}><NBadge at={134.4} text="CREUSER · POSER" bg={AIPR_C} rot={-3} size={24} /></div></Abs>}
        {[['Conduite de gaz', '#E8B500', 137.7, 'feu'], ['Ligne haute tension', RED, 138.7, 'eclair'], ['Fibre optique', GREEN, 139.6, 'globe']].map(([l, c, at, ic], k) => t > (at as number) && <Abs key={l as string} x={60 + k * 330} y={920} w={300} h={220} style={{...nb('#fff', 6), borderColor: c as string, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, transform: `scale(${Math.min(1, spring(t, at as number))})`}}><div style={{width: 200, height: 22, borderRadius: 11, background: c as string, border: `4px solid ${NBK}`}} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, textAlign: 'center', color: INK}}>{l as string}</div></Abs>)}
        {t > 140.9 && <Stamp at={140.9} text="AIPR EXIGÉE" c={AIPR_C} x={320} y={1170} rot={-5} size={56} />}
      </>}
      {pan && <Abs x={60} y={450} w={960} h={860} style={{...nb('#fff', 7), overflow: 'hidden', opacity: pop(t, 142.3)}}>
        <div style={{position: 'absolute', left: 0, top: lerp(0, -60, prog(t, 147.5, 149.5, easeInOut))}}><Ground w={960} h={920} t={t} overhead /></div>
        <div style={{position: 'absolute', left: 400, top: 120}}><F n="ouvrier" size={180} /></div>
        {t > 148.3 && <div style={{position: 'absolute', left: 460, top: 330, fontSize: 90, color: AIPR_C, transform: `translateY(${Math.sin(t * 6) * 10}px)`}}>▼</div>}
        {t > 149.5 && <div style={{position: 'absolute', left: 460, top: 20, fontSize: 90, color: RED, transform: `translateY(${Math.sin(t * 6) * 10}px)`}}>▲</div>}
        {t > 143.8 && <div style={{position: 'absolute', left: 24, bottom: 24}}><NBadge at={143.8} text="DOMAINE PUBLIC OU PRIVÉ" bg={AIPR_C} rot={-2} size={30} /></div>}
      </Abs>}
    </Out>
  );
};

/* ═════════════ Partie 3b : 3 profils AIPR — le témoin passe de main en main, chaîne de responsabilités ═════════════ */
const PROF: [string, string, string, number][] = [['Concepteur', 'bureau d’études · en amont', 'clipboard', 155.1], ['Encadrant', 'chef de chantier', 'casque', 159.8], ['Opérateur', 'pilote les engins', 'pelle', 162.7]];
const Profils: React.FC = () => {
  const t = useT();
  const bk = PROF.reduce((a, p, k) => (t >= p[3] ? k : a), -1);
  const bx = bk < 0 ? 160 : lerp(bk === 0 ? 160 : 160 + (bk - 1) * 330, 160 + bk * 330, prog(t, PROF[bk][3] - 0.3, PROF[bk][3] + 0.2, easeInOut));
  const chain = prog(t, 168.3, 169.4);
  return (
    <Out end={170.5}>
      <Heads h={[[150.2, ['Trois', 'profils'], [0, 1]], [155.1, ['Le', 'concepteur'], [1]], [159.8, ["L'encadrant"], [0]], [162.7, ["L'opérateur"], [0]], [165.9, ['Avant', 'le moindre', 'coup de pioche'], [2]], [168.3, ['Chaîne', 'de responsabilités'], [0, 1]]]} />
      {PROF.map(([l, sub, ic, at], k) => t > at - 0.05 && (
        <Abs key={l} x={60 + k * 330} y={560} w={300} h={420} style={{...nb(bk === k ? '#EAF2FD' : '#fff', 7), borderColor: AIPR_C, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, transform: `scale(${Math.min(1, spring(t, at))})`}}>
          <div style={{width: 70, height: 70, borderRadius: 35, ...nb(AIPR_C, 4), color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 38, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{k + 1}</div>
          <F n={ic} size={120} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: AIPR_C}}>{l}</div>
          <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 22, color: DIM, textAlign: 'center', padding: '0 12px'}}>{sub}</div>
        </Abs>
      ))}
      {bk >= 0 && <Abs x={bx} y={1000} w={120} h={40} style={{borderRadius: 20, background: `linear-gradient(90deg, ${YEL}, ${ORANGE})`, border: `5px solid ${NBK}`}} />}
      {chain > 0 && <svg width={1080} height={200} style={{position: 'absolute', left: 0, top: 1060}}>{Array.from({length: 9}, (_, k) => k / 9 < chain && <ellipse key={k} cx={130 + k * 102} cy={70} rx={52} ry={30} fill="none" stroke={k % 2 ? '#9AA3B2' : '#5B6472'} strokeWidth={14} />)}</svg>}
      {t > 165.9 && t < 168.3 && <Abs x={60} y={1080} w={960} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={165.9} text="OBLIGATOIRE AVANT DE CREUSER" bg={RED} rot={-2} size={36} /></Abs>}
    </Out>
  );
};

/* ═════════════ Partie 3c : ATEX — l'industrie lourde, gaz / vapeurs / poussières, sites et équipes ═════════════ */
const ChampB: React.FC = () => {
  const t = useT();
  return (
    <Out end={193.2}>
      <Heads h={[[170.5, ['En', 'contraste', 'frappant'], [2]], [174.7, ["L'industrie", 'lourde'], [0, 1]], [178.9, ['Gaz', 'vapeurs', 'poussières'], [0, 1, 2]], [184.2, ['Stockage', 'chimie', 'agroalimentaire'], [0, 1, 2]], [188.3, ['Le', 'personnel'], [1]]]} />
      <Abs x={60} y={450} w={960} h={420} style={{...nb('#FFF4E5', 7), borderColor: ATEX_C, overflow: 'hidden', opacity: pop(t, 170.6)}}>
        <Img src={PH('smi/raffinerie.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85}} />
        <GasCloud w={960} h={420} t={t} dens={1.6 * prog(t, 177.9, 179.5)} />
        {[['GAZ', 178.9], ['VAPEURS', 180.4], ['POUSSIÈRES', 181.7]].map(([l, at], k) => t > (at as number) && <div key={l as string} style={{position: 'absolute', left: 30 + k * 300, top: 300}}><NBadge at={at as number} text={l as string} bg={ATEX_C} rot={(k - 1) * 4} size={32} /></div>)}
        {t > 174.7 && <div style={{position: 'absolute', left: 24, top: 24}}><NBadge at={174.7} text="INDUSTRIE LOURDE" bg={NBK} rot={-3} size={30} /></div>}
      </Abs>
      {[['Sites de stockage', 'colis', 184.2], ['Usines chimiques', 'usine', 185.7], ['Agro-alimentaire', 'epi-ble', 186.8]].map(([l, ic, at], k) => <ICard key={l as string} at={at as number} ic={ic as string} l={l as string} c={ATEX_C} x={60 + k * 325} y={900} w={300} h={130} fs={26} />)}
      {[['Fabrication', 190.1], ['Sécurité', 191.0], ['Maintenance', 191.6]].map(([l, at], k) => t > (at as number) && <Abs key={l as string} x={60 + k * 325} y={1070} w={300} h={90} style={{...nb(ATEX_C, 5), color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontFamily: sansFont, fontWeight: 900, fontSize: 30, transform: `scale(${Math.min(1, spring(t, at as number))})`}}><F n="equipe" size={50} />{l as string}</Abs>)}
    </Out>
  );
};

/* ═════════════ Partie 3d : zones ATEX 0 / 1 / 2 — anneaux autour de la source + jauge de fréquence ═════════════ */
const ZN: [string, string, number, string, number][] = [['Zone 0', 'presque tout le temps', 199.8, RED, 120], ['Zone 1', 'probable en fonctionnement normal', 204.3, ORANGE, 210], ['Zone 2', 'dysfonctionnement · très courte durée', 207.2, YEL, 300]];
const ZonesAtex: React.FC = () => {
  const t = useT();
  const cur = ZN.reduce((a, z, k) => (t >= z[2] ? k : a), -1);
  const CX = 540, CY = 800;
  return (
    <Out end={216.7}>
      <Heads h={[[193.2, ['Découper', 'le danger'], [0]], [197.2, ['Selon', 'la fréquence'], [1]], [199.8, ['Zone', '0'], [0, 1]], [204.3, ['Zone', '1'], [0, 1]], [207.2, ['Zone', '2'], [0, 1]], [211.7, ['Règles', '+', 'formation'], [0, 2]]]} />
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        {[...ZN].reverse().map(([l, , at, c, r]) => { const p = prog(t, at, at + 0.5, easeOut); return p > 0 && <circle key={l} cx={CX} cy={CY} r={r * p} fill={c} fillOpacity={0.28} stroke={c} strokeWidth={8} />; })}
        {cur >= 0 && [0, 0.5].map((o) => { const q = ((t * 0.8 + o) % 1); return <circle key={o} cx={CX} cy={CY} r={ZN[cur][4] + q * 50} fill="none" stroke={ZN[cur][3]} strokeWidth={5 * (1 - q)} opacity={1 - q} />; })}
      </svg>
      <Abs x={CX - 70} y={CY - 70} w={140} h={140} style={{...nb('#fff', 6), borderRadius: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 193.3)}}><F n="usine" size={90} /></Abs>
      {ZN.map(([l, , at, c, r]) => t > at && <Abs key={`l${l}`} x={CX - 80} y={CY - r - 26} w={160} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb(c, 4), color: c === YEL ? NBK : '#fff', padding: '4px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>{l}</div></Abs>)}
      {cur >= 0 && <Abs x={60} y={1150} w={960} h={130} style={{...nb('#fff', 6), borderColor: ZN[cur][3], display: 'flex', alignItems: 'center', gap: 20, padding: '0 24px'}}>
        <div style={{display: 'flex', gap: 6}}>{[0, 1, 2].map((k) => <div key={k} style={{width: 34, height: 70, borderRadius: 6, border: `4px solid ${NBK}`, background: k <= 2 - cur ? ZN[cur][3] : '#fff'}} />)}</div>
        <div key={cur} style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, lineHeight: 1.05, opacity: pop(t, ZN[cur][2] + 0.6)}}>{ZN[cur][1]}</div>
      </Abs>}
      {t > 211.7 && <Abs x={60} y={1300} w={960} style={{display: 'flex', justifyContent: 'center', gap: 16}}><NBadge at={211.7} text="QUELLES RÈGLES" bg={NBK} rot={-2} size={30} /><NBadge at={214.3} text="QUEL NIVEAU DE FORMATION" bg={GREEN} rot={2} size={30} /></Abs>}
    </Out>
  );
};

/* ═════════════ Partie 4a : objectifs AIPR — plan qui se déroule, détecteur qui balaie, coup évité, coordination ═════════════ */
const ObjA: React.FC = () => {
  const t = useT();
  const unroll = prog(t, 227.8, 229.0, easeOut);
  const scan = t > 232.6 && t < 235.9;
  const sx = lerp(80, 880, prog(t, 232.6, 235.6, easeInOut));
  const hit = scan && [300, 640].some((x) => Math.abs(sx - x) < 40);
  const near = t >= 235.9 && t < 239.1;
  const pick = prog(t, 236.3, 237.0, easeIn);
  return (
    <Out end={242.4}>
      <Heads h={[[221.7, ['Très', 'pragmatique'], [1]], [227.8, ['Lire', 'les plans'], [1]], [232.6, ['Repérage', '·', 'localisation'], [0, 2]], [236.3, ['Ne pas', 'percer', 'ne pas sectionner'], [1, 2]], [239.9, ['Communication', '·', 'coordination'], [0, 2]]]} />
      {t > 221.8 && t < 224.5 && <><Abs x={340} y={560} w={400} h={400} style={{...nb('#fff', 7), borderColor: AIPR_C, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, transform: `scale(${Math.min(1, spring(t, 221.8))}) rotate(${Math.sin(t * 3) * 2}deg)`}}><F n="pelle" size={220} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: AIPR_C}}>AIPR</div></Abs>{t > 223.1 && <Stamp at={223.1} text="PRAGMATIQUE" c={AIPR_C} x={260} y={1010} rot={-5} size={60} />}</>}
      {t > 224.5 && t < 227.8 && <ICard at={224.5} ic="balance" l="La réglementation" c={AIPR_C} x={260} y={600} w={560} h={140} />}
      {t >= 227.6 && t < 239.1 && <Abs x={60} y={470} w={960} h={760} style={{...nb('#EAF2FD', 7), borderColor: AIPR_C, overflow: 'hidden', clipPath: `inset(0 ${(1 - unroll) * 100}% 0 0)`}}>
        <svg width={960} height={760}>
          {Array.from({length: 24}, (_, k) => <line key={k} x1={k * 40} y1={0} x2={k * 40} y2={760} stroke="#BFD7EA" strokeWidth={2} />)}
          {Array.from({length: 19}, (_, k) => <line key={`h${k}`} x1={0} y1={k * 40} x2={960} y2={k * 40} stroke="#BFD7EA" strokeWidth={2} />)}
          <path d="M 300 0 L 300 760" stroke="#E8B500" strokeWidth={14} strokeDasharray="30 14" />
          <path d="M 0 420 L 960 420" stroke={BLUE} strokeWidth={12} />
          <path d="M 640 0 L 640 760" stroke={RED} strokeWidth={12} strokeDasharray="8 10" />
          <rect x={700} y={600} width={230} height={130} rx={8} fill="#fff" stroke={NBK} strokeWidth={4} /><text x={815} y={655} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={24} fill={NBK}>PLAN DES</text><text x={815} y={690} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={24} fill={NBK}>RÉSEAUX</text>
          {scan && <g transform={`translate(${sx} 250)`}><rect x={-40} y={-120} width={80} height={60} rx={10} fill={hit ? RED : NAVY} stroke={NBK} strokeWidth={5} /><line x1={0} y1={-60} x2={0} y2={60} stroke={NBK} strokeWidth={8} /><ellipse cx={0} cy={70} rx={60} ry={18} fill="none" stroke={NBK} strokeWidth={6} />{hit && [0, 1, 2].map((k) => <circle key={k} r={30 + k * 26 + (t * 60) % 26} cy={70} fill="none" stroke={RED} strokeWidth={4} opacity={0.6 - k * 0.18} />)}</g>}
          {near && <g transform={`translate(640 ${lerp(60, 300, pick)}) rotate(-20)`}><rect x={-10} y={-200} width={20} height={200} fill="#8A6A4A" stroke={NBK} strokeWidth={5} /><path d="M -90 -210 Q 0 -250 90 -210 L 80 -190 Q 0 -225 -80 -190 Z" fill="#9AA3B2" stroke={NBK} strokeWidth={5} /></g>}
        </svg>
        {near && t > 237.2 && <div style={{position: 'absolute', left: 560, top: 300, width: 160, height: 160, borderRadius: 80, ...nb(GREEN, 6), color: '#fff', fontSize: 100, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1, spring(t, 237.2))})`}}>✋</div>}
        {t > 228.8 && <div style={{position: 'absolute', left: 24, top: 24}}><NBadge at={228.8} text="PLANS DES EXPLOITANTS" bg={AIPR_C} rot={-2} size={28} /></div>}
      </Abs>}
      {t >= 239.1 && <>
        {[0, 1].map((k) => <Abs key={k} x={k ? 680 : 120} y={620} w={280} h={280} style={{...nb('#fff', 6), display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1, spring(t, 239.2 + k * 0.15))})`}}><F n={k ? 'pelle' : 'casque'} size={170} /></Abs>)}
        {[0, 1, 2].map((k) => { const q = ((t - 239.5) * 0.9 + k / 3) % 1; return t > 239.5 && <Abs key={`b${k}`} x={lerp(400, 640, q) - 30} y={700 + Math.sin(q * Math.PI) * -120} w={60} h={60} style={{borderRadius: 30, ...nb(YEL, 3), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, opacity: Math.sin(q * Math.PI)}}>💬</Abs>; })}
        <Abs x={60} y={980} w={960} style={{display: 'flex', justifyContent: 'center', gap: 16}}><NBadge at={239.9} text="COMMUNICATION" bg={AIPR_C} rot={-2} size={32} />{t > 240.7 && <NBadge at={240.7} text="COORDINATION" bg={NAVY} rot={2} size={32} />}</Abs>
      </>}
    </Out>
  );
};

/* ═════════════ Partie 4b : objectifs ATEX — triangle du feu, zones, matériel « Ex » qui confine l'étincelle ═════════════ */
const ObjB: React.FC = () => {
  const t = useT();
  const tri = prog(t, 248.3, 249.6, easeOut);
  const exOn = t >= 253.3 && t < 259.5;
  return (
    <Out end={263.6}>
      <Heads h={[[242.4, ['Physique', '·', 'chimie'], [0, 2]], [246.8, ['Mécanismes', 'de combustion'], [0, 1]], [251.2, ['Identifier', 'les zones'], [1]], [255.2, ['Antidéflagrants'], [0]], [257.3, ['Jamais', "d'étincelles"], [0, 1]], [259.5, ['Sensibilisation', '→', 'urgences'], [0, 2]]]} />
      {t < 253.3 && <>
        <Abs x={60} y={460} w={960} h={180} style={{display: 'flex', justifyContent: 'center', gap: 30, opacity: pop(t, 243.0)}}><div style={{display: 'flex', gap: 30}}>{[['Physique', 'eclair', 244.4], ['Chimie', 'eprouvette', 245.7]].map(([l, ic, at]) => t > (at as number) && <div key={l as string} style={{...nb('#fff', 6), borderColor: ATEX_C, display: 'flex', alignItems: 'center', gap: 14, padding: '18px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: ATEX_C, transform: `scale(${Math.min(1, spring(t, at as number))})`}}><F n={ic as string} size={80} />{l as string}</div>)}</div></Abs>
        {tri > 0 && <svg width={1080} height={700} style={{position: 'absolute', left: 0, top: 660}}>
          <path d="M 540 40 L 880 620 L 200 620 Z" fill="none" stroke={NBK} strokeWidth={14} pathLength={1} strokeDasharray={`${tri} 1`} strokeLinejoin="round" />
          {tri > 0.95 && [0, 1, 2, 3, 4].map((k) => { const h = (150 + Math.sin(t * 10 + k * 1.6) * 30) * (1 - Math.abs(k - 2) * 0.18); const x = 470 + k * 34; return <path key={k} d={`M ${x} 520 Q ${x - 20} ${520 - h * 0.6} ${x + 18} ${520 - h} Q ${x + 52} ${520 - h * 0.6} ${x + 36} 520 Z`} fill={[RED, ORANGE, YEL][k % 3]} stroke={NBK} strokeWidth={2} />; })}
          {[['combustible', 200, 680], ['comburant', 880, 680], ['énergie', 540, 20]].map(([l, x, y]) => <text key={l as string} x={x as number} y={y as number} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={34} fill={ATEX_C} opacity={tri}>{l as string}</text>)}
        </svg>}
      </>}
      {exOn && <Abs x={60} y={460} w={960} h={800} style={{...nb('#fff', 7), borderColor: ATEX_C, overflow: 'hidden', opacity: pop(t, 253.3)}}>
        <GasCloud w={960} h={800} t={t} dens={1.5} />
        <svg width={960} height={800} style={{position: 'absolute', left: 0, top: 0}}>
          <g transform="translate(480 420)">
            <rect x={-130} y={-200} width={260} height={330} rx={30} fill="#5B6472" stroke={NBK} strokeWidth={8} />
            <rect x={-95} y={-160} width={190} height={170} rx={20} fill={t > 255.2 ? '#FFF6C9' : '#C9D2DF'} stroke={NBK} strokeWidth={6} />
            <path d="M 0 60 L 52 90 L 52 150 L 0 180 L -52 150 L -52 90 Z" fill={YEL} stroke={NBK} strokeWidth={6} /><text y={142} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={46} fill={NBK}>Ex</text>
            {t > 257.3 && Array.from({length: 8}, (_, k) => { const a = (k / 8) * Math.PI * 2; const q = ((t - 257.3) * 1.5 + k / 8) % 1; const r = Math.min(80, q * 140); return <circle key={k} cx={Math.cos(a) * r} cy={-75 + Math.sin(a) * r * 0.7} r={7} fill={YEL} opacity={r >= 80 ? 0 : 1 - q} />; })}
            {t > 257.3 && <rect x={-104} y={-168} width={208} height={186} rx={24} fill="none" stroke={GREEN} strokeWidth={8} opacity={0.8} />}
          </g>
        </svg>
        <div style={{position: 'absolute', left: 24, top: 24}}><NBadge at={255.2} text="ÉQUIPEMENT ANTIDÉFLAGRANT" bg={ATEX_C} rot={-2} size={28} /></div>
        {t > 258.5 && <div style={{position: 'absolute', right: 24, bottom: 24}}><NBadge at={258.5} text="AUCUNE ÉTINCELLE NE SORT" bg={GREEN} rot={2} size={28} /></div>}
      </Abs>}
      {t >= 259.5 && <Abs x={60} y={620} w={960} h={420} style={{opacity: pop(t, 259.5)}}>
        <div style={{position: 'absolute', left: 40, right: 40, top: 160, height: 40, borderRadius: 20, background: `linear-gradient(90deg, ${YEL}, ${ORANGE}, ${RED})`, border: `6px solid ${NBK}`}} />
        <div style={{position: 'absolute', left: lerp(40, 860, prog(t, 260.0, 262.0, easeInOut)), top: 130, width: 100, height: 100, borderRadius: 50, ...nb('#fff', 5), display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="casque" size={70} /></div>
        <div style={{position: 'absolute', left: 30, top: 260, fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: '#B88A00'}}>sensibilisation</div>
        <div style={{position: 'absolute', right: 30, top: 260, fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: RED, opacity: pop(t, 261.1)}}>gestion des urgences</div>
      </Abs>}
    </Out>
  );
};

/* ═════════════ Partie 5 : modalités — 7 H / 5 ANS en palettes, réglette élastique ATEX, recyclage ═════════════ */
const Modal: React.FC = () => {
  const t = useT();
  const atex = t >= 278.0;
  const stretch = prog(t, 281.4, 284.6, easeInOut);
  return (
    <Out end={291.7}>
      <Heads h={[[268.4, ['Le', 'point', 'crucial'], [2]], [269.7, ['La', 'logistique'], [1]], [272.7, ["L'AIPR", 'très', 'carré'], [0, 2]], [278.0, ["L'ATEX", 'sur-mesure'], [0, 1]], [287.3, ['Recyclage', 'souple'], [0, 1]]]} />
      {t > 268.4 && t < 272.8 && <>
        <Abs x={60} y={560} w={960} h={300} style={{display: 'flex', justifyContent: 'center', gap: 40}}>{[['calendrier', 268.6], ['chrono', 269.1], ['camion', 269.7]].map(([ic, at]) => t > (at as number) && <div key={ic as string} style={{...nb('#fff', 6), width: 260, height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1, spring(t, at as number))}) translateY(${Math.sin(t * 4 + (at as number)) * 8}px)`}}><F n={ic as string} size={170} /></div>)}</Abs>
        {t > 271.1 && <Abs x={60} y={940} w={960} h={220} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40, opacity: pop(t, 271.1)}}>
          <div style={{...nb(AIPR_C, 6), color: '#fff', padding: '18px 34px', fontFamily: sansFont, fontWeight: 900, fontSize: 64}}>AIPR</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 150, color: RED, transform: `scale(${Math.min(1.15, spring(t, 271.9) * 1.15)}) rotate(${t > 271.9 ? Math.sin(t * 20) * 4 : 0}deg)`, opacity: t > 271.9 ? 1 : 0}}>≠</div>
          <div style={{...nb(ATEX_C, 6), color: '#fff', padding: '18px 34px', fontFamily: sansFont, fontWeight: 900, fontSize: 64}}>ATEX</div>
        </Abs>}
      </>}
      <Abs x={60} y={460} w={960} h={360} style={{...nb('#fff', 7), borderColor: AIPR_C, opacity: pop(t, 272.7) * (atex ? 0.45 : 1), display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 20px'}}>
        <div style={{...nb(AIPR_C, 5), color: '#fff', padding: '10px 20px', fontFamily: sansFont, fontWeight: 900, fontSize: 52, position: 'absolute', left: 24, top: -36}}>AIPR</div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>{t > 274.9 && <Flap text="7 H" at={274.9} size={120} c={AIPR_C} />}<div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM, opacity: pop(t, 275.4)}}>session standard</div></div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>{t > 277.3 && <Flap text="5 ANS" at={277.3} size={120} c={AIPR_C} />}<div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM, opacity: pop(t, 277.7)}}>validité du certificat</div></div>
      </Abs>
      {atex && <Abs x={60} y={880} w={960} h={420} style={{...nb('#FFF4E5', 7), borderColor: ATEX_C, opacity: pop(t, 278.0)}}>
        <div style={{...nb(ATEX_C, 5), color: '#fff', padding: '10px 20px', fontFamily: sansFont, fontWeight: 900, fontSize: 52, position: 'absolute', left: 24, top: -36}}>ATEX</div>
        <div style={{position: 'absolute', right: 30, top: 24}}><NBadge at={279.2} text="SUR-MESURE" bg={NBK} rot={3} size={30} /></div>
        <div style={{position: 'absolute', left: 60, top: 150, height: 60, width: lerp(160, 840, stretch), borderRadius: 14, background: `repeating-linear-gradient(90deg, ${YEL} 0 38px, #E0A100 38px 42px)`, border: `6px solid ${NBK}`, boxSizing: 'border-box'}} />
        <div style={{position: 'absolute', left: 60, top: 240, fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>1 heure<div style={{fontSize: 22, color: DIM}}>intervenant ponctuel</div></div>
        <div style={{position: 'absolute', right: 60, top: 240, textAlign: 'right', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, opacity: cl(stretch * 2 - 1)}}>plusieurs jours<div style={{fontSize: 22, color: DIM}}>expert en maintenance</div></div>
        {t > 287.3 && <div style={{position: 'absolute', left: 340, top: 300, display: 'flex', alignItems: 'center', gap: 14, transform: `scale(${Math.min(1, spring(t, 287.3))})`}}><div style={{fontSize: 70, transform: `rotate(${t * 120}deg)`, color: ATEX_C}}>⟳</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: ATEX_C, lineHeight: 1.1}}>recyclage défini<br />par l'employeur</div></div>}
      </Abs>}
    </Out>
  );
};

/* ═════════════ Partie 6a : conclusion — le bouclier AIPR, l'air qui ne s'embrase pas ═════════════ */
const ConclA: React.FC = () => {
  const t = useT();
  const atex = t >= 308.6;
  return (
    <Out end={314.8}>
      <Heads h={[[298.2, ['Votre', 'bouclier'], [1]], [303.4, ['Protéger', 'les réseaux'], [1]], [306.1, ['Électrocutions', '·', 'fuites'], [0, 2]], [310.7, ["L'air", 'ne doit pas', "s'embraser"], [0, 2]], [312.4, ['Prévenir', 'les explosions'], [1]]]} />
      {!atex && <Abs x={60} y={450} w={960} h={860} style={{...nb('#fff', 7), borderColor: AIPR_C, overflow: 'hidden', opacity: pop(t, 295.6)}}>
        <div style={{position: 'absolute', left: 0, top: 200}}><Ground w={960} h={660} t={t} sky="transparent" /></div>
        <svg width={960} height={860} style={{position: 'absolute', left: 0, top: 0}}><path d={`M 480 ${120} C 700 160 760 200 760 300 C 760 560 600 700 480 760 C 360 700 200 560 200 300 C 200 200 260 160 480 120 Z`} fill={AIPR_C} fillOpacity={0.22 * prog(t, 298.2, 299.2)} stroke={AIPR_C} strokeWidth={14} pathLength={1} strokeDasharray={`${prog(t, 298.2, 299.4)} 1`} /></svg>
        <div style={{position: 'absolute', left: 24, top: 24}}><NBadge at={298.4} text="BOUCLIER DES INFRASTRUCTURES" bg={AIPR_C} rot={-2} size={30} /></div>
        {[['eclair', 306.1, 120], ['goutte', 307.5, 700]].map(([ic, at, x]) => t > (at as number) && <div key={ic as string} style={{position: 'absolute', left: x as number, top: 360, width: 150, height: 150}}><F n={ic as string} size={130} /><div style={{position: 'absolute', left: -6, top: 60, width: 160, height: 14, background: RED, border: `3px solid ${NBK}`, transform: 'rotate(-35deg)'}} /></div>)}
      </Abs>}
      {atex && <Abs x={60} y={450} w={960} h={860} style={{...nb('#FFF4E5', 7), borderColor: ATEX_C, overflow: 'hidden', opacity: pop(t, 308.6)}}>
        <GasCloud w={960} h={860} t={t} dens={2.2} />
        <div style={{position: 'absolute', left: 330, top: 260, width: 300, height: 300}}><F n="feu" size={300} /><div style={{position: 'absolute', inset: -10, borderRadius: '50%', border: `22px solid ${RED}`}} /><div style={{position: 'absolute', left: -20, top: 140, width: 340, height: 22, background: RED, transform: 'rotate(-45deg)'}} /></div>
        {t > 312.4 && <div style={{position: 'absolute', left: 24, bottom: 24}}><NBadge at={312.4} text="EXPLOSIONS PRÉVENUES" bg={GREEN} rot={-2} size={32} /></div>}
      </Abs>}
    </Out>
  );
};

/* ═════════════ Partie 6b : la vraie question — carrefour « terre ou air ? » + des vies sauvées ═════════════ */
const ConclB: React.FC = () => {
  const t = useT();
  const life = t >= 328.2;
  return (
    <Out end={OUTRO_AT}>
      <Heads h={[[316.7, ['La', 'vraie', 'question'], [1, 2]], [318.8, ['Pas', 'cocher', 'la case'], [1, 2]], [323.1, ['La', 'terre', '?'], [1]], [324.9, ["L'air", '?'], [0]], [332.2, ['Sauver', 'des vies'], [0, 1]]]} />
      {!life && <>
        {t > 318.8 && t < 322.5 && <Abs x={260} y={560} w={560} h={160} style={{...nb('#fff', 6), display: 'flex', alignItems: 'center', gap: 20, padding: '0 24px', opacity: pop(t, 318.8)}}><div style={{width: 80, height: 80, border: `6px solid ${NBK}`, borderRadius: 12, fontSize: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GREEN}}>{t > 319.6 ? '✓' : ''}</div><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38}}>réglementation</span><div style={{position: 'absolute', left: 20, right: 20, top: 74, height: 10, background: RED, transform: `scaleX(${prog(t, 320.8, 321.3)})`, transformOrigin: '0 50%'}} /></Abs>}
        {t > 320.8 && t < 322.5 && <Abs x={290} y={800} w={500} h={460} style={{...nb('#fff', 7), borderColor: GREEN, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: pop(t, 320.8), transform: `scale(${Math.min(1, spring(t, 320.8))})`}}><div style={{transform: `scale(${1 + 0.12 * Math.sin((t - 320.8) * 5)})`}}><F n="loupe" size={230} /></div><NBadge at={321.3} text="SON ACTIVITÉ EN FACE" bg={GREEN} rot={-3} size={30} /></Abs>}
        {t >= 322.5 && <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
          <rect x={526} y={520} width={28} height={800} fill="#7A5A3A" stroke={NBK} strokeWidth={5} />
          <g opacity={pop(t, 323.1)} transform={`translate(${(1 - Math.min(1, spring(t, 323.1))) * -200} 0)`}><path d="M 540 900 L 160 900 L 110 960 L 160 1020 L 540 1020 Z" fill={AIPR_C} stroke={NBK} strokeWidth={7} /><text x={330} y={975} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={44} fill="#fff">TERRE → AIPR</text></g>
          <g opacity={pop(t, 324.9)} transform={`translate(${(1 - Math.min(1, spring(t, 324.9))) * 200} 0)`}><path d="M 540 640 L 920 640 L 970 700 L 920 760 L 540 760 Z" fill={ATEX_C} stroke={NBK} strokeWidth={7} /><text x={750} y={715} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={44} fill="#fff">AIR → ATEX</text></g>
        </svg>}
        {t >= 323.1 && <Abs x={60} y={1080} w={460} style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: AIPR_C, opacity: pop(t, 323.3)}}>Je retourne la terre près d'un câble ?</Abs>}
        {t >= 324.9 && <Abs x={560} y={470} w={460} style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: ATEX_C, textAlign: 'right', opacity: pop(t, 325.1)}}>L'air peut-il s'enflammer ?</Abs>}
      </>}
      {life && <>
        <svg width={1080} height={400} style={{position: 'absolute', left: 0, top: 560}}>
          <polyline points={Array.from({length: 120}, (_, k) => { const x = k * 9; const ph = (((x / 9 - (t - 328.2) * 40) % 60) + 60) % 60; const y = 200 + (ph > 20 && ph < 24 ? -150 : ph > 24 && ph < 27 ? 90 : 0); return `${x},${y}`; }).join(' ')} fill="none" stroke={GREEN} strokeWidth={10} strokeLinejoin="round" />
        </svg>
        <Abs x={390} y={900} w={300} h={300} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + 0.08 * Math.max(0, Math.sin(t * 7))})`}}><F n="coeur" size={260} /></Abs>
        {t > 331.1 && <Abs x={60} y={1230} w={960} style={{display: 'flex', justifyContent: 'center', gap: 16}}><NBadge at={331.1} text="RESPECTER LA LOI" bg={NBK} rot={-2} size={30} />{t > 332.2 && <NBadge at={332.2} text="SAUVER DES VIES" bg={GREEN} rot={2} size={34} />}</Abs>}
      </>}
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
  ...SECTORS.map(([, , at]) => ({at, s: 'sfx/whoosh', v: 0.3})), {at: 7.7, s: 'tampon', v: 0.45},
  ...searchCues(9.1, 9, 9.9, 10.2), ...[11.0, 11.6, 12.2, 12.8, 13.4, 14.0].map((at) => ({at, s: 'sfx/swish', v: 0.28})), {at: 14.9, s: 'sfx/rise', v: 0.3, dur: 0.5}, {at: 15.2, s: 'validation', v: 0.35}, {at: 16.5, s: 'sfx/pop', v: 0.3},
  ...rep(22.3, 6, 0.28, 'sfx/thud', 0.18), {at: 23.8, s: 'deep-hit', v: 0.35}, ...[25.8, 27.5, 28.9].map((at) => ({at, s: 'sfx/pop', v: 0.3})), ...rep(30.5, 3, 0.12, 'sfx/ding', 0.2),
  {at: 34.5, s: 'sfx/pop', v: 0.3}, {at: 35.3, s: 'sfx/pop', v: 0.3}, {at: 38.2, s: 'bass-hit', v: 0.5}, {at: 42.0, s: 'deep-hit', v: 0.55}, {at: 42.05, s: 'sfx/thud', v: 0.5}, {at: 43.3, s: 'tampon', v: 0.35},
  {at: 47.6, s: 'sfx/rise', v: 0.25, dur: 9}, ...ROUTE.map(([, , at]) => ({at, s: 'sfx/bell', v: 0.3})), {at: 58.5, s: 'tampon', v: 0.35},
  ...rep(65.3, 4, 0.07, 'sfx/thud', 0.25), {at: 69.6, s: 'sfx/pop', v: 0.25}, {at: 73.3, s: 'soft-whoosh', v: 0.35, dur: 1}, {at: 76.0, s: 'tampon', v: 0.3}, {at: 76.8, s: 'tampon', v: 0.3},
  ...rep(78.2, 4, 0.07, 'sfx/thud', 0.25), {at: 81.4, s: 'riser', v: 0.25, dur: 1.5}, {at: 85.9, s: 'sfx/whoosh', v: 0.35}, {at: 91.0, s: 'sfx/rise', v: 0.3, dur: 0.8},
  ...YEARS.flatMap(([, at]) => [...rep(at - 0.6, 8, 0.07, 'tick', 0.2), {at, s: 'sfx/thud', v: 0.35}] as Sfx[]), {at: 117.6, s: 'sfx/whoosh', v: 0.3}, {at: 118.3, s: 'tampon', v: 0.45}, {at: 121.6, s: 'deep-hit', v: 0.5}, {at: 121.65, s: 'alarme', v: 0.18, dur: 0.8},
  ...[131.7, 132.7, 133.4, 137.7, 138.7, 139.6].map((at) => ({at, s: 'sfx/pop', v: 0.26})), {at: 140.9, s: 'tampon', v: 0.45}, {at: 142.3, s: 'sfx/whoosh', v: 0.3},
  ...PROF.flatMap(([, , , at]) => [{at: at - 0.3, s: 'soft-whoosh', v: 0.28, dur: 0.5}, {at, s: 'sfx/pop', v: 0.3}] as Sfx[]), {at: 165.9, s: 'tampon', v: 0.35}, ...rep(168.3, 9, 0.12, 'sfx/click', 0.18),
  {at: 174.7, s: 'tampon', v: 0.3}, ...[178.9, 180.4, 181.7, 184.2, 185.7, 186.8, 190.1, 191.0, 191.6].map((at) => ({at, s: 'sfx/pop', v: 0.24})),
  ...ZN.map(([, , at]) => ({at, s: 'deep-hit', v: 0.35})), {at: 211.7, s: 'tampon', v: 0.3}, {at: 214.3, s: 'tampon', v: 0.3},
  {at: 227.8, s: 'page', v: 0.4}, ...rep(232.8, 10, 0.3, 'tick', 0.12), {at: 236.9, s: 'sfx/thud', v: 0.4}, {at: 237.2, s: 'validation', v: 0.3}, ...rep(239.5, 4, 0.33, 'notification', 0.18),
  {at: 244.4, s: 'sfx/pop', v: 0.3}, {at: 245.7, s: 'sfx/pop', v: 0.3}, {at: 248.3, s: 'stylo', v: 0.3, dur: 1.2}, {at: 249.6, s: 'sfx/whoosh', v: 0.35}, {at: 253.3, s: 'sfx/whoosh', v: 0.3}, {at: 255.2, s: 'sfx/click', v: 0.4}, ...rep(257.3, 6, 0.2, 'sfx/ding', 0.12), {at: 258.5, s: 'validation', v: 0.3}, {at: 259.5, s: 'sfx/rise', v: 0.25, dur: 2.5},
  {at: 272.7, s: 'sfx/pop', v: 0.3}, {at: 278.0, s: 'sfx/whoosh', v: 0.3}, {at: 279.2, s: 'tampon', v: 0.3}, {at: 281.4, s: 'sfx/rise', v: 0.25, dur: 3.2}, {at: 287.3, s: 'soft-whoosh', v: 0.3, dur: 1},
  {at: 298.2, s: 'stylo', v: 0.3, dur: 1.2}, {at: 299.4, s: 'validation', v: 0.3}, {at: 306.1, s: 'sfx/thud', v: 0.3}, {at: 307.5, s: 'sfx/thud', v: 0.3}, {at: 308.6, s: 'sfx/whoosh', v: 0.35}, {at: 312.4, s: 'validation', v: 0.3},
  {at: 320.8, s: 'stylo', v: 0.25, dur: 0.6}, {at: 323.1, s: 'sfx/swish', v: 0.35}, {at: 324.9, s: 'sfx/swish', v: 0.35}, {at: 328.2, s: 'sfx/rise', v: 0.25, dur: 1}, ...rep(328.6, 6, 0.9, 'sfx/thud', 0.15), {at: 332.2, s: 'tampon', v: 0.45},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SCN: [React.FC, number, number][] = [[Hook, 2.5, 9.1], [Confusion, 9.0, 21.9], [CasseTete, 21.8, 33.1], [RienAVoir, 33.0, 46.1], [Route, 46.0, 60.45], [ZonesA, 63.9, 78.1], [ZonesB, 78.0, 92.45], [Regle, 95.9, 123.35], [ChampA, 126.8, 150.25], [Profils, 150.15, 170.55], [ChampB, 170.45, 193.25], [ZonesAtex, 193.15, 216.75], [ObjA, 220.0, 242.45], [ObjB, 242.35, 263.65], [Modal, 267.1, 291.75], [ConclA, 295.2, 314.85], [ConclB, 314.75, OUTRO_AT]];
export const AiprAtexMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    {SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    {[170.5, 242.4, 278.0, 308.6].map((a) => <Gate key={a} from={a} to={a + 0.9}><GyroFlash at={a} /></Gate>)}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-aipr-atex-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn, Barred, Flap];
