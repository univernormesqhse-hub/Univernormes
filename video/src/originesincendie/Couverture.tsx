import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {F} from '../iso/ui';
import {handFont, sansFont} from '../theme';

/**
 * Couverture de « Les origines d'un incendie industriel » : titre de la thématique et les six classes de feu de la
 * capsule. Rendue en image fixe, posée sur les premières images de la vidéo et jointe au MP4 comme vignette.
 */
const BG = '#0D1117';
const INK = '#F3F5F8';
const ORANGE = '#FF7A1A';
const CL: [string, string, string, string][] = [
  ['A', 'Solides', '#E07B2B', 'Bois · Papier · Carton'],
  ['B', 'Liquides', '#2F6FB5', 'Essence · Gasoil\nSolvants'],
  ['C', 'Gaz', '#C6A400', 'Propane · Butane\nGaz naturel'],
  ['D', 'Métaux', '#8A93A0', 'Mg · Na · Al'],
  ['F', 'Huiles de\ncuisson', '#6B4FA0', 'Huiles · Graisses'],
  ['L', 'Batteries\nlithium-ion', '#D9443A', 'Emballement\nthermique'],
];

export const OriginesIncendieCouverture: React.FC = () => (
  <AbsoluteFill style={{background: `radial-gradient(90% 55% at 50% 32%, #3A1A0C 0%, ${BG} 70%)`, fontFamily: sansFont, color: INK}}>
    <div style={{position: 'absolute', left: 0, right: 0, top: 95, display: 'flex', justifyContent: 'center'}}>
      <div style={{background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile('promo/logo.png')} style={{height: 84, display: 'block'}} /></div>
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 330, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: ORANGE, color: BG, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>RISQUE INCENDIE</div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 24}}>
        <F n="feu" size={190} />
        <div style={{textAlign: 'left', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.95}}>
          <div style={{fontSize: 74, letterSpacing: -1}}>Les origines</div>
          <div style={{fontSize: 74, letterSpacing: -1}}>d'un incendie</div>
          <div style={{fontSize: 64, letterSpacing: -1, color: ORANGE}}>industriel</div>
        </div>
      </div>
      <div style={{fontWeight: 900, fontSize: 58, textTransform: 'uppercase', marginTop: 34}}>Les <span style={{color: ORANGE}}>6 classes</span> de feu</div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginTop: 44}}>
        {CL.map(([l, n, c, ex]) => (
          <div key={l} style={{borderRadius: 24, border: `3px solid ${c}`, background: `${c}22`, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 18, textAlign: 'left', height: 200, boxSizing: 'border-box'}}>
            <div style={{fontWeight: 900, fontSize: 130, lineHeight: 1, color: c, width: 100, textAlign: 'center'}}>{l}</div>
            <div>
              <div style={{fontWeight: 900, fontSize: 36, lineHeight: 1.05, textTransform: 'uppercase', whiteSpace: 'pre-line'}}>{n}</div>
              <div style={{fontWeight: 600, fontSize: 22, color: 'rgba(243,245,248,0.7)', marginTop: 10, whiteSpace: 'pre-line'}}>{ex}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{fontFamily: handFont, fontSize: 52, color: INK, opacity: 0.85, marginTop: 50}}>Connais-tu les différentes classes de feu ?</div>
    </div>
  </AbsoluteFill>
);
