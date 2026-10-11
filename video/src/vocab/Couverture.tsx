import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Background} from '../components/Background';
import {Footer} from '../components/Footer';
import {Header} from '../components/Header';
import {F} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';
import {ENTRIES} from './Vocab';

/**
 * Couverture de « Les sigles importants à connaître en QHSE » : titre de la thématique et la mosaïque des sigles de la
 * capsule, dans son habillage. Rendue en image fixe (image 90, une fois le bandeau et le pied de page entrés), posée
 * sur les premières images de la vidéo et jointe au MP4 comme vignette.
 */
export const VocabCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Background />
    <div style={{position: 'absolute', left: 60, right: 60, top: 300, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14}}>
      {ENTRIES.map((x, i) => (
        <div key={x.acr} style={{background: x.color, color: '#fff', borderRadius: 16, padding: '10px 18px', fontWeight: 900, fontSize: 46, transform: `rotate(${i % 3 === 0 ? -3 : i % 3 === 1 ? 2 : 0}deg)`, boxShadow: '0 6px 14px rgba(14,30,60,0.2)'}}>{x.acr === '5WHY' ? '5 Why' : x.acr}</div>
      ))}
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 740, textAlign: 'center', fontWeight: 900, lineHeight: 1}}>
      <div style={{fontSize: 130, whiteSpace: 'nowrap'}}>LES SIGLES</div>
      <div style={{fontSize: 100, color: colors.green, marginTop: 6}}>IMPORTANTS</div>
      <div style={{fontFamily: handFont, fontWeight: 400, fontSize: 82, marginTop: 24}}>à connaître en <span style={{color: colors.green}}>QHSE</span></div>
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 1220, display: 'flex', justifyContent: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 18, background: colors.navy, color: '#fff', borderRadius: 26, padding: '16px 32px', fontWeight: 900, fontSize: 50, transform: 'rotate(-3deg)'}}>
        <F n="livres" size={84} /> {ENTRIES.length} SIGLES
      </div>
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1440, textAlign: 'center', fontWeight: 900, fontSize: 40, letterSpacing: 3, color: '#6B7684'}}>LEXIQUE DES SIGLES QHSE</div>
    <Header hideAt={999} logo="promo/logo.png" />
    <Footer hideAt={999} />
  </AbsoluteFill>
);
