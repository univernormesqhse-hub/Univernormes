import React from 'react';
import {AbsoluteFill, staticFile} from 'remotion';
import {RED} from '../charte/ui';
import {Background} from '../components/Background';
import {Footer} from '../components/Footer';
import {Header} from '../components/Header';
import {BLUE} from '../pieges/ui';
import {colors, handFont, sansFont} from '../theme';

/**
 * Couverture de « L'analyse SWOT » : titre de la thématique et la matrice des 4 quadrants de la capsule (photos de
 * l'exemple du restaurant), dans son habillage. Rendue en image fixe (image 90, une fois le bandeau et le pied de page
 * entrés), posée sur les premières images de la vidéo et jointe au MP4 comme vignette.
 */
const ORANGE = '#EE7D1A';
const QS: [string, string, string, string, string][] = [
  ['S', 'Forces', 'Strengths', colors.green, 'swot/chef-client.jpg'],
  ['W', 'Faiblesses', 'Weaknesses', ORANGE, 'swot/cuisine-saturee.jpg'],
  ['O', 'Opportunités', 'Opportunities', BLUE, 'swot/livraison-appli.jpg'],
  ['T', 'Menaces', 'Threats', RED, 'swot/nouveau-bistrot.jpg'],
];

export const SwotCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Background />
    <div style={{position: 'absolute', left: 50, right: 50, top: 280, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: colors.green, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>OUTIL D'ANALYSE STRATÉGIQUE</div>
      <div style={{fontWeight: 900, fontSize: 76, textTransform: 'uppercase', marginTop: 22, lineHeight: 1}}>L'analyse</div>
      <div style={{display: 'flex', justifyContent: 'center', gap: 10, marginTop: 10}}>
        {QS.map(([k, , , c]) => <div key={k} style={{width: 150, height: 150, borderRadius: 30, background: c, color: '#fff', fontWeight: 900, fontSize: 120, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 24px rgba(14,30,60,0.2)'}}>{k}</div>)}
      </div>
    </div>
    <div style={{position: 'absolute', left: 70, right: 70, top: 690, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22}}>
      {QS.map(([k, fr, en, c, img]) => (
        <div key={k} style={{borderRadius: 28, overflow: 'hidden', background: '#fff', border: `6px solid ${c}`, boxShadow: '0 16px 32px rgba(14,30,60,0.16)'}}>
          <div style={{background: c, color: '#fff', padding: '10px 18px', display: 'flex', alignItems: 'baseline', gap: 12}}>
            <span style={{fontWeight: 900, fontSize: 44}}>{k}</span><span style={{fontWeight: 900, fontSize: 36}}>{fr}</span>
          </div>
          <div style={{height: 260, backgroundImage: `url(${staticFile(img)})`, backgroundSize: 'cover', backgroundPosition: '50% 40%'}} />
          <div style={{padding: '10px 18px', fontWeight: 700, fontStyle: 'italic', fontSize: 24, color: '#6B7684'}}>{en}</div>
        </div>
      ))}
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1560, textAlign: 'center', fontFamily: handFont, fontSize: 54}}>Si tu es <span style={{color: colors.green}}>entrepreneur</span>… mieux décider</div>
    <Header hideAt={999} logo="promo/logo.png" />
    <Footer hideAt={999} />
  </AbsoluteFill>
);
