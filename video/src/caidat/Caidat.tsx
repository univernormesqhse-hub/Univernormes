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
 * « Le caïdat : quand les règles officieuses prennent le dessus » (5 min 16) — capsule « condensé + effet wahou +
 * ultra premium » : voix d'origine (sans musique de fond), sous-titres calés mot à mot, photos réelles, thème « papier
 * quadrillé ».
 * Fil rouge : LE TUBE PNEUMATIQUE À SIX GUICHETS (chiffres → caïdat → rôles → silence → armes → frontière), adaptés aux
 * parties réellement présentes ; la capsule du dossier file d'un guichet à l'autre, chaque guichet passé se coche.
 * Transition : LE GYROPHARE à chaque partie.
 * Ultra premium : reflets lumineux, cartes en verre dépoli pivotant en 3D, ombre géante du manager sur le règlement,
 * vortex qui aspire les règles officielles, jauge circulaire 23 %, une personne sur quatre, engrenages de la logique
 * implacable, clan en anneau-bouclier, mur du silence qui se construit brique par brique, barre de recherche qui
 * trouve puis OUVRE l'alerte « sans suite », outils qui se retournent en armes, fils de marionnette, loupe sur
 * l'intention, clé dorée.
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
const OUTRO_AT = 316.4;
export const CAIDAT_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 49.5, n: '1', title: 'L’ampleur du problème', s: 'une personne sur quatre', c: RED, g: 'chiffres', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 78.1, n: '2', title: 'Le caïdat', s: 'un système parallèle', c: NAVY, g: 'caïdat', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 136.3, n: '3', title: 'Les rôles et le clan', s: 'soutiens · bénéficiaires · victimes', c: VIO, g: 'rôles', k: 'gyro', lab: 'PARTIE 3 / 6'},
  {at: 187.8, n: '4', title: 'Le mur du silence', s: 'pourquoi personne ne parle', c: ORANGE, g: 'silence', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 244.7, n: '5', title: 'Des outils détournés', s: 'le processus abusif', c: BURG, g: 'armes', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 289.9, n: '6', title: 'La frontière', s: 'tout est dans l’intention', c: GREEN, g: 'frontière', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 314.2;

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

const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('iso26/direction-equipe.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 900, objectFit: 'cover', objectPosition: '50% 40%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 32%, ${PAPER}DD 42%, ${PAPER} 47%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={700} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>MANAGEMENT TOXIQUE</div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 88, color: INK, marginTop: 10}}>le</div>
        <div style={{display: 'flex', justifyContent: 'center', gap: 10}}>{'CAÏDAT'.split('').map((c, i) => <Tile key={i} ch={c} size={140} c={BURG} />)}</div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 52, color: RED, marginTop: 18}}>quand les règles officieuses<br />prennent le dessus</div>
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

/* ═════════════ INTRO ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const ph = t < 14.0 ? 0 : t < 27.0 ? 1 : 2;
  const shadow = prog(t, 5.2, 7.2, easeInOut);
  const vort = prog(t, 38.0, 41.5, easeIn);
  return (
    <Out end={49.55}>
      <HiLine words={ph === 0 ? ['Un', 'management', 'toxique'] : ph === 1 ? ['Le', 'grand', 'décalage'] : ['Dans', 'le', 'vide']} mark={ph === 0 ? [1, 2] : ph === 1 ? [2] : [2]} at={[2.7, 14.1, 27.1][ph]} y={330} size={64} />
      {ph === 0 && (
        <Abs x={60} y={450} w={960} h={900} style={{opacity: pop(t, 2.8)}}>
          <div style={{position: 'absolute', left: 120, top: 520, width: 720, height: 320, background: `radial-gradient(ellipse at 30% 0%, rgba(20,26,38,${0.75 * shadow}), transparent 70%)`, transform: `skewX(-30deg) scaleY(${0.4 + 0.6 * shadow})`, transformOrigin: '30% 0%'}} />
          <div style={{position: 'absolute', left: 120, top: 260}}><F n="directeur" size={260} /></div>
          <GlassCard x={520} y={420} w={380} h={330} at={6.2} c={BLUE}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 34, gap: 12, filter: `brightness(${1 - shadow * 0.45})`}}><F n="livres" size={130} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, textAlign: 'center'}}>règlements officiels</div></div>
          </GlassCard>
          <div style={{position: 'absolute', left: 0, right: 0, top: 30, display: 'flex', justifyContent: 'center', gap: 16}}><Pill at={4.6} c={BURG} size={32}>insidieux</Pill><Pill at={10.0} c={NAVY} size={32}>système organisé</Pill><Pill at={13.1} c={DIM} size={32}>invisible</Pill></div>
        </Abs>
      )}
      {ph === 1 && (
        <>
          <GlassCard x={60} y={460} w={460} h={560} at={18.4} c={BLUE}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 50, gap: 16, textAlign: 'center'}}><F n="parchemin" size={150} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34}}>règlement intérieur</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>écrit noir sur blanc</div></div>
          </GlassCard>
          <Abs x={560} y={460} w={460} h={560} style={{border: `5px dashed ${BURG}`, borderRadius: 26, background: `${NIGHT}0D`, opacity: pop(t, 22.6)}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 50, gap: 16, textAlign: 'center'}}><div style={{filter: `drop-shadow(0 0 ${20 + 12 * Math.sin(t * 4)}px ${GOLD})`, opacity: pop(t, 23.5)}}><F n="couronne" size={150} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: BURG}}>les vraies règles</div><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 40, color: BURG, opacity: pop(t, 24.2)}}>…ailleurs</div></div>
          </Abs>
          <svg width={1080} height={200} style={{position: 'absolute', left: 0, top: 1040}}><path d="M300 40 Q 540 180 780 40" fill="none" stroke={RED} strokeWidth={8} strokeDasharray="20 14" opacity={pop(t, 16.9)} /></svg>
          <Abs x={0} y={1160} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: RED, opacity: pop(t, 16.9)}}>un décalage énorme</Abs>
        </>
      )}
      {ph === 2 && (
        <Abs x={60} y={450} w={960} h={900}>
          <div style={{position: 'absolute', left: 280, top: 230, width: 400, height: 400, borderRadius: '50%', background: `conic-gradient(from ${t * 200}deg, ${NIGHT}, ${BURG}, ${NIGHT}, ${NAVY}, ${NIGHT})`, opacity: pop(t, 35.7), filter: 'blur(2px)', boxShadow: `0 0 60px ${BURG}88`}} />
          {[{l: 'procédures', ic: 'clipboard'}, {l: 'règles', ic: 'livres'}, {l: 'valeurs', ic: 'balance'}, {l: 'recours', ic: 'juge'}].map((x, k) => {
            const a0 = (k / 4) * Math.PI * 2 + vort * 6;
            const r = lerp(380, 0, vort);
            return <div key={x.l} style={{position: 'absolute', left: 480 + Math.cos(a0) * r - 90, top: 430 + Math.sin(a0) * r * 0.9 - 70, width: 180, textAlign: 'center', opacity: pop(t, 33.6 + k * 0.2) * (1 - prog(t, 40.5, 41.6)), transform: `scale(${1 - vort * 0.8}) rotate(${vort * 360}deg)`}}><div style={{background: '#fff', border: `4px solid ${INK}`, borderRadius: 18, padding: 10}}><F n={x.ic} size={70} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22}}>{x.l}</div></div></div>;
          })}
          <div style={{position: 'absolute', left: 0, right: 0, top: 30, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={33.5} c={RED} size={30}>crise</Pill><Pill at={34.7} c={ORANGE} size={30}>grandes tensions</Pill></div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 720, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: BURG, opacity: pop(t, 43.7)}}>un système informel prend le dessus</div>
        </Abs>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 1 : LES CHIFFRES ═════════════ */
const Chiffres: React.FC = () => {
  const t = useT();
  const ring = prog(t, 54.0, 55.4, easeOut) * 0.23;
  const tri = prog(t, 69.2, 70.4, easeOut);
  return (
    <Out end={78.15}>
      <HiLine words={['L’ampleur', 'du', 'problème']} mark={[0]} at={53.0} y={330} size={64} />
      <GlassCard x={60} y={450} w={960} h={560} at={53.1} c={RED}>
        <div style={{position: 'absolute', left: 30, top: 24, display: 'flex', gap: 12}}><Pill at={51.4} c={NAVY} size={26}>étude européenne</Pill><Pill at={52.3} c={BLUE} size={26}>2019</Pill></div>
        <svg width={420} height={420} style={{position: 'absolute', left: 40, top: 110}}>
          <circle cx={210} cy={210} r={170} fill="none" stroke="#E3E8EF" strokeWidth={46} />
          <circle cx={210} cy={210} r={170} fill="none" stroke={RED} strokeWidth={46} strokeDasharray={`${2 * Math.PI * 170 * ring} 2000`} transform="rotate(-90 210 210)" strokeLinecap="round" />
          <text x={210} y={240} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={96} fill={INK}>{Math.round(ring * 100)} %</text>
        </svg>
        <div style={{position: 'absolute', left: 480, top: 140, width: 440}}>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK}}>des salariés dans un management toxique</div>
          <div style={{display: 'flex', gap: 14, marginTop: 40}}>{[0, 1, 2, 3].map((k) => <div key={k} style={{opacity: pop(t, 59.1 + k * 0.2), filter: k === 0 ? `drop-shadow(0 0 16px ${RED})` : 'grayscale(1)', transform: `scale(${k === 0 && t > 60.7 ? 1.15 : 1})`}}><F n={k === 0 ? 'anxieux' : 'salarie'} size={90} /></div>)}</div>
          <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 48, color: RED, marginTop: 14, opacity: pop(t, 60.7)}}>une personne sur quatre</div>
        </div>
        <Shine at={55.4} dur={1.1} />
      </GlassCard>
      <GlassCard x={60} y={1050} w={960} h={400} at={67.4} c={VIO}>
        <div style={{position: 'absolute', left: 30, top: 24}}><Mono at={67.6} c={VIO} size={22}>risque de dépression</Mono></div>
        <div style={{position: 'absolute', left: 60, bottom: 50, display: 'flex', alignItems: 'flex-end', gap: 30}}>
          <div style={{width: 120, height: 80, background: '#C9D2DF', border: `4px solid ${INK}`, borderRadius: 8}} />
          <div style={{width: 120, height: 80 * (1 + 2 * tri), background: VIO, border: `4px solid ${INK}`, borderRadius: 8}} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 110, color: VIO, opacity: tri}}>×3</div>
        </div>
        <div style={{position: 'absolute', right: 30, bottom: 40}}><Stamp at={75.0} c={RED} text="santé publique" x={0} y={0} rot={-6} size={48} /></div>
      </GlassCard>
    </Out>
  );
};

/* ═════════════ PARTIE 2 : LE CAÏDAT ═════════════ */
const GEARS = [{l: 'pouvoir hyper concentré', a: 118.5, c: RED, x: 80, y: 0}, {l: 'règles tacites', a: 123.06, c: VIO, x: 520, y: 80}, {l: 'décisions arbitraires', a: 128.78, c: ORANGE, x: 80, y: 420}, {l: 'pression constante', a: 132.9, c: BURG, x: 520, y: 500}];
const Gear: React.FC<{size: number; c: string; rot: number}> = ({size, c, rot}) => (
  <svg width={size} height={size} viewBox="-50 -50 100 100" style={{transform: `rotate(${rot}deg)`}}>
    {Array.from({length: 10}, (_, k) => <rect key={k} x={-7} y={-50} width={14} height={18} rx={3} fill={c} stroke={INK} strokeWidth={2.5} transform={`rotate(${k * 36})`} />)}
    <circle r={36} fill={c} stroke={INK} strokeWidth={3} /><circle r={12} fill="#fff" stroke={INK} strokeWidth={3} />
  </svg>
);
const Caidat: React.FC = () => {
  const t = useT();
  const ph = t < 99.4 ? 0 : t < 113.5 ? 1 : 2;
  const dice = t > 88.1 ? Math.floor((t - 88.1) * 8) % 6 : 0;
  return (
    <Out end={136.35}>
      <HiLine words={ph === 0 ? ['Le', 'caïdat'] : ph === 1 ? ['Un', 'contraste', 'saisissant'] : ['Une', 'logique', 'implacable']} mark={ph === 0 ? [1] : ph === 1 ? [1, 2] : [2]} at={[81.6, 99.5, 113.6][ph]} y={330} size={66} />
      {ph === 0 && (
        <>
          <Abs x={0} y={450} w={1080}><Board text="CAÏDAT" at={81.7} h={110} c={BURG} stag={0.05} /></Abs>
          <GlassCard x={60} y={620} w={960} h={420} at={84.7} c={BURG}>
            <div style={{position: 'absolute', left: 30, top: 24}}><Mono at={84.9} c={BURG} size={22}>mode de fonctionnement parallèle</Mono></div>
            <div style={{position: 'absolute', left: 60, top: 90, textAlign: 'center'}}><div style={{filter: `drop-shadow(0 0 ${20 + 14 * Math.sin(t * 4)}px ${GOLD})`, transform: `scale(${t > 95.8 ? 1.15 : 1})`}}><F n="couronne" size={150} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>pouvoir personnel</div></div>
            <div style={{position: 'absolute', left: 380, top: 90, textAlign: 'center', opacity: pop(t, 88.1)}}><div style={{transform: `rotate(${dice * 60}deg)`}}><F n="de" size={150} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>décisions arbitraires</div></div>
            <div style={{position: 'absolute', left: 680, top: 100, display: 'flex', flexDirection: 'column', gap: 12}}>{['procédures', 'valeurs'].map((w, k) => <div key={w} style={{background: '#fff', border: `4px solid ${INK}`, borderRadius: 14, padding: '10px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, opacity: pop(t, 91.3 + k * 0.9) * (1 - prog(t, 93.4, 94.4) * 0.6), transform: `translateY(${prog(t, 93.4, 94.4, easeIn) * 80}px) rotate(${prog(t, 93.4, 94.4) * (k ? 12 : -12)}deg)`, filter: `grayscale(${prog(t, 93.4, 94.4)})`}}>{w}</div>)}</div>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 30, textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 48, color: BURG, opacity: pop(t, 95.8)}}>seule compte la volonté d’une personne</div>
          </GlassCard>
        </>
      )}
      {ph === 1 && (
        <>
          <GlassCard x={60} y={460} w={460} h={800} at={99.5} c={BLUE}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30, gap: 14}}><F n="balance" size={130} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: BLUE}}>système officiel</div>{[{l: 'équité', a: 101.5}, {l: 'transparence', a: 103.2}, {l: 'respect des règles', a: 104.1}].map((x) => <Pill key={x.l} at={x.a} c={BLUE} size={28}>{x.l}</Pill>)}</div>
          </GlassCard>
          <Abs x={560} y={460} w={460} h={800} style={{background: `linear-gradient(160deg, ${NIGHT}, #2A1D24)`, border: `4px solid ${INK}`, borderRadius: 26, boxShadow: `0 24px 50px ${BURG}66, 8px 8px 0 ${BURG}`, opacity: pop(t, 106.0), overflow: 'hidden'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30, gap: 14}}><F n="chaine-cassee" size={130} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff'}}>système du caïdat</div>{[{l: 'arbitraire', a: 107.9}, {l: 'peur', a: 109.3}, {l: 'dépendance psychologique', a: 111.3}].map((x) => <Pill key={x.l} at={x.a} c={RED} size={26}>{x.l}</Pill>)}</div>
          </Abs>
          <svg width={80} height={820} style={{position: 'absolute', left: 500, top: 450}}><polyline points="40,0 20,120 55,240 15,380 50,520 22,660 40,820" fill="none" stroke={YEL} strokeWidth={8} strokeDasharray={900} strokeDashoffset={900 * (1 - prog(t, 105.5, 106.3))} /></svg>
        </>
      )}
      {ph === 2 && (
        <Abs x={60} y={450} w={960} h={1000}>
          {GEARS.map((g, k) => (
            <div key={g.l} style={{position: 'absolute', left: g.x, top: g.y, width: 380, textAlign: 'center', opacity: pop(t, g.a), transform: `scale(${0.6 + 0.4 * pop(t, g.a)})`}}>
              <Gear size={300} c={g.c} rot={(t - 113) * (k % 2 ? -40 : 40)} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, marginTop: -6, background: '#fff', border: `4px solid ${INK}`, borderRadius: 14, padding: '6px 10px'}}>{g.l}</div>
            </div>
          ))}
        </Abs>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 3 : LES RÔLES ET LE CLAN ═════════════ */
const Roles: React.FC = () => {
  const t = useT();
  const ph = t < 167.5 ? 0 : 1;
  const bricks = prog(t, 164.9, 166.6);
  const bounce = prog(t, 177.2, 178.2);
  return (
    <Out end={187.85}>
      <HiLine words={ph === 0 ? ['Trois', 'grands', 'rôles'] : ['Le', 'clan']} mark={ph === 0 ? [0, 2] : [1]} at={ph === 0 ? 139.8 : 167.6} y={330} size={66} />
      {ph === 0 && (
        <>
          {[{l: 'les soutiens', s: 'relais actifs du manager', ic: 'megaphone', a: 148.4, c: ORANGE}, {l: 'les bénéficiaires', s: 'promotions · faveurs', ic: 'trophee', a: 152.8, c: GOLD}, {l: 'les victimes', s: 'subissent le système', ic: 'anxieux', a: 159.2, c: RED}].map((x, k) => (
            <GlassCard key={x.l} x={60} y={450 + k * 270} w={960} h={240} at={x.a} c={x.c}>
              <div style={{display: 'flex', alignItems: 'center', gap: 26, padding: '30px 34px'}}><F n={x.ic} size={150} /><div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46}}>{x.l}</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM, marginTop: 6}}>{x.s}</div></div></div>
            </GlassCard>
          ))}
          <Abs x={60} y={1270} w={960} h={200}>
            {Array.from({length: 16}, (_, k) => {const a = k / 16; return bricks > a ? <div key={k} style={{position: 'absolute', left: (k % 8) * 120 + (Math.floor(k / 8) % 2) * 60, bottom: Math.floor(k / 8) * 60, width: 112, height: 54, background: '#B5523B', border: `4px solid ${INK}`, borderRadius: 6, transform: `translateY(${(1 - Math.min(1, (bricks - a) * 8)) * -120}px)`}} /> : null;})}
            <div style={{position: 'absolute', left: 0, right: 0, top: -10, textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 44, color: BURG, opacity: pop(t, 166.2)}}>ils cimentent le système</div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <Abs x={90} y={440} w={900} h={1000}>
          <div style={{position: 'absolute', left: 300, top: 300, width: 300, height: 300, borderRadius: '50%', background: '#fff', border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', filter: `drop-shadow(0 0 30px ${GOLD})`}}><F n="directeur" size={220} /></div>
          <div style={{position: 'absolute', left: 120, top: 120, width: 660, height: 660, borderRadius: '50%', border: `14px solid ${VIO}`, opacity: pop(t, 173.5) * (0.6 + 0.4 * Math.sin(t * 4)), boxShadow: `0 0 50px ${VIO}`}} />
          {Array.from({length: 6}, (_, k) => {const a = (k / 6) * Math.PI * 2 + (t - 167) * 0.25; return <div key={k} style={{position: 'absolute', left: 450 + Math.cos(a) * 330 - 55, top: 450 + Math.sin(a) * 330 - 55, opacity: pop(t, 171.7 + k * 0.1)}}><div style={{width: 110, height: 110, borderRadius: 55, background: '#fff', border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={k % 2 ? 'superviseur' : 'homme-bureau'} size={80} /></div></div>;})}
          {t > 176.8 && <div style={{position: 'absolute', left: lerp(40, 160, Math.min(1, bounce * 2)) - (bounce > 0.5 ? (bounce - 0.5) * 260 : 0), top: 820 - Math.sin(bounce * Math.PI) * 80, transform: `rotate(${bounce > 0.5 ? -40 : 0}deg)`, fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: RED}}>➜</div>}
          <div style={{position: 'absolute', left: 0, right: 0, top: 860, textAlign: 'center'}}><Stamp at={181.5} c={RED} text="contestation risquée" x={150} y={0} rot={-5} size={54} /></div>
          {t > 185.5 && <div style={{position: 'absolute', left: 700, top: 0, fontFamily: sansFont, fontWeight: 900, fontSize: 200, color: ORANGE, transform: `scale(${pop(t, 185.6)}) rotate(12deg)`}}>?</div>}
        </Abs>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 4 : LE MUR DU SILENCE ═════════════ */
const Silence: React.FC = () => {
  const t = useT();
  const ph = t < 211.0 ? 0 : t < 226.0 ? 1 : 2;
  const wall = prog(t, 191.4, 193.6);
  return (
    <Out end={244.75}>
      <HiLine words={ph === 0 ? ['Le', 'mur', 'du', 'silence'] : ph === 1 ? ['Trois', 'raisons'] : ['Les', 'alertes', 'sans', 'suite']} mark={ph === 0 ? [1, 3] : ph === 1 ? [1] : [1, 3]} at={[191.3, 211.1, 226.2][ph]} y={330} size={64} />
      {ph === 0 && (
        <>
          <Abs x={60} y={450} w={960} h={330} style={{overflow: 'hidden'}}>
            {Array.from({length: 24}, (_, k) => {const a = k / 24; return wall > a ? <div key={k} style={{position: 'absolute', left: (k % 8) * 120 + (Math.floor(k / 8) % 2) * 60 - 30, bottom: Math.floor(k / 8) * 100, width: 114, height: 94, background: 'linear-gradient(180deg, #9AA4B5, #6E788B)', border: `4px solid ${INK}`, borderRadius: 8, transform: `translateY(${(1 - Math.min(1, (wall - a) * 10)) * -200}px)`}} /> : null;})}
            {wall >= 1 && <div style={{position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: '#fff', textShadow: `4px 4px 0 ${INK}`}}>SILENCE</div>}
          </Abs>
          <GlassCard x={60} y={820} w={960} h={330} at={195.4} c={ORANGE}>
            <div style={{position: 'absolute', left: 30, top: 24}}><Mono at={195.5} c={ORANGE} size={22}>témoins qui osent signaler</Mono></div>
            <div style={{position: 'absolute', left: 40, right: 40, top: 110, height: 70, borderRadius: 35, background: '#E3E8EF', border: `5px solid ${INK}`, overflow: 'hidden'}}><div style={{width: `${44 * prog(t, 195.5, 197.0, easeOut)}%`, height: '100%', background: ORANGE}} /></div>
            <div style={{position: 'absolute', left: 'calc(50% - 3px)', top: 90, width: 6, height: 110, background: INK}} />
            <div style={{position: 'absolute', left: '50%', top: 205, transform: 'translateX(-50%)', fontFamily: MONO, fontWeight: 700, fontSize: 22}}>la moitié</div>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 24, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: ORANGE, opacity: pop(t, 197.6)}}>moins de la moitié</div>
          </GlassCard>
          <Abs x={60} y={1180} w={960} h={280} style={{opacity: pop(t, 200.9)}}>
            <div style={{position: 'absolute', left: 0, bottom: 0, width: 360, height: 200, background: '#8B6A4A', border: `5px solid ${INK}`, borderRadius: '0 40px 0 0'}}><div style={{position: 'absolute', left: 120, top: -120}}><F n="yeux" size={120} /></div><div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>voir</div></div>
            <div style={{position: 'absolute', right: 0, bottom: 0, width: 360, height: 200, background: '#8B6A4A', border: `5px solid ${INK}`, borderRadius: '40px 0 0 0'}}><div style={{position: 'absolute', left: 120, top: -120}}><F n="megaphone" size={120} /></div><div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>oser en parler</div></div>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 70, textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 48, color: RED}}>le gouffre</div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          {[{l: 'la peur des représailles', ic: 'anxieux', a: 211.5, c: RED}, {l: 'aucune confiance dans les RH et les alertes', ic: 'chaine-cassee', a: 215.5, c: ORANGE}, {l: '« ça ne changera rien »', ic: 'haussement', a: 221.2, c: DIM}].map((x, k) => (
            <GlassCard key={x.l} x={60 + (k % 2) * 60} y={460 + k * 320} w={900} h={280} at={x.a} c={x.c} tilt={k % 2 ? -4 : 4}>
              <div style={{display: 'flex', alignItems: 'center', gap: 26, padding: '40px 34px'}}><Num n={k + 1} c={x.c} size={100} /><F n={x.ic} size={130} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: x.l.length > 30 ? 32 : 40}}>{x.l}</div></div>
            </GlassCard>
          ))}
        </>
      )}
      {ph === 2 && (
        <SearchOpen x={60} y={440} w={960} h={1000} at={226.3} query="suivi de mon alerte" results={['Alerte RH · en attente', 'Alerte management toxique · sans suite', 'Procédure d’alerte interne']} found={1} foundAt={228.6} clickAt={229.2} c={ORANGE}>
          <div style={{position: 'absolute', left: 30, right: 30, top: 30, height: 200, display: 'flex', alignItems: 'center', gap: 20, background: '#FFF5EB', border: `4px solid ${INK}`, borderRadius: 20, padding: 20, boxSizing: 'border-box'}}>
            <F n="enveloppe" size={110} />
            <div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34}}>Statut de l’alerte</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: DIM, marginTop: 8}}>{t < 236.2 ? 'traitement en cours…' : 'clôturée'}</div></div>
          </div>
          <div style={{position: 'absolute', left: 30, right: 30, top: 270}}>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM, marginBottom: 10, opacity: pop(t, 231.6)}}>alertes pour management toxique</div>
            <div style={{height: 70, borderRadius: 35, background: '#E3E8EF', border: `5px solid ${INK}`, overflow: 'hidden', display: 'flex', opacity: pop(t, 231.6)}}><div style={{width: `${56 * prog(t, 231.8, 233.4, easeOut)}%`, height: '100%', background: DIM}} /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: DIM, marginTop: 10, opacity: pop(t, 234.5)}}>plus de la moitié n’aboutissent à rien</div>
          </div>
          <Stamp at={236.3} c={RED} text="sans suite" x={260} y={520} rot={-8} size={84} />
          <div style={{position: 'absolute', left: 30, right: 30, top: 690, display: 'flex', gap: 20, justifyContent: 'center'}}>
            <div style={{textAlign: 'center', opacity: pop(t, 239.2)}}><div style={{filter: `drop-shadow(0 0 20px ${GOLD})`, transform: `scale(${1 + 0.1 * Math.sin(t * 4)})`}}><F n="couronne" size={110} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26}}>sentiment d’impunité</div></div>
            <div style={{textAlign: 'center', opacity: pop(t, 241.8), transform: `translateY(${prog(t, 242.0, 244.0) * 40}px)`}}><div style={{filter: 'grayscale(0.6)'}}><F n="anxieux" size={110} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26}}>victimes dans le silence</div></div>
          </div>
        </SearchOpen>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 5 : DES OUTILS DÉTOURNÉS ═════════════ */
const TOOLS = [{a: 'cible', b: 'bombe', l: 'objectifs'}, {a: 'graphique', b: 'couteau', l: 'indicateurs'}, {a: 'clipboard', b: 'chaine-cassee', l: 'évaluations'}];
const Armes: React.FC = () => {
  const t = useT();
  const ph = t < 258.6 ? 0 : t < 277.4 ? 1 : 2;
  const press = prog(t, 264.3, 266.7);
  return (
    <Out end={289.95}>
      <HiLine words={ph === 0 ? ['Des', 'outils', 'détournés'] : ph === 1 ? ['Le', 'processus', 'abusif'] : ['Contrôler,', 'pas', 'améliorer']} mark={ph === 0 ? [2] : ph === 1 ? [2] : [0]} at={[248.2, 258.7, 277.5][ph]} y={330} size={64} />
      {ph === 0 && (
        <>
          {TOOLS.map((x, k) => {
            const f = prog(t, 252.5 + k * 0.3, 253.2 + k * 0.3, easeInOut);
            return (
              <Abs key={x.l} x={60 + k * 330} y={470} w={300} h={380} style={{perspective: 1200, opacity: pop(t, 248.4 + k * 0.2)}}>
                <div style={{position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d', transform: `rotateY(${f * 180}deg)`}}>
                  <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `7px 7px 0 ${GREEN}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14}}><F n={x.a} size={130} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30}}>{x.l}</div><Pill at={249} c={GREEN} size={22}>légitime</Pill></div>
                  <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: NIGHT, border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `7px 7px 0 ${RED}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14}}><F n={x.b} size={130} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>une arme</div></div>
                </div>
              </Abs>
            );
          })}
          <Abs x={0} y={900} w={1080} style={{textAlign: 'center'}}><span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: DIM, opacity: pop(t, 249.4)}}>des cris, des humiliations…<Strike p={prog(t, 250.9, 251.4)} c={RED} /></span></Abs>
          <Abs x={0} y={990} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 60, color: BURG, opacity: pop(t, 251.0)}}>le pire est ailleurs</Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <GlassCard x={60} y={450} w={960} h={300} at={258.7} c={ORANGE}>
            <div style={{display: 'flex', alignItems: 'center', gap: 24, padding: '30px 30px'}}><Num n={1} c={ORANGE} size={90} /><div style={{flex: 1, fontFamily: sansFont, fontWeight: 900, fontSize: 34}}>objectifs irréalistes : l’échec programmé</div>
              <div style={{position: 'relative', width: 200, height: 220}}><div style={{position: 'absolute', left: 30, top: 0}}><F n="montagne" size={170} /></div><div style={{position: 'absolute', left: 0, bottom: 0}}><F n="echelle" size={70} /></div></div></div>
          </GlassCard>
          <GlassCard x={60} y={780} w={960} h={300} at={264.2} c={RED}>
            <div style={{display: 'flex', alignItems: 'center', gap: 24, padding: '30px 30px'}}><Num n={2} c={RED} size={90} /><div style={{flex: 1, fontFamily: sansFont, fontWeight: 900, fontSize: 34}}>pression constante, démesurée</div>
              <svg width={220} height={150}><path d="M20 130 A90 90 0 0 1 200 130" fill="none" stroke="#E3E8EF" strokeWidth={24} /><path d="M20 130 A90 90 0 0 1 200 130" fill="none" stroke={RED} strokeWidth={24} strokeDasharray={283} strokeDashoffset={283 * (1 - press)} /><line x1={110} y1={130} x2={110 + 80 * Math.cos(Math.PI * (1 - press) + Math.sin(t * 40) * 0.05 * press)} y2={130 - 80 * Math.sin(Math.PI * (1 - press))} stroke={INK} strokeWidth={8} strokeLinecap="round" /></svg>
            </div>
          </GlassCard>
          <GlassCard x={60} y={1110} w={960} h={300} at={268.4} c={BURG}>
            <div style={{display: 'flex', alignItems: 'center', gap: 24, padding: '30px 30px'}}><Num n={3} c={BURG} size={90} /><div style={{flex: 1, fontFamily: sansFont, fontWeight: 900, fontSize: 34}}>évaluations et contrôles pour punir</div><F n="clipboard" size={130} /></div>
            <Stamp at={272.9} c={RED} text="sanction" x={600} y={170} rot={-8} size={50} />
          </GlassCard>
        </>
      )}
      {ph === 2 && (
        <>
          <Abs x={0} y={450} w={1080} style={{textAlign: 'center'}}><span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: DIM, opacity: pop(t, 279.6)}}>améliorer la performance<Strike p={prog(t, 280.6, 281.1)} c={RED} /></span></Abs>
          <Abs x={140} y={540} w={800} h={700}>
            <div style={{position: 'absolute', left: 300, top: 0, transform: `rotate(${Math.sin(t * 2) * 8}deg)`}}><F n="main-levee" size={200} /></div>
            <svg width={800} height={700} style={{position: 'absolute', left: 0, top: 0}}>{[0, 1, 2, 3, 4].map((k) => <line key={k} x1={360 + k * 20} y1={170} x2={300 + k * 50 + Math.sin(t * 2 + k) * 10} y2={430} stroke={INK} strokeWidth={3} strokeDasharray={260} strokeDashoffset={260 * (1 - prog(t, 282.3 + k * 0.2, 283.2 + k * 0.2))} />)}</svg>
            <div style={{position: 'absolute', left: 300, top: 420, transform: `rotate(${Math.sin(t * 2.6) * 10}deg)`, filter: `grayscale(${prog(t, 285.4, 287.0)})`}}><F n="salarie" size={200} /></div>
          </Abs>
          <Abs x={60} y={1240} w={960} style={{display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center'}}>{[{l: 'contrôler', a: 282.3}, {l: 'déstabiliser', a: 283.5}, {l: 'épuiser', a: 285.4}, {l: 'isoler', a: 286.7}, {l: 'emprise', a: 288.3}].map((x) => <Pill key={x.l} at={x.a} c={BURG} size={32}>{x.l}</Pill>)}</Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 6 : LA FRONTIÈRE ═════════════ */
const Frontiere: React.FC = () => {
  const t = useT();
  const lens = prog(t, 303.4, 305.2, easeInOut);
  const key = Math.max(0, Math.min(1, spring(t, 313.4, 7, 10)));
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={t < 313.3 ? ['Où', 'est', 'la', 'frontière', '?'] : ['C’est', 'peut-être', 'ça,', 'la', 'clé']} mark={t < 313.3 ? [3] : [4]} at={t < 313.3 ? 293.3 : 313.4} y={330} size={60} />
      <GlassCard x={60} y={450} w={440} h={620} at={296.9} c={GREEN}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40, gap: 14, textAlign: 'center'}}><F n="pousse" size={140} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: GREEN}}>leadership fort, exigeant</div>
          <Pill at={307.4} c={GREEN} size={28}>faire grandir</Pill><Pill at={310.0} c={GREEN} size={28}>construire</Pill></div>
      </GlassCard>
      <Abs x={580} y={450} w={440} h={620} style={{background: `linear-gradient(160deg, ${NIGHT}, #2A1D24)`, border: `4px solid ${INK}`, borderRadius: 26, boxShadow: `8px 8px 0 ${RED}`, opacity: pop(t, 298.9)}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40, gap: 14, textAlign: 'center'}}><F n="chaine-cassee" size={140} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff'}}>système toxique</div>
          <Pill at={308.2} c={RED} size={28}>soumettre</Pill><Pill at={311.3} c={RED} size={28}>contrôler</Pill></div>
      </Abs>
      <svg width={80} height={640} style={{position: 'absolute', left: 500, top: 440, filter: `blur(${pop(t, 300.7) * 3}px)`}}><path d={`M40 0 ${Array.from({length: 16}, (_, k) => `Q ${40 + Math.sin(t * 3 + k) * 30} ${k * 40 + 20} 40 ${k * 40 + 40}`).join(' ')}`} fill="none" stroke={ORANGE} strokeWidth={8} strokeDasharray="16 12" /></svg>
      {lens > 0 && t < 313.3 && (
        <div style={{position: 'absolute', left: 540 - 170, top: lerp(1400, 1120, lens), width: 340, height: 340, borderRadius: '50%', border: `14px solid ${INK}`, background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95), rgba(191,215,234,0.6) 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(20,33,61,0.3)', opacity: lens}}>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: NAVY}}>l’intention</div>
          <div style={{position: 'absolute', right: -90, bottom: -60, width: 150, height: 40, background: INK, borderRadius: 20, transform: 'rotate(40deg)'}} />
        </div>
      )}
      {t > 313.3 && <div style={{position: 'absolute', left: 540 - 160, top: 1110, width: 320, height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${key}) rotate(${(1 - key) * -90}deg)`, filter: `drop-shadow(0 0 ${30 + 20 * Math.sin(t * 5)}px ${GOLD})`}}><F n="cle" size={280} /></div>}
      {t > ALLDONE && <Dust n={24} c={GOLD} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: at + 0.35 + len * 0.05, s: 'sfx/pop', v: 0.25}, ...rep(at + 0.8 + len * 0.05, 3, 0.12, 'sfx/pop', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const shine = (a: number): Sfx => ({at: a, s: 'soft-whoosh', v: 0.18, dur: 0.8});
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 1.4, s: 'validation', v: 0.2})), {at: ALLDONE, s: 'validation', v: 0.35},
  {at: 2.8, s: 'sfx/pop', v: 0.2}, ...[4.6, 10.0, 13.1].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})), {at: 5.2, s: 'tension', v: 0.2, dur: 2}, {at: 6.2, s: 'sfx/whoosh', v: 0.2}, shine(6.5),
  {at: 16.9, s: 'stylo', v: 0.3}, {at: 18.4, s: 'sfx/pop', v: 0.22}, {at: 22.6, s: 'sfx/whoosh', v: 0.25}, {at: 23.5, s: 'sfx/ding', v: 0.25},
  ...rep(33.6, 4, 0.2, 'sfx/pop', 0.15), {at: 35.7, s: 'tension', v: 0.2, dur: 3}, {at: 38.0, s: 'soft-whoosh', v: 0.4, dur: 3.5}, {at: 41.5, s: 'deep-hit', v: 0.4}, {at: 43.7, s: 'sfx/thud', v: 0.3},
  {at: 51.4, s: 'sfx/pop', v: 0.2}, {at: 52.3, s: 'sfx/pop', v: 0.2}, {at: 54.0, s: 'sfx/rise', v: 0.3, dur: 1.4}, {at: 55.4, s: 'bass-hit', v: 0.4}, shine(55.4), ...rep(59.1, 4, 0.2, 'sfx/pop', 0.18), {at: 60.7, s: 'alarme', v: 0.06, dur: 0.7}, {at: 69.2, s: 'sfx/rise', v: 0.25, dur: 1.2}, {at: 70.4, s: 'sfx/thud', v: 0.4}, {at: 75.0, s: 'tampon', v: 0.55},
  ...flaps(81.7, 12), {at: 84.7, s: 'sfx/whoosh', v: 0.25}, ...rep(88.1, 10, 0.12, 'sfx/click', 0.15), {at: 93.4, s: 'sfx/swish', v: 0.3}, {at: 95.8, s: 'sfx/ding', v: 0.3},
  {at: 99.5, s: 'sfx/pop', v: 0.22}, ...[101.5, 103.2, 104.1].map((a) => ({at: a, s: 'sfx/pop', v: 0.18})), {at: 105.5, s: 'deep-hit', v: 0.4}, {at: 106.0, s: 'sfx/thud', v: 0.35}, ...[107.9, 109.3, 111.3].map((a) => ({at: a, s: 'sfx/pop', v: 0.18})),
  ...[118.5, 123.06, 128.78, 132.9].flatMap((a) => [{at: a, s: 'sfx/thud', v: 0.3}, ...rep(a + 0.2, 4, 0.25, 'tick', 0.12)]),
  ...[148.4, 152.8, 159.2].map((a) => ({at: a, s: 'sfx/whoosh', v: 0.25})), ...rep(164.9, 16, 0.1, 'sfx/thud', 0.12), ...rep(171.7, 6, 0.1, 'sfx/pop', 0.18), {at: 173.5, s: 'sfx/rise', v: 0.2, dur: 1}, {at: 177.6, s: 'sfx/thud', v: 0.45}, {at: 181.5, s: 'tampon', v: 0.55}, {at: 185.6, s: 'sfx/pop', v: 0.3},
  ...rep(191.4, 24, 0.09, 'sfx/thud', 0.1), {at: 193.7, s: 'deep-hit', v: 0.4}, {at: 195.5, s: 'sfx/rise', v: 0.2, dur: 1.5}, {at: 200.9, s: 'sfx/whoosh', v: 0.3},
  ...[211.5, 215.5, 221.2].map((a) => ({at: a, s: 'sfx/whoosh', v: 0.25})), ...[211.6, 215.6, 221.3].map((a) => ({at: a + 0.3, s: 'sfx/thud', v: 0.25})),
  ...searchCues(226.3, 19, 228.6, 229.2), {at: 231.8, s: 'sfx/rise', v: 0.2, dur: 1.6}, {at: 236.3, s: 'tampon', v: 0.6}, {at: 236.32, s: 'bass-hit', v: 0.35}, {at: 239.2, s: 'sfx/ding', v: 0.25}, {at: 241.8, s: 'sfx/pop', v: 0.2},
  ...rep(248.4, 3, 0.2, 'sfx/pop', 0.2), {at: 250.9, s: 'stylo', v: 0.3}, ...[252.5, 252.8, 253.1].map((a) => ({at: a, s: 'sfx/swish', v: 0.35})), {at: 253.6, s: 'deep-hit', v: 0.35},
  {at: 258.7, s: 'sfx/whoosh', v: 0.25}, shine(259.0), {at: 264.2, s: 'sfx/whoosh', v: 0.25}, {at: 264.3, s: 'tension', v: 0.25, dur: 2.4}, {at: 268.4, s: 'sfx/whoosh', v: 0.25}, {at: 272.9, s: 'tampon', v: 0.55},
  {at: 280.6, s: 'stylo', v: 0.3}, ...rep(282.3, 5, 0.2, 'stylo', 0.12), ...[282.3, 283.5, 285.4, 286.7, 288.3].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})),
  {at: 296.9, s: 'sfx/pop', v: 0.22}, {at: 298.9, s: 'sfx/pop', v: 0.22}, {at: 300.7, s: 'soft-whoosh', v: 0.25}, {at: 303.4, s: 'sfx/rise', v: 0.25, dur: 1.8}, {at: 305.2, s: 'sfx/ding', v: 0.3}, ...[307.4, 308.2, 310.0, 311.3].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})), {at: 313.4, s: 'riser', v: 0.3, dur: 0.9}, {at: 314.2, s: 'sfx/ding', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Caidat2: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={49.6}><Intro /></Gate>
    <Gate from={52.8} to={78.2}><Chiffres /></Gate>
    <Gate from={81.4} to={136.4}><Caidat /></Gate>
    <Gate from={139.6} to={187.9}><Roles /></Gate>
    <Gate from={191.1} to={244.8}><Silence /></Gate>
    <Gate from={248.0} to={290.0}><Armes /></Gate>
    <Gate from={293.2} to={OUTRO_AT}><Frontiere /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}><Gyro i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={316.3}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-caidat-origine.m4a')} trimAfter={s(316.4)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Kin, Brut, T, TitleBlock, Deep, Blinds, Card, IcoLab, Check, Win, Count, Strike, GLASS, TEAL, YEL, random];
