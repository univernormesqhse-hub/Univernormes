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
 * « ISO : performance ou illusion ? » (4 min 34) — capsule « condensé + effet wahou + ultra premium » : voix d'origine
 * (sans musique de fond), sous-titres calés mot à mot, photos générées (ChatGPT) d'après les prompts de
 * prompts-images-iso-performance.md, thème « papier quadrillé ».
 * Fil rouge : LE TUBE PNEUMATIQUE À SIX GUICHETS (fracture → Graal → deux mondes → cycle de l'audit → chiffres → vraie
 * valeur), adaptés aux parties réellement présentes ; la capsule file d'un guichet à l'autre, chaque guichet passé se
 * coche. Transition : LE GYROPHARE à chaque partie ; dans les scènes : capsule pneumatique, loupe, store vénitien.
 * Ultra premium : logo ISO qui scintille puis se fend, fissure qui coupe l'écran en deux, certificat-Graal auréolé qui
 * se fissure, balance atout / illusion, écran partagé méritante / certificat, anneau des 12 mois (11 en sommeil, 1 en
 * panique), gomme qui réécrit l'histoire, bombardier contre moustique, barre de recherche qui trouve puis OUVRE les
 * entreprises méritantes, anneau 40/30/30, chrono « moins de 2 mois », chemin sans fin avec le jalon certification.
 */
const IMG = {
  cover: '',
  trophee: '',
  meritante: '',
  hibernation: 'isoperf-gen/hibernation.jpg',
  panique: 'isoperf-gen/panique.jpg',
  usine: 'isoperf-gen/usine-a-gaz.jpg',
  amelioration: 'isoperf-gen/amelioration.jpg',
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
const OUTRO_AT = 273.8;
export const ISOPERF_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 15.5, n: '1', title: 'La fracture', s: 'l’esprit de la norme… ou pas', c: NAVY, g: 'fracture', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 30.0, n: '2', title: 'Le Graal', s: 'atout ou illusion ?', c: GOLD, g: 'Graal', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 60.2, n: '3', title: 'Deux mondes', s: 'deux philosophies opposées', c: VIO, g: 'deux mondes', k: 'gyro', lab: 'PARTIE 3 / 6'},
  {at: 92.4, n: '4', title: 'Le cycle de l’audit', s: '11 mois de sommeil', c: RED, g: 'cycle', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 175.5, n: '5', title: 'Les chiffres', s: 'combien jouent le jeu ?', c: BLUE, g: 'chiffres', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 225.2, n: '6', title: 'La vraie valeur', s: 's’améliorer chaque jour', c: GREEN, g: 'vraie valeur', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 262.5;

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

/** Badge « ISO » rond. */
const IsoBadge: React.FC<{size: number; crack?: number; glow?: number}> = ({size, crack = 0, glow = 0}) => (
  <div style={{position: 'relative', width: size, height: size}}>
    <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, #fff, ${BLUE} 60%, ${NAVY})`, border: `${size * 0.04}px solid ${INK}`, boxShadow: `0 0 ${glow * 60}px ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.3, letterSpacing: size * 0.02, clipPath: crack > 0 ? `polygon(0 0, ${50 - crack * 4}% 0, ${46 - crack * 4}% 35%, ${54 - crack * 4}% 55%, ${44 - crack * 4}% 100%, 0 100%)` : undefined, transform: `translateX(${-crack * size * 0.08}px) rotate(${-crack * 8}deg)`}}>ISO</div>
    {crack > 0 && <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, #fff, ${BLUE} 60%, ${NAVY})`, border: `${size * 0.04}px solid ${INK}`, clipPath: `polygon(${50 + crack * 4}% 0, 100% 0, 100% 100%, ${44 + crack * 4}% 100%, ${54 + crack * 4}% 55%, ${46 + crack * 4}% 35%)`, transform: `translateX(${crack * size * 0.08}px) rotate(${crack * 8}deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.3}}>ISO</div>}
  </div>
);

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 200}}><Pic src={IMG.cover} ic="diplome" w={1080} h={740} pos="50% 30%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER} 9%, ${PAPER}00 16%, ${PAPER}00 34%, ${PAPER}DD 43%, ${PAPER} 48%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={930} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>CERTIFICATION ISO</div>
        <div style={{marginTop: 16}}><Board text="PERFORMANCE" at={-1} h={84} gap={2} c={GREEN} stag={0.02} /></div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 70, color: INK, marginTop: 6}}>ou</div>
        <div><Board text="ILLUSION ?" at={-1} h={84} gap={2} c={RED} stag={0.02} /></div>
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

/* ═════════════ INTRO ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const crack = prog(t, 12.3, 13.4, easeIn);
  return (
    <Out end={15.5}>
      <HiLine words={['Le', 'logo', 'ISO']} mark={[1, 2]} at={2.8} y={330} size={72} />
      <Abs x={290} y={460} w={500} h={500} style={{opacity: pop(t, 2.8), transform: `scale(${0.7 + 0.3 * pop(t, 2.8)})`}}>
        <div style={{position: 'absolute', inset: -40, borderRadius: '50%', background: `repeating-conic-gradient(from ${t * 30}deg, ${GOLD}44 0 10deg, transparent 10deg 30deg)`, opacity: 1 - crack}} />
        <IsoBadge size={500} crack={crack} glow={(1 - crack) * (0.6 + 0.4 * Math.sin(t * 4))} />
      </Abs>
      <Abs x={0} y={1010} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16}}><Pill at={3.7} c={NAVY} size={28}>site web</Pill><Pill at={4.58} c={NAVY} size={28}>produit</Pill><Pill at={5.84} c={GREEN} size={28}>gage de qualité ?</Pill></Abs>
      <Abs x={60} y={1120} w={960} h={240} style={{display: 'flex', gap: 20}}>
        <div style={{flex: 1, borderRadius: 24, background: GREEN, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 46, opacity: pop(t, 10.22)}}>performance</div>
        <div style={{flex: 1, borderRadius: 24, background: '#fff', border: `5px dashed ${RED}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: RED, fontFamily: sansFont, fontWeight: 900, fontSize: 46, opacity: pop(t, 12.26) * (0.7 + 0.3 * Math.sin(t * 12))}}>illusion ?</div>
      </Abs>
    </Out>
  );
};

/* ═════════════ 1 · LA FRACTURE ═════════════ */
const Fracture: React.FC = () => {
  const t = useT();
  const split = prog(t, 21.7, 23.0, easeInOut);
  return (
    <Out end={30.0}>
      <HiLine words={['Une', 'vraie', 'fracture']} mark={[2]} at={16.2} y={330} size={70} />
      <Abs x={60} y={440} w={960} h={940}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 480 - split * 20, height: 940, borderRadius: '30px 0 0 30px', background: `linear-gradient(160deg, ${GREEN}22, #fff)`, border: `5px solid ${INK}`, transform: `translateX(${-split * 20}px)`, overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center', opacity: pop(t, 26.02)}}><F n="couronne" size={170} /></div>
          <div style={{position: 'absolute', left: 20, right: 20, top: 330, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: GREEN, lineHeight: 1.1, opacity: pop(t, 26.02)}}>l’esprit de la norme</div>
        </div>
        <div style={{position: 'absolute', right: 0, top: 0, width: 480 - split * 20, height: 940, borderRadius: '0 30px 30px 0', background: `linear-gradient(200deg, ${DIM}22, #fff)`, border: `5px solid ${INK}`, transform: `translateX(${split * 20}px)`, overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center', opacity: pop(t, 29.02), filter: 'grayscale(1)'}}><F n="diplome" size={170} /></div>
          <div style={{position: 'absolute', left: 20, right: 20, top: 330, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: DIM, lineHeight: 1.1, opacity: pop(t, 29.02)}}>toutes les autres</div>
        </div>
        <svg width={960} height={940} style={{position: 'absolute', left: 0, top: 0}}>
          <path d="M 480 0 L 460 150 L 500 290 L 450 430 L 510 600 L 470 760 L 490 940" fill="none" stroke={RED} strokeWidth={10} strokeLinecap="round" strokeDasharray={1100} strokeDashoffset={1100 * (1 - prog(t, 21.7, 22.8))} style={{filter: `drop-shadow(0 0 10px ${RED})`}} />
        </svg>
      </Abs>
    </Out>
  );
};

/* ═════════════ 2 · LE GRAAL ═════════════ */
const Graal: React.FC = () => {
  const t = useT();
  const ph = t < 45.9 ? 0 : 1;
  const crack = prog(t, 43.3, 44.6, easeIn);
  const tilt = lerp(0, 14, prog(t, 52.4, 53.4, easeInOut));
  return (
    <Out end={60.2}>
      {ph === 0 && (
        <>
          <HiLine words={['Le', 'certificat-Graal']} mark={[1]} at={30.4} y={330} size={66} />
          <Shot src={IMG.trophee} ic="trophee" x={60} y={440} w={960} h={420} at={30.4} c={GOLD} />
          <Abs x={290} y={890} w={500} h={460} style={{opacity: pop(t, 34.7)}}>
            <div style={{position: 'absolute', inset: -30, borderRadius: '50%', background: `radial-gradient(circle, ${GOLD}88, transparent 65%)`, opacity: 1 - crack}} />
            <div style={{position: 'absolute', left: 60, top: 30, width: 380, height: 300, background: '#FFFDF6', border: `10px solid ${GOLD}`, outline: `5px solid ${INK}`, borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `rotate(${Math.sin(t * 2) * 2}deg)`}}>
              <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>CERTIFICAT</div>
              <IsoBadge size={130} />
              {crack > 0 && <svg width={360} height={280} style={{position: 'absolute', left: 0, top: 0}}><path d="M 180 0 L 160 90 L 200 150 L 150 220 L 170 280" fill="none" stroke={INK} strokeWidth={6} strokeDasharray={320} strokeDashoffset={320 * (1 - crack)} /></svg>}
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 360, display: 'flex', justifyContent: 'center', gap: 12}}><Pill at={37.58} c={GOLD} size={24}>papier</Pill><Pill at={38.26} c={GOLD} size={24}>sésame</Pill><Pill at={41.06} c={GOLD} size={24}>trophée</Pill></div>
          </Abs>
          <Stamp at={44.34} c={RED} text="un vrai piège" x={260} y={1000} rot={-8} size={64} />
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Atout', 'ou', 'illusion', '?']} mark={[0, 2]} at={46.0} y={330} size={66} />
          <Abs x={60} y={460} w={960} h={520} style={{opacity: pop(t, 46.0)}}>
            <div style={{position: 'absolute', left: 470, top: 120, width: 20, height: 340, background: INK, borderRadius: 10}} />
            <div style={{position: 'absolute', left: 380, top: 450, width: 200, height: 36, background: INK, borderRadius: 12}} />
            <div style={{position: 'absolute', left: 80, top: 120, width: 800, height: 0, transform: `rotate(${tilt}deg)`}}>
              <div style={{position: 'absolute', left: 0, top: -9, width: 800, height: 18, background: INK, borderRadius: 9}} />
              {[{l: 'atout', c: GREEN, x: -60, ic: 'trophee', a: 49.22}, {l: 'illusion coûteuse', c: RED, x: 560, ic: 'argent', a: 51.5}].map((p) => (
                <div key={p.l} style={{position: 'absolute', left: p.x, top: 10, width: 300, transform: `rotate(${-tilt}deg)`, transformOrigin: '50% 0', opacity: pop(t, p.a)}}>
                  <div style={{margin: '0 auto', width: 4, height: 40, background: INK}} />
                  <div style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: '0 0 70px 70px', height: 200, boxShadow: `6px 6px 0 ${p.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><F n={p.ic} size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: p.c, textAlign: 'center'}}>{p.l}</div></div>
                </div>
              ))}
            </div>
          </Abs>
          <Abs x={60} y={1030} w={960} h={330} style={{background: NIGHT, border: `5px solid ${INK}`, borderRadius: 26, overflow: 'hidden', opacity: pop(t, 55.5)}}>
            <div style={{position: 'absolute', left: 30, top: 24, fontFamily: MONO, fontWeight: 700, fontSize: 24, color: '#9AA7BC'}}>fardeau financier et organisationnel</div>
            {Array.from({length: 14}, (_, k) => { const a = 56.4 + k * 0.18; const p = prog(t, a, a + 0.6, easeIn); return t > a && <div key={k} style={{position: 'absolute', left: 60 + (k % 7) * 125, top: lerp(-60, 210 - Math.floor(k / 7) * 60, p)}}><F n="argent" size={70} /></div>; })}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 3 · DEUX MONDES ═════════════ */
const Mondes: React.FC = () => {
  const t = useT();
  return (
    <Out end={92.4}>
      <HiLine words={t < 71.6 ? ['Deux', 'mondes', 'parallèles'] : ['Le', 'fossé']} mark={t < 71.6 ? [1, 2] : [1]} at={t < 71.6 ? 60.6 : 71.7} y={330} size={66} />
      {[{x: 60, c: GREEN, l: 'l’entreprise méritante', src: IMG.meritante, ic: 'pousse', a: 75.02, L: [{l: 'outil formidable', a: 77.54}, {l: 's’améliorer chaque jour', a: 78.82}, {l: 'plus efficace', a: 80.0}, {l: 'réduire les coûts', a: 81.3}], ok: true}, {x: 560, c: RED, l: 'le certificat à tout prix', src: IMG.hibernation, ic: 'classeur', a: 83.42, L: [{l: 'un poids mort', a: 88.26}, {l: 'un monstre bureaucratique', a: 89.1}, {l: 'coûter de l’argent', a: 91.3}], ok: false}].map((s0, k) => (
        <Abs key={s0.l} x={s0.x} y={440} w={460} h={940} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `9px 9px 0 ${s0.c}`, overflow: 'hidden', opacity: t < 71.6 ? pop(t, 62.0 + k * 3) : pop(t, s0.a - 0.4), transform: `perspective(1200px) rotateY(${(1 - pop(t, (t < 71.6 ? 62.0 + k * 3 : s0.a - 0.4))) * (k ? 40 : -40)}deg)`}}>
          <Pic src={s0.src} ic={s0.ic} w={460} h={360} zoom={1.08 - 0.05 * prog(t, s0.a, s0.a + 8)} filter={k ? 'saturate(0.6)' : undefined} />
          <div style={{background: s0.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 32, textAlign: 'center', padding: '12px 10px', lineHeight: 1.05}}>{s0.l}</div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 16, padding: '24px 22px'}}>
            {s0.L.map((x) => <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 12, opacity: pop(t, x.a), transform: `translateX(${(1 - pop(t, x.a)) * 40}px)`}}><div style={{width: 44, height: 44, borderRadius: 10, background: s0.ok ? GREEN : RED, color: '#fff', fontWeight: 900, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{s0.ok ? '✓' : '✕'}</div><span style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: INK, lineHeight: 1.1}}>{x.l}</span></div>)}
          </div>
        </Abs>
      ))}
      {t < 71.6 && <Abs x={0} y={1180} w={1080} style={{textAlign: 'center', zIndex: 4}}><Pill at={67.18} c={VIO} size={30}>deux philosophies opposées</Pill></Abs>}
    </Out>
  );
};

/* ═════════════ 4 · LE CYCLE DE L'AUDIT ═════════════ */
const MOIS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const Cycle: React.FC = () => {
  const t = useT();
  const ph = t < 125.2 ? 0 : t < 144.4 ? 1 : 2;
  const sweep = prog(t, 106.86, 112.5, easeInOut) * 11 + prog(t, 112.74, 114.0) * 1;
  const panic = t > 114.1 && t < 122.3;
  const erase = prog(t, 138.0, 140.5, easeInOut);
  const bomb = prog(t, 160.4, 162.4, easeInOut);
  return (
    <Out end={175.5}>
      {ph === 0 && (
        <>
          <HiLine words={t < 106.7 ? ['Le', 'grand', 'coup', 'de', 'stress'] : ['11', 'mois', 'de', 'sommeil']} mark={t < 106.7 ? [1, 2, 4] : [0, 1, 3]} at={t < 106.7 ? 99.9 : 106.86} y={330} size={58} />
          {panic && <AbsoluteFill style={{background: `rgba(224,74,63,${0.12 * Math.abs(Math.sin(t * 9))})`}} />}
          <Abs x={140} y={440} w={800} h={800}>
            {MOIS.map((m, k) => {
              const ang = (k / 12) * Math.PI * 2 - Math.PI / 2;
              const reached = sweep >= k + 0.5;
              const audit = k === 11;
              const hot = audit && t > 112.74;
              return <div key={k} style={{position: 'absolute', left: 400 + Math.cos(ang) * 320 - 55, top: 400 + Math.sin(ang) * 320 - 55, width: 110, height: 110, borderRadius: 55, background: hot ? RED : reached ? '#C9D2DF' : '#fff', border: `5px solid ${hot ? INK : reached ? DIM : '#C9D2DF'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: hot ? '#fff' : reached ? DIM : INK, boxShadow: hot ? `0 0 ${30 + 20 * Math.abs(Math.sin(t * 9))}px ${RED}` : 'none', transform: `scale(${hot ? 1.15 + 0.1 * Math.sin(t * 12) : 1})`}}>{m}</div>;
            })}
            <div style={{position: 'absolute', left: 400 - 160, top: 400 - 160, width: 320, height: 320, borderRadius: 160, background: panic ? RED : NIGHT, backgroundImage: (panic ? IMG.panique : IMG.hibernation) ? `linear-gradient(${panic ? 'rgba(224,74,63,0.55)' : 'rgba(14,20,34,0.6)'}, ${panic ? 'rgba(224,74,63,0.55)' : 'rgba(14,20,34,0.6)'}), url(${staticFile(panic ? IMG.panique : IMG.hibernation)})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center', overflow: 'hidden', border: `6px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', opacity: pop(t, 103.2)}}>
              {!panic ? <><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 90, lineHeight: 1, opacity: 0.6 + 0.4 * Math.sin(t * 2)}}>Zzz</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, marginTop: 10}}>hibernation</div></> : <><F n="sirene" size={120} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36}}>PANIQUE</div></>}
            </div>
          </Abs>
          <Abs x={0} y={1260} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}>
            <Pill at={112.74} c={RED} size={26}>3 semaines avant l’audit</Pill>
            {t > 122.3 && <Pill at={122.38} c={NAVY} size={26}>et on se rendort</Pill>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['L’histoire', 'réécrite']} mark={[0, 1]} at={125.4} y={330} size={66} />
          <Shot src={IMG.panique} ic="chrono" x={60} y={440} w={960} h={440} at={125.4} c={RED} blinds />
          <Abs x={60} y={920} w={960} h={440} style={{background: '#FFFDF6', border: `5px solid ${INK}`, borderRadius: 20, boxShadow: `8px 8px 0 ${RED}`, overflow: 'hidden', opacity: pop(t, 131.06)}}>
            <div style={{position: 'absolute', left: 24, top: 18, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>registre qualité · janvier → novembre</div>
            {Array.from({length: 7}, (_, k) => <div key={k} style={{position: 'absolute', left: 40, right: 40, top: 70 + k * 50, height: 30, display: 'flex', gap: 14}}><div style={{width: 120, background: '#E3E8EF', borderRadius: 6}} /><div style={{flex: 1, background: k < Math.floor(prog(t, 134.6, 137.0) * 7) ? '#9CB6D9' : '#F1F3F6', borderRadius: 6}} /></div>)}
            {erase > 0 && <div style={{position: 'absolute', left: lerp(40, 760, erase), top: 120 + Math.sin(erase * 20) * 80, transform: 'rotate(-20deg)'}}><F n="ecrit" size={110} /></div>}
            <Stamp at={141.58} c={RED} text="mauvaise foi" x={60} y={280} rot={-6} size={44} />
            <Stamp at={143.0} c={BURG} text="falsification" x={500} y={300} rot={5} size={44} />
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 155.7 ? ['Des', 'usines', 'à', 'gaz'] : ['Un', 'B-52', 'contre', 'un', 'moustique']} mark={t < 155.7 ? [1, 2, 3] : [1, 4]} at={t < 155.7 ? 144.5 : 158.7} y={330} size={58} />
          {t < 155.7 && <Shot src={IMG.usine} ic="classeur" x={60} y={440} w={960} h={900} at={144.5} c={ORANGE}><div style={{position: 'absolute', left: 24, bottom: 24}}><Pill at={150.7} c={ORANGE} size={28}>complexité ahurissante</Pill></div></Shot>}
          {t >= 155.7 && (
            <>
              <Abs x={60} y={440} w={960} h={560} style={{background: 'linear-gradient(180deg, #BFE3FF, #F4FAFF)', border: `5px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 158.7)}}>
                <div style={{position: 'absolute', left: lerp(-360, 980, bomb), top: 70, transform: 'scaleX(-1)', filter: 'drop-shadow(0 20px 10px rgba(0,0,0,0.25))'}}><F n="avion" size={300} /></div>
                <div style={{position: 'absolute', left: 620 + Math.sin(t * 9) * 30, top: 380 + Math.cos(t * 7) * 20}}><F n="microbe" size={70} /></div>
                <div style={{position: 'absolute', left: 30, bottom: 24}}><Pill at={163.78} c={RED} size={26}>système énorme</Pill></div>
                <div style={{position: 'absolute', right: 30, bottom: 24}}><Pill at={165.58} c={GREEN} size={26}>problème tout simple</Pill></div>
              </Abs>
              <Abs x={60} y={1040} w={960} h={300} style={{borderRadius: 26, background: `linear-gradient(110deg, ${GREEN}, #2FBF71)`, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', gap: 26, padding: '0 36px', opacity: pop(t, 170.34), overflow: 'hidden'}}>
                <F n="feuille" size={140} />
                <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#E9FFF2'}}>les entreprises qui avancent</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 54, color: '#fff'}}>la simplification</div></div>
                <Shine at={172.8} />
              </Abs>
            </>
          )}
        </>
      )}
    </Out>
  );
};

/* ═════════════ 5 · LES CHIFFRES ═════════════ */
const PIE = [{v: 40, l: '1 mois par an, juste pour l’audit', c: RED, a: 187.3}, {v: 30, l: 'le strict minimum', c: ORANGE, a: 193.94}, {v: 30, l: 'vraiment méritantes', c: GREEN, a: 198.82}];
const Chiffres: React.FC = () => {
  const t = useT();
  const ph = t < 202.7 ? 0 : 1;
  let acc = 0;
  return (
    <Out end={225.2}>
      {ph === 0 && (
        <>
          <HiLine words={t < 184.3 ? ['Combien', 'jouent', 'le', 'jeu', '?'] : ['Les', 'chiffres']} mark={t < 184.3 ? [0, 3] : [1]} at={t < 184.3 ? 175.9 : 184.4} y={330} size={62} />
          <Abs x={240} y={440} w={600} h={600} style={{opacity: pop(t, 180.9)}}>
            <svg width={600} height={600} style={{position: 'absolute', left: 0, top: 0, transform: 'rotate(-90deg)'}}>
              <circle cx={300} cy={300} r={220} fill="none" stroke="#E3E8EF" strokeWidth={110} />
              {PIE.map((p, k) => { const len = 2 * Math.PI * 220; const seg = len * p.v / 100 * prog(t, p.a, p.a + 1.0, easeOut); const off = -len * acc / 100; acc += p.v; return <circle key={k} cx={300} cy={300} r={220} fill="none" stroke={p.c} strokeWidth={110} strokeDasharray={`${seg} ${len}`} strokeDashoffset={off} />; })}
            </svg>
            <div style={{position: 'absolute', left: 200, top: 230, width: 200, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: INK, opacity: pop(t, 183.38)}}>?</div>
          </Abs>
          <Abs x={60} y={1070} w={960} h={300} style={{display: 'flex', flexDirection: 'column', gap: 14}}>
            {PIE.map((p) => <div key={p.l} style={{display: 'flex', alignItems: 'center', gap: 18, opacity: pop(t, p.a), transform: `translateX(${(1 - pop(t, p.a)) * 60}px)`}}><div style={{width: 150, padding: '6px 0', borderRadius: 14, background: p.c, border: `4px solid ${INK}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 40, textAlign: 'center'}}><Count n={p.v} a={p.a} b={p.a + 1} suf=" %" /></div><span style={{fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: INK}}>{p.l}</span></div>)}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Oui,', 'oui,', '30', '%']} mark={[2, 3]} at={202.8} y={330} size={70} />
          <SearchOpen x={60} y={440} w={960} h={640} at={203.0} query="entreprises méritantes" results={['Entreprises certifiées', 'Entreprises méritantes', 'Entreprises en audit']} found={1} foundAt={204.4} clickAt={204.7} c={GREEN}>
            <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', gap: 30, padding: '0 40px'}}>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 200, color: GREEN, lineHeight: 1, textShadow: `6px 6px 0 ${INK}`}}>30%</div>
              <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
                <Pill at={208.02} c={GREEN} size={28}>un levier</Pill>
                <Pill at={209.18} c={TEAL} size={28}>l’excellence</Pill>
                <Pill at={209.94} c={NAVY} size={28}>amélioration continue</Pill>
              </div>
            </div>
          </SearchOpen>
          <Abs x={60} y={1110} w={960} h={260} style={{background: NIGHT, border: `5px solid ${INK}`, borderRadius: 26, display: 'flex', alignItems: 'center', gap: 30, padding: '0 36px', opacity: pop(t, 216.78)}}>
            <div style={{position: 'relative', width: 170, height: 170, borderRadius: 85, border: `8px solid #fff`}}>
              <div style={{position: 'absolute', left: 77, top: 14, width: 10, height: 66, background: GOLD, borderRadius: 5, transformOrigin: '50% 100%', transform: `rotate(${prog(t, 218.1, 221.5) * 720}deg)`}} />
            </div>
            <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#9AA7BC'}}>certifié en</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: GOLD}}>moins de 2 mois</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#fff', opacity: pop(t, 222.82)}}>le vrai défi est ailleurs</div></div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 6 · LA VRAIE VALEUR ═════════════ */
const QUOTE = 'Décrocher un certificat, c’est la partie facile.';
const Valeur: React.FC = () => {
  const t = useT();
  const ph = t < 252.2 ? 0 : 1;
  const walk = prog(t, 241.3, 251.8, easeInOut);
  return (
    <Out end={OUTRO_AT}>
      {ph === 0 && (
        <>
          <HiLine words={t < 237.5 ? ['Changer', 'de', 'perspective'] : ['Pas', 'une', 'fin', 'en', 'soi']} mark={t < 237.5 ? [0, 2] : [2, 4]} at={t < 237.5 ? 225.6 : 241.3} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={940} style={{opacity: pop(t, 226.0)}}>
            <svg width={960} height={940} style={{position: 'absolute', left: 0, top: 0}}>
              <path d="M 480 920 C 200 760, 760 600, 480 440 S 300 160, 520 20" fill="none" stroke="#3A4356" strokeWidth={90} strokeLinecap="round" />
              <path d="M 480 920 C 200 760, 760 600, 480 440 S 300 160, 520 20" fill="none" stroke={YEL} strokeWidth={8} strokeDasharray="30 30" strokeDashoffset={-t * 80} />
            </svg>
            <div style={{position: 'absolute', left: 420, top: 470, opacity: pop(t, 245.0)}}><div style={{width: 140, padding: '8px 0', borderRadius: 12, background: GOLD, border: `5px solid ${INK}`, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 22}}>CERTIFICAT</div><div style={{margin: '0 auto', width: 10, height: 60, background: INK}} /></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, textAlign: 'center', opacity: pop(t, 250.0)}}><Pill at={250.0} c={GREEN} size={30}>… un chemin sans fin</Pill></div>
            {t > 241.3 && <div style={{position: 'absolute', left: lerp(440, 470, Math.sin(walk * 6)), top: lerp(820, 80, walk)}}><F n="ouvrier" size={100} /></div>}
            {t < 237.5 && <div style={{position: 'absolute', left: 340, top: 300, opacity: pop(t, 233.6), transform: `rotate(${Math.sin(t * 3) * 8}deg)`}}><F n="question" size={260} /></div>}
          </Abs>
          <Abs x={0} y={1280} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={243.0} c={RED} size={26}>pas une destination</Pill><Pill at={246.0} c={NAVY} size={26}>une étape, un jalon</Pill></Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['L’amélioration', 'continue']} mark={[0, 1]} at={252.3} y={330} size={62} />
          <Shot src={IMG.amelioration} ic="hausse" x={60} y={440} w={960} h={420} at={252.3} c={GREEN} blinds />
          <PneuDeliver x={60} y={875} w={960} at={258.5} c={GREEN} />
          <Abs x={60} y={950} w={960} h={420} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `9px 9px 0 ${GREEN}`, padding: 36, boxSizing: 'border-box', opacity: pop(t, 259.5)}}>
            <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 54, color: INK, lineHeight: 1.2}}>« {QUOTE.slice(0, Math.floor(prog(t, 259.65, 261.9) * QUOTE.length))} »</div>
            <div style={{marginTop: 20, fontFamily: sansFont, fontWeight: 900, fontSize: 42, color: GREEN, opacity: pop(t, 262.49)}}>le vrai challenge : s’améliorer un peu, chaque jour</div>
            <Shine at={267.8} />
          </Abs>
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
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 0.8, s: 'validation', v: 0.18})), {at: ALLDONE, s: 'validation', v: 0.35},
  {at: 2.8, s: 'sfx/rise', v: 0.22, dur: 1.2}, shine(3.2), ...pops([3.7, 4.58, 5.84]), {at: 10.22, s: 'sfx/ding', v: 0.22}, {at: 12.26, s: 'sfx/pop', v: 0.22}, {at: 12.3, s: 'deep-hit', v: 0.35}, {at: 12.35, s: 'sfx/swish', v: 0.3},
  {at: 21.7, s: 'deep-hit', v: 0.4}, {at: 21.75, s: 'sfx/swish', v: 0.3}, {at: 26.02, s: 'sfx/ding', v: 0.22}, {at: 29.02, s: 'sfx/thud', v: 0.25},
  {at: 30.4, s: 'soft-whoosh', v: 0.35, dur: 1}, {at: 34.7, s: 'sfx/rise', v: 0.22, dur: 1}, ...pops([37.58, 38.26, 41.06]), {at: 43.3, s: 'sfx/swish', v: 0.25}, {at: 44.34, s: 'tampon', v: 0.6},
  {at: 46.0, s: 'sfx/whoosh', v: 0.22}, ...pops([49.22, 51.5]), {at: 52.4, s: 'sfx/rise', v: 0.2, dur: 1}, {at: 53.4, s: 'sfx/thud', v: 0.35}, {at: 55.5, s: 'sfx/whoosh', v: 0.2}, ...rep(56.6, 14, 0.18, 'sfx/click', 0.1),
  {at: 62.0, s: 'soft-whoosh', v: 0.3}, {at: 65.0, s: 'soft-whoosh', v: 0.3}, {at: 67.18, s: 'sfx/pop', v: 0.2}, ...[77.54, 78.82, 80.0, 81.3].map((a) => ({at: a, s: 'sfx/ding', v: 0.2})), ...[88.26, 89.1, 91.3].map((a) => ({at: a, s: 'sfx/thud', v: 0.25})),
  {at: 99.9, s: 'alarme', v: 0.05, dur: 0.8}, {at: 103.2, s: 'sfx/pop', v: 0.22}, ...rep(106.86, 11, 0.5, 'tick', 0.12), {at: 112.74, s: 'alarme', v: 0.08, dur: 2}, {at: 112.8, s: 'bass-hit', v: 0.35}, {at: 122.38, s: 'soft-whoosh', v: 0.3, dur: 1.5},
  {at: 125.4, s: 'soft-whoosh', v: 0.35, dur: 1}, {at: 131.06, s: 'sfx/whoosh', v: 0.2}, ...rep(134.6, 7, 0.34, 'stylo', 0.15), {at: 138.0, s: 'sfx/swish', v: 0.25}, {at: 141.58, s: 'tampon', v: 0.6}, {at: 143.0, s: 'tampon', v: 0.6},
  {at: 144.5, s: 'sfx/whoosh', v: 0.22}, {at: 150.7, s: 'sfx/pop', v: 0.2}, {at: 158.7, s: 'sfx/whoosh', v: 0.22}, {at: 160.4, s: 'soft-whoosh', v: 0.5, dur: 2}, {at: 161.0, s: 'bass-hit', v: 0.3}, ...pops([163.78, 165.58]), {at: 170.34, s: 'sfx/rise', v: 0.22, dur: 1}, shine(172.8),
  {at: 180.9, s: 'sfx/whoosh', v: 0.2}, ...PIE.flatMap((p) => [{at: p.a, s: 'sfx/rise', v: 0.2, dur: 1}, ...rep(p.a, 8, 0.12, 'tick', 0.1)]),
  ...searchCues(203.0, 22, 204.4, 204.7), ...pops([208.02, 209.18, 209.94]), {at: 216.78, s: 'sfx/whoosh', v: 0.2}, ...rep(218.1, 14, 0.25, 'tick', 0.12), {at: 222.82, s: 'sfx/ding', v: 0.22},
  {at: 226.0, s: 'soft-whoosh', v: 0.35, dur: 1}, {at: 233.6, s: 'sfx/pop', v: 0.22}, {at: 241.3, s: 'sfx/rise', v: 0.2, dur: 10}, ...pops([243.0, 245.0, 246.0, 250.0], 0.2),
  {at: 252.3, s: 'soft-whoosh', v: 0.4, dur: 1}, {at: 258.5, s: 'sfx/swish', v: 0.3}, ...rep(259.65, 22, 0.1, 'sfx/click', 0.07), {at: 262.49, s: 'validation', v: 0.3}, shine(267.8),
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const IsoPerf: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={15.55}><Intro /></Gate>
    <Gate from={15.9} to={30.05}><Fracture /></Gate>
    <Gate from={30.2} to={60.25}><Graal /></Gate>
    <Gate from={60.4} to={92.45}><Mondes /></Gate>
    <Gate from={95.6} to={175.55}><Cycle /></Gate>
    <Gate from={175.7} to={225.25}><Chiffres /></Gate>
    <Gate from={225.4} to={OUTRO_AT}><Valeur /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}><Gyro i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={273.6}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-iso-performance-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Kin, Brut, T, TitleBlock, Win, GLASS, Check, Tile, Card, Num, random, LoupeSweep, GlassCard, IcoLab];
