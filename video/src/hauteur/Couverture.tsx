import React from 'react';
import {AbsoluteFill, staticFile} from 'remotion';
import {Background} from '../components/Background';
import {Footer} from '../components/Footer';
import {Header} from '../components/Header';
import {F} from '../iso/ui';
import {colors, sansFont} from '../theme';
import {CHAPTERS} from './Hauteur';

/**
 * Couverture de « Le travail en hauteur » : titre de la thématique, la photo d'échafaudage de l'ouverture et les
 * 5 chapitres de la capsule, dans son habillage. Rendue en image fixe (image 90, une fois le bandeau et le pied de page
 * entrés), posée sur les premières images de la vidéo et jointe au MP4 comme vignette.
 */
const ORANGE = '#EE7D1A';

export const HauteurCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Background />
    <div style={{position: 'absolute', left: 50, right: 50, top: 270, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: colors.navy, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>SANTÉ-SÉCURITÉ AU TRAVAIL</div>
      <div style={{fontWeight: 900, fontSize: 80, textTransform: 'uppercase', lineHeight: 1, marginTop: 20}}>Le travail en</div>
      <div style={{fontWeight: 900, fontSize: 150, textTransform: 'uppercase', lineHeight: 1, letterSpacing: -3, color: ORANGE}}>hauteur</div>
    </div>
    <div style={{position: 'absolute', left: 70, top: 640, width: 940, height: 470, borderRadius: 30, overflow: 'hidden', border: '10px solid #fff', boxShadow: '0 20px 40px rgba(14,30,60,0.22)', backgroundImage: `url(${staticFile('tirant/echafaudage.jpg')})`, backgroundSize: 'cover', backgroundPosition: '50% 40%'}}>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: '60px 26px 20px', background: 'linear-gradient(180deg, rgba(14,30,60,0), rgba(14,30,60,0.8))', color: '#fff', fontWeight: 900, fontSize: 40}}>Un risque sournois et dangereux</div>
    </div>
    <div style={{position: 'absolute', left: 90, right: 90, top: 1160, display: 'flex', flexDirection: 'column', gap: 12}}>
      {CHAPTERS.map(([, , n, l, sub, icons]) => (
        <div key={n} style={{display: 'flex', alignItems: 'center', gap: 18, background: '#fff', borderRadius: 20, boxShadow: '0 8px 18px rgba(14,30,60,0.12)', padding: '10px 20px'}}>
          <div style={{width: 54, height: 54, borderRadius: 27, background: ORANGE, color: '#fff', fontWeight: 900, fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{n}</div>
          <div style={{flex: 1}}><div style={{fontWeight: 900, fontSize: 30, lineHeight: 1.05}}>{l}</div><div style={{fontWeight: 700, fontSize: 22, color: '#6B7684'}}>{sub}</div></div>
          <F n={icons[0]} size={50} />
        </div>
      ))}
    </div>
    <Header hideAt={999} logo="promo/logo.png" />
    <Footer hideAt={999} />
  </AbsoluteFill>
);
