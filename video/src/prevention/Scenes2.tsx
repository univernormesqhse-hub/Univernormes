import {interpolate} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, kf, Kinetic, prog, useSpring, useT} from '../anim';
import {CheckCircle, ShieldCheck} from '../components/Icons';
import {colors, sansFont} from '../theme';
import {Asset, euros} from './assets';
import {Chip} from './Scenes1';

const RED = '#D9443A';
const LOSSES = ['Urgences', 'Arrêts', 'Machine', 'Productivité', 'Cotisations'];

/** 34,8 – 42,9 s : pertes vertigineuses contre investissement ciblé (balance), puis le garde-corps. */
export const Balance: React.FC = () => {
  const t = useT();
  const show = useSpring(34.9, {damping: 14});
  // la balance penche côté pertes, puis l'investissement (léger) arrive
  const tilt = kf(t, [35.0, 36.6, 37.0, 37.6], [0, -16, -16, -12]);
  const balOut = prog(t, 38.7, 39.1, easeIn);
  const gc = useSpring(39.75, {damping: 9, stiffness: 160});
  const out = prog(t, 42.6, 42.95, easeIn);
  const L = 330; // demi-fléau
  const lx = 540 - L * Math.cos((tilt * Math.PI) / 180);
  const ly = 820 + L * Math.sin((-tilt * Math.PI) / 180) * -1;
  const rx = 540 + L * Math.cos((tilt * Math.PI) / 180);
  const ry = 820 - L * Math.sin((-tilt * Math.PI) / 180) * -1;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Pertes *vertigineuses*" at={34.85} until={36.95} y={420} size={86} accent={RED} />
      <Kinetic text="vs investissement *ciblé*" at={37.0} until={38.9} y={420} size={78} maxWidth={1040} />
      {balOut < 1 && (
        <div style={{position: 'absolute', inset: 0, opacity: (1 - balOut) * Math.min(1, show * 1.5), transform: `scale(${0.8 + 0.2 * show})`, transformOrigin: '540px 1000px'}}>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <path d="M 540 830 L 470 1420 H 610 Z" fill={colors.navy} />
            <rect x={400} y={1410} width={280} height={30} rx={10} fill={colors.navy} />
            <line x1={lx} y1={ly} x2={rx} y2={ry} stroke={colors.ink} strokeWidth={18} strokeLinecap="round" />
            <circle cx={540} cy={820} r={24} fill={colors.ochre} stroke={colors.ink} strokeWidth={6} />
            <line x1={lx} y1={ly} x2={lx} y2={ly + 150} stroke={colors.ink} strokeWidth={5} />
            <line x1={rx} y1={ry} x2={rx} y2={ry + 150} stroke={colors.ink} strokeWidth={5} />
            <path d={`M ${lx - 160} ${ly + 150} Q ${lx} ${ly + 230} ${lx + 160} ${ly + 150} Z`} fill="#fff" stroke={RED} strokeWidth={7} />
            <path d={`M ${rx - 160} ${ry + 150} Q ${rx} ${ry + 230} ${rx + 160} ${ry + 150} Z`} fill="#fff" stroke={colors.green} strokeWidth={7} />
          </svg>
          {/* empilement des pertes sur le plateau gauche */}
          {LOSSES.map((l, i) => {
            const at = 35.1 + i * 0.28;
            const d = interpolate(t, [at, at + 0.25], [-700, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn});
            if (t < at) return null;
            return (
              <div key={l} style={{position: 'absolute', left: lx, top: ly + 100 - i * 56 + d, transform: 'translateX(-50%)', background: RED, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 28, padding: '8px 18px', borderRadius: 12, whiteSpace: 'nowrap', boxShadow: '0 6px 14px rgba(0,0,0,0.2)'}}>
                {l}
              </div>
            );
          })}
          <div style={{position: 'absolute', left: lx, top: ly + 230, transform: 'translateX(-50%)', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: RED, opacity: prog(t, 36.4, 36.8), whiteSpace: 'nowrap'}}>≈ 100 000 €</div>
          {t > 37.0 && (
            <div style={{position: 'absolute', left: rx, top: ry + 150 - 150 + interpolate(t, [37.0, 37.3], [-600, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn}), transform: 'translateX(-50%)'}}>
              <div style={{position: 'relative', width: 220, height: 160}}>
                <Asset name="garde-corps" x={110} bottom={160} h={160} />
              </div>
            </div>
          )}
          <div style={{position: 'absolute', left: rx, top: ry + 230, transform: 'translateX(-50%)', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: colors.green, opacity: prog(t, 37.4, 37.8), whiteSpace: 'nowrap'}}>1 500 €</div>
        </div>
      )}

      {/* le garde-corps protecteur, installé avant le drame */}
      {t > 39.6 && (
        <>
          <Asset name="garde-corps" x={540} bottom={1340} h={520} dy={(1 - gc) * -1200} glow={`rgba(124,197,118,${0.5 * prog(t, 40.2, 40.6)})`} />
          {Array.from({length: 12}).map((_, i) => {
            const p = prog(t, 40.05, 40.9, easeOut);
            if (p <= 0 || p >= 1) return null;
            const a = (i / 12) * Math.PI * 2;
            return <div key={i} style={{position: 'absolute', left: 540 + Math.cos(a) * (200 + p * 260), top: 1080 + Math.sin(a) * (120 + p * 200), width: 18, height: 18, background: i % 2 ? colors.green : colors.ochre, transform: `rotate(45deg) scale(${1 - p})`}} />;
          })}
        </>
      )}
      <Kinetic text="Un *garde-corps* protecteur" at={39.75} until={42.75} y={420} size={78} maxWidth={1040} />
      <Enter at={40.4} until={42.75} x={540} y={1440} bouncy rotate={Math.sin(t * 3) * 4}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: '#fff', background: colors.green, padding: '6px 28px 10px', borderRadius: 16}}>1 500 €</div>
      </Enter>
      <Enter at={41.1} until={42.75} x={540} y={1560} from="up" dist={60}>
        <Chip label="Installé AVANT le drame" color={colors.green} icon="✓" size={30} />
      </Enter>
    </div>
  );
};

/** 42,9 – 50,3 s : 1 € investi neutralise la réaction en chaîne (dominos). */
export const Chaine: React.FC = () => {
  const t = useT();
  const out = prog(t, 50.0, 50.3, easeIn);
  const coin = useSpring(43.9, {damping: 10});
  // le premier domino commence à basculer… puis le garde-fou le retient
  const push = kf(t, [44.6, 45.6, 45.9, 46.3], [0, 22, 22, 0]);
  const shield = useSpring(45.8, {damping: 10, stiffness: 200});
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Mathématiquement," at={42.95} until={43.85} y={420} size={80} />
      <Kinetic text="*1 €* investi…" at={43.9} until={47.3} y={420} size={100} />
      <Kinetic text="…neutralise la *réaction en chaîne*" at={47.4} until={50.1} y={420} size={66} maxWidth={1040} />
      <div style={{position: 'absolute', left: 540, top: 700, transform: `translate(-50%, -50%) scale(${coin}) rotateY(${(1 - coin) * 360}deg)`}}>
        <div style={{width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #FFE7A0, #D9A23A 70%)', border: '10px solid #B5841F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 100, color: '#7A5512', boxShadow: '0 16px 30px rgba(0,0,0,0.25)'}}>€</div>
      </div>
      {LOSSES.map((l, i) => {
        const x = 150 + i * 195;
        const at = 44.0 + i * 0.1;
        const sp = prog(t, at, at + 0.35, easeOut);
        const rot = i === 0 ? push : push * Math.max(0, 1 - i * 0.5) * 0.3;
        const ok = prog(t, 47.5 + i * 0.35, 47.8 + i * 0.35);
        return (
          <div key={l} style={{position: 'absolute', left: x - 75, top: 1080 + (1 - sp) * 300, width: 150, height: 250, opacity: sp, transformOrigin: '100% 100%', transform: `rotate(${rot}deg)`}}>
            <div style={{width: '100%', height: '100%', borderRadius: 18, background: '#fff', border: `6px solid ${ok > 0.5 ? colors.green : RED}`, boxShadow: '0 12px 24px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, fontFamily: sansFont, fontWeight: 800, fontSize: 22, color: colors.ink, textAlign: 'center'}}>
              <div style={{width: 64, height: 64}}>{ok > 0 ? <CheckCircle size={64} progress={ok} /> : <div style={{width: 60, height: 60, borderRadius: '50%', background: RED, color: '#fff', fontSize: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>€</div>}</div>
              {l}
            </div>
          </div>
        );
      })}
      {/* garde-fou qui stoppe la chaîne */}
      {t > 45.8 && (
        <div style={{position: 'absolute', left: 30, top: 1010, transform: `scale(${shield})`, transformOrigin: '50% 100%'}}>
          <ShieldCheck size={110} check={prog(t, 46.0, 46.4)} />
        </div>
      )}
      <Enter at={48.1} until={50.1} x={540} y={1440} bouncy>
        <Chip label="Coûts incontrôlables évités" color={colors.green} icon="✓" size={32} />
      </Enter>
    </div>
  );
};

/** 50,3 – 58,6 s : retour à l'accident, le garde-corps a bloqué la chute. */
export const Replay: React.FC = () => {
  const t = useT();
  const enter = useSpring(50.4, {damping: 14});
  const gc = useSpring(51.5, {damping: 10});
  const bump = prog(t, 54.0, 54.35, easeOut) * (1 - prog(t, 54.6, 55.3, easeInOut));
  const card = useSpring(56.9, {damping: 13});
  const pose = t < 53.9 ? 'ouvrier-travail' : t < 55.6 ? 'ouvrier-chute' : 'ouvrier-pouce';
  const dir = useSpring(57.6, {damping: 13});
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <Kinetic text="Et notre *accident* ?" at={50.35} until={53.75} y={420} size={92} />
      <Asset name="machine" x={830} bottom={1520} h={520} dy={(1 - enter) * 600} opacity={1 - prog(t, 56.7, 57.1)} />
      <Asset name={pose} x={330} bottom={1610} h={pose === 'ouvrier-chute' ? 850 : 880} dx={(1 - enter) * -700 + (pose === 'ouvrier-chute' ? -10 + bump * -20 : 0)} rotate={pose === 'ouvrier-chute' ? -4 * bump : 0} origin="50% 90%" />
      {/* garde-corps devant l'ouvrier */}
      <Asset name="garde-corps" x={330} bottom={1620} h={430} dy={(1 - gc) * 900} rotate={bump * 2} />
      <Kinetic text="Chute *bloquée*" at={53.8} until={56.25} y={420} size={104} />
      {t > 54.0 && t < 54.6 && <div style={{position: 'absolute', left: 330 - 220, top: 1300 - 220, width: 440, height: 440, borderRadius: '50%', border: `10px solid ${colors.green}`, opacity: 1 - prog(t, 54.0, 54.6), transform: `scale(${0.5 + prog(t, 54.0, 54.6)})`}} />}
      <Kinetic text="Employé *indemne*" at={56.3} until={58.55} y={420} size={92} />
      <Enter at={55.7} until={58.6} x={330} y={660} bouncy>
        <Chip label="Sain et sauf" color={colors.green} icon="✓" />
      </Enter>
      {/* budget intact */}
      <div style={{position: 'absolute', left: 800, top: 850, transform: `translate(-50%, -50%) translateX(${(1 - card) * 600}px)`, opacity: Math.min(1, card * 2)}}>
        <div style={{width: 400, background: '#fff', borderRadius: 26, padding: '22px 20px 26px', boxShadow: '0 16px 32px rgba(30,25,10,0.2)', textAlign: 'center', fontFamily: sansFont, borderTop: `14px solid ${colors.green}`}}>
          <div style={{position: 'relative', height: 200}}>
            <Asset name="coffre" x={180} bottom={200} h={200} />
          </div>
          <div style={{fontWeight: 900, fontSize: 64, color: colors.green, letterSpacing: -2}}>{euros(98500)}</div>
          <div style={{fontWeight: 800, fontSize: 30, color: colors.ink}}>Budget intact</div>
        </div>
      </div>
      <Asset name="dirigeant-pouce" x={interpolate(dir, [0, 1], [1400, 900])} bottom={1640} h={560} opacity={dir > 0.01 ? 1 : 0} />
    </div>
  );
};
