import {easeInOut, easeOut, Enter, kf, Kinetic, prog, useSpring, useT} from '../anim';
import {PhotoCard, RED, Strike} from '../charte/ui';
import {Note, Op, Stamp, Win} from '../danger2/ui';
import {F, Pill} from '../iso/ui';
import {CineShot} from '../prevention2/Cine';
import {Duel, Steps} from '../pieges/ui';
import {colors, handFont, sansFont} from '../theme';
import {ORANGE} from './Scenes1';

/** 151,1 – 204,4 s : la règle des pros. */
export const Pros: React.FC = () => {
  const t = useT();
  return (
    <>
      <Kinetic text="Du risque à la *maîtrise*" at={151.15} until={161.55} y={420} size={82} accent={colors.green} maxWidth={1000} />
      <Kinetic text="Le *harnais* de sécurité" at={161.6} until={175.7} y={420} size={84} accent={ORANGE} maxWidth={1000} />
      <Kinetic text="Une *obligation*" at={175.75} until={187.4} y={420} size={96} accent={RED} />
      <Kinetic text="Le rituel en *3 temps*" at={187.45} until={204.4} y={420} size={86} accent={colors.green} maxWidth={1000} />

      <Win a={151.15} b={161.55}>
        <Duel y={980} h={560} a={{t: 'Discipline', s: 'les bons réflexes', icon: 'cible', c: colors.navy, at: 157.8}} b={{t: 'Outils', s: 'les bons équipements', icon: 'outils', c: ORANGE, at: 158.9}} />
        <Enter at={154.4} x={540} y={640} bouncy><Pill label="Professionnel vs amateur" icon="medaille" color={colors.green} size={32} /></Enter>
      </Win>

      <Win a={161.6} b={175.7}>
        <CineShot src="tirant/harnais.jpg" at={161.7} until={175.7} move="push" pos="50% 40%" y={900} h={720} grade="warm" label="L'outil n°1" />
        {[
          ['Ajusté', 166.9, 220],
          ['Attaché', 168.3, 540],
          ['Inspecté', 170.0, 860],
        ].map(([l, at, x]) => (
          <Enter key={l as string} at={at as number} x={x as number} y={1360} bouncy>
            <div style={{display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 20, padding: '12px 22px', boxShadow: '0 10px 22px rgba(14,30,60,0.16)', borderLeft: `10px solid ${colors.green}`}}>
              <F n="check" size={50} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: colors.navy}}>{l}</div>
            </div>
          </Enter>
        ))}
        {t > 174.4 && <div style={{position: 'absolute', left: 540, top: 1500, transform: 'translate(-50%, -50%)'}}><Stamp text="MAL MIS = POIDS MORT" p={prog(t, 174.4, 174.7)} color={RED} size={44} /></div>}
      </Win>

      <Win a={175.75} b={187.4}>
        <PhotoCard src="epi/harnais.jpg" at={176.0} y={900} w={820} h={620} label="Dès qu'il y a un risque de chute" icon="danger" from="scale" />
        {t > 179.0 && t < 182.0 && (
          <div style={{position: 'absolute', left: 540, top: 1320, transform: 'translate(-50%, -50%)'}}>
            <div style={{position: 'relative', fontFamily: handFont, fontSize: 56, color: '#7A8594', background: '#fff', borderRadius: 16, padding: '0 24px', whiteSpace: 'nowrap'}}>
              une suggestion ? à la carte ?
              <div style={{position: 'absolute', left: 0, right: 0, top: '50%'}}><Strike p={prog(t, 180.4, 180.9)} w={620} /></div>
            </div>
          </div>
        )}
        {t > 181.3 && <div style={{position: 'absolute', left: 540, top: 1340, transform: 'translate(-50%, -50%)'}}><Stamp text="OBLIGATOIRE · NON NÉGOCIABLE" p={prog(t, 181.3, 181.6)} color={RED} size={44} /></div>}
      </Win>

      <Win a={187.45} b={204.4}>
        <Enter at={189.0} x={540} y={620} bouncy><Pill label="Un réflexe mental" icon="cerveau" color={colors.green} size={30} /></Enter>
        <Steps y={790} gap={200} active={t < 196.6 ? 0 : t < 198.6 ? 1 : 2} items={[
          {l: 'Je vérifie mon équipement', icon: 'casque', at: 194.6},
          {l: 'Je vérifie mon point d’ancrage', icon: 'cadenas', at: 196.6, c: ORANGE},
          {l: 'Je vérifie la stabilité', icon: 'batiment', at: 198.7, c: colors.navy},
        ]} />
        {t > 202.6 && <div style={{position: 'absolute', left: 540, top: 1440, transform: 'translate(-50%, -50%)'}}><Stamp text="L'AUTOMATISME QUI SAUVE" p={prog(t, 202.6, 202.9)} color={colors.green} size={46} /></div>}
      </Win>
    </>
  );
};

/** 208,2 – 297,2 s : culture sécurité, QHSE, leaders, autorité d'arrêt. */
export const Culture: React.FC = () => {
  const t = useT();
  const stop = useSpring(273.7, {damping: 8, stiffness: 220});
  return (
    <>
      <Kinetic text="Une *responsabilité* partagée" at={208.25} until={219.4} y={420} size={78} accent={colors.green} maxWidth={1000} />
      <Kinetic text="Le rôle du *QHSE*" at={219.45} until={236.5} y={420} size={92} accent={colors.green} />
      <Kinetic text="Les *leaders* montrent la voie" at={236.55} until={256.95} y={420} size={78} accent={colors.green} maxWidth={1000} />
      <Kinetic text="Quelque chose *cloche* ?" at={257.0} until={273.6} y={420} size={86} accent={ORANGE} maxWidth={1000} />
      <Kinetic text="L'autorité d'*arrêt*" at={273.65} until={297.2} y={420} size={92} accent={RED} />

      <Win a={208.25} b={219.4}>
        {[
          ['homme-bureau', 'Direction', 211.4],
          ['equipe', 'Encadrement', 213.0],
          ['ouvrier', 'Terrain', 216.6],
        ].map(([ic, l, at], i) => (
          <Enter key={l as string} at={at as number} x={540} y={720 + i * 250} from="up" dist={-200}>
            <div style={{width: 460 + i * 200, height: 200, borderRadius: 26, background: [colors.navy, '#2E86C1', colors.green][i], display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, boxShadow: '0 14px 28px rgba(14,42,92,0.3)'}}>
              <F n={ic as string} size={120} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: '#fff', textTransform: 'uppercase'}}>{l}</div>
            </div>
          </Enter>
        ))}
      </Win>

      <Win a={219.45} b={236.5}>
        <Enter at={222.3} x={540} y={640} bouncy><Pill label="Le service QHSE, au cœur de la culture" icon="bouclier" color={colors.green} size={30} /></Enter>
        {[
          ['Former', 'formatrice', 226.7],
          ['Contrôler', 'loupe2', 227.8],
          ['Prévenir', 'bouclier', 232.1],
        ].map(([l, ic, at], i) => (
          <Enter key={l as string} at={at as number} x={200 + i * 340} y={900} bouncy>
            <div style={{width: 300, height: 290, borderRadius: 36, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: '0 14px 30px rgba(14,30,60,0.16)', borderBottom: `12px solid ${i === 2 ? ORANGE : colors.green}`, transform: `scale(${i === 2 && t > 232.1 ? 1.06 : 1})`}}>
              <F n={ic as string} size={130} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: colors.navy}}>{l}</div>
            </div>
          </Enter>
        ))}
        <PhotoCard src="promo/formation-incendie.jpg" at={228.5} x={540} y={1300} w={760} h={300} label="Sur le terrain" icon="casque" from="down" />
        <Enter at={234.3} x={540} y={1520} bouncy><Note text="le meilleur accident : celui qui n'arrive jamais" color={colors.green} size={44} /></Enter>
      </Win>

      <Win a={236.55} b={256.95}>
        <Enter at={241.5} x={540} y={680} bouncy>
          <div style={{display: 'flex', gap: 16}}>
            {['TotalEnergies', 'Shell', 'Orano'].map((n, i) => (
              <div key={n} style={{background: '#fff', borderRadius: 18, padding: '14px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: colors.navy, boxShadow: '0 10px 20px rgba(14,30,60,0.14)', opacity: prog(t, 242.3 + i * 0.8, 242.7 + i * 0.8)}}>{n}</div>
            ))}
          </div>
        </Enter>
        <Enter at={247.6} x={540} y={840} bouncy><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: RED}}>Le coût réel d'un accident</div></Enter>
        {[
          ['Humain', 'pansement', 249.0],
          ['Financier', 'argent', 250.5],
          ["D'image", 'megaphone', 251.6],
        ].map(([l, ic, at], i) => (
          <Enter key={l as string} at={at as number} x={200 + i * 340} y={1080} bouncy><Pill label={l as string} icon={ic as string} color={RED} size={32} /></Enter>
        ))}
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <path d="M140 1450 L360 1380 L560 1400 L760 1290 L940 1210" stroke={colors.green} strokeWidth={12} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - prog(t, 254.1, 255.8, easeInOut)} />
        </svg>
        <Enter at={255.0} x={760} y={1500} bouncy><Note text="un indicateur de performance" color={colors.green} size={48} /></Enter>
      </Win>

      <Win a={257.0} b={273.6}>
        <PhotoCard src="tirant/longes.jpg" at={258.6} y={880} w={860} h={560} label="Procédure suivie, bon équipement…" icon="check" from="scale" />
        <Enter at={262.9} x={830} y={720} bouncy rotate={Math.sin(t * 3) * 8}><F n="question" size={170} /></Enter>
        <Enter at={264.5} x={300} y={1330} bouncy><Pill label="Mauvais pressentiment" icon="pensif" color={ORANGE} size={30} /></Enter>
        <Enter at={267.2} x={760} y={1440} bouncy><Note text="que faire ?" color={ORANGE} size={60} /></Enter>
      </Win>

      <Win a={273.65} b={297.2}>
        {t < 281.75 && (
          <>
            <div style={{position: 'absolute', left: 540, top: 900, transform: `translate(-50%, -50%) scale(${stop})`}}>
              <svg width={440} height={440} viewBox="-110 -110 220 220">
                <polygon points="-45,-108 45,-108 108,-45 108,45 45,108 -45,108 -108,45 -108,-45" fill={RED} stroke="#fff" strokeWidth={8} />
                <text x={0} y={22} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={64} fill="#fff">STOP</text>
              </svg>
            </div>
            {['On arrête tout', 'On n’hésite pas', 'On ne se justifie pas'].map((l, i) => (
              <Enter key={l} at={274.7 + i * 1.5} x={540} y={1240 + i * 100} bouncy><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 40, color: colors.navy}}>✓ {l}</div></Enter>
            ))}
          </>
        )}
        {t >= 281.75 && (
          <>
            <Enter at={281.8} x={540} y={800} bouncy>
              <div style={{width: 240, height: 240, borderRadius: '50%', background: colors.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 26, boxShadow: '0 20px 40px rgba(14,42,92,0.4)'}}>
                <div style={{width: 40, height: 120, borderRadius: 10, background: '#fff'}} />
                <div style={{width: 40, height: 120, borderRadius: 10, background: '#fff'}} />
              </div>
            </Enter>
            <Enter at={283.4} x={540} y={1030} bouncy><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 54, color: RED, textAlign: 'center'}}>AUTORITÉ D'ARRÊT DE TRAVAIL</div></Enter>
            <Enter at={286.2} x={290} y={1200} bouncy><Pill label="Un droit" icon="balance" color={colors.navy} size={34} /></Enter>
            <Enter at={286.9} x={540} y={1200} bouncy><Op c="+" size={70} /></Enter>
            <Enter at={287.1} x={790} y={1200} bouncy><Pill label="Un devoir" icon="bouclier" color={RED} size={34} /></Enter>
            <Enter at={293.8} x={540} y={1370} bouncy><Note text="jamais une faiblesse" color={RED} size={50} /></Enter>
            {t > 296.4 && <div style={{position: 'absolute', left: 540, top: 1500, transform: 'translate(-50%, -50%)'}}><Stamp text="PROFESSIONNALISME" p={prog(t, 296.4, 296.7)} color={colors.green} size={50} /></div>}
          </>
        )}
      </Win>
    </>
  );
};

/** 300,7 s – outro : le choix final. */
export const Choix: React.FC<{end: number}> = ({end}) => {
  const t = useT();
  const walk = kf(t, [336.0, 338.8], [0, 1]);
  return (
    <>
      <Kinetic text="Le pouvoir du *choix*" at={300.75} until={311.0} y={420} size={92} accent={ORANGE} maxWidth={1000} />
      <Kinetic text="À *chaque* instant" at={311.05} until={331.75} y={420} size={92} accent={ORANGE} />
      <Kinetic text="Rentrer *en vie*" at={331.8} until={end} y={420} size={100} accent={colors.green} />

      <Win a={300.75} b={311.0}>
        {[
          ['Équipement', 'casque', 300.9, 220, 760],
          ['Procédures', 'clipboard', 301.6, 860, 760],
          ['Culture', 'equipe', 302.4, 540, 640],
        ].map(([l, ic, at, x, y]) => {
          const g = prog(t, 304.0, 305.4, easeInOut);
          return (
            <div key={l as string} style={{position: 'absolute', left: (x as number) + (540 - (x as number)) * g, top: (y as number) + (1000 - (y as number)) * g * 0.6, transform: `translate(-50%, -50%) scale(${prog(t, at as number, (at as number) + 0.4, easeOut) * (1 - 0.3 * g)})`, opacity: 1 - g}}>
              <Pill label={l as string} icon={ic as string} color={colors.navy} size={30} />
            </div>
          );
        })}
        <Enter at={305.0} x={540} y={1100} bouncy>
          <div style={{width: 300, height: 300, borderRadius: '50%', background: ORANGE, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(238,125,26,0.45)', border: '10px solid #fff'}}>
            <F n="main-levee" size={130} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff'}}>LE CHOIX</div>
          </div>
        </Enter>
        <Enter at={308.8} x={540} y={1420} bouncy><Note text="un engagement de chaque seconde" color={ORANGE} size={52} /></Enter>
      </Win>

      <Win a={311.05} b={331.75}>
        <Steps y={680} gap={190} items={[
          {l: 'Prendre son temps', icon: 'sablier', at: 316.5, c: ORANGE},
          {l: 'Mettre son harnais', icon: 'cadenas', at: 318.2, c: colors.navy},
          {l: 'Vérifier une fois de plus', icon: 'loupe2', at: 319.8, c: colors.green},
        ]} />
        {[
          ['chaque jour', 324.6, 220],
          ['chaque tâche', 325.5, 540],
          ['chaque décision', 327.0, 860],
        ].map(([l, at, x]) => <Enter key={l as string} at={at as number} x={x as number} y={1300} bouncy><div style={{fontFamily: handFont, fontSize: 46, color: ORANGE}}>{l}</div></Enter>)}
        <Enter at={328.6} x={540} y={1460} bouncy><Pill label="La vigilance ne prend jamais de pause" icon="yeux" color={RED} size={30} /></Enter>
      </Win>

      <Win a={331.8} b={end + 0.3}>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <path d="M120 1250 C 400 1250, 600 1150, 900 1100" stroke={colors.navy} strokeWidth={10} strokeDasharray="22 16" fill="none" opacity={prog(t, 335.6, 336.2)} />
        </svg>
        <Enter at={335.6} x={900} y={1000} bouncy><F n="maison" size={260} /></Enter>
        <div style={{position: 'absolute', left: 120 + 700 * walk, top: 1220 - 110 * walk, transform: 'translate(-50%, -50%)', opacity: prog(t, 335.8, 336.2)}}><F n="ouvrier" size={150} /></div>
        <Enter at={337.1} x={330} y={820} bouncy><Pill label="Sain et sauf" icon="check" color={colors.green} size={34} /></Enter>
        {t > 342.4 && <div style={{position: 'absolute', left: 540, top: 1450, transform: 'translate(-50%, -50%)'}}><Stamp text="TRAVAILLEZ EN SÉCURITÉ" p={prog(t, 342.4, 342.7)} color={colors.green} size={50} /></div>}
      </Win>
    </>
  );
};

