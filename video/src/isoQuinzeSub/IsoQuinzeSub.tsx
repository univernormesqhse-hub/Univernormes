import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
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
 */
const FPS = 30;
const FLASH = 3 / FPS;
const FLASHES = N.slice(1).map((d) => ({d, at: shownAt(d) - 0.12}));
const WORDS = ['QUALITÉ', 'SÉCURITÉ', 'ENVIRONNEMENT', 'CONFIANCE', 'PERFORMANCE'];
const WORDS_AT = 2.5;
const NEG_AT = 75.62;
const LEAKS = [0, ...TRANS_AT, 73.4];

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

const RgbFilter: React.FC<{amt: number; f: number}> = ({amt, f}) => {
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
        <feBlend in="rg" in2="b2" mode="screen" />
      </filter>
    </svg>
  );
};

/** Image-éclair : numéro géant découpé dans la photo de la norme. */
const FlashFrame: React.FC<{d: (typeof N)[number]}> = ({d}) => (
  <AbsoluteFill style={{background: d.c, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 70, letterSpacing: 18, color: '#fff', opacity: 0.85}}>{d.pre}</div>
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: d.num.length > 4 ? 300 : 380, lineHeight: 0.9, letterSpacing: -12, backgroundImage: `url(${PH(d.img)})`, backgroundSize: 'cover', backgroundPosition: d.pos, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextStroke: '6px #fff', filter: 'contrast(1.25) saturate(1.3)'}}>{d.num}</div>
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: '#fff', marginTop: 24, textTransform: 'uppercase', letterSpacing: 6}}>{d.dom}</div>
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
];

export const ISO_QUINZE_SUB_FRAMES = Math.round((OUTRO_AT + 3.8) * FPS);
export const IsoQuinzeSub: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const amt = rgbAmt(t);
  const shake = amt > 0.05 ? [Math.sin(f * 1.7) * amt * 10, Math.cos(f * 2.3) * amt * 6] : [0, 0];
  const neg = near(t, NEG_AT, 0, 2 / FPS);
  const flash = FLASHES.find((x) => t >= x.at && t < x.at + FLASH);
  return (
    <AbsoluteFill style={{background: '#0B0F18'}}>
      {amt > 0.05 && <RgbFilter amt={amt} f={f} />}
      <AbsoluteFill style={{filter: [amt > 0.05 ? 'url(#rgbSplit)' : '', neg ? 'invert(1) hue-rotate(180deg)' : ''].join(' ').trim() || undefined, transform: `translate(${shake[0]}px, ${shake[1]}px) scale(${1 + amt * 0.02})`}}>
        <IsoQuinze3D />
        {t < OUTRO_AT && <DoubleExpo t={t} />}
      </AbsoluteFill>
      <Leaks t={t} />
      {flash && <AbsoluteFill style={{zIndex: 200}}><FlashFrame d={flash.d} /></AbsoluteFill>}
      <AbsoluteFill style={{zIndex: 201}}><WordBurst t={t} /></AbsoluteFill>
      <Grain f={f} />
      <SoundDesign cues={CUES} />
    </AbsoluteFill>
  );
};
