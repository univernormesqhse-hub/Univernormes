import React from 'react';
import {AbsoluteFill, staticFile} from 'remotion';
import {Background} from '../components/Background';
import {Footer} from '../components/Footer';
import {Header} from '../components/Header';
import {F} from '../iso/ui';
import {BLUE, GOLD} from '../pieges/ui';
import {colors, handFont, sansFont} from '../theme';

/**
 * Couverture de « DUERP ou plan de prévention ? » : titre de la thématique et les deux colonnes de la règle d'or,
 * dans l'habillage de la capsule (fond, bandeau, pied de page). Rendue en image fixe, posée sur les premières images
 * de la vidéo et jointe au MP4 comme vignette (image 90, une fois le bandeau et le pied de page entrés).
 */
const ORANGE = '#EE7D1A';
const COLS: [string, string, string, string, string][] = [
  ['DUERP', 'duerppdp/document-unique.jpg', 'Protège tes propres salariés', 'salarie', BLUE],
  ['Plan de prévention', 'duerppdp/plan-prevention.jpg', "Sécurise l'intervention des prestataires", 'intervenant', ORANGE],
];

export const DuerpPdpCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Background />
    <div style={{position: 'absolute', left: 50, right: 50, top: 290, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: colors.green, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>SANTÉ-SÉCURITÉ AU TRAVAIL</div>
      <div style={{fontWeight: 900, fontSize: 150, lineHeight: 1, marginTop: 24, letterSpacing: -3, color: BLUE}}>DUERP</div>
      <div style={{fontWeight: 900, fontSize: 64, textTransform: 'uppercase', lineHeight: 1.1}}>ou plan de</div>
      <div style={{fontWeight: 900, fontSize: 120, textTransform: 'uppercase', lineHeight: 1, letterSpacing: -3, color: colors.green}}>prévention ?</div>
    </div>
    {COLS.map(([l, img, txt, ic, c], k) => (
      <div key={l} style={{position: 'absolute', left: 60 + k * 500, top: 870, width: 460, borderRadius: 34, overflow: 'hidden', background: '#fff', boxShadow: '0 16px 32px rgba(14,30,60,0.18)', border: `6px solid ${c}`}}>
        <div style={{background: c, color: '#fff', padding: '14px 20px', fontWeight: 900, fontSize: l.length > 10 ? 34 : 44, textAlign: 'center'}}>{l}</div>
        <div style={{height: 280, backgroundImage: `url(${staticFile(img)})`, backgroundSize: 'cover', backgroundPosition: '50% 50%'}} />
        <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '20px 20px 24px', height: 150, boxSizing: 'border-box'}}>
          <F n={ic} size={90} />
          <div style={{fontWeight: 800, fontSize: 30, lineHeight: 1.15}}>{txt}</div>
        </div>
      </div>
    ))}
    <div style={{position: 'absolute', left: 50, right: 50, top: 1440, textAlign: 'center', fontFamily: handFont, fontSize: 56}}>Beaucoup les <span style={{color: '#D9443A'}}>confondent</span> encore…</div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1540, textAlign: 'center', fontWeight: 900, fontSize: 46, textTransform: 'uppercase', color: GOLD}}>La règle d'or</div>
    <Header hideAt={999} logo="promo/logo.png" />
    <Footer hideAt={999} />
  </AbsoluteFill>
);
