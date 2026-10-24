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
 * « Les affichages obligatoires » (3 min 57) — capsule « condensé + effet wahou + ultra premium » présentée en métro :
 * 8 stations (socle → contacts → DUER → convention → valeurs → horaires → incendie → culture). Voix d'origine (sans
 * musique de fond), sous-titres calés mot à mot. Couverture : photo + « AFFICHAGES OBLIGATOIRES » en lettres-photos
 * animées. Fil rouge : un tableau en liège qui se trie et se remplit ; tube pneumatique à six guichets calés sur les
 * vraies parties (socle → juridique → temps de travail → incendie → culture → le mur parle) ; gyrophare (transition
 * principale), loupe et capsule pneumatique plein écran ; store vénitien ; barre de recherche qui ouvre le socle.
 */
const IMG = {
  cover: 'heures-gen/panneau.jpg',
  cAff: 'influence-gen/tiroir.jpg',
  cObl: 'heures-gen/pointage.jpg',
  socle: 'integration/responsable.jpg',
  horaires: 'heures-gen/pointage.jpg',
  extincteur: 'permisfeu/extincteur.jpg',
  final: 'ishikawa-gen/final.jpg',
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
const OUTRO_AT = 237.6;
export const AFFICH_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 35.22, n: '1', title: 'Le socle d’information', s: 'la carte d’identité', c: BLUE, g: 'socle', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 84.9, n: '2', title: 'La dimension juridique', s: 'le Code du travail mural', c: VIO, g: 'juridique', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 135.78, n: '3', title: 'Le temps de travail', s: 'noir sur blanc', c: TEAL, g: 'temps', k: 'loupe', lab: 'PARTIE 3 / 6'},
  {at: 154.1, n: '4', title: 'La sécurité incendie', s: 'peut sauver des vies', c: RED, g: 'incendie', k: 'tube', lab: 'PARTIE 4 / 6'},
  {at: 196.18, n: '5', title: 'Une culture d’entreprise', s: 'pas des cases à cocher', c: GOLD, g: 'culture', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 220.94, n: '6', title: 'Ce mur parle-t-il ?', s: 'la question finale', c: GREEN, g: 'le mur parle', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 235.3;
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
  {n: 1, l: 'Le socle : la carte d’identité', s: 'socle', at: 42.1},
  {n: 2, l: 'Inspection, médecin, urgences', s: 'contacts', at: 67.46},
  {n: 3, l: 'Évaluation des risques & règlement', s: 'DUER', at: 75.74},
  {n: 4, l: 'La convention collective', s: 'convention', at: 101.34},
  {n: 5, l: 'Le cœur des valeurs', s: 'valeurs', at: 115.43},
  {n: 6, l: 'Horaires, repos, congés', s: 'horaires', at: 141.66},
  {n: 7, l: 'Consignes incendie', s: 'incendie', at: 167.78},
  {n: 8, l: 'Une culture d’entreprise', s: 'culture', at: 209.86},
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

/** Note punaisée sur le liège. */
const Note: React.FC<{x: number; y: number; w: number; h: number; c: string; rot: number; children?: React.ReactNode; o?: number; glow?: boolean; style?: React.CSSProperties}> = ({x, y, w, h, c, rot, children, o = 1, glow, style}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, background: c, transform: `rotate(${rot}deg)`, boxShadow: glow ? `0 0 28px ${YEL}, 3px 6px 10px rgba(0,0,0,0.25)` : '3px 6px 10px rgba(0,0,0,0.25)', opacity: o, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, padding: 8, boxSizing: 'border-box', ...style}}>
    <div style={{position: 'absolute', top: -10, left: w / 2 - 10, width: 20, height: 20, borderRadius: 10, background: RED, boxShadow: '0 2px 2px rgba(0,0,0,0.4)'}} />
    {children}
  </div>
);
const Cork: React.FC<{children?: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div style={{position: 'absolute', inset: 0, borderRadius: 24, border: `16px solid #8A5A2B`, background: '#C9955B', backgroundImage: 'radial-gradient(#B07A43 1.5px, transparent 1.5px), radial-gradient(#D9A86C 1.5px, transparent 1.5px)', backgroundSize: '14px 14px, 22px 22px', backgroundPosition: '0 0, 7px 7px', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.25)', overflow: 'hidden', ...style}}>{children}</div>
);
const NL: React.FC<{t: string; s?: number; c?: string}> = ({t, s = 22, c = INK}) => <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: s, color: c, textAlign: 'center', lineHeight: 1.1}}>{t}</div>;

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="tableau" w={1080} h={800} pos="60% 30%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 22%, ${PAPER}CC 30%, ${PAPER} 35%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-start', paddingLeft: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={560} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: '#fff', background: NAVY, padding: '8px 24px', borderRadius: 8}}>OBLIGATION LÉGALE · ENTREPRISE</div></Abs>
      <Abs x={0} y={650} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="AFFICHAGES" src={IMG.cAff} size={128} ls={0} /></Abs>
      <Abs x={0} y={800} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="OBLIGATOIRES" src={IMG.cObl} size={106} ls={0} seed={3} /></Abs>
      <Abs x={90} y={960} w={900} h={300}><Cork>
        {[{l: 'contacts', ic: 'telephone', c: '#FFF6A8'}, {l: 'droits', ic: 'balance', c: '#CDEBFF'}, {l: 'horaires', ic: 'chrono', c: '#D8F5E5'}, {l: 'incendie', ic: 'extincteur', c: '#FFD6D1'}].map((n, k) => <Note key={n.l} x={30 + k * 210} y={50} w={180} h={190} c={n.c} rot={[-4, 3, -2, 5][k]}><F n={n.ic} size={70} /><NL t={n.l} /></Note>)}
      </Cork></Abs>
      <Abs x={0} y={1290} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 40, color: INK}}>ce que <span style={{color: RED}}>les murs</span> doivent nous dire</Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO : le panneau en liège ═════════════ */
const MESS = Array.from({length: 16}, (_, k) => ({x: 20 + (k % 4) * 215 + (random(`mx${k}`) - 0.5) * 60, y: 30 + Math.floor(k / 4) * 190 + (random(`my${k}`) - 0.5) * 40, rot: (random(`mr${k}`) - 0.5) * 24, c: ['#FFF6A8', '#FFD6D1', '#CDEBFF', '#E8E3D6', '#D8F5E5'][k % 5], keep: [1, 6, 9, 14].includes(k)}));
const KEEP_L = ['inspection du travail', 'consignes incendie', 'horaires', 'convention collective'];
const Intro: React.FC = () => {
  const t = useT();
  const ph = t < 16.4 ? 0 : 1;
  const tri = prog(t, 27.7, 29.6, easeIn);
  return (
    <Out end={35.22}>
      {ph === 0 && (
        <>
          <HiLine words={t < 9.4 ? ['Les', 'affichages', 'obligatoires'] : ['Une', 'obligation', 'légale']} mark={t < 9.4 ? [1, 2] : [1, 2]} at={t < 9.4 ? 7.34 : 10.78} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 20, display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="AFFICHAGES" src={IMG.cAff} size={120} ls={0} /></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 220, display: 'flex', justifyContent: 'center', gap: 20, alignItems: 'center'}}><div style={{position: 'relative'}}><Pill at={10.34} c={DIM} size={34}>paperasse</Pill><div style={{position: 'absolute', left: 10, right: 10, top: '50%'}}><Strike p={prog(t, 10.8, 11.3)} c={RED} /></div></div><Pill at={10.78} c={NAVY} size={34}>obligation légale</Pill></div>
            <div style={{position: 'absolute', left: 160, top: 360, width: 640, height: 480, background: '#E8E3D6', border: `8px solid ${INK}`, borderRadius: 10, backgroundImage: 'linear-gradient(#D9D2C2 2px, transparent 2px), linear-gradient(90deg, #D9D2C2 2px, transparent 2px)', backgroundSize: '80px 40px', opacity: pop(t, 13.6)}}>
              <div style={{position: 'absolute', left: 140, top: 100, background: '#fff', border: `5px solid ${INK}`, borderRadius: '30px 30px 30px 6px', padding: '18px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK, transform: `scale(${t > 14.82 ? spring(t, 14.82) : 0})`}}>« Lisez-moi ! »</div>
              <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM}}>le mur du bureau</div>
            </div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 25.7 ? ['Le', 'panneau', 'en', 'liège'] : ['Faire', 'le', 'tri']} mark={t < 25.7 ? [1, 3] : [0, 2]} at={t < 25.7 ? 19.02 : 26.58} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            <Cork>
              {MESS.map((n, k) => { const fly = n.keep ? 0 : tri; const ki = [1, 6, 9, 14].indexOf(k); return <Note key={k} x={n.x + fly * (k % 2 ? 900 : -900)} y={n.y + fly * 600} w={190} h={160} c={n.keep && t > 27.7 ? '#FFF6A8' : n.c} rot={n.rot + fly * 180} o={pop(t, 19.2 + k * 0.12) * (1 - fly)} glow={n.keep && t > 27.7}>{n.keep && t > 27.7 ? <NL t={KEEP_L[ki]} s={22} /> : <><div style={{width: 120, height: 10, background: '#00000022', borderRadius: 5}} /><div style={{width: 90, height: 10, background: '#00000022', borderRadius: 5}} /><div style={{width: 110, height: 10, background: '#00000022', borderRadius: 5}} /></>}</Note>; })}
            </Cork>
            {t > 27.7 && <div style={{position: 'absolute', right: 30, bottom: -20, transform: `scale(${spring(t, 27.7)})`}}><F n="poubelle" size={150} /></div>}
            {t > 24.26 && t < 27.7 && <div style={{position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center'}}><Pill at={24.26} c={RED} size={34}>difficile de s’y retrouver…</Pill></div>}
            {t > 30.18 && <div style={{position: 'absolute', left: 30, bottom: 30}}><Pill at={30.18} c={DIM} size={26}>ce qui a fait son temps → poubelle</Pill></div>}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 1 · LE SOCLE ═════════════ */
const Socle: React.FC = () => {
  const t = useT();
  const ph = t < 60.2 ? 0 : 1;
  return (
    <Out end={84.9}>
      {ph === 0 && (
        <>
          <HiLine words={t < 46.9 ? ['La', 'carte', 'd’identité'] : ['4', 'grands', 'thèmes']} mark={t < 46.9 ? [1, 2] : [0, 2]} at={t < 46.9 ? 38.7 : 47.34} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 60, top: 0, width: 840, height: 420, borderRadius: 34, background: 'linear-gradient(135deg, #E8F1FF, #fff)', border: `6px solid ${INK}`, boxShadow: `10px 10px 0 ${BLUE}`, opacity: pop(t, 38.6), transform: `perspective(1200px) rotateY(${(1 - prog(t, 38.6, 39.6, easeOut)) * 70}deg)`, overflow: 'hidden'}}>
              <div style={{height: 70, background: BLUE, display: 'flex', alignItems: 'center', padding: '0 26px', fontFamily: MONO, fontWeight: 700, fontSize: 26, color: '#fff', letterSpacing: 2}}>CARTE D’IDENTITÉ · ENTREPRISE</div>
              <div style={{position: 'absolute', left: 30, top: 100, width: 220, height: 260, borderRadius: 18, background: '#fff', border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Img src={staticFile(LOGO)} style={{width: 190}} /></div>
              {['visible par tous les salariés', 'le socle, la base de tout', 'sécurité & transparence'].map((l, k) => <div key={l} style={{position: 'absolute', left: 290, top: 120 + k * 80, right: 30, height: 56, borderBottom: `3px dashed ${BLUE}66`, fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, opacity: pop(t, [40.22, 42.1, 44.0][k])}}>{l}</div>)}
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 470, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18}}>
              {[{l: 'contacts importants', ic: 'telephone', a: 49.7, c: BLUE}, {l: 'horaires & organisation', ic: 'chrono', a: 52.42, c: TEAL}, {l: 'textes du secteur', ic: 'livres', a: 55.3, c: VIO}, {l: 'congés', ic: 'soleil', a: 57.9, c: GOLD}].map((x, k) => <div key={x.l} style={{height: 200, borderRadius: 22, background: '#fff', border: `5px solid ${x.c}`, boxShadow: `6px 6px 0 ${x.c}`, display: 'flex', alignItems: 'center', gap: 14, padding: '0 20px', opacity: pop(t, x.a), transform: `translateY(${(1 - pop(t, x.a)) * 60}px)`}}><div style={{width: 60, height: 60, borderRadius: 30, background: x.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{k + 1}</div><F n={x.ic} size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK}}>{x.l}</span></div>)}
            </div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 78.8 ? ['Vers', 'qui', 'se', 'tourner', '?'] : ['Où', 'sont', 'les', 'règles']} mark={t < 78.8 ? [3] : [3]} at={t < 78.8 ? 65.38 : 81.94} y={330} size={64} />
          <SearchOpen x={60} y={440} w={960} h={930} at={60.4} query="socle d’affichage obligatoire" results={['Menu de la cantine', 'Le socle d’affichage obligatoire', 'Tableau des anniversaires']} found={1} foundAt={62.4} clickAt={62.7} c={BLUE}>
            <div style={{position: 'absolute', inset: 0}}><Cork style={{borderRadius: 0, border: 'none'}}>
              {[{l: 'inspection du travail', ic: 'detective', a: 67.46, x: 40, y: 50, c: '#CDEBFF'}, {l: 'médecin du travail', ic: 'medecin', a: 68.74, x: 340, y: 40, c: '#D8F5E5'}, {l: 'numéros d’urgence', ic: 'sirene', a: 69.98, x: 640, y: 60, c: '#FFD6D1'}, {l: 'évaluation des risques', ic: 'danger', a: 75.74, x: 120, y: 420, c: '#FFF6A8'}, {l: 'règlement intérieur', ic: 'parchemin', a: 78.02, x: 520, y: 430, c: '#E8E3D6'}].map((n, k) => <Note key={n.l} x={n.x} y={n.y - (1 - pop(t, n.a)) * 300} w={260} h={300} c={n.c} rot={[-4, 2, 5, -3, 4][k]} o={pop(t, n.a)}><F n={n.ic} size={110} /><NL t={n.l} s={28} /></Note>)}
            </Cork></div>
          </SearchOpen>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 2 · LA DIMENSION JURIDIQUE ═════════════ */
const Juridique: React.FC = () => {
  const t = useT();
  const ph = t < 98.0 ? 0 : t < 115.4 ? 1 : 2;
  const fly = prog(t, 90.86, 92.3, easeInOut);
  const stack = prog(t, 106.1, 107.3, easeOut);
  return (
    <Out end={135.78}>
      {ph === 0 && (
        <>
          <HiLine words={['Le', 'Code', 'du', 'travail', 'mural']} mark={[1, 4]} at={89.9} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 40, top: 300, width: 260, height: 340, borderRadius: 14, background: RED, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: '#fff', textAlign: 'center', opacity: pop(t, 88.4)}}>CODE DU TRAVAIL</div>
            <div style={{position: 'absolute', left: 400, top: 80, width: 520, height: 760, background: '#E8E3D6', border: `8px solid ${INK}`, borderRadius: 12, opacity: pop(t, 89.0)}} />
            {Array.from({length: 6}, (_, k) => <div key={k} style={{position: 'absolute', left: lerp(110, 440 + (k % 2) * 240, fly), top: lerp(380, 120 + Math.floor(k / 2) * 240, fly), width: 200, height: 210, background: '#fff', border: `4px solid ${INK}`, transform: `rotate(${lerp(0, (k % 3) * 4 - 4, fly) + Math.sin(fly * Math.PI) * 40}deg)`, opacity: t > 90.86 ? 1 : 0, display: 'flex', flexDirection: 'column', gap: 10, padding: 18, boxSizing: 'border-box'}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: RED}}>ART. L.</div>{[0, 1, 2, 3].map((j) => <div key={j} style={{height: 8, background: '#E3E8EF', borderRadius: 4}} />)}</div>)}
            <div style={{position: 'absolute', left: 0, right: 0, top: 860, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={94.46} c={GREEN} size={30}>juste</Pill><Pill at={95.58} c={BLUE} size={30}>respectueux</Pill></div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['La', 'convention', 'collective']} mark={[1, 2]} at={101.34} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 180, top: 520, width: 600, height: 200, borderRadius: 18, background: RED, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: '#fff', opacity: pop(t, 104.74)}}>Code du travail</div>
            <div style={{position: 'absolute', left: 230, top: lerp(-200, 330, stack), width: 500, height: 180, borderRadius: 18, background: VIO, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff', opacity: stack}}>convention collective</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 40, display: 'flex', justifyContent: 'center', gap: 20}}>{[{l: 'métallurgie', ic: 'usine', a: 110.26}, {l: 'commerce', ic: 'colis', a: 111.3}].map((x) => <div key={x.l} style={{width: 280, height: 200, borderRadius: 22, background: '#fff', border: `5px solid ${VIO}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, opacity: pop(t, x.a), transform: `scale(${t > x.a ? spring(t, x.a) : 0.6})`}}><F n={x.ic} size={90} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK}}>{x.l}</span></div>)}</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 770, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={113.38} c={VIO} size={28}>laquelle s’applique</Pill><Pill at={114.46} c={NAVY} size={28}>où la lire</Pill></div>
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Le', 'cœur', 'des', 'valeurs']} mark={[1, 3]} at={115.43} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930}><Cork>
            {[{l: 'égalité de salaire', ic: 'balance', a: 122.34, c: '#CDEBFF', x: 40, y: 50}, {l: 'contre toute discrimination', ic: 'poignee', a: 123.38, c: '#FFF6A8', x: 480, y: 40}, {l: 'sans harcèlement', ic: 'bouclier', a: 128.62, c: '#D8F5E5', x: 60, y: 440}, {l: 'interdiction de fumer & vapoter', ic: 'sens-interdit', a: 129.94, c: '#FFD6D1', x: 500, y: 430}].map((n, k) => <Note key={n.l} x={n.x} y={n.y - (1 - pop(t, n.a)) * 300} w={360} h={330} c={n.c} rot={[-3, 4, 3, -4][k]} o={pop(t, n.a)}><F n={n.ic} size={120} /><NL t={n.l} s={30} /></Note>)}
            {t > 118.18 && t < 122.3 && <div style={{position: 'absolute', left: 0, right: 0, top: 340, textAlign: 'center'}}><Pill at={118.18} c={NAVY} size={34}>pas là pour faire joli</Pill></div>}
            {t > 134.26 && <div style={{position: 'absolute', left: 330, top: 300, transform: `scale(${spring(t, 134.26)})`}}><F n="coeur" size={240} /></div>}
          </Cork></Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 3 · LE TEMPS DE TRAVAIL ═════════════ */
const Temps: React.FC = () => {
  const t = useT();
  const DAYS = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];
  return (
    <Out end={154.1}>
      <HiLine words={t < 146.8 ? ['La', 'clarté'] : ['Noir', 'sur', 'blanc']} mark={t < 146.8 ? [1] : [0, 2]} at={t < 146.8 ? 140.66 : 147.1} y={330} size={72} />
      <Shot src={IMG.horaires} ic="chrono" x={60} y={440} w={960} h={300} at={139.3} c={TEAL} />
      <Abs x={60} y={770} w={960} h={600} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 139.5)}}>
        <div style={{display: 'flex', borderBottom: `4px solid ${INK}`}}>{DAYS.map((d) => <div key={d} style={{flex: 1, height: 60, background: TEAL, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '2px solid #fff'}}>{d}</div>)}</div>
        <div style={{display: 'flex', height: 300}}>{DAYS.map((d, k) => <div key={d} style={{flex: 1, borderRight: '2px solid #E3E8EF', position: 'relative'}}>{k < 5 ? <div style={{position: 'absolute', left: 10, right: 10, top: 30, height: 200 * prog(t, 141.66 + k * 0.12, 142.3 + k * 0.12, easeOut), background: `${TEAL}AA`, borderRadius: 10}} /> : <div style={{position: 'absolute', left: 10, right: 10, top: 30, height: 200, background: '#FFF6DA', borderRadius: 10, opacity: pop(t, 142.94), display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="canape" size={50} /></div>}</div>)}</div>
        <div style={{position: 'absolute', left: 20, right: 20, bottom: 20, display: 'flex', gap: 12, flexWrap: 'wrap'}}><Pill at={141.66} c={TEAL} size={26}>horaires de l’équipe</Pill><Pill at={142.94} c={GOLD} size={26}>droit au repos</Pill><Pill at={144.94} c={ORANGE} size={26}>congés payés</Pill><Pill at={148.9} c={NAVY} size={26}>travailleurs temporaires</Pill><Pill at={152.18} c={GREEN} size={26}>même niveau d’information</Pill></div>
      </Abs>
    </Out>
  );
};

/* ═════════════ 4 · LA SÉCURITÉ INCENDIE ═════════════ */
const Incendie: React.FC = () => {
  const t = useT();
  const ph = t < 175.2 ? 0 : 1;
  const panic = t > 174.18 && t < 175.2 ? Math.sin(t * 60) * 10 : 0;
  const secs = Math.max(0, 10 - Math.floor((t - 179.22) * 3));
  return (
    <Out end={196.18}>
      {ph === 0 && (
        <>
          <HiLine words={t < 167.6 ? ['Peut', 'sauver', 'des', 'vies'] : t < 173.9 ? ['Départ', 'de', 'feu'] : ['Pire', 'ennemi', ':', 'la', 'panique']} mark={t < 167.6 ? [1, 3] : t < 173.9 ? [0, 2] : [1, 4]} at={t < 167.6 ? 158.54 : t < 173.9 ? 167.78 : 174.18} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={930} style={{transform: `translateX(${panic}px)`}}>
            <div style={{position: 'absolute', left: 120, top: 0, width: 720, height: 860, background: RED, border: `8px solid ${INK}`, borderRadius: 20, boxShadow: `0 0 ${30 + 20 * Math.sin(t * 8)}px ${RED}`, opacity: pop(t, 157.8), display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 30, boxSizing: 'border-box', gap: 20}}>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 54, color: '#fff', textAlign: 'center', lineHeight: 1.05}}>EN CAS<br />D’INCENDIE</div>
              <div style={{width: '100%', flex: 1, background: '#fff', borderRadius: 14, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24, padding: 30, boxSizing: 'border-box'}}>
                {[{l: 'alerter', ic: 'sirene', a: 162.42}, {l: 'évacuer', ic: 'porte', a: 163.1}, {l: 'se rassembler', ic: 'equipe', a: 164.22}].map((x, k) => <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 20, opacity: pop(t, x.a)}}><div style={{width: 70, height: 70, borderRadius: 35, background: RED, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{k + 1}</div><F n={x.ic} size={90} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK}}>{x.l}</span></div>)}
              </div>
              <div style={{display: 'flex', gap: 12}}><Pill at={168.86} c={INK} size={26}>pas d’improvisation</Pill><Pill at={172.06} c={GOLD} size={26}>ultra visible</Pill></div>
            </div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 184.4 ? ['Chaque', 'seconde', 'compte'] : t < 194.0 ? ['Le', 'guide', 'de', 'survie'] : ['Préparé', 'au', 'pire']} mark={t < 184.4 ? [1, 2] : t < 194.0 ? [1, 3] : [0, 2]} at={t < 184.4 ? 180.58 : t < 194.0 ? 184.54 : 195.06} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            {t < 184.4 ? <div style={{position: 'absolute', left: 230, top: 60, width: 500, height: 500, borderRadius: '50%', border: `12px solid ${INK}`, background: `conic-gradient(${RED} ${(secs / 10) * 360}deg, #E3E8EF 0deg)`, opacity: pop(t, 175.4)}}><div style={{position: 'absolute', inset: 70, borderRadius: '50%', background: '#fff', border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 150, color: RED}}>{t > 179.22 ? secs : 10}</div></div> : <>
              <div style={{position: 'absolute', left: 0, top: 0, width: 960, height: 760, background: '#FFFDF6', border: `6px solid ${INK}`, borderRadius: 20, overflow: 'hidden'}}>
                <div style={{position: 'absolute', left: 16, top: 12, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: GREEN}}>PLAN D’ÉVACUATION</div>
                {[[60, 80, 380, 300], [480, 80, 420, 300], [60, 420, 840, 280]].map(([x, y, w, h], k) => <div key={k} style={{position: 'absolute', left: x, top: y, width: w, height: h, border: `6px solid ${INK}`, background: k === 2 ? '#F4F6FA' : '#fff'}} />)}
                <svg width={948} height={748} style={{position: 'absolute', left: 0, top: 0}}><path d="M 250 230 L 250 560 L 860 560" fill="none" stroke={GREEN} strokeWidth={10} strokeDasharray="22 14" strokeDashoffset={-t * 60} /></svg>
                <div style={{position: 'absolute', left: 870, top: 520, width: 60, height: 80, background: GREEN, border: `4px solid ${INK}`}} />
                <div style={{position: 'absolute', left: 230, top: 210, width: 40, height: 40, borderRadius: 20, background: BLUE, border: '4px solid #fff', boxShadow: `0 0 0 ${8 + 6 * Math.sin(t * 5)}px ${BLUE}55`}} /><div style={{position: 'absolute', left: 180, top: 160, fontFamily: MONO, fontWeight: 700, fontSize: 18, color: BLUE}}>vous êtes ici</div>
                {[{l: 'extincteurs', a: 186.1, pts: [[100, 300], [560, 160], [700, 480]], el: (k: number) => <div key={k} style={{width: 70, height: 70}}><Img src={staticFile(IMG.extincteur)} style={{width: 70, height: 70, objectFit: 'contain', borderRadius: 10, background: '#fff'}} /></div>}, {l: 'sauveteurs secouristes', a: 187.42, pts: [[380, 240], [780, 260]], el: (k: number) => <div key={k} style={{width: 60, height: 60, borderRadius: 12, background: GREEN, color: '#fff', fontSize: 50, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>+</div>}, {l: 'guides d’évacuation', a: 190.02, pts: [[300, 600], [620, 610]], el: (k: number) => <div key={k}><F n="gilet" size={64} /></div>}].flatMap((g) => g.pts.map(([x, y], k) => <div key={`${g.l}${k}`} style={{position: 'absolute', left: x, top: y, transform: `scale(${t > g.a + k * 0.15 ? spring(t, g.a + k * 0.15) : 0})`}}>{g.el(k)}</div>))}
              </div>
              <div style={{position: 'absolute', left: 0, right: 0, top: 790, display: 'flex', justifyContent: 'center', gap: 12}}><Pill at={186.1} c={RED} size={24}>extincteurs</Pill><Pill at={187.42} c={GREEN} size={24}>sauveteurs secouristes</Pill><Pill at={190.02} c={ORANGE} size={24}>guides d’évacuation</Pill></div>
            </>}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 5 · UNE CULTURE D'ENTREPRISE ═════════════ */
const Culture: React.FC = () => {
  const t = useT();
  return (
    <Out end={220.94}>
      <HiLine words={t < 205.7 ? ['Pourquoi', '?'] : t < 209.7 ? ['Pas', 'pour', 'cocher', 'des', 'cases'] : ['Une', 'culture', 'd’entreprise']} mark={t < 205.7 ? [0] : t < 209.7 ? [2, 4] : [1, 2]} at={t < 205.7 ? 199.6 : t < 209.7 ? 206.74 : 209.86} y={330} size={t < 209.7 && t >= 205.7 ? 56 : 68} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center', gap: 30, opacity: 1 - prog(t, 209.4, 210.2)}}>
          {[{l: 'cocher des cases', ic: 'check', a: 206.74}, {l: 'éviter une amende', ic: 'argent', a: 208.02}].map((x) => <div key={x.l} style={{position: 'relative', width: 400, height: 260, borderRadius: 24, background: '#fff', border: `5px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: pop(t, x.a)}}><F n={x.ic} size={100} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>{x.l}</span><div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 220, color: RED, fontWeight: 900, opacity: prog(t, x.a + 0.4, x.a + 0.7)}}>✕</div></div>)}
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 300, display: 'flex', justifyContent: 'center', gap: 20}}>
          {[{l: 'droits clairs & respectés', ic: 'balance', a: 212.62, c: BLUE}, {l: 'sécurité l’affaire de tous', ic: 'equipe', a: 214.34, c: RED}, {l: 'l’information circule', ic: 'bulle', a: 216.26, c: GREEN}].map((x, k) => <div key={x.l} style={{width: 300, height: 480, background: x.c, border: `6px solid ${INK}`, borderRadius: '20px 20px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30, gap: 14, transform: `scaleY(${pop(t, x.a)})`, transformOrigin: '50% 100%'}}><F n={x.ic} size={110} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff', textAlign: 'center', padding: '0 10px'}}>{x.l}</span></div>)}
        </div>
        {t > 216.26 && Array.from({length: 10}, (_, k) => { const p = ((t - 216.26) * 0.6 + k / 10) % 1; return <div key={k} style={{position: 'absolute', left: 130 + p * 700, top: 380 + Math.sin(p * Math.PI * 2 + k) * 30, width: 22, height: 22, borderRadius: 11, background: YEL, boxShadow: `0 0 12px ${YEL}`}} />; })}
        <div style={{position: 'absolute', left: 0, right: 0, top: 800, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={219.1} c={GREEN} size={30}>relation saine</Pill><Pill at={220.34} c={GOLD} size={30}>confiance</Pill></div>
      </Abs>
    </Out>
  );
};

/* ═════════════ 6 · CE MUR PARLE-T-IL ? ═════════════ */
const MurParle: React.FC = () => {
  const t = useT();
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={t < 231.1 ? ['Ce', 'mur', 'parle', '-t-il', '?'] : ['Un', 'révélateur', 'de', 'santé']} mark={t < 231.1 ? [1, 2] : [1, 3]} at={t < 231.1 ? 226.1 : 231.18} y={330} size={64} />
      <Shot src={IMG.final} ic="equipe" x={60} y={440} w={960} h={330} at={224.4} c={GREEN} blinds />
      <Abs x={60} y={800} w={960} h={570}><Cork>
        {[{l: 'contacts', ic: 'telephone', c: '#CDEBFF'}, {l: 'DUER', ic: 'danger', c: '#FFF6A8'}, {l: 'convention', ic: 'livres', c: '#E8E3D6'}, {l: 'valeurs', ic: 'balance', c: '#D8F5E5'}, {l: 'horaires', ic: 'chrono', c: '#CDEBFF'}, {l: 'incendie', ic: 'extincteur', c: '#FFD6D1'}].map((n, k) => <Note key={n.l} x={40 + (k % 3) * 290} y={40 + Math.floor(k / 3) * 250} w={250} h={210} c={n.c} rot={0} o={pop(t, 224.8 + k * 0.15)}><F n={n.ic} size={80} /><NL t={n.l} s={26} /></Note>)}
        {t > 226.1 && <div style={{position: 'absolute', left: 270, top: 232, background: '#fff', border: `5px solid ${INK}`, borderRadius: '40px 40px 40px 8px', padding: '6px 24px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, transform: `scale(${spring(t, 226.1)})`, zIndex: 3}}>« Message clair ? »</div>}
        {t > 229.98 && <div style={{position: 'absolute', right: 30, bottom: 20, transform: `scale(${spring(t, 229.98)})`, zIndex: 3}}><Pill at={229.98} c={GREEN} size={30}>✓ clair pour tout le monde</Pill></div>}
      </Cork></Abs>
      {t > 233.46 && <Dust n={24} c={GOLD} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const pops = (L: number[], v = 0.2): Sfx[] => L.map((a) => ({at: a, s: 'sfx/pop', v}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 1.5},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 0.8, s: 'validation', v: 0.18})), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.flatMap((r) => [{at: r.at - 1.2, s: 'soft-whoosh', v: 0.2, dur: 1.2}, {at: r.at, s: 'bass-hit', v: 0.33}, {at: r.at + 0.05, s: 'sfx/bell', v: 0.26}]),
  {at: 10.8, s: 'sfx/swish', v: 0.3}, {at: 10.78, s: 'sfx/pop', v: 0.22}, {at: 14.82, s: 'sfx/pop', v: 0.25},
  ...rep(19.2, 16, 0.12, 'sfx/thud', 0.12), {at: 24.26, s: 'alarme', v: 0.04, dur: 0.6}, {at: 27.7, s: 'soft-whoosh', v: 0.45, dur: 1.9}, ...rep(27.9, 6, 0.25, 'page', 0.15), {at: 29.6, s: 'sfx/thud', v: 0.35},
  {at: 38.6, s: 'sfx/swish', v: 0.3}, ...pops([40.22, 42.1, 44.0]), ...[49.7, 52.42, 55.3, 57.9].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})),
  ...searchCues(60.4, 29, 62.4, 62.7), ...[67.46, 68.74, 69.98, 75.74, 78.02].map((a) => ({at: a, s: 'tampon', v: 0.22})),
  {at: 88.4, s: 'sfx/thud', v: 0.3}, {at: 90.86, s: 'soft-whoosh', v: 0.4, dur: 1.4}, ...rep(91.0, 6, 0.2, 'page', 0.15), ...pops([94.46, 95.58]),
  {at: 104.74, s: 'sfx/thud', v: 0.35}, {at: 106.1, s: 'sfx/whoosh', v: 0.3}, {at: 107.3, s: 'deep-hit', v: 0.4}, ...pops([110.26, 111.3, 113.38, 114.46]),
  {at: 118.18, s: 'sfx/pop', v: 0.2}, ...[122.34, 123.38, 128.62, 129.94].map((a) => ({at: a, s: 'tampon', v: 0.25})), {at: 134.26, s: 'validation', v: 0.3},
  {at: 139.3, s: 'soft-whoosh', v: 0.3, dur: 1}, ...rep(141.66, 5, 0.12, 'sfx/click', 0.3), ...pops([142.94, 144.94, 148.9, 152.18]), {at: 147.1, s: 'tampon', v: 0.45},
  {at: 157.8, s: 'alarme', v: 0.06, dur: 2.5}, ...pops([162.42, 163.1, 164.22]), {at: 167.78, s: 'deep-hit', v: 0.4}, ...pops([168.86, 172.06]), {at: 174.18, s: 'alarme', v: 0.07, dur: 1}, {at: 174.2, s: 'tension', v: 0.12, dur: 1},
  ...rep(179.22, 15, 0.333, 'tick', 0.18), ...[186.1, 186.25, 186.4, 187.42, 187.57, 190.02, 190.17].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})), {at: 195.06, s: 'validation', v: 0.3},
  ...[206.74, 208.02].flatMap((a) => [{at: a, s: 'sfx/pop', v: 0.2}, {at: a + 0.4, s: 'sfx/swish', v: 0.3}]), ...[212.62, 214.34, 216.26].map((a) => ({at: a, s: 'sfx/rise', v: 0.2, dur: 0.8})), ...pops([219.1, 220.34]),
  {at: 224.4, s: 'soft-whoosh', v: 0.35, dur: 1}, ...rep(224.5, 10, 0.05, 'sfx/click', 0.12), {at: 226.1, s: 'sfx/pop', v: 0.3}, {at: 229.98, s: 'validation', v: 0.3}, {at: 233.46, s: 'bass-hit', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<TK, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
export const AffichagesOblig: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={35.3}><Intro /></Gate>
    <Gate from={38.4} to={84.95}><Socle /></Gate>
    <Gate from={88.1} to={135.85}><Juridique /></Gate>
    <Gate from={139.1} to={154.15}><Temps /></Gate>
    <Gate from={157.5} to={196.25}><Incendie /></Gate>
    <Gate from={199.4} to={221.0}><Culture /></Gate>
    <Gate from={224.1} to={OUTRO_AT}><MurParle /></Gate>
    {SECT.map((x, i) => { const C = TRANS[x.k]; return <Gate key={x.n} from={x.at} to={x.at + 3.7}><C i={i} /></Gate>; })}
    <Gate from={40} to={214}><StationBanner /></Gate>
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={237.5}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-affichages-oblig-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Tile, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, spring, LoupeSweep, PneuDeliver, Shine, Count, BURG, YEL, handFont, Board, random, Strike, TEAL, PhotoLetter, Watermark, ORANGE];
