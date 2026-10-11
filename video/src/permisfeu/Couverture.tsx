import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {F} from '../iso/ui';
import {handFont, sansFont} from '../theme';

/**
 * Couverture de « Comment fonctionne le permis de feu » : titre de la thématique dans l'univers « braises » de la
 * capsule, avec l'allumette allumée de l'ouverture. Rendue en image fixe, posée sur les premières images de la vidéo
 * et jointe au MP4 comme vignette.
 */
const EMBER = '#FF7A1A';
const FLAME = '#FFB13B';
const INK = '#F6EFE6';
const DIM = 'rgba(246,239,230,0.7)';
const RISK: [string, string][] = [['Flamme', 'feu'], ['Étincelles', 'etincelles'], ['Chaleur', 'chaud']];

export const PermisFeuCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: INK, background: 'radial-gradient(ellipse at 50% 85%, #3A1E10 0%, #1B1310 45%, #0E0B0A 100%)'}}>
    <AbsoluteFill style={{backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1.5px, transparent 1.5px)', backgroundSize: '36px 36px'}} />
    <AbsoluteFill style={{background: 'radial-gradient(circle at 540px 560px, rgba(255,140,40,0.35) 0%, transparent 40%)'}} />
    <div style={{position: 'absolute', left: 0, right: 0, top: 95, display: 'flex', justifyContent: 'center'}}>
      <div style={{background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile('promo/logo.png')} style={{height: 84, display: 'block'}} /></div>
    </div>
    {/* Allumette allumée */}
    <div style={{position: 'absolute', left: 540 - 13, top: 470, width: 26, height: 350, borderRadius: 8, background: 'linear-gradient(90deg, #E9CFA0, #F7E4BF 50%, #D8B988)'}} />
    <div style={{position: 'absolute', left: 540 - 19, top: 452, width: 38, height: 46, borderRadius: '50%', background: '#3A1A10'}} />
    <div style={{position: 'absolute', left: 540 - 60, top: 330, width: 120, height: 190}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: '50% 50% 45% 45% / 65% 65% 35% 35%', background: 'radial-gradient(ellipse at 50% 75%, #FFF6C8 0%, #FFC94A 30%, #FF7A1A 60%, rgba(229,67,47,0) 75%)', filter: 'blur(2px)'}} />
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 860, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: EMBER, color: '#1B1310', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>RISQUE INCENDIE</div>
      <div style={{fontWeight: 900, fontSize: 64, textTransform: 'uppercase', marginTop: 26, lineHeight: 1}}>Comment fonctionne</div>
      <div style={{fontWeight: 900, fontSize: 118, textTransform: 'uppercase', marginTop: 10, lineHeight: 1, letterSpacing: -2, color: FLAME, textShadow: '0 0 40px rgba(255,140,40,0.5)'}}>le permis</div>
      <div style={{fontWeight: 900, fontSize: 118, textTransform: 'uppercase', lineHeight: 1, letterSpacing: -2, color: FLAME, textShadow: '0 0 40px rgba(255,140,40,0.5)'}}>de feu</div>
      <div style={{fontWeight: 700, fontSize: 36, color: DIM, marginTop: 30}}>Une autorisation <b style={{color: INK}}>écrite</b> de sécurité</div>
      <div style={{display: 'flex', justifyContent: 'center', gap: 22, marginTop: 34}}>
        {RISK.map(([l, i]) => (
          <div key={l} style={{width: 270, padding: '22px 0 18px', borderRadius: 28, border: `3px solid ${EMBER}`, background: 'rgba(255,122,26,0.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
            <F n={i} size={96} />
            <div style={{fontWeight: 900, fontSize: 32, textTransform: 'uppercase'}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{fontFamily: handFont, fontSize: 50, color: INK, opacity: 0.85, marginTop: 36}}>C'est quoi un permis de feu ?</div>
    </div>
  </AbsoluteFill>
);
