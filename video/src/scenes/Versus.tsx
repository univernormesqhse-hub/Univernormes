import {interpolate} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, kf, Kinetic, prog, useSpring, useT} from '../anim';
import {BarChart, Building, Gear, SkillCard} from '../components/Icons';
import {PhotoPerson} from '../components/PhotoPerson';
import {colors, sansFont} from '../theme';

export const VS_AT = 31.0;

const NameTag: React.FC<{label: string; color: string}> = ({label, color}) => (
  <div style={{background: color, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 40, padding: '8px 22px 10px', borderRadius: 12, whiteSpace: 'nowrap'}}>{label}</div>
);

/** 30,1 – 37,7 s : écran partagé Superviseur / Responsable, puis focus sur le Responsable. */
export const Versus: React.FC = () => {
  const t = useT();
  const out = prog(t, 37.4, 37.7, easeIn);
  const split = prog(t, 30.15, 30.7, easeOut);
  const unsplit = prog(t, 33.2, 33.75, easeInOut);
  const left = useSpring(30.3, {damping: 15});
  const right = useSpring(30.45, {damping: 15});
  const vs = useSpring(VS_AT, {damping: 8, stiffness: 220});
  // le responsable prend la gauche de l'écran
  const rcx = kf(t, [33.2, 33.8], [810, 300]);
  const rh = kf(t, [33.2, 33.8], [700, 820]);
  const rb = kf(t, [33.2, 33.8], [1420, 1520]);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      {/* moitiés teintées en diagonale */}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <polygon points={`0,250 ${600 * split - 600 * unsplit},250 ${480 * split - 480 * unsplit},1640 0,1640`} fill={colors.green} opacity={0.14} />
        <polygon points={`1080,250 ${1080 - 480 * split + 480 * unsplit},250 ${1080 - 600 * split + 600 * unsplit},1640 1080,1640`} fill={colors.navy} opacity={0.12} />
        <line x1={600} y1={250} x2={480} y2={1640} stroke={colors.ink} strokeWidth={6} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - split + unsplit} />
      </svg>

      <Kinetic text="Ne pas le *confondre*" at={30.15} until={33.25} y={420} size={86} />

      <PhotoPerson who="superviseur" cx={interpolate(left, [0, 1], [-300, 260]) - unsplit * 700} bottom={1420} height={700} />
      <PhotoPerson who="responsable" cx={interpolate(right, [0, 1], [1400, 0]) + rcx} bottom={rb} height={rh} />

      <Enter at={30.6} until={33.3} x={260} y={1480} from="up" to="left" dist={300}>
        <NameTag label="SUPERVISEUR" color={colors.green} />
      </Enter>
      <Enter at={31.9} until={37.6} x={t < 33.3 ? 810 : kf(t, [33.2, 33.8], [810, 300])} y={1480} from="up" dist={100}>
        <NameTag label="RESPONSABLE" color={colors.navy} />
      </Enter>

      {t > VS_AT && t < 33.4 && (
        <div
          style={{
            position: 'absolute',
            left: 540 - 110,
            top: 930 - 110,
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: colors.ochre,
            border: `10px solid #fff`,
            boxShadow: '0 16px 30px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: sansFont,
            fontWeight: 900,
            fontSize: 100,
            color: '#fff',
            transform: `scale(${vs * (1 - prog(t, 33.1, 33.4, easeIn))}) rotate(${(1 - vs) * -90}deg)`,
          }}
        >
          VS
        </div>
      )}

      {/* rôle du responsable : cartes de compétences */}
      <Kinetic text="Le *Responsable*" at={33.5} until={37.5} y={420} size={92} />
      <Enter at={33.6} until={37.5} x={790} y={700} from="left" dist={-500}>
        <SkillCard icon={<Gear size={100} rotate={t * 90} />} title="Pilote" sub="le système" />
      </Enter>
      <Enter at={35.1} until={37.5} x={790} y={920} from="left" dist={-500}>
        <SkillCard
          icon={
            <div style={{transform: 'scale(0.22)', width: 110, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <BarChart grow={prog(t, 35.2, 36.0)} trend={prog(t, 35.6, 36.3)} axes={1} />
            </div>
          }
          title="Décortique"
          sub="les chiffres"
        />
      </Enter>
      <Enter at={35.9} until={37.5} x={790} y={1140} from="left" dist={-500}>
        <SkillCard icon={<Building size={100} />} title="Conseille" sub="la direction" />
      </Enter>
    </div>
  );
};
