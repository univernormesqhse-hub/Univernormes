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
 * « Le superviseur HSE » (52 s) — capsule « condensé + effet wahou + ultra premium » présentée en métro : 7 stations
 * (sain et sauf → terrain → inspections → permis → urgence → action → bouclier) desservies par la rame réaliste.
 * Voix d'origine (sans musique de fond), sous-titres calés mot à mot. Couverture : « HSE » en lettres-photos détourées
 * comme la charte « L'INDUCTION HSE ». Fil rouge : tube pneumatique à six guichets calés sur les vraies parties de la
 * vidéo (mission → terrain → permis → urgence → distinction → bouclier) ; gyrophare éclair à chaque partie, capsule
 * pneumatique plein écran pour la distinction, loupe qui traque les dangers, store vénitien sur le bouclier final.
 */
const IMG = {
  cH: 'heures-gen/equipe-chantier.jpg',
  cS: 'metroiso-gen/terrain.jpg',
  cE: 'influence-gen/controleur.jpg',
  cSup: 'metroiso-gen/sst.jpg',
  mission: 'heures-gen/equipe-chantier.jpg',
  terrain: 'diag-gen/accidents.jpg',
  responsable: 'diag-gen/responsable.jpg',
  superviseur: 'influence-gen/controleur.jpg',
  bouclier: 'metroiso-gen/sst.jpg',
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
const OUTRO_AT = 52.5;
export const SUPERVISEUR_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 2.3, n: '1', title: 'La mission', s: 'sain et sauf', c: GREEN, g: 'mission', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 7.98, n: '2', title: 'Sur le terrain', s: 'omniprésent', c: BLUE, g: 'terrain', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 16.42, n: '3', title: 'Le permis de travail', s: 'le dernier mot', c: RED, g: 'permis', k: 'gyro', lab: 'PARTIE 3 / 6'},
  {at: 25.22, n: '4', title: 'Urgence & déchets', s: 'il orchestre', c: ORANGE, g: 'urgence', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 30.26, n: '5', title: 'Superviseur ≠ responsable', s: 'ne pas confondre', c: VIO, g: 'distinction', k: 'tube', lab: 'PARTIE 5 / 6'},
  {at: 43.94, n: '6', title: 'Le bouclier', s: 'la théorie en action', c: TEAL, g: 'bouclier', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 51.4;
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
  {n: 1, l: 'Chacun rentre sain et sauf', s: 'sain et sauf', at: 5.54},
  {n: 2, l: 'Omniprésent sur le terrain', s: 'terrain', at: 10.34},
  {n: 3, l: 'Inspections & gestes corrigés', s: 'inspections', at: 13.3},
  {n: 4, l: 'Le permis de travail validé', s: 'permis', at: 23.14},
  {n: 5, l: 'Exercices d’urgence & tri', s: 'urgence', at: 26.18},
  {n: 6, l: 'Il vit dans l’action', s: 'action', at: 38.7},
  {n: 7, l: 'Un bouclier protecteur', s: 'bouclier', at: 49.38},
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
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE HSE · STATION {r.n} / 7</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
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
const HSEWord: React.FC<{size: number; at?: number}> = ({size, at = -1}) => {
  const t = useT();
  return (
    <div style={{display: 'flex', justifyContent: 'center', gap: size * 0.08}}>
      {[{ch: 'H', src: IMG.cH, l: 'SANTÉ', pos: '35% 40%'}, {ch: 'S', src: IMG.cS, l: 'SÉCURITÉ', pos: '30% 30%'}, {ch: 'E', src: IMG.cE, l: 'ENVIRONNEMENT', pos: '40% 30%'}].map((x, k) => (
        <div key={x.ch} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: at < 0 ? 1 : pop(t, at + k * 0.15), transform: `translateY(${at < 0 ? 0 : (1 - pop(t, at + k * 0.15)) * 60}px)`}}>
          <PhotoLetter ch={x.ch} src={x.src} size={size} pos={x.pos} />
          <div style={{marginTop: size * 0.12, fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.105, color: NAVY, letterSpacing: 0.5, whiteSpace: 'nowrap'}}>{x.l}</div>
        </div>
      ))}
    </div>
  );
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: `radial-gradient(circle at 50% 45%, #FFFFFF, #F1EFEA 70%)`, opacity: 1 - out}}>
      <Watermark />
      <Abs x={0} y={110} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Img src={staticFile(LOGO)} style={{height: 150, display: 'block'}} /></Abs>
      <Abs x={0} y={320} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetter ch="LE" src={IMG.cS} size={170} pos="50% 30%" ls={2} /></Abs>
      <Abs x={0} y={495} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetter ch="SUPERVISEUR" src={IMG.cSup} size={136} pos="50% 35%" ls={0} /></Abs>
      <Abs x={0} y={690} w={1080}><HSEWord size={345} /></Abs>
      <Abs x={0} y={1300} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 3, color: '#fff', background: NAVY, padding: '10px 26px', borderRadius: 8}}>L’ŒIL DE LA SÉCURITÉ SUR LE TERRAIN</div></Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ 1 · LA MISSION ═════════════ */
const Mission: React.FC = () => {
  const t = useT();
  const walk = prog(t, 4.0, 7.4, easeInOut);
  return (
    <Out end={7.98}>
      <HiLine words={['Son', 'seul', 'objectif']} mark={[1, 2]} at={2.35} y={330} size={70} />
      <Abs x={60} y={440} w={960} h={340}><HSEWord size={250} at={2.6} /></Abs>
      <Abs x={60} y={830} w={960} h={540} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${GREEN}`, opacity: pop(t, 3.6), overflow: 'hidden'}}>
        <svg width={948} height={528} style={{position: 'absolute', left: 0, top: 0}}><path d="M 140 330 C 300 200, 600 460, 800 300" fill="none" stroke="#C9D2DF" strokeWidth={14} strokeDasharray="4 24" strokeLinecap="round" /><path d="M 140 330 C 300 200, 600 460, 800 300" fill="none" stroke={GREEN} strokeWidth={14} strokeLinecap="round" strokeDasharray={800} strokeDashoffset={800 * (1 - walk)} /></svg>
        <div style={{position: 'absolute', left: 40, top: 230}}><F n="chantier" size={170} /></div>
        <div style={{position: 'absolute', left: 740, top: 190, transform: `scale(${1 + 0.15 * prog(t, 7.2, 7.6) * (1 - prog(t, 7.6, 7.9))})`}}><F n="maison" size={180} /></div>
        <div style={{position: 'absolute', left: lerp(150, 720, walk), top: lerp(220, 200, walk) + Math.abs(Math.sin(walk * 30)) * -16}}><F n="ouvrier" size={110} /></div>
        <div style={{position: 'absolute', left: 30, top: 30}}><Pill at={3.94} c={NAVY} size={30}>chaque travailleur</Pill></div>
        {t > 5.54 && <div style={{position: 'absolute', right: 30, top: 30, display: 'flex', alignItems: 'center', gap: 10, background: GREEN, borderRadius: 40, padding: '8px 22px', transform: `scale(${spring(t, 5.54)})`}}><span style={{fontSize: 34, color: '#fff', fontWeight: 900}}>✓</span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: '#fff'}}>sain et sauf</span></div>}
      </Abs>
    </Out>
  );
};

/* ═════════════ 2 · SUR LE TERRAIN ═════════════ */
const Terrain: React.FC = () => {
  const t = useT();
  const ph = t < 10.3 ? 0 : 1;
  const DANGERS = [{x: 250, y: 380, a: 12.5}, {x: 620, y: 300, a: 12.9}, {x: 480, y: 480, a: 13.2}];
  return (
    <Out end={16.42}>
      <HiLine words={t < 12.1 ? ['Omniprésent', 'sur', 'le', 'terrain'] : ['Il', 'traque', 'les', 'dangers']} mark={t < 12.1 ? [0, 3] : [1, 3]} at={t < 12.1 ? 10.34 : 12.14} y={330} size={62} />
      {ph === 0 ? (
        <Abs x={60} y={440} w={960} h={930}>
          <div style={{position: 'absolute', left: 230, top: 80, width: 500, height: 420, borderRadius: 30, background: '#fff', border: `6px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 8.4)}}><F n="homme-bureau" size={220} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>au bureau</div></div>
          {t > 9.4 && <div style={{position: 'absolute', left: 230, top: 80, width: 500, height: 420, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 420, fontWeight: 900, color: RED, opacity: 0.85, transform: `scale(${spring(t, 9.4)})`}}>✕</div>}
          <div style={{position: 'absolute', left: 0, right: 0, top: 580, textAlign: 'center'}}><Pill at={9.6} c={RED} size={34}>il ne reste pas au bureau</Pill></div>
        </Abs>
      ) : (
        <>
          <Shot src={IMG.terrain} ic="chantier" x={60} y={440} w={960} h={620} at={10.4} c={BLUE}>
            {DANGERS.map((d, k) => <div key={k} style={{position: 'absolute', left: d.x - 50, top: d.y - 50, width: 100, height: 100, borderRadius: 50, border: `6px solid ${RED}`, boxShadow: `0 0 20px ${RED}`, opacity: pop(t, d.a), transform: `scale(${1 + 0.15 * Math.sin(t * 9 + k)})`}}><div style={{position: 'absolute', right: -20, top: -20, width: 40, height: 40, borderRadius: 20, background: RED, color: '#fff', fontWeight: 900, fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>!</div></div>)}
            <LoupeSweep x0={80} y0={260} x1={540} y1={250} a={12.1} b={13.4} size={230} />
          </Shot>
          <Abs x={60} y={1090} w={960} h={130} style={{display: 'flex', gap: 18}}>
            <div style={{flex: 1, borderRadius: 22, background: '#fff', border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', gap: 12, padding: '0 18px', opacity: pop(t, 13.3)}}><F n="clipboard" size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>inspections</span></div>
            <div style={{flex: 1.3, borderRadius: 22, background: NIGHT, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', gap: 12, padding: '0 18px', opacity: pop(t, 14.54)}}><div style={{width: 22, height: 22, borderRadius: 11, background: RED, opacity: Math.sin(t * 10) > 0 ? 1 : 0.3}} /><span style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: RED}}>LIVE</span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff'}}>gestes corrigés</span></div>
          </Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ 3 · LE PERMIS DE TRAVAIL ═════════════ */
const Permis: React.FC = () => {
  const t = useT();
  const ok = t > 23.14;
  const sign = prog(t, 23.2, 24.0);
  return (
    <Out end={25.22}>
      <HiLine words={t < 22.9 ? ['Le', 'dernier', 'mot'] : ['Permis', 'validé']} mark={t < 22.9 ? [1, 2] : [0, 1]} at={t < 22.9 ? 18.02 : 23.14} y={330} size={70} />
      <SearchOpen x={60} y={440} w={960} h={930} at={16.6} query="permis de travail" results={['Fiche de poste', 'Permis de travail', 'Plan d’urgence']} found={1} foundAt={17.7} clickAt={18.0} c={RED}>
        <div style={{position: 'absolute', inset: 0, padding: 26}}>
          <div style={{display: 'flex', gap: 16}}>
            {[{l: 'Soudure', ic: 'etincelles', a: 19.74}, {l: 'Levage', ic: 'grue', a: 20.38}, {l: 'Espace confiné', ic: 'porte', a: 21.1}].map((x) => <div key={x.l} style={{flex: 1, height: 300, borderRadius: 24, background: '#fff', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${ok ? GREEN : RED}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: pop(t, x.a), position: 'relative'}}><F n={x.ic} size={110} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK}}>{x.l}</div><div style={{position: 'absolute', top: 12, right: 12, padding: '4px 10px', borderRadius: 8, background: ok ? GREEN : RED, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 16}}>{ok ? 'GO ✓' : 'STOP'}</div></div>)}
          </div>
          <div style={{position: 'absolute', left: 120, right: 120, top: 350, height: 345, background: '#FFFDF6', border: `5px solid ${INK}`, borderRadius: 16, boxShadow: '0 20px 40px rgba(0,0,0,0.15)', opacity: pop(t, 22.6), transform: `translateY(${(1 - pop(t, 22.6)) * 200}px)`}}>
            <div style={{position: 'absolute', left: 30, top: 24, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>PERMIS DE TRAVAIL</div>
            {[0, 1, 2, 3].map((k) => <div key={k} style={{position: 'absolute', left: 30, right: 30, top: 70 + k * 40, height: 12, borderRadius: 6, background: '#E3E8EF'}} />)}
            <div style={{position: 'absolute', left: 30, top: 235, fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM}}>visa du superviseur HSE</div>
            <svg width={300} height={90} style={{position: 'absolute', left: 30, top: 250}}><path d="M 10 60 C 40 10, 60 80, 90 40 S 140 20, 160 55 S 220 70, 280 30" fill="none" stroke={BLUE} strokeWidth={6} strokeLinecap="round" strokeDasharray={400} strokeDashoffset={400 * (1 - sign)} /></svg>
            {t > 24.0 && <Stamp at={24.0} c={GREEN} text="VALIDÉ" x={360} y={190} rot={-10} size={60} />}
          </div>
        </div>
      </SearchOpen>
      <PneuDeliver x={60} y={1080} w={960} at={22.0} c={RED} />
    </Out>
  );
};

/* ═════════════ 4 · URGENCE & DÉCHETS ═════════════ */
const Urgence: React.FC = () => {
  const t = useT();
  return (
    <Out end={30.26}>
      <HiLine words={t < 27.6 ? ['Exercices', 'd’urgence'] : ['Tri', 'des', 'déchets']} mark={t < 27.6 ? [0, 1] : [0, 2]} at={t < 27.6 ? 26.18 : 27.66} y={330} size={70} />
      <Abs x={60} y={440} w={960} h={440} style={{background: NIGHT, border: `6px solid ${INK}`, borderRadius: 28, overflow: 'hidden', opacity: pop(t, 25.5)}}>
        {[0, 1, 2].map((k) => { const r = ((t * 1.4 + k / 3) % 1); return <div key={k} style={{position: 'absolute', left: 474 - r * 400, top: 200 - r * 400, width: r * 800, height: r * 800, borderRadius: '50%', border: `6px solid ${RED}`, opacity: 1 - r}} />; })}
        <div style={{position: 'absolute', left: 384, top: 110}}><F n="sirene" size={180} /></div>
        <div style={{position: 'absolute', left: 30, bottom: 30, display: 'flex', alignItems: 'center', gap: 12, background: GREEN, borderRadius: 14, padding: '8px 18px', opacity: pop(t, 26.6)}}><span style={{fontSize: 40, color: '#fff', fontWeight: 900}}>➜</span><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff'}}>point de rassemblement</span></div>
      </Abs>
      <Abs x={60} y={910} w={960} h={460} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${GREEN}`, opacity: pop(t, 27.6), overflow: 'hidden'}}>
        {[{c: BLUE, l: 'papier'}, {c: YEL, l: 'plastique'}, {c: RED, l: 'dangereux'}].map((b, k) => <div key={b.l} style={{position: 'absolute', left: 60 + k * 300, top: 220, width: 230, height: 210, background: b.c, border: `5px solid ${INK}`, borderRadius: '10px 10px 28px 28px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 20, boxSizing: 'border-box'}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: k === 1 ? INK : '#fff'}}>{b.l}</span></div>)}
        {[{ic: 'feuille', k: 0, a: 28.0}, {ic: 'goutte', k: 1, a: 28.4}, {ic: 'radioactif', k: 2, a: 28.8}].map((d) => <div key={d.ic} style={{position: 'absolute', left: 125 + d.k * 300, top: lerp(-120, 200, prog(t, d.a, d.a + 0.5, easeIn)), opacity: t > d.a && t < d.a + 0.55 ? 1 : 0}}><F n={d.ic} size={90} /></div>)}
        <div style={{position: 'absolute', left: 30, top: 24}}><Pill at={28.78} c={GREEN} size={28}>déchets industriels triés</Pill></div>
      </Abs>
    </Out>
  );
};

/* ═════════════ 5 · SUPERVISEUR ≠ RESPONSABLE ═════════════ */
const Versus: React.FC = () => {
  const t = useT();
  const right = pop(t, 37.86);
  return (
    <Out end={43.94}>
      <HiLine words={t < 37.8 ? ['Ne', 'pas', 'confondre'] : ['Il', 'vit', 'dans', 'l’action']} mark={t < 37.8 ? [2] : [1, 3]} at={t < 37.8 ? 33.6 : 38.7} y={330} size={66} />
      <Abs x={60} y={440} w={960} h={930}>
        {[{side: 0, title: 'Responsable HSE', src: IMG.responsable, ic: 'homme-bureau', c: NAVY, at: 33.54, items: [{l: 'pilote le système', ic: 'engrenage', a: 33.54}, {l: 'décortique les chiffres', ic: 'graphique', a: 35.34}, {l: 'conseille la direction', ic: 'directeur', a: 36.3}]}, {side: 1, title: 'Superviseur HSE', src: IMG.superviseur, ic: 'casque', c: GREEN, at: 37.86, items: [{l: 'observe', ic: 'yeux', a: 40.42}, {l: 'alerte', ic: 'megaphone', a: 41.18}, {l: 'fait appliquer les règles', ic: 'clipboard', a: 41.9}]}].map((p) => (
          <div key={p.side} style={{position: 'absolute', left: p.side * 490, top: 0, width: 470, height: 930, borderRadius: 28, background: '#fff', border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${p.c}`, overflow: 'hidden', opacity: p.side ? right : pop(t, 33.6), transform: p.side ? `translateX(${(1 - right) * 300}px)` : `scale(${lerp(1, 0.97, right)})`}}>
            <div style={{position: 'absolute', left: 0, top: 0}}><Pic src={p.src} ic={p.ic} w={458} h={330} pos="50% 25%" /></div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 300, textAlign: 'center'}}><span style={{background: p.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, padding: '8px 18px', borderRadius: 12}}>{p.title}</span></div>
            <div style={{position: 'absolute', left: 20, right: 20, top: 390, display: 'flex', flexDirection: 'column', gap: 16}}>
              {p.items.map((x) => <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 12, height: 130, borderRadius: 20, background: '#F4F6FA', border: `4px solid ${INK}`, padding: '0 14px', opacity: pop(t, x.a), transform: `translateY(${(1 - pop(t, x.a)) * 40}px)`}}><F n={x.ic} size={70} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, lineHeight: 1.1}}>{x.l}</span></div>)}
            </div>
          </div>
        ))}
        <div style={{position: 'absolute', left: 405, top: 230, width: 150, height: 150, borderRadius: 75, background: VIO, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: '#fff', zIndex: 3, transform: `scale(${t > 37.86 ? spring(t, 37.86) : 0}) rotate(${t > 37.86 && t < 38.4 ? Math.sin(t * 60) * 8 : 0}deg)`}}>≠</div>
      </Abs>
    </Out>
  );
};

/* ═════════════ 6 · LE BOUCLIER ═════════════ */
const Bouclier: React.FC = () => {
  const t = useT();
  const fly = prog(t, 48.1, 49.4, easeInOut);
  const dome = prog(t, 49.38, 50.4, easeOut);
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={t < 48.0 ? ['La', 'théorie', 'seule', '?'] : ['Théorie', '→', 'bouclier']} mark={t < 48.0 ? [1] : [0, 2]} at={t < 48.0 ? 44.0 : 48.14} y={330} size={70} />
      <Shot src={IMG.bouclier} ic="equipe" x={60} y={440} w={960} h={400} at={46.82} c={TEAL} blinds />
      <Abs x={60} y={870} w={960} h={500} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 28, boxShadow: `8px 8px 0 ${TEAL}`, opacity: pop(t, 44.2), overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 80, top: 80, opacity: 1 - fly, transform: `rotate(${fly * -20}deg)`}}><F n="livres" size={220} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, textAlign: 'center'}}>manuels de sécurité</div></div>
        {t > 45.02 && t < 48.1 && <Stamp at={45.02} c={RED} text="aucune vie sauvée seuls" x={240} y={60} rot={-6} size={36} />}
        {Array.from({length: 8}, (_, k) => <div key={k} style={{position: 'absolute', left: lerp(160, 600 + Math.cos(k) * 120, fly), top: lerp(180, 200 + Math.sin(k * 2) * 120, fly), width: 60, height: 76, background: '#FFFDF6', border: `3px solid ${INK}`, transform: `rotate(${k * 45 + fly * 200}deg)`, opacity: fly > 0 && fly < 1 ? 1 : 0}} />)}
        <div style={{position: 'absolute', left: 560, top: 200, width: 300, height: 260, display: 'flex', justifyContent: 'center', alignItems: 'flex-end'}}><F n="equipe" size={160} /></div>
        <div style={{position: 'absolute', left: 520, top: 230 - dome * 160, width: 380, height: 380 * dome, borderRadius: '190px 190px 20px 20px', border: `6px solid ${TEAL}`, background: `${TEAL}22`, boxShadow: `0 0 ${40 * dome}px ${TEAL}`, opacity: dome}} />
        <div style={{position: 'absolute', left: 640, top: 20, transform: `scale(${t > 49.38 ? spring(t, 49.38) : 0})`}}><F n="bouclier" size={130} /></div>
        {t > 50.5 && <div style={{position: 'absolute', left: 30, bottom: 24}}><Pill at={50.5} c={TEAL} size={30}>protège ses équipes</Pill></div>}
      </Abs>
      {t > 50.8 && <Dust n={22} c={GOLD} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flash = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.05, 4, 0.15, 'sfx/ding', 0.1), {at: x.at + 0.5, s: 'sfx/thud', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const pops = (L: number[], v = 0.2): Sfx[] => L.map((a) => ({at: a, s: 'sfx/pop', v}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.6}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 1.5},
  ...SECT.filter((x) => x.k === 'gyro').flatMap(flash), {at: SECT[4].at, s: 'soft-whoosh', v: 0.5, dur: 1.2}, {at: SECT[4].at + 0.78, s: 'sfx/thud', v: 0.45}, {at: SECT[4].at + 1.0, s: 'page', v: 0.4},
  {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.flatMap((r) => [{at: r.at, s: 'bass-hit', v: 0.3}, {at: r.at + 0.05, s: 'sfx/bell', v: 0.25}]),
  ...rep(2.6, 3, 0.15, 'sfx/thud', 0.25), {at: 3.94, s: 'sfx/pop', v: 0.2}, {at: 4.0, s: 'soft-whoosh', v: 0.2, dur: 3.4}, {at: 7.3, s: 'sfx/ding', v: 0.25},
  {at: 8.4, s: 'sfx/pop', v: 0.2}, {at: 9.4, s: 'deep-hit', v: 0.4}, {at: 10.4, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 12.1, s: 'soft-whoosh', v: 0.25, dur: 1.3}, ...[12.5, 12.9, 13.2].map((a) => ({at: a, s: 'alarme', v: 0.04, dur: 0.4})), ...pops([13.3, 14.54]),
  ...searchCues(16.6, 17, 17.7, 18.0), ...pops([19.74, 20.38, 21.1]), {at: 22.0, s: 'soft-whoosh', v: 0.4, dur: 0.8}, {at: 22.6, s: 'page', v: 0.3}, {at: 23.2, s: 'stylo', v: 0.4}, {at: 24.0, s: 'tampon', v: 0.55},
  {at: 25.5, s: 'alarme', v: 0.06, dur: 2}, {at: 26.6, s: 'sfx/swish', v: 0.25}, ...[28.0, 28.4, 28.8].map((a) => ({at: a + 0.5, s: 'sfx/thud', v: 0.3})), {at: 28.78, s: 'validation', v: 0.25},
  ...pops([33.54, 35.34, 36.3]), {at: 37.86, s: 'deep-hit', v: 0.4}, {at: 37.9, s: 'sfx/whoosh', v: 0.3}, ...pops([40.42, 41.18, 41.9]),
  {at: 44.2, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 45.02, s: 'tampon', v: 0.5}, {at: 46.82, s: 'soft-whoosh', v: 0.35, dur: 1}, ...rep(46.9, 10, 0.05, 'sfx/click', 0.12), {at: 48.1, s: 'sfx/rise', v: 0.3, dur: 1.3}, {at: 49.38, s: 'bass-hit', v: 0.4}, {at: 50.5, s: 'validation', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const SuperviseurHse: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={8.0}><Mission /></Gate>
    <Gate from={8.0} to={16.45}><Terrain /></Gate>
    <Gate from={16.45} to={25.25}><Permis /></Gate>
    <Gate from={25.25} to={30.3}><Urgence /></Gate>
    <Gate from={33.4} to={43.95}><Versus /></Gate>
    <Gate from={43.95} to={OUTRO_AT}><Bouclier /></Gate>
    {SECT.map((x, i) => (x.k === 'gyro' ? <Gate key={x.n} from={x.at} to={x.at + 1.7}><GyroFlash i={i} /></Gate> : <Gate key={x.n} from={x.at} to={x.at + 3.7}><Pneumatique i={i} /></Gate>))}
    <Gate from={5} to={52}><StationBanner /></Gate>
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={52.4}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-superviseur-hse-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Gyro, Loupe, Store, Kin, Brut, T, TitleBlock, Win, GLASS, Check, Tile, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, spring, LoupeSweep, PneuDeliver, Shine, Count, BURG, YEL, handFont, Board, random, Strike];
