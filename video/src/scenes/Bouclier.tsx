import {Img, random, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, Kinetic, prog, useT} from '../anim';
import {PhotoPerson} from '../components/PhotoPerson';
import {colors} from '../theme';

export const SHIELD_AT = 49.3;
const SPARKS = Array.from({length: 18}, (_, i) => ({a: random(`sa${i}`) * Math.PI * 2, d: 380 + random(`sd${i}`) * 220, s: 10 + random(`ss${i}`) * 16}));
const SHIELD = 'M100 8 L186 40 V110 Q186 186 100 222 Q14 186 14 110 V40 Z';

/** 46,7 – 51,6 s : la théorie devient un bouclier protecteur pour ses équipes. */
export const Bouclier: React.FC = () => {
  const t = useT();
  const sup = prog(t, 46.75, 47.4);
  // le superviseur se « range » dans le cercle quand la photo d'équipe se révèle
  const shrink = prog(t, 48.3, 48.9, easeInOut);
  const r = 345 * prog(t, 48.45, 49.1, easeOut);
  const shield = prog(t, SHIELD_AT, SHIELD_AT + 0.9, easeInOut);
  const fill = prog(t, SHIELD_AT + 0.7, SHIELD_AT + 1.2);
  const pulse = t > 50.9 ? 1 + 0.04 * Math.sin((t - 50.9) * 14) * (1 - prog(t, 50.9, 51.5)) : 1;
  // sortie : on plonge dans le bouclier
  const dive = prog(t, 51.35, 51.75, easeIn);
  const glow = 0.5 + 0.5 * Math.sin(t * 5);
  return (
    <div style={{position: 'absolute', inset: 0, transform: `scale(${pulse * (1 + dive * 4)})`, transformOrigin: '540px 1040px', opacity: 1 - dive}}>
      {shrink < 1 && (
        <div style={{opacity: 1 - shrink, transform: `scale(${1 - shrink * 0.5})`, transformOrigin: '540px 1040px', position: 'absolute', inset: 0}}>
          <PhotoPerson who="superviseur" cx={540} bottom={1560} height={920} reveal={sup} />
        </div>
      )}
      <Kinetic text="Le Superviseur HSE transforme" at={46.8} until={48.4} y={430} size={70} color={colors.ink} weight={800} />
      <Kinetic text="la théorie en" at={48.45} until={49.25} y={430} size={84} color={colors.ink} weight={800} />

      {r > 0 && (
        <div
          style={{
            position: 'absolute',
            left: 540 - r,
            top: 1040 - r,
            width: r * 2,
            height: r * 2,
            borderRadius: '50%',
            overflow: 'hidden',
            border: `12px solid #fff`,
            boxShadow: `0 0 0 8px ${colors.green}, 0 20px 40px rgba(30,25,10,0.3)`,
          }}
        >
          <Img src={staticFile('personnages/equipe.jpg')} style={{position: 'absolute', left: r - 420, top: r - 330, width: 1050, height: 700}} />
        </div>
      )}

      {shield > 0 && (
        <svg width={900} height={1035} viewBox="0 0 200 230" style={{position: 'absolute', left: 90, top: 565, overflow: 'visible'}}>
          <defs>
            <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation={3 + glow * 3} />
            </filter>
          </defs>
          <path d={SHIELD} fill={`rgba(124,197,118,${0.22 * fill})`} stroke={colors.greenLight} strokeWidth={10} filter="url(#glow)" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - shield} opacity={0.8} />
          <path d={SHIELD} fill="none" stroke={colors.green} strokeWidth={6} strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - shield} />
        </svg>
      )}
      {/* étincelles à la fermeture du bouclier */}
      {t > SHIELD_AT + 0.8 &&
        t < SHIELD_AT + 1.8 &&
        SPARKS.map((sp, i) => {
          const p = prog(t, SHIELD_AT + 0.8, SHIELD_AT + 1.8, easeOut);
          const d = sp.d * (0.7 + 0.3 * p);
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 540 + Math.cos(sp.a) * d - sp.s / 2,
                top: 1040 + Math.sin(sp.a) * d - sp.s / 2,
                width: sp.s,
                height: sp.s,
                background: i % 2 ? colors.green : colors.ochre,
                transform: `rotate(45deg) scale(${1 - p})`,
              }}
            />
          );
        })}
      <Kinetic text="Un véritable *bouclier*" at={49.3} until={51.4} y={430} size={92} />
    </div>
  );
};
