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
 * « Les 7 règles d'or du responsable QSE » (6 min 10) — capsule « condensé + effet wahou + ultra premium » présentée en
 * métro : les 7 règles d'or sont 7 stations dorées que la rame réaliste dessert au moment où la voix les énonce.
 * Voix d'origine (sans musique de fond), sous-titres calés mot à mot, photos générées (ChatGPT) déjà fournies pendant la
 * session, réutilisées. Fil rouge : tube pneumatique à six guichets adaptés (défis → planification → appropriation →
 * dynamiser → audits → excellence) ; gyrophare à chaque partie ; capsule pneumatique, loupe, store vénitien dans les
 * scènes. Wahou : sac de paperasse qui devient propulseur, batterie qui se vide, manuel qui tombe au fond du tiroir,
 * barre de recherche qui trouve puis OUVRE les 7 règles, courbe de charge lissée, flèches éparpillées qui s'alignent,
 * stylo qui change de main, montagne de documents qui fond en une checklist, électrocardiogramme du système vivant,
 * lampe d'interrogatoire qui devient loupe collaborative, flux entre direction / manager / équipes, escalier sans fin.
 */
const IMG = {
  cover: 'vingt-gen/final.jpg',
  fardeau: 'isoperf-gen/usine-a-gaz.jpg',
  tiroir: 'influence-gen/tiroir.jpg',
  planning: 'sysqsse-gen/chef.jpg',
  parties: 'maturite-gen/proactif.jpg',
  appropriation: 'influence-gen/ecoute.jpg',
  montagne: 'sysqsse-gen/surcharge.jpg',
  vivant: 'sysqsse-gen/reunion.jpg',
  vulgarisation: 'influence-gen/terrain.jpg',
  audit: 'isoperf-gen/auditeur.jpg',
  alignement: 'maturite-gen/direction.jpg',
  excellence: 'maturite-gen/couverture.jpg',
  conclusion: 'influence-gen/adhesion.jpg',
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
const OUTRO_AT = 367.4;
export const REGLES_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 73.2, n: '1', title: 'Les défis du QSE', s: 'de la conformité au moteur', c: RED, g: 'défis', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 108.7, n: '2', title: 'Planification & implication', s: 'le temps et l’humain', c: BLUE, g: 'planification', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 159.5, n: '3', title: 'L’appropriation', s: 'chaque service auteur', c: TEAL, g: 'appropriation', k: 'gyro', lab: 'PARTIE 3 / 6'},
  {at: 193.7, n: '4', title: 'Dynamiser & simplifier', s: 'un système vivant', c: ORANGE, g: 'dynamiser', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 265.6, n: '5', title: 'Audits & alignement', s: 'une opportunité de progrès', c: VIO, g: 'audits', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 325.3, n: '6', title: 'L’excellence opérationnelle', s: 'marche après marche', c: GOLD, g: 'excellence', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 349.0;
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

/* ═════════════ Les 7 règles d'or (stations dorées) ═════════════ */
const RULES = [
  {n: 1, l: 'Transformer la conformité en moteur collaboratif', s: 'moteur', at: 101.94},
  {n: 2, l: 'Planifier pour lisser la charge', s: 'planifier', at: 117.86},
  {n: 3, l: 'Associer les parties prenantes dès le 1er jour', s: 'associer', at: 127.06},
  {n: 4, l: 'Chaque service, auteur de sa documentation', s: 'approprier', at: 180.26},
  {n: 5, l: 'Un système QSE vivant… et vulgarisé', s: 'vivant', at: 225.7},
  {n: 6, l: 'Les audits : une opportunité de progrès', s: 'audits', at: 290.98},
  {n: 7, l: 'Une communication ultra fluide', s: 'fluide', at: 308.18},
];
const Metro: React.FC = () => {
  const t = useT();
  const cur = RULES.reduce((a, x, k) => (t >= x.at ? k : a), -1);
  const sx = (k: number) => 80 + k * (800 / (RULES.length - 1));
  const mv = cur <= 0 ? 1 : prog(t, RULES[cur].at - 1.2, RULES[cur].at, easeInOut);
  const tx = cur < 0 ? sx(0) - 50 : cur === 0 ? sx(0) : lerp(sx(cur - 1), sx(cur), mv);
  return (
    <Abs x={60} y={1400} w={960} h={104} style={{zIndex: 30, background: 'rgba(255,255,255,0.95)', border: `4px solid ${INK}`, borderRadius: 20, boxShadow: `5px 5px 0 ${GOLD}`}}>
      <div style={{position: 'absolute', left: 60, right: 60, top: 30, height: 12, borderRadius: 6, background: `linear-gradient(90deg, ${GOLD}, #FFD966, ${GOLD})`}} />
      {RULES.map((x, k) => { const on = k <= cur; return <div key={x.n} style={{position: 'absolute', left: sx(k) - 18, top: 18, width: 36, height: 36, borderRadius: 18, background: on ? `radial-gradient(circle at 35% 30%, #FFF3B0, ${GOLD})` : '#fff', border: `4px solid ${on ? INK : GOLD}`, boxSizing: 'border-box', color: INK, fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: k === cur ? `0 0 18px ${GOLD}` : 'none'}}>{x.n}</div>; })}
      {RULES.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: sx(k) - 70, width: 140, top: 62, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 16, color: k === cur ? BURG : DIM}}>{x.s}</div>)}
      {cur >= 0 && <Img src={staticFile('metroiso-gen/metro/rame-dessus.png')} style={{position: 'absolute', left: tx - 50, top: 18, width: 100, height: 34, filter: 'drop-shadow(0 0 8px rgba(255,200,80,0.9))'}} />}
    </Abs>
  );
};
/** Médaille « règle d'or » qui claque à l'énoncé de chaque règle. */
const GoldRule: React.FC = () => {
  const t = useT();
  const r = RULES.find((x) => t >= x.at - 0.1 && t < x.at + 3.2);
  if (!r) return null;
  const q = prog(t, r.at - 0.1, r.at + 0.35, easeOut);
  const out = prog(t, r.at + 2.8, r.at + 3.2, easeIn);
  return (
    <Abs x={40} y={1220} w={1000} h={160} style={{zIndex: 32, opacity: 1 - out, transform: `translateY(${(1 - q) * 120}px) scale(${0.8 + 0.2 * q})`}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: 30, background: `linear-gradient(110deg, #3A2A05, ${NIGHT})`, border: `5px solid ${GOLD}`, boxShadow: `0 0 40px ${GOLD}AA`, display: 'flex', alignItems: 'center', gap: 22, padding: '0 26px', overflow: 'hidden'}}>
        <div style={{width: 110, height: 110, borderRadius: 55, background: `radial-gradient(circle at 35% 30%, #FFF3B0, ${GOLD} 60%, #8A5A00)`, border: '5px solid #fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: `rotateY(${(1 - q) * 360}deg)`}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 14, color: INK}}>RÈGLE</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: INK, lineHeight: 0.9}}>{r.n}</div></div>
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#FFD966', letterSpacing: 3}}>RÈGLE D’OR · {r.n} / 7</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 40 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
        <div style={{position: 'absolute', top: 0, bottom: 0, width: 120, left: lerp(-160, 1100, prog(t, r.at + 0.3, r.at + 1.3)), background: 'linear-gradient(90deg, transparent, rgba(255,240,180,0.55), transparent)', transform: 'skewX(-20deg)'}} />
      </div>
    </Abs>
  );
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 200}}><Pic src={IMG.cover} ic="trophee" w={1080} h={740} pos="50% 40%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER} 9%, ${PAPER}00 16%, ${PAPER}00 34%, ${PAPER}DD 43%, ${PAPER} 48%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={930} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>RESPONSABLE QSE</div>
        <div style={{marginTop: 18}}><Board text="LES 7 RÈGLES" at={-1} h={90} gap={2} c={GOLD} stag={0.02} /></div>
        <div style={{marginTop: 8}}><Board text="D’OR" at={-1} h={110} gap={4} c={'#B07A00'} stag={0.02} /></div>
        <div style={{marginTop: 20, display: 'flex', justifyContent: 'center', gap: 10}}>{RULES.map((x) => <div key={x.n} style={{width: 70, height: 70, borderRadius: 35, background: `radial-gradient(circle at 35% 30%, #FFF3B0, ${GOLD})`, border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK}}>{x.n}</div>)}</div>
      </Abs>
      <Abs x={60} y={1500} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO : du fardeau au propulseur ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const ph = t < 30.8 ? 0 : t < 55.4 ? 1 : 2;
  const fly = prog(t, 24.2, 27.4, easeIn);
  return (
    <Out end={73.2}>
      {ph === 0 && (
        <>
          <HiLine words={t < 20.5 ? ['7', 'règles', 'd’or'] : ['Corvée', '→', 'moteur']} mark={t < 20.5 ? [0, 2] : [0, 2]} at={t < 20.5 ? 4.6 : 20.6} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 330, top: 300 - fly * 900, width: 300, height: 360, opacity: pop(t, 3.0)}}>
              <div style={{position: 'absolute', left: 40, top: 0, width: 220, height: 280, borderRadius: 24, background: t > 24.2 ? GOLD : '#C9D2DF', border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={t > 24.2 ? 'fusee' : 'classeur'} size={150} /></div>
              {t > 24.2 && Array.from({length: 14}, (_, k) => <div key={k} style={{position: 'absolute', left: 120 + (random(`fl${k}`) - 0.5) * 80, top: 290 + ((t * 600 + k * 40) % 260), width: 26, height: 26, borderRadius: 13, background: k % 2 ? ORANGE : YEL, opacity: 0.8 - ((t * 600 + k * 40) % 260) / 340, filter: 'blur(2px)'}} />)}
            </div>
            {t > 14.8 && t < 24.2 && <div style={{position: 'absolute', left: 0, right: 0, top: 700, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={15.66} c={DIM} size={30}>ça fait peur</Pill><Pill at={16.86} c={DIM} size={30}>ça ennuie</Pill></div>}
            {t > 22.5 && <div style={{position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={22.5} c={DIM} size={28}>corvée administrative</Pill><div style={{fontSize: 40, fontWeight: 900, color: INK, opacity: pop(t, 25.1)}}>→</div><Pill at={25.1} c={GOLD} size={28}>moteur stratégique</Pill></div>}
            {t > 27.38 && <div style={{position: 'absolute', left: 0, right: 0, top: 860, textAlign: 'center'}}><Pill at={27.38} c={GREEN} size={30}>propulseur de performance</Pill></div>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Le', 'fardeau', 'administratif']} mark={[1, 2]} at={30.9} y={330} size={62} />
          <Shot src={IMG.fardeau} ic="classeur" x={60} y={440} w={960} h={500} at={31.0} c={RED} />
          <Abs x={60} y={970} w={960} h={400} style={{display: 'flex', flexDirection: 'column', gap: 12}}>
            {[{l: 'cocher des cases pour la certification', a: 38.18}, {l: 'tableaux de risques interminables', a: 41.5}, {l: 'montagnes de paperasse', a: 44.18}].map((x) => <div key={x.l} style={{flex: 1, borderRadius: 18, background: '#fff', border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', gap: 14, padding: '0 22px', opacity: pop(t, x.a), position: 'relative'}}><div style={{width: 40, height: 40, borderRadius: 10, border: `4px solid ${INK}`, color: RED, fontWeight: 900, fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>✓</div><span style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: INK}}>{x.l}</span><div style={{position: 'absolute', left: 80, right: 20, top: '50%'}}><Strike p={prog(t, 51.38, 52.2)} c={RED} /></div></div>)}
          </Abs>
          {t > 52.4 && <Stamp at={52.42} c={GREEN} text="à déconstruire" x={300} y={860} rot={-6} size={46} />}
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Au', 'programme']} mark={[1]} at={55.46} y={330} size={62} />
          <SearchOpen x={60} y={440} w={960} h={920} at={55.6} query="7 règles d’or du responsable QSE" results={['Glossaire QSE', 'Les 7 règles d’or du responsable QSE', 'Modèle de procédure']} found={1} foundAt={57.4} clickAt={57.7} c={GOLD}>
            <div style={{position: 'absolute', inset: 0, padding: '28px 30px', display: 'flex', flexDirection: 'column', gap: 14}}>
              {[{l: 'les défis du QSE', a: 58.74, c: RED}, {l: 'la planification', a: 61.54, c: BLUE}, {l: 'l’appropriation par les équipes', a: 62.98, c: TEAL}, {l: 'dynamiser le système', a: 66.1, c: ORANGE}, {l: 'le vrai rôle des audits', a: 68.14, c: VIO}, {l: 'l’excellence opérationnelle', a: 71.98, c: GOLD}].map((x, k) => <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 18, opacity: pop(t, x.a), transform: `translateX(${(1 - pop(t, x.a)) * 60}px)`}}><div style={{width: 64, height: 64, borderRadius: 16, background: x.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `4px solid ${INK}`}}>{k + 1}</div><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK}}>{x.l}</span></div>)}
            </div>
          </SearchOpen>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 1 · LES DÉFIS ═════════════ */
const Defis: React.FC = () => {
  const t = useT();
  const ph = t < 96.8 ? 0 : 1;
  const bat = 1 - prog(t, 78.0, 83.0);
  const drop = prog(t, 93.3, 95.8, easeIn);
  const slam = prog(t, 95.8, 96.3);
  return (
    <Out end={108.7}>
      {ph === 0 && (
        <>
          <HiLine words={t < 89.9 ? ['L’épuisement', 'professionnel'] : ['Au', 'fond', 'd’un', 'tiroir']} mark={t < 89.9 ? [0, 1] : [1, 3]} at={t < 89.9 ? 78.6 : 90.1} y={330} size={60} />
          {t < 89.9 ? <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 330, top: 40, width: 300, height: 520, borderRadius: 40, border: `14px solid ${INK}`, background: '#fff'}}>
              <div style={{position: 'absolute', left: 110, top: -40, width: 80, height: 30, borderRadius: 8, background: INK}} />
              <div style={{position: 'absolute', left: 16, right: 16, bottom: 16, height: `${bat * 92}%`, borderRadius: 22, background: bat > 0.5 ? GREEN : bat > 0.2 ? ORANGE : RED}} />
              <div style={{position: 'absolute', left: 0, right: 0, top: 200, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: INK}}>{Math.round(bat * 100)} %</div>
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 620, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={85.98} c={NAVY} size={28}>systèmes ultra-rigides</Pill><Pill at={88.42} c={RED} size={28}>contraintes venues d’en haut</Pill></div>
          </Abs> : <Abs x={60} y={440} w={960} h={930}>
            <Shot src={IMG.tiroir} ic="classeur" x={0} y={420} w={960} h={500} at={90.1} c={RED} />
            <div style={{position: 'absolute', left: 340, top: lerp(0, 520, drop), width: 280, height: 360, background: '#fff', border: `6px solid ${INK}`, borderRadius: 14, transform: `rotate(${drop * 25}deg) scale(${1 - drop * 0.4})`, opacity: 1 - slam, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, zIndex: 3}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM}}>MANUEL SÉCURITÉ</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: RED, lineHeight: 1}}>50</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>pages</div></div>
          </Abs>}
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Un', 'pivot', 'radical']} mark={[1, 2]} at={97.78} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={760}>
            <div style={{position: 'absolute', left: 40, top: 40, width: 380, height: 300, borderRadius: 26, background: '#F1F3F6', border: `5px dashed ${DIM}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: pop(t, 99.38)}}><F n="clipboard" size={110} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM}}>stricte conformité</span><div style={{width: 300}}><Strike p={prog(t, 101.0, 101.8)} c={RED} /></div></div>
            <div style={{position: 'absolute', left: 440, top: 150, fontSize: 70, fontWeight: 900, color: GOLD, opacity: pop(t, 101.94)}}>→</div>
            <div style={{position: 'absolute', left: 540, top: 40, width: 380, height: 300, borderRadius: 26, background: GOLD, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, opacity: pop(t, 102.4), boxShadow: `0 0 30px ${GOLD}`}}>{[0, 1, 2].map((k) => <div key={k} style={{transform: `rotate(${(k % 2 ? -1 : 1) * t * 60}deg)`, marginLeft: k ? -26 : 0}}><F n="engrenage" size={110} /></div>)}</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK, opacity: pop(t, 103.06)}}>un immense moteur collaboratif</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 470, textAlign: 'center'}}><Pill at={106.38} c={GREEN} size={30}>chaque action a un vrai sens pratique</Pill></div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 2 · PLANIFICATION & IMPLICATION ═════════════ */
const Planif: React.FC = () => {
  const t = useT();
  const ph = t < 137.8 ? 0 : 1;
  const smooth = prog(t, 119.46, 121.6, easeInOut);
  const align = prog(t, 151.1, 155.0, easeInOut);
  const pts = Array.from({length: 13}, (_, k) => { const raw = 120 + Math.sin(k * 1.7) * 90 + (k === 4 || k === 9 ? -110 : 0); return `${40 + k * 70},${lerp(raw, 150, smooth)}`; }).join(' ');
  return (
    <Out end={159.5}>
      {ph === 0 && (
        <>
          <HiLine words={t < 126.8 ? ['Lisser', 'la', 'charge'] : ['Associer', 'dès', 'le', '1er', 'jour']} mark={t < 126.8 ? [0, 2] : [0, 3, 4]} at={t < 126.8 ? 117.9 : 127.1} y={330} size={60} />
          {t < 126.8 ? <Abs x={60} y={440} w={960} h={760} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${BLUE}`, opacity: pop(t, 113.3)}}>
            <div style={{position: 'absolute', left: 30, top: 22, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>charge de travail QSE</div>
            <svg width={948} height={360} style={{position: 'absolute', left: 0, top: 80}}><polyline points={pts} fill="none" stroke={smooth > 0.5 ? GREEN : RED} strokeWidth={8} strokeLinejoin="round" /><line x1={40} y1={300} x2={900} y2={300} stroke={INK} strokeWidth={4} /></svg>
            {smooth < 0.5 && [4, 9].map((k) => <div key={k} style={{position: 'absolute', left: 40 + k * 70 - 30, top: 70, opacity: pop(t, 121.74)}}><F n="eclair" size={60} /></div>)}
            <div style={{position: 'absolute', left: 0, right: 0, top: 470, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={121.74} c={RED} size={26}>pics de stress</Pill><Pill at={123.62} c={RED} size={26}>erreurs & non-conformités</Pill></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 580, textAlign: 'center'}}><Pill at={119.46} c={GREEN} size={30}>planifier rigoureusement</Pill></div>
          </Abs> : <>
            <Shot src={IMG.parties} ic="equipe" x={60} y={440} w={960} h={460} at={127.1} c={BLUE} blinds />
            <Abs x={60} y={930} w={960} h={240} style={{display: 'flex', gap: 16}}>{[{l: 'le temps', ic: 'calendrier', a: 131.62}, {l: 'l’humain', ic: 'equipe', a: 132.2}, {l: 'chacun comprend son rôle', ic: 'badge', a: 133.5}, {l: 'la sérénité', ic: 'coeur', a: 135.38}].map((x) => <div key={x.l} style={{flex: 1, borderRadius: 20, background: '#fff', border: `4px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, opacity: pop(t, x.a), padding: 8}}><F n={x.ic} size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: INK, textAlign: 'center', lineHeight: 1.1}}>{x.l}</span></div>)}</Abs>
          </>}
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Canaliser', 'l’énergie', 'brute']} mark={[0, 2]} at={151.1} y={330} size={60} />
          <Abs x={60} y={440} w={960} h={760} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 30, overflow: 'hidden', opacity: pop(t, 138.0)}}>
            {Array.from({length: 22}, (_, k) => { const a0 = random(`ar${k}`) * Math.PI * 2; const ang = lerp(a0 * 180 / Math.PI, 0, align); const x = lerp(80 + random(`ax${k}`) * 700, 120 + (k % 4) * 30, align); const y = lerp(60 + random(`ay${k}`) * 600, 260 + (k % 11) * 22, align); return <div key={k} style={{position: 'absolute', left: x + (align > 0.98 ? (t * 260 + k * 50) % 700 : 0), top: y, width: 90, height: 8, borderRadius: 4, background: align > 0.98 ? GOLD : ['#7CC4FF', ORANGE, GREEN, '#FF8A7A'][k % 4], transform: `rotate(${ang}deg)`, boxShadow: align > 0.98 ? `0 0 10px ${GOLD}` : 'none'}} />; })}
            <div style={{position: 'absolute', left: 30, top: 24, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#9AA7BC'}}>{align < 0.5 ? 'efforts éparpillés, chaotiques' : 'un flux de travail unique et cohérent'}</div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 3 · L'APPROPRIATION ═════════════ */
const Appro: React.FC = () => {
  const t = useT();
  const pass = prog(t, 178.42, 181.0, easeInOut);
  return (
    <Out end={193.7}>
      <HiLine words={t < 177.1 ? ['L’erreur', 'fatale'] : ['Chaque', 'service', 'est', 'auteur']} mark={t < 177.1 ? [0, 1] : [1, 3]} at={t < 177.1 ? 166.2 : 178.4} y={330} size={60} />
      <Abs x={60} y={440} w={960} h={420}>
        <div style={{position: 'absolute', left: 40, top: 60, width: 260, height: 300, borderRadius: 26, background: '#fff', border: `5px solid ${pass < 0.5 ? RED : '#C9D2DF'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: pop(t, 167.8)}}><F n="superviseur" size={120} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK}}>responsable QSE</span><span style={{fontFamily: MONO, fontWeight: 700, fontSize: 16, color: RED, opacity: pass < 0.5 ? 1 : 0.3}}>rédige à la place des autres</span></div>
        <div style={{position: 'absolute', left: 660, top: 60, width: 260, height: 300, borderRadius: 26, background: '#fff', border: `5px solid ${pass > 0.5 ? TEAL : '#C9D2DF'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: pop(t, 167.8), boxShadow: pass > 0.5 ? `0 0 26px ${TEAL}` : 'none'}}><F n="ouvrier" size={120} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK}}>chaque service</span><span style={{fontFamily: MONO, fontWeight: 700, fontSize: 16, color: TEAL}}>auteur & propriétaire</span></div>
        <div style={{position: 'absolute', left: lerp(190, 790, pass) - 50, top: 150 - Math.sin(pass * Math.PI) * 130, transform: `rotate(${-30 + pass * 60}deg)`, opacity: pop(t, 170.3)}}><F n="ecrit" size={100} /></div>
        {t > 172.3 && t < 178.4 && <Stamp at={172.34} c={RED} text="déconnexion du terrain" x={250} y={330} rot={-6} size={36} />}
      </Abs>
      <Shot src={IMG.appropriation} ic="ouvrier" x={60} y={890} w={600} h={480} at={184.9} c={TEAL} />
      <Abs x={680} y={890} w={340} h={480} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 26, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, opacity: pop(t, 187.38)}}>
        <div style={{transform: `rotate(${prog(t, 187.6, 188.4) * 20}deg)`}}><F n="cadenas" size={130} /></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff', textAlign: 'center', lineHeight: 1.1}}>consigner<br />une machine</div>
        <Pill at={190.34} c={TEAL} size={20}>colle au travail réel</Pill>
        <Pill at={192.0} c={GREEN} size={20}>respecté naturellement</Pill>
      </Abs>
    </Out>
  );
};

/* ═════════════ 4 · DYNAMISER & SIMPLIFIER ═════════════ */
const Dyn: React.FC = () => {
  const t = useT();
  const ph = t < 222.3 ? 0 : t < 242.7 ? 1 : 2;
  const melt = prog(t, 220.6, 222.2, easeIn);
  const flat = t > 236.58 && t < 238.54;
  const ecg: string[] = [];
  for (let x = 0; x <= 900; x += 6) { const p = (x + t * 260) % 225; const y = flat ? 150 : p > 90 && p < 120 ? 150 - Math.sin(((p - 90) / 30) * Math.PI * 2) * 90 : 150 + Math.sin(x / 18) * 3; ecg.push(`${x},${y}`); }
  return (
    <Out end={265.6}>
      {ph === 0 && (
        <>
          <HiLine words={['Une', 'montagne', 'de', 'documents']} mark={[1, 3]} at={203.02} y={330} size={60} />
          <Shot src={IMG.montagne} ic="classeur" x={60} y={440} w={960} h={460} at={199.0} c={ORANGE} />
          <Abs x={60} y={930} w={960} h={440}>
            {Array.from({length: 10}, (_, k) => <div key={k} style={{position: 'absolute', left: 300 + (k % 2) * 30, top: 330 - k * 34 + melt * k * 34, width: 360, height: 30, borderRadius: 6, background: ['#fff', '#F1F3F6'][k % 2], border: `3px solid ${INK}`, opacity: (1 - melt) * pop(t, 203.0 + k * 0.1)}} />)}
            {[{l: 'jargon', a: 206.34, x: 20}, {l: 'registres interminables', a: 207.78, x: 640}, {l: 'approbations sans fin', a: 209.14, x: 20}].map((x, k) => <div key={x.l} style={{position: 'absolute', left: x.x, top: 60 + k * 110, opacity: pop(t, x.a) * (1 - melt)}}><Pill at={x.a} c={RED} size={24}>{x.l}</Pill></div>)}
            {t > 220.58 && <div style={{position: 'absolute', left: 230, top: 120, width: 500, height: 200, borderRadius: 22, background: '#fff', border: `6px solid ${RED}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: RED, transform: `scale(${melt})`}}>voué à l’échec</div>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Un', 'système', 'vivant']} mark={[1, 2]} at={222.4} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={420} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 222.4)}}>
            <svg width={948} height={300} style={{position: 'absolute', left: 0, top: 60}}><polyline points={ecg.join(' ')} fill="none" stroke={flat ? RED : GREEN} strokeWidth={7} strokeLinejoin="round" style={{filter: `drop-shadow(0 0 8px ${flat ? RED : GREEN})`}} /></svg>
            <div style={{position: 'absolute', left: 24, top: 18, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: flat ? '#FF8A7A' : '#7CFFB2'}}>{flat ? 'système figé : il meurt' : 'système QSE : vivant'}</div>
          </Abs>
          <Shot src={IMG.vivant} ic="equipe" x={60} y={890} w={600} h={480} at={229.7} c={ORANGE} />
          <Abs x={680} y={890} w={340} h={480} style={{display: 'flex', flexDirection: 'column', gap: 12}}>{[{l: 'réunions régulières', a: 230.66}, {l: 'suivi des indicateurs', a: 231.82}, {l: 'petits ajustements', a: 234.06}].map((x) => <div key={x.l} style={{flex: 1, borderRadius: 18, background: '#fff', border: `4px solid ${INK}`, boxShadow: `5px 5px 0 ${ORANGE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, padding: 8, opacity: pop(t, x.a)}}>{x.l}</div>)}</Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['L’art', 'de', 'vulgariser']} mark={[0, 2]} at={243.2} y={330} size={62} />
          <Shot src={IMG.vulgarisation} ic="megaphone" x={60} y={440} w={960} h={400} at={243.0} c={ORANGE} blinds />
          <Abs x={60} y={870} w={960} h={500} style={{display: 'flex', alignItems: 'center', gap: 20}}>
            <div style={{flex: 1, height: 420, borderRadius: 24, background: '#fff', border: `5px solid ${INK}`, padding: 20, boxSizing: 'border-box', opacity: pop(t, 258.06), overflow: 'hidden'}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: DIM}}>NORME ISO · texte technique</div>{Array.from({length: 9}, (_, k) => <div key={k} style={{height: 12, borderRadius: 6, background: '#C9D2DF', marginTop: 14, width: `${70 + random(`nl${k}`) * 30}%`, opacity: 1 - prog(t, 259.4 + k * 0.08, 259.8 + k * 0.08)}} />)}</div>
            <div style={{fontSize: 60, fontWeight: 900, color: ORANGE, opacity: pop(t, 259.38)}}>→</div>
            <div style={{flex: 1, height: 420, borderRadius: 24, background: '#fff', border: `5px solid ${ORANGE}`, boxShadow: `6px 6px 0 ${ORANGE}`, padding: 20, boxSizing: 'border-box', opacity: pop(t, 259.6)}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: ORANGE}}>CHECKLIST · caristes</div>{[0, 1, 2, 3].map((k) => <div key={k} style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 22}}><div style={{width: 40, height: 40, borderRadius: 10, border: `4px solid ${INK}`, background: t > 260.4 + k * 0.4 ? GREEN : '#fff', color: '#fff', fontWeight: 900, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{t > 260.4 + k * 0.4 ? '✓' : ''}</div><div style={{flex: 1, height: 14, borderRadius: 7, background: '#E3E8EF'}} /></div>)}</div>
          </Abs>
          {t > 254.8 && t < 258 && <Stamp at={254.82} c={RED} text="sans baisser l’exigence" x={200} y={700} rot={-5} size={40} />}
          {t > 262 && <Stamp at={262.06} c={NAVY} text="travail d’équilibriste" x={220} y={780} rot={-4} size={38} />}
        </>
      )}
    </Out>
  );
};

/* ═════════════ 5 · AUDITS & ALIGNEMENT ═════════════ */
const Audits: React.FC = () => {
  const t = useT();
  const ph = t < 306.0 ? 0 : 1;
  const flip = prog(t, 274.4, 276.4, easeInOut);
  const conf = prog(t, 301.9, 305.0, easeOut);
  return (
    <Out end={325.3}>
      {ph === 0 && (
        <>
          <HiLine words={t < 289 ? ['Pas', 'un', 'interrogatoire'] : ['Une', 'opportunité', 'de', 'progrès']} mark={t < 289 ? [2] : [1, 3]} at={t < 289 ? 270.7 : 290.98} y={330} size={60} />
          <Abs x={60} y={440} w={960} h={480} style={{background: flip < 0.5 ? NIGHT : '#fff', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 270.0)}}>
            {flip < 0.5 ? <>
              <div style={{position: 'absolute', left: 380, top: 0, width: 200, height: 200, clipPath: 'polygon(30% 0, 70% 0, 100% 100%, 0 100%)', background: 'linear-gradient(180deg, #FFF3B0, transparent)', opacity: 0.7}} />
              <div style={{position: 'absolute', left: 430, top: 20}}><F n="ampoule" size={100} /></div>
              <div style={{position: 'absolute', left: 0, right: 0, top: 300, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={272.78} c={RED} size={28}>interrogatoire</Pill><Pill at={273.6} c={RED} size={28}>punition</Pill></div>
            </> : <>
              <div style={{position: 'absolute', left: 60, top: 60, width: 360, height: 360, borderRadius: 24, overflow: 'hidden', border: `4px solid ${VIO}`}}><Pic src={IMG.audit} ic="auditeur" w={360} h={360} /></div>
              <div style={{position: 'absolute', left: 460, top: 80, display: 'flex', flexDirection: 'column', gap: 16}}><Pill at={275.3} c={NAVY} size={28}>la rigueur des données</Pill><Pill at={278.46} c={TEAL} size={28}>un côté humain</Pill><Pill at={283.7} c={VIO} size={28}>diagnostic collaboratif</Pill><Pill at={286.02} c={GREEN} size={28}>la santé de l’organisation</Pill></div>
            </>}
          </Abs>
          <Abs x={60} y={950} w={960} h={420} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${VIO}`, opacity: pop(t, 294.0)}}>
            <div style={{position: 'absolute', left: 30, top: 24, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>erreurs</div>
            <div style={{position: 'absolute', left: 30, top: 80, display: 'flex', gap: 16, alignItems: 'center'}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: DIM, position: 'relative'}}>les cacher<div style={{position: 'absolute', left: -6, right: -6, top: 20}}><Strike p={prog(t, 298.0, 298.8)} c={RED} /></div></span><span style={{fontSize: 40, fontWeight: 900, color: VIO}}>→</span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: VIO, opacity: pop(t, 299.02)}}>les chercher activement</span></div>
            <div style={{position: 'absolute', left: 30, right: 30, top: 200, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>confiance</div>
            <div style={{position: 'absolute', left: 30, right: 30, top: 250, height: 60, borderRadius: 14, background: '#E3E8EF', border: `4px solid ${INK}`, overflow: 'hidden'}}><div style={{width: `${conf * 100}%`, height: '100%', background: `repeating-linear-gradient(45deg, #8892A6 0 18px, #A8B0C0 18px 36px)`}} /></div>
            <div style={{position: 'absolute', left: 30, right: 30, top: 330, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, opacity: pop(t, 304.5)}}>une confiance en béton armé</div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Une', 'communication', 'ultra', 'fluide']} mark={[1, 3]} at={308.2} y={330} size={50} />
          <Abs x={60} y={440} w={960} h={600}>
            {[{l: 'Direction', ic: 'directeur', x: 480, y: 80, a: 312.86}, {l: 'Manager QSE', ic: 'superviseur', x: 170, y: 440, a: 314.1}, {l: 'Équipes', ic: 'equipe', x: 790, y: 440, a: 314.9}].map((n) => <div key={n.l} style={{position: 'absolute', left: n.x - 110, top: n.y - 90, width: 220, textAlign: 'center', opacity: pop(t, n.a)}}><div style={{margin: '0 auto', width: 150, height: 150, borderRadius: 75, background: '#fff', border: `6px solid ${VIO}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={n.ic} size={100} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, marginTop: 6}}>{n.l}</div></div>)}
            <svg width={960} height={600} style={{position: 'absolute', left: 0, top: 0}}>{[[480, 80, 170, 440], [480, 80, 790, 440], [170, 440, 790, 440]].map(([a, b, c, d], k) => <g key={k} opacity={pop(t, 315.0)}><line x1={a} y1={b} x2={c} y2={d} stroke={VIO} strokeWidth={6} opacity={0.35} />{[0, 1, 2].map((j) => { const p = (t * 0.6 + j / 3 + k * 0.2) % 1; return <circle key={j} cx={lerp(a, c, p)} cy={lerp(b, d, p)} r={10} fill={GOLD} />; })}</g>)}</svg>
          </Abs>
          <Shot src={IMG.alignement} ic="equipe" x={60} y={1050} w={960} h={330} at={316.9} c={VIO}>
            <div style={{position: 'absolute', left: 24, bottom: 20, display: 'flex', gap: 12}}><Pill at={318.06} c={NAVY} size={24}>l’objectif final</Pill><Pill at={320.22} c={GREEN} size={24}>la méthode concrète</Pill></div>
          </Shot>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 6 · EXCELLENCE + QUESTION ═════════════ */
const Excellence: React.FC = () => {
  const t = useT();
  const ph = t < 349.7 ? 0 : 1;
  const climb = prog(t, 338.4, 348.5);
  const tilt = lerp(-10, 12, prog(t, 358.7, 361.5, easeInOut));
  return (
    <Out end={OUTRO_AT}>
      {ph === 0 && (
        <>
          <HiLine words={t < 338.4 ? ['Pas', 'une', 'ligne', 'd’arrivée'] : ['Marche', 'après', 'marche']} mark={t < 338.4 ? [2, 3] : [0, 2]} at={t < 338.4 ? 331.2 : 338.46} y={330} size={60} />
          <Abs x={60} y={440} w={960} h={930} style={{borderRadius: 30, overflow: 'hidden', border: `6px solid ${INK}`, background: `linear-gradient(180deg, #FFF6DA, #fff)`}}>
            <div style={{position: 'absolute', inset: 0, opacity: 0.25}}><Pic src={IMG.excellence} ic="trophee" w={948} h={918} /></div>
            {Array.from({length: 9}, (_, k) => <div key={k} style={{position: 'absolute', left: 40 + k * 100, top: 800 - k * 80, width: 110, height: 80 + k * 80, background: k <= climb * 8 ? GOLD : '#E3E8EF', border: `4px solid ${INK}`, opacity: pop(t, 331.7 + k * 0.1)}} />)}
            <div style={{position: 'absolute', left: 60 + climb * 8 * 100, top: 720 - climb * 8 * 80 - Math.abs(Math.sin(climb * 40)) * 14}}><F n="ouvrier" size={80} /></div>
            {t > 334.5 && t < 338.4 && <div style={{position: 'absolute', left: 520, top: 120, opacity: pop(t, 334.94)}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: DIM, position: 'relative'}}>🏁 « c’est bon, on a fini »<div style={{position: 'absolute', left: -6, right: -6, top: 22}}><Strike p={prog(t, 337.7, 338.3)} c={RED} /></div></span></div>}
            {t > 338.4 && <div style={{position: 'absolute', left: 40, top: 40}}><Pill at={338.46} c={GOLD} size={32}>une ascension perpétuelle</Pill></div>}
            {t > 346.6 && <div style={{position: 'absolute', left: 40, top: 110}}><Pill at={346.66} c={GREEN} size={28}>élever continuellement le niveau</Pill></div>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={['Contrainte', 'ou', 'moteur', '?']} mark={[0, 2]} at={355.3} y={330} size={66} />
          <Shot src={IMG.conclusion} ic="equipe" x={60} y={440} w={960} h={380} at={349.8} c={GOLD} blinds />
          <Abs x={60} y={850} w={960} h={520}>
            <div style={{position: 'absolute', left: 470, top: 100, width: 20, height: 330, background: INK, borderRadius: 10}} />
            <div style={{position: 'absolute', left: 380, top: 420, width: 200, height: 34, background: INK, borderRadius: 12}} />
            <div style={{position: 'absolute', left: 80, top: 100, width: 800, height: 0, transform: `rotate(${tilt}deg)`}}>
              <div style={{position: 'absolute', left: 0, top: -9, width: 800, height: 18, background: INK, borderRadius: 9}} />
              {[{l: 'liste de contraintes', s: 'subie', c: RED, x: -60, ic: 'chaine-cassee', a: 356.3}, {l: 'moteur de croissance', s: 'transformé', c: GOLD, x: 560, ic: 'fusee', a: 360.46}].map((p) => <div key={p.l} style={{position: 'absolute', left: p.x, top: 10, width: 300, transform: `rotate(${-tilt}deg)`, transformOrigin: '50% 0', opacity: pop(t, p.a)}}><div style={{margin: '0 auto', width: 4, height: 34, background: INK}} /><div style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: '0 0 60px 60px', height: 210, boxShadow: `6px 6px 0 ${p.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><F n={p.ic} size={86} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, textAlign: 'center'}}>{p.l}</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: p.c}}>{p.s}</div></div></div>)}
            </div>
          </Abs>
          {t > ALLDONE && t > 362.8 && <Dust n={22} c={GOLD} />}
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
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 0.8, s: 'validation', v: 0.18})),
  ...RULES.flatMap((r) => [{at: r.at - 1.2, s: 'soft-whoosh', v: 0.2, dur: 1.2}, {at: r.at, s: 'bass-hit', v: 0.35}, {at: r.at + 0.05, s: 'sfx/bell', v: 0.3}, {at: r.at + 0.35, s: 'soft-whoosh', v: 0.18, dur: 0.8}]),
  ...pops([15.66, 16.86, 22.5]), {at: 24.2, s: 'sfx/rise', v: 0.3, dur: 3}, {at: 25.1, s: 'sfx/ding', v: 0.25}, {at: 27.38, s: 'validation', v: 0.25},
  {at: 31.0, s: 'soft-whoosh', v: 0.3, dur: 1}, ...[38.18, 41.5, 44.18].map((a) => ({at: a, s: 'sfx/click', v: 0.4})), {at: 51.38, s: 'sfx/swish', v: 0.3}, {at: 52.42, s: 'tampon', v: 0.55},
  ...searchCues(55.6, 31, 57.4, 57.7), ...[58.74, 61.54, 62.98, 66.1, 68.14, 71.98].map((a) => ({at: a, s: 'sfx/pop', v: 0.18})),
  {at: 78.0, s: 'tension', v: 0.12, dur: 5}, ...pops([85.98, 88.42]), {at: 91.94, s: 'sfx/pop', v: 0.2}, {at: 93.3, s: 'sfx/whoosh', v: 0.3}, {at: 95.8, s: 'deep-hit', v: 0.45},
  {at: 99.38, s: 'sfx/pop', v: 0.2}, {at: 101.0, s: 'sfx/swish', v: 0.25}, {at: 106.38, s: 'sfx/ding', v: 0.2},
  {at: 113.3, s: 'sfx/whoosh', v: 0.2}, {at: 119.46, s: 'sfx/rise', v: 0.22, dur: 2}, {at: 121.74, s: 'alarme', v: 0.05, dur: 0.6}, {at: 123.62, s: 'sfx/thud', v: 0.25}, {at: 127.1, s: 'soft-whoosh', v: 0.3, dur: 1}, ...pops([131.62, 132.2, 133.5, 135.38]),
  {at: 138.0, s: 'sfx/whoosh', v: 0.22}, ...rep(140.4, 20, 0.5, 'tick', 0.06), {at: 151.1, s: 'sfx/rise', v: 0.3, dur: 4}, {at: 155.0, s: 'validation', v: 0.3},
  ...pops([167.8, 170.3]), {at: 172.34, s: 'tampon', v: 0.55}, {at: 178.42, s: 'soft-whoosh', v: 0.4, dur: 2.6}, {at: 181.0, s: 'sfx/ding', v: 0.25}, {at: 184.9, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 187.6, s: 'cadenas', v: 0.45}, ...pops([190.34, 192.0]),
  {at: 199.0, s: 'soft-whoosh', v: 0.3, dur: 1}, ...rep(203.0, 10, 0.1, 'sfx/thud', 0.12), ...pops([206.34, 207.78, 209.14]), {at: 220.6, s: 'sfx/swish', v: 0.3}, {at: 221.6, s: 'deep-hit', v: 0.35},
  ...rep(222.4, 14, 0.865, 'tick', 0.14), {at: 236.58, s: 'alarme', v: 0.05, dur: 1.5}, {at: 229.7, s: 'soft-whoosh', v: 0.3, dur: 1}, ...pops([230.66, 231.82, 234.06]),
  {at: 243.0, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 254.82, s: 'tampon', v: 0.5}, {at: 259.38, s: 'sfx/whoosh', v: 0.25}, ...[0, 1, 2, 3].map((k) => ({at: 260.4 + k * 0.4, s: 'sfx/click', v: 0.35})), {at: 262.06, s: 'tampon', v: 0.45},
  {at: 270.0, s: 'tension', v: 0.1, dur: 4}, ...pops([272.78, 273.6]), {at: 274.4, s: 'soft-whoosh', v: 0.4, dur: 2}, ...pops([275.3, 278.46, 283.7, 286.02]), {at: 298.0, s: 'sfx/swish', v: 0.25}, {at: 299.02, s: 'sfx/ding', v: 0.22}, {at: 301.9, s: 'sfx/rise', v: 0.22, dur: 3},
  ...pops([312.86, 314.1, 314.9]), {at: 315.0, s: 'soft-whoosh', v: 0.25, dur: 8}, {at: 316.9, s: 'soft-whoosh', v: 0.3, dur: 1}, ...pops([318.06, 320.22]),
  ...rep(331.7, 9, 0.1, 'sfx/thud', 0.14), {at: 337.7, s: 'sfx/swish', v: 0.25}, ...rep(338.4, 9, 1.1, 'sfx/pop', 0.12), {at: 346.66, s: 'validation', v: 0.25},
  {at: 349.8, s: 'soft-whoosh', v: 0.35, dur: 1}, {at: 356.3, s: 'sfx/thud', v: 0.3}, {at: 358.7, s: 'sfx/rise', v: 0.25, dur: 2.5}, {at: 361.5, s: 'bass-hit', v: 0.4}, {at: 365.9, s: 'validation', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const ReglesOr: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={73.25}><Intro /></Gate>
    <Gate from={73.6} to={108.75}><Defis /></Gate>
    <Gate from={109.1} to={159.55}><Planif /></Gate>
    <Gate from={159.9} to={193.75}><Appro /></Gate>
    <Gate from={194.1} to={265.65}><Dyn /></Gate>
    <Gate from={266.0} to={325.35}><Audits /></Gate>
    <Gate from={325.7} to={OUTRO_AT}><Excellence /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}><Gyro i={i} /></Gate>)}
    <Gate from={100} to={312}><GoldRule /></Gate>
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={367.2}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-regles-or-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Kin, Brut, T, TitleBlock, Win, GLASS, Check, Tile, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, spring, LoupeSweep, PneuDeliver, Shine, Count, BURG];
