import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {Background} from '../components/Background';
import {Footer} from '../components/Footer';
import {Header} from '../components/Header';
import {F} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';

const CAT = [colors.green, '#E67E22', '#D9443A'];
const ICONS = ['casque', 'gants', 'lunettes', 'chaussure', 'gilet', 'epi-ble'];

/**
 * Couverture de « Comment comprendre les catégories d'EPI » au format des fiches : titre de la thématique, mosaïque
 * d'EPI, les trois niveaux et le visuel IA du technicien en tenue de catégorie 3, dans l'habillage de la marque.
 * Affichée sur les premières images de la vidéo et jointe au MP4 comme vignette.
 */
export const CategoriesEpiCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Background />
    <div style={{position: 'absolute', left: 60, right: 60, top: 300, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14}}>
      {ICONS.map((ic, i) => (
        <div key={ic} style={{background: '#fff', borderRadius: 22, width: 136, height: 112, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: `6px solid ${CAT[i % 3]}`, boxShadow: '0 8px 18px rgba(14,30,60,0.16)', transform: `rotate(${i % 3 === 0 ? -3 : i % 3 === 1 ? 2 : 0}deg)`}}><F n={ic} size={80} /></div>
      ))}
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 500, textAlign: 'center', fontWeight: 900, lineHeight: 1}}>
      <div style={{fontSize: 74, whiteSpace: 'nowrap'}}>COMPRENDRE LES</div>
      <div style={{fontSize: 118, whiteSpace: 'nowrap', marginTop: 8}}>CATÉGORIES</div>
      <div style={{fontSize: 140, color: colors.green, marginTop: 4}}>D’EPI</div>
      <div style={{fontFamily: handFont, fontWeight: 400, fontSize: 60, marginTop: 18}}>Équipements de <span style={{color: colors.green}}>protection individuelle</span></div>
    </div>
    {/* visuel IA dans une carte photo inclinée */}
    <div style={{position: 'absolute', left: 80, top: 1060, width: 420, height: 560, borderRadius: 34, overflow: 'hidden', border: '10px solid #fff', boxShadow: '0 24px 50px rgba(14,30,60,0.32)', transform: 'rotate(-4deg)'}}>
      <Img src={staticFile('categoriesepi/technicien-cat3.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 32%'}} />
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 10, background: `linear-gradient(90deg, ${colors.green}, ${colors.navy})`}} />
    </div>
    <div style={{position: 'absolute', left: 560, top: 1080, display: 'flex', flexDirection: 'column', gap: 18}}>
      {['Risques minimaux', 'Risques sérieux', 'Mort / irréversible'].map((l, k) => (
        <div key={l} style={{display: 'flex', alignItems: 'center', gap: 16}}>
          <div style={{width: 120, height: 134, borderRadius: 22, background: CAT[k], color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 90, boxShadow: '0 10px 22px rgba(14,30,60,0.28)', borderBottom: '8px solid rgba(0,0,0,0.22)'}}>{k + 1}</div>
          <div style={{fontFamily: handFont, fontSize: 40, color: colors.navy, width: 300, lineHeight: 1.05}}>{l}</div>
        </div>
      ))}
    </div>
    <Header hideAt={999} logo="promo/logo.png" />
    <Footer hideAt={999} />
  </AbsoluteFill>
);
