import React from 'react';
import {AbsoluteFill, staticFile} from 'remotion';
import {RED} from '../charte/ui';
import {Background} from '../components/Background';
import {Footer} from '../components/Footer';
import {Header} from '../components/Header';
import {F} from '../iso/ui';
import {BLUE} from '../pieges/ui';
import {colors, sansFont} from '../theme';

/**
 * Couverture de « Identification et évaluation des risques » : titre de la thématique et les deux cartes du résumé de
 * la capsule, dans son habillage. Rendue en image fixe (image 90, une fois le bandeau et le pied de page entrés),
 * posée sur les premières images de la vidéo et jointe au MP4 comme vignette.
 */
const ORANGE = '#EE7D1A';
const COLS: [string, string, string, string, string][] = [
  ['IDENTIFIER', 'loupe', 'ident/lampe.jpg', 'Trouver les dangers et les risques', BLUE],
  ['ÉVALUER', 'balance', 'ident/tablette.jpg', 'Déterminer leurs niveaux et hiérarchiser', ORANGE],
];

export const IdentCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Background />
    <div style={{position: 'absolute', left: 50, right: 50, top: 280, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: colors.green, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>ANALYSE DES RISQUES</div>
      <div style={{fontWeight: 900, fontSize: 104, textTransform: 'uppercase', marginTop: 22, lineHeight: 1, letterSpacing: -3, color: BLUE}}>Identification</div>
      <div style={{fontWeight: 900, fontSize: 60, textTransform: 'uppercase', lineHeight: 1.1}}>et</div>
      <div style={{fontWeight: 900, fontSize: 104, textTransform: 'uppercase', lineHeight: 1, letterSpacing: -3, color: ORANGE}}>évaluation</div>
      <div style={{fontWeight: 900, fontSize: 60, textTransform: 'uppercase', lineHeight: 1.1, marginTop: 6}}>des risques</div>
    </div>
    {COLS.map(([l, ic, img, txt, c], k) => (
      <div key={l} style={{position: 'absolute', left: 60 + k * 500, top: 820, width: 460, borderRadius: 34, overflow: 'hidden', background: '#fff', boxShadow: '0 16px 32px rgba(14,30,60,0.18)', border: `6px solid ${c}`}}>
        <div style={{background: c, color: '#fff', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, fontWeight: 900, fontSize: 40}}><F n={ic} size={56} />{l}</div>
        <div style={{height: 380, backgroundImage: `url(${staticFile(img)})`, backgroundSize: 'cover', backgroundPosition: '50% 40%'}} />
        <div style={{padding: '20px 22px 24px', fontWeight: 800, fontSize: 34, lineHeight: 1.15, height: 165, boxSizing: 'border-box'}}>{txt}</div>
      </div>
    ))}
    <div style={{position: 'absolute', left: 520, top: 1030, width: 40, height: 0}}>
      <div style={{position: 'absolute', left: -26, top: -46, width: 92, height: 92, borderRadius: 46, background: RED, color: '#fff', fontWeight: 900, fontSize: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.2)'}}>≠</div>
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1530, textAlign: 'center', fontWeight: 900, fontSize: 60, textTransform: 'uppercase'}}>Quelle est la <span style={{color: RED}}>différence</span> ?</div>
    <Header hideAt={999} logo="promo/logo.png" />
    <Footer hideAt={999} />
  </AbsoluteFill>
);
