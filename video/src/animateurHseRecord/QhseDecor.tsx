/**
 * Décor « QHSE » plein cadre 1080 × 1920 — remplace le papier quadrillé des capsules précédentes.
 * Couches (de l'arrière vers l'avant) :
 * - mur technique bleu-gris clair, trame de plan (blueprint) très fine et lumière zénithale douce ;
 * - papier peint de pictogrammes de sécurité (obligation bleue, avertissement jaune, condition sûre verte,
 *   environnement) en filigrane, qui dérive lentement ;
 * - silhouette de site industriel / chantier BTP en deux plans de parallaxe (grue à tour qui pivote, immeuble
 *   en construction sous échafaudage, silos, cheminée qui fume, pylône) ;
 * - sol béton ciré en perspective : allée piétonne verte à liserés blancs, chevrons de circulation qui défilent,
 *   ligne de marquage jaune et noir au pied du mur, reflet du gyrophare au sol ;
 * - poussières en suspension dans le faisceau de lumière.
 * Tout est déterministe (temps de la composition), sans image externe.
 */
import React from 'react';
import {AbsoluteFill, random} from 'remotion';
import {Ear, Footprints, Glasses, Hand, HardHat, Leaf, Recycle, Shirt, TriangleAlert, Flame, DoorOpen, Cross} from 'lucide-react';
import {useT} from '../anim';

export const QHSE_WALL = '#EAF0F6';
const NAV = '#14213D';
const PICTOS: [React.FC<{size?: number; color?: string; strokeWidth?: number}>, string, 'o' | 't' | 's'][] = [
  [HardHat, '#1F5BD8', 'o'], [TriangleAlert, '#F5C400', 't'], [Glasses, '#1F5BD8', 'o'], [DoorOpen, '#14A35A', 's'], [Hand, '#1F5BD8', 'o'],
  [Flame, '#F5C400', 't'], [Ear, '#1F5BD8', 'o'], [Leaf, '#14A35A', 's'], [Footprints, '#1F5BD8', 'o'], [Recycle, '#14A35A', 's'], [Shirt, '#1F5BD8', 'o'], [Cross, '#14A35A', 's'],
];
const Picto: React.FC<{i: number; x: number; y: number; s: number}> = ({i, x, y, s}) => {
  const [I, c, k] = PICTOS[i % PICTOS.length];
  const shape: React.CSSProperties = k === 'o' ? {borderRadius: '50%', background: c} : k === 's' ? {borderRadius: s * 0.12, background: c} : {background: 'transparent'};
  return (
    <div style={{position: 'absolute', left: x - s / 2, top: y - s / 2, width: s, height: s, display: 'flex', alignItems: 'center', justifyContent: 'center', ...shape}}>
      {k === 't' ? (
        <svg width={s} height={s} viewBox="0 0 100 100" style={{position: 'absolute'}}><path d="M50 6 L96 90 L4 90 Z" fill={c} stroke={NAV} strokeWidth={7} strokeLinejoin="round" /></svg>
      ) : null}
      <div style={{position: 'relative', top: k === 't' ? s * 0.1 : 0}}><I size={s * (k === 't' ? 0.42 : 0.6)} color={k === 't' ? NAV : '#fff'} strokeWidth={2.4} /></div>
    </div>
  );
};

/* Silhouette de site : grue à tour, immeuble sous échafaudage, silos, cheminée, pylône */
const Skyline: React.FC<{t: number; y: number; s: number; dx: number; op: number; far?: boolean}> = ({t, y, s, dx, op, far}) => {
  const jib = Math.sin(t * 0.12) * 0.35;
  const ccos = Math.cos(jib);
  const col = far ? '#6E82A0' : '#3A4E6E';
  const steam = Array.from({length: 7}, (_, i) => {
    const q = ((t * 0.18 + i / 7) % 1);
    return <circle key={i} cx={760 + q * 40 + Math.sin(q * 6 + i) * 10} cy={-330 - q * 220} r={16 + q * 46} fill={col} opacity={0.35 * (1 - q)} />;
  });
  return (
    <svg width={1400} height={700} viewBox="-160 -600 1400 700" style={{position: 'absolute', left: -160 + dx, top: y - 600 * s, transform: `scale(${s})`, transformOrigin: '160px 600px', opacity: op}}>
      <g fill={col} stroke="none">
        {/* immeuble en construction + échafaudage */}
        <rect x={40} y={-300} width={250} height={300} />
        {Array.from({length: 6}, (_, r) => Array.from({length: 5}, (_, c) => <rect key={`${r}${c}`} x={56 + c * 46} y={-284 + r * 48} width={30} height={30} fill={QHSE_WALL} opacity={0.55} />))}
        <g stroke={col} strokeWidth={3} fill="none">{Array.from({length: 7}, (_, i) => <line key={`v${i}`} x1={20 + i * 46} y1={0} x2={20 + i * 46} y2={-345} />)}{Array.from({length: 8}, (_, i) => <line key={`h${i}`} x1={20} y1={-i * 48} x2={296} y2={-i * 48} />)}{Array.from({length: 6}, (_, i) => <line key={`d${i}`} x1={20 + i * 46} y1={-i * 48 - 48} x2={66 + i * 46} y2={-i * 48} />)}</g>
        {/* grue à tour */}
        <g stroke={col} strokeWidth={4} fill="none">
          <line x1={420} y1={0} x2={420} y2={-520} /><line x1={450} y1={0} x2={450} y2={-520} />
          {Array.from({length: 13}, (_, i) => <line key={i} x1={420} y1={-i * 40} x2={450} y2={-i * 40 - 40} />)}
        </g>
        <g transform={`translate(435 -520) scale(${ccos} 1)`}>
          <rect x={-120} y={-14} width={520} height={14} />
          <path d="M -10 -14 L 0 -70 L 10 -14 Z" />
          <line x1={0} y1={-70} x2={380} y2={-12} stroke={col} strokeWidth={3} /><line x1={0} y1={-70} x2={-110} y2={-12} stroke={col} strokeWidth={3} />
          <rect x={-130} y={0} width={60} height={34} />
          <line x1={260 + Math.sin(t * 0.3) * 60} y1={0} x2={260 + Math.sin(t * 0.3) * 60} y2={160 + Math.sin(t * 0.21) * 30} stroke={col} strokeWidth={3} />
          <rect x={240 + Math.sin(t * 0.3) * 60} y={160 + Math.sin(t * 0.21) * 30} width={40} height={26} />
        </g>
        {/* silos et cuves */}
        <rect x={540} y={-210} width={80} height={210} rx={10} /><ellipse cx={580} cy={-210} rx={40} ry={14} />
        <rect x={634} y={-170} width={70} height={170} rx={10} /><ellipse cx={669} cy={-170} rx={35} ry={12} />
        <path d="M 520 -120 L 724 -120" stroke={col} strokeWidth={5} />
        {/* cheminée */}
        <path d="M 742 0 L 752 -320 L 784 -320 L 794 0 Z" />
        <rect x={748} y={-300} width={42} height={10} fill="#D7263D" opacity={0.8} /><rect x={746} y={-260} width={46} height={10} fill="#fff" opacity={0.6} />
        {steam}
        {/* hangar */}
        <path d="M 830 0 L 830 -150 L 960 -210 L 1090 -150 L 1090 0 Z" />
        {Array.from({length: 4}, (_, i) => <rect key={i} x={852 + i * 60} y={-110} width={36} height={110} fill={QHSE_WALL} opacity={0.45} />)}
        {/* pylône */}
        <g stroke={col} strokeWidth={3} fill="none"><path d="M 1150 0 L 1180 -380 L 1210 0 M 1160 -130 L 1200 -130 M 1166 -250 L 1194 -250 M 1130 -300 L 1230 -300" /></g>
        <rect x={-160} y={0} width={1400} height={100} />
      </g>
    </svg>
  );
};

export const QhseBg: React.FC<{dim?: number}> = ({dim = 1}) => {
  const t = useT();
  const VP = {x: 540, y: 1330};
  const FLOOR = 1388;
  const edge = (x0: number) => `M ${VP.x + (x0 - VP.x) * 0.02} ${FLOOR} L ${x0} 1920`;
  const chevrons = Array.from({length: 7}, (_, i) => {
    const q = ((i / 7 + t * 0.06) % 1);
    const p = Math.pow(q, 1.9);
    const y = FLOOR + 8 + p * (1920 - FLOOR - 8);
    const w = 30 + p * 300;
    return <path key={i} d={`M ${540 - w / 2} ${y} L 540 ${y + w * 0.32} L ${540 + w / 2} ${y}`} fill="none" stroke="#fff" strokeWidth={4 + p * 18} strokeLinejoin="round" opacity={0.75 * Math.min(1, q * 5)} />;
  });
  const flare = 0.5 + 0.5 * Math.sin(t * 2.2);
  const dust = Array.from({length: 26}, (_, i) => {
    const sx = random(`qd${i}`) * 1080, sp = 0.15 + random(`qs${i}`) * 0.4;
    const y = 1900 - ((t * 28 * sp + random(`qy${i}`) * 1600) % 1600);
    return <circle key={i} cx={sx + Math.sin(t * 0.5 + i) * 24} cy={y} r={1.5 + random(`qr${i}`) * 2.5} fill="#fff" opacity={0.55} />;
  });
  const drift = (t * 9) % 260;
  return (
    <AbsoluteFill style={{background: QHSE_WALL, opacity: dim}}>
      {/* mur : dégradé + trame de plan */}
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #F3F7FB 0%, #EAF0F6 45%, #DFE7EF 72%)'}} />
      <AbsoluteFill style={{backgroundImage: 'linear-gradient(rgba(31,91,216,0.05) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(31,91,216,0.05) 1.5px, transparent 1.5px), linear-gradient(rgba(31,91,216,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(31,91,216,0.025) 1px, transparent 1px)', backgroundSize: '120px 120px, 120px 120px, 24px 24px, 24px 24px', backgroundPosition: `0 ${(t * 4) % 120}px`}} />
      {/* papier peint de pictogrammes */}
      <AbsoluteFill style={{opacity: 0.075}}>
        {Array.from({length: 40}, (_, i) => { const c = i % 5, r = Math.floor(i / 5); return <Picto key={i} i={i * 7 + r} x={60 + c * 240 + (r % 2) * 120} y={300 + r * 260 - drift} s={92} />; })}
      </AbsoluteFill>
      {/* lumière zénithale */}
      <AbsoluteFill style={{background: 'radial-gradient(ellipse 70% 38% at 50% 0%, rgba(255,255,255,0.85), transparent 70%)'}} />
      <AbsoluteFill style={{background: `conic-gradient(from 168deg at 540px -80px, transparent 0deg, rgba(255,255,255,0.32) 10deg, transparent 22deg)`, mixBlendMode: 'screen'}} />
      {/* site en deux plans de parallaxe */}
      <Skyline t={t} y={FLOOR - 6} s={0.78} dx={-60 - Math.sin(t * 0.05) * 30} op={0.09} far />
      <Skyline t={t + 7} y={FLOOR} s={1.0} dx={-260 + Math.sin(t * 0.05) * 50} op={0.12} />
      {/* sol béton en perspective */}
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        <defs>
          <linearGradient id="qfloor" x1="0" y1={FLOOR} x2="0" y2="1920" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#CBD4DE" /><stop offset="1" stopColor="#B7C2CE" /></linearGradient>
          <linearGradient id="qlane" x1="0" y1={FLOOR} x2="0" y2="1920" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#3FA86B" /><stop offset="1" stopColor="#1F8A4C" /></linearGradient>
          <radialGradient id="qbeacon" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#FF9A1F" stopOpacity="0.55" /><stop offset="1" stopColor="#FF9A1F" stopOpacity="0" /></radialGradient>
        </defs>
        <rect x={0} y={FLOOR} width={1080} height={1920 - FLOOR} fill="url(#qfloor)" />
        {Array.from({length: 13}, (_, i) => <path key={i} d={edge(-600 + i * 190)} stroke="rgba(20,33,61,0.07)" strokeWidth={2} />)}
        {Array.from({length: 7}, (_, i) => { const p = Math.pow((i + 1) / 8, 1.9); const y = FLOOR + p * (1920 - FLOOR); return <line key={i} x1={0} y1={y} x2={1080} y2={y} stroke="rgba(20,33,61,0.06)" strokeWidth={2} />; })}
        <path d={`M ${540 - 14} ${FLOOR} L ${540 + 14} ${FLOOR} L 900 1920 L 180 1920 Z`} fill="url(#qlane)" opacity={0.6} />
        <path d={`M ${540 - 16} ${FLOOR} L 160 1920`} stroke="#fff" strokeWidth={14} strokeDasharray="60 34" strokeDashoffset={-t * 40} />
        <path d={`M ${540 + 16} ${FLOOR} L 920 1920`} stroke="#fff" strokeWidth={14} strokeDasharray="60 34" strokeDashoffset={-t * 40} />
        <path d={`M ${540 - 24} ${FLOOR} L 60 1920`} stroke="#F5C400" strokeWidth={10} />
        <path d={`M ${540 + 24} ${FLOOR} L 1020 1920`} stroke="#F5C400" strokeWidth={10} />
        {chevrons}
        <ellipse cx={150} cy={1700} rx={260} ry={60} fill="url(#qbeacon)" opacity={0.35 + 0.45 * flare} />
        <ellipse cx={930} cy={1700} rx={260} ry={60} fill="url(#qbeacon)" opacity={0.35 + 0.45 * (1 - flare)} />
        {/* plinthe de marquage jaune et noir au pied du mur */}
        <defs><pattern id="qhz" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform={`rotate(45) translate(${(t * 10) % 40} 0)`}><rect width="20" height="40" fill="#F5C400" /><rect x="20" width="20" height="40" fill={NAV} /></pattern></defs>
        <rect x={0} y={FLOOR - 9} width={1080} height={18} fill="url(#qhz)" opacity={0.9} />
        <rect x={0} y={FLOOR + 9} width={1080} height={10} fill="rgba(20,33,61,0.12)" />
        {dust}
      </svg>
    </AbsoluteFill>
  );
};
