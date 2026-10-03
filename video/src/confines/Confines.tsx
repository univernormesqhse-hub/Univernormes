import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, Gate, Kinetic, prog, useSpring, useT} from '../anim';
import {PhotoCard, RED, Strike, Verdict} from '../charte/ui';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {AlertVignette, Camera, Cue, SfxTrack, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {F, Pill} from '../iso/ui';
import {Outro} from '../scenes/Outro';
import {colors, handFont, s, sansFont} from '../theme';
import {captions} from './captions';

const LOGO = 'promo/logo.png';
const OUTRO_AT = 64.2;
export const CONFINES_FRAMES = s(67.2);
const fade = (t: number, a: number, b: number) => (1 - prog(t, b - 0.3, b, easeIn)) * (t >= a ? 1 : 0);

// Géométrie de la cuve (coupe).
const TL = 160;
const TR = 920;
const TT = 820;
const TB = 1480;
const HOLE = [470, 610];
const GAS_H = 290;

/** Personnage simple, placé par les pieds (x, y) ; rot = bascule autour des pieds. */
const Person: React.FC<{x: number; y: number; rot?: number; suit?: string; o?: number}> = ({x, y, rot = 0, suit = '#F07A2A', o = 1}) => (
  <svg width={160} height={260} viewBox="-80 -250 160 260" style={{position: 'absolute', left: x - 80, top: y - 250, transform: `rotate(${rot}deg)`, transformOrigin: '80px 250px', overflow: 'visible', opacity: o}}>
    <circle cx={0} cy={-212} r={22} fill="#C68A5B" />
    <path d="M-26 -218 A26 26 0 0 1 26 -218 L31 -214 L-31 -214 Z" fill="#F2C230" stroke={colors.ink} strokeWidth={3} />
    <rect x={-30} y={-186} width={60} height={96} rx={16} fill={suit} stroke={colors.ink} strokeWidth={3} />
    <rect x={-30} y={-146} width={60} height={9} fill="#E6E6E6" />
    <path d="M-28 -176 L-48 -118 M28 -176 L48 -118" stroke={suit} strokeWidth={16} strokeLinecap="round" />
    <path d="M-12 -92 L-16 -6 M12 -92 L16 -6" stroke="#2F3D57" strokeWidth={20} strokeLinecap="round" />
    <rect x={-30} y={-12} width={26} height={12} rx={5} fill={colors.ink} />
    <rect x={4} y={-12} width={26} height={12} rx={5} fill={colors.ink} />
  </svg>
);

/** Coupe de la cuve avec couche de gaz (g : 0 → 1) et échelle. */
const Tank: React.FC<{g: number; label?: boolean; tint?: string}> = ({g, label, tint = '#C8402F'}) => {
  const f = useCurrentFrame();
  const top = TB - GAS_H * g;
  const wave = Array.from({length: 21}, (_, i) => {
    const x = TL + 8 + (i / 20) * (TR - TL - 16);
    return `${i === 0 ? 'M' : 'L'}${x} ${top + Math.sin(i * 0.9 + f / 9) * 6 * g}`;
  }).join(' ');
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      {g > 0 && <path d={`${wave} L${TR - 8} ${TB - 6} L${TL + 8} ${TB - 6} Z`} fill={tint} opacity={0.32} />}
      {/* parois */}
      <path d={`M${HOLE[0]} ${TT} H${TL} V${TB} H${TR} V${TT} H${HOLE[1]}`} stroke={colors.ink} strokeWidth={14} fill="rgba(255,255,255,0.35)" strokeLinejoin="round" />
      <path d={`M${HOLE[0]} ${TT} V${TT - 40} M${HOLE[1]} ${TT} V${TT - 40}`} stroke={colors.ink} strokeWidth={14} strokeLinecap="round" />
      {/* échelle */}
      {[0, 1].map((k) => <line key={k} x1={HOLE[0] + 20 + k * 60} y1={TT - 30} x2={HOLE[0] + 20 + k * 60} y2={TB - 10} stroke="#8A94A3" strokeWidth={6} />)}
      {Array.from({length: 9}, (_, i) => <line key={i} x1={HOLE[0] + 20} y1={TT + i * 72} x2={HOLE[0] + 80} y2={TT + i * 72} stroke="#8A94A3" strokeWidth={5} />)}
      {label && <text x={(TL + TR) / 2 + 150} y={TT + 70} textAnchor="middle" fontFamily="Montserrat" fontWeight={800} fontSize={34} fill={colors.navy}>CUVE DE STOCKAGE</text>}
    </svg>
  );
};

/** Molécules de gaz qui flottent dans la couche. */
const Molecules: React.FC<{g: number; n?: number}> = ({g, n = 14}) => {
  const f = useCurrentFrame();
  if (g <= 0) return null;
  return (
    <>
      {Array.from({length: n}, (_, i) => {
        const x = TL + 40 + ((i * 97) % (TR - TL - 80));
        const y = TB - 30 - ((i * 53) % Math.max(10, GAS_H * g - 40)) + Math.sin(f / 14 + i) * 8;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: 18, height: 18, borderRadius: 9, background: RED, opacity: 0.55 * g}} />;
      })}
    </>
  );
};

/** 0 – 10 s : l'air inoffensif, le piège, l'air emprisonné. */
const Hook: React.FC = () => {
  const t = useT();
  const close = prog(t, 5.6, 6.8, easeInOut);
  const strike = prog(t, 7.0, 7.6, easeOut);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - prog(t, 9.7, 10.0, easeIn)}}>
      <Kinetic text="Un espace *confiné*" at={0.05} until={3.25} y={420} size={88} />
      <Kinetic text="Son plus grand *piège*" at={3.3} until={5.45} y={420} size={86} accent={RED} />
      <Kinetic text="Pas les *murs*…" at={5.5} until={7.8} y={420} size={96} />
      <Kinetic text="… mais *l'air*" at={7.85} until={9.9} y={420} size={110} accent={RED} />

      {t < 3.3 && (
        <>
          <PhotoCard src="confines/regard.jpg" at={0.1} until={3.25} x={540} y={980} w={940} h={700} pos="45% 40%" label="Regard, cuve, égout…" icon="usine" />
          <Enter at={1.3} until={3.25} x={540} y={1440} bouncy><Pill label="L'air semble inoffensif" icon="check" size={38} /></Enter>
        </>
      )}
      {t >= 3.3 && t < 5.5 && (
        <>
          <Enter at={3.35} until={5.45} x={540} y={1000} bouncy><F n="danger" size={320} /></Enter>
          <Enter at={4.3} until={5.45} x={540} y={1360} bouncy><Pill label="Le piège" icon="cadenas" color={RED} size={42} /></Enter>
        </>
      )}
      {t >= 5.5 && t < 7.85 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 5.5, 7.85)}}>
          <div style={{position: 'absolute', left: interpolate(close, [0, 1], [120, 300]), top: 700, width: 70, height: 640, background: '#8A94A3', borderRadius: 12}} />
          <div style={{position: 'absolute', left: interpolate(close, [0, 1], [890, 710]), top: 700, width: 70, height: 640, background: '#8A94A3', borderRadius: 12}} />
          <div style={{position: 'absolute', left: 540, top: 1020, transform: 'translate(-50%, -50%)'}}>
            <div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: colors.navy, whiteSpace: 'nowrap'}}>
              L'étroitesse
              <Strike p={strike} w={340} />
            </div>
          </div>
        </div>
      )}
      {t >= 7.85 && (
        <>
          <Enter at={7.9} x={540} y={1020} bouncy>
            <div style={{position: 'relative', width: 520, height: 520, borderRadius: 60, border: `14px solid ${colors.ink}`, background: 'rgba(200,64,47,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <F n="brouillard" size={300} float={8} />
            </div>
          </Enter>
          <Enter at={8.7} x={540} y={1420} bouncy><Pill label="L'air emprisonné" icon="danger" color={RED} size={40} /></Enter>
        </>
      )}
    </div>
  );
};

/** 10 – 44,7 s : la cuve, le gaz invisible, la chute, le sauveteur, les décès multiples. */
const Drame: React.FC = () => {
  const t = useT();
  const g = prog(t, 13.7, 15.9, easeInOut);
  const gasTop = TB - GAS_H;
  // technicien
  const d1 = prog(t, 20.7, 23.4, easeInOut);
  const d2 = prog(t, 24.5, 26.4, easeInOut);
  const c1 = prog(t, 27.1, 27.9, easeIn);
  const tx = interpolate(d1, [0, 0.25, 1], [380, 500, 500]);
  const ty = interpolate(d1, [0, 0.25, 1], [TT - 40, TT, gasTop - 50]) + d2 * 90 + c1 * (TB - 44 - (gasTop + 40));
  // équipier
  const r0 = prog(t, 31.2, 31.8);
  const r1 = prog(t, 34.4, 35.8, easeIn);
  const c2 = prog(t, 37.1, 37.9, easeIn);
  const rx = interpolate(r1, [0, 0.25, 1], [700, 560, 560]);
  const ry = interpolate(r1, [0, 0.25, 1], [TT - 40, TT, gasTop + 40]) + c2 * (TB - 44 - (gasTop + 40));
  const dead = t >= 40.6;
  const card = useSpring(40.7, {damping: 13});
  return (
    <div style={{position: 'absolute', inset: 0, opacity: prog(t, 10.0, 10.5) * (1 - prog(t, 44.4, 44.7, easeIn))}}>
      <Kinetic text="Une cuve de *stockage*" at={10.0} until={12.95} y={420} size={70} maxWidth={1000} />
      <Kinetic text="Des gaz *invisibles*" at={13.0} until={20.6} y={420} size={74} maxWidth={1000} accent={RED} />
      <Kinetic text="Il *descend*…" at={20.65} until={24.4} y={420} size={90} />
      <Kinetic text="… et s'*effondre*" at={24.45} until={28.9} y={420} size={86} accent={RED} />
      <Kinetic text="Le vrai *drame*" at={28.95} until={35.95} y={420} size={86} accent={RED} />
      <Kinetic text="Il *périt* à son tour" at={36.0} until={40.6} y={420} size={78} maxWidth={1000} accent={RED} />
      <Kinetic text="Le sauvetage *improvisé*" at={40.65} until={44.6} y={420} size={72} maxWidth={1000} accent={RED} />

      <Tank g={g} label={t < 13.0} />
      <Molecules g={g} />
      {/* l'oxygène chassé */}
      {t > 16.6 && t < 21 &&
        Array.from({length: 7}, (_, i) => {
          const p = prog(t, 16.7 + i * 0.25, 19.6 + i * 0.25, easeOut);
          return (
            <div key={i} style={{position: 'absolute', left: HOLE[0] + 20 + (i % 4) * 30 + Math.sin(p * 6 + i) * 30, top: interpolate(p, [0, 1], [gasTop - 20, TT - 300]), transform: 'translate(-50%, -50%)', opacity: (1 - p) * 0.95, fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: '#3F8FD0'}}>O₂</div>
          );
        })}

      {/* technicien */}
      {t >= 10.0 && <Person x={tx} y={ty} rot={c1 * -86} />}
      {/* équipier */}
      {t >= 31.2 && <Person x={rx} y={ry} rot={c2 * 86} suit="#2E6FC2" o={r0} />}

      {/* étiquettes */}
      <Enter at={11.6} until={13.0} x={760} y={TT - 120} bouncy><Pill label="Le technicien" icon="ouvrier" size={30} /></Enter>
      <Enter at={14.6} until={20.6} x={700} y={gasTop + 140} bouncy><Pill label="Gaz lourds & toxiques" icon="brouillard" color={RED} size={30} /></Enter>
      <Enter at={17.2} until={20.6} x={820} y={TT - 230} bouncy><Pill label="Oxygène chassé" icon="poumons" color={RED} size={28} /></Enter>
      <Enter at={18.6} until={20.6} x={760} y={TT + 110} bouncy><Pill label="Sans odeur, sans couleur" icon="yeux" size={28} /></Enter>
      <Enter at={22.7} until={24.4} x={770} y={TT + 110} bouncy><Pill label="Risque mécanique ?" icon="outils" size={30} /></Enter>
      <Enter at={25.3} until={28.9} x={790} y={TT + 110} bouncy><Pill label="1ʳᵉ inspiration" icon="poumons" color={RED} size={30} /></Enter>
      <Enter at={27.9} until={28.9} x={790} y={TT + 220} bouncy><div style={{fontFamily: handFont, fontSize: 60, color: RED}}>sans un cri…</div></Enter>
      <Enter at={32.5} until={35.95} x={800} y={TT - 140} bouncy><Pill label="Réflexe humain" icon="main-levee" size={30} /></Enter>
      <Enter at={36.0} until={40.6} x={800} y={TT + 110} bouncy><Pill label="Sans protection" icon="sens-interdit" color={RED} size={30} /></Enter>

      {dead && (
        <div style={{position: 'absolute', left: 540, top: 1030, transform: `translate(-50%, -50%) scale(${card})`}}>
          <div style={{width: 860, borderRadius: 30, background: colors.ink, padding: '28px 36px', textAlign: 'center', boxShadow: '0 24px 50px rgba(0,0,0,0.35)', fontFamily: sansFont}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18}}>
              <F n="crane" size={90} />
              <div style={{fontWeight: 900, fontSize: 64, color: '#FF6B5B'}}>DÉCÈS MULTIPLES</div>
            </div>
            <div style={{fontWeight: 700, fontSize: 34, color: '#fff', marginTop: 10, opacity: prog(t, 41.8, 42.2)}}>1ʳᵉ cause : le sauvetage improvisé</div>
          </div>
        </div>
      )}
    </div>
  );
};

const RULES = [
  {at: 48.86, n: 'telephone', l: 'Détecteur de gaz', s: "l'atmosphère analysée en continu", src: 'confines/detecteur.jpg', pos: '70% 50%'},
  {at: 52.24, n: 'vent', l: 'Ventilation forcée', s: "l'air renouvelé", src: 'confines/ventilation.jpg', pos: '50% 60%'},
  {at: 54.74, n: 'yeux', l: 'Surveillant extérieur', s: 'prêt à alerter des secours équipés', src: 'confines/tripode-formation.jpg', pos: '45% 50%'},
];

/** 44,7 – 57,6 s : le permis d'entrée et ses trois règles. */
const Permis: React.FC = () => {
  const t = useT();
  const cur = RULES.filter((r) => t >= r.at).length - 1;
  const stamp = useSpring(47.3, {damping: 9});
  return (
    <div style={{position: 'absolute', inset: 0, opacity: prog(t, 44.7, 45.0) * (1 - prog(t, 57.35, 57.65, easeIn))}}>
      <Kinetic text="Briser la *chaîne mortelle*" at={44.7} until={46.4} y={420} size={70} maxWidth={1000} />
      <Kinetic text="Le *permis d'entrée*" at={46.45} until={48.8} y={420} size={82} maxWidth={1000} />
      <Kinetic text="*3* règles strictes" at={48.85} until={57.6} y={420} size={90} />

      {t < 48.86 && (
        <>
          <Enter at={44.8} x={540} y={1000} bouncy>
            <div style={{position: 'relative', width: 560, borderRadius: 26, background: '#FFFDF7', boxShadow: '0 24px 50px rgba(30,25,10,0.22)', overflow: 'hidden', fontFamily: sansFont}}>
              <div style={{background: colors.navy, padding: '22px 0', textAlign: 'center', fontWeight: 900, fontSize: 44, color: '#fff'}}>PERMIS D'ENTRÉE</div>
              <div style={{padding: '26px 36px'}}>
                {['Détecteur', 'Ventilation', 'Surveillant'].map((l, i) => (
                  <div key={l} style={{display: 'flex', alignItems: 'center', gap: 18, marginBottom: 20, fontWeight: 800, fontSize: 36, color: colors.navy}}>
                    <div style={{width: 46, height: 46, borderRadius: 10, border: `4px solid ${colors.navy}`}} />
                    {l}
                  </div>
                ))}
              </div>
              {t > 47.3 && (
                <div style={{position: 'absolute', right: 30, bottom: 30, transform: `rotate(-12deg) scale(${interpolate(stamp, [0, 1], [2.2, 1])})`, opacity: Math.min(1, stamp * 2), border: `8px solid ${RED}`, borderRadius: 14, padding: '4px 16px', fontWeight: 900, fontSize: 36, color: RED, background: 'rgba(255,255,255,0.85)'}}>OBLIGATOIRE</div>
              )}
            </div>
          </Enter>
        </>
      )}
      {t >= 48.86 && (
        <>
          {RULES.map((r, i) =>
            i === cur ? (
              <PhotoCard key={r.l} src={r.src} at={r.at} until={i < 2 ? RULES[i + 1].at : 57.6} x={540} y={900} w={940} h={640} pos={r.pos} label={r.l} icon={r.n} />
            ) : null,
          )}
          {RULES.map((r, i) => (
            <Enter key={r.l} at={r.at + 0.3} x={540} y={1320 + i * 0} bouncy until={i < 2 ? RULES[i + 1].at : 57.6}>
              <div style={{display: 'flex', alignItems: 'center', gap: 18, background: '#fff', borderRadius: 24, padding: '16px 26px', boxShadow: '0 12px 26px rgba(30,25,10,0.16)', borderLeft: `12px solid ${colors.green}`, fontFamily: sansFont}}>
                <div style={{fontWeight: 900, fontSize: 64, color: colors.green}}>{i + 1}</div>
                <div>
                  <div style={{fontWeight: 900, fontSize: 40, color: colors.navy}}>{r.l}</div>
                  <div style={{fontWeight: 600, fontSize: 28, color: '#5B6675'}}>{r.s}</div>
                </div>
              </div>
            </Enter>
          ))}
          <div style={{position: 'absolute', left: 0, right: 0, top: 1490, display: 'flex', justifyContent: 'center', gap: 30}}>
            {RULES.map((r, i) => (
              <div key={r.l} style={{width: 96, height: 96, borderRadius: 24, background: i <= cur ? colors.green : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 18px rgba(0,0,0,0.12)', transform: `scale(${i === cur ? 1.12 : 1})`}}>
                <F n={r.n} size={64} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

/** 57,6 – 64,2 s : la cuve mesurée, ventilée, surveillée redevient un espace de travail. */
const Final: React.FC = () => {
  const t = useT();
  const g = 1 - prog(t, 58.6, 61.0, easeInOut);
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', inset: 0, opacity: prog(t, 57.65, 58.0) * (1 - prog(t, 63.9, 64.2, easeIn))}}>
      <Kinetic text="Mesurée, ventilée, *surveillée*" at={57.65} until={61.6} y={420} size={66} maxWidth={1000} />
      <Kinetic text="Un simple espace de *travail*" at={61.65} until={64.1} y={420} size={68} maxWidth={1000} />
      <Tank g={g} tint="#C8402F" />
      <Molecules g={g} n={8} />
      {/* gaine de ventilation */}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: prog(t, 59.7, 60.2)}}>
        <path d={`M${HOLE[1] - 30} ${TT + 300} V${TT - 60} Q ${HOLE[1] - 30} ${TT - 140} ${HOLE[1] + 60} ${TT - 140} H 820`} stroke="#B9C1CC" strokeWidth={34} fill="none" strokeLinecap="round" />
        {Array.from({length: 4}, (_, i) => {
          const p = ((f / 30) * 0.8 + i / 4) % 1;
          return <circle key={i} cx={HOLE[1] - 30} cy={TT - 40 + p * 320} r={8} fill="#7CC5D9" opacity={1 - p} />;
        })}
      </svg>
      <Enter at={59.8} x={860} y={TT - 140} bouncy><F n="vent" size={140} /></Enter>
      <Enter at={58.8} x={270} y={TT - 110} bouncy><div style={{background: '#fff', borderRadius: 20, padding: 10, boxShadow: '0 8px 18px rgba(0,0,0,0.15)'}}><F n="telephone" size={90} /></div></Enter>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: prog(t, 59.0, 59.4)}}>
        <line x1={300} y1={TT - 60} x2={420} y2={TT + 260} stroke={colors.navy} strokeWidth={3} strokeDasharray="8 8" />
      </svg>
      <Person x={380} y={TT - 40} suit="#2E6FC2" o={prog(t, 60.7, 61.1)} />
      <Person x={720} y={TB - 8} o={prog(t, 61.7, 62.1)} />
      <Enter at={62.4} x={720} y={TB - 330} bouncy><Verdict ok size={90} /></Enter>
      <Enter at={60.8} x={210} y={TT + 120} bouncy><Pill label="Surveillant" icon="yeux" size={26} /></Enter>
    </div>
  );
};

const CUES: Cue[] = [
  {at: 0.1, sfx: 'whoosh', volume: 0.3},
  {at: 3.35, sfx: 'thud', volume: 0.45},
  {at: 5.6, sfx: 'swish', volume: 0.3},
  {at: 7.0, sfx: 'swish', volume: 0.3},
  {at: 7.9, sfx: 'pop', volume: 0.3},
  {at: 9.65, sfx: 'whoosh', volume: 0.45},
  {at: 13.7, sfx: 'rise', volume: 0.25},
  {at: 16.7, sfx: 'swish', volume: 0.25},
  {at: 20.7, sfx: 'click', volume: 0.3},
  {at: 27.1, sfx: 'thud', volume: 0.55},
  {at: 31.2, sfx: 'pop', volume: 0.25},
  {at: 34.4, sfx: 'whoosh', volume: 0.3},
  {at: 37.1, sfx: 'thud', volume: 0.55},
  {at: 40.7, sfx: 'bell', volume: 0.35},
  {at: 44.35, sfx: 'whoosh', volume: 0.45},
  {at: 47.3, sfx: 'thud', volume: 0.5},
  ...RULES.map((r) => ({at: r.at, sfx: 'whoosh', volume: 0.3})),
  ...RULES.map((r) => ({at: r.at + 0.3, sfx: 'pop', volume: 0.3})),
  {at: 57.3, sfx: 'whoosh', volume: 0.45},
  {at: 58.6, sfx: 'rise', volume: 0.3},
  {at: 62.4, sfx: 'ding', volume: 0.35},
  {at: OUTRO_AT - 0.35, sfx: 'whoosh', volume: 0.45},
  {at: OUTRO_AT + 0.4, sfx: 'rise', volume: 0.3},
  {at: OUTRO_AT + 1.4, sfx: 'pop', volume: 0.35},
];

export const EspacesConfines: React.FC = () => {
  const end = CONFINES_FRAMES / 30;
  const music = (f: number) => interpolate(f / 30, [0, 0.3, OUTRO_AT - 0.2, OUTRO_AT + 0.4, end - 1, end], [0.26, 0.08, 0.08, 0.32, 0.32, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <Camera shakes={[3.35, 27.1, 37.1]}>
        <Background />
        <Gate from={0} to={10.0}><Hook /></Gate>
        <Gate from={10.0} to={44.7}><Drame /></Gate>
        <Gate from={44.7} to={57.65}><Permis /></Gate>
        <Gate from={57.65} to={OUTRO_AT}><Final /></Gate>
        <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
        <AlertVignette from={27.1} to={44.4} />
      </Camera>
      <Header hideAt={OUTRO_AT} logo={LOGO} />
      <Footer hideAt={OUTRO_AT} />
      {[10.0, 44.7, 57.65, OUTRO_AT].map((at) => <Wipe key={at} at={at} />)}
      <Captions captions={captions} />
      <Audio src={staticFile('voix-off-confines.m4a')} />
      <Audio src={staticFile('musique-promo.m4a')} volume={music} />
      <SfxTrack cues={CUES} />
    </AbsoluteFill>
  );
};
