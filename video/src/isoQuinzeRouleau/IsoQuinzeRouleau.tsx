import React from 'react';
import {AbsoluteFill, Audio, Img, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {s, sansFont} from '../theme';
import {Abs, Bg, easeIn, INK, lerp, LOGO, PAPER, PH, prog, spring, useT} from '../implIso/kit';
import {N} from '../isoQuinze3D/IsoQuinze3D';

/**
 * « Les 15 normes ISO — machine à sous » (voix d'origine, 74 s) — version épurée de la capsule 15 normes ISO : au
 * centre, un rouleau prisme 3D (cadre noir, faces blanches, triangles jaunes) porte les 15 normes ; à chaque norme,
 * il fait un tour complet (flou de vitesse, « tic » à chaque face) et s'arrête pile quand la voix la prononce ; sous le rouleau,
 * la signification de la norme s'écrit au rythme de la voix. Rien d'autre à l'écran (couverture en lettres-photos et
 * carte de fin de marque mises à part).
 */
const NBK = '#111';
const NAVY = '#0E2A5C';
export const OUTRO_AT = 74.6;
export const ISO_ROULEAU_FRAMES = s(OUTRO_AT + 3.8);

/* ═════════════ Rouleau prisme (modèle : cadre noir, faces blanches, triangles jaunes) ═════════════ */
// Prisme à 8 faces : chaque face affiche la norme la plus proche de sa position ; le contenu change hors champ, donc
// les 15 normes défilent sur un prisme aux faces voisines bien inclinées. Positions exprimées en « normes ».
const FACES = 8, FSTEP = 360 / FACES, FACE_H = 236, R3D = FACE_H / 2 / Math.tan((FSTEP / 2) * (Math.PI / 180));
const SPIN = 0.95;
const LAND = N.map((d) => d.at + 0.25);
const posTarget = (i: number) => (i < 0 ? 0 : i + N.length * (i + 1));
const curSpin = (t: number) => LAND.reduce((a, l, k) => (t >= l - SPIN ? k : a), -1);
const reelPos = (t: number) => {
  const i = curSpin(t);
  if (i < 0) return 0;
  const a = LAND[i];
  if (t < a) { const x = prog(t, a - SPIN, a, (v: number) => v); return lerp(posTarget(i - 1), posTarget(i), 1 - (1 - x) ** 3); }
  const tau = t - a;
  return posTarget(i) + 0.07 * Math.exp(-tau * 10) * Math.sin(tau * 34);
};
const hexMix = (a: string, b: string, k: number) => {
  const pa = [1, 3, 5].map((j) => parseInt(a.slice(j, j + 2), 16)), pb = [1, 3, 5].map((j) => parseInt(b.slice(j, j + 2), 16));
  return `rgb(${pa.map((v, j) => Math.round(v + (pb[j] - v) * Math.max(0, Math.min(1, k)))).join(',')})`;
};
const YELT = '#F2C230';
const PERSP = 900;
const Reel: React.FC = () => {
  const t = useT();
  const pos = reelPos(t);
  const speed = Math.abs(reelPos(t + 1 / 30) - pos);
  const phi = pos * FSTEP;
  const W = 960, H = 380, IN = 30, WH = H - 28;
  const faces = Array.from({length: FACES}, (_, k) => {
    let rel = (k * FSTEP - phi) % 360; if (rel > 180) rel -= 360; if (rel < -180) rel += 360;
    const n = k + FACES * Math.round((pos - k) / FACES);
    return {k, rel, d: N[((n % N.length) + N.length) % N.length]};
  }).filter((f) => Math.abs(f.rel) < 80).sort((x, y) => Math.cos((y.rel * Math.PI) / 180) - Math.cos((x.rel * Math.PI) / 180)).reverse();
  return (
    <Abs x={60} y={700} w={W} h={H}>
      <div style={{position: 'absolute', left: 50, right: 50, top: 0, bottom: 0, borderRadius: 44, background: NBK}} />
      <div style={{position: 'absolute', left: 50 + IN, right: 50 + IN, top: 14, height: WH, overflow: 'hidden', borderRadius: 30, filter: speed > 0.12 ? `blur(${Math.min(7, speed * 5)}px)` : 'none'}}>
        {faces.map(({k, rel, d}) => {
          const ar = (rel * Math.PI) / 180;
          const z = R3D * (1 - Math.cos(ar));
          const sc = PERSP / (PERSP + z);
          const y = -R3D * Math.sin(ar) * sc;
          const fsN = d.pre.length > 4 ? 136 : 150, fsP = d.pre.length > 4 ? 40 : 56;
          return (
            <div key={k} style={{position: 'absolute', left: 6, right: 6, top: WH / 2 - FACE_H / 2, height: FACE_H, transform: `translateY(${y}px) scale(${sc}) perspective(${PERSP}px) rotateX(${rel}deg)`, background: '#fff', borderRadius: 16, border: '5px solid #E3E6EC', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18}}>
              <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: fsP, color: hexMix('#111111', d.c, (Math.abs(rel) - 10) / 22), letterSpacing: 2}}>{d.pre}</span>
              <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: fsN, color: hexMix('#111111', d.c, (Math.abs(rel) - 10) / 22), letterSpacing: 2}}>{d.num}</span>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: 0, top: H / 2 - 34, width: 0, height: 0, borderTop: '34px solid transparent', borderBottom: '34px solid transparent', borderLeft: `44px solid ${YELT}`}} />
      <div style={{position: 'absolute', right: 0, top: H / 2 - 34, width: 0, height: 0, borderTop: '34px solid transparent', borderBottom: '34px solid transparent', borderRight: `44px solid ${YELT}`}} />
    </Abs>
  );
};

/* ═════════════ Signification de la norme, écrite au rythme de la voix ═════════════ */
const Meaning: React.FC = () => {
  const t = useT();
  const i = N.reduce((a, d, k) => (t >= LAND[k] ? k : a), -1);
  if (i < 0) return null;
  const d = N[i];
  const words = d.desc.split(' ');
  const out = prog(t, d.end - 0.25, d.end, easeIn);
  const span = Math.max(0.6, Math.min(d.end - d.da - 0.4, words.length * 0.32));
  const fs = d.desc.length > 40 ? 56 : d.desc.length > 26 ? 66 : 76;
  return (
    <Abs x={60} y={1150} w={960} h={330} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', opacity: 1 - out}}>
      <div key={d.num} style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: fs * 0.3, rowGap: 4, maxWidth: 940, textAlign: 'center'}}>
        {words.map((w, k) => {
          const at = d.da + (span * k) / words.length;
          const p = Math.min(1, spring(t, at, 11, 16));
          return <span key={k} style={{fontFamily: sansFont, fontWeight: 900, fontSize: fs, lineHeight: 1.12, color: INK, opacity: t >= at ? 1 : 0, transform: `translateY(${(1 - p) * 40}px)`, display: 'inline-block'}}>{w}</span>;
        })}
      </div>
      <div style={{marginTop: 22, height: 12, borderRadius: 6, background: d.c, width: 520 * prog(t, d.da, d.da + span + 0.2)}} />
    </Abs>
  );
};

/* ═════════════ Couverture : photo + titre en lettres-photos ═════════════ */
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
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.6, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('metroiso-gen/couverture.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 900, objectFit: 'cover', objectPosition: '50% 40%', transform: `scale(${1 + t * 0.02})`}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 30%, ${PAPER}CC 40%, ${PAPER} 47%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={760} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="LES 15 NORMES" src="metroiso-gen/qualite.jpg" size={104} ls={2} seed={2} /></Abs>
      <Abs x={0} y={880} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="ISO" src="metroiso-gen/environnement.jpg" size={300} ls={8} /></Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Bruitage ═════════════ */
const reelTicks = (i: number): Sfx[] => { const outp: Sfx[] = []; let last = Math.floor(posTarget(i - 1)); for (let x = LAND[i] - SPIN; x < LAND[i]; x += 1 / 60) { const f = Math.floor(reelPos(x)); if (f !== last) { outp.push({at: x, s: 'tick', v: 0.09, dur: 0.15}); last = f; } } return outp; };
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...N.flatMap((d, i) => [{at: LAND[i] - SPIN, s: 'sfx/click', v: 0.32}, {at: LAND[i] - SPIN + 0.02, s: 'sfx/swish', v: 0.25}, ...reelTicks(i), {at: LAND[i], s: 'sfx/thud', v: 0.38}, {at: LAND[i] + 0.03, s: 'sfx/ding', v: 0.24}] as Sfx[]),
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const IsoQuinzeRouleau: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.0} to={OUTRO_AT}><Reel /></Gate>
    <Gate from={2.5} to={OUTRO_AT}><Meaning /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <Audio src={staticFile('voix-isoquinze-metro-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
