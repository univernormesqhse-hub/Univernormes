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
 * « Soudure : les risques invisibles » (9 min 47) — capsule « condensé + effet wahou + ultra premium » présentée en
 * métro : une ligne relie l'intro et les six parties, la rame réaliste les dessert au rythme de la voix. Voix d'origine
 * (sans musique de fond), sous-titres calés mot à mot, photos générées (ChatGPT) déjà fournies pendant la session, réutilisées.
 * Fil rouge : tube pneumatique à six guichets adaptés (mythe & réalité → ennemi invisible → rayonnements & bruit →
 * nouveaux risques → prévention → coût & conclusion) ; gyrophare à chaque partie ; capsule pneumatique, loupe, store
 * vénitien dans les scènes. Wahou : tampon CIRC groupe 1, compteur 300 000 + nuée de 15 dangers, anneau 28/22/18,
 * horloge de latence, iceberg des fumées, particule qui traverse poumon → sang → cerveau, thermomètre de fièvre,
 * barre de recherche qui trouve puis OUVRE la matrice des procédés, flash UV du TIG, sonomètre 115 dB, jauge de CO,
 * pyramide de la hiérarchie de prévention, aspiration des particules, frise du suivi médical sur 40 ans, balance
 * 2,6 Md€ / ventilation, question finale en lettres géantes.
 */
const IMG = {
  cover: 'heures-gen/secteurs.jpg',
  mythe: 'maturite-gen/deni.jpg',
  fumees: 'diag-gen/defaut.jpg',
  fievre: 'ishikawa-gen/blessure.jpg',
  tig: 'metro-gen/maitrise.jpg',
  plasma: 'ishikawa-gen/piece-mouvement.jpg',
  confine: 'sigles-gen/gravite.jpg',
  captation: 'alerte-gen/ventilation.jpg',
  suivi: 'sigles-gen/classification.jpg',
  atelier: 'ishikawa-gen/permanent.jpg',
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
const OUTRO_AT = 587.4;
export const SOUDURE_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 37.3, n: '1', title: 'Le mythe et la réalité', s: 'cancérogène, groupe 1', c: RED, g: 'mythe', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 172.2, n: '2', title: 'L’ennemi invisible', s: 'les fumées', c: NAVY, g: 'fumées', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 255.2, n: '3', title: 'Rayonnements & bruit', s: 'chocs physiques', c: VIO, g: 'physique', k: 'gyro', lab: 'PARTIE 3 / 6'},
  {at: 364.0, n: '4', title: 'Nouveaux risques', s: 'milieux extrêmes', c: ORANGE, g: 'nouveaux', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 411.0, n: '5', title: 'La prévention', s: 'hiérarchie & suivi', c: GREEN, g: 'prévention', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 515.1, n: '6', title: 'Le coût & la question', s: 'vos ateliers sont-ils sûrs ?', c: GOLD, g: 'conclusion', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 577.3;
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

/* ═════════════ Ligne de métro (intro + 6 parties) ═════════════ */
const LINE = [{l: 'Intro', at: 0, c: '#2F7C93'}, ...SECT.map((x) => ({l: x.g, at: x.at, c: x.c}))];
const Metro: React.FC = () => {
  const t = useT();
  const cur = LINE.reduce((a, x, k) => (t >= x.at ? k : a), 0);
  const sx = (k: number) => 60 + k * (840 / (LINE.length - 1));
  const mv = cur === 0 ? 1 : prog(t, LINE[cur].at, LINE[cur].at + 1.8, easeInOut);
  const tx = cur === 0 ? sx(0) : lerp(sx(cur - 1), sx(cur), mv);
  return (
    <Abs x={60} y={1400} w={960} h={104} style={{zIndex: 30, background: 'rgba(255,255,255,0.94)', border: `4px solid ${INK}`, borderRadius: 20, boxShadow: `5px 5px 0 ${INK}`}}>
      <div style={{position: 'absolute', left: 60, right: 60, top: 30, height: 12, borderRadius: 6, background: `linear-gradient(90deg, ${LINE.map((x) => x.c).join(', ')})`}} />
      {LINE.map((x, k) => { const on = k < cur || (k === cur && mv > 0.98); return <div key={x.l} style={{position: 'absolute', left: sx(k) - 16, top: 20, width: 32, height: 32, borderRadius: 16, background: on ? x.c : '#fff', border: `5px solid ${on ? '#fff' : x.c}`, boxSizing: 'border-box', boxShadow: on ? `0 0 0 3px ${x.c}` : 'none', color: '#fff', fontSize: 14, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{on ? '✓' : ''}</div>; })}
      {LINE.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: sx(k) - 70, width: 140, top: 62, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 16, color: k === cur ? x.c : DIM}}>{x.l}</div>)}
      <Img src={staticFile('metroiso-gen/metro/rame-dessus.png')} style={{position: 'absolute', left: tx - 50, top: 20, width: 100, height: 34, filter: 'drop-shadow(0 0 8px rgba(124,196,255,0.9))'}} />
    </Abs>
  );
};

/** Étincelles d'arc (wahou). */
const Sparks: React.FC<{x: number; y: number; n?: number; on?: boolean}> = ({x, y, n = 26, on = true}) => {
  const t = useT();
  if (!on) return null;
  return <>{Array.from({length: n}, (_, k) => { const ph = (t * 1.6 + random(`sp${k}`)) % 1; const a = -Math.PI / 2 + (random(`sa${k}`) - 0.5) * 2.6; const r = ph * (120 + random(`sr${k}`) * 160); return <div key={k} style={{position: 'absolute', left: x + Math.cos(a) * r, top: y + Math.sin(a) * r + ph * ph * 160, width: 6, height: 6, borderRadius: 3, background: k % 3 ? '#FFB43B' : '#FFF3B0', boxShadow: '0 0 10px #FF9A1F', opacity: 1 - ph}} />; })}</>;
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 200}}><Pic src={IMG.cover} ic="etincelles" w={1080} h={740} pos="50% 40%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER} 9%, ${PAPER}00 16%, ${PAPER}00 34%, ${PAPER}DD 43%, ${PAPER} 48%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={930} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>HSE · GÉNIE CIVIL · CONSTRUCTION MÉTALLIQUE</div>
        <div style={{marginTop: 18}}><Board text="SOUDURE" at={-1} h={100} gap={3} c={ORANGE} stag={0.02} /></div>
        <div style={{marginTop: 8}}><Board text="RISQUES INVISIBLES" at={-1} h={66} gap={2} c={NAVY} stag={0.02} /></div>
      </Abs>
      <Abs x={60} y={1470} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
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
  const ph = t < 20.8 ? 0 : 1;
  return (
    <Out end={37.3}>
      {ph === 0 && (
        <>
          <HiLine words={t < 13.6 ? ['Le', 'soudage', 'est', 'partout'] : ['Un', 'risque', 'mal', 'perçu']} mark={t < 13.6 ? [1, 3] : [1, 3]} at={t < 13.6 ? 4.3 : 13.8} y={330} size={62} />
          <Abs x={60} y={450} w={960} h={600} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 30, overflow: 'hidden', opacity: pop(t, 3.0)}}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 360, height: 26, background: '#5A6478'}} />
            <div style={{position: 'absolute', left: 300, top: 300, width: 360, height: 60, background: '#8892A6', borderRadius: 6}} />
            <div style={{position: 'absolute', left: 470, top: 330, width: 40, height: 40, borderRadius: 20, background: '#fff', boxShadow: `0 0 ${60 + 40 * Math.abs(Math.sin(t * 17))}px #7CC4FF, 0 0 120px #FFB43B`}} />
            <Sparks x={490} y={350} />
            {[{l: 'aéronautique', ic: 'avion', a: 6.6, x: 60}, {l: 'construction navale', ic: 'globe', a: 8.0, x: 380}, {l: 'génie civil', ic: 'grue', a: 9.0, x: 700}].map((p) => <div key={p.l} style={{position: 'absolute', left: p.x, top: 440, width: 220, textAlign: 'center', opacity: pop(t, p.a)}}><F n={p.ic} size={80} style={{margin: '0 auto'}} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: '#fff'}}>{p.l}</div></div>)}
          </Abs>
          <Abs x={60} y={1080} w={960} h={280} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${ORANGE}`, display: 'flex', alignItems: 'center', gap: 26, padding: '0 34px', opacity: pop(t, 9.5)}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 130, color: ORANGE, lineHeight: 1, whiteSpace: 'nowrap', flexShrink: 0}}><Count n={60} a={9.5} b={11.5} suf="%" /></div>
            <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: INK, lineHeight: 1.15}}>des pièces métalliques assemblées dans le monde<span style={{display: 'block', fontFamily: MONO, fontSize: 20, color: DIM}}>(estimation citée)</span></div>
          </Abs>
          {t > 13.8 && <Stamp at={17.0} c={RED} text="décalé avec la science" x={160} y={760} rot={-6} size={44} />}
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['La', 'culture', 'du', 'stoïcisme']} mark={[1, 3]} at={21.0} y={330} size={62} />
          <Shot src={IMG.mythe} ic="pensif" x={60} y={440} w={960} h={520} at={21.0} c={RED} />
          <Abs x={60} y={990} w={960} h={380} style={{display: 'flex', flexDirection: 'column', gap: 14}}>
            {[{l: 'on encaisse', a: 23.5, c: DIM}, {l: 'on serre les dents', a: 24.6, c: DIM}, {l: 'une réalité beaucoup plus inquiétante', a: 27.0, c: RED}].map((x, k) => <div key={x.l} style={{flex: 1, borderRadius: 20, background: k === 2 ? RED : '#fff', border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', padding: '0 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: k === 2 ? '#fff' : x.c, opacity: pop(t, x.a), transform: `translateX(${(1 - pop(t, x.a)) * (k % 2 ? 80 : -80)}px)`}}>{x.l}</div>)}
          </Abs>
          {t > 32.2 && <Abs x={60} y={1200} w={960} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={33.0} c={NAVY} size={26}>casser les mythes</Pill><Pill at={35.0} c={GREEN} size={26}>ce qui menace vraiment la santé</Pill></Abs>}
        </>
      )}
    </Out>
  );
};

/* ═════════════ 1 · LE MYTHE ET LA RÉALITÉ ═════════════ */
const QM = '« J’ai mal à la tête, c’est normal après une journée de soudure. »';
const DANGERS = ['UV', 'bruit', 'postures', 'champs électromagnétiques', 'chimie', 'chaleur', 'étincelles', 'fumées', 'gaz', 'vibrations', 'infrarouges', 'brûlures', 'métaux', 'ozone', 'stress'];
const Mythe: React.FC = () => {
  const t = useT();
  const ph = t < 69.6 ? 0 : t < 103.8 ? 1 : t < 135.8 ? 2 : 3;
  let acc = 0;
  return (
    <Out end={172.2}>
      {ph === 0 && (
        <>
          <HiLine words={t < 60 ? ['Le', 'mythe', 'du', '«', 'bon', 'soudeur', '»'] : ['Un', 'mythe', 'toxique']} mark={t < 60 ? [1, 5] : [1, 2]} at={t < 60 ? 43.7 : 60.1} y={330} size={58} />
          <Abs x={60} y={440} w={960} h={380} style={{background: '#FFFDF6', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${RED}`, padding: '30px 36px', boxSizing: 'border-box', opacity: pop(t, 40.0)}}>
            <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 56, color: INK, lineHeight: 1.2}}>{QM.slice(0, Math.floor(prog(t, 40.0, 43.2) * QM.length))}</div>
            {t > 60.1 && <Stamp at={60.6} c={RED} text="mythe toxique" x={540} y={240} rot={-8} size={44} />}
          </Abs>
          <Abs x={60} y={860} w={960} h={500} style={{display: 'flex', gap: 16}}>
            {[{l: 'fatigue', ic: 'fatigue', a: 55.0}, {l: 'douleurs', ic: 'courbe-dos', a: 55.8}, {l: 'oreilles qui sifflent', ic: 'haut-parleur', a: 56.6}].map((x) => <div key={x.l} style={{flex: 1, borderRadius: 24, background: '#fff', border: `5px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: pop(t, x.a), filter: t > 63.1 ? 'grayscale(1)' : undefined}}><F n={x.ic} size={120} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK, textAlign: 'center'}}>{x.l}</span><span style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: DIM}}>« aléa du métier »</span></div>)}
          </Abs>
          {t > 63.1 && <Abs x={60} y={1140} w={960} style={{textAlign: 'center'}}><Pill at={63.6} c={RED} size={28}>ne rend pas le corps invincible</Pill></Abs>}
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['2023', ':', 'groupe', '1']} mark={[0, 3]} at={76.5} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={520} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 30, boxShadow: `9px 9px 0 ${RED}`, overflow: 'hidden', opacity: pop(t, 79.6)}}>
            <div style={{position: 'absolute', left: 30, top: 24, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>CIRC · Centre international de recherche sur le cancer</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 90, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>fumées de soudage</div>
            <div style={{position: 'absolute', left: 280, top: 160, width: 400, height: 300, borderRadius: 30, border: `14px solid ${RED}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: RED, transform: `rotate(-6deg) scale(${lerp(2.4, 1, prog(t, 83.0, 83.4, easeIn))})`, opacity: prog(t, 83.0, 83.2)}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60}}>GROUPE</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 150, lineHeight: 0.9}}>1</div></div>
          </Abs>
          <Abs x={60} y={990} w={960} h={240} style={{display: 'flex', alignItems: 'center', gap: 20}}>
            {[{l: 'cancérogène', ic: 'crane', a: 89.6, c: RED}, {l: '= amiante', ic: 'brique', a: 92.4, c: DIM}, {l: '= tabac', ic: 'vapeur', a: 93.4, c: DIM}].map((x) => <div key={x.l} style={{flex: 1, height: 220, borderRadius: 24, background: x.c === RED ? RED : '#fff', border: `5px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: pop(t, x.a), transform: `scale(${0.6 + 0.4 * pop(t, x.a)})`}}><F n={x.ic} size={90} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: x.c === RED ? '#fff' : INK}}>{x.l}</span></div>)}
          </Abs>
          {t > 95 && <Abs x={60} y={1250} w={960} style={{textAlign: 'center'}}><Pill at={96.0} c={NAVY} size={28}>une certitude scientifique</Pill></Abs>}
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['300', '000', 'pros', ',', '15', 'dangers']} mark={[0, 1, 4]} at={104.0} y={330} size={58} />
          <Abs x={60} y={440} w={960} h={260} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, opacity: pop(t, 105.0)}}>
            <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 130, color: YEL, textShadow: `0 0 30px ${YEL}`}}>{Math.round(lerp(0, 300000, prog(t, 105.2, 108.6, easeOut)) / 1000) * 1000 === 0 ? '0' : (Math.round(lerp(0, 300000, prog(t, 105.2, 108.6, easeOut)) / 1000) * 1000).toLocaleString('fr-FR').replace(/\u202f|\u00a0/g, ' ')}</span>
            <span style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: '#fff', lineHeight: 1.1}}>professionnels<br />exposés chaque jour<br /><span style={{fontFamily: MONO, fontSize: 20, color: '#9AA7BC'}}>en France</span></span>
          </Abs>
          <Abs x={60} y={730} w={960} h={640}>
            <div style={{position: 'absolute', left: 380, top: 200, width: 200, height: 200, borderRadius: 100, background: `${RED}22`, border: `6px solid ${RED}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 110.7)}}><F n="salarie" size={110} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: RED}}><Count n={15} a={111.0} b={113.6} />+</div></div>
            {DANGERS.map((d, k) => { const ang = (k / DANGERS.length) * Math.PI * 2; const a = 111.0 + k * 0.17; const q = prog(t, a, a + 0.4, easeOut); const hl = ['UV', 'bruit', 'postures', 'champs électromagnétiques', 'chimie'].includes(d); return <div key={d} style={{position: 'absolute', left: 480 + Math.cos(ang) * lerp(600, 370, q) - 95, top: 300 + Math.sin(ang) * lerp(520, 290, q) - 26, width: 190, height: 52, borderRadius: 26, background: hl && t > 116 ? RED : '#fff', border: `4px solid ${hl && t > 116 ? INK : RED}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: d.length > 12 ? 15 : 22, color: hl && t > 116 ? '#fff' : RED, opacity: q}}>{d}</div>; })}
            {t > 130 && <Stamp at={132.9} c={NAVY} text="crise structurelle" x={260} y={560} rot={-5} size={40} />}
          </Abs>
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={t < 158 ? ['1', '500', 'maladies', 'par', 'an'] : ['Des', 'risques', 'à', 'retardement']} mark={t < 158 ? [0, 1, 2] : [1, 3]} at={t < 158 ? 142.3 : 158.2} y={330} size={58} />
          {t < 158 && <Abs x={60} y={440} w={960} h={920}>
            <svg width={600} height={600} style={{position: 'absolute', left: 180, top: 0, transform: 'rotate(-90deg)'}}>
              <circle cx={300} cy={300} r={220} fill="none" stroke="#E3E8EF" strokeWidth={100} />
              {[{v: 28, c: RED, a: 149.0}, {v: 22, c: ORANGE, a: 152.5}, {v: 18, c: VIO, a: 154.0}].map((p, k) => { const len = 2 * Math.PI * 220; const seg = len * p.v / 100 * prog(t, p.a, p.a + 0.9, easeOut); const off = -len * acc / 100; acc += p.v; return <circle key={k} cx={300} cy={300} r={220} fill="none" stroke={p.c} strokeWidth={100} strokeDasharray={`${seg} ${len}`} strokeDashoffset={off} />; })}
            </svg>
            <div style={{position: 'absolute', left: 380, top: 230, width: 200, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK, lineHeight: 1}}><Count n={1500} a={142.4} b={144.6} /><div style={{fontFamily: MONO, fontSize: 18, color: DIM}}>MP / an</div></div>
            <div style={{position: 'absolute', left: 60, right: 60, top: 640, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14}}>{[{l: 'cancer du poumon', v: 28, c: RED, a: 149.0}, {l: 'dermatites', v: 22, c: ORANGE, a: 152.5}, {l: 'acouphènes', v: 18, c: VIO, a: 154.0}, {l: 'cataractes', v: 0, c: TEAL, a: 156.6}].map((x) => <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 12, opacity: pop(t, x.a)}}><div style={{width: 110, padding: '6px 0', borderRadius: 12, background: x.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, textAlign: 'center', border: `3px solid ${INK}`}}>{x.v ? <Count n={x.v} a={x.a} b={x.a + 0.9} suf=" %" /> : '…'}</div><span style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: INK}}>{x.l}</span></div>)}</div>
          </Abs>}
          {t >= 158 && <Abs x={60} y={440} w={960} h={920}>
            <div style={{position: 'absolute', left: 230, top: 40, width: 500, height: 500, borderRadius: 250, background: '#fff', border: `10px solid ${INK}`, boxShadow: `9px 9px 0 ${NAVY}`}}>
              {Array.from({length: 12}, (_, k) => <div key={k} style={{position: 'absolute', left: 245, top: 14, width: 10, height: 30, background: INK, transformOrigin: '5px 236px', transform: `rotate(${k * 30}deg)`}} />)}
              <div style={{position: 'absolute', left: 244, top: 70, width: 12, height: 180, background: RED, borderRadius: 6, transformOrigin: '6px 180px', transform: `rotate(${prog(t, 165.0, 168.0) * 720}deg)`}} />
              <div style={{position: 'absolute', left: 0, right: 0, top: 300, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: NAVY}}><Count n={30} a={165.0} b={168.0} /> ans</div>
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 600, display: 'flex', justifyContent: 'center', gap: 16}}><Pill at={163.0} c={DIM} size={28}>respiré aujourd’hui</Pill><Pill at={166.4} c={RED} size={28}>cancer dans 20 ou 30 ans</Pill></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 720, textAlign: 'center'}}><Pill at={169.4} c={NAVY} size={30}>une fausse sensation de sécurité</Pill></div>
          </Abs>}
        </>
      )}
    </Out>
  );
};

/* ═════════════ 2 · L'ENNEMI INVISIBLE ═════════════ */
const Fumees: React.FC = () => {
  const t = useT();
  const ph = t < 220.2 ? 0 : 1;
  const route = prog(t, 205.0, 218.0);
  return (
    <Out end={255.2}>
      {ph === 0 && (
        <>
          <HiLine words={t < 198 ? ['Le', 'principe', 'de', 'l’iceberg'] : ['Jusqu’au', 'cerveau']} mark={t < 198 ? [1, 3] : [0, 1]} at={t < 198 ? 175.0 : 209.6} y={330} size={60} />
          {t < 205 && <Abs x={60} y={440} w={960} h={930} style={{borderRadius: 30, overflow: 'hidden', border: `6px solid ${INK}`, background: 'linear-gradient(180deg, #DDEFFF 0%, #DDEFFF 34%, #123A66 34%, #071A33 100%)', opacity: pop(t, 174.0)}}>
            <svg width={948} height={918} style={{position: 'absolute', left: 0, top: 0}}><polygon points="380,312 470,200 560,312" fill="#fff" stroke={INK} strokeWidth={5} /><polygon points="250,312 700,312 820,700 474,880 140,700" fill="rgba(180,220,255,0.35)" stroke="#BFE3FF" strokeWidth={5} opacity={prog(t, 192.5, 194.0)} /></svg>
            <div style={{position: 'absolute', left: 560, top: 150, fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, opacity: pop(t, 188.5)}}>fumée visible<br /><span style={{fontFamily: MONO, fontSize: 18}}>une fraction</span></div>
            {Array.from({length: 60}, (_, k) => <div key={k} style={{position: 'absolute', left: 200 + random(`ix${k}`) * 560, top: 360 + random(`iy${k}`) * 460, width: 5, height: 5, borderRadius: 3, background: '#7CC4FF', boxShadow: '0 0 6px #7CC4FF', opacity: prog(t, 193.5 + k * 0.03, 194.0 + k * 0.03) * (0.5 + 0.5 * Math.sin(t * 3 + k))}} />)}
            <div style={{position: 'absolute', left: 0, right: 0, top: 520, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff', opacity: pop(t, 196.0)}}>particules ultrafines<br />&lt; 100 nm</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 700, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: YEL, textShadow: `0 0 30px ${YEL}`, opacity: pop(t, 203.0)}}><Count n={95} a={203.0} b={204.6} suf=" %" /></div>
            <div style={{position: 'absolute', left: 40, top: 40, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: INK, opacity: pop(t, 184.0)}}>arc : 3 000 → 20 000 °C</div>
          </Abs>}
          {t >= 205 && <Abs x={60} y={440} w={960} h={930}>
            {[{l: 'poumons', ic: 'poumons', x: 120}, {l: 'sang', ic: 'goutte', x: 480}, {l: 'cerveau', ic: 'cerveau', x: 840}].map((p, k) => <div key={p.l} style={{position: 'absolute', left: p.x - 130, top: 160, width: 260, textAlign: 'center', opacity: pop(t, 205.2 + k * 2.5)}}><div style={{margin: '0 auto', width: 220, height: 220, borderRadius: 110, background: '#fff', border: `6px solid ${k === 2 && t > 211 ? RED : INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: k === 2 && t > 211 ? `0 0 30px ${RED}` : 'none'}}><F n={p.ic} size={140} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, marginTop: 10}}>{p.l}</div></div>)}
            <svg width={960} height={930} style={{position: 'absolute', left: 0, top: 0}}><line x1={120} y1={270} x2={840} y2={270} stroke={NAVY} strokeWidth={6} strokeDasharray="14 12" opacity={0.4} /></svg>
            <div style={{position: 'absolute', left: lerp(120, 840, route) - 18, top: 252, width: 36, height: 36, borderRadius: 18, background: YEL, border: `4px solid ${INK}`, boxShadow: `0 0 26px ${YEL}`}} />
            <div style={{position: 'absolute', left: 60, right: 60, top: 560, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={211.6} c={DIM} size={28}>manganèse</Pill><Pill at={212.4} c={DIM} size={28}>fer</Pill></div>
            <div style={{position: 'absolute', left: 60, right: 60, top: 660, textAlign: 'center'}}><Pill at={216.0} c={RED} size={30}>barrière hémato-encéphalique franchie</Pill></div>
            <div style={{position: 'absolute', left: 60, right: 60, top: 760, textAlign: 'center'}}><Pill at={218.0} c={NAVY} size={28}>risque de déficit cognitif</Pill></div>
          </Abs>}
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['La', 'fièvre', 'des', 'soudeurs']} mark={[1, 3]} at={222.0} y={330} size={62} />
          <Shot src={IMG.fievre} ic="thermometre" x={60} y={440} w={960} h={420} at={222.2} c={RED} blinds />
          <Abs x={60} y={890} w={600} h={470} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${RED}`, padding: 24, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 12}}>
            {[{l: 'acier galvanisé → oxyde de zinc', a: 225.5}, {l: 'les cellules immunitaires paniquent', a: 230.0}, {l: '4 à 8 h après le travail', a: 242.5}, {l: 'passe souvent en 48 h…', a: 245.0}, {l: '…mais lésions chroniques à force', a: 251.0}].map((x, k) => <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 12, opacity: pop(t, x.a)}}><div style={{width: 40, height: 40, borderRadius: 20, background: k === 4 ? RED : ORANGE, color: '#fff', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22}}>{k + 1}</div><span style={{fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: INK}}>{x.l}</span></div>)}
          </Abs>
          <Abs x={690} y={890} w={330} h={470} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 28, opacity: pop(t, 237.0)}}>
            <div style={{position: 'absolute', left: 135, top: 40, width: 60, height: 320, borderRadius: 30, background: '#2A3550', border: '5px solid #fff', overflow: 'hidden'}}><div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: `${20 + 80 * prog(t, 237.0, 240.0, easeOut)}%`, background: `linear-gradient(0deg, ${ORANGE}, ${RED})`}} /></div>
            <div style={{position: 'absolute', left: 115, top: 340, width: 100, height: 100, borderRadius: 50, background: RED, border: '5px solid #fff'}} />
            <div style={{position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff'}}><Count n={40} a={237.0} b={240.0} />°</div>
          </Abs>
          {t > 251 && <Stamp at={251.5} c={RED} text="signal d’alarme" x={140} y={740} rot={-6} size={44} />}
        </>
      )}
    </Out>
  );
};

/* ═════════════ 3 · RAYONNEMENTS & BRUIT ═════════════ */
const PROCS = [{l: 'MMA', s: 'soudage manuel', k: 'fumées extrêmement denses', c: '#5A6478', a: 277.4, ic: 'vapeur'}, {l: 'TIG', s: 'fin, « propre »', k: 'UV × 5 à 10', c: VIO, a: 289.0, ic: 'soleil'}, {l: 'Plasma', s: 'découpe', k: 'bruit jusqu’à 115 dB', c: RED, a: 281.4, ic: 'haut-parleur'}];
const Physique: React.FC = () => {
  const t = useT();
  const ph = t < 293.5 ? 0 : t < 330.1 ? 1 : 2;
  const flash = t > 307 && t < 313 ? Math.abs(Math.sin(t * 22)) : 0;
  const db = prog(t, 340.0, 344.5, easeOut) * 115;
  return (
    <Out end={364.0}>
      {ph === 0 && (
        <>
          <HiLine words={t < 270 ? ['Lumière', ',', 'chaleur', ',', 'bruit'] : ['7', 'procédés', 'comparés']} mark={t < 270 ? [0, 2, 4] : [0, 1]} at={t < 270 ? 263.0 : 270.3} y={330} size={60} />
          {t < 271.4 && <Abs x={60} y={440} w={960} h={600} style={{display: 'flex', gap: 16}}>{[{l: 'lumière', ic: 'soleil', a: 264.8}, {l: 'chaleur', ic: 'chaud', a: 266.4}, {l: 'bruit', ic: 'haut-parleur', a: 268.0}].map((x) => <div key={x.l} style={{flex: 1, borderRadius: 26, background: '#fff', border: `6px solid ${INK}`, boxShadow: `7px 7px 0 ${VIO}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: pop(t, x.a), transform: `scale(${0.6 + 0.4 * pop(t, x.a)})`}}><F n={x.ic} size={150} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>{x.l}</span></div>)}</Abs>}
          <SearchOpen x={60} y={440} w={960} h={920} at={271.4} query="matrice des 7 procédés" results={['Fiche MMA', 'Matrice des 7 procédés', 'Fiche oxycoupage']} found={1} foundAt={273.4} clickAt={273.7} c={VIO}>
            <div style={{position: 'absolute', inset: 0, padding: '24px 30px', display: 'flex', flexDirection: 'column', gap: 16}}>
              {PROCS.map((p) => <div key={p.l} style={{height: 170, borderRadius: 22, background: t > p.a ? '#fff' : '#F1F3F6', border: `5px solid ${t > p.a ? p.c : '#C9D2DF'}`, display: 'flex', alignItems: 'center', gap: 20, padding: '0 22px', boxShadow: t > p.a ? `6px 6px 0 ${p.c}` : 'none', opacity: pop(t, 274.2)}}><div style={{width: 160, fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: p.c}}>{p.l}</div><F n={p.ic} size={80} /><div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM}}>{p.s}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: t > p.a ? INK : '#9AA7BC'}}>{t > p.a ? p.k : '…'}</div></div></div>)}
              <div style={{textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>+ 4 autres procédés de la matrice</div>
              <div style={{textAlign: 'center'}}><Pill at={287.0} c={VIO} size={28}>pas de procédé magique : des compromis</Pill></div>
            </div>
          </SearchOpen>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Le', 'paradoxe', 'du', 'TIG']} mark={[1, 3]} at={293.8} y={330} size={62} />
          <Shot src={IMG.tig} ic="soleil" x={60} y={440} w={960} h={460} at={294.0} c={VIO} />
          {flash > 0 && <Abs x={60} y={440} w={960} h={460} style={{background: `rgba(190,170,255,${0.5 * flash})`, borderRadius: 30, mixBlendMode: 'screen'}} />}
          <Abs x={60} y={930} w={960} h={440} style={{display: 'flex', gap: 16}}>
            <div style={{flex: 1, borderRadius: 24, background: '#fff', border: `5px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: pop(t, 300.0)}}><F n="vapeur" size={100} style={{opacity: 0.25}} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM, textAlign: 'center'}}>très peu de fumée visible</span><Pill at={303.0} c={DIM} size={22}>faux sentiment de sécurité</Pill></div>
            <div style={{flex: 1, borderRadius: 24, background: VIO, border: `5px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, opacity: pop(t, 307.0), color: '#fff'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 90, lineHeight: 1}}>×<Count n={10} a={307.0} b={309.5} from={5} /></div><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>rayons UV</span><span style={{fontFamily: MONO, fontWeight: 700, fontSize: 18}}>(5 à 10 fois plus)</span></div>
          </Abs>
          {t > 314 && <Abs x={60} y={930} w={960} h={440} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, opacity: pop(t, 314.0)}}>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#9AA7BC'}}>acier inoxydable + UV intenses</div>
            <div style={{display: 'flex', gap: 20}}><Pill at={318.0} c={TEAL} size={34}>ozone</Pill><Pill at={319.5} c={RED} size={34}>chrome VI</Pill></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff', textAlign: 'center', opacity: pop(t, 323.0)}}>l’un des cancérogènes<br />les plus puissants</div>
            <Stamp at={326.3} c={RED} text="risque mortel caché" x={200} y={10} rot={-5} size={36} />
          </Abs>}
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 345.7 ? ['Le', 'bruit', ':', '115', 'dB'] : ['Les', 'acouphènes']} mark={t < 345.7 ? [1, 3, 4] : [1]} at={t < 345.7 ? 330.2 : 346.0} y={330} size={60} />
          {t < 345.7 ? <>
            <Shot src={IMG.plasma} ic="etincelles" x={60} y={440} w={960} h={400} at={330.3} c={RED} />
            <Abs x={60} y={870} w={960} h={500} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 336.0)}}>
              <svg width={948} height={488} style={{position: 'absolute', left: 0, top: 0}}><path d="M134 420 A340 340 0 0 1 814 420" fill="none" stroke="#2A3550" strokeWidth={40} /><path d="M134 420 A340 340 0 0 1 814 420" fill="none" stroke="url(#dbg)" strokeWidth={40} strokeDasharray={1068} strokeDashoffset={1068 * (1 - db / 130)} /><defs><linearGradient id="dbg"><stop offset="0" stopColor={GREEN} /><stop offset="0.6" stopColor={YEL} /><stop offset="1" stopColor={RED} /></linearGradient></defs><g transform={`translate(474 420) rotate(${-90 + (db / 130) * 180})`}><line x1={0} y1={0} x2={0} y2={-290} stroke="#fff" strokeWidth={10} strokeLinecap="round" /><circle r={20} fill="#fff" /></g></svg>
              <div style={{position: 'absolute', left: 0, right: 0, top: 250, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: db > 110 ? RED : '#fff', textShadow: db > 110 ? `0 0 30px ${RED}` : 'none'}}>{Math.round(db)} dB</div>
              <div style={{position: 'absolute', left: 24, top: 18, fontFamily: MONO, fontWeight: 700, fontSize: 20, color: '#9AA7BC', opacity: pop(t, 343.0)}}>au-delà du seuil de douleur</div>
              <div style={{position: 'absolute', right: 24, top: 18, fontFamily: MONO, fontWeight: 700, fontSize: 20, color: '#FF8A7A', opacity: pop(t, 333.5)}}>2e cause de maladie pro.</div>
            </Abs>
          </> : <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 330, top: 40, width: 300, height: 300, borderRadius: 150, background: `${VIO}22`, border: `6px solid ${VIO}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="haut-parleur" size={170} /></div>
            {[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 480 - (170 + k * 60 + ((t * 80) % 60)), top: 190 - (170 + k * 60 + ((t * 80) % 60)), width: 2 * (170 + k * 60 + ((t * 80) % 60)), height: 2 * (170 + k * 60 + ((t * 80) % 60)), borderRadius: '50%', border: `3px solid ${VIO}`, opacity: 0.4 - k * 0.12}} />)}
            <div style={{position: 'absolute', left: 60, right: 60, top: 470, display: 'flex', justifyContent: 'center', gap: 14}}>{[0, 1, 2].map((k) => <div key={k} style={{width: 160, height: 220, borderRadius: 20, background: k === 0 ? VIO : '#E3E8EF', border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 352.4 + k * 0.3)}}><F n="salarie" size={110} /></div>)}</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 720, textAlign: 'center'}}><Pill at={353.0} c={VIO} size={30}>près d’1 pro sur 3 après 10 ans</Pill></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 820, display: 'flex', justifyContent: 'center', gap: 12}}><Pill at={358.6} c={NAVY} size={24}>sommeil ruiné</Pill><Pill at={360.0} c={NAVY} size={24}>anxiété</Pill><Pill at={361.6} c={RED} size={24}>détresse psychologique</Pill></div>
          </Abs>}
        </>
      )}
    </Out>
  );
};

/* ═════════════ 4 · NOUVEAUX RISQUES ═════════════ */
const Nouveaux: React.FC = () => {
  const t = useT();
  const co = prog(t, 382.0, 387.0, easeIn) * 10;
  return (
    <Out end={411.0}>
      <HiLine words={t < 389.2 ? ['L’espace', 'confiné'] : ['Cobots', '&', 'impression', '3D']} mark={t < 389.2 ? [0, 1] : [0, 2, 3]} at={t < 389.2 ? 376.0 : 392.0} y={330} size={60} />
      {t < 389.2 ? <>
        <Shot src={IMG.confine} ic="danger" x={60} y={440} w={960} h={440} at={376.0} c={ORANGE} blinds />
        <Abs x={60} y={910} w={960} h={460} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 28, padding: 30, boxSizing: 'border-box', opacity: pop(t, 380.0)}}>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#9AA7BC'}}>monoxyde de carbone · en 30 minutes</div>
          <div style={{position: 'relative', marginTop: 30, height: 70, borderRadius: 35, background: '#2A3550', border: '4px solid #fff', overflow: 'hidden'}}><div style={{width: `${co * 10}%`, height: '100%', background: `linear-gradient(90deg, ${GREEN}, ${YEL} 20%, ${RED})`}} /><div style={{position: 'absolute', left: '10%', top: -8, bottom: -8, width: 6, background: '#fff'}} /></div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 10, fontFamily: MONO, fontWeight: 700, fontSize: 20, color: '#C9D2DF'}}><span>limite autorisée</span><span style={{color: RED}}>× {co.toFixed(0)}</span></div>
          <div style={{marginTop: 30, fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: co > 9.5 ? RED : '#fff', textAlign: 'center'}}>{co > 9.5 ? 'piège mortel' : 'une simple étincelle…'}</div>
          <div style={{textAlign: 'center', marginTop: 10}}><Pill at={388.0} c={GREEN} size={26}>contrôles atmosphériques vitaux</Pill></div>
        </Abs>
      </> : <Abs x={60} y={440} w={960} h={930} style={{display: 'flex', flexDirection: 'column', gap: 20}}>
        <div style={{flex: 1, borderRadius: 28, background: '#fff', border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${ORANGE}`, display: 'flex', alignItems: 'center', gap: 26, padding: '0 30px', opacity: pop(t, 392.0)}}>
          <div style={{transform: `rotate(${Math.sin(t * 2) * 15}deg)`}}><F n="engrenage" size={150} /></div>
          <div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>Cobots</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 110, color: ORANGE, lineHeight: 1}}><Count n={60} a={398.0} b={400.0} suf=" %" /></div><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: DIM}}>des accidents pendant la maintenance</div></div>
        </div>
        <div style={{flex: 1, borderRadius: 28, background: NIGHT, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', gap: 26, padding: '0 30px', opacity: pop(t, 402.0), position: 'relative', overflow: 'hidden'}}>
          {Array.from({length: 40}, (_, k) => <div key={k} style={{position: 'absolute', left: 20 + random(`ax${k}`) * 900, top: 20 + random(`ay${k}`) * 400, width: 6, height: 6, borderRadius: 3, background: YEL, opacity: prog(t, 404.0 + k * 0.04, 404.4 + k * 0.04) * 0.7}} />)}
          <F n="bombe" size={150} />
          <div style={{position: 'relative'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff'}}>Fabrication additive</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: YEL, lineHeight: 1}}>× 10 à 100</div><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: '#C9D2DF'}}>nanoparticules · poudres explosives</div></div>
        </div>
      </Abs>}
    </Out>
  );
};

/* ═════════════ 5 · LA PRÉVENTION ═════════════ */
const HIER = [{l: 'Supprimer', s: 'éliminer le danger', c: GREEN, a: 426.0}, {l: 'Substituer', s: 'procédé moins toxique', c: TEAL, a: 428.5}, {l: 'Ventilation', s: 'ingénierie, captation', c: BLUE, a: 431.5}, {l: 'EPI', s: 'dernier recours', c: ORANGE, a: 437.0}];
const SUIVI = [{l: 'Jour 0', s: 'bilan audition & souffle', a: 488.4}, {l: '5 ans', s: 'sang & poumons', a: 493.5}, {l: '15 ans', s: 'cataractes, tests respiratoires', a: 496.4}, {l: '30 ans +', s: 'cancers à longue latence', a: 502.6}];
const Prevention: React.FC = () => {
  const t = useT();
  const ph = t < 449.6 ? 0 : t < 479.5 ? 1 : 2;
  return (
    <Out end={515.1}>
      {ph === 0 && (
        <>
          <HiLine words={['L’ordre', 'de', 'la', 'hiérarchie']} mark={[0, 3]} at={422.6} y={330} size={60} />
          <Abs x={60} y={440} w={960} h={930}>
            {HIER.map((h, k) => { const q = pop(t, h.a); const w = 960 - k * 150; return <div key={h.l} style={{position: 'absolute', left: (960 - w) / 2, top: k * 200, width: w, height: 180, borderRadius: 20, background: h.c, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', boxSizing: 'border-box', color: '#fff', opacity: q, transform: `translateY(${(1 - q) * -60}px)`}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48}}>{k + 1}. {h.l}</span><span style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, textAlign: 'right'}}>{h.s}</span></div>; })}
            <div style={{position: 'absolute', left: 0, right: 0, top: 820, textAlign: 'center'}}><Pill at={440.4} c={ORANGE} size={30}>le masque n’est pas la première ligne de défense</Pill></div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['La', 'captation', 'à', 'la', 'source']} mark={[1, 4]} at={449.8} y={330} size={60} />
          <Shot src={IMG.captation} ic="vent" x={60} y={440} w={960} h={420} at={450.0} c={BLUE} />
          <Abs x={60} y={890} w={960} h={480} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${BLUE}`, overflow: 'hidden', opacity: pop(t, 454.0)}}>
            <div style={{position: 'absolute', left: 600, top: 30, width: 260, height: 120, borderRadius: '0 0 130px 130px', background: '#C9D2DF', border: `6px solid ${INK}`}} />
            {Array.from({length: 30}, (_, k) => { const ph2 = (t * 0.8 + random(`cp${k}`)) % 1; const cap = k < 28 * prog(t, 458.0, 462.0); const x0 = 140 + random(`cx${k}`) * 300, y0 = 380 + random(`cy${k}`) * 60; return <div key={k} style={{position: 'absolute', left: cap ? lerp(x0, 730, ph2) : x0 + ph2 * 400, top: cap ? lerp(y0, 120, ph2) : y0 - ph2 * 300, width: 10, height: 10, borderRadius: 5, background: cap ? BLUE : RED, opacity: 1 - ph2 * 0.6}} />; })}
            <div style={{position: 'absolute', left: 30, top: 30, fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: BLUE}}>0,5 m/s</div>
            <div style={{position: 'absolute', left: 30, top: 110, fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK, opacity: pop(t, 460.0)}}>80 à 95 %</div>
            <div style={{position: 'absolute', left: 30, top: 170, fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM, opacity: pop(t, 460.0)}}>des particules aspirées</div>
            {t > 470.5 && <Stamp at={470.8} c={RED} text="« juste des masques » : stratégie perdante" x={40} y={370} rot={-3} size={30} />}
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Un', 'suivi', 'sur', 'des', 'décennies']} mark={[1, 4]} at={483.7} y={330} size={60} />
          <Shot src={IMG.suivi} ic="stethoscope" x={60} y={440} w={960} h={360} at={483.7} c={GREEN} blinds />
          <Abs x={60} y={830} w={960} h={540}>
            <div style={{position: 'absolute', left: 40, right: 114, top: 70, height: 14, borderRadius: 7, background: '#E3E8EF'}} />
            <div style={{position: 'absolute', left: 40, width: 806 * prog(t, 488.4, 508.0), top: 70, height: 14, borderRadius: 7, background: GREEN}} />
            {SUIVI.map((x, k) => <div key={x.l} style={{position: 'absolute', left: 40 + k * 262 - 20, top: 0, width: 220, opacity: pop(t, x.a)}}><div style={{width: 50, height: 50, borderRadius: 25, background: GREEN, border: `5px solid ${INK}`, marginTop: 52}} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK, marginTop: 10}}>{x.l}</div><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 22, color: DIM, lineHeight: 1.1}}>{x.s}</div></div>)}
            <div style={{position: 'absolute', left: 0, right: 0, top: 330, textAlign: 'center', opacity: pop(t, 509.0)}}><div style={{display: 'inline-block', background: NIGHT, color: YEL, fontFamily: sansFont, fontWeight: 900, fontSize: 40, padding: '16px 30px', borderRadius: 20, border: `5px solid ${INK}`}}>dossier médical gardé 40 ans</div></div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 6 · LE COÛT & LA QUESTION ═════════════ */
const Q = 'Vos ateliers sont-ils vraiment conformes et sûrs\u00a0?';
const Cout: React.FC = () => {
  const t = useT();
  const ph = t < 546.6 ? 0 : t < 570.0 ? 1 : 2;
  const tilt = lerp(0, -14, prog(t, 536.4, 538.0, easeInOut));
  return (
    <Out end={OUTRO_AT}>
      {ph === 0 && (
        <>
          <HiLine words={['2,6', 'milliards', 'd’euros', 'par', 'an']} mark={[0, 1]} at={524.0} y={330} size={58} />
          <Abs x={60} y={440} w={960} h={340} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 522.0)}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 150, color: GOLD, textShadow: `0 0 40px ${GOLD}`, lineHeight: 1}}><Count n={2.6} a={524.0} b={527.0} dec={1} /> Md€</div>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#C9D2DF', marginTop: 10}}>par an, en France · estimation d’ici 2026</div>
          </Abs>
          <Abs x={60} y={820} w={960} h={540}>
            <div style={{position: 'absolute', left: 470, top: 100, width: 20, height: 380, background: INK, borderRadius: 10}} />
            <div style={{position: 'absolute', left: 380, top: 470, width: 200, height: 36, background: INK, borderRadius: 12}} />
            <div style={{position: 'absolute', left: 80, top: 100, width: 800, height: 0, transform: `rotate(${tilt}deg)`}}>
              <div style={{position: 'absolute', left: 0, top: -9, width: 800, height: 18, background: INK, borderRadius: 9}} />
              {[{l: 'un cancer du poumon', s: '> 500 000 €', c: RED, x: -60, ic: 'poumons', a: 532.0}, {l: 'ventilation de pointe', s: 'des clopinettes', c: GREEN, x: 560, ic: 'vent', a: 536.4}].map((p) => <div key={p.l} style={{position: 'absolute', left: p.x, top: 10, width: 300, transform: `rotate(${-tilt}deg)`, transformOrigin: '50% 0', opacity: pop(t, p.a)}}><div style={{margin: '0 auto', width: 4, height: 40, background: INK}} /><div style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: '0 0 60px 60px', height: 230, boxShadow: `6px 6px 0 ${p.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><F n={p.ic} size={80} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, textAlign: 'center'}}>{p.l}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: p.c}}>{p.s}</div></div></div>)}
            </div>
          </Abs>
          {t > 540 && <Abs x={60} y={1310} w={960} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={540.2} c={GREEN} size={30}>prévenir</Pill><Pill at={540.9} c={TEAL} size={30}>protéger</Pill><Pill at={541.6} c={BLUE} size={30}>ventiler</Pill><Pill at={543.6} c={GOLD} size={30}>= le plus rentable</Pill></Abs>}
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Complexité', ',', 'latence', ',', 'invisibilité']} mark={[0, 2, 4]} at={547.5} y={330} size={50} />
          <Shot src={IMG.atelier} ic="usine" x={60} y={440} w={960} h={440} at={546.7} c={GOLD} blinds />
          <Abs x={60} y={910} w={960} h={460} style={{display: 'flex', gap: 16}}>{[{l: 'nanoparticules', s: 'jusqu’au cerveau', ic: 'cerveau', a: 554.4}, {l: 'UV', s: 'attaquent l’ADN', ic: 'soleil', a: 556.6}, {l: 'bruit', s: 'détruit les nerfs', ic: 'haut-parleur', a: 560.0}].map((x) => <div key={x.l} style={{flex: 1, borderRadius: 24, background: '#fff', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${RED}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: pop(t, x.a)}}><F n={x.ic} size={110} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK}}>{x.l}</span><span style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: DIM, textAlign: 'center'}}>{x.s}</span></div>)}</Abs>
          {t > 562 && <Stamp at={562.4} c={NAVY} text="fini les vieilles méthodes" x={180} y={780} rot={-5} size={40} />}
        </>
      )}
      {ph === 2 && (
        <>
          <AbsoluteFill style={{background: NIGHT, opacity: 0.92 * prog(t, 570.0, 571.0)}} />
          <Abs x={60} y={420} w={960} h={700} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 92, color: '#fff', lineHeight: 1.08}}>{Q.slice(0, Math.floor(prog(t, 572.0, 575.6) * Q.length))}<span style={{color: YEL, opacity: Math.sin(t * 10) > 0 ? 1 : 0}}>▍</span></div>
          </Abs>
          <Abs x={60} y={1150} w={960} style={{textAlign: 'center'}}><Pill at={578.0} c={GOLD} size={30}>la santé et la vie de centaines de milliers de personnes</Pill></Abs>
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
const pops = (L: number[], v = 0.2): Sfx[] => L.map((a) => ({at: a, s: 'sfx/pop', v}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, ...flaps(0.1, 14), {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 0.8, s: 'validation', v: 0.18})), {at: ALLDONE, s: 'validation', v: 0.3},
  ...SECT.map((x) => ({at: x.at + 0.3, s: 'soft-whoosh', v: 0.18, dur: 1.8})),
  ...rep(3.0, 30, 0.2, 'sfx/swish', 0.04), ...pops([6.6, 8.0, 9.0]), ...rep(9.5, 10, 0.2, 'tick', 0.12), {at: 17.0, s: 'tampon', v: 0.55}, {at: 21.0, s: 'soft-whoosh', v: 0.3, dur: 1}, ...[23.5, 24.6].map((a) => ({at: a, s: 'sfx/thud', v: 0.25})), {at: 27.0, s: 'deep-hit', v: 0.3}, ...pops([33.0, 35.0]),
  ...rep(40.0, 30, 0.1, 'sfx/click', 0.07), ...pops([55.0, 55.8, 56.6]), {at: 60.6, s: 'tampon', v: 0.6}, {at: 63.6, s: 'sfx/pop', v: 0.2},
  {at: 79.6, s: 'sfx/whoosh', v: 0.25}, {at: 83.2, s: 'tampon', v: 0.7}, {at: 83.25, s: 'bass-hit', v: 0.4}, ...[89.6, 92.4, 93.4].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), {at: 96.0, s: 'sfx/ding', v: 0.22},
  {at: 105.0, s: 'sfx/whoosh', v: 0.22}, ...rep(105.2, 17, 0.2, 'tick', 0.12), {at: 110.7, s: 'deep-hit', v: 0.3}, ...DANGERS.map((_, k) => ({at: 111.0 + k * 0.17, s: 'sfx/pop', v: 0.12})), {at: 132.9, s: 'tampon', v: 0.55},
  ...[149.0, 152.5, 154.0].map((a) => ({at: a, s: 'sfx/rise', v: 0.2, dur: 0.9})), {at: 156.6, s: 'sfx/pop', v: 0.2}, ...rep(165.0, 24, 0.125, 'tick', 0.14), ...pops([163.0, 166.4, 169.4]),
  {at: 174.0, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 192.5, s: 'deep-hit', v: 0.3}, ...rep(193.5, 15, 0.12, 'tick', 0.08), {at: 203.0, s: 'bass-hit', v: 0.35}, {at: 205.0, s: 'soft-whoosh', v: 0.35, dur: 13}, ...[205.2, 207.7, 210.2].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})), {at: 216.0, s: 'alarme', v: 0.05, dur: 0.8},
  {at: 222.2, s: 'soft-whoosh', v: 0.35, dur: 1}, ...pops([225.5, 230.0, 242.5, 245.0, 251.0], 0.18), {at: 237.0, s: 'sfx/rise', v: 0.25, dur: 3}, {at: 251.5, s: 'tampon', v: 0.55},
  ...pops([264.8, 266.4, 268.0]), ...searchCues(271.4, 22, 273.4, 273.7), ...PROCS.map((p) => ({at: p.a, s: 'sfx/ding', v: 0.22})), {at: 287.0, s: 'sfx/pop', v: 0.2},
  {at: 294.0, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 300.0, s: 'sfx/pop', v: 0.2}, {at: 307.0, s: 'bass-hit', v: 0.4}, ...rep(307.0, 12, 0.5, 'sfx/swish', 0.08), {at: 314.0, s: 'sfx/whoosh', v: 0.25}, ...pops([318.0, 319.5]), {at: 326.3, s: 'tampon', v: 0.6},
  {at: 330.3, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 340.0, s: 'sfx/rise', v: 0.3, dur: 4.5}, {at: 344.5, s: 'alarme', v: 0.06, dur: 0.8}, ...pops([352.4, 352.7, 353.0, 358.6, 360.0, 361.6], 0.16),
  {at: 376.0, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 382.0, s: 'sfx/rise', v: 0.25, dur: 5}, {at: 387.0, s: 'alarme', v: 0.07, dur: 1}, {at: 388.0, s: 'validation', v: 0.2}, {at: 392.0, s: 'sfx/whoosh', v: 0.25}, ...rep(398.0, 10, 0.2, 'tick', 0.12), {at: 402.0, s: 'deep-hit', v: 0.3},
  ...HIER.map((h) => ({at: h.a, s: 'sfx/thud', v: 0.3})), {at: 440.4, s: 'sfx/pop', v: 0.2}, {at: 450.0, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 458.0, s: 'soft-whoosh', v: 0.35, dur: 4}, {at: 460.0, s: 'validation', v: 0.25}, {at: 470.8, s: 'tampon', v: 0.5},
  {at: 483.7, s: 'soft-whoosh', v: 0.3, dur: 1}, ...SUIVI.map((x) => ({at: x.a, s: 'sfx/ding', v: 0.22})), {at: 509.0, s: 'bass-hit', v: 0.3},
  {at: 522.0, s: 'sfx/whoosh', v: 0.25}, ...rep(524.0, 15, 0.2, 'tick', 0.12), {at: 532.0, s: 'sfx/pop', v: 0.22}, {at: 536.4, s: 'sfx/pop', v: 0.22}, {at: 538.0, s: 'sfx/thud', v: 0.35}, ...pops([540.2, 540.9, 541.6]), {at: 543.6, s: 'validation', v: 0.25},
  {at: 546.7, s: 'soft-whoosh', v: 0.3, dur: 1}, ...pops([554.4, 556.6, 560.0]), {at: 562.4, s: 'tampon', v: 0.5}, {at: 570.0, s: 'deep-hit', v: 0.4}, ...rep(572.0, 34, 0.105, 'sfx/click', 0.08), {at: 578.0, s: 'sfx/ding', v: 0.25},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Soudure: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={37.35}><Intro /></Gate>
    <Gate from={37.7} to={172.25}><Mythe /></Gate>
    <Gate from={172.6} to={255.25}><Fumees /></Gate>
    <Gate from={255.6} to={364.05}><Physique /></Gate>
    <Gate from={364.4} to={411.05}><Nouveaux /></Gate>
    <Gate from={411.4} to={515.15}><Prevention /></Gate>
    <Gate from={515.5} to={OUTRO_AT}><Cout /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}><Gyro i={i} /></Gate>)}
    <Gate from={2.8} to={570.0}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={587.2}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-soudure-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Kin, Brut, T, TitleBlock, Win, GLASS, Check, Tile, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, spring, Strike, LoupeSweep, PneuDeliver, Shine, BURG];
