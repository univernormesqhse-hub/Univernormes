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
 * « Le vendredi bilan » (4 min 30) — capsule « condensé + effet wahou » : voix d'origine (sans musique de fond),
 * sous-titres calés mot à mot, photos réelles, thème « papier quadrillé ».
 * Fil rouge : LE TUBE PNEUMATIQUE À SIX GUICHETS (brouillard → rituel → 4 questions → bénéfice → livre de bord →
 * invitation), adaptés aux parties réellement présentes ; la capsule du dossier file d'un guichet à l'autre, chaque
 * guichet passé se coche.
 * Transition : LE GYROPHARE à chaque partie.
 * Effets « wahou » : semaine qui s'efface dans le brouillard, barre « week-end en cours de chargement », pages qui
 * tombent aux oubliettes, fil qui s'emmêle puis casse, cadran des 15 minutes, barre de recherche qui trouve puis OUVRE
 * l'outil (un carnet et un stylo), quatre questions en onglets, loupe qui dézoome d'un événement vers tout le système,
 * radar des signaux faibles, ballon de la certitude excessive qui éclate, pile de pages sur 10 ans, livre de bord dont
 * les pages se tournent, première page qui s'écrit à la main.
 */
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
const OUTRO_AT = 269.4;
export const VENDREDI_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 19.5, n: '1', title: 'Le brouillard du vendredi', s: 'la semaine aux oubliettes', c: NAVY, g: 'brouillard', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 54.3, n: '2', title: 'Le rituel de clôture', s: 'le vendredi bilan', c: BLUE, g: 'rituel', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 103.6, n: '3', title: 'Les quatre questions', s: 'la structure de la réflexion', c: VIO, g: '4 questions', k: 'gyro', lab: 'PARTIE 3 / 6'},
  {at: 172.4, n: '4', title: 'Le double bénéfice', s: 'savoir et savoir-être', c: ORANGE, g: 'bénéfice', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 231.1, n: '5', title: 'Le livre de bord', s: 'écrire sa progression', c: TEAL, g: 'livre de bord', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 256.4, n: '6', title: 'Une invitation', s: 'la toute première page', c: GREEN, g: 'invitation', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 267.0;

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

const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Bg />
      <Abs x={0} y={50} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)'}}><Img src={staticFile(LOGO)} style={{height: 76, display: 'block'}} /></div></Abs>
      <Abs x={240} y={190} w={600} h={900} style={{border: `8px solid ${INK}`, borderRadius: 26, boxShadow: `14px 14px 0 ${GREEN}`, overflow: 'hidden', transform: 'rotate(-2deg)'}}>
        <Img src={PH('vendredi/couverture-vendredi.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </Abs>
      <Abs x={0} y={1150} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>15 MINUTES · 4 QUESTIONS</div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 80, color: INK, marginTop: 6}}>le rituel du</div>
        <div style={{marginTop: 4}}><Board text="VENDREDI BILAN" at={-1} h={92} c={GREEN} stag={0.03} /></div>
      </Abs>
      <Abs x={60} y={1560} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 70, width: 140, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/** Brouillard animé : nappes floues qui dérivent. */
const Fog: React.FC<{o: number}> = ({o}) => {
  const t = useT();
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{pointerEvents: 'none', opacity: o, zIndex: 8}}>
      {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{position: 'absolute', left: -300 + ((t * (30 + k * 12) + k * 260) % 1500) - 200, top: 380 + k * 230, width: 900, height: 360, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(214,222,232,0.95), rgba(214,222,232,0) 70%)', filter: 'blur(20px)'}} />)}
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO ═════════════ */
const DAYS = ['lun', 'mar', 'mer', 'jeu', 'ven'];
const Intro: React.FC = () => {
  const t = useT();
  const fog = prog(t, 6.9, 8.0) * (1 - prog(t, 9.6, 11.0));
  const phase2 = t >= 9.4;
  const curve = prog(t, 11.0, 13.6, easeInOut);
  return (
    <Out end={19.55}>
      <HiLine words={phase2 ? ['Une', 'opportunité', 'de', 'progresser'] : ['La', 'fin', 'de', 'la', 'semaine']} mark={phase2 ? [1, 3] : [3, 4]} at={phase2 ? 9.5 : 2.7} y={330} size={58} />
      {!phase2 && (
        <Abs x={60} y={470} w={960} style={{display: 'flex', gap: 16}}>
          {DAYS.map((d, k) => (
            <div key={d} style={{flex: 1, height: 260, background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `6px 6px 0 ${k === 4 ? GREEN : '#C9D2DF'}`, opacity: pop(t, 4.46 + k * 0.18), transform: `translateY(${(1 - pop(t, 4.46 + k * 0.18)) * -80}px)`, filter: `blur(${prog(t, 6.94 + k * 0.1, 7.6 + k * 0.1) * 6}px)`}}>
              <div style={{height: 56, background: k === 4 ? GREEN : INK, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px 12px 0 0'}}>{d}</div>
              <div style={{display: 'flex', justifyContent: 'center', marginTop: 40}}><F n={['memo', 'telephone', 'dossier', 'memo', 'ordinateur'][k]} size={90} /></div>
            </div>
          ))}
        </Abs>
      )}
      {!phase2 && <Abs x={0} y={800} w={1080} style={{textAlign: 'center'}}><span style={{fontFamily: handFont, fontWeight: 700, fontSize: 60, color: DIM, opacity: pop(t, 5.86)}}>…elles se ressemblent toutes</span></Abs>}
      {!phase2 && <Abs x={0} y={920} w={1080} style={{textAlign: 'center'}}><span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK, opacity: pop(t, 6.94)}}>ce qu’on a appris<Strike p={prog(t, 7.4, 7.9)} c={RED} /></span></Abs>}
      {phase2 && (
        <Abs x={60} y={460} w={960} h={620} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `9px 9px 0 ${GREEN}`, opacity: pop(t, 9.6), overflow: 'hidden'}}>
          <svg width={960} height={620}>
            <path d="M60 540 C 260 520, 360 420, 480 360 S 760 140, 900 80" fill="none" stroke={GREEN} strokeWidth={14} strokeLinecap="round" strokeDasharray={1100} strokeDashoffset={1100 * (1 - curve)} />
            {curve > 0.98 && <polygon points="900,60 870,110 925,108" fill={GREEN} />}
          </svg>
          <div style={{position: 'absolute', left: 30, top: 24}}><Mono at={10.5} c={GREEN} size={22}>chaque semaine, un pas de plus</Mono></div>
          <div style={{position: 'absolute', left: lerp(40, 840, curve), top: lerp(470, 20, curve)}}><F n="fusee" size={90} /></div>
        </Abs>
      )}
      {phase2 && (
        <Abs x={60} y={1130} w={960} style={{display: 'flex', gap: 20, justifyContent: 'center'}}>
          <Pill at={15.3} c={BLUE} size={34}>très simple</Pill>
          <Pill at={16.6} c={ORANGE} size={34}>hyper puissante</Pill>
        </Abs>
      )}
      <Fog o={fog} />
    </Out>
  );
};

/* ═════════════ PARTIE 1 : LE BROUILLARD DU VENDREDI ═════════════ */
const TASKS = ['réunion', 'urgence', 'mail', 'rapport', 'visite', 'urgence', 'appel', 'audit'];
const Brouillard: React.FC = () => {
  const t = useT();
  const load = prog(t, 23.4, 24.6, easeInOut);
  const ph = t < 24.8 ? 0 : t < 37.5 ? 1 : t < 46.5 ? 2 : 3;
  const fog = ph === 2 ? prog(t, 40.0, 42.9) : 0;
  const tangle = prog(t, 50.4, 52.4);
  const snap = prog(t, 52.6, 53.0);
  const titles = [['Vendredi', 'après-midi'], ['Qu’a-t-on', 'appris', '?'], ['Dans', 'le', 'brouillard'], ['On', 'perd', 'le', 'fil']];
  const ats = [22.9, 24.9, 37.6, 46.6];
  return (
    <Out end={54.35}>
      <HiLine words={titles[ph]} mark={ph === 0 ? [1] : ph === 1 ? [1] : ph === 2 ? [2] : [1, 3]} at={ats[ph]} y={330} size={64} />
      {ph === 0 && (
        <>
          <Abs x={140} y={470} w={800} h={500} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 22, boxShadow: `9px 9px 0 ${NAVY}`, transform: `scale(${0.85 + 0.15 * pop(t, 22.9)})`, opacity: pop(t, 22.9)}}>
            <div style={{position: 'absolute', left: 60, right: 60, top: 160, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: '#fff'}}>VENDREDI</div>
            <div style={{position: 'absolute', left: 60, right: 60, top: 270, fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: '#fff', textAlign: 'center'}}>Week-end en cours de chargement…</div>
            <div style={{position: 'absolute', left: 80, right: 80, top: 320, height: 40, border: '4px solid #fff', borderRadius: 4}}><div style={{width: `${60 + load * 40}%`, height: '100%', background: '#fff'}} /></div>
          </Abs>
          <Abs x={0} y={1030} w={1080} style={{textAlign: 'center'}}><span style={{fontFamily: handFont, fontWeight: 700, fontSize: 90, color: GREEN, opacity: pop(t, 23.4), display: 'inline-block', transform: `scale(${0.6 + 0.4 * pop(t, 23.4)})`}}>ouf !</span></Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <Win x={80} y={460} w={920} h={330} at={24.9} title="bilan_de_la_semaine.txt" c={BLUE}>
            <div style={{padding: 30, fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK}}>Qu’est-ce que j’ai appris cette semaine ?</div>
            <div style={{padding: '0 30px', fontFamily: MONO, fontSize: 34, color: DIM}}>&gt; {t > 31.2 ? '…' : ''}<span style={{opacity: Math.sin(t * 10) > 0 ? 1 : 0}}>▍</span></div>
          </Win>
          <Abs x={0} y={840} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 20}}><Pill at={32.3} c={DIM} size={32}>vague</Pill><Pill at={33.2} c={RED} size={32}>inexistante</Pill></Abs>
          <Abs x={300} y={960} w={480} h={420} style={{opacity: pop(t, 35.0)}}>
            <div style={{position: 'absolute', left: 90, bottom: 0, width: 300, height: 110, borderRadius: '50%', background: 'radial-gradient(ellipse, #1A1F2B, #3A4356 70%)', border: `5px solid ${INK}`}} />
            {[0, 1, 2, 3, 4].map((k) => {const a = 35.4 + k * 0.3; const q = prog(t, a, a + 0.8, easeIn); return t > a ? <div key={k} style={{position: 'absolute', left: 140 + k * 30 + Math.sin(k * 2) * 40, top: lerp(-40, 330, q), transform: `rotate(${q * (k % 2 ? 200 : -200)}deg) scale(${1 - q * 0.6})`, opacity: 1 - prog(t, a + 0.6, a + 0.8)}}><F n="memo" size={80} /></div> : null;})}
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 120, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 24, color: INK}}>AUX OUBLIETTES</div>
          </Abs>
        </>
      )}
      {ph === 2 && (
        <Abs x={60} y={470} w={960} style={{display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center'}}>
          {['leçons', 'idées', 'erreurs', 'réussites', 'signaux', 'progrès'].map((w, k) => <div key={w} style={{width: 290, height: 200, background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `6px 6px 0 ${[BLUE, ORANGE, RED, GREEN, VIO, TEAL][k]}`, opacity: pop(t, 38.0 + k * 0.2), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK, filter: `blur(${prog(t, 43.6 + k * 0.2, 45.0 + k * 0.2) * 8}px)`}}>{w}</div>)}
        </Abs>
      )}
      {ph === 2 && <Abs x={0} y={1000} w={1080} style={{textAlign: 'center'}}><span style={{fontFamily: handFont, fontWeight: 700, fontSize: 56, color: DIM, opacity: pop(t, 44.0)}}>tout ce qu’on aurait pu en tirer…</span></Abs>}
      {ph === 3 && (
        <>
          {TASKS.map((w, k) => {const a = 46.8 + k * 0.4; const ang = t * (1.4 + k * 0.1) + k; return <div key={k} style={{position: 'absolute', left: 540 + Math.cos(ang) * (260 + (k % 3) * 70) - 90, top: 760 + Math.sin(ang * 1.3) * 230 - 30, padding: '10px 20px', background: w === 'urgence' ? RED : '#fff', color: w === 'urgence' ? '#fff' : INK, border: `4px solid ${INK}`, borderRadius: 30, fontFamily: sansFont, fontWeight: 900, fontSize: 28, opacity: pop(t, a) * (1 - snap * 0.5)}}>{w}</div>;})}
          <svg width={1080} height={600} style={{position: 'absolute', left: 0, top: 1010}}>
            <path d={`M80 300 ${Array.from({length: 18}, (_, k) => `Q ${140 + k * 50} ${300 + Math.sin(k * 1.7) * 260 * tangle} ${170 + k * 50} ${300 + Math.cos(k * 2.3) * 200 * tangle}`).join(' ')}`} fill="none" stroke={snap > 0 ? RED : INK} strokeWidth={8} strokeLinecap="round" strokeDasharray={snap > 0 ? `${2000 * (1 - snap)} 60 4000` : undefined} />
          </svg>
          <Stamp at={52.6} c={RED} text="fil perdu" x={330} y={1380} rot={-6} size={64} />
        </>
      )}
      <Fog o={fog} />
    </Out>
  );
};

/* ═════════════ PARTIE 2 : LE RITUEL ═════════════ */
const Rituel: React.FC = () => {
  const t = useT();
  const phase2 = t >= 88.0;
  const dial = prog(t, 74.6, 76.3, easeInOut);
  const ph = t < 68.0 ? 0 : t < 82.3 ? 1 : 2;
  return (
    <Out end={103.65}>
      {!phase2 && <HiLine words={ph === 0 ? ['Un', 'rituel', 'de', 'clôture'] : ph === 1 ? ['Quinze', 'petites', 'minutes'] : ['Des', 'outils', 'déconcertants']} mark={ph === 0 ? [1, 2, 3] : ph === 1 ? [0, 2] : [2]} at={[57.6, 68.1, 82.4][ph]} y={330} size={62} />}
      {!phase2 && ph === 0 && (
        <>
          <Abs x={0} y={480} w={1080}><Board text="VENDREDI BILAN" at={62.9} h={96} c={BLUE} stag={0.035} /></Abs>
          <Card x={190} y={660} w={700} h={420} at={64.2} c={GREEN}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40, gap: 16}}>
              <div style={{transform: `rotate(${Math.sin(t * 3) * 8}deg)`}}><F n="main-levee" size={150} /></div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 42, color: INK, textAlign: 'center'}}>reprendre la main</div>
              <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 44, color: GREEN}}>sur son apprentissage pro</div>
            </div>
          </Card>
        </>
      )}
      {!phase2 && ph === 1 && (
        <>
          <Abs x={60} y={450} w={960} style={{display: 'flex', gap: 14, opacity: pop(t, 71.9)}}>
            {['9h', '11h', '14h', '16h'].map((h, k) => <div key={h} style={{flex: 1, height: 110, background: '#fff', border: `4px solid ${INK}`, borderRadius: 14, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 28, color: DIM}}>{h} · bloqué<div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, color: RED, fontFamily: sansFont, fontWeight: 900, opacity: pop(t, 72.6 + k * 0.15)}}>✗</div></div>)}
          </Abs>
          <Abs x={290} y={610} w={500} h={500} style={{opacity: pop(t, 74.5), transform: `scale(${0.7 + 0.3 * pop(t, 74.5)})`}}>
            <svg width={500} height={500}>
              <circle cx={250} cy={250} r={220} fill="#fff" stroke={INK} strokeWidth={10} />
              {Array.from({length: 12}, (_, k) => <line key={k} x1={250 + 190 * Math.sin(k * Math.PI / 6)} y1={250 - 190 * Math.cos(k * Math.PI / 6)} x2={250 + 210 * Math.sin(k * Math.PI / 6)} y2={250 - 210 * Math.cos(k * Math.PI / 6)} stroke={INK} strokeWidth={6} />)}
              <path d={`M250 250 L250 50 A200 200 0 0 1 ${250 + 200 * Math.sin(dial * Math.PI / 2)} ${250 - 200 * Math.cos(dial * Math.PI / 2)} Z`} fill={`${GREEN}88`} />
              <line x1={250} y1={250} x2={250 + 180 * Math.sin(dial * Math.PI / 2)} y2={250 - 180 * Math.cos(dial * Math.PI / 2)} stroke={INK} strokeWidth={12} strokeLinecap="round" />
              <circle cx={250} cy={250} r={18} fill={INK} />
            </svg>
          </Abs>
          <Abs x={0} y={1130} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: GREEN, opacity: pop(t, 74.6)}}><Count n={15} a={74.6} b={76.3} /> min</Abs>
          <Abs x={60} y={1260} w={960} style={{display: 'flex', gap: 10, justifyContent: 'center', opacity: pop(t, 79.4)}}>
            {['ven 1', 'ven 2', 'ven 3', 'ven 4'].map((d, k) => <div key={d} style={{width: 190, height: 90, background: '#fff', border: `4px solid ${INK}`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: MONO, fontWeight: 700, fontSize: 24}}>{d}<span style={{color: GREEN, fontSize: 34, opacity: pop(t, 79.6 + k * 0.2)}}>✓</span></div>)}
          </Abs>
        </>
      )}
      {!phase2 && ph === 2 && (
        <Abs x={60} y={470} w={960} style={{display: 'flex', gap: 20}}>
          {[{ic: 'porte', l: 's’isoler', a: 87.3}, {ic: 'feuille', l: 'au calme', a: 88.5}, {ic: 'ecrit', l: 'un carnet', a: 89.8}].map((x) => <div key={x.l} style={{flex: 1, height: 330, background: '#fff', border: `5px solid ${INK}`, borderRadius: 20, boxShadow: `7px 7px 0 ${BLUE}`, opacity: pop(t, x.a - 2.5)}}><IcoLab ic={x.ic} l={x.l} size={120} fs={34} /></div>)}
        </Abs>
      )}
      {phase2 && <HiLine words={['Un', 'carnet,', 'un', 'stylo']} mark={[1, 3]} at={88.1} y={330} size={62} />}
      {phase2 && (
        <SearchOpen x={60} y={440} w={960} h={1000} at={88.2} query="outil pour faire le bilan" results={['Appli de productivité premium', 'Un carnet ouvert et un stylo', 'Logiciel de gestion de projet']} found={1} foundAt={90.4} clickAt={91.0} c={BLUE}>
          <div style={{position: 'absolute', left: 30, right: 30, top: 24, height: 460, borderRadius: 20, overflow: 'hidden', border: `5px solid ${INK}`}}>
            <Img src={PH('verites/ecriture.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.15 - 0.1 * prog(t, 91.6, 98)})`}} />
          </div>
          <div style={{position: 'absolute', left: 40, top: 520, display: 'flex', flexDirection: 'column', gap: 16}}>
            <span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: DIM, opacity: pop(t, 92.8)}}>logiciel compliqué<Strike p={prog(t, 93.2, 93.6)} c={RED} /></span>
            <span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: DIM, opacity: pop(t, 94.1)}}>appli à télécharger<Strike p={prog(t, 94.5, 94.9)} c={RED} /></span>
          </div>
          <div style={{position: 'absolute', left: 40, right: 40, top: 700, display: 'flex', gap: 16, flexWrap: 'wrap'}}><Pill at={95.4} c={GREEN} size={32}>un moment pour soi</Pill><Pill at={98.3} c={VIO} size={32}>introspection franche</Pill></div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 820, textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 52, color: INK, opacity: pop(t, 101.4)}}>et pendant 15 minutes ?</div>
        </SearchOpen>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 3 : LES QUATRE QUESTIONS ═════════════ */
const QS = [
  {n: 1, q: 'Qu’est-ce que je n’avais pas du tout anticipé ?', c: ORANGE, at: 111.5, tag: 'les imprévus'},
  {n: 2, q: 'Qu’ai-je appris sur l’état réel du système de prévention ?', c: BLUE, at: 124.98, tag: 'prendre de la hauteur'},
  {n: 3, q: 'Qu’aurais-je pu faire différemment ?', c: VIO, at: 143.3, tag: 'sans se juger'},
  {n: 4, q: 'Quels signaux faibles garder à l’œil ?', c: GREEN, at: 156.66, tag: 'tourné vers l’avenir'},
];
const NET = Array.from({length: 18}, (_, k) => ({x: 80 + random(`vx${k}`) * 760, y: 40 + random(`vy${k}`) * 380}));
const Questions: React.FC = () => {
  const t = useT();
  const qi = QS.reduce((k, x, i) => (t >= x.at ? i : k), -1);
  const Q = qi >= 0 ? QS[qi] : null;
  const flip = Q ? prog(t, Q.at, Q.at + 0.5, easeOut) : 0;
  const zoom = prog(t, 126.9, 129.5, easeInOut);
  return (
    <Out end={172.45}>
      <HiLine words={['Quatre', 'questions', 'clés']} mark={[0, 1]} at={107.3} y={330} size={66} />
      <Abs x={60} y={440} w={960} style={{display: 'flex', gap: 14}}>
        {QS.map((x, k) => (
          <div key={x.n} style={{flex: 1, height: 100, borderRadius: 16, border: `5px solid ${INK}`, background: k === qi ? x.c : k < qi ? '#fff' : '#F3F5F8', boxShadow: k === qi ? `0 0 0 4px ${x.c}55, 6px 6px 0 ${INK}` : `5px 5px 0 ${x.c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: k === qi ? '#fff' : INK, opacity: pop(t, 107.4 + k * 0.25), transform: `translateY(${(1 - pop(t, 107.4 + k * 0.25)) * -40}px)`}}>
            {k < qi ? <span style={{color: GREEN}}>✓</span> : null}{x.n}
          </div>
        ))}
      </Abs>
      {qi < 0 && <Abs x={0} y={700} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-flex', gap: 24, opacity: pop(t, 108.6)}}><Pill at={108.6} c={INK} size={36}>un guide</Pill><Pill at={109.7} c={INK} size={36}>une structure</Pill></div></Abs>}
      {Q && (
        <Abs x={60} y={580} w={960} h={300} style={{perspective: 1400}}>
          <div key={Q.n} style={{width: '100%', height: '100%', background: '#fff', border: `6px solid ${INK}`, borderRadius: 26, boxShadow: `10px 10px 0 ${Q.c}`, transform: `rotateX(${(1 - flip) * 90}deg)`, transformOrigin: '50% 0', display: 'flex', alignItems: 'center', gap: 26, padding: '0 34px', boxSizing: 'border-box'}}>
            <div style={{width: 130, height: 130, borderRadius: 65, background: Q.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{Q.n}</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: Q.q.length > 45 ? 38 : 44, color: INK, lineHeight: 1.15}}>{Q.q}</div>
          </div>
        </Abs>
      )}
      {Q && <Abs x={0} y={905} w={1080} style={{textAlign: 'center'}}><Pill at={Q.at + 0.6} c={Q.c} size={30}>{Q.tag}</Pill></Abs>}
      {qi === 0 && (
        <Abs x={140} y={1000} w={800} h={480}>
          {['eclair', 'question', 'etoile', 'eclair', 'question'].map((ic, k) => {const a = 117.6 + k * 0.2; const q = prog(t, a, a + 0.7, easeOut); return t > a ? <div key={k} style={{position: 'absolute', left: 340 + Math.cos(k * 1.26) * 300 * q, top: 200 + Math.sin(k * 1.26) * 180 * q, transform: `rotate(${q * 30 * (k % 2 ? 1 : -1)}deg)`}}><F n={ic} size={100} /></div> : null;})}
          <div style={{position: 'absolute', left: 300, top: 160, width: 200, height: 200, borderRadius: 100, background: '#fff', border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 116.8)}}><F n="pensif" size={140} /></div>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 52, color: ORANGE, opacity: pop(t, 122.98)}}>c’est là qu’on apprend le plus</div>
        </Abs>
      )}
      {qi === 1 && (
        <Abs x={60} y={1000} w={960} h={500} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `8px 8px 0 ${BLUE}`, overflow: 'hidden', opacity: pop(t, 125.4)}}>
          <div style={{position: 'absolute', inset: 0, transform: `scale(${lerp(3.2, 1, zoom)})`, transformOrigin: `${NET[7].x + 60}px ${NET[7].y + 30}px`}}>
            <svg width={960} height={500}>
              {NET.map((a, i) => NET.slice(i + 1).filter((b) => Math.hypot(a.x - b.x, a.y - b.y) < 230).map((b, j) => <line key={`${i}-${j}`} x1={a.x + 60} y1={a.y + 30} x2={b.x + 60} y2={b.y + 30} stroke={BLUE} strokeWidth={3} opacity={0.25 + 0.5 * zoom} />))}
              {NET.map((a, i) => <circle key={i} cx={a.x + 60} cy={a.y + 30} r={i === 7 ? 22 : 12} fill={i === 7 ? ORANGE : BLUE} stroke={INK} strokeWidth={3} opacity={i === 7 ? 1 : 0.2 + 0.8 * zoom} />)}
            </svg>
          </div>
          <div style={{position: 'absolute', left: 18, top: 14, display: 'flex', gap: 10}}><Mono at={125.6} c={ORANGE} size={20}>un événement</Mono>{zoom > 0.5 && <Mono at={128.2} c={BLUE} size={20}>→ tout le système</Mono>}</div>
          {zoom > 0 && zoom < 1 && <div style={{position: 'absolute', left: 380, top: 140, width: 200, height: 200, borderRadius: '50%', border: `10px solid ${INK}`, background: 'rgba(191,215,234,0.25)'}}><div style={{position: 'absolute', right: -60, bottom: -40, width: 100, height: 28, background: INK, borderRadius: 14, transform: 'rotate(40deg)'}} /></div>}
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 18, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: BLUE, opacity: pop(t, 137.3)}}>les grandes dynamiques à l’œuvre</div>
        </Abs>
      )}
      {qi === 2 && (
        <Abs x={60} y={1000} w={960} h={500}>
          <Card x={0} y={0} w={460} h={300} at={147.3} c={RED}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 34}}><div style={{transform: `rotate(${-30 + Math.sin(t * 10) * 10}deg)`}}><F n="equerre" size={120} /></div><span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 30, marginTop: 14}}>se taper sur les doigts<Strike p={prog(t, 149.4, 149.9)} c={RED} /></span></div>
          </Card>
          <Card x={500} y={0} w={460} h={300} at={151.5} c={GREEN}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 34}}><F n="hausse" size={120} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, marginTop: 14}}>s’améliorer</div></div>
          </Card>
          <Abs x={0} y={350} w={960} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 52, color: VIO, opacity: pop(t, 152.7)}}>tranquillement, la prochaine fois</Abs>
        </Abs>
      )}
      {qi === 3 && (
        <Abs x={240} y={980} w={600} h={600}>
          <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: NIGHT, border: `8px solid ${INK}`, boxShadow: `0 0 40px ${GREEN}55`, overflow: 'hidden', opacity: pop(t, 162.0)}}>
            {[0.3, 0.6, 0.9].map((r) => <div key={r} style={{position: 'absolute', left: `${50 - r * 50}%`, top: `${50 - r * 50}%`, width: `${r * 100}%`, height: `${r * 100}%`, borderRadius: '50%', border: `2px solid ${GREEN}66`}} />)}
            <div style={{position: 'absolute', inset: 0, background: `conic-gradient(from ${(t - 162) * 160}deg, ${GREEN}AA 0deg, transparent 45deg)`}} />
            {[{x: 180, y: 160, a: 163.3}, {x: 400, y: 230, a: 164.4}, {x: 260, y: 420, a: 165.4}, {x: 430, y: 410, a: 168.8}].map((b, k) => <div key={k} style={{position: 'absolute', left: b.x, top: b.y, width: 22, height: 22, borderRadius: 11, background: YEL, boxShadow: `0 0 ${16 + 10 * Math.sin(t * 6 + k)}px ${YEL}`, opacity: pop(t, b.a) * (0.5 + 0.5 * Math.abs(Math.sin(t * 3 + k)))}} />)}
          </div>
          <div style={{position: 'absolute', left: -180, right: -180, bottom: -70, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: GREEN, opacity: pop(t, 168.8)}}>entraîner son radar · son intuition</div>
        </Abs>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 4 : LE DOUBLE BÉNÉFICE ═════════════ */
const Benefice: React.FC = () => {
  const t = useT();
  const ph = t < 195.0 ? 0 : t < 212.6 ? 1 : 2;
  const years = prog(t, 200.0, 202.4);
  const infl = prog(t, 219.3, 222.0, easeInOut);
  const popB = t > 224.5;
  return (
    <Out end={231.15}>
      <HiLine words={ph === 0 ? ['Un', 'double', 'bénéfice'] : ph === 1 ? ['Une', 'mémoire', 'professionnelle'] : ['La', 'fameuse', 'humilité']} mark={ph === 0 ? [1, 2] : ph === 1 ? [1, 2] : [2]} at={[175.9, 195.1, 212.7][ph]} y={330} size={60} />
      {ph === 0 && (
        <>
          <Card x={60} y={460} w={440} h={520} at={185.1} c={BLUE}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40, gap: 14, textAlign: 'center'}}><F n="cerveau" size={150} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36}}>mémoire professionnelle</div><Pill at={188.3} c={BLUE} size={30}>savoir</Pill></div>
          </Card>
          <Card x={580} y={460} w={440} h={520} at={190.2} c={ORANGE}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40, gap: 14, textAlign: 'center'}}><F n="pousse" size={150} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36}}>humilité</div><Pill at={192.3} c={ORANGE} size={30}>savoir-être</Pill></div>
          </Card>
          {t > 193.6 && <svg width={1080} height={200} style={{position: 'absolute', left: 0, top: 640}}><path d="M500 100 C 530 40, 550 160, 580 100" fill="none" stroke={GREEN} strokeWidth={14} strokeLinecap="round" strokeDasharray={140} strokeDashoffset={140 * (1 - prog(t, 193.6, 194.2))} /></svg>}
          <Abs x={0} y={1020} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 60, color: GREEN, opacity: pop(t, 193.8)}}>connectés ↔</Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <Abs x={60} y={450} w={960} h={120} style={{display: 'flex', gap: 8, opacity: pop(t, 199.9)}}>
            {Array.from({length: 10}, (_, k) => <div key={k} style={{flex: 1, height: 90, borderRadius: 12, border: `4px solid ${INK}`, background: years * 10 > k ? BLUE : '#fff', color: years * 10 > k ? '#fff' : DIM, fontFamily: MONO, fontWeight: 700, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>an {k + 1}</div>)}
          </Abs>
          <Abs x={140} y={600} w={400} h={720}>
            {Array.from({length: 26}, (_, k) => {const a = 200.4 + k * 0.08; return t > a ? <div key={k} style={{position: 'absolute', left: Math.sin(k * 1.9) * 10, bottom: k * 22, width: 380, height: 30, background: '#FFFDF4', border: `3px solid ${INK}`, borderRadius: 4, transform: `rotate(${Math.sin(k * 2.7) * 3}deg)`}} /> : null;})}
            <div style={{position: 'absolute', left: 0, right: 0, top: -10, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, opacity: pop(t, 201.1)}}>des centaines de pages</div>
          </Abs>
          <Card x={600} y={640} w={420} h={300} at={203.0} c={TEAL}><IcoLab ic="classeur" l="base de données personnelle" size={110} fs={28} /></Card>
          <Card x={600} y={980} w={420} h={300} at={207.7} c={GOLD}><IcoLab ic="couronne" l="une mine d’or" size={110} fs={32} /></Card>
          {t > 207.8 && t < 212.6 && <Dust n={14} c={GOLD} />}
        </>
      )}
      {ph === 2 && (
        <>
          <Abs x={240} y={470} w={600} h={620}>
            {!popB && <div style={{position: 'absolute', left: 300 - (150 + 120 * infl), top: 300 - (150 + 120 * infl), width: (150 + 120 * infl) * 2, height: (150 + 120 * infl) * 2, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, #FF9A8A, ${RED})`, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 36 + 10 * infl, color: '#fff', opacity: pop(t, 217.0), padding: 30, boxSizing: 'border-box'}}>certitude excessive{t > 220.3 ? ' : « j’ai tout vu »' : ''}</div>}
            {popB && [0, 1, 2, 3, 4, 5, 6, 7].map((k) => {const q = prog(t, 224.5, 225.4, easeOut); return <div key={k} style={{position: 'absolute', left: 290 + Math.cos(k * 0.785) * 300 * q, top: 290 + Math.sin(k * 0.785) * 300 * q, width: 40, height: 20, background: RED, borderRadius: 8, transform: `rotate(${k * 45}deg)`, opacity: 1 - q}} />;})}
            {popB && <div style={{position: 'absolute', left: 0, right: 0, top: 200, textAlign: 'center', opacity: prog(t, 225.0, 225.5)}}><F n="planete" size={180} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, marginTop: 10}}>les pieds sur Terre</div><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 48, color: GREEN}}>l’esprit ouvert</div></div>}
          </Abs>
          <Abs x={60} y={1130} w={960} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: VIO, opacity: pop(t, 222.0)}}>« Qu’est-ce que j’aurais pu faire de mieux ? »</Abs>
          <Stamp at={228.8} c={GREEN} text="anti-arrogance" x={250} y={1240} rot={-6} size={66} />
        </>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 5 : LE LIVRE DE BORD ═════════════ */
const Livre: React.FC = () => {
  const t = useT();
  const open = prog(t, 234.8, 236.0, easeInOut);
  const pages = t > 251.8 ? Math.floor((t - 251.8) * 3) : 0;
  const pf = t > 251.8 ? ((t - 251.8) * 3) % 1 : 0;
  const write = prog(t, 248.1, 250.6);
  return (
    <Out end={256.45}>
      <HiLine words={['Le', 'livre', 'de', 'bord']} mark={[1, 3]} at={234.6} y={330} size={66} />
      <Abs x={90} y={460} w={900} h={620} style={{perspective: 2000}}>
        <div style={{position: 'absolute', left: 450, top: 0, width: 440, height: 600, background: '#FFFDF4', border: `6px solid ${INK}`, borderRadius: '0 18px 18px 0', boxShadow: `10px 10px 0 ${TEAL}`, overflow: 'hidden'}}>
          {Array.from({length: 12}, (_, k) => <div key={k} style={{position: 'absolute', left: 30, right: 30, top: 70 + k * 42, height: 2, background: '#C9D8E8'}} />)}
          <svg width={440} height={600} style={{position: 'absolute', left: 0, top: 0}}><path d="M40 150 C 80 110, 110 190, 150 150 S 230 110, 270 150 S 350 190, 400 140" fill="none" stroke={NAVY} strokeWidth={5} strokeLinecap="round" strokeDasharray={420} strokeDashoffset={420 * (1 - write)} /></svg>
          {write > 0 && <div style={{position: 'absolute', left: 30 + 360 * write, top: 80 + Math.sin(write * 20) * 18}}><F n="feutre" size={90} /></div>}
          <div style={{position: 'absolute', left: 30, right: 30, top: 260, fontFamily: handFont, fontWeight: 700, fontSize: 40, color: TEAL, opacity: pop(t, 252.7)}}>l’auteur…</div>
          <div style={{position: 'absolute', left: 30, right: 30, top: 330, fontFamily: handFont, fontWeight: 700, fontSize: 40, color: TEAL, opacity: pop(t, 253.9)}}>le protagoniste !</div>
        </div>
        <div style={{position: 'absolute', left: 450, top: 0, width: 440, height: 600, transformOrigin: '0 50%', transform: `rotateY(${-open * 178}deg)`, transformStyle: 'preserve-3d'}}>
          <div style={{position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${TEAL}, #0B6F65)`, border: `6px solid ${INK}`, borderRadius: '0 18px 18px 0', backfaceVisibility: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: '#fff', textAlign: 'center'}}>{t < 237.0 ? 'carnet de notes' : 'LIVRE DE BORD'}</div>
            <F n="boussole" size={140} />
          </div>
          <div style={{position: 'absolute', inset: 0, background: '#FFFDF4', border: `6px solid ${INK}`, borderRadius: '18px 0 0 18px', transform: 'rotateY(180deg)', backfaceVisibility: 'hidden'}}>
            {Array.from({length: 12}, (_, k) => <div key={k} style={{position: 'absolute', left: 30, right: 30, top: 70 + k * 42, height: 2, background: '#C9D8E8'}} />)}
            <div style={{position: 'absolute', left: 30, top: 30, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>vendredi · page {1 + pages}</div>
          </div>
        </div>
        {pf > 0 && pages < 40 && <div style={{position: 'absolute', left: 450, top: 6, width: 430, height: 588, transformOrigin: '0 50%', transform: `rotateY(${-pf * 178}deg)`, background: '#FFFDF4', border: `3px solid ${INK}`, backfaceVisibility: 'hidden', opacity: 0.95}} />}
      </Abs>
      <Abs x={0} y={1120} w={1080} style={{textAlign: 'center'}}><span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: DIM, opacity: pop(t, 243.2)}}>se donner bonne conscience<Strike p={prog(t, 245.0, 245.5)} c={RED} /></span></Abs>
      <Stamp at={246.4} c={TEAL} text="acte délibéré" x={280} y={1210} rot={-5} size={64} />
      <Abs x={0} y={1400} w={1080} style={{textAlign: 'center'}}><Pill at={248.1} c={NAVY} size={34}>prendre la plume</Pill></Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 6 : UNE INVITATION ═════════════ */
const Invitation: React.FC = () => {
  const t = useT();
  const hand = prog(t, 264.4, 266.6);
  const load = prog(t, 266.4, 268.4, easeInOut);
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={t < 262.1 ? ['Une', 'invitation'] : ['Ce', 'vendredi…']} mark={[1]} at={t < 262.1 ? 259.9 : 262.2} y={330} size={70} />
      <Abs x={190} y={450} w={700} h={760} style={{background: '#FFFDF4', border: `6px solid ${INK}`, borderRadius: 22, boxShadow: `12px 12px 0 ${GREEN}`, overflow: 'hidden', opacity: pop(t, 259.9), transform: `rotate(${-1.5 + pop(t, 259.9) * 1.5}deg)`}}>
        {Array.from({length: 15}, (_, k) => <div key={k} style={{position: 'absolute', left: 40, right: 40, top: 100 + k * 44, height: 2, background: '#C9D8E8'}} />)}
        <div style={{position: 'absolute', left: 60, top: 0, bottom: 0, width: 3, background: '#F2A3A3'}} />
        <div style={{position: 'absolute', left: 90, top: 40, fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM}}>page 1</div>
        <div style={{position: 'absolute', left: 90, top: 120, fontFamily: handFont, fontWeight: 700, fontSize: 66, color: NAVY, clipPath: `inset(0 ${100 - hand * 100}% 0 0)`}}>Vendredi —</div>
        <div style={{position: 'absolute', left: 90, top: 210, fontFamily: handFont, fontWeight: 700, fontSize: 50, color: NAVY, clipPath: `inset(0 ${100 - prog(t, 265.6, 267.6) * 100}% 0 0)`}}>ce que j’ai appris…</div>
        <div style={{position: 'absolute', left: 92 + hand * 300, top: 300, width: 6, height: 50, background: GREEN, opacity: Math.sin(t * 10) > 0 ? 1 : 0}} />
      </Abs>
      <Abs x={140} y={1260} w={800} style={{opacity: pop(t, 266.2)}}>
        <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: INK, textAlign: 'center', marginBottom: 10}}>première page en cours d’écriture…</div>
        <div style={{height: 44, border: `5px solid ${INK}`, borderRadius: 8, background: '#fff', overflow: 'hidden'}}><div style={{width: `${load * 100}%`, height: '100%', background: GREEN}} /></div>
      </Abs>
      {t > ALLDONE && <Dust n={22} c={GOLD} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: at + 0.35 + len * 0.05, s: 'sfx/pop', v: 0.25}, ...rep(at + 0.8 + len * 0.05, 3, 0.12, 'sfx/pop', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 1.4, s: 'validation', v: 0.2})), {at: ALLDONE, s: 'validation', v: 0.35},
  ...rep(4.46, 5, 0.18, 'sfx/pop', 0.18), {at: 6.94, s: 'soft-whoosh', v: 0.35, dur: 1.6}, {at: 7.4, s: 'stylo', v: 0.3}, {at: 9.6, s: 'sfx/whoosh', v: 0.25}, {at: 11.0, s: 'sfx/rise', v: 0.25, dur: 2.6}, {at: 15.3, s: 'sfx/pop', v: 0.22}, {at: 16.6, s: 'sfx/pop', v: 0.22},
  {at: 21.86, s: 'sfx/thud', v: 0.35}, {at: 23.4, s: 'sfx/rise', v: 0.2, dur: 1.2}, {at: 23.5, s: 'sfx/ding', v: 0.3}, {at: 24.9, s: 'sfx/pop', v: 0.22}, ...rep(25.2, 10, 0.25, 'sfx/click', 0.06), {at: 32.3, s: 'sfx/pop', v: 0.2}, {at: 33.2, s: 'sfx/pop', v: 0.2}, ...[0, 1, 2, 3, 4].map((k) => ({at: 35.4 + k * 0.3, s: 'sfx/swish', v: 0.2})),
  ...rep(38.0, 6, 0.2, 'sfx/pop', 0.15), {at: 40.0, s: 'soft-whoosh', v: 0.35, dur: 2.5}, ...rep(46.8, 8, 0.4, 'notification', 0.12), {at: 50.4, s: 'tension', v: 0.2, dur: 2.2}, {at: 52.6, s: 'tampon', v: 0.55}, {at: 52.62, s: 'deep-hit', v: 0.35},
  ...flaps(62.9, 14), {at: 64.2, s: 'sfx/pop', v: 0.25}, ...[72.6, 72.75, 72.9, 73.05].map((a) => ({at: a, s: 'sfx/click', v: 0.3})), {at: 74.5, s: 'sfx/pop', v: 0.3}, ...rep(74.6, 12, 0.14, 'tick', 0.14), {at: 76.3, s: 'sfx/ding', v: 0.35}, ...[79.6, 79.8, 80.0, 80.2].map((a) => ({at: a, s: 'sfx/ding', v: 0.15})), ...[84.8, 86.0, 87.3].map((a) => ({at: a, s: 'sfx/pop', v: 0.22})),
  ...searchCues(88.2, 25, 90.4, 91.0), {at: 93.2, s: 'stylo', v: 0.3}, {at: 94.5, s: 'stylo', v: 0.3}, {at: 95.4, s: 'sfx/pop', v: 0.22}, {at: 98.3, s: 'sfx/pop', v: 0.22},
  ...[107.4, 107.65, 107.9, 108.15].map((a) => ({at: a, s: 'sfx/thud', v: 0.25})), ...QS.map((q) => ({at: q.at, s: 'page', v: 0.4})), ...QS.map((q) => ({at: q.at + 0.6, s: 'sfx/pop', v: 0.2})),
  ...rep(117.6, 5, 0.2, 'sfx/pop', 0.2), {at: 126.9, s: 'soft-whoosh', v: 0.35, dur: 2.6}, {at: 129.5, s: 'sfx/ding', v: 0.25}, {at: 149.4, s: 'stylo', v: 0.3}, {at: 151.5, s: 'sfx/rise', v: 0.25}, {at: 162.0, s: 'sfx/whoosh', v: 0.25}, ...[163.3, 164.4, 165.4, 168.8].map((a) => ({at: a, s: 'notification', v: 0.15})),
  {at: 185.1, s: 'sfx/pop', v: 0.25}, {at: 190.2, s: 'sfx/pop', v: 0.25}, {at: 193.6, s: 'sfx/rise', v: 0.2, dur: 0.6}, ...rep(200.0, 10, 0.24, 'tick', 0.14), ...rep(200.4, 26, 0.08, 'page', 0.05), {at: 203.0, s: 'sfx/pop', v: 0.22}, {at: 207.7, s: 'sfx/ding', v: 0.3},
  {at: 217.0, s: 'sfx/pop', v: 0.2}, {at: 219.3, s: 'tension', v: 0.2, dur: 2.7}, {at: 224.5, s: 'sfx/pop', v: 0.7}, {at: 225.0, s: 'validation', v: 0.25}, {at: 228.8, s: 'tampon', v: 0.55},
  {at: 234.8, s: 'page', v: 0.5}, {at: 237.0, s: 'sfx/ding', v: 0.25}, {at: 245.0, s: 'stylo', v: 0.3}, {at: 246.4, s: 'tampon', v: 0.55}, {at: 248.1, s: 'stylo', v: 0.4, dur: 2.5}, ...rep(251.8, 12, 0.33, 'page', 0.18),
  {at: 259.9, s: 'sfx/whoosh', v: 0.25}, {at: 264.4, s: 'stylo', v: 0.4, dur: 3}, {at: 266.4, s: 'sfx/rise', v: 0.2, dur: 2}, ...flaps(267.0, 10),
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const VendrediBilan: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={19.6}><Intro /></Gate>
    <Gate from={22.8} to={54.4}><Brouillard /></Gate>
    <Gate from={57.5} to={103.7}><Rituel /></Gate>
    <Gate from={106.8} to={172.5}><Questions /></Gate>
    <Gate from={175.6} to={231.2}><Benefice /></Gate>
    <Gate from={234.3} to={256.5}><Livre /></Gate>
    <Gate from={259.6} to={OUTRO_AT}><Invitation /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}><Gyro i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={269.3}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-vendredi-bilan-origine.m4a')} trimAfter={s(269.4)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Kin, Brut, T, TitleBlock, Deep, Blinds, Tile, YEL, GLASS, Check];
