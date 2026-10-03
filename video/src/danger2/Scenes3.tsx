import {easeInOut, easeOut, Enter, kf, Kinetic, prog, useSpring, useT} from '../anim';
import {PhotoCard, Strike} from '../charte/ui';
import {F, Pill} from '../iso/ui';
import {Highlight} from '../prevention2/Cine';
import {colors, handFont, sansFont} from '../theme';
import {AMBER, Cut, Gauge, Note, Op, RED, Stamp, Win} from './ui';

const CELL = 150;
const cellColor = (p: number, g: number) => {
  const v = p + g; // 0..6
  return v <= 2 ? '#7CC576' : v <= 3 ? '#F2C230' : v <= 4 ? AMBER : RED;
};

/** Matrice probabilité × gravité (4 × 4), origine en bas à gauche. */
const Matrix: React.FC<{at: number; x: number; y: number; dot?: [number, number, number][]}> = ({at, x, y, dot = []}) => {
  const t = useT();
  return (
    <div style={{position: 'absolute', left: x, top: y, width: CELL * 4, height: CELL * 4}}>
      {Array.from({length: 16}).map((_, i) => {
        const g = i % 4;
        const p = 3 - Math.floor(i / 4);
        const k = prog(t, at + (g + (3 - p)) * 0.07, at + (g + (3 - p)) * 0.07 + 0.4, easeOut);
        return <div key={i} style={{position: 'absolute', left: g * CELL + 5, top: (3 - p) * CELL + 5, width: CELL - 10, height: CELL - 10, borderRadius: 18, background: cellColor(p, g), opacity: 0.9 * k, transform: `scale(${k})`}} />;
      })}
      {dot.map(([at2, gx, py], i) => {
        const sp = prog(t, at2, at2 + 0.5, easeOut);
        return sp > 0 ? (
          <div key={i} style={{position: 'absolute', left: gx * CELL + CELL / 2, top: (3 - py) * CELL + CELL / 2, width: 70, height: 70, marginLeft: -35, marginTop: -35, borderRadius: '50%', background: colors.navy, border: '8px solid #fff', boxShadow: '0 8px 18px rgba(0,0,0,0.35)', transform: `scale(${sp * (1 + 0.08 * Math.sin(t * 6))})`}} />
        ) : null;
      })}
    </div>
  );
};

/** 270,9 – 296,2 s : quantifier le risque. */
export const Matrice: React.FC = () => {
  const t = useT();
  return (
    <>
      <Kinetic text="Une *matrice* imparable" at={270.95} until={281.35} y={420} size={82} accent={AMBER} maxWidth={1000} />
      <Kinetic text="Le mode d'*exposition*" at={281.4} until={296.1} y={420} size={82} accent={AMBER} maxWidth={1000} />

      <Win a={270.95} b={281.35}>
        <Matrix at={273.2} x={300} y={640} dot={[[279.9, 2, 2]]} />
        {/* axes */}
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <line x1={280} y1={1260} x2={280} y2={1260 - 640 * prog(t, 277.0, 277.7)} stroke={colors.navy} strokeWidth={8} strokeLinecap="round" />
          <line x1={280} y1={1260} x2={280 + 680 * prog(t, 279.8, 280.5)} y2={1260} stroke={colors.navy} strokeWidth={8} strokeLinecap="round" />
        </svg>
        <Enter at={277.1} x={150} y={950} bouncy><div style={{transform: 'rotate(-90deg)', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: colors.navy, whiteSpace: 'nowrap', letterSpacing: 2}}>PROBABILITÉ ↑</div></Enter>
        <Enter at={279.9} x={620} y={1320} bouncy><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: colors.navy, letterSpacing: 2}}>GRAVITÉ →</div></Enter>
        <Enter at={275.6} x={540} y={1450} bouncy><Pill label="Risque = Probabilité × Gravité" icon="balance" color={AMBER} size={34} /></Enter>
      </Win>

      <Win a={281.4} b={296.1}>
        <Enter at={286.6} x={290} y={900} from="left" dist={-300}>
          <div style={{width: 440, borderRadius: 30, background: '#fff', padding: '26px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, boxShadow: '0 16px 32px rgba(14,30,60,0.18)', borderTop: `14px solid ${RED}`}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}><F n="nausee" size={130} /><F n="vent" size={90} style={{opacity: 0.35}} /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: colors.navy, textAlign: 'center', lineHeight: 1.1}}>Inhalation<br />placard mal ventilé</div>
          </div>
        </Enter>
        <Enter at={287.4} x={540} y={900} bouncy><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: colors.navy}}>≠</div></Enter>
        <Enter at={290.9} x={790} y={900} from="right" dist={300}>
          <div style={{width: 440, borderRadius: 30, background: '#fff', padding: '26px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, boxShadow: '0 16px 32px rgba(14,30,60,0.18)', borderTop: `14px solid ${colors.green}`}}>
            <F n="goutte" size={130} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: colors.navy, textAlign: 'center', lineHeight: 1.1}}>Une goutte<br />sur le doigt, 2 s</div>
          </div>
        </Enter>
        {t >= 288.6 && <Enter at={288.6} x={290} y={1250} from="down" dist={100}><Gauge v={kf(t, [288.6, 289.6], [0, 0.9])} label="Gravité" w={400} /></Enter>}
        {t >= 291.8 && <Enter at={291.8} x={790} y={1250} from="down" dist={100}><Gauge v={kf(t, [291.8, 292.8], [0, 0.15])} label="Gravité" w={400} /></Enter>}
        <Enter at={282.0} until={286.5} x={540} y={960} bouncy><F n="loupe2" size={300} /></Enter>
        <Enter at={283.4} until={286.5} x={540} y={1260} bouncy><Note text="des détails tout bêtes…" size={56} /></Enter>
        <Enter at={294.0} x={540} y={1450} bouncy><Pill label="Une analyse sur mesure" icon="clipboard" color={AMBER} size={34} /></Enter>
      </Win>
    </>
  );
};

const LEVERS = [
  {at: 329.8, icon: 'formatrice', l: 'Informer & former', c: '#2E86C1'},
  {at: 333.4, icon: 'barriere', l: 'Protection collective', c: colors.green},
  {at: 339.2, icon: 'casque', l: 'Protection individuelle (EPI)', c: AMBER},
  {at: 342.9, icon: 'sablier', l: 'Réorganiser le travail', c: colors.navy},
];

/** 301,6 – 353,5 s : réduire le risque à la source. */
export const Reduire: React.FC = () => {
  const t = useT();
  const nine = useSpring(350.9, {damping: 9});
  const swap = prog(t, 311.4, 312.4, easeInOut);
  const pStep = kf(t, [321.6, 323.6], [0.85, 0.3]);
  const active = LEVERS.filter((l) => t >= l.at).length - 1;
  return (
    <>
      <Kinetic text="Une méthode *implacable*" at={301.65} until={303.9} y={420} size={82} maxWidth={1000} />
      <Kinetic text="① *Éliminer* le danger" at={303.95} until={318.7} y={420} size={84} maxWidth={1000} />
      <Kinetic text="② Baisser la *probabilité*" at={318.75} until={328.3} y={420} size={78} maxWidth={1000} />
      <Kinetic text="Limiter la *casse*" at={328.35} until={346.55} y={420} size={86} maxWidth={1000} />
      <Kinetic text="C'est la *loi*" at={346.6} until={353.4} y={420} size={100} />

      <Win a={301.65} b={303.9}>
        <Enter at={301.9} x={540} y={1000} bouncy><F n="cible" size={340} /></Enter>
      </Win>

      {/* élimination : substitution */}
      <Win a={303.95} b={318.7}>
        <Enter at={304.4} x={540} y={640} bouncy><Pill label="Règle n°1 : agir à la source" icon="cible" size={34} /></Enter>
        <div style={{position: 'absolute', left: 280, top: 950, transform: `translate(-50%, -50%) scale(${1 - 0.25 * swap})`, opacity: prog(t, 306.4, 306.8)}}>
          <F n="eprouvette" size={240} />
          <div style={{position: 'absolute', left: -20, right: -20, top: '50%'}}><Strike p={prog(t, 311.0, 311.5)} w={280} /></div>
          <div style={{textAlign: 'center', fontFamily: handFont, fontSize: 44, color: RED}}>solvant agressif</div>
        </div>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <path d={`M410 950 L${410 + 250 * swap} 950`} stroke={colors.navy} strokeWidth={10} strokeLinecap="round" opacity={swap > 0.02 ? 1 : 0} />
          {swap > 0.95 && <path d="M640 928 L668 950 L640 972" stroke={colors.navy} strokeWidth={10} fill="none" strokeLinecap="round" />}
        </svg>
        <Enter at={312.3} x={820} y={950} bouncy>
          <div style={{textAlign: 'center'}}><F n="savon" size={240} /><div style={{fontFamily: handFont, fontSize: 44, color: colors.green}}>eau savonneuse</div></div>
        </Enter>
        <Enter at={313.8} x={540} y={1300} bouncy>
          <div style={{display: 'flex', alignItems: 'center', gap: 18, background: '#fff', borderRadius: 24, padding: '14px 26px', boxShadow: '0 12px 26px rgba(14,30,60,0.16)'}}>
            <div style={{position: 'relative'}}><F n="ciseaux" size={100} /><div style={{position: 'absolute', inset: -6}}><F n="sens-interdit" size={112} style={{opacity: 0.85}} /></div></div>
            <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: colors.navy}}>Cutters sans sécurité interdits</div>
          </div>
        </Enter>
        {t >= 316.8 && <div style={{position: 'absolute', left: 540, top: 1470, transform: 'translate(-50%, -50%)'}}><Stamp text="RISQUE = 0" p={prog(t, 316.8, 317.1)} size={58} /></div>}
      </Win>

      {/* étape 2 */}
      <Win a={318.75} b={328.3}>
        <Enter at={319.0} x={290} y={900} bouncy><F n="danger" size={220} /></Enter>
        <Enter at={319.4} x={790} y={900} bouncy><F n="ouvrier" size={220} /></Enter>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <line x1={420} y1={900} x2={660} y2={900} stroke={AMBER} strokeWidth={8} strokeDasharray="16 14" opacity={prog(t, 320.0, 320.5)} />
        </svg>
        <Enter at={321.5} x={540} y={1180} from="down" dist={120}><Gauge v={pStep} label="Probabilité de rencontre" w={800} /></Enter>
        <Enter at={324.6} x={540} y={1430} bouncy><Note text="quand on doit vivre avec le danger…" size={52} /></Enter>
      </Win>

      {/* les leviers */}
      <Win a={328.35} b={346.55}>
        {LEVERS.map((l, i) => (
          <Enter key={l.l} at={l.at} x={540} y={600 + i * 112} from="left" dist={-260}>
            <div style={{width: 920, display: 'flex', alignItems: 'center', gap: 18, background: '#fff', borderRadius: 24, padding: '10px 22px', boxShadow: '0 10px 22px rgba(14,30,60,0.14)', borderLeft: `12px solid ${l.c}`, opacity: i === active ? 1 : 0.5, transform: `scale(${i === active ? 1 : 0.96})`}}>
              <F n={l.icon} size={70} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: colors.navy}}>{l.l}</div>
            </div>
          </Enter>
        ))}
        {active === 0 && <PhotoCard src="promo/formation-incendie.jpg" at={330.3} until={333.4} y={1240} w={860} h={430} label="Former les équipes" icon="formatrice" from="scale" />}
        {active === 1 && (
          <>
            <PhotoCard src="epi/garde-corps.jpg" at={334.0} until={339.2} x={300} y={1240} w={440} h={430} rotate={-2} label="Rambarde" from="left" />
            <PhotoCard src="confines/ventilation.jpg" at={336.4} until={339.2} x={780} y={1240} w={440} h={430} rotate={2} label="Ventilation" from="right" />
          </>
        )}
        {active === 2 && (
          <>
            <Enter at={340.9} x={200} y={1250} bouncy><Cut src="danger2/gants.png" w={260} rotate={-6} float={6} t={t} /></Enter>
            <Enter at={341.3} x={470} y={1230} bouncy><Cut src="danger2/casque.png" w={230} float={6} t={t + 1} /></Enter>
            <Enter at={341.9} x={700} y={1260} bouncy><F n="lunettes" size={200} float={6} /></Enter>
            <Enter at={342.3} x={900} y={1250} bouncy><Cut src="danger2/bouchons.png" w={230} rotate={8} float={6} t={t + 2} /></Enter>
          </>
        )}
        {active === 3 && (
          <>
            <Enter at={343.3} x={540} y={1220} bouncy><F n="calendrier" size={230} /></Enter>
            <Enter at={344.4} x={540} y={1440} bouncy><Note text="moins de temps près du danger" size={54} /></Enter>
          </>
        )}
      </Win>

      {/* la loi */}
      <Win a={346.6} b={353.4}>
        <Enter at={346.9} x={330} y={960} bouncy><F n="juge" size={300} /></Enter>
        <div style={{position: 'absolute', left: 760, top: 940, transform: `translate(-50%, -50%) scale(${nine})`, fontFamily: sansFont, fontWeight: 900, fontSize: 380, lineHeight: 1, color: colors.green, textShadow: '0 20px 40px rgba(46,155,62,0.3)'}}>9</div>
        <Enter at={351.3} x={540} y={1280} bouncy><Pill label="Principes généraux de prévention" icon="livres" size={36} /></Enter>
        <Enter at={352.4} x={540} y={1410} bouncy><Note text="Code du travail · art. L4121-2" size={50} /></Enter>
        <Enter at={349.0} x={540} y={680} bouncy><Note text="pas juste du bon sens…" size={52} /></Enter>
      </Win>
    </>
  );
};

/** 353,5 s – outro : la réflexion à emporter. */
export const Conclusion: React.FC<{end: number}> = ({end}) => {
  const t = useT();
  const scanX = kf(t, [363.0, 365.0, 366.8], [300, 760, 420]);
  return (
    <>
      <Kinetic text="Une note *pratique*" at={353.5} until={362.35} y={420} size={86} maxWidth={1000} />
      <Kinetic text="Quels dangers *planqués* ?" at={362.4} until={366.85} y={420} size={80} accent={RED} maxWidth={1000} />
      <Kinetic text="Votre *super-pouvoir*" at={366.9} until={374.1} y={420} size={86} maxWidth={1000} />
      <Kinetic text="Culture de *prévention*" at={374.15} until={end} y={420} size={84} maxWidth={1000} />

      <Win a={353.5} b={362.35}>
        <Enter at={353.8} x={540} y={880} bouncy><F n="ampoule" size={300} float={8} /></Enter>
        <Enter at={356.0} x={540} y={1170} bouncy><Note text="une réflexion pour demain" size={58} /></Enter>
        <Enter at={360.0} x={280} y={1380} from="left" dist={-200}><Pill label="L'objet" icon="danger" color={RED} size={34} /></Enter>
        <Enter at={360.6} x={540} y={1380} bouncy><Op c="≠" size={90} /></Enter>
        <Enter at={361.6} x={800} y={1380} from="right" dist={200}><Pill label="La rencontre" icon="ouvrier" color={AMBER} size={34} /></Enter>
      </Win>

      <Win a={362.4} b={366.85}>
        <PhotoCard src="promo/terrain-controle.jpg" at={362.5} y={1000} w={940} h={760} label="Atelier, open space…" icon="usine" from="scale" />
        <div style={{position: 'absolute', left: scanX, top: 960, transform: 'translate(-50%, -50%) rotate(-12deg)', opacity: prog(t, 362.9, 363.2)}}><F n="loupe2" size={230} /></div>
        <Highlight at={364.2} x={720} y={900} r={90} color={RED} />
        <Highlight at={365.3} x={330} y={1150} r={90} color={RED} />
      </Win>

      <Win a={366.9} b={374.1}>
        <Enter at={367.2} x={540} y={760} bouncy><F n="etoile" size={200} float={8} /></Enter>
        <Enter at={371.0} x={290} y={1100} from="left" dist={-300}>
          <div style={{width: 420, padding: '30px 0', borderRadius: 30, background: '#fff', textAlign: 'center', boxShadow: '0 16px 32px rgba(14,30,60,0.18)', borderTop: `14px solid ${RED}`}}>
            <F n="couteau" size={150} style={{margin: '0 auto'}} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: RED}}>OBJET PHYSIQUE</div>
            <div style={{fontFamily: handFont, fontSize: 38, color: colors.navy}}>le danger</div>
          </div>
        </Enter>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <line x1={540} y1={940} x2={540} y2={940 + 330 * prog(t, 371.6, 372.3)} stroke={colors.navy} strokeWidth={10} strokeDasharray="22 16" strokeLinecap="round" />
        </svg>
        <Enter at={373.0} x={790} y={1100} from="right" dist={300}>
          <div style={{width: 420, padding: '30px 0', borderRadius: 30, background: '#fff', textAlign: 'center', boxShadow: '0 16px 32px rgba(14,30,60,0.18)', borderTop: `14px solid ${AMBER}`}}>
            <F n="ouvrier" size={150} style={{margin: '0 auto'}} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: AMBER}}>ACTION HUMAINE</div>
            <div style={{fontFamily: handFont, fontSize: 38, color: colors.navy}}>le risque</div>
          </div>
        </Enter>
      </Win>

      <Win a={374.15} b={end + 0.3}>
        {['Danger', 'Rencontre', 'Évaluation', 'Prévention'].map((w, i) => (
          <Enter key={w} at={374.5 + i * 0.45} x={540} y={1300 - i * 150} from="up" dist={-300}>
            <div style={{width: 640 - i * 60, height: 130, borderRadius: 18, background: i === 3 ? colors.green : colors.navy, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 50, letterSpacing: 2, textTransform: 'uppercase', boxShadow: '0 12px 24px rgba(14,42,92,0.3)'}}>{w}</div>
          </Enter>
        ))}
        <Enter at={378.4} x={540} y={1480} bouncy><Note text="à très vite pour un prochain décryptage !" size={50} /></Enter>
      </Win>
    </>
  );
};
