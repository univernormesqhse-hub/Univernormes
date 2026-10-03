import {interpolate} from 'remotion';
import {easeInOut, easeOut, Enter, kf, Kinetic, prog, useSpring, useT} from '../anim';
import {CharterDoc, RED, Strike} from '../charte/ui';
import {Gauge, Note, Op, Stamp, Win} from '../danger2/ui';
import {F, IsoCard, Pill} from '../iso/ui';
import {CineShot} from '../prevention2/Cine';
import {colors, handFont, sansFont} from '../theme';
import {BLUE, Clause, Count, Duel, GOLD, Phone, PURPLE} from './ui';

/** 0 – 98,5 s : l'auditeur, le piège, 11 ans d'attente, la mission. */
export const Intro: React.FC = () => {
  const t = useT();
  return (
    <>
      <Kinetic text="Imaginez la *scène*" at={0.2} until={9.25} y={420} size={90} maxWidth={1000} />
      <Kinetic text="Une pénalité *majeure*" at={9.3} until={19.8} y={420} size={84} accent={RED} maxWidth={1000} />
      <Kinetic text="Le piège *ISO 9001:2026*" at={19.85} until={36.6} y={420} size={78} accent={RED} maxWidth={1000} />
      <Kinetic text="*11 ans* d'attente" at={36.65} until={61.6} y={420} size={92} />
      <Kinetic text="Révolutions ou *mythes* ?" at={61.65} until={72.45} y={420} size={82} accent={GOLD} maxWidth={1000} />
      <Kinetic text="Une montagne de *sources*" at={72.5} until={98.45} y={420} size={80} maxWidth={1000} />

      <Win a={0.2} b={9.25}>
        <CineShot src="promo/hse-machine.jpg" at={0.2} until={9.25} move="push" pos="50% 50%" y={960} h={760} label="Une usine de production" />
        <Enter at={2.2} x={260} y={1430} bouncy><F n="auditeur" size={200} /></Enter>
        <Enter at={5.0} x={700} y={1430} bouncy><Pill label="La checklist habituelle" icon="clipboard" size={32} /></Enter>
      </Win>

      <Win a={9.3} b={19.8}>
        <CineShot src="iso26/audit-checklist.jpg" at={9.3} until={19.8} move="push" pos="45% 50%" y={940} h={720} grade="alert" />
        {t > 12.1 && <div style={{position: 'absolute', left: 540, top: 960, transform: 'translate(-50%, -50%)'}}><Stamp text="NON-CONFORMITÉ MAJEURE" p={prog(t, 12.1, 12.4)} color={RED} size={46} /></div>}
        <Enter at={16.9} x={540} y={1420} bouncy>
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}><F n="question" size={110} /><Note text="pour une règle qui n'existe plus !" color={RED} size={50} /></div>
        </Enter>
      </Win>

      <Win a={19.85} b={36.6}>
        {t < 29.4 && (
          <>
            <Enter at={22.6} x={540} y={850} bouncy><F n="argent" size={260} /></Enter>
            <Enter at={23.2} x={540} y={1110} bouncy><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 76, color: RED}}>des milliers d'euros</div></Enter>
            <Enter at={26.0} x={540} y={1300} bouncy><div style={{display: 'flex', alignItems: 'center', gap: 14}}><F n="globe" size={90} /><Note text="des milliers d'organisations" size={50} /></div></Enter>
          </>
        )}
        {t >= 29.4 && (
          <>
            <Enter at={29.5} x={540} y={900} bouncy><IsoCard year="2026" active w={380} /></Enter>
            <Enter at={34.7} x={540} y={1300} bouncy>
              <div style={{display: 'flex', alignItems: 'center', gap: 18, background: '#fff', borderRadius: 26, padding: '14px 28px', boxShadow: '0 12px 26px rgba(14,30,60,0.16)', borderLeft: `12px solid ${colors.green}`}}>
                <F n="calendrier" size={84} />
                <div style={{fontFamily: sansFont}}>
                  <div style={{fontWeight: 800, fontSize: 26, color: '#7A8594', letterSpacing: 2}}>PUBLIÉE LE</div>
                  <div style={{fontWeight: 900, fontSize: 48, color: colors.navy}}>16 septembre 2026</div>
                </div>
              </div>
            </Enter>
          </>
        )}
      </Win>

      <Win a={36.65} b={61.6}>
        {t < 49.3 && (
          <>
            <Enter at={41.4} x={270} y={900} bouncy><IsoCard year="2015" w={300} /></Enter>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <line x1={440} y1={900} x2={440 + 200 * prog(t, 43.6, 45.8, easeInOut)} y2={900} stroke={colors.navy} strokeWidth={10} strokeDasharray="20 14" />
            </svg>
            <Enter at={45.8} x={810} y={900} bouncy><IsoCard year="2026" active w={300} /></Enter>
            <Enter at={44.3} x={540} y={1260} bouncy><Count to={11} at={44.3} dur={1.6} suffix=" ans" size={140} color={GOLD} /></Enter>
          </>
        )}
        {t >= 49.3 && (
          <>
            <Enter at={49.4} x={540} y={760} bouncy><IsoCard year="2015" w={260} /></Enter>
            <Enter at={51.5} x={540} y={1080} bouncy><Count to={1000000} at={51.5} dur={1.8} prefix="+ " size={110} color={colors.green} /></Enter>
            <Enter at={52.6} x={540} y={1190} bouncy><Note text="organisations certifiées dans le monde" size={48} /></Enter>
            <Enter at={59.6} x={540} y={1380} bouncy><div style={{display: 'flex', alignItems: 'center', gap: 14}}><F n="camion" size={100} /><Pill label="Des chaînes d'approvisionnement bousculées" color={RED} size={28} /></div></Enter>
          </>
        )}
      </Win>

      <Win a={61.65} b={72.45}>
        <Duel a={{t: 'Révolutions', s: 'ce qui change vraiment', icon: 'fusee', c: colors.green, at: 68.0}} b={{t: 'Mythes', s: 'les rumeurs', icon: 'bulle', c: RED, at: 68.9}} />
        <Enter at={65.0} x={540} y={620} bouncy><Pill label="Mission : démystifier" icon="loupe2" color={GOLD} size={32} /></Enter>
      </Win>

      <Win a={72.5} b={98.45}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Enter key={i} at={74.0 + i * 0.35} x={540 + (i % 2 ? 40 : -40)} y={1080 - i * 70} from="up" dist={-300} rotate={(i % 2 ? 4 : -4)}>
            <CharterDoc w={380} write={1} title="SOURCE" lines={3} />
          </Enter>
        ))}
        {[
          ['Comité technique', 'equipe', 76.7, 220, 640],
          ['Analyses d\'experts', 'loupe2', 79.7, 820, 700],
          ['Formateurs', 'formatrice', 85.2, 220, 1370],
          ['Annonces AFNOR', 'megaphone', 89.0, 820, 1370],
        ].map(([l, ic, at, x, y]) => (
          <Enter key={l as string} at={at as number} x={x as number} y={y as number} bouncy><Pill label={l as string} icon={ic as string} size={28} /></Enter>
        ))}
        <Enter at={92.7} x={290} y={1490} bouncy><Pill label="Culture" icon="equipe" color={colors.green} size={30} /></Enter>
        <Enter at={93.4} x={790} y={1490} bouncy><Pill label="Résilience" icon="bouclier" color={BLUE} size={30} /></Enter>
      </Win>
    </>
  );
};

const CHAPS = ['4', '5', '6', '7', '8', '9', '10'];

/** 101,5 – 346,1 s : le piège de la structure. */
export const Structure: React.FC = () => {
  const t = useT();
  const xray = prog(t, 113.3, 114.3, easeInOut);
  const lock = prog(t, 152.0, 153.4, easeInOut);
  const move = prog(t, 195.3, 197.4, easeInOut);
  const renum = Math.floor(kf(t, [243.0, 249.0], [0, 12]));
  return (
    <>
      <Kinetic text="Comme un *smartphone*" at={101.5} until={123.55} y={420} size={86} accent={BLUE} maxWidth={1000} />
      <Kinetic text="La *mécanique* pure" at={123.6} until={133.65} y={420} size={90} accent={BLUE} />
      <Kinetic text="Structure *harmonisée*" at={133.7} until={165.75} y={420} size={86} accent={BLUE} maxWidth={1000} />
      <Kinetic text="Le piège du *chapitre 10*" at={165.8} until={203.0} y={420} size={82} accent={RED} maxWidth={1000} />
      <Kinetic text="Une infraction *inventée*" at={203.05} until={232.7} y={420} size={82} accent={RED} maxWidth={1000} />
      <Kinetic text="Un travail de *fourmi*" at={232.75} until={252.75} y={420} size={86} maxWidth={1000} />
      <Kinetic text="Un *smart standard*" at={252.8} until={274.3} y={420} size={86} accent={BLUE} maxWidth={1000} />
      <Kinetic text="L'annexe A *renforcée*" at={274.35} until={293.0} y={420} size={84} accent={BLUE} maxWidth={1000} />
      <Kinetic text="Applicable ≠ *approprié*" at={293.05} until={346.0} y={420} size={82} accent={GOLD} maxWidth={1000} />

      <Win a={101.5} b={123.55}>
        <Enter at={104.6} x={540} y={1020} bouncy><Phone xray={xray} /></Enter>
        <Enter at={110.4} until={113.3} x={540} y={1510} bouncy><Note text="en surface : pareil" size={46} /></Enter>
        {t > 113.3 && <Enter at={113.4} x={540} y={1510} bouncy><Note text="sous le capot : tout change" color={RED} size={46} /></Enter>}
      </Win>

      <Win a={123.6} b={133.65}>
        <Enter at={123.9} x={540} y={900} bouncy><div style={{transform: `rotate(${t * 40}deg)`}}><F n="engrenage" size={320} /></div></Enter>
        <Enter at={129.6} x={540} y={1260} bouncy><Pill label="L'architecture du texte d'abord" icon="memo" color={BLUE} size={32} /></Enter>
      </Win>

      <Win a={133.7} b={165.75}>
        <Enter at={137.0} x={540} y={640} bouncy><Pill label="Annexe SL : cadre commun ISO" icon="puzzle" color={BLUE} size={32} /></Enter>
        {[
          ['9001', 'Qualité', colors.navy, -1],
          ['14001', 'Environnement', colors.green, 1],
        ].map(([n, l, c, side], i) => (
          <div key={n as string} style={{position: 'absolute', left: 540, top: 1000 + (side as number) * interpolate(lock, [0, 1], [190, 95]), transform: 'translate(-50%, -50%)', opacity: prog(t, 146.0 + i * 1.2, 146.5 + i * 1.2)}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <div style={{width: 200, background: c as string, color: '#fff', borderRadius: 18, padding: '18px 0', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34}}>ISO {n}<div style={{fontSize: 22, fontWeight: 700}}>{l}</div></div>
              {CHAPS.map((ch) => <div key={ch} style={{width: 90, height: 90, borderRadius: 16, background: '#fff', border: `5px solid ${c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: colors.navy}}>{ch}</div>)}
            </div>
          </div>
        ))}
        {t > 153.4 && <Enter at={153.5} x={540} y={1300} bouncy><Note text="elles s'emboîtent" color={colors.green} size={56} /></Enter>}
        <Enter at={163.6} x={540} y={1440} bouncy><Pill label="Chapitres 4 à 10 conservés" icon="check" size={32} /></Enter>
      </Win>

      {/* chapitre 10 : 10.3 → 10.1 */}
      <Win a={165.8} b={203.0}>
        <Enter at={176.6} x={540} y={640} bouncy><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: colors.navy}}>CHAPITRE 10 · Amélioration</div></Enter>
        <Enter at={183.4} x={290} y={760} bouncy><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#7A8594'}}>2015</div></Enter>
        {['10.1 Généralités', '10.2 Non-conformité', '10.3 Amélioration continue'].map((l, i) => {
          const last = i === 2;
          return (
            <Enter key={l} at={184.4 + i * 0.4} x={290} y={880 + i * 130} from="left" dist={-200}>
              <div style={{width: 420, background: '#fff', borderRadius: 18, padding: '16px 18px', fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: last ? RED : colors.navy, border: last ? `5px solid ${RED}` : '5px solid #E3E8EE', opacity: last ? 1 - 0.6 * prog(t, 193.0, 194.0) : 1}}>{l}</div>
            </Enter>
          );
        })}
        {t > 190.5 && <Enter at={190.6} x={790} y={760} bouncy><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: colors.green}}>2026</div></Enter>}
        {t > 195.3 && (
          <div style={{position: 'absolute', left: interpolate(move, [0, 1], [290, 790]), top: interpolate(move, [0, 1], [1140, 880]), transform: 'translate(-50%, -50%)'}}>
            <div style={{width: 420, background: colors.green, color: '#fff', borderRadius: 18, padding: '16px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>10.1 Amélioration continue</div>
          </div>
        )}
        {t > 197.6 && (
          <>
            <Enter at={197.7} x={790} y={1010} from="right" dist={200}><div style={{width: 420, background: '#fff', borderRadius: 18, padding: '16px 18px', fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: colors.navy, border: '5px solid #E3E8EE'}}>10.2 …</div></Enter>
            <Enter at={198.0} x={790} y={1140} bouncy><Clause n="10.3" label="disparue" color={RED} size={0.8} ghost /></Enter>
          </>
        )}
        {t > 193.0 && <div style={{position: 'absolute', left: 290, top: 1140, transform: 'translate(-50%, -50%)'}}><Strike p={prog(t, 193.2, 193.7)} w={430} /></div>}
      </Win>

      <Win a={203.05} b={232.7}>
        {t < 212.4 && (
          <>
            <Enter at={203.4} x={300} y={950} bouncy><F n="auditeur" size={260} /></Enter>
            <Enter at={204.8} x={760} y={900} bouncy><div style={{position: 'relative'}}><CharterDoc w={300} write={1} title="CHECKLIST 2015" lines={4} /></div></Enter>
            {t > 208.3 && <div style={{position: 'absolute', left: 760, top: 1000, transform: 'translate(-50%, -50%)'}}><Stamp text="INFRACTION ?" p={prog(t, 208.3, 208.6)} color={RED} size={44} /></div>}
          </>
        )}
        {t >= 212.4 && t < 222.2 && (
          <>
            {[0, 1, 2].map((i) => <Enter key={i} at={212.6 + i * 0.25} x={260 + i * 280} y={950} bouncy><CharterDoc w={240} write={1} dusty={prog(t, 214.6, 215.6)} title="PROCÉDURE" lines={4} /></Enter>)}
            <Enter at={214.7} x={540} y={1260} bouncy><Pill label="Documentation obsolète si non renumérotée" icon="danger" color={RED} size={28} /></Enter>
            <Enter at={219.4} x={540} y={1400} bouncy><Note text="un risque administratif avant tout" size={50} /></Enter>
          </>
        )}
        {t >= 222.2 && (
          <>
            <Enter at={222.3} x={540} y={900} bouncy>
              <div style={{width: 640, background: '#fff', borderRadius: 26, padding: '24px 30px', boxShadow: '0 16px 32px rgba(14,30,60,0.18)', borderTop: `12px solid ${RED}`}}>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: RED, letterSpacing: 1}}>CONSTAT DE NON-CONFORMITÉ · 2027</div>
                <div style={{fontFamily: handFont, fontSize: 44, color: colors.navy, marginTop: 12}}>Écart contre la clause 10.3…</div>
              </div>
            </Enter>
            <Enter at={228.4} x={540} y={1150} bouncy><Clause n="10.3" label="clause fantôme" color={PURPLE} ghost /></Enter>
            {t > 231.3 && <div style={{position: 'absolute', left: 540, top: 1360, transform: 'translate(-50%, -50%)'}}><Stamp text="VALEUR : AUCUNE" p={prog(t, 231.3, 231.6)} color={RED} size={50} /></div>}
          </>
        )}
      </Win>

      <Win a={232.75} b={252.75}>
        <div style={{position: 'absolute', left: 540, top: 880, transform: 'translate(-50%, -50%)', display: 'grid', gridTemplateColumns: 'repeat(4, 200px)', gap: 18}}>
          {Array.from({length: 12}).map((_, i) => (
            <div key={i} style={{height: 90, borderRadius: 16, background: i < renum ? colors.green : '#fff', color: i < renum ? '#fff' : colors.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, boxShadow: '0 8px 16px rgba(14,30,60,0.12)', opacity: prog(t, 233.0 + i * 0.08, 233.4 + i * 0.08)}}>
              {i < renum ? '✓ renuméroté' : `Doc ${i + 1}`}
            </div>
          ))}
        </div>
        <Enter at={238.1} x={830} y={680} bouncy><F n="loupe2" size={150} /></Enter>
        <Enter at={245.3} x={540} y={1200} from="down" dist={140}><div style={{background: '#fff', borderRadius: 26, padding: '20px 30px', boxShadow: '0 12px 26px rgba(14,30,60,0.16)'}}><Gauge v={kf(t, [245.3, 247.5], [0, 0.85])} label="Analyse des écarts sur l'ancienne carte : erreurs" w={760} color={RED} /></div></Enter>
        <Enter at={250.3} x={540} y={1430} bouncy><Note text="la forme protège le fond" color={colors.green} size={54} /></Enter>
      </Win>

      <Win a={252.8} b={274.3}>
        <Enter at={254.0} x={260} y={950} bouncy>
          <div style={{width: 260, height: 330, borderRadius: 20, background: '#fff', boxShadow: '0 14px 28px rgba(14,30,60,0.18)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderTop: `12px solid ${RED}`, opacity: 1 - 0.5 * prog(t, 263.8, 264.4)}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: RED}}>PDF</div>
            <div style={{fontFamily: handFont, fontSize: 34, color: colors.navy}}>statique</div>
          </div>
        </Enter>
        {['<exigence>', '<terme>', '<clause>'].map((tag, i) => {
          const p = prog(t, 261.6 + i * 0.5, 263.0 + i * 0.5, easeInOut);
          return p > 0 ? <div key={tag} style={{position: 'absolute', left: interpolate(p, [0, 1], [380, 760]), top: 860 + i * 90 - Math.sin(p * Math.PI) * 80, transform: 'translate(-50%, -50%)', background: BLUE, color: '#fff', fontFamily: 'monospace', fontWeight: 700, fontSize: 30, padding: '8px 16px', borderRadius: 12, opacity: 1 - prog(t, 263.6 + i * 0.5, 264.0 + i * 0.5)}}>{tag}</div> : null;
        })}
        <Enter at={267.8} x={820} y={950} bouncy>
          <div style={{textAlign: 'center'}}><F n="ordinateur" size={220} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: colors.navy}}>Logiciel qualité</div></div>
        </Enter>
        <Enter at={271.5} x={540} y={1330} bouncy><Pill label="Exigences lues automatiquement" icon="eclair" color={BLUE} size={30} /></Enter>
      </Win>

      <Win a={274.35} b={293.0}>
        <Enter at={276.7} x={300} y={950} bouncy>
          <div style={{position: 'relative', opacity: 1 - 0.6 * prog(t, 278.0, 278.6), transform: `rotate(${prog(t, 278.0, 278.8) * -12}deg) translateY(${prog(t, 278.0, 278.8) * 60}px)`}}>
            <CharterDoc w={260} write={1} title="ANNEXE B" lines={3} />
            <div style={{position: 'absolute', left: -10, right: -10, top: '50%'}}><Strike p={prog(t, 277.8, 278.3)} w={280} /></div>
          </div>
        </Enter>
        <div style={{position: 'absolute', left: 760, top: 950, transform: `translate(-50%, -50%) scale(${0.7 + 0.35 * prog(t, 279.8, 281.0, easeOut)})`, opacity: prog(t, 278.9, 279.3)}}>
          <CharterDoc w={300} write={1} seal={prog(t, 290.6, 291.0)} title="ANNEXE A" lines={6} />
        </div>
        <Enter at={289.4} x={540} y={1330} bouncy><Pill label="Pas d'exigence en plus : des mots figés" icon="cadenas" color={BLUE} size={30} /></Enter>
        <Enter at={291.9} x={540} y={1460} bouncy><Note text="→ moins de litiges" color={colors.green} size={54} /></Enter>
      </Win>

      <Win a={293.05} b={346.0}>
        {t < 310.8 && (
          <>
            <CineShot src="promo/terrain-controle.jpg" at={304.3} until={310.8} move="push" y={900} h={640} label="Usine de pièces de précision" />
            <Enter at={300.9} until={304.3} x={540} y={950} bouncy><div style={{display: 'flex', gap: 30}}><F n="auditeur" size={200} /><F n="bulle-colere" size={140} /><F n="homme-bureau" size={200} /></div></Enter>
            <Enter at={300.9} x={540} y={1360} bouncy><Note text="des débats sans fin… au feeling" color={RED} size={50} /></Enter>
          </>
        )}
        {t >= 310.8 && (
          <>
            <Duel y={960} h={620} a={{t: 'Applicable', s: 'pertinent = s’applique sans condition', icon: 'balance', c: colors.navy, at: 311.0}} b={{t: 'Approprié', s: 'jugement selon le contexte', icon: 'calendrier', c: GOLD, at: 328.2}} />
            <Enter at={321.9} x={290} y={1330} bouncy><Pill label="Étalonner les balances" icon="check" color={colors.navy} size={26} /></Enter>
            {t > 334.3 && <Enter at={334.4} x={790} y={1330} bouncy><Pill label={Math.floor(t * 1.5) % 2 ? 'Chaque jour ?' : 'Chaque mois ?'} icon="sablier" color={GOLD} size={26} /></Enter>}
            <Enter at={326.5} x={290} y={680} bouncy><Note text="pas de négociation" color={colors.navy} size={42} /></Enter>
            {t > 342.3 && <div style={{position: 'absolute', left: 540, top: 1480, transform: 'translate(-50%, -50%)'}}><Stamp text="FINI L'ABSURDE" p={prog(t, 342.3, 342.6)} color={colors.green} size={46} /></div>}
          </>
        )}
      </Win>
    </>
  );
};

