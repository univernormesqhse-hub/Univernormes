import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Background} from '../components/Background';
import {Footer} from '../components/Footer';
import {Header} from '../components/Header';
import {F} from '../iso/ui';
import {colors, sansFont} from '../theme';
import {ENTRIES} from './Dico';

/**
 * Couverture du « Dictionnaire de la prévention » : titre de la thématique et les 10 sigles de la capsule avec leur
 * développement, dans son habillage. Rendue en image fixe (image 90, une fois le bandeau et le pied de page entrés),
 * posée sur les premières images de la vidéo et jointe au MP4 comme vignette.
 */
export const DicoCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Background />
    <div style={{position: 'absolute', left: 50, right: 50, top: 280, textAlign: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24}}>
        <F n="livres" size={150} />
        <div style={{textAlign: 'left', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.98}}>
          <div style={{fontSize: 64, letterSpacing: -1}}>Le dictionnaire</div>
          <div style={{fontSize: 64, letterSpacing: -1}}>de la</div>
          <div style={{fontSize: 92, letterSpacing: -2, color: colors.green}}>prévention</div>
        </div>
      </div>
      <div style={{display: 'inline-block', marginTop: 20, padding: '8px 24px', borderRadius: 40, background: colors.navy, color: '#fff', fontWeight: 900, fontSize: 34, letterSpacing: 2}}>10 SIGLES QHSE</div>
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 720, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
      {ENTRIES.map((e) => (
        <div key={e.acr} style={{background: '#fff', borderRadius: 22, boxShadow: '0 10px 22px rgba(14,30,60,0.14)', borderTop: `10px solid ${e.color}`, padding: '14px 18px', height: 150, boxSizing: 'border-box'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{fontWeight: 900, fontSize: 50, letterSpacing: 2, color: e.color}}>{e.acr}</div>
            <div style={{padding: '3px 12px', borderRadius: 14, background: e.color, color: '#fff', fontWeight: 800, fontSize: 17, textTransform: 'uppercase'}}>{e.cat}</div>
          </div>
          <div style={{fontWeight: 700, fontSize: 22, lineHeight: 1.15, marginTop: 6, color: '#4A5563'}}>{e.words.map(([w]) => w).join(' ')}</div>
        </div>
      ))}
    </div>
    <Header hideAt={999} logo="promo/logo.png" />
    <Footer hideAt={999} />
  </AbsoluteFill>
);
