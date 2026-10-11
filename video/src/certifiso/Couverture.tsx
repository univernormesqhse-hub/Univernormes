import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Backdrop} from '../identui/IdentUi';
import {F} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';

/**
 * Couverture de « Pourquoi faire certifier son entreprise ISO » : titre de la thématique et les deux faces de la pièce
 * de l'ouverture (prestige ou stratégie). Rendue en image fixe, posée sur les premières images de la vidéo et jointe
 * au MP4 comme vignette.
 */
const ECO = '#2E9B3E';

const Coin: React.FC<{gold: boolean; icon: string; l: string; tilt: number}> = ({gold, icon, l, tilt}) => (
  <div style={{width: 400, height: 400, borderRadius: '50%', transform: `rotate(${tilt}deg)`, background: gold ? 'radial-gradient(circle at 35% 30%, #F8D77A, #C9962F)' : 'radial-gradient(circle at 35% 30%, #6FD07F, #1F7A2E)', boxShadow: '0 40px 80px rgba(14,30,60,0.3), inset 0 0 0 18px rgba(255,255,255,0.25)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
    <F n={icon} size={150} />
    <div style={{fontWeight: 900, fontSize: 42, color: '#fff', textTransform: 'uppercase', textShadow: '0 4px 10px rgba(0,0,0,0.25)'}}>{l}</div>
  </div>
);

export const CertifIsoCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Backdrop />
    <div style={{position: 'absolute', left: 50, right: 50, top: 290, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: ECO, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>CERTIFICATION ISO</div>
      <div style={{fontWeight: 900, fontSize: 80, textTransform: 'uppercase', marginTop: 30, lineHeight: 1, letterSpacing: -2}}>Pourquoi se faire</div>
      <div style={{fontWeight: 900, fontSize: 150, textTransform: 'uppercase', lineHeight: 1, letterSpacing: -4, color: ECO, marginTop: 8}}>certifier</div>
      <div style={{fontWeight: 900, fontSize: 120, textTransform: 'uppercase', lineHeight: 1, letterSpacing: -3}}>ISO ?</div>
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 900, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10}}>
      <Coin gold icon="couronne" l="Prestige ?" tilt={-6} />
      <div style={{fontWeight: 900, fontSize: 56, color: colors.navy, opacity: 0.5}}>ou</div>
      <Coin gold={false} icon="cible" l="Stratégie ?" tilt={6} />
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1520, textAlign: 'center', fontFamily: handFont, fontSize: 54, opacity: 0.85}}>Attention, subtilité !</div>
  </AbsoluteFill>
);
