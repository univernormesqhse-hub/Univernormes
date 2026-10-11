import React from 'react';
import {AbsoluteFill} from 'remotion';
import {RED} from '../charte/ui';
import {Background} from '../components/Background';
import {Footer} from '../components/Footer';
import {Header} from '../components/Header';
import {F} from '../iso/ui';
import {BLUE, GOLD, PURPLE} from '../pieges/ui';
import {colors, handFont, sansFont} from '../theme';

/**
 * Couverture de « 10 documents QHSE à savoir rédiger — partie 1/2 » : titre de la thématique et les 5 documents de la
 * capsule, dans son habillage (fond, bandeau, pied de page). Rendue en image fixe (image 90, une fois le bandeau et le
 * pied de page entrés), posée sur les premières images de la vidéo et jointe au MP4 comme vignette.
 */
const DOCS: [string, string, string][] = [
  ['La politique QSE', 'boussole', BLUE],
  ['Le DUERP', 'loupe', RED],
  ['Le programme annuel de prévention', 'calendrier', colors.green],
  ['Les procédures QHSE', 'engrenage', PURPLE],
  ['Les instructions de travail', 'clipboard', GOLD],
];

export const Docs5Couverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Background />
    <div style={{position: 'absolute', left: 50, right: 50, top: 290, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: colors.green, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 2}}>T'ES RESPONSABLE QHSE ?</div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, marginTop: 24}}>
        <span style={{fontWeight: 900, fontSize: 210, lineHeight: 0.9, color: RED}}>10</span>
        <div style={{textAlign: 'left', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.98}}>
          <div style={{fontSize: 84, letterSpacing: -2}}>documents</div>
          <div style={{fontSize: 84, letterSpacing: -2, color: colors.green}}>QHSE</div>
        </div>
      </div>
      <div style={{fontWeight: 900, fontSize: 64, textTransform: 'uppercase', marginTop: 10}}>à savoir <span style={{color: colors.green}}>rédiger</span></div>
      <div style={{display: 'inline-block', marginTop: 20, padding: '6px 22px', border: `5px solid ${RED}`, borderRadius: 14, color: RED, fontWeight: 900, fontSize: 40, transform: 'rotate(-4deg)', background: '#fff'}}>PARTIE 1 / 2</div>
    </div>
    <div style={{position: 'absolute', left: 90, right: 90, top: 830, display: 'flex', flexDirection: 'column', gap: 16}}>
      {DOCS.map(([l, ic, c], i) => (
        <div key={l} style={{display: 'flex', alignItems: 'center', gap: 20, background: '#fff', borderRadius: 24, boxShadow: '0 16px 32px rgba(14,30,60,0.14)', borderLeft: `14px solid ${c}`, padding: '14px 22px'}}>
          <div style={{width: 66, height: 66, borderRadius: 33, background: c, color: '#fff', fontWeight: 900, fontSize: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{i + 1}</div>
          <div style={{flex: 1, fontWeight: 900, fontSize: 34, lineHeight: 1.1}}>{l}</div>
          <F n={ic} size={72} />
        </div>
      ))}
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1500, textAlign: 'center', fontFamily: handFont, fontSize: 52}}>Les 5 premiers documents</div>
    <Header hideAt={999} logo="promo/logo.png" />
    <Footer hideAt={999} />
  </AbsoluteFill>
);
