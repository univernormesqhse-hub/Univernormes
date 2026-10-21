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
 * « Métrologie : vérification ou étalonnage ? » (4 min 39) — capsule « condensé + effet wahou + ultra premium » : voix
 * d'origine (sans musique de fond), sous-titres calés mot à mot, photos générées (ChatGPT) d'après les prompts de
 * prompts-images-metrologie.md, thème « papier quadrillé ».
 * Fil rouge : LE TUBE PNEUMATIQUE À SIX GUICHETS (but commun → vérification → étalonnage → point clé → face-à-face →
 * à retenir), adaptés aux parties réellement présentes ; la capsule file d'un guichet à l'autre, chaque guichet passé se
 * coche. Transition : LE GYROPHARE à chaque partie ; dans les scènes : capsule pneumatique, loupe, store vénitien.
 * Ultra premium : diagramme de Venn qui fusionne sur « la maîtrise de la mesure », interrupteur ON/OFF, jauge de
 * tolérance ±EMT avec aiguille qui sort de la zone verte, arbre de verdict (conforme / ajuster / réparer / déclasser /
 * rebut), bascule de monde « juger → mesurer », courbe d'étalonnage qui se trace point par point, carte d'identité de
 * l'erreur, balle de la responsabilité qui change de camp, calculatrice 10,1 − 0,1 = 10,0, barre de recherche qui trouve
 * puis OUVRE le face-à-face, tableau comparatif, double carte finale « SI / DE COMBIEN ».
 */
const IMG = {
  cover: '',
  technicien: '',
  maitrise: '',
  verification: '',
  rebut: '',
  etalonnage: '',
  operateur: '',
  choix: '',
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
const OUTRO_AT = 279.2;
export const METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 32.2, n: '1', title: 'Le but commun', s: 'la maîtrise de la mesure', c: GREEN, g: 'but commun', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 65.2, n: '2', title: 'La vérification', s: 'conforme ou pas ?', c: BLUE, g: 'vérification', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 133.0, n: '3', title: 'L’étalonnage', s: 'de combien se trompe-t-il ?', c: ORANGE, g: 'étalonnage', k: 'gyro', lab: 'PARTIE 3 / 6'},
  {at: 169.1, n: '4', title: 'Le point clé', s: 'étalonné ≠ juste', c: RED, g: 'point clé', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 215.3, n: '5', title: 'Le face-à-face', s: 'on choisit quoi et quand ?', c: VIO, g: 'face-à-face', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 255.7, n: '6', title: 'À retenir', s: 'certitude ou connaissance ?', c: NAVY, g: 'à retenir', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 268.7;
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

/** Interrupteur ON/OFF animé. */
const Switch: React.FC<{on: number; w: number}> = ({on, w}) => {
  const h = w * 0.48;
  return (
    <div style={{position: 'relative', width: w, height: h, borderRadius: h, background: on > 0.5 ? GREEN : '#C9D2DF', border: `${w * 0.025}px solid ${INK}`, boxShadow: on > 0.5 ? `0 0 ${w * 0.15}px ${GREEN}` : 'none'}}>
      <div style={{position: 'absolute', top: h * 0.08, left: lerp(h * 0.08, w - h * 0.92 - w * 0.05, on), width: h * 0.76, height: h * 0.76, borderRadius: h, background: '#fff', border: `${w * 0.02}px solid ${INK}`, boxSizing: 'border-box'}} />
      <div style={{position: 'absolute', top: 0, bottom: 0, left: on > 0.5 ? w * 0.12 : w * 0.5, width: w * 0.4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: h * 0.36, color: on > 0.5 ? '#fff' : DIM}}>{on > 0.5 ? 'ON' : 'OFF'}</div>
    </div>
  );
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 200}}><Pic src={IMG.cover} ic="equerre" w={1080} h={740} pos="50% 30%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER} 9%, ${PAPER}00 16%, ${PAPER}00 34%, ${PAPER}DD 43%, ${PAPER} 48%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={930} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>MÉTROLOGIE</div>
        <div style={{marginTop: 16}}><Board text="VÉRIFICATION" at={-1} h={76} gap={2} c={BLUE} stag={0.02} /></div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 70, color: INK, marginTop: 6}}>ou</div>
        <div><Board text="ÉTALONNAGE ?" at={-1} h={76} gap={2} c={ORANGE} stag={0.02} /></div>
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
  const ph = t < 15.7 ? 0 : 1;
  const tilt = Math.sin(t * 1.6) * 12 * (1 - prog(t, 13.2, 14.3));
  return (
    <Out end={32.2}>
      {ph === 0 && (
        <>
          <HiLine words={['Vérification', 'ou', 'étalonnage', '?']} mark={[0, 2]} at={2.8} y={330} size={58} />
          <Abs x={60} y={450} w={960} h={560}>
            <div style={{position: 'absolute', left: 470, top: 100, width: 20, height: 380, background: INK, borderRadius: 10}} />
            <div style={{position: 'absolute', left: 380, top: 470, width: 200, height: 36, background: INK, borderRadius: 12}} />
            <div style={{position: 'absolute', left: 60, top: 100, width: 840, height: 0, transform: `rotate(${tilt}deg)`}}>
              <div style={{position: 'absolute', left: 0, top: -9, width: 840, height: 18, background: INK, borderRadius: 9}} />
              {[{l: 'vérifier', c: BLUE, x: -60, ic: 'check', a: 3.2}, {l: 'étalonner', c: ORANGE, x: 600, ic: 'courbe', a: 3.9}].map((p) => (
                <div key={p.l} style={{position: 'absolute', left: p.x, top: 10, width: 300, transform: `rotate(${-tilt}deg)`, transformOrigin: '50% 0', opacity: pop(t, p.a)}}>
                  <div style={{margin: '0 auto', width: 4, height: 40, background: INK}} />
                  <div style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: '0 0 70px 70px', height: 210, boxShadow: `6px 6px 0 ${p.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><F n={p.ic} size={100} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: p.c}}>{p.l}</div></div>
                </div>
              ))}
            </div>
          </Abs>
          <Abs x={0} y={1050} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16}}><Pill at={7.7} c={VIO} size={28}>on les mélange souvent</Pill></Abs>
          <Abs x={60} y={1130} w={960} h={240} style={{background: NIGHT, border: `5px solid ${INK}`, borderRadius: 26, overflow: 'hidden', opacity: pop(t, 10.06)}}>
            <div style={{position: 'absolute', left: 30, top: 22, fontFamily: MONO, fontWeight: 700, fontSize: 24, color: '#9AA7BC'}}>se tromper de procédure coûte</div>
            <div style={{position: 'absolute', left: 30, top: 80, display: 'flex', gap: 20}}><Pill at={11.42} c={ORANGE} size={34}>du temps</Pill><Pill at={11.9} c={RED} size={34}>de l’argent</Pill></div>
            {Array.from({length: 10}, (_, k) => { const a = 10.4 + k * 0.16; const p = prog(t, a, a + 0.6, easeIn); return t > a && <div key={k} style={{position: 'absolute', left: 560 + (k % 5) * 75, top: lerp(-60, 150 - Math.floor(k / 5) * 50, p)}}><F n="argent" size={64} /></div>; })}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 22.6 ? ['Devant', 'un', 'instrument…'] : ['On', 'vérifie', 'ou', 'on', 'étalonne', '?']} mark={t < 22.6 ? [2] : [1, 4]} at={t < 22.6 ? 15.8 : 22.66} y={330} size={58} />
          <Shot src={IMG.technicien} ic="thermometre" x={60} y={440} w={960} h={560} at={15.9} c={BLUE} />
          <Abs x={0} y={1030} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={15.78} c={NAVY} size={26}>technicien</Pill><Pill at={16.38} c={NAVY} size={26}>labo</Pill><Pill at={17.86} c={NAVY} size={26}>qualité</Pill></Abs>
          <Abs x={60} y={1110} w={960} h={250} style={{display: 'flex', gap: 20}}>
            {[{l: 'fiabilité des résultats', ic: 'cible', c: GREEN, a: 27.86}, {l: 'les coûts', ic: 'argent', c: RED, a: 29.3}].map((p) => <div key={p.l} style={{flex: 1, borderRadius: 24, background: '#fff', border: `5px solid ${INK}`, boxShadow: `7px 7px 0 ${p.c}`, display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px', opacity: pop(t, p.a), transform: `translateY(${(1 - pop(t, p.a)) * 40}px)`}}><F n={p.ic} size={100} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: p.c, lineHeight: 1.05}}>{p.l}</span></div>)}
          </Abs>
          <Stamp at={30.5} c={RED} text="le cœur du sujet" x={300} y={760} rot={-7} size={50} />
        </>
      )}
    </Out>
  );
};

/* ═════════════ 1 · LE BUT COMMUN ═════════════ */
const ButCommun: React.FC = () => {
  const t = useT();
  const ph = t < 54.1 ? 0 : 1;
  const join = prog(t, 38.2, 40.6, easeInOut);
  return (
    <Out end={65.2}>
      {ph === 0 && (
        <>
          <HiLine words={['Ce', 'qui', 'les', 'rassemble']} mark={[3]} at={32.4} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={560}>
            {[{l: 'vérification', c: BLUE, x0: 40, x1: 200, a: 36.6}, {l: 'étalonnage', c: ORANGE, x0: 500, x1: 340, a: 37.0}].map((p) => <div key={p.l} style={{position: 'absolute', left: lerp(p.x0, p.x1, join), top: 60, width: 420, height: 420, borderRadius: 210, background: `${p.c}2E`, border: `6px solid ${p.c}`, opacity: pop(t, p.a), boxSizing: 'border-box'}} />)}
            {[{l: 'vérification', c: BLUE, x: 40, a: 36.6}, {l: 'étalonnage', c: ORANGE, x: 600, a: 37.0}].map((p) => <div key={p.l} style={{position: 'absolute', left: p.x, top: 500, width: 320, textAlign: 'center', opacity: pop(t, p.a)}}><span style={{background: p.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 34, padding: '6px 20px', borderRadius: 14, border: `4px solid ${INK}`}}>{p.l}</span></div>)}
            <div style={{position: 'absolute', left: 330, top: 210, width: 300, textAlign: 'center', opacity: pop(t, 40.82), transform: `scale(${0.6 + 0.4 * pop(t, 40.82)})`}}>
              <F n="cible" size={120} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK, lineHeight: 1.05, background: YEL, borderRadius: 12, padding: '6px 4px', border: `4px solid ${INK}`}}>la maîtrise de la mesure</div>
            </div>
          </Abs>
          <Abs x={0} y={1040} w={1080} style={{textAlign: 'center'}}><Pill at={48.54} c={NAVY} size={28}>l’objectif final reste le même</Pill></Abs>
          <Abs x={60} y={1120} w={960} h={230} style={{display: 'flex', gap: 18}}>
            {[{l: 'précises', ic: 'cible', a: 51.86}, {l: 'fiables', ic: 'bouclier', a: 52.66}, {l: 'traçables', ic: 'maillon', a: 53.2}].map((p, k) => <div key={p.l} style={{flex: 1, borderRadius: 22, background: '#fff', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${GREEN}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, opacity: pop(t, p.a), transform: `rotateY(${(1 - pop(t, p.a)) * 90}deg)`}}><F n={p.ic} size={90} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: GREEN}}>{p.l}</span>{k < 2 && <div style={{position: 'absolute'}} />}</div>)}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Maîtriser', 'la', 'mesure', '=', 'rentabilité']} mark={[0, 4]} at={54.2} y={330} size={56} />
          <Shot src={IMG.maitrise} ic="usine" x={60} y={440} w={960} h={460} at={54.2} c={GREEN} blinds />
          <Abs x={60} y={930} w={960} h={430} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 26, boxShadow: `8px 8px 0 ${GREEN}`, padding: '24px 30px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 18}}>
            {[{l: 'gaspillage', ic: 'dechets', up: false, a: 57.38}, {l: 'coûts de développement', ic: 'argent', up: false, a: 58.7}, {l: 'rentabilité', ic: 'trophee', up: true, a: 61.02}, {l: 'tous les processus', ic: 'engrenage', up: true, a: 62.66}].map((p) => <div key={p.l} style={{display: 'flex', alignItems: 'center', gap: 18, opacity: pop(t, p.a), transform: `translateX(${(1 - pop(t, p.a)) * 60}px)`}}><F n={p.ic} size={62} /><span style={{flex: 1, fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: INK}}>{p.l}</span><div style={{width: 70, height: 70, borderRadius: 16, background: p.up ? GREEN : RED, color: '#fff', fontSize: 44, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `translateY(${Math.sin(t * 5) * 4 * (p.up ? -1 : 1)}px)`}}>{p.up ? '↑' : '↓'}</div></div>)}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 2 · LA VÉRIFICATION ═════════════ */
const DEF_V = 'Confirmer, en fournissant des preuves, que des exigences spécifiées ont été satisfaites.';
const Verif: React.FC = () => {
  const t = useT();
  const ph = t < 76.8 ? 0 : t < 94.0 ? 1 : t < 117.0 ? 2 : 3;
  // aiguille de la jauge ±EMT : dans la zone verte (oui) puis dehors (non)
  const needle = t < 109.9 ? lerp(-0.9, 0.35, prog(t, 97.4, 100.0, easeInOut)) : t < 112.2 ? 0.35 : lerp(0.35, 1.25, prog(t, 112.2, 113.2, easeInOut));
  const ok = t > 109.9 && t < 112.2;
  const ko = t > 112.9;
  return (
    <Out end={133.0}>
      {ph === 0 && (
        <>
          <HiLine words={['Un', 'interrupteur']} mark={[1]} at={67.4} y={330} size={66} />
          <Abs x={240} y={480} w={600} h={300} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 68.0), transform: `scale(${0.7 + 0.3 * pop(t, 68.0)})`}}>
            <Switch w={520} on={t < 69.86 ? 0 : t < 70.5 ? 1 : t < 72.82 ? 0 : t < 73.98 ? 1 : 0} />
          </Abs>
          <Abs x={60} y={860} w={960} h={420} style={{display: 'flex', gap: 24}}>
            {[{l: 'OUI', s: 'conforme', c: GREEN, ic: 'check', a: 73.0}, {l: 'NON', s: 'pas conforme', c: RED, ic: 'croix', a: 74.0}].map((p) => <div key={p.l} style={{flex: 1, borderRadius: 30, background: p.c, border: `6px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', opacity: pop(t, p.a), transform: `scale(${0.6 + 0.4 * pop(t, p.a)})`}}><F n={p.ic} size={140} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 70}}>{p.l}</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26}}>{p.s}</div></div>)}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['La', 'définition', 'officielle']} mark={[1]} at={76.9} y={330} size={62} />
          <Win x={60} y={440} w={960} h={330} at={77.0} title="vérification · définition" c={BLUE}>
            <div style={{padding: '22px 30px', fontFamily: handFont, fontWeight: 700, fontSize: 46, color: INK, lineHeight: 1.2}}>« {DEF_V.slice(0, Math.floor(prog(t, 80.3, 85.0) * DEF_V.length))} »</div>
          </Win>
          <Shot src={IMG.verification} ic="equerre" x={60} y={800} w={960} h={420} at={85.4} c={BLUE} blinds>
            <div style={{position: 'absolute', left: 24, bottom: 24, display: 'flex', gap: 12}}><Pill at={87.3} c={BLUE} size={26}>comparer à une référence</Pill><Pill at={91.06} c={GREEN} size={26}>limites de tolérance</Pill></div>
          </Shot>
          <LoupeSweep x0={200} y0={540} x1={760} y1={560} a={81.3} b={84.6} />
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 105.2 ? ['Du', 'binaire', 'pur'] : ['Écart', '<', 'EMT', '?']} mark={t < 105.2 ? [1, 2] : [0, 2]} at={t < 105.2 ? 94.1 : 105.22} y={330} size={66} />
          <Abs x={60} y={450} w={960} h={600} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${ok ? GREEN : ko ? RED : BLUE}`, opacity: pop(t, 95.0)}}>
            <div style={{position: 'absolute', left: 30, top: 22, fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM}}>jauge de tolérance</div>
            <div style={{position: 'absolute', left: 60, right: 60, top: 230, height: 70, borderRadius: 14, background: `linear-gradient(90deg, ${RED}55, ${RED}55 22%, ${GREEN}88 22%, ${GREEN}88 78%, ${RED}55 78%)`, border: `4px solid ${INK}`}} />
            <div style={{position: 'absolute', left: 60, right: 60, top: 310, display: 'flex', justifyContent: 'space-between', fontFamily: MONO, fontWeight: 700, fontSize: 26, color: INK}}><span /><span style={{marginLeft: 120, opacity: pop(t, 108.46)}}>−EMT</span><span>réf.</span><span style={{marginRight: 120, opacity: pop(t, 108.46)}}>+EMT</span><span /></div>
            <div style={{position: 'absolute', left: 476, top: 200, width: 8, height: 130, background: INK, borderRadius: 4}} />
            <div style={{position: 'absolute', left: 480 + needle * 300 - 6, top: 150, width: 12, height: 190, background: ok ? GREEN : ko ? RED : BLUE, borderRadius: 6, boxShadow: `0 0 18px ${ok ? GREEN : ko ? RED : BLUE}`, opacity: pop(t, 97.4)}} />
            <div style={{position: 'absolute', left: 480 + needle * 300 - 40, top: 104, width: 80, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: INK, opacity: pop(t, 98.3)}}>affiché</div>
            {t > 97.4 && <div style={{position: 'absolute', left: Math.min(480, 480 + needle * 300), width: Math.abs(needle * 300), top: 370, height: 6, background: ORANGE, opacity: pop(t, 97.38)}} />}
            <div style={{position: 'absolute', left: 0, right: 0, top: 400, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: ORANGE, opacity: pop(t, 97.38)}}>l’écart</div>
            {ok && <div style={{position: 'absolute', left: 0, right: 0, top: 460, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: GREEN}}>✓ validé</div>}
            {ko && <div style={{position: 'absolute', left: 0, right: 0, top: 460, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: RED}}>✕ problème</div>}
          </Abs>
          <Abs x={60} y={1090} w={960} h={260} style={{background: NIGHT, border: `5px solid ${INK}`, borderRadius: 26, display: 'flex', alignItems: 'center', gap: 26, padding: '0 34px', opacity: pop(t, 106.38)}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 110, color: YEL, lineHeight: 1}}>EMT</div>
            <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 38, color: '#fff', lineHeight: 1.1}}>Erreur<br />Maximale<br />Tolérée</div>
          </Abs>
          {t > 115.5 && <Stamp at={115.54} c={NAVY} text="sans appel" x={560} y={1000} rot={-6} size={48} />}
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={['Le', 'verdict']} mark={[1]} at={117.1} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={180} style={{display: 'flex', gap: 20}}>
            <div style={{flex: 1, borderRadius: 24, background: GREEN, border: `5px solid ${INK}`, color: '#fff', display: 'flex', alignItems: 'center', gap: 14, padding: '0 20px', opacity: pop(t, 118.5)}}><F n="check" size={80} /><div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38}}>conforme</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20}}>retour au service</div></div></div>
            <div style={{flex: 1, borderRadius: 24, background: RED, border: `5px solid ${INK}`, color: '#fff', display: 'flex', alignItems: 'center', gap: 14, padding: '0 20px', opacity: pop(t, 120.28)}}><F n="croix" size={80} /><div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38}}>non conforme</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20}}>une autre histoire</div></div></div>
          </Abs>
          <svg width={1080} height={120} style={{position: 'absolute', left: 0, top: 620}}>{[0, 1, 2, 3].map((k) => <path key={k} d={`M 790 0 C 790 60, ${150 + k * 260} 40, ${150 + k * 260} 110`} fill="none" stroke={RED} strokeWidth={6} strokeDasharray={400} strokeDashoffset={400 * (1 - prog(t, 123.0 + k * 1.4, 123.8 + k * 1.4))} />)}</svg>
          <Abs x={30} y={735} w={1020} h={200} style={{display: 'flex', gap: 14}}>
            {[{l: 'ajuster', ic: 'tournevis', a: 123.3}, {l: 'réparer', ic: 'outils', a: 124.58}, {l: 'déclasser', ic: 'baisse', a: 125.62}, {l: 'rebut', ic: 'poubelle', a: 128.82}].map((p, k) => <div key={p.l} style={{flex: 1, borderRadius: 20, background: k === 3 ? NIGHT : '#fff', border: `5px solid ${INK}`, boxShadow: `5px 5px 0 ${RED}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, opacity: pop(t, p.a), transform: `translateY(${(1 - pop(t, p.a)) * -50}px)`}}><F n={p.ic} size={80} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: k === 3 ? '#fff' : INK}}>{p.l}</span></div>)}
          </Abs>
          <Shot src={IMG.rebut} ic="poubelle" x={60} y={970} w={960} h={400} at={127.8} c={RED} />
          <Stamp at={131.78} c={BLUE} text="constat de vérification" x={150} y={1100} rot={-5} size={44} />
        </>
      )}
    </Out>
  );
};

/* ═════════════ 3 · L'ÉTALONNAGE ═════════════ */
const PTS = [0.4, 0.25, 0.55, 0.1, -0.15, 0.05, -0.3, -0.2];
const Etal: React.FC = () => {
  const t = useT();
  const ph = t < 152.2 ? 0 : 1;
  const flip = prog(t, 139.3, 140.4, easeInOut);
  return (
    <Out end={169.1}>
      {ph === 0 && (
        <>
          <AbsoluteFill style={{background: `linear-gradient(180deg, ${NIGHT}, #1E2740)`, opacity: flip * 0.94}} />
          <HiLine words={t < 145.2 ? ['On', 'change', 'de', 'monde'] : ['De', 'combien', '?']} mark={t < 145.2 ? [1, 3] : [1]} at={t < 145.2 ? 139.3 : 146.38} y={330} size={66} c={flip > 0.5 ? '#fff' : undefined} />
          <Abs x={60} y={460} w={960} h={260} style={{display: 'flex', gap: 24, alignItems: 'center'}}>
            <div style={{flex: 1, borderRadius: 26, background: '#fff', border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, height: 200, position: 'relative', opacity: pop(t, 142.06)}}><F n="juge" size={100} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: DIM}}>juger</span><div style={{position: 'absolute', left: 30, right: 30, top: 96}}><Strike p={prog(t, 143.0, 143.8)} c={RED} /></div></div>
            <div style={{fontSize: 70, color: '#fff', fontWeight: 900}}>→</div>
            <div style={{flex: 1, borderRadius: 26, background: ORANGE, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, height: 200, opacity: pop(t, 144.06), transform: `scale(${0.7 + 0.3 * pop(t, 144.06)})`}}><F n="equerre" size={100} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: '#fff'}}>mesurer</span></div>
          </Abs>
          <Abs x={60} y={780} w={960} h={560} style={{opacity: pop(t, 146.4)}}>
            <div style={{position: 'absolute', inset: 0, borderRadius: 30, background: 'rgba(255,255,255,0.06)', border: `3px solid ${ORANGE}`}} />
            <div style={{position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 200, color: ORANGE, textShadow: `0 0 40px ${ORANGE}`}}>± ?</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 340, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 30, color: '#E7ECF5', opacity: pop(t, 150.9)}}>le monde du chiffre précis</div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 158.4 ? ['Établir', 'une', 'relation'] : t < 163.3 ? ['La', 'carte', 'd’identité', 'de', 'l’erreur'] : ['Une', 'cartographie', 'précise']} mark={t < 158.4 ? [0, 2] : t < 163.3 ? [1, 2, 4] : [1]} at={t < 158.4 ? 152.3 : t < 163.3 ? 158.5 : 163.3} y={330} size={54} />
          <Shot src={IMG.etalonnage} ic="microscope" x={60} y={440} w={960} h={340} at={152.3} c={ORANGE} />
          <Abs x={60} y={810} w={960} h={560} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `9px 9px 0 ${ORANGE}`, overflow: 'hidden', opacity: pop(t, 154.0)}}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 64, background: t > 160.6 ? ORANGE : NAVY, color: '#fff', display: 'flex', alignItems: 'center', gap: 12, padding: '0 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 28}}><F n="carte-id" size={44} />{t > 160.6 ? 'CARTE D’IDENTITÉ DE L’ERREUR' : 'instrument ↔ étalons'}</div>
            <svg width={948} height={480} style={{position: 'absolute', left: 0, top: 64}}>
              <line x1={60} y1={230} x2={900} y2={230} stroke={DIM} strokeWidth={3} strokeDasharray="10 8" />
              <line x1={60} y1={20} x2={60} y2={440} stroke={INK} strokeWidth={4} />
              <line x1={60} y1={440} x2={900} y2={440} stroke={INK} strokeWidth={4} />
              {t > 164.3 && <rect x={60} y={150} width={840 * prog(t, 164.3, 167.4)} height={160} fill={`${ORANGE}22`} />}
              {PTS.map((v, k) => { const a = 155.4 + k * 0.5; const x = 110 + k * 110; const y = 230 - v * 300; return t > a ? <g key={k} opacity={pop(t, a)}><line x1={x} y1={230} x2={x} y2={y} stroke={ORANGE} strokeWidth={4} /><circle cx={x} cy={y} r={14} fill={ORANGE} stroke={INK} strokeWidth={4} /></g> : null; })}
              <polyline points={PTS.map((v, k) => `${110 + k * 110},${230 - v * 300}`).join(' ')} fill="none" stroke={RED} strokeWidth={6} strokeDasharray={1200} strokeDashoffset={1200 * (1 - prog(t, 159.6, 162.4))} />
              <text x={70} y={470} fontFamily="monospace" fontSize={22} fill={DIM}>toute l’échelle de mesure →</text>
              <text x={74} y={44} fontFamily="monospace" fontSize={22} fill={DIM}>erreur</text>
            </svg>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 4 · LE POINT CLÉ ═════════════ */
const Q1 = 'Un instrument étalonné n’est pas obligatoirement juste.';
const Cle: React.FC = () => {
  const t = useT();
  const ph = t < 193.5 ? 0 : t < 203.9 ? 1 : 2;
  const ball = prog(t, 196.3, 197.9, easeInOut);
  return (
    <Out end={215.3}>
      {ph === 0 && (
        <>
          <HiLine words={['Le', 'point', 'le', 'plus', 'important']} mark={[1, 4]} at={169.4} y={330} size={56} />
          <Abs x={60} y={450} w={960} h={520} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 30, boxShadow: `10px 10px 0 ${RED}`, padding: 40, boxSizing: 'border-box', opacity: pop(t, 172.3), overflow: 'hidden'}}>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM}}>contre l’intuition</div>
            <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 66, color: INK, lineHeight: 1.15, marginTop: 14}}>« {Q1.slice(0, Math.floor(prog(t, 176.46, 179.6) * Q1.length))} »</div>
            <div style={{position: 'absolute', right: 40, bottom: 30, display: 'flex', alignItems: 'center', gap: 16, opacity: pop(t, 181.86)}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: ORANGE}}>étalonné</span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: RED}}>≠</span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: GREEN}}>juste</span></div>
            <Shine at={182.9} />
          </Abs>
          <Abs x={60} y={1010} w={960} h={340} style={{display: 'flex', gap: 20}}>
            <div style={{flex: 1, borderRadius: 26, background: NIGHT, border: `5px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: pop(t, 184.82)}}><F n="sens-interdit" size={100} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff', textAlign: 'center'}}>ça ne corrige rien</span></div>
            <div style={{flex: 1, borderRadius: 26, background: '#fff', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${ORANGE}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: pop(t, 186.02)}}><F n="ecrit" size={100} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, textAlign: 'center', lineHeight: 1.1}}>documente l’erreur</span><div style={{opacity: pop(t, 189.26)}}><Pill at={189.26} c={RED} size={26}>précision chirurgicale</Pill></div></div>
          </Abs>
          <LoupeSweep x0={160} y0={1140} x1={700} y1={1120} a={189.3} b={192.4} />
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['La', 'responsabilité', 'change', 'de', 'camp']} mark={[1, 4]} at={193.6} y={330} size={54} />
          <Abs x={60} y={460} w={960} h={420}>
            {[{l: 'laboratoire', ic: 'microscope', x: 0, c: ORANGE}, {l: 'opérateur', ic: 'ouvrier', x: 600, c: BLUE}].map((p) => <div key={p.l} style={{position: 'absolute', left: p.x, top: 10, width: 360, height: 280, borderRadius: 28, background: '#fff', border: `5px solid ${INK}`, boxShadow: `7px 7px 0 ${p.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 194.0)}}><F n={p.ic} size={130} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: p.c}}>{p.l}</span></div>)}
            <div style={{position: 'absolute', left: lerp(130, 730, ball), top: 305 - Math.sin(ball * Math.PI) * 170, width: 100, height: 100, borderRadius: 50, background: YEL, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 18, color: INK, boxShadow: `0 0 30px ${YEL}`, opacity: pop(t, 194.66)}}>respon-<br />sabilité</div>
          </Abs>
          <Shot src={IMG.operateur} ic="ouvrier" x={60} y={900} w={960} h={460} at={198.9} c={BLUE} blinds>
            <div style={{position: 'absolute', left: 24, bottom: 24}}><Pill at={200.82} c={BLUE} size={28}>appliquer la correction à chaque mesure</Pill></div>
          </Shot>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Exemple']} mark={[0]} at={204.0} y={330} size={66} />
          <Abs x={160} y={440} w={760} h={900} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 40, boxShadow: `10px 10px 0 ${BLUE}`, padding: 34, boxSizing: 'border-box', opacity: pop(t, 204.0)}}>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: '#9AA7BC'}}>calcul de l’opérateur</div>
            {[{l: 'affiché', v: '10,1', c: '#fff', a: 205.4}, {l: 'correction', v: '− 0,1', c: ORANGE, a: 208.6}, {l: 'vraie valeur', v: '= 10,0', c: GREEN, a: 210.98}].map((r) => <div key={r.l} style={{marginTop: 34, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: '2px dashed #3A4356', paddingBottom: 18, opacity: pop(t, r.a), transform: `translateX(${(1 - pop(t, r.a)) * 60}px)`}}><span style={{fontFamily: MONO, fontWeight: 700, fontSize: 28, color: '#C9D2DF'}}>{r.l}</span><span style={{fontFamily: MONO, fontWeight: 700, fontSize: 96, color: r.c, textShadow: r.c === GREEN ? `0 0 26px ${GREEN}` : undefined}}>{r.v}</span></div>)}
            <div style={{marginTop: 34, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#9AA7BC', opacity: pop(t, 207.0)}}>erreur indiquée par le certificat d’étalonnage : −0,1</div>
          </Abs>
          <Stamp at={213.7} c={RED} text="sans correction : mesure fausse" x={120} y={1180} rot={-5} size={42} />
        </>
      )}
    </Out>
  );
};

/* ═════════════ 5 · LE FACE-À-FACE ═════════════ */
const ROWS = [
  {v: 'simplicité, lecture directe', e: 'plus souple', av: 229.06, ae: 240.1, ok: [true, true]},
  {v: 'instrument juste dès le départ', e: 'prestation souvent moins chère', av: 234.02, ae: 241.26, ok: [false, true]},
  {v: 'maintenance plus chère', e: 'pas besoin de toucher au réglage', av: 236.26, ae: 242.9, ok: [false, true]},
  {v: 'sans se poser de questions', e: 'risque d’erreur humaine', av: 230.22, ae: 248.86, ok: [true, false]},
];
const Face: React.FC = () => {
  const t = useT();
  return (
    <Out end={255.7}>
      <HiLine words={t < 224.1 ? ['On', 'choisit', 'quoi', 'et', 'quand', '?'] : t < 250.8 ? ['Une', 'question', 'de', 'compromis'] : ['Le', 'choix', 'dépend', 'de…']} mark={t < 224.1 ? [1, 4] : t < 250.8 ? [3] : [2]} at={t < 224.1 ? 215.6 : t < 250.8 ? 224.2 : 250.9} y={330} size={58} />
      <SearchOpen x={60} y={440} w={960} h={770} at={219.3} query="vérification vs étalonnage" results={['Vérification : définition', 'Vérification vs étalonnage', 'Étalonnage : certificat']} found={1} foundAt={221.0} clickAt={221.4} c={VIO}>
        <div style={{position: 'absolute', inset: 0, padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 12}}>
          <div style={{display: 'flex', gap: 12}}>{[{l: 'VÉRIFICATION', c: BLUE, a: 226.4}, {l: 'ÉTALONNAGE', c: ORANGE, a: 238.3}].map((h) => <div key={h.l} style={{flex: 1, borderRadius: 14, background: h.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, textAlign: 'center', padding: '10px 0', opacity: pop(t, h.a)}}>{h.l}</div>)}</div>
          {ROWS.map((r) => <div key={r.v} style={{display: 'flex', gap: 12}}>{[{s: r.v, a: r.av, ok: r.ok[0]}, {s: r.e, a: r.ae, ok: r.ok[1]}].map((c, k) => <div key={k} style={{flex: 1, minHeight: 110, borderRadius: 14, background: '#fff', border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', opacity: pop(t, c.a), transform: `scale(${0.8 + 0.2 * pop(t, c.a)})`}}><div style={{width: 40, height: 40, borderRadius: 10, background: c.ok ? GREEN : RED, color: '#fff', fontWeight: 900, fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{c.ok ? '+' : '−'}</div><span style={{fontFamily: sansFont, fontWeight: 800, fontSize: 25, color: INK, lineHeight: 1.1}}>{c.s}</span></div>)}</div>)}
        </div>
      </SearchOpen>
      <Abs x={0} y={1240} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={252.1} c={VIO} size={28}>précision voulue</Pill><Pill at={253.26} c={VIO} size={28}>budget</Pill><Pill at={253.9} c={VIO} size={28}>compétences</Pill></Abs>
      {t < 224.1 && <Abs x={760} y={1240} w={260} h={140} style={{opacity: 0}} />}
    </Out>
  );
};

/* ═════════════ 6 · À RETENIR ═════════════ */
const Retenir: React.FC = () => {
  const t = useT();
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={t < 269.6 ? ['Une', 'seule', 'chose', 'à', 'retenir'] : ['Une', 'question', 'stratégique']} mark={t < 269.6 ? [1, 4] : [2]} at={t < 269.6 ? 256.5 : 273.6} y={330} size={58} />
      {[{y: 450, c: BLUE, ic: 'check', big: 'SI', l: 'La vérification dit si l’appareil est acceptable.', sub: 'jugement de conformité', a: 259.94, as: 265.78}, {y: 830, c: ORANGE, ic: 'courbe', big: 'DE COMBIEN', l: 'L’étalonnage dit de combien il se trompe.', sub: 'cartographie de l’erreur', a: 262.82, as: 267.82}].map((p) => (
        <Abs key={p.big} x={60} y={p.y} w={960} h={340} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 30, boxShadow: `9px 9px 0 ${p.c}`, overflow: 'hidden', opacity: pop(t, p.a), transform: `perspective(1400px) rotateX(${(1 - pop(t, p.a)) * 70}deg)`}}>
          <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 240, background: p.c, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><F n={p.ic} size={100} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: p.big.length > 3 ? 32 : 70, textAlign: 'center'}}>{p.big}</div></div>
          <div style={{position: 'absolute', left: 270, right: 30, top: 40, fontFamily: handFont, fontWeight: 700, fontSize: 50, color: INK, lineHeight: 1.15}}>« {p.l} »</div>
          <div style={{position: 'absolute', left: 270, bottom: 30}}><Pill at={p.as} c={p.c} size={28}>{p.sub}</Pill></div>
          <Shine at={p.a + 0.8} />
        </Abs>
      ))}
      <Abs x={60} y={1210} w={960} h={170} style={{display: 'flex', gap: 18, alignItems: 'center', opacity: pop(t, 274.74)}}>
        <div style={{flex: 1, height: 130, borderRadius: 22, background: BLUE, border: `5px solid ${INK}`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, textAlign: 'center'}}>certitude simple</div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 52, color: INK}}>ou</div>
        <div style={{flex: 1, height: 130, borderRadius: 22, background: ORANGE, border: `5px solid ${INK}`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, textAlign: 'center', opacity: pop(t, 275.82)}}>connaissance précise</div>
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
const pops = (L: number[], v = 0.22): Sfx[] => L.map((a) => ({at: a, s: 'sfx/pop', v}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, ...flaps(0.1, 14), {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 0.8, s: 'validation', v: 0.18})), {at: ALLDONE, s: 'validation', v: 0.35},
  {at: 2.8, s: 'sfx/rise', v: 0.22, dur: 1.2}, ...pops([3.2, 3.9, 7.7]), {at: 10.06, s: 'sfx/whoosh', v: 0.2}, ...rep(10.4, 10, 0.16, 'sfx/click', 0.1), ...pops([11.42, 11.9]),
  {at: 15.9, s: 'soft-whoosh', v: 0.35, dur: 1}, ...pops([15.78, 16.38, 17.86], 0.15), {at: 22.66, s: 'sfx/ding', v: 0.2}, ...pops([27.86, 29.3]), {at: 30.5, s: 'tampon', v: 0.6},
  ...pops([36.6, 37.0]), {at: 38.2, s: 'sfx/rise', v: 0.22, dur: 2}, {at: 40.82, s: 'bass-hit', v: 0.3}, shine(41.0), {at: 48.54, s: 'sfx/pop', v: 0.2}, ...[51.86, 52.66, 53.2].map((a) => ({at: a, s: 'sfx/ding', v: 0.2})),
  {at: 54.2, s: 'soft-whoosh', v: 0.35, dur: 1}, ...[57.38, 58.7].map((a) => ({at: a, s: 'sfx/thud', v: 0.22})), ...[61.02, 62.66].map((a) => ({at: a, s: 'sfx/rise', v: 0.2, dur: 0.8})),
  {at: 68.0, s: 'sfx/pop', v: 0.25}, ...[69.86, 70.5, 72.82, 73.98].map((a) => ({at: a, s: 'sfx/click', v: 0.5})), {at: 73.0, s: 'validation', v: 0.22}, {at: 74.0, s: 'sfx/thud', v: 0.3},
  {at: 77.0, s: 'sfx/whoosh', v: 0.2}, ...rep(80.3, 24, 0.2, 'sfx/click', 0.07), {at: 81.3, s: 'soft-whoosh', v: 0.25, dur: 2}, {at: 85.4, s: 'soft-whoosh', v: 0.35, dur: 1}, ...pops([87.3, 91.06]),
  {at: 95.0, s: 'sfx/whoosh', v: 0.2}, {at: 97.4, s: 'sfx/rise', v: 0.2, dur: 2.5}, {at: 106.38, s: 'sfx/pop', v: 0.22}, {at: 108.46, s: 'sfx/ding', v: 0.22}, {at: 109.9, s: 'validation', v: 0.4}, {at: 112.2, s: 'sfx/swish', v: 0.3}, {at: 112.9, s: 'alarme', v: 0.06, dur: 0.8}, {at: 115.54, s: 'tampon', v: 0.6},
  {at: 118.5, s: 'validation', v: 0.25}, {at: 120.28, s: 'sfx/thud', v: 0.3}, ...pops([123.3, 124.58, 125.62]), {at: 127.8, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 128.82, s: 'deep-hit', v: 0.35}, {at: 131.78, s: 'tampon', v: 0.6},
  {at: 139.3, s: 'bass-hit', v: 0.35}, {at: 139.35, s: 'soft-whoosh', v: 0.4, dur: 1.5}, {at: 142.06, s: 'sfx/pop', v: 0.2}, {at: 143.0, s: 'sfx/swish', v: 0.3}, {at: 144.06, s: 'sfx/ding', v: 0.25}, ...rep(146.4, 16, 0.2, 'tick', 0.12), {at: 150.9, s: 'sfx/pop', v: 0.2},
  {at: 152.3, s: 'soft-whoosh', v: 0.35, dur: 1}, {at: 154.0, s: 'sfx/whoosh', v: 0.2}, ...rep(155.4, 8, 0.5, 'sfx/pop', 0.14), {at: 159.6, s: 'sfx/rise', v: 0.2, dur: 2.8}, {at: 160.6, s: 'sfx/ding', v: 0.22}, {at: 164.3, s: 'soft-whoosh', v: 0.25, dur: 3},
  {at: 172.3, s: 'sfx/whoosh', v: 0.22}, ...rep(176.46, 26, 0.12, 'sfx/click', 0.07), {at: 181.86, s: 'bass-hit', v: 0.35}, shine(182.9), {at: 184.82, s: 'sfx/thud', v: 0.3}, {at: 186.02, s: 'sfx/pop', v: 0.22}, {at: 189.26, s: 'sfx/ding', v: 0.22}, {at: 189.3, s: 'soft-whoosh', v: 0.25, dur: 3},
  {at: 194.0, s: 'sfx/whoosh', v: 0.22}, {at: 196.3, s: 'soft-whoosh', v: 0.45, dur: 1.6}, {at: 197.9, s: 'sfx/thud', v: 0.35}, {at: 198.9, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 200.82, s: 'sfx/pop', v: 0.2},
  {at: 204.0, s: 'sfx/whoosh', v: 0.2}, ...[205.4, 208.6].map((a) => ({at: a, s: 'sfx/click', v: 0.4})), {at: 210.98, s: 'validation', v: 0.4}, {at: 213.7, s: 'tampon', v: 0.6},
  ...searchCues(219.3, 26, 221.0, 221.4), {at: 226.4, s: 'sfx/pop', v: 0.22}, {at: 238.3, s: 'sfx/pop', v: 0.22}, ...ROWS.flatMap((r) => pops([r.av, r.ae], 0.16)), ...pops([252.1, 253.26, 253.9], 0.2),
  {at: 259.94, s: 'sfx/whoosh', v: 0.3}, {at: 262.82, s: 'sfx/whoosh', v: 0.3}, shine(260.7), shine(263.6), ...pops([265.78, 267.82]), {at: 274.74, s: 'sfx/rise', v: 0.22, dur: 1.2}, {at: 275.82, s: 'sfx/pop', v: 0.22},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Metrologie: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={32.25}><Intro /></Gate>
    <Gate from={32.6} to={65.25}><ButCommun /></Gate>
    <Gate from={65.6} to={133.05}><Verif /></Gate>
    <Gate from={133.4} to={169.15}><Etal /></Gate>
    <Gate from={169.5} to={215.35}><Cle /></Gate>
    <Gate from={215.7} to={255.75}><Face /></Gate>
    <Gate from={256.1} to={OUTRO_AT}><Retenir /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}><Gyro i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={279.0}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-metrologie-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Kin, Brut, T, TitleBlock, Win, GLASS, Check, Tile, Card, Num, random, GlassCard, IcoLab, Mono, TEAL, BURG, sectIdx, Blinds, Deep, spring];
