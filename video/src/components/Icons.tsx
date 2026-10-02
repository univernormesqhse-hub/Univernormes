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
