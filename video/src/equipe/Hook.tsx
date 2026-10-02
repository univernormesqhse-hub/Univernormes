import {interpolate, random} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, Kinetic, prog, useT} from '../anim';
import {Building, Cross, Permit, QuestionBubble, ShieldCheck} from '../components/Icons';
import {colors} from '../theme';
import {ROLES} from './roles';
import {Img, staticFile} from 'remotion';

const N = colors.navy;

/** Paysage industriel au trait qui se dessine (cuves, cheminées, tuyauteries). */
const Factory: React.FC<{p: number; smoke: number}> = ({p, smoke}) => {
  const t = useT();
  const parts: {d: string; fill: string; at: number}[] = [
    {d: 'M40 900 V560 H170 V900', fill: '#DDE6F0', at: 0},
    {d: 'M70 560 V430 H110 V560', fill: '#C9D5E3', at: 0.1},
    {d: 'M210 900 V640 Q210 600 250 600 H330 Q370 600 370 640 V900', fill: '#E9EEF4', at: 0.15},
    {d: 'M410 900 V380 H460 V900', fill: '#C9D5E3', at: 0.2},
    {d: 'M500 900 V300 H555 V900', fill: '#DDE6F0', at: 0.25},
    {d: 'M600 900 V520 H760 V900', fill: '#E9EEF4', at: 0.3},
    {d: 'M640 520 L680 470 L720 520', fill: '#C9D5E3', at: 0.35},
    {d: 'M800 900 V600 Q800 560 840 560 H960 Q1000 560 1000 600 V900', fill: '#DDE6F0', at: 0.4},
    {d: 'M170 700 H210 M370 720 H410 M460 660 H500 M555 760 H600 M760 700 H800', fill: 'none', at: 0.5},
    {d: 'M20 900 H1060', fill: 'none', at: 0},
  ];
  return (
    <svg width={1080} height={1000} viewBox="0 0 1080 1000">
      {parts.map((pt, i) => {
        const q = Math.max(0, Math.min(1, (p - pt.at) / 0.5));
        return (
          <g key={i}>
            <path d={pt.d} fill={pt.fill === 'none' ? 'none' : pt.fill} fillOpacity={q} stroke={N} strokeWidth={7} strokeLinejoin="round" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - q} />
          </g>
        );
      })}
      {/* fenêtres et détails */}
      {[0, 1, 2, 3].map((k) => (
        <rect key={k} x={622 + (k % 2) * 70} y={580 + Math.floor(k / 2) * 90} width={46} height={46} rx={4} fill={colors.ochre} opacity={prog(t, 1.8 + k * 0.08, 2.1 + k * 0.08) * (0.6 + 0.4 * Math.sin(t * 3 + k))} />
      ))}
      {/* fumées */}
      {[
        [90, 430],
        [435, 380],
        [527, 300],
      ].map(([x, y], i) =>
        [0, 1, 2].map((k) => {
          const ph = (t * 0.45 + k / 3 + i * 0.2) % 1;
          return <circle key={`${i}-${k}`} cx={x + Math.sin(ph * 4 + i) * 24 + ph * 40} cy={y - 30 - ph * 220} r={18 + ph * 40} fill="#B8C3D1" opacity={smoke * (1 - ph) * 0.6} />;
        }),
      )}
    </svg>
  );
};

/** 0 – 9,5 s : accroche. Site industriel, règles empilées, du bureau au chantier. */
export const Hook: React.FC = () => {
  const t = useT();
  const fac = prog(t, 0.1, 2.4, easeInOut);
  const facOut = prog(t, 4.6, 5.0, easeIn);
  const topple = prog(t, 4.25, 4.85, easeIn);
  const path = prog(t, 7.4, 8.2, easeInOut);
  const out = prog(t, 9.15, 9.5, easeIn);
  const agent = ROLES.agent;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      {/* site industriel */}
      <div style={{position: 'absolute', left: 0, top: 640, opacity: 1 - facOut, transform: `translateY(${facOut * 200}px) scale(${1 + 0.05 * Math.sin(t)})`}}>
        <Factory p={fac} smoke={prog(t, 1.5, 2.2)} />
      </div>
      <Kinetic text="Gérer la *sécurité*" at={0.1} until={2.55} y={410} size={92} />
      <Kinetic text="d'un site *industriel*" at={1.0} until={2.55} y={575} size={60} color={colors.ink} weight={800} />

      {/* « ce n'est pas juste empiler des règles » */}
      <Kinetic text="Empiler des *règles* ?" at={2.65} until={4.75} y={420} size={96} />
      {[0, 1, 2, 3, 4, 5].map((k) => {
        const at = 2.7 + k * 0.22;
        if (t < at) return null;
        const y = interpolate(t, [at, at + 0.25], [-1100, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn});
        const wob = Math.sin(t * 7 + k) * (2 + k * 1.2) * prog(t, 3.6, 4.2);
        const dir = k % 2 ? 1 : -1;
        return (
          <div
            key={k}
            style={{
              position: 'absolute',
              left: 540 - 130 + random(`dx${k}`) * 40 - 20 + topple * dir * (200 + k * 60),
              top: 1360 - k * 105 + y + topple * (300 + k * 120),
              transform: `rotate(${88 + (random(`r${k}`) - 0.5) * 10 + wob + topple * dir * (60 + k * 25)}deg)`,
              opacity: 1 - prog(t, 4.6, 4.85),
            }}
          >
            <Permit size={200} />
          </div>
        );
      })}
      <Enter at={4.3} until={4.85} x={540} y={1080}>
        <Cross size={420} progress={prog(t, 4.3, 4.6)} />
      </Enter>

      {/* « une politique pensée dans des bureaux… protège le travailleur sur le chantier ? » */}
      <Kinetic text="Du *bureau*…" at={5.3} until={8.25} y={420} size={104} />
      <Enter at={5.4} until={9.3} x={270} y={860} bouncy>
        <div style={{background: '#fff', borderRadius: '50%', width: 300, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 14px 30px rgba(30,25,10,0.18)'}}>
          <Building size={200} />
        </div>
      </Enter>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d="M 330 1020 C 420 1300, 640 1080, 740 1220" fill="none" stroke={N} strokeWidth={9} strokeDasharray="2 24" strokeLinecap="round" style={{clipPath: `inset(0 ${(1 - path) * 100}% 0 0)`}} opacity={1 - out} />
      </svg>
      <Enter at={7.4} until={9.3} x={810} y={1290} bouncy>
        <div style={{position: 'relative', width: 320, height: 320, borderRadius: '50%', overflow: 'hidden', background: '#DCEFD9', border: '10px solid #fff', boxShadow: `0 0 0 6px ${colors.green}, 0 14px 30px rgba(30,25,10,0.2)`}}>
          <Img src={staticFile(agent.src)} style={{position: 'absolute', height: 300 / agent.win, left: 150 - agent.fx * (300 / agent.win) * agent.ratio, top: 150 - agent.fy * (300 / agent.win)}} />
        </div>
      </Enter>
      <Enter at={7.6} until={9.3} x={960} y={1110} bouncy spin={40}>
        <ShieldCheck size={110} check={prog(t, 7.8, 8.2)} />
      </Enter>
      <Kinetic text="…au *chantier* ?" at={8.3} until={9.35} y={540} size={96} />
      <Enter at={8.3} until={9.3} x={560} y={1000} bouncy spin={-30} rotate={Math.sin(t * 6) * 6}>
        <QuestionBubble size={190} />
      </Enter>
    </div>
  );
};
