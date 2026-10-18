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
 * « La sécurité au travail, une responsabilité » (47 s, voix off ElevenLabs fournie) — capsule « condensé + effet wahou
 * + ultra premium » : voix d'origine (sans musique de fond), sous-titres calés mot à mot, photos réelles, thème
 * « papier quadrillé ».
 * Fil rouge : LE TUBE PNEUMATIQUE À SIX GUICHETS (responsabilité → machine → vérification → prévention → victoire →
 * engagement), adaptés aux parties réellement présentes ; la capsule file d'un guichet à l'autre, chaque guichet passé
 * se coche. Transition : LE GYROPHARE, en version accélérée (1,7 s) vu la brièveté de la capsule.
 * Ultra premium : cartes en verre dépoli pivotant en 3D, reflets lumineux, moniteur cardiaque qui s'aplatit, alarme
 * rouge qui fait trembler l'image, zone dangereuse hachurée animée, balance production / vie humaine, barre de
 * recherche qui trouve puis OUVRE la vérification avant démarrage, store vénitien, temple à trois colonnes, trophée à
 * rayons tournants, trajet usine → maison, interrupteur verrouillé, calendrier qui défile.
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
const OUTRO_AT = 47.6;
export const RESPONSABILITE_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 2.7, n: '1', title: 'Une responsabilité', s: 'jamais à la légère', c: NAVY, g: 'responsabilité', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 12.2, n: '2', title: 'Le scénario machine', s: 'zone dangereuse', c: RED, g: 'machine', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 24.2, n: '3', title: 'Une simple vérification', s: 'avant le démarrage', c: ORANGE, g: 'vérification', k: 'gyro', lab: 'PARTIE 3 / 6'},
  {at: 30.1, n: '4', title: 'La prévention', s: 'maîtrise des risques · procédures', c: TEAL, g: 'prévention', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 35.5, n: '5', title: 'Chaque victoire', s: 'rentrer chez soi en bonne santé', c: GOLD, g: 'victoire', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 41.6, n: '6', title: 'Notre engagement', s: 'chaque jour · chacun', c: GREEN, g: 'engagement', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 46.6;

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

/** Gyrophare accéléré (×2) : même mise en scène que le gyrophare de la série, tenue en 1,7 s. */
const SP = 2;
const GyroF: React.FC<{i: number}> = ({i}) => {
  const t0 = useT();
  const S0 = SECT[i];
  const t = S0.at + (t0 - S0.at) * SP;
  const k = t - S0.at;
  if (k < 0 || k > 3.4) return null;
  const inn = prog(t, S0.at, S0.at + 0.25, easeOut) * (1 - prog(t, S0.at + 3.0, S0.at + 3.4, easeIn));
  const band = prog(t, S0.at + 0.3, S0.at + 1.0, easeOut);
  const beam = '31,111,209';
  return (
    <AbsoluteFill style={{zIndex: 35, opacity: inn, overflow: 'hidden'}}>
      <AbsoluteFill style={{background: PAPER}} />
      <Bg />
      <AbsoluteFill style={{background: `conic-gradient(from ${k * 520}deg at 540px 300px, rgba(${beam},0.38) 0deg, transparent 26deg, transparent 180deg, rgba(${beam},0.38) 180deg, transparent 206deg)`, opacity: 1 - prog(t, S0.at + 1.6, S0.at + 2.4)}} />
      <div style={{position: 'absolute', left: 470, top: 320, width: 140, height: 90, borderRadius: '70px 70px 12px 12px', background: `radial-gradient(circle at 50% 40%, #fff, rgb(${beam}) 60%)`, border: `5px solid ${INK}`, boxShadow: `0 0 ${40 + 30 * Math.abs(Math.sin(k * 9))}px rgb(${beam})`}} />
      <div style={{position: 'absolute', left: -400, top: 760, width: 1900, height: 260, transform: `translateX(${lerp(-1900, 0, band)}px) rotate(-8deg)`, background: `repeating-conic-gradient(${NAVY} 0 25%, ${YEL} 0 50%) 0 0 / 130px 130px`, border: `8px solid ${INK}`}} />
      <div style={{position: 'absolute', left: 110, top: 740, width: 860, height: 300, transform: `rotate(-8deg) scale(${Math.max(0, Math.min(1, spring(t, S0.at + 0.9, 8, 12)))})`, background: '#fff', border: `7px solid ${INK}`, borderRadius: 24, boxShadow: `12px 12px 0 ${S0.c}`, display: 'flex', alignItems: 'center', gap: 26, padding: '0 30px', boxSizing: 'border-box'}}>
        <div style={{width: 150, height: 150, borderRadius: 75, background: S0.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 96, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{S0.n}</div>
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM, letterSpacing: 3}}>{S0.lab}</div><Kin text={S0.title} at={S0.at + 1.1 / SP} size={S0.title.length > 18 ? 50 : 62} stagger={0.012} /></div>
      </div>
      <Abs x={0} y={1140} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-block', background: S0.c, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 2, padding: '6px 16px', borderRadius: 6, opacity: pop(t, S0.at + 1.6)}}>{S0.s.toUpperCase()}</div></Abs>
    </AbsoluteFill>
  );
};


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


/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('promo/hse-machine.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 900, objectFit: 'cover', objectPosition: '45% 35%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 32%, ${PAPER}DD 42%, ${PAPER} 47%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={720} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>LA SÉCURITÉ AU TRAVAIL</div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 88, color: INK, marginTop: 10}}>une</div>
        <div style={{marginTop: 4}}><Board text="RESPONSABILITÉ" at={-1} h={92} gap={3} c={NAVY} stag={0.02} /></div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 80, color: RED, marginTop: 16}}>jamais à la légère</div>
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

/* ═════════════ 1 · UNE RESPONSABILITÉ ═════════════ */
const ecg = (x: number) => {
  const k = x % 240;
  if (k < 90) return 0;
  if (k < 105) return -(k - 90) * 2;
  if (k < 120) return -30 + (k - 105) * 10;
  if (k < 135) return 120 - (k - 120) * 12;
  if (k < 150) return -60 + (k - 135) * 4;
  return 0;
};
const Responsabilite: React.FC = () => {
  const t = useT();
  const flat = prog(t, 11.0, 11.5);
  const scroll = (t - 5.6) * 260;
  const N = 96;
  const pts = Array.from({length: N + 1}, (_, k) => {
    const x = (k / N) * 900;
    const amp = x > 900 * (1 - flat) ? 0 : 1;
    return `${x + 30},${130 + ecg(x + scroll) * amp}`;
  }).join(' ');
  const draw = prog(t, 5.7, 6.6);
  const P3 = [{ic: 'salarie', l: 'une personne', a: 7.5, c: BLUE}, {ic: 'enfants', l: 'une famille', a: 8.98, c: ORANGE}, {ic: 'pousse', l: 'un avenir', a: 10.02, c: TEAL}];
  return (
    <Out end={12.2}>
      <HiLine words={['Jamais', 'à', 'la', 'légère']} mark={[0]} at={3.0} y={330} size={66} />
      <GlassCard x={60} y={440} w={960} h={290} at={2.9} c={NAVY}>
        <div style={{display: 'flex', alignItems: 'center', gap: 30, height: '100%', padding: '0 40px'}}>
          <div style={{transform: `scale(${1 + 0.06 * Math.sin(t * 4)})`, filter: `drop-shadow(0 0 ${16 + 10 * Math.sin(t * 4)}px ${BLUE})`}}><F n="bouclier" size={190} /></div>
          <div>
            <Mono at={3.2} c={DIM} size={26}>la sécurité au travail</Mono>
            <Kin text="une responsabilité" at={1.9} size={70} color={NAVY} stagger={0.03} />
          </div>
        </div>
      </GlassCard>
      <Abs x={60} y={770} w={960} h={260} style={{background: NIGHT, border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `8px 8px 0 ${RED}`, opacity: pop(t, 5.66), overflow: 'hidden'}}>
        <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#1F2A3D 2px, transparent 2px), linear-gradient(90deg, #1F2A3D 2px, transparent 2px)', backgroundSize: '40px 40px'}} />
        <svg width={960} height={260} style={{position: 'absolute', left: 0, top: 0}}>
          <polyline points={pts} fill="none" stroke={flat > 0 ? RED : '#3BE38B'} strokeWidth={6} strokeLinejoin="round" strokeDasharray={2400} strokeDashoffset={2400 * (1 - draw)} style={{filter: `drop-shadow(0 0 8px ${flat > 0 ? RED : '#3BE38B'})`}} />
        </svg>
        <div style={{position: 'absolute', left: 20, top: 14, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: flat > 0 ? RED : '#3BE38B'}}>{flat > 0 ? '● BOULEVERSÉ À JAMAIS' : '● DERRIÈRE CHAQUE ACCIDENT GRAVE'}</div>
      </Abs>
      {P3.map((x, k) => {
        const gray = prog(t, 11.1 + k * 0.08, 11.6 + k * 0.08);
        return (
          <GlassCard key={x.l} x={60 + k * 330} y={1070} w={300} h={300} at={x.a} c={x.c} tilt={gray * (k - 1) * 8}>
            <div style={{filter: `grayscale(${gray})`, opacity: 1 - gray * 0.4, height: '100%'}}><IcoLab ic={x.ic} l={x.l} size={130} fs={32} c={x.c} /></div>
          </GlassCard>
        );
      })}
    </Out>
  );
};

/* ═════════════ 2 · LE SCÉNARIO MACHINE ═════════════ */
const Machine: React.FC = () => {
  const t = useT();
  const ph2 = t >= 19.3;
  const alarm = t > 14.94 && t < 19.4 ? 0.5 + 0.5 * Math.sin(t * 18) : 0;
  const shake = t > 14.94 && t < 16.2 ? Math.sin(t * 70) * 10 * (1 - prog(t, 14.94, 16.2)) : 0;
  const hatch = prog(t, 17.42, 18.3, easeOut);
  const tilt = lerp(-14, 16, prog(t, 22.2, 23.4, easeInOut)) + (t > 23.4 ? Math.sin((t - 23.4) * 7) * 2 * (1 - prog(t, 23.4, 24.2)) : 0);
  return (
    <Out end={24.2}>
      <HiLine words={ph2 ? ['C’est', 'inacceptable', '!'] : ['Une', 'machine', 'démarre']} mark={ph2 ? [1] : [1, 2]} at={ph2 ? 19.34 : 13.9} y={330} size={64} />
      <div style={{position: 'absolute', inset: 0, transform: `translate(${shake}px, ${shake * 0.4}px)`}}>
        <Deep src="promo/hse-machine.jpg" x={60} y={440} w={960} h={560} at={13.86} pos="40% 40%">
          <div style={{position: 'absolute', inset: 0, background: `rgba(220,30,40,${alarm * 0.35})`, mixBlendMode: 'multiply'}} />
          {hatch > 0 && <div style={{position: 'absolute', left: 30, top: 60, width: 640 * hatch, height: 440, border: `10px solid ${YEL}`, borderImage: `repeating-linear-gradient(45deg, ${YEL} 0 22px, ${INK} 22px 44px) 10`, background: `${YEL}22`}} />}
          {hatch >= 1 && <div style={{position: 'absolute', left: 50, top: 74}}><Pill at={18.3} c={INK} size={26}>⚠ ZONE DANGEREUSE</Pill></div>}
          {t > 16.02 && (
            <div style={{position: 'absolute', left: 380, top: 170}}>
              <div style={{width: 90, height: 90, borderRadius: 45, border: `6px solid ${RED}`, transform: `scale(${1 + 0.4 * ((t * 1.6) % 1)})`, opacity: 1 - ((t * 1.6) % 1)}} />
              <div style={{position: 'absolute', left: 60, top: -20}}><Pill at={16.02} c={RED} size={24}>opérateur</Pill></div>
            </div>
          )}
        </Deep>
        <Abs x={60} y={1040} w={960} h={340} style={{opacity: ph2 ? 0 : pop(t, 14.94)}}>
          <div style={{position: 'absolute', inset: 0, background: NIGHT, border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `8px 8px 0 ${RED}`, overflow: 'hidden'}}>
            <div style={{position: 'absolute', inset: 0, background: `conic-gradient(from ${t * 600}deg at 160px 170px, rgba(230,40,40,0.55) 0deg, transparent 40deg, transparent 180deg, rgba(230,40,40,0.55) 180deg, transparent 220deg)`}} />
            <div style={{position: 'absolute', left: 90, top: 100, filter: `drop-shadow(0 0 ${30 * alarm}px ${RED})`}}><F n="gyrophare" size={140} /></div>
            {[0, 1].map((k) => <div key={k} style={{position: 'absolute', left: 300 + k * 110, top: 60 + k * 120, transform: `rotate(${(t - 14.94) * (k ? -240 : 300)}deg)`}}><F n="engrenage" size={110 - k * 20} /></div>)}
            <div style={{position: 'absolute', left: 520, top: 90, fontFamily: MONO, fontWeight: 700, fontSize: 30, color: '#FFB3B3'}}>DÉMARRAGE</div>
            <div style={{position: 'absolute', left: 520, top: 140, fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: alarm > 0.5 ? RED : '#fff'}}>SOUDAIN</div>
            <div style={{position: 'absolute', left: 520, top: 230, fontFamily: MONO, fontWeight: 700, fontSize: 24, color: '#9AA7BC'}}>opérateur encore à l’intérieur</div>
          </div>
        </Abs>
      </div>
      <Stamp at={19.4} c={RED} text="inacceptable" x={170} y={660} rot={-8} size={84} />
      {ph2 && (
        <Abs x={60} y={1030} w={960} h={360} style={{opacity: pop(t, 20.5)}}>
          <div style={{position: 'absolute', left: 470, top: 120, width: 20, height: 220, background: INK, borderRadius: 10}} />
          <div style={{position: 'absolute', left: 400, top: 320, width: 160, height: 30, background: INK, borderRadius: 10}} />
          <div style={{position: 'absolute', left: 80, top: 110, width: 800, height: 0, transform: `rotate(${tilt}deg)`}}>
            <div style={{position: 'absolute', left: 0, top: -8, width: 800, height: 16, background: INK, borderRadius: 8}} />
            {[{ic: 'usine', l: 'urgence de production', c: DIM, x: -60, a: 20.74, rot: -tilt}, {ic: 'coeur', l: 'une vie humaine', c: RED, x: 560, a: 22.06, rot: -tilt}].map((p) => (
              <div key={p.l} style={{position: 'absolute', left: p.x, top: 10, width: 300, transform: `rotate(${p.rot}deg)`, transformOrigin: '50% 0', opacity: pop(t, p.a)}}>
                <div style={{margin: '0 auto', width: 4, height: 40, background: INK}} />
                <div style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: '0 0 70px 70px', height: 190, padding: '0 10px', boxShadow: `6px 6px 0 ${p.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                  <div style={{transform: p.ic === 'coeur' ? `scale(${1 + 0.12 * Math.max(0, Math.sin(t * 9))})` : undefined}}><F n={p.ic} size={80} /></div>
                  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: p.c, textAlign: 'center', lineHeight: 1.05}}>{p.l}</div>
                </div>
              </div>
            ))}
          </div>
        </Abs>
      )}
    </Out>
  );
};

/* ═════════════ 3 · UNE SIMPLE VÉRIFICATION ═════════════ */
const CHK = ['aucune personne dans la zone', 'protecteurs en place', 'arrêt d’urgence opérationnel', 'feu vert du responsable'];
const Verif: React.FC = () => {
  const t = useT();
  const go = prog(t, 29.15, 29.4, easeOut);
  return (
    <Out end={30.1}>
      <HiLine words={['Une', 'simple', 'vérification']} mark={[1, 2]} at={25.9} y={330} size={64} />
      <SearchOpen x={60} y={440} w={960} h={940} at={25.9} query="vérification avant démarrage" results={['Planning de production', 'Vérification avant démarrage', 'Rapport d’accident']} found={1} foundAt={27.75} clickAt={28.15} c={ORANGE}>
        <div style={{position: 'absolute', left: 30, top: 26, width: 520, display: 'flex', flexDirection: 'column', gap: 16}}>
          {CHK.map((c, k) => <Check key={c} at={28.75 + k * 0.12} label={c} c={ORANGE} size={26} />)}
        </div>
        <div style={{position: 'absolute', right: 30, top: 26, width: 330, height: 420, borderRadius: 20, overflow: 'hidden', border: `4px solid ${INK}`}}>
          <Img src={PH('verites/operatrice-tablette.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.15 - 0.1 * prog(t, 28.6, 30.1)})`}} />
          <Shine at={29.0} />
        </div>
        <div style={{position: 'absolute', left: 160, right: 160, top: 520, height: 240, borderRadius: 120, background: go > 0 ? `radial-gradient(circle at 40% 30%, #8DF0B5, ${GREEN})` : '#E3E8EF', border: `7px solid ${INK}`, boxShadow: go > 0 ? `0 0 ${50 * go}px ${GREEN}, 0 ${12 - 8 * go}px 0 ${INK}` : `0 12px 0 ${INK}`, transform: `translateY(${go * 8}px)`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}>
          <F n={go > 0 ? 'check' : 'cadenas'} size={100} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: go > 0 ? '#fff' : DIM, lineHeight: 1}}>{go > 0 ? 'DÉMARRAGE OK' : 'DÉMARRAGE'}</div>
        </div>
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ 4 · LA PRÉVENTION ═════════════ */
const COL = [{ic: 'bouclier', l: 'la prévention', a: 31.5, c: TEAL}, {ic: 'cible', l: 'la maîtrise des risques', a: 32.42, c: BLUE}, {ic: 'clipboard', l: 'le respect des procédures', a: 33.54, c: VIO}];
const Prevention: React.FC = () => {
  const t = useT();
  const roof = Math.max(0, Math.min(1, spring(t, 34.7, 8, 12)));
  return (
    <Out end={35.5}>
      <HiLine words={['La', 'solution']} mark={[1]} at={31.8} y={330} size={66} />
      {t > 31.8 && <Blinds src="promo/formation-consignation.jpg" x={60} y={440} w={960} h={330} at={31.8} pos="50% 40%" />}
      <Abs x={60} y={800} w={960} h={100} style={{opacity: t >= 34.7 ? 1 : 0, transform: `translateY(${(1 - roof) * -220}px)`}}>
        <svg width={960} height={100}><polygon points="20,96 480,6 940,96" fill={NAVY} stroke={INK} strokeWidth={6} /></svg>
        <div style={{position: 'absolute', left: 0, right: 0, top: 48, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, letterSpacing: 6, color: '#fff'}}>SÉCURITÉ</div>
      </Abs>
      {COL.map((x, k) => {
        const rise = prog(t, Math.max(x.a, 31.85), Math.max(x.a, 31.85) + 0.5, easeOut);
        return (
          <Abs key={x.l} x={60 + k * 330} y={910} w={300} h={480} style={{overflow: 'hidden'}}>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 480 * rise, borderRadius: '16px 16px 0 0', background: `linear-gradient(90deg, ${x.c}CC, #fff 45%, ${x.c}CC)`, border: `5px solid ${INK}`, boxSizing: 'border-box', overflow: 'hidden', boxShadow: `0 0 30px ${x.c}55`}}>
              {[0.25, 0.5, 0.75].map((f) => <div key={f} style={{position: 'absolute', top: 0, bottom: 0, left: `${f * 100}%`, width: 3, background: '#0001'}} />)}
              <div style={{position: 'absolute', left: 0, right: 0, top: 30, display: 'flex', justifyContent: 'center'}}><Num n={k + 1} c={x.c} size={90} /></div>
              <div style={{position: 'absolute', left: 0, right: 0, top: 150, display: 'flex', justifyContent: 'center'}}><F n={x.ic} size={110} /></div>
              <div style={{position: 'absolute', left: 10, right: 10, top: 290, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, lineHeight: 1.1}}>{x.l}</div>
              <Shine at={Math.max(x.a, 31.85) + 0.5} />
            </div>
          </Abs>
        );
      })}
    </Out>
  );
};

/* ═════════════ 5 · CHAQUE VICTOIRE ═════════════ */
const Victoire: React.FC = () => {
  const t = useT();
  const tp = Math.max(0, Math.min(1, spring(t, 37.2, 7, 11)));
  const walk = prog(t, 39.06, 40.1, easeInOut);
  const home = pop(t, 40.14);
  return (
    <Out end={41.6}>
      <HiLine words={['Une', 'victoire']} mark={[1]} at={37.26} y={330} size={70} />
      <Abs x={290} y={430} w={500} h={460} style={{opacity: t >= 37.2 ? 1 : 0, transform: `scale(${0.4 + 0.6 * tp})`}}>
        <div style={{position: 'absolute', inset: -40, borderRadius: '50%', background: `repeating-conic-gradient(from ${t * 40}deg, ${GOLD}55 0 10deg, transparent 10deg 30deg)`, WebkitMaskImage: 'radial-gradient(circle, #000 40%, transparent 70%)'}} />
        <div style={{position: 'absolute', left: 60, top: 40, width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #fff, #FFF4C8 55%, #F3D36B)', border: `6px solid ${INK}`, boxShadow: `0 0 60px ${GOLD}AA`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
          <div style={{transform: `translateY(${Math.sin(t * 3) * 8}px)`}}><F n="trophee" size={230} /></div>
          <Shine at={37.6} every={1.6} />
        </div>
      </Abs>
      <Abs x={60} y={930} w={960} h={440} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 26, boxShadow: `8px 8px 0 ${GOLD}`, opacity: pop(t, 38.18), overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 18, top: 14}}><Mono at={38.3} c={DIM} size={22}>fin de poste · retour en bonne santé</Mono></div>
        <svg width={960} height={440} style={{position: 'absolute', left: 0, top: 0}}>
          <path d="M150 300 C 360 160, 600 420, 810 290" fill="none" stroke="#C9D2DF" strokeWidth={22} strokeLinecap="round" />
          <path d="M150 300 C 360 160, 600 420, 810 290" fill="none" stroke={GREEN} strokeWidth={10} strokeLinecap="round" strokeDasharray={760} strokeDashoffset={760 * (1 - walk)} />
        </svg>
        <div style={{position: 'absolute', left: 60, top: 180, textAlign: 'center'}}><F n="usine" size={140} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26}}>travail</div></div>
        <div style={{position: 'absolute', left: 740, top: 170, textAlign: 'center', transform: `scale(${1 + 0.15 * home * Math.max(0, Math.sin((t - 40.14) * 8)) * (1 - prog(t, 40.14, 41.0))})`, filter: home > 0 ? `drop-shadow(0 0 ${24 * home}px ${GREEN})` : undefined}}><F n="maison" size={150} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26}}>chez lui</div></div>
        {t > 39.0 && <div style={{position: 'absolute', left: lerp(170, 720, walk), top: 160 + Math.sin(walk * Math.PI * 2) * -50 + Math.abs(Math.sin(t * 14)) * -8}}><F n="ouvrier" size={100} /></div>}
        {home > 0 && <div style={{position: 'absolute', left: 820, top: 110, transform: `scale(${home})`}}><F n="coeur" size={70} /></div>}
      </Abs>
      <Stamp at={40.3} c={GREEN} text="une réussite" x={280} y={880} rot={-6} size={60} />
      {t > 37.3 && <Dust n={16} c={GOLD} />}
    </Out>
  );
};

/* ═════════════ 6 · NOTRE ENGAGEMENT ═════════════ */
const JOURS = ['LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI', 'DIMANCHE'];
const Engagement: React.FC = () => {
  const t = useT();
  const lock = prog(t, 43.5, 43.8, easeOut);
  const di = Math.floor(Math.max(0, t - 45.38) * 7) % 7;
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={['Pas', 'une', 'option']} mark={[1, 2]} at={43.2} y={330} size={66} />
      <GlassCard x={60} y={440} w={960} h={240} at={43.2} c={GREEN}>
        <div style={{position: 'absolute', left: 40, top: 70, fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: DIM}}><span style={{position: 'relative'}}>option ?<Strike p={prog(t, 43.5, 43.8)} c={RED} /></span></div>
        <div style={{position: 'absolute', left: 400, top: 60, width: 240, height: 120, borderRadius: 60, background: lerp(0, 1, lock) > 0.5 ? GREEN : '#E3E8EF', border: `5px solid ${INK}`}}>
          <div style={{position: 'absolute', left: lerp(10, 120, lock), top: 5, width: 100, height: 100, borderRadius: 50, background: 'radial-gradient(circle at 35% 30%, #fff, #C9D2DF)', border: `5px solid ${INK}`, boxSizing: 'border-box'}} />
        </div>
        <div style={{position: 'absolute', left: 670, top: 50, opacity: pop(t, 43.8), transform: `scale(${pop(t, 43.8)})`}}><F n="cadenas" size={130} /></div>
        <div style={{position: 'absolute', left: 790, top: 70, width: 150, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: GREEN, lineHeight: 1.1, opacity: pop(t, 43.9)}}>toujours activé</div>
      </GlassCard>
      {t > 43.3 && <Abs x={0} y={720} w={1080}><Board text="RESPONSABILITÉ" at={43.3} h={88} gap={3} c={GREEN} stag={0.03} /></Abs>}
      <Card x={60} y={890} w={420} h={480} at={45.38} c={BLUE}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30, gap: 14}}>
          <F n="calendrier" size={150} />
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: DIM}}>chaque jour</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: BLUE, transform: `rotateX(${((t - 45.38) * 7 % 1) * 90}deg)`}}>{JOURS[di]}</div>
          <div style={{display: 'flex', gap: 8}}>{JOURS.map((j, k) => <div key={j} style={{width: 34, height: 34, borderRadius: 8, background: t > 45.38 + k / 7 ? GREEN : '#E3E8EF', color: '#fff', fontWeight: 900, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{t > 45.38 + k / 7 ? '✓' : ''}</div>)}</div>
        </div>
      </Card>
      <Abs x={520} y={890} w={500} h={480} style={{borderRadius: 22, border: `5px solid ${INK}`, boxShadow: `8px 8px 0 ${GREEN}`, overflow: 'hidden', opacity: pop(t, 46.2)}}>
        <Img src={PH('personnages/equipe.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.15 - 0.1 * prog(t, 46.2, OUTRO_AT)})`}} />
        <Shine at={46.5} />
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center'}}><Pill at={46.3} c={GREEN} size={30}>chacun d’entre nous</Pill></div>
      </Abs>
      {t > ALLDONE && <Dust n={22} c={GOLD} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.05, 4, 0.09, 'sfx/ding', 0.12), {at: x.at + 0.25, s: 'soft-whoosh', v: 0.45, dur: 0.8}, {at: x.at + 0.48, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.45, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: at + 0.35 + len * 0.05, s: 'sfx/pop', v: 0.25}, ...rep(at + 0.8 + len * 0.05, 3, 0.12, 'sfx/pop', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const shine = (a: number): Sfx => ({at: a, s: 'soft-whoosh', v: 0.18, dur: 0.8});
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, ...flaps(0.1, 10), {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.slice(1).flatMap(trans), ...SECT.map((x) => ({at: x.at + 0.8, s: 'validation', v: 0.18})), {at: ALLDONE, s: 'validation', v: 0.35},
  {at: 2.9, s: 'sfx/rise', v: 0.2, dur: 1.2}, shine(3.2), {at: 5.66, s: 'sfx/whoosh', v: 0.22}, ...[6.3, 7.22, 8.14, 9.06, 9.98, 10.9].flatMap((a) => [{at: a, s: 'sfx/thud', v: 0.18}, {at: a + 0.16, s: 'sfx/thud', v: 0.12}]),
  ...[7.5, 8.98, 10.02].map((a) => ({at: a, s: 'sfx/pop', v: 0.25})), {at: 11.0, s: 'deep-hit', v: 0.35},
  {at: 13.86, s: 'sfx/whoosh', v: 0.25}, {at: 14.94, s: 'alarme', v: 0.08, dur: 1.4}, {at: 14.96, s: 'bass-hit', v: 0.35}, ...rep(15.0, 10, 0.1, 'tick', 0.12), {at: 16.02, s: 'sfx/ding', v: 0.22}, {at: 17.42, s: 'sfx/swish', v: 0.3}, {at: 18.3, s: 'sfx/pop', v: 0.22},
  {at: 19.4, s: 'tampon', v: 0.6}, {at: 19.42, s: 'deep-hit', v: 0.35}, {at: 20.74, s: 'sfx/pop', v: 0.22}, {at: 22.06, s: 'sfx/pop', v: 0.22}, {at: 22.3, s: 'sfx/rise', v: 0.2, dur: 1}, {at: 23.4, s: 'sfx/thud', v: 0.35},
  ...searchCues(25.9, 28, 27.75, 28.15), ...[28.75, 28.87, 28.99, 29.11].map((a) => ({at: a + 0.2, s: 'sfx/ding', v: 0.2})), {at: 29.15, s: 'sfx/click', v: 0.5}, {at: 29.2, s: 'validation', v: 0.35},
  {at: 31.8, s: 'soft-whoosh', v: 0.35, dur: 1}, ...[31.85, 32.42, 33.54].map((a) => ({at: a, s: 'sfx/rise', v: 0.2, dur: 0.6})), {at: 35.0, s: 'sfx/thud', v: 0.45}, {at: 35.02, s: 'bass-hit', v: 0.25},
  {at: 37.2, s: 'sfx/rise', v: 0.25, dur: 1}, {at: 37.3, s: 'notification', v: 0.25}, shine(37.6), {at: 38.18, s: 'sfx/whoosh', v: 0.22}, ...rep(39.1, 9, 0.12, 'sfx/click', 0.08), {at: 40.14, s: 'sfx/ding', v: 0.3}, {at: 40.3, s: 'tampon', v: 0.55},
  {at: 43.2, s: 'sfx/whoosh', v: 0.22}, {at: 43.5, s: 'stylo', v: 0.3}, {at: 43.6, s: 'sfx/click', v: 0.5}, {at: 43.8, s: 'sfx/thud', v: 0.3}, ...flaps(43.3, 14), ...rep(45.38, 7, 1 / 7, 'sfx/click', 0.12), {at: 46.2, s: 'soft-whoosh', v: 0.3}, {at: 46.3, s: 'sfx/pop', v: 0.25},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Responsabilite2: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={12.25}><Responsabilite /></Gate>
    <Gate from={13.7} to={24.25}><Machine /></Gate>
    <Gate from={25.7} to={30.15}><Verif /></Gate>
    <Gate from={31.6} to={35.55}><Prevention /></Gate>
    <Gate from={37.0} to={41.65}><Victoire /></Gate>
    <Gate from={43.1} to={OUTRO_AT}><Engagement /></Gate>
    {SECT.slice(1).map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 1.8}><GyroF i={i + 1} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={47.5}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-responsabilite.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Gyro, Count, Kin, Brut, T, TitleBlock, Tile, BURG, GLASS, random, Win, YEL];
