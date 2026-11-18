/**
 * Habillage « papier cramé + deux cercles dorés » (demande du 19/11) : le fond blanc des capsules récentes devient le
 * papier crème de la capsule « mannequin » — grain fin, taches d'usure, bords brûlés (vignettage brun chaud) — et les
 * deux cercles colorés deviennent deux cercles dorés à opacité douce qui respirent et dérivent lentement.
 */
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useT} from '../anim';

export const PAPER_CREME = '#EEE8CE';

export const PaperGoldBg: React.FC = () => {
  const t = useT();
  const b1 = 1 + 0.04 * Math.sin(t * 0.5), b2 = 1 + 0.05 * Math.cos(t * 0.42);
  return (
    <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 45%, #F4EFD9 0%, ${PAPER_CREME} 55%, #E6DCB8 100%)`}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: 0.16, mixBlendMode: 'multiply'}}>
        <filter id="pgGrain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={7} /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width={1080} height={1920} filter="url(#pgGrain)" />
      </svg>
      {[[880, 520, 260, 0.10], [140, 1500, 320, 0.09], [960, 1640, 200, 0.08], [90, 300, 180, 0.07], [620, 1180, 150, 0.05]].map(([x, y, r, o], i) => (
        <div key={i} style={{position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: '50%', background: `radial-gradient(circle, rgba(120,110,90,${o}) 0%, rgba(120,110,90,${o * 0.5}) 45%, rgba(120,110,90,0) 70%)`}} />
      ))}
      <div style={{position: 'absolute', left: 700 + Math.sin(t * 0.12) * 30, top: 380 + Math.cos(t * 0.1) * 40, width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle at 40% 40%, rgba(212,160,23,0.30), rgba(212,160,23,0.20) 60%, rgba(212,160,23,0.10))', transform: `scale(${b1})`}} />
      <div style={{position: 'absolute', left: -230 + Math.cos(t * 0.11) * 30, top: 1180 + Math.sin(t * 0.09) * 40, width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle at 60% 40%, rgba(184,134,11,0.24), rgba(184,134,11,0.15) 60%, rgba(184,134,11,0.07))', transform: `scale(${b2})`}} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0) 58%, rgba(122,74,24,0.16) 82%, rgba(74,42,12,0.34) 100%)'}} />
    </AbsoluteFill>
  );
};
