import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, Gate, Kinetic, prog, useSpring, useT} from '../anim';
import {PhotoCard, RED, Verdict} from '../charte/ui';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {Camera, Cue, SfxTrack, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {F, Pill} from '../iso/ui';
import {Outro} from '../scenes/Outro';
import {colors, handFont, s, sansFont} from '../theme';
import {captions} from './captions';

const LOGO = 'promo/logo.png';
const OUTRO_AT = 61.7;
export const INCIDENT_FRAMES = s(64.7);
const AMBER = '#E39B1F';
const FLOOR = 1300;
const CABLE_X = 560;
const fade = (t: number, a: number, b: number) => (1 - prog(t, b - 0.3, b, easeIn)) * (t >= a ? 1 : 0);

/** Personnage simple, placé par les pieds ; rot = bascule autour des pieds ; step = balancement de marche. */
const Person: React.FC<{x: number; y?: number; rot?: number; suit?: string; o?: number; step?: number; arms?: number}> = ({x, y = FLOOR, rot = 0, suit = '#F07A2A', o = 1, step = 0, arms = 0}) => {
  const sw = Math.sin(step) * 14;
  return (
    <svg width={160} height={260} viewBox="-80 -250 160 260" style={{position: 'absolute', left: x - 80, top: y - 250, transform: `rotate(${rot}deg)`, transformOrigin: '80px 250px', overflow: 'visible', opacity: o}}>
      <circle cx={0} cy={-212} r={22} fill="#C68A5B" />
      <path d="M-26 -218 A26 26 0 0 1 26 -218 L31 -214 L-31 -214 Z" fill="#F2C230" stroke={colors.ink} strokeWidth={3} />
      <rect x={-30} y={-186} width={60} height={96} rx={16} fill={suit} stroke={colors.ink} strokeWidth={3} />
      <rect x={-30} y={-146} width={60} height={9} fill="#E6E6E6" />
      <path d={`M-28 -176 L${-48 - arms * 20} ${-118 - arms * 70} M28 -176 L${48 + arms * 20} ${-118 - arms * 70}`} stroke={suit} strokeWidth={16} strokeLinecap="round" />
      <path d={`M-12 -92 L${-16 + sw} -6 M12 -92 L${16 - sw} -6`} stroke="#2F3D57" strokeWidth={20} strokeLinecap="round" />
      <rect x={-30 + sw} y={-12} width={26} height={12} rx={5} fill={colors.ink} />
      <rect x={4 - sw} y={-12} width={26} height={12} rx={5} fill={colors.ink} />
    </svg>
  );
};

/** Câble électrique enroulé au sol ; glow = mise en évidence. */
const Cable: React.FC<{x?: number; y?: number; glow?: number; o?: number; scale?: number}> = ({x = CABLE_X, y = FLOOR, glow = 0, o = 1, scale = 1}) => (
  <svg width={260} height={90} viewBox="-130 -80 260 90" style={{position: 'absolute', left: x - 130, top: y - 80, transform: `scale(${scale})`, transformOrigin: '130px 80px', overflow: 'visible', opacity: o, filter: glow ? `drop-shadow(0 0 ${8 + glow * 14}px rgba(227,155,31,${0.5 + 0.4 * glow}))` : undefined}}>
    <path d="M-120 0 C -90 -10, -70 -60, -30 -50 C 10 -40, -20 -10, 10 -14 C 40 -18, 30 -66, 70 -56 C 110 -46, 90 -6, 120 -4" stroke="#2B2F36" strokeWidth={12} fill="none" strokeLinecap="round" />
    <path d="M-120 0 C -90 -10, -70 -60, -30 -50 C 10 -40, -20 -10, 10 -14 C 40 -18, 30 -66, 70 -56 C 110 -46, 90 -6, 120 -4" stroke={AMBER} strokeWidth={4} fill="none" strokeLinecap="round" strokeDasharray="10 14" opacity={0.8} />
  </svg>
);

/** Étiquette de qualification (INCIDENT / ACCIDENT). */
const Tag: React.FC<{title: string; sub: string; color: string; icon: string}> = ({title, sub, color, icon}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 20, background: '#fff', borderRadius: 28, padding: '18px 30px 18px 20px', boxShadow: '0 16px 34px rgba(30,25,10,0.18)', borderLeft: `14px solid ${color}`, fontFamily: sansFont}}>
    <F n={icon} size={92} />
    <div>
      <div style={{fontWeight: 900, fontSize: 56, color, letterSpacing: 1}}>{title}</div>
      <div style={{fontWeight: 700, fontSize: 30, color: colors.navy}}>{sub}</div>
    </div>
  </div>
);

/** Sol de l'atelier. */
const Floor: React.FC<{y?: number; x0?: number; x1?: number}> = ({y = FLOOR, x0 = 40, x1 = 1040}) => (
  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
    <line x1={x0} y1={y} x2={x1} y2={y} stroke={colors.navy} strokeWidth={8} strokeLinecap="round" />
    {Array.from({length: 14}, (_, i) => <line key={i} x1={x0 + 30 + i * ((x1 - x0) / 14)} y1={y + 14} x2={x0 + i * ((x1 - x0) / 14)} y2={y + 40} stroke="#C9BEA2" strokeWidth={4} />)}
  </svg>
);

/** 0 – 11,6 s : incident ou accident ? Les situations dangereuses ignorées. */
const Hook: React.FC = () => {
  const t = useT();
  const q = useSpring(4.0, {damping: 10});
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - prog(t, 11.3, 11.6, easeIn)}}>
      <Kinetic text="*Incident* ou *accident* ?" at={0.05} until={3.95} y={420} size={84} accent={AMBER} maxWidth={1000} />
      <Kinetic text="La véritable *différence*" at={4.0} until={6.55} y={420} size={78} maxWidth={1000} />
      <Kinetic text="Pas de mal… *on ignore* ?" at={6.6} until={11.5} y={420} size={76} maxWidth={1000} accent={RED} />

      {t < 6.6 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 0, 6.6)}}>
          <Enter at={1.4} x={290} y={960} from="left" dist={-500}>
            <div style={{width: 420, height: 520, borderRadius: 40, background: '#fff', border: `10px solid ${AMBER}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, boxShadow: '0 18px 36px rgba(227,155,31,0.25)'}}>
              <F n="danger" size={170} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: AMBER}}>INCIDENT</div>
            </div>
          </Enter>
          <Enter at={2.5} x={790} y={960} from="right" dist={500}>
            <div style={{width: 420, height: 520, borderRadius: 40, background: '#fff', border: `10px solid ${RED}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, boxShadow: '0 18px 36px rgba(200,64,47,0.25)'}}>
              <F n="ambulance" size={170} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: RED}}>ACCIDENT</div>
            </div>
          </Enter>
          {t > 4.0 && (
            <div style={{position: 'absolute', left: 540, top: 960, transform: `translate(-50%, -50%) scale(${q})`, width: 150, height: 150, borderRadius: '50%', background: colors.navy, border: '8px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: '#fff', boxShadow: '0 12px 26px rgba(0,0,0,0.25)'}}>?</div>
          )}
        </div>
      )}
      {t >= 6.6 && (
        <>
          <PhotoCard src="induction/marquage.jpg" at={6.65} x={540} y={940} w={940} h={680} pos="50% 55%" label="Situation dangereuse" icon="danger" />
          <Enter at={8.4} x={300} y={1400} bouncy><Pill label="Pas de blessure" icon="check" size={34} /></Enter>
          <Enter at={9.8} x={780} y={1400} bouncy><F n="haussement" size={170} /></Enter>
        </>
      )}
    </div>
  );
};

/** 11,6 – 37,7 s : le même câble, un incident puis un accident. */
const Histoire: React.FC = () => {
  const t = useT();
  // opérateur 1 : marche, trébuche, se rattrape, repart
  const w1 = prog(t, 11.7, 13.6, (v) => v);
  const trip1 = prog(t, 13.5, 14.3, easeOut) * (1 - prog(t, 15.3, 16.3, easeInOut));
  const leave1 = prog(t, 22.9, 25.0, (v) => v);
  const x1 = interpolate(w1, [0, 1], [120, CABLE_X - 40]) + leave1 * 620;
  // collègue : marche, trébuche, chute
  const w2 = prog(t, 28.6, 30.6, (v) => v);
  const fall2 = prog(t, 30.6, 32.1, easeIn);
  const x2 = interpolate(w2, [0, 1], [120, CABLE_X - 40]) + fall2 * 60;
  const glow = prog(t, 25.8, 26.3) * (1 - prog(t, 27.4, 27.6)) + prog(t, 20.4, 20.8) * (1 - prog(t, 22.6, 22.9));
  const pain = t > 32.1 ? Math.sin(t * 9) * 3 : 0;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: prog(t, 11.6, 11.9) * (1 - prog(t, 37.4, 37.7, easeIn))}}>
      <Kinetic text="Un opérateur en *usine*" at={11.6} until={13.25} y={420} size={74} maxWidth={1000} />
      <Kinetic text="Il trébuche… et se *rattrape*" at={13.3} until={17.25} y={420} size={70} maxWidth={1000} />
      <Kinetic text="C'est un *incident*" at={17.3} until={22.8} y={420} size={86} accent={AMBER} />
      <Kinetic text="Le câble *reste* là" at={22.85} until={27.45} y={420} size={82} maxWidth={1000} />
      <Kinetic text="Un collègue *tombe*" at={27.5} until={32.9} y={420} size={84} accent={RED} />
      <Kinetic text="C'est un *accident*" at={32.95} until={37.6} y={420} size={86} accent={RED} />

      <div style={{position: 'absolute', inset: 0, transform: 'scale(1.35)', transformOrigin: `540px ${FLOOR}px`}}>
      <Floor />
      <Cable glow={glow} />
      {t < 25.2 && <Person x={x1} rot={trip1 * 32} step={(w1 < 1 ? t * 9 : 0) + (leave1 > 0 && leave1 < 1 ? t * 9 : 0)} arms={trip1} o={1 - prog(t, 24.6, 25.0)} />}
      {t >= 28.5 && t < 34.3 && <Person x={x2} rot={fall2 * 82 + pain} suit="#2E6FC2" step={w2 < 1 ? t * 9 : 0} arms={fall2 * 0.6} />}
      </div>

      <Enter at={13.6} until={15.2} x={CABLE_X + 10} y={FLOOR - 330} bouncy><div style={{fontFamily: handFont, fontSize: 70, color: AMBER}}>Oups !</div></Enter>
      <Enter at={14.4} until={17.2} x={830} y={FLOOR - 160} bouncy><Pill label="Câble électrique" icon="eclair" color={AMBER} size={30} /></Enter>
      <Enter at={17.35} until={22.8} x={540} y={760} bouncy><Tag title="INCIDENT" sub="Sans blessure ni dommage" color={AMBER} icon="danger" /></Enter>
      <Enter at={20.4} until={22.8} x={540} y={1500} bouncy><Pill label="Un signal d'alerte silencieux" icon="cloche" color={AMBER} size={34} /></Enter>
      <Enter at={23.5} until={25.2} x={820} y={FLOOR - 320} bouncy><Pill label="Indemne : on passe à autre chose" icon="haussement" size={26} /></Enter>
      <Enter at={25.9} until={27.45} x={CABLE_X} y={FLOOR - 170} bouncy><Pill label="En plein passage" icon="danger" color={RED} size={32} /></Enter>
      <Enter at={28.0} until={30.3} x={820} y={FLOOR - 320} bouncy><Pill label="Plus tard…" icon="sablier" size={32} /></Enter>
      <Enter at={31.9} until={33.0} x={CABLE_X + 90} y={FLOOR - 200} bouncy><F n="eclair" size={110} /></Enter>
      <Enter at={33.0} until={34.25} x={540} y={760} bouncy><Tag title="ACCIDENT" sub="Blessure corporelle" color={RED} icon="ambulance" /></Enter>

      {t >= 34.3 && (
        <>
          <Enter at={34.35} x={540} y={760} bouncy><Tag title="ACCIDENT" sub="Blessure corporelle" color={RED} icon="ambulance" /></Enter>
          <PhotoCard src="incident/blessure-soins.jpg" at={34.4} x={540} y={1180} w={860} h={560} pos="40% 55%" label="Des soins nécessaires" icon="ambulance" from="down" />
        </>
      )}
    </div>
  );
};

/** 37,7 – 48,6 s : même événement, conséquence aléatoire ; briser la chaîne. */
const Chaine: React.FC = () => {
  const t = useT();
  const cut = prog(t, 45.4, 46.4, easeOut);
  const chain = t >= 43.6;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: prog(t, 37.7, 38.0) * (1 - prog(t, 48.3, 48.6, easeIn))}}>
      <Kinetic text="Le même *départ*" at={37.7} until={39.9} y={420} size={86} />
      <Kinetic text="Seule la *conséquence* change" at={39.95} until={41.7} y={420} size={70} maxWidth={1000} />
      <Kinetic text="Par simple *malchance*" at={41.75} until={43.55} y={420} size={78} maxWidth={1000} accent={RED} />
      <Kinetic text="Briser la *chaîne*" at={43.6} until={48.5} y={420} size={90} />

      {!chain && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 37.7, 43.6)}}>
          <Enter at={37.8} x={540} y={700} bouncy>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
              <div style={{position: 'relative', width: 260, height: 90}}><Cable x={130} y={88} glow={0.6} /></div>
              <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: colors.navy}}>Événement identique</div>
            </div>
          </Enter>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <path d="M500 800 L290 960" stroke={colors.navy} strokeWidth={6} strokeDasharray="12 10" opacity={prog(t, 38.4, 38.8)} />
            <path d="M580 800 L790 960" stroke={colors.navy} strokeWidth={6} strokeDasharray="12 10" opacity={prog(t, 38.4, 38.8)} />
          </svg>
          <Floor y={1300} x0={80} x1={500} />
          <Floor y={1300} x0={580} x1={1000} />
          <Enter at={38.5} x={290} y={1300}><div style={{position: 'relative', width: 0, height: 0}}><Person x={0} y={0} rot={12} /></div></Enter>
          <Enter at={38.7} x={790} y={1300}><div style={{position: 'relative', width: 0, height: 0}}><Person x={0} y={0} rot={82} suit="#2E6FC2" /></div></Enter>
          <Enter at={40.3} x={290} y={1420} bouncy><div style={{background: AMBER, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 36, padding: '8px 22px', borderRadius: 14}}>INCIDENT</div></Enter>
          <Enter at={40.7} x={790} y={1420} bouncy><div style={{background: RED, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 36, padding: '8px 22px', borderRadius: 14}}>ACCIDENT</div></Enter>
          <Enter at={41.8} x={540} y={1060} bouncy rotate={Math.sin(t * 6) * 14}><F n="de" size={150} /></Enter>
        </div>
      )}
      {chain && (
        <>
          {[
            {l: 'DANGER', s: 'le câble au sol', c: colors.navy, icon: 'eclair', y: 700},
            {l: 'INCIDENT', s: 'signal silencieux', c: AMBER, icon: 'danger', y: 1000},
            {l: 'ACCIDENT', s: 'blessure', c: RED, icon: 'ambulance', y: 1300},
          ].map((b, i) => (
            <Enter key={b.l} at={43.7 + i * 0.25} x={540} y={b.y} from="left" dist={-300}>
              <div style={{width: 640, display: 'flex', alignItems: 'center', gap: 20, background: '#fff', borderRadius: 26, padding: '16px 26px', boxShadow: '0 12px 26px rgba(30,25,10,0.16)', borderLeft: `14px solid ${b.c}`, fontFamily: sansFont, opacity: i === 2 ? 1 - cut * 0.55 : 1, filter: i === 2 ? `grayscale(${cut})` : undefined}}>
                <F n={b.icon} size={80} />
                <div>
                  <div style={{fontWeight: 900, fontSize: 46, color: b.c}}>{b.l}</div>
                  <div style={{fontWeight: 600, fontSize: 28, color: '#5B6675'}}>{b.s}</div>
                </div>
              </div>
            </Enter>
          ))}
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <path d="M540 770 V 930" stroke={colors.navy} strokeWidth={8} opacity={prog(t, 44.0, 44.3)} />
            <path d={`M540 1070 V ${1150 - cut * 30}`} stroke={colors.navy} strokeWidth={8} opacity={prog(t, 44.2, 44.5)} />
            <path d={`M540 ${1180 + cut * 30} V 1230`} stroke={colors.navy} strokeWidth={8} opacity={prog(t, 44.2, 44.5)} />
          </svg>
          <Enter at={44.2} x={870} y={1000} bouncy>
            <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
              <Pill label="Signaler" icon="megaphone" size={30} />
              <Pill label="Analyser" icon="loupe" size={30} />
            </div>
          </Enter>
          <Enter at={45.3} x={540} y={1165} bouncy><F n="ciseaux" size={110} /></Enter>
          <Enter at={46.6} x={540} y={1500} bouncy><Pill label="Le seul moyen d'éviter l'accident" icon="check" size={32} /></Enter>
        </>
      )}
    </div>
  );
};

/** 48,6 – 61,7 s : s'il avait signalé… le câble retiré ; prendre chaque incident au sérieux. */
const Final: React.FC = () => {
  const t = useT();
  const f = useCurrentFrame();
  const trip = prog(t, 49.0, 49.6, easeOut) * (1 - prog(t, 49.9, 50.5, easeInOut));
  const remove = prog(t, 55.3, 56.1, easeInOut);
  const bubble = prog(t, 52.0, 52.4);
  const end = t >= 56.4;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: prog(t, 48.6, 48.9) * (1 - prog(t, 61.4, 61.7, easeIn))}}>
      <Kinetic text="Retour au *premier opérateur*" at={48.65} until={50.7} y={420} size={70} maxWidth={1000} />
      <Kinetic text="S'il avait *signalé*…" at={50.75} until={54.7} y={420} size={84} maxWidth={1000} accent={AMBER} />
      <Kinetic text="… le câble *retiré*" at={54.75} until={56.4} y={420} size={84} maxWidth={1000} />
      <Kinetic text="Chaque incident *compte*" at={56.45} until={61.6} y={420} size={78} maxWidth={1000} />

      {!end && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 48.6, 56.45)}}>
          <div style={{position: 'absolute', inset: 0, transform: 'scale(1.25)', transformOrigin: `540px ${FLOOR}px`}}>
            <Floor />
            <div style={{position: 'absolute', inset: 0, transform: `translateY(${-remove * 500}px) rotate(${remove * 20}deg)`, opacity: 1 - remove}}><Cable glow={0.4} /></div>
            <Person x={CABLE_X - 40} rot={trip * 30} arms={trip} />
            <Person x={820} suit="#2E6FC2" />
          </div>
          <Enter at={50.9} x={850} y={FLOOR - 400} bouncy><Pill label="Responsable d'atelier" icon="homme-bureau" size={26} /></Enter>
          {bubble > 0 && (
            <div style={{position: 'absolute', left: 560, top: FLOOR - 560, transform: `translate(-50%, -50%) scale(${bubble})`, background: '#fff', borderRadius: 28, padding: '18px 28px', boxShadow: '0 12px 26px rgba(30,25,10,0.18)', fontFamily: handFont, fontSize: 52, color: colors.navy, whiteSpace: 'nowrap'}}>
              « Câble au sol ! »
              <div style={{position: 'absolute', left: 60, bottom: -24, width: 0, height: 0, borderLeft: '18px solid transparent', borderRight: '18px solid transparent', borderTop: '26px solid #fff'}} />
            </div>
          )}
          {t > 52.2 && t < 55.4 && (
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              {[0, 1, 2].map((i) => {
                const p = ((f / 30) * 1.2 + i / 3) % 1;
                return <circle key={i} cx={560 + p * 260} cy={FLOOR - 330 + Math.sin(p * Math.PI) * -40} r={10} fill={AMBER} opacity={1 - p} />;
              })}
            </svg>
          )}
          <Enter at={55.6} x={540} y={FLOOR + 140} bouncy>
            <div style={{background: colors.green, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 44, padding: '12px 30px', borderRadius: 18, boxShadow: '0 12px 26px rgba(46,155,62,0.35)'}}>ESPACE SÉCURISÉ</div>
          </Enter>
        </div>
      )}
      {end && (
        <>
          <Enter at={56.5} x={540} y={720} bouncy><Tag title="INCIDENT" sub="Pris au sérieux" color={AMBER} icon="loupe" /></Enter>
          {[
            {src: 'incident/chute-escalier.jpg', x: 210, pos: '55% 45%'},
            {src: 'incident/chute-entrepot.jpg', x: 540, pos: '45% 70%'},
            {src: 'incident/chute-echelle.jpg', x: 870, pos: '45% 55%'},
          ].map((p, i) => (
            <div key={p.src}>
              <PhotoCard src={p.src} at={57.6 + i * 0.25} x={p.x} y={1150} w={300} h={400} pos={p.pos} rotate={(i - 1) * 4}>
                <div style={{position: 'absolute', inset: 0, background: `rgba(255,255,255,${0.45 * prog(t, 59.4, 60.0)})`, filter: 'grayscale(1)'}} />
              </PhotoCard>
              <Enter at={59.5 + i * 0.15} x={p.x} y={1150} bouncy><Verdict ok={false} size={110} /></Enter>
            </div>
          ))}
          <Enter at={60.1} x={540} y={1480} bouncy><Pill label="Les accidents évités" icon="bouclier" size={38} /></Enter>
        </>
      )}
    </div>
  );
};

const CUES: Cue[] = [
  {at: 1.4, sfx: 'whoosh', volume: 0.3},
  {at: 2.5, sfx: 'whoosh', volume: 0.3},
  {at: 4.0, sfx: 'pop', volume: 0.35},
  {at: 6.65, sfx: 'whoosh', volume: 0.3},
  {at: 11.3, sfx: 'whoosh', volume: 0.45},
  {at: 13.5, sfx: 'swish', volume: 0.4},
  {at: 17.35, sfx: 'thud', volume: 0.4},
  {at: 20.4, sfx: 'bell', volume: 0.3},
  {at: 25.9, sfx: 'pop', volume: 0.3},
  {at: 30.6, sfx: 'swish', volume: 0.4},
  {at: 31.9, sfx: 'thud', volume: 0.6},
  {at: 33.0, sfx: 'bell', volume: 0.3},
  {at: 34.4, sfx: 'whoosh', volume: 0.3},
  {at: 37.4, sfx: 'whoosh', volume: 0.45},
  {at: 40.3, sfx: 'pop', volume: 0.3},
  {at: 40.7, sfx: 'pop', volume: 0.3},
  {at: 41.8, sfx: 'swish', volume: 0.3},
  {at: 43.7, sfx: 'swish', volume: 0.3},
  {at: 45.4, sfx: 'click', volume: 0.45},
  {at: 48.3, sfx: 'whoosh', volume: 0.45},
  {at: 52.0, sfx: 'pop', volume: 0.3},
  {at: 55.3, sfx: 'swish', volume: 0.35},
  {at: 55.6, sfx: 'ding', volume: 0.35},
  {at: 56.5, sfx: 'whoosh', volume: 0.3},
  {at: 59.5, sfx: 'click', volume: 0.35},
  {at: 60.1, sfx: 'ding', volume: 0.35},
  {at: OUTRO_AT - 0.35, sfx: 'whoosh', volume: 0.45},
  {at: OUTRO_AT + 0.4, sfx: 'rise', volume: 0.3},
  {at: OUTRO_AT + 1.4, sfx: 'pop', volume: 0.35},
];

export const IncidentAccident: React.FC = () => {
  const end = INCIDENT_FRAMES / 30;
  const music = (f: number) => interpolate(f / 30, [0, 0.3, OUTRO_AT - 0.2, OUTRO_AT + 0.4, end - 1, end], [0.26, 0.08, 0.08, 0.32, 0.32, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <Camera shakes={[31.9]}>
        <Background />
        <Gate from={0} to={11.6}><Hook /></Gate>
        <Gate from={11.6} to={37.7}><Histoire /></Gate>
        <Gate from={37.7} to={48.6}><Chaine /></Gate>
        <Gate from={48.6} to={OUTRO_AT}><Final /></Gate>
        <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
      </Camera>
      <Header hideAt={OUTRO_AT} logo={LOGO} />
      <Footer hideAt={OUTRO_AT} />
      {[11.6, 37.7, 48.6, OUTRO_AT].map((at) => <Wipe key={at} at={at} />)}
      <Captions captions={captions} />
      <Audio src={staticFile('voix-off-incident.m4a')} />
      <Audio src={staticFile('musique-promo.m4a')} volume={music} />
      <SfxTrack cues={CUES} />
    </AbsoluteFill>
  );
};

