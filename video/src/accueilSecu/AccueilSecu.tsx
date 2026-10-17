import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Captions} from '../components/Captions';
import {Blinds, Board, Cite, Deep, Dust, Kin, Out, Pill, Stamp, Tile} from '../durab/Durab';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {handFont, s, sansFont} from '../theme';
import {Abs, Bg, DIM, easeIn, easeInOut, easeOut, GREEN, INK, lerp, LOGO, PAPER, PH, pop, prog, RED, spring, T, useT} from '../implIso/kit';
import {Brut, HiLine, Mono, Strike} from '../tdbPilot/TdbPilot';
import {captions} from './captions';

/**
 * « Accueil sécurité sur site » (6 min 35) — capsule « condensé + effet wahou » : voix d'origine, sous-titres recalés
 * mot à mot, photos réelles, thème « papier quadrillé ».
 * Fil rouge : LE TUBE PNEUMATIQUE À SIX GUICHETS (enjeux → objectifs → contenu → pratiques → sous-traitants →
 * culture) ; la capsule du dossier file d'un guichet à l'autre et chaque guichet passé se coche.
 * Transitions : LE PNEUMATIQUE (parties 1 et 5), LA LOUPE (2 et 6), LE STORE VÉNITIEN (3), LE GYROPHARE (4).
 * Condensé de la série : texte cinétique, mot surligné jaune, mot manuscrit, tuiles de bois, palettes d'affichage,
 * fenêtres d'interface, store vénitien sur photo, photos en profondeur, compteurs, cartes à ombre dure, étiquettes
 * monospace, tampons, mots barrés, onde de choc, écran qui tremble, cases cochées, poussière.
 * Effets « wahou » nouveaux : mot « BIENVENUE » assemblé par 150 particules, papier « formalité » déchiré en deux,
 * portail 3D qui s'ouvre et caméra qui le traverse, rempart de briques, imprimante à badges, onde de danger qui
 * contamine, carrousel 3D des quatre objectifs, signature manuscrite qui se trace, plan du site isométrique en 3D
 * avec radar des dangers, silhouette qui s'équipe, panneaux d'interdiction qui se barrent, brèches colmatées,
 * comparateur avant / après à curseur, tour de vulnérabilités qui vacille, courbes qui se croisent, levier,
 * horloge qui s'emballe et calendrier qui s'effeuille, œil qui s'ouvre au final.
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
const OUTRO_AT = 395.5;
export const ACCUEIL_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 52.85, n: '1', title: 'Les enjeux de l’accueil', s: 'une étape obligatoire', c: RED, g: 'enjeux', k: 'tube', lab: 'DOSSIER N°1'},
  {at: 103.5, n: '2', title: 'Les quatre objectifs', s: 'informer et préparer', c: BLUE, g: 'objectifs', k: 'loupe', lab: 'PARTIE 2 / 6'},
  {at: 151.2, n: '3', title: 'Le contenu incontournable', s: 'les piliers de l’accueil', c: ORANGE, g: 'contenu', k: 'store', lab: 'PARTIE 3 / 6'},
  {at: 221.9, n: '4', title: 'Erreurs et bonnes pratiques', s: 'la théorie face au terrain', c: VIO, g: 'pratiques', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 269.3, n: '5', title: 'Les sous-traitants', s: 'un enjeu majeur', c: TEAL, g: 'sous-traitants', k: 'tube', lab: 'DOSSIER N°5'},
  {at: 304.7, n: '6', title: 'La culture sécurité', s: 'le levier numéro 1', c: GREEN, g: 'culture', k: 'loupe', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 391.2;

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
  const word = (S0.g === 'sous-traitants' ? 'RIGUEUR' : S0.g).toUpperCase().slice(0, 7);
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


/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('zones/entrepot.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 880, objectFit: 'cover', objectPosition: '55% 40%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 30%, ${PAPER}DD 40%, ${PAPER} 45%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={700} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>LA PREMIÈRE LIGNE DE DÉFENSE</div>
        <div style={{marginTop: 22}}><Board text="ACCUEIL" at={-1} h={104} c={RED} stag={0.03} /></div>
        <div style={{display: 'flex', justifyContent: 'center', gap: 6, marginTop: 22}}>{'SÉCURITÉ'.split('').map((c, i) => <Tile key={i} ch={c} size={96} c={NAVY} />)}</div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 100, color: INK, marginTop: 4}}>sur <span style={{backgroundImage: `linear-gradient(${YEL}, ${YEL})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 40%', backgroundPosition: '0 85%'}}>site</span></div>
      </Abs>
      <Abs x={60} y={1340} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={RED} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 70, width: 140, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Wahou 1 : BIENVENUE en particules ═════════════ */
const GLYPH: Record<string, string[]> = {
  B: ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  V: ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
};
const PIX = (() => {
  const out: {x: number; y: number; k: number}[] = [];
  'BIENVENUE'.split('').forEach((ch, li) => GLYPH[ch].forEach((row, r) => row.split('').forEach((v, c) => {if (v === '1') out.push({x: li * 6 + c, y: r, k: out.length});})));
  return out;
})();
const Particles: React.FC<{at: number; out: number}> = ({at, out}) => {
  const t = useT();
  const cell = 19.4;
  const x0 = (1080 - 53 * cell) / 2;
  const blow = prog(t, out, out + 0.8, easeIn);
  return (
    <>
      {PIX.map((p) => {
        const d = random(`pd${p.k}`) * 0.9;
        const q = prog(t, at + d, at + d + 1.1, easeOut);
        const sx = random(`psx${p.k}`) * 1400 - 160, sy = random(`psy${p.k}`) * 1500 + 300;
        const tx = x0 + p.x * cell, ty = 520 + p.y * cell;
        const bx = tx + (random(`pbx${p.k}`) - 0.5) * 1600 * blow, by = ty - random(`pby${p.k}`) * 900 * blow;
        const hue = [RED, ORANGE, YEL, GREEN, BLUE][p.x % 5];
        const settled = q > 0.98;
        return <div key={p.k} style={{position: 'absolute', left: lerp(sx, bx, q), top: lerp(sy, by, q), width: cell - 3, height: cell - 3, borderRadius: settled ? 4 : 10, background: settled ? INK : hue, boxShadow: settled ? `0 0 0 0 ${INK}` : `0 0 14px ${hue}`, transform: `rotate(${(1 - q) * 360 * (random(`pr${p.k}`) - 0.5)}deg) scale(${0.4 + 0.6 * q})`, opacity: (q > 0 ? 1 : 0) * (1 - blow)}} />;
      })}
    </>
  );
};
/** Feuille « formalité » déchirée en deux (dents de scie). */
const Tear: React.FC<{x: number; y: number; w: number; h: number; at: number; tear: number; children: React.ReactNode}> = ({x, y, w, h, at, tear, children}) => {
  const t = useT();
  const p = prog(t, tear, tear + 0.5, easeIn);
  const zig = Array.from({length: 13}, (_, k) => `${50 + (k % 2 ? 4 : -4)}% ${(k / 12) * 100}%`);
  const L = `polygon(0 0, ${zig.join(', ')}, 0 100%)`;
  const R = `polygon(100% 0, ${zig.join(', ')}, 100% 100%)`;
  const sheet = (clip: string, dir: number) => (
    <div style={{position: 'absolute', inset: 0, clipPath: clip, transform: `translateX(${dir * p * 420}px) translateY(${p * 260}px) rotate(${dir * p * 16}deg)`, opacity: 1 - p * 0.9}}>
      <div style={{position: 'absolute', inset: 0, background: '#F4F1E8', border: `4px solid #B8B2A2`, borderRadius: 8, boxShadow: '0 14px 30px rgba(0,0,0,0.12)'}}>{children}</div>
    </div>
  );
  return <Abs x={x} y={y} w={w} h={h} style={{opacity: pop(t, at), transform: `translateY(${(1 - pop(t, at)) * 40}px)`}}>{sheet(L, -1)}{sheet(R, 1)}</Abs>;
};
const Intro: React.FC = () => {
  const t = useT();
  return (
    <Out end={11.7}>
      {t < 6.0 && <Particles at={2.3} out={5.2} />}
      {t < 6.0 && <Abs x={0} y={720} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 64, color: GREEN, opacity: pop(t, 3.6) * (1 - prog(t, 5.2, 5.7))}}>dans ce décryptage</Abs>}
      {t >= 5.6 && (
        <>
          <HiLine words={['Une', 'simple', 'formalité', '?']} mark={[2]} at={6.0} y={330} size={66} />
          <Tear x={140} y={460} w={800} h={560} at={6.2} tear={9.7}>
            <div style={{padding: 40, fontFamily: MONO, fontWeight: 700, color: '#8C8676'}}>
              <div style={{fontSize: 30, letterSpacing: 3}}>FORMULAIRE N° 00-ACC</div>
              {['corvée', 'formalité administrative', 'un peu barbante'].map((l, k) => <div key={l} style={{fontSize: 34, marginTop: 34, opacity: pop(t, [6.0, 7.3, 8.6][k])}}>☐ {l}</div>)}
              <div style={{marginTop: 50, fontSize: 26}}>signature : ____________</div>
            </div>
          </Tear>
          {t > 9.8 && <Abs x={0} y={600} w={1080} style={{textAlign: 'center'}}><Board text="ACCUEIL" at={9.9} h={110} c={RED} stag={0.03} /><div style={{display: 'flex', justifyContent: 'center', gap: 6, marginTop: 24}}>{'SÉCURITÉ'.split('').map((c, i) => <div key={i} style={{transform: `scale(${Math.max(0, Math.min(1, spring(t, 10.2 + i * 0.05, 8, 11)))})`}}><Tile ch={c} size={96} c={NAVY} /></div>)}</div></Abs>}
        </>
      )}
    </Out>
  );
};

/* ═════════════ Wahou 2 : le portail 3D qu'on traverse ═════════════ */
const Portail: React.FC = () => {
  const t = useT();
  const open = prog(t, 19.3, 20.9, easeInOut);
  const dive = prog(t, 20.6, 22.0, easeIn);
  const bars = (side: number) => (
    <div style={{position: 'absolute', top: 0, width: 400, height: 640, left: side < 0 ? 0 : 400, transformOrigin: side < 0 ? '0 50%' : '100% 50%', transform: `perspective(1400px) rotateY(${side * -open * 82}deg)`, background: 'transparent'}}>
      <div style={{position: 'absolute', inset: 0, border: `14px solid ${INK}`, borderRadius: 10}} />
      {Array.from({length: 7}, (_, k) => <div key={k} style={{position: 'absolute', left: 30 + k * 52, top: 10, width: 14, height: 620, background: INK, borderRadius: 7}} />)}
      <div style={{position: 'absolute', left: 0, right: 0, top: 300, height: 30, background: `repeating-linear-gradient(45deg, ${YEL} 0 30px, ${INK} 30px 60px)`}} />
    </div>
  );
  return (
    <Out end={24.6}>
      <HiLine words={['Dès', 'le', 'portail', 'd’entrée']} mark={[2]} at={19.1} y={330} size={66} />
      <AbsoluteFill style={{transform: `scale(${1 + dive * 2.6})`, transformOrigin: '540px 820px', opacity: 1 - prog(t, 21.6, 22.1), filter: `blur(${dive * 6}px)`}}>
        <Abs x={140} y={500} w={800} h={640} style={{overflow: 'visible', opacity: pop(t, 12.0)}}>
          <Img src={PH('risquebrut/chantier.jpg')} style={{position: 'absolute', inset: 0, width: 800, height: 640, objectFit: 'cover', borderRadius: 10, filter: `brightness(${0.6 + open * 0.4})`}} />
          {bars(-1)}{bars(1)}
          <div style={{position: 'absolute', left: -60, top: -40, width: 60, height: 720, background: '#4A5468', borderRadius: 8}} /><div style={{position: 'absolute', right: -60, top: -40, width: 60, height: 720, background: '#4A5468', borderRadius: 8}} />
        </Abs>
        <Abs x={0} y={1180} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16}}><Pill at={14.9} c={INK} size={30}>chantier</Pill><Pill at={16.1} c={INK} size={30}>usine</Pill><Pill at={17.1} c={DIM} size={28}>pas à la machine…</Pill></Abs>
      </AbsoluteFill>
      {t > 21.7 && (
        <Deep src="verites/formation-sol.jpg" x={70} y={460} w={940} h={600} at={21.7} pos="50% 50%">
          <div style={{position: 'absolute', left: 18, top: 18}}><Mono at={22.0} c={GREEN} size={22}>vous êtes sur site</Mono></div>
          <div style={{position: 'absolute', left: 30, bottom: 30, background: '#fff', padding: '10px 18px', borderRadius: 10, fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK, opacity: pop(t, 22.4)}}><span style={{position: 'relative'}}>un bout de papier<Strike p={prog(t, 23.0, 23.6)} c={RED} /></span></div>
        </Deep>
      )}
    </Out>
  );
};
const Rempart: React.FC = () => {
  const t = useT();
  return (
    <Out end={37.3}>
      <HiLine words={['La', 'première', 'ligne', 'de', 'défense']} mark={[1, 2]} at={24.9} y={330} size={58} />
      <Abs x={90} y={470} w={900} h={520}>
        {Array.from({length: 5}, (_, r) => Array.from({length: 6 - (r % 2)}, (_, c) => {
          const a = 27.0 + (r * 6 + c) * 0.07;
          const p = Math.max(0, Math.min(1, spring(t, a, 9, 12)));
          return <div key={`${r}-${c}`} style={{position: 'absolute', left: c * 150 + (r % 2) * 75, top: 420 - r * 86, width: 144, height: 80, borderRadius: 8, background: `linear-gradient(180deg, #E06A4E, ${BURG})`, border: `3px solid ${INK}`, transform: `translateY(${(1 - p) * -500}px)`, opacity: t >= a ? 1 : 0}} />;
        }))}
        <div style={{position: 'absolute', left: 330, top: -10, transform: `scale(${Math.max(0, Math.min(1, spring(t, 28.3, 8, 10)))})`}}><F n="bouclier" size={240} /></div>
      </Abs>
      <Abs x={0} y={1030} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', padding: '0 60px', boxSizing: 'border-box'}}>
        {Array.from({length: 12}, (_, k) => <div key={k} style={{opacity: pop(t, 29.7 + k * 0.06), transform: `translateY(${(1 - pop(t, 29.7 + k * 0.06)) * 30}px)`}}><F n={['ouvrier', 'salariee', 'salarie', 'intervenant'][k % 4]} size={66} /></div>)}
      </Abs>
      <Abs x={0} y={1130} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 56, color: INK, opacity: pop(t, 30.5)}}>chaque personne protégée</Abs>
      <Abs x={0} y={1220} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={34.0} c={RED} size={30}>absolument crucial</Pill><Pill at={36.3} c={GREEN} size={30}>bien le maîtriser</Pill></Abs>
    </Out>
  );
};
const Plan: React.FC = () => {
  const t = useT();
  return (
    <Out end={52.9}>
      <HiLine words={['Au', 'programme']} mark={[1]} at={37.3} y={330} size={66} />
      {SECT.map((x, k) => (
        <Brut key={k} x={70 + (k % 2) * 480} y={450 + Math.floor(k / 2) * 230} w={460} h={200} at={[40.2, 41.4, 43.4, 45.1, 48.6, 50.7][k]} sh={x.c} style={{display: 'flex', alignItems: 'center', gap: 16, padding: 18}}>
          <Tile ch={x.n} size={80} c={x.c} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK, lineHeight: 1.1}}>{x.title.replace(/^(Les |Le |La )/, '')}</div>
        </Brut>
      ))}
    </Out>
  );
};

/* ═════════════ PARTIE 1 : les enjeux ═════════════ */
const PROFILS = [{l: 'NOUVEL EMBAUCHÉ', ic: 'salarie', a: 68.3, c: BLUE}, {l: 'VISITEUR', ic: 'femme-bureau', a: 70.7, c: VIO}, {l: 'PRESTATAIRE', ic: 'intervenant', a: 71.3, c: ORANGE}, {l: 'STAGIAIRE', ic: 'salariee', a: 72.6, c: TEAL}, {l: 'CHAUFFEUR', ic: 'camion', a: 73.7, c: RED}];
const Badges: React.FC = () => {
  const t = useT();
  return (
    <Out end={75.9}>
      <HiLine words={['Obligatoire', 'pour', 'tout', 'le', 'monde']} mark={[0]} at={57.6} y={330} size={58} />
      <Stamp at={58.6} c={RED} text="obligatoire" x={300} y={450} rot={-6} size={60} />
      <Abs x={140} y={570} w={800} h={130} style={{background: NIGHT, borderRadius: 26, border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${RED}`, opacity: pop(t, 62.9)}}>
        <div style={{position: 'absolute', left: 80, right: 80, top: 86, height: 14, borderRadius: 7, background: '#000'}} />
        <div style={{position: 'absolute', left: 30, top: 24, width: 18, height: 18, borderRadius: 9, background: t % 0.6 < 0.3 && t > 68 && t < 75 ? GREEN : '#2A3142'}} />
        <div style={{position: 'absolute', left: 70, top: 18, fontFamily: MONO, fontWeight: 700, fontSize: 24, color: '#8B95A8'}}>impression des badges d’accès</div>
      </Abs>
      {PROFILS.map((p, k) => {
        const out = prog(t, p.a, p.a + 0.7, easeOut);
        const fly = prog(t, p.a + 0.8, p.a + 1.4, easeInOut);
        const fx = 60 + k * 192, fy = 870;
        const x = lerp(400, fx, fly), y = lerp(640 + out * 120, fy, fly);
        return (
          <div key={k} style={{position: 'absolute', left: x, top: y, width: 180, height: 270, background: '#fff', border: `4px solid ${INK}`, borderRadius: 14, boxShadow: `5px 5px 0 ${p.c}`, overflow: 'hidden', opacity: t >= p.a ? 1 : 0, transform: `rotate(${fly * (k - 2) * 4}deg)`, clipPath: fly > 0 ? 'none' : `inset(0 0 ${(1 - out) * 100}% 0)`}}>
            <div style={{background: p.c, height: 36, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: 1}}>{p.l}</div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 10}}><F n={p.ic} size={90} /></div>
            <div style={{margin: '10px auto 0', width: 90, height: 90, background: `repeating-conic-gradient(${INK} 0 25%, #fff 0 50%) 0 0 / 18px 18px`, border: `3px solid ${INK}`}} />
          </div>
        );
      })}
      <Abs x={0} y={1190} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 56, color: INK, opacity: pop(t, 74.6)}}>personne n’entre sans accueil</Abs>
    </Out>
  );
};
const Contagion: React.FC = () => {
  const t = useT();
  const ring = (a: number) => prog(t, a, a + 1.6, easeOut);
  const P = [{x: 230, y: 330}, {x: 690, y: 300}, {x: 760, y: 560}, {x: 180, y: 600}, {x: 470, y: 780}];
  const r2 = ring(82.6);
  const expert = t >= 89.3;
  return (
    <Out end={103.6}>
      <HiLine words={expert ? ['Même', 'un', 'expert'] : ['Un', 'danger', 'immédiat']} mark={[expert ? 2 : 1]} at={expert ? 89.6 : 76.2} y={330} size={66} />
      {!expert && (
        <Abs x={70} y={450} w={940} h={760} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `9px 9px 0 ${RED}`, overflow: 'hidden', opacity: pop(t, 76.6)}}>
          {[ring(81.1), r2].map((p, k) => p > 0 && p < 1 ? <div key={k} style={{position: 'absolute', left: 470 - p * 520, top: 380 - p * 520, width: p * 1040, height: p * 1040, borderRadius: '50%', border: `${lerp(20, 3, p)}px solid ${RED}`, opacity: 0.6 * (1 - p)}} /> : null)}
          <div style={{position: 'absolute', left: 400, top: 310, textAlign: 'center'}}><F n="question" size={140} /><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: RED}}>ignore les risques</div></div>
          {P.map((p, k) => {const hit = r2 > 0.3 + k * 0.08; return <div key={k} style={{position: 'absolute', left: p.x - 50, top: p.y - 230, opacity: pop(t, 82.8), filter: hit ? `drop-shadow(0 0 16px ${RED})` : 'none', transform: `scale(${hit ? 1.08 : 1})`}}><F n={hit ? 'anxieux' : 'ouvrier'} size={100} /></div>;})}
          <div style={{position: 'absolute', left: 20, bottom: 20, display: 'flex', gap: 10}}><Mono at={85.9} c={RED} size={20}>se mettre en péril</Mono><Mono at={86.6} c={RED} size={20}>bloquer</Mono><Mono at={88.3} c={RED} size={20}>accident grave</Mono></div>
        </Abs>
      )}
      {expert && (
        <>
          <Abs x={70} y={450} w={940} h={420} style={{display: 'flex', alignItems: 'center', gap: 30, background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `9px 9px 0 ${GOLD}`, padding: 30, boxSizing: 'border-box'}}>
            <F n="medaille" size={170} />
            <div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 140, color: GOLD, lineHeight: 1}}><Count n={20} a={92.9} b={94.0} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>ans de métier</div></div>
            <div style={{marginLeft: 'auto', textAlign: 'center', opacity: pop(t, 95.7)}}><F n="question" size={120} /><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: RED}}>nouveau site</div></div>
          </Abs>
          <Cite y={890} at={93.0} text="« 20 ans de métier » : exemple cité par la vidéo d’origine" />
          <Stamp at={94.1} c={RED} text="catastrophe possible" x={210} y={950} rot={-5} size={52} />
          <Abs x={0} y={1090} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, opacity: pop(t, 99.0)}}>
            <div style={{position: 'relative'}}><F n="bug" size={100} style={{transform: `scaleY(${1 - prog(t, 100.0, 100.3) * 0.8})`, transformOrigin: '50% 100%'}} /></div>
            <Pill at={99.0} c={INK} size={30}>éliminer l’erreur humaine</Pill><Pill at={102.2} c={GREEN} size={30}>protéger des vies</Pill>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 2 : carrousel 3D des 4 objectifs ═════════════ */
const OBJ = [{l: 'Informer', s: 'les risques, en toute transparence', ic: 'megaphone', a: 115.3, c: BLUE}, {l: 'Sensibiliser', s: 'faire comprendre pourquoi', ic: 'cerveau', a: 120.4, c: VIO}, {l: 'Préparer', s: 'réagir en cas d’urgence', ic: 'sirene', a: 127.5, c: ORANGE}, {l: 'Vérifier', s: 'quiz, questions, signature', ic: 'check', a: 136.1, c: GREEN}];
const Carrousel: React.FC = () => {
  const t = useT();
  const step = OBJ.reduce((k, o, i) => k + prog(t, o.a - 0.6, o.a, easeInOut) * (i > 0 ? 1 : 0), 0);
  const gold = prog(t, 136.1, 136.8);
  return (
    <Out end={137.4}>
      <HiLine words={['Quatre', 'étapes', 'chronologiques']} mark={[2]} at={108.0} y={330} size={60} />
      <AbsoluteFill style={{perspective: 1500, perspectiveOrigin: '540px 820px'}}>
        <div style={{position: 'absolute', left: 540, top: 820, transformStyle: 'preserve-3d', transform: `rotateX(-8deg) rotateY(${-step * 90}deg)`}}>
          {OBJ.map((o, i) => {
            const ang = i * 90 - step * 90;
            const front = Math.cos((ang * Math.PI) / 180);
            const dimmed = i === 3 && gold < 0.5;
            return (
              <div key={i} style={{position: 'absolute', left: -230, top: -260, width: 460, height: 520, transform: `rotateY(${i * 90}deg) translateZ(360px)`, background: '#fff', border: `6px solid ${INK}`, borderRadius: 26, boxShadow: `10px 10px 0 ${o.c}`, backfaceVisibility: 'hidden', opacity: pop(t, 108.2 + i * 0.15) * (0.35 + 0.65 * Math.max(0, front)), textAlign: 'center', padding: 30, boxSizing: 'border-box', filter: dimmed ? 'grayscale(1) opacity(0.6)' : undefined}}>
                <div style={{display: 'flex', justifyContent: 'center'}}><Tile ch={String(i + 1)} size={80} c={o.c} /></div>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 16}}><F n={o.ic} size={150} /></div>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: INK, marginTop: 8}}>{o.l}</div>
                <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 24, color: DIM, marginTop: 6}}>{o.s}</div>
                {i === 3 && gold > 0 && <div style={{position: 'absolute', inset: -14, borderRadius: 34, border: `6px solid ${GOLD}`, boxShadow: `0 0 ${50 * gold}px ${GOLD}`, opacity: gold}} />}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      {t > 133.1 && t < 136.1 && <Abs x={0} y={1150} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={133.2} c={DIM} size={30}>souvent complètement oubliée…</Pill></Abs>}
      {t >= 136.1 && <Abs x={0} y={1150} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={136.2} c={GOLD} size={34}>elle change absolument tout</Pill></Abs>}
    </Out>
  );
};
const Verifier: React.FC = () => {
  const t = useT();
  const sig = prog(t, 141.8, 143.2, easeInOut);
  const words = prog(t, 144.6, 147.2);
  const shield = prog(t, 149.2, 149.8, easeOut);
  return (
    <Out end={151.3}>
      <HiLine words={['S’assurer', 'que', 'c’est', 'assimilé']} mark={[3]} at={137.4} y={330} size={58} />
      <Abs x={60} y={450} w={460} h={560} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${GREEN}`, padding: 22, boxSizing: 'border-box', opacity: pop(t, 138.0)}}>
        <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM, letterSpacing: 2}}>FICHE D’ACCUEIL</div>
        {['quiz réussi', 'questions orales', 'consignes comprises'].map((l, k) => {const a = [140.7, 141.0, 141.4][k]; return <div key={l} style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 20, opacity: pop(t, a)}}><div style={{width: 40, height: 40, borderRadius: 8, border: `4px solid ${INK}`, background: t > a + 0.3 ? GREEN : '#fff', color: '#fff', fontWeight: 900, fontSize: 26, textAlign: 'center', lineHeight: '34px'}}>{t > a + 0.3 ? '✓' : ''}</div><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: INK}}>{l}</div></div>;})}
        <div style={{position: 'absolute', left: 22, right: 22, bottom: 30, borderTop: `3px dashed ${DIM}`, paddingTop: 6, fontFamily: MONO, fontSize: 18, color: DIM}}>signature</div>
        <svg width={400} height={150} style={{position: 'absolute', left: 30, bottom: 50}}><path d="M10 110 C 40 20, 70 20, 60 100 S 110 130, 130 60 S 170 10, 180 90 C 190 130, 220 40, 250 70 S 300 120, 330 50 L 380 40" fill="none" stroke={NAVY} strokeWidth={6} strokeLinecap="round" strokeDasharray={900} strokeDashoffset={900 * (1 - sig)} /></svg>
      </Abs>
      <Abs x={550} y={450} w={470} h={560} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${shield > 0.5 ? GREEN : RED}`, overflow: 'hidden', opacity: pop(t, 143.7)}}>
        <div style={{position: 'absolute', left: 150, top: 160}}><F n="pensif" size={170} /></div>
        {Array.from({length: 4}, (_, k) => {const w = (words * 1.6 - k * 0.2); const x = lerp(-120, 520, Math.max(0, Math.min(1, w))); const blocked = shield > 0 && x > 120; return <div key={k} style={{position: 'absolute', left: blocked ? 140 : x, top: 190 + k * 40, fontFamily: MONO, fontWeight: 700, fontSize: 20, color: '#fff', background: blocked ? GREEN : DIM, padding: '2px 8px', borderRadius: 4, opacity: w > 0 ? 1 : 0}}>{['consigne', 'EPI', 'alarme', 'zone'][k]}</div>;})}
        {shield > 0 && <div style={{position: 'absolute', left: 300, top: 150, transform: `scale(${shield})`}}><F n="bouclier" size={150} /></div>}
        <div style={{position: 'absolute', left: 16, bottom: 16}}><Mono at={144.6} c={shield > 0.5 ? GREEN : RED} size={18}>{shield > 0.5 ? 'bouclier sécuritaire' : 'une oreille… puis l’autre'}</Mono></div>
      </Abs>
      <Abs x={0} y={1060} w={1080} style={{textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 30, color: DIM, opacity: pop(t, 148.0)}}><span style={{position: 'relative'}}>blabla administratif<Strike p={prog(t, 148.4, 149.0)} c={RED} /></span></Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 3 : plan isométrique + armure ═════════════ */
const ZONES = [{x: 40, y: 40, w: 260, h: 200, z: 40, c: '#9CC3E6', l: 'bureaux', ic: 'batiment', a: 163.9}, {x: 340, y: 40, w: 300, h: 260, z: 70, c: '#F4B183', l: 'atelier', ic: 'usine', a: 164.3}, {x: 40, y: 280, w: 260, h: 280, z: 30, c: '#C5E0B4', l: 'stockage', ic: 'colis', a: 164.7}, {x: 340, y: 340, w: 300, h: 220, z: 20, c: '#FFE699', l: 'quai', ic: 'camion', a: 165.1}];
const DANGERS = [{x: 470, y: 150, l: 'bruit', ic: 'haut-parleur', a: 168.8}, {x: 170, y: 400, l: 'chimique', ic: 'eprouvette', a: 169.8}, {x: 560, y: 90, l: 'hauteur', ic: 'echelle', a: 170.8}];
const SiteIso: React.FC = () => {
  const t = useT();
  const tilt = prog(t, 158.6, 160.2, easeInOut);
  const sweep = (t - 166.4) * 140;
  return (
    <Out end={172.1}>
      <HiLine words={t < 161.9 ? ['Les', 'piliers', 'de', 'l’accueil'] : ['Présenter', 'le', 'site']} mark={[t < 161.9 ? 1 : 2]} at={t < 161.9 ? 155.3 : 162.1} y={330} size={66} />
      <AbsoluteFill style={{perspective: 2200, perspectiveOrigin: '540px 400px'}}>
        <div style={{position: 'absolute', left: 220, top: 520, width: 680, height: 600, transformStyle: 'preserve-3d', transform: `rotateX(${tilt * 55}deg) rotateZ(${tilt * -38}deg) scale(${0.9 + tilt * 0.1})`, opacity: pop(t, 155.5)}}>
          <div style={{position: 'absolute', inset: 0, background: '#EEF1F5', border: `6px solid ${INK}`, borderRadius: 18, backgroundImage: 'linear-gradient(#D9DFE8 2px, transparent 2px), linear-gradient(90deg, #D9DFE8 2px, transparent 2px)', backgroundSize: '40px 40px'}} />
          {ZONES.map((z, k) => {
            const up = Math.max(0, Math.min(1, spring(t, z.a, 9, 12)));
            const shadow = Array.from({length: Math.round(z.z * up / 3)}, (_, i) => `${i * 3}px ${i * 3}px 0 ${INK}`).join(', ');
            return (
              <div key={k} style={{position: 'absolute', left: z.x, top: z.y, width: z.w, height: z.h, background: z.c, border: `4px solid ${INK}`, borderRadius: 10, transform: `translate(${-z.z * up}px, ${-z.z * up}px)`, boxShadow: shadow || 'none', opacity: t >= z.a ? 1 : 0}}>
                <div style={{position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%, -50%) rotateZ(${tilt * 38}deg) rotateX(${tilt * -55}deg)`, transformOrigin: '50% 100%', textAlign: 'center'}}><F n={z.ic} size={80} /><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: INK, background: '#fff', padding: '0 6px'}}>{z.l}</div></div>
              </div>
            );
          })}
          {t > 166.4 && <div style={{position: 'absolute', left: 340 - 700, top: 300 - 700, width: 1400, height: 1400, borderRadius: '50%', background: `conic-gradient(from ${sweep}deg, rgba(224,74,63,0.35) 0deg, transparent 40deg)`, clipPath: 'circle(48% at 50% 50%)', pointerEvents: 'none'}} />}
          {DANGERS.map((d, k) => <div key={k} style={{position: 'absolute', left: d.x - 40, top: d.y - 40, width: 80, height: 80, borderRadius: 40, background: RED, border: '5px solid #fff', boxShadow: `0 0 0 ${8 + 6 * Math.abs(Math.sin(t * 5 + k))}px rgba(224,74,63,0.35)`, transform: `scale(${Math.max(0, Math.min(1, spring(t, d.a, 9, 10)))}) translateZ(80px)`}} />)}
        </div>
      </AbsoluteFill>
      <Abs x={0} y={1220} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}>
        {DANGERS.map((d) => <div key={d.l} style={{display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: `4px solid ${INK}`, borderRadius: 40, padding: '6px 16px 6px 8px', opacity: pop(t, d.a), transform: `scale(${pop(t, d.a)})`}}><F n={d.ic} size={52} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: RED}}>{d.l}</span></div>)}
      </Abs>
    </Out>
  );
};
const Armure: React.FC = () => {
  const t = useT();
  const kit = [{l: 'casque', ic: 'casque', a: 176.9, x: 120, y: 0}, {l: 'chaussures', ic: 'chaussure', a: 177.5, x: 120, y: 420}, {l: 'gilet', ic: 'gilet', a: 178.5, x: 110, y: 170}];
  return (
    <Out end={189.9}>
      <HiLine words={['L’armure', 'indispensable']} mark={[0]} at={172.1} y={330} size={66} />
      <Abs x={0} y={440} w={1080}><Board text="EPI" at={174.0} h={90} c={ORANGE} stag={0.06} /></Abs>
      <Abs x={90} y={570} w={420} h={580} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `9px 9px 0 ${ORANGE}`, overflow: 'hidden', opacity: pop(t, 173.0)}}>
        <svg width={420} height={580} style={{position: 'absolute', inset: 0}}><circle cx={210} cy={110} r={56} fill="#C9D2DF" /><rect x={140} y={180} width={140} height={210} rx={30} fill="#C9D2DF" /><rect x={150} y={390} width={50} height={150} rx={20} fill="#C9D2DF" /><rect x={220} y={390} width={50} height={150} rx={20} fill="#C9D2DF" /></svg>
        {kit.map((k) => {const p = Math.max(0, Math.min(1, spring(t, k.a, 9, 11))); return <div key={k.l} style={{position: 'absolute', left: k.x, top: k.y + (1 - p) * -300, opacity: t >= k.a ? 1 : 0}}><F n={k.ic} size={k.ic === 'gilet' ? 200 : 180} /></div>;})}
      </Abs>
      <Abs x={540} y={570} w={460} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
        {kit.map((k) => <Check key={k.l} at={k.a} label={k.l} c={ORANGE} />)}
        <div style={{marginTop: 20}}><Win x={0} y={0} w={460} h={230} at={180.0} title="règles_de_circulation" c={GREEN} style={{position: 'relative'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 20, padding: 18}}>
            <div style={{width: 110, height: 110, borderRadius: 55, border: `12px solid ${RED}`, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="voiture" size={60} /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, lineHeight: 1.3}}><div style={{opacity: pop(t, 181.9)}}>limitation de vitesse</div><div style={{opacity: pop(t, 182.8), color: GREEN}}>chemins piétons</div></div>
          </div>
        </Win></div>
      </Abs>
      <Abs x={0} y={1200} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 54, color: INK, opacity: pop(t, 185.1)}}>le site cartographié dans la tête</Abs>
    </Out>
  );
};
const Urgence: React.FC = () => {
  const t = useT();
  const ring = t > 196.2 && t < 197.6 ? Math.sin(t * 50) * 10 : 0;
  const ban = [{l: 'téléphone', ic: 'telephone', a: 203.5}, {l: 'alcool', ic: 'pilule', a: 204.9}, {l: 'retirer ses EPI', ic: 'casque', a: 206.5}];
  const holes = prog(t, 218.0, 220.6);
  const phase = t < 199.1 ? 0 : t < 209.9 ? 1 : 2;
  return (
    <Out end={222.0}>
      <HiLine words={phase === 0 ? ['Les', 'mesures', 'd’urgence'] : phase === 1 ? ['Strictement', 'interdit'] : ['Fermer', 'toutes', 'les', 'brèches']} mark={[phase === 1 ? 0 : 2]} at={phase === 0 ? 190.0 : phase === 1 ? 199.2 : 210.0} y={330} size={62} />
      {phase === 0 && (
        <Abs x={70} y={450} w={940} style={{display: 'flex', gap: 20}}>
          {[{l: 'les alarmes', ic: 'cloche', a: 196.2, r: ring}, {l: 'les extincteurs', ic: 'extincteur', a: 197.0, r: 0}, {l: 'point de rassemblement', ic: 'equipe', a: 197.9, r: 0}].map((x) => (
            <Brut key={x.l} x={0} y={0} w={300} h={380} at={x.a} sh={RED} style={{position: 'relative', textAlign: 'center'}}><div style={{display: 'flex', justifyContent: 'center', transform: `rotate(${x.r}deg)`}}><F n={x.ic} size={160} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK, marginTop: 20}}>{x.l}</div></Brut>
          ))}
        </Abs>
      )}
      {phase === 0 && <Blinds src="epi/equipements-epc.jpg" x={70} y={880} w={940} h={300} at={193.9} pos="50% 50%"><div style={{position: 'absolute', left: 16, top: 16}}><Mono at={194.5} c={RED} size={20}>protocoles incendie</Mono></div></Blinds>}
      {phase === 1 && (
        <>
          <Abs x={70} y={450} w={940} style={{display: 'flex', justifyContent: 'space-between'}}>
            {ban.map((b) => {const p = prog(t, b.a + 0.2, b.a + 0.6, easeOut); return (
              <div key={b.l} style={{textAlign: 'center', opacity: pop(t, b.a)}}>
                <div style={{position: 'relative', width: 280, height: 280, borderRadius: 140, border: `22px solid ${RED}`, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box'}}><F n={b.ic} size={140} /><div style={{position: 'absolute', left: 20, top: 117, width: 200 * p, height: 22, background: RED, transform: 'rotate(45deg)', transformOrigin: '0 50%', marginLeft: 20, marginTop: -60}} /></div>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, marginTop: 14}}>{b.l}</div>
              </div>
            );})}
          </Abs>
          <Stamp at={202.2} c={RED} text="catégorique" x={320} y={850} rot={-5} size={58} />
        </>
      )}
      {phase === 1 && t > 208 && <Abs x={0} y={1000} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={208.1} c={INK} size={30}>procédures d’urgence</Pill></Abs>}
      {phase === 2 && (
        <>
          <Abs x={70} y={450} w={940} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={210.0} c={BLUE} size={30}>qui on appelle</Pill><Pill at={211.7} c={RED} size={30}>comment on évacue</Pill><Pill at={215.1} c={GREEN} size={30}>tri des déchets</Pill></Abs>
          <Abs x={90} y={560} w={900} h={460}>
            {Array.from({length: 4}, (_, r) => Array.from({length: 6 - (r % 2)}, (_, c) => {
              const hole = (r * 6 + c) % 5 === 2;
              const fill = hole ? prog(t, 218.0 + c * 0.2, 218.5 + c * 0.2, easeOut) : 1;
              return <div key={`${r}-${c}`} style={{position: 'absolute', left: c * 150 + (r % 2) * 75, top: 360 - r * 110, width: 144, height: 100, borderRadius: 8, background: hole ? GREEN : `linear-gradient(180deg, #E06A4E, ${BURG})`, border: `3px solid ${INK}`, opacity: hole ? fill : pop(t, 212.8 + r * 0.2), transform: hole ? `translateX(${(1 - fill) * 600}px)` : undefined}} />;
            }))}
          </Abs>
          <Abs x={0} y={1060} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: pop(t, 215.1)}}><F n="recyclage" size={90} /><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 52, color: GREEN}}>{holes > 0.9 ? 'barrière complète' : 'environnement'}</div></Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 4 : comparateur avant / après ═════════════ */
const ERR = [{l: 'accueil à la va-vite', ic: 'chrono', a: 234.2}, {l: 'discours hyper théorique', ic: 'livres', a: 235.7}, {l: 'vidéo en boucle', ic: 'ordinateur', a: 238.8}, {l: 'consignes datées', ic: 'calendrier', a: 242.1}, {l: 'aucune vérification', ic: 'croix', a: 244.0}];
const BON = [{l: 'exemples réels', ic: 'cible', a: 254.5}, {l: 'visites terrain', ic: 'pas', a: 257.1}, {l: 'images chocs', ic: 'eclair', a: 258.8}, {l: 'vraies démonstrations', ic: 'outils', a: 260.1}, {l: 'discours adapté', ic: 'megaphone', a: 262.1}];
const Compare: React.FC = () => {
  const t = useT();
  const X = lerp(1, 0, prog(t, 250.8, 252.4, easeInOut));
  const adapt = t >= 263.0;
  const list = (L: typeof ERR, c: string, bad: boolean) => L.map((x) => <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 14, opacity: pop(t, x.a)}}><div style={{width: 40, height: 40, borderRadius: 10, background: c, color: '#fff', fontWeight: 900, fontSize: 26, textAlign: 'center', lineHeight: '40px'}}>{bad ? '✗' : '✓'}</div><F n={x.ic} size={50} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK}}>{x.l}</div></div>);
  return (
    <Out end={269.4}>
      <HiLine words={adapt ? ['Du', 'sur-mesure'] : ['Passif', 'ou', 'actif', '?']} mark={adapt ? [1] : [0, 2]} at={adapt ? 263.1 : 227.0} y={330} size={66} />
      {!adapt && (
        <Abs x={60} y={450} w={960} h={760} style={{border: `6px solid ${INK}`, borderRadius: 26, overflow: 'hidden', boxShadow: `10px 10px 0 ${VIO}`, opacity: pop(t, 227.3)}}>
          <div style={{position: 'absolute', inset: 0, background: '#F1F1F1'}}>
            <Img src={PH('induction/reunion-audit.jpg')} style={{width: '100%', height: 300, objectFit: 'cover', filter: 'grayscale(1) contrast(0.9)'}} />
            <div style={{padding: '6px 30px'}}><Mono at={231.5} c={RED} size={22}>approche passive</Mono>{list(ERR, RED, true)}</div>
          </div>
          <div style={{position: 'absolute', inset: 0, background: '#F3FBF6', clipPath: `inset(0 0 0 ${X * 100}%)`}}>
            <Img src={PH('verites/formation-sol.jpg')} style={{width: '100%', height: 300, objectFit: 'cover'}} />
            <div style={{padding: '6px 30px'}}><Mono at={252.2} c={GREEN} size={22}>approche active</Mono>{list(BON, GREEN, false)}</div>
          </div>
          {X < 0.999 && X > 0.001 && <div style={{position: 'absolute', left: `${X * 100}%`, top: 0, bottom: 0, width: 8, marginLeft: -4, background: INK}}><div style={{position: 'absolute', left: -32, top: 340, width: 72, height: 72, borderRadius: 36, background: YEL, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 30}}>⇆</div></div>}
        </Abs>
      )}
      {!adapt && t > 248.9 && t < 250.8 && <Stamp at={249.0} c={RED} text="porte ouverte aux accidents" x={130} y={1080} rot={-5} size={44} />}
      {adapt && (
        <>
          <Abs x={60} y={450} w={960} style={{display: 'flex', gap: 24}}>
            {[{l: 'visiteur d’un jour', ic: 'femme-bureau', m: 'zones interdites, circulation, point de rassemblement', a: 264.3, c: BLUE}, {l: 'opérateur machine', ic: 'ouvrier', m: 'risques machine, EPI, consignation, urgences', a: 265.3, c: ORANGE}].map((p) => (
              <Brut key={p.l} x={0} y={0} w={468} h={560} at={p.a} sh={p.c} style={{position: 'relative', textAlign: 'center'}}>
                <div style={{display: 'flex', justifyContent: 'center'}}><F n={p.ic} size={170} /></div>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK}}>{p.l}</div>
                <div style={{marginTop: 20, background: `${p.c}18`, border: `3px solid ${p.c}`, borderRadius: 16, padding: 16, fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: INK}}>{p.m}</div>
              </Brut>
            ))}
          </Abs>
          <Cite y={1030} at={264.5} text="contenus des bulles : exemples ajoutés pour illustrer" />
          <Stamp at={267.8} c={VIO} text="mémorable" x={340} y={1090} rot={-5} size={60} />
        </>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 5 : sous-traitants ═════════════ */
const Tour: React.FC = () => {
  const t = useT();
  const B = [{l: 'plus exposés', a: 285.1, c: ORANGE}, {l: 'plus d’accidents', a: 286.5, c: RED}, {l: 'site inconnu', a: 289.8, c: VIO}];
  const wob = t > 290.5 && t < 299.5 ? Math.sin(t * 6) * 3 * prog(t, 290.5, 292) : 0;
  const lock = prog(t, 299.5, 300.3, easeOut);
  return (
    <Out end={304.8}>
      <HiLine words={['Un', 'public', 'à', 'très', 'haut', 'risque']} mark={[4, 5]} at={273.4} y={330} size={58} />
      <Abs x={70} y={450} w={460} h={720} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `9px 9px 0 ${TEAL}`, overflow: 'hidden', opacity: pop(t, 273.6)}}>
        <div style={{position: 'absolute', left: 60, right: 60, bottom: 50, transformOrigin: '50% 100%', transform: `rotate(${lock > 0 ? wob * (1 - lock) : wob}deg)`}}>
          {B.map((b, k) => {const p = Math.max(0, Math.min(1, spring(t, b.a, 9, 11))); return <div key={b.l} style={{position: 'absolute', left: 0, right: 0, bottom: k * 170, height: 160, borderRadius: 14, background: b.c, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: '#fff', transform: `translateY(${(1 - p) * -700}px)`, opacity: t >= b.a ? 1 : 0}}>{b.l}</div>;})}
        </div>
        <div style={{position: 'absolute', left: 16, top: 16}}><Mono at={279.9} c={RED} size={18}>vulnérabilités cumulées</Mono></div>
        {lock > 0 && <div style={{position: 'absolute', right: 20, top: 60, transform: `scale(${lock})`}}><F n="cadenas" size={110} /></div>}
      </Abs>
      <Blinds src="induction/ingenieur-chantier.jpg" x={560} y={450} w={450} h={460} at={281.0} pos="55% 30%"><div style={{position: 'absolute', left: 14, top: 14}}><Mono at={281.6} c={TEAL} size={18}>sous-traitant</Mono></div></Blinds>
      <Abs x={560} y={940} w={450} style={{display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start'}}>
        <Pill at={294.3} c={RED} size={30}>risques décuplés</Pill>
        <Pill at={297.3} c={INK} size={28}>jamais à la légère</Pill>
        <Pill at={299.5} c={TEAL} size={30}>ultra rigoureux</Pill>
      </Abs>
      <Cite y={1190} at={286.6} text="« plus exposés, plus d’accidents » : constat cité par la vidéo d’origine" />
    </Out>
  );
};

/* ═════════════ PARTIE 6 : culture sécurité ═════════════ */
const Equation: React.FC = () => {
  const t = useT();
  const draw = prog(t, 313.5, 316.4, easeInOut);
  const eq = t >= 317.0;
  const lever = prog(t, 328.2, 329.2, easeOut);
  const pts = (up: boolean) => Array.from({length: 30}, (_, k) => {const u = k / 29; const y = up ? 380 - 300 * (1 - Math.exp(-3 * u)) : 80 + 300 * (1 - Math.exp(-3 * u)); return `${k ? 'L' : 'M'}${60 + u * 800} ${y}`;}).join(' ');
  return (
    <Out end={331.1}>
      <HiLine words={['Une', 'logique', 'mathématique']} mark={[2]} at={310.8} y={330} size={62} />
      {!eq && (
        <Abs x={70} y={450} w={940} h={520} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `9px 9px 0 ${GREEN}`, opacity: pop(t, 311.0)}}>
          <svg width={940} height={460} style={{position: 'absolute', left: 0, top: 30}}>
            <line x1={60} y1={400} x2={880} y2={400} stroke={INK} strokeWidth={4} /><line x1={60} y1={40} x2={60} y2={400} stroke={INK} strokeWidth={4} />
            <path d={pts(true)} fill="none" stroke={GREEN} strokeWidth={10} strokeDasharray={1200} strokeDashoffset={1200 * (1 - draw)} strokeLinecap="round" />
            <path d={pts(false)} fill="none" stroke={RED} strokeWidth={10} strokeDasharray={1200} strokeDashoffset={1200 * (1 - prog(t, 315.1, 316.6, easeInOut))} strokeLinecap="round" />
          </svg>
          <div style={{position: 'absolute', right: 30, top: 40}}><Mono at={313.5} c={GREEN} size={20}>↑ connaissance des risques</Mono></div>
          <div style={{position: 'absolute', right: 30, bottom: 70}}><Mono at={315.1} c={RED} size={20}>↓ accidents</Mono></div>
          <Cite y={480} at={313.6} text="courbes illustratives, sans données chiffrées" />
        </Abs>
      )}
      {eq && (
        <>
          <Abs x={0} y={470} w={1080} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}>
            <Brut x={0} y={0} w={380} h={220} at={318.4} sh={GREEN} style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>un bon accueil sécurité</Brut>
            <div style={{opacity: pop(t, 319.8)}}><Tile ch="=" size={100} c={INK} /></div>
            <Brut x={0} y={0} w={380} h={220} at={321.1} sh={BLUE} style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>une meilleure maîtrise des risques</Brut>
          </Abs>
          <Abs x={0} y={760} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={324.7} c={INK} size={30}>un fait objectif</Pill><Pill at={326.2} c={GREEN} size={30}>mesurable</Pill></Abs>
          <Abs x={240} y={860} w={600} h={300} style={{opacity: pop(t, 327.1)}}>
            <svg width={600} height={300}><polygon points="300,220 260,290 340,290" fill={INK} /><g transform={`rotate(${lerp(18, -14, lever)} 300 220)`}><rect x={40} y={208} width={520} height={24} rx={12} fill={GOLD} stroke={INK} strokeWidth={4} /><circle cx={60} cy={196} r={30} fill={RED} stroke={INK} strokeWidth={4} /></g></svg>
            <div style={{position: 'absolute', right: 0, top: 0}}><Mono at={328.2} c={GOLD} size={24}>levier n°1</Mono></div>
          </Abs>
        </>
      )}
    </Out>
  );
};
const Barriere: React.FC = () => {
  const t = useT();
  const sun = prog(t, 351.1, 355.0, easeInOut);
  return (
    <Out end={358.9}>
      <HiLine words={['Jamais', 'une', 'simple', 'formalité']} mark={[0]} at={335.9} y={330} size={60} />
      {t < 349.2 && (
        <Abs x={70} y={450} w={940} style={{display: 'flex', flexDirection: 'column', gap: 18}}>
          <Brut x={0} y={0} w={940} h={150} at={339.1} sh={DIM} style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 20}}><F n="parchemin" size={90} /><div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: DIM}}>signer un papier pour les assurances<Strike p={prog(t, 341.3, 341.9)} c={RED} /></div></Brut>
          <Brut x={0} y={0} w={940} h={150} at={342.2} sh={RED} style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 20}}><F n="bouclier" size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>la toute première barrière</div></Brut>
          <Brut x={0} y={0} w={940} h={150} at={344.6} sh={BLUE} style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 20}}><F n="poignee" size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>le premier contact avec la culture</div></Brut>
          <Abs x={0} y={530} w={940} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 60, color: GREEN, opacity: pop(t, 347.8)}}>c’est là que tout commence</Abs>
        </Abs>
      )}
      {t >= 349.2 && (
        <Abs x={70} y={450} w={940} h={620} style={{background: `linear-gradient(180deg, ${sun < 0.8 ? '#FFF6DE' : '#FFE3C8'}, #fff)`, border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `9px 9px 0 ${GOLD}`, overflow: 'hidden', opacity: pop(t, 349.3)}}>
          <svg width={940} height={620} style={{position: 'absolute', inset: 0}}><path d="M60 520 Q470 60 880 520" fill="none" stroke="#E8D9B0" strokeWidth={6} strokeDasharray="14 12" /></svg>
          {(() => {const a = Math.PI * (1 - sun); const x = 470 + Math.cos(a) * 410, y = 520 - Math.sin(a) * 400; return <div style={{position: 'absolute', left: x - 55, top: y - 55}}><F n="soleil" size={110} /></div>;})()}
          {[0, 1, 2].map((k) => {const rk = ((t - 351.1 - k * 0.7) % 2.1) / 2.1; return t > 351.1 ? <div key={k} style={{position: 'absolute', left: 120 - rk * 300, top: 470 - rk * 300, width: rk * 600, height: rk * 600, borderRadius: '50%', border: `4px solid ${GREEN}`, opacity: 0.5 * (1 - rk)}} /> : null;})}
          <div style={{position: 'absolute', left: 70, top: 420}}><F n="equipe" size={110} /></div>
          <div style={{position: 'absolute', left: 20, top: 16}}><Mono at={350.2} c={INK} size={20}>accueil interactif</Mono></div>
          <div style={{position: 'absolute', right: 20, top: 16}}><Mono at={352.0} c={GREEN} size={20}>une discipline toute la journée</Mono></div>
          <div style={{position: 'absolute', right: 40, bottom: 30, display: 'flex', alignItems: 'center', gap: 10, opacity: pop(t, 357.0)}}><F n="coeur" size={80} /><span style={{fontFamily: handFont, fontWeight: 700, fontSize: 52, color: RED}}>sauve des vies</span></div>
        </Abs>
      )}
    </Out>
  );
};
const Citation: React.FC = () => {
  const t = useT();
  const spin = prog(t, 361.7, 363.4, easeIn);
  const pages = Math.floor(prog(t, 364.5, 366.4) * 8);
  const flip = (prog(t, 364.5, 366.4) * 8) % 1;
  const after = t >= 368.9;
  return (
    <Out end={376.5}>
      <HiLine words={after ? ['Le', 'ton', 'est', 'donné'] : ['Une', 'citation', 'qui', 'résume', 'tout']} mark={after ? [1] : [1]} at={after ? 369.0 : 359.0} y={330} size={58} />
      {!after && (
        <>
          <Abs x={90} y={460} w={400} h={400} style={{opacity: pop(t, 361.0)}}>
            <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: '#fff', border: `10px solid ${INK}`, boxShadow: `8px 8px 0 ${RED}`}} />
            {Array.from({length: 12}, (_, k) => <div key={k} style={{position: 'absolute', left: 196, top: 20, width: 8, height: 30, background: INK, transformOrigin: '4px 180px', transform: `rotate(${k * 30}deg)`}} />)}
            <div style={{position: 'absolute', left: 194, top: 70, width: 12, height: 135, background: RED, borderRadius: 6, transformOrigin: '6px 130px', transform: `rotate(${spin * spin * 2200 + (t - 361) * 40}deg)`}} />
            <div style={{position: 'absolute', left: 175, top: 175, width: 50, height: 50, borderRadius: 25, background: INK}} />
            <div style={{position: 'absolute', left: 0, right: 0, bottom: -60, textAlign: 'center'}}><Mono at={361.7} c={RED} size={22}>les premières minutes</Mono></div>
          </Abs>
          <Abs x={590} y={480} w={400} h={360} style={{opacity: pop(t, 363.5)}}>
            <div style={{position: 'absolute', inset: 0, background: '#fff', border: `8px solid ${INK}`, borderRadius: 18, boxShadow: `8px 8px 0 ${GREEN}`}} />
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 80, background: GREEN, borderRadius: '10px 10px 0 0', color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>SEMAINE</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 110, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 150, color: INK}}>{Math.min(8, pages + 1)}</div>
            {t > 364.5 && t < 366.4 && <div style={{position: 'absolute', left: 8, right: 8, top: 80, height: 260, background: '#F6F6F6', transformOrigin: '50% 0', transform: `perspective(800px) rotateX(${flip * 170}deg)`, opacity: 1 - flip, borderBottom: `4px solid ${INK}`}} />}
            <div style={{position: 'absolute', left: 0, right: 0, bottom: -60, textAlign: 'center'}}><Mono at={365.7} c={GREEN} size={22}>les semaines suivantes</Mono></div>
          </Abs>
          <Abs x={90} y={950} w={900} h={250} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `9px 9px 0 ${YEL}`, padding: '26px 40px', boxSizing: 'border-box', opacity: pop(t, 361.6)}}>
            <div style={{position: 'absolute', left: 16, top: -40, fontFamily: 'Georgia, serif', fontSize: 150, color: YEL, lineHeight: 1}}>“</div>
            <Kin text="Les premières minutes sur un site déterminent la sécurité des semaines suivantes." at={361.8} size={40} stagger={0.015} />
          </Abs>
          <Cite y={1215} at={362.0} text="citation reprise de la vidéo d’origine" />
        </>
      )}
      {after && (
        <Abs x={70} y={450} w={940} style={{display: 'flex', gap: 24}}>
          {[{l: 'rigoureux', ic: 'medaille', c: GREEN, a: 370.7, s: 'une attitude sûre'}, {l: 'laxiste', ic: 'escargot', c: RED, a: 372.3, s: 'une attitude relâchée'}].map((x) => (
            <Brut key={x.l} x={0} y={0} w={458} h={460} at={x.a} sh={x.c} style={{position: 'relative', textAlign: 'center'}}><div style={{display: 'flex', justifyContent: 'center'}}><F n={x.ic} size={170} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: x.c}}>{x.l}</div><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: INK, marginTop: 10, opacity: pop(t, 374.0)}}>→ {x.s}</div></Brut>
          ))}
        </Abs>
      )}
      {after && <Abs x={0} y={970} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 56, color: INK, opacity: pop(t, 369.1)}}>dès la première seconde au portail</Abs>}
    </Out>
  );
};
const Final: React.FC = () => {
  const t = useT();
  const eye = prog(t, 393.9, 394.8, easeOut);
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={t < 391.1 ? ['Une', 'question', 'provocante'] : ['Le', 'vrai', 'défi']} mark={[2]} at={t < 391.1 ? 377.0 : 391.2} y={330} size={66} />
      <Abs x={70} y={460} w={940} style={{display: 'flex', gap: 24}}>
        <Brut x={0} y={0} w={458} h={430} at={384.3} sh={DIM} style={{position: 'relative', textAlign: 'center'}}>
          <div style={{margin: '20px auto', width: 150, height: 150, borderRadius: 20, border: `10px solid ${DIM}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 110, color: DIM, fontWeight: 900}}>{t > 385.0 ? '✓' : ''}</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: DIM}}>cocher une case</div>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: DIM, marginTop: 8}}>pour se donner bonne conscience</div>
        </Brut>
        <Brut x={0} y={0} w={458} h={430} at={387.7} sh={GREEN} style={{position: 'relative', textAlign: 'center'}}>
          <div style={{display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10}}><F n="maison" size={150} /><F n="equipe" size={110} style={{marginTop: 40}} /></div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK}}>rentrer chez soi</div>
          <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 50, color: GREEN}}>sain et sauf</div>
        </Brut>
      </Abs>
      <Abs x={340} y={960} w={400} h={220} style={{opacity: pop(t, 393.6)}}>
        <svg width={400} height={220}><defs><clipPath id="eyeA"><ellipse cx={200} cy={110} rx={190} ry={100 * eye + 2} /></clipPath></defs><ellipse cx={200} cy={110} rx={190} ry={100 * eye + 2} fill="#fff" stroke={INK} strokeWidth={8} /><g clipPath="url(#eyeA)"><circle cx={200} cy={110} r={70} fill={BLUE} /><circle cx={200} cy={110} r={32} fill={INK} /><circle cx={222} cy={88} r={12} fill="#fff" /></g></svg>
      </Abs>
      <Abs x={0} y={1190} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 58, color: INK, opacity: pop(t, 394.5)}}>gardez l’œil ouvert</Abs>
      {t > 391.5 && <Dust n={22} c={GOLD} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const trans = (x: {at: number; k: TK}): Sfx[] => x.k === 'tube' ? [{at: x.at + 0.05, s: 'sfx/whoosh', v: 0.5}, {at: x.at + 0.75, s: 'sfx/thud', v: 0.4}, {at: x.at + 0.85, s: 'cadenas', v: 0.35}, {at: x.at + 1.0, s: 'page', v: 0.45}, {at: x.at + 1.32, s: 'tampon', v: 0.4}, {at: x.at + 2.6, s: 'page', v: 0.3}, {at: x.at + 3.0, s: 'sfx/whoosh', v: 0.45}]
  : x.k === 'gyro' ? [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}]
  : x.k === 'loupe' ? [{at: x.at, s: 'sfx/swish', v: 0.4}, {at: x.at + 0.4, s: 'sfx/thud', v: 0.3}, {at: x.at + 1.1, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 1.4, s: 'sfx/pop', v: 0.22}, {at: x.at + 3.0, s: 'sfx/whoosh', v: 0.3}]
  : [...rep(x.at, 12, 0.035, 'sfx/click', 0.18), {at: x.at + 0.7, s: 'sfx/pop', v: 0.25}, {at: x.at + 1.0, s: 'soft-whoosh', v: 0.35, dur: 1}, ...rep(x.at + 2.85, 12, 0.035, 'sfx/click', 0.16), {at: x.at + 3.1, s: 'sfx/swish', v: 0.3}];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.2, s: 'riser', v: 0.3, dur: 1.4}, ...rep(2.4, 14, 0.08, 'sfx/pop', 0.08), {at: 3.5, s: 'bass-hit', v: 0.4}, {at: 3.6, s: 'stylo', v: 0.25}, {at: 5.2, s: 'sfx/whoosh', v: 0.45},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 1.4, s: 'validation', v: 0.2})), {at: ALLDONE, s: 'validation', v: 0.35},
  ...[6.0, 7.3, 8.6].map((a) => ({at: a, s: 'stylo', v: 0.25})), {at: 9.7, s: 'page', v: 0.6}, {at: 9.75, s: 'sfx/swish', v: 0.4}, ...flaps(9.9, 12), ...rep(10.2, 8, 0.05, 'sfx/thud', 0.15),
  {at: 12.0, s: 'soft-whoosh', v: 0.3}, {at: 19.3, s: 'cadenas', v: 0.45}, {at: 19.5, s: 'tension', v: 0.2, dur: 1.4}, {at: 20.6, s: 'riser', v: 0.35, dur: 1.4}, {at: 21.8, s: 'deep-hit', v: 0.45}, {at: 23.0, s: 'stylo', v: 0.3},
  ...rep(27.0, 14, 0.14, 'sfx/thud', 0.16), {at: 28.3, s: 'bass-hit', v: 0.35}, ...rep(29.7, 6, 0.12, 'sfx/pop', 0.12), {at: 34.0, s: 'sfx/pop', v: 0.22}, {at: 36.3, s: 'sfx/pop', v: 0.22},
  ...[40.2, 41.4, 43.4, 45.1, 48.6, 50.7].map((a) => ({at: a, s: 'sfx/thud', v: 0.28})),
  {at: 58.6, s: 'tampon', v: 0.55}, {at: 62.9, s: 'sfx/whoosh', v: 0.25}, ...PROFILS.flatMap((p) => [...rep(p.a, 6, 0.1, 'sfx/click', 0.18), {at: p.a + 0.8, s: 'sfx/swish', v: 0.25}]), {at: 74.6, s: 'stylo', v: 0.25},
  {at: 78.4, s: 'sfx/whoosh', v: 0.25}, {at: 81.1, s: 'deep-hit', v: 0.35}, {at: 82.6, s: 'deep-hit', v: 0.3}, {at: 83.2, s: 'alarme', v: 0.08, dur: 1}, ...[85.9, 86.6, 88.3].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})),
  ...rep(92.9, 10, 0.11, 'tick', 0.15), {at: 94.0, s: 'sfx/ding', v: 0.25}, {at: 94.1, s: 'tampon', v: 0.5}, {at: 100.0, s: 'sfx/thud', v: 0.4}, {at: 102.2, s: 'validation', v: 0.25},
  {at: 112.6, s: 'soft-whoosh', v: 0.35}, ...OBJ.slice(1).map((o) => ({at: o.a - 0.6, s: 'sfx/swish', v: 0.4})), ...OBJ.map((o) => ({at: o.a, s: 'sfx/thud', v: 0.3})), {at: 136.1, s: 'riser', v: 0.3, dur: 1}, {at: 136.3, s: 'bass-hit', v: 0.4},
  ...[140.7, 141.0, 141.4].map((a) => ({at: a + 0.3, s: 'sfx/click', v: 0.3})), {at: 141.8, s: 'stylo', v: 0.45}, {at: 144.6, s: 'soft-whoosh', v: 0.3}, {at: 148.4, s: 'stylo', v: 0.3}, {at: 149.2, s: 'cadenas', v: 0.4},
  {at: 158.6, s: 'soft-whoosh', v: 0.4, dur: 1.5}, ...ZONES.map((z) => ({at: z.a, s: 'sfx/thud', v: 0.3})), {at: 166.4, s: 'tension', v: 0.15, dur: 5}, ...DANGERS.map((d) => ({at: d.a, s: 'notification', v: 0.2})),
  ...flaps(174.0, 6), {at: 176.9, s: 'sfx/thud', v: 0.35}, {at: 177.5, s: 'sfx/thud', v: 0.35}, {at: 178.5, s: 'sfx/thud', v: 0.35}, {at: 180.0, s: 'sfx/whoosh', v: 0.25}, {at: 185.1, s: 'stylo', v: 0.25},
  {at: 193.9, s: 'soft-whoosh', v: 0.3}, {at: 196.2, s: 'alarme', v: 0.14, dur: 1.4}, {at: 197.0, s: 'sfx/thud', v: 0.3}, {at: 197.9, s: 'sfx/thud', v: 0.3},
  ...[203.5, 204.9, 206.5].flatMap((a) => [{at: a, s: 'sfx/pop', v: 0.22}, {at: a + 0.25, s: 'sfx/swish', v: 0.3}]), {at: 202.2, s: 'tampon', v: 0.5},
  ...[210.0, 211.7, 215.1].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})), ...rep(212.8, 4, 0.2, 'sfx/thud', 0.15), ...rep(218.0, 6, 0.2, 'sfx/thud', 0.28), {at: 220.6, s: 'validation', v: 0.3},
  {at: 227.3, s: 'sfx/whoosh', v: 0.25}, ...ERR.map((x) => ({at: x.a, s: 'sfx/thud', v: 0.22})), {at: 249.0, s: 'tampon', v: 0.45}, {at: 250.8, s: 'sfx/swish', v: 0.45}, {at: 251.6, s: 'soft-whoosh', v: 0.35}, ...BON.map((x) => ({at: x.a, s: 'sfx/ding', v: 0.18})),
  {at: 264.3, s: 'sfx/thud', v: 0.3}, {at: 265.3, s: 'sfx/thud', v: 0.3}, {at: 267.8, s: 'tampon', v: 0.5},
  {at: 281.0, s: 'soft-whoosh', v: 0.3}, {at: 285.1, s: 'sfx/thud', v: 0.4}, {at: 286.5, s: 'sfx/thud', v: 0.4}, {at: 289.8, s: 'sfx/thud', v: 0.4}, {at: 290.5, s: 'tension', v: 0.2, dur: 8}, ...[294.3, 297.3].map((a) => ({at: a, s: 'sfx/pop', v: 0.22})), {at: 299.5, s: 'cadenas', v: 0.5},
  {at: 313.5, s: 'stylo', v: 0.35}, {at: 315.1, s: 'stylo', v: 0.3}, {at: 318.4, s: 'sfx/thud', v: 0.3}, {at: 319.8, s: 'sfx/ding', v: 0.25}, {at: 321.1, s: 'sfx/thud', v: 0.3}, {at: 324.7, s: 'sfx/pop', v: 0.2}, {at: 326.2, s: 'sfx/pop', v: 0.2}, {at: 328.2, s: 'sfx/rise', v: 0.3}, {at: 329.2, s: 'deep-hit', v: 0.35},
  ...[339.1, 342.2, 344.6].map((a) => ({at: a, s: 'sfx/thud', v: 0.28})), {at: 341.3, s: 'stylo', v: 0.3}, {at: 347.8, s: 'stylo', v: 0.25}, {at: 349.3, s: 'soft-whoosh', v: 0.3}, {at: 351.1, s: 'sfx/rise', v: 0.2}, {at: 357.0, s: 'validation', v: 0.3},
  {at: 361.0, s: 'soft-whoosh', v: 0.3}, ...rep(361.7, 18, 0.09, 'tick', 0.2), ...rep(364.5, 8, 0.24, 'page', 0.25), {at: 366.4, s: 'bass-hit', v: 0.35}, {at: 370.7, s: 'sfx/thud', v: 0.3}, {at: 372.3, s: 'sfx/thud', v: 0.3},
  {at: 384.3, s: 'sfx/thud', v: 0.28}, {at: 385.0, s: 'sfx/click', v: 0.3}, {at: 387.7, s: 'sfx/thud', v: 0.3}, {at: 391.2, s: 'riser', v: 0.25, dur: 2}, {at: 393.9, s: 'soft-whoosh', v: 0.4}, {at: 394.5, s: 'sfx/ding', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const AccueilSecu: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={0.3} to={11.8}><Intro /></Gate>
    <Gate from={11.7} to={24.7}><Portail /></Gate>
    <Gate from={24.6} to={37.4}><Rempart /></Gate>
    <Gate from={37.3} to={53.0}><Plan /></Gate>
    <Gate from={56.3} to={76.0}><Badges /></Gate>
    <Gate from={75.9} to={103.7}><Contagion /></Gate>
    <Gate from={107.0} to={137.5}><Carrousel /></Gate>
    <Gate from={137.4} to={151.4}><Verifier /></Gate>
    <Gate from={154.7} to={172.2}><SiteIso /></Gate>
    <Gate from={172.1} to={190.0}><Armure /></Gate>
    <Gate from={189.9} to={222.1}><Urgence /></Gate>
    <Gate from={225.3} to={269.5}><Compare /></Gate>
    <Gate from={272.8} to={304.9}><Tour /></Gate>
    <Gate from={308.2} to={331.2}><Equation /></Gate>
    <Gate from={331.1} to={359.0}><Barriere /></Gate>
    <Gate from={358.9} to={376.6}><Citation /></Gate>
    <Gate from={376.5} to={OUTRO_AT}><Final /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}>{x.k === 'tube' ? <Pneumatique i={i} /> : x.k === 'gyro' ? <Gyro i={i} /> : x.k === 'loupe' ? <Loupe i={i} /> : <Store i={i} />}</Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={395.4}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-accueil-securite-origine.m4a')} trimAfter={s(395.5)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [T, Cite, Deep, Blinds, Dust, Count, Check];
