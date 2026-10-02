import {interpolate} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, Kinetic, prog, Underline, useSpring, useT} from '../anim';
import {F, Pill} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';
import {CharterDoc, Gear, PhotoCard, RED, Row, Strike, useCount, Verdict} from './ui';

const fade = (t: number, a: number, b: number) => (1 - prog(t, b - 0.3, b, easeIn)) * (t >= a ? 1 : 0);

/** Colonne d'atouts (interne / externe). */
const Benefit: React.FC<{at: number; x: number; y: number; icon: string; label: string; color: string}> = ({at, x, y, icon, label, color}) => (
  <Enter at={at} x={x} y={y} from="down" dist={160} bouncy>
    <div style={{width: 470, display: 'flex', alignItems: 'center', gap: 16, background: '#fff', borderRadius: 24, padding: '14px 18px', boxShadow: '0 10px 22px rgba(30,25,10,0.14)', borderLeft: `10px solid ${color}`}}>
      <F n={icon} size={72} />
      <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: colors.navy, lineHeight: 1.1}}>{label}</div>
    </div>
  </Enter>
);

/** 144,3 – 172 s : les atouts majeurs, interne et externe. */
export const Atouts: React.FC = () => {
  const t = useT();
  const out = prog(t, 171.7, 172.0, easeIn);
  const ext = t >= 158.3;
  const swap = prog(t, 162.4, 163.4, easeInOut);
  const quality = prog(t, 164.6, 165.4, easeOut);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Des bénéfices *dédoublés*" at={144.35} until={148.45} y={420} size={80} maxWidth={1000} />
      <Kinetic text="En *interne*" at={148.5} until={158.25} y={420} size={100} accent={colors.navy} color={colors.green} />
      <Kinetic text="En *externe* : la magie" at={158.3} until={166.5} y={420} size={84} maxWidth={1000} />
      <Kinetic text="Professionnalisme & *confiance*" at={166.55} until={171.9} y={420} size={70} maxWidth={1000} />

      {t < 148.5 && (
        <>
          <Enter at={144.5} until={148.4} x={300} y={1000} from="left" dist={-400}>
            <div style={{width: 400, height: 400, borderRadius: 50, background: colors.navy, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 18px 36px rgba(14,42,92,0.3)'}}>
              <F n="batiment" size={190} float={6} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: '#fff'}}>INTERNE</div>
            </div>
          </Enter>
          <Enter at={145.4} until={148.4} x={780} y={1000} from="right" dist={400}>
            <div style={{width: 400, height: 400, borderRadius: 50, background: colors.green, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 18px 36px rgba(46,155,62,0.3)'}}>
              <F n="globe" size={190} float={6} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: '#fff'}}>EXTERNE</div>
            </div>
          </Enter>
          <Enter at={146.8} until={148.4} x={540} y={1000} bouncy>
            <div style={{width: 110, height: 110, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: colors.ochre, boxShadow: '0 10px 22px rgba(0,0,0,0.18)'}}>×2</div>
          </Enter>
        </>
      )}

      {t >= 148.5 && !ext && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 148.5, 158.3)}}>
          <PhotoCard src="audit-reunion" at={148.6} x={540} y={780} w={940} h={460} pos="50% 45%" label="Équipes dirigeantes" icon="homme-bureau" />
          <Row at={151.7} y={1160} icon="auditeur" label="Retours d'audit externes" w={940} color={colors.navy} />
          <Row at={153.1} y={1330} icon="bulle" label="Conseils sur mesure" w={940} color={colors.navy} />
          <Row at={155.6} y={1500} icon="livres" label="Réglementation à jour" w={940} color={colors.navy} />
        </div>
      )}

      {ext && t < 166.55 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 158.3, 166.55)}}>
          <PhotoCard src="terrain-controle" at={158.4} until={160.95} x={540} y={1000} w={900} h={640} pos="60% 35%" label="Côté clients" icon="poignee" />
          <Enter at={159.4} until={160.95} x={860} y={700} bouncy><F n="etincelles" size={170} float={8} /></Enter>
          {/* le regard du client glisse du prix vers la qualité */}
          <Enter at={161.0} x={540} y={1000} bouncy><F n="yeux" size={150} /></Enter>
          <div style={{position: 'absolute', left: interpolate(swap, [0, 1], [540, 230]), top: 1260, transform: `translate(-50%, -50%) scale(${interpolate(swap, [0, 1], [1, 0.7])})`, opacity: prog(t, 161.6, 162.0) * interpolate(swap, [0, 1], [1, 0.45])}}>
            <div style={{position: 'relative', width: 360, borderRadius: 30, background: '#fff', padding: '20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 12px 26px rgba(0,0,0,0.15)'}}>
              <F n="argent" size={130} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#7A2620'}}>PRIX</div>
              <div style={{position: 'absolute', left: 30, right: 30, top: '50%'}}><Strike p={swap} w={300} /></div>
            </div>
          </div>
          {quality > 0 && (
            <div style={{position: 'absolute', left: 690, top: 1260, transform: `translate(-50%, -50%) scale(${0.6 + 0.4 * quality})`, opacity: quality}}>
              <div style={{width: 420, borderRadius: 34, background: colors.green, padding: '24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 16px 34px rgba(46,155,62,0.4)'}}>
                <F n="medaille" size={150} />
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: '#fff'}}>QUALITÉ</div>
              </div>
            </div>
          )}
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <path d="M540 1080 Q 540 1150 450 1200" stroke={RED} strokeWidth={8} fill="none" strokeDasharray="14 12" opacity={prog(t, 161.6, 162) * (1 - swap)} />
            <path d="M560 1080 Q 640 1120 680 1150" stroke={colors.green} strokeWidth={10} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - quality} />
          </svg>
        </div>
      )}
      {t >= 166.55 && (
        <>
          <PhotoCard src="mine-terrain" at={166.6} x={540} y={900} w={940} h={680} pos="70% 35%" label="Le professionnalisme en lumière" icon="etoile">
            <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 70% 40%, rgba(255,240,180,${0.35 * prog(t, 167.4, 168.4)}), transparent 55%)`}} />
          </PhotoCard>
          <Enter at={170.4} x={540} y={1430} bouncy><Pill label="La confiance se solidifie" icon="poignee" size={38} /></Enter>
        </>
      )}
    </div>
  );
};

/** Emballage dessiné (canal d'affichage de la charte). */
const Box: React.FC = () => (
  <svg width={170} height={170} viewBox="0 0 100 100">
    <path d="M50 12 L88 30 L88 72 L50 90 L12 72 L12 30 Z" fill="#D9A866" stroke={colors.ink} strokeWidth={4} strokeLinejoin="round" />
    <path d="M12 30 L50 48 L88 30 M50 48 V90" stroke={colors.ink} strokeWidth={4} fill="none" />
    <circle cx={30} cy={58} r={9} fill={colors.green} />
    <path d="M25.5 58 L29 61.5 L35 54.5" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" />
  </svg>
);

/** 172 – 194,2 s : rendre visibles des principes invisibles, et l'image de marque décolle. */
export const Visible: React.FC = () => {
  const t = useT();
  const out = prog(t, 193.9, 194.2, easeIn);
  const vis = prog(t, 176.8, 178.2, easeInOut);
  const chan = t >= 178.7 && t < 182.5;
  const brand = t >= 182.5;
  const rocket = prog(t, 183.6, 185.2, easeInOut);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Rendre *visible* l'invisible" at={172.0} until={178.65} y={420} size={78} maxWidth={1000} />
      <Kinetic text="Afficher ses *engagements*" at={178.7} until={182.45} y={420} size={76} maxWidth={1000} />
      <Kinetic text="Un bond de *géant*" at={182.5} until={188.85} y={420} size={92} />
      <Kinetic text="Un levier de *croissance*" at={188.9} until={194.1} y={420} size={80} maxWidth={1000} />

      {t < 178.7 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 172, 178.7)}}>
          <Enter at={172.1} x={540} y={1050} bouncy>
            <div style={{opacity: 0.32 + 0.68 * vis, filter: `blur(${(1 - vis) * 8}px)`, transform: `scale(${0.9 + 0.1 * vis})`}}>
              <CharterDoc w={430} write={prog(t, 173.2, 176.0)} seal={vis} />
            </div>
          </Enter>
          <Enter at={175.5} until={177.2} x={540} y={1050} bouncy>
            <div style={{fontFamily: handFont, fontSize: 70, color: '#8A94A3', background: 'rgba(255,255,255,0.85)', padding: '6px 24px', borderRadius: 18}}>invisible…</div>
          </Enter>
          <Enter at={177.4} x={540} y={1540} bouncy><Pill label="Rendus hyper concrets" icon="check" size={36} /></Enter>
        </div>
      )}
      {chan && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 178.7, 182.5)}}>
          <Enter at={178.8} x={540} y={760} bouncy><CharterDoc w={250} write={1} seal={1} lines={4} /></Enter>
          {[
            {at: 179.4, x: 210, icon: 'ordinateur', label: 'Internet'},
            {at: 180.0, x: 540, icon: 'haut-parleur', label: 'Médias'},
            {at: 181.7, x: 870, icon: '', label: 'Emballages'},
          ].map((c) => (
            <Enter key={c.label} at={c.at} x={c.x} y={1290} bouncy>
              <div style={{width: 290, height: 330, borderRadius: 36, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, boxShadow: '0 14px 30px rgba(30,25,10,0.16)', borderBottom: `10px solid ${colors.green}`}}>
                {c.icon ? <F n={c.icon} size={170} /> : <Box />}
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: colors.navy}}>{c.label}</div>
              </div>
            </Enter>
          ))}
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            {[210, 540, 870].map((x, i) => (
              <path key={x} d={`M540 940 L${x} 1110`} stroke={colors.green} strokeWidth={8} strokeDasharray="12 12" opacity={prog(t, [179.4, 180.0, 181.7][i], [179.4, 180.0, 181.7][i] + 0.3)} />
            ))}
          </svg>
        </div>
      )}
      {brand && t < 188.9 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 182.5, 188.9)}}>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <path d="M120 1500 C 400 1480, 600 1300, 940 760" stroke={colors.green} strokeWidth={16} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - rocket} />
          </svg>
          <div style={{position: 'absolute', left: interpolate(rocket, [0, 1], [140, 900]), top: interpolate(rocket, [0, 0.5, 1], [1480, 1300, 780]), transform: 'translate(-50%, -50%)'}}>
            <F n="fusee" size={220} />
          </div>
          <Enter at={183.3} x={330} y={820} bouncy><Pill label="Image de marque" icon="etoile" size={38} /></Enter>
          <Enter at={186.8} x={600} y={1600} bouncy><Pill label="Pourquoi adopter une charte ? Voilà !" icon="ampoule" size={30} /></Enter>
        </div>
      )}
      {t >= 188.9 && (
        <>
          <Enter at={189.0} x={540} y={1000} bouncy>
            <svg width={760} height={560} viewBox="0 0 760 560">
              <rect x={40} y={460} width={680} height={24} rx={12} fill={colors.ink} />
              <polygon points="380,470 330,540 430,540" fill={colors.navy} />
              <g transform={`rotate(${-14 * prog(t, 189.4, 190.2, easeOut)} 380 470)`}>
                <rect x={60} y={440} width={640} height={26} rx={13} fill={colors.green} />
                <rect x={600} y={330} width={100} height={110} rx={14} fill={colors.ochre} />
                <text x={650} y={400} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={40} fill="#fff">↑</text>
              </g>
            </svg>
          </Enter>
          <Enter at={191.9} x={300} y={760} bouncy><F n="yeux" size={150} float={6} /></Enter>
          <Enter at={192.4} x={780} y={760} bouncy><F n="trophee" size={150} float={6} /></Enter>
          <Enter at={192.6} x={540} y={1480} bouncy><Pill label="L'excellence visible de tous" icon="etincelles" size={36} /></Enter>
        </>
      )}
    </div>
  );
};

const STEPS = [
  {at: 203.7, icon: 'equipe', label: 'Groupes de travail', sub: 'tous les métiers mélangés'},
  {at: 211.0, icon: 'cible', label: 'Objectifs', sub: 'alignés sur la stratégie'},
  {at: 213.6, icon: 'clipboard', label: 'Responsabilités', sub: 'qui fait quoi'},
  {at: 215.9, icon: 'graphique', label: 'Indicateurs', sub: 'mesurer la progression'},
];

/** 201 – 228,8 s : méthodologie collaborative, les moyens, le piège de l'étagère. */
export const Methode: React.FC = () => {
  const t = useT();
  const out = prog(t, 228.5, 228.8, easeIn);
  const steps = t < 218.0;
  const team = t >= 218.0 && t < 220.0;
  const means = t >= 220.0 && t < 224.5;
  const shelf = t >= 224.5;
  const tilt = interpolate(prog(t, 221.6, 223.4, easeInOut), [0, 1], [-10, 0]);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Le maître mot : *collaboration*" at={201.0} until={217.95} y={420} size={70} maxWidth={1000} />
      <Kinetic text="Un vrai boulot d'*équipe*" at={218.0} until={219.95} y={420} size={80} maxWidth={1000} />
      <Kinetic text="Des *moyens* à la hauteur" at={220.0} until={224.45} y={420} size={78} maxWidth={1000} />
      <Kinetic text="Le *pire* : l'étagère" at={224.5} until={228.7} y={420} size={86} accent={RED} />

      {steps && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 201, 218)}}>
          <Enter at={201.1} until={203.6} x={540} y={1000} bouncy><F n="poignee" size={320} float={6} /></Enter>
          {t >= 203.6 && (
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <path d="M110 620 V 1560" stroke={colors.green} strokeWidth={8} strokeDasharray="14 12" opacity={0.6} />
            </svg>
          )}
          {STEPS.map((st, i) => (
            <Row key={st.label} at={st.at} x={590} y={680 + i * 230} icon={st.icon} label={st.label} sub={st.sub} num={i + 1} w={900} color={i % 2 ? colors.navy : colors.green} />
          ))}
          <PhotoCard src="formation-incendie" at={205.8} until={210.9} x={760} y={1250} w={520} h={330} pos="50% 40%" from="scale" label="Tous les métiers" icon="equipe" />
        </div>
      )}
      {team && (
        <>
          <PhotoCard src="participants" at={218.05} until={219.95} x={540} y={1020} w={940} h={760} pos="50% 50%" label="Tous impliqués" icon="equipe" />
        </>
      )}
      {means && (
        <>
          <Enter at={220.1} until={224.4} x={540} y={1060} bouncy>
            <svg width={800} height={600} viewBox="0 0 800 600" overflow="visible">
              <rect x={385} y={140} width={30} height={400} rx={10} fill={colors.ink} />
              <rect x={260} y={530} width={280} height={34} rx={14} fill={colors.ink} />
              <g transform={`rotate(${tilt} 400 150)`}>
                <rect x={80} y={136} width={640} height={26} rx={13} fill={colors.navy} />
                <path d="M130 162 L80 330 H260 Z M670 162 L620 330 H800 Z" fill="none" stroke={colors.navy} strokeWidth={6} transform="translate(-40 0)" />
                <ellipse cx={130} cy={330} rx={110} ry={20} fill={colors.ochre} />
                <ellipse cx={670} cy={330} rx={110} ry={20} fill={colors.green} />
              </g>
            </svg>
          </Enter>
          <Enter at={220.8} until={224.4} x={220} y={1450} bouncy><Pill label="Moyens" icon="outils" color={colors.ochre} size={34} /></Enter>
          <Enter at={221.6} until={224.4} x={830} y={1450} bouncy><Pill label="Ambitions" icon="montagne" size={34} /></Enter>
        </>
      )}
      {shelf && (
        <>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <rect x={120} y={1260} width={840} height={30} rx={8} fill="#8B5E34" />
            <rect x={160} y={1290} width={24} height={90} fill="#6E4826" />
            <rect x={896} y={1290} width={24} height={90} fill="#6E4826" />
          </svg>
          <Enter at={224.6} x={540} y={1010} from="up" dist={-500}>
            <CharterDoc w={360} write={1} seal={1} dusty={prog(t, 226.4, 228.0)} />
          </Enter>
          {Array.from({length: 14}, (_, i) => {
            const p = ((t - 226.3) * 0.3 + i / 14) % 1;
            return t > 226.3 ? <div key={i} style={{position: 'absolute', left: 360 + ((i * 97) % 360), top: 760 + p * 480, width: 8, height: 8, borderRadius: 4, background: 'rgba(140,130,110,0.6)', opacity: 1 - p}} /> : null;
          })}
          <Enter at={226.3} x={850} y={760} bouncy><F n="bulle-colere" size={140} /></Enter>
          <Enter at={227.0} x={540} y={1480} bouncy><Pill label="Un joli document… oublié" color={RED} icon="sablier" size={34} /></Enter>
        </>
      )}
    </div>
  );
};

/** 228,8 – 237,3 s : une charte vivante, moteur d'amélioration continue. */
export const Vivante: React.FC = () => {
  const t = useT();
  const out = prog(t, 237.0, 237.3, easeIn);
  const spin = (t - 229) * 40;
  const items = [
    {at: 234.3, label: 'Repérer', icon: 'loupe'},
    {at: 235.0, label: 'Corriger', icon: 'outils'},
    {at: 235.8, label: 'Avancer', icon: 'fusee'},
  ];
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Une charte *vivante*" at={228.85} until={237.2} y={420} size={92} />
      <Underline at={229.8} until={237.2} x={540} y={482} width={420} />
      <Enter at={229.0} x={540} y={1040} bouncy>
        <div style={{position: 'relative', width: 720, height: 720}}>
          <svg width={720} height={720} viewBox="0 0 720 720" style={{position: 'absolute', inset: 0, transform: `rotate(${spin}deg)`}}>
            <circle cx={360} cy={360} r={300} fill="none" stroke={colors.green} strokeWidth={26} strokeDasharray="420 50" strokeLinecap="round" />
            {[0, 1, 2, 3].map((i) => {
              const a = (i / 4) * Math.PI * 2 + 0.55;
              const x = 360 + 300 * Math.cos(a);
              const y = 360 + 300 * Math.sin(a);
              return <polygon key={i} points="-24,-22 24,0 -24,22" fill={colors.green} transform={`translate(${x} ${y}) rotate(${(a * 180) / Math.PI + 90})`} />;
            })}
          </svg>
          <div style={{position: 'absolute', left: 360, top: 360, transform: 'translate(-50%, -50%)'}}>
            <CharterDoc w={250} write={1} seal={1} lines={4} />
          </div>
        </div>
      </Enter>
      <Enter at={231.6} x={540} y={640} bouncy><Pill label="Amélioration continue" icon="recyclage" size={36} /></Enter>
      {items.map((it, i) => (
        <Enter key={it.label} at={it.at} x={[190, 540, 890][i]} y={1490} bouncy>
          <div style={{width: 280, borderRadius: 28, background: i === 2 ? colors.green : colors.navy, color: '#fff', padding: '16px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, fontFamily: sansFont, fontWeight: 900, fontSize: 36, boxShadow: '0 12px 24px rgba(14,42,92,0.25)'}}>
            <F n={it.icon} size={84} />
            {it.label}
          </div>
        </Enter>
      ))}
    </div>
  );
};

/** 243,6 – 264,5 s : la concision — 10 engagements maximum. */
export const Dix: React.FC = () => {
  const t = useT();
  const out = prog(t, 264.2, 264.5, easeIn);
  const n = useCount(251.6, 2.6, 10);
  const pop = useSpring(255.6, {damping: 8});
  const lose = t >= 257.5 && t < 261.7;
  const keep = t >= 261.7;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Un point *clé*" at={243.6} until={248.3} y={420} size={96} />
      <Kinetic text="La *concision*" at={248.35} until={255.55} y={420} size={104} />
      <Kinetic text="Le chiffre *magique*" at={255.6} until={257.45} y={420} size={92} accent={colors.ochre} />
      <Kinetic text="Au-delà, on *perd* les gens" at={257.5} until={261.65} y={420} size={76} maxWidth={1000} accent={RED} />
      <Kinetic text="*10* points applicables" at={261.7} until={264.4} y={420} size={86} />

      {t < 248.35 && (
        <Enter at={243.7} until={248.3} x={540} y={1040} bouncy rotate={Math.sin(t * 3) * 5}>
          <F n="cle" size={340} float={8} />
        </Enter>
      )}
      {t >= 248.35 && t < 257.5 && (
        <>
          <div style={{position: 'absolute', left: 540, top: 1000, transform: `translate(-50%, -50%) scale(${t >= 255.6 ? 0.85 + 0.15 * pop : prog(t, 248.4, 249.0)})`, fontFamily: sansFont, fontWeight: 900, fontSize: 560, lineHeight: 1, color: t >= 254.1 ? colors.green : colors.navy, textShadow: '0 20px 40px rgba(14,42,92,0.2)'}}>
            {t < 251.6 ? 1 : Math.max(1, n)}
          </div>
          <Enter at={252.6} x={540} y={1400} bouncy><Pill label="Grand maximum" icon="stop" color={colors.ochre} size={38} /></Enter>
          <Enter at={254.5} x={540} y={1540} bouncy><Pill label="10 engagements" icon="check" size={38} /></Enter>
          {t >= 255.6 &&
            [0, 1, 2, 3, 4, 5].map((i) => (
              <Enter key={i} at={255.7 + i * 0.07} x={540 + Math.cos(i * 1.05) * 380} y={1000 + Math.sin(i * 1.05) * 330} bouncy>
                <F n="etincelles" size={100} />
              </Enter>
            ))}
        </>
      )}
      {lose && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 257.5, 261.7)}}>
          {Array.from({length: 18}, (_, i) => {
            const p = prog(t, 257.6 + i * 0.08, 258.0 + i * 0.08);
            const gone = i >= 10 ? prog(t, 259.2 + (i - 10) * 0.1, 259.8 + (i - 10) * 0.1) : 0;
            const blur = prog(t, 259.2, 260.4);
            return (
              <div key={i} style={{position: 'absolute', left: 150 + (i % 6) * 156, top: 700 + Math.floor(i / 6) * 190, width: 130, height: 150, borderRadius: 20, background: i >= 10 ? '#FBE9E7' : '#fff', border: `4px solid ${i >= 10 ? RED : '#D9D3C3'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: i >= 10 ? RED : '#8A94A3', opacity: p * (1 - gone * 0.7), transform: `scale(${p}) translateY(${gone * 40}px) rotate(${gone * (i % 2 ? 12 : -12)}deg)`, filter: `blur(${blur * 3}px)`}}>
                {i + 1}
              </div>
            );
          })}
          <Enter at={258.4} x={540} y={1360} bouncy><F n="pensif" size={180} /></Enter>
          <Enter at={259.6} x={540} y={1540} bouncy><Pill label="Message dilué, oublié" color={RED} icon="sablier" size={34} /></Enter>
        </div>
      )}
      {keep && (
        <>
          <Enter at={261.8} x={540} y={1060} bouncy>
            <CharterDoc w={430} write={prog(t, 262.0, 264.0, (v) => v)} lines={10} seal={prog(t, 263.6, 264.0)} />
          </Enter>
        </>
      )}
    </div>
  );
};

const RULES = [
  {at: 267.9, icon: 'montagne', label: 'Réaliste', sub: 'et réalisable'},
  {at: 268.9, icon: 'graphique', label: 'Mesurable', sub: 'et connu de tous'},
  {at: 270.5, icon: 'loupe', label: 'Limpide', sub: 'vocabulaire simple'},
  {at: 272.6, icon: 'memo', label: '1 engagement = 1 phrase', sub: 'courte et simple'},
];

/** 264,5 – 286,5 s : les règles d'or de chaque engagement. */
export const Regles: React.FC = () => {
  const t = useT();
  const out = prog(t, 286.2, 286.5, easeIn);
  const list = t < 275.6;
  const audience = t >= 275.6 && t < 280.2;
  const versus = t >= 280.2;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Les règles d'*or*" at={264.5} until={275.55} y={420} size={96} accent={colors.ochre} />
      <Kinetic text="Compris par *tous*" at={275.6} until={280.15} y={420} size={96} />
      <Kinetic text="Compliquée = *ignorée*" at={280.2} until={283.15} y={420} size={86} accent={RED} />
      <Kinetic text="La *simplicité* frappe" at={283.2} until={286.4} y={420} size={86} maxWidth={1000} />

      {list && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 264.5, 275.6)}}>
          <Enter at={264.6} until={267.8} x={540} y={1040} bouncy><F n="trophee" size={320} float={8} /></Enter>
          {RULES.map((r, i) => (
            <Enter key={r.label} at={r.at} x={540} y={680 + i * 230} from="left" dist={-300}>
              <div style={{width: 940, display: 'flex', alignItems: 'center', gap: 22, background: '#fff', borderRadius: 30, padding: '18px 24px', boxShadow: '0 14px 30px rgba(30,25,10,0.15)', borderLeft: `14px solid ${colors.ochre}`}}>
                <F n={r.icon} size={96} />
                <div style={{fontFamily: sansFont}}>
                  <div style={{fontWeight: 900, fontSize: 46, color: colors.navy}}>{r.label}</div>
                  <div style={{fontWeight: 600, fontSize: 30, color: '#5B6675'}}>{r.sub}</div>
                </div>
                <div style={{marginLeft: 'auto', transform: `scale(${prog(t, r.at + 0.4, r.at + 0.7)})`}}><Verdict ok size={86} /></div>
              </div>
            </Enter>
          ))}
        </div>
      )}
      {audience && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 275.6, 280.2)}}>
          <PhotoCard src="hse-machine" at={276.0} x={300} y={980} w={470} h={620} pos="70% 40%" label="Technicien" icon="outils" rotate={-2} from="left" />
          <PhotoCard src="participants" at={279.0} x={790} y={1010} w={470} h={620} pos="40% 50%" label="Grand public" icon="equipe" rotate={2} from="right" />
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <path d="M420 1370 Q 540 1460 660 1370" stroke={colors.green} strokeWidth={10} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - prog(t, 278.4, 279.3)} />
          </svg>
          <Enter at={276.6} x={540} y={1520} bouncy><Pill label="Un vocabulaire compris à la volée" icon="bulle" size={30} /></Enter>
        </div>
      )}
      {versus && (
        <>
          <Enter at={280.3} x={300} y={1000} bouncy>
            <div style={{position: 'relative', filter: `grayscale(${prog(t, 281.8, 282.6)})`, opacity: 1 - 0.4 * prog(t, 281.8, 282.6)}}>
              <div style={{width: 380, height: 480, borderRadius: 20, background: '#FFFDF7', boxShadow: '0 18px 34px rgba(0,0,0,0.18)', padding: 26, overflow: 'hidden'}}>
                {Array.from({length: 16}, (_, i) => (
                  <div key={i} style={{height: 8, borderRadius: 4, marginBottom: 18, background: '#B9C1CC', width: `${60 + ((i * 37) % 40)}%`}} />
                ))}
              </div>
              <div style={{position: 'absolute', right: -30, top: -30}}><Verdict ok={false} size={110} /></div>
            </div>
          </Enter>
          <Enter at={283.3} x={790} y={1000} bouncy>
            <div style={{position: 'relative'}}>
              <CharterDoc w={360} write={1} seal={1} lines={4} />
              <div style={{position: 'absolute', right: -30, top: -30}}><Verdict ok size={110} /></div>
            </div>
          </Enter>
          <Enter at={284.6} x={540} y={1490} bouncy><Pill label="Sa force de frappe" icon="eclair" size={38} /></Enter>
        </>
      )}
    </div>
  );
};

/** 286,5 – 305,3 s : conclusion — s'engager publiquement, la clé de voûte. */
export const Conclusion: React.FC = () => {
  const t = useT();
  const out = prog(t, 305.0, 305.3, easeIn);
  const arena = t < 294.8;
  const silence = t >= 294.8 && t < 301.3;
  const arch = t >= 301.3 && t < 303.6;
  const keyDrop = prog(t, 301.6, 302.6, easeOut);
  const ask = t >= 303.6;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Une vraie *réflexion*" at={286.5} until={288.75} y={420} size={90} />
      <Kinetic text="Un monde *concurrentiel*" at={288.8} until={290.9} y={420} size={80} maxWidth={1000} />
      <Kinetic text="Prouver ce qu'on *vaut*" at={290.95} until={294.75} y={420} size={84} maxWidth={1000} />
      <Kinetic text="Ne plus garder le *silence*" at={294.8} until={301.25} y={420} size={78} maxWidth={1000} />
      <Kinetic text="La clé de *voûte*" at={301.3} until={303.55} y={420} size={96} />

      {arena && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 286.5, 294.8)}}>
          <Enter at={286.6} until={288.7} x={540} y={1040} bouncy><F n="pensif" size={320} float={8} /></Enter>
          {t >= 288.8 && (
            <>
              <PhotoCard src="raffinerie" at={288.85} x={540} y={900} w={940} h={600} pos="50% 45%" label="Concurrence mondiale" icon="globe" />
              <Enter at={291.6} x={300} y={1400} bouncy><Pill label="Prouver sa valeur" icon="medaille" size={34} /></Enter>
              <Enter at={293.4} x={760} y={1530} bouncy><Pill label="S'engager publiquement" icon="megaphone" size={34} /></Enter>
            </>
          )}
        </div>
      )}
      {silence && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 294.8, 301.3)}}>
          <Enter at={294.9} x={540} y={1000} bouncy><CharterDoc w={400} write={1} seal={1} /></Enter>
          <Enter at={295.6} x={320} y={1450} bouncy><Pill label="Avantages stratégiques" icon="engrenage" size={30} /></Enter>
          <Enter at={298.8} x={830} y={760} bouncy><F n="haut-parleur" size={190} float={6} /></Enter>
          <Enter at={299.6} x={760} y={1560} bouncy>
            <div style={{position: 'relative'}}>
              <Pill label="Sous silence" color={RED} icon="stop" size={34} />
              <div style={{position: 'absolute', left: 60, top: '45%', width: 260}}><Strike p={prog(t, 300.0, 300.5)} w={240} /></div>
            </div>
          </Enter>
        </div>
      )}
      {arch && (
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: fade(t, 301.3, 303.6)}}>
          {Array.from({length: 8}, (_, i) => {
            if (i === 4 || i === 3) return null;
            const a0 = Math.PI - (i / 8) * Math.PI;
            const a1 = Math.PI - ((i + 1) / 8) * Math.PI;
            const cx = 540;
            const cy = 1320;
            const R = 400;
            const r = 280;
            const p = (a: number, rr: number) => `${cx + rr * Math.cos(a)},${cy - rr * Math.sin(a)}`;
            return <polygon key={i} points={`${p(a0, R)} ${p(a1, R)} ${p(a1, r)} ${p(a0, r)}`} fill={i % 2 ? colors.navy : '#3F6AA8'} stroke="#F1EDE3" strokeWidth={8} opacity={prog(t, 301.35 + i * 0.03, 301.6 + i * 0.03)} />;
          })}
          <g transform={`translate(0 ${(1 - keyDrop) * -420})`} opacity={prog(t, 301.6, 301.8)}>
            <polygon points={`${540 + 400 * Math.cos((5 / 8) * Math.PI)},${1320 - 400 * Math.sin((5 / 8) * Math.PI)} ${540 + 400 * Math.cos((3 / 8) * Math.PI)},${1320 - 400 * Math.sin((3 / 8) * Math.PI)} ${540 + 280 * Math.cos((3 / 8) * Math.PI)},${1320 - 280 * Math.sin((3 / 8) * Math.PI)} ${540 + 280 * Math.cos((5 / 8) * Math.PI)},${1320 - 280 * Math.sin((5 / 8) * Math.PI)}`} fill={colors.green} stroke="#F1EDE3" strokeWidth={8} />
            <text x={540} y={990} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={34} fill="#fff">CHARTE</text>
          </g>
          <rect x={100} y={1320} width={240} height={30} fill={colors.ink} opacity={0.15} />
          <rect x={740} y={1320} width={240} height={30} fill={colors.ink} opacity={0.15} />
          <text x={540} y={1460} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={46} fill={colors.navy} opacity={prog(t, 302.4, 302.8)}>PERFORMANCE</text>
        </svg>
      )}
      {ask && (
        <>
          <Kinetic text="Pouvez-vous ignorer vos *standards* ?" at={303.65} until={305.2} y={900} size={84} maxWidth={1000} />
          <Enter at={303.8} x={540} y={1250} bouncy rotate={Math.sin(t * 4) * 6}><F n="question" size={240} /></Enter>
        </>
      )}
    </div>
  );
};
