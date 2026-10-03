import {easeOut, Enter, kf, Kinetic, prog, useT} from '../anim';
import {PhotoCard, RED, Strike} from '../charte/ui';
import {Note, Op, Stamp, Win} from '../danger2/ui';
import {F, Pill} from '../iso/ui';
import {Highlight} from '../prevention2/Cine';
import {colors, handFont, sansFont} from '../theme';
import {Branch, Fishbone, M_COLORS, MCard, TEAL} from './ui';

export const FIVE_M = [
  {name: 'Matière', icon: 'colis', at: 157.6},
  {name: 'Matériel', icon: 'outils', at: 174.3},
  {name: 'Méthode', icon: 'clipboard', at: 190.5},
  {name: "Main-d'œuvre", icon: 'equipe', at: 210.1},
  {name: 'Milieu', icon: 'thermometre', at: 227.0},
];

/** Exemple en bas de carte : icône + texte manuscrit. */
const Example: React.FC<{at: number; icon: string; text: string; color?: string; y?: number}> = ({at, icon, text, color = colors.navy, y = 1260}) => (
  <Enter at={at} x={540} y={y} from="down" dist={140}>
    <div style={{width: 900, display: 'flex', alignItems: 'center', gap: 22, background: '#fff', borderRadius: 26, padding: '16px 26px', boxShadow: '0 12px 26px rgba(14,30,60,0.14)'}}>
      <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: '#fff', background: colors.navy, borderRadius: 10, padding: '4px 10px', letterSpacing: 2}}>EX.</div>
      <F n={icon} size={84} />
      <div style={{fontFamily: handFont, fontSize: 44, color, lineHeight: 1.05}}>{text}</div>
    </div>
  </Enter>
);

/** 147,3 – 248,1 s : l'enquête des 5M. */
export const CinqM: React.FC = () => {
  const t = useT();
  const errors = Math.round(kf(t, [238.0, 240.0], [3, 47]));
  return (
    <>
      <Kinetic text="*5* grandes pistes" at={147.3} until={157.55} y={420} size={92} accent={TEAL} />
      {FIVE_M.map((m, i) => (
        <Kinetic key={m.name} text={`M${i + 1} · *${m.name}*`} at={m.at} until={i < 4 ? FIVE_M[i + 1].at - 0.05 : 244.0} y={420} size={86} accent={M_COLORS[i]} maxWidth={1000} />
      ))}
      <Kinetic text="Nos *5M* au complet" at={244.05} until={248.0} y={420} size={86} accent={TEAL} maxWidth={1000} />

      <Win a={147.3} b={157.55}>
        <PhotoCard src="ishikawa/modele-5m.jpg" at={147.5} y={940} w={960} h={600} pos="50% 50%" label="Le modèle des 5M" icon="loupe2" from="scale" />
        <Enter at={152.3} x={250} y={1360} bouncy><F n="stock" size={150} /></Enter>
        <Enter at={153.0} x={660} y={1380} bouncy><Note text="les dossiers du détective" size={52} /></Enter>
      </Win>

      {/* M1 Matière */}
      <Win a={157.6} b={174.25}>
        <Enter at={157.8} x={540} y={800} from="left" dist={-300}><MCard n={1} name="Matière" color={M_COLORS[0]} icons={['brique', 'colis', 'ordinateur']} at={157.8} /></Enter>
        <Enter at={162.6} x={290} y={1050} bouncy><Pill label="Matières premières" icon="brique" color={M_COLORS[0]} size={28} /></Enter>
        <Enter at={164.3} x={790} y={1050} bouncy><Pill label="Informations, données" icon="ordinateur" color={M_COLORS[0]} size={28} /></Enter>
        <Example at={167.2} icon="bug" text="appli qui plante → données corrompues reçues du serveur" />
      </Win>

      {/* M2 Matériel */}
      <Win a={174.3} b={190.45}>
        <Enter at={174.5} x={540} y={800} from="left" dist={-300}><MCard n={2} name="Matériel" color={M_COLORS[1]} icons={['engrenage', 'outils', 'ordinateur']} at={174.5} /></Enter>
        <Enter at={178.5} x={290} y={1050} bouncy><Pill label="Machines, outils" icon="engrenage" color={M_COLORS[1]} size={28} /></Enter>
        <Enter at={180.6} x={790} y={1050} bouncy><Pill label="Ordinateurs, logiciels" icon="ordinateur" color={M_COLORS[1]} size={28} /></Enter>
        {[
          ['equerre', 'machine mal calibrée', 183.7],
          ['thermometre', 'serveur qui surchauffe', 185.1],
          ['sablier', 'logiciel pas à jour', 186.4],
        ].map(([ic, l, at], i) => (
          <Enter key={l} at={at as number} x={200 + i * 340} y={1310} bouncy>
            <div style={{width: 300, background: '#fff', borderRadius: 26, padding: '16px 0', textAlign: 'center', boxShadow: '0 12px 24px rgba(14,30,60,0.14)', borderBottom: `8px solid ${M_COLORS[1]}`}}>
              <F n={ic as string} size={90} style={{margin: '0 auto'}} />
              <div style={{fontFamily: handFont, fontSize: 34, color: colors.navy}}>{l}</div>
            </div>
          </Enter>
        ))}
      </Win>

      {/* M3 Méthode */}
      <Win a={190.5} b={210.05}>
        <Enter at={190.7} x={540} y={800} from="left" dist={-300}><MCard n={3} name="Méthode" color={M_COLORS[2]} icons={['clipboard', 'memo', 'repeter']} at={190.7} /></Enter>
        <Enter at={192.9} x={540} y={1040} bouncy><Pill label="Le « comment » : procédures, modes opératoires" icon="memo" color={M_COLORS[2]} size={28} /></Enter>
        {t > 198.6 && (
          <>
            <Enter at={198.7} x={250} y={1290} bouncy><div style={{textAlign: 'center'}}><F n="canape" size={150} /><div style={{fontFamily: handFont, fontSize: 36, color: colors.navy}}>notice de montage</div></div></Enter>
            <Enter at={202.6} x={540} y={1290} bouncy><div style={{display: 'flex', gap: 10}}><F n="boulon" size={110} /><F n="tournevis" size={110} /></div></Enter>
            <Enter at={204.6} x={830} y={1290} bouncy><div style={{textAlign: 'center'}}><F n="bris" size={140} /><div style={{fontFamily: handFont, fontSize: 36, color: RED}}>catastrophe</div></div></Enter>
          </>
        )}
        {t > 208.1 && <div style={{position: 'absolute', left: 540, top: 1480, transform: 'translate(-50%, -50%)'}}><Stamp text="C'EST LA MÉTHODE" p={prog(t, 208.1, 208.4)} color={M_COLORS[2]} size={46} /></div>}
      </Win>

      {/* M4 Main-d'œuvre */}
      <Win a={210.1} b={226.95}>
        <Enter at={210.3} x={540} y={800} from="left" dist={-300}><MCard n={4} name="Main-d'œuvre" color={M_COLORS[3]} icons={['equipe', 'diplome', 'formatrice']} at={210.3} /></Enter>
        {t > 216.8 && (
          <div style={{position: 'absolute', left: 540, top: 1040, transform: 'translate(-50%, -50%)'}}>
            <div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: RED, display: 'flex', alignItems: 'center', gap: 14, opacity: prog(t, 216.8, 217.2)}}>
              <F n="juge" size={80} /> TROUVER UN COUPABLE
              <div style={{position: 'absolute', left: -10, right: -10, top: '50%'}}><Strike p={prog(t, 218.2, 218.7)} w={700} /></div>
            </div>
          </div>
        )}
        {[
          ['diplome', 'Compétences ?', 219.7],
          ['formatrice', 'Formation ?', 221.0],
          ['canape', 'Ergonomie ?', 222.6],
        ].map(([ic, l, at], i) => (
          <Enter key={l} at={at as number} x={200 + i * 340} y={1270} bouncy><Pill label={l as string} icon={ic as string} color={M_COLORS[3]} size={30} /></Enter>
        ))}
        <Enter at={224.2} x={540} y={1440} bouncy><Note text="une question de système, pas de personne" color={M_COLORS[3]} size={48} /></Enter>
      </Win>

      {/* M5 Milieu */}
      <Win a={227.0} b={244.0}>
        <Enter at={227.2} x={540} y={800} from="left" dist={-300}><MCard n={5} name="Milieu" color={M_COLORS[4]} icons={['thermometre', 'ampoule', 'haut-parleur']} at={232.0} /></Enter>
        <Enter at={235.6} x={300} y={1210} bouncy>
          <div style={{width: 400, height: 260, borderRadius: 26, background: '#fff', boxShadow: '0 12px 26px rgba(14,30,60,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, position: 'relative'}}>
            <F n="ordinateur" size={90} /><F n="ordinateur" size={90} /><F n="ordinateur" size={90} />
            <div style={{position: 'absolute', right: -30, top: -40, transform: `scale(${1 + 0.1 * Math.sin(t * 12)})`}}><F n="haut-parleur" size={110} /></div>
            <div style={{position: 'absolute', bottom: 12, fontFamily: handFont, fontSize: 32, color: colors.navy}}>open space bruyant</div>
          </div>
        </Enter>
        {t > 237.8 && (
          <Enter at={237.8} x={780} y={1210} bouncy>
            <div style={{textAlign: 'center', background: '#fff', borderRadius: 26, padding: '18px 30px', boxShadow: '0 12px 26px rgba(14,30,60,0.16)', borderTop: `10px solid ${RED}`}}>
              <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: colors.navy}}>Erreurs de saisie</div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 100, color: RED, lineHeight: 1}}>{errors}</div>
            </div>
          </Enter>
        )}
        <Enter at={241.3} x={540} y={1460} bouncy><Note text="pas la faute des gens… le bruit !" color={M_COLORS[4]} size={50} /></Enter>
      </Win>

      <Win a={244.05} b={248.0}>
        <Fishbone at={244.1} headAt={244.3} head="PROBLÈME" y={1000} branches={FIVE_M.map((m, i) => ({label: m.name, at: 244.5 + i * 0.3}))} />
      </Win>
    </>
  );
};

const EIGHT: Branch[] = [
  ...FIVE_M.map((m, i) => ({label: m.name, icon: m.icon, at: 257.6 + i * 0.12, color: '#9AA4B2'})),
  {label: 'Mesure', icon: 'equerre', at: 264.9, color: M_COLORS[5]},
  {label: 'Management', icon: 'homme-bureau', at: 268.0, color: M_COLORS[6]},
  {label: 'Moyens financiers', icon: 'argent', at: 272.4, color: M_COLORS[7]},
];

const HEALTH: [string, string, string, number][] = [
  ["Main-d'œuvre", 'Personnel', 'equipe', 290.8],
  ['Méthode', 'Procédures', 'clipboard', 291.8],
  ['Milieu', 'Environnement', 'thermometre', 292.9],
  ['Management', 'Gestion', 'homme-bureau', 293.6],
];

/** 252,3 – 301,9 s : au-delà des 5M (services, santé). */
export const AuDela: React.FC = () => {
  const t = useT();
  return (
    <>
      <Kinetic text="Un outil *flexible*" at={252.3} until={257.35} y={420} size={92} accent={TEAL} />
      <Kinetic text="Services : les *8M*" at={257.4} until={278.9} y={420} size={92} accent={TEAL} />
      <Kinetic text="Même à l'*hôpital*" at={278.95} until={301.8} y={420} size={90} accent={TEAL} />

      <Win a={252.3} b={257.35}>
        <PhotoCard src="ishikawa/marketing-8p.jpg" at={252.4} x={540} y={830} w={960} h={530} pos="50% 50%" label="Marketing" icon="cible" from="left" rotate={-1.5} />
        <PhotoCard src="ishikawa/miro-strategie.jpg" at={253.4} x={600} y={1300} w={760} h={500} pos="50% 50%" label="Stratégie" icon="graphique" from="right" rotate={2} />
      </Win>

      <Win a={257.4} b={278.9}>
        {EIGHT.map((b, i) => {
          const isNew = i >= 5;
          return (
            <Enter key={b.label} at={b.at} x={i % 2 ? 790 : 290} y={660 + Math.floor(i / 2) * 175} bouncy>
              <div style={{width: 440, display: 'flex', alignItems: 'center', gap: 16, background: isNew ? b.color : '#fff', borderRadius: 26, padding: '14px 22px', boxShadow: isNew ? `0 14px 30px ${b.color}66` : '0 10px 22px rgba(14,30,60,0.12)', opacity: isNew ? 1 : 0.6, transform: `scale(${isNew && t > b.at && t < b.at + 3.2 ? 1.05 : 1})`}}>
                <div style={{width: 84, height: 84, borderRadius: 22, background: isNew ? 'rgba(255,255,255,0.9)' : '#F4F1E8', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={b.icon ?? 'check'} size={64} /></div>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: isNew ? '#fff' : colors.navy, lineHeight: 1.05}}>{b.label}</div>
                {isNew && <div style={{marginLeft: 'auto', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', background: 'rgba(0,0,0,0.18)', borderRadius: 10, padding: '4px 10px'}}>+</div>}
              </div>
            </Enter>
          );
        })}
        <Enter at={262.7} x={540} y={1400} bouncy><Pill label="5M + 3 nouvelles catégories" icon="puzzle" color={TEAL} size={32} /></Enter>
      </Win>

      <Win a={278.95} b={301.8}>
        <Enter at={279.2} x={300} y={760} bouncy><F n="hopital" size={220} /></Enter>
        <Enter at={283.9} x={760} y={760} bouncy><div style={{textAlign: 'center'}}><F n="pilule" size={160} /><div style={{fontFamily: handFont, fontSize: 40, color: RED}}>erreur de médicament</div></div></Enter>
        {HEALTH.map(([from, to, ic, at], i) => (
          <div key={to}>
            <Enter at={at - 0.4} x={260} y={1010 + i * 120} from="left" dist={-200}>
              <div style={{width: 380, fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: '#8A94A3', background: '#fff', borderRadius: 18, padding: '12px 20px', textAlign: 'center', textDecoration: t > at + 0.3 ? 'line-through' : 'none'}}>{from}</div>
            </Enter>
            <Enter at={at} x={540} y={1010 + i * 120} bouncy><Op c="→" size={64} color={TEAL} /></Enter>
            <Enter at={at + 0.2} x={810} y={1010 + i * 120} from="right" dist={200}>
              <div style={{width: 400, display: 'flex', alignItems: 'center', gap: 12, fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: colors.navy, background: '#fff', borderRadius: 18, padding: '10px 18px', boxShadow: '0 10px 22px rgba(14,30,60,0.14)', borderLeft: `10px solid ${TEAL}`}}>
                <F n={ic} size={56} /> {to}
              </div>
            </Enter>
          </div>
        ))}
        <Enter at={296.4} x={540} y={1520} bouncy><Note text="même principe, les mots changent" color={TEAL} size={52} /></Enter>
      </Win>
    </>
  );
};

