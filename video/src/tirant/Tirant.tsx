import {AbsoluteFill, Audio, interpolate, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, Gate, Kinetic, prog, useT} from '../anim';
import {PhotoCard, RED, Verdict} from '../charte/ui';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {AlertVignette, Camera, Cue, Flash, SfxTrack, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {Pill} from '../iso/ui';
import {Outro} from '../scenes/Outro';
import {colors, handFont, s, sansFont} from '../theme';
import {captions} from './captions';

const LOGO = 'promo/logo.png';
const OUTRO_AT = 71.4;
export const TIRANT_FRAMES = s(74.6);

// Échelle du schéma : 1 m = 150 px.
const M = 150;
const DECK = 660; // niveau de la plateforme
const GROUND = DECK + 5 * M; // sol à 5 m
const AX = 400; // point d'ancrage (bord de la plateforme)
const ORANGE = '#E8772E';
const YELLOW = '#D9A23A';
const SEG = [
  {k: 'Longe', v: '1,80 m', m: 1.8, c: colors.navy, at: 19.9},
  {k: 'Absorbeur', v: '1,20 m', m: 1.2, c: ORANGE, at: 33.4},
  {k: 'Taille', v: '1,80 m', m: 1.8, c: colors.green, at: 45.3},
  {k: 'Marge', v: '1,00 m', m: 1.0, c: '#7B8794', at: 49.7},
];

/** Ouvrier dessiné, placé par son point d'ancrage dorsal (0,0) ; hauteur 1,80 m. */
const Worker: React.FC<{x: number; y: number; rot?: number; legs?: number}> = ({x, y, rot = 0, legs = 0}) => {
  const H = 1.8 * M; // 270 px
  return (
    <svg width={260} height={H + 120} viewBox={`-130 -90 260 ${H + 120}`} style={{position: 'absolute', left: x - 130, top: y - 90, transform: `rotate(${rot}deg)`, transformOrigin: '130px 90px', overflow: 'visible'}}>
      {/* casque + tête */}
      <circle cx={0} cy={-38} r={26} fill="#C68A5B" />
      <path d="M-30 -44 A30 30 0 0 1 30 -44 L36 -40 L-36 -40 Z" fill="#F2C230" stroke={colors.ink} strokeWidth={3} />
      {/* corps */}
      <rect x={-34} y={-8} width={68} height={110} rx={18} fill="#F07A2A" stroke={colors.ink} strokeWidth={3} />
      <rect x={-34} y={40} width={68} height={10} fill="#E6E6E6" />
      {/* harnais */}
      <path d="M-24 -6 L18 96 M24 -6 L-18 96" stroke={colors.ink} strokeWidth={6} />
      <circle cx={0} cy={0} r={8} fill="#fff" stroke={colors.ink} strokeWidth={4} />
      {/* bras */}
      <path d={`M-32 10 L${-58 - legs * 20} ${70 - legs * 40}`} stroke="#F07A2A" strokeWidth={18} strokeLinecap="round" />
      <path d={`M32 10 L${58 + legs * 20} ${70 - legs * 40}`} stroke="#F07A2A" strokeWidth={18} strokeLinecap="round" />
      {/* jambes */}
      <path d={`M-14 100 L${-18 - legs * 26} ${H - 70}`} stroke="#2F3D57" strokeWidth={22} strokeLinecap="round" />
      <path d={`M14 100 L${18 + legs * 26} ${H - 70}`} stroke="#2F3D57" strokeWidth={22} strokeLinecap="round" />
      <rect x={-34 - legs * 26} y={H - 78} width={30} height={16} rx={6} fill={colors.ink} />
      <rect x={4 + legs * 26} y={H - 78} width={30} height={16} rx={6} fill={colors.ink} />
    </svg>
  );
};

/** Cote verticale (accolade + libellé) à gauche du schéma. */
const Dim: React.FC<{y0: number; y1: number; label: string; value: string; color: string; p: number; dashed?: boolean}> = ({y0, y1, label, value, color, p, dashed}) => {
  if (p <= 0) return null;
  const y = y0 + (y1 - y0) * p;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d={`M262 ${y0} H286 V${y} H262`} stroke={color} strokeWidth={7} fill="none" strokeDasharray={dashed ? '12 9' : undefined} strokeLinejoin="round" />
      </svg>
      <div style={{position: 'absolute', left: 30, top: (y0 + y1) / 2, transform: `translateY(-50%) translateX(${(1 - p) * -40}px)`, opacity: p, width: 222, textAlign: 'right', fontFamily: sansFont}}>
        <div style={{fontWeight: 900, fontSize: 32, color}}>{label}</div>
        <div style={{fontWeight: 900, fontSize: 40, color: colors.navy}}>{value}</div>
      </div>
    </>
  );
};

/** 10,25 – 71,4 s : le schéma animé de la chute et l'addition du tirant d'air. */
const Schema: React.FC = () => {
  const t = useT();
  const sIn = prog(t, 10.3, 11.0, easeOut);
  const ff = prog(t, 14.9, 19.3, easeIn); // chute libre : 1,80 m
  const ab = prog(t, 27.0, 33.8, easeInOut); // déchirure de l'absorbeur : 1,20 m
  const fallen = t >= 14.9;
  const drop = ff * 1.8 * M + ab * 1.2 * M;
  const dorsalY = interpolate(ff, [0, 1], [DECK - 1.8 * M + 60, DECK + 1.8 * M]) + ab * 1.2 * M;
  const dorsalX = fallen ? interpolate(ff, [0, 0.35], [560, AX], {extrapolateRight: 'clamp'}) : 560;
  const swing = t > 19.3 ? Math.sin((t - 19.3) * 3) * 6 * Math.exp(-(t - 19.3) * 0.5) : 0;
  const rot = fallen ? interpolate(ff, [0, 0.4, 1], [0, -70, -12]) + swing : 0;
  const jolt = prog(t, 19.25, 19.4) * (1 - prog(t, 19.4, 19.8));
  const segP = SEG.map((sg) => prog(t, sg.at, sg.at + 0.6, easeOut));
  const sumP = prog(t, 55.0, 62.4, (v) => v);
  const crash = prog(t, 63.6, 64.4, easeOut);
  const overflow = t >= 63.6;
  const legsP = fallen ? Math.min(1, ff * 2) * (1 - prog(t, 19.3, 20.0)) : 0;
  // bas du tirant d'air requis
  const yLonge = DECK + 1.8 * M;
  const yAbs = yLonge + 1.2 * M;
  const yTaille = yAbs + 1.8 * M;
  const yMarge = yTaille + 1.0 * M;
  const total = (1.8 * segP[0] + 1.2 * segP[1] + 1.8 * segP[2] + 1.0 * segP[3]) * (t >= 56.3 ? 1 : 1);
  const counter = Math.min(total, 5.8);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: sIn}}>
      {/* sol */}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <defs>
          <pattern id="hatch" width={22} height={22} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width={22} height={22} fill="#E9E2D0" />
            <line x1={0} y1={0} x2={0} y2={22} stroke="#C9BEA2" strokeWidth={6} />
          </pattern>
        </defs>
        <rect x={0} y={GROUND} width={1080} height={180} fill="url(#hatch)" />
        <line x1={0} y1={GROUND} x2={1080} y2={GROUND} stroke={colors.ink} strokeWidth={8} />
        {/* échafaudage */}
        {[AX + 10, 640, 860].map((x) => (
          <line key={x} x1={x} y1={DECK} x2={x} y2={GROUND} stroke="#5D7896" strokeWidth={10} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={AX + 10} y1={DECK + 40 + i * 180} x2={860} y2={DECK + 220 + i * 180 > GROUND ? GROUND : DECK + 220 + i * 180} stroke="#9FB2C7" strokeWidth={5} />
        ))}
        {[1, 2, 3, 4].map((i) => (
          <line key={i} x1={AX + 10} y1={DECK + i * 150} x2={860} y2={DECK + i * 150} stroke="#9FB2C7" strokeWidth={5} />
        ))}
        <rect x={AX} y={DECK - 22} width={500} height={26} rx={6} fill={colors.navy} />
        <line x1={AX + 30} y1={DECK - 100} x2={AX + 470} y2={DECK - 100} stroke={YELLOW} strokeWidth={6} opacity={0.5} />
        {/* point d'ancrage */}
        <circle cx={AX} cy={DECK - 10} r={14} fill={ORANGE} stroke="#fff" strokeWidth={4} />
        {/* longe + absorbeur */}
        {t >= 13.3 && (
          <g opacity={prog(t, 13.3, 13.8)}>
            {fallen ? (
              <>
                <line x1={AX} y1={DECK - 10} x2={dorsalX} y2={Math.min(dorsalY, DECK - 10 + 1.8 * M)} stroke={colors.navy} strokeWidth={8} />
                {ab > 0 && (
                  <path
                    d={Array.from({length: 13}, (_, i) => {
                      const yy = DECK - 10 + 1.8 * M + (i / 12) * ab * 1.2 * M;
                      return `${i === 0 ? 'M' : 'L'}${AX + (i % 2 ? 14 : -14)} ${yy}`;
                    }).join(' ')}
                    stroke={ORANGE}
                    strokeWidth={7}
                    fill="none"
                  />
                )}
              </>
            ) : (
              <path d={`M${AX} ${DECK - 10} Q ${AX + 60} ${DECK + 30} 560 ${DECK - 1.8 * M + 60}`} stroke={colors.navy} strokeWidth={8} fill="none" />
            )}
          </g>
        )}
        {/* hauteur disponible */}
        <g opacity={prog(t, 11.6, 12.4)}>
          <line x1={960} y1={DECK} x2={960} y2={DECK + (GROUND - DECK) * prog(t, 11.6, 12.6)} stroke={YELLOW} strokeWidth={7} />
          <line x1={940} y1={DECK} x2={980} y2={DECK} stroke={YELLOW} strokeWidth={7} />
          <line x1={940} y1={GROUND} x2={980} y2={GROUND} stroke={YELLOW} strokeWidth={7} opacity={prog(t, 12.4, 12.6)} />
        </g>
        {/* dépassement */}
        {overflow && (
          <g opacity={crash}>
            <rect x={300} y={GROUND} width={240} height={(yMarge - GROUND) * crash} fill="rgba(217,68,58,0.25)" stroke={RED} strokeWidth={6} strokeDasharray="14 10" />
          </g>
        )}
        {/* marge pointillée */}
        {segP[3] > 0 && <rect x={AX - 70} y={yTaille} width={140} height={1.0 * M * segP[3]} fill="none" stroke="#7B8794" strokeWidth={5} strokeDasharray="10 8" />}
      </svg>
      <div style={{position: 'absolute', left: 990, top: (DECK + GROUND) / 2, transform: 'translateY(-50%)', opacity: prog(t, 12.3, 12.8), fontFamily: sansFont, textAlign: 'left'}}>
        <div style={{fontWeight: 900, fontSize: 36, color: YELLOW, writingMode: 'vertical-rl', transform: 'rotate(180deg)'}}>5,00 m disponibles</div>
      </div>

      {/* ouvrier */}
      <div style={{position: 'absolute', inset: 0, transform: `translateY(${jolt * 14}px)`}}>
        <Worker x={dorsalX} y={dorsalY} rot={rot} legs={legsP} />
      </div>

      {/* cotes */}
      <Dim y0={DECK} y1={yLonge} label={SEG[0].k} value={SEG[0].v} color={SEG[0].c} p={segP[0]} />
      <Dim y0={yLonge} y1={yAbs} label={SEG[1].k} value={SEG[1].v} color={SEG[1].c} p={segP[1]} />
      <Dim y0={yAbs} y1={yTaille} label={SEG[2].k} value={SEG[2].v} color={SEG[2].c} p={segP[2]} />
      <Dim y0={yTaille} y1={yMarge} label={SEG[3].k} value={SEG[3].v} color={SEG[3].c} p={segP[3]} dashed />

      {/* étiquettes d'événements */}
      <Enter at={13.4} until={14.7} x={560} y={DECK + 120} bouncy><Pill label="Ancré par une longe" icon="maillon" size={30} /></Enter>
      <Enter at={16.5} until={19.2} x={700} y={DECK + 330} bouncy><Pill label="Chute libre" icon="danger" color={RED} size={34} /></Enter>
      <Enter at={22.6} until={25.6} x={700} y={DECK + 380} bouncy>
        <div style={{background: RED, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 52, padding: '12px 30px', borderRadius: 20, boxShadow: '0 12px 26px rgba(217,68,58,0.4)', transform: `rotate(-4deg)`}}>ARRÊT NET = MORTEL</div>
      </Enter>
      <Enter at={29.2} until={34.9} x={700} y={DECK + 420} bouncy><Pill label="Absorbeur d'énergie" icon="eclair" color={ORANGE} size={32} /></Enter>
      <Enter at={35.2} until={38.1} x={700} y={DECK + 470} bouncy><Pill label="L'erreur classique" icon="danger" color={RED} size={34} /></Enter>
      <Enter at={38.4} until={46.9} x={720} y={DECK + 470} bouncy><Pill label="Ancrage dans le dos" icon="gilet" size={30} /></Enter>
      <Enter at={51.7} until={54.9} x={720} y={DECK + 470} bouncy><Pill label="Étirement des sangles" icon="maillon" size={30} /></Enter>

      {/* addition */}
      {t >= 55.0 && t < 63.6 && (
        <Enter at={55.05} until={63.55} x={700} y={DECK + 230} bouncy>
          <div style={{width: 420, borderRadius: 30, background: '#fff', padding: '20px 26px', boxShadow: '0 18px 36px rgba(14,42,92,0.22)', fontFamily: sansFont}}>
            {SEG.map((sg, i) => (
              <div key={sg.k} style={{display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 32, color: sg.c, marginBottom: 6, opacity: prog(t, 56.3 + i * 0.75, 56.6 + i * 0.75)}}>
                <span>{i ? '+ ' : ''}{sg.k}</span>
                <span>{sg.v}</span>
              </div>
            ))}
            <div style={{height: 4, background: colors.navy, borderRadius: 2, margin: '10px 0', transform: `scaleX(${prog(t, 59.9, 60.4)})`}} />
            <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: 46, color: colors.navy, opacity: prog(t, 60.4, 60.8)}}>
              <span>Total</span>
              <span style={{color: RED}}>{(1.8 + 1.2 + 1.8 + 1.0 * prog(t, 60.4, 62.4, easeOut)).toFixed(2).replace('.', ',')} m</span>
            </div>
          </div>
        </Enter>
      )}
      {overflow && (
        <>
          <Enter at={63.7} x={720} y={DECK + 200} bouncy>
            <div style={{display: 'flex', alignItems: 'center', gap: 18, background: '#fff', borderRadius: 28, padding: '18px 26px', boxShadow: '0 16px 32px rgba(0,0,0,0.18)', fontFamily: sansFont, fontWeight: 900, fontSize: 46, whiteSpace: 'nowrap'}}>
              <span style={{color: RED}}>5,80 m</span>
              <span style={{color: colors.navy}}>&gt;</span>
              <span style={{color: YELLOW}}>5,00 m</span>
            </div>
          </Enter>
          <Enter at={65.3} x={720} y={DECK + 340} bouncy>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <Verdict ok={false} size={90} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: RED, whiteSpace: 'nowrap'}}>manque 0,80 m</div>
            </div>
          </Enter>
          <Enter at={67.3} x={700} y={GROUND + 90} bouncy>
            <div style={{background: RED, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 46, padding: '10px 28px', borderRadius: 18, transform: 'rotate(-3deg)', whiteSpace: 'nowrap'}}>IMPACT AU SOL</div>
          </Enter>
        </>
      )}
      {/* compteur discret pendant la construction */}
      {t >= 20.0 && t < 55.0 && (
        <div style={{position: 'absolute', left: 560, top: DECK + 40, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#5B6675', opacity: 0.9}}>
          Σ <span style={{color: colors.navy, fontSize: 40}}>{counter.toFixed(2).replace('.', ',')} m</span>
        </div>
      )}
    </div>
  );
};

/** Titres de la partie schéma (une ligne, au-dessus du dessin). */
const Titles: React.FC = () => (
  <>
    <Kinetic text="Échafaudage de *5 m*" at={10.3} until={14.7} y={330} size={64} maxWidth={1000} />
    <Kinetic text="Phase 1 : *chute libre*" at={14.75} until={25.65} y={330} size={64} maxWidth={1000} accent={RED} />
    <Kinetic text="Phase 2 : *absorbeur*" at={25.7} until={35.05} y={330} size={64} maxWidth={1000} accent={ORANGE} />
    <Kinetic text="Phase 3 : *sa taille*" at={35.1} until={47.15} y={330} size={64} maxWidth={1000} />
    <Kinetic text="Phase 4 : *marge* légale" at={47.2} until={54.95} y={330} size={64} maxWidth={1000} accent="#7B8794" />
    <Kinetic text="Faisons les *comptes*" at={55.0} until={63.55} y={330} size={64} maxWidth={1000} />
    <Kinetic text="Il touche le *sol*" at={63.6} until={71.3} y={330} size={70} maxWidth={1000} accent={RED} />
  </>
);

/** 0 – 10,25 s : accroche (harnais) et définition du tirant d'air. */
const Hook: React.FC = () => {
  const t = useT();
  const out = prog(t, 9.95, 10.25, easeIn);
  const arrow = prog(t, 6.0, 8.0, easeInOut);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Un harnais ne suffit *pas*" at={0.05} until={2.45} y={420} size={78} maxWidth={1000} accent={RED} />
      <Kinetic text="Le *tirant d'air*" at={2.5} until={4.85} y={420} size={100} />
      <Kinetic text="L'espace pour *survivre*" at={4.9} until={10.2} y={420} size={78} maxWidth={1000} />
      {t < 4.9 && (
        <>
          <PhotoCard src="tirant/harnais-dos.jpg" at={0.1} until={4.85} x={540} y={960} w={940} h={680} pos="55% 40%" label="Travail en hauteur" icon="gilet" />
          <Enter at={2.6} until={4.85} x={540} y={1420} bouncy><Pill label="Mal calculé = inutile" icon="danger" color={RED} size={38} /></Enter>
        </>
      )}
      {t >= 4.9 && (
        <>
          <PhotoCard src="tirant/echafaudage.jpg" at={4.95} x={430} y={990} w={620} h={880} pos="50% 40%" label="Hauteur de chute" icon="chantier" />
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <line x1={880} y1={600} x2={880} y2={600 + 780 * arrow} stroke={colors.green} strokeWidth={12} strokeLinecap="round" />
            <path d={`M856 ${600 + 780 * arrow - 26} L880 ${600 + 780 * arrow + 4} L904 ${600 + 780 * arrow - 26}`} stroke={colors.green} strokeWidth={12} fill="none" strokeLinecap="round" opacity={arrow > 0.05 ? 1 : 0} />
            <line x1={840} y1={600} x2={920} y2={600} stroke={colors.green} strokeWidth={10} opacity={prog(t, 5.6, 6.0)} />
          </svg>
          <Enter at={7.5} x={880} y={1460} bouncy><div style={{fontFamily: handFont, fontSize: 56, color: colors.navy, background: '#fff', padding: '4px 18px', borderRadius: 14, boxShadow: '0 8px 16px rgba(0,0,0,0.12)'}}>vide exact</div></Enter>
        </>
      )}
    </div>
  );
};

const CUES: Cue[] = [
  {at: 0.1, sfx: 'whoosh', volume: 0.3},
  {at: 2.6, sfx: 'bell', volume: 0.3},
  {at: 4.95, sfx: 'whoosh', volume: 0.3},
  {at: 6.0, sfx: 'rise', volume: 0.25},
  {at: 9.9, sfx: 'whoosh', volume: 0.45},
  {at: 11.6, sfx: 'rise', volume: 0.25},
  {at: 13.4, sfx: 'click', volume: 0.4},
  {at: 14.9, sfx: 'swish', volume: 0.4},
  {at: 15.3, sfx: 'whoosh', volume: 0.35},
  {at: 19.3, sfx: 'thud', volume: 0.55},
  {at: 19.9, sfx: 'pop', volume: 0.3},
  {at: 22.6, sfx: 'bell', volume: 0.3},
  {at: 27.0, sfx: 'rise', volume: 0.3},
  {at: 33.8, sfx: 'thud', volume: 0.4},
  {at: 33.4, sfx: 'pop', volume: 0.3},
  {at: 35.2, sfx: 'bell', volume: 0.3},
  {at: 45.3, sfx: 'pop', volume: 0.3},
  {at: 49.7, sfx: 'pop', volume: 0.3},
  ...[56.3, 57.05, 57.8, 58.55].map((at) => ({at, sfx: 'click', volume: 0.35})),
  {at: 60.4, sfx: 'rise', volume: 0.3},
  {at: 62.4, sfx: 'ding', volume: 0.35},
  {at: 63.7, sfx: 'thud', volume: 0.45},
  {at: 65.3, sfx: 'bell', volume: 0.3},
  {at: 67.3, sfx: 'thud', volume: 0.6},
  {at: OUTRO_AT - 0.35, sfx: 'whoosh', volume: 0.45},
  {at: OUTRO_AT + 0.4, sfx: 'rise', volume: 0.3},
  {at: OUTRO_AT + 1.4, sfx: 'pop', volume: 0.35},
];

export const TirantAir: React.FC = () => {
  const end = TIRANT_FRAMES / 30;
  const music = (f: number) => interpolate(f / 30, [0, 0.3, OUTRO_AT - 0.2, OUTRO_AT + 0.4, end - 1, end], [0.26, 0.08, 0.08, 0.32, 0.32, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <Camera shakes={[19.3, 67.3]}>
        <Background />
        <Gate from={0} to={10.25}><Hook /></Gate>
        <Gate from={10.25} to={OUTRO_AT}><Schema /><Titles /></Gate>
        <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
        <AlertVignette from={63.6} to={71.0} />
      </Camera>
      <Header hideAt={OUTRO_AT} logo={LOGO} />
      <Footer hideAt={OUTRO_AT} />
      <Flash at={19.3} />
      <Flash at={67.3} />
      <Wipe at={10.25} />
      <Wipe at={OUTRO_AT} />
      <Captions captions={captions} />
      <Audio src={staticFile('voix-off-tirant.m4a')} />
      <Audio src={staticFile('musique-promo.m4a')} volume={music} />
      <SfxTrack cues={CUES} />
    </AbsoluteFill>
  );
};

