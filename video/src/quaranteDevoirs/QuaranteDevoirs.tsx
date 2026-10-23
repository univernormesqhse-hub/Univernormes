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
 * « 40 devoirs du responsable HSE » (5 min 31) — capsule « condensé + effet wahou + ultra premium » présentée en métro :
 * 8 stations (inspection → permis → SSHP → bouton rouge → toolbox → jour 1-2-3 → sous-traitants → 360°).
 * Voix d'origine (sans musique de fond), sous-titres calés mot à mot. Couverture : photo + titre « 40 DEVOIRS » en
 * lettres-photos animées (la photo glisse à l'intérieur des glyphes). Fil rouge : tube pneumatique à six guichets calés
 * sur les 5 piliers annoncés + le bâtiment (prévention → urgences → formation → conformité → stratégie → bâtiment) ;
 * gyrophare (transition principale), loupe et capsule pneumatique plein écran, store vénitien dans les scènes.
 */
const IMG = {
  cover: 'maturite-gen/proactif.jpg',
  c40: 'heures-gen/secteurs.jpg',
  cDev: 'metroiso-gen/sst.jpg',
  inspection: 'metroiso-gen/terrain.jpg',
  permis: 'ishikawa-gen/signatures.jpg',
  sshp: 'sysqsse-gen/conception.jpg',
  intervention: 'ishikawa-gen/panique.jpg',
  crise: 'ishikawa-gen/immediat.jpg',
  toolbox: 'sysqsse-gen/sante.jpg',
  dialogue: 'influence-gen/ecoute.jpg',
  rapport: 'heures-gen/rapport.jpg',
  vision: 'heures-gen/secteurs.jpg',
  batiment: 'sysqsse-gen/architecte.jpg',
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
const OUTRO_AT = 331.2;
export const DEVOIRS_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 41.38, n: '1', title: 'Prévention & évaluation', s: 'la vigilance proactive', c: BLUE, g: 'prévention', k: 'gyro', lab: 'PILIER 1 / 5'},
  {at: 109.42, n: '2', title: 'Action & urgences', s: 'le premier intervenant', c: RED, g: 'urgences', k: 'gyro', lab: 'PILIER 2 / 5'},
  {at: 170.5, n: '3', title: 'Formation & culture', s: 'un muscle quotidien', c: GREEN, g: 'formation', k: 'loupe', lab: 'PILIER 3 / 5'},
  {at: 222.18, n: '4', title: 'Conformité & rapports', s: 'le pont terrain ↔ loi', c: VIO, g: 'conformité', k: 'tube', lab: 'PILIER 4 / 5'},
  {at: 279.82, n: '5', title: 'Au-delà de la conformité', s: 'la vision stratégique', c: GOLD, g: 'stratégie', k: 'gyro', lab: 'PILIER 5 / 5'},
  {at: 310.98, n: '6', title: 'Le bâtiment tout entier', s: 'devoir n°36', c: TEAL, g: 'bâtiment', k: 'gyro', lab: 'ZOOM FINAL'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 326.3;
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
  {n: 1, l: 'Inspecter physiquement les locaux', s: 'inspection', at: 59.06},
  {n: 2, l: 'Le permis de travail à la loupe', s: 'permis', at: 72.22},
  {n: 3, l: 'Le SSHP : la fondation', s: 'SSHP', at: 87.54},
  {n: 4, l: 'Le gros bouton rouge', s: 'stop', at: 144.1},
  {n: 5, l: 'Les Toolbox Meetings', s: 'toolbox', at: 190.3},
  {n: 6, l: 'Jour 1 · 2 · 3 après l’accident', s: 'jour 1-2-3', at: 238.66},
  {n: 7, l: 'Les plans des sous-traitants', s: 'sous-traitants', at: 297.62},
  {n: 8, l: 'Une protection à 360°', s: '360°', at: 308.42},
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
const PILLARS = [{n: 1, l: 'Prévention & évaluation', c: BLUE, ic: 'loupe', a: 27.98}, {n: 2, l: 'Action & urgences', c: RED, ic: 'sirene', a: 30.78}, {n: 3, l: 'Formation & culture', c: GREEN, ic: 'ecole', a: 33.38}, {n: 4, l: 'Conformité & rapports', c: VIO, ic: 'classeur', a: 36.46}, {n: 5, l: 'Au-delà de la conformité', c: GOLD, ic: 'telescope', a: 39.48}];

/* ═════════════ Couverture : photo + « 40 DEVOIRS » en lettres-photos animées ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="equipe" w={1080} h={820} pos="50% 30%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 22%, ${PAPER}CC 30%, ${PAPER} 35%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={620} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="40" src={IMG.c40} size={330} ls={0} /></Abs>
      <Abs x={0} y={920} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="DEVOIRS" src={IMG.cDev} size={176} ls={0} seed={2} /></Abs>
      <Abs x={0} y={1100} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 62, color: NAVY, letterSpacing: -1}}>DU RESPONSABLE HSE</Abs>
      <Abs x={0} y={1200} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 12}}>{PILLARS.map((p) => <div key={p.n} style={{width: 150, height: 150, borderRadius: 26, background: p.c, border: `5px solid ${INK}`, boxShadow: `5px 5px 0 ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><F n={p.ic} size={64} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: '#fff'}}>PILIER {p.n}</div></div>)}</Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO : 40 devoirs → 5 piliers ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const ph = t < 19.2 ? 0 : t < 27.85 ? 1 : 2;
  const n = Math.round(prog(t, 2.8, 4.2, easeOut) * 40);
  const group = prog(t, 25.0, 26.6, easeInOut);
  return (
    <Out end={41.38}>
      {ph === 0 && (
        <>
          <HiLine words={t < 7.8 ? ['40', 'devoirs', 'distincts'] : ['Une', 'orchestration', 'vitale']} mark={t < 7.8 ? [0, 1] : [1, 2]} at={t < 7.8 ? 2.8 : 7.86} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={360} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30}}><PhotoLetterAnim ch={String(n).padStart(2, '0')} src={IMG.c40} size={300} ls={0} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: NAVY, lineHeight: 1}}>devoirs<br /><span style={{fontSize: 40, color: DIM}}>du responsable HSE</span></div></Abs>
          <Abs x={60} y={840} w={960} h={530}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center'}}><div style={{position: 'relative'}}><Pill at={5.46} c={DIM} size={32}>vérifier des affichages</Pill><div style={{position: 'absolute', left: 10, right: 10, top: '50%'}}><Strike p={prog(t, 7.3, 7.8)} c={RED} /></div></div></div>
            {[{l: 'inspection minutieuse des locaux', ic: 'loupe', a: 11.02, c: BLUE}, {l: 'liaison avec les agences gouvernementales', ic: 'temple', a: 13.34, c: VIO}, {l: 'déclenchement d’arrêts d’urgence', ic: 'stop', a: 15.58, c: RED}].map((x, k) => <div key={x.l} style={{position: 'absolute', left: 0, right: 0, top: 100 + k * 130, height: 110, borderRadius: 22, background: '#fff', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${x.c}`, display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px', opacity: pop(t, x.a), transform: `translateX(${(1 - pop(t, x.a)) * (k % 2 ? 300 : -300)}px)`}}><F n={x.ic} size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>{x.l}</span></div>)}
            {t > 17.7 && <Stamp at={17.7} c={GOLD} text="travail colossal" x={260} y={480} rot={-6} size={52} />}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={group < 0.5 ? ['40', 'points'] : ['5', 'grands', 'piliers']} mark={group < 0.5 ? [0] : [0, 2]} at={group < 0.5 ? 21.02 : 25.86} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930}>
            {Array.from({length: 40}, (_, k) => {
              const gx = (k % 8) * 116 + 22; const gy = Math.floor(k / 8) * 116 + 60;
              const p = Math.floor(k / 8); const tx = p * 192 + 26 + (k % 2) * 70; const ty = 120 + Math.floor((k % 8) / 2) * 120;
              return <div key={k} style={{position: 'absolute', left: lerp(gx, tx, group), top: lerp(gy, ty, group), width: 90, height: 90, borderRadius: 18, background: group > 0.5 ? PILLARS[p].c : '#fff', border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: group > 0.5 ? '#fff' : INK, opacity: pop(t, 19.4 + k * 0.03), transform: `rotate(${(1 - group) * 0 + Math.sin(k + group * 6) * 10 * group * (1 - group) * 4}deg)`}}>{k + 1}</div>;
            })}
            {group > 0.9 && PILLARS.map((p, k) => <div key={p.n} style={{position: 'absolute', left: k * 192 + 20, top: 640, width: 176, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: p.c, opacity: pop(t, 26.6 + k * 0.1)}}>PILIER {p.n}</div>)}
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Les', '5', 'piliers']} mark={[1, 2]} at={27.98} y={330} size={70} />
          <SearchOpen x={60} y={440} w={960} h={930} at={28.0} query="40 devoirs du responsable HSE" results={['Fiche de poste HSE', 'Les 40 devoirs du responsable HSE : 5 piliers', 'Glossaire HSE']} found={1} foundAt={29.95} clickAt={30.3} c={BLUE}>
            <div style={{position: 'absolute', inset: 0, padding: '28px 30px', display: 'flex', flexDirection: 'column', gap: 18}}>
              {PILLARS.map((x) => <div key={x.n} style={{display: 'flex', alignItems: 'center', gap: 18, height: 140, borderRadius: 24, background: '#fff', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${x.c}`, padding: '0 20px', opacity: pop(t, Math.max(x.a, 31.0)), transform: `translateX(${(1 - pop(t, Math.max(x.a, 31.0))) * 80}px)`}}><div style={{width: 90, height: 90, borderRadius: 20, background: x.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `4px solid ${INK}`}}>{x.n}</div><F n={x.ic} size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK}}>{x.l}</span></div>)}
            </div>
          </SearchOpen>
        </>
      )}
    </Out>
  );
};

/* ═════════════ PILIER 1 · PRÉVENTION & ÉVALUATION ═════════════ */
const Prevention: React.FC = () => {
  const t = useT();
  const ph = t < 53.5 ? 0 : t < 71.0 ? 1 : t < 83.6 ? 2 : 3;
  const shatter = prog(t, 51.7, 52.9, easeIn);
  const scan = prog(t, 71.2, 75.6, easeInOut);
  return (
    <Out end={109.42}>
      {ph === 0 && (
        <>
          <HiLine words={['Vigilance', 'proactive']} mark={[0, 1]} at={45.0} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${BLUE}`, overflow: 'hidden', opacity: pop(t, 44.9)}}>
            {Array.from({length: 36}, (_, k) => { const cx = k % 6; const cy = Math.floor(k / 6); const dx = (random(`sx${k}`) - 0.5) * 1400; const dy = (random(`sy${k}`) - 0.3) * 1200; return <div key={k} style={{position: 'absolute', left: 254 + cx * 73, top: 160 + cy * 73, width: 73, height: 73, overflow: 'hidden', transform: `translate(${dx * shatter}px, ${dy * shatter}px) rotate(${shatter * (random(`sr${k}`) - 0.5) * 720}deg)`, opacity: 1 - shatter}}><div style={{position: 'absolute', left: -cx * 73, top: -cy * 73, width: 440, height: 440}}><F n="danger" size={440} /></div></div>; })}
            {t > 52.6 && <div style={{position: 'absolute', left: 324, top: 220, transform: `scale(${spring(t, 52.6)})`}}><F n="bouclier" size={300} /></div>}
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 40, display: 'flex', justifyContent: 'center', gap: 16}}><Pill at={50.02} c={DIM} size={30}>gérer un danger…</Pill><Pill at={51.7} c={GREEN} size={30}>l’empêcher d’exister</Pill></div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 64.6 ? ['Un', 'travail', 'd’investigation'] : ['Analyse', 'des', 'risques']} mark={t < 64.6 ? [2] : [0, 2]} at={t < 64.6 ? 56.54 : 66.02} y={330} size={64} />
          <Shot src={IMG.inspection} ic="loupe" x={60} y={440} w={960} h={420} at={53.8} c={BLUE}>
            <LoupeSweep x0={60} y0={120} x1={600} y1={100} a={56.5} b={58.6} size={220} />
          </Shot>
          <Abs x={60} y={890} w={960} h={480} style={{display: 'flex', gap: 20}}>
            <div style={{flex: 1, borderRadius: 26, background: '#fff', border: `5px solid ${INK}`, padding: 22, display: 'flex', flexDirection: 'column', gap: 16, opacity: pop(t, 59.0)}}>
              {[{l: 'les locaux', a: 60.58}, {l: 'chaque outil', a: 61.7}, {l: 'chaque équipement', a: 62.98}].map((x) => <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 14}}><div style={{width: 50, height: 50, borderRadius: 12, border: `5px solid ${INK}`, background: t > x.a ? GREEN : '#fff', color: '#fff', fontWeight: 900, fontSize: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${t > x.a ? spring(t, x.a) : 1})`}}>{t > x.a ? '✓' : ''}</div><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>{x.l}</span></div>)}
              <div style={{marginTop: 'auto', fontFamily: MONO, fontWeight: 700, fontSize: 20, color: BLUE}}>inspection physique</div>
            </div>
            <div style={{flex: 1, borderRadius: 26, background: '#fff', border: `5px solid ${INK}`, padding: 22, opacity: pop(t, 66.0), position: 'relative'}}>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, height: 300}}>{Array.from({length: 9}, (_, k) => { const r = 2 - Math.floor(k / 3); const c = k % 3; const lvl = r + c; const col = lvl >= 3 ? RED : lvl === 2 ? ORANGE : GREEN; return <div key={k} style={{borderRadius: 12, background: col, opacity: t > 66.4 + k * 0.12 ? 1 : 0.15, border: `3px solid ${INK}`, boxShadow: k === 2 && t > 68 ? `0 0 20px ${RED}` : 'none'}} />; })}</div>
              <div style={{marginTop: 16, fontFamily: MONO, fontWeight: 700, fontSize: 20, color: RED, opacity: pop(t, 69.02)}}>avant le moindre dégât</div>
            </div>
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 80.8 ? ['Le', 'permis', 'de', 'travail'] : ['Comment', 'coordonner', '?']} mark={t < 80.8 ? [1, 3] : [1]} at={t < 80.8 ? 72.22 : 81.42} y={330} size={66} />
          <Shot src={IMG.permis} ic="ecrit" x={60} y={440} w={960} h={330} at={71.3} c={BLUE} />
          <Abs x={60} y={800} w={960} h={570} style={{background: '#FFFDF6', border: `6px solid ${INK}`, borderRadius: 24, boxShadow: `8px 8px 0 ${BLUE}`, overflow: 'hidden', opacity: pop(t, 71.6)}}>
            <div style={{position: 'absolute', left: 40, top: 30, fontFamily: MONO, fontWeight: 700, fontSize: 26, color: INK}}>PERMIS DE TRAVAIL</div>
            {['conditions de sécurité vérifiées', 'zone balisée', 'EPI adaptés', 'tâche dangereuse autorisée'].map((l, k) => <div key={l} style={{position: 'absolute', left: 40, right: 40, top: 100 + k * 80, display: 'flex', alignItems: 'center', gap: 14}}><div style={{width: 40, height: 40, borderRadius: 10, border: `4px solid ${INK}`, background: t > 77.9 + k * 0.3 ? GREEN : '#fff', color: '#fff', fontWeight: 900, fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{t > 77.9 + k * 0.3 ? '✓' : ''}</div><span style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: INK}}>{l}</span></div>)}
            <div style={{position: 'absolute', left: lerp(-60, 700, scan), top: 80 + Math.sin(scan * 9) * 120 + 120, width: 230, height: 230, borderRadius: '50%', border: `12px solid ${INK}`, background: 'radial-gradient(circle, rgba(255,255,255,0.1), rgba(160,200,255,0.25))', opacity: scan > 0 && scan < 1 ? 1 : 0, backdropFilter: 'blur(0px)'}} />
            {t > 75.74 && <Stamp at={75.74} c={INK} text="noir sur blanc" x={480} y={430} rot={-6} size={44} />}
            {t > 81.42 && <div style={{position: 'absolute', right: 40, top: 30, width: 90, height: 90, borderRadius: 45, background: GOLD, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: INK, transform: `scale(${spring(t, 81.42)})`}}>?</div>}
          </Abs>
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={t < 92.2 ? ['Le', 'SSHP'] : t < 99.9 ? ['La', 'fondation'] : ['Zéro', 'danger']} mark={t < 92.2 ? [1] : [1]} at={t < 92.2 ? 87.54 : t < 99.9 ? 93.22 : 107.86} y={330} size={72} />
          <Abs x={60} y={440} w={960} h={930} style={{background: '#0E2A5C', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 83.8)}}>
            <AbsoluteFill style={{backgroundImage: 'linear-gradient(#ffffff18 2px, transparent 2px), linear-gradient(90deg, #ffffff18 2px, transparent 2px)', backgroundSize: '48px 48px'}} />
            <div style={{position: 'absolute', left: 0, right: 0, top: 40, display: 'flex', justifyContent: 'center', gap: 14}}>{['S', 'S', 'H', 'P'].map((ch, k) => <div key={k} style={{width: 150, height: 170, borderRadius: 20, background: '#fff', border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 120, color: NAVY, transform: `rotateX(${(1 - prog(t, 87.0 + k * 0.12, 87.6 + k * 0.12, easeOut)) * 90}deg)`}}>{ch}</div>)}</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 240, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: '#9CC6FF', opacity: pop(t, 89.3)}}>plan de sécurité et de santé du site</div>
            <svg width={948} height={918} style={{position: 'absolute', left: 0, top: 0}}>
              {[[200, 700, 750, 700], [200, 700, 200, 470], [750, 700, 750, 470], [200, 470, 475, 330], [750, 470, 475, 330], [330, 700, 330, 560], [620, 700, 620, 560]].map(([a, b, c, d], k) => <line key={k} x1={a} y1={b} x2={lerp(a, c, prog(t, 93.2 + k * 0.15, 93.8 + k * 0.15))} y2={lerp(b, d, prog(t, 93.2 + k * 0.15, 93.8 + k * 0.15))} stroke="#fff" strokeWidth={6} strokeLinecap="round" />)}
              <rect x={150} y={700} width={650} height={40} fill="#9CC6FF" opacity={pop(t, 93.82)} />
            </svg>
            <div style={{position: 'absolute', left: 300, top: 760, fontFamily: MONO, fontWeight: 700, fontSize: 24, color: '#9CC6FF', opacity: pop(t, 93.82)}}>FONDATION · plan d’architecture</div>
            {t > 100 && [{l: 'inspections', a: 100.14, x: 40}, {l: 'permis', a: 101.62, x: 680}].map((x) => <div key={x.l} style={{position: 'absolute', left: x.x, top: 480, opacity: pop(t, x.a)}}><Pill at={x.a} c={BLUE} size={26}>{x.l}</Pill></div>)}
            {t > 107.86 && <div style={{position: 'absolute', left: 324, top: 400, width: 300, height: 140, borderRadius: 70, background: GREEN, border: `6px solid #fff`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: '#fff', transform: `scale(${spring(t, 107.86)})`, boxShadow: `0 0 40px ${GREEN}`}}>0 danger</div>}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ PILIER 2 · ACTION & URGENCES ═════════════ */
const Urgences: React.FC = () => {
  const t = useT();
  const ph = t < 123.3 ? 0 : t < 138.8 ? 1 : t < 150.5 ? 2 : 3;
  const press = t > 144.1 && t < 144.5 ? 1 : 0;
  const wave = (t - 144.1) / 1.2;
  const tilt = lerp(0, -14, prog(t, 147.5, 148.6, easeOut));
  const chaos = t > 163.86 && t < 166.1 ? Math.sin(t * 40) * 6 : 0;
  return (
    <Out end={170.5}>
      {ph === 0 && (
        <>
          <HiLine words={['Le', 'premier', 'intervenant']} mark={[1, 2]} at={117.86} y={330} size={64} />
          <Shot src={IMG.intervention} ic="sirene" x={60} y={440} w={960} h={600} at={113.0} c={RED} />
          <Abs x={60} y={1070} w={960} h={140} style={{display: 'flex', gap: 18, justifyContent: 'center'}}><Pill at={120.78} c={NAVY} size={32}>un contraste</Pill><Pill at={122.34} c={RED} size={32}>dans ses pouvoirs</Pill></Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 132.8 ? ['Le', 'protocole', 'standard'] : ['Autorité', 'absolue']} mark={t < 132.8 ? [1, 2] : [0, 1]} at={t < 132.8 ? 124.94 : 136.5} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 0, top: 0, width: 470, height: 930, borderRadius: 28, background: '#fff', border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${BLUE}`, opacity: pop(t, 123.4), padding: 22, boxSizing: 'border-box'}}>
              <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: BLUE}}>QUOTIDIEN</div>
              {[{l: 'acte dangereux', ic: 'danger', a: 126.5}, {l: 'hiérarchie habituelle', ic: 'superviseur', a: 128.9}, {l: 'correction', ic: 'check', a: 130.34}].map((x, k) => <div key={x.l}><div style={{marginTop: k ? 10 : 30, height: 160, borderRadius: 20, background: '#F4F6FA', border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', opacity: pop(t, x.a)}}><F n={x.ic} size={80} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK}}>{x.l}</span></div>{k < 2 && <div style={{textAlign: 'center', fontSize: 40, fontWeight: 900, color: BLUE, opacity: pop(t, x.a + 0.5)}}>↓</div>}</div>)}
            </div>
            <div style={{position: 'absolute', left: 490, top: 0, width: 470, height: 930, borderRadius: 28, background: t > 132.9 ? NIGHT : '#E3E8EF', border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${RED}`, opacity: pop(t, 131.8), overflow: 'hidden', padding: 22, boxSizing: 'border-box'}}>
              <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: RED}}>DANGER DE MORT IMMINENT</div>
              {t > 132.9 && <AbsoluteFill style={{background: `radial-gradient(circle at 50% 40%, ${RED}55, transparent 60%)`, opacity: 0.5 + 0.5 * Math.sin(t * 8)}} />}
              <div style={{position: 'absolute', left: 120, top: 200, transform: `scale(${t > 132.9 ? spring(t, 132.9) : 0})`}}><F n="crane" size={220} /></div>
              {t > 136.5 && <div style={{position: 'absolute', left: 30, right: 30, top: 520, height: 300, borderRadius: 24, background: GOLD, border: `5px solid #fff`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, transform: `scale(${spring(t, 136.5)})`}}><F n="couronne" size={110} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, textAlign: 'center'}}>autorité d’urgence absolue</span></div>}
            </div>
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 147.4 ? ['Stopper', 'net'] : ['La', 'vie', 'avant', 'tout']} mark={t < 147.4 ? [0, 1] : [1, 3]} at={t < 147.4 ? 140.38 : 147.5} y={330} size={72} />
          <Abs x={60} y={440} w={960} h={930} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 139.0)}}>
            {t < 147.4 ? <>
              {wave > 0 && wave < 1 && [0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 474 - (wave + k * 0.2) * 500, top: 380 - (wave + k * 0.2) * 500, width: (wave + k * 0.2) * 1000, height: (wave + k * 0.2) * 1000, borderRadius: '50%', border: `10px solid ${RED}`, opacity: 1 - wave}} />)}
              <div style={{position: 'absolute', left: 224, top: 520, width: 500, height: 130, borderRadius: 20, background: YEL, border: `8px solid ${INK}`}} />
              <div style={{position: 'absolute', left: 284, top: 200 + press * 60, width: 380, height: 340, borderRadius: '190px 190px 40px 40px', background: `radial-gradient(circle at 40% 30%, #FF9A8F, ${RED})`, border: `10px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: '#fff'}}>STOP</div>
              <div style={{position: 'absolute', left: 0, right: 0, top: 720, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={141.66} c={NAVY} size={28}>n’importe quel travail</Pill><Pill at={145.1} c={RED} size={28}>sans demander la permission</Pill></div>
            </> : <>
              <div style={{position: 'absolute', left: 462, top: 200, width: 24, height: 460, background: INK, borderRadius: 12}} />
              <div style={{position: 'absolute', left: 360, top: 650, width: 228, height: 40, background: INK, borderRadius: 12}} />
              <div style={{position: 'absolute', left: 100, top: 200, width: 748, height: 0, transform: `rotate(${tilt}deg)`}}>
                <div style={{position: 'absolute', left: 0, top: -10, width: 748, height: 20, background: INK, borderRadius: 10}} />
                {[{l: 'vie humaine', ic: 'coeur', c: RED, x: -40}, {l: 'production', ic: 'usine', c: DIM, x: 488}].map((p) => <div key={p.l} style={{position: 'absolute', left: p.x, top: 10, width: 300, transform: `rotate(${-tilt}deg)`, transformOrigin: '50% 0'}}><div style={{margin: '0 auto', width: 4, height: 40, background: INK}} /><div style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: '0 0 60px 60px', height: 220, boxShadow: `6px 6px 0 ${p.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><F n={p.ic} size={100} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>{p.l}</div></div></div>)}
              </div>
              {t > 149.58 && <Stamp at={149.58} c={RED} text="un point c’est tout" x={260} y={760} rot={-5} size={46} />}
            </>}
          </Abs>
        </>
      )}
      {ph === 3 && (
        <>
          <HiLine words={t < 163.8 ? ['Crise', 'ultra', 'dynamique'] : ['Même', 'dans', 'le', 'chaos']} mark={t < 163.8 ? [0, 2] : [3]} at={t < 163.8 ? 151.58 : 163.86} y={330} size={64} />
          <Shot src={IMG.crise} ic="sirene" x={60} y={440} w={960} h={340} at={150.8} c={RED} />
          <Abs x={60} y={810} w={960} h={560} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 151.0), transform: `translateX(${chaos}px)`}}>
            <div style={{position: 'absolute', left: 30, top: 30, width: 160, height: 160, borderRadius: 80, border: '6px solid #fff'}}><div style={{position: 'absolute', left: 74, top: 20, width: 6, height: 60, background: '#fff', transformOrigin: '50% 100%', transform: `rotate(${t * 720}deg)`}} /><div style={{position: 'absolute', left: 0, right: 0, top: 170, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF'}}>minute / minute</div></div>
            <div style={{position: 'absolute', left: 230, right: 30, top: 40, display: 'flex', flexDirection: 'column', gap: 14}}>
              {['alerte', 'évaluation', 'intervention', 'retour au calme'].map((l, k) => <div key={l} style={{display: 'flex', alignItems: 'center', gap: 12, height: 70, borderRadius: 16, background: '#1E2638', border: '3px solid #3A4560', padding: '0 14px', opacity: pop(t, 156.4 + k * 0.3)}}><span style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: '#9CC6FF'}}>ÉTAPE {k + 1}</span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: '#fff', flex: 1}}>{l}</span>{t > 160.6 + k * 0.45 && <div style={{transform: `scale(${spring(t, 160.6 + k * 0.45)})`}}><F n="bouclier" size={50} /></div>}</div>)}
            </div>
            {t > 166.14 && <div style={{position: 'absolute', left: 230, right: 30, top: 400, height: 120, borderRadius: 60, background: TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, transform: `scale(${spring(t, 166.14)})`}}><F n="equipe" size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff'}}>équipes d’intervention protégées</span></div>}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ PILIER 3 · FORMATION & CULTURE ═════════════ */
const Formation: React.FC = () => {
  const t = useT();
  const ph = t < 179.4 ? 0 : t < 204.5 ? 1 : 2;
  const cyc = t > 184.2 ? ((t - 184.2) * 0.35) % 1 : 0;
  return (
    <Out end={222.18}>
      {ph === 0 && (
        <>
          <HiLine words={['L’humain', 'd’abord']} mark={[0]} at={175.82} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${GREEN}`, overflow: 'hidden', opacity: pop(t, 174.0)}}>
            <div style={{position: 'absolute', left: 60, top: 80, opacity: 1 - prog(t, 175.5, 176.5)}}><F n="classeur" size={200} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM}}>règles strictes</div></div>
            <div style={{position: 'absolute', left: 300, top: 220, transform: `scale(${t > 175.82 ? spring(t, 175.82) : 0})`}}><div style={{width: 360, height: 360, borderRadius: 180, background: `radial-gradient(circle, ${GREEN}55, transparent 70%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 ${40 + 20 * Math.sin(t * 4)}px ${GREEN}`}}><F n="cerveau" size={240} /></div></div>
            {t > 178.06 && <div style={{position: 'absolute', left: 0, right: 0, bottom: 60, textAlign: 'center'}}><Pill at={178.06} c={GREEN} size={34}>mentalité de sécurité</Pill></div>}
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 182.1 ? ['Un', 'muscle'] : t < 201.7 ? ['Cycle', 'en', '3', 'étapes'] : ['Les', 'bons', 'réflexes']} mark={t < 182.1 ? [1] : t < 201.7 ? [0, 2] : [1, 2]} at={t < 182.1 ? 180.26 : t < 201.7 ? 182.18 : 202.98} y={330} size={70} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 130, top: 100, width: 700, height: 700, borderRadius: '50%', border: `14px dashed ${GREEN}55`}} />
            <div style={{position: 'absolute', left: 480 + Math.cos(cyc * Math.PI * 2 - Math.PI / 2) * 350 - 24, top: 450 + Math.sin(cyc * Math.PI * 2 - Math.PI / 2) * 350 - 24, width: 48, height: 48, borderRadius: 24, background: YEL, boxShadow: `0 0 30px ${YEL}`, opacity: t > 184.2 ? 1 : 0}} />
            {[{n: 1, l: 'identifier les besoins', s: 'bruit · machines complexes', ic: 'haut-parleur', a: 184.22, ang: -90}, {n: 2, l: 'Toolbox Meetings', s: 'hyper courts · quotidiens', ic: 'casque', a: 190.3, ang: 30}, {n: 3, l: 'exercices d’urgence', s: 'grandeur nature', ic: 'sirene', a: 199.3, ang: 150}].map((x) => { const a = (x.ang * Math.PI) / 180; return <div key={x.n} style={{position: 'absolute', left: 480 + Math.cos(a) * 350 - 170, top: 450 + Math.sin(a) * 350 - 110, width: 340, height: 220, borderRadius: 26, background: '#fff', border: `5px solid ${INK}`, boxShadow: `7px 7px 0 ${GREEN}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, transform: `scale(${t > x.a ? spring(t, x.a) : 0})`}}><div style={{display: 'flex', alignItems: 'center', gap: 10}}><div style={{width: 50, height: 50, borderRadius: 25, background: GREEN, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div><F n={x.ic} size={70} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, textAlign: 'center'}}>{x.l}</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 17, color: GREEN}}>{x.s}</div></div>; })}
            <div style={{position: 'absolute', left: 380, top: 350, width: 200, height: 200, borderRadius: 100, background: t > 202.98 ? YEL : '#fff', border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 180.3), transform: `scale(${t > 180.26 && t < 182 ? 1 + 0.1 * Math.sin(t * 12) : 1})`}}><F n={t > 202.98 ? 'eclair' : 'poing'} size={110} /></div>
          </Abs>
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={t < 215.0 ? ['Pas', 'un', 'monologue'] : ['Une', 'mission', 'commune']} mark={t < 215.0 ? [2] : [1, 2]} at={t < 215.0 ? 208.74 : 220.62} y={330} size={66} />
          <Shot src={IMG.dialogue} ic="equipe" x={60} y={440} w={960} h={380} at={204.8} c={GREEN} />
          <Abs x={60} y={850} w={960} h={520} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 205.0)}}>
            {t < 209.7 ? [0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 40, top: 40 + k * 140, width: 600, height: 110, borderRadius: '30px 30px 30px 6px', background: '#E3E8EF', border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', padding: '0 20px', fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: DIM, opacity: pop(t, 205.6 + k * 0.4)}}>règle… règle… règle…{k === 2 && t > 208.74 && <div style={{position: 'absolute', left: 10, right: 10, top: '50%'}}><Strike p={prog(t, 208.8, 209.3)} c={RED} /></div>}</div>) : <>
              {[{l: 'écoute active', a: 211.38, r: 0}, {l: 'préoccupations réelles', a: 212.98, r: 1}, {l: 'réponse du responsable', a: 214.18, r: 0}, {l: 'retours du terrain', a: 216.1, r: 1}].map((x, k) => <div key={x.l} style={{position: 'absolute', left: x.r ? 380 : 40, top: 30 + k * 105, width: 540, height: 86, borderRadius: x.r ? '30px 30px 6px 30px' : '30px 30px 30px 6px', background: x.r ? GREEN : BLUE, display: 'flex', alignItems: 'center', padding: '0 20px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff', opacity: pop(t, x.a), transform: `translateY(${(1 - pop(t, x.a)) * 40}px)`}}>{x.l}</div>)}
              {t > 219.78 && <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, display: 'flex', justifyContent: 'center'}}><div style={{display: 'flex', alignItems: 'center', gap: 12, background: GOLD, border: `4px solid ${INK}`, borderRadius: 40, padding: '6px 24px', transform: `scale(${spring(t, 219.78)})`}}><F n="poignee" size={56} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>effort collectif</span></div></div>}
            </>}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ PILIER 4 · CONFORMITÉ & RAPPORTS ═════════════ */
const Conformite: React.FC = () => {
  const t = useT();
  const ph = t < 233.4 ? 0 : t < 257.6 ? 1 : 2;
  const bridge = prog(t, 228.1, 229.8, easeInOut);
  const tilt = t < 263.1 ? 0 : t < 268.2 ? lerp(0, -10, prog(t, 263.1, 264.2, easeOut)) : t < 275.6 ? lerp(-10, 10, prog(t, 268.3, 269.5, easeInOut)) : lerp(10, 0, prog(t, 275.7, 277.2, easeInOut));
  return (
    <Out end={279.82}>
      {ph === 0 && (
        <>
          <HiLine words={['Le', 'pont', 'indispensable']} mark={[1, 2]} at={228.1} y={330} size={64} />
          <Abs x={60} y={440} w={960} h={930} style={{background: `linear-gradient(180deg, #E6F0FF, #fff)`, border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 225.9)}}>
            <div style={{position: 'absolute', left: 30, top: 380, width: 240, textAlign: 'center'}}><F n="chantier" size={200} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>terrain</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: RED, opacity: pop(t, 229.86)}}>réalité brutale</div></div>
            <div style={{position: 'absolute', right: 30, top: 380, width: 240, textAlign: 'center'}}><F n="temple" size={200} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>la loi</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: VIO, opacity: pop(t, 231.74)}}>exigences</div></div>
            <svg width={948} height={918} style={{position: 'absolute', left: 0, top: 0}}><path d="M 250 520 Q 474 260 698 520" fill="none" stroke={VIO} strokeWidth={22} strokeLinecap="round" strokeDasharray={600} strokeDashoffset={600 * (1 - bridge)} />{[0, 1, 2, 3, 4].map((k) => { const x = 290 + k * 92; return <line key={k} x1={x} y1={520} x2={x} y2={520 - Math.sin(((x - 250) / 448) * Math.PI) * 190} stroke={VIO} strokeWidth={8} opacity={bridge} />; })}<line x1={240} y1={520} x2={708} y2={520} stroke={INK} strokeWidth={10} opacity={bridge} /></svg>
            {t > 229.8 && [0, 1, 2].map((k) => { const p = ((t - 229.8) * 0.45 + k / 3) % 1; return <div key={k} style={{position: 'absolute', left: lerp(250, 640, p), top: 520 - Math.sin(p * Math.PI) * 260 - 40}}><F n="dossier" size={60} /></div>; })}
            <div style={{position: 'absolute', left: 0, right: 0, top: 40, textAlign: 'center'}}><Pill at={227.1} c={VIO} size={32}>phase administrative</Pill></div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 238.5 ? ['Après', 'un', 'accident'] : ['Jour', '1', '·', '2', '·', '3']} mark={t < 238.5 ? [2] : [1, 3, 5]} at={t < 238.5 ? 234.42 : 238.66} y={330} size={66} />
          <Shot src={IMG.rapport} ic="graphique" x={60} y={440} w={960} h={300} at={233.6} c={VIO} />
          <Abs x={60} y={770} w={960} h={600} style={{display: 'flex', gap: 16}}>
            {[{d: 1, l: 'enquêter', s: 'causes fondamentales', ic: 'loupe', a: 238.66, c: BLUE}, {d: 2, l: 'enregistrer', s: 'dossiers d’indemnisation', ic: 'classeur', a: 244.1, c: VIO}, {d: 3, l: 'remonter', s: 'ministère du Travail · OSHA', ic: 'temple', a: 249.22, c: RED}].map((x) => { const f = prog(t, x.a - 0.1, x.a + 0.5, easeOut); return <div key={x.d} style={{flex: 1, perspective: 900}}><div style={{height: 420, borderRadius: 24, background: '#fff', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${x.c}`, transform: `rotateX(${(1 - f) * -100}deg)`, transformOrigin: '50% 0', overflow: 'hidden', opacity: f > 0 ? 1 : 0.25}}><div style={{height: 120, background: x.c, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: '#fff'}}>JOUR</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: '#fff', lineHeight: 1}}>{x.d}</div></div><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: 18}}><F n={x.ic} size={110} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>{x.l}</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: x.c, textAlign: 'center'}}>{x.s}</div></div></div></div>; })}
          </Abs>
          {t > 256.54 && <Stamp at={256.54} c={INK} text="rigueur absolue" x={300} y={1225} rot={-5} size={46} />}
        </>
      )}
      {ph === 2 && (
        <>
          <HiLine words={['Double', 'équilibre']} mark={[0, 1]} at={260.26} y={330} size={72} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 468, top: 180, width: 24, height: 560, background: INK, borderRadius: 12}} />
            <div style={{position: 'absolute', left: 360, top: 730, width: 240, height: 40, background: INK, borderRadius: 12}} />
            <div style={{position: 'absolute', left: 110, top: 180, width: 740, height: 0, transform: `rotate(${tilt}deg)`}}>
              <div style={{position: 'absolute', left: 0, top: -10, width: 740, height: 20, background: INK, borderRadius: 10}} />
              {[{l: 'transparence interne', items: [{l: 'statistiques solides', a: 263.14}, {l: 'haute direction', a: 264.5}], c: BLUE, x: -90, ic: 'graphique', a: 261.78}, {l: 'conformité externe', items: [{l: 'tests obligatoires', a: 270.82}, {l: 'consultants externes', a: 273.66}], c: VIO, x: 470, ic: 'temple', a: 268.26}].map((p) => <div key={p.l} style={{position: 'absolute', left: p.x, top: 10, width: 360, transform: `rotate(${-tilt}deg)`, transformOrigin: '50% 0', opacity: pop(t, p.a)}}><div style={{margin: '0 auto', width: 4, height: 40, background: INK}} /><div style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: '0 0 60px 60px', height: 330, boxShadow: `6px 6px 0 ${p.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 12}}><F n={p.ic} size={80} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: p.c, textAlign: 'center'}}>{p.l}</div>{p.items.map((it) => <div key={it.l} style={{fontFamily: sansFont, fontWeight: 800, fontSize: 22, color: INK, opacity: pop(t, it.a)}}>• {it.l}</div>)}</div></div>)}
            </div>
            {t > 277.14 && <div style={{position: 'absolute', left: 0, right: 0, top: 820, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={277.14} c={BLUE} size={30}>dirigeants</Pill><Pill at={278.42} c={VIO} size={30}>législateurs</Pill></div>}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ PILIER 5 · AU-DELÀ DE LA CONFORMITÉ ═════════════ */
const Strategie: React.FC = () => {
  const t = useT();
  const ph = t < 293.8 ? 0 : 1;
  const alt = prog(t, 288.5, 291.5, easeInOut);
  const spin = prog(t, 308.42, 310.0, easeInOut);
  return (
    <Out end={310.98}>
      {ph === 0 && (
        <>
          <HiLine words={['Prendre', 'de', 'la', 'hauteur']} mark={[0, 3]} at={289.7} y={330} size={66} />
          <Abs x={60} y={440} w={960} h={930} style={{border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 283.3)}}>
            <div style={{position: 'absolute', inset: 0, transform: `scale(${lerp(2.2, 1, alt)})`, transformOrigin: '50% 70%'}}><Pic src={IMG.vision} ic="telescope" w={948} h={918} /></div>
            <div style={{position: 'absolute', right: 24, top: 24, bottom: 24, width: 70, borderRadius: 35, background: 'rgba(14,42,92,0.75)', border: '4px solid #fff'}}><div style={{position: 'absolute', left: 8, right: 8, bottom: 8, height: `${8 + alt * 84}%`, borderRadius: 27, background: `linear-gradient(0deg, ${GOLD}, #FFE38A)`}} /></div>
            <div style={{position: 'absolute', left: 24, top: 24, background: 'rgba(14,42,92,0.85)', color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 24, padding: '8px 16px', borderRadius: 10}}>VISION À LONG TERME</div>
            <div style={{position: 'absolute', left: 24, bottom: 24, display: 'flex', gap: 12}}><Pill at={290.98} c={GOLD} size={30}>pérennité de l’entreprise</Pill><Pill at={292.72} c={GREEN} size={30}>environnement</Pill></div>
          </Abs>
        </>
      )}
      {ph === 1 && (
        <>
          <HiLine words={t < 308.3 ? ['Au-delà', 'de', 'la', 'conformité'] : ['Protection', 'à', '360°']} mark={t < 308.3 ? [0, 3] : [0, 2]} at={t < 308.3 ? 294.0 : 308.42} y={330} size={62} />
          <Abs x={60} y={440} w={960} h={930}>
            <div style={{position: 'absolute', left: 130, top: 115, width: 700, height: 700, borderRadius: '50%', transform: `rotate(${spin * 360}deg)`, boxShadow: spin > 0 ? `0 0 ${60 * Math.sin(spin * Math.PI) + 20}px ${GOLD}` : 'none', background: `conic-gradient(${[BLUE, VIO, RED, GREEN].map((c, k) => { const on = t > [294.9, 297.62, 303.06, 306.58][k]; return `${on ? c : '#E3E8EF'} ${k * 90}deg ${k * 90 + 90}deg`; }).join(', ')})`, border: `8px solid ${INK}`}} />
            <div style={{position: 'absolute', left: 280, top: 265, width: 400, height: 400, borderRadius: '50%', background: PAPER, border: `8px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 110, color: t > 308.42 ? GOLD : INK, lineHeight: 1}}>360°</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>protection</div></div>
            {[{l: 'politiques internes à jour', ic: 'classeur', a: 294.9, x: 520, y: 20}, {l: 'plans des sous-traitants approuvés', ic: 'check', a: 297.62, x: 540, y: 760}, {l: 'interface agences d’État', ic: 'temple', a: 303.06, x: 0, y: 760}, {l: 'déchets dangereux', ic: 'radioactif', a: 306.58, x: 0, y: 20}].map((x) => <div key={x.l} style={{position: 'absolute', left: x.x, top: x.y, width: 420, display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: `4px solid ${INK}`, borderRadius: 20, padding: '10px 14px', boxSizing: 'border-box', opacity: pop(t, x.a), transform: `scale(${t > x.a ? spring(t, x.a) : 0.6})`}}><F n={x.ic} size={56} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK, lineHeight: 1.1}}>{x.l}</span></div>)}
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ ZOOM FINAL · LE BÂTIMENT ═════════════ */
const Batiment: React.FC = () => {
  const t = useT();
  const sweep = prog(t, 316.0, 319.0, easeInOut);
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={t < 326.2 ? ['Le', 'devoir', 'n°36'] : ['Tout', 'le', 'bâtiment']} mark={t < 326.2 ? [1, 2] : [2]} at={t < 326.2 ? 316.02 : 326.3} y={330} size={72} />
      <Shot src={IMG.batiment} ic="batiment" x={60} y={440} w={960} h={460} at={314.6} c={TEAL} blinds>
        <div style={{position: 'absolute', left: 0, right: 0, top: `${sweep * 100}%`, height: 6, background: '#5EEAD4', boxShadow: '0 0 30px #5EEAD4', opacity: sweep > 0 && sweep < 1 ? 1 : 0}} />
      </Shot>
      <Abs x={60} y={930} w={960} h={440} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${TEAL}`, overflow: 'hidden', opacity: pop(t, 315.0)}}>
        <div style={{position: 'absolute', left: 30, top: 30, width: 200, height: 200, borderRadius: 30, background: TEAL, border: `6px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${t > 316.02 ? spring(t, 316.02) : 0})`}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: '#D5FFF8'}}>DEVOIR</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: '#fff', lineHeight: 1}}>36</div></div>
        <div style={{position: 'absolute', left: 260, right: 30, top: 30, display: 'flex', flexDirection: 'column', gap: 14}}>
          {[{l: 'maintenance des installations', ic: 'outils', a: 319.02}, {l: 'élimination des substances', ic: 'recyclage', a: 322.38}, {l: 'conforme aux normes', ic: 'check', a: 324.78}].map((x) => <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 12, height: 82, borderRadius: 20, background: '#F4F6FA', border: `4px solid ${INK}`, padding: '0 14px', opacity: pop(t, x.a), transform: `translateX(${(1 - pop(t, x.a)) * 60}px)`}}><F n={x.ic} size={56} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK}}>{x.l}</span></div>)}
        </div>
        {t > 326.3 && <div style={{position: 'absolute', left: 30, bottom: 30, display: 'flex', alignItems: 'center', gap: 10, transform: `scale(${spring(t, 326.3)})`}}><F n="batiment" size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: TEAL}}>+</span><F n="equipe" size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK}}>même exigence</span></div>}
      </Abs>
      {t > 328.4 && <Dust n={24} c={GOLD} />}
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
  ...rep(2.8, 14, 0.1, 'tick', 0.16), {at: 4.2, s: 'sfx/ding', v: 0.3}, {at: 5.46, s: 'sfx/pop', v: 0.2}, {at: 7.3, s: 'sfx/swish', v: 0.3}, ...[11.02, 13.34, 15.58].map((a) => ({at: a, s: 'sfx/whoosh', v: 0.25})), {at: 17.7, s: 'tampon', v: 0.55},
  ...rep(19.4, 20, 0.06, 'sfx/click', 0.1), {at: 25.0, s: 'soft-whoosh', v: 0.45, dur: 1.6}, {at: 26.6, s: 'bass-hit', v: 0.35},
  ...searchCues(28.0, 29, 29.95, 30.3), ...pops([31.0, 31.2, 33.38, 36.46, 39.48], 0.18),
  {at: 50.02, s: 'sfx/pop', v: 0.2}, {at: 51.7, s: 'deep-hit', v: 0.45}, {at: 51.75, s: 'sfx/swish', v: 0.35}, {at: 52.6, s: 'validation', v: 0.3},
  {at: 53.8, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 56.5, s: 'soft-whoosh', v: 0.25, dur: 2}, ...[60.58, 61.7, 62.98].map((a) => ({at: a, s: 'sfx/ding', v: 0.22})), ...rep(66.4, 9, 0.12, 'sfx/click', 0.14), {at: 69.02, s: 'alarme', v: 0.04, dur: 0.6},
  {at: 71.3, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 71.2, s: 'soft-whoosh', v: 0.2, dur: 4}, {at: 75.74, s: 'tampon', v: 0.5}, ...[77.9, 78.2, 78.5, 78.8].map((a) => ({at: a, s: 'sfx/click', v: 0.3})), {at: 81.42, s: 'sfx/pop', v: 0.25},
  ...rep(87.0, 4, 0.12, 'sfx/thud', 0.3), {at: 89.3, s: 'sfx/swish', v: 0.25}, ...rep(93.2, 7, 0.15, 'stylo', 0.12), ...pops([100.14, 101.62]), {at: 107.86, s: 'validation', v: 0.35},
  {at: 113.0, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 117.86, s: 'alarme', v: 0.05, dur: 1}, ...pops([120.78, 122.34]),
  ...[126.5, 128.9, 130.34].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})), {at: 132.9, s: 'deep-hit', v: 0.45}, {at: 132.95, s: 'alarme', v: 0.06, dur: 1.5}, {at: 136.5, s: 'bass-hit', v: 0.4},
  {at: 144.1, s: 'deep-hit', v: 0.55}, {at: 144.15, s: 'sfx/thud', v: 0.5}, ...pops([141.66, 145.1]), {at: 147.5, s: 'sfx/swish', v: 0.3}, {at: 148.6, s: 'sfx/thud', v: 0.35}, {at: 149.58, s: 'tampon', v: 0.55},
  {at: 150.8, s: 'soft-whoosh', v: 0.3, dur: 1}, ...rep(151.0, 12, 0.5, 'tick', 0.1), ...[160.6, 161.05, 161.5, 161.95].map((a) => ({at: a, s: 'sfx/ding', v: 0.18})), {at: 163.86, s: 'tension', v: 0.12, dur: 2.2}, {at: 166.14, s: 'validation', v: 0.3},
  {at: 175.82, s: 'sfx/rise', v: 0.25, dur: 1.2}, {at: 178.06, s: 'sfx/ding', v: 0.25},
  {at: 180.26, s: 'sfx/thud', v: 0.3}, ...[184.22, 190.3, 199.3].map((a) => ({at: a, s: 'bass-hit', v: 0.25})), {at: 202.98, s: 'validation', v: 0.3},
  {at: 204.8, s: 'soft-whoosh', v: 0.3, dur: 1}, ...pops([205.6, 206.0, 206.4], 0.12), {at: 208.8, s: 'sfx/swish', v: 0.3}, ...pops([211.38, 212.98, 214.18, 216.1]), {at: 219.78, s: 'validation', v: 0.3},
  {at: 227.1, s: 'sfx/pop', v: 0.2}, {at: 228.1, s: 'sfx/rise', v: 0.25, dur: 1.7}, {at: 229.8, s: 'sfx/thud', v: 0.3},
  {at: 233.6, s: 'soft-whoosh', v: 0.3, dur: 1}, ...[238.66, 244.1, 249.22].flatMap((a) => [{at: a - 0.1, s: 'page', v: 0.35}, {at: a + 0.3, s: 'sfx/thud', v: 0.3}]), {at: 256.54, s: 'tampon', v: 0.55},
  {at: 261.78, s: 'sfx/pop', v: 0.2}, {at: 263.1, s: 'sfx/swish', v: 0.25}, {at: 268.3, s: 'sfx/swish', v: 0.25}, {at: 275.7, s: 'sfx/swish', v: 0.25}, {at: 277.2, s: 'validation', v: 0.3},
  {at: 283.3, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 288.5, s: 'sfx/rise', v: 0.3, dur: 3}, ...pops([290.98, 292.72]),
  ...[294.9, 297.62, 303.06, 306.58].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), {at: 308.42, s: 'soft-whoosh', v: 0.45, dur: 1.6}, {at: 310.0, s: 'bass-hit', v: 0.4},
  {at: 314.6, s: 'soft-whoosh', v: 0.35, dur: 1}, ...rep(314.7, 10, 0.05, 'sfx/click', 0.12), {at: 316.0, s: 'soft-whoosh', v: 0.2, dur: 3}, ...pops([319.02, 322.38]), {at: 324.78, s: 'validation', v: 0.3}, {at: 326.3, s: 'bass-hit', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<TK, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
export const QuaranteDevoirs: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={41.45}><Intro /></Gate>
    <Gate from={41.75} to={109.5}><Prevention /></Gate>
    <Gate from={109.8} to={170.55}><Urgences /></Gate>
    <Gate from={170.85} to={222.25}><Formation /></Gate>
    <Gate from={222.55} to={279.9}><Conformite /></Gate>
    <Gate from={280.2} to={311.05}><Strategie /></Gate>
    <Gate from={311.35} to={OUTRO_AT}><Batiment /></Gate>
    {SECT.map((x, i) => { const C = TRANS[x.k]; return <Gate key={x.n} from={x.at} to={x.at + 3.7}><C i={i} /></Gate>; })}
    <Gate from={55} to={312}><StationBanner /></Gate>
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={331.0}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-quarante-devoirs-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Tile, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, spring, LoupeSweep, PneuDeliver, Shine, Count, BURG, YEL, handFont, Board, random, Strike, TEAL, PhotoLetter, Watermark, ORANGE];
