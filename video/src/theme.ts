import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

export const FPS = 30;

export const colors = {
  paper: '#F1EDE3',
  green: '#2E9B3E',
  greenLight: '#7CC576',
  navy: '#0E2A5C',
  ochre: '#D9A23A',
  ink: '#1F2A3A',
  skin: '#F2C9A0',
  grey: '#B9C0C8',
  white: '#FFFFFF',
};

// Polices embarquées dans public/fonts (pas de dépendance réseau au rendu).
loadFont({family: 'Patrick Hand', url: staticFile('fonts/PatrickHand.woff2')});
loadFont({family: 'Montserrat', url: staticFile('fonts/Montserrat.woff2'), weight: '100 900'});
loadFont({family: 'Montserrat', url: staticFile('fonts/Montserrat-Italic.woff2'), weight: '100 900', style: 'italic'});

export const handFont = "'Patrick Hand', cursive";
export const sansFont = "'Montserrat', sans-serif";
export const sansItalic = sansFont;

/** secondes → frames */
export const s = (sec: number) => Math.round(sec * FPS);
