import {easeInOut, easeOut, Enter, Kinetic, prog, useSpring, useT} from '../anim';
import {PhotoCard, RED, Strike} from '../charte/ui';
import {Note, Op, Stamp, Win} from '../danger2/ui';
import {F, IsoCard, Pill} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';
import {BLUE, Clause, Count, Duel, GOLD, PURPLE, Steps, Timeline} from './ui';

/** Carte « norme » générique. */
const NormCard: React.FC<{code: string; name: string; icon: string; color: string}> = ({code, name, icon, color}) => (
  <div style={{width: 320, padding: '24px 0', borderRadius: 30, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, boxShadow: '0 16px 32px rgba(14,30,60,0.18)', borderTop: `14px solid ${color}`}}>
    <F n={icon} size={130} />
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: colors.ink, letterSpacing: 2}}>ISO</div>
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 70, color, lineHeight: 1}}>{code}</div>
    <div style={{fontFamily: handFont, fontSize: 36, color: colors.navy}}>{name}</div>
  </div>
);

/** 612,3 – 746,7 s : l'IA, le fantôme dans la machine. */
export const IA: React.FC = () => {
  const t = useT();
  const typed = 'IA'.slice(0, Math.max(0, Math.floor((t - 623.6) * 4)));
  const pts = Math.round(4 + 3 * prog(t, 707.2, 708.7, easeOut));
  return (
    <>
      <Kinetic text="L'intelligence *artificielle*" at={612.3} until={630.65} y={420} size={78} accent={PURPLE} maxWidth={1000} />
      <Kinetic text="Un texte *obsolète* ?" at={630.7} until={652.15} y={420} size={86} accent={RED} maxWidth={1000} />
      <Kinetic text="Le *quoi*, pas le *comment*" at={652.2} until={668.65} y={420} size={82} accent={PURPLE} maxWidth={1000} />
      <Kinetic text="Le fantôme dans la *machine*" at={668.7} until={702.4} y={420} size={78} accent={PURPLE} maxWidth={1000} />
      <Kinetic text="Gérer les *changements*" at={702.45} until={746.7} y={420} size={84} accent={PURPLE} maxWidth={1000} />

      <Win a={612.3} b={630.65}>
        <Enter at={616.3} x={540} y={830} bouncy><F n="ordinateur" size={280} /></Enter>
        {t > 622.8 && (
          <Enter at={622.8} x={540} y={1170} from="down" dist={140}>
            <div style={{width: 760, background: '#fff', borderRadius: 26, padding: '20px 28px', boxShadow: '0 14px 30px rgba(14,30,60,0.18)'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 14, border: '4px solid #DDE3EA', borderRadius: 16, padding: '10px 16px'}}>
                <F n="loupe2" size={60} />
                <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 44, color: colors.navy}}>{typed}<span style={{opacity: Math.sin(t * 12) > 0 ? 1 : 0, color: PURPLE}}>|</span></div>
              </div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: RED, marginTop: 14, opacity: prog(t, 625.5, 625.9)}}>0 résultat dans l'ISO 9001:2026</div>
            </div>
          </Enter>
        )}
      </Win>

      <Win a={630.7} b={652.15}>
        {t < 642.9 && <Enter at={631.0} x={540} y={950} bouncy><div style={{position: 'relative'}}><IsoCard year="2026" active w={330} /><div style={{position: 'absolute', right: -60, top: -40}}><F n="question" size={150} /></div></div></Enter>}
        {t >= 642.9 && (
          <>
            <Enter at={643.0} x={290} y={950} from="left" dist={-260}><NormCard code="9001" name="Qualité" icon="trophee" color={colors.navy} /></Enter>
            <Enter at={647.7} x={790} y={950} from="right" dist={260}><NormCard code="42001" name="Intelligence artificielle" icon="ordinateur" color={PURPLE} /></Enter>
            <Enter at={650.1} x={540} y={1360} bouncy><Pill label="Pas de doublon : une approche sage" icon="ampoule" color={colors.green} size={30} /></Enter>
          </>
        )}
      </Win>

      <Win a={652.2} b={668.65}>
        <Duel y={960} h={540}
          a={{t: 'Le quoi', s: 'fiabilité, compétence', icon: 'cible', c: colors.green, at: 654.7}}
          b={{t: 'Le comment', s: 'libre : peu importe l’outil', icon: 'outils', c: '#9AA4B2', at: 655.6}}
        />
        <Enter at={663.7} x={540} y={1390} bouncy><Note text="l'IA est encadrée indirectement" color={PURPLE} size={52} /></Enter>
      </Win>

      <Win a={668.7} b={702.4}>
        {t < 679.2 && (
          <>
            <PhotoCard src="iso26/analyste-kpi.jpg" at={669.0} y={860} w={900} h={440} label="Cas pratique" icon="ordinateur" from="scale" />
            <Enter at={671.2} x={290} y={1260} bouncy><div style={{display: 'flex', alignItems: 'center', gap: 10}}><F n="ordinateur" size={110} /><Pill label="Procédure générée par IA" color={PURPLE} size={26} /></div></Enter>
            <Enter at={673.5} x={790} y={1260} bouncy><div style={{display: 'flex', alignItems: 'center', gap: 10}}><F n="anxieux" size={110} /><Pill label="Incompréhensible" color={RED} size={26} /></div></Enter>
            {t > 676.9 && <div style={{position: 'absolute', left: 540, top: 1440, transform: 'translate(-50%, -50%)'}}><Stamp text="DÉFAILLANCE DE CULTURE" p={prog(t, 676.9, 677.2)} color={RED} size={40} /></div>}
          </>
        )}
        {t >= 679.2 && (
          <>
            <Enter at={679.3} x={540} y={820} bouncy>
              <div style={{width: 700, background: '#fff', borderRadius: 26, padding: '22px 28px', boxShadow: '0 14px 30px rgba(14,30,60,0.18)', borderTop: `12px solid ${PURPLE}`}}>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: colors.navy}}>REVUE DE DIRECTION</div>
                <div style={{display: 'flex', alignItems: 'flex-end', gap: 18, height: 160, marginTop: 14}}>
                  {[0.5, 0.7, 0.4, 1].map((h, i) => <div key={i} style={{flex: 1, height: `${h * 100}%`, borderRadius: 10, background: i === 3 ? PURPLE : '#C9D3DE', outline: i === 3 && t > 681.3 ? `5px dashed ${RED}` : 'none'}} />)}
                </div>
              </div>
            </Enter>
            <Enter at={681.3} x={850} y={700} bouncy><Pill label="Donnée inventée !" icon="question" color={RED} size={26} /></Enter>
            <Enter at={685.2} x={540} y={1140} bouncy><Pill label="Décision fondée sur des preuves : enfreinte" icon="balance" color={RED} size={28} /></Enter>
            <Enter at={691.6} x={290} y={1330} bouncy><Pill label="Responsabilités claires" icon="homme-bureau" color={colors.green} size={26} /></Enter>
            <Enter at={695.6} x={790} y={1330} bouncy><Pill label="Données fiables" icon="check" color={colors.green} size={26} /></Enter>
            <Enter at={697.4} x={540} y={1490} bouncy><Note text="le fantôme dans la machine" color={PURPLE} size={52} /></Enter>
          </>
        )}
      </Win>

      <Win a={702.45} b={746.7}>
        {t < 723.5 && (
          <>
            <Enter at={704.8} x={540} y={720} bouncy><Clause n="6.3" label="Gestion des modifications" color={PURPLE} /></Enter>
            <Enter at={706.3} x={540} y={980} bouncy>
              <div style={{display: 'flex', alignItems: 'baseline', gap: 16}}>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 200, color: PURPLE, lineHeight: 1}}>{pts}</div>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: colors.navy}}>points</div>
              </div>
            </Enter>
            <Enter at={709.5} x={290} y={1240} bouncy><Pill label="Planifier la communication" icon="megaphone" color={PURPLE} size={26} /></Enter>
            <Enter at={711.0} x={790} y={1240} bouncy><Pill label="Évaluer l'efficacité" icon="graphique" color={PURPLE} size={26} /></Enter>
            <Enter at={716.0} x={540} y={1400} bouncy><Note text="beaucoup de travail en plus ?" color={RED} size={50} /></Enter>
          </>
        )}
        {t >= 723.5 && (
          <>
            <Duel y={960} h={580}
              a={{t: 'Prendre en compte', s: 'à inclure obligatoirement', icon: 'cadenas', c: colors.navy, at: 724.3}}
              b={{t: 'Considérer', s: 'y réfléchir, puis décider', icon: 'cerveau', c: colors.green, at: 725.8}}
            />
            <Enter at={737.4} x={790} y={1330} bouncy><Pill label="Les 7 points de la 6.3" icon="memo" color={colors.green} size={26} /></Enter>
            {t > 745.2 && <div style={{position: 'absolute', left: 540, top: 1480, transform: 'translate(-50%, -50%)'}}><Stamp text="SOUPLESSE" p={prog(t, 745.2, 745.5)} color={colors.green} size={50} /></div>}
          </>
        )}
      </Win>
    </>
  );
};

/** 753,1 – 831 s : réussir sa transition. */
export const Transition: React.FC = () => {
  const t = useT();
  const step = t < 809.2 ? 0 : t < 812.6 ? 1 : t < 815.8 ? 2 : t < 824.1 ? 3 : 4;
  return (
    <>
      <Kinetic text="Pas de *panique*" at={753.1} until={777.35} y={420} size={96} accent={colors.green} />
      <Kinetic text="Le compte à *rebours*" at={777.4} until={801.0} y={420} size={88} accent={RED} maxWidth={1000} />
      <Kinetic text="La méthode des *experts*" at={801.05} until={830.95} y={420} size={82} accent={colors.green} maxWidth={1000} />

      <Win a={753.1} b={777.35}>
        {t < 765.1 && (
          <>
            <Enter at={758.9} x={540} y={900} bouncy><F n="poubelle" size={240} /></Enter>
            <Enter at={761.6} x={540} y={1180} bouncy><div style={{position: 'relative', fontFamily: handFont, fontSize: 56, color: RED}}>tout jeter et recommencer<div style={{position: 'absolute', left: -6, right: -6, top: '50%'}}><Strike p={prog(t, 762.0, 762.5)} w={560} /></div></div></Enter>
          </>
        )}
        {t >= 765.1 && (
          <>
            <div style={{position: 'absolute', left: 540, top: 1000, transform: `translate(-50%, -50%) rotate(${(t - 765) * 20}deg)`, opacity: prog(t, 765.2, 765.6)}}>
              <svg width={560} height={560} viewBox="-280 -280 560 560">
                {[['PLAN', colors.navy], ['DO', colors.green], ['CHECK', GOLD], ['ACT', BLUE]].map(([l, c], i) => {
                  const a0 = (i * 90 - 90) * (Math.PI / 180);
                  const a1 = ((i + 1) * 90 - 90) * (Math.PI / 180);
                  const r = 260;
                  return (
                    <g key={l}>
                      <path d={`M0 0 L${Math.cos(a0) * r} ${Math.sin(a0) * r} A${r} ${r} 0 0 1 ${Math.cos(a1) * r} ${Math.sin(a1) * r} Z`} fill={c} stroke="#fff" strokeWidth={8} />
                      <text x={Math.cos((a0 + a1) / 2) * 160} y={Math.sin((a0 + a1) / 2) * 160 + 14} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={42} fill="#fff">{l}</text>
                    </g>
                  );
                })}
                <circle r={70} fill="#fff" />
              </svg>
            </div>
            <Enter at={767.4} x={540} y={1000} bouncy><F n="check" size={110} /></Enter>
            <Enter at={773.9} x={540} y={1400} bouncy><Pill label="Une évolution de maturité, pas une refonte" icon="pousse" color={colors.green} size={30} /></Enter>
          </>
        )}
      </Win>

      <Win a={777.4} b={801.0}>
        <Timeline
          at={778.0}
          y={1000}
          marks={[
            {at: 778.4, x: 180, label: '16/09/2026', sub: 'publication', c: colors.green},
            {at: 793.0, x: 540, label: '31/03/2028', sub: 'fin des certifs initiales 2015', c: GOLD},
            {at: 781.8, x: 900, label: '30/09/2029', sub: 'fin de la transition', c: RED},
          ]}
        />
        <Enter at={780.2} x={540} y={680} bouncy><Pill label="3 ans de transition" icon="sablier" color={colors.navy} size={32} /></Enter>
        {t > 785.2 && t < 792.7 && <Enter at={785.3} x={540} y={1400} bouncy><div style={{display: 'flex', alignItems: 'center', gap: 14}}><IsoCard year="2015" w={160} /><Note text="→ à la corbeille" color={RED} size={50} /></div></Enter>}
        {t > 799.2 && <Enter at={799.3} x={540} y={1430} bouncy><F n="chrono" size={150} /></Enter>}
      </Win>

      <Win a={801.05} b={830.95}>
        <Steps
          y={620}
          gap={168}
          active={step}
          items={[
            {l: 'Analyse des écarts', s: 'ne pas se précipiter', icon: 'loupe2', at: 807.3},
            {l: 'Mettre à jour la documentation', s: 'sans tout réinventer', icon: 'memo', at: 809.2},
            {l: 'Vérifier la numérotation', s: 'gare à la clause 10.3', icon: 'clipboard', at: 812.6, c: RED},
            {l: 'Audit interne à blanc', s: 'le conseil en or', icon: 'medaille', at: 815.9, c: GOLD},
            {l: 'Coupler avec le renouvellement', s: 'audit déjà prévu', icon: 'calendrier', at: 824.2},
          ]}
        />
        {step === 3 && <PhotoCard src="promo/audit-reunion.jpg" at={818.0} until={824.1} x={540} y={1470} w={760} h={240} label="Audit à blanc" icon="medaille" from="down" />}
      </Win>
    </>
  );
};

const RECAP = [
  {l: 'Structure & annexe A', icon: 'puzzle', at: 834.9, c: BLUE},
  {l: 'Culture & éthique', icon: 'equipe', at: 838.3, c: colors.green},
  {l: 'Résilience climatique', icon: 'globe', at: 841.6, c: '#1FB89A'},
  {l: 'IA : décision humaine', icon: 'cerveau', at: 844.9, c: PURPLE},
  {l: 'Transition sur 3 ans', icon: 'sablier', at: 851.5, c: GOLD},
];

/** 831 s – outro : synthèse, pourquoi ça compte, question finale. */
export const Conclusion: React.FC<{end: number}> = ({end}) => {
  const t = useT();
  const soul = useSpring(906.5, {damping: 9});
  const warm = prog(t, 899.0, 906.0, easeInOut);
  return (
    <>
      <Kinetic text="Ce qu'il faut *retenir*" at={831.0} until={853.8} y={420} size={86} maxWidth={1000} />
      <Kinetic text="Une question de *survie*" at={853.85} until={874.0} y={420} size={84} accent={RED} maxWidth={1000} />
      <Kinetic text="Auditer *l'âme* ?" at={874.05} until={end} y={420} size={96} accent={GOLD} />

      <Win a={831.0} b={853.8}>
        <Steps y={640} gap={170} items={RECAP.map((r) => ({l: r.l, icon: r.icon, at: r.at, c: r.c}))} />
      </Win>

      <Win a={853.85} b={874.0}>
        <Enter at={859.4} x={540} y={720} bouncy><Pill label="Au-delà du service qualité" icon="batiment" color={colors.navy} size={30} /></Enter>
        {[
          ['Éthique', 'balance', 867.7, colors.green],
          ['Résilient', 'bouclier', 869.1, BLUE],
          ['Humainement intelligent', 'cerveau', 871.3, PURPLE],
        ].map(([l, ic, at, c], i) => (
          <Enter key={l as string} at={at as number} x={200 + i * 340} y={1050} bouncy>
            <div style={{width: 300, height: 320, borderRadius: 40, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: '0 14px 30px rgba(14,30,60,0.16)', borderBottom: `12px solid ${c}`}}>
              <F n={ic as string} size={140} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: colors.navy, textAlign: 'center', lineHeight: 1.1, padding: '0 10px'}}>{l}</div>
            </div>
          </Enter>
        ))}
        <Enter at={864.7} x={540} y={1400} bouncy><Note text="pour survivre" color={RED} size={60} /></Enter>
      </Win>

      <Win a={874.05} b={end + 0.3}>
        <div style={{position: 'absolute', left: 540, top: 900, transform: 'translate(-50%, -50%)', opacity: prog(t, 893.0, 893.5)}}>
          <div style={{width: 420, height: 420, borderRadius: '50%', background: `rgba(${Math.round(60 + 170 * warm)}, ${Math.round(110 + 60 * warm)}, ${Math.round(200 - 140 * warm)}, 0.18)`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {t < 906.5 ? <div style={{transform: `rotate(${t * 30}deg)`, filter: `grayscale(${1 - warm})`}}><F n="engrenage" size={280} /></div> : <div style={{transform: `scale(${soul})`}}><F n="etincelles" size={280} /></div>}
          </div>
        </div>
        <Enter at={893.9} x={540} y={1240} bouncy><Note text={t < 906.5 ? 'des machines froides ?' : "l'âme de l'entreprise"} color={t < 906.5 ? BLUE : GOLD} size={56} /></Enter>
        <Enter at={880.2} until={893.0} x={540} y={900} bouncy><IsoCard year="2026" active w={300} /></Enter>
        <Enter at={884.7} until={893.0} x={540} y={1240} bouncy><Pill label="Exiger l'éthique et la culture…" icon="balance" color={GOLD} size={30} /></Enter>
        <Enter at={908.5} x={540} y={1420} bouncy><Pill label="À méditer…" icon="pensif" color={GOLD} size={32} /></Enter>
      </Win>
    </>
  );
};

