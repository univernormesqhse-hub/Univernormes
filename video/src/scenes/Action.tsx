import {random} from 'remotion';
import {easeIn, Enter, Kinetic, prog, useT} from '../anim';
import {Bell, CheckCircle, Eye} from '../components/Icons';
import {PhotoPerson} from '../components/PhotoPerson';
import {colors, sansFont} from '../theme';

export const RULE_TIMES = [42.0, 42.35, 42.7];

const LINES = Array.from({length: 14}, (_, i) => ({y: 300 + random(`ly${i}`) * 1300, len: 120 + random(`ll${i}`) * 260, sp: 1 + random(`ls${i}`) * 1.5, w: 4 + random(`lw${i}`) * 6}));

/** 37,7 – 43,7 s : le superviseur vit dans l'action, observe, alerte, fait appliquer. */
export const Action: React.FC = () => {
  const t = useT();
  const out = prog(t, 43.35, 43.7, easeIn);
  const speed = prog(t, 38.8, 39.1) * (1 - prog(t, 40.1, 40.4, easeIn));
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      {/* lignes de vitesse */}
      {speed > 0 &&
        LINES.map((l, i) => {
          const x = ((t * 1400 * l.sp + i * 230) % 1600) - 300;
          return <div key={i} style={{position: 'absolute', left: 1080 - x, top: l.y, width: l.len, height: l.w, borderRadius: l.w, background: i % 3 ? colors.navy : colors.green, opacity: 0.25 * speed}} />;
        })}

      <PhotoPerson who="superviseur" cx={540} bottom={1600} height={980} reveal={prog(t, 37.75, 38.4)} tilt={speed * -2} />

      <Kinetic text="Le Superviseur, lui," at={37.75} until={38.85} y={430} size={76} color={colors.ink} weight={800} />
      <Kinetic text="Vit dans *l'action*" at={38.9} until={40.25} y={430} size={104} />

      {/* observe / alerte / fait appliquer */}
      <Enter at={40.3} until={43.5} x={170} y={760} bouncy>
        <Eye size={200} blink={t > 41.3 && t < 41.42 ? 1 : 0} />
      </Enter>
      <Enter at={41.0} until={43.5} x={910} y={700} bouncy rotate={Math.sin(t * 22) * 14 * (1 - prog(t, 41.0, 42.0))}>
        <div style={{position: 'relative'}}>
          <Bell size={170} />
          {[0, 1].map((k) => {
            const ph = ((t - 41.0) * 2 + k / 2) % 1;
            return <div key={k} style={{position: 'absolute', left: 85 - 120 * ph, top: 85 - 120 * ph, width: 240 * ph, height: 240 * ph, borderRadius: '50%', border: `5px solid ${colors.ochre}`, opacity: (1 - ph) * (t < 42.4 ? 1 : 0)}} />;
          })}
        </div>
      </Enter>
      <Kinetic text="Observe · Alerte · *Applique*" at={40.3} until={43.5} y={430} size={70} stagger={0.35} />
      <Enter at={41.8} until={43.5} x={540} y={1300} from="up" dist={200}>
        <div style={{background: '#fff', borderRadius: 24, padding: '22px 30px', boxShadow: '0 14px 30px rgba(30,25,10,0.18)', display: 'flex', flexDirection: 'column', gap: 14, width: 520}}>
          {['Port des EPI', 'Balisage de zone', 'Consignation'].map((r, i) => (
            <div key={r} style={{display: 'flex', alignItems: 'center', gap: 18, fontFamily: sansFont, fontWeight: 700, fontSize: 36, color: colors.ink}}>
              <div style={{width: 56, height: 56}}>{t > RULE_TIMES[i] ? <CheckCircle size={56} progress={prog(t, RULE_TIMES[i], RULE_TIMES[i] + 0.25)} /> : <div style={{width: 50, height: 50, borderRadius: '50%', border: `5px solid ${colors.grey}`}} />}</div>
              {r}
            </div>
          ))}
        </div>
      </Enter>
    </div>
  );
};
