import React from 'react';
import {AbsoluteFill, staticFile} from 'remotion';
import {Background} from '../components/Background';
import {Footer} from '../components/Footer';
import {Header} from '../components/Header';
import {RED} from '../charte/ui';
import {colors, handFont, sansFont} from '../theme';

/**
 * Couverture de « ISO 9001 version 2026 » : titre de la thématique, la photo de l'ouverture (porte de l'usine) avec le
 * passage 2015 → 2026, et les 4 évolutions de la capsule, dans son habillage. Rendue en image fixe (image 90, une fois
 * le bandeau et le pied de page entrés), posée sur les premières images de la vidéo et jointe au MP4 comme vignette.
 */
const EVOS = ['Culture qualité', 'Risques & opportunités', 'Clarification', 'Transition sereine'];

export const Iso2026Couverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Background />
    <div style={{position: 'absolute', left: 50, right: 50, top: 270, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: colors.navy, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>MANAGEMENT DE LA QUALITÉ</div>
      <div style={{fontWeight: 900, fontSize: 96, lineHeight: 1, marginTop: 20, letterSpacing: -2}}>ISO 9001</div>
      <div style={{fontWeight: 900, fontSize: 64, textTransform: 'uppercase', lineHeight: 1.1}}>version <span style={{color: colors.green, fontSize: 110}}>2026</span></div>
    </div>
    <div style={{position: 'absolute', left: 70, top: 630, width: 940, height: 560, borderRadius: 30, overflow: 'hidden', border: '10px solid #fff', boxShadow: '0 20px 40px rgba(14,30,60,0.25)', backgroundImage: `url(${staticFile('iso26/usine-porte.jpg')})`, backgroundSize: 'cover', backgroundPosition: '50% 55%'}}>
      <div style={{position: 'absolute', right: 24, top: 24, display: 'flex', alignItems: 'center', gap: 14}}>
        <div style={{padding: '8px 18px', borderRadius: 14, background: 'rgba(255,255,255,0.85)', color: '#6B7684', fontWeight: 900, fontSize: 40}}>2015</div>
        <div style={{color: '#fff', fontWeight: 900, fontSize: 44}}>→</div>
        <div style={{padding: '8px 18px', borderRadius: 14, background: colors.navy, color: '#fff', fontWeight: 900, fontSize: 48, border: `4px solid ${colors.green}`}}>2026</div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: '60px 26px 20px', background: 'linear-gradient(180deg, rgba(14,30,60,0), rgba(14,30,60,0.85))', color: '#fff', fontWeight: 900, fontSize: 40}}>Plus de dix ans d'attente</div>
    </div>
    <div style={{position: 'absolute', left: 70, right: 70, top: 1250, textAlign: 'center', fontWeight: 900, fontSize: 46, textTransform: 'uppercase'}}><span style={{color: colors.green}}>4</span> évolutions majeures</div>
    <div style={{position: 'absolute', left: 70, right: 70, top: 1330, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14}}>
      {EVOS.map((l, i) => (
        <div key={l} style={{display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 20, boxShadow: '0 8px 18px rgba(14,30,60,0.12)', padding: '14px 18px'}}>
          <div style={{width: 52, height: 52, borderRadius: 14, background: colors.navy, color: '#fff', fontWeight: 900, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{String(i + 1).padStart(2, '0')}</div>
          <div style={{fontWeight: 900, fontSize: 28, lineHeight: 1.05}}>{l}</div>
        </div>
      ))}
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1580, textAlign: 'center', fontFamily: handFont, fontSize: 52}}>Pas une <span style={{color: RED}}>révolution</span>, une évolution <span style={{color: colors.green}}>stratégique</span></div>
    <Header hideAt={999} logo="promo/logo.png" />
    <Footer hideAt={999} />
  </AbsoluteFill>
);
