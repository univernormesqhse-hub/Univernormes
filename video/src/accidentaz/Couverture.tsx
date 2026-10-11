import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Backdrop, shadow} from '../identui/IdentUi';
import {colors, handFont, sansFont} from '../theme';

/**
 * Couverture de « La gestion de l'accident du travail de A à Z » : titre de la thématique, palettes « DE A À Z » et
 * sommaire des 5 étapes de la capsule. Rendue en image fixe, posée sur les premières images de la vidéo et jointe au
 * MP4 comme vignette.
 */
const RED = '#D9443A';
const ECO = '#2E9B3E';
const TITLES = ["L'accident", 'Obligations', 'Le médecin', "L'enquête", 'La rechute'];

const Flap: React.FC<{c: string; size: number}> = ({c, size}) => (
  <div style={{position: 'relative', width: size * 0.8, height: size * 1.1, borderRadius: size * 0.1, background: c === ' ' ? 'transparent' : ECO, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: c === ' ' ? 'none' : '0 10px 24px rgba(20,60,30,0.25)', overflow: 'hidden'}}>
    <span style={{fontWeight: 900, fontSize: size * 0.72, color: '#fff', lineHeight: 1}}>{c}</span>
    {c !== ' ' && <div style={{position: 'absolute', left: 0, right: 0, top: '50%', height: 3, background: 'rgba(0,0,0,0.22)'}} />}
  </div>
);

export const AccidentAZCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Backdrop />
    <div style={{position: 'absolute', left: 50, right: 50, top: 250, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: RED, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>SANTÉ-SÉCURITÉ AU TRAVAIL</div>
      <div style={{fontWeight: 900, fontSize: 70, textTransform: 'uppercase', marginTop: 26, lineHeight: 1}}>La gestion de</div>
      <div style={{fontWeight: 900, fontSize: 96, textTransform: 'uppercase', lineHeight: 1, marginTop: 8, letterSpacing: -2}}>l'accident</div>
      <div style={{fontWeight: 900, fontSize: 96, textTransform: 'uppercase', lineHeight: 1, letterSpacing: -2, color: RED}}>du travail</div>
      <div style={{display: 'flex', justifyContent: 'center', gap: 10, marginTop: 34}}>
        {'DE A À Z'.split('').map((ch, i) => <Flap key={i} c={ch} size={110} />)}
      </div>
    </div>
    <div style={{position: 'absolute', left: 130, right: 130, top: 920, display: 'flex', flexDirection: 'column', gap: 16}}>
      <div style={{textAlign: 'center', fontWeight: 800, fontSize: 30, letterSpacing: 8, color: '#8A93A0', textTransform: 'uppercase', marginBottom: 6}}>5 étapes · le parcours complet</div>
      {TITLES.map((l, i) => (
        <div key={l} style={{display: 'flex', alignItems: 'center', gap: 22, background: '#fff', borderRadius: 22, boxShadow: shadow, padding: '14px 26px 14px 14px'}}>
          <div style={{display: 'flex', gap: 4}}>{`0${i + 1}`.split('').map((d, k) => <Flap key={k} c={d} size={52} />)}</div>
          <div style={{flex: 1, fontWeight: 900, fontSize: 40, textTransform: 'uppercase', letterSpacing: 1}}>{l}</div>
          <div style={{width: 18, height: 18, borderRadius: 9, background: ECO}} />
        </div>
      ))}
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1660, textAlign: 'center', fontFamily: handFont, fontSize: 52, opacity: 0.85}}>Prévenir vaut toujours mieux que corriger</div>
  </AbsoluteFill>
);
