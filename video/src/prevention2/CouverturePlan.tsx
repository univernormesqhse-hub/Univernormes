import React from 'react';
import {AbsoluteFill, staticFile} from 'remotion';
import {Background} from '../components/Background';
import {Footer} from '../components/Footer';
import {Header} from '../components/Header';
import {F} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';
import {CHAPTERS} from './PlanPrevention';

/**
 * Couverture de « Le plan de prévention » : titre de la thématique, la photo du site industriel de l'ouverture et les
 * 4 chapitres de la capsule, dans son habillage. Rendue en image fixe (image 90, une fois le bandeau et le pied de page
 * entrés), posée sur les premières images de la vidéo et jointe au MP4 comme vignette.
 */
export const PlanPreventionCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Background />
    <div style={{position: 'absolute', left: 50, right: 50, top: 270, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: colors.navy, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>ENTREPRISES EXTÉRIEURES</div>
      <div style={{fontWeight: 900, fontSize: 84, textTransform: 'uppercase', lineHeight: 1, marginTop: 20}}>Le plan de</div>
      <div style={{fontWeight: 900, fontSize: 130, textTransform: 'uppercase', lineHeight: 1, letterSpacing: -3, color: colors.green}}>prévention</div>
    </div>
    <div style={{position: 'absolute', left: 70, top: 640, width: 940, height: 500, borderRadius: 30, overflow: 'hidden', border: '10px solid #fff', boxShadow: '0 20px 40px rgba(14,30,60,0.22)', backgroundImage: `url(${staticFile('promo/raffinerie.jpg')})`, backgroundSize: 'cover', backgroundPosition: '50% 45%'}}>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: '60px 26px 20px', background: 'linear-gradient(180deg, rgba(14,30,60,0), rgba(14,30,60,0.85))', color: '#fff', fontWeight: 900, fontSize: 40}}>Site industriel à risques</div>
    </div>
    <div style={{position: 'absolute', left: 90, right: 90, top: 1190, display: 'flex', flexDirection: 'column', gap: 12}}>
      {CHAPTERS.map(([, , n, l, sub, icons]) => (
        <div key={n} style={{display: 'flex', alignItems: 'center', gap: 18, background: '#fff', borderRadius: 20, boxShadow: '0 8px 18px rgba(14,30,60,0.12)', padding: '10px 20px'}}>
          <div style={{width: 54, height: 54, borderRadius: 27, background: colors.green, color: '#fff', fontWeight: 900, fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{n}</div>
          <div style={{flex: 1}}><div style={{fontWeight: 900, fontSize: 30, lineHeight: 1.05}}>{l}</div><div style={{fontWeight: 700, fontSize: 22, color: '#6B7684'}}>{sub}</div></div>
          <F n={icons[0]} size={50} />
        </div>
      ))}
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1610, textAlign: 'center', fontFamily: handFont, fontSize: 50}}>Entreprise utilisatrice <span style={{color: colors.green}}>×</span> entreprise extérieure</div>
    <Header hideAt={999} logo="promo/logo.png" />
    <Footer hideAt={999} />
  </AbsoluteFill>
);
