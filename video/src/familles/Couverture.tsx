import React from 'react';
import {AbsoluteFill} from 'remotion';
import {RED} from '../charte/ui';
import {Background} from '../components/Background';
import {Footer} from '../components/Footer';
import {Header} from '../components/Header';
import {Stamp} from '../danger2/ui';
import {F} from '../iso/ui';
import {colors, sansFont} from '../theme';
import {FAMS, GROUPS} from './Familles';

/**
 * Couverture de « Les 40 familles de risques SST » : titre de la thématique, la grille des 40 familles et la légende
 * des 8 groupes, dans l'habillage de la capsule. Rendue en image fixe (image 90, une fois le bandeau et le pied de page
 * entrés), posée sur les premières images de la vidéo et jointe au MP4 comme vignette.
 */
export const FamillesCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Background />
    <div style={{position: 'absolute', left: 50, right: 50, top: 280, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: colors.green, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>SANTÉ-SÉCURITÉ AU TRAVAIL</div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, marginTop: 20}}>
        <span style={{fontWeight: 900, fontSize: 200, lineHeight: 0.9, color: RED}}>40</span>
        <div style={{textAlign: 'left', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.98}}>
          <div style={{fontSize: 80, letterSpacing: -2}}>familles</div>
          <div style={{fontSize: 80, letterSpacing: -2}}>de <span style={{color: RED}}>risques</span></div>
        </div>
      </div>
      <div style={{fontWeight: 900, fontSize: 96, letterSpacing: -2, color: colors.green, lineHeight: 1}}>SST</div>
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 700, display: 'grid', gridTemplateColumns: 'repeat(8, 104px)', gap: 12, justifyContent: 'center'}}>
      {FAMS.map((f) => (
        <div key={f.n} style={{width: 104, height: 104, borderRadius: 22, background: GROUPS[f.g][1], display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 12px rgba(14,30,60,0.2)'}}><F n={f.icons[0]} size={70} /></div>
      ))}
    </div>
    <div style={{position: 'absolute', left: 60, right: 60, top: 1310, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12}}>
      {Object.values(GROUPS).map(([l, c]) => (
        <div key={l} style={{display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 30, padding: '8px 18px', boxShadow: '0 6px 14px rgba(14,30,60,0.12)'}}>
          <div style={{width: 22, height: 22, borderRadius: 11, background: c}} />
          <div style={{fontWeight: 800, fontSize: 26}}>{l}</div>
        </div>
      ))}
    </div>
    <div style={{position: 'absolute', left: 540, top: 1690, transform: 'translate(-50%, -50%)'}}><Stamp text="À ÉVALUER DANS LE DUERP" p={1} color={RED} size={44} rotate={-4} /></div>
    <Header hideAt={999} logo="promo/logo.png" />
    <Footer hideAt={999} />
  </AbsoluteFill>
);
