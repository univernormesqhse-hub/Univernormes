import {AbsoluteFill, Audio, Img, staticFile} from 'remotion';
import {easeInOut, easeOut, Enter, Gate, Kinetic, prog, useT} from '../anim';
import {PhotoCard, RED} from '../charte/ui';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {Camera, Flash, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {Stamp} from '../danger2/ui';
import {F} from '../iso/ui';
import {BLUE, GOLD} from '../pieges/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {colors, handFont, s, sansFont} from '../theme';
import {captions} from './captions';

const LOGO = 'promo/logo.png';
const SITU = 5.6;
const USINE = 11.06;
const EXT = 26.6;
const PDP = 44.24;
const RULE = 59.42;
const OUTRO_AT = 68.6;
export const DUERPPDP_FRAMES = s(72.0);
const ORANGE = '#EE7D1A';

const Intro: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Kinetic text="DUERP ou plan de *prévention* ?" at={0.1} y={440} size={82} />
      <PhotoCard src="duerppdp/document-unique.jpg" at={3.2} x={290} y={900} w={460} h={330} rotate={-4} from="left" label="DUERP" icon="classeur" />
      <PhotoCard src="duerppdp/plan-prevention.jpg" at={4.2} x={790} y={900} w={460} h={330} rotate={4} pos="45% 50%" from="right" label="Plan de prévention" icon="memo" />
      <div style={{position: 'absolute', left: 490, top: 850, width: 100, height: 100, borderRadius: '50%', background: RED, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '8px solid #fff', boxShadow: '0 10px 20px rgba(0,0,0,0.25)', transform: `scale(${prog(t, 4.6, 4.9, easeOut) * (1 + 0.06 * Math.sin(t * 8))})`}}>≠</div>
      <Enter at={1.9} x={540} y={1260} from="up">
        <div style={{fontFamily: handFont, fontSize: 60, color: colors.navy, whiteSpace: 'nowrap'}}>Beaucoup les <span style={{color: RED}}>confondent</span> encore…</div>
      </Enter>
    </AbsoluteFill>
  );
};

const Situation: React.FC = () => (
  <AbsoluteFill>
    <Kinetic text="Une seule situation suffit" at={SITU + 0.4} y={440} size={84} accent={colors.green} />
    <PhotoCard src="promo/hse-machine.jpg" at={SITU + 0.3} x={540} y={960} w={940} h={640} from="scale" label="Dans un atelier" icon="usine" />
  </AbsoluteFill>
);

/** Un travailleur (icône 3D) qui entre et se place. */
const Worker: React.FC<{icon: string; x: number; y: number; at: number; from?: number; size?: number; shake?: number}> = ({icon, x, y, at, from = 0, size = 150, shake = 0}) => {
  const t = useT();
  const p = prog(t, at, at + 0.9, easeOut);
  if (p <= 0) return null;
  const xx = from ? x + (1 - p) * from : x;
  const bob = Math.abs(Math.sin(t * 9)) * 8 * (1 - p);
  return (
    <div style={{position: 'absolute', left: xx - size / 2, top: y - size / 2 - bob, opacity: Math.min(1, p * 2), transform: `rotate(${Math.sin(t * 30) * shake}deg)`}}>
      <F n={icon} size={size} />
    </div>
  );
};

/** Schéma central : chaudière, équipes, cadres DUERP et plan de prévention. */
const Diagram: React.FC = () => {
  const t = useT();
  const fire = prog(t, 16.0, 16.4, easeOut);
  const duerp = prog(t, 22.3, 23.0, easeInOut);
  const notEnough = prog(t, 44.5, 45.0);
  const pdp = prog(t, 47.6, 48.6, easeInOut);
  const coact = prog(t, 38.5, 39.5);
  const shields = prog(t, 55.0, 55.5, easeOut);
  // cadre DUERP
  const BX = 250, BY = 560, BW = 580, BH = 720;
  return (
    <AbsoluteFill>
      {/* cadre plan de prévention (pointillés jaunes) */}
      {pdp > 0 && (
        <div style={{position: 'absolute', left: 60, top: 480, width: 960, height: 900, borderRadius: 50, border: `8px dashed ${GOLD}`, background: `rgba(227,169,43,${0.08 * pdp})`, opacity: pdp, transform: `scale(${0.9 + 0.1 * pdp})`}}>
          <div style={{position: 'absolute', left: '50%', top: -36, transform: 'translateX(-50%)', background: GOLD, color: colors.navy, borderRadius: 16, padding: '10px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 40, whiteSpace: 'nowrap'}}>PLAN DE PRÉVENTION</div>
        </div>
      )}
      {/* cadre DUERP */}
      {duerp > 0 && (
        <div style={{position: 'absolute', left: BX, top: BY, width: BW, height: BH, borderRadius: 40, border: `7px solid ${notEnough > 0 ? RED : BLUE}`, background: `rgba(61,125,216,${0.07 * duerp})`, opacity: duerp, transform: `scale(${0.85 + 0.15 * duerp})`}}>
          <div style={{position: 'absolute', left: '50%', top: -32, transform: 'translateX(-50%)', background: notEnough > 0 ? RED : BLUE, color: '#fff', borderRadius: 14, padding: '8px 24px', fontFamily: sansFont, fontWeight: 900, fontSize: 36}}>DUERP</div>
        </div>
      )}
      {/* chaudière */}
      <div style={{position: 'absolute', left: 340, top: 600, width: 400, height: 360, borderRadius: 32, overflow: 'hidden', border: '8px solid #fff', boxShadow: '0 16px 32px rgba(14,30,60,0.25)', opacity: prog(t, USINE + 0.2, USINE + 0.7), transform: `scale(${0.85 + 0.15 * prog(t, USINE + 0.2, USINE + 0.8, easeOut)})`}}>
        <Img src={staticFile('promo/raffinerie.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, background: 'rgba(14,42,92,0.85)', color: '#fff', textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 28, padding: '6px 0'}}>Chaudière industrielle</div>
      </div>
      {/* risque de brûlure */}
      {fire > 0 && [[320, 620], [730, 640]].map(([x, y], k) => (
        <div key={k} style={{position: 'absolute', left: x - 50, top: y - 50, transform: `scale(${fire * (1 + 0.08 * Math.sin(t * 7 + k))})`}}><F n="feu" size={100} /></div>
      ))}
      <Enter at={16.5} until={22.2} x={540} y={520} bouncy>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, background: RED, color: '#fff', borderRadius: 18, padding: '8px 20px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, whiteSpace: 'nowrap'}}><F n="chaud" size={48} /> Brûlure : risque permanent</div>
      </Enter>
      {/* salariés internes */}
      <Worker icon="salarie" x={400} y={1110} at={12.5} />
      <Worker icon="salariee" x={680} y={1110} at={12.9} />
      <Enter at={20.2} until={EXT} x={540} y={1235}>
        <div style={{fontFamily: handFont, fontSize: 40, color: BLUE, whiteSpace: 'nowrap'}}>tes propres salariés</div>
      </Enter>
      <Enter at={23.9} until={EXT + 0.5} x={540} y={1330} bouncy>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, background: BLUE, color: '#fff', borderRadius: 18, padding: '8px 22px', fontFamily: sansFont, fontWeight: 800, fontSize: 32, whiteSpace: 'nowrap'}}><F n="bouclier" size={48} /> Prévention interne</div>
      </Enter>
      {/* intervenants extérieurs */}
      <Worker icon="intervenant" x={t < 33.0 ? 150 : lerpX(t, 150, 300)} y={t < 33.0 ? 1180 : 1180} at={27.8} from={-300} />
      <Worker icon="intervenant2" x={t < 33.0 ? 930 : lerpX(t, 930, 780)} y={1180} at={28.1} from={300} />
      <Enter at={28.4} until={33.0} x={540} y={1360} bouncy>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, background: ORANGE, color: '#fff', borderRadius: 18, padding: '8px 22px', fontFamily: sansFont, fontWeight: 800, fontSize: 32, whiteSpace: 'nowrap'}}><F n="outils" size={48} /> Entreprise de maintenance extérieure</div>
      </Enter>
      {/* coactivité : interférences */}
      {coact > 0 && (
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          {[[300, 1180, 400, 1110], [780, 1180, 680, 1110], [300, 1180, 680, 1110], [780, 1180, 400, 1110]].map(([x1, y1, x2, y2], k) => (
            <path key={k} d={`M${x1} ${y1} Q ${(x1 + x2) / 2} ${(y1 + y2) / 2 + 60 * Math.sin(t * 5 + k)} ${x2} ${y2}`} stroke={RED} strokeWidth={6} fill="none" strokeDasharray="14 10" strokeDashoffset={-t * 60} opacity={coact * (1 - shields * 0.8)} />
          ))}
        </svg>
      )}
      {[[540, 1040, 40.2], [470, 1180, 40.5], [620, 1180, 40.8]].map(([x, y, at], k) => {
        const p = prog(t, at, at + 0.3, easeOut) * (1 - shields);
        return p > 0 ? <div key={k} style={{position: 'absolute', left: x - 34, top: y - 34, transform: `scale(${p})`}}><F n="danger" size={68} /></div> : null;
      })}
      <Enter at={41.9} until={PDP + 1.5} x={540} y={1440} from="scale"><Stamp text="COACTIVITÉ" p={prog(t, 41.9, 42.15)} color={RED} size={60} rotate={-5} /></Enter>
      {/* DUERP insuffisant */}
      <Enter at={44.6} until={47.4} x={830} y={1340} from="scale"><Stamp text="NE SUFFIT PLUS" p={prog(t, 44.6, 44.85)} color={RED} size={40} rotate={8} /></Enter>
      {/* boucliers : personne ne met l'autre en danger */}
      {shields > 0 && [[400, 1010, BLUE], [680, 1010, BLUE], [300, 1080, ORANGE], [780, 1080, ORANGE]].map(([x, y], k) => (
        <div key={k} style={{position: 'absolute', left: (x as number) - 36, top: (y as number) - 36, transform: `scale(${shields})`}}><F n="bouclier" size={72} /></div>
      ))}
    </AbsoluteFill>
  );
};
const lerpX = (t: number, a: number, b: number) => a + (b - a) * prog(t, 33.2, 34.6, easeInOut);

/** Titres et étiquettes au-dessus du schéma, par phase. */
const Titles: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Kinetic text="Imagine cette *usine*" at={USINE + 0.1} until={EXT - 0.2} y={400} size={76} />
      <Kinetic text="La situation *bascule*" at={31.5} until={PDP - 0.2} y={400} size={76} accent={ORANGE} />
      <Kinetic text="Le plan de *prévention*" at={47.0} until={RULE - 0.2} y={360} size={72} accent={GOLD} />
      <Gate from={49.8} to={RULE}>
        <div style={{position: 'absolute', left: 60, right: 60, top: 1420, display: 'flex', flexDirection: 'column', gap: 12}}>
          {[['Coordonner les règles de sécurité', 51.16, 'cadenas'], ['Spécifiques à l\'intervention externe', 53.0, 'outils'], ['Aucun danger mutuel sur le site', 55.0, 'bouclier']].map(([l, at, ic]) => {
            const p = prog(t, (at as number) - 0.1, (at as number) + 0.3, easeOut);
            return (
              <div key={l as string} style={{display: 'flex', alignItems: 'center', gap: 16, background: '#fff', borderRadius: 22, padding: '10px 22px', borderLeft: `12px solid ${GOLD}`, boxShadow: '0 8px 18px rgba(14,30,60,0.12)', opacity: p, transform: `translateX(${(1 - p) * -80}px)`}}>
                <F n={ic as string} size={54} />
                <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: colors.navy}}>{l}</div>
              </div>
            );
          })}
        </div>
      </Gate>
    </AbsoluteFill>
  );
};

/** Règle d'or : deux colonnes. */
const Rule: React.FC = () => {
  const t = useT();
  const cols: [string, string, string, string, string, number][] = [
    ['DUERP', 'duerppdp/document-unique.jpg', 'Protège tes propres salariés', 'salarie', BLUE, 61.2],
    ['Plan de prévention', 'duerppdp/plan-prevention.jpg', "Sécurise l'intervention des prestataires", 'intervenant', ORANGE, 64.2],
  ];
  return (
    <AbsoluteFill>
      <Kinetic text="Retiens cette *règle d'or*" at={RULE + 0.1} y={400} size={78} accent={GOLD} />
      {cols.map(([l, img, txt, ic, c, at], k) => {
        const p = prog(t, at - 0.3, at + 0.3, easeOut);
        return (
          <div key={l} style={{position: 'absolute', left: 60 + k * 500, top: 540, width: 460, borderRadius: 34, overflow: 'hidden', background: '#fff', boxShadow: '0 16px 32px rgba(14,30,60,0.18)', border: `6px solid ${c}`, opacity: p, transform: `translateY(${(1 - p) * 80}px)`}}>
            <div style={{background: c, color: '#fff', padding: '14px 20px', fontFamily: sansFont, fontWeight: 900, fontSize: l.length > 10 ? 34 : 44, textAlign: 'center'}}>{l}</div>
            <div style={{height: 300, backgroundImage: `url(${staticFile(img)})`, backgroundSize: 'cover', backgroundPosition: '50% 50%'}} />
            <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '20px 20px 24px'}}>
              <F n={ic} size={96} />
              <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: colors.navy, lineHeight: 1.15}}>{txt}</div>
            </div>
          </div>
        );
      })}
      <Enter at={67.0} x={540} y={1360} from="scale"><Stamp text="RÈGLE D'OR" p={prog(t, 67.0, 67.25)} color={GOLD} size={58} rotate={-6} /></Enter>
    </AbsoluteFill>
  );
};

/** Bruitages seuls (ni musique ni ambiance). */
const CUES: Sfx[] = [
  {at: 0.1, s: 'bass-hit', v: 0.55},
  {at: 1.9, s: 'sfx/swish', v: 0.42},
  {at: 3.2, s: 'sfx/whoosh', v: 0.5},
  {at: 4.2, s: 'sfx/whoosh', v: 0.5},
  {at: 4.6, s: 'deep-hit', v: 0.55},
  {at: SITU - 0.3, s: 'soft-whoosh', v: 0.5},
  {at: SITU + 0.3, s: 'sfx/whoosh', v: 0.45},
  {at: USINE - 0.3, s: 'soft-whoosh', v: 0.5},
  {at: USINE + 0.2, s: 'sfx/pop', v: 0.5},
  {at: 12.5, s: 'sfx/pop', v: 0.45},
  {at: 12.9, s: 'sfx/pop', v: 0.45},
  {at: 16.0, s: 'sfx/whoosh', v: 0.5},
  {at: 16.5, s: 'alarme', v: 0.2, dur: 0.7},
  {at: 22.3, s: 'stylo', v: 0.5, dur: 0.8},
  {at: 23.9, s: 'validation', v: 0.5},
  {at: EXT - 0.3, s: 'soft-whoosh', v: 0.5},
  {at: 27.8, s: 'sfx/swish', v: 0.45},
  {at: 28.1, s: 'sfx/swish', v: 0.45},
  {at: 28.4, s: 'sfx/pop', v: 0.45},
  {at: 31.5, s: 'deep-hit', v: 0.6},
  {at: 31.52, s: 'bass-hit', v: 0.5},
  {at: 33.2, s: 'soft-whoosh', v: 0.45},
  {at: 38.5, s: 'tension', v: 0.3, dur: 2.5},
  ...[40.2, 40.5, 40.8].map((at) => ({at, s: 'sfx/pop', v: 0.45})),
  {at: 41.9, s: 'tampon', v: 0.75},
  {at: 44.6, s: 'tampon', v: 0.65},
  {at: 47.6, s: 'riser', v: 0.35, dur: 1.0},
  {at: 48.6, s: 'deep-hit', v: 0.5},
  ...[51.16, 53.0, 55.0].map((at) => ({at: at + 0.3, s: 'tick', v: 0.55})),
  {at: 55.0, s: 'validation', v: 0.5},
  {at: RULE - 0.3, s: 'soft-whoosh', v: 0.5},
  {at: RULE + 0.1, s: 'bass-hit', v: 0.5},
  {at: 60.9, s: 'sfx/whoosh', v: 0.45},
  {at: 63.9, s: 'sfx/whoosh', v: 0.45},
  {at: 67.0, s: 'tampon', v: 0.75},
  {at: OUTRO_AT - 0.4, s: 'soft-whoosh', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const DuerpPdp: React.FC = () => (
  <AbsoluteFill>
    <Camera shakes={[31.5, 41.9]}>
      <Background />
      <Gate from={0} to={SITU}><Intro /></Gate>
      <Gate from={SITU} to={USINE}><Situation /></Gate>
      <Gate from={USINE} to={RULE}><Diagram /><Titles /></Gate>
      <Gate from={RULE} to={OUTRO_AT}><Rule /></Gate>
      <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    </Camera>
    <Header hideAt={OUTRO_AT} logo={LOGO} />
    <Footer hideAt={OUTRO_AT} />
    {[SITU, USINE, RULE, OUTRO_AT].map((at) => <Wipe key={at} at={at} />)}
    <Flash at={31.5} />
    <Captions captions={captions} />
    <Audio src={staticFile('voix-off-duerp-pdp.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
