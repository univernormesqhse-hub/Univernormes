import {easeInOut, easeOut, Enter, Kinetic, prog, useSpring, useT} from '../anim';
import {PhotoCard, RED, Strike} from '../charte/ui';
import {Note, Op, Stamp, Win} from '../danger2/ui';
import {F, Pill} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';

export const CERT = colors.green;
export const ACCR = '#3D7DD8';
export const AGR = '#E3A92B';

/** Badge-concept rond (certification / accréditation / agrément). */
export const Badge: React.FC<{label: string; sub?: string; icon: string; color: string; size?: number}> = ({label, sub, icon, color, size = 360}) => (
  <div style={{width: size, padding: `${size * 0.07}px 0`, borderRadius: size * 0.1, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.02, boxShadow: '0 20px 40px rgba(14,30,60,0.2)', borderTop: `${size * 0.04}px solid ${color}`}}>
    <F n={icon} size={size * 0.42} />
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.105, color, textTransform: 'uppercase', letterSpacing: -0.5}}>{label}</div>
    {sub && <div style={{fontFamily: handFont, fontSize: size * 0.1, color: colors.navy, textAlign: 'center', lineHeight: 1.05, padding: '0 14px'}}>{sub}</div>}
  </div>
);

/** Étiquette « tampon » de type certificat (texte libre, sans logo tiers). */
export const Seal: React.FC<{top: string; main: string; color: string; size?: number; rotate?: number}> = ({top, main, color, size = 300, rotate = -8}) => (
  <div style={{width: size, height: size, borderRadius: '50%', border: `${size * 0.035}px solid ${color}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff', transform: `rotate(${rotate}deg)`, boxShadow: '0 16px 32px rgba(14,30,60,0.2)', outline: `${size * 0.012}px dashed ${color}`, outlineOffset: -size * 0.09}}>
    <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: size * 0.085, color, letterSpacing: 3}}>{top}</div>
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.16, color: colors.navy, lineHeight: 1, textAlign: 'center'}}>{main}</div>
  </div>
);

const PLAN = [
  ['check', 'La certification', 34.9, CERT],
  ['loupe2', "L'accréditation", 36.1, ACCR],
  ['trinome', 'La hiérarchie de confiance', 37.8, colors.navy],
  ['temple', "L'agrément", 40.7, AGR],
  ['ampoule', "L'astuce mémoire", 42.2, RED],
] as const;

/** 0 – 45,2 s : deux mots confondus, la hiérarchie de la confiance, plan. */
export const Intro: React.FC = () => {
  const t = useT();
  const neq = useSpring(21.8, {damping: 8, stiffness: 240});
  return (
    <>
      <Kinetic text="Certification *vs* accréditation" at={0.6} until={13.35} y={420} size={76} accent={ACCR} maxWidth={1000} />
      <Kinetic text="La même *chose* ?" at={13.4} until={25.4} y={420} size={92} accent={RED} />
      <Kinetic text="La hiérarchie de la *confiance*" at={25.45} until={30.75} y={420} size={74} accent={ACCR} maxWidth={1000} />
      <Kinetic text="Notre feuille de *route*" at={30.8} until={45.15} y={420} size={86} accent={ACCR} maxWidth={1000} />

      <Win a={0.6} b={13.35}>
        <Enter at={0.96} x={290} y={960} from="left" dist={-500} rotate={-3}><Badge label="Certification" icon="check" color={CERT} size={380} /></Enter>
        <Enter at={1.4} x={790} y={960} from="right" dist={500} rotate={3}><Badge label="Accréditation" icon="loupe2" color={ACCR} size={380} /></Enter>
        <Enter at={2.4} x={540} y={960} bouncy rotate={Math.sin(t * 3) * 6}><Op c="?" /></Enter>
        <Enter at={6.9} x={540} y={1340} bouncy><Pill label="Les confondre = une grosse erreur" icon="danger" color={RED} size={32} /></Enter>
        <Enter at={9.6} x={540} y={1470} bouncy><Note text="décortiquons ça ensemble" size={52} /></Enter>
      </Win>

      <Win a={13.4} b={25.4}>
        <Enter at={14.9} x={250} y={900} bouncy><Seal top="CERTIFIÉ" main="ISO 9001" color={CERT} size={300} /></Enter>
        <Enter at={17.8} x={830} y={900} bouncy><Seal top="ACCRÉDITÉ" main="COFRAC" color={ACCR} size={300} rotate={8} /></Enter>
        {t < 21.8 && <Enter at={19.7} x={540} y={900} bouncy><Op c="=" color={colors.navy} /></Enter>}
        {t >= 21.8 && (
          <div style={{position: 'absolute', left: 540, top: 900, transform: `translate(-50%, -50%) scale(${neq * 1.2})`}}>
            <Op c="≠" color={RED} size={130} />
          </div>
        )}
        <Enter at={22.0} x={540} y={1230} bouncy><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: RED}}>EH BIEN NON !</div></Enter>
        <Enter at={23.5} x={540} y={1400} bouncy><Pill label="Une confusion qui pose de vrais problèmes" icon="bulle-colere" color={RED} size={30} /></Enter>
      </Win>

      <Win a={25.45} b={30.75}>
        {[0, 1, 2].map((i) => (
          <Enter key={i} at={27.9 + i * 0.35} x={540} y={1250 - i * 210} from="up" dist={-300}>
            <div style={{width: 820 - i * 220, height: 180, borderRadius: 22, background: [colors.green, ACCR, colors.navy][i], display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 14px 28px rgba(14,42,92,0.3)'}}>
              <F n={['usine', 'loupe2', 'temple'][i]} size={120} />
            </div>
          </Enter>
        ))}
      </Win>

      <Win a={30.8} b={45.15}>
        {PLAN.map(([ic, l, at, c], i) => (
          <Enter key={l} at={at} x={540} y={650 + i * 165} from="left" dist={-280}>
            <div style={{width: 900, display: 'flex', alignItems: 'center', gap: 22, background: '#fff', borderRadius: 28, padding: '16px 26px', boxShadow: '0 12px 26px rgba(14,30,60,0.14)', borderLeft: `14px solid ${c}`}}>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: c, width: 50}}>{i + 1}</div>
              <F n={ic} size={90} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: colors.navy}}>{l}</div>
            </div>
          </Enter>
        ))}
      </Win>
    </>
  );
};

/** 50,5 – 85,5 s : la certification, preuve de conformité. */
export const Certification: React.FC = () => {
  const t = useT();
  const stamp = prog(t, 64.5, 64.8, easeOut);
  return (
    <>
      <Kinetic text="La preuve de *conformité*" at={50.5} until={68.0} y={420} size={80} accent={CERT} maxWidth={1000} />
      <Kinetic text="Dans la *pratique*" at={68.05} until={85.5} y={420} size={90} accent={CERT} />

      <Win a={50.5} b={68.0}>
        <Enter at={55.3} x={250} y={820} from="left" dist={-260}>
          <div style={{width: 380, background: '#fff', borderRadius: 30, padding: '22px 0', textAlign: 'center', boxShadow: '0 14px 30px rgba(14,30,60,0.18)', borderTop: `12px solid ${CERT}`}}>
            <F n="loupe2" size={130} style={{margin: '0 auto'}} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: colors.navy}}>Organisme</div>
            <div style={{fontFamily: handFont, fontSize: 34, color: CERT}}>extérieur, indépendant</div>
          </div>
        </Enter>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <line x1={450} y1={820} x2={450 + 180 * prog(t, 57.6, 58.3, easeInOut)} y2={820} stroke={colors.navy} strokeWidth={8} strokeDasharray="16 12" />
        </svg>
        {[
          ['usine', 'une entreprise', 58.5],
          ['colis', 'un produit', 59.5],
          ['homme-bureau', 'une personne', 60.4],
        ].map(([ic, l, at], i) => (
          <Enter key={l} at={at as number} x={820} y={650 + i * 170} bouncy><Pill label={l as string} icon={ic as string} color={CERT} size={30} /></Enter>
        ))}
        <Enter at={62.8} x={540} y={1210} bouncy><CharterLike /></Enter>
        {t > 64.5 && (
          <div style={{position: 'absolute', left: 760, top: 1270, transform: 'translate(-50%, -50%)'}}>
            <Stamp text="OK, CONFORME" p={stamp} color={CERT} size={50} />
          </div>
        )}
        <Enter at={66.6} x={540} y={1480} bouncy><Note text="ils suivent bien les règles du jeu" color={CERT} size={50} /></Enter>
      </Win>

      <Win a={68.05} b={85.5}>
        <PhotoCard src="promo/raffinerie.jpg" at={69.2} until={75.0} y={940} w={940} h={600} label="Usine certifiée ISO 9001" icon="usine" from="scale" />
        <Enter at={70.6} until={75.0} x={830} y={1310} bouncy><Seal top="CERTIFIÉE" main="ISO 9001" color={CERT} size={240} /></Enter>
        <PhotoCard src="iso26/direction-equipe.jpg" at={75.05} until={79.8} y={940} w={940} h={600} label="Entreprise certifiée ISO 14001" icon="feuille" from="right" />
        <Enter at={76.6} until={79.8} x={830} y={1310} bouncy><Seal top="CERTIFIÉE" main="ISO 14001" color={CERT} size={240} rotate={6} /></Enter>
        <PhotoCard src="promo/audit-reunion.jpg" at={79.85} y={940} w={940} h={600} label="Auditeur certifié" icon="badge" from="left" />
        <Enter at={84.1} x={830} y={1310} bouncy><F n="diplome" size={210} /></Enter>
        <Enter at={84.3} x={350} y={1340} bouncy><Note text="comme un diplôme !" color={CERT} size={56} /></Enter>
      </Win>
    </>
  );
};

/** Feuille « cahier des charges / norme ». */
const CharterLike: React.FC = () => (
  <div style={{width: 320, height: 210, borderRadius: 18, background: '#fff', boxShadow: '0 14px 28px rgba(14,30,60,0.18)', padding: '20px 24px', borderLeft: `10px solid ${colors.navy}`}}>
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: colors.navy, letterSpacing: 2}}>NORME</div>
    {[0, 1, 2, 3].map((i) => <div key={i} style={{height: 12, borderRadius: 6, background: '#DDE3EA', margin: '16px 0 0', width: `${90 - i * 12}%`}} />)}
  </div>
);

/** 90,3 – 129,6 s : l'accréditation, le contrôleur des contrôleurs. */
export const Accreditation: React.FC = () => {
  const t = useT();
  return (
    <>
      <Kinetic text="Le contrôleur des *contrôleurs*" at={90.35} until={110.3} y={420} size={74} accent={ACCR} maxWidth={1000} />
      <Kinetic text="Pour les *experts*" at={110.35} until={123.7} y={420} size={92} accent={ACCR} />
      <Kinetic text="Compétent pour *juger* ?" at={123.75} until={129.5} y={420} size={84} accent={ACCR} maxWidth={1000} />

      <Win a={90.35} b={110.3}>
        {/* trois niveaux : accréditeur → certificateur → entreprise */}
        <Enter at={95.1} x={540} y={1270} from="down" dist={200}><Badge label="Entreprise" icon="usine" color={colors.navy} size={260} /></Enter>
        <Enter at={96.3} x={540} y={900} bouncy><Badge label="Certificateur" icon="loupe2" color={CERT} size={260} /></Enter>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <path d={`M720 960 C 830 1020, 830 1150, 700 1230`} stroke={CERT} strokeWidth={8} fill="none" strokeDasharray="14 10" opacity={prog(t, 96.8, 97.4)} />
          <path d={`M360 870 C 240 820, 240 700, 380 640`} stroke={ACCR} strokeWidth={8} fill="none" strokeDasharray="14 10" opacity={prog(t, 99.5, 100.1)} />
        </svg>
        <Enter at={97.2} x={900} y={1100} bouncy><Note text="valide" color={CERT} size={48} /></Enter>
        <Enter at={99.6} x={540} y={600} from="up" dist={-200}>
          <div style={{background: ACCR, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 40, padding: '14px 30px', borderRadius: 20, boxShadow: '0 12px 26px rgba(61,125,216,0.4)', display: 'flex', alignItems: 'center', gap: 14}}><F n="loupe2" size={60} /> ACCRÉDITATION</div>
        </Enter>
        <Enter at={100.2} x={200} y={760} bouncy><Note text="valide" color={ACCR} size={48} /></Enter>
        <Enter at={106.8} x={840} y={1480} bouncy><Pill label="Compétents et fiables" icon="check" color={ACCR} size={30} /></Enter>
      </Win>

      <Win a={110.35} b={123.7}>
        <Enter at={114.0} x={290} y={780} bouncy>
          <div style={{width: 400, background: '#fff', borderRadius: 26, padding: '20px 0', textAlign: 'center', boxShadow: '0 14px 30px rgba(14,30,60,0.16)', borderTop: `12px solid ${CERT}`}}>
            <F n="batiment" size={110} style={{margin: '0 auto'}} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: colors.navy, lineHeight: 1.2}}>Organismes<br />de certification</div>
            <div style={{fontFamily: handFont, fontSize: 32, color: CERT}}>ex. AFNOR, Bureau Veritas</div>
          </div>
        </Enter>
        <PhotoCard src="iso26/labo-manuel.jpg" at={121.1} x={790} y={790} w={420} h={400} label="Laboratoires" icon="microscope" from="right" rotate={2} />
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <line x1={540} y1={1130} x2={540 + (290 - 540) * prog(t, 119.8, 120.4)} y2={1130 - 150 * prog(t, 119.8, 120.4)} stroke={ACCR} strokeWidth={7} strokeDasharray="14 10" />
          <line x1={540} y1={1130} x2={540 + (790 - 540) * prog(t, 121.6, 122.2)} y2={1130 - 120 * prog(t, 121.6, 122.2)} stroke={ACCR} strokeWidth={7} strokeDasharray="14 10" />
        </svg>
        <Enter at={119.2} x={540} y={1240} bouncy>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, background: ACCR, color: '#fff', borderRadius: 26, padding: '16px 30px', boxShadow: '0 14px 30px rgba(61,125,216,0.4)'}}>
            <F n="temple" size={80} />
            <div style={{fontFamily: sansFont}}>
              <div style={{fontWeight: 900, fontSize: 44}}>COFRAC</div>
              <div style={{fontWeight: 700, fontSize: 24, opacity: 0.9}}>autorité nationale d'accréditation</div>
            </div>
          </div>
        </Enter>
      </Win>

      <Win a={123.75} b={129.5}>
        <Enter at={124.0} x={540} y={820} bouncy>
          <div style={{position: 'relative', fontFamily: handFont, fontSize: 54, color: '#7A8594', background: '#fff', borderRadius: 18, padding: '6px 26px', whiteSpace: 'nowrap'}}>
            « Suivez-vous la recette ? »
            <div style={{position: 'absolute', left: 0, right: 0, top: '50%'}}><Strike p={prog(t, 125.8, 126.3)} w={640} color={colors.navy} /></div>
          </div>
        </Enter>
        <Enter at={126.3} x={540} y={1100} bouncy>
          <div style={{background: ACCR, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 46, padding: '20px 34px', borderRadius: 24, textAlign: 'center', boxShadow: '0 16px 32px rgba(61,125,216,0.4)', lineHeight: 1.15}}>
            « Êtes-vous compétent<br />pour juger les autres ? »
          </div>
        </Enter>
        <Enter at={127.9} x={850} y={1350} bouncy><F n="arbitre" size={180} /></Enter>
      </Win>
    </>
  );
};

