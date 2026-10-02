import {Img, interpolate, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, Kinetic, prog, Underline, useSpring, useT} from '../anim';
import {PhotoCard, RED, Verdict} from '../charte/ui';
import {F, Pill} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';

export const ORANGE = '#E8772E';
const fade = (t: number, a: number, b: number) => (1 - prog(t, b - 0.3, b, easeIn)) * (t >= a ? 1 : 0);

/** Image de la banque (détourée ou sur fond blanc), posée dans une carte blanche. */
export const Pic: React.FC<{src: string; w: number; card?: boolean; style?: React.CSSProperties}> = ({src, w, card, style}) => (
  <div style={card ? {background: '#fff', borderRadius: 30, padding: 18, boxShadow: '0 16px 34px rgba(30,25,10,0.16)'} : undefined}>
    <Img src={staticFile(`epi/${src}`)} style={{width: w, display: 'block', ...style}} />
  </div>
);

/** Grande pastille de sigle : EPI (orange, individuel) ou EPC (vert, collectif). */
export const Sigle: React.FC<{k: 'EPI' | 'EPC'; w?: number; sub?: boolean}> = ({k, w = 420, sub = true}) => {
  const epi = k === 'EPI';
  return (
    <div style={{width: w, padding: `${w * 0.07}px 0`, borderRadius: w * 0.12, background: epi ? ORANGE : colors.green, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: `0 18px 36px ${epi ? 'rgba(232,119,46,0.35)' : 'rgba(46,155,62,0.35)'}`}}>
      <F n={epi ? 'homme-bureau' : 'equipe'} size={w * 0.34} />
      <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: w * 0.26, color: '#fff', letterSpacing: -2, lineHeight: 1}}>{k}</div>
      {sub && <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: w * 0.07, color: '#fff', opacity: 0.92, textAlign: 'center', marginTop: 6, lineHeight: 1.15}}>{epi ? 'Protection individuelle' : 'Protection collective'}</div>}
    </div>
  );
};

/** 0 – 33,6 s : accroche — EPI ou EPC, comment faire le bon choix ? */
export const Intro: React.FC = () => {
  const t = useT();
  const out = prog(t, 33.3, 33.6, easeIn);
  const vs = useSpring(9.6, {damping: 10});
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="La *sécurité* au travail" at={0.1} until={4.35} y={420} size={84} maxWidth={1000} />
      <Kinetic text="Deux *sigles*, une différence" at={4.4} until={9.25} y={420} size={74} maxWidth={1000} />
      <Kinetic text="*EPI* vs *EPC*" at={9.3} until={14.75} y={420} size={120} accent={ORANGE} />
      <Kinetic text="La base d'un travail *sûr*" at={14.8} until={19.85} y={420} size={78} maxWidth={1000} />
      <Kinetic text="Comment faire le *bon choix* ?" at={19.9} until={24.75} y={420} size={76} maxWidth={1000} />
      <Kinetic text="Un casque pour *tous* ?" at={24.8} until={26.75} y={420} size={86} accent={ORANGE} />
      <Kinetic text="Ou supprimer le danger à la *source* ?" at={26.8} until={31.15} y={420} size={68} maxWidth={1000} />
      <Kinetic text="On *décortique* !" at={31.2} until={33.5} y={420} size={100} />

      {t < 9.3 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 0, 9.3)}}>
          <PhotoCard src="epi/soudeur.jpg" at={0.2} x={540} y={980} w={940} h={760} pos="35% 40%" label="Travail en hauteur" icon="casque" />
          <Enter at={4.6} x={300} y={1450} bouncy><div style={{background: ORANGE, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 80, padding: '10px 40px', borderRadius: 26, boxShadow: '0 14px 30px rgba(232,119,46,0.4)'}}>EPI</div></Enter>
          <Enter at={5.4} x={780} y={1450} bouncy><div style={{background: colors.green, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 80, padding: '10px 40px', borderRadius: 26, boxShadow: '0 14px 30px rgba(46,155,62,0.4)'}}>EPC</div></Enter>
          <Enter at={6.6} x={540} y={1450} bouncy><F n="question" size={130} /></Enter>
        </div>
      )}
      {t >= 9.3 && t < 19.9 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 9.3, 19.9)}}>
          <Enter at={9.35} x={290} y={1000} from="left" dist={-500}><Sigle k="EPI" w={440} sub={t > 11.9} /></Enter>
          <Enter at={10.0} x={790} y={1000} from="right" dist={500}><Sigle k="EPC" w={440} sub={t > 13.4} /></Enter>
          <div style={{position: 'absolute', left: 540, top: 1000, transform: `translate(-50%, -50%) scale(${vs}) rotate(${(1 - vs) * 180}deg)`, width: 140, height: 140, borderRadius: '50%', background: colors.navy, border: '8px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 54, color: '#fff', boxShadow: '0 12px 26px rgba(0,0,0,0.25)'}}>VS</div>
          <Enter at={15.6} x={540} y={1440} bouncy><Pill label="Un environnement réellement sûr" icon="bouclier" size={36} /></Enter>
        </div>
      )}
      {t >= 19.9 && t < 24.8 && (
        <>
          <Enter at={20.0} until={24.75} x={540} y={1000} bouncy rotate={Math.sin(t * 4) * 6}><F n="question" size={320} /></Enter>
          <Enter at={22.7} until={24.75} x={220} y={760} bouncy><F n="danger" size={170} float={6} /></Enter>
          <Enter at={23.3} until={24.75} x={860} y={760} bouncy><F n="pensif" size={170} float={6} /></Enter>
        </>
      )}
      {t >= 24.8 && t < 26.8 && (
        <Enter at={24.85} until={26.75} x={540} y={1000} bouncy>
          <Pic src="epi-panoplie.jpg" w={900} card />
        </Enter>
      )}
      {t >= 26.8 && t < 31.2 && (
        <>
          <PhotoCard src="epi/garde-corps.jpg" at={26.85} until={31.15} x={540} y={980} w={940} h={700} pos="50% 50%" label="Repenser l'environnement" icon="usine" />
          <Enter at={29.6} until={31.15} x={540} y={1450} bouncy><Pill label="Éliminer le danger à la source" icon="cible" size={34} /></Enter>
        </>
      )}
      {t >= 31.2 && (
        <>
          <Enter at={31.25} x={540} y={1000} bouncy><F n="loupe" size={300} float={8} /></Enter>
          <Enter at={31.6} x={260} y={1300} bouncy><Sigle k="EPI" w={260} sub={false} /></Enter>
          <Enter at={31.8} x={820} y={1300} bouncy><Sigle k="EPC" w={260} sub={false} /></Enter>
        </>
      )}
    </div>
  );
};

/** Pastille d'annotation : point + trait + étiquette, ancrée sur la figure. */
const Tag: React.FC<{at: number; x: number; y: number; tx: number; ty: number; label: string; icon?: string}> = ({at, x, y, tx, ty, label, icon}) => {
  const t = useT();
  const p = prog(t, at, at + 0.4, easeOut);
  if (t < at) return null;
  const left = tx < x;
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d={`M${x} ${y} L${x + (tx - x) * p} ${y + (ty - y) * p}`} stroke={ORANGE} strokeWidth={5} strokeDasharray="10 8" />
        <circle cx={x} cy={y} r={12 * Math.min(1, p * 2)} fill="#fff" stroke={ORANGE} strokeWidth={6} />
      </svg>
      <div style={{position: 'absolute', left: tx, top: ty, transform: `translate(${left ? '-100%' : '0'}, -50%) scale(${p})`, transformOrigin: left ? 'right center' : 'left center', display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 18, padding: '10px 18px 10px 12px', boxShadow: '0 10px 22px rgba(30,25,10,0.18)', borderLeft: `8px solid ${ORANGE}`, fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: colors.navy, whiteSpace: 'nowrap'}}>
        {icon && <F n={icon} size={46} />}
        {label}
      </div>
    </>
  );
};

/** 39,6 – 85 s : l'EPI — définition, exemples sur la figure annotée, protection solitaire. */
export const EpiScene: React.FC = () => {
  const t = useT();
  const out = prog(t, 84.7, 85.0, easeIn);
  const def = t < 52.9;
  const shield = t >= 52.9 && t < 58.8;
  const ex = t >= 58.8 && t < 75.2;
  const solo = t >= 75.2;
  const shieldP = prog(t, 54.9, 55.7, easeOut);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="C'est quoi un *EPI* ?" at={39.6} until={45.55} y={420} size={88} accent={ORANGE} />
      <Kinetic text="*Porté* ou *tenu* sur soi" at={45.6} until={52.85} y={420} size={82} accent={ORANGE} maxWidth={1000} />
      <Kinetic text="Un bouclier *personnel*" at={52.9} until={58.75} y={420} size={80} accent={ORANGE} maxWidth={1000} />
      <Kinetic text="Des *exemples* connus" at={58.8} until={72.45} y={420} size={82} accent={ORANGE} maxWidth={1000} />
      <Kinetic text="Un risque, un *EPI*" at={72.5} until={75.15} y={420} size={90} accent={ORANGE} />
      <Kinetic text="Une protection *solitaire*" at={75.2} until={84.9} y={420} size={78} accent={ORANGE} maxWidth={1000} />

      {def && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 39.6, 52.9)}}>
          <Enter at={39.7} until={45.5} x={540} y={1000} bouncy><F n="question" size={300} float={8} /></Enter>
          {t >= 45.6 && (
            <>
              <PhotoCard src="epi/harnais.jpg" at={45.65} x={540} y={900} w={900} h={640} pos="50% 30%" label="Un dispositif sur soi" icon="gilet" />
              <Enter at={47.0} x={300} y={1370} bouncy><Pill label="Porté" icon="casque" color={ORANGE} size={42} /></Enter>
              <Enter at={47.6} x={780} y={1370} bouncy><Pill label="Tenu" icon="poignee" color={ORANGE} size={42} /></Enter>
              <Underline at={51.0} until={52.8} x={540} y={482} width={560} color={ORANGE} />
            </>
          )}
        </div>
      )}
      {shield && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 52.9, 58.8)}}>
          <Enter at={53.0} x={240} y={1000} from="left" dist={-400}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
              <F n="danger" size={200} float={6} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: RED}}>DANGER</div>
            </div>
          </Enter>
          <Enter at={53.4} x={820} y={1000} from="right" dist={400}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
              <F n="ouvrier" size={240} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: colors.navy}}>LA PERSONNE</div>
            </div>
          </Enter>
          {t > 54.9 && (
            <div style={{position: 'absolute', left: 560, top: 1000, transform: `translate(-50%, -50%) scale(${shieldP})`}}>
              <svg width={200} height={260} viewBox="0 0 100 130">
                <path d="M50 4 L94 20 V62 C94 96 72 116 50 126 C28 116 6 96 6 62 V20 Z" fill={ORANGE} stroke="#fff" strokeWidth={6} />
                <path d="M30 64 L45 79 L72 48" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
          {[0, 1, 2].map((i) => {
            const p = ((t - 55.2) * 0.9 + i / 3) % 1;
            return t > 55.2 ? <div key={i} style={{position: 'absolute', left: 340 + p * 120, top: 990, width: 24, height: 24, borderRadius: 12, background: RED, opacity: (1 - p) * 0.9}} /> : null;
          })}
          <Enter at={55.0} x={540} y={1400} bouncy><Pill label="Une barrière physique" icon="bouclier" color={ORANGE} size={38} /></Enter>
        </div>
      )}
      {ex && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 58.8, 75.2)}}>
          <Enter at={58.9} x={540} y={1060} bouncy>
            <div style={{background: '#fff', borderRadius: 40, padding: '24px 30px', boxShadow: '0 18px 40px rgba(30,25,10,0.18)'}}>
              <Img src={staticFile('epi/travailleur-epi.png')} style={{width: 240, display: 'block'}} />
            </div>
          </Enter>
          {/* repères sur la figure : centre (540,1060), image 330×1257 → échelle 1,6 */}
          <Tag at={60.9} x={536} y={660} tx={680} ty={610} label="Casque" icon="casque" />
          <Tag at={64.6} x={525} y={718} tx={330} ty={700} label="Lunettes" icon="lunettes" />
          <Tag at={66.1} x={478} y={1085} tx={330} ty={1060} label="Gants" icon="gants" />
          <Tag at={67.0} x={606} y={1418} tx={720} ty={1450} label="Chaussures" icon="chaussure" />
          <Tag at={70.4} x={540} y={917} tx={700} ty={880} label="Harnais" />
          <Enter at={68.1} x={180} y={1300} bouncy>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#fff', borderRadius: 26, padding: 12, boxShadow: '0 10px 22px rgba(30,25,10,0.16)'}}>
              <Img src={staticFile('epi/masque.png')} style={{width: 150}} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: colors.navy}}>Masque</div>
            </div>
          </Enter>
          <Enter at={69.5} x={890} y={1160} bouncy>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#fff', borderRadius: 26, padding: 12, boxShadow: '0 10px 22px rgba(30,25,10,0.16)'}}>
              <Img src={staticFile('epi/casque-auditif.png')} style={{width: 140}} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: colors.navy}}>Auditif</div>
            </div>
          </Enter>
          <Enter at={72.6} x={540} y={1580} bouncy><Pill label="Chaque EPI = un risque précis" icon="cible" color={ORANGE} size={34} /></Enter>
        </div>
      )}
      {solo && (
        <>
          {[0, 1, 2, 3, 4].map((i) => {
            const me = i === 2;
            const lit = prog(t, 79.8, 80.8);
            return (
              <Enter key={i} at={75.4 + i * 0.12} x={140 + i * 200} y={1050} bouncy>
                <div style={{filter: me ? 'none' : `grayscale(${lit}) opacity(${1 - lit * 0.45})`, transform: `scale(${me ? 1 + lit * 0.25 : 1})`}}>
                  <F n={['femme-bureau', 'homme-bureau', 'formatrice', 'homme-bureau', 'femme-bureau'][i]} size={me ? 220 : 170} />
                </div>
              </Enter>
            );
          })}
          {t > 79.8 && (
            <div style={{position: 'absolute', left: 540, top: 1040, transform: `translate(-50%, -50%) scale(${prog(t, 79.8, 80.6, easeOut)})`, width: 340, height: 380, borderRadius: '50% 50% 46% 46%', border: `10px solid ${ORANGE}`, background: 'rgba(232,119,46,0.12)', boxShadow: `0 0 40px rgba(232,119,46,0.45)`}} />
          )}
          {t > 81.3 &&
            [0, 1, 3, 4].map((i) => (
              <div key={i} style={{position: 'absolute', left: 140 + i * 200, top: 870, transform: `translate(-50%, -50%) scale(${prog(t, 81.4 + i * 0.1, 81.8 + i * 0.1)})`}}>
                <Verdict ok={false} size={70} />
              </div>
            ))}
          <Enter at={76.8} x={540} y={720} bouncy><F n="punaise" size={120} /></Enter>
          <Enter at={82.6} x={540} y={1440} bouncy><Pill label="Protège UNE seule personne" icon="homme-bureau" color={ORANGE} size={36} /></Enter>
        </>
      )}
    </div>
  );
};

/** 93,4 – 141,3 s : l'EPC — plusieurs personnes, la source, les exemples, casque vs filet. */
export const EpcScene: React.FC = () => {
  const t = useT();
  const out = prog(t, 141.0, 141.3, easeIn);
  const philo = t < 100.4;
  const group = t >= 100.4 && t < 104.6;
  const source = t >= 104.6 && t < 114.5;
  const exs = t >= 114.5 && t < 133.3;
  const versus = t >= 133.3;
  const dome = prog(t, 101.6, 102.6, easeOut);
  const cut = prog(t, 112.0, 113.0, easeOut);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Changement de *philosophie*" at={93.4} until={100.35} y={420} size={72} maxWidth={1000} />
      <Kinetic text="*Plusieurs* personnes" at={100.4} until={104.55} y={420} size={88} maxWidth={1000} />
      <Kinetic text="Agir à la *source*" at={104.6} until={114.45} y={420} size={96} />
      <Kinetic text="Des exemples *limpides*" at={114.5} until={125.15} y={420} size={80} maxWidth={1000} />
      <Kinetic text="Intégré à l'*environnement*" at={125.2} until={133.25} y={420} size={72} maxWidth={1000} />
      <Kinetic text="La force du *collectif*" at={133.3} until={141.2} y={420} size={84} maxWidth={1000} />

      {philo && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 93.4, 100.4)}}>
          <Enter at={93.5} x={540} y={980} bouncy>
            <div style={{transform: `rotateY(${interpolate(prog(t, 94.4, 95.4, easeInOut), [0, 1], [0, 180])}deg)`, transformStyle: 'preserve-3d'}}>
              {prog(t, 94.4, 95.4, easeInOut) < 0.5 ? <Sigle k="EPI" w={420} /> : <div style={{transform: 'scaleX(-1)'}}><Sigle k="EPC" w={420} /></div>}
            </div>
          </Enter>
          <Enter at={97.4} x={290} y={1430} bouncy><Pill label="Idée clé n°1" icon="ampoule" size={34} /></Enter>
          <Enter at={99.2} x={790} y={1430} bouncy><Pill label="Idée clé n°2" icon="ampoule" size={34} /></Enter>
        </div>
      )}
      {group && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 100.4, 104.6)}}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Enter key={i} at={100.5 + i * 0.1} x={190 + i * 175} y={1120 - (i % 2) * 40} bouncy>
              <F n={['femme-bureau', 'homme-bureau', 'formatrice', 'homme-bureau', 'femme-bureau'][i]} size={170} />
            </Enter>
          ))}
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <path d="M80 1260 C 80 700, 1000 700, 1000 1260 Z" fill="rgba(46,155,62,0.12)" stroke={colors.green} strokeWidth={12} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - dome} />
          </svg>
          <Enter at={102.6} x={540} y={1400} bouncy><Pill label="Tout un groupe protégé" icon="equipe" size={36} /></Enter>
        </div>
      )}
      {source && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 104.6, 114.5)}}>
          <Enter at={104.7} x={300} y={1000} bouncy>
            <div style={{position: 'relative', width: 340, height: 340, borderRadius: 40, background: '#FBE9E7', border: `6px solid ${RED}`, display: 'flex', alignItems: 'center', justifyContent: 'center', filter: `grayscale(${cut})`, opacity: 1 - cut * 0.4}}>
              <F n="danger" size={200} />
              <div style={{position: 'absolute', bottom: -60, fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: RED}}>SOURCE</div>
            </div>
          </Enter>
          {[0, 1, 2].map((i) => {
            const p = ((t - 105.5) * 0.8 + i / 3) % 1;
            const len = interpolate(cut, [0, 1], [1, 0.05]);
            return t > 105.5 ? <div key={i} style={{position: 'absolute', left: 500 + p * 400 * len, top: 990 + (i - 1) * 50, width: 30, height: 30, borderRadius: 15, background: RED, opacity: (1 - p) * (1 - cut)}} /> : null;
          })}
          <Enter at={106.8} x={560} y={1000} from="up" dist={-500}>
            <Pic src="ic-barriere.png" w={260} />
          </Enter>
          <Enter at={107.4} x={850} y={1000} bouncy><F n="equipe" size={200} /></Enter>
          <Enter at={109.6} x={540} y={1380} bouncy><Pill label="Pas seulement les conséquences" icon="stop" color={colors.ochre} size={32} /></Enter>
          <Enter at={112.0} x={540} y={1530} bouncy><Pill label="Le danger neutralisé à la base" icon="check" size={34} /></Enter>
        </div>
      )}
      {exs && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 114.5, 133.3)}}>
          {t < 125.2 ? (
            <>
              <PhotoCard src="epi/soudeur.jpg" at={117.3} until={125.15} x={540} y={800} w={940} h={520} pos="40% 55%" label="Garde-corps · échafaudage" icon="chantier" />
              <Enter at={117.6} until={125.15} x={860} y={1140} bouncy><div style={{background: '#fff', borderRadius: 26, padding: 14, boxShadow: '0 10px 22px rgba(0,0,0,0.15)'}}><Pic src="ic-garde-corps.png" w={220} /></div></Enter>
              <Enter at={119.0} until={125.15} x={330} y={1150} bouncy><Pill label="Personne ne tombe" icon="check" size={32} /></Enter>
              <Enter at={120.6} until={125.15} x={540} y={1430} from="down" dist={300}>
                <div style={{width: 940, display: 'flex', alignItems: 'center', gap: 26, background: '#fff', borderRadius: 34, padding: '20px 28px', boxShadow: '0 14px 30px rgba(30,25,10,0.16)', borderLeft: `14px solid ${colors.green}`}}>
                  <Pic src="ic-ventilation.png" w={200} />
                  <div style={{fontFamily: sansFont}}>
                    <div style={{fontWeight: 900, fontSize: 44, color: colors.navy}}>Ventilation</div>
                    <div style={{fontWeight: 700, fontSize: 30, color: '#5B6675'}}>l'air assaini pour tous</div>
                  </div>
                </div>
              </Enter>
              {[0, 1, 2, 3].map((i) => {
                const p = ((t - 122.8) * 0.6 + i / 4) % 1;
                return t > 122.8 ? <div key={i} style={{position: 'absolute', left: 300 + i * 50, top: 1400 - p * 160, width: 40, height: 40, borderRadius: 20, border: '5px solid #7CC5D9', opacity: (1 - p) * 0.8}} /> : null;
              })}
            </>
          ) : (
            <>
              <PhotoCard src="epi/garde-corps.jpg" at={125.25} x={540} y={820} w={940} h={600} pos="50% 50%" label="Locaux & machines" icon="usine" />
              <Enter at={127.0} x={280} y={1340} bouncy><div style={{background: '#fff', borderRadius: 26, padding: 10, boxShadow: '0 10px 22px rgba(0,0,0,0.15)'}}><Pic src="signalisation.jpg" w={300} /></div></Enter>
              <Enter at={128.0} x={790} y={1340} bouncy><div style={{background: '#fff', borderRadius: 26, padding: 10, boxShadow: '0 10px 22px rgba(0,0,0,0.15)'}}><Pic src="equipements-epc.jpg" w={420} /></div></Enter>
              <Enter at={130.0} x={540} y={1580} bouncy><Pill label="La différence saute aux yeux" icon="yeux" size={32} /></Enter>
            </>
          )}
        </div>
      )}
      {versus && (
        <>
          <Enter at={133.4} x={290} y={1000} from="left" dist={-400}>
            <div style={{width: 420, height: 600, borderRadius: 40, background: '#fff', border: `8px solid ${ORANGE}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, boxShadow: '0 16px 34px rgba(232,119,46,0.25)'}}>
              <F n="casque" size={180} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: ORANGE}}>1 CASQUE</div>
              <div style={{display: 'flex', alignItems: 'center', gap: 10}}><F n="homme-bureau" size={90} /><span style={{fontFamily: handFont, fontSize: 52, color: colors.navy}}>= 1 tête</span></div>
            </div>
          </Enter>
          <Enter at={136.1} x={790} y={1000} from="right" dist={400}>
            <div style={{width: 420, height: 600, borderRadius: 40, background: '#fff', border: `8px solid ${colors.green}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, boxShadow: '0 16px 34px rgba(46,155,62,0.25)'}}>
              <Pic src="ic-filet.png" w={260} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: colors.green}}>1 FILET</div>
              <div style={{display: 'flex', alignItems: 'center', gap: 4}}>
                {[0, 1, 2].map((i) => <div key={i} style={{transform: `scale(${prog(t, 138.0 + i * 0.2, 138.4 + i * 0.2)})`}}><F n={i === 1 ? 'femme-bureau' : 'homme-bureau'} size={84} /></div>)}
              </div>
              <span style={{fontFamily: handFont, fontSize: 52, color: colors.navy, opacity: prog(t, 138.6, 139.0)}}>= tout le monde</span>
            </div>
          </Enter>
          <Enter at={139.9} x={540} y={1440} bouncy><Pill label="La force du collectif" icon="equipe" size={40} /></Enter>
        </>
      )}
    </div>
  );
};

