import {colors, sansFont, sansItalic} from '../theme';
import {Globe, WhatsAppIcon} from './Logo';

/** Bandeau haut : logo sur vague blanche (gauche) + bande marine services (droite). */
export const Header: React.FC = () => (
  <div style={{position: 'absolute', top: 0, left: 0, width: 1080, height: 260}}>
    <svg width={1080} height={260} style={{position: 'absolute', inset: 0}}>
      {/* bande marine */}
      <path d="M470 0 H1080 V88 H540 Q505 88 492 60 Z" fill={colors.navy} />
      {/* vague blanche + liseré vert */}
      <path d="M0 0 H462 C 430 60, 420 150, 360 196 C 300 236, 120 222, 0 236 Z" fill="#fff" />
      <path d="M462 -4 C 430 60, 420 150, 360 196 C 300 236, 120 222, 0 236" fill="none" stroke={colors.green} strokeWidth="11" />
    </svg>
    <div style={{position: 'absolute', left: 74, top: -6}}>
      <Globe size={150} />
    </div>
    <div
      style={{
        position: 'absolute',
        left: -6,
        top: 106,
        width: 390,
        textAlign: 'center',
        fontFamily: sansFont,
        fontWeight: 800,
        fontSize: 46,
        letterSpacing: -1.5,
        color: colors.navy,
        transform: 'scaleX(0.92)',
      }}
    >
      UNIVERSNORMES
    </div>
    <div
      style={{
        position: 'absolute',
        left: 10,
        top: 166,
        width: 360,
        textAlign: 'center',
        fontFamily: sansItalic,
        fontStyle: 'italic',
        fontWeight: 700,
        fontSize: 17,
        color: colors.navy,
      }}
    >
      Qualité · Sécurité · Environnement
    </div>
    <div style={{position: 'absolute', left: 548, top: 14}}>
      <WhatsAppIcon size={60} />
    </div>
    <div style={{position: 'absolute', left: 724, top: 16, width: 5, height: 56, background: colors.green}} />
    <div
      style={{
        position: 'absolute',
        left: 748,
        top: 18,
        fontFamily: sansFont,
        fontWeight: 700,
        fontSize: 18,
        lineHeight: '27px',
        color: '#fff',
        whiteSpace: 'nowrap',
      }}
    >
      FORMATIONS&nbsp;&nbsp;•&nbsp;&nbsp;AUDITS
      <br />
      ACCOMPAGNEMENT&nbsp;&nbsp;•&nbsp;&nbsp;CONSEIL
    </div>
  </div>
);
