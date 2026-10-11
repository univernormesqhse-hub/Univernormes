import React from 'react';
import {AbsoluteFill, staticFile} from 'remotion';
import {RED} from '../charte/ui';
import {Background} from '../components/Background';
import {Footer} from '../components/Footer';
import {Header} from '../components/Header';
import {F} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';
import {RULES} from './Confines';

/**
 * Couverture de « Les espaces confinés » : titre de la thématique, la photo du regard de l'ouverture et les 3 règles
 * strictes de la capsule, dans son habillage. Rendue en image fixe (image 90, une fois le bandeau et le pied de page
 * entrés), posée sur les premières images de la vidéo et jointe au MP4 comme vignette.
 */
export const ConfinesCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Background />
    <div style={{position: 'absolute', left: 50, right: 50, top: 270, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: RED, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>RISQUE MORTEL</div>
      <div style={{fontWeight: 900, fontSize: 84, textTransform: 'uppercase', lineHeight: 1, marginTop: 20}}>Les espaces</div>
      <div style={{fontWeight: 900, fontSize: 136, textTransform: 'uppercase', lineHeight: 1, letterSpacing: -3, color: colors.green}}>confinés</div>
    </div>
    <div style={{position: 'absolute', left: 70, top: 630, width: 940, height: 520, borderRadius: 30, overflow: 'hidden', border: '10px solid #fff', boxShadow: '0 20px 40px rgba(14,30,60,0.22)', backgroundImage: `url(${staticFile('confines/regard.jpg')})`, backgroundSize: 'cover', backgroundPosition: '45% 40%'}}>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: '60px 26px 20px', background: 'linear-gradient(180deg, rgba(14,30,60,0), rgba(14,30,60,0.85))', color: '#fff', fontWeight: 900, fontSize: 40}}>Regard, cuve, égout…</div>
    </div>
    <div style={{position: 'absolute', left: 70, right: 70, top: 1200, textAlign: 'center', fontWeight: 900, fontSize: 46, textTransform: 'uppercase'}}><span style={{color: colors.green}}>3</span> règles strictes</div>
    <div style={{position: 'absolute', left: 70, right: 70, top: 1280, display: 'flex', gap: 16}}>
      {RULES.map((r) => (
        <div key={r.l} style={{flex: 1, background: '#fff', borderRadius: 22, boxShadow: '0 8px 18px rgba(14,30,60,0.12)', borderTop: `10px solid ${colors.green}`, padding: '18px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center'}}>
          <F n={r.n} size={74} />
          <div style={{fontWeight: 900, fontSize: 27, lineHeight: 1.1}}>{r.l}</div>
        </div>
      ))}
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1580, textAlign: 'center', fontFamily: handFont, fontSize: 46}}>Son plus grand piège ? Pas les murs… mais <span style={{color: RED}}>l'air</span></div>
    <Header hideAt={999} logo="promo/logo.png" />
    <Footer hideAt={999} />
  </AbsoluteFill>
);
