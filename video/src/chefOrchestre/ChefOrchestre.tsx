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
 * « Le chef d'orchestre du QHSE » — rôle du responsable QHSE (5 min 30) — capsule « condensé + effet wahou + ultra
 * premium » présentée en métro : 8 stations (orchestre → vision → traçabilité → prévention → catastrophes →
 * certification → diplomatie → rentabilité) desservies par la rame réaliste au moment où la voix les énonce.
 * Voix d'origine (sans musique de fond), sous-titres calés mot à mot. Fil rouge : tube pneumatique à six guichets calés
 * sur les « six mouvements » annoncés par la voix (stratégie → qualité → santé → environnement → normes → communication) ;
 * gyrophare à chaque mouvement ; capsule pneumatique, loupe, store vénitien dans les scènes. Wahou : ondes sonores qui
 * passent de la cacophonie à la symphonie, tuiles Q-H-S-E, barre de recherche qui trouve puis OUVRE les 6 mouvements,
 * moyeu stratégique qui s'illumine, compteur 100 %, rail de traçabilité A → Z, rappel produit qui fond de « semaines » à
 * « heures », radar d'anticipation, colonne vertébrale qui se redresse, zoom arrière « on change d'échelle », tuiles
 * de catastrophes au gyrophare, bouclier à trois cercles, portée musicale, entonnoir théorie → pratique, carte « double
 * casquette » qui se retourne, coûts de non-qualité qui chutent, courbe d'investissement.
 */
const IMG = {
  cover: 'sysqsse-gen/couverture.jpg',
  orchestre: 'sysqsse-gen/chef.jpg',
  strategie: 'sysqsse-gen/architecte.jpg',
  qualite: 'sysqsse-gen/qualite.jpg',
  sante: 'metroiso-gen/sst.jpg',
  ergonomie: 'diag-gen/poste.jpg',
  environnement: 'sysqsse-gen/environnement.jpg',
  normes: 'metroiso-gen/exigences.jpg',
  certification: 'isoperf-gen/trophee.jpg',
  interne: 'sysqsse-gen/reunion.jpg',
  externe: 'metroiso-gen/audit.jpg',
  finances: 'isoperf-gen/meritante.jpg',
  conclusion: 'sysqsse-gen/accompagnement.jpg',
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
const OUTRO_AT = 330.6;
export const ORCHESTRE_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 77.3, n: '1', title: 'La stratégie', s: 'une vision claire', c: BLUE, g: 'stratégie', k: 'gyro', lab: 'MOUVEMENT 1 / 6'},
  {at: 101.1, n: '2', title: 'Une qualité parfaite', s: 'mécanique de précision', c: TEAL, g: 'qualité', k: 'gyro', lab: 'MOUVEMENT 2 / 6'},
  {at: 132.9, n: '3', title: 'La santé au travail', s: 'anticiper, ne pas attendre', c: RED, g: 'santé', k: 'gyro', lab: 'MOUVEMENT 3 / 6'},
  {at: 164.8, n: '4', title: 'L’environnement industriel', s: 'on change d’échelle', c: GREEN, g: 'environnement', k: 'gyro', lab: 'MOUVEMENT 4 / 6'},
  {at: 192.1, n: '5', title: 'Normes & certifications', s: 'la partition stricte', c: VIO, g: 'normes', k: 'gyro', lab: 'MOUVEMENT 5 / 6'},
  {at: 256.2, n: '6', title: 'Communiquer & économiser', s: 'protéger le portefeuille', c: GOLD, g: 'communication', k: 'gyro', lab: 'MOUVEMENT 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 309.3;
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

/* ═════════════ La ligne de métro QHSE (8 stations) ═════════════ */
const STATIONS = [
  {n: 1, l: 'Le chef d’orchestre', s: 'orchestre', at: 23.7},
  {n: 2, l: 'Un leader à la vision claire', s: 'vision', at: 83.94},
  {n: 3, l: 'Tracer les composants de A à Z', s: 'traçabilité', at: 116.66},
  {n: 4, l: 'Anticiper plutôt qu’attendre', s: 'prévention', at: 139.02},
  {n: 5, l: 'Prévenir les catastrophes industrielles', s: 'catastrophes', at: 177.42},
  {n: 6, l: 'La certification : les applaudissements', s: 'certification', at: 244.42},
  {n: 7, l: 'La double casquette du diplomate', s: 'diplomatie', at: 265.98},
  {n: 8, l: 'Des investissements qui rapportent gros', s: 'rentabilité', at: 306.86},
];
const Metro: React.FC = () => {
  const t = useT();
  const cur = STATIONS.reduce((a, x, k) => (t >= x.at ? k : a), -1);
  const sx = (k: number) => 80 + k * (800 / (STATIONS.length - 1));
  const mv = cur <= 0 ? 1 : prog(t, STATIONS[cur].at - 1.2, STATIONS[cur].at, easeInOut);
  const tx = cur < 0 ? sx(0) - 50 : cur === 0 ? sx(0) : lerp(sx(cur - 1), sx(cur), mv);
  return (
    <Abs x={60} y={1400} w={960} h={104} style={{zIndex: 30, background: 'rgba(255,255,255,0.95)', border: `4px solid ${INK}`, borderRadius: 20, boxShadow: `5px 5px 0 ${NAVY}`}}>
      <div style={{position: 'absolute', left: 80, right: 80, top: 30, height: 12, borderRadius: 6, background: `linear-gradient(90deg, ${BLUE}, ${TEAL}, ${RED}, ${GREEN}, ${VIO}, ${GOLD})`}} />
      {STATIONS.map((x, k) => { const on = k <= cur; return <div key={x.n} style={{position: 'absolute', left: sx(k) - 18, top: 18, width: 36, height: 36, borderRadius: 18, background: on ? `radial-gradient(circle at 35% 30%, #DDEBFF, ${BLUE})` : '#fff', border: `4px solid ${on ? INK : '#9FB3CC'}`, boxSizing: 'border-box', color: on ? '#fff' : INK, fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: k === cur ? `0 0 18px ${BLUE}` : 'none'}}>{x.n}</div>; })}
      {STATIONS.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: sx(k) - 62, width: 124, top: 62, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 14, color: k === cur ? BURG : DIM}}>{x.s}</div>)}
      {cur >= 0 && <Img src={staticFile('metroiso-gen/metro/rame-dessus.png')} style={{position: 'absolute', left: tx - 50, top: 18, width: 100, height: 34, filter: 'drop-shadow(0 0 8px rgba(120,180,255,0.9))'}} />}
    </Abs>
  );
};
/** Bandeau « station » qui claque à chaque arrêt de la rame. */
const StationBanner: React.FC = () => {
  const t = useT();
  const r = STATIONS.find((x) => t >= x.at - 0.1 && t < x.at + 3.2);
  if (!r) return null;
  const q = prog(t, r.at - 0.1, r.at + 0.35, easeOut);
  const out = prog(t, r.at + 2.8, r.at + 3.2, easeIn);
  return (
    <Abs x={40} y={1220} w={1000} h={160} style={{zIndex: 32, opacity: 1 - out, transform: `translateY(${(1 - q) * 120}px) scale(${0.8 + 0.2 * q})`}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: 30, background: `linear-gradient(110deg, #0B2147, ${NIGHT})`, border: `5px solid ${BLUE}`, boxShadow: `0 0 40px ${BLUE}AA`, display: 'flex', alignItems: 'center', gap: 22, padding: '0 26px', overflow: 'hidden'}}>
        <div style={{width: 110, height: 110, borderRadius: 55, background: `radial-gradient(circle at 35% 30%, #DDEBFF, ${BLUE} 60%, #0B2147)`, border: '5px solid #fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: `rotateY(${(1 - q) * 360}deg)`}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 13, color: '#fff'}}>STATION</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: '#fff', lineHeight: 0.9}}>{r.n}</div></div>
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE QHSE · STATION {r.n} / 8</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 34 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
        <div style={{position: 'absolute', top: 0, bottom: 0, width: 120, left: lerp(-160, 1100, prog(t, r.at + 0.3, r.at + 1.3)), background: 'linear-gradient(90deg, transparent, rgba(200,225,255,0.5), transparent)', transform: 'skewX(-20deg)'}} />
      </div>
    </Abs>
  );
};

/** Ondes sonores : cacophonie (chaos) → symphonie (harmonie). */
const Waves: React.FC<{w: number; h: number; harmony: number; c: string; n?: number; seed: string}> = ({w, h, harmony, c, n = 5, seed}) => {
  const t = useT();
  const paths = Array.from({length: n}, (_, k) => {
    let d = '';
    for (let x = 0; x <= w; x += 12) {
      const clean = Math.sin(x / 70 - t * 3) * 34;
      const noise = (random(`${seed}${k}${Math.floor(x / 12)}${Math.floor(t * 12)}`) - 0.5) * 120;
      const y = h / 2 + (k - (n - 1) / 2) * 10 * harmony + lerp(noise + Math.sin(x / (20 + k * 9) + k) * 30, clean, harmony);
      d += `${x === 0 ? 'M' : 'L'}${x},${y.toFixed(1)} `;
    }
    return d;
  });
  return <svg width={w} height={h} style={{position: 'absolute', left: 0, top: 0}}>{paths.map((d, k) => <path key={k} d={d} fill="none" stroke={c} strokeWidth={4} strokeOpacity={0.35 + 0.13 * k} strokeLinejoin="round" />)}</svg>;
};

/** Baguette de chef d'orchestre dessinée (pointe blanche, poignée liège). */
const Baton: React.FC<{size: number}> = ({size}) => (
  <div style={{position: 'relative', width: size, height: size}}>
    <div style={{position: 'absolute', left: size * 0.12, top: size * 0.47, width: size * 0.85, height: size * 0.05, borderRadius: size * 0.03, background: 'linear-gradient(90deg, #fff, #E8EDF3)', border: `${Math.max(2, size * 0.015)}px solid ${INK}`, transform: 'rotate(-35deg)', transformOrigin: '0 50%'}} />
    <div style={{position: 'absolute', left: size * 0.02, top: size * 0.42, width: size * 0.24, height: size * 0.14, borderRadius: size * 0.07, background: 'radial-gradient(circle at 35% 35%, #E9B872, #9A6224)', border: `${Math.max(2, size * 0.015)}px solid ${INK}`, transform: 'rotate(-35deg)'}} />
  </div>
);

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 190}}><Pic src={IMG.cover} ic="directeur" w={1080} h={760} pos="50% 35%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER} 9%, ${PAPER}00 16%, ${PAPER}00 34%, ${PAPER}DD 43%, ${PAPER} 48%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={900} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 24px', borderRadius: 6}}>LE RÔLE DU RESPONSABLE QHSE</div>
        <div style={{marginTop: 22}}><Board text="LE CHEF" at={-1} h={100} gap={4} c={NAVY} stag={0.02} /></div>
        <div style={{marginTop: 8}}><Board text="D’ORCHESTRE" at={-1} h={96} gap={3} c={BLUE} stag={0.02} /></div>
        <div style={{marginTop: 22, display: 'flex', justifyContent: 'center', gap: 12}}>{[{l: 'Q', c: BLUE}, {l: 'H', c: TEAL}, {l: 'S', c: RED}, {l: 'E', c: GREEN}].map((x) => <div key={x.l} style={{width: 92, height: 92, borderRadius: 22, background: x.c, border: `5px solid ${INK}`, boxShadow: `5px 5px 0 ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 58, color: '#fff'}}>{x.l}</div>)}</div>
      </Abs>
      <Abs x={60} y={1500} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO : le chef d'orchestre ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const ph = t < 19.5 ? 0 : t < 44.4 ? 1 : t < 63.0 ? 2 : 3;
  const rise = prog(t, 11.0, 12.8, easeOut);
  const harmony = t < 40.78 ? prog(t, 32.2, 38.0, easeInOut) : 1;
  return (
    <Out end={77.3}>
      {ph === 0 && (
        <>
          <HiLine words={['Le', 'responsable', 'QHSE']} mark={[1, 2]} at={3.0} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 30, display: 'flex', justifyContent: 'center', gap: 16}}>
              {[{l: 'lourd', a: 5.3}, {l: 'opaque', a: 6.62}].map((x) => <div key={x.l} style={{position: 'relative'}}><Pill at={x.a} c={DIM} size={34}>{x.l}</Pill><div style={{position: 'absolute', left: 10, right: 10, top: '50%'}}><Strike p={prog(t, 8.3, 8.9)} c={RED} /></div></div>)}
              <Pill at={9.06} c={GOLD} size={34}>fascinant !</Pill>
            </div>
            <div style={{position: 'absolute', left: 280, top: 160 + (1 - rise) * 500, width: 400, opacity: pop(t, 10.9)}}>
              <div style={{height: 110, background: NAVY, clipPath: 'polygon(50% 0, 100% 100%, 0 100%)'}} />
              <div style={{height: 70, background: '#fff', border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK}}>organisation moderne</div>
              <div style={{margin: '0 auto', width: 220, height: 420, background: `linear-gradient(90deg, #D7DEE8, #fff 45%, #C3CCD8)`, border: `5px solid ${INK}`, borderTop: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16}}>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 27, color: BLUE, textAlign: 'center', lineHeight: 1.1}}>responsable<br />QHSE</div>
                <F n="casque" size={110} />
              </div>
              <div style={{height: 40, background: INK, borderRadius: 8}} />
            </div>
            {t > 14.06 && <div style={{position: 'absolute', left: 700, top: 300}}><Pill at={14.06} c={NAVY} size={30}>le pilier</Pill></div>}
            {t > 15.0 && <div style={{position: 'absolute', left: 30, top: 420}}><Pill at={15.0} c={BURG} size={30}>le roc</Pill></div>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Le', 'chef', 'd’orchestre']} mark={[1, 2]} at={23.7} y={330} size={70} />
          <Shot src={IMG.orchestre} ic="directeur" x={60} y={440} w={960} h={360} at={19.8} c={BLUE} />
          <Abs x={60} y={830} w={960} h={540} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 26.0)}}>
            {t < 40.78 ? <>
              <div style={{position: 'absolute', left: 0, top: 120}}><Waves w={948} h={300} harmony={harmony} c={harmony > 0.5 ? '#6EE7B7' : '#FF8A8A'} seed="w" /></div>
              <div style={{position: 'absolute', left: 400, top: 160 + Math.sin(t * 5) * 30, transform: `rotate(${Math.sin(t * 4) * 25}deg)`, transformOrigin: '20% 80%'}}><Baton size={170} /></div>
              <div style={{position: 'absolute', left: 30, top: 26, display: 'flex', gap: 12}}>
                {[{l: 'violons', a: 28.9}, {l: 'trompettes', a: 29.6}].map((x) => <div key={x.l} style={{position: 'relative'}}><Pill at={x.a} c={DIM} size={26}>{x.l}</Pill><div style={{position: 'absolute', left: 8, right: 8, top: '50%'}}><Strike p={prog(t, 32.1, 32.6)} c={RED} /></div></div>)}
              </div>
              <div style={{position: 'absolute', left: 30, bottom: 26, display: 'flex', gap: 12}}><Pill at={33.5} c={BLUE} size={28}>procédures ultra complexes</Pill><Pill at={35.1} c={TEAL} size={28}>équipes entières</Pill></div>
              {t > 38.0 && <div style={{position: 'absolute', right: 30, top: 26}}><Pill at={38.02} c={GREEN} size={30}>symphonie</Pill></div>}
            </> : <>
              <div style={{position: 'absolute', left: 0, top: 0, width: 948, height: 264, borderBottom: '4px dashed #ffffff55'}}><Waves w={948} h={264} harmony={1} c="#6EE7B7" seed="a" /><div style={{position: 'absolute', left: 24, top: 18}}><Pill at={40.8} c={GREEN} size={26}>avec : symphonie</Pill></div></div>
              <div style={{position: 'absolute', left: 0, top: 268, width: 948, height: 264, transform: `translateX(${t > 42.6 && t < 43.6 ? Math.sin(t * 90) * 8 : 0}px)`}}><Waves w={948} h={264} harmony={0} c="#FF8A8A" seed="b" /><div style={{position: 'absolute', left: 24, top: 18}}><Pill at={42.66} c={RED} size={26}>sans : cacophonie</Pill></div></div>
            </>}
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 54.8 ? ['Q-H-S-E', '?'] : ['4', 'familles', 'd’instruments']} mark={t < 54.8 ? [0] : [0, 1]} at={t < 54.8 ? 49.74 : 54.82} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930}>
            {[{l: 'Q', w: 'Qualité', c: BLUE, ic: 'medaille', a: 51.82}, {l: 'H', w: 'Hygiène', c: TEAL, ic: 'savon', a: 52.2}, {l: 'S', w: 'Sécurité', c: RED, ic: 'casque', a: 53.22}, {l: 'E', w: 'Environnement', c: GREEN, ic: 'arbre', a: 53.9}].map((x, k) => {
              const f = prog(t, x.a - 0.1, x.a + 0.45, easeOut);
              return (
                <div key={x.l} style={{position: 'absolute', left: (k % 2) * 490, top: Math.floor(k / 2) * 330, width: 470, height: 310, perspective: 900}}>
                  <div style={{position: 'absolute', inset: 0, borderRadius: 30, background: f < 0.5 ? '#E3E8EF' : '#fff', border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${x.c}`, transform: `rotateX(${(1 - f) * 180}deg)`, display: 'flex', alignItems: 'center', gap: 20, padding: '0 30px', boxSizing: 'border-box'}}>
                    {f >= 0.5 && <><div style={{width: 150, height: 150, borderRadius: 28, background: x.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 110, color: '#fff', flexShrink: 0}}>{x.l}</div><div><F n={x.ic} size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: x.w.length > 10 ? 27 : 40, color: INK}}>{x.w}</div></div></>}
                  </div>
                </div>
              );
            })}
            {t > 54.8 && <div style={{position: 'absolute', left: 340, top: 230, width: 280, height: 140, borderRadius: 70, background: GOLD, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK, transform: `scale(${spring(t, 54.82)})`, zIndex: 2}}>4 familles</div>}
            <div style={{position: 'absolute', left: 0, right: 0, top: 700, height: 120, borderRadius: 24, background: '#fff', border: `5px solid ${INK}`, opacity: pop(t, 57.6), overflow: 'hidden'}}>
              <div style={{position: 'absolute', left: 30, right: 30, top: 54, height: 12, borderRadius: 6, background: '#E3E8EF'}}><div style={{width: `${prog(t, 57.6, 60.3) * 100}%`, height: '100%', borderRadius: 6, background: `linear-gradient(90deg, ${BLUE}, ${GREEN})`}} /></div>
              <div style={{position: 'absolute', left: 30, top: 12, fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM}}>l’entreprise tient la route…</div>
              <div style={{position: 'absolute', right: 30, top: 74, fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: GREEN, opacity: pop(t, 59.7)}}>sur le long terme</div>
            </div>
          </Abs>
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={['6', 'mouvements']} mark={[0, 1]} at={64.46} y={330} size={70} />
          <SearchOpen x={60} y={440} w={960} h={930} at={63.1} query="rôle du responsable QHSE" results={['Fiche de poste QHSE', 'Le rôle du responsable QHSE : 6 mouvements', 'Glossaire QHSE']} found={1} foundAt={64.4} clickAt={64.75} c={BLUE}>
            <div style={{position: 'absolute', inset: 0, padding: '28px 30px', display: 'flex', flexDirection: 'column', gap: 14}}>
              {[{l: 'la stratégie', a: 66.7, c: BLUE}, {l: 'une qualité parfaite', a: 68.1, c: TEAL}, {l: 'la santé au travail', a: 69.66, c: RED}, {l: 'l’environnement', a: 70.98, c: GREEN}, {l: 'le labyrinthe des normes', a: 71.94, c: VIO}, {l: 'communication & coûts', a: 73.5, c: GOLD}].map((x, k) => <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 18, opacity: pop(t, x.a), transform: `translateX(${(1 - pop(t, x.a)) * 60}px)`}}><div style={{width: 64, height: 64, borderRadius: 16, background: x.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `4px solid ${INK}`}}>{k + 1}</div><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK}}>{x.l}</span></div>)}
            </div>
          </SearchOpen>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 1 · STRATÉGIE ═════════════ */
const Strategie: React.FC = () => {
  const t = useT();
  const ph = t < 95.5 ? 0 : 1;
  const lines = prog(t, 86.8, 88.2, easeOut);
  const pulse = t > 87.98 ? 0.5 + 0.5 * Math.sin((t - 87.98) * 6) : 0;
  const NODES = [{l: 'qualité', c: BLUE, ic: 'medaille'}, {l: 'hygiène', c: TEAL, ic: 'savon'}, {l: 'sécurité', c: RED, ic: 'casque'}, {l: 'environnement', c: GREEN, ic: 'arbre'}, {l: 'procédures', c: VIO, ic: 'classeur'}, {l: 'équipes', c: GOLD, ic: 'equipe'}];
  return (
    <Out end={101.1}>
      <HiLine words={ph === 0 ? ['Une', 'vision', 'claire'] : ['Zéro', 'hasard']} mark={ph === 0 ? [1, 2] : [1]} at={ph === 0 ? 83.94 : 95.7} y={330} size={70} />
      <Shot src={IMG.strategie} ic="directeur" x={60} y={440} w={960} h={330} at={78.2} c={BLUE} pos="50% 5%" />
      {ph === 0 ? (
        <Abs x={60} y={800} w={960} h={570} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${BLUE}`, opacity: pop(t, 85.3), overflow: 'hidden'}}>
          <svg width={948} height={558} style={{position: 'absolute', left: 0, top: 0}}>
            {NODES.map((n, k) => { const a = (k / NODES.length) * Math.PI * 2 - Math.PI / 2; const x = 474 + Math.cos(a) * 340; const y = 250 + Math.sin(a) * 190; return <line key={k} x1={474} y1={250} x2={lerp(474, x, lines)} y2={lerp(250, y, lines)} stroke={n.c} strokeWidth={6 + pulse * 4} strokeLinecap="round" />; })}
          </svg>
          {NODES.map((n, k) => { const a = (k / NODES.length) * Math.PI * 2 - Math.PI / 2; const x = 474 + Math.cos(a) * 340; const y = 250 + Math.sin(a) * 190; return <div key={n.l} style={{position: 'absolute', left: x - 80, top: y - 44, width: 160, height: 88, borderRadius: 18, background: '#fff', border: `4px solid ${n.c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, opacity: pop(t, 86.0 + k * 0.12), boxShadow: pulse > 0.6 ? `0 0 18px ${n.c}` : 'none'}}><F n={n.ic} size={40} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: n.l.length > 10 ? 17 : 22, color: INK}}>{n.l}</span></div>; })}
          <div style={{position: 'absolute', left: 384, top: 160, width: 180, height: 180, borderRadius: 90, background: `radial-gradient(circle at 35% 30%, #DDEBFF, ${BLUE})`, border: `6px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + pulse * 0.06})`}}><Baton size={70} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff'}}>QHSE</div></div>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, display: 'flex', justifyContent: 'center', gap: 12}}><Pill at={90.98} c={RED} size={26}>garant de la sécurité</Pill><Pill at={92.9} c={NAVY} size={26}>stricte conformité</Pill></div>
        </Abs>
      ) : (
        <Abs x={60} y={800} w={960} h={570}>
          <div style={{position: 'absolute', left: 230, top: 10, width: 500, height: 500, borderRadius: 250, background: `conic-gradient(${BLUE} ${prog(t, 98.9, 100.4, easeOut) * 360}deg, #E3E8EF 0deg)`, border: `6px solid ${INK}`, opacity: pop(t, 95.8)}}>
            <div style={{position: 'absolute', inset: 60, borderRadius: '50%', background: '#fff', border: `5px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 96, color: INK, lineHeight: 1, whiteSpace: 'nowrap'}}>{t > 98.9 ? <Count n={100} a={98.9} b={100.4} suf=" %" /> : '0 %'}</div>
              <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: BLUE}}>stratégique</div>
            </div>
          </div>
          <div style={{position: 'absolute', left: 0, top: 140}}><Pill at={97.06} c={NAVY} size={28}>chaque décision</Pill></div>
          <div style={{position: 'absolute', right: 0, top: 300}}><Pill at={98.06} c={TEAL} size={28}>chaque politique</Pill></div>
        </Abs>
      )}
    </Out>
  );
};

/* ═════════════ 2 · QUALITÉ ═════════════ */
const Qualite: React.FC = () => {
  const t = useT();
  const ph = t < 116.3 ? 0 : t < 125.3 ? 1 : 2;
  const run = prog(t, 117.6, 119.2, easeInOut);
  const shrink = prog(t, 130.18, 131.4, easeInOut);
  return (
    <Out end={132.9}>
      {ph === 0 && (
        <>
          <HiLine words={t < 113.5 ? ['Une', 'qualité', 'parfaite'] : ['Mécanique', 'de', 'précision']} mark={t < 113.5 ? [1, 2] : [0, 2]} at={t < 113.5 ? 104.14 : 113.87} y={330} size={66} />
          <Shot src={IMG.qualite} ic="loupe" x={60} y={440} w={960} h={430} at={101.8} c={TEAL} pos="50% 30%">
            <LoupeSweep x0={80} y0={80} x1={560} y1={160} a={106.4} b={109.4} size={220} />
          </Shot>
          <Abs x={60} y={900} w={960} h={470} style={{display: 'flex', gap: 20}}>
            <div style={{flex: 1, borderRadius: 26, background: '#fff', border: `5px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, opacity: pop(t, 110.4), position: 'relative'}}>
              <div style={{width: 120, height: 120, borderRadius: 20, border: `8px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 90, fontWeight: 900, color: GREEN}}>✓</div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>une case à cocher</div>
              {t > 113.06 && <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 300, fontWeight: 900, color: RED, opacity: 0.85 * pop(t, 113.06), transform: `scale(${spring(t, 113.06)})`}}>✕</div>}
            </div>
            <div style={{flex: 1, borderRadius: 26, background: NIGHT, border: `5px solid ${INK}`, position: 'relative', opacity: pop(t, 113.87), overflow: 'hidden'}}>
              {[{x: 60, y: 60, s: 170, d: 1}, {x: 210, y: 170, s: 130, d: -1.3}, {x: 80, y: 250, s: 110, d: 1.6}].map((g, k) => <div key={k} style={{position: 'absolute', left: g.x, top: g.y, transform: `rotate(${(t - 113.87) * 90 * g.d}deg)`}}><F n="engrenage" size={g.s} /></div>)}
              <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#9CE6D9'}}>précision</div>
            </div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Tracer', 'de', 'A', 'à', 'Z']} mark={[0, 2, 4]} at={116.66} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={200} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${TEAL}`, opacity: pop(t, 116.5)}}>
            <div style={{position: 'absolute', left: 120, right: 120, top: 92, height: 14, borderRadius: 7, background: '#E3E8EF'}}><div style={{width: `${run * 100}%`, height: '100%', borderRadius: 7, background: TEAL}} /></div>
            {['A', 'Z'].map((l, k) => <div key={l} style={{position: 'absolute', left: k ? 830 : 30, top: 50, width: 90, height: 90, borderRadius: 45, background: k && run < 1 ? '#fff' : TEAL, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: k && run < 1 ? INK : '#fff'}}>{l}</div>)}
            {Array.from({length: 6}, (_, k) => <div key={k} style={{position: 'absolute', left: 190 + k * 110, top: 80, width: 38, height: 38, borderRadius: 8, background: run * 6 > k ? TEAL : '#fff', border: `4px solid ${INK}`, transform: `rotate(45deg)`}} />)}
            <div style={{position: 'absolute', left: lerp(150, 790, run), top: 30, opacity: run > 0 && run < 1 ? 1 : 0}}><F n="colis" size={60} /></div>
          </Abs>
          <Abs x={60} y={670} w={960} h={700} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20}}>
            {[{l: 'tracer les composants', ic: 'loupe', c: TEAL, a: 116.66}, {l: 'optimiser l’efficacité', ic: 'engrenage', c: BLUE, a: 119.22}, {l: 'sûreté alimentaire', ic: 'assiette', c: GREEN, a: 121.46}, {l: 'satisfaire le client', ic: 'coeur', c: RED, a: 123.1}].map((x) => <div key={x.l} style={{borderRadius: 26, background: '#fff', border: `5px solid ${INK}`, boxShadow: `7px 7px 0 ${x.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: pop(t, x.a), transform: `translateY(${(1 - pop(t, x.a)) * 60}px)`}}><F n={x.ic} size={120} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, textAlign: 'center', padding: '0 12px'}}>{x.l}</div></div>)}
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Traçabilité', 'béton']} mark={[0, 1]} at={126.82} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${TEAL}`, opacity: pop(t, 125.5)}}>
            <div style={{position: 'absolute', left: 40, top: 40, display: 'flex', alignItems: 'center', gap: 16}}><F n="colis" size={80} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK}}>rappel de produit</div></div>
            <div style={{position: 'absolute', left: 40, top: 200, fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM}}>durée du rappel</div>
            <div style={{position: 'absolute', left: 40, top: 250, width: lerp(860, 140, shrink), height: 120, borderRadius: 20, background: shrink < 0.5 ? RED : GREEN, border: `5px solid ${INK}`, opacity: pop(t, 127.6), display: 'flex', alignItems: 'center', paddingLeft: 24, boxSizing: 'border-box', overflow: 'hidden'}}><F n={shrink < 0.5 ? 'calendrier' : 'chrono'} size={70} /></div>
            <div style={{position: 'absolute', left: 40, top: 400, fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: RED, opacity: pop(t, 128.3) * (1 - shrink)}}>plusieurs semaines</div>
            <div style={{position: 'absolute', left: 40, top: 400, fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: GREEN, opacity: shrink}}>quelques heures</div>
            <div style={{position: 'absolute', left: 40, right: 40, top: 520, height: 8, background: '#E3E8EF', borderRadius: 4}} />
            <div style={{position: 'absolute', left: 0, right: 0, top: 600, display: 'flex', justifyContent: 'center'}}><Pill at={126.82} c={TEAL} size={34}>une traçabilité béton</Pill></div>
            {t > 131.83 && <Stamp at={131.83} c={GOLD} text="C’est dingue !" x={300} y={700} rot={-6} size={56} />}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 3 · SANTÉ AU TRAVAIL ═════════════ */
const Sante: React.FC = () => {
  const t = useT();
  const ph = t < 142.4 ? 0 : t < 154.2 ? 1 : 2;
  const fix = prog(t, 158.2, 160.4, easeInOut);
  const blips = [{x: 150, y: -80, a: 139.4}, {x: -120, y: 60, a: 140.2}, {x: 60, y: 150, a: 141.0}, {x: -40, y: -170, a: 141.6}];
  return (
    <Out end={164.8}>
      {ph === 0 && (
        <>
          <HiLine words={t < 138.9 ? ['Santé', 'au', 'travail'] : ['L’anticipation']} mark={t < 138.9 ? [0, 2] : [0]} at={t < 138.9 ? 135.58 : 139.02} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 130, top: 20, width: 700, height: 700, borderRadius: 350, background: `radial-gradient(circle, #0E3B2E, ${NIGHT} 70%)`, border: `6px solid ${INK}`, overflow: 'hidden', opacity: pop(t, 133.6)}}>
              {[1, 2, 3].map((k) => <div key={k} style={{position: 'absolute', left: 350 - k * 110, top: 350 - k * 110, width: k * 220, height: k * 220, borderRadius: '50%', border: '2px solid #34D39966'}} />)}
              <div style={{position: 'absolute', left: 350, top: 0, width: 2, height: 700, background: '#34D39944'}} /><div style={{position: 'absolute', top: 350, left: 0, height: 2, width: 700, background: '#34D39944'}} />
              <div style={{position: 'absolute', inset: 0, background: `conic-gradient(from ${(t * 120) % 360}deg, #34D399AA 0deg, transparent 50deg)`, borderRadius: '50%'}} />
              {blips.map((b, k) => <div key={k} style={{position: 'absolute', left: 350 + b.x - 16, top: 350 + b.y - 16, width: 32, height: 32, borderRadius: 16, background: ORANGE, boxShadow: `0 0 20px ${ORANGE}`, opacity: pop(t, b.a), transform: `scale(${1 + 0.3 * Math.sin(t * 8 + k)})`}} />)}
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center', gap: 20}}>
              <div style={{position: 'relative'}}><Pill at={139.86} c={DIM} size={32}>attendre</Pill><div style={{position: 'absolute', left: 10, right: 10, top: '50%'}}><Strike p={prog(t, 141.3, 141.8)} c={RED} /></div></div>
              <Pill at={141.4} c={GREEN} size={32}>anticiper</Pill>
            </div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Une', 'montagne', 'de', 'risques']} mark={[1, 3]} at={144.34} y={330} size={66} />
          <Shot src={IMG.sante} ic="casque" x={60} y={440} w={960} h={320} at={142.7} c={RED} />
          <Abs x={60} y={790} w={960} h={580}>
            {[{l: 'accidents du travail', s: 'soudains', ic: 'collision', c: RED, a: 146.66, x: 0, y: 330}, {l: 'maladies professionnelles', s: 'sur le long terme', ic: 'stethoscope', c: ORANGE, a: 148.34, x: 490, y: 330}, {l: 'risques psychosociaux', s: 'on l’oublie souvent', ic: 'cerveau', c: VIO, a: 152.5, x: 245, y: 20}].map((x) => <div key={x.l} style={{position: 'absolute', left: x.x, top: x.y, width: 470, height: 230, borderRadius: 26, background: '#fff', border: `5px solid ${INK}`, boxShadow: `7px 7px 0 ${x.c}`, display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px', boxSizing: 'border-box', opacity: pop(t, x.a), transform: `translateY(${(1 - pop(t, x.a)) * -80}px) scale(${x.ic === 'cerveau' && t > 152.5 ? 1 + 0.04 * Math.sin((t - 152.5) * 6) : 1})`}}><F n={x.ic} size={100} /><div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, lineHeight: 1.1}}>{x.l}</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: x.c, marginTop: 6}}>{x.s}</div></div></div>)}
            <LoupeSweep x0={600} y0={300} x1={330} y1={30} a={151.0} b={152.6} size={200} />
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Revoir', 'l’ergonomie']} mark={[1]} at={158.18} y={330} size={70} />
          <Shot src={IMG.ergonomie} ic="ouvrier" x={60} y={440} w={960} h={320} at={154.5} c={RED} />
          <Abs x={60} y={790} w={960} h={580} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${GREEN}`, opacity: pop(t, 155.3), overflow: 'hidden'}}>
            <svg width={948} height={568} style={{position: 'absolute', left: 0, top: 0}}>
              <circle cx={lerp(380, 474, fix)} cy={lerp(150, 90, fix)} r={44} fill="none" stroke={INK} strokeWidth={10} />
              <path d={`M ${lerp(400, 474, fix)} ${lerp(196, 136, fix)} Q ${lerp(560, 484, fix)} ${lerp(250, 240, fix)} ${474} ${360}`} fill="none" stroke={fix < 0.5 ? RED : GREEN} strokeWidth={16} strokeLinecap="round" />
              <path d="M 474 360 L 420 500 M 474 360 L 528 500" stroke={INK} strokeWidth={12} strokeLinecap="round" />
              <path d={`M ${lerp(450, 480, fix)} ${lerp(230, 190, fix)} L ${lerp(360, 380, fix)} ${lerp(330, 280, fix)}`} stroke={INK} strokeWidth={10} strokeLinecap="round" />
            </svg>
            <div style={{position: 'absolute', left: 40, top: 40, opacity: 1 - fix}}><F n="courbe-dos" size={110} /></div>
            <div style={{position: 'absolute', right: 40, top: 40, opacity: fix}}><F n="pouce" size={110} /></div>
            <div style={{position: 'absolute', left: 30, bottom: 30, display: 'flex', gap: 12}}>{[{l: 'douleurs', a: 162.82}, {l: 'blessures', a: 163.6}].map((x) => <div key={x.l} style={{position: 'relative'}}><Pill at={x.a} c={RED} size={28}>{x.l}</Pill><div style={{position: 'absolute', left: 8, right: 8, top: '50%'}}><Strike p={prog(t, x.a + 0.4, x.a + 0.8)} c={INK} /></div></div>)}</div>
            <div style={{position: 'absolute', right: 30, bottom: 30}}><Pill at={160.42} c={GREEN} size={28}>solution directe</Pill></div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 4 · ENVIRONNEMENT ═════════════ */
const Envir: React.FC = () => {
  const t = useT();
  const ph = t < 173.6 ? 0 : t < 183.6 ? 1 : 2;
  const zoom = lerp(5, 1, prog(t, 166.2, 169.6, easeInOut));
  const flash = (a: number) => (t > a ? (Math.floor((t - a) * 4) % 2 === 0 ? 1 : 0.35) : 0);
  return (
    <Out end={192.1}>
      {ph === 0 && (
        <>
          <HiLine words={['On', 'change', 'd’échelle']} mark={[1, 2]} at={166.22} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930} style={{background: `linear-gradient(180deg, #DFF3FF, #F1FBF4)`, border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 165.2)}}>
            <div style={{position: 'absolute', left: 0, top: 0, width: 948, height: 918, transform: `scale(${zoom})`, transformOrigin: '300px 640px'}}>
              <div style={{position: 'absolute', left: 260, top: 600}}><F n="poubelle" size={80} /></div>
              <div style={{position: 'absolute', left: 340, top: 470}}><F n="usine" size={260} /></div>
              <div style={{position: 'absolute', left: 80, top: 520}}><F n="arbre" size={160} /></div>
              <div style={{position: 'absolute', left: 660, top: 540}}><F n="maison" size={140} /></div>
              <div style={{position: 'absolute', left: 700, top: 120}}><F n="soleil" size={150} /></div>
              <div style={{position: 'absolute', left: 0, right: 0, top: 760, height: 160, background: '#9BD08A'}} />
            </div>
            <div style={{position: 'absolute', left: 30, top: 30}}><Pill at={167.58} c={GREEN} size={30}>environnement industriel</Pill></div>
            {t > 173.06 && <Stamp at={173.06} c={RED} text="colossaux" x={330} y={300} rot={-8} size={70} />}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Prévenir', 'les', 'catastrophes']} mark={[0, 2]} at={177.42} y={330} size={64} />
          <Shot src={IMG.environnement} ic="arbre" x={60} y={440} w={960} h={330} at={173.8} c={GREEN} />
          <div style={{position: 'absolute', left: 60, top: 790}}><div style={{position: 'relative'}}><Pill at={174.66} c={DIM} size={28}>trier ses déchets à la cantine</Pill><div style={{position: 'absolute', left: 10, right: 10, top: '50%'}}><Strike p={prog(t, 176.3, 176.8)} c={RED} /></div></div></div>
          <Abs x={60} y={870} w={960} h={500} style={{display: 'flex', gap: 18}}>
            {[{l: 'explosions', ic: 'bombe', a: 179.3}, {l: 'pollutions chimiques', ic: 'eprouvette', a: 180.26}, {l: 'incendies majeurs', ic: 'feu', a: 182.54}].map((x) => <div key={x.l} style={{flex: 1, borderRadius: 26, background: NIGHT, border: `5px solid ${INK}`, boxShadow: `0 0 ${30 * flash(x.a)}px ${RED}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, opacity: pop(t, x.a), position: 'relative', overflow: 'hidden'}}>
              <div style={{position: 'absolute', top: 18, width: 60, height: 30, borderRadius: '30px 30px 6px 6px', background: RED, opacity: flash(x.a), boxShadow: `0 0 40px ${RED}`}} />
              <F n={x.ic} size={130} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff', textAlign: 'center', padding: '0 10px'}}>{x.l}</div>
            </div>)}
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 185.3 ? ['Risques', 'extrêmes'] : ['C’est', 'vital']} mark={t < 185.3 ? [0, 1] : [1]} at={t < 185.3 ? 183.66 : 185.38} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930}>
            {[{l: 'populations locales', ic: 'equipe', c: GOLD, a: 190.67, r: 440}, {l: 'environnement', ic: 'arbre', c: GREEN, a: 189.54, r: 320}, {l: 'entreprise', ic: 'usine', c: BLUE, a: 187.66, r: 200}].map((x) => <div key={x.l} style={{position: 'absolute', left: 480 - x.r, top: 450 - x.r, width: x.r * 2, height: x.r * 2, borderRadius: '50%', background: `${x.c}22`, border: `6px solid ${x.c}`, transform: `scale(${pop(t, x.a)})`, display: 'flex', justifyContent: 'center'}}><div style={{marginTop: x.r === 200 ? 300 : 14, display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: `4px solid ${x.c}`, borderRadius: 30, padding: '4px 16px', height: 60}}><F n={x.ic} size={46} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK}}>{x.l}</span></div></div>)}
            <div style={{position: 'absolute', left: 390, top: 300, transform: `scale(${spring(t, 185.38)})`}}><F n="bouclier" size={180} /></div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 5 · NORMES & CERTIFICATIONS ═════════════ */
const Normes: React.FC = () => {
  const t = useT();
  const ph = t < 203.3 ? 0 : t < 218.2 ? 1 : t < 240.3 ? 2 : 3;
  const lock = prog(t, 212.4, 212.9, easeIn);
  return (
    <Out end={256.2}>
      {ph === 0 && (
        <>
          <HiLine words={['La', 'partition', 'stricte']} mark={[1, 2]} at={196.26} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930} style={{background: '#FFFDF6', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${VIO}`, opacity: pop(t, 192.6), overflow: 'hidden'}}>
            {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{position: 'absolute', left: 40, right: 40, top: 200 + k * 50, height: 4, background: INK, transform: `scaleX(${prog(t, 192.7 + k * 0.1, 193.5 + k * 0.1)})`, transformOrigin: '0 50%'}} />)}
            <div style={{position: 'absolute', left: 40, top: 150, fontSize: 280, lineHeight: 1, fontFamily: 'serif', color: INK, opacity: pop(t, 193.0)}}>𝄞</div>
            {[{l: 'normes', a: 193.06, x: 230, y: 250}, {l: 'procédures', a: 193.7, x: 460, y: 200}, {l: 'certifications', a: 194.6, x: 700, y: 300}].map((n) => <div key={n.l} style={{position: 'absolute', left: n.x, top: n.y - (1 - pop(t, n.a)) * 120, opacity: pop(t, n.a)}}><div style={{width: 56, height: 44, borderRadius: '50%', background: VIO, transform: 'rotate(-20deg)'}} /><div style={{position: 'absolute', left: 50, top: -130, width: 6, height: 150, background: VIO}} /><div style={{position: 'absolute', left: -40, top: 60, width: 160, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: VIO}}>{n.l}</div></div>)}
            <div style={{position: 'absolute', left: 0, right: 0, top: 560, display: 'flex', justifyContent: 'center'}}><Pill at={199.62} c={NAVY} size={32}>à suivre à la lettre</Pill></div>
            {t > 201.98 && <Stamp at={201.98} c={RED} text="zéro improvisation" x={220} y={680} rot={-6} size={54} />}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 212.4 ? ['Des', 'textes', 'denses'] : ['Pas', 'négociable']} mark={t < 212.4 ? [1, 2] : [0, 1]} at={t < 212.4 ? 203.38 : 212.58} y={330} size={70} />
          <Shot src={IMG.normes} ic="classeur" x={60} y={440} w={960} h={330} at={203.6} c={VIO} />
          <Abs x={60} y={800} w={960} h={570}>
            <div style={{display: 'flex', justifyContent: 'center', gap: 24}}>
              {[{l: 'État', a: 206.38, c: NAVY, ic: 'temple'}, {l: 'ISO', a: 208.46, c: BLUE, ic: 'globe'}, {l: 'AFNOR', a: 209.2, c: VIO, ic: 'diplome'}].map((x) => <div key={x.l} style={{width: 280, height: 220, borderRadius: 26, background: '#fff', border: `5px solid ${x.c}`, boxShadow: `6px 6px 0 ${x.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, transform: `scale(${t > x.a ? spring(t, x.a) : 0})`}}><F n={x.ic} size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>{x.l}</div></div>)}
            </div>
            <div style={{position: 'absolute', left: 60, top: 270, width: 200, height: 220, opacity: pop(t, 212.0)}}>
              <div style={{position: 'absolute', left: 40, top: lerp(-30, 0, lock), width: 120, height: 120, borderRadius: '60px 60px 0 0', border: `16px solid ${INK}`, borderBottom: 'none', boxSizing: 'border-box'}} />
              <div style={{position: 'absolute', left: 10, top: 100, width: 180, height: 120, borderRadius: 20, background: lock >= 1 ? RED : GOLD, border: `6px solid ${INK}`}} />
            </div>
            <div style={{position: 'absolute', left: 300, top: 290, display: 'flex', flexDirection: 'column', gap: 16}}><Pill at={213.86} c={RED} size={32}>prérequis absolu</Pill><Pill at={217.3} c={GREEN} size={32}>en toute légalité</Pill></div>
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['De', 'la', 'théorie', 'à', 'la', 'pratique']} mark={[2, 5]} at={219.46} y={330} size={60} />
          <Abs x={60} y={440} w={960} h={930}>
            {[{l: 'réglementations ultra-larges', w: 960, c: NAVY, a: 221.98, ic: 'livres'}, {l: '1 · évaluer l’environnement', w: 820, c: BLUE, a: 227.02, ic: 'loupe'}, {l: '2 · intégrer les besoins de chacun', w: 700, c: VIO, a: 229.26, ic: 'equipe'}, {l: '3 · procédures hyper ciblées', w: 660, c: TEAL, a: 235.62, ic: 'cible'}].map((x, k) => <div key={x.l} style={{position: 'absolute', left: (960 - x.w) / 2, top: k * 150, width: x.w, height: 128, borderRadius: 22, background: x.c, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', gap: 14, padding: '0 22px', boxSizing: 'border-box', opacity: pop(t, x.a), transform: `translateY(${(1 - pop(t, x.a)) * -50}px)`}}><F n={x.ic} size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: x.l.length > 28 ? 26 : 30, color: '#fff'}}>{x.l}</span></div>)}
            {t > 232.4 && <div style={{position: 'absolute', left: 720, top: 300}}><Pill at={232.42} c={ORANGE} size={26}>handicap</Pill></div>}
            <div style={{position: 'absolute', left: 140, top: 640, width: 680, height: 260, borderRadius: 28, background: '#fff', border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${GREEN}`, display: 'flex', alignItems: 'center', gap: 20, padding: '0 30px', boxSizing: 'border-box', opacity: pop(t, 236.42), transform: `scale(${t > 236.42 ? spring(t, 236.42) : 0.6})`}}>
              <F n="porte" size={130} />
              <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: GREEN}}>PLAN D’ÉVACUATION D’URGENCE</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK, lineHeight: 1.1}}>pensé pour toutes les mobilités</div></div>
            </div>
          </Abs>
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={t < 247.4 ? ['La', 'certification'] : ['Les', 'applaudissements']} mark={t < 247.4 ? [1] : [1]} at={t < 247.4 ? 244.42 : 247.66} y={330} size={66} />
          <Shot src={IMG.certification} ic="diplome" x={60} y={440} w={960} h={460} at={240.6} c={VIO} blinds />
          {t > 247.66 && t < 251 && Array.from({length: 12}, (_, k) => <div key={k} style={{position: 'absolute', left: 120 + random(`cl${k}`) * 840, top: 900 - ((t - 247.66) * 300 + random(`cy${k}`) * 200) % 460, opacity: 0.9, zIndex: 5}}><F n={k % 2 ? 'etoile' : 'main-levee'} size={56} /></div>)}
          <Abs x={60} y={930} w={960} h={440} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${GOLD}`, opacity: pop(t, 249.8)}}>
            <div style={{position: 'absolute', left: 30, top: 20, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>la récompense finale booste…</div>
            {[{l: 'réputation', a: 252.18, c: BLUE}, {l: 'valeur', a: 252.98, c: GREEN}, {l: 'crédibilité', a: 253.6, c: GOLD}].map((x, k) => <div key={x.l} style={{position: 'absolute', left: 90 + k * 290, bottom: 70, width: 200, height: 300 * prog(t, x.a, x.a + 0.8, easeOut), background: x.c, border: `5px solid ${INK}`, borderRadius: '16px 16px 0 0'}}><div style={{position: 'absolute', top: -40, left: 70}}><F n="hausse" size={50} /></div></div>)}
            {[{l: 'réputation'}, {l: 'valeur'}, {l: 'crédibilité'}].map((x, k) => <div key={x.l} style={{position: 'absolute', left: 60 + k * 290, width: 260, bottom: 22, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK}}>{x.l}</div>)}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 6 · COMMUNIQUER & PROTÉGER LE PORTEFEUILLE ═════════════ */
const Comm: React.FC = () => {
  const t = useT();
  const ph = t < 289.3 ? 0 : 1;
  const flip = prog(t, 276.3, 277.3, easeInOut);
  const fall = prog(t, 296.9, 298.4, easeInOut);
  const up = prog(t, 306.86, 308.6, easeOut);
  return (
    <Out end={ALLDONE}>
      {ph === 0 && (
        <>
          <HiLine words={t < 287.4 ? ['La', 'double', 'casquette'] : ['Un', 'vrai', 'diplomate']} mark={t < 287.4 ? [1, 2] : [2]} at={t < 287.4 ? 265.98 : 287.54} y={330} size={68} />
          <Abs x={60} y={440} w={960} h={930} style={{perspective: 1800, opacity: pop(t, 262.9)}}>
            <div style={{position: 'absolute', inset: 0, transform: `rotateY(${flip * 180}deg)`, transformStyle: 'preserve-3d'}}>
              <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: 30, background: '#fff', border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${GOLD}`, overflow: 'hidden'}}>
                <div style={{position: 'absolute', left: 0, top: 0}}><Pic src={IMG.interne} ic="equipe" w={948} h={420} /></div>
                <div style={{position: 'absolute', left: 30, top: 30, background: GOLD, color: INK, fontFamily: sansFont, fontWeight: 900, fontSize: 40, padding: '6px 22px', borderRadius: 14, border: `4px solid ${INK}`, opacity: pop(t, 269.9)}}>EN INTERNE</div>
                <div style={{position: 'absolute', left: 30, right: 30, top: 450, display: 'flex', flexDirection: 'column', gap: 18}}>
                  {[{l: 'les équipes', ic: 'equipe', a: 271.78}, {l: 'les représentants du personnel', ic: 'megaphone', a: 272.6}, {l: 'sensibiliser au bon comportement', ic: 'ampoule', a: 273.9}].map((x) => <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 18, opacity: pop(t, x.a), transform: `translateX(${(1 - pop(t, x.a)) * -60}px)`}}><F n={x.ic} size={80} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK}}>{x.l}</span></div>)}
                </div>
              </div>
              <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', borderRadius: 30, background: '#fff', border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${NAVY}`, overflow: 'hidden'}}>
                <div style={{position: 'absolute', left: 0, top: 0}}><Pic src={IMG.externe} ic="poignee" w={948} h={380} /></div>
                <div style={{position: 'absolute', left: 30, top: 30, background: NAVY, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 40, padding: '6px 22px', borderRadius: 14, border: '4px solid #fff'}}>EN EXTERNE</div>
                <div style={{position: 'absolute', left: 30, right: 30, top: 410, display: 'flex', gap: 12}}>{[{l: 'rassurer', a: 279.78}, {l: 'prouver', a: 280.86}, {l: 'négocier', a: 281.6}].map((x) => <Pill key={x.l} at={x.a} c={GOLD} size={30}>{x.l}</Pill>)}</div>
                <div style={{position: 'absolute', left: 30, right: 30, top: 520, display: 'flex', gap: 16}}>
                  {[{l: 'fournisseurs', ic: 'camion', a: 282.7}, {l: 'clients', ic: 'colis', a: 283.62}, {l: 'autorités', ic: 'juge', a: 284.9}].map((x) => <div key={x.l} style={{flex: 1, height: 200, borderRadius: 22, background: '#F4F6FA', border: `4px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: pop(t, x.a)}}><F n={x.ic} size={90} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK}}>{x.l}</span></div>)}
                </div>
                {t > 287.54 && <div style={{position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center'}}><div style={{display: 'flex', alignItems: 'center', gap: 14, background: NAVY, borderRadius: 40, padding: '10px 30px', transform: `scale(${spring(t, 287.54)})`}}><F n="poignee" size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: '#fff'}}>diplomate au quotidien</span></div></div>}
              </div>
            </div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 305.0 ? ['Protéger', 'le', 'portefeuille'] : ['Des', 'investissements', 'rentables']} mark={t < 305.0 ? [0, 2] : [1, 2]} at={t < 305.0 ? 290.7 : 306.86} y={330} size={52} />
          <Abs x={60} y={440} w={960} h={930} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${GOLD}`, opacity: pop(t, 289.6), overflow: 'hidden'}}>
            {t < 305.0 ? <>
              <div style={{position: 'absolute', left: 40, top: 30, fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM}}>impact direct sur les finances</div>
              <div style={{position: 'absolute', left: 40, top: 80, display: 'flex', alignItems: 'center', gap: 14, opacity: pop(t, 296.86)}}><F n="baisse" size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 42, color: INK}}>coûts de non-qualité</span></div>
              {[0, 1, 2, 3].map((k) => <div key={k} style={{position: 'absolute', left: 90 + k * 210, bottom: 330, width: 150, height: lerp(380, 380 - k * 90 - 40, fall) * pop(t, 295.9 + k * 0.1), background: k === 0 ? RED : lerp(0, 1, fall) > 0.5 ? (k === 3 ? GREEN : ORANGE) : RED, border: `5px solid ${INK}`, borderRadius: '14px 14px 0 0'}} />)}
              <div style={{position: 'absolute', left: 40, right: 40, bottom: 320, height: 8, background: INK, borderRadius: 4}} />
              <div style={{position: 'absolute', left: 40, right: 40, bottom: 40, display: 'flex', flexDirection: 'column', gap: 16}}>
                {[{l: 'moins de produits défectueux renvoyés', ic: 'colis', a: 298.5}, {l: 'coût humain et financier des accidents évité', ic: 'pansement', a: 301.86}].map((x) => <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 16, height: 110, borderRadius: 20, background: '#F4F6FA', border: `4px solid ${INK}`, padding: '0 20px', opacity: pop(t, x.a)}}><F n={x.ic} size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK, flex: 1}}>{x.l}</span><F n="baisse" size={60} /></div>)}
              </div>
            </> : <>
              <svg width={948} height={918} style={{position: 'absolute', left: 0, top: 0}}>
                <path d="M 60 760 C 260 740, 400 620, 520 480 S 780 180, 890 120" fill="none" stroke={GREEN} strokeWidth={14} strokeLinecap="round" strokeDasharray={1200} strokeDashoffset={1200 * (1 - up)} />
              </svg>
              <div style={{position: 'absolute', left: lerp(40, 830, up), top: lerp(700, 70, up)}}><F n="argent" size={90} /></div>
              <div style={{position: 'absolute', left: 40, top: 40, display: 'flex', flexDirection: 'column', gap: 14}}><Pill at={305.14} c={RED} size={30}>sécurité</Pill><Pill at={305.8} c={BLUE} size={30}>qualité</Pill></div>
              {t > 307.86 && <Stamp at={307.86} c={GREEN} text="ça rapporte gros" x={260} y={420} rot={-6} size={56} />}
            </>}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ CONCLUSION : le gardien de l'équilibre ═════════════ */
const Conclusion: React.FC = () => {
  const t = useT();
  const ph = t < 319.4 ? 0 : 1;
  const gather = prog(t, 316.4, 317.6, easeInOut);
  return (
    <Out end={OUTRO_AT}>
      {ph === 0 && (
        <>
          <HiLine words={['Sans', 'chef', 'd’orchestre', '?']} mark={[1, 2]} at={312.74} y={330} size={64} />
          <Abs x={60} y={440} w={960} h={930} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 309.6)}}>
            {SECT.map((x, k) => {
              const a = (k / 6) * Math.PI * 2 + t * 0.6;
              const sx0 = 474 + (random(`sx${k}`) - 0.5) * 760; const sy0 = 460 + (random(`sy${k}`) - 0.5) * 700;
              const ox = 474 + Math.cos(a) * 300; const oy = 430 + Math.sin(a) * 300;
              return <div key={k} style={{position: 'absolute', left: lerp(sx0, ox, gather) - 60, top: lerp(sy0, oy, gather) - 40, width: 120, height: 80, borderRadius: 18, background: x.c, border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 18, color: '#fff', textAlign: 'center', opacity: pop(t, 310 + k * 0.1)}}>{x.g}</div>;
            })}
            <div style={{position: 'absolute', left: 394, top: 350, opacity: gather}}><Baton size={160} /></div>
            {t > 316.5 && <div style={{position: 'absolute', left: 0, right: 0, top: 30, textAlign: 'center'}}><Pill at={316.5} c={GREEN} size={32}>l’harmonie</Pill></div>}
            {t > 317.9 && [0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: k === 1 ? 760 : 40 + k * 30, top: 760 - k * 250 + (k === 1 ? 300 : 0), opacity: pop(t, 317.9 + k * 0.2), transform: `translateX(${Math.sin(t * 3 + k) * 10}px)`}}><F n={k === 1 ? 'eclair' : 'vent'} size={90} /></div>)}
            {t > 317.9 && <div style={{position: 'absolute', left: 0, right: 0, bottom: 30, textAlign: 'center'}}><Pill at={317.9} c={RED} size={28}>les risques de demain</Pill></div>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Le', 'gardien', 'de', 'l’équilibre']} mark={[1, 3]} at={319.6} y={330} size={64} />
          <Shot src={IMG.conclusion} ic="equipe" x={60} y={440} w={960} h={380} at={319.6} c={BLUE} />
          <Abs x={60} y={850} w={960} h={520}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center'}}><div style={{position: 'relative'}}><Pill at={321.0} c={DIM} size={30}>simple contrôleur de règles</Pill><div style={{position: 'absolute', left: 10, right: 10, top: '50%'}}><Strike p={prog(t, 323.0, 323.5)} c={RED} /></div></div></div>
            <div style={{position: 'absolute', left: 470, top: 130, width: 20, height: 260, background: INK, borderRadius: 10}} />
            <div style={{position: 'absolute', left: 380, top: 380, width: 200, height: 34, background: INK, borderRadius: 12}} />
            <div style={{position: 'absolute', left: 100, top: 130, width: 760, height: 18, background: INK, borderRadius: 9, transform: `rotate(${lerp(-9, 0, prog(t, 323.6, 324.8, easeInOut))}deg)`}}>
              {[{l: 'organisation', c: BLUE, x: -60, ic: 'usine'}, {l: 'avenir', c: GOLD, x: 520, ic: 'fusee'}].map((p) => <div key={p.l} style={{position: 'absolute', left: p.x, top: 18, width: 300}}><div style={{margin: '0 auto', width: 4, height: 30, background: INK}} /><div style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: '0 0 60px 60px', height: 150, boxShadow: `6px 6px 0 ${p.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: pop(t, p.l === 'avenir' ? 325.02 : 323.62)}}><F n={p.ic} size={70} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK}}>{p.l}</div></div></div>)}
            </div>
            {t > 328.18 && <div style={{position: 'absolute', left: 0, right: 0, top: 440}}><Board text="MERCI !" at={328.18} h={70} gap={4} c={BLUE} stag={0.04} /></div>}
          </Abs>
          {t > 326.86 && <Dust n={22} c={GOLD} />}
        </>
      )}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: at + 0.35 + len * 0.05, s: 'sfx/pop', v: 0.25}, ...rep(at + 0.8 + len * 0.05, 3, 0.12, 'sfx/pop', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const pops = (L: number[], v = 0.2): Sfx[] => L.map((a) => ({at: a, s: 'sfx/pop', v}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, ...flaps(0.1, 14), {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 0.8, s: 'validation', v: 0.18})), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.flatMap((r) => [{at: r.at - 1.2, s: 'soft-whoosh', v: 0.2, dur: 1.2}, {at: r.at, s: 'bass-hit', v: 0.35}, {at: r.at + 0.05, s: 'sfx/bell', v: 0.28}, {at: r.at + 0.35, s: 'soft-whoosh', v: 0.18, dur: 0.8}]),
  ...pops([5.3, 6.62]), {at: 8.3, s: 'sfx/swish', v: 0.3}, {at: 9.06, s: 'sfx/ding', v: 0.3}, {at: 11.0, s: 'sfx/rise', v: 0.3, dur: 2}, {at: 12.8, s: 'deep-hit', v: 0.4}, ...pops([14.06, 15.0]),
  {at: 19.8, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 26.0, s: 'sfx/whoosh', v: 0.25}, ...pops([28.9, 29.6]), {at: 32.1, s: 'sfx/swish', v: 0.3}, ...pops([33.5, 35.1]), {at: 38.02, s: 'validation', v: 0.3}, {at: 40.8, s: 'sfx/swish', v: 0.25}, {at: 42.66, s: 'alarme', v: 0.06, dur: 1}, {at: 42.7, s: 'deep-hit', v: 0.35},
  ...[51.82, 52.2, 53.22, 53.9].flatMap((a) => [{at: a - 0.1, s: 'sfx/swish', v: 0.22}, {at: a + 0.3, s: 'sfx/thud', v: 0.3}]), {at: 54.82, s: 'bass-hit', v: 0.3}, {at: 57.6, s: 'sfx/rise', v: 0.2, dur: 2.6},
  ...searchCues(63.1, 24, 64.4, 64.75), ...pops([66.7, 68.1, 69.66, 70.98, 71.94, 73.5], 0.18),
  {at: 78.2, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 85.3, s: 'sfx/whoosh', v: 0.22}, {at: 86.8, s: 'sfx/rise', v: 0.25, dur: 1.4}, {at: 87.98, s: 'sfx/ding', v: 0.25}, ...pops([90.98, 92.9]), {at: 95.8, s: 'soft-whoosh', v: 0.3, dur: 1}, ...pops([97.06, 98.06]), ...rep(98.9, 12, 0.12, 'tick', 0.12), {at: 100.4, s: 'validation', v: 0.3},
  {at: 101.8, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 106.4, s: 'sfx/whoosh', v: 0.2}, {at: 110.4, s: 'sfx/click', v: 0.4}, {at: 113.06, s: 'deep-hit', v: 0.4}, {at: 113.87, s: 'sfx/rise', v: 0.2, dur: 2},
  ...pops([116.66, 119.22, 121.46, 123.1]), {at: 117.6, s: 'soft-whoosh', v: 0.3, dur: 1.6}, {at: 119.2, s: 'sfx/ding', v: 0.25},
  {at: 129.1, s: 'tension', v: 0.1, dur: 1.2}, {at: 130.18, s: 'sfx/swish', v: 0.35}, {at: 131.4, s: 'validation', v: 0.3}, {at: 131.83, s: 'tampon', v: 0.55},
  ...rep(133.8, 16, 0.5, 'tick', 0.07), ...pops([139.4, 140.2, 141.0, 141.6], 0.14), {at: 141.3, s: 'sfx/swish', v: 0.3}, {at: 141.4, s: 'sfx/ding', v: 0.25},
  {at: 142.7, s: 'soft-whoosh', v: 0.3, dur: 1}, ...[146.66, 148.34, 152.5].map((a) => ({at: a, s: 'sfx/thud', v: 0.35})), {at: 151.0, s: 'soft-whoosh', v: 0.25, dur: 1.6},
  {at: 154.5, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 158.2, s: 'sfx/rise', v: 0.25, dur: 2.2}, {at: 160.42, s: 'validation', v: 0.3}, ...pops([162.82, 163.6]), {at: 163.3, s: 'sfx/swish', v: 0.25},
  {at: 166.2, s: 'sfx/whoosh', v: 0.35}, {at: 166.4, s: 'soft-whoosh', v: 0.35, dur: 3.2}, {at: 173.06, s: 'tampon', v: 0.55},
  {at: 173.8, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 176.3, s: 'sfx/swish', v: 0.3}, ...[179.3, 180.26, 182.54].flatMap((a) => [{at: a, s: 'alarme', v: 0.05, dur: 0.7}, {at: a, s: 'deep-hit', v: 0.3}]),
  {at: 185.38, s: 'bass-hit', v: 0.35}, ...[187.66, 189.54, 190.67].map((a) => ({at: a, s: 'sfx/rise', v: 0.18, dur: 0.8})),
  ...rep(192.7, 5, 0.1, 'sfx/click', 0.18), ...[193.06, 193.7, 194.6].map((a) => ({at: a, s: 'sfx/bell', v: 0.2})), {at: 199.62, s: 'sfx/pop', v: 0.2}, {at: 201.98, s: 'tampon', v: 0.55},
  {at: 203.6, s: 'soft-whoosh', v: 0.3, dur: 1}, ...[206.38, 208.46, 209.2].map((a) => ({at: a, s: 'sfx/thud', v: 0.35})), {at: 212.4, s: 'cadenas', v: 0.5}, ...pops([213.86, 217.3]),
  ...[221.98, 227.02, 229.26, 235.62].map((a) => ({at: a, s: 'sfx/swish', v: 0.25})), {at: 232.42, s: 'sfx/pop', v: 0.2}, {at: 236.42, s: 'validation', v: 0.3},
  {at: 240.6, s: 'soft-whoosh', v: 0.35, dur: 1}, ...rep(240.7, 10, 0.05, 'sfx/click', 0.12), {at: 244.42, s: 'sfx/ding', v: 0.25}, ...rep(247.66, 16, 0.18, 'sfx/click', 0.14), ...[252.18, 252.98, 253.6].map((a) => ({at: a, s: 'sfx/rise', v: 0.16, dur: 0.8})),
  ...pops([269.9, 271.78, 272.6, 273.9]), {at: 276.3, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: 277.2, s: 'sfx/thud', v: 0.3}, ...pops([279.78, 280.86, 281.6, 282.7, 283.62, 284.9]), {at: 287.54, s: 'validation', v: 0.3},
  {at: 289.6, s: 'soft-whoosh', v: 0.3, dur: 1}, ...pops([296.86]), {at: 296.9, s: 'sfx/swish', v: 0.3}, {at: 298.4, s: 'sfx/thud', v: 0.3}, ...pops([298.5, 301.86]), {at: 305.14, s: 'sfx/pop', v: 0.2}, {at: 306.86, s: 'sfx/rise', v: 0.3, dur: 1.8}, {at: 307.86, s: 'tampon', v: 0.55},
  {at: 309.6, s: 'tension', v: 0.1, dur: 6}, {at: 316.4, s: 'soft-whoosh', v: 0.4, dur: 1.2}, {at: 317.6, s: 'validation', v: 0.3}, {at: 317.9, s: 'deep-hit', v: 0.3},
  {at: 319.6, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 323.0, s: 'sfx/swish', v: 0.3}, {at: 323.6, s: 'sfx/rise', v: 0.22, dur: 1.2}, {at: 324.8, s: 'bass-hit', v: 0.35}, ...flaps(328.18, 7), {at: 329.0, s: 'validation', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const ChefOrchestre: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={77.35}><Intro /></Gate>
    <Gate from={77.65} to={101.15}><Strategie /></Gate>
    <Gate from={101.45} to={132.95}><Qualite /></Gate>
    <Gate from={133.25} to={164.85}><Sante /></Gate>
    <Gate from={165.15} to={192.15}><Envir /></Gate>
    <Gate from={192.45} to={256.25}><Normes /></Gate>
    <Gate from={256.55} to={ALLDONE + 0.05}><Comm /></Gate>
    <Gate from={ALLDONE + 0.3} to={OUTRO_AT}><Conclusion /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}><Gyro i={i} /></Gate>)}
    <Gate from={20} to={311}><StationBanner /></Gate>
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={330.4}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-chef-orchestre-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Kin, Brut, T, TitleBlock, Win, GLASS, Check, Tile, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, spring, LoupeSweep, PneuDeliver, Shine, Count, BURG, YEL, handFont];
