import {interpolate} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, kf, Kinetic, prog, useT} from '../anim';
import {CheckCircle, Cross, Crosshair, Desk, Magnifier, Pin, Warning} from '../components/Icons';
import {PhotoPerson} from '../components/PhotoPerson';
import {colors} from '../theme';

const DANGERS = [
  {x: 175, y: 640},
  {x: 905, y: 820},
  {x: 185, y: 1210},
];

/** 7,9 – 16,3 s : pas au bureau, omniprésent, il traque les dangers et corrige les gestes. */
export const Terrain: React.FC = () => {
  const t = useT();
  const enter = prog(t, 7.9, 8.5);
  const out = prog(t, 15.9, 16.3, easeIn);

  // radar : anneaux qui émanent du superviseur (10,2 → 12,2)
  const radarOn = t > 10.2 && t < 12.3;
  const radarEnv = prog(t, 10.2, 10.5) * (1 - prog(t, 11.9, 12.3, easeIn));

  // viseur : se cale sur chaque danger tour à tour
  const ti = [12.55, 12.8, 12.95, 13.2, 13.35, 13.6];
  const cxh = kf(t, ti, [540, DANGERS[0].x, DANGERS[0].x, DANGERS[1].x, DANGERS[1].x, DANGERS[2].x], easeInOut);
  const cyh = kf(t, ti, [900, DANGERS[0].y, DANGERS[0].y, DANGERS[1].y, DANGERS[1].y, DANGERS[2].y], easeInOut);

  // loupe d'inspection en arc (13,1 → 14,1)
  const m = prog(t, 13.6, 14.3, easeInOut);
  const mx = 140 + m * 800;
  const my = 1000 - Math.sin(m * Math.PI) * 420;

  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      {radarOn &&
        [0, 1, 2].map((i) => {
          const ph = ((t - 10.2) * 0.9 + i / 3) % 1;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 540 - 520 * ph,
                top: 1000 - 520 * ph,
                width: 1040 * ph,
                height: 1040 * ph,
                borderRadius: '50%',
                border: `8px solid ${colors.green}`,
                opacity: (1 - ph) * 0.7 * radarEnv,
              }}
            />
          );
        })}

      <PhotoPerson
        who="superviseur"
        cx={540}
        bottom={1580}
        height={kf(t, [7.9, 8.6], [860, 900])}
        reveal={interpolate(enter, [0, 1], [0.6, 1])}
      />

      {/* « il ne reste pas au bureau » */}
      <Enter at={8.8} until={10.1} x={250} y={640} bouncy to="left" dist={300} rotate={t > 9.3 && t < 9.7 ? Math.sin(t * 60) * 6 : 0}>
        <div style={{position: 'relative', width: 200, height: 200}}>
          <Desk size={200} />
          <div style={{position: 'absolute', inset: 0}}>
            <Cross size={200} progress={prog(t, 9.3, 9.65, easeOut)} />
          </div>
        </div>
      </Enter>
      <Kinetic text="Pas au *bureau*" at={8.85} until={10.15} y={420} size={92} />

      {/* « omniprésent sur le terrain » */}
      <Kinetic text="Sur le *terrain*" at={10.25} until={12.1} y={420} size={104} />
      {[
        {x: 170, y: 760, at: 10.4},
        {x: 910, y: 680, at: 10.6},
        {x: 900, y: 1230, at: 10.8},
        {x: 165, y: 1260, at: 11.0},
      ].map((p, i) => (
        <Enter key={i} at={p.at} until={12.15} x={p.x} y={p.y + Math.sin(t * 3 + i) * 8} from="down" dist={120} bouncy>
          <Pin size={100} color={i % 2 ? colors.navy : colors.green} />
        </Enter>
      ))}

      {/* « il traque les dangers » */}
      <Kinetic text="Il traque les *dangers*" at={12.1} until={14.0} y={420} size={92} />
      {DANGERS.map((d, i) => {
        const flipAt = 14.1 + i * 0.18;
        const flip = prog(t, flipAt, flipAt + 0.3, easeInOut);
        const sx = Math.abs(Math.cos(flip * Math.PI));
        return (
          <Enter key={i} at={12.45 + i * 0.1} until={16.0} x={d.x} y={d.y} bouncy>
            <div style={{transform: `scaleX(${Math.max(0.02, sx)})`, width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {flip < 0.5 ? <Warning size={170} /> : <CheckCircle size={160} progress={prog(t, flipAt + 0.15, flipAt + 0.45)} />}
            </div>
          </Enter>
        );
      })}
      {t > 12.55 && t < 13.9 && (
        <div
          style={{
            position: 'absolute',
            left: cxh - 120,
            top: cyh - 120,
            opacity: prog(t, 12.55, 12.7) * (1 - prog(t, 13.7, 13.9)),
            transform: `rotate(${t * 90}deg) scale(${1 + 0.15 * Math.abs(Math.sin(t * 10))})`,
          }}
        >
          <Crosshair size={240} />
        </div>
      )}

      {/* « mène des inspections » */}
      {t > 13.55 && t < 14.4 && (
        <div style={{position: 'absolute', left: mx - 90, top: my - 90, opacity: prog(t, 13.55, 13.7) * (1 - prog(t, 14.2, 14.4)), transform: `rotate(${-20 + m * 40}deg)`}}>
          <Magnifier size={180} />
        </div>
      )}

      {/* « corrige les gestes en temps réel » */}
      <Kinetic text="Corrigés en *temps réel*" at={14.15} until={16.0} y={420} size={86} />
    </div>
  );
};
