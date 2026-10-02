import {easeOut, Enter, prog, useSpring, useT} from '../anim';
import {Globe, WhatsAppIcon} from '../components/Logo';
import {colors, sansFont, sansItalic} from '../theme';

export const OUTRO_AT = 51.6;

/** 51,6 s → fin : signature animée UNIVERSNORMES. */
export const Outro: React.FC<{at: number}> = ({at: OUTRO_AT}) => {
  const t = useT();
  const globe = useSpring(OUTRO_AT + 0.1, {damping: 11});
  const word = 'UNIVERSNORMES';
  const bar = prog(t, OUTRO_AT + 0.9, OUTRO_AT + 1.4);
  return (
    <div style={{position: 'absolute', inset: 0}}>
      {/* cercles concentriques qui s'ouvrent */}
      {[0, 1, 2].map((i) => {
        const p = prog(t, OUTRO_AT + i * 0.12, OUTRO_AT + 1.2 + i * 0.12, easeOut);
        return <div key={i} style={{position: 'absolute', left: 540 - 700 * p, top: 760 - 700 * p, width: 1400 * p, height: 1400 * p, borderRadius: '50%', border: `${6 - i * 1.5}px solid ${i === 1 ? colors.navy : colors.green}`, opacity: 0.35 * (1 - p)}} />;
      })}
      <div style={{position: 'absolute', left: 540 - 210, top: 760 - 165, transform: `scale(${globe}) rotate(${(1 - globe) * -120}deg)`}}>
        <Globe size={420} />
      </div>
      <div style={{position: 'absolute', top: 1010, left: 0, right: 0, display: 'flex', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 112, letterSpacing: -3, color: colors.navy}}>
        {word.split('').map((ch, i) => {
          const p = prog(t, OUTRO_AT + 0.35 + i * 0.035, OUTRO_AT + 0.75 + i * 0.035);
          return (
            <span key={i} style={{display: 'inline-block', opacity: p, transform: `translateY(${(1 - p) * 60}px) scale(${0.6 + 0.4 * p})`}}>
              {ch}
            </span>
          );
        })}
      </div>
      <Enter at={OUTRO_AT + 0.8} x={540} y={1160} from="up" dist={40}>
        <div style={{fontFamily: sansItalic, fontStyle: 'italic', fontWeight: 700, fontSize: 36, color: colors.navy, whiteSpace: 'nowrap'}}>Qualité · Sécurité · Environnement</div>
      </Enter>
      <div style={{position: 'absolute', left: 540 - 300 * bar, top: 1215, width: 600 * bar, height: 8, borderRadius: 4, background: colors.green}} />
      <Enter at={OUTRO_AT + 1.1} x={540} y={1320} from="up" dist={60}>
        <div style={{textAlign: 'center', fontFamily: sansItalic, fontStyle: 'italic', fontWeight: 700, fontSize: 46, lineHeight: 1.25, color: colors.ink, whiteSpace: 'nowrap'}}>
          Des normes aujourd’hui,
          <br />
          <span style={{color: colors.green}}>un avenir durable demain</span>
        </div>
      </Enter>
      <Enter at={OUTRO_AT + 1.4} x={540} y={1560} from="up" dist={80} bouncy>
        <div style={{display: 'flex', alignItems: 'center', gap: 22, background: colors.navy, borderRadius: 60, padding: '18px 40px'}}>
          <WhatsAppIcon size={58} />
          <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 30, color: '#fff', whiteSpace: 'nowrap'}}>FORMATIONS • AUDITS • ACCOMPAGNEMENT • CONSEIL</div>
        </div>
      </Enter>
    </div>
  );
};
