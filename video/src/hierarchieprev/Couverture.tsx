import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Backdrop, shadow} from '../identui/IdentUi';
import {colors, handFont, sansFont} from '../theme';

/**
 * Couverture de « Les 9 principes généraux de prévention » : titre de la thématique et les neuf principes de la
 * capsule avec leurs pastilles colorées. Rendue en image fixe, posée sur les premières images de la vidéo et jointe
 * au MP4 comme vignette.
 */
const ECO = '#2E9B3E';
const TITLES = ['Éviter les risques', 'Évaluer les risques inévitables', 'Combattre les risques à la source', "Adapter le travail à l'homme", "Tenir compte de l'évolution technique", 'Remplacer le dangereux', 'Planifier la prévention', 'Protection collective d’abord', 'Donner les bonnes instructions'];
const TONES = [ECO, '#2F6FB5', '#D9443A', '#E8892B', '#6B4FA0', '#C6A400', '#1F8A70', colors.navy, '#D45D8C'];

export const HierarchiePrevCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Backdrop />
    <div style={{position: 'absolute', left: 50, right: 50, top: 240, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: ECO, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>SANTÉ-SÉCURITÉ AU TRAVAIL</div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginTop: 24}}>
        <span style={{fontWeight: 900, fontSize: 230, lineHeight: 0.9, color: ECO}}>9</span>
        <div style={{textAlign: 'left', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.98}}>
          <div style={{fontSize: 84, letterSpacing: -2}}>principes</div>
          <div style={{fontSize: 84, letterSpacing: -2}}>généraux</div>
        </div>
      </div>
      <div style={{fontWeight: 900, fontSize: 84, textTransform: 'uppercase', letterSpacing: -2, marginTop: 4}}>de <span style={{color: ECO}}>prévention</span></div>
    </div>
    <div style={{position: 'absolute', left: 90, right: 90, top: 700, display: 'flex', flexDirection: 'column', gap: 12}}>
      {TITLES.map((l, i) => (
        <div key={l} style={{display: 'flex', alignItems: 'center', gap: 22, background: '#fff', borderRadius: 22, boxShadow: shadow, padding: '12px 22px 12px 12px'}}>
          <div style={{width: 72, height: 72, borderRadius: 16, background: TONES[i], color: '#fff', fontWeight: 900, fontSize: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{i + 1}</div>
          <div style={{fontWeight: 800, fontSize: 34, textTransform: 'uppercase', letterSpacing: -0.5}}>{l}</div>
        </div>
      ))}
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1745, textAlign: 'center', fontFamily: handFont, fontSize: 52, opacity: 0.85}}>Découvrons-les ensemble</div>
  </AbsoluteFill>
);
