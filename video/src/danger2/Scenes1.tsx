import {interpolate} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, Kinetic, prog, useSpring, useT} from '../anim';
import {CharterDoc, PhotoCard, Strike} from '../charte/ui';
import {F, Pill} from '../iso/ui';
import {Highlight} from '../prevention2/Cine';
import {colors, handFont, sansFont} from '../theme';
import {AMBER, Concept, Cut, Note, Op, Quote, RED, Stamp, Win} from './ui';

/** 0 – 47,9 s : danger ou risque ? Même les dictionnaires s'emmêlent. */
export const Intro: React.FC = () => {
  const t = useT();
  const slam = useSpring(10.4, {damping: 8, stiffness: 260});
  const house = useSpring(16.9, {damping: 10});
  const eq = prog(t, 26.2, 26.7);
  return (
    <>
      <Kinetic text="*Danger* ou *risque* ?" at={0.2} until={7.4} y={420} size={96} accent={RED} maxWidth={1000} />
      <Kinetic text="Santé & *sécurité* au travail" at={7.45} until={14.7} y={420} size={78} maxWidth={1000} />
      <Kinetic text="La *base* de la prévention" at={14.75} until={22.45} y={420} size={80} maxWidth={1000} />
      <Kinetic text="De parfaits *synonymes* ?" at={22.5} until={30.7} y={420} size={82} accent={AMBER} maxWidth={1000} />
      <Kinetic text="Un énorme *problème*" at={30.75} until={42.2} y={420} size={86} accent={RED} maxWidth={1000} />
      <Kinetic text="Précision *chirurgicale*" at={42.25} until={47.8} y={420} size={84} maxWidth={1000} />

      {/* deux mots, deux réalités */}
      <Win a={0.2} b={14.7}>
        <Enter at={0.9} x={290} y={1000} from="left" dist={-520} rotate={-3}><Concept label="DANGER" icon="danger" color={RED} w={400} /></Enter>
        <Enter at={1.6} x={790} y={1000} from="right" dist={520} rotate={3}><Concept label="RISQUE" icon="de" color={AMBER} w={400} /></Enter>
        {t < 10.4 && <Enter at={3.0} x={540} y={1000} bouncy rotate={Math.sin(t * 3) * 8}><Op c="?" color={colors.navy} /></Enter>}
        {t >= 10.4 && (
          <div style={{position: 'absolute', left: 540, top: 1000, transform: `translate(-50%, -50%) scale(${slam * 1.25})`}}>
            <Op c="≠" color={RED} size={140} />
          </div>
        )}
        <Enter at={5.2} x={540} y={1370} bouncy><Pill label="Un poids lourd de la SST" icon="casque" size={34} /></Enter>
        <Enter at={11.8} x={540} y={1470} bouncy><Note text="pas qu'une nuance de vocabulaire !" /></Enter>
      </Win>

      {/* la fondation */}
      <Win a={14.75} b={22.45}>
        <div style={{position: 'absolute', left: 540, top: 820, transform: `translate(-50%, -50%) translateY(${(1 - house) * -500}px)`, opacity: Math.min(1, house * 2)}}>
          <F n="maison" size={380} />
        </div>
        <Enter at={15.3} x={540} y={1110} from="up" dist={200}>
          <div style={{width: 820, padding: '30px 0', borderRadius: 26, background: colors.navy, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 64, textAlign: 'center', letterSpacing: 2, boxShadow: '0 20px 40px rgba(14,42,92,0.35)'}}>
            DANGER <span style={{color: '#FF8A7E'}}>≠</span> RISQUE
          </div>
        </Enter>
        <Enter at={15.6} x={540} y={1220} bouncy><Note text="la fondation de toute politique de prévention" size={46} /></Enter>
        <Enter at={19.5} x={540} y={1400} bouncy><Pill label="Au quotidien… on fait la différence ?" icon="question" color={AMBER} size={32} /></Enter>
      </Win>

      {/* les dictionnaires */}
      <Win a={22.5} b={30.7}>
        <Enter at={23.2} x={540} y={900} bouncy><F n="livres" size={340} /></Enter>
        <Enter at={24.0} x={540} y={1180} bouncy>
          <div style={{display: 'flex', alignItems: 'center', gap: 26, fontFamily: handFont, fontSize: 84, color: colors.navy}}>
            danger <span style={{display: 'inline-block', transform: `scale(${0.4 + 0.6 * eq})`, opacity: eq, color: RED}}>=</span> risque
          </div>
        </Enter>
        <Enter at={28.1} x={540} y={1400} bouncy><div style={{display: 'flex', alignItems: 'center', gap: 20}}><F n="haussement" size={130} /><Note text="une bonne excuse pour se tromper" size={50} /></div></Enter>
      </Win>

      {/* en entreprise : le DUER */}
      <Win a={30.75} b={47.8}>
        {t < 40.1 && (
          <>
            <Enter at={31.0} until={34.3} x={540} y={980} bouncy><F n="bulle-colere" size={300} /></Enter>
            <Enter at={34.4} until={40.1} x={540} y={960} bouncy>
              <CharterDoc w={420} write={prog(t, 35.0, 38.0, (v) => v)} seal={prog(t, 39.0, 39.4)} title="DUER" lines={5} />
            </Enter>
            <Enter at={37.6} until={40.1} x={540} y={1380} bouncy><Pill label="Document unique d'évaluation des risques" icon="classeur" size={30} /></Enter>
          </>
        )}
        <PhotoCard src="promo/audit-reunion.jpg" at={40.15} until={47.8} y={960} w={900} h={640} label="Analyse de projets complexes" icon="loupe" from="scale" />
        <Enter at={42.6} until={47.8} x={800} y={760} bouncy rotate={-12}><F n="loupe2" size={190} /></Enter>
        <Enter at={44.4} x={540} y={1390} bouncy><Pill label="Confondre les deux = fausser l'analyse" icon="danger" color={RED} size={32} /></Enter>
      </Win>
    </>
  );
};

/** 47,9 – 69,2 s : la peau de banane. */
export const Banane: React.FC = () => {
  const t = useT();
  const foot = prog(t, 59.8, 61.4, easeInOut);
  const hit = t >= 61.4;
  return (
    <>
      <Kinetic text="La peau de *banane*" at={47.95} until={55.1} y={420} size={90} accent={AMBER} maxWidth={1000} />
      <Kinetic text="Elle est là, *immobile*" at={55.15} until={59.75} y={420} size={86} accent={RED} maxWidth={1000} />
      <Kinetic text="Puis le *pied* arrive" at={59.8} until={64.4} y={420} size={90} accent={AMBER} maxWidth={1000} />
      <Kinetic text="Une mécanique en *2 temps*" at={64.45} until={69.1} y={420} size={80} maxWidth={1000} />

      <Win a={47.95} b={64.45}>
        {/* sol */}
        <div style={{position: 'absolute', left: 80, right: 80, top: 1330, height: 10, borderRadius: 5, background: colors.navy, opacity: 0.25, transform: `scaleX(${prog(t, 48.1, 48.8)})`}} />
        {t < 59.8 && (
          <>
            <Enter at={50.6} x={540} y={1240} bouncy><F n="banane" size={260} /></Enter>
            <Enter at={56.9} x={330} y={1010} bouncy><Pill label="Une menace silencieuse" icon="danger" color={RED} size={32} /></Enter>
            <Highlight at={57.5} x={540} y={1240} r={170} color={RED} />
            <Enter at={58.3} x={800} y={1130} bouncy><Note text="elle ne bouge pas" color={RED} size={48} /></Enter>
          </>
        )}
        {t >= 59.8 && (
          <>
            <div style={{position: 'absolute', left: 540, top: interpolate(foot, [0, 1], [-200, 880]), transform: `translate(-50%, -50%) rotate(${hit ? Math.sin((t - 61.4) * 30) * 3 * Math.max(0, 1 - (t - 61.4) * 2) : 0}deg)`}}>
              <Cut src="danger2/banane-pied.png" w={560} />
            </div>
            {hit && <Highlight at={61.45} x={420} y={1120} r={150} color={AMBER} label="RENCONTRE" />}
            <Enter at={62.2} x={540} y={1440} bouncy><Pill label="Une dynamique complètement différente" icon="eclair" color={AMBER} size={30} /></Enter>
          </>
        )}
      </Win>

      <Win a={64.45} b={69.1}>
        <Enter at={64.7} x={290} y={1000} from="left" dist={-400}>
          <div style={{position: 'relative'}}>
            <Concept label="DANGER" sub="1 · l'objet" icon="banane" color={RED} w={380} />
          </div>
        </Enter>
        <Enter at={65.4} x={540} y={1000} bouncy><Op c="+" /></Enter>
        <Enter at={65.9} x={790} y={1000} from="right" dist={400}><Concept label="RISQUE" sub="2 · la rencontre" icon="pas" color={AMBER} w={380} /></Enter>
        <Enter at={67.0} x={540} y={1400} bouncy><Pill label="La clé de l'évaluation des risques" icon="cle" size={32} /></Enter>
      </Win>
    </>
  );
};

const DEF1: [string, number, boolean?][] = [
  ['Un', 82.42], ['danger', 83.14, true], ['est', 83.52], ['la', 83.78], ['propriété', 84.04, true], ['intrinsèque', 84.6, true], ["d'un", 85.3], ['produit,', 85.64], ["d'un", 86.12], ['équipement,', 86.42], ["d'une", 86.84], ['situation', 87.08], ['susceptible', 87.68], ['de', 88.26], ['causer', 88.46], ['un', 88.72], ['dommage', 88.88, true], ['à', 89.14], ["l'intégrité", 89.24], ['mentale', 89.7], ['ou', 90.08], ['physique', 90.26], ['du', 90.44], ['salarié.', 90.6],
];

const CATS = [
  {at: 123.0, title: 'Produits', c: '#8E44AD', items: [['eprouvette', 'chimiques toxiques', 124.4], ['chaud', 'eau bouillante', 125.5]]},
  {at: 127.5, title: 'Équipements', c: colors.navy, items: [['outils', 'chariot, scie', 128.4], ['couteau', 'couteau', 130.2], ['echelle', 'escaliers', 131.9]]},
  {at: 133.6, title: 'Situations', c: AMBER, items: [['montagne', 'en hauteur', 134.5], ['voiture', "l'autoroute", 135.6]]},
] as const;

/** 73,3 – 146,2 s : le danger, une propriété intrinsèque. */
export const Danger: React.FC = () => {
  const t = useT();
  const aura = 1 + 0.06 * Math.sin(t * 4);
  return (
    <>
      <Kinetic text="Propriété *intrinsèque*" at={73.35} until={81.0} y={420} size={84} accent={RED} maxWidth={1000} />
      <Kinetic text="Définition *INRS*" at={81.05} until={90.75} y={420} size={92} accent={RED} />
      <Kinetic text="Il existe *tout seul*" at={90.8} until={101.85} y={420} size={90} accent={RED} maxWidth={1000} />
      <Kinetic text="Un potentiel de *dégâts*" at={101.9} until={113.75} y={420} size={82} accent={RED} maxWidth={1000} />
      <Kinetic text="Sa nature *profonde*" at={113.8} until={119.1} y={420} size={90} accent={RED} maxWidth={1000} />
      <Kinetic text="*3* grandes catégories" at={119.15} until={136.85} y={420} size={84} accent={RED} maxWidth={1000} />
      <Kinetic text="Même *sans personne*" at={136.9} until={146.1} y={420} size={88} accent={RED} maxWidth={1000} />

      <Win a={73.35} b={81.0}>
        <Enter at={73.6} x={540} y={900} bouncy>
          <div style={{transform: `scale(${aura})`}}><F n="danger" size={360} /></div>
        </Enter>
        <Enter at={77.6} x={540} y={1300} bouncy>
          <div style={{display: 'flex', alignItems: 'center', gap: 22, background: '#fff', borderRadius: 28, padding: '20px 34px', boxShadow: '0 16px 32px rgba(14,30,60,0.18)', borderBottom: `8px solid ${colors.navy}`}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: colors.navy}}>INRS</div>
            <div style={{fontFamily: handFont, fontSize: 44, color: colors.ink, lineHeight: 1.05}}>l'organisme de<br />référence en France</div>
          </div>
        </Enter>
      </Win>

      <Win a={81.05} b={90.75}>
        <Enter at={81.2} x={540} y={900} from="up" dist={200}><Quote source="DÉFINITION INRS · DANGER" words={DEF1} /></Enter>
        <Enter at={85.7} x={250} y={1330} bouncy><Pill label="produit" icon="eprouvette" color={RED} size={30} /></Enter>
        <Enter at={86.45} x={540} y={1330} bouncy><Pill label="équipement" icon="outils" color={RED} size={30} /></Enter>
        <Enter at={87.1} x={835} y={1330} bouncy><Pill label="situation" icon="montagne" color={RED} size={30} /></Enter>
      </Win>

      {/* intrinsèque = caractéristique propre */}
      <Win a={90.8} b={101.85}>
        <div style={{position: 'absolute', left: 540, top: 960, width: 620, height: 620, transform: `translate(-50%, -50%) scale(${aura * prog(t, 91.2, 92.0)})`, borderRadius: '50%', background: `radial-gradient(circle, rgba(217,68,58,0.28), rgba(217,68,58,0) 70%)`}} />
        <Enter at={91.0} x={540} y={960} bouncy><Cut src="danger2/bidon.png" w={480} /></Enter>
        <Highlight at={95.9} until={101.85} x={462} y={850} r={66} color={RED} />
        <Enter at={96.4} x={760} y={640} bouncy><Note text="propriété intrinsèque" color={RED} size={46} /></Enter>
        <Enter at={98.2} x={250} y={1260} bouncy><Pill label="Une caractéristique propre" icon="cible" color={RED} size={30} /></Enter>
        <Enter at={99.9} x={760} y={1370} bouncy><Note text="il existe par lui-même" size={52} /></Enter>
      </Win>

      {/* potentiel + dommage */}
      <Win a={101.9} b={113.75}>
        <Enter at={102.2} x={540} y={760} bouncy>
          <div style={{display: 'flex', alignItems: 'center', gap: 24, fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: colors.navy}}>
            <F n="danger" size={130} /> = <span style={{color: RED}}>POTENTIEL</span><F n="bombe" size={130} />
          </div>
        </Enter>
        <Enter at={108.3} x={540} y={980} bouncy>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: '#fff', background: RED, padding: '10px 30px', borderRadius: 16, letterSpacing: 2}}>DOMMAGE : CE QU'ON NE VEUT PAS VOIR ARRIVER</div>
        </Enter>
        {[
          ['pansement', 'Physique', 110.8, 230],
          ['cerveau', 'Psychologique', 112.2, 540],
          ['bris', 'Matériel', 113.0, 850],
        ].map(([ic, l, at, x]) => (
          <Enter key={l as string} at={at as number} x={x as number} y={1250} bouncy>
            <div style={{width: 270, padding: '24px 0', borderRadius: 30, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, boxShadow: '0 14px 28px rgba(14,30,60,0.16)', borderBottom: `8px solid ${RED}`}}>
              <F n={ic as string} size={130} />
              <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: colors.navy}}>{l}</div>
            </div>
          </Enter>
        ))}
      </Win>

      <Win a={113.8} b={119.1}>
        <Enter at={114.0} x={540} y={940} bouncy spin={-40}><div style={{transform: `rotate(${-30 + Math.sin(t * 2) * 6}deg)`}}><F n="couteau" size={380} /></div></Enter>
        <Enter at={115.4} x={540} y={1290} bouncy><Pill label="Capacité théorique de blesser ou d'abîmer" icon="danger" color={RED} size={30} /></Enter>
        <Enter at={117.2} x={540} y={1420} bouncy><Note text="= un danger, par nature" color={RED} size={54} /></Enter>
      </Win>

      {/* trois catégories */}
      <Win a={119.15} b={136.85}>
        <Enter at={119.6} x={540} y={640} bouncy><Note text="sur le terrain…" size={56} /></Enter>
        {CATS.map((c, i) => {
          const x = 200 + i * 340;
          return (
            <div key={c.title}>
              <Enter at={c.at} x={x} y={1010} from="up" dist={-200}>
                <div style={{width: 310, height: 680, borderRadius: 32, background: '#fff', boxShadow: '0 18px 36px rgba(14,30,60,0.18)', overflow: 'hidden', borderTop: `14px solid ${c.c}`}}>
                  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: c.c, textAlign: 'center', padding: '22px 0 10px', textTransform: 'uppercase', letterSpacing: -0.5}}>{c.title}</div>
                </div>
              </Enter>
              {c.items.map(([ic, l, at], j) => (
                <Enter key={l} at={at} x={x} y={(c.items.length === 3 ? 900 : 920) + j * (c.items.length === 3 ? 160 : 220)} bouncy>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4}}>
                    {i === 0 && j === 0 ? <Cut src="danger2/bidon.png" w={150} /> : <F n={ic} size={c.items.length === 3 ? 110 : 140} />}
                    <div style={{fontFamily: handFont, fontSize: 38, color: colors.navy, whiteSpace: 'nowrap'}}>{l}</div>
                  </div>
                </Enter>
              ))}
            </div>
          );
        })}
      </Win>

      {/* dangereux même quand personne n'est là */}
      <Win a={136.9} b={146.1}>
        <Enter at={137.1} x={540} y={960} from="scale">
          <div style={{width: 900, height: 620, borderRadius: 30, background: 'linear-gradient(#E8E2D2, #DDD5C0)', border: `10px solid ${colors.navy}`, position: 'relative', overflow: 'hidden', boxShadow: 'inset 0 -30px 60px rgba(0,0,0,0.08)'}}>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 150, background: '#CFC5AD'}} />
            <div style={{position: 'absolute', left: 90, bottom: 110}}><F n="echelle" size={300} /></div>
            <div style={{position: 'absolute', right: 110, bottom: 120}}><F n="chaud" size={200} /></div>
            <div style={{position: 'absolute', left: 390, bottom: 120, width: 130, height: 330, border: `6px dashed ${colors.navy}`, borderRadius: '65px 65px 20px 20px', opacity: 0.35}} />
          </div>
        </Enter>
        <Enter at={142.3} x={455} y={940} bouncy><Note text="personne…" size={46} /></Enter>
        <Highlight at={139.2} x={300} y={1000} r={150} color={RED} />
        <Highlight at={140.1} x={770} y={1040} r={120} color={RED} />
        <Enter at={143.9} x={540} y={1390} bouncy><Pill label="Le danger ne prend jamais de pause" icon="sablier" color={RED} size={32} /></Enter>
      </Win>
    </>
  );
};

