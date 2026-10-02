import {colors} from '../theme';

// Personnages en style cartoon plat. Repère commun : viewBox 290×345,
// corps centré sur x=120, pieds en bas.
const O = colors.ink; // contour
const SW = 3.5;
const PANTS = '#1E3A6B';
const SHIRT = '#22457E';
const VEST = '#3FB34F';
const VEST_DARK = '#2E8F3C';
const BAND = '#C9CFD6';
const BOOT = '#2B2F36';

export type Pose = 'front' | 'point';

const Legs: React.FC<{pants?: string}> = ({pants = PANTS}) => (
  <g stroke={O} strokeWidth={SW} strokeLinejoin="round">
    <path d="M84 232 H118 L116 322 H86 Z" fill={pants} />
    <path d="M122 232 H156 L154 322 H124 Z" fill={pants} />
    <path d="M80 320 H118 V336 Q118 341 112 341 H78 Q74 341 75 335 Z" fill={BOOT} />
    <path d="M122 320 H160 L165 335 Q166 341 162 341 H128 Q122 341 122 336 Z" fill={BOOT} />
  </g>
);

const Torso: React.FC<{shirt?: string}> = ({shirt = SHIRT}) => (
  <path
    d="M76 124 Q120 112 164 124 Q172 128 170 140 L162 242 H78 L70 140 Q68 128 76 124 Z"
    fill={shirt}
    stroke={O}
    strokeWidth={SW}
    strokeLinejoin="round"
  />
);

const Vest: React.FC = () => (
  <g stroke={O} strokeWidth={SW} strokeLinejoin="round">
    <path d="M78 126 L108 120 L116 168 L116 242 H80 L72 140 Z" fill={VEST} />
    <path d="M162 126 L132 120 L124 168 L124 242 H160 L168 140 Z" fill={VEST} />
    <g fill={BAND} strokeWidth={2.5}>
      <rect x="76" y="190" width="40" height="11" />
      <rect x="124" y="190" width="40" height="11" />
      <rect x="78" y="214" width="38" height="11" />
      <rect x="124" y="214" width="38" height="11" />
      <path d="M90 124 L99 122 L101 190 H92 Z" />
      <path d="M150 124 L141 122 L139 190 H148 Z" />
    </g>
    <path d="M116 168 L116 242" stroke={VEST_DARK} strokeWidth={2} />
  </g>
);

const Head: React.FC<{helmet?: string | null; glasses?: boolean; stern?: boolean; hair?: string}> = ({
  helmet,
  glasses,
  stern = true,
  hair = '#3A2A20',
}) => (
  <g stroke={O} strokeWidth={SW} strokeLinejoin="round" strokeLinecap="round">
    <rect x="108" y="100" width="24" height="26" fill={colors.skin} />
    <circle cx="86" cy="84" r="8" fill={colors.skin} />
    <circle cx="154" cy="84" r="8" fill={colors.skin} />
    <ellipse cx="120" cy="80" rx="33" ry="36" fill={colors.skin} />
    {helmet ? (
      <path d="M88 70 Q86 58 92 54 L148 54 Q154 58 152 70 Q140 64 120 64 Q100 64 88 70 Z" fill={hair} />
    ) : (
      <path
        d="M86 76 Q82 44 112 40 Q140 36 152 56 Q156 66 154 78 Q148 62 132 58 Q112 62 92 60 Q88 66 86 76 Z"
        fill={hair}
      />
    )}
    {/* sourcils, yeux, nez, bouche */}
    {stern ? (
      <>
        <path d="M99 73 L114 77" strokeWidth={4.5} />
        <path d="M141 73 L126 77" strokeWidth={4.5} />
      </>
    ) : (
      <>
        <path d="M100 72 Q107 69 113 72" strokeWidth={4} fill="none" />
        <path d="M127 72 Q133 69 140 72" strokeWidth={4} fill="none" />
      </>
    )}
    <ellipse cx="108" cy="85" rx="3.6" ry="4.2" fill={O} stroke="none" />
    <ellipse cx="132" cy="85" rx="3.6" ry="4.2" fill={O} stroke="none" />
    <path d="M120 88 L117 98 H122" fill="none" strokeWidth={2.5} />
    <path d={stern ? 'M111 106 Q120 104 129 106' : 'M110 104 Q120 112 130 104'} fill="none" strokeWidth={3} />
    {glasses && (
      <g fill="rgba(255,255,255,0.25)" strokeWidth={3}>
        <rect x="96" y="76" width="22" height="18" rx="5" />
        <rect x="122" y="76" width="22" height="18" rx="5" />
        <path d="M118 84 H122" />
      </g>
    )}
    {helmet && (
      <>
        <path d="M86 64 Q86 26 120 24 Q154 26 154 64 Z" fill={helmet} />
        <path d="M113 25 Q120 23 127 25 L128 62 H112 Z" fill="rgba(255,255,255,0.28)" strokeWidth={2.5} />
        <rect x="78" y="60" width="84" height="11" rx="5" fill={helmet} />
      </>
    )}
  </g>
);

const Hand: React.FC<{x: number; y: number}> = ({x, y}) => (
  <circle cx={x} cy={y} r="11" fill={colors.skin} stroke={O} strokeWidth={SW} />
);

/** Superviseur HSE : casque vert, gilet haute visibilité. */
export const Superviseur: React.FC<{pose?: Pose; helmet?: string; size?: number}> = ({
  pose = 'front',
  helmet = '#3E9E46',
  size = 290,
}) => (
  <svg width={size} height={(size * 345) / 290} viewBox="0 0 290 345" overflow="visible">
    <Legs />
    {/* bras gauche (côté spectateur) le long du corps */}
    <g stroke={O} strokeWidth={SW} strokeLinejoin="round">
      <path d="M74 128 Q60 132 58 150 L52 226 H74 L84 150 Z" fill={SHIRT} />
    </g>
    <Hand x={62} y={232} />
    <Torso />
    <Vest />
    {pose === 'front' ? (
      <>
        <g stroke={O} strokeWidth={SW} strokeLinejoin="round">
          <path d="M166 128 Q180 132 182 150 L188 226 H166 L156 150 Z" fill={SHIRT} />
        </g>
        <Hand x={178} y={232} />
      </>
    ) : (
      <g stroke={O} strokeWidth={SW} strokeLinejoin="round" strokeLinecap="round">
        <path d="M160 126 Q172 120 184 122 L240 116 L242 140 L186 148 Q166 150 156 146 Z" fill={SHIRT} />
        <path d="M240 114 Q254 112 258 120 L282 120 Q288 122 282 127 L258 128 Q256 140 244 141 Q236 140 238 128 Z" fill={colors.skin} />
        <path d="M246 130 Q252 132 256 129" fill="none" strokeWidth={2.5} />
      </g>
    )}
    <Head helmet={helmet} stern={pose === 'point'} />
  </svg>
);

/** Responsable HSE : sans casque, lunettes, tablette en main. */
export const Responsable: React.FC<{size?: number}> = ({size = 290}) => (
  <svg width={size} height={(size * 345) / 290} viewBox="0 0 290 345" overflow="visible">
    <Legs pants="#5A4A3E" />
    <Torso shirt="#F4F4F2" />
    <path d="M110 120 L120 136 L130 120" fill="none" stroke={O} strokeWidth={3} />
    <path d="M117 134 L123 134 L126 178 L120 186 L114 178 Z" fill={colors.navy} stroke={O} strokeWidth={2.5} />
    <Vest />
    <g stroke={O} strokeWidth={SW} strokeLinejoin="round">
      {/* avant-bras repliés vers la tablette */}
      <path d="M74 128 Q60 132 60 150 L66 196 Q70 206 84 200 L112 186 L104 172 L84 178 L86 150 Z" fill="#F4F4F2" />
      <path d="M166 128 Q180 132 180 150 L178 192 Q176 204 162 200 L140 192 L146 176 L158 180 L156 150 Z" fill="#F4F4F2" />
      <g transform="rotate(-14 130 180)">
        <rect x="96" y="150" width="70" height="54" rx="6" fill="#3B4250" />
        <rect x="102" y="156" width="58" height="42" rx="3" fill="#BFE3F2" stroke="none" />
        <path d="M108 190 L120 180 L132 186 L150 166" fill="none" stroke={colors.green} strokeWidth={3} />
      </g>
    </g>
    <Hand x={108} y={186} />
    <Hand x={146} y={190} />
    <Head helmet={null} glasses stern={false} hair="#5B4030" />
  </svg>
);
