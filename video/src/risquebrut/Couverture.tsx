import React from 'react';
import {AbsoluteFill, staticFile} from 'remotion';
import {RED} from '../charte/ui';
import {Background} from '../components/Background';
import {Footer} from '../components/Footer';
import {Header} from '../components/Header';
import {F} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';

/**
 * Couverture de « Risque brut ou risque réel ? » : titre de la thématique et les deux illustrations de l'ouverture de la
 * capsule (sans protection / avec harnais), dans son habillage. Rendue en image fixe (image 90, une fois le bandeau et
 * le pied de page entrés), posée sur les premières images de la vidéo et jointe au MP4 comme vignette.
 */
const GREEN = colors.green;
const SHOTS: [string, string, string, string, string, number][] = [
  ['risquebrut/technicien-sans-protection.jpg', 'Risque brut', 'avant prévention', 'danger', RED, -1.5],
  ['risquebrut/technicien-harnais.jpg', 'Risque réel', 'ce qui reste après prévention', 'bouclier', GREEN, 1.5],
];

export const RisqueBrutCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Background />
    <div style={{position: 'absolute', left: 50, right: 50, top: 270, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: colors.navy, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>ÉVALUATION DES RISQUES</div>
      <div style={{fontWeight: 900, fontSize: 100, textTransform: 'uppercase', lineHeight: 1, marginTop: 20}}>Risque <span style={{color: RED}}>brut</span></div>
      <div style={{fontWeight: 900, fontSize: 56, textTransform: 'uppercase', lineHeight: 1.1}}>ou</div>
      <div style={{fontWeight: 900, fontSize: 100, textTransform: 'uppercase', lineHeight: 1}}>risque <span style={{color: GREEN}}>réel</span> ?</div>
    </div>
    {SHOTS.map(([src, l, sub, ic, c, rot], k) => (
      <div key={l} style={{position: 'absolute', left: 70, top: 720 + k * 440, width: 940, height: 400, borderRadius: 30, overflow: 'hidden', border: '10px solid #fff', boxShadow: '0 20px 40px rgba(14,30,60,0.22)', transform: `rotate(${rot}deg)`, backgroundImage: `url(${staticFile(src)})`, backgroundSize: 'cover', backgroundPosition: k ? '50% 30%' : '50% 50%'}}>
        <div style={{position: 'absolute', left: 20, bottom: 20, display: 'flex', alignItems: 'center', gap: 12, background: '#fff', borderRadius: 18, padding: '10px 18px', borderLeft: `10px solid ${c}`, boxShadow: '0 6px 14px rgba(0,0,0,0.18)'}}>
          <F n={ic} size={52} />
          <div><div style={{fontWeight: 900, fontSize: 34, color: c, textTransform: 'uppercase', lineHeight: 1}}>{l}</div><div style={{fontWeight: 700, fontSize: 22, color: '#4A5563'}}>{sub}</div></div>
        </div>
      </div>
    ))}
    <div style={{position: 'absolute', left: 50, right: 50, top: 1610, textAlign: 'center', fontFamily: handFont, fontSize: 56}}>Quelle <span style={{color: RED}}>différence</span> ?</div>
    <Header hideAt={999} logo="promo/logo.png" />
    <Footer hideAt={999} />
  </AbsoluteFill>
);
