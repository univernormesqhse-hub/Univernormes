import {colors} from '../theme';

/** Globe stylisé du logo (méridiens + anneau orbital vert). */
export const Globe: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size * 0.78} viewBox="0 0 140 110">
    <defs>
      <clipPath id="globe-clip">
        <circle cx="66" cy="52" r="40" />
      </clipPath>
    </defs>
    <circle cx="66" cy="52" r="40" fill="#fff" stroke={colors.navy} strokeWidth="5" />
    <g clipPath="url(#globe-clip)" stroke={colors.navy} strokeWidth="4.5" fill="none">
      <ellipse cx="66" cy="52" rx="16" ry="40" />
      <ellipse cx="66" cy="52" rx="32" ry="40" />
      <line x1="66" y1="10" x2="66" y2="94" />
      <line x1="20" y1="38" x2="112" y2="38" />
      <line x1="20" y1="66" x2="112" y2="66" />
      <line x1="20" y1="52" x2="112" y2="52" />
    </g>
    <ellipse cx="68" cy="62" rx="64" ry="19" fill="none" stroke={colors.navy} strokeWidth="6" transform="rotate(-18 68 62)" />
    <path d="M110 18 C 128 22, 136 34, 128 46" fill="none" stroke={colors.green} strokeWidth="6" strokeLinecap="round" />
  </svg>
);

export const WhatsAppIcon: React.FC<{size: number; color?: string}> = ({size, color = '#fff'}) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <path
      d="M24 4C13 4 4 12.8 4 23.6c0 3.7 1 7.1 2.9 10.1L4 44l10.7-2.8c2.8 1.5 6 2.4 9.3 2.4 11 0 20-8.8 20-19.6S35 4 24 4z"
      fill="none"
      stroke={color}
      strokeWidth="3.4"
      strokeLinejoin="round"
    />
    <path
      d="M17.5 14.5c-.6 0-1.6.2-2.3 1.1-.8.9-2.3 2.3-2.3 5.6s2.4 6.5 2.7 7c.3.4 4.6 7.3 11.4 9.9 5.6 2.2 6.8 1.8 8 1.7 1.2-.1 4-1.6 4.5-3.2.6-1.6.6-2.9.4-3.2-.2-.3-.6-.4-1.3-.8l-4.3-2.1c-.6-.2-1-.3-1.4.3-.4.6-1.7 2.1-2 2.5-.4.4-.7.5-1.4.2-.6-.3-2.7-1-5.2-3.2-1.9-1.7-3.2-3.8-3.5-4.4-.4-.6 0-1 .3-1.3l1-1.1c.3-.4.4-.6.6-1.1.2-.4.1-.8 0-1.1l-1.9-4.6c-.5-1.2-1-1.1-1.4-1.1z"
      fill={color}
    />
  </svg>
);
