import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {s, sansFont} from '../theme';
import {Abs, Bg, easeIn, INK, lerp, LOGO, PAPER, PH, prog, spring, useT} from '../implIso/kit';

/**
 * « Dictionnaire de la prévention — 10 sigles » (voix d'origine, 36 s) — cylindre VERTICAL : une colonne qui tourne
 * autour de son axe vertical porte les 10 sigles en tuiles de couleur ; à chaque sigle, elle fait un tour complet
 * (flou de vitesse, « tic » à chaque face) et s'arrête pile quand la voix le prononce, le sigle face à nous, les
 * voisins visibles de profil sur les bords courbes. Sous la colonne, la signification s'écrit mot à mot au rythme de
 * la voix, les lettres qui forment le sigle dans sa couleur. Rien d'autre à l'écran (couverture en lettres-photos et
 * carte de fin de marque mises à part). Voix décalée de OFF secondes pour laisser la couverture s'afficher.
 */
const NBK = '#111';
const NAVY = '#0E2A5C';
const OFF = 2.6;
type SG = {g: string; desc: string; c: string; at: number; da: number; de: number};
// Temps calés sur les segments de parole (détection des silences) de la voix d'origine, en secondes de la voix.
const RAW: SG[] = [
  {g: 'QHSE', desc: 'Qualité, Hygiène, Sécurité, Environnement', c: '#1F5FBF', at: 0.0, da: 1.68, de: 3.73},
  {g: 'HSE', desc: 'Hygiène, Sécurité, Environnement', c: '#1E8E4A', at: 4.52, da: 5.7, de: 7.1},
  {g: 'SST', desc: 'Santé et Sécurité au Travail', c: '#009FC2', at: 8.03, da: 9.22, de: 10.8},
  {g: 'EPI', desc: 'Équipement de Protection Individuelle', c: '#E0A100', at: 11.6, da: 12.25, de: 14.38},
  {g: 'EPC', desc: 'Équipement de Protection Collective', c: '#F07A12', at: 15.22, da: 15.75, de: 17.9},
  {g: 'DUERP', desc: "Document Unique d'Évaluation des Risques Professionnels", c: '#7B3FB5', at: 18.81, da: 19.45, de: 22.62},
  {g: 'AT', desc: 'Accident du Travail', c: '#D9363E', at: 23.45, da: 24.46, de: 25.4},
  {g: 'FDS', desc: 'Fiche de Données de Sécurité', c: '#0F9D8F', at: 26.23, da: 27.32, de: 30.25},
  {g: 'RPS', desc: 'Risques Psycho-Sociaux', c: '#C2367A', at: 30.74, da: 32.54, de: 33.42},
  {g: 'PDCA', desc: 'Plan, Do, Check, Act', c: '#5DA62A', at: 33.88, da: 34.5, de: 36.01},
];
const L: SG[] = RAW.map((d) => ({...d, at: d.at + OFF, da: d.da + OFF, de: d.de + OFF}));
const VOICE_END = 36.3;
export const OUTRO_AT = VOICE_END + OFF + 0.4;
export const SIGLES_CYLINDRE_FRAMES = s(OUTRO_AT + 3.8);

/* ═════════════ Cylindre vertical (axe vertical : les faces défilent de droite à gauche) ═════════════ */
const FACES = 10, FSTEP = 360 / FACES, FACE_W = 640, R3D = FACE_W / 2 / Math.tan((FSTEP / 2) * (Math.PI / 180));
const SPIN = 0.95;
const LAND = L.map((d) => d.at + 0.15);
const posTarget = (i: number) => (i < 0 ? 0 : i + L.length * (i + 1));
const curSpin = (t: number) => LAND.reduce((a, l, k) => (t >= l - SPIN ? k : a), -1);
const reelPos = (t: number) => {
  const i = curSpin(t);
  if (i < 0) return 0;
  const a = LAND[i];
  if (t < a) { const x = prog(t, a - SPIN, a, (v: number) => v); return lerp(posTarget(i - 1), posTarget(i), 1 - (1 - x) ** 3); }
  const tau = t - a;
  return posTarget(i) + 0.07 * Math.exp(-tau * 10) * Math.sin(tau * 34);
};
const YELT = '#F2C230';
const PERSP = 1150;
const Tiles: React.FC<{g: string; c: string}> = ({g, c}) => {
  const n = g.length;
  const tw = n >= 5 ? 106 : n === 4 ? 128 : n === 3 ? 150 : 168;
  return (
    <div style={{display: 'flex', gap: 12}}>
      {g.split('').map((ch, k) => (
        <div key={k} style={{width: tw, height: tw * 1.18, borderRadius: 22, background: c, border: `5px solid ${NBK}`, boxShadow: `0 7px 0 ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: tw * 0.78, color: '#fff', lineHeight: 1}}>{ch}</div>
      ))}
    </div>
  );
};
const Cylinder: React.FC = () => {
  const t = useT();
  const pos = reelPos(t);
  const speed = Math.abs(reelPos(t + 1 / 30) - pos);
  const phi = pos * FSTEP;
  const W = 960, H = 580, TOP = 56, WH = H - 2 * TOP;
  const faces = Array.from({length: FACES}, (_, k) => {
    let rel = (k * FSTEP - phi) % 360; if (rel > 180) rel -= 360; if (rel < -180) rel += 360;
    const n = k + FACES * Math.round((pos - k) / FACES);
    return {k, rel, d: L[((n % L.length) + L.length) % L.length]};
  }).filter((f) => Math.abs(f.rel) < 80).sort((x, y) => Math.cos((x.rel * Math.PI) / 180) - Math.cos((y.rel * Math.PI) / 180));
  const cur = L[Math.max(0, curSpin(t))];
  const glow = t > LAND[Math.max(0, curSpin(t))] ? Math.max(0, 1 - (t - LAND[Math.max(0, curSpin(t))]) / 0.6) : 0;
  return (
    <Abs x={60} y={600} w={W} h={H}>
      {/* corps de la colonne : rebords elliptiques haut et bas, fût noir */}
      <div style={{position: 'absolute', left: 40, right: 40, top: TOP - 8, bottom: TOP - 8, background: NBK, borderRadius: 30}} />
      <div style={{position: 'absolute', left: 30, right: 30, top: 0, height: TOP * 2, borderRadius: '50%', background: 'linear-gradient(180deg, #3A3F49 0%, #111 70%)', border: `5px solid ${NBK}`}} />
      <div style={{position: 'absolute', left: 30, right: 30, bottom: 0, height: TOP * 2, borderRadius: '50%', background: 'linear-gradient(0deg, #3A3F49 0%, #111 70%)', border: `5px solid ${NBK}`}} />
      <div style={{position: 'absolute', left: 70, right: 70, top: TOP - 4, height: 26, borderRadius: '50%', background: '#000', opacity: 0.85}} />
      {/* fenêtre de la colonne : les faces tournent autour de l'axe vertical */}
      <div style={{position: 'absolute', left: 64, right: 64, top: TOP, height: WH, overflow: 'hidden', background: '#1B1F27', filter: speed > 0.12 ? `blur(${Math.min(8, speed * 5)}px)` : 'none', boxShadow: glow > 0 ? `inset 0 0 ${60 * glow}px ${cur.c}` : undefined}}>
        {faces.map(({k, rel, d}) => {
          const ar = (rel * Math.PI) / 180;
          const z = R3D * (1 - Math.cos(ar));
          const sc = PERSP / (PERSP + z);
          const x = R3D * Math.sin(ar) * sc;
          const shade = Math.min(0.75, Math.abs(rel) / 70);
          return (
            <div key={k} style={{position: 'absolute', top: 10, bottom: 10, left: (W - 128) / 2 - FACE_W / 2, width: FACE_W, transform: `translateX(${x}px) scale(${sc}) perspective(${PERSP}px) rotateY(${-rel}deg)`, background: '#fff', borderRadius: 16, border: '5px solid #E3E6EC', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
              <Tiles g={d.g} c={d.c} />
              <div style={{position: 'absolute', inset: 0, background: `rgba(10,12,18,${shade})`}} />
            </div>
          );
        })}
        {/* ombrage cylindrique : bords sombres, reflet vertical */}
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.25) 16%, rgba(0,0,0,0) 32%, rgba(0,0,0,0) 68%, rgba(0,0,0,0.25) 84%, rgba(0,0,0,0.78) 100%)'}} />
        <div style={{position: 'absolute', top: 0, bottom: 0, left: '36%', width: '6%', background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.16), rgba(255,255,255,0))'}} />
      </div>
      {/* repères : triangles jaunes haut et bas */}
      <div style={{position: 'absolute', left: W / 2 - 34, top: -38, width: 0, height: 0, borderLeft: '34px solid transparent', borderRight: '34px solid transparent', borderTop: `44px solid ${YELT}`}} />
      <div style={{position: 'absolute', left: W / 2 - 34, bottom: -38, width: 0, height: 0, borderLeft: '34px solid transparent', borderRight: '34px solid transparent', borderBottom: `44px solid ${YELT}`}} />
    </Abs>
  );
};

/* ═════════════ En-tête discret : rubrique + compteur ═════════════ */
const Header: React.FC = () => {
  const t = useT();
  const i = LAND.reduce((a, l, k) => (t >= l ? k : a), 0);
  return (
    <Abs x={60} y={470} w={960} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: prog(t, 2.3, 2.8)}}>
      <span style={{fontFamily: '"JetBrains Mono", "DejaVu Sans Mono", monospace', fontWeight: 700, fontSize: 26, letterSpacing: 4, color: '#5B6476'}}>DICTIONNAIRE DE LA PRÉVENTION</span>
      <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: L[i].c}}>{String(i + 1).padStart(2, '0')}<span style={{color: '#9AA3B2', fontSize: 28}}> / {L.length}</span></span>
    </Abs>
  );
};

/* ═════════════ Signification : s'écrit au rythme de la voix, lettres du sigle en couleur ═════════════ */
const Meaning: React.FC = () => {
  const t = useT();
  const i = L.reduce((a, d, k) => (t >= LAND[k] ? k : a), -1);
  if (i < 0) return null;
  const d = L[i];
  const next = i + 1 < L.length ? LAND[i + 1] - SPIN : OUTRO_AT;
  const words = d.desc.split(' ');
  const out = prog(t, next - 0.25, next, easeIn);
  const tot = words.reduce((a, w) => a + w.length + 1, 0);
  const fs = d.desc.length > 44 ? 58 : d.desc.length > 30 ? 66 : 76;
  let acc = 0;
  return (
    <Abs x={60} y={1255} w={960} h={420} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', opacity: 1 - out}}>
      <div key={d.g} style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: fs * 0.3, rowGap: 6, maxWidth: 940, textAlign: 'center'}}>
        {words.map((w, k) => {
          const at = d.da + ((d.de - d.da) * acc) / tot - 0.1;
          acc += w.length + 1;
          const p = Math.min(1, spring(t, at, 11, 16));
          return (
            <span key={k} style={{fontFamily: sansFont, fontWeight: 900, fontSize: fs, lineHeight: 1.12, color: INK, opacity: t >= at ? 1 : 0, transform: `translateY(${(1 - p) * 40}px)`, display: 'inline-block'}}>
              {w.split('').map((ch, j) => <span key={j} style={{color: /[A-ZÀ-Ý]/.test(ch) ? d.c : INK}}>{ch}</span>)}
            </span>
          );
        })}
      </div>
      <div style={{marginTop: 26, height: 12, borderRadius: 6, background: d.c, width: 520 * prog(t, d.da, d.de + 0.2)}} />
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
      <Img src={PH('rhse-gen/prevention.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1000, objectFit: 'cover', objectPosition: '45% 30%', transform: `scale(${1 + t * 0.02})`}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 33%, ${PAPER}CC 44%, ${PAPER} 52%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={880} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="DICTIONNAIRE DE LA" src="heures-gen/equipe-chantier.jpg" size={74} ls={2} seed={2} /></Abs>
      <Abs x={0} y={975} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="PRÉVENTION" src="influence-gen/terrain.jpg" size={142} ls={3} seed={5} /></Abs>
      <Abs x={0} y={1180} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 12}}>{L.map((d) => <div key={d.g} style={{width: 66, height: 14, borderRadius: 7, background: d.c, opacity: 0.9}} />)}</Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Bruitage ═════════════ */
const reelTicks = (i: number): Sfx[] => { const outp: Sfx[] = []; let last = Math.floor(posTarget(i - 1)); for (let x = LAND[i] - SPIN; x < LAND[i]; x += 1 / 60) { const f = Math.floor(reelPos(x)); if (f !== last) { outp.push({at: x, s: 'tick', v: 0.09, dur: 0.15}); last = f; } } return outp; };
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...L.flatMap((d, i) => [{at: LAND[i] - SPIN, s: 'sfx/click', v: 0.32}, {at: LAND[i] - SPIN + 0.02, s: 'sfx/swish', v: 0.25}, ...reelTicks(i), {at: LAND[i], s: 'sfx/thud', v: 0.38}, {at: LAND[i] + 0.03, s: 'sfx/ding', v: 0.24}] as Sfx[]),
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const SiglesPreventionCylindre: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={1.4} to={OUTRO_AT}><Cylinder /></Gate>
    <Gate from={2.2} to={OUTRO_AT}><Header /></Gate>
    <Gate from={2.6} to={OUTRO_AT}><Meaning /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <Sequence from={s(OFF)}><Audio src={staticFile('voix-sigles-prevention-origine.m4a')} trimAfter={s(VOICE_END)} /></Sequence>
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
