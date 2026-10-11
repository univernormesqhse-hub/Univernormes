import React from 'react';
import {AbsoluteFill} from 'remotion';
import {RED} from '../charte/ui';
import {Background} from '../components/Background';
import {Footer} from '../components/Footer';
import {Header} from '../components/Header';
import {F} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';
import {card, TOOLS} from './Arsenal';

/**
 * Couverture de « L'arsenal du responsable QHSE » : titre de la thématique et la boîte à outils des 10 outils de la
 * capsule, dans son habillage. Rendue en image fixe (image 90, une fois le bandeau et le pied de page entrés), posée
 * sur les premières images de la vidéo et jointe au MP4 comme vignette.
 */
export const ArsenalCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Background />
    <div style={{position: 'absolute', left: 50, right: 50, top: 280, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: colors.green, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 2}}>TU ES RESPONSABLE QHSE ?</div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginTop: 20}}>
        <F n="boite-outils" size={170} />
        <div style={{textAlign: 'left', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.98}}>
          <div style={{fontSize: 70, letterSpacing: -1}}>L'arsenal du</div>
          <div style={{fontSize: 70, letterSpacing: -1}}>responsable</div>
          <div style={{fontSize: 96, letterSpacing: -2, color: colors.green}}>QHSE</div>
        </div>
      </div>
      <div style={{display: 'inline-block', marginTop: 18, padding: '8px 24px', borderRadius: 16, background: RED, color: '#fff', fontWeight: 900, fontSize: 40, transform: 'rotate(-3deg)'}}>10 OUTILS À MAÎTRISER</div>
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 760, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16}}>
      {TOOLS.map((tool) => (
        <div key={tool.n} style={{...card(tool.color), height: 104, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px'}}>
          <div style={{fontWeight: 900, fontSize: 30, color: tool.color, width: 44}}>{String(tool.n).padStart(2, '0')}</div>
          <F n={tool.icon} size={58} />
          <div style={{fontWeight: 800, fontSize: tool.short.length > 18 ? 25 : 29, lineHeight: 1.05}}>{tool.short}</div>
        </div>
      ))}
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1440, textAlign: 'center', fontFamily: handFont, fontSize: 52}}>Lequel maîtrises-tu le <span style={{color: RED}}>moins</span> ?</div>
    <Header hideAt={999} logo="promo/logo.png" />
    <Footer hideAt={999} />
  </AbsoluteFill>
);
