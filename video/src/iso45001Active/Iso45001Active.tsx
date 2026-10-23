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
 * « Comment l'ISO 45001 transforme la sécurité » (55 s) — capsule « condensé + effet wahou + ultra premium » présentée
 * en métro : 7 stations (participer → source → consulter → droit de retrait → bouclier → automatismes → écoute).
 * Voix d'origine (sans musique de fond), sous-titres calés mot à mot. Couverture en lettres-photos « ISO 45001 ».
 * Fil rouge : tube pneumatique à six guichets calés sur les vraies parties (participation → danger → consultation →
 * droit de retrait → urgence → arrêt légitime) ; gyrophare éclair à chaque partie, capsule pneumatique plein écran pour
 * le chapitre 5.4, barre de recherche qui trouve et ouvre le chapitre, loupe sur la source du danger, store vénitien final.
 */
const IMG = {
  cISO: 'sysqsse-gen/sante.jpg',
  cNum: 'metroiso-gen/sst.jpg',
  participation: 'sysqsse-gen/sante.jpg',
  imposees: 'alerte-gen/direction.jpg',
  chimique: 'alerte-gen/ventilation.jpg',
  consultation: 'influence-gen/ecoute.jpg',
  peur: 'alerte-gen/peur.jpg',
  bouclier: 'metroiso-gen/sst.jpg',
  urgence: 'heures-gen/equipe-chantier.jpg',
  machine: 'ishikawa-gen/piece-mouvement.jpg',
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
const OUTRO_AT = 56.0;
export const ISO45001A_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 5.38, n: '1', title: 'La démarche participative', s: 'le secret', c: GREEN, g: 'participation', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 13.94, n: '2', title: 'Le danger à la source', s: 'procédé instable', c: RED, g: 'danger', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 23.34, n: '3', title: 'La consultation directe', s: 'sans peur', c: BLUE, g: 'consultation', k: 'gyro', lab: 'PARTIE 3 / 6'},
  {at: 34.42, n: '4', title: 'Chapitre 5.4', s: 'droit de retrait', c: VIO, g: 'droit de retrait', k: 'tube', lab: 'PARTIE 4 / 6'},
  {at: 43.74, n: '5', title: 'Les réponses d’urgence', s: 'des automatismes', c: ORANGE, g: 'urgence', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 51.14, n: '6', title: 'L’arrêt légitime', s: 'le terrain écouté', c: TEAL, g: 'arrêt', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 54.3;
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

/* ═════════════ La ligne de métro (7 stations) ═════════════ */
const STATIONS = [
  {n: 1, l: 'Tous les travailleurs participent', s: 'participer', at: 6.06},
  {n: 2, l: 'Analyser le danger à la source', s: 'source', at: 21.46},
  {n: 3, l: 'La consultation directe', s: 'consulter', at: 24.82},
  {n: 4, l: 'Un droit de retrait explicite', s: 'retrait', at: 37.22},
  {n: 5, l: 'L’alerte devient un bouclier légal', s: 'bouclier', at: 41.26},
  {n: 6, l: 'Planifiées, testées : des automatismes', s: 'automatismes', at: 49.58},
  {n: 7, l: 'Un système qui écoute son terrain', s: 'écoute', at: 53.3},
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
  const r = STATIONS.find((x) => t >= x.at - 0.1 && t < x.at + 2.3);
  if (!r) return null;
  const q = prog(t, r.at - 0.1, r.at + 0.3, easeOut);
  const out = prog(t, r.at + 1.9, r.at + 2.3, easeIn);
  return (
    <Abs x={40} y={1230} w={1000} h={150} style={{zIndex: 32, opacity: 1 - out, transform: `translateY(${(1 - q) * 110}px) scale(${0.8 + 0.2 * q})`}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: 30, background: `linear-gradient(110deg, #0B2147, ${NIGHT})`, border: `5px solid ${BLUE}`, boxShadow: `0 0 40px ${BLUE}AA`, display: 'flex', alignItems: 'center', gap: 22, padding: '0 26px', overflow: 'hidden'}}>
        <div style={{width: 100, height: 100, borderRadius: 50, background: `radial-gradient(circle at 35% 30%, #DDEBFF, ${BLUE} 60%, #0B2147)`, border: '5px solid #fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: `rotateY(${(1 - q) * 360}deg)`}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 12, color: '#fff'}}>STATION</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: '#fff', lineHeight: 0.9}}>{r.n}</div></div>
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE ISO 45001 · STATION {r.n} / 7</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
        <div style={{position: 'absolute', top: 0, bottom: 0, width: 120, left: lerp(-160, 1100, prog(t, r.at + 0.2, r.at + 1.1)), background: 'linear-gradient(90deg, transparent, rgba(200,225,255,0.5), transparent)', transform: 'skewX(-20deg)'}} />
      </div>
    </Abs>
  );
};

/** Gyrophare éclair (1,5 s) : faisceaux tournants + bandeau damier qui traverse avec le titre de la partie. */
const GyroFlash: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const S0 = SECT[i];
  const k = t - S0.at;
  if (k < 0 || k > 1.6) return null;
  const inn = prog(t, S0.at, S0.at + 0.15) * (1 - prog(t, S0.at + 1.25, S0.at + 1.6, easeIn));
  const band = prog(t, S0.at + 0.05, S0.at + 0.5, easeOut);
  const leave = prog(t, S0.at + 1.1, S0.at + 1.5, easeIn);
  return (
    <AbsoluteFill style={{zIndex: 36, pointerEvents: 'none', overflow: 'hidden'}}>
      <AbsoluteFill style={{background: `conic-gradient(from ${k * 720}deg at 540px 330px, rgba(31,111,209,0.45) 0deg, transparent 28deg, transparent 180deg, rgba(224,74,63,0.45) 180deg, transparent 208deg)`, opacity: inn}} />
      <div style={{position: 'absolute', left: 480, top: 290, width: 120, height: 80, borderRadius: '60px 60px 10px 10px', background: `radial-gradient(circle at 50% 40%, #fff, ${Math.floor(k * 6) % 2 ? RED : BLUE} 60%)`, border: `5px solid ${INK}`, boxShadow: `0 0 60px ${Math.floor(k * 6) % 2 ? RED : BLUE}`, opacity: inn}} />
      <div style={{position: 'absolute', left: -200, top: 820, width: 1480, height: 220, transform: `translateX(${lerp(-1500, 0, band) + lerp(0, 1500, leave)}px) rotate(-6deg)`, background: `repeating-conic-gradient(${NAVY} 0 25%, ${YEL} 0 50%) 0 0 / 110px 110px`, border: `7px solid ${INK}`, boxShadow: '0 20px 40px rgba(0,0,0,0.3)'}}>
        <div style={{position: 'absolute', left: 300, right: 300, top: 22, bottom: 22, background: '#fff', border: `6px solid ${INK}`, borderRadius: 20, display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px'}}>
          <div style={{width: 110, height: 110, borderRadius: 55, background: S0.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{S0.n}</div>
          <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM, letterSpacing: 3}}>{S0.lab}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: S0.title.length > 18 ? 40 : 50, color: INK, lineHeight: 1.05}}>{S0.title}</div></div>
        </div>
      </div>
    </AbsoluteFill>
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

/* ═════════════ Couverture : « ISO 45001 » en lettres-photos ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: `radial-gradient(circle at 50% 45%, #FFFFFF, #F1EFEA 70%)`, opacity: 1 - out}}>
      <Watermark />
      <Abs x={0} y={110} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Img src={staticFile(LOGO)} style={{height: 150, display: 'block'}} /></Abs>
      <Abs x={0} y={330} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetter ch="ISO" src={IMG.cISO} size={330} pos="50% 35%" ls={0} /></Abs>
      <Abs x={0} y={640} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetter ch="45001" src={IMG.cNum} size={250} pos="50% 30%" ls={-2} /></Abs>
      <Abs x={0} y={905} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 74, color: NAVY, letterSpacing: -1, lineHeight: 1.05}}>LA SÉCURITÉ<br />VRAIMENT ACTIVE</Abs>
      <Abs x={0} y={1110} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 40}}>{['PARTICIPER', 'ALERTER', 'STOPPER'].map((l) => <div key={l} style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: NAVY}}>{l}</div>)}</Abs>
      <Abs x={0} y={1230} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 3, color: '#fff', background: RED, padding: '10px 26px', borderRadius: 8}}>CHAPITRE 5.4 · DROIT DE RETRAIT</div></Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO : passive → active ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const on = prog(t, 3.7, 4.2, easeInOut);
  return (
    <Out end={5.38}>
      <HiLine words={['Une', 'sécurité', 'vraiment', 'active', '?']} mark={[1, 3]} at={2.8} y={330} size={52} />
      <Abs x={60} y={440} w={960} h={330} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, opacity: pop(t, 2.7)}}><PhotoLetter ch="ISO" src={IMG.cISO} size={200} ls={0} /><PhotoLetter ch="45001" src={IMG.cNum} size={150} ls={-2} /></Abs>
      <Abs x={160} y={830} w={760} h={300} style={{borderRadius: 150, background: on > 0.5 ? GREEN : '#C9D2DF', border: `8px solid ${INK}`, boxShadow: `0 0 ${60 * on}px ${GREEN}`, opacity: pop(t, 3.0)}}>
        <div style={{position: 'absolute', left: lerp(20, 460, on), top: 20, width: 260, height: 260, borderRadius: 130, background: '#fff', border: `8px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={on > 0.5 ? 'eclair' : 'escargot'} size={130} /></div>
        <div style={{position: 'absolute', left: on > 0.5 ? 60 : 330, top: 110, fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: on > 0.5 ? '#fff' : INK}}>{on > 0.5 ? 'ACTIVE' : 'passive'}</div>
      </Abs>
    </Out>
  );
};

/* ═════════════ 1 · DÉMARCHE PARTICIPATIVE ═════════════ */
const Participation: React.FC = () => {
  const t = useT();
  const ph = t < 8.3 ? 0 : 1;
  const link = prog(t, 6.1, 7.6, easeOut);
  const AV = ['ouvrier', 'salariee', 'intervenant', 'formatrice', 'ouvrier-dark', 'superviseur'];
  return (
    <Out end={13.94}>
      <HiLine words={ph === 0 ? ['Démarche', 'participative'] : ['Avant', ':', 'règles', 'imposées']} mark={ph === 0 ? [0, 1] : [2, 3]} at={ph === 0 ? 6.06 : 8.3} y={330} size={64} />
      {ph === 0 ? (
        <Abs x={60} y={440} w={960} h={930} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${GREEN}`, overflow: 'hidden', opacity: pop(t, 5.6)}}>
          <svg width={948} height={918} style={{position: 'absolute', left: 0, top: 0}}>{AV.map((_, k) => { const a = (k / 6) * Math.PI * 2 - Math.PI / 2; return <line key={k} x1={474} y1={450} x2={474 + Math.cos(a) * 330 * link} y2={450 + Math.sin(a) * 330 * link} stroke={GREEN} strokeWidth={8} strokeDasharray="14 10" strokeDashoffset={-t * 60} />; })}</svg>
          {AV.map((ic, k) => { const a = (k / 6) * Math.PI * 2 - Math.PI / 2; return <div key={k} style={{position: 'absolute', left: 474 + Math.cos(a) * 330 - 70, top: 450 + Math.sin(a) * 330 - 70, width: 140, height: 140, borderRadius: 70, background: '#fff', border: `6px solid ${GREEN}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${t > 5.7 + k * 0.1 ? spring(t, 5.7 + k * 0.1) : 0})`}}><F n={ic} size={90} /></div>; })}
          <div style={{position: 'absolute', left: 354, top: 330, width: 240, height: 240, borderRadius: 120, background: `radial-gradient(circle at 35% 30%, #D8F5E5, ${GREEN})`, border: `6px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + 0.05 * Math.sin(t * 5)})`}}><F n="casque" size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>SST</div></div>
        </Abs>
      ) : (
        <>
          <Shot src={IMG.imposees} ic="directeur" x={60} y={440} w={960} h={400} at={8.4} c={RED} />
          <Abs x={60} y={870} w={960} h={500} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 9.0)}}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 20, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM}}>d’en haut ↓</div>
            {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{position: 'absolute', left: 90 + k * 170, top: lerp(-100, 150, prog(t, 9.9 + k * 0.12, 10.5 + k * 0.12, easeIn)), width: 120, height: 70, borderRadius: 12, background: RED, border: `4px solid ${INK}`, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>RÈGLE</div>)}
            {[0, 1, 2, 3, 4].map((k) => <div key={`w${k}`} style={{position: 'absolute', left: 100 + k * 170, top: 300}}><F n="ouvrier" size={100} /></div>)}
            {t > 11.46 && <Stamp at={11.46} c={RED} text="sans consulter le terrain" x={170} y={240} rot={-6} size={42} />}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 2 · LE DANGER À LA SOURCE ═════════════ */
const Danger: React.FC = () => {
  const t = useT();
  const level = lerp(0.45, 1.02, prog(t, 15.5, 18.6, easeIn));
  const over = t > 17.58;
  const shake = over && t < 19.8 ? Math.sin(t * 50) * 5 : 0;
  return (
    <Out end={23.34}>
      <HiLine words={t < 19.7 ? ['Procédé', 'instable'] : ['Analyser', 'à', 'la', 'source']} mark={t < 19.7 ? [0, 1] : [0, 3]} at={t < 19.7 ? 15.54 : 19.82} y={330} size={66} />
      <Shot src={IMG.chimique} ic="eprouvette" x={60} y={440} w={960} h={360} at={14.3} c={RED} />
      <Abs x={60} y={830} w={960} h={540} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 14.8)}}>
        <div style={{position: 'absolute', left: 120, top: 70, width: 300, height: 400, transform: `translateX(${shake}px)`}}>
          <div style={{position: 'absolute', left: 0, bottom: 0, width: 300, height: 380, borderRadius: '30px 30px 40px 40px', border: '8px solid #DDE7F1', overflow: 'hidden', background: '#1E2638'}}>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: `${Math.min(1, level) * 100}%`, background: `linear-gradient(180deg, ${over ? '#FF6B5B' : '#7CE0A8'}, ${over ? RED : GREEN})`}}><div style={{position: 'absolute', left: 0, right: 0, top: -14, height: 28, borderRadius: '50%', background: over ? '#FF8A7A' : '#9BEFC0', transform: `translateY(${Math.sin(t * 8) * 6}px)`}} /></div>
          </div>
          {over && [0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 30 + k * 100, top: -10 + ((t * 120 + k * 40) % 120), width: 24, height: 34, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: RED, opacity: 0.8}} />)}
        </div>
        <div style={{position: 'absolute', left: 520, top: 70, width: 340, height: 340, borderRadius: 170, background: '#fff', border: `8px solid ${INK}`}}>
          <div style={{position: 'absolute', inset: 20, borderRadius: '50%', background: `conic-gradient(from 225deg, ${GREEN} 0deg 90deg, ${ORANGE} 90deg 180deg, ${RED} 180deg 270deg, transparent 270deg)`}} />
          <div style={{position: 'absolute', inset: 70, borderRadius: '50%', background: '#fff'}} />
          <div style={{position: 'absolute', left: 164, top: 50, width: 12, height: 130, background: INK, borderRadius: 6, transformOrigin: '50% 100%', transform: `rotate(${lerp(-110, 120, prog(t, 15.5, 18.6, easeIn)) + (over ? Math.sin(t * 40) * 6 : 0)}deg)`}} />
          <div style={{position: 'absolute', left: 150, top: 150, width: 40, height: 40, borderRadius: 20, background: INK}} />
        </div>
        {over && <div style={{position: 'absolute', left: 520, top: 440, display: 'flex', alignItems: 'center', gap: 10, background: RED, borderRadius: 14, padding: '6px 18px', opacity: Math.sin(t * 10) > 0 ? 1 : 0.5}}><span style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: '#fff'}}>⚠ DÉBORDEMENT</span></div>}
        {t > 19.82 && <div style={{position: 'absolute', left: 200, top: 340, width: 140, height: 140, borderRadius: 70, border: `8px solid ${YEL}`, boxShadow: `0 0 30px ${YEL}`, transform: `scale(${spring(t, 19.82)})`}} />}
        <LoupeSweep x0={700} y0={60} x1={170} y1={280} a={19.9} b={21.4} size={240} />
        {t > 21.46 && <div style={{position: 'absolute', left: 30, top: 30}}><Pill at={21.46} c={YEL} size={30}>à la source même</Pill></div>}
      </Abs>
    </Out>
  );
};

/* ═════════════ 3 · CONSULTATION & PEUR DES SANCTIONS ═════════════ */
const Consultation: React.FC = () => {
  const t = useT();
  const ph = t < 28.0 ? 0 : 1;
  const tremble = t > 31.9 ? Math.sin(t * 45) * 6 : 0;
  return (
    <Out end={34.42}>
      <HiLine words={ph === 0 ? ['Consultation', 'directe'] : ['La', 'peur', 'des', 'sanctions']} mark={ph === 0 ? [0, 1] : [1, 3]} at={ph === 0 ? 24.82 : 31.98} y={330} size={64} />
      {ph === 0 ? (
        <>
          <Shot src={IMG.consultation} ic="equipe" x={60} y={440} w={960} h={460} at={23.6} c={BLUE} />
          <Abs x={60} y={930} w={960} h={440} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${BLUE}`, opacity: pop(t, 24.0)}}>
            <div style={{position: 'absolute', left: 40, top: 120}}><F n="directeur" size={160} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, textAlign: 'center'}}>direction</div></div>
            <div style={{position: 'absolute', right: 40, top: 120}}><F n="ouvrier" size={160} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, textAlign: 'center'}}>opérateur</div></div>
            <svg width={948} height={428} style={{position: 'absolute', left: 0, top: 0}}><path d="M 250 200 C 380 120, 560 120, 690 200" fill="none" stroke={BLUE} strokeWidth={8} strokeDasharray="16 12" strokeDashoffset={-t * 80} opacity={pop(t, 24.82)} /><path d="M 690 260 C 560 340, 380 340, 250 260" fill="none" stroke={GREEN} strokeWidth={8} strokeDasharray="16 12" strokeDashoffset={-t * 80} opacity={pop(t, 26.06)} /></svg>
            <div style={{position: 'absolute', left: 0, right: 0, top: 30, textAlign: 'center'}}><Pill at={24.82} c={BLUE} size={28}>organisée formellement</Pill></div>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 30, textAlign: 'center'}}><Pill at={26.06} c={GREEN} size={28}>consultation directe</Pill></div>
          </Abs>
        </>
      ) : (
        <>
          <Shot src={IMG.peur} ic="anxieux" x={60} y={440} w={960} h={420} at={28.2} c={RED} />
          <Abs x={60} y={890} w={960} h={480} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 28.3)}}>
            <div style={{position: 'absolute', left: 30, top: 30, width: 400, height: 150, borderRadius: 20, background: '#F4F6FA', border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', gap: 12, padding: '0 18px'}}><F n="bulle" size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>avis technique</span><div style={{position: 'absolute', left: 14, right: 14, top: '50%'}}><Strike p={prog(t, 30.5, 31.0)} c={RED} /></div></div>
            {t > 30.5 && <div style={{position: 'absolute', left: 60, top: 200}}><Pill at={30.5} c={RED} size={30}>inutile…</Pill></div>}
            <div style={{position: 'absolute', left: 560, top: 60, width: 300, height: 300, borderRadius: 150, background: `radial-gradient(circle at 35% 30%, #FF9A8F, ${RED})`, border: `10px solid ${INK}`, boxShadow: `0 14px 0 #7A1C14`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: '#fff', transform: `translateX(${tremble}px)`, opacity: pop(t, 29.3)}}>STOP</div>
            <div style={{position: 'absolute', left: 620 + Math.sin(t * 3) * 20, top: 300 + Math.sin(t * 6) * 10, opacity: pop(t, 31.98)}}><F n="main-levee" size={110} /></div>
            {t > 32.98 && [{ic: 'juge', x: 60}, {ic: 'sens-interdit', x: 220}, {ic: 'danger', x: 380}].map((x, k) => <div key={x.ic} style={{position: 'absolute', left: x.x, top: 300, transform: `scale(${spring(t, 32.98 + k * 0.12)})`}}><F n={x.ic} size={110} /></div>)}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 4 · CHAPITRE 5.4 : DROIT DE RETRAIT ═════════════ */
const Retrait: React.FC = () => {
  const t = useT();
  const shield = prog(t, 41.26, 42.2, easeOut);
  return (
    <Out end={43.74}>
      <HiLine words={t < 41.1 ? ['Droit', 'de', 'retrait'] : ['Un', 'bouclier', 'légal']} mark={t < 41.1 ? [0, 2] : [1, 2]} at={t < 41.1 ? 38.0 : 41.26} y={330} size={70} />
      <SearchOpen x={60} y={440} w={960} h={930} at={37.95} query="ISO 45001 chapitre 5.4" results={['4.1 Contexte de l’organisme', '5.4 Consultation et participation des travailleurs', '8.2 Situations d’urgence']} found={1} foundAt={39.35} clickAt={39.65} c={VIO}>
        <div style={{position: 'absolute', inset: 0}}>
          <div style={{position: 'absolute', left: 40, top: 30, width: 220, height: 220, borderRadius: 30, background: VIO, border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#E6DEFF'}}>CHAPITRE</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 96, color: '#fff', lineHeight: 1}}>5.4</div></div>
          <div style={{position: 'absolute', left: 300, top: 60, right: 30}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>il intègre</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: INK, lineHeight: 1.05}}>un droit de retrait explicite</div></div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 300, height: 560}}>
            <div style={{position: 'absolute', left: 330, top: 120}}><F n="ouvrier" size={240} /></div>
            <div style={{position: 'absolute', left: 120, top: 150, opacity: 1 - shield, transform: `scale(${1 + 0.1 * Math.sin(t * 10)})`}}><F n="sirene" size={140} /></div>
            <div style={{position: 'absolute', left: 260, top: lerp(160, 20, shield), width: 380, height: 420 * shield, borderRadius: '190px 190px 40px 40px', border: `8px solid ${VIO}`, background: `${VIO}1F`, boxShadow: `0 0 ${50 * shield}px ${VIO}`, opacity: shield}} />
            <div style={{position: 'absolute', left: 390, top: -20, transform: `scale(${t > 41.26 ? spring(t, 41.26) : 0})`}}><F n="bouclier" size={130} /></div>
            <div style={{position: 'absolute', left: 600, top: 200, display: 'flex', flexDirection: 'column', gap: 14}}><Pill at={40.1} c={RED} size={24}>l’alerte</Pill><div style={{fontSize: 40, fontWeight: 900, color: INK, opacity: pop(t, 41.26), textAlign: 'center'}}>↓</div><Pill at={41.4} c={VIO} size={24}>bouclier légal interne</Pill></div>
          </div>
        </div>
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ 5 · LES RÉPONSES D'URGENCE ═════════════ */
const Urgence: React.FC = () => {
  const t = useT();
  const pulse = prog(t, 44.1, 49.6);
  const STEPS = [{l: 'alerte validée', ic: 'check', a: 43.9, c: GREEN}, {l: 'réponses d’urgence', ic: 'sirene', a: 46.74, c: RED}, {l: 'planifiées', ic: 'calendrier', a: 47.34, c: BLUE}, {l: 'testées en équipe', ic: 'equipe', a: 48.5, c: ORANGE}];
  return (
    <Out end={51.14}>
      <HiLine words={t < 49.5 ? ['Réponses', 'd’urgence'] : ['Des', 'automatismes']} mark={t < 49.5 ? [0, 1] : [1]} at={t < 49.5 ? 45.78 : 49.58} y={330} size={68} />
      <Shot src={IMG.urgence} ic="equipe" x={60} y={440} w={960} h={300} at={44.0} c={ORANGE} />
      <Abs x={60} y={770} w={960} h={600} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 44.0)}}>
        <svg width={948} height={588} style={{position: 'absolute', left: 0, top: 0}}><path d="M 130 90 L 820 90 L 820 230 L 130 230 L 130 380 L 820 380" fill="none" stroke="#2C3650" strokeWidth={12} /><path d="M 130 90 L 820 90 L 820 230 L 130 230 L 130 380 L 820 380" fill="none" stroke={YEL} strokeWidth={12} strokeDasharray={2300} strokeDashoffset={2300 * (1 - pulse)} style={{filter: `drop-shadow(0 0 10px ${YEL})`}} /></svg>
        {STEPS.map((x, k) => { const pos = [[60, 30], [600, 30], [60, 170], [600, 170]][k]; return <div key={x.l} style={{position: 'absolute', left: pos[0], top: pos[1], width: 290, height: 120, borderRadius: 20, background: '#fff', border: `5px solid ${x.c}`, boxShadow: t > x.a ? `0 0 24px ${x.c}` : 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', opacity: pop(t, x.a)}}><F n={x.ic} size={64} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, lineHeight: 1.05}}>{x.l}</span></div>; })}
        <div style={{position: 'absolute', left: 260, top: 315, width: 430, height: 130, borderRadius: 65, background: `linear-gradient(90deg, ${YEL}, ${ORANGE})`, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, transform: `scale(${t > 49.58 ? spring(t, 49.58) : 0})`}}><F n="engrenage" size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK}}>automatismes</span></div>
      </Abs>
    </Out>
  );
};

/* ═════════════ 6 · L'ARRÊT LÉGITIME ═════════════ */
const Arret: React.FC = () => {
  const t = useT();
  const press = t > 51.6 && t < 51.9 ? 1 : 0;
  const spin = (t < 51.6 ? t * 300 : 51.6 * 300 + 300 * (1 - Math.exp(-(t - 51.6) * 2)) / 2);
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={['Arrêt', 'légitime']} mark={[0, 1]} at={52.18} y={330} size={72} />
      <Shot src={IMG.machine} ic="engrenage" x={60} y={440} w={960} h={400} at={51.3} c={TEAL} blinds />
      <Abs x={60} y={870} w={960} h={500} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${TEAL}`, overflow: 'hidden', opacity: pop(t, 51.4)}}>
        <div style={{position: 'absolute', left: 60, top: 80, transform: `rotate(${spin}deg)`}}><F n="engrenage" size={200} /></div>
        <div style={{position: 'absolute', left: 230, top: 210, transform: `rotate(${-spin * 1.4}deg)`}}><F n="engrenage" size={140} /></div>
        <div style={{position: 'absolute', left: 560, top: 70}}>
          <div style={{width: 300, height: 90, borderRadius: 16, background: YEL, border: `6px solid ${INK}`, position: 'absolute', top: 210}} />
          <div style={{position: 'absolute', left: 40, top: 80 + press * 30, width: 220, height: 160, borderRadius: '110px 110px 30px 30px', background: `radial-gradient(circle at 40% 30%, #FF9A8F, ${RED})`, border: `8px solid ${INK}`}} />
        </div>
        {t > 51.9 && <div style={{position: 'absolute', left: 560, top: 30}}><Pill at={51.9} c={RED} size={26}>machine arrêtée</Pill></div>}
        {t > 53.3 && <div style={{position: 'absolute', left: 0, right: 0, bottom: 30, display: 'flex', justifyContent: 'center'}}><div style={{display: 'flex', alignItems: 'center', gap: 12, background: TEAL, borderRadius: 40, padding: '10px 26px', transform: `scale(${spring(t, 53.3)})`}}><F n="yeux" size={56} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>un système qui écoute son terrain</span></div></div>}
      </Abs>
      {t > 54.2 && <Dust n={22} c={GOLD} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flash = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.05, 4, 0.15, 'sfx/ding', 0.1), {at: x.at + 0.5, s: 'sfx/thud', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const pops = (L: number[], v = 0.2): Sfx[] => L.map((a) => ({at: a, s: 'sfx/pop', v}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.6}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 1.5},
  ...SECT.filter((x) => x.k === 'gyro').flatMap(flash), {at: SECT[3].at, s: 'soft-whoosh', v: 0.5, dur: 1.2}, {at: SECT[3].at + 0.78, s: 'sfx/thud', v: 0.45}, {at: SECT[3].at + 1.0, s: 'page', v: 0.4},
  {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.flatMap((r) => [{at: r.at, s: 'bass-hit', v: 0.3}, {at: r.at + 0.05, s: 'sfx/bell', v: 0.25}]),
  {at: 3.7, s: 'sfx/click', v: 0.5}, {at: 3.9, s: 'sfx/rise', v: 0.25, dur: 1},
  ...rep(5.7, 6, 0.1, 'sfx/pop', 0.16), {at: 6.1, s: 'soft-whoosh', v: 0.25, dur: 1.5},
  {at: 8.4, s: 'soft-whoosh', v: 0.3, dur: 1}, ...[9.9, 10.02, 10.14, 10.26, 10.38].map((a) => ({at: a + 0.6, s: 'sfx/thud', v: 0.22})), {at: 11.46, s: 'tampon', v: 0.55},
  {at: 14.3, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 15.5, s: 'tension', v: 0.12, dur: 3}, {at: 17.58, s: 'alarme', v: 0.07, dur: 2}, {at: 19.82, s: 'deep-hit', v: 0.35}, {at: 19.9, s: 'soft-whoosh', v: 0.25, dur: 1.5}, {at: 21.46, s: 'sfx/ding', v: 0.25},
  {at: 23.6, s: 'soft-whoosh', v: 0.3, dur: 1}, ...pops([24.82, 26.06]),
  {at: 28.2, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 30.5, s: 'sfx/swish', v: 0.3}, {at: 29.3, s: 'sfx/pop', v: 0.2}, {at: 31.98, s: 'tension', v: 0.12, dur: 2.4}, ...[32.98, 33.1, 33.22].map((a) => ({at: a, s: 'deep-hit', v: 0.25})),
  ...searchCues(37.95, 22, 39.35, 39.65), {at: 40.1, s: 'alarme', v: 0.05, dur: 1}, {at: 41.26, s: 'bass-hit', v: 0.4}, {at: 41.3, s: 'sfx/rise', v: 0.22, dur: 1},
  {at: 44.0, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 44.1, s: 'sfx/rise', v: 0.16, dur: 5.4}, ...[43.9, 46.74, 47.34, 48.5].map((a) => ({at: a, s: 'sfx/click', v: 0.4})), {at: 49.58, s: 'validation', v: 0.35},
  {at: 51.3, s: 'soft-whoosh', v: 0.35, dur: 1}, ...rep(51.35, 10, 0.05, 'sfx/click', 0.12), {at: 51.6, s: 'deep-hit', v: 0.5}, {at: 51.62, s: 'alarme', v: 0.05, dur: 0.5}, {at: 53.3, s: 'validation', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Iso45001Active: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={5.4}><Intro /></Gate>
    <Gate from={5.4} to={13.95}><Participation /></Gate>
    <Gate from={13.95} to={23.35}><Danger /></Gate>
    <Gate from={23.35} to={34.45}><Consultation /></Gate>
    <Gate from={37.7} to={43.75}><Retrait /></Gate>
    <Gate from={43.75} to={51.15}><Urgence /></Gate>
    <Gate from={51.15} to={OUTRO_AT}><Arret /></Gate>
    {SECT.map((x, i) => (x.k === 'gyro' ? <Gate key={x.n} from={x.at} to={x.at + 1.7}><GyroFlash i={i} /></Gate> : <Gate key={x.n} from={x.at} to={x.at + 3.7}><Pneumatique i={i} /></Gate>))}
    <Gate from={5} to={OUTRO_AT}><StationBanner /></Gate>
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={55.9}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-iso45001-active-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Gyro, Loupe, Store, Kin, Brut, T, TitleBlock, Win, GLASS, Check, Tile, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, spring, LoupeSweep, PneuDeliver, Shine, Count, BURG, YEL, handFont, Board, random, Strike, TEAL];
