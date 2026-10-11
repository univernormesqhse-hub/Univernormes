import React from 'react';
import {AbsoluteFill} from 'remotion';
import {RED} from '../charte/ui';
import {Background} from '../components/Background';
import {Footer} from '../components/Footer';
import {Header} from '../components/Header';
import {colors, handFont, sansFont} from '../theme';
import {AMBER, Cable, Floor, Person, Tag} from './Incident';

/**
 * Couverture de « Incident ou accident ? » : titre de la thématique, les deux étiquettes de qualification et la scène
 * de l'atelier (le câble au sol, l'opérateur qui se rattrape, le collègue qui tombe), dans l'habillage de la capsule.
 * Rendue en image fixe (image 90, une fois le bandeau et le pied de page entrés), posée sur les premières images de la
 * vidéo et jointe au MP4 comme vignette.
 */
const Y = 1430;

export const IncidentCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Background />
    <div style={{position: 'absolute', left: 50, right: 50, top: 270, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: colors.navy, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>SANTÉ-SÉCURITÉ AU TRAVAIL</div>
      <div style={{fontWeight: 900, fontSize: 124, textTransform: 'uppercase', lineHeight: 1, marginTop: 20, color: AMBER, letterSpacing: -3}}>Incident</div>
      <div style={{fontWeight: 900, fontSize: 60, textTransform: 'uppercase', lineHeight: 1.1}}>ou</div>
      <div style={{fontWeight: 900, fontSize: 124, textTransform: 'uppercase', lineHeight: 1, color: RED, letterSpacing: -3}}>accident ?</div>
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 750, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22}}>
      <div style={{transform: 'rotate(-2deg)'}}><Tag title="INCIDENT" sub="Sans blessure ni dommage" color={AMBER} icon="danger" /></div>
      <div style={{transform: 'rotate(2deg)'}}><Tag title="ACCIDENT" sub="Blessure corporelle" color={RED} icon="ambulance" /></div>
    </div>
    <Floor y={Y} />
    <Person x={260} y={Y} arms={0.6} step={0.6} />
    <Cable x={500} y={Y} glow={0.8} />
    <Person x={740} y={Y + 10} rot={78} suit="#2F7FD8" />
    <div style={{position: 'absolute', left: 50, right: 50, top: 1520, textAlign: 'center', fontFamily: handFont, fontSize: 54}}>La véritable <span style={{color: RED}}>différence</span></div>
    <Header hideAt={999} logo="promo/logo.png" />
    <Footer hideAt={999} />
  </AbsoluteFill>
);
