import {AbsoluteFill, Img, interpolate, random} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, kf, Kinetic, prog, Underline, useSpring, useT} from '../anim';
import {Warning} from '../components/Icons';
import {colors, sansFont} from '../theme';
import {Asset, assetSrc, euros, usePh} from './assets';

const RED = '#D9443A';

/** Décor d'usine (Nano Banana) en plein cadre, avec lent zoom « Ken Burns ». */
export const Decor: React.FC<{from: number; to: number; tint?: number}> = ({from, to, tint = 0}) => {
  const t = useT();
  const ph = usePh();
  if (t < from - 0.1 || t > to + 0.1) return null;
  const o = prog(t, from, from + 0.4) * (1 - prog(t, to - 0.4, to, easeIn));
  const z = 1.04 + 0.1 * ((t - from) / Math.max(1, to - from));
  return (
    <AbsoluteFill style={{opacity: o, overflow: 'hidden'}}>
      <Img src={assetSrc('decor', ph)} style={{position: 'absolute', width: 1080, height: 1935, top: 0, left: 0, objectFit: 'cover', transform: `scale(${z})`, transformOrigin: '50% 60%'}} />
      <AbsoluteFill style={{background: 'linear-gradient(to bottom, rgba(241,237,227,0.92) 0%, rgba(241,237,227,0.8) 27%, rgba(241,237,227,0) 40%, rgba(14,42,92,0.05) 70%, rgba(241,237,227,0.6) 100%)'}} />
      {tint > 0 && <AbsoluteFill style={{background: RED, opacity: tint, mixBlendMode: 'multiply'}} />}
    </AbsoluteFill>
  );
};

/** Pastille de coût / libellé. */
export const Chip: React.FC<{label: string; color?: string; icon?: string; size?: number}> = ({label, color = colors.navy, icon, size = 34}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 12, background: '#fff', borderRadius: 16, padding: '12px 22px 12px 14px', boxShadow: '0 12px 26px rgba(30,25,10,0.18)', fontFamily: sansFont, fontWeight: 800, fontSize: size, color: colors.ink, whiteSpace: 'nowrap', borderLeft: `10px solid ${color}`}}>
    {icon && <span style={{width: size * 1.2, height: size * 1.2, borderRadius: '50%', background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.75}}>{icon}</span>}
    {label}
  </div>
);

/** 0 – 11,1 s : la prévention rapporte… mais les dirigeants y voient une charge. */
export const Hook: React.FC = () => {
  const t = useT();
  const d1 = useSpring(0.2, {damping: 15});
  const d1out = prog(t, 5.5, 5.95, easeIn);
  const arrow = prog(t, 0.6, 1.5, easeOut);
  const d2 = useSpring(5.85, {damping: 14});
  const stamp = prog(t, 8.45, 8.6, easeIn);
  const out = prog(t, 10.8, 11.1, easeIn);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      {/* « la sécurité rapporte de l'argent » */}
      {t < 6.1 && (
        <>
          <div style={{position: 'absolute', left: 300, top: 1080, transform: `translate(-50%, -50%) translate(${(1 - arrow) * -380}px, ${(1 - arrow) * 520}px) rotate(${-8 + (1 - arrow) * 20}deg) scale(${0.6 + 0.4 * arrow})`, opacity: Math.min(1, arrow * 2) * (1 - d1out)}}>
            <Asset name="fleche" x={0} bottom={300} h={600} glow="rgba(246,207,91,0.45)" />
          </div>
          <Enter at={1.0} until={5.9} x={250} y={1420} bouncy>
            <div style={{position: 'relative', width: 330, height: 300}}>
              <Asset name="pieces" x={165} bottom={300} h={300} />
            </div>
          </Enter>
          {/* pièces qui s'envolent */}
          {t > 4.3 &&
            Array.from({length: 10}).map((_, i) => {
              const st = 4.3 + i * 0.08;
              const p = prog(t, st, st + 1.2, easeOut);
              if (p <= 0 || p >= 1) return null;
              return <div key={i} style={{position: 'absolute', left: 250 + (random(`c${i}`) - 0.5) * 300, top: 1350 - p * 700, width: 46, height: 46, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #FFE7A0, #D9A23A 70%)', border: '4px solid #B5841F', opacity: 1 - p, transform: `rotateY(${p * 720}deg)`}} />;
            })}
          <Asset name="dirigeant-presente" x={interpolate(d1, [0, 1], [1300, 720]) + d1out * 700} bottom={1620} h={1080} />
        </>
      )}
      <Kinetic text="L'économie de la *prévention*" at={0.05} until={3.35} y={420} size={70} maxWidth={1040} />
      <Kinetic text="La sécurité *rapporte*" at={3.4} until={5.5} y={420} size={86} maxWidth={1040} />

      {/* « … une simple charge administrative » */}
      {t > 5.8 && (
        <>
          <Asset name="dirigeant-dossiers" x={540} bottom={1620} h={1100} dy={(1 - d2) * 900} rotate={t > 8.5 && t < 8.9 ? Math.sin(t * 60) * 1.5 : 0} />
          {[
            {at: 6.8, x: 200, bottom: 1520},
            {at: 7.5, x: 880, bottom: 1480},
          ].map((p, i) => {
            const y = interpolate(t, [p.at, p.at + 0.3], [-1300, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn});
            const sq = interpolate(t, [p.at + 0.3, p.at + 0.38, p.at + 0.5], [1, 0.85, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            if (t < p.at) return null;
            return <Asset key={i} name="dossiers" x={p.x} bottom={p.bottom} h={330} dy={y} scale={sq} />;
          })}
          {t > 8.45 && (
            <div
              style={{
                position: 'absolute',
                left: 540,
                top: 980,
                transform: `translate(-50%, -50%) rotate(-12deg) scale(${2.4 - 1.4 * stamp})`,
                opacity: stamp,
                border: `12px solid ${RED}`,
                borderRadius: 18,
                padding: '10px 34px 14px',
                color: RED,
                fontFamily: sansFont,
                fontWeight: 900,
                fontSize: 96,
                letterSpacing: 4,
                background: 'rgba(255,255,255,0.75)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              }}
            >
              CHARGE ?
            </div>
          )}
        </>
      )}
      <Kinetic text="Pourtant, les dirigeants…" at={5.65} until={8.4} y={420} size={70} maxWidth={1040} />
      <Kinetic text="Une simple *charge* ?" at={8.5} until={10.95} y={420} size={92} accent={RED} />
    </div>
  );
};

/** 11,1 – 15 s : l'accident grave sur la chaîne de production. */
export const Accident: React.FC = () => {
  const t = useT();
  const ouv = useSpring(11.3, {damping: 14});
  const mac = useSpring(11.45, {damping: 14});
  const fall = prog(t, 12.3, 12.75, easeOut);
  const out = prog(t, 14.7, 15.05, easeIn);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Asset name="machine" x={800} bottom={1560} h={600} dy={(1 - mac) * 700} glow={t > 12.3 ? `rgba(217,68,58,${0.4 + 0.3 * Math.sin(t * 14)})` : undefined} />
      {t < 12.3 ? (
        <Asset name="ouvrier-travail" x={340} bottom={1610} h={880} dx={(1 - ouv) * -700} />
      ) : (
        <Asset name="ouvrier-chute" x={360} bottom={1610} h={860} rotate={-6 * fall + Math.sin(t * 8) * 1.5} dx={-30 * fall} dy={20 * fall} origin="50% 90%" />
      )}
      <Kinetic text="Une chaîne de *production*" at={11.15} until={12.25} y={420} size={76} maxWidth={1040} />
      <Kinetic text="Accident *grave*" at={12.3} until={14.9} y={420} size={110} accent={RED} />
      <Enter at={12.45} until={14.9} x={650} y={760} bouncy rotate={Math.sin(t * 9) * 5}>
        <Warning size={190} />
      </Enter>
    </div>
  );
};

/** Compteur de trésorerie animé. */
const Counter: React.FC<{value: number; danger: number}> = ({value, danger}) => (
  <div style={{textAlign: 'center', fontFamily: sansFont}}>
    <div style={{fontWeight: 900, fontSize: 124, letterSpacing: -3, color: danger > 0.5 ? RED : colors.navy, lineHeight: 1, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap'}}>{euros(value)}</div>
  </div>
);

/** 15 – 27,9 s : la trésorerie se vide (urgences, arrêts, machine, productivité). */
export const Tresorerie: React.FC = () => {
  const t = useT();
  const safe = useSpring(15.1, {damping: 12});
  const value = kf(t, [18.6, 20.6, 25.9, 27.4], [100000, 30000, 30000, 5000]);
  const danger = prog(t, 18.6, 19.2);
  const amb = kf(t, [17.0, 17.7, 20.9, 21.4], [-500, 230, 230, -600]);
  const out = prog(t, 27.6, 27.95, easeIn);
  const sx = kf(t, [16.9, 17.4, 20.9, 21.4], [540, 700, 700, 540]);
  const sh = kf(t, [21.4, 22.4], [460, 320]);
  const shake = (t > 18.6 && t < 20.6) || (t > 25.9 && t < 27.4) ? Math.sin(t * 50) * 4 : 0;
  // courbe de productivité qui s'effondre
  const prodP = prog(t, 25.1, 26.4, easeInOut);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Choc financier *immédiat*" at={15.05} until={21.0} y={420} size={74} maxWidth={1040} accent={RED} />
      <Kinetic text="Un véritable *gouffre*" at={22.45} until={27.6} y={420} size={92} accent={RED} />
      <div style={{position: 'absolute', left: sx, top: 1150 - sh - 60, transform: 'translateX(-50%)', fontFamily: sansFont, fontWeight: 800, fontSize: 34, letterSpacing: 6, color: colors.navy, opacity: safe}}>TRÉSORERIE</div>
      <div style={{position: 'absolute', inset: 0, transform: `translateX(${shake}px)`}}>
        <Asset name="coffre" x={sx} bottom={1150} h={sh} scale={0.4 + 0.6 * safe} />
        <div style={{position: 'absolute', left: sx - 540, width: 1080, top: 1180, opacity: safe}}>
          <Counter value={value} danger={danger} />
        </div>
      </div>
      {/* billets / pièces qui s'échappent du coffre */}
      {[...Array(14)].map((_, i) => {
        const window = i < 8 ? [18.6, 20.6] : [25.9, 27.4];
        const st = window[0] + (i % 8) * 0.22;
        const p = prog(t, st, st + 0.9, easeOut);
        if (p <= 0 || p >= 1) return null;
        const ang = random(`a${i}`) * Math.PI - Math.PI;
        return <div key={i} style={{position: 'absolute', left: sx + Math.cos(ang) * p * 420, top: 950 + Math.sin(ang) * p * 300 + p * p * 300, width: 54, height: 30, borderRadius: 6, background: '#7CC576', border: '3px solid #2E7D32', opacity: 1 - p, transform: `rotate(${p * 400}deg)`}} />;
      })}
      {/* urgences + arrêts médicaux */}
      {t > 17.0 && t < 21.5 && (
        <div style={{position: 'absolute', left: amb, top: 660, transform: 'translateX(-50%)'}}>
          <div style={{position: 'relative'}}>
            <Asset name="ambulance" x={0} bottom={250} h={250} />
            <div style={{position: 'absolute', left: -40, top: -10, width: 30, height: 30, borderRadius: '50%', background: Math.sin(t * 20) > 0 ? RED : '#3B82F6', boxShadow: `0 0 30px ${Math.sin(t * 20) > 0 ? RED : '#3B82F6'}`}} />
          </div>
        </div>
      )}
      <Enter at={17.15} until={21.0} x={230} y={1010} from="right" dist={-300}>
        <Chip label="Urgences" color={RED} icon="+" />
      </Enter>
      <Enter at={17.75} until={21.0} x={250} y={1120} from="right" dist={-300}>
        <Chip label="Arrêts médicaux" color={RED} icon="+" />
      </Enter>
      <Enter at={19.4} until={22.4} x={540} y={1420} bouncy>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: '#fff', background: RED, padding: '6px 26px 10px', borderRadius: 16}}>– 70 000 €</div>
      </Enter>
      {/* machine à l'arrêt + productivité */}
      <Enter at={23.9} until={27.6} x={235} y={690} bouncy>
        <div style={{position: 'relative', width: 340, height: 300}}>
          <Asset name="machine-arret" x={170} bottom={300} h={290} glow={`rgba(217,68,58,${0.35 + 0.3 * Math.sin(t * 12)})`} />
        </div>
      </Enter>
      <Enter at={25.1} until={27.6} x={850} y={690} from="left" dist={-300}>
        <div style={{width: 330, background: '#fff', borderRadius: 20, padding: '16px 18px', boxShadow: '0 12px 26px rgba(30,25,10,0.18)', fontFamily: sansFont}}>
          <div style={{fontWeight: 800, fontSize: 26, color: colors.ink}}>Productivité</div>
          <svg width={294} height={150} viewBox="0 0 294 150">
            <path d="M6 140 H288" stroke="#C9CFD6" strokeWidth={4} />
            <path d="M10 40 L80 34 L140 46 L180 50 L220 120 L284 136" fill="none" stroke={RED} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - prodP} />
          </svg>
        </div>
      </Enter>
      <Enter at={26.3} until={27.6} x={540} y={1420} bouncy>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: '#fff', background: RED, padding: '6px 26px 10px', borderRadius: 16}}>– 25 000 €</div>
      </Enter>
    </div>
  );
};

/** 27,9 – 34,8 s : les cotisations AT/MP explosent (jauge). */
export const Cotisations: React.FC = () => {
  const t = useT();
  const g = useSpring(28.0, {damping: 14});
  const rate = kf(t, [32.3, 33.3], [1.87, 4.0], easeOut);
  const ang = interpolate(rate, [0, 5], [-90, 90]);
  const out = prog(t, 34.5, 34.85, easeIn);
  const R = 300;
  const arc = (a0: number, a1: number) => {
    const p = (a: number) => [540 + R * Math.cos(((a - 90) * Math.PI) / 180), 1150 + R * Math.sin(((a - 90) * Math.PI) / 180)];
    const [x0, y0] = p(a0);
    const [x1, y1] = p(a1);
    return `M ${x0} ${y0} A ${R} ${R} 0 0 1 ${x1} ${y1}`;
  };
  return (
    <div style={{position: 'absolute', inset: 0, opacity: (1 - out) * Math.min(1, g * 1.5)}}>
      <Kinetic text="L'*hémorragie* continue" at={27.95} until={30.4} y={420} size={86} accent={RED} />
      <Kinetic text="Cotisations *AT/MP*" at={30.5} until={34.6} y={420} size={86} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center', fontFamily: sansFont, fontWeight: 600, fontSize: 32, color: '#5B6675'}}>calculées sur la masse salariale</div>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, transform: `scale(${0.7 + 0.3 * g})`, transformOrigin: '540px 1150px'}}>
        <path d={arc(-90, 0)} fill="none" stroke={colors.green} strokeWidth={46} />
        <path d={arc(0, 40)} fill="none" stroke={colors.ochre} strokeWidth={46} />
        <path d={arc(40, 90)} fill="none" stroke={RED} strokeWidth={46} />
        <g transform={`rotate(${ang} 540 1150)`}>
          <path d="M 528 1150 L 540 870 L 552 1150 Z" fill={colors.ink} />
        </g>
        <circle cx={540} cy={1150} r={34} fill={colors.ink} />
      </svg>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1210, textAlign: 'center', fontFamily: sansFont}}>
        <div style={{fontWeight: 900, fontSize: 150, color: rate > 3 ? RED : colors.navy, letterSpacing: -4, lineHeight: 1}}>{rate.toFixed(2).replace('.', ',')} %</div>
        <div style={{fontWeight: 700, fontSize: 30, color: '#5B6675', marginTop: 8}}>{rate > 3 ? 'Après accident' : 'Taux initial'}</div>
      </div>
      <Enter at={32.8} until={34.6} x={540} y={1520} bouncy>
        <Chip label="Hausse durable des coûts" color={RED} icon="↑" />
      </Enter>
    </div>
  );
};
