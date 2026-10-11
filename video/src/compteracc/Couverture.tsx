import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Backdrop} from '../identui/IdentUi';
import {colors, handFont, sansFont} from '../theme';

/**
 * Couverture de « Pourquoi compter les accidents ne suffit plus » : titre de la thématique et la jauge réactif →
 * proactif de l'ouverture de la capsule. Rendue en image fixe, posée sur les premières images de la vidéo et jointe
 * au MP4 comme vignette.
 */
const RED = '#D9443A';

export const CompterAccCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Backdrop />
    <div style={{position: 'absolute', left: 50, right: 50, top: 250, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: colors.green, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>PILOTAGE SÉCURITÉ</div>
      <div style={{fontWeight: 900, fontSize: 72, textTransform: 'uppercase', marginTop: 26, lineHeight: 1}}>Pourquoi compter</div>
      <div style={{fontWeight: 900, fontSize: 104, textTransform: 'uppercase', lineHeight: 1, marginTop: 8, letterSpacing: -2, color: RED}}>les accidents</div>
      <div style={{fontWeight: 900, fontSize: 72, textTransform: 'uppercase', lineHeight: 1, marginTop: 8}}>ne suffit plus</div>
    </div>
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <path d="M220 1300 A320 320 0 0 1 860 1300" fill="none" stroke="#E5E8EC" strokeWidth={60} strokeLinecap="round" />
      <path d="M220 1300 A320 320 0 0 1 540 980" fill="none" stroke={RED} strokeWidth={60} strokeLinecap="round" opacity={0.85} />
      <path d="M540 980 A320 320 0 0 1 860 1300" fill="none" stroke={colors.green} strokeWidth={60} strokeLinecap="round" />
      <g transform="rotate(62 540 1300)"><line x1={540} y1={1300} x2={540} y2={1020} stroke={colors.navy} strokeWidth={16} strokeLinecap="round" /></g>
      <circle cx={540} cy={1300} r={40} fill={colors.navy} />
      <text x={250} y={1400} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={44} fill={RED}>Réactif</text>
      <text x={830} y={1400} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={44} fill={colors.green}>Proactif</text>
    </svg>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1520, textAlign: 'center', fontWeight: 900, fontSize: 50, textTransform: 'uppercase'}}>Le rôle des indicateurs <span style={{color: colors.green}}>proactifs</span></div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1680, textAlign: 'center', fontFamily: handFont, fontSize: 52, opacity: 0.85}}>Ne plus regarder dans le rétroviseur</div>
  </AbsoluteFill>
);
