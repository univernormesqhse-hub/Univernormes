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
 * « Les 4 niveaux de maturité de la prévention » (2 min 56) — capsule « condensé + effet wahou + ultra premium » : voix
 * d'origine (sans musique de fond), sous-titres calés mot à mot, photos générées (ChatGPT) d'après les prompts de
 * prompts-images-maturite-prevention.md, thème « papier quadrillé ».
 * Fil rouge : LE TUBE PNEUMATIQUE À SIX GUICHETS (déni → minimaliste → gestionnaire → proactif → retenir → ton niveau),
 * adaptés aux parties réellement présentes ; la capsule file d'un guichet à l'autre, chaque guichet passé se coche.
 * En plus, L'ESCALIER DE MATURITÉ : un jauge-thermomètre à 4 marches sur le côté monte de niveau en niveau.
 * Transition : LE GYROPHARE à chaque partie ; dans les scènes : capsule pneumatique, loupe, store vénitien.
 * Ultra premium : bandeau « il suffit de faire attention » qui se fissure, œillères, cases DUERP vides, distribution
 * d'EPI en carrousel, tampon « formalité », sablier réactif, pompier qui arrive après l'incendie, cercle de mains,
 * barre de recherche qui trouve puis OUVRE le plan d'action (objectifs, responsables, délais, moyens), boucle REX,
 * radar d'anticipation, sondage animé des 4 niveaux.
 */
const IMG = {
  cover: '',
  deni: '',
  mini: '',
  gest: '',
  pro: '',
  dir: '',
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
const OUTRO_AT = 172.6;
export const MATURITE_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 13.0, n: '1', title: 'Le déni', s: 'il suffit de faire attention', c: RED, g: 'déni', k: 'gyro', lab: 'NIVEAU 1 / 4'},
  {at: 40.6, n: '2', title: 'Le minimaliste', s: 'la prévention, une contrainte', c: ORANGE, g: 'minimaliste', k: 'gyro', lab: 'NIVEAU 2 / 4'},
  {at: 69.4, n: '3', title: 'Le gestionnaire', s: 'une affaire d’administration', c: BLUE, g: 'gestionnaire', k: 'gyro', lab: 'NIVEAU 3 / 4'},
  {at: 103.6, n: '4', title: 'Le proactif', s: 'un engagement collectif', c: GREEN, g: 'proactif', k: 'gyro', lab: 'NIVEAU 4 / 4'},
  {at: 141.5, n: '5', title: 'Retiens bien ceci', s: 'la maturité SST', c: VIO, g: 'retenir', k: 'gyro', lab: 'À RETENIR'},
  {at: 153.3, n: '6', title: 'Et toi ?', s: 'ton niveau de maturité', c: NAVY, g: 'ton niveau', k: 'gyro', lab: 'EN COMMENTAIRE'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 163.2;
const LV = [{n: 1, l: 'déni', c: RED, a: 13.16}, {n: 2, l: 'minimaliste', c: ORANGE, a: 40.79}, {n: 3, l: 'gestionnaire', c: BLUE, a: 69.57}, {n: 4, l: 'proactif', c: GREEN, a: 103.76}];

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
/** Ligne de symptôme : coche verte (bon signe) ou croix rouge (mauvais signe). */
const Sym: React.FC<{at: number; l: string; ok?: boolean; size?: number}> = ({at, l, ok, size = 30}) => {
  const t = useT();
  const p = pop(t, at);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 16, opacity: p, transform: `translateX(${(1 - p) * 60}px)`}}>
      <div style={{width: size * 1.6, height: size * 1.6, borderRadius: 12, background: ok ? GREEN : RED, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: size, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: `scale(${1 + 0.25 * Math.max(0, 1 - (t - at) * 4)})`}}>{ok ? '✓' : '✕'}</div>
      <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: size, color: INK, lineHeight: 1.15}}>{l}</div>
    </div>
  );
};
/** Escalier de maturité : 4 marches à droite de l'écran, la marche courante s'allume. */
const Stairs: React.FC = () => {
  const t = useT();
  if (t < 13.0 || t > 141.5) return null;
  const cur = LV.reduce((k, x, i) => (t >= x.a ? i : k), -1);
  return (
    <AbsoluteFill style={{zIndex: 37, pointerEvents: 'none', opacity: pop(t, 13.2) * (1 - prog(t, 141.0, 141.5))}}>
      <div style={{position: 'absolute', left: 36, right: 36, top: 1410, height: 120, borderRadius: 20, background: '#fff', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${GOLD}`, display: 'flex', alignItems: 'flex-end', gap: 8, padding: '0 14px 12px', boxSizing: 'border-box'}}>
        <div style={{width: 110, alignSelf: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 16, color: DIM, lineHeight: 1.1}}>MATURITÉ<br /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: cur >= 0 ? LV[cur].c : INK}}>{cur + 1}/4</span></div>
        {LV.map((x, k) => {
          const on = k <= cur;
          const here = k === cur;
          return <div key={x.l} style={{flex: 1, height: 26 + k * 20, borderRadius: '10px 10px 4px 4px', background: on ? x.c : '#E3E8EF', border: `3px solid ${on ? INK : '#C9D2DF'}`, boxShadow: here ? `0 0 ${18 + 8 * Math.sin(t * 5)}px ${x.c}` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: on ? '#fff' : DIM, fontFamily: sansFont, fontWeight: 900, fontSize: 18}}>{x.l}</div>;
        })}
      </div>
    </AbsoluteFill>
  );
};
/** Grande carte de niveau avec photo + numéro. */
const LevelHero: React.FC<{i: number; src: string; ic: string; at: number; children?: React.ReactNode}> = ({i, src, ic, at, children}) => {
  const L = LV[i];
  return (
    <Shot src={src} ic={ic} x={60} y={440} w={960} h={460} at={at} c={L.c} blinds>
      <div style={{position: 'absolute', left: 24, top: 24, zIndex: 3, display: 'flex', alignItems: 'center', gap: 14}}><Num n={L.n} c={L.c} size={90} /><span style={{display: 'inline-block', background: L.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 40, padding: '6px 18px', borderRadius: 12, border: `4px solid ${INK}`}}>{L.l}</span></div>
      {children}
    </Shot>
  );
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 200}}><Pic src={IMG.cover} ic="montagne" w={1080} h={740} pos="50% 40%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER} 9%, ${PAPER}00 16%, ${PAPER}00 34%, ${PAPER}DD 43%, ${PAPER} 48%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={930} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>CULTURE SÉCURITÉ</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 64, lineHeight: 1.1, color: INK, marginTop: 16, padding: '0 50px', textTransform: 'uppercase'}}>Les <span style={{color: '#fff', background: GREEN, padding: '0 12px', borderRadius: 10}}>4 niveaux</span> de maturité de la prévention</div>
        <div style={{display: 'flex', justifyContent: 'center', gap: 10, marginTop: 22}}>{LV.map((x) => <span key={x.l} style={{display: 'inline-block', background: x.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 28, padding: '6px 16px', borderRadius: 10, border: `3px solid ${INK}`}}>{x.l}</span>)}</div>
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

/* ═════════════ INTRO : LA QUESTION ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  return (
    <Out end={13.0}>
      <HiLine words={['À', 'quel', 'niveau', '?']} mark={[2]} at={2.8} y={330} size={72} />
      <Abs x={90} y={460} w={900} h={760}>
        {LV.map((x, k) => {
          const a = [4.58, 5.2, 6.34, 7.1][k];
          return <div key={x.l} style={{position: 'absolute', left: k * 220, bottom: 0, width: 210, height: 180 + k * 150, borderRadius: '18px 18px 0 0', background: `linear-gradient(180deg, ${x.c}, ${x.c}CC)`, border: `5px solid ${INK}`, transformOrigin: '50% 100%', transform: `scaleY(${prog(t, a, a + 0.5, easeOut)})`, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20, color: '#fff', overflow: 'hidden'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 80, lineHeight: 1}}>{x.n}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30}}>{x.l}</div></div>;
        })}
        {t > 8.5 && <div style={{position: 'absolute', left: lerp(40, 760, (Math.sin((t - 8.5) * 1.6) + 1) / 2), top: -20, transform: `rotate(${Math.sin(t * 3) * 10}deg)`}}><F n="question" size={110} /></div>}
      </Abs>
      <Abs x={0} y={1260} w={1080} style={{textAlign: 'center'}}><Pill at={10.02} c={NAVY} size={32}>le niveau de maturité de ta culture sécurité</Pill></Abs>
    </Out>
  );
};

/* ═════════════ NIVEAU 1 : LE DÉNI ═════════════ */
const Deni: React.FC = () => {
  const t = useT();
  const ph = t < 25.3 ? 0 : 1;
  const crack = prog(t, 36.3, 38.0, easeIn);
  return (
    <Out end={40.6}>
      {ph === 0 && (
        <>
          <HiLine words={['Niveau', '1', ':', 'le', 'déni']} mark={[4]} at={13.3} y={330} size={66} />
          <LevelHero i={0} src={IMG.deni} ic="haussement" at={15.46} />
          <Abs x={60} y={940} w={960} h={180} style={{background: NIGHT, border: `5px solid ${INK}`, borderRadius: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 17.0)}}>
            <span style={{fontFamily: handFont, fontWeight: 700, fontSize: 56, color: YEL}}>« il suffit de faire attention »</span>
          </Abs>
          <Abs x={60} y={1150} w={960} h={230} style={{display: 'flex', flexDirection: 'column', gap: 16, padding: '0 20px'}}>
            <Sym at={21.14} l="aucun DUERP" />
            <Sym at={22.82} l="travailleurs non formés" />
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Le', 'danger', 'ignoré']} mark={[1, 2]} at={25.4} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={420} style={{display: 'flex', flexDirection: 'column', gap: 22, padding: '20px 20px'}}>
            <Sym at={25.38} l="quelques EPI distribués…" />
            <Sym at={27.94} l="sans sensibilisation aux risques" />
            <Sym at={29.94} l="sans vérification de leur efficacité" />
            <Sym at={32.62} l="la direction minimise les risques" />
          </Abs>
          <Abs x={140} y={900} w={800} h={460} style={{opacity: pop(t, 36.3)}}>
            <div style={{position: 'absolute', left: 250, top: 40, transform: `scale(${1 - crack * 0.1})`}}><F n="yeux" size={300} /></div>
            <div style={{position: 'absolute', left: 200, top: 120, width: 400, height: 90, background: INK, borderRadius: 20, transform: `scaleX(${1 - crack})`, transformOrigin: '50% 50%'}} />
            {crack > 0 && <div style={{position: 'absolute', inset: 0, background: `rgba(224,74,63,${0.3 * Math.abs(Math.sin(t * 9)) * crack})`, borderRadius: 30}} />}
            <div style={{position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center', opacity: prog(t, 38.9, 39.3)}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: RED}}>… jusqu’à l’accident</span></div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ NIVEAU 2 : LE MINIMALISTE ═════════════ */
const Mini: React.FC = () => {
  const t = useT();
  const ph = t < 56.0 ? 0 : 1;
  return (
    <Out end={69.4}>
      {ph === 0 && (
        <>
          <HiLine words={['Niveau', '2', ':', 'le', 'minimaliste']} mark={[4]} at={41.0} y={330} size={62} />
          <LevelHero i={1} src={IMG.mini} ic="gants" at={43.66} />
          <Abs x={60} y={940} w={960} h={200} style={{display: 'flex', gap: 20}}>
            <Card x={0} y={0} w={470} h={200} at={47.22} c={ORANGE}><IcoLab ic="juge" l="éviter les infractions" size={80} fs={28} c={ORANGE} /></Card>
            <Card x={490} y={0} w={470} h={200} at={50.22} c={ORANGE}><IcoLab ic="bouclier" l="limiter la responsabilité juridique" size={80} fs={26} c={ORANGE} /></Card>
          </Abs>
          <Abs x={60} y={1170} w={960} h={200} style={{background: '#F1F1EC', border: `5px solid ${INK}`, borderRadius: 24, display: 'flex', alignItems: 'center', gap: 24, padding: '0 30px', opacity: pop(t, 52.14)}}>
            <F n="classeur" size={120} />
            <div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>DUERP = document administratif</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>réservé à la direction</div></div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['La', 'prévention', 'contrainte']} mark={[2]} at={56.1} y={330} size={64} />
          <Abs x={60} y={440} w={960} h={400} style={{display: 'flex', flexDirection: 'column', gap: 22, padding: '20px'}}>
            <Sym at={57.14} l="réunions purement formelles" />
            <Sym at={58.82} l="formations limitées, « protection » en cas d’accident" />
            <Sym at={63.78} l="actions non planifiées" />
          </Abs>
          <Abs x={60} y={880} w={960} h={420} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 26, boxShadow: `8px 8px 0 ${ORANGE}`, overflow: 'hidden', opacity: pop(t, 66.0)}}>
            <div style={{position: 'absolute', left: 24, top: 18}}><Mono at={66.1} c={DIM} size={22}>la seule action : distribuer des EPI</Mono></div>
            {['casque', 'gants', 'lunettes', 'chaussure', 'gilet'].map((ic, k) => { const x = ((t - 66) * 260 + k * 200) % 1100 - 120; return <div key={ic} style={{position: 'absolute', left: x, top: 150, transform: `rotate(${Math.sin(t * 4 + k) * 8}deg)`}}><F n={ic} size={130} /></div>; })}
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 60, background: `repeating-linear-gradient(90deg, #3A4356 0 40px, #4A5368 40px 80px)`, backgroundPosition: `${-(t * 260) % 80}px 0`}} />
          </Abs>
          <Stamp at={67.22} c={ORANGE} text="formalité" x={560} y={820} rot={-8} size={56} />
        </>
      )}
    </Out>
  );
};

/* ═════════════ NIVEAU 3 : LE GESTIONNAIRE ═════════════ */
const Gest: React.FC = () => {
  const t = useT();
  const ph = t < 85.6 ? 0 : 1;
  const fire = prog(t, 87.1, 88.5);
  const truck = prog(t, 88.5, 90.0, easeOut);
  return (
    <Out end={103.6}>
      {ph === 0 && (
        <>
          <HiLine words={['Niveau', '3', ':', 'le', 'gestionnaire']} mark={[4]} at={69.8} y={330} size={60} />
          <LevelHero i={2} src={IMG.gest} ic="classeur" at={72.18} />
          <Abs x={60} y={940} w={960} h={440} style={{display: 'flex', flexDirection: 'column', gap: 18, padding: '10px 20px'}}>
            <Sym at={75.3} l="DUERP avec les représentants du personnel" ok />
            <Sym at={78.18} l="… mais pas approprié par les travailleurs" />
            <Sym at={80.74} l="politique de prévention, consignes, procédures" ok />
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Une', 'prévention', 'réactive']} mark={[2]} at={85.7} y={330} size={64} />
          <Abs x={60} y={440} w={960} h={420} style={{background: NIGHT, border: `5px solid ${INK}`, borderRadius: 26, overflow: 'hidden', opacity: pop(t, 85.7)}}>
            <div style={{position: 'absolute', left: 120, top: 80, transform: `scale(${0.6 + 0.6 * fire})`, filter: `drop-shadow(0 0 ${40 * fire}px ${ORANGE})`, opacity: fire * (1 - prog(t, 90.0, 90.8))}}><F n="feu" size={220} /></div>
            <div style={{position: 'absolute', left: lerp(1000, 520, truck), top: 140}}><F n="sirene" size={180} /></div>
            <div style={{position: 'absolute', left: 30, bottom: 24}}><Pill at={88.5} c={RED} size={26}>après l’accident grave</Pill></div>
            <div style={{position: 'absolute', right: 30, bottom: 24}}><Pill at={89.78} c={ORANGE} size={26}>incidents répétés</Pill></div>
          </Abs>
          <Abs x={60} y={890} w={960} h={300} style={{display: 'flex', flexDirection: 'column', gap: 18, padding: '10px 20px'}}>
            <Sym at={90.82} l="formations ciblées, sans plan global" />
            <Sym at={94.34} l="la direction délègue aux experts HSE" />
          </Abs>
          <Abs x={0} y={1200} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, opacity: pop(t, 99.94)}}>
            <div style={{transform: `rotate(${(t - 100) * 180}deg)`}}><F n="sablier" size={110} /></div>
            <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: BLUE}}>principalement réactive</span>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ NIVEAU 4 : LE PROACTIF ═════════════ */
const PLAN = [{l: 'objectifs', ic: 'cible', a: 120.82}, {l: 'responsables', ic: 'superviseur', a: 122.02}, {l: 'délais', ic: 'calendrier', a: 123.02}, {l: 'moyens', ic: 'argent', a: 124.1}];
const Proactif: React.FC = () => {
  const t = useT();
  const ph = t < 113.6 ? 0 : t < 126.2 ? 1 : 2;
  return (
    <Out end={141.5}>
      {ph === 0 && (
        <>
          <HiLine words={['Niveau', '4', ':', 'le', 'proactif']} mark={[4]} at={104.0} y={330} size={64} />
          <LevelHero i={3} src={IMG.pro} ic="equipe" at={106.18} />
          <Abs x={240} y={950} w={600} h={420} style={{opacity: pop(t, 107.42)}}>
            {Array.from({length: 8}, (_, k) => { const ang = (k / 8) * Math.PI * 2 + t * 0.6; const on = t >= 108.94 + k * 0.12; return <div key={k} style={{position: 'absolute', left: 240 + Math.cos(ang) * 210, top: 160 + Math.sin(ang) * 150, opacity: on ? 1 : 0.2, transform: `scale(${on ? 1 : 0.6})`}}><F n={k % 2 ? 'salarie' : 'ouvrier'} size={100} /></div>; })}
            <div style={{position: 'absolute', left: 200, top: 120, width: 200, height: 200, borderRadius: 100, background: `radial-gradient(circle, ${GREEN}, ${TEAL})`, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 ${30 + 15 * Math.sin(t * 4)}px ${GREEN}`}}><F n="bouclier" size={110} /></div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['La', 'direction', 's’implique']} mark={[1, 2]} at={113.8} y={330} size={64} />
          {t < 119.5 && <Shot src={IMG.dir} ic="directeur" x={60} y={440} w={960} h={520} at={113.8} c={GREEN}><div style={{position: 'absolute', left: 24, bottom: 24, display: 'flex', gap: 10}}><Pill at={116.18} c={GREEN} size={24}>objectifs précis</Pill><Pill at={117.42} c={TEAL} size={24}>hiérarchisés</Pill><Pill at={118.2} c={NAVY} size={24}>suivis</Pill></div></Shot>}
          {t >= 119.5 && <SearchOpen x={60} y={440} w={960} h={940} at={119.5} query="plan d’action" results={['Plan de communication', 'Plan d’action prévention', 'Plan de formation']} found={1} foundAt={120.6} clickAt={120.9} c={GREEN}>
            {PLAN.map((x, k) => <div key={x.l} style={{position: 'absolute', left: 30 + (k % 2) * 450, top: 30 + Math.floor(k / 2) * 300, width: 420, height: 270, borderRadius: 24, background: '#fff', border: `5px solid ${INK}`, boxShadow: `7px 7px 0 ${GREEN}`, opacity: pop(t, x.a), transform: `perspective(900px) rotateY(${(1 - pop(t, x.a)) * 70}deg)`}}><IcoLab ic={x.ic} l={x.l} size={110} fs={36} c={GREEN} /></div>)}
            <div style={{position: 'absolute', left: 30, right: 30, top: 650, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM, opacity: pop(t, 124.1)}}>moyens humains et financiers nécessaires</div>
          </SearchOpen>}
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Une', 'culture', 'de', 'sécurité']} mark={[1, 3]} at={126.4} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={300} style={{display: 'flex', gap: 20}}>
            <Card x={0} y={0} w={470} h={300} at={126.34} c={GREEN}><IcoLab ic="ecole" l="formation" size={110} fs={34} c={GREEN} /></Card>
            <Card x={490} y={0} w={470} h={300} at={127.94} c={TEAL}><IcoLab ic="megaphone" l="sensibilisation" size={110} fs={34} c={TEAL} /></Card>
          </Abs>
          <Abs x={240} y={780} w={600} h={400} style={{opacity: pop(t, 130.54)}}>
            <svg width={600} height={400} style={{position: 'absolute', left: 0, top: 0, transform: `rotate(${(t - 130.5) * 50}deg)`}}>
              <path d="M300 40 A 160 160 0 1 1 140 200" fill="none" stroke={GREEN} strokeWidth={22} strokeLinecap="round" />
              <polygon points="120,180 160,180 140,230" fill={GREEN} />
            </svg>
            <div style={{position: 'absolute', left: 0, right: 0, top: 150, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: GREEN}}>REX</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 215, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 20, color: INK}}>+ meilleures pratiques</div>
          </Abs>
          <Abs x={60} y={1200} w={960} h={160} style={{borderRadius: 26, background: `linear-gradient(110deg, ${GREEN}, #2FBF71)`, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 136.22), overflow: 'hidden'}}>
            <span style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#ffffffAA', marginRight: 20}}>obligation<Strike p={prog(t, 137.6, 138.0)} c={INK} /></span>
            <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: '#fff'}}>→ culture d’entreprise</span>
            <Shine at={139.8} />
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ RETIENS BIEN CECI ═════════════ */
const Retenir: React.FC = () => {
  const t = useT();
  const sweep = (t - 148.5) * 150;
  return (
    <Out end={153.3}>
      <HiLine words={['Retiens', 'bien', 'ceci']} mark={[0]} at={141.9} y={330} size={70} />
      <GlassCard x={60} y={440} w={960} h={300} at={143.54} c={VIO}>
        <div style={{display: 'flex', alignItems: 'center', gap: 30, height: '100%', padding: '0 40px'}}>
          <F n="trophee" size={150} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: INK, lineHeight: 1.1}}>une entreprise mature <span style={{color: VIO}}>n’attend pas l’accident</span> pour agir</div>
        </div>
      </GlassCard>
      <Abs x={240} y={780} w={600} h={600} style={{opacity: pop(t, 148.58)}}>
        <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: NIGHT, border: `8px solid ${INK}`, overflow: 'hidden'}}>
          {[0.33, 0.66].map((r) => <div key={r} style={{position: 'absolute', left: `${50 - r * 50}%`, top: `${50 - r * 50}%`, width: `${r * 100}%`, height: `${r * 100}%`, borderRadius: '50%', border: '3px solid #2E7D4F'}} />)}
          <div style={{position: 'absolute', inset: 0, background: `conic-gradient(from ${sweep}deg, #3BE38B88 0deg, transparent 60deg)`}} />
        </div>
        {[{l: 'anticipe', a: 148.58, x: -80, y: 40}, {l: 'mobilise', a: 149.86, x: 420, y: 120}, {l: 'améliore', a: 151.14, x: 160, y: 520}].map((x) => <div key={x.l} style={{position: 'absolute', left: x.x, top: x.y}}><Pill at={x.a} c={GREEN} size={32}>{x.l}</Pill></div>)}
      </Abs>
    </Out>
  );
};

/* ═════════════ ET TOI ? ═════════════ */
const Toi: React.FC = () => {
  const t = useT();
  const pick = Math.floor(((t - 159.5) * 3) % 4 + 4) % 4;
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={['Et', 'chez', 'toi', '?']} mark={[2]} at={153.5} y={330} size={72} />
      <Abs x={60} y={440} w={960} h={180} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 26, boxShadow: `7px 7px 0 ${NAVY}`, display: 'flex', alignItems: 'center', gap: 20, padding: '0 30px', opacity: pop(t, 154.02)}}>
        <F n="bulle" size={110} />
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>dis-le en commentaire</div>
      </Abs>
      {LV.map((x, k) => {
        const a = [159.46, 160.2, 161.5, 162.3][k];
        const hot = t > 162.8 && t < 164.2 && k === pick;
        return (
          <Abs key={x.l} x={60} y={660 + k * 150} w={960} h={130} style={{opacity: pop(t, a), transform: `translateX(${(1 - pop(t, a)) * 100}px)`}}>
            <div style={{position: 'absolute', inset: 0, borderRadius: 22, background: '#fff', border: `5px solid ${hot ? x.c : INK}`, boxShadow: hot ? `0 0 30px ${x.c}` : `5px 5px 0 ${x.c}`, overflow: 'hidden'}}>
              <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(k + 1) * 25 * prog(t, a, a + 0.8, easeOut)}%`, background: `${x.c}33`}} />
              <div style={{position: 'absolute', left: 24, top: 26, display: 'flex', alignItems: 'center', gap: 16}}><Num n={x.n} c={x.c} size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: x.c}}>{x.l}</span></div>
            </div>
          </Abs>
        );
      })}
      <Abs x={60} y={1270} w={960} h={130} style={{display: 'flex', gap: 20, justifyContent: 'center'}}>
        {[{ic: 'cloche', l: 'abonne-toi', a: 164.26}, {ic: 'enveloppe', l: 'partage', a: 168.54}].map((x) => <div key={x.l} style={{width: 420, height: 120, borderRadius: 22, background: '#fff', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${RED}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: pop(t, x.a), transform: `scale(${pop(t, x.a)})`}}><F n={x.ic} size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36}}>{x.l}</span></div>)}
      </Abs>
      {t > ALLDONE && <Dust n={22} c={GOLD} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: at + 0.35 + len * 0.05, s: 'sfx/pop', v: 0.25}, ...rep(at + 0.8 + len * 0.05, 3, 0.12, 'sfx/pop', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const shine = (a: number): Sfx => ({at: a, s: 'soft-whoosh', v: 0.18, dur: 0.8});
const bad = (L: number[]): Sfx[] => L.map((a) => ({at: a, s: 'sfx/thud', v: 0.25}));
const good = (L: number[]): Sfx[] => L.map((a) => ({at: a, s: 'sfx/ding', v: 0.22}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, ...flaps(0.1, 8), {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 0.8, s: 'validation', v: 0.18})), {at: ALLDONE, s: 'validation', v: 0.35},
  ...[4.58, 5.2, 6.34, 7.1].map((a) => ({at: a, s: 'sfx/rise', v: 0.18, dur: 0.5})), {at: 10.02, s: 'sfx/pop', v: 0.22},
  {at: 15.46, s: 'soft-whoosh', v: 0.4, dur: 1}, {at: 17.0, s: 'sfx/whoosh', v: 0.2}, ...bad([21.14, 22.82, 25.38, 27.94, 29.94, 32.62]), {at: 36.3, s: 'sfx/swish', v: 0.25}, {at: 38.0, s: 'alarme', v: 0.06, dur: 1}, {at: 38.05, s: 'deep-hit', v: 0.35},
  {at: 43.66, s: 'soft-whoosh', v: 0.4, dur: 1}, {at: 47.22, s: 'sfx/pop', v: 0.22}, {at: 50.22, s: 'sfx/pop', v: 0.22}, {at: 52.14, s: 'sfx/whoosh', v: 0.2}, ...bad([57.14, 58.82, 63.78]), ...rep(66.0, 12, 0.25, 'tick', 0.1), {at: 67.22, s: 'tampon', v: 0.6},
  {at: 72.18, s: 'soft-whoosh', v: 0.4, dur: 1}, ...good([75.3, 80.74]), ...bad([78.18]), {at: 87.1, s: 'sfx/rise', v: 0.2, dur: 1.4}, {at: 88.5, s: 'alarme', v: 0.06, dur: 1.4}, ...bad([90.82, 94.34]), {at: 99.94, s: 'sfx/pop', v: 0.22},
  {at: 106.18, s: 'soft-whoosh', v: 0.4, dur: 1}, ...rep(108.94, 8, 0.12, 'sfx/pop', 0.12), {at: 113.8, s: 'sfx/whoosh', v: 0.22},
  ...searchCues(119.5, 13, 120.6, 120.9), ...PLAN.map((x) => ({at: x.a, s: 'sfx/swish', v: 0.2})),
  {at: 126.34, s: 'sfx/pop', v: 0.22}, {at: 127.94, s: 'sfx/pop', v: 0.22}, {at: 130.54, s: 'soft-whoosh', v: 0.35, dur: 1.5}, {at: 136.22, s: 'sfx/whoosh', v: 0.22}, {at: 137.6, s: 'stylo', v: 0.3}, {at: 138.5, s: 'validation', v: 0.3}, shine(139.8),
  {at: 143.54, s: 'sfx/rise', v: 0.22, dur: 1}, shine(143.9), ...[148.58, 149.86, 151.14].map((a) => ({at: a, s: 'notification', v: 0.2})),
  {at: 154.02, s: 'sfx/pop', v: 0.22}, ...[159.46, 160.2, 161.5, 162.3].map((a) => ({at: a, s: 'sfx/pop', v: 0.22})), ...rep(162.8, 5, 0.3, 'tick', 0.12), {at: 164.26, s: 'sfx/ding', v: 0.25}, {at: 168.54, s: 'sfx/ding', v: 0.25},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const MaturitePrev: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={13.05}><Intro /></Gate>
    <Gate from={13.2} to={40.65}><Deni /></Gate>
    <Gate from={40.8} to={69.45}><Mini /></Gate>
    <Gate from={69.6} to={103.65}><Gest /></Gate>
    <Gate from={103.8} to={141.55}><Proactif /></Gate>
    <Gate from={141.7} to={153.35}><Retenir /></Gate>
    <Gate from={153.4} to={OUTRO_AT}><Toi /></Gate>
    <Gate from={13.0} to={141.5}><Stairs /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}><Gyro i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={172.4}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-maturite-prevention-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Kin, Brut, T, TitleBlock, Win, Count, GLASS, Check, Tile, PneuDeliver, LoupeSweep, BLUE, YEL, TEAL, Board];
