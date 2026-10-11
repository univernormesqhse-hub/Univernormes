import {Award, HardHat, Leaf, Scale, SprayCan} from 'lucide-react';
import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {P, PremiumBackground} from '../premium/kit';
import {sansFont} from '../theme';

/**
 * Couverture de « Comment le responsable QHSE protège l'entreprise » : titre de la thématique, les 4 piliers supervisés
 * et le rôle d'arbitre de la capsule, dans son univers « premium » clair. Rendue en image fixe, posée sur les premières
 * images de la vidéo et jointe au MP4 comme vignette.
 */
const PILLARS = [
  {Icon: Award, l: 'Qualité'},
  {Icon: SprayCan, l: 'Hygiène'},
  {Icon: HardHat, l: 'Sécurité'},
  {Icon: Leaf, l: 'Environnement'},
];

export const ResponsableCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: P.navy}}>
    <PremiumBackground />
    <div style={{position: 'absolute', left: 0, right: 0, top: 110, display: 'flex', justifyContent: 'center'}}><Img src={staticFile('promo/logo.png')} style={{height: 150}} /></div>
    <div style={{position: 'absolute', left: 80, right: 80, top: 380}}>
      <div style={{fontWeight: 800, fontSize: 32, letterSpacing: 6, color: P.green}}>FONCTION QHSE</div>
      <div style={{fontWeight: 900, fontSize: 96, lineHeight: 1.04, marginTop: 14, letterSpacing: -2}}>Comment le responsable QHSE <span style={{color: P.green}}>protège</span> l'entreprise</div>
      <div style={{width: 120, height: 8, borderRadius: 4, background: P.green, marginTop: 26}} />
    </div>
    <div style={{position: 'absolute', left: 80, right: 80, top: 1000}}>
      <div style={{fontWeight: 800, fontSize: 30, letterSpacing: 5, color: P.grey}}>IL SUPERVISE 4 PILIERS</div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 20}}>
        {PILLARS.map(({Icon, l}) => (
          <div key={l} style={{display: 'flex', alignItems: 'center', gap: 20, background: P.white, borderRadius: 26, boxShadow: '0 18px 40px rgba(14,42,92,0.12)', padding: '22px 24px'}}>
            <div style={{width: 84, height: 84, borderRadius: 42, background: P.navy, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Icon size={46} color="#fff" strokeWidth={2.2} /></div>
            <div style={{fontWeight: 900, fontSize: 36}}>{l}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{position: 'absolute', left: 80, right: 80, top: 1440, display: 'flex', alignItems: 'center', gap: 22, background: P.greenSoft, borderRadius: 26, padding: '22px 26px', borderLeft: `10px solid ${P.green}`}}>
      <Scale size={64} color={P.green} strokeWidth={2.2} />
      <div style={{fontWeight: 900, fontSize: 38, lineHeight: 1.15}}>L'arbitre entre la loi et la <span style={{color: P.green}}>réalité du terrain</span></div>
    </div>
  </AbsoluteFill>
);
