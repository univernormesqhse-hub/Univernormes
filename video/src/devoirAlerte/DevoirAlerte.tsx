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
 * « Le devoir d’alerte » (4 min 15) — capsule « condensé + effet wahou + ultra premium » : voix d'origine
 * (sans musique de fond), sous-titres calés mot à mot, photos générées (ChatGPT) d'après les prompts de
 * prompts-images-devoir-alerte.md, thème « papier quadrillé ».
 * Fil rouge : LE TUBE PNEUMATIQUE À SIX GUICHETS (Leila → signaux d'alarme → processus brisé → prix du silence → leçon →
 * nouvelle règle), adaptés aux parties réellement présentes ; la capsule file d'un guichet à l'autre, chaque guichet
 * passé se coche. Transition : LE GYROPHARE à chaque partie ; dans les scènes : capsule pneumatique, loupe, store vénitien.
 * Ultra premium : checklist toute cochée qui « ne suffit pas », retour en arrière jusqu'en 2003, fiche d'identité de
 * Leila, voyants d'alarme, jauge 1,3–1,6 × la limite légale, citation de la direction tapée puis tamponnée, chaîne du
 * processus qui se brise, écran qui s'éteint sur « le silence », gel « tout paralysé », frise des 18 mois, documenter ≠
 * agir, écran partagé « ma protection / sa protection », gouffre papier / humain, barre de recherche qui trouve puis
 * OUVRE la nouvelle règle (escalier d'escalade), balance procédure / conscience.
 */
const IMG = {
  cover: '',
  leila: '',
  ventilation: '',
  direction: '',
  silence: '',
  peur: '',
  diagnostic: '',
  escalade: '',
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
const OUTRO_AT = 250.9;
export const ALERTE_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 19.5, n: '1', title: 'L’histoire de Leila', s: 'un danger invisible', c: ORANGE, g: 'Leila', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 46.6, n: '2', title: 'Les signaux d’alarme', s: 'clairs, chiffrés… ignorés', c: RED, g: 'signaux', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 91.5, n: '3', title: 'Le processus brisé', s: 'un échec humain', c: NAVY, g: 'processus brisé', k: 'gyro', lab: 'PARTIE 3 / 6'},
  {at: 135.2, n: '4', title: 'Le prix du silence', s: 'humain, irréversible', c: BURG, g: 'prix du silence', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 165.1, n: '5', title: 'La leçon', s: 'documenter n’est pas agir', c: BLUE, g: 'leçon', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 211.7, n: '6', title: 'La nouvelle règle', s: 'procédure ou conscience ?', c: GREEN, g: 'nouvelle règle', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 247.4;
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

/** Voyant d'alarme clignotant. */
const Beacon: React.FC<{c: string; size: number; on: boolean; ph?: number}> = ({c, size, on, ph = 0}) => {
  const t = useT();
  const lit = on && Math.sin(t * 9 + ph) > -0.2;
  return <div style={{width: size, height: size, borderRadius: size, background: lit ? c : '#3A4356', border: `${size * 0.08}px solid ${INK}`, boxShadow: lit ? `0 0 ${size * 0.6}px ${c}` : 'none'}} />;
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 200}}><Pic src={IMG.cover} ic="sirene" w={1080} h={740} pos="50% 30%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER} 9%, ${PAPER}00 16%, ${PAPER}00 34%, ${PAPER}DD 43%, ${PAPER} 48%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={930} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>HISTOIRE VRAIE · SANTÉ AU TRAVAIL</div>
        <div style={{marginTop: 16}}><Board text="LE DEVOIR" at={-1} h={84} gap={2} c={ORANGE} stag={0.02} /></div>
        <div style={{marginTop: 8}}><Board text="D’ALERTE" at={-1} h={84} gap={2} c={RED} stag={0.02} /></div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 48, color: INK, marginTop: 14}}>procédure… ou conscience ?</div>
      </Abs>
      <Abs x={60} y={1440} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={ORANGE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO ═════════════ */
const PROC = ['remplir le formulaire', 'envoyer le rapport', 'faire les relances', 'suivre la procédure'];
const Intro: React.FC = () => {
  const t = useT();
  const crack = prog(t, 15.8, 16.8, easeIn);
  return (
    <Out end={19.5}>
      <HiLine words={t < 8.6 ? ['Le', 'devoir', 'd’alerte'] : ['La', 'procédure', 'ne', 'suffit', 'pas']} mark={t < 8.6 ? [1, 2] : [1, 3]} at={t < 8.6 ? 2.8 : 8.7} y={330} size={62} />
      {t < 8.6 && (
        <Abs x={60} y={450} w={960} h={900}>
          <div style={{position: 'absolute', left: 280, top: 20, opacity: pop(t, 2.8), transform: `rotate(${Math.sin(t * 8) * 6}deg)`}}><F n="sirene" size={400} /></div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 470, display: 'flex', justifyContent: 'center', gap: 16}}><Pill at={3.66} c={RED} size={30}>le prix du silence</Pill><Pill at={5.26} c={NAVY} size={30}>l’inaction</Pill></div>
          <div style={{position: 'absolute', left: 120, right: 120, top: 580, height: 250, borderRadius: 30, background: NIGHT, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30, opacity: pop(t, 6.66)}}><F n="danger" size={150} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: YEL, lineHeight: 1.05}}>un danger<br />bien réel</span></div>
        </Abs>
      )}
      {t >= 8.6 && (
        <Abs x={60} y={450} w={960} h={900}>
          <div style={{position: 'absolute', inset: 0, background: '#fff', border: `6px solid ${INK}`, borderRadius: 30, boxShadow: `9px 9px 0 ${RED}`, padding: '34px 40px', boxSizing: 'border-box', clipPath: crack > 0 ? `polygon(0 0, 100% 0, 100% ${40 + crack * 6}%, 55% ${52 + crack * 4}%, 40% ${46 - crack * 3}%, 0 ${58 + crack * 6}%)` : undefined}}>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: DIM}}>checklist « procédure »</div>
            {PROC.map((p, k) => { const a = 9.4 + k * 0.6; return <div key={p} style={{marginTop: 28, display: 'flex', alignItems: 'center', gap: 20, opacity: pop(t, a)}}><div style={{width: 64, height: 64, borderRadius: 14, border: `5px solid ${INK}`, background: t > a + 0.3 ? GREEN : '#fff', color: '#fff', fontSize: 40, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{t > a + 0.3 ? '✓' : ''}</div><span style={{fontFamily: sansFont, fontWeight: 800, fontSize: 40, color: INK}}>{p}</span></div>; })}
          </div>
          {crack > 0 && <div style={{position: 'absolute', inset: 0, background: '#fff', border: `6px solid ${INK}`, borderRadius: 30, clipPath: `polygon(0 ${58 + crack * 6}%, 40% ${46 - crack * 3}%, 55% ${52 + crack * 4}%, 100% ${40 + crack * 6}%, 100% 100%, 0 100%)`, transform: `translateY(${crack * 60}px) rotate(${crack * 3}deg)`}} />}
          <Stamp at={13.5} c={RED} text="ça ne suffit pas" x={180} y={640} rot={-8} size={60} />
          <div style={{position: 'absolute', left: 0, right: 0, top: 960, textAlign: 'center', opacity: pop(t, 15.82)}}><Pill at={15.82} c={NAVY} size={30}>là où les vrais problèmes commencent</Pill></div>
        </Abs>
      )}
    </Out>
  );
};

/* ═════════════ 1 · L'HISTOIRE DE LEILA ═════════════ */
const Leila: React.FC = () => {
  const t = useT();
  const ph = t < 34.5 ? 0 : 1;
  const rw = prog(t, 21.1, 22.6, easeInOut);
  return (
    <Out end={46.6}>
      {ph === 0 && (
        <>
          <HiLine words={t < 27.0 ? ['Retour', 'en', '2003'] : ['Un', 'péril', 'invisible']} mark={t < 27.0 ? [2] : [1, 2]} at={t < 27.0 ? 19.8 : 29.34} y={330} size={66} />
          <Abs x={60} y={450} w={960} h={520} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 30, overflow: 'hidden', opacity: pop(t, 20.4)}}>
            {Array.from({length: 14}, (_, k) => <div key={k} style={{position: 'absolute', left: 0, right: 0, top: ((k * 40 + t * 900 * (1 - prog(t, 22.4, 22.6))) % 560) - 20, height: 3, background: 'rgba(255,255,255,0.08)'}} />)}
            <div style={{position: 'absolute', left: 40, top: 30, fontFamily: MONO, fontWeight: 700, fontSize: 40, color: '#fff', opacity: rw < 1 ? 1 : 0.5}}>◀◀ REW</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 150, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 240, color: ORANGE, textShadow: `0 0 50px ${ORANGE}`, filter: `blur(${(1 - rw) * 6}px)`}}>{rw < 1 ? Math.round(lerp(2026, 2003, rw)) : 2003}</div>
          </Abs>
          <Abs x={60} y={1000} w={960} h={360} style={{borderRadius: 30, overflow: 'hidden', border: `6px solid ${INK}`, opacity: pop(t, 27.1), background: '#E9EEF5'}}>
            <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="eprouvette" size={200} /></div>
            {Array.from({length: 7}, (_, k) => <div key={k} style={{position: 'absolute', left: ((k * 170 + t * 40) % 1200) - 200, top: 40 + (k % 3) * 100, width: 380, height: 160, borderRadius: 160, background: 'radial-gradient(ellipse, rgba(140,200,120,0.55), transparent 70%)', filter: 'blur(10px)', opacity: prog(t, 29.3, 31.0)}} />)}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Qui', 'était', 'Leila', '?']} mark={[2]} at={34.5} y={330} size={66} />
          <Shot src={IMG.leila} ic="eprouvette" x={60} y={440} w={960} h={520} at={34.6} c={ORANGE} blinds />
          <Abs x={60} y={990} w={960} h={380} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${ORANGE}`, overflow: 'hidden', opacity: pop(t, 35.4)}}>
            <div style={{height: 60, background: ORANGE, color: '#fff', display: 'flex', alignItems: 'center', gap: 12, padding: '0 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 28}}><F n="carte-id" size={42} />FICHE · LEILA</div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, padding: '20px 24px'}}>
              {[{k: 'âge', v: '28 ans', a: 35.58}, {k: 'poste', v: 'technicienne de labo', a: 36.82}, {k: 'profil', v: 'brillante, passionnée', a: 37.7}, {k: 'spécialité', v: 'solvants chlorés', a: 41.62}, {k: 'travail', v: 'haute précision', a: 42.74}, {k: 'qualité', v: 'rigueur', a: 43.94}].map((r) => <div key={r.k} style={{opacity: pop(t, r.a), transform: `translateY(${(1 - pop(t, r.a)) * 20}px)`}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM}}>{r.k}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>{r.v}</div></div>)}
            </div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 2 · LES SIGNAUX D'ALARME ═════════════ */
const QDIR = 'Dans les limites de ce qu’on pouvait tolérer, le temps de trouver une solution.';
const Signaux: React.FC = () => {
  const t = useT();
  const ph = t < 64.3 ? 0 : t < 82.7 ? 1 : 2;
  const bar = prog(t, 71.0, 74.4, easeOut);
  return (
    <Out end={91.5}>
      {ph === 0 && (
        <>
          <HiLine words={t < 58.2 ? ['Les', 'signaux', 'd’alarme'] : ['La', 'ventilation']} mark={t < 58.2 ? [1, 2] : [1]} at={t < 58.2 ? 47.0 : 58.34} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={200} style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', background: NIGHT, borderRadius: 30, border: `5px solid ${INK}`, opacity: pop(t, 48.98)}}>
            {[0, 1, 2, 3, 4].map((k) => <Beacon key={k} c={k % 2 ? ORANGE : RED} size={110} on={t > 49 + k * 0.3} ph={k} />)}
          </Abs>
          <div style={{position: 'absolute', left: 0, right: 0, top: 660, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={51.3} c={RED} size={28}>très clairs</Pill><Pill at={52.06} c={RED} size={28}>chiffrés</Pill><Pill at={53.3} c={DIM} size={28}>pas écoutés</Pill></div>
          <Shot src={IMG.ventilation} ic="vent" x={60} y={740} w={960} h={520} at={58.3} c={RED}>
            <div style={{position: 'absolute', left: 24, bottom: 24, display: 'flex', gap: 12}}><Pill at={60.06} c={NIGHT} size={26}>vieille</Pill><Pill at={61.02} c={RED} size={26}>obsolète</Pill></div>
          </Shot>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Les', 'chiffres', 'ne', 'mentent', 'pas']} mark={[1, 3]} at={64.4} y={330} size={60} />
          <Abs x={60} y={450} w={960} h={760} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 30, boxShadow: `9px 9px 0 ${RED}`, opacity: pop(t, 65.2)}}>
            <div style={{position: 'absolute', left: 30, top: 24, fontFamily: MONO, fontWeight: 700, fontSize: 26, color: DIM}}>chloroforme dans l’air · mesures</div>
            <div style={{position: 'absolute', left: 140, right: 60, bottom: 90, top: 100}}>
              {[{l: 'limite légale', v: 1, c: GREEN, a: 72.3}, {l: 'mesuré (min.)', v: 1.3, c: ORANGE, a: 71.0}, {l: 'mesuré (max.)', v: 1.6, c: RED, a: 71.6}].map((b, k) => { const h = (b.v / 1.8) * 520 * (k === 0 ? pop(t, b.a) : prog(t, b.a, b.a + 2.4, easeOut)); return <div key={b.l} style={{position: 'absolute', left: k * 260, bottom: 0, width: 190, height: h, background: b.c, borderRadius: '16px 16px 0 0', border: `5px solid ${INK}`, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 10, boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 44}}>{k === 0 ? '1×' : <Count n={b.v} a={b.a} b={b.a + 2.4} dec={1} suf="×" />}</div>; })}
              <div style={{position: 'absolute', left: -20, right: 0, bottom: (1 / 1.8) * 520, height: 0, borderTop: `6px dashed ${GREEN}`, opacity: pop(t, 72.3)}} />
            </div>
            <div style={{position: 'absolute', left: 140, right: 60, bottom: 30, display: 'flex', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: INK}}>{['limite légale', '1,3 ×', '1,6 ×'].map((l) => <span key={l} style={{width: 260}}>{l}</span>)}</div>
          </Abs>
          <Abs x={0} y={1240} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={75.62} c={RED} size={28}>exposition constante</Pill><Pill at={77.0} c={NAVY} size={28}>danger connu</Pill></Abs>
          {bar > 0.99 && <Shine at={74.4} />}
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['La', 'réponse', 'de', 'la', 'direction']} mark={[1, 4]} at={82.8} y={330} size={58} />
          <Shot src={IMG.direction} ic="directeur" x={60} y={440} w={960} h={420} at={82.8} c={NAVY} blinds />
          <Abs x={60} y={890} w={960} h={470} style={{background: '#FFFDF6', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${ORANGE}`, padding: '30px 36px', boxSizing: 'border-box', opacity: pop(t, 83.2)}}>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>la phrase de la direction</div>
            <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 50, color: INK, lineHeight: 1.18, marginTop: 10}}>« {QDIR.slice(0, Math.floor(prog(t, 83.4, 87.3) * QDIR.length))} »</div>
            <Stamp at={84.38} c={RED} text="on minimise" x={30} y={300} rot={-6} size={40} />
            <Stamp at={85.54} c={RED} text="on reporte" x={480} y={320} rot={5} size={40} />
          </Abs>
          {t > 90.0 && <AbsoluteFill style={{background: `rgba(122,31,43,${0.25 * prog(t, 90.0, 91.0)})`}} />}
        </>
      )}
    </Out>
  );
};

/* ═════════════ 3 · LE PROCESSUS BRISÉ ═════════════ */
const STEPS = [{l: 'alerte documentée', ic: 'ecrit', a: 104.54}, {l: 'deux relances', ic: 'enveloppe', a: 106.02}, {l: 'report de budget', ic: 'calendrier', a: 108.58}, {l: 'aucune action', ic: 'sens-interdit', a: 112.18}];
const FEARS = [{l: 'en faire trop', ic: 'anxieux', a: 125.22}, {l: 'passer pour un alarmiste', ic: 'megaphone', a: 126.82}, {l: 'créer des tensions', ic: 'bulle-colere', a: 128.3}];
const Processus: React.FC = () => {
  const t = useT();
  const ph = t < 111.2 ? 0 : t < 120.4 ? 1 : 2;
  const brk = prog(t, 110.0, 110.8, easeIn);
  const freeze = prog(t, 131.94, 133.0);
  return (
    <Out end={135.2}>
      {ph === 0 && (
        <>
          <HiLine words={t < 101.5 ? ['Un', 'échec', 'humain'] : ['Il', 'a', 'suivi', 'la', 'procédure']} mark={t < 101.5 ? [1, 2] : [2, 4]} at={t < 101.5 ? 91.9 : 101.6} y={330} size={60} />
          {t < 101.5 && <Abs x={60} y={450} w={960} h={700} style={{display: 'flex', flexDirection: 'column', gap: 20}}>
            {[{l: 'échec technique', c: DIM, a: 94.6}, {l: 'échec de management', c: DIM, a: 95.6}, {l: 'échec humain', c: RED, a: 97.6}, {l: 'racine : la peur', c: BURG, a: 100.54}].map((r, k) => <div key={r.l} style={{height: 140, borderRadius: 24, background: k > 1 ? r.c : '#fff', border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', padding: '0 30px', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: k > 1 ? '#fff' : r.c, opacity: pop(t, r.a), transform: `translateX(${(1 - pop(t, r.a)) * (k % 2 ? 80 : -80)}px) scale(${k === 2 ? 1 + 0.03 * Math.sin(t * 6) : 1})`}}>{r.l}</div>)}
          </Abs>}
          {t >= 101.5 && <Abs x={60} y={450} w={960} h={880}>
            {STEPS.map((p, k) => { const y = k * 215; const broken = k === 3; return <div key={p.l} style={{position: 'absolute', left: k % 2 ? 300 : 0, top: y, width: 660, height: 170, borderRadius: 26, background: broken ? NIGHT : '#fff', border: `5px ${broken ? 'dashed' : 'solid'} ${broken ? RED : INK}`, boxShadow: broken ? 'none' : `6px 6px 0 ${NAVY}`, display: 'flex', alignItems: 'center', gap: 20, padding: '0 26px', opacity: pop(t, p.a), transform: broken ? `translateY(${Math.sin(t * 20) * 2}px)` : undefined}}><Num n={k + 1} c={broken ? RED : NAVY} size={60} /><F n={p.ic} size={80} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: broken ? RED : INK}}>{p.l}</span></div>; })}
            <svg width={960} height={880} style={{position: 'absolute', left: 0, top: 0}}>{[0, 1, 2].map((k) => <line key={k} x1={k % 2 ? 630 : 330} y1={k * 215 + 170} x2={k % 2 ? 330 : 630} y2={k * 215 + 215} stroke={k === 2 ? RED : NAVY} strokeWidth={8} strokeDasharray={k === 2 ? '14 12' : undefined} opacity={pop(t, STEPS[k + 1].a) * (k === 2 ? 1 - brk * 0.6 : 1)} />)}</svg>
          </Abs>}
        </>
      )}
      {ph === 1 && (
        <>
          <AbsoluteFill style={{background: NIGHT, opacity: 0.6 + 0.35 * prog(t, 112.2, 113.3)}} />
          <Abs x={0} y={420} w={1080} style={{textAlign: 'center'}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: '#9AA7BC', opacity: pop(t, 111.3)}}>Et puis…</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 110, color: '#fff', marginTop: 30, opacity: pop(t, 112.18)}}>plus rien.</div>
            <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 130, color: RED, marginTop: 30, opacity: pop(t, 113.26), letterSpacing: 6}}>le silence.</div>
          </Abs>
          <Shot src={IMG.silence} ic="sablier" x={60} y={1000} w={960} h={380} at={114.6} c={RED} filter="grayscale(0.6)">
            <div style={{position: 'absolute', left: 24, bottom: 24}}><Pill at={116.18} c={RED} size={28}>processus arrêté net</Pill></div>
          </Shot>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['C’est', 'la', 'peur']} mark={[2]} at={123.94} y={330} size={70} />
          <Shot src={IMG.peur} ic="anxieux" x={60} y={440} w={960} h={480} at={120.5} c={BURG} />
          <Abs x={60} y={950} w={960} h={420} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            {FEARS.map((f) => <div key={f.l} style={{flex: 1, borderRadius: 22, background: '#fff', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${BURG}`, display: 'flex', alignItems: 'center', gap: 18, padding: '0 24px', opacity: pop(t, f.a), transform: `translateX(${(1 - pop(t, f.a)) * 80}px)`}}><F n={f.ic} size={80} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK}}><span style={{color: DIM, fontSize: 28}}>la peur de </span>{f.l}</span></div>)}
          </Abs>
          {freeze > 0 && <AbsoluteFill style={{background: `linear-gradient(180deg, rgba(150,200,255,${0.35 * freeze}), rgba(220,240,255,${0.5 * freeze}))`, backdropFilter: `blur(${freeze * 2}px)`}} />}
          {freeze > 0 && <Stamp at={131.94} c={BLUE} text="tout paralysé" x={250} y={760} rot={-6} size={64} />}
        </>
      )}
    </Out>
  );
};

/* ═════════════ 4 · LE PRIX DU SILENCE ═════════════ */
const Prix: React.FC = () => {
  const t = useT();
  const ph = t < 154.6 ? 0 : 1;
  const run = prog(t, 142.7, 145.0, easeInOut);
  return (
    <Out end={165.1}>
      {ph === 0 && (
        <>
          <HiLine words={t < 141.8 ? ['Un', 'prix', 'humain'] : ['18', 'mois', 'd’inaction']} mark={t < 141.8 ? [1, 2] : [0, 1]} at={t < 141.8 ? 135.5 : 141.9} y={330} size={66} />
          {t < 141.8 && <Abs x={60} y={450} w={960} h={600} style={{display: 'flex', flexDirection: 'column', gap: 22}}>
            {[{l: 'humain', a: 137.2}, {l: 'irréversible', a: 138.14}, {l: 'dévastateur', a: 139.82}].map((p, k) => <div key={p.l} style={{flex: 1, borderRadius: 26, background: k === 2 ? BURG : '#fff', border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: k === 2 ? '#fff' : BURG, opacity: pop(t, p.a), transform: `scale(${0.7 + 0.3 * pop(t, p.a)})`}}>{p.l}</div>)}
          </Abs>}
          {t >= 141.8 && <>
            <Abs x={60} y={450} w={960} h={300} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${BURG}`}}>
              <div style={{position: 'absolute', left: 80, right: 80, top: 130, height: 12, background: '#E3E8EF', borderRadius: 6}} />
              <div style={{position: 'absolute', left: 80, width: 800 * run, top: 130, height: 12, background: BURG, borderRadius: 6}} />
              {[{l: 'première alerte', x: 130, a: 142.9, ic: 'cloche'}, {l: 'diagnostic', x: 830, a: 144.98, ic: 'hopital'}].map((p) => <div key={p.l} style={{position: 'absolute', left: p.x - 90, top: 30, width: 180, textAlign: 'center', opacity: pop(t, p.a)}}><F n={p.ic} size={70} style={{margin: '0 auto'}} /><div style={{marginTop: 50, fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK}}>{p.l}</div></div>)}
              <div style={{position: 'absolute', left: 80 + 800 * run - 30, top: 106, width: 60, height: 60, borderRadius: 30, background: YEL, border: `5px solid ${INK}`, opacity: pop(t, 142.9)}} />
            </Abs>
            <Abs x={60} y={780} w={960} h={240} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 26, opacity: pop(t, 146.42)}}>
              <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 150, color: YEL, textShadow: `0 0 40px ${YEL}`}}><Count n={18} a={146.42} b={148.0} /></span>
              <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: '#fff', lineHeight: 1.05}}>mois<br /><span style={{fontSize: 30, color: '#C9D2DF'}}>d’exposition</span></span>
            </Abs>
            <Shot src={IMG.diagnostic} ic="medecin" x={60} y={1050} w={960} h={330} at={149.2} c={BURG}>
              <div style={{position: 'absolute', left: 24, bottom: 24, display: 'flex', gap: 12}}><Pill at={150.42} c={BURG} size={26}>dommages permanents au foie</Pill><Pill at={151.8} c={NIGHT} size={26}>plus jamais au travail</Pill></div>
            </Shot>
          </>}
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Hépatotoxicité', 'chronique']} mark={[0, 1]} at={154.7} y={330} size={58} />
          <Abs x={60} y={450} w={960} h={520} style={{background: ORANGE, border: `6px solid ${INK}`, borderRadius: 30, padding: 40, boxSizing: 'border-box', overflow: 'hidden', opacity: pop(t, 155.0)}}>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: '#FFE9D2'}}>définition</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: '#fff', lineHeight: 1.05, marginTop: 12}}>pas une simple maladie</div>
            <div style={{marginTop: 30, display: 'flex', flexDirection: 'column', gap: 14}}>
              <Pill at={158.42} c={BURG} size={34}>lésions graves</Pill>
              <Pill at={159.66} c={BURG} size={34}>permanentes du foie</Pill>
            </div>
            {Array.from({length: 6}, (_, k) => <div key={k} style={{position: 'absolute', left: ((k * 200 + t * 30) % 1200) - 200, top: 330 + (k % 2) * 80, width: 360, height: 140, borderRadius: 140, background: 'radial-gradient(ellipse, rgba(255,255,255,0.35), transparent 70%)', filter: 'blur(8px)', opacity: prog(t, 161.0, 163.0)}} />)}
            <LoupeSweep x0={120} y0={240} x1={700} y1={260} a={156.0} b={158.0} />
          </Abs>
          <Abs x={60} y={1010} w={960} h={330} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 28, display: 'flex', alignItems: 'center', gap: 26, padding: '0 34px', opacity: pop(t, 161.06)}}>
            <F n="vent" size={140} />
            <div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: '#fff', lineHeight: 1.1}}>une destruction lente, silencieuse</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: '#9AA7BC', marginTop: 10, opacity: pop(t, 163.06)}}>par l’air respiré au quotidien</div></div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 5 · LA LEÇON ═════════════ */
const QL = 'La documentation protégeait ma responsabilité légale. Elle ne protégeait pas Leila.';
const Lecon: React.FC = () => {
  const t = useT();
  const ph = t < 184.7 ? 0 : t < 204.1 ? 1 : 2;
  return (
    <Out end={211.7}>
      {ph === 0 && (
        <>
          <HiLine words={['Documenter', '≠', 'agir']} mark={[0, 2]} at={172.6} y={330} size={70} />
          <Abs x={60} y={450} w={960} h={420} style={{display: 'flex', gap: 18}}>
            {[{l: 'remplir un formulaire', ic: 'clipboard', a: 175.02}, {l: 'envoyer un e-mail', ic: 'enveloppe', a: 176.22}, {l: 'documenter', ic: 'dossier', a: 177.46}].map((p) => <div key={p.l} style={{flex: 1, borderRadius: 24, background: '#fff', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${DIM}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: pop(t, p.a), transform: `translateY(${(1 - pop(t, p.a)) * -60}px)`}}><F n={p.ic} size={110} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK, textAlign: 'center'}}>{p.l}</span></div>)}
          </Abs>
          <Abs x={60} y={900} w={960} h={460} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40, opacity: pop(t, 178.82)}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 200, color: RED, transform: `scale(${1 + 0.06 * Math.sin(t * 6)})`}}>≠</div>
            <div style={{width: 300, height: 300, borderRadius: 150, background: `radial-gradient(circle at 35% 30%, #ff8a7a, ${RED} 60%, ${BURG})`, border: `10px solid ${INK}`, boxShadow: `0 20px 0 ${INK}, 0 0 60px ${RED}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: '#fff', opacity: pop(t, 179.98)}}>AGIR</div>
          </Abs>
          <Abs x={0} y={1390} w={1080} style={{textAlign: 'center'}}><Pill at={181.86} c={BURG} size={26}>ne protège pas forcément la personne en danger</Pill></Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Ma', 'protection', '/', 'sa', 'protection']} mark={[1, 4]} at={184.8} y={330} size={58} />
          {[{x: 60, c: NAVY, h: 'MA protection', ic: 'bouclier', a: 187.98, L: [{l: 'la paperasse', a: 187.98}, {l: 'protège légalement', a: 190.5}, {l: 'bouclier administratif', a: 193.06}]}, {x: 560, c: GREEN, h: 'SA protection', ic: 'echelle', a: 195.42, L: [{l: 'l’escalade', a: 198.86}, {l: 'monter au créneau', a: 200.46}, {l: 'insister', a: 202.5}, {l: 'ne rien lâcher', a: 202.86}]}].map((s0, k) => (
            <Abs key={s0.h} x={s0.x} y={440} w={460} h={920} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `9px 9px 0 ${s0.c}`, overflow: 'hidden', opacity: pop(t, s0.a), transform: `perspective(1200px) rotateY(${(1 - pop(t, s0.a)) * (k ? 40 : -40)}deg)`}}>
              <div style={{background: s0.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 36, textAlign: 'center', padding: '16px 0'}}>{s0.h}</div>
              <div style={{height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
                {k === 0 ? <F n="bouclier" size={220} /> : <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>{[0, 1, 2, 3].map((j) => <div key={j} style={{width: 60, height: 60 + j * 60 * prog(t, 198.86 + j * 0.3, 199.6 + j * 0.3, easeOut), background: GREEN, border: `4px solid ${INK}`, borderRadius: 10, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 34}}>↑</div>)}</div>}
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: 14, padding: '0 22px'}}>
                {s0.L.map((x) => <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 12, opacity: pop(t, x.a)}}><div style={{width: 18, height: 18, borderRadius: 9, background: s0.c, flexShrink: 0}} /><span style={{fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: INK}}>{x.l}</span></div>)}
              </div>
              <div style={{position: 'absolute', left: 22, bottom: 22, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>{k === 0 ? 'protège celui qui alerte' : 'aurait protégé Leila'}</div>
            </Abs>
          ))}
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Le', 'gouffre']} mark={[1]} at={204.2} y={330} size={70} />
          <Abs x={60} y={450} w={960} h={460} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 30, padding: '30px 36px', boxSizing: 'border-box', opacity: pop(t, 204.3)}}>
            <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 54, color: '#fff', lineHeight: 1.2}}>« {QL.slice(0, Math.floor(prog(t, 204.5, 208.2) * QL.length))} »</div>
            <Shine at={208.4} />
          </Abs>
          <Abs x={60} y={940} w={960} h={420} style={{opacity: pop(t, 206.22)}}>
            <div style={{position: 'absolute', left: 0, bottom: 0, width: 380 - 60 * prog(t, 206.3, 207.4), height: 260, background: NAVY, borderRadius: '20px 0 0 20px', border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 32, textAlign: 'center'}}>en règle sur le papier</div>
            <div style={{position: 'absolute', right: 0, bottom: 0, width: 380 - 60 * prog(t, 206.3, 207.4), height: 260, background: GREEN, borderRadius: '0 20px 20px 0', border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 32, textAlign: 'center', opacity: pop(t, 209.78)}}>juste humainement</div>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 46, color: BURG}}>↓ le gouffre ↓</div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 6 · LA NOUVELLE RÈGLE ═════════════ */
const ESC = [{l: 'alerte initiale', s: 'remonter un risque grave', a: 221.5}, {l: 'niveau + 1', s: 'si non traité', a: 224.54}, {l: 'monter encore', s: 'si ça ne suffit pas', a: 227.58}, {l: 'les autorités', s: 'si rien ne bouge', a: 232.46}];
const Regle: React.FC = () => {
  const t = useT();
  const ph = t < 236.4 ? 0 : 1;
  const tilt = lerp(0, 12, prog(t, 245.34, 246.4, easeInOut));
  return (
    <Out end={OUTRO_AT}>
      {ph === 0 && (
        <>
          <HiLine words={t < 216.1 ? ['Protéger', 'une', 'vie'] : ['Une', 'règle', 'non', 'négociable']} mark={t < 216.1 ? [0, 2] : [1, 3]} at={t < 216.1 ? 211.9 : 218.8} y={330} size={60} />
          {t < 216.3 && <Abs x={60} y={450} w={960} h={600} style={{display: 'flex', flexDirection: 'column', gap: 24}}>
            <div style={{flex: 1, borderRadius: 28, background: '#fff', border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', gap: 20, padding: '0 30px', opacity: pop(t, 211.94)}}><F n="bouclier" size={120} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: NAVY}}>la protection légale</span></div>
            <div style={{flex: 1, borderRadius: 28, background: GREEN, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', gap: 20, padding: '0 30px', opacity: pop(t, 214.06)}}><F n="coeur" size={120} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: '#fff'}}>la protection d’une vie</span></div>
          </Abs>}
          <SearchOpen x={60} y={440} w={960} h={760} at={216.3} query="que faire si le risque est ignoré ?" results={['Procédure de déclaration', 'Ma nouvelle règle', 'Modèle de relance']} found={1} foundAt={218.6} clickAt={218.9} c={GREEN}>
            <div style={{position: 'absolute', inset: 0}}>
              {ESC.map((e, k) => <div key={e.l} style={{position: 'absolute', left: 20 + k * 225, bottom: 20, width: 210, height: 200 + k * 140, borderRadius: '18px 18px 0 0', background: k === 3 ? RED : k === 0 ? ORANGE : GREEN, border: `5px solid ${INK}`, padding: 14, boxSizing: 'border-box', color: '#fff', opacity: pop(t, e.a), transform: `translateY(${(1 - prog(t, e.a, e.a + 0.6, easeOut)) * 200}px)`}}><Num n={k + 1} c={NIGHT} size={50} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, marginTop: 10, lineHeight: 1.05}}>{e.l}</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, marginTop: 6}}>{e.s}</div></div>)}
              {t > 222.1 && <div style={{position: 'absolute', left: 20 + (ESC.filter((e) => t >= e.a + 0.6).length - 1) * 225 + 65, bottom: 30 + 200 + (ESC.filter((e) => t >= e.a + 0.6).length - 1) * 140}}><F n="ouvrier" size={80} /></div>}
            </div>
          </SearchOpen>
          <Abs x={0} y={1240} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={233.18} c={DIM} size={28}>pas de la délation</Pill><Pill at={234.66} c={GREEN} size={28}>une obligation morale</Pill></Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Procédure', 'ou', 'conscience', '?']} mark={[0, 2]} at={236.5} y={330} size={62} />
          <Shot src={IMG.escalade} ic="echelle" x={60} y={440} w={960} h={380} at={236.5} c={GREEN} blinds />
          <Abs x={60} y={850} w={960} h={420} style={{opacity: pop(t, 240.54)}}>
            <div style={{position: 'absolute', left: 470, top: 90, width: 20, height: 290, background: INK, borderRadius: 10}} />
            <div style={{position: 'absolute', left: 380, top: 370, width: 200, height: 34, background: INK, borderRadius: 12}} />
            <div style={{position: 'absolute', left: 80, top: 90, width: 800, height: 0, transform: `rotate(${tilt}deg)`}}>
              <div style={{position: 'absolute', left: 0, top: -9, width: 800, height: 18, background: INK, borderRadius: 9}} />
              {[{l: 'la procédure', c: NAVY, x: -60, ic: 'clipboard'}, {l: 'sa conscience', c: GREEN, x: 560, ic: 'coeur'}].map((p) => <div key={p.l} style={{position: 'absolute', left: p.x, top: 10, width: 300, transform: `rotate(${-tilt}deg)`, transformOrigin: '50% 0'}}><div style={{margin: '0 auto', width: 4, height: 30, background: INK}} /><div style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: '0 0 60px 60px', height: 180, boxShadow: `6px 6px 0 ${p.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><F n={p.ic} size={86} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: p.c}}>{p.l}</div></div></div>)}
            </div>
          </Abs>
          <Abs x={0} y={1290} w={1080} style={{textAlign: 'center'}}><Pill at={248.22} c={GREEN} size={32}>le courage d’aller jusqu’au bout</Pill></Abs>
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
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, ...flaps(0.1, 14), {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 0.8, s: 'validation', v: 0.18})), {at: ALLDONE, s: 'validation', v: 0.3},
  {at: 2.8, s: 'alarme', v: 0.05, dur: 1.2}, ...pops([3.66, 5.26]), {at: 6.66, s: 'sfx/thud', v: 0.3},
  ...[9.4, 10.0, 10.6, 11.2].map((a) => ({at: a + 0.3, s: 'sfx/click', v: 0.4})), {at: 13.5, s: 'tampon', v: 0.6}, {at: 15.8, s: 'deep-hit', v: 0.4}, {at: 15.85, s: 'sfx/swish', v: 0.3},
  {at: 20.4, s: 'sfx/whoosh', v: 0.25}, ...rep(21.1, 12, 0.12, 'tick', 0.14), {at: 22.6, s: 'bass-hit', v: 0.3}, {at: 27.1, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 29.3, s: 'soft-whoosh', v: 0.25, dur: 2},
  {at: 34.6, s: 'soft-whoosh', v: 0.35, dur: 1}, {at: 35.4, s: 'sfx/whoosh', v: 0.2}, ...pops([35.58, 36.82, 37.7, 41.62, 42.74, 43.94], 0.16),
  {at: 48.98, s: 'alarme', v: 0.06, dur: 1.5}, ...pops([51.3, 52.06, 53.3]), {at: 58.3, s: 'soft-whoosh', v: 0.3, dur: 1}, ...pops([60.06, 61.02]),
  {at: 65.2, s: 'sfx/whoosh', v: 0.2}, {at: 71.0, s: 'sfx/rise', v: 0.25, dur: 3}, {at: 72.3, s: 'sfx/ding', v: 0.2}, {at: 74.4, s: 'bass-hit', v: 0.35}, ...pops([75.62, 77.0]),
  {at: 82.8, s: 'soft-whoosh', v: 0.35, dur: 1}, ...rep(83.4, 26, 0.15, 'sfx/click', 0.07), {at: 84.38, s: 'tampon', v: 0.55}, {at: 85.54, s: 'tampon', v: 0.55}, {at: 90.0, s: 'deep-hit', v: 0.35},
  ...[94.6, 95.6].map((a) => ({at: a, s: 'sfx/whoosh', v: 0.18})), {at: 97.6, s: 'sfx/thud', v: 0.35}, {at: 100.54, s: 'bass-hit', v: 0.3},
  ...pops([104.54, 106.02, 108.58]), {at: 110.0, s: 'sfx/swish', v: 0.3}, {at: 110.1, s: 'deep-hit', v: 0.35}, {at: 112.18, s: 'sfx/thud', v: 0.3}, {at: 113.26, s: 'bass-hit', v: 0.25},
  {at: 114.6, s: 'soft-whoosh', v: 0.25, dur: 1}, {at: 120.5, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 123.94, s: 'bass-hit', v: 0.35}, ...pops([125.22, 126.82, 128.3]), {at: 131.94, s: 'sfx/swish', v: 0.3}, {at: 132.0, s: 'tampon', v: 0.5},
  ...[137.2, 138.14, 139.82].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), {at: 142.7, s: 'sfx/rise', v: 0.2, dur: 2.3}, {at: 144.98, s: 'deep-hit', v: 0.35}, ...rep(146.42, 18, 0.08, 'tick', 0.12), {at: 149.2, s: 'soft-whoosh', v: 0.3, dur: 1}, ...pops([150.42, 151.8]),
  {at: 155.0, s: 'sfx/whoosh', v: 0.25}, {at: 156.0, s: 'soft-whoosh', v: 0.25, dur: 2}, ...pops([158.42, 159.66]), {at: 161.06, s: 'sfx/thud', v: 0.25},
  ...[175.02, 176.22, 177.46].map((a) => ({at: a, s: 'sfx/pop', v: 0.22})), {at: 178.82, s: 'bass-hit', v: 0.3}, {at: 179.98, s: 'sfx/thud', v: 0.4}, {at: 181.86, s: 'sfx/pop', v: 0.2},
  {at: 187.98, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 193.06, s: 'sfx/ding', v: 0.2}, {at: 195.42, s: 'soft-whoosh', v: 0.3, dur: 1}, ...rep(198.86, 4, 0.3, 'sfx/rise', 0.15), ...pops([200.46, 202.5, 202.86]),
  {at: 204.3, s: 'sfx/whoosh', v: 0.22}, ...rep(204.5, 28, 0.13, 'sfx/click', 0.07), shine(208.4), {at: 206.3, s: 'deep-hit', v: 0.3}, {at: 209.78, s: 'sfx/ding', v: 0.22},
  {at: 211.94, s: 'sfx/pop', v: 0.22}, {at: 214.06, s: 'sfx/ding', v: 0.22}, ...searchCues(216.3, 34, 218.6, 218.9), ...ESC.map((e) => ({at: e.a, s: 'sfx/rise', v: 0.2, dur: 0.6})), ...pops([233.18, 234.66]),
  {at: 236.5, s: 'soft-whoosh', v: 0.35, dur: 1}, {at: 240.54, s: 'sfx/whoosh', v: 0.2}, {at: 245.34, s: 'sfx/thud', v: 0.35}, {at: 248.22, s: 'sfx/rise', v: 0.22, dur: 1},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const DevoirAlerte: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={19.55}><Intro /></Gate>
    <Gate from={19.9} to={46.65}><Leila /></Gate>
    <Gate from={47.0} to={91.55}><Signaux /></Gate>
    <Gate from={91.9} to={135.25}><Processus /></Gate>
    <Gate from={135.6} to={165.15}><Prix /></Gate>
    <Gate from={165.5} to={211.75}><Lecon /></Gate>
    <Gate from={212.1} to={OUTRO_AT}><Regle /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}><Gyro i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={250.6}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-devoir-alerte-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Kin, Brut, T, TitleBlock, Win, GLASS, Check, Tile, Card, Num, random, GlassCard, IcoLab, Mono, TEAL, BURG, sectIdx, Blinds, Deep, spring, Strike, VIO, GOLD];
