import {interpolate} from 'remotion';
import {easeIn, easeInOut, Enter, kf, Kinetic, prog, useT} from '../anim';
import {Beacon, Bin, Recycle} from '../components/Icons';
import {colors} from '../theme';

export const BIN_TIMES = [28.0, 28.12, 28.24];

/** 25,1 – 30,1 s : exercices d'urgence (gyrophare) puis tri des déchets. */
export const Urgence: React.FC = () => {
  const t = useT();
  const out = prog(t, 29.8, 30.1, easeIn);
  const glow = (Math.sin(t * 14) + 1) / 2;
  // le gyrophare monte et rétrécit quand le tri arrive
  const by = kf(t, [27.7, 28.1], [820, 600]);
  const bs = kf(t, [27.7, 28.1], [1, 0.62]);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Il orchestre aussi" at={25.15} until={26.4} y={430} size={70} color={colors.ink} weight={800} />
      <Kinetic text="Exercices d'*urgence*" at={25.9} until={27.75} y={1180} size={100} />

      <Enter at={25.55} until={30.0} x={540} y={by} bouncy>
        <div style={{position: 'relative', transform: `scale(${bs})`}}>
          {/* faisceau rotatif */}
          <div
            style={{
              position: 'absolute',
              left: -260,
              top: -300,
              width: 900,
              height: 900,
              borderRadius: '50%',
              background: `conic-gradient(from ${t * 400}deg, rgba(246,207,91,0.55) 0deg, transparent 40deg, transparent 180deg, rgba(246,207,91,0.55) 180deg, transparent 220deg)`,
              WebkitMaskImage: 'radial-gradient(circle, #000 20%, transparent 65%)',
              maskImage: 'radial-gradient(circle, #000 20%, transparent 65%)',
            }}
          />
          <Beacon size={380} glow={glow} />
        </div>
      </Enter>

      {/* « le tri des déchets industriels » */}
      {BIN_TIMES.map((at, i) => {
        const y = interpolate(t, [at, at + 0.28], [-500, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn});
        const sq = interpolate(t, [at + 0.28, at + 0.36, at + 0.5], [1, 0.82, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        if (t < at) return null;
        return (
          <div key={i} style={{position: 'absolute', left: 250 + i * 215 - 85, top: 1010 + y, transform: `scaleY(${sq}) scaleX(${2 - sq})`, transformOrigin: '50% 100%'}}>
            <Bin size={170} color={[colors.green, colors.ochre, '#4A5568'][i]} />
          </div>
        );
      })}
      <Enter at={28.5} until={30.0} x={540} y={930} bouncy>
        <Recycle size={120} rotate={t * 120} />
      </Enter>
      <Kinetic text="Tri des *déchets*" at={27.9} until={30.0} y={1340} size={96} />
      {/* petits déchets qui tombent dans les bacs */}
      {t > 28.6 &&
        [0, 1, 2, 3, 4, 5].map((k) => {
          const st = 28.6 + k * 0.17;
          const p = prog(t, st, st + 0.35, easeInOut);
          if (t < st || p >= 1) return null;
          return (
            <div
              key={k}
              style={{
                position: 'absolute',
                left: 250 + (k % 3) * 215 - 14,
                top: 760 + p * 300,
                width: 28,
                height: 28,
                borderRadius: k % 2 ? 6 : 14,
                background: [colors.green, colors.ochre, '#4A5568'][k % 3],
                transform: `rotate(${p * 360}deg)`,
                opacity: 1 - p * 0.3,
              }}
            />
          );
        })}
    </div>
  );
};
