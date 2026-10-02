import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {kf, Pop, useProgress} from './anim';
import {Background} from './components/Background';
import {Captions} from './components/Captions';
import {Responsable, Superviseur} from './components/Characters';
import {Footer} from './components/Footer';
import {Header} from './components/Header';
import {
  BarChart,
  Beacon,
  Bell,
  Bin,
  Check,
  Clipboard,
  Eye,
  Manual,
  Padlock,
  Permit,
  ShieldOutline,
  Stamp,
  Tag,
  Warning,
} from './components/Icons';
import {Globe} from './components/Logo';
import {colors, FPS, s, sansFont} from './theme';

const END_CARD = 51.6;
export const TOTAL_FRAMES = s(53.4);

const Title: React.FC<{children: string}> = ({children}) => (
  <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 64, color: colors.green, whiteSpace: 'nowrap'}}>{children}</div>
);

const Label: React.FC<{children: string}> = ({children}) => (
  <div style={{fontFamily: sansFont, fontWeight: 600, fontSize: 44, color: colors.ink, textAlign: 'center', whiteSpace: 'nowrap'}}>
    {children}
  </div>
);

/** Place un personnage par le milieu de son corps (cx) et ses pieds (bottom). */
const Placed: React.FC<{cx: number; bottom: number; size: number; opacity?: number; children: React.ReactNode}> = ({
  cx,
  bottom,
  size,
  opacity = 1,
  children,
}) => {
  const frame = useCurrentFrame();
  const breathe = 1 + 0.012 * Math.sin(frame / 9);
  const h = (size * 345) / 290;
  return (
    <div
      style={{
        position: 'absolute',
        left: cx - (size * 120) / 290,
        top: bottom - h,
        opacity,
        transformOrigin: `${(120 / 290) * 100}% 100%`,
        transform: `scaleY(${breathe})`,
      }}
    >
      {children}
    </div>
  );
};

/** 0 – 25 s : le superviseur sur le terrain, jusqu'aux permis de travail. */
const ActeTerrain: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const T = [0, 12.2, 12.8, 16.1, 16.7, 37];
  const cx = kf(t, T, [540, 540, 330, 330, 470, 470]);
  const bottom = kf(t, T, [930, 930, 1080, 1080, 1250, 1250]);
  const size = kf(t, T, [440, 440, 420, 420, 380, 380]);
  const pose = t < 7.9 ? 'front' : 'point';
  // petit rebond au changement de pose
  const bump = interpolate(t, [7.9, 8.05, 8.3], [1, 1.06, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const intro = interpolate(t, [0, 0.4], [0, 1], {extrapolateRight: 'clamp'});
  const out = interpolate(t, [25.1, 25.6], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const arc = useProgress(4.6, 6.4);
  const arcOut = interpolate(t, [7.6, 7.9], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <>
      {t < 7.9 && (
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: arcOut}}>
          <path
            d="M 300 760 A 245 245 0 0 1 780 760"
            fill="none"
            stroke={colors.green}
            strokeWidth={9}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - arc}
          />
        </svg>
      )}
      <div style={{position: 'absolute', inset: 0, transform: `scale(${bump})`, transformOrigin: `${cx}px ${bottom}px`}}>
        <Placed cx={cx} bottom={bottom} size={size} opacity={intro * out}>
          <Superviseur pose={pose} size={size} />
        </Placed>
      </div>
      <Pop at={0.3} until={7.9} x={540} y={990}>
        <Title>Superviseur HSE</Title>
      </Pop>

      {/* dangers → gestes corrigés */}
      <Pop at={12.5} until={14.1} x={790} y={820} rotate={Math.sin(t * 9) * 4}>
        <Warning size={210} />
      </Pop>
      <Pop at={14.1} until={16.3} x={790} y={820}>
        <Check size={200} progress={useProgress(14.1, 14.6)} />
      </Pop>

      {/* opérations critiques verrouillées */}
      <PermisDeTravail />
    </>
  );
};

const PermisDeTravail: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const unlock = useProgress(24.3, 24.7);
  const tags = [
    {label: 'Soudure', at: 19.5, x: 205},
    {label: 'Levage', at: 20.1, x: 540},
    {label: 'Confiné', at: 20.8, x: 875},
  ];
  return (
    <>
      {tags.map((tg, i) => {
        const drop = interpolate(t, [21.9 + i * 0.12, 22.25 + i * 0.12], [-160, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const lockVisible = t >= 21.9 + i * 0.12;
        const lockOut = interpolate(t, [24.8, 25.1], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        return (
          <Pop key={tg.label} at={tg.at} until={25.3} x={tg.x} y={560}>
            <div style={{position: 'relative'}}>
              {lockVisible && (
                <div style={{position: 'absolute', left: 125 - 48, top: -78 + drop, opacity: lockOut, zIndex: 0}}>
                  <Padlock size={96} open={unlock} />
                </div>
              )}
              <div style={{position: 'relative', zIndex: 1}}>
                <Tag label={tg.label} filled={unlock} />
              </div>
            </div>
          </Pop>
        );
      })}
      <Pop at={22.7} until={25.3} x={820} y={800}>
        <div style={{position: 'relative'}}>
          <Permit size={170} />
          <div style={{position: 'absolute', left: 70, top: 120}}>
            <Pop at={23.5} x={50} y={50}>
              <Stamp size={110} />
            </Pop>
          </div>
        </div>
      </Pop>
    </>
  );
};

/** 25 – 30 s : exercices d'urgence et tri des déchets. */
const ActeUrgence: React.FC = () => {
  const frame = useCurrentFrame();
  const glow = (Math.sin(frame / 3) + 1) / 2;
  return (
    <>
      <Pop at={25.9} until={30.1} x={290} y={900}>
        <Beacon size={300} glow={glow} />
        <Label>Urgence</Label>
      </Pop>
      <Pop at={27.9} until={30.1} x={740} y={880}>
        <div style={{display: 'flex', gap: 14, alignItems: 'flex-end'}}>
          <Bin size={130} color={colors.green} />
          <Bin size={130} color={colors.ochre} />
          <Bin size={130} color="#4A5568" />
        </div>
        <div style={{marginTop: 18}}>
          <Label>Tri Déchets</Label>
        </div>
      </Pop>
    </>
  );
};

/** 30 – 37,7 s : ne pas confondre avec le Responsable HSE. */
const ActeResponsable: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const cx = kf(t, [33.3, 33.9], [540, 720]);
  const opacity = interpolate(t, [30.3, 30.7, 37.4, 37.8], [0, 1, 1, 0]);
  const enter = interpolate(t, [30.3, 30.8], [60, 0], {extrapolateRight: 'clamp'});
  return (
    <>
      <div style={{position: 'absolute', inset: 0, transform: `translateY(${enter}px)`}}>
        <Placed cx={cx} bottom={1150} size={440} opacity={opacity}>
          <Responsable size={440} />
        </Placed>
      </div>
      <Pop at={32.0} until={37.8} x={cx + 10} y={1210}>
        <Title>Responsable HSE</Title>
      </Pop>
      <Pop at={33.5} until={37.8} x={330} y={760}>
        <BarChart grow={useProgress(33.6, 35.0)} trend={useProgress(35.1, 36.3)} axes={useProgress(33.5, 33.9)} />
      </Pop>
    </>
  );
};

/** 37,7 – 46,7 s : le superviseur vit dans l'action, les manuels ne suffisent pas. */
const ActeAction: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const opacity = interpolate(t, [37.7, 38.2, 43.4, 43.9, 46.3, 46.7], [0, 1, 1, 0.22, 0.22, 0], {
    extrapolateRight: 'clamp',
  });
  const cx = kf(t, [43.4, 43.9], [500, 760]);
  const shake = t > 44.8 && t < 45.6 ? Math.sin(t * 60) * 6 : 0;
  return (
    <>
      <Placed cx={cx} bottom={kf(t, [43.4, 43.9], [1200, 1300])} size={420} opacity={opacity}>
        <Superviseur pose="point" size={420} />
      </Placed>
      <Pop at={40.3} until={43.6} x={200} y={900}>
        <Eye size={190} blink={t > 41.2 && t < 41.35 ? 1 : 0} />
      </Pop>
      <Pop at={41.0} until={43.6} x={500} y={640} rotate={Math.sin(t * 14) * 10}>
        <Bell size={140} />
      </Pop>
      <Pop at={41.8} until={43.6} x={880} y={880}>
        <Clipboard size={140} check={useProgress(42.0, 42.6)} />
      </Pop>
      <Pop at={43.7} until={46.7} x={540 + shake} y={860}>
        <div style={{filter: `grayscale(${useProgress(44.8, 45.6)})`}}>
          <Manual size={260} />
        </div>
      </Pop>
    </>
  );
};

/** 46,7 – 51,6 s : un véritable bouclier protecteur pour ses équipes. */
const ActeBouclier: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const opacity = interpolate(t, [46.7, 47.1, END_CARD, END_CARD + 0.4], [0, 1, 1, 0]);
  const r = interpolate(t, [48.5, 49.2], [0, 270], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const shield = useProgress(49.3, 50.4);
  return (
    <div style={{position: 'absolute', inset: 0, opacity}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={430} cy={1010} r={r} fill="rgba(124,197,118,0.45)" stroke={colors.green} strokeWidth={6} />
      </svg>
      <Pop at={49.0} x={330} y={1060}>
        <Superviseur size={230} helmet="#3E9E46" />
      </Pop>
      <Pop at={49.2} x={520} y={1060}>
        <Superviseur size={230} helmet="#E9B949" />
      </Pop>
      <Placed cx={740} bottom={1380} size={420}>
        <Superviseur pose="front" size={420} />
      </Placed>
      {shield > 0 && (
        <div style={{position: 'absolute', left: 540 - 430, top: 600}}>
          <ShieldOutline size={860} progress={shield} />
        </div>
      )}
    </div>
  );
};

const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const o = interpolate(t, [END_CARD, END_CARD + 0.4], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: o}}>
      <Pop at={END_CARD + 0.1} x={540} y={820}>
        <Globe size={380} />
      </Pop>
      <Pop at={END_CARD + 0.3} x={540} y={1060}>
        <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 104, color: colors.navy, letterSpacing: -2}}>
          UNIVERSNORMES
        </div>
      </Pop>
      <Pop at={END_CARD + 0.5} x={540} y={1170}>
        <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 34, color: colors.green, whiteSpace: 'nowrap'}}>
          FORMATIONS • AUDITS • ACCOMPAGNEMENT • CONSEIL
        </div>
      </Pop>
    </AbsoluteFill>
  );
};

/** N'affiche ses enfants qu'entre `from` et `to` (secondes). */
const Gate: React.FC<{from: number; to: number; children: React.ReactNode}> = ({from, to, children}) => {
  const t = useCurrentFrame() / FPS;
  return t >= from && t <= to ? <>{children}</> : null;
};

export const SuperviseurHSE: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeAudio = interpolate(frame, [TOTAL_FRAMES - s(0.8), TOTAL_FRAMES], [1, 0], {extrapolateLeft: 'clamp'});
  return (
    <AbsoluteFill>
      <Background />
      <Gate from={0} to={25.6}><ActeTerrain /></Gate>
      <Gate from={25.8} to={30.2}><ActeUrgence /></Gate>
      <Gate from={30.3} to={37.8}><ActeResponsable /></Gate>
      <Gate from={37.7} to={46.8}><ActeAction /></Gate>
      <Gate from={46.7} to={END_CARD + 0.4}><ActeBouclier /></Gate>
      <Gate from={END_CARD} to={99}><EndCard /></Gate>
      <Header />
      <Footer />
      <Captions />
      <Audio src={staticFile('voix-off.m4a')} volume={fadeAudio} />
    </AbsoluteFill>
  );
};
