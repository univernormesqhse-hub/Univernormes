import React from 'react';
import {AbsoluteFill} from 'remotion';
import {RED} from '../charte/ui';
import {Background} from '../components/Background';
import {Footer} from '../components/Footer';
import {Header} from '../components/Header';
import {F} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';
import {FIVE_M} from './Scenes2';
import {Fishbone, M_COLORS, TEAL} from './ui';

/**
 * Couverture de « Le diagramme d'Ishikawa » : titre de la thématique, le détective de l'ouverture et l'arête de
 * poisson des 5M de la capsule, dans son habillage. Rendue en image fixe (image 90 : bandeau, pied de page et arête
 * entièrement tracés), posée sur les premières images de la vidéo et jointe au MP4 comme vignette.
 */
export const IshikawaCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Background />
    <div style={{position: 'absolute', left: 50, right: 50, top: 270, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: TEAL, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>ANALYSE DES CAUSES</div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, marginTop: 20}}>
        <F n="detective" size={170} />
        <div style={{textAlign: 'left', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.98}}>
          <div style={{fontSize: 74, letterSpacing: -1}}>Le diagramme</div>
          <div style={{fontSize: 100, letterSpacing: -2, color: TEAL}}>d'Ishikawa</div>
        </div>
      </div>
      <div style={{fontWeight: 900, fontSize: 44, textTransform: 'uppercase', marginTop: 18}}>Symptôme <span style={{color: RED}}>≠</span> <span style={{color: TEAL}}>cause racine</span></div>
    </div>
    <Fishbone at={0} headAt={0.2} head="PROBLÈME" y={1110} branches={FIVE_M.map((m, i) => ({label: m.name, icon: m.icon, color: M_COLORS[i], at: 0.3 + i * 0.1}))} />
    <div style={{position: 'absolute', left: 50, right: 50, top: 1560, textAlign: 'center', fontFamily: handFont, fontSize: 54}}>L'enquête des <span style={{color: TEAL}}>5M</span> : trouver la cause racine</div>
    <Header hideAt={999} logo="promo/logo.png" />
    <Footer hideAt={999} />
  </AbsoluteFill>
);
