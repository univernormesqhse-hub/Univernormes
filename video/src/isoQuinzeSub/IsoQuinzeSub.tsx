import React from 'react';
import {AbsoluteFill, Freeze, useCurrentFrame} from 'remotion';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {sansFont} from '../theme';
import {PH} from '../implIso/kit';
import {IsoQuinze3D, N, OUTRO_AT, TRANS_AT, shownAt} from '../isoQuinze3D/IsoQuinze3D';

/**
 * « 15 normes ISO » — version « subliminale » : la capsule 3D complète, traitée en post-production par une couche
 * de superpositions. Images-éclairs (3 images) à l'entrée de chaque norme : numéro géant découpé dans la photo de la
 * norme, sur sa couleur ; double exposition (numéro-photo géant en fondu « multiply » qui dérive en parallaxe pendant
 * toute la scène) ; aberration chromatique RVB + secousse aux transitions et aux éclairs (filtre SVG sur toute
 * l'image) ; fuites de lumière chaudes en « screen » ; rafale de mots-éclairs à la sortie de la couverture ; négatif
 * de 2 images sur la vague du tableau périodique ; grain de pellicule animé. Pas de musique ; impacts ajoutés.
 * Techniques ajoutées : ouverture en iris après chaque éclair, onde de choc liquide (feTurbulence +
 * feDisplacementMap), lignes de vitesse façon manga, domaine décodé lettre à lettre sur l'éclair, remappage du temps
 * sur le final (rembobinage VHS ◀◀ avec bandes de tracking, ralenti ×0,5 sur la vague, accélération de rattrapage),
 * puis plongée « zoom-through » dans le tableau jusqu'au logo de fin.
 */
const FPS = 30;
const FLASH = 3 / FPS;
const FLASHES = N.slice(1).map((d) => ({d, at: shownAt(d) - 0.12}));
const WORDS = ['QUALITÉ', 'SÉCURITÉ', 'ENVIRONNEMENT', 'CONFIANCE', 'PERFORMANCE'];
const WORDS_AT = 2.5;
const NEG_AT = 75.62;
const LEAKS = [0, ...TRANS_AT, 73.4];

/* Remappage du temps sur le final : [temps réel, temps de la capsule]. */
const REMAP: [number, number][] = [[75.5, 75.5], [76.3, 74.0], [77.3, 75.2], [78.9, 76.0], [80.0, 80.0]];
const REW_A = 75.5, REW_B = 76.3, SLOW_A = 77.3, SLOW_B = 78.9, ZOOM_A = 80.0;
const remap = (t: number) => {
  if (t <= REMAP[0][0] || t >= REMAP[REMAP.length - 1][0]) return t;
  let i = 0;
  while (t > REMAP[i + 1][0]) i++;
  const [a, x] = REMAP[i], [b, y] = REMAP[i + 1];
  return x + ((t - a) / (b - a)) * (y - x);
};

const near = (t: number, a: number, before: number, after: number) => t > a - before && t < a + after;
const bump = (t: number, a: number, d: number) => (t < a || t > a + d ? 0 : Math.sin(((t - a) / d) * Math.PI));

/** Intensité de l'aberration RVB (0–1) : transitions, éclairs, rafale de mots, final. */
const rgbAmt = (t: number) => Math.max(
  ...TRANS_AT.map((a) => bump(t, a - 0.05, 0.6)),
  ...FLASHES.map((f) => bump(t, f.at - 0.04, 0.32)),
  bump(t, WORDS_AT - 0.05, 0.6),
  bump(t, 75.5, 0.5),
  0,
);

const RgbFilter: React.FC<{amt: number; f: number; wave: number}> = ({amt, f, wave}) => {
  const d = amt * 14, j = Math.sin(f * 2.1) * amt * 5;
  const M = (r: number, g: number, b: number) => `${r} 0 0 0 0  0 ${g} 0 0 0  0 0 ${b} 0 0  0 0 0 1 0`;
  return (
    <svg width={0} height={0} style={{position: 'absolute'}}>
      <filter id="rgbSplit" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feColorMatrix in="SourceGraphic" type="matrix" values={M(1, 0, 0)} result="r" />
        <feOffset in="r" dx={d} dy={j} result="r2" />
        <feColorMatrix in="SourceGraphic" type="matrix" values={M(0, 1, 0)} result="g" />
        <feColorMatrix in="SourceGraphic" type="matrix" values={M(0, 0, 1)} result="b" />
        <feOffset in="b" dx={-d} dy={-j} result="b2" />
        <feBlend in="r2" in2="g" mode="screen" result="rg" />
        <feBlend in="rg" in2="b2" mode="screen" result="rgb" />
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.02" numOctaves={2} seed={f % 50} result="noise" />
        <feDisplacementMap in="rgb" in2="noise" scale={wave * 90} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
};

/** Image-éclair : numéro géant découpé dans la photo de la norme. */
const GLYPH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@';
const decode = (txt: string, p: number, f: number) => txt.split('').map((ch, i) => (i / txt.length < p || ch === ' ' ? ch : GLYPH[(f * 7 + i * 13) % GLYPH.length])).join('');
const FlashFrame: React.FC<{d: (typeof N)[number]; p: number; f: number}> = ({d, p, f}) => (
  <AbsoluteFill style={{background: d.c, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 70, letterSpacing: 18, color: '#fff', opacity: 0.85}}>{d.pre}</div>
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: d.num.length > 4 ? 300 : 380, lineHeight: 0.9, letterSpacing: -12, backgroundImage: `url(${PH(d.img)})`, backgroundSize: 'cover', backgroundPosition: d.pos, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextStroke: '6px #fff', filter: 'contrast(1.25) saturate(1.3)'}}>{d.num}</div>
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: '#fff', marginTop: 24, textTransform: 'uppercase', letterSpacing: 6}}>{decode(d.dom.toUpperCase(), p, f)}</div>
  </AbsoluteFill>
);

/** Double exposition : numéro-photo géant qui dérive pendant la scène de la norme. */
const DoubleExpo: React.FC<{t: number}> = ({t}) => {
  const d = [...N].reverse().find((x) => t >= shownAt(x) + 0.1 && t < x.end);
  if (!d) return null;
  const s0 = shownAt(d) + 0.1;
  const p = (t - s0) / Math.max(1, d.end - s0);
  const o = Math.min(1, (t - s0) * 2, (d.end - t) * 2) * 0.16;
  return (
    <AbsoluteFill style={{mixBlendMode: 'multiply', opacity: o, pointerEvents: 'none', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: -120 + p * -160, top: 520, transform: 'rotate(-90deg)', transformOrigin: '50% 50%', width: 1600, height: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 560, letterSpacing: -30, backgroundImage: `url(${PH(d.img)})`, backgroundSize: 'cover', backgroundPosition: `${30 + p * 40}% 50%`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'}}>{d.num}</div>
    </AbsoluteFill>
  );
};

/** Fuites de lumière chaudes (screen). */
const Leaks: React.FC<{t: number}> = ({t}) => {
  const a = Math.max(0, ...LEAKS.map((x) => bump(t, x - 0.2, 1.6)));
  if (a <= 0) return null;
  return (
    <AbsoluteFill style={{mixBlendMode: 'screen', opacity: a * 0.75, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: -300 + Math.sin(t * 1.3) * 160, top: -200 + Math.cos(t) * 140, width: 1100, height: 1100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,150,40,0.85), rgba(255,80,20,0.25) 45%, transparent 70%)'}} />
      <div style={{position: 'absolute', right: -380 + Math.cos(t * 1.7) * 140, bottom: -260, width: 1200, height: 1000, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,210,120,0.7), rgba(255,120,60,0.2) 50%, transparent 72%)'}} />
    </AbsoluteFill>
  );
};

/** Rafale de mots-éclairs (3 images par mot). */
const WordBurst: React.FC<{t: number}> = ({t}) => {
  const k = Math.floor((t - WORDS_AT) / FLASH);
  if (k < 0 || k >= WORDS.length) return null;
  const inv = k % 2 === 1;
  return (
    <AbsoluteFill style={{background: inv ? '#fff' : '#0B0F18', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: WORDS[k].length > 10 ? 120 : 170, letterSpacing: -4, color: inv ? '#0B0F18' : '#F5C400', transform: `scale(${1.1 - (((t - WORDS_AT) % FLASH) / FLASH) * 0.1})`}}>{WORDS[k]}</div>
    </AbsoluteFill>
  );
};

/** Lignes de vitesse façon manga, autour d'un point focal. */
const SpeedLines: React.FC<{a: number; f: number; cx?: number; cy?: number}> = ({a, f, cx = 540, cy = 880}) => (
  <AbsoluteFill style={{pointerEvents: 'none', opacity: a}}>
    <svg width={1080} height={1920}>
      {Array.from({length: 72}, (_, i) => {
        const ang = (i / 72) * Math.PI * 2 + ((f * 0.37 + i * 1.7) % 1) * 0.04;
        const r0 = 330 + ((i * 97 + f * 53) % 160), r1 = 1500;
        const w = 3 + ((i * 31 + f * 11) % 9);
        return <path key={i} d={`M ${cx + Math.cos(ang - 0.006 * w) * r1} ${cy + Math.sin(ang - 0.006 * w) * r1} L ${cx + Math.cos(ang) * r0} ${cy + Math.sin(ang) * r0} L ${cx + Math.cos(ang + 0.006 * w) * r1} ${cy + Math.sin(ang + 0.006 * w) * r1} Z`} fill="#0B0F18" />;
      })}
    </svg>
  </AbsoluteFill>
);

/** Rembobinage VHS : bandes de tracking, lignes de balayage, ◀◀. */
const Rewind: React.FC<{t: number; f: number}> = ({t, f}) => {
  if (t < REW_A || t > REW_B) return null;
  const y = ((t - REW_A) * 2600) % 2100 - 100;
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <AbsoluteFill style={{background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0 2px, transparent 2px 6px)'}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: y, height: 70, background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.75), transparent)', filter: 'blur(2px)'}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: (y + 900) % 2000, height: 26, background: 'rgba(255,255,255,0.5)'}} />
      <div style={{position: 'absolute', left: 60, top: 1620, fontFamily: '"JetBrains Mono", monospace', fontWeight: 700, fontSize: 64, color: '#fff', textShadow: '3px 3px 0 #000', opacity: f % 10 < 6 ? 1 : 0.2}}>◀◀ REW</div>
    </AbsoluteFill>
  );
};
const SlowTag: React.FC<{t: number}> = ({t}) => (t < SLOW_A || t > SLOW_B ? null : (
  <div style={{position: 'absolute', left: 60, top: 1620, fontFamily: '"JetBrains Mono", monospace', fontWeight: 700, fontSize: 56, color: '#fff', background: '#0B0F18', padding: '6px 18px', borderRadius: 10, opacity: Math.min(1, (t - SLOW_A) * 5, (SLOW_B - t) * 5)}}>▶ ×0,5</div>
));

/** Grain de pellicule animé. */
const Grain: React.FC<{f: number}> = ({f}) => (
  <AbsoluteFill style={{pointerEvents: 'none', mixBlendMode: 'overlay', opacity: 0.22}}>
    <svg width={1080} height={1920}>
      <filter id="grainF"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={f % 97} /><feColorMatrix type="saturate" values="0" /></filter>
      <rect width={1080} height={1920} filter="url(#grainF)" />
    </svg>
  </AbsoluteFill>
);

const CUES: Sfx[] = [
  ...FLASHES.flatMap((x) => [{at: x.at, s: 'sfx/thud', v: 0.45}, {at: x.at, s: 'sfx/swish', v: 0.22}] as Sfx[]),
  ...WORDS.map((_, k) => ({at: WORDS_AT + k * FLASH, s: 'sfx/click', v: 0.35})),
  {at: WORDS_AT + WORDS.length * FLASH, s: 'sfx/thud', v: 0.5},
  {at: NEG_AT, s: 'sfx/thud', v: 0.4},
  ...Array.from({length: 12}, (_, k) => ({at: REW_A + k * 0.065, s: 'sfx/click', v: 0.18})), {at: REW_A, s: 'sfx/whoosh', v: 0.45}, {at: REW_B, s: 'sfx/thud', v: 0.45},
  {at: SLOW_A, s: 'sfx/rise', v: 0.3, dur: 1.4}, {at: SLOW_B, s: 'sfx/whoosh', v: 0.4}, {at: ZOOM_A, s: 'sfx/rise', v: 0.35, dur: 0.6}, {at: ZOOM_A + 0.55, s: 'sfx/thud', v: 0.5},
];

export const ISO_QUINZE_SUB_FRAMES = Math.round((OUTRO_AT + 3.8) * FPS);
export const IsoQuinzeSub: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const amt = rgbAmt(t);
  const shake = amt > 0.05 ? [Math.sin(f * 1.7) * amt * 10, Math.cos(f * 2.3) * amt * 6] : [0, 0];
  const neg = near(t, NEG_AT, 0, 2 / FPS);
  const flash = FLASHES.find((x) => t >= x.at && t < x.at + FLASH);
  const wave = Math.max(0, ...FLASHES.map((x) => bump(t, x.at + FLASH, 0.45)), bump(t, REW_A, 0.8) * 0.6);
  const irisF = FLASHES.find((x) => t >= x.at + FLASH && t < x.at + FLASH + 0.35);
  const iris = irisF ? (t - irisF.at - FLASH) / 0.35 : 1;
  const lines = Math.max(0, ...FLASHES.map((x) => bump(t, x.at + FLASH - 0.02, 0.4)), bump(t, 75.55, 0.4));
  const tc = remap(t);
  const zp = Math.max(0, Math.min(1, (t - ZOOM_A) / (OUTRO_AT - ZOOM_A)));
  const zoom = 1 + zp * zp * 7;
  const fx = (amt > 0.05 || wave > 0.02) && t < OUTRO_AT;
  const rew = t > REW_A && t < REW_B;
  return (
    <AbsoluteFill style={{background: '#0B0F18'}}>
      {fx && <RgbFilter amt={Math.max(amt, rew ? 0.7 : 0)} f={f} wave={wave} />}
      <AbsoluteFill style={{filter: [fx ? 'url(#rgbSplit)' : '', neg ? 'invert(1) hue-rotate(180deg)' : '', rew ? 'saturate(0.35) contrast(1.2)' : '', zp > 0 ? `blur(${zp * zp * 10}px)` : ''].join(' ').trim() || undefined, transform: `translate(${shake[0]}px, ${shake[1]}px) scale(${(1 + amt * 0.02) * zoom})`, transformOrigin: '540px 950px', clipPath: iris < 1 ? `circle(${Math.pow(iris, 0.7) * 120}% at 540px 880px)` : undefined}}>
        <Freeze frame={Math.round(tc * FPS)} active={tc !== t}>
          <IsoQuinze3D />
        </Freeze>
        {t < OUTRO_AT && <DoubleExpo t={t} />}
      </AbsoluteFill>
      {lines > 0 && <SpeedLines a={lines * 0.55} f={f} />}
      <Rewind t={t} f={f} />
      <SlowTag t={t} />
      {zp > 0.6 && <AbsoluteFill style={{background: '#fff', opacity: (zp - 0.6) / 0.4}} />}
      <Leaks t={t} />
      {flash && <AbsoluteFill style={{zIndex: 200}}><FlashFrame d={flash.d} p={(t - flash.at) / FLASH + 0.34} f={f} /></AbsoluteFill>}
      <AbsoluteFill style={{zIndex: 201}}><WordBurst t={t} /></AbsoluteFill>
      <Grain f={f} />
      <SoundDesign cues={CUES} />
    </AbsoluteFill>
  );
};
