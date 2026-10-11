import React from 'react';
import {AbsoluteFill} from 'remotion';
import {RED} from '../charte/ui';
import {Background} from '../components/Background';
import {Footer} from '../components/Footer';
import {Header} from '../components/Header';
import {F} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';
import {CHAPTERS} from './Certification';
import {ACCR, CERT} from './Scenes1';

/**
 * Couverture de « Certification vs accréditation » : titre de la thématique, les deux cartes de l'ouverture et les
 * 5 chapitres de la capsule, dans son habillage. Rendue en image fixe (image 90, une fois le bandeau et le pied de page
 * entrés), posée sur les premières images de la vidéo et jointe au MP4 comme vignette.
 */
const Card: React.FC<{icon: string; l: string; c: string; tilt: number}> = ({icon, l, c, tilt}) => (
  <div style={{width: 330, height: 260, borderRadius: 30, background: '#fff', borderTop: `12px solid ${c}`, boxShadow: '0 16px 32px rgba(14,30,60,0.16)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, transform: `rotate(${tilt}deg)`}}>
    <F n={icon} size={120} />
    <div style={{fontWeight: 900, fontSize: 34, color: c, textTransform: 'uppercase'}}>{l}</div>
  </div>
);

export const CertificationCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Background />
    <div style={{position: 'absolute', left: 50, right: 50, top: 270, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: colors.navy, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>LA MÊME CHOSE ?</div>
      <div style={{fontWeight: 900, fontSize: 96, textTransform: 'uppercase', lineHeight: 1, marginTop: 20, color: CERT, letterSpacing: -2}}>Certification</div>
      <div style={{fontWeight: 900, fontSize: 64, textTransform: 'uppercase', lineHeight: 1.1, color: RED}}>vs</div>
      <div style={{fontWeight: 900, fontSize: 96, textTransform: 'uppercase', lineHeight: 1, color: ACCR, letterSpacing: -2}}>Accréditation</div>
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 690, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30}}>
      <Card icon="check" l="Certification" c={CERT} tilt={-3} />
      <div style={{width: 80, height: 80, borderRadius: 40, background: colors.navy, color: '#fff', fontWeight: 900, fontSize: 50, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>?</div>
      <Card icon="loupe" l="Accréditation" c={ACCR} tilt={3} />
    </div>
    <div style={{position: 'absolute', left: 90, right: 90, top: 1030, display: 'flex', flexDirection: 'column', gap: 12}}>
      {CHAPTERS.map(([, , n, l, sub, icons]) => (
        <div key={n} style={{display: 'flex', alignItems: 'center', gap: 18, background: '#fff', borderRadius: 20, boxShadow: '0 8px 18px rgba(14,30,60,0.12)', padding: '10px 20px'}}>
          <div style={{width: 54, height: 54, borderRadius: 27, background: colors.navy, color: '#fff', fontWeight: 900, fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{n}</div>
          <div style={{flex: 1}}><div style={{fontWeight: 900, fontSize: 30, lineHeight: 1.05}}>{l}</div><div style={{fontWeight: 700, fontSize: 22, color: '#6B7684'}}>{sub}</div></div>
          <F n={icons[0]} size={50} />
        </div>
      ))}
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1530, textAlign: 'center', fontFamily: handFont, fontSize: 52}}>La hiérarchie de la <span style={{color: ACCR}}>confiance</span></div>
    <Header hideAt={999} logo="promo/logo.png" />
    <Footer hideAt={999} />
  </AbsoluteFill>
);
