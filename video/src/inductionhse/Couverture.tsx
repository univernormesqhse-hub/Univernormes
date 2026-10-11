import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {Backdrop, shadow} from '../identui/IdentUi';
import {colors, handFont, sansFont} from '../theme';

/**
 * Couverture de « L'induction HSE » : titre de la thématique sur la photo terrain de l'ouverture de la capsule.
 * Rendue en image fixe, posée sur les premières images de la vidéo et jointe au MP4 comme vignette.
 */
const RED = '#D9443A';
const ECO = '#2E9B3E';
const HSE: [string, string, string][] = [['H', 'Hygiène · Santé', '#2F6FB5'], ['S', 'Sécurité', '#E8892B'], ['E', 'Environnement', ECO]];

export const InductionHseCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Backdrop />
    <div style={{position: 'absolute', left: 50, right: 50, top: 240, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: ECO, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>ACCUEIL SÉCURITÉ</div>
      <div style={{fontWeight: 900, fontSize: 92, textTransform: 'uppercase', marginTop: 24, lineHeight: 1}}>L'induction</div>
      <div style={{fontWeight: 900, fontSize: 210, lineHeight: 0.95, letterSpacing: -4, color: ECO}}>HSE</div>
      <div style={{fontWeight: 900, fontSize: 52, textTransform: 'uppercase', marginTop: 8}}>Une étape <span style={{color: RED}}>non négociable</span></div>
    </div>
    <div style={{position: 'absolute', left: 90, top: 820, width: 900, height: 590, borderRadius: 36, overflow: 'hidden', boxShadow: shadow, transform: 'rotate(-2deg)', border: '12px solid #fff'}}>
      <Img src={staticFile('induction/mine-equipe.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    </div>
    <div style={{position: 'absolute', left: 70, right: 70, top: 1480, display: 'flex', gap: 20}}>
      {HSE.map(([l, n, c]) => (
        <div key={l} style={{flex: 1, background: '#fff', borderRadius: 24, boxShadow: shadow, padding: '16px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4}}>
          <div style={{fontWeight: 900, fontSize: 70, lineHeight: 1, color: c}}>{l}</div>
          <div style={{fontWeight: 800, fontSize: 24, textTransform: 'uppercase'}}>{n}</div>
        </div>
      ))}
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1720, textAlign: 'center', fontFamily: handFont, fontSize: 52, opacity: 0.85}}>Bonjour et bienvenue !</div>
  </AbsoluteFill>
);
