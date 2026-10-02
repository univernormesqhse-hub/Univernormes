import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, Gate, kf, Kinetic, prog, Underline, useSpring, useT} from '../anim';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {Camera, Cue, SfxTrack, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {Plate} from '../components/PhotoPerson';
import {F, Pill, Tile} from '../iso/ui';
import {Outro} from '../scenes/Outro';
import {colors, s, sansFont} from '../theme';
import {captions} from './captions';
import {AGENT, Hero, Medal, NameTag, SUPERVISEUR} from './people';

const OUTRO_AT = 61.75;
export const ROLES_FRAMES = s(64.6);
const WIPES = [11.5, 26.5, 41.1];

/** Liste de missions (pastilles avec illustration 3D) qui glissent depuis un côté. */
const Missions: React.FC<{items: {at: number; n: string; label: string}[]; x: number; side: 'left' | 'right'; until: number; color: string; y0?: number}> = ({items, x, side, until, color, y0 = 700}) => (
  <>
    {items.map((m, i) => (
      <Enter key={m.label} at={m.at} until={until} x={x} y={y0 + i * 165} from={side === 'left' ? 'right' : 'left'} dist={side === 'left' ? -260 : 260}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, width: 470, background: '#fff', borderRadius: 22, padding: '14px 20px', boxShadow: '0 12px 26px rgba(30,25,10,0.16)', borderLeft: `12px solid ${color}`, fontFamily: sansFont}}>
          <F n={m.n} size={90} />
          <div style={{fontWeight: 800, fontSize: 32, color: colors.ink, lineHeight: 1.1}}>{m.label}</div>
        </div>
      </Enter>
    ))}
  </>
);

/** 0 – 11,5 s : deux piliers qu'on confond… pourtant distincts. */
const Hook: React.FC = () => {
  const t = useT();
  const a = useSpring(5.1, {damping: 14});
  const b = useSpring(6.5, {damping: 14});
  const neq = prog(t, 9.8, 10.3, easeInOut);
  const out = prog(t, 11.2, 11.5, easeIn);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Chantiers & *usines*" at={0.2} until={2.05} y={420} size={96} />
      <Kinetic text="Deux *piliers* confondus" at={2.1} until={5.05} y={420} size={80} maxWidth={1040} />
      <Kinetic text="Agent ou *Superviseur* ?" at={5.1} until={8.45} y={420} size={66} maxWidth={1060} />
      <Kinetic text="Des rôles *distincts*" at={8.5} until={11.3} y={420} size={86} />
      <Enter at={0.3} until={2.2} x={300} y={950} bouncy>
        <Tile n="chantier" size={300} color={colors.ochre} />
      </Enter>
      <Enter at={1.0} until={2.2} x={780} y={950} bouncy>
        <Tile n="usine" size={300} color={colors.navy} />
      </Enter>
      {/* deux piliers avec point d'interrogation */}
      {[0, 1].map((i) => (
        <Enter key={i} at={2.8 + i * 0.2} until={5.15} x={i ? 760 : 320} y={1050} from="up" dist={500}>
          <div style={{position: 'relative', width: 230, height: 620}}>
            <div style={{position: 'absolute', left: 0, top: 0, width: 230, height: 50, borderRadius: 10, background: colors.navy}} />
            <div style={{position: 'absolute', left: 30, top: 50, width: 170, height: 520, background: 'linear-gradient(90deg, #DDE6F0, #fff 40%, #C9D5E3)', borderLeft: `4px solid ${colors.navy}`, borderRight: `4px solid ${colors.navy}`}} />
            <div style={{position: 'absolute', left: 0, top: 570, width: 230, height: 50, borderRadius: 10, background: colors.navy}} />
            <div style={{position: 'absolute', left: 45, top: 200}}><F n="question" size={140} float={8} /></div>
          </div>
        </Enter>
      ))}
      {t > 5.1 && (
        <>
          <Plate x={290} y={900} r={240} p={a * (1 - out)} color={colors.green} />
          <Plate x={790} y={900} r={240} p={b * (1 - out)} color={colors.navy} />
          <Hero p={AGENT} cx={290} bottom={1440} h={820} reveal={a} />
          <Hero p={SUPERVISEUR} cx={790} bottom={1440} h={820} reveal={b} />
          <Enter at={5.3} until={11.3} x={290} y={1490} from="up" dist={60}><NameTag p={AGENT} size={34} /></Enter>
          <Enter at={6.7} until={11.3} x={790} y={1490} from="up" dist={60}><NameTag p={SUPERVISEUR} size={34} /></Enter>
          <Enter at={7.4} until={11.3} x={540} y={980} bouncy>
            <div style={{position: 'relative', width: 150, height: 150, borderRadius: '50%', background: neq > 0.5 ? '#D9443A' : colors.ochre, border: '8px solid #fff', boxShadow: '0 12px 26px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: '#fff', transform: `rotate(${neq * 360}deg)`}}>
              {neq > 0.5 ? '≠' : '='}
            </div>
          </Enter>
        </>
      )}
    </div>
  );
};

/** 11,5 – 26,5 s : l'Agent HSE, l'œil du terrain. */
const Agent: React.FC = () => {
  const t = useT();
  const sp = useSpring(11.6, {damping: 14});
  const out = prog(t, 26.2, 26.5, easeIn);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Plate x={290} y={880} r={300} p={sp} color={colors.green} />
      <Hero p={AGENT} cx={300} bottom={1620} h={1060} reveal={prog(t, 11.6, 12.3)} />
      <Enter at={11.8} until={26.3} x={300} y={1540} from="up" dist={60}><NameTag p={AGENT} /></Enter>
      <Kinetic text="L'*Agent HSE*" at={11.55} until={13.65} y={420} size={104} />
      <Kinetic text="L'*œil* du terrain" at={13.7} until={16.45} y={420} size={96} />
      <Kinetic text="L'action *immédiate*" at={16.5} until={26.3} y={420} size={86} />
      <Enter at={13.7} until={17.85} x={800} y={820} bouncy>
        <F n="yeux" size={260} float={8} />
      </Enter>
      <Enter at={16.5} until={17.85} x={820} y={1150} bouncy spin={30}>
        <F n="eclair" size={220} float={8} />
      </Enter>
      <Missions
        x={790}
        side="right"
        color={colors.green}
        until={26.3}
        y0={660}
        items={[
          {at: 17.95, n: 'loupe', label: 'Inspecte les installations'},
          {at: 19.75, n: 'gilet', label: 'Vérifie le port des EPI'},
          {at: 21.85, n: 'causerie', label: 'Anime les causeries'},
          {at: 22.6, n: 'danger', label: 'Signale les dangers'},
        ]}
      />
    </div>
  );
};

/** 26,5 – 41,1 s : le Superviseur HSE prend de la hauteur. */
const Superviseur: React.FC = () => {
  const t = useT();
  const sp = useSpring(26.6, {damping: 14});
  const out = prog(t, 40.8, 41.1, easeIn);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Plate x={790} y={880} r={300} p={sp} color={colors.navy} />
      <Hero p={SUPERVISEUR} cx={780} bottom={1620} h={1060} reveal={prog(t, 26.6, 27.3)} />
      <Enter at={26.8} until={40.9} x={780} y={1540} from="up" dist={60}><NameTag p={SUPERVISEUR} /></Enter>
      <Kinetic text="De son côté…" at={26.55} until={27.75} y={420} size={96} />
      <Kinetic text="Le *Superviseur HSE*" at={27.8} until={28.95} y={420} size={92} maxWidth={1040} />
      <Kinetic text="prend de la *hauteur*" at={29.0} until={31.35} y={420} size={86} maxWidth={1040} />
      <Kinetic text="Coordonner & *piloter*" at={31.4} until={40.9} y={420} size={86} maxWidth={1040} />
      <Enter at={29.0} until={31.3} x={270} y={900} bouncy>
        <div style={{position: 'relative', width: 340, height: 340}}>
          <div style={{position: 'absolute', left: 0, top: 60}}><F n="montagne" size={300} /></div>
          <div style={{position: 'absolute', left: 120, top: -30}}><F n="telescope" size={200} float={6} /></div>
        </div>
      </Enter>
      <Missions
        x={290}
        side="left"
        color={colors.navy}
        until={40.9}
        y0={660}
        items={[
          {at: 31.45, n: 'puzzle', label: 'Coordonne les actions'},
          {at: 32.95, n: 'calendrier', label: 'Organise le travail des agents'},
          {at: 35.05, n: 'outils', label: 'Mesures correctives'},
          {at: 36.85, n: 'graphique', label: 'Analyse la performance'},
        ]}
      />
    </div>
  );
};

/** 41,1 – 53,9 s : en résumé (deux niveaux), puis les rôles qui s'entrecroisent. */
const Resume: React.FC = () => {
  const t = useT();
  const out = prog(t, 53.6, 53.9, easeIn);
  const levelsOut = prog(t, 49.3, 49.7, easeIn);
  const merge = prog(t, 51.6, 53.0, easeInOut);
  const verbs = (list: {at: number; v: string}[]) =>
    list.map((x, i) => (
      <span key={x.v} style={{display: 'inline-flex', alignItems: 'center', opacity: prog(t, x.at, x.at + 0.3), transform: `translateY(${(1 - prog(t, x.at, x.at + 0.3)) * 20}px)`}}>
        {i > 0 && <span style={{margin: '0 12px', opacity: 0.6}}>→</span>}
        {x.v}
      </span>
    ));
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="En *résumé*" at={41.15} until={49.4} y={420} size={110} />
      <Kinetic text="Selon la *taille*…" at={49.5} until={52.35} y={420} size={96} />
      <Kinetic text="Des rôles qui *se croisent*" at={52.4} until={53.7} y={420} size={78} maxWidth={1040} />
      {levelsOut < 1 && (
        <div style={{position: 'absolute', inset: 0, opacity: 1 - levelsOut}}>
          {/* niveau supérieur */}
          <Enter at={44.9} x={540} y={760} from="down" dist={200}>
            <div style={{width: 960, height: 280, borderRadius: 34, background: colors.navy, display: 'flex', alignItems: 'center', gap: 26, padding: '0 30px', boxShadow: '0 18px 36px rgba(14,42,92,0.3)'}}>
              <Medal p={SUPERVISEUR} r={95} ring={colors.greenLight} />
              <div style={{fontFamily: sansFont, color: '#fff'}}>
                <div style={{fontWeight: 800, fontSize: 30, color: colors.greenLight, letterSpacing: 2}}>NIVEAU SUPÉRIEUR · SUPERVISEUR</div>
                <div style={{fontWeight: 900, fontSize: 36, marginTop: 10, whiteSpace: 'nowrap'}}>{verbs([{at: 45.9, v: 'Planifie'}, {at: 46.9, v: 'Supervise'}, {at: 47.7, v: 'Fait appliquer'}])}</div>
              </div>
            </div>
          </Enter>
          {/* flèches entre niveaux */}
          {t > 45.2 && (
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <path d="M 400 920 L 400 1060" stroke={colors.navy} strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - prog(t, 45.2, 45.6)} />
              <path d="M 380 1040 L 400 1068 L 420 1040" fill="none" stroke={colors.navy} strokeWidth={12} strokeLinecap="round" opacity={prog(t, 45.5, 45.6)} />
              <path d="M 680 1060 L 680 920" stroke={colors.green} strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - prog(t, 45.4, 45.8)} />
              <path d="M 660 940 L 680 912 L 700 940" fill="none" stroke={colors.green} strokeWidth={12} strokeLinecap="round" opacity={prog(t, 45.7, 45.8)} />
              <text x={380} y={1000} textAnchor="end" fontFamily="Montserrat" fontWeight={800} fontSize={26} fill={colors.navy} opacity={prog(t, 45.6, 46.0)}>directives</text>
              <text x={700} y={1000} fontFamily="Montserrat" fontWeight={800} fontSize={26} fill={colors.green} opacity={prog(t, 45.8, 46.2)}>remontées</text>
            </svg>
          )}
          {/* la base */}
          <Enter at={42.2} x={540} y={1220} from="up" dist={200}>
            <div style={{width: 960, height: 280, borderRadius: 34, background: colors.green, display: 'flex', alignItems: 'center', gap: 26, padding: '0 30px', boxShadow: '0 18px 36px rgba(46,155,62,0.3)'}}>
              <Medal p={AGENT} r={95} ring="#fff" />
              <div style={{fontFamily: sansFont, color: '#fff'}}>
                <div style={{fontWeight: 800, fontSize: 30, color: '#E6F5E4', letterSpacing: 2}}>LA BASE · AGENT</div>
                <div style={{fontWeight: 900, fontSize: 40, marginTop: 10, whiteSpace: 'nowrap'}}>{verbs([{at: 42.4, v: 'Observe'}, {at: 43.3, v: 'Contrôle'}, {at: 44.0, v: 'Alerte'}])}</div>
              </div>
            </div>
          </Enter>
        </div>
      )}
      {/* petites structures : les deux rôles se superposent */}
      {t > 49.5 && (
        <>
          <Enter at={49.6} until={53.7} x={540} y={640} bouncy>
            <div style={{display: 'flex', gap: 30, alignItems: 'flex-end'}}>
              <F n="batiment" size={interpolate(prog(t, 50.5, 51.2), [0, 1], [160, 110])} />
              <F n="usine" size={160} />
            </div>
          </Enter>
          <div style={{position: 'absolute', left: interpolate(merge, [0, 1], [220, 380]), top: 1050, transform: 'translate(-50%, -50%)', opacity: prog(t, 49.7, 50.1)}}>
            <div style={{width: 420, height: 420, borderRadius: '50%', background: 'rgba(46,155,62,0.18)', border: `8px solid ${colors.green}`, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 40}}>
              <Medal p={AGENT} r={90} />
            </div>
          </div>
          <div style={{position: 'absolute', left: interpolate(merge, [0, 1], [860, 700]), top: 1050, transform: 'translate(-50%, -50%)', opacity: prog(t, 49.9, 50.3)}}>
            <div style={{width: 420, height: 420, borderRadius: '50%', background: 'rgba(14,42,92,0.14)', border: `8px solid ${colors.navy}`, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 40}}>
              <Medal p={SUPERVISEUR} r={90} />
            </div>
          </div>
          <Enter at={52.6} until={53.7} x={540} y={1050} bouncy>
            <F n="poignee" size={150} />
          </Enter>
        </>
      )}
    </div>
  );
};

/** 53,9 – 61,6 s : la chaîne de sécurité, et vous ? */
const Final: React.FC = () => {
  const t = useT();
  const chain = prog(t, 54.0, 55.0, easeOut);
  const pulseA = t > 59.5 && t < 60.6 ? 1 + 0.05 * Math.sin(t * 14) : 1;
  const pulseB = t > 60.6 ? 1 + 0.05 * Math.sin(t * 14) : 1;
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <Kinetic text="Votre place dans la *chaîne*" at={53.95} until={58.15} y={420} size={74} maxWidth={1040} />
      <Kinetic text="Et vous ?" at={58.2} until={61.7} y={420} size={110} />
      {t < 58.3 && (
        <div style={{position: 'absolute', inset: 0, opacity: 1 - prog(t, 57.9, 58.3)}}>
          {[0, 1, 2, 3, 4].map((i) => {
            const show = Math.max(0, Math.min(1, chain * 5 - i));
            const x = 140 + i * 200;
            const center = i === 1 || i === 3;
            return (
              <div key={i} style={{position: 'absolute', left: x, top: 1000, transform: `translate(-50%, -50%) scale(${show}) rotate(${i % 2 ? 0 : 90}deg)`}}>
                {center ? <div style={{transform: `rotate(0deg)`}}><Medal p={i === 1 ? AGENT : SUPERVISEUR} r={92} /></div> : <F n="maillon" size={170} />}
              </div>
            );
          })}
          <Enter at={56.5} until={58.2} x={540} y={1280} bouncy>
            <Pill label="Chaîne de sécurité" icon="bouclier" />
          </Enter>
        </div>
      )}
      {t > 58.4 && (
        <>
          <Enter at={59.5} until={61.7} x={290} y={1030} bouncy>
            <div style={{width: 430, borderRadius: 34, background: '#fff', boxShadow: '0 18px 36px rgba(30,25,10,0.18)', padding: '30px 20px', textAlign: 'center', borderTop: `16px solid ${colors.green}`, transform: `scale(${pulseA})`}}>
              <div style={{display: 'flex', justifyContent: 'center'}}><Medal p={AGENT} r={110} /></div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: colors.green, marginTop: 22}}>ACTION</div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: colors.navy}}>TERRAIN</div>
            </div>
          </Enter>
          <Enter at={60.6} until={61.7} x={790} y={1030} bouncy>
            <div style={{width: 430, borderRadius: 34, background: '#fff', boxShadow: '0 18px 36px rgba(30,25,10,0.18)', padding: '30px 20px', textAlign: 'center', borderTop: `16px solid ${colors.navy}`, transform: `scale(${pulseB})`}}>
              <div style={{display: 'flex', justifyContent: 'center'}}><Medal p={SUPERVISEUR} r={110} /></div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: colors.navy, marginTop: 22}}>PILOTAGE</div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: colors.green}}>GLOBAL</div>
            </div>
          </Enter>
          <Enter at={58.6} until={61.7} x={540} y={700} bouncy rotate={Math.sin(t * 5) * 8}>
            <F n="question" size={170} />
          </Enter>
          <Underline at={58.5} until={61.7} x={540} y={490} width={340} />
        </>
      )}
    </div>
  );
};

const CUES: Cue[] = [
  {at: 0.2, sfx: 'whoosh', volume: 0.3},
  {at: 0.3, sfx: 'pop', volume: 0.3},
  {at: 1.0, sfx: 'pop', volume: 0.3},
  {at: 2.8, sfx: 'thud', volume: 0.3},
  {at: 3.0, sfx: 'thud', volume: 0.3},
  {at: 5.1, sfx: 'rise', volume: 0.25},
  {at: 5.15, sfx: 'whoosh', volume: 0.3},
  {at: 6.55, sfx: 'whoosh', volume: 0.3},
  {at: 7.4, sfx: 'pop', volume: 0.35},
  {at: 9.9, sfx: 'swish', volume: 0.35},
  {at: 10.2, sfx: 'thud', volume: 0.45},
  ...WIPES.map((at) => ({at: at - 0.35, sfx: 'whoosh', volume: 0.45})),
  {at: 11.6, sfx: 'rise', volume: 0.25},
  {at: 13.7, sfx: 'pop', volume: 0.3},
  {at: 16.5, sfx: 'swish', volume: 0.35},
  ...[17.95, 19.75, 21.85, 22.6].map((at) => ({at, sfx: 'pop', volume: 0.28})),
  {at: 24.9, sfx: 'bell', volume: 0.25},
  {at: 26.6, sfx: 'rise', volume: 0.25},
  {at: 29.0, sfx: 'whoosh', volume: 0.3},
  ...[31.45, 32.95, 35.05, 36.85].map((at) => ({at, sfx: 'pop', volume: 0.28})),
  {at: 42.2, sfx: 'whoosh', volume: 0.3},
  ...[42.4, 43.3, 44.0].map((at) => ({at, sfx: 'click', volume: 0.3})),
  {at: 44.9, sfx: 'whoosh', volume: 0.3},
  ...[45.9, 46.9, 47.7].map((at) => ({at, sfx: 'click', volume: 0.3})),
  {at: 49.6, sfx: 'pop', volume: 0.3},
  {at: 51.6, sfx: 'swish', volume: 0.3},
  {at: 52.6, sfx: 'ding', volume: 0.35},
  ...[0, 1, 2, 3, 4].map((i) => ({at: 54.0 + i * 0.2, sfx: 'click', volume: 0.25})),
  {at: 56.5, sfx: 'pop', volume: 0.3},
  {at: 58.6, sfx: 'pop', volume: 0.35},
  {at: 59.5, sfx: 'whoosh', volume: 0.3},
  {at: 60.6, sfx: 'whoosh', volume: 0.3},
  {at: OUTRO_AT - 0.35, sfx: 'whoosh', volume: 0.45},
  {at: OUTRO_AT + 0.4, sfx: 'rise', volume: 0.3},
  {at: OUTRO_AT + 1.4, sfx: 'pop', volume: 0.35},
];

export const Roles: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeAudio = interpolate(frame, [ROLES_FRAMES - s(0.8), ROLES_FRAMES], [1, 0], {extrapolateLeft: 'clamp'});
  return (
    <AbsoluteFill>
      <Camera shakes={[10.2]}>
        <Background />
        <Gate from={0} to={11.5}><Hook /></Gate>
        <Gate from={11.5} to={26.5}><Agent /></Gate>
        <Gate from={26.5} to={41.1}><Superviseur /></Gate>
        <Gate from={41.1} to={53.9}><Resume /></Gate>
        <Gate from={53.9} to={OUTRO_AT}><Final /></Gate>
        <Gate from={OUTRO_AT} to={99}><Outro at={OUTRO_AT} /></Gate>
      </Camera>
      <Header hideAt={OUTRO_AT} />
      <Footer hideAt={OUTRO_AT} />
      {WIPES.map((at) => (
        <Wipe key={at} at={at} />
      ))}
      <Wipe at={OUTRO_AT} />
      <Captions captions={captions} />
      <Audio src={staticFile('voix-off-roles.m4a')} volume={fadeAudio} />
      <SfxTrack cues={CUES} />
    </AbsoluteFill>
  );
};
