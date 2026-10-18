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
 * « Enquête d'accident : le formulaire basé sur la méthode Ishikawa » (5 min 58) — capsule « condensé + effet wahou +
 * ultra premium » : voix d'origine (sans musique de fond), sous-titres calés mot à mot, photos réelles, thème « papier
 * quadrillé ».
 * Fil rouge : LE TUBE PNEUMATIQUE À SIX GUICHETS (faits → objectivité → 5M → cause racine → actions → collectif), adaptés
 * aux parties réellement présentes ; la capsule du dossier file d'un guichet à l'autre, chaque guichet passé se coche.
 * Transition : LE GYROPHARE à chaque partie ; dans les scènes : capsule pneumatique, loupe, store vénitien.
 * Ultra premium : fil emmêlé de la panique, paperasse qui se range en dossier, boussole, fiche des faits qui se remplit,
 * chrono, loupe de l'enquêteur, plaque de la règle d'or, opinion contre fait avec règle graduée, château de cartes,
 * arête de poisson qui se dessine, tour des 5M en store vénitien, anneau 360°, effet ≠ blessure, racines et entonnoir,
 * test mental « si j'enlève cette cause », écran partagé immédiat / permanent, pansement qui se pétrifie, carte d'action,
 * signatures tracées à la plume, rapports aspirés dans une base de données, barre de recherche qui trouve puis OUVRE la
 * tendance, bouclier brisé qui se reforme, volant des humains, œil qui s'ouvre.
 */
/** Images : emplacements prévus pour les visuels générés (ChatGPT) — en attendant, photos de la bibliothèque. */
const IMG = {
  cover: 'iso26/rapport-audit.jpg',
  panique: 'promo/hse-machine.jpg',
  faits: 'promo/terrain-controle.jpg',
  flaque: 'ident/flaque.jpg',
  equipe5m: 'promo/audit-reunion.jpg',
  matiere: '',
  materiel: 'ident/machine.jpg',
  methode: 'iso26/audit-checklist.jpg',
  mainoeuvre: 'promo/formation-consignation.jpg',
  milieu: 'ident/glissade.jpg',
  immediat: 'risquebrut/danger-immediat.jpg',
  permanent: 'risquebrut/etat-conforme.jpg',
  signatures: 'iso26/direction-equipe.jpg',
  dos: 'ident/caisses.jpg',
  final: 'personnages/equipe.jpg',
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
const OUTRO_AT = 355.8;
export const ENQUETE_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 43.6, n: '1', title: 'Recueillir les faits', s: 'poser les fondations', c: NAVY, g: 'faits', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 80.6, n: '2', title: 'L’effet anormal', s: 'la règle d’or de l’objectivité', c: BLUE, g: 'objectivité', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 115.5, n: '3', title: 'Analyser avec les 5M', s: 'le diagramme d’Ishikawa', c: VIO, g: '5M', k: 'gyro', lab: 'PARTIE 3 / 6'},
  {at: 198.1, n: '4', title: 'La cause principale', s: 'à la recherche de la racine', c: ORANGE, g: 'cause racine', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 230.0, n: '5', title: 'Les actions correctives', s: 'sécuriser l’avenir', c: RED, g: 'actions', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 282.2, n: '6', title: 'Signer et capitaliser', s: 'la force du collectif', c: GREEN, g: 'collectif', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 354.5;

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


/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH(IMG.cover)} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 900, objectFit: 'cover', objectPosition: '50% 45%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 32%, ${PAPER}DD 42%, ${PAPER} 47%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={700} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>ACCIDENT · INCIDENT</div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 88, color: INK, marginTop: 10}}>l’</div>
        <div style={{display: 'flex', justifyContent: 'center', gap: 10}}>{'ENQUÊTE'.split('').map((c, i) => <Tile key={i} ch={c} size={124} c={NAVY} />)}</div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 80, color: RED, marginTop: 14}}>méthode Ishikawa</div>
      </Abs>
      <Abs x={60} y={1400} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Briques communes ═════════════ */
/** Image provisoire ou générée ; si le chemin est vide, on montre l'icône. */
const Pic: React.FC<{src: string; ic: string; w: number; h: number; zoom?: number; pos?: string}> = ({src, ic, w, h, zoom = 1, pos = 'center'}) => (src ? <Img src={PH(src)} style={{width: w, height: h, objectFit: 'cover', objectPosition: pos, transform: `scale(${zoom})`, display: 'block'}} /> : <div style={{width: w, height: h, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F4F6FA'}}><F n={ic} size={Math.min(w, h) * 0.55} /></div>);
/** Capsule pneumatique qui file dans un tube. */
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
/** Loupe qui balaie une zone. */
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

/* ═════════════ INTRO ═════════════ */
const PLAN = [{n: 1, l: 'Recueillir les faits initiaux', a: 35.18, c: NAVY}, {n: 2, l: 'Identifier l’effet anormal', a: 36.58, c: BLUE}, {n: 3, l: 'Analyser avec les 5M', a: 37.94, c: VIO}, {n: 4, l: 'Déterminer la cause principale', a: 39.6, c: ORANGE}, {n: 5, l: 'Déployer les actions correctives', a: 42.02, c: RED}];
const Intro: React.FC = () => {
  const t = useT();
  const ph = t < 10.7 ? 0 : t < 22.1 ? 1 : t < 30.4 ? 2 : 3;
  const order = prog(t, 15.34, 16.6, easeInOut);
  const pulse = Math.abs(Math.sin(t * 7));
  return (
    <Out end={43.6}>
      {ph === 0 && (
        <>
          <HiLine words={['C’est', 'la', 'panique']} mark={[2]} at={2.8} y={330} size={68} />
          <Deep src={IMG.panique} x={60} y={440} w={960} h={520} at={2.8} pos="50% 40%">
            <div style={{position: 'absolute', inset: 0, background: `rgba(224,74,63,${0.12 + 0.22 * pulse})`, mixBlendMode: 'multiply'}} />
            <div style={{position: 'absolute', left: 24, top: 24}}><Pill at={3.9} c={RED} size={28}>accident · incident</Pill></div>
          </Deep>
          {[{l: 'l’urgence', a: 7.46, x: 80, y: 1010, r: -6}, {l: 'le stress', a: 8.14, x: 400, y: 1050, r: 4}, {l: 'l’émotion', a: 8.78, x: 700, y: 1000, r: -3}].map((w) => (
            <div key={w.l} style={{position: 'absolute', left: w.x + Math.sin(t * 23 + w.x) * 4, top: w.y + Math.cos(t * 19 + w.y) * 4, transform: `rotate(${w.r}deg) scale(${pop(t, w.a)})`, padding: '12px 24px', background: INK, color: '#fff', borderRadius: 14, fontFamily: sansFont, fontWeight: 900, fontSize: 40, boxShadow: `6px 6px 0 ${RED}`}}>{w.l}</div>
          ))}
          <Abs x={60} y={1150} w={960} h={240} style={{opacity: pop(t, 9.46)}}>
            <svg width={960} height={240}>
              <path d="M20 120 C 120 20, 160 220, 260 110 S 360 10, 330 150 S 470 230, 520 90 S 640 30, 600 170 S 760 210, 800 80 S 900 60, 940 130" fill="none" stroke={DIM} strokeWidth={8} strokeLinecap="round" strokeDasharray={2600} strokeDashoffset={2600 * (1 - prog(t, 9.46, 10.6))} />
            </svg>
            <div style={{position: 'absolute', right: 10, bottom: 0}}><Pill at={10.0} c={DIM} size={26}>on perd vite le fil</Pill></div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={order < 1 ? ['De', 'la', 'pagaille…'] : ['…à', 'l’enquête', 'structurée']} mark={order < 1 ? [2] : [1, 2]} at={order < 1 ? 10.8 : 16.6} y={330} size={64} />
          <Abs x={60} y={440} w={960} h={760}>
            {Array.from({length: 10}, (_, k) => {
              const cx = random(`px${k}`) * 700 + Math.sin(t * 2 + k) * 40;
              const cy = random(`py${k}`) * 500 + Math.cos(t * 1.6 + k) * 30;
              return <div key={k} style={{position: 'absolute', left: lerp(cx, 330 + k * 3, order), top: lerp(cy, 210 - k * 4, order), width: 240, height: 300, background: '#fff', border: `4px solid ${INK}`, borderRadius: 10, transform: `rotate(${(1 - order) * (random(`pr${k}`) - 0.5) * 90}deg)`, opacity: pop(t, 10.9 + k * 0.08), boxShadow: '4px 4px 0 #0002', padding: 18, boxSizing: 'border-box'}}>{Array.from({length: 6}, (_, j) => <div key={j} style={{height: 10, background: '#E3E8EF', borderRadius: 5, marginTop: 12, width: `${90 - ((j * 13 + k * 7) % 40)}%`}} />)}</div>;
            })}
            {order >= 1 && (
              <div style={{position: 'absolute', left: 290, top: 140, width: 380, height: 440, borderRadius: 18, background: `linear-gradient(160deg, ${NAVY}, #1B3F7E)`, border: `6px solid ${INK}`, boxShadow: `10px 10px 0 ${GOLD}`, transform: `scale(${Math.min(1, spring(t, 16.6, 8, 12))})`, overflow: 'hidden'}}>
                <div style={{position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: '#fff', letterSpacing: 4}}>ENQUÊTE</div>
                <div style={{position: 'absolute', left: 0, right: 0, top: 200, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 24, color: GOLD}}>carrée · structurée</div>
                <div style={{position: 'absolute', left: 140, top: 270}}><F n="loupe" size={100} /></div>
                <Shine at={16.9} every={2.2} />
              </div>
            )}
          </Abs>
          <Abs x={0} y={1260} w={1080} style={{textAlign: 'center'}}><Pill at={19.62} c={NAVY} size={30}>un outil incontournable pour les pros</Pill></Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Le', 'formulaire', 'd’enquête']} mark={[1, 2]} at={22.2} y={330} size={64} />
          <Win x={60} y={440} w={960} h={520} at={22.2} title="formulaire d’enquête · méthode Ishikawa" c={NAVY}>
            <svg width={950} height={460} style={{position: 'absolute', left: 0, top: 0}}>
              <line x1={80} y1={230} x2={80 + 680 * prog(t, 23.0, 24.0)} y2={230} stroke={INK} strokeWidth={10} strokeLinecap="round" />
              {[0, 1, 2].map((k) => <line key={`u${k}`} x1={170 + k * 200} y1={70} x2={230 + k * 200} y2={230} stroke={VIO} strokeWidth={8} strokeLinecap="round" opacity={prog(t, 24.0 + k * 0.15, 24.3 + k * 0.15)} />)}
              {[0, 1].map((k) => <line key={`d${k}`} x1={270 + k * 200} y1={390} x2={330 + k * 200} y2={230} stroke={VIO} strokeWidth={8} strokeLinecap="round" opacity={prog(t, 24.45 + k * 0.15, 24.75 + k * 0.15)} />)}
              <rect x={770} y={180} width={150} height={100} rx={16} fill={RED} stroke={INK} strokeWidth={6} opacity={prog(t, 24.5, 24.8)} />
              <text x={845} y={242} textAnchor="middle" fontFamily="sans-serif" fontWeight={900} fontSize={30} fill="#fff" opacity={prog(t, 24.5, 24.8)}>EFFET</text>
            </svg>
          </Win>
          <Abs x={60} y={1000} w={460} h={380} style={{background: '#F1F1EC', border: `5px solid ${INK}`, borderRadius: 24, opacity: pop(t, 26.34)}}>
            <div style={{textAlign: 'center', paddingTop: 40}}><F n="classeur" size={150} /></div>
            <div style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: DIM, position: 'relative', display: 'block'}}><span style={{position: 'relative'}}>de la paperasse<Strike p={prog(t, 26.9, 27.3)} c={RED} /></span></div>
          </Abs>
          <GlassCard x={560} y={1000} w={460} h={380} at={27.5} c={GOLD}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 34, gap: 8}}>
              <div style={{transform: `rotate(${120 * Math.exp(-(t - 27.5) * 1.6) * Math.cos((t - 27.5) * 8)}deg)`}}><F n="boussole" size={170} /></div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>une boussole</div>
              <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: BURG, opacity: pop(t, 28.66)}}>comprendre · corriger les failles</div>
            </div>
          </GlassCard>
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={['Le', 'plan', 'en', '5', 'étapes']} mark={[1, 3, 4]} at={30.6} y={330} size={64} />
          {PLAN.map((x, k) => (
            <GlassCard key={x.n} x={60} y={440 + k * 188} w={960} h={165} at={x.a} c={x.c}>
              <div style={{display: 'flex', alignItems: 'center', gap: 30, height: '100%', padding: '0 30px'}}>
                <Num n={x.n} c={x.c} size={110} />
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK}}>{x.l}</div>
              </div>
            </GlassCard>
          ))}
          {t < 35.1 && <Abs x={0} y={700} w={1080} style={{textAlign: 'center'}}><Pill at={32.78} c={INK} size={34}>plan d’action</Pill></Abs>}
        </>
      )}
    </Out>
  );
};

/* ═════════════ 1 · RECUEILLIR LES FAITS ═════════════ */
const FIELDS = [{k: 'QUI ?', l: 'nom · poste', a: 59.1, c: NAVY, ic: 'carte-id'}, {k: 'QUAND · OÙ ?', l: 'date · heure · lieu exact', a: 63.3, c: BLUE, ic: 'calendrier'}, {k: 'QUOI ?', l: 'description factuelle', a: 66.34, c: VIO, ic: 'ecrit'}, {k: 'TÉMOINS', l: 'témoins · secouristes sur place', a: 72.82, c: ORANGE, ic: 'equipe'}];
const Faits: React.FC = () => {
  const t = useT();
  const ph = t < 56.0 ? 0 : t < 74.75 ? 1 : 2;
  const blur = prog(t, 53.42, 55.0);
  return (
    <Out end={80.6}>
      {ph === 0 && (
        <>
          <HiLine words={['Le', 'plus', 'vite', 'possible']} mark={[1, 2, 3]} at={46.9} y={330} size={66} />
          <GlassCard x={60} y={440} w={960} h={420} at={46.9} c={NAVY}>
            <div style={{position: 'absolute', left: 40, top: 40, width: 330, height: 330, borderRadius: '50%', background: '#fff', border: `8px solid ${INK}`, boxShadow: `0 0 30px ${RED}55`}}>
              <div style={{position: 'absolute', left: 157, top: 30, width: 16, height: 140, background: RED, borderRadius: 8, transformOrigin: '50% 100%', transform: `rotate(${(t - 46.9) * 160}deg)`}} />
              <div style={{position: 'absolute', left: 145, top: 145, width: 40, height: 40, borderRadius: 20, background: INK}} />
              <svg width={330} height={330} style={{position: 'absolute', left: -8, top: -8}}><circle cx={165} cy={165} r={150} fill="none" stroke={RED} strokeWidth={14} strokeDasharray={942} strokeDashoffset={942 * prog(t, 47.0, 56.0)} transform="rotate(-90 165 165)" /></svg>
            </div>
            <div style={{position: 'absolute', left: 420, top: 70}}>
              <Mono at={47.2} c={DIM} size={24}>étape 1</Mono>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: NAVY, lineHeight: 1.05}}>poser les<br />fondations</div>
              <div style={{marginTop: 16}}><Pill at={50.42} c={RED} size={30}>juste après l’événement</Pill></div>
            </div>
          </GlassCard>
          <Abs x={60} y={900} w={460} h={480} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `7px 7px 0 ${VIO}`, opacity: pop(t, 52.74)}}>
            <div style={{textAlign: 'center', paddingTop: 50, filter: `blur(${blur * 6}px)`, opacity: 1 - blur * 0.5}}><F n="cerveau" size={190} /></div>
            <div style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: VIO, marginTop: 20}}>la mémoire joue des tours</div>
          </Abs>
          <Abs x={560} y={900} w={460} h={480} style={{border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `7px 7px 0 ${RED}`, overflow: 'hidden', opacity: pop(t, 54.5)}}>
            <div style={{filter: `hue-rotate(${prog(t, 55.0, 56.0) * 90}deg) blur(${prog(t, 55.0, 56.0) * 3}px)`}}><Pic src={IMG.faits} ic="chantier" w={460} h={480} zoom={1 + 0.15 * prog(t, 54.5, 56)} /></div>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center'}}><Pill at={55.0} c={RED} size={26}>la scène se modifie</Pill></div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['4', 'infos', 'à', 'verrouiller']} mark={[0, 1, 3]} at={56.1} y={330} size={64} />
          <Win x={60} y={440} w={960} h={760} at={56.1} title="fiche · faits initiaux" c={NAVY}>
            <div style={{padding: '26px 30px', display: 'flex', flexDirection: 'column', gap: 18}}>
              {FIELDS.map((f) => {
                const typed = prog(t, f.a, f.a + 0.8);
                return (
                  <div key={f.k} style={{display: 'flex', alignItems: 'center', gap: 22, height: 150, border: `4px solid ${t >= f.a ? f.c : '#D9DEE6'}`, borderRadius: 20, padding: '0 22px', background: t >= f.a ? `${f.c}10` : '#fff', opacity: t >= f.a - 0.5 ? 1 : 0.45}}>
                    <F n={f.ic} size={90} />
                    <div style={{flex: 1}}>
                      <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: f.c}}>{f.k}</div>
                      <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK}}>{f.l.slice(0, Math.floor(typed * f.l.length))}</div>
                    </div>
                    <div style={{width: 60, height: 60, borderRadius: 14, background: typed >= 1 ? GREEN : '#E3E8EF', color: '#fff', fontWeight: 900, fontSize: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${typed >= 1 ? 1 + 0.2 * Math.max(0, 1 - (t - f.a - 0.8) * 4) : 1})`}}>{typed >= 1 ? '✓' : ''}</div>
                  </div>
                );
              })}
            </div>
          </Win>
          {t > 69.7 && <Abs x={0} y={1240} w={1080} style={{textAlign: 'center'}}><Pill at={69.7} c={ORANGE} size={28}>ce qu’on oublie trop souvent !</Pill></Abs>}
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Ramener', 'de', 'l’ordre']} mark={[0, 2]} at={74.9} y={330} size={66} />
          {t > 74.9 && <Blinds src={IMG.faits} x={60} y={440} w={960} h={520} at={74.9} pos="50% 40%" />}
          <PneuDeliver x={60} y={958} w={960} at={75.5} c={NAVY} />
          {FIELDS.map((f, k) => <div key={f.k} style={{position: 'absolute', left: 60 + k * 245, top: 1030, width: 220, height: 220, borderRadius: 22, background: '#fff', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${f.c}`, opacity: pop(t, 76.0 + k * 0.2), transform: `translateY(${(1 - pop(t, 76.0 + k * 0.2)) * 80}px)`}}><IcoLab ic={f.ic} l={f.k} size={90} fs={24} c={f.c} /></div>)}
          <Abs x={0} y={1280} w={1080} style={{textAlign: 'center'}}><Pill at={78.58} c={NAVY} size={30}>la base de tout notre travail</Pill></Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 2 · L'EFFET ANORMAL / OBJECTIVITÉ ═════════════ */
const Objectivite: React.FC = () => {
  const t = useT();
  const ph = t < 98.0 ? 0 : t < 105.3 ? 1 : 2;
  const ruler = prog(t, 102.3, 103.6, easeOut);
  const fall = prog(t, 110.3, 111.4, easeIn);
  return (
    <Out end={115.5}>
      {ph === 0 && (
        <>
          <HiLine words={['La', 'règle', 'd’or']} mark={[1, 2]} at={84.0} y={330} size={68} />
          <Abs x={60} y={440} w={960} h={420} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 30, boxShadow: `10px 10px 0 ${BLUE}`, overflow: 'hidden', opacity: pop(t, 84.0)}}>
            <div style={{position: 'absolute', left: 40, top: 40, fontFamily: MONO, fontWeight: 700, fontSize: 26, color: '#9AA7BC'}}>un fait ne laisse</div>
            <div style={{position: 'absolute', left: 40, top: 90, fontFamily: sansFont, fontWeight: 900, fontSize: 62, color: '#fff', lineHeight: 1.1, width: 860}}>aucune place à <span style={{color: YEL}}>l’interprétation</span></div>
            <LoupeSweep x0={-40} y0={200} x1={620} y1={130} a={84.46} b={86.4} size={220} />
          </Abs>
          <Abs x={60} y={900} w={960} h={480} style={{borderRadius: 30, background: 'linear-gradient(135deg, #FFF6D6, #F3D36B 50%, #FFF6D6)', border: `6px solid ${INK}`, boxShadow: `10px 10px 0 ${GOLD}`, overflow: 'hidden', opacity: pop(t, 87.78)}}>
            <Shine at={88.0} every={3} />
            <div style={{position: 'absolute', left: 0, right: 0, top: 26, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 26, color: BURG, letterSpacing: 3}}>RÈGLE D’OR DE L’ENQUÊTEUR</div>
            <div style={{position: 'absolute', left: 60, top: 100, display: 'flex', flexDirection: 'column', gap: 22}}>
              {[{l: 'incontestable', a: 93.22}, {l: 'mesurable', a: 94.86}, {l: 'vérifiable', a: 95.6}].map((x) => <Check key={x.l} at={x.a} label={x.l} c={GREEN} size={40} />)}
            </div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Opinion', 'ou', 'fait', '?']} mark={[0, 2]} at={98.1} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={330} style={{opacity: pop(t, 98.3)}}>
            <div style={{position: 'absolute', inset: 0, borderRadius: 160, background: '#EEF1F5', border: `5px dashed ${DIM}`, display: 'flex', alignItems: 'center', gap: 20, padding: '0 50px', filter: `blur(${1 + Math.sin(t * 3)}px)`}}>
              <F n="pensif" size={140} />
              <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 52, color: DIM}}>« je sais pas, le sol était glissant »</div>
            </div>
          </Abs>
          <Stamp at={100.1} c={RED} text="opinion" x={620} y={700} rot={-8} size={60} />
          <Abs x={60} y={820} w={960} h={560} style={{border: `6px solid ${INK}`, borderRadius: 30, overflow: 'hidden', boxShadow: `10px 10px 0 ${GREEN}`, opacity: pop(t, 101.26)}}>
            <Pic src={IMG.flaque} ic="goutte" w={960} h={560} zoom={1.1 - 0.08 * prog(t, 101.3, 105.3)} />
            <div style={{position: 'absolute', left: 120, bottom: 70, width: 720 * ruler, height: 60, background: YEL, border: `4px solid ${INK}`, borderRadius: 8, backgroundImage: `repeating-linear-gradient(90deg, ${INK} 0 3px, transparent 3px 24px)`, overflow: 'hidden'}} />
            <div style={{position: 'absolute', left: 0, right: 0, top: 30, textAlign: 'center'}}>{t > 102.3 && <span style={{display: 'inline-block', background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 54, padding: '6px 24px', borderRadius: 14}}>flaque d’huile : <Count n={30} a={102.3} b={103.6} /> cm</span>}</div>
          </Abs>
          <Stamp at={104.46} c={GREEN} text="un fait" x={640} y={1250} rot={-6} size={60} />
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Bâtir', 'sur', 'des', 'impressions', '?']} mark={[3]} at={105.4} y={330} size={58} />
          <Abs x={160} y={440} w={760} h={560}>
            {[[0, 0], [1, 0], [2, 0], [3, 0], [0.5, 1], [1.5, 1], [2.5, 1], [1, 2], [2, 2], [1.5, 3]].map(([c, r], k) => {
              const d = random(`hc${k}`);
              return <div key={k} style={{position: 'absolute', left: 60 + c * 150 + fall * (d - 0.5) * 500, top: 400 - r * 130 + fall * (300 + d * 300), width: 120, height: 160, background: '#fff', border: `4px solid ${INK}`, borderRadius: 10, transform: `rotate(${(k % 2 ? 12 : -12) + fall * (d - 0.5) * 400}deg)`, opacity: pop(t, 106.0 + k * 0.12) * (1 - prog(t, 111.6, 112.0)), boxShadow: '3px 3px 0 #0002', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: handFont, fontSize: 30, color: DIM}}>?</div>;
            })}
          </Abs>
          {t > 110.3 && <Abs x={0} y={720} w={1080} style={{textAlign: 'center'}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: RED, display: 'inline-block', transform: `scale(${pop(t, 110.3)})`}}>tout faux</span></Abs>}
          <Card x={60} y={1050} w={460} h={330} at={111.66} c={RED}><IcoLab ic="juge" l="blâmer les mauvaises personnes" size={110} fs={30} c={RED} /></Card>
          <Card x={560} y={1050} w={460} h={330} at={113.54} c={RED}><IcoLab ic="cible" l="rater le vrai problème" size={110} fs={30} c={RED} /></Card>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 3 · LES 5M / ISHIKAWA ═════════════ */
const M5 = [{l: 'Matière', q: 'pièces coupantes ou instables ?', a: 147.62, c: TEAL, ic: 'brique', img: IMG.matiere}, {l: 'Matériel', q: 'outils défectueux, machine sans protection', a: 150.66, c: BLUE, ic: 'outils', img: IMG.materiel}, {l: 'Méthode', q: 'procédure non respectée ?', a: 154.42, c: VIO, ic: 'clipboard', img: IMG.methode}, {l: 'Main-d’œuvre', q: 'manque de formation ?', a: 157.54, c: ORANGE, ic: 'ouvrier', img: IMG.mainoeuvre}, {l: 'Milieu', q: 'plancher glissant, éclairage trop faible ?', a: 160.5, c: RED, ic: 'ampoule', img: IMG.milieu}];
/** Arête de poisson : 5 arêtes (3 en haut, 2 en bas) + tête « EFFET ». */
const Fishbone: React.FC<{w: number; h: number; at: number; hi?: number; lit?: number; labels?: boolean; fish?: number}> = ({w, h, at, hi = -1, lit = 1e9, labels = true, fish = 0}) => {
  const t = useT();
  const sy = h / 2;
  const spine = prog(t, at, at + 0.9, easeOut);
  const pos = [{x: 0.18, up: true}, {x: 0.42, up: true}, {x: 0.66, up: true}, {x: 0.30, up: false}, {x: 0.54, up: false}];
  return (
    <div style={{position: 'relative', width: w, height: h}}>
      <svg width={w} height={h} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
        {fish > 0 && <path d={`M ${w * 0.04} ${sy} Q ${w * 0.4} ${sy - h * 0.62} ${w * 0.8} ${sy} Q ${w * 0.4} ${sy + h * 0.62} ${w * 0.04} ${sy} Z`} fill={`${BLUE}${Math.round(fish * 40).toString(16).padStart(2, '0')}`} stroke={BLUE} strokeWidth={4} strokeDasharray="12 10" opacity={fish} />}
        {fish > 0 && <polygon points={`${w * 0.04},${sy} ${-w * 0.02},${sy - h * 0.25} ${-w * 0.02},${sy + h * 0.25}`} fill={`${BLUE}55`} stroke={BLUE} strokeWidth={4} opacity={fish} />}
        <line x1={w * 0.04} y1={sy} x2={w * 0.04 + w * 0.76 * spine} y2={sy} stroke={INK} strokeWidth={10} strokeLinecap="round" />
        {pos.map((p, k) => {
          const b = prog(t, at + 0.6 + k * 0.15, at + 1.0 + k * 0.15, easeOut);
          const isHi = k === hi;
          const on = t >= lit + k * 0.15 || isHi;
          const x2 = w * (p.x + 0.1);
          const x1 = lerp(x2, w * p.x, b);
          const y1 = lerp(sy, p.up ? h * 0.08 : h * 0.92, b);
          return <line key={k} x1={x1} y1={y1} x2={x2} y2={sy} stroke={on ? M5[k].c : '#9AA7BC'} strokeWidth={isHi ? 14 : 8} strokeLinecap="round" style={{filter: isHi ? `drop-shadow(0 0 8px ${M5[k].c})` : undefined}} />;
        })}
      </svg>
      <div style={{position: 'absolute', left: w * 0.8, top: sy - h * 0.16, width: w * 0.2, height: h * 0.32, borderRadius: 18, background: RED, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: Math.min(40, h * 0.1), opacity: prog(t, at + 0.8, at + 1.1), boxShadow: `0 0 ${20 + 10 * Math.sin(t * 5)}px ${RED}88`}}>EFFET</div>
      {labels && pos.map((p, k) => <div key={`l${k}`} style={{position: 'absolute', left: w * p.x - 80, top: p.up ? h * 0.08 - 46 : h * 0.92 + 4, width: 160, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: Math.min(26, h * 0.075), color: t >= lit + k * 0.15 || k === hi ? M5[k].c : '#A9B1BE', opacity: prog(t, at + 0.8 + k * 0.15, at + 1.1 + k * 0.15)}}>{M5[k].l}</div>)}
    </div>
  );
};
const Diag5M: React.FC = () => {
  const t = useT();
  const ph = t < 135.3 ? 0 : t < 143.9 ? 1 : t < 163.9 ? 2 : t < 170.2 ? 3 : 4;
  const mi = M5.reduce((k, x, i) => (t >= x.a ? i : k), -1);
  return (
    <Out end={198.1}>
      {ph === 0 && (
        <>
          <HiLine words={t < 129.0 ? ['Le', 'diagnostic'] : ['L’arête', 'de', 'poisson']} mark={t < 129.0 ? [1] : [0, 1, 2]} at={t < 129.0 ? 118.8 : 129.06} y={330} size={66} />
          {t < 129.0 && (
            <>
              <Deep src={IMG.equipe5m} x={60} y={440} w={960} h={480} at={118.8} pos="50% 40%" />
              <GlassCard x={60} y={960} w={960} h={420} at={124.5} c={VIO}>
                <div style={{display: 'flex', alignItems: 'center', gap: 30, height: '100%', padding: '0 40px'}}>
                  <div style={{transform: `rotate(${Math.sin(t * 2) * 10}deg) scale(${1 + 0.08 * Math.sin(t * 4)})`, filter: `drop-shadow(0 0 20px ${GOLD})`}}><F n="etoile" size={180} /></div>
                  <div>
                    <Mono at={124.8} c={DIM} size={24}>l’outil star</Mono>
                    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: INK, lineHeight: 1.1}}>ne pas <span style={{color: RED}}>sauter aux conclusions</span></div>
                  </div>
                </div>
              </GlassCard>
            </>
          )}
          {t >= 129.0 && (
            <>
              <Abs x={90} y={500} w={900} h={560}><Fishbone w={900} h={560} at={129.06} fish={prog(t, 132.4, 133.4) * (1 - prog(t, 134.6, 135.2))} /></Abs>
              <Abs x={0} y={1150} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 20}}><Pill at={130.74} c={VIO} size={32}>Ishikawa</Pill><Pill at={132.38} c={BLUE} size={32}>arête de poisson</Pill></Abs>
            </>
          )}
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Cracher', 'le', 'morceau']} mark={[0, 2]} at={138.5} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={250} style={{background: '#F1F1EC', border: `5px solid ${INK}`, borderRadius: 24, opacity: pop(t, 135.4) * (1 - prog(t, 139.4, 139.8))}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 30, height: '100%', padding: '0 40px'}}>
              <svg width={300} height={80}><line x1={10} y1={40} x2={260} y2={40} stroke={DIM} strokeWidth={10} /><polygon points="250,20 290,40 250,60" fill={DIM} /></svg>
              <span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: DIM}}>la cause unique<Strike p={prog(t, 138.0, 138.5)} c={RED} /></span>
            </div>
          </Abs>
          <Abs x={90} y={700} w={900} h={560}><Fishbone w={900} h={560} at={139.0} lit={141.78} /></Abs>
          <Abs x={0} y={1290} w={1080} style={{textAlign: 'center'}}><Pill at={142.0} c={VIO} size={30}>5 grandes catégories</Pill></Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Le', 'tour', 'des', '5M']} mark={[3]} at={144.0} y={330} size={66} />
          <Abs x={150} y={430} w={780} h={330}><Fishbone w={780} h={330} at={143.0} hi={mi} lit={1e9} /></Abs>
          {M5.map((m, k) => k === mi && (
            <React.Fragment key={m.l}>
              {m.img ? <Blinds src={m.img} x={60} y={800} w={960} h={420} at={m.a} pos="50% 45%" n={9} /> : <Abs x={60} y={800} w={960} h={420} style={{background: `${m.c}15`, border: `6px solid ${INK}`, borderRadius: 30, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div style={{transform: `scale(${pop(t, m.a)}) rotate(${Math.sin(t * 3) * 6}deg)`}}><F n={m.ic} size={260} /></div></Abs>}
              <Abs x={60} y={1240} w={960} h={140} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `8px 8px 0 ${m.c}`, display: 'flex', alignItems: 'center', gap: 24, padding: '0 26px', opacity: pop(t, m.a + 0.1), transform: `translateX(${(1 - pop(t, m.a + 0.1)) * 120}px)`}}>
                <Num n="M" c={m.c} size={90} />
                <div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: m.c, lineHeight: 1}}>{m.l}</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: INK}}>{m.q}</div></div>
              </Abs>
            </React.Fragment>
          ))}
          {mi < 0 && <Abs x={0} y={950} w={1080} style={{textAlign: 'center'}}><Pill at={145.74} c={INK} size={32}>exemples concrets</Pill></Abs>}
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={['Vision', 'à', '360°']} mark={[0, 2]} at={164.0} y={330} size={68} />
          <Abs x={140} y={440} w={800} h={800}>
            <svg width={800} height={800} style={{position: 'absolute', left: 0, top: 0}}>
              <circle cx={400} cy={400} r={370} fill="none" stroke="#E3E8EF" strokeWidth={22} />
              <circle cx={400} cy={400} r={370} fill="none" stroke={GREEN} strokeWidth={22} strokeLinecap="round" strokeDasharray={2325} strokeDashoffset={2325 * (1 - prog(t, 164.2, 167.0, easeInOut))} transform="rotate(-90 400 400)" />
            </svg>
            <div style={{position: 'absolute', left: 400 - 24 + 370 * Math.sin(prog(t, 164.2, 167.0, easeInOut) * Math.PI * 2), top: 400 - 24 - 370 * Math.cos(prog(t, 164.2, 167.0, easeInOut) * Math.PI * 2), width: 48, height: 48, borderRadius: 24, background: GREEN, border: `5px solid ${INK}`, boxShadow: `0 0 20px ${GREEN}`}} />
            {M5.map((m, k) => {
              const ang = (k / 5) * Math.PI * 2;
              const a = 164.2 + (k / 5) * 2.8;
              return <div key={m.l} style={{position: 'absolute', left: 400 - 95 + 240 * Math.sin(ang), top: 400 - 70 - 240 * Math.cos(ang), width: 190, height: 140, borderRadius: 20, background: t >= a ? m.c : '#fff', border: `5px solid ${INK}`, color: t >= a ? '#fff' : DIM, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, transform: `scale(${t >= a ? 1 + 0.15 * Math.max(0, 1 - (t - a) * 4) : 0.9})`}}><span style={{fontSize: 44}}>{t >= a ? '✓' : 'M'}</span>{m.l}</div>;
            })}
            <div style={{position: 'absolute', left: 300, top: 330, width: 200, height: 140, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: GREEN, opacity: pop(t, 167.0)}}>360°</div>
          </Abs>
          <Abs x={0} y={1290} w={1080} style={{textAlign: 'center'}}><Pill at={168.66} c={INK} size={30}>impossible de rater un détail</Pill></Abs>
        </>
      )}
      {ph === 4 && (
        <>
          <HiLine words={t < 185.3 ? ['L’effet', '≠', 'la', 'blessure'] : ['Le', 'danger', 'à', 'la', 'source']} mark={t < 185.3 ? [0, 3] : [1, 4]} at={t < 185.3 ? 170.4 : 185.4} y={330} size={62} />
          {t < 185.3 && (
            <>
              <GlassCard x={60} y={440} w={460} h={560} at={176.46} c={DIM}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40, gap: 14, filter: t > 179.6 ? 'grayscale(0.7)' : undefined}}>
                  <F n="pansement" size={170} />
                  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: DIM}}>la blessure</div>
                  <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM, opacity: pop(t, 179.66)}}>= le résultat final</div>
                </div>
              </GlassCard>
              <GlassCard x={560} y={440} w={460} h={560} at={180.9} c={RED}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40, gap: 14}}>
                  <div style={{filter: `drop-shadow(0 0 ${16 + 12 * Math.abs(Math.sin(t * 6))}px ${RED})`}}><F n="danger" size={170} /></div>
                  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: RED}}>l’effet</div>
                  <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: INK, opacity: pop(t, 182.94)}}>= le risque, le danger direct</div>
                </div>
              </GlassCard>
              <Abs x={0} y={1050} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 120, color: INK, opacity: pop(t, 176.0)}}>≠</Abs>
            </>
          )}
          {t >= 185.3 && (
            <>
              <Abs x={60} y={440} w={960} h={250} style={{background: '#F1F1EC', border: `5px solid ${INK}`, borderRadius: 24, display: 'flex', alignItems: 'center', gap: 30, padding: '0 40px', opacity: pop(t, 185.42)}}>
                <F n="bris" size={140} />
                <span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: DIM}}>un bras cassé<Strike p={prog(t, 187.0, 187.4)} c={RED} /></span>
              </Abs>
              <Card x={60} y={730} w={460} h={340} at={187.82} c={RED}><IcoLab ic="echelle" l="une chute de hauteur" size={130} fs={34} c={RED} /></Card>
              <Card x={560} y={730} w={460} h={340} at={189.26} c={RED}><IcoLab ic="engrenage" l="contact avec une pièce en mouvement" size={130} fs={30} c={RED} /></Card>
              <Abs x={60} y={1110} w={960} h={270} style={{borderRadius: 26, background: `linear-gradient(110deg, ${GREEN}, #2FBF71)`, border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${INK}55`, display: 'flex', alignItems: 'center', gap: 26, padding: '0 36px', opacity: pop(t, 194.66), overflow: 'hidden'}}>
                <F n="cible" size={150} />
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: '#fff', lineHeight: 1.05}}>éliminer le danger<br />à la source</div>
                <Shine at={195.0} />
              </Abs>
            </>
          )}
        </>
      )}
    </Out>
  );
};

/* ═════════════ 4 · LA CAUSE PRINCIPALE ═════════════ */
const CAUSES = ['éclairage faible', 'procédure ignorée', 'sol glissant', 'carter absent', 'fatigue', 'formation absente'];
const Racine: React.FC = () => {
  const t = useT();
  const ph = t < 211.5 ? 0 : 1;
  const grow = prog(t, 201.38, 203.6, easeOut);
  const pull = prog(t, 217.0, 218.2, easeInOut);
  return (
    <Out end={230.0}>
      {ph === 0 && (
        <>
          <HiLine words={t < 206.6 ? ['À', 'la', 'racine'] : ['Isoler', 'les', 'vrais', 'coupables']} mark={t < 206.6 ? [2] : [2, 3]} at={t < 206.6 ? 201.4 : 206.7} y={330} size={64} />
          {t < 206.6 && (
            <Abs x={60} y={440} w={960} h={940} style={{opacity: pop(t, 201.3)}}>
              <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 360, background: 'linear-gradient(180deg, #EAF4FF, #F7FBFF)', borderRadius: '30px 30px 0 0', border: `5px solid ${INK}`, borderBottom: 'none'}} />
              <div style={{position: 'absolute', left: 0, right: 0, top: 360, bottom: 0, background: 'linear-gradient(180deg, #8B5E3C, #5A3A22)', borderRadius: '0 0 30px 30px', border: `5px solid ${INK}`, borderTop: `8px solid #3E2A18`}} />
              <div style={{position: 'absolute', left: 380, top: 60, transform: `scale(${0.6 + 0.4 * grow})`, transformOrigin: '50% 100%'}}><F n="arbre" size={300} /></div>
              <svg width={960} height={580} style={{position: 'absolute', left: 0, top: 360}}>
                {[[480, 0, 300, 260, 160, 420], [480, 0, 660, 280, 820, 460], [480, 0, 470, 300, 500, 540], [480, 0, 380, 200, 260, 300], [480, 0, 580, 180, 700, 260]].map((r, k) => <path key={k} d={`M ${r[0]} ${r[1]} Q ${r[2]} ${r[3]} ${r[4]} ${r[5]}`} fill="none" stroke={k === 2 ? ORANGE : '#E8D2B6'} strokeWidth={k === 2 ? 18 : 10} strokeLinecap="round" strokeDasharray={700} strokeDashoffset={700 * (1 - grow)} style={{filter: k === 2 ? `drop-shadow(0 0 12px ${ORANGE})` : undefined}} />)}
              </svg>
              {grow >= 1 && <div style={{position: 'absolute', left: 520, top: 880}}><Pill at={203.6} c={ORANGE} size={28}>la racine</Pill></div>}
            </Abs>
          )}
          {t >= 206.6 && (
            <Abs x={60} y={440} w={960} h={940}>
              <svg width={960} height={700} style={{position: 'absolute', left: 0, top: 120}}>
                <path d="M 120 40 L 840 40 L 560 420 L 560 640 L 400 640 L 400 420 Z" fill="#fff" stroke={INK} strokeWidth={8} />
              </svg>
              {CAUSES.map((c, k) => {
                const a = 207.0 + k * 0.35;
                const p = prog(t, a, a + 1.0);
                const keep = k === 1 || k === 3;
                const x = lerp(170 + (k % 3) * 220, keep ? (k === 1 ? 170 : 560) : 170 + (k % 3) * 220, p);
                const y = lerp(-20 + Math.floor(k / 3) * 70, keep ? 820 : 300, p);
                return <div key={c} style={{position: 'absolute', left: x, top: y, padding: '10px 18px', borderRadius: 14, background: keep ? ORANGE : '#E3E8EF', color: keep ? '#fff' : DIM, fontFamily: sansFont, fontWeight: 900, fontSize: 26, opacity: t >= a ? (keep ? 1 : 1 - prog(t, a + 0.8, a + 1.1)) : 0, border: `3px solid ${INK}`, whiteSpace: 'nowrap'}}>{c}</div>;
              })}
              {t > 210.5 && <div style={{position: 'absolute', left: 0, right: 0, top: 890, textAlign: 'center'}}><Pill at={210.5} c={ORANGE} size={28}>les vrais coupables</Pill></div>}
            </Abs>
          )}
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Le', 'test', 'mental']} mark={[1, 2]} at={211.6} y={330} size={68} />
          <Win x={60} y={440} w={960} h={500} at={211.6} title="test : si j’enlève cette cause…" c={ORANGE}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, height: 440}}>
              {['sol glissant', 'carter absent', 'éclairage'].map((c, k) => {
                const isP = k === 1;
                return <div key={c} style={{width: 260, height: 200, borderRadius: 22, background: isP ? `${ORANGE}22` : '#fff', border: `5px solid ${isP ? ORANGE : INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, transform: isP ? `translateY(${-pull * 260}px) rotate(${pull * 12}deg)` : undefined, opacity: isP ? 1 - prog(t, 218.0, 218.5) : 1}}>{c}</div>;
              })}
            </div>
            {pull > 0 && <div style={{position: 'absolute', left: 430, top: 60 - pull * 30, opacity: 1 - prog(t, 218.2, 218.6)}}><F n="main-levee" size={110} /></div>}
          </Win>
          <Abs x={60} y={980} w={960} h={170} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 34px', opacity: pop(t, 218.74)}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK}}>l’accident se serait-il produit ?</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: RED, transform: `scale(${pop(t, 220.62)})`}}>NON</div>
          </Abs>
          <Stamp at={223.3} c={ORANGE} text="cause racine" x={240} y={1180} rot={-6} size={70} />
          {t > 221.86 && t < 223.3 && <Abs x={0} y={1200} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: GREEN, transform: `scale(${pop(t, 221.86)})`}}>bingo !</Abs>}
          {t > 225.0 && <Abs x={0} y={1310} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16}}><Pill at={226.58} c={DIM} size={24}>petits détails</Pill><Pill at={228.06} c={RED} size={30}>énormes failles</Pill></Abs>}
        </>
      )}
    </Out>
  );
};

/* ═════════════ 5 · LES ACTIONS CORRECTIVES ═════════════ */
const Actions: React.FC = () => {
  const t = useT();
  const ph = t < 240.0 ? 0 : t < 257.6 ? 1 : t < 264.3 ? 2 : 3;
  const stone = prog(t, 261.0, 263.0);
  return (
    <Out end={282.2}>
      {ph === 0 && (
        <>
          <HiLine words={['Sécuriser', 'l’avenir']} mark={[0, 1]} at={233.3} y={330} size={68} />
          <Abs x={60} y={440} w={960} h={940} style={{opacity: pop(t, 233.3)}}>
            <svg width={960} height={940}>
              <path d="M 120 880 L 420 120 L 540 120 L 840 880 Z" fill="#3A4356" />
              <path d="M 480 880 L 480 120" stroke={YEL} strokeWidth={12} strokeDasharray="50 40" strokeDashoffset={-t * 120} />
            </svg>
            <div style={{position: 'absolute', left: 330, top: 300, transform: `scale(${Math.min(1, spring(t, 234.0, 8, 12))})`, filter: `drop-shadow(0 0 30px ${GREEN})`}}><F n="bouclier" size={300} /></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 30, textAlign: 'center'}}><Pill at={236.0} c={INK} size={28}>comprendre le passé…</Pill></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 700, textAlign: 'center'}}><Pill at={238.66} c={GREEN} size={30}>…et changer pour demain</Pill></div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Immédiat', 'vs', 'permanent']} mark={[0, 2]} at={240.2} y={330} size={64} />
          {[{x: 60, c: ORANGE, t1: 'IMMÉDIAT', t2: 'temporaire · le pansement', a: 244.02, img: IMG.immediat, ic: 'pansement', L: [{l: 'arrêter la machine', a: 246.92}, {l: 'nettoyer', a: 248.42}, {l: 'poser un ruban', a: 248.9}]}, {x: 560, c: GREEN, t1: 'PERMANENT', t2: 'le durable', a: 251.14, img: IMG.permanent, ic: 'batiment', L: [{l: 'modifier l’outil', a: 254.02}, {l: 'réaménager le poste', a: 254.94}, {l: 'changer la méthode', a: 256.1}]}].map((s0) => (
            <Abs key={s0.t1} x={s0.x} y={440} w={460} h={940} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `9px 9px 0 ${s0.c}`, overflow: 'hidden', opacity: pop(t, s0.a - 0.3), transform: `perspective(1200px) rotateY(${(1 - pop(t, s0.a - 0.3)) * (s0.x < 300 ? -40 : 40)}deg)`}}>
              <div style={{height: 380, overflow: 'hidden'}}><Pic src={s0.img} ic={s0.ic} w={460} h={380} zoom={1.12 - 0.08 * prog(t, s0.a, s0.a + 6)} /></div>
              <div style={{background: s0.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 44, textAlign: 'center', padding: '10px 0'}}>{s0.t1}</div>
              <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM, textAlign: 'center', marginTop: 10}}>{s0.t2}</div>
              <div style={{display: 'flex', flexDirection: 'column', gap: 14, padding: '20px 20px'}}>{s0.L.map((x) => <Check key={x.l} at={x.a} label={x.l} c={s0.c} size={26} />)}</div>
            </Abs>
          ))}
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Séparer', 'les', 'deux']} mark={[0, 2]} at={257.8} y={330} size={66} />
          <Abs x={240} y={460} w={600} h={600} style={{opacity: pop(t, 257.8)}}>
            <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle, #fff, ${stone > 0 ? '#C9CCD1' : '#FFE6CC'})`, border: `6px solid ${INK}`}} />
            <div style={{position: 'absolute', left: 150, top: 150, filter: `grayscale(${stone}) contrast(${1 + stone * 0.4})`, transform: `rotate(${-20 + stone * 10}deg)`}}><F n="pansement" size={300} /></div>
            <div style={{position: 'absolute', left: 430, top: 40, transform: `rotate(${(t - 259) * 90}deg)`}}><F n="sablier" size={110} /></div>
          </Abs>
          <Abs x={0} y={1110} w={1080} style={{textAlign: 'center'}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 54, color: INK}}>le <span style={{color: ORANGE}}>temporaire</span> devient <span style={{color: DIM}}>permanent</span></span></Abs>
          <Abs x={0} y={1220} w={1080} style={{textAlign: 'center'}}><Pill at={262.98} c={RED} size={30}>par pure négligence</Pill></Abs>
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={t < 275.6 ? ['Chaque', 'action', 'suivie'] : ['Sans', 'signature…']} mark={t < 275.6 ? [1, 2] : [1]} at={t < 275.6 ? 264.4 : 275.7} y={330} size={66} />
          <GlassCard x={60} y={440} w={960} h={520} at={264.4} c={RED}>
            <div style={{position: 'absolute', left: 30, top: 24}}><Mono at={264.6} c={DIM} size={24}>carte d’action corrective</Mono></div>
            {[{ic: 'superviseur', l: 'un responsable', a: 266.74}, {ic: 'calendrier', l: 'une date limite', a: 267.62}, {ic: 'graphique', l: 'un suivi implacable', a: 269.06}].map((x, k) => (
              <div key={x.l} style={{position: 'absolute', left: 30 + k * 305, top: 90, width: 280, height: 260, borderRadius: 22, background: '#fff', border: `4px solid ${INK}`, boxShadow: `5px 5px 0 ${RED}`, opacity: pop(t, x.a), transform: `translateY(${(1 - pop(t, x.a)) * 40}px)`}}><IcoLab ic={x.ic} l={x.l} size={110} fs={30} /></div>
            ))}
            <div style={{position: 'absolute', left: 30, right: 30, top: 370, height: 40, borderRadius: 20, background: '#E3E8EF', border: `4px solid ${INK}`, overflow: 'hidden'}}><div style={{height: '100%', width: `${100 * prog(t, 269.1, 274.9)}%`, background: `linear-gradient(90deg, ${ORANGE}, ${GREEN})`}} /></div>
            <div style={{position: 'absolute', left: 30, top: 428, display: 'flex', gap: 30}}><Check at={271.54} label="suivie : superviseur" c={GREEN} size={24} /><Check at={273.0} label="validée : comité santé-sécurité" c={GREEN} size={24} /></div>
          </GlassCard>
          <Abs x={60} y={1000} w={960} h={380} style={{borderRadius: 28, background: 'radial-gradient(circle at 50% 120%, #000 30%, #2A2F3A)', border: `6px solid ${INK}`, overflow: 'hidden', opacity: pop(t, 279.0)}}>
            {t > 279.0 && <div style={{position: 'absolute', left: 380, top: lerp(110, 300, prog(t, 280.5, 281.7, easeIn)), transform: `rotate(${(t - 280.5) * 200}deg) scale(${1 - prog(t, 281.0, 281.8) * 0.7})`, opacity: 1 - prog(t, 281.5, 281.9)}}><F n="parchemin" size={160} /></div>}
            <div style={{position: 'absolute', left: 0, right: 0, top: 30, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: '#fff'}}>aux oubliettes</div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 6 · SIGNER ET CAPITALISER ═════════════ */
const SIGN = [{l: 'l’employeur', a: 289.86, d: 'M10 50 C 40 10, 60 80, 90 40 S 140 20, 160 55 S 200 70, 230 30'}, {l: 'les travailleurs', a: 290.66, d: 'M10 40 C 30 70, 70 10, 100 50 S 150 80, 170 30 S 210 20, 230 55'}, {l: 'le CSS', a: 291.62, d: 'M10 55 C 50 20, 80 70, 110 35 S 170 60, 190 25 S 220 50, 230 40'}, {l: 'la direction', a: 292.3, d: 'M10 30 C 40 70, 80 20, 120 55 S 160 10, 200 50 S 220 30, 230 45'}];
const TREND = [0.3, 0.35, 0.28, 0.95, 0.32, 0.4];
const Collectif: React.FC = () => {
  const t = useT();
  const ph = t < 304.3 ? 0 : t < 316.1 ? 1 : t < 326.9 ? 2 : t < 338.8 ? 3 : 4;
  const heal = prog(t, 329.5, 330.9, easeInOut);
  const wheel = prog(t, 348.26, 349.9, easeInOut);
  const eye = prog(t, 351.94, 352.6, easeOut);
  return (
    <Out end={OUTRO_AT}>
      {ph === 0 && (
        <>
          <HiLine words={t < 293.6 ? ['Les', 'signatures', 'de', 'tous'] : t < 297.7 ? ['Pas', 'l’affaire', 'd’un', 'seul', 'bureau'] : ['Toute', 'l’entreprise', 's’engage']} mark={t < 293.6 ? [1, 3] : t < 297.7 ? [3, 4] : [0, 1, 2]} at={t < 293.6 ? 285.4 : t < 297.7 ? 293.7 : 297.8} y={330} size={58} />
          <Abs x={60} y={440} w={960} h={600} style={{background: '#FFFDF6', border: `6px solid ${INK}`, borderRadius: 24, boxShadow: `10px 10px 0 ${GREEN}`, opacity: pop(t, 285.4)}}>
            <div style={{position: 'absolute', left: 30, top: 24, fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM}}>fin du formulaire · signatures</div>
            {SIGN.map((x, k) => (
              <div key={x.l} style={{position: 'absolute', left: 30 + (k % 2) * 460, top: 90 + Math.floor(k / 2) * 250, width: 430, height: 220}}>
                <svg width={430} height={120} style={{position: 'absolute', left: 0, top: 20}}><path d={x.d} transform="scale(1.6 1.4) translate(10 5)" fill="none" stroke={NAVY} strokeWidth={3.5} strokeLinecap="round" strokeDasharray={420} strokeDashoffset={420 * (1 - prog(t, x.a, x.a + 0.7))} /></svg>
                <div style={{position: 'absolute', left: 0, right: 20, top: 150, height: 4, background: INK}} />
                <div style={{position: 'absolute', left: 0, top: 165, fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: t >= x.a ? GREEN : DIM}}>{t >= x.a + 0.7 ? '✓ ' : ''}{x.l}</div>
              </div>
            ))}
          </Abs>
          <Abs x={60} y={1080} w={960} h={300} style={{border: `5px solid ${INK}`, borderRadius: 24, overflow: 'hidden', opacity: pop(t, 294.98)}}>
            <Pic src={IMG.signatures} ic="equipe" w={960} h={300} zoom={1.1} pos="50% 35%" />
            <div style={{position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${GREEN}CC, transparent 60%)`, opacity: pop(t, 298.66)}} />
            <div style={{position: 'absolute', left: 30, top: 100, fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: '#fff', opacity: pop(t, 298.66)}}>comme un seul homme</div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Une', 'échelle', 'plus', 'grande']} mark={[1, 3]} at={304.4} y={330} size={64} />
          <Abs x={60} y={440} w={960} h={600}>
            <div style={{position: 'absolute', left: 30, top: 160}}><F n="classeur" size={200} /></div>
            <div style={{position: 'absolute', left: 30, top: 380, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM}}><span style={{position: 'relative'}}>mourir dans un classeur<Strike p={prog(t, 308.6, 309.0)} c={RED} /></span></div>
            {Array.from({length: 8}, (_, k) => {
              const a = 309.0 + k * 0.25;
              const p = prog(t, a, a + 0.9, easeInOut);
              return t > a && <div key={k} style={{position: 'absolute', left: lerp(120, 700, p), top: 200 - Math.sin(p * Math.PI) * 160, width: 70, height: 90, background: '#fff', border: `3px solid ${INK}`, borderRadius: 6, transform: `rotate(${p * 360}deg) scale(${1 - p * 0.6})`, opacity: 1 - prog(t, a + 0.8, a + 0.95)}} />;
            })}
            <div style={{position: 'absolute', left: 640, top: 60, width: 280, height: 420}}>
              {[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 0, top: 60 + k * 120, width: 280, height: 140, borderRadius: '50%/30%', background: `linear-gradient(180deg, ${BLUE}, ${NAVY})`, border: `5px solid ${INK}`, boxShadow: `0 0 ${20 + 15 * Math.sin(t * 4 + k)}px ${BLUE}88`}} />)}
              <div style={{position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: NAVY}}>base de données</div>
            </div>
          </Abs>
          <Abs x={0} y={1110} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', padding: '0 40px', boxSizing: 'border-box'}}>
            <Pill at={310.54} c={NAVY} size={28}>genre d’accident</Pill>
            <Pill at={311.46} c={BLUE} size={28}>agent causal</Pill>
            <Pill at={312.3} c={VIO} size={28}>type de lésion</Pill>
          </Abs>
          <Abs x={0} y={1290} w={1080} style={{textAlign: 'center'}}><Pill at={314.5} c={INK} size={30}>macroscopique</Pill></Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Les', 'tendances', 'lourdes']} mark={[1, 2]} at={316.2} y={330} size={66} />
          <SearchOpen x={60} y={440} w={960} h={940} at={316.2} query="problèmes de dos" results={['Chutes de plain-pied', 'Problèmes de dos', 'Coupures aux mains']} found={1} foundAt={317.5} clickAt={317.9} c={GREEN}>
            <div style={{position: 'absolute', left: 30, right: 30, top: 20, height: 440}}>
              <Mono at={318.6} c={DIM} size={22}>problèmes de dos · par service (illustratif)</Mono>
              <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 380, display: 'flex', alignItems: 'flex-end', gap: 22, borderBottom: `5px solid ${INK}`}}>
                {TREND.map((v, k) => {
                  const big = k === 3;
                  const h = 360 * v * prog(t, big ? 318.9 : 318.6 + k * 0.06, big ? 319.9 : 319.2 + k * 0.06, easeOut);
                  return <div key={k} style={{flex: 1, height: h, background: big ? RED : '#C9D2DF', border: `4px solid ${INK}`, borderBottom: 'none', borderRadius: '12px 12px 0 0', boxShadow: big ? `0 0 30px ${RED}` : 'none', position: 'relative'}}>{big && h > 200 && <div style={{position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)'}}><F n="danger" size={50} /></div>}</div>;
                })}
              </div>
            </div>
            <div style={{position: 'absolute', left: 30, right: 30, top: 500, height: 330, display: 'flex', gap: 20, opacity: pop(t, 321.42)}}>
              <div style={{width: 360, height: 330, borderRadius: 20, overflow: 'hidden', border: `4px solid ${INK}`}}><Pic src={IMG.dos} ic="courbe-dos" w={360} h={330} /></div>
              <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16}}>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK, lineHeight: 1.1}}>cibler les investissements en <span style={{color: GREEN}}>ergonomie</span></div>
                <Pill at={323.98} c={GREEN} size={28}>hyper proactif</Pill>
              </div>
            </div>
          </SearchOpen>
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={['Échec', 'passé', '→', 'protection', 'future']} mark={[0, 3]} at={327.0} y={330} size={50} />
          <Abs x={290} y={440} w={500} h={520}>
            <div style={{position: 'absolute', left: 50, top: 40, transform: `translateX(${(1 - heal) * -50}px) rotate(${(1 - heal) * -14}deg)`, clipPath: 'polygon(0 0, 52% 0, 44% 40%, 56% 60%, 46% 100%, 0 100%)', filter: `grayscale(${1 - heal})`}}><F n="bouclier" size={400} /></div>
            <div style={{position: 'absolute', left: 50, top: 40, transform: `translateX(${(1 - heal) * 50}px) rotate(${(1 - heal) * 14}deg)`, clipPath: 'polygon(52% 0, 100% 0, 100% 100%, 46% 100%, 56% 60%, 44% 40%)', filter: `grayscale(${1 - heal})`}}><F n="bouclier" size={400} /></div>
            {heal >= 1 && <div style={{position: 'absolute', inset: 0, borderRadius: '50%', boxShadow: `0 0 ${60 + 20 * Math.sin(t * 4)}px ${GREEN}88`}} />}
          </Abs>
          <Abs x={0} y={1000} w={1080} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
            <Pill at={332.14} c={VIO} size={32}>méthode Ishikawa</Pill>
            <Pill at={333.14} c={BLUE} size={32}>objectivité absolue</Pill>
            <Pill at={334.22} c={RED} size={32}>actions correctives</Pill>
          </Abs>
        </>
      )}
      {ph === 4 && (
        <>
          <HiLine words={t < 345.9 ? ['Un', 'futur', 'sans', 'accident', '?'] : ['Les', 'humains', 'au', 'volant']} mark={t < 345.9 ? [1, 2, 3] : [1, 3]} at={t < 345.9 ? 339.0 : 346.0} y={330} size={60} />
          {t < 345.9 && (
            <Abs x={240} y={440} w={600} h={800} style={{textAlign: 'center'}}>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 600, lineHeight: 1, color: ORANGE, transform: `scale(${pop(t, 339.0)}) rotate(${Math.sin(t * 2) * 6}deg)`, textShadow: `14px 14px 0 ${INK}`}}>?</div>
              <div style={{marginTop: 10}}><Pill at={344.62} c={INK} size={32}>votre organisation est-elle prête ?</Pill></div>
            </Abs>
          )}
          {t >= 345.9 && (
            <>
              <Abs x={60} y={440} w={960} h={460} style={{border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', boxShadow: `10px 10px 0 ${GREEN}`}}>
                <Pic src={IMG.final} ic="equipe" w={960} h={460} zoom={1.12 - 0.08 * prog(t, 346, 355)} pos="50% 35%" />
                <Shine at={346.5} />
                <div style={{position: 'absolute', left: 24, bottom: 24}}><Pill at={346.02} c={NAVY} size={28}>l’outil trace la route</Pill></div>
              </Abs>
              <Abs x={290} y={940} w={500} h={440}>
                <div style={{position: 'absolute', left: 60, top: 10, width: 380, height: 380, borderRadius: '50%', border: `34px solid ${INK}`, boxSizing: 'border-box', transform: `rotate(${Math.sin(wheel * Math.PI * 2) * 40}deg) scale(${pop(t, 348.26)})`}}>
                  <div style={{position: 'absolute', left: '50%', top: '50%', width: 280, height: 26, marginLeft: -140, marginTop: -13, background: INK, borderRadius: 13}} />
                  <div style={{position: 'absolute', left: '50%', top: '50%', width: 26, height: 150, marginLeft: -13, background: INK, borderRadius: 13}} />
                  <div style={{position: 'absolute', left: '50%', top: '50%', width: 90, height: 90, marginLeft: -45, marginTop: -45, borderRadius: 45, background: GREEN, border: `6px solid ${INK}`}} />
                </div>
                {eye > 0 && <div style={{position: 'absolute', left: 150, top: 120, width: 200, height: 200 * eye, marginTop: 100 * (1 - eye), borderRadius: '50%', background: '#fff', border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: `0 0 40px ${GREEN}`}}><div style={{width: 90, height: 90, borderRadius: 45, background: NAVY, border: `14px solid ${TEAL}`}} /></div>}
              </Abs>
            </>
          )}
          {t > ALLDONE && <Dust n={22} c={GOLD} />}
        </>
      )}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: at + 0.35 + len * 0.05, s: 'sfx/pop', v: 0.25}, ...rep(at + 0.8 + len * 0.05, 3, 0.12, 'sfx/pop', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const shine = (a: number): Sfx => ({at: a, s: 'soft-whoosh', v: 0.18, dur: 0.8});
const pops = (L: number[], v = 0.22): Sfx[] => L.map((a) => ({at: a, s: 'sfx/pop', v}));
const dings = (L: number[], v = 0.22): Sfx[] => L.map((a) => ({at: a, s: 'sfx/ding', v}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, ...flaps(0.1, 8), {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 0.8, s: 'validation', v: 0.18})), {at: ALLDONE, s: 'validation', v: 0.35},
  {at: 2.8, s: 'alarme', v: 0.06, dur: 1.4}, {at: 2.85, s: 'bass-hit', v: 0.3}, ...pops([7.46, 8.14, 8.78], 0.25), {at: 9.46, s: 'sfx/swish', v: 0.25},
  ...rep(10.9, 10, 0.08, 'sfx/pop', 0.08), {at: 15.34, s: 'soft-whoosh', v: 0.45, dur: 1.2}, {at: 16.6, s: 'sfx/thud', v: 0.4}, shine(16.9), {at: 19.62, s: 'sfx/pop', v: 0.22},
  {at: 22.2, s: 'sfx/whoosh', v: 0.22}, {at: 23.0, s: 'stylo', v: 0.3}, ...rep(24.0, 5, 0.15, 'stylo', 0.18), {at: 24.5, s: 'sfx/pop', v: 0.25}, {at: 26.9, s: 'stylo', v: 0.3}, {at: 27.5, s: 'sfx/rise', v: 0.2, dur: 1},
  {at: 32.78, s: 'sfx/pop', v: 0.22}, ...pops(PLAN.map((x) => x.a)), ...PLAN.map((x) => shine(x.a + 0.3)),
  ...rep(46.9, 18, 0.5, 'tick', 0.12), {at: 50.42, s: 'sfx/pop', v: 0.22}, {at: 52.74, s: 'sfx/whoosh', v: 0.2}, {at: 54.5, s: 'sfx/swish', v: 0.22},
  {at: 56.1, s: 'sfx/whoosh', v: 0.22}, ...FIELDS.flatMap((f) => [...rep(f.a, 8, 0.1, 'sfx/click', 0.08), {at: f.a + 0.8, s: 'sfx/ding', v: 0.22}]), {at: 69.7, s: 'sfx/pop', v: 0.22},
  {at: 74.9, s: 'soft-whoosh', v: 0.4, dur: 1}, ...pops([76.0, 76.2, 76.4, 76.6], 0.18), {at: 78.58, s: 'sfx/pop', v: 0.22},
  {at: 84.0, s: 'sfx/whoosh', v: 0.22}, {at: 84.46, s: 'soft-whoosh', v: 0.35, dur: 1.6}, {at: 87.78, s: 'sfx/rise', v: 0.2, dur: 1}, shine(88.0), ...dings([93.42, 95.06, 95.8], 0.25),
  {at: 98.3, s: 'soft-whoosh', v: 0.25}, {at: 100.1, s: 'tampon', v: 0.55}, {at: 101.26, s: 'sfx/whoosh', v: 0.22}, ...rep(102.3, 12, 0.1, 'tick', 0.12), {at: 104.46, s: 'tampon', v: 0.55}, {at: 104.5, s: 'validation', v: 0.25},
  ...rep(106.0, 10, 0.12, 'sfx/pop', 0.08), {at: 110.3, s: 'deep-hit', v: 0.4}, {at: 110.35, s: 'sfx/swish', v: 0.3}, {at: 111.66, s: 'sfx/pop', v: 0.22}, {at: 113.54, s: 'sfx/pop', v: 0.22},
  {at: 118.8, s: 'sfx/whoosh', v: 0.22}, {at: 124.5, s: 'sfx/rise', v: 0.2, dur: 1}, {at: 129.06, s: 'stylo', v: 0.35}, ...rep(129.6, 5, 0.15, 'stylo', 0.2), {at: 132.4, s: 'soft-whoosh', v: 0.3, dur: 1},
  {at: 135.4, s: 'sfx/whoosh', v: 0.2}, {at: 138.0, s: 'stylo', v: 0.3}, {at: 139.0, s: 'stylo', v: 0.3}, ...rep(141.78, 5, 0.15, 'sfx/ding', 0.15),
  ...M5.flatMap((m) => [{at: m.a, s: 'soft-whoosh', v: 0.35, dur: 0.8}, {at: m.a + 0.15, s: 'sfx/pop', v: 0.22}]),
  {at: 164.2, s: 'sfx/rise', v: 0.22, dur: 2.8}, ...M5.map((_, k) => ({at: 164.2 + (k / 5) * 2.8, s: 'sfx/ding', v: 0.18})), {at: 167.0, s: 'validation', v: 0.3},
  {at: 176.0, s: 'sfx/thud', v: 0.3}, {at: 176.46, s: 'sfx/pop', v: 0.22}, {at: 180.9, s: 'alarme', v: 0.05, dur: 0.8}, {at: 185.42, s: 'sfx/whoosh', v: 0.22}, {at: 187.0, s: 'stylo', v: 0.3}, ...pops([187.82, 189.26]), {at: 194.66, s: 'sfx/rise', v: 0.25, dur: 1}, shine(195.0),
  {at: 201.38, s: 'soft-whoosh', v: 0.35, dur: 2}, {at: 203.6, s: 'sfx/pop', v: 0.22}, ...rep(207.0, 6, 0.35, 'sfx/pop', 0.12), {at: 210.5, s: 'sfx/ding', v: 0.25},
  {at: 211.6, s: 'sfx/whoosh', v: 0.22}, {at: 217.0, s: 'sfx/swish', v: 0.3}, {at: 218.74, s: 'sfx/pop', v: 0.22}, {at: 220.62, s: 'bass-hit', v: 0.3}, {at: 221.86, s: 'validation', v: 0.35}, {at: 223.3, s: 'tampon', v: 0.6}, ...pops([226.58, 228.06]),
  {at: 233.3, s: 'sfx/whoosh', v: 0.22}, {at: 234.0, s: 'sfx/rise', v: 0.25, dur: 1}, {at: 236.0, s: 'sfx/pop', v: 0.2}, {at: 238.66, s: 'sfx/pop', v: 0.22},
  {at: 243.7, s: 'soft-whoosh', v: 0.35}, {at: 250.84, s: 'soft-whoosh', v: 0.35}, ...dings([247.17, 248.67, 249.15, 254.27, 255.19, 256.35], 0.2),
  {at: 257.8, s: 'sfx/whoosh', v: 0.22}, {at: 261.0, s: 'deep-hit', v: 0.3}, {at: 262.98, s: 'sfx/pop', v: 0.22},
  {at: 264.4, s: 'sfx/whoosh', v: 0.22}, ...pops([266.74, 267.62, 269.06]), ...dings([271.79, 273.25]), {at: 279.0, s: 'sfx/whoosh', v: 0.2}, {at: 280.5, s: 'sfx/swish', v: 0.3}, {at: 281.6, s: 'deep-hit', v: 0.3},
  {at: 285.4, s: 'sfx/whoosh', v: 0.22}, ...SIGN.flatMap((x) => [{at: x.a, s: 'stylo', v: 0.4}, {at: x.a + 0.7, s: 'sfx/ding', v: 0.18}]), {at: 294.98, s: 'soft-whoosh', v: 0.3}, {at: 298.66, s: 'sfx/rise', v: 0.25, dur: 1},
  {at: 304.4, s: 'sfx/whoosh', v: 0.22}, {at: 308.6, s: 'stylo', v: 0.3}, ...rep(309.0, 8, 0.25, 'sfx/swish', 0.12), ...pops([310.54, 311.46, 312.3]), {at: 314.5, s: 'sfx/ding', v: 0.22},
  ...searchCues(316.2, 16, 317.5, 317.9), {at: 318.9, s: 'sfx/rise', v: 0.25, dur: 1}, {at: 319.9, s: 'alarme', v: 0.05, dur: 0.6}, {at: 321.42, s: 'sfx/pop', v: 0.22}, {at: 323.98, s: 'sfx/ding', v: 0.22},
  {at: 327.0, s: 'sfx/whoosh', v: 0.22}, {at: 329.5, s: 'soft-whoosh', v: 0.4, dur: 1.4}, {at: 330.9, s: 'bass-hit', v: 0.3}, {at: 330.95, s: 'validation', v: 0.3}, ...pops([332.14, 333.14, 334.22], 0.25),
  {at: 339.0, s: 'sfx/thud', v: 0.4}, {at: 344.62, s: 'sfx/pop', v: 0.22}, {at: 346.0, s: 'soft-whoosh', v: 0.35}, {at: 348.26, s: 'sfx/swish', v: 0.3}, {at: 351.94, s: 'sfx/rise', v: 0.25, dur: 0.8},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const EnqueteIshikawa: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={43.65}><Intro /></Gate>
    <Gate from={46.7} to={80.65}><Faits /></Gate>
    <Gate from={83.8} to={115.55}><Objectivite /></Gate>
    <Gate from={118.6} to={198.15}><Diag5M /></Gate>
    <Gate from={201.2} to={230.05}><Racine /></Gate>
    <Gate from={233.1} to={282.25}><Actions /></Gate>
    <Gate from={285.3} to={OUTRO_AT}><Collectif /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}><Gyro i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={355.6}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-enquete-ishikawa-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Kin, Brut, T, TitleBlock, Card, Win, Count, GLASS];
