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
 * « La JSA avant d'intervenir » (voix d'origine, 56 s) — capsule « condensé + effet wahou + ultra premium » présentée
 * en métro : une ligne à 6 stations. Tube de verre à six guichets : feu vert ? → dangers cachés → la JSA → exemple →
 * anticiper → à toi ; la capsule file d'un guichet à l'autre. Gyrophare, loupe, store vénitien, capsule pneumatique ;
 * barre de recherche « analyser chaque étape » qui ouvre le feu tricolore. Fil wahou : feu tricolore bloqué au rouge,
 * scan radiographique qui révèle 4 dangers cachés sous une intervention « simple », acronyme JSA déplié, méthode en
 * 3 marches, tableau JSA qui se remplit (étape → danger → mesure), cadenas de consignation qui claque sur le
 * sectionneur et testeur d'absence d'énergie, balance réagir / anticiper, jauges de compétences. Kits
 * capsule-ui-neo-brutal et capsule-recit-illustre. Couverture : photo + « LA JSA / AVANT D'INTERVENIR » en lettres-photos.
 */
const IMG = {
  cover: 'jsa-gen/feu-rouge-equipe.jpg',
  conso: 'jsa-gen/consignation.jpg',
  tablette: 'jsa-gen/tablette-jsa.jpg',
  radio: 'jsa-gen/machine-radio.jpg',
  anticiper: 'jsa-gen/anticiper.jpg',
  tiktok: 'jsa-gen/tiktok-profil.jpg',
  c1: 'promo/hse-machine.jpg',
  c2: 'tirant/echafaudage.jpg',
  machine: 'promo/hse-machine.jpg',
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
const OUTRO_AT = 59.1;
export const JSA_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '1', title: 'Feu vert ?', s: 'as-tu analysé chaque étape ?', c: NAVY, g: 'feu vert ?', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 6.4, n: '2', title: 'Des dangers cachés', s: 'derrière une intervention « simple »', c: RED, g: 'dangers', k: 'gyro', lab: 'GUICHET 2 / 6'},
  {at: 14.4, n: '3', title: 'La JSA', s: 'Job Safety Analysis', c: BLUE, g: 'la JSA', k: 'loupe', lab: 'GUICHET 3 / 6'},
  {at: 27.6, n: '4', title: 'Exemple', s: 'la maintenance d’une machine', c: ORANGE, g: 'exemple', k: 'store', lab: 'GUICHET 4 / 6'},
  {at: 42.5, n: '5', title: 'Anticiper', s: 'ne pas seulement réagir', c: VIO, g: 'anticiper', k: 'tube', lab: 'GUICHET 5 / 6'},
  {at: 49.3, n: '★', title: 'À toi de jouer', s: 'maîtriser les outils', c: GREEN, g: 'à toi', k: 'none', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 48.6;
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
  const S0 = SECTX[i];
  return (
    <>
      <Abs x={60} y={y} w={960} style={{textAlign: 'center'}}><Kin text={S0.title} at={at} size={S0.title.length > 20 ? 66 : 80} color={dark ? '#fff' : INK} /></Abs>
      <Abs x={0} y={y + (S0.title.length > 20 ? 190 : 120)} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-block', background: S0.c, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 2, padding: '6px 16px', borderRadius: 6, opacity: pop(t, at + 0.5)}}>{S0.s.toUpperCase()}</div></Abs>
    </>
  );
};
const Pneumatique: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const S0 = SECTX[i];
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
  const S0 = SECTX[i];
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
  const S0 = SECTX[i];
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
  const S0 = SECTX[i];
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
  {n: 1, l: 'Plusieurs dangers cachés', s: 'dangers', at: 10.3},
  {n: 2, l: 'Décomposer en étapes', s: 'étapes', at: 21.6},
  {n: 3, l: 'Identifier les dangers', s: 'identifier', at: 23.4},
  {n: 4, l: 'Les mesures de prévention', s: 'mesures', at: 26.1},
  {n: 5, l: 'Isoler les énergies', s: 'isolement', at: 36.6},
  {n: 6, l: 'Anticiper', s: 'anticiper', at: 47.3},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE JSA · STATION {r.n} / 6</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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
/* ═════════════ Outils communs ═════════════ */
type HD = [number, string[], number[]];
const headAt = (h: HD[], t: number) => h.reduce((a, x) => (t >= x[0] - 0.2 ? x : a), h[0]);
const Heads: React.FC<{h: HD[]}> = ({h}) => {
  const t = useT();
  const x = headAt(h, t);
  const len = x[1].join(' ').length;
  return <HiLine words={x[1]} mark={x[2]} at={x[0]} y={330} size={len > 26 ? 50 : len > 20 ? 56 : 62} />;
};
const fmt = (v: number) => Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const arcP = (r: number, a0: number, a1: number) => { const p = (a: number) => [r * Math.cos((a * Math.PI) / 180), r * Math.sin((a * Math.PI) / 180)]; const [x0, y0] = p(a0); const [x1, y1] = p(a1); return `M 0 0 L ${x0} ${y0} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1} Z`; };
const Strk: React.FC<{at: number; c?: string}> = ({at, c = RED}) => {
  const t = useT();
  return <div style={{position: 'absolute', left: 8, right: 8, top: '50%', height: 7, background: c, borderRadius: 4, transform: `scaleX(${prog(t, at, at + 0.4)}) rotate(-3deg)`, transformOrigin: '0 50%'}} />;
};
const Row: React.FC<{at: number; ic: string; l: string; c: string; fs?: number; w?: number}> = ({at, ic, l, c, fs = 30, w}) => {
  const t = useT();
  const on = t > at;
  return <div style={{...nb('#fff', 5), boxShadow: `5px 5px 0 ${c}`, width: w, display: 'flex', alignItems: 'center', gap: 14, padding: '10px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: fs, lineHeight: 1.1, opacity: on ? 1 : 0, transform: `translateX(${on ? (1 - Math.min(1, spring(t, at))) * -160 : 0}px)`}}><F n={ic} size={58} /><span style={{flex: 1}}>{l}</span><span style={{color: ACC}}>{t > at + 0.4 ? '✓' : ''}</span></div>;
};


/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="engrenage" w={1080} h={820} pos="50% 18%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 24%, ${PAPER}CC 32%, ${PAPER} 37%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb(NBK, 5), color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3, padding: '8px 22px'}}>JOB SAFETY ANALYSIS</div></Abs>
      <Abs x={0} y={640} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="LA JSA" src={IMG.c1} size={220} ls={6} /></Abs>
      <Abs x={0} y={870} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="AVANT D’INTERVENIR" src={IMG.c2} size={86} ls={1} seed={3} /></Abs>
      <Abs x={60} y={1000} w={960} style={{display: 'flex', justifyContent: 'center', gap: 12}}>{[['étapes', BLUE], ['dangers', RED], ['mesures', GREEN]].map(([n, c], k) => <div key={n} style={{...nb(c, 5), padding: '8px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: '#fff', transform: `translateY(${(1 - Math.min(1, spring(t, 0.3 + k * 0.1))) * 60}px)`}}>{n}</div>)}</Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={NAVY} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Intro : recherche → feu tricolore ═════════════ */
const Feu: React.FC = () => {
  const t = useT();
  const q = t > 5.6;
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 60}}>
      <div style={{...nb(NBK, 8), width: 200, height: 540, borderRadius: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly'}}>
        {[[RED, !q || Math.sin(t * 8) > 0], [YEL, false], [GREEN, false]].map(([c, on], k) => <div key={k} style={{width: 130, height: 130, borderRadius: 65, background: on ? (c as string) : '#333', boxShadow: on ? `0 0 40px ${c}` : 'inset 0 0 20px #000', border: '5px solid #222'}} />)}
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start'}}>
        <Chip at={3.2} ic="equipe" l="l’équipe va intervenir" c={NAVY} />
        <Chip at={3.6} ic="loupe" l="risques de chaque étape ?" c={RED} />
        {q && <NBadge at={5.7} text="FEU VERT ?" bg={GREEN} rot={-4} size={50} />}
      </div>
    </div>
  );
};
const Intro: React.FC = () => (
  <Out end={6.45}>
    <Heads h={[[3.0, ['Chaque', 'étape'], [1]], [5.4, ['Le', 'feu', 'vert', '?'], [1, 2]]]} />
    <SearchOpen x={60} y={440} w={960} h={880} at={2.7} query="analyser chaque étape" results={['permis de feu', 'JSA · analyse par étape', 'check-list EPI']} found={1} foundAt={4.0} clickAt={4.4} c={NAVY}>
      <Feu />
    </SearchOpen>
  </Out>
);

/* ═════════════ Guichet 2 : dangers cachés (scan) ═════════════ */
const DG: [string, string, number][] = [['chute', 'echelle', 9.9], ['électrocution', 'eclair', 10.3], ['coincement', 'engrenage', 11.5], ['énergie dangereuse', 'vapeur', 12.6]];
const Dangers: React.FC = () => {
  const t = useT();
  const scan = prog(t, 9.6, 13.2, (x: number) => x);
  return (
    <Out end={14.45}>
      <Heads h={[[9.8, ['Plusieurs', 'dangers'], [1]], [12.2, ['L’énergie', 'dangereuse'], [0, 1]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{...nb('#fff', 8), position: 'absolute', left: 0, top: 0, width: 960, height: 520, boxShadow: `8px 8px 0 ${RED}`, overflow: 'hidden', opacity: pop(t, 9.6)}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 30, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM}}>INTERVENTION « SIMPLE »</div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 120, display: 'flex', justifyContent: 'center', gap: 30}}>{DG.map(([l, ic, a]) => { const on = t > a; return <div key={l} style={{width: 200, height: 300, borderRadius: 18, border: `5px ${on ? 'solid' : 'dashed'} ${on ? RED : '#C9D2DF'}`, background: on ? '#FFF1F1' : '#F6F7FA', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, transform: `scale(${on ? Math.min(1.05, spring(t, a)) : 0.95})`}}><div style={{opacity: on ? 1 : 0.08, filter: on ? undefined : 'blur(4px) grayscale(1)'}}><F n={ic} size={110} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: on ? RED : '#C9D2DF', textAlign: 'center'}}>{on ? l : '?'}</div></div>; })}</div>
          <div style={{position: 'absolute', top: 0, bottom: 0, left: lerp(-40, 1000, scan), width: 40, background: `linear-gradient(90deg, transparent, ${TEAL}AA, transparent)`, boxShadow: `0 0 40px ${TEAL}`}} />
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 580, display: 'flex', justifyContent: 'center'}}><NBadge at={13.2} text="4 DANGERS RÉVÉLÉS" bg={RED} rot={-2} size={40} /></div>
      </Abs>
    </Out>
  );
};

/* ═════════════ Guichet 3 : la JSA ═════════════ */
const STEPS3: [string, string, number, string][] = [['décomposer le travail en étapes', 'puzzle', 21.6, BLUE], ['identifier les dangers de chacune', 'danger', 23.4, RED], ['définir les mesures de prévention', 'bouclier', 26.1, GREEN]];
const Jsa: React.FC = () => {
  const t = useT();
  return (
    <Out end={27.65}>
      <Heads h={[[18.0, ['Job', 'Safety', 'Analysis'], [0, 2]], [21.0, ['La', 'méthode'], [1]], [23.4, ['Étape', 'par', 'étape'], [0, 2]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center', gap: 18}}>{[['J', 'Job', 18.4], ['S', 'Safety', 18.7], ['A', 'Analysis', 19.2]].map(([L, w, a]) => { const on = t > (a as number); return <div key={L as string} style={{...nb(BLUE, 8), width: 260, height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop(t, 18.0)})`}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: on ? 80 : 130, color: '#fff', lineHeight: 1, transition: undefined}}>{L}</div>{on && <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: YEL, transform: `scale(${Math.min(1, spring(t, a as number))})`}}>{w}</div>}</div>; })}</div>
        {STEPS3.map(([l, ic, a, c], k) => { const on = t > a - 0.2; return <div key={l} style={{...nb('#fff', 6), boxShadow: `6px 6px 0 ${c}`, position: 'absolute', left: k * 40, top: 520 - k * 130 + 0, width: 600, height: 110, display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px', opacity: on ? 1 : 0, transform: `translateY(${on ? (1 - Math.min(1, spring(t, a - 0.2))) * 200 : 0}px)`}}><div style={{width: 56, height: 56, borderRadius: 28, background: c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{k + 1}</div><F n={ic} size={64} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 25}}>{l}</span></div>; })}
        {t > 20.6 && <div style={{...nb('#fff', 7), position: 'absolute', left: 690, top: 230, width: 270, height: 480, overflow: 'hidden', boxShadow: `7px 7px 0 ${BLUE}`, transform: `translateX(${(1 - Math.min(1, spring(t, 20.6))) * 400}px) rotate(3deg)`}}><Img src={PH(IMG.tablette)} style={{width: 270, height: 480, objectFit: 'cover', objectPosition: '50% 40%', transform: `scale(${lerp(1, 1.12, prog(t, 20.6, 27.6))})`}} /></div>}
      </Abs>
    </Out>
  );
};

/* ═════════════ Guichet 4 : exemple — tableau JSA + consignation ═════════════ */
const Exemple: React.FC = () => {
  const t = useT();
  const lock = prog(t, 36.5, 37.0, easeIn);
  const vat = t > 39.1;
  return (
    <Out end={42.55}>
      <Heads h={[[31.0, ['Les', 'étapes'], [1]], [32.6, ['Les', 'risques'], [1]], [35.9, ['Les', 'mesures'], [1]], [36.6, ['Isoler', 'les', 'énergies'], [0, 2]], [39.0, ['Vérifier', 'l’absence'], [0, 1]], [40.7, ['Se', 'protéger'], [1]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{...nb('#fff', 8), position: 'absolute', left: 0, top: 0, width: 960, boxShadow: `8px 8px 0 ${ORANGE}`, overflow: 'hidden', opacity: pop(t, 31.0)}}>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: NAVY, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 22, textAlign: 'center'}}>{['ÉTAPE', 'DANGER', 'MESURE'].map((h) => <div key={h} style={{padding: '14px 0'}}>{h}</div>)}</div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', minHeight: 300}}>
            <div style={{padding: 16, borderRight: '3px solid #E3E8EF', display: 'flex', flexDirection: 'column', gap: 10}}>{['arrêter', 'ouvrir le carter', 'intervenir'].map((l, k) => <div key={l} style={{...nb('#F6F7FA', 3), padding: '8px 12px', fontFamily: sansFont, fontWeight: 800, fontSize: 22, opacity: pop(t, 31.2 + k * 0.2)}}>{k + 1} · {l}</div>)}</div>
            <div style={{padding: 16, borderRight: '3px solid #E3E8EF', display: 'flex', flexDirection: 'column', gap: 10}}>{[['coincement', 'engrenage', 33.4], ['redémarrage intempestif', 'repeter', 34.6]].map(([l, ic, a]) => <div key={l as string} style={{...nb('#FFF1F1', 3), padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8, fontFamily: sansFont, fontWeight: 800, fontSize: 21, color: RED, opacity: pop(t, a as number)}}><F n={ic as string} size={36} />{l}</div>)}</div>
            <div style={{padding: 16, display: 'flex', flexDirection: 'column', gap: 10}}>{[['isolement des énergies', 'cadenas', 36.6], ['absence d’énergie vérifiée', 'check', 39.1], ['protections nécessaires', 'bouclier', 40.8]].map(([l, ic, a]) => <div key={l as string} style={{...nb('#EFFBF4', 3), padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8, fontFamily: sansFont, fontWeight: 800, fontSize: 21, color: GREEN, opacity: pop(t, a as number)}}><F n={ic as string} size={36} />{l}</div>)}</div>
          </div>
        </div>
        <div style={{...nb('#fff', 7), position: 'absolute', left: 0, top: 410, width: 380, height: 500, overflow: 'hidden', boxShadow: `7px 7px 0 ${t < 36.2 ? RED : GREEN}`, opacity: pop(t, 32.4)}}>
          <Img src={PH(IMG.radio)} style={{position: 'absolute', inset: 0, width: 380, height: 500, objectFit: 'cover', objectPosition: '50% 45%', opacity: 1 - prog(t, 36.0, 36.5), transform: `scale(${lerp(1, 1.15, prog(t, 32.4, 36.2))})`}} />
          <Img src={PH(IMG.conso)} style={{position: 'absolute', inset: 0, width: 380, height: 500, objectFit: 'cover', objectPosition: '60% 45%', opacity: prog(t, 36.0, 36.5), transformOrigin: '75% 45%', transform: `scale(${lerp(1, 1.5, prog(t, 36.6, 37.4, easeInOut))})`}} />
          {t > 37.0 && t < 38.6 && <div style={{position: 'absolute', left: 200, top: 150, width: 160, height: 160, borderRadius: 80, border: `8px solid ${GOLD}`, transform: `scale(${1 + (t - 37.0) * 0.6})`, opacity: 1 - prog(t, 37.0, 38.6)}} />}
          {t > 36.9 && <div style={{position: 'absolute', left: 16, bottom: 16}}><NBadge at={37.0} text="CONSIGNÉ" bg={GREEN} rot={-4} size={30} /></div>}
        </div>
        {vat && <div style={{position: 'absolute', left: 420, top: 470, display: 'flex', alignItems: 'center', gap: 14, transform: `scale(${Math.min(1, spring(t, 39.1))})`}}><div style={{...nb(NBK, 6), width: 170, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 46, color: t > 39.6 ? '#5BE37D' : YEL}}>{t > 39.6 ? '0 V' : '…'}</div>{t > 39.6 && <NBadge at={39.7} text="ABSENCE D’ÉNERGIE ✓" bg={GREEN} rot={-3} size={26} />}</div>}
        {t > 40.8 && <div style={{position: 'absolute', left: 460, top: 650, display: 'flex', gap: 10}}>{['casque', 'gants', 'lunettes'].map((ic, k) => <div key={ic} style={{transform: `scale(${Math.min(1, spring(t, 40.8 + k * 0.12))})`}}><F n={ic} size={90} /></div>)}</div>}
      </Abs>
    </Out>
  );
};

/* ═════════════ Guichet 5 : anticiper ═════════════ */
const Anticiper: React.FC = () => {
  const t = useT();
  const tilt = lerp(0, 14, prog(t, 47.1, 47.8, easeInOut));
  return (
    <Out end={49.35}>
      <Heads h={[[46.3, ['Anticiper'], [0]], [47.7, ['Des', 'méthodes', 'structurées'], [1, 2]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{...nb('#fff', 8), position: 'absolute', left: 230, top: 0, width: 500, height: 740, overflow: 'hidden', boxShadow: `8px 8px 0 ${VIO}`, opacity: pop(t, 46.1)}}><Img src={PH(IMG.anticiper)} style={{width: 500, height: 889, objectFit: 'cover', transformOrigin: '50% 75%', transform: `translateY(${lerp(0, -120, prog(t, 46.1, 47.6, easeInOut))}px) rotate(${tilt * 0.05}deg)`}} /></div>
        {t > 47.9 && <div style={{position: 'absolute', left: 0, right: 0, top: 780, display: 'flex', justifyContent: 'center', gap: 14}}>{['JSA', 'AMDEC', 'arbre des causes'].map((l, k) => <div key={l} style={{...nb(VIO, 5), padding: '10px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff', transform: `scale(${Math.min(1, spring(t, 47.9 + k * 0.15))})`}}>{l}</div>)}</div>}
      </Abs>
    </Out>
  );
};

/* ═════════════ Fin : capture du profil TikTok dans un téléphone, zoom + numéro WhatsApp entouré ═════════════ */
const PH_W = 330, PH_H = 330 * 2712 / 1220;
const NUM = {x: 0.212 * PH_W, y: 0.32 * PH_H};
const TikTokPhone: React.FC = () => {
  const t = useT();
  if (t < 53.2) return null;
  const up = Math.min(1, spring(t, 53.2));
  const z = prog(t, 53.8, 54.6, easeInOut);
  const Z = lerp(1, 2.2, z);
  const ring = prog(t, 54.5, 55.2, easeOut);
  return (
    <>
      <div style={{position: 'absolute', left: 303, top: 20, width: PH_W + 24, height: PH_H + 24, borderRadius: 48, background: NBK, boxShadow: `10px 10px 0 #25D366, 0 30px 60px rgba(0,0,0,0.25)`, transform: `translateY(${(1 - up) * 900}px) rotate(${(1 - up) * 8}deg)`, padding: 12, boxSizing: 'border-box'}}>
        <div style={{position: 'relative', width: PH_W, height: PH_H, borderRadius: 36, overflow: 'hidden', background: '#fff'}}>
          <Img src={PH(IMG.tiktok)} style={{position: 'absolute', left: 0, top: 0, width: PH_W, height: PH_H, transformOrigin: `${NUM.x}px ${NUM.y}px`, transform: `translate(${(PH_W / 2 - NUM.x) * z}px, ${(PH_H / 2 - NUM.y) * z}px) scale(${Z})`}} />
          {ring > 0 && <svg style={{position: 'absolute', left: 0, top: 0}} width={PH_W} height={PH_H}><ellipse cx={PH_W / 2} cy={PH_H / 2} rx={150} ry={34} fill="none" stroke={RED} strokeWidth={7} strokeLinecap="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - ring}} transform={`rotate(-3 ${PH_W / 2} ${PH_H / 2})`} /></svg>}
          <div style={{position: 'absolute', left: PH_W / 2 - 40, top: 8, width: 80, height: 22, borderRadius: 11, background: NBK}} />
        </div>
      </div>
      {t > 54.8 && <div style={{position: 'absolute', left: 0, top: 20 + 12 + PH_H / 2 - 40, display: 'flex', alignItems: 'center', gap: 6, transform: `translateX(${Math.sin(t * 6) * 8}px) scale(${Math.min(1, spring(t, 54.8))})`}}><div style={{...nb('#25D366', 5), padding: '8px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>WhatsApp</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: RED}}>→</div></div>}
      {t > 55.3 && <div style={{position: 'absolute', left: 0, right: 0, top: 20 + PH_H + 40, display: 'flex', justifyContent: 'center'}}><NBadge at={55.3} text="ÉCRIS-MOI ICI · ACCOMPAGNEMENT PERSONNALISÉ" bg={NBK} rot={-1} size={24} /></div>}
    </>
  );
};

/* ═════════════ Guichet 6 : à toi ═════════════ */
const AToi: React.FC = () => {
  const t = useT();
  return (
    <>
      <Heads h={[[49.6, ['Maîtriser', 'les', 'outils'], [0, 2]], [51.9, ['Tes', 'compétences'], [1]], [53.8, ['Un', 'accompagnement'], [1]]]} />
      <Abs x={60} y={440} w={960} h={930}>
        <div style={{...nb('#fff', 8), position: 'absolute', left: 80, top: 0, width: 800, padding: 26, boxShadow: `8px 8px 0 ${GREEN}`, opacity: pop(t, 49.4) * (1 - prog(t, 53.1, 53.5))}}>
          {[['outils d’analyse des risques', 50.5, 0.85, BLUE], ['compétences QHSE', 52.5, 0.9, GREEN]].map(([l, a, v, c]) => <div key={l as string} style={{marginBottom: 22}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, marginBottom: 8}}>{l}</div><div style={{height: 34, borderRadius: 17, border: `4px solid ${NBK}`, background: '#EEF1F5', overflow: 'hidden'}}><div style={{height: '100%', width: `${(v as number) * 100 * prog(t, a as number, (a as number) + 1.2, easeOut)}%`, background: c as string}} /></div></div>)}
        </div>
        <TikTokPhone />
        {t > 56.0 && <Dust n={22} c={GOLD} />}
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
  ...searchCues(2.7, 21, 4.0, 4.4), {at: 5.7, s: 'tampon', v: 0.4},
  {at: 9.6, s: 'soft-whoosh', v: 0.3, dur: 3.6}, ...DG.map((x) => ({at: x[2], s: 'sfx/thud', v: 0.35})), {at: 13.2, s: 'tampon', v: 0.4},
  {at: 18.0, s: 'sfx/pop', v: 0.3}, ...[18.4, 18.7, 19.2].map((a) => ({at: a, s: 'sfx/swish', v: 0.3})), ...STEPS3.map((x) => ({at: x[2] - 0.2, s: 'sfx/thud', v: 0.35})), {at: 26.8, s: 'validation', v: 0.3},
  {at: 31.0, s: 'sfx/pop', v: 0.3}, {at: 33.4, s: 'sfx/pop', v: 0.25}, {at: 34.6, s: 'sfx/pop', v: 0.25}, {at: 36.0, s: 'sfx/click', v: 0.4}, {at: 37.0, s: 'deep-hit', v: 0.5}, {at: 39.6, s: 'validation', v: 0.35}, ...rep(40.8, 3, 0.12, 'sfx/pop', 0.22),
  {at: 46.5, s: 'sfx/swish', v: 0.35}, {at: 47.1, s: 'sfx/thud', v: 0.4}, ...rep(47.9, 3, 0.15, 'sfx/pop', 0.22),
  {at: 50.5, s: 'sfx/rise', v: 0.25, dur: 1.2}, {at: 52.5, s: 'sfx/rise', v: 0.25, dur: 1.2}, {at: 53.2, s: 'soft-whoosh', v: 0.4, dur: 0.8}, {at: 53.8, s: 'sfx/rise', v: 0.3, dur: 0.8}, {at: 54.5, s: 'stylo', v: 0.35, dur: 0.7}, {at: 54.8, s: 'sfx/pop', v: 0.3}, {at: 55.3, s: 'tampon', v: 0.35}, {at: 56.0, s: 'bass-hit', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
export const JsaMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={6.5}><Intro /></Gate>
    <Gate from={9.5} to={14.5}><Dangers /></Gate>
    <Gate from={17.8} to={27.7}><Jsa /></Gate>
    <Gate from={30.8} to={42.6}><Exemple /></Gate>
    <Gate from={46.0} to={49.4}><Anticiper /></Gate>
    <Gate from={49.3} to={OUTRO_AT}><AToi /></Gate>
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-jsa-metro-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE];
