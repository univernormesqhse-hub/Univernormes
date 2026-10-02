import {interpolate} from 'remotion';
import {easeIn, Enter, Kinetic, prog, useT} from '../anim';
import {Cross, Manual} from '../components/Icons';
import {colors} from '../theme';

export const BOOK_TIMES = [43.8, 43.95, 44.1];
export const TOPPLE_AT = 45.7;

/** 43,7 – 46,7 s : les manuels ne sauvent aucune vie à eux seuls. */
export const Manuels: React.FC = () => {
  const t = useT();
  const out = prog(t, 46.4, 46.7, easeIn);
  const topple = prog(t, TOPPLE_AT, TOPPLE_AT + 0.6, easeIn);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Les *manuels*" at={43.75} until={46.5} y={430} size={110} accent={colors.ochre} />
      {BOOK_TIMES.map((at, i) => {
        const y = interpolate(t, [at, at + 0.25], [-900, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn});
        if (t < at) return null;
        const rot = [-4, 3, -2][i] + topple * [-70, 40, 95][i];
        const dx = topple * [-300, 120, 360][i];
        const dy = topple * [350, 420, 300][i];
        return (
          <div key={i} style={{position: 'absolute', left: 540 - 240 + dx, top: 1180 - i * 120 + y + dy, transform: `rotate(${rot}deg)`, opacity: 1 - topple * 0.8}}>
            <div style={{transform: 'rotate(90deg)'}}>
              <Manual size={190} />
            </div>
          </div>
        );
      })}
      <Enter at={45.6} until={46.5} x={540} y={1050}>
        <Cross size={460} progress={prog(t, 45.6, 45.95)} />
      </Enter>
      <Kinetic text="ne sauvent aucune vie" at={44.8} until={46.5} y={620} size={70} color={colors.ink} weight={800} />
      <Kinetic text="*à eux seuls*" at={45.6} until={46.5} y={730} size={90} accent="#D9443A" />
    </div>
  );
};
