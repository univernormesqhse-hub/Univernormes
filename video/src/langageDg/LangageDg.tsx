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
 * « En QHSE, voici 03 types de DG » (4 min 06) — capsule « condensé + effet wahou + ultra
 * premium » présentée en métro : 8 stations (euros → marge brute → conquête → passeport → confiance → talents →
 * conseiller → levier). Voix d'origine (sans musique de fond), sous-titres calés mot à mot. Couverture : photo +
 * « EN QHSE VOICI / 03 TYPES DE DG » en lettres-photos animées. Fil rouge : tube pneumatique à six guichets calés sur les
 * vraies parties (finance → croissance → humain → stratégie → emballage → conclusion) ; gyrophare (transition
 * principale), loupe et capsule pneumatique plein écran ; store vénitien ; barre de recherche qui ouvre le levier.
 */
const IMG = {
  cover: 'heures-gen/rapport.jpg',
  cConv: 'alerte-gen/direction.jpg',
  cDir: 'isoperf-gen/trophee.jpg',
  financier: 'alerte-gen/direction.jpg',
  croissance: 'heures-gen/secteurs.jpg',
  equipe: 'ishikawa-gen/final.jpg',
  conseiller: 'heures-gen/rapport.jpg',
  reunion: 'sysqsse-gen/chef.jpg',
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
const OUTRO_AT = 246.2;
export const LANGAGE_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 2.6, n: '1', title: 'Le DG « résultat financier »', s: 'profil 1 · coûts, marges, ROI', c: GOLD, g: 'finance', k: 'gyro', lab: 'PROFIL 1 / 3'},
  {at: 50.66, n: '2', title: 'Le DG « croissance & marchés »', s: 'profil 2 · la conquête', c: BLUE, g: 'croissance', k: 'gyro', lab: 'PROFIL 2 / 3'},
  {at: 102.18, n: '3', title: 'Le DG « personnes & culture »', s: 'profil 3 · l’humain', c: GREEN, g: 'humain', k: 'loupe', lab: 'PROFIL 3 / 3'},
  {at: 153.38, n: '4', title: 'Le levier stratégique', s: 'expert → conseiller', c: VIO, g: 'stratégie', k: 'tube', lab: 'PARTIE 4 / 6'},
  {at: 186.06, n: '5', title: 'Une question d’emballage', s: 'l’intégrité reste intacte', c: ORANGE, g: 'emballage', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 212.58, n: '6', title: 'Le bon langage', s: 'un levier de performance', c: RED, g: 'conclusion', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 244.84;
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
  {n: 1, l: 'Traduire en euros', s: 'euros', at: 15.66},
  {n: 2, l: 'Protéger la marge brute', s: 'marge', at: 47.9},
  {n: 3, l: 'Son obsession : la conquête', s: 'conquête', at: 58.34},
  {n: 4, l: 'Un passeport commercial', s: 'passeport', at: 92.9},
  {n: 5, l: 'Le climat de confiance', s: 'confiance', at: 132.78},
  {n: 6, l: 'Fidéliser les talents', s: 'talents', at: 149.86},
  {n: 7, l: 'Expert → conseiller stratégique', s: 'conseiller', at: 182.98},
  {n: 8, l: 'Un levier surpuissant', s: 'levier', at: 227.06},
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

const PROFILS = [{l: 'finance', ic: 'argent', c: GOLD}, {l: 'croissance', ic: 'globe', c: BLUE}, {l: 'humain', ic: 'coeur', c: GREEN}];

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="directeur" w={1080} h={800} pos="50% 30%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 22%, ${PAPER}CC 30%, ${PAPER} 35%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={560} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: '#fff', background: NAVY, padding: '8px 24px', borderRadius: 8}}>RESPONSABLE QHSE × DIRECTION</div></Abs>
      <Abs x={0} y={650} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="EN QHSE VOICI" src={IMG.cConv} size={104} ls={0} /></Abs>
      <Abs x={0} y={800} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="03 TYPES DE DG" src={IMG.cDir} size={104} ls={0} seed={3} /></Abs>
      <Abs x={0} y={960} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: NAVY}}>parler le langage de chaque DG</Abs>
      <Abs x={0} y={1060} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 20}}>{PROFILS.map((p, k) => <div key={p.l} style={{width: 280, height: 300, borderRadius: 26, background: p.c, border: `5px solid ${INK}`, boxShadow: `5px 5px 0 ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6}}><F n={p.ic} size={120} /><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#fff'}}>PROFIL {k + 1}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: '#fff'}}>{p.l}</div></div>)}</Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ 1 · LE DG « RÉSULTAT FINANCIER » ═════════════ */
const Financier: React.FC = () => {
  const t = useT();
  const ph = t < 23.6 ? 0 : t < 38.1 ? 1 : 2;
  const conv = prog(t, 13.9, 16.6);
  const att = 1 - prog(t, 21.3, 22.9, easeIn);
  const dep = prog(t, 44.6, 45.6, easeInOut);
  return (
    <Out end={50.66}>
      {ph === 0 && (
        <>
          <HiLine words={t < 10.3 ? ['Coûts,', 'marges,', 'ROI'] : t < 18.6 ? ['Traduire', 'en', 'euros'] : ['Plateau', 'd’argent']} mark={t < 10.3 ? [0, 1, 2] : t < 18.6 ? [0, 2] : [1]} at={t < 10.3 ? 6.0 : t < 18.6 ? 15.66 : 20.1} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            {t < 10.3 ? <div style={{position: 'absolute', left: 180, top: 20, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, #FFF6DA, #E8D7A8)', border: `14px solid ${INK}`, opacity: pop(t, 6.0)}}>
              {[{l: 'coûts', a: 0, at: 5.58}, {l: 'marges', a: 120, at: 6.38}, {l: 'ROI', a: 240, at: 7.82}].map((x) => <div key={x.l} style={{position: 'absolute', left: 300 + Math.sin((x.a * Math.PI) / 180) * 220 - 90, top: 300 - Math.cos((x.a * Math.PI) / 180) * 220 - 30, width: 180, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: GOLD, opacity: pop(t, Math.max(x.at, 6.1))}}>{x.l}</div>)}
              <div style={{position: 'absolute', left: 290, top: 80, width: 20, height: 220, background: RED, clipPath: 'polygon(50% 0, 100% 100%, 0 100%)', transformOrigin: '50% 100%', transform: `rotate(${Math.sin(t * 2) * 50 + t * 40}deg)`}} />
              <div style={{position: 'absolute', left: 260, top: 260, width: 80, height: 80, borderRadius: 40, background: INK, color: GOLD, fontSize: 50, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>€</div>
            </div> : <>
              <div style={{position: 'absolute', left: 0, top: 60, width: 960, height: 260, borderRadius: 30, background: '#fff', border: `6px solid ${INK}`, overflow: 'hidden', opacity: pop(t, 10.3)}}>
                <div style={{position: 'absolute', left: 360, top: 40, width: 240, height: 180, borderRadius: 20, background: NAVY, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 24, color: '#fff', textAlign: 'center'}}>TRADUCTEUR<br />→ €</div>
                {['norme', 'qualité', 'exigence', 'audit'].map((w, k) => { const p = Math.max(0, Math.min(1, conv * 1.6 - k * 0.2)); const x = lerp(30, 700, p); const out = p > 0.5; return <div key={w} style={{position: 'absolute', left: x, top: 22 + k * 56, width: 200, textAlign: 'center', padding: '4px 0', borderRadius: 12, background: out ? GOLD : '#E3E8EF', border: `4px solid ${INK}`, fontFamily: out ? sansFont : MONO, fontWeight: 900, fontSize: 24, color: INK, opacity: p > 0.19 && p < 0.85 ? 0 : 1}}>{out ? ['en €', '% rentabilité', 'en €', 'ROI'][k] : w}</div>; })}
              </div>
              <div style={{position: 'absolute', left: 0, right: 0, top: 380, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={11.46} c={DIM} size={28}>vocabulaire ultra technique</Pill><Pill at={16.82} c={GOLD} size={28}>% de rentabilité</Pill></div>
              <div style={{position: 'absolute', left: 120, top: 500, width: 720, height: 300, borderRadius: 24, background: '#fff', border: `5px solid ${INK}`, opacity: pop(t, 18.7)}}>
                <div style={{position: 'absolute', left: 24, top: 18, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>attention du DG</div>
                <div style={{position: 'absolute', left: 24, right: 24, top: 80, height: 70, borderRadius: 35, border: `4px solid ${INK}`, overflow: 'hidden', background: '#E3E8EF'}}><div style={{width: `${att * 100}%`, height: '100%', background: att > 0.4 ? GREEN : RED}} /></div>
                {t > 21.3 && Array.from({length: 10}, (_, k) => <div key={k} style={{position: 'absolute', left: 60 + k * 60, top: 170 - ((t - 21.3) * 120 + k * 13) % 160, width: 30, height: 30, borderRadius: 15, background: '#C9D2DF', opacity: 0.7, filter: 'blur(3px)'}} />)}
              </div>
            </>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Du', 'concret']} mark={[1]} at={26.98} y={330} size={74} />
          <Shot src={IMG.financier} ic="directeur" x={60} y={440} w={960} h={330} at={23.8} c={GOLD} />
          <Abs x={60} y={800} w={960} h={570} style={{display: 'flex', gap: 14, alignItems: 'flex-end'}}>
            {[{l: 'accidents', a: 29.38}, {l: 'pertes de production', a: 30.9}, {l: 'non-conformités', a: 33.7}, {l: 'coûts cachés', a: 35.34}].map((x) => { const d = prog(t, x.a, x.a + 0.8, easeOut); return <div key={x.l} style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: pop(t, 28.2)}}><F n="baisse" size={60} /><div style={{width: '100%', height: lerp(400, 120, d), borderRadius: '16px 16px 0 0', background: d > 0.5 ? GREEN : RED, border: `5px solid ${INK}`}} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: INK, textAlign: 'center', height: 56}}>{x.l}</div></div>; })}
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 49.0 ? ['Tableau', 'de', 'bord', 'financier'] : ['Ça', 'lui', 'parle']} mark={t < 49.0 ? [0, 3] : [2]} at={t < 49.0 ? 40.62 : 49.06} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={930} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 38.3)}}>
            <div style={{height: 60, background: '#1E2638', display: 'flex', alignItems: 'center', padding: '0 20px', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: GOLD}}>QHSE · TABLEAU DE BORD FINANCIER</div>
            <div style={{position: 'absolute', left: 40, top: 110, width: 420, height: 260, borderRadius: 20, background: '#1E2638', border: `3px solid #3A4560`}}>
              <div style={{position: 'absolute', left: 20, top: 16, fontFamily: MONO, fontWeight: 700, fontSize: 20, color: '#9CC6FF'}}>catégorie</div>
              <div style={{position: 'absolute', left: 20, top: 80, fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: DIM, opacity: 1 - dep, textDecoration: 'line-through'}}>dépense</div>
              <div style={{position: 'absolute', left: 20, top: 80, fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: GREEN, opacity: dep}}>investissement</div>
            </div>
            <div style={{position: 'absolute', left: 500, top: 110, width: 410, height: 260, borderRadius: 20, background: '#1E2638', border: `3px solid #3A4560`}}>
              <div style={{position: 'absolute', left: 20, top: 16, fontFamily: MONO, fontWeight: 700, fontSize: 20, color: '#9CC6FF'}}>marge brute</div>
              <svg width={404} height={254}><path d="M 20 200 L 100 170 L 180 180 L 260 120 L 380 80" fill="none" stroke={GREEN} strokeWidth={8} strokeDasharray={500} strokeDashoffset={500 * (1 - prog(t, 46.5, 48.0))} /></svg>
              {t > 47.9 && <div style={{position: 'absolute', right: 20, top: 20, transform: `scale(${spring(t, 47.9)})`}}><F n="bouclier" size={90} /></div>}
            </div>
            <div style={{position: 'absolute', left: 40, right: 40, top: 410, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16}}>{['accidents ↓', 'arrêts de production ↓', 'non-conformités ↓'].map((l, k) => <div key={l} style={{height: 160, borderRadius: 18, background: '#1E2638', border: `3px solid ${GREEN}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', textAlign: 'center', padding: 10, opacity: pop(t, 41.8 + k * 0.3)}}>{l}</div>)}</div>
            {t > 49.06 && <div style={{position: 'absolute', left: 0, right: 0, top: 650, display: 'flex', justifyContent: 'center'}}><div style={{display: 'flex', alignItems: 'center', gap: 12, background: GOLD, borderRadius: 40, padding: '10px 28px', transform: `scale(${spring(t, 49.06)})`}}><F n="pouce" size={60} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK}}>ça lui parle</span></div></div>}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 2 · LE DG « CROISSANCE & MARCHÉS » ═════════════ */
const Croissance: React.FC = () => {
  const t = useT();
  const ph = t < 74.3 ? 0 : 1;
  const miss = prog(t, 72.4, 73.2, easeIn);
  const book = prog(t, 92.9, 93.9, easeInOut);
  return (
    <Out end={102.18}>
      {ph === 0 && (
        <>
          <HiLine words={t < 65.4 ? ['Son', 'obsession', ':', 'la', 'conquête'] : ['À', 'côté', 'de', 'la', 'cible']} mark={t < 65.4 ? [1, 4] : [1, 4]} at={t < 65.4 ? 58.34 : 72.74} y={330} size={58} />
          <Abs x={60} y={440} w={960} h={930}>
            {t < 65.4 ? <>
              <div style={{position: 'absolute', left: 230, top: 40, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #BFE3FF, #2D6FA8)', border: `8px solid ${INK}`, overflow: 'hidden', opacity: pop(t, 54.2)}}>
                {[[120, 140], [300, 110], [210, 300], [360, 300], [100, 330]].map(([x, y], k) => <div key={k} style={{position: 'absolute', left: x, top: y - (1 - pop(t, 59.4 + k * 0.25)) * 100, opacity: pop(t, 59.4 + k * 0.25)}}><div style={{width: 6, height: 70, background: INK}} /><div style={{position: 'absolute', left: 6, top: 0, width: 50, height: 32, background: [GOLD, RED, GREEN, ORANGE, VIO][k], border: `3px solid ${INK}`}} /></div>)}
              </div>
              <div style={{position: 'absolute', left: 0, right: 0, top: 600, display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap'}}><Pill at={59.38} c={BLUE} size={28}>nouveaux marchés</Pill><Pill at={60.66} c={NAVY} size={28}>se démarquer</Pill><Pill at={61.86} c={GOLD} size={28}>booster l’image</Pill></div>
              {t > 64.94 && <Stamp at={64.94} c={RED} text="statu quo = ennemi" x={210} y={720} rot={-5} size={52} />}
            </> : <>
              <div style={{position: 'absolute', left: 520, top: 100, width: 380, height: 380, borderRadius: '50%', background: `repeating-radial-gradient(circle, ${RED} 0 38px, #fff 38px 76px)`, border: `6px solid ${INK}`}} />
              <div style={{position: 'absolute', left: 40, top: 520, width: 520, background: '#fff', border: `5px solid ${INK}`, borderRadius: '30px 30px 30px 6px', padding: '18px 24px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, opacity: pop(t, 67.5)}}>« Nos taux d’accident baissent… »</div>
              <div style={{position: 'absolute', left: lerp(60, 900, miss), top: lerp(440, 40, miss), transform: 'rotate(-20deg)', opacity: pop(t, 69.0)}}><div style={{width: 140, height: 12, background: INK, borderRadius: 6}} /><div style={{position: 'absolute', right: -20, top: -12, width: 0, height: 0, borderLeft: `30px solid ${INK}`, borderTop: '18px solid transparent', borderBottom: '18px solid transparent'}} /></div>
              {t > 70.7 && <div style={{position: 'absolute', left: 0, right: 0, top: 760, textAlign: 'center'}}><Pill at={70.7} c={DIM} size={28}>sans lien avec la réputation de la marque</Pill></div>}
            </>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 92.8 ? ['Développement', 'commercial'] : t < 97.4 ? ['Un', 'passeport', 'commercial'] : ['Un', 'partenaire', 'business']} mark={t < 92.8 ? [0, 1] : [1, 2]} at={t < 92.8 ? 76.02 : t < 97.4 ? 92.9 : 100.18} y={330} size={60} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center', gap: 16, opacity: 1 - book}}>
              {[{l: 'confiance des clients', ic: 'poignee', a: 82.66}, {l: 'sésame : marchés exigeants', ic: 'cle', a: 85.54}, {l: 'crédibilité en flèche', ic: 'hausse', a: 89.38}].map((x) => <div key={x.l} style={{width: 300, height: 320, borderRadius: 24, background: '#fff', border: `5px solid ${BLUE}`, boxShadow: `6px 6px 0 ${BLUE}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, opacity: pop(t, x.a)}}><F n={x.ic} size={110} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, textAlign: 'center', padding: '0 10px'}}>{x.l}</span></div>)}
            </div>
            <div style={{position: 'absolute', left: 130, top: 360, width: 700, height: 460, perspective: 1600, opacity: pop(t, 90.9)}}>
              <div style={{position: 'absolute', left: 350, top: 0, width: 350, height: 460, background: '#0E2A5C', border: `6px solid ${INK}`, borderRadius: '0 18px 18px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}><F n="globe" size={110} /><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: GOLD, textAlign: 'center'}}>PASSEPORT<br />COMMERCIAL</div></div>
              <div style={{position: 'absolute', left: 350, top: 0, width: 350, height: 460, background: '#FFFDF6', border: `6px solid ${INK}`, borderRadius: '18px 0 0 18px', transformOrigin: '0 50%', transform: `rotateY(${-180 * book}deg)`, backfaceVisibility: 'hidden'}} />
              {book > 0.5 && <div style={{position: 'absolute', left: 0, top: 0, width: 350, height: 460, background: '#FFFDF6', border: `6px solid ${INK}`, borderRadius: '18px 0 0 18px', overflow: 'hidden'}}>{[{l: 'CONFIANCE', c: GREEN, x: 30, y: 40, r: -12}, {l: 'MARCHÉS', c: BLUE, x: 140, y: 170, r: 8}, {l: 'CRÉDIBILITÉ', c: RED, x: 40, y: 300, r: -6}].map((s, k) => <div key={s.l} style={{position: 'absolute', left: s.x, top: s.y, border: `5px solid ${s.c}`, borderRadius: 12, padding: '6px 12px', color: s.c, fontFamily: sansFont, fontWeight: 900, fontSize: 24, transform: `rotate(${s.r}deg) scale(${t > 93.6 + k * 0.3 ? spring(t, 93.6 + k * 0.3) : 0})`}}>{s.l}</div>)}</div>}
            </div>
            {t > 98.74 && <div style={{position: 'absolute', left: 0, right: 0, top: 850, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14}}><div style={{position: 'relative'}}><Pill at={98.74} c={DIM} size={26}>fonction support</Pill><div style={{position: 'absolute', left: 8, right: 8, top: '50%'}}><Strike p={prog(t, 99.6, 100.1)} c={RED} /></div></div><Pill at={100.18} c={BLUE} size={26}>partenaire business</Pill></div>}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 3 · LE DG « PERSONNES & CULTURE » ═════════════ */
const Humain: React.FC = () => {
  const t = useT();
  const ph = t < 125.2 ? 0 : t < 146.0 ? 1 : 2;
  const open = prog(t, 129.1, 130.3, easeInOut);
  return (
    <Out end={153.38}>
      {ph === 0 && (
        <>
          <HiLine words={t < 118.1 ? ['L’humain', 'd’abord'] : ['Une', 'équipe', 'soudée']} mark={t < 118.1 ? [0] : [1, 2]} at={t < 118.1 ? 110.98 : 121.22} y={330} size={70} />
          <Shot src={IMG.equipe} ic="equipe" x={60} y={440} w={960} h={380} at={105.9} c={GREEN} />
          <Abs x={60} y={850} w={960} h={520}>
            <div style={{display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap'}}><Pill at={114.1} c={GREEN} size={28}>management</Pill><Pill at={115.1} c={TEAL} size={28}>engagement</Pill><Pill at={116.38} c={NAVY} size={28}>culture d’entreprise</Pill></div>
            <div style={{position: 'absolute', left: 230, top: 110, width: 500, height: 360}}>
              {Array.from({length: 6}, (_, k) => { const a = (k / 6) * Math.PI * 2; const r = lerp(220, 150, prog(t, 121.2, 122.4, easeOut)); return <div key={k} style={{position: 'absolute', left: 250 + Math.cos(a) * r - 45, top: 180 + Math.sin(a) * r * 0.7 - 45}}><F n={['ouvrier', 'salariee', 'ouvrier-dark', 'formatrice', 'intervenant', 'superviseur'][k]} size={90} /></div>; })}
              {t > 123.3 && <div style={{position: 'absolute', left: 190, top: 120, transform: `scale(${spring(t, 123.3) * (1 + 0.06 * Math.sin(t * 5))})`}}><F n="coeur" size={120} /></div>}
            </div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 131.0 ? ['Une', 'histoire', 'humaine'] : ['Le', 'climat', 'de', 'confiance']} mark={t < 131.0 ? [1, 2] : [1, 3]} at={t < 131.0 ? 129.14 : 132.78} y={330} size={64} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 40, top: 0, width: 880, height: 280, background: '#fff', border: `5px solid ${INK}`, borderRadius: 12, opacity: (1 - open) * pop(t, 125.3), display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', overflow: 'hidden'}}>{Array.from({length: 24}, (_, k) => <div key={k} style={{borderRight: '2px solid #E3E8EF', borderBottom: '2px solid #E3E8EF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontSize: 20, color: DIM, background: k < 6 ? '#D8F5E5' : '#fff'}}>{k < 6 ? 'XLS' : '###'}</div>)}<div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 240, color: RED, fontWeight: 900, opacity: prog(t, 127.6, 128.2)}}>✕</div></div>
            <div style={{position: 'absolute', left: 80, top: 260, width: 800, height: 560, perspective: 1600, opacity: pop(t, 128.8)}}>
              <div style={{position: 'absolute', left: 400, top: 0, width: 400, height: 560, background: '#FFFDF6', border: `6px solid ${INK}`, borderRadius: '0 16px 16px 0', padding: 26, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20}}>
                {[{l: 'conditions de travail', ic: 'maison', a: 137.62}, {l: 'comportements préventifs', ic: 'casque', a: 140.78}, {l: 'implication de tous', ic: 'equipe', a: 144.6}].map((x, k) => <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 12, opacity: pop(t, x.a)}}><div style={{fontFamily: handFont, fontSize: 40, color: GREEN}}>{k + 1}.</div><F n={x.ic} size={64} /><span style={{fontFamily: handFont, fontSize: 32, color: INK, lineHeight: 1.1}}>{x.l}</span></div>)}
              </div>
              <div style={{position: 'absolute', left: 400, top: 0, width: 400, height: 560, background: GREEN, border: `6px solid ${INK}`, borderRadius: '0 16px 16px 0', transformOrigin: '0 50%', transform: `rotateY(${-180 * open}deg)`, backfaceVisibility: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff', textAlign: 'center'}}>NOTRE<br />HISTOIRE</div>
              {open > 0.5 && <div style={{position: 'absolute', left: 0, top: 0, width: 400, height: 560, background: '#FFFDF6', border: `6px solid ${INK}`, borderRadius: '16px 0 0 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16}}><F n="poignee" size={140} /><div style={{fontFamily: handFont, fontSize: 38, color: INK, textAlign: 'center'}}>une histoire<br />humaine & collective</div></div>}
            </div>
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Fidéliser', 'les', 'talents']} mark={[0, 2]} at={149.86} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 146.2)}}>
            <div style={{position: 'absolute', left: 390, top: 330, transform: `rotate(${Math.sin(t * 3) * 6}deg)`}}><F n="aimant" size={180} /></div>
            {Array.from({length: 8}, (_, k) => { const a = (k / 8) * Math.PI * 2; const p = prog(t, 149.9 + k * 0.1, 151.2 + k * 0.1, easeInOut); return <div key={k} style={{position: 'absolute', left: 474 + Math.cos(a) * lerp(420, 210, p) - 45, top: 420 + Math.sin(a) * lerp(380, 220, p) - 45}}><F n={k % 2 ? 'salariee' : 'ouvrier'} size={90} /></div>; })}
            <div style={{position: 'absolute', left: 0, right: 0, top: 30, display: 'flex', justifyContent: 'center', gap: 12}}><Pill at={147.34} c={GREEN} size={28}>résonne avec ses convictions</Pill></div>
            {t > 151.14 && <div style={{position: 'absolute', left: 0, right: 0, bottom: 30, display: 'flex', justifyContent: 'center'}}><Pill at={151.14} c={GOLD} size={30}>redonne du sens au boulot</Pill></div>}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 4 · LE LEVIER STRATÉGIQUE ═════════════ */
const Levier: React.FC = () => {
  const t = useT();
  const ph = t < 177.5 ? 0 : 1;
  const move = prog(t, 182.98, 184.6, easeInOut);
  return (
    <Out end={186.06}>
      {ph === 0 && (
        <>
          <HiLine words={t < 169.8 ? ['Un', 'fossé', 'énorme'] : ['Contribuer', 'aux', 'priorités']} mark={t < 169.8 ? [1, 2] : [0, 2]} at={t < 169.8 ? 160.78 : 172.98} y={330} size={66} />
          <SearchOpen x={60} y={440} w={960} h={930} at={157.0} query="levier stratégique" results={['Liste des exigences réglementaires', 'Le levier stratégique de performance', 'Procédures à la chaîne']} found={1} foundAt={159.2} clickAt={159.6} c={VIO}>
            <div style={{position: 'absolute', inset: 0, display: 'flex'}}>
              <div style={{flex: 1, background: '#F4F6FA', padding: 24, display: 'flex', flexDirection: 'column', gap: 18, borderRight: `5px solid ${INK}`}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM}}>présentation traditionnelle</div>{[{l: 'lister les exigences', ic: 'clipboard', a: 165.94}, {l: 'procédures à la chaîne', ic: 'classeur', a: 168.94}].map((x) => <div key={x.l} style={{position: 'relative', height: 140, borderRadius: 18, background: '#fff', border: `4px solid #C9D2DF`, display: 'flex', alignItems: 'center', gap: 12, padding: '0 14px', opacity: pop(t, x.a)}}><F n={x.ic} size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: DIM}}>{x.l}</span></div>)}</div>
              <div style={{flex: 1, background: '#F3EEFF', padding: 24, display: 'flex', flexDirection: 'column', gap: 18}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: VIO}}>approche stratégique</div>
                <div style={{position: 'relative', height: 420, opacity: pop(t, 170.98)}}>{['performance', 'image', 'humain'].map((l, k) => <div key={l} style={{position: 'absolute', left: 30 + k * 130, top: 40 + (k % 2) * 60, width: 140, height: 140, borderRadius: 70, background: [GOLD, BLUE, GREEN][k], border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 20, color: '#fff', transform: `scale(${t > 174.58 + k * 0.2 ? spring(t, 174.58 + k * 0.2) : 0.4})`}}>{l}</div>)}<div style={{position: 'absolute', left: 120, top: 280, width: 200, height: 120, borderRadius: 20, background: VIO, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: '#fff', textAlign: 'center'}}>actions QHSE</div></div>
              </div>
            </div>
          </SearchOpen>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 180.4 ? ['Changer', 'de', 'posture'] : ['Expert', '→', 'conseiller']} mark={t < 180.4 ? [2] : [0, 2]} at={t < 180.4 ? 178.3 : 180.46} y={330} size={66} />
          <Shot src={IMG.conseiller} ic="directeur" x={60} y={440} w={960} h={360} at={177.7} c={VIO} />
          <Abs x={60} y={830} w={960} h={540} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 177.8)}}>
            <div style={{position: 'absolute', left: 520, top: 230, width: 380, height: 160, borderRadius: '50%', background: '#C9A574', border: `6px solid ${INK}`}} />
            {[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 560 + k * 110, top: 120}}><F n="directeur" size={90} /></div>)}
            <div style={{position: 'absolute', left: lerp(60, 640, move), top: lerp(260, 300, move)}}><F n="casque" size={100} /></div>
            <div style={{position: 'absolute', left: 30, top: 30}}><Pill at={180.46} c={DIM} size={26}>expert technique isolé</Pill></div>
            {t > 184.42 && <div style={{position: 'absolute', right: 30, bottom: 30, transform: `scale(${spring(t, 184.42)})`}}><Pill at={184.42} c={VIO} size={28}>conseiller stratégique</Pill></div>}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 5 · UNE QUESTION D'EMBALLAGE ═════════════ */
const Emballage: React.FC = () => {
  const t = useT();
  const ph = t < 197.6 ? 0 : 1;
  const wrap = prog(t, 196.6, 197.5, easeInOut);
  const beams = prog(t, 203.9, 205.9, easeOut);
  return (
    <Out end={212.58}>
      {ph === 0 && (
        <>
          <HiLine words={t < 193.5 ? ['Pas', 'vendre', 'son', 'âme'] : ['Une', 'question', 'd’emballage']} mark={t < 193.5 ? [1, 3] : [2]} at={t < 193.5 ? 189.6 : 196.62} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center', gap: 14}}>{[{l: 'vendre son âme', a: 189.14}, {l: 'changer ses principes', a: 190.26}].map((x) => <div key={x.l} style={{position: 'relative'}}><Pill at={x.a} c={DIM} size={28}>{x.l}</Pill><div style={{position: 'absolute', left: 8, right: 8, top: '50%'}}><Strike p={prog(t, x.a + 1.4, x.a + 1.9)} c={RED} /></div></div>)}</div>
            <div style={{position: 'absolute', left: 280, top: 200, width: 400, height: 400}}>
              <div style={{position: 'absolute', left: 100, top: 100, width: 200, height: 200, background: `linear-gradient(135deg, #DDF4FF, ${BLUE})`, clipPath: 'polygon(50% 0, 100% 35%, 80% 100%, 20% 100%, 0 35%)', boxShadow: `0 0 40px ${BLUE}`, transform: `rotate(${t * 20}deg) scale(${pop(t, 193.58)})`}} />
              <div style={{position: 'absolute', left: 0, right: 0, top: 330, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: BLUE, opacity: pop(t, 194.54)}}>intégrité intacte</div>
              <div style={{position: 'absolute', left: 40, top: 40, width: 320, height: 320, background: ORANGE, border: `8px solid ${INK}`, borderRadius: 20, opacity: wrap, transform: `scale(${lerp(1.4, 1, wrap)})`}}><div style={{position: 'absolute', left: 130, top: 0, width: 44, height: '100%', background: GOLD}} /><div style={{position: 'absolute', top: 130, left: 0, height: 44, width: '100%', background: GOLD}} /><div style={{position: 'absolute', left: 105, top: -50, width: 90, height: 70, borderRadius: '50%', border: `14px solid ${GOLD}`}} /></div>
            </div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 208.0 ? ['Adapter', 'le', 'vocabulaire'] : ['Ça', 'fait', 'tilt']} mark={t < 208.0 ? [0, 2] : [2]} at={t < 208.0 ? 199.38 : 210.86} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 197.8)}}>
            <div style={{position: 'absolute', left: 0, top: 300, width: 380, height: 16, background: '#fff', boxShadow: '0 0 20px #fff', transform: `scaleX(${prog(t, 199.4, 200.5)})`, transformOrigin: '0 50%'}} />
            <div style={{position: 'absolute', left: 30, top: 230, background: '#fff', borderRadius: 12, padding: '6px 14px', fontFamily: MONO, fontWeight: 700, fontSize: 20, color: INK, opacity: pop(t, 200.46)}}>valeur ajoutée QHSE</div>
            <div style={{position: 'absolute', left: 360, top: 180, width: 0, height: 0, borderLeft: '120px solid transparent', borderRight: '120px solid transparent', borderBottom: `220px solid #DDEBFF`, opacity: 0.9}} />
            {PROFILS.map((p, k) => { const ang = (k - 1) * 22; return <div key={p.l} style={{position: 'absolute', left: 560, top: 300, width: 400 * beams, height: 14, background: p.c, boxShadow: `0 0 20px ${p.c}`, transform: `rotate(${ang}deg)`, transformOrigin: '0 50%'}} />; })}
            {PROFILS.map((p, k) => <div key={`c${p.l}`} style={{position: 'absolute', left: 700, top: 120 + k * 180, width: 220, height: 140, borderRadius: 20, background: '#fff', border: `5px solid ${p.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: pop(t, [204.02, 204.98, 205.78][k]), transform: `scale(${t > [204.02, 204.98, 205.78][k] ? spring(t, [204.02, 204.98, 205.78][k]) : 0.5})`}}><F n={p.ic} size={60} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK}}>{['finances', 'parts de marché', 'humain'][k]}</span></div>)}
            {t > 208.1 && <div style={{position: 'absolute', left: 120, top: 560, transform: `scale(${spring(t, 208.1)})`}}><F n="ampoule" size={180} /></div>}
            {t > 210.86 && <div style={{position: 'absolute', left: 340, top: 640}}><Pill at={210.86} c={GREEN} size={32}>l’adhésion</Pill></div>}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 6 · LE BON LANGAGE ═════════════ */
const Conclusion: React.FC = () => {
  const t = useT();
  const ph = t < 231.8 ? 0 : 1;
  const lift = prog(t, 225.9, 227.6, easeInOut);
  return (
    <Out end={OUTRO_AT}>
      {ph === 0 && (
        <>
          <HiLine words={t < 225.0 ? ['Pas', 'une', 'dépense'] : ['Un', 'levier', 'surpuissant']} mark={t < 225.0 ? [2] : [1, 2]} at={t < 225.0 ? 221.22 : 225.94} y={330} size={68} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center', gap: 12, opacity: pop(t, 216.4)}}>{['qualité', 'hygiène', 'sécurité', 'environnement'].map((l, k) => <div key={l} style={{width: 222, height: 90, borderRadius: 16, background: [BLUE, TEAL, RED, GREEN][k], border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: '#fff', opacity: pop(t, 216.4 + k * 0.4)}}>{l}</div>)}</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 130, display: 'flex', justifyContent: 'center'}}><div style={{position: 'relative'}}><Pill at={222.22} c={DIM} size={32}>simple dépense contrainte</Pill><div style={{position: 'absolute', left: 10, right: 10, top: '50%'}}><Strike p={prog(t, 223.0, 223.5)} c={RED} /></div></div></div>
            <div style={{position: 'absolute', left: 380, top: 700, width: 0, height: 0, borderLeft: '70px solid transparent', borderRight: '70px solid transparent', borderBottom: `120px solid ${INK}`, opacity: pop(t, 224.0)}} />
            <div style={{position: 'absolute', left: 60, top: 690, width: 840, height: 24, background: '#8A5A2B', border: `4px solid ${INK}`, borderRadius: 12, transformOrigin: '400px 50%', transform: `rotate(${lerp(-10, 12, lift)}deg)`, opacity: pop(t, 224.0)}}>
              <div style={{position: 'absolute', left: 20, top: -330, width: 300, height: 330, background: 'linear-gradient(135deg, #C9C2B2, #8C8577)', border: `6px solid ${INK}`, borderRadius: '40% 30% 20% 30%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, transform: `rotate(${lerp(10, -12, lift)}deg)`}}>{[{l: 'performance', a: 227.06}, {l: 'compétitivité', a: 227.98}, {l: 'pérennité', a: 229.78}].map((x) => <div key={x.l} style={{background: '#fff', borderRadius: 10, padding: '4px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK, opacity: pop(t, x.a)}}>{x.l}</div>)}</div>
              <div style={{position: 'absolute', right: 0, top: -120 + lift * 20}}><F n="main-levee" size={110} /></div>
            </div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 240.3 ? ['Un', 'avenir', 'durable'] : ['Quel', 'langage', '?']} mark={t < 240.3 ? [1, 2] : [1]} at={t < 240.3 ? 234.18 : 240.42} y={330} size={70} />
          <Shot src={IMG.reunion} ic="equipe" x={60} y={440} w={960} h={340} at={232.0} c={RED} blinds />
          <Abs x={60} y={810} w={960} h={560}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16}}><Pill at={231.82} c={TEAL} size={28}>normes maîtrisées aujourd’hui</Pill><span style={{fontSize: 40, fontWeight: 900, color: INK, opacity: pop(t, 233.4)}}>→</span><Pill at={234.18} c={GREEN} size={28}>avenir durable demain</Pill></div>
            <div style={{position: 'absolute', left: 230, top: 200, width: 500, height: 220, borderRadius: '50%', background: '#C9A574', border: `6px solid ${INK}`, opacity: pop(t, 236.9)}} />
            {PROFILS.map((p, k) => <div key={p.l} style={{position: 'absolute', left: [110, 400, 690][k], top: [120, 80, 120][k], width: 160, height: 140, borderRadius: 20, background: p.c, border: `5px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 237.3 + k * 0.2)}}><F n={p.ic} size={60} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 20, color: '#fff'}}>DG {p.l}</span></div>)}
            {t > 240.42 && <div style={{position: 'absolute', left: 420, top: 240, width: 120, height: 120, borderRadius: 60, background: '#fff', border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: RED, transform: `scale(${spring(t, 240.42)})`}}>?</div>}
            {t > 244.84 && <div style={{position: 'absolute', left: 0, right: 0, top: 460, textAlign: 'center'}}><Pill at={244.84} c={GOLD} size={34}>à méditer</Pill></div>}
          </Abs>
          {t > 243.7 && <Dust n={24} c={GOLD} />}
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
  ...rep(6.0, 8, 0.5, 'tick', 0.12), {at: 10.3, s: 'soft-whoosh', v: 0.3, dur: 1}, ...rep(13.9, 8, 0.33, 'sfx/click', 0.18), {at: 16.6, s: 'sfx/ding', v: 0.25}, {at: 21.3, s: 'soft-whoosh', v: 0.3, dur: 1.6},
  {at: 23.8, s: 'soft-whoosh', v: 0.3, dur: 1}, ...[29.38, 30.9, 33.7, 35.34].map((a) => ({at: a, s: 'sfx/swish', v: 0.25})),
  {at: 38.3, s: 'sfx/whoosh', v: 0.25}, ...pops([41.8, 42.1, 42.4]), {at: 44.6, s: 'sfx/swish', v: 0.3}, {at: 45.6, s: 'sfx/ding', v: 0.25}, {at: 49.06, s: 'validation', v: 0.3},
  ...rep(59.4, 5, 0.25, 'sfx/thud', 0.2), ...pops([59.38, 60.66, 61.86]), {at: 64.94, s: 'tampon', v: 0.55}, {at: 69.0, s: 'sfx/whoosh', v: 0.3}, {at: 72.4, s: 'sfx/swish', v: 0.35}, {at: 73.2, s: 'deep-hit', v: 0.3},
  ...[82.66, 85.54, 89.38].map((a) => ({at: a, s: 'sfx/pop', v: 0.22})), {at: 85.6, s: 'cadenas', v: 0.4}, {at: 92.9, s: 'page', v: 0.4}, ...[93.6, 93.9, 94.2].map((a) => ({at: a, s: 'tampon', v: 0.3})), {at: 99.6, s: 'sfx/swish', v: 0.3}, {at: 100.18, s: 'validation', v: 0.3},
  {at: 105.9, s: 'soft-whoosh', v: 0.3, dur: 1}, ...pops([114.1, 115.1, 116.38]), {at: 121.2, s: 'soft-whoosh', v: 0.3, dur: 1.2}, {at: 123.3, s: 'sfx/ding', v: 0.25},
  {at: 125.3, s: 'sfx/pop', v: 0.2}, {at: 127.6, s: 'sfx/swish', v: 0.35}, {at: 129.1, s: 'page', v: 0.45}, ...pops([137.62, 140.78, 144.6]),
  {at: 146.2, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 149.9, s: 'sfx/rise', v: 0.25, dur: 1.4}, {at: 151.14, s: 'validation', v: 0.3},
  ...searchCues(157.0, 18, 159.2, 159.6), ...pops([165.94, 168.94]), ...[174.58, 174.78, 174.98].map((a) => ({at: a, s: 'sfx/thud', v: 0.25})),
  {at: 177.7, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 182.98, s: 'soft-whoosh', v: 0.35, dur: 1.6}, {at: 184.42, s: 'validation', v: 0.3},
  ...[190.5, 191.6].map((a) => ({at: a, s: 'sfx/swish', v: 0.3})), {at: 193.58, s: 'sfx/rise', v: 0.25, dur: 1}, {at: 196.6, s: 'soft-whoosh', v: 0.4, dur: 1}, {at: 197.5, s: 'sfx/thud', v: 0.35},
  {at: 199.4, s: 'sfx/rise', v: 0.25, dur: 1.1}, ...[204.02, 204.98, 205.78].map((a) => ({at: a, s: 'sfx/ding', v: 0.22})), {at: 208.1, s: 'sfx/pop', v: 0.3}, {at: 210.86, s: 'validation', v: 0.3},
  ...rep(216.4, 4, 0.4, 'sfx/pop', 0.18), {at: 223.0, s: 'sfx/swish', v: 0.3}, {at: 225.9, s: 'sfx/rise', v: 0.3, dur: 1.7}, {at: 227.6, s: 'bass-hit', v: 0.4}, ...pops([227.98, 229.78]),
  {at: 232.0, s: 'soft-whoosh', v: 0.35, dur: 1}, ...rep(232.1, 10, 0.05, 'sfx/click', 0.12), {at: 240.42, s: 'sfx/ding', v: 0.3}, {at: 244.84, s: 'bass-hit', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<TK, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
export const LangageDg: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={5.9} to={50.75}><Financier /></Gate>
    <Gate from={53.9} to={102.25}><Croissance /></Gate>
    <Gate from={105.6} to={153.45}><Humain /></Gate>
    <Gate from={156.8} to={186.15}><Levier /></Gate>
    <Gate from={189.3} to={212.65}><Emballage /></Gate>
    <Gate from={215.8} to={OUTRO_AT}><Conclusion /></Gate>
    {SECT.map((x, i) => { const C = TRANS[x.k]; return <Gate key={x.n} from={x.at} to={x.at + 3.7}><C i={i} /></Gate>; })}
    <Gate from={10} to={232}><StationBanner /></Gate>
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={246.1}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-langage-dg-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Tile, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, spring, LoupeSweep, PneuDeliver, Shine, Count, BURG, YEL, handFont, Board, random, Strike, TEAL, PhotoLetter, Watermark, ORANGE];
