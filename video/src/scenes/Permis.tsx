import {interpolate} from 'remotion';
import {easeIn, easeOut, Enter, Kinetic, prog, Underline, useSpring, useT} from '../anim';
import {HazardBar, Padlock, Permit, Stamp, Tag} from '../components/Icons';
import {PhotoPerson} from '../components/PhotoPerson';
import {colors} from '../theme';

const TAGS = [
  {label: 'Soudure', at: 19.5, x: 205},
  {label: 'Levage', at: 20.1, x: 540},
  {label: 'Confiné', at: 20.8, x: 875},
];
export const LOCK_TIMES = [21.9, 22.05, 22.2];
export const UNLOCK_TIMES = [24.3, 24.42, 24.54];
export const STAMP_AT = 23.5;

/** 16,3 – 25,1 s : opération critique, le dernier mot, permis de travail. */
export const Permis: React.FC = () => {
  const t = useT();
  const out = prog(t, 24.8, 25.15, easeIn);
  const sup = useSpring(16.45, {damping: 15});
  const stamp = prog(t, STAMP_AT - 0.12, STAMP_AT, easeIn);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <PhotoPerson who="superviseur" cx={interpolate(sup, [0, 1], [1200, 820])} bottom={1600} height={760} />

      {/* « Avant toute opération critique » */}
      <Enter at={16.5} until={17.75} x={540} y={520} from="left" to="right" dist={1200}>
        <HazardBar width={1240} label="OPÉRATION CRITIQUE" offset={t * 120} />
      </Enter>

      {/* « c'est lui qui a le dernier mot » */}
      <Kinetic text="C'est lui qui a" at={17.8} until={19.35} y={410} size={64} color={colors.ink} weight={800} />
      <Kinetic text="le *dernier mot*" at={18.35} until={19.35} y={520} size={92} maxWidth={1060} />
      <Underline at={18.7} until={19.35} x={540} y={585} width={600} />

      {/* opérations : étiquettes + cadenas */}
      {TAGS.map((tg, i) => {
        const drop = interpolate(t, [LOCK_TIMES[i] - 0.2, LOCK_TIMES[i]], [-260, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn});
        const squash = interpolate(t, [LOCK_TIMES[i], LOCK_TIMES[i] + 0.06, LOCK_TIMES[i] + 0.16], [1, 0.9, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const unlock = prog(t, UNLOCK_TIMES[i], UNLOCK_TIMES[i] + 0.25);
        const lockOut = prog(t, UNLOCK_TIMES[i] + 0.25, UNLOCK_TIMES[i] + 0.5, easeIn);
        return (
          <Enter key={tg.label} at={tg.at} until={25.1} x={tg.x} y={680} from="down" dist={200} bouncy>
            <div style={{position: 'relative', transform: `scaleY(${squash})`, transformOrigin: '50% 100%'}}>
              {t > LOCK_TIMES[i] - 0.2 && (
                <div style={{position: 'absolute', left: 125 - 55, top: -96 + drop - lockOut * 120, opacity: 1 - lockOut}}>
                  <Padlock size={110} open={unlock} />
                </div>
              )}
              <Tag label={tg.label} filled={unlock} />
            </div>
          </Enter>
        );
      })}
      <Kinetic text="Rien ne démarre sans" at={21.95} until={23.4} y={400} size={60} color={colors.ink} weight={800} />

      {/* permis de travail + tampon */}
      <Enter at={22.7} until={25.1} x={330} y={1130} from="left" dist={700} spin={-12} rotate={-4}>
        <div style={{position: 'relative'}}>
          <Permit size={300} />
          <div
            style={{
              position: 'absolute',
              left: 120,
              top: 210,
              opacity: t >= STAMP_AT - 0.12 ? 1 : 0,
              transform: `scale(${2.6 - 1.6 * stamp}) rotate(${-14 + stamp * 8}deg)`,
            }}
          >
            <Stamp size={190} />
          </div>
        </div>
      </Enter>
      <Kinetic text="*Permis* de travail" at={23.5} until={25.0} y={410} size={80} maxWidth={1060} />
      {/* onde de choc du tampon */}
      {t > STAMP_AT && t < STAMP_AT + 0.5 && (
        <div
          style={{
            position: 'absolute',
            left: 425 - 300 * prog(t, STAMP_AT, STAMP_AT + 0.5, easeOut),
            top: 1225 - 300 * prog(t, STAMP_AT, STAMP_AT + 0.5, easeOut),
            width: 600 * prog(t, STAMP_AT, STAMP_AT + 0.5, easeOut),
            height: 600 * prog(t, STAMP_AT, STAMP_AT + 0.5, easeOut),
            borderRadius: '50%',
            border: `10px solid ${colors.green}`,
            opacity: 1 - prog(t, STAMP_AT, STAMP_AT + 0.5),
          }}
        />
      )}
    </div>
  );
};
