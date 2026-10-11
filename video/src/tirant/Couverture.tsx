import React from 'react';
import {AbsoluteFill, staticFile} from 'remotion';
import {RED} from '../charte/ui';
import {Background} from '../components/Background';
import {Footer} from '../components/Footer';
import {Header} from '../components/Header';
import {colors, handFont, sansFont} from '../theme';

/**
 * Couverture de « Le tirant d'air » : titre de la thématique, la photo du harnais de l'ouverture et le calcul de la
 * capsule (longe + absorbeur + taille + marge, valeurs citées par la vidéo d'origine), dans son habillage. Rendue en
 * image fixe (image 90, une fois le bandeau et le pied de page entrés), posée sur les premières images de la vidéo et
 * jointe au MP4 comme vignette.
 */
const ORANGE = '#E8772E';
const CALC: [string, string, string][] = [['Longe', '1,80 m', colors.navy], ['Absorbeur', '1,20 m', ORANGE], ['Taille', '1,80 m', colors.green], ['Marge', '1,00 m', '#7B8794']];

export const TirantCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Background />
    <div style={{position: 'absolute', left: 50, right: 50, top: 270, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: RED, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 2}}>UN HARNAIS NE SUFFIT PAS</div>
      <div style={{fontWeight: 900, fontSize: 70, textTransform: 'uppercase', lineHeight: 1, marginTop: 20}}>Le</div>
      <div style={{fontWeight: 900, fontSize: 132, textTransform: 'uppercase', lineHeight: 1, letterSpacing: -3}}><span style={{color: colors.green}}>tirant</span> d'air</div>
    </div>
    <div style={{position: 'absolute', left: 70, top: 640, width: 940, height: 520, borderRadius: 30, overflow: 'hidden', border: '10px solid #fff', boxShadow: '0 20px 40px rgba(14,30,60,0.22)', backgroundImage: `url(${staticFile('tirant/harnais-dos.jpg')})`, backgroundSize: 'cover', backgroundPosition: '55% 40%'}}>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: '60px 26px 20px', background: 'linear-gradient(180deg, rgba(14,30,60,0), rgba(14,30,60,0.85))', color: '#fff', fontWeight: 900, fontSize: 40}}>L'espace pour <span style={{color: '#7FE08F'}}>survivre</span></div>
    </div>
    <div style={{position: 'absolute', left: 70, right: 70, top: 1210, display: 'flex', alignItems: 'center', gap: 10}}>
      {CALC.map(([l, v, c], i) => (
        <React.Fragment key={l}>
          {i > 0 && <div style={{fontWeight: 900, fontSize: 40, color: '#6B7684'}}>+</div>}
          <div style={{flex: 1, background: '#fff', borderRadius: 18, boxShadow: '0 8px 18px rgba(14,30,60,0.12)', borderTop: `8px solid ${c}`, padding: '12px 6px', textAlign: 'center'}}>
            <div style={{fontWeight: 800, fontSize: 22, color: '#6B7684'}}>{l}</div>
            <div style={{fontWeight: 900, fontSize: 34}}>{v}</div>
          </div>
        </React.Fragment>
      ))}
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 1370, display: 'flex', justifyContent: 'center'}}>
      <div style={{background: colors.navy, color: '#fff', borderRadius: 22, padding: '12px 34px', fontWeight: 900, fontSize: 46}}>= <span style={{color: '#7FE08F'}}>5,80 m</span> incontournables</div>
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1490, textAlign: 'center', fontWeight: 700, fontSize: 22, color: '#6B7684'}}>Valeurs citées par la vidéo d'origine</div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1580, textAlign: 'center', fontFamily: handFont, fontSize: 50}}>Mal calculé = <span style={{color: RED}}>inutile</span></div>
    <Header hideAt={999} logo="promo/logo.png" />
    <Footer hideAt={999} />
  </AbsoluteFill>
);
