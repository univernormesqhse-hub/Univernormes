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
 * « QSE, HSE, QHSE : une lettre change tout » (1 min 10) — capsule « condensé + effet wahou » : voix d'origine,
 * sous-titres calés mot à mot, photos réelles, thème « papier quadrillé ».
 * Fil rouge : LE TUBE PNEUMATIQUE À SIX GUICHETS (sigles → QSE → HSE → QHSE → sensibles → mission), adaptés aux parties
 * réellement présentes ; la capsule du dossier file d'un guichet à l'autre, chaque guichet passé se coche.
 * Transition : LE GYROPHARE (version accélérée, 1,7 s, vu la brièveté de la capsule).
 * Effets « wahou » : sigles qui se mélangent jusqu'à se confondre, lettre H retirée puis remise, faisceau décodeur qui
 * révèle le sens de chaque lettre, H absorbé par le S, Q éjecté vers un département indépendant, pilier H qui se
 * détache et grandit, vitre qui se fissure sous la faille sanitaire, barre de recherche qui trouve puis OUVRE la
 * mission commune.
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
const OUTRO_AT = 70.2;
export const QHSE2_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 2.7, n: '1', title: 'Des sigles jumeaux', s: 'une seule lettre d’écart', c: NAVY, g: 'sigles', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 15.9, n: '2', title: 'Le QSE', s: 'qualité · sécurité · environnement', c: BLUE, g: 'QSE', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 28.2, n: '3', title: 'Le HSE', s: 'hygiène · sécurité · environnement', c: ORANGE, g: 'HSE', k: 'gyro', lab: 'PARTIE 3 / 6'},
  {at: 43.3, n: '4', title: 'Le QHSE', s: 'la norme intégrale', c: GREEN, g: 'QHSE', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 54.4, n: '5', title: 'Milieux sensibles', s: 'la faille sanitaire', c: RED, g: 'sensibles', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 59.5, n: '6', title: 'Une mission commune', s: 'quel que soit le sigle', c: VIO, g: 'mission', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 68.9;

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
/** Gyrophare accéléré (×2) : même mise en scène que le gyrophare de la série, tenue en 1,7 s. */
const SP = 2;
const GyroF: React.FC<{i: number}> = ({i}) => {
  const t0 = useT();
  const S0 = SECT[i];
  const t = S0.at + (t0 - S0.at) * SP;
  const k = t - S0.at;
  if (k < 0 || k > 3.4) return null;
  const inn = prog(t, S0.at, S0.at + 0.25, easeOut) * (1 - prog(t, S0.at + 3.0, S0.at + 3.4, easeIn));
  const band = prog(t, S0.at + 0.3, S0.at + 1.0, easeOut);
  const beam = '31,111,209';
  return (
    <AbsoluteFill style={{zIndex: 35, opacity: inn, overflow: 'hidden'}}>
      <AbsoluteFill style={{background: PAPER}} />
      <Bg />
      <AbsoluteFill style={{background: `conic-gradient(from ${k * 520}deg at 540px 300px, rgba(${beam},0.38) 0deg, transparent 26deg, transparent 180deg, rgba(${beam},0.38) 180deg, transparent 206deg)`, opacity: 1 - prog(t, S0.at + 1.6, S0.at + 2.4)}} />
      <div style={{position: 'absolute', left: 470, top: 320, width: 140, height: 90, borderRadius: '70px 70px 12px 12px', background: `radial-gradient(circle at 50% 40%, #fff, rgb(${beam}) 60%)`, border: `5px solid ${INK}`, boxShadow: `0 0 ${40 + 30 * Math.abs(Math.sin(k * 9))}px rgb(${beam})`}} />
      <div style={{position: 'absolute', left: -400, top: 760, width: 1900, height: 260, transform: `translateX(${lerp(-1900, 0, band)}px) rotate(-8deg)`, background: `repeating-conic-gradient(${NAVY} 0 25%, ${YEL} 0 50%) 0 0 / 130px 130px`, border: `8px solid ${INK}`}} />
      <div style={{position: 'absolute', left: 110, top: 740, width: 860, height: 300, transform: `rotate(-8deg) scale(${Math.max(0, Math.min(1, spring(t, S0.at + 0.9, 8, 12)))})`, background: '#fff', border: `7px solid ${INK}`, borderRadius: 24, boxShadow: `12px 12px 0 ${S0.c}`, display: 'flex', alignItems: 'center', gap: 26, padding: '0 30px', boxSizing: 'border-box'}}>
        <div style={{width: 150, height: 150, borderRadius: 75, background: S0.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 96, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{S0.n}</div>
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM, letterSpacing: 3}}>{S0.lab}</div><Kin text={S0.title} at={S0.at + 1.1 / SP} size={S0.title.length > 18 ? 50 : 62} stagger={0.012} /></div>
      </div>
      <Abs x={0} y={1140} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-block', background: S0.c, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 2, padding: '6px 16px', borderRadius: 6, opacity: pop(t, S0.at + 1.6)}}>{S0.s.toUpperCase()}</div></Abs>
    </AbsoluteFill>
  );
};


const LC: Record<string, string> = {Q: BLUE, H: GOLD, S: ORANGE, E: GREEN};
const LW: Record<string, string> = {Q: 'qualité', H: 'hygiène', S: 'sécurité', E: 'environnement'};
/** Tuile-lettre carrée aux couleurs du sigle. */
const LT: React.FC<{ch: string; size?: number; dim?: boolean; glow?: number; style?: React.CSSProperties}> = ({ch, size = 130, dim, glow = 0, style}) => (
  <div style={{width: size, height: size, borderRadius: size * 0.16, background: dim ? '#C9D2DF' : LC[ch], border: `${Math.max(4, size * 0.04)}px solid ${INK}`, boxShadow: `${size * 0.05}px ${size * 0.05}px 0 ${INK}${glow > 0 ? `, 0 0 ${glow}px ${LC[ch]}` : ''}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.62, display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', ...style}}>{ch}</div>
);

const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('soudage/soudeur-etincelles.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 900, objectFit: 'cover', objectPosition: '50% 40%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 32%, ${PAPER}DD 42%, ${PAPER} 47%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={700} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>UNE LETTRE CHANGE TOUT</div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 80, color: INK, marginTop: 10}}>QSE · HSE ·</div>
        <div style={{display: 'flex', justifyContent: 'center', gap: 14, marginTop: 14}}>{'QHSE'.split('').map((c) => <LT key={c} ch={c} size={170} glow={c === 'H' ? 30 : 0} />)}</div>
      </Abs>
      <Abs x={60} y={1400} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 70, width: 140, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO : DES SIGLES JUMEAUX ═════════════ */
const ROWS = ['QSE', 'HSE', 'QHSE'];
const Intro: React.FC = () => {
  const t = useT();
  const mix = prog(t, 5.6, 6.9, easeInOut) * (1 - prog(t, 7.4, 8.1, easeInOut));
  const phase2 = t >= 8.1;
  const lift = t < 9.06 ? 0 : t < 9.8 ? prog(t, 9.06, 9.4, easeOut) : 1 - prog(t, 9.8, 10.2, easeIn);
  const beam = prog(t, 14.3, 15.6, easeInOut);
  return (
    <Out end={15.95}>
      <HiLine words={phase2 ? ['Une', 'seule', 'lettre'] : ['Des', 'sigles', 'jumeaux']} mark={phase2 ? [2] : [1, 2]} at={phase2 ? 8.2 : 2.7} y={330} size={66} />
      {!phase2 && ROWS.map((r, k) => (
        <Abs key={r} x={0} y={500 + k * 260} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16, opacity: pop(t, 2.75 + k * 0.15), transform: `translateX(${(1 - pop(t, 2.75 + k * 0.15)) * (k % 2 ? 300 : -300)}px) translateY(${mix * (260 - k * 260)}px) rotate(${mix * (k - 1) * 6}deg)`, filter: `blur(${mix * 4}px)`}}>
          {r.split('').map((c, j) => <LT key={j} ch={c} size={170} />)}
        </Abs>
      ))}
      {!phase2 && <Abs x={0} y={1290} w={1080} style={{textAlign: 'center'}}><span style={{fontFamily: handFont, fontWeight: 700, fontSize: 64, color: RED, opacity: pop(t, 6.7)}}>on les confond…</span></Abs>}
      {phase2 && (
        <>
          <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 18}}>
            {'QHSE'.split('').map((c) => (
              <div key={c} style={{position: 'relative', transform: c === 'H' ? `translateY(${-lift * 200}px) rotate(${lift * -10}deg)` : undefined}}>
                <LT ch={c} size={200} glow={c === 'H' ? 20 + 20 * lift : 0} />
                {beam > 0 && <div style={{position: 'absolute', left: -20, right: -20, top: 220, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: LC[c], opacity: prog(t, 14.3 + 'QHSE'.indexOf(c) * 0.25, 14.6 + 'QHSE'.indexOf(c) * 0.25)}}>{LW[c]}</div>}
              </div>
            ))}
          </Abs>
          {beam > 0 && beam < 1 && <div style={{position: 'absolute', left: lerp(60, 1000, beam) - 6, top: 520, width: 12, height: 360, background: GREEN, boxShadow: `0 0 40px ${GREEN}`, borderRadius: 6}} />}
          <Abs x={150} y={940} w={340} style={{opacity: pop(t, 9.06)}}><div style={{display: 'flex', alignItems: 'center', gap: 12, background: '#fff', border: `4px solid ${INK}`, borderRadius: 16, padding: '12px 18px', boxShadow: `6px 6px 0 ${RED}`}}><F n="ciseaux" size={56} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32}}>enlever</div></div></Abs>
          <Abs x={600} y={940} w={340} style={{opacity: pop(t, 9.8)}}><div style={{display: 'flex', alignItems: 'center', gap: 12, background: '#fff', border: `4px solid ${INK}`, borderRadius: 16, padding: '12px 18px', boxShadow: `6px 6px 0 ${GREEN}`}}><F n="check" size={56} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32}}>ajouter</div></div></Abs>
          <Abs x={0} y={1110} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: pop(t, 11.8)}}><F n="cible" size={80} /><Pill at={11.8} c={NAVY} size={34}>la véritable stratégie</Pill></Abs>
          <Abs x={0} y={1250} w={1080} style={{textAlign: 'center'}}><Mono at={14.4} c={GREEN} size={26}>décodage en cours…</Mono></Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ LE QSE ═════════════ */
const ZQse: React.FC = () => {
  const t = useT();
  const abs = prog(t, 20.6, 21.6, easeInOut);
  const glowS = Math.max(0, Math.sin(prog(t, 21.3, 22.4) * Math.PI)) * 50;
  return (
    <Out end={28.25}>
      <HiLine words={['Le', 'QSE']} mark={[1]} at={17.6} y={330} size={72} />
      <Abs x={0} y={440} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 18, opacity: pop(t, 17.7)}}>
        {'QSE'.split('').map((c) => <LT key={c} ch={c} size={180} glow={c === 'S' ? glowS : 0} />)}
      </Abs>
      {t > 18.7 && abs < 1 && (
        <div style={{position: 'absolute', left: lerp(860, 450, abs), top: lerp(680, 470, abs), transform: `scale(${lerp(1, 0.2, abs)}) rotate(${abs * 180}deg)`, opacity: pop(t, 18.8) * (1 - abs * 0.6), zIndex: 3}}><LT ch="H" size={180} /></div>
      )}
      {t > 18.8 && <Abs x={0} y={700} w={1080} style={{textAlign: 'center', opacity: pop(t, 19.2)}}><span style={{fontFamily: handFont, fontWeight: 700, fontSize: 52, color: GOLD}}>{abs < 1 ? 'l’hygiène n’a pas disparu…' : 'absorbée par la sécurité ✓'}</span></Abs>}
      {t > 22.95 && <Blinds src="soudage/soudeur-etincelles.jpg" x={60} y={800} w={960} h={460} at={23.0} pos="50% 40%" n={12}>
        <div style={{position: 'absolute', left: 20, bottom: 20, display: 'flex', gap: 12}}><Pill at={23.9} c={BLUE} size={30}>BTP</Pill><Pill at={24.62} c={NAVY} size={30}>industrie lourde</Pill></div>
      </Blinds>}
      <Stamp at={26.6} c={RED} text="risques physiques" x={200} y={1300} rot={-5} size={58} />
    </Out>
  );
};

/* ═════════════ LE HSE ═════════════ */
const ZHse: React.FC = () => {
  const t = useT();
  const out = prog(t, 32.0, 33.0, easeInOut);
  const land = prog(t, 35.6, 36.6, easeOut);
  return (
    <Out end={43.35}>
      <HiLine words={['L’approche', 'HSE']} mark={[1]} at={29.9} y={330} size={70} />
      <Abs x={0} y={440} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 18, opacity: pop(t, 30.0)}}>
        <div style={{width: 180, height: 180, transform: `translate(${out * 720}px, ${out * 340 + land * 0}px) scale(${1 - out * 0.4})`, opacity: t > 31.0 ? 1 : 0}}><LT ch="Q" size={180} dim={out > 0.5} /></div>
        {'HSE'.split('').map((c) => <LT key={c} ch={c} size={180} />)}
      </Abs>
      {t > 31.14 && <Abs x={0} y={660} w={1080} style={{textAlign: 'center'}}><span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: DIM, opacity: pop(t, 31.14)}}>qualité écartée<Strike p={prog(t, 32.1, 32.5)} c={RED} /></span></Abs>}
      <Abs x={560} y={760} w={460} h={360} style={{border: `6px dashed ${BLUE}`, borderRadius: 24, background: `${BLUE}0D`, opacity: pop(t, 34.8)}}>
        <div style={{position: 'absolute', left: 50, top: 20}}><F n="batiment" size={110} /></div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 24, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: BLUE}}>département qualité<br />indépendant</div>
      </Abs>
      <Abs x={60} y={760} w={460} h={360} style={{opacity: pop(t, 33.6)}}><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 60, color: INK, paddingTop: 110, textAlign: 'center'}}>pas un oubli !</div></Abs>
      <Card x={60} y={1170} w={460} h={250} at={40.3} c={ORANGE}><IcoLab ic="equipe" l="protection des équipes" size={100} fs={28} /></Card>
      <Card x={560} y={1170} w={460} h={250} at={41.7} c={GREEN}><IcoLab ic="planete" l="environnement" size={100} fs={30} /></Card>
    </Out>
  );
};

/* ═════════════ LE QHSE ═════════════ */
const ZQhse: React.FC = () => {
  const t = useT();
  const grow = prog(t, 47.9, 48.9, easeOut);
  const S3 = [{ic: 'assiette', l: 'agroalimentaire', a: 51.62}, {ic: 'eprouvette', l: 'chimie', a: 52.66}, {ic: 'stethoscope', l: 'santé', a: 53.42}];
  return (
    <Out end={54.45}>
      <HiLine words={['La', 'norme', 'intégrale']} mark={[1, 2]} at={45.1} y={330} size={66} />
      <Abs x={90} y={440} w={900} h={620}>
        {'QHSE'.split('').map((c, k) => {
          const isH = c === 'H';
          const p = prog(t, 45.2 + k * 0.15, 45.7 + k * 0.15, easeOut);
          const h = (isH ? 300 + 180 * grow : 300) * p;
          return (
            <div key={c} style={{position: 'absolute', left: k * 225 + (isH ? grow * 0 : 0), bottom: 0, width: 190, height: h + 1, background: `linear-gradient(90deg, ${LC[c]}, ${LC[c]}CC 50%, ${LC[c]})`, border: `6px solid ${INK}`, borderRadius: 14, boxShadow: isH && grow > 0 ? `0 0 ${30 + 20 * Math.sin(t * 5)}px ${GOLD}` : `7px 7px 0 ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 14, overflow: 'hidden', transform: isH ? `translateY(${-grow * 20}px)` : undefined}}>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 110, color: '#fff', lineHeight: 1}}>{c}</div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: '#fff', marginTop: 8}}>{LW[c]}</div>
            </div>
          );
        })}
      </Abs>
      <Abs x={0} y={1080} w={1080} style={{textAlign: 'center', opacity: pop(t, 48.9)}}><Pill at={48.9} c={GOLD} size={34}>H : un pilier autonome</Pill></Abs>
      <Abs x={60} y={1190} w={960} style={{display: 'flex', gap: 20}}>
        {S3.map((x) => <div key={x.l} style={{flex: 1, height: 220, background: '#fff', border: `5px solid ${INK}`, borderRadius: 20, boxShadow: `6px 6px 0 ${GREEN}`, opacity: pop(t, x.a), transform: `translateY(${(1 - pop(t, x.a)) * 40}px)`}}><IcoLab ic={x.ic} l={x.l} size={86} fs={26} /></div>)}
      </Abs>
    </Out>
  );
};

/* ═════════════ MILIEUX SENSIBLES ═════════════ */
const CRACKS = Array.from({length: 9}, (_, k) => {
  let x = 480, y = 300; const a0 = (k / 9) * Math.PI * 2; let d = `M${x} ${y}`;
  for (let j = 0; j < 5; j++) {const a = a0 + (random(`ca${k}-${j}`) - 0.5) * 0.9; x += Math.cos(a) * 70; y += Math.sin(a) * 70; d += ` L${x.toFixed(0)} ${y.toFixed(0)}`;}
  return d;
});
const Sensibles: React.FC = () => {
  const t = useT();
  const cr = prog(t, 57.3, 58.0, easeOut);
  const shake = t > 57.42 && t < 57.9 ? Math.sin(t * 90) * 10 * (1 - prog(t, 57.42, 57.9)) : 0;
  return (
    <Out end={59.55}>
      <HiLine words={['Milieux', 'sensibles']} mark={[0, 1]} at={56.1} y={330} size={70} />
      <Abs x={60} y={450} w={960} h={620} style={{background: 'linear-gradient(135deg, #EAF4FB, #FFFFFF 60%, #DCEBF6)', border: `6px solid ${INK}`, borderRadius: 26, boxShadow: `9px 9px 0 ${RED}`, overflow: 'hidden', opacity: pop(t, 56.2), transform: `translateX(${shake}px)`}}>
        <div style={{position: 'absolute', left: 18, top: 14}}><Mono at={56.3} c={RED} size={22}>faille sanitaire</Mono></div>
        <svg width={960} height={620} style={{position: 'absolute', left: 0, top: 0}}>
          {CRACKS.map((d, k) => <path key={k} d={d} fill="none" stroke={INK} strokeWidth={4} strokeDasharray={400} strokeDashoffset={400 * (1 - cr)} />)}
        </svg>
        {[0, 1, 2, 3, 4].map((k) => {const a = 57.6 + k * 0.15; const q = prog(t, a, a + 1.2, easeOut); return t > a ? <div key={k} style={{position: 'absolute', left: 440 + Math.cos(k * 1.3) * 300 * q, top: 260 + Math.sin(k * 1.3) * 220 * q, opacity: 1 - q * 0.3}}><F n="microbe" size={70} /></div> : null;})}
      </Abs>
      <AbsoluteFill style={{background: RED, opacity: t > 57.42 ? 0.12 * Math.abs(Math.sin(t * 6)) * (1 - prog(t, 58.5, 59.4)) : 0, pointerEvents: 'none'}} />
      <Stamp at={57.6} c={RED} text="conséquences dramatiques" x={70} y={1140} rot={-4} size={42} />
    </Out>
  );
};

/* ═════════════ UNE MISSION COMMUNE ═════════════ */
const Mission: React.FC = () => {
  const t = useT();
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={['Une', 'mission', 'commune']} mark={[1, 2]} at={61.2} y={330} size={66} />
      <SearchOpen x={60} y={440} w={960} h={960} at={61.2} query="sigle selon mon secteur" results={['QSE · BTP et industrie lourde', 'La mission reste identique', 'QHSE · agroalimentaire, chimie, santé']} found={1} foundAt={63.1} clickAt={63.5} c={VIO}>
        <div style={{display: 'flex', justifyContent: 'center', gap: 12, marginTop: 30}}>{ROWS.map((r, k) => <div key={r} style={{display: 'flex', gap: 6, opacity: pop(t, 64.2 + k * 0.1)}}>{r.split('').map((c, j) => <LT key={j} ch={c} size={62} />)}</div>)}</div>
        <div style={{textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 28, color: VIO, marginTop: 20, opacity: pop(t, 64.6)}}>= une seule mission</div>
        <div style={{position: 'absolute', left: 40, right: 40, top: 260, display: 'flex', flexDirection: 'column', gap: 20}}>
          <Check at={65.58} label="maîtriser les dangers" c={RED} size={34} />
          <Check at={66.74} label="un environnement de travail sûr" c={GREEN} size={32} />
          <Check at={68.98} label="… et responsable" c={VIO} size={34} />
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 40, display: 'flex', justifyContent: 'center'}}>{t > 68.8 && <Board text="QHSE" at={68.9} h={110} c={GREEN} stag={0.05} />}</div>
      </SearchOpen>
      {t > ALLDONE && <Dust n={22} c={GOLD} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.05, 4, 0.09, 'sfx/ding', 0.12), {at: x.at + 0.25, s: 'soft-whoosh', v: 0.45, dur: 0.8}, {at: x.at + 0.48, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.45, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: at + 0.35 + len * 0.05, s: 'sfx/pop', v: 0.25}, ...rep(at + 0.8 + len * 0.05, 3, 0.12, 'sfx/pop', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.slice(1).flatMap(trans), ...SECT.map((x) => ({at: x.at + 0.8, s: 'validation', v: 0.18})), {at: ALLDONE, s: 'validation', v: 0.35},
  ...[2.75, 2.9, 3.05].map((a) => ({at: a, s: 'sfx/swish', v: 0.25})), {at: 5.6, s: 'tension', v: 0.2, dur: 1.3}, {at: 6.7, s: 'sfx/pop', v: 0.22}, {at: 7.4, s: 'soft-whoosh', v: 0.3},
  {at: 9.06, s: 'sfx/swish', v: 0.35}, {at: 9.8, s: 'sfx/thud', v: 0.35}, {at: 11.8, s: 'sfx/ding', v: 0.25}, {at: 14.3, s: 'sfx/rise', v: 0.25, dur: 1.3}, ...[14.3, 14.55, 14.8, 15.05].map((a) => ({at: a, s: 'sfx/pop', v: 0.15})),
  {at: 17.7, s: 'sfx/pop', v: 0.25}, {at: 18.8, s: 'sfx/pop', v: 0.22}, {at: 20.6, s: 'soft-whoosh', v: 0.35, dur: 1}, {at: 21.5, s: 'deep-hit', v: 0.35}, {at: 23.0, s: 'page', v: 0.35}, {at: 23.9, s: 'sfx/pop', v: 0.2}, {at: 24.62, s: 'sfx/pop', v: 0.2}, {at: 26.6, s: 'tampon', v: 0.6}, {at: 26.62, s: 'bass-hit', v: 0.3},
  {at: 30.0, s: 'sfx/pop', v: 0.25}, {at: 32.0, s: 'sfx/swish', v: 0.4}, {at: 32.1, s: 'stylo', v: 0.3}, {at: 33.6, s: 'sfx/pop', v: 0.2}, {at: 34.8, s: 'sfx/thud', v: 0.3}, {at: 40.3, s: 'sfx/pop', v: 0.22}, {at: 41.7, s: 'sfx/pop', v: 0.22},
  ...[45.2, 45.35, 45.5, 45.65].map((a) => ({at: a, s: 'sfx/thud', v: 0.25})), {at: 47.9, s: 'sfx/rise', v: 0.3, dur: 1}, {at: 48.9, s: 'validation', v: 0.3}, ...[51.62, 52.66, 53.42].map((a) => ({at: a, s: 'sfx/pop', v: 0.22})),
  {at: 56.2, s: 'sfx/whoosh', v: 0.25}, {at: 57.3, s: 'deep-hit', v: 0.6}, {at: 57.32, s: 'sfx/thud', v: 0.5}, {at: 57.42, s: 'alarme', v: 0.1, dur: 1.4}, {at: 57.6, s: 'tampon', v: 0.55},
  ...searchCues(61.2, 23, 63.1, 63.5), ...[65.58, 66.74, 68.98].map((a) => ({at: a + 0.25, s: 'sfx/ding', v: 0.22})), ...flaps(68.9, 8),
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Qhse2: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={16.0}><Intro /></Gate>
    <Gate from={17.5} to={28.3}><ZQse /></Gate>
    <Gate from={29.8} to={43.4}><ZHse /></Gate>
    <Gate from={44.9} to={54.5}><ZQhse /></Gate>
    <Gate from={56.0} to={59.6}><Sensibles /></Gate>
    <Gate from={61.1} to={OUTRO_AT}><Mission /></Gate>
    {SECT.slice(1).map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 1.8}><GyroF i={i + 1} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={70.1}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-off-qse-qhse.m4a')} trimAfter={s(70.2)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Gyro, Count, Kin, Brut, NIGHT, T, TitleBlock, Deep, Tile, TEAL, YEL, GLASS, Win];
