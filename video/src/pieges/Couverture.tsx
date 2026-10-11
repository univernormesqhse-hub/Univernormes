import React from 'react';
import {AbsoluteFill} from 'remotion';
import {RED} from '../charte/ui';
import {Background} from '../components/Background';
import {Footer} from '../components/Footer';
import {Header} from '../components/Header';
import {F} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';
import {CHAPTERS} from './Pieges';
import {BLUE, GOLD} from './ui';

/**
 * Couverture de la partie 2/2 de « Les pièges de l'ISO 9001:2026 » (version partagée en deux) : titre de la thématique
 * et les chapitres couverts par cette partie (la seconde moitié commence au milieu du chapitre 2), dans l'habillage de
 * la capsule. Rendue en image fixe (image 90, une fois le bandeau et le pied de page entrés), posée sur les premières
 * images de la vidéo et jointe au MP4 comme vignette.
 */
export const PiegesPartie2Couverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Background />
    <div style={{position: 'absolute', left: 50, right: 50, top: 270, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: BLUE, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>MANAGEMENT DE LA QUALITÉ</div>
      <div style={{fontWeight: 900, fontSize: 84, textTransform: 'uppercase', lineHeight: 1, marginTop: 22}}>Les <span style={{color: RED}}>pièges</span> de</div>
      <div style={{fontWeight: 900, fontSize: 116, lineHeight: 1, marginTop: 12, letterSpacing: -3, whiteSpace: 'nowrap'}}>ISO 9001<span style={{color: GOLD}}>:2026</span></div>
      <div style={{display: 'inline-block', marginTop: 20, padding: '6px 22px', border: `5px solid ${RED}`, borderRadius: 14, color: RED, fontWeight: 900, fontSize: 42, transform: 'rotate(-4deg)', background: '#fff'}}>PARTIE 2 / 2</div>
    </div>
    <div style={{position: 'absolute', left: 90, right: 90, top: 820, display: 'flex', flexDirection: 'column', gap: 14}}>
      {CHAPTERS.slice(1).map(([, , n, l, sub, icons], k) => (
        <div key={n} style={{display: 'flex', alignItems: 'center', gap: 18, background: '#fff', borderRadius: 22, boxShadow: '0 8px 18px rgba(14,30,60,0.12)', padding: '12px 22px'}}>
          <div style={{width: 60, height: 60, borderRadius: 30, background: colors.navy, color: '#fff', fontWeight: 900, fontSize: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{n}</div>
          <div style={{flex: 1}}><div style={{fontWeight: 900, fontSize: 34, lineHeight: 1.05}}>{l}{k === 0 ? <span style={{fontWeight: 700, fontSize: 24, color: '#6B7684'}}> (suite)</span> : null}</div><div style={{fontWeight: 700, fontSize: 24, color: '#6B7684'}}>{sub}</div></div>
          <F n={icons[0]} size={58} />
        </div>
      ))}
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1430, textAlign: 'center', fontFamily: handFont, fontSize: 52}}>+ ce qu'il faut <span style={{color: colors.green}}>retenir</span></div>
    <Header hideAt={999} logo="promo/logo.png" />
    <Footer hideAt={999} />
  </AbsoluteFill>
);
