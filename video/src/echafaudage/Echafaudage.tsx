import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Captions} from '../components/Captions';
import {Blinds, Board, Center, Cite, Deep, Dust, Kin, Out, Pill, Stamp, Tile} from '../durab/Durab';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {handFont, s, sansFont} from '../theme';
import {Abs, Bg, DIM, easeIn, easeInOut, easeOut, GREEN, INK, lerp, LOGO, PAPER, PH, pop, prog, RED, spring, T, useT} from '../implIso/kit';
import {Brut, HiLine, Mono, Strike} from '../tdbPilot/TdbPilot';
import {captions} from './captions';

/**
 * « Sécurité des échafaudages » (7 min 28) — capsule « ultime » : voix d'origine, sous-titres recalés mot à mot,
 * photos réelles, thème « papier quadrillé ».
 * Fil rouge : LE TUBE PNEUMATIQUE À SIX GUICHETS. L'en-tête est un tube de verre qui relie six guichets (risques →
 * équipements → prévention → protections → météo → réglementation) ; la capsule du dossier file d'un guichet à
 * l'autre à chaque partie et chaque guichet passé se coche.
 * Transitions alternées : LE PNEUMATIQUE (parties 1 et 4), LE GYROPHARE (2 et 5), LA LOUPE (3 et 6).
 * Briques : compteurs qui défilent (50 %, km/h), tuiles de bois, palettes d'affichage, fenêtres d'interface et store
 * vénitien, cartes néo-brutalistes, mot surligné jaune, photos en profondeur, tampons, poussière.
 * Nouvelles techniques : échafaudage qui s'assemble module par module, donut 50 %, tour roulante qui bascule quand on
 * grimpe par l'extérieur, vue de dessus des déplacements autorisés, silhouette du harnais qui répartit l'énergie, sas
 * de la barrière écluse, pieds qui s'enfoncent sans plaque, foudre sur la cage métallique, bâche qui gonfle comme une
 * voile, anémomètre à coupelles avec seuils 45 / 50 / 60 km/h.
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
const STEEL = '#8A97A8';
const MONO = '"JetBrains Mono", "IBM Plex Mono", "DejaVu Sans Mono", monospace';
const OUTRO_AT = 448.1;
export const ECHAF_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK}[] = [
  {at: 45.03, n: '1', title: 'Les risques liés', s: 'les dangers réels', c: RED, g: 'risques', k: 'tube'},
  {at: 117.21, n: '2', title: 'Les types d’échafaudages', s: 'des solutions adaptées', c: BLUE, g: 'équipements', k: 'gyro'},
  {at: 179.46, n: '3', title: 'Les mesures de prévention', s: 'les règles essentielles', c: ORANGE, g: 'prévention', k: 'loupe'},
  {at: 223.78, n: '4', title: 'Les protections', s: 'individuelles et collectives', c: TEAL, g: 'protections', k: 'tube'},
  {at: 295.54, n: '5', title: 'Les dangers météo', s: 'orage et vent', c: VIO, g: 'météo', k: 'gyro'},
  {at: 362.0, n: '6', title: 'Le cadre réglementaire', s: 'c’est la loi', c: NAVY, g: 'réglementation', k: 'loupe'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 420.0;

const Count: React.FC<{n: number; a: number; b: number; suf?: string}> = ({n, a, b, suf = ''}) => {
  const t = useT();
  return <>{Math.round(n * prog(t, a, b, easeOut))}{suf}</>;
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
const Tube: React.FC<{x: number; y: number; w: number; h: number; o?: number}> = ({x, y, w, h, o = 1}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: h / 2, background: `linear-gradient(180deg, rgba(255,255,255,0.9), ${GLASS}88 40%, ${GLASS}CC 75%, rgba(255,255,255,0.7))`, border: `3px solid ${GLASS}`, boxShadow: 'inset 0 6px 10px rgba(255,255,255,0.8), 0 10px 20px rgba(20,33,61,0.1)', opacity: o}} />
);
/** Fenêtre d'interface (barre à pastilles). */
const Win: React.FC<{x: number; y: number; w: number; h: number; at: number; title: string; c?: string; dark?: boolean; children: React.ReactNode}> = ({x, y, w, h, at, title, c = INK, dark, children}) => {
  const t = useT();
  const p = Math.max(0, Math.min(1, spring(t, at, 8, 13)));
  return (
    <Abs x={x} y={y} w={w} h={h} style={{background: dark ? NIGHT : '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `8px 8px 0 ${c}`, overflow: 'hidden', opacity: t >= at ? 1 : 0, transform: `translateY(${(1 - p) * 60}px) scale(${0.92 + 0.08 * p})`}}>
      <div style={{height: 44, background: dark ? '#0E1320' : '#EEF1F5', display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 14, borderBottom: `3px solid ${INK}`}}>{[RED, YEL, GREEN].map((q) => <div key={q} style={{width: 13, height: 13, borderRadius: 7, background: q}} />)}<span style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: dark ? '#8B95A8' : DIM, marginLeft: 10}}>{title}</span></div>
      <div style={{position: 'relative', height: h - 49}}>{children}</div>
    </Abs>
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
  return (
    <AbsoluteFill style={{zIndex: 35, opacity: bg}}>
      <AbsoluteFill style={{background: '#F3F7FB'}} />
      <AbsoluteFill style={{backgroundImage: 'linear-gradient(#DDE7F1 2px, transparent 2px), linear-gradient(90deg, #DDE7F1 2px, transparent 2px)', backgroundSize: '60px 60px', opacity: 0.8}} />
      <Tube x={-40} y={560} w={1160} h={120} />
      {unroll > 0 && (
        <div style={{position: 'absolute', left: 140, top: 650, width: 800, height: H * unroll, overflow: 'hidden', background: 'linear-gradient(90deg, #EFE3C2, #FBF4DF 12%, #FBF4DF 88%, #EFE3C2)', boxShadow: '0 30px 60px rgba(20,33,61,0.25)'}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 60, textAlign: 'center'}}><div style={{display: 'inline-block', padding: '8px 24px', border: `6px solid ${S0.c}`, borderRadius: 12, color: S0.c, fontFamily: sansFont, fontWeight: 900, fontSize: 38, letterSpacing: 3, transform: 'rotate(-4deg)', opacity: prog(t, S0.at + 1.3, S0.at + 1.45)}}>DOSSIER N°{S0.n}</div></div>
          <div style={{position: 'absolute', left: 40, right: 40, top: 190, textAlign: 'center'}}><Kin text={S0.title} at={S0.at + 1.35} size={S0.title.length > 20 ? 60 : 76} /></div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 470, display: 'flex', justifyContent: 'center', gap: 10}}>{S0.g.toUpperCase().slice(0, 7).split('').map((ch, j) => <div key={j} style={{transform: `scale(${Math.max(0, Math.min(1, spring(t, S0.at + 1.6 + j * 0.06, 8, 12)))})`}}><Tile ch={ch} size={72} c={S0.c} /></div>)}</div>
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
  return (
    <AbsoluteFill style={{zIndex: 35, opacity: inn, overflow: 'hidden'}}>
      <AbsoluteFill style={{background: PAPER}} />
      <Bg />
      <AbsoluteFill style={{background: `conic-gradient(from ${k * 520}deg at 540px 300px, rgba(31,111,209,0.38) 0deg, transparent 26deg, transparent 180deg, rgba(31,111,209,0.38) 180deg, transparent 206deg)`, opacity: 1 - prog(t, S0.at + 1.6, S0.at + 2.4)}} />
      <div style={{position: 'absolute', left: 470, top: 250, width: 140, height: 90, borderRadius: '70px 70px 12px 12px', background: `radial-gradient(circle at 50% 40%, #fff, ${BLUE} 60%)`, border: `5px solid ${INK}`, boxShadow: `0 0 ${40 + 30 * Math.abs(Math.sin(k * 9))}px ${BLUE}`}} />
      <div style={{position: 'absolute', left: -400, top: 760, width: 1900, height: 260, transform: `translateX(${lerp(-1900, 0, band)}px) rotate(-8deg)`, background: `repeating-conic-gradient(${NAVY} 0 25%, ${YEL} 0 50%) 0 0 / 130px 130px`, border: `8px solid ${INK}`}} />
      <div style={{position: 'absolute', left: 110, top: 740, width: 860, height: 300, transform: `rotate(-8deg) scale(${Math.max(0, Math.min(1, spring(t, S0.at + 0.9, 8, 12)))})`, background: '#fff', border: `7px solid ${INK}`, borderRadius: 24, boxShadow: `12px 12px 0 ${S0.c}`, display: 'flex', alignItems: 'center', gap: 26, padding: '0 30px', boxSizing: 'border-box'}}>
        <div style={{width: 150, height: 150, borderRadius: 75, background: S0.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 96, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{S0.n}</div>
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM, letterSpacing: 3}}>PARTIE {S0.n} / 6</div><Kin text={S0.title} at={S0.at + 1.1} size={S0.title.length > 20 ? 46 : 58} /></div>
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

/* ═════════════ Échafaudage dessiné qui s'assemble ═════════════ */
const Scaffold: React.FC<{w: number; h: number; at: number; dur?: number; cols?: number; rows?: number; wheels?: boolean; guard?: boolean}> = ({w, h, at, dur = 2.5, cols = 3, rows = 4, wheels, guard = true}) => {
  const t = useT();
  const cw = w / cols, rh = (h - (wheels ? 40 : 10)) / rows;
  const els: React.ReactNode[] = [];
  let n = 0;
  const total = (cols + 1) * rows + cols * rows * 2;
  const vis = (i: number) => prog(t, at + (i / total) * dur, at + (i / total) * dur + 0.25);
  for (let r = 0; r < rows; r++) {
    const y0 = h - (wheels ? 40 : 10) - (r + 1) * rh;
    for (let c = 0; c <= cols; c++) {const p = vis(n++); els.push(<line key={`v${r}${c}`} x1={c * cw} y1={y0 + rh} x2={c * cw} y2={y0 + rh - rh * p} stroke={STEEL} strokeWidth={8} strokeLinecap="round" />);}
    for (let c = 0; c < cols; c++) {
      const p = vis(n++); els.push(<rect key={`p${r}${c}`} x={c * cw + 4} y={y0 - 6} width={(cw - 8) * p} height={12} fill="#C9A26A" stroke={BURG} strokeWidth={2} />);
      const q = vis(n++); els.push(<line key={`d${r}${c}`} x1={c * cw} y1={y0 + rh} x2={c * cw + cw * q} y2={y0 + rh - rh * q} stroke={STEEL} strokeWidth={4} opacity={0.7} />);
    }
    if (guard && r === rows - 1) els.push(<line key="g" x1={0} y1={y0 - 40} x2={w * prog(t, at + dur, at + dur + 0.4)} y2={y0 - 40} stroke={ORANGE} strokeWidth={8} />);
  }
  return (
    <svg width={w} height={h} style={{overflow: 'visible'}}>
      {els}
      {wheels && [0, cols].map((c) => <circle key={c} cx={c * cw} cy={h - 20} r={18} fill={INK} stroke="#fff" strokeWidth={4} opacity={prog(t, at, at + 0.3)} />)}
    </svg>
  );
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('epiepc/echafaudage.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 860, objectFit: 'cover', objectPosition: '50% 40%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 32%, ${PAPER}DD 40%, ${PAPER} 44%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={700} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>PROTOCOLES QHSE · TRAVAIL EN HAUTEUR</div>
        <div style={{marginTop: 20}}><Board text="SECURITE" at={-1} h={96} c={RED} stag={0.03} /></div>
        <T size={70} style={{marginTop: 14, textTransform: 'uppercase', letterSpacing: -1}}>des</T>
        <div style={{display: 'flex', justifyContent: 'center', gap: 6, marginTop: 8}}>{'ÉCHAFAUDAGES'.split('').map((c, i) => <Tile key={i} ch={c} size={78} c={NAVY} />)}</div>
      </Abs>
      <Abs x={60} y={1290} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={RED} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 70, width: 140, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const grim = prog(t, 11.0, 12.4);
  return (
    <Out end={29.8}>
      <HiLine words={['Une', 'merveille', 'd’ingénierie', 'modulaire']} mark={[1]} at={7.4} y={330} size={46} />
      {t < 18.7 && (
        <>
          <Abs x={70} y={450} w={460} h={640}><Scaffold w={420} h={600} at={3.0} dur={4.5} /></Abs>
          <Deep src="zones/chantier.jpg" x={560} y={450} w={450} h={640} at={4.0} pos="50% 40%" filter={`grayscale(${grim * 0.8}) contrast(${1 + grim * 0.15})`}>
            <div style={{position: 'absolute', left: 14, top: 14}}><Mono at={4.2} c={INK} size={18}>structure temporaire</Mono></div>
          </Deep>
          <Stamp at={16.6} c={RED} text="accidents graves" x={250} y={1130} rot={-5} size={54} />
        </>
      )}
      {t >= 18.7 && (
        <>
          <Abs x={0} y={460} w={1080} style={{opacity: pop(t, 18.8)}}><Board text="PROTOCOLES QHSE" at={18.9} h={70} c={INK} stag={0.035} /></Abs>
          <Abs x={70} y={610} w={940} style={{display: 'flex', flexDirection: 'column', gap: 18}}>
            {[{l: 'décortiquer les protocoles', ic: 'loupe', a: 20.6, c: BLUE}, {l: 'comprendre les risques', ic: 'danger', a: 23.5, c: RED}, {l: 'l’ingénierie de la prévention', ic: 'engrenage', a: 26.1, c: ORANGE}].map((x, k) => (
              <Brut key={k} x={0} y={0} w={940} h={130} at={x.a} sh={x.c} style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 20}}><F n={x.ic} size={80} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK}}>{x.l}</div></Brut>
            ))}
          </Abs>
          <Abs x={0} y={1110} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 56, color: GREEN, opacity: pop(t, 27.3)}}>protéger les vies humaines</Abs>
        </>
      )}
    </Out>
  );
};
const Plan: React.FC = () => {
  return (
    <Out end={45.1}>
      <HiLine words={['Six', 'étapes', 'clés']} mark={[0]} at={32.1} y={320} size={64} />
      {SECT.map((x, k) => (
        <Brut key={k} x={70 + (k % 2) * 480} y={440 + Math.floor(k / 2) * 230} w={460} h={200} at={[34.5, 36.1, 37.6, 39.1, 40.1, 43.6][k]} sh={x.c} style={{display: 'flex', alignItems: 'center', gap: 16, padding: 18}}>
          <Tile ch={x.n} size={80} c={x.c} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK, lineHeight: 1.1}}>{x.title.replace(/^(Les |Le )/, '')}</div>
        </Brut>
      ))}
    </Out>
  );
};

/* ═════════════ PARTIE 1 ═════════════ */
const Anodin: React.FC = () => {
  const t = useT();
  const R = [{l: 'en hauteur', ic: 'echelle', a: 54.5}, {l: 'la gravité', ic: 'effondre', a: 56.0}, {l: 'les éléments', ic: 'vent', a: 57.1}, {l: 'corps de métier croisés', ic: 'equipe', a: 58.0}];
  return (
    <Out end={64.6}>
      <HiLine words={['Jamais', 'anodin']} mark={[1]} at={52.9} y={320} size={70} />
      <Abs x={340} y={440} w={400} h={620}><Scaffold w={400} h={600} at={49.0} dur={3} /></Abs>
      {R.map((r, k) => (
        <div key={k} style={{position: 'absolute', left: k % 2 ? 690 : 60, top: 470 + Math.floor(k / 2) * 300, width: 330, display: 'flex', alignItems: 'center', gap: 12, background: '#fff', border: `4px solid ${INK}`, borderRadius: 16, padding: '14px 16px', boxShadow: `6px 6px 0 ${RED}`, opacity: pop(t, r.a), transform: `translateX(${(1 - pop(t, r.a)) * (k % 2 ? 60 : -60)}px)`}}>
          <F n={r.ic} size={60} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK}}>{r.l}</div>
        </div>
      ))}
      <Stamp at={63.5} c={RED} text="elle ne pardonne pas" x={210} y={1130} rot={-5} size={50} />
    </Out>
  );
};
const Moitie: React.FC = () => {
  const t = useT();
  const d = prog(t, 65.8, 67.6, easeOut);
  return (
    <Out end={88.8}>
      <HiLine words={['Un', 'chiffre', 'sidérant']} mark={[2]} at={67.3} y={320} size={64} />
      <Abs x={70} y={440} w={940} h={520} style={{display: 'flex', alignItems: 'center', gap: 30}}>
        <div style={{position: 'relative', width: 440, height: 440}}>
          <svg width={440} height={440}><circle cx={220} cy={220} r={170} fill="none" stroke="#E3E8EF" strokeWidth={60} /><circle cx={220} cy={220} r={170} fill="none" stroke={RED} strokeWidth={60} strokeDasharray={1068} strokeDashoffset={1068 * (1 - 0.5 * d)} transform="rotate(-90 220 220)" /></svg>
          <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 110, color: RED}}><Count n={50} a={65.8} b={67.6} suf="%" /></div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: DIM}}>près de</div></div>
        </div>
        <Win x={470} y={0} w={470} h={440} at={69.2} title="inspection-du-travail" c={RED}>
          <div style={{padding: 20}}>
            <div style={{display: 'flex', justifyContent: 'center'}}><F n="clipboard" size={110} /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, textAlign: 'center', marginTop: 10}}>des manquements relevés</div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14}}><Mono at={72.9} c={RED} size={18}>mauvais état</Mono><Mono at={74.1} c={RED} size={18}>utilisation incorrecte</Mono></div>
          </div>
        </Win>
      </Abs>
      <Cite y={980} at={66.0} text="« près de 50 % » : chiffre cité par la vidéo d’origine" />
      <Abs x={0} y={1040} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={76.6} c={RED} size={34}>la moitié</Pill><Pill at={80.4} c={INK} size={30}>défaillance systémique</Pill></Abs>
      <Stamp at={86.6} c={GREEN} text="non négociable" x={290} y={1150} rot={-5} size={54} />
    </Out>
  );
};
const Causes: React.FC = () => {
  const t = useT();
  const split = prog(t, 93.6, 95.0, easeInOut);
  const fall = prog(t, 97.0, 98.6, easeIn);
  return (
    <Out end={117.25}>
      <HiLine words={['Les', 'causes', 'd’accident']} mark={[1]} at={89.7} y={320} size={62} />
      <Abs x={70} y={440} w={940} h={130} style={{display: 'flex', border: `5px solid ${INK}`, borderRadius: 18, overflow: 'hidden', boxShadow: `7px 7px 0 ${INK}`, opacity: pop(t, 92.1)}}>
        <div style={{width: `${lerp(0, 50, split)}%`, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden'}}>chutes · <Count n={50} a={93.6} b={95.0} suf=" %" /></div>
        <div style={{flex: 1, background: '#E3E8EF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: DIM, opacity: pop(t, 103.6)}}>autres · 50 %</div>
      </Abs>
      <Abs x={70} y={610} w={460} h={480} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 20, overflow: 'hidden', opacity: pop(t, 96.0)}}>
        <svg width={460} height={480} style={{position: 'absolute', inset: 0}}><rect x={40} y={160} width={260} height={16} fill="#C9A26A" stroke={BURG} strokeWidth={3} /><line x1={40} y1={176} x2={40} y2={470} stroke={STEEL} strokeWidth={8} /><line x1={300} y1={176} x2={300} y2={470} stroke={STEEL} strokeWidth={8} /></svg>
        <div style={{position: 'absolute', left: lerp(200, 330, fall), top: lerp(70, 340, fall), transform: `rotate(${fall * 120}deg)`}}><F n="ouvrier" size={90} /></div>
        <div style={{position: 'absolute', left: 16, bottom: 14}}><Mono at={97.0} c={RED} size={18}>vers le vide · sur la structure</Mono></div>
      </Abs>
      <Abs x={550} y={610} w={460} style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        {[{l: 'heurts', ic: 'collision', a: 104.7}, {l: 'coincements', ic: 'main-levee', a: 105.9}, {l: 'électrisation', ic: 'eclair', a: 106.7}, {l: 'chutes d’objets', ic: 'casque', a: 108.3}].map((x, k) => (
          <div key={k} style={{display: 'flex', alignItems: 'center', gap: 12, background: '#fff', border: `4px solid ${INK}`, borderRadius: 14, padding: '10px 16px', opacity: pop(t, x.a), transform: `translateX(${(1 - pop(t, x.a)) * 50}px)`}}><F n={x.ic} size={60} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK}}>{x.l}</div></div>
        ))}
      </Abs>
      <Abs x={0} y={1130} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={112.5} c={ORANGE} size={28}>absence de garde-corps</Pill><Pill at={114.0} c={RED} size={28}>conséquences irréversibles</Pill></Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 2 ═════════════ */
const Types: React.FC = () => {
  const t = useT();
  const roll = prog(t, 145.3, 147.5, easeInOut);
  return (
    <Out end={154.7}>
      <HiLine words={['Deux', 'grandes', 'familles']} mark={[2]} at={127.1} y={320} size={62} />
      <Win x={50} y={440} w={480} h={790} at={128.8} title="échafaudage_fixe" c={BLUE}>
        <div style={{height: 330, position: 'relative', overflow: 'hidden'}}><Img src={PH('epiepc/echafaudage.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
        <div style={{padding: 18}}>
          <Board text="FIXE" at={129.8} h={60} c={BLUE} />
          <div style={{display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16}}>
            {[{l: 'géants d’acier', a: 131.0}, {l: 'tubes et colliers', a: 133.9}, {l: 'ancré à l’ouvrage', a: 135.2}, {l: 'ponts, barrages', a: 138.9}].map((x, k) => <div key={k} style={{fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: INK, opacity: pop(t, x.a)}}>■ {x.l}</div>)}
          </div>
        </div>
      </Win>
      <Win x={550} y={440} w={480} h={790} at={143.1} title="échafaudage_roulant" c={TEAL}>
        <div style={{height: 330, position: 'relative', overflow: 'hidden', background: '#EEF6F4'}}>
          <div style={{position: 'absolute', left: lerp(40, 200, roll), top: 30}}><Scaffold w={200} h={280} at={143.4} dur={1.5} cols={2} rows={3} wheels /></div>
        </div>
        <div style={{padding: 18}}>
          <Board text="ROULANT" at={144.2} h={60} c={TEAL} />
          <div style={{display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16}}>
            {[{l: 'second œuvre', a: 147.4}, {l: 'rapide à installer', a: 149.6}, {l: 'polyvalent', a: 151.3}, {l: 'économique', a: 152.8}].map((x, k) => <div key={k} style={{fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: INK, opacity: pop(t, x.a)}}>■ {x.l}</div>)}
          </div>
        </div>
      </Win>
    </Out>
  );
};
const Interdit: React.FC = () => {
  const t = useT();
  const x = prog(t, 167.4, 168.0, easeOut);
  return (
    <Out end={179.5}>
      <HiLine words={['Des', 'interdictions', 'strictes']} mark={[1]} at={160.1} y={320} size={60} />
      <Abs x={190} y={440} w={700} h={560} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `9px 9px 0 ${RED}`, opacity: pop(t, 164.5)}}>
        <svg width={700} height={560} style={{position: 'absolute', inset: 0}}>
          <line x1={180} y1={520} x2={240} y2={60} stroke={STEEL} strokeWidth={10} /><line x1={300} y1={520} x2={360} y2={60} stroke={STEEL} strokeWidth={10} />
          {Array.from({length: 7}, (_, k) => <line key={k} x1={186 + k * 8} y1={470 - k * 60} x2={306 + k * 8} y2={470 - k * 60} stroke={STEEL} strokeWidth={7} />)}
          <rect x={318} y={240} width={70} height={18} fill={ORANGE} /><rect x={340} y={232} width={300} height={16} fill="#C9A26A" stroke={BURG} strokeWidth={3} />
          <line x1={520} y1={520} x2={560} y2={60} stroke={STEEL} strokeWidth={10} opacity={0.5} />
          <circle cx={350} cy={290} r={240} fill="none" stroke={RED} strokeWidth={22} opacity={x} />
          <line x1={180} y1={120} x2={520} y2={460} stroke={RED} strokeWidth={22} strokeDasharray={480} strokeDashoffset={480 * (1 - x)} />
        </svg>
        <div style={{position: 'absolute', left: 20, top: 16}}><Mono at={165.6} c={INK} size={20}>monté sur taquets d’échelle</Mono></div>
      </Abs>
      <Stamp at={167.5} c={RED} text="formellement interdit" x={180} y={1020} rot={-5} size={54} />
      <Abs x={0} y={1140} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={175.0} c={GREEN} size={30}>matériel normé, testé</Pill><Pill at={177.1} c={INK} size={30}>aucun compromis</Pill></Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 3 ═════════════ */
const Regles: React.FC = () => {
  const t = useT();
  const lock = prog(t, 196.1, 196.9, easeOut);
  const tip = prog(t, 205.6, 207.8, easeIn);
  const R = [{l: 'roues bloquées', a: 196.1, ok: true}, {l: 'accès par l’intérieur (trappe)', a: 201.0, ok: true}, {l: 'escalader par l’extérieur', a: 204.3, ok: false}, {l: 'plancher : circuler, pas stocker', a: 210.6, ok: true}];
  return (
    <Out end={213.9}>
      <HiLine words={['Des', 'règles', 'drastiques']} mark={[2]} at={194.7} y={320} size={62} />
      <Abs x={60} y={440} w={460} h={720} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${ORANGE}`, overflow: 'hidden', opacity: pop(t, 185.0)}}>
        <div style={{position: 'absolute', left: 120, top: 120, transformOrigin: '20px 560px', transform: `rotate(${tip * 24}deg)`}}>
          <Scaffold w={240} h={560} at={185.2} dur={2} cols={2} rows={4} wheels />
          {t > 201 && t < 205.4 && <div style={{position: 'absolute', left: 90, top: lerp(470, 120, prog(t, 201.4, 204.0)), transform: 'scale(0.8)'}}><F n="ouvrier" size={70} /></div>}
          {t >= 204.3 && <div style={{position: 'absolute', left: 230, top: lerp(470, 200, prog(t, 204.3, 205.6))}}><F n="ouvrier" size={70} /></div>}
        </div>
        {[0, 1].map((k) => <div key={k} style={{position: 'absolute', left: k ? 330 : 100, top: 640, width: 40, height: 40, borderRadius: 8, background: lock > 0 ? RED : 'transparent', transform: `scale(${lock})`, color: '#fff', fontWeight: 900, textAlign: 'center', lineHeight: '40px'}}>🔒</div>)}
        <div style={{position: 'absolute', left: 16, top: 16}}><Mono at={185.2} c={ORANGE} size={18}>tour roulante</Mono></div>
        {tip > 0.5 && <div style={{position: 'absolute', right: 16, top: 70}}><Stamp at={207.0} c={RED} text="boum !" x={0} y={0} rot={8} size={36} /></div>}
      </Abs>
      <Abs x={550} y={440} w={470} style={{display: 'flex', flexDirection: 'column', gap: 14}}>
        {R.map((r, k) => (
          <div key={k} style={{display: 'flex', alignItems: 'center', gap: 14, background: '#fff', border: `4px solid ${r.ok ? INK : RED}`, borderRadius: 14, padding: '14px 16px', opacity: pop(t, r.a), transform: `translateX(${(1 - pop(t, r.a)) * 50}px)`}}>
            <div style={{width: 40, height: 40, borderRadius: 10, background: r.ok ? GREEN : RED, color: '#fff', fontWeight: 900, fontSize: 26, textAlign: 'center', lineHeight: '40px', flexShrink: 0}}>{r.ok ? '✓' : '✗'}</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 25, color: INK}}>{r.l}</div>
          </div>
        ))}
      </Abs>
    </Out>
  );
};
const Deplacement: React.FC = () => {
  const t = useT();
  const mv = (a: number) => prog(t, a, a + 1.0, easeInOut);
  return (
    <Out end={223.8}>
      <HiLine words={['Déplacer', 'la', 'bête']} mark={[0]} at={213.9} y={320} size={62} />
      <Abs x={140} y={440} w={800} h={640} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `9px 9px 0 ${ORANGE}`, overflow: 'hidden', opacity: pop(t, 214.0)}}>
        <div style={{position: 'absolute', left: 20, top: 16}}><Mono at={214.1} c={INK} size={18}>vue de dessus</Mono></div>
        <svg width={800} height={640} style={{position: 'absolute', inset: 0}}>
          <rect x={290} y={240} width={220} height={120} rx={8} fill="#C9A26A" stroke={BURG} strokeWidth={5} />
          <line x1={100} y1={300} x2={lerp(100, 700, mv(215.2))} y2={300} stroke={GREEN} strokeWidth={10} strokeDasharray="20 14" />
          <line x1={150} y1={560} x2={lerp(150, 650, mv(216.9))} y2={lerp(560, 60, mv(216.9))} stroke={GREEN} strokeWidth={10} strokeDasharray="20 14" />
          <line x1={400} y1={80} x2={400} y2={lerp(80, 560, mv(217.7))} stroke={RED} strokeWidth={10} strokeDasharray="20 14" />
        </svg>
        <div style={{position: 'absolute', left: 600, top: 250, opacity: pop(t, 215.6)}}><Mono at={215.6} c={GREEN} size={22}>✓ longueur</Mono></div>
        <div style={{position: 'absolute', left: 560, top: 80, opacity: pop(t, 217.0)}}><Mono at={217.0} c={GREEN} size={22}>✓ diagonale</Mono></div>
        <div style={{position: 'absolute', left: 420, top: 520, opacity: pop(t, 217.8)}}><Mono at={217.8} c={RED} size={22}>✗ jamais la largeur</Mono></div>
      </Abs>
      <Abs x={0} y={1120} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 50, color: ORANGE, opacity: pop(t, 220.5)}}>de la géométrie appliquée à notre survie</Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 4 ═════════════ */
const Epi: React.FC = () => {
  const t = useT();
  const glow = prog(t, 254.2, 256.8);
  return (
    <Out end={266.65}>
      <HiLine words={['Le', 'risque', 'zéro', 'n’existe', 'pas']} mark={[2]} at={229.0} y={320} size={54} />
      <Abs x={60} y={440} w={960} style={{display: 'flex', gap: 16}}>
        <Brut x={0} y={0} w={300} h={260} at={238.3} sh={TEAL} style={{position: 'relative', textAlign: 'center', padding: 14}}><F n="chaussure" size={100} style={{margin: '0 auto'}} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK}}>chaussures montantes</div><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 18, color: DIM}}>écrasement · cheville stable</div></Brut>
        <Brut x={0} y={0} w={300} h={260} at={244.6} sh={YEL} style={{position: 'relative', textAlign: 'center', padding: 14}}><div style={{height: 110, overflow: 'hidden'}}><Img src={PH('epiepc/casque.jpg')} style={{height: 110}} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK}}>le casque</div><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 18, color: DIM}}>contre les chutes d’objets</div></Brut>
        <Brut x={0} y={0} w={330} h={260} at={248.4} sh={RED} style={{position: 'relative', textAlign: 'center', padding: 14}}><div style={{height: 110, overflow: 'hidden'}}><Img src={PH('epiepc/harnais.jpg')} style={{height: 110}} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: RED}}>arrêt des chutes</div><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 18, color: DIM}}>la vraie star</div></Brut>
      </Abs>
      <Abs x={60} y={740} w={960} h={440} style={{background: NIGHT, border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${RED}`, overflow: 'hidden', opacity: pop(t, 251.4)}}>
        <svg width={400} height={440} style={{position: 'absolute', left: 40, top: 0}}>
          <circle cx={200} cy={70} r={38} fill="#5A647A" /><rect x={150} y={115} width={100} height={170} rx={30} fill="#5A647A" /><rect x={150} y={285} width={40} height={140} rx={16} fill="#5A647A" /><rect x={210} y={285} width={40} height={140} rx={16} fill="#5A647A" />
          <path d="M160 120 L240 260 M240 120 L160 260 M150 270 L250 270" stroke={RED} strokeWidth={10} fill="none" />
          <ellipse cx={200} cy={275} rx={70 + glow * 20} ry={30 + glow * 10} fill={ORANGE} opacity={0.6 * glow} />
          <line x1={200} y1={115} x2={200} y2={0} stroke={YEL} strokeWidth={6} strokeDasharray="10 8" />
        </svg>
        <div style={{position: 'absolute', left: 460, top: 40, right: 30, display: 'flex', flexDirection: 'column', gap: 16}}>
          <Mono at={252.9} c={ORANGE} size={22}>répartit l’énergie du choc</Mono>
          <Mono at={256.7} c={RED} size={22}>sur le bassin</Mono>
          <div style={{opacity: pop(t, 257.8), background: '#1D2433', borderRadius: 14, padding: 16, marginTop: 10}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: '#8B95A8'}}>ANTICHUTE</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff'}}>bloque dans le 1<sup>er</sup> mètre</div></div>
          <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 40, color: YEL, opacity: pop(t, 264.8)}}>pure biomécanique</div>
        </div>
      </Abs>
      <Cite y={1200} at={257.8} text="« premier mètre » : cité par la vidéo d’origine" />
    </Out>
  );
};
const Collectif: React.FC = () => {
  const t = useT();
  const ph = Math.max(0, t - 280.4);
  const crane = ph > 0 ? (Math.sin(ph * 1.6) > 0 ? 1 : 0) : 0;
  const sink = prog(t, 292.4, 294.6, easeIn);
  return (
    <Out end={295.6}>
      <HiLine words={['L’environnement', 'global']} mark={[1]} at={268.9} y={320} size={58} />
      <Blinds src="epiepc/garde-corps.jpg" x={60} y={440} w={460} h={360} at={270.6} pos="50% 30%"><div style={{position: 'absolute', left: 14, bottom: 14}}><Mono at={271.0} c={ORANGE} size={20}>garde-corps · frontière du vide</Mono></div></Blinds>
      <Win x={550} y={440} w={470} h={360} at={277.3} title="barrière_écluse" c={TEAL}>
        <svg width={460} height={300} style={{position: 'absolute', inset: 0}}>
          <rect x={60} y={60} width={340} height={200} fill="#C9A26A" opacity={0.4} stroke={BURG} strokeWidth={3} />
          <line x1={60} y1={60} x2={60} y2={crane ? 60 : 260} stroke={crane ? GREEN : RED} strokeWidth={14} />
          <line x1={400} y1={60} x2={400} y2={crane ? 260 : 60} stroke={crane ? RED : GREEN} strokeWidth={14} />
          <text x={20} y={290} fontFamily={MONO} fontWeight={700} fontSize={18} fill={INK}>côté travailleur</text>
          <text x={320} y={290} fontFamily={MONO} fontWeight={700} fontSize={18} fill={INK}>côté grue</text>
        </svg>
        <div style={{position: 'absolute', left: 170, top: 110}}><F n={crane ? 'colis' : 'ouvrier'} size={80} /></div>
      </Win>
      <Abs x={60} y={840} w={960} style={{display: 'flex', gap: 16}}>
        <div style={{flex: 1, background: '#fff', border: `4px solid ${INK}`, borderRadius: 16, padding: 16, display: 'flex', alignItems: 'center', gap: 12, opacity: pop(t, 287.6)}}><F n="toile" size={70} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK}}>filets : débris et public protégés</div></div>
        <div style={{flex: 1, position: 'relative', height: 200, background: '#fff', border: `4px solid ${INK}`, borderRadius: 16, overflow: 'hidden', opacity: pop(t, 291.2)}}>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 70, background: '#7A5230'}} />
          <div style={{position: 'absolute', left: 60, bottom: 70 - sink * 40, width: 10, height: 100, background: STEEL}} />
          <div style={{position: 'absolute', left: 300, bottom: 70, width: 10, height: 100, background: STEEL}} /><div style={{position: 'absolute', left: 270, bottom: 62, width: 70, height: 10, background: INK}} />
          <div style={{position: 'absolute', left: 20, top: 10, fontFamily: MONO, fontWeight: 700, fontSize: 16, color: RED}}>sans plaque</div>
          <div style={{position: 'absolute', left: 250, top: 10, fontFamily: MONO, fontWeight: 700, fontSize: 16, color: GREEN}}>avec plaque</div>
        </div>
      </Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 5 ═════════════ */
const Orage: React.FC = () => {
  const t = useT();
  const strike = (t > 318.5 && t < 319.0) || (t > 319.3 && t < 319.6);
  return (
    <Out end={330.6}>
      <HiLine words={['Le', 'danger', 'vient', 'du', 'ciel']} mark={[4]} at={311.0} y={320} size={58} />
      <Abs x={140} y={440} w={800} h={640} style={{background: strike ? '#E8E4FF' : NIGHT, border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `9px 9px 0 ${VIO}`, overflow: 'hidden', opacity: pop(t, 301.6)}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 140, background: 'linear-gradient(180deg, #2A2F45, transparent)'}} />
        {[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 120 + k * 200 + Math.sin(t + k) * 20, top: 30, width: 220, height: 80, borderRadius: 40, background: '#3A4058'}} />)}
        <div style={{position: 'absolute', left: 280, top: 180}}><Scaffold w={240} h={420} at={302.0} dur={2} cols={2} rows={3} guard={false} /></div>
        {strike && <svg width={800} height={640} style={{position: 'absolute', inset: 0}}><polyline points="420,90 380,180 430,190 390,300 440,190 400,180" fill="none" stroke={YEL} strokeWidth={10} style={{filter: `drop-shadow(0 0 20px ${YEL})`}} /></svg>}
        <div style={{position: 'absolute', left: 20, top: 16}}><Mono at={315.8} c={VIO} size={20}>cage métallique = paratonnerre géant</Mono></div>
      </Abs>
      <Stamp at={323.8} c={RED} text="orage : on évacue" x={220} y={1100} rot={-5} size={52} />
    </Out>
  );
};
const Vent: React.FC = () => {
  const t = useT();
  const kmh = t < 342.2 ? lerp(0, 30, prog(t, 333.7, 341.0)) : t < 346.5 ? lerp(30, 45, prog(t, 342.2, 343.4)) : t < 351.5 ? lerp(45, 50, prog(t, 346.5, 347.5)) : lerp(50, 60, prog(t, 351.5, 352.6));
  const spin = t * (100 + kmh * 18);
  const billow = Math.sin(t * 3) * 10 + kmh * 0.6;
  const TH = [{v: 45, l: 'roulants non amarrés : démontage', a: 342.2, c: ORANGE}, {v: 50, l: 'arrêt montage / démontage', a: 346.5, c: RED}, {v: 60, l: 'ligne rouge : arrêt total', a: 351.5, c: BURG}];
  return (
    <Out end={362.05}>
      <HiLine words={['L’ennemi', 'invisible', ':', 'le', 'vent']} mark={[4]} at={330.6} y={320} size={56} />
      <Abs x={60} y={440} w={430} h={500} style={{background: '#EAF3FF', border: `5px solid ${INK}`, borderRadius: 22, overflow: 'hidden', opacity: pop(t, 333.8)}}>
        <svg width={430} height={500} style={{position: 'absolute', inset: 0}}>
          <path d={`M100 60 Q ${150 + billow * 3} 250 100 440 L 320 440 Q ${370 + billow * 3} 250 320 60 Z`} fill="#4A90C2" opacity={0.8} stroke={NAVY} strokeWidth={4} />
          {[0, 1, 2, 3].map((k) => <line key={k} x1={20} y1={120 + k * 90} x2={20 + ((t * 300 + k * 80) % 120)} y2={120 + k * 90} stroke="#fff" strokeWidth={4} />)}
        </svg>
        <div style={{position: 'absolute', left: 16, bottom: 14}}><Mono at={335.4} c={NAVY} size={18}>bâche = voile de bateau</Mono></div>
      </Abs>
      <Abs x={520} y={440} w={500} h={500} style={{background: NIGHT, border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${VIO}`, overflow: 'hidden', opacity: pop(t, 340.2)}}>
        <svg width={500} height={300} style={{position: 'absolute', left: 0, top: 10}}>
          <line x1={250} y1={150} x2={250} y2={300} stroke="#8B95A8" strokeWidth={8} />
          <g transform={`rotate(${spin} 250 150)`}>{[0, 120, 240].map((a) => <g key={a} transform={`rotate(${a} 250 150)`}><line x1={250} y1={150} x2={250} y2={60} stroke="#C9D2DF" strokeWidth={6} /><circle cx={250} cy={60} r={22} fill="#C9D2DF" /></g>)}</g>
        </svg>
        <div style={{position: 'absolute', left: 0, right: 0, top: 320, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 90, color: kmh >= 60 ? RED : kmh >= 45 ? ORANGE : '#fff'}}>{Math.round(kmh)}<span style={{fontSize: 40}}> km/h</span></div>
        <div style={{position: 'absolute', left: 16, top: 14}}><Mono at={357.0} c={VIO} size={18}>anémomètre sur site</Mono></div>
      </Abs>
      <Abs x={60} y={970} w={960} style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        {TH.map((x, k) => (
          <div key={k} style={{display: 'flex', alignItems: 'center', gap: 16, background: '#fff', border: `4px solid ${x.c}`, borderRadius: 14, padding: '10px 16px', opacity: pop(t, x.a)}}>
            <Board text={String(x.v)} at={x.a} h={56} c={x.c} /><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>km/h</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK}}>{x.l}</div>
          </div>
        ))}
      </Abs>
      <Cite y={1290} at={342.2} text="seuils cités par la vidéo d’origine" />
    </Out>
  );
};

/* ═════════════ PARTIE 6 ═════════════ */
const Loi: React.FC = () => {
  const t = useT();
  return (
    <Out end={392.8}>
      <HiLine words={['C’est', 'la', 'loi']} mark={[2]} at={365.7} y={320} size={68} />
      <Abs x={60} y={440} w={960} h={240} style={{display: 'flex', alignItems: 'center', gap: 24, opacity: pop(t, 370.3)}}>
        <F n="livres" size={160} />
        <div><Mono at={370.4} c={NAVY} size={22}>Code du travail · article</Mono><div style={{marginTop: 14}}><Board text="R. 4323-69" at={371.0} h={78} c={NAVY} stag={0.04} /></div></div>
      </Abs>
      <Brut x={60} y={720} w={960} h={220} at={376.1} sh={NAVY} style={{display: 'flex', alignItems: 'center', gap: 22}}>
        <F n="diplome" size={110} />
        <div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK}}>Monter / démonter :</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: RED}}>opération hautement qualifiée</div><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 24, color: DIM, opacity: pop(t, 380.7)}}>pas pour quelqu’un sans formation</div></div>
      </Brut>
      <Abs x={0} y={980} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap'}}><Pill at={384.7} c={BLUE} size={28}>lire des plans</Pill><Pill at={385.8} c={ORANGE} size={28}>forces en jeu</Pill><Pill at={386.9} c={VIO} size={28}>anticiper la météo</Pill></Abs>
      <Cite y={1080} at={371.0} text="article cité par la vidéo d’origine" />
      <Stamp at={389.6} c={NAVY} text="spécialité technique" x={250} y={1140} rot={-5} size={50} />
    </Out>
  );
};
const Articles: React.FC = () => {
  const t = useT();
  const A = [{l: 'Ancrages résistants', s: 'pires contraintes atmosphériques', ic: 'maillon', a: 395.3, k: '73-74'}, {l: 'Aucun déplacement surprise', s: 'structure immobilisée', ic: 'cadenas', a: 400.4, k: ''}, {l: 'Charge maximale affichée', s: 'sur chaque plancher', ic: 'balance', a: 404.2, k: ''}];
  return (
    <Out end={420.0}>
      <HiLine words={['Un', 'arsenal', 'détaillé']} mark={[1]} at={392.8} y={320} size={62} />
      <Abs x={60} y={440} w={960} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
        {A.map((x, k) => (
          <Brut key={k} x={0} y={0} w={960} h={170} at={x.a} sh={NAVY} style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 20}}>
            <F n={x.ic} size={90} />
            <div style={{flex: 1}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK}}>{x.l}</div><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 22, color: DIM}}>{x.s}</div></div>
            {x.k && <Board text={x.k} at={x.a + 0.4} h={56} c={NAVY} />}
          </Brut>
        ))}
      </Abs>
      <Abs x={110} y={1030} w={860} h={150} style={{display: 'flex', alignItems: 'center', gap: 20, background: '#FFF1F1', border: `5px solid ${RED}`, borderRadius: 18, padding: '0 24px', boxSizing: 'border-box', opacity: pop(t, 412.3)}}>
        <F n="sens-interdit" size={80} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK}}>bouger un roulant avec un travailleur dessus</div>
      </Abs>
      <Stamp at={415.3} c={RED} text="infraction majeure" x={300} y={1190} rot={-5} size={50} />
    </Out>
  );
};
const Final: React.FC = () => {
  const t = useT();
  const press = prog(t, 434.0, 438.5, easeInOut);
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={['Une', 'réflexion', 's’impose']} mark={[1]} at={420.5} y={320} size={62} />
      <Abs x={60} y={440} w={960} h={420} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `9px 9px 0 ${RED}`, overflow: 'hidden', opacity: pop(t, 425.3)}}>
        <div style={{position: 'absolute', left: lerp(40, 260, press), top: 120, textAlign: 'center'}}><F n="chrono" size={140} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: RED}}>course effrénée · délais</div></div>
        <div style={{position: 'absolute', right: 40, top: 110, textAlign: 'center', transform: `scale(${1 - press * 0.25})`, opacity: 1 - press * 0.4}}><F n="bouclier" size={160} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: GREEN}}>standards vitaux</div></div>
        <div style={{position: 'absolute', left: 20, top: 16}}><Mono at={426.6} c={INK} size={18}>chantiers ultra complexes · plannings tendus</Mono></div>
      </Abs>
      <Deep src="causerie/groupe.jpg" x={150} y={890} w={780} h={300} at={439.9} pos="50% 40%">
        <div style={{position: 'absolute', left: 16, bottom: 16}}><Mono at={444.3} c={RED} size={22}>la question de chaque réunion de chantier</Mono></div>
      </Deep>
      <Abs x={0} y={1210} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 52, color: GREEN, opacity: pop(t, 442.7)}}>protéger des vies humaines</Abs>
      {t > 443 && <Dust n={20} c={GOLD} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const trans = (x: {at: number; k: TK}): Sfx[] => x.k === 'tube' ? [{at: x.at + 0.05, s: 'sfx/whoosh', v: 0.5}, {at: x.at + 0.75, s: 'sfx/thud', v: 0.4}, {at: x.at + 0.85, s: 'cadenas', v: 0.35}, {at: x.at + 1.0, s: 'page', v: 0.45}, {at: x.at + 1.32, s: 'tampon', v: 0.4}, {at: x.at + 2.6, s: 'page', v: 0.3}, {at: x.at + 3.0, s: 'sfx/whoosh', v: 0.45}]
  : x.k === 'gyro' ? [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}]
  : [{at: x.at, s: 'sfx/swish', v: 0.4}, {at: x.at + 0.4, s: 'sfx/thud', v: 0.3}, {at: x.at + 1.1, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 1.4, s: 'sfx/pop', v: 0.22}, {at: x.at + 3.0, s: 'sfx/whoosh', v: 0.3}];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 1.4, s: 'validation', v: 0.2})), {at: ALLDONE, s: 'validation', v: 0.35},
  ...rep(3.0, 14, 0.3, 'sfx/thud', 0.1), {at: 11.0, s: 'deep-hit', v: 0.3}, {at: 16.6, s: 'tampon', v: 0.45}, ...flaps(18.9, 15), ...[20.6, 23.5, 26.1].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), {at: 27.3, s: 'stylo', v: 0.3},
  ...[34.5, 36.1, 37.6, 39.1, 40.1, 43.6].map((a) => ({at: a, s: 'sfx/thud', v: 0.28})),
  ...rep(49.0, 10, 0.3, 'sfx/thud', 0.1), ...[54.5, 56.0, 57.1, 58.0].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})), {at: 63.5, s: 'tampon', v: 0.45},
  ...rep(65.8, 12, 0.15, 'tick', 0.15), {at: 67.6, s: 'bass-hit', v: 0.4}, {at: 69.2, s: 'sfx/whoosh', v: 0.25}, {at: 76.6, s: 'sfx/pop', v: 0.22}, {at: 80.4, s: 'sfx/pop', v: 0.22}, {at: 86.6, s: 'tampon', v: 0.45},
  {at: 92.1, s: 'sfx/whoosh', v: 0.25}, ...rep(93.6, 8, 0.17, 'tick', 0.14), {at: 97.0, s: 'sfx/swish', v: 0.35}, {at: 98.6, s: 'deep-hit', v: 0.4}, ...[104.7, 105.9, 106.7, 108.3].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})),
  {at: 128.8, s: 'sfx/whoosh', v: 0.25}, ...flaps(129.8, 6), {at: 143.1, s: 'sfx/whoosh', v: 0.25}, ...flaps(144.2, 9), {at: 145.3, s: 'sfx/rise', v: 0.2},
  {at: 164.5, s: 'soft-whoosh', v: 0.3}, {at: 167.4, s: 'sfx/swish', v: 0.35}, {at: 167.5, s: 'tampon', v: 0.5}, {at: 175.0, s: 'validation', v: 0.25},
  {at: 185.0, s: 'soft-whoosh', v: 0.3}, {at: 196.1, s: 'cadenas', v: 0.45}, {at: 201.0, s: 'sfx/pop', v: 0.2}, {at: 204.3, s: 'sfx/pop', v: 0.2}, {at: 205.6, s: 'tension', v: 0.25, dur: 2}, {at: 207.6, s: 'deep-hit', v: 0.5}, {at: 210.6, s: 'sfx/pop', v: 0.2},
  {at: 215.2, s: 'stylo', v: 0.3}, {at: 216.9, s: 'stylo', v: 0.3}, {at: 217.7, s: 'stylo', v: 0.3}, {at: 220.5, s: 'sfx/ding', v: 0.2},
  ...[238.3, 244.6, 248.4].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), {at: 251.4, s: 'soft-whoosh', v: 0.3}, {at: 254.2, s: 'sfx/rise', v: 0.25}, {at: 257.8, s: 'cadenas', v: 0.35},
  {at: 270.6, s: 'soft-whoosh', v: 0.3}, {at: 277.3, s: 'sfx/whoosh', v: 0.25}, ...rep(280.4, 7, 1.96, 'cadenas', 0.2), {at: 287.6, s: 'sfx/pop', v: 0.2}, {at: 291.2, s: 'sfx/pop', v: 0.2}, {at: 292.4, s: 'sfx/swish', v: 0.25},
  {at: 301.6, s: 'tension', v: 0.2, dur: 4}, {at: 318.5, s: 'deep-hit', v: 0.55}, {at: 319.3, s: 'bass-hit', v: 0.45}, {at: 323.8, s: 'tampon', v: 0.5},
  {at: 333.8, s: 'soft-whoosh', v: 0.35}, {at: 340.2, s: 'sfx/whoosh', v: 0.25}, ...flaps(342.2, 4), {at: 342.4, s: 'sfx/ding', v: 0.2}, ...flaps(346.5, 4), {at: 346.7, s: 'sfx/ding', v: 0.22}, ...flaps(351.5, 4), {at: 351.8, s: 'bass-hit', v: 0.4},
  {at: 370.3, s: 'sfx/thud', v: 0.3}, ...flaps(371.0, 14), {at: 376.1, s: 'sfx/thud', v: 0.3}, ...[384.7, 385.8, 386.9].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})), {at: 389.6, s: 'tampon', v: 0.45},
  ...[395.3, 400.4, 404.2].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), ...flaps(395.7, 6), {at: 412.3, s: 'sfx/whoosh', v: 0.25}, {at: 415.3, s: 'tampon', v: 0.5},
  {at: 425.3, s: 'soft-whoosh', v: 0.3}, {at: 434.0, s: 'tension', v: 0.2, dur: 4}, {at: 439.9, s: 'soft-whoosh', v: 0.3}, {at: 442.7, s: 'validation', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Echafaudage: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={29.9}><Intro /></Gate>
    <Gate from={29.8} to={45.2}><Plan /></Gate>
    <Gate from={48.6} to={64.7}><Anodin /></Gate>
    <Gate from={64.6} to={88.9}><Moitie /></Gate>
    <Gate from={88.8} to={117.3}><Causes /></Gate>
    <Gate from={120.6} to={154.8}><Types /></Gate>
    <Gate from={154.7} to={179.6}><Interdit /></Gate>
    <Gate from={183.0} to={214.0}><Regles /></Gate>
    <Gate from={213.9} to={223.9}><Deplacement /></Gate>
    <Gate from={227.3} to={266.7}><Epi /></Gate>
    <Gate from={266.65} to={295.7}><Collectif /></Gate>
    <Gate from={299.0} to={330.7}><Orage /></Gate>
    <Gate from={330.6} to={362.1}><Vent /></Gate>
    <Gate from={365.5} to={392.9}><Loi /></Gate>
    <Gate from={392.8} to={420.1}><Articles /></Gate>
    <Gate from={420.0} to={OUTRO_AT}><Final /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}>{x.k === 'tube' ? <Pneumatique i={i} /> : x.k === 'gyro' ? <Gyro i={i} /> : <Loupe i={i} />}</Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={447.9}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-echafaudage-origine.m4a')} trimAfter={s(448.0)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Center, Strike, TEAL, random];
