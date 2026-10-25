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
 * « Premier emploi QHSE : décrocher son tout premier job » (5 min 17, source NotebookLM) — capsule « condensé + effet
 * wahou + ultra premium » présentée en métro : 8 stations (la porte → PME → la preuve → « vous » → provoquer → réseau →
 * initiative → conviction). Voix d'origine (sans musique de fond), sous-titres calés mot à mot. Couverture : photo +
 * « PREMIER EMPLOI / EN QHSE » en lettres-photos animées. Fil rouge : tube pneumatique à six guichets calés sur les
 * vraies parties (la porte → illusion → CV → opportunité → crédibilité → entretien) ; gyrophare (transition principale),
 * loupe, capsule pneumatique et store vénitien plein écran ; barre de recherche qui trouve et ouvre les PME.
 */
const IMG = {
  cover: 'sysqsse-gen/architecte.jpg',
  cPrem: 'maturite-gen/proactif.jpg',
  cQhse: 'heures-gen/equipe-chantier.jpg',
  terrain: 'influence-gen/terrain.jpg',
  bureau: 'influence-gen/bureau.jpg',
  reseau: 'sysqsse-gen/accompagnement.jpg',
  certif: 'influence-gen/certifications.jpg',
  entretien: 'heures-gen/entretien.jpg',
  equipe: 'isoperf-gen/meritante.jpg',
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
const OUTRO_AT = 317.3;
export const PREMIER_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 2.6, n: '1', title: 'Le diplôme ouvre la porte', s: 'à nous de la franchir', c: GOLD, g: 'la porte', k: 'gyro', lab: 'INTRO · PLAN EN 5 ÉTAPES'},
  {at: 72.32, n: '2', title: 'Casser l’illusion', s: 'la réalité du marché', c: BLUE, g: 'illusion', k: 'loupe', lab: 'ÉTAPE 1 / 5'},
  {at: 103.29, n: '3', title: 'CV et lettre', s: 'sortir du lot', c: GREEN, g: 'CV', k: 'gyro', lab: 'ÉTAPE 2 / 5'},
  {at: 165.85, n: '4', title: 'Créer l’opportunité', s: 'passif → conquérant', c: VIO, g: 'opportunité', k: 'tube', lab: 'ÉTAPE 3 / 5'},
  {at: 214.55, n: '5', title: 'Construire sa crédibilité', s: 'agir avant le premier job', c: ORANGE, g: 'crédibilité', k: 'store', lab: 'ÉTAPE 4 / 5'},
  {at: 245.78, n: '6', title: 'Entretien et débuts', s: 'la dernière ligne droite', c: RED, g: 'entretien', k: 'gyro', lab: 'ÉTAPE 5 / 5'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 310.2;
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
  {n: 1, l: 'Le diplôme ouvre la porte', s: 'porte', at: 43.3},
  {n: 2, l: 'Les PME : l’opportunité', s: 'PME', at: 91.9},
  {n: 3, l: 'Une preuve chiffrée', s: 'preuve', at: 127.22},
  {n: 4, l: 'Commencer par « vous »', s: 'vous', at: 158.34},
  {n: 5, l: 'Provoquer les opportunités', s: 'provoquer', at: 183.46},
  {n: 6, l: 'Le réseau est déjà là', s: 'réseau', at: 203.18},
  {n: 7, l: 'Montrer l’initiative', s: 'initiative', at: 244.62},
  {n: 8, l: 'Un métier de conviction', s: 'conviction', at: 298.02},
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

const PLAN = [
  {l: 'casser l’illusion', ic: 'loupe', c: BLUE},
  {l: 'CV et lettre', ic: 'ecrit', c: GREEN},
  {l: 'créer sa chance', ic: 'fusee', c: VIO},
  {l: 'sa crédibilité', ic: 'medaille', c: ORANGE},
  {l: 'entretien', ic: 'poignee', c: RED},
];

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="superviseur" w={1080} h={800} pos="50% 25%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 22%, ${PAPER}CC 30%, ${PAPER} 35%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={560} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: '#fff', background: NAVY, padding: '8px 24px', borderRadius: 8}}>JEUNE DIPLÔMÉ · PLAN EN 5 ÉTAPES</div></Abs>
      <Abs x={0} y={650} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="PREMIER EMPLOI" src={IMG.cPrem} size={108} ls={0} /></Abs>
      <Abs x={0} y={800} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="EN QHSE" src={IMG.cQhse} size={150} ls={4} seed={3} /></Abs>
      <Abs x={0} y={990} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: NAVY}}>de la salle de cours <span style={{color: GOLD}}>au terrain</span></Abs>
      <Abs x={50} y={1080} w={980} style={{display: 'flex', justifyContent: 'center', gap: 12}}>{PLAN.map((p, k) => <div key={p.l} style={{width: 184, height: 250, borderRadius: 22, background: p.c, border: `5px solid ${INK}`, boxShadow: `5px 5px 0 ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: '#fff'}}>ÉTAPE {k + 1}</div><F n={p.ic} size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: '#fff', textAlign: 'center', lineHeight: 1.05, padding: '0 6px'}}>{p.l}</div></div>)}</Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ 1 · LE DIPLÔME OUVRE LA PORTE ═════════════ */
const Porte: React.FC = () => {
  const t = useT();
  const ph = t < 28.0 ? 0 : t < 54.6 ? 1 : 2;
  const open = prog(t, 42.2, 43.6, easeInOut);
  const walk = prog(t, 44.6, 46.4, easeInOut);
  return (
    <Out end={72.32}>
      {ph === 0 && (
        <>
          <HiLine words={t < 15.8 ? ['Le', 'diplôme,', 'encore', 'chaud'] : t < 21.2 ? ['La', 'tête', 'bourrée', 'de', 'normes'] : ['Excitation', '&', 'boule', 'au', 'ventre']} mark={t < 15.8 ? [1, 3] : t < 21.2 ? [2, 4] : [0, 2, 3, 4]} at={t < 15.8 ? 12.2 : t < 21.2 ? 15.9 : 24.0} y={330} size={58} />
          <Abs x={60} y={440} w={960} h={930}>
            {t < 15.8 ? <>
              <div style={{position: 'absolute', left: 230, top: 160, transform: `scale(${pop(t, 6.2)}) rotate(${Math.sin(t * 1.5) * 3}deg)`}}><F n="diplome" size={500} /></div>
              {Array.from({length: 7}, (_, k) => { const ph2 = ((t - 12.6) * 0.6 + k / 7) % 1; return t > 12.6 && <div key={k} style={{position: 'absolute', left: 340 + k * 40 + Math.sin(t * 2 + k) * 20, top: 160 - ph2 * 200, width: 26, height: 80, borderRadius: 13, background: '#AEB8C8', filter: 'blur(9px)', opacity: (1 - ph2) * 0.8}} />; })}
              {t > 13.9 && <div style={{position: 'absolute', left: 0, right: 0, top: 720, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={13.9} c={ORANGE} size={32}>tout neuf · encore chaud</Pill></div>}
            </> : t < 21.2 ? <>
              <div style={{position: 'absolute', left: 280, top: 160, opacity: pop(t, 15.9)}}><F n="cerveau" size={400} /></div>
              {['ISO 9001', 'ISO 14001', 'ISO 45001', 'AMDEC', '5M', 'HAZOP', 'DUER', 'TF', 'TG', 'PDCA'].map((w, k) => { const a = (k / 10) * Math.PI * 2 + t * 0.4; const p = prog(t, 16.3 + k * 0.25, 17.1 + k * 0.25, easeOut); return <div key={w} style={{position: 'absolute', left: 480 + Math.cos(a) * lerp(560, 260, p) - 70, top: 360 + Math.sin(a) * lerp(560, 240, p) - 24, width: 140, textAlign: 'center', padding: '6px 0', borderRadius: 12, background: [BLUE, GREEN, RED, VIO, ORANGE][k % 5], border: `4px solid ${INK}`, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#fff', opacity: p}}>{w}</div>; })}
            </> : <>
              <div style={{position: 'absolute', left: 80, top: 60, width: 800, height: 480, borderRadius: 28, background: '#fff', border: `6px solid ${INK}`, overflow: 'hidden'}}>
                <svg width={800} height={480} viewBox="0 0 800 480"><path d="M 120 400 A 280 280 0 0 1 680 400" fill="none" stroke="#E3E8EF" strokeWidth={50} /><path d="M 120 400 A 280 280 0 0 1 400 120" fill="none" stroke={GREEN} strokeWidth={50} strokeDasharray={440} strokeDashoffset={440 * (1 - prog(t, 22.2, 23.4))} /><path d="M 400 120 A 280 280 0 0 1 680 400" fill="none" stroke={RED} strokeWidth={50} strokeDasharray={440} strokeDashoffset={440 * (1 - prog(t, 25.4, 26.8))} /></svg>
                <div style={{position: 'absolute', left: 60, bottom: 30, fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: GREEN, opacity: pop(t, 22.4)}}>excitation</div>
                <div style={{position: 'absolute', right: 60, bottom: 30, fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: RED, opacity: pop(t, 25.6)}}>boule au ventre</div>
                <div style={{position: 'absolute', left: 396, top: 140, width: 8, height: 260, background: INK, transformOrigin: '50% 100%', transform: `rotate(${lerp(-70, 60, prog(t, 22.2, 27.0, easeInOut)) + Math.sin(t * 9) * 3}deg)`}} />
              </div>
              <Shot src={IMG.equipe} ic="equipe" x={80} y={580} w={800} h={330} at={21.4} c={GOLD} />
            </>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 37.6 ? ['La', 'vérité', 'un', 'peu', 'crue'] : t < 45.9 ? ['Il', 'ne', 'fait', 'qu’ouvrir', 'la', 'porte'] : ['On', 'contrôle', 'à', '100 %']} mark={t < 37.6 ? [1, 4] : t < 45.9 ? [3, 5] : [1, 3]} at={t < 37.6 ? 30.0 : t < 45.9 ? 42.2 : 52.76} y={330} size={58} />
          <Abs x={60} y={440} w={960} h={930} style={{perspective: 1800}}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center', gap: 14, opacity: 1 - prog(t, 41.2, 41.9)}}><Pill at={34.6} c={NAVY} size={30}>salle de cours</Pill><span style={{fontSize: 40, fontWeight: 900, opacity: pop(t, 35.8)}}>→</span><Pill at={36.6} c={GREEN} size={30}>terrain</Pill></div>
            <div style={{position: 'absolute', left: 280, top: 110, width: 400, height: 640, background: `radial-gradient(ellipse at 50% 60%, #FFF6C8, ${GOLD} 60%, #B57A00)`, border: `10px solid ${INK}`, borderRadius: '200px 200px 0 0', overflow: 'hidden', boxShadow: `0 0 ${open * 160}px ${GOLD}`, opacity: pop(t, 28.2)}}>
              <div style={{position: 'absolute', left: 140 + walk * 60, top: 300 - walk * 30, transform: `scale(${1 - walk * 0.55})`, transformOrigin: '50% 100%', opacity: open > 0.5 ? 1 : 0}}><F n="superviseur" size={200} /></div>
            </div>
            <div style={{position: 'absolute', left: 280, top: 110, width: 400, height: 640, transformOrigin: '0 50%', transform: `rotateY(${-100 * open}deg)`, opacity: pop(t, 28.2)}}>
              <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #6B3E1E, #8A5A2B)', border: `10px solid ${INK}`, borderRadius: '200px 200px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20}}>
                <F n="diplome" size={180} /><div style={{position: 'absolute', right: 40, top: 340, width: 40, height: 40, borderRadius: 20, background: GOLD, border: `5px solid ${INK}`}} />
              </div>
            </div>
            {open > 0 && Array.from({length: 8}, (_, k) => <div key={k} style={{position: 'absolute', left: 480, top: 430, width: 900, height: 30, background: `linear-gradient(90deg, ${GOLD}AA, transparent)`, transformOrigin: '0 50%', transform: `rotate(${-150 + k * 40 + Math.sin(t + k) * 4}deg)`, opacity: open * 0.5, filter: 'blur(6px)'}} />)}
            {t > 44.66 && <div style={{position: 'absolute', left: 0, right: 0, top: 790, display: 'flex', justifyContent: 'center'}}><Pill at={44.66} c={GOLD} size={32}>à nous de la franchir</Pill></div>}
            {t > 45.9 && <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 930, background: `${PAPER}F2`, opacity: prog(t, 45.9, 46.5), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20}}>
              <div style={{display: 'flex', gap: 14}}><Pill at={48.42} c={BLUE} size={30}>nos actions</Pill><Pill at={49.06} c={VIO} size={30}>notre approche</Pill></div>
              <div style={{width: 520, height: 520, borderRadius: 260, background: `conic-gradient(${GREEN} ${prog(t, 52.8, 54.2) * 360}deg, #E3E8EF 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `8px solid ${INK}`}}><div style={{width: 380, height: 380, borderRadius: 190, background: '#fff', border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 130, color: INK}}>{t > 52.6 ? <Count n={100} a={52.8} b={54.2} suf="%" /> : '?'}</div></div>
            </div>}
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Le', 'plan', 'de', 'match', 'en', '5', 'étapes']} mark={[1, 3, 5]} at={57.2} y={330} size={56} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 70, top: 20, width: 12, height: 880, borderRadius: 6, background: '#E3E8EF'}}><div style={{width: '100%', height: `${prog(t, 59.0, 70.0, (x) => x) * 100}%`, borderRadius: 6, background: `linear-gradient(180deg, ${BLUE}, ${RED})`}} /></div>
            {PLAN.map((p, k) => { const a = [59.7, 61.62, 65.06, 66.3, 69.14][k]; return <div key={p.l} style={{position: 'absolute', left: 30, top: 20 + k * 178, width: 900, height: 150, display: 'flex', alignItems: 'center', gap: 24, opacity: pop(t, a), transform: `translateX(${(1 - pop(t, a)) * 160}px)`}}>
              <div style={{width: 92, height: 92, borderRadius: 46, background: p.c, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: '#fff', flexShrink: 0}}>{k + 1}</div>
              <div style={{flex: 1, height: 130, borderRadius: 22, background: '#fff', border: `5px solid ${p.c}`, boxShadow: `6px 6px 0 ${p.c}`, display: 'flex', alignItems: 'center', gap: 20, padding: '0 24px'}}><F n={p.ic} size={90} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>{p.l}</span></div>
            </div>; })}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 2 · CASSER L'ILLUSION ═════════════ */
const Illusion: React.FC = () => {
  const t = useT();
  const ph = t < 87.8 ? 0 : 1;
  return (
    <Out end={103.29}>
      {ph === 0 && (
        <>
          <HiLine words={['La', 'réalité', 'du', 'marché']} mark={[1, 3]} at={77.0} y={330} size={66} />
          <Shot src={IMG.terrain} ic="ouvrier" x={60} y={440} w={960} h={330} at={75.9} c={BLUE} />
          <Abs x={60} y={800} w={960} h={570} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 76.2)}}>
            <div style={{position: 'absolute', left: 24, top: 18, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: GOLD}}>AFRIQUE DE L’OUEST · GROSSES ENTREPRISES</div>
            {[0, 1, 2, 3, 4].map((b) => { const h = [300, 400, 340, 440, 280][b]; return <div key={b} style={{position: 'absolute', left: 40 + b * 180, bottom: 0, width: 150, height: h * pop(t, 77.5 + b * 0.2), background: '#26304A', border: '3px solid #3A4560', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, padding: 14, boxSizing: 'border-box', alignContent: 'start', overflow: 'hidden'}}>{Array.from({length: 15}, (_, k) => { const lit = (b === 1 && k === 4) || (b === 3 && k === 7); return <div key={k} style={{height: 18, background: lit && t > 84.0 ? GOLD : '#1A2133', boxShadow: lit && t > 84.0 ? `0 0 20px ${GOLD}` : 'none'}} />; })}</div>; })}
            {t > 84.6 && <Stamp at={84.6} c={RED} text="postes QHSE rares" x={170} y={230} rot={-6} size={50} />}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 98.0 ? ['L’opportunité', ':', 'les', 'PME'] : ['Créer', 'l’opportunité']} mark={t < 98.0 ? [0, 3] : [0, 1]} at={t < 98.0 ? 91.9 : 100.4} y={330} size={64} />
          <SearchOpen x={60} y={440} w={960} h={930} at={88.0} query="opportunités QHSE" results={['Grandes entreprises : postes rares', 'PME : de vrais besoins', 'Sites d’annonces']} found={1} foundAt={90.3} clickAt={90.8} c={BLUE}>
            <div style={{position: 'absolute', inset: 0, padding: 30, display: 'flex', flexDirection: 'column', gap: 22}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 20}}><F n="usine2" size={140} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: INK}}>PME locales</div></div>
              {[{l: 'de vrais besoins', ok: true, a: 92.9}, {l: 'pas encore le réflexe de recruter', ok: false, a: 94.9}].map((x) => <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 16, height: 110, borderRadius: 20, background: x.ok ? '#E5F7EC' : '#FDE8E8', border: `4px solid ${x.ok ? GREEN : RED}`, padding: '0 22px', opacity: pop(t, x.a)}}><div style={{width: 60, height: 60, borderRadius: 30, background: x.ok ? GREEN : RED, color: '#fff', fontSize: 36, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.ok ? '✓' : '✕'}</div><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>{x.l}</span></div>)}
              <div style={{display: 'flex', alignItems: 'center', gap: 16, height: 150, borderRadius: 24, background: BLUE, border: `5px solid ${INK}`, padding: '0 22px', opacity: pop(t, 99.26), transform: `scale(${t > 99.26 ? spring(t, 99.26) : 0.6})`}}><F n="ampoule" size={100} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff'}}>proposer des solutions concrètes</span></div>
              {t > 101.54 && <div style={{alignSelf: 'center', transform: `scale(${spring(t, 101.54)})`}}><Pill at={101.54} c={GOLD} size={34}>là où personne ne la voit encore</Pill></div>}
            </div>
          </SearchOpen>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 3 · CV ET LETTRE ═════════════ */
const Cv: React.FC = () => {
  const t = useT();
  const ph = t < 131.0 ? 0 : t < 146.6 ? 1 : 2;
  const morph = prog(t, 122.4, 123.8, easeInOut);
  const squash = prog(t, 131.3, 132.6, easeInOut);
  return (
    <Out end={165.85}>
      {ph === 0 && (
        <>
          <HiLine words={t < 124.6 ? ['Quantifier', 'ses', 'actions'] : ['Une', 'preuve', 'chiffrée']} mark={t < 124.6 ? [0, 2] : [1]} at={t < 124.6 ? 117.6 : 127.2} y={330} size={60} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 110, top: 0, width: 740, height: 880, background: '#fff', border: `6px solid ${INK}`, borderRadius: 18, boxShadow: `12px 12px 0 ${GREEN}`, padding: 40, boxSizing: 'border-box', opacity: pop(t, 106.9)}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 20}}><div style={{width: 110, height: 110, borderRadius: 55, background: '#E3E8EF', border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="superviseur" size={90} /></div><div><div style={{width: 300, height: 26, borderRadius: 8, background: INK}} /><div style={{width: 220, height: 18, borderRadius: 6, background: '#C9D2DF', marginTop: 12}} /></div></div>
              <div style={{marginTop: 40, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: GREEN}}>EXPÉRIENCE</div>
              <div style={{position: 'relative', marginTop: 16, height: 130, borderRadius: 14, background: morph > 0.5 ? '#E5F7EC' : '#F4F6FA', border: `4px solid ${morph > 0.5 ? GREEN : '#C9D2DF'}`, padding: '14px 18px', boxSizing: 'border-box', opacity: pop(t, 118.6)}}>
                <div style={{position: 'absolute', left: 18, top: 14, right: 18, fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: DIM, opacity: 1 - morph, filter: `blur(${morph * 8}px)`}}>• Participation à des audits</div>
                <div style={{position: 'absolute', left: 18, top: 14, right: 18, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK, opacity: morph, filter: `blur(${(1 - morph) * 8}px)`}}>• Participation à <span style={{background: GOLD, padding: '0 8px', borderRadius: 6}}>3 audits internes</span> ISO 9001</div>
              </div>
              {[0, 1, 2].map((k) => <div key={k} style={{marginTop: 22, height: 22, width: [560, 480, 520][k], borderRadius: 6, background: '#E3E8EF'}} />)}
              <div style={{position: 'absolute', left: 40, right: 40, bottom: 40, display: 'flex', gap: 14, alignItems: 'flex-end', height: 220, opacity: pop(t, 128.2)}}>{[60, 110, 170, 210].map((h, k) => <div key={k} style={{flex: 1, height: h * prog(t, 128.2 + k * 0.2, 129.0 + k * 0.2), background: GREEN, border: `4px solid ${INK}`, borderRadius: '10px 10px 0 0'}} />)}</div>
            </div>
            {t > 112.7 && t < 122.4 && <div style={{position: 'absolute', left: 0, right: 0, top: 820, display: 'flex', justifyContent: 'center', gap: 14}}><div style={{position: 'relative'}}><Pill at={116.3} c={DIM} size={28}>lister des tâches</Pill><div style={{position: 'absolute', left: 8, right: 8, top: '50%'}}><Strike p={prog(t, 117.2, 117.7)} c={RED} /></div></div><Pill at={118.0} c={GREEN} size={28}>quantifier ses actions</Pill></div>}
            {t > 127.22 && <Stamp at={127.22} c={GREEN} text="PREUVE" x={560} y={120} rot={-10} size={64} />}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 136.0 ? ['Une', 'seule', 'page'] : ['Un', 'premier', 'test']} mark={t < 136.0 ? [1, 2] : [1, 2]} at={t < 136.0 ? 131.38 : 144.58} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930}>
            {[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 250 + (2 - k) * lerp(60, 0, squash), top: 40 + (2 - k) * lerp(40, 0, squash), width: 460, height: 600, background: '#fff', border: `6px solid ${INK}`, borderRadius: 14, boxShadow: '0 10px 30px rgba(0,0,0,0.15)', opacity: k === 0 ? 1 : 1 - squash, padding: 30, boxSizing: 'border-box'}}>{Array.from({length: 9}, (_, j) => <div key={j} style={{height: 16, borderRadius: 5, background: j === 0 ? INK : '#E3E8EF', marginTop: 22, width: `${[60, 90, 80, 95, 70, 85, 90, 60, 75][j]}%`}} />)}</div>)}
            {t > 133.86 && <Stamp at={133.86} c={RED} text="1 PAGE · NON NÉGOCIABLE" x={140} y={560} rot={-6} size={44} />}
            <div style={{position: 'absolute', left: 0, right: 0, top: 740, display: 'flex', justifyContent: 'center', gap: 14}}>{[{l: 'synthétiser', a: 139.3}, {l: 'l’essentiel', a: 141.0}, {l: 'prioriser', a: 142.26}].map((x) => <Pill key={x.l} at={x.a} c={GREEN} size={32}>{x.l}</Pill>)}</div>
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 157.9 ? ['«', 'Moi,', 'je', 'suis', '»'] : ['Commencer', 'par', 'VOUS']} mark={t < 157.9 ? [1, 2, 3] : [0, 2]} at={t < 157.9 ? 154.9 : 158.34} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 120, top: 0, width: 720, height: 480, background: '#FFFDF6', border: `6px solid ${INK}`, borderRadius: 18, padding: 36, boxSizing: 'border-box', opacity: pop(t, 147.0)}}>
              <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>LETTRE DE MOTIVATION</div>
              <div style={{position: 'relative', marginTop: 30, fontFamily: handFont, fontSize: 52, color: t < 158.3 ? INK : DIM, opacity: pop(t, 154.9)}}>« Moi, je suis… »<div style={{position: 'absolute', left: 0, width: 380, top: '50%'}}><Strike p={prog(t, 157.4, 157.9)} c={RED} /></div></div>
              {t > 158.34 && <div style={{marginTop: 24, fontFamily: handFont, fontSize: 52, color: GREEN, transform: `scale(${spring(t, 158.34)})`, transformOrigin: '0 50%'}}>« Votre entreprise… »</div>}
            </div>
            {t > 151.22 && t < 159.4 && <div style={{position: 'absolute', left: 0, right: 0, top: 600, display: 'flex', justifyContent: 'center'}}><Pill at={151.22} c={GOLD} size={34}>l’astuce redoutable</Pill></div>}
            <div style={{position: 'absolute', left: 300, top: 520, width: 360, height: 360, opacity: pop(t, 159.4)}}>
              {[1, 0.72, 0.44].map((r, k) => <div key={k} style={{position: 'absolute', left: 180 - 180 * r, top: 180 - 180 * r, width: 360 * r, height: 360 * r, borderRadius: '50%', background: k % 2 ? '#fff' : RED, border: `5px solid ${INK}`}} />)}
              {[{l: 'leur défi', a: 160.7, x: -300, y: 40}, {l: 'leur projet', a: 161.74, x: 400, y: 40}, {l: 'leur problème', a: 163.34, x: 60, y: 380}].map((x) => <div key={x.l} style={{position: 'absolute', left: x.x, top: x.y}}><Pill at={x.a} c={NAVY} size={28}>{x.l}</Pill></div>)}
              {t > 164.2 && <div style={{position: 'absolute', left: 130, top: 130, transform: `scale(${spring(t, 164.2)})`}}><F n="yeux" size={100} /></div>}
            </div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 4 · CRÉER L'OPPORTUNITÉ ═════════════ */
const Opportunite: React.FC = () => {
  const t = useT();
  const ph = t < 184.5 ? 0 : t < 197.8 ? 1 : 2;
  const sweep = (t * 120) % 360;
  return (
    <Out end={214.55}>
      {ph === 0 && (
        <>
          <HiLine words={t < 176.3 ? ['Passif', '→', 'conquérant'] : ['Les', 'provoquer']} mark={t < 176.3 ? [0, 2] : [1]} at={t < 176.3 ? 170.38 : 183.46} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 0, top: 0, width: 460, height: 460, borderRadius: 28, background: '#F4F6FA', border: `5px solid #C9D2DF`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: pop(t, 169.4), filter: t > 171.6 ? 'grayscale(1)' : 'none'}}><F n="canape" size={180} /><F n="sablier" size={90} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM}}>attendre…</span></div>
            <div style={{position: 'absolute', left: 500, top: 0, width: 460, height: 460, borderRadius: 28, background: VIO, border: `5px solid ${INK}`, overflow: 'hidden', opacity: pop(t, 170.4)}}><div style={{position: 'absolute', left: 140, top: lerp(260, 40, prog(t, 172.6, 174.4, easeIn)), transform: 'rotate(-30deg)'}}><F n="fusee" size={180} /></div><div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>les faire arriver</div></div>
            <div style={{position: 'absolute', left: 60, top: 520, width: 840, height: 300, borderRadius: 22, background: '#C9A574', border: `6px solid ${INK}`, opacity: pop(t, 176.4)}}>
              <div style={{position: 'absolute', left: 20, top: 14, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: INK}}>SITES D’ANNONCES</div>
              {[0, 1].map((k) => <div key={k} style={{position: 'absolute', left: 60 + k * 240, top: 70, width: 180, height: 180, background: '#FFF6C8', border: `4px solid ${INK}`, transform: `rotate(${k ? 4 : -5}deg)`}}><div style={{margin: 20, height: 14, background: '#C9D2DF', borderRadius: 4}} /><div style={{margin: 20, height: 14, background: '#C9D2DF', borderRadius: 4}} /></div>)}
              {t > 179.0 && <div style={{position: 'absolute', left: 560, top: 60, transform: `scale(${spring(t, 179.0)})`}}><F n="question" size={180} /></div>}
            </div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Des', 'candidatures', 'bien', 'ciblées']} mark={[1, 3]} at={195.78} y={330} size={60} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 130, top: 0, width: 700, height: 700, borderRadius: '50%', background: '#0D2A1A', border: `8px solid ${INK}`, overflow: 'hidden', opacity: pop(t, 184.7)}}>
              {[1, 0.7, 0.4].map((r) => <div key={r} style={{position: 'absolute', left: 350 - 350 * r, top: 350 - 350 * r, width: 700 * r, height: 700 * r, borderRadius: '50%', border: '2px solid #2EE07A55', boxSizing: 'border-box'}} />)}
              <div style={{position: 'absolute', inset: 0, background: `conic-gradient(from ${sweep}deg, #2EE07A88, transparent 50deg)`}} />
              {[{l: 'chantiers', ic: 'chantier', a: 190.02, x: 160, y: 140}, {l: 'petites usines', ic: 'usine', a: 191.18, x: 430, y: 260}, {l: 'transport', ic: 'camion', a: 192.1, x: 200, y: 440}].map((p) => <div key={p.l} style={{position: 'absolute', left: p.x, top: p.y, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${t > p.a ? spring(t, p.a) : 0})`}}><div style={{position: 'absolute', left: 30, top: 30, width: 60, height: 60, borderRadius: 30, border: '4px solid #2EE07A', transform: `scale(${1 + ((t - p.a) % 1) * 2})`, opacity: 1 - ((t - p.a) % 1)}} /><F n={p.ic} size={120} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: '#fff', background: '#2EE07A44', padding: '2px 10px', borderRadius: 8}}>{p.l}</span></div>)}
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={188.06} c={VIO} size={30}>regarder autour de soi</Pill>{t > 194.38 && <Pill at={194.38} c={GREEN} size={30}>candidatures spontanées</Pill>}</div>
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 203.1 ? ['«', 'Pas', 'de', 'réseau', '»'] : ['Le', 'réseau', 'est', 'déjà', 'là']} mark={t < 203.1 ? [3] : [1, 4]} at={t < 203.1 ? 200.74 : 203.18} y={330} size={66} />
          <Shot src={IMG.reseau} ic="equipe" x={60} y={440} w={960} h={300} at={198.0} c={VIO} />
          <Abs x={60} y={770} w={960} h={600} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 198.2)}}>
            {t < 204.6 && <div style={{position: 'absolute', left: 150, top: 90, width: 640, background: '#F4F6FA', border: `5px solid ${INK}`, borderRadius: '30px 30px 30px 6px', padding: '22px 28px', fontFamily: handFont, fontSize: 44, color: INK, opacity: pop(t, 199.0)}}>« Je sors de l’école, je n’ai pas de réseau… »</div>}
            {t > 202.02 && t < 204.6 && <Stamp at={202.02} c={RED} text="FAUX" x={330} y={220} rot={-10} size={90} />}
            {[{l: 'profs', ic: 'formatrice', a: 204.9, x: 130, y: 90}, {l: 'camarades de promo', ic: 'equipe', a: 206.18, x: 650, y: 90}, {l: 'LinkedIn', ic: 'telephone', a: 207.98, x: 130, y: 380}, {l: 'visibilité', ic: 'megaphone', a: 211.0, x: 650, y: 380}].map((n) => <React.Fragment key={n.l}>
              <svg style={{position: 'absolute', left: 0, top: 0}} width={948} height={588}><line x1={474} y1={294} x2={n.x + 80} y2={n.y + 60} stroke={VIO} strokeWidth={6} strokeDasharray="12 10" strokeDashoffset={-t * 30} opacity={prog(t, n.a - 0.4, n.a)} /></svg>
              <div style={{position: 'absolute', left: n.x, top: n.y, width: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${t > n.a ? spring(t, n.a) : 0})`}}><F n={n.ic} size={90} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: INK, textAlign: 'center'}}>{n.l}</span></div>
            </React.Fragment>)}
            {t > 204.6 && <div style={{position: 'absolute', left: 414, top: 234, width: 120, height: 120, borderRadius: 60, background: VIO, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, 204.6)})`}}><F n="superviseur" size={90} /></div>}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 5 · CONSTRUIRE SA CRÉDIBILITÉ ═════════════ */
const Credibilite: React.FC = () => {
  const t = useT();
  const ph = t < 229.6 ? 0 : 1;
  const brk = prog(t, 225.9, 226.7, easeOut);
  return (
    <Out end={245.78}>
      {ph === 0 && (
        <>
          <HiLine words={t < 225.6 ? ['Le', 'cercle', 'vicieux'] : ['Construire', 'sa', 'crédibilité']} mark={t < 225.6 ? [1, 2] : [0, 2]} at={t < 225.6 ? 223.6 : 226.4} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 180, top: 40, width: 600, height: 600, opacity: pop(t, 218.2)}}>
              {[0, 1].map((k) => <div key={k} style={{position: 'absolute', inset: 0, transform: `rotate(${t * 60 * (1 - brk) + k * 180}deg) translate(${brk * (k ? 260 : -260)}px, ${brk * 120}px)`, opacity: 1 - brk}}>
                <svg width={600} height={600}><path d="M 300 40 A 260 260 0 0 1 560 300" fill="none" stroke={k ? RED : ORANGE} strokeWidth={44} /><path d="M 590 280 L 560 340 L 530 280 Z" fill={k ? RED : ORANGE} transform="translate(0,10)" /></svg>
              </div>)}
              <div style={{position: 'absolute', left: 150, top: 230, width: 300, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK, opacity: 1 - brk}}>{t < 221.3 ? 'pas d’expérience → pas de job' : 'pas de job → pas d’expérience'}</div>
              {brk > 0 && <div style={{position: 'absolute', left: 170, top: 170, transform: `scale(${spring(t, 226.0)})`}}><F n="medaille" size={260} /></div>}
            </div>
            {brk > 0 && Array.from({length: 12}, (_, k) => { const a = (k / 12) * Math.PI * 2; const d = brk * 420; return <div key={k} style={{position: 'absolute', left: 480 + Math.cos(a) * d, top: 340 + Math.sin(a) * d, width: 30, height: 12, background: k % 2 ? ORANGE : RED, transform: `rotate(${a}rad)`, opacity: 1 - brk * 0.8}} />; })}
            <div style={{position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center'}}><Pill at={227.6} c={ORANGE} size={32}>avant même d’avoir le poste</Pill></div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 243.0 ? ['Le', 'plan', 'en', '3', 'points'] : ['L’initiative']} mark={t < 243.0 ? [1, 3] : [0]} at={t < 243.0 ? 230.4 : 244.62} y={330} size={66} />
          <Shot src={IMG.certif} ic="diplome" x={60} y={440} w={960} h={300} at={229.8} c={ORANGE} />
          <Abs x={60} y={770} w={960} h={600} style={{display: 'flex', gap: 16}}>
            {[{l: 'documenter', s: 'synthèses, checklists', ic: 'clipboard', a: 231.94}, {l: 'bénévolat ciblé', s: 'l’expérience qui compte', ic: 'coeur', a: 236.82}, {l: 'se certifier', s: 'en ligne', ic: 'badge', a: 240.9}].map((x, k) => <div key={x.l} style={{flex: 1, height: 460, borderRadius: 26, background: '#fff', border: `5px solid ${ORANGE}`, boxShadow: `7px 7px 0 ${ORANGE}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, opacity: pop(t, x.a), transform: `translateY(${(1 - pop(t, x.a)) * 80}px) rotateY(${(1 - pop(t, x.a)) * 90}deg)`}}>
              <div style={{width: 70, height: 70, borderRadius: 35, background: ORANGE, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 38, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{k + 1}</div>
              <F n={x.ic} size={120} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK, textAlign: 'center'}}>{x.l}</span><span style={{fontFamily: sansFont, fontWeight: 700, fontSize: 22, color: DIM, textAlign: 'center', padding: '0 10px'}}>{x.s}</span>
              {k === 0 && t > 235.4 && <div style={{transform: `scale(${spring(t, 235.4)})`}}><Pill at={235.4} c={GREEN} size={22}>du concret</Pill></div>}
            </div>)}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 6 · ENTRETIEN ET DÉBUTS ═════════════ */
const Entretien: React.FC = () => {
  const t = useT();
  const ph = t < 275.5 ? 0 : t < 290.1 ? 1 : 2;
  const tilt = prog(t, 259.4, 261.0, easeInOut);
  const flame = prog(t, 297.6, 299.0, easeOut);
  return (
    <Out end={OUTRO_AT}>
      {ph === 0 && (
        <>
          <HiLine words={t < 261.6 ? ['La', 'capacité', 'à', 'apprendre'] : ['L’honnêteté', 'structurée']} mark={t < 261.6 ? [1, 3] : [0, 1]} at={t < 261.6 ? 259.7 : 266.98} y={330} size={66} />
          <Shot src={IMG.entretien} ic="directeur" x={60} y={440} w={960} h={340} at={249.3} c={RED} />
          <Abs x={60} y={810} w={960} h={560}>
            {t < 261.6 ? <div style={{position: 'absolute', left: 130, top: 20, width: 700, height: 520, opacity: pop(t, 252.4)}}>
              <div style={{position: 'absolute', left: 330, top: 180, width: 40, height: 300, background: INK, borderRadius: 10}} />
              <div style={{position: 'absolute', left: 50, top: 160, width: 600, height: 20, background: INK, borderRadius: 10, transform: `rotate(${lerp(0, 14, tilt)}deg)`}}>
                <div style={{position: 'absolute', left: -20, top: 20, width: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `rotate(${-lerp(0, 14, tilt)}deg)`}}><F n="livres" size={110} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: DIM}}>connaissances</span></div>
                <div style={{position: 'absolute', right: -20, top: 20, width: 240, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `rotate(${-lerp(0, 14, tilt)}deg)`}}><F n="cerveau" size={120} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: GREEN}}>capacité à apprendre</span></div>
              </div>
            </div> : <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center'}}>
              <div style={{display: 'flex', gap: 14, alignItems: 'center'}}><Pill at={262.8} c={DIM} size={28}>question piège</Pill><span style={{fontSize: 40, fontWeight: 900, opacity: pop(t, 265.6)}}>→</span><Pill at={266.98} c={GREEN} size={28}>honnêteté</Pill></div>
              <div style={{display: 'flex', gap: 14}}>{['comprendre', 'chercher', 'résoudre'].map((l, k) => <div key={l} style={{width: 280, height: 180, borderRadius: 22, background: '#fff', border: `5px solid ${RED}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, opacity: pop(t, 269.6 + k * 0.5)}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: RED}}>{k + 1}</div><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK}}>{l}</span></div>)}</div>
              {t > 272.4 && <div style={{transform: `scale(${spring(t, 272.4)})`}}><Pill at={272.4} c={GOLD} size={32}>× 1000 de valeur vs une réponse inventée</Pill></div>}
            </div>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 284.4 ? ['Une', 'porte', 'd’entrée'] : ['Apprendre,', 'proposer,', 'construire']} mark={t < 284.4 ? [1, 2] : [0, 1, 2]} at={t < 284.4 ? 279.9 : 284.58} y={330} size={t < 284.4 ? 60 : 50} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 180, top: 40, width: 600, height: 340, borderRadius: 24, background: '#fff', border: `6px solid ${INK}`, boxShadow: `10px 10px 0 ${RED}`, padding: 36, boxSizing: 'border-box', opacity: pop(t, 275.8), transform: `rotate(${-3 + Math.sin(t) * 1}deg)`}}>
              <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>CARTE DE VISITE</div>
              <div style={{position: 'relative', marginTop: 30, fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: INK, display: 'inline-block'}}>Titre du poste<Strike p={prog(t, 283.4, 283.9)} c={RED} /></div>
              <div style={{marginTop: 20, width: 300, height: 18, borderRadius: 6, background: '#E3E8EF'}} />
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 460, display: 'flex', justifyContent: 'center', gap: 16}}>{[{l: 'ce qu’on apprend', ic: 'livres', a: 284.58}, {l: 'ce qu’on propose', ic: 'ampoule', a: 285.86}, {l: 'ce qu’on construit', ic: 'brique', a: 286.86}].map((x) => <div key={x.l} style={{width: 290, height: 300, borderRadius: 24, background: RED, border: `5px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, transform: `scale(${t > x.a ? spring(t, x.a) : 0})`}}><F n={x.ic} size={120} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff', textAlign: 'center'}}>{x.l}</span></div>)}</div>
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 304.5 ? ['Un', 'métier', 'de', 'conviction'] : ['Ma', 'première', 'action', 'concrète', '?']} mark={t < 304.5 ? [1, 3] : [1, 2, 3]} at={t < 304.5 ? 297.6 : 312.4} y={330} size={t < 304.5 ? 64 : 56} />
          <Abs x={60} y={440} w={960} h={930}>
            {t < 304.5 ? <>
              <div style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center', gap: 14, opacity: 1 - flame * 0.7, filter: `blur(${flame * 3}px)`}}><Pill at={293.4} c={DIM} size={30}>normes</Pill><Pill at={294.3} c={DIM} size={30}>papiers</Pill><Pill at={295.02} c={DIM} size={30}>procédures</Pill></div>
              <div style={{position: 'absolute', left: 280, top: 140, width: 400, height: 520, display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
                <div style={{position: 'absolute', left: 50, top: 80, width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle, ${GOLD}AA, transparent 70%)`, transform: `scale(${flame * (1 + 0.08 * Math.sin(t * 8))})`}} />
                <div style={{transform: `scale(${flame * (1 + 0.05 * Math.sin(t * 11))})`, transformOrigin: '50% 100%'}}><F n="feu" size={380} /></div>
              </div>
              {t > 301.4 && <div style={{position: 'absolute', left: 0, right: 0, top: 740, display: 'flex', justifyContent: 'center'}}><Pill at={301.4} c={RED} size={32}>la transmettre dès le premier contact</Pill></div>}
            </> : <>
              <div style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center', gap: 14}}><div style={{position: 'relative'}}><Pill at={306.7} c={DIM} size={30}>savoir quoi faire</Pill><div style={{position: 'absolute', left: 8, right: 8, top: '50%'}}><Strike p={prog(t, 307.4, 307.9)} c={RED} /></div></div><Pill at={307.94} c={GREEN} size={30}>le faire</Pill></div>
              <div style={{position: 'absolute', left: 130, top: 130, width: 700, height: 520, background: '#FFFDF6', border: `6px solid ${INK}`, borderRadius: 18, boxShadow: `10px 10px 0 ${GOLD}`, padding: 40, boxSizing: 'border-box', opacity: pop(t, 310.4)}}>
                <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>MON CARNET · JOUR 1</div>
                <div style={{marginTop: 30, fontFamily: handFont, fontSize: 50, color: INK, lineHeight: 1.3}}>{'Ma toute première action concrète : …'.slice(0, Math.floor(prog(t, 311.4, 314.0, (x) => x) * 37))}</div>
                <div style={{position: 'absolute', right: 50, bottom: 40, transform: `rotate(${-20 + Math.sin(t * 8) * 6}deg)`}}><F n="ecrit" size={110} /></div>
              </div>
              {t > 315.78 && <div style={{position: 'absolute', left: 0, right: 0, top: 700, display: 'flex', justifyContent: 'center'}}><Pill at={315.78} c={GOLD} size={34}>le vrai début de l’histoire</Pill></div>}
              {t > 314.6 && <Dust n={26} c={GOLD} />}
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
  {at: 6.2, s: 'sfx/rise', v: 0.25, dur: 1}, {at: 12.6, s: 'soft-whoosh', v: 0.25, dur: 1.4}, {at: 15.9, s: 'sfx/pop', v: 0.25}, ...rep(16.3, 10, 0.25, 'sfx/click', 0.15), {at: 22.2, s: 'sfx/rise', v: 0.22, dur: 1.2}, {at: 25.4, s: 'deep-hit', v: 0.25},
  {at: 28.2, s: 'sfx/thud', v: 0.3}, ...pops([33.0, 36.0]), {at: 40.6, s: 'cadenas', v: 0.35}, {at: 40.8, s: 'soft-whoosh', v: 0.45, dur: 1.8}, {at: 43.2, s: 'sfx/swish', v: 0.3}, {at: 45.3, s: 'soft-whoosh', v: 0.3, dur: 1}, ...pops([47.0, 48.2]), ...rep(52.6, 14, 0.1, 'tick', 0.12), {at: 54.0, s: 'validation', v: 0.35},
  ...[59.6, 61.18, 63.9, 65.8, 69.04].map((a) => ({at: a, s: 'sfx/swish', v: 0.28})),
  {at: 75.9, s: 'soft-whoosh', v: 0.3, dur: 1}, ...rep(77.5, 5, 0.2, 'sfx/thud', 0.18), {at: 84.0, s: 'sfx/ding', v: 0.25}, {at: 84.6, s: 'tampon', v: 0.5},
  ...searchCues(88.0, 17, 90.3, 90.8), {at: 93.6, s: 'validation', v: 0.25}, {at: 95.8, s: 'deep-hit', v: 0.25}, {at: 98.6, s: 'sfx/ding', v: 0.3}, {at: 101.0, s: 'sfx/pop', v: 0.25},
  {at: 106.9, s: 'page', v: 0.4}, {at: 113.4, s: 'sfx/pop', v: 0.2}, {at: 115.0, s: 'sfx/swish', v: 0.3}, {at: 116.4, s: 'sfx/pop', v: 0.2}, {at: 121.0, s: 'soft-whoosh', v: 0.35, dur: 1.6}, {at: 125.68, s: 'tampon', v: 0.55}, ...rep(127.6, 4, 0.2, 'sfx/thud', 0.2),
  {at: 131.3, s: 'soft-whoosh', v: 0.35, dur: 1.3}, {at: 132.8, s: 'tampon', v: 0.5}, ...pops([139.4, 140.9, 141.9]), {at: 143.6, s: 'sfx/ding', v: 0.25},
  {at: 147.0, s: 'page', v: 0.4}, ...rep(153.6, 6, 0.08, 'sfx/click', 0.15), {at: 155.2, s: 'sfx/swish', v: 0.35}, {at: 156.4, s: 'validation', v: 0.3}, {at: 158.6, s: 'sfx/thud', v: 0.3}, ...pops([159.6, 160.6, 162.6]), {at: 163.6, s: 'sfx/ding', v: 0.25},
  {at: 169.4, s: 'sfx/pop', v: 0.2}, {at: 171.4, s: 'deep-hit', v: 0.25}, {at: 172.6, s: 'sfx/rise', v: 0.35, dur: 1.8}, {at: 176.4, s: 'sfx/thud', v: 0.3}, {at: 179.0, s: 'sfx/pop', v: 0.3},
  {at: 184.7, s: 'soft-whoosh', v: 0.3, dur: 1}, ...rep(185.0, 12, 0.75, 'tick', 0.06), ...[190.6, 192.4, 193.4].map((a) => ({at: a, s: 'sfx/ding', v: 0.25})), {at: 195.6, s: 'sfx/pop', v: 0.2},
  {at: 198.0, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 202.0, s: 'tampon', v: 0.55}, {at: 204.6, s: 'sfx/pop', v: 0.3}, ...[205.0, 206.2, 208.3, 211.0].map((a) => ({at: a, s: 'sfx/ding', v: 0.2})),
  {at: 218.2, s: 'sfx/rise', v: 0.2, dur: 1.6}, {at: 225.8, s: 'sfx/thud', v: 0.5}, {at: 226.0, s: 'bass-hit', v: 0.35}, {at: 227.6, s: 'sfx/pop', v: 0.2},
  {at: 229.8, s: 'soft-whoosh', v: 0.3, dur: 1}, ...[231.4, 237.0, 241.0].map((a) => ({at: a, s: 'sfx/swish', v: 0.3})), {at: 235.4, s: 'sfx/pop', v: 0.2}, {at: 244.4, s: 'validation', v: 0.3},
  {at: 249.3, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 258.0, s: 'sfx/swish', v: 0.3}, {at: 260.0, s: 'sfx/thud', v: 0.3}, ...pops([262.6, 266.4]), ...rep(269.4, 3, 0.6, 'sfx/thud', 0.2), {at: 272.4, s: 'sfx/ding', v: 0.3},
  {at: 275.8, s: 'page', v: 0.35}, {at: 283.0, s: 'sfx/swish', v: 0.35}, ...[285.0, 286.4, 287.6].map((a) => ({at: a, s: 'sfx/pop', v: 0.25})),
  ...pops([292.8, 293.6, 294.6], 0.15), {at: 298.0, s: 'riser', v: 0.35}, {at: 298.1, s: 'sfx/rise', v: 0.3, dur: 1.4}, {at: 300.8, s: 'sfx/pop', v: 0.2},
  {at: 305.4, s: 'sfx/pop', v: 0.2}, {at: 307.6, s: 'sfx/swish', v: 0.3}, {at: 308.6, s: 'validation', v: 0.3}, {at: 310.4, s: 'page', v: 0.35}, {at: 311.4, s: 'stylo', v: 0.4, dur: 2.6}, {at: 315.0, s: 'bass-hit', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<TK, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
export const PremierEmploi: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={5.9} to={72.4}><Porte /></Gate>
    <Gate from={75.6} to={103.4}><Illusion /></Gate>
    <Gate from={106.6} to={165.95}><Cv /></Gate>
    <Gate from={169.2} to={214.65}><Opportunite /></Gate>
    <Gate from={217.9} to={245.9}><Credibilite /></Gate>
    <Gate from={249.1} to={OUTRO_AT}><Entretien /></Gate>
    {SECT.map((x, i) => { const C = TRANS[x.k]; return <Gate key={x.n} from={x.at} to={x.at + 3.7}><C i={i} /></Gate>; })}
    <Gate from={10} to={302}><StationBanner /></Gate>
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={317.2}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-premier-emploi-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Tile, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, BURG, YEL, Board, random, TEAL, PhotoLetter, Watermark, IMG.bureau];
