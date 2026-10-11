import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {F} from '../iso/ui';
import {handFont, sansFont} from '../theme';

/**
 * Couverture de « 9 normes ISO incontournables » : titre de la thématique et les neuf normes de la capsule.
 * Rendue en image fixe, posée sur les premières images de la vidéo et jointe au MP4 comme vignette.
 */
const BG = '#0B1626';
const INK = '#F3F6FA';
const SKY = '#7FB8FF';
const N: [string, string, string, string][] = [
  ['ISO 9001', 'Qualité', '#3D86E0', 'pouce'],
  ['ISO 14001', 'Environnement', '#2EAE5A', 'feuille'],
  ['ISO 45001', 'Santé-sécurité', '#F0922F', 'casque'],
  ['ISO 22000', 'Aliments', '#D9B21F', 'assiette'],
  ['ISO 26000', 'RSE', '#8C6BD6', 'equipe'],
  ['ISO 50001', 'Énergie', '#22B394', 'eclair'],
  ['ISO 27001', 'Information', '#5B6FE0', 'cadenas'],
  ['ISO 13485', 'Dispositifs médicaux', '#E0669A', 'stethoscope'],
  ['ISO/IEC 17025', 'Laboratoires', '#2FB3CF', 'microscope'],
];

export const RoleNormesCouverture: React.FC = () => (
  <AbsoluteFill style={{background: `radial-gradient(90% 60% at 50% 30%, #18345A 0%, ${BG} 70%)`, fontFamily: sansFont, color: INK}}>
    <div style={{position: 'absolute', left: 0, right: 0, top: 95, display: 'flex', justifyContent: 'center'}}>
      <div style={{background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile('promo/logo.png')} style={{height: 84, display: 'block'}} /></div>
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 300, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: SKY, color: BG, fontWeight: 800, fontSize: 28, letterSpacing: 3}}>QUALITÉ · TRAVAILLEURS · ENVIRONNEMENT</div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginTop: 26}}>
        <span style={{fontWeight: 900, fontSize: 260, lineHeight: 0.9, color: SKY, textShadow: '0 12px 50px rgba(127,184,255,0.4)'}}>9</span>
        <div style={{textAlign: 'left', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.95}}>
          <div style={{fontSize: 110, letterSpacing: -3}}>normes</div>
          <div style={{fontSize: 130, letterSpacing: -3}}>ISO</div>
        </div>
      </div>
      <div style={{fontWeight: 900, fontSize: 84, textTransform: 'uppercase', letterSpacing: -1, color: SKY, marginTop: 6}}>incontournables</div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 50}}>
        {N.map(([n, d, c, i]) => (
          <div key={n} style={{borderRadius: 24, border: `3px solid ${c}`, background: `${c}26`, padding: '20px 8px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
            <div style={{width: 92, height: 92, borderRadius: 46, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={i} size={64} /></div>
            <div style={{fontWeight: 900, fontSize: n.length > 9 ? 30 : 36}}>{n}</div>
            <div style={{fontWeight: 700, fontSize: 24, color: c, textTransform: 'uppercase', letterSpacing: 1}}>{d}</div>
          </div>
        ))}
      </div>
      <div style={{fontFamily: handFont, fontSize: 50, color: INK, opacity: 0.85, marginTop: 34}}>Le rôle de chaque norme</div>
    </div>
  </AbsoluteFill>
);
