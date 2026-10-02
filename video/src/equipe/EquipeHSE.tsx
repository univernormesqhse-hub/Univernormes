import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {easeIn, easeInOut, Enter, Gate, kf, Kinetic, prog, useT} from '../anim';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {Camera, Cue, SfxTrack, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {Eye, Gear} from '../components/Icons';
import {Outro} from '../scenes/Outro';
import {colors, s, sansFont} from '../theme';
import {captions} from './captions';
import {Hook} from './Hook';
import {HeroText, Links, RoleFigure, Slot} from './Org';
import {LINKS, ORDER, ROLES} from './roles';

const CHART_AT = 9.5;
const OUTRO_AT = 66.5;
export const EQUIPE_FRAMES = s(69.3);

const heroOn = (t: number) =>
  ORDER.reduce((acc, id) => {
    const r = ROLES[id];
    return Math.max(acc, prog(t, r.heroIn - 0.2, r.heroIn + 0.3) * (1 - prog(t, r.heroOut, r.heroOut + 0.5)));
  }, 0);

/** Anneau « circuit fermé » autour de l'organigramme. */
const Loop: React.FC = () => {
  const t = useT();
  const p = prog(t, 60.4, 61.3, easeInOut);
  if (p <= 0) return null;
  const rot = t * 40;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <g transform={`rotate(${rot} 540 975)`}>
        <ellipse cx={540} cy={975} rx={505} ry={610} fill="none" stroke={colors.green} strokeWidth={8} strokeDasharray="4 26" strokeLinecap="round" opacity={0.6 * p} />
        {[0, 180].map((a) => (
          <g key={a} transform={`rotate(${a} 540 975)`} opacity={p}>
            <path d="M 1045 975 A 505 610 0 0 1 900 1400" fill="none" stroke={colors.green} strokeWidth={14} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
          </g>
        ))}
      </g>
    </svg>
  );
};

/** Chevrons verts qui remontent l'axe central (« l'information remonte »). */
const Rising: React.FC<{from: number; to: number}> = ({from, to}) => {
  const t = useT();
  if (t < from || t > to) return null;
  const env = prog(t, from, from + 0.3) * (1 - prog(t, to - 0.3, to, easeIn));
  return (
    <>
      {[0, 1, 2, 3, 4].map((k) => {
        const ph = ((t - from) * 0.8 + k / 5) % 1;
        const y = 1480 - ph * 820;
        return (
          <svg key={k} width={120} height={70} style={{position: 'absolute', left: 480, top: y, opacity: env * Math.sin(ph * Math.PI)}}>
            <path d="M10 60 L60 14 L110 60" fill="none" stroke={colors.green} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      })}
    </>
  );
};

/** L'organigramme vivant (emplacements, liens, médaillons) et ses temps forts. */
const Chart: React.FC = () => {
  const t = useT();
  const dim = heroOn(t);
  // caméra de l'organigramme : zoom vers l'emplacement de l'Agent (« au plus près des machines »)
  const z = kf(t, [32.4, 33.4, 36.0, 36.6], [1, 1.18, 1.18, 1]);
  const agent = ROLES.agent;
  const flow = prog(t, 60.5, 61.0) * (1 - prog(t, 66.0, 66.4));
  const highlight = t > 61.9 && t < 63.9 ? 'down' : t >= 63.9 ? 'up' : null;
  const hl = highlight === 'down' ? prog(t, 61.9, 62.2) * (1 - prog(t, 63.6, 63.9)) : highlight === 'up' ? prog(t, 63.9, 64.2) * (1 - prog(t, 66.0, 66.4)) : 0;
  const chartDim = interpolate(dim, [0, 1], [1, 0.22]);
  return (
    <>
      <div style={{position: 'absolute', inset: 0, transform: `scale(${z})`, transformOrigin: `${agent.x}px 900px`}}>
        <Loop />
        <div style={{position: 'absolute', inset: 0, opacity: chartDim}}>
          {ORDER.map((id, i) => (
            <Slot key={id} role={ROLES[id]} at={10.45 + i * 0.12} index={i} />
          ))}
          <Links links={LINKS} flow={flow} highlight={highlight} hl={hl} />
          {/* machines + œil expert autour de l'emplacement de l'Agent */}
          <Enter at={33.4} until={36.5} x={agent.x + 175} y={agent.y - 40} bouncy>
            <Gear size={90} rotate={t * 120} />
          </Enter>
          <Enter at={33.55} until={36.5} x={agent.x + 120} y={agent.y + 70} bouncy>
            <Gear size={64} rotate={-t * 170} color={colors.green} />
          </Enter>
          <Enter at={35.3} until={36.6} x={agent.x} y={agent.y} bouncy>
            <Eye size={150} blink={t > 36.0 && t < 36.12 ? 1 : 0} />
          </Enter>
        </div>
        {ORDER.map((id) => {
          const r = ROLES[id];
          const own = prog(t, r.heroIn - 0.2, r.heroIn + 0.3) * (1 - prog(t, r.heroOut, r.heroOut + 0.5));
          return <RoleFigure key={id} role={r} dim={Math.max(0, dim - own)} />;
        })}
        <Rising from={45.0} to={46.8} />
      </div>
      {ORDER.map((id) => (
        <HeroText key={id} role={ROLES[id]} />
      ))}

      {/* textes des temps forts */}
      <Kinetic text="L'architecture en *6 maillons*" at={9.6} until={11.6} y={340} size={50} maxWidth={1040} />
      <Kinetic text="Tout au *sommet*" at={11.7} until={12.45} y={340} size={72} />
      <Kinetic text="La vision *descend*" at={20.95} until={22.85} y={340} size={72} />
      <Kinetic text="Au plus près des *machines*" at={32.0} until={36.5} y={340} size={54} maxWidth={1040} />
      <Kinetic text="L'info *remonte*" at={42.95} until={46.6} y={340} size={72} />
      <Kinetic text="Plus *haut*" at={51.6} until={52.15} y={340} size={72} />
      <Kinetic text="Pas une simple *hiérarchie*" at={58.1} until={60.25} y={340} size={54} maxWidth={1040} />
      <Kinetic text="Un *circuit fermé*" at={60.35} until={61.85} y={340} size={76} />
      <Kinetic text="Les *directives* ↓ protègent" at={61.95} until={63.85} y={340} size={52} maxWidth={1040} />
      <Kinetic text="Le *terrain* ↑ améliore" at={63.95} until={66.4} y={340} size={60} maxWidth={1040} />
      <Enter at={60.6} until={66.4} x={540} y={1450} from="up" dist={60} bouncy>
        <div style={{background: colors.green, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 32, padding: '8px 26px 10px', borderRadius: 40, letterSpacing: 1, whiteSpace: 'nowrap'}}>⟳ CIRCUIT FERMÉ</div>
      </Enter>
    </>
  );
};

const CUES: Cue[] = [
  {at: 0.1, sfx: 'whoosh', volume: 0.3},
  {at: 0.3, sfx: 'rise', volume: 0.2},
  ...[0, 1, 2, 3, 4, 5].map((k) => ({at: 2.95 + k * 0.22, sfx: 'thud', volume: 0.18})),
  {at: 4.3, sfx: 'swish', volume: 0.35},
  {at: 4.4, sfx: 'whoosh', volume: 0.3},
  {at: 5.4, sfx: 'pop', volume: 0.3},
  {at: 7.4, sfx: 'pop', volume: 0.3},
  {at: 7.85, sfx: 'ding', volume: 0.25},
  {at: 8.3, sfx: 'pop', volume: 0.3},
  {at: CHART_AT - 0.35, sfx: 'whoosh', volume: 0.45},
  ...ORDER.map((_, i) => ({at: 10.45 + i * 0.12, sfx: 'pop', volume: 0.18})),
  ...ORDER.flatMap((id) => {
    const r = ROLES[id];
    return [
      {at: r.heroIn - 0.15, sfx: 'whoosh', volume: 0.3},
      {at: r.heroIn, sfx: 'rise', volume: 0.18},
      ...r.chips.map((c) => ({at: c.at, sfx: 'pop', volume: 0.22})),
      {at: r.heroOut, sfx: 'swish', volume: 0.3},
      {at: r.heroOut + 0.62, sfx: 'click', volume: 0.35},
    ];
  }),
  ...LINKS.map((l) => ({at: l.at, sfx: 'swish', volume: 0.2})),
  {at: 33.4, sfx: 'pop', volume: 0.2},
  {at: 35.3, sfx: 'ding', volume: 0.25},
  {at: 45.1, sfx: 'rise', volume: 0.3},
  {at: 60.4, sfx: 'rise', volume: 0.3},
  {at: 61.2, sfx: 'ding', volume: 0.35},
  {at: OUTRO_AT - 0.35, sfx: 'whoosh', volume: 0.45},
  {at: OUTRO_AT + 0.4, sfx: 'rise', volume: 0.3},
  {at: OUTRO_AT + 1.4, sfx: 'pop', volume: 0.35},
];

export const EquipeHSE: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeAudio = interpolate(frame, [EQUIPE_FRAMES - s(0.8), EQUIPE_FRAMES], [1, 0], {extrapolateLeft: 'clamp'});
  return (
    <AbsoluteFill>
      <Camera shakes={[]}>
        <Background />
        <Gate from={0} to={CHART_AT}>
          <Hook />
        </Gate>
        <Gate from={CHART_AT} to={OUTRO_AT}>
          <Chart />
        </Gate>
        <Gate from={OUTRO_AT} to={99}>
          <Outro at={OUTRO_AT} />
        </Gate>
      </Camera>
      <Header hideAt={OUTRO_AT} />
      <Footer hideAt={OUTRO_AT} />
      <Wipe at={CHART_AT} />
      <Wipe at={OUTRO_AT} />
      <Captions captions={captions} />
      <Audio src={staticFile('voix-off-equipe.m4a')} volume={fadeAudio} />
      <SfxTrack cues={CUES} />
    </AbsoluteFill>
  );
};
