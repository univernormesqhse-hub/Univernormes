import {interpolate, useCurrentFrame} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, Kinetic, prog, useSpring, useT} from '../anim';
import {CharterDoc, RED, Strike, Verdict} from '../charte/ui';
import {F, Pill} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';
import {CineShot, Highlight} from './Cine';
import {AMBER, Company, fade} from './Scenes1';

/** 85,6 – 130,8 s : pilier 2, la relation — du contrôle au partenariat, actions concrètes. */
export const Relation: React.FC = () => {
  const t = useT();
  const tilt = interpolate(prog(t, 86.2, 87.8, easeInOut), [0, 1], [0, -16]) * (1 - prog(t, 89.8, 91.6, easeInOut));
  const split = t >= 93.1 && t < 109.5;
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', inset: 0, opacity: prog(t, 85.6, 85.9) * (1 - prog(t, 130.5, 130.8, easeIn))}}>
      <Kinetic text="Une relation *déséquilibrée*" at={85.65} until={89.55} y={420} size={70} maxWidth={1000} accent={RED} />
      <Kinetic text="Vers un vrai *partenariat*" at={89.6} until={93.05} y={420} size={74} maxWidth={1000} />
      <Kinetic text="*Contrôle* ou *confiance* ?" at={93.1} until={109.45} y={420} size={76} maxWidth={1000} accent={AMBER} />
      <Kinetic text="Basculer du *bon côté*" at={109.5} until={116.45} y={420} size={78} maxWidth={1000} />
      <Kinetic text="Des actions *concrètes*" at={116.5} until={130.7} y={420} size={78} maxWidth={1000} />

      {t < 93.1 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 85.6, 93.1)}}>
          <Enter at={85.7} x={540} y={1060} bouncy>
            <svg width={860} height={560} viewBox="0 0 860 560" style={{overflow: 'visible'}}>
              <rect x={415} y={150} width={30} height={360} rx={10} fill={colors.navy} />
              <rect x={300} y={500} width={260} height={34} rx={14} fill={colors.navy} />
              <g transform={`rotate(${tilt} 430 150)`}>
                <rect x={60} y={138} width={740} height={24} rx={12} fill={tilt < -3 ? RED : colors.green} />
                <ellipse cx={130} cy={330} rx={110} ry={20} fill={colors.navy} />
                <ellipse cx={730} cy={330} rx={110} ry={20} fill={colors.navy} />
                <path d="M130 162 L130 330 M730 162 L730 330" stroke={colors.navy} strokeWidth={4} />
              </g>
              <circle cx={430} cy={150} r={26} fill={colors.navy} />
            </svg>
          </Enter>
          <div style={{position: 'absolute', left: 540 - 300, top: 1100 + Math.sin((tilt * Math.PI) / 180) * -300 - 150, transform: 'translate(-50%, -50%)'}}><Enter at={86.0} x={0} y={0} bouncy><F n="usine" size={170} /></Enter></div>
          <div style={{position: 'absolute', left: 540 + 300, top: 1100 + Math.sin((tilt * Math.PI) / 180) * 300 - 150, transform: 'translate(-50%, -50%)'}}><Enter at={86.4} x={0} y={0} bouncy><F n="ouvrier" size={130} /></Enter></div>
          <Enter at={90.0} x={540} y={1480} bouncy><Pill label="Équilibre retrouvé" icon="poignee" size={36} /></Enter>
        </div>
      )}
      {split && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 93.1, 109.5)}}>
          <div style={{position: 'absolute', left: 535, top: 600, width: 10, height: 960, background: colors.navy, opacity: 0.15, borderRadius: 5}} />
          {/* côté contrôle */}
          <Enter at={95.2} x={290} y={680} bouncy><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: RED}}>CONTRÔLE</div></Enter>
          <Enter at={96.3} x={290} y={880} bouncy><F n="usine" size={170} /></Enter>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: prog(t, 97.2, 97.6)}}>
            <path d="M290 980 V1140" stroke={RED} strokeWidth={10} />
            <path d="M266 1116 L290 1150 L314 1116" stroke={RED} strokeWidth={10} fill="none" strokeLinecap="round" />
          </svg>
          <Enter at={97.4} x={290} y={1240} bouncy><F n="ouvrier" size={130} /></Enter>
          <Enter at={98.8} x={290} y={1420} bouncy><Pill label="Règles imposées" icon="cadenas" color={RED} size={26} /></Enter>
          <Enter at={99.9} x={290} y={1520} bouncy><Pill label="Dépendance" icon="maillon" color={RED} size={26} /></Enter>
          {/* côté partenariat */}
          <Enter at={100.9} x={790} y={680} bouncy><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: colors.green}}>PARTENARIAT</div></Enter>
          <Enter at={101.5} x={790} y={880} bouncy><F n="usine" size={150} /></Enter>
          <Enter at={102.0} x={790} y={1240} bouncy><F n="ouvrier" size={130} /></Enter>
          {t > 106.4 && (
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <path d="M740 980 C 690 1060, 690 1100, 740 1160" stroke={colors.green} strokeWidth={8} fill="none" />
              <path d="M840 1160 C 890 1080, 890 1040, 840 980" stroke={colors.green} strokeWidth={8} fill="none" />
              {[0, 1].map((i) => {
                const p = ((f / 30) * 0.7 + i * 0.5) % 1;
                const y = i === 0 ? 980 + p * 180 : 1160 - p * 180;
                const x = i === 0 ? 720 - Math.sin(p * Math.PI) * 40 : 860 + Math.sin(p * Math.PI) * 40;
                return <circle key={i} cx={x} cy={y} r={12} fill={AMBER} />;
              })}
            </svg>
          )}
          <Enter at={103.2} x={790} y={1420} bouncy><Pill label="Méthodes co-construites" icon="engrenage" size={26} /></Enter>
          <Enter at={104.3} x={790} y={1520} bouncy><Pill label="Confiance" icon="poignee" size={26} /></Enter>
        </div>
      )}
      {t >= 109.5 && t < 116.5 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 109.5, 116.5)}}>
          <Enter at={109.6} x={540} y={1020} bouncy rotate={Math.sin(t * 3) * 6}><F n="question" size={300} /></Enter>
          <Enter at={114.2} x={540} y={1400} bouncy><Pill label="Avec des actions concrètes" icon="outils" size={36} /></Enter>
        </div>
      )}
      {t >= 116.5 && (
        <>
          <CineShot src="promo/terrain-controle.jpg" at={116.5} until={118.82} move="push" pos="55% 35%" y={900} h={680} label="Réunions régulières sur le terrain" />
          <CineShot src="promo/formation-incendie.jpg" at={118.82} until={122.42} move="left" pos="50% 40%" y={900} h={680} label="Un accueil sécurité approfondi" />
          <CineShot src="promo/audit-reunion.jpg" at={122.42} until={130.75} move="pull" pos="50% 50%" y={900} h={680} label="Un suivi construit ensemble" />
          <div style={{position: 'absolute', left: 0, right: 0, top: 1330, display: 'flex', justifyContent: 'center', gap: 22}}>
            {[{at: 116.6, n: 'calendrier', l: 'Réunions'}, {at: 118.9, n: 'poignee', l: 'Accueil'}, {at: 122.5, n: 'clipboard', l: 'Suivi'}].map((a) => (
              <div key={a.l} style={{opacity: prog(t, a.at, a.at + 0.4), transform: `translateY(${(1 - prog(t, a.at, a.at + 0.5, easeOut)) * 40}px)`, display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 20, padding: '12px 20px', boxShadow: '0 10px 22px rgba(0,0,0,0.12)', fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: colors.navy}}>
                <F n={a.n} size={54} />
                {a.l}
                {t > a.at + 1 && <Verdict ok size={40} />}
              </div>
            ))}
          </div>
          <Enter at={124.9} x={300} y={1500} bouncy>
            <div style={{position: 'relative'}}><Pill label="Audit imposé" icon="stop" color={RED} size={28} /><div style={{position: 'absolute', left: 10, right: 10, top: '50%'}}><Strike p={prog(t, 125.5, 126.0)} w={250} /></div></div>
          </Enter>
          <Enter at={126.2} x={770} y={1500} bouncy><Pill label="Règles du jeu partagées" icon="poignee" size={28} /></Enter>
        </>
      )}
    </div>
  );
};

/** 130,8 – 169,8 s : les indicateurs — l'effet pastèque, le rétroviseur, les indicateurs proactifs. */
export const Indicateurs: React.FC = () => {
  const t = useT();
  const cut = prog(t, 143.5, 144.4, easeInOut);
  const pro = t >= 158.1;
  const rear = t >= 152.0 && t < 158.1;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: prog(t, 130.8, 131.1) * (1 - prog(t, 169.5, 169.8, easeIn))}}>
      <Kinetic text="Les indicateurs de *suivi*" at={130.85} until={138.25} y={420} size={76} maxWidth={1000} />
      <Kinetic text="L'effet *pastèque*" at={138.3} until={143.45} y={420} size={92} maxWidth={1000} accent={colors.green} />
      <Kinetic text="Vert dehors, *rouge dedans*" at={143.5} until={151.95} y={420} size={76} maxWidth={1000} accent={RED} />
      <Kinetic text="Le taux d'accident = le *passé*" at={152.0} until={158.05} y={420} size={66} maxWidth={1000} accent={AMBER} />
      <Kinetic text="Des indicateurs *proactifs*" at={158.1} until={169.7} y={420} size={74} maxWidth={1000} />

      {t < 138.3 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 130.8, 138.3)}}>
          <Enter at={131.0} x={540} y={1000} bouncy>
            <div style={{width: 760, borderRadius: 30, background: colors.navy, padding: '28px 32px', boxShadow: '0 20px 44px rgba(14,30,60,0.35)', fontFamily: sansFont}}>
              <div style={{fontWeight: 800, fontSize: 32, color: '#C9D6EA', letterSpacing: 3}}>TABLEAU DE BORD</div>
              <div style={{display: 'flex', alignItems: 'flex-end', gap: 22, height: 260, marginTop: 22}}>
                {[0.4, 0.55, 0.5, 0.7, 0.62, 0.8].map((v, i) => <div key={i} style={{flex: 1, height: 260 * v * prog(t, 131.4 + i * 0.12, 131.9 + i * 0.12, easeOut), background: i === 5 ? colors.green : '#3F6AA8', borderRadius: 8}} />)}
              </div>
            </div>
          </Enter>
          <Enter at={135.3} x={540} y={1420} bouncy><Pill label="Le piège des apparences" icon="yeux" size={34} /></Enter>
        </div>
      )}
      {t >= 138.3 && t < 152.0 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 138.3, 152.0)}}>
          {/* pastèque : entière puis tranchée */}
          <div style={{position: 'absolute', left: 540 - cut * 170, top: 980, transform: `translate(-50%, -50%) rotate(${-cut * 12}deg)`}}>
            <Enter at={138.4} x={0} y={0} bouncy>
              <svg width={420} height={420} viewBox="0 0 100 100" style={{overflow: 'visible'}}>
                <path d={cut > 0 ? 'M50 4 A46 46 0 0 0 50 96 Z' : 'M50 4 A46 46 0 1 0 50.01 4 Z'} fill="#2E7D32" />
                {[20, 36, 64, 80].map((x) => <path key={x} d={`M${x} 10 C ${x - 8} 40, ${x - 8} 60, ${x} 90`} stroke="#1B5E20" strokeWidth={4} fill="none" opacity={cut > 0 && x > 50 ? 0 : 1} />)}
                {cut > 0 && <path d="M50 10 A40 40 0 0 0 50 90 Z" fill="#E53935" />}
              </svg>
            </Enter>
          </div>
          {cut > 0 && (
            <div style={{position: 'absolute', left: 540 + cut * 170, top: 980, transform: `translate(-50%, -50%) rotate(${cut * 12}deg)`}}>
              <svg width={420} height={420} viewBox="0 0 100 100">
                <path d="M50 4 A46 46 0 0 1 50 96 Z" fill="#2E7D32" />
                <path d="M50 10 A40 40 0 0 1 50 90 Z" fill="#E53935" />
                {[[62, 30], [70, 50], [62, 70], [78, 40], [78, 62]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={2.2} ry={3.6} fill="#212121" />)}
              </svg>
            </div>
          )}
          <Enter at={140.5} until={143.4} x={540} y={1340} bouncy>
            <div style={{background: colors.green, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 46, padding: '12px 30px', borderRadius: 18}}>« 0 accident »</div>
          </Enter>
          <Enter at={146.2} x={300} y={1380} bouncy><Pill label="Quasi-accidents non déclarés" icon="danger" color={RED} size={26} /></Enter>
          <Enter at={149.7} x={780} y={1480} bouncy><Pill label="Risques mal gérés" icon="danger" color={RED} size={28} /></Enter>
        </div>
      )}
      {rear && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 152.0, 158.1)}}>
          <Enter at={152.1} x={540} y={980} bouncy>
            <div style={{width: 640, height: 260, borderRadius: 130, background: '#2B2F36', border: '14px solid #8A94A3', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, boxShadow: '0 20px 40px rgba(0,0,0,0.3)'}}>
              <F n="retro" size={110} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: '#fff'}}>Taux d'accident</div>
            </div>
          </Enter>
          <Enter at={154.5} x={540} y={1340} bouncy><Pill label="On regarde dans le rétroviseur" icon="yeux" color={AMBER} size={30} /></Enter>
        </div>
      )}
      {pro && (
        <>
          {[
            {at: 160.6, n: 'loupe', l: 'Analyses de quasi-accidents', y: 760},
            {at: 162.6, n: 'graphique', l: 'Améliorations de la sécurité', y: 1010},
          ].map((r) => (
            <Enter key={r.l} at={r.at} x={540} y={r.y} from="left" dist={-300}>
              <div style={{width: 900, background: '#fff', borderRadius: 28, padding: '20px 26px', boxShadow: '0 14px 30px rgba(30,25,10,0.15)', borderLeft: `14px solid ${colors.green}`, fontFamily: sansFont}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 16, fontWeight: 900, fontSize: 38, color: colors.navy}}><F n={r.n} size={70} />{r.l}<span style={{marginLeft: 'auto', color: colors.green, fontSize: 50}}>↗</span></div>
                <div style={{height: 22, borderRadius: 11, background: '#EEF1F5', marginTop: 14, overflow: 'hidden'}}>
                  <div style={{height: '100%', width: `${85 * prog(t, r.at + 0.4, r.at + 2.4, easeOut)}%`, background: colors.green, borderRadius: 11}} />
                </div>
              </div>
            </Enter>
          ))}
          <Enter at={165.5} x={540} y={1330} bouncy>
            <div style={{display: 'flex', gap: 30, alignItems: 'center', fontFamily: sansFont}}>
              <div style={{background: colors.green, color: '#fff', fontWeight: 900, fontSize: 40, padding: '12px 26px', borderRadius: 16}}>L'action</div>
              <div style={{fontWeight: 900, fontSize: 40, color: colors.navy}}>&gt;</div>
              <div style={{position: 'relative', background: '#ECEEF1', color: '#8A94A3', fontWeight: 900, fontSize: 40, padding: '12px 26px', borderRadius: 16}}>Le constat<div style={{position: 'absolute', left: 10, right: 10, top: '50%'}}><Strike p={prog(t, 168.0, 168.5)} w={230} /></div></div>
            </div>
          </Enter>
        </>
      )}
    </div>
  );
};

const DETAILS = [
  {at: 203.3, n: 'bulle', l: "Circuits d'infos non officiels"},
  {at: 205.8, n: 'homme-bureau', l: 'La personne à aller voir'},
  {at: 208.5, n: 'sablier', l: 'Les habitudes de travail'},
  {at: 210.5, n: 'question', l: "Le « pourquoi » d'une procédure"},
];

/** 175,4 – 234,9 s : pilier 3, l'implicite — l'iceberg, les détails, le cahier des charges. */
export const Implicite: React.FC = () => {
  const t = useT();
  const f = useCurrentFrame();
  const sea = 1040;
  const danger = t >= 192.0 && t < 198.2;
  const iceberg = t < 198.2;
  const details = t >= 198.2 && t < 216.6;
  const cdc = t >= 216.6;
  const lift = prog(t, 199.2, 200.8, easeInOut);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: prog(t, 175.4, 175.7) * (1 - prog(t, 234.6, 234.9, easeIn))}}>
      <Kinetic text="Tout ce qui ne se *dit pas*" at={175.45} until={184.0} y={420} size={72} maxWidth={1000} />
      <Kinetic text="L'*implicite* du quotidien" at={184.05} until={192.05} y={420} size={74} maxWidth={1000} />
      <Kinetic text="Une source de *danger*" at={192.1} until={198.2} y={420} size={80} maxWidth={1000} accent={RED} />
      <Kinetic text="Rendre *explicite*" at={198.25} until={216.6} y={420} size={86} maxWidth={1000} />
      <Kinetic text="Le cahier des *charges*" at={216.65} until={234.8} y={420} size={80} maxWidth={1000} />

      {iceberg && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 175.4, 198.2)}}>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <rect x={40} y={sea} width={1000} height={560} rx={30} fill="rgba(47,111,228,0.12)" />
            <path d={Array.from({length: 21}, (_, i) => `${i ? 'L' : 'M'}${40 + i * 50} ${sea + Math.sin(i + f / 12) * 6}`).join(' ')} stroke="#5B8FD8" strokeWidth={6} fill="none" />
            <polygon points={`540,${640} 640,${sea} 440,${sea}`} fill="#fff" stroke="#9FB8DA" strokeWidth={6} opacity={prog(t, 175.5, 176.0)} />
            <polygon points={`440,${sea} 640,${sea} 860,${sea + 240} 760,${sea + 480} 330,${sea + 500} 200,${sea + 250}`} fill="#DCE8F6" stroke="#9FB8DA" strokeWidth={6} opacity={prog(t, 184.2, 185.2)} />
          </svg>
          <Enter at={176.4} x={790} y={820} bouncy><Pill label="Écrit, officiel" icon="memo" size={28} /></Enter>
          <Enter at={187.2} x={540} y={1180} bouncy><Pill label="Habitudes" icon="sablier" size={28} /></Enter>
          <Enter at={188.7} x={420} y={1300} bouncy><Pill label="Connaissances informelles" icon="bulle" size={26} /></Enter>
          <Enter at={190.1} x={600} y={1420} bouncy><div style={{fontFamily: handFont, fontSize: 46, color: colors.navy}}>« on a toujours fait comme ça »</div></Enter>
          <Enter at={180.6} until={192.0} x={200} y={760} bouncy><F n="ouvrier" size={140} /></Enter>
          {danger && (
            <>
              <Enter at={192.2} x={180} y={760} from="left" dist={-300}><Company label="Équipe externe" sub="nouvelle" icon="ouvrier" color={colors.green} w={260} /></Enter>
              {[[480, 1200], [640, 1320], [380, 1400]].map(([x, y], i) => (
                <Enter key={i} at={194.8 + i * 0.25} x={x} y={y} bouncy><div style={{width: 80, height: 80, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 ${8 + Math.sin(t * 6 + i) * 4}px rgba(200,64,47,0.3)`}}><F n="danger" size={56} /></div></Enter>
              ))}
            </>
          )}
        </div>
      )}
      {details && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 198.2, 216.6)}}>
          {t < 203.3 && (
            <Enter at={198.3} x={540} y={1020} bouncy>
              <div style={{position: 'relative', width: 560, height: 420}}>
                <div style={{position: 'absolute', inset: 0, borderRadius: 24, background: '#2B2F36', transform: `translateY(${-lift * 160}px) rotateX(${lift * 60}deg)`, transformOrigin: 'top', boxShadow: '0 14px 30px rgba(0,0,0,0.3)', zIndex: 2}} />
                <div style={{position: 'absolute', inset: 0, borderRadius: 24, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="ampoule" size={220} /></div>
              </div>
            </Enter>
          )}
          {t >= 203.3 &&
            DETAILS.map((d, i) => (
              <Enter key={d.l} at={d.at} x={i % 2 ? 790 : 290} y={i < 2 ? 820 : 1220} bouncy>
                <div style={{width: 430, padding: '24px 18px', borderRadius: 30, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, boxShadow: '0 14px 30px rgba(30,25,10,0.16)', borderBottom: `10px solid ${AMBER}`}}>
                  <F n={d.n} size={120} />
                  <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: colors.navy, textAlign: 'center', lineHeight: 1.15}}>{d.l}</div>
                </div>
              </Enter>
            ))}
          <Enter at={213.0} x={540} y={1520} bouncy><Pill label="Tout mettre sur la table" icon="check" size={34} /></Enter>
        </div>
      )}
      {cdc && (
        <>
          <Enter at={216.7} x={360} y={1030} bouncy>
            <CharterDoc w={420} write={prog(t, 223.0, 227.0, (v) => v)} seal={prog(t, 229.8, 230.3)} title="CAHIER DES CHARGES" lines={6} />
          </Enter>
          <Enter at={220.0} until={223.0} x={800} y={820} bouncy>
            <div style={{position: 'relative'}}><Pill label="Copié-collé" icon="memo" color={RED} size={30} /><div style={{position: 'absolute', left: 10, right: 10, top: '50%'}}><Strike p={prog(t, 221.0, 221.6)} w={230} /></div></div>
          </Enter>
          <Enter at={225.0} x={810} y={900} bouncy><Pill label="Qui fait quoi" icon="equipe" size={30} /></Enter>
          <Enter at={229.0} x={810} y={1040} bouncy><Pill label="Analyses de risques partagées" icon="loupe" color={AMBER} size={24} /></Enter>
          <Enter at={232.0} x={810} y={1180} bouncy><Pill label="Retour d'expérience" icon="trophee" size={28} /></Enter>
        </>
      )}
    </div>
  );
};

/** 239,7 – 278,2 s : le conseil final — avez-vous analysé le risque vous-même ? */
export const Conseil: React.FC = () => {
  const t = useT();
  const f = useCurrentFrame();
  const scan = ((f / 30) * 0.6) % 1;
  const verdict = t >= 263.4 && t < 273.6;
  const stamp = useSpring(266.3, {damping: 9});
  const home = t >= 273.6;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: prog(t, 239.7, 240.0) * (1 - prog(t, 277.9, 278.2, easeIn))}}>
      <Kinetic text="Le *prérequis* absolu" at={239.75} until={245.4} y={420} size={82} maxWidth={1000} />
      <Kinetic text="La toute première *question*" at={245.45} until={253.05} y={420} size={70} maxWidth={1000} />
      <Kinetic text="L'avez-vous *analysé* ?" at={253.1} until={263.35} y={420} size={78} maxWidth={1000} accent={AMBER} />
      <Kinetic text="Sinon : *pas prête*" at={263.4} until={273.55} y={420} size={86} maxWidth={1000} accent={RED} />
      <Kinetic text="Ça commence *chez soi*" at={273.6} until={278.1} y={420} size={82} maxWidth={1000} />

      {t < 253.1 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 239.7, 253.1)}}>
          <Enter at={239.8} x={540} y={1000} bouncy><F n="cle" size={300} float={8} /></Enter>
          <Enter at={242.6} x={540} y={1360} bouncy><Pill label="Avant de sous-traiter quoi que ce soit" icon="stop" color={AMBER} size={30} /></Enter>
          <Enter at={248.0} x={850} y={760} bouncy rotate={Math.sin(t * 3) * 6}><F n="question" size={150} /></Enter>
        </div>
      )}
      {t >= 253.1 && t < 263.4 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 253.1, 263.4)}}>
          <CineShot src="promo/hse-machine.jpg" at={253.15} until={263.35} move="push" pos="60% 40%" y={940} h={760} grade="warm" label="L'activité à confier">
            <div style={{position: 'absolute', top: 0, bottom: 0, left: `${scan * 100}%`, width: 8, background: 'rgba(242,194,48,0.9)', boxShadow: '0 0 30px 10px rgba(242,194,48,0.5)'}} />
          </CineShot>
          <Highlight at={256.4} until={263.3} x={360} y={980} r={110} label="Danger ?" />
          <Highlight at={257.6} until={263.3} x={720} y={820} r={90} />
          <Enter at={256.1} x={540} y={1440} bouncy><Pill label="Tous les dangers sont-ils connus ?" icon="loupe" size={32} /></Enter>
        </div>
      )}
      {verdict && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 263.4, 273.6)}}>
          <Enter at={263.5} x={540} y={980} bouncy>
            <div style={{width: 760, borderRadius: 30, background: '#fff', padding: '30px 34px', boxShadow: '0 20px 40px rgba(30,25,10,0.18)', fontFamily: sansFont}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 18, fontWeight: 900, fontSize: 40, color: colors.navy}}><F n="loupe" size={70} />Analyse interne complète ?</div>
              <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 20, fontWeight: 800, fontSize: 36, color: RED}}><Verdict ok={false} size={60} />Non</div>
            </div>
          </Enter>
          {t > 266.3 && (
            <div style={{position: 'absolute', left: 540, top: 1300, transform: `translate(-50%, -50%) rotate(-8deg) scale(${interpolate(stamp, [0, 1], [2.2, 1])})`, opacity: Math.min(1, stamp * 2), border: `10px solid ${RED}`, borderRadius: 20, padding: '10px 30px', fontFamily: sansFont, fontWeight: 900, fontSize: 54, color: RED, background: 'rgba(255,255,255,0.9)', whiteSpace: 'nowrap'}}>PAS PRÊTE À SOUS-TRAITER</div>
          )}
          <Enter at={270.3} x={540} y={1500} bouncy><Pill label="On ne délègue pas un risque non maîtrisé" icon="cadenas" color={RED} size={28} /></Enter>
        </div>
      )}
      {home && (
        <>
          <Enter at={273.7} x={540} y={1000} bouncy><F n="maison" size={320} /></Enter>
          <Enter at={274.6} x={760} y={820} bouncy><div style={{width: 170, height: 170, borderRadius: '50%', background: colors.green, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '8px solid #fff', boxShadow: '0 12px 26px rgba(46,155,62,0.4)'}}><F n="bouclier" size={110} /></div></Enter>
          <Enter at={275.8} x={540} y={1380} bouncy><Pill label="La sécurité de la sous-traitance" icon="poignee" size={34} /></Enter>
        </>
      )}
    </div>
  );
};

