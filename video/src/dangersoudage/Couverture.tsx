import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {handFont, sansFont} from '../theme';

/**
 * Couverture de « Le danger invisible du soudage » : titre de la thématique dans l'univers « laboratoire » clair de la
 * capsule, sur la photo du soudeur dans les fumées. Rendue en image fixe, posée sur les premières images de la vidéo
 * et jointe au MP4 comme vignette.
 */
const INK = '#14283C';
const TEAL = '#2A8FA8';
const RED = '#D9443A';

export const DangerSoudageCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: INK, background: 'linear-gradient(180deg, #F3F7FA 0%, #E2EAF1 100%)'}}>
    <div style={{position: 'absolute', left: 0, right: 0, top: 80, display: 'flex', justifyContent: 'center'}}><Img src={staticFile('promo/logo.png')} style={{height: 96}} /></div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 250, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: TEAL, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>SANTÉ AU TRAVAIL</div>
      <div style={{fontWeight: 900, fontSize: 78, textTransform: 'uppercase', marginTop: 26, lineHeight: 1}}>Le danger</div>
      <div style={{fontWeight: 900, fontSize: 130, textTransform: 'uppercase', lineHeight: 1, letterSpacing: -3, color: RED}}>invisible</div>
      <div style={{fontWeight: 900, fontSize: 78, textTransform: 'uppercase', lineHeight: 1}}>du soudage</div>
    </div>
    <div style={{position: 'absolute', left: 140, top: 720, width: 800, height: 800, borderRadius: 40, overflow: 'hidden', boxShadow: '0 40px 90px rgba(20,40,60,0.35)'}}>
      <Img src={staticFile('soudage/soudeur-fumees.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,40,60,0) 55%, rgba(20,40,60,0.85))'}} />
      <div style={{position: 'absolute', left: 40, right: 40, bottom: 36, textAlign: 'center', color: '#fff', fontWeight: 900, fontSize: 44, textTransform: 'uppercase', lineHeight: 1.1}}>Les fumées de soudage peuvent causer des <span style={{color: '#FF6B5E'}}>cancers</span></div>
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1600, textAlign: 'center', fontFamily: handFont, fontSize: 54, color: INK, opacity: 0.85}}>Jamais une simple fumée inoffensive</div>
  </AbsoluteFill>
);
