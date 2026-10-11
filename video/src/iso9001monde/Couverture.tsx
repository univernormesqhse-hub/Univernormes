import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Backdrop, shadow} from '../identui/IdentUi';
import {F} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';

/**
 * Couverture de « Pourquoi la norme ISO 9001 domine le monde de l'entreprise » : titre de la thématique, plaque dorée
 * ISO 9001 et les 4 piliers de la capsule. Rendue en image fixe, posée sur les premières images de la vidéo et jointe
 * au MP4 comme vignette.
 */
const BLUE = '#3D7DD8';
const PCOL = [BLUE, '#E8892B', '#8E5BD0', colors.green];
const PNAME = ['Résultat, pas méthode', 'Anticipation', 'Vision globale', 'Amélioration continue'];

export const Iso9001MondeCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Backdrop />
    <div style={{position: 'absolute', left: 50, right: 50, top: 250, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: BLUE, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>MANAGEMENT DE LA QUALITÉ</div>
      <div style={{fontWeight: 900, fontSize: 66, textTransform: 'uppercase', marginTop: 26, lineHeight: 1.05}}>Pourquoi la norme</div>
    </div>
    <div style={{position: 'absolute', left: 140, top: 420, width: 800, height: 300, borderRadius: 26, background: 'linear-gradient(135deg, #E9CB72 0%, #C9A13B 45%, #E6C66C 70%, #B48A2C 100%)', boxShadow: '0 30px 70px rgba(120,90,20,0.35)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      {[[24, 24], [24, 752], [252, 24], [252, 752]].map(([y, x], k) => <div key={k} style={{position: 'absolute', top: y, left: x, width: 24, height: 24, borderRadius: 12, background: 'radial-gradient(circle at 35% 35%, #FFF3C8, #8C6A1E)'}} />)}
      <div style={{fontWeight: 900, fontSize: 150, color: '#5A4210', lineHeight: 1, letterSpacing: -2}}>ISO 9001</div>
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 760, textAlign: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}>
        <div style={{fontWeight: 900, fontSize: 66, textTransform: 'uppercase', lineHeight: 1.05}}>domine le <span style={{color: colors.green}}>monde</span></div>
        <F n="globe" size={90} />
      </div>
      <div style={{fontWeight: 900, fontSize: 66, textTransform: 'uppercase', lineHeight: 1.05}}>de l'entreprise</div>
    </div>
    <div style={{position: 'absolute', left: 90, right: 90, top: 1010}}>
      <div style={{textAlign: 'center', fontWeight: 900, fontSize: 46, textTransform: 'uppercase', marginBottom: 24}}>Les <span style={{color: colors.green}}>4 piliers</span> du succès</div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20}}>
        {PNAME.map((l, i) => (
          <div key={l} style={{background: '#fff', borderRadius: 24, boxShadow: shadow, borderTop: `14px solid ${PCOL[i]}`, padding: '22px 20px', display: 'flex', alignItems: 'center', gap: 18, height: 170, boxSizing: 'border-box'}}>
            <div style={{width: 70, height: 70, borderRadius: 18, background: PCOL[i], color: '#fff', fontWeight: 900, fontSize: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{i + 1}</div>
            <div style={{fontWeight: 900, fontSize: 32, textTransform: 'uppercase', lineHeight: 1.1}}>{l}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1520, textAlign: 'center', fontFamily: handFont, fontSize: 54, opacity: 0.85}}>La norme la plus utilisée au monde</div>
  </AbsoluteFill>
);
