import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {easeInOut, easeOut, Enter, Gate, Kinetic, prog, useT} from '../anim';
import {PhotoCard, RED} from '../charte/ui';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {Camera, Flash, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {Stamp} from '../danger2/ui';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {colors, handFont, s, sansFont} from '../theme';
import {captions} from './captions';

const LOGO = 'promo/logo.png';
const Z1 = 5.0;
const Z2 = 17.46;
const Z3 = 34.98;
const RECAP = 43.0;
const OUTRO_AT = 53.2;
export const ZONES_FRAMES = s(56.6);

const BLUE = '#2E78C8';
const ORANGE = '#EE7D1A';
const ZONES: [string, string, string][] = [['Lieu de travail', BLUE, 'batiment'], ['Accident de trajet', ORANGE, 'voiture'], ['Vie courante', RED, 'canape']];

/** Bandeau de zone (n°, titre) et suivi 1-2-3. */
const ZoneTag: React.FC<{n: number; at: number; title: string}> = ({n, at, title}) => {
  const t = useT();
  const [, c] = ZONES[n - 1];
  const p = prog(t, at, at + 0.4, easeOut);
  return (
    <div style={{position: 'absolute', left: 40, right: 40, top: 300, display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: p, transform: `translateY(${(1 - p) * -30}px)`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14, background: c, color: '#fff', borderRadius: 40, padding: '10px 26px 10px 10px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, letterSpacing: 1.5, textTransform: 'uppercase', boxShadow: '0 10px 22px rgba(14,30,60,0.2)', whiteSpace: 'nowrap'}}>
        <div style={{width: 56, height: 56, borderRadius: '50%', background: '#fff', color: c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34}}>{n}</div>
        Zone {n} · {title}
      </div>
      <div style={{display: 'flex', gap: 10}}>
        {ZONES.map(([, zc], k) => <div key={k} style={{width: k + 1 === n ? 44 : 16, height: 16, borderRadius: 8, background: k + 1 <= n ? zc : '#D5D9DE'}} />)}
      </div>
    </div>
  );
};

/** Pastille icône + libellé (nœud de carte). */
const Node: React.FC<{at: number; x: number; y: number; icon: string; label: string; color: string; size?: number}> = ({at, x, y, icon, label, color, size = 150}) => (
  <Enter at={at} x={x} y={y} bouncy>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, background: '#fff', borderRadius: 30, padding: '18px 26px 14px', boxShadow: '0 14px 28px rgba(14,30,60,0.18)', borderBottom: `8px solid ${color}`}}>
      <F n={icon} size={size} float={4} />
      <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: colors.navy, whiteSpace: 'nowrap'}}>{label}</div>
    </div>
  </Enter>
);

/** Pastille de validation qui rebondit. */
const Badge: React.FC<{at: number; x: number; y: number; ok?: boolean; size?: number}> = ({at, x, y, ok = true, size = 76}) => {
  const t = useT();
  const p = prog(t, at, at + 0.35, easeOut);
  if (p <= 0) return null;
  return (
    <div style={{position: 'absolute', left: x - size / 2, top: y - size / 2, width: size, height: size, borderRadius: '50%', background: ok ? colors.green : RED, border: '6px solid #fff', boxShadow: '0 8px 16px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${0.4 + 0.6 * p + 0.15 * Math.sin(p * Math.PI)})`}}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24">
        {ok ? <path d="M4 12.5 L10 18 L20 6" stroke="#fff" strokeWidth={3.8} fill="none" strokeLinecap="round" strokeLinejoin="round" /> : <path d="M6 6 L18 18 M18 6 L6 18" stroke="#fff" strokeWidth={3.8} strokeLinecap="round" />}
      </svg>
    </div>
  );
};

const Intro: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Kinetic text="Accident du *travail*" at={0.1} y={540} size={118} />
      <Enter at={1.5} x={540} y={760} from="up">
        <div style={{fontFamily: handFont, fontSize: 62, color: colors.navy, textAlign: 'center', lineHeight: 1.1, width: 1000}}>Dans quelle <span style={{color: colors.green}}>zone</span> peut-il être <span style={{color: colors.green}}>reconnu</span> ?</div>
      </Enter>
      {ZONES.map(([l, c, ic], i) => {
        const at = 2.3 + i * 0.3;
        const p = prog(t, at, at + 0.4, easeOut);
        return (
          <div key={l} style={{position: 'absolute', left: 240 + i * 300 - 130, top: 1000, width: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, opacity: p, transform: `translateY(${(1 - p) * 80}px) scale(${0.6 + 0.4 * p})`}}>
            <div style={{width: 200, height: 200, borderRadius: '50%', background: '#fff', border: `10px solid ${c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 14px 28px rgba(14,30,60,0.18)', position: 'relative'}}>
              <F n={ic} size={120} float={5} />
              <div style={{position: 'absolute', top: -14, right: -6, width: 58, height: 58, borderRadius: '50%', background: c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i + 1}</div>
            </div>
            <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: c, textAlign: 'center'}}>{l}</div>
          </div>
        );
      })}
      <Enter at={3.4} x={540} y={1430} bouncy>
        <div style={{transform: `rotate(${Math.sin(t * 6) * 6}deg)`}}><F n="question" size={190} /></div>
      </Enter>
    </AbsoluteFill>
  );
};

/** Zone 1 : la carte du lieu de travail. */
const Zone1: React.FC = () => {
  const t = useT();
  const C = {x: 540, y: 960};
  const sats: [number, number, number][] = [[250, 610, 10.34], [830, 610, 11.16], [540, 1330, 12.34]];
  const halo = prog(t, 7.7, 8.4, easeOut);
  return (
    <AbsoluteFill>
      <ZoneTag n={1} at={Z1} title="Lieu de travail" />
      <div style={{position: 'absolute', left: 50, right: 50, top: 440, height: 1060, borderRadius: 90, background: `rgba(46,120,200,${0.09 * halo})`, border: `6px dashed rgba(46,120,200,${0.6 * halo})`, transform: `scale(${0.85 + 0.15 * halo})`}} />
      <Enter at={5.6} x={540} y={960} until={9.2}>
        <div style={{fontFamily: handFont, fontSize: 70, color: BLUE, textAlign: 'center', width: 900}}>le lieu de travail<br />proprement dit</div>
      </Enter>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {sats.map(([x, y, at]) => {
          const p = prog(t, at - 0.1, at + 0.35, easeInOut);
          return <line key={at} x1={C.x} y1={C.y} x2={C.x + (x - C.x) * p} y2={C.y + (y - C.y) * p} stroke={BLUE} strokeWidth={8} strokeDasharray="18 12" strokeLinecap="round" />;
        })}
      </svg>
      <PhotoCard src="zones/entrepot.jpg" at={9.34} x={C.x} y={C.y} w={420} h={280} from="scale" label="Entreprise" icon="batiment" />
      <PhotoCard src="zones/chantier.jpg" at={10.34} x={250} y={610} w={380} h={250} rotate={-3} from="left" label="Chantier" />
      <PhotoCard src="zones/client.jpg" at={11.16} x={830} y={610} w={380} h={250} rotate={3} from="right" pos="50% 70%" label="Client" />
      <Node at={12.34} x={540} y={1330} icon="camion" label="Fournisseur" color={BLUE} size={130} />
      <Enter at={14.0} x={330} y={560} bouncy><F n="collision" size={120} /></Enter>
      <Enter at={15.75} x={540} y={960} from="scale"><Stamp text="ACCIDENT DU TRAVAIL" p={prog(t, 15.75, 16.0)} color={BLUE} size={48} /></Enter>
      <Badge at={16.4} x={790} y={1090} size={90} />
    </AbsoluteFill>
  );
};

/** Zone 2 : l'accident de trajet. */
const Zone2: React.FC = () => {
  const t = useT();
  const top = 690;
  const bot = 1290;
  const draw = prog(t, 21.0, 23.8, easeInOut);
  const car = prog(t, 21.2, 23.9, easeInOut);
  const detour = prog(t, 24.3, 24.9, easeInOut);
  const detourOut = 1 - prog(t, 25.9, 26.3);
  const branch = (at: number) => prog(t, at - 0.2, at + 0.5, easeInOut);
  const scene2 = t >= 20.0;
  return (
    <AbsoluteFill>
      <ZoneTag n={2} at={Z2} title="Accident de trajet" />
      {!scene2 && (
        <>
          <PhotoCard src="zones/accident-voiture.jpg" at={Z2 + 0.2} until={20.0} x={540} y={860} w={960} h={580} from="scale" />
          <Enter at={18.3} until={20.0} x={820} y={620} bouncy><F n="collision" size={170} /></Enter>
          <Kinetic text="Accident du *trajet*" at={18.25} until={20.0} y={1340} size={96} accent={ORANGE} />
        </>
      )}
      {scene2 && (
        <>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <line x1={540} y1={bot} x2={540} y2={bot - (bot - top) * draw} stroke={ORANGE} strokeWidth={14} strokeDasharray="26 16" strokeLinecap="round" />
            {detour > 0 && (
              <g opacity={detourOut}>
                <path d={`M540 1160 C 1000 1160, 1000 820, 540 820`} fill="none" stroke={RED} strokeWidth={10} strokeDasharray="20 14" strokeLinecap="round" pathLength={1} style={{strokeDasharray: `${detour} 1`}} />
              </g>
            )}
            {[[200, 980, 31.0], [870, 980, 33.4]].map(([x, y, at]) => {
              const p = branch(at);
              return p > 0 ? <path key={at} d={`M540 1180 Q ${x} ${y + 200} ${x} ${y} Q ${x} ${y - 200} 540 780`} fill="none" stroke={colors.green} strokeWidth={9} strokeLinecap="round" pathLength={1} style={{strokeDasharray: `${p} 1`}} /> : null;
            })}
          </svg>
          <PhotoCard src="zones/entrepot.jpg" at={20.1} x={540} y={560} w={380} h={230} from="up" label="Entreprise" icon="batiment" />
          <Node at={22.3} x={540} y={1400} icon="maison" label="Domicile" color={ORANGE} size={120} />
          <Enter at={21.3} x={540} y={985}>
            <div style={{background: ORANGE, color: '#fff', borderRadius: 20, padding: '10px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, whiteSpace: 'nowrap', boxShadow: '0 10px 20px rgba(0,0,0,0.18)'}}>Trajet normal</div>
          </Enter>
          {car > 0 && car < 1 && <div style={{position: 'absolute', left: 540 - 55, top: bot - (bot - top) * car - 55, transform: 'rotate(-90deg)'}}><F n="voiture" size={110} /></div>}
          {detour > 0 && (
            <div style={{position: 'absolute', left: 770, top: 920, opacity: detourOut, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
              <div style={{transform: `scale(${prog(t, 24.7, 25.0, easeOut)})`}}><F n="croix" size={110} /></div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: RED, textAlign: 'center', lineHeight: 1.05, opacity: prog(t, 24.8, 25.1)}}>Détour<br />injustifié</div>
            </div>
          )}
          <Node at={31.0} x={200} y={980} icon="ecole" label="Enfants" color={colors.green} size={110} />
          <PhotoCard src="zones/boulangerie.jpg" at={33.35} x={860} y={980} w={330} h={220} rotate={2} from="right" pos="50% 40%" label="Boulangerie" />
          <Badge at={31.6} x={300} y={880} />
          <Badge at={34.0} x={1000} y={880} />
          <Enter at={26.4} x={540} y={1560} bouncy>
            <div style={{display: 'flex', alignItems: 'center', gap: 12, background: '#fff', border: `5px solid ${colors.green}`, borderRadius: 22, padding: '8px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: colors.green, whiteSpace: 'nowrap'}}>
              <F n="check" size={46} /> Détours de la vie quotidienne admis
            </div>
          </Enter>
        </>
      )}
    </AbsoluteFill>
  );
};

/** Zone 3 : vie courante et droit commun. */
const Zone3: React.FC = () => {
  const t = useT();
  const cards: [string, string, number, number][] = [['Activité privée', 'canape', 36.2, 290], ['Droit commun', 'balance', 38.0, 790]];
  return (
    <AbsoluteFill>
      <ZoneTag n={3} at={Z3} title="Vie courante" />
      {cards.map(([l, ic, at, x]) => (
        <Enter key={l} at={at} x={x} y={720} bouncy>
          <div style={{width: 420, height: 340, background: '#fff', borderRadius: 34, boxShadow: '0 16px 32px rgba(14,30,60,0.18)', borderBottom: `10px solid ${RED}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16}}>
            <F n={ic} size={170} float={5} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: colors.navy}}>{l}</div>
          </div>
        </Enter>
      ))}
      <Kinetic text="Pas *automatiquement*" at={39.3} y={1080} size={80} accent={RED} />
      <Enter at={40.5} x={540} y={1210} from="up">
        <div style={{fontFamily: handFont, fontSize: 62, color: colors.navy, whiteSpace: 'nowrap'}}>considérées comme accidents du travail</div>
      </Enter>
      <Enter at={41.5} x={540} y={1420} from="scale"><Stamp text="NON AUTOMATIQUE" p={prog(t, 41.5, 41.75)} color={RED} size={60} rotate={-6} /></Enter>
    </AbsoluteFill>
  );
};

/** Récapitulatif des 3 zones. */
const Recap: React.FC = () => {
  const t = useT();
  const rows: [string, string, string, number, boolean | null, string][] = [
    ['Lieu de travail', 'Entreprise · chantier · client · fournisseur', 'batiment', 44.84, true, 'Accident du travail'],
    ['Trajet', 'Domicile ⇄ entreprise, détours nécessaires', 'voiture', 46.3, true, 'Accident de trajet'],
    ['Autres déplacements', 'Vie courante · droit commun', 'canape', 47.56, false, 'Non automatique'],
  ];
  const sweep = prog(t, 51.2, 52.6, easeInOut);
  return (
    <AbsoluteFill>
      <Kinetic text="3 zones à *distinguer*" at={RECAP + 0.1} y={420} size={82} />
      {rows.map(([title, sub, ic, at, ok, verdict], i) => {
        const c = ZONES[i][1];
        const p = prog(t, at - 0.15, at + 0.3, easeOut);
        return (
          <div key={title} style={{position: 'absolute', left: 50, width: 980, top: 560 + i * 210, height: 180, background: '#fff', borderRadius: 30, boxShadow: '0 14px 28px rgba(14,30,60,0.15)', borderLeft: `16px solid ${c}`, display: 'flex', alignItems: 'center', gap: 22, padding: '0 26px', opacity: p, transform: `translateX(${(1 - p) * -120}px)`}}>
            <div style={{width: 70, height: 70, borderRadius: '50%', background: c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{i + 1}</div>
            <F n={ic} size={100} />
            <div style={{flex: 1}}>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: colors.navy}}>{title}</div>
              <div style={{fontFamily: handFont, fontSize: 32, color: '#6B7684'}}>{sub}</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: 170, opacity: prog(t, at + 0.3, at + 0.6)}}>
              <div style={{width: 60, height: 60, borderRadius: '50%', background: ok ? colors.green : RED, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${prog(t, at + 0.3, at + 0.6, easeOut)})`}}>
                <svg width={34} height={34} viewBox="0 0 24 24">{ok ? <path d="M4 12.5 L10 18 L20 6" stroke="#fff" strokeWidth={3.8} fill="none" strokeLinecap="round" strokeLinejoin="round" /> : <path d="M6 6 L18 18 M18 6 L6 18" stroke="#fff" strokeWidth={3.8} strokeLinecap="round" />}</svg>
              </div>
              <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 21, color: ok ? colors.green : RED, textAlign: 'center', lineHeight: 1.05}}>{verdict}</div>
            </div>
          </div>
        );
      })}
      <Enter at={48.9} x={540} y={1270} bouncy>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: colors.navy, color: '#fff', borderRadius: 24, padding: '10px 28px', fontFamily: sansFont, fontWeight: 900, fontSize: 38, letterSpacing: 2}}>
          <F n="loupe" size={60} /> EN QHSE
        </div>
      </Enter>
      <Kinetic text="Une distinction *fondamentale*" at={50.2} y={1420} size={70} />
      {t >= 51.2 && <div style={{position: 'absolute', left: 80 + sweep * 820, top: 720 + Math.sin(sweep * Math.PI * 2) * 200, opacity: 1 - prog(t, 52.6, 53.0)}}><F n="loupe2" size={130} /></div>}
    </AbsoluteFill>
  );
};

/** Bruitages seuls (ni musique ni ambiance), calés sur les actions visibles. */
const CUES: Sfx[] = [
  {at: 0.1, s: 'bass-hit', v: 0.55},
  {at: 1.5, s: 'sfx/swish', v: 0.45},
  ...[2.3, 2.6, 2.9].map((at) => ({at, s: 'sfx/pop', v: 0.5})),
  {at: 3.4, s: 'sfx/ding', v: 0.45},
  // zone 1
  {at: Z1 - 0.3, s: 'soft-whoosh', v: 0.5},
  {at: Z1 + 0.05, s: 'deep-hit', v: 0.5},
  {at: 7.7, s: 'riser', v: 0.3, dur: 0.8},
  {at: 9.34, s: 'sfx/whoosh', v: 0.5},
  {at: 10.34, s: 'soft-whoosh', v: 0.45},
  {at: 11.16, s: 'soft-whoosh', v: 0.45},
  {at: 12.34, s: 'sfx/pop', v: 0.5},
  {at: 14.0, s: 'deep-hit', v: 0.6},
  {at: 15.75, s: 'tampon', v: 0.75},
  {at: 16.4, s: 'validation', v: 0.5},
  // zone 2
  {at: Z2 - 0.3, s: 'soft-whoosh', v: 0.5},
  {at: Z2 + 0.2, s: 'sfx/whoosh', v: 0.45},
  {at: 18.35, s: 'sfx/thud', v: 0.75},
  {at: 18.37, s: 'bass-hit', v: 0.6},
  {at: 20.0, s: 'soft-whoosh', v: 0.45},
  {at: 21.0, s: 'stylo', v: 0.45, dur: 1.6},
  {at: 22.3, s: 'sfx/pop', v: 0.5},
  {at: 24.3, s: 'sfx/swish', v: 0.45},
  {at: 24.7, s: 'alarme', v: 0.22, dur: 0.8},
  {at: 26.4, s: 'notification', v: 0.45},
  {at: 31.0, s: 'sfx/pop', v: 0.5},
  {at: 31.6, s: 'validation', v: 0.45},
  {at: 33.35, s: 'soft-whoosh', v: 0.45},
  {at: 34.0, s: 'validation', v: 0.45},
  // zone 3
  {at: Z3 - 0.3, s: 'soft-whoosh', v: 0.5},
  {at: Z3 + 0.05, s: 'deep-hit', v: 0.5},
  {at: 36.2, s: 'sfx/pop', v: 0.5},
  {at: 38.0, s: 'sfx/pop', v: 0.5},
  {at: 39.3, s: 'tension', v: 0.3, dur: 1.6},
  {at: 41.5, s: 'tampon', v: 0.75},
  // récap
  {at: RECAP - 0.3, s: 'soft-whoosh', v: 0.5},
  {at: RECAP + 0.1, s: 'bass-hit', v: 0.5},
  ...[44.84, 46.3, 47.56].flatMap((at, i) => [{at: at - 0.15, s: 'sfx/swish', v: 0.42}, {at: at + 0.3, s: i < 2 ? 'tick' : 'sfx/click', v: 0.55}]),
  {at: 48.9, s: 'sfx/pop', v: 0.5},
  {at: 50.2, s: 'riser', v: 0.3, dur: 0.9},
  {at: 51.08, s: 'deep-hit', v: 0.5},
  {at: OUTRO_AT - 0.4, s: 'soft-whoosh', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Zones: React.FC = () => (
  <AbsoluteFill>
    <Camera shakes={[14.0, 18.35]}>
      <Background />
      <Gate from={0} to={Z1}><Intro /></Gate>
      <Gate from={Z1} to={Z2}><Zone1 /></Gate>
      <Gate from={Z2} to={Z3}><Zone2 /></Gate>
      <Gate from={Z3} to={RECAP}><Zone3 /></Gate>
      <Gate from={RECAP} to={OUTRO_AT}><Recap /></Gate>
      <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    </Camera>
    <Header hideAt={OUTRO_AT} logo={LOGO} />
    <Footer hideAt={OUTRO_AT} />
    <Wipe at={Z1} color={BLUE} />
    <Wipe at={Z2} color={ORANGE} />
    <Wipe at={20.0} dur={0.45} color={ORANGE} />
    <Wipe at={Z3} color={RED} />
    <Wipe at={RECAP} />
    <Wipe at={OUTRO_AT} />
    <Flash at={18.35} />
    <Captions captions={captions} />
    <Audio src={staticFile('voix-off-sst.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
