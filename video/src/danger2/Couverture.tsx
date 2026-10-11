import React from 'react';
import {AbsoluteFill} from 'remotion';
import {RED} from '../charte/ui';
import {Background} from '../components/Background';
import {Footer} from '../components/Footer';
import {Header} from '../components/Header';
import {F} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';
import {CHAPTERS} from './DangerRisque';

/**
 * Couverture de « Danger ou risque ? » : titre de la thématique, les deux cartes de l'ouverture et les 4 chapitres de
 * la capsule, dans son habillage. Rendue en image fixe (image 90, une fois le bandeau et le pied de page entrés),
 * posée sur les premières images de la vidéo et jointe au MP4 comme vignette.
 */
const AMBER = '#E3A92B';

const Card: React.FC<{icon: string; l: string; c: string; tilt: number}> = ({icon, l, c, tilt}) => (
  <div style={{width: 330, height: 270, borderRadius: 30, background: '#fff', borderTop: `12px solid ${c}`, boxShadow: '0 16px 32px rgba(14,30,60,0.16)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, transform: `rotate(${tilt}deg)`}}>
    <F n={icon} size={130} />
    <div style={{fontWeight: 900, fontSize: 44, color: c, textTransform: 'uppercase'}}>{l}</div>
  </div>
);

export const DangerRisqueCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Background />
    <div style={{position: 'absolute', left: 50, right: 50, top: 270, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: colors.navy, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>LE DÉCRYPTAGE</div>
      <div style={{fontWeight: 900, fontSize: 130, textTransform: 'uppercase', lineHeight: 1, marginTop: 20, color: RED, letterSpacing: -3}}>Danger</div>
      <div style={{fontWeight: 900, fontSize: 60, textTransform: 'uppercase', lineHeight: 1.1}}>ou</div>
      <div style={{fontWeight: 900, fontSize: 130, textTransform: 'uppercase', lineHeight: 1, color: AMBER, letterSpacing: -3}}>risque ?</div>
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30}}>
      <Card icon="danger" l="Danger" c={RED} tilt={-3} />
      <div style={{width: 80, height: 80, borderRadius: 40, background: colors.navy, color: '#fff', fontWeight: 900, fontSize: 50, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>?</div>
      <Card icon="de" l="Risque" c={AMBER} tilt={3} />
    </div>
    <div style={{position: 'absolute', left: 90, right: 90, top: 1110, display: 'flex', flexDirection: 'column', gap: 12}}>
      {CHAPTERS.map(([, , n, l, sub, icons]) => (
        <div key={n} style={{display: 'flex', alignItems: 'center', gap: 18, background: '#fff', borderRadius: 20, boxShadow: '0 8px 18px rgba(14,30,60,0.12)', padding: '10px 20px'}}>
          <div style={{width: 54, height: 54, borderRadius: 27, background: colors.navy, color: '#fff', fontWeight: 900, fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{n}</div>
          <div style={{flex: 1}}><div style={{fontWeight: 900, fontSize: 30, lineHeight: 1.05}}>{l}</div><div style={{fontWeight: 700, fontSize: 22, color: '#6B7684'}}>{sub}</div></div>
          <F n={icons[0]} size={50} />
        </div>
      ))}
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1560, textAlign: 'center', fontFamily: handFont, fontSize: 52}}>Bienvenue dans ce nouveau <span style={{color: colors.green}}>décryptage</span></div>
    <Header hideAt={999} logo="promo/logo.png" />
    <Footer hideAt={999} />
  </AbsoluteFill>
);
