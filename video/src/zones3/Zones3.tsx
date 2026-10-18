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
 * « Accident du travail : les 3 zones » (53 s) — capsule « condensé + effet wahou » : voix d'origine, sous-titres
 * recalés mot à mot, photos réelles, thème « papier quadrillé ».
 * Fil rouge : LE TUBE PNEUMATIQUE À SIX GUICHETS (accident → travail → trajet → vie courante → distinguer → QHSE),
 * adaptés aux parties réellement présentes ; la capsule du dossier file d'un guichet à l'autre, chaque guichet passé
 * se coche.
 * Transition : LE GYROPHARE, en version accélérée (1,7 s) vu la brièveté de la capsule.
 * Effets « wahou » : radar qui balaie trois zones, périmètre en pointillés qui se trace autour du lieu de travail,
 * voiture qui roule sur l'itinéraire avec détour barré, barre de recherche qui trouve puis OUVRE les détours admis,
 * interrupteur « accident du travail ? » bloqué, cibles concentriques des trois zones, loupe sur le rapport d'analyse.
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
const OUTRO_AT = 53.6;
export const ZONES3_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 2.7, n: '1', title: 'Dans quelle zone ?', s: 'un accident, trois zones', c: NAVY, g: 'accident', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 4.85, n: '2', title: 'Zone 1 : le lieu de travail', s: 'entreprise · chantier · client', c: BLUE, g: 'travail', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 17.35, n: '3', title: 'Zone 2 : le trajet', s: 'domicile ↔ entreprise', c: ORANGE, g: 'trajet', k: 'gyro', lab: 'PARTIE 3 / 6'},
  {at: 34.35, n: '4', title: 'Zone 3 : la vie courante', s: 'droit commun', c: VIO, g: 'vie courante', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 42.9, n: '5', title: 'Bien distinguer', s: 'travail · trajet · autres', c: RED, g: 'distinguer', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 48.85, n: '6', title: 'L’enjeu QHSE', s: 'analyser correctement', c: GREEN, g: 'QHSE', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 52.3;

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

const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('zones/accident-voiture.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 900, objectFit: 'cover', objectPosition: '50% 50%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 32%, ${PAPER}DD 42%, ${PAPER} 47%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={720} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>ACCIDENT DU TRAVAIL</div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 92, color: INK, marginTop: 12}}>les</div>
        <div style={{marginTop: 6}}><Board text="3 ZONES" at={-1} h={120} c={ORANGE} stag={0.03} /></div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 84, color: RED, marginTop: 14}}>à distinguer</div>
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

/* ═════════════ INTRO : DANS QUELLE ZONE ? ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const sweep = (t - 2.6) * 220;
  const Z = [{x: 330, y: 330, c: BLUE, a: 3.2}, {x: 600, y: 230, c: ORANGE, a: 3.5}, {x: 560, y: 520, c: VIO, a: 3.8}];
  return (
    <Out end={4.85}>
      <HiLine words={['Dans', 'quelle', 'zone', '?']} mark={[2]} at={2.65} y={330} size={66} />
      <Abs x={140} y={450} w={800} h={800} style={{opacity: pop(t, 2.7), transform: `scale(${0.8 + 0.2 * pop(t, 2.7)})`}}>
        <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: '#fff', border: `6px solid ${INK}`, boxShadow: `10px 10px 0 ${NAVY}`, overflow: 'hidden'}}>
          {[0.25, 0.5, 0.75].map((r) => <div key={r} style={{position: 'absolute', left: `${50 - r * 50}%`, top: `${50 - r * 50}%`, width: `${r * 100}%`, height: `${r * 100}%`, borderRadius: '50%', border: `3px dashed #C9D2DF`}} />)}
          <div style={{position: 'absolute', inset: 0, background: `conic-gradient(from ${sweep}deg, ${GREEN}66 0deg, transparent 50deg)`}} />
          {Z.map((z, k) => <div key={k} style={{position: 'absolute', left: z.x - 50, top: z.y - 50, width: 100, height: 100, borderRadius: 50, background: z.c, border: `5px solid ${INK}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, z.a), transform: `scale(${pop(t, z.a) * (1 + 0.08 * Math.sin(t * 8 + k))})`, boxShadow: `0 0 ${20 + 15 * Math.sin(t * 6 + k)}px ${z.c}`}}>?</div>)}
        </div>
      </Abs>
    </Out>
  );
};

/* ═════════════ ZONE 1 : LE LIEU DE TRAVAIL ═════════════ */
const Photo: React.FC<{src: string; x: number; y: number; w: number; h: number; at: number; label: string; c: string; rot?: number; ic?: string}> = ({src, x, y, w, h, at, label, c, rot = 0, ic}) => {
  const t = useT();
  const p = Math.max(0, Math.min(1, spring(t, at, 8, 12)));
  return (
    <Abs x={x} y={y} w={w} h={h} style={{opacity: t >= at ? 1 : 0, transform: `rotate(${rot}deg) scale(${0.6 + 0.4 * p})`, background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${c}`, overflow: 'hidden'}}>
      {ic ? <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: h - 60}}><F n={ic} size={Math.min(w, h) * 0.5} /></div> : <Img src={PH(src)} style={{width: '100%', height: h - 60, objectFit: 'cover'}} />}
      <div style={{height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK}}>{label}</div>
    </Abs>
  );
};
const Z1: React.FC = () => {
  const t = useT();
  const per = prog(t, 12.0, 13.4, easeInOut);
  const P = 2 * (900 + 760);
  return (
    <Out end={17.4}>
      <HiLine words={['Le', 'lieu', 'de', 'travail']} mark={[1, 2, 3]} at={6.6} y={330} size={66} />
      <Abs x={60} y={440} w={960} h={900}>
        <svg width={960} height={900} style={{position: 'absolute', left: 0, top: 0}}>
          {[[240, 200], [720, 200], [480, 700]].map(([x2, y2], k) => <line key={k} x1={480} y1={430} x2={x2} y2={y2} stroke={BLUE} strokeWidth={6} strokeDasharray="14 12" opacity={pop(t, [10.26, 11.14, 11.7][k])} />)}
          <rect x={30} y={40} width={900} height={760} rx={50} fill={per > 0 ? `${BLUE}0D` : 'none'} stroke={BLUE} strokeWidth={8} strokeDasharray={`${P * per} ${P}`} />
          {per >= 1 && <rect x={30} y={40} width={900} height={760} rx={50} fill="none" stroke={BLUE} strokeWidth={8} strokeDasharray="24 18" strokeDashoffset={-t * 60} opacity={0.6} />}
        </svg>
      </Abs>
      <Photo src="zones/chantier.jpg" x={110} y={500} w={360} h={270} at={10.26} label="chantier" c={ORANGE} rot={-3} />
      <Photo src="zones/client.jpg" x={610} y={500} w={360} h={270} at={11.14} label="client" c={VIO} rot={3} />
      <Photo src="zones/entrepot.jpg" x={330} y={760} w={420} h={300} at={9.06} label="entreprise" c={BLUE} />
      <Photo src="" ic="camion" x={400} y={1080} w={280} h={230} at={11.7} label="fournisseur" c={TEAL} />
      <Stamp at={15.6} c={BLUE} text="accident du travail" x={150} y={1360} rot={-5} size={58} />
    </Out>
  );
};

/* ═════════════ ZONE 2 : LE TRAJET ═════════════ */
const Z2: React.FC = () => {
  const t = useT();
  const phase2 = t >= 25.9;
  const road = prog(t, 21.82, 22.8, easeInOut);
  const car = prog(t, 22.6, 24.0, easeInOut);
  const det = prog(t, 24.3, 24.9, easeOut);
  return (
    <Out end={34.4}>
      <HiLine words={phase2 ? ['Les', 'détours', 'admis'] : ['L’accident', 'de', 'trajet']} mark={phase2 ? [1, 2] : [0, 1, 2]} at={phase2 ? 26.0 : 19.1} y={330} size={64} />
      {!phase2 && (
        <>
          <Deep src="zones/accident-voiture.jpg" x={60} y={440} w={960} h={340} at={19.2} pos="50% 50%" />
          <Abs x={60} y={830} w={960} h={560} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `8px 8px 0 ${ORANGE}`, opacity: pop(t, 20.0), overflow: 'hidden'}}>
            <div style={{position: 'absolute', left: 16, top: 12}}><Mono at={20.2} c={ORANGE} size={22}>trajet normal</Mono></div>
            <svg width={960} height={560} style={{position: 'absolute', left: 0, top: 0}}>
              <path d="M170 300 C 380 160, 580 440, 790 300" fill="none" stroke="#3A4356" strokeWidth={36} strokeLinecap="round" strokeDasharray={900} strokeDashoffset={900 * (1 - road)} />
              <path d="M170 300 C 380 160, 580 440, 790 300" fill="none" stroke={YEL} strokeWidth={5} strokeDasharray="22 22" opacity={road} />
              <path d="M480 300 C 520 420, 600 480, 720 500" fill="none" stroke={RED} strokeWidth={18} strokeLinecap="round" strokeDasharray={340} strokeDashoffset={340 * (1 - det)} opacity={0.85} />
            </svg>
            <div style={{position: 'absolute', left: 70, top: 200, textAlign: 'center', opacity: pop(t, 21.82)}}><F n="maison" size={130} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>domicile</div></div>
            <div style={{position: 'absolute', left: 720, top: 200, textAlign: 'center', opacity: pop(t, 22.4)}}><F n="batiment" size={130} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>entreprise</div></div>
            {t > 22.6 && <div style={{position: 'absolute', left: lerp(190, 700, car), top: 240 + Math.sin(car * Math.PI * 2) * -50, transform: `rotate(${Math.cos(car * Math.PI * 2) * -14}deg)`}}><F n="voiture" size={90} /></div>}
            <div style={{position: 'absolute', left: 640, top: 440, fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: RED, opacity: pop(t, 24.8), transform: `scale(${pop(t, 24.8)})`}}>✗</div>
            <div style={{position: 'absolute', left: 300, top: 480, opacity: pop(t, 24.5)}}><span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: RED}}>détour injustifié<Strike p={prog(t, 24.9, 25.3)} c={RED} /></span></div>
          </Abs>
        </>
      )}
      {phase2 && (
        <SearchOpen x={60} y={440} w={960} h={960} at={26.0} query="détour vie quotidienne" results={['Détour pour convenance personnelle', 'Détours de la vie quotidienne', 'Trajet professionnel en mission']} found={1} foundAt={28.0} clickAt={28.5} c={ORANGE}>
          <div style={{display: 'flex', gap: 24, padding: '30px 30px 0'}}>
            {[{ic: 'enfants', l: 'déposer ses enfants', a: 30.4}, {ic: 'baguette', l: 'un achat courant', a: 31.9}].map((x) => (
              <div key={x.l} style={{flex: 1, height: 300, border: `5px solid ${INK}`, borderRadius: 22, background: '#fff', boxShadow: `7px 7px 0 ${GREEN}`, opacity: pop(t, x.a), transform: `translateY(${(1 - pop(t, x.a)) * 40}px)`, position: 'relative'}}>
                <IcoLab ic={x.ic} l={x.l} size={120} fs={30} />
                <div style={{position: 'absolute', right: 14, top: 10, width: 54, height: 54, borderRadius: 12, background: GREEN, color: '#fff', fontWeight: 900, fontSize: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, x.a + 0.5)}}>✓</div>
              </div>
            ))}
          </div>
          <div style={{position: 'absolute', left: 30, right: 30, top: 380, height: 420, borderRadius: 22, border: `5px solid ${INK}`, overflow: 'hidden', opacity: pop(t, 32.9), boxShadow: `7px 7px 0 ${ORANGE}`}}>
            <Img src={PH('zones/boulangerie.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.12 - 0.08 * prog(t, 32.9, 34.3)})`}} />
            <div style={{position: 'absolute', left: 20, bottom: 20}}><Pill at={33.3} c={ORANGE} size={30}>par exemple : la boulangerie</Pill></div>
          </div>
        </SearchOpen>
      )}
    </Out>
  );
};

/* ═════════════ ZONE 3 : LA VIE COURANTE ═════════════ */
const Z3: React.FC = () => {
  const t = useT();
  const flick = t > 39.0 ? Math.sin(t * 30) * 6 * (1 - prog(t, 39.0, 40.2)) : 0;
  return (
    <Out end={42.95}>
      <HiLine words={['La', 'vie', 'courante']} mark={[1, 2]} at={36.1} y={330} size={66} />
      <Card x={60} y={450} w={460} h={330} at={36.4} c={VIO}><IcoLab ic="canape" l="vie courante" size={130} fs={34} /></Card>
      <Card x={560} y={450} w={460} h={330} at={37.78} c={NAVY}><IcoLab ic="balance" l="droit commun" size={130} fs={34} /></Card>
      <Abs x={160} y={850} w={760} h={330} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 30, boxShadow: `8px 8px 0 ${RED}`, opacity: pop(t, 38.8)}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 24, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 26, color: DIM}}>accident du travail ?</div>
        <div style={{position: 'absolute', left: 130, top: 110, width: 500, height: 150, borderRadius: 75, background: '#E3E8EF', border: `5px solid ${INK}`}}>
          <div style={{position: 'absolute', left: 175 + flick, top: 10, width: 130, height: 120, borderRadius: 60, background: `radial-gradient(circle at 35% 30%, #fff, ${DIM})`, border: `5px solid ${INK}`}} />
          <div style={{position: 'absolute', left: 30, top: 48, fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: GREEN}}>oui</div>
          <div style={{position: 'absolute', right: 30, top: 48, fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: RED}}>non</div>
        </div>
      </Abs>
      <Stamp at={39.4} c={RED} text="pas automatique" x={190} y={1230} rot={-6} size={62} />
    </Out>
  );
};

/* ═════════════ BIEN DISTINGUER ═════════════ */
const Distinguer: React.FC = () => {
  const t = useT();
  const R3 = [{l: 'lieu de travail', c: BLUE, a: 44.2, r: 170}, {l: 'trajet', c: ORANGE, a: 46.18, r: 290}, {l: 'autres déplacements', c: VIO, a: 46.9, r: 410}];
  return (
    <Out end={48.9}>
      <HiLine words={['Bien', 'distinguer']} mark={[1]} at={44.6} y={330} size={70} />
      <Abs x={0} y={440} w={1080} h={900}>
        {[...R3].reverse().map((z) => {
          const on = pop(t, z.a);
          return <div key={z.l} style={{position: 'absolute', left: 540 - z.r, top: 450 - z.r, width: z.r * 2, height: z.r * 2, borderRadius: '50%', background: on > 0 ? `${z.c}22` : 'transparent', border: `8px solid ${on > 0 ? z.c : '#C9D2DF'}`, boxShadow: on > 0 ? `0 0 ${30 * on + 10 * Math.sin(t * 5)}px ${z.c}88` : 'none', transform: `scale(${0.85 + 0.15 * on})`}} />;
        })}
        {R3.map((z, k) => <div key={`l${z.l}`} style={{position: 'absolute', left: 0, right: 0, top: 450 - (k === 0 ? 30 : z.r - 64), textAlign: 'center', opacity: pop(t, z.a)}}><span style={{display: 'inline-block', background: z.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 34, padding: '6px 18px', borderRadius: 10}}>{z.l}</span></div>)}
      </Abs>
    </Out>
  );
};

/* ═════════════ L'ENJEU QHSE ═════════════ */
const Qhse: React.FC = () => {
  const t = useT();
  const lens = prog(t, 51.2, 52.6, easeInOut);
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={['Analyser', 'correctement']} mark={[0, 1]} at={50.6} y={330} size={66} />
      <Win x={100} y={450} w={880} h={600} at={50.6} title="analyse d’accident · QHSE" c={GREEN}>
        <div style={{padding: 30, display: 'flex', flexDirection: 'column', gap: 18}}>
          {[{l: 'lieu de travail', c: BLUE}, {l: 'trajet', c: ORANGE}, {l: 'autres déplacements', c: VIO}].map((z, k) => <Check key={z.l} at={51.0 + k * 0.35} label={`zone vérifiée : ${z.l}`} c={z.c} size={28} />)}
        </div>
        {lens > 0 && lens < 1 && (
          <div style={{position: 'absolute', left: lerp(40, 620, lens), top: 40 + lens * 200, width: 200, height: 200, borderRadius: '50%', border: `10px solid ${INK}`, background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.6), rgba(191,215,234,0.35) 60%)'}}>
            <div style={{position: 'absolute', right: -60, bottom: -40, width: 100, height: 28, background: INK, borderRadius: 14, transform: 'rotate(40deg)'}} />
          </div>
        )}
      </Win>
      {t > 51.1 && <Abs x={0} y={1120} w={1080}><Board text="QHSE" at={51.14} h={120} c={GREEN} stag={0.05} /></Abs>}
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
  {at: 2.7, s: 'sfx/rise', v: 0.2, dur: 2}, ...[3.2, 3.5, 3.8].map((a) => ({at: a, s: 'notification', v: 0.2})),
  ...[9.06, 10.26, 11.14, 11.7].map((a) => ({at: a, s: 'sfx/pop', v: 0.25})), {at: 12.0, s: 'stylo', v: 0.35}, {at: 15.6, s: 'tampon', v: 0.6}, {at: 15.62, s: 'bass-hit', v: 0.3},
  {at: 19.2, s: 'sfx/whoosh', v: 0.25}, {at: 21.82, s: 'sfx/pop', v: 0.22}, {at: 22.4, s: 'sfx/pop', v: 0.22}, {at: 22.6, s: 'soft-whoosh', v: 0.35, dur: 1.4}, {at: 24.3, s: 'sfx/swish', v: 0.3}, {at: 24.8, s: 'alarme', v: 0.06, dur: 0.6}, {at: 24.9, s: 'stylo', v: 0.3},
  ...searchCues(26.0, 22, 28.0, 28.5), {at: 30.4, s: 'sfx/pop', v: 0.25}, {at: 30.9, s: 'sfx/ding', v: 0.22}, {at: 31.9, s: 'sfx/pop', v: 0.25}, {at: 32.4, s: 'sfx/ding', v: 0.22}, {at: 32.9, s: 'soft-whoosh', v: 0.3},
  {at: 36.4, s: 'sfx/pop', v: 0.22}, {at: 37.78, s: 'sfx/pop', v: 0.22}, {at: 38.8, s: 'sfx/thud', v: 0.3}, ...rep(39.0, 8, 0.12, 'sfx/click', 0.15), {at: 39.4, s: 'tampon', v: 0.6}, {at: 39.42, s: 'deep-hit', v: 0.35},
  {at: 44.2, s: 'sfx/rise', v: 0.2, dur: 0.6}, {at: 46.18, s: 'sfx/rise', v: 0.2, dur: 0.6}, {at: 46.9, s: 'sfx/rise', v: 0.2, dur: 0.6},
  {at: 50.6, s: 'sfx/whoosh', v: 0.25}, ...[51.0, 51.35, 51.7].map((a) => ({at: a + 0.25, s: 'sfx/ding', v: 0.22})), ...flaps(51.14, 8), {at: 51.2, s: 'soft-whoosh', v: 0.3, dur: 1.4},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Zones3: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={4.9}><Intro /></Gate>
    <Gate from={6.4} to={17.45}><Z1 /></Gate>
    <Gate from={18.9} to={34.45}><Z2 /></Gate>
    <Gate from={35.9} to={43.0}><Z3 /></Gate>
    <Gate from={44.45} to={48.95}><Distinguer /></Gate>
    <Gate from={50.4} to={OUTRO_AT}><Qhse /></Gate>
    {SECT.slice(1).map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 1.8}><GyroF i={i + 1} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={53.5}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-off-sst.m4a')} trimAfter={s(53.6)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Gyro, Count, Kin, Brut, NIGHT, T, TitleBlock, Blinds, random, Tile, BURG, GLASS, TEAL];
