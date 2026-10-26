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
 * « La méthode SMART » (voix d'origine, 47 s) — capsule « condensé + effet wahou + ultra premium » présentée en métro
 * (7 stations : S, M, A, R, T, la maison, le plan). Tube de verre à six guichets adaptés au sujet : SMART → spécifique →
 * mesurable → atteignable/réaliste/temporel → exemple → plan d'action ; la capsule file d'un guichet à l'autre.
 * Gyrophare (principal), loupe, capsule pneumatique, store vénitien ; barre de recherche qui trouve et ouvre « la
 * méthode SMART ». Tableau S-M-A-R-T vivant, maison qui se construit étage par étage avec tampons SMART, bouton
 * « Télécharger » cliqué. Kits capsule-ui-neo-brutal et capsule-recit-illustre. Couverture : photo + « MÉTHODE /
 * SMART » en lettres-photos animées.
 */
const IMG = {
  cover: 'sysqsse-gen/conception.jpg',
  cMet: 'maturite-gen/proactif.jpg',
  cSmart: 'sigles-gen/indicateurs.jpg',
  clair: 'sysqsse-gen/conception.jpg',
  ressources: 'heures-gen/equipe-chantier.jpg',
  contraintes: 'isoperf-gen/chrono.jpg',
  temps: 'vingt-gen/montre.jpg',
  chantier: 'heures-gen/panneau.jpg',
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
const OUTRO_AT = 47.2;
export const SMART_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 2.9, n: '1', title: 'La méthode SMART', s: 'des objectifs efficaces', c: NAVY, g: 'SMART', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 10.7, n: 'S', title: 'Spécifique', s: 'clair · concret · compris par tous', c: BLUE, g: 'spécifique', k: 'gyro', lab: 'GUICHET 2 / 6'},
  {at: 16.2, n: 'M', title: 'Mesurable', s: 'des indicateurs précis', c: GREEN, g: 'mesurable', k: 'loupe', lab: 'GUICHET 3 / 6'},
  {at: 19.7, n: 'A', title: 'Atteignable · Réaliste · Temporel', s: 'ressources · contraintes · temps', c: ORANGE, g: 'A · R · T', k: 'none', lab: 'GUICHET 4 / 6'},
  {at: 26.4, n: '5', title: 'L’exemple', s: 'construire une maison', c: TEAL, g: 'exemple', k: 'tube', lab: 'GUICHET 5 / 6'},
  {at: 34.6, n: '6', title: 'Le plan d’action', s: 'précis · mesurable · maîtrisé', c: VIO, g: 'plan d’action', k: 'store', lab: 'GUICHET 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 40.3;
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

/* ═════════════ La ligne de métro (6 stations = 6 maillons) ═════════════ */
const STATIONS = [
  {n: 1, l: 'S · spécifique', s: 'S', at: 13.3},
  {n: 2, l: 'M · mesurable', s: 'M', at: 17.5},
  {n: 3, l: 'A · atteignable', s: 'A', at: 20.6},
  {n: 4, l: 'R · réaliste', s: 'R', at: 23.2},
  {n: 5, l: 'T · temporel', s: 'T', at: 25.4},
  {n: 6, l: 'La maison', s: 'maison', at: 29.0},
  {n: 7, l: 'Le plan d’action', s: 'plan', at: 38.0},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE SMART · STATION {r.n} / 7</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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

/* ═════════════ Les 5 lettres ═════════════ */
const LET: {L: string; w: string; c: string; at: number; ic: string}[] = [
  {L: 'S', w: 'Spécifique', c: BLUE, at: 5.8, ic: 'cible'},
  {L: 'M', w: 'Mesurable', c: GREEN, at: 6.8, ic: 'graphique'},
  {L: 'A', w: 'Atteignable', c: ORANGE, at: 7.9, ic: 'montagne'},
  {L: 'R', w: 'Réaliste', c: VIO, at: 9.0, ic: 'balance'},
  {L: 'T', w: 'Temporel', c: RED, at: 10.0, ic: 'sablier'},
];

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="cible" w={1080} h={820} pos="50% 40%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 24%, ${PAPER}CC 32%, ${PAPER} 37%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb(NBK, 5), color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3, padding: '8px 22px'}}>DES OBJECTIFS EFFICACES</div></Abs>
      <Abs x={0} y={650} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="MÉTHODE" src={IMG.cMet} size={150} ls={4} /></Abs>
      <Abs x={0} y={810} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="SMART" src={IMG.cSmart} size={230} ls={10} seed={3} /></Abs>
      <Abs x={60} y={1080} w={960} style={{display: 'flex', justifyContent: 'center', gap: 14}}>{LET.map((x, k) => <div key={x.L} style={{...nb('#fff', 5), boxShadow: `5px 5px 0 ${x.c}`, width: 172, padding: '8px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `translateY(${(1 - Math.min(1, spring(t, 0.3 + k * 0.1))) * 60}px)`}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: x.c, lineHeight: 1}}>{x.L}</div><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 18, color: NBK}}>{x.w}</div></div>)}</Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Intro : objectifs flous → recherche → SMART se déplie ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  if (t < 5.6) return (
    <Out end={5.65}>
      <HiLine words={['Des', 'objectifs', 'efficaces']} mark={[1, 2]} at={2.9} y={330} size={64} />
      <SearchOpen x={60} y={440} w={960} h={930} at={2.8} query="objectif" results={['« Faire mieux »', 'La méthode SMART', 'Viser la lune']} found={1} foundAt={4.15} clickAt={4.45} c={NAVY}>
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10}}>{LET.map((x, k) => <div key={x.L} style={{fontFamily: sansFont, fontWeight: 900, fontSize: 160, color: x.c, transform: `translateY(${(1 - Math.min(1, spring(t, 5.1 + k * 0.08))) * -200}px)`, textShadow: `6px 6px 0 ${NBK}`}}>{x.L}</div>)}</div>
      </SearchOpen>
    </Out>
  );
  return (
    <Out end={10.75}>
      <HiLine words={['S', 'M', 'A', 'R', 'T']} mark={[0, 1, 2, 3, 4]} at={4.7} y={330} size={70} />
      <Abs x={60} y={440} w={960} h={930}>
        {LET.map((x, k) => { const on = t > x.at; const sc = on ? Math.min(1, spring(t, x.at)) : 0; return (
          <div key={x.L} style={{position: 'absolute', left: 0, top: k * 168, width: 960, height: 150, display: 'flex', alignItems: 'center', gap: 22}}>
            <div style={{...nb(on ? x.c : '#fff', 7), width: 150, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 100, color: on ? '#fff' : x.c, transform: `rotate(${on ? (1 - sc) * 180 : 0}deg)`}}>{x.L}</div>
            <div style={{...nb('#fff', 6), flex: 1, height: 120, display: 'flex', alignItems: 'center', gap: 20, padding: '0 24px', transform: `scaleX(${sc})`, transformOrigin: '0 50%', boxShadow: `6px 6px 0 ${x.c}`}}><F n={x.ic} size={80} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: NBK}}>{x.w === 'Temporel' ? 'Temporellement défini' : x.w}</span></div>
          </div>
        ); })}
      </Abs>
    </Out>
  );
};

/* ═════════════ Tableau S-M-A-R-T vivant (spécifique → temps) ═════════════ */
const BOARD: {from: number; to: number; k: number; img: string; chips: {at: number; ic: string; l: string}[]}[] = [
  {from: 14.0, to: 16.3, k: 0, img: IMG.clair, chips: [{at: 14.0, ic: 'check', l: 'clair'}, {at: 14.2, ic: 'check', l: 'concret'}, {at: 14.9, ic: 'equipe', l: 'compris par tous'}]},
  {from: 19.7, to: 22.9, k: 2, img: IMG.ressources, chips: [{at: 20.6, ic: 'montagne', l: 'atteignable'}, {at: 21.6, ic: 'boite-outils', l: 'ressources disponibles'}]},
  {from: 22.9, to: 25.3, k: 3, img: IMG.contraintes, chips: [{at: 23.2, ic: 'balance', l: 'réaliste'}, {at: 24.4, ic: 'chaine-cassee', l: 'face aux contraintes'}]},
  {from: 25.3, to: 26.5, k: 4, img: IMG.temps, chips: [{at: 25.4, ic: 'calendrier', l: 'défini dans le temps'}]},
];
const Board5: React.FC = () => {
  const t = useT();
  const b = BOARD.find((x) => t >= x.from && t < x.to);
  if (!b) return null;
  const L = LET[b.k];
  const head = b.k === 0 ? ['Clair', 'et', 'concret'] : b.k === 2 ? ['Selon', 'les', 'ressources'] : b.k === 3 ? ['Face', 'aux', 'contraintes'] : ['Dans', 'le', 'temps'];
  return (
    <>
      <HiLine words={head} mark={[0, 2]} at={b.from + 0.1} y={330} size={64} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 130, display: 'flex', flexDirection: 'column', gap: 14}}>{LET.map((x, k) => { const here = k === b.k; const passed = k < b.k; return <div key={x.L} style={{...nb(here ? x.c : passed ? '#fff' : '#F1F1EA', here ? 8 : 4), width: 130, height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: here ? '#fff' : passed ? x.c : '#C2C8D2', transform: `scale(${here ? 1.08 : 1})`}}>{x.L}{passed && <div style={{position: 'absolute', right: -14, top: -14, width: 44, height: 44, borderRadius: 22, background: GREEN, border: `3px solid ${NBK}`, color: '#fff', fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>✓</div>}</div>; })}</div>
        <Shot src={b.img} ic={L.ic} x={170} y={0} w={790} h={440} at={b.from} pos="50% 40%" c={L.c} />
        <div style={{position: 'absolute', left: 190, top: 20, zIndex: 6}}><NBadge at={b.from + 0.1} text={L.w.toUpperCase()} bg={L.c} rot={-4} size={34} /></div>
        <div style={{position: 'absolute', left: 170, top: 480, display: 'flex', flexDirection: 'column', gap: 14}}>{b.chips.map((c) => <Chip key={c.l} at={c.at} ic={c.ic} l={c.l} c={L.c} />)}</div>
        {b.k === 4 && <div style={{position: 'absolute', left: 640, top: 470, transform: `scale(${pop(t, 25.5)}) rotate(${(t - 25.5) * 120}deg)`}}><F n="sablier" size={130} /></div>}
        {b.k === 2 && <div style={{...nb('#fff', 5), position: 'absolute', left: 600, top: 500, width: 330, height: 80, padding: 10}}><div style={{height: '100%', borderRadius: 10, border: `3px solid ${NBK}`, overflow: 'hidden'}}><div style={{width: `${prog(t, 21.6, 22.6) * 80}%`, height: '100%', background: `linear-gradient(90deg, ${ORANGE}, ${YEL})`}} /></div></div>}
      </Abs>
    </>
  );
};

/* ═════════════ L'exemple : la maison se construit, une étape = un objectif SMART ═════════════ */
const FLOORS = [
  {l: '1. Fondations', s: 'béton & structure', at: 30.5, c: NAVY},
  {l: '2. Murs porteurs', s: 'élévation & structure', at: 31.0, c: TEAL},
  {l: '3. Toiture', s: 'charpente & couverture', at: 31.5, c: ORANGE},
];
const Maison: React.FC = () => {
  const t = useT();
  return (
    <Out end={34.65}>
      <HiLine words={t < 31.8 ? ['Décomposer', 'le', 'projet'] : ['Chaque', 'étape', 'SMART']} mark={t < 31.8 ? [0] : [1, 2]} at={t < 31.8 ? 29.9 : 31.9} y={330} size={64} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{...nb(NBK, 5), position: 'absolute', left: 130, top: 0, width: 700, height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff', opacity: pop(t, 29.8)}}>Projet : construction d’une maison</div>
        {/* maison stylisée */}
        <svg style={{position: 'absolute', left: 60, top: 120}} width={420} height={620}>
          <path d="M 20 600 L 400 600" stroke={NBK} strokeWidth={8} />
          <rect x={40} y={520} width={340} height={80} fill={NAVY} stroke={NBK} strokeWidth={6} style={{transformOrigin: '210px 600px', transform: `scaleY(${prog(t, 30.5, 30.9, easeOut)})`}} />
          <rect x={60} y={300} width={300} height={220} fill="#fff" stroke={NBK} strokeWidth={6} style={{transformOrigin: '210px 520px', transform: `scaleY(${prog(t, 31.0, 31.5, easeOut)})`}} />
          {prog(t, 31.3, 31.5) > 0 && <><rect x={100} y={350} width={70} height={60} fill={GLASS} stroke={NBK} strokeWidth={5} opacity={prog(t, 31.3, 31.5)} /><rect x={250} y={350} width={70} height={60} fill={GLASS} stroke={NBK} strokeWidth={5} opacity={prog(t, 31.3, 31.5)} /><rect x={180} y={420} width={60} height={100} fill={TEAL} stroke={NBK} strokeWidth={5} opacity={prog(t, 31.3, 31.5)} /></>}
          <path d="M 30 305 L 210 140 L 390 305 Z" fill={ORANGE} stroke={NBK} strokeWidth={6} style={{transform: `translateY(${(1 - prog(t, 31.5, 32.0, easeOut)) * -400}px)`}} opacity={prog(t, 31.5, 31.7)} />
        </svg>
        <div style={{position: 'absolute', left: 500, top: 150, display: 'flex', flexDirection: 'column-reverse', gap: 22}}>
          {FLOORS.map((f, k) => { const on = t > f.at; const smart = t > 33.4 + k * 0.2; return (
            <div key={k} style={{...nb('#fff', 6), width: 440, padding: '14px 18px', boxShadow: `6px 6px 0 ${f.c}`, opacity: on ? 1 : 0, transform: `translateX(${on ? (1 - Math.min(1, spring(t, f.at))) * 200 : 200}px)`, position: 'relative'}}>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: NBK}}>{f.l}</div>
              <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM}}>{f.s}</div>
              {smart && <div style={{position: 'absolute', right: -24, top: -26, transform: `rotate(-8deg) scale(${lerp(2, 1, prog(t, 33.4 + k * 0.2, 33.6 + k * 0.2))})`, border: `5px solid ${GREEN}`, borderRadius: 10, padding: '2px 10px', fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: GREEN, background: '#fff'}}>SMART ✓</div>}
            </div>
          ); })}
        </div>
        {t > 32.4 && <div style={{position: 'absolute', left: 520, top: 620}}><Chip at={32.4} ic="cible" l="pour chaque étape" c={TEAL} /></div>}
      </Abs>
    </Out>
  );
};

/* ═════════════ Plan d'action : l'idée devient un plan ═════════════ */
const PlanAction: React.FC = () => {
  const t = useT();
  const morph = prog(t, 38.2, 38.9, easeInOut);
  const rows = [['Fondations', 'validées & mesurées', 38.7], ['Murs', 'ressources & délais fixés', 39.4], ['Toiture', 'contraintes maîtrisées', 40.3]];
  return (
    <Out end={41.5}>
      <HiLine words={['Une', 'idée', '→', 'un', 'plan']} mark={[1, 4]} at={38.2} y={330} size={64} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{position: 'absolute', left: 380, top: 40, opacity: 1 - morph, transform: `scale(${1 - morph * 0.5}) rotate(${morph * 90}deg)`}}><F n="ampoule" size={200} /></div>
        <div style={{...nb('#fff', 9), position: 'absolute', left: 90, top: 60, width: 780, height: 560, boxShadow: `9px 9px 0 ${VIO}`, opacity: morph, transform: `scale(${0.6 + 0.4 * morph})`, overflow: 'hidden'}}>
          <div style={{height: 90, background: VIO, borderBottom: `4px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff'}}>PLAN D’ACTION S.M.A.R.T.</div>
          <div style={{padding: '30px 36px', display: 'flex', flexDirection: 'column', gap: 24}}>{rows.map(([a, b, at]) => { const on = t > (at as number); return <div key={a as string} style={{display: 'flex', alignItems: 'center', gap: 18, opacity: on ? 1 : 0.25}}><div style={{width: 56, height: 56, borderRadius: 28, background: on ? GREEN : '#DDD', border: `4px solid ${NBK}`, color: '#fff', fontSize: 32, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${on ? Math.min(1, spring(t, at as number)) : 0.8})`}}>✓</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: NBK}}>{a}</div><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 28, color: DIM}}>{b}</div></div>; })}</div>
          <div style={{position: 'absolute', left: 36, right: 36, bottom: 30, display: 'flex', justifyContent: 'center', gap: 14}}>{[['précis', 38.7], ['mesurable', 39.4], ['maîtrisé', 40.3]].map(([l, a]) => <div key={l as string} style={{...nb(t > (a as number) ? YEL : '#F1F1EA', 4), padding: '6px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, opacity: t > (a as number) ? 1 : 0.4}}>{l}</div>)}</div>
        </div>
        {t > 40.3 && <Dust n={22} c={ACC} />}
      </Abs>
    </Out>
  );
};

/* ═════════════ Fin : télécharger le modèle (bouton néo-brutal cliqué, fichier qui s'envole) ═════════════ */
const Fin: React.FC = () => {
  const t = useT();
  const click = 42.5;
  const cur = prog(t, 41.7, click, easeInOut);
  const done = t > click;
  const fly = prog(t, click + 0.1, click + 1.2, easeInOut);
  return (
    <>
      <HiLine words={['Téléchargez', 'le', 'modèle']} mark={[0, 2]} at={41.8} y={330} size={60} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{...nb('#fff', 8), position: 'absolute', left: 300, top: lerp(20, -260, fly), width: 360, height: 420, boxShadow: `8px 8px 0 ${VIO}`, opacity: pop(t, 41.6) * (1 - fly), transform: `rotate(${fly * 25}deg) scale(${1 - fly * 0.5})`, overflow: 'hidden'}}><div style={{height: 70, background: VIO, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff'}}>MODÈLE SMART</div><div style={{padding: 20, display: 'flex', flexDirection: 'column', gap: 16}}>{LET.map((x) => <div key={x.L} style={{display: 'flex', alignItems: 'center', gap: 12}}><div style={{width: 46, height: 46, borderRadius: 10, background: x.c, color: '#fff', fontWeight: 900, fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont}}>{x.L}</div><div style={{flex: 1, height: 12, borderRadius: 6, background: '#E3E8EF'}} /></div>)}</div></div>
        {done && <div style={{position: 'absolute', left: 380, top: 60, opacity: prog(t, click + 1.0, click + 1.3), transform: `scale(${t > click + 1.0 ? Math.min(1, spring(t, click + 1.0)) : 0})`}}><F n="bulle" size={200} /></div>}
        <div style={{position: 'absolute', left: 190, top: 480, width: 580, height: 120, ...nb(done ? NBK : RED, done ? 4 : 10), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, fontFamily: sansFont, fontWeight: 900, fontSize: 42, color: '#fff', transform: `translate(${done && t < click + 0.15 ? 6 : 0}px, ${done && t < click + 0.15 ? 6 : 0}px) scale(${pop(t, 41.8)})`}}>{done ? '✓ Modèle téléchargé' : '⬇ Télécharger'}</div>
        {t > 41.9 && t < click + 0.8 && <div style={{position: 'absolute', left: lerp(860, 600, cur), top: lerp(800, 540, cur), zIndex: 5}}><svg width={60} height={74} viewBox="0 0 24 30"><path d="M2 2 L2 24 L8 18 L12 28 L16 26 L12 17 L20 17 Z" fill="#fff" stroke={INK} strokeWidth={2} strokeLinejoin="round" /></svg></div>}
        {done && t < click + 0.7 && <div style={{position: 'absolute', left: 480 - (t - click) * 400, top: 540 - (t - click) * 400, width: (t - click) * 800, height: (t - click) * 800, borderRadius: '50%', border: `6px solid ${RED}`, opacity: 1 - (t - click) / 0.7}} />}
        <div style={{position: 'absolute', left: 0, right: 0, top: 660, display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap'}}><Chip at={43.9} ic="bulle" l="en commentaire" c={VIO} /><Chip at={45.5} ic="outils" l="adaptez-le à votre projet" c={GREEN} /></div>
      </Abs>
    </>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at, s: 'sfx/bell', v: 0.22})),
  ...searchCues(2.8, 8, 4.15, 4.45), ...rep(4.8, 5, 0.08, 'sfx/thud', 0.2),
  ...LET.map((x) => ({at: x.at, s: 'tampon', v: 0.3})),
  ...BOARD.flatMap((b) => [{at: b.from, s: 'sfx/swish', v: 0.25}, ...b.chips.map((c) => ({at: c.at + 0.05, s: 'validation', v: 0.15}))]),
  ...FLOORS.map((f) => ({at: f.at, s: 'sfx/thud', v: 0.4})), {at: 31.5, s: 'deep-hit', v: 0.3}, ...rep(33.4, 3, 0.2, 'tampon', 0.35),
  {at: 38.2, s: 'soft-whoosh', v: 0.4, dur: 1}, {at: 38.7, s: 'validation', v: 0.2}, {at: 39.4, s: 'validation', v: 0.2}, {at: 40.3, s: 'validation', v: 0.2},
  {at: 42.5, s: 'sfx/click', v: 0.55}, {at: 42.6, s: 'soft-whoosh', v: 0.4, dur: 1}, {at: 43.5, s: 'sfx/pop', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
export const SmartMethode: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.8} to={10.8}><Intro /></Gate>
    <Gate from={13.9} to={26.5}><Board5 /></Gate>
    <Gate from={29.7} to={34.7}><Maison /></Gate>
    <Gate from={38.0} to={41.6}><PlanAction /></Gate>
    <Gate from={41.5} to={OUTRO_AT}><Fin /></Gate>
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={47.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-methode-smart-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE];
