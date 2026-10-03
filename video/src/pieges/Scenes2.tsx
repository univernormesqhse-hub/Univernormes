import {easeInOut, easeOut, Enter, kf, Kinetic, prog, useT} from '../anim';
import {CharterDoc, PhotoCard, RED, Strike} from '../charte/ui';
import {Note, Stamp, Win} from '../danger2/ui';
import {F, Pill} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';
import {BLUE, Clause, Count, Duel, GOLD, Steps} from './ui';

/** 351,1 – 480,5 s : culture qualité et éthique. */
export const Culture: React.FC = () => {
  const t = useT();
  const k = (at: number) => prog(t, at, at + 0.5, easeOut);
  return (
    <>
      <Kinetic text="Virage vers l'*humain*" at={351.1} until={368.35} y={420} size={88} accent={colors.green} maxWidth={1000} />
      <Kinetic text="Comme un *orchestre*" at={368.4} until={386.7} y={420} size={88} accent={colors.green} maxWidth={1000} />
      <Kinetic text="Auditer une *culture* ?" at={386.75} until={412.35} y={420} size={84} accent={colors.green} maxWidth={1000} />
      <Kinetic text="Des preuves *tangibles*" at={412.4} until={455.0} y={420} size={86} accent={colors.green} maxWidth={1000} />
      <Kinetic text="Des savoirs *vivants*" at={455.05} until={480.4} y={420} size={88} accent={colors.green} maxWidth={1000} />

      <Win a={351.1} b={368.35}>
        <Enter at={355.3} x={540} y={850} bouncy><F n="cerveau" size={300} float={6} /></Enter>
        <Enter at={361.6} x={290} y={1170} bouncy><Pill label="Culture qualité" icon="equipe" color={colors.green} size={32} /></Enter>
        <Enter at={363.8} x={790} y={1170} bouncy><Pill label="Comportement éthique" icon="balance" color={colors.green} size={32} /></Enter>
        <Enter at={366.2} x={330} y={1360} bouncy><Clause n="5.1.1" color={colors.green} /></Enter>
        <Enter at={367.4} x={750} y={1360} bouncy><Clause n="7.3" color={colors.green} /></Enter>
      </Win>

      <Win a={368.4} b={386.7}>
        <Enter at={373.9} x={290} y={950} bouncy>
          <div style={{textAlign: 'center'}}>
            <div style={{display: 'flex', gap: 6, justifyContent: 'center'}}><F n="parchemin" size={130} /><F n="memo" size={130} /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#7A8594'}}>2015 : les partitions</div>
          </div>
        </Enter>
        <Enter at={376.9} x={290} y={1180} bouncy><Note text="…mais jouent-ils ensemble ?" color={RED} size={40} /></Enter>
        <Enter at={380.2} x={790} y={950} bouncy>
          <div style={{textAlign: 'center'}}>
            <div style={{transform: `scale(${1 + 0.04 * Math.sin(t * 6)})`}}><F n="equipe" size={220} /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: colors.green}}>2026 : l'harmonie</div>
          </div>
        </Enter>
        {t > 384.8 && <div style={{position: 'absolute', left: 540, top: 1380, transform: 'translate(-50%, -50%)'}}><Stamp text="COHÉSION" p={prog(t, 384.8, 385.1)} color={colors.green} size={56} /></div>}
      </Win>

      <Win a={386.75} b={412.35}>
        {t < 399.0 && <Enter at={387.0} x={540} y={950} bouncy><F n="question" size={300} /></Enter>}
        {t >= 399.0 && (
          <>
            <Enter at={400.3} x={540} y={900} bouncy>
              <div style={{position: 'relative', width: 520, height: 380, borderRadius: 16, background: '#FDFBF4', border: '18px solid #A07B4F', boxShadow: '0 20px 40px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: colors.navy}}>NOS VALEURS</div>
                <div style={{fontFamily: handFont, fontSize: 36, color: '#7A8594'}}>Respect · Excellence · Intégrité</div>
                <div style={{position: 'absolute', left: -20, right: -20, top: '50%'}}><Strike p={prog(t, 408.2, 408.8)} w={560} /></div>
              </div>
            </Enter>
            <Enter at={408.6} x={540} y={1220} bouncy><Note text="ça ne vaut rien en audit" color={RED} size={54} /></Enter>
            <Enter at={410.5} x={540} y={1380} bouncy><Pill label="Des comportements observables" icon="yeux" color={colors.green} size={32} /></Enter>
          </>
        )}
      </Win>

      <Win a={412.4} b={455.0}>
        <Steps
          y={650}
          gap={190}
          active={t < 441.0 ? 0 : t < 451.0 ? 1 : 2}
          items={[
            {l: 'Registres de non-conformité', s: 'les problèmes sont-ils signalés ?', icon: 'clipboard', at: 419.4},
            {l: 'Revues de direction', s: 'décisions sur données réelles ?', icon: 'graphique', at: 441.0},
            {l: 'Entretiens avec le personnel', s: 'ce que vit le terrain', icon: 'bulle', at: 451.2},
          ]}
        />
        {t > 422.3 && t < 441.0 && (
          <>
            <Enter at={422.4} x={300} y={1260} bouncy><F n="anxieux" size={180} /></Enter>
            <Enter at={426.4} x={720} y={1220} bouncy><Pill label="Peur de bloquer la production ?" icon="stop" color={RED} size={28} /></Enter>
            {t > 432.6 && <div style={{position: 'absolute', left: 700, top: 1380, transform: 'translate(-50%, -50%)'}}><Stamp text="CULTURE DÉFAILLANTE" p={prog(t, 432.6, 432.9)} color={RED} size={40} /></div>}
          </>
        )}
        {t >= 441.0 && <PhotoCard src="iso26/direction-equipe.jpg" at={442.0} x={540} y={1300} w={860} h={330} label="Les dirigeants face aux faits" icon="graphique" from="down" />}
      </Win>

      <Win a={455.05} b={480.4}>
        <Enter at={458.7} x={540} y={640} bouncy><Clause n="7.1.6" label="Connaissances" color={colors.green} /></Enter>
        {[
          ['Conservé', 'classeur', 466.0],
          ['Appliqué', 'outils', 468.1],
          ['Partagé', 'equipe', 469.0],
        ].map(([l, ic, at], i) => (
          <div key={l as string}>
            <div style={{position: 'absolute', left: 200 + i * 340, top: 900, transform: `translate(-50%, -50%) scale(${k(at as number)})`}}>
              <div style={{width: 280, height: 260, borderRadius: 36, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 14px 30px rgba(14,30,60,0.16)', borderBottom: `10px solid ${colors.green}`}}>
                <F n={ic as string} size={120} />
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: colors.navy}}>{l}</div>
              </div>
            </div>
            {i < 2 && <div style={{position: 'absolute', left: 370 + i * 340, top: 900, transform: 'translate(-50%, -50%)', fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: colors.green, opacity: k((at as number) + 0.3)}}>→</div>}
          </div>
        ))}
        <Enter at={470.5} x={540} y={1230} bouncy>
          <div style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 16, background: '#fff', borderRadius: 22, padding: '12px 24px', opacity: 1 - 0.4 * prog(t, 473.0, 473.4)}}>
            <F n="ordinateur" size={80} />
            <div style={{fontFamily: handFont, fontSize: 40, color: '#7A8594'}}>le dossier que personne n'ouvre</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: '50%'}}><Strike p={prog(t, 472.8, 473.3)} w={620} /></div>
          </div>
        </Enter>
        {t > 477.3 && <div style={{position: 'absolute', left: 540, top: 1420, transform: 'translate(-50%, -50%)'}}><Stamp text="SAVOIR INUTILISÉ = NON CONFORME" p={prog(t, 477.3, 477.6)} color={RED} size={36} /></div>}
      </Win>
    </>
  );
};

/** 485,1 – 606,8 s : climat, risques, résilience. */
export const Climat: React.FC = () => {
  const t = useT();
  const water = kf(t, [511.5, 514.5], [0, 1]);
  return (
    <>
      <Kinetic text="Un monde *chaotique*" at={485.1} until={498.1} y={420} size={88} accent={RED} maxWidth={1000} />
      <Kinetic text="Le *climat* entre en jeu" at={498.15} until={516.05} y={420} size={84} accent={BLUE} maxWidth={1000} />
      <Kinetic text="Un manuel de *500 pages* ?" at={516.1} until={554.15} y={420} size={78} accent={RED} maxWidth={1000} />
      <Kinetic text="Risques ≠ *opportunités*" at={554.2} until={588.3} y={420} size={82} accent={GOLD} maxWidth={1000} />
      <Kinetic text="Continuer *quoi qu'il arrive*" at={588.35} until={606.75} y={420} size={78} accent={colors.green} maxWidth={1000} />

      <Win a={485.1} b={498.1}>
        <Enter at={486.0} x={540} y={950} bouncy><div style={{transform: `rotate(${Math.sin(t * 2) * 6}deg)`}}><F n="globe" size={320} /></div></Enter>
        <Enter at={490.6} x={240} y={760} bouncy><F n="eclair" size={140} /></Enter>
        <Enter at={491.2} x={840} y={800} bouncy><F n="vent" size={140} /></Enter>
        <Enter at={493.4} x={250} y={1260} bouncy><Pill label="Changement climatique" icon="thermometre" color={RED} size={28} /></Enter>
        <Enter at={494.2} x={820} y={1260} bouncy><Pill label="Gestion des crises" icon="gyrophare" color={RED} size={28} /></Enter>
      </Win>

      <Win a={498.15} b={516.05}>
        <Enter at={498.6} x={540} y={640} bouncy>
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <Pill label="Amendement climat · février 2024" icon="calendrier" color={BLUE} size={30} />
          </div>
        </Enter>
        <Enter at={502.3} x={330} y={800} bouncy><Clause n="4.1" color={BLUE} /></Enter>
        <Enter at={503.4} x={750} y={800} bouncy><Clause n="4.2" color={BLUE} /></Enter>
        {/* route inondée */}
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: prog(t, 510.8, 511.3)}}>
          <rect x={60} y={1040} width={960} height={340} rx={30} fill="#D8CFB9" />
          <rect x={60} y={1170} width={960} height={90} fill="#8A8F98" />
          {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={110 + i * 160} y={1210} width={80} height={10} fill="#fff" />)}
          <rect x={60} y={1380 - 300 * water} width={960} height={300 * water} rx={20} fill="#5C8FB5" opacity={0.75} />
        </svg>
        {t > 510.8 && <div style={{position: 'absolute', left: 540, top: 1180 - 20 * Math.sin(t * 3) * water, transform: 'translate(-50%, -50%)', opacity: prog(t, 511.0, 511.4)}}><F n="camion" size={170} /></div>}
        {t > 514.3 && <div style={{position: 'absolute', left: 540, top: 1490, transform: 'translate(-50%, -50%)'}}><Stamp text="SYSTÈME QUALITÉ MENACÉ" p={prog(t, 514.3, 514.6)} color={RED} size={42} /></div>}
      </Win>

      <Win a={516.1} b={554.15}>
        {t < 530.3 && (
          <>
            {[0, 1, 2, 3].map((i) => <Enter key={i} at={523.6 + i * 0.3} x={540} y={1050 - i * 60} from="up" dist={-260}><CharterDoc w={360} write={1} title="GESTION DES RISQUES" lines={3} /></Enter>)}
            <Enter at={527.0} x={830} y={760} bouncy><Count to={500} at={527.0} dur={2} suffix=" p." size={90} color={RED} /></Enter>
          </>
        )}
        {t >= 530.3 && (
          <>
            <Enter at={530.4} x={540} y={760} bouncy><Stamp text="MYTHE" p={prog(t, 530.4, 530.7)} color={RED} size={90} /></Enter>
            <Enter at={535.5} x={540} y={1000} bouncy><Pill label="Aucun processus documenté exigé" icon="check" color={colors.green} size={34} /></Enter>
            <Enter at={542.3} x={540} y={1160} bouncy><Note text="une réflexion basée sur le risque" color={colors.green} size={52} /></Enter>
            <Enter at={547.1} x={540} y={1330} bouncy><Pill label="ISO 31000 : optionnelle" icon="livres" color="#9AA4B2" size={30} /></Enter>
            <Enter at={552.2} x={540} y={1480} bouncy><F n="pouce" size={120} /></Enter>
          </>
        )}
      </Win>

      <Win a={554.2} b={588.3}>
        <Enter at={556.4} x={540} y={630} bouncy><Clause n="6.1" label="chambre à part" color={GOLD} size={0.9} /></Enter>
        <Duel y={1030} h={600}
          a={{t: 'Risques · 6.1.2', s: 'défensif : éviter la catastrophe', icon: 'bouclier', c: RED, at: 571.8}}
          b={{t: 'Opportunités · 6.1.3', s: 'offensif : stratégie de croissance', icon: 'fusee', c: colors.green, at: 579.3}}
        />
        <Enter at={586.0} x={540} y={1440} bouncy><Note text="pas la même grille de lecture" size={50} /></Enter>
      </Win>

      <Win a={588.35} b={606.75}>
        <Enter at={590.0} x={540} y={640} bouncy><Pill label="Continuité d'activité" icon="bouclier" color={colors.green} size={34} /></Enter>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <line x1={100} y1={1300} x2={980} y2={1300} stroke={colors.navy} strokeWidth={6} opacity={0.4} />
          <path d="M100 900 L380 900 C 440 900, 460 1180, 520 1180 C 600 1180, 620 900, 700 880 L980 860" stroke={colors.green} strokeWidth={12} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - kf(t, [592.7, 602.5], [0, 1])} />
        </svg>
        <Enter at={594.4} x={520} y={1250} bouncy><Pill label="Situation dégradée" icon="eclair" color={RED} size={26} /></Enter>
        {t > 602.2 && <div style={{position: 'absolute', left: 820, top: 760, transform: 'translate(-50%, -50%)'}}><Stamp text="RÉSILIENCE" p={prog(t, 602.2, 602.5)} color={colors.green} size={52} /></div>}
      </Win>
    </>
  );
};

