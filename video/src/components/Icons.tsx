import {colors, sansFont} from '../theme';

const O = colors.ink;

export const Warning: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 100 92">
    <path d="M50 6 L95 86 H5 Z" fill="#F3C64E" stroke={colors.ochre} strokeWidth="6" strokeLinejoin="round" />
    <rect x="45" y="32" width="10" height="30" rx="4" fill={O} />
    <circle cx="50" cy="73" r="5.5" fill={O} />
  </svg>
);

/** Coche verte qui se trace selon progress (0 → 1). */
export const Check: React.FC<{size: number; progress?: number; color?: string; width?: number}> = ({
  size,
  progress = 1,
  color = colors.greenLight,
  width = 16,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path
      d="M14 54 L40 78 L88 20"
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - progress}
    />
  </svg>
);

/** Étiquette d'opération ; `filled` (0 → 1) la fait passer au vert. */
export const Tag: React.FC<{label: string; filled?: number; width?: number}> = ({label, filled = 0, width = 250}) => (
  <div
    style={{
      width,
      height: 104,
      borderRadius: 12,
      border: `5px solid ${O}`,
      background: `color-mix(in srgb, ${colors.green} ${filled * 100}%, #fff)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: sansFont,
      fontWeight: 500,
      fontSize: 38,
      color: filled > 0.5 ? '#fff' : O,
      boxShadow: '0 4px 0 rgba(0,0,0,0.12)',
    }}
  >
    {label}
  </div>
);

/** Cadenas ocre ; `open` (0 → 1) soulève l'anse. */
export const Padlock: React.FC<{size: number; open?: number}> = ({size, open = 0}) => (
  <svg width={size} height={size * 1.15} viewBox="0 0 100 115" overflow="visible">
    <g transform={`translate(${open * 14} ${-open * 16})`}>
      <path d="M26 54 V34 Q26 10 50 10 Q74 10 74 34 V54" fill="none" stroke={O} strokeWidth="10" />
    </g>
    <rect x="12" y="50" width="76" height="60" rx="8" fill={colors.ochre} stroke={O} strokeWidth="5" />
    <rect x="12" y="50" width="76" height="12" rx="4" fill="rgba(255,255,255,0.18)" />
  </svg>
);

export const Permit: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size * 1.3} viewBox="0 0 100 130">
    <path d="M10 6 H70 L90 26 V124 H10 Z" fill="#fff" stroke={O} strokeWidth="5" strokeLinejoin="round" />
    <path d="M70 6 V26 H90" fill="#E9E6DD" stroke={O} strokeWidth="5" strokeLinejoin="round" />
    <g stroke="#9AA3AE" strokeWidth="5" strokeLinecap="round">
      <path d="M24 34 H58" />
      <path d="M24 50 H76" />
      <path d="M24 64 H76" />
      <path d="M24 78 H62" />
    </g>
  </svg>
);

/** Tampon de validation (étoile verte + coche). */
export const Stamp: React.FC<{size: number}> = ({size}) => {
  const pts = Array.from({length: 24}, (_, i) => {
    const r = i % 2 ? 40 : 48;
    const a = (i / 24) * Math.PI * 2;
    return `${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`;
  }).join(' ');
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <polygon points={pts} fill={colors.green} stroke={O} strokeWidth="4" strokeLinejoin="round" />
      <path d="M30 52 L44 66 L72 36" fill="none" stroke="#fff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/** Gyrophare d'urgence ; `glow` (0 → 1) pour le clignotement. */
export const Beacon: React.FC<{size: number; glow?: number}> = ({size, glow = 0}) => (
  <svg width={size} height={size} viewBox="0 0 120 120" overflow="visible">
    <g stroke={colors.ochre} strokeWidth="6" strokeLinecap="round" opacity={glow}>
      <path d="M60 4 V18" />
      <path d="M18 22 L28 32" />
      <path d="M102 22 L92 32" />
      <path d="M2 64 H16" />
      <path d="M118 64 H104" />
    </g>
    <path d="M24 84 Q24 34 60 34 Q96 34 96 84 Z" fill={`color-mix(in srgb, #F6CF5B ${glow * 100}%, ${colors.ochre})`} stroke={O} strokeWidth="5" />
    <path d="M44 54 Q50 44 60 42" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="6" strokeLinecap="round" />
    <rect x="14" y="82" width="92" height="20" rx="4" fill={O} />
  </svg>
);

export const Bin: React.FC<{size: number; color: string}> = ({size, color}) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 70 98">
    <rect x="4" y="6" width="62" height="12" rx="3" fill={color} stroke={O} strokeWidth="4" />
    <path d="M9 18 H61 L57 94 H13 Z" fill={color} stroke={O} strokeWidth="4" strokeLinejoin="round" />
    <g stroke="rgba(0,0,0,0.25)" strokeWidth="4" strokeLinecap="round">
      <path d="M25 32 V80" />
      <path d="M45 32 V80" />
    </g>
  </svg>
);

/** Histogramme qui pousse + courbe de tendance. */
export const BarChart: React.FC<{grow: number; trend: number; axes: number}> = ({grow, trend, axes}) => {
  const bars = [0.45, 0.8, 0.6, 1];
  return (
    <svg width={520} height={420} viewBox="0 0 520 420" overflow="visible">
      <g stroke={O} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={axes}>
        <path d="M30 390 H500" />
        <path d="M486 378 L502 390 L486 402" />
      </g>
      {bars.map((h, i) => {
        const p = Math.max(0, Math.min(1, grow * 4 - i));
        const bh = 300 * h * p;
        return <rect key={i} x={50 + i * 72} y={388 - bh} width={50} height={bh} fill={colors.green} stroke={O} strokeWidth="4" />;
      })}
      <path
        d="M60 300 Q160 250 230 200 T 360 120 T 500 40"
        fill="none"
        stroke={colors.ochre}
        strokeWidth="7"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - trend}
      />
    </svg>
  );
};

export const Eye: React.FC<{size: number; blink?: number}> = ({size, blink = 0}) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 120 84">
    <path d="M6 42 Q60 -10 114 42 Q60 94 6 42 Z" fill="#FFF6DC" stroke={colors.ochre} strokeWidth="7" strokeLinejoin="round" />
    <g transform={`translate(60 42) scale(1 ${1 - blink * 0.9})`}>
      <circle r="18" fill={colors.ochre} />
      <circle r="8" fill={O} />
      <circle cx="-6" cy="-6" r="4" fill="#fff" />
    </g>
  </svg>
);

export const Bell: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M50 10 Q24 14 24 46 V64 L14 76 H86 L76 64 V46 Q76 14 50 10 Z" fill="#F3C64E" stroke={colors.ochre} strokeWidth="6" strokeLinejoin="round" />
    <circle cx="50" cy="84" r="8" fill={colors.ochre} />
  </svg>
);

export const Clipboard: React.FC<{size: number; check: number}> = ({size, check}) => (
  <svg width={size} height={size * 1.3} viewBox="0 0 100 130">
    <rect x="10" y="14" width="80" height="110" rx="10" fill="#fff" stroke={O} strokeWidth="5" />
    <rect x="32" y="6" width="36" height="18" rx="5" fill={colors.grey} stroke={O} strokeWidth="4" />
    <path
      d="M28 72 L44 88 L74 52"
      fill="none"
      stroke={colors.green}
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - check}
    />
  </svg>
);

export const Manual: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size * 1.25} viewBox="0 0 100 125">
    <rect x="8" y="6" width="84" height="114" rx="8" fill="#1B2638" stroke={O} strokeWidth="4" />
    <rect x="8" y="6" width="14" height="114" rx="4" fill="#111827" />
    <path d="M57 42 V82 M37 62 H77" stroke="#E2B04A" strokeWidth="7" strokeLinecap="round" />
  </svg>
);

export const ShieldOutline: React.FC<{size: number; progress: number}> = ({size, progress}) => (
  <svg width={size} height={size * 1.15} viewBox="0 0 200 230" overflow="visible">
    <path
      d="M100 8 L186 40 V110 Q186 186 100 222 Q14 186 14 110 V40 Z"
      fill={`rgba(124,197,118,${0.35 * progress})`}
      stroke={colors.green}
      strokeWidth="8"
      strokeLinejoin="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - progress}
    />
  </svg>
);

export const Desk: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 120 120">
    <rect x="30" y="18" width="60" height="42" rx="5" fill="#DDE6F0" stroke={O} strokeWidth="5" />
    <rect x="54" y="60" width="12" height="12" fill={O} />
    <rect x="10" y="72" width="100" height="10" rx="3" fill={colors.ochre} stroke={O} strokeWidth="5" />
    <path d="M18 82 V112 M102 82 V112" stroke={O} strokeWidth="6" strokeLinecap="round" />
    <path d="M40 30 H70 M40 40 H80 M40 50 H62" stroke="#9AA3AE" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

/** Croix rouge qui se dessine (progress 0 → 1). */
export const Cross: React.FC<{size: number; progress: number; color?: string}> = ({size, progress, color = '#D9443A'}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    {[
      ['M14 14 L86 86', Math.min(1, progress * 2)],
      ['M86 14 L14 86', Math.max(0, progress * 2 - 1)],
    ].map(([d, p], i) => (
      <path key={i} d={d as string} stroke={color} strokeWidth="14" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - (p as number)} />
    ))}
  </svg>
);

export const Pin: React.FC<{size: number; color?: string}> = ({size, color = colors.green}) => (
  <svg width={size} height={size * 1.3} viewBox="0 0 80 104">
    <ellipse cx="40" cy="98" rx="16" ry="5" fill="rgba(0,0,0,0.15)" />
    <path d="M40 96 C 22 70, 8 56, 8 38 A 32 32 0 0 1 72 38 C 72 56, 58 70, 40 96 Z" fill={color} stroke={O} strokeWidth="5" strokeLinejoin="round" />
    <circle cx="40" cy="38" r="12" fill="#fff" stroke={O} strokeWidth="4" />
  </svg>
);

export const Crosshair: React.FC<{size: number; color?: string}> = ({size, color = '#D9443A'}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="38" fill="none" stroke={color} strokeWidth="6" />
    <circle cx="50" cy="50" r="6" fill={color} />
    <path d="M50 2 V24 M50 76 V98 M2 50 H24 M76 50 H98" stroke={color} strokeWidth="6" strokeLinecap="round" />
  </svg>
);

export const Magnifier: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="40" cy="40" r="28" fill="rgba(191,227,242,0.55)" stroke={O} strokeWidth="7" />
    <path d="M28 30 Q34 22 44 22" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" />
    <path d="M61 61 L88 88" stroke={O} strokeWidth="12" strokeLinecap="round" />
  </svg>
);

export const CheckCircle: React.FC<{size: number; progress?: number}> = ({size, progress = 1}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="44" fill={colors.green} stroke={O} strokeWidth="5" />
    <path d="M28 52 L44 68 L74 36" fill="none" stroke="#fff" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - progress} />
  </svg>
);

export const Gear: React.FC<{size: number; rotate?: number; color?: string}> = ({size, rotate = 0, color = colors.navy}) => {
  const teeth = Array.from({length: 8}, (_, i) => i * 45);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <g transform={`rotate(${rotate} 50 50)`}>
        {teeth.map((a) => (
          <rect key={a} x="43" y="4" width="14" height="20" rx="3" fill={color} transform={`rotate(${a} 50 50)`} />
        ))}
        <circle cx="50" cy="50" r="32" fill={color} />
        <circle cx="50" cy="50" r="13" fill="#fff" />
      </g>
    </svg>
  );
};

export const Building: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect x="18" y="20" width="44" height="74" rx="3" fill="#DDE6F0" stroke={O} strokeWidth="5" />
    <rect x="62" y="44" width="24" height="50" rx="3" fill={colors.navy} stroke={O} strokeWidth="5" />
    {[30, 46, 62].map((y) => (
      <g key={y} fill={colors.navy}>
        <rect x="27" y={y} width="9" height="9" />
        <rect x="44" y={y} width="9" height="9" />
      </g>
    ))}
    <path d="M60 18 L84 6 M84 6 L74 4 M84 6 L80 15" stroke={colors.green} strokeWidth="5" strokeLinecap="round" />
  </svg>
);

export const House: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M10 50 L50 14 L90 50" fill="none" stroke={O} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 44 V90 H78 V44 L50 20 Z" fill="#FFF6DC" stroke={O} strokeWidth="5" strokeLinejoin="round" />
    <rect x="42" y="60" width="16" height="30" fill={colors.green} stroke={O} strokeWidth="4" />
    <path d="M50 46 C 44 38, 34 44, 40 52 L50 60 L60 52 C 66 44, 56 38, 50 46 Z" fill="#E2574C" />
  </svg>
);

export const QuestionBubble: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M50 8 A 40 38 0 1 1 26 80 L10 92 L16 72 A 40 38 0 0 1 50 8 Z" fill={colors.navy} />
    <text x="50" y="66" textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight="900" fontSize="54" fill="#fff">
      ?
    </text>
  </svg>
);

export const ShieldCheck: React.FC<{size: number; check?: number}> = ({size, check = 1}) => (
  <svg width={size} height={size * 1.15} viewBox="0 0 100 115">
    <path d="M50 4 L92 20 V56 Q92 92 50 110 Q8 92 8 56 V20 Z" fill={colors.green} stroke={O} strokeWidth="5" strokeLinejoin="round" />
    <path d="M30 58 L45 72 L72 42" fill="none" stroke="#fff" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - check} />
  </svg>
);

/** Bandeau chantier jaune/noir défilant avec texte. */
export const HazardBar: React.FC<{width: number; label: string; offset: number}> = ({width, label, offset}) => (
  <div style={{width, position: 'relative', boxShadow: '0 10px 24px rgba(0,0,0,0.2)', transform: 'rotate(-3deg)'}}>
    <div
      style={{
        height: 26,
        backgroundImage: `repeating-linear-gradient(-45deg, #F3C64E 0 26px, ${O} 26px 52px)`,
        backgroundPosition: `${offset}px 0`,
      }}
    />
    <div
      style={{
        background: '#F3C64E',
        padding: '14px 0 16px',
        textAlign: 'center',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 900,
        fontSize: 64,
        letterSpacing: -1,
        color: O,
      }}
    >
      {label}
    </div>
    <div
      style={{
        height: 26,
        backgroundImage: `repeating-linear-gradient(-45deg, #F3C64E 0 26px, ${O} 26px 52px)`,
        backgroundPosition: `${-offset}px 0`,
      }}
    />
  </div>
);

/** Carte de compétence : pictogramme + libellé. */
export const SkillCard: React.FC<{icon: React.ReactNode; title: string; sub: string}> = ({icon, title, sub}) => (
  <div
    style={{
      width: 470,
      height: 170,
      borderRadius: 26,
      background: '#fff',
      boxShadow: '0 14px 30px rgba(30,25,10,0.16)',
      display: 'flex',
      alignItems: 'center',
      gap: 22,
      padding: '0 26px',
      borderLeft: `14px solid ${colors.green}`,
    }}
  >
    <div style={{width: 110, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{icon}</div>
    <div style={{fontFamily: 'Montserrat, sans-serif', color: O}}>
      <div style={{fontWeight: 900, fontSize: 40, lineHeight: 1.05, textTransform: 'uppercase'}}>{title}</div>
      <div style={{fontWeight: 600, fontSize: 26, color: '#5B6675', marginTop: 6}}>{sub}</div>
    </div>
  </div>
);

export const Recycle: React.FC<{size: number; rotate: number}> = ({size, rotate}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <g transform={`rotate(${rotate} 50 50)`} fill="none" stroke={colors.green} strokeWidth="9" strokeLinecap="round">
      {[0, 120, 240].map((a) => (
        <g key={a} transform={`rotate(${a} 50 50)`}>
          <path d="M30 26 A 30 30 0 0 1 70 26" />
          <path d="M62 16 L72 27 L58 32" strokeLinejoin="round" />
        </g>
      ))}
    </g>
  </svg>
);
