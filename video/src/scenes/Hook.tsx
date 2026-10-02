import {easeIn, easeInOut, Enter, kf, Kinetic, prog, Underline, useSpring, useT} from '../anim';
import {House, QuestionBubble, ShieldCheck} from '../components/Icons';
import {PhotoPerson, Plate} from '../components/PhotoPerson';
import {colors} from '../theme';

/** 0 – 7,9 s : accroche. Le superviseur sort du disque, titre cinétique, objectif « sain et sauf ». */
export const Hook: React.FC = () => {
  const t = useT();
  const plate = useSpring(0.15, {damping: 14});
  const out = prog(t, 7.55, 7.9, easeIn);
  const reveal = prog(t, 0.3, 1.1);
  // le personnage glisse légèrement à gauche quand la maison arrive
  const cx = kf(t, [4.9, 5.5, 5.9, 6.4], [540, 610, 610, 540]);
  const path = prog(t, 5.5, 6.0, easeInOut);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out, transform: `scale(${1 + out * 0.15})`}}>
      <Plate x={540} y={720} r={330} p={plate} />
      <PhotoPerson who="superviseur" cx={cx} bottom={1120} height={860} reveal={reveal} />

      <Kinetic text="Superviseur" at={0.55} until={5.95} y={1215} size={118} />
      <Enter at={0.9} until={5.95} x={540} y={1340} from="up" dist={60}>
        <div style={{background: colors.green, color: '#fff', fontFamily: 'Montserrat', fontWeight: 900, fontSize: 88, padding: '2px 34px 6px', borderRadius: 14, transform: 'rotate(-2deg)'}}>
          HSE
        </div>
      </Enter>

      {/* « Son seul objectif ? » */}
      <Enter at={2.1} until={5.9} x={830} y={470} bouncy spin={-25} rotate={Math.sin(t * 5) * 5}>
        <QuestionBubble size={170} />
      </Enter>

      {/* « … rentre chez lui » : trajet pointillé jusqu'à la maison */}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: 1 - prog(t, 5.7, 6.0, easeIn)}}>
        <path
          d="M 560 900 C 420 980, 260 880, 220 700"
          fill="none"
          stroke={colors.navy}
          strokeWidth={8}
          strokeDasharray="2 22"
          strokeLinecap="round"
          strokeDashoffset={0}
          style={{clipPath: `inset(0 ${(1 - path) * 100}% 0 0)`}}
        />
      </svg>
      <Enter at={5.3} until={6.0} x={210} y={600} bouncy>
        <House size={170} />
      </Enter>

      {/* « sain et sauf » */}
      <Kinetic text="*Sain* & *sauf*" at={6.0} until={7.75} y={1250} size={120} stagger={0.08} maxWidth={1060} />
      <Underline at={6.25} until={7.75} x={540} y={1325} width={560} />
      <Enter at={6.05} until={7.75} x={830} y={470} bouncy spin={30}>
        <ShieldCheck size={180} check={prog(t, 6.3, 6.7)} />
      </Enter>
    </div>
  );
};
