import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {handFont, sansFont} from '../theme';

/**
 * Couverture (vignette) de « La sécurité dans les six directions » : titre de la thématique sur le diorama de la
 * capsule. Rendue en image fixe puis jointe au MP4 comme vignette, sans réencoder la vidéo.
 */
const BG = '#121821';
const INK = '#F4F1EA';
const AMBER = '#FFB21E';
const GREEN = '#2FC27A';
const DIRS: [string, string][] = [['Devant', '#FFB21E'], ['Derrière', '#FF7A3D'], ['À gauche', '#4DA8FF'], ['À droite', '#A78BFA'], ['Au-dessus', '#2FC27A'], ['Au-dessous', '#FF4D3D']];

export const SixDirectionsCouverture: React.FC = () => (
  <AbsoluteFill style={{background: `radial-gradient(120% 70% at 50% 18%, #26324A 0%, ${BG} 60%)`, overflow: 'hidden'}}>
    {/* Diorama de la capsule (zone sans texte ni sous-titre) */}
    <div style={{position: 'absolute', left: 0, top: 1130, width: 1080, height: 790, overflow: 'hidden'}}>
      <Img src={staticFile('sixdirections/couv-fond.jpg')} style={{position: 'absolute', left: 0, top: -840, width: 1080, height: 1920}} />
    </div>
    <AbsoluteFill style={{background: `linear-gradient(180deg, ${BG} 0%, ${BG} 56%, ${BG}00 66%, ${BG}00 88%, ${BG}CC 100%)`}} />
    <div style={{position: 'absolute', left: 0, right: 0, top: 95, display: 'flex', justifyContent: 'center'}}>
      <div style={{background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile('promo/logo.png')} style={{height: 84, display: 'block'}} /></div>
    </div>
    <div style={{position: 'absolute', left: 60, right: 60, top: 290, textAlign: 'center', fontFamily: sansFont, color: INK}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: AMBER, color: BG, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>SÉCURITÉ AU TRAVAIL</div>
      <div style={{fontWeight: 900, fontSize: 70, lineHeight: 1, marginTop: 30, textTransform: 'uppercase', letterSpacing: -1}}>La sécurité dans les</div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, marginTop: 6}}>
        <span style={{fontWeight: 900, fontSize: 250, lineHeight: 1, color: AMBER, textShadow: '0 12px 40px rgba(255,178,30,0.35)'}}>6</span>
        <span style={{fontWeight: 900, fontSize: 112, lineHeight: 1, textTransform: 'uppercase', letterSpacing: -3}}>directions</span>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 34}}>
        {DIRS.map(([l, c]) => (
          <div key={l} style={{padding: '12px 0', borderRadius: 18, border: `3px solid ${c}`, background: `${c}22`, fontWeight: 800, fontSize: 34, color: INK}}>{l}</div>
        ))}
      </div>
      <div style={{fontFamily: handFont, fontSize: 46, color: GREEN, marginTop: 22}}>Avant toute activité : identifier, prévenir</div>
    </div>
  </AbsoluteFill>
);
