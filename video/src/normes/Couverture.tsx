import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {P, PremiumBackground} from '../premium/kit';
import {sansFont} from '../theme';

/**
 * Couverture de « Le vrai rôle des grandes normes ISO » : titre de la thématique et les 3 normes de la capsule avec
 * leur rôle, dans l'univers « premium » clair de la vidéo. Rendue en image fixe, posée sur les premières images de la
 * vidéo et jointe au MP4 comme vignette.
 */
const NORMS: [string, string, string, string][] = [
  ['9001', 'Qualité', 'Le produit parfait, pour le client', P.navy],
  ['14001', 'Environnement', 'Prouver au régulateur', P.green],
  ['45001', 'Santé-sécurité', 'Le bouclier des travailleurs', P.navy2],
];

export const NormesCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: P.navy}}>
    <PremiumBackground />
    <div style={{position: 'absolute', left: 0, right: 0, top: 110, display: 'flex', justifyContent: 'center'}}><Img src={staticFile('promo/logo.png')} style={{height: 150}} /></div>
    <div style={{position: 'absolute', left: 80, right: 80, top: 380}}>
      <div style={{fontWeight: 800, fontSize: 32, letterSpacing: 6, color: P.green}}>NORMES ISO</div>
      <div style={{fontWeight: 900, fontSize: 104, lineHeight: 1.02, marginTop: 14, letterSpacing: -2}}>Le vrai rôle des <span style={{color: P.green}}>grandes normes</span> ISO</div>
      <div style={{width: 120, height: 8, borderRadius: 4, background: P.green, marginTop: 26}} />
    </div>
    <div style={{position: 'absolute', left: 80, right: 80, top: 900, display: 'flex', flexDirection: 'column', gap: 24}}>
      {NORMS.map(([n, d, r, c]) => (
        <div key={n} style={{display: 'flex', alignItems: 'center', gap: 28, background: P.white, borderRadius: 30, boxShadow: '0 18px 40px rgba(14,42,92,0.12)', padding: '22px 26px'}}>
          <div style={{width: 220, height: 160, borderRadius: 32, background: c, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
            <div style={{fontWeight: 800, fontSize: 26, letterSpacing: 4, opacity: 0.85}}>ISO</div>
            <div style={{fontWeight: 900, fontSize: 52, lineHeight: 1}}>{n}</div>
          </div>
          <div>
            <div style={{fontWeight: 800, fontSize: 28, letterSpacing: 3, color: P.green, textTransform: 'uppercase'}}>{d}</div>
            <div style={{fontWeight: 900, fontSize: 40, lineHeight: 1.1, marginTop: 6}}>{r}</div>
          </div>
        </div>
      ))}
    </div>
    <div style={{position: 'absolute', left: 80, right: 80, top: 1620, fontWeight: 800, fontSize: 40, color: P.grey}}>L'équilibre d'une entreprise <span style={{color: P.green}}>responsable</span></div>
  </AbsoluteFill>
);
